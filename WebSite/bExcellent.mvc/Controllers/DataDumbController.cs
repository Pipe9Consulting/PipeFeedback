using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using bExcellent.mvc.CommonWCF;
using bExcellent.mvc.FeedbackWCF;
using ExcelGenerator;
using Question = bExcellent.mvc.CommonWCF.Question;
using User = bExcellent.mvc.CommonWCF.User;

namespace bExcellent.mvc.Controllers
{
    public class DataDumbController : Controller
    {
        //
        // GET: /DataDumb/
        public ActionResult DataDumbReport()
        {
            return View();
        }
        public void GetMSAReport()
        {
            DataTable dataTable = MSAReportDump();

            string filename = "Manager DataDump Report.xlsx";

            //    string templatePath = HttpContext.Current.Server.MapPath("~/") + "\\Reports\\ExcelTemplates\\DataDump.xlsx";
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "ExcelTemplates\\MSADataDump.xlsx";

            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Manager Report");

            //passed down to the client

            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));

            ms2.Position = 0;

            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }
        public void GetPSEReport()
        {
            DataTable dataTable = PSEReportDump();

            string filename = "PSE DataDump Report.xlsx";

            //    string templatePath = HttpContext.Current.Server.MapPath("~/") + "\\Reports\\ExcelTemplates\\DataDump.xlsx";
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "ExcelTemplates\\PSE_DataDumb.xlsx";

            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Manager Report");

            //passed down to the client

            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));

            ms2.Position = 0;

            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }
        public void GetMSAPrioritiesReport()
        {
            DataTable dataTable = MSAPrioritiesDump();

            string filename = "MSA Priority Report.xlsx";

            //    string templatePath = HttpContext.Current.Server.MapPath("~/") + "\\Reports\\ExcelTemplates\\DataDump.xlsx";
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "ExcelTemplates\\MSADevPriorities.xlsx";

            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Manager Report");

            //passed down to the client

            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));

            ms2.Position = 0;

            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }
        internal DataTable PSEReportDump()
        {
            //  var feedback = new FeedbackServiceClient();
            DataTable table = PSETableStructure();
            var commonClient = new CommonClient();
            var report = commonClient.GetOverallReportsCalculated().OverAllData;
            foreach (var a in report)
            {
                DataRow dr = table.NewRow();
                dr["MPLID"] = a.Mplid;
                dr["PartnerName"] = a.PartnerName;
                dr["TimeZone"] = a.TimeZone;
                dr["Area"] = a.Area;
                dr["Country"] = a.Country;
                dr["DET"] = a.DET;
                dr["PSE"] = a.FirstName + " " + a.LastName;
                dr["PSE Alias"] = a.EmailId;
                dr["Manager"] = a.ManagerFirstName + " " + a.ManagerLastName;
                dr["Mgr Alias"] = a.ManagerAlias;

                dr["AreaLead"] = a.AreaLeadFirstName + " " + a.AreaLeadLastName;
                dr["AL Alias"] = a.AreaLeadAlias;

                dr["TZ Lead"] = a.TimeZoneFirstName + " " + a.TimeZoneLastName;
                dr["TZ Alias"] = a.TimeZoneAlias;
                dr["Completions"] = a.Completions;
                dr["Role"] = a.Role;
                dr["Momentum"] = a.Momentum;
                dr["Marketting"] = a.Marketting;
                dr["Sales"] = a.Sales;
                dr["Focus"] = a.Focus;
                dr["Services"] = a.Services;
                dr["IP"] = a.Ip;
                dr["CustomerAcquistion"] = Math.Round(a.XAxis, 2);
                dr["IndustryFocus"] = Math.Round(a.YAxis, 2);
                dr["IndustryFocus1"] = a.IndFcous1;
                dr["IndustryFocus2"] = a.IndFcous2;

                int counts = 1;
                if (a.PartnerResults != null)
                {
                    //var count = 0;
                    foreach (var ans in a.PartnerResults)
                    {
                        if (counts <= 50)
                        {
                            dr["Q" + counts] = ans.Answer;
                            counts++;
                        }

                    }
                }
                dr["CompletedOn"] = a.CompletedOn.ToString("MM-dd-yyyy");


                table.Rows.Add(dr);
            }
            return table;

        }
        internal DataTable MSAReportDump()
        {
            var feedback = new FeedbackServiceClient();
            DataTable table = MSATableStructure();
            var userwithid = feedback.GetManagerReportDumb(2, 27);
            var usecount = 1;
            var poe1 = feedback.GetManagerReportDumb(2, 27);
            var selfpoe1 = feedback.GetTeamReportDumb(1, 27);
            foreach (ManagerFeedback userFeedback in poe1)
            {
                var poeid = 27;
                int feedBackid = (userFeedback.FeedbackId == null) ? 0 : userFeedback.FeedbackId.Value;
                var common = new CommonClient();
                var managerDetails = common.GetUserdetailsByMappingId(userFeedback.MangagerPoeId);
                var teamMemberDetails = common.GetUserdetailsByMappingId(userFeedback.TeammenberPoeId.Value);
                var managerwcsiScore = common.GetAvgWcsiScore(feedBackid.ToString());
                var poeResults = feedback.GetModuleScores(feedBackid.ToString(), poeid);
                var capScore = feedback.GetCapabilityModuleScores(feedBackid.ToString(), poeid);
                var impScore = common.GetImportanceAnswer(managerDetails.User.UserId, poeid);
                var priorities = common.GetSelfDevPrioritiesReport(teamMemberDetails.User.UserId, poeid);
                //  var teamMemberDetails = common.GetUserdetailsByMappingId(userFeedback.TeammenberPoeId.Value);
                var getSelfFbid = selfpoe1.FirstOrDefault(a => a.UserId == userFeedback.TeammenberPoeId.Value && poeid == teamMemberDetails.POE.POEId).FeedbackId;
                var selfwcsiScore = common.GetAvgWcsiScore(getSelfFbid.ToString());
                var getSelfresult = feedback.GetModuleScores(getSelfFbid.ToString(), poeid);
                var selfcapScore = feedback.GetCapabilityModuleScores(getSelfFbid.ToString(), poeid);
                var selfimpScore = common.GetImportanceAnswer(teamMemberDetails.User.UserId, poeid);
                var overallmanagercapscore = 0;
                var capCount = 0;
                foreach (DataDumbModuleScore c in capScore.ModuleScores)
                {
                    overallmanagercapscore = (int)(overallmanagercapscore + c.QuestionScores.Sum(a => a.Score));
                    capCount = capCount + c.QuestionScores.Count();
                }
                double capScoreLast = (double)overallmanagercapscore / capCount;
                var finalCap = ((double)capScoreLast / 4) * 100;
                var impScoreCalc = impScore.Sum(a => Convert.ToInt32(a.Answers));
                double impSocorelast = (double)impScoreCalc / capCount;
                var finalimp = ((double)impSocorelast / 4) * 100;

                var selfoverallmanagercapscore = 0;
                foreach (DataDumbModuleScore c in selfcapScore.ModuleScores)
                {
                    selfoverallmanagercapscore = (int)(selfoverallmanagercapscore + c.QuestionScores.Sum(a => a.Score));
                    //capCount = capCount + c.QuestionScores.Count();
                }
                double selfcapScoreLast = (double)selfoverallmanagercapscore / capCount;
                var selffinalCap = ((double)selfcapScoreLast / 4) * 100;
                var selfimpScoreCalc = selfimpScore.Sum(a => Convert.ToInt32(a.Answers));
                double selfimpSocorelast = (double)selfimpScoreCalc / capCount;
                var selffinalimp = ((double)selfimpSocorelast / 4) * 100;
                foreach (DataDumbModuleScore feedbackResultse in poeResults.ModuleScores)
                {
                    foreach (DataDumbQuestionScore Questions in feedbackResultse.QuestionScores)
                    {
                        DataRow dr = table.NewRow();
                        var getCapScore = capScore.ModuleScores.FirstOrDefault(a => a.Moduleid == feedbackResultse.Moduleid).QuestionScores;
                        var getselfCapresult = selfcapScore.ModuleScores.FirstOrDefault(a => a.Moduleid == feedbackResultse.Moduleid).QuestionScores;
                        dr["Maanger Full Name"] = managerDetails.User.FirstName + " " + managerDetails.User.LastName;
                        dr["Manager Alias"] = managerDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                        dr["Team member Full Name"] = "MSA0" + ((usecount.ToString().Length == 1) ? "0" + usecount : usecount.ToString());
                        dr["Team member Alias"] = teamMemberDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                        dr["Relation"] = managerDetails.Designation.Name;
                        dr["Area"] = teamMemberDetails.User.Area.Name;
                        dr["Country/Location"] = teamMemberDetails.User.Country.Name;
                        dr["Role Excellence Profile"] = managerDetails.POE.Name;
                        dr["Question Id"] = Questions.Questionid;
                        dr["Report Questions"] = Questions.ReportQuestion;
                        dr["Short Questions"] = Questions.ShortQuetionText;
                        dr["Long Questions"] = Questions.QuestionText;
                        dr["Module Id"] = feedbackResultse.Moduleid;
                        dr["Module Name"] = feedbackResultse.ModuleName;
                        dr["Manager Frequency"] = Questions.Score;
                        dr["Manager Capability"] = getCapScore.FirstOrDefault(a => a.Questionid == Questions.Questionid).Score;
                        dr["Manager Importance"] = impScore.FirstOrDefault(a => a.Questionid == Questions.Questionid).Answers;
                        dr["Self Frequency"] = getSelfresult.ModuleScores.FirstOrDefault(a => a.Moduleid == feedbackResultse.Moduleid).QuestionScores.FirstOrDefault(a => a.Questionid == Questions.Questionid).Score;
                        dr["Self Capability"] = getselfCapresult.FirstOrDefault(a => a.Questionid == Questions.Questionid).Score;
                        dr["Self Importance"] = selfimpScore.FirstOrDefault(a => a.Questionid == Questions.Questionid).Answers;
                        dr["MF Overall"] = managerwcsiScore.FirstOrDefault().wcsi;
                        dr["MC Overall"] = finalCap;
                        dr["MI Overall"] = finalimp;
                        dr["SF Overall"] = selfwcsiScore.FirstOrDefault().wcsi;
                        dr["SC Overall"] = selffinalCap;
                        dr["SI Overall"] = selffinalimp;
                        dr["Development Priorities"] = (priorities.FirstOrDefault(a => a.QuestionId == Questions.Questionid) != null) ? priorities.FirstOrDefault(a => a.QuestionId == Questions.Questionid).Bucketorder : 0;
                        table.Rows.Add(dr);
                    }

                }

                usecount++;
            }

            var poe2 = feedback.GetManagerReportDumb(2, 28);
            var selfpoe2 = feedback.GetTeamReportDumb(1, 28);
            foreach (ManagerFeedback userFeedback in poe2)
            {
                var poeid = 28;
                int feedBackid = (userFeedback.FeedbackId == null) ? 0 : userFeedback.FeedbackId.Value;
                var common = new CommonClient();
                var managerDetails = common.GetUserdetailsByMappingId(userFeedback.MangagerPoeId);
                var teamMemberDetails = common.GetUserdetailsByMappingId(userFeedback.TeammenberPoeId.Value);
                var managerwcsiScore = common.GetAvgWcsiScore(feedBackid.ToString());
                var poeResults = feedback.GetModuleScores(feedBackid.ToString(), poeid);
                var capScore = feedback.GetCapabilityModuleScores(feedBackid.ToString(), poeid);
                var impScore = common.GetImportanceAnswer(managerDetails.User.UserId, poeid);
                var priorities = common.GetSelfDevPrioritiesReport(teamMemberDetails.User.UserId, poeid);
                //  var teamMemberDetails = common.GetUserdetailsByMappingId(userFeedback.TeammenberPoeId.Value);
                var getSelfFbid = (selfpoe2.FirstOrDefault(a => a.UserId == userFeedback.TeammenberPoeId.Value && poeid == teamMemberDetails.POE.POEId) != null) ? selfpoe2.FirstOrDefault(a => a.UserId == userFeedback.TeammenberPoeId.Value && poeid == teamMemberDetails.POE.POEId).FeedbackId : 0;
                var selfwcsiScore = common.GetAvgWcsiScore(getSelfFbid.ToString());
                DataDumbScore getSelfresult = new DataDumbScore();
                DataDumbScore selfcapScore = new DataDumbScore();
                QuestionScore[] selfimpScore = null;
                if (getSelfFbid != 0)
                {
                    getSelfresult = feedback.GetModuleScores(getSelfFbid.ToString(), poeid);
                    selfcapScore = feedback.GetCapabilityModuleScores(getSelfFbid.ToString(), poeid);
                    selfimpScore = common.GetImportanceAnswer(teamMemberDetails.User.UserId, poeid);
                }

                var overallmanagercapscore = 0;
                var capCount = 0;
                foreach (DataDumbModuleScore c in capScore.ModuleScores)
                {
                    overallmanagercapscore = (int)(overallmanagercapscore + c.QuestionScores.Sum(a => a.Score));
                    capCount = capCount + c.QuestionScores.Count();
                }
                double capScoreLast = (double)overallmanagercapscore / capCount;
                var finalCap = ((double)capScoreLast / 4) * 100;
                var impScoreCalc = impScore.Sum(a => Convert.ToInt32(a.Answers));
                double impSocorelast = (double)impScoreCalc / capCount;
                var finalimp = ((double)impSocorelast / 4) * 100;


                var selfoverallmanagercapscore = 0;
                if (selfcapScore.ModuleScores != null)
                {
                    foreach (DataDumbModuleScore c in selfcapScore.ModuleScores)
                    {
                        selfoverallmanagercapscore =
                            (int)(selfoverallmanagercapscore + c.QuestionScores.Sum(a => a.Score));
                        //capCount = capCount + c.QuestionScores.Count();
                    }
                }
                double selfcapScoreLast = (double)selfoverallmanagercapscore / capCount;
                var selffinalCap = ((double)selfcapScoreLast / 4) * 100;
                var selfimpScoreCalc = (selfimpScore != null) ? selfimpScore.Sum(a => Convert.ToInt32(a.Answers)) : 0;
                double selfimpSocorelast = (double)selfimpScoreCalc / capCount;
                var selffinalimp = ((double)selfimpSocorelast / 4) * 100;
                foreach (DataDumbModuleScore feedbackResultse in poeResults.ModuleScores)
                {
                    foreach (DataDumbQuestionScore Questions in feedbackResultse.QuestionScores)
                    {
                        DataRow dr = table.NewRow();
                        var getCapScore = (capScore.ModuleScores != null) ? capScore.ModuleScores.FirstOrDefault(a => a.Moduleid == feedbackResultse.Moduleid).QuestionScores : null;
                        var getselfCapresult = (selfcapScore.ModuleScores != null) ? selfcapScore.ModuleScores.FirstOrDefault(a => a.Moduleid == feedbackResultse.Moduleid).QuestionScores : null;
                        dr["Maanger Full Name"] = managerDetails.User.FirstName + " " + managerDetails.User.LastName;
                        dr["Manager Alias"] = managerDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                        dr["Team member Full Name"] = "MSA0" + ((usecount.ToString().Length == 1) ? "0" + usecount : usecount.ToString());
                        dr["Team member Alias"] = teamMemberDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                        dr["Relation"] = managerDetails.Designation.Name;
                        dr["Area"] = teamMemberDetails.User.Area.Name;
                        dr["Country/Location"] = teamMemberDetails.User.Country.Name;
                        dr["Role Excellence Profile"] = managerDetails.POE.Name;
                        dr["Question Id"] = Questions.Questionid;
                        dr["Report Questions"] = Questions.ReportQuestion;
                        dr["Short Questions"] = Questions.ShortQuetionText;
                        dr["Long Questions"] = Questions.QuestionText;
                        dr["Module Id"] = feedbackResultse.Moduleid;
                        dr["Module Name"] = feedbackResultse.ModuleName;
                        dr["Manager Frequency"] = Questions.Score;
                        dr["Manager Capability"] = (getCapScore != null) ? getCapScore.FirstOrDefault(a => a.Questionid == Questions.Questionid).Score : 0;
                        dr["Manager Importance"] = impScore.FirstOrDefault(a => a.Questionid == Questions.Questionid).Answers;
                        dr["Self Frequency"] = (getSelfresult.ModuleScores != null) ? getSelfresult.ModuleScores.FirstOrDefault(a => a.Moduleid == feedbackResultse.Moduleid).QuestionScores.FirstOrDefault(a => a.Questionid == Questions.Questionid).Score : 0;
                        dr["Self Capability"] = (getselfCapresult != null) ? getselfCapresult.FirstOrDefault(a => a.Questionid == Questions.Questionid).Score : 0;
                        dr["Self Importance"] = (selfimpScore != null) ? selfimpScore.FirstOrDefault(a => a.Questionid == Questions.Questionid).Answers : "0";
                        dr["MF Overall"] = managerwcsiScore.FirstOrDefault().wcsi;
                        dr["MC Overall"] = finalCap;
                        dr["MI Overall"] = finalimp;
                        dr["SF Overall"] = selfwcsiScore.FirstOrDefault().wcsi;
                        dr["SC Overall"] = selffinalCap;
                        dr["SI Overall"] = selffinalimp;
                        dr["Development Priorities"] = (priorities.FirstOrDefault(a => a.QuestionId == Questions.Questionid) != null) ? priorities.FirstOrDefault(a => a.QuestionId == Questions.Questionid).Bucketorder : 0;
                        table.Rows.Add(dr);
                    }

                }

                usecount++;
            }
            var poe3 = feedback.GetManagerReportDumb(2, 29);
            var selfpoe3 = feedback.GetTeamReportDumb(1, 29);
            foreach (ManagerFeedback userFeedback in poe3)
            {
                var poeid = 29;
                int feedBackid = (userFeedback.FeedbackId == null) ? 0 : userFeedback.FeedbackId.Value;
                var common = new CommonClient();
                var managerDetails = common.GetUserdetailsByMappingId(userFeedback.MangagerPoeId);
                var teamMemberDetails = common.GetUserdetailsByMappingId(userFeedback.TeammenberPoeId.Value);
                var managerwcsiScore = common.GetAvgWcsiScore(feedBackid.ToString());
                var poeResults = feedback.GetModuleScores(feedBackid.ToString(), poeid);
                var capScore = feedback.GetCapabilityModuleScores(feedBackid.ToString(), poeid);
                var impScore = common.GetImportanceAnswer(managerDetails.User.UserId, poeid);
                var priorities = common.GetSelfDevPrioritiesReport(teamMemberDetails.User.UserId, poeid);
                //  var teamMemberDetails = common.GetUserdetailsByMappingId(userFeedback.TeammenberPoeId.Value);
                var getSelfFbid = (selfpoe3.FirstOrDefault(a => a.UserId == userFeedback.TeammenberPoeId.Value && poeid == teamMemberDetails.POE.POEId) != null) ? selfpoe3.FirstOrDefault(a => a.UserId == userFeedback.TeammenberPoeId.Value && poeid == teamMemberDetails.POE.POEId).FeedbackId : 0;
                var selfwcsiScore = common.GetAvgWcsiScore(getSelfFbid.ToString());
                DataDumbScore getSelfresult = new DataDumbScore();
                DataDumbScore selfcapScore = new DataDumbScore();
                QuestionScore[] selfimpScore = null;
                if (getSelfFbid != 0)
                {
                    getSelfresult = feedback.GetModuleScores(getSelfFbid.ToString(), poeid);
                    selfcapScore = feedback.GetCapabilityModuleScores(getSelfFbid.ToString(), poeid);
                    selfimpScore = common.GetImportanceAnswer(teamMemberDetails.User.UserId, poeid);
                }

                var overallmanagercapscore = 0;
                var capCount = 0;
                foreach (DataDumbModuleScore c in capScore.ModuleScores)
                {
                    overallmanagercapscore = (int)(overallmanagercapscore + c.QuestionScores.Sum(a => a.Score));
                    capCount = capCount + c.QuestionScores.Count();
                }
                double capScoreLast = (double)overallmanagercapscore / capCount;
                var finalCap = ((double)capScoreLast / 4) * 100;
                var impScoreCalc = impScore.Sum(a => Convert.ToInt32(a.Answers));
                double impSocorelast = (double)impScoreCalc / capCount;
                var finalimp = ((double)impSocorelast / 4) * 100;


                var selfoverallmanagercapscore = 0;
                if (selfcapScore.ModuleScores != null)
                {
                    foreach (DataDumbModuleScore c in selfcapScore.ModuleScores)
                    {
                        selfoverallmanagercapscore =
                            (int)(selfoverallmanagercapscore + c.QuestionScores.Sum(a => a.Score));
                        //capCount = capCount + c.QuestionScores.Count();
                    }
                }
                double selfcapScoreLast = (double)selfoverallmanagercapscore / capCount;
                var selffinalCap = ((double)selfcapScoreLast / 4) * 100;
                var selfimpScoreCalc = (selfimpScore != null) ? selfimpScore.Sum(a => Convert.ToInt32(a.Answers)) : 0;
                double selfimpSocorelast = (double)selfimpScoreCalc / capCount;
                var selffinalimp = ((double)selfimpSocorelast / 4) * 100;
                foreach (DataDumbModuleScore feedbackResultse in poeResults.ModuleScores)
                {
                    foreach (DataDumbQuestionScore Questions in feedbackResultse.QuestionScores)
                    {
                        DataRow dr = table.NewRow();
                        var getCapScore = (capScore.ModuleScores != null) ? capScore.ModuleScores.FirstOrDefault(a => a.Moduleid == feedbackResultse.Moduleid).QuestionScores : null;
                        var getselfCapresult = (selfcapScore.ModuleScores != null) ? selfcapScore.ModuleScores.FirstOrDefault(a => a.Moduleid == feedbackResultse.Moduleid).QuestionScores : null;
                        dr["Maanger Full Name"] = managerDetails.User.FirstName + " " + managerDetails.User.LastName;
                        dr["Manager Alias"] = managerDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                        dr["Team member Full Name"] = "MSA0" + ((usecount.ToString().Length == 1) ? "0" + usecount : usecount.ToString());
                        dr["Team member Alias"] = teamMemberDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                        dr["Relation"] = managerDetails.Designation.Name;
                        dr["Area"] = teamMemberDetails.User.Area.Name;
                        dr["Country/Location"] = teamMemberDetails.User.Country.Name;
                        dr["Role Excellence Profile"] = managerDetails.POE.Name;
                        dr["Question Id"] = Questions.Questionid;
                        dr["Report Questions"] = Questions.ReportQuestion;
                        dr["Short Questions"] = Questions.ShortQuetionText;
                        dr["Long Questions"] = Questions.QuestionText;
                        dr["Module Id"] = feedbackResultse.Moduleid;
                        dr["Module Name"] = feedbackResultse.ModuleName;
                        dr["Manager Frequency"] = Questions.Score;
                        dr["Manager Capability"] = (getCapScore != null) ? getCapScore.FirstOrDefault(a => a.Questionid == Questions.Questionid).Score : 0;
                        dr["Manager Importance"] = impScore.FirstOrDefault(a => a.Questionid == Questions.Questionid).Answers;
                        dr["Self Frequency"] = (getSelfresult.ModuleScores != null) ? getSelfresult.ModuleScores.FirstOrDefault(a => a.Moduleid == feedbackResultse.Moduleid).QuestionScores.FirstOrDefault(a => a.Questionid == Questions.Questionid).Score : 0;
                        dr["Self Capability"] = (getselfCapresult != null) ? getselfCapresult.FirstOrDefault(a => a.Questionid == Questions.Questionid).Score : 0;
                        dr["Self Importance"] = (selfimpScore != null) ? selfimpScore.FirstOrDefault(a => a.Questionid == Questions.Questionid).Answers : "0";
                        dr["MF Overall"] = managerwcsiScore.FirstOrDefault().wcsi;
                        dr["MC Overall"] = finalCap;
                        dr["MI Overall"] = finalimp;
                        dr["SF Overall"] = selfwcsiScore.FirstOrDefault().wcsi;
                        dr["SC Overall"] = selffinalCap;
                        dr["SI Overall"] = selffinalimp;
                        dr["Development Priorities"] = (priorities.FirstOrDefault(a => a.QuestionId == Questions.Questionid) != null) ? priorities.FirstOrDefault(a => a.QuestionId == Questions.Questionid).Bucketorder : 0;
                        table.Rows.Add(dr);
                    }

                }

                usecount++;
            }

            var audienceMarketting = feedback.GetManagerReportDumb(2, 30);
            var getSelfScore = feedback.GetTeamReportDumb(1, 30);
            foreach (ManagerFeedback userFeedback in audienceMarketting)
            {
                var poeid = 30;
                int feedBackid = (userFeedback.FeedbackId == null) ? 0 : userFeedback.FeedbackId.Value;
                var common = new CommonClient();
                var managerDetails = common.GetUserdetailsByMappingId(userFeedback.MangagerPoeId);
                var teamMemberDetails = common.GetUserdetailsByMappingId(userFeedback.TeammenberPoeId.Value);
                var managerwcsiScore = common.GetAvgWcsiScore(feedBackid.ToString());
                var poeResults = feedback.GetModuleScores(feedBackid.ToString(), poeid);
                var capScore = feedback.GetCapabilityModuleScores(feedBackid.ToString(), poeid);
                var impScore = common.GetImportanceAnswer(managerDetails.User.UserId, poeid);
                var priorities = common.GetSelfDevPrioritiesReport(teamMemberDetails.User.UserId, poeid);
                //  var teamMemberDetails = common.GetUserdetailsByMappingId(userFeedback.TeammenberPoeId.Value);
                var getSelfFbid = getSelfScore.FirstOrDefault(a => a.UserId == userFeedback.TeammenberPoeId.Value && poeid == teamMemberDetails.POE.POEId).FeedbackId;
                var selfwcsiScore = common.GetAvgWcsiScore(getSelfFbid.ToString());
                var getSelfresult = feedback.GetModuleScores(getSelfFbid.ToString(), poeid);
                var selfcapScore = feedback.GetCapabilityModuleScores(getSelfFbid.ToString(), poeid);
                var selfimpScore = common.GetImportanceAnswer(teamMemberDetails.User.UserId, poeid);
                var overallmanagercapscore = 0;
                var capCount = 0;
                foreach (DataDumbModuleScore c in capScore.ModuleScores)
                {
                    overallmanagercapscore = (int)(overallmanagercapscore + c.QuestionScores.Sum(a => a.Score));
                    capCount = capCount + c.QuestionScores.Count();
                }
                double capScoreLast = (double)overallmanagercapscore / capCount;
                var finalCap = ((double)capScoreLast / 4) * 100;
                var impScoreCalc = impScore.Sum(a => Convert.ToInt32(a.Answers));
                double impSocorelast = (double)impScoreCalc / capCount;
                var finalimp = ((double)impSocorelast / 4) * 100;

                var selfoverallmanagercapscore = 0;
                foreach (DataDumbModuleScore c in capScore.ModuleScores)
                {
                    selfoverallmanagercapscore = (int)(selfoverallmanagercapscore + c.QuestionScores.Sum(a => a.Score));
                    //capCount = capCount + c.QuestionScores.Count();
                }
                double selfcapScoreLast = (double)selfoverallmanagercapscore / capCount;
                var selffinalCap = ((double)selfcapScoreLast / 4) * 100;
                var selfimpScoreCalc = selfimpScore.Sum(a => Convert.ToInt32(a.Answers));
                double selfimpSocorelast = (double)selfimpScoreCalc / capCount;
                var selffinalimp = ((double)selfimpSocorelast / 4) * 100;
                foreach (DataDumbModuleScore feedbackResultse in poeResults.ModuleScores)
                {
                    foreach (DataDumbQuestionScore Questions in feedbackResultse.QuestionScores)
                    {
                        DataRow dr = table.NewRow();
                        var getCapScore = capScore.ModuleScores.FirstOrDefault(a => a.Moduleid == feedbackResultse.Moduleid).QuestionScores;
                        var getselfCapresult = selfcapScore.ModuleScores.FirstOrDefault(a => a.Moduleid == feedbackResultse.Moduleid).QuestionScores;
                        dr["Maanger Full Name"] = managerDetails.User.FirstName + " " + managerDetails.User.LastName;
                        dr["Manager Alias"] = managerDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                        dr["Team member Full Name"] = "MSA0" + ((usecount.ToString().Length == 1) ? "0" + usecount : usecount.ToString());
                        dr["Team member Alias"] = teamMemberDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                        dr["Relation"] = managerDetails.Designation.Name;
                        dr["Area"] = teamMemberDetails.User.Area.Name;
                        dr["Country/Location"] = teamMemberDetails.User.Country.Name;
                        dr["Role Excellence Profile"] = managerDetails.POE.Name;
                        dr["Question Id"] = Questions.Questionid;
                        dr["Report Questions"] = Questions.ReportQuestion;
                        dr["Short Questions"] = Questions.ShortQuetionText;
                        dr["Long Questions"] = Questions.QuestionText;
                        dr["Module Id"] = feedbackResultse.Moduleid;
                        dr["Module Name"] = feedbackResultse.ModuleName;
                        dr["Manager Frequency"] = Questions.Score;
                        dr["Manager Capability"] = getCapScore.FirstOrDefault(a => a.Questionid == Questions.Questionid).Score;
                        dr["Manager Importance"] = impScore.FirstOrDefault(a => a.Questionid == Questions.Questionid).Answers;
                        dr["Self Frequency"] = getSelfresult.ModuleScores.FirstOrDefault(a => a.Moduleid == feedbackResultse.Moduleid).QuestionScores.FirstOrDefault(a => a.Questionid == Questions.Questionid).Score;
                        dr["Self Capability"] = getselfCapresult.FirstOrDefault(a => a.Questionid == Questions.Questionid).Score;
                        dr["Self Importance"] = selfimpScore.FirstOrDefault(a => a.Questionid == Questions.Questionid).Answers;
                        dr["MF Overall"] = managerwcsiScore.FirstOrDefault().wcsi;
                        dr["MC Overall"] = finalCap;
                        dr["MI Overall"] = finalimp;
                        dr["SF Overall"] = selfwcsiScore.FirstOrDefault().wcsi;
                        dr["SC Overall"] = selffinalCap;
                        dr["SI Overall"] = selffinalimp;
                        dr["Development Priorities"] = (priorities.FirstOrDefault(a => a.QuestionId == Questions.Questionid) != null) ? priorities.FirstOrDefault(a => a.QuestionId == Questions.Questionid).Bucketorder : 0;
                        table.Rows.Add(dr);
                    }

                }

                usecount++;
            }
            return table;

        }
        internal DataTable MSAPrioritiesDump()
        {
            var feedback = new FeedbackServiceClient();
            DataTable table = MSAPRiorityTableStructure();
            var usecount = 1;
            var userwithid = feedback.GetManagerReportDumb(2, 27);
            foreach (ManagerFeedback userFeedback in userwithid)
            {
                var common = new CommonClient();
                var managerDetails = common.GetUserdetailsByMappingId(userFeedback.MangagerPoeId);
                var teamMemberDetails = common.GetUserdetailsByMappingId(userFeedback.TeammenberPoeId.Value);
                var poeResults = common.GetSelfDevPrioritiesReport(teamMemberDetails.User.UserId, 27);
                foreach (DevelopmentPriorities feedbackResultse in poeResults)
                {
                    DataRow dr = table.NewRow();
                    dr["Maanger Full Name"] = managerDetails.User.FirstName + " " + managerDetails.User.LastName;
                    dr["Manager Alias"] = managerDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                    dr["Team member Full Name"] = "MSA0" + ((usecount.ToString().Length == 1) ? "0" + usecount : usecount.ToString());
                    dr["Team member Alias"] = teamMemberDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                    dr["Area"] = managerDetails.User.Country.Name;
                    dr["Country/Location"] = managerDetails.User.Area.Name;
                    dr["Role Excellence Profile"] = managerDetails.POE.Name;
                    dr["Question Id"] = feedbackResultse.QuestionId;
                    dr["Questions"] = feedbackResultse.Question;
                    dr["Module Id"] = feedbackResultse.ModuleOrder;
                    dr["Module Name"] = feedbackResultse.ModuleName;
                    dr["Manager Result"] = feedbackResultse.ManagerResult;
                    dr["Self Result"] = feedbackResultse.SelfResult;
                    dr["Manager Rating"] = feedbackResultse.Rating;
                    dr["Manager Capability"] = feedbackResultse.ManagerCapability;
                    dr["Self Capability"] = feedbackResultse.SelfCapability;
                    table.Rows.Add(dr);
                }
                usecount++;
            }
            var partnerChannel = feedback.GetManagerReportDumb(2, 28);
            foreach (ManagerFeedback userFeedback in partnerChannel)
            {
                var common = new CommonClient();
                var managerDetails = common.GetUserdetailsByMappingId(userFeedback.MangagerPoeId);
                var teamMemberDetails = common.GetUserdetailsByMappingId(userFeedback.TeammenberPoeId.Value);
                var poeResults = common.GetSelfDevPrioritiesReport(teamMemberDetails.User.UserId, 28);
                foreach (DevelopmentPriorities feedbackResultse in poeResults)
                {
                    DataRow dr = table.NewRow();
                    dr["Maanger Full Name"] = managerDetails.User.FirstName + " " + managerDetails.User.LastName;
                    dr["Manager Alias"] = managerDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                    dr["Team member Full Name"] = "MSA0" + ((usecount.ToString().Length == 1) ? "0" + usecount : usecount.ToString());
                    dr["Team member Alias"] = teamMemberDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                    dr["Area"] = managerDetails.User.Country.Name;
                    dr["Country/Location"] = managerDetails.User.Area.Name;
                    dr["Role Excellence Profile"] = managerDetails.POE.Name;
                    dr["Question Id"] = feedbackResultse.QuestionId;
                    dr["Questions"] = feedbackResultse.Question;
                    dr["Module Id"] = feedbackResultse.ModuleOrder;
                    dr["Module Name"] = feedbackResultse.ModuleName;
                    dr["Manager Result"] = feedbackResultse.ManagerResult;
                    dr["Self Result"] = feedbackResultse.SelfResult;
                    dr["Manager Rating"] = feedbackResultse.Rating;
                    dr["Manager Capability"] = feedbackResultse.ManagerCapability;
                    dr["Self Capability"] = feedbackResultse.SelfCapability;
                    table.Rows.Add(dr);
                }
                usecount++;
            }
            var productMarketting = feedback.GetManagerReportDumb(2, 29);
            foreach (ManagerFeedback userFeedback in productMarketting)
            {
                var common = new CommonClient();
                var managerDetails = common.GetUserdetailsByMappingId(userFeedback.MangagerPoeId);
                var teamMemberDetails = common.GetUserdetailsByMappingId(userFeedback.TeammenberPoeId.Value);
                var poeResults = common.GetSelfDevPrioritiesReport(teamMemberDetails.User.UserId, 29);
                foreach (DevelopmentPriorities feedbackResultse in poeResults)
                {
                    DataRow dr = table.NewRow();
                    dr["Maanger Full Name"] = managerDetails.User.FirstName + " " + managerDetails.User.LastName;
                    dr["Manager Alias"] = managerDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                    dr["Team member Full Name"] = "MSA0" + ((usecount.ToString().Length == 1) ? "0" + usecount : usecount.ToString());
                    dr["Team member Alias"] = teamMemberDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                    dr["Area"] = managerDetails.User.Country.Name;
                    dr["Country/Location"] = managerDetails.User.Area.Name;
                    dr["Role Excellence Profile"] = managerDetails.POE.Name;
                    dr["Question Id"] = feedbackResultse.QuestionId;
                    dr["Questions"] = feedbackResultse.Question;
                    dr["Module Id"] = feedbackResultse.ModuleOrder;
                    dr["Module Name"] = feedbackResultse.ModuleName;
                    dr["Manager Result"] = feedbackResultse.ManagerResult;
                    dr["Self Result"] = feedbackResultse.SelfResult;
                    dr["Manager Rating"] = feedbackResultse.Rating;
                    dr["Manager Capability"] = feedbackResultse.ManagerCapability;
                    dr["Self Capability"] = feedbackResultse.SelfCapability;
                    table.Rows.Add(dr);
                }
                usecount++;
            }

            var audienceMarketting = feedback.GetManagerReportDumb(2, 30);
            foreach (ManagerFeedback userFeedback in audienceMarketting)
            {
                var common = new CommonClient();
                var managerDetails = common.GetUserdetailsByMappingId(userFeedback.MangagerPoeId);
                var teamMemberDetails = common.GetUserdetailsByMappingId(userFeedback.TeammenberPoeId.Value);
                var poeResults = common.GetSelfDevPrioritiesReport(teamMemberDetails.User.UserId, 30);
                foreach (DevelopmentPriorities feedbackResultse in poeResults)
                {
                    DataRow dr = table.NewRow();
                    dr["Maanger Full Name"] = managerDetails.User.FirstName + " " + managerDetails.User.LastName;
                    dr["Manager Alias"] = managerDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                    dr["Team member Full Name"] = "MSA0" + ((usecount.ToString().Length == 1) ? "0" + usecount : usecount.ToString());
                    dr["Team member Alias"] = teamMemberDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                    dr["Area"] = managerDetails.User.Country.Name;
                    dr["Country/Location"] = managerDetails.User.Area.Name;
                    dr["Role Excellence Profile"] = managerDetails.POE.Name;
                    dr["Question Id"] = feedbackResultse.QuestionId;
                    dr["Questions"] = feedbackResultse.Question;
                    dr["Module Id"] = feedbackResultse.ModuleOrder;
                    dr["Module Name"] = feedbackResultse.ModuleName;
                    dr["Manager Result"] = feedbackResultse.ManagerResult;
                    dr["Self Result"] = feedbackResultse.SelfResult;
                    dr["Manager Rating"] = feedbackResultse.Rating;
                    dr["Manager Capability"] = feedbackResultse.ManagerCapability;
                    dr["Self Capability"] = feedbackResultse.SelfCapability;
                    table.Rows.Add(dr);
                }
                usecount++;
            }

            return table;

        }
        internal DataTable MSATableStructure()
        {
            DataTable table = new DataTable();

            table.Columns.Add("Maanger Full Name");
            table.Columns.Add("Manager Alias");
            table.Columns.Add("Team member Full Name");
            table.Columns.Add("Team member Alias");
            table.Columns.Add("Relation");
            table.Columns.Add("Area");
            table.Columns.Add("Country/Location");
            table.Columns.Add("Role Excellence Profile");
            table.Columns.Add("Question Id");
            table.Columns.Add("Report Questions");
            table.Columns.Add("Short Questions");
            table.Columns.Add("Long Questions");
            table.Columns.Add("Module Id");
            table.Columns.Add("Module Name");
            table.Columns.Add("Manager Frequency");
            table.Columns.Add("Manager Capability");
            table.Columns.Add("Manager Importance");
            table.Columns.Add("Self Frequency");
            table.Columns.Add("Self Capability");
            table.Columns.Add("Self Importance");
            table.Columns.Add("MF Overall");
            table.Columns.Add("MC Overall");
            table.Columns.Add("MI Overall");
            table.Columns.Add("SF Overall");
            table.Columns.Add("SC Overall");
            table.Columns.Add("SI Overall");
            table.Columns.Add("Development Priorities");
            return table;
        }
        internal DataTable MSAPRiorityTableStructure()
        {
            DataTable table = new DataTable();

            table.Columns.Add("Maanger Full Name");

            table.Columns.Add("Manager Alias");
            table.Columns.Add("Team member Full Name");
            table.Columns.Add("Team member Alias");
            table.Columns.Add("Area");
            table.Columns.Add("Country/Location");
            table.Columns.Add("Role Excellence Profile");
            table.Columns.Add("Question Id");
            table.Columns.Add("Questions");
            table.Columns.Add("Module Id");
            table.Columns.Add("Module Name");
            table.Columns.Add("Manager Result");
            table.Columns.Add("Self Result");
            table.Columns.Add("Manager Rating");
            table.Columns.Add("Manager Capability");
            table.Columns.Add("Self Capability");
            return table;
        }
        public void GetManagerReport(int poeid)
        {
            DataTable dataTable = ManagerReportDump(poeid);
            string poeName = GetPoeName(poeid);
            var poeArea = "";
            switch (poeid)
            {
                case 18:
                    poeArea = "(Standard)";
                    break;
                case 19:
                    poeArea = "(EMEA)";
                    break;
                case 20:
                    poeArea = "(MidMarket)";
                    break;
                case 21:
                    poeArea = "(Strategic)";
                    break;
                case 22:
                    poeArea = "(Standard)";
                    break;
                case 23:
                    poeArea = "(US&CA)";
                    break;
                case 24:
                    poeArea = "(Standard)";
                    break;
                case 25:
                    poeArea = "(MidMarket)";
                    break;
            }
            string filename = poeName + poeArea + "-Manager DataDump Report.xlsx";

            //    string templatePath = HttpContext.Current.Server.MapPath("~/") + "\\Reports\\ExcelTemplates\\DataDump.xlsx";
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "ExcelTemplates\\ManagerDataDumpLatest.xlsx";

            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Manager Report");

            //passed down to the client

            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));

            ms2.Position = 0;

            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }
        public void GetManagerReportWCSISCORE(int poeid)
        {
            DataTable dataTable = ManagerReportDumpWCSISCORE(poeid);
            string poeName = GetPoeName(poeid);
            var poeArea = "";
            switch (poeid)
            {
                case 18:
                    poeArea = "(Standard)";
                    break;
                case 19:
                    poeArea = "(EMEA)";
                    break;
                case 20:
                    poeArea = "(MidMarket)";
                    break;
                case 21:
                    poeArea = "(Strategic)";
                    break;
                case 22:
                    poeArea = "(Standard)";
                    break;
                case 23:
                    poeArea = "(US&CA)";
                    break;
                case 24:
                    poeArea = "(Standard)";
                    break;
                case 25:
                    poeArea = "(MidMarket)";
                    break;
            }
            string filename = poeName + poeArea + "-Manager DataDump Report.xlsx";

            //    string templatePath = HttpContext.Current.Server.MapPath("~/") + "\\Reports\\ExcelTemplates\\DataDump.xlsx";
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "ExcelTemplates\\ManagerDataDumpLatest.xlsx";

            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Manager Report");

            //passed down to the client

            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));

            ms2.Position = 0;

            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }
        public void GetManagerCapability(int poeid)
        {
            DataTable dataTable = ManagerCapabilityDump(poeid);
            string poeName = GetPoeName(poeid);
            var poeArea = "";
            switch (poeid)
            {
                case 18:
                    poeArea = "(Standard)";
                    break;
                case 19:
                    poeArea = "(EMEA)";
                    break;
                case 20:
                    poeArea = "(MidMarket)";
                    break;
                case 21:
                    poeArea = "(Strategic)";
                    break;
                case 22:
                    poeArea = "(Standard)";
                    break;
                case 23:
                    poeArea = "(US&CA)";
                    break;
                case 24:
                    poeArea = "(Standard)";
                    break;
                case 25:
                    poeArea = "(MidMarket)";
                    break;
            }
            string filename = poeName + poeArea + "-Manager DataDump Report.xlsx";

            //    string templatePath = HttpContext.Current.Server.MapPath("~/") + "\\Reports\\ExcelTemplates\\DataDump.xlsx";
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "ExcelTemplates\\ManagerDataDumpLatest.xlsx";

            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Manager Report");

            //passed down to the client

            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));

            ms2.Position = 0;

            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }
        public void GetImportanceReport(int poeid)
        {
            DataTable dataTable = ImportanceReportDump(poeid);
            string poeName = GetPoeName(poeid);
            var poeArea = "";
            switch (poeid)
            {
                case 18:
                    poeArea = "(Standard)";
                    break;
                case 19:
                    poeArea = "(EMEA)";
                    break;
                case 20:
                    poeArea = "(MidMarket)";
                    break;
                case 21:
                    poeArea = "(Strategic)";
                    break;
                case 22:
                    poeArea = "(Standard)";
                    break;
                case 23:
                    poeArea = "(US&CA)";
                    break;
                case 24:
                    poeArea = "(Standard)";
                    break;
                case 25:
                    poeArea = "(MidMarket)";
                    break;
            }
            string filename = poeName + poeArea + "-Importance DataDump Report.xlsx";

            //    string templatePath = HttpContext.Current.Server.MapPath("~/") + "\\Reports\\ExcelTemplates\\DataDump.xlsx";
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "ExcelTemplates\\ManagerDataDumpLatest.xlsx";

            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Importance Report");

            //passed down to the client

            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));

            ms2.Position = 0;

            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }
        public void GetImportanceReportSelf(int poeid)
        {
            DataTable dataTable = ImportanceReportDumpTeam(poeid);
            string poeName = GetPoeName(poeid);
            var poeArea = "";
            switch (poeid)
            {
                case 18:
                    poeArea = "(Standard)";
                    break;
                case 19:
                    poeArea = "(EMEA)";
                    break;
                case 20:
                    poeArea = "(MidMarket)";
                    break;
                case 21:
                    poeArea = "(Strategic)";
                    break;
                case 22:
                    poeArea = "(Standard)";
                    break;
                case 23:
                    poeArea = "(US&CA)";
                    break;
                case 24:
                    poeArea = "(Standard)";
                    break;
                case 25:
                    poeArea = "(MidMarket)";
                    break;
            }
            string filename = poeName + poeArea + "-Self Importance DataDump Report.xlsx";

            //    string templatePath = HttpContext.Current.Server.MapPath("~/") + "\\Reports\\ExcelTemplates\\DataDump.xlsx";
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "ExcelTemplates\\TeamDataDumps.xlsx";

            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Importance Report");

            //passed down to the client

            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));

            ms2.Position = 0;

            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }

        public void GetDemographicSurveyReport(int poeid)
        {
            DataTable dataTable = DemographicsurveyDump(poeid);
            string poeName = GetPoeName(poeid);
            var poeArea = "";
            switch (poeid)
            {
                case 18:
                    poeArea = "(Standard)";
                    break;
                case 19:
                    poeArea = "(EMEA)";
                    break;
                case 20:
                    poeArea = "(MidMarket)";
                    break;
                case 21:
                    poeArea = "(Strategic)";
                    break;
                case 22:
                    poeArea = "(Standard)";
                    break;
                case 23:
                    poeArea = "(US&CA)";
                    break;
                case 24:
                    poeArea = "(Standard)";
                    break;
                case 25:
                    poeArea = "(MidMarket)";
                    break;
            }
            string filename = poeName + poeArea + "-Demographic Survey DataDump Report.xlsx";

            //    string templatePath = HttpContext.Current.Server.MapPath("~/") + "\\Reports\\ExcelTemplates\\DataDump.xlsx";
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "ExcelTemplates\\SurveyDump.xlsx";

            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Importance Report");

            //passed down to the client

            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));

            ms2.Position = 0;

            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }
        public void GetProductSurveyReport(int poeid)
        {
            DataTable dataTable = ProductsurveyDump(poeid);
            string poeName = GetPoeName(poeid);
            var poeArea = "";
            switch (poeid)
            {
                case 18:
                    poeArea = "(Standard)";
                    break;
                case 19:
                    poeArea = "(EMEA)";
                    break;
                case 20:
                    poeArea = "(MidMarket)";
                    break;
                case 21:
                    poeArea = "(Strategic)";
                    break;
                case 22:
                    poeArea = "(Standard)";
                    break;
                case 23:
                    poeArea = "(US&CA)";
                    break;
                case 24:
                    poeArea = "(Standard)";
                    break;
                case 25:
                    poeArea = "(MidMarket)";
                    break;
            }
            string filename = poeName + poeArea + "-Product Survey DataDump Report.xlsx";

            //    string templatePath = HttpContext.Current.Server.MapPath("~/") + "\\Reports\\ExcelTemplates\\DataDump.xlsx";
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "ExcelTemplates\\ProductSurveyDump.xlsx";

            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Importance Report");

            //passed down to the client

            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));

            ms2.Position = 0;

            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }
        public string GetPoeName(int poeid)
        {
            var common = new CommonClient();
            var returnValue = common.GetPoeName(poeid);

            return returnValue.Replace(" ", "");
        }

        internal DataTable ManagerReportDump(int poeid)
        {
            var feedback = new FeedbackServiceClient();
            DataTable table = ManagerTableStructure();
            var userwithid = feedback.GetManagerReportDumb(2, poeid);

            foreach (ManagerFeedback userFeedback in userwithid)
            {
                int feedBackid = (userFeedback.FeedbackId == null) ? 0 : userFeedback.FeedbackId.Value;
                DataRow dr = table.NewRow();

                var common = new CommonClient();
                var managerDetails = common.GetUserdetailsByMappingId(userFeedback.MangagerPoeId);
                var teamMemberDetails = common.GetUserdetailsByMappingId(userFeedback.TeammenberPoeId.Value);
                dr["Maanger Full Name"] = managerDetails.User.FirstName + " " + managerDetails.User.LastName;

                dr["Manager Alias"] = managerDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                dr["Team member Full Name"] = teamMemberDetails.User.FirstName + " " + teamMemberDetails.User.LastName;
                dr["Team member Alias"] = teamMemberDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                dr["Relation"] = managerDetails.Designation.Name;

                dr["Area"] = managerDetails.User.Country.Name;
                dr["Country/Location"] = managerDetails.User.Area.Name;

                int colid = 7;
                var poeResults = feedback.GetModuleScores(feedBackid.ToString(), poeid);

                foreach (DataDumbModuleScore feedbackResultse in poeResults.ModuleScores)
                {
                    foreach (DataDumbQuestionScore Questions in feedbackResultse.QuestionScores)
                    {
                        dr[colid] = (Questions.Score == null) ? "0" : Questions.Score.ToString();
                        colid++;
                    }
                }

                table.Rows.Add(dr);
            }
            return table;
            return null;
        }
        internal DataTable ManagerCapabilityDump(int poeid)
        {
            var feedback = new FeedbackServiceClient();
            DataTable table = ManagerTableStructure();
            var userwithid = feedback.GetManagerReportDumb(2, poeid);
            foreach (ManagerFeedback userFeedback in userwithid)
            {
                int feedBackid = (userFeedback.FeedbackId == null) ? 0 : userFeedback.FeedbackId.Value;
                DataRow dr = table.NewRow();

                var common = new CommonClient();
                var managerDetails = common.GetUserdetailsByMappingId(userFeedback.MangagerPoeId);
                var teamMemberDetails = common.GetUserdetailsByMappingId(userFeedback.TeammenberPoeId.Value);
                dr["Maanger Full Name"] = managerDetails.User.FirstName + " " + managerDetails.User.LastName;

                dr["Manager Alias"] = managerDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                dr["Team member Full Name"] = teamMemberDetails.User.FirstName + " " + teamMemberDetails.User.LastName;
                dr["Team member Alias"] = teamMemberDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                dr["Relation"] = managerDetails.Designation.Name;

                dr["Area"] = managerDetails.User.Country.Name;
                dr["Country/Location"] = managerDetails.User.Area.Name;

                int colid = 7;
                var poeResults = feedback.GetCapabilityModuleScores(feedBackid.ToString(), poeid);

                foreach (DataDumbModuleScore feedbackResultse in poeResults.ModuleScores)
                {
                    foreach (DataDumbQuestionScore Questions in feedbackResultse.QuestionScores)
                    {
                        dr[colid] = (Questions.Score == null) ? "0" : Questions.Score.ToString();
                        colid++;
                    }
                }

                table.Rows.Add(dr);
            }
            return table;
            return null;
        }
        internal DataTable ManagerReportDumpWCSISCORE(int poeid)
        {
            var feedback = new FeedbackServiceClient();
            DataTable table = ManagerTableStructure();
            var userwithid = feedback.GetManagerReportDumb(2, poeid);
            foreach (ManagerFeedback userFeedback in userwithid)
            {
                int feedBackid = (userFeedback.FeedbackId == null) ? 0 : userFeedback.FeedbackId.Value;
                DataRow dr = table.NewRow();

                var common = new CommonClient();
                var managerDetails = common.GetUserdetailsByMappingId(userFeedback.MangagerPoeId);
                var teamMemberDetails = common.GetUserdetailsByMappingId(userFeedback.TeammenberPoeId.Value);
                dr["Maanger Full Name"] = managerDetails.User.FirstName + " " + managerDetails.User.LastName;

                dr["Manager Alias"] = managerDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                dr["Team member Full Name"] = teamMemberDetails.User.FirstName + " " + teamMemberDetails.User.LastName;
                dr["Team member Alias"] = teamMemberDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                dr["Relation"] = managerDetails.Designation.Name;

                dr["Area"] = managerDetails.User.Country.Name;
                dr["Country/Location"] = managerDetails.User.Area.Name;

                int colid = 7;

                var wcsiScore = common.GetAvgWcsiScore(feedBackid.ToString());
                dr[colid] = wcsiScore.FirstOrDefault().wcsi;
                table.Rows.Add(dr);
            }
            return table;
            return null;
        }
        internal DataTable ManagerTableStructure()
        {
            DataTable table = new DataTable();

            table.Columns.Add("Maanger Full Name");

            table.Columns.Add("Manager Alias");
            table.Columns.Add("Team member Full Name");
            table.Columns.Add("Team member Alias");
            table.Columns.Add("Relation");
            table.Columns.Add("Area");
            table.Columns.Add("Country/Location");

            for (int i = 1; i <= 50; i++)
            {
                table.Columns.Add("Q" + i);
            }

            return table;
        }

        public void GetTeammemberDataDumb(int poeidval)
        {
            DataTable dataTable = TeamMemberReportDump(poeidval);
            var poeArea = "";
            switch (poeidval)
            {
                case 18:
                    poeArea = "(Standard)";
                    break;
                case 19:
                    poeArea = "(EMEA)";
                    break;
                case 20:
                    poeArea = "(MidMarket)";
                    break;
                case 21:
                    poeArea = "(Strategic)";
                    break;
                case 22:
                    poeArea = "(Standard)";
                    break;
                case 23:
                    poeArea = "(US&CA)";
                    break;
                case 24:
                    poeArea = "(Standard)";
                    break;
                case 25:
                    poeArea = "(MidMarket)";
                    break;
            }
            string poeName = GetPoeName(poeidval);

            string filename = poeName + poeArea + "-Team member DataDump Report.xlsx";

            //    string templatePath = HttpContext.Current.Server.MapPath("~/") + "\\Reports\\ExcelTemplates\\DataDump.xlsx";
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "ExcelTemplates\\TeamDataDumps.xlsx";
            //string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "\\Reports\\ExcelTemplates\\DataDump.xlsx";

            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Manager Report");

            //passed down to the client

            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));

            ms2.Position = 0;

            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }
        public void GetTeammemberCapabailityDump(int poeidval)
        {
            DataTable dataTable = TeamMemberCapabilityDump(poeidval);
            var poeArea = "";
            switch (poeidval)
            {
                case 18:
                    poeArea = "(Standard)";
                    break;
                case 19:
                    poeArea = "(EMEA)";
                    break;
                case 20:
                    poeArea = "(MidMarket)";
                    break;
                case 21:
                    poeArea = "(Strategic)";
                    break;
                case 22:
                    poeArea = "(Standard)";
                    break;
                case 23:
                    poeArea = "(US&CA)";
                    break;
                case 24:
                    poeArea = "(Standard)";
                    break;
                case 25:
                    poeArea = "(MidMarket)";
                    break;
            }
            string poeName = GetPoeName(poeidval);

            string filename = poeName + poeArea + "-Team member DataDump Report.xlsx";

            //    string templatePath = HttpContext.Current.Server.MapPath("~/") + "\\Reports\\ExcelTemplates\\DataDump.xlsx";
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "ExcelTemplates\\TeamDataDumps.xlsx";
            //string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "\\Reports\\ExcelTemplates\\DataDump.xlsx";

            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Manager Report");

            //passed down to the client

            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));

            ms2.Position = 0;

            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }
        public void GetTeammemberDataDumbWCSI(int poeidval)
        {
            DataTable dataTable = TeamMemberReportDumpWCSI(poeidval);
            var poeArea = "";
            switch (poeidval)
            {
                case 18:
                    poeArea = "(Standard)";
                    break;
                case 19:
                    poeArea = "(EMEA)";
                    break;
                case 20:
                    poeArea = "(MidMarket)";
                    break;
                case 21:
                    poeArea = "(Strategic)";
                    break;
                case 22:
                    poeArea = "(Standard)";
                    break;
                case 23:
                    poeArea = "(US&CA)";
                    break;
                case 24:
                    poeArea = "(Standard)";
                    break;
                case 25:
                    poeArea = "(MidMarket)";
                    break;
            }
            string poeName = GetPoeName(poeidval);

            string filename = poeName + poeArea + "-Team member DataDump Report.xlsx";

            //    string templatePath = HttpContext.Current.Server.MapPath("~/") + "\\Reports\\ExcelTemplates\\DataDump.xlsx";
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "ExcelTemplates\\TeamDataDumps.xlsx";
            //string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "\\Reports\\ExcelTemplates\\DataDump.xlsx";

            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Manager Report");

            //passed down to the client

            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));

            ms2.Position = 0;

            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }
        internal DataTable ImportanceReportDumpTeam(int poeid)
        {
            var feedback = new FeedbackServiceClient();
            DataTable table = TeammeberTableStructure();
            var userwithid = feedback.GetTeamReportDumb(1, poeid);
            foreach (UserFeedback userFeedback in userwithid)
            {
                int feedBackid = (userFeedback.FeedbackId == null) ? 0 : userFeedback.FeedbackId.Value;
                DataRow dr = table.NewRow();
                var common = new CommonClient();
                var userDetails = common.GetUserdetailsByMappingId(userFeedback.UserId);

                dr["Full Name"] = userDetails.User.FirstName + " " + userDetails.User.LastName;
                dr["Alias"] = userDetails.User.EmailAddress.Replace("@microsoft.com", "");
                dr["Relation"] = userDetails.Designation.Name;
                dr["Area"] = userDetails.User.Country.Name;
                dr["Country/Location"] = userDetails.User.Area.Name;

                int colid = 5;
                //var poeResults = feedback.GetModuleScores(feedBackid.ToString(), poeid);
                var poeResults = common.GetImportanceAnswer(userDetails.User.UserId, poeid);
                foreach (QuestionScore feedbackResultse in poeResults)
                {
                    dr[colid] = (feedbackResultse.Answers == null) ? "0" : feedbackResultse.Answers;
                    colid++;
                }

                table.Rows.Add(dr);
            }
            return table;
            return null;
        }
        internal DataTable TeamMemberReportDump(int poeid)
        {
            var feedback = new FeedbackServiceClient();
            DataTable table = TeammeberTableStructure();
            var userwithid = feedback.GetTeamReportDumb(1, poeid);
            foreach (UserFeedback userFeedback in userwithid)
            {
                int feedBackid = (userFeedback.FeedbackId == null) ? 0 : userFeedback.FeedbackId.Value;
                DataRow dr = table.NewRow();
                var common = new CommonClient();
                var userDetails = common.GetUserdetailsByMappingId(userFeedback.UserId);

                //var userDetails = userAdmin.GetUserDetailsById(userFeedback.UserId);
                // var userCountrydetails = userAdmin.GetUserDetailsByMappingId(
                // userAdminDataAccess.GetMappingIdByEmailForReport(userDetails.EmailAddress, int.Parse(Session["poeId"].ToString()))).User;

                dr["Full Name"] = userDetails.User.FirstName + " " + userDetails.User.LastName;
                dr["Alias"] = userDetails.User.EmailAddress.Replace("@microsoft.com", "");
                dr["Relation"] = userDetails.Designation.Name;
                dr["Area"] = userDetails.User.Country.Name;
                dr["Country/Location"] = userDetails.User.Area.Name;

                //  dr["FeedbackID"] = feedBackid;

                int colid = 5;

                // var poeResults = _wcsi.GetModulesScoresByPOE(int.Parse(Session["poeId"].ToString()), feedBackid);
                var poeResults = feedback.GetModuleScores(feedBackid.ToString(), poeid);
                //  var poeResults = feedbackController.GetFeedbackResults(feedBackid);
                // var poeResults = feedbackController.GetFeedbackResults(1633);
                foreach (DataDumbModuleScore feedbackResultse in poeResults.ModuleScores)
                {
                    foreach (DataDumbQuestionScore Questions in feedbackResultse.QuestionScores)
                    {
                        dr[colid] = (Questions.Score == null) ? "0" : Questions.Score.ToString();
                        colid++;
                    }
                }
                //for (var t = 0; t < 50; t++)
                //{
                //    dr[colid] = "1";
                //    colid++;
                //}
                table.Rows.Add(dr);

                //   foreach (FeedbackResults feedbackResult in poeResults)
            }
            return table;
        }
        internal DataTable TeamMemberCapabilityDump(int poeid)
        {
            var feedback = new FeedbackServiceClient();
            DataTable table = TeammeberTableStructure();
            var userwithid = feedback.GetTeamReportDumb(1, poeid);
            foreach (UserFeedback userFeedback in userwithid)
            {
                int feedBackid = (userFeedback.FeedbackId == null) ? 0 : userFeedback.FeedbackId.Value;
                DataRow dr = table.NewRow();
                var common = new CommonClient();
                var userDetails = common.GetUserdetailsByMappingId(userFeedback.UserId);

                //var userDetails = userAdmin.GetUserDetailsById(userFeedback.UserId);
                // var userCountrydetails = userAdmin.GetUserDetailsByMappingId(
                // userAdminDataAccess.GetMappingIdByEmailForReport(userDetails.EmailAddress, int.Parse(Session["poeId"].ToString()))).User;

                dr["Full Name"] = userDetails.User.FirstName + " " + userDetails.User.LastName;
                dr["Alias"] = userDetails.User.EmailAddress.Replace("@microsoft.com", "");
                dr["Relation"] = userDetails.Designation.Name;
                dr["Area"] = userDetails.User.Country.Name;
                dr["Country/Location"] = userDetails.User.Area.Name;

                //  dr["FeedbackID"] = feedBackid;

                int colid = 5;

                // var poeResults = _wcsi.GetModulesScoresByPOE(int.Parse(Session["poeId"].ToString()), feedBackid);
                var poeResults = feedback.GetCapabilityModuleScores(feedBackid.ToString(), poeid);
                //  var poeResults = feedbackController.GetFeedbackResults(feedBackid);
                // var poeResults = feedbackController.GetFeedbackResults(1633);
                foreach (DataDumbModuleScore feedbackResultse in poeResults.ModuleScores)
                {
                    foreach (DataDumbQuestionScore Questions in feedbackResultse.QuestionScores)
                    {
                        dr[colid] = (Questions.Score == null) ? "0" : Questions.Score.ToString();
                        colid++;
                    }
                }
                //for (var t = 0; t < 50; t++)
                //{
                //    dr[colid] = "1";
                //    colid++;
                //}
                table.Rows.Add(dr);

                //   foreach (FeedbackResults feedbackResult in poeResults)
            }
            return table;
        }
        internal DataTable TeamMemberReportDumpWCSI(int poeid)
        {
            var feedback = new FeedbackServiceClient();
            DataTable table = TeammeberTableStructure();
            var userwithid = feedback.GetTeamReportDumb(1, poeid);
            foreach (UserFeedback userFeedback in userwithid)
            {
                int feedBackid = (userFeedback.FeedbackId == null) ? 0 : userFeedback.FeedbackId.Value;
                DataRow dr = table.NewRow();
                var common = new CommonClient();
                var userDetails = common.GetUserdetailsByMappingId(userFeedback.UserId);

                //var userDetails = userAdmin.GetUserDetailsById(userFeedback.UserId);
                // var userCountrydetails = userAdmin.GetUserDetailsByMappingId(
                // userAdminDataAccess.GetMappingIdByEmailForReport(userDetails.EmailAddress, int.Parse(Session["poeId"].ToString()))).User;

                dr["Full Name"] = userDetails.User.FirstName + " " + userDetails.User.LastName;
                dr["Alias"] = userDetails.User.EmailAddress.Replace("@microsoft.com", "");
                dr["Relation"] = userDetails.Designation.Name;
                dr["Area"] = userDetails.User.Country.Name;
                dr["Country/Location"] = userDetails.User.Area.Name;

                //  dr["FeedbackID"] = feedBackid;

                int colid = 5;

                // var poeResults = _wcsi.GetModulesScoresByPOE(int.Parse(Session["poeId"].ToString()), feedBackid);
                //var poeResults = feedback.GetModuleScores(feedBackid.ToString(), poeid);
                //  var poeResults = feedbackController.GetFeedbackResults(feedBackid);
                // var poeResults = feedbackController.GetFeedbackResults(1633);
                var wcsiScore = common.GetAvgWcsiScore(feedBackid.ToString());
                dr[colid] = wcsiScore.FirstOrDefault().wcsi;
                //for (var t = 0; t < 50; t++)
                //{
                //    dr[colid] = "1";
                //    colid++;
                //}
                table.Rows.Add(dr);

                //   foreach (FeedbackResults feedbackResult in poeResults)
            }
            return table;
        }
        internal DataTable ImportanceReportDump(int poeid)
        {
            var feedback = new FeedbackServiceClient();
            DataTable table = ManagerTableStructure();
            var userwithid = feedback.GetManagerReportDumb(2, poeid);
            foreach (ManagerFeedback userFeedback in userwithid)
            {
                int feedBackid = (userFeedback.FeedbackId == null) ? 0 : userFeedback.FeedbackId.Value;
                DataRow dr = table.NewRow();

                var common = new CommonClient();
                var managerDetails = common.GetUserdetailsByMappingId(userFeedback.MangagerPoeId);
                var teamMemberDetails = common.GetUserdetailsByMappingId(userFeedback.TeammenberPoeId.Value);
                dr["Maanger Full Name"] = managerDetails.User.FirstName + " " + managerDetails.User.LastName;

                dr["Manager Alias"] = managerDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                dr["Team member Full Name"] = teamMemberDetails.User.FirstName + " " + teamMemberDetails.User.LastName;
                dr["Team member Alias"] = teamMemberDetails.User.EmailAddress.Replace("@microsoft.com", ""); ;
                dr["Relation"] = managerDetails.Designation.Name;

                dr["Area"] = managerDetails.User.Country.Name;
                dr["Country/Location"] = managerDetails.User.Area.Name;

                int colid = 7;
                //var poeResults = feedback.GetModuleScores(feedBackid.ToString(), poeid);
                var poeResults = common.GetImportanceAnswer(managerDetails.User.UserId, poeid);
                foreach (QuestionScore feedbackResultse in poeResults)
                {
                    dr[colid] = (feedbackResultse.Answers == null) ? "0" : feedbackResultse.Answers;
                    colid++;
                }

                table.Rows.Add(dr);
            }
            return table;
            return null;
        }
        //internal DataTable ImportanceReportDump(int poeid)
        //{
        //    var common = new CommonClient();
        //    DataTable table = ImportanceTableStructure();
        //    var userwithid = common.GetUsersListByPoE(poeid);
        //    foreach (User userFeedback in userwithid)
        //    {
        //        DataRow dr = table.NewRow();
        //        dr["Full Name"] = userFeedback.FirstName + " " + userFeedback.LastName;
        //        dr["Alias"] = userFeedback.EmailAddress.Replace("@microsoft.com", "");
        //       // dr["Relation"] = userDetails.Designation.Name;
        //        dr["Area"] = userFeedback.Country.Name;
        //        dr["Country/Location"] = userFeedback.Area.Name;
        //        dr["Role"] = userFeedback.JobTitle;
        //        //  dr["FeedbackID"] = feedBackid;

        //        int colid = 5;

        //        // var poeResults = _wcsi.GetModulesScoresByPOE(int.Parse(Session["poeId"].ToString()), feedBackid);
        //        var poeResults = common.GetImportanceAnswer(userFeedback.UserId, poeid);
        //        //  var poeResults = feedbackController.GetFeedbackResults(feedBackid);
        //        // var poeResults = feedbackController.GetFeedbackResults(1633);
        //        foreach (QuestionScore feedbackResultse in poeResults)
        //        {

        //            dr[colid] = (feedbackResultse.Answers == null) ? "0" : feedbackResultse.Answers;
        //                colid++;

        //        }
        //        //for (var t = 0; t < 50; t++)
        //        //{
        //        //    dr[colid] = "1";
        //        //    colid++;
        //        //}
        //        table.Rows.Add(dr);

        //        //   foreach (FeedbackResults feedbackResult in poeResults)
        //    }
        //    return table;
        //}
        internal DataTable DemographicsurveyDump(int poeid)
        {
            var common = new CommonClient();
            DataTable table = SurveyTableStructure();
            var userwithid = common.GetSurveyUsersListByPoE(poeid);
            foreach (User userFeedback in userwithid)
            {
                DataRow dr = table.NewRow();
                dr["Full Name"] = userFeedback.FirstName + " " + userFeedback.LastName;
                dr["Alias"] = userFeedback.EmailAddress.Replace("@microsoft.com", "");
                // dr["Relation"] = userDetails.Designation.Name;
                dr["Area"] = userFeedback.Country.Name;
                dr["Country/Location"] = userFeedback.Area.Name;

                //  dr["FeedbackID"] = feedBackid;

                int colid = 4;

                // var poeResults = _wcsi.GetModulesScoresByPOE(int.Parse(Session["poeId"].ToString()), feedBackid);
                var poeResults = common.GetDemographicAnswer(userFeedback.UserId, poeid);
                //  var poeResults = feedbackController.GetFeedbackResults(feedBackid);
                // var poeResults = feedbackController.GetFeedbackResults(1633);
                foreach (QuestionScore feedbackResultse in poeResults)
                {

                    dr[colid] = (feedbackResultse.Answers == null) ? "0" : feedbackResultse.Answers;
                    colid++;

                }
                //for (var t = 0; t < 50; t++)
                //{
                //    dr[colid] = "1";
                //    colid++;
                //}
                table.Rows.Add(dr);

                //   foreach (FeedbackResults feedbackResult in poeResults)
            }
            return table;
        }
        internal DataTable ProductsurveyDump(int poeid)
        {
            var common = new CommonClient();
            DataTable table = ProductSurveyTableStructure();
            var userwithid = common.GetSurveyUsersListByPoE(poeid);
            foreach (User userFeedback in userwithid)
            {
                DataRow dr = table.NewRow();
                dr["Full Name"] = userFeedback.FirstName + " " + userFeedback.LastName;
                dr["Alias"] = userFeedback.EmailAddress.Replace("@microsoft.com", "");
                // dr["Relation"] = userDetails.Designation.Name;
                dr["Area"] = userFeedback.Country.Name;
                dr["Country/Location"] = userFeedback.Area.Name;

                //  dr["FeedbackID"] = feedBackid;

                int colid = 4;

                // var poeResults = _wcsi.GetModulesScoresByPOE(int.Parse(Session["poeId"].ToString()), feedBackid);
                var poeResults = common.GetProductSurveyAnswer(userFeedback.UserId, poeid);
                //  var poeResults = feedbackController.GetFeedbackResults(feedBackid);
                // var poeResults = feedbackController.GetFeedbackResults(1633);
                foreach (QuestionScore feedbackResultse in poeResults)
                {

                    dr[colid] = (feedbackResultse.Answers == null) ? "0" : feedbackResultse.Answers;
                    colid++;

                }
                //for (var t = 0; t < 50; t++)
                //{
                //    dr[colid] = "1";
                //    colid++;
                //}
                table.Rows.Add(dr);

                //   foreach (FeedbackResults feedbackResult in poeResults)
            }
            return table;
        }
        internal DataTable TeammeberTableStructure()
        {
            DataTable table = new DataTable();

            table.Columns.Add("Full Name");

            // table.Columns.Add("Last Name");
            table.Columns.Add("Alias");
            table.Columns.Add("Relation");
            //  table.Columns.Add("FeedbackID");
            table.Columns.Add("Area");
            table.Columns.Add("Country/Location");
            for (int i = 1; i <= 50; i++)
            {
                table.Columns.Add("Q" + i);
            }
            return table;
        }
        internal DataTable ImportanceTableStructure()
        {
            DataTable table = new DataTable();

            table.Columns.Add("Full Name");

            // table.Columns.Add("Last Name");
            table.Columns.Add("Alias");
            //table.Columns.Add("Relation");
            //  table.Columns.Add("FeedbackID");
            table.Columns.Add("Area");
            table.Columns.Add("Country/Location");
            table.Columns.Add("Role");
            for (int i = 1; i <= 50; i++)
            {
                table.Columns.Add("Q" + i);
            }
            return table;
        }
        internal DataTable SurveyTableStructure()
        {
            DataTable table = new DataTable();

            table.Columns.Add("Full Name");

            // table.Columns.Add("Last Name");
            table.Columns.Add("Alias");
            //table.Columns.Add("Relation");
            //  table.Columns.Add("FeedbackID");
            table.Columns.Add("Area");
            table.Columns.Add("Country/Location");
            for (int i = 1; i <= 52; i++)
            {
                table.Columns.Add("Q" + i);
            }
            return table;
        }
        internal DataTable PSETableStructure()
        {
            DataTable table = new DataTable();

            table.Columns.Add("MPLID");

            table.Columns.Add("PartnerName");
            table.Columns.Add("TimeZone");
            table.Columns.Add("Area");
            table.Columns.Add("Country");

            table.Columns.Add("DET");

            table.Columns.Add("PSE");
            //dr["PSE Alias"] 
            table.Columns.Add("PSE Alias");
            table.Columns.Add("Manager");
            table.Columns.Add("Mgr Alias");
            table.Columns.Add("AreaLead");
            table.Columns.Add("AL Alias");
            table.Columns.Add("TZ Lead");

            table.Columns.Add("TZ Alias");
            table.Columns.Add("Completions");

            table.Columns.Add("Role");



            table.Columns.Add("Momentum");
            table.Columns.Add("Marketting");
            table.Columns.Add("Sales");
            table.Columns.Add("Focus");
            table.Columns.Add("Services");
            table.Columns.Add("IP");

            table.Columns.Add("CustomerAcquistion");
            table.Columns.Add("IndustryFocus");

            table.Columns.Add("IndustryFocus1");
            table.Columns.Add("IndustryFocus2");
            for (int i = 1; i <= 50; i++)
            {
                table.Columns.Add("Q" + i);
            }
            table.Columns.Add("CompletedOn");
            return table;
        }
        internal DataTable ProductSurveyTableStructure()
        {
            DataTable table = new DataTable();

            table.Columns.Add("Full Name");

            // table.Columns.Add("Last Name");
            table.Columns.Add("Alias");
            //table.Columns.Add("Relation");
            //  table.Columns.Add("FeedbackID");
            table.Columns.Add("Area");
            table.Columns.Add("Country/Location");
            for (int i = 1; i <= 50; i++)
            {
                if (i == 8)
                {
                    table.Columns.Add("Q8.1");
                    table.Columns.Add("Q8.2");
                }
                else
                {
                    table.Columns.Add("Q" + i);
                }

            }
            return table;
        }
    }
}