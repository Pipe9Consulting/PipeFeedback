using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using bExcellent.Service.BusinessLogic.POE;
using bExcellent.Service.BusinessLogic.UserAdmin;
using bExcellent.Service.DataAccess;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Enumeration;
using bExcellent.Service.Util.Response;

namespace bExcellent.Service.BusinessLogic.Standing
{
    public class StandingDataAccess
    {
        #region Private Member

        private static DataContextFactory _factory;

        #endregion Private Member

        #region Private Property

        /// <summary>
        /// Gets the data context factory.
        /// </summary>
        private static DataContextFactory DataContextFactory
        {
            get { return _factory ?? (_factory = new DataContextFactory()); }
        }

        #endregion Private Property

        public List<UserRole> GetUserRoles(int userid, int subid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetUserRoleList(userid, subid).ToList().SelectMany((a, b) => new List<UserRole>
                    {
                        new UserRole
                            {
                                RoleId = a.DesignationId,
                                RoleText =a.Jobtile
                            }
                    }).ToList();
            }
        }

        public List<Util.Domain.POE> GetUserPoeByRole(int userid, int subid, int role)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return
                    context.GetUserPoeByRole(userid, subid, role).Distinct().ToList().SelectMany(
                        (a, b) => new List<Util.Domain.POE>
                            {
                                new Util.Domain.POE
                                    {
                                        POEId = a.POEId,
                                        Name = a.Name
                                    }
                            }).ToList();
            }
        }
        public List<Util.Domain.POE> GetUserPoeByRoleUpdated(int userid, int role)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return
                    context.V4_GetUserPoeByRole(userid, role).Distinct().ToList().SelectMany(
                        (a, b) => new List<Util.Domain.POE>
                            {
                                new Util.Domain.POE
                                    {
                                        POEId = (int) a.POEId,
                                        Name = a.Name
                                    }
                            }).ToList();
            }
        }
        public List<Util.Domain.POE> GetUserPoeManagerRole(int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return
                    context.GetUserManagerProfile(userid).Distinct().ToList().SelectMany(
                        (a, b) => new List<Util.Domain.POE>
                            {
                                new Util.Domain.POE
                                    {
                                        POEId = (int) a.POEId,
                                        Name = a.Name
                                    }
                            }).ToList();
            }
        }
        public List<Util.Domain.POE> GetUserPoeTeamRole(int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return
                    context.GetUserTeamProfile(userid).Distinct().ToList().SelectMany(
                        (a, b) => new List<Util.Domain.POE>
                            {
                                new Util.Domain.POE
                                    {
                                        POEId = (int) a.POEId,
                                        Name = a.Name
                                    }
                            }).ToList();
            }
        }
        public string GetTopNextFbidString(int poeid, string domain, int type)
        {
            var fbids = string.Empty;
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var returnvalue = context.GetTopAndNextInLine(poeid, domain, type).ToList();

                if (returnvalue.Count != 0)
                {
                    fbids = returnvalue.Aggregate(fbids, (current, fblist) => current + fblist.fbid + ",");
                }
            }
            if (!string.IsNullOrEmpty(fbids))
            {
                return fbids.Substring(fbids.Length - 1, 1) == "," ? fbids.Substring(0, fbids.Length - 1) : fbids;
            }
            return "0";
        }

        public string GetRestFbidString(int poeid, string userid, string domain, int type)
        {
            var fbids = string.Empty;
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var returnvalue = context.GetRestFbids(poeid, domain, type, userid).ToList();

                if (returnvalue.Count != 0)
                {
                    fbids = returnvalue.Aggregate(fbids, (current, fblist) => current + fblist.POEFeedbackId + ",");
                }
            }
            if (!string.IsNullOrEmpty(fbids))
            {
                return fbids.Substring(fbids.Length - 1, 1) == "," ? fbids.Substring(0, fbids.Length - 1) : fbids;
            }
            return "0";
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

        public Util.Response.Standing GetStandingTileScore(int poeid, int userid, int subid, string domain)
        {
            var you = GetYouFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), subid, 1, domain);
            var manager = GetYouFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), subid, 2, domain);
            var teammeber = GetYouFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), subid, 3, domain);
            var skpManager = GetYouFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), subid, 4, domain);
            var customerPartner = GetYouFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), subid, 5, domain);
            var peerManager = GetYouFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), subid, 6, domain);
            var peerTeammember = GetYouFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), subid, 7, domain);
            var youStand = GetAvgStandingScore(you, poeid);
            var managerStand = GetAvgStandingScore(manager, poeid);

            var standingdata = new Util.Response.Standing
            {
                You = youStand,
                Previous = managerStand,
                TeamMember = GetAvgStandingScore(teammeber, poeid),
                SkipLevelmanager = GetAvgStandingScore(skpManager, poeid),
                CustomerPartner = GetAvgStandingScore(customerPartner, poeid),
                PeerManager = GetAvgStandingScore(peerManager, poeid),
                PeerTeamMember = GetAvgStandingScore(peerTeammember, poeid),
            };
            return standingdata;
        }

        public Util.Response.Standing GetStanding(int poeid, int userid, int tileclicked, int subid, string domain)
        {
            int type;
            switch (tileclicked)
            {
                case 1:
                case 2:
                case 4:
                case 5:
                case 7:
                case 6:
                    type = 1;
                    break;

                case 3:

                    type = 2;
                    break;

                default:
                    type = 1;
                    break;
            }
            var you = GetYouFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), subid, tileclicked, domain);
            var previous = GetPrevFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), subid, tileclicked, domain);
            var top = GetTopNextFbidString(poeid, domain, 1);
            var nextinline = GetTopNextFbidString(poeid, domain, 2);
            var rest = GetRestFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), domain, type);
            var youStand = GetAvgStandingScore(you, poeid);
            var previousStand = GetAvgStandingScore(previous, poeid);
            var topPerformerStand = GetAvgStandingScore(top, poeid);
            var restofCommunityStand = GetAvgStandingScore(rest, poeid);
            var nextinLineStand = GetAvgStandingScore(nextinline, poeid);
            var standingdata = new Util.Response.Standing
                {
                    You = youStand,
                    NextinLine = nextinLineStand,
                    Previous = previousStand,
                    RestofCommunity = restofCommunityStand,
                    TopPerformer = topPerformerStand
                };
            return standingdata;
        }

        public StandingScore GetAvgStandingScore(string feedbackid, int poeId,int userid = 0)
        {
            double c1 = 0;
            double c2 = 0;
            double wcsiscore = 0;
            var splitcount = feedbackid.Split(',').Distinct().Count();

            var wcsi = GetAvgWcsiScore(feedbackid);
            if (wcsi.Count != 0)
            {
                c1 = wcsi[0].ci1.GetValueOrDefault(0) / splitcount;
                c2 = wcsi[0].ci2.GetValueOrDefault(0) / splitcount;
                wcsiscore = wcsi[0].wcsi.GetValueOrDefault(0) / splitcount;
            }
            return new StandingScore
            {
                Childindex1Score = (Math.Round(c1, MidpointRounding.AwayFromZero)) * 2,
                Childindex2Score = (Math.Round(c2, MidpointRounding.AwayFromZero)) * 2,
                WcsiScore = Math.Round(wcsiscore, MidpointRounding.AwayFromZero),
                ModuleScores = GetAvgModuleAverage(feedbackid, poeId,userid)
            };
        }

        public List<V3_GetStandingAvgWCSIScoreResult> GetAvgWcsiScore(string fbid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetStandingAvgWCSIScore(fbid).ToList();
            }
        }

        public List<ModuleScore> GetAvgModuleAverage(string fbid, int poeId,int userid =0)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetAvgModuleAverage(fbid, poeId).ToList().SelectMany(
                (a, b) => new List<ModuleScore>
                                            {
                                                new ModuleScore
                                                    {
                                                        ModuleName = a.ModuleName,
                                                        Moduleid = Convert.ToInt32(a.POEModuleId),
                                                        TotalModuleScore =(a.ModuleWeightage!=null ?(int)(((float) a.ModuleWeightage/(float) a.MaxWeightage)*100):0),
                                                        WeightageScore = a.MaxWeightage,
                                                        Modulescore = a.ModuleWeightage,
                                                        ModuleScoreAvg = a.AvgAnswer.GetValueOrDefault(0),
                                                        ModuleScorePercentage = a.Percentage.GetValueOrDefault(0),
                                                        Moduleorder = Convert.ToInt32(a.ModuleOrder),
                                                        QuestionScores =
                                                            GetAvgStandingResult(fbid, Convert.ToInt32(a.POEModuleId).ToString(CultureInfo.InvariantCulture),userid)
                                                    }
                                            }
                              ).ToList();
            }
        }

        public List<QuestionScore> GetAvgStandingResult(string fbid, string moduleid, int userid = 0)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetAvgFeedbackResult(fbid, moduleid, userid).ToList().SelectMany(
                        (a, b) => new List<QuestionScore>
                            {
                                new QuestionScore
                                    {
                                        ShortQuetionText = RemoveHtml(a.ShortQuestion),
                                        QuestionText = RemoveHtml(a.Question),
                                        Questionid = a.QuestionId.GetValueOrDefault(),
                                        Score = a.Answer.GetValueOrDefault(0),
                                        ScorePercentage = a.Percentage.GetValueOrDefault(0),
                                        WeightageScore=a.weightingValue.GetValueOrDefault(0),
                                        GoalDate = (a.GoalDate != null) ? Convert.ToDateTime(a.GoalDate).ToString("dd MMM yyyy") : "",
                                        GoalsetDate = (a.GoalsetDate != null) ? Convert.ToDateTime(a.GoalsetDate).ToString("dd MMM yyyy") : ""
                                    }
                            }).ToList();
            }
        }

        //public StandingScore GetStandingScore(string feedbackid, StandingType standingType, int poeid)
        //{
        //    var standingScore = new StandingScore();
        //    using (var context = DataContextFactory.GetIntelliSetDataContext())
        //    {
        //        var result = context.GetWCSIPerModule(feedbackid, poeid.ToString(CultureInfo.InvariantCulture)).ToList();
        //        standingScore.WcsiScore = Math.Round(result.Sum(a => Math.Round(a.WCSIPermod.GetValueOrDefault(0), MidpointRounding.AwayFromZero)), MidpointRounding.AwayFromZero);
        //        standingScore.ModuleScores = result.SelectMany((a, b) => a.Maxscore != null ? new List<ModuleScore>
        //        {
        //            new ModuleScore()
        //            {
        //                ModuleName = a.ModuleName,
        //                Moduleid = a.ModuleId,
        //                TotalModuleScore =(a.WCSIPermod!=null ?(int)(((float) a.WCSIPermod/(float) a.Maxscore)*100):0),
        //                WeightageScore = a.Maxscore,
        //                Modulescore =  Math.Round((a.WCSIPermod ?? 0), MidpointRounding.AwayFromZero),
        //                QuestionScores =(standingType==StandingType.You||standingType==StandingType.Previous)?GetStandingResultByQuestions(feedbackid, a.ModuleId.ToString(CultureInfo.InvariantCulture)):null

        //             //   ModuleScoreAvg = a.AvgAnswer.GetValueOrDefault(0),
        //               // ModuleScorePercentage = a.Percentage.GetValueOrDefault(0),
        //            }
        //        } : null).ToList();

        //        return standingScore;
        //    }
        //}

        //public List<QuestionScore> GetStandingResultByQuestions(string fbid, string moduleid)
        //{
        //    using (var context = DataContextFactory.GetIntelliSetDataContext())
        //    {
        //        return context.GetAvgFeedbackResult(fbid, moduleid).ToList().SelectMany(
        //                (a, b) => new List<QuestionScore>
        //                    {
        //                        new QuestionScore()
        //                            {
        //                                ShortQuetionText = RemoveHtml(a.ShortQuestion),
        //                                QuestionText = RemoveHtml(a.Question),
        //                                Questionid = a.QuestionId.GetValueOrDefault(),
        //                                Score = a.Answer.GetValueOrDefault(0),
        //                                ScorePercentage = a.Percentage.GetValueOrDefault(0),
        //                            }
        //                    }).ToList();
        //    }
        //}

        public string RemoveHtml(string text)
        {
            string returntext = text.Replace("<p><strong>", "").Replace("</strong></p>", "");

            return returntext;
        }

        public PoeModules GetPoeContent(int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var values = context.GetPoeDetails(poeid);
                var modules = values.GroupBy(item => item.ModuleOrder)
                    .Select(group => new { moduleId = group.Key, Items = group.ToList(), maximum = group.Sum(a => a.weightingValue) })
                    .ToList();
                var modulesList = new List<PoeModuleValues>();
                foreach (var moduel in modules)
                {
                    var poeModule = new PoeModuleValues { ModuleId = moduel.moduleId };
                    var poeDetailsResult = moduel.Items.FirstOrDefault();
                    if (poeDetailsResult != null)
                    {
                        poeModule.Modulename = poeDetailsResult.ModuleName;
                        poeModule.Priority = poeDetailsResult.Priority;
                        poeModule.ModuleAverage = Math.Round((double)moduel.maximum);
                        poeModule.PoeName = poeDetailsResult.name;
                    }

                    var wItem = new WeightageValue();
                    var rarly = moduel.Items.FirstOrDefault(a => a.weightingkey == 1);
                    if (rarly != null)
                        //wItem.Rarely = Math.Round(rarly.weightingValue.GetValueOrDefault(0));
                        wItem.Rarely = rarly.weightingValue.GetValueOrDefault(0);
                    var incon = moduel.Items.FirstOrDefault(a => a.weightingkey == 2);
                    if (incon != null)
                        //wItem.Inconsistenly = Math.Round(incon.weightingValue.GetValueOrDefault(0));
                        wItem.Inconsistenly = incon.weightingValue.GetValueOrDefault(0);
                    var freq = moduel.Items.FirstOrDefault(a => a.weightingkey == 3);
                    if (freq != null)
                        //wItem.Frequently = Math.Round(freq.weightingValue.GetValueOrDefault(0));
                        wItem.Frequently = freq.weightingValue.GetValueOrDefault(0);
                    var always = moduel.Items.FirstOrDefault(a => a.weightingkey == 4);
                    if (always != null)
                        //wItem.Always = Math.Round(always.weightingValue.GetValueOrDefault(0));
                        wItem.Always = always.weightingValue.GetValueOrDefault(0);
                    poeModule.WeightageScores = wItem;
                    modulesList.Add(poeModule);
                }
                //  from k in Values group k by k.ModuleOrder into g select g;
                return new PoeModules { Modules = modulesList };
            }
        }

        //New DevelopMent-Sep6 fro standing new logic
        public StandingNew GetStandingData(int poeid, int userid, int tileclicked, int subid, string domain)
        {
            int type;
            switch (tileclicked)
            {
                case 1:
                case 2:
                case 4:
                case 5:
                case 7:
                case 6:
                    type = 1;
                    break;

                case 3:

                    type = 2;
                    break;

                default:
                    type = 1;
                    break;
            }
            var you = GetYouFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), subid, tileclicked, domain);
            var previous = GetPrevFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), subid, tileclicked, domain);
            var community = GetRestFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), domain, type);

            var tenurebelow13 = GetTenureFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), domain, type, 0, 13);
            var tenurebelow36 = GetTenureFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), domain, type, 13, 37);
            var tenureabove36 = GetTenureFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), domain, type, 37, 150);

            var sherpasFbid = GetSherbasFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), type, domain);
            var teamFbid = GetTeamFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), type, domain);
            var youStand = GetAvgStandingScore(you, poeid);
            var previousStand = GetAvgStandingScore(previous, poeid);
            var communityStand = GetAvgStandingScore(community, poeid);
            var tenurebelow13Stand = GetAvgStandingScore(tenurebelow13, poeid);
            var tenurebelow36Stand = GetAvgStandingScore(tenurebelow36, poeid);
            var tenureabove36Stand = GetAvgStandingScore(tenureabove36, poeid);
            var sherpasStand = GetAvgStandingScore(sherpasFbid, poeid);
            var teamStand = GetAvgStandingScore(teamFbid, poeid);
            var tenure = new Tenure
                             {
                                 TenureBelow12 = tenurebelow13Stand,
                                 TenureBelow36 = tenurebelow36Stand,
                                 TenureAbove36 = tenureabove36Stand
                             };
            var poe = new POEBL();
            var standingdata = new StandingNew
            {
                You = youStand,
                Previous = previousStand,
                Community = communityStand,
                Tenure = tenure,
                Sherpas = sherpasStand,
                Team = teamStand,
                PracticeAreaContent = GetPracticeAreaQuestions(poeid),
                PoeGoal = GetPoeGoal(poeid)
            };
            return standingdata;
        }

        //Standing Left side content
        public StandingPAContent GetStandingPAContent(int userid, int poeid, int subid, string domain, bool cacheMode)
        {
            var mgrFbid = GetMyManagerFbIdString(poeid, userid);
            var mgrids = "0";
            var mgrname = "";
            if (mgrFbid != "0")
            {
                mgrids = mgrFbid.Split('@')[1];
                mgrname = mgrFbid.Split('@')[0];
            }
            else
            {
                mgrname = GetManagerName(userid, poeid);
            }
            var common = new Common.Common();

            var poe = new POEBL();
            List<Module> practicerarea = null;
            if (!cacheMode)
            {
                practicerarea = poe.GetPracticeArea(poeid);
            }
            var standingLeftContent = new StandingPAContent
                                          {
                                              ReceiveMembers = common.GetMyGiveFbTeam(userid, poeid, subid),
                                              RequestMembers = common.GetMyReceiveFbTeam(userid, poeid, subid),
                                              ManagerScore = GetAvgStandingScore(mgrids, poeid),
                                              Connect = GetTopMembers(domain, poeid, userid, 1),
                                              GetPracticeArea = practicerarea,
                                              ManagerName = mgrname,
                                              PoeName = common.GetPoeName(poeid)
                                          };
            return standingLeftContent;
        }

        public string GetManagerName(int userid, int poeid)
        {
            string managerName = "";
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var mangername = context.GetManagerName(userid, poeid).SingleOrDefault();
                if (mangername != null && mangername.ManagerName != null)
                {
                    managerName = mangername.ManagerName;
                }
                else
                {
                    managerName = string.Empty;
                }
            }
            return managerName;
        }

        public List<Module> GetPracticeAreaQuestions(int poeid)
        {
            var moduleList = new List<Module>();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var returnvalue = context.GetPRacticeAreaQuestions(poeid).ToList();
                var modulesValue = from c in returnvalue
                                   group c by c.PoeModuleid
                                       into grps
                                       select new
                                                  {
                                                      Key = grps.Key,
                                                      value = grps
                                                  };
                foreach (var c in modulesValue)
                {
                    var module = new Module
                                     {
                                         ModuleId = c.Key,
                                     };
                    var data = from k in c.value
                               select new Question
                                          {
                                              QuestionId = k.QuestionId,
                                              ShortQuetionText = k.ShortQuestion
                                          };
                    module.ModuleName =
                        (from modulename in c.value where modulename.PoeModuleid == c.Key select modulename.ModuleName).
                            First();

                    module.Questions = data.ToList();
                    moduleList.Add(module);
                }

                return moduleList;
            }
        }

        public string GetTenureFbidString(int poeid, string userid, string domain, int type, int min, int max)
        {
            var fbids = string.Empty;
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var returnvalue = context.GetTenureFbids(poeid, domain, type, userid, min, max).ToList();

                if (returnvalue.Count != 0)
                {
                    fbids = returnvalue.Aggregate(fbids, (current, fblist) => current + fblist.POEFeedbackId + ",");
                }
            }
            if (!string.IsNullOrEmpty(fbids))
            {
                return fbids.Substring(fbids.Length - 1, 1) == "," ? fbids.Substring(0, fbids.Length - 1) : fbids;
            }
            return "0";
        }

        public string GetSherbasFbidString(int poeid, string userid, int type, string domain)
        {
            var fbids = string.Empty;
            var users = "";
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var returnvalue = context.GetSherpasId(poeid, userid, type, domain).ToList();
                if (returnvalue.Count != 0)
                {
                    var feed = (returnvalue.Select(f => new Feedback
                                                            {
                                                                GoalValue1 = (int)f.GoalValue1,
                                                                GoalValue2 = (int)f.GoalValue2,
                                                                GoalValue3 = (int)f.GoalValue3,
                                                                MaxUsers = (int)f.MAXUsers
                                                            })).Distinct().FirstOrDefault();
                    if (feed != null)
                    {
                        var maximumUsers = 0;

                        var feed85 =
                            (from f in returnvalue where f.wcsi >= feed.GoalValue1 select f).OrderByDescending(m => m.wcsi).
                                ToList();
                        var feed68To85 =
                            (from f in returnvalue where f.wcsi < feed.GoalValue1 && f.wcsi >= feed.GoalValue2 select f).
                                OrderByDescending(
                                    m => m.wcsi).ToList();
                        var feed59To68 =
                            (from f in returnvalue where f.wcsi < feed.GoalValue2 && f.wcsi >= feed.GoalValue3 select f).
                                OrderByDescending(
                                    m => m.wcsi).ToList();
                        if (feed.MaxUsers > maximumUsers)
                        {
                            maximumUsers = feed85.Select(p => p.Forid.ToString()).Distinct().Count();
                            users = string.Join(",", feed85.Select(p => p.Forid.ToString()).Distinct());
                            fbids = string.Join(",", feed85.GroupBy(i => i.Forid).Select(p => p.FirstOrDefault().fbid.ToString()));
                        }
                        if (feed.MaxUsers > maximumUsers)
                        {
                            var userCount = (feed.MaxUsers - maximumUsers);
                            var feed68To85Count =
                                (from f in feed68To85
                                 group f by f.wcsi
                                     into g
                                     select new
                                                {
                                                    count = g.Select(m => m.wcsi).Count(),
                                                    wcsi = g.Key
                                                }).ToList();
                            int takeSameCount = 0, i = 0;
                            foreach (var d in feed68To85Count)
                            {
                                takeSameCount = takeSameCount + d.count;
                                if (userCount <= feed68To85Count.Sum(m => m.count))
                                {
                                    if (userCount <= takeSameCount)
                                    {
                                        var tempusers = string.Join(",",
                                                            feed68To85.Where(m => m.wcsi == d.wcsi && !users.ToString().Contains(Convert.ToInt32(m.Forid).ToString())).Select(
                                                                m => m.Forid.ToString()));
                                        users = users + ((tempusers == "") ? "" : (!string.IsNullOrEmpty(users) ? "," : "") + tempusers);
                                        fbids = fbids + ((tempusers == "") ? "" : (!string.IsNullOrEmpty(fbids) ? "," : ""));
                                        if (tempusers != "")
                                        {
                                            fbids = fbids + string.Join(",",
                                                           feed68To85.Where(m => m.wcsi == d.wcsi).Select(
                                                               m => m.fbid.ToString()));
                                            maximumUsers = maximumUsers + d.count;
                                            userCount = (feed.MaxUsers - maximumUsers);
                                        }
                                        if (userCount == 0)
                                            break;
                                    }
                                    else
                                    {
                                        var tempusers = string.Join(",",
                                                            feed68To85.Where(m => m.wcsi == d.wcsi && !users.ToString().Contains(Convert.ToInt32(m.Forid).ToString())).Select(
                                                                m => m.Forid.ToString()).Distinct());
                                        users = users + ((tempusers == "") ? "" : (!string.IsNullOrEmpty(users) ? "," : "") + tempusers);
                                        fbids = fbids + ((tempusers == "") ? "" : (!string.IsNullOrEmpty(fbids) ? "," : ""));
                                        if (tempusers != "")
                                        {
                                            fbids = fbids + string.Join(",",
                                                            feed68To85.Where(m => m.wcsi == d.wcsi).Select(
                                                                m => m.fbid.ToString()));
                                            maximumUsers = maximumUsers + d.count;
                                            userCount = (feed.MaxUsers - maximumUsers);
                                        }
                                        if (userCount == 0)
                                            break;
                                    }
                                }
                                else
                                {
                                    var tempusers =
                                    users = users + (!string.IsNullOrEmpty(users) ? "," : "") +
                                            string.Join(",", feed68To85.Select(m => m.Forid.ToString()).Distinct());
                                    fbids = fbids + (!string.IsNullOrEmpty(fbids) ? "," : "");
                                    fbids = fbids + string.Join(",",
                                                            feed68To85.Select(
                                                                m => m.fbid.ToString()));
                                    maximumUsers = maximumUsers + feed68To85.Count;
                                    break;
                                }
                            }
                        }
                        if (feed.MaxUsers > maximumUsers)
                        {
                            var userCount = (feed.MaxUsers - maximumUsers);
                            var feed59To68Count =
                                (from f in feed59To68
                                 group f by f.wcsi
                                     into g
                                     select new
                                                {
                                                    count = g.Select(m => m.wcsi).Count(),
                                                    wcsi = g.Key
                                                }).ToList();
                            int takeSameCount = 0, i = 0;
                            foreach (var d in feed59To68Count)
                            {
                                takeSameCount = takeSameCount + d.count;
                                if (userCount <= feed59To68Count.Sum(m => m.count))
                                {
                                    if (userCount <= takeSameCount)
                                    {
                                        var tempusers = string.Join(",",
                                                            feed59To68.Where(m => m.wcsi == d.wcsi && !users.ToString().Contains(Convert.ToInt32(m.Forid).ToString())).Select(
                                                                m => m.Forid.ToString()).Distinct());
                                        users = users + ((tempusers == "") ? "" : (!string.IsNullOrEmpty(users) ? "," : "") + tempusers);
                                        fbids = fbids + ((tempusers == "") ? "" : (!string.IsNullOrEmpty(fbids) ? "," : ""));
                                        if (tempusers != "")
                                        {
                                            fbids = fbids + string.Join(",",
                                                            feed59To68.Where(m => m.wcsi == d.wcsi).Select(
                                                                m => m.fbid.ToString()).Distinct());
                                            maximumUsers = maximumUsers + d.count;
                                            userCount = (feed.MaxUsers - maximumUsers);
                                        }
                                        if (userCount == 0)
                                            break;
                                    }
                                    else
                                    {
                                        var tempusers = string.Join(",",
                                                            feed68To85.Where(m => m.wcsi == d.wcsi && !users.ToString().Contains(Convert.ToInt32(m.Forid).ToString())).Select(
                                                                m => m.Forid.ToString()));

                                        users = users + ((tempusers == "") ? "" : (!string.IsNullOrEmpty(users) ? "," : "") + tempusers);
                                        fbids = fbids + ((tempusers == "") ? "" : (!string.IsNullOrEmpty(fbids) ? "," : ""));
                                        if (tempusers != "")
                                        {
                                            fbids = fbids + string.Join(",",
                                                            feed59To68.Where(m => m.wcsi == d.wcsi).Select(
                                                                m => m.fbid.ToString()).Distinct());
                                            maximumUsers = maximumUsers + d.count;
                                            userCount = (feed.MaxUsers - maximumUsers);
                                        }
                                    }
                                }
                                else
                                {
                                    users = users + (!string.IsNullOrEmpty(users) ? "," : "") +
                                            string.Join(",",
                                                        feed59To68.Select(
                                                            m => m.Forid.ToString()).Distinct());
                                    fbids = fbids + (!string.IsNullOrEmpty(fbids) ? "," : "");
                                    fbids = fbids + string.Join(",",
                                                            feed59To68.Select(
                                                                m => m.fbid.ToString()).Distinct());
                                    maximumUsers = maximumUsers + feed59To68.Count;
                                    break;
                                }
                            }
                        }
                    }
                }
                //fbids = returnvalue.Aggregate(fbids, (current, fblist) => current + fblist.fbid + ",");
            }
            if (!string.IsNullOrEmpty(fbids))
            {
                return fbids;
            }
            return "0";
        }

        public string GetTeamFbidString(int poeid, string userid, int type, string domain)
        {
            var fbids = string.Empty;
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var returnvalue = context.GetTeamFbIds(userid, poeid, type, domain).ToList();

                if (returnvalue.Count != 0)
                {
                    fbids = returnvalue.Aggregate(fbids, (current, fblist) => current + fblist.POEFeedbackId + ",");
                }
            }
            if (!string.IsNullOrEmpty(fbids))
            {
                return fbids.Substring(fbids.Length - 1, 1) == "," ? fbids.Substring(0, fbids.Length - 1) : fbids;
            }
            return "0";
        }

        public string GetMyManagerFbIdString(int poeid, int userid)
        {
            var fbids = string.Empty;
            var maangerName = string.Empty;
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var returnvalue = context.GetMyManagerFeedbacks(poeid, userid).FirstOrDefault();

                if (returnvalue != null)
                {
                    fbids = returnvalue.POEFeedbackId.ToString();
                    maangerName = returnvalue.managerFirstname + " " + returnvalue.managerlastname;
                }
            }
            if (!string.IsNullOrEmpty(fbids))
            {
                return fbids.Substring(fbids.Length - 1, 1) == "," ? maangerName + "@" + fbids.Substring(0, fbids.Length - 1) : maangerName + "@" + fbids;
            }
            return "0";
        }

        public List<UserPOEMapping> GetTopMembers(string domain, int poeid, int userid, int type)
        {
            var list = GetSherpasForIdString(poeid, userid.ToString(CultureInfo.InvariantCulture), type, domain);
            var forList = list.Split(',');
            var topMembers = forList.Select(user => new Common.Common().GetUserDetailsByMappingId(int.Parse(user))).ToList();
            if (list != "0")
            {
                return topMembers.GroupBy(x => x.User.EmailAddress).Select(y => y.First()).ToList();
            }
            else
            {
                return null;
            }
        }

        public int GetPoeGoal(int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var v3GetMyGoalsResult = context.GetPoeGoal(poeid).FirstOrDefault();
                return (int)v3GetMyGoalsResult.Goal;
            }
        }

        public string GetSherpasForIdString(int poeid, string userid, int type, string domain)
        {
            var fbids = string.Empty;
            var users = "";
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var returnvalue = context.GetSherpasId(poeid, userid, type, domain).ToList();
                if (returnvalue.Count != 0)
                {
                    var feed = (returnvalue.Select(f => new Feedback
                    {
                        GoalValue1 = (int)f.GoalValue1,
                        GoalValue2 = (int)f.GoalValue2,
                        GoalValue3 = (int)f.GoalValue3,
                        MaxUsers = (int)f.MAXUsers
                    })).Distinct().FirstOrDefault();
                    if (feed != null)
                    {
                        var maximumUsers = 0;

                        var feed85 =
                            (from f in returnvalue where f.wcsi >= feed.GoalValue1 select f).OrderByDescending(m => m.wcsi).
                                ToList();
                        var feed68To85 =
                            (from f in returnvalue where f.wcsi < feed.GoalValue1 && f.wcsi >= feed.GoalValue2 select f).
                                OrderByDescending(
                                    m => m.wcsi).ToList();
                        var feed59To68 =
                            (from f in returnvalue where f.wcsi < feed.GoalValue2 && f.wcsi >= feed.GoalValue3 select f).
                                OrderByDescending(
                                    m => m.wcsi).ToList();
                        if (feed.MaxUsers > maximumUsers)
                        {
                            maximumUsers = feed85.Select(p => p.Forid.ToString()).Distinct().Count();
                            users = string.Join(",", feed85.Select(p => p.Forid.ToString()).Distinct());
                        }
                        if (feed.MaxUsers > maximumUsers)
                        {
                            var userCount = (feed.MaxUsers - maximumUsers);
                            var feed68To85Count =
                                (from f in feed68To85
                                 group f by f.wcsi
                                     into g
                                     select new
                                     {
                                         count = g.Select(m => m.wcsi).Count(),
                                         wcsi = g.Key
                                     }).ToList();
                            int takeSameCount = 0, i = 0;
                            foreach (var d in feed68To85Count)
                            {
                                takeSameCount = takeSameCount + d.count;
                                if (userCount <= feed68To85Count.Sum(m => m.count))
                                {
                                    if (userCount <= takeSameCount)
                                    {
                                        var tempusers = string.Join(",",
                                                            feed68To85.Where(m => m.wcsi == d.wcsi && !users.ToString().Contains(Convert.ToInt32(m.Forid).ToString())).Select(
                                                                m => m.Forid.ToString()));
                                        users = users  + ((tempusers == "") ? "" : (!string.IsNullOrEmpty(users) ? "," : "") + tempusers);
                                        if (tempusers != "")
                                        {
                                            maximumUsers = maximumUsers + d.count;
                                            userCount = (feed.MaxUsers - maximumUsers);
                                        }
                                        if (userCount == 0)
                                            break;
                                    }
                                    else
                                    {
                                        var tempusers = string.Join(",",
                                                            feed68To85.Where(m => m.wcsi == d.wcsi && !users.ToString().Contains(Convert.ToInt32(m.Forid).ToString())).Select(
                                                                m => m.Forid.ToString()).Distinct());
                                        users = users + ((tempusers == "") ? "" : (!string.IsNullOrEmpty(users) ? "," : "") + tempusers);
                                        if (tempusers != "")
                                        {
                                            maximumUsers = maximumUsers + d.count;
                                            userCount = (feed.MaxUsers - maximumUsers);
                                        }
                                        if (userCount == 0)
                                            break;
                                    }
                                }
                                else
                                {
                                    var tempusers = 
                                    users = users + (!string.IsNullOrEmpty(users) ? "," : "") +
                                            string.Join(",", feed68To85.Select(m => m.Forid.ToString()).Distinct());
                                    maximumUsers = maximumUsers + feed68To85.Count;
                                    break;
                                }
                            }
                        }
                        if (feed.MaxUsers > maximumUsers)
                        {
                            var userCount = (feed.MaxUsers - maximumUsers);
                            var feed59To68Count =
                                (from f in feed59To68
                                 group f by f.wcsi
                                     into g
                                     select new
                                     {
                                         count = g.Select(m => m.wcsi).Count(),
                                         wcsi = g.Key
                                     }).ToList();
                            int takeSameCount = 0, i = 0;
                            foreach (var d in feed59To68Count)
                            {
                                takeSameCount = takeSameCount + d.count;
                                if (userCount <= feed59To68Count.Sum(m => m.count))
                                {
                                    if (userCount <= takeSameCount)
                                    {
                                        var tempusers = string.Join(",",
                                                            feed59To68.Where(m => m.wcsi == d.wcsi && !users.ToString().Contains(Convert.ToInt32(m.Forid).ToString())).Select(
                                                                m => m.Forid.ToString()).Distinct());
                                        users = users + ((tempusers == "") ? "" : (!string.IsNullOrEmpty(users) ? "," : "") + tempusers);
                                        if (tempusers != "")
                                        {
                                            maximumUsers = maximumUsers + d.count;
                                            userCount = (feed.MaxUsers - maximumUsers);
                                        }
                                        if (userCount == 0)
                                            break;
                                    }
                                    else
                                    {
                                        var tempusers = string.Join(",",
                                                            feed68To85.Where(m => m.wcsi == d.wcsi && !users.ToString().Contains(Convert.ToInt32(m.Forid).ToString())).Select(
                                                                m => m.Forid.ToString()));

                                        users = users + ((tempusers == "") ? "" : (!string.IsNullOrEmpty(users) ? "," : "") + tempusers);
                                        if (tempusers != "")
                                        {
                                            maximumUsers = maximumUsers + d.count;
                                            userCount = (feed.MaxUsers - maximumUsers);
                                        }
                                    }
                                }
                                else
                                {
                                    users = users + (!string.IsNullOrEmpty(users) ? "," : "") +
                                            string.Join(",",
                                                        feed59To68.Select(
                                                            m => m.Forid.ToString()).Distinct());
                                    maximumUsers = maximumUsers + feed59To68.Count;
                                    break;
                                }
                            }
                        }
                    }
                }
                //fbids = returnvalue.Aggregate(fbids, (current, fblist) => current + fblist.fbid + ",");
            }
            if (!string.IsNullOrEmpty(users))
            {
                return users;
            }
            return "0";
        }

        //// For Connect
        //public List<UserPOEMapping> GetTopMembers(string domain, int poeid, int moduleid, int quesionid)
        //{
        //    var list = GetTopMembersList(domain, poeid, moduleid, quesionid);
        //    var topMembers = list.Select(user => new Common.Common().GetUserDetailsByMappingId(user.forid.GetValueOrDefault())).ToList();
        //    return topMembers.GroupBy(x => x.User.EmailAddress).Select(y => y.First()).ToList();
        //}

        //public List<V3_GetTopMembersListResult> GetTopMembersList(string domain, int poeid, int moduleid, int quesionid)
        //{
        //    using (var context = DataContextFactory.GetIntelliSetDataContext())
        //    {
        //        return context.GetTopMembersList(poeid, moduleid, quesionid, domain).ToList();
        //    }
        //}

        ////Request Members
        //public List<UserPOEMapping> GetMyReceiveFbTeam(int userId, int POEId, int subscriptionid)
        //{
        //    var myGiveFbTeam = new List<UserPOEMapping>();

        //    myGiveFbTeam.AddRange(GetNetworksUsersSync(userId, POEId, NetworkUserFilterType.Manager));
        //    myGiveFbTeam.AddRange(GetNetworksUsersSync(userId, POEId, NetworkUserFilterType.SkipLevelManager));
        //    myGiveFbTeam.AddRange(GetNetworksUsersSync(userId, POEId, NetworkUserFilterType.PeerManager));
        //    myGiveFbTeam.AddRange(GetNetworksUsersSync(userId, POEId, NetworkUserFilterType.Customer));
        //    foreach (var userPoeMapping in myGiveFbTeam)
        //    {
        //        var sync = new Sync.Sync();
        //        userPoeMapping.WcsiScoreDiff = sync.WcsiScoreDifference(userId, POEId, subscriptionid,
        //                                                                userPoeMapping.UserPOEMappingId, 1);
        //    }
        //    return myGiveFbTeam;
        //}

        ////Receive members
        //public List<UserPOEMapping> GetMyGiveFbTeam(int userId, int POEId, int subscriptionid)
        //{
        //    var myGiveFbTeam = new List<UserPOEMapping>();

        //    myGiveFbTeam.AddRange(GetNetworksUsersSync(userId, POEId, NetworkUserFilterType.TeamMember));
        //    myGiveFbTeam.AddRange(GetNetworksUsersSync(userId, POEId, NetworkUserFilterType.PeerTeam));

        //    foreach (var userPoeMapping in myGiveFbTeam)
        //    {
        //        var sync = new Sync.Sync();
        //        userPoeMapping.WcsiScoreDiff = sync.WcsiScoreDifference(userId, POEId, subscriptionid,
        //                                                                userPoeMapping.UserPOEMappingId, 2);
        //    }

        //    return myGiveFbTeam;
        //}

        public List<UserPOEMapping> GetNetworksUsersSync(int userId, int POEId, NetworkUserFilterType filterType)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetNetworkUsersWithoutSubid(userId, POEId, (int)filterType);
                if (results != null)
                {
                    return results.SelectMany((a, b) => new List<UserPOEMapping>
                        {
                            new UserPOEMapping
                                {
                                    UserPOEMappingId = a.UserPOEMappingId,
                                    AreaId = a.ZoneId.GetValueOrDefault(),
                                    User = new User
                                        {
                                            UserId = a.userid,
                                            FirstName = a.FirstName,
                                            LastName = a.LastName,
                                            EmailAddress = a.EmailId,

                                            //  Photo = a.Photo,
                                            Country = new Country
                                                {
                                                    Id = a.CountryId,
                                                    Name =
                                                        Helper.
                                                            GetCountryName(
                                                                a.CountryId)
                                                },
                                            Area = new Zone
                                                {
                                                    Id =
                                                        a.ZoneId.
                                                            GetValueOrDefault(),
                                                    Name =
                                                        Helper.GetAreaById
                                                            (a.ZoneId.
                                                                 GetValueOrDefault
                                                                 ())
                                                }
                                        },
                                    POE = new Util.Domain.POE()
                                        {
                                            POEId = a.POEId,
                                            Name = a.POEName,
                                        },
                                    Designation = new Designation
                                        {
                                            Name = a.DesignationName,
                                            Level = a.LevelId
                                        },

                                    JobTitle = a.JobTitle
                                }
                        }).ToList();
                }
                else
                {
                    return null;
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
        public List<UserRole> GetUserRolesByProfile(int userid, int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetUserRoleByProfileList(userid, poeid).ToList().SelectMany((a, b) => new List<UserRole>
                    {
                        new UserRole
                            {
                                RoleId = a.DesignationId,
                                RoleText =a.Jobtile
                            }
                    }).ToList();
            }
        }
        public List<UserRole> GetUserCurrentRole(int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetCurrentUserRole(userid).ToList().SelectMany((a, b) => new List<UserRole>
                    {
                        new UserRole
                            {
                                RoleId = a.DesignationId,
                                RoleText =a.Jobtile
                            }
                    }).ToList();
            }
        }
        //Get Standing data For DashBoard
    }

    public class Feedback
    {
        public int FdId { get; set; }

        public double Wcsi { get; set; }

        public int MaxUsers { get; set; }

        public int GoalValue1 { get; set; }

        public int GoalValue2 { get; set; }

        public int GoalValue3 { get; set; }
    }
}