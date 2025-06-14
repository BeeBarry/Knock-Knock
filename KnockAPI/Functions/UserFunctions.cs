using KnockAPI.IRepository;
using KnockAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Net;

namespace KnockAPI.Functions;

public class UserFunctions
{
    private readonly ILogger<UserFunctions> _logger;
    private readonly IUserRepository _repo;

    public UserFunctions(ILogger<UserFunctions> logger, IUserRepository repo)
    {
        _logger = logger;
        _repo = repo;
    }

    [Function("GetAllUsers")]
    public async Task<HttpResponseData> GetAllUsers(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "users")] HttpRequestData req)
    {
        _logger.LogInformation("GET /users called.");

        List<User> users = await _repo.GetAllAsync();

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(users);
        return response;
    }

    [Function("CreateUser")]
    public async Task<HttpResponseData> CreateUser(
    [HttpTrigger(AuthorizationLevel.Function, "post", Route = "users")]
    HttpRequestData req)
    {
        try
        {

            var dto = await req.ReadFromJsonAsync<UserDTO>();
            if (dto is null)
                return req.CreateResponse(HttpStatusCode.BadRequest);

            // 2. Build your User object
            var user = new User
            {
                AccountId = dto.AccountId,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Title = dto.Title,
                AvatarUrl = dto.AvatarUrl,
                Location = dto.Location
            };

            // 3. Insert into MongoDB
            var created = await _repo.CreateAsync(user);

            // 4. Return 201 Created with the new object
            var resp = req.CreateResponse(HttpStatusCode.Created);
            await resp.WriteAsJsonAsync(created);
            return resp;

        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return req.CreateResponse(HttpStatusCode.BadRequest);
        }
    }
}
