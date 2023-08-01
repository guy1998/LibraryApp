namespace DriniLibraryApp.Model
{
    public class UserAlreadyExists : Exception
    {

        public UserAlreadyExists() : base("This user already exists!")
        {
        }
    }
}
