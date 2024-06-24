// Ignore Spelling: Validator Validators

using FluentValidation;
using Out_Of_Office.Server.Models;

namespace Out_Of_Office.Server.Validators
{
    public class LoginEmployeeDTOValidator : AbstractValidator<LoginEmployeeDTO>
    {
        public LoginEmployeeDTOValidator()
        {
            RuleFor(r => r.Login)
                .NotEmpty()
                .WithMessage("Login is required");
        }
    }
}
