using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;

namespace DriniLibraryApp.Controllers{

[ApiController]
[Route("[controller]")]
public class ImageController : ControllerBase{

    private static Proxy database = new Proxy();

    [HttpPost("bookimg")]
    public ActionResult Post([FromForm] BookPhotoData photo){
            
            Console.WriteLine("Editing photo here");
            try{
                string path = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", photo.fileName);
                string uniqueFileName = photo.fileName;
            while(true){
                try{
                    using(Stream stream = new FileStream(path, FileMode.Create)){
                        photo.file.CopyTo(stream);
                    }
                    break;
                }catch(IOException ex){
                    if(ex.Message == "The file exists."){
                        uniqueFileName = $"{Path.GetFileNameWithoutExtension(photo.fileName)}_{Guid.NewGuid()}{Path.GetExtension(photo.fileName)}";
                        path = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", uniqueFileName);
                    }
                }
            }
                string finalPath = "./" + uniqueFileName;
                database.editBook(photo.bookId, "imagePath", finalPath);
                return Ok();
            }catch(Exception ex){
                return BadRequest(ex.Message);
            }

    }

    public class BookPhotoData{
            public string fileName {get; set;}
            public IFormFile file {get; set;}
            public string bookId {get; set;}
    }

    [HttpPost("userimg")]
    public ActionResult Post([FromForm] UserPhotoData photo){

        Console.WriteLine("Editing user photo here");
        try{
            string path = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", photo.fileName);
            string uniqueFileName = photo.fileName;
            while(true){
                try{
                    using(Stream stream = new FileStream(path, FileMode.Create)){
                        photo.file.CopyTo(stream);
                    }
                    break;
                }catch(IOException ex){
                    if(ex.Message == "The file exists."){
                        uniqueFileName = $"{Path.GetFileNameWithoutExtension(photo.fileName)}_{Guid.NewGuid()}{Path.GetExtension(photo.fileName)}";
                        path = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", uniqueFileName);
                    }
                }
            }
            database.editAdmin(photo.username, "img_path", "./" + uniqueFileName);
            return Ok();
        }catch(Exception ex){
            return BadRequest(ex.Message);
        }

    }

    public class UserPhotoData{
        public string fileName {get; set;}
        public IFormFile file {get; set;}
        public string username {get; set;}
    }

}

}