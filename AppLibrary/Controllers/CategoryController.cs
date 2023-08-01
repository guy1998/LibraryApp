using Microsoft.AspNetCore.Mvc;
using System.Data.Common;

namespace DriniLibraryApp.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private static Proxy database = new Proxy();

        [HttpGet("categories")]
        public ActionResult<Category[]> Get()
        {
            try
            {
                Category[] categories = database.readCategories();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        //Add new property IsPremium on category model.
        //Add checkbox on category form to collect the info from the user and save it on database.
        //Add a new endpoint to get all premium categories.
        //Display these categories on a table.

        //Create a SQL query to get all categories(name) with book count
        //Select only those categories that have more than 1 book.

        [HttpPost("add")]
        public ActionResult Post([FromBody] Category category)
        {

            Console.WriteLine(category.premium);
            try
            {
                database.addCategory(category);
                return Ok();
            }
            catch (Exception ex)
            {
                if(ex.Message == "This category already exists!")
                   return Unauthorized(ex.Message);
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete("delete")]
        public ActionResult Delete([FromBody] Category category)
        {
            Console.WriteLine("Deleting category");
            try
            {
                database.deleteCategory(category.categoryName);
                return Ok();
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("edit")]
        public ActionResult Put([FromBody] EditingInfo editInfo)
        {
            Console.WriteLine("Editing category");
            try
            {
                for(int i=0; i<editInfo.columnNames.Length; i++)
                    database.editCategory(editInfo.categoryName, editInfo.columnNames[i], editInfo.columnValues[i]);
                return Ok();
            }catch (Exception ex)
            {
                return BadRequest($"{ex.Message}"); 
            }
        }

        public class EditingInfo
        {
            public string categoryName { get; set; }
            public string [] columnNames { get; set;}
            public string[] columnValues { get; set;}
        }

        [HttpGet("getpremium")]
        public ActionResult<Category[]> GetPremium(){

            try{
                Category [] premium = database.getPremium();
                return Ok(premium);
            }catch(Exception ex){
                return NotFound(ex.Message);
            }

        }
    }
}
