using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Request;
using bExcellent.Service.Util.Response;

namespace bExcellent.Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IFeedback" in both code and config file together.
    //  [ServiceContract]
    public interface IFeedbackService
    {
        int GetFeedbackGivenCount(int userId, int subscriptionid, int poeId);

        int GetFeedbackReceivedCount(int userId, int subscriptionid, int poeId);

        string GetPOEIntro(int poeid);

        string GetModuleIntro(int poeid, int moduleId);

        string GetPOEKeyAction(int poeid);

        string GetModuleKeyAction(int poeid, int moduleId);

        List<Module> GetPracticeArea(int poeid);

        List<Question> GetQuestions(int moduleId);

        int GetQuestionCount(int poeid, int type);

        bool SavePOEResult(List<SavePOEResultRequest> request);
        bool SaveDemographicResult(int userid, int poeid, int QuestionId, int feedbackid, string answer);
        List<CreatedFeedback> CreateFeedback(NewFeedbackRequest request);

        List<UserPOEMapping> GetFeedbackHistory(int userId, int subscriptionid, int poeId);

        //  List<UserPOEMapping> GetFeedbackstatus(int userId);

        List<UserPOEMapping> GetFeedbackGiven(int userId, int subscriptionid, int poeId);

        List<UserPOEMapping> GetFeedbackRecevied(int userId, int subscriptionid, int poeId);

        List<UserPOEMapping> GetOutstandingFeedbacks(int userId, int subscriptionid, int poeId);

        SavedQuestion GetLastSavedQuestion(int feedbackId);

        List<SavePOEResultRequest> GetFeedbackResults(int feedbackId);

        List<CreatedFeedback> GetFeedbacksByGroupId(string groupid);

        void InsertUpdateUSerRating(int Userid, int Questionid, int Userrating, int feedbackid, int poeId);

        int GetUserRatingByPoeId(int Userid, int Poeid,int questionid,int feedbackid);

        void UpdateFeedbackNotes(int Feedbackid, string subject, string notes, int Questionid);

        void InsertFbExperience(List<SavePOEResultRequest> requests);

        List<Question> GetFbExperienceQuestions();

        List<MentorDetail> GetPathfindersIds(int userId, int poeId, int type);

        List<Goals> GetDevPriorityQuestions(int UserId, int PoeId);

        List<Goals> GetModuleQuestions(int UserId, int PoeId);
    }
}