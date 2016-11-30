using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.Util.Enumeration;

namespace bExcellent.Service.Util.Domain
{
    public class Feedback
    {
        public int FeedbackId { get; set; }

        public FeedbackType FeedbackType { get; set; }

        /// <summary>
        /// POEMappingID of the source of request, will be 0 if the user does the PEOFeedback without any request.
        /// </summary>
        public UserPOEMapping RequestedBy { get; set; }

        /// <summary>
        /// user who needs to give the feedback
        /// </summary>
        public UserPOEMapping RequestedFrom { get; set; }

        public UserPOEMapping RequestedFor { get; set; }

        public int RequestedById { get; set; }

        public int RequestedFromId { get; set; }

        public int RequestedForId { get; set; }

        public FeedbackStatus FeedbackStatus { get; set; }

        public string CreatedOn { get; set; }

        public string UpdatedOn { get; set; }

        public DateTime CreatedOnDtm { get; set; }

        public DateTime UpdatedOnDtm { get; set; }

        public string GroupName { get; set; }
    }

    public class POEFeedback
    {
        public int FeedbackId { get; set; }

        public FeedbackType? FeedbackType { get; set; }

        /// <summary>
        /// POEMappingID of the source of request, will be 0 if the user does the PEOFeedback without any request.
        /// </summary>
        public int RequestedBy { get; set; }

        /// <summary>
        /// User who need to give the feedback
        /// </summary>
        public int? RequestedFrom { get; set; }

        public FeedbackStatus? FeedbackStatus { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? UpdatedOnDtm { get; set; }

        public string UpdatedOn { get; set; }

        public int POEId { get; set; }

        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string Role { get; set; }

        public string LastName { get; set; }

        public string Photo { get; set; }

        public string POEName { get; set; }

        public User User { get; set; }

        public Feedback Feedback { get; set; }
    }

    public class UserFeedback
    {
        public int? FeedbackId { get; set; }

        public int UserId { get; set; }
    }

    public class ManagerFeedback
    {
        public int? FeedbackId { get; set; }

        public int MangagerPoeId { get; set; }

        public int? TeammenberPoeId { get; set; }
    }
}