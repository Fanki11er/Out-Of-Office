using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Out_Of_Office.Server.Models;

namespace Out_Of_Office.Server.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("register")]
        public ActionResult RegisterEmployee(RegisterEmployeeDTO employeeDTO)
        {
            _authenticationService.RegisterEmployee(employeeDTO);
            return Ok();
        }
    }
}
