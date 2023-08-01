namespace DriniLibraryApp.Model
{
    public class CategoryAlreadyExists : Exception
    {
        public CategoryAlreadyExists() : base("This category already exists!")
        {

        }
    }
}
