using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Response
{
    public class Notification
    {
        public bool ManagerSync { get; set; }
        public bool DevelopmentPriorities { get; set; }
        public bool IncompleteSelffeedback { get; set; }
        public bool IncompleteTeamfeedback { get; set; }
        public int SelfCount { get; set; }
        public int TeamCount { get; set; }
        public int PoeId { get; set; }
        public bool IsHSP { get; set; }
    }
}
