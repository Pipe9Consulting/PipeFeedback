using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.DataAccess;
using bExcellent.Service.Util.Domain;

namespace bExcellent.Service.Util.Response
{
    public class DashBoard
    {
        public UserPOEMapping User { get; set; }

        public List<V3_GetMyActivitiesResult> GetMyActivities { get; set; }

        public List<UserPOEMapping> GiveFeedbackList { get; set; }

        public List<UserPOEMapping> RequestFeedbackList { get; set; }

        public int CompletedFeedback { get; set; }

        public Standing StandingScore { get; set; }

        public SyncWcsiDiff SyncDifference { get; set; }

        public List<POE> PoEList { get; set; }

        public List<QuestionsGoal> Goals { get; set; }
    }
}