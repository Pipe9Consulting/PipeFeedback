using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.Util.Domain;

namespace bExcellent.Service.Util.Response
{
    public class PrivacyYourData
    {
        public List<YourDataListView> ListView { get; set; }
        public UserPOEMapping YourData { get; set; }
    }

    public class YourDataListView
    {
        public string FeedbackDate { get; set; }
        public string FeedbackType { get; set; }
        public int FeedbackResult { get; set; }
        public string FeebackUser { get; set; }
        public string Latest { get; set; }
        public int FeedbackId { get; set; }
    }
}
