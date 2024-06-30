using Out_Of_Office.Server.Exceptions;

namespace Out_Of_Office.Server.MiddleWares
{
    public class ErrorHandlingMiddleWare :IMiddleware
    {
        private readonly ILogger<ErrorHandlingMiddleWare> _logger;
        public ErrorHandlingMiddleWare(ILogger<ErrorHandlingMiddleWare> logger)
        {
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch(BadConfigurationException exception)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("Some unusual error");
                _logger.LogError("BadConfiguration: " + exception.Message, exception);
            }
            catch(BadHttpRequestException exception)
            {
                context.Response.StatusCode =  exception.StatusCode;
                await context.Response.WriteAsync(exception.Message);
            }
            catch (SubdivisionNotFoundException exception)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(exception.Message);
                _logger.LogError( exception.Message, exception);
            }
            catch (Exception exception)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("Some unusual error");
                _logger.LogError(exception.Message, exception);
            }
        }
    }
}
