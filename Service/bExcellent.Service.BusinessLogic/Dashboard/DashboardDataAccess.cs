using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using bExcellent.Service.BusinessLogic.UserAdmin;
using bExcellent.Service.DataAccess;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Enumeration;
using System.Collections;

namespace bExcellent.Service.BusinessLogic.Dashboard
{
    public class DashboardDataAccess
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

        public DashboardGoal GetGoals(int poeId, int userId)
        {
            var results = GetGoalSet(poeId, userId);
            if (results.Count > 0)
                return new DashboardGoal
                           {
                               GoalsCompleted = results.Count(m => m.Answer == 4),//results.Count(m => m.GoalReachDate != null && m.GoalReachDate >= DateTime.Now && m.Answer.Equals(4)),
                               GoalsDelayed = results.Count(m => m.GoalReachDate != null && m.GoalReachDate <= DateTime.Now && !m.Answer.Equals(4)),
                               GoalsSet = GetGoalSetCount(userId, poeId),//results.Count(m => m.GoalReachDate != null && m.GoalReachDate < DateTime.Now),
                               GoalsShared = (int)GetGoalSharedWithCount(poeId, userId).Sum(m => m.SharedCount),
                               GoalUsers = GetGoalSharedWith(poeId, userId)
                           };
            return new DashboardGoal
                       {
                           GoalsSet = GetGoalSetCount(userId, poeId),
                           GoalUsers = new List<DashboardUser>()
                       };
        }

        private int GetGoalSetCount(int userId, int poeId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetGoalsSetCount(userId, poeId);
                return (int)results.Sum(m => m.GoalCount);
            }
        }

        private List<v3_GetGoalSetResult> GetGoalSet(int poeId, int userId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetGoalSet(userId, poeId);
                return results != null ? results.ToList() : null;
            }
        }

        private List<DashboardUser> GetGoalSharedWith(int poeId, int userId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetGoalSharedWith(userId, poeId).Select(m => new DashboardUser
                                                                                       {
                                                                                           Name = m.Name,
                                                                                           UserId = m.SharedWith
                                                                                       }).ToList();
            }
        }

        private List<v3_GetGoalSharedWithResult> GetGoalSharedWithCount(int poeId, int userId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetGoalSharedWith(userId, poeId);
                if (results != null)
                {
                    return results.ToList();
                }
                return new List<v3_GetGoalSharedWithResult>();
            }
        }

        public int GetGoalSharedWithCount(int poeId, int userId, int sharedId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var v3GetIndividualGoalSharedCountResult = context.GetIndividualGoalSharedCount(userId, poeId, sharedId).FirstOrDefault();
                if (v3GetIndividualGoalSharedCountResult != null)
                    return (int)v3GetIndividualGoalSharedCountResult.SharedCount;
                return 0;
            }
        }

        public List<DashboardUser> GetDashboardUsers(string userIds)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var getDashBoarUsers = context.GetDashboardUsers(userIds).ToList();
                var listofusers = getDashBoarUsers.Select(users => new DashboardUser
                                                                       {
                                                                           Name = users.FirstName + " " + users.LastName,
                                                                           UserId = (int)users.Id
                                                                       }).ToList();
                return listofusers;
            }
        }

        //Start Pathfinders
        private List<V3_GetPathfindersResult> GetPathfinders(int userId, int poeId, int type)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetPathfinders(userId, poeId, type).ToList();
            }
        }

        public List<MentorDetail> GetPathfinderDetails(int userId, int poeId, int type)
        {
            var Pathfinders = GetPathfinders(userId, poeId, type);
            var mentordet = new MentorDetail();
            //var topMembersgrp = Pathfinders.GroupBy(i => i.ModuleId);
            mentordet.ModuleId = "0";
            if (type == 1)
            {
                mentordet.user = Pathfinders.Select(u => new Common.Common().GetUserById(int.Parse(u.ForUser.ToString()))).ToList();
            }
            else if (type == 2)
            {
                mentordet.user = Pathfinders.Select(u => new Common.Common().GetUserById(int.Parse(u.FromUser.ToString()))).ToList();
            }
            mentordet.user = mentordet.user.Where(i => i != null).GroupBy(i => i.UserId).Select(grp => grp.First()).ToList();
            List<MentorDetail> topMembers = new List<MentorDetail>();
            topMembers.Add(mentordet);
            //foreach (IGrouping<int, V3_GetPathfindersResult> item in topMembersgrp)
            //{
            //    var mentordet = new MentorDetail();
            //    mentordet.ModuleId = item.Key.ToString();
            //    if (type == 1)
            //    {
            //        mentordet.user = item.Select(u => new Common.Common().GetUserById(int.Parse(u.ForUser.ToString()))).ToList();
            //    }
            //    else if (type == 2)
            //    {
            //        mentordet.user = item.Select(u => new Common.Common().GetUserById(int.Parse(u.FromUser.ToString()))).ToList();
            //    }
            //    topMembers.Add(mentordet);
            //}
                
            return topMembers;
        }

        public DashboardPathFinders GetDashboardPathfinders(int userId, int poeId, int type)
        {
            int modulesCount;
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                modulesCount = (context.GetSinglePOEModules(poeId).Count() - 1);
            }
            return new DashboardPathFinders
            {
                ModulesCount = modulesCount,//GetPathfinders(userId, poeId, type).GroupBy(m => m.ModuleId).Count(),
                YourPathfindersCount = GetPathfindersCount(userId, poeId, (int)PathfinderType.You),
                PathfindersForYouCount = GetPathfindersCount(userId, poeId, (int)PathfinderType.ForYou),
                //PathfindersForYou = new List<PathfindersPracticeArea>(),
                YourPathfinders = new List<PathfindersPracticeArea>()
            };
        }

        public int GetIndividualPathfindersCount(int userId, int poeId, int type, int moduleId, int pathfinderUserId)
        {
            return (int)GetPathfinders(userId, poeId, type).Where(m => m.ModuleId == moduleId && m.ForUser == pathfinderUserId).Sum(m => m.CountofForUser);
        }

        private int GetPathfindersCount(int userId, int poeId, int type)
        {
            return (int)GetPathfinders(userId, poeId, type).Sum(m => m.CountofForUser);
        }

        public List<PAModule> GetModules(int poeId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetSinglePOEModules(poeId)
                    .SelectMany((a, b) => new List<PAModule>
                                              {
                                                  new PAModule
                                                      {
                                                          ModuleId = a.POEModuleId,
                                                          ModuleName = a.ModuleName
                                                      }
                                              }).ToList();
            }
        }

        public List<PathfindersPracticeArea> GetPathfindersPracticeArea(int userId, int poeId, int type)
        {
            return (from c in GetPathfinders(userId, poeId, type)
                    group c by c.ModuleId into a
                    let moduleId = a.Select(m => m.ModuleId).FirstOrDefault()
                    where moduleId != null
                    select new PathfindersPracticeArea
                          {
                              PathfinderUsers = a.Select(m => new DashboardUser
                                                               {
                                                                   UserId = m.ForUser,
                                                                   Name = m.FirstName + " " + m.LastName
                                                               }).ToList(),
                              PracticeAreaCount = (int)a.Sum(m => m.CountofForUser),
                              PracticeAreaName = a.Select(m => m.ModuleName).FirstOrDefault(),
                              ModuleId = (int)moduleId
                          }).ToList();
        }

        //End Path finders

        //Start Standing
        public DashboardStanding GetStandingDataDashBoard(int poeid, int userid, int subid, string domain)
        {
            var standing = new Standing.StandingDataAccess();
            var yourmanagerScore = standing.GetYouFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), subid, 2, domain);
            //string managerids = GetMyManagerIdString(poeid, userid);
            //var you = GetYouFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), subid, 1, domain);
            int managerSync = Convert.ToInt32(GetLatestSelfScore(userid, poeid));
            var community = standing.GetRestFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), domain, 1);
            //int userTenure = GetTenureForuser(userid, poeid);
            //string tenurecol = string.Empty;
            //if (userTenure <= 12)
            //{
            //    tenurecol = standing.GetTenureFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), domain, 1, 0, 13);
            //}
            //else if (userTenure > 12 && userTenure <= 36)
            //{
            //    tenurecol = standing.GetTenureFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), domain, 1, 13, 37);
            //}
            //else
            //{
            //    tenurecol = standing.GetTenureFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), domain, 1, 37, 260);
            //}

            var teamFbid = standing.GetTeamFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), 1, domain);
            // var youStand = GetAvgStandingScore(you, poeid);
            var managerStand = standing.GetAvgStandingScore(yourmanagerScore, poeid).WcsiScore;
            var communityStand = standing.GetAvgStandingScore(community, poeid).WcsiScore;
            //var tenureStand = standing.GetAvgStandingScore(tenurecol, poeid).WcsiScore;
            var teamStand = standing.GetAvgStandingScore(teamFbid, poeid).WcsiScore;
            //var users = GetDashboardUsers(managerids).ToList();
            var standingscore = new DashboardStanding
            {
                YourComunity = managerStand - communityStand,
                YourTeam = managerStand - teamStand,
                //YourTenure = managerStand - tenureStand,
                YourStanding = managerStand,
                StandingUsers = GetMyAllManagersList(userid, poeid).ToList(),
                ManagerSync = managerSync
                //TenureForUser = userTenure
            };

            return standingscore;
        }

        private int GetTenureForuser(int userId, int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                V3_GetTenureForUserResult first = context.GetTenureForUser(poeid, userId).FirstOrDefault();
                if (first != null)
                {
                    var tenure = first.duration;
                    return int.Parse(tenure.ToString());
                }
                else
                {
                    return 0;
                }
            }
        }

        private string GetMyManagerIdString(int poeid, int userid)
        {
            var managerids = string.Empty;

            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var returnvalue = context.GetMyManagerFeedbacks(poeid, userid).ToList();

                managerids = returnvalue.Aggregate(managerids, (current, manager) => current + manager.managerid + ",");
            }
            if (!string.IsNullOrEmpty(managerids))
            {
                return managerids.Remove(managerids.Length - 1);
            }
            return "0";
        }

        public double GetMyManagerScore(int userId, int poeid, int managerId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var managerscore = context.GetMyManagerScore(poeid, userId, managerId).FirstOrDefault();
                if (managerscore != null)
                {
                    string fbid = managerscore.POEFeedbackId.ToString();
                    var standing = new Standing.StandingDataAccess();
                    var managerStand = standing.GetAvgStandingScore(fbid, poeid).WcsiScore;
                    return managerStand;
                }
                else
                {
                    return 0;
                }
            }
        }

        public List<DashboardUser> GetMyAllManagersList(int userid, int poeid)
        {
            var mymanagers = new List<DashboardUser>();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var managerList = context.GetMyAllManagerFeedbacks(poeid, userid);
                mymanagers.AddRange(managerList.Select(manager => new DashboardUser
                                                                      {
                                                                          Name = manager.FirstName + " " + manager.LastName,
                                                                          UserId = manager.id,
                                                                          MappingId = manager.mappingId
                                                                      }));
            }
            return mymanagers;
        }

        public double GetLatestSelfScore(int userid, int poeid)
        {
            var selfFbid = 0.0;
            double wcsi = 0;
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var v3GetLatestSelfFeedbackResult = context.GetLatestSelfFeedback(userid, poeid).FirstOrDefault();

                if (v3GetLatestSelfFeedbackResult != null)
                {
                    selfFbid = v3GetLatestSelfFeedbackResult.POEFeedbackId;
                    var standing = new Standing.StandingDataAccess();
                    wcsi = standing.GetAvgStandingScore(selfFbid.ToString(), poeid).WcsiScore;
                }
            }
            return wcsi;
        }

        //End Standing

        //Start Recogition

        public DashboardRecognition GetRecognition(int userId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var recognitionfrom = context.GetRecognition(userId, 1).ToList();
                var recognitionyou = context.GetRecognition(userId, 2).ToList();
                var recognitionfromusers = recognitionfrom.Aggregate(string.Empty, (current, users) => current + users.From + ",");
                var recognitionyousers = recognitionyou.Aggregate(string.Empty, (current, users) => current + users.For + ",");
                var dashboardrecognition = new DashboardRecognition
                                               {
                                                   RecognitionOthersUser = new List<DashboardUser>(),
                                                   RecognitionYouUsers = new List<DashboardUser>()
                                               };
                if (recognitionfrom.Count != 0)
                {
                    dashboardrecognition.RecognitionOthers = recognitionfrom.Count;
                    dashboardrecognition.RecognitionOthersUser = GetDashboardUsers(recognitionfromusers.Remove(recognitionfromusers.Length - 1)).ToList();
                }
                if (recognitionyou.Count != 0)
                {
                    dashboardrecognition.RecognitionYou = recognitionyou.Count;
                    dashboardrecognition.RecognitionYouUsers = GetDashboardUsers(recognitionyousers.Remove(recognitionyousers.Length - 1)).ToList();
                }
                return dashboardrecognition;
            }
        }

        public int GetRecognitionCount(int userid, int shredId, int type)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var recognitionCount = context.GetRecognitionSharedCount(userid, type, shredId).Count();
                return recognitionCount;
            }
        }

        //End Recognition

        //start Feedback
        public DashboardFeedback GetFeedback(int userid, int subid, int poeid)
        {
            var feedback = new FeedbackBL.FeedbackBLDataAccess();
            var feedbackGivenUser = GetFeedbackGiven(userid, subid).Where(a => a.POE.POEId == poeid).ToList();
            var feedbackReceivedUser = feedback.GetFeedbackRecevied(userid, subid, poeid);
            var dashBoardFeedback = new DashboardFeedback
            {
                FeedbackGiven = feedbackGivenUser.Count,
                FeedbackReceived = feedbackReceivedUser.Count,
                FeedbackTaken = GetTakenPoECount(userid, poeid),
                FeedbackGivenUsers = feedbackGivenUser.GroupBy(a => a.User.UserId).Select(k => k.First()).ToList(),
                FeedbackReceivedUsers = feedbackReceivedUser.GroupBy(a => a.UserPOEMappingId).Select(k => k.First()).ToList()
            };
            return dashBoardFeedback;
        }

        public int GetFeedbackReceivedCount(int userId, int selectedUserid, int subid, int poeid)
        {
            var feedback = new FeedbackBL.FeedbackBLDataAccess();
            var feedbackReceivedUser = feedback.GetFeedbackRecevied(userId, subid, poeid).Count(a => a.User.UserId == selectedUserid);
            return feedbackReceivedUser;
        }

        public int GetFeedbackGivenCount(int userId, int selectedUserid, int subid, int poeid)
        {
            var feedbackGivenUser = GetFeedbackGiven(userId, subid).Where(a => a.POE.POEId == poeid).Count(a => a.User.UserId == selectedUserid);
            return feedbackGivenUser;
        }

        private int GetTakenPoECount(int userId, int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var takecount = context.GetTakenPoE(userId, poeid).Count();
                return takecount;
            }
        }

        public IList<UserPOEMapping> GetFeedbackGiven(int userId, int subscriptionid)
        {
            //Log("WCF-GetFeedbackGiven-IN");
            var common = new Common.Common();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetFeedbackGiven(userId, subscriptionid);
                var outPut = new List<UserPOEMapping>();
                //foreach (var b in results.GroupBy(item => item.GroupName).ToList())
                //{
                foreach (var a in results)
                {
                    if (a.FeedbackType != null)
                    {
                        var userPoeMapping = new UserPOEMapping
                        {
                            UserPOEMappingId = a.RequestedFor.GetValueOrDefault(),
                            AreaId = a.ZoneId.GetValueOrDefault(),
                            User = new User
                            {
                                UserId = a.UserId.GetValueOrDefault(),
                                FirstName = a.FirstName,
                                LastName = a.LastName,
                                EmailAddress = a.EmailID,
                                //      Photo = a.Photo,

                                Country = new Country
                                {
                                    Id = a.CountryId.GetValueOrDefault(),
                                    Name = Helper.GetCountryName(a.CountryId.GetValueOrDefault())
                                },
                                Area = new Zone
                                {
                                    Id = a.ZoneId.GetValueOrDefault(),
                                    Name = Helper.GetAreaById(a.ZoneId.GetValueOrDefault())
                                }
                            },
                            POE = new Util.Domain.POE()
                            {
                                POEId = a.POEId.GetValueOrDefault(),
                                Name = a.POEName,
                            },
                            Designation = new Designation
                            {
                                DesignationId = a.DesignationId.GetValueOrDefault(),
                                Name = a.JobTitle,
                            },
                            FeedbackDetails = new Feedback
                            {
                                FeedbackId = a.GroupName != null ? 0 : a.POEFeedbackId.GetValueOrDefault(),
                                RequestedBy =
                                    common.GetUserDetailsByMappingId(a.RequestedBy.GetValueOrDefault()),
                                RequestedFor =
                                    common.GetUserDetailsByMappingId(a.RequestedFor.GetValueOrDefault()),
                                RequestedFrom =
                                    common.GetUserDetailsByMappingId(a.RequestedFrom.GetValueOrDefault()),
                                RequestedById = a.RequestedBy.GetValueOrDefault(),
                                RequestedForId = a.RequestedFor.GetValueOrDefault(),
                                RequestedFromId = a.RequestedFrom.GetValueOrDefault(),
                                CreatedOnDtm = a.CreatedOn.GetValueOrDefault(),
                                UpdatedOnDtm = a.UpdatedOn.GetValueOrDefault(),
                                CreatedOn =
                                    a.CreatedOn != null
                                        ? a.CreatedOn.GetValueOrDefault().ToString("MMMM dd, yyyy")
                                        : "",
                                UpdatedOn =
                                    a.UpdatedOn != null
                                        ? a.UpdatedOn.GetValueOrDefault().ToString("MMMM dd, yyyy")
                                        : "",
                                FeedbackStatus =
                                    (FeedbackStatus)
                                    Enum.Parse(typeof(FeedbackStatus),
                                               a.FeedbackStatus.GetValueOrDefault().ToString()),
                                FeedbackType =
                                    (FeedbackType)
                                    Enum.Parse(typeof(FeedbackType), a.FeedbackType.Value.ToString(CultureInfo.InvariantCulture)),
                                GroupName = a.GroupName
                            },

                            JobTitle = a.JobTitle
                        };
                        outPut.Add(userPoeMapping);

                        //if (userPoeMapping.FeedbackDetails.GroupName != null)
                        //{
                        //    userPoeMapping.Nooffbs = 1;
                        //    break;
                        //}
                    }
                }
                //}
                // Log("WCF-GetFeedbackGiven-OUT");
                return outPut;
            }
        }

        //End Feedbackbbb
        
    }
}