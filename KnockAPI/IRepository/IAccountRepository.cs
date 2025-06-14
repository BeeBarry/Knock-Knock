using KnockAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KnockAPI.IRepository
{
    public interface IAccountRepository
    {
        Task<Account?> GetByUsernameAsync(string username);
        Task<Account?> CreateAsync(Account account);
    }
}
