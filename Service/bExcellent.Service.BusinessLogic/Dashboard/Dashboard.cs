using System.Collections.Generic;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Enumeration;

namespace bExcellent.Service.BusinessLogic.Dashboard
{
    public class Dashboard
    {
        #region Private Memeber

        /// <summary>
        /// Gets the data access.
        /// </summary>
        private DashboardDataAccess DataAccess
        {
            get { return new DashboardDataAccess(); }
        }

        #endregion Private Memeber

        public DashboardModel GetDashBoard(int userId, int poeId, int subid, string domain, int type)
        {
            return new DashboardModel
                       {
                           DashboardGoal = DataAccess.GetGoals(poeId, userId),
                           DashboardStanding = DataAccess.GetStandingDataDashBoard(poeId, userId, subid, domain),
                           DashboardFeedback = DataAccess.GetFeedback(userId, subid, poeId),
                           DashboardPathFinders = GetPathfinders(userId, poeId, type),//new DashboardPathFinders(),
                           DashboardRecognition = DataAccess.GetRecognition(userId)
                       };
        }

        public int GetGoalSharedCount(int userId, int poeId, int sharedWith)
        {
            return DataAccess.GetGoalSharedWithCount(poeId, userId, sharedWith);
        }

        public IEnumerable<DashboardUser> GetDashboardUsers(string userIds)
        {
            return DataAccess.GetDashboardUsers(userIds);
        }

        public DashboardPathFinders GetPathfinders(int userId, int poeId, int type)
        {
            var dashboardPathfinders = DataAccess.GetDashboardPathfinders(userId, poeId, type);
            dashboardPathfinders.YourPathfinders = DataAccess.GetPathfindersPracticeArea(userId, poeId, type);
            dashboardPathfinders.Modules = DataAccess.GetModules(poeId);
            //dashboardPathfinders.PathfindersForYou = DataAccess.GetPathfindersPracticeArea(userId, poeId, (int)PathfinderType.ForYou);
            return dashboardPathfinders;
        }

        public int GetIndividualPathfindersCount(int userId, int poeId, int type, int moduleId, int pathfinderUserId)
        {
            return DataAccess.GetIndividualPathfindersCount(userId, poeId, type, moduleId, pathfinderUserId);
        }

        public double GetMyManagerScore(int userId, int poeid, int managerId)
        {
            return DataAccess.GetMyManagerScore(userId, poeid, managerId);
        }

        public int GetRecognitionCount(int userid, int shredId, int type)
        {
            return DataAccess.GetRecognitionCount(userid, shredId, type);
        }

        public int GetFeedbackReceivedCount(int userId, int selectedUserid, int subid, int poeid)
        {
            return DataAccess.GetFeedbackReceivedCount(userId, selectedUserid, subid, poeid);
        }

        public int GetFeedbackGivenCount(int userId, int selectedUserid, int subid, int poeid)
        {
            return DataAccess.GetFeedbackGivenCount(userId, selectedUserid, subid, poeid);
        }
    }
}