using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Domain
{
    public class Accounts
    {
        public int Userid { get; set; }

        public int? PlanId { get; set; }

        public byte[] Photo { get; set; }

        public string TrialDate { get; set; }

        public string SubscribedDate { get; set; }

        public int DesignationId { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string DesignationName { get; set; }

        public string EmailId { get; set; }

        public decimal? UserCost { get; set; }

        public decimal? PoeCost { get; set; }

        public string SubscribedUserDate { get; set; }

        public List<POE> Poes { get; set; }
    }
}