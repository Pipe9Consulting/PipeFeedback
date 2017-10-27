
using bExcellent.Service.Util.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace bExcellent.mvc.Models
{
    public class FeedbackLanding
    {
        public int Role { get; set; }
        public bool Survey { get; set; }
        public bool Capability { get; set; }
        public int PoeId { get; set; }
        public string PoeName { get; set; }
        //public List<MinimizedPOE> MinimizedPOE { get; set; }
        public List<MinimizedPOE> PoEList { get; set; }
        public List<UserPOEMapping> ManagersList { get; set; }
        public List<UserPOEMapping> TeamMembersList { get; set; }
        //public IList<MinimizedPOE> MinimizedPOE { get; set; }
        //public MinimizedPOE MinimizedPOE { get; set; }
        //public List<UserPOEMapping> Mode { get; set; }
    }
    
}