using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.Util.Response;

namespace bExcellent.Service.BusinessLogic.Sync
{
    public class Sync
    {
        #region Private Memeber

        /// <summary>
        /// Gets the data access.
        /// </summary>
        private SyncDataAccess DataAccess
        {
            get
            {
                return new SyncDataAccess();
            }
        }

        #endregion Private Memeber

        public List<Util.Domain.POE> GetUserPoeByType(int userid, int subid, int type)
        {
            return DataAccess.GetUserPoeByType(userid, subid, type);
        }

        public SyncScoreCollection GetSyncScores(int userid, int poeid, int subid, int usermapping, int type)
        {
            return DataAccess.GetSyncScores(userid, poeid, subid, usermapping, type);
        }

        public SyncScoreCollection GetAvgSyncScores(int userid, int poeid, int subid, int type)
        {
            return DataAccess.GetAvgSyncScores(userid, poeid, subid, type);
        }

        public SyncScoreCollection GetSyncScoresByFbId(int userid, int poeid, int subid, int usermapping, int type, int fbid)
        {
            return DataAccess.GetSyncScoresByFbId(userid, poeid, subid, usermapping, type, fbid);
        }

        public SyncScoreCollection GetAvgSyncScoresByFbId(int userid, int poeid, int subid, int type, string fbid)
        {
            return DataAccess.GetAvgSyncScoresByFbId(userid, poeid, subid, type, fbid);
        }

        public SyncScoreCollection GetSyncScoresOverall(int userid, int poeid, int subid, int usermapping, int type)
        {
            return DataAccess.GetSyncScoresOverall(userid, poeid, subid, usermapping, type);
        }

        public double WcsiScoreDifference(int userid, int poeid, int subid, int usermapping, int type)
        {
            return DataAccess.WcsiScoreDifference(userid, poeid, subid, usermapping, type);
        }

        public SyncWcsiDiff GetSyncWcsiDiff(int userid, int poeid, int subid)
        {
            return DataAccess.GetSyncWcsiDiff(userid, poeid, subid);
        }

        public SyncScoreCollection GetSyncTeamScore(int userid, int poeid, int subid, int type, string groupid, int mappingid)
        {
            return DataAccess.GetSyncTeamScore(userid, poeid, subid, type, groupid, mappingid)
            ;
        }
        public double WcsiScoreOfManager(int userid, int poeid, int subid, int usermapping, int type)
        {
            return DataAccess.WcsiScoreOfManager(userid, poeid, subid, usermapping, type);

        }
    }
}