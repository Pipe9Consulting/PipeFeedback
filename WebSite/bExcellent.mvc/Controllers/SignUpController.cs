using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.authorize;
using bExcellent.mvc.CommonWCF;
using bExcellent.mvc.SignUpWCF;
using bExcellent.mvc.Uploadify;
using Payment = bExcellent.mvc.SignUpWCF.Payment;
using POE = bExcellent.mvc.SignUpWCF.POE;
using SignupRequest = bExcellent.mvc.SignUpWCF.SignupRequest;
using UserPOEMapping = bExcellent.mvc.SignUpWCF.UserPOEMapping;

namespace bExcellent.mvc.Controllers
{
    public class SignUpController : Controller
    {
        //
        // GET: /SignUp/
        private SignupRequest sr = new SignupRequest();

        private JsonResult JsonResponse(object s)
        {
            if (Request.RequestType == "GET")
                return Json(s, JsonRequestBehavior.AllowGet);

            return Json(s);
        }

        [SessionExpireFilterHome]
        public ActionResult PoELibrary()
        {
            if (Session["id"] != null)
            {
                var common = new CommonClient();
                var commonSignup = new SignupClient();
                var ownsub = common.GetOwnNetwork(Session["emailid"].ToString());
                if (ownsub != null)
                {
                    Session["subid"] = ownsub.Subscriptionid;
                    var network = commonSignup.GetNetworkById(ownsub.Subscriptionid);
                    Session["network"] = network;
                }
            }
            string s = Request["location"].ToString();
            string selectedpoe = null;
            if (Request["SelectedPoe"] != null)
            {
                selectedpoe = Request["SelectedPoe"].ToString();
            }
            else
            {
                Session["GetSelectedPoe"] = null;
            }

            if (s == "Add")
            {
                Session["Mode"] = 4;
                CommonClient common = new CommonClient();

                // var returnValue = common.GetMySubscription(Session["emailid"].ToString()).FirstOrDefault();
                var returnValue = common.GetDefaultUserSubscription(Session["emailid"].ToString());
                if (returnValue.Plan == 1)
                {
                    Session["paidOrTrial"] = "trial";
                    Session["PoeAddMode"] = 1;
                }
                else if (returnValue.Plan == 2)
                {
                    Session["paidOrTrial"] = "paid";
                    Session["PoeAddMode"] = 2;
                }
                else if (returnValue.Plan == 3)
                {
                    Session["paidOrTrial"] = "MicrosoftCorprate";
                    Session["PoeAddMode"] = 2;
                }
            }
            else if (s == "newPoe")
            {
                Session["Mode"] = 5;
            }
            else if (s == "new")
            {
                Session["Mode"] = 0;
            }
            if (selectedpoe != null)
            {
                Session["GetSelectedPoe"] = selectedpoe;
            }
            return View();
        }

        [SessionExpireFilterHome]
        public ActionResult PoELibrary1()
        {
            if (Session["id"] != null)
            {
                var common = new CommonClient();
                var commonSignup = new SignupClient();
                var ownsub = common.GetOwnNetwork(Session["emailid"].ToString());
                if (ownsub != null)
                {
                    Session["subid"] = ownsub.Subscriptionid;
                    var network = commonSignup.GetNetworkById(ownsub.Subscriptionid);
                    Session["network"] = network;
                }
            }
            string s = Request["location"].ToString();
            string selectedpoe = null;
            if (Request["SelectedPoe"] != null)
            {
                selectedpoe = Request["SelectedPoe"].ToString();
            }
            else
            {
                Session["GetSelectedPoe"] = null;
            }

            if (s == "Add")
            {
                Session["Mode"] = 4;
                CommonClient common = new CommonClient();

                // var returnValue = common.GetMySubscription(Session["emailid"].ToString()).FirstOrDefault();
                var returnValue = common.GetDefaultUserSubscription(Session["emailid"].ToString());
                if (returnValue.Plan == 1)
                {
                    Session["paidOrTrial"] = "trial";
                    Session["PoeAddMode"] = 1;
                }
                else if (returnValue.Plan == 2)
                {
                    Session["paidOrTrial"] = "paid";
                    Session["PoeAddMode"] = 2;
                }
                else if (returnValue.Plan == 3)
                {
                    Session["paidOrTrial"] = "MicrosoftCorprate";
                    Session["PoeAddMode"] = 2;
                }
            }
            else if (s == "newPoe")
            {
                Session["Mode"] = 5;
            }
            else if (s == "new")
            {
                Session["Mode"] = 0;
            }
            if (selectedpoe != null)
            {
                Session["GetSelectedPoe"] = selectedpoe;
            }
            return View();
        }

        public ActionResult Terms()
        {
            return View();
        }

        //[SessionExpireFilter]
        //public ActionResult Index()
        //{
        //    return View();
        //}

        public ActionResult Register()
        {
            var mailid = Session["HomeSignUp"];
            var yammersignup = Session["YammerSignUp"];
            POE[] subscribedPoes = (POE[])Session["SubscribedPoes"];
            POE[] selectedPoesPoes = (POE[])Session["SelectedPoes"];
            var mode = Session["Mode"];
            var plan = Session["paidOrTrial"];
            var user = Session["user"];
            Session.Clear();
            if (mailid != null || yammersignup != null || mode != null || user != null)
            {
                Session["HomeSignUp"] = mailid;
                Session["YammerSignUp"] = yammersignup;
                Session["SubscribedPoes"] = subscribedPoes;
                Session["SelectedPoes"] = selectedPoesPoes;
                Session["Mode"] = mode;
                Session["paidOrTrial"] = plan;
                Session["user"] = user;
            }
            return View();
        }

        [SessionExpireFilter]
        public ActionResult Accounts()
        {
            return View();
        }

        [SessionExpireFilter]
        public JsonResult GetMailid()
        {
            return JsonResponse(Session["HomeSignUp"]);
        }

        [SessionExpireFilter]
        public JsonResult LoadYammerContent()
        {
            if (Session["YammerSignUp"] != null)
            {
                var returnvalue = (YammerContent)Session["YammerSignUp"];
                return JsonResponse(returnvalue);
            }
            return null;
        }

       // [SessionExpireFilter]
        public JsonResult GetNetworkData()
        {
            CommonClient common = new CommonClient();
            var returnValue = Session["Members"];
            return JsonResponse(returnValue);
        }

        //[SessionExpireFilter]
        public JsonResult GetSelectedNetworkData(int designationId, string email)
        {
            CommonClient common = new CommonClient();
            var returnValue = (UserPOEMapping[])Session["Members"];
            var selectedvalue =
                (from s in returnValue where s.Designation.Level == designationId && s.User.EmailAddress == email select s).ToArray();

            return JsonResponse(selectedvalue);
        }

        //[SessionExpireFilter]
        public JsonResult Validate()
        {
            PlanChanges();
            if (Session["Members"] != null)
            {
                return JsonResponse(true);
            }
            else
            {
                return JsonResponse(false);
            }
        }

        //[SessionExpireFilter]
        public ActionResult AddMember(string task, string resource)
        {
            if (task.ToLower() == "add")
            {
                CommonClient common = new CommonClient();
                if (Session["Mode"] == null || (int.Parse(Session["Mode"].ToString()) != 1 && int.Parse(Session["Mode"].ToString()) != 4 && int.Parse(Session["Mode"].ToString()) != 5))
                {
                    var returnValue = common.GetMySubscription(Session["emailid"].ToString()).FirstOrDefault();
                    if (returnValue.Plan == 1 && Session["YammerMembers"] == null)
                    {
                        Session["paidOrTrial"] = "trial";
                    }
                    else if (returnValue.Plan == 2 && Session["YammerMembers"] == null)
                    {
                        Session["paidOrTrial"] = "paid";
                    }
                    else if (returnValue.Plan == 3 && Session["YammerMembers"] == null)
                    {
                        Session["paidOrTrial"] = "MicrosoftCorprate";
                    }
                    //YammerData
                    UserPOEMapping[] sesiondata = (UserPOEMapping[])Session["YammerMembers"];
                    Session["Members"] = sesiondata;

                    Session["CartList"] = sesiondata;

                    //End Yammer Data
                    Session["SubscribedPoes"] = null;
                    Session["SelectedPoes"] = null;
                }
                if (Session["paidOrTrial"] != null && Session["paidOrTrial"].ToString() == "trial")
                {
                    Session["CartList"] = null;
                }
                if (Session["Mode"] != null && int.Parse(Session["Mode"].ToString()) == 5)
                {
                    SignupClient sign = new SignupClient();
                    var ownsub = common.GetMySubscription(Session["emailid"].ToString()).FirstOrDefault();
                    var subscribedPoes = sign.GetSubscribedPoes(int.Parse(Session["subid"].ToString()));
                    POE[] subscribedPoesList = (POE[])Session["SubscribedPoes"];
                    POE[] selectedPoesPoesList = (POE[])Session["SelectedPoes"];
                    POE[] SubcribedList = (POE[])subscribedPoes;
                    var f = SubcribedList.ToArray();
                    var userSelected = Session["paidOrTrial"].ToString();
                    var o = Session["paidOrTrial"];
                    if (o != null && ((o.ToString() == "trial" && ownsub.Plan == 1) || (o.ToString() == "paid" && ownsub.Plan == 1)))
                    {
                        var poeCount = 0;
                        var intialSubscriber = SubcribedList;
                        for (var k = 0; k < selectedPoesPoesList.Length; k++)
                        {
                            for (var l = 0; l < SubcribedList.Length; l++)
                            {
                                if (selectedPoesPoesList[k].POEId == SubcribedList[l].POEId)
                                {
                                    poeCount = poeCount + 1;
                                    var poeid = selectedPoesPoesList[k].POEId;
                                    intialSubscriber = (from m in SubcribedList where m.POEId != poeid select m).ToArray();
                                }
                            }
                        }

                        POE[] all = new POE[selectedPoesPoesList.Length + intialSubscriber.Length];
                        Array.Copy(selectedPoesPoesList, all, selectedPoesPoesList.Length);
                        Array.Copy(SubcribedList, 0, all, selectedPoesPoesList.Length, intialSubscriber.Length);

                        Session["SelectedPoes"] = all;
                        Session["SubscribedPoes"] = all;
                        Session["paidOrTrial"] = "paid";
                        if (selectedPoesPoesList.Length == 1 && poeCount != 0)
                        {
                            Session["paidOrTrial"] = "trial";
                        }
                        if (userSelected == "paid")
                        {
                            Session["paidOrTrial"] = "paid";
                        }
                        if (Session["paidOrTrial"].ToString() == "paid")
                        {
                            Session["HeaderText"] =
                                "You have to become a paid user to add more PoE's and more users to your network";
                        }
                        Session["CurrentMode"] = 2;
                        Session["PoeAddMode"] = 1;
                        Session["HomePoeMode"] = 1;
                        //}
                        // }
                    }
                    else if ((Session["paidOrTrial"].ToString() == "paid" && ownsub.Plan == 2) || (Session["paidOrTrial"].ToString() == "trial" && ownsub.Plan == 2))
                    {
                        Session["paidOrTrial"] = "paid";
                        for (var i = 0; i < selectedPoesPoesList.Length; i++)
                        {
                            for (var j = 0; j < SubcribedList.Length; j++)
                            {
                                if (selectedPoesPoesList[i].POEId == SubcribedList[j].POEId)
                                {
                                    var poeId = selectedPoesPoesList[i].POEId;
                                    Session["SelectedPoes"] = (from m in selectedPoesPoesList where m.POEId != poeId select m).ToArray();
                                }
                            }
                        }
                    }
                }
                if (task != "new")
                {
                }

                Session["Mode"] = 1;
            }
            else if (task.ToLower() == "new")
            {
                Session["Mode"] = 0;
            }

            else if (task.ToLower() == "old")
            {
                if (Session["StartPageMode"] != null && int.Parse(Session["StartPageMode"].ToString()) == 0)
                {
                    Session["paidOrTrial"] = "paid";
                }
                else
                {
                    Session["paidOrTrial"] = "MicrosoftCorprate";
                }

                if (Session["Mode"] == null)
                {
                    Session["Mode"] = 2;
                }
            }
            if (Session["CurrentMode"] != null)
            {
                if (int.Parse(Session["CurrentMode"].ToString()) == 2 && Session["HomePoeMode"] == null)
                {
                    Session["paidOrTrial"] = "paid";
                }
            }
            PlanChanges();
            ViewBag.Task = resource.ToLower();
            ViewBag.Mode = task.ToLower();

            return View();
        }

        //[SessionExpireFilter]
        public JsonResult LoadOldMembers()
        {
            SignupClient signupclass = new SignupClient();
            var networkdata = signupclass.GetMyAllUsers(int.Parse(Session["id"].ToString()),
                                                        int.Parse(Session["subid"].ToString()));
            var pagemode = int.Parse(Session["Mode"].ToString());
            Session["Olddata"] = networkdata;
            if ((pagemode == 1 && Session["paidOrTrial"].ToString() == "trial"))
            {
                if (Session["Members"] == null)
                {
                    Session["Members"] = networkdata;
                }
                var cartuserlist = (UserPOEMapping[])Session["CartList"];
                if (cartuserlist == null)
                {
                    Session["CartList"] = networkdata;
                }
            }
            else if (Session["PoeAddMode"] != null)
            {
                if (int.Parse(Session["PoeAddMode"].ToString()) != 2)
                {
                    if (Session["Members"] == null)
                    {
                        Session["Members"] = networkdata;
                    }
                    var cartuserlist = (UserPOEMapping[])Session["CartList"];
                    if (cartuserlist == null)
                    {
                        Session["CartList"] = networkdata;
                    }
                }
            }
            if (Session["YammerMembers"] != null && (Session["Mode"] == null && int.Parse(Session["Mode"].ToString()) != 1))
            {
            }
            return JsonResponse(networkdata);
        }

        //[SessionExpireFilter]
        public JsonResult LoadAllOldMembers(int mode)
        {
            if (mode == 1)
            {
                Session["Mode"] = 2;
                SignupClient getalluser = new SignupClient();
                var networkdata = getalluser.GetMyAllUsers(int.Parse(Session["id"].ToString()),
                                                           int.Parse(Session["subid"].ToString()));
                Session["Members"] = networkdata;
                var cartuserlist = (UserPOEMapping[])Session["CartList"];
                if (cartuserlist == null)
                {
                    Session["CartList"] = networkdata;
                }
                var finalVal = (UserPOEMapping[])Session["Members"];
                Session["paidOrTrial"] = "paid";
                return JsonResponse(networkdata);
            }
            else if (mode == 2)
            {
                var cartlist = (UserPOEMapping[])Session["CartList"];
                Session["Members"] = cartlist;
                Session["paidOrTrial"] = "paid";
                return JsonResponse(cartlist);
            }

            //NetworkPageMode
            var pagemode = int.Parse(Session["Mode"].ToString());
            if (pagemode == 1 && Session["paidOrTrial"].ToString() == "paid")
            {
                Session["Members"] = null;
            }
            return null;
        }

        public JsonResult GetMode()
        {
            return JsonResponse(Session["Mode"]);
        }

        public JsonResult GetSelectedPoe()
        {
            if (Session["GetSelectedPoe"] != null)
            {
                return JsonResponse(Session["GetSelectedPoe"]);
            }
            return null;
        }

        //[SessionExpireFilter]
        public JsonResult AddMemberToSession(string fname, string lname, string emailId, string poe, int designationId, string designationTitle, float poeCost, float userCost)
        {
            var poelist = poe.Split('%');
            UserPOEMapping[] sesiondata = (UserPOEMapping[])Session["Members"];
            foreach (var s in poelist)
            {
                UserPOEMapping newuser = new UserPOEMapping();
                newuser.User = new SignUpWCF.User() { FirstName = fname, LastName = lname, EmailAddress = emailId, YammerToken = "0" };
                newuser.POE = new SignUpWCF.POE() { POEId = Convert.ToInt32(s), PoeAmount = poeCost };
                newuser.Designation = new SignUpWCF.Designation() { Level = designationId, Name = designationTitle };
                newuser.UserAmount = userCost;
                newuser.PoeAmount = poeCost;
                if (sesiondata != null)
                {
                    Array.Resize(ref sesiondata, sesiondata.Length + 1);
                    sesiondata[sesiondata.Length - 1] = newuser;
                }
                else
                {
                    Array.Resize(ref sesiondata, 1);
                    sesiondata[0] = newuser;
                }

                Session["Members"] = sesiondata;
                if (int.Parse(Session["Mode"].ToString()) == 2 || int.Parse(Session["Mode"].ToString()) == 1 || int.Parse(Session["Mode"].ToString()) == 0)
                {
                    Session["CartList"] = sesiondata;
                }
            }
            var groups = sesiondata.GroupBy(sdata => sdata.Designation.Level).ToList();
            return JsonResponse(groups);
        }

       // [SessionExpireFilter]
        public void EditUserdata(int designationId, string email, string fname, string lname, string poe, string designationTitle, string prevMail, float userAmount, float poeCost)
        {
            var returnValue = (UserPOEMapping[])Session["Members"];
            var returnData = new UserPOEMapping[returnValue.Length];
            for (var index = 0; index < returnValue.Length; index++)
            {
                var userPOEMapping = returnValue[index];
                if (userPOEMapping.Designation.Level == designationId && userPOEMapping.User.EmailAddress == prevMail)
                {
                }
                else
                {
                    returnData[index] = userPOEMapping;
                }
            }

            Session["Members"] = returnData.Where(p => p != null).ToArray();
            Session["CartList"] = returnData.Where(p => p != null).ToArray();
            AddMemberToSession(fname, lname, email, poe, designationId, designationTitle, poeCost, userAmount);
        }

        //[SessionExpireFilter]
        public void SaveUserdata(string networkName, string fname, string lname, string mailid, string country, string company)
        {
            var user = (SignUpWCF.User)Session["user"];
            var network = (SignUpWCF.Network)Session["network"];
            network.NetworkName = networkName;
            user.FirstName = fname;
            user.LastName = lname;
            user.CompanyName = company;
            user.EmailAddress = mailid;
            var countrys = new SignUpWCF.Country();
            countrys.Id = int.Parse(country);
            user.Country = countrys;
            Session["user"] = user;
            Session["network"] = network;
        }

       // [SessionExpireFilter]
        public int IsManagerAdded()
        {
            var t = 0;
            var sesiondata = (UserPOEMapping[])Session["Members"];
            if (sesiondata != null)
            {
                for (var k = 0; k < sesiondata.Count(); k++)
                {
                    if (sesiondata[k].Designation.Level == 2)
                    {
                        t = 1;
                    }
                }
            }
            else
            {
                t = 0;
            }
            return t;
        }

        //[SessionExpireFilter]
        public void DeleteMember(int designationId, string email)
        {
            var returnValue = (UserPOEMapping[])Session["Members"];
            var returnData = new UserPOEMapping[returnValue.Length];
            for (var index = 0; index < returnValue.Length; index++)
            {
                var userPOEMapping = returnValue[index];
                if (userPOEMapping.Designation.Level == designationId && userPOEMapping.User.EmailAddress == email)
                {
                }
                else
                {
                    returnData[index] = userPOEMapping;
                }
            }
            Session["Members"] = returnData.Where(p => p != null).ToArray();
            Session["CartList"] = returnData.Where(p => p != null).ToArray();
            if (Session["subid"] != null)
            {
                DeleteUsers[] delUserData = (DeleteUsers[])Session["DeleteMemberList"];
                DeleteUsers delUser = new DeleteUsers();
                delUser.EmailId = email;
                delUser.Subid = int.Parse(Session["subid"].ToString());
                if (delUserData != null)
                {
                    Array.Resize(ref delUserData, delUserData.Length + 1);
                    delUserData[delUserData.Length - 1] = delUser;
                }
                else
                {
                    Array.Resize(ref delUserData, 1);
                    delUserData[0] = delUser;
                }
                Session["DeleteMemberList"] = delUserData;
            }
        }

        //[SessionExpireFilter]
        public void DeletePoe(int poeid)
        {
            var returnValue = (UserPOEMapping[])Session["Members"];
            var selectedPoe = (POE[])Session["SelectedPoes"];
            var subscripePoe = (POE[])Session["SubscribedPoes"];
            var selectedpoes = (from s in selectedPoe where s.POEId != poeid select s).ToArray();
            var subscripepoes = (from s in subscripePoe where s.POEId != poeid select s).ToArray();
            var length = 0;
            if (returnValue != null)
            {
                length = returnValue.Length;
            }

            var returnData = new UserPOEMapping[length];
            for (var index = 0; index < length; index++)
            {
                if (returnValue != null)
                {
                    var userPOEMapping = returnValue[index];
                    if (userPOEMapping.POE.POEId == poeid)
                    {
                        userPOEMapping.POE.POEId = 0;
                    }

                    returnData[index] = userPOEMapping;
                }
            }
            if (Session["subid"] != null)
            {
                DeletePoe[] delUserPoe = (DeletePoe[])Session["DeleteMemberList"];
                DeletePoe delPoe = new DeletePoe();
                delPoe.PoeId = poeid;
                delPoe.Subid = int.Parse(Session["subid"].ToString());
                if (delUserPoe != null)
                {
                    Array.Resize(ref delUserPoe, delUserPoe.Length + 1);
                    delUserPoe[delUserPoe.Length - 1] = delPoe;
                }
                else
                {
                    Array.Resize(ref delUserPoe, 1);
                    delUserPoe[0] = delPoe;
                }
                Session["DeletePoeList"] = delUserPoe;
            }
            Session["SelectedPoes"] = selectedpoes;
            Session["CartList"] = returnData.Where(p => p != null).ToArray();
            Session["SubscribedPoes"] = subscripepoes;
            Session["Members"] = returnData.Where(p => p != null).ToArray();
        }

       // [SessionExpireFilter]
        public ActionResult CheckOut(string mode)
        {
            int totalamt = int.Parse(Request["totalamt"].ToString());
            // commented in order to remove the credit card payment
            if (totalamt != 0)
            {
                ViewBag.Mode = mode.ToLower();
                return View();
            }
            else //if (paidOrTrial == "trial")
            {
                SignupClient signupClient = new SignupClient();
                var deleteMemberList = (DeleteUsers[])Session["DeleteMemberList"];
                if (deleteMemberList != null)
                {
                    foreach (var deleteUserse in deleteMemberList)
                    {
                        signupClient.DeleteSubscribedUsers(deleteUserse.EmailId, int.Parse(Session["subid"].ToString()));
                    }
                }
                var deletePoeList = (DeletePoe[])Session["DeletePoeList"];
                if (deletePoeList != null)
                {
                    foreach (var deltePoe in deletePoeList)
                    {
                        signupClient.DeleteSubscribedPoe(deltePoe.PoeId, int.Parse(Session["subid"].ToString()));
                    }
                }
                sr.User = (SignUpWCF.User)Session["user"];
                sr.Netwrok = (SignUpWCF.Network)Session["network"];
                sr.Payment = (SignUpWCF.Payment)Session["payment"];
                sr.Mode = int.Parse(Session["Mode"].ToString());
                sr.Members = (SignUpWCF.UserPOEMapping[])Session["Members"];
                sr.Poes = (SignUpWCF.POE[])Session["SubscribedPoes"];
                signupClient.SignUp(sr);

                // Session["Members"] = null;
                Session["SelectedPoes"] = null;
                Session["SubscribedPoes"] = null;
                Session["CartList"] = null;
                Session["Olddata"] = null;
                Session["DeleteMemberList"] = null;
                Session["paidmode"] = null;
                Session["GetSelectedPoe"] = null;
                Session["PoeAddMode"] = null;
                Session["HomeSignUp"] = null;
                Session["YammerSignUp"] = null;
                Session["CurrentMode"] = null;
                Session["DeletePoeList"] = null;
                return View("ThankYou");
            }
        }

        //[SessionExpireFilter]
        public JsonResult CheckDomain(string emailid)
        {
            var returnvalue = true;
            var domain = Session["domain"].ToString().ToLower();
            if (emailid.Split('@')[1].ToLower().Equals(domain))
            {
                returnvalue = true;
            }
            else
            {
                returnvalue = false;
            }

            return JsonResponse(returnvalue);
        }

       // [SessionExpireFilter]
        public JsonResult GetUserInfo()
        {
            var members = Session["Members"];
            return JsonResponse(Session["user"]);
        }

        //[SessionExpireFilter]
        public JsonResult GetUserDetail()
        {
            CommonClient common = new CommonClient();
            if (Session["emailid"] != null)
            {
                var mySubscription = common.GetMySubscription(Session["emailid"].ToString());
                if (mySubscription.Length != 0)
                {
                    return JsonResponse(null);
                }
                else
                {
                    return JsonResponse(Session["user"]);
                }
            }
            else
            {
                return null;
            }
        }

        //[SessionExpireFilter]
        public JsonResult GetUserId()
        {
            return JsonResponse(Session["id"]);
        }

        //[SessionExpireFilter]
        public JsonResult GetUserPhoto()
        {
            return JsonResponse(Session["userPhoto"]);
        }

        //[SessionExpireFilter]
        public JsonResult UpdatePlan()
        {
            var network = (SignUpWCF.Network)Session["network"];
            network.Plan = 2;
            Session["paidOrTrial"] = "Trail";
            return JsonResponse(Session["userPhoto"]);
        }

       // [SessionExpireFilter]
        public void PlanChanges()
        {
            var network = (SignUpWCF.Network)Session["network"];
            var plan = Session["paidOrTrial"];
            if (plan == "trial")
            {
                network.Plan = 1;
            }
            else if (plan == "paid")
            {
                network.Plan = 2;
            }
        }

        //[SessionExpireFilter]
        public JsonResult GetSelectedPoesStr()
        {
            var poelist = (SignUpWCF.POE[])Session["SelectedPoes"];
            var poeids = poelist.Aggregate(string.Empty, (current, poe) => current + poe.POEId + "$");
            return JsonResponse(poeids.Remove(poeids.Length - 1));
        }

        //[SessionExpireFilter]
        public JsonResult CartList()
        {
            var poecount = 0;
            var usercounts = 0;
            var youcount = 0;
            if (Session["CartList"] != null)
            {
                youcount = 1;
                var cartlist = (UserPOEMapping[])Session["CartList"];
                //Check within the cartlist
                for (var i = 0; i < cartlist.Count(); i++)
                {
                    for (var j = i + 1; j < cartlist.Count(); j++)
                    {
                        if (cartlist[i].User.EmailAddress == cartlist[j].User.EmailAddress)
                        {
                            usercounts = usercounts + 1;
                            break;
                        }
                    }
                }
                //Check with the subscriber
                var subUser = (SignUpWCF.User)Session["user"];
                for (var i = 0; i < cartlist.Count(); i++)
                {
                    if (cartlist[i].User.EmailAddress == subUser.EmailAddress)
                    {
                        usercounts = usercounts + 1;
                        break;
                    }
                }
                //Check cart in the network page for paid and trial members
                if (int.Parse(Session["Mode"].ToString()) != 1)
                {
                    if (Session["SubscribedPoes"] == null)
                    {
                        SignupClient common = new SignupClient();
                        var returnValue = common.GetSubscribedPoes(int.Parse(Session["subid"].ToString()));
                        poecount = returnValue.Count();
                    }
                    else
                    {
                        var poelist = (SignUpWCF.POE[])Session["SubscribedPoes"];
                        poecount = poelist.Count();
                    }
                }
                else
                {
                    if (Session["SelectedPoes"] != null)
                    {
                        var poelist = (SignUpWCF.POE[])Session["SelectedPoes"];
                        poecount = poelist.Count();
                    }

                    if (Session["Members"] != null && (Session["paidOrTrial"].ToString() == "paid" || Session["paidOrTrial"].ToString() == "MicrosoftCorprate") && (Session["CurrentMode"] == null || int.Parse(Session["CurrentMode"].ToString()) != 2) && (Session["PoeAddMode"] == null || int.Parse(Session["PoeAddMode"].ToString()) != 1))
                    {
                        youcount = 0;
                        // Session["PoeAddMode"] = 1;
                        UserPOEMapping[] sesiondata = (UserPOEMapping[])Session["Olddata"];

                        for (var i = 0; i < sesiondata.Count(); i++)
                        {
                            for (var j = 0; j < cartlist.Count(); j++)
                            {
                                if (cartlist[j].User.EmailAddress == sesiondata[i].User.EmailAddress)
                                {
                                    usercounts = usercounts + 1;
                                    break;
                                }
                            }
                        }
                        if ((Session["paidOrTrial"].ToString() == "paid" || Session["paidOrTrial"].ToString() == "MicrosoftCorprate") && Session["CurrentMode"] == null && Session["YammerMembers"] != null)
                        {
                            poecount = 0;
                        }
                    }
                }
                return JsonResponse((cartlist.Count() - usercounts) + poecount + youcount);
            }
            else if (Session["Mode"] != null && Session["Mode"].ToString() == "0" && Session["SelectedPoes"] != null)
            {
                var poelist = (SignUpWCF.POE[])Session["SelectedPoes"];
                return JsonResponse(1 + poelist.Count());
            }
            else if (Session["Mode"] != null && Session["Mode"].ToString() == "1" && Session["SelectedPoes"] != null)
            {
                var poelist = (SignUpWCF.POE[])Session["SelectedPoes"];
                return JsonResponse(poelist.Count());
            }
            else
            {
                return null;
            }
        }

        [SessionExpireFilterHome]
        public void RegisterRequest()
        {
            var user = new SignUpWCF.User();

            var network1 = new SignUpWCF.Network();

            user.FirstName = Request["firstame"].ToString();
            user.LastName = Request["lastname"].ToString();
            user.CompanyName = Request["companyname"].ToString();
            user.YammerToken = "0";
            if (Session["YammerSignUp"] != null)
            {
                var yammersignin = (YammerContent)Session["YammerSignUp"];
                user.EmailAddress = yammersignin.EmailId;
                user.Password = "Pass@123";
                user.YammerToken = yammersignin.AccesToken;
            }
            else if (Session["user"] != null)
            {
                var userlist = (SignUpWCF.User)Session["user"];
                user.EmailAddress = userlist.EmailAddress;
                user.Password = "123";
            }
            else
            {
                user.EmailAddress = Request["email"].ToString();
                user.Password = Request["pass"].ToString();
            }

            string ImgId = Request["imgid"].ToString();
            byte[] img = null;
            if (!string.IsNullOrEmpty(ImgId))
            {
                var imgHandler = new ImageHandler();
                img = imgHandler.GetImage(ImgId, System.Web.HttpContext.Current);
                user.Photo = img;
            }

            Session["domain"] = user.EmailAddress.Split('@')[1];

            var country = new SignUpWCF.Country();
            //  country.Name =

            country.Id = int.Parse(Request["country"].ToString());
            user.Country = country;
            var plan = 0;

            network1.EmailId = user.EmailAddress;
            network1.NetworkName = Request["network"].ToString();
            network1.Plan = plan;

            sr.Netwrok = network1;
            sr.User = user;
            Session["user"] = user;
            Session["network"] = network1;
            Session["userPhoto"] = Request["imgurl"].ToString();

            Session["Subscription"] = null;
            Session["SubMessage"] = null;
            if (Session["Mode"] != null && int.Parse(Session["Mode"].ToString()) == 5)
            {
                Response.Redirect("/signup/new/Add");
            }
            else
            {
                Response.Redirect("/signup/PoELibrary?location=new");
            }
        }

        //[SessionExpireFilter]
        public ActionResult CheckOutConfirm()
        {
            SubscriberDetails.Cardnum = Request["cardnumber"].ToString();
            SubscriberDetails.FirstName = Request["firstname"].ToString();
            SubscriberDetails.LastName = Request["lastname"].ToString();
            SubscriberDetails.ExpireDate = Request["year"].ToString() + "-" + Request["month"].ToString();
            if (AuthorizeAim())
            {
                bool success = CreateSubscription();

                if (success)
                {
                    SignupClient signupClient = new SignupClient();

                    sr.User = (SignUpWCF.User)Session["user"];
                    sr.Netwrok = (SignUpWCF.Network)Session["network"];
                    sr.Payment = (SignUpWCF.Payment)Session["payment"];
                    sr.Mode = int.Parse(Session["Mode"].ToString());
                    sr.Members = (SignUpWCF.UserPOEMapping[])Session["Members"];
                    sr.Poes = (SignUpWCF.POE[])Session["SelectedPoes"];
                    signupClient.SignUp(sr);

                    Session["Members"] = null;
                    Session["SelectedPoes"] = null;
                    Session["SubscribedPoes"] = null;
                    Session["CartList"] = null;
                    return View("ThankYou");
                }
                else
                {
                    return View("CheckOut");
                }
            }
            else
            {
                return View("CheckOut");
            }
        }

        [SessionExpireFilter]
        public ActionResult ThankYou()
        {
            Session["paidOrTrial"] = null;
            Session["Mode"] = null;
            return View();
        }

        public ActionResult Privacy()
        {
            return View();
        }

        //[SessionExpireFilter]
        public JsonResult GetPoEcost(int planid)
        {
            CommonClient common = new CommonClient();
            var result = common.GetPlanById(planid);
            return JsonResponse(result);
        }

        //[SessionExpireFilter]
        public ActionResult DownloadPdf(int poeid)
        {
            var poename = "";
            switch (poeid)
            {
                case -1:
                    poename = "IsYourTeamlikeGermanyorArgentina.pdf";
                    break;

                case 0:
                    poename = "Cloud as Coach_ASTD Webinar.pptx";
                    break;

                case 1:
                    poename = "HumanSelling.pdf";
                    break;

                case 2:
                    poename = "CloudBusiness.pdf";
                    break;

                case 3:
                    poename = "ChallengerSelling.pdf";
                    break;

                case 4:
                    poename = "Partner-Sales-Manager.pdf";
                    break;

                case 5:
                    poename = "Dynamics-Lead.pdf";
                    break;

                case 6:
                    poename = "Leaders-Make-the- Future.pdf";
                    break;

                case 7:
                    poename = "Specialist-Sales-Manager.pdf";
                    break;

                case 8:
                    poename = "AO-Account-Manager.pdf";
                    break;

                case 9:
                    poename = "AO-Sales-Manager.pdf";
                    break;

                case 10:
                    poename = "AO-AM-Manager.pdf";
                    break;

                case 11:
                    poename = "AO-Account-Executive.pdf";
                    break;

                case 12:
                    poename = "AO-AdSol-Specialist.pdf";
                    break;

                case 13:
                    poename = "AO-Product-Specialist.pdf";
                    break;
                case 15:
                    poename = "Channel-Executive.pdf";
                    break;
                default:
                    poename = "HumanSelling.pdf";
                    break;
            }
            return Redirect("../PDF/" + poename + "");
        }

        [SessionExpireFilter]
        public void OpenPDF(string fname, string lname, string title, string mailid, string companyName, string message, string phone)
        {
            var subject = "PDF Downloaded";
            CommonClient common = new CommonClient();
            string emailcontent = "<p>FirstName:" + fname + "<p></br><p>LastName:" + lname + "<p></br><p>Title:" + title + "</p></br><p>Email Id:" + mailid +
                                  "</p></br><p>Company Name:" + companyName + "</p></br><p>Message:" + message +
                                  "</p></br><p>Phone:" + phone;
            common.SendPoePdfNotification(emailcontent, subject);
        }

        public JsonResult CheckEmailid(string emailid)
        {
            SignupClient common = new SignupClient();
            var result = common.CheckEmailId(emailid);
            return JsonResponse(result);
        }

       // [SessionExpireFilter]
        public JsonResult GetMyNetworkCount()
        {
            var usercount = 0;
            var diffcount = 0;
            CommonClient common = new CommonClient();
            if (Session["Mode"].ToString() == "0")
            {
                if (Session["Members"] != null)
                {
                    UserPOEMapping[] sesiondata = (UserPOEMapping[])Session["Members"];
                    for (var i = 0; i < sesiondata.Count(); i++)
                    {
                        for (var j = i + 1; j < sesiondata.Count(); j++)
                        {
                            if (sesiondata[i].User.EmailAddress == sesiondata[j].User.EmailAddress)
                            {
                                diffcount = diffcount + 1;
                                break;
                            }
                        }
                    }
                    usercount = (usercount + sesiondata.Count()) - diffcount;
                }
            }
            else
            {
                if (Session["SelectedPoe"] != null)
                {
                }

                if (Session["Members"] != null)
                {
                    UserPOEMapping[] sesiondata = (UserPOEMapping[])Session["Members"];
                    for (var i = 0; i < sesiondata.Count(); i++)
                    {
                        for (var j = i + 1; j < sesiondata.Count(); j++)
                        {
                            if (sesiondata[i].User.EmailAddress == sesiondata[j].User.EmailAddress)
                            {
                                diffcount = diffcount + 1;
                                break;
                            }
                        }
                    }
                    usercount = (usercount + sesiondata.Count()) - diffcount;
                }
                else if (Session["Mode"].ToString() == "1" && (Session["paidOrTrial"].ToString() == "paid" || Session["paidOrTrial"].ToString() == "MicrosoftCorprate"))
                {
                    SignupClient signupclass = new SignupClient();
                    var networkdata = signupclass.GetMyAllUsers(int.Parse(Session["id"].ToString()),
                                                                int.Parse(Session["subid"].ToString()));
                    if (networkdata != null)
                    {
                        usercount = usercount + networkdata.Count();
                    }
                }
                // return JsonResponse(usercount);
            }
            return JsonResponse(usercount);
        }

        public JsonResult CheckNetworkName(string networkName)
        {
            SignupClient common = new SignupClient();
            var result = common.CheckNetwork(networkName);
            return JsonResponse(result);
        }

        [SessionExpireFilter]
        public JsonResult GetPaymentData()
        {
            return JsonResponse(Session["payment"]);
        }

        [SessionExpireFilter]
        public JsonResult GetStartMode()
        {
            return JsonResponse(Session["Mode"]);
        }

        [SessionExpireFilter]
        public JsonResult GetSessionButton()
        {
            return JsonResponse(Session["btnShow"]);
        }

        [SessionExpireFilter]
        public JsonResult GetSubscribedPoe()
        {
            SignupClient sign = new SignupClient();

            if (Session["subid"] != null)
            {
                var subscribedPoes = sign.GetSubscribedPoes(int.Parse(Session["subid"].ToString()));
                return JsonResponse(subscribedPoes);
            }
            return null;
        }

        //[SessionExpireFilter]
        public JsonResult TrailTopaid()
        {
            Session["CurrentMode"] = 2;
            Session["paidOrTrial"] = "paid";
            return JsonResponse(Session["paidOrTrial"]);
        }

        //[SessionExpireFilter]
        public JsonResult GettingTxtValues(string firstName, string lastName, string emailId, string role, string mode)
        {
            Session["firstNameVal"] = firstName;
            Session["lastNameVal"] = lastName;
            Session["emailIdVal"] = emailId;
            Session["modeVal"] = mode;
            Session["roleVal"] = role;
            return JsonResponse(Session["btnShow"]);
        }

        //[SessionExpireFilter]
        public JsonResult GetLoadData()
        {
            var dataval = new MynetworkData();
            if (Session["firstNameVal"] != null)
            {
                dataval = new MynetworkData
                                 {
                                     FirstName = Session["firstNameVal"].ToString(),
                                     LastName = Session["lastNameVal"].ToString(),
                                     Email = Session["emailIdVal"].ToString(),
                                     Mode = Session["modeVal"].ToString(),
                                     Role = Session["roleVal"].ToString()
                                 };
            }
            return JsonResponse(dataval);
        }

        [SessionExpireFilter]
        public void ConvertPaidMember()
        {
            Session["paidmode"] = 1;
        }

       // [SessionExpireFilter]
        public JsonResult GetPlanById()
        {
            if (Session["paidOrTrial"] != null)
            {
                var planVariable = Session["paidOrTrial"].ToString();
                var planid = 0;
                if (planVariable == "paid")
                {
                    planid = 2;
                }
                else if (planVariable == "trial")
                {
                    planid = 1;
                }
                else if (planVariable == "MicrosoftCorprate")
                {
                    planid = 3;
                }
                CommonClient common = new CommonClient();
                var result = common.GetPlanById(planid);
                return JsonResponse(result);
            }
            return null;
        }

        //[SessionExpireFilter]
        public JsonResult CheckYammerSubscribtion()
        {
            if (Session["YammerSignUp"] != null)
            {
                return JsonResponse(Session["YammerSignUp"]);
            }
            return null;
        }

        [SessionExpireFilter]
        public JsonResult GetPaidortrail()
        {
            if (Session["paidOrTrial"] != null)
            {
                var planVariable = Session["paidOrTrial"].ToString();
                var planid = 0;
                var yammerlogin = 0;
                if (planVariable == "paid")
                {
                    planid = 2;
                }
                else if (planVariable == "trial")
                {
                    planid = 1;
                }
                else if (planVariable == "MicrosoftCorprate")
                {
                    planid = 3;
                }
                if (Session["YammerSignUp"] != null)
                {
                    yammerlogin = 1;
                }
                var getval = new GetPaidOrTrial();
                getval.PlanId = planid;
                getval.YammerId = yammerlogin;
                if (Session["subid"] != null && int.Parse(Session["Mode"].ToString()) != 0)
                {
                    getval.SubId = int.Parse(Session["subid"].ToString());
                }
                else
                {
                    getval.SubId = 0;
                }
                return JsonResponse(getval);
            }
            return null;
        }

       // [SessionExpireFilter]
        public JsonResult GetYouData()
        {
            if (Session["user"] != null)
            {
                var user = (SignUpWCF.User)Session["user"];
                var network = (SignUpWCF.Network)Session["network"];
                YouData you = new YouData();
                you.NetworkName = network.NetworkName;
                you.FirstName = user.FirstName;
                you.LastName = user.LastName;
                you.Email = user.EmailAddress;
                you.CompanyName = user.CompanyName;
                you.Country = user.Country.Id;
                if (Session["CurrentMode"] != null)
                {
                    you.TrialToPaidmode = 1;
                }
                else
                {
                    you.TrialToPaidmode = 0;
                }
                if (Session["PoeAddMode"] != null)
                {
                    if (int.Parse(Session["PoeAddMode"].ToString()) == 1 && Session["paidOrTrial"].ToString() == "paid")
                    {
                        you.PoeMode = 1;
                    }
                    else
                    {
                        you.PoeMode = 2;
                    }
                }
                else
                {
                    you.PoeMode = 0;
                }
                if (Session["HeaderText"] != null)
                {
                    you.HeaderText = Session["HeaderText"].ToString();
                }
                return JsonResponse(you);
            }
            return null;
        }

        public ActionResult RedirectionTo(string redirectval)
        {
            if (Session["RedirectTo"] != null)
            {
                if (redirectval != "" && redirectval == "Login")
                {
                    return RedirectToAction("YammerLogin", "home");
                }
                else
                {
                    return RedirectToAction("YammerLogin", "home");
                }
            }
            else
            {
                return null;
            }
        }

        public bool AuthorizeAim()
        {
            String post_url = "https://secure.authorize.net/gateway/transact.dll";

            Dictionary<string, string> post_values = new Dictionary<string, string>();
            ARBSubscriptionType subscription = new ARBSubscriptionType();
            var membercount = (Session["Members"] != null) ? ((SignUpWCF.UserPOEMapping[])Session["Members"]).GroupBy(a => a.User.EmailAddress).Select(g => g.First()).Count() : 0;
            var poeCount = (Session["SelectedPoes"] != null) ? ((SignUpWCF.POE[])Session["SelectedPoes"]).Count() : 0;
            /*Get values frm db regarding the plan and multiply the ammount*/
            // add 1 in member count when the mode is new
            var planVariable = Session["paidOrTrial"].ToString();
            var planid = 0;
            planid = (planVariable == "paid") ? 2 : 1;
            CommonClient common = new CommonClient();
            var result = common.GetPlanById(planid);
            decimal amount = (membercount * result.UserCost) + (poeCount * result.PoeCost);

            var mode = Session["Mode"].ToString();
            var useramount = (mode == "0") ? 1 * result.UserCost : 0;
            amount = amount + useramount;
            //the API Login ID and Transaction Key must be replaced with valid values
            post_values.Add("x_login", ConfigurationManager.AppSettings["authenticationName"]);
            post_values.Add("x_tran_key", ConfigurationManager.AppSettings["transactionKey"]);
            post_values.Add("x_delim_data", "TRUE");
            post_values.Add("x_delim_char", "|");
            post_values.Add("x_relay_response", "FALSE");

            post_values.Add("x_type", "AUTH_CAPTURE");
            post_values.Add("x_method", "CC");
            post_values.Add("x_card_num", SubscriberDetails.Cardnum);
            post_values.Add("x_exp_date", Request["month"].ToString() + Request["year"].ToString());

            post_values.Add("x_amount", amount.ToString());
            post_values.Add("x_description", "Sample Transaction");

            post_values.Add("x_first_name", SubscriberDetails.FirstName);
            post_values.Add("x_last_name", SubscriberDetails.LastName);
            post_values.Add("x_address", Request["address1"].ToString());
            post_values.Add("x_state", "WA");
            post_values.Add("x_zip", Request["zip"].ToString());
            // Additional fields can be added here as outlined in the AIM integration
            // guide at: http://developer.authorize.net

            // This section takes the input fields and converts them to the proper format
            // for an http post.  For example: "x_login=username&x_tran_key=a1B2c3D4"
            String post_string = "";

            foreach (KeyValuePair<string, string> post_value in post_values)
            {
                post_string += post_value.Key + "=" + HttpUtility.UrlEncode(post_value.Value) + "&";
            }
            post_string = post_string.TrimEnd('&');

            HttpWebRequest objRequest = (HttpWebRequest)WebRequest.Create(post_url);
            objRequest.Method = "POST";
            objRequest.ContentLength = post_string.Length;
            objRequest.ContentType = "application/x-www-form-urlencoded";

            // post data is sent as a stream
            StreamWriter myWriter = null;
            myWriter = new StreamWriter(objRequest.GetRequestStream());
            myWriter.Write(post_string);
            myWriter.Close();

            // returned values are returned as a stream, then read into a string
            String post_response;
            HttpWebResponse objResponse = (HttpWebResponse)objRequest.GetResponse();
            using (StreamReader responseStream = new StreamReader(objResponse.GetResponseStream()))
            {
                post_response = responseStream.ReadToEnd();
                // post_response.
                // ViewBag.Status = "Payment failed - " + post_response.messages[0].text;
                responseStream.Close();
            }

            // the response string is broken into an array
            // The split character specified here must match the delimiting character specified above
            Array response_array = post_response.Split('|');

            // the results are output to the screen in the form of an html numbered list.
            // resultSpan.InnerHtml += "<OL> \n";

            // resultSpan.InnerHtml += "</OL> \n";
            // individual elements of the array could be accessed to read certain response
            // fields.  For example, response_array[0] would return the Response Code,
            // response_array[2] would return the Response Reason Code.
            // for a list of response fields, please review the AIM Implementation Guide

            if (response_array.GetValue(0).ToString() == "1")
                return true;
            else
            {
                ViewBag.Status = "Payment failed - " + response_array.GetValue(3).ToString();
                return false;
            }
        }

        private bool CreateSubscription()
        {
            bool bResult = true;
            //
            //Create subscription

            MerchantAuthenticationType authentication = PopulateMerchantAuthentication();

            ARBSubscriptionType subscription = new ARBSubscriptionType();
            PopulateSubscription(subscription, false);

            ARBCreateSubscriptionResponseType response;

            var _webservice = new bExcellent.mvc.authorize.Service();

            response = _webservice.ARBCreateSubscription(authentication, subscription);

            if (response.resultCode == MessageTypeEnum.Ok)
            {
                Payment payment = new Payment();
                payment.Address1 = Request["address1"].ToString();
                payment.Address2 = Request["address2"].ToString();
                payment.City = Request["city"].ToString();
                payment.State = Request["state"].ToString();
                payment.Zip = Request["zip"].ToString();
                payment.Country = Request["country"].ToString();
                payment.CreditCard = Request["cardnumber"].ToString();
                payment.Amount = subscription.amount;
                payment.ResponseId = response.subscriptionId.ToString();
                payment.Response = response.messages[0].text;
                Session["payment"] = payment;

                bResult = true;
            }
            else
            {
                ViewBag.Status = "Payment failed - " + response.messages[0].text;
                bResult = false;
                // WriteErrors(response);
            }

            return bResult;
        }

        private MerchantAuthenticationType PopulateMerchantAuthentication()
        {
            MerchantAuthenticationType authentication = new MerchantAuthenticationType();
            authentication.name = ConfigurationManager.AppSettings["authenticationName"];
            authentication.transactionKey = ConfigurationManager.AppSettings["transactionKey"];
            return authentication;
        }

        private void PopulateSubscription(ARBSubscriptionType sub, bool bForUpdate)
        {
            var User = (SignUpWCF.User)Session["user"];
            var creditCard = new CreditCardType();

            sub.name = ConfigurationManager.AppSettings["SubscriberName"];

            creditCard.cardNumber = SubscriberDetails.Cardnum;
            creditCard.expirationDate = SubscriberDetails.ExpireDate;

            sub.payment = new PaymentType
            {
                Item = creditCard
            };
            sub.customer = new CustomerType
            {
                email = User.EmailAddress
            };
            sub.billTo = new NameAndAddressType
            {
                firstName = SubscriberDetails.FirstName,
                lastName = SubscriberDetails.LastName
            };

            // Create a subscription that is 12 monthly payments starting on Jan 1, 2019

            sub.paymentSchedule = new PaymentScheduleType
            {
                //startDate = new DateTime(2013, 5, 30),
                startDate = DateTime.Now,
                startDateSpecified = true,
                totalOccurrences = 9999,
                totalOccurrencesSpecified = true
            };

            var membercount = (Session["Members"] != null) ? ((SignUpWCF.UserPOEMapping[])Session["Members"]).GroupBy(a => a.User.EmailAddress).Select(g => g.First()).Count() : 0;
            var poeCount = (Session["SelectedPoes"] != null) ? ((SignUpWCF.POE[])Session["SelectedPoes"]).Count() : 0;
            /*Get values frm db regarding the plan and multiply the ammount*/
            // add 1 in member count when the mode is new
            var planVariable = Session["paidOrTrial"].ToString();
            var planid = 0;
            planid = (planVariable == "paid") ? 2 : 1;
            CommonClient common = new CommonClient();
            var result = common.GetPlanById(planid);
            decimal amount = (membercount * result.UserCost) + (poeCount * result.PoeCost);

            var mode = Session["Mode"].ToString();
            var useramount = (mode == "0") ? 1 * result.UserCost : 0;
            amount = amount + useramount;
            sub.amount = amount;
            sub.amountSpecified = true;

            if (!bForUpdate)
            { // Interval can't be updated once a subscription is created.
                sub.paymentSchedule.interval = new PaymentScheduleTypeInterval
                {
                    length = 12,
                    unit = ARBSubscriptionUnitEnum.months
                };
            }
        }

        public JsonResult SetThankYouContent()
        {
            var thankyoucont = new List<MynetworkData>();
            //var singleuser = new MynetworkData();

            var common = new CommonClient();
            if (Session["Members"] != null)
            {
                foreach (var users in (UserPOEMapping[])Session["Members"])
                {
                    //var match = thankyoucont.FirstOrDefault(stringToCheck => stringToCheck.Email.Contains(users.User.EmailAddress));
                    int match = thankyoucont.FindIndex(s => s.Email.Contains(users.User.EmailAddress));
                    if (match == -1)
                    {
                        var singleuser = new MynetworkData
                                              {
                                                  FirstName = users.User.FirstName,
                                                  LastName = users.User.LastName,
                                                  Role = users.Designation.Name,
                                                  PoeName = common.GetPoeName(users.POE.POEId),
                                                  Email = users.User.EmailAddress,
                                                  Mode = Session["paidOrTrial"].ToString()
                                              };
                        thankyoucont.Add(singleuser);
                    }
                    else
                    {
                        thankyoucont[match].PoeName = thankyoucont[match].PoeName + "," +
                                                             common.GetPoeName(users.POE.POEId);
                    }
                }
            }
            return JsonResponse(thankyoucont);
        }
    }

    public static class SubscriberDetails
    {
        public static string Cardnum { get; set; }

        public static string ExpireDate { get; set; }

        public static string FirstName { get; set; }

        public static string LastName { get; set; }
    }

    public class MynetworkData
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Mode { get; set; }

        public string Role { get; set; }

        public string PoeName { get; set; }
    }

    public class DeleteUsers
    {
        public string EmailId { get; set; }

        public int Subid { get; set; }
    }

    public class DeletePoe
    {
        public int PoeId { get; set; }

        public int Subid { get; set; }
    }

    public class GetPaidOrTrial
    {
        public int PlanId { get; set; }

        public int YammerId { get; set; }

        public int SubId { get; set; }
    }

    public class YouData
    {
        public string NetworkName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string CompanyName { get; set; }

        public int Country { get; set; }

        public int TrialToPaidmode { get; set; }

        public int PoeMode { get; set; }

        public string HeaderText { get; set; }
    }
}