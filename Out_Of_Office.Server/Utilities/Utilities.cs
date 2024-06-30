using Out_Of_Office.Server.Entities;
using Out_Of_Office.Server.Enums;
using Out_Of_Office.Server.Exceptions;
using Out_Of_Office.Server.Models;

namespace Out_Of_Office.Server.Utilities
{
    public static class Utilities
    {
        public static EmployeeDTO CreateEmployeeDTO(Employee employee, Employee? peoplePartner)
        {
            EmployeeDTO dto = new()
            {
                Id = employee.Id,
                FullName = employee.FullName,
                Status = new CombinedValueDTO()
                {
                    Id = (int)employee.Status,
                    Value = Enum.GetName(typeof(EStatus), employee.Status) ?? ""
                },
                Subdivision = new CombinedValueDTO()
                {
                    Id = employee.Subdivision?.Id ?? throw new SubdivisionNotFoundException(),
                    Value = employee.Subdivision.Name
                },
                PeoplePartner = peoplePartner is not null ? new CombinedValueDTO()
                {
                    Id = peoplePartner.Id,
                    Value = peoplePartner.FullName
                } : null,
                Position = new CombinedValueDTO()
                {
                    Id = (int)employee.Position,
                    Value = Enum.GetName(typeof(EPositions), employee.Position) ?? ""
                },
                OutOfOfficeBalance = employee.OutOfOfficeBalance,
            };

            return dto;
        }
    }
}
