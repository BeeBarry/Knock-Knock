using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace KnockAPI.Models
{
   

    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{FirstName} {LastName}";  // “John Doe”

        public string Title { get; set; }  // “Software Engineer”
        public string AvatarUrl { get; set; }  // profile image
        public string Location { get; set; }  // “Gothenburg”

       
       
    }
}
