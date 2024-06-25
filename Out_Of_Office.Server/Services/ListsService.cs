using Microsoft.EntityFrameworkCore;
using Out_Of_Office.Server.Data;
using Out_Of_Office.Server.Entities;
using Out_Of_Office.Server.Models;

namespace Out_Of_Office.Server.Services
{
    public interface IListService
    {
        public List<EmployeeDTO> GetHRManagerEmployees();
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
    }
}
