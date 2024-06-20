namespace Out_Of_Office.Server.Exceptions
{
    public class DatabaseNotUpdatedException(string errorMessage) : Exception(errorMessage)
    {
    }
}
