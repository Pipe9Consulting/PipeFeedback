using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using bExcellent.Service.BusinessLogic;
using bExcellent.Service.Util.Domain;
using Quartz;
using Quartz.Impl;
using Quartz.Impl.Triggers;

namespace DashBoardEmails
{
    public partial class SchedulerService : ServiceBase
    {
        private static IScheduler _scheduler;

        public SchedulerService()
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

        protected override void OnStop()
        {
        }

        private static void AddJobs()
        {
            TraceService("start service");
            const string cronExpPlan = "0 0/3 * 1/1 * ? *";  // need to replace for every day 12 am :0 0 0 1/1 * ? *
            var planNotificationJob = new PlanNotificationJob();
            var planNotificationJobDetail = new JobDetailImpl("DashBoardPlanNotificationJob", "DashBoardPlanNotificationGroup", planNotificationJob.GetType());
            var planNotificationtrigger = new CronTriggerImpl("DashBoardPlanNotificationTrigger", "DashBoardPlanNotificationGroup", cronExpPlan);
            _scheduler.ScheduleJob(planNotificationJobDetail, planNotificationtrigger);
        }

        private interface IPlanNotificationJob : IJob
        {
        }

        private class PlanNotificationJob : IPlanNotificationJob
        {
            public void Execute(IJobExecutionContext context)
            {
                ListPOe();
                //TraceService("Another entry at " + DateTime.Now);
            }
        }

        private static void ListPOe()
        {
            TraceService("Tracing by 3 mins");
           
        }

        //Demo Purpose
        private static void TraceService(string content)
        {
            var fs = new FileStream(@"d:\ScheduledService.txt", FileMode.OpenOrCreate, FileAccess.Write);
            var sw = new StreamWriter(fs);
            sw.BaseStream.Seek(0, SeekOrigin.End);
            sw.WriteLine(content);
            sw.Flush();
            sw.Close();
        }
    }
}