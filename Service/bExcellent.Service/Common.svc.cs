using System;
using System.Collections.Generic;
using System.Net;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using bExcellent.Service.BusinessLogic.Activities;
using bExcellent.Service.BusinessLogic.FeedbackBL;
using bExcellent.Service.BusinessLogic.SignUp;
using bExcellent.Service.BusinessLogic.Sync;
using bExcellent.Service.DataAccess;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Request;
using bExcellent.Service.Util.Response;
using System.IO;
using bExcellent.Service.BusinessLogic.Common;
using TimeZone = bExcellent.Service.Util.Domain.TimeZone;

namespace bExcellent.Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Common" in code, svc and config file together.
    /// <summary>
    ///
    /// </summary>
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class Common : ICommon
    {
        /// <summary>
        /// Gets the poes by user id.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public IList<MinimizedPOE> GetPoEsByUserId(int userId)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetPoEsByUserId(userId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public IList<MinimizedPOE> GetMySubscribedPoes(int subId)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMySubscribedPoes(subId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public IList<MinimizedPOE> GetMySubscribedPoeList(int userid, int subId)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMySubscribedPoeList(userid, subId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets the user mapping details.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetUserMappingDetails(int userId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetUserMappingDetails(userId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// GetAccountDetail
        /// </summary>
        /// <param name="subscriptionid"></param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Accounts> GetAccountDetail(int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetAccountDetail(subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public PoeModules GetPoeContent(int poeid)
        {
            try
            {
                BusinessLogic.Standing.Standing common = new BusinessLogic.Standing.Standing();
                return common.GetPoeContent(poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets the user role.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetUserRole(int userId, int poeId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetUserRole(userId, poeId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return 0;
        }

        /// <summary>
        /// Gets my teammembers.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetMyTeammembers(int userId, int poeId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMyTeammembers(userId, poeId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets my give fb team.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetMyGiveFbTeam(int userId, int poeId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMyGiveFbTeam(userId, poeId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="poeId"></param>
        /// <param name="subscriptionid"></param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetMyGiveFbTeamList(int userId, int poeId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMyGiveFbTeamList(userId, poeId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets my receive fb team.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetMyReceiveFbTeam(int userId, int poeId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMyReceiveFbTeam(userId, poeId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="poeId"></param>
        /// <param name="subscriptionid"></param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetMyManagersFeedback(int userId, int poeId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMyManagersFeedback(userId, poeId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        /// <summary>
        ///
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="poeId"></param>
        /// <param name="subscriptionid"></param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetMyReceiveFbTeamList(int userId, int poeId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMyReceiveFbTeamList(userId, poeId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets my manager.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetMyManager(int userId, int poeId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMyManager(userId, poeId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets my customers.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetMyCustomers(int userId, int poeId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMyCustomers(userId, poeId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets my peers.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetMyPeers(int userId, int poeId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMyPeers(userId, poeId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets my full network.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetMyFullNetwork(int userId, int poeId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMyFullNetwork(userId, poeId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetNetworksUsersWall(int userId, int POEId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetNetworksUsersWall(userId, POEId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets my network count.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetMyNetworkCount(int userId, int poeId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMyNetworkCount(userId, poeId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return 0;
        }

        /// <summary>
        /// Gets the user details by email id.
        /// </summary>
        /// <param name="emailId">The email id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public User GetUserDetailsByEmailId(string emailId)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetUserDetailsByEmailId(emailId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets my detail.
        /// </summary>
        /// <param name="userid">The userid.</param>
        /// <param name="poeid">The poeid.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public UserPOEMapping GetMyDetail(int userid, int poeid, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMyDetail(userid, poeid, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// GetMyDetailWithArea
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="poeid"></param>
        /// <param name="subscriptionid"></param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public UserPOEMapping GetMyDetailWithArea(int userid, int poeid, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMyDetailWithArea(userid, poeid, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets all counties.
        /// </summary>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Country> GetAllCounties()
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetAllCounties();
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// GetAllArea
        /// </summary>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Zone> GetAllArea()
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetAllArea();
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets the user photo.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public User GetUserPhoto(int userId)
        {
            try
            {
                BusinessLogic.UserAdmin.UserAdmin userAdmin = new BusinessLogic.UserAdmin.UserAdmin();
                return userAdmin.GetUserPhoto(userId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Updates the user photo.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="photo">The photo.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool UpdateUserPhoto(int userId, byte[] photo)
        {
            try
            {
                BusinessLogic.UserAdmin.UserAdmin userAdmin = new BusinessLogic.UserAdmin.UserAdmin();
                userAdmin.UpdateUserPhoto(userId, photo);
                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        /// <summary>
        /// Updates the user details.
        /// </summary>
        /// <param name="firstName">The first name.</param>
        /// <param name="lastName">The last name.</param>
        /// <param name="countryId">The country id.</param>
        /// <param name="userId">The user id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool UpdateUserDetails(string firstName, string lastName, string companyName, string jobTitle, int countryId, int userId, int areaId)
        {
            try
            {
                BusinessLogic.UserAdmin.UserAdmin userAdmin = new BusinessLogic.UserAdmin.UserAdmin();
                userAdmin.UpdateUserDetails(firstName, lastName, companyName, jobTitle, countryId, userId, areaId);

                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        /// <summary>
        /// Updates the password.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <param name="password">The password.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool UpdatePassword(string userName, string password)
        {
            try
            {
                BusinessLogic.Authentiation.AuthentiationBO userAdmin = new BusinessLogic.Authentiation.AuthentiationBO();
                userAdmin.UpdatePassword(userName, password);

                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        /// <summary>
        /// Gets the password.
        /// </summary>
        /// <param name="emailAddress">The email address.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool GetPassword(string emailAddress)
        {
            try
            {
                BusinessLogic.UserAdmin.UserAdmin userAdmin = new BusinessLogic.UserAdmin.UserAdmin();
                userAdmin.GetPassword(emailAddress);

                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        /// <summary>
        /// Checks the email id.
        /// </summary>
        /// <param name="EmailId">The email id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool CheckEmailId(string EmailId)
        {
            try
            {
                BusinessLogic.Authentiation.AuthentiationBO userAdmin = new BusinessLogic.Authentiation.AuthentiationBO();
                return userAdmin.CheckEmailId(EmailId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void UpdatePageMode(int userid, int status)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.UpdatePageMode(userid, status);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public string GetPoeName(int poeId)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetPoeName(poeId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return string.Empty;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public string GetPasswordForUSer(string emailid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetPassword(emailid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return string.Empty;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int CheckMapping(int userId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.CheckMapping(userId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return 0;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Network> GetUserSubscriptions(string emailId)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetUserSubscriptions(emailId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Network> GetMySubscription(string emailId)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMySubscription(emailId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet]
        public List<V3_GetMyActivitiesResult> GetMyActivities(int userId, int subscriptionId, int sourceId)
        {
            return new Activities().GetMyActivities(userId, subscriptionId, sourceId);
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<V3_GetUserListByBatchIdResult> GetUserList(string batchid, int userId)
        {
            try
            {
                return new Activities().GetUserList(batchid, userId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public Network GetDefaultUserSubscription(string emailId)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetDefaultUserSubscription(emailId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public Network GetOwnNetwork(string emailId)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetOwnNetwork(emailId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool DeleteUser(int userid, int poeid, int subscriptionid, int level, int deleteId, int deletepeer)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.DeleteUser(userid, poeid, subscriptionid, level, deleteId, deletepeer);
                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool CreateActivity(int userid, string toids, int subid, int sourceid, string activity)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateActivity(userid, toids, subid, sourceid, activity);
                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool CreateActivityForPathfinders(int userid, string toids, int subid, int sourceid, string activity, int poeId, int moduleId)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateActivityForPathFinders(userid, toids, subid, sourceid, activity, poeId, moduleId);
                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool SendConnectMail(int userid, string toids, int poeId)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.SendConnectMail(userid, toids, poeId);
                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool SendMailFromWall(int type, string fromname, string toIds, bool hasAttachment)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.SendMailFromWall(type, fromname, toIds, hasAttachment);
                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        /// <summary>
        /// Gets my full network.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetMyUsers(int userId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMyUsers(userId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="subscriptionid"></param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetMyAllUsers(int userId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMyAllUsers(userId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets my full network.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public Util.Response.Standing GetStanding(int poeid, int userid, int tileclicked, int subid, string domain)
        {
            try
            {
                BusinessLogic.Standing.Standing satanding = new BusinessLogic.Standing.Standing();
                return satanding.GetStanding(poeid, userid, tileclicked, subid, domain);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="poeid"></param>
        /// <param name="userid"></param>
        /// <param name="subid"></param>
        /// <param name="domain"></param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public Util.Response.Standing GetStandingTileScore(int poeid, int userid, int subid, string domain)
        {
            try
            {
                BusinessLogic.Standing.Standing satanding = new BusinessLogic.Standing.Standing();
                return satanding.GetStandingTileScore(poeid, userid, subid, domain);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<V3_GetStandingAvgWCSIScoreResult> GetAvgWcsiScore(string fbid)
        {
            try
            {
                BusinessLogic.Standing.Standing satanding = new BusinessLogic.Standing.Standing();
                return satanding.GetAvgWcsiScore(fbid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets my full network.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserRole> GetUserRoles(int userid, int subid)
        {
            try
            {
                BusinessLogic.Standing.Standing satanding = new BusinessLogic.Standing.Standing();
                return satanding.GetUserRoles(userid, subid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets my full network.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Util.Domain.POE> GetUserPoeByRole(int userid, int subid, int role)
        {
            try
            {
                BusinessLogic.Standing.Standing satanding = new BusinessLogic.Standing.Standing();
                return satanding.GetUserPoeByRole(userid, subid, role);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Util.Domain.POE> GetUserPoeByType(int userid, int subid, int type)
        {
            try
            {
                Sync sync = new Sync();
                return sync.GetUserPoeByType(userid, subid, type);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets my full network.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public bool SaveGoal(GoalShare goals)
        {
            try
            {
                BusinessLogic.Goal.Goal goal = new BusinessLogic.Goal.Goal();
                goal.SaveGoal(goals);
                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        /// <summary>
        /// Saves the goals.
        /// </summary>
        /// <param name="goalShares">The goal shares.</param>
        /// <returns></returns>
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public bool SaveGoals(List<GoalShare> goalShares)
        {
            try
            {
                BusinessLogic.Goal.Goal goal = new BusinessLogic.Goal.Goal();
                goal.SaveGoals(goalShares);
                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public bool AssignPoe(List<AssignPoe> assignpoe)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.AssignPoe(assignpoe);
                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<ModulesGoal> GetMyGoals(int poeId, int userid)
        {
            try
            {
                BusinessLogic.Goal.Goal goal = new BusinessLogic.Goal.Goal();
                return goal.GetMyGoals(poeId, userid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public UserPOEMapping GetUserdetailsByMappingId(int mappingid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetUserDetailsByMappingId(mappingid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public UserPOEMapping GetUserDetailsByFbId(int fbId)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetUserDetailsByFbId(fbId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets the feedbacks by group id.
        /// </summary>
        /// <param name="groupid">The groupid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<CreatedFeedback> GetFeedbacksByGroupId(string groupid)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();

                return feedbackBl.GetFeedbacksByGroupId(groupid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="subId"></param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Util.Domain.User> GetSubscribedUserWall(int userid, int subId)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetSubscribedUserWall(userid, subId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public SyncScoreCollection GetSyncScores(int userid, int poeid, int subid, int usermapping, int type)
        {
            try
            {
                Sync sync = new Sync();
                return sync.GetSyncScores(userid, poeid, subid, usermapping, type);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public SyncScoreCollection GetSyncScoresOverall(int userid, int poeid, int subid, int usermapping, int type)
        {
            try
            {
                Sync sync = new Sync();
                return sync.GetSyncScoresOverall(userid, poeid, subid, usermapping, type);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public SyncScoreCollection GetAvgSyncScores(int userid, int poeid, int subid, int type)
        {
            try
            {
                Sync sync = new Sync();
                return sync.GetAvgSyncScores(userid, poeid, subid, type);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public SyncScoreCollection GetSyncScoresByFbId(int userid, int poeid, int subid, int usermapping, int type, int fbid)
        {
            try
            {
                Sync sync = new Sync();
                return sync.GetSyncScoresByFbId(userid, poeid, subid, usermapping, type, fbid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public SyncScoreCollection GetSyncTeamScore(int userid, int poeid, int subid, int type, string groupid, int mappingid)
        {
            try
            {
                Sync sync = new Sync();
                return sync.GetSyncTeamScore(userid, poeid, subid, type, groupid, mappingid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public SyncScoreCollection GetAvgSyncScoresByFbId(int userid, int poeid, int subid, int type, string fbids)
        {
            try
            {
                Sync sync = new Sync();
                return sync.GetAvgSyncScoresByFbId(userid, poeid, subid, type, fbids);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public SyncWcsiDiff GetSyncWcsiDiff(int userid, int poeid, int subid)
        {
            try
            {
                Sync sync = new Sync();
                return sync.GetSyncWcsiDiff(userid, poeid, subid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public Plan GetPlanById(int planId)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetPlanById(planId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void SendPoePdfNotification(string emailContents, string subject)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.SendPoePdfNotification(emailContents, subject);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void SendContactMails(string emailContents, string subject)
        {
            try
            {
                BusinessLogic.Common.CommonDataAccess common = new BusinessLogic.Common.CommonDataAccess();
                common.SendContactMails(emailContents, subject);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<ManagerReports> GenerateManagerReport(int poeid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GenerateManagerReport(poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<TeamReports> GenerateTeamReport(int poeid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GenerateTeamReport(poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void InsertYammerContent(string tomailid, string frmMailid, string imageurl, string subject, string groupid, string desc, string yammertoken)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.InsertYammerContent(tomailid, frmMailid, imageurl, subject, groupid, desc, yammertoken);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<YammerContent> GetYammerTopContent()
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetYammerTopContent();
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void UpdateYammercontent(int id)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.UpdateYammercontent(id);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetModuleCount(int poeid)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetModuleCount(poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return 0;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void DeleteExistingFeedback(int userid, int poeid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.DeleteExistingFeedback(userid, poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public StandingNew GetStandingData(int poeid, int userid, int tileclicked, int subid, string domain)
        {
            try
            {
                var common = new BusinessLogic.Standing.Standing();
                return common.GetStandingData(poeid, userid, tileclicked, subid, domain);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetTopMembers(int poeid, int userid, int type, string domain)
        {
            try
            {
                var common = new BusinessLogic.Standing.Standing();
                return common.GetTopMembers(domain, poeid, userid, type);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public StandingPAContent GetStandingPAContent(int userid, int poeid, int subid, string domain, bool cacheMode)
        {
            try
            {
                var common = new BusinessLogic.Standing.Standing();
                return common.GetStandingPAContent(userid, poeid, subid, domain, cacheMode);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public DashBoard GetDashBoardDetails(int userid, int subid, int poeId, string domain)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetDashBoardDetails(userid, subid, poeId, domain);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<User> GetNotUpdatedPasswordList(string poeid)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetNotUpdatedPasswordList(poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void SendMailForResource(int fromid, string toIds, string resourceurl, string resourceTitle)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                common.SendMailForResource(fromid, toIds, resourceurl, resourceTitle);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public DashboardModel GetDashBoard(int userId, int poeId, int subid, string domain, int type)
        {
            try
            {
                var common = new BusinessLogic.Dashboard.Dashboard();
                return common.GetDashBoard(userId, poeId, subid, domain, type);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetIndividualUserSharedGoals(int userId, int poeId, int sharedId)
        {
            try
            {
                var common = new BusinessLogic.Dashboard.Dashboard();
                return common.GetGoalSharedCount(userId, poeId, sharedId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return 0;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public DashboardPathFinders GetPathfinders(int userId, int poeId, int type)
        {
            try
            {
                var common = new BusinessLogic.Dashboard.Dashboard();
                return common.GetPathfinders(userId, poeId, type);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public double GetMyManagerScore(int userId, int poeid, int managerId)
        {
            try
            {
                var common = new BusinessLogic.Dashboard.Dashboard();
                return common.GetMyManagerScore(userId, poeid, managerId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return 0;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetRecognitionCount(int userid, int shredId, int type)
        {
            try
            {
                var common = new BusinessLogic.Dashboard.Dashboard();
                return common.GetRecognitionCount(userid, shredId, type);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return 0;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetIndividualPathfindersCount(int userid, int poeId, int type, int moduleId, int pathfinderUserId)
        {
            try
            {
                var dashboard = new BusinessLogic.Dashboard.Dashboard();
                return dashboard.GetIndividualPathfindersCount(userid, poeId, type, moduleId, pathfinderUserId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return 0;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetFeedbackReceivedCount(int userId, int selectedUserid, int subid, int poeid)
        {
            try
            {
                var dashboard = new BusinessLogic.Dashboard.Dashboard();
                return dashboard.GetFeedbackReceivedCount(userId, selectedUserid, subid, poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return 0;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetFeedbackGivenCount(int userId, int selectedUserid, int subid, int poeid)
        {
            try
            {
                var dashboard = new BusinessLogic.Dashboard.Dashboard();
                return dashboard.GetFeedbackGivenCount(userId, selectedUserid, subid, poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return 0;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void CreateUpdateUserview(int userid, string section)
        {
            try
            {
                var common = new BusinessLogic.Common.CommonDataAccess();
                common.CreateUpdateUserview(userid, section);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public Util.Domain.Notification GetUserNotifications(int userId, int subscriptionId)
        {
            Util.Domain.Notification notify = null;
            try
            {
                var common = new BusinessLogic.Common.CommonDataAccess();
                notify = common.GetUserNotifications(userId, subscriptionId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return notify;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void ReportIssue(string path, string subject, string content, byte[] strdata, string from)
        {
            try
            {
                var common = new BusinessLogic.Common.CommonDataAccess();
                common.SendMailwithAttachmentUpdated(path, subject, content, strdata, from);

            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<v4_GetMentorConnectHistoryResult> GetConnectHistory(string fromId, string forId)
        {
            var connecthistory = new Activities().GetConnectHistory(fromId, forId);
            return connecthistory;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<QuestionLists> GetQuestionsList(int poeid)
        {
            List<QuestionLists> returnData = null;

            try
            {
                var goal = new BusinessLogic.Goal.GoalDataAccess();
                returnData = goal.GetQuestionsList(poeid);

            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }

            return returnData;

        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<string> GetTrackTileScore(int poeid, int userid, int subid, string domain)
        {
            try
            {
                var goal = new BusinessLogic.Goal.GoalDataAccess();
                return goal.GetTrackGoalTiles(poeid, userid, subid, domain);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public TrackGoal TrackModuleQuestions(int UserId, int PoeId, int subid, string domain, int usermapping = 0, int type = 0)
        {
            try
            {
                var goal = new BusinessLogic.Goal.GoalDataAccess();
                return goal.TrackModuleQuestions(UserId, PoeId, subid, domain, usermapping, type);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void DeleteGoalDate(int UserId, int PoeId, int QuestionId)
        {

            try
            {
                var goal = new BusinessLogic.Goal.GoalDataAccess();
                goal.DeleteGoalDate(UserId, PoeId, QuestionId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }

        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<v4_GetGoalssharedbyuserResult> GetGoalsShared(int userid, int foruserid, int PoeId, int subid, string domain)
        {
            try
            {
                var goal = new BusinessLogic.Goal.GoalDataAccess();
                return goal.GetGoalsShared(userid, foruserid, PoeId, subid, domain);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Util.Domain.POE> GetUserPoeByRoleUpdated(int userid, int role)
        {
            try
            {
                var common = new BusinessLogic.Standing.Standing();
                return common.GetUserPoeByRoleUpdated(userid, role);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Util.Domain.POE> GetUserPoeManagerRole(int userid)
        {
            try
            {
                var common = new BusinessLogic.Standing.Standing();
                return common.GetUserPoeManagerRole(userid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Util.Domain.POE> GetUserPoeTeamRole(int userid)
        {
            try
            {
                var common = new BusinessLogic.Standing.Standing();
                return common.GetUserPoeTeamRole(userid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserRole> GetUserRolesByProfile(int userid, int poeid)
        {

            try
            {
                var common = new BusinessLogic.Standing.Standing();
                return common.GetUserRolesByProfile(userid, poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserRole> GetUserCurrentRole(int userid)
        {

            try
            {
                var common = new BusinessLogic.Standing.Standing();
                return common.GetUserCurrentRole(userid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetManagerType(int userid, int poeid)
        {

            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetManagerType(userid, poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return 0;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<DevelopmentPriorities> GetManagerDevPriorities(int userId, int PoeId, int tmmappingId)
        {

            try
            {
                var common = new BusinessLogic.Goal.GoalDataAccess();
                return common.GetManagerDevPrioritiesByMappingIDs(userId, PoeId, tmmappingId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public GoalDate GetTeamGoalDate(int userId, int poeId, int tmid)
        {

            try
            {
                var common = new BusinessLogic.Goal.GoalDataAccess();
                return common.GetTeamGoalDate(userId, poeId, tmid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<DevelopmentPriorities> GetSelfDevPriorities(int userid, int PoeId)
        {

            try
            {
                var common = new BusinessLogic.Goal.GoalDataAccess();
                return common.GetSelfDevPriorities(userid, PoeId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void UpdateGoalDate(int tmid, DateTime goaldate, int userid)
        {

            try
            {
                var common = new BusinessLogic.Goal.GoalDataAccess();
                common.UpdateGoalDate(tmid, goaldate,userid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }

        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public GoalDate GetSelfGoalDate(int userId, int poeId)
        {

            try
            {
                var common = new BusinessLogic.Goal.GoalDataAccess();
                return common.GetSelfGoalDate(userId, poeId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Results> GetTeamDevProgress(int userid, int poeId, int tmid)
        {

            try
            {
                var common = new BusinessLogic.Goal.GoalDataAccess();
                return common.GetTeamDevProgress(userid, poeId, tmid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Results> GetManagerDevProgress(int userid, int poeId, int tmid)
        {

            try
            {
                var common = new BusinessLogic.Goal.GoalDataAccess();
                return common.GetManagerDevProgress(userid, poeId, tmid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public IList<MinimizedPOE> GetSubscripedPoeByResultMode(int userid)
        {

            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetSubscripedPoeByResultMode(userid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<User> GetUsersListByPoE(int poeid)
        {

            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetUsersListByPoE(poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<QuestionScore> GetImportanceAnswer(int userid, int poeid)
        {

            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetImportanceAnswer(userid, poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<QuestionScore> GetDemographicAnswer(int userid, int poeid)
        {

            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetDemographicAnswer(userid, poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<User> GetSurveyUsersListByPoE(int poeid)
        {

            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetSurveyUsersListByPoE(poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<QuestionScore> GetProductSurveyAnswer(int userid, int poeid)
        {

            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetProductSurveyAnswer(userid, poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetUserFBStatus(int userid, int poeid, int type)
        {

            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetUserFBStatus(userid, poeid, type);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return 0;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public Util.Response.Notification GetUserNotificationsLatest(int userid)
        {

            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetUserNotifications(userid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        public void UpdateManagerSync(int userid)
        {

            try
            {
                var common = new BusinessLogic.Common.Common();
                common.UpdateManagerSync(userid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }

        }
        [OperationContract]
        public void UpdateDevlopmentPriorities(int userid)
        {

            try
            {
                var common = new BusinessLogic.Common.Common();
                common.UpdateDevPriorities(userid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }

        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserRole> GetUserRolesByProfileUpdated(int userid, int poeid)
        {

            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetUserRolesByProfileUpdated(userid, poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void DeleteIncompleteFB(string feedbackId, int mode)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                common.DeleteIncompleteFB(feedbackId, mode);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Partner> GetPartners(int userid)
        {

            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetPartners(userid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void InsertSurveyAnswer(int questionId, int answerValue, string answer, int feedbackid)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                common.InsertSurveyAnswer(questionId, answerValue, answer, feedbackid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int CreateSurvey(int userid, int poeid, int partnerId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.CreateSurvey(userid, poeid, partnerId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return 0;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void CompleteSurvey(int feedbackId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                common.CompleteSurvey(feedbackId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public PSESurvey GetCompletedAnswers(int feedbackid)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetCompletedAnswers(feedbackid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void CreatePartner(int userid, string partnerName)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                common.CreatePartner(userid, partnerName);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool IsPartnerExist(int userId, string partnerName)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.IsPartnerExist(userId, partnerName);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<PPAResults> GetPartnerResults(int userId, int partnerId)
        {

            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetPartnerResults(userId, partnerId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void UpdatePartner(int userId, int partnerId, string partnerName)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                common.UpdatePartner(userId, partnerId, partnerName);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void DeletePartner(int userId, int partnerId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                common.DeletePartner(userId, partnerId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void UploadPlan(int userId, int partnerId, int poeid, string filnename, string extension, string realFileName)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                common.UploadPlan(userId, partnerId, poeid, filnename, extension, realFileName);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void DeletePlan(int userid, int partnerId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                common.DeletePlan(userid, partnerId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<User> LoadUserRolesbyPartner(int userid, int designationId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.LoadUserRolesbyPartner(userid, designationId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Designation> ListDesigantion(int userid)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.ListDesigantion(userid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<User> LoadTZUserRolesbyPartner(int userid, int designationId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.LoadTZUserRolesbyPartner(userid, designationId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Partner> GetOverallPartners(int userid, int designationId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetOverallPartners(userid, designationId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<User> LoadFilterPartners(int userid, int designationId, int currentUserid)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.LoadFilterPartners(userid, designationId, currentUserid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Zone> LoadAreaOfPartner(int userid, int designationId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.LoadAreaOfPartner(userid, designationId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<TimeZone> LoadTimeZoneOfPartner(int userid, int designationId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.LoadTimeZoneOfPartner(userid, designationId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Country> LoadCountryOfPartner(int userid, int designationId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.LoadCountryOfPartner(userid, designationId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Country> LoadCountryByAreaId(int areaId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.LoadCountryByAreaId(areaId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Zone> LoadAreaByZoneId(int zoneId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.LoadAreaByZoneId(zoneId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<User> LoadPartnersByAreaId(int userid, int designationId, int areaId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.LoadPartnersByAreaId(userid, designationId, areaId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<User> LoadPartnersByCountryId(int userid, int designationId, int countryId, int areaId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.LoadPartnersByCountryId(userid, designationId, countryId, areaId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<User> LoadPartnersByZoneId(int userid, int designationId, int zoneId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.LoadPartnersByZoneId(userid, designationId, zoneId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Partner> GetOverallPartnersByZone(int userid, int designationId, int areaId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetOverallPartnersByZone(userid, designationId, areaId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Partner> GetOverallPartnersByArea(int userid, int designationId, int areaId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetOverallPartnersByArea(userid, designationId, areaId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Partner> GetOverallPartnersByCountry(int userid, int designationId, int countryId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetOverallPartnersByCountry(userid, designationId, countryId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public string GetPartnerName(string mplId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetPartnerName(mplId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetPSEUserId(string emailid)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetPSEUserId(emailid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return 0;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetPartnerId(string mplId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetPartnerId(mplId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return 0;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void InsertPartnerMapping(int userId, int partnerId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                common.InsertPartnerMapping(userId, partnerId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }

        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public PSEReports GetPSEReports(int userId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetPSEReports(userId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<PSMReports> GetPSMReports(int userId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetPSMReports(userId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public TopLeadsReport GetAreaReports(int userId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetAreaReports(userId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public TopLeadsReport GetTimeZoneReports(int userId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetTimeZoneReports(userId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public StakeHolders GetStakeHolderReports()
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetStakeHolderReports();
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CompleteStatus GetCompleteStatus(int userId, int deisgnationId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetCompleteStatus(userId, deisgnationId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CompleteStatus GetCompleteStatusByArea(int userId, int deisgnationId, int areaId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetCompleteStatusByArea(userId, deisgnationId, areaId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CompleteStatus GetCompleteStatusByCountry(int userId, int deisgnationId, int countryId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetCompleteStatusByCountry(userId, deisgnationId, countryId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CompleteStatus GetCompleteStatusByTimeZone(int userId, int deisgnationId, int timeZone)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetCompleteStatusByTimeZone(userId, deisgnationId, timeZone);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CompleteStatus GetOverAllPSEDet(int userId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetOverAllPSEDet(userId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Country> LoadCountryByZoneId(int zoneId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.LoadCountryByZoneId(zoneId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public PPAReports GetAllPasswords()
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetAllPasswords();
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public PPAReports GetReports()
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetReports();
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool IsZoneExists(int userId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.IsZoneExists(userId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public StakeHolders GetOverallReportsCalculated()
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetOverallReportsCalculated();
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<PSMReports> GetReportsCalculated(int userId, int mode)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetReportsCalculated(userId, mode);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<getAxis> GetPSEReportCalculated(int userId, int partnerId, string mplId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetPSEReportCalculated(userId, partnerId, mplId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<PPAResults> GetStakeHolderReportCalculated()
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetStakeHolderReportCalculated();
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<PPAResults> GetReportsCalcNext(int userId, int mode)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetReportsCalcNext(userId,mode);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<getAxis> GetPSEReportCalculatedNew(int userId, int partnerId, string mplId)
        {
            try
            {
                var common = new BusinessLogic.Common.Common();
                return common.GetPSEReportCalculatedNew(userId, partnerId, mplId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }
    }
}