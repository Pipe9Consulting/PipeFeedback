using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using Quartz;
using Quartz.Impl;
using Quartz.Impl.Triggers;
using System.Web;
using bExcellent.Service.BusinessLogic;
using bExcellent.Service.BusinessLogic.Common;

namespace DemoCloudAsCoachService
{
    public partial class ScheduledService : ServiceBase
    {
        private static IScheduler _scheduler;
        public ScheduledService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            ISchedulerFactory schedulerFactory = new StdSchedulerFactory();
            _scheduler = schedulerFactory.GetScheduler();
            _scheduler.Start();
            AddJobs();
        }
        public void AddJobs()
        {
            //plan notifcation
            const string cronExpyammer = "0 0/2 * 1/1 * ? *";// " 0 0/1 * 1/1 * ? *  ";
            var PlanNotificationJob = new LiveYammerNotoficationJob();
            var PlanNotificationJobDetail = new JobDetailImpl("CICLiveYammerNotoficationJob", "CICLiveYammerNotoficationJob", PlanNotificationJob.GetType());
            var PlanNotificationtrigger = new CronTriggerImpl("CICLiveYammerNotoficationJob", "CICLiveYammerNotoficationJob", cronExpyammer);
            _scheduler.ScheduleJob(PlanNotificationJobDetail, PlanNotificationtrigger);
        }
        internal interface ILiveYammerNotoficationJob : IJob
        {
        }

        internal class LiveYammerNotoficationJob : ILiveYammerNotoficationJob
        {
            /// <summary>
            /// Called by the <see cref="T:Quartz.IScheduler" /> when a <see cref="T:Quartz.ITrigger" />
            /// fires that is associated with the <see cref="T:Quartz.IJob" />.
            /// </summary>
            /// <param name="context">The execution context.</param>
            /// <remarks>
            /// The implementation may wish to set a  result object on the
            /// JobExecutionContext before this method exits.  The result itself
            /// is meaningless to Quartz, but may be informative to
            /// <see cref="T:Quartz.IJobListener" />s or
            /// <see cref="T:Quartz.ITriggerListener" />s that are watching the job's
            /// execution.
            /// </remarks>
            public void Execute(IJobExecutionContext context)
            {
                GetYammerContent();
            }
            public static void GetYammerContent()
            {
                TraceService("GetYammerContent");
                bExcellent.Service.BusinessLogic.Common.Common common = new bExcellent.Service.BusinessLogic.Common.Common();

                var Goal = common.GetGoalDates();
                foreach (var date in Goal)
                {
                    string EmailTemplateNew = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'> <html> <head><title></title></head> <body style='background: #f5f5f5;'> <table border='0' cellspacing='0' cellpadding='5' style='width: 100%; background: #f5f5f5;'> <tr> <td width='25%'></td> <td width='50%'> <table width='100%' border='0' cellspacing='0' cellpadding='5' style='margin: 0 auto; background: #f5f5f5;'> <tr> <td bgcolor='#f5f5f5' style='text-align:center;'> <table width='100%' border='0' align='center' cellpadding='0' cellspacing='0'> <tr> <td style='text-align:center;' width:'90%'><a href='http://www.pipe9consulting.com' target='_blank'> <img src='https://www.pipe9feedback.com/Images/overall/P9_logo_new.png' alt='pipe9Consulting' border='0' style='outline: 0' width='80' /> </a></td> </tr> </table> </td> </tr> </table> <table width='520px' border='0' cellspacing='0' cellpadding='5' style='margin: 0 auto; background: #fff; border: 1px solid #e5e5e5;'> <tr> <td bgcolor='#fff' style='font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #333; line-height: 1.5;'> <table width='95%' border='0' align='center' cellpadding='0' cellspacing='0'> <tr> <td style='font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #fff;'>&nbsp;</td> </tr> <tr> <td style='font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #333;'>{0} <p>Regards, </p> <p>The Pipe9 Team </p> </td> </tr> <tr> <td style='font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #fff;'>&nbsp;</td> </tr> </table> </td> </tr> </table> <table width='520px' border='0' cellspacing='0' cellpadding='2' style='margin: 0 auto; background: #f5f5f5;'> <tr> <td style='font-family: Arial, Helvetica, sans-serif; font-size: 10px; line-height: 1.7; color: #333;'> <p>&nbsp;</p> <p>This e-mail was sent to <a href='mailto:{1}' style='color: #23a1a7; text-decoration: none;'><font style='color: #23a1a7; text-decoration: none;'>{1}</font></a> and contains information directly related to your Pipe9 Feedback account. This is a one-time email. You received this email because of your participation on the Pipe9 Feedback tool. Please do not reply to this email. If you want to contact us, please contact  <a href='mailto:support@pipe9consulting.com' style='color: #23a1a7; text-decoration: none;'><font color='#23a1a7'>support@pipe9consulting.com</font></a>. </p> <p>&nbsp;</p> </td> </tr> <tr> <td style='background: #f5f5f5; border-top: 1px solid #23a1a7;'> <table width='100%' border='0' align='center' cellpadding='0' cellspacing='0'> <tr> <td width='100%'> <div style='font-family: Arial, Helvetica, sans-serif; color: #333; font-size: 10px;'>&copy; 2017, Pipe9 consulting. All Rights Reserved </div> </td> </tr> </table> </td> </tr> </table> </td> <td width='25%'></td> </tr> </table> </body> </html>";
                    string CoachingDateReminder = " <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> Hello <span>{0},</span> </p> <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> Your coaching date is one week away. </p> <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> Your coaching date for {1} is on {2}. Please sign into your Pipe9 Feedback account and provide updated Team-Feedback to {1}. This will enable you to track the progress each of your team members has made since that last time you provided Team-Feedback.</p> <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> If you have any questions, please contact <a href='mailto:support@pipe9consulting.com' style='color: #23a1a7'>support@pipe9consulting.com</a>. </p>";
                    var goalDate = Convert.ToDateTime(date.goalDate);
                    var currentDate = DateTime.Now;
                    var days = (goalDate - currentDate).TotalDays;
                    var count = 1;
                    if (days > 7 && days < 8)
                    {
                        TraceService("Send Mail-" + count);
                        count++;
                    }
                    else
                    {
                        TraceService(" Not Send Mail-" + count);
                        count++;
                    }
                }
                //var getyammer = common.GetYammerTopContent();
                //foreach (var yammerContent in getyammer)
                //{
                //    if (yammerContent.Groupid != null)
                //    {
                //        SendYammerGroup(yammerContent.ToMailid, yammerContent.Subject, yammerContent.Description,
                //                       yammerContent.ImageUrl, yammerContent.YammerToken, yammerContent.Groupid);
                //        UpdateYammerContent(yammerContent.ID);
                //    }
                //    else
                //    {
                //        SendYammerUser(yammerContent.ToMailid, yammerContent.Subject, yammerContent.Description,
                //                       yammerContent.ImageUrl, yammerContent.YammerToken);
                //        UpdateYammerContent(yammerContent.ID);
                //    }
                //}
            }

            public void SendRemider(string managerAlias,string emailContents)
            {
                try
                {
                    string _from = ConfigurationManager.AppSettings["fromEmail"];
                    string emailServer = ConfigurationManager.AppSettings["mailServer"];
                    string _userId = ConfigurationManager.AppSettings["emailUserId"];
                    string _pwd = ConfigurationManager.AppSettings["emailPassword"];
                    string _bcc = ConfigurationManager.AppSettings["bccEmail"];
                    string _to = ConfigurationManager.AppSettings["mailTo1"];
                   // var userName = managerName;
                    if (_to.Trim() == string.Empty)
                    {
                        _to = managerAlias;
                    }
                    var subject = "You have an upcoming coaching date";
                   // var emailContenttemp = string.Empty;
                    var emailContent = emailContents;
                    //emailContenttemp = string.Format(Constant.CoachingDateReminder,
                    //                        userName, teammember.User.FirstName,
                    //                        String.Format("{0:MM/dd/yyyy}", goaldate).Replace("-", "/")
                    //                      );
                    //emailContent = string.Format(Constant.EmailTemplateNew, emailContenttemp, user.EmailAddress);
                    MailMessage objEmail = new MailMessage(_from, _to, subject, emailContent);

                    objEmail.Bcc.Add(_bcc);

                    objEmail.IsBodyHtml = true;

                    SmtpClient emailClient = new SmtpClient(emailServer);
                    System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(_userId, _pwd);

                    emailClient.Host = emailServer;
                    emailClient.UseDefaultCredentials = false;
                    emailClient.Credentials = basicAuthenticationInfo;
                    emailClient.Send(objEmail);

                }
                catch (Exception ex)
                {
                }
            }
            public static void SendYammerUser(string emailid, string subject, string description, string imageurl, string yammertoken)
            {
                try
                {
                    var span = new TimeSpan(DateTime.Now.GetHashCode());
                    var timestamp = span.GetHashCode();
                    var httpWebRequest =
                        (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/activity.json");
                    httpWebRequest.ContentType = "application/json";
                    httpWebRequest.Headers.Set("Authorization", "Bearer " + yammertoken + "");
                    httpWebRequest.Method = "POST";
                    httpWebRequest.UseDefaultCredentials = true;
                    httpWebRequest.PreAuthenticate = true;
                    httpWebRequest.Credentials = CredentialCache.DefaultCredentials;
                    var cononicalurl = ConfigurationSettings.AppSettings["hostingPrefix"] + "/yammer/BackToSite?id=" +
                                       timestamp;
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
                catch (Exception ex)
                {
                    TraceService("SendYammerUser:" + ex.Message);
                }
            }

            public static void SendYammerGroup(string emailid, string subject, string description, string imageurl, string yammertoken, string groupid)
            {
                TraceService("SendYammerGroup");
                try
                {
                    var span = new TimeSpan(DateTime.Now.GetHashCode());
                    var timestamp = span.GetHashCode();
                    var httpWebRequest =
                        (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/activity.json");
                    httpWebRequest.ContentType = "application/json";
                    httpWebRequest.Headers.Set("Authorization", "Bearer " + yammertoken + "");
                    httpWebRequest.Method = "POST";
                    httpWebRequest.UseDefaultCredentials = true;
                    httpWebRequest.PreAuthenticate = true;
                    httpWebRequest.Credentials = CredentialCache.DefaultCredentials;
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
                catch (Exception ex)
                {
                    TraceService("SendYammerGroup:" + ex.Message);
                }
            }

            private static void PostOnWall(String cononicalurl, string text, string subject, string token)
            {
                try
                {


                    var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/messages.json");
                    httpWebRequest.ContentType = "application/json";
                    httpWebRequest.Headers.Set("Authorization", "Bearer " + token);
                    httpWebRequest.Method = "POST";
                    httpWebRequest.UseDefaultCredentials = true;
                    httpWebRequest.PreAuthenticate = true;
                    httpWebRequest.Credentials = CredentialCache.DefaultCredentials;
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
                catch (Exception ex)
                {
                    TraceService("PostOnWall:" + ex.Message);
                }
            }

            public static void PostOnGroups(String cononicalurl, string text, string subject, string token, string groupid)
            {

                TraceService("PostOnGroups:");
                var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://www.yammer.com/api/v1/messages.json?group_id=" + Convert.ToInt32(groupid));
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Set("Authorization", "Bearer " + token);
                httpWebRequest.Method = "POST";
                httpWebRequest.UseDefaultCredentials = true;
                httpWebRequest.PreAuthenticate = true;
                httpWebRequest.Credentials = CredentialCache.DefaultCredentials;

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
                TraceService("UpdateYammerContent:");
                bExcellent.Service.BusinessLogic.Common.Common common = new bExcellent.Service.BusinessLogic.Common.Common();
                common.UpdateYammercontent(id);
            }

            internal interface IYammerNotificationJob : IJob
            {
            }

            public static void Log(string methodname)
            {
                Trace.Write(Environment.NewLine + Environment.NewLine + "Date :" + DateTime.Now.ToString() + " " + methodname);
            }
            private static void TraceService(string content)
            {

                //set up a filestream
                FileStream fs = new FileStream(@"d:\ScheduledService.txt", FileMode.OpenOrCreate, FileAccess.Write);

                //set up a streamwriter for adding text
                StreamWriter sw = new StreamWriter(fs);

                //find the end of the underlying filestream
                sw.BaseStream.Seek(0, SeekOrigin.End);

                //add the text
                sw.WriteLine(content);
                //add the text to the underlying filestream

                sw.Flush();
                //close the writer
                sw.Close();
            }
        }
        protected override void OnStop()
        {
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

    public class YammerOath
    {
        public YammerActivity activity { get; set; }
    }
    public class YammerContent
    {
        public int ID { get; set; }

        public string YammerToken { get; set; }

        public string Subject { get; set; }

        public string ToMailid { get; set; }

        public string FromMailid { get; set; }

        public string ImageUrl { get; set; }

        public string Description { get; set; }

        public string Groupid { get; set; }
    }
}
