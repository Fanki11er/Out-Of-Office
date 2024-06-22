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
            catch (Exception exception)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("Some unusual error");
                _logger.LogError("Some unusual error: " + exception.Message, exception);
            }
        }
    }
}
