using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace KnockAPI.Models
{
    public class UserDTO
    {
        [JsonPropertyName("accountid")]
        public string AccountId { get; set; }  // must match an existing Account.Id
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
    }
}
