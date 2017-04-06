using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Linq;
using System.Web.Mvc;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.CommonWCF;
using bExcellent.mvc.FeedbackWCF;
using bExcellent.mvc.SignUpWCF;
using POE = bExcellent.mvc.SignUpWCF.POE;

namespace bExcellent.mvc.Controllers
{
    public class CommonController : Controller
    {
        public ActionResult Index()
        {
            if (Session["id"] != null)
            {
                return RedirectToAction("Start", "Home");
            }
            return Redirect("~/Microsoft/Login");
        }

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

        /*----------------*/

        /// <summary>
        /// Gets the poes by user id.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetPoEsByUserId()
        {
            var common = new CommonClient();
            var returnValue = common.GetPoEsByUserId(int.Parse(Session["id"].ToString()));
            return JsonResponse(returnValue);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetCurrentUserRole()
        {
            var common = new CommonClient();
            var returnValue = common.GetUserCurrentRole(int.Parse(Session["id"].ToString()));
            if (returnValue.Length == 1)
            {
                return JsonResponse(returnValue.FirstOrDefault().RoleId);
            }
            else
            {
                return JsonResponse("12");
            }

        }
        [SessionExpireFilter]
        public int GetCurrentUserRoleUpdated()
        {
            var common = new CommonClient();
            var returnValue = common.GetUserCurrentRole(int.Parse(Session["id"].ToString()));
            if (returnValue.Length == 1)
            {
                return returnValue.FirstOrDefault().RoleId;
            }
            else
            {
                return 12;
            }

        }
        /// <summary>
        /// Get all PoE's in descening order
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllPoEs()
        {
            var common = new SignupClient();
            var returnValue = common.GetAllPoEs().OrderByDescending(a => a.POEId);
            return JsonResponse(returnValue);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public JsonResult GetPoeResultMode()
        {
            var common = new FeedbackServiceClient();
            if (Session["SelectedPoe"] != null)
            {
                var returnValue = common.GetPoEResultMode(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()));
                Session["PoEResultMode"] = returnValue.ToString();
                var role = GetCurrentUserRoleUpdated();
                var resultmode = new PoeResultMode
                                     {
                                         Status = returnValue,
                                         Role = role
                                     };
                return JsonResponse(resultmode);
            }
            else
            {
                var returnValue = common.GetPoEResultMode(int.Parse(Session["id"].ToString()), 0);

                Session["PoEResultMode"] = returnValue.ToString();
                var resultmode = new PoeResultMode
                {
                    Status = returnValue,
                    Role = 0
                };
                return JsonResponse(resultmode);
            }

        }
        public JsonResult GetPoeResultModeUpdated()
        {
            var common = new FeedbackServiceClient();

            var returnValue = common.GetPoEResultMode(int.Parse(Session["id"].ToString()), 0);

            Session["PoEResultMode"] = returnValue.ToString();
            var resultmode = new PoeResultMode
            {
                Status = returnValue,
                Role = 0
            };
            return JsonResponse(resultmode);


        }
        /// <summary>
        /// Updating Page Mode
        /// </summary>
        /// <param name="status"></param>
        [SessionExpireFilter]
        public void UpdatePageMode(int status)
        {
            var common = new CommonClient();
            common.UpdatePageMode(int.Parse(Session["id"].ToString()), status);
        }

        /// <summary>
        /// Get the selected PoE's
        /// </summary>
        /// <param name="poeid">PoEid</param>
        /// <returns></returns>
        public JsonResult GetSelectedPoe(int poeid)
        {
            var common = new SignupClient();
            var returnValue = common.GetAllPoEs().FirstOrDefault(a => a.POEId == poeid);

            return JsonResponse(returnValue);
        }

        /// <summary>
        /// First Login
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult FirstLogin()
        {
            var returnValue = Session["FirstLogin"] != null ? Session["FirstLogin"].ToString() : null;
            var startpagemode = 0;
            //if (Session["StartPageMode"] != null)
            //{
            //    startpagemode = Convert.ToInt32(Session["StartPageMode"].ToString());
            //}
            var firstLogins = new FirstLogins();
            var domain = Session["emailid"].ToString().Split('@')[1];
            if (returnValue == "True" && domain.ToLower() == "microsoft.com")
            {
                firstLogins.Username = Session["emailid"].ToString();
                firstLogins.Password = Session["Password"].ToString();
                firstLogins.pagemode = returnValue;
                firstLogins.SubId = int.Parse(Session["subid"].ToString());
                Session["Password"] = null;
                return JsonResponse(firstLogins);
            }
            else
            {
                firstLogins.SubId = int.Parse(Session["subid"].ToString());
                return JsonResponse(firstLogins);
            }
        }

        /// <summary>
        /// Get Subscribed PoE's
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetSubscribedPoes()
        {
            if (Session != null && Session["Members"] != null)
            {
                Session["Members"] = null;
            }
            var common = new SignupClient();
            POE[] returnValue = null;
            if (Session != null && Session["subid"] != null)
            {
                if (Session["SubscribedPoes"] == null)
                {
                    returnValue = common.GetSubscribedPoes(int.Parse(Session["subid"].ToString()));
                    Session["SubscribedPoes"] = returnValue;
                }
            }

            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Get Added PoeResult
        /// </summary>
        /// <returns></returns>
        // [SessionExpireFilter]
        public JsonResult GetAddedPoeResult()
        {
            if (Session["SubscribedPoes"] != null)
            {
                return JsonResponse((POE[])Session["SubscribedPoes"]);
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// Get My Network SubscribedPoes
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetMyNetworkSubscribedPoes()
        {
            var common = new CommonClient();
            var mySubscription = common.GetMySubscription(Session["emailid"].ToString());
            if (mySubscription != null)
            {
                var ismySub = mySubscription.Count(a => a.Subscriptionid == int.Parse(Session["subid"].ToString()));
                if (ismySub != 0)
                {
                    var returnValue = common.GetMySubscribedPoes(int.Parse(Session["subid"].ToString()));
                    if (returnValue.Count() != 0)
                    {
                        return JsonResponse(returnValue.Reverse());
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    var returnValue = common.GetPoEsByUserId(int.Parse(Session["id"].ToString()));
                    return JsonResponse(returnValue);
                }
            }
            else
            {
                var returnValue = common.GetPoEsByUserId(int.Parse(Session["id"].ToString()));
                return JsonResponse(returnValue);
            }
        }

        [SessionExpireFilter]
        public JsonResult GetNetworkSubscribedPoes()
        {
            var common = new CommonClient();
            //var returnValue = common.GetMySubscribedPoeList(int.Parse(Session["id"].ToString()),
            //                                                int.Parse(Session["subid"].ToString()));
            var returnValue = common.GetSubscripedPoeByResultMode(int.Parse(Session["id"].ToString()));
            return JsonResponse(returnValue);
        }
        [SessionExpireFilter]
        public JsonResult GetNetworkSubscribedPoesOld()
        {
            var common = new CommonClient();
            var returnValue = common.GetMySubscribedPoeList(int.Parse(Session["id"].ToString()),
                                                            int.Parse(Session["subid"].ToString()));

            return JsonResponse(returnValue);
        }
        /// <summary>
        /// Check Whether it is own subscription
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult IsMyOwnSubscription()
        {
            var common = new CommonClient();
            var mySubscription = common.GetMySubscription(Session["emailid"].ToString());
            if (mySubscription != null)
            {
                if (int.Parse(Session["subid"].ToString()) != -1)
                {
                    var ismySub = mySubscription.Count(a => a.Subscriptionid == int.Parse(Session["subid"].ToString()));
                    return JsonResponse(ismySub != 0);
                }
                else
                {
                    return JsonResponse(true);
                }
            }
            else
            {
                return JsonResponse(false);
            }
        }

        /// <summary>
        /// For AssignPoe And YammerBind
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult AssignPoeAndYammerBind()
        {
            var common = new CommonClient();
            var mySubscription = common.GetMySubscription(Session["emailid"].ToString());
            var checkmapping = common.CheckMapping(int.Parse(Session["id"].ToString()),
                                                   int.Parse(Session["subid"].ToString()));
            var ownsub = new OwnSubscribtion();
            if (mySubscription != null)
            {
                var ismySub = mySubscription.Count(a => a.Subscriptionid == int.Parse(Session["subid"].ToString()));
                if (ismySub != 0)
                {
                    ownsub.IsSub = true;
                }
                else
                {
                    ownsub.IsSub = false;
                }
                if (Session["YammerSignUp"] != null)
                {
                    ownsub.Yammer = true;
                }
                else
                {
                    ownsub.Yammer = false;
                }
                if (checkmapping != 0)
                {
                    ownsub.Mapping = true;
                }
                else
                {
                    ownsub.Mapping = false;
                }
                //ownsub.Mapping;
                ownsub.SubId = int.Parse(Session["subid"].ToString());
                return JsonResponse(ownsub);
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// check its own subscription
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult IsMyOwnSubscriptionCheck()
        {
            var common = new CommonClient();
            if (Session["emailid"] != null)
            {
                var mySubscription = common.GetMySubscription(Session["emailid"].ToString());
                if (mySubscription != null)
                {
                    return JsonResponse(mySubscription.Count());
                }
                else
                {
                    return JsonResponse(false);
                }
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// Check Network Mapping
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult CheckNetworkMapping()
        {
            var common = new CommonClient();
            if (Session["id"] != null && Session["subid"] != null)
            {
                var mySubscription = common.CheckMapping(int.Parse(Session["id"].ToString()),
                                                         int.Parse(Session["subid"].ToString()));
                if (int.Parse(Session["subid"].ToString()) != -1)
                {
                    return JsonResponse(mySubscription);
                }
                else
                {
                    return JsonResponse(int.Parse(Session["subid"].ToString()));
                }
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// Check Subscription
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult CheckSubscription()
        {
            var common = new CommonClient();
            if (Session["emailid"] != null)
            {
                var mySubscription = common.GetMySubscription(Session["emailid"].ToString());
                var length = mySubscription.Count();
                //if (mySubscription != null)
                if (length != 0)
                {
                    var paidmembers = new Paidmember();
                    var ismySub = mySubscription.Count(a => a.Subscriptionid == int.Parse(Session["subid"].ToString()));
                    paidmembers.IsSub = ismySub;
                    paidmembers.Plan = mySubscription[0].Plan;
                    paidmembers.Mode = Session["CartList"] != null ? 1 : 0;
                    var plan = Session["paidOrTrial"];
                    if (plan == "trial")
                    {
                        paidmembers.SessionPlan = 1;
                    }
                    else if (plan == "paid")
                    {
                        paidmembers.SessionPlan = 2;
                    }
                    else if (plan == "MicrosoftCorprate")
                    {
                        paidmembers.SessionPlan = 3;
                    }
                    return JsonResponse(paidmembers);
                }
                else
                {
                    return JsonResponse(null);
                }
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// Get mu userd Id
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult MyUserId()
        {
            if (Session["id"] != null)
            {
                return JsonResponse(int.Parse(Session["id"].ToString()));
            }
            return null;
        }

        /// <summary>
        /// Accounts Data
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult AccountsData()
        {
            var common = new CommonClient();
            var subid = int.Parse(Session["subid"].ToString());
            var returnvalue = common.GetAccountDetail(subid);
            return JsonResponse(returnvalue);
        }

        /// <summary>
        /// Add selected PoE
        /// </summary>
        /// <param name="poeId">PoeId</param>
        /// <param name="plan">Plan ID</param>
        //[SessionExpireFilter]
        public void AddSelectedPoe(int poeId, int plan)
        {
            if (Session["paidOrTrial"] == "trial" && plan == 2)
            {
                if (int.Parse(Session["Mode"].ToString()) == 1)
                {
                    Session["CurrentMode"] = 2;
                }
            }
            if (plan == 1)
            {
                Session["paidOrTrial"] = "trial";
            }
            else if (plan == 2)
            {
                Session["paidOrTrial"] = "paid";
            }
            else if (plan == 3)
            {
                Session["paidOrTrial"] = "MicrosoftCorprate";
            }
            var subscribedPoes = (POE[])Session["SubscribedPoes"];
            var selectedPoesPoes = (POE[])Session["SelectedPoes"];
            var common = new SignupClient();
            var returnValue = common.GetAllPoEs().FirstOrDefault(a => a.POEId == poeId);

            if (subscribedPoes != null)
            {
                if (subscribedPoes.Count(a => a.POEId == poeId) == 0)
                {
                    Array.Resize(ref subscribedPoes, subscribedPoes.Length + 1);
                    subscribedPoes[subscribedPoes.Length - 1] = returnValue;
                    if (selectedPoesPoes != null)
                    {
                        Array.Resize(ref selectedPoesPoes, selectedPoesPoes.Length + 1);
                        selectedPoesPoes[selectedPoesPoes.Length - 1] = returnValue;
                    }
                    else
                    {
                        Array.Resize(ref selectedPoesPoes, 1);
                        selectedPoesPoes[0] = returnValue;
                    }
                }
            }
            else
            {
                Array.Resize(ref subscribedPoes, 1);
                subscribedPoes[0] = returnValue;
                Array.Resize(ref selectedPoesPoes, 1);
                selectedPoesPoes[0] = returnValue;
            }

            Session["SelectedPoes"] = selectedPoesPoes;
            Session["SubscribedPoes"] = subscribedPoes;
        }

        /// <summary>
        /// Remove Seleted PoE
        /// </summary>
        /// <param name="poeId">PoEId</param>
        // [SessionExpireFilter]
        public void RemoveSelectedPOE(int poeId)
        {
            var subscribedPoes = (POE[])Session["SubscribedPoes"];
            var selectedPoesPoes = (POE[])Session["SelectedPoes"];
            if (selectedPoesPoes != null && subscribedPoes != null)
            {
                Session["SelectedPoes"] = (from m in selectedPoesPoes where m.POEId != poeId select m).ToArray();

                // Remove the Subscribed poe
                var subPoe = (from m in subscribedPoes where m.POEId != poeId select m).Count();
                Session["SubscribedPoes"] = (from m in subscribedPoes where m.POEId != poeId select m).ToArray();
                if ((subPoe == 0 && int.Parse(Session["Mode"].ToString()) == 0) ||
                    int.Parse(Session["Mode"].ToString()) == 5)
                {
                    Session["paidOrTrial"] = null;
                }
            }
        }

        /// <summary>
        /// Get Selected PoE
        /// </summary>
        /// <returns></returns>
        //[SessionExpireFilter]
        public JsonResult GetSelectedPoes()
        {
            var subscribedPoes = (POE[])Session["SubscribedPoes"];
            //if (Session["Subid"] == null || int.Parse(Session["Subid"].ToString()) != -1)
            //{
            if (subscribedPoes != null)
            {
                if (Session["PoeAddMode"] != null && int.Parse(Session["PoeAddMode"].ToString()) != 2)
                {
                    Session["SelectedPoes"] = subscribedPoes;
                }
                return JsonResponse(subscribedPoes.Reverse());
            }
            else
            {
                if (int.Parse(Session["Mode"].ToString()) == 1 || int.Parse(Session["Mode"].ToString()) == 2 ||
                    int.Parse(Session["Mode"].ToString()) == 4)
                {
                    var common = new SignupClient();
                    subscribedPoes = common.GetSubscribedPoes(int.Parse(Session["subid"].ToString()));
                    //var common = new SignupClient();
                    //subscribedPoes = common.GetSubscribedPoesList(int.Parse(Session["id"].ToString()), int.Parse(Session["subid"].ToString()));
                    Session["SubscribedPoes"] = subscribedPoes;
                    return JsonResponse(subscribedPoes.Reverse());
                }
                else
                {
                    return null;
                }
            }
            //}
            //else
            //{
            //    return null;
            //}
        }

        /// <summary>
        /// Get PoE for Dropdown
        /// </summary>
        /// <returns></returns>
        //[SessionExpireFilter]
        public JsonResult GetSelectedDropDownPoe()
        {
            var common = new SignupClient();
            var subscribedPoes = (POE[])Session["SubscribedPoes"];
            var OldsubscribedPoes = (POE[])Session["SubscribedPoes"];
            if (int.Parse(Session["Mode"].ToString()) != 0)
            {
                OldsubscribedPoes = common.GetSubscribedPoes(int.Parse(Session["subid"].ToString()));

                Session["SelectedPoes"] = null;

                if (subscribedPoes != null)
                {
                    var intialSubscriber = subscribedPoes;
                    for (var k = 0; k < subscribedPoes.Length; k++)
                    {
                        for (var l = 0; l < OldsubscribedPoes.Length; l++)
                        {
                            if (subscribedPoes[k].POEId == OldsubscribedPoes[l].POEId)
                            {
                                var poeid = subscribedPoes[k].POEId;
                                intialSubscriber =
                                    (from m in intialSubscriber where m.POEId != poeid select m).ToArray();
                            }
                        }
                    }
                    Session["SelectedPoes"] = intialSubscriber;

                    POE[] allnew = intialSubscriber.Union(OldsubscribedPoes).ToArray();
                    Session["SelectAllPoe"] = allnew;
                    return JsonResponse(allnew.Reverse());
                }
            }
            else
            {
                return JsonResponse(subscribedPoes.Reverse());
            }
            return null;
        }

        /// <summary>
        /// Get the newly added PoE's
        /// </summary>
        /// <returns></returns>
        //[SessionExpireFilter]
        public JsonResult GetNewlyAddedPoes()
        {
            var subscribedPoes = (POE[])Session["SelectedPoes"];
            if (subscribedPoes != null && subscribedPoes.Length != 0 && int.Parse(Session["Mode"].ToString()) != 0)
            {
                if (Session["HomePoeMode"] != null)
                {
                    var loadallpoe = (POE[])Session["SelectAllPoe"];
                    return JsonResponse(loadallpoe.Reverse());
                }
                else if (int.Parse(Session["Mode"].ToString()) != 0 && Session["HomePoeMode"] == null)
                {
                    var loadallpoe = (POE[])Session["SelectAllPoe"];
                    var common = new CommonClient();
                    var mySubscription = common.GetMySubscription(Session["emailid"].ToString());
                    var length = mySubscription.Count();
                    if (mySubscription[0].Plan == 1)
                    {
                        return JsonResponse(loadallpoe.Reverse());
                    }
                    else
                    {
                        return JsonResponse(subscribedPoes.Reverse());
                    }
                }
            }
            else if (int.Parse(Session["Mode"].ToString()) == 2 ||
                     (int.Parse(Session["Mode"].ToString()) == 1 && Session["paidOrTrial"] == "trial"))
            {
                var common = new SignupClient();
                var returnValue = common.GetSubscribedPoes(int.Parse(Session["subid"].ToString()));
                Session["SelectedPoes"] = returnValue;
                return JsonResponse(returnValue);
            }
            else if (Session["HomePoeMode"] != null)
            {
                var loadallpoe = (POE[])Session["SelectAllPoe"];
                return JsonResponse(loadallpoe.Reverse());
            }
            else if ((Session["YammerMembers"] != null && Session["paidOrTrial"] == "trial") ||
                     (Session["YammerMembers"] != null && Session["paidOrTrial"] == "paid" &&
                      Session["CurrentMode"] != null && int.Parse(Session["CurrentMode"].ToString()) == 2))
            {
                var loadallpoe = (POE[])Session["SelectAllPoe"];
                return JsonResponse(loadallpoe.Reverse());
            }
            else if (int.Parse(Session["Mode"].ToString()) == 1 && Session["paidmode"] != null)
            {
                var common = new SignupClient();
                var returnValue = common.GetSubscribedPoes(int.Parse(Session["subid"].ToString()));
                Session["SelectedPoes"] = returnValue;
                return JsonResponse(returnValue);
            }

            else
            {
                var subscribedPoesList = (POE[])Session["SelectedPoes"];
                return JsonResponse(subscribedPoesList.Reverse());
            }
            return null;
        }

        /// <summary>
        /// Gets the user role.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetUserRole(int poeid)
        {
            Session["SelectedPoe"] = poeid;
            var common = new CommonClient();
            var returnValue = common.GetUserRole(int.Parse(Session["id"].ToString()), poeid,
                                                 int.Parse(Session["subid"].ToString()));
            return JsonResponse(returnValue);
        }
        [SessionExpireFilter]
        public JsonResult GetFeedbackUserRole(int poeid, int capability, int survey)
        {
            Session["SelectedPoe"] = poeid;
            Session["SelectedCapability"] = capability;
            Session["SelectedSurvey"] = survey;
            var common = new CommonClient();
            var returnValue = common.GetUserRole(int.Parse(Session["id"].ToString()), poeid,
                                                 int.Parse(Session["subid"].ToString()));
            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Get the PoE name
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetPoeName()
        {
            var common = new CommonClient();
            var returnValue = common.GetPoeName(int.Parse(Session["SelectedPoe"].ToString()));

            return JsonResponse(returnValue.Replace("&", "").Replace(" ", ""));
        }

        /// <summary>
        /// Gets the teammembers.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetTeammembers()
        {
            var common = new CommonClient();
            var returnValue = common.GetMyTeammembers(int.Parse(Session["id"].ToString()),
                                                      int.Parse(Session["SelectedPoe"].ToString()),
                                                      int.Parse(Session["subid"].ToString()));

            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Gets my give fb team.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetMyGiveFbTeam()
        {
            var common = new CommonClient();
            var returnValue = common.GetMyGiveFbTeamList(int.Parse(Session["id"].ToString()),
                                                         int.Parse(Session["SelectedPoe"].ToString()),
                                                         int.Parse(Session["subid"].ToString()));

            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Gets my give fb team.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetMyReceiveFbTeam()
        {
            var common = new CommonClient();
            var returnValue = common.GetMyReceiveFbTeamList(int.Parse(Session["id"].ToString()),
                                                            int.Parse(Session["SelectedPoe"].ToString()),
                                                            int.Parse(Session["subid"].ToString()));

            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Gets the user details.
        /// </summary>
        /// <param name="emailid">The emailid.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetUserDetails(string emailid)
        {
            var common = new CommonClient();
            var returnValue = common.GetUserDetailsByEmailId(emailid);

            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Get User Subscriptions
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetUserSubscriptions()
        {
            var common = new CommonClient();
            if (Session["emailid"] != null)
            {
                var returnValue = common.GetUserSubscriptions(Session["emailid"].ToString());

                return JsonResponse(returnValue);
            }
            else
            {
                return null;
            }
        }

        public JsonResult Getplandetails()
        {
            var common = new CommonClient();
            if (Session["emailid"] != null)
            {
                var returnValue = common.GetMySubscription(Session["emailid"].ToString()).FirstOrDefault();
                return JsonResponse(returnValue);
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// Delete User
        /// </summary>
        /// <param name="level">user level</param>
        /// <param name="deleteId"> deleted id</param>
        /// <param name="deletePeer"> delete peer check</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult DeleteUser(int level, int deleteId, int deletePeer)
        {
            var common = new CommonClient();
            if (Session["emailid"] != null)
            {
                var ownsub = common.GetOwnNetwork(Session["emailid"].ToString());

                // var common = new CommonClient();
                var returnValue = common.DeleteUser(int.Parse(Session["id"].ToString()),
                                                    int.Parse(Session["SelectedPoe"].ToString()),
                                                    ownsub.Subscriptionid, level, deleteId, deletePeer);
                return JsonResponse(returnValue);
            }
            else
            {
                return null;
            }

        }

        /// <summary>
        /// Set Network
        /// </summary>
        /// <param name="id">Subscription Id</param>
        /// <param name="curl">Url</param>
        [SessionExpireFilter]
        public void SetNetwork(int id, string curl)
        {
            Session["subid"] = id;
            var common = new SignupClient();
            var network = common.GetNetworkById(id);
            Session["network"] = network;
            Session["SelectedPoe"] = null;
            Response.Redirect(curl);
        }

        /// <summary>
        /// check trial period
        /// </summary>
        /// <param name="id"> userid</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult IsExpired(int id)
        {
            var trailPrd = int.Parse(ConfigurationManager.AppSettings["trailPrd"].ToString());
            var common = new SignupClient();
            var network = common.GetNetworkById(id);
            if (network != null)
            {
                if (network.Plan == 1)
                {
                    if (network.CreatedOn.AddDays(trailPrd) < DateTime.Now)
                    {
                        return JsonResponse(true);
                    }
                    else
                    {
                        return JsonResponse(false);
                    }
                }
                else
                {
                    return JsonResponse(false);
                }
            }
            else
            {
                return JsonResponse(false);
            }
        }

        /// <summary>
        /// Is My Subscription
        /// </summary>
        /// <param name="id"> subscription Id</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult IsMySubscription(int id)
        {
            var common = new SignupClient();
            var network = common.GetNetworkById(id);

            if (network != null && network.EmailId == Session["emailid"].ToString())
            {
                return JsonResponse(true);
            }
            else
            {
                return JsonResponse(false);
            }
        }

        /// <summary>
        /// Get selected Network
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetSelectedNetwork()
        {
            return JsonResponse(Session["network"]);
        }

        /// <summary>
        /// Gets the user mapping details.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetUserMappingDetails()
        {
            var common = new CommonClient();
            var returnValue = common.GetUserMappingDetails(int.Parse(Session["id"].ToString()), int.Parse(Session["subid"].ToString()));
            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Gets the user mapping details.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public void SetSelectedPoe(int poeId)
        {
            Session["SelectedPoe"] = poeId;
        }

        /// <summary>
        /// Gets my manager.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetMyManager()
        {
            var common = new CommonClient();
            var returnValue = common.GetMyManager(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()), int.Parse(Session["subid"].ToString()));
            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Gets my customers.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetMyCustomers()
        {
            var common = new CommonClient();
            var returnValue = common.GetMyCustomers(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()), int.Parse(Session["subid"].ToString()));
            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Gets my full network.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetMyFullNetwork()
        {
            var common = new CommonClient();
            var returnValue = common.GetMyFullNetwork(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()), int.Parse(Session["subid"].ToString()));
            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Gets my peers.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetMyPeers()
        {
            var common = new CommonClient();
            var returnValue = common.GetMyPeers(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()), int.Parse(Session["subid"].ToString()));
            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Gets my network count.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetMyNetworkCount(int poeid)
        {
            Session["SelectedPoe"] = poeid;

            var common = new CommonClient();
            var returnValue = common.GetMyNetworkCount(int.Parse(Session["id"].ToString()), int.Parse(Session["SelectedPoe"].ToString()), int.Parse(Session["subid"].ToString()));
            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Gets my detail.
        /// </summary>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult GetMyDetail()
        {
            var common = new CommonClient();
            if (Session["StartPageMode"] != null && int.Parse(Session["StartPageMode"].ToString()) == 0)
            {
                var returnValue = common.GetMyDetail(int.Parse(Session["id"].ToString()),
                                                     int.Parse(Session["SelectedPoe"].ToString()),
                                                     int.Parse(Session["subid"].ToString()));
                if (returnValue != null)
                {
                    return JsonResponse(returnValue);
                }
                else
                {
                    var userdetail = common.GetUserDetailsByEmailId(Session["emailid"].ToString());

                    return JsonResponse(new CommonWCF.UserPOEMapping
                                            {
                                                JobTitle = "Subscriber",
                                                User = userdetail
                                            });
                }
            }
            else
            {
                var returnValue = common.GetMyDetailWithArea(int.Parse(Session["id"].ToString()),
                                                    int.Parse(Session["SelectedPoe"].ToString()),
                                                    int.Parse(Session["subid"].ToString()));

                return JsonResponse(returnValue);
            }
        }

        /// <summary>
        /// Gets all counties.
        /// </summary>
        /// <returns></returns>

        public JsonResult GetAllCounties()
        {
            var common = new CommonClient();
            var returnValue = common.GetAllCounties();
            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Get All Areas
        /// </summary>
        /// <returns></returns>

        public JsonResult GetAllAreas()
        {
            var common = new CommonClient();
            var returnValue = common.GetAllArea();
            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Updates the user details.
        /// </summary>
        /// <param name="firstName">The first name.</param>
        /// <param name="lastName">The last name.</param>
        /// <param name="countryId">The country id.</param>
        /// <returns></returns>
        [SessionExpireFilter]
        public JsonResult UpdateUserDetails(string firstName, string lastName, string companyName, string jobTitle, int countryId, int AreaId)
        {
            var common = new CommonClient();
            var returnValue = common.UpdateUserDetails(firstName, lastName, companyName, jobTitle, countryId, int.Parse(Session["id"].ToString()), AreaId);
            string loggeduserName = firstName + " " + lastName;

            ViewData["username"] = loggeduserName;
            Session["Uname"] = loggeduserName;
            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Updates the password.
        /// </summary>
        /// <param name="userName">Email id of the user.</param>
        /// <param name="password">The password.</param>
        /// <returns></returns>

        public JsonResult UpdatePassword(string userName, string password)
        {
            var common = new CommonClient();
            var returnValue = common.UpdatePassword(userName, password);
            return JsonResponse(returnValue);
        }

        /// <summary>
        /// Getpasswords the specified email address.
        /// </summary>
        /// <param name="emailAddress">The email address.</param>
        /// <returns></returns>
        public JsonResult GetPassword(string emailAddress)
        {
            var common = new CommonClient();
          //  var returnValue = common.GetPassword(emailAddress);
            return JsonResponse(true);
        }

        /// <summary>
        /// Checks the email id.
        /// </summary>
        /// <param name="emailAddress">The email address.</param>
        /// <returns></returns>
        public JsonResult CheckEmailId(string emailAddress)
        {
            var common = new CommonClient();
            var returnValue = common.CheckEmailId(emailAddress);// "";//;
            return JsonResponse(returnValue);
        }

        public static void Log(string methodname)
        {
            Trace.Write(Environment.NewLine + Environment.NewLine + "Date :" + DateTime.Now.ToString() + " " + methodname);
        }

        [SessionExpireFilter]
        public JsonResult SendResourceMail(List<GoalShare> userslist, string url, string resourceTitle)
        {
            var common = new CommonClient();
            var fromuser = int.Parse(Session["id"].ToString());
            foreach (var goalShare in userslist)
            {
                if (goalShare.SharedWithId != -1)
                {
                    var userid = goalShare.SharedWithId;
                    common.SendMailForResource(fromuser, userid.ToString(), url, resourceTitle);
                }
                else
                {
                    var returnValue = common.GetMyReceiveFbTeamList(int.Parse(Session["id"].ToString()),
                                                                    int.Parse(Session["SelectedPoe"].ToString()),
                                                                    int.Parse(Session["subid"].ToString()));
                    var userids = returnValue.Aggregate("", (current, userPOEMapping) => current + "," + userPOEMapping.User.UserId);
                    common.SendMailForResource(fromuser, userids.Remove(0, 1), url, resourceTitle);
                }
            }

            return JsonResponse(true);
        }
        [SessionExpireFilter]
        public JsonResult GetManagerType()
        {
            var common = new CommonClient();
            var getmangerType = common.GetManagerType(int.Parse(Session["id"].ToString()),
                                                      int.Parse(Session["SelectedPoe"].ToString()));
            return JsonResponse(getmangerType);
        }
        [SessionExpireFilter]
        public JsonResult GetFBStatus()
        {
            var common = new CommonClient();
            var returnValue = common.GetMySubscribedPoeList(int.Parse(Session["id"].ToString()),
                                                            int.Parse(Session["subid"].ToString()));
            var selfFbStatusList = new List<FeedbackStatus>();
            var teamFbStatusList = new List<FeedbackStatus>();
            var fboverall = new FeedbackStatusList();
            foreach (var poe in returnValue)
            {
                var getSelfFbStatus = common.GetUserFBStatus(int.Parse(Session["id"].ToString()), poe.POEId, 1);

                var teammembers = common.GetMyGiveFbTeamList(int.Parse(Session["id"].ToString()),
                                                       poe.POEId,
                                                        int.Parse(Session["subid"].ToString())).Count();
                
                var currentUserRole = common.GetUserRolesByProfileUpdated(int.Parse(Session["id"].ToString()),
                                                      poe.POEId).Count(a => a.RoleId == 1);



                if (getSelfFbStatus == 0 && (currentUserRole != 0))
                {
                    var selfFbStatus = new FeedbackStatus
                                           {
                                               PoeName = poe.POEName,
                                               IsComplted = false
                                           };
                    selfFbStatusList.Add(selfFbStatus);
                }
                if (teammembers != 0)
                {
                    var getTeamFbStatus = common.GetUserFBStatus(int.Parse(Session["id"].ToString()), poe.POEId, 2);
                    var totalfbRequired = teammembers - getTeamFbStatus;
                    if (totalfbRequired != 0)
                    {
                        var teamFbStatus = new FeedbackStatus
                        {
                            PoeName = poe.POEName,
                            FBRequired = totalfbRequired
                        };
                        teamFbStatusList.Add(teamFbStatus);
                    }

                }
            }
            fboverall.Self = selfFbStatusList;
            fboverall.Team = teamFbStatusList;
            return JsonResponse(fboverall);
        }
        [SessionExpireFilter]
        public JsonResult GetNotifications()
        {
            var common = new CommonClient();
            var getmangerType = common.GetUserNotificationsLatest(int.Parse(Session["id"].ToString()));
            return JsonResponse(getmangerType);
        }

    }

    public class Paidmember
    {
        public int IsSub { get; set; }

        public int Plan { get; set; }

        public int Mode { get; set; }

        public int SessionPlan { get; set; }
    }

    public class OwnSubscribtion
    {
        public bool IsSub { get; set; }

        public bool Yammer { get; set; }

        public bool Mapping { get; set; }

        public int SubId { get; set; }
    }

    public class FirstLogins
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string pagemode { get; set; }

        public int SubId { get; set; }
    }
    public class PoeResultMode
    {
        public int Role { get; set; }

        public bool Status { get; set; }
    }
    public class FeedbackStatus
    {
        public string PoeName { get; set; }
        public int FBRequired { get; set; }
        public bool IsComplted { get; set; }
    }
    public class FeedbackStatusList
    {
        public List<FeedbackStatus> Self { get; set; }
        public List<FeedbackStatus> Team { get; set; }
    }
}