using System.Collections.Generic;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Request;

namespace bExcellent.Service.BusinessLogic.SignUp
{
    public class SignUp
    {
        #region Private Memeber

        /// <summary>
        /// Gets the data access.
        /// </summary>
        private SignUpDataAccess DataAccess
        {
            get
            {
                return new SignUpDataAccess();
            }
        }

        #endregion Private Memeber

        public bool CheckEmailId(string EmailId)
        {
            return DataAccess.CheckEmailId(EmailId);
        }

        public bool CheckNetwork(string networkName)
        {
            return DataAccess.CheckNetwork(networkName);
        }

        public void SignUpReqest(SignupRequest sr)
        {
            DataAccess.SignUp(sr);
        }

        public void UpdateAcessToken(string emailid, string accestoken)
        {
            DataAccess.UpdateAcessToken(emailid, accestoken);
        }

        public List<UserPOEMapping> GetMyAllUsers(int userId, int subscriptionid)
        {
            return DataAccess.GetAllUsersData(userId, subscriptionid);
        }

        public Network GetNetworkById(int networkId)
        {
            return DataAccess.GetNetworkById(networkId);
        }

        public void AssignPoe(SignupRequest sr)
        {
            DataAccess.AssignPoe(sr);
        }

        public void DeleteSubscribedUser(string emailid, int subid)
        {
            DataAccess.DeleteSubscribedUser(emailid, subid);
        }

        public void DeleteSubscribedPoe(int Poeid, int subid)
        {
            DataAccess.DeleteSubscribedPoe(Poeid, subid);
        }
    }
}