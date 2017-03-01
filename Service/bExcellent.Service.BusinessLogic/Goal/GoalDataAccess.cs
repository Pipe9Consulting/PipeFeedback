using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Xml.Linq;
using bExcellent.Service.BusinessLogic.Common;
using bExcellent.Service.DataAccess;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Response;

namespace bExcellent.Service.BusinessLogic.Goal
{
    public class GoalDataAccess
    {
        #region Private Member

        private static DataContextFactory _factory;

        #endregion Private Member

        #region Private Property

        /// <summary>
        /// Gets the data context factory.
        /// </summary>
        private DataContextFactory DataContextFactory
        {
            get
            {
                if (_factory == null)
                {
                    _factory = new DataContextFactory();
                }
                return _factory;
            }
        }

        #endregion Private Property

        public int CreateMyGoal(int userId, int poeId, int questionId, int selectedValue, DateTime goalDate)
        {
            using (var context = new DataContextFactory().GetIntelliSetDataContext())
            {
                var v3CreateMyGoalsResult = context.CreateMyGoals(userId, poeId, questionId, selectedValue, goalDate).FirstOrDefault();
                if (v3CreateMyGoalsResult != null)
                    return v3CreateMyGoalsResult.GoalId.GetValueOrDefault();
                else
                    return 0;
            }
        }

        public string GetModuleName(int questionid)
        {
            using (var context = new DataContextFactory().GetIntelliSetDataContext())
            {
                var val = context.GetQuestionById(questionid).FirstOrDefault();
                if (val != null)
                    return val.ModuleName;
                else
                    return string.Empty;
            }
        }

        public void ShareGoal(int goalId, int shareWith)
        {
            using (var context = new DataContextFactory().GetIntelliSetDataContext())
            {
                context.ShareGoal(goalId, shareWith);
            }
        }

        public void SaveGoal(GoalShare goalShare)
        {
            BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
            int goalId = CreateMyGoal(goalShare.UserId, goalShare.PoeId, goalShare.QuestionId, goalShare.SelectedValue, goalShare.GoalDate);
            if (goalShare.SharedWithId != 0)
            {
                if (goalShare.SharedWithId == -1)
                {
                    var teams = common.GetMyReceiveFbTeam(goalShare.UserId, goalShare.PoeId, goalShare.SubId);
                    foreach (UserPOEMapping team in teams)
                    {
                        ShareGoal(goalId, team.User.UserId);
                    }
                }
                else
                {
                    ShareGoal(goalId, goalShare.SharedWithId);
                }
            }
        }

        public void SaveGoals(List<GoalShare> goalShares)
        {
            Common.Common common = new Common.Common();
            foreach (GoalShare goalShare in goalShares)
            {
                SaveGoal(goalShare);
            }
            foreach (IGrouping<int, GoalShare> grouping in goalShares.GroupBy(gs => gs.SharedWithId))
            {
                var count = grouping.Count();
                var sharedWithUserId = grouping.Key;
                var userId = goalShares[0].UserId;
                var poeid = goalShares[0].PoeId;
                var subid = goalShares[0].SubId;
                var user = common.GetUserById(userId);
                var poename = common.GetPoeName(poeid);
                var qtext = "<div style='clear:both'>";
                var moduleName = string.Empty;
                int month = 0;
                foreach (GoalShare goalShare in grouping)
                {
                    string months = string.Empty;
                    switch (goalShare.SelectedValue)
                    {
                        case 1:
                            months = "now";
                            month = 0;
                            break;

                        case 2:
                            months = "6 months";
                            month = 6;
                            break;

                        case 3:
                            months = "12 months";
                            month = 12;
                            break;

                        case 4:
                            months = "24 months";
                            month = 24;
                            break;
                    }

                    moduleName = GetModuleName(goalShare.QuestionId);
                    //  qtext = qtext + GetQuestionText(goalShare.QuestionId)+"</br>";
                    qtext = qtext + "<p id='GoalsId" + month + "' class='GoalsMonths'>" + GetShortQuestionText(goalShare.QuestionId) + " </p><br/>";
                    //we get the goals shared with one user.
                }
                var content = user.FirstName + " " + user.LastName + " has assigned a " + count + " goal/s<br/>" +
                  "<p id='PoeName'>PoE name: " + poename + "</p></br>" +
                  "<p id='ModuleName'>Module name: " + moduleName + "</p><br/>" + qtext + "</div>";
                var text = " <div class='recieve' id='goaldetail'  style='height:60px'></div><div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) +
                         " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>" + "Goal Shared" + "</h2>" + "<p class='wallcomment'>" + content + "</p>";

                CreateGoalActivity(userId, subid, poeid, sharedWithUserId, text);

                var content2 = "<p class='CommentlistsVal'>You have set a goal</p><p class='poenames'>" +
               "PoE name: " + poename + "</p><p class='modulenameslist'>" +
               "Module name: " + moduleName + "</p>" + qtext;
                var text2 = " <div class='recieve' id='goaldetail' style='height:60px'></div><div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) +
                         " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>" + "Goal Shared" + "</h2>" + "<p class='wallcomment'>" + content2 + "</p>";

                CreateGoalActivity(userId, subid, poeid, userId, text2);
                var fromName = user.FirstName + " " + user.LastName;
                var toUser = common.GetUserById(sharedWithUserId);
                if (toUser != null)
                {
                    var goalContnet = String.Empty; //need to  construct by pratheesh
                    // SendSharedGoal(fromName, toUser.FirstName + " " + toUser.LastName, goalContnet, toUser.EmailAddress);
                }
            }
        }

        public void SendSharedGoal(string fromName, string toName, string goalContent, string toEmailId)
        {
            string _from = ConfigurationManager.AppSettings["fromEmail"];
            string emailServer = ConfigurationManager.AppSettings["mailServer"];
            string _userId = ConfigurationManager.AppSettings["emailUserId"];
            string _pwd = ConfigurationManager.AppSettings["emailPassword"];
            string _bcc = ConfigurationManager.AppSettings["bccEmail"];
            string _to = ConfigurationManager.AppSettings["mailTo"];
            string contentstring = Constant.GoalMessage;
            string subject = "Shared Goal at kessaku.com";

            if (_to.Trim() == string.Empty)
            {
                _to = toEmailId;
            }
            string emailContenttemp = string.Format(contentstring,
                                     toName,
                                     fromName,
                                     goalContent,
                                     Constant.HomeUrl
                                     );
            string emailContent = string.Format(Constant.EmailTemplate, emailContenttemp);

            string Mailbody = emailContent;
            MailMessage objEmail = new MailMessage(_from, _to, subject, Mailbody);

            objEmail.Bcc.Add(_bcc);

            objEmail.IsBodyHtml = true;

            SmtpClient emailClient = new SmtpClient(emailServer);
            System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(_userId,
                _pwd);

            emailClient.Host = emailServer;
            emailClient.UseDefaultCredentials = false;
            emailClient.Credentials = basicAuthenticationInfo;
            emailClient.Send(objEmail);
        }

        public void CreateGoalActivity(int userid, int subid, int poeid, int forid, string text)
        {
            Common.Common common = new Common.Common();
            if (forid != 0)
            {
                if (forid == -1)
                {
                    var teams = common.GetMyReceiveFbTeam(userid, poeid, subid);
                    foreach (UserPOEMapping team in teams)
                    {
                        common.CreateActivity(userid, team.User.UserId.ToString(), subid, 5, text, poeid);
                    }
                }
                else
                {
                    common.CreateActivity(userid, forid.ToString(), subid, 5, text, poeid);
                }
            }
        }

        public List<ModulesGoal> GetMyGoals(int poeid, int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetSinglePOEModules(poeid)
                            .SelectMany((a, b) => new List<ModulesGoal>
                                {
                                    new ModulesGoal
                                    {
                                       ModuleId = a.POEModuleId,
                                       ModuleName = a.ModuleName,
                                       ModuleOrderNumber=a.ModuleOrder,
                                       QuestionsGoals = GetGoalsQuestionSet(a.POEModuleId,userid),
                                       IndexType = (a.IndexType.HasValue) ? a.IndexType.Value : 0,
                                       Active = a.Active.GetValueOrDefault(),
                                    }
                                }).ToList();
            }
        }

        /// <summary>
        /// Gets the modules question set.
        /// </summary>
        /// <param name="moduleId">The module id.</param>
        /// <returns></returns>
        public List<QuestionsGoal> GetGoalsQuestionSet(int moduleId, int userId)
        {
            //  HtmlRemoval htmlRemoval = new HtmlRemoval();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetModulesQuestionSet(moduleId)
                              .SelectMany((a, b) => new List<QuestionsGoal>
                                {
                                    new QuestionsGoal{
                                        QuestionId = a.QuestionId,
                                        QuestionOrderNumber = a.QuestionOrder,
                                        QuetionText =RemoveHtml(a.Question),
                                        ShortQuetionText = RemoveHtml(a.ShortQuestion),
                                        SideBarTitle = a.SideBarText,
                                        IsBarrierQuestion = (a.QuestionType == 2),
                                        SelectedGoalValue = GetSelectedGoalValue(userId,a.QuestionId),
                                        Goal = GetGoal(userId,a.QuestionId)
                                    }
                                }).ToList();
            }
        }

        public string GetQuestionText(int questionId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var v3GetQuestionTextByIdResult = context.GetQuestionTextById(questionId).FirstOrDefault();
                if (v3GetQuestionTextByIdResult != null)
                    return RemoveHtml(v3GetQuestionTextByIdResult.Question);
                else
                    return string.Empty;
            }
        }

        public string GetShortQuestionText(int questionId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var d = context.GetShortQuestionTextById(questionId).FirstOrDefault();
                if (d != null)
                    return RemoveHtml(d.ShortQuestion);
                else
                    return string.Empty;
            }
        }

        public int GetSelectedGoalValue(int userId, int questionId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var v3GetMyGoalsResult = context.GetMyGoals(userId, questionId).FirstOrDefault();
                if (v3GetMyGoalsResult != null)
                    return v3GetMyGoalsResult.Selectedvalue;
                else
                    return 0;
            }
        }

        public int GetGoal(int userId, int questionId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var v3GetMyGoalsResult = context.GetMyGoals(userId, questionId).FirstOrDefault();
                if (v3GetMyGoalsResult != null)
                    return v3GetMyGoalsResult.Goal;
                else
                    return 4;
            }
        }

        /// <summary>
        /// Removes the HTML.
        /// </summary>
        /// <param name="text">The text.</param>
        /// <returns></returns>
        public string RemoveHtml(string text)
        {
            string returntext = string.Empty;

            returntext = text.Replace("<p><strong>", "").Replace("</strong></p>", "");

            return returntext;
        }

        /// <summary>
        /// Removes the indetail HTML.
        /// </summary>
        /// <param name="text">The text.</param>
        /// <returns></returns>
        public string RemoveIndetailHtml(string text)
        {
            string returntext = string.Empty;

            returntext = text.Replace("<strong>", "").Replace("</strong>", "").Replace("<p>", "").Replace("</p>", "").Replace("In Detail:", "");

            return returntext;
        }

        /// <summary>
        /// Getting QuestionsList
        /// </summary>
        /// <param name="text">Test Data.</param>
        /// <returns></returns>
        public List<QuestionLists> GetQuestionsList(int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {

                var data = context.GetQuestionsListTest(poeid);

                var result = data.SelectMany(a => new List<QuestionLists>                   
                    {
                        new QuestionLists
                        {
                            QuestionId = a.QuestionId,
                            PoeModuleId= a.POEModuleId,
                            Questions = a.Question,
                            QuestionOrder = a.QuestionOrder,
                            POEId = a.POEId,
                            ModuleName=a.ModuleName,
                            Priority=a.Priority
                        }
                    }).ToList();

                return result;

            }
        }

        /// <summary>
        /// Getting Goals
        /// </summary>
        /// <param name="text">Goals Data.</param>
        /// <returns></returns>
        public List<Goals> GetDevPriorityQuestions(int UserId, int PoeId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var data = context.GetDevPriorityQuestions(UserId, PoeId);
                var grpresult = data.GroupBy(i => new { i.POEModuleId, i.QuestionId });
                //var grpresult2 = grpresult.GroupBy(i => i.FirstOrDefault().POEModuleId);
                var result = grpresult.SelectMany(i => new List<Goals>
                {
                    new Goals{
                        ModuleId = i.FirstOrDefault().POEModuleId,
                        ModuleOrderNumber = i.FirstOrDefault().ModuleOrder,
                        ModuleName = i.FirstOrDefault().ModuleName,
                        question =  new List<Question> {
                            new Question{
                                QuestionId = i.FirstOrDefault().QuestionId,
                                QuetionText = i.FirstOrDefault().SideBarText,
                                Answer = i.FirstOrDefault().Answer,
                                QuestionOrderNumber = i.FirstOrDefault().QuestionOrder,
                                Manager =  new User {
                                                UserId = Convert.ToInt32(i.FirstOrDefault().Mgrid),
                                                FirstName = i.FirstOrDefault().FirstName,
                                                LastName = i.FirstOrDefault().LastName
                                                },
                        Goaldate =  i.FirstOrDefault().GoalDate!=null?i.FirstOrDefault().GoalDate.GetValueOrDefault().ToString("MMMM dd, yyyy"):"",
                        Sharedwith = i.Select(b => (new Common.CommonDataAccess().GetUserById(b.SharedWith))).ToList(),
                        SetGoalDate = i.FirstOrDefault().UpdatedOn!=null?i.FirstOrDefault().UpdatedOn.GetValueOrDefault().ToString("MMMM dd, yyyy"):""
                                     }
                        },
                    }
                    
                }).ToList();
                return result;
            }
            return null;
        }

        public List<Goals> GetModuleQuestions(int UserId, int PoeId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var data = context.GetModuleQuestions(UserId, PoeId);
                var grpresult = data.GroupBy(i => new { i.POEModuleId, i.QuestionId });
                var grpresult2 = grpresult.GroupBy(i => i.FirstOrDefault().POEModuleId);
                var result = grpresult2.SelectMany(i => new List<Goals>
                {
                    new Goals{
                        ModuleId = i.FirstOrDefault().FirstOrDefault().POEModuleId,
                        ModuleOrderNumber = i.FirstOrDefault().FirstOrDefault().ModuleOrder,
                        ModuleName = i.FirstOrDefault().FirstOrDefault().ModuleName,
                        question = i.SelectMany(a => new List<Question> {
                            new Question{
                                QuestionId = a.FirstOrDefault().QuestionId,
                                QuetionText = a.FirstOrDefault().SideBarText,
                                Answer = a.FirstOrDefault().Answer,
                                QuestionOrderNumber = a.FirstOrDefault().QuestionOrder,
                                Manager =  new User {
                                                UserId = Convert.ToInt32(a.FirstOrDefault().Mgrid),
                                                FirstName = a.FirstOrDefault().FirstName,
                                                LastName = a.FirstOrDefault().LastName
                                                },
                        Goaldate =  a.FirstOrDefault().GoalDate!=null?a.FirstOrDefault().GoalDate.GetValueOrDefault().ToString("MMMM dd, yyyy"):"",
                        Sharedwith = a.Select( b => (new Common.CommonDataAccess().GetUserById(b.SharedWith))).ToList(),
                        SetGoalDate = a.FirstOrDefault().UpdatedOn!=null?a.FirstOrDefault().UpdatedOn.GetValueOrDefault().ToString("MMMM dd, yyyy"):""
                        }
                        }).ToList(),
                    }
                    }).ToList();
                return result;
            }
            return null;
        }

        public List<string> GetTrackGoalTiles(int poeid, int userid, int subid, string domain)
        {
            List<string> result = new List<string>();
            var you = GetYouFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), subid, 1, domain);
            var manager = GetYouFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), subid, 2, domain);
            var Youscore = new Standing.StandingDataAccess().GetAvgWcsiScore(you);
            var managerscore = new Standing.StandingDataAccess().GetAvgWcsiScore(manager);
            int mgrscore = Convert.ToInt32(managerscore.FirstOrDefault().wcsi.ToString()) / Convert.ToInt32(manager.Split(',').Distinct().Count());
            mgrscore = mgrscore - Convert.ToInt32(Youscore.FirstOrDefault().wcsi);
            result.Add(Youscore.FirstOrDefault().wcsi.ToString());
            result.Add(managerscore.FirstOrDefault().wcsi.ToString());
            return result;
        }

        public string GetYouFbidString(int poeid, string userid, int subid, int tileclicked, string domain)
        {
            var fbids = string.Empty;
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var returnvalue = context.GetYouFbids(poeid, domain, tileclicked, userid, subid).ToList();

                if (returnvalue.Count != 0)
                {
                    if (tileclicked == 1)
                    {
                        var v3GetMyFeedbackByRoleResult = returnvalue.FirstOrDefault();
                        if (v3GetMyFeedbackByRoleResult != null)
                            fbids = v3GetMyFeedbackByRoleResult.POEFeedbackId.ToString(CultureInfo.InvariantCulture);
                    }
                    else
                    {
                        fbids = returnvalue.Aggregate(fbids, (current, fblist) => current + fblist.POEFeedbackId.ToString(CultureInfo.InvariantCulture) + ",");
                    }
                }
            }
            if (!string.IsNullOrEmpty(fbids))
            {
                return fbids.Substring(fbids.Length - 1, 1) == "," ? fbids.Substring(0, fbids.Length - 1) : fbids;
            }
            return "0";
        }

        public string GetPrevFbidString(int poeid, string userid, int subid, int tileclicked, string domain)
        {
            var fbids = string.Empty;
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var returnvalue = context.GetPrevFbids(poeid, domain, tileclicked, userid, subid).ToList();

                if (returnvalue.Count != 0)
                {
                    if (tileclicked == 1)
                    {
                        var v3GetMyFeedbackByRoleResult = returnvalue.FirstOrDefault();
                        if (v3GetMyFeedbackByRoleResult != null)
                            fbids = v3GetMyFeedbackByRoleResult.POEFeedbackId.ToString(CultureInfo.InvariantCulture);
                    }
                    else
                    {
                        fbids = returnvalue.Aggregate(fbids, (current, fblist) => current + fblist.POEFeedbackId.ToString(CultureInfo.InvariantCulture) + ",");
                    }
                }
            }
            if (!string.IsNullOrEmpty(fbids))
            {
                return fbids.Substring(fbids.Length - 1, 1) == "," ? fbids.Substring(0, fbids.Length - 1) : fbids;
            }
            return "0";
        }


        public void DeleteGoalDate(int UserId, int PoeId, int QuestionId)
        {

            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.DelModuleQuestionsDate(UserId, PoeId, QuestionId);
            }

        }

        public TrackGoal TrackModuleQuestions(int UserId, int PoeId, int subid, string domain, int usermapping = 0, int type = 0)
        {
            Common.Common common = new Common.Common();
            var netid = GetYouFbidString(PoeId, UserId.ToString(CultureInfo.InvariantCulture), subid, 2, domain);
            var muid = 0;
            dynamic youid = "";
            // Get self feedbackid 
            if (type == 0)
            {
                youid = new Sync.SyncDataAccess().GetRecentSelfFBid(PoeId, UserId, subid);
                muid = UserId;
            }
            else
            {
                //overall mgrs fbid
                if (usermapping != 0)
                {
                    muid = common.GetUserDetailsByMappingId(usermapping).User.UserId;
                    youid = new Sync.SyncDataAccess().GetRecentRcvdFBidByUser(PoeId, UserId, subid, usermapping);

                }
                //specific mgrs fbid
                else
                {
                    muid = UserId;
                    youid = new Sync.SyncDataAccess().GetOverallRecentRcvdFBidByUser(PoeId, UserId, subid, usermapping);
                }
            }

            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var netdata = new Standing.StandingDataAccess().GetAvgStandingScore(netid, PoeId, UserId);
                dynamic Youdata = "";
                // Get self fb results 
                if (type == 0)
                {
                    Youdata = new Sync.SyncDataAccess().GetSyncScore(youid, muid, PoeId, UserId, usermapping);
                }
                else
                {
                    //overall mgrs fb results
                    if (usermapping == 0)
                    {
                        Youdata = new Sync.SyncDataAccess().GetSyncScoreOverall(youid, muid, PoeId, UserId, usermapping);
                    }
                    //specific mgrs fb results
                    else
                    {
                        Youdata = new Sync.SyncDataAccess().GetSyncScore(youid, muid, PoeId, UserId, usermapping);
                    }
                }
                var result = new TrackGoal();
                result.Netdata = netdata; result.Youdata = Youdata;
                return result;
            }
        }
        public List<DevelopmentPriorities> GetManagerDevPriorities(int userId, int PoeId, int tmmappingId)
        {
            int devPriorityCount = int.Parse(ConfigurationManager.AppSettings["devPriorityCount"]);
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var developmentPriorites = context.GetDevPrioritiesByTM(tmmappingId, userId, PoeId).ToList();
                var devPrioVeryImportant = developmentPriorites.Where(a => a.Answer == 1 && a.Rating == 4).ToList();
                var intialbucketCount = devPrioVeryImportant.Count;
                var listDevPriority = new List<DevelopmentPriorities>();
                if (intialbucketCount != 0)
                {
                    listDevPriority.AddRange(devPrioVeryImportant.Select(eachPriority => new DevelopmentPriorities
                    {
                        ManagerResult = (int)eachPriority.Answer,
                        QuestionId = eachPriority.QuestionId,
                        Rating = (int)eachPriority.Rating,
                        Question = eachPriority.ShortQuestion,
                        ModuleName = eachPriority.ModuleName,
                        ModuleOrder = eachPriority.ModuleOrder,
                        ManagerCapability = (int)eachPriority.Capability,
                        Bucketorder = 1,
                        CurrentFeedbackId = eachPriority.FeedbackId,
                        ManagerMappingId = (int)eachPriority.ManagerId
                    }));
                }
                //Rarely-Important
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityImportant = developmentPriorites.Where(a => a.Answer == 1 && a.Rating == 3).ToList();
                    if (devPriorityImportant.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityImportant.Count;
                        listDevPriority.AddRange(devPriorityImportant.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 2,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId
                        }));

                    }
                }
                //Inconsistently-veryImportant
                if (devPriorityCount > intialbucketCount)
                {
                    var devPrioritySomeImportant = developmentPriorites.Where(a => a.Answer == 2 && a.Rating == 4).ToList();
                    if (devPrioritySomeImportant.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPrioritySomeImportant.Count;
                        listDevPriority.AddRange(devPrioritySomeImportant.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 3,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId
                        }));

                    }
                }
                //rarely-SomewhatImportant
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic4 = developmentPriorites.Where(a => a.Answer == 1 && a.Rating == 2).ToList();
                    if (devPriorityLogic4.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityLogic4.Count;
                        listDevPriority.AddRange(devPriorityLogic4.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 4,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId
                        }));

                    }
                }
                //inconsistently-Important
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic5 = developmentPriorites.Where(a => a.Answer == 2 && a.Rating == 3).ToList();
                    if (devPriorityLogic5.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityLogic5.Count;
                        listDevPriority.AddRange(devPriorityLogic5.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 5,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId
                        }));

                    }
                }
                //inconsistently-somewhatImportant
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic6 = developmentPriorites.Where(a => a.Answer == 2 && a.Rating == 2).ToList();
                    if (devPriorityLogic6.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityLogic6.Count;
                        listDevPriority.AddRange(devPriorityLogic6.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 6,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId
                        }));

                    }
                }
                //Frequently-VeryImportant
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic7 = developmentPriorites.Where(a => a.Answer == 3 && a.Rating == 1).ToList();
                    if (devPriorityLogic7.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityLogic7.Count;
                        listDevPriority.AddRange(devPriorityLogic7.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 7,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId
                        }));

                    }
                }
                //Frequently-Important
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic8 = developmentPriorites.Where(a => a.Answer == 3 && a.Rating == 2).ToList();
                    if (devPriorityLogic8.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityLogic8.Count;
                        listDevPriority.AddRange(devPriorityLogic8.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 8,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId
                        }));

                    }
                }
                //Frequently-somewhatImportant
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic9 = developmentPriorites.Where(a => a.Answer == 3 && a.Rating == 3).ToList();
                    if (devPriorityLogic9.Count != 0)
                    {
                        //intialbucketCount = intialbucketCount + devPriorityLogic9.Count;
                        listDevPriority.AddRange(devPriorityLogic9.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 9,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId
                        }));

                    }
                }
                return listDevPriority;
            }
        }
        public List<DevelopmentPriorities> GetSelfFbResultByMappingId(int userid, int PoeId, int mappingId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var selfResultList = new List<DevelopmentPriorities>();
                var selfresult = context.GetSelfFBResultsTM(userid, PoeId, mappingId).ToList();
                if (selfresult.Count != 0)
                {
                    selfResultList.AddRange(selfresult.Select(result => new DevelopmentPriorities
                    {
                        QuestionId = result.QuestionId,
                        SelfResult = (int)result.Answer,
                        SelfCapability = (int)result.Capability
                    }));
                }
                return selfResultList;

            }
        }
        public List<DevelopmentPriorities> GetManagerDevPrioritiesByMappingIDs(int userid, int PoeId, int mappingId)
        {
            var previousDevPriority = GetPreviousManagerPriority(userid, PoeId, mappingId);
            var devPriorities = GetManagerDevPriorities(userid, PoeId, mappingId);
            var selffb = GetSelfFbResultByMappingId(userid, PoeId, mappingId);
            if (previousDevPriority.Count == 0)
            {
                if (devPriorities.Count != 0 && selffb.Count != 0)
                {
                    var devPrioritiesAll =
                        (from dev in devPriorities
                         join self in selffb on dev.QuestionId equals self.QuestionId
                         select new DevelopmentPriorities
                                    {
                                        Question = dev.Question,
                                        ManagerResult = dev.ManagerResult,
                                        SelfResult = self.SelfResult,
                                        QuestionId = dev.QuestionId,
                                        ModuleName = dev.ModuleName,
                                        Rating = dev.Rating,
                                        ModuleOrder = dev.ModuleOrder,
                                        ManagerCapability = dev.ManagerCapability,
                                        SelfCapability = self.SelfCapability,
                                        ManagerMappingId = dev.ManagerMappingId,
                                        CurrentFeedbackId = dev.CurrentFeedbackId
                                    }).ToList();
                    //.OrderBy(a => a.ModuleOrder).ToList();
                    UpdateDevelopmentPriorities(devPrioritiesAll, userid, PoeId, mappingId);
                    return devPrioritiesAll;

                }
                else if (devPriorities.Count != 0)
                {
                    UpdateDevelopmentPriorities(devPriorities, userid, PoeId, mappingId);
                    return devPriorities;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                if (previousDevPriority[0].CurrentFeedbackId != devPriorities[0].CurrentFeedbackId)
                {
                    var devpriorities = previousDevPriority.Union(devPriorities).GroupBy(a => a.QuestionId).Select(grp => grp.First()).ToList();
                    var developmentPrioritieses = devpriorities as List<DevelopmentPriorities> ?? devpriorities.ToList().GroupBy(a => a.QuestionId).Select(grp => grp.First()).ToList();
                    var devPrioritiesAll = developmentPrioritieses;
                    if (selffb.Count != 0)
                    {
                        devPrioritiesAll =
                           (from dev in developmentPrioritieses
                            join self in selffb on dev.QuestionId equals self.QuestionId
                            select new DevelopmentPriorities
                                       {
                                           Question = dev.Question,
                                           ManagerResult = dev.ManagerResult,
                                           SelfResult = self.SelfResult,
                                           QuestionId = dev.QuestionId,
                                           ModuleName = dev.ModuleName,
                                           Rating = dev.Rating,
                                           ModuleOrder = dev.ModuleOrder,
                                           ManagerCapability = dev.ManagerCapability,
                                           SelfCapability = self.SelfCapability,
                                           ManagerMappingId = dev.ManagerMappingId,
                                           CurrentFeedbackId = dev.CurrentFeedbackId
                                       }).ToList();
                    }
                    using (var context = DataContextFactory.GetIntelliSetDataContext())
                    {
                        var developmentPriorites = context.GetDevPrioritiesByTM(mappingId, userid, PoeId).ToList();
                        var devPrioritiesManager =
                       (from dev in devPrioritiesAll
                        join self in developmentPriorites on dev.QuestionId equals self.QuestionId
                        select new DevelopmentPriorities
                        {
                            Question = dev.Question,
                            ManagerResult = (int)self.Answer,
                            SelfResult = dev.SelfResult,
                            QuestionId = dev.QuestionId,
                            ModuleName = dev.ModuleName,
                            Rating = dev.Rating,
                            ModuleOrder = dev.ModuleOrder,
                            ManagerCapability = (int)self.Capability,
                            SelfCapability = dev.SelfCapability,
                            ManagerMappingId = dev.ManagerMappingId,
                            CurrentFeedbackId = self.FeedbackId
                        }).ToList();
                        UpdateDevelopmentPriorities(devPrioritiesManager, userid, PoeId, mappingId);
                        return devPrioritiesManager;
                    }

                }
                else
                {
                    if (selffb.Count != 0)
                    {
                        var devPrioritiesAll =
                            (from dev in previousDevPriority
                             join self in selffb on dev.QuestionId equals self.QuestionId
                             select new DevelopmentPriorities
                             {
                                 Question = dev.Question,
                                 ManagerResult = dev.ManagerResult,
                                 SelfResult = self.SelfResult,
                                 QuestionId = dev.QuestionId,
                                 ModuleName = dev.ModuleName,
                                 Rating = dev.Rating,
                                 ModuleOrder = dev.ModuleOrder,
                                 ManagerCapability = dev.ManagerCapability,
                                 SelfCapability = self.SelfCapability,
                                 ManagerMappingId = dev.ManagerMappingId,
                                 CurrentFeedbackId = dev.CurrentFeedbackId
                             }).ToList();
                        //.OrderBy(a => a.ModuleOrder).ToList();
                        return devPrioritiesAll;
                    }
                    //UpdateDevelopmentPriorities(devPrioritiesManager, userid, PoeId, mappingId);
                    return previousDevPriority;

                }
            }



        }
        public GoalDate GetSelfGoalDate(int userId, int poeId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var getdates = context.GetGoalDates(userId, poeId).ToList();
                var startdate = Convert.ToDateTime(
                    getdates.Where(a => a.DateMode == "StartDate").FirstOrDefault().Dates);
                var endDate = Convert.ToDateTime(
                    getdates.Where(a => a.DateMode == "EndDate").FirstOrDefault().Dates);
                TimeSpan totalDayes = endDate - startdate;
                TimeSpan remainingDays = endDate - DateTime.Now;
                var completedDays = Convert.ToInt32(totalDayes.TotalDays) - Convert.ToInt32(remainingDays.TotalDays);
                // decimal overallPercentage = ((completedDays)/(Convert.ToInt32(totalDayes.TotalDays)))*100;
                var goaldatesList = new GoalDate()
                {
                    StartDate = startdate.ToString("dd.MM.yyy"),
                    EndDate = endDate.ToString("dd.MM.yyy"),
                    RemainingDays = Convert.ToInt32(remainingDays.TotalDays),
                    CompletedDays = completedDays,
                    OverallScore = Convert.ToInt32(totalDayes.TotalDays)

                };
                return goaldatesList;
            }
        }
        public GoalDate GetTeamGoalDate(int userId, int poeId, int tmid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var getdates = context.GetTMGoalDates(userId, poeId, tmid).ToList();
                var startdate = Convert.ToDateTime(
                    getdates.Where(a => a.DateMode == "StartDate").FirstOrDefault().Dates);
                var endDate = Convert.ToDateTime(
                    getdates.Where(a => a.DateMode == "EndDate").FirstOrDefault().Dates);
                TimeSpan totalDayes = endDate - startdate;
                TimeSpan remainingDays = endDate - DateTime.Now;
                var completedDays = Convert.ToInt32(totalDayes.TotalDays) - Convert.ToInt32(remainingDays.TotalDays);
                // decimal overallPercentage = ((completedDays)/(Convert.ToInt32(totalDayes.TotalDays)))*100;
                var goaldatesList = new GoalDate()
                {
                    StartDate = startdate.ToString("dd.MM.yyy"),
                    EndDate = endDate.ToString("dd.MM.yyy"),
                    RemainingDays = Convert.ToInt32(remainingDays.TotalDays),
                    CompletedDays = completedDays,
                    OverallScore = Convert.ToInt32(totalDayes.TotalDays)

                };
                return goaldatesList;
            }
        }
        public void UpdateGoalDate(int tmid, DateTime goaldate, int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.UpdateGoalDatesForTM(tmid, goaldate);
                
            }
        }
        public void SendEmailUpdated(DateTime goaldate, int userid)
        {
            // Log("WCF-SendEmail-IN");
            try
            {
                Common.Common Common=new Common.Common();
                var user = Common.GetUserDetailsByMappingId(userid);
                string _from = ConfigurationManager.AppSettings["fromEmail"];
                string emailServer = ConfigurationManager.AppSettings["mailServer"];
                string _userId = ConfigurationManager.AppSettings["emailUserId"];
                string _pwd = ConfigurationManager.AppSettings["emailPassword"];
                string _bcc = ConfigurationManager.AppSettings["bccEmail"];
                string _to = ConfigurationManager.AppSettings["mailTo1"];

                if (_to.Trim() == string.Empty)
                {
                    _to = user.User.EmailAddress;
                }
                var subject = "Coaching Date";
                var content = "";
                MailMessage objEmail = new MailMessage(_from, _to, subject, content);

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
            //Log("WCF-SendEmail-OUT");
        }
        public List<v4_GetGoalssharedbyuserResult> GetGoalsShared(int userid, int foruserid, int PoeId, int subid, string domain)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var netid = GetYouFbidString(PoeId, userid.ToString(CultureInfo.InvariantCulture), subid, 2, domain);
                return context.GetGoalssharedbyuser(userid, foruserid, netid, PoeId).ToList();
            }
        }
        public List<DevelopmentPriorities> GetSelfDevPriorities(int userid, int PoeId)
        {
            var getprevPriority = GetPreviousSelfPriority(userid, PoeId);
            var devPriorities = GetCurrentDevPriorities(userid, PoeId);
            var selffb = GetSelfFbResult(userid, PoeId);
            if (getprevPriority.Count == 0)
            {
                if (devPriorities.Count != 0 && selffb.Count != 0)
                {
                    var devPrioritiesAll =
                        (from dev in devPriorities
                         join self in selffb on dev.QuestionId equals self.QuestionId
                         select new DevelopmentPriorities
                                    {
                                        Question = dev.Question,
                                        ManagerResult = dev.ManagerResult,
                                        SelfResult = self.SelfResult,
                                        QuestionId = dev.QuestionId,
                                        ModuleName = dev.ModuleName,
                                        Rating = dev.Rating,
                                        ModuleOrder = dev.ModuleOrder,
                                        SelfCapability = self.SelfCapability,
                                        ManagerCapability = dev.ManagerCapability,
                                        ManagerMappingId = dev.ManagerMappingId,
                                        CurrentFeedbackId = dev.CurrentFeedbackId,
                                        TeamId = dev.TeamId
                                    }).ToList();
                    UpdateDevelopmentPrioritiesSelf(devPrioritiesAll, userid, PoeId);
                    return devPrioritiesAll;
                }
                else if (devPriorities.Count != 0)
                {
                    UpdateDevelopmentPrioritiesSelf(devPriorities, userid, PoeId);
                    return devPriorities;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                if (getprevPriority[0].CurrentFeedbackId != devPriorities[0].CurrentFeedbackId)
                {
                    var devpriorities = getprevPriority.Union(devPriorities).GroupBy(a => a.QuestionId).Select(grp => grp.First()).ToList();
                    var developmentPrioritieses = devpriorities as List<DevelopmentPriorities> ?? devpriorities.ToList().GroupBy(a => a.QuestionId).Select(grp => grp.First()).ToList();
                    var devPrioritiesAll = developmentPrioritieses;
                    if (selffb.Count != 0)
                    {
                        devPrioritiesAll =
                           (from dev in developmentPrioritieses
                            join self in selffb on dev.QuestionId equals self.QuestionId
                            select new DevelopmentPriorities
                            {
                                Question = dev.Question,
                                ManagerResult = dev.ManagerResult,
                                SelfResult = self.SelfResult,
                                QuestionId = dev.QuestionId,
                                ModuleName = dev.ModuleName,
                                Rating = dev.Rating,
                                ModuleOrder = dev.ModuleOrder,
                                ManagerCapability = dev.ManagerCapability,
                                SelfCapability = self.SelfCapability,
                                ManagerMappingId = dev.ManagerMappingId,
                                CurrentFeedbackId = dev.CurrentFeedbackId,
                                TeamId = dev.TeamId
                            }).ToList();
                    }
                    using (var context = DataContextFactory.GetIntelliSetDataContext())
                    {
                        var developmentPriorites = context.GetCurrentUserDevPriorities(userid, PoeId).ToList();
                        var devPrioritiesManager =
                       (from dev in devPrioritiesAll
                        join self in developmentPriorites on dev.QuestionId equals self.QuestionId
                        select new DevelopmentPriorities
                        {
                            Question = dev.Question,
                            ManagerResult = (int)self.Answer,
                            SelfResult = dev.SelfResult,
                            QuestionId = dev.QuestionId,
                            ModuleName = dev.ModuleName,
                            Rating = dev.Rating,
                            ModuleOrder = dev.ModuleOrder,
                            ManagerCapability = (int)self.Capability,
                            SelfCapability = dev.SelfCapability,
                            ManagerMappingId = dev.ManagerMappingId,
                            CurrentFeedbackId = self.FeedbackId,
                            TeamId = dev.TeamId
                        }).ToList();
                        UpdateDevelopmentPrioritiesSelf(devPrioritiesManager, userid, PoeId);
                        return devPrioritiesManager;
                    }
                }
                else
                {
                    if (selffb.Count != 0)
                    {
                        var devPrioritiesAll =
                            (from dev in getprevPriority
                             join self in selffb on dev.QuestionId equals self.QuestionId
                             select new DevelopmentPriorities
                             {
                                 Question = dev.Question,
                                 ManagerResult = dev.ManagerResult,
                                 SelfResult = self.SelfResult,
                                 QuestionId = dev.QuestionId,
                                 ModuleName = dev.ModuleName,
                                 Rating = dev.Rating,
                                 ModuleOrder = dev.ModuleOrder,
                                 ManagerCapability = dev.ManagerCapability,
                                 SelfCapability = self.SelfCapability,
                                 ManagerMappingId = dev.ManagerMappingId,
                                 CurrentFeedbackId = dev.CurrentFeedbackId,
                                 TeamId = dev.TeamId
                             }).ToList();
                        //.OrderBy(a => a.ModuleOrder).ToList();
                        return devPrioritiesAll;
                    }
                    //UpdateDevelopmentPriorities(devPrioritiesManager, userid, PoeId, mappingId);
                    return getprevPriority;
                }
            }



        }

        public List<DevelopmentPriorities> GetCurrentDevPriorities(int userid, int PoeId)
        {
            int devPriorityCount = int.Parse(ConfigurationManager.AppSettings["devPriorityCount"]);
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var developmentPriorites = context.GetCurrentUserDevPriorities(userid, PoeId).ToList();
                var devPrioVeryImportant = developmentPriorites.Where(a => a.Answer == 1 && a.Rating == 4).ToList();
                var intialbucketCount = devPrioVeryImportant.Count;
                var listDevPriority = new List<DevelopmentPriorities>();
                if (intialbucketCount != 0)
                {
                    listDevPriority.AddRange(devPrioVeryImportant.Select(eachPriority => new DevelopmentPriorities
                                                                                             {
                                                                                                 ManagerResult = (int)eachPriority.Answer,
                                                                                                 QuestionId = eachPriority.QuestionId,
                                                                                                 Rating = (int)eachPriority.Rating,
                                                                                                 Question = eachPriority.ShortQuestion,
                                                                                                 ModuleName = eachPriority.ModuleName,
                                                                                                 ModuleOrder = eachPriority.ModuleOrder,
                                                                                                 ManagerCapability = (int)eachPriority.Capability,
                                                                                                 Bucketorder = 1,
                                                                                                 CurrentFeedbackId = eachPriority.FeedbackId,
                                                                                                 ManagerMappingId = (int)eachPriority.ManagerId,
                                                                                                 TeamId = (int)eachPriority.TeamId
                                                                                             }));
                }
                //Rarely-Important
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityImportant = developmentPriorites.Where(a => a.Answer == 1 && a.Rating == 3).ToList();
                    if (devPriorityImportant.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityImportant.Count;
                        listDevPriority.AddRange(devPriorityImportant.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 2,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId,
                            TeamId = (int)eachPriority.TeamId
                        }));

                    }
                }
                //Inconsistently-veryImportant
                if (devPriorityCount > intialbucketCount)
                {
                    var devPrioritySomeImportant = developmentPriorites.Where(a => a.Answer == 2 && a.Rating == 4).ToList();
                    if (devPrioritySomeImportant.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPrioritySomeImportant.Count;
                        listDevPriority.AddRange(devPrioritySomeImportant.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 3,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId,
                            TeamId = (int)eachPriority.TeamId
                        }));

                    }
                }
                //rarely-SomewhatImportant
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic4 = developmentPriorites.Where(a => a.Answer == 1 && a.Rating == 2).ToList();
                    if (devPriorityLogic4.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityLogic4.Count;
                        listDevPriority.AddRange(devPriorityLogic4.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 4,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId,
                            TeamId = (int)eachPriority.TeamId
                        }));

                    }
                }
                //inconsistently-Important
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic5 = developmentPriorites.Where(a => a.Answer == 2 && a.Rating == 3).ToList();
                    if (devPriorityLogic5.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityLogic5.Count;
                        listDevPriority.AddRange(devPriorityLogic5.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 5,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId,
                            TeamId = (int)eachPriority.TeamId
                        }));

                    }
                }
                //inconsistently-somewhatImportant
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic6 = developmentPriorites.Where(a => a.Answer == 2 && a.Rating == 2).ToList();
                    if (devPriorityLogic6.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityLogic6.Count;
                        listDevPriority.AddRange(devPriorityLogic6.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 6,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId,
                            TeamId = (int)eachPriority.TeamId
                        }));

                    }
                }
                //Frequently-VeryImportant
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic7 = developmentPriorites.Where(a => a.Answer == 3 && a.Rating == 1).ToList();
                    if (devPriorityLogic7.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityLogic7.Count;
                        listDevPriority.AddRange(devPriorityLogic7.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 7,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId,
                            TeamId = (int)eachPriority.TeamId
                        }));

                    }
                }
                //Frequently-Important
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic8 = developmentPriorites.Where(a => a.Answer == 3 && a.Rating == 2).ToList();
                    if (devPriorityLogic8.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityLogic8.Count;
                        listDevPriority.AddRange(devPriorityLogic8.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 8,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId,
                            TeamId = (int)eachPriority.TeamId
                        }));

                    }
                }
                //Frequently-somewhatImportant
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic9 = developmentPriorites.Where(a => a.Answer == 3 && a.Rating == 3).ToList();
                    if (devPriorityLogic9.Count != 0)
                    {
                        //intialbucketCount = intialbucketCount + devPriorityLogic9.Count;
                        listDevPriority.AddRange(devPriorityLogic9.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 9,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId,
                            TeamId = (int)eachPriority.TeamId
                        }));

                    }
                }
                return listDevPriority;
            }

        }
        public List<DevelopmentPriorities> GetManagerDevPrioritiesById(int userid, int PoeId, int mgrid)
        {
            int devPriorityCount = int.Parse(ConfigurationManager.AppSettings["devPriorityCount"]);
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var developmentPriorites = context.GetDevPrioritiesByManager(userid, PoeId, mgrid).ToList();
                var devPrioVeryImportant = developmentPriorites.Where(a => a.Answer == 1 && a.Rating == 4).ToList();
                var intialbucketCount = devPrioVeryImportant.Count;
                var listDevPriority = new List<DevelopmentPriorities>();
                if (intialbucketCount != 0)
                {
                    listDevPriority.AddRange(devPrioVeryImportant.Select(eachPriority => new DevelopmentPriorities
                    {
                        ManagerResult = (int)eachPriority.Answer,
                        QuestionId = eachPriority.QuestionId,
                        Rating = (int)eachPriority.Rating,
                        Question = eachPriority.ShortQuestion,
                        ModuleName = eachPriority.ModuleName,
                        ModuleOrder = eachPriority.ModuleOrder,
                        ManagerCapability = (int)eachPriority.Capability,
                        Bucketorder = 1,
                        CurrentFeedbackId = eachPriority.FeedbackId,
                        ManagerMappingId = (int)eachPriority.ManagerId,
                        TeamId = (int)eachPriority.TeamId
                    }));
                }
                //Rarely-Important
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityImportant = developmentPriorites.Where(a => a.Answer == 1 && a.Rating == 3).ToList();
                    if (devPriorityImportant.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityImportant.Count;
                        listDevPriority.AddRange(devPriorityImportant.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 2,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId,
                            TeamId = (int)eachPriority.TeamId
                        }));

                    }
                }
                //Inconsistently-veryImportant
                if (devPriorityCount > intialbucketCount)
                {
                    var devPrioritySomeImportant = developmentPriorites.Where(a => a.Answer == 2 && a.Rating == 4).ToList();
                    if (devPrioritySomeImportant.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPrioritySomeImportant.Count;
                        listDevPriority.AddRange(devPrioritySomeImportant.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 3,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId,
                            TeamId = (int)eachPriority.TeamId
                        }));

                    }
                }
                //rarely-SomewhatImportant
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic4 = developmentPriorites.Where(a => a.Answer == 1 && a.Rating == 2).ToList();
                    if (devPriorityLogic4.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityLogic4.Count;
                        listDevPriority.AddRange(devPriorityLogic4.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 4,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId,
                            TeamId = (int)eachPriority.TeamId
                        }));

                    }
                }
                //inconsistently-Important
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic5 = developmentPriorites.Where(a => a.Answer == 2 && a.Rating == 3).ToList();
                    if (devPriorityLogic5.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityLogic5.Count;
                        listDevPriority.AddRange(devPriorityLogic5.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 5,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId,
                            TeamId = (int)eachPriority.TeamId
                        }));

                    }
                }
                //inconsistently-somewhatImportant
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic6 = developmentPriorites.Where(a => a.Answer == 2 && a.Rating == 2).ToList();
                    if (devPriorityLogic6.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityLogic6.Count;
                        listDevPriority.AddRange(devPriorityLogic6.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 6,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId,
                            TeamId = (int)eachPriority.TeamId
                        }));

                    }
                }
                //Frequently-VeryImportant
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic7 = developmentPriorites.Where(a => a.Answer == 3 && a.Rating == 1).ToList();
                    if (devPriorityLogic7.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityLogic7.Count;
                        listDevPriority.AddRange(devPriorityLogic7.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 7,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId,
                            TeamId = (int)eachPriority.TeamId
                        }));

                    }
                }
                //Frequently-Important
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic8 = developmentPriorites.Where(a => a.Answer == 3 && a.Rating == 2).ToList();
                    if (devPriorityLogic8.Count != 0)
                    {
                        intialbucketCount = intialbucketCount + devPriorityLogic8.Count;
                        listDevPriority.AddRange(devPriorityLogic8.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 8,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId,
                            TeamId = (int)eachPriority.TeamId
                        }));

                    }
                }
                //Frequently-somewhatImportant
                if (devPriorityCount > intialbucketCount)
                {
                    var devPriorityLogic9 = developmentPriorites.Where(a => a.Answer == 3 && a.Rating == 3).ToList();
                    if (devPriorityLogic9.Count != 0)
                    {
                        //intialbucketCount = intialbucketCount + devPriorityLogic9.Count;
                        listDevPriority.AddRange(devPriorityLogic9.Select(eachPriority => new DevelopmentPriorities
                        {
                            ManagerResult = (int)eachPriority.Answer,
                            QuestionId = eachPriority.QuestionId,
                            Rating = (int)eachPriority.Rating,
                            Question = eachPriority.ShortQuestion,
                            ModuleName = eachPriority.ModuleName,
                            ModuleOrder = eachPriority.ModuleOrder,
                            ManagerCapability = (int)eachPriority.Capability,
                            Bucketorder = 9,
                            CurrentFeedbackId = eachPriority.FeedbackId,
                            ManagerMappingId = (int)eachPriority.ManagerId,
                            TeamId = (int)eachPriority.TeamId
                        }));

                    }
                }
                return listDevPriority;
            }

        }
        public List<DevelopmentPriorities> GetSelfFbResult(int userid, int PoeId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var selfResultList = new List<DevelopmentPriorities>();
                var selfresult = context.GetSelfFBResults(userid, PoeId).ToList();
                if (selfresult.Count != 0)
                {
                    selfResultList.AddRange(selfresult.Select(result => new DevelopmentPriorities
                                                                            {
                                                                                QuestionId = result.QuestionId,
                                                                                SelfResult = (int)result.Answer,
                                                                                SelfCapability = (int)result.Capability
                                                                            }));
                }
                return selfResultList;

            }
        }
        public List<Results> GetManagerCurrentFB(int userid, int poeId, int mgrId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var managerFb = context.GetDevManagerCurrentFb(userid, poeId, mgrId).ToList();
                if (managerFb.Count != 0)
                {
                    return managerFb.Select(fb => new Results
                                                      {
                                                          CurrrentResult = (int)fb.Answer,
                                                          ModuleOrder = fb.ModuleOrder,
                                                          ModuleName = fb.ModuleName,
                                                          QuestionId = fb.QuestionId,
                                                          Question = fb.SideBarText,
                                                          ModuleId = fb.POEModuleId
                                                      }).ToList();
                }
                return null;
            }
        }
        public List<Results> GetManagerPrevFB(int userid, int poeId, int mgrId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var managerFb = context.GetDevManagerPrevFb(userid, poeId, mgrId).ToList();
                if (managerFb.Count != 0)
                {
                    return managerFb.Select(fb => new Results
                    {
                        PreviousResult = (int)fb.Answer,
                        ModuleOrder = fb.ModuleOrder,
                        ModuleName = fb.ModuleName,
                        QuestionId = fb.QuestionId,
                        Question = fb.SideBarText,
                        ModuleId = fb.POEModuleId
                    }).ToList();
                }
                return null;
            }
        }
        public List<Results> GetTeamCurrentFB(int userid, int poeId, int tmid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var teamfb = context.GetDevTeamCurrentFb(userid, poeId, tmid).ToList();
                if (teamfb.Count != 0)
                {
                    return teamfb.Select(fb => new Results
                    {
                        CurrrentResult = (int)fb.Answer,
                        ModuleOrder = fb.ModuleOrder,
                        ModuleName = fb.ModuleName,
                        QuestionId = fb.QuestionId,
                        Question = fb.SideBarText,
                        ModuleId = fb.POEModuleId
                    }).ToList();
                }
                return null;
            }
        }
        public List<Results> GetTeamPrevFB(int userid, int poeId, int tmid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var teamfb = context.GetDevTeamPrevFb(userid, poeId, tmid).ToList();
                if (teamfb.Count != 0)
                {
                    return teamfb.Select(fb => new Results
                    {
                        PreviousResult = (int)fb.Answer,
                        ModuleOrder = fb.ModuleOrder,
                        ModuleName = fb.ModuleName,
                        QuestionId = fb.QuestionId,
                        Question = fb.SideBarText,
                        ModuleId = fb.POEModuleId
                    }).ToList();
                }
                return null;
            }
        }
        public List<Results> GetTeamDevProgress(int userid, int poeId, int tmid)
        {
            var devPriorities = GetManagerDevPrioritiesByMappingIDs(userid, poeId, tmid);
            if (devPriorities != null)
            {
                var currentFb = GetTeamCurrentFB(userid, poeId, tmid);
                var previousFb = GetTeamPrevFB(userid, poeId, tmid);
                foreach (var priority in devPriorities)
                {
                    var fbresult = currentFb.FirstOrDefault(a => a.QuestionId == priority.QuestionId);
                    fbresult.IsDevelopmentPriorities = true;
                }
                if (previousFb != null)
                {
                    foreach (var resultPrev in previousFb)
                    {
                        var fbresult = currentFb.FirstOrDefault(a => a.QuestionId == resultPrev.QuestionId);
                        fbresult.PreviousResult = resultPrev.PreviousResult;
                    }
                }
                return currentFb;
            }
            return null;
        }
        public List<Results> GetManagerDevProgress(int userid, int poeId, int tmid)
        {
            var devPriorities = GetDevPrioritiesByMappingIDs(userid, poeId, tmid);
            if (devPriorities != null)
            {
                var currentFb = GetManagerCurrentFB(userid, poeId, tmid);
                var previousFb = GetManagerPrevFB(userid, poeId, tmid);
                foreach (var priority in devPriorities)
                {
                    var fbresult = currentFb.FirstOrDefault(a => a.QuestionId == priority.QuestionId);
                    fbresult.IsDevelopmentPriorities = true;
                }
                if (previousFb != null)
                {
                    foreach (var resultPrev in previousFb)
                    {
                        var fbresult = currentFb.FirstOrDefault(a => a.QuestionId == resultPrev.QuestionId);
                        fbresult.PreviousResult = resultPrev.PreviousResult;
                    }
                }
                return currentFb;
            }
            return null;
        }
        public void UpdateDevelopmentPriorities(List<DevelopmentPriorities> getDevPriorities, int userId, int PoeId, int tmmappingId)
        {
            //var getDevPriorities = GetManagerDevPriorities(userId, PoeId, tmmappingId);
            var devlopmentPriorities = new XElement("DevlopmentPriorities");
            foreach (var ele in getDevPriorities.Select(t => new XElement("DevlopmentPriority", new XElement("FeedbackFrom", t.ManagerMappingId),
                                                                              new XElement("FeedbackFor", tmmappingId),
                                                                              new XElement("Questionid", t.QuestionId),
                                                                              new XElement("PriorityOrder", t.Bucketorder),
                                                                              new XElement("ManagerResult", t.ManagerResult),
                                                                              new XElement("CurrentFeedbackId", t.CurrentFeedbackId),
                                                                              new XElement("Active", true),
                                                                              new XElement("UpdatedOn", DateTime.Now),
                                                                              new XElement("CapabilityResult", t.ManagerCapability))))
            {
                devlopmentPriorities.Add(ele);
            }
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.DevPrioritiesbulkImport(devlopmentPriorities.ToString(), getDevPriorities[0].ManagerMappingId, tmmappingId);
            }
        }
        public void UpdateDevelopmentPrioritiesSelf(List<DevelopmentPriorities> getDevPriorities, int userId, int PoeId)
        {
            //var getDevPriorities = GetManagerDevPriorities(userId, PoeId, tmmappingId);
            var devlopmentPriorities = new XElement("DevlopmentPriorities");
            foreach (var ele in getDevPriorities.Select(t => new XElement("DevlopmentPriority", new XElement("FeedbackFrom", t.ManagerMappingId),
                                                                              new XElement("FeedbackFor", t.TeamId),
                                                                              new XElement("Questionid", t.QuestionId),
                                                                              new XElement("PriorityOrder", t.Bucketorder),
                                                                              new XElement("ManagerResult", t.ManagerResult),
                                                                              new XElement("CurrentFeedbackId", t.CurrentFeedbackId),
                                                                              new XElement("Active", true),
                                                                              new XElement("UpdatedOn", DateTime.Now),
                                                                              new XElement("CapabilityResult", t.ManagerCapability))))
            {
                devlopmentPriorities.Add(ele);
            }
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.DevPrioritiesbulkImportSelf(devlopmentPriorities.ToString(), getDevPriorities[0].ManagerMappingId, userId, PoeId);
            }
        }
        public List<DevelopmentPriorities> GetPreviousManagerPriority(int userid, int PoeId, int mappingid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var prevDevPriorities = context.GetDevPrioritiesByTMUpdated(mappingid, userid, PoeId);
                return prevDevPriorities.Select(priority => new DevelopmentPriorities
                                                                {
                                                                    Bucketorder = (int)priority.PriorityOrder,
                                                                    QuestionId = (int)priority.Questionid,
                                                                    ManagerCapability = (int)priority.CapabilityResult,
                                                                    ManagerResult = (int)priority.ManagerResult,
                                                                    ModuleOrder = priority.ModuleOrder,
                                                                    ModuleName = priority.ModuleName,
                                                                    Question = priority.SideBarText,
                                                                    CurrentFeedbackId = (int)priority.CurrentFeedbackId,
                                                                    ManagerMappingId = (int)priority.FeedbackFrom
                                                                }).ToList();
            }
        }
        public List<DevelopmentPriorities> GetPreviousSelfPriority(int userid, int PoeId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var prevDevPriorities = context.GetCurrentUserDevPrioritiesUpdated(userid, PoeId);
                return prevDevPriorities.Select(priority => new DevelopmentPriorities
                {
                    Bucketorder = (int)priority.PriorityOrder,
                    QuestionId = (int)priority.Questionid,
                    ManagerCapability = (int)priority.CapabilityResult,
                    ManagerResult = (int)priority.ManagerResult,
                    ModuleOrder = priority.ModuleOrder,
                    ModuleName = priority.ModuleName,
                    Question = priority.SideBarText,
                    CurrentFeedbackId = (int)priority.CurrentFeedbackId,
                    ManagerMappingId = (int)priority.FeedbackFrom,
                    TeamId = (int)priority.TeamId,
                }).ToList();
            }
        }
        public List<DevelopmentPriorities> GetPreviousManagerIdPriority(int userid, int PoeId, int mappingid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var prevDevPriorities = context.GetDevPrioritiesByManagerIdUpdated(mappingid, userid, PoeId);
                return prevDevPriorities.Select(priority => new DevelopmentPriorities
                {
                    Bucketorder = (int)priority.PriorityOrder,
                    QuestionId = (int)priority.Questionid,
                    ManagerCapability = (int)priority.CapabilityResult,
                    ManagerResult = (int)priority.ManagerResult,
                    ModuleOrder = priority.ModuleOrder,
                    ModuleName = priority.ModuleName,
                    Question = priority.SideBarText,
                    CurrentFeedbackId = (int)priority.CurrentFeedbackId,
                    ManagerMappingId = (int)priority.FeedbackFrom
                }).ToList();
            }
        }
        public List<DevelopmentPriorities> GetDevPrioritiesByMappingIDs(int userid, int PoeId, int mappingId)
        {
            var previousDevPriority = GetPreviousManagerIdPriority(userid, PoeId, mappingId);
            var devPriorities = GetManagerDevPrioritiesById(userid, PoeId, mappingId);
            //var selffb = GetSelfFbResultByMappingId(userid, PoeId, mappingId);
            if (previousDevPriority.Count == 0)
            {
                if (devPriorities.Count != 0)
                {
                    UpdateDevelopmentPrioritiesSelf(devPriorities, userid, PoeId);
                    return devPriorities;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                if (previousDevPriority[0].CurrentFeedbackId != devPriorities[0].CurrentFeedbackId)
                {
                    var devpriorities = previousDevPriority.Union(devPriorities).GroupBy(a => a.QuestionId).Select(grp => grp.First()).ToList();
                    var developmentPrioritieses = devpriorities as List<DevelopmentPriorities> ?? devpriorities.ToList().GroupBy(a => a.QuestionId).Select(grp => grp.First()).ToList();
                    var devPrioritiesAll = developmentPrioritieses;
                    using (var context = DataContextFactory.GetIntelliSetDataContext())
                    {
                        var developmentPriorites = context.GetDevPrioritiesByManager(mappingId, userid, PoeId).ToList();
                        var devPrioritiesManager =
                       (from dev in devPrioritiesAll
                        join self in developmentPriorites on dev.QuestionId equals self.QuestionId
                        select new DevelopmentPriorities
                        {
                            Question = dev.Question,
                            ManagerResult = (int)self.Answer,
                            SelfResult = dev.SelfResult,
                            QuestionId = dev.QuestionId,
                            ModuleName = dev.ModuleName,
                            Rating = dev.Rating,
                            ModuleOrder = dev.ModuleOrder,
                            ManagerCapability = (int)self.Capability,
                            SelfCapability = dev.SelfCapability,
                            ManagerMappingId = dev.ManagerMappingId,
                            CurrentFeedbackId = self.FeedbackId
                        }).ToList();
                        UpdateDevelopmentPrioritiesSelf(devPrioritiesManager, userid, PoeId);
                        return devPrioritiesManager;
                    }

                }
                else
                {
                   return previousDevPriority;

                }
            }



        }
    }
}




