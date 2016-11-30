using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Domain
{
    public class YammerContent
    {
        public int ID { get; set; }

        public string YammerToken { get; set; }

        public string Subject { get; set; }

        public string ToMailid { get; set; }

        public string FromMailid { get; set; }

        public string ImageUrl { get; set; }

        public string Description { get; set; }

        public string Groupid { get; set; }
    }
}