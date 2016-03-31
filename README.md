#Microsoft WebAPI Controller / APIDoc Generator.

I created this tool just to make it easier for me to generate API Documentation when i changed the source code inside my controllers.
You can simply type "grunt" in your console and Boom the api documentation will get generated.

Important :
 - Make sure you modify the package_info.js file in the apidoc/module folder I added the modifed file in the ApiDoc.GruntParser folder.
 - Add the EdgeAPIContainerMarshal Class in your project next to your controllers.
 - Add the APIControllerCustomAttribute on top of your webapi controller.
