using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.CommonWCF;
using bExcellent.mvc.FeedbackWCF;
using bExcellent.mvc.SignUpWCF;
using System.Net;
using System.IO;
using Newtonsoft.Json;
using System.Web;
using CreatedFeedback = bExcellent.mvc.FeedbackWCF.CreatedFeedback;
using SignupRequest = bExcellent.mvc.SignUpWCF.SignupRequest;
using UserPOEMapping = bExcellent.mvc.SignUpWCF.UserPOEMapping;

namespace bExcellent.mvc.Controllers
{
    public class FeedbackController : Controller
    {
        [SessionExpireFilter]
        public ActionResult Connect()
        {
            //CommonController.Log("Connect Page");
            return View();
        }

        [SessionExpireFilter]
        public ActionResult Goal()
        {
            return View();
        }

        [SessionExpireFilter]
        public ActionResult FeedbackTest()
        {
            return View();
        }

        /// <summary>
        /// Jsons the response.
        /// </summary>
        /// <param name="s">The s.</param>
        /// <returns></returns>
        private JsonResult JsonResponse(object s)
        {
            if (Request.RequestType == "GET")
                return Json(s, JsonRequestBehavior.AllowGet);
            else
                return Json(s);
        }

        [SessionExpireFilter]
        public ActionResult SetPoe(int poeid)
        {
            // CommonController.Log("Set POE In for Userid" + Session["id"].ToString());
            Session["SelectedPoe"] = poeid;
            // CommonController.Log("Set POE Out");
            return RedirectToAction("Feedback", "Feedback");
        }

        /// <summary>
        /// Gets the feedback given count.
        /// </summary>
        /// <param name="poeId">The poe id.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetFeedbackGivenCount()
        {
            //CommonController.Log("FB-Given--IN for Userid" + Session["id"].ToString());
            var feedback = new FeedbackServiceClient();
            if (Session["subid"] != null && Session["id"] != null)
            {
                var returnValue = feedback.GetFeedbackGivenCount(int.Parse(Session["id"].ToString()),
                                                                 int.Parse(Session["subid"].ToString()),
                                                                 int.Parse(Session["SelectedPoe"].ToString()));
                //CommonController.Log("FB-Given--OUT for Userid" + Session["id"].ToString());
                return JsonResponse(returnValue);
            }
            else
            {
                // CommonController.Log("FB-Given--SessionNull");
                return null;
            }
        }

        /// <summary>
        /// Gets the feedback received count.
        /// </summary>
        /// <param name="poeId">The poe id.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetFeedbackReceivedCount()
        {
            //CommonController.Log("FB-Receive--IN for Userid" + Session["id"].ToString());
            var feedback = new FeedbackServiceClient();
            if (Session["subid"] != null && Session["id"] != null && Session["SelectedPoe"] != null)
            {
                var returnValue = feedback.GetFeedbackReceivedCount(int.Parse(Session["id"].ToString()),
                                                                    int.Parse(Session["subid"].ToString()),
                                                                    int.Parse(Session["SelectedPoe"].ToString()));
                // CommonController.Log("FB-Receive--OUT for Userid" + Session["id"].ToString());
                return JsonResponse(returnValue);
            }
            else
            {
                //CommonController.Log("FB-Receive--SessionNull");
                return null;
            }
        }

        /// <summary>
        /// Gets the content of the poe into.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetPoeIntoContent(int? con = 0)
        {
            try
            {
                // CommonController.Log("GetPoeIntro-IN for Userid" + Session["id"].ToString());
                var feedback = new FeedbackServiceClient();
                if (Session["SelectedPoe"] != null)
                {
                    var returnValue = feedback.GetPOEIntro(int.Parse(Session["SelectedPoe"].ToString()));
                    // CommonController.Log("GetPoeIntro-OUT for Userid" + Session["id"].ToString());
                    return JsonResponse(returnValue);
                }
                else
                {
                    //CommonController.Log("GetPoeIntro-SessionNull");
                    return null;
                }
            }
            catch (Exception e)
            {
                var t = con + 1;
                if (t <= 2)
                {
                    return GetPoeIntoContent(t);
                }
                else
                {
                    return null;
                }
            }
        }

        /// <summary>
        /// Gets the content of the module into.
        /// </summary>
        /// <param name="moduleId">The module id.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetIntoContent(int moduleId, int? con = 0)
        {
            try
            {
                // CommonController.Log("GetIntroCont-IN for Userid" + Session["id"].ToString());
                bExcellent.mvc.FeedbackWCF.Module[] practiceArea = null;
                bExcellent.mvc.FeedbackWCF.Module moduleContent = null;
                if (Session["PracticeArea"] != null)
                {
                    practiceArea = (bExcellent.mvc.FeedbackWCF.Module[])Session["PracticeArea"];
                }
                else
                {
                    var feedback = new FeedbackServiceClient();
                    Session["PracticeArea"] = feedback.GetPracticeArea(int.Parse(Session["SelectedPoe"].ToString()));
                    practiceArea = (bExcellent.mvc.FeedbackWCF.Module[])Session["PracticeArea"];
                }
                moduleContent = practiceArea.Where(a => a.ModuleId == moduleId).SingleOrDefault();
                // CommonController.Log("GetIntroCont-OUT for Userid" + Session["id"].ToString());
                return JsonResponse(moduleContent);
            }
            catch (Exception e)
            {
                var t = con + 1;
                if (t <= 2)
                {
                    return GetIntoContent(moduleId, t);
                }
                else
                {
                    return null;
                }
            }
        }

        /// <summary>
        /// GetIntoContent By ModuleOrder
        /// </summary>
        /// <param name="moduleId"></param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetIntoContentByModuleOrder(int moduleId, int? con)
        {
            try
            {
                //CommonController.Log("GetIntroContBYModuleOrder-IN for Userid " + Session["id"].ToString());
                bExcellent.mvc.FeedbackWCF.Module[] practiceArea = null;
                bExcellent.mvc.FeedbackWCF.Module moduleContent = null;
                if (Session["PracticeArea"] != null)
                {
                    practiceArea = (bExcellent.mvc.FeedbackWCF.Module[])Session["PracticeArea"];
                }
                else
                {
                    var feedback = new FeedbackServiceClient();
                    Session["PracticeArea"] = feedback.GetPracticeArea(int.Parse(Session["SelectedPoe"].ToString()));
                    practiceArea = (bExcellent.mvc.FeedbackWCF.Module[])Session["PracticeArea"];
                }
                moduleContent = practiceArea.Where(a => a.ModuleOrderNumber == moduleId).SingleOrDefault();
                // CommonController.Log("GetIntroContBYModuleOrder-OUT for Userid " + Session["id"].ToString());
                return JsonResponse(moduleContent);
            }
            catch (Exception e)
            {
                var t = con + 1;
                if (t <= 2)
                {
                    return GetIntoContentByModuleOrder(moduleId, t);
                }
                else
                {
                    return null;
                }
            }
        }

        /// <summary>
        /// Gets the content of the module into.
        /// </summary>
        /// <param name="moduleId">The module id.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetModuleIntoContent(int moduleId, int? con = 0)
        {
            try
            {
                var feedback = new FeedbackServiceClient();
                // CommonController.Log(Session["id"].ToString() + "::" + "GetModuleIntoContent-IN");
                if (Session["SelectedPoe"] != null)
                {
                    var returnValue = feedback.GetModuleIntro(int.Parse(Session["SelectedPoe"].ToString()), moduleId);
                    // CommonController.Log(Session["id"].ToString() + "::" + "GetModuleIntoContent-OUT");
                    return JsonResponse(returnValue);
                }
                else
                {
                    //CommonController.Log("GetModuleIntoContent-SessionNull");
                    return null;
                }
            }
            catch (Exception e)
            {
                var t = con + 1;
                if (t <= 2)
                {
                    return GetModuleIntoContent(moduleId, t);
                }
                else
                {
                    return null;
                }
            }
        }

        /// <summary>
        /// Gets the poe key action.
        /// </summary>
        /// <param name="moduleId">The module id.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetPoeKeyAction(int moduleId, int? con)
        {
            try
            {
                var feedback = new FeedbackServiceClient();
                //CommonController.Log(Session["id"].ToString() + "::" + "GetPoeKeyAction-IN");
                if (Session["SelectedPoe"] != null)
                {
                    var returnValue = feedback.GetPOEKeyAction(int.Parse(Session["SelectedPoe"].ToString()));
                    // CommonController.Log(Session["id"].ToString() + "::" + "GetPoeKeyAction-OUT");
                    return JsonResponse(returnValue);
                }
                else
                {
                    //CommonController.Log(Session["id"].ToString() + "::" + "GetPoeKeyAction-SessionNull");
                    return null;
                }
            }
            catch (Exception e)
            {
                var t = con + 1;
                if (t <= 2)
                {
                    return GetPoeKeyAction(moduleId, t);
                }
                else
                {
                    return null;
                }
            }
        }

        /// <summary>
        /// Gets the module key action.
        /// </summary>
        /// <param name="moduleId">The module id.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetModuleKeyAction(int moduleId, int? con = 0)
        {
            try
            {
                var feedback = new FeedbackServiceClient();
                //CommonController.Log(Session["id"].ToString() + "::" + "GetModuleKeyAction-IN");
                if (Session["SelectedPoe"] != null)
                {
                    var returnValue = feedback.GetModuleKeyAction(int.Parse(Session["SelectedPoe"].ToString()), moduleId);
                    // CommonController.Log(Session["id"].ToString() + "::" + "GetModuleKeyAction-OUT");
                    return JsonResponse(returnValue);
                }
                else
                {
                    //CommonController.Log(Session["id"].ToString() + "::" + "GetModuleKeyAction-SessionNull");
                    return null;
                }
            }
            catch (Exception e)
            {
                var t = con + 1;
                if (t <= 2)
                {
                    return GetModuleKeyAction(moduleId, t);
                }
                else
                {
                    return null;
                }
            }
        }

        /// <summary>
        /// Gets the practice area.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetPracticeArea(int? con = 0)
        {
            try
            {
                var feedback = new FeedbackServiceClient();
                // CommonController.Log(Session["id"].ToString() + "::" + "GetPracticeArea-IN");
                if (Session["SelectedPoe"] != null)
                {
                    var returnValue = feedback.GetPracticeArea(int.Parse(Session["SelectedPoe"].ToString()));

                    if (Session["PracticeArea"] == null)
                    {
                        Session["PracticeArea"] = returnValue;
                    }
                    // CommonController.Log(Session["id"].ToString() + "::" + "GetPracticeArea-OUT");
                    return JsonResponse(returnValue);
                }
                else
                {
                    //CommonController.Log(Session["id"].ToString() + "::" + "GetPracticeArea-SessionNull");
                    return null;
                }
            }
            catch (Exception e)
            {
                var t = con + 1;
                if (t <= 2)
                {
                    return GetPracticeArea(t);
                }
                else
                {
                    return null;
                }
            }
        }
        [SessionExpireFilter]
        public JsonResult GetSurveyQuestions()
        {
            //try
            //{
            // CommonController.Log(Session["id"].ToString() + "::" + "GetQuestions-IN");
            GetSurveyAnswer();
            var poeId = int.Parse(Session["SelectedPoe"].ToString());
            var feedback = new FeedbackServiceClient();
            var returnValue = feedback.GetSurveyQuestions(poeId);
            // CommonController.Log(Session["id"].ToString() + "::" + "GetQuestions-OUT");
            return JsonResponse(returnValue);
            //}
            //catch (Exception e)
            //{
            //    return e;
            //}
        }
        /// <summary>
        /// Gets the questions.
        /// </summary>
        /// <param name="moduleId">The module id.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetQuestions(int moduleId, int? con = 0)
        {
            try
            {
                // CommonController.Log(Session["id"].ToString() + "::" + "GetQuestions-IN");
                var feedback = new FeedbackServiceClient();
                var returnValue = feedback.GetQuestions(moduleId);
                // CommonController.Log(Session["id"].ToString() + "::" + "GetQuestions-OUT");
                return JsonResponse(returnValue);
            }
            catch (Exception e)
            {
                var t = con + 1;
                if (t <= 2)
                {
                    return GetQuestions(moduleId, t);
                }
                else
                {
                    return null;
                }
            }
        }

        /// <summary>
        /// Gets the question count.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetQuestionCount(int type, int? con = 0)
        {
            try
            {
                // CommonController.Log(Session["id"].ToString() + "::" + "GetQuestionsCount-IN");
                var feedback = new FeedbackServiceClient();
                if (Session["SelectedPoe"] != null)
                {
                    var returnValue = feedback.GetQuestionCount(int.Parse(Session["SelectedPoe"].ToString()), type);
                    //CommonController.Log(Session["id"].ToString() + "::" + "GetQuestionsCount-OUT");
                    return JsonResponse(returnValue);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                var t = con + 1;
                if (t <= 2)
                {
                    return GetQuestionCount(type, t);
                }
                else
                {
                    return null;
                }
            }
        }

        /// <summary>
        /// Gets the last saved question.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetLastSavedQuestion(int? con = 0)
        {
            try
            {
                //CommonController.Log(Session["id"].ToString() + "::" + "GetLastSavedQuestion-IN");
                var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
                int feedbackId = createdFeedback[0].FeedBackId;
                var feedback = new FeedbackServiceClient();
                var returnValue = feedback.GetLastSavedQuestion(feedbackId);
                // CommonController.Log(Session["id"].ToString() + "::" + "GetLastSavedQuestion-OUT");
                return JsonResponse(returnValue);
            }
            catch (Exception e)
            {
                var t = con + 1;
                if (t <= 2)
                {
                    return GetLastSavedQuestion(t);
                }
                else
                {
                    return null;
                }
            }
        }
        [SessionExpireFilter]
        public JsonResult SaveDemographicResult(int questionId, string answer)
        {
            var feedback = new FeedbackServiceClient();
            int userid = int.Parse(Session["id"].ToString());
            int poeid = int.Parse((Session["SelectedPoe"].ToString()));
            var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
            var returnValue = feedback.SaveDemographicResult(userid, poeid, questionId,
                                                             createdFeedback.FirstOrDefault().FeedBackId, answer);
            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Saves the take POE result.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult SaveTakePOEResult(List<SavePOEResultRequest> request)
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "SaveTakePOEResult-IN");
            var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
            var feedback = new FeedbackServiceClient();
            foreach (SavePOEResultRequest savePOEResultRequest in request)
            {
                savePOEResultRequest.UserId = int.Parse((Session["id"].ToString()));
                savePOEResultRequest.FeedbackId = createdFeedback[0].FeedBackId;
                if (savePOEResultRequest.UserRating != 0)
                {
                    feedback.InsertUpdateUSerRating(Convert.ToInt32(Session["id"]), savePOEResultRequest.QuestionId, savePOEResultRequest.UserRating, savePOEResultRequest.FeedbackId, int.Parse(Session["SelectedPoe"].ToString()));
                }
            }


            var returnValue = feedback.SavePOEResult(request.ToArray());
            SaveResultInSession(request);

            //CommonController.Log(Session["id"].ToString() + "::" + "SaveTakePOEResult-OUT");
            return JsonResponse(returnValue);
        }

        public void UpdateFeedbackNotes(string Notes, int Questionid, string subject = "", int FeedbackId = 0)
        {
            if (FeedbackId == 0)
            {
                var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
                FeedbackId = createdFeedback[0].FeedBackId;
            }
            var feedback = new FeedbackServiceClient();
            feedback.UpdateFeedbackNotes(FeedbackId, subject, Notes, Questionid);
        }

        [SessionExpireFilter]
        public JsonResult SaveGoal(List<GoalShare> goalShares)
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "SaveGoal-IN");
            foreach (GoalShare goalShare in goalShares)
            {
                goalShare.UserId = int.Parse((Session["id"].ToString()));
                goalShare.PoeId = int.Parse((Session["SelectedPoe"].ToString()));
                goalShare.SubId = int.Parse((Session["subid"].ToString()));
            }
            CommonClient common = new CommonClient();
            if (Session["subid"] != null && Session["id"] != null && Session["SelectedPoe"] != null)
            {
                common.SaveGoals(goalShares.ToArray());
                //CommonController.Log(Session["id"].ToString() + "::" + "SaveGoal-OUT");
                return JsonResponse(true);
            }
            else
            {
                // CommonController.Log(Session["id"].ToString() + "::" + "SaveGoal-SessionNull");
                return JsonResponse(false);
            }
        }

        [SessionExpireFilter]
        public void Assignpoe(List<AssignPoe> assignPoes)
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "SaveGoal-IN");
            var comm = new CommonClient();
            var common = new SignupClient();
            if (Session["emailid"] != null)
            {
                var ownsub = comm.GetOwnNetwork(Session["emailid"].ToString());
                if (ownsub != null)
                {
                    Session["subid"] = ownsub.Subscriptionid;
                    var network = common.GetNetworkById(ownsub.Subscriptionid);
                    Session["network"] = network;
                }

            }
            var sr = new SignupRequest();


            sr.User = (SignUpWCF.User)Session["user"];
            sr.Netwrok = (SignUpWCF.Network)Session["network"];
            sr.Payment = null;
            sr.Mode = 1;
            sr.Members = assignPoes.Select(assignPoe => new UserPOEMapping
                                                            {
                                                                User = new SignUpWCF.User() { EmailAddress = assignPoe.Emailid, UserId = assignPoe.UserId },
                                                                Designation = new SignUpWCF.Designation() { Level = assignPoe.DesignationId, Name = assignPoe.JobTitle },
                                                                POE = new SignUpWCF.POE() { POEId = int.Parse((Session["SelectedPoe"].ToString())) }
                                                            }).ToArray();
            sr.Poes = null;
            common.AssignPoeRecord(sr);
        }

        /// <summary>
        /// Saves the result in session.
        /// </summary>
        /// <param name="request">The request.</param>
        [SessionExpireFilter]
        public void SaveResultInSession(List<SavePOEResultRequest> request)
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "SaveResultInSession-IN");
            if (Session["saveResult"] == null)
            {
                Session["saveResult"] = request;
                //CommonController.Log(Session["id"].ToString() + "::" + "SaveResultInSession-OUT");
            }
            else
            {
                var savePOEResult = (List<SavePOEResultRequest>)Session["saveResult"];

                foreach (SavePOEResultRequest savePOEResultRequest in request)
                {
                    savePOEResult.Remove(savePOEResult.Where(a => a.QuestionId == savePOEResultRequest.QuestionId && a.FeedbackId == savePOEResultRequest.FeedbackId).SingleOrDefault());
                }
                foreach (SavePOEResultRequest savePOEResultRequest in request)
                {
                    savePOEResult.Add(savePOEResultRequest);
                }

                Session["saveResult"] = savePOEResult;
                // CommonController.Log(Session["id"].ToString() + "::" + "SaveResultInSession-OUT");
            }
        }

        /// <summary>
        /// Gets the given answer.
        /// </summary>
        /// <param name="feedbackId">The feedback id.</param>
        /// <param name="questionId">The question id.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetGivenAnswer(int feedbackId, int questionId)
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "GetGivenAnswer-IN");
            if (Session["saveResult"] != null)
            {
                if (feedbackId == 0)
                {
                    var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
                    feedbackId = createdFeedback[0].FeedBackId;
                }

                var savePOEResult = (List<SavePOEResultRequest>)Session["saveResult"];

                SavePOEResultRequest savePOEResultRequest = savePOEResult.Where(a => a.QuestionId == questionId && a.FeedbackId == feedbackId).SingleOrDefault();
                if (savePOEResultRequest != null)
                {
                    var returnValue = savePOEResultRequest;
                    //CommonController.Log(Session["id"].ToString() + "::" + "GetGivenAnswer-OUT");
                    return JsonResponse(returnValue);
                }
            }
            //CommonController.Log(Session["id"].ToString() + "::" + "GetGivenAnswer-SessionNull");
            return JsonResponse(0);
        }

        /// <summary>
        /// Gets the given Rating.
        /// </summary>
        /// <param name="feedbackId">The feedback id.</param>
        /// <param name="questionId">The question id.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetGivenRating(int feedbackId, int questionId)
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "GetGivenAnswer-IN");
            if (Session["saveResult"] != null)
            {
                if (feedbackId == 0)
                {
                    var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
                    feedbackId = createdFeedback[0].FeedBackId;
                }

                var savePOEResult = (List<SavePOEResultRequest>)Session["saveResult"];

                SavePOEResultRequest savePOEResultRequest = savePOEResult.Where(a => a.QuestionId == questionId && a.FeedbackId == feedbackId).SingleOrDefault();
                if (savePOEResultRequest != null)
                {
                    var returnValue = savePOEResultRequest.UserRating;
                    //CommonController.Log(Session["id"].ToString() + "::" + "GetGivenAnswer-OUT");
                    return JsonResponse(returnValue);
                }
            }
            //CommonController.Log(Session["id"].ToString() + "::" + "GetGivenAnswer-SessionNull");
            return JsonResponse(0);
        }

        [SessionExpireFilter]
        public JsonResult GetGivenNotes(int feedbackId, int questionId)
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "GetGivenAnswer-IN");
            if (Session["saveResult"] != null)
            {
                if (feedbackId == 0)
                {
                    var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
                    feedbackId = createdFeedback[0].FeedBackId;
                }

                var savePOEResult = (List<SavePOEResultRequest>)Session["saveResult"];

                SavePOEResultRequest savePOEResultRequest = savePOEResult.Where(a => a.QuestionId == questionId && a.FeedbackId == feedbackId).SingleOrDefault();
                if (savePOEResultRequest != null)
                {
                    var returnValue = savePOEResultRequest.Notes;
                    //CommonController.Log(Session["id"].ToString() + "::" + "GetGivenAnswer-OUT");
                    return JsonResponse(returnValue);
                }
            }
            //CommonController.Log(Session["id"].ToString() + "::" + "GetGivenAnswer-SessionNull");
            return JsonResponse("");
        }
        [SessionExpireFilter]
        public JsonResult GetSurveyAnswerByQuestionId(int questionid, int subQuestionId)
        {
            if (Session["SaveSurveyResult"] != null)
            {
                var survey = (List<UserSurvey>)Session["SaveSurveyResult"];
                var surveyans = survey.FirstOrDefault(a => a.QuestionId == questionid && a.SubQuestionId == subQuestionId);
                if (surveyans != null)
                {
                    var answer = surveyans.Answer;
                    int surveyValues = (int)Enum.Parse(typeof(SurveyAnswers), answer.Replace(" ", "_")) + 1;
                    return JsonResponse(surveyValues);
                }
                else
                {
                    return JsonResponse("0");
                }
            }
            else
            {
                return JsonResponse("0");
            }
        }
        [SessionExpireFilter]
        public void GetSurveyAnswer()
        {
            var feedback = new FeedbackServiceClient();
            var poeid = int.Parse(Session["SelectedPoe"].ToString());
            var surveyResult = feedback.GetUserSurvey(Convert.ToInt32(Session["id"]), poeid);
            if (surveyResult.Count() != 0)
            {
                Session["SaveSurveyResult"] = surveyResult.ToList();
            }
        }
        [SessionExpireFilter]
        public JsonResult SaveSurveyAnswer(int answer, int questionId, int subQuestionId)
        {
            var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
            var poeid = int.Parse(Session["SelectedPoe"].ToString());
            var feedback = new FeedbackServiceClient();
            bool isSubQuestion = subQuestionId != 0;
            string surveyanswers = ((SurveyAnswers)(answer - 1)).ToString().Replace("_", " ");
            feedback.SaveSurveyResult(createdFeedback[0].FeedBackId, questionId, surveyanswers, poeid, subQuestionId, Convert.ToInt32(Session["id"]), isSubQuestion);
            //CommonController.Log(Session["id"].ToString() + "::" + "GetGivenAnswer-SessionNull");
            SaveSurveyResultInSession(answer, questionId, subQuestionId);
            return JsonResponse("");
        }
        [SessionExpireFilter]
        public void SaveSurveyResultInSession(int answer, int questionId, int subQuestionId)
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "SaveResultInSession-IN");
            string surveyanswers = ((SurveyAnswers)(answer - 1)).ToString().Replace("_", " ");
            if (Session["SaveSurveyResult"] == null)
            {
                var surveyList = new List<UserSurvey>();
                var survey = new UserSurvey
                                 {
                                     QuestionId = questionId,
                                     Answer = surveyanswers,
                                     SubQuestionId = subQuestionId,
                                     IsSubQuestion = (subQuestionId != 0)
                                 };
                surveyList.Add(survey);
                Session["SaveSurveyResult"] = surveyList;
                //CommonController.Log(Session["id"].ToString() + "::" + "SaveResultInSession-OUT");
            }
            else
            {
                var savePOEResult = (List<UserSurvey>)Session["SaveSurveyResult"];
                savePOEResult.Remove(savePOEResult.Where(a => a.QuestionId == questionId && a.SubQuestionId == subQuestionId).SingleOrDefault());
                var survey = new UserSurvey
                {
                    QuestionId = questionId,
                    Answer = surveyanswers,
                    SubQuestionId = subQuestionId,
                    IsSubQuestion = (subQuestionId != 0)
                };
                savePOEResult.Add(survey);
                Session["SaveSurveyResult"] = savePOEResult;
                // CommonController.Log(Session["id"].ToString() + "::" + "SaveResultInSession-OUT");
            }
        }
        /// <summary>
        /// Gets the feedback results.
        /// </summary>
        /// <param name="feedbackId">The feedback id.</param>
        [SessionExpireFilter]
        public JsonResult GetCompletedFeedbackResults(int feedbackId)
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackResults-IN");
            var feedback = new FeedbackServiceClient();
            List<SavePOEResultRequest> savePOEResult = feedback.GetFeedbackResults(feedbackId).ToList();
            IDictionary<string, SavePOEResultRequest> result = savePOEResult.ToDictionary(i => i.QuestionId.ToString());
            Session["saveResult"] = savePOEResult;
            return JsonResponse(result);
            // CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackResults-OUT");
        }

        /// <summary>
        /// Gets the feedback results.
        /// </summary>
        /// <param name="feedbackId">The feedback id.</param>
        [SessionExpireFilter]
        public void GetFeedbackResults(int feedbackId)
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackResults-IN");
            var feedback = new FeedbackServiceClient();
            List<SavePOEResultRequest> savePOEResult = feedback.GetFeedbackResults(feedbackId).ToList();
            savePOEResult.ToDictionary(i => i.QuestionId);
            Session["saveResult"] = savePOEResult;
            // CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackResults-OUT");
        }

        /// <summary>
        /// Gets the feedback results.
        /// </summary>
        /// <param name="feedbackId">The feedback id.</param>
        [SessionExpireFilter]
        public void GetFeedbackResults(CreatedFeedback[] feedbackId)
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackResults(fbid)-IN");
            var feedback = new FeedbackServiceClient();
            var savePOEResult = new List<SavePOEResultRequest>();
            foreach (var i in feedbackId)
            {
                var result = feedback.GetFeedbackResults(i.FeedBackId).ToList();
                result.ForEach(x => savePOEResult.Add(x));
            }

            Session["saveResult"] = savePOEResult;
            //CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackResults(fbid)-OUT");
        }

        /// <summary>
        /// Saves the manager POE result.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult SaveManagerPOEResult(List<SavePOEResultRequest> request)
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "SaveManagerPOEResult-IN");
            FeedbackServiceClient feedback = new FeedbackServiceClient();
            foreach (SavePOEResultRequest savePOEResultRequest in request)
            {
                savePOEResultRequest.UserId = int.Parse((Session["id"].ToString()));
                if (savePOEResultRequest.UserRating != 0)
                {
                    feedback.InsertUpdateUSerRating(Convert.ToInt32(Session["id"]), savePOEResultRequest.QuestionId, savePOEResultRequest.UserRating, savePOEResultRequest.FeedbackId, int.Parse(Session["SelectedPoe"].ToString()));
                }
            }

            var returnValue = feedback.SavePOEResult(request.ToArray());
            SaveResultInSession(request);
            //CommonController.Log(Session["id"].ToString() + "::" + "SaveManagerPOEResult-OUT");
            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Managerfeedbacks the specified user ids.
        /// </summary>
        /// <param name="userIds">The user ids.</param>
        /// <returns></returns>
        //[SessionExpireFilter]
        //public ActionResult Managerfeedback(string userIds)
        //{
        //    //CommonController.Log(Session["id"].ToString() + "::" + "Managerfeedback-IN");
        //    if (!string.IsNullOrEmpty(userIds))
        //    {
        //        var splitUserIds = userIds.Split(',');
        //        var useridList = new int[splitUserIds.Length];
        //        var roleList = new int[splitUserIds.Length];
        //        for (var i = 0; i < splitUserIds.Length; i++)
        //        {
        //            useridList[i] = int.Parse(splitUserIds[i].Split('_')[0]);
        //            roleList[i] = int.Parse(splitUserIds[i].Split('_')[1]);
        //        }
        //        //var userids = Array.ConvertAll(userIds.Split(','), new Converter<string, int>(int.Parse));
        //        //if (Session["positions"] != null)
        //        //{
        //        //    var position = Session["positions"].ToString();
        //        //var role = Array.ConvertAll(position.Split('%'), new Converter<string, int>(int.Parse));
        //        CreateManagerFeedback(useridList, roleList);
        //        //}
        //        //else
        //        //{
        //        //    return View("Feedback");
        //        //}
        //        // CommonController.Log(Session["id"].ToString() + "::" + "Managerfeedback-OUT");
        //    }

        //    return View();
        //}
        //Updated for the new welcome page development
        [SessionExpireFilter]
        public ActionResult Managerfeedback()
        {
            //if(Session["userIds"]!=null)
            //{

            //}

            //CommonController.Log(Session["id"].ToString() + "::" + "Managerfeedback-IN");
            if (Session["userIds"] != null)
            {
                string userIds = Session["userIds"].ToString();
                var splitUserIds = userIds.Split(',');
                var useridList = new int[splitUserIds.Length];
                var roleList = new int[splitUserIds.Length];
                for (var i = 0; i < splitUserIds.Length; i++)
                {
                    useridList[i] = int.Parse(splitUserIds[i].Split('_')[0]);
                    roleList[i] = int.Parse(splitUserIds[i].Split('_')[1]);
                }
                //var userids = Array.ConvertAll(userIds.Split(','), new Converter<string, int>(int.Parse));
                //if (Session["positions"] != null)
                //{
                //    var position = Session["positions"].ToString();
                //var role = Array.ConvertAll(position.Split('%'), new Converter<string, int>(int.Parse));
                Session["role"] = 3;
                Session["type"] = 2;
                CreateManagerFeedback(useridList, roleList);
                //}
                //else
                //{
                //    return View("Feedback");
                //}
                // CommonController.Log(Session["id"].ToString() + "::" + "Managerfeedback-OUT");
            }

            return View();
        }
        /// <summary>
        /// Creates the take feedback.
        /// </summary>
        [SessionExpireFilter]
        public void CreateTakeFeedback()
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "CreateTakeFeedback-IN");
            var request = new NewFeedbackRequest
                              {
                                  UserId = int.Parse(Session["id"].ToString()),
                                  PoeId = int.Parse(Session["SelectedPoe"].ToString()),
                                  FeedbackRole = new[] { 1 },
                                  FeedbackType = 1,
                                  IsGiveRequest = false
                              };
            CreateFeedback(request);
            // CommonController.Log(Session["id"].ToString() + "::" + "CreateTakeFeedback-OUT");
        }

        /// <summary>
        /// Creates the manager feedback.
        /// </summary>
        /// <param name="userids">The userids.</param>
        [SessionExpireFilter]
        public void CreateManagerFeedback(int[] userids, int[] roles)
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "CreateManagerFeedback-IN");
            var request = new NewFeedbackRequest
                              {
                                  UserId = int.Parse(Session["id"].ToString()),
                                  PoeId = int.Parse(Session["SelectedPoe"].ToString()),
                                  FeedbackRole = roles,
                                  FeedbackType = 2,
                                  IsGiveRequest = false,
                                  Members = userids
                              };

            CreateFeedback(request);
            // CommonController.Log(Session["id"].ToString() + "::" + "CreateManagerFeedback-OUT");
        }

        /// <summary>
        /// Creates the invite take feedback.
        /// </summary>
        /// <param name="userids">The userids.</param>
        [SessionExpireFilter]
        public void CreateInviteTakeFeedback(int[] userids)
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "CreateInviteTakeFeedback-IN");
            var request = new NewFeedbackRequest
                              {
                                  UserId = int.Parse(Session["id"].ToString()),
                                  PoeId = int.Parse(Session["SelectedPoe"].ToString()),
                                  FeedbackRole = new[] { 2 },
                                  FeedbackType = 1,
                                  IsGiveRequest = true,
                                  Members = userids
                              };
            CreateFeedback(request);
            // CommonController.Log(Session["id"].ToString() + "::" + "CreateInviteTakeFeedback-OUT");
        }

        /// <summary>
        /// Creates the request manager feedback.
        /// </summary>
        /// <param name="userids">The userids.</param>
        [SessionExpireFilter]
        public void CreateRequestManagerFeedback(int[] userids, bool? email)
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "CreateRequestManagerFeedback-OUT");
            var request = new NewFeedbackRequest
                              {
                                  UserId = int.Parse(Session["id"].ToString()),
                                  PoeId = int.Parse(Session["SelectedPoe"].ToString()),
                                  FeedbackRole = new[] { 1 },
                                  FeedbackType = 2,
                                  IsGiveRequest = true,
                                  Members = userids,
                                  EmailMode = email != null && (bool)email
                              };

            CreateFeedback(request);
            // CommonController.Log(Session["id"].ToString() + "::" + "CreateRequestManagerFeedback-OUT");
        }

        [SessionExpireFilter]
        public void CreateFeedbackEmail(NewFeedbackRequest request, bool? email)
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "CreateFeedback-IN");
            if (Session["CreatedFeedbacks"] == null)
            {
                request.Subscriptionid = int.Parse(Session["subid"].ToString());
                var feedback = new FeedbackServiceClient();
                var retunValue = feedback.CreateFeedback(request);
                Session["CreatedFeedbacks"] = retunValue;
                //CommonController.Log(Session["id"].ToString() + "::" + "CreateFeedback-OUT");
            }
            else
            {
                // CommonController.Log(Session["id"].ToString() + "::" + "CreateFeedback-SessionNULL");
            }
        }

        /// <summary>
        /// Creates the feedback.
        /// </summary>
        /// <param name="request">The request.</param>
        [SessionExpireFilter]
        public void CreateFeedback(NewFeedbackRequest request)
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "CreateFeedback-IN");
            //Session["userIds"] = null;
            if (Session["CreatedFeedbacks"] == null)
            {
                request.Subscriptionid = int.Parse(Session["subid"].ToString());
                var feedback = new FeedbackServiceClient();
                var retunValue = feedback.CreateFeedback(request);
                Session["CreatedFeedbacks"] = retunValue;
                //CommonController.Log(Session["id"].ToString() + "::" + "CreateFeedback-OUT");
            }
            else
            {
                // CommonController.Log(Session["id"].ToString() + "::" + "CreateFeedback-SessionNULL");
            }
        }

        [SessionExpireFilter]
        public JsonResult LoadPosition(string member)
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "LoadPosition-IN");
            Session["positions"] = member;
            // CommonController.Log(Session["id"].ToString() + "::" + "LoadPosition-OUT");
            return JsonResponse(Session["positions"]);
        }

        /// <summary>
        /// Updates the feedback status.
        /// </summary>
        /// <param name="request">The request.</param>
        [SessionExpireFilter]
        public void UpdateFeedbackStatus(SavePOEResultRequest request, int? con = 0)
        {
            try
            {
                // CommonController.Log(Session["id"].ToString() + "::" + "UpdateFeedbackStatus-IN");
                var feedback = new FeedbackServiceClient();
                feedback.UpdateFeedbackStatus(request);
                // CommonController.Log(Session["id"].ToString() + "::" + "UpdateFeedbackStatus-OUT");
            }
            catch (Exception e)
            {
                var t = con + 1;
                if (t <= 2)
                {
                    UpdateFeedbackStatus(request, t);
                }
            }
        }

        /// <summary>
        /// Completes the take feedback.
        /// </summary>
        [SessionExpireFilter]
        public void CompleteTakeFeedback(string fbinitial = "")
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "CompleteTakeFeedback-IN");
            var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
            var Request = new SavePOEResultRequest { FeedbackId = createdFeedback[0].FeedBackId, FeedbackStatus = 2 };
            Request.Initials = fbinitial;
            UpdateFeedbackStatus(Request);
            Session["PracticeArea"] = null;
            Session["fbtype"] = 1;
            // CommonController.Log(Session["id"].ToString() + "::" + "CompleteTakeFeedback-OUT");
        }

        /// <summary>
        /// Completes the manager feedback.
        /// </summary>
        /// <param name="request">The request.</param>
        [SessionExpireFilter]
        public void CompleteManagerFeedback(List<SavePOEResultRequest> request)
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "CompleteManagerFeedback-IN");
            foreach (SavePOEResultRequest savePOEResultRequest in request)
            {
                savePOEResultRequest.FeedbackStatus = 2;
                UpdateFeedbackStatus(savePOEResultRequest);
            }
            Session["ConnectUsers"] = (CreatedFeedback[])Session["CreatedFeedbacks"];
            Session["PracticeArea"] = null;
            Session["fbtype"] = 2;
            //CommonController.Log(Session["id"].ToString() + "::" + "CompleteManagerFeedback-OUT");
        }

        [SessionExpireFilter]
        public JsonResult CheckTheCompletedFeedback(int currentmoduleOrder)
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "CheckTheCompletedFeedback-IN");
            var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
            var common = new CommonClient();
            var count = common.GetModuleCount(int.Parse(Session["SelectedPoe"].ToString()));//feedback.CheckAnswers(createdFeedback[0].FeedBackId);
            //var totalanswer = (currentmoduleOrder - 1) * count;
            //if (currentmoduleOrder > 2)
            //{
            //    totalanswer = ((currentmoduleOrder - 1) * 4) + (currentmoduleOrder - 2);
            //}
            if (count + 1 >= currentmoduleOrder)
            {
                // CommonController.Log(Session["id"].ToString() + "::" + "CheckTheCompletedFeedback-OUT");
                return JsonResponse("True");
            }
            else
            {
                // CommonController.Log(Session["id"].ToString() + "::" + "CheckTheCompletedFeedback-OUT");
                return JsonResponse("False");
            }
        }

        /// <summary>
        /// Gets the create feedbacks.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetCreateFeedbacks()
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "GetCreateFeedbacks-IN");
            var returnValue = (CreatedFeedback[])Session["CreatedFeedbacks"];
            // CommonController.Log(Session["id"].ToString() + "::" + "GetCreateFeedbacks-OUT");
            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Gets the feedback history.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetFeedbackHistory()
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackHistory-IN");
            var feedback = new FeedbackServiceClient();
            if (Session["subid"] != null && Session["id"] != null && Session["SelectedPoe"] != null)
            {
                var returnValue = feedback.GetFeedbackHistory(int.Parse(Session["id"].ToString()),
                                                              int.Parse(Session["subid"].ToString()),
                                                              int.Parse(Session["SelectedPoe"].ToString()));
                //CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackHistory-OUT");
                return JsonResponse(returnValue);
            }
            else
            {
                //CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackHistory-SessionNUll");
                return null;
            }
        }
        [SessionExpireFilter]
        public JsonResult GetFeedbackHistorys()
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackHistory-IN");
            var feedHistory = new FeedbackHistory();
            var feedback = new FeedbackServiceClient();
            if (Session["subid"] != null && Session["id"] != null && Session["SelectedPoe"] != null)
            {
                var completeHistory = feedback.GetFeedbackHistory(int.Parse(Session["id"].ToString()),
                                                              int.Parse(Session["subid"].ToString()),
                                                              int.Parse(Session["SelectedPoe"].ToString())).ToList();
                var incompleteHistory = feedback.GetOutstandingFeedbacks(int.Parse(Session["id"].ToString()),
                                                                  int.Parse(Session["subid"].ToString()),
                                                                  int.Parse(Session["SelectedPoe"].ToString())).ToList();
                var result = completeHistory.Concat(incompleteHistory);
                feedHistory.OverallFeedback = result.ToList();
                feedHistory.IncompletFeedback = incompleteHistory;
                //CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackHistory-OUT");
                return JsonResponse(feedHistory);
            }
            else
            {
                //CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackHistory-SessionNUll");
                return null;
            }
        }

        /// <summary>
        /// Gets the outstanding feedbacks.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetOutstandingFeedbacks()
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "GetOutstandingFeedbacks-IN");
            var feedback = new FeedbackServiceClient();
            if (Session["subid"] != null && Session["id"] != null && Session["SelectedPoe"] != null)
            {
                var returnValue = feedback.GetOutstandingFeedbacks(int.Parse(Session["id"].ToString()),
                                                                   int.Parse(Session["subid"].ToString()),
                                                                   int.Parse(Session["SelectedPoe"].ToString()));
                // CommonController.Log(Session["id"].ToString() + "::" + "GetOutstandingFeedbacks-OUT");
                return JsonResponse(returnValue);
            }
            else
            {
                // CommonController.Log(Session["id"].ToString() + "::" + "GetOutstandingFeedbacks-SessionNull");
                return null;
            }
        }

        /// <summary>
        /// Gets the feedback given.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetFeedbackGiven()
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackGiven-IN");
            var feedback = new FeedbackServiceClient();
            if (Session["subid"] != null && Session["id"] != null && Session["SelectedPoe"] != null)
            {
                var returnValue = feedback.GetFeedbackGiven(int.Parse(Session["id"].ToString()),
                                                            int.Parse(Session["subid"].ToString()),
                                                            int.Parse(Session["SelectedPoe"].ToString()));
                //CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackGiven-OUT");
                return JsonResponse(returnValue);
            }
            else
            {
                // CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackGiven-SessionNull");
                return null;
            }
        }

        /// <summary>
        /// Gets the feedback recevied.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetFeedbackRecevied()
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackRecevied-IN");
            var feedback = new FeedbackServiceClient();
            if (Session["subid"] != null && Session["id"] != null && Session["SelectedPoe"] != null)
            {
                var returnValue = feedback.GetFeedbackRecevied(int.Parse(Session["id"].ToString()),
                                                               int.Parse(Session["subid"].ToString()),
                                                               int.Parse(Session["SelectedPoe"].ToString()));
                // CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackRecevied-OUT");
                return JsonResponse(returnValue);
            }
            else
            {
                // CommonController.Log(Session["id"].ToString() + "::" + "GetFeedbackRecevied-Sessionnull");
                return null;
            }
        }

        /// <summary>
        /// Sends the invite to team.
        /// </summary>
        /// <param name="teamIds">The team ids.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult SendInviteToTeam(string teamIds)
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "SendInviteToTeam-IN");
            var userids = Array.ConvertAll(teamIds.Split(','), new Converter<string, int>(int.Parse));
            CreateInviteTakeFeedback(userids);
            Session["CreatedFeedbacks"] = null;
            // CommonController.Log(Session["id"].ToString() + "::" + "SendInviteToTeam-IN");
            return JsonResponse(userids);
        }

        /// <summary>
        /// Sends the request to manager.
        /// </summary>
        /// <param name="ids">The manager ids.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult SendRequest(string ids)
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "SendRequest-IN");
            var userids = Array.ConvertAll(ids.Split(','), new Converter<string, int>(int.Parse));

            CreateRequestManagerFeedback(userids, true);
            Session["CreatedFeedbacks"] = null;
            //CommonController.Log(Session["id"].ToString() + "::" + "SendRequest-OUT");
            return JsonResponse(userids);
        }

        [SessionExpireFilter]
        public JsonResult SendInviteToTeamEmailMode(string teamIds, bool email)
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "SendInviteToTeam-IN");
            var userids = Array.ConvertAll(teamIds.Split(','), new Converter<string, int>(int.Parse));
            CreateInviteTakeFeedback(userids);
            Session["CreatedFeedbacks"] = null;
            // CommonController.Log(Session["id"].ToString() + "::" + "SendInviteToTeam-IN");
            return JsonResponse(userids);
        }

        [SessionExpireFilter]
        public JsonResult SendRequestEmailMode(string ids, bool email)
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "SendRequest-IN");
            var userids = Array.ConvertAll(ids.Split(','), new Converter<string, int>(int.Parse));

            CreateRequestManagerFeedback(userids, email);
            Session["CreatedFeedbacks"] = null;
            //CommonController.Log(Session["id"].ToString() + "::" + "SendRequest-OUT");
            return JsonResponse(userids);
        }

        /// <summary>
        /// Starts the feedbak.
        /// </summary>
        /// <param name="feedbackid">The feedbackid.</param>
        /// <param name="feedbacktype">The feedbacktype.</param>
        /// <param name="feedbackfor">The feedbackfor.</param>
        /// <returns></returns>
        ///
        [SessionExpireFilter]
        public ActionResult ResumeFeedbak(int feedbackid, int feedbacktype, int feedbackfor, int status, int? poeid)
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "ResumeFeedbak-IN");
            Session["SelectedPoe"] = poeid;
            var user = new FeedbackWCF.UserPOEMapping();
            var feedback = new FeedbackServiceClient();
            user = feedback.GetUserdetailsByMappingId(feedbackfor);
            GetFeedbackResults(feedbackid);

            var createdFb = new CreatedFeedback[]
                                                          {
                                                              new CreatedFeedback
                                                                  {
                                                                      FeedBackId = feedbackid,
                                                                      Teammember = user,
                                                                  }
                                                          };
            Session["CreatedFeedbacks"] = createdFb;

            if (feedbacktype == 1)
            {
                // CommonController.Log(Session["id"].ToString() + "::" + "ResumeFeedbak-OUT");
                return RedirectToAction("Detailedview", "Feedback");
            }
            else
            {
                // CommonController.Log(Session["id"].ToString() + "::" + "ResumeFeedbak-OUT");
                return RedirectToAction("Managerfeedback", "Feedback");
            }
        }

        [SessionExpireFilter]
        public ActionResult ResumeManagerGrpFeedback(string groupid, int status)
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "ResumeManagerGrpFeedback-IN");
            var feedback = new FeedbackServiceClient();
            CreatedFeedback[] createdFb = feedback.GetFeedbacksByGroupId(groupid);
            Session["CreatedFeedbacks"] = createdFb;
            GetFeedbackResults(createdFb);
            // CommonController.Log(Session["id"].ToString() + "::" + "ResumeManagerGrpFeedback-OUT");
            return RedirectToAction("Managerfeedback", "Feedback");
        }

        /// <summary>
        /// Resumes the selffeedback.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public ActionResult ResumeSelffeedback()
        {
            return View();
        }

        /// <summary>
        /// Resumes the managerfeedback.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public ActionResult ResumeManagerfeedback()
        {
            return View();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public ActionResult RedirectWelcome(int? mode, string userIds)
        {
            Session["fbmode"] = mode;
            if (!string.IsNullOrEmpty(userIds))
            {
                Session["fbmode"] = 2;
                Session["userIds"] = userIds;
            }
            return RedirectToAction("Welcome", "Feedback");
        }
        /// <summary>
        /// Feedbacks this instance.
        /// </summary>
        /// <returns></returns>
        ///
        //[SessionExpireFilter]
        //public ActionResult Feedback(int? mode)
        //{
        //    // CommonController.Log(Session["id"].ToString() + "::" + "Feedback-View");
        //    Session["role"] = null;
        //    Session["type"] = null;
        //    var feedback = new CommonClient();
        //    if (mode != null && mode != 2)
        //    {
        //        Session["FeedbackPage"] = mode;

        //        var managerPoE = feedback.GetUserPoeManagerRole(int.Parse(Session["id"].ToString())).ToList();
        //        if (Session["SelectedPoe"] != null)
        //        {
        //            int poeid = int.Parse(Session["SelectedPoe"].ToString());
        //            if (managerPoE.Count(a => a.POEId == poeid) != 0)
        //            {
        //                Session["SelectedPoe"] = poeid;
        //            }
        //            else
        //            {
        //                Session["SelectedPoe"] = managerPoE.FirstOrDefault().POEId;
        //            }

        //        }
        //        else
        //        {
        //            Session["SelectedPoe"] = managerPoE.FirstOrDefault().POEId;
        //        }

        //    }
        //    else if (mode != null && mode != 1)
        //    {
        //        Session["FeedbackPage"] = null;
        //        var teampoe = feedback.GetUserPoeTeamRole(int.Parse(Session["id"].ToString())).ToList();
        //        if (Session["SelectedPoe"] != null)
        //        {
        //            int poeid = int.Parse(Session["SelectedPoe"].ToString());
        //            if (teampoe.Count(a => a.POEId == poeid) != 0)
        //            {
        //                Session["SelectedPoe"] = poeid;
        //            }
        //            else
        //            {
        //                Session["SelectedPoe"] = teampoe.FirstOrDefault().POEId;
        //            }

        //        }
        //        else
        //        {
        //            Session["SelectedPoe"] = teampoe.FirstOrDefault().POEId;
        //        }

        //        //Session["SelectedPoe"] = null;
        //    }
        //    Session["CreatedFeedbacks"] = null;
        //    Session["PracticeArea"] = null;
        //    if (TempData["fromstart"] == null)
        //        TempData["fromstart"] = 0;
        //    return View();
        //}

        [SessionExpireFilter]
        public ActionResult FeedbackStart()
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "FeedbackStart-View");
            if (TempData["fromstart"] == null)
                TempData["fromstart"] = 0;
            return View("Feedback");
        }

        /// <summary>
        /// Quickviews this instance.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public ActionResult Quickview()
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "Quickview-View");
            CreateTakeFeedback();
            return View();
        }

        /// <summary>
        /// Detailedviews this instance.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public ActionResult Detailedview()
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "Detailedview-View");
            Session["role"] = 1;
            Session["type"] = 1;
            CreateTakeFeedback();
            return View();
        }

        /// <summary>
        /// Customers feedback page.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public ActionResult CustomerFeedback()
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "CustomerFeedback-View");
            return View();
        }

        /// <summary>
        /// Peers  feedback page.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public ActionResult PeerFeedback()
        {
            return View();
        }

        /// <summary>
        /// Detailview for unsubscribed users.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public ActionResult unsubDetailview()
        {
            return View();
        }

        /// <summary>
        /// Manager feedback for unsubscribed users.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public ActionResult unsubManagerFeedback()
        {
            return View();
        }

        [SessionExpireFilter]
        public ActionResult CompletedFeedback(int? mode)
        {
            ////to be removed ////////////////////////////////////////////////////////////
            //Session["SelectedPoe"] = 13;
            //var user = new FeedbackWCF.UserPOEMapping();
            //var feedback = new FeedbackServiceClient();
            //user = feedback.GetUserdetailsByMappingId(553);
            //GetFeedbackResults(1748);

            //var createdFb = new CreatedFeedback[]
            //                {
            //                    new CreatedFeedback
            //                        {
            //                            FeedBackId = 1748,
            //                            Teammember = user,
            //                        }
            //                };
            //Session["CreatedFeedbacks"] = createdFb;
            //////////////////////////////////////////////////////////////////////
            //Session["Standing"] = null;
            //Session["CompletedFeedback"] = 1;
            //var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
            //ViewBag.type = (createdFeedback[0].Teammember.JobTitle.ToLower() == "team member") ? 1 : 2;
            //ViewBag.feedbackid = createdFeedback[0].FeedBackId;
            ViewBag.mode = mode;
            return View();
        }

        [SessionExpireFilter]
        public JsonResult LoadTeammembers()
        {
            var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
            return JsonResponse(createdFeedback);
        }

        /// <summary>
        /// Requesting the manager feedback.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public ActionResult ReqManagerFeedback()
        {
            return View();
        }
        [SessionExpireFilter]
        public ActionResult Welcome()
        {
            return View();
        }
        [SessionExpireFilter]
        public ActionResult FeedbackGuide()
        {
            return View();
        }
        [SessionExpireFilter]
        public JsonResult FbCompletionConnect(int moduleid = 0, int quesionid = 0)
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "FbCompletionConnect-IN");
            if (Session["fbtype"] != null)
            {
                bExcellent.mvc.FeedbackWCF.UserPOEMapping[] returnvalue = null;
                if (int.Parse(Session["fbtype"].ToString()) == 1)
                {
                    var email = Session["emailid"].ToString();
                    string domain = "%" + email.Substring(email.IndexOf('@'));
                    int poeid = int.Parse(Session["SelectedPoe"].ToString());
                    var feedback = new FeedbackServiceClient();
                    //Remove current user from list
                    returnvalue = feedback.GetTopMembers(domain, poeid, Session["id"].ToString());
                    if (returnvalue != null)
                    {
                        returnvalue = returnvalue.Where(a => a.User.EmailAddress != email).ToArray();
                    }
                    //CommonController.Log(Session["id"].ToString() + "::" + "FbCompletionConnect-OUT");
                }
                else
                {
                    var createdFeedbacks = (CreatedFeedback[])Session["ConnectUsers"];
                    Array.Resize(ref returnvalue, createdFeedbacks.Length);
                    for (int i = 0; i < createdFeedbacks.Length; i++)
                    {
                        returnvalue[i] = createdFeedbacks[i].Teammember;
                    }
                }
                // CommonController.Log(Session["id"].ToString() + "::" + "FbCompletionConnect-OUT");
                return JsonResponse(returnvalue);
            }
            else

                return null;
        }

        [SessionExpireFilter]
        public JsonResult GetConnectFbtyperesult()
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "GetConnectFbtyperesult-IN");
            if (Session["CreatedFeedbacks"] != null)
            {
                var feedback = new FeedbackServiceClient();
                var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
                int feedbackId = createdFeedback[0].FeedBackId;
                int fbtype = int.Parse(Session["fbtype"].ToString());
                var feedbacklist = new FeedbackCollections();
                feedbacklist.fbid = feedbackId;
                feedbacklist.fbtype = fbtype;
                feedbacklist.PoeId = int.Parse(Session["SelectedPoe"].ToString());
                if (fbtype == 2)
                {
                    var returnValue = feedback.GetFeedbackGiven(int.Parse(Session["id"].ToString()), int.Parse(Session["subid"].ToString()), int.Parse(Session["SelectedPoe"].ToString()));

                    feedbacklist.Grpid = returnValue[0].FeedbackDetails.GroupName;
                }
                else
                {
                    feedbacklist.Grpid = null;
                }
                if (createdFeedback.Count() <= 1)
                {
                    feedbacklist.group = false;
                }
                else
                {
                    feedbacklist.group = true;
                }
                // CommonController.Log(Session["id"].ToString() + "::" + "GetConnectFbtyperesult-OUT");
                return JsonResponse(feedbacklist);
            }
            else
            {
                return null;
            }
        }

        [SessionExpireFilter]
        public JsonResult GetConnectText()
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "GetConnectText-IN");
            if (int.Parse(Session["fbtype"].ToString()) == 1)
            {
                // CommonController.Log(Session["id"].ToString() + "::" + "GetConnectText-OUT");
                return JsonResponse("Pathfinders");
            }
            else
            {
                //CommonController.Log(Session["id"].ToString() + "::" + "GetConnectText-OUT");
                return JsonResponse("Team member/s");
            }
        }

        [SessionExpireFilter]
        public JsonResult GetConnectMembers(int type, int moduleid = 0, int quesionid = 0)
        {
            //CommonController.Log(Session["id"].ToString() + "::" + "GetConnectMembers-IN");
            bExcellent.mvc.FeedbackWCF.UserPOEMapping[] returnvalue = null;
            if (type == 1)
            {
                var email = Session["emailid"].ToString();
                string domain = "%" + email.Substring(email.IndexOf('@'));
                int poeid = int.Parse(Session["SelectedPoe"].ToString());
                var feedback = new FeedbackServiceClient();
                //Remove current user from list
                returnvalue = feedback.GetTopMembers(domain, poeid, Session["id"].ToString());
                if (returnvalue != null)
                {
                    returnvalue = returnvalue.Where(a => a.User.EmailAddress != email).ToArray();
                }
            }
            else
            {
                var createdFeedbacks = (CreatedFeedback[])Session["CreatedFeedbacks"];
                Array.Resize(ref returnvalue, createdFeedbacks.Length);
                for (int i = 0; i < createdFeedbacks.Length; i++)
                {
                    returnvalue[i] = createdFeedbacks[i].Teammember;
                }
            }
            // CommonController.Log(Session["id"].ToString() + "::" + "GetConnectMembers-OUT");
            return JsonResponse(returnvalue);
        }

        [HttpPost]
        [ValidateInputAttribute(false)]
        public void ConnectPost(string useridslist, string subject, string comments, string moduleid)
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "ConnectPost-IN");E:\Ravi - Projects\TFS\Bexcellent\Kessaku.v1\bExcellent\WebSite\bExcellent.mvc\Styles\KessakuStyles\client-carousel.css
            string activitycontent = string.Empty;
            var suser = (bExcellent.mvc.SignUpWCF.User)Session["user"];
            activitycontent = "<div class='recieve' style='height:60px'></div>" + "<div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) + " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>Requested from " + suser.FirstName + " " + suser.LastName + " to connect</h2>" + "<p class='wallcomment'>" + comments + "</p><br/><br/>" + "<p class='wallcomment'>Email ID: " + suser.EmailAddress + "</p>";
            int poeid = int.Parse(Session["SelectedPoe"].ToString());
            var common = new CommonClient();
            common.CreateActivityForPathfinders(int.Parse(Session["id"].ToString()), useridslist, int.Parse(Session["subid"].ToString()), 3, activitycontent, poeid, int.Parse(moduleid));
            common.SendConnectMail(int.Parse(Session["id"].ToString()), useridslist, int.Parse(Session["SelectedPoe"].ToString()));
            // CommonController.Log(Session["id"].ToString() + "::" + "ConnectPost-OUT");
        }

        public JsonResult ConnectPostStanding(string useridslist, string subject, string comments, string moduleid)
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "ConnectPost-IN");
            string activitycontent = string.Empty;
            var suser = (bExcellent.mvc.SignUpWCF.User)Session["user"];
            activitycontent = "<div class='recieve' style='height:60px'></div>" + "<div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) + " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>Requested from " + suser.FirstName + " " + suser.LastName + " to connect</h2>" + "<p class='wallcomment'>" + comments + "</p><br/><br/>" + "<p class='wallcomment'>Email ID: " + suser.EmailAddress + "</p>";
            int poeid = int.Parse(Session["SelectedPoe"].ToString());
            var common = new CommonClient();
            common.CreateActivityForPathfinders(int.Parse(Session["id"].ToString()), useridslist, int.Parse(Session["subid"].ToString()), 3, activitycontent, poeid, int.Parse(moduleid));
            common.SendConnectMail(int.Parse(Session["id"].ToString()), useridslist, int.Parse(Session["SelectedPoe"].ToString()));
            // CommonController.Log(Session["id"].ToString() + "::" + "ConnectPost-OUT");
            return JsonResponse(1);
        }

        public JsonResult GetGoal(int moduleid, int quesionid)
        {
            var common = new CommonClient();
            var poeGoals = common.GetMyGoals(int.Parse(Session["SelectedPoe"].ToString()), int.Parse(Session["id"].ToString())).ToList();
            var firstOrDefault = poeGoals.FirstOrDefault(a => a.ModuleId == moduleid);
            if (firstOrDefault != null)
            {
                var questionsGoal = firstOrDefault.QuestionsGoals.FirstOrDefault(a => a.QuestionId == quesionid);
                if (questionsGoal != null)
                {
                    var goal =
                        questionsGoal.SelectedGoalValue;
                    return JsonResponse(goal);
                }
                else
                    return JsonResponse(0);
            }
            else
                return JsonResponse(0);
        }

        public JsonResult GetUserRatingByPoeId(int questionid)
        {
            var feedback = new FeedbackServiceClient();
            var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
            int feedbackId = createdFeedback[0].FeedBackId;
            return JsonResponse(feedback.GetUserRatingByPoeId(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()), questionid, feedbackId));
        }
        public JsonResult GetUserRating()
        {
            var feedback = new FeedbackServiceClient();
            return JsonResponse(feedback.GetUserRatingByPoeIdUpdated(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString())));
        }
        [HttpGet]
        [SessionExpireFilter]
        public ActionResult DeleteIncompleteFeedback()
        {
            var common = new CommonClient();
            common.DeleteExistingFeedback(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()));
            return JsonResponse(true);
        }

        [SessionExpireFilter]
        public ActionResult YammerTest()
        {
            //var user = (SignUpWCF.User)Session["user"];
            //var token = user.YammerToken;
            //string html = string.Empty;
            //var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/messages/my_feed.json");
            //httpWebRequest.ContentType = "application/json";
            //httpWebRequest.Headers.Set("Authorization", "Bearer " + token);
            //httpWebRequest.Method = "GET";
            //var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            //using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            //{
            //    var json = streamReader.ReadToEnd();
            //    dynamic stuff = JsonConvert.DeserializeObject(json);
            //    foreach (var item in stuff)
            //    {
            //        foreach (var inneritem in item)
            //        {
            //            foreach (var messages in inneritem)
            //            {
            //                if (messages.GetType().Name == "JObject")
            //                {
            //                    if (messages.attachments != null && messages.attachments.Count > 0)
            //                    {
            //                        html += "<h1>"+ messages.title + "</h1>" + messages.attachments[0].inline_html ;
            //                    }
            //                }
            //            }
            //        }
            //    }
            //}
            //ViewBag.html = html;
            return View();
        }

        [SessionExpireFilter]
        public void ReportIssue(HttpPostedFileBase file1, string subject, string content)
        {
            var emailid = Session["emailid"].ToString();
            byte[] data = null;
            var path = string.Empty;
            if (file1 != null)
            {
                long numBytes = file1.ContentLength;
                Stream stream = file1.InputStream;
                BinaryReader br = new BinaryReader(stream);//converting the file to bytes inorder to pass it to web service.
                data = br.ReadBytes((int)numBytes);
                br.Close();
                path = file1.FileName;
            }

            var common = new CommonClient();
            common.ReportIssue(path, subject, content + "                   User id : " + Session["emailid"].ToString(), data, emailid);
        }

        [SessionExpireFilter]
        public JsonResult GetFbExperienceQuestions()
        {
            var feedback = new FeedbackServiceClient();
            return JsonResponse(feedback.GetFbExperienceQuestions());
        }

        [SessionExpireFilter]
        public void InsertFbExperience(List<SavePOEResultRequest> request)
        {
            var feedback = new FeedbackServiceClient();
            foreach (var item in request)
            {
                item.UserId = int.Parse(Session["id"].ToString());
            }
            feedback.InsertFbExperience(request.ToArray());
        }

        public void SetSessionRole(int feedbackid)
        {
            var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
            var selfeedback = createdFeedback.Where(i => i.FeedBackId == feedbackid).FirstOrDefault();
            if (selfeedback.Teammember.Designation.Name.ToString() == "Peer Team Member") { Session["role"] = 6; }
            else if (selfeedback.TeamUserMappingId == 0) { Session["role"] = 1; }
            else { Session["role"] = 3; }
        }
        [SessionExpireFilter]
        public JsonResult DeleteIncompleteFB(string feedbackId, int deleteMode)
        {
            var common = new CommonClient();
            common.DeleteIncompleteFB(feedbackId, deleteMode);
            return JsonResponse(1);
        }

        public ActionResult Feedback()
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "Feedback-View");       
            //if (TempData["fromstart"] == null)
            //    TempData["fromstart"] = 0;
            return View();
        }

    }

    public class FeedbackCollections
    {
        public int fbid { get; set; }

        public int fbtype { get; set; }

        public int PoeId { get; set; }

        public string Grpid { get; set; }

        public bool group { get; set; }
    }
    public class FeedbackHistory
    {
        public List<FeedbackWCF.UserPOEMapping> IncompletFeedback { get; set; }
        public List<FeedbackWCF.UserPOEMapping> OverallFeedback { get; set; }
    }
    enum SurveyAnswers
    {
        Not_applicable_to_my_Role = 0,
        Not_Confident = 1,
        Somewhat_Confident = 2,
        Confident = 3,
        very_Confident = 4

    };

}