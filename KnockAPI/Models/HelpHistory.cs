using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KnockAPI.Models
{
    public class HelpHistory
    {
        public string WithUserName { get; set; } // e.g. "Maria"
        public string Topic { get; set; }        // e.g. "bicycle recommendations"
        public DateTime DateUtc { get; set; }    // when it happened
    }
}
