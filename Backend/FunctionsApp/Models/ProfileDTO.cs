using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace KnockAPI.Models
{
    public class ProfileDTO
    {
        [JsonPropertyName("firstname")]
        public string FirstName { get; set; }

        [JsonPropertyName("lastname")]
        public string LastName { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("avatarurl")]
        public string AvatarUrl { get; set; }

        [JsonPropertyName("location")]
        public string Location { get; set; }

        [JsonPropertyName("expertise")]
        public List<Expertise> Expertise { get; set; } = new List<Expertise>();
        [JsonPropertyName("previoushelps")]
        public List<HelpHistory> PreviousHelps { get; set; } = new();
    }
}
