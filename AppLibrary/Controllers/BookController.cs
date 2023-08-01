using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using MySql.Data.MySqlClient;

namespace DriniLibraryApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController:ControllerBase
    {

        private static Proxy database = new Proxy();

        [HttpGet("books")]
        public ActionResult<Book[]> Get()
        {
            Console.WriteLine("reading books");
            try
            {
                Book[] books = database.readBooks();
                return Ok(books);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
       
        }

        [HttpPost("add")]
        public ActionResult Post([FromBody] Book book)
        {

            Console.WriteLine("Adding a book");
            try
            {
                database.addBook(book);
                return Ok();
            }catch (Exception ex)
            {
                if (ex.Message == "This book already exists")
                   return Unauthorized();
                return BadRequest();
            }
        }

        [HttpPost("photo")]
        public ActionResult Photo([FromForm] FormData photo){
            
            try{
                string path = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", photo.fileName);

                using(Stream stream = new FileStream(path, FileMode.Create)){
                    photo.file.CopyTo(stream);
                }

                return Ok();
            }catch(Exception ex){
                return BadRequest(ex.Message);
            }

        }

        public class FormData{
            public string fileName {get; set;}
            public IFormFile file {get; set;}
        }

        [HttpDelete("delete")]
        public ActionResult Delete([FromBody] Book book){
            try{
                database.deleteBook(book);
                return Ok();
            }catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }

        public class NewBookData{
            public Book book {get; set;}
            public string [] columnNames {get; set;}
            public string [] newValues {get; set;}
            public string [] newCategories {get; set;}
        }

        [HttpPut("edit")]
        public ActionResult Put([FromBody] NewBookData newBookData){

            Console.WriteLine(newBookData.book.id);
            try{
                
                if(newBookData.newCategories.Length != 0){
                    database.editBookCategories(newBookData.book, newBookData.newCategories);
                }

                if(newBookData.columnNames.Length != 0){
                    for(int i=0; i<newBookData.columnNames.Length; i++){
                        database.editBook(newBookData.book.id, newBookData.columnNames[i], newBookData.newValues[i]);
                    }
                }
                Book book = database.fetchBook(newBookData.book.id);
                return Ok(book);
            }catch(MySqlException ex){
                return BadRequest();
            }

        }

    }
}
