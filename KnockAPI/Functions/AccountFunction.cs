using System.Net;
using KnockAPI.IRepository;
using KnockAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace KnockAPI.Functions;

public class AccountFunction
{
    private readonly ILogger<AccountFunction> _logger;
    private readonly IAccountRepository _repo;

    public AccountFunction(ILogger<AccountFunction> logger, IAccountRepository repo)
    {
        _logger = logger;
        _repo = repo;
    }

    [Function("GetByUsername")]
    public async Task<HttpResponseData> GetByUsername(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "username/{username}")] HttpRequestData req,
        string username
    )
    {
        try
        {
            _logger.LogInformation("GET /users called.");
            
            
           
            var account = await _repo.GetByUsernameAsync(username);
            var response = req.CreateResponse(HttpStatusCode.OK);
            await response.WriteAsJsonAsync(account);
            return response;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving account by username.");
            return req.CreateResponse(HttpStatusCode.BadRequest);
        }
    }

    [Function("Register")]
    public async Task<HttpResponseData> RegisterAccount(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "register")] HttpRequestData req
    )
    {
        try
        {
            var dto = await req.ReadFromJsonAsync<AccountDTO>();
            if (dto is null)
                return req.CreateResponse(HttpStatusCode.BadRequest);

            var account = new Account
            {
              
                Username = dto.Username,
                Password = dto.Password,
            };

            var result = await _repo.CreateAsync(account);

            var resp = req.CreateResponse(HttpStatusCode.Created);
            await resp.WriteAsJsonAsync(result);
            return resp;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return req.CreateResponse(HttpStatusCode.BadRequest);
        }
    }
}
