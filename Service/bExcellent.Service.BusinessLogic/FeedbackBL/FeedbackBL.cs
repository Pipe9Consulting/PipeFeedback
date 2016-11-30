using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Enumeration;
using bExcellent.Service.Util.Request;
using bExcellent.Service.Util.Response;

namespace bExcellent.Service.BusinessLogic.FeedbackBL
{
    public class FeedbackBL
    {
        #region Private Memeber

        /// <summary>
        /// Gets the data access.
        /// </summary>
        private FeedbackBLDataAccess DataAccess
        {
            get
            {
                return new FeedbackBLDataAccess();
            }
        }

        #endregion Private Memeber

        /// <summary>
        /// Saves the result.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="userCount">The user count.</param>
        /// <param name="userIndex">Index of the user.</param>
        public void SaveResult(SavePOEResultRequest request, int userCount = 1, int userIndex = 0)
        {
            DataAccess.SaveResult(request, userCount, userIndex);

            //If Feedback is completed then Create Activity For Manager and Self
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="feedBackId"></param>
        /// <returns></returns>
        public int CheckAnswers(int feedBackId)
        {
            return DataAccess.CheckAnswers(feedBackId);
        }

        /// <summary>
        /// Creates the feedback.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        public List<CreatedFeedback> CreateFeedback(NewFeedbackRequest request)
        {
            return DataAccess.CreateFeedback(request);
        }

        /// <summary>
        /// Gets the feedback history.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <param name="poeId">The poe id.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetFeedbackHistory(int userId, int subscriptionid, int poeId)
        {
            return DataAccess.GetFeedbackHistory(userId, subscriptionid, poeId);
        }

        /// <summary>
        /// Gets the outstanding feedbacks.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <param name="poeId">The poe id.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetOutstandingFeedbacks(int userId, int subscriptionid, int poeId)
        {
            return DataAccess.GetFeedbackOutstanding(userId, subscriptionid, poeId);
        }

        /// <summary>
        /// Gets the completed feedbacks.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        /*  public List<UserPOEMapping> GetCompletedFeedbacks(int userId, int subscriptionid)
          {
              return DataAccess.GetCompletedFeedbacks(userId, subscriptionid);
          }*/

        /// <summary>
        /// Gets the feedback given.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <param name="poeId">The poe id.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetFeedbackGiven(int userId, int subscriptionid, int poeId)
        {
            return DataAccess.GetFeedbackGiven(userId, subscriptionid, poeId);
        }

        public List<UserPOEMapping> GetFeedbackGivenFull(int userId, int subscriptionid, int poeId)
        {
            return DataAccess.GetFeedbackGivenFull(userId, subscriptionid, poeId);
        }

        /// <summary>
        /// Gets the feedback recevied.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <param name="poeId">The poe id.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetFeedbackRecevied(int userId, int subscriptionid, int poeId)
        {
            return DataAccess.GetFeedbackRecevied(userId, subscriptionid, poeId);
        }

        /// <summary>
        /// Gets the user feedbacks.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        /*  public List<UserPOEMapping> GetUserFeedbacks(int userId, int subscriptionid)
          {
              return DataAccess.GetUserFeedbacks(userId, subscriptionid).ToList();
          }
          */

        /// <summary>
        /// Gets the given answer.
        /// </summary>
        /// <param name="feedbackId">The feedback id.</param>
        /// <param name="questionId">The question id.</param>
        /// <returns></returns>
        public int GetGivenAnswer(int feedbackId, int questionId)
        {
            return DataAccess.GetGivenAnswer(feedbackId, questionId);
        }

        /// <summary>
        /// Updates the feedback status.
        /// </summary>
        /// <param name="feedbackId">The feedback id.</param>
        /// <param name="status">The status.</param>
        public void UpdateFeedbackStatus(int feedbackId, int status, string initials)
        {
            DataAccess.UpdateFeedbackStatus(feedbackId, status, initials);
        }

        /// <summary>
        /// Gets the last saved question.
        /// </summary>
        /// <param name="feedbackId">The feedback id.</param>
        /// <returns></returns>
        public SavedQuestion GetLastSavedQuestion(int feedbackId)
        {
            return DataAccess.GetLastSavedQuestion(feedbackId);
        }

        /// <summary>
        /// Gets the feedback results.
        /// </summary>
        /// <param name="feedbackId">The feedback id.</param>
        /// <returns></returns>
        public List<SavePOEResultRequest> GetFeedbackResults(int feedbackId)
        {
            return DataAccess.GetFeedbackResults(feedbackId);
        }

        /// <summary>
        /// Gets the feedbacks by group id.
        /// </summary>
        /// <param name="groupid">The groupid.</param>
        /// <returns></returns>
        public List<CreatedFeedback> GetFeedbacksByGroupId(string groupid)
        {
            return DataAccess.GetFeedbacksByGroupId(groupid);
        }

        public List<UserPOEMapping> GetTopMembers(string domain, int poeid, string userid)
        {
            return DataAccess.GetTopMembers(domain, poeid, userid);
        }

        public List<FeedbackDetail> GetAllFeedbackDetails(int feedbacktype, int poeid)
        {
            return DataAccess.GetAllFeedbackDetails(feedbacktype, poeid);
        }

        public List<ManagerFeedback> GetManagerReportDumb(int feedbacktype, int poeid)
        {
            return DataAccess.GetManagerReportDumb(feedbacktype, poeid);
        }

        public DataDumbScore GetModuleScores(string feedbackid, int poeid)
        {
            return DataAccess.GetModuleScores(feedbackid, poeid);
        }

        public List<UserFeedback> GetTeamMberDumb(int feedbacktype, int poeid)
        {
            return DataAccess.GetTeamMberDumb(feedbacktype, poeid);
        }

        public void InsertUpdateUSerRating(int Userid, int Questionid, int Userrating, int feedbackid, int poeId)
        {
            DataAccess.InsertUpdateUSerRating(Userid, Questionid, Userrating, feedbackid, poeId);
        }

        public int GetUserRatingByPoeId(int? Userid, int? Poeid,int questionid,int feedbackid)
        {
           return DataAccess.GetUserRatingByPoeId(Userid, Poeid,questionid,feedbackid);
        }
        public int GetUserRatingByPoeIdUpdated(int Userid, int Poeid)
        {
            return DataAccess.GetUserRatingByPoeIdUpdated(Userid, Poeid);
        }

        public void UpdateFeedbackNotes(int Feedbackid, string subject, string notes, int Questionid)
        {
            DataAccess.UpdateFeedbackNotes(Feedbackid, subject, notes, Questionid);
        }

        public List<Question> GetFbExperienceQuestions()
        {
           return  DataAccess.GetFbExperienceQuestions();
        }

        public void InsertFbExperience(int Userid, int Feedbackid, int Questionid, int Answer)
        {
            DataAccess.InsertFbExperience(Userid, Feedbackid, Questionid, Answer);
        }
        public void InsertUpdateUserDemographic(int userid, int poeid, int QuestionId, int feedbackid, string answer)
        {
            DataAccess.InsertUpdateUserDemographic(userid, QuestionId, answer, feedbackid, poeid);
        }
        public void SaveSurveyResult(int feedbackId, int questionId, string answer, int poeid, int subQuestionId, int userid, bool isSubQuestion)
        {
            DataAccess.SaveSurveyResult(feedbackId, questionId, answer, poeid, subQuestionId, userid, isSubQuestion);
        }
        public List<UserSurvey> GetUserSurvey(int userId, int poeId)
        {
            return DataAccess.GetUserSurvey(userId, poeId);
        }
        public DataDumbScore GetCapabilityModuleScores(string feedbackid, int poeid)
        {
            return DataAccess.GetCapabilityModuleScores(feedbackid, poeid);
        }
    }
}