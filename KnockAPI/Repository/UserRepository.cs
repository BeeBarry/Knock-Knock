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
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _col;

        public UserRepository(IMongoDatabase db)
        {
            _col = db.GetCollection<User>("Users");
        }

        public async Task<List<User>> GetAllAsync() => await _col.Find(_ => true).ToListAsync();

        public async Task<User> GetByFullNameAsync(string fullName) => await
            _col.Find(user => user.FullName == fullName).FirstOrDefaultAsync();

        public async Task<User?> GetByAccountIdAsync(string accountId) =>
            await _col.Find(u => u.AccountId == accountId).FirstOrDefaultAsync();

        public async Task<User> CreateAsync(User user)
        {
            await _col.InsertOneAsync(user);
            return user;

        }
    }
}
