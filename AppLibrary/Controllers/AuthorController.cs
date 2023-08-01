using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace DriniLibraryApp.Controllers{
        [ApiController]
        [Route("[controller]")]
        public class AuthorController : ControllerBase{

            public static Proxy database = new Proxy();

            [HttpGet("authors")]
            public ActionResult<Author[]> Get(){
            Author[] authors = database.readAuthors();
       
            if (authors.Length == 0){
                    return NotFound();
                }

                return authors;
            }

            [HttpPost("add")]
            public ActionResult Post([FromBody] Author author)
            {
                try
                {
                    database.addAuthor(author);
                    return Ok();
                }catch (MySqlException ex)
                {
                    return BadRequest(ex.Message);
                }
            }

            [HttpDelete("delete")]
            public ActionResult Delete([FromBody] Author author)
            {
                try
                {
                    database.removeAuthor(author);
                    return Ok();
                }catch(MySqlException ex) 
                { 
                return BadRequest(ex.Message);
                }
            }

            [HttpPut("edit")]
            public ActionResult Put([FromBody] Author author, [FromQuery] string [] columnNames, [FromQuery] string [] newValues)
            {
            Console.WriteLine("Okay it happening");
            try
                {
                    for(int i=0; i<columnNames.Length; i++)
                    {
                        database.editAuthor(author, columnNames[i], newValues[i]);
                    }
                    return Ok();
                }catch(MySqlException ex)
                {
                Console.WriteLine(ex.Message);
                    return BadRequest(ex.Message);
                }

            }   

        }
}
