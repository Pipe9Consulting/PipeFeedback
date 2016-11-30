using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using bExcellent.Service.BusinessLogic.Goal;
using bExcellent.Service.BusinessLogic.UserAdmin;
using bExcellent.Service.DataAccess;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Enumeration;
using bExcellent.Service.Util.Response;

namespace bExcellent.Service.BusinessLogic.Sync
{
    public class SyncDataAccess
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

        public SyncScoreCollection GetSyncScores(int userid, int poeid, int subid, int usermapping, int type)
        {
            int tid = 0;
            int rid = 0;
            int muid = 0;
            // string childIndexName1 = "";
            //string childIndeName2 = "";
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                //childIndexName1 = context.GetChildIndexName(poeid, 1).FirstOrDefault().childindexName;
                //childIndeName2 = context.GetChildIndexName(poeid, 2).FirstOrDefault().childindexName;
            }
            if (type == 1)
            {
                tid = GetRecentSelfFBid(poeid, userid, subid);
                rid = GetRecentRcvdFBidByUser(poeid, userid, subid, usermapping);
                muid = userid;
            }
            else
            {
                Common.Common common = new Common.Common();
                tid = GetRecentTmSelfFBidByUser(usermapping, subid);
                rid = GetRecentTmRcvdFBid(poeid, userid, subid, usermapping);
                muid = common.GetUserDetailsByMappingId(usermapping).User.UserId;
            }

            var value = new SyncScoreCollection
            {
                TScore = GetSyncScore(tid, muid, poeid, userid, usermapping),
                RScore = GetSyncScore(rid, muid, poeid, userid, usermapping),
                PoeScores = GetPoeContent(poeid)
                //ChildIndexName1 = childIndexName1,
                //ChildIndexName2 = childIndeName2
            };
            return value;
        }

        public PoeModules GetPoeContent(int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var values = context.GetPoeDetails(poeid);
                var modules = values.GroupBy(item => item.ModuleOrder)
                    .Select(group => new { moduleId = group.Key, Items = group.ToList(), maximum = group.Max(a => a.weightingValue) })
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
                return new PoeModules() { Modules = modulesList };
            }
        }

        public SyncScoreCollection GetSyncScoresOverall(int userid, int poeid, int subid, int usermapping, int type)
        {
            int tid = 0;
            string rid = string.Empty;
            int muid = 0;

            if (type == 1)
            {
                tid = GetRecentSelfFBid(poeid, userid, subid);
                rid = GetOverallRecentRcvdFBidByUser(poeid, userid, subid, usermapping);
                muid = userid;
            }

            var value = new SyncScoreCollection
            {
                TScore = GetSyncScore(tid, muid, poeid, userid, usermapping),
                RScore = GetSyncScoreOverall(rid, muid, poeid, userid, usermapping)
            };
            return value;
        }

        public SyncScoreCollection GetSyncScoresByFbId(int userid, int poeid, int subid, int usermapping, int type, int fbid)
        {
            int tid = 0;
            int rid = 0;
            int muid = 0;
            var fbdetail = GetFeedbackDetailById(fbid);
            Common.Common common = new Common.Common();
            if (type == 1)
            {
                var frmid = fbdetail.RequestedFrom.GetValueOrDefault(0);
                rid = fbid;
                //if (frmid == 0)
                //{
                    tid = GetRecentSelfFBid(poeid, userid, subid);
                //}
                //else
                //{
                //    tid = GetRecentRcvdFBidByUser(poeid, userid, subid, frmid);
                //}
                muid = userid;
            }
            else
            {
                var fbreqfrm = common.GetUserDetailsByMappingId(fbdetail.RequestedFrom.GetValueOrDefault()).User.UserId;
                if (fbreqfrm == userid)
                {
                    int tmuserid = common.GetUserDetailsByFbId(fbid).User.UserId;
                    usermapping = fbdetail.For.GetValueOrDefault();
                    tid = GetRecentTmSelfFBidByUser(usermapping, subid);
                    rid = fbid;
                    muid = tmuserid; //common.GetUserDetailsByMappingId(usermapping).User.UserId;
                }
                else
                {
                    tid = GetRecentSelfFBid(poeid, userid, subid);
                    rid = fbid;
                    muid = userid;
                }
            }
            var value = new SyncScoreCollection
            {
                TScore = GetSyncScore(tid, muid, poeid, userid, usermapping),
                RScore = GetSyncScore(rid, muid, poeid, userid, usermapping)
            };
            return value;
        }

        public SyncScoreCollection GetSyncTeamScore(int userid, int poeid, int subid, int type, string groupid, int mappingid)
        {
            Common.Common common = new Common.Common();
            // var stringfbid = string.Empty;
            string tid = string.Empty;
            string rid = string.Empty;

            var teams = common.GetMyGiveFbTeam(userid, poeid, subid);
            var getFeedbackIds = GetFeedbackList(groupid, mappingid);
            foreach (UserPOEMapping team in teams)
            {
                tid = tid + GetRecentTmSelfFBidByUser(team.UserPOEMappingId, subid) + ",";
            }
            foreach (Feedback team in getFeedbackIds)
            {
                rid = rid + team.FeedbackId + ",";
            }
            tid = tid.Substring(0, tid.Length - 1);
            rid = rid.Substring(0, rid.Length - 1);

            var rvalue = new SyncScoreCollection
            {
                TScore = GetAvgSyncScore(tid, poeid, userid, mappingid),
                RScore = GetAvgSyncScore(rid, poeid, userid, mappingid)
            };

            return rvalue;
        }

        public SyncScoreCollection GetAvgSyncScores(int userid, int poeid, int subid, int type)
        {
            Common.Common common = new Common.Common();
            // var stringfbid = string.Empty;
            string tid = string.Empty;
            string rid = string.Empty;
            //int muid = 0;
            if (type == 1)
            {
                var teams = common.GetMyReceiveFbTeam(userid, poeid, subid);
                tid = GetRecentSelfFBid(poeid, userid, subid).ToString();
                foreach (UserPOEMapping team in teams)
                {
                    rid = rid + GetRecentRcvdFBidByUser(poeid, userid, subid, team.UserPOEMappingId) + ",";
                }
                rid = rid.Substring(0, rid.Length - 1);
            }
            else
            {
                var teams = common.GetMyGiveFbTeam(userid, poeid, subid);
                foreach (UserPOEMapping team in teams)
                {
                    tid = tid + GetRecentTmSelfFBidByUser(team.UserPOEMappingId, subid) + ",";
                }
                foreach (UserPOEMapping team in teams)
                {
                    rid = rid + GetRecentTmRcvdFBid(poeid, userid, subid, team.UserPOEMappingId) + ",";
                }
                tid = tid.Substring(0, tid.Length - 1);
                rid = rid.Substring(0, rid.Length - 1);
            }
            var rvalue = new SyncScoreCollection
            {
                TScore = GetAvgSyncScore(tid, poeid, userid, 0),
                RScore = GetAvgSyncScore(rid, poeid, userid, 0)
            };

            return rvalue;
        }

        public int GetRecentSelfFBid(int poeid, int userid, int subid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var dresult = context.GetMyRecentSelfFeedback(userid, poeid, subid).FirstOrDefault();
                if (dresult != null)
                    return dresult.POEFeedbackId;
                else
                    return 0;
            }
        }

        public int GetRecentRcvdFBid(int poeid, int userid, int subid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var dresult = context.GetMyRecentRcvdFeedback(userid, poeid, 2, subid).FirstOrDefault();
                if (dresult != null)
                    return dresult.POEFeedbackId;
                else
                    return 0;
            }
        }

        public int GetRecentRcvdFBidByUser(int poeid, int userid, int subid, int from)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var dresult = context.GetMyRecentRcvdFeedbackFrmUser(userid, poeid, subid, from).FirstOrDefault();
                if (dresult != null)
                    return dresult.POEFeedbackId;
                else
                    return 0;
            }
        }

        public string GetOverallRecentRcvdFBidByUser(int poeid, int userid, int subid, int from)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                //V3_GetOverallMyRecentRcvdFeedbackFrmUserResult dresult = new V3_GetOverallMyRecentRcvdFeedbackFrmUserResult();
                var dresult = context.GetOverallMyRecentRcvdFeedbackFrmUser(userid, poeid, subid, from).ToList();
                var output = string.Empty;

                if (dresult.Count() != 0)
                {
                    foreach (var k in dresult)
                    {
                        output = k.poefeedbackid + "," + output;
                    }
                    return output.Remove(output.Length - 1);
                }
                else
                {
                    return "";
                }
            }
        }

        public int GetRecentTmSelfFBidByUser(int pemapping, int subid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var dresult = context.GetTMRecentSelfFeedback(pemapping, subid).FirstOrDefault();
                if (dresult != null)
                    return dresult.POEFeedbackId;
                else
                    return 0;
            }
        }

        public int GetRecentTmRcvdFBid(int poeid, int userid, int subid, int pemapping)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var dresult = context.GetTMRecentRcvdFeedback(userid, poeid, subid, pemapping).FirstOrDefault();
                if (dresult != null)
                    return dresult.POEFeedbackId;
                else
                    return 0;
            }
        }

        //public double WcsiScoreDifference(int userid, int poeid, int subid, int usermapping, int type)
        //{
        //    int tid = 0;
        //    int rid = 0;
        //    if (type == 1)
        //    {
        //        tid = GetRecentSelfFBid(poeid, userid, subid);
        //        rid = GetRecentRcvdFBidByUser(poeid, userid, subid, usermapping);
        //    }
        //    else
        //    {
        //        Common.Common common = new Common.Common();
        //        rid = GetRecentTmRcvdFBid(poeid, userid, subid, usermapping);
        //        tid = GetRecentTmSelfFBidByUser(usermapping, subid);
        //    }
        //    var youscore = GetWcsiScore(tid);
        //    var mgrscore = GetWcsiScore(rid);
        //    double diffwcsi = 0;
        //    if (youscore != 0 && mgrscore != 0)
        //    {
        //        diffwcsi = mgrscore - youscore;
        //    }
        //    else
        //    {
        //        diffwcsi = 0;
        //    }

        //    return diffwcsi;
        //}
        public double WcsiScoreDifference(int userid, int poeid, int subid, int usermapping, int type)
        {
            int tid = 0;
            int rid = 0;
            if (type == 1)
            {
                tid = GetRecentSelfFBid(poeid, userid, subid);
                rid = GetRecentRcvdFBidByUser(poeid, userid, subid, usermapping);
            }
            else
            {
                Common.Common common = new Common.Common();
                rid = GetRecentTmRcvdFBid(poeid, userid, subid, usermapping);
                tid = GetRecentTmSelfFBidByUser(usermapping, subid);
            }
            var youscore = GetWcsiScore(tid);
            var mgrscore = GetWcsiScore(rid);
            double diffwcsi = 0;
            if (youscore.ci1 != 0.0 && mgrscore.ci1 != 0.0)
            {
                diffwcsi = (Math.Round(mgrscore.ci1.GetValueOrDefault(0) +
                              mgrscore.ci2.GetValueOrDefault(0), MidpointRounding.AwayFromZero)) -
                              (Math.Round(youscore.ci1.GetValueOrDefault(0) +
                               youscore.ci2.GetValueOrDefault(0), MidpointRounding.AwayFromZero));
            }
            else
            {
                diffwcsi = 0;
            }

            return diffwcsi;
        }
        public double WcsiScoreOfManager(int userid, int poeid, int subid, int usermapping, int type)
        {
           // int tid = 0;
            int rid = 0;
            if (type == 1)
            {
               // tid = GetRecentSelfFBid(poeid, userid, subid);
                rid = GetRecentRcvdFBidByUser(poeid, userid, subid, usermapping);
            }
            else
            {
                Common.Common common = new Common.Common();
                rid = GetRecentTmRcvdFBid(poeid, userid, subid, usermapping);
               // tid = GetRecentTmSelfFBidByUser(usermapping, subid);
            }
           // var youscore = GetWcsiScore(tid);
            var mgrscore = GetWcsiScore(rid);
            double diffwcsi = 0;
            if (mgrscore.ci1 != 0.0)
            {
                diffwcsi = (Math.Round(mgrscore.ci1.GetValueOrDefault(0) +
                                       mgrscore.ci2.GetValueOrDefault(0), MidpointRounding.AwayFromZero));
            }
            else
            {
                diffwcsi = 0;
            }

            return diffwcsi;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="poeid"></param>
        /// <param name="subid"></param>
        /// <param name="usermapping"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public double WcsiScoreDifferenceLatest(int userid, int poeid, int subid, int usermapping, int type)
        {
            int tid = 0;
            int rid = 0;
            if (type == 1)
            {
                tid = GetRecentSelfFBid(poeid, userid, subid);
                rid = GetRecentRcvdFBidByUser(poeid, userid, subid, usermapping);
            }
            else
            {
                Common.Common common = new Common.Common();
                rid = GetRecentTmRcvdFBid(poeid, userid, subid, usermapping);
                tid = GetRecentTmSelfFBidByUser(usermapping, subid);
            }
            var youscore = GetWcsiScore(tid);
            var mgrscore = GetWcsiScore(rid);
            double diffwcsi = 0;
            if (youscore.ci1 != 0.0 && mgrscore.ci1 != 0.0)
            {
                diffwcsi = (Math.Round(mgrscore.ci1.GetValueOrDefault(0) +
                              mgrscore.ci2.GetValueOrDefault(0), MidpointRounding.AwayFromZero)) -
                              (Math.Round(youscore.ci1.GetValueOrDefault(0) +
                               youscore.ci2.GetValueOrDefault(0), MidpointRounding.AwayFromZero));
            }
            else
            {
                diffwcsi = 0;
            }

            return diffwcsi;
        }
        //Newly added for team feedback
        /// <summary>
        ///GetteamMapping
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="subscriptionid"></param>
        /// <returns></returns>
        /*
         public List<UserPOEMapping> GetteamMapping(string groupid)
         {
             using (var context = DataContextFactory.GetIntelliSetDataContext())
             {
                 var results = context.GetUsersByGroupId(groupid).ToList();
                 var poeMappings = results.SelectMany((a, b) => new List<UserPOEMapping>
                                                                    {
                                                                        new UserPOEMapping
                                                                            {
                                                                                UserPOEMappingId = a.PoeMappingID,
                                                                                AreaId = a.ZoneId.GetValueOrDefault(),
                                                                                User = new User
                                                                                           {
                                                                                               UserId = a.userid,
                                                                                               FirstName = a.FirstName,
                                                                                               LastName = a.LastName,
                                                                                               EmailAddress = a.EmailID,
                                                                                               CompanyName =
                                                                                                   a.CompanyName,
                                                                                               CompanySize =
                                                                                                   a.CompanySize,
                                                                                               Subscriptionid =
                                                                                                   a.SubscriptionID,
                                                                                               Country = new Country
                                                                                                             {
                                                                                                                 Id =
                                                                                                                     a.
                                                                                                                     CountryId,
                                                                                                                 Name =
                                                                                                                     Helper
                                                                                                                     .
                                                                                                                     GetCountryName
                                                                                                                     (a.
                                                                                                                          CountryId)
                                                                                                             },
                                                                                               Area = new Zone
                                                                                                          {
                                                                                                              Id =
                                                                                                                  a.
                                                                                                                  ZoneId.
                                                                                                                  GetValueOrDefault
                                                                                                                  (),
                                                                                                              Name =
                                                                                                                  Helper.
                                                                                                                  GetCountryName
                                                                                                                  (a.
                                                                                                                       ZoneId
                                                                                                                       .
                                                                                                                       GetValueOrDefault
                                                                                                                       ())
                                                                                                          }
                                                                                           },
                                                                                POE = new Util.Domain.POE
                                                                                          {
                                                                                              POEId = a.POEId,
                                                                                              Name = a.RoleTitle,
                                                                                          },

                                                                                Designation = new Designation
                                                                                                  {
                                                                                                      DesignationId =
                                                                                                          a.DesignationId,
                                                                                                      Name =
                                                                                                          a.
                                                                                                          DesignationName,
                                                                                                      Level = a.LevelId
                                                                                                  },

                                                                                JobTitle = a.JobTitle
                                                                            }
                                                                    }).ToList();
                 return poeMappings;
             }
         }
         */
        /// <summary>
        ///
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="poeid"></param>
        /// <param name="subid"></param>
        /// <param name="type"></param>
        /// <returns></returns>

        public List<Feedback> GetFeedbackList(string groupid, int usermappingId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetFeedbackId(groupid, usermappingId).ToList();
                var feedbackids = results.SelectMany((a, b) => new List<Feedback>
                                                                   {
                                                                       new Feedback
                                                                           {
                                                                               FeedbackId=a.PoeFeedbackid
                                                                           }
                                                                   }).ToList();
                return feedbackids;
            }
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="poeid"></param>
        /// <param name="subid"></param>
        /// <param name="type"></param>
        /// <returns></returns>

        public double GetSyncWcsiDiffByType(int userid, int poeid, int subid, int type)
        {
            var common = new Common.Common();
            // var stringfbid = string.Empty;
            var tid = string.Empty;
            var rid = string.Empty;
            //int muid = 0;
            if (type == 1)
            {
                var teams = common.GetMyReceiveFbTeam(userid, poeid, subid);
                tid = GetRecentSelfFBid(poeid, userid, subid).ToString();
                rid = teams.Aggregate(rid, (current, team) => current + GetRecentRcvdFBidByUser(poeid, userid, subid, team.UserPOEMappingId) + ",");
                rid = rid.Length != 0 ? rid.Substring(0, rid.Length - 1) : "0";
            }
            else
            {
                var teams = common.GetMyGiveFbTeam(userid, poeid, subid);
                tid = teams.Aggregate(tid, (current, team) => current + GetRecentTmSelfFBidByUser(team.UserPOEMappingId, subid) + ",");
                rid = teams.Aggregate(rid, (current, team) => current + GetRecentTmRcvdFBid(poeid, userid, subid, team.UserPOEMappingId) + ",");
                tid = tid.Length != 0 ? tid.Substring(0, tid.Length - 1) : "0";
                rid = rid.Length != 0 ? rid.Substring(0, rid.Length - 1) : "0";
            }
            if (type == 1)
            {
                var youscore = GetAvgSyncScoreForLanding(tid);
                var mgrscore = GetAvgSyncScoreForLanding(rid);
                double diffwcsi = 0;
                if (youscore != 0 && mgrscore != 0)
                {
                    diffwcsi = Math.Round(mgrscore, MidpointRounding.AwayFromZero) -
                               Math.Round(youscore, MidpointRounding.AwayFromZero);
                }
                else
                {
                    diffwcsi = 0;
                }

                return diffwcsi;
            }
            else
            {
                var k = GetAvgSyncScoreForLandingTeam(tid, rid);
                return k;
            }
        }

        public SyncWcsiDiff GetSyncWcsiDiff(int userid, int poeid, int subid)
        {
            return new SyncWcsiDiff()
                {
                    Youtile = GetSyncWcsiDiffByType(userid, poeid, subid, 1),
                    Teamtile = GetSyncWcsiDiffByType(userid, poeid, subid, 2)
                };
        }

        public V3_GetFeedbackByIdResult GetFeedbackDetailById(int feedbackid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetFeedbackById(feedbackid).FirstOrDefault();
            }
        }

        public SyncScoreCollection GetAvgSyncScoresByFbId(int userid, int poeid, int subid, int type, string fbid)
        {
            var common = new Common.Common();
            // var stringfbid = string.Empty;
            var tid = string.Empty;
            var rid = string.Empty;
            var muid = 0;
            if (type == 1)
            {
                //var teams = common.GetMyReceiveFbTeam(userid, poeid, subid);
                tid = fbid;
                var teams = common.GetMyReceiveFbTeam(userid, poeid, subid);
                rid = teams.Aggregate(rid, (current, team) => current + GetRecentRcvdFBidByUser(poeid, userid, subid, team.UserPOEMappingId) + ",");
                rid = rid.Substring(0, rid.Length - 1);
            }
            else
            {
                var teams = common.GetMyGiveFbTeam(userid, poeid, subid);
                tid = teams.Aggregate(tid, (current, team) => current + GetRecentTmSelfFBidByUser(team.UserPOEMappingId, subid) + ",");
                rid = fbid;
                // muid = common.GetUserDetailsByMappingId(usermapping).User.UserId;
            }
            if (string.IsNullOrEmpty(tid))
            {
                tid = "0";
            }
            if (string.IsNullOrEmpty(rid))
            {
                rid = "0";
            }
            var rvalue = new SyncScoreCollection
            {
                TScore = GetAvgSyncScore(tid, poeid, userid, 0),
                RScore = GetAvgSyncScore(rid, poeid, userid, 0)
            };

            return rvalue;
        }

        /* public double GetAvgSyncScoreForTile(string fbid)
         {
             using (var context = DataContextFactory.GetIntelliSetDataContext())
             {
                 var v3GetAvgSyncScoreResult = context.GetAvgSyncScore(fbid).FirstOrDefault();
                 if (v3GetAvgSyncScoreResult != null)
                     return v3GetAvgSyncScoreResult.SyncScore.GetValueOrDefault(0);
                 else
                     return 0;
             }
         }
         */

        public double GetAvgSyncScoreForLanding(string fbid)
        {
            int[] toidlist;
            if (fbid.Substring(fbid.Length - 1, 1) == ",")
            {
                toidlist = Array.ConvertAll(fbid.Substring(0, fbid.Length - 1).Split(','), new Converter<string, int>(int.Parse)).Where(a => a != 0).ToArray();
            }
            else
                toidlist = Array.ConvertAll(fbid.Split(','), new Converter<string, int>(int.Parse)).Where(a => a != 0).ToArray();

            double total = toidlist.Select(GetWcsiScore).Aggregate<V3_GetWCSIScoreResult, double>(0, (current, wcsi) => current + Math.Round(wcsi.ci1.GetValueOrDefault(0), MidpointRounding.AwayFromZero) + Math.Round(wcsi.ci2.GetValueOrDefault(0), MidpointRounding.AwayFromZero));

            var avrg = total / toidlist.Count();
            if (total != 0)
            {
                return avrg;
            }
            else
            {
                return 0;
            }

            //return 0;
            /* using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var v3GetAvgSyncScoreResult = context.GetAvgSyncScore(fbid).FirstOrDefault();
                if (v3GetAvgSyncScoreResult != null)
                    return v3GetAvgSyncScoreResult.SyncScore.GetValueOrDefault(0);
                else
                    return 0;
            }*/
        }

        //public double GetAvgSyncScoreForLandingTeam(string fbid, string tmid)
        //{
        //    int[] toidlist;
        //    int[] toidlisttm;
        //    double totalateam = 0;
        //    double totalself = 0;
        //    double overallscore = 0;
        //    var count = 0;
        //    var self = new List<double>();
        //    var team = new List<double>();
        //    if (fbid.Substring(fbid.Length - 1, 1) == ",")
        //    {
        //        toidlist = Array.ConvertAll(fbid.Substring(0, fbid.Length - 1).Split(','),
        //                                    new Converter<string, int>(int.Parse));
        //    }
        //    else
        //        toidlist = Array.ConvertAll(fbid.Split(','), new Converter<string, int>(int.Parse));

        //    if (tmid.Substring(tmid.Length - 1, 1) == ",")
        //    {
        //        toidlisttm = Array.ConvertAll(tmid.Substring(0, tmid.Length - 1).Split(','),
        //                                      new Converter<string, int>(int.Parse));
        //    }
        //    else
        //        toidlisttm = Array.ConvertAll(tmid.Split(','), new Converter<string, int>(int.Parse));

        //    foreach (int i in toidlist)
        //    {
        //        if (i != 0)
        //        {
        //            //var wcsi = GetWcsiScore(i);
        //            var score = GetWcsiScore(i);
        //            self.Add(score);
        //        }
        //        else
        //        {
        //            self.Add(0);
        //        }
        //    }

        //    foreach (int j in toidlisttm)
        //    {
        //        if (j != 0)
        //        {
        //            //var wcsi = GetWcsiScore(j);
        //            var score = GetWcsiScore(j);
        //            team.Add(score);
        //        }
        //        else
        //        {
        //            team.Add(0);
        //        }
        //    }
        //    for (var k = 0; k < team.Count; k++)
        //    {
        //        if (team[k] != 0 && self[k] != 0)
        //        {
        //            totalateam = totalateam + team[k];
        //            totalself = totalself + self[k];
        //            count++;
        //        }
        //    }
        //    if (count != 0)
        //    {
        //        overallscore = ((totalateam / count) - (totalself / count));
        //        return Math.Round(overallscore, MidpointRounding.AwayFromZero);
        //    }
        //    else
        //    {
        //        return 0;
        //    }

        //    //return 0;
        //    /* using (var context = DataContextFactory.GetIntelliSetDataContext())
        //    {
        //        var v3GetAvgSyncScoreResult = context.GetAvgSyncScore(fbid).FirstOrDefault();
        //        if (v3GetAvgSyncScoreResult != null)
        //            return v3GetAvgSyncScoreResult.SyncScore.GetValueOrDefault(0);
        //        else
        //            return 0;
        //    }*/
        //}
        public double GetAvgSyncScoreForLandingTeam(string fbid, string tmid)
        {
            int[] toidlist;
            int[] toidlisttm;
            double totalateam = 0;
            double totalself = 0;
            double overallscore = 0;
            var count = 0;
            var self = new List<double>();
            var team = new List<double>();
            if (fbid.Substring(fbid.Length - 1, 1) == ",")
            {
                toidlist = Array.ConvertAll(fbid.Substring(0, fbid.Length - 1).Split(','),
                                            new Converter<string, int>(int.Parse));
            }
            else
                toidlist = Array.ConvertAll(fbid.Split(','), new Converter<string, int>(int.Parse));

            if (tmid.Substring(tmid.Length - 1, 1) == ",")
            {
                toidlisttm = Array.ConvertAll(tmid.Substring(0, tmid.Length - 1).Split(','),
                                              new Converter<string, int>(int.Parse));
            }
            else
                toidlisttm = Array.ConvertAll(tmid.Split(','), new Converter<string, int>(int.Parse));

            foreach (int i in toidlist)
            {
                if (i != 0)
                {
                    var wcsi = GetWcsiScore(i);
                    var score = Math.Round(wcsi.ci1.GetValueOrDefault(0) +
                                wcsi.ci2.GetValueOrDefault(0), MidpointRounding.AwayFromZero);
                    self.Add(score);
                }
                else
                {
                    self.Add(0);
                }
            }

            foreach (int j in toidlisttm)
            {
                if (j != 0)
                {
                    var wcsi = GetWcsiScore(j);
                    var score = Math.Round(wcsi.ci1.GetValueOrDefault(0) +
                                wcsi.ci2.GetValueOrDefault(0), MidpointRounding.AwayFromZero);
                    team.Add(score);
                }
                else
                {
                    team.Add(0);
                }
            }
            for (var k = 0; k < team.Count; k++)
            {
                if (team[k] != 0 && self[k] != 0)
                {
                    totalateam = totalateam + team[k];
                    totalself = totalself + self[k];
                    count++;
                }
            }
            if (count != 0)
            {
                overallscore = ((totalateam / count) - (totalself / count));
                return Math.Round(overallscore, MidpointRounding.AwayFromZero);
            }
            else
            {
                return 0;
            }

            //return 0;
            /* using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var v3GetAvgSyncScoreResult = context.GetAvgSyncScore(fbid).FirstOrDefault();
                if (v3GetAvgSyncScoreResult != null)
                    return v3GetAvgSyncScoreResult.SyncScore.GetValueOrDefault(0);
                else
                    return 0;
            }*/
        }

        //public SyncScore GetSyncScore(int feedbackid, int muid, int poeid, int userid)
        //{
        //    var wcsi = GetWcsiScore(feedbackid);
        //    return new SyncScore()
        //        {
        //            //  Childindex1Score = (Math.Round(wcsi.ci1.GetValueOrDefault(0), MidpointRounding.AwayFromZero)) * 2,
        //            //WcsiScore = GetTotalScore(feedbackid),
        //            //Childindex2Score = (Math.Round(wcsi.ci2.GetValueOrDefault(0), MidpointRounding.AwayFromZero)) * 2,
        //            WcsiScore = GetWcsiScore(feedbackid),// Math.Round(wcsi.ci1.GetValueOrDefault(0) + wcsi.ci2.GetValueOrDefault(0), MidpointRounding.AwayFromZero),
        //            ModuleScores = GetModuleAverage(feedbackid, poeid, muid, userid)
        //        };
        //}
        public SyncScore GetSyncScore(int feedbackid, int muid, int poeid, int userid, int mappingUserId)
        {
            var wcsi = GetWcsiScore(feedbackid);
            return new SyncScore()
            {
                //Childindex1Score = (Math.Round(wcsi.ci1.GetValueOrDefault(0), MidpointRounding.AwayFromZero)) * 2,
                //WcsiScore = GetTotalScore(feedbackid),
                // Childindex2Score = (Math.Round(wcsi.ci2.GetValueOrDefault(0), MidpointRounding.AwayFromZero)) * 2,
                WcsiScore = Math.Round(wcsi.ci1.GetValueOrDefault(0) + wcsi.ci2.GetValueOrDefault(0), MidpointRounding.AwayFromZero),
                ModuleScores = GetModuleAverage(feedbackid, poeid, muid, userid, mappingUserId)
            };
        }

        public SyncScore GetSyncScoreOverall(string feedbackid, int muid, int poeid, int userid, int mappingUserId)
        {
            return new SyncScore()
            {
                ModuleScores = GetOverallModuleAverage(feedbackid, poeid, muid, userid, mappingUserId)
            };
        }

        public SyncScore GetAvgSyncScore(string feedbackid, int poeid, int userid, int mappingUserId)
        {
            var wcsi = GetWcsiScore(feedbackid);
            return new SyncScore()
            {
                //Childindex1Score = (Math.Round(wcsi.ci1.GetValueOrDefault(0), MidpointRounding.AwayFromZero)) * 2,
                //Childindex2Score = (Math.Round(wcsi.ci2.GetValueOrDefault(0), MidpointRounding.AwayFromZero)) * 2,
                WcsiScore = GetWcsiScore(feedbackid),//Math.Round(wcsi.ci1.GetValueOrDefault(0) + wcsi.ci2.GetValueOrDefault(0), MidpointRounding.AwayFromZero),
                ModuleScores = GetAvgModuleAverage(feedbackid, poeid, userid, mappingUserId)
            };
        }

        //public double GetWcsiScore(int fbid)
        //{
        //    using (var context = DataContextFactory.GetIntelliSetDataContext())
        //    {
        //        var result = context.GetWCSIPerModuleByFbId(fbid.ToString()).ToList();
        //        return Math.Round(result.Sum(a => Math.Round(a.WCSIPermod.GetValueOrDefault(0), MidpointRounding.AwayFromZero)), MidpointRounding.AwayFromZero);
        //    }
        //}
        public V3_GetWCSIScoreResult GetWcsiScore(int fbid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetWCSIScore(fbid).FirstOrDefault();
            }
        }

        public double GetWcsiScore(string fbid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var result = context.GetWCSIPerModuleByFbId(fbid.ToString()).ToList();
                return Math.Round(result.Sum(a => Math.Round(a.WCSIPermod.GetValueOrDefault(0), MidpointRounding.AwayFromZero)), MidpointRounding.AwayFromZero);
            }
        }

        //public List<SyncModuleScore> GetModuleAverage(int fbid, int poeid, int muid, int userid)
        //{
        //    using (var context = DataContextFactory.GetIntelliSetDataContext())
        //    {
        //        return context.GetWCSIPerModule(fbid.ToString(), poeid.ToString()).ToList().SelectMany(
        //        (a, b) => a.Maxscore != null ? new List<SyncModuleScore>
        //        {
        //            new SyncModuleScore()
        //            {
        //                ModuleName = a.ModuleName,
        //                Moduleid = a.ModuleId,
        //                ModuleOrderNumber = a.ModuleOrder,
        //                TotalModulescore = (a.WCSIPermod!=null ?(int)(((float) a.WCSIPermod/(float) a.Maxscore)*100):0),
        //                WeightageScore = a.Maxscore,
        //                //Modulescore =  Math.Round((a.WCSIPermod ?? 0), MidpointRounding.AwayFromZero),
        //                 Modulescore = a.WCSIPermod ?? 0,
        //                QuestionScores =
        //                    GetSyncResult(fbid, a.ModuleId, poeid, muid, userid)
        //            }
        //        } : null).ToList();
        //    }
        //}
        public List<SyncModuleScore> GetModuleAverage(int fbid, int poeid, int muid, int userid, int mappingUserId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetModuleAverage(fbid, poeid).ToList().SelectMany(
                (a, b) => new List<SyncModuleScore>
                                      {
                                          new SyncModuleScore()
                                              {
                                                  ModuleName = a.ModuleName,
                                                  Moduleid = a.POEModuleId,
                                                  ModuleOrderNumber = a.ModuleOrder,
                                                  TotalModulescore =(a.ModuleWeightage!=null?
                                                      ((int)
                                                      (((float) a.ModuleWeightage/(float) a.MaxWeightage)*100)):0),
                                                  WeightageScore = a.MaxWeightage,
                                                  Modulescore =(a.ModuleWeightage!=null?Math.Round((double) a.ModuleWeightage):0),
                                                  ModuleScoreAvg = a.AvgAnswer,
                                                  ModuleScorePercentage = a.Percentage.GetValueOrDefault(0),
                                                  QuestionScores =
                                                      GetSyncResult(fbid, a.POEModuleId, poeid, muid, userid,mappingUserId)
                                              }
                                      }).ToList();
            }
        }

        public List<SyncModuleScore> GetOverallModuleAverage(string fbid, int poeid, int muid, int userid, int mappingUserId)
        {
            if (fbid == "")
            {
                fbid = "0";
            }
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetWCSIPerModule(fbid, poeid.ToString()).ToList().SelectMany(
                (a, b) => a.Maxscore != null ? new List<SyncModuleScore>
                {
                    new SyncModuleScore()
                    {
                        ModuleName = a.ModuleName,
                        Moduleid = a.ModuleId,
                        ModuleOrderNumber = a.ModuleOrder,
                        TotalModulescore = (a.WCSIPermod!=null ?(int)(((float) a.WCSIPermod/(float) a.Maxscore)*100):0),
                        WeightageScore = a.Maxscore,
                        Modulescore =  Math.Round((a.WCSIPermod ?? 0), MidpointRounding.AwayFromZero),
                        QuestionScores =
                            GetOverallSyncResult(fbid, a.ModuleId, poeid, muid, userid,mappingUserId)
                    }
                } : null).ToList();
            }
        }

        public List<SyncModuleScore> GetAvgModuleAverage(string fbid, int poeid, int userid, int mappingUserId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetWCSIPerModule(fbid, poeid.ToString()).ToList().SelectMany(
                        (a, b) => new List<SyncModuleScore>
                            {
                                new SyncModuleScore()
                                    {
                                       ModuleName = a.ModuleName,
                                        Moduleid = a.ModuleId,
                                        ModuleScoreAvg = a.WCSIPermod.GetValueOrDefault(0),
                                       // ModuleScorePercentage = a.Percentage.GetValueOrDefault(0),
                                        QuestionScores = GetAvgSyncResult(fbid,a.ModuleId.ToString(),poeid,userid,mappingUserId)
                                    }
                            }).ToList();
            }
        }

        public List<SyncQuestionScore> GetSyncResult(int fbid, int moduleid, int poeid, int mpinguserid, int userid, int mappingUserId)
        {
            Goal.GoalDataAccess goalDataAccess = new GoalDataAccess();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetFeedbackResult(fbid, moduleid).ToList().SelectMany(
                        (a, b) => new List<SyncQuestionScore>
                            {
                                new SyncQuestionScore()
                                    {
                                        ShortQuetionText = RemoveHtml(a.ShortQuestion),
                                        QuetionText = RemoveHtml(a.Question),
                                        QuestionId = a.QuestionId,
                                        Score = a.Answer.GetValueOrDefault(0),
                                        ScorePercentage = a.Percentage.GetValueOrDefault(0),
                                        SelectedGoalValue = GetSelectedGoalValue(mpinguserid,a.QuestionId,userid),
                                        Goal = GetGoal(mpinguserid,a.QuestionId,userid),
                                        IsShared = IsShared(mpinguserid,a.QuestionId,userid),
                                        GoalGap = 4- a.Answer.GetValueOrDefault(0),
                                        GoalExpired = IsGoalExpired(mpinguserid,a.QuestionId,userid),
                                        GoalSetedOn = GetGoalSetedOn(mpinguserid,a.QuestionId,userid),
                                        GoalSetedOnStr = GetGoalSetedOnStr(mpinguserid,a.QuestionId,userid),
                                        GoalMonthDiff = GetGoalDiff(mpinguserid,a.QuestionId,userid),
                                        GoalCompletedMonth = GetGoalCompletedMonths(mpinguserid,a.QuestionId,userid),
                                        IsGoalShared = GetGoalShared(userid,mappingUserId,poeid,a.QuestionId),
                                        FBDate =(a.CreatedOn!=null)? Convert.ToDateTime(a.CreatedOn).ToString("MMMM dd, yyyy") : ""
                                    }
                            }).ToList();
            }
        }

        public List<SyncQuestionScore> GetOverallSyncResult(string fbid, int moduleid, int poeid, int mpinguserid, int userid, int mappingUserId)
        {
            Goal.GoalDataAccess goalDataAccess = new GoalDataAccess();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetOverallQuestionairAverage(fbid, moduleid).ToList().SelectMany(
                        (a, b) => new List<SyncQuestionScore>
                            {
                                new SyncQuestionScore()
                                    {
                                        ShortQuetionText = RemoveHtml(a.ShortQuestion),
                                        QuetionText = RemoveHtml(a.Question),
                                        QuestionId = a.QuestionId.GetValueOrDefault(0),
                                        Score = a.Answer.GetValueOrDefault(0),
                                        ScorePercentage = a.Percentage.GetValueOrDefault(0),
                                        SelectedGoalValue = GetSelectedGoalValue(mpinguserid,a.QuestionId.GetValueOrDefault(0),userid),
                                        Goal = GetGoal(mpinguserid,a.QuestionId.GetValueOrDefault(0),userid),
                                        IsShared = IsShared(mpinguserid,a.QuestionId.GetValueOrDefault(0),userid),
                                        GoalGap = 4- a.Answer.GetValueOrDefault(0),
                                        GoalExpired = IsGoalExpired(mpinguserid,a.QuestionId.GetValueOrDefault(0),userid),
                                        GoalSetedOn = GetGoalSetedOn(mpinguserid,a.QuestionId.GetValueOrDefault(0),userid),
                                        GoalSetedOnStr = GetGoalSetedOnStr(mpinguserid,a.QuestionId.GetValueOrDefault(0),userid),
                                        GoalMonthDiff = GetGoalDiff(mpinguserid,a.QuestionId.GetValueOrDefault(0),userid),
                                        GoalCompletedMonth = GetGoalCompletedMonths(mpinguserid,a.QuestionId.GetValueOrDefault(0),userid),
                                        IsGoalShared = GetGoalShared(userid,mappingUserId,poeid,a.QuestionId.GetValueOrDefault(0)),
                                        FBDate =(a.createdon!=null)? Convert.ToDateTime(a.createdon).ToString("MMMM dd, yyyy") : ""
                                    }
                            }).ToList();
            }
        }

        public List<SyncQuestionScore> GetAvgSyncResult(string fbid, string moduleid, int poeid, int userid, int mappingUserid)
        {
            Goal.GoalDataAccess goalDataAccess = new GoalDataAccess();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetAvgFeedbackResult(fbid, moduleid, userid).ToList().SelectMany(
                        (a, b) => new List<SyncQuestionScore>
                            {
                                new SyncQuestionScore()
                                    {
                                        ShortQuetionText = RemoveHtml(a.ShortQuestion),
                                        QuetionText = RemoveHtml(a.Question),
                                        QuestionId = a.QuestionId.GetValueOrDefault(),
                                        Score = a.Answer.GetValueOrDefault(0),
                                        ScorePercentage = a.Percentage.GetValueOrDefault(0),
                                        SelectedGoalValue =0,
                                        Goal = 0,
                                        IsShared = false,
                                        GoalGap = 4- a.Answer.GetValueOrDefault(0),
                                        GoalExpired =false,
                                        GoalSetedOn = new DateTime(),
                                        GoalSetedOnStr = string.Empty,
                                        GoalMonthDiff=0,
                                        GoalCompletedMonth =0,
                                        IsGoalShared = GetGoalShared(userid,mappingUserid,poeid,a.QuestionId.GetValueOrDefault())
                                    }
                            }).ToList();
            }
        }

        public int GetTotalScore(int feedbackid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var totalsum = context.GetOverallSum(feedbackid).FirstOrDefault();
                if (totalsum != null)
                {
                    if (totalsum.TotalModuleScore != null)
                        return totalsum.TotalModuleScore.Value;
                }
                else
                {
                    return 0;
                }
            }
            return 0;
        }

        public int GetSelectedGoalValue(int shrduserId, int questionId, int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                if (userid == 0)
                {
                    var v3GetMyGoalsResult = context.GetMyGoals(shrduserId, questionId).FirstOrDefault();
                    if (v3GetMyGoalsResult != null)
                        return v3GetMyGoalsResult.Selectedvalue;
                    else
                        return 0;
                }
                else
                {
                    var v3GetMyGoalsResult = context.GetGoalsSharedWithMeByuser(userid, questionId, shrduserId).FirstOrDefault();
                    if (v3GetMyGoalsResult != null)
                        return v3GetMyGoalsResult.Selectedvalue;
                    else
                        return 0;
                }
            }
        }

        public int GetGoal(int shrduserId, int questionId, int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                if (userid == 0)
                {
                    var v3GetMyGoalsResult = context.GetMyGoals(shrduserId, questionId).FirstOrDefault();
                    if (v3GetMyGoalsResult != null)
                        return v3GetMyGoalsResult.Goal;
                    else
                        return 4;
                }
                else
                {
                    var v3GetMyGoalsResult = context.GetGoalsSharedWithMeByuser(userid, questionId, shrduserId).FirstOrDefault();
                    if (v3GetMyGoalsResult != null)
                        return v3GetMyGoalsResult.Goal;
                    else
                        return 4;
                }
            }
        }

        public bool IsGoalExpired(int shrduserId, int questionId, int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var a = context.GetGoalsSharedWithMeByuser(userid, questionId, shrduserId).FirstOrDefault();
                if (a != null)
                {
                    var goalval = 0;
                    switch (a.Selectedvalue)
                    {
                        case 1:
                            goalval = 0;
                            break;

                        case 2:
                            goalval = 6;
                            break;

                        case 3:
                            goalval = 12;
                            break;

                        case 4:
                            goalval = 24;
                            break;
                    }
                    return (DateTime.Now > a.CreatedOn.AddMonths(goalval));
                }
                else
                    return false;
            }
        }

        public int GetGoalDiff(int shrduserId, int questionId, int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var a = context.GetGoalsSharedWithMeByuser(userid, questionId, shrduserId).FirstOrDefault();
                if (a != null)
                {
                    var goalval = 0;
                    switch (a.Selectedvalue)
                    {
                        case 1:
                            goalval = 0;
                            break;

                        case 2:
                            goalval = 6;
                            break;

                        case 3:
                            goalval = 12;
                            break;

                        case 4:
                            goalval = 24;
                            break;
                    }

                    return (a.CreatedOn.AddMonths(goalval).Subtract(DateTime.Now).Days) / 30;
                    //return DateTime.Now.Month - a.CreatedOn.AddMonths(goalval).Month;
                }

                return 0;
            }
        }

        public int GetGoalCompletedMonths(int shrduserId, int questionId, int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var a = context.GetGoalsSharedWithMeByuser(userid, questionId, shrduserId).FirstOrDefault();
                if (a != null)
                {
                    return (DateTime.Now.Subtract(a.CreatedOn).Days) / 30;
                    //return DateTime.Now.Month - a.CreatedOn.AddMonths(goalval).Month;
                }

                return 0;
            }
        }

        public DateTime GetGoalSetedOn(int shrduserId, int questionId, int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var a = context.GetGoalsSharedWithMeByuser(userid, questionId, shrduserId).FirstOrDefault();
                if (a != null)
                    return a.CreatedOn;
                else
                    return new DateTime();
            }
        }

        public string GetGoalSetedOnStr(int shrduserId, int questionId, int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var a = context.GetGoalsSharedWithMeByuser(userid, questionId, shrduserId).FirstOrDefault();
                if (a != null)
                    return a.CreatedOn.ToString("MMM") + " " + a.CreatedOn.ToString("dd") + ", " + a.CreatedOn.Year;
                else
                    return "Goal Not Set";
            }
        }

        public bool IsShared(int shrduserId, int questionId, int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var v3GetMyGoalsResult = context.GetGoalsSharedWithMeByuser(userid, questionId, shrduserId).FirstOrDefault();
                if (v3GetMyGoalsResult != null)
                    return true;
                else
                    return false;
            }
        }

        public string RemoveHtml(string text)
        {
            string returntext = string.Empty;

            returntext = text.Replace("<p><strong>", "").Replace("</strong></p>", "");

            return returntext;
        }

        public List<Util.Domain.POE> GetUserPoeByType(int userid, int subid, int type)
        {
            if (type == 1)
            {
                using (var context = DataContextFactory.GetIntelliSetDataContext())
                {
                    return
                        context.GetMyTakePoes(userid, subid).ToList().SelectMany(
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
            else
            {
                using (var context = DataContextFactory.GetIntelliSetDataContext())
                {
                    return
                        context.GetMyGivePoes(userid, subid).ToList().SelectMany(
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
        }

        public bool GetGoalShared(int userId, int userMappingId, int poeId, int questionId)
        {
            //userMappingId = (userId == userMappingId ? 0 : userMappingId);
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetGoalShared(userId, userMappingId, poeId, questionId).Any();
                return results;
            }
        }
    }
}