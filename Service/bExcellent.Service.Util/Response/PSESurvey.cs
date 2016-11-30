using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Response
{
    public class PSESurvey
    {
        public int LastModuleId { get; set; }
        public List<PSEAnswers> Answers { get; set; }
    }
}
