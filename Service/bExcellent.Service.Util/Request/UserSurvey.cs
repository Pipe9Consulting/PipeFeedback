using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Request
{
    public class UserSurvey
    {
        public int QuestionId { get; set; }
        public int SubQuestionId { get; set; }
        public string Answer { get; set; }
        public bool IsSubQuestion { get; set; }
    }
}
