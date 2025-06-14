using KnockAPI.IRepository;
using KnockAPI.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KnockAPI.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IMongoCollection<Account> _col;
        public AccountRepository(IMongoDatabase db) =>
            _col = db.GetCollection<Account>("Accounts");

        public Task<Account?> GetByUsernameAsync(string username) =>
            _col
              .Find(a => a.Username.ToLower() == username.ToLower())
              .FirstOrDefaultAsync();

        public Task<Account> CreateAsync(Account account) =>
           (Task<Account?>)_col
            .InsertOneAsync(account);
          
    }
}
