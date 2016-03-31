namespace ApiDoc.WebApiCore
{
    using System;
    using System.Collections.Generic;
    using System.Reflection;
    using System.Threading.Tasks;
    using System.Linq;
    using System.Dynamic;
    using System.Web.Http;
    using ApiDoc.WebApiCore;

    /// <summary>
    /// Helper Class for marshaling webapi controllers attributes from C# web nodejs via Edge.
    /// </summary>
    public class EdgeAPIContainerMarshal
    {
        public async Task<object> GeneratePackages(dynamic input)
        {

            try
            {
                var controllerInfos = GetTypesWithHelpAttribute(Assembly.GetExecutingAssembly());

                return  controllerInfos.Select((it) =>
                {
                    var attributes = it.GetCustomAttribute<APIControllerCustomAttribute>();
                    var router = it.GetCustomAttribute<RoutePrefixAttribute>();

                    dynamic module = new ExpandoObject();

                    module.key = attributes.Name.ToLower();
                    module.title = attributes.Title;
                    module.version = attributes.Version;
                    module.description = attributes.Description;
                    module.controller = it.Name;
                    module.deploy = new ExpandoObject();

                    module.deploy.environments = new {
                        debug = new
                        {
                            path = @"path/to/your/local/path" + attributes.Name,
                            sampleUrl = "https://localhost/docs/" + router.Prefix,
                            docUrl = "http://localhost/docs/" + attributes.Name
                        },
                        sandbox = new
                        {
                            path = @"path/to/your/sandbox/path" + attributes.Name,
                            sampleUrl = "https://sandbox/docs/" + router.Prefix,
                            docUrl = "http://sandbox/docs/" + attributes.Name
                        },
                        production = new
                        {
                            path = @"path/to/your/production/path" + attributes.Name,
                            sampleUrl = "https://production/docs/" + router.Prefix,
                            docUrl = "http://production/docs/" + attributes.Name
                        }
                    };
                    

                    return module;
                })
                .ToList();

            }
            catch (Exception exception)
            {
                return exception.Message;
            }
        }

        private IEnumerable<Type> GetTypesWithHelpAttribute(Assembly assembly)
        {
            foreach (Type type in assembly.GetTypes())
            {
                if (type.GetCustomAttributes(typeof(APIControllerCustomAttribute), true).Length > 0)
                {
                    yield return type;
                }
            }
        }
    }
}
