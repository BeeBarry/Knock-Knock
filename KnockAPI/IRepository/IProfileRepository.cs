using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KnockAPI.Models;

namespace KnockAPI.IRepository;

public interface IProfileRepository
{
    Task<List<Profile>> GetAllAsync();
    Task<Profile> GetByFullNameAsync(string Name);
    Task<Profile> CreateAsync(Profile Profile);

    Task<Profile?> GetProfileByIdAsync(string id);
}
