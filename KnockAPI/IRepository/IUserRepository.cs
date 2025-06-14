using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KnockAPI.Models;

namespace KnockAPI.IRepository;

public interface IUserRepository
{
    Task<List<User>> GetAllAsync();
    Task<User> GetByFullNameAsync(string Name);
    Task<User> CreateAsync(User user);

    Task<User?> GetUserByIdAsync(string id);
}
