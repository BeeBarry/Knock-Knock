using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KnockAPI.IRepository;
using KnockAPI.Models;
using MongoDB.Driver;

namespace KnockAPI.Repository;

public class ProfileRepository : IProfileRepository
{
    private readonly IMongoCollection<Profile> _col;

    public ProfileRepository(IMongoDatabase db)
    {
        _col = db.GetCollection<Profile>("Profiles");
    }

    public async Task<List<Profile>> GetAllAsync() => await _col.Find(_ => true).ToListAsync();

    public async Task<Profile> GetByFullNameAsync(string fullName) =>
        await _col.Find(Profile => Profile.FullName == fullName).FirstOrDefaultAsync();

    public async Task<Profile?> GetProfileByIdAsync(string id)
    {
        return await _col.Find(Profile => Profile.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Profile> CreateAsync(Profile Profile)
    {
        await _col.InsertOneAsync(Profile);
        return Profile;
    }

    public async Task<Profile> UpdateAsync(Profile p)
    {
        var filter = Builders<Profile>.Filter.Eq(x => x.Id, p.Id);
        // We replace the whole document—keep Id and UserId, overwrite the rest:
        var result = await _col.ReplaceOneAsync(filter, p);
        if (result.MatchedCount == 0)
            throw new KeyNotFoundException($"No profile found for UserId={p.Id}");
        return p;
    }
}
