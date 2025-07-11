﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace KnockAPI.Models
{
    public class Profile
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("firstname")]
        public string FirstName { get; set; }

        [BsonElement("lastname")]
        public string LastName { get; set; }

        [BsonElement("fullname")]
        public string FullName => $"{FirstName} {LastName}"; // “John Doe”

        [BsonElement("title")]
        public string Title { get; set; } // “Software Engineer”

        [BsonElement("avatarurl")]
        public string AvatarUrl { get; set; } // profile image

        [BsonElement("location")]
        public string Location { get; set; } // “Gothenburg”
        [BsonElement("expertise")]
        public List<Expertise> Expertise { get; set; } = new List<Expertise>();
        [BsonElement("previoushelps")]
        public List<HelpHistory> PreviousHelps { get; set; } = new();
    }
}
