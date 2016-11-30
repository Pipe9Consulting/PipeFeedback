using System;
using System.Collections.Generic;
using System.Web.Caching;
using System.Web.Mvc;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.CommonWCF;

namespace bExcellent.mvc.Controllers
{
    public class StandingController : Controller
    {
        //
        // GET: /Standing/
        [SessionExpireFilter]
        public ActionResult Standing()
        {

           // Session["role"] = null;
            Session["tileclicking"] = null;

            if (Session["id"] != null)
            {
                var commonWcfClient = new CommonWCF.CommonClient();
            
                commonWcfClient.CreateUpdateUserview(int.Parse(Session["id"].ToString()), "StandingPageVisit");
                
                
            }

            return View();
        }

        [SessionExpireFilter]
        public ActionResult BigPicture(int? type, int? mode)
        {
            if (type != null)
            {
                Session["role"] = type;
                Session["tileclicking"] = mode;
            }
            return View();
        }

        [SessionExpireFilter]
        public ActionResult PracticeAreas()
        {
            return View();
        }

        [SessionExpireFilter]
        public ActionResult StandingIndex()
        {
            return View();
        }

        [SessionExpireFilter]
        public ActionResult ExcellenceIndicators()
        {
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
        public JsonResult GetUserRolesByProfile()
        {
            var common = new CommonClient();
            if (Session["subid"] != null && Session["id"] != null)
            {
                var returnValue = common.GetUserRolesByProfile(int.Parse(Session["id"].ToString()),
                                                      int.Parse(Session["SelectedPoe"].ToString()));
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
        public JsonResult GetUsersPoeByRoleUpdated(int role, int tileclicked)
        {
            Session["role"] = tileclicked;
            if (Session["subid"] != null && Session["id"] != null)
            {
                var common = new CommonClient();
                var returnValue = common.GetMySubscribedPoeList(int.Parse(Session["id"].ToString()),
                                                                int.Parse(Session["subid"].ToString()));
                //var common = new CommonClient();
                //var returnValue = common.GetUserPoeByRoleUpdated(int.Parse(Session["id"].ToString()),role);
                return JsonResponse(returnValue);
            }
            return null;
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
                    foreach (POE poeVal in returnValue)
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
                        foreach (POE poeVal in returnValue1)
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
                        foreach (POE poeVal in returnValue2)
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
                        foreach (POE poeVal in returnValue3)
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
                        foreach (POE poeVal in returnValue4)
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
                        foreach (POE poeVal in returnValue5)
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
        public void SetSelectedPoe(int poe)
        {
            Session["StandingPaContent"] = null;
            Session["SelectedPoe"] = poe;
            var email = Session["emailid"].ToString();
            //string domain = "%" + email.Substring(email.IndexOf('@'));
           // var common = new CommonClient();
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
        public JsonResult GetPoeContent()
        {
            if (Session["PoeContentStanding"] == null)
            {
                var poeid = int.Parse(Session["SelectedPoe"].ToString());
                var common = new CommonClient();
                var returnValue = common.GetPoeContent(poeid);
                Session["PoeContentStanding"] = returnValue;
                return JsonResponse(returnValue);
            }
            return JsonResponse(Session["PoeContentStanding"]);
        }

        [SessionExpireFilter]
        public JsonResult GetStandingScore()
        {
            var email = Session["emailid"].ToString();
            string domain = "%" + email.Substring(email.IndexOf('@'));
            if (Session["Standing"] != null)
            {
                return JsonResponse(Session["Standing"]);
            }
            if (Session["subid"] != null && Session["id"] != null && Session["SelectedPoe"] != null && Session["role"] != null)
            {
                var common = new CommonClient();
                var returnValue = common.GetStandingData(int.Parse(Session["SelectedPoe"].ToString()), int.Parse(Session["id"].ToString()), int.Parse(Session["role"].ToString()), int.Parse(Session["subid"].ToString()), domain);
                Session["Standing"] = returnValue;
                return JsonResponse(returnValue);
            }
            return null;
        }

        [SessionExpireFilter]
        public JsonResult GetStandingPAContent()
        {
            if (Session["StandingPaContent"] == null)
            {
                var email = Session["emailid"].ToString();
                string domain = "%" + email.Substring(email.IndexOf('@'));
                var common = new CommonClient();
                bool cachemode = System.Web.HttpContext.Current.Cache["poeid" + Session["SelectedPoe"].ToString()] != null;

                //("poeid+" + Session["SelectedPoe"].ToString() + "") != null;
                var returnValue = common.GetStandingPAContent(int.Parse(Session["id"].ToString()),
                                                              int.Parse(Session["SelectedPoe"].ToString()),
                                                              int.Parse(Session["subid"].ToString()), domain, cachemode);

                Session["StandingPaContent"] = returnValue;
                if (!cachemode)
                {
                    System.Web.HttpContext.Current.Cache.Insert("poeid" + Session["SelectedPoe"].ToString(), returnValue.GetPracticeArea, null, DateTime.Now.AddMonths(2), TimeSpan.Zero);
                }
                else
                {
                    returnValue.GetPracticeArea = (Module[])System.Web.HttpContext.Current.Cache["poeid" + Session["SelectedPoe"].ToString()];
                }
                return JsonResponse(returnValue);
            }
            return JsonResponse(Session["StandingPaContent"]);
        }

        [SessionExpireFilter]
        public JsonResult GetClicked()
        {
            return JsonResponse(Session["role"]);
        }

        [SessionExpireFilter]
        public ActionResult Standing2()
        {
            return View();
        }
    }
}