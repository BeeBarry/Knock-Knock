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

        public Task<List<User>> GetAllAsync() => _col.Find(_ => true).ToListAsync();

        public Task<User> GetByFullNameAsync(string fullName) =>
            _col.Find(user => user.FullName == fullName).FirstOrDefaultAsync();

        public Task<User?> GetByAccountIdAsync(string accountId) =>
            _col.Find(u => u.AccountId == accountId).FirstOrDefaultAsync();

        public Task<User> CreateAsync(User user)
        {
            return (Task<User>)_col.InsertOneAsync(user);
        }
    }
}
