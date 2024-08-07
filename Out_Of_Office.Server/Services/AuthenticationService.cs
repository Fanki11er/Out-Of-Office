﻿
using Microsoft.IdentityModel.Tokens;
using Out_Of_Office.Server.Data;
using Out_Of_Office.Server.Entities;
using Out_Of_Office.Server.Enums;
using Out_Of_Office.Server.Models;
using Out_Of_Office.Server.Utilities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Out_Of_Office.Server.Services
{
    public interface IAuthenticationService
    {
        public void RegisterEmployee(RegisterEmployeeDTO employeeDTO);
        public LoggedEmployeeDTO LoginEmployee(LoginEmployeeDTO employeeDTO);
    }
    public class AuthenticationService(DataContext dataContext, AuthenticationSettings authenticationSettings, IUserContextService userContextService) : IAuthenticationService
    {
        private readonly DataContext _dataContext = dataContext;
        private readonly AuthenticationSettings _authenticationSettings = authenticationSettings;
        private readonly IUserContextService _userContextService = userContextService;
        public void RegisterEmployee(RegisterEmployeeDTO employeeDTO)
        {
            var userId = _userContextService.GetUserId();
 

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(employeeDTO.Password);

            Employee newEmployee = new()
            {
                FullName = employeeDTO.FullName,
                PasswordHash = passwordHash,
                Login = employeeDTO.Login,
                SubdivisionId = employeeDTO.Subdivision,
                Position = (EPositions)(employeeDTO.Position),
                Status = EStatus.Inactive,
                PeoplePartnerId = userId,
                OutOfOfficeBalance = 26,
            };

            _dataContext.Add(newEmployee);

            DatabaseUtilities.SaveChangesToDatabase(_dataContext, "Can't save employee in database");

        }

        public LoggedEmployeeDTO LoginEmployee(LoginEmployeeDTO employeeDTO)
        {
            var employee = _dataContext.Employees
                .FirstOrDefault(e => e.Login == employeeDTO.Login) ?? 
                throw new BadHttpRequestException("Invalid Login or Password");

            if(!BCrypt.Net.BCrypt.Verify(employeeDTO.Password, employee.PasswordHash))
            {
                throw new BadHttpRequestException("Invalid Login or Password");
            }

            var token = CreateToken(employee);
            var loggedEmployeeDTO = new LoggedEmployeeDTO()
            {
                FullName = employee.FullName,
                Position = employee.Position.ToString(),
                Token = token,
            };

            return loggedEmployeeDTO;
        }

        private string CreateToken(Employee employee)
        {
            List<Claim> claims =
            [
                new Claim(ClaimTypes.NameIdentifier, employee.Id.ToString()),
                new Claim(ClaimTypes.Name, employee.Login),
                new Claim(ClaimTypes.Role, employee.Position.ToString()),
                new Claim("FullName", employee.FullName)
            ];

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JWTKey));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken
                (
                _authenticationSettings.JWTIssuer,
                _authenticationSettings.JWTIssuer,
                claims,
                expires: DateTime.Now.AddDays(_authenticationSettings.JWTExpireDays),
                signingCredentials: credentials
                );

            var tokenHandler = new JwtSecurityTokenHandler();

            return tokenHandler.WriteToken(token);
        }
    }
}
