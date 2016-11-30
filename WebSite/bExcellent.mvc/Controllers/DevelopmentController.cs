using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.CommonWCF;
using bExcellent.mvc.FeedbackWCF;
using bExcellent.mvc.SignUpWCF;

namespace bExcellent.mvc.Controllers
{
    public class DevelopmentController : Controller
    {
        public ActionResult Development()
        {
            Session["devProgress"] = null;
            Session["DevPriorities"] = null;
            var common = new CommonClient();
            common.UpdateDevlopmentPriorities(int.Parse(Session["id"].ToString()));
            return View();
        }
        [SessionExpireFilter]
        private JsonResult JsonResponse(object s)
        {
            if (Request.RequestType == "GET")
                return Json(s, JsonRequestBehavior.AllowGet);
            else
                return Json(s);
        }
        [SessionExpireFilter]
        public ActionResult Progress()
        {
            return View();
        }
        [SessionExpireFilter]
        public ActionResult Priorities()
        {
            return View();
        }
        [SessionExpireFilter]
        public void SetSelectedPoe(int poe,int capability)
        {
            Session["CapabilityMode"] = capability;
            Session["SelectedPoe"] = poe;

        }
        [SessionExpireFilter]
        public void SetUserMode(int mode)
        {
            Session["SelectedUserMode"] = mode;

        }
        [SessionExpireFilter]
        public JsonResult GetUserMode()
        {
            return JsonResponse(int.Parse(Session["SelectedUserMode"].ToString()));

        }
        [SessionExpireFilter]
        public JsonResult GetNetworkUsers(int type)
        {
            var common = new CommonClient();

            if (Session["subid"] != null && Session["id"] != null && type == 1)
            {
                var returnValue = common.GetMyReceiveFbTeam(int.Parse(Session["id"].ToString()),
                                                            int.Parse(Session["SelectedPoe"].ToString()),
                                                            int.Parse(Session["subid"].ToString()));
                return JsonResponse(returnValue);
            }
            else if (Session["subid"] != null && Session["id"] != null && type == 2)
            {
                var returnValue = common.GetMyGiveFbTeam(int.Parse(Session["id"].ToString()),
                                                         int.Parse(Session["SelectedPoe"].ToString()),
                                                         int.Parse(Session["subid"].ToString()));
                return JsonResponse(returnValue);
            }
            else
            {
                return null;
            }


        }
        [SessionExpireFilter]
        public JsonResult GetManagerDevPriorities(int tmMappingId)
        {
            var common = new CommonClient();

            if (Session["subid"] != null && Session["id"] != null)
            {
                var returnValue = common.GetManagerDevPriorities(int.Parse(Session["id"].ToString()),
                                                            int.Parse(Session["SelectedPoe"].ToString()),
                                                            tmMappingId);
                if (returnValue != null)
                {
                    Session["DevPriorities"] = returnValue;
                    //ProfileView();
                }
                else
                {
                    Session["DevPriorities"] = null;
                }
                return JsonResponse(returnValue);
            }
            else
            {
                return null;
            }


        }
        [SessionExpireFilter]
        public JsonResult GetSelfDevPriorities()
        {
            var common = new CommonClient();

            if (Session["subid"] != null && Session["id"] != null)
            {
                var returnValue = common.GetSelfDevPriorities(int.Parse(Session["id"].ToString()),
                                                            int.Parse(Session["SelectedPoe"].ToString()));
                if (returnValue != null)
                {
                    Session["DevPriorities"] = returnValue;
                    //ProfileView();
                }
                else
                {
                    Session["DevPriorities"] = null;
                }
                return JsonResponse(returnValue);
            }
            else
            {
                return null;
            }


        }
        [SessionExpireFilter]
        public JsonResult GetTMmemberGoalDate(int tmMappingId)
        {
            var common = new CommonClient();

            if (Session["subid"] != null && Session["id"] != null)
            {
                var returnValue = common.GetTeamGoalDate(int.Parse(Session["id"].ToString()),
                                                            int.Parse(Session["SelectedPoe"].ToString()),
                                                            tmMappingId);
                return JsonResponse(returnValue);
            }
            else
            {
                return null;
            }


        }
        [SessionExpireFilter]
        public JsonResult GetSelfGoalDate()
        {
            var common = new CommonClient();

            if (Session["subid"] != null && Session["id"] != null)
            {
                var returnValue = common.GetSelfGoalDate(int.Parse(Session["id"].ToString()),
                                                            int.Parse(Session["SelectedPoe"].ToString()));
                return JsonResponse(returnValue);
            }
            else
            {
                return null;
            }


        }
        [SessionExpireFilter]
        public JsonResult UpdateCoachDate(int tmid, string date)
        {
            var common = new CommonClient();

            if (Session["id"] != null)
            {
                common.UpdateGoalDate(tmid, Convert.ToDateTime(date));
                return JsonResponse(true);
            }
            else
            {
                return null;
            }


        }
        [SessionExpireFilter]
        public JsonResult GetSelectedPoe()
        {
            var common = new SignupClient();
            var returnValue = common.GetAllPoEs().FirstOrDefault(a => a.POEId == int.Parse(Session["SelectedPoe"].ToString()));
            return JsonResponse(returnValue);
        }
        [SessionExpireFilter]
        public JsonResult LoadManagerName()
        {
            var common = new CommonClient();
            if (Session["subid"] != null && Session["id"] != null)
            {
                var returnValue = common.GetMyReceiveFbTeam(int.Parse(Session["id"].ToString()),
                                                            int.Parse(Session["SelectedPoe"].ToString()),
                                                            int.Parse(Session["subid"].ToString()));
                var getManager = returnValue.ToList().FirstOrDefault(a => a.Designation.Level == 2);
                //SendRequestEmailMode(getManager.ToString(), false);
                return JsonResponse(getManager.User.FirstName + " " + getManager.User.LastName);
            }
            return JsonResponse(true);
        }
        [SessionExpireFilter]
        public JsonResult SendManagerFBRequest()
        {
            var common = new CommonClient();
            if (Session["subid"] != null && Session["id"] != null)
            {
                var returnValue = common.GetMyReceiveFbTeam(int.Parse(Session["id"].ToString()),
                                                            int.Parse(Session["SelectedPoe"].ToString()),
                                                            int.Parse(Session["subid"].ToString()));
                var getManager = returnValue.ToList().FirstOrDefault(a => a.Designation.Level == 2).UserPOEMappingId;
                SendRequestEmailMode(getManager.ToString(), false);
                return JsonResponse(returnValue);
            }
            return JsonResponse(true);
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
        public JsonResult ProfileView()
        {

            var feedback = new FeedbackServiceClient();
            if (Session["DevPriorities"] != null)
            {
                var profileviews = feedback.GetPracticeArea(int.Parse(Session["SelectedPoe"].ToString()));
                var devPriorities = (DevelopmentPriorities[])Session["DevPriorities"];
                foreach (var priorities in devPriorities)
                {
                    //var selectmodule = profileviews.FirstOrDefault(a => a.ModuleOrderNumber == priorities.ModuleOrder).Questions;
                    //var selectedQuestion =
                    //    selectmodule.FirstOrDefault(a => a.QuestionId == priorities.QuestionId);
                    profileviews[(priorities.ModuleOrder)].Questions.FirstOrDefault(a => a.QuestionId == priorities.QuestionId).IsBarrierQuestion = true;//[priorities.QuestionId].IsBarrierQuestion = true;
                    //selectedQuestion.IsBarrierQuestion = true;
                }
                return JsonResponse(profileviews);
            }

            return JsonResponse(null);
        }
        [SessionExpireFilter]
        public JsonResult GetPracticeArea()
        {
            var feedback = new FeedbackServiceClient();
            var profileviews = feedback.GetPracticeArea(int.Parse(Session["SelectedPoe"].ToString()));
            return JsonResponse(profileviews);
        }
        [SessionExpireFilter]
        public JsonResult GetTeamDevProgress(int tmid, int moduleid)
        {
            var common = new CommonClient();
            if (Session["devProgress"] == null || moduleid == 0)
            {
                var teamDevProgress = common.GetTeamDevProgress(int.Parse(Session["id"].ToString()),
                                                                int.Parse(Session["SelectedPoe"].ToString()), tmid);
                Session["devProgress"] = teamDevProgress;
                //if (moduleid!=0)
                //{
                //    teamDevProgress =(Results[])teamDevProgress.Where(a => a.ModuleId == moduleid);
                //}
                return JsonResponse(teamDevProgress);
            }
            else
            {
                var teamDevProgress = (Results[])Session["devProgress"];
                if (moduleid != 0)
                {
                    teamDevProgress = teamDevProgress.Where(a => a.ModuleId == moduleid).ToArray();
                }
                return JsonResponse(teamDevProgress);
            }

        }
        [SessionExpireFilter]
        public JsonResult GetManagerDevProgress(int tmid, int moduleid)
        {
            var common = new CommonClient();
            if (Session["devProgress"] == null || moduleid == 0)
            {
                var teamDevProgress = common.GetManagerDevProgress(int.Parse(Session["id"].ToString()),
                                                                int.Parse(Session["SelectedPoe"].ToString()), tmid);
                Session["devProgress"] = teamDevProgress;
                //if (moduleid != 0)
                //{
                //    teamDevProgress = (Results[])teamDevProgress.Where(a => a.ModuleId == moduleid);
                //}
                return JsonResponse(teamDevProgress);
            }
            else
            {
                var teamDevProgress = (Results[])Session["devProgress"];
                if (moduleid != 0)
                {
                    teamDevProgress = teamDevProgress.Where(a => a.ModuleId == moduleid).ToArray();
                }
                return JsonResponse(teamDevProgress);
            }

        }
        //[SessionExpireFilter]
        //public JsonResult GetTeamDevProgressByModule(int tmid)
        //{
        //    var common = new CommonClient();
        //    var teamDevProgress = common.GetTeamDevProgress(int.Parse(Session["id"].ToString()),
        //                                                    int.Parse(Session["SelectedPoe"].ToString()), tmid);
        //    Session["devProgress"] = teamDevProgress;
        //    return JsonResponse(teamDevProgress);
        //}
    }
}
