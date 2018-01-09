using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using bExcellent.Service.BusinessLogic.FeedbackBL;
using bExcellent.Service.BusinessLogic.POE;
using bExcellent.Service.BusinessLogic.UserAdmin;
using bExcellent.Service.BusinessLogic.Dashboard;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Enumeration;
using bExcellent.Service.Util.Request;
using bExcellent.Service.BusinessLogic.Goal;
using bExcellent.Service.Util.Response;

namespace bExcellent.Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Feedback" in code, svc and config file together.
    [ServiceContract(Name = "FeedbackService")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class FeedbackService : IFeedbackService
    {
        /// <summary>
        /// Gets the userdetails by mapping id.
        /// </summary>
        /// <param name="mappingid">The mappingid.</param>
        /// <returns></returns>
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
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetUserdetailsByMappingId", e.Message, 0);
            }
            return null;
        }

        /// <summary>
        /// Gets the feedback given count.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <param name="poeId">The poe id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetFeedbackGivenCount(int userId, int subscriptionid, int poeId)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();

                return feedbackBl.GetFeedbackGivenFull(userId, subscriptionid, poeId).Count;
                // UserAdmin userAdmin = new UserAdmin();
                //return userAdmin.GetGivenFeedBackCount(userId, poeId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(userId, "GetFeedbackGivenCount", e.Message, 0);
            } return 0;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="feedbackid"></param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int CheckAnswers(int feedbackid)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();

                return feedbackBl.CheckAnswers(feedbackid);
                // UserAdmin userAdmin = new UserAdmin();
                //return userAdmin.GetGivenFeedBackCount(userId, poeId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "CheckAnswers", e.Message, 0);
            } return 0;
        }

        /// <summary>
        /// Gets the given answer.
        /// </summary>
        /// <param name="feedbackId">The feedback id.</param>
        /// <param name="questionId">The question id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetGivenAnswer(int feedbackId, int questionId)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();

                return feedbackBl.GetGivenAnswer(feedbackId, questionId);

                // UserAdmin userAdmin = new UserAdmin();
                //return userAdmin.GetGivenFeedBackCount(userId, poeId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetGivenAnswer", e.Message, 0);
            } return 1;
        }

        /// <summary>
        /// Gets the feedback received count.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <param name="poeId">The poe id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetFeedbackReceivedCount(int userId, int subscriptionid, int poeId)
        {
            try
            {
                //   UserAdmin userAdmin = new UserAdmin();
                // return userAdmin.GetReceivedFeedback(userId, poeId, subscriptionid);
                FeedbackBL feedbackBl = new FeedbackBL();

                return feedbackBl.GetFeedbackRecevied(userId, subscriptionid, poeId).Count;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(userId, "GetFeedbackReceivedCount", e.Message, 0);
            } return 0;
        }

        /// <summary>
        /// Gets the POE intro.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public string GetPOEIntro(int poeid)
        {
            try
            {
                POEBL pobl = new POEBL();
                return pobl.GetPOEIntro(poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetPOEIntro", e.Message, 0);
            }
            return null;
        }

        /// <summary>
        /// Gets the module intro.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <param name="moduleId">The module id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public string GetModuleIntro(int poeid, int moduleId)
        {
            try
            {
                POEBL pobl = new POEBL();
                return pobl.GetModuleIntro(poeid, moduleId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetModuleIntro", e.Message, 0);
            }
            return null;
        }

        /// <summary>
        /// Gets the POE key action.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public string GetPOEKeyAction(int poeid)
        {
            try
            {
                POEBL pobl = new POEBL();
                return pobl.GetPOEKeyAction(poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetPOEKeyAction", e.Message, 0);
            }
            return null;
        }

        /// <summary>
        /// Gets the module key action.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <param name="moduleId">The module id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public string GetModuleKeyAction(int poeid, int moduleId)
        {
            try
            {
                POEBL pobl = new POEBL();
                return pobl.GetModuleKeyAction(poeid, moduleId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetModuleKeyAction", e.Message, 0);
            }
            return null;
        }

        /// <summary>
        /// Gets the practice area.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Module> GetPracticeArea(int poeid)
        {
            try
            {
                POEBL pobl = new POEBL();
                return pobl.GetPracticeArea(poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetPracticeArea", e.Message, 0);
            }
            return null;
        }

        /// <summary>
        /// Gets the questions.
        /// </summary>
        /// <param name="moduleId">The module id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Question> GetQuestions(int moduleId)
        {
            try
            {
                POEBL pobl = new POEBL();
                return pobl.GetQuestions(moduleId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetQuestions", e.Message, 0);
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Module> GetSurveyQuestions(int poeid)
        {
            try
            {
                POEBL pobl = new POEBL();
                return pobl.GetSurveyModules(poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetSurveyQuestions", e.Message, 0);
            }
            return null;
        }
        /// <summary>
        /// Gets the question count.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <param name="type">The type.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetQuestionCount(int poeid, int type)
        {
            try
            {
                POEBL pobl = new POEBL();
                return pobl.GetQuestionCount(poeid, type);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetQuestionCount", e.Message, 0);
            }
            return 0;
        }

        /// <summary>
        /// Gets the feedback history.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <param name="poeId">The poe id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetFeedbackHistory(int userId, int subscriptionid, int poeId)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();
                return feedbackBl.GetFeedbackHistory(userId, subscriptionid, poeId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(userId, "GetFeedbackHistory", e.Message, 0);
            }
            return null;
        }

        /// <summary>
        /// Gets the outstanding feedbacks.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <param name="poeId">The poe id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetOutstandingFeedbacks(int userId, int subscriptionid, int poeId)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();
                return feedbackBl.GetOutstandingFeedbacks(userId, subscriptionid, poeId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(userId, "GetOutstandingFeedbacks", e.Message, 0);
            }
            return null;
        }

        /// <summary>
        /// Gets the feedback given.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <param name="poeId">The poe id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetFeedbackGiven(int userId, int subscriptionid, int poeId)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();
                return feedbackBl.GetFeedbackGiven(userId, subscriptionid, poeId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(userId, "GetFeedbackGiven", e.Message, 0);
            }
            return null;
        }

        /// <summary>
        /// Gets the feedback recevied.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <param name="poeId">The poe id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetFeedbackRecevied(int userId, int subscriptionid, int poeId)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();
                return feedbackBl.GetFeedbackRecevied(userId, subscriptionid, poeId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(userId, "GetFeedbackRecevied", e.Message, 0);
            }
            return null;
        }

        /// <summary>
        /// Saves the POE result.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public bool SavePOEResult(List<SavePOEResultRequest> request)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();

                int index = 0;
                foreach (var req in request)
                {
                    feedbackBl.SaveResult(req, request.Count, index);
                    index++;
                }
                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "SavePOEResult", e.Message, 0);
            }
            return true;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool SaveDemographicResult(int userid, int poeid, int QuestionId, int feedbackid, string answer)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();
                feedbackBl.InsertUpdateUserDemographic(userid, poeid, QuestionId, feedbackid, answer);


                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(userid, "SaveDemographicResult", e.Message, 0);
            }
            return true;
        }
        /// <summary>
        /// Creates the feedback.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public List<CreatedFeedback> CreateFeedback(NewFeedbackRequest request)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();
                return feedbackBl.CreateFeedback(request);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "CreateFeedback", e.Message, 0);
            }

            return null;
        }

        /// <summary>
        /// Updates the feedback status.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public bool UpdateFeedbackStatus(SavePOEResultRequest request)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();
                feedbackBl.UpdateFeedbackStatus(request.FeedbackId, request.FeedbackStatus, request.Initials);
                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "UpdateFeedbackStatus", e.Message, 0);
            }
            return true;
        }

        /// <summary>
        /// Gets the last saved question.
        /// </summary>
        /// <param name="feedbackId">The feedback id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public SavedQuestion GetLastSavedQuestion(int feedbackId)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();

                return feedbackBl.GetLastSavedQuestion(feedbackId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetLastSavedQuestion", e.Message, 0);
            }
            return null;
        }

        /// <summary>
        /// Gets the feedback results.
        /// </summary>
        /// <param name="feedbackId">The feedback id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<SavePOEResultRequest> GetFeedbackResults(int feedbackId)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();

                return feedbackBl.GetFeedbackResults(feedbackId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetFeedbackResults", e.Message, 0);
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
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetFeedbacksByGroupId", e.Message, 0);
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
        public List<UserPOEMapping> GetTopMembers(string domain, int poeid, string userid)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();
                return feedbackBl.GetTopMembers(domain, poeid, userid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetTopMembers", e.Message, 0);
            }
            return null;
        }

        /// <summary>
        /// GetAllFeedbackDetails
        /// </summary>
        /// <param name="feedbacktype"></param>
        /// <param name="poeid"></param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<FeedbackDetail> GetAllFeedbackDetails(int feedbacktype, int poeid)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();

                return feedbackBl.GetAllFeedbackDetails(feedbacktype, poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetAllFeedbackDetails", e.Message, 0);
            }
            return null;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="feedbacktype"></param>
        /// <param name="poeid"></param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<ManagerFeedback> GetManagerReportDumb(int feedbacktype, int poeid)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();

                return feedbackBl.GetManagerReportDumb(feedbacktype, poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetManagerReportDumb", e.Message, 0);
            }
            return null;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="feedbackid"></param>
        /// <param name="poeid"></param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public DataDumbScore GetModuleScores(string feedbackid, int poeid)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();

                return feedbackBl.GetModuleScores(feedbackid, poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetModuleScores", e.Message, 0);
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public DataDumbScore GetCapabilityModuleScores(string feedbackid, int poeid)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();

                return feedbackBl.GetCapabilityModuleScores(feedbackid, poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetCapabilityModuleScores", e.Message, 0);
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserFeedback> GetTeamReportDumb(int feedbacktype, int poeid)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();

                return feedbackBl.GetTeamMberDumb(feedbacktype, poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetTeamReportDumb", e.Message, 0);
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void InsertUpdateUSerRating(int Userid, int Questionid, int Userrating, int feedbackid, int poeId)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();
                feedbackBl.InsertUpdateUSerRating(Userid, Questionid, Userrating, feedbackid, poeId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(Userid, "InsertUpdateUSerRating", e.Message, 0);
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetUserRatingByPoeId(int Userid, int Poeid, int questionid, int feedbackid)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();
                return feedbackBl.GetUserRatingByPoeId(Userid, Poeid, questionid, feedbackid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(Userid, "GetUserRatingByPoeId", e.Message, 0);
            }
            return 0;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetUserRatingByPoeIdUpdated(int Userid, int Poeid)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();
                return feedbackBl.GetUserRatingByPoeIdUpdated(Userid, Poeid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(Userid, "GetUserRatingByPoeIdUpdated", e.Message, 0);
            }
            return 0;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void UpdateFeedbackNotes(int Feedbackid, string subject, string notes, int Questionid)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();
                feedbackBl.UpdateFeedbackNotes(Feedbackid, subject, notes, Questionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "UpdateFeedbackNotes", e.Message, 0);
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Question> GetFbExperienceQuestions()
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();
                return feedbackBl.GetFbExperienceQuestions();
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "GetFbExperienceQuestions", e.Message, 0);
            }
            return null;
        }

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public void InsertFbExperience(List<SavePOEResultRequest> requests)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();
                foreach (var req in requests)
                {
                    feedbackBl.InsertFbExperience(req.UserId, req.FeedbackId, req.QuestionId, req.Answer);
                }
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "InsertFbExperience", e.Message, 0);
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<MentorDetail> GetPathfindersIds(int userId, int poeId, int type)
        {
            try
            {
                DashboardDataAccess dashboardda = new DashboardDataAccess();
                return dashboardda.GetPathfinderDetails(userId, poeId, type);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(userId, "GetPathfindersIds", e.Message, 0);
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void SaveSurveyResult(int feedbackId, int questionId, string answer, int poeid, int subQuestionId, int userid, bool isSubQuestion)
        {
            try
            {
                FeedbackBL survey = new FeedbackBL();
                survey.SaveSurveyResult(feedbackId, questionId, answer, poeid, subQuestionId, userid, isSubQuestion);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(userid, "SaveSurveyResult", e.Message, 0);
            }
           // return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Goals> GetDevPriorityQuestions(int UserId, int PoeId)
        {
            try
            {
                GoalDataAccess goal = new GoalDataAccess();
                return goal.GetDevPriorityQuestions(UserId, PoeId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(UserId, "GetDevPriorityQuestions", e.Message, 0);
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Goals> GetModuleQuestions(int UserId, int PoeId)
        {
            try
            {
                GoalDataAccess goal = new GoalDataAccess();
                return goal.GetModuleQuestions(UserId, PoeId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(UserId, "GetModuleQuestions", e.Message, 0);
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserSurvey> GetUserSurvey(int userId, int poeId)
        {
            try
            {
                FeedbackBL feedback = new FeedbackBL();
                return feedback.GetUserSurvey(userId, poeId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(userId, "GetUserSurvey", e.Message, 0);
            }
            return null;
        }
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool GetPoEResultMode(int userId,int poeId)
        {
            try
            {
                POEBL feedback = new POEBL();
                return feedback.GetPoEResultMode(userId, poeId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(userId, "GetPoEResultMode", e.Message, 0);
            }
            return false;
        }
        
    }
}