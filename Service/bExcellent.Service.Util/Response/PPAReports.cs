using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Response
{
    public class PPAReports
    {
        public List<ReportContent> LastLogin { get; set; }
        public List<ReportContent> PartnersCreated { get; set; }
        public List<ReportContent> AssessmentCompleted { get; set; }
        public List<ReportContent> PSEPassword { get; set; }
        public List<ReportContent> PSMPassword { get; set; }
        public List<ReportContent> AreaLeadPassword { get; set; }
        public List<ReportContent> TimezonePassword { get; set; }
        public List<ReportContent> StakePassword { get; set; } 
    }
}
