using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.Mvc;

//using bExcellent.mvc.CommonWCF;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.CommonWCF;
using bExcellent.mvc.SignUpWCF;
using bExcellent.mvc.Uploadify;
using UserPOEMapping = bExcellent.mvc.SignUpWCF.UserPOEMapping;

namespace bExcellent.mvc.Controllers
{
    public class NetworkController : Controller
    {
        private SignupRequest sr = new SignupRequest();

        [SessionExpireFilter]
        public ActionResult Network(int? pageMode)
        {
            //  Session["id"] = 3;
            Session["subid"] = -1;

            if (pageMode != null)
            {
                Session["NetworkPage"] = pageMode;
            }
            else
            {
                Session["NetworkPage"] = null;
            }

            return View();
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
            else
                return Json(s);
        }

        public JsonResult LoadUserPlan()
        {
            Session["Mode"] = 0;
            SignupClient getalluser = new SignupClient();
            var networkdata = getalluser.GetMyAllUsers(int.Parse(Session["id"].ToString()),

                                  int.Parse(Session["subid"].ToString()));

            CommonClient common = new CommonClient();
            var returnValue = common.GetMySubscription(Session["emailid"].ToString()).FirstOrDefault();
            var planid = 0;
            if (Session["paidOrTrial"] == null)
            {
                planid = returnValue.Plan;
                if (returnValue.Plan == 2)
                {
                    Session["paidOrTrial"] = "paid";
                }
                else
                {
                    Session["paidOrTrial"] = "trial";
                    if (Session["YammerMembers"] == null)
                    {
                        Session["YammerMembers"] = networkdata;
                    }
                }
            }
            else
            {
                if (Session["paidOrTrial"] == "paid")
                {
                    planid = 2;
                }
                else
                {
                    if (Session["YammerMembers"] == null)
                    {
                        Session["YammerMembers"] = networkdata;
                    }
                    planid = 1;
                }
            }
            var yammerUsrCount = 0;
            var usercounts = 0;

            if (Session["YammerMembers"] != null)
            {
                UserPOEMapping[] sesiondata = (UserPOEMapping[])Session["YammerMembers"];
                for (var i = 0; i < sesiondata.Count(); i++)
                {
                    for (var j = 0; j < networkdata.Count(); j++)
                    {
                        if (networkdata[j].User.EmailAddress == sesiondata[i].User.EmailAddress)
                        {
                            usercounts = usercounts + 1;
                            break;
                        }
                    }
                }
                var subUser = (SignUpWCF.User)Session["user"];
                for (var i = 0; i < sesiondata.Count(); i++)
                {
                    if (sesiondata[i].User.EmailAddress == subUser.EmailAddress)
                    {
                        usercounts = usercounts + 1;
                        break;
                    }
                }
                yammerUsrCount = sesiondata.Count();
            }

            var yammerDetail = new NetworkYammerDetail();

            yammerDetail.Usercount = networkdata.Count();
            yammerDetail.Planid = planid;
            yammerDetail.yammerUserCount = yammerUsrCount - usercounts;
            //Session["CartList"] = (networkdata.Count() + yammerUsrCount) - usercounts;
            return JsonResponse(yammerDetail);
        }

        /// <summary>
        /// Gets the user profile image.
        /// </summary>
        /// <param name="id">The id.</param>
        /// <returns></returns>
        private byte[] GetImage(string id)
        {
            // Create a new, empty image to return as default
            byte[] image = new byte[0];

            string imageKey = string.Format("{0}{1}", "ImageKey_", id);
            if (HttpContext.Cache[imageKey] != null)
            {
                object imgObj = HttpContext.Cache[imageKey];
                if (imgObj.GetType() == typeof(byte[]))
                    image = (byte[])imgObj;
                else if (imgObj.GetType() == typeof(Bitmap))
                {
                    using (Image tempImage = (Image)imgObj)
                    {
                        image = ImageHelper.ImageToByteArray(tempImage, string.Empty, null);
                    }
                }
            }

            return image;
        }

        public void SavePhoto(string imgId)
        {
            SignupClient common = new SignupClient();

            byte[] img = null;
            if (!string.IsNullOrEmpty(imgId))
            {
                var imgHandler = new ImageHandler();
                img = imgHandler.GetImage(imgId, System.Web.HttpContext.Current);
                SignUpWCF.User user = new SignUpWCF.User();
                user.UserId = int.Parse(Session["id"].ToString());
                user.Photo = img;
                sr.User = user;
                common.UpdateUserPhoto(sr);
            }
        }

        [SessionExpireFilter]
        public JsonResult AddYammerMemberToSession(string fname, string lname, string emailId, string poe, int designationId, string designationTitle)
        {
            //Removing Previous Records
            if (Session["YammerMembers"] != null)
            {
                var removeprevRecords = (UserPOEMapping[])Session["YammerMembers"];
                var removeUserid = (from v in removeprevRecords where v.User.EmailAddress != emailId select v).ToArray();
                Session["YammerMembers"] = removeUserid;
            }
            //Add the Current Records
            var poelist = poe.Split('%');
            var sesiondata = (UserPOEMapping[])Session["YammerMembers"];
            foreach (var s in poelist)
            {
                UserPOEMapping newuser = new UserPOEMapping();
                newuser.User = new SignUpWCF.User() { FirstName = fname, LastName = lname, EmailAddress = emailId, YammerToken = "0" };
                newuser.POE = new SignUpWCF.POE() { POEId = Convert.ToInt32(s) };
                newuser.Designation = new SignUpWCF.Designation() { Level = designationId, Name = designationTitle };
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

                Session["YammerMembers"] = sesiondata;
            }
            var groups = sesiondata.GroupBy(sdata => sdata.Designation.Level).ToList();
            return JsonResponse(groups);
        }

        [SessionExpireFilter]
        public JsonResult CancelYammerUser(string emailId)
        {
            UserPOEMapping[] sesiondata = (UserPOEMapping[])Session["YammerMembers"];
            if (sesiondata != null)
            {
                sesiondata = (from v in sesiondata where v.User.EmailAddress != emailId select v).ToArray();
            }

            Session["YammerMembers"] = sesiondata;
            return JsonResponse(sesiondata);
        }

        [SessionExpireFilter]
        public JsonResult GetOwnNetwork()
        {
            var common = new CommonClient();
            var commonSignup = new SignupClient();
            if (Session["emailid"] != null)
            {
                var ownsub = common.GetOwnNetwork(Session["emailid"].ToString());
                if (ownsub != null)
                {
                    Session["subid"] = ownsub.Subscriptionid;
                    var network = commonSignup.GetNetworkById(ownsub.Subscriptionid);
                    Session["network"] = network;
                }
                return JsonResponse(ownsub);
            }
            else
            {
                return null;
            }
        }

        [SessionExpireFilter]
        public JsonResult OwnNetworkUser()
        {
            var common = new CommonClient();
            var commonSignup = new SignupClient();
            if (Session["emailid"] != null)
            {
                var ownsub = common.GetOwnNetwork(Session["emailid"].ToString());

                return JsonResponse(ownsub);
            }
            else
            {
                return null;
            }
        }
    }

    public class NetworkYammerDetail
    {
        public int Usercount { get; set; }

        public int Planid { get; set; }

        public int yammerUserCount { get; set; }
    }
}