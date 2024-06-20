using Out_Of_Office.Server.Enums;

namespace Out_Of_Office.Server.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public required EProjectType ProjectType { get; set; }
        public required DateOnly StartDate { get; set; }
        public  DateOnly? EndDate { get; set; }
        public required int ProjectManager { get; set; }
        public string Comment { get; set; } = string.Empty;
        public required Status Status { get; set; }


    }
}
