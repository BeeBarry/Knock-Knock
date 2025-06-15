using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KnockAPI.Models
{
    public class HelpHistory
    {
        [BsonElement("withusername")]
        public string WithUserName { get; set; }

        [BsonElement("topic")]
        public string Topic { get; set; }

        [BsonElement("dateutc")]
        public DateTime DateUtc { get; set; }
    }
}
