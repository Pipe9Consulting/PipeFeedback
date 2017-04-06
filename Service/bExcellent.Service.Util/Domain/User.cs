using System;

using System.Linq;
using System.Runtime.Serialization;
using System.Collections;
using System.Collections.Generic;

namespace bExcellent.Service.Util.Domain
{
    [DataContract(Namespace = "", Name = "User")]
    [Serializable]
    public class User
    {
            [DataMember]
            public int UserId { get; set; }

            [DataMember]
            public string FirstName { get; set; }

            [DataMember]
            public string LastName { get; set; }

            [DataMember]
            public string EmailAddress { get; set; }

            [DataMember]
            public Country Country { get; set; }

            [DataMember]
            public bool IsActive { get; set; }

            [DataMember]
            public DateTime? LastLogin { get; set; }

            [DataMember]
            public Zone Area { get; set; }

            [DataMember]
            public byte[] Photo { get; set; }

            [DataMember]
            public int DesignationId { get; set; }

            [DataMember]
            public string CompanyName { get; set; }

            [DataMember]
            public string CompanySize { get; set; }

            [DataMember]
            public string userName { get; set; }

            [DataMember]
            public bool? IsAgreed { get; set; }

            [DataMember]
            public int? Subscriptionid { get; set; }

            [DataMember]
            public string Password { get; set; }

            [DataMember]
            public string JobTitle { get; set; }

            [DataMember]
            public int StratPageMode { get; set; }

            [DataMember]
            public string YammerToken { get; set; }
            [DataMember]
            public string Role { get; set; }
            [DataMember]
            public string ManagerAlias { get; set; }
            [DataMember]
            public string CountryName { get; set; }

        //public List<Feedback> FeedbackDetails { get; set; }
    }

    public class UserRole
    {
        public int RoleId { get; set; }

        public string RoleText { get; set; }
    }

    public class MentorDetail
    {
        public List<User> user { get; set; }
        public string ModuleId { get; set; }
    }
}