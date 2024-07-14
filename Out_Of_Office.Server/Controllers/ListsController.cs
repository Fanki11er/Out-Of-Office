using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Out_Of_Office.Server.Enums;
using Out_Of_Office.Server.Models;
using Out_Of_Office.Server.Services;

namespace Out_Of_Office.Server.Controllers
{

    [Route("lists")]
    [ApiController]
    [Authorize]
    public class ListsController(IListService listService) : ControllerBase
    {
        private readonly IListService _listService = listService;
        private string Roles = "";

        [HttpGet("employeesHR")]
        [Authorize(Roles = "HR_Manager")]
        public ActionResult<EmployeeDTO[]> GetHRManagerEmployees()
        {
            var result = _listService.GetHRManagerEmployees();

            return Ok(result);
        }

        [HttpGet("leaveRequestsHR")]
        [Authorize(Roles = "HR_Manager")]
        public ActionResult<List<LeaveRequestDTO>> GetHRManagerLeaveRequests()
        {
            var result = _listService.GetHRManagerLeaveRequests();

            return Ok(result);
        }

        [HttpGet("leaveRequestsEmployee")]
        [Authorize(Roles = "Employee")]
        public ActionResult<List<LeaveRequestDTO>> GetEmployeeLeaveRequests()
        {
            var result = _listService.GetEmployeeLeaveRequests();

            return Ok(result);
        }

        [HttpPost("leaveRequestsEmployee")]
        [Authorize(Roles = "Employee")]
        public ActionResult CreateNewEmployeeLeaveRequest([FromBody] NewLeaveRequestDTO newLeaveRequestDTO)
        {
            _listService.CreateNewEmployeeLeaveRequest(newLeaveRequestDTO);

            return Ok();
        }

        [HttpPut("leaveRequestsEmployee")]
        [Authorize(Roles = "Employee")]
        public ActionResult EditEmployeeLeaveRequest([FromBody] EditLeaveRequestDTO editLeaveRequestDTO)
        {
            _listService.EditEmployeeLeaveRequest(editLeaveRequestDTO);

            return Ok();
        }

        [HttpPut("leaveRequestsEmployeeChangeStatus")]
        [Authorize(Roles = "Employee")]
        public ActionResult ChangeLeaveRequestStatus([FromBody] ChangeLeaveRequestStatusDTO newStatusDTO)
        {
            _listService.ChangeLeaveRequestStatus(newStatusDTO);

            return Ok();
        }

        [HttpGet("approvalRequestsManagers")]
        [Authorize(Roles = "HR_Manager,Project_Manager")]
        public ActionResult<List<ApprovalRequestDTO>> GetHRManagerApprovalRequests()
        {
            var result = _listService.GetHRManagerApprovalRequests();

            return Ok(result);
        }

        [HttpGet("approvalRequestsEmployee")]
        [Authorize(Roles = "Employee")]
        public ActionResult<List<ApprovalRequestDTO>> GetEmployeeApprovalRequests()
        {
            var result = _listService.GetEmployeeApprovalRequests();

            return Ok(result);
        }

        [HttpGet("projectsHR")]
        [Authorize(Roles = "HR_Manager")]
        public ActionResult<List<ProjectDTO>> GetHRManagerProjects()
        {
            var result = _listService.GetHRManagerProjects();

            return Ok(result);
        }

        [HttpGet("projectsEmployee")]
        [Authorize(Roles = "Employee")]
        public ActionResult<List<ProjectDTO>> GetEmployeeProjects()
        {
            var result = _listService.GetEmployeeProjects();

            return Ok(result);
        }

        [HttpPut("approvalRequestsManagers")]
        [Authorize(Roles = "HR_Manager,Project_Manager")]
        public ActionResult ChangeApproveRequestStatus([FromBody] ChangeApprovalRequestStatusDTO newStatusDTO)
        {
            _listService.ChangeApprovalRequestStatus(newStatusDTO);

            return Ok();
        }

        [HttpPut("employeesHR")]
        [Authorize(Roles = "HR_Manager")]
        public ActionResult<EmployeeDTO> UpdateHRManagerEmployeeList([FromBody] EmployeeDTO employeeDTO)
        {
            var result = _listService.UpdateHRManagerEmployeeList(employeeDTO);

            return Ok(result);
        }


        [HttpGet("subdivisions")]
        public ActionResult<List<CombinedValueDTO>> GetSubdivisionOptions() 
        {
            var result = _listService.GetSubdivisionOptions();

            return Ok(result);
        }

        [HttpGet("peoplePartners")]
        public ActionResult<List<CombinedValueDTO>> GetPeoplePartnerOptions()
        {
            var result = _listService.GetPeoplePartnerOptions();

            return Ok(result);
        }

        [HttpGet("positions")]
        public ActionResult<List<CombinedValueDTO>> GetPositionOptions()
        {
            var result = _listService.GetPositionOptions();

            return Ok(result);
        }

        [HttpGet("statuses")]
        public ActionResult<List<CombinedValueDTO>> GetStatusOptions()
        {
            var result = _listService.GetStatusOptions();

            return Ok(result);
        }

        [HttpGet("absenceReasons")]
        public ActionResult<List<CombinedValueDTO>> GetAbsenceReasonOptions()
        {
            var result = _listService.GetAbsenceReasonOptions();

            return Ok(result);
        }

    }
}
