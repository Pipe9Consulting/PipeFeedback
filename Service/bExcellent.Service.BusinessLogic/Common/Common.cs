using System.Collections.Generic;
using System.Data.Linq.Mapping;
using System.Linq;
using bExcellent.Service.DataAccess;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Enumeration;
using bExcellent.Service.Util.Request;
using bExcellent.Service.Util.Response;

namespace bExcellent.Service.BusinessLogic.Common
{
    public class Common
    {
        #region Private Memeber

        /// <summary>
        /// Gets the data access.
        /// </summary>
        private CommonDataAccess DataAccess
        {
            get { return new CommonDataAccess(); }
        }

        #endregion Private Memeber

        public List<Util.Domain.POE> GetAllPoEs()
        {
            return DataAccess.GetAllPoEs();
        }

        public List<Util.Domain.POE> GetSubscribedPoes(int subId)
        {
            return DataAccess.GetSubscribedPoes(subId);
        }

        /// <summary>
        /// Gets the po es by user id.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <returns></returns>
        ///
        public IList<MinimizedPOE> GetPoEsByUserId(int userId)
        {
            return DataAccess.GetPoEsByUserId(userId).GroupBy(x => x.POEId).Select(y => y.First()).ToList();
        }

        public IList<MinimizedPOE> GetMySubscribedPoes(int subId)
        {
            IList<MinimizedPOE> result = DataAccess.GetMySubscribedPoes(subId).ToList();
            return result;
        }

        public IList<MinimizedPOE> GetMySubscribedPoeList(int userid, int subId)
        {
            return DataAccess.GetMySubscribedPoeList(userid, subId).ToList();
        }

        public List<Network> GetMySubscription(string emailId)
        {
            return DataAccess.GetMySubscription(emailId);
        }

        public Network GetOwnNetwork(string emailId)
        {
            return DataAccess.GetOwnNetwork(emailId);
        }

        public List<Util.Domain.User> GetSubscribedUserWall(int userid, int subId)
        {
            return DataAccess.GetSubscribedUserWall(userid, subId);
        }

        public List<Util.Domain.POE> GetSubscribedPoesList(int userid, int subId)
        {
            return DataAccess.GetSubscribedPoesList(userid, subId);
        }

        /// <summary>
        /// Gets the user role.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeid">The poeid.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        public int GetUserRole(int userId, int poeid, int subscriptionid)
        {
            return DataAccess.GetUserRole(userId, poeid, subscriptionid);
        }

        /// <summary>
        /// Gets my teammembers.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="POEId">The POE id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetMyTeammembers(int userId, int POEId, int subscriptionid)
        {
            return DataAccess.GetNetworksUsers(userId, POEId, NetworkUserFilterType.TeamMember, subscriptionid);
        }

        public List<UserPOEMapping> GetMyUsers(int userId, int subscriptionid)
        {
            return DataAccess.GetAllMembers(userId, subscriptionid);
        }

        public List<UserPOEMapping> GetMyAllUsers(int userId, int subscriptionid)
        {
            return DataAccess.GetAllUsersData(userId, subscriptionid);
        }

        /// <summary>
        /// Gets my give fb team.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="POEId">The POE id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetMyGiveFbTeam(int userId, int POEId, int subscriptionid)
        {
            List<UserPOEMapping> myGiveFbTeam = new List<UserPOEMapping>();

            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsersSync(userId, POEId, NetworkUserFilterType.TeamMember));
            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsersSync(userId, POEId, NetworkUserFilterType.PeerTeam));

            foreach (UserPOEMapping userPoeMapping in myGiveFbTeam)
            {
                Sync.Sync sync = new Sync.Sync();
                userPoeMapping.WcsiScoreDiff = sync.WcsiScoreDifference(userId, POEId, subscriptionid,
                                                                        userPoeMapping.UserPOEMappingId, 2);
            }

            return myGiveFbTeam;
        }

        public List<UserPOEMapping> GetMyGiveFbTeamList(int userId, int POEId, int subscriptionid)
        {
            List<UserPOEMapping> myGiveFbTeam = new List<UserPOEMapping>();

            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsers(userId, POEId, NetworkUserFilterType.TeamMember, subscriptionid));
            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsers(userId, POEId, NetworkUserFilterType.PeerTeam, subscriptionid));

            foreach (UserPOEMapping userPoeMapping in myGiveFbTeam)
            {
                Sync.Sync sync = new Sync.Sync();
                userPoeMapping.WcsiScoreDiff = sync.WcsiScoreDifference(userId, POEId, subscriptionid,
                                                                        userPoeMapping.UserPOEMappingId, 2);
            }

            return myGiveFbTeam;
        }

        /// <summary>
        /// Gets my receive fb team.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="POEId">The POE id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetMyReceiveFbTeam(int userId, int POEId, int subscriptionid)
        {
            List<UserPOEMapping> myGiveFbTeam = new List<UserPOEMapping>();

            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsersSync(userId, POEId, NetworkUserFilterType.Manager));
            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsersSync(userId, POEId, NetworkUserFilterType.SkipLevelManager));
            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsersSync(userId, POEId, NetworkUserFilterType.PeerManager));
            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsersSync(userId, POEId, NetworkUserFilterType.Customer));
            foreach (UserPOEMapping userPoeMapping in myGiveFbTeam)
            {
                Sync.Sync sync = new Sync.Sync();
                userPoeMapping.WcsiScoreDiff = sync.WcsiScoreDifference(userId, POEId, subscriptionid,
                                                                        userPoeMapping.UserPOEMappingId, 1);
            }
            return myGiveFbTeam;
        }
        public List<UserPOEMapping> GetMyManagersFeedback(int userId, int POEId, int subscriptionid)
        {
            List<UserPOEMapping> myGiveFbTeam = new List<UserPOEMapping>();

            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsersSync(userId, POEId, NetworkUserFilterType.Manager));
            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsersSync(userId, POEId, NetworkUserFilterType.SkipLevelManager));
            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsersSync(userId, POEId, NetworkUserFilterType.PeerManager));
            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsersSync(userId, POEId, NetworkUserFilterType.Customer));
            foreach (UserPOEMapping userPoeMapping in myGiveFbTeam)
            {
                Sync.Sync sync = new Sync.Sync();
                userPoeMapping.WcsiScoreDiff = sync.WcsiScoreOfManager(userId, POEId, subscriptionid,
                                                                        userPoeMapping.UserPOEMappingId, 1);
            }
            return myGiveFbTeam;
        }
        public List<UserPOEMapping> GetMyReceiveFbTeamList(int userId, int POEId, int subscriptionid)
        {
            List<UserPOEMapping> myGiveFbTeam = new List<UserPOEMapping>();

            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsers(userId, POEId, NetworkUserFilterType.Manager, subscriptionid));
            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsers(userId, POEId, NetworkUserFilterType.SkipLevelManager, subscriptionid));
            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsers(userId, POEId, NetworkUserFilterType.PeerManager, subscriptionid));
            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsers(userId, POEId, NetworkUserFilterType.Customer, subscriptionid));
            foreach (UserPOEMapping userPoeMapping in myGiveFbTeam)
            {
                Sync.Sync sync = new Sync.Sync();
                userPoeMapping.WcsiScoreDiff = sync.WcsiScoreDifference(userId, POEId, subscriptionid,
                                                                        userPoeMapping.UserPOEMappingId, 1);
            }
            return myGiveFbTeam;
        }

        /// <summary>
        /// Gets the user details by email id.
        /// </summary>
        /// <param name="emailId">The email id.</param>
        /// <returns></returns>
        public User GetUserDetailsByEmailId(string emailId)
        {
            return DataAccess.GetUserDetailsByEmailId(emailId);
        }

        public User GetUserById(int id)
        {
            return DataAccess.GetUserById(id);
        }

        /// <summary>
        /// Gets the user mapping details.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetUserMappingDetails(int userId, int subscriptionid)
        {
            return DataAccess.GetUserMapping(userId, subscriptionid);
        }

        public List<UserPOEMapping> GetNetworksUsersWall(int userId, int POEId, int subscriptionid)
        {
            return DataAccess.GetNetworksUsersWall(userId, POEId, subscriptionid);
        }

        /// <summary>
        /// Gets my manager.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="POEId">The POE id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetMyManager(int userId, int POEId, int subscriptionid)
        {
            List<UserPOEMapping> myGiveFbTeam = new List<UserPOEMapping>();

            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsers(userId, POEId, NetworkUserFilterType.SkipLevelManager, subscriptionid));
            myGiveFbTeam.AddRange(DataAccess.GetNetworksUsers(userId, POEId, NetworkUserFilterType.Manager, subscriptionid));

            return myGiveFbTeam;
        }

        /// <summary>
        /// Gets my customers.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="POEId">The POE id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetMyCustomers(int userId, int POEId, int subscriptionid)
        {
            return DataAccess.GetNetworksUsers(userId, POEId, NetworkUserFilterType.Customer, subscriptionid);
        }

        /// <summary>
        /// Gets my full network.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="POEId">The POE id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetMyFullNetwork(int userId, int POEId, int subscriptionid)
        {
            List<UserPOEMapping> myTeam = new List<UserPOEMapping>();

            myTeam.AddRange(GetMyManager(userId, POEId, subscriptionid));
            myTeam.AddRange(GetMyTeammembers(userId, POEId, subscriptionid));
            myTeam.AddRange(GetMyPeers(userId, POEId, subscriptionid));
            myTeam.AddRange(GetMyCustomers(userId, POEId, subscriptionid));

            return myTeam;
        }

        /// <summary>
        /// Gets my network count.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="POEId">The POE id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        public int GetMyNetworkCount(int userId, int POEId, int subscriptionid)
        {
            return DataAccess.GetMyTeamCount(userId, POEId, NetworkUserFilterType.None, subscriptionid);
        }

        /// <summary>
        /// Gets my peers.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="POEId">The POE id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetMyPeers(int userId, int POEId, int subscriptionid)
        {
            List<UserPOEMapping> myPeer = new List<UserPOEMapping>();

            var myPeerManager = DataAccess.GetNetworksUsers(userId, POEId, NetworkUserFilterType.PeerManager, subscriptionid);
            var myPeerTeam = DataAccess.GetNetworksUsers(userId, POEId, NetworkUserFilterType.PeerTeam, subscriptionid);

            foreach (UserPOEMapping userPoeMapping in myPeerManager)
            {
                var firstOrDefault = myPeerTeam.FirstOrDefault(a => a.User.UserId == userPoeMapping.User.UserId);
                if (firstOrDefault != null)
                    userPoeMapping.SecondaryUserPOEMappingId = firstOrDefault.UserPOEMappingId;

                userPoeMapping.Designation.Name = "Peer";
                myPeer.Add(userPoeMapping);
            }

            return myPeer;
        }

        /// <summary>
        /// Gets the user details by mapping id.
        /// </summary>
        /// <param name="userMappingId">The user mapping id.</param>
        /// <returns></returns>
        public UserPOEMapping GetUserDetailsByMappingId(int userMappingId)
        {
            return DataAccess.GetUserDetailsByMappingId(userMappingId);
        }

        public UserPOEMapping GetUserDetailsByFbId(int fbId)
        {
            return DataAccess.GetUserDetailsByFbId(fbId);
        }

        /// <summary>
        /// Gets my detail.
        /// </summary>
        /// <param name="userid">The userid.</param>
        /// <param name="poeid">The poeid.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        public UserPOEMapping GetMyDetail(int userid, int poeid, int subscriptionid)
        {
            return DataAccess.GetMyDetail(userid, poeid, subscriptionid);
        }

        /// <summary>
        /// GetMyDetailWithArea
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="poeid"></param>
        /// <param name="subscriptionid"></param>
        /// <returns></returns>
        public UserPOEMapping GetMyDetailWithArea(int userid, int poeid, int subscriptionid)
        {
            return DataAccess.GetMyDetailWithArea(userid, poeid, subscriptionid);
        }

        /// <summary>
        /// Gets all counties.
        /// </summary>
        /// <returns></returns>
        public List<Country> GetAllCounties()
        {
            return DataAccess.GetAllCounties();
        }

        /// <summary>
        /// GetAllArea
        /// </summary>
        /// <returns></returns>
        public List<Zone> GetAllArea()
        {
            return DataAccess.GetAllArea();
        }

        /// <summary>
        /// Gets the name of the poe.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <returns></returns>
        public string GetPoeName(int poeid)
        {
            return DataAccess.GetPoeName(poeid);
        }

        /// <summary>
        /// Gets the networks users.
        /// </summary>
        /// <param name="emailId">The email id.</param>
        /// <returns></returns>
        public List<Network> GetUserSubscriptions(string emailId)
        {
            return DataAccess.GetUserSubscriptions(emailId);
        }

        public Network GetDefaultUserSubscription(string emailId)
        {
            return DataAccess.GetDefaultUserSubscription(emailId);
        }

        public void DeleteUser(int userid, int poeid, int subscriptionid, int level, int deleteId, int deletepeer)
        {
            DataAccess.DeleteUser(userid, poeid, subscriptionid, level, deleteId, deletepeer);
        }

        public void CreateActivity(int userid, string toids, int subid, int sourceid, string activity, int poeid = 0)
        {
            DataAccess.CreateActivity(userid, toids, subid, sourceid, activity, poeid);
        }

        public void CreateActivityForPathFinders(int userid, string toids, int subid, int sourceid, string activity, int poeId, int moduleId)
        {
            DataAccess.CreateActivityForPathFinders(userid, toids, subid, sourceid, activity, poeId, moduleId);
        }

        public void SendConnectMail(int userid, string toids, int poeId)
        {
            DataAccess.SendConnectMail(userid, toids, poeId);
        }

        public void SendMailFromWall(int type, string fromname, string toIds, bool hasAttachment)
        {
            DataAccess.SendMailFromWall(type, fromname, toIds, hasAttachment);
        }

        public void UpdatePageMode(int userid, int status)
        {
            DataAccess.UpdatePageMode(userid, status);
        }

        public void AssignPoe(List<AssignPoe> assignpoes)
        {
            DataAccess.AssignPoe(assignpoes);
        }

        public Plan GetPlanById(int planId)
        {
            return DataAccess.GetPlanById(planId);
        }

        public List<Util.Domain.Accounts> GetAccountDetail(int subId)
        {
            return DataAccess.GetAccountDetail(subId);
        }

        public int CheckMapping(int userId, int subscriptionid)
        {
            return DataAccess.CheckMapping(userId, subscriptionid);
        }

        public void SendPlanNotification()
        {
            DataAccess.SendPlanNotification();
        }

        public void SendPoePdfNotification(string emailContents, string subject)
        {
            DataAccess.SendPoePdfNotification(emailContents, subject);
        }

        public string GetPassword(string emailid)
        {
            return DataAccess.GetPassword(emailid);
        }

        public List<ManagerReports> GenerateManagerReport(int poeid)
        {
            return DataAccess.GenerateManagerReport(poeid);
        }

        public List<TeamReports> GenerateTeamReport(int poeid)
        {
            return DataAccess.GenerateTeamReport(poeid);
        }

        public void InsertYammerContent(string tomailid, string frmMailid, string imageurl, string subject, string groupid, string desc, string yammertoken)
        {
            DataAccess.InsertYammerContent(tomailid, frmMailid, imageurl, subject, groupid, desc, yammertoken);
        }

        public List<YammerContent> GetYammerTopContent()
        {
            return DataAccess.GetYammerTopContent();
        }

        public void UpdateYammercontent(int id)
        {
            DataAccess.UpdateYammercontent(id);
        }

        public int GetModuleCount(int poeid)
        {
            return DataAccess.GetModuleCount(poeid);
        }

        public void DeleteExistingFeedback(int userid, int poeid)
        {
            DataAccess.DeleteExistingFeedback(userid, poeid);
        }

        public DashBoard GetDashBoardDetails(int userid, int subid, int poeId, string domain)
        {
            return DataAccess.GetDashBoardDetails(userid, subid, poeId, domain);
        }

        public List<User> GetNotUpdatedPasswordList(string poeid)
        {
            return DataAccess.GetNotUpdatedPasswordList(poeid);
        }

        public void SendMailForResource(int fromid, string toIds, string resourceurl, string resourceTitle)
        {
            DataAccess.SendMailForResource(fromid, toIds, resourceurl, resourceTitle);
        }

        public List<V3_GetSelfFbUsersResult> GetSelfbUser(int poeId)
        {
            return DataAccess.GetSelfbUser(poeId);
        }

        public void UpdateLastMail(int mappingId, int messageCount)
        {
            UpdateLastMail(mappingId, messageCount);
        }
        public int GetManagerType(int userid, int poeid)
        {
            return DataAccess.GetManagerType(userid, poeid);
        }
        public IList<MinimizedPOE> GetSubscripedPoeByResultMode(int userid)
        {
            return DataAccess.GetSubscripedPoeByResultMode(userid);
        }
        public List<User> GetUsersListByPoE(int poeid)
        {
            return DataAccess.GetUsersListByPoE(poeid);
        }
        public List<QuestionScore> GetImportanceAnswer(int userid, int poeid)
        {
            return DataAccess.GetImportanceAnswer(userid, poeid);
        }

        public List<QuestionScore> GetDemographicAnswer(int userid, int poeid)
        {
            return DataAccess.GetDemographicAnswer(userid, poeid);
        }
        public List<User> GetSurveyUsersListByPoE(int poeid)
        {
            return DataAccess.GetSurveyUsersListByPoE(poeid);
        }
        public List<QuestionScore> GetProductSurveyAnswer(int userid, int poeid)
        {
            return DataAccess.GetProductSurveyAnswer(userid, poeid);
        }
        public int GetUserFBStatus(int userid, int poeid, int type)
        {
            return DataAccess.GetUserFBStatus(userid, poeid, type);
        }
        public Util.Response.Notification GetUserNotifications(int userid)
        {
            return DataAccess.GetUserNotifications(userid);
        }
        public void UpdateManagerSync(int userid)
        {
            DataAccess.UpdateManagerSync(userid);
        }
        public void UpdateDevPriorities(int userid)
        {
            DataAccess.UpdateDevPriorities(userid);
        }
        public List<UserRole> GetUserRolesByProfileUpdated(int userid, int poeid)
        {
            return DataAccess.GetUserRolesByProfileUpdated(userid, poeid);
        }
        public void DeleteIncompleteFB(string feedbackId, int mode)
        {
            DataAccess.DeleteIncompleteFB(feedbackId, mode);
        }
        public List<Partner> GetPartners(int userid)
        {
            return DataAccess.GetPartners(userid);
        }
        public void InsertSurveyAnswer(int questionId, int answerValue, string answer, int feedbackid)
        {
            DataAccess.InsertSurveyAnswer(questionId, answerValue, answer, feedbackid);
        }
        public int CreateSurvey(int userid, int poeid, int partnerId)
        {
            return DataAccess.CreateSurvey(userid, poeid, partnerId);
        }
        public void CompleteSurvey(int feedbackId)
        {
            DataAccess.CompleteSurvey(feedbackId);
        }
        public PSESurvey GetCompletedAnswers(int feedbackid)
        {
            return DataAccess.GetCompletedAnswers(feedbackid);
        }
        public void CreatePartner(int userid, string partnerName)
        {
            DataAccess.CreatePartner(userid, partnerName);
        }
        public bool IsPartnerExist(int userId, string partnerName)
        {
            return DataAccess.IsPartnerExist(userId, partnerName);
        }
        public List<PPAResults> GetPartnerResults(int userId, int partnerId)
        {
            return DataAccess.GetPartnerResults(userId, partnerId);
        }
        public void UpdatePartner(int userId, int partnerId, string partnerName)
        {
            DataAccess.UpdatePartner(userId, partnerId, partnerName);
        }
        public void DeletePartner(int userId, int partnerId)
        {
            DataAccess.DeletePartner(userId, partnerId);
        }
        public void UploadPlan(int userId, int partnerId, int poeid, string filnename, string extension, string realFileName)
        {
            DataAccess.UploadPlan(userId, partnerId, poeid, filnename, extension, realFileName);
        }
        public void DeletePlan(int userid, int partnerId)
        {
            DataAccess.DeletePlan(userid, partnerId);
        }
        public List<User> LoadUserRolesbyPartner(int userid, int designationId)
        {
            return DataAccess.LoadUserRolesbyPartner(userid, designationId);
        }
        public List<Designation> ListDesigantion(int userid)
        {
            return DataAccess.ListDesigantion(userid);
        }
        public List<User> LoadTZUserRolesbyPartner(int userid, int designationId)
        {
            return DataAccess.LoadTZUserRolesbyPartner(userid, designationId);
        }
        public List<Partner> GetOverallPartners(int userid, int designationId)
        {
            return DataAccess.GetOverallPartners(userid, designationId);
        }
        public List<User> LoadFilterPartners(int userid, int designationId, int currentUserid)
        {
            return DataAccess.LoadFilterPartners(userid, designationId, currentUserid);
        }
        public List<Zone> LoadAreaOfPartner(int userid, int designationId)
        {
            return DataAccess.LoadAreaOfPartner(userid, designationId);
        }
        public List<TimeZone> LoadTimeZoneOfPartner(int userid, int designationId)
        {
            return DataAccess.LoadTimeZoneOfPartner(userid, designationId);
        }
        public List<Country> LoadCountryOfPartner(int userid, int designationId)
        {
            return DataAccess.LoadCountryOfPartner(userid, designationId);
        }
        public List<Country> LoadCountryByAreaId(int areaId)
        {
            return DataAccess.LoadCountryByAreaId(areaId);
        }
        public List<Zone> LoadAreaByZoneId(int zoneId)
        {
            return DataAccess.LoadAreaByZoneId(zoneId);
        }
        public List<User> LoadPartnersByAreaId(int userid, int designationId, int areaId)
        {
            return DataAccess.LoadPartnersByAreaId(userid, designationId, areaId);
        }
        public List<User> LoadPartnersByCountryId(int userid, int designationId, int countryId, int areaId)
        {
            return DataAccess.LoadPartnersByCountryId(userid, designationId, countryId, areaId);
        }
        public List<User> LoadPartnersByZoneId(int userid, int designationId, int zoneId)
        {
            return DataAccess.LoadPartnersByZoneId(userid, designationId, zoneId);
        }
        public List<Partner> GetOverallPartnersByZone(int userid, int designationId, int areaId)
        {
            return DataAccess.GetOverallPartnersByZone(userid, designationId, areaId);
        }
        public List<Partner> GetOverallPartnersByArea(int userid, int designationId, int areaId)
        {
            return DataAccess.GetOverallPartnersByArea(userid, designationId, areaId);
        }
        public List<Partner> GetOverallPartnersByCountry(int userid, int designationId, int countryId)
        {
            return DataAccess.GetOverallPartnersByCountry(userid, designationId, countryId);
        }
        public string GetPartnerName(string mplId)
        {
            return DataAccess.GetPartnerName(mplId);
        }
        public int GetPSEUserId(string emailId)
        {
            return DataAccess.GetPSEUserId(emailId);
        }
        public int GetPartnerId(string Mplid)
        {
            return DataAccess.GetPartnerId(Mplid);
        }

        public void InsertPartnerMapping(int userId, int partnerId)
        {
            InsertPartnerMapping(userId, partnerId);
        }

        public PSEReports GetPSEReports(int userId)
        {
            return DataAccess.GetPSEReports(userId);
        }

        public List<PSMReports> GetPSMReports(int userId)
        {
            return DataAccess.GetPSMReports(userId);
        }

        public TopLeadsReport GetAreaReports(int userId)
        {
            return DataAccess.GetAreaReports(userId);
        }

        public TopLeadsReport GetTimeZoneReports(int userId)
        {
            return DataAccess.GetTimeZoneReports(userId);
        }

        public StakeHolders GetStakeHolderReports()
        {
            return DataAccess.GetStakeHolderReports();
        }

        public CompleteStatus GetCompleteStatus(int userId, int deisgnationId)
        {
            return DataAccess.GetCompleteStatus(userId, deisgnationId);
        }

        public CompleteStatus GetCompleteStatusByArea(int userId, int deisgnationId, int areaId)
        {
            return DataAccess.GetCompleteStatusByArea(userId, deisgnationId, areaId);
        }

        public CompleteStatus GetCompleteStatusByCountry(int userId, int deisgnationId, int countryId)
        {
            return DataAccess.GetCompleteStatusByCountry(userId, deisgnationId, countryId);
        }

        public CompleteStatus GetCompleteStatusByTimeZone(int userId, int deisgnationId, int timeZone)
        {
            return DataAccess.GetCompleteStatusByTimeZone(userId, deisgnationId, timeZone);
        }

        public CompleteStatus GetOverAllPSEDet(int userId)
        {
            return DataAccess.GetOverAllPSEDet(userId);
        }

        public List<Country> LoadCountryByZoneId(int zoneId)
        {
            return DataAccess.LoadCountryByZoneId(zoneId);
        }

        public PPAReports GetReports()
        {
            return DataAccess.GetReports();
        }
        public PPAReports GetAllPasswords()
        {
            return DataAccess.GetAllPasswords();
        }

        public bool IsZoneExists(int userId)
        {
            return DataAccess.IsZoneExists(userId);
        }

        public StakeHolders GetOverallReportsCalculated()
        {
            return DataAccess.GetOverallReportsCalculated();
        }

        public List<PSMReports> GetReportsCalculated(int userId, int mode)
        {
            return DataAccess.GetReportsCalculated(userId, mode);
        }
        public List<getAxis> GetPSEReportCalculated(int userId, int partnerId, string mplId)
        {
            return DataAccess.GetPSEReportCalculated(userId, partnerId, mplId);
        }

        public List<PPAResults> GetStakeHolderReportCalculated()
        {
            return DataAccess.GetStakeHolderReportCalculated();
        }

        public List<PPAResults> GetReportsCalcNext(int userId, int mode)
        {
            return DataAccess.GetReportsCalcNext(userId, mode);
        }

        public List<getAxis> GetPSEReportCalculatedNew(int userId, int partnerId, string mplId)
        {
            return DataAccess.GetPSEReportCalculatedNew(userId, partnerId, mplId);
        }

        public bool ToolRequestAccess(string firstname, string lastname, string alias, string manageralias, string role, string country)
        {
            return DataAccess.ToolRequestAccess(firstname, lastname, alias, manageralias, role, country);
        }

        public List<GoalEmail> GetGoalDates()
        {
            return DataAccess.GetGoalDates();
        }

        public void DeleteFeedback(int fbid, int userId)
        {
            DataAccess.DeleteFeedback(fbid, userId);
        }
    }
}