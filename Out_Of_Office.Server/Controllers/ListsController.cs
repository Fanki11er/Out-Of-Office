using Microsoft.AspNetCore.Mvc;
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
    }
}
