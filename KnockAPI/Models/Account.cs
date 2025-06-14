using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KnockAPI.Models
{
    public class Account
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }           // Mongo ObjectId

        [BsonElement("username")]
        public string Username { get; set; }           // e.g. “johndoe”

        [BsonElement("password")]
        public string Password { get; set; }           // store a bcrypt hash, not plain text
    }
}
