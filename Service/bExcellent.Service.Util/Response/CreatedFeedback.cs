using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.Util.Domain;

namespace bExcellent.Service.Util.Response
{
    public class CreatedFeedback
    {
        public int FeedBackId { get; set; }

        public int UserMappingId { get; set; }

        public int TeamUserMappingId { get; set; }

        public int RequestedUserMappingId { get; set; }

        public UserPOEMapping Teammember { get; set; }
        public int CapabilityId { get; set; }
    }
}