namespace Out_Of_Office.Server
{
    public class AuthenticationSettings
    {
        public string JWTKey { get; set; } = string.Empty;
        public int JWTExpireDays { get; set; }
        public string JWTIssuer { get; set; } = string.Empty;
    }
}
