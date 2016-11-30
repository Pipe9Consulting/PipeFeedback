using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Domain
{
    public class Reports
    {
        public string PoeName { get; set; }

        public string Area { get; set; }

        public string Country { get; set; }

        public string User1Name { get; set; }

        public string User1Email { get; set; }

        public string User2Name { get; set; }

        public string User2Email { get; set; }

        public string Relation { get; set; }

        public string TakeStatus { get; set; }

        public string TakeCompletedOn { get; set; }

        public string GiveStatus { get; set; }

        public string GiveCompletedOn { get; set; }
    }

    public class ManagerReports
    {
        public string PoeName { get; set; }

        public string ManagerName { get; set; }

        public string ManagerEmail { get; set; }

        public string TeamName { get; set; }

        public string TeamEmail { get; set; }

        public string Relation { get; set; }

        public string Area { get; set; }

        public string Country { get; set; }

        public string Status { get; set; }

        public string CompletedOn { get; set; }
        public string PoeId { get; set; }
        public string LastLogin { get; set; }
    }

    public class TeamReports
    {
        public string PoeName { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Relation { get; set; }

        public string Area { get; set; }

        public string Country { get; set; }

        public string Status { get; set; }

        public string CompletedOn { get; set; }
        public string LastLogin { get; set; }
    }
}