using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.CommonWCF;

namespace bExcellent.mvc.Controllers
{
    public class SyncController : Controller
    {
        //
        // GET: /Sync/
        [SessionExpireFilter]
        public ActionResult Index()
        {
           
            return View();
        }

        public ActionResult SyncIndex()
        {
            return View();
        }

        [SessionExpireFilter]
        public ActionResult Sync(int? poeid, int? ftype)
        {
            Session["fbPoe"] = null;
            Session["ftype"] = null;
            Session["MoreClick"] = null;
            Session["DashboardMappingId"] = null;
            if (poeid != null)
            {
                Session["fbPoe"] = poeid;
            }
            if (ftype != null)
            {
                Session["ftype"] = ftype;
            }

            if (Session["id"] != null)
            {
                var commonWcfClient = new CommonWCF.CommonClient();

                commonWcfClient.CreateUpdateUserview(int.Parse(Session["id"].ToString()), "SyncPageVisit");
                commonWcfClient.UpdateManagerSync(int.Parse(Session["id"].ToString()));

            }

            return View();
        }

        [SessionExpireFilter]
        public ActionResult BigPicture(int? poeid, int? fid, int? ftype, string grpid, int? mapping)
        {
            if (fid != null)
            {
                Session["MoreClick"] = 1;
                Session["fbid"] = fid;
            }
            if (ftype != null)
            {
                //Session["MoreClick"] = 1;
                Session["type"] = ftype;
                Session["GrpID"] = grpid;
            }
            if (poeid != null)
            {
                Session["SelectedPoe"] = poeid;
            }
            if (mapping != null)
            {
                Session["DashboardMappingId"] = mapping;
            }
            return View();
        }

        [SessionExpireFilter]
        public ActionResult Digin()
        {
            return View();
        }

        [SessionExpireFilter]
        public ActionResult DigDeep()
        {
            return View();
        }

        [SessionExpireFilter]
        public ActionResult DigDeeper()
        {
            return View();
        }

        [SessionExpireFilter]
        public ActionResult PracticeAreas()
        {
            return View();
        }

        [SessionExpireFilter]
        public ActionResult ExcellenceIndicators()
        {
            return View();
        }

        [SessionExpireFilter]
        public ActionResult TrackGoals(int? type)
        {
            if (type != null)
            {
                Session["type"] = type;
            }
            return View();
        }

        [SessionExpireFilter]
        public ActionResult SyncDigDeeper(int? fid, int? ftype, int? poeid)
        {
            Session["fbid"] = null;
            Session["type"] = null;
            if (fid != null)
            {
                Session["fbid"] = fid;
            }
            if (ftype != null)
            {
                Session["type"] = ftype;
            }
            if (poeid != null)
            {
                Session["SelectedPoe"] = poeid;
            }

            //Session["fbid"] = fid;
            //Session["type"] = ftype;
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
        public void SetSelectedPoe(int poe)
        {
            Session["SelectedPoe"] = poe;
            Session["ausermapid"] = null;
            Session["PoeContentStanding"] = null;

            Session["StandingPaContent"] = null;
        }
        [SessionExpireFilter]
        public void SetSelectedType(int type)
        {
            Session["type"] = type;
        }
        [SessionExpireFilter]
        public JsonResult GetfbPoe()
        {
            if (Session["fbPoe"] != null)
            {
                Session["SelectedPoe"] = Session["fbPoe"];
                return JsonResponse(int.Parse(Session["fbPoe"].ToString()));
            }
            else if (Session["SelectedPoe"] != null)
            {
                return JsonResponse(int.Parse(Session["SelectedPoe"].ToString()));
            }
            else
            {
                return null;
            }
        }

        [SessionExpireFilter]
        public JsonResult Getfbtype()
        {
            if (Session["ftype"] != null)
            {
                Session["type"] = Session["ftype"];
                return JsonResponse(int.Parse(Session["ftype"].ToString()));
            }
            else
            {
                return JsonResponse(int.Parse(Session["type"].ToString()));
            }
        }
        [SessionExpireFilter]
        public JsonResult GetUsersPoe(int type)
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
        public JsonResult GetUsersPoesArrangement(int poeid)
        {
            //Session["type"] = type;
            var common = new CommonClient();
            var countType = 0;
            if (Session["subid"] != null && Session["id"] != null)
            {
                var returnValue = common.GetUserPoeByType(int.Parse(Session["id"].ToString()),
                                                          int.Parse(Session["subid"].ToString()), 1);
                foreach (POE poe in returnValue)
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
                    foreach (POE poe in returnValue1)
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
        public JsonResult GetMode()
        {
            var k = 0;
            if (Session["MoreClick"] != null)
            {
                k = 1;
            }
            return JsonResponse(k);
        }

        [SessionExpireFilter]
        public JsonResult GetNetworkUsers()
        {
            var common = new CommonClient();
            if (Session["type"] != null)
            {
                if (Session["subid"] != null && Session["id"] != null && Session["type"] != null && int.Parse(Session["type"].ToString()) == 1)
                {
                    var returnValue = common.GetMyReceiveFbTeam(int.Parse(Session["id"].ToString()),
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

        [SessionExpireFilter]
        public JsonResult GetNetworkUsersByFbid()
        {
            var common = new CommonClient();
            if (Session["type"] != null)
            {
                var userPoeMappings = new[] { common.GetUserDetailsByFbId(int.Parse(Session["fbid"].ToString())) };
                return JsonResponse(userPoeMappings);
            }
            else
                return null;
        }

        [SessionExpireFilter]
        public JsonResult GetSyncScore(int userMappingId)
        {
            Session["ausermapid"] = userMappingId;
            var common = new CommonClient();
            if (Session["subid"] != null && Session["id"] != null && Session["type"] != null)
            {
                var returnValue = common.GetSyncScores(int.Parse(Session["id"].ToString()),
                                                       int.Parse(Session["SelectedPoe"].ToString()),
                                                       int.Parse(Session["subid"].ToString()), userMappingId,
                                                       int.Parse(Session["type"].ToString()));
                return JsonResponse(returnValue);
                //return null;
            }
            else
            {
                return null;
            }
        }

        [SessionExpireFilter]
        public JsonResult GetSyncScoreOverall(int userMappingId)
        {
            Session["ausermapid"] = userMappingId;
            var common = new CommonClient();
            if (Session["subid"] != null && Session["id"] != null && Session["type"] != null)
            {
                var returnValue = common.GetSyncScoresOverall(int.Parse(Session["id"].ToString()),
                                                       int.Parse(Session["SelectedPoe"].ToString()),
                                                       int.Parse(Session["subid"].ToString()), userMappingId,
                                                       int.Parse(Session["type"].ToString()));

                return JsonResponse(returnValue);
                //return null;
            }
            else
            {
                return null;
            }
        }

        [SessionExpireFilter]
        public JsonResult GetSyncScoreByFbId(int userMappingId)
        {
            Session["ausermapid"] = userMappingId;
            var common = new CommonClient();
            if (Session["GrpID"] != null && Session["subid"] != null && Session["id"] != null && Session["type"] != null)
            {
                var returnValue = common.GetSyncTeamScore(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()), int.Parse(Session["subid"].ToString()), int.Parse(Session["type"].ToString()), Session["Grpid"].ToString(), userMappingId);
                return JsonResponse(returnValue);
            }
            else if (Session["subid"] != null && Session["id"] != null && Session["type"] != null)
            {
                var returnValue = common.GetSyncScoresByFbId(int.Parse(Session["id"].ToString()),
                                                           int.Parse(Session["SelectedPoe"].ToString()),
                                                           int.Parse(Session["subid"].ToString()), userMappingId,
                                                           int.Parse(Session["type"].ToString()), int.Parse(Session["fbid"].ToString()));
                return JsonResponse(returnValue);
            }
            else
            {
                return null;
            }
        }

        [SessionExpireFilter]
        public JsonResult GetSyncWcsiDiff()
        {
            var common = new CommonClient();
            if (Session["subid"] != null && Session["id"] != null && Session["SelectedPoe"] != null)
            {
                var returnValue = common.GetSyncWcsiDiff(int.Parse(Session["id"].ToString()),
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
        public JsonResult GetDigDeepSyncScore(int mappingid)
        {
            int userMappingId = 0;
            var common = new CommonClient();
            if (mappingid != 0)
            {
                userMappingId = mappingid;
            }
            else
            {
                if (Session["ausermapid"] != null)
                {
                    userMappingId = int.Parse(Session["ausermapid"].ToString());
                }
                else if (Session["subid"] != null && Session["id"] != null && Session["SelectedPoe"] != null)
                {
                    if (int.Parse(Session["type"].ToString()) == 2)
                    {
                        var returnValue = common.GetMyGiveFbTeam(int.Parse(Session["id"].ToString()),
                                                                 int.Parse(Session["SelectedPoe"].ToString()),
                                                                 int.Parse(Session["subid"].ToString()));
                        if (returnValue != null)
                        {
                            userMappingId = returnValue[0].UserPOEMappingId;
                        }
                    }
                    else
                    {
                        var rvalue = common.GetMyReceiveFbTeam(int.Parse(Session["id"].ToString()),
                                                               int.Parse(Session["SelectedPoe"].ToString()),
                                                               int.Parse(Session["subid"].ToString()));
                        if (rvalue != null)
                        {
                            userMappingId = rvalue[0].UserPOEMappingId;
                        }
                    }
                }
            }

            if (Session["subid"] != null && Session["id"] != null && Session["SelectedPoe"] != null && Session["subid"] != null && userMappingId != 0)
            {
                var returnValue = common.GetSyncScores(int.Parse(Session["id"].ToString()),
                                                       int.Parse(Session["SelectedPoe"].ToString()),
                                                       int.Parse(Session["subid"].ToString()), userMappingId,
                                                       int.Parse(Session["type"].ToString()));
                return JsonResponse(returnValue);
            }
            else
            {
                return null;
            }
        }

        [SessionExpireFilter]
        public JsonResult GetDigDeepSyncScoreByFbid()
        {
            int userMappingId = 0;
            var common = new CommonClient();
            if (Session["ausermapid"] != null)
            {
                userMappingId = int.Parse(Session["ausermapid"].ToString());
            }
            else if (Session["subid"] != null && Session["id"] != null && Session["SelectedPoe"] != null)
            {
                var rvalue = common.GetMyReceiveFbTeam(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()), int.Parse(Session["subid"].ToString()));
                if (rvalue != null && rvalue[0] != null)
                {
                    userMappingId = rvalue[0].UserPOEMappingId;
                }
            }
            if (Session["GrpID"] != null && Session["subid"] != null && Session["id"] != null && Session["type"] != null && Session["SelectedPoe"] != null)
            {
                var returnValue = common.GetSyncTeamScore(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()), int.Parse(Session["subid"].ToString()), int.Parse(Session["type"].ToString()), Session["Grpid"].ToString(), userMappingId);
                return JsonResponse(returnValue);
            }
            else if (Session["subid"] != null && Session["id"] != null && Session["type"] != null && Session["SelectedPoe"] != null && Session["fbid"] != null)
            {
                var returnValue = common.GetSyncScoresByFbId(int.Parse(Session["id"].ToString()),
                                                           int.Parse(Session["SelectedPoe"].ToString()),
                                                           int.Parse(Session["subid"].ToString()), userMappingId,
                                                           int.Parse(Session["type"].ToString()), int.Parse(Session["fbid"].ToString()));
                return JsonResponse(returnValue);
            }
            else
                return null;
        }

        [SessionExpireFilter]
        public JsonResult GetDigDeepUserInfo(int mappingids)
        {
            int userMappingId = 0;
            var common = new CommonClient();
            if (Session["ausermapid"] != null)
            {
                userMappingId = int.Parse(Session["ausermapid"].ToString());
            }
            else if (Session["subid"] != null && Session["id"] != null && Session["SelectedPoe"] != null)
            {
                if (int.Parse(Session["type"].ToString()) == 1)
                {
                    var rvalue = common.GetMyReceiveFbTeam(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()), int.Parse(Session["subid"].ToString()));
                    if (rvalue != null)
                    {
                        userMappingId = rvalue[0].UserPOEMappingId;
                    }
                }
                else
                {
                    var returnValue = common.GetMyGiveFbTeam(int.Parse(Session["id"].ToString()),
                                                                   int.Parse(Session["SelectedPoe"].ToString()),
                                                                   int.Parse(Session["subid"].ToString()));
                    if (returnValue != null)
                    {
                        userMappingId = returnValue[0].UserPOEMappingId;
                    }
                }
            }
            if (userMappingId != 0)
            {
                var userdetail = common.GetUserdetailsByMappingId(userMappingId);

                return JsonResponse(userdetail);
            }
            else
            {
                return null;
            }
        }

        [SessionExpireFilter]
        public JsonResult GetUserInfoByMappingId(int userMappingId)
        {
            var common = new CommonClient();
            var userdetail = common.GetUserdetailsByMappingId(userMappingId);

            return JsonResponse(userdetail);
        }

        [SessionExpireFilter]
        public JsonResult GetClicked()
        {
            return JsonResponse(Session["type"]);
        }
    }
}