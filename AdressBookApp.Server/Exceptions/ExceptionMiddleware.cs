using Newtonsoft.Json.Linq;
using System.Net;

namespace AdressBookApp.Server.Exceptions;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;


    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (HttpRequestException ex)
        {
            await HandleExceptionAsync(httpContext, ex);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(httpContext, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        string logMessage = exception.Message + (exception?.InnerException?.Message != null ? Environment.NewLine + exception?.InnerException?.Message : "")
            + Environment.NewLine + exception.StackTrace;
        _logger.LogError(exception, logMessage);

        context.Response.ContentType = "application/json";

        if (exception is HttpRequestException)
        {
            context.Response.StatusCode = (int)(((HttpRequestException)exception)?.StatusCode ?? HttpStatusCode.InternalServerError);
            await context.Response.WriteAsync(JObject.FromObject(new
            {
                StatusCode = context.Response.StatusCode,
                message = exception.Message
            }).ToString());
        }
        else
        {
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            await context.Response.WriteAsync(new
            {
                StatusCode = context.Response.StatusCode,
                Message = exception.Message
            }.ToString());
        }

    }
}
