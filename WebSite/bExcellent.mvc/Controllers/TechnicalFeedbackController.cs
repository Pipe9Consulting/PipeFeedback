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
            return View();
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
