using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace bExcellent.Service.Util.Request
{
    [DataContract(Namespace = "", Name = "SavePOEResultRequest")]
    [Serializable]
    public class SavePOEResultRequest
    {
        [DataMember]
        public int UserId { get; set; }

        [DataMember]
        public int ModuleNumber { get; set; }

        [DataMember]
        public int QuestionId { get; set; }

        [DataMember]
        public int Answer { get; set; }
        [DataMember]
        public int CapabilityAnswer { get; set; }
        [DataMember]
        public string Comment { get; set; }

        [DataMember]
        public int AnswerType { get; set; }

        [DataMember]
        public int FeedbackId { get; set; }

        [DataMember]
        public int FeedbackStatus { get; set; }

        [DataMember]
        public int UserRating { get; set; }
        [DataMember]
        public int poeid { get; set; }
        [DataMember]
        public string Notes { get; set; }

        [DataMember]
        public string Subject { get; set; }

        [DataMember]
        public string Initials { get; set; }
        [DataMember]
        public string DemographicAnswer { get; set; }

        //        public string LoggedInUserName { get; set; }

        //      public int LoggedInUserId { get; set; }
    }
}