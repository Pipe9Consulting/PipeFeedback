using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.Util.Enumeration;

namespace bExcellent.Service.Util.Request
{
    public class CreateFeedbackRequest
    {
        public int FeedbackId { get; set; }
        public int SubscriptionId { get; set; }

        public int RequestedBy { get; set; }

        public int RequestedFrom { get; set; }

        public int RequestedFor { get; set; }

        public FeedbackType FeedbackType { get; set; }

        public FeedbackStatus Status { get; set; }

        public string GroupName { get; set; }
    }
}