using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using Quartz;
using Quartz.Impl;
using Quartz.Impl.Triggers;
using System.Web;
using bExcellent.Service.BusinessLogic;

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
                    var goalDate = Convert.ToDateTime(date.GoalDate);
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
