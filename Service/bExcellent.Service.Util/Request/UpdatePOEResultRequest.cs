using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Request
{
    public class UpdatePOEResultRequest
    {
        public int FeedbackId { get; set; }

        public int QuestionId { get; set; }

        public int Answer { get; set; }

        public string Comment { get; set; }

        public int AnswerType { get; set; }
    }
}