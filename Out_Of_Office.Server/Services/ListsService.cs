using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Out_Of_Office.Server.Data;
using Out_Of_Office.Server.Entities;
using Out_Of_Office.Server.Enums;
using Out_Of_Office.Server.Models;

namespace Out_Of_Office.Server.Services
{
    public interface IListService
    {
        public List<EmployeeDTO> GetHRManagerEmployees();
        public List<CombinedValueDTO> GetSubdivisionOptions();
        public List<CombinedValueDTO> GetPositionOptions();
        public List<CombinedValueDTO> GetStatusOptions();
    };
    public class ListsService(DataContext dataContext, IUserContextService userContextService): IListService
    {
        private readonly DataContext _dataContext = dataContext;

        private readonly IUserContextService _userContextService = userContextService;

        public List<EmployeeDTO> GetHRManagerEmployees()
        {
            List<EmployeeDTO> employeeesDTOs = [];

            //var authenticatedUserId = _userContextService.GetUserId();
            var authenticatedUserId = 2;

            var employees = _dataContext.Employees
                .Where(emp => emp.PeoplePartnerId == authenticatedUserId)
                .Include(i => i.Subdivision)
            .ToList();

            var peoplePartner = _dataContext.Employees
                .FirstOrDefault(e => e.Id == authenticatedUserId);
            
            foreach (var employee in employees)
            {

                EmployeeDTO dto = new()
                {
                    FullName = employee.FullName,
                    Status = employee.Status,
                    Subdivision = employee.Subdivision?.Name?? "",
                    PeoplePartner = peoplePartner?.FullName?? "",
                    Position = employee.Position,
                    OutOfOfficeBalance = employee.OutOfOfficeBalance,
                };

                employeeesDTOs.Add(dto);
            }

            return employeeesDTOs;
        }

        public List<CombinedValueDTO> GetSubdivisionOptions()
        {
            List<CombinedValueDTO> combinedValueDTOs = [];

            var subdivisons = _dataContext.Subdivisions.ToList();
            foreach (var subdivision in subdivisons)
            {
                combinedValueDTOs.Add(new CombinedValueDTO()
                {
                    Id = subdivision.Id,
                    Value = subdivision.Name
                });
            }

            return combinedValueDTOs;
            
        }

        public List<CombinedValueDTO> GetPositionOptions()
        {

            List<CombinedValueDTO> combinedValueDTOs = Enum
               .GetValues(typeof(EPositions))
               .Cast<EPositions>()
               .Select(t => new CombinedValueDTO
               {
                   Id = ((int)t),
                   Value = t.ToString()
               }).ToList();
            return combinedValueDTOs;
        }

        public List<CombinedValueDTO> GetStatusOptions()
        {

            List<CombinedValueDTO> combinedValueDTOs = Enum
               .GetValues(typeof(EStatus))
               .Cast<EStatus>()
               .Select(t => new CombinedValueDTO
               {
                   Id = ((int)t),
                   Value = t.ToString()
               }).ToList();
            return combinedValueDTOs;
        }
    }
}
