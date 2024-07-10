// Ignore Spelling: Validator Validators

using FluentValidation;
using Out_Of_Office.Server.Enums;
using Out_Of_Office.Server.Models;

namespace Out_Of_Office.Server.Validators
{
    public class ChangeApprovalRequestStatusDTOValidator: AbstractValidator<ChangeApprovalRequestStatusDTO>
    {

        public ChangeApprovalRequestStatusDTOValidator() {

            var values = new List<string>()
            {
                ERequestStatus.Accepted.ToString(),
                ERequestStatus.Rejected.ToString(),
            };

            RuleFor(s => s.NewStatus)
                .Must(c => values.Contains(c))
                .WithMessage("Incorrect request status value");
        }
    }
}
