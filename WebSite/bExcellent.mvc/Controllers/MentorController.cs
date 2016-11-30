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
using CreatedFeedback = bExcellent.mvc.FeedbackWCF.CreatedFeedback;
using SignupRequest = bExcellent.mvc.SignUpWCF.SignupRequest;
using UserPOEMapping = bExcellent.mvc.SignUpWCF.UserPOEMapping;

namespace bExcellent.mvc.Controllers
{
    public class MentorController : Controller
    {
        //
        // GET: /Mentor/
         [SessionExpireFilter]
        public ActionResult Mentor()
        {
            if (Session["id"] != null)
            {
                var commonWcfClient = new CommonWCF.CommonClient();

                commonWcfClient.CreateUpdateUserview(int.Parse(Session["id"].ToString()), "MentorPageVisit");
             
            }
            return View();
        }
         [SessionExpireFilter]
        public ActionResult PotentialMentors()
        {
            if (Session["id"] != null)
            {
                var commonWcfClient = new CommonWCF.CommonClient();

                commonWcfClient.CreateUpdateUserview(int.Parse(Session["id"].ToString()), "MentorPageVisit");

            }
            return View();
        }
         [SessionExpireFilter]
        public ActionResult YourMentors()
        {
            if (Session["id"] != null)
            {
                var commonWcfClient = new CommonWCF.CommonClient();

                commonWcfClient.CreateUpdateUserview(int.Parse(Session["id"].ToString()), "MentorPageVisit");

            }
            return View();
        }
         [SessionExpireFilter]
        public ActionResult YourMentees()
        {
            if (Session["id"] != null)
            {
                var commonWcfClient = new CommonWCF.CommonClient();

                commonWcfClient.CreateUpdateUserview(int.Parse(Session["id"].ToString()), "MentorPageVisit");

            }
            return View();
        }


        private JsonResult JsonResponse(object s)
        {
            if (Request.RequestType == "GET")
                return Json(s, JsonRequestBehavior.AllowGet);
            return Json(s);
        }


        [SessionExpireFilter]
        public JsonResult GetUserRoles()
        {
            var common = new CommonClient();
            if (Session["subid"] != null && Session["id"] != null)
            {
                var returnValue = common.GetUserRoles(int.Parse(Session["id"].ToString()),
                                                      int.Parse(Session["subid"].ToString()));
                return JsonResponse(returnValue);
            }
            return null;
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
        public void SetSelectedPoe(int poe)
        {
            Session["SelectedPoe"] = poe;
            Session["ausermapid"] = null;
            Session["PoeContentStanding"] = null;

            Session["StandingPaContent"] = null;
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
        public JsonResult GetPoeName(int? poeid)
        {
            Session["SelectedPoe"] = poeid;
            var common = new CommonClient();
            var returnValue = common.GetPoeName(int.Parse(Session["SelectedPoe"].ToString()));

            return JsonResponse(returnValue.Replace("&", "").Replace(" ", ""));
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

        public JsonResult getPotentialMentors()
        {
            var common = new CommonClient();
            var email = Session["emailid"].ToString();
            string domain = "%" + email.Substring(email.IndexOf('@'));
            var potentialMentor = common.GetTopMembers(int.Parse(Session["SelectedPoe"].ToString()), int.Parse(Session["id"].ToString()), 1, domain);
            return JsonResponse(potentialMentor);
        }

        public JsonResult getYourMentors()
        {
            var feedback = new FeedbackServiceClient();
            var yourMentors = feedback.GetPathfindersIds(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()), 1).ToList();
            return JsonResponse(yourMentors);
        }

        public JsonResult getYourMentees()
        {
            var feedback = new FeedbackServiceClient();
            var yourMentors = feedback.GetPathfindersIds(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()), 2);
            return JsonResponse(yourMentors);
        }

        public JsonResult ConnectPostStanding(string useridslist, string subject, string comments, string moduleid)
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "ConnectPost-IN");
            string activitycontent = string.Empty;
            var suser = (bExcellent.mvc.SignUpWCF.User)Session["user"];
            activitycontent = "<div class='recieve' style='height:60px'></div>" + "<div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) + " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>Requested from " + suser.FirstName + " " + suser.LastName + " to connect</h2>" + "<p class='wallcomment'>" + comments + "</p><br/><br/>" + "<p class='wallcomment'>Email ID: " + suser.EmailAddress + "</p><br/>" + "<p class='wallcomment'>Job title: " + suser.JobTitle + "</p>";
            int poeid = int.Parse(Session["SelectedPoe"].ToString());
            var common = new CommonClient();
            common.CreateActivityForPathfinders(int.Parse(Session["id"].ToString()), useridslist, int.Parse(Session["subid"].ToString()), 3, activitycontent, poeid, int.Parse(moduleid));
            common.SendConnectMail(int.Parse(Session["id"].ToString()), useridslist, int.Parse(Session["SelectedPoe"].ToString()));
            // CommonController.Log(Session["id"].ToString() + "::" + "ConnectPost-OUT");
            return JsonResponse(1);
        }
        public JsonResult GetConnectHistory(string fromId, string forId)
        {
            var Common = new CommonClient();
            var connecthistory = Common.GetConnectHistory(fromId, forId);

            return JsonResponse(connecthistory);
        }
     
    }
}
