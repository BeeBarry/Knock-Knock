using KnockAPI.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace KnockAPI
{
    public class UserFunctions
    {
        private readonly ILogger<UserFunctions> _logger;
        private readonly IUserRepository _repo;
        public UserFunctions(ILogger<UserFunctions> logger, IUserRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }


        
    }
}
