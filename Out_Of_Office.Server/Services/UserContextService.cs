using System.Security.Claims;

namespace Out_Of_Office.Server.Services
{
    public interface IUserContextService
    {
        public int GetUserId();
    }
    public class UserContextService(IHttpContextAccessor httpContextAccessor): IUserContextService
    {
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

        public int GetUserId()
        {
            ClaimsPrincipal? user = (_httpContextAccessor.HttpContext?.User) ?? 
                throw new BadHttpRequestException("Wrong user data");

            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier) ?? 
                throw new BadHttpRequestException("Wrong user data");

            return int.Parse(userId);
        }

    }
}
