namespace ApiDoc.WebApi.Controllers
{
    using ApiDoc.WebApi;
    using System.Web.Http;

    [RoutePrefix("api/test")]
    [APIControllerCustom(
     Name = "Test",
     Description = "Test API Documentation",
     Version = "1.0.0",
     Title = "Test API")]
    public class TestController : BaseApiController
    {
        /**
         * @api {get} account/view/{id} view account
         * @apiName My Account
         * @apiDescription Gets the information of a user based on his Id.
         * @apiVersion 1.0.0
         * @apiGroup Account
         * @apiSampleRequest account/view/1
         * @apiHeader {String} consumer-key your consumer access token
         * @apiHeader {String} consumer-secret your secret access key.
         * @apiSuccess {Boolean} success Represents if the operation went through successfully.
         * @apiSuccess {Object} profile the user information
         * @apiSuccess {Number} profile.id the user Id
         * @apiSuccess {String} profile.name the user's full name
         * @apiSuccess {String} profile.emailAddress the user's email address.
         * @apiUse MaintenanceBreak
         * */
        [Route("account/view/{id}")]
        [HttpGet]
        public virtual IHttpActionResult GetProfile([FromUri] int Id)
        {
            return Ok(new
            {
                Success = true,
                Profile = new
                {
                    Id = 1,
                    Name = "Mohammad Shehab",
                    EmailAddress = "Chehabz@hotmail.com"
                }
            });
        }
    }
}
