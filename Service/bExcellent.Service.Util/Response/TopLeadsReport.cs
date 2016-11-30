using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Response
{
    public class TopLeadsReport
    {
        public List<PSMReports> OverAllReport { get; set; }

        public List<PSMReports> YourReport { get; set; }
    }
}
