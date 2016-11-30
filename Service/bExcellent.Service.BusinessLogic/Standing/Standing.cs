using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.DataAccess;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Response;

namespace bExcellent.Service.BusinessLogic.Standing
{
    public class Standing
    {
        #region Private Memeber

        /// <summary>
        /// Gets the data access.
        /// </summary>
        private StandingDataAccess DataAccess
        {
            get
            {
                return new StandingDataAccess();
            }
        }

        #endregion Private Memeber

        public Util.Response.Standing GetStanding(int poeid, int userid, int tileclicked, int subid, string domain)
        {
            return DataAccess.GetStanding(poeid, userid, tileclicked, subid, domain);
        }

        public Util.Response.Standing GetStandingTileScore(int poeid, int userid, int subid, string domain)
        {
            return DataAccess.GetStandingTileScore(poeid, userid, subid, domain);
        }

        public List<UserRole> GetUserRoles(int userid, int subid)
        {
            return DataAccess.GetUserRoles(userid, subid);
        }

        public List<Util.Domain.POE> GetUserPoeByRole(int userid, int subid, int role)
        {
            return DataAccess.GetUserPoeByRole(userid, subid, role);
        }

        public PoeModules GetPoeContent(int poeid)
        {
            return DataAccess.GetPoeContent(poeid);
        }

        public StandingPAContent GetStandingPAContent(int userid, int poeid, int subid, string domain, bool cacheMode)
        {
            return DataAccess.GetStandingPAContent(userid, poeid, subid, domain, cacheMode);
        }

        public StandingNew GetStandingData(int poeid, int userid, int tileclicked, int subid, string domain)
        {
            return DataAccess.GetStandingData(poeid, userid, tileclicked, subid, domain);
        }

        public List<UserPOEMapping> GetTopMembers(string domain, int poeid, int userid, int type)
        {
            return DataAccess.GetTopMembers(domain, poeid, userid, type);
        }
        public List<Util.Domain.POE> GetUserPoeByRoleUpdated(int userid, int role)
        {
            return DataAccess.GetUserPoeByRoleUpdated(userid, role);
        }
        public List<Util.Domain.POE> GetUserPoeManagerRole(int userid)
        {
            return DataAccess.GetUserPoeManagerRole(userid);
        }
        public List<Util.Domain.POE> GetUserPoeTeamRole(int userid)
        {
            return DataAccess.GetUserPoeTeamRole(userid);
        }
        public List<UserRole> GetUserRolesByProfile(int userid, int poeid)
        {
            return DataAccess.GetUserRolesByProfile(userid, poeid);
        }
        public List<UserRole> GetUserCurrentRole(int userid)
        {
            return DataAccess.GetUserCurrentRole(userid);
        }
        public List<V3_GetStandingAvgWCSIScoreResult> GetAvgWcsiScore(string fbid)
        {
            return DataAccess.GetAvgWcsiScore(fbid);
        }
    }
}