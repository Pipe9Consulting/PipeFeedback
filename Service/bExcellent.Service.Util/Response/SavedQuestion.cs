using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Response
{
    public class SavedQuestion
    {
        public int FeedBackId { get; set; }
        public int FeedBackStatus { get; set; }
        public int QuestionId { get; set; }
        public int QuestionOrder { get; set; }
        public int ModuleId { get; set; }
        public int ModuleOrder{ get; set; }
    }
}
