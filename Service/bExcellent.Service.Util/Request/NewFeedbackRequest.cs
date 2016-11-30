using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace bExcellent.Service.Util.Request
{
    //[DataContract(Namespace = "", Name = "NewFeedbackRequest")]
    // [Serializable]
    public class NewFeedbackRequest
    {
        [DataMember]
        public int UserId { get; set; }

        [DataMember]
        public List<int> Members { get; set; }

        [DataMember]
        public List<int> FeedbackRole { get; set; }

        [DataMember]
        public int FeedbackFor { get; set; }

        [DataMember]
        public int FeedbackType { get; set; }

        [DataMember]
        public bool IsGiveRequest { get; set; }

        [DataMember]
        public int PoeId { get; set; }

        [DataMember]
        public int Subscriptionid { get; set; }

        [DataMember]
        public bool EmailMode { get; set; }
    }
}