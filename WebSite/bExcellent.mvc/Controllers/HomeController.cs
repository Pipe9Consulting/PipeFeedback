using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.AuthenticationWCF;
using bExcellent.mvc.CommonWCF;
using bExcellent.mvc.FeedbackWCF;
using bExcellent.mvc.Models;
using bExcellent.mvc.SignUpWCF;
using CreatedFeedback = bExcellent.mvc.FeedbackWCF.CreatedFeedback;
using POE = bExcellent.mvc.SignUpWCF.POE;

//using bExcellent.mvc.PaypalSVC;

namespace bExcellent.mvc.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        /// <summary>
        /// Jsons the response.
        /// </summary>
        /// <param name="s">The s.</param>
        /// <returns></returns>
        private JsonResult JsonResponse(object s)
        {
            if (Request.RequestType == "GET")
                return Json(s, JsonRequestBehavior.AllowGet);
            else
                return Json(s);
        }

        //public JsonResult Notifications()
        //{
        //    if (Session["id"] != null)
        //    {
        //        var commonWcfClient = new CommonWCF.CommonClient();
        //        var notificationResult = commonWcfClient.GetUserNotifications(int.Parse(Session["id"].ToString()), int.Parse(Session["subid"].ToString()));
        //    }

        //    return JsonResponse();
        //}

        [SessionExpireFilter]
        public ActionResult Start()
        {
            if (Session["id"] != null)
            {
                var commonWcfClient = new CommonWCF.CommonClient();
                var notificationResult = commonWcfClient.GetUserNotifications(int.Parse(Session["id"].ToString()), int.Parse(Session["subid"].ToString()));
                ViewBag.notificationResult = notificationResult;

            }
            var common = new CommonClient();
            byte[] userImage = common.GetUserPhoto(int.Parse(Session["id"].ToString())).Photo;

            ViewBag.userImage = userImage;
            Session["DashboardMappingId"] = null;
            Session["GivenClick"] = null;
            return View();
        }

        public ActionResult PoeLibrary()
        {
            Session["Mode"] = 5;
            return View();
        }

        public JsonResult DashBoard()
        {
            var common = new CommonClient();
            var dashboard = common.GetDashBoardDetails(int.Parse(Session["id"].ToString()),
                                                       int.Parse(Session["subid"].ToString()), 4,
                                                       Session["domain"].ToString());
            dashboard.SyncDifference = common.GetSyncWcsiDiff((int.Parse(Session["id"].ToString())), 4,
                                                              int.Parse(Session["subid"].ToString()));
            return JsonResponse(dashboard);
        }

        public ActionResult TermsCondition()
        {
            return View();
        }

        [SessionExpireFilter]
        public ActionResult QuickStart()
        {
            TempData["fromstart"] = "1";
            return RedirectToAction("FeedbackStart", "Feedback");
        }

        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        [OutputCache(Duration = int.MaxValue)]
        public ActionResult Index()
        {
            return null;
        }

        [OutputCache(Duration = int.MaxValue)]
        public ActionResult AboutBexcellent()
        {
            return View();
        }

        [OutputCache(Duration = int.MaxValue)]
        public ActionResult CustomerStarsGuru()
        {
            return View();
        }

        [OutputCache(Duration = int.MaxValue)]
        public ActionResult FAQIndex()
        {
            return View();
        }

        [OutputCache(Duration = int.MaxValue)]
        public ActionResult HomeIndex()
        {
            return View();
        }

        [OutputCache(Duration = int.MaxValue)]
        public ActionResult MeetOurGurus()
        {
            return View();
        }

        [OutputCache(Duration = int.MaxValue)]
        public ActionResult PricingIndex()
        {
            return View();
        }

        [OutputCache(Duration = int.MaxValue)]
        public ActionResult Newsletter()
        {
            return View();
        }

        [OutputCache(Duration = int.MaxValue)]
        public ActionResult ContactUs()
        {
            return View();
        }

        /// <summary>
        /// Homes this instance.
        /// </summary>
        /// <returns></returns>
        [OutputCache(Duration = int.MaxValue)]
        public ActionResult Home()
        {
            if (Request.Cookies["redirectionval"] == null)
            {
                HttpCookie myCookie = new HttpCookie("redirectionval");
                myCookie.Value = "home";
                myCookie.Expires = DateTime.Now.AddDays(1d);
                Response.Cookies.Add(myCookie);
            }
            // Response.Cookies["redirectonsignout"].Value = "home";
            return View();
        }

        [SessionExpireFilter]
        public ActionResult Account()
        {
            return View();
        }

        [SessionExpireFilter]
        public ActionResult Landing()
        {
            return View();
        }

        [SessionExpireFilter]
        public ActionResult SelectNetwork()
        {
            return View();
        }

        /// <summary>
        /// Logins the specified guest.
        /// </summary>
        /// <param name="guest">The guest.</param>
        /// <param name="type">The type.</param>
        /// <param name="rfor">The rfor.</param>
        /// <param name="from">From.</param>
        /// <param name="fbid">The fbid.</param>
        /// <param name="poeid">The poeid.</param>
        /// <returns></returns>
        // [SessionExpireFilter]
        [HttpGet]
        public ActionResult Login(bool? guest, int? type, int? rfor, int? from, int? fbid, int? poeid, int? poemode, int? poeplan, string poeidstr)
        {
            POE[] subscribedPoes = (POE[])Session["SubscribedPoes"];
            POE[] selectedPoesPoes = (POE[])Session["SelectedPoes"];
            var mode = Session["Mode"];
            var plan = Session["paidOrTrial"];
            object yammercont = null;
            if (Session["YammerSignUp"] != null)
            {
                yammercont = Session["YammerSignUp"];
            }
            Session.Clear();
            ViewBag.errormsg = "";
            if (mode != null && int.Parse(mode.ToString()) != 0)
            {
                Session["SubscribedPoes"] = subscribedPoes;
                Session["SelectedPoes"] = selectedPoesPoes;
                Session["Mode"] = mode;
                Session["paidOrTrial"] = plan;
                Session["YammerSignUp"] = yammercont;
            }
            if (poemode != null)
            {
                Session["Mode"] = poemode;
                Session["paidOrTrial"] = poeplan == 1 ? "trial" : "paid";
                var common = new SignupClient();
                var poevalues = poeidstr.Split('$');
                var poelist = new POE[poevalues.Length];
                var returnValue = common.GetAllPoEs().OrderByDescending(a => a.POEId);
                for (int i = 0; i < poevalues.Length; i++)
                {
                    poelist[i] = returnValue.Where(a => a.POEId.Equals(int.Parse(poevalues[i]))).First();
                }
                Session["SubscribedPoes"] = poelist;
                Session["SelectedPoes"] = poelist;
            }
            // Session.Abandon();
            if (guest.HasValue)
            {
                var request = new LoginRequest
                                  {
                                      IsGuest = guest.GetValueOrDefault(),
                                      Type = type.GetValueOrDefault(),
                                      RequestFor = rfor.GetValueOrDefault(),
                                      RequestFrom = @from.GetValueOrDefault(),
                                      FeedbackId = fbid.GetValueOrDefault(),
                                      PoeId = poeid.GetValueOrDefault()
                                  };

                Session["request"] = request;
            }
            return View();
        }

        /// <summary>
        /// FAQs page.
        /// </summary>
        /// <returns></returns>

        public ActionResult FAQ()
        {
            return View();
        }

        /// <summary>
        /// Sign out page.
        /// </summary>
        /// <returns></returns>

        public ActionResult SignOut()
        {
            //Session["request"] = null;
            //Session["user"] = null;

            //ViewData["username"] = null;
            //Session["Uname"] = null;
            //Session["emailid"] = null;
            //Session["id"] = null;
            ////   SessSession["domain"]ion["subid"] = loggedinUser.Subscriptionid;
            //Session["domain"] = null;
            //Session.Abandon();
            Session.Clear();
            if (Request.Cookies["redirectionval"] != null)
            {
                Response.Cookies.Remove("redirectionval");
                HttpCookie myCookie = new HttpCookie("redirectionval");
                myCookie.Value = "home";
                myCookie.Expires = DateTime.Now.AddDays(1d);
                Response.Cookies.Add(myCookie);
            }
            return Redirect("~/Microsoft/Login");
        }

        /// <summary>
        /// Pricing page.
        /// </summary>
        /// <returns></returns>

        public ActionResult Pricing()
        {
            return View();
        }

        /// <summary>
        /// Customers  guru page.
        /// </summary>
        /// <returns></returns>

        public ActionResult CustomerGuru()
        {
            return View();
        }

        /// <summary>
        /// Videos page.
        /// </summary>
        /// <returns></returns>

        public ActionResult Video()
        {
            return View();
        }

        /// <summary>
        /// Checks out page.
        /// </summary>
        /// <param name="itemname">The itemname.</param>
        /// <param name="amount">The amount.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public ActionResult CheckOut(string itemname, double? amount)
        {
            return View();
        }

        /// <summary>
        /// Errors Message view.
        /// </summary>
        /// <returns></returns>

        public ActionResult ErrorMsg(string error)
        {
            ViewBag.Error = string.IsNullOrEmpty(error) ? string.Empty : error;
            return View();
        }

        [SessionExpireFilterHome]
        public JsonResult HomeSignUp(string mailid)
        {
            //   Session["HomeSignUp"] = mailid;
            // return JsonResponse(mailid);

            SignupClient common = new SignupClient();
            var result = common.CheckEmailId(mailid);
            if (!result)
            {
                Session["HomeSignUp"] = mailid;
            }
            return JsonResponse(result);
        }

        [SessionExpireFilterHome]
        public JsonResult GetPassword(string mailid)
        {
            var common = new CommonClient();
            var result = common.GetPasswordForUSer(mailid);

            return JsonResponse(result);
        }

        /// <summary>
        /// Reads the error message
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public ActionResult Read()
        {
            return RedirectToAction("ErrorMsg", "Home");
        }

        /// <summary>
        /// Login request.
        /// </summary>
        /// <returns></returns>
        // [SessionExpireFilter]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login()
        {
            var authentication = new AuthenticationClient();
            var email = Request.Form["emailid"];
            var password = Request.Form["password"];
            var checkbox = Request.Form["option"];
            string _username = email;
            string _password = password;
            ViewBag.errormsg = "";
            if (!string.IsNullOrEmpty(_username) && !string.IsNullOrEmpty(_password))
            {
                var returnValue = authentication.AuthenticateUser(_username, _password);

                var loggedinUser = returnValue.currentUser;

                if (returnValue.IsAuthenticated)
                {
                    if (Request.Cookies["redirectionval"] != null)
                    {
                        Response.Cookies.Remove("redirectionval");
                        HttpCookie myCookie = new HttpCookie("redirectionval");
                        myCookie.Value = "login";
                        myCookie.Expires = DateTime.Now.AddDays(1d);
                        Response.Cookies.Add(myCookie);
                    }
                    if (loggedinUser.LastLogin == null)
                    {
                        Session["FirstLogin"] = true;
                    }
                    else
                    {
                        Session["FirstLogin"] = false;
                    }
                    Session["StartPageMode"] = loggedinUser.StratPageMode;
                    var domain = loggedinUser.EmailAddress.Split('@')[1];
                    ViewBag.show = 0;
                    if ((checkbox == null && loggedinUser.LastLogin == null && loggedinUser.StratPageMode == 1) || (checkbox == null && domain.ToLower() == "microsoft.com" && loggedinUser.LastLogin == null))
                    {
                        Session["StartPageMode"] = 1;
                        ViewBag.show = 1;
                        ViewBag.username = _username;
                        ViewBag.password = _password;
                        Session["Password"] = _password;
                        if (Session["click"] != null)
                        {
                            ViewBag.errormsg = "Please read and accept Program Definitions";
                        }
                    }
                    else
                    {
                        Session["click"] = null;
                        authentication.UpdateUserLastLogin(loggedinUser.UserId);
                        return AuthenticatedUser(loggedinUser);
                    }
                }
                else
                {
                    ViewBag.errormsg = "Incorrect Email or Password";
                }
            }
            else
            {
                ViewBag.errormsg = "Please Enter Email and Password";
            }
            return View();
        }

        //  [SessionExpireFilter]
        public ActionResult YammerLogin()
        {
            AuthenticationClient authentication = new AuthenticationClient();
            var returnValue = authentication.AuthenticateUserWithUserName(TempData["yammeremail"].ToString());
            var loggedinUser = returnValue.user;
            return AuthenticatedUser(loggedinUser);
        }

        public void SetSelectNetwork(int id)
        {
            Session["subid"] = id;
            SignupClient common = new SignupClient();
            var network = common.GetNetworkById(id);
            Session["network"] = network;
        }

        private ActionResult AuthenticatedUser(AuthenticationWCF.User loggedinUser)
        {
            var trailPrd = int.Parse(ConfigurationManager.AppSettings["trailPrd"].ToString());
            var feedback = new FeedbackServiceClient();
            var common = new SignupClient();
            var suser = common.GetUserById(loggedinUser.UserId);
            Session["user"] = suser;
            var loggeduserName = loggedinUser.FirstName + " " + loggedinUser.LastName;
            ViewData["username"] = loggeduserName;
            Session["Uname"] = loggeduserName;
            Session["emailid"] = loggedinUser.EmailAddress;
            Session["id"] = loggedinUser.UserId;
            Session["domain"] = loggedinUser.EmailAddress.Split('@')[1];
            var request = (LoginRequest)Session["request"];
            var userSub = new CommonClient();
            var ownsub = userSub.GetMySubscription(Session["emailid"].ToString()).FirstOrDefault();
            if (request != null)
            {
                if (request.IsGuest)
                {
                    FeedbackWCF.UserPOEMapping user = new FeedbackWCF.UserPOEMapping();

                    user = feedback.GetUserdetailsByMappingId(request.RequestFor);
                    CreatedFeedback[] createdFb = new CreatedFeedback[]
                                                              {
                                                                  new CreatedFeedback
                                                                      {
                                                                          FeedBackId = request.FeedbackId,
                                                                          Teammember = user,
                                                                      }
                                                              };
                    Session["CreatedFeedbacks"] = createdFb;
                    Session["SelectedPoe"] = request.PoeId;
                    if (request.Type == 4)
                    {
                        return RedirectToAction("CustomerFeedback", "Feedback");
                    }
                    else
                    {
                        Session["errormsg"] = "You don't have the permission";
                        return RedirectToAction("Login", "Home");
                    }
                }
                else
                {
                    Session["errormsg"] = "You don't have the permission";
                    return RedirectToAction("Login", "Home");
                }
            }
            else
            {
                CommonClient commonnetwrok = new CommonClient();
                CommonWCF.Network networkresult =
                    commonnetwrok.GetDefaultUserSubscription(loggedinUser.EmailAddress);
                if (networkresult != null)
                {
                    SignUpWCF.Network network = common.GetNetworkById(networkresult.Subscriptionid);
                    if (network.Plan == 1)
                    {
                        //if (network.CreatedOn.AddDays(trailPrd) < DateTime.Now)
                        //{
                        //    if (network.EmailId == loggedinUser.EmailAddress)
                        //    {
                        //        return RedirectToAction("Account", "Home");
                        //    }
                        //    else
                        //    {
                        //        var userSubscription =
                        //            commonnetwrok.GetUserSubscriptions(loggedinUser.EmailAddress).FirstOrDefault
                        //                (
                        //                    a => a.Subscriptionid != networkresult.Subscriptionid);
                        //        if (userSubscription != null)
                        //        {
                        //            Session["subid"] = -1;// userSubscription.Subscriptionid;
                        //            Session["network"] = null;// userSubscription;
                        //            if (Session["Mode"] != null && int.Parse(Session["Mode"].ToString()) == 5 && ownsub != null && Session["SelectedPoes"] != null)
                        //            {
                        //                Session["subid"] = ownsub.Subscriptionid;
                        //                SetSelectNetwork(ownsub.Subscriptionid);
                        //                return RedirectToAction("AddMember", "Signup", new { task = "add", resource = "dd" });
                        //            }
                        //            else
                        //            {
                        //                Session["CartList"] = null;
                        //                return RedirectToAction("Start", "Home");
                        //                //Response.Redirect("/signup/new/Add");
                        //            }
                        //        }
                        //        else
                        //        {
                        //            Session["errormsg"] = "Your Account has been Inactive";
                        //            return RedirectToAction("Login", "Home");
                        //        }
                        //    }
                        //}
                        //else
                        //{
                        Session["subid"] = networkresult.Subscriptionid;
                        Session["network"] = network;
                        if (Session["Mode"] != null && int.Parse(Session["Mode"].ToString()) == 5 && ownsub != null && Session["SelectedPoes"] != null)
                        {
                            SetSelectNetwork(ownsub.Subscriptionid);
                            Session["subid"] = ownsub.Subscriptionid;

                            return RedirectToAction("AddMember", "Signup", new { task = "add", resource = "dd" });
                        }
                        else
                        {
                            Session["CartList"] = null;
                            return RedirectToAction("Start", "Home");
                            //Response.Redirect("/signup/new/Add");
                        }
                        // }
                    }
                    else
                    {
                        Session["subid"] = -1;// networkresult.Subscriptionid;
                        Session["network"] = null;// network;
                        if (Session["Mode"] != null && int.Parse(Session["Mode"].ToString()) == 5 && ownsub != null && Session["SelectedPoes"] != null)
                        {
                            SetSelectNetwork(ownsub.Subscriptionid);
                            Session["subid"] = ownsub.Subscriptionid;
                            Session["CartList"] = null;
                            return RedirectToAction("AddMember", "Signup", new { task = "add", resource = "dd" });
                        }
                        else
                        {
                            Session["CartList"] = null;
                            return RedirectToAction("Start", "Home");
                            //Response.Redirect("/signup/new/Add");
                        }
                    }
                }
                else
                {
                    Session["errormsg"] = "You don't have the permission";
                    return RedirectToAction("Login", "Home");
                }
            }

            /*    ViewData["fullname"] = ((AuthenticationResult)Session["UserDetail"]).currentUser.FirstName + " " +
                          ((AuthenticationResult)Session["UserDetail"]).currentUser.LastName;
                ViewData["userid"] = ((AuthenticationResult)Session["UserDetail"]).currentUser.UserId.ToString().Trim();
                return View("Default");*/
            //Response.Redirect("../client/Default.aspx");
        }

        [SessionExpireFilter]
        public void SendContactMail(string fname, string lname, string title, string mailid, string companyName, string message, string phone)
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
            common.SendPoePdfNotification(emailcontent, subject);
        }

        [AllowAnonymous]
        [HttpGet]
        public void SendNewsLetter(string fname, string lname, string title, string mailid, string companyName, string message, string phone)
        {
            string subject = " From newsletter video";
            CommonClient common = new CommonClient();
            string emailcontent = "<p>First Name: " + fname + "<p></br><p>Last Name: " + lname + "<p></br><p>Title: " + title + "</p></br><p>Email Id: " + mailid +
                                  "</p></br><p>Company Name:" + companyName + "</p></br><p>Message: " + message +
                                  "</p></br><p>Phone:" + phone;
            common.SendPoePdfNotification(emailcontent, subject);
        }

        public void SendVideosMail(string fname, string lname, string title, string mailid, string companyName, string message, string phone, string subject)
        {
            // string subject = "Mail from Contact us";
            if (message == "@")
            {
                message = " ";
            }
            CommonClient common = new CommonClient();
            string emailcontent = "<p>First Name: " + fname + "<p></br><p>Last Name: " + lname + "<p></br><p>Title: " + title + "</p></br><p>Email Id: " + mailid +
                                  "</p></br><p>Company Name:" + companyName + "</p></br><p>Message: " + message +
                                  "</p></br><p>Phone:" + phone;
            common.SendPoePdfNotification(emailcontent, subject);
        }

        /// <summary>
        /// Update user details the specified email id in update password page.
        /// </summary>
        /// <param name="emailId">The email id.</param>
        /// <param name="password">The password.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public ActionResult Updateuserdetails(string emailId, string password)
        {
            AuthenticationClient authentication = new AuthenticationClient();

            FeedbackServiceClient feedback = new FeedbackServiceClient();
            //  var email = Request.Form["emailid"];
            //var password = Request.Form["password"];
            string _username = emailId;
            string _password = password;
            if (!string.IsNullOrEmpty(_username) && !string.IsNullOrEmpty(_password))
            {
                var returnValue = authentication.AuthenticateUser(_username, _password);

                var loggedinUser = returnValue.currentUser;

                if (returnValue.IsAuthenticated)
                {
                    return JsonResponse(true);
                }
                else
                {
                    return JsonResponse(false);
                }
            }

            return null;
        }
    }
   
}