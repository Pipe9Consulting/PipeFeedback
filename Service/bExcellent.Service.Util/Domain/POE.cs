using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Domain
{
    public class POE
    {
        public int POEId { get; set; }

        public string Name { get; set; }

        public int PoeFlag { get; set; }

        public IList<Module> Modules { get; set; }

        public string IntroContent { get; set; }

        public string SubscribedPoeDate { get; set; }

        public float PoeAmount { get; set; }

        ///// <summary>
        ///// Users associated to this POE.Single user can be associated with many POE.
        ///// </summary>
        //public IList<User> Users { get; set; }
    }

    public class MinimizedPOE
    {
        public int POEId { get; set; }
        public int IsSurvey { get; set; }
        public int IsCapability { get; set; }
        public string POEName { get; set; }

        public int NoOfModule { get; set; }

        public int QuestionPerModule { get; set; }

        public string RoleTitle { get; set; }

        public int? RoleLevel { get; set; }
    }
}