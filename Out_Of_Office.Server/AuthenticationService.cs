using BCrypt.Net;
using Out_Of_Office.Server.Data;
using Out_Of_Office.Server.Entities;
using Out_Of_Office.Server.Models;
using Out_Of_Office.Server.Utilities;

namespace Out_Of_Office.Server
{
    public interface IAuthenticationService
    {
        public void RegisterEmployee(RegisterEmployeeDTO employeeDTO);
    }
    public class AuthenticationService: IAuthenticationService
    {
        private readonly DataContext _dataContext;
        public AuthenticationService(DataContext dataContext) 
        {
            _dataContext = dataContext;
        }
        public void RegisterEmployee(RegisterEmployeeDTO employeeDTO)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(employeeDTO.Password);

            Employee newEmployee = new() 
            { 
                FullName = employeeDTO.FullName,
                PasswordHash = passwordHash,
                Login = employeeDTO.Login,
                Subdivision = employeeDTO.Subdivision,
                Position = employeeDTO.Position,
                Status = employeeDTO.Status,
                PeoplePartner = employeeDTO.PeoplePartner,
                OutOfOfficeBalance = 26,
            };

            _dataContext.Add(newEmployee);

            DatabaseUtilities.SaveChangesToDatabase(_dataContext, "Can't save user in database");

        }
    }
}
