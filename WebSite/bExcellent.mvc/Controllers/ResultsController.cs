using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using bExcellent.mvc.FeedbackWCF;

namespace bExcellent.mvc.Controllers
{
    public class ResultsController : Controller
    {
        //
        // GET: /Results/

        public ActionResult Results()
        {
            Session["Standing"] = null;
            //Session["CompletedFeedback"] = 1;
            if (Session["CreatedFeedbacks"] != null)
            {
                var createdFeedback = (CreatedFeedback[])Session["CreatedFeedbacks"];
               // ViewBag.type = (createdFeedback[0].Teammember.JobTitle.ToLower() == "team member") ? 3 : 1;
                //createdFeedback[0].TeamUserMappingIdField
                //Session["role"] = (createdFeedback[0].UserMappingId!=0) ? 3 : 1;
                //Session["type"] = (createdFeedback[0].Teammember.JobTitle.ToLower() == "team member") ? 2 : 1;
               // ViewBag.feedbackid = createdFeedback[0].FeedBackId;
            }
            else
            {
                Session["role"] = null;
                Session["type"] = null;
                ViewBag.type = 0;
            }

            return View();
        }
    }
}
