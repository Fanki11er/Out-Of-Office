// Ignore Spelling: Validator Validators

using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Out_Of_Office.Server.Data;
using Out_Of_Office.Server.Enums;
using Out_Of_Office.Server.Models;
using System.Text.RegularExpressions;

namespace Out_Of_Office.Server.Validators
{ 
    public class RegisterEmployeeDTOValidator: AbstractValidator<RegisterEmployeeDTO>
    {
        private readonly DataContext _dataContext;
        public RegisterEmployeeDTOValidator(DataContext dataContext)
        {
            _dataContext = dataContext;

            RuleFor(r => r.Login)
                .NotEmpty()
                .WithMessage("Login is required");

            RuleFor(r => r.Login)
               .MinimumLength(2)
               .WithMessage("Minimum login length is 2");

            RuleFor(r => r.Login)
                .Custom((value, context) =>
                {
                    var loginExists = _dataContext.Employees.Any(e => e.Login == value);
                    if (loginExists)
                    {
                        context.AddFailure("Login", "Login already exists");
                    }
                });

            RuleFor(r => r.Password)
                .MinimumLength(8)
                .WithMessage("Minimal password length is 8");

            RuleFor(r => r.ConfirmPassword).Equal(u => u.Password).
               WithMessage("Passwords are not equal");

            RuleFor(r => r.FullName).Custom((value, context) => 
            {
                string pattern = @"^[a-ząćęłńóżź]{2,}[- ]{1,1}[a-ząćęłńóżź]{2,}$";
                if (value != "" && value != null && !Regex.IsMatch(value, pattern, RegexOptions.IgnoreCase))
                {
                    context.AddFailure("Full Name", "Format: Name Surname is required");
                }
            });

            RuleFor(r => r.Subdivision).NotEmpty().WithMessage("Subdivision is required");

            RuleFor(r => r.Subdivision).Custom((value, context) =>
            {
                var subdivisionExists = _dataContext.Subdivisions.Any(s => s.Id == value);
                if (!subdivisionExists) 
                {
                    context.AddFailure("Subdivision", "Subdivision does not exist");
                }
            });

           /* RuleFor(r => r.Position)
                .NotEmpty()
                .WithMessage("Position is required");*/

            RuleFor(r => r.Position).Custom((value, context) =>
            {
                var positionExists = Enum.IsDefined(typeof(EPositions), value);
                if (!positionExists)
                {
                    context.AddFailure("Position", "Position does not exist");
                }
            });
        }
    }
}
