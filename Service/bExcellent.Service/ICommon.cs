using System.Collections.Generic;
using bExcellent.Service.DataAccess;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Response;
using System.IO;

namespace bExcellent.Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "ICommon" in both code and config file together.

    public interface ICommon
    {
        IList<MinimizedPOE> GetPoEsByUserId(int userId);

        List<UserPOEMapping> GetUserMappingDetails(int userId, int subscriptionid);

        int GetUserRole(int userId, int poeId, int subscriptionid);

        List<UserPOEMapping> GetMyTeammembers(int userId, int poeId, int subscriptionid);

        List<UserPOEMapping> GetMyManager(int userId, int poeId, int subscriptionid);

        List<UserPOEMapping> GetMyCustomers(int userId, int poeId, int subscriptionid);

        List<UserPOEMapping> GetMyPeers(int userId, int poeId, int subscriptionid);

        List<UserPOEMapping> GetMyFullNetwork(int userId, int poeId, int subscriptionid);

        List<UserPOEMapping> GetMyGiveFbTeam(int userId, int poeId, int subscriptionid);

        List<UserPOEMapping> GetMyReceiveFbTeam(int userId, int poeId, int subscriptionid);

        int GetMyNetworkCount(int userId, int poeId, int subscriptionid);

        User GetUserDetailsByEmailId(string emailId);

        UserPOEMapping GetMyDetail(int userid, int poeid, int subscriptionid);

        List<Country> GetAllCounties();

        User GetUserPhoto(int userId);

        bool UpdateUserPhoto(int userId, byte[] photo);

        bool UpdateUserDetails(string firstName, string lastName, string companyName, string jobTitle, int countryId, int userId, int areaId);

        bool UpdatePassword(string userName, string password);

        bool GetPassword(string emailaddress);

        bool CheckEmailId(string EmailId);

        string GetPoeName(int poeId);

        List<Network> GetUserSubscriptions(string emailId);

        List<V3_GetMyActivitiesResult> GetMyActivities(int userId, int subscriptionId, int sourceId);

        Plan GetPlanById(int planId);

        void CreateUpdateUserview(int userid, string section);

        Util.Domain.Notification GetUserNotifications(int userId, int subscriptionId);

        void ReportIssue(string path, string subject, string content, byte[] strdata,string from);

        List<v4_GetMentorConnectHistoryResult> GetConnectHistory(string fromId, string forId);

        List<QuestionLists> GetQuestionsList(int poeid);

        TrackGoal TrackModuleQuestions(int UserId, int PoeId, int subid, string domain, int usermapping = 0, int type = 0);

    }
}