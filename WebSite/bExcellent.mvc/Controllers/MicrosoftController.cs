using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using bExcellent.mvc.AuthenticationWCF;
using bExcellent.mvc.CommonWCF;
using bExcellent.mvc.FeedbackWCF;
using bExcellent.mvc.Models;
using bExcellent.mvc.SignUpWCF;
using CreatedFeedback = bExcellent.mvc.FeedbackWCF.CreatedFeedback;
using POE = bExcellent.mvc.SignUpWCF.POE;

namespace bExcellent.mvc.Controllers
{
    public class MicrosoftController : Controller
    {
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
                    Session.Add("userId", loggedinUser.UserId);
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
                    return RedirectToAction("Login", "Microsoft");
                }
            }

            /*    ViewData["fullname"] = ((AuthenticationResult)Session["UserDetail"]).currentUser.FirstName + " " +
                          ((AuthenticationResult)Session["UserDetail"]).currentUser.LastName;
                ViewData["userid"] = ((AuthenticationResult)Session["UserDetail"]).currentUser.UserId.ToString().Trim();
                return View("Default");*/
            //Response.Redirect("../client/Default.aspx");
        }
        public void SetSelectNetwork(int id)
        {
            Session["subid"] = id;
            SignupClient common = new SignupClient();
            var network = common.GetNetworkById(id);
            Session["network"] = network;
        }

        public ActionResult Tests()
        {
            return View();
        }
    }
}
