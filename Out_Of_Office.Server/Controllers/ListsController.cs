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
        public ActionResult GetHRManagerEmployees()
        {
            var result = _listService.GetHRManagerEmployees();

            return Ok(result);
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
