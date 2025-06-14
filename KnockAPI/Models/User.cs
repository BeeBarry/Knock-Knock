using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace KnockAPI.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }  // “Mr. Zane”
        public string Title { get; set; }  // “Software Engineer”
        public string AvatarUrl { get; set; }  // profile image
        public string Location { get; set; }  // “Gothenburg”

        // embedded arrays:
        public List<ExpertiseTag> Expertise { get; set; } = new();
        public List<HelpHistory> PreviousHelps { get; set; } = new();
    }
}
