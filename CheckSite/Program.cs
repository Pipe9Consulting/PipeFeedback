using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;
using System.Xml.Linq;
using CheckSite.Common;
using bExcellent.Service.Util.Response;

namespace CheckSite
{
    internal class Program
    {
        public static DateTime currentdate = DateTime.Now;
        public static bExcellent.Service.BusinessLogic.Common.Common common = new bExcellent.Service.BusinessLogic.Common.Common();
        Common.CommonClient commons = new CommonClient();

        private static void Main(string[] args)
        {
            //var common = new bExcellent.Service.BusinessLogic.Common.CommonDataAccess();
            try
            {
                //Configuration config = WebConfigurationManager.OpenWebConfiguration(HttpContext.Current.Request.ApplicationPath);
                //MailSettingsSectionGroup settings = (MailSettingsSectionGroup)config.GetSectionGroup("system.net/mailSettings");

                SmtpClient sc = new SmtpClient("smtp.gmail.com");

                System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage();

                msg.From = new MailAddress("tillidtest@gmail.com");
                msg.To.Add(new MailAddress("pr@pipe9consulting.com"));
                msg.Subject = "r";
                msg.Body ="r";
                StringBuilder str = new StringBuilder();
                str.AppendLine("BEGIN:VCALENDAR");
                str.AppendLine("PRODID:-//" + "pr@pipe9consulting.com");
                str.AppendLine("VERSION:2.0");
                str.AppendLine("METHOD:REQUEST");
                str.AppendLine("BEGIN:VEVENT");

                str.AppendLine(string.Format("DTSTART:{0:yyyyMMddTHHmmssZ}", DateTime.Now.ToUniversalTime().ToString("yyyyMMdd\\THHmmss\\Z")));
                str.AppendLine(string.Format("DTSTAMP:{0:yyyyMMddTHHmmssZ}", (Convert.ToDateTime("20/05/2017") - DateTime.Now).Minutes.ToString()));
                str.AppendLine(string.Format("DTEND:{0:yyyyMMddTHHmmssZ}", Convert.ToDateTime("20/05/2017").ToUniversalTime().ToString("yyyyMMdd\\THHmmss\\Z")));
                //str.AppendLine(string.Format("DTSTART:{0:yyyyMMddTHHmmssZ}", objApptEmail.StartDate.ToString()));
                //str.AppendLine(string.Format("DTSTAMP:{0:yyyyMMddTHHmmssZ}", DateTime.UtcNow));
                //str.AppendLine(string.Format("DTEND:{0:yyyyMMddTHHmmssZ}", objApptEmail.EndDate.ToString()));
               // str.AppendLine("LOCATION:" + objApptEmail.Location);
                str.AppendLine(string.Format("DESCRIPTION:{0}", ""));
                str.AppendLine(string.Format("X-ALT-DESC;FMTTYPE=text/html:{0}", "bdy"));
                str.AppendLine(string.Format("SUMMARY:{0}", "call"));
                str.AppendLine(string.Format("ORGANIZER:MAILTO:{0}", "pr@pipe9consulting.com"));
                str.AppendLine(string.Format("ATTENDEE;CN=\"{0}\";RSVP=TRUE:mailto:{1}", msg.To[0].DisplayName, msg.To[0].Address));
                str.AppendLine("BEGIN:VALARM");
                str.AppendLine("TRIGGER:-PT15M");
                str.AppendLine("ACTION:DISPLAY");
                str.AppendLine("DESCRIPTION:Reminder");
                str.AppendLine("END:VALARM");
                str.AppendLine("END:VEVENT");
                str.AppendLine("END:VCALENDAR");
                System.Net.Mime.ContentType ct = new System.Net.Mime.ContentType("text/calendar");
                ct.Parameters.Add("method", "REQUEST");
                AlternateView avCal = AlternateView.CreateAlternateViewFromString(str.ToString(), ct);
                msg.AlternateViews.Add(avCal);
                NetworkCredential nc = new NetworkCredential("tillidtest@gmail.com", "pipe9@123");
                sc.Port = 587;
                sc.EnableSsl = true;
                sc.Credentials = nc;
                sc.Send(msg);
               
            }
            catch { }
         //   var t = common.GetPSMReports(101);
            var c = 9;
            //double k = (double)12.0/11.0;
            //var ki = k;
            //List<DIYQuestions> questions=new List<DIYQuestions>();
            //var question1 = new DIYQuestions();
            //question1.Importance = 1;
            //question1.Question = "sdsd";
            //var question2 = new DIYQuestions();
            //question2.Importance = 2;
            //question2.Question = "ss";

            //var question3 = new DIYQuestions();
            //question3.Importance = 4;
            //question3.Question = "ss";
            //var question4 = new DIYQuestions();
            //question4.Importance = 4;
            //question4.Question = "sss";
            //var question5 = new DIYQuestions();
            //question5.Importance = 3;
            //question5.Question = "sss";
            //questions.Add(question1);
            //questions.Add(question2);
            //questions.Add(question3);
            //questions.Add(question4);
            //questions.Add(question5);
            //var totalQuestions = questions.Count();
            //var sumOfallWeightage = questions.Sum(a => a.Importance);
            //var precentageForSurvey = 100;
            //foreach (var question in questions)
            //{
            //  question.WeightagePerQuestion = ((double)question.Importance / sumOfallWeightage) * precentageForSurvey;
            //}
           
            //SurveyAnswers color = (SurveyAnswers)System.Enum.Parse(typeof(SurveyAnswers), "Trivial");
            //int animalNumber = (int)Enum.Parse(typeof(SurveyAnswers), "Trivial");
            //string x = ((SurveyAnswers)4).ToString();
            //int t = 0;
            //string _from = ConfigurationManager.AppSettings["fromEmail"];
            //string emailServer = ConfigurationManager.AppSettings["mailServer"];
            //string _userId = ConfigurationManager.AppSettings["emailUserId"];
            //string _pwd = ConfigurationManager.AppSettings["emailPassword"];
            //string _bcc = ConfigurationManager.AppSettings["bccEmail"];
            //var content ="hi";
            ////content.Replace("{0}", toemail).Replace("{1}", password);
            ////content.Replace("{0}", toemail);
            //MailMessage mail = new MailMessage();
            //mail.To.Add("pr@pipe9consulting.com");
            //mail.From = new MailAddress("admin@pipe9consulting.com");
            //mail.Subject = "test";
            //string Body = "content";
            //mail.Body = Body;
            //mail.IsBodyHtml = true;
            //SmtpClient smtp = new SmtpClient();
            //smtp.Host = "smtp.gmail.com";
            //smtp.Port = 587;
            //smtp.UseDefaultCredentials = false;
            //smtp.Credentials = new System.Net.NetworkCredential
            //("tillidtest@gmail.com", "timepass@123");// Enter seders User name and password
            //smtp.EnableSsl = true;
            //smtp.Send(mail);
            //MailMessage objEmail = new MailMessage(_from, "pr@pipe9consulting.com", "test", content);

            //objEmail.Bcc.Add(_bcc);

            //objEmail.IsBodyHtml = true;

            //SmtpClient emailClient = new SmtpClient(emailServer);
            //System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(_userId, _pwd);

            //emailClient.Host = emailServer;
            //emailClient.UseDefaultCredentials = false;
            //emailClient.Credentials = basicAuthenticationInfo;
            //emailClient.Send(objEmail);
            //    MailMessage mail = new MailMessage();
            //    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

            //    mail.From = new MailAddress("pratheesh.krishnaa@gmail.com");
            //    mail.To.Add("pratheesh.krishnaa@gmail.com");
            //    mail.Subject = "Test Mail";
            //    mail.Body = "This is for testing SMTP mail from GMAIL";

            //    SmtpServer.Port = 587;
            //    SmtpServer.Credentials = new System.Net.NetworkCredential("tillidtest@gmail.com", "prtillid@123");
            //    SmtpServer.EnableSsl = true;

            //    SmtpServer.Send(mail);
            // MessageBox.Show("mail Send");
            //var devpriorityList = new List<DevlopmentPriority>();
            //var devpriority = new DevlopmentPriority();
            //devpriority.FeedbackFor = 1;
            //devpriority.FeedbackFrom = 1;
            //devpriority.Questionid = 1;
            //devpriority.CurrentFeedbackId = 1;
            //devpriority.PriorityOrder = 1;
            //devpriority.ManagerResult = 1;
            //devpriority.UpdatedOn = DateTime.Now;
            //devpriority.Active = true;

            //var devpriority1 = new DevlopmentPriority();
            //devpriority.FeedbackFor = 2;
            //devpriority.FeedbackFrom = 2;
            //devpriority.Questionid = 2;
            //devpriority.CurrentFeedbackId = 2;
            //devpriority.PriorityOrder = 2;
            //devpriority.ManagerResult = 2;
            //devpriority.UpdatedOn = DateTime.Now;
            //devpriority.Active = true;
            //devpriorityList.Add(devpriority);
            //devpriorityList.Add(devpriority1);
            //var devlopmentPriorities = new XElement("DevlopmentPriorities");
            //foreach (XElement ele in devpriorityList.Select(t => new XElement("DevlopmentPriority", new XElement("FeedbackFrom", t.FeedbackFrom),
            //                                                                  new XElement("FeedbackFor", t.FeedbackFor),
            //                                                                  new XElement("Questionid", t.Questionid),
            //                                                                  new XElement("PriorityOrder", t.PriorityOrder),
            //                                                                  new XElement("ManagerResult", t.ManagerResult),
            //                                                                  new XElement("CurrentFeedbackId", t.CurrentFeedbackId),
            //                                                                  new XElement("Active", t.Active),
            //                                                                  new XElement("UpdatedOn", t.UpdatedOn))))
            //{
            //    devlopmentPriorities.Add(ele);
            //}
            //var dev = devlopmentPriorities;
            //var common = new bExcellent.Service.BusinessLogic.Standing.StandingDataAccess();
            // var common = new bExcellent.Service.BusinessLogic.Goal.GoalDataAccess();
            // var c = common.GetManagerDevProgress(415, 13, 742);

            //var value = "+955562425";
            //v//ar k = HttpUtility.HtmlEncode(value);
            //SelfFbUsers();
            // GetYammerContent();
            //var common = new bExcellent.Service.BusinessLogic.Standing.StandingDataAccess();
            //var common = new bExcellent.Service.BusinessLogic.Goal.GoalDataAccess();
            //var devPriorities = common.GetTeamGoalDate(42, 11, 91);
            //88 99
            //var selffb = common.GetGoalsShared(45, 11);


            //common.GetSherbasFbidString(12, "1", 1, "%@microsoft.com");
        }

        //private static void SelfFbUsers()
        //{
        //    var listPoe = common.GetAllPoEs().Where(a => a.PoeFlag == 2).ToList();
        //    var content = string.Empty;
        //    var subject = string.Empty;
        //    foreach (var user in listPoe.Select(poe => common.GetSelfbUser(11)).SelectMany(userlist => userlist))
        //    {
        //        var messagecount = 1;
        //        if (user.UpdatedOn != null)
        //        {
        //            var emailDays = int.Parse(ConfigurationManager.AppSettings["Emailingdays"]);
        //            var diffResult = (currentdate - (DateTime)user.UpdatedOn).TotalDays;
        //            if (diffResult > emailDays)
        //            {
        //                if (user.LastEmail != null)
        //                {
        //                    messagecount = messagecount + (int)user.EmailCount;
        //                    CheckLastMail((DateTime)user.LastEmail, messagecount, user.MappingId, user.emailid, content, subject);
        //                }
        //                else
        //                {
        //                    //send mail
        //                    SendMailForResource(user.emailid, content, subject);
        //                    //Update Table

        //                    UpdateLastMail(user.MappingId, messagecount);
        //                }
        //            }
        //        }
        //        else
        //        {
        //            if (user.LastEmail != null)
        //            {
        //                messagecount = messagecount + (int)user.EmailCount;
        //                CheckLastMail((DateTime)user.LastEmail, messagecount, user.MappingId, user.emailid, content, subject);
        //            }
        //            else
        //            {
        //                //send mail
        //                SendMailForResource(user.emailid, content, subject);
        //                //Update Table
        //                UpdateLastMail(user.MappingId, messagecount);
        //            }
        //        }
        //    }
        //}

        //public static void CheckLastMail(DateTime Lastmail, int messagecount, int mappingid, string mailid, string content, string subject)
        //{
        //    var lastmail = (currentdate - (DateTime)Lastmail).TotalDays;
        //    if (lastmail > 7)
        //    {
        //        //send mail
        //        SendMailForResource(mailid, content, subject);
        //        //Update record

        //        UpdateLastMail(mappingid, messagecount);
        //    }
        //}

        //public static void SendMailForResource(string toaddress, string content, string subject)
        //{
        //    var emailServer = ConfigurationManager.AppSettings["mailServer"];
        //    var userId = ConfigurationManager.AppSettings["emailUserId"];
        //    var pwd = ConfigurationManager.AppSettings["emailPassword"];
        //    var bcc = ConfigurationManager.AppSettings["bccEmail"];
        //    var to = ConfigurationManager.AppSettings["mailTo"];
        //    var from = ConfigurationManager.AppSettings["fromEmail"];

        //    if (to.Trim() == string.Empty)
        //    {
        //        to = toaddress;
        //    }
        //    var objEmail = new MailMessage(from, to, subject, content);

        //    objEmail.Bcc.Add(bcc);

        //    objEmail.IsBodyHtml = true;

        //    var emailClient = new SmtpClient(emailServer);
        //    var basicAuthenticationInfo = new System.Net.NetworkCredential(userId,
        //        pwd);

        //    emailClient.Host = emailServer;
        //    emailClient.UseDefaultCredentials = false;
        //    emailClient.Credentials = basicAuthenticationInfo;
        //    emailClient.Send(objEmail);
        //}

        //public static void UpdateLastMail(int mappingId, int messageCount)
        //{
        //    common.UpdateLastMail(mappingId, messageCount);
        //}

        //public static void GetYammerContent()
        //{
        //    var common = new CommonClient();

        //}
        public static void GetYammerContent()
        {
            bExcellent.Service.BusinessLogic.Common.Common common = new bExcellent.Service.BusinessLogic.Common.Common();

            var getyammer = common.GetYammerTopContent();
            foreach (var yammerContent in getyammer)
            {
                if (yammerContent.Groupid != null)
                {
                    SendYammerGroup(yammerContent.ToMailid, yammerContent.Subject, yammerContent.Description,
                                   yammerContent.ImageUrl, yammerContent.YammerToken, yammerContent.Groupid);
                    UpdateYammerContent(yammerContent.ID);
                }
                else
                {
                    SendYammerUser(yammerContent.ToMailid, yammerContent.Subject, yammerContent.Description,
                                   yammerContent.ImageUrl, yammerContent.YammerToken);
                    UpdateYammerContent(yammerContent.ID);
                }
            }
        }

        public static void SendYammerUser(string emailid, string subject, string description, string imageurl, string yammertoken)
        {
            var span = new TimeSpan(DateTime.Now.GetHashCode());
            var timestamp = span.GetHashCode();
            var httpWebRequest =
                (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/activity.json");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Set("Authorization", "Bearer " + yammertoken + "");
            httpWebRequest.Method = "POST";
            var cononicalurl = ConfigurationSettings.AppSettings["hostingPrefix"] + "/yammer/BackToSite?id=" + timestamp;
            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                var objects = new YammerObject();
                var actor = new YammerActor();
                var activity = new YammerActivity();
                var yammerOuth = new YammerOath();
                objects.url = cononicalurl;
                objects.title = subject;
                objects.image = imageurl;
                objects.description = description;
                actor.email = emailid;
                activity.action = "create";
                activity.message = "";
                activity.Object = objects;
                activity.actor = actor;
                yammerOuth.activity = activity;
                var json = new JavaScriptSerializer().Serialize(yammerOuth);
                var final = json.Replace("Object", "object");

                streamWriter.Write(final);
                streamWriter.Flush();
            }
            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                streamReader.ReadToEnd();
            }

            PostOnWall(cononicalurl, description, subject, yammertoken);
        }

        public static void SendYammerGroup(string emailid, string subject, string description, string imageurl, string yammertoken, string groupid)
        {
            var span = new TimeSpan(DateTime.Now.GetHashCode());
            var timestamp = span.GetHashCode();
            var httpWebRequest =
                (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/activity.json");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Set("Authorization", "Bearer " + yammertoken + "");
            httpWebRequest.Method = "POST";
            var cononicalurl = ConfigurationManager.AppSettings["HostingPrefix"] + "/yammer/BackToSite?id=" + timestamp;
            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                var objects = new YammerObject();
                var actor = new YammerActor();
                var activity = new YammerActivity();
                var yammerOuth = new YammerOath();
                objects.url = cononicalurl;
                objects.title = subject;
                objects.image = imageurl;
                objects.description = description;
                actor.email = emailid;
                activity.action = "create";
                activity.message = "";
                activity.Object = objects;
                activity.actor = actor;
                yammerOuth.activity = activity;
                var json = new JavaScriptSerializer().Serialize(yammerOuth);
                var final = json.Replace("Object", "object");

                streamWriter.Write(final);
                streamWriter.Flush();
            }
            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                streamReader.ReadToEnd();
            }

            PostOnGroups(cononicalurl, description, subject, yammertoken, groupid);
        }

        private static void PostOnWall(String cononicalurl, string text, string subject, string token)
        {
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

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }
            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                streamReader.ReadToEnd();
            }
        }

        public static void PostOnGroups(String cononicalurl, string text, string subject, string token, string groupid)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/messages.json?group_id=" + Convert.ToInt32(groupid));
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

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

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
        }

        private static HttpWebResponse getYammerResponse(HttpWebRequest httpWebRequest)
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

        public static void UpdateYammerContent(int id)
        {
            var common = new CommonClient();
            //c
            common.UpdateYammercontent(id);
        }
    }

    public class YammerObject
    {
        public string url { get; set; }

        public string image { get; set; }

        public string description { get; set; }

        public string title { get; set; }
    }

    public class YammerActor
    {
        public string email { get; set; }
    }

    public class YammerActivity
    {
        public YammerActor actor { get; set; }

        public string action { get; set; }

        public YammerObject Object { get; set; }

        public string message { get; set; }
    }

    public class YammerBody
    {
        public YammerBodyContent Body { get; set; }
    }

    public class YammerBodyContent
    {
        public string og_url { get; set; }

        public string og_title { get; set; }

        public string og_description { get; set; }
    }
    public class DevelopmentPriority
    {
        public int ManagerResult { get; set; }
        public int SelfResult { get; set; }
        public int QuestionId { get; set; }
        public int Rating { get; set; }
        public string Question { get; set; }
        public string ModuleName { get; set; }
    }
    public class YammerOath
    {
        public YammerActivity activity { get; set; }
    }
    public class DevlopmentPriority
    {
        public int FeedbackFrom { get; set; }
        public int FeedbackFor { get; set; }
        public int Questionid { get; set; }
        public int PriorityOrder { get; set; }
        public int ManagerResult { get; set; }
        public int CurrentFeedbackId { get; set; }
        public bool Active { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
    enum SurveyAnswers
    {
        None=1,
        Trivial=2,
        Regular=3,
        Important=4,
        Critical=5
    };
}