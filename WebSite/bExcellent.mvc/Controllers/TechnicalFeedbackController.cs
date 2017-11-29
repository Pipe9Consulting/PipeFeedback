using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.FeedbackWCF;

namespace bExcellent.mvc.Controllers
{
    public class TechnicalFeedbackController : Controller
    {
        //
        // GET: /TechnicalFeedback/

        public ActionResult Index()
        {
            return View();
        }
        private JsonResult JsonResponse(object s)
        {
            if (Request.RequestType == "GET")
                return Json(s, JsonRequestBehavior.AllowGet);
            else
                return Json(s);
        }
        public ActionResult SelfFeedback()
        {
            Session["role"] = 1;
            Session["type"] = 1;
            CreateTakeFeedback();
            var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
            int feedbackId = createdFeedback[0].FeedBackId;
            var feedback = new FeedbackServiceClient();
            var returnValue = feedback.GetLastSavedQuestion(feedbackId);
            var selfFb=new bExcellent.mvc.Models.Feedback();
            selfFb.GetLastSavedQuestion = returnValue;
            return View(selfFb);
        }
        public ActionResult ManagerFeedback()
        {
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
                Session["role"] = 3;
                Session["type"] = 2;
                CreateManagerFeedback(useridList, roleList);
            }
            var mgrFeedback = new bExcellent.mvc.Models.Feedback();
            var teamList = (CreatedFeedback[])Session["CreatedFeedbacks"];
            mgrFeedback.TeamMebers = teamList.ToList();
            return View(mgrFeedback);
        }
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

        public ActionResult Welcome()
        {
            return View();
        }
        public ActionResult FeedbackGuide()
        {
            return View();
        }
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
        public JsonResult CompleteTakeFeedback(string fbinitial = "")
        {
            // CommonController.Log(Session["id"].ToString() + "::" + "CompleteTakeFeedback-IN");
            var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
            var Request = new SavePOEResultRequest { FeedbackId = createdFeedback[0].FeedBackId, FeedbackStatus = 2 };
            Request.Initials = fbinitial;
            UpdateFeedbackStatus(Request);
            Session["PracticeArea"] = null;
            Session["fbtype"] = 1;
            return JsonResponse(true);
            // CommonController.Log(Session["id"].ToString() + "::" + "CompleteTakeFeedback-OUT");
        }
        [SessionExpireFilter]
        public JsonResult CompleteManagerFeedback(List<SavePOEResultRequest> request)
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
            return JsonResponse(true);
            //CommonController.Log(Session["id"].ToString() + "::" + "CompleteManagerFeedback-OUT");
        }
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
    }
}
