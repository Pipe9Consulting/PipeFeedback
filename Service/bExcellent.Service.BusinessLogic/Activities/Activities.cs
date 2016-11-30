using System.Collections.Generic;
using System.Linq;
using bExcellent.Service.DataAccess;

namespace bExcellent.Service.BusinessLogic.Activities
{
    public class Activities
    {
        public DataContextFactory DataContextFactory;

        public Activities()
        {
            DataContextFactory = new DataContextFactory();
        }

        public List<V3_GetMyActivitiesResult> GetMyActivities(int userId, int subscriptionId, int sourceId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetMyActivities(userId, subscriptionId,sourceId).ToList();
               
            }
        }
        public List<V3_GetUserListByBatchIdResult> GetUserList(string batchid, int userId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetUserListByBatchId(batchid, userId).ToList();
            }
        }

        public List<v4_GetMentorConnectHistoryResult> GetConnectHistory(string fromId,string forId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetMentorConnectHistory(forId, fromId).ToList();
            }
        }
    }
}