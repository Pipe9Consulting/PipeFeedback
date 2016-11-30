using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Domain
{
    public class FeedbackDetail
    {
        //    public IList<Feedback> OutstandingFeedBack { get; set; }
        //    public IList<Feedback> CompleteFeedBack { get; set; }
        //    public IList<Feedback> ReceivedFeedBack { get; set; }
        //    public IList<Feedback> RequestedFeedBack { get; set; }
        public User FBFromOrByUser { get; set; }

        public string FBLastUpdatedon { get; set; }

        public User FBTouser { get; set; }

        public string Status { get; set; }

        public string FeedbackType { get; set; }

        public int PoeId { get; set; }

        //public POEName PoeName { get; set; }

        //public int RegionId { get; set; }

        //public int AreaId { get; set; }

        //public Country Country { get; set; }

        //public Zone Zone { get; set; }
    }
}