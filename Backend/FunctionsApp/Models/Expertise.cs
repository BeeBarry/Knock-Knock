﻿using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KnockAPI.Models
{
    public class Expertise
    {
        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("icon")]
        public string Icon { get; set; }
    }
}
