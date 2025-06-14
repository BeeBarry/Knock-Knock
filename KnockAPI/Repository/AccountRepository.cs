using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KnockAPI.IRepository;
using KnockAPI.Models;
using MongoDB.Driver;

namespace KnockAPI.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IMongoCollection<Account> _col;
        private readonly IUserRepository _user;

        public AccountRepository(IMongoDatabase db, IUserRepository user)
        {
            _col = db.GetCollection<Account>("Accounts");
            _user = user;
        }

        public async Task<Account?> GetByUsernameAsync(string username)
        {
            try
            {
                var result = await _col.Find(a => a.Username.ToLower() == username.ToLower())
                    .FirstOrDefaultAsync();
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving account by username: {ex.Message}");
                return null;
            }
        }

        public async Task<Account> CreateAsync(Account account)
        {
            try
            {
                var user = new User();
               
                await _user.CreateAsync(user);
                account.UserId = user.Id; 
                await _col.InsertOneAsync(account);
                return account;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating account: {ex.Message}");
                return null;
            }
        }
    }
}
