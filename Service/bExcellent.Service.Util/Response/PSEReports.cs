using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Response
{
    public class PSEReports
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailId { get; set; }
        public string Country { get; set; }
        public string Area { get; set; }
        public string TimeZone { get; set; }
        public List<Partner> PartnersList { get; set; }
        public string ManagerFirstName { get; set; }
        public string ManagerLastName { get; set; }
        public string ManagerAlias { get; set; }
        public string AreaLeadFirstName { get; set; }
        public string AreaLeadLastName { get; set; }
        public string AreaLeadAlias { get; set; }
        public string TimeZoneFirstName { get; set; }
        public string TimeZoneLastName { get; set; }
        public string TimeZoneAlias { get; set; }
    }
}
