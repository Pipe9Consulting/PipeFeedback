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
        public ActionResult SelfFeedback()
        {
            Session["role"] = 1;
            Session["type"] = 1;
            CreateTakeFeedback();
            return View();
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
    }
}
