using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Domain
{
    public class UserPOEMapping
    {
        public int UserPOEMappingId { get; set; }

        public int SecondaryUserPOEMappingId { get; set; }

        //public int UserId { get; set; }
        public User User { get; set; }

        public POE POE { get; set; }

        public Designation Designation { get; set; }

        public int RegionId { get; set; }

        public int AreaId { get; set; }

        public Feedback FeedbackDetails { get; set; }

        public int UserId { get; set; }

        public int POEId { get; set; }

        public int Role { get; set; }

        public long? Duration { get; set; }

        public string JobTitle { get; set; }

        public int Nooffbs { get; set; }

        public string SubscribtionDate { get; set; }

        public float UserAmount { get; set; }

        public float PoeAmount { get; set; }

        /*For Registration*/

        public int ParentMappingId { get; set; }

        public int ChildMappingId { get; set; }

        public int PeerParentMappingId { get; set; }

        public int PeerChildMappingId { get; set; }

        public double WcsiScoreDiff { get; set; }
        public bool IsFbCompleted { get; set; }
    }
}