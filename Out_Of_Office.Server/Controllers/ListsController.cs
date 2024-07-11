using Microsoft.AspNetCore.Mvc;
using Out_Of_Office.Server.Models;
using Out_Of_Office.Server.Services;

namespace Out_Of_Office.Server.Controllers
{

    [Route("lists")]
    [ApiController]
    public class ListsController(IListService listService) :ControllerBase
    {
        private readonly IListService _listService = listService;

        [HttpGet("employeesHR")]
        public ActionResult<EmployeeDTO[]> GetHRManagerEmployees()
        {
            var result = _listService.GetHRManagerEmployees();

            return Ok(result);
        }

        [HttpGet("leaveRequestsHR")]
        public ActionResult<List<LeaveRequestDTO>> GetHRManagerLeaveRequests()
        {
            var result = _listService.GetHRManagerLeaveRequests();

            return Ok(result);
        }

        [HttpGet("approvalRequestsHR")]
        public ActionResult<List<ApprovalRequestDTO>> GetHRManagerApprovalRequests()
        {
            var result = _listService.GetHRManagerApprovalRequests();

            return Ok(result);
        }

        [HttpGet("projectsHR")]
        public ActionResult<List<ProjectDTO>> GetHRManagerProjects()
        {
            var result = _listService.GetHRManagerProjects();

            return Ok(result);
        }

        [HttpGet("projectsEmployee")]
        public ActionResult<List<ProjectDTO>> GetEmployeeProjects()
        {
            var result = _listService.GetEmployeeProjects();

            return Ok(result);
        }

        [HttpPut("approvalRequestsHR")]
        public ActionResult ChangeApproveRequestStatus([FromBody] ChangeApprovalRequestStatusDTO newStatusDTO)
        {
            _listService.ChangeApprovalRequestStatus(newStatusDTO);

            return Ok();
        }

        [HttpPut("employeesHR")]
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

    }
}
