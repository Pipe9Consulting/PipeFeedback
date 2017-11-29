using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using bExcellent.mvc.FeedbackWCF;

namespace bExcellent.mvc.Models
{
    public class Feedback
    {
        public List<CreatedFeedback> TeamMebers { get; set; }
        public SavedQuestion GetLastSavedQuestion { get; set; }
    }
}