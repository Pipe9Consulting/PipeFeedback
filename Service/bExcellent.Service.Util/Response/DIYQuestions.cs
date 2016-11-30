using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Response
{
    public class DIYQuestions
    {
        public string Question { get; set; }
        public int QuestionOrder { get; set; }
        public int Importance { get; set; }
        public double WeightagePerQuestion { get; set; }
    }
}
