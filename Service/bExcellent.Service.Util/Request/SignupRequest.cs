
using System.Collections.Generic;
using bExcellent.Service.Util.Domain;

namespace bExcellent.Service.Util.Request
{
    
    public class SignupRequest
    {
        public int Mode { get; set; }
        public User User { get; set; }
        public Network Netwrok { get; set; }
        public Payment Payment { get; set; }
        public List<UserPOEMapping> Members { get; set; }
        public List<POE> Poes { get; set; }
    }
}
