using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Response
{
    public class GoalEmail
    {
        public string ManagerName { get; set; }
        public string ManagerAlias { get; set; }
        public string tmName { get; set; }
        public string tmAlias { get; set; }
        public DateTime goalDate { get; set; }
    }
}
