using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Domain
{
    public class DashboardModel
    {
        public DashboardStanding DashboardStanding { get; set; }

        public DashboardGoal DashboardGoal { get; set; }

        public DashboardFeedback DashboardFeedback { get; set; }

        public DashboardRecognition DashboardRecognition { get; set; }

        public DashboardPathFinders DashboardPathFinders { get; set; }
    }

    public class DashboardStanding
    {
        public double YourTenure { get; set; }

        public double YourComunity { get; set; }

        public double YourTeam { get; set; }

        public double YourStanding { get; set; }

        public double ManagerSync { get; set; }

        public double TenureForUser { get; set; }

        public List<DashboardUser> StandingUsers { get; set; }
    }

    public class DashboardGoal
    {
        public int GoalsCompleted { get; set; }

        public int GoalsDelayed { get; set; }

        public int GoalsSet { get; set; }

        public int GoalsShared { get; set; }

        public List<DashboardUser> GoalUsers { get; set; }
    }

    public class DashboardFeedback
    {
        public int FeedbackGiven { get; set; }

        public int FeedbackTaken { get; set; }

        public int FeedbackReceived { get; set; }

        public List<UserPOEMapping> FeedbackReceivedUsers { get; set; }

        public List<UserPOEMapping> FeedbackGivenUsers { get; set; }
    }

    public class DashboardRecognition
    {
        public int RecognitionOthers { get; set; }

        public int RecognitionYou { get; set; }

        public List<DashboardUser> RecognitionOthersUser { get; set; }

        public List<DashboardUser> RecognitionYouUsers { get; set; }
    }

    public class DashboardPathFinders
    {
        public int YourPathfindersCount { get; set; }

        public int PathfindersForYouCount { get; set; }

        public int ModulesCount { get; set; }

        public List<PAModule> Modules { get; set; }

        public List<PathfindersPracticeArea> YourPathfinders { get; set; }

        //public List<PathfindersPracticeArea> PathfindersForYou { get; set; }
    }

    public class PathfindersPracticeArea
    {
        public int PracticeAreaCount { get; set; }

        public string PracticeAreaName { get; set; }

        public int ModuleId { get; set; }

        public List<DashboardUser> PathfinderUsers { get; set; }
    }

    public class DashboardUser
    {
        public string Name { get; set; }

        public int UserId { get; set; }

        public int MappingId { get; set; }
    }

    public class PAModule
    {
        public int ModuleId { get; set; }

        public string ModuleName { get; set; }
    }
}