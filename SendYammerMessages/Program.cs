using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Quartz;
using Quartz.Impl;
using Quartz.Impl.Triggers;
using SendYammerMessages.CommonService;

namespace SendYammerMessages
{
    internal class Program
    {
        private static IScheduler _scheduler;

        private static void Main(string[] args)
        {
        }

        public void GetYammerContent()
        {
            var common = new CommonClient();
            var getyammer = new List<YammerContent>(common.GetYammerTopContent());
            foreach (var yammerContent in getyammer)
            {
                if (yammerContent.Groupid != null)
                {
                }
                else
                {
                }
            }
        }

        public void SendYammerUser(string emailid, string subject, string description, string imageurl, string yammertoken)
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

            // PostOnWall(cononicalurl, text, subject, user.YammerToken);
        }

        public void SendYammerGroup(string emailid, string subject, string description, string imageurl, string yammertoken, string groupid)
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
}