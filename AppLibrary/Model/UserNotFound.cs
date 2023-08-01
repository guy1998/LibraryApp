namespace DriniLibraryApp.Model
{
    public class UserNotFound : Exception
    {

        public UserNotFound() : base("This user does not exist"){ 
        }
    }
}
