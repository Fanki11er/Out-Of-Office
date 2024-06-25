using Microsoft.EntityFrameworkCore;
using Out_Of_Office.Server.Entities;
using System.Collections.Generic;

namespace Out_Of_Office.Server.Data
{
    public class DbSeeder(DataContext dataContext)
    {
        private readonly DataContext _dataContext = dataContext;

        public void Seed()
        {
            if (_dataContext.Database.CanConnect())
            {
                var pendingMigrations = _dataContext.Database.GetPendingMigrations();

                if (pendingMigrations != null && pendingMigrations.Any())
                {
                    _dataContext.Database.Migrate();
                }

                if (!_dataContext.AbsenceReasons.Any())
                {
                    var absenceReasons = CreateAbsenceReasons();

                    _dataContext.AddRange(absenceReasons);

                    _dataContext.SaveChanges();
                }

                if (!_dataContext.ProjectTypes.Any())
                {
                    var projectTypes = CreateProjectTypes();

                    _dataContext.AddRange(projectTypes);

                    _dataContext.SaveChanges();
                }

                if (!_dataContext.Subdivisions.Any())
                {
                    var subdivisions = CreateSubdivisions();

                    _dataContext.AddRange(subdivisions);

                    _dataContext.SaveChanges();
                }

                if (!_dataContext.Employees.Any())
                {
                    var employees = CreateEmployees();

                    _dataContext.AddRange(employees);

                    _dataContext.SaveChanges();
                }
            }
        }

        private static List<AbsenceReason> CreateAbsenceReasons()
        {
            var absenceReasons = new List<AbsenceReason>()
            {
                new()
                {
                    Value = "Other"
                },
                new()
                {
                    Value = "Vacation"
                },
                new()
                {
                    Value = "Leave on request"
                },
                new()
                {
                    Value = "Sick leave"
                },
            };

            return absenceReasons;
        }
        private static List<ProjectType> CreateProjectTypes()
        {
            var projectTypes = new List<ProjectType>()
            {
                new()
                {
                    Value = "Internal"
                },
                new()
                {
                    Value = "Project API"
                },
                new()
                {
                    Value = "HR Project"
                },
                new()
                {
                    Value = "Front-end"
                },
                new()
                {
                    Value = "Back-end"
                },
                new()
                {
                    Value = "Database Project"
                },
                new()
                {
                    Value = "AI Project"
                },
            };

            return projectTypes;
        }
        private static List<Subdivision> CreateSubdivisions()
        {
            var subdivisions = new List<Subdivision>()
            {
                new()
                {
                    Name = "Back-end"
                },
                new()
                {
                    Name = "Front-end"
                },
                new()
                {
                    Name = "Big data"
                },
                new()
                {
                    Name = "Artificial Intelligence"
                },
            };

            return subdivisions;
        }

        private static List<Employee> CreateEmployees()
        {
            var employees = new List<Employee>()
            {
                new()
                {
                    Login =  "DziedzicK",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("12345678"),
                    FullName = "Krzysztof Dziedzic",
                    Status = Enums.EStatus.Active,
                    Position = Enums.EPositions.HRDirector,
                    SubdivisionId = 1,
                    OutOfOfficeBalance = 26
                },
                new()
                {
                    Login =  "HRManager1",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("12345678"),
                    FullName = "Krzysztof Góral",
                    Status = Enums.EStatus.Active,
                    Position = Enums.EPositions.HRManager,
                    SubdivisionId = 1,
                    OutOfOfficeBalance = 26,
                    PeoplePartnerId = 1,       
                },
                new()
                {
                    Login =  "Employee1",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("12345678"),
                    FullName = "Marta Grabowska",
                    Status = Enums.EStatus.Active,
                    Position = Enums.EPositions.Employee,
                    SubdivisionId = 1,
                    PeoplePartnerId = 2,
                    OutOfOfficeBalance = 26
                },
                 new()
                {
                    Login =  "Employee2",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("12345678"),
                    FullName = "Patryk Gruszka",
                    Status = Enums.EStatus.Active,
                    Position = Enums.EPositions.Employee,
                    SubdivisionId = 2,
                    PeoplePartnerId = 2,
                    OutOfOfficeBalance = 20
                }
            };

            return employees;
        }
    }
}
