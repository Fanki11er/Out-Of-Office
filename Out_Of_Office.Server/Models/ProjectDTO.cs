namespace Out_Of_Office.Server.Models
{
    public class ProjectDTO
    {
        public int Id { get; set; }
        public required string ProjectType { get; set; }
        public required string StartDate { get; set; }
        public required string EndDate { get; set; }
        public required string ProjectManager { get; set; }
        public required string Status { get; set; }
        public string? Comment { get; set; } = string.Empty;

    }
}
