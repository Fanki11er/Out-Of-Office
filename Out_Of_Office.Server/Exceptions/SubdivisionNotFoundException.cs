namespace Out_Of_Office.Server.Exceptions
{
    public class SubdivisionNotFoundException(string? message = "Subdivision not found"): Exception(message)
    {
    }
}
