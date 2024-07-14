// Ignore Spelling: Validator Validators

using FluentValidation;
using Out_Of_Office.Server.Enums;
using Out_Of_Office.Server.Models;

namespace Out_Of_Office.Server.Validators
{
    public class ChangeLeaveRequestStatusDTOValidator: AbstractValidator<ChangeLeaveRequestStatusDTO>
    {
        public ChangeLeaveRequestStatusDTOValidator()
        {

            var values = new List<string>()
            {
                ERequestStatus.Submitted.ToString(),
                ERequestStatus.Cancelled.ToString(),
            };

            RuleFor(s => s.NewStatus)
                .Must(c => values.Contains(c))
                .WithMessage("Incorrect request status value");
        }
    }
}
