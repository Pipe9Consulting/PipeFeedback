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
            for (int i = 1; i <= 50; i++)
            {
                table.Columns.Add("Q" + i);
            }
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