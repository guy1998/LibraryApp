using Microsoft.AspNetCore.Mvc;
using System;

namespace DriniLibraryApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {

        private static Proxy database = new Proxy();

        [HttpPost("log")]
        public ActionResult<Admin> Post([FromBody] LoginInfo credentials)
        {
            Admin admin = null;
            try
            {
                admin = database.fetchAdmin(credentials.username);
            }
            catch (Exception ex)
            {
                if (ex.Message == "This user does not exist")
                    return NotFound(ex.Message);
                else{
                    Console.WriteLine(ex.Message);
                    return BadRequest(ex.Message);
                }
            }

            if (admin.password != credentials.password)
            {
                return Unauthorized("Wrong password");
            }

            return Ok(admin);
        }

        [HttpPost("signup")]
        public ActionResult<Admin> Post([FromBody] SignUpInfo credentials)
        {

            Console.WriteLine("It is happening");
            Admin admin = null;
            try
            {
                admin = database.addAdmin(credentials.name, credentials.username, credentials.password);
            }catch (Exception ex)
            {
                if(ex.Message == "This user already exists!")
                    return Unauthorized(ex.Message);
                else {
                    Console.WriteLine(ex.Message);
                    return BadRequest(ex.Message);
                }
            }

            return Ok(admin);
        }

        public class LoginInfo
        {
            public string username { get; set; }
            public string password { get; set; }

        }

        public class SignUpInfo
        {
            public string name { get; set; }   
            public string username { get; set; }
            public string password { get; set; }    
        }
    }

}
