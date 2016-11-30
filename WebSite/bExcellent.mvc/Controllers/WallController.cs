using System;
using System.Configuration;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Xml;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.AuthenticationWCF;
using bExcellent.mvc.CommonWCF;
using bExcellent.mvc.Models;
using User = bExcellent.mvc.SignUpWCF.User;

namespace bExcellent.mvc.Controllers
{
    public class WallController : Controller
    {
        //
        // GET: /Wall/
        private string ffmpegPhysicalPath = @"C:\ffmpeg\ffmpeg.exe";

        [SessionExpireFilter]
        public ActionResult Index(int? id)
        {
            id = id ?? 0;
            if (Session["subid"] != null && Session["id"] != null)            
            {
                var commonWcfClient = new CommonWCF.CommonClient();
                var returnValue = commonWcfClient.GetSubscribedUserWall(int.Parse(Session["id"].ToString()),
                                                                        int.Parse(Session["subid"].ToString())).ToList();
                // to insert data for user views
                commonWcfClient.CreateUpdateUserview(int.Parse(Session["id"].ToString()), "WallPageVisit");
                var myactivites =
                    commonWcfClient.GetMyActivities(int.Parse(Session["id"].ToString()),
                                                    int.Parse(Session["subid"].ToString()), (int)id).ToList();

                var filteredActivites =
                    myactivites.Where(item => returnValue.Any(category => category.UserId == int.Parse(item.From)));
                //Session["subid"] = -1;
                ViewBag.MyActivities = filteredActivites.ToArray();

                ViewBag.SourceId = id;
            }
            return View();
        }

        [HttpPost]
        public bool Reply(string useridslist, string batchid, string subject, int usersubids, string comments, HttpPostedFileBase replyFile)
        {
            subject = subject.Replace("Re:", "Re: ");
            try
            {
                bool hasAttachment = false;
                var attachment = string.Empty;
                if (replyFile != null)
                {
                    hasAttachment = true;
                    var name = Path.GetFileName(replyFile.FileName);
                    if (name != null)
                    {
                        var fileName = DateTime.Now.Ticks + name.Replace(" ", "");
                        var path = Path.Combine(Server.MapPath("~/Uploads"), fileName);
                        replyFile.SaveAs(path);
                        attachment = "<div class='filespathrcvd'> file attached</div><a href='/Uploads/" + fileName + "' target='_blank'><img src='/Images/mail_attachment.png' alt='Attach'  class='fileattach'/></a>";
                    }
                }

                var suser = (User)Session["user"];
                if (Session["subid"] != null && Session["id"] != null)
                {
                    string activitycontent = " <div class='recieve' style='height:60px'></div>" + attachment +
                                             " <div class='dt'>" +
                                             CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) +
                                             " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>" +
                                             subject + "</h2>" + "<p class='wallcomment'>Message:&nbsp" + comments +
                                             "</p>";
                    var common = new CommonClient();
                    common.CreateActivity(int.Parse(Session["id"].ToString()), useridslist,
                                          int.Parse(Session["subid"].ToString()),
                                          1, activitycontent);
                    common.SendMailFromWall(3, suser.FirstName + " " + suser.LastName, useridslist, hasAttachment);
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [SessionExpireFilter]
        public ActionResult SyncYammer()
        {
            return View();
        }

        [SessionExpireFilter]
        public ActionResult PostVideos()
        {
            return View();
        }

        [SessionExpireFilter]
        public ActionResult PostAppreciation()
        {
            return View();
        }

        [SessionExpireFilter]
        public JsonResult GetFirstLoginDetails()
        {
            if (Session["subid"] != null && Session["id"] != null)
            {
                var startMode = new StartPagemode
                                    {
                                        Pagemode = Session["FirstLogin"].ToString(),
                                        Userid = int.Parse(Session["id"].ToString())
                                    };
                return JsonResponse(startMode);
            }
            return null;
        }

        private JsonResult JsonResponse(object s)
        {
            return Request.RequestType == "GET" ? Json(s, JsonRequestBehavior.AllowGet) : Json(s);
        }

        [SessionExpireFilter]
        public JsonResult GetMyUsers()
        {
            var common = new CommonClient();
            UserPOEMapping[] returnValue;
            if (Session["subid"] != null && Session["id"] != null)
            {
                returnValue = common.GetNetworksUsersWall(int.Parse(Session["id"].ToString()), 2,
                                                              int.Parse(Session["subid"].ToString()));

                var distinctItems = returnValue.GroupBy(x => x.User.UserId).Select(y => y.First());

                return JsonResponse(distinctItems);
            }
            return null;
        }

        [SessionExpireFilter]
        public JsonResult GetMyUserLists()
        {
            var common = new CommonClient();
            if (Session["subid"] != null && Session["id"] != null)
            {
                var returnValue = common.GetMyAllUsers(int.Parse(Session["id"].ToString()),
                                                       int.Parse(Session["subid"].ToString()));
                return JsonResponse(returnValue.GroupBy(x => x.User.EmailAddress).Select(y => y.First()).ToList());
            }
            return null;
        }


        [SessionExpireFilter]
        public JsonResult GetGoalsShared(int foruserid, int poeid)
        {
            var common = new CommonClient();
            var domain = "%@"+Session["emailid"].ToString().Split('@')[1];
            var returnValue = common.GetGoalsShared(int.Parse(Session["id"].ToString()), foruserid, poeid, int.Parse(Session["subid"].ToString()), domain);
            return JsonResponse(returnValue);
        }

        [HttpPost]
        [ValidateInputAttribute(false)]
        public void SendAppreciation(string userIds, string subject, string appreciation, string comments, string selectedmembersemailids, HttpPostedFileBase replyFile)
        {
            bool hasAttachment = false;
            var attachment = string.Empty;
            if (replyFile != null)
            {
                hasAttachment = true;

                var name = Path.GetFileName(replyFile.FileName);
                if (name != null)
                {
                    var fileName = DateTime.Now.Ticks + name.Replace(" ", "");
                    /*  var fileName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) +
                                 DateTime.Now.Day + DateTime.Now.Year + Path.GetFileName(replyFile.FileName);*/
                    var path = Path.Combine(Server.MapPath("~/Uploads"), fileName);
                    replyFile.SaveAs(path);
                    attachment = "<div class='filespathrcvd'> file attached</div><a href='/Uploads/" + fileName + "' target='_blank'><img src='/Images/mail_attachment.png' alt='Attach' class='fileattach'/></a>";
                }
            }

            var suser = (User)Session["user"];
            subject = subject + " from " + suser.FirstName + " " + suser.LastName;
            var activitycontent = appreciation + attachment + " <div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) + " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>" + subject + "</h2>" + "<p class='wallcomment'>Message: " + comments + "</p>";
            var common = new CommonClient();
            if (Session["subid"] != null && Session["id"] != null)
            {
                common.CreateActivity(int.Parse(Session["id"].ToString()), userIds,
                                      int.Parse(Session["subid"].ToString()),
                                      1, activitycontent);
                common.SendMailFromWall(1, suser.FirstName + " " + suser.LastName, userIds, hasAttachment);
            }
        }

        [HttpPost]
        [ValidateInputAttribute(false)]
        [SessionExpireFilter]
        public void SendAppreciationtoBoth(string userIds, string subject, string appreciation, string comments, string selectedmembersemailids, HttpPostedFileBase replyFile)
        {
            var selectedEmailArray = selectedmembersemailids.Split(';');
            var doc = new XmlDocument();
            doc.LoadXml(appreciation);
            var nodes = doc.DocumentElement.SelectNodes("img");
            var images = nodes.Cast<XmlNode>().Aggregate("", (current, node) => current + node.Attributes["src"].Value + "@");
            var suser = (User)Session["user"];
            subject = subject + " from " + suser.FirstName + " " + suser.LastName;
            if (SaveOpenGraph(comments, subject, images, suser.EmailAddress, selectedEmailArray) != "gettoken")
            {
                var hasAttachment = false;
                var attachment = string.Empty;
                if (replyFile != null)
                {
                    hasAttachment = true;

                    var name = Path.GetFileName(replyFile.FileName);
                    if (name != null)
                    {
                        var fileName = DateTime.Now.Ticks + name.Replace(" ", "");
                        var path = Path.Combine(Server.MapPath("~/Uploads"), fileName);
                        replyFile.SaveAs(path);
                        attachment = "<div class='filespathrcvd'> file attached</div><a href='/Uploads/" + fileName + "' target='_blank'><img src='/Images/mail_attachment.png' alt='Attach' class='fileattach'/></a>";
                    }
                }
                var activitycontent = appreciation + attachment + " <div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) + " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>" + subject + "</h2>" + "<p class='wallcomment'>Message:&nbsp" + comments + "</p>";
                var common = new CommonClient();
                if (Session["subid"] != null && Session["id"] != null)
                {
                    common.CreateActivity(int.Parse(Session["id"].ToString()), userIds,
                                          int.Parse(Session["subid"].ToString()),
                                          1, activitycontent);
                    common.SendMailFromWall(1, suser.FirstName + " " + suser.LastName, userIds, hasAttachment);
                }
            }
        }

        [HttpPost]
        [ValidateInputAttribute(false)]
        [SessionExpireFilter]
        public string SendAppreciationtoYammer(string userIds, string subject, string appreciation, string comments, string selectedmembersemailids, HttpPostedFileBase replyFile)
        {
            string[] selectedEmailArray = selectedmembersemailids.Split(';');

            var doc = new XmlDocument();
            doc.LoadXml(appreciation);
            XmlNodeList nodes = doc.DocumentElement.SelectNodes("img");
            string images = nodes.Cast<XmlNode>().Aggregate("", (current, node) => current + node.Attributes["src"].Value + "@");
            images = images.Remove(images.Length - 1);
            var suser = (User)Session["user"];
            subject = subject + " from " + suser.FirstName + " " + suser.LastName;
            //return PostOpenGraph(comments, subject, images, suser.EmailAddress, selectedEmailArray);
            return SaveOpenGraph(comments, subject, images, suser.EmailAddress, selectedEmailArray);
        }

        [HttpPost]
        [ValidateInputAttribute(false)]
        [SessionExpireFilter]
        public void SendVideo(string userIds, string subject, string comments, string vidlink)
        {
            var suser = (User)Session["user"];
            subject = "New Video Message from " + suser.FirstName + " " + suser.LastName;
            string activitycontent = "<div class='recieve'><img src='../../Images/video-msg.png' width='114' height='62' data-href=" + vidlink + " class='videosimg' /></div>" + "<div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) + " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>" + subject + "</h2>" + "<p class='wallcomment'>Message:&nbsp" + comments + "</p>";
            var common = new CommonClient();
            if (Session["subid"] != null && Session["id"] != null)
            {
                common.CreateActivity(int.Parse(Session["id"].ToString()), userIds,
                                      int.Parse(Session["subid"].ToString()),
                                      3, activitycontent);
                common.SendMailFromWall(2, suser.FirstName + " " + suser.LastName, userIds, false);
            }
        }

        [HttpPost]
        [ValidateInputAttribute(false)]
        public string UploadVideo(HttpPostedFileBase vidfile)
        {
            var retrunString = string.Empty;
            if (vidfile != null)
            {
                var name = Path.GetFileName(vidfile.FileName);
                if (name != null)
                {
                    var fileName = DateTime.Now.Ticks + name.Replace(" ", "");
                    var path = Path.Combine(Server.MapPath("~/Uploads/Video"), fileName);
                    vidfile.SaveAs(path);
                    var flvpath = ConvertToFLV(path);
                    retrunString = Path.GetFileName(flvpath);
                }
            }

            return retrunString;
        }

        [SessionExpireFilter]
        public JsonResult GetUserList(string batchId)
        {
            var currentUserId = Session["Id"].ToString();
            var commonClient = new CommonClient();
            return JsonResponse(commonClient.GetUserList(batchId, int.Parse(currentUserId)));
        }

        private string ConvertToFLV(string phyicalFilePath)
        {
            if (Path.GetExtension(phyicalFilePath).Equals(".flv"))
                return phyicalFilePath;
            else
            {
                var argument = string.Format("-i {0} -vcodec flv -f flv -r 29.97 -s 320x240 -aspect 4:3 -b 300k -g 160 -cmp dct  -subcmp dct  -mbd 2 -flags +aic+cbp+mv0+mv4 -trellis 1 -ac 1 -ar 22050 -ab 56k {1}", phyicalFilePath, Path.ChangeExtension(phyicalFilePath, "flv"));

                ProcessStartInfo process = new ProcessStartInfo(ffmpegPhysicalPath, argument);
                Process proc = new Process();
                proc.StartInfo = process;
                proc.Start();
                proc.WaitForExit();

                return Path.ChangeExtension(phyicalFilePath, "flv");
            }
        }

        public string PostOpenGraph(string text, string subject, string imageurl, string sender, string[] userEmailIds)
        {
            var imageCount = imageurl.Split('@');
            text = text.Replace("\r\n", "*");
            var textSplit = text.Split('*');
            var user = (SignUpWCF.User)Session["user"];
            if (user.YammerToken == null || user.YammerToken == "0")
            {
                return "gettoken";
            }
            else
            {
                for (var i = 0; i < imageCount.Count(); i++)
                {
                    if (imageCount[i] != "")
                    {
                        TimeSpan span = new TimeSpan(DateTime.Now.GetHashCode());
                        var timestamp = span.GetHashCode();

                        var image = imageCount[i].Replace("../../Images", ConfigurationManager.AppSettings["HostingPrefix"] + "/images/yammer");
                        var httpWebRequest =
                            (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/activity.json");
                        httpWebRequest.ContentType = "application/json";
                        httpWebRequest.Headers.Set("Authorization", "Bearer " + user.YammerToken + "");
                        httpWebRequest.Method = "POST";
                        string cononicalurl = ConfigurationManager.AppSettings["HostingPrefix"] + "/yammer/BackToSite?id=" + timestamp;
                        using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                        {
                            if (image == "")
                            {
                                image = ConfigurationManager.AppSettings["HostingPrefix"] + "/images/yammer/icon.png";
                                subject = "An Appreciation from " + user.FirstName + " " + user.LastName;
                            }
                            else if (image.IndexOf("bronze") != -1 || image.IndexOf("gold") != -1 || image.IndexOf("silver") != -1)
                            {
                                subject = "A Medal from " + user.FirstName + " " + user.LastName;
                            }
                            else if (image.IndexOf("idea") != -1 || image.IndexOf("key") != -1 || image.IndexOf("thankyou") != -1)
                            {
                                subject = "A Badge from " + user.FirstName + " " + user.LastName;
                            }

                            string jsonUserEmailId = "";
                            string subjectTo = "";
                            foreach (string userEmailId in userEmailIds)
                            {
                                string userEmailIdTrim = userEmailId.Trim();
                                if (userEmailIdTrim != "")
                                {
                                    var authentication = new AuthenticationClient();
                                    var returnValue = authentication.AuthenticateUserWithUserName(userEmailIdTrim);
                                    var sendtouser = returnValue.user;

                                    if (jsonUserEmailId == "")
                                    {
                                        jsonUserEmailId = "{\"email\":\"" + userEmailIdTrim + "\"}";
                                        subjectTo = sendtouser.FirstName + " " + sendtouser.LastName;
                                    }
                                    else
                                    {
                                        jsonUserEmailId = jsonUserEmailId + ", {\"email\":\"" + userEmailIdTrim + "\"}";
                                        subjectTo = subjectTo + ", " + sendtouser.FirstName + " " + sendtouser.LastName;
                                    }
                                }
                            }

                            subject = subject + " to " + subjectTo;

                            string json =
                                "{ \"activity\": { \"actor\": { \"email\": \"" + user.EmailAddress + "\" },\"action\": \"create\", \"object\": { \"url\": \"" +
                                cononicalurl + "\", \"title\": \"" + subject +
                                "\", \"image\": \"" + image + "\", \"description\":\"" +
                                textSplit[0] +
                                "\" }, \"message\":  \"\", \"users\": [" + jsonUserEmailId + "]} }";
                            //string json = "{ \"activity\": { \"actor\": { \"name\": \"sankar\", \"email\": \"sankar@tillidsoft.com\" },\"action\": \"create\", \"object\": { \"url\": \"https://www.bexcellent.com\", \"title\": \"I have Received a Badge\", \"image\": \"http://demo.bexcellent.com/images/gold-medal-recieved.png\", \"description\": \"You are Appreciated\" }, \"message\": \"Test from open graph!\", \"users\": [{ \"name\": \"venkat\", \"email\": \"venkat@tillidsoft.com\"}]} }";
                            streamWriter.Write(json);
                            streamWriter.Flush();
                            streamWriter.Close();
                            //Thread.Sleep(1000);
                        }
                        var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                        using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                        {
                            streamReader.ReadToEnd();
                        }

                        PostOnWall(cononicalurl, text, subject, user.YammerToken);
                    }
                }
            }
            return "posted";
        }

        public string SaveOpenGraph(string text, string subject, string imageurl, string sender, string[] userEmailIds)
        {
            var imageCount = imageurl.Split('@');
            text = text.Replace("\r\n", "*");
            var textSplit = text.Split('*');
            var user = (SignUpWCF.User)Session["user"];
            if (user.YammerToken == null || user.YammerToken == "0")
            {
                return "gettoken";
            }
            else
            {
                for (var i = 0; i < imageCount.Count(); i++)
                {
                    if (imageCount[i] != "")
                    {
                        var image = imageCount[i].Replace("../../Images", ConfigurationManager.AppSettings["HostingPrefix"] + "/images/yammer");

                        if (image == "")
                        {
                            image = ConfigurationManager.AppSettings["HostingPrefix"] + "/images/yammer/icon.png";
                            subject = "An Appreciation from " + user.FirstName + " " + user.LastName;
                        }
                        else if (image.IndexOf("bronze") != -1 || image.IndexOf("gold") != -1 || image.IndexOf("silver") != -1)
                        {
                            subject = "A Medal from " + user.FirstName + " " + user.LastName;
                        }
                        else if (image.IndexOf("idea") != -1 || image.IndexOf("key") != -1 || image.IndexOf("thankyou") != -1)
                        {
                            subject = "A Badge from " + user.FirstName + " " + user.LastName;
                        }

                        string jsonUserEmailId = "";
                        string subjectTo = "";
                        foreach (string userEmailId in userEmailIds)
                        {
                            string userEmailIdTrim = userEmailId.Trim();
                            if (userEmailIdTrim != "")
                            {
                                var authentication = new AuthenticationClient();
                                var returnValue = authentication.AuthenticateUserWithUserName(userEmailIdTrim);
                                var sendtouser = returnValue.user;

                                if (jsonUserEmailId == "")
                                {
                                    jsonUserEmailId = "{\"email\":\"" + userEmailIdTrim + "\"}";
                                    subjectTo = sendtouser.FirstName + " " + sendtouser.LastName;
                                }
                                else
                                {
                                    jsonUserEmailId = jsonUserEmailId + ", {\"email\":\"" + userEmailIdTrim + "\"}";
                                    subjectTo = subjectTo + ", " + sendtouser.FirstName + " " + sendtouser.LastName;
                                }
                            }
                        }

                        subject = subject + " to " + subjectTo;
                        var common = new CommonClient();
                        common.InsertYammerContent(user.EmailAddress, null, image, subject, null, text, user.YammerToken);
                        //Thread.Sleep(1000);
                    }
                }
            }
            return "posted";
        }

        [HttpPost]
        [ValidateInputAttribute(false)]
        [SessionExpireFilter]
        public string SendAppreciationtoYammerGroup(string userIds, string subject, string appreciation, string comments, string selectedmembersemailids, HttpPostedFileBase replyFile, string GroupIdPost, string GroupName)
        {
            string[] selectedEmailArray = selectedmembersemailids.Split(';');

            XmlDocument doc = new XmlDocument();
            doc.LoadXml(appreciation);
            XmlNodeList nodes = doc.DocumentElement.SelectNodes("img");
            string images = "";
            foreach (XmlNode node in nodes)
            {
                images = images + node.Attributes["src"].Value + "@";
            }

            var suser = (User)Session["user"];
            subject = subject + " from " + suser.FirstName + " " + suser.LastName + "This message was posted by " + suser.FirstName + " " + suser.LastName + " to <Sharepoint> group)";
            //return PostOpenGraphForGroups(comments, subject, images, suser.EmailAddress, selectedEmailArray, GroupIdPost, GroupName);
            return SaveOpenGraphForGroups(comments, subject, images, suser.EmailAddress, selectedEmailArray, GroupIdPost,
                                          GroupName);
        }

        public string PostOpenGraphForGroups(string text, string subject, string imageurl, string sender, string[] userEmailIds, string GroupIdPost, string GroupName)
        {
            var imageCount = imageurl.Split('@');
            var grpCount = GroupIdPost.Split('%');
            var grpNameCount = GroupName.Split('%');

            text = text.Replace("\r\n", "*");
            var textSplit = text.Split('*');

            var user = (SignUpWCF.User)Session["user"];

            if (user.YammerToken == null || user.YammerToken == "0")
            {
                return "gettoken";
            }
            else
            {
                var sub = "";
                for (var j = 0; j < grpCount.Count(); j++)
                {
                    for (var i = 0; i < imageCount.Count(); i++)
                    {
                        if (imageCount[i] != "")
                        {
                            TimeSpan span = new TimeSpan(DateTime.Now.GetHashCode());
                            var timestamp = span.GetHashCode();

                            var image = imageCount[i].Replace("../../Images",
                                                              ConfigurationManager.AppSettings["HostingPrefix"] +
                                                              "/images/yammer");
                            var httpWebRequest =
                                (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/activity.json");
                            httpWebRequest.ContentType = "application/json";
                            httpWebRequest.Headers.Set("Authorization", "Bearer " + user.YammerToken + "");
                            httpWebRequest.Method = "POST";
                            string cononicalurl = ConfigurationManager.AppSettings["HostingPrefix"] +
                                                  "/yammer/BackToSite?id=" + timestamp;
                            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                            {
                                if (image == "")
                                {
                                    image = ConfigurationManager.AppSettings["HostingPrefix"] +
                                            "/images/yammer/icon.png";
                                    subject = "An Appreciation from " + user.FirstName + " " + user.LastName;
                                }
                                else if (image.IndexOf("bronze") != -1 || image.IndexOf("gold") != -1 ||
                                         image.IndexOf("silver") != -1)
                                {
                                    subject = "A Medal from " + user.FirstName + " " + user.LastName;
                                }
                                else if (image.IndexOf("idea") != -1 || image.IndexOf("key") != -1 ||
                                         image.IndexOf("thankyou") != -1)
                                {
                                    subject = "A Badge from " + user.FirstName + " " + user.LastName;
                                }

                                string jsonUserEmailId = "";
                                string subjectTo = "";
                                foreach (string userEmailId in userEmailIds)
                                {
                                    string userEmailIdTrim = userEmailId.Trim();
                                    if (userEmailIdTrim != "")
                                    {
                                        AuthenticationClient authentication = new AuthenticationClient();
                                        var returnValue = authentication.AuthenticateUserWithUserName(userEmailIdTrim);
                                        var sendtouser = returnValue.user;

                                        if (jsonUserEmailId == "")
                                        {
                                            jsonUserEmailId = "{\"email\":\"" + userEmailIdTrim + "\"}";
                                            subjectTo = sendtouser.FirstName + " " + sendtouser.LastName;
                                        }
                                        else
                                        {
                                            jsonUserEmailId = jsonUserEmailId + ", {\"email\":\"" + userEmailIdTrim +
                                                              "\"}";
                                            subjectTo = subjectTo + ", " + sendtouser.FirstName + " " +
                                                        sendtouser.LastName;
                                        }
                                    }
                                }

                                sub = subject + " to " + subjectTo + " (This message was posted by " + user.FirstName + " " + user.LastName + " to " + grpNameCount[j] + " group)";

                                //string json =
                                //    "{ \"activity\": { \"actor\": { \"email\": \"" + user.EmailAddress +
                                //    "\" },\"action\": \"create\", \"object\": { \"url\": \"" +
                                //    cononicalurl + "\", \"title\": \"" + sub +
                                //    "\", \"image\": \"" + image + "\",\"group_id \":\" " + grpCount[j] + "\", \"description\":\"" +
                                //    textSplit[0] +
                                //    "\" }, \"message\":  \"\"} }";
                                var objects = new YammerObject();
                                var actor = new YammerActor();
                                var activity = new YammerActivity();
                                var yammerOuth = new YammerOath();
                                objects.url = cononicalurl;
                                objects.title = sub;
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
                                //Thread.Sleep(2000);
                            }
                            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                            {
                                var result = streamReader.ReadToEnd();
                            }

                            PostOnWallGroup(cononicalurl, text, sub, user.YammerToken, grpCount[j]);
                        }
                        Thread.Sleep(2000);
                    }
                }
            }
            return "posted";
        }

        public string SaveOpenGraphForGroups(string text, string subject, string imageurl, string sender, string[] userEmailIds, string GroupIdPost, string GroupName)
        {
            var imageCount = imageurl.Split('@');
            var grpCount = GroupIdPost.Split('%');
            var grpNameCount = GroupName.Split('%');

            text = text.Replace("\r\n", "*");
            var textSplit = text.Split('*');

            var user = (SignUpWCF.User)Session["user"];

            if (user.YammerToken == null || user.YammerToken == "0")
            {
                return "gettoken";
            }
            else
            {
                var sub = "";
                for (var j = 0; j < grpCount.Count(); j++)
                {
                    for (var i = 0; i < imageCount.Count(); i++)
                    {
                        if (imageCount[i] != "")
                        {
                            var image = imageCount[i].Replace("../../Images",
                                                              ConfigurationManager.AppSettings["HostingPrefix"] +
                                                              "/images/yammer");

                            if (image == "")
                            {
                                image = ConfigurationManager.AppSettings["HostingPrefix"] +
                                        "/images/yammer/icon.png";
                                subject = "An Appreciation from " + user.FirstName + " " + user.LastName;
                            }
                            else if (image.IndexOf("bronze") != -1 || image.IndexOf("gold") != -1 ||
                                     image.IndexOf("silver") != -1)
                            {
                                subject = "A Medal from " + user.FirstName + " " + user.LastName;
                            }
                            else if (image.IndexOf("idea") != -1 || image.IndexOf("key") != -1 ||
                                     image.IndexOf("thankyou") != -1)
                            {
                                subject = "A Badge from " + user.FirstName + " " + user.LastName;
                            }

                            string jsonUserEmailId = "";
                            string subjectTo = "";
                            foreach (string userEmailId in userEmailIds)
                            {
                                string userEmailIdTrim = userEmailId.Trim();
                                if (userEmailIdTrim != "")
                                {
                                    AuthenticationClient authentication = new AuthenticationClient();
                                    var returnValue = authentication.AuthenticateUserWithUserName(userEmailIdTrim);
                                    var sendtouser = returnValue.user;

                                    if (jsonUserEmailId == "")
                                    {
                                        jsonUserEmailId = "{\"email\":\"" + userEmailIdTrim + "\"}";
                                        subjectTo = sendtouser.FirstName + " " + sendtouser.LastName;
                                    }
                                    else
                                    {
                                        jsonUserEmailId = jsonUserEmailId + ", {\"email\":\"" + userEmailIdTrim +
                                                          "\"}";
                                        subjectTo = subjectTo + ", " + sendtouser.FirstName + " " +
                                                    sendtouser.LastName;
                                    }
                                }
                            }

                            sub = subject + " to " + subjectTo + " (This message was posted by " + user.FirstName + " " + user.LastName + " to " + grpNameCount[j] + " group)";
                            var common = new CommonClient();
                            common.InsertYammerContent(user.EmailAddress, null, image, sub, grpCount[j], text, user.YammerToken);
                        }
                    }
                }
            }
            return "posted";
        }

        public void PostOnWallGroup(String cononicalurl, string text, string from, string token, string groupid)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/messages.json?group_id=" + groupid);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Set("Authorization", "Bearer " + token);
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "";
                var content = new YammerBodyContent();
                content.og_url = cononicalurl;
                content.og_title = text;
                content.og_description = from;

                if (cononicalurl == "")
                {
                    json = "{\"Body\":\"\"}";
                }
                else
                {
                    json = new JavaScriptSerializer().Serialize(content);
                    //json = "{\"Body\": \"og_url\":\"" + cononicalurl + "\",\"og_title\":\"" + text + "\",\"og_description  \":\"" + from + "\"}";
                }

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
                //Thread.Sleep(1000);
            }
            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
            }
        }

        public void PostOnWall(String cononicalurl, string text, string from, string token)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/messages.json");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Set("Authorization", "Bearer " + token);
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "";
                var content = new YammerBodyContent { og_url = cononicalurl, og_title = text, og_description = @from };
                if (cononicalurl == "")
                {
                    json = "{\"Body\":\"\"}";
                }
                else
                {
                    json = new JavaScriptSerializer().Serialize(content);
                    //json = "{\"Body\":\"og_url\":\"" + cononicalurl + "\"}";
                }

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
                //Thread.Sleep(300);
            }
            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
            }
        }


    }

    public class StartPagemode
    {
        public int Userid { get; set; }

        public string Pagemode { get; set; }
    }
}