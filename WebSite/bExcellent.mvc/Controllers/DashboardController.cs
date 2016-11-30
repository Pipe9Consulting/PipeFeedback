using System.Web.Mvc;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.CommonWCF;

namespace bExcellent.mvc.Controllers
{
    public class DashboardController : Controller
    {
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
        
            if (Session["id"] != null)
            {
              
            }
            return View();
        }



        [SessionExpireFilter]
        public ActionResult GetDashboard(int poeId)
        {
            Session["SelectedPoe"] = poeId;
            if (Session["id"] != null && Session["subid"] != null && Session["emailid"] != null)
            {
                var email = Session["emailid"].ToString();
                string domain = "%" + email.Substring(email.IndexOf('@'));
                var common = new CommonClient();
                var returnValue = common.GetDashBoard(int.Parse(Session["id"].ToString()), poeId, int.Parse(Session["subid"].ToString()), domain, 1);
                Session["tenure"] = returnValue.DashboardStanding.TenureForUser;
                return JsonResponse(returnValue);
            }
            return Redirect("~/");
        }

        [SessionExpireFilter]
        public ActionResult GetIndividualSharedGoalsCount(int sharedId)
        {
            if (Session["id"] != null && Session["SelectedPoe"] != null)
            {
                var email = Session["emailid"].ToString();
                string domain = "%" + email.Substring(email.IndexOf('@'));
                var common = new CommonClient();
                var returnValue = common.GetIndividualUserSharedGoals(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()), sharedId);
                return JsonResponse(returnValue);
            }
            return Redirect("~/");
        }

        [SessionExpireFilter]
        public JsonResult GetIndividualStandingScore(int managerId, int mappingid)
        {
            if (Session["id"] != null && Session["SelectedPoe"] != null)
            {
                Session["DashboardMappingId"] = mappingid;
                Session["type"] = 1;
                var common = new CommonClient();
                var returnValue = common.GetMyManagerScore(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()), managerId);
                return JsonResponse(returnValue);
            }
            return JsonResponse(null);
        }

        [SessionExpireFilter]
        public JsonResult GetRecognitionCount(int sharedid, int type)
        {
            if (Session["id"] != null && Session["SelectedPoe"] != null)
            {
                var common = new CommonClient();
                var returnValue = common.GetRecognitionCount(int.Parse(Session["id"].ToString()), sharedid, type);
                return JsonResponse(returnValue);
            }
            return JsonResponse(null);
        }

        [SessionExpireFilter]
        public ActionResult GetPathfinders(int type)
        {
            if (Session["SelectedPoe"] != null && Session["id"] != null)
            {
                var common = new CommonClient();
                var returnValue = common.GetPathfinders(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()), type);

                return JsonResponse(new DashboardModel
                                        {
                                            DashboardPathFinders = returnValue
                                        });
            }
            return Redirect("~/");
        }

        [SessionExpireFilter]
        public JsonResult GetFeedbackReceivedCount(int sharedid, int mappingId)
        {
            if (Session["id"] != null && Session["SelectedPoe"] != null)
            {
                //Session["GivenClick"] = 1;
                //Session["DashboardMappingId"] = mappingId;
                Session["type"] = 1;
                var common = new CommonClient();
                var returnValue = common.GetFeedbackReceivedCount(int.Parse(Session["id"].ToString()), sharedid, int.Parse(Session["subid"].ToString()), int.Parse(Session["SelectedPoe"].ToString()));
                return JsonResponse(returnValue);
            }
            return JsonResponse(null);
        }

        [SessionExpireFilter]
        public JsonResult GetFeedbackGivenCount(int sharedid, int mappingId)
        {
            if (Session["id"] != null && Session["SelectedPoe"] != null)
            {
                //Session["GivenClick"] = 1;
                //Session["DashboardMappingId"] = mappingId;
                Session["type"] = 2;
                var common = new CommonClient();
                var returnValue = common.GetFeedbackGivenCount(int.Parse(Session["id"].ToString()), sharedid, int.Parse(Session["subid"].ToString()), int.Parse(Session["SelectedPoe"].ToString()));
                return JsonResponse(returnValue);
            }
            return JsonResponse(null);
        }

        [SessionExpireFilter]
        public JsonResult RedirectTake(int mode)
        {
            Session["type"] = mode;
            Session["DashboardMappingId"] = null;
            return JsonResponse(null);
        }

        [SessionExpireFilter]
        public JsonResult RedirectTakeNew(int mode, int mappingid)
        {
            Session["type"] = mode;
            if (mappingid != 0)
            {
                Session["DashboardMappingId"] = mappingid;
            }
            else
            {
                Session["DashboardMappingId"] = null;
            }
            return JsonResponse(null);
        }

        [SessionExpireFilter]
        public ActionResult GetIndividualPathfindersCount(int moduleId, int type, int userId)
        {
            if (Session["SelectedPoe"] != null && Session["id"] != null)
            {
                var common = new CommonClient();
                var returnValue = common.GetIndividualPathfindersCount(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()), type, moduleId, userId);
                return JsonResponse(returnValue);
            }
            return Redirect("~/");
        }
    }
}