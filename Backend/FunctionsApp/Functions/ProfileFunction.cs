using System.Net;
using KnockAPI.IRepository;
using KnockAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace KnockAPI.Functions;

public class ProfileFunction
{
    private readonly ILogger<ProfileFunction> _logger;
    private readonly IProfileRepository _repo;
    private readonly IAccountRepository _accountRepo;

    public ProfileFunction(
        ILogger<ProfileFunction> logger,
        IProfileRepository repo,
        IAccountRepository accountRepo
    )
    {
        _logger = logger;
        _repo = repo;
        _accountRepo = accountRepo;
    }

    [Function("GetAllProfiles")]
    public async Task<HttpResponseData> GetAllUsers(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "users")] HttpRequestData req
    )
    {
        _logger.LogInformation("GET /users called.");

        List<Profile> users = await _repo.GetAllAsync();

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(users);
        return response;
    }

    [Function("CreateProfile")]
    public async Task<HttpResponseData> CreateUser(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = "users")] HttpRequestData req
    )
    {
        try
        {
            var dto = await req.ReadFromJsonAsync<ProfileDTO>();
            if (dto is null)
                return req.CreateResponse(HttpStatusCode.BadRequest);

            // 2. Build your User object
            var profile = new Profile
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Title = dto.Title,
                AvatarUrl = dto.AvatarUrl,
                Location = dto.Location,
            };

            // 3. Insert into MongoDB
            var created = await _repo.CreateAsync(profile);

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

    [Function("GetUserFromAccount")]
    public async Task<HttpResponseData> GetUserFromAccount(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "users/{username}")]
            HttpRequestData req,
        string username
    )
    {
        try
        {
            var account = await _accountRepo.GetByUsernameAsync(username);
            if (account is null)
                return req.CreateResponse(HttpStatusCode.NotFound);

            var user = await _repo.GetProfileByIdAsync(account.UserId);
            if (user is null)
                return req.CreateResponse(HttpStatusCode.NotFound);

            var resp = req.CreateResponse(HttpStatusCode.OK);
            await resp.WriteAsJsonAsync(user);
            return resp;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return req.CreateResponse(HttpStatusCode.BadRequest);
        }
    }
}
