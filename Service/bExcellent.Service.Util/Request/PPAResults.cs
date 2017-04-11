using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Request
{
    public class PPAResults
    {
        public int QuestionId { get; set; }
        public String AnswerText { get; set; }
        public String Roles { get; set; }
        public String Question { get; set; }
        public String ModuleName { get; set; }
        public int Answer { get; set; }
        public int ModuleId { get; set; }
        public String Area { get; set; }
        public String Country { get; set; }
        public String TimeZone { get; set; }
        public int Yes { get; set; }
        public int No { get; set; }
        public String PartnerName { get; set; }
        public String PSEName { get; set; }
        public double Xaxis { get; set; }
        public double Yaxis { get; set; }
    }
}
