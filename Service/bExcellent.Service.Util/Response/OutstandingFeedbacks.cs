using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.Util.Domain;

namespace bExcellent.Service.Util.Response
{
    public class OutstandingFeedbacks
    {

        public string Groupid { get; set; }

        public List<UserPOEMapping> Teammembers { get; set; }
    }
}
