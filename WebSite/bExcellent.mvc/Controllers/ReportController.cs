using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web.Mvc;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.AuthenticationWCF;
using bExcellent.mvc.CommonWCF;
using bExcellent.mvc.FeedbackWCF;
using bExcellent.mvc.SignUpWCF;
using ExcelGenerator;
using User = bExcellent.mvc.CommonWCF.User;

namespace bExcellent.mvc.Controllers
{
    public class ReportController : Controller
    {
        //
        // GET: /Report/

        //public ActionResult Index()
        //{
        //    return View();
        //}

        public ActionResult Login()
        {
            //ViewBag.errormsg = "";
            return View();
        }

        public ActionResult SignOut()
        {
            Session.Clear();
            return View("Login");
        }

        //[SessionExpireReport]
        public ActionResult RetrievePassword()
        {
            //if (Session["Uname"] != null)
            //{
                return View();
            //}
            //else
            //{
            //    return View("Login");
            //}
        }

        public ActionResult ReportLogin()
        {
            string reportAdminString = ConfigurationManager.AppSettings["reportAdmins"];
            string passwordRetrieve = ConfigurationManager.AppSettings["PasswordRetrieve"];
            var authentication = new AuthenticationClient();
            var email = Request.Form["usrmailids"];
            var password = Request.Form["usrpassword"];
            string username = email;
            string getpassword = password;
            ViewBag.errormsg = "";
            if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(getpassword))
            {
                var returnValue = authentication.AuthenticateUser(username, getpassword);
                if (returnValue.IsAuthenticated)
                {
                    var reportAdmins = reportAdminString.Split(',');
                    int count = reportAdmins.Count(a => a.ToLower().Equals(username.ToLower()));
                    if (count != 0)
                    {
                        var rePass = passwordRetrieve.Split(',');
                        int retrievePasscount = rePass.Count(a => a.ToLower().Equals(username.ToLower()));
                        if (retrievePasscount != 0)
                        {
                            Session["RetrievePassword"] = 1;
                        }
                        Session["Uname"] = returnValue.currentUser.FirstName + " " + returnValue.currentUser.LastName;

                        return RedirectToAction("ReportsPage", "Report");
                    }
                    ViewBag.errormsg = "You don't have permission to view the reports.";
                    // authentication.UpdateUserLastLogin(loggedinUser.UserId);
                }
                ViewBag.errormsg = "Invalid Username or Password";
                return View("Login");
            }
            else
            {
                ViewBag.errormsg = "Please Enter Username and Password";
                return View("Login");
            }
        }

        [SessionExpireReport]
        public ActionResult ReportsPage()
        {
            //if (Session["Uname"] != null)
            //{
            //    ViewBag.RetrievePassword = Session["RetrievePassword"];
                return View();
            //}
            //else
            //{
            //    return View("Login");
            //}
        }

        public void GetReportsForTeamMember()
        {
            const string filename = "All up Team member Completion Report(MSA).xlsx";
            DataTable dataTable = GetAllTeammemberReport();
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "\\ExcelTemplates\\AllTeammbrReportTempMSA.xlsx";
            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Team member Report");
            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));
            ms2.Position = 0;
            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }
        public void GetReportsForTeamMemberHSP()
        {
            const string filename = "All up Team member Completion Report(HSP).xlsx";
            DataTable dataTable = GetAllTeammemberReportHSP();
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "\\ExcelTemplates\\AllTeammbrReportTemp.xlsx";
            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Team member Report");
            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));
            ms2.Position = 0;
            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }
        public void GetReportsForManager()
        {
            const string filename = "All up Manager Completion Report(MSA).xlsx";
            DataTable dataTable = GetAllManagerReport();
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "\\ExcelTemplates\\AllManagerReportMSA.xlsx";
            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Manager Report");
            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));

            ms2.Position = 0;

            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }
        public void GetReportsForManagerHSP()
        {
            const string filename = "All up Manager Completion Report(HSP).xlsx";
            DataTable dataTable = GetAllManagerReportHSP();
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "\\ExcelTemplates\\AllManagerReportTemp.xlsx";
            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Manager Report");
            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));

            ms2.Position = 0;

            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }
        public void GetUpdatedPasswordLists()
        {
            const string filename = "Password Update.xlsx";
            DataTable dataTable = GetAllNotUpdatedPassword();
            string templatePath = System.Web.HttpContext.Current.Server.MapPath("~/") + "\\ExcelTemplates\\NotUpdatedPasswordList.xlsx";
            MemoryStream ms2 = ExcelReportGenerator.GenerateReport(dataTable, templatePath, 2, "Password Detail");
            System.Web.HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}", filename));

            ms2.Position = 0;

            ms2.WriteTo(System.Web.HttpContext.Current.Response.OutputStream);
            System.Web.HttpContext.Current.Response.End();
        }

        protected DataTable GetAllTeammemberReport()
        {
            var common = new CommonClient();
            int wave = 1;
            if (wave == 1)
            {
                var allFeedbackDetailsAccountManager = common.GenerateTeamReport(18).SelectMany((a, b) => new List<TeamReportsMSA>
                                              {
                                                  new TeamReportsMSA
                                                      {
                                                          PoeName = a.PoeName+"(STANDARD)",
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          Name = a.Name,
                                                          Email = a.Email,
                                                          Status = a.Status ,
                                                          CompletedOn =a.CompletedOn,
                                                          Relation = a.Relation,
                                                          PoEArea="STANDARD",
                                                            LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"
                                                        }
                                              }).ToList();
                var allFeedbackDetailsSalesManager = common.GenerateTeamReport(19).SelectMany((a, b) => new List<TeamReportsMSA>
                                              {
                                                  new TeamReportsMSA
                                                      {
                                                          PoeName = a.PoeName+"(EMEA)",
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          Name = a.Name,
                                                          Email = a.Email,
                                                          Status = a.Status ,
                                                          CompletedOn =a.CompletedOn,
                                                          Relation = a.Relation,
                                                          PoEArea="EMEA",
                                                          LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"
                                                        }
                                              }).ToList();
                var allFeedbackDetailsAMManager = common.GenerateTeamReport(20).SelectMany((a, b) => new List<TeamReportsMSA>
                                              {
                                                  new TeamReportsMSA
                                                      {
                                                          PoeName = a.PoeName+"(MIDMARKET)",
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          Name = a.Name,
                                                          Email = a.Email,
                                                          Status = a.Status ,
                                                          CompletedOn =a.CompletedOn,
                                                          Relation = a.Relation,
                                                          PoEArea="MIDMARKET",
                                                            LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"
                                                        }
                                              }).ToList();
                var allFeedbackDetailsAccountExeecutive = common.GenerateTeamReport(21).SelectMany((a, b) => new List<TeamReportsMSA>
                                              {
                                                  new TeamReportsMSA
                                                      {
                                                          PoeName = a.PoeName+"(STRATEGIC)",
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          Name = a.Name,
                                                          Email = a.Email,
                                                          Status = a.Status ,
                                                          CompletedOn =a.CompletedOn,
                                                          Relation = a.Relation,
                                                          PoEArea="STRATEGIC",
                                                            LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"
                                                        }
                                              }).ToList();
                var allFeedbackDetailsadsolSpecilaistt = common.GenerateTeamReport(22).SelectMany((a, b) => new List<TeamReportsMSA>
                                              {
                                                  new TeamReportsMSA
                                                      {
                                                          PoeName = a.PoeName+"(STANDARD)",
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          Name = a.Name,
                                                          Email = a.Email,
                                                          Status = a.Status ,
                                                          CompletedOn =a.CompletedOn,
                                                          Relation = a.Relation,
                                                          PoEArea="STANDARD",
                                                            LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"
                                                        }
                                              }).ToList();
                var allFeedbackDetailsProductSpecialist = common.GenerateTeamReport(23).SelectMany((a, b) => new List<TeamReportsMSA>
                                              {
                                                  new TeamReportsMSA
                                                      {
                                                          PoeName = a.PoeName+"(US&CA)",
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          Name = a.Name,
                                                          Email = a.Email,
                                                          Status = a.Status ,
                                                          CompletedOn =a.CompletedOn,
                                                          Relation = a.Relation,
                                                          PoEArea="US&CA",
                                                            LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"
                                                        }
                                              }).ToList();
                var allFeedbackDetailsProductSpecialist1 = common.GenerateTeamReport(24).SelectMany((a, b) => new List<TeamReportsMSA>
                                              {
                                                  new TeamReportsMSA
                                                      {
                                                          PoeName = a.PoeName+"(STANDARD)",
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          Name = a.Name,
                                                          Email = a.Email,
                                                          Status = a.Status ,
                                                          CompletedOn =a.CompletedOn,
                                                          Relation = a.Relation,
                                                          PoEArea="STANDARD",
                                                           LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"
                                                        }
                                              }).ToList();
                var allFeedbackDetailsProductSpecialist2 = common.GenerateTeamReport(25).SelectMany((a, b) => new List<TeamReportsMSA>
                                              {
                                                  new TeamReportsMSA
                                                      {
                                                          PoeName = a.PoeName+"(MIDMARKET)",
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          Name = a.Name,
                                                          Email = a.Email,
                                                          Status = a.Status ,
                                                          CompletedOn =a.CompletedOn,
                                                          Relation = a.Relation,
                                                          PoEArea="MIDMARKET",
                                                            LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"
                                                        }
                                              }).ToList();
                var allFeedbackDetailsProductSpecialist3 = common.GenerateTeamReport(26).SelectMany((a, b) => new List<TeamReportsMSA>
                                              {
                                                  new TeamReportsMSA
                                                      {
                                                          PoeName = a.PoeName,
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          Name = a.Name,
                                                          Email = a.Email,
                                                          Status = a.Status ,
                                                          CompletedOn =a.CompletedOn,
                                                          Relation = a.Relation,
                                                          PoEArea="SALES MANAGER",
                                                            LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"
                                                        }
                                              }).ToList();

                var allFeedbacks = new List<TeamReportsMSA>();
                allFeedbacks.AddRange(allFeedbackDetailsAccountManager);
                allFeedbacks.AddRange(allFeedbackDetailsSalesManager);
                allFeedbacks.AddRange(allFeedbackDetailsAMManager);
                allFeedbacks.AddRange(allFeedbackDetailsAccountExeecutive);
                allFeedbacks.AddRange(allFeedbackDetailsadsolSpecilaistt);
                allFeedbacks.AddRange(allFeedbackDetailsProductSpecialist);
                allFeedbacks.AddRange(allFeedbackDetailsProductSpecialist1); 
                allFeedbacks.AddRange(allFeedbackDetailsProductSpecialist2);
                allFeedbacks.AddRange(allFeedbackDetailsProductSpecialist3);
                var dataTable = ToDataTable(allFeedbacks);
                if (dataTable.Rows.Count > 0)
                {
                    DataView dv = dataTable.DefaultView;

                    dv.Sort = "PoeName,Name";

                    dataTable = dv.ToTable();
                }

                return dataTable;
            }
            return null;
        }
        protected DataTable GetAllTeammemberReportHSP()
        {
            var common = new CommonClient();
            int wave = 1;
            if (wave == 1)
            {
                var allFeedbackDetailsAccountManager = common.GenerateTeamReport(15).SelectMany((a, b) => new List<TeamReports>
                                              {
                                                  new TeamReports
                                                      {
                                                          PoeName = a.PoeName,
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          Name = a.Name,
                                                          Email = a.Email,
                                                          Status = a.Status ,
                                                          CompletedOn =a.CompletedOn,
                                                          Relation = a.Relation,
                                                          LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"
                                                        }
                                              }).ToList();
                var allFeedbackDetailsSalesManager = common.GenerateTeamReport(16).SelectMany((a, b) => new List<TeamReports>
                                              {
                                                  new TeamReports
                                                      {
                                                          PoeName = a.PoeName,
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          Name = a.Name,
                                                          Email = a.Email,
                                                          Status = a.Status ,
                                                          CompletedOn =a.CompletedOn,
                                                          Relation = a.Relation,
                                                          LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"
                                                        }
                                              }).ToList();
                var allFeedbackDetailsAMManager = common.GenerateTeamReport(17).SelectMany((a, b) => new List<TeamReports>
                                              {
                                                  new TeamReports
                                                      {
                                                          PoeName = a.PoeName,
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          Name = a.Name,
                                                          Email = a.Email,
                                                          Status = a.Status ,
                                                          CompletedOn =a.CompletedOn,
                                                          Relation = a.Relation,
                                                          LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"
                                                        }
                                              }).ToList();
               
                var allFeedbacks = new List<TeamReports>();
                allFeedbacks.AddRange(allFeedbackDetailsAccountManager);
                allFeedbacks.AddRange(allFeedbackDetailsSalesManager);
                allFeedbacks.AddRange(allFeedbackDetailsAMManager);
                var dataTable = ToDataTable(allFeedbacks);
                if (dataTable.Rows.Count > 0)
                {
                    DataView dv = dataTable.DefaultView;

                    dv.Sort = "PoeName,Name";

                    dataTable = dv.ToTable();
                }

                return dataTable;
            }
            return null;
        }
        protected DataTable GetAllManagerReport()
        {
            var common = new CommonClient();

            //var allFeedbackDetails = feedbackController.GetAllFeedbackDetails(1).Where(a => a.PoeId == int.Parse(Session["poeId"].ToString()));

            int wave = 1;
            //int.TryParse(Session["Wave"].ToString(), out wave);

            if (wave == 1)
            {
                var allFeedbackDetailsAccountManager = common.GenerateManagerReport(27).SelectMany((a, b) => new List<ManagerReports>
                                              {
                                                  new ManagerReports
                                                      {
                                                         PoeName = a.PoeName,
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          TeamName = a.TeamName,
                                                          TeamEmail = a.TeamEmail,
                                                          ManagerName = a.ManagerName,
                                                          ManagerEmail = a.ManagerEmail,
                                                          Status = a.Status,
                                                          CompletedOn = a.CompletedOn,
                                                          Relation = a.Relation,
                                                          PoEArea = "1",
                                                           LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"

                                                      }
                                              }).ToList();
                var allFeedbackDetailsSalesManager = common.GenerateManagerReport(28).SelectMany((a, b) => new List<ManagerReports>
                                              {
                                                  new ManagerReports
                                                      {
                                                          PoeName = a.PoeName,
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          TeamName = a.TeamName,
                                                          TeamEmail = a.TeamEmail,
                                                          ManagerName = a.ManagerName,
                                                          ManagerEmail = a.ManagerEmail,
                                                          Status = a.Status,
                                                          CompletedOn = a.CompletedOn,
                                                          Relation = a.Relation,
                                                            PoEArea = "1",
                                                             LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"

                                                      }
                                              }).ToList();
                var allFeedbackDetailsAMManager = common.GenerateManagerReport(29).SelectMany((a, b) => new List<ManagerReports>
                                              {
                                                  new ManagerReports
                                                      {
                                                          PoeName = a.PoeName,
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          TeamName = a.TeamName,
                                                          TeamEmail = a.TeamEmail,
                                                          ManagerName = a.ManagerName,
                                                          ManagerEmail = a.ManagerEmail,
                                                          Status = a.Status,
                                                          CompletedOn = a.CompletedOn,
                                                          Relation = a.Relation,
                                                          PoEArea = "1",
                                                             LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"

                                                      }
                                              }).ToList();
                var allFeedbackDetailsAccountManager5 = common.GenerateManagerReport(30).SelectMany((a, b) => new List<ManagerReports>
                                              {
                                                  new ManagerReports
                                                      {
                                                         PoeName = a.PoeName,
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          TeamName = a.TeamName,
                                                          TeamEmail = a.TeamEmail,
                                                          ManagerName = a.ManagerName,
                                                          ManagerEmail = a.ManagerEmail,
                                                          Status = a.Status,
                                                          CompletedOn = a.CompletedOn,
                                                          Relation = a.Relation,
                                                           PoEArea = "1",
                                                             LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"

                                                      }
                                              }).ToList();
                //var allFeedbackDetailsSalesManager4 = common.GenerateManagerReport(22).SelectMany((a, b) => new List<ManagerReports>
                //                              {
                //                                  new ManagerReports
                //                                      {
                //                                          PoeName = a.PoeName+"(STANDARD)",
                //                                          Area = a.Area,
                //                                          Country = a.Country,
                //                                          TeamName = a.TeamName,
                //                                          TeamEmail = a.TeamEmail,
                //                                          ManagerName = a.ManagerName,
                //                                          ManagerEmail = a.ManagerEmail,
                //                                          Status = a.Status,
                //                                          CompletedOn = a.CompletedOn,
                //                                          Relation = a.Relation,
                //                                           PoEArea = "STANDARD",
                //                                            LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"

                //                                      }
                //                              }).ToList();
                //var allFeedbackDetailsAMManager3 = common.GenerateManagerReport(23).SelectMany((a, b) => new List<ManagerReports>
                //                              {
                //                                  new ManagerReports
                //                                      {
                //                                          PoeName = a.PoeName+"(US&CA)",
                //                                          Area = a.Area,
                //                                          Country = a.Country,
                //                                          TeamName = a.TeamName,
                //                                          TeamEmail = a.TeamEmail,
                //                                          ManagerName = a.ManagerName,
                //                                          ManagerEmail = a.ManagerEmail,
                //                                          Status = a.Status,
                //                                          CompletedOn = a.CompletedOn,
                //                                          Relation = a.Relation,
                //                                           PoEArea = "US&CA",
                //                                            LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"

                //                                      }
                //                              }).ToList();
                //var allFeedbackDetailsAMManager7 = common.GenerateManagerReport(24).SelectMany((a, b) => new List<ManagerReports>
                //                              {
                //                                  new ManagerReports
                //                                      {
                //                                          PoeName = a.PoeName+"(STANDARD)",
                //                                          Area = a.Area,
                //                                          Country = a.Country,
                //                                          TeamName = a.TeamName,
                //                                          TeamEmail = a.TeamEmail,
                //                                          ManagerName = a.ManagerName,
                //                                          ManagerEmail = a.ManagerEmail,
                //                                          Status = a.Status,
                //                                          CompletedOn = a.CompletedOn,
                //                                          Relation = a.Relation,
                //                                          PoEArea = "STANDARD",
                //                                           LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"

                //                                      }
                //                              }).ToList();
                //var allFeedbackDetailsAMManager8 = common.GenerateManagerReport(25).SelectMany((a, b) => new List<ManagerReports>
                //                              {
                //                                  new ManagerReports
                //                                      {
                //                                          PoeName = a.PoeName+"(MIDMARKET)",
                //                                          Area = a.Area,
                //                                          Country = a.Country,
                //                                          TeamName = a.TeamName,
                //                                          TeamEmail = a.TeamEmail,
                //                                          ManagerName = a.ManagerName,
                //                                          ManagerEmail = a.ManagerEmail,
                //                                          Status = a.Status,
                //                                          CompletedOn = a.CompletedOn,
                //                                          Relation = a.Relation,
                //                                           PoEArea = "MIDMARKET",
                //                                             LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"
                //                                      }

                //                              }).ToList();
                //var allFeedbackDetailsAMManager9 = common.GenerateManagerReport(26).SelectMany((a, b) => new List<ManagerReports>
                //                              {
                //                                  new ManagerReports
                //                                      {
                //                                          PoeName = a.PoeName,
                //                                          Area = a.Area,
                //                                          Country = a.Country,
                //                                          TeamName = a.TeamName,
                //                                          TeamEmail = a.TeamEmail,
                //                                          ManagerName = a.ManagerName,
                //                                          ManagerEmail = a.ManagerEmail,
                //                                          Status = a.Status,
                //                                          CompletedOn = a.CompletedOn,
                //                                          Relation = a.Relation,
                //                                          PoEArea = "SALESMANAGER",
                //                                           LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"

                //                                      }

                //                              }).ToList();

                var allFeedbacks = new List<ManagerReports>();
                allFeedbacks.AddRange(allFeedbackDetailsAccountManager);
                allFeedbacks.AddRange(allFeedbackDetailsSalesManager);
                allFeedbacks.AddRange(allFeedbackDetailsAMManager);

              //  allFeedbacks.AddRange(allFeedbackDetailsSalesManager4);
                allFeedbacks.AddRange(allFeedbackDetailsAccountManager5);
                //allFeedbacks.AddRange(allFeedbackDetailsAMManager3);

               // allFeedbacks.AddRange(allFeedbackDetailsAMManager7);
               // allFeedbacks.AddRange(allFeedbackDetailsAMManager8);
               // allFeedbacks.AddRange(allFeedbackDetailsAMManager9);
               // allFeedbacks.AddRange(allFeedbackDetailsAMManager3);
                //allFeedbacks.AddRange(allFeedbackDetailsAccountExeecutive);
                //allFeedbacks.AddRange(allFeedbackDetailsadsolSpecilaistt);
                //allFeedbacks.AddRange(allFeedbackDetailsProductSpecialist);

                var dataTable = ToDataTable(allFeedbacks);
                if (dataTable.Rows.Count > 0)
                {
                    DataView dv = dataTable.DefaultView;

                    dv.Sort = "PoeName,ManagerName";

                    dataTable = dv.ToTable();
                }
                return dataTable;
            }
            return null;
        }
        protected DataTable GetAllManagerReportHSP()
        {
            var common = new CommonClient();
            int wave = 1;
            if (wave == 1)
            {
                var allFeedbackDetailsAccountManager = common.GenerateManagerReport(15).SelectMany((a, b) => new List<ManagerReportsHSP>
                                              {
                                                  new ManagerReportsHSP
                                                      {
                                                         PoeName = a.PoeName,
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          TeamName = a.TeamName,
                                                          TeamEmail = a.TeamEmail,
                                                          ManagerName = a.ManagerName,
                                                          ManagerEmail = a.ManagerEmail,
                                                          Status = a.Status,
                                                          CompletedOn = a.CompletedOn,
                                                          Relation = a.Relation,
                                                           LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"
                                                      }
                                              }).ToList();
                var allFeedbackDetailsSalesManager = common.GenerateManagerReport(16).SelectMany((a, b) => new List<ManagerReportsHSP>
                                              {
                                                  new ManagerReportsHSP
                                                      {
                                                          PoeName = a.PoeName,
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          TeamName = a.TeamName,
                                                          TeamEmail = a.TeamEmail,
                                                          ManagerName = a.ManagerName,
                                                          ManagerEmail = a.ManagerEmail,
                                                          Status = a.Status,
                                                          CompletedOn = a.CompletedOn,
                                                          Relation = a.Relation,
                                                          LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"
                                                      }
                                              }).ToList();
                var allFeedbackDetailsAMManager = common.GenerateManagerReport(17).SelectMany((a, b) => new List<ManagerReportsHSP>
                                              {
                                                  new ManagerReportsHSP
                                                      {
                                                          PoeName = a.PoeName,
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          TeamName = a.TeamName,
                                                          TeamEmail = a.TeamEmail,
                                                          ManagerName = a.ManagerName,
                                                          ManagerEmail = a.ManagerEmail,
                                                          Status = a.Status,
                                                          CompletedOn = a.CompletedOn,
                                                          Relation = a.Relation,
                                                           LastLogin=(a.LastLogin!=string.Empty)?"Yes":"no"
                                                      }
                                              }).ToList();


                var allFeedbacks = new List<ManagerReportsHSP>();
                allFeedbacks.AddRange(allFeedbackDetailsAccountManager);
                allFeedbacks.AddRange(allFeedbackDetailsSalesManager);
                allFeedbacks.AddRange(allFeedbackDetailsAMManager);
                var dataTable = ToDataTable(allFeedbacks);
                if (dataTable.Rows.Count > 0)
                {
                    DataView dv = dataTable.DefaultView;

                    dv.Sort = "PoeName,ManagerName";

                    dataTable = dv.ToTable();
                }
                return dataTable;
            }
            return null;
        }
        private static DataTable ToDataTable<T>(IEnumerable<T> items)
        {
            var dataTable = new DataTable(typeof(T).Name);

            //Get all the properties
            var props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (var prop in props)
            {
                //Setting column names as Property names
                dataTable.Columns.Add(prop.Name);
            }
            foreach (T item in items)
            {
                var values = new object[props.Length];
                for (var i = 0; i < props.Length; i++)
                {
                    //inserting property values to datatable rows
                    values[i] = props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            //put a breakpoint here and check datatable
            return dataTable;
        }

        protected DataTable GetAllNotUpdatedPassword()
        {
            var common = new CommonClient();

            var poes = "8,9,10,11,12,13";
            var allpasswords = common.GetNotUpdatedPasswordList(poes).SelectMany((a, b) => new List<NotUpdatedPassword>
                                              {
                                                  new NotUpdatedPassword
                                                      {
                                                         FirstName = a.FirstName,
                                                         LastName=a.LastName,
                                                         LastLogin=a.LastLogin,
                                                         EmailID= a.EmailAddress,
                                                         Password=a.Password,
                                                         Status=(a.Password=="Pass@123")?"Please Update the Passowrd":"Password Updated"
                                                      }
                                              }).ToList();

            var dataTable = ToDataTable(allpasswords);
            if (dataTable.Rows.Count > 0)
            {
                var dv = dataTable.DefaultView;

                //dv.Sort = "PoeName,ManagerName";

                dataTable = dv.ToTable();
                return dataTable;
            }
            return null;
        }

        /*
        protected DataTable GetAllTeammemberReport()
        {
            var feedback = new FeedbackServiceClient();
            DataTable dataTable = AllTeammemberReportsTableStructure();

            //var allFeedbackDetails = feedbackController.GetAllFeedbackDetails(1).Where(a => a.PoeId == int.Parse(Session["poeId"].ToString()));

            int wave = 1;
            //int.TryParse(Session["Wave"].ToString(), out wave);

            if (wave == 1)
            {
                var allFeedbackDetails = feedback.GetAllFeedbackDetails(1, 4).Where(a => a.FBFromOrByUser.Country.Id != 1 && a.FBFromOrByUser.Country.Id != 4 && a.FBFromOrByUser.Country.Id != 13);
                foreach (var allFeedbackDetail in allFeedbackDetails)
                {
                    DataRow dataRow = dataTable.NewRow();
                    dataRow["POE"] = GetPoeName(allFeedbackDetail.PoeId);
                    dataRow["Full Name"] = allFeedbackDetail.FBFromOrByUser.FirstName + "  " + allFeedbackDetail.FBFromOrByUser.LastName;
                    dataRow["Alias"] = allFeedbackDetail.FBFromOrByUser.EmailAddress.Replace("@microsoft.com", "");
                    dataRow["Area"] = allFeedbackDetail.FBFromOrByUser.Country.Name;
                    dataRow["Country/Location"] = allFeedbackDetail.FBFromOrByUser.Area.Name;
                    dataRow["Status"] = allFeedbackDetail.Status;
                    if (allFeedbackDetail.Status == "Yes")
                        dataRow["Date of completion"] = allFeedbackDetail.FBLastUpdatedon;

                    // dataRow["Full Name"] = "";

                    dataTable.Rows.Add(dataRow);
                }
                allFeedbackDetails = feedback.GetAllFeedbackDetails(1, 5).Where(a => a.FBFromOrByUser.Country.Id != 1 && a.FBFromOrByUser.Country.Id != 4);
                foreach (var allFeedbackDetail in allFeedbackDetails)
                {
                    DataRow dataRow = dataTable.NewRow();
                    dataRow["POE"] = GetPoeName(allFeedbackDetail.PoeId);
                    dataRow["Full Name"] = allFeedbackDetail.FBFromOrByUser.FirstName + "  " + allFeedbackDetail.FBFromOrByUser.LastName;
                    dataRow["Alias"] = allFeedbackDetail.FBFromOrByUser.EmailAddress.Replace("@microsoft.com", "");
                    dataRow["Area"] = allFeedbackDetail.FBFromOrByUser.Country.Name;
                    dataRow["Country/Location"] = allFeedbackDetail.FBFromOrByUser.Area.Name;
                    dataRow["Status"] = allFeedbackDetail.Status;
                    if (allFeedbackDetail.Status == "Yes")
                        dataRow["Date of completion"] = allFeedbackDetail.FBLastUpdatedon;

                    // dataRow["Full Name"] = "";

                    dataTable.Rows.Add(dataRow);
                }
                allFeedbackDetails = feedback.GetAllFeedbackDetails(1, 7);
                foreach (var allFeedbackDetail in allFeedbackDetails)
                {
                    DataRow dataRow = dataTable.NewRow();
                    dataRow["POE"] = GetPoeName(allFeedbackDetail.PoeId);
                    dataRow["Full Name"] = allFeedbackDetail.FBFromOrByUser.FirstName + "  " + allFeedbackDetail.FBFromOrByUser.LastName;
                    dataRow["Alias"] = allFeedbackDetail.FBFromOrByUser.EmailAddress.Replace("@microsoft.com", "");
                    dataRow["Area"] = allFeedbackDetail.FBFromOrByUser.Country.Name;
                    dataRow["Country/Location"] = allFeedbackDetail.FBFromOrByUser.Area.Name;
                    dataRow["Status"] = allFeedbackDetail.Status;
                    if (allFeedbackDetail.Status == "Yes")
                        dataRow["Date of completion"] = allFeedbackDetail.FBLastUpdatedon;

                    // dataRow["Full Name"] = "";

                    dataTable.Rows.Add(dataRow);
                }
            }

            else
            {
                for (int i = 6; i <= 12; i++)
                {
                    var allFeedbackDetails = feedback.GetAllFeedbackDetails(1, i);
                    foreach (var allFeedbackDetail in allFeedbackDetails)
                    {
                        DataRow dataRow = dataTable.NewRow();
                        dataRow["POE"] = GetPoeName(allFeedbackDetail.PoeId);
                        dataRow["Full Name"] = allFeedbackDetail.FBFromOrByUser.FirstName + "  " + allFeedbackDetail.FBFromOrByUser.LastName;
                        dataRow["Alias"] = allFeedbackDetail.FBFromOrByUser.EmailAddress.Replace("@microsoft.com", "");
                        dataRow["Area"] = allFeedbackDetail.FBFromOrByUser.Country.Name;
                        dataRow["Country/Location"] = allFeedbackDetail.FBFromOrByUser.Area.Name;
                        dataRow["Status"] = allFeedbackDetail.Status;
                        if (allFeedbackDetail.Status == "Yes")
                            dataRow["Date of completion"] = allFeedbackDetail.FBLastUpdatedon;

                        // dataRow["Full Name"] = "";

                        dataTable.Rows.Add(dataRow);
                    }
                }
            }

            if (dataTable.Rows.Count > 0)
            {
                DataView dv = dataTable.DefaultView;

                dv.Sort = "POE,Full Name";

                dataTable = dv.ToTable();
            }

            return dataTable;
        }

        protected DataTable GetAllManagerReport()
        {
            var feedback = new FeedbackServiceClient();
            DataTable dataTable = AllManagerReportsTableStructure();

            int wave = 1;
            //int.TryParse(Session["Wave"].ToString(), out wave);

            if (wave == 1)
            {
                var allFeedbackDetails = feedback.GetAllFeedbackDetails(2, 4).Where(a => a.FBFromOrByUser.Country.Id != 1 && a.FBFromOrByUser.Country.Id != 4 && a.FBFromOrByUser.Country.Id != 13);
                foreach (var allFeedbackDetail in allFeedbackDetails)
                {
                    DataRow dataRow = dataTable.NewRow();
                    dataRow["POE"] = GetPoeName(allFeedbackDetail.PoeId);
                    dataRow["Manager Full Name"] = allFeedbackDetail.FBFromOrByUser.FirstName + "  "
                                                   + allFeedbackDetail.FBFromOrByUser.LastName;
                    dataRow["Manager Alias"] = allFeedbackDetail.FBFromOrByUser.EmailAddress.Replace("@microsoft.com",
                                                                                                     "");
                    dataRow["Area"] = allFeedbackDetail.FBFromOrByUser.Country.Name;
                    dataRow["Country/Location"] = allFeedbackDetail.FBFromOrByUser.Area.Name;
                    if (allFeedbackDetail.FBTouser != null)
                    {
                        dataRow["Team member Full Name"] = allFeedbackDetail.FBTouser.FirstName + "  "
                                                           + allFeedbackDetail.FBTouser.LastName;
                        dataRow["Team member Alias"] = allFeedbackDetail.FBTouser.EmailAddress.Replace(
                            "@microsoft.com", "");
                    }
                    dataRow["Status"] = allFeedbackDetail.Status;
                    if (allFeedbackDetail.Status == "Yes")
                        dataRow["Date of completion"] = allFeedbackDetail.FBLastUpdatedon;

                    // dataRow["Full Name"] = "";

                    dataTable.Rows.Add(dataRow);
                }

                allFeedbackDetails = feedback.GetAllFeedbackDetails(2, 5).Where(a => a.FBFromOrByUser.Country.Id != 1 && a.FBFromOrByUser.Country.Id != 4);
                foreach (var allFeedbackDetail in allFeedbackDetails)
                {
                    DataRow dataRow = dataTable.NewRow();
                    dataRow["POE"] = GetPoeName(allFeedbackDetail.PoeId);
                    dataRow["Manager Full Name"] = allFeedbackDetail.FBFromOrByUser.FirstName + "  "
                                                   + allFeedbackDetail.FBFromOrByUser.LastName;
                    dataRow["Manager Alias"] = allFeedbackDetail.FBFromOrByUser.EmailAddress.Replace("@microsoft.com",
                                                                                                     "");
                    dataRow["Area"] = allFeedbackDetail.FBFromOrByUser.Country.Name;
                    dataRow["Country/Location"] = allFeedbackDetail.FBFromOrByUser.Area.Name;
                    if (allFeedbackDetail.FBTouser != null)
                    {
                        dataRow["Team member Full Name"] = allFeedbackDetail.FBTouser.FirstName + "  "
                                                           + allFeedbackDetail.FBTouser.LastName;
                        dataRow["Team member Alias"] = allFeedbackDetail.FBTouser.EmailAddress.Replace(
                            "@microsoft.com", "");
                    }
                    dataRow["Status"] = allFeedbackDetail.Status;
                    if (allFeedbackDetail.Status == "Yes")
                        dataRow["Date of completion"] = allFeedbackDetail.FBLastUpdatedon;

                    // dataRow["Full Name"] = "";

                    dataTable.Rows.Add(dataRow);
                }
                allFeedbackDetails = feedback.GetAllFeedbackDetails(2, 7);
                foreach (var allFeedbackDetail in allFeedbackDetails)
                {
                    DataRow dataRow = dataTable.NewRow();
                    dataRow["POE"] = GetPoeName(allFeedbackDetail.PoeId);
                    dataRow["Manager Full Name"] = allFeedbackDetail.FBFromOrByUser.FirstName + "  "
                                                   + allFeedbackDetail.FBFromOrByUser.LastName;
                    dataRow["Manager Alias"] = allFeedbackDetail.FBFromOrByUser.EmailAddress.Replace("@microsoft.com",
                                                                                                     "");
                    dataRow["Area"] = allFeedbackDetail.FBFromOrByUser.Country.Name;
                    dataRow["Country/Location"] = allFeedbackDetail.FBFromOrByUser.Area.Name;
                    if (allFeedbackDetail.FBTouser != null)
                    {
                        dataRow["Team member Full Name"] = allFeedbackDetail.FBTouser.FirstName + "  "
                                                           + allFeedbackDetail.FBTouser.LastName;
                        dataRow["Team member Alias"] = allFeedbackDetail.FBTouser.EmailAddress.Replace(
                            "@microsoft.com", "");
                    }
                    dataRow["Status"] = allFeedbackDetail.Status;
                    if (allFeedbackDetail.Status == "Yes")
                        dataRow["Date of completion"] = allFeedbackDetail.FBLastUpdatedon;

                    // dataRow["Full Name"] = "";

                    dataTable.Rows.Add(dataRow);
                }
            }

            else
            {
                for (int i = 6; i <= 12; i++)
                {
                    var allFeedbackDetails = feedback.GetAllFeedbackDetails(2, i);
                    foreach (var allFeedbackDetail in allFeedbackDetails)
                    {
                        DataRow dataRow = dataTable.NewRow();
                        dataRow["POE"] = GetPoeName(allFeedbackDetail.PoeId);
                        dataRow["Manager Full Name"] = allFeedbackDetail.FBFromOrByUser.FirstName + "  "
                                                       + allFeedbackDetail.FBFromOrByUser.LastName;
                        dataRow["Manager Alias"] = allFeedbackDetail.FBFromOrByUser.EmailAddress.Replace("@microsoft.com",
                                                                                                         "");
                        dataRow["Area"] = allFeedbackDetail.FBFromOrByUser.Country.Name;
                        dataRow["Country/Location"] = allFeedbackDetail.FBFromOrByUser.Area.Name;
                        if (allFeedbackDetail.FBTouser != null)
                        {
                            dataRow["Team member Full Name"] = allFeedbackDetail.FBTouser.FirstName + "  "
                                                               + allFeedbackDetail.FBTouser.LastName;
                            dataRow["Team member Alias"] = allFeedbackDetail.FBTouser.EmailAddress.Replace(
                                "@microsoft.com", "");
                        }
                        dataRow["Status"] = allFeedbackDetail.Status;
                        if (allFeedbackDetail.Status == "Yes")
                            dataRow["Date of completion"] = allFeedbackDetail.FBLastUpdatedon;

                        // dataRow["Full Name"] = "";

                        dataTable.Rows.Add(dataRow);
                    }
                }
            }

            if (dataTable.Rows.Count > 0)
            {
                DataView dv = dataTable.DefaultView;

                dv.Sort = "POE,Manager Full Name";

                dataTable = dv.ToTable();
            }

            return dataTable;
        }

        protected DataTable AllTeammemberReportsTableStructure()
        {
            var dataTable = new DataTable();
            dataTable.Columns.Add("POE");
            dataTable.Columns.Add("Full Name");
            dataTable.Columns.Add("Alias");
            dataTable.Columns.Add("Area");
            dataTable.Columns.Add("Country/Location");
            dataTable.Columns.Add("Status");
            dataTable.Columns.Add("Date of completion");

            return dataTable;
        }

        protected DataTable AllManagerReportsTableStructure()
        {
            var dataTable = new DataTable();
            dataTable.Columns.Add("POE");
            dataTable.Columns.Add("Manager Full Name");
            dataTable.Columns.Add("Manager Alias");
            dataTable.Columns.Add("Team member Full Name");
            dataTable.Columns.Add("Team member Alias");
            dataTable.Columns.Add("Area");
            dataTable.Columns.Add("Country/Location");
            dataTable.Columns.Add("Status");
            dataTable.Columns.Add("Date of completion");

            return dataTable;
        }
        */

        protected string GetPoeName(int poeid)
        {
            var common = new SignupClient();
            var returnValue = common.GetAllPoEs().Where(a => a.POEId == poeid).ToList();

            return returnValue[0].Name;
        }
    }

    public class ManagerReports
    {
        public string PoeName { get; set; }

        public string ManagerName { get; set; }

        public string ManagerEmail { get; set; }

        public string TeamName { get; set; }

        public string TeamEmail { get; set; }

        public string Relation { get; set; }

        public string Area { get; set; }

        public string Country { get; set; }

        public string Status { get; set; }

        public string CompletedOn { get; set; }
        public string PoEArea { get; set; }
        public string LastLogin { get; set; }
    }
    public class ManagerReportsHSP
    {
        public string PoeName { get; set; }

        public string ManagerName { get; set; }

        public string ManagerEmail { get; set; }

        public string TeamName { get; set; }

        public string TeamEmail { get; set; }

        public string Relation { get; set; }

        public string Area { get; set; }

        public string Country { get; set; }

        public string Status { get; set; }

        public string CompletedOn { get; set; }
        public string LastLogin { get; set; }
    }
    public class TeamReports
    {
        public string PoeName { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Relation { get; set; }

        public string Area { get; set; }

        public string Country { get; set; }

        public string Status { get; set; }

        public string CompletedOn { get; set; }
        public string LastLogin { get; set; }
    }
    public class TeamReportsMSA
    {
        public string PoeName { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Relation { get; set; }

        public string Area { get; set; }

        public string Country { get; set; }

        public string Status { get; set; }

        public string CompletedOn { get; set; }
        public string PoEArea { get; set; }
        public string LastLogin { get; set; }
    }
    public class NotUpdatedPassword
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string EmailID { get; set; }

        public DateTime? LastLogin { get; set; }

        public string Password { get; set; }

        public string Status { get; set; }
    }
}