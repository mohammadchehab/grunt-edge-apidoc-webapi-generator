'use strict';

//require
var format = require('string-format');
var apidoc = require("apidoc");
var fs = require('fs-extra');
var path = require("path");
var nodemailer = require('nodemailer');
var edge = require("edge");

//copy options
var ioOptions = {
    encoding: "utf-8"
};

//destination folders to be cleaned before prep.
var distFolders = [];

module.exports = function(grunt) {

    //package
    var configuration = grunt.file.readJSON('package.json');
    var host = configuration.config.currentEnvironment || "debug";
    var packages = {};

    var typeFinder = edge.func({
        assemblyFile: 'path/to/APi.EdgeControllerFinder.dll',
        typeName: 'APi.EdgeControllerFinder.EdgeAPIContainerMarshal',
        methodName: 'Invoke',
    });

    typeFinder(null, function(error, result) {
        result.forEach(function(it) {
            var key = it.key;
            delete it.key;
            packages[key] = it;
        });
    })

    for (var app in packages)
        distFolders.push(host + "/" + app + "/dist");

    grunt.initConfig({
        clean: [distFolders]
    });

    grunt.registerTask('mk-history', 'Creating History files from the original controller', function() {
        for (var app in packages) {
            var options = packages[app];
            var csharpControllerPath = format("path/to/api/controllers/{0}.cs", options.controller);
            //create a copy of the controller
            grunt.file.copy(csharpControllerPath, host + "/" + app + "/controller/" + options.version + ".cs", ioOptions);
            //parse the file and replace all @apiVersion with the value of the current api version
            var currentAPIController = grunt.file.read(csharpControllerPath);
            var content = currentAPIController.match(/\/\*\*(.|\n|\r|\r\n)*?@api(.|\n|\r|\r\n)*?\*\//gm) || [];
            //replace all apis with the parent container version.
            for (var i = 0, length = content.length; i < length; i++) {
                var block = content[i];
                content[i] = block.replace(/^\/\*\*/, "/**\n     * @apiVersion " + options.version);
            }
            grunt.file.write(host + "/" + app + "/history/" + options.version + ".cs", content, ioOptions);
            //copy api-define 
            grunt.file.copy("resources/define.js", host + "/" + app + "/controller/define.js", ioOptions);
        }
    });

    grunt.registerTask('apidoc-prepare', 'Copying Headers and Footers MD Files', function() {

        var done = this.async();

        var counter = Object.keys(packages).length;

        Object.keys(packages).forEach(function(app, index, _self) {
            var destination = host + "/" + app + "/dist/";
            var root = host + "/" + app;

            fs.readFile("resources/_header.html", function(err, data) {

                var header = path.join(__dirname, root + "/header.md");
                var footer = path.join(__dirname, root + "/footer.md");
                var apidoc = path.join(__dirname, root + "/apidoc.json");
                var packageInfo = path.join(__dirname, root + "/package.json");

                grunt.file.mkdir(path.join(__dirname, root + '/dist'));

                fs.writeFile(header, data, function(err) {
                    fs.readFile("resources/_footer.html", function(err, data) {
                        fs.writeFile(footer, data, function() {
                            var _deployConfig = packages[app].deploy.environments[host];
                            var _apidocConfig = {
                                "title": app.toUpperCase() + " - Back End",
                                "url": _deployConfig.sampleUrl,
                                "sampleUrl": _deployConfig.sampleUrl,
                                "header": {
                                    "title": "Introduction",
                                    "filename": "header.md"
                                },
                                "footer": {
                                    "title": "Bugs",
                                    "filename": "footer.md"
                                },
                                "template": {
                                    "withCompare": true,
                                    "withGenerator": false
                                }
                            };

                            fs.writeFile(apidoc, JSON.stringify(_apidocConfig), function() {
                                fs.writeFile(packageInfo, JSON.stringify(packages[app]), function() {
                                    if (counter == 1)
                                        done();
                                    counter--;
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    grunt.task.registerTask("check-dir", "", function() {

        var done = this.async();
        var result = [];

        var interval = setInterval(function() {
            Object.keys(packages).forEach(function(app) {
                try {
                    var isThere = fs.lstatSync(host + "/" + app + "/apidoc.json").isFile() &&
                        fs.lstatSync(host + "/" + app + "/header.md").isFile() &&
                        fs.lstatSync(host + "/" + app + "/footer.md").isFile() &&
                        fs.lstatSync(host + "/" + app + "/package.json").isFile();

                    result.push(isThere)

                } catch (error) {
                    console.log(error);
                }
            });

            var anyError = result.filter(function(x) {
                return x === false;
            });

            if (anyError.length == 0) {
                console.log("packages are ready to be generated");
                clearInterval(interval);
                done();
            }
        }, 500);
    });

    grunt.task.registerTask("apidoc", "", function() {

        Object.keys(packages).forEach(function(app, index, _self) {
            var result = apidoc.createDoc({
                src: host + "/" + app + "/controller/",
                dest: host + "/" + app + "/dist/",
                //this requires us to modify the package_info.js found in the apidoc\lib module.
                root: path.join(__dirname, host + "/" + app)
            });

            if (result === false)
                throw new Error("Failed to generate the api documentation folder.");
        });
    });

    grunt.task.registerTask("deploy", "Deploying Generated Documentations", function() {
        var done = this.async();
        var docUrls = []
        //copy the dist folder to the desired servers.
        Object.keys(packages).forEach(function(app) {
            var from = path.join(__dirname, host + "/" + app + "/dist/");
            var config = packages[app].deploy.environments[host];
            docUrls.push(config.docUrl);

            try {
                fs.copySync(from, config.path)
                console.log("Finished deploying " + app);
            } catch (error) {
                console.error(error)
            }
        });

        if (!configuration.config.SendEmailNotification)
            done();
        /*        
        // create reusable transporter object using the default SMTP transport 
        var transporter = nodemailer.createTransport({
            host: '',
            //port: 25,
            secure:true,
        });

        // setup e-mail data with unicode symbols 
        var mailOptions = {
            from: '',
            to: '',
            subject: 'Docs are updated.',
            html: '<b>API Documentation has been updated a new version has been released.</b> <br/>' + docUrls.join("<br/>")
        };

        // send mail with defined transport object 
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            console.dir(info);
            done();
        });
        */
    });

    //Npm
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Tasks
    grunt.registerTask('default', ['clean', 'mk-history', 'apidoc-prepare', 'check-dir', 'apidoc', 'deploy']);
};
