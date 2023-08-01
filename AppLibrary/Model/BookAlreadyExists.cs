namespace DriniLibraryApp.Model
{
    public class BookAlreadyExists:Exception
    {
        public BookAlreadyExists() : base("This book already exists"){ }
    }
}
