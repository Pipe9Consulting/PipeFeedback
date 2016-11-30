using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Globalization;
using System.Web.Mvc;
using System.Web.Caching;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.CommonWCF;
using bExcellent.mvc.FeedbackWCF;
using bExcellent.mvc.SignUpWCF;
using System.Net;
using System.IO;
using Newtonsoft.Json;

namespace bExcellent.mvc.Controllers
{
    public class GoalController : Controller
    {
        //
        // GET: /Goal/

        /// <summary>
        /// Jsons the response.
        /// </summary>
        /// <param name="s">The s.</param>
        /// <returns></returns>
        private JsonResult JsonResponse(object s)
        {
            if (Request.RequestType == "GET")
                return Json(s, JsonRequestBehavior.AllowGet);
            return Json(s);
        }

         [SessionExpireFilter]
        public ActionResult Index()
        {

            return View();

        }


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
        public JsonResult GetPracticeAreaList(int? con = 0)
        {
            try
            {
                var feedback = new FeedbackServiceClient();
                // CommonController.Log(Session["id"].ToString() + "::" + "GetPracticeArea-IN");
                if (Session["SelectedPoe"] != null)
                {
                    var returnValue = feedback.GetModuleQuestions(Convert.ToInt32(Session["id"]), int.Parse(Session["SelectedPoe"].ToString()));

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
                    return GetPracticeAreaList(t);
                }
                else
                {
                    return null;
                }
            }
        }


        [SessionExpireFilter]
        public JsonResult GetDevPriorityQuestions()
        {
            
            var feedback = new FeedbackServiceClient();
            var returnValue = feedback.GetDevPriorityQuestions(Convert.ToInt32(Session["id"]), int.Parse(Session["SelectedPoe"].ToString()));

            return JsonResponse(returnValue);
        }

        [SessionExpireFilter]
        public void DeleteGoalDate(int questionId)
        {

            var common = new CommonClient();
            common.DeleteGoalDate(Convert.ToInt32(Session["id"]), int.Parse(Session["SelectedPoe"].ToString()), questionId);
        
        }


        [SessionExpireFilter]
        public JsonResult GetPoeName(int? poeid)
        {
            Session["SelectedPoe"] = poeid;
            var common = new CommonClient();
            var returnValue = common.GetPoeName(int.Parse(Session["SelectedPoe"].ToString()));

            return JsonResponse(returnValue.Replace("&", "").Replace(" ", ""));
        }

        [SessionExpireFilter]
        public JsonResult GetUsersPoeByRole(int type)
        {
            Session["type"] = type;
            var common = new CommonClient();
            if (Session["subid"] != null && Session["id"] != null && Session["type"] != null)
            {
                var returnValue = common.GetUserPoeByType(int.Parse(Session["id"].ToString()),
                                                          int.Parse(Session["subid"].ToString()),
                                                          int.Parse(Session["type"].ToString()));
                return JsonResponse(returnValue);
            }
            else
            {
                return null;
            }
        }

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


        //[SessionExpireFilter]
        //public JsonResult GetQuestionsList()
        //{
        //    try
        //    {
        //        // CommonController.Log(Session["id"].ToString() + "::" + "GetQuestions-IN");
        //        var feedback = new FeedbackServiceClient();
        //        var returnValue = feedback.GetModuleQuestions(Convert.ToInt32(Session["id"]),int.Parse(Session["SelectedPoe"].ToString()));
        //        // CommonController.Log(Session["id"].ToString() + "::" + "GetQuestions-OUT");
        //        return JsonResponse(returnValue);
        //    }
        //    catch (Exception e)
        //    {
                
        //    }
        //    return null;
        //}


        [SessionExpireFilter]
        public JsonResult GetUsersPoesArrangement(int poeid)
        {
            //Session["type"] = type;
            var common = new CommonClient();
            var countType = 0;
            if (Session["subid"] != null && Session["id"] != null)
            {
                var returnValue = common.GetUserPoeByType(int.Parse(Session["id"].ToString()),
                                                          int.Parse(Session["subid"].ToString()), 1);
                foreach (bExcellent.mvc.CommonWCF.POE poe in returnValue)
                {
                    if (poe.POEId == poeid)
                    {
                        countType = 1;
                    }
                }
                if (countType == 0)
                {
                    var returnValue1 = common.GetUserPoeByType(int.Parse(Session["id"].ToString()),
                                                                             int.Parse(Session["subid"].ToString()), 2);
                    foreach (bExcellent.mvc.CommonWCF.POE poe in returnValue1)
                    {
                        if (poe.POEId == poeid)
                        {
                            countType = 2;
                        }
                    }
                }
                Session["type"] = countType;
                return JsonResponse(countType);
            }
            else
            {
                return null;
            }
        }

        [SessionExpireFilter]
        public ActionResult SetGoals()
        {
            return View();
        }

        [SessionExpireFilter]
        public ActionResult TrackGoals()
        {
            return View();
        }

        public JsonResult GetTrackGoalTileScore()
        {
            var email = Session["emailid"].ToString();
            string domain = "%" + email.Substring(email.IndexOf('@'));
            var common = new CommonClient();
            var result = common.GetTrackTileScore(int.Parse(Session["SelectedPoe"].ToString()), int.Parse(Session["id"].ToString()), int.Parse(Session["subid"].ToString()), domain);
            return JsonResponse(result);
        }
        [SessionExpireFilter]
        public JsonResult GetNetworkUsers()
        {
            var common = new CommonClient();
            if (Session["type"] != null)
            {
                if (Session["subid"] != null && Session["id"] != null && Session["type"] != null && int.Parse(Session["type"].ToString()) == 1)
                {
                    var returnValue = common.GetMyManagersFeedback(int.Parse(Session["id"].ToString()),
                                                                int.Parse(Session["SelectedPoe"].ToString()),
                                                                int.Parse(Session["subid"].ToString()));
                    return JsonResponse(returnValue);
                }
                else if (Session["subid"] != null && Session["id"] != null && Session["type"] != null)
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
            else
            {
                return null;
            }
        }
        public JsonResult TrackModuleQuestions(int usermapping = 0,int type=0)
        {
            var email = Session["emailid"].ToString();
            string domain = "%" + email.Substring(email.IndexOf('@'));
            var common = new CommonClient();
            var result = common.TrackModuleQuestions(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()), int.Parse(Session["subid"].ToString()), domain, usermapping,type);  
            return JsonResponse(result);
        }
      
    }
}
