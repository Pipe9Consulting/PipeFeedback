using System;
using System.Collections.Generic;
using System.Web.Caching;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.CommonWCF;
using bExcellent.mvc.FeedbackWCF;

namespace bExcellent.mvc.Controllers
{
    public class ResultController : Controller
    {
        //
        // GET: /Result/

        [SessionExpireFilter]
        public ActionResult Result()
        {
            Session["CompletedFeedback"] = null;
            if (Session["id"] != null)
            {
                var commonWcfClient = new CommonWCF.CommonClient();

                commonWcfClient.CreateUpdateUserview(int.Parse(Session["id"].ToString()), "ResultPageVisit");

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
        public JsonResult GetUsersPoeByRole(int role, int tileclicked)
        {
            Session["role"] = tileclicked;
            if (Session["subid"] != null && Session["id"] != null)
            {
                var common = new CommonClient();
                var returnValue = common.GetUserPoeByRole(int.Parse(Session["id"].ToString()),
                                                          int.Parse(Session["subid"].ToString()), role);
                return JsonResponse(returnValue);
            }
            return null;
        }
        [SessionExpireFilter]
        public JsonResult SetTileClicked(int tileclicked)
        {
            Session["role"] = tileclicked;
            Session["Standing"] = null;
            return JsonResponse(tileclicked);
        }
        [SessionExpireFilter]
        public JsonResult GetUsersPoeByRoleAssignTile(int poeid)
        {
            var count = 0;
            if (Session["subid"] != null && Session["id"] != null)
            {
                if (Session["role"] == null)
                {
                    var common = new CommonClient();
                    var returnValue = common.GetUserPoeByRole(int.Parse(Session["id"].ToString()),
                                                              int.Parse(Session["subid"].ToString()), 1);
                    foreach (bExcellent.mvc.CommonWCF.POE poeVal in returnValue)
                    {
                        if (poeVal.POEId == poeid)
                        {
                            count = 1;
                        }
                    }
                    if (count == 0)
                    {
                        var returnValue1 = common.GetUserPoeByRole(int.Parse(Session["id"].ToString()),
                                                             int.Parse(Session["subid"].ToString()), 2);
                        foreach (bExcellent.mvc.CommonWCF.POE poeVal in returnValue1)
                        {
                            if (poeVal.POEId == poeid)
                            {
                                count = 2;
                            }
                        }
                    }
                    else if (count == 0)
                    {
                        var returnValue2 = common.GetUserPoeByRole(int.Parse(Session["id"].ToString()),
                                                             int.Parse(Session["subid"].ToString()), 3);
                        foreach (bExcellent.mvc.CommonWCF.POE poeVal in returnValue2)
                        {
                            if (poeVal.POEId == poeid)
                            {
                                count = 4;
                            }
                        }
                    }
                    else if (count == 0)
                    {
                        var returnValue3 = common.GetUserPoeByRole(int.Parse(Session["id"].ToString()),
                                                             int.Parse(Session["subid"].ToString()), 6);
                        foreach (bExcellent.mvc.CommonWCF.POE poeVal in returnValue3)
                        {
                            if (poeVal.POEId == poeid)
                            {
                                count = 5;
                            }
                        }
                    }
                    else if (count == 0)
                    {
                        var returnValue4 = common.GetUserPoeByRole(int.Parse(Session["id"].ToString()),
                                                             int.Parse(Session["subid"].ToString()), 4);
                        foreach (bExcellent.mvc.CommonWCF.POE poeVal in returnValue4)
                        {
                            if (poeVal.POEId == poeid)
                            {
                                count = 6;
                            }
                        }
                    }
                    else if (count == 0)
                    {
                        var returnValue5 = common.GetUserPoeByRole(int.Parse(Session["id"].ToString()),
                                                             int.Parse(Session["subid"].ToString()), 5);
                        foreach (bExcellent.mvc.CommonWCF.POE poeVal in returnValue5)
                        {
                            if (poeVal.POEId == poeid)
                            {
                                count = 7;
                            }
                        }
                    }
                }
                else
                {
                    count = int.Parse(Session["role"].ToString());
                }

                return JsonResponse(count);
            }
            return null;
        }


        [SessionExpireFilter]
        public void SetSelectedPoe(int poe)
        {
            Session["StandingPaContent"] = null;
            Session["SelectedPoe"] = poe;
            var email = Session["emailid"].ToString();
            //string domain = "%" + email.Substring(email.IndexOf('@'));
            //var common = new CommonClient();
            if (Session["subid"] != null && Session["id"] != null && Session["SelectedPoe"] != null)
            {
                //var returnValue = common.GetStandingData(int.Parse(Session["SelectedPoe"].ToString()),
                //                                     int.Parse(Session["id"].ToString()),
                //                                     int.Parse(Session["role"].ToString()),
                //                                     int.Parse(Session["subid"].ToString()), domain);

                Session["Standing"] = null;
                Session["PoeContentStanding"] = null;
            }
        }

        [SessionExpireFilter]
        public JsonResult LoadTileScore(int poe)
        {
            Session["SelectedPoe"] = poe;
            var email = Session["emailid"].ToString();
            string domain = "%" + email.Substring(email.IndexOf('@'));
            var common = new CommonClient();
            if (Session["subid"] != null && Session["id"] != null && Session["SelectedPoe"] != null)
            {
                var returnValue = common.GetStandingTileScore(int.Parse(Session["SelectedPoe"].ToString()),
                                                              int.Parse(Session["id"].ToString()),
                                                              int.Parse(Session["subid"].ToString()), domain);

                return JsonResponse(returnValue);
            }
            return null;
        }

         [SessionExpireFilter]
        public ActionResult BigPicture()
        {
            
            if (Session["id"] != null)
            {
             
            }
            return View();
        }

         [SessionExpireFilter]
        public ActionResult PracticeAreas()
        {
            
            if (Session["id"] != null)
            {

            }
            return View();
        }

         [SessionExpireFilter]
        public ActionResult ExcellenceActions()
        {
            
            if (Session["id"] != null)
            {

            }
            return View();
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
        public JsonResult GetClicked()
        {
            return JsonResponse(Session["role"]);
        }

    }
}
