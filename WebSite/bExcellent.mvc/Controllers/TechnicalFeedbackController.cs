using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
    }
}
