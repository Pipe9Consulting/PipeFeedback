using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.AuthenticationWCF;
using bExcellent.mvc.CommonWCF;
using bExcellent.mvc.Models;
using bExcellent.mvc.SignUpWCF;
using bExcellent.mvc.Uploadify;
using MS.Internal.Xml.XPath;
using Newtonsoft.Json;

namespace bExcellent.mvc.Controllers
{
    public class YammerController : Controller
    {
        //
        // GET: /Yammer/

        /*   public ActionResult YammerLogin()
           {
               //return View();
           }*/

        private JsonResult JsonResponse(object s)
        {
            if (Request.RequestType == "GET")
                return Json(s, JsonRequestBehavior.AllowGet);
            else
                return Json(s);
        }

        public void getYammer()
        {
            // PostVideoOnWall();
            Response.Redirect("https://www.yammer.com/dialog/oauth?client_id=" + ConfigurationManager.AppSettings["yammerclientid"] + "&redirect_uri=" + ConfigurationManager.AppSettings["yammerreturnurl"]);
        }

        public ActionResult GetYammerVal(String access_token)
        {
            var httpWebRequest =
                    (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/users/current.json");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Set("Authorization", "Bearer " + access_token);
            httpWebRequest.Method = "GET";

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var primaryEmail = "";
                var result = streamReader.ReadToEnd();
                dynamic stuff = JsonConvert.DeserializeObject(result);
                foreach (var emailadress in stuff.contact.email_addresses)
                {
                    if (emailadress.type != "primary") continue;
                    ViewBag.email = "Email ID From Yammer :: " + emailadress.type + " :: " + emailadress.address;
                    primaryEmail = emailadress.address;
                }
                var signupclass = new SignupClient();
                var checkmail = true;
                var authentication = new AuthenticationClient();
                if (authentication.AuthenticateUserWithUserName(primaryEmail) == null)
                    checkmail = false;
                //check email exists
                TempData["yammeremail"] = primaryEmail;
                TempData["YammerToken"] = access_token;
                var yammerData = new YammerContent();
                yammerData.FirstName = stuff.first_name.Value;
                yammerData.LastName = stuff.last_name.Value;
                yammerData.EmailId = primaryEmail;
                yammerData.AccesToken = access_token;
                Session["YammerSignUp"] = yammerData;
                if (checkmail)
                {
                    signupclass.UpdateAcessToken(primaryEmail, yammerData.AccesToken.ToString());
                    return RedirectToAction("YammerLogin", "home");
                }

                //New Login for yammer
                var user = new SignUpWCF.User();
                var network1 = new SignUpWCF.Network();
                var networkname = stuff.network_name.Value;
                var companyName = "";
                if (stuff.previous_companies.Count != 0)
                {
                    companyName = stuff.previous_companies[0].employer.Value;
                }

                user.FirstName = yammerData.FirstName;
                user.LastName = yammerData.LastName;
                user.CompanyName = companyName;
                user.EmailAddress = yammerData.EmailId;
                user.Password = "Pass@123";
                user.YammerToken = yammerData.AccesToken;
                var image = stuff.mugshot_url;
                var webClient = new WebClient();
                byte[] imageBytes = webClient.DownloadData(image.Value);
                user.Photo = imageBytes;
                Session["domain"] = user.EmailAddress.Split('@')[1];
                var country = new SignUpWCF.Country();
                country.Id = 0;
                user.Country = country;
                const int plan = 0;
                network1.EmailId = yammerData.EmailId;
                network1.NetworkName = networkname + "-" + yammerData.FirstName + " " + yammerData.LastName;
                network1.Plan = plan;
                var sr = new SignupRequest { Netwrok = network1, User = user };
                Session["user"] = user;
                Session["network"] = network1;
                Session["userPhoto"] = image.Value;
                Session["Mode"] = 0;
                sr.User = (SignUpWCF.User)Session["user"];
                sr.Netwrok = (SignUpWCF.Network)Session["network"];
                sr.Payment = (Payment)Session["payment"];
                sr.Mode = int.Parse(Session["Mode"].ToString());
                sr.Members = (SignUpWCF.UserPOEMapping[])Session["Members"];
                sr.Poes = (SignUpWCF.POE[])Session["SubscribedPoes"];
                var signupClient = new SignupClient();
                signupClient.SignUp(sr);
                //return Redirect("../Signup/Poelibrary?location=new");
                return JsonResponse(stuff);
            }
            //string primaryEmail = "";
            //String URL = "https://www.yammer.com/oauth2/access_token.json?client_id=" + ConfigurationManager.AppSettings["yammerclientid"] + "&client_secret=" + ConfigurationManager.AppSettings["yammersecret"] + "&code=" + code;
            //WebClient web = new WebClient();
            //var json = web.DownloadString(URL);
            //dynamic stuff = JsonConvert.DeserializeObject(json);
            //ViewBag.jsonstring = json;
            //ViewBag.content = "Access Token :: " + stuff.access_token.token;
            //foreach (dynamic emailadress in stuff.user.contact.email_addresses)
            //{
            //    if (emailadress.type == "primary")
            //    {
            //        ViewBag.email = "Email ID From Yammer :: " + emailadress.type + " :: " + emailadress.address;
            //        primaryEmail = emailadress.address;
            //    }
            //}

            //SignupClient signupclass = new SignupClient();
            //var checkmail = true;
            //AuthenticationClient authentication = new AuthenticationClient();
            //if (authentication.AuthenticateUserWithUserName(primaryEmail) == null)
            //    checkmail = false;
            ////check email exists
            //TempData["yammeremail"] = primaryEmail;
            //TempData["YammerToken"] = stuff.access_token.token;
            //var yammerData = new YammerContent();
            //yammerData.FirstName = stuff.user.first_name;
            //yammerData.LastName = stuff.user.last_name;
            //yammerData.EmailId = primaryEmail;
            //yammerData.AccesToken = stuff.access_token.token;

            //if (checkmail)
            //{
            //    signupclass.UpdateAcessToken(primaryEmail, yammerData.AccesToken.ToString());
            //    return RedirectToAction("YammerLogin", "home");
            //}
            //else
            //{
            //    Session["YammerSignUp"] = yammerData;
            //    //New Login for yammer
            //    var user = new SignUpWCF.User();
            //    var network1 = new SignUpWCF.Network();
            //    var networkname = stuff.network.name.Value;
            //    var companyName = "";
            //    if (stuff.user.previous_companies.Count != 0)
            //    {
            //        companyName = stuff.user.previous_companies[0].employer.Value;
            //    }

            //    user.FirstName = yammerData.FirstName;
            //    user.LastName = yammerData.LastName;
            //    user.CompanyName = companyName;
            //    user.EmailAddress = yammerData.EmailId;
            //    user.Password = "Pass@123";
            //    user.YammerToken = yammerData.AccesToken;
            //    var image = stuff.user.mugshot_url;
            //    var webClient = new WebClient();
            //    byte[] imageBytes = webClient.DownloadData(image.Value);
            //    user.Photo = imageBytes;
            //    Session["domain"] = user.EmailAddress.Split('@')[1];
            //    var country = new SignUpWCF.Country();
            //    country.Id = 0;
            //    user.Country = country;
            //    var plan = 0;
            //    network1.EmailId = yammerData.EmailId;
            //    network1.NetworkName = networkname + "-" + yammerData.FirstName + " " + yammerData.LastName;
            //    network1.Plan = plan;
            //    SignupRequest sr = new SignupRequest();
            //    sr.Netwrok = network1;
            //    sr.User = user;
            //    Session["user"] = user;
            //    Session["network"] = network1;
            //    Session["userPhoto"] = image.Value;
            //    return Redirect("../Signup/Poelibrary?location=new");
            //}

            //return View();
        }

        [SessionExpireFilter]
        public ActionResult getCode(String code)
        {
            var primaryEmail = "";
            String URL = "https://www.yammer.com/oauth2/access_token.json?client_id=" + ConfigurationManager.AppSettings["yammerclientid"] + "&client_secret=" + ConfigurationManager.AppSettings["yammersecret"] + "&code=" + code;
            var web = new WebClient();
            var json = web.DownloadString(URL);
            dynamic stuff = JsonConvert.DeserializeObject(json);
            ViewBag.jsonstring = json;
            ViewBag.content = "Access Token :: " + stuff.access_token.token;
            foreach (var emailadress in stuff.user.contact.email_addresses)
            {
                if (emailadress.type != "primary") continue;
                ViewBag.email = "Email ID From Yammer :: " + emailadress.type + " :: " + emailadress.address;
                primaryEmail = emailadress.address;
            }

            var signupclass = new SignupClient();
            var checkmail = true;
            var authentication = new AuthenticationClient();
            if (authentication.AuthenticateUserWithUserName(primaryEmail) == null)
                checkmail = false;
            //check email exists
            TempData["yammeremail"] = primaryEmail;
            TempData["YammerToken"] = stuff.access_token.token;
            var yammerData = new YammerContent
                                 {
                                     FirstName = stuff.user.first_name,
                                     LastName = stuff.user.last_name,
                                     EmailId = primaryEmail,
                                     AccesToken = stuff.access_token.token
                                 };
            Session["YammerSignUp"] = yammerData;
            if (checkmail)
            {
                signupclass.UpdateAcessToken(primaryEmail, yammerData.AccesToken.ToString());
                return RedirectToAction("YammerLogin", "home");
            }
            Session["YammerSignUp"] = yammerData;
            //New Login for yammer
            var user = new SignUpWCF.User();
            var network1 = new SignUpWCF.Network();
            var networkname = stuff.network.name.Value;
            var companyName = "";
            if (stuff.user.previous_companies.Count != 0)
            {
                companyName = stuff.user.previous_companies[0].employer.Value;
            }

            user.FirstName = yammerData.FirstName;
            user.LastName = yammerData.LastName;
            user.CompanyName = companyName;
            user.EmailAddress = yammerData.EmailId;
            user.Password = "Pass@123";
            user.YammerToken = yammerData.AccesToken;
            var image = stuff.user.mugshot_url;
            var webClient = new WebClient();
            byte[] imageBytes = webClient.DownloadData(image.Value);
            user.Photo = imageBytes;
            Session["domain"] = user.EmailAddress.Split('@')[1];
            var country = new SignUpWCF.Country { Id = 0 };
            user.Country = country;
            const int plan = 1;
            network1.EmailId = yammerData.EmailId;
            network1.NetworkName = networkname + "-" + yammerData.FirstName + " " + yammerData.LastName;
            network1.Plan = plan;
            var sr = new SignupRequest { Netwrok = network1, User = user };
            Session["user"] = user;
            Session["network"] = network1;
            Session["userPhoto"] = image.Value;
            Session["Mode"] = 0;
            sr.User = (SignUpWCF.User)Session["user"];
            sr.Netwrok = (SignUpWCF.Network)Session["network"];
            sr.Payment = (SignUpWCF.Payment)Session["payment"];
            sr.Mode = int.Parse(Session["Mode"].ToString());
            sr.Members = (SignUpWCF.UserPOEMapping[])Session["Members"];
            sr.Poes = (SignUpWCF.POE[])Session["SubscribedPoes"];
            var signupClient = new SignupClient();
            signupClient.SignUp(sr);
            return RedirectToAction("YammerLogin", "home");
            //return Redirect("../Signup/Poelibrary?location=new");

            return View();
        }

        public void BackToSite(int id)
        {
            Response.Redirect("../Signup/Register");
        }

        public RedirectToRouteResult SignupPageRedirect()
        {
            return RedirectToAction("Register", "Signup");
            //Response.Redirect("home/home");
        }

        public JsonResult SaveYammerContent(string text, string subject, string imageurl)
        {
            var imageCount = imageurl.Split('@');
            string returnVal = string.Empty;
            var count = 0;
            text = text.Replace("\r\n", "*");
            var textSplit = text.Split('*');
            var user = (SignUpWCF.User)Session["user"];
            if (user.YammerToken == null || user.YammerToken == "0")
            {
                returnVal = "gettoken";
            }
            else
            {
                count = count + 1;
                for (var i = 0; i < imageCount.Count(); i++)
                {
                    var image = imageCount[i].Replace("../../Images", ConfigurationManager.AppSettings["HostingPrefix"] + "/images/yammer");

                    if (image == "" || image == "null")
                    {
                        image = ConfigurationManager.AppSettings["HostingPrefix"] + "/images/yammer/icon.png";
                    }
                    var common = new CommonClient();
                    common.InsertYammerContent(user.EmailAddress, null, image, subject, null, textSplit[0], user.YammerToken);
                    returnVal = count.ToString();
                }
            }

            return JsonResponse(returnVal);
        }

        public JsonResult SaveYammerContentForGroup(string text, string subject, string imageurl, string groupid, string groupName)
        {
            var splitGroup = groupid.Split('%');
            var grpname = groupName.Split('%');
            string[] imageCount = new[] { "" };
            if (imageurl != null)
            {
                imageCount = imageurl.Split('@');
            }
            text = text.Replace("\r\n", "*");
            var textSplit = text.Split('*');
            var user = (SignUpWCF.User)Session["user"];
            var subject1 = "";
            for (var j = 0; j < splitGroup.Count(); j++)
            {
                for (var i = 0; i < imageCount.Count(); i++)
                {
                    var image = imageCount[i].Replace("../../Images",
                                                     ConfigurationManager.AppSettings["HostingPrefix"] +
                                                     "/images/yammer");
                    if (image == "")
                    {
                        image = ConfigurationManager.AppSettings["HostingPrefix"] + "/images/yammer/icon.png";
                    }
                    subject1 = subject + "(This message was posted by " + user.FirstName + " " + user.LastName +
                               " to " + grpname[j] + " group)";
                    var common = new CommonClient();
                    common.InsertYammerContent(user.EmailAddress, null, image, subject1, splitGroup[j], textSplit[0], user.YammerToken);
                }
            }
            return JsonResponse(2);
        }

        [HttpPost]
        public JsonResult PostOpenGraph(string text, string subject, string imageurl)
        {
            var imageCount = imageurl.Split('@');
            string returnVal = string.Empty;
            var count = 0;
            text = text.Replace("\r\n", "*");
            var textSplit = text.Split('*');
            var user = (SignUpWCF.User)Session["user"];
            if (user.YammerToken == null || user.YammerToken == "0")
            {
                returnVal = "gettoken";
            }
            else
            {
                count = count + 1;
                for (var i = 0; i < imageCount.Count(); i++)
                {
                    var span = new TimeSpan(DateTime.Now.GetHashCode());
                    var timestamp = span.GetHashCode();

                    var image = imageCount[i].Replace("../../Images", ConfigurationManager.AppSettings["HostingPrefix"] + "/images/yammer");
                    var httpWebRequest =
                        (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/activity.json");
                    httpWebRequest.ContentType = "application/json";
                    httpWebRequest.Headers.Set("Authorization", "Bearer " + user.YammerToken + "");
                    httpWebRequest.Method = "POST";
                    var cononicalurl = ConfigurationManager.AppSettings["HostingPrefix"] + "/yammer/BackToSite?id=" + timestamp;
                    using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                    {
                        if (image == "")
                        {
                            image = ConfigurationManager.AppSettings["HostingPrefix"] + "/images/yammer/icon.png";
                        }

                        var objects = new YammerObject();
                        var actor = new YammerActor();
                        var activity = new YammerActivity();
                        var yammerOuth = new YammerOath();
                        objects.url = cononicalurl;
                        objects.title = subject;
                        objects.image = image;
                        objects.description = textSplit[0];
                        actor.email = user.EmailAddress;
                        activity.action = "create";
                        activity.message = "";
                        activity.Object = objects;
                        activity.actor = actor;
                        yammerOuth.activity = activity;
                        var json = new JavaScriptSerializer().Serialize(yammerOuth);
                        var final = json.Replace("Object", "object");

                        //var json =
                        //    "{ \"activity\": { \"actor\": { \"email\": \"" + user.EmailAddress + "\" },\"action\": \"create\", \"object\": { \"url\": \"" +
                        //    cononicalurl + "\", \"title\": \"" + subject +
                        //    "\", \"image\": \"" + image + "\", \"description\":\"" +
                        //    textSplit[0] +
                        //    "\" }, \"message\":  \"" + text + "\", \"users\": []} }";
                        streamWriter.Write(final);
                        streamWriter.Flush();
                        streamWriter.Close();
                        Thread.Sleep(1000);
                    }
                    var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                    using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                    {
                        streamReader.ReadToEnd();
                    }

                    PostOnWall(cononicalurl, text, subject, user.YammerToken);
                    returnVal = count.ToString();
                }
            }

            return JsonResponse(returnVal);
        }

        public JsonResult GetYammerGroupidNetwork()
        {
            var user = (SignUpWCF.User)Session["user"];
            var token = user.YammerToken;
            var common = new CommonClient();
            var returnValue = common.GetMySubscription(Session["emailid"].ToString()).FirstOrDefault();

            if (token != "0" && returnValue != null)
            {
                var httpWebRequest =
                    (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/groups.json?mine=1");
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Set("Authorization", "Bearer " + token);
                httpWebRequest.Method = "GET";

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();
                    var objs = JsonConvert.DeserializeObject(result);

                    var grouplist = (from p in (IEnumerable<dynamic>)objs
                                     select
                                         new YammerGroup { GroupName = p.full_name, Groupid = p.id, GroupImage = p.mugshot_url }).
                        ToList();
                    return JsonResponse(grouplist);
                }
            }
            else
            {
                if (returnValue == null)
                {
                    //SignupPageRedirect();
                    return JsonResponse("1");
                }
                return null;
            }
        }

        /// <summary>
        /// Get the Groupid's for the selected token
        /// </summary>
        /// <param name="token"> yammer token</param>
        public JsonResult GetYammerGroupid()
        {
            var user = (SignUpWCF.User)Session["user"];
            var token = user.YammerToken;
            CommonClient common = new CommonClient();
            //var returnValue = common.GetMySubscription(Session["emailid"].ToString()).FirstOrDefault();
            if (token != "0")
            {
               
                var httpWebRequest =
                    (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/groups.json?mine=1");
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Set("Authorization", "Bearer " + token);
                httpWebRequest.Method = "GET";
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();
                    var objs = JsonConvert.DeserializeObject(result);

                    var grouplist = (from p in (IEnumerable<dynamic>)objs
                                     select
                                         new YammerGroup { GroupName = p.full_name, Groupid = p.id, GroupImage = p.mugshot_url }).
                        ToList();
                    return JsonResponse(grouplist);
                }
            }
            else
            {
                return null;
            }
        }
       

        /// <summary>
        /// Get yammer Groups Userid's(collections)
        /// </summary>
        /// <param name="token">Yammer token</param>
        /// <param name="ids"> UserId</param>
        public JsonResult GetYammerGroup(int ids)
        {
            Session["YammerGroupList"] = null;
            SignupClient getalluser = new SignupClient();
            var networkdata = getalluser.GetMyAllUsers(int.Parse(Session["id"].ToString()),

                                  int.Parse(Session["subid"].ToString()));
            var user = (SignUpWCF.User)Session["user"];
            var token = user.YammerToken;
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/users/in_group/" + ids + ".json");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Set("Authorization", "Bearer " + token);
            httpWebRequest.Method = "GET";

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var json = streamReader.ReadToEnd();
                dynamic stuff = JsonConvert.DeserializeObject(json);
                var usersList = stuff.users;

                var userIds = (from p in (IEnumerable<dynamic>)usersList select p.id).ToList();
                foreach (var userId in userIds)
                {
                    GetYammerGroupUserList(token, (int)userId.Value);
                    System.Threading.Thread.Sleep(800);
                }
            }

            var yammergrouplist = (List<YammerGroupList>)Session["YammerGroupList"];

            //For Already Subscribe users in the list

            foreach (var poeMapping in networkdata)
            {
                var nwuser = yammergrouplist.FirstOrDefault(a => a.EmailAddress == poeMapping.User.EmailAddress);
                if (nwuser != null)
                    yammergrouplist.Remove(nwuser);
            }

            /* for (var i = 0; i < yammergrouplist.Count(); i++)
             {
                 for (var j = 0; j < networkdata.Count(); j++)
                 {
                     if (networkdata[j].User.EmailAddress == yammergrouplist[i].EmailAddress)
                     {
                         var
                         yammergrouplist.Remove((from v in yammergrouplist where v.EmailAddress != yammergrouplist[i].EmailAddress select v).FirstOrDefault());
                         //yammergrouplist =(from v in yammergrouplist where v.EmailAddress != yammergrouplist[i].EmailAddress select v).ToList();
                     }
                 }
             }*/
            //For the Subscribed user
            for (var i = 0; i < yammergrouplist.Count(); i++)
            {
                if (yammergrouplist[i].EmailAddress == user.EmailAddress)
                {
                    yammergrouplist =
                       (from v in yammergrouplist where v.EmailAddress != yammergrouplist[i].EmailAddress select v).ToList();
                }
            }
            Session["YammerGroupList"] = yammergrouplist;
            return JsonResponse(Session["YammerGroupList"]);
        }

        /// <summary>
        /// Get the Yammer Group members by ID
        /// </summary>
        /// <param name="token">Yammer token</param>
        /// <param name="ids"> UserId</param>
        public List<YammerGroupList> GetYammerGroupUserList(string token, int ids)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/users/" + ids + ".json");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Set("Authorization", "Bearer " + token);
            httpWebRequest.Method = "GET";
            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var json = streamReader.ReadToEnd();
                dynamic stuff = JsonConvert.DeserializeObject(json);
                var primaryEmail = string.Empty;
                foreach (dynamic emailadress in stuff.contact.email_addresses)
                {
                    if (emailadress.type == "primary")
                    {
                        primaryEmail = emailadress.address;
                    }
                }
                var firstName = (string)stuff.first_name.Value;
                var lastName = (string)stuff.last_name.Value;
                var image = (string)stuff.mugshot_url.Value;
                var yammerList = (List<YammerGroupList>)Session["YammerGroupList"];
                List<YammerGroupList> users = new List<YammerGroupList>
                                                  {
                                                     new YammerGroupList()
                                                         {
                                                             FirstName=firstName,
                                                             LastNAme=lastName,
                                                             EmailAddress=primaryEmail,
                                                             ImageUrl=image
                                                         }
                                                  }.ToList();

                if (yammerList != null)
                {
                    var allProducts = users.Concat(yammerList);
                    Session["YammerGroupList"] = allProducts.ToList();
                }
                else
                {
                    Session["YammerGroupList"] = users.ToList();
                }
            }
            return null;
        }

        public JsonResult GetYammerUsersList()
        {
            Session["YammerGroupList"] = null;
            SignupClient getalluser = new SignupClient();
            var networkdata = getalluser.GetMyAllUsers(int.Parse(Session["id"].ToString()),

                                  int.Parse(Session["subid"].ToString()));
            var user = (SignUpWCF.User)Session["user"];
            var token = user.YammerToken;
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/users.json");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Set("Authorization", "Bearer " + token);
            httpWebRequest.Method = "GET";
            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var json = streamReader.ReadToEnd();
                dynamic stuff = JsonConvert.DeserializeObject(json);
                var primaryEmail = string.Empty;

                for (var t = 0; t < stuff.Count; t++)
                {
                    foreach (dynamic emailadress in stuff[t].contact.email_addresses)
                    {
                        if (emailadress.type == "primary")
                        {
                            primaryEmail = emailadress.address;
                        }
                    }
                    var firstName = (string)stuff[t].first_name.Value;
                    var lastName = (string)stuff[t].last_name.Value;
                    var image = (string)stuff[t].mugshot_url.Value;
                    var yammerList = (List<YammerGroupList>)Session["YammerGroupList"];
                    List<YammerGroupList> users = new List<YammerGroupList>
                                                  {
                                                     new YammerGroupList()
                                                         {
                                                             FirstName=firstName,
                                                             LastNAme=lastName,
                                                             EmailAddress=primaryEmail,
                                                             ImageUrl=image
                                                         }
                                                  }.ToList();

                    if (yammerList != null)
                    {
                        var allProducts = users.Concat(yammerList);
                        Session["YammerGroupList"] = allProducts.ToList();
                    }
                    else
                    {
                        Session["YammerGroupList"] = users.ToList();
                    }
                }
                var yammergrouplist = (List<YammerGroupList>)Session["YammerGroupList"];
                //For Already Subscribe users in the list
                var data = new List<YammerGroupList>();
                for (var i = 0; i < yammergrouplist.Count(); i++)
                {
                    for (var j = 0; j < networkdata.Count(); j++)
                    {
                        if (yammergrouplist[i].EmailAddress.Replace(" ", string.Empty) == networkdata[j].User.EmailAddress)
                        {
                            yammergrouplist =
                              (from v in yammergrouplist where v.EmailAddress != yammergrouplist[i].EmailAddress select v).ToList();
                        }
                    }
                }
                //For the Subscribed user
                for (var i = 0; i < yammergrouplist.Count(); i++)
                {
                    if (yammergrouplist[i].EmailAddress == user.EmailAddress)
                    {
                        yammergrouplist =
                           (from v in yammergrouplist where v.EmailAddress != yammergrouplist[i].EmailAddress select v).ToList();
                    }
                }
                Session["YammerGroupList"] = yammergrouplist;
            }
            return JsonResponse(Session["YammerGroupList"]);
        }

        /// <summary>
        /// Post on Group
        /// </summary>

        /// <param name="text"></param>
        /// <param name="subject"></param>
        /// <param name="groupid"></param>
        public void PostOnGroupWall(string text, string subject, string groupid, string imageurl, string groupName)
        {
            var splitGroup = groupid.Split('%');
            var grpname = groupName.Split('%');
            string[] imageCount = new[] { "" };
            if (imageurl != null)
            {
                imageCount = imageurl.Split('@');
            }

            text = text.Replace("\r\n", "*");
            var textSplit = text.Split('*');
            var user = (SignUpWCF.User)Session["user"];
            var subject1 = "";
            for (var j = 0; j < splitGroup.Count(); j++)
            {
                for (var i = 0; i < imageCount.Count(); i++)
                {
                    var span = new TimeSpan(DateTime.Now.GetHashCode());
                    var timestamp = span.GetHashCode();

                    var image = imageCount[i].Replace("../../Images",
                                                      ConfigurationManager.AppSettings["HostingPrefix"] +
                                                      "/images/yammer");
                    var httpWebRequest =
                        (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/activity.json");
                    httpWebRequest.ContentType = "application/json";
                    httpWebRequest.Headers.Set("Authorization", "Bearer " + user.YammerToken + "");
                    httpWebRequest.Method = "POST";

                    string cononicalurl = ConfigurationManager.AppSettings["HostingPrefix"] + "/yammer/BackToSite?id=" +
                                          timestamp;
                    using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                    {
                        // from = "I have received a badge/Medal";
                        if (image == "")
                        {
                            image = ConfigurationManager.AppSettings["HostingPrefix"] + "/images/yammer/icon.png";
                            //subject = subject + "(This message was posted by " + user.FirstName + " " + user.LastName + " to " + grpname[j] + " group)";
                            //textSplit[1] = "";
                        }

                        subject1 = subject + "(This message was posted by " + user.FirstName + " " + user.LastName +
                                   " to " + grpname[j] + " group)";
                        var objects = new YammerObject();
                        var actor = new YammerActor();
                        var activity = new YammerActivity();
                        var yammerOuth = new YammerOath();
                        objects.url = cononicalurl;
                        objects.title = subject1;
                        objects.image = image;
                        objects.description = textSplit[0];
                        actor.email = user.EmailAddress;
                        activity.action = "create";
                        activity.message = "";
                        activity.Object = objects;
                        activity.actor = actor;
                        yammerOuth.activity = activity;
                        var json = new JavaScriptSerializer().Serialize(yammerOuth);
                        var final = json.Replace("Object", "object");
                        streamWriter.Write(final);
                        streamWriter.Flush();
                        streamWriter.Close();

                        // var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                        HttpWebResponse httpResponse = null;
                        try
                        {
                            httpResponse = getYammerResponse(httpWebRequest);
                        }
                        catch (Exception e)
                        {
                            httpResponse = getYammerResponse(httpWebRequest);
                        }
                        if (httpResponse != null)
                            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                            {
                                streamReader.ReadToEnd();
                            }

                        PostOnGroups(cononicalurl, text, subject1, user.YammerToken, int.Parse(splitGroup[j]));
                    }
                    Thread.Sleep(500);
                }
            }

            //return JsonResponse(returnVal);
        }

        private HttpWebResponse getYammerResponse(HttpWebRequest httpWebRequest)
        {
            HttpWebResponse httpResponse = null;
            try
            {
                httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            }
            catch (Exception ex)
            {
                httpResponse = getYammerResponse(httpWebRequest);
                // throw ex;
            }
            return httpResponse;
        }

        /// <summary>
        /// Post in Group Members
        /// </summary>
        /// <param name="cononicalurl"></param>
        /// <param name="text"></param>
        /// <param name="subject"></param>
        /// <param name="token"></param>
        /// <param name="groupid"></param>
        public void PostOnGroups(String cononicalurl, string text, string subject, string token, int groupid)
        {
            ////

            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/messages.json?group_id=" + groupid);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Set("Authorization", "Bearer " + token);
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json;
                if (cononicalurl == "")
                {
                    json = "{\"Body\":\"\"}";
                }
                else
                {
                    json = "{\"Body\":\"" + text + "\",\"group_id\":\"" + groupid + "\",\"og_url\":\"" + cononicalurl + "\",\"og_title\":\"" + text + "\",\"og_description\":\"These are the latest Run DMC shoes. Preorder now\"}";
                }
                //   string json = "{ \"activity\": { \"actor\": { \"name\": \"sankar\", \"email\": \"sankar@tillidsoft.com\" },\"action\": \"create\", \"object\": { \"url\": \"https://www.bexcellent.com\", \"title\": \"I have Received a Badge\", \"image\": \"http://demo.bexcellent.com/images/gold-medal-recieved.png\", \"description\": \"You are Appreciated\" }, \"message\": \"Test from open graph!\", \"users\": [{ \"name\": \"venkat\", \"email\": \"venkat@tillidsoft.com\"}]} }";
                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
                //Thread.Sleep(1500);
            }
            // var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            HttpWebResponse httpResponse = null;
            try
            {
                httpResponse = getYammerResponse(httpWebRequest);
            }
            catch (Exception e)
            {
                httpResponse = getYammerResponse(httpWebRequest);
            }
            if (httpResponse != null)
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    streamReader.ReadToEnd();
                }
            /*  try
              {
                  var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                  using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                  {
                      var result = streamReader.ReadToEnd();
                  }
              }
              catch (Exception)
              {
                  Thread.Sleep(1000);
                  if ((HttpWebResponse)httpWebRequest.GetResponse() != null)
                  {
                      var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                  }
              }*/

            // return View();
        }

        private void PostOnWall(String cononicalurl, string text, string subject, string token)
        {
            ////

            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/messages.json");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Set("Authorization", "Bearer " + token);
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json;
                if (cononicalurl == "")
                {
                    json = "{\"Body\":\"\"}";
                }
                else
                {
                    json = "{\"Body\":\"" + text + "\", \"title\":\" " + subject + "\", \"og_url\":\"" + cononicalurl + "\"}";
                }
                //   string json = "{ \"activity\": { \"actor\": { \"name\": \"sankar\", \"email\": \"sankar@tillidsoft.com\" },\"action\": \"create\", \"object\": { \"url\": \"https://www.bexcellent.com\", \"title\": \"I have Received a Badge\", \"image\": \"http://demo.bexcellent.com/images/gold-medal-recieved.png\", \"description\": \"You are Appreciated\" }, \"message\": \"Test from open graph!\", \"users\": [{ \"name\": \"venkat\", \"email\": \"venkat@tillidsoft.com\"}]} }";
                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
                Thread.Sleep(300);
            }
            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                streamReader.ReadToEnd();
            }

            /////

            // return View();
        }

        private void PostVideoOnWall()
        {
            var httpWebRequest =
                       (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/activity.json");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Set("Authorization", "Bearer mzs5NiEwfdjIPMdxuNsoA");
            httpWebRequest.Method = "POST";
            var span = new TimeSpan(DateTime.Now.GetHashCode());
            var timestamp = span.GetHashCode();
            string cononicalurl = "http://demo.bexcellent.com/Video/Nicksabans.flv";
            string img = "http://demo.bexcellent.com/images/always.png";
            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json =
                    "{ \"activity\": { \"actor\": {\"name\": \"Jim Patterson\",\"email\": \"pratheesh@tillidsoft.com\"}, \"action\": \"create\", \"object\": { \"type\": \"video\",\"url\": \"" + cononicalurl + "\", \"description\": \"A set of charts showing the ROI of deploying Yammer over time.\", \"video\": { \"width\": 500, \"height\": 400 }, \"type\":\"video\"}, \"private\": \"false\", \"message\": \"This is the updated version for the conference.\", \"users\": [ ] } }";
                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                streamReader.ReadToEnd();
                PostVideoOnWall(cononicalurl, "sample text", "test video", "mzs5NiEwfdjIPMdxuNsoA");
            }

            /////

            //return JsonResponse(returnVal);
        }

        public void PostVideoOnWall(String cononicalurl, string text, string subject, string token)
        {
            ////

            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/messages.json");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Set("Authorization", "Bearer " + token);
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json;
                if (cononicalurl == "")
                {
                    json = "{\"Body\":\"\"}";
                }
                else
                {
                    json = "{\"Body\":\"" + text + "\", \"title\":\" " + subject + "\", \"og_url\":\"" + cononicalurl + "\"}";
                }
                //   string json = "{ \"activity\": { \"actor\": { \"name\": \"sankar\", \"email\": \"sankar@tillidsoft.com\" },\"action\": \"create\", \"object\": { \"url\": \"https://www.bexcellent.com\", \"title\": \"I have Received a Badge\", \"image\": \"http://demo.bexcellent.com/images/gold-medal-recieved.png\", \"description\": \"You are Appreciated\" }, \"message\": \"Test from open graph!\", \"users\": [{ \"name\": \"venkat\", \"email\": \"venkat@tillidsoft.com\"}]} }";
                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
                json = "{\"Body\":\"bexcellent Content\", \"title\":\" Bexcellent title\", \"og_url\":\"" + cononicalurl + "\",\"og_title\":\"Bexcellent\",\"og_description\":\"Bexcellent medal an badge\",\"og_site_name\":\"Bexcellent\"}";
            }
            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                streamReader.ReadToEnd();
            }

            /////

            // return View();
        }

        public JsonResult SaveOpenGraphForFeedback(string userEmailIds, int mode)
        {
            var user = (SignUpWCF.User)Session["user"];
            string text = "";
            if (user.YammerToken == null || user.YammerToken == "0")
            {
                return JsonResponse("gettoken");
            }
            else
            {
                var imageName = mode == 0 ? "requestYammer.png" : "giveYammer.png";
                var image = ConfigurationManager.AppSettings["HostingPrefix"] + "/images/yammer" + imageName;
                var subject = mode == 0 ? "Feedback Request" : "Give Feedback";

                string jsonUserEmailId = "";
                string subjectTo = "";
                {
                    var userEmailIdTrim = userEmailIds.Split(',');
                    foreach (string t in userEmailIdTrim)
                    {
                        var authentication = new AuthenticationClient();
                        var returnValue = authentication.AuthenticateUserWithUserName(t);
                        var sendtouser = returnValue.user;
                        if (mode == 0)
                        {
                            text = "Dear " + user.FirstName + " " + user.LastName + ", " + sendtouser.FirstName +
                                   " " + sendtouser.LastName + " has Request you to take a feedback";
                        }
                        else
                        {
                            text = "Dear " + user.FirstName + " " + user.LastName + ", " + sendtouser.FirstName +
                                   " " + sendtouser.LastName + " has Request you to give a feedback";
                        }
                    }
                    //if (userEmailIdTrim != "")
                    //{
                    //}
                }

                subject = subject + " to " + subjectTo;
                var common = new CommonClient();
                common.InsertYammerContent(user.EmailAddress, null, image, subject, null, text, user.YammerToken);
                //Thread.Sleep(1000);
                // }
                //}
            }
            return JsonResponse("posted");
        }
    }

    public class YammerContent
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string AccesToken { get; set; }

        public string EmailId { get; set; }
    }

    public class YammerGroup
    {
        public int Groupid { get; set; }

        public string GroupName { get; set; }

        public string GroupImage { get; set; }
    }

    public class YammerGroupList
    {
        public string FirstName { get; set; }

        public string LastNAme { get; set; }

        public string EmailAddress { get; set; }

        public string ImageUrl { get; set; }
    }
}