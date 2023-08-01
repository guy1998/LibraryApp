using Microsoft.AspNetCore.Mvc;

namespace DriniLibraryApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController:ControllerBase
    {

        private static Proxy database = new Proxy();

        [HttpPut("change")]
        public ActionResult<Admin> Put([FromBody] NewUserData userData)
        {
            Console.WriteLine("Editing admin info here");
            Admin admin = database.fetchAdmin(userData.username);
            try
            {
                for(int i = 0; i < userData.columnNames.Length; i++)
                {
                    database.editAdmin(userData.username, userData.columnNames[i], userData.newValues[i]);
                }
                if (userData.columnNames.Contains("username"))
                    admin = database.fetchAdmin(userData.newValues[userData.newValues.Length - 1]);
                else
                    admin = database.fetchAdmin(userData.username);

                return Ok(admin);
            }catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }

        }

        public class NewUserData
        {
            public string username { get; set; }
            public string [] columnNames { get; set; }
            public string [] newValues { get; set; }
        }

    }
}
