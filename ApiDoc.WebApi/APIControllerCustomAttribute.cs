namespace ApiDoc.WebApi
{
    using System;

    [AttributeUsage(AttributeTargets.Class, Inherited = true)]
    public partial class APIControllerCustomAttribute : Attribute
    {
        /// <summary>
        /// Gets or sets the unique guide Id
        /// </summary>
        public virtual string Name { get; set; }

        /// <summary>
        /// Gets or sets the version
        /// </summary>
        public string Version { get; set; }

        /// <summary>
        /// Gets or sets the description
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Gets or sets the api version
        /// </summary>
        public string Title { get; set; }
    }
}
