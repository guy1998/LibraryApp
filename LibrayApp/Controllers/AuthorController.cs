using Microsoft.AspNetCore.Mvc;

namespace LibraryApp.Controllers{
        [ApiController]
        [Route("[controller]")]
        public class AuthorController : ControllerBase{

            public static Proxy database = new Proxy();

            [HttpGet("authors")]
            public ActionResult<Author[]> Get(){
                Author [] authors = database.readAuthors();
                // Author[] authors = new Author[]
                // {
                //     new Author
                //     {
                //         name = "Author 1",
                //         bio = "Bio of Author 1",
                //         createdAt = DateTime.Now,
                //         nrOfBooks = 5,
                //         createdBy = "Creator 1"
                //     },
                //     new Author
                //     {
                //         name = "Author 2",
                //         bio = "Bio of Author 2",
                //         createdAt = DateTime.Now,
                //         nrOfBooks = 3,
                //         createdBy = "Creator 2"
                //     },
                //     // Add more authors as needed
                // };


                if(authors.Length == 0){
                    return NotFound();
                }

                return authors;
            }

        }
}
