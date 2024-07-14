using Microsoft.AspNetCore.Mvc;
using Out_Of_Office.Server.Models;
using Out_Of_Office.Server.Services;


namespace Out_Of_Office.Server.Controllers
{
    [Route("authentication")]
    [ApiController]
    public class AuthenticationController(IAuthenticationService authenticationService) : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService = authenticationService;

        [HttpPost("register")]
        public ActionResult RegisterEmployee([FromBody]RegisterEmployeeDTO employeeDTO)
        {
            _authenticationService.RegisterEmployee(employeeDTO);
            return Ok();
        }

        [HttpPost("login")]

        public ActionResult<LoggedEmployeeDTO> LoginEmployee([FromBody] LoginEmployeeDTO employeeDTO) 
        {
            var token = _authenticationService.LoginEmployee(employeeDTO);

            return Ok(token);
        }

    }
}
