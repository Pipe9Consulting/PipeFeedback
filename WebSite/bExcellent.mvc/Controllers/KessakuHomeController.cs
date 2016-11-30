using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.CommonWCF;

namespace bExcellent.mvc.Controllers
{
    public class KessakuHomeController : Controller
    {
        private JsonResult JsonResponse(object s)
        {
            if (Request.RequestType == "GET")
                return Json(s, JsonRequestBehavior.AllowGet);
            else
                return Json(s);
        }

        public ActionResult Home()
        {
            return View();
        }

        public ActionResult HomePage()
        {
            return View();
        }

        public ActionResult CloudAsCoach()
        {
            return View();
        }

        public ActionResult CloudSolutions()
        {
            return View();
        }

        public ActionResult Resources()
        {
            return View();
        }

        public ActionResult Pricing()
        {
            return View();
        }

        public ActionResult RequestADemo()
        {
            return View();
        }

        public ActionResult Videos()
        {
            return View();
        }

        public ActionResult Events()
        {
            return View();
        }

        public ActionResult DownloadableContent()
        {
            return View();
        }

        public ActionResult IsYourTeam()
        {
            return View();
        }

        public ActionResult PartialPage(string slice)
        {
            return View();
        }

        public JsonResult GetFormStatus()
        {
            return JsonResponse(Session["ContactUs"] != null);
        }

        [SessionExpireFilter]
        public JsonResult RequestDemo(string name, string mailid, string companyName, string phone, string message, int mode)
        {
            if (message == "@")
            {
                message = " ";
            }
            if (mode != 0)
            {
                Session["ContactUs"] = "1";
            }

            const string subject = "Request For Demo";
            var common = new CommonClient();
            var emailcontent = "<p>Name: " + name + "<p></br><p>Email Id: " + mailid +
                                  "</p></br><p>Company Name:" + companyName + "</p></br><p>Message: " + message +
                                  "</p></br><p>Phone:" + phone;
            common.SendPoePdfNotification(emailcontent, subject);
            return JsonResponse(1);
        }

       
        public JsonResult SendContactMail(string fname, string lname, string title, string mailid, string companyName, string message, string phone)
        {
            if (message == "@")
            {
                message = " ";
            }
            string subject = "Mail from Contact us";
            CommonClient common = new CommonClient();
            string emailcontent = "<p>First Name: " + fname + "<p></br><p>Last Name: " + lname + "<p></br><p>Title: " + title + "</p></br><p>Email Id: " + mailid +
                                  "</p></br><p>Company Name:" + companyName + "</p></br><p>Message: " + message +
                                  "</p></br><p>Phone:" + phone;
            //common.SendPoePdfNotification(emailcontent, subject);SendContactMails
            common.SendPoePdfNotification(emailcontent, subject);
            
            return JsonResponse(1);
        }
    }
}