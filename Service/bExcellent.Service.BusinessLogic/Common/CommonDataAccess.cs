using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Net.Mail;
using bExcellent.Service.BusinessLogic.UserAdmin;
using bExcellent.Service.DataAccess;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Enumeration;

using System.IO;
using bExcellent.Service.BusinessLogic.Authentiation;
using bExcellent.Service.Util.Request;
using bExcellent.Service.Util.Response;
using Notification = bExcellent.Service.Util.Response.Notification;
using TimeZone = bExcellent.Service.Util.Domain.TimeZone;

namespace bExcellent.Service.BusinessLogic.Common
{
    public class CommonDataAccess
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

        public List<Util.Domain.POE> GetAllPoEs()
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetAllPoes().ToList()
                    .SelectMany((a, b) => new List<Util.Domain.POE>
                                              {
                                                  new Util.Domain.POE
                                                      {
                                                          POEId = a.Id,
                                                          Name = a.Name,
                                                          IntroContent = a.IntroContent,
                                                          PoeFlag=Convert.ToInt32(a.Flag)
                                                      }
                                              }).ToList();
            }
        }

        public List<Util.Domain.POE> GetSubscribedPoes(int subId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetSubscribedPoes(subId).ToList()
                    .SelectMany((a, b) => new List<Util.Domain.POE>
                                              {
                                                  new Util.Domain.POE
                                                      {
                                                          POEId = a.Poeid,
                                                          Name = a.Name,
                                                          IntroContent = a.IntroContent,
                                                          SubscribedPoeDate=a.createdon.ToString(),
                                                          PoeFlag=Convert.ToInt32(a.Flag)
                                                      }
                                              }).ToList();
            }
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="subId"></param>
        /// <returns></returns>
        public List<Util.Domain.POE> GetSubscribedPoesList(int userid, int subId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetSubsctibedPoeLists(userid, subId).ToList()
                    .SelectMany((a, b) => new List<Util.Domain.POE>
                                              {
                                                  new Util.Domain.POE
                                                      {
                                                          POEId = a.POEId,
                                                          Name = a.Name,
                                                          IntroContent = a.IntroContent,
                                                          SubscribedPoeDate=a.Createdon.ToString(),
                                                          PoeFlag=Convert.ToInt32(a.Flag)
                                                      }
                                              }).ToList();
            }
        }
        /// <summary>
        /// Get User FB Status
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="poeid"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public int GetUserFBStatus(int userid, int poeid, int type)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var fbDetail = context.GetUserFBStatus(userid, poeid, type);
                return (int)fbDetail.FirstOrDefault().FBCount;
            }
        }
        /// <summary>
        /// GetAccountDetail
        /// </summary>
        /// <param name="subId"></param>
        /// <returns></returns>
        public List<Util.Domain.Accounts> GetAccountDetail(int subId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetAccountsData(subId).ToList()
                    .SelectMany((a, b) => new List<Util.Domain.Accounts>
                                              {
                                                  new Util.Domain.Accounts
                                                      {
                                                          Userid=a.userid,
                                                          //DesignationId=a.LevelId,
                                                          EmailId=a.EmailId,
                                                          //DesignationName=a.DesignationName,
                                                          Firstname=a.FirstName,
                                                          Lastname=a.LastName,
                                                          SubscribedDate=a.SubscribedDate.ToString(),
                                                          TrialDate=a.TrialDate.ToString(),
                                                          //Photo=a.picture,
                                                          PlanId= a.planid,
                                                          UserCost= a.UserCost,
                                                          PoeCost=a.POECost,
                                                          Poes = GetSubscribedPoes(subId),
                                                          SubscribedUserDate=a.createdon.ToString()
                                                      }
                                              }).ToList();
            }
        }

        /// <summary>
        /// GetSubscribedUsers
        /// </summary>
        /// <param name="subId"></param>
        /// <returns></returns>
        public List<Util.Domain.User> GetSubscribedUserWall(int userid, int subId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetSubscribedUsers(userid, subId).ToList()
                    .SelectMany((a, b) => new List<Util.Domain.User>
                                              {
                                                  new Util.Domain.User
                                                      {
                                                         UserId = a.id,
                                                         FirstName=a.firstname,
                                                         LastName=a.lastname,
                                                         EmailAddress=a.emailid,
                                                         Subscriptionid=a.subid
                                                      }
                                              }).ToList();
            }
        }

        /// <summary>
        /// Gets the po es by user id.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <returns></returns>
        public IList<MinimizedPOE> GetPoEsByUserId(int userId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetPOEDataForAUser(userId).ToList()
                    .SelectMany((a, b) => new List<MinimizedPOE>
                                              {
                                                  new MinimizedPOE
                                                      {
                                                          POEId = a.Id,
                                                          POEName = a.POEName,
                                                          NoOfModule = a.NoOfModule,
                                                          QuestionPerModule = a.QuestionPerModule,
                                                          RoleTitle = a.RoleName,
                                                          RoleLevel = a.LevelId
                                                      }
                                              }).ToList();
            }
        }

        public IList<MinimizedPOE> GetMySubscribedPoes(int subId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetSubscribedPoes(subId).ToList()
                    .SelectMany((a, b) => new List<MinimizedPOE>
                                              {
                                                  new Util.Domain.MinimizedPOE
                                                      {
                                                          POEId = a.Poeid,
                                                          POEName = a.Name,
                                                      }
                                              }).ToList();
            }
        }

        public IList<MinimizedPOE> GetMySubscribedPoeList(int userid, int subId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetUserPoeList(userid, subId).ToList()
                    .SelectMany((a, b) => new List<MinimizedPOE>
                                              {
                                                  new Util.Domain.MinimizedPOE
                                                      {
                                                          POEId = (int) a.POEId,
                                                          POEName = a.Name,
                                                          IsSurvey=(a.Survey==true)?1:0,
                                                          IsCapability=(a.Capability==true)?1:0
                                                      }
                                              }).ToList();
            }
        }
        public IList<MinimizedPOE> GetSubscripedPoeByResultMode(int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetUserPoeByResultMode(userid).ToList()
                    .SelectMany((a, b) => new List<MinimizedPOE>
                                              {
                                                  new Util.Domain.MinimizedPOE
                                                      {
                                                          POEId = (int) a.Id,
                                                          POEName = a.Name
                                                      }
                                              }).ToList();
            }
        }
        public List<Network> GetMySubscription(string emailId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetMySubscription(emailId).ToList()
                    .SelectMany((a, b) => new List<Network>
                                              {
                                                  new Util.Domain.Network
                                                      {
                                                         EmailId = emailId,
                                                         NetworkName = a.NetworkName,
                                                         Subscriptionid = a.SubscriptionID,
                                                         Plan = a.PlanId.GetValueOrDefault()
                                                      }
                                              }).ToList();
            }
        }

        /// <summary>
        /// Gets the user role.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeid">The poeid.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        public int GetUserRole(int userId, int poeid, int subscriptionid)
        {
            int roleid = 0;
            string role = string.Empty;

            List<int> roles = new List<int>();
            List<UserPOEMapping> usermapping =
                GetUserMapping(userId, subscriptionid).Where(a => a.POE.POEId == poeid).ToList();

            List<UserPOEMapping> teamUsermapping = usermapping.Where(a => a.Designation.DesignationId == (int)NetworkUserFilterType.PeerTeam || a.Designation.DesignationId == (int)NetworkUserFilterType.TeamMember).ToList();
            if (teamUsermapping.Count > 0)
                role = role + "1";

            List<UserPOEMapping> managerUsermapping = usermapping.Where(a => a.Designation.DesignationId == (int)NetworkUserFilterType.Manager || a.Designation.DesignationId == (int)NetworkUserFilterType.SkipLevelManager || a.Designation.DesignationId == (int)NetworkUserFilterType.Customer || a.Designation.DesignationId == (int)NetworkUserFilterType.PeerManager).ToList(); ;
            if (managerUsermapping.Count > 0)
                role = role + "2";
            int.TryParse(role, out roleid);

            return roleid;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="subscriptionid"></param>
        /// <returns></returns>
        public int CheckMapping(int userId, int subscriptionid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var network = context.CheckNetworkMapping(userId, subscriptionid);
                return (int)network.FirstOrDefault().Column1;
            }
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="tomailid"></param>
        /// <param name="frmMailid"></param>
        /// <param name="imageurl"></param>
        /// <param name="subject"></param>
        /// <param name="groupid"></param>
        /// <param name="desc"></param>
        /// <param name="yammertoken"></param>
        public void InsertYammerContent(string tomailid, string frmMailid, string imageurl, string subject, string groupid, string desc, string yammertoken)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.InsertYammerContent(tomailid, frmMailid, imageurl, subject, groupid, desc, yammertoken);
            }
        }

        /// <summary>
        /// Gets the user mapping.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetUserMapping(int userId, int subscriptionid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetUserRoles(userId, subscriptionid).ToList();
                var poeMappings = results.SelectMany((a, b) => new List<UserPOEMapping>
                                                                   {
                                                                       new UserPOEMapping
                                                                           {
                                                                               UserPOEMappingId = a.UserPOEMappingId,
                                                                               AreaId = a.ZoneId.GetValueOrDefault(),
                                                                               User = new User
                                                                                          {
                                                                                              UserId = userId,
                                                                                              FirstName = a.FirstName,
                                                                                              LastName = a.LastName,
                                                                                              EmailAddress = a.EmailId,
                                                                                              CompanyName =
                                                                                                  a.CompanyName,
                                                                                              CompanySize =
                                                                                                  a.CompanySize,
                                                                                              Subscriptionid =
                                                                                                  a.subscriptionid,
                                                                                              Country = new Country
                                                                                                            {
                                                                                                                Id =
                                                                                                                    a.
                                                                                                                    COuntryId,
                                                                                                                Name =
                                                                                                                    Helper
                                                                                                                    .
                                                                                                                    GetCountryName
                                                                                                                    (a.
                                                                                                                         COuntryId)
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
                                                                                             Name = a.POEName,
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

        /// <summary>
        ///GetUserMappingWithArea
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="subscriptionid"></param>
        /// <returns></returns>
        public List<UserPOEMapping> GetUserMappingWithArea(int userId, int subscriptionid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetUserRolesWithArea(userId, subscriptionid).ToList();
                var poeMappings = results.SelectMany((a, b) => new List<UserPOEMapping>
                                                                   {
                                                                       new UserPOEMapping
                                                                           {
                                                                               UserPOEMappingId = a.UserPOEMappingId,
                                                                               AreaId = a.ZoneId.GetValueOrDefault(),
                                                                               User = new User
                                                                                          {
                                                                                              UserId = userId,
                                                                                              FirstName = a.FirstName,
                                                                                              LastName = a.LastName,
                                                                                              EmailAddress = a.EmailId,
                                                                                              CompanyName =
                                                                                                  a.CompanyName,
                                                                                              CompanySize =
                                                                                                  a.CompanySize,
                                                                                              Subscriptionid =
                                                                                                  a.subscriptionid,
                                                                                              Country = new Country
                                                                                                            {
                                                                                                                Id =
                                                                                                                    a.
                                                                                                                    COuntryId,
                                                                                                                Name =
                                                                                                                    Helper
                                                                                                                    .
                                                                                                                    GetCountryName
                                                                                                                    (a.
                                                                                                                         COuntryId)
                                                                                                            },
                                                                                              Area = new Zone
                                                                                                         {
                                                                                                             Id =
                                                                                                                 a.
                                                                                                                 ZoneId.
                                                                                                                 GetValueOrDefault
                                                                                                                 (),
                                                                                                             Name =a.AreaName
                                                                                                         }
                                                                                          },
                                                                               POE = new Util.Domain.POE
                                                                                         {
                                                                                             POEId = a.POEId,
                                                                                             Name = a.POEName,
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

        /// <summary>
        /// Gets the user by id.
        /// </summary>
        /// <param name="id">The id.</param>
        /// <returns></returns>
        public User GetUserById(int id)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var user = default(User);
                var result = context.GetUserDetailsById(id).FirstOrDefault();
                if (result != null)
                {
                    user = new User
                               {
                                   EmailAddress = result.EmailID,
                                   Country = new Country
                                                 {
                                                     Id = result.CountryId,
                                                     Name = Helper.GetCountryName(result.CountryId)
                                                 },
                                   LastName = result.LastName,
                                   FirstName = result.FirstName,
                                   UserId = result.Id,
                                   LastLogin = result.LastLogin,
                                   CompanyName = result.CompanyName,
                                   //   Photo = result.Photo,
                                   Subscriptionid = result.SubscriptionID,
                                   IsAgreed = result.IsAgreed,
                                   YammerToken = result.YammerToken
                               };
                }
                return user;
            }
        }

        /// <summary>
        /// Gets my team count.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="POEId">The POE id.</param>
        /// <param name="filterType">Type of the filter.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        public int GetMyTeamCount(int userId, int POEId, NetworkUserFilterType filterType, int subscriptionid)
        {
            return GetNetworksUsers(userId, POEId, filterType, subscriptionid).Count;
        }

        public void DeleteNetworkUser(int parendId, int childId, int subscriptionId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.DeleteNetworkUser(parendId, childId, subscriptionId);
            }
        }

        public void UpdatePageMode(int userid, int status)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.UpdatePageMode(userid, status);
            }
        }

        /// <summary>
        /// Gets the networks users for sync.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="POEId">The POE id.</param>
        /// <param name="LevelId">The level id.</param>
        /// <returns></returns>
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

        /// <summary>
        /// GetNetworksUsers
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="POEId"></param>
        /// <param name="filterType"></param>
        /// <param name="subscriptionid"></param>
        /// <returns></returns>
        public List<UserPOEMapping> GetNetworksUsers(int userId, int POEId, NetworkUserFilterType filterType,
                                                    int subscriptionid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetNetworkUsers(userId, POEId, (int)filterType, subscriptionid);
                if (results != null)
                {
                    return results.SelectMany((a, b) => new List<UserPOEMapping>
                        {
                            new UserPOEMapping
                                {
                                    UserPOEMappingId = a.UserPOEMappingId,
                                    AreaId = a.ZoneId.GetValueOrDefault(),
                                    Role = a.RoleId,
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

                                    JobTitle = a.JobTitle,
                                    IsFbCompleted=GetFeedbackStatus(userId,POEId,a.UserPOEMappingId)
                                }
                        }).ToList();
                }
                else
                {
                    return null;
                }
            }
        }

        public List<UserPOEMapping> GetNetworksUsersWall(int userId, int POEId,
                                                    int subscriptionid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetNetworkUsersWall(userId, POEId, 0, subscriptionid);
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

        /// <summary>
        /// for assign poe
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="filterType"></param>
        /// <param name="subscriptionid"></param>
        /// <returns></returns>
        public List<UserPOEMapping> GetAllMyusers(int userId, NetworkUserFilterType filterType, int subscriptionid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetAllMyUsers(userId, (int)filterType, subscriptionid);
                return results.SelectMany((a, b) => new List<UserPOEMapping>
                                                        {
                                                            new UserPOEMapping
                                                                {
                                                                    SubscribtionDate=a.SubscribedDate.ToString(),
                                                                    //UserPOEMappingId = a.UserPOEMappingId,
                                                                    //AreaId = a.ZoneId.GetValueOrDefault(),
                                                                    User = new User
                                                                               {
                                                                                   UserId = a.userid,
                                                                                   FirstName = a.FirstName,
                                                                                   LastName = a.LastName,
                                                                                   EmailAddress = a.EmailId,

                                                                                  // Photo = a.Photo,
                                                                                   Country = new Country
                                                                                                 {
                                                                                                     Id = a.CountryId,
                                                                                                     Name =
                                                                                                         Helper.
                                                                                                         GetCountryName(
                                                                                                             a.CountryId)
                                                                                                 },
                                                                                   //Area = new Zone
                                                                                   //           {
                                                                                   //               Id =
                                                                                   //                   a.ZoneId.
                                                                                   //                   GetValueOrDefault(),
                                                                                   //               Name =
                                                                                   //                   Helper.GetAreaById
                                                                                   //                   (a.ZoneId.
                                                                                   //                        GetValueOrDefault
                                                                                   //                        ())
                                                                                   //           }
                                                                               },
                                                                    POE = new Util.Domain.POE()
                                                                              {
                                                                                  //POEId = a.POEId,
                                                                              },
                                                                    Designation = new Designation
                                                                                      {
                                                                                          Name = a.DesignationName,
                                                                                          Level = a.LevelId
                                                                                      },

                                                                    //JobTitle = a.JobTitle
                                                                }
                                                        }).ToList();
            }
        }

        /// <summary>
        /// GetAllUsersData by manger,tm etc(without poe) for assign poe
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="subscriptionid"></param>
        /// <returns></returns>
        public List<UserPOEMapping> GetAllUsersData(int userId, int subscriptionid)
        {
            List<UserPOEMapping> myPeer = new List<UserPOEMapping>();

            var myPeerManager = GetAllMyusers(userId, NetworkUserFilterType.PeerManager, subscriptionid);
            var myPeerTeam = GetAllMyusers(userId, NetworkUserFilterType.PeerTeam, subscriptionid);

            foreach (UserPOEMapping userPoeMapping in myPeerManager)
            {
                var firstOrDefault = myPeerTeam.FirstOrDefault(a => a.User.UserId == userPoeMapping.User.UserId);
                if (firstOrDefault != null)
                    userPoeMapping.SecondaryUserPOEMappingId = firstOrDefault.UserPOEMappingId;

                userPoeMapping.Designation.Name = "Peer";
                myPeer.Add(userPoeMapping);
            }

            List<UserPOEMapping> myManager = new List<UserPOEMapping>();
            myManager.AddRange(GetAllMyusers(userId, NetworkUserFilterType.Manager, subscriptionid));
            myManager.AddRange(GetAllMyusers(userId, NetworkUserFilterType.SkipLevelManager, subscriptionid));

            List<UserPOEMapping> myTeam = new List<UserPOEMapping>();

            myTeam.AddRange(myManager);
            myTeam.AddRange(GetAllMyusers(userId, NetworkUserFilterType.TeamMember, subscriptionid));
            myTeam.AddRange(myPeer);
            myTeam.AddRange(GetAllMyusers(userId, NetworkUserFilterType.Customer, subscriptionid));

            return myTeam;
        }

        /// <summary>
        /// Gets my users.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="filterType">Type of the filter.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetMyUsers(int userId, NetworkUserFilterType filterType,
                                                    int subscriptionid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetMyUsers(userId, (int)filterType, subscriptionid);
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

                                                                                  // Photo = a.Photo,
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
        }

        public List<UserPOEMapping> GetAllMembers(int userId, int subscriptionid)
        {
            List<UserPOEMapping> myPeer = new List<UserPOEMapping>();

            var myPeerManager = GetMyUsers(userId, NetworkUserFilterType.PeerManager, subscriptionid);
            var myPeerTeam = GetMyUsers(userId, NetworkUserFilterType.PeerTeam, subscriptionid);

            foreach (UserPOEMapping userPoeMapping in myPeerManager)
            {
                var firstOrDefault = myPeerTeam.FirstOrDefault(a => a.User.UserId == userPoeMapping.User.UserId);
                if (firstOrDefault != null)
                    userPoeMapping.SecondaryUserPOEMappingId = firstOrDefault.UserPOEMappingId;

                userPoeMapping.Designation.Name = "Peer";
                myPeer.Add(userPoeMapping);
            }

            List<UserPOEMapping> myManager = new List<UserPOEMapping>();
            myManager.AddRange(GetMyUsers(userId, NetworkUserFilterType.Manager, subscriptionid));
            myManager.AddRange(GetMyUsers(userId, NetworkUserFilterType.SkipLevelManager, subscriptionid));

            List<UserPOEMapping> myTeam = new List<UserPOEMapping>();

            myTeam.AddRange(myManager);
            myTeam.AddRange(GetMyUsers(userId, NetworkUserFilterType.TeamMember, subscriptionid));
            myTeam.AddRange(myPeer);
            myTeam.AddRange(GetMyUsers(userId, NetworkUserFilterType.Customer, subscriptionid));

            return myTeam;
        }

        public List<Network> GetUserSubscriptions(string emailId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetUserSubscriptions(emailId);
                return results.SelectMany((a, b) => new List<Network>
                                                        {
                                                            new Network
                                                                {
                                                                    EmailId = emailId,
                                                                    NetworkName = a.NetworkName,
                                                                    Subscriptionid = a.SubscriptionID
                                                                }
                                                        }).ToList();
            }
        }
        public bool GetFeedbackStatus(int userId, int poeId, int tmMappingid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetFeedackCompleteStatus(userId, poeId, tmMappingid);
                var v4GetFeedackCompleteStatusResult = results.FirstOrDefault();
                return v4GetFeedackCompleteStatusResult != null && v4GetFeedackCompleteStatusResult.FbCount != 0;

            }
        }
        public List<Network> GetUserSubscriptionsLogin(string emailId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetUserSubscriptionsLogin(emailId);
                return results.SelectMany((a, b) => new List<Network>
                                                        {
                                                            new Network
                                                                {
                                                                    EmailId = emailId,
                                                                    NetworkName = a.NetworkName,
                                                                    Subscriptionid = a.SubscriptionID
                                                                }
                                                        }).ToList();
            }
        }

        public Network GetDefaultUserSubscription(string emailId)
        {
            var ownSub = GetMySubscription(emailId).FirstOrDefault();
            if (ownSub != null)
            {
                return ownSub;
            }
            else
            {
                return GetUserSubscriptionsLogin(emailId).FirstOrDefault();
            }
        }

        public Network GetOwnNetwork(string emailId)
        {
            var ownSub = GetMySubscription(emailId).FirstOrDefault();
            if (ownSub != null)
            {
                return ownSub;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// Gets the user details by mapping id.
        /// </summary>
        /// <param name="userMappingId">The user mapping id.</param>
        /// <returns></returns>
        public UserPOEMapping GetUserDetailsByMappingId(int userMappingId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var userDetails = default(UserPOEMapping);

                var result = context.GetUserDetailsByMappingId(userMappingId).FirstOrDefault();
                if (result != null)
                {
                    userDetails = new UserPOEMapping
                                      {
                                          User = new User
                                                     {
                                                         UserId = result.userid,
                                                         FirstName = result.FirstName,
                                                         LastName = result.LastName,
                                                         EmailAddress = result.EmailID,
                                                         Subscriptionid = result.SubscriptionID,
                                                         Country = new Country
                                                                       {
                                                                           Id = result.CountryId,
                                                                           Name =
                                                                               Helper.GetCountryName(result.CountryId)
                                                                       },
                                                         LastLogin = result.LastLogin,
                                                         Area = new Zone
                                                                    {
                                                                        Id = result.ZoneId.GetValueOrDefault(),
                                                                        Name =
                                                                            Helper.GetAreaById(
                                                                                result.ZoneId.GetValueOrDefault())
                                                                    },
                                                     },
                                          AreaId = result.ZoneId.GetValueOrDefault(),
                                          POE = new Util.Domain.POE()
                                                    {
                                                        POEId = result.RoleId,
                                                        Name = result.RoleTitle
                                                    },

                                          Designation = new Designation
                                                            {
                                                                DesignationId = result.DesignationId,
                                                                Level = result.LevelId,
                                                                Name = result.DesignationName,
                                                            },

                                          JobTitle = result.JobTitle
                                      };
                }
                return userDetails;
            }
        }

        public UserPOEMapping GetUserDetailsByFbId(int fbId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var userDetails = default(UserPOEMapping);

                var result = context.GetUserDetailsByFbid(fbId).FirstOrDefault();
                if (result != null)
                {
                    userDetails = new UserPOEMapping
                    {
                        User = new User
                        {
                            UserId = result.userid,
                            FirstName = result.FirstName,
                            LastName = result.LastName,
                            EmailAddress = result.EmailID,
                            Subscriptionid = result.SubscriptionID,
                            Country = new Country
                            {
                                Id = result.CountryId,
                                Name =
                                    Helper.GetCountryName(result.CountryId)
                            },
                            LastLogin = result.LastLogin,
                            Area = new Zone
                            {
                                Id = result.ZoneId.GetValueOrDefault(),
                                Name =
                                    Helper.GetAreaById(
                                        result.ZoneId.GetValueOrDefault())
                            },
                        },
                        AreaId = result.ZoneId.GetValueOrDefault(),
                        POE = new Util.Domain.POE()
                        {
                            POEId = result.RoleId,
                            Name = result.RoleTitle
                        },

                        Designation = new Designation
                        {
                            DesignationId = result.DesignationId,
                            Level = result.LevelId,
                            Name = result.DesignationName,
                        },

                        JobTitle = result.JobTitle
                    };
                }
                return userDetails;
            }
        }

        /// <summary>
        /// Gets the user details by email id.
        /// </summary>
        /// <param name="emailId">The email id.</param>
        /// <returns></returns>
        public User GetUserDetailsByEmailId(string emailId)
        {
            User user = default(User);
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                user = new User();
                var result = context.GetUserByEmailId(emailId.ToLower()).FirstOrDefault();
                if (result != null)
                {
                    user.UserId = result.Id;
                    user.FirstName = result.FirstName;
                    user.LastName = result.LastName;
                    user.CompanyName = result.CompanyName;
                    user.EmailAddress = result.EmailID;
                    user.DesignationId = result.DesignationId;
                    user.Subscriptionid = result.SubscriptionID;
                    user.Country = new Country() { Id = result.CountryId };
                }

                return user;
            }
        }

        /// <summary>
        /// Gets my detail.
        /// </summary>
        /// <param name="userid">The userid.</param>
        /// <param name="poeid">The poeid.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        public UserPOEMapping GetMyDetail(int userid, int poeid, int subscriptionid)
        {
            UserPOEMapping mappingDetail = null;
            var mappingDetails = GetUserMapping(userid, subscriptionid).Where(p => p.POE.POEId.Equals(poeid)).ToList();
            if (mappingDetails.Count > 1)
            {
                mappingDetail = mappingDetails.FirstOrDefault(a => a.Designation.Name == FeedbackType.Manager.ToString());
                if (mappingDetail == null)
                {
                    mappingDetail = mappingDetails.FirstOrDefault();
                }
            }
            else
            {
                mappingDetail = mappingDetails.FirstOrDefault();
            }
            return mappingDetail;
        }

        public UserPOEMapping GetMyDetailWithArea(int userid, int poeid, int subscriptionid)
        {
            UserPOEMapping mappingDetail = null;
            var mappingDetails = GetUserMappingWithArea(userid, subscriptionid).ToList();
            if (mappingDetails.Count > 1)
            {
                mappingDetail = mappingDetails.FirstOrDefault(a => a.Designation.Name == FeedbackType.Manager.ToString());
                if (mappingDetail == null)
                {
                    mappingDetail = mappingDetails.FirstOrDefault();
                }
            }
            else
            {
                mappingDetail = mappingDetails.FirstOrDefault();
            }
            return mappingDetail;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="type"></param>
        /// <param name="fromname"></param>
        /// <param name="toIds"></param>
        /// <param name="hasAttachment"></param>
        public void SendMailFromWall(int type, string fromname, string toIds, bool hasAttachment)
        {
            int[] toidlist;
            if (toIds.Substring(toIds.Length - 1, 1) == ",")
                toidlist = Array.ConvertAll(toIds.Substring(0, toIds.Length - 1).Split(','), new Converter<string, int>(int.Parse));
            else
                toidlist = Array.ConvertAll(toIds.Split(','), new Converter<string, int>(int.Parse));
            string _from = ConfigurationManager.AppSettings["fromEmail"];
            string emailServer = ConfigurationManager.AppSettings["mailServer"];
            string _userId = ConfigurationManager.AppSettings["emailUserId"];
            string _pwd = ConfigurationManager.AppSettings["emailPassword"];
            string _bcc = ConfigurationManager.AppSettings["bccEmail"];
            string _to = ConfigurationManager.AppSettings["mailTo"];
            var emailContenttemp = string.Empty;
            var emailContent = string.Empty;
            var subject = string.Empty;
            var contentstring = string.Empty;
            if (type == 1)
            {
                subject = "You have received Appreciation/a Medal/a Badge from kessaku.com";
                contentstring = hasAttachment ? Constant.SendAppreciation : Constant.SendAppreciationWithAttachment;
            }
            else if (type == 2)
            {
                contentstring = Constant.PostVideo;
            }
            else
            {
                contentstring = Constant.ReplyMessage;
            }

            if (_to.Trim() == string.Empty)
            {
                foreach (var i in toidlist)
                {
                    var user = GetUserById(i);
                    var userName = user.FirstName + " " + user.LastName;
                    _to = user.EmailAddress;

                    emailContenttemp = string.Format(contentstring,
                                           userName,
                                           fromname,
                                            Constant.HomeUrl
                                           );
                    emailContent = string.Format(Constant.EmailTemplate, emailContenttemp);

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
            }
            else
            {
                foreach (var i in toidlist)
                {
                    var user = GetUserById(i);
                    var userName = user.FirstName + " " + user.LastName;
                    emailContenttemp = string.Format(contentstring,
                                                    userName, //for dev;
                                                     fromname,
                                                     Constant.HomeUrl
                        );
                    emailContent = string.Format(Constant.EmailTemplate, emailContenttemp);

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
            }
        }

        /*
        public void SendAppreciationMail(string name, string fromName, string to, string subject, string body)
        {
            string homeurl = ConfigurationManager.AppSettings["homeUrl"];
            string _from = ConfigurationManager.AppSettings["fromEmail"];
            string emailServer = ConfigurationManager.AppSettings["mailServer"];
            string _userId = ConfigurationManager.AppSettings["emailUserId"];
            string _pwd = ConfigurationManager.AppSettings["emailPassword"];
            string _bcc = ConfigurationManager.AppSettings["bccEmail"];
            string _to = ConfigurationManager.AppSettings["mailTo"];
            string credentialText = string.Empty;
            string footerText = string.Empty;
            string text = string.Empty;
            int[] toidlist;
            if (name.Substring(name.Length - 1, 1) == ",")
                toidlist = Array.ConvertAll(name.Substring(0, name.Length - 1).Split(','), new Converter<string, int>(int.Parse));
            else
                toidlist = Array.ConvertAll(name.Split(','), new Converter<string, int>(int.Parse));
            foreach (var i in toidlist)
            {
                var userdetail = GetUserById(i);
                var userinfo = (User)userdetail;
                footerText = "For Support, Contact support@kessaku.com<br/>The bexcellent Support Team";

                string bodyHtml =
                    "<table width='100%' border='0' cellspacing='0' cellpadding='5'> <tr> <td bgcolor='#5e5e5e'>" +
                    "<table width='95%' border='0' align='center' cellpadding='0' cellspacing='0'> <tr> <td><a href='https://bexcellent.com' target='_blank'><img src='https://www.bexcellent.com/Images/belogo-1920.png' alt='bexcellent' border='0' style='outline:0'/></a></td> </tr> </table></td> </tr> <tr> <td bgcolor='#e5e5e5' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#353535;'>" +
                    "<table width='95%' border='0' align='center' cellpadding='0' cellspacing='0'> <tr> <td style='font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#353535;'>&nbsp;</td> </tr> <tr> <td style='font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#353535;'>" +
                    "<p>Hello " + userinfo.FirstName + " " + userinfo.LastName + ",</p> " +
                    "<p>" + body + "</p>" +
                    "<p>For support, contact <a href='mailto:support@kessaku.com' style='color:#353535'>support@kessaku.com</a></p> <p>The bexcellent team<br /> </p></td> </tr> <tr> <td style='font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#353535;'>&nbsp;</td> </tr> </table></td> </tr> <tr> <td bgcolor='#5e5e5e'><table width='95%' border='0' align='center' cellpadding='0' cellspacing='0'> " +
                    "<tr> <td width='52%'><div style='color:#fff; font-family:'Arial', Gadget, sans-serif; font-size:13px; font-weight:200'>Copyright 2013, bexcellent. All Rights Reserved</div></td> <td width='48%'><table width='1%' border='0' align='right' cellpadding='3' cellspacing='0'>" +
                    " <tr> <td width='1'><a href='https://twitter.com/dowzall' target='_blank'><img src='https://www.bexcellent.com/Images/twitter-ico.png' alt='Twitter' width='29' height='29' border='0' style='outline:0'/></a></td> <td width='1'><a href='http://www.linkedin.com/pub/alan-dowzall/1a/777/a62' target='_blank'><img src='https://www.bexcellent.com/Images/linkedin.png' alt='Twitter' width='29' height='29' border='0' style='outline:0'/></a></td> </tr> </table></td> </tr> </table></td> </tr> </table>";

                //string Mailbody = "<p style='font-family:Calibri'>Hello " + userinfo.FirstName + " " + userinfo.LastName +
                //                ",<br/><br/> " + body + " </p><p style='font-family:Calibri'>" + footerText + "</p>";
                // _to = userinfo.EmailAddress;
                string Mailbody = bodyHtml;

                MailMessage objEmail = new MailMessage(_from, _to, subject, Mailbody);

                objEmail.Bcc.Add(_bcc);

                objEmail.IsBodyHtml = true;

                SmtpClient emailClient = new SmtpClient(emailServer);
                System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(_userId, _pwd);

                emailClient.Host = emailServer;
                emailClient.UseDefaultCredentials = false;
                emailClient.Credentials = basicAuthenticationInfo;
                emailClient.Send(objEmail);
            }
        }
        */

        /// <summary>
        /// Gets all counties.
        /// </summary>
        /// <returns></returns>
        public List<Country> GetAllCounties()
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetAllCountries();
                return results.SelectMany((a, b) => new List<Country>
                                                        {
                                                            new Country
                                                                {
                                                                    Id = a.Id,
                                                                    Name = a.Name,
                                                                    Code = a.Code
                                                                }
                                                        }).ToList();
            }
        }

        /// <summary>
        /// GetAllArea
        /// </summary>
        /// <returns></returns>
        public List<Zone> GetAllArea()
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetAllArea();
                return results.SelectMany((a, b) => new List<Zone>
                                                        {
                                                            new Zone()
                                                                {
                                                                    Id = a.Id,
                                                                    Name = a.Name
                                                                }
                                                        }).ToList();
            }
        }

        public void AssignPoe(List<AssignPoe> assignpoes)
        {
            foreach (var assignpoe in assignpoes)
            {
                using (var context = DataContextFactory.GetIntelliSetDataContext())
                {
                    context.InsertPOEMappingData(assignpoe.UserId, assignpoe.PoeId, assignpoe.DesignationId,
                                                 assignpoe.JobTitle, assignpoe.SubId);
                }
            }
        }

        public Plan GetPlanById(int planId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetPlansById(planId).FirstOrDefault();
                if (results != null)
                    return new Plan()
                        {
                            PlanId = results.PlanId,
                            PlanName = results.PlanName,
                            MaxPoeCount = results.MaxPOECount.GetValueOrDefault(0),
                            MaxUsercount = results.MaxUsercount.GetValueOrDefault(0),
                            PoeCost = results.POECost.GetValueOrDefault(),
                            UserCost = results.UserCost.GetValueOrDefault(),
                        };
                else
                    return null;
            }
        }

        public string GetPoeName(int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetPOEName(poeid);
                var poeName = results.FirstOrDefault();
                if (poeName != null)
                    return poeName.Name;
                else
                    return null;
            }
        }

        public string GetPassword(string emailid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetPassword(emailid);
                var password = results.FirstOrDefault();
                if (password != null)
                {
                    return password.invitationid.ToString();
                }
                else
                {
                    return null;
                }
            }
        }

        public void DeleteUser(int userid, int poeid, int subscriptionid, int level, int deleteId, int deletePeer)
        {
            int parentId = 0;
            int childId = 0;
            if (deletePeer != 1)
            {
                if (level == 1)
                {
                    childId = deleteId;
                    var firstOrDefault =
                        GetUserMapping(userid, subscriptionid).FirstOrDefault(
                            a => a.POE.POEId == poeid && a.Designation.Level == 2);
                    if (firstOrDefault != null)
                        parentId = firstOrDefault.UserPOEMappingId;
                }
                else if (level == 2)
                {
                    parentId = deleteId;
                    var firstOrDefault =
                        GetUserMapping(userid, subscriptionid).FirstOrDefault(
                            a => a.POE.POEId == poeid && a.Designation.Level == 1);
                    if (firstOrDefault != null)
                        childId = firstOrDefault.UserPOEMappingId;
                }
            }
            else
            {
                if (level == 1)
                {
                    childId = deleteId;
                    var firstOrDefault =
                        GetUserMapping(userid, subscriptionid).FirstOrDefault(
                            a => a.POE.POEId == poeid && a.Designation.Level == 5);
                    if (firstOrDefault != null)
                        parentId = firstOrDefault.UserPOEMappingId;
                }
                else if (level == 2)
                {
                    parentId = deleteId;
                    var firstOrDefault =
                        GetUserMapping(userid, subscriptionid).FirstOrDefault(
                            a => a.POE.POEId == poeid && a.Designation.Level == 4);
                    if (firstOrDefault != null)
                        childId = firstOrDefault.UserPOEMappingId;
                }
            }
            DeleteNetworkUser(parentId, childId, subscriptionid);
            var fromUser = GetUserById(userid);
            var toUser = GetUserDetailsByMappingId(deleteId);
            var fromName = fromUser.FirstName + " " + fromUser.LastName;
            var toName = toUser.User.FirstName + " " + toUser.User.LastName;
            var to = toUser.User.EmailAddress;
            var poeName = toUser.POE.Name;
            SendDeleteNotificationEmail(fromName, to, poeName, to);
        }

        public void CreateActivity(int fromid, int forid, int subid, int sourceid, string activity, string batchid = null, int poeid = 0)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.CreateActivity(fromid, forid, subid, sourceid, activity, batchid, poeid);
            }
        }

        private void CreateActivityForPathfinders(int fromid, int forid, int subid, int sourceid, string activity, int poeid, int moduleid, string batchid = null)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.CreateActivityForPathFinder(fromid, forid, subid, sourceid, activity, batchid, poeid, moduleid);
            }
        }

        public void CreateActivity(int userid, string toids, int subid, int sourceid, string activity, int poeid)
        {
            string batch = Guid.NewGuid().ToString();
            int[] toidlist;
            if (toids.Substring(toids.Length - 1, 1) == ",")
                toidlist = Array.ConvertAll(toids.Substring(0, toids.Length - 1).Split(','), new Converter<string, int>(int.Parse));
            else
                toidlist = Array.ConvertAll(toids.Split(','), new Converter<string, int>(int.Parse));
            foreach (int toid in toidlist)
            {
                if (toidlist.Count() == 1)
                {
                    CreateActivity(userid, toid, subid, sourceid, activity, poeid: poeid);
                }
                else
                {
                    CreateActivity(userid, toid, subid, sourceid, activity, batch, poeid);
                }
            }
        }

        public void CreateActivityForPathFinders(int userid, string toids, int subid, int sourceid, string activity, int poeId, int moduleId)
        {
            string batch = Guid.NewGuid().ToString();
            int[] toidlist;
            if (toids.Substring(toids.Length - 1, 1) == ",")
                toidlist = Array.ConvertAll(toids.Substring(0, toids.Length - 1).Split(','), new Converter<string, int>(int.Parse));
            else
                toidlist = Array.ConvertAll(toids.Split(','), new Converter<string, int>(int.Parse));
            foreach (int toid in toidlist)
            {
                if (toidlist.Count() == 1)
                {
                    CreateActivityForPathfinders(userid, toid, subid, sourceid, activity, poeId, moduleId);
                }
                else
                {
                    CreateActivityForPathfinders(userid, toid, subid, sourceid, activity, poeId, moduleId, batch);
                }
            }
        }

        public void SendPoePdfNotification(string emailContents, string subject)
        {
            var emailContenttemp = string.Empty;
            var emailContent = string.Empty;
            //var subject = "PDF Downloaded";
            var contentstring = Constant.DeleteMember;
            var url = Constant.HomeUrl;
            var toid = ConfigurationManager.AppSettings["MailId"].ToString();
            emailContent = string.Format(Constant.EmailTemplate, emailContents);
            SendMultipleEmail(subject, emailContent, toid);
        }

        public void SendMultipleEmail(string subject, string content, string to)
        {
            string _from = ConfigurationManager.AppSettings["fromEmail"];
            string emailServer = ConfigurationManager.AppSettings["mailServer"];
            string _userId = ConfigurationManager.AppSettings["emailUserId"];
            string _pwd = ConfigurationManager.AppSettings["emailPassword"];
            string _bcc = ConfigurationManager.AppSettings["bccEmail"];
            string _to = ConfigurationManager.AppSettings["fromEmail"];

            if (_to.Trim() == string.Empty)
            {
                _to = to;
            }
            //var splitEmail = to.Split(',');

            MailMessage objEmail = new MailMessage(_from, _to, subject, content);
            //objEmail.To.Add(to);
            objEmail.Bcc.Add(_bcc);

            objEmail.IsBodyHtml = true;

            SmtpClient emailClient = new SmtpClient(emailServer);
            System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(_userId, _pwd);

            emailClient.Host = emailServer;
            emailClient.UseDefaultCredentials = false;
            emailClient.Credentials = basicAuthenticationInfo;
            emailClient.Send(objEmail);
        }
        public void SendContactMails(string content, string subject)
        {
            //string _from = ConfigurationManager.AppSettings["fromEmail"];
            string _from = ConfigurationManager.AppSettings["fromEmail"];
            string emailServer = ConfigurationManager.AppSettings["mailServer"];
            string _userId = ConfigurationManager.AppSettings["emailUserId"];
            string _pwd = ConfigurationManager.AppSettings["emailPassword"];
            string _bcc = ConfigurationManager.AppSettings["bccEmail"];
            string _to = ConfigurationManager.AppSettings["fromEmail"];

            //if (_to.Trim() == string.Empty)
            //{
            //    _to = to;
            //}
            //var splitEmail = to.Split(',');

            MailMessage objEmail = new MailMessage(_from, _to, subject, content);
            //objEmail.To.Add(to);
            objEmail.Bcc.Add(_bcc);

            objEmail.IsBodyHtml = true;

            SmtpClient emailClient = new SmtpClient(emailServer);
            System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(_userId, _pwd);

            emailClient.Host = emailServer;
            emailClient.UseDefaultCredentials = false;
            emailClient.Credentials = basicAuthenticationInfo;
            emailClient.Send(objEmail);
        }
        public void SendDeleteNotificationEmail(string fromName, string toName, string poeName, string to)
        {
            var emailContenttemp = string.Empty;
            var emailContent = string.Empty;
            var subject = "Removed from Feedback Network at kessaku.com";
            var contentstring = Constant.DeleteMember;
            var url = Constant.HomeUrl;
            emailContenttemp = string.Format(contentstring,
                                 toName,
                                 fromName,
                                  poeName,
                                  url
                                 );
            emailContent = string.Format(Constant.EmailTemplate, emailContenttemp);
            SendEmail(subject, emailContent, to);
        }

        public void SendConnectMail(int userid, string toids, int poeId)
        {
            var poeName = GetPoeName(poeId);
            var requestedUser = GetUserById(userid);
            var emailContenttemp = string.Empty;
            var emailContent = string.Empty;
            var subject = "Request to Connect at kessaku.com";
            var contentstring = Constant.ConnectMessage;
            var to = string.Empty;
            var url = Constant.HomeUrl;
            var fromName = requestedUser.FirstName + " " + requestedUser.LastName;

            int[] toidlist;
            if (toids.Substring(toids.Length - 1, 1) == ",")
                toidlist = Array.ConvertAll(toids.Substring(0, toids.Length - 1).Split(','), new Converter<string, int>(int.Parse));
            else
                toidlist = Array.ConvertAll(toids.Split(','), new Converter<string, int>(int.Parse));
            foreach (int toid in toidlist)
            {
                var team = GetUserById(toid);
                to = team.EmailAddress;
                url = string.Empty;
                var userName = team.FirstName + " " + team.LastName;
                emailContenttemp = string.Format(contentstring,
                                     userName,
                                     fromName,
                                      poeName,
                                      url
                                     );
                emailContent = string.Format(Constant.EmailTemplate, emailContenttemp);
                SendEmail(subject, emailContent, to);
            }
        }

        public void SendEmail(string subject, string content, string to)
        {
            string _from = ConfigurationManager.AppSettings["fromEmail"];
            string emailServer = ConfigurationManager.AppSettings["mailServer"];
            string _userId = ConfigurationManager.AppSettings["emailUserId"];
            string _pwd = ConfigurationManager.AppSettings["emailPassword"];
            string _bcc = ConfigurationManager.AppSettings["bccEmail"];
            string _to = ConfigurationManager.AppSettings["mailTo"];

            if (_to.Trim() == string.Empty)
            {
                _to = to;
            }

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

        public void SendMailwithAttachment(string path, string subject, string content, byte[] strdata)
        {
            string _from = ConfigurationManager.AppSettings["fromEmail"];
            string emailServer = ConfigurationManager.AppSettings["mailServer"];
            string _userId = ConfigurationManager.AppSettings["emailUserId"];
            string _pwd = ConfigurationManager.AppSettings["emailPassword"];
            string _bcc = ConfigurationManager.AppSettings["bccEmail"];
            string _to = ConfigurationManager.AppSettings["mailTo"];

            MailMessage objEmail = new MailMessage(_from, _to, subject, content);
            objEmail.Bcc.Add(_bcc);
            SmtpClient emailClient = new SmtpClient(emailServer);
            if (strdata != null)
            {
                MemoryStream ms = new MemoryStream(strdata);
                objEmail.Attachments.Add(new Attachment(ms, path));
            }
            System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(_userId, _pwd);

            emailClient.Host = emailServer;
            emailClient.UseDefaultCredentials = false;
            emailClient.Credentials = basicAuthenticationInfo;
            emailClient.Send(objEmail);
        }
        public void SendMailwithAttachmentUpdated(string path, string subject, string content, byte[] strdata, string from)
        {
            string _from = "support@pipe9consulting.com";//ConfigurationManager.AppSettings["fromEmail"];
            string emailServer = ConfigurationManager.AppSettings["mailServer"];
            string _userId = ConfigurationManager.AppSettings["emailUserId"];
            string _pwd = ConfigurationManager.AppSettings["emailPassword"];
            string _bcc = ConfigurationManager.AppSettings["bccEmail"];
            string _to = ConfigurationManager.AppSettings["mailTo"];

            MailMessage objEmail = new MailMessage(_from, _to, subject, content);
            objEmail.Bcc.Add(_bcc);
            SmtpClient emailClient = new SmtpClient(emailServer);
            if (strdata != null)
            {
                MemoryStream ms = new MemoryStream(strdata);
                objEmail.Attachments.Add(new Attachment(ms, path));
            }
            System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(_userId, _pwd);

            emailClient.Host = emailServer;
            emailClient.UseDefaultCredentials = false;
            emailClient.Credentials = basicAuthenticationInfo;
            emailClient.Send(objEmail);
            SendEmailUpdated(subject, from);
        }

        public void SendEmailUpdated(string subject, string emailid)
        {
            // Log("WCF-SendEmail-IN");
            try
            {
                var authentication = new AuthentiationBO();
                var password = authentication.GetPassword(emailid);
                // var user = Common.GetUserDetailsByMappingId(userId);
                string _from = ConfigurationManager.AppSettings["fromEmail"];
                string emailServer = ConfigurationManager.AppSettings["mailServer"];
                string _userId = ConfigurationManager.AppSettings["emailUserId"];
                string _pwd = ConfigurationManager.AppSettings["emailPassword"];
                string _bcc = ConfigurationManager.AppSettings["bccEmail"];
                string _to = ConfigurationManager.AppSettings["mailTo1"];

                if (_to.Trim() == string.Empty)
                {
                    _to = emailid;
                }
                var emailContenttemp = string.Format(Constant.ReportanIssue,
                                                    password.user.FirstName,
                                                    subject
                                                   );
                var emailContent = string.Format(Constant.EmailTemplateNew, emailContenttemp, emailid);
                MailMessage objEmail = new MailMessage(_from, _to, "Thank you for reporting a Pipe9 Feedback issue", emailContent);

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
        public void SendPlanNotification()
        {
            var subscriptionList = GetAllSubscriptions();
            if (subscriptionList != null)
            {
                foreach (var result in subscriptionList)
                {
                    var user = GetUserDetailsByEmailId(result.EmailID.ToLower());
                    var userName = user.FirstName + " " + user.LastName;
                    DateTime subExpDate = (result.SubscribedDate != null)
                        ? result.SubscribedDate.Value.Date
                        : ((result.TrialDate != null) ? result.TrialDate.Value.Date : DateTime.Now.Date);

                    int daysDiff = (int)(subExpDate - DateTime.Now.Date).TotalDays;

                    var emailContenttemp = string.Empty;
                    var emailContent = string.Empty;
                    var subject = "Act Now Your kessaku Account will Expire in ";
                    var contentstring = Constant.PlanExpired;
                    var to = user.EmailAddress;
                    var url = Constant.HomeUrl;
                    var dayString = string.Empty;
                    switch (daysDiff)
                    {
                        case 30:
                            {
                                dayString = "30 Days";
                                subject = subject + dayString;
                                emailContenttemp = string.Format(contentstring,
                                    userName,
                                   dayString,
                                    result.NetworkName,
                                    result.CreatedOn.ToShortDateString(),
                                    subExpDate.ToShortDateString(),
                                          url
                                         );
                                emailContent = string.Format(Constant.EmailTemplate, emailContenttemp);
                                SendEmail(subject, emailContent, to);
                                break;
                            }
                        case 14:
                            {
                                dayString = "14 Days";
                                subject = subject + dayString;
                                emailContenttemp = string.Format(contentstring,
                                    userName,
                                   dayString,
                                    result.NetworkName,
                                    result.CreatedOn.ToShortDateString(),
                                    subExpDate.ToShortDateString(),
                                          url
                                         );
                                emailContent = string.Format(Constant.EmailTemplate, emailContenttemp);
                                SendEmail(subject, emailContent, to);
                                break;
                            }
                        case 5:
                            {
                                dayString = "5 Days";
                                subject = subject + dayString;
                                emailContenttemp = string.Format(contentstring,
                                    userName,
                                   dayString,
                                    result.NetworkName,
                                    result.CreatedOn.ToShortDateString(),
                                    subExpDate.ToShortDateString(),
                                          url
                                         );
                                emailContent = string.Format(Constant.EmailTemplate, emailContenttemp);
                                SendEmail(subject, emailContent, to);
                                break;
                            }
                        case 1:
                            {
                                dayString = "1 Day";
                                subject = subject + dayString;
                                emailContenttemp = string.Format(contentstring,
                                    userName,
                                   dayString,
                                    result.NetworkName,
                                    result.CreatedOn.ToShortDateString(),
                                    subExpDate.ToShortDateString(),
                                          url
                                         );
                                emailContent = string.Format(Constant.EmailTemplate, emailContenttemp);
                                SendEmail(subject, emailContent, to);
                                break;
                            }
                        default:
                            break;
                    }
                }
            }
        }

        public List<GetAllSubscriptionsResult> GetAllSubscriptions()
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetAllSubscriptions().ToList();
            }
        }

        public List<ManagerReports> GenerateManagerReport(int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GenerateManagerReport(poeid).SelectMany((a, b) => new List<ManagerReports>
                                              {
                                                  new ManagerReports
                                                      {
                                                          PoeName = a.PoeName,
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          TeamName = a.ChildName,
                                                          TeamEmail = a.ChildEmailid,
                                                          ManagerName = a.ParentName,
                                                          ManagerEmail = a.ParentEmailid,
                                                          Relation = a.Designation.Replace("Peer Manager","Peer"),
                                                          Status = (a.GiveCompletedOn == null) ?"No":"Yes",
                                                          CompletedOn = (a.GiveCompletedOn == null) ?string.Empty: a.GiveCompletedOn.Value.ToShortDateString(),
                                                          PoeId=a.Poeid.ToString(),
                                                          LastLogin=(a.LastLogin == null) ?string.Empty: a.LastLogin.Value.ToShortDateString(),
                                                          
                                                      }
                                              }).ToList();
            }
        }

        public List<TeamReports> GenerateTeamReport(int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GenerateTeamReport(poeid).SelectMany((a, b) => new List<TeamReports>
                                              {
                                                  new TeamReports
                                                      {
                                                          PoeName = a.PoeName,
                                                          Area = a.Area,
                                                          Country = a.Country,
                                                          Name = a.ChildName,
                                                          Email = a.ChildEmailid,
                                                          Relation = a.Designation.Replace("Peer Team Member","Peer"),
                                                          Status = (a.TakeCompletedOn == null) ?"No":"Yes",
                                                          CompletedOn =(a.TakeCompletedOn == null) ?string.Empty: a.TakeCompletedOn.Value.ToShortDateString(),
                                                          LastLogin=(a.LastLogin == null) ?string.Empty: a.LastLogin.Value.ToShortDateString(),
                                                        }
                                              }).ToList();
            }
        }

        public List<YammerContent> GetYammerTopContent()
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetTopYammerContents().SelectMany((a, b) => new List<YammerContent>
                                              {
                                                  new YammerContent
                                                      {
                                                          ID=a.Id,
                                                          ImageUrl=a.ImageUrl,
                                                          YammerToken=a.YammerToken,
                                                          Subject=a.Subjects,
                                                          Description=a.Descriptions,
                                                          FromMailid=a.FromEmailid,
                                                          ToMailid=a.ToEmailid,
                                                          Groupid=a.groupid
                                                        }
                                              }).ToList();
            }
        }

        public void UpdateYammercontent(int id)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var t = context.UpdateYammerContents(id);
            }
        }

        public int GetModuleCount(int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var t = context.GetModuleCount(poeid);
                return t.Count();
            }
        }

        public void DeleteExistingFeedback(int userid, int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.DeleteIncompleteFeedback(userid, poeid);
            }
        }

        //For DashBoard development
        public DashBoard GetDashBoardDetails(int userid, int subid, int poeId, string domain)
        {
            var dashboard = new DashBoard
                                {
                                    PoEList = GetSubscribedPoes(subid),
                                    User = GetMyDetail(userid, poeId, subid),
                                    CompletedFeedback = GetFeedbackOutstandingCount(userid, subid),
                                    RequestFeedbackList = GetMyReceiveFbTeamList(userid, poeId, subid),
                                    GiveFeedbackList = GetMyGiveFbTeamList(userid, poeId, subid),
                                    StandingScore = GetStandingTileScore(poeId, userid, subid, domain),
                                    GetMyActivities = GetMyActivities(userid, subid, 0),
                                    Goals = new List<QuestionsGoal>(GetSelectedGoal(userid, poeId).OrderByDescending(a => a.GoalGap))
                                    //SyncDifference = GetSyncWcsiDiff(userid, poeId, subid)
                                };
            return dashboard;
        }

        internal int GetFeedbackOutstandingCount(int userId, int subscriptionid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetFeedbackOutstanding(userId, subscriptionid);
                var outStandingCount =
                    results.Where(a => a.FeedbackType != null).GroupBy(item => item.GroupName).Count();

                return outStandingCount;
            }
        }

        public List<UserPOEMapping> GetMyReceiveFbTeamList(int userId, int poeId, int subscriptionid)
        {
            var myGiveFbTeam = new List<UserPOEMapping>();

            myGiveFbTeam.AddRange(GetNetworksUsers(userId, poeId, NetworkUserFilterType.Manager, subscriptionid));
            myGiveFbTeam.AddRange(GetNetworksUsers(userId, poeId, NetworkUserFilterType.SkipLevelManager, subscriptionid));
            myGiveFbTeam.AddRange(GetNetworksUsers(userId, poeId, NetworkUserFilterType.PeerManager, subscriptionid));
            myGiveFbTeam.AddRange(GetNetworksUsers(userId, poeId, NetworkUserFilterType.Customer, subscriptionid));
            foreach (var userPoeMapping in myGiveFbTeam)
            {
                var sync = new Sync.Sync();
                userPoeMapping.WcsiScoreDiff = sync.WcsiScoreDifference(userId, poeId, subscriptionid,
                                                                        userPoeMapping.UserPOEMappingId, 1);
            }
            return myGiveFbTeam;
        }

        public List<UserPOEMapping> GetMyGiveFbTeamList(int userId, int poeId, int subscriptionid)
        {
            var myGiveFbTeam = new List<UserPOEMapping>();

            myGiveFbTeam.AddRange(GetNetworksUsers(userId, poeId, NetworkUserFilterType.TeamMember, subscriptionid));
            myGiveFbTeam.AddRange(GetNetworksUsers(userId, poeId, NetworkUserFilterType.PeerTeam, subscriptionid));

            foreach (var userPoeMapping in myGiveFbTeam)
            {
                var sync = new Sync.Sync();
                userPoeMapping.WcsiScoreDiff = sync.WcsiScoreDifference(userId, poeId, subscriptionid,
                                                                        userPoeMapping.UserPOEMappingId, 2);
            }

            return myGiveFbTeam;
        }

        public Util.Response.Standing GetStandingTileScore(int poeid, int userid, int subid, string domain)
        {
            var you = GetYouFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), subid, 1, domain);
            var manager = GetYouFbidString(poeid, userid.ToString(CultureInfo.InvariantCulture), subid, 2, domain);
            var youStand = GetStandingScore(you, StandingType.Top, poeid);
            var managerStand = GetStandingScore(manager, StandingType.Top, poeid);
            var standingdata = new Util.Response.Standing()
            {
                You = youStand,
                Previous = managerStand,
            };
            return standingdata;
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
                            fbids = v3GetMyFeedbackByRoleResult.POEFeedbackId.ToString();
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
            else
                return "0";
        }

        public StandingScore GetStandingScore(string feedbackid, StandingType standingType, int poeid)
        {
            var standingScore = new StandingScore();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var result = context.GetWCSIPerModule(feedbackid, poeid.ToString(CultureInfo.InvariantCulture)).ToList();
                standingScore.WcsiScore = Math.Round(result.Sum(a => Math.Round(a.WCSIPermod.GetValueOrDefault(0), MidpointRounding.AwayFromZero)), MidpointRounding.AwayFromZero);
                return standingScore;
            }
        }

        public List<V3_GetMyActivitiesResult> GetMyActivities(int userId, int subscriptionId, int sourceId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetMyActivities(userId, subscriptionId, sourceId).Take(5).ToList();
            }
        }

        public void UpdateLastMail(int mappingId, int messageCount)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.UpdateLastMail(mappingId, messageCount);
            }
        }

        public List<V3_GetSelfFbUsersResult> GetSelfbUser(int poeId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetSelfFbUsers(poeId).ToList();
            }
        }

        public List<QuestionsGoal> GetSelectedGoal(int userid, int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetSelectedGoals(userid, poeid);
                var goalist = results.Select(t => new QuestionsGoal
                                                      {
                                                          QuetionText = t.Question,
                                                          GoalSetedOn = t.CreatedOn,
                                                          GoalGap = GetGoalGap(t.SelectedValue, (int)t.DateDiffer)
                                                      }).ToList();
                return goalist;
            }
        }

        public int GetGoalGap(int selectedValue, int monthgap)
        {
            var months = 0;
            switch (selectedValue)
            {
                case 1:
                    {
                        months = 0;
                        break;
                    }
                case 2:
                    {
                        months = 6;
                        break;
                    }
                case 3:
                    {
                        months = 12;
                        break;
                    }
                case 4:
                    {
                        months = 24;
                        break;
                    }
            }
            return months - monthgap;
        }

        public List<User> GetNotUpdatedPasswordList(string poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var getList = context.GetNotUpdatedPassword(poeid);
                var listofUsers = getList.Select(user => new User
                                                             {
                                                                 FirstName = user.FirstName,
                                                                 LastName = user.LastName,
                                                                 EmailAddress = user.Emailid,
                                                                 LastLogin = user.LastLogin,
                                                                 Password = user.InvitationId
                                                             }).ToList();
                return listofUsers;
            }
        }

        public void SendMailForResource(int fromid, string toIds, string resourceurl, string resourceTitle)
        {
            int[] toidlist;
            var contentstring = Constant.ShareResource;
            if (toIds.Substring(toIds.Length - 1, 1) == ",")
                toidlist = Array.ConvertAll(toIds.Substring(0, toIds.Length - 1).Split(','), new Converter<string, int>(int.Parse));
            else
                toidlist = Array.ConvertAll(toIds.Split(','), new Converter<string, int>(int.Parse));
            string _from = ConfigurationManager.AppSettings["fromEmail"];
            string emailServer = ConfigurationManager.AppSettings["mailServer"];
            string _userId = ConfigurationManager.AppSettings["emailUserId"];
            string _pwd = ConfigurationManager.AppSettings["emailPassword"];
            string _bcc = ConfigurationManager.AppSettings["bccEmail"];
            string _to = ConfigurationManager.AppSettings["mailTo"];
            var emailContenttemp = string.Empty;
            var emailContent = string.Empty;
            var subject = " Important Resource Material ";
            //var contentstring = string.Empty;

            if (_to.Trim() == string.Empty)
            {
                var getFromUser = GetUserById(fromid);
                _from = getFromUser.EmailAddress;
                var fromname = getFromUser.FirstName + " " + getFromUser.LastName;
                foreach (var i in toidlist)
                {
                    var user = GetUserById(i);
                    var userName = user.FirstName + " " + user.LastName;
                    _to = user.EmailAddress;

                    emailContenttemp = string.Format(contentstring, userName,
                                           fromname,
                                           resourceurl, resourceTitle
                                           );
                    emailContent = string.Format(Constant.EmailTemplate, emailContenttemp);

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
            }
            else
            {
                var getFromUser = GetUserById(fromid);
                _from = getFromUser.EmailAddress;
                var fromname = getFromUser.FirstName + " " + getFromUser.LastName;
                foreach (var i in toidlist)
                {
                    var user = GetUserById(i);
                    var userName = user.FirstName + " " + user.LastName;
                    //_to = user.EmailAddress;

                    emailContenttemp = string.Format(contentstring, userName,
                                           fromname,
                                           resourceurl, resourceTitle
                                           );
                    emailContent = string.Format(Constant.EmailTemplate, emailContenttemp);

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
            }
        }

        public void CreateUpdateUserview(int userid, string section)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.CreateUserViews(userid, section);
            }
        }

        public Util.Domain.Notification GetUserNotifications(int userId, int subscriptionId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var getResult = context.GetNotifications(userId, subscriptionId);
                var notifications = getResult.Select(a => new Util.Domain.Notification
                                                              {
                                                                  Result = Convert.ToBoolean(a.Result),
                                                                  Standing = Convert.ToBoolean(a.Standing),
                                                                  Sync = Convert.ToBoolean(a.Sync),
                                                                  Wall = Convert.ToBoolean(a.Wall),
                                                                  Feedback = Convert.ToBoolean(a.Feedback),
                                                                  Mentor = Convert.ToBoolean(a.Mentor),
                                                                  Goals = Convert.ToBoolean(a.Goal)
                                                              }).FirstOrDefault();
                return notifications;

            }
        }
        public int GetManagerType(int userid, int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var getMangers = context.GetManagerType(userid, poeid).ToList();
                var managercount = getMangers.Count();
                if (managercount != 0)
                {
                    if (managercount < 2)
                    {
                        return getMangers.FirstOrDefault().DesignationId;
                    }
                    return 12;
                }
                return 0;
            }
        }
        public List<User> GetSurveyUsers(int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var getMangers = context.GetSurveyUsers(poeid).ToList();
                var userList = getMangers.Select(users => new User
                                                              {
                                                                  UserId = users.UserId
                                                              }).ToList();
                return userList;
            }
        }
        public List<User> GetUsersListByPoE(int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var getMangers = context.GetUsersListByPoE(poeid).ToList();
                var userList = getMangers.Select(users => new User
                {
                    UserId = users.Id,
                    FirstName = users.FirstName,
                    LastName = users.LastName,
                    EmailAddress = users.EmailID,
                    Country = new Country { Name = users.Country },
                    Area = new Zone { Name = users.Area },
                    JobTitle = users.Designation
                }).ToList();
                return userList;
            }
        }
        public List<User> GetSurveyUsersListByPoE(int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var getMangers = context.GetSurveyUsersListByPoE(poeid).ToList();
                var userList = getMangers.Select(users => new User
                {
                    UserId = users.Id,
                    FirstName = users.FirstName,
                    LastName = users.LastName,
                    EmailAddress = users.EmailID,
                    Country = new Country { Name = users.Country },
                    Area = new Zone { Name = users.Area },
                    JobTitle = users.Designation
                }).ToList();
                return userList;
            }
        }
        public List<QuestionScore> GetImportanceAnswer(int userid, int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var getMangers = context.GetImportaanceAnsByUserId(userid, poeid).ToList();
                var userList = getMangers.Select(users => new QuestionScore
                {
                    Answers = users.Rating.ToString(),
                  Questionid =users.Questionid.Value
                }).ToList();
                return userList;
            }
        }
        public List<QuestionScore> GetDemographicAnswer(int userid, int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var getMangers = context.GetAllDemographicSurvey(userid, poeid).ToList();
                var userList = getMangers.Select(users => new QuestionScore
                {
                    Answers = users.Answer.ToString()
                }).ToList();
                return userList;
            }
        }
        public List<QuestionScore> GetProductSurveyAnswer(int userid, int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var getMangers = context.GetAllProductSurvey(userid, poeid).ToList();
                var userList = getMangers.Select(users => new QuestionScore
                {
                    Answers = users.Answer.ToString()
                }).ToList();
                return userList;
            }
        }
        public Notification GetUserNotifications(int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var notify = new Notification();
                var listNotify = new List<Notification>();
                var poeidList = GetMySubscribedPoeList(userid, -1);
                var valid = false;
                foreach (var poe in poeidList)
                {
                    var notifyFor = new Notification();
                    var getMangers = context.GetUsersNotification(userid, poe.POEId).FirstOrDefault();
                    notifyFor.ManagerSync = (getMangers.ManagerSync == 1);
                    notifyFor.DevelopmentPriorities = (getMangers.DevelopmentPriorities == 1);
                    notifyFor.SelfCount = (int)getMangers.IncompleteSelf;
                    notifyFor.TeamCount = (int)getMangers.IncompleteTeam;
                    notifyFor.PoeId = poe.POEId;
                    listNotify.Add(notifyFor);
                    if (poe.POEId == 15 || poe.POEId == 16 || poe.POEId == 17)
                    {
                        valid = true;
                    }
                }
                notify.ManagerSync = (listNotify.Count(a => a.ManagerSync) != 0);
                notify.DevelopmentPriorities = (listNotify.Count(a => a.DevelopmentPriorities) != 0);
                notify.IncompleteSelffeedback = (listNotify.Count(a => a.SelfCount != 0) != 0);
                notify.IncompleteTeamfeedback = (listNotify.Count(a => a.TeamCount != 0) != 0);
                notify.IsHSP = valid;
                return notify;
            }
        }
        public void UpdateManagerSync(int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.UpdateManagerSync(userid);
            }
        }
        //public List<Question> GetDemographicSurvey(int poeid,int userId)
        //{
        //    using (var context = DataContextFactory.GetIntelliSetDataContext())
        //    {
        //        var getMangers = context.GetAllDemographicSurvey(userId,poeid).ToList();
        //        var userList = getMangers.Select(questions => new Question
        //        {
        //            QuestionId = questions.QuestionId,
        //            QuetionText = questions.Question,

        //        }).ToList();
        //        return userList;
        //    }
        //}
        public void UpdateDevPriorities(int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.UpdateDevPriorities(userid);
            }
        }
        public void DeleteIncompleteFB(string feedbackId, int mode)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                if (mode == 0)
                {
                    context.DeleteGroupFeedbackById(feedbackId);
                }
                else
                {
                    context.DeleteIncompleteFeedbackById(Int32.Parse(feedbackId));
                }
            }
        }
        public List<UserRole> GetUserRolesByProfileUpdated(int userid, int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetUserRoleByProfileListUpdated(userid, poeid).ToList().SelectMany((a, b) => new List<UserRole>
                    {
                        new UserRole
                            {
                                RoleId = a.DesignationId,
                                RoleText =a.Jobtile
                            }
                    }).ToList();
            }
        }
        //PPA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        public List<Partner> GetPartners(int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var partnerList = new List<Partner>();
                var listPartner = context.GetUserPartners(userid).ToList();
                foreach (var partner in listPartner)
                {
                    var fbStatus = context.GetPartnersFB(userid, partner.PartnerId).FirstOrDefault();
                    var plan = context.GetPartnersPlan(userid, partner.PartnerId).FirstOrDefault();
                    var partnerName = context.GetMPLIDName(partner.PartnerName).FirstOrDefault();
                    var lastCompleted = context.GetLastPartnersCompleted(userid, partner.PartnerId).FirstOrDefault();
                    var fbMode = 0;
                    var completedOn = "";
                    if (fbStatus != null)
                    {
                        fbMode = (int)fbStatus.Status;
                    }
                    if (lastCompleted != null)
                    {
                        completedOn = Convert.ToDateTime(lastCompleted.startdate).ToShortDateString();
                    }
                    var partners = new Partner
                                       {
                                           Id = partner.PartnerId,
                                           Name = partner.PartnerName,
                                           OriginalPartnerName = (partnerName != null) ? partnerName.PartnerName : "",
                                           FBStatus = fbMode,
                                           FileName = (plan != null) ? plan.FileName : "",
                                           Extension = (plan != null) ? plan.Extension : "",
                                           PlanId = (plan != null) ? plan.planid : 0,
                                           RealFileName = (plan != null) ? plan.RealFileName : "",
                                           UserId = userid,
                                           CompletedOn = completedOn
                                       };
                    partnerList.Add(partners);
                }
                return partnerList;
            }
        }
        public void InsertSurveyAnswer(int questionId, int answerValue, string answer, int feedbackid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.PPA_IuUserSurvey(questionId, answer, answerValue, feedbackid);
            }
        }
        public int CreateSurvey(int userid, int poeid, int partnerId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.IuCreateSurvey(userid, poeid, partnerId).FirstOrDefault().POEFeedbackId;
            }
        }
        public void CreatePartner(int userid, string partnerName)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.IuCreatePartner(userid, partnerName);
            }
        }
        public void DeletePlan(int userid, int partnerId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.DeletePlan(userid, partnerId);
            }
        }
        public PSESurvey GetCompletedAnswers(int feedbackid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var survey = new PSESurvey();
                var lastModule = (context.PSEGetLastModuleId(feedbackid).FirstOrDefault()) != null ? context.PSEGetLastModuleId(feedbackid).FirstOrDefault().POEModuleId : 0;
                if (lastModule != 0)
                {
                    var answers = context.PSEGetPoeResults(feedbackid).ToList();
                    var answerList = answers.Select(answer => new PSEAnswers
                                                                  {
                                                                      QuestionId = answer.QuestionId,
                                                                      Answer = (int)answer.AnswerValue
                                                                  }).ToList();
                    survey.LastModuleId = lastModule;
                    survey.Answers = answerList;
                    return survey;
                }
                return null;
                // context.PSEGetLastModuleId(feedbackid).FirstOrDefault().POEModuleId;
            }
        }
        public void CompleteSurvey(int feedbackId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.CompleteSurvey(feedbackId);
            }
        }
        public void UpdatePartner(int userId, int partnerId, string partnerName)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.UpdatePartners(userId, partnerName, partnerId);
            }
        }
        public void DeletePartner(int userId, int partnerId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.DeletePartners(userId, partnerId);
            }
        }
        public void UploadPlan(int userId, int partnerId, int poeid, string filnename, string extension, string realFileName)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.InsertPlan(userId, partnerId, poeid, filnename, extension, realFileName);
            }
        }
        public bool IsPartnerExist(int userId, string partnerName)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var count = context.PSEUserExists(userId, partnerName).FirstOrDefault();
                if (count.Column1 != 0)
                {
                    return true;
                }
                return false;
            }
        }
        public List<PPAResults> GetPartnerResults(int userId, int partnerId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var usrList = context.PSEGenerateReport(userId, partnerId);
                return usrList.Select(result => new PPAResults
                                                              {
                                                                  QuestionId = result.QuestionId,
                                                                  Answer = (int)result.AnswerValue,
                                                                  AnswerText = result.Answer
                                                              }).ToList();
            }
        }
        public List<Designation> ListDesigantion(int userid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var desigantion = context.GetUsersAllDesignation(userid);
                return desigantion.Select(desig => new Designation
                                                                      {
                                                                          DesignationId = desig.DesignationId
                                                                      }).ToList();
            }
        }
        public List<User> LoadUserRolesbyPartner(int userid, int designationId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var desigantion = context.LoadPartnersByDesignation(userid, designationId);
                return desigantion.Select(desig => new User
                {
                    UserId = desig.ID,
                    FirstName = desig.FIRSTNAME,
                    LastName = desig.LASTNAME
                }).ToList();
            }
        }
        public List<User> LoadTZUserRolesbyPartner(int userid, int designationId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var desigantion = context.LoadTimeZoneByDesignation(userid, designationId);
                return desigantion.Select(desig => new User
                {
                    UserId = desig.ID,
                    FirstName = desig.FIRSTNAME,
                    LastName = desig.LASTNAME
                }).ToList();
            }
        }
        public List<Partner> GetOverallPartners(int userid, int designationId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var partnerList = new List<Partner>();
                var listPartner = context.GetOverAllPartners(userid, designationId).ToList();
                foreach (var partner in listPartner)
                {
                    var plan = context.GetPartnersPlan(partner.UserId, partner.PartnerId).FirstOrDefault();
                    var partnerName = context.GetMPLIDName(partner.PartnerName).FirstOrDefault();
                    var partners = new Partner
                    {
                        Id = partner.PartnerId,
                        Name = partner.PartnerName,
                        OriginalPartnerName = (partnerName != null) ? partnerName.PartnerName : "",
                        FBStatus = 2,
                        FileName = (plan != null) ? plan.FileName : "",
                        Extension = (plan != null) ? plan.Extension : "",
                        PlanId = (plan != null) ? plan.planid : 0,
                        RealFileName = (plan != null) ? plan.RealFileName : "",
                        UserId = partner.UserId,
                        CountryName = partner.Name
                    };
                    partnerList.Add(partners);
                }
                return partnerList;
            }
        }
        public List<User> LoadFilterPartners(int userid, int designationId, int currentUserid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var desigantion = context.FilterPartnersByDesignation(userid, designationId, currentUserid);
                return desigantion.Select(desig => new User
                {
                    UserId = desig.ID,
                    FirstName = desig.FIRSTNAME,
                    LastName = desig.LASTNAME
                }).ToList();
            }
        }
        public List<Zone> LoadAreaOfPartner(int userid, int designationId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var areas = context.LoadPartnersArea(userid, designationId);
                return areas.Select(area => new Zone
                                                        {
                                                            Id = area.id,
                                                            Name = area.name,
                                                            CountryId = (int)area.ZoneId
                                                        }).ToList();
            }
        }
        public List<TimeZone> LoadTimeZoneOfPartner(int userid, int designationId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var areas = context.LoadPartnersTimeZone(userid, designationId);
                return areas.Select(area => new TimeZone
                {
                    Id = area.id,
                    Name = area.Name,

                }).ToList();
            }
        }
        public List<Country> LoadCountryOfPartner(int userid, int designationId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var areas = context.LoadPartnersByCountry(userid, designationId);
                return areas.Select(area => new Country
                {
                    Id = area.id,
                    Name = area.name,
                    AreaId = (int)area.AreaId

                }).ToList();
            }
        }
        public List<Country> LoadCountryByAreaId(int areaId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var areas = context.LoadCountryByArea(areaId);
                return areas.Select(area => new Country
                {
                    Id = area.ID,
                    Name = area.NAME,
                    AreaId = (int)area.AreaId

                }).ToList();
            }
        }
        public List<Country> LoadCountryByZoneId(int zoneId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var areas = context.LoadCountryByZoneId(zoneId);
                return areas.Select(area => new Country
                {
                    Id = area.ID,
                    Name = area.NAME,
                    AreaId = (int)area.AREAID

                }).ToList();
            }
        }
        public List<Zone> LoadAreaByZoneId(int zoneId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var areas = context.LoadAreaByZoneId(zoneId);
                return areas.Select(area => new Zone
                {
                    Id = area.ID,
                    Name = area.NAME,
                    CountryId = (int)area.ZoneId

                }).ToList();
            }
        }
        public List<User> LoadPartnersByAreaId(int userid, int designationId, int areaId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var desigantion = context.LoadPartnersByAreaId(userid, designationId, areaId);
                return desigantion.Select(desig => new User
                {
                    UserId = desig.ID,
                    FirstName = desig.FIRSTNAME,
                    LastName = desig.LASTNAME
                }).ToList();
            }
        }
        public List<User> LoadPartnersByCountryId(int userid, int designationId, int countryId, int areaId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var desigantion = context.LoadPartnersByCountryId(userid, designationId, countryId, areaId);
                return desigantion.Select(desig => new User
                {
                    UserId = desig.ID,
                    FirstName = desig.FIRSTNAME,
                    LastName = desig.LASTNAME
                }).ToList();
            }
        }
        public List<User> LoadPartnersByZoneId(int userid, int designationId, int zoneId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var desigantion = context.LoadPartnersByZoneId(userid, designationId, zoneId);
                return desigantion.Select(desig => new User
                {
                    UserId = desig.ID,
                    FirstName = desig.FIRSTNAME,
                    LastName = desig.LASTNAME
                }).ToList();
            }
        }
        public List<Partner> GetOverallPartnersByZone(int userid, int designationId, int areaId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var partnerList = new List<Partner>();
                var listPartner = context.GetOverAllPartnersByZone(userid, designationId, areaId).ToList();
                foreach (var partner in listPartner)
                {
                    var plan = context.GetPartnersPlan(partner.UserId, partner.PartnerId).FirstOrDefault();
                    var partnerName = context.GetMPLIDName(partner.PartnerName).FirstOrDefault();
                    var partners = new Partner
                    {
                        Id = partner.PartnerId,
                        Name = partner.PartnerName,
                        OriginalPartnerName = (partnerName != null) ? partnerName.PartnerName : "",
                        FBStatus = 2,
                        FileName = (plan != null) ? plan.FileName : "",
                        Extension = (plan != null) ? plan.Extension : "",
                        PlanId = (plan != null) ? plan.planid : 0,
                        RealFileName = (plan != null) ? plan.RealFileName : "",
                        UserId = partner.UserId,
                        CountryName = partner.Name
                    };
                    partnerList.Add(partners);
                }
                return partnerList;
            }
        }
        public List<Partner> GetOverallPartnersByArea(int userid, int designationId, int areaId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var partnerList = new List<Partner>();
                var listPartner = context.GetOverAllPartnersByArea(userid, designationId, areaId).ToList();
                foreach (var partner in listPartner)
                {
                    var plan = context.GetPartnersPlan(partner.UserId, partner.PartnerId).FirstOrDefault();
                    var partnerName = context.GetMPLIDName(partner.PartnerName).FirstOrDefault();
                    var partners = new Partner
                    {
                        Id = partner.PartnerId,
                        Name = partner.PartnerName,
                        OriginalPartnerName = (partnerName != null) ? partnerName.PartnerName : "",
                        FBStatus = 2,
                        FileName = (plan != null) ? plan.FileName : "",
                        Extension = (plan != null) ? plan.Extension : "",
                        PlanId = (plan != null) ? plan.planid : 0,
                        RealFileName = (plan != null) ? plan.RealFileName : "",
                        UserId = partner.UserId,
                        CountryName = partner.Name
                    };
                    partnerList.Add(partners);
                }
                return partnerList;
            }
        }
        public List<Partner> GetOverallPartnersByCountry(int userid, int designationId, int countryId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var partnerList = new List<Partner>();
                var listPartner = context.GetOverAllPartnersByCountry(userid, designationId, countryId).ToList();
                foreach (var partner in listPartner)
                {
                    var plan = context.GetPartnersPlan(partner.UserId, partner.PartnerId).FirstOrDefault();
                    var partnerName = context.GetMPLIDName(partner.PartnerName).FirstOrDefault();
                    var partners = new Partner
                    {
                        Id = partner.PartnerId,
                        Name = partner.PartnerName,
                        OriginalPartnerName = (partnerName != null) ? partnerName.PartnerName : "",
                        FBStatus = 2,
                        FileName = (plan != null) ? plan.FileName : "",
                        Extension = (plan != null) ? plan.Extension : "",
                        PlanId = (plan != null) ? plan.planid : 0,
                        RealFileName = (plan != null) ? plan.RealFileName : "",
                        UserId = partner.UserId,
                        CountryName = partner.Name
                    };
                    partnerList.Add(partners);
                }
                return partnerList;
            }
        }
        public string GetPartnerName(string mplId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var ppaGetMplidNameResult = context.GetMPLIDName(mplId).FirstOrDefault();
                if (ppaGetMplidNameResult != null)
                {
                    return ppaGetMplidNameResult.PartnerName;
                }
                return null;
            }
        }
        public int GetPSEUserId(string emailId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var ppaGetMplidNameResult = context.GetPSEUserId(emailId).FirstOrDefault();
                if (ppaGetMplidNameResult != null)
                {
                    return ppaGetMplidNameResult.Id;
                }
                return 0;
            }
        }
        public int GetPartnerId(string MPLID)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var ppaGetMplidNameResult = context.GetPartnerIdByMpilId(MPLID).FirstOrDefault();
                if (ppaGetMplidNameResult != null)
                {
                    return ppaGetMplidNameResult.id;
                }
                return 0;
            }
        }
        public void InsertPartnerMapping(int userId, int partnerId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.IuUserPartnerMapping(userId, partnerId);
            }
        }
        public PSEReports GetPSEReports(int userId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var getPartners = context.LoadCompletedPartners(userId).ToList();
                var userDetails = context.PSEUserDetails(userId).FirstOrDefault();
                var masnagerDetails = context.PSEManager(userId).FirstOrDefault();
                var aldetails = context.PSEAreaLead(userId).FirstOrDefault();
                var tmZone = context.PSETimeZoneLead(userId).FirstOrDefault();
                var pseRepot = new PSEReports();
                pseRepot.FirstName = userDetails.FirstName;
                pseRepot.LastName = userDetails.LastName;
                pseRepot.EmailId = userDetails.EmailID.Replace("@microsoft.com", "");
                pseRepot.Country = userDetails.Country;
                pseRepot.Area = userDetails.Area;
                pseRepot.TimeZone = userDetails.TimeZone;
                pseRepot.ManagerFirstName = masnagerDetails.FirstName;
                pseRepot.ManagerLastName = masnagerDetails.LastName;
                pseRepot.ManagerAlias = masnagerDetails.EmailId.Replace("@microsoft.com", ""); ;

                pseRepot.AreaLeadFirstName = aldetails.FirstName;
                pseRepot.AreaLeadLastName = aldetails.LastName;
                pseRepot.AreaLeadAlias = aldetails.EmailId.Replace("@microsoft.com", ""); ;


                pseRepot.TimeZoneFirstName = tmZone.FirstName;
                pseRepot.TimeZoneLastName = tmZone.LastName;
                pseRepot.TimeZoneAlias = tmZone.EmailId.Replace("@microsoft.com", ""); ;
                var partnerList = new List<Partner>();
                foreach (var partner in getPartners)
                {
                    var partnername = context.GetMPLIDName(partner.MPLID).ToList();
                    if (partnername.Count != 0)
                    {
                        var partt = partnername.FirstOrDefault();
                        var reports = new Partner
                                      {
                                          MPLID = partner.MPLID,
                                          PartnerName = partt.PartnerName,
                                          DET = partt.DET,
                                          PartnerResults = GetPartnerResults(userId, partner.PartnerId)
                                      };
                        partnerList.Add(reports);
                    }
                    else
                    {

                        var reports = new Partner
                        {
                            MPLID = partner.MPLID,
                            PartnerName = partner.MPLID,
                            DET = "MBS Account Managed_Sol",
                            PartnerResults = GetPartnerResults(userId, partner.PartnerId)
                        };
                        partnerList.Add(reports);
                    }

                }
                pseRepot.PartnersList = partnerList;
                return pseRepot;
            }
        }
        public List<PSMReports> GetPSMReports(int userId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {

                var userDetails = context.GetPSMReports(userId, 2).ToList();

                var psmReportlist = new List<PSMReports>();
                foreach (var report in userDetails)
                {
                    var masnagerDetails = context.PSEManager(report.UserId).FirstOrDefault();
                    var aldetails = context.PSEAreaLead(report.UserId).FirstOrDefault();
                    var tmZone = context.PSETimeZoneLead(report.UserId).FirstOrDefault();
                    var pseRepot = new PSMReports();
                    pseRepot.FirstName = report.FirstName;
                    pseRepot.LastName = report.LastName;
                    pseRepot.EmailId = report.EmailID.Replace("@microsoft.com", "");
                    pseRepot.Country = report.Name;
                    pseRepot.Area = report.Area;
                    pseRepot.TimeZone = report.TimeZone;
                    pseRepot.ManagerFirstName = masnagerDetails.FirstName;
                    pseRepot.ManagerLastName = masnagerDetails.LastName;
                    pseRepot.ManagerAlias = masnagerDetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.AreaLeadFirstName = aldetails.FirstName;
                    pseRepot.AreaLeadLastName = aldetails.LastName;
                    pseRepot.AreaLeadAlias = aldetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.TimeZoneFirstName = tmZone.FirstName;
                    pseRepot.TimeZoneLastName = tmZone.LastName;
                    pseRepot.TimeZoneAlias = tmZone.EmailId.Replace("@microsoft.com", "");
                    pseRepot.Mplid = report.MPLID;
                    var partnername = context.GetMPLIDName(report.MPLID).ToList();
                    if (partnername.Count != 0)
                    {
                        var partner = partnername.FirstOrDefault();
                        pseRepot.PartnerName = partner.PartnerName;
                        pseRepot.DET = partner.DET;
                    }
                    pseRepot.PartnerResults = GetPartnerResults(report.UserId, report.PartnerId);
                    psmReportlist.Add(pseRepot);
                }
                return psmReportlist;
            }
        }
        public TopLeadsReport GetAreaReports(int userId)
        {
            var topLeadReport = new TopLeadsReport();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {

                var userDetails = context.GetPSMReports(userId, 3).ToList();
                var overallDetails = context.GetAllReports().ToList();

                var psmReportlist = new List<PSMReports>();
                var OverallReportlist = new List<PSMReports>();
                foreach (var report in userDetails)
                {
                    var masnagerDetails = context.PSEManager(report.UserId).FirstOrDefault();
                    var aldetails = context.PSEAreaLead(report.UserId).FirstOrDefault();
                    var tmZone = context.PSETimeZoneLead(report.UserId).FirstOrDefault();
                    var pseRepot = new PSMReports();
                    pseRepot.FirstName = report.FirstName;
                    pseRepot.LastName = report.LastName;
                    pseRepot.EmailId = report.EmailID.Replace("@microsoft.com", "");
                    pseRepot.Country = report.Name;
                    pseRepot.Area = report.Area;
                    pseRepot.TimeZone = report.TimeZone;
                    pseRepot.ManagerFirstName = masnagerDetails.FirstName;
                    pseRepot.ManagerLastName = masnagerDetails.LastName;
                    pseRepot.ManagerAlias = masnagerDetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.AreaLeadFirstName = aldetails.FirstName;
                    pseRepot.AreaLeadLastName = aldetails.LastName;
                    pseRepot.AreaLeadAlias = aldetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.TimeZoneFirstName = tmZone.FirstName;
                    pseRepot.TimeZoneLastName = tmZone.LastName;
                    pseRepot.TimeZoneAlias = tmZone.EmailId.Replace("@microsoft.com", "");
                    pseRepot.Mplid = report.MPLID;
                    var partnername = context.GetMPLIDName(report.MPLID).ToList();
                    if (partnername.Count != 0)
                    {
                        var partner = partnername.FirstOrDefault();
                        pseRepot.PartnerName = partner.PartnerName;
                        pseRepot.DET = partner.DET;
                    }
                    //pseRepot.PartnerName = partnername.PartnerName;
                    //pseRepot.DET = partnername.DET;
                    pseRepot.PartnerResults = GetPartnerResults(report.UserId, report.PartnerId);
                    psmReportlist.Add(pseRepot);
                }
                foreach (var report in overallDetails)
                {
                    var masnagerDetails = context.PSEManager(report.UserId).FirstOrDefault();
                    var aldetails = context.PSEAreaLead(report.UserId).FirstOrDefault();
                    var tmZone = context.PSETimeZoneLead(report.UserId).FirstOrDefault();
                    var pseRepot = new PSMReports();
                    pseRepot.FirstName = report.FirstName;
                    pseRepot.LastName = report.LastName;
                    pseRepot.EmailId = report.EmailID.Replace("@microsoft.com", "");
                    pseRepot.Country = report.Name;
                    pseRepot.Area = report.Area;
                    pseRepot.TimeZone = report.TimeZone;
                    pseRepot.ManagerFirstName = masnagerDetails.FirstName;
                    pseRepot.ManagerLastName = masnagerDetails.LastName;
                    pseRepot.ManagerAlias = masnagerDetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.AreaLeadFirstName = aldetails.FirstName;
                    pseRepot.AreaLeadLastName = aldetails.LastName;
                    pseRepot.AreaLeadAlias = aldetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.TimeZoneFirstName = tmZone.FirstName;
                    pseRepot.TimeZoneLastName = tmZone.LastName;
                    pseRepot.TimeZoneAlias = tmZone.EmailId.Replace("@microsoft.com", "");
                    pseRepot.Mplid = report.MPLID;
                    var partnername = context.GetMPLIDName(report.MPLID).ToList();
                    if (partnername.Count != 0)
                    {
                        var partner = partnername.FirstOrDefault();
                        pseRepot.PartnerName = partner.PartnerName;
                        pseRepot.DET = partner.DET;
                    }
                    pseRepot.PartnerResults = GetPartnerResults(report.UserId, report.PartnerId);
                    OverallReportlist.Add(pseRepot);
                }
                topLeadReport.YourReport = psmReportlist;
                topLeadReport.OverAllReport = OverallReportlist;
                return topLeadReport;
            }
        }
        public TopLeadsReport GetTimeZoneReports(int userId)
        {
            var topLeadReport = new TopLeadsReport();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {

                var userDetails = context.GetPSMReports(userId, 4).ToList();
                var overallDetails = context.GetAllReports().ToList();

                var psmReportlist = new List<PSMReports>();
                var OverallReportlist = new List<PSMReports>();
                foreach (var report in userDetails)
                {
                    var masnagerDetails = context.PSEManager(report.UserId).FirstOrDefault();
                    var aldetails = context.PSEAreaLead(report.UserId).FirstOrDefault();
                    var tmZone = context.PSETimeZoneLead(report.UserId).FirstOrDefault();
                    var pseRepot = new PSMReports();
                    pseRepot.FirstName = report.FirstName;
                    pseRepot.LastName = report.LastName;
                    pseRepot.EmailId = report.EmailID.Replace("@microsoft.com", "");
                    pseRepot.Country = report.Name;
                    pseRepot.Area = report.Area;
                    pseRepot.TimeZone = report.TimeZone;
                    pseRepot.ManagerFirstName = masnagerDetails.FirstName;
                    pseRepot.ManagerLastName = masnagerDetails.LastName;
                    pseRepot.ManagerAlias = masnagerDetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.AreaLeadFirstName = aldetails.FirstName;
                    pseRepot.AreaLeadLastName = aldetails.LastName;
                    pseRepot.AreaLeadAlias = aldetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.TimeZoneFirstName = tmZone.FirstName;
                    pseRepot.TimeZoneLastName = tmZone.LastName;
                    pseRepot.TimeZoneAlias = tmZone.EmailId.Replace("@microsoft.com", "");
                    pseRepot.Mplid = report.MPLID;
                    var partnername = context.GetMPLIDName(report.MPLID).ToList();
                    if (partnername.Count != 0)
                    {
                        var partner = partnername.FirstOrDefault();
                        pseRepot.PartnerName = partner.PartnerName;
                        pseRepot.DET = partner.DET;
                    }
                    pseRepot.PartnerResults = GetPartnerResults(report.UserId, report.PartnerId);
                    psmReportlist.Add(pseRepot);
                }
                foreach (var report in overallDetails)
                {
                    var masnagerDetails = context.PSEManager(report.UserId).FirstOrDefault();
                    var aldetails = context.PSEAreaLead(report.UserId).FirstOrDefault();
                    var tmZone = context.PSETimeZoneLead(report.UserId).FirstOrDefault();
                    var pseRepot = new PSMReports();
                    pseRepot.FirstName = report.FirstName;
                    pseRepot.LastName = report.LastName;
                    pseRepot.EmailId = report.EmailID.Replace("@microsoft.com", "");
                    pseRepot.Country = report.Name;
                    pseRepot.Area = report.Area;
                    pseRepot.TimeZone = report.TimeZone;
                    pseRepot.ManagerFirstName = masnagerDetails.FirstName;
                    pseRepot.ManagerLastName = masnagerDetails.LastName;
                    pseRepot.ManagerAlias = masnagerDetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.AreaLeadFirstName = aldetails.FirstName;
                    pseRepot.AreaLeadLastName = aldetails.LastName;
                    pseRepot.AreaLeadAlias = aldetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.TimeZoneFirstName = tmZone.FirstName;
                    pseRepot.TimeZoneLastName = tmZone.LastName;
                    pseRepot.TimeZoneAlias = tmZone.EmailId.Replace("@microsoft.com", "");
                    pseRepot.Mplid = report.MPLID;
                    var partnername = context.GetMPLIDName(report.MPLID).ToList();
                    if (partnername.Count != 0)
                    {
                        var partner = partnername.FirstOrDefault();
                        pseRepot.PartnerName = partner.PartnerName;
                        pseRepot.DET = partner.DET;
                    }
                    pseRepot.PartnerResults = GetPartnerResults(report.UserId, report.PartnerId);
                    OverallReportlist.Add(pseRepot);
                }
                topLeadReport.YourReport = psmReportlist;
                topLeadReport.OverAllReport = OverallReportlist;
                return topLeadReport;
            }
        }
        public StakeHolders GetStakeHolderReports()
        {
            var topLeadReport = new StakeHolders();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var overallDetails = context.GetAllReports().ToList();
                var AsiaPacific = OverAllReportsByArea(6);
                var Canada = OverAllReportsByArea(10);
                var CEE = OverAllReportsByArea(9);
                var France = OverAllReportsByArea(11);
                var GreaterChina = OverAllReportsByArea(7);
                var Germany = OverAllReportsByArea(4);
                var India = OverAllReportsByArea(5);
                var Japan = OverAllReportsByArea(13);
                var Latam = OverAllReportsByArea(12);
                var MEA = OverAllReportsByArea(8);
                var UnitedKingdom = OverAllReportsByArea(3);
                var UnitedStates = OverAllReportsByArea(1);
                var WesternEurope = OverAllReportsByArea(2);
                topLeadReport.AsiaPacific = AsiaPacific;
                topLeadReport.Canada = Canada;
                topLeadReport.CEE = CEE;
                topLeadReport.France = France;
                topLeadReport.GCR = GreaterChina;
                topLeadReport.Germany = Germany;
                topLeadReport.India = India;
                topLeadReport.Japan = Japan;
                topLeadReport.Latam = Latam;
                topLeadReport.MEA = MEA;
                topLeadReport.UK = UnitedKingdom;
                topLeadReport.US = UnitedStates;
                topLeadReport.WE = WesternEurope;
                var OverallReportlist = new List<PSMReports>();

                foreach (var report in overallDetails)
                {
                    var masnagerDetails = context.PSEManager(report.UserId).FirstOrDefault();
                    var aldetails = context.PSEAreaLead(report.UserId).FirstOrDefault();
                    var tmZone = context.PSETimeZoneLead(report.UserId).FirstOrDefault();
                    var pseRepot = new PSMReports();
                    pseRepot.FirstName = report.FirstName;
                    pseRepot.LastName = report.LastName;
                    pseRepot.EmailId = report.EmailID.Replace("@microsoft.com", "");
                    pseRepot.Country = report.Name;
                    pseRepot.Area = report.Area;
                    pseRepot.TimeZone = report.TimeZone;
                    pseRepot.ManagerFirstName = masnagerDetails.FirstName;
                    pseRepot.ManagerLastName = masnagerDetails.LastName;
                    pseRepot.ManagerAlias = masnagerDetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.AreaLeadFirstName = aldetails.FirstName;
                    pseRepot.AreaLeadLastName = aldetails.LastName;
                    pseRepot.AreaLeadAlias = aldetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.TimeZoneFirstName = tmZone.FirstName;
                    pseRepot.TimeZoneLastName = tmZone.LastName;
                    pseRepot.TimeZoneAlias = tmZone.EmailId.Replace("@microsoft.com", "");
                    pseRepot.Mplid = report.MPLID;
                    var partnername = context.GetMPLIDName(report.MPLID).ToList();
                    if (partnername.Count != 0)
                    {
                        var partner = partnername.FirstOrDefault();
                        pseRepot.PartnerName = partner.PartnerName;
                        pseRepot.DET = partner.DET;
                    }
                    pseRepot.PartnerResults = GetPartnerResults(report.UserId, report.PartnerId);
                    OverallReportlist.Add(pseRepot);
                }

                topLeadReport.OverAllData = OverallReportlist;
                return topLeadReport;
            }
        }
        public StakeHolders GetOverallReportsCalculated()
        {
            var topLeadReport = new StakeHolders();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var overallDetails = context.GetAllReports().ToList();
                var OverallReportlist = new List<PSMReports>();
                var totalprogress = CompleteReports(245, 6);
                var omnivores = 0;
                var highVelocity = 0;
                var industrySpecialists = 0;
                var presidentsClub = 0;
                var overallCount = overallDetails.Count();
                var counts = 1;
                foreach (var report in overallDetails)
                {
                    var masnagerDetails = context.PSEManager(report.UserId).FirstOrDefault();
                    var aldetails = context.PSEAreaLead(report.UserId).FirstOrDefault();
                    var tmZone = context.PSETimeZoneLead(report.UserId).FirstOrDefault();
                    var pseRepot = new PSMReports();
                    pseRepot.FirstName = report.FirstName;
                    pseRepot.LastName = report.LastName;
                    pseRepot.EmailId = report.EmailID.Replace("@microsoft.com", "");
                    pseRepot.Country = report.Name;
                    pseRepot.Area = report.Area;
                    pseRepot.TimeZone = report.TimeZone;
                    pseRepot.ManagerFirstName = masnagerDetails.FirstName;
                    pseRepot.ManagerLastName = masnagerDetails.LastName;
                    pseRepot.ManagerAlias = masnagerDetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.AreaLeadFirstName = aldetails.FirstName;
                    pseRepot.AreaLeadLastName = aldetails.LastName;
                    pseRepot.AreaLeadAlias = aldetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.TimeZoneFirstName = tmZone.FirstName;
                    pseRepot.TimeZoneLastName = tmZone.LastName;
                    pseRepot.TimeZoneAlias = tmZone.EmailId.Replace("@microsoft.com", "");
                    pseRepot.Mplid = report.MPLID;
                    pseRepot.Order = counts;
                    pseRepot.Role = report.Roles;
                    var partnername = context.GetMPLIDName(report.MPLID).ToList();
                    if (partnername.Count != 0)
                    {
                        var partner = partnername.FirstOrDefault();
                        pseRepot.PartnerName = partner.PartnerName;
                        pseRepot.DET = partner.DET;
                    }
                    else
                    {
                        pseRepot.PartnerName = report.MPLID;
                        pseRepot.DET = "MBS Account Managed_Sol";

                    }
                    var axisvalue = GetAxisvalue(report.UserId, report.PartnerId);

                    if (axisvalue.XAxis < 5.1 && axisvalue.YAxis < 5.1)
                    {
                        pseRepot.Omnivores = 1;
                        pseRepot.HighVelocity = 0;
                        pseRepot.IndustrySpecialist = 0;
                        pseRepot.President = 0;
                        pseRepot.ModeName = "3. Omnivores";
                        omnivores = omnivores + 1;
                    }
                    else if (axisvalue.XAxis < 10 && axisvalue.YAxis < 5.1)
                    {
                        pseRepot.Omnivores = 0;
                        pseRepot.HighVelocity = 1;
                        pseRepot.IndustrySpecialist = 0;
                        pseRepot.President = 0;
                        pseRepot.ModeName = "2. High Velocity";
                        highVelocity = highVelocity + 1;
                    }
                    else if (axisvalue.XAxis < 5.1 && axisvalue.YAxis < 10)
                    {
                        pseRepot.Omnivores = 0;
                        pseRepot.HighVelocity = 0;
                        pseRepot.IndustrySpecialist = 1;
                        pseRepot.President = 0;
                        pseRepot.ModeName = "4. Industry Specialists";
                        industrySpecialists = industrySpecialists + 1;
                    }
                    else
                    {
                        pseRepot.Omnivores = 0;
                        pseRepot.HighVelocity = 0;
                        pseRepot.IndustrySpecialist = 0;
                        pseRepot.President = 1;
                        pseRepot.ModeName = "1. President's Club";
                        presidentsClub = presidentsClub + 1;
                    }

                    pseRepot.OverallCount = overallCount;
                    pseRepot.XAxis = axisvalue.XAxis;
                    pseRepot.YAxis = axisvalue.YAxis;
                    pseRepot.IndFcous1 = axisvalue.IndustryF1;
                    pseRepot.IndFcous2 = axisvalue.IndustryF2;
                    pseRepot.Partners = 1;
                    pseRepot.Completions = 1;
                    OverallReportlist.Add(pseRepot);
                    counts++;
                }
                foreach (var report in OverallReportlist)
                {
                    report.OverallOmnivores = omnivores;
                    report.OverallHighVelocity = highVelocity;
                    report.OverallIndustrySpecialist = industrySpecialists;
                    report.OverallPresident = presidentsClub;
                }
                foreach (var prog in totalprogress)
                {
                    var Reports = new PSMReports();
                    Reports.Partners = 1;
                    Reports.Completions = 0;
                    Reports.DET = prog.DET;
                    Reports.TimeZone = prog.TimeZone;
                    Reports.Area = prog.Area;
                    Reports.Country = prog.Country;
                    Reports.FirstName = prog.FirstName;
                    Reports.LastName = prog.LastName;
                    Reports.Role = prog.Role;
                    Reports.Mplid = prog.Mplid;
                    var partnername = context.GetMPLIDName(Reports.Mplid).ToList();
                    if (partnername.Count != 0)
                    {
                        var partner = partnername.FirstOrDefault();
                        Reports.PartnerName = partner.PartnerName;
                        Reports.DET = partner.DET;
                    }
                    else
                    {
                        Reports.PartnerName = Reports.Mplid;
                        Reports.DET = "MBS Account Managed_Sol";

                    }

                    OverallReportlist.Add(Reports);
                }
                //OverallReportlist.AddRange(totalprogress.Select(prog => new PSMReports
                //                                                        {
                //                                                            Partners = 1,
                //                                                            Completions = 0,
                //                                                            DET = prog.DET,
                //                                                            TimeZone = prog.TimeZone,
                //                                                            Area = prog.Area,
                //                                                            Country = prog.Country,
                //                                                            FirstName = prog.FirstName,
                //                                                            LastName = prog.LastName,
                //                                                            Role = prog.Role,
                //                                                            Mplid=prog.Mplid,
                                                                            
                //                                                        }));

                topLeadReport.OverAllData = OverallReportlist;
                return topLeadReport;
            }
        }
        public List<PPAResults> GetStakeHolderReportCalculated()
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var overallDetails = context.GetAllReports().ToList();
                var ppaResults = new List<PPAResults>();
                foreach (var report in overallDetails)
                {
                    var answerlist = context.GenerateReportPowerBi(report.UserId, report.PartnerId).ToList();
                    foreach (var answer in answerlist)
                    {
                        var yes = -1;
                        var no = -1;
                        if (answer.Answer.ToLower() == "yes")
                        {
                            yes = 1;
                            no = 0;
                        }
                        else if (answer.Answer.ToLower() == "no")
                        {
                            yes = 0;
                            no = 1;
                        }
                        var newpartner = report.MPLID;
                        var partnername = context.GetMPLIDName(report.MPLID).ToList();
                        if (partnername.Count != 0)
                        {
                            var partner = partnername.FirstOrDefault();
                            newpartner = partner.PartnerName;
                        }
                        var result = new PPAResults
                                     {
                                         QuestionId = answer.QuestionId,
                                         Answer = (int)answer.AnswerValue,
                                         AnswerText = answer.Answer,
                                         ModuleId = answer.POEModuleId,
                                         Question = answer.ReportQuestion,
                                         ModuleName = answer.ModuleName,
                                         Area = report.Area,
                                         TimeZone = report.TimeZone,
                                         Country = report.Name,
                                         Yes = yes,
                                         No = no,
                                         PartnerName = newpartner,
                                         PSEName = report.FirstName + " " + report.LastName,
                                         Roles = report.Roles
                                     };
                        ppaResults.Add(result);
                    }

                }

                return ppaResults;
            }
        }
        public List<PSMReports> GetReportsCalculated(int userId, int mode)
        {

            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                // var userDetails = context.GetPSMReports(userId, 4).ToList();
                var totalprogress = CompleteReports(userId, mode);
                var overallDetails = context.GetPSMReports(userId, mode).ToList();
                var omnivores = 0;
                var highVelocity = 0;
                var industrySpecialists = 0;
                var presidentsClub = 0;
                var overallCount = overallDetails.Count();
                var counts = 1;
                var overallReportlist = new List<PSMReports>();
                foreach (var report in overallDetails)
                {
                    var masnagerDetails = context.PSEManager(report.UserId).FirstOrDefault();
                    var aldetails = context.PSEAreaLead(report.UserId).FirstOrDefault();
                    var tmZone = context.PSETimeZoneLead(report.UserId).FirstOrDefault();
                    var pseRepot = new PSMReports();
                    pseRepot.FirstName = report.FirstName;
                    pseRepot.LastName = report.LastName;
                    pseRepot.EmailId = report.EmailID.Replace("@microsoft.com", "");
                    pseRepot.Country = report.Name;
                    pseRepot.Area = report.Area;
                    pseRepot.TimeZone = report.TimeZone;
                    pseRepot.ManagerFirstName = masnagerDetails.FirstName;
                    pseRepot.ManagerLastName = masnagerDetails.LastName;
                    pseRepot.ManagerAlias = masnagerDetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.AreaLeadFirstName = aldetails.FirstName;
                    pseRepot.AreaLeadLastName = aldetails.LastName;
                    pseRepot.AreaLeadAlias = aldetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.TimeZoneFirstName = tmZone.FirstName;
                    pseRepot.TimeZoneLastName = tmZone.LastName;
                    pseRepot.TimeZoneAlias = tmZone.EmailId.Replace("@microsoft.com", "");
                    pseRepot.Mplid = report.MPLID;
                    pseRepot.Order = counts;
                    pseRepot.Role = report.Roles;
                    var partnername = context.GetMPLIDName(report.MPLID).ToList();
                    if (partnername.Count != 0)
                    {
                        var partner = partnername.FirstOrDefault();
                        pseRepot.PartnerName = partner.PartnerName;
                        pseRepot.DET = partner.DET;
                    }
                    else
                    {
                        pseRepot.PartnerName = report.MPLID;
                        pseRepot.DET = "MBS Account Managed_Sol";

                    }
                    var axisvalue = GetAxisvalue(report.UserId, report.PartnerId);

                    if (axisvalue.XAxis < 5.1 && axisvalue.YAxis < 5.1)
                    {
                        pseRepot.Omnivores = 1;
                        pseRepot.HighVelocity = 0;
                        pseRepot.IndustrySpecialist = 0;
                        pseRepot.President = 0;
                        pseRepot.ModeName = "3. Omnivores";
                        omnivores = omnivores + 1;
                    }
                    else if (axisvalue.XAxis < 10 && axisvalue.YAxis < 5.1)
                    {
                        pseRepot.Omnivores = 0;
                        pseRepot.HighVelocity = 1;
                        pseRepot.IndustrySpecialist = 0;
                        pseRepot.President = 0;
                        pseRepot.ModeName = "2. High Velocity";
                        highVelocity = highVelocity + 1;
                    }
                    else if (axisvalue.XAxis < 5.1 && axisvalue.YAxis < 10)
                    {
                        pseRepot.Omnivores = 0;
                        pseRepot.HighVelocity = 0;
                        pseRepot.IndustrySpecialist = 1;
                        pseRepot.President = 0;
                        pseRepot.ModeName = "4. Industry Specialists";
                        industrySpecialists = industrySpecialists + 1;
                    }
                    else
                    {
                        pseRepot.Omnivores = 0;
                        pseRepot.HighVelocity = 0;
                        pseRepot.IndustrySpecialist = 0;
                        pseRepot.President = 1;
                        pseRepot.ModeName = "1. President's Club";
                        presidentsClub = presidentsClub + 1;
                    }

                    pseRepot.OverallCount = overallCount;
                    pseRepot.XAxis = axisvalue.XAxis;
                    pseRepot.YAxis = axisvalue.YAxis;
                    pseRepot.IndFcous1 = axisvalue.IndustryF1;
                    pseRepot.IndFcous2 = axisvalue.IndustryF2;
                    pseRepot.Partners = 1;
                    pseRepot.Completions = 1;
                    overallReportlist.Add(pseRepot);
                    counts++;
                }
                foreach (var report in overallReportlist)
                {
                    report.OverallOmnivores = omnivores;
                    report.OverallHighVelocity = highVelocity;
                    report.OverallIndustrySpecialist = industrySpecialists;
                    report.OverallPresident = presidentsClub;
                }
                foreach (var prog in totalprogress)
                {
                    var Reports = new PSMReports();
                    Reports.Partners = 1;
                    Reports.Completions = 0;
                    Reports.DET = prog.DET;
                    Reports.TimeZone = prog.TimeZone;
                    Reports.Area = prog.Area;
                    Reports.Country = prog.Country;
                    Reports.FirstName = prog.FirstName;
                    Reports.LastName = prog.LastName;
                    Reports.Role = prog.Role;
                    Reports.Mplid = prog.Mplid;
                    var partnername = context.GetMPLIDName(Reports.Mplid).ToList();
                    if (partnername.Count != 0)
                    {
                        var partner = partnername.FirstOrDefault();
                        Reports.PartnerName = partner.PartnerName;
                        Reports.DET = partner.DET;
                    }
                    else
                    {
                        Reports.PartnerName = Reports.Mplid;
                        Reports.DET = "MBS Account Managed_Sol";

                    }

                    overallReportlist.Add(Reports);
                }
                //overallReportlist.AddRange(totalprogress.Select(prog => new PSMReports
                //                                                        {
                //                                                            Partners = 1,
                //                                                            Completions = 0,
                //                                                            DET = prog.DET,
                //                                                            TimeZone = prog.TimeZone,
                //                                                            Area = prog.Area,
                //                                                            Country = prog.Country,
                //                                                            FirstName = prog.FirstName,
                //                                                            LastName = prog.LastName,
                //                                                            Role = prog.Role
                //                                                            //Omnivores = 0,
                //                                                            //HighVelocity = 0,
                //                                                            //IndustrySpecialist = 0,
                //                                                            //President = 0
                //                                                        }));

                //  overallReportlist.OverAllData = overallReportlist;
                return overallReportlist;
            }
        }
        public List<PPAResults> GetReportsCalcNext(int userId, int mode)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var overallDetails = context.GetPSMReports(userId, mode).ToList();
                var ppaResults = new List<PPAResults>();
                foreach (var report in overallDetails)
                {
                    var answerlist = context.GenerateReportPowerBi(report.UserId, report.PartnerId).ToList();
                    foreach (var answer in answerlist)
                    {
                        var yes = -1;
                        var no = -1;
                        if (answer.Answer.ToLower() == "yes")
                        {
                            yes = 1;
                            no = 0;
                        }
                        else if (answer.Answer.ToLower() == "no")
                        {
                            yes = 0;
                            no = 1;
                        }
                        var newpartner = report.MPLID;
                        var partnername = context.GetMPLIDName(report.MPLID).ToList();
                        if (partnername.Count != 0)
                        {
                            var partner = partnername.FirstOrDefault();
                            newpartner = partner.PartnerName;
                        }
                        var result = new PPAResults
                        {
                            QuestionId = answer.QuestionId,
                            Answer = (int)answer.AnswerValue,
                            AnswerText = answer.Answer,
                            ModuleId = answer.POEModuleId,
                            Question = answer.ReportQuestion,
                            ModuleName = answer.ModuleName,
                            Area = report.Area,
                            TimeZone = report.TimeZone,
                            Country = report.Name,
                            Yes = yes,
                            No = no,
                            PartnerName = newpartner,
                            PSEName = report.FirstName + " " + report.LastName,
                            Roles = report.Roles
                        };
                        ppaResults.Add(result);
                    }

                }

                return ppaResults;
            }
        }
        public getAxis GetAxisvalue(int userId, int partnerId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var getaxis = new getAxis();
                var usrList = context.GenerateReportPowerBi(userId, partnerId).ToList();
                var momentum = usrList.Where(a => a.POEModuleId == 1).ToList();
                var marketting = usrList.Where(a => a.POEModuleId == 2).ToList();
                var sales = usrList.Where(a => a.POEModuleId == 3).ToList();
                var focus1 = usrList.Where(a => a.POEModuleId == 4).ToList();
                var focus = usrList.Where(a => a.POEModuleId == 4 && a.QuestionId != 29 && a.QuestionId != 30).ToList();
                var services = usrList.Where(a => a.POEModuleId == 5).ToList();
                var ip = usrList.Where(a => a.POEModuleId == 6).ToList();

                var momentValue = ((double)(momentum.Sum(a => a.AnswerValue)) / 59) * 10;
                var markettingValue = ((double)(marketting.Sum(a => a.AnswerValue)) / 55) * 10;
                var salesValue = ((double)(sales.Sum(a => a.AnswerValue)) / 53) * 10;
                var focusValue = ((double)(focus.Sum(a => a.AnswerValue)) / 45) * 10;
                var servicesValue = ((double)(services.Sum(a => a.AnswerValue)) / 32) * 10;
                var ipValue = ((double)(ip.Sum(a => a.AnswerValue)) / 39) * 10;
                var xAxis = ((double)(momentValue + markettingValue + salesValue)) / 3;
                var yAxis = (focusValue + servicesValue + ipValue) / 3;
                getaxis.XAxis = xAxis;
                getaxis.YAxis = yAxis;
                getaxis.IndustryF1 = focus1.FirstOrDefault(a => a.QuestionId == 29).Answer;
                getaxis.IndustryF2 = focus1.FirstOrDefault(a => a.QuestionId == 30).Answer;
                return getaxis;
            }
        }
        public List<getAxis> GetPSEReportCalculated(int userId, int partnerId, string mplId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
              //  GetPSEReportCalculatedNew(userId, partnerId, mplId);
                var getaxis = new getAxis();
                var getlistAxis = new List<getAxis>();
                var usrList = context.GenerateReportPowerBi(userId, partnerId).ToList();

                var momentum = usrList.Where(a => a.POEModuleId == 1).ToList();
                var marketting = usrList.Where(a => a.POEModuleId == 2).ToList();
                var sales = usrList.Where(a => a.POEModuleId == 3).ToList();
                var focus = usrList.Where(a => a.POEModuleId == 4 && a.QuestionId != 29 && a.QuestionId != 30).ToList();
                var services = usrList.Where(a => a.POEModuleId == 5).ToList();
                var ip = usrList.Where(a => a.POEModuleId == 6).ToList();

                var momentValue = ((double)(momentum.Sum(a => a.AnswerValue)) / 59) * 10;
                var markettingValue = ((double)(marketting.Sum(a => a.AnswerValue)) / 55) * 10;
                var salesValue = ((double)(sales.Sum(a => a.AnswerValue)) / 53) * 10;
                var focusValue = ((double)(focus.Sum(a => a.AnswerValue)) / 45) * 10;
                var servicesValue = ((double)(services.Sum(a => a.AnswerValue)) / 32) * 10;
                var ipValue = ((double)(ip.Sum(a => a.AnswerValue)) / 39) * 10;
                var xAxis = ((double)(momentValue + markettingValue + salesValue)) / 3;
                var yAxis = (focusValue + servicesValue + ipValue) / 3;

                foreach (var answer in usrList)
                {
                    var getaxis1 = new getAxis
                                   {
                                       ModuleName = answer.ModuleName,
                                       Answer = answer.Answer,
                                       AnswerValue = (answer.QuestionId == 29 || answer.QuestionId == 30) ? -1 : (int)answer.AnswerValue,
                                       Question = answer.Question,
                                       FullQuestion = answer.BriefQuestion,
                                       Title = (answer.POEModuleId == 1 || answer.POEModuleId == 2 || answer.POEModuleId == 3) ? "Customer Acquisition" : "Industry Focus",
                                       XAxis = xAxis,
                                       YAxis = yAxis


                                   };
                    getlistAxis.Add(getaxis1);
                }
                getaxis.ActualPerformance = momentValue;
                getaxis.PerformanceGap = 10 - (double)momentValue;
                // getaxis.ReportId = reportId;
                getaxis.SolutionName = "Core Momentum";
                //  getaxis.Title = "Customer Acquisition";
                getlistAxis.Add(getaxis);


                var getaxis2 = new getAxis();
                getaxis2.ActualPerformance = markettingValue;
                getaxis2.PerformanceGap = 10 - (double)markettingValue;
                getaxis2.SolutionName = "Marketing";
                // getaxis2.Title = "Customer Acquisition";
                getlistAxis.Add(getaxis2);

                var getaxis3 = new getAxis();
                getaxis3.ActualPerformance = salesValue;
                getaxis3.PerformanceGap = 10 - (double)salesValue;
                getaxis3.SolutionName = "Sales";
                // getaxis3.Title = "Customer Acquisition";
                getlistAxis.Add(getaxis3);

                var getaxis4 = new getAxis();
                getaxis4.ActualPerformance = focusValue;
                getaxis4.PerformanceGap = 10 - (double)focusValue;
                getaxis4.SolutionName = "Focus";
                //  getaxis4.Title = " Industry Focus";
                getlistAxis.Add(getaxis4);

                var getaxis5 = new getAxis();
                getaxis5.ActualPerformance = servicesValue;
                getaxis5.PerformanceGap = 10 - (double)servicesValue;
                getaxis5.SolutionName = "Services";
                //getaxis5.Title = " Industry Focus";
                getlistAxis.Add(getaxis5);

                var getaxis6 = new getAxis();
                getaxis6.ActualPerformance = ipValue;
                getaxis6.PerformanceGap = 10 - (double)ipValue;
                getaxis6.SolutionName = "IP";
                var partnername = context.GetMPLIDName(mplId).ToList();
                var partnerNameByMPLID = mplId;
                if (partnername.Count != 0)
                {
                    var partner = partnername.FirstOrDefault();
                    partnerNameByMPLID = partner.PartnerName;

                }

                getaxis6.PartnerName = partnerNameByMPLID;
                //   getaxis6.Title = " Industry Focus";
                getlistAxis.Add(getaxis6);

                return getlistAxis;
            }
        }
        public List<getAxis> GetPSEReportCalculatedNew(int userId, int partnerId, string mplId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
              
                var getlistAxis = new List<getAxis>();
                var usrList = context.GenerateReportPowerBiUpdated(userId, partnerId).ToList();
                var grpPartner = from usr in usrList
                                 group usr by usr.POEFeedbackId
                                     into g
                                     select new { Feedbackid = g.Key, Answers = g.ToList() };
                var startIndex = 1;
                foreach (var grp in grpPartner)
                {
                    var date = String.Format("{0:MM/dd/yyyy}", grp.Answers.FirstOrDefault().StartDate);
                    var momentum = grp.Answers.Where(a => a.POEModuleId == 1).ToList();
                    var marketting = grp.Answers.Where(a => a.POEModuleId == 2).ToList();
                    var sales = grp.Answers.Where(a => a.POEModuleId == 3).ToList();
                    var focus = grp.Answers.Where(a => a.POEModuleId == 4 && a.QuestionId != 29 && a.QuestionId != 30).ToList();
                    var services = grp.Answers.Where(a => a.POEModuleId == 5).ToList();
                    var ip = grp.Answers.Where(a => a.POEModuleId == 6).ToList();

                    var momentValue = ((double)(momentum.Sum(a => a.AnswerValue)) / 59) * 10;
                    var markettingValue = ((double)(marketting.Sum(a => a.AnswerValue)) / 55) * 10;
                    var salesValue = ((double)(sales.Sum(a => a.AnswerValue)) / 53) * 10;
                    var focusValue = ((double)(focus.Sum(a => a.AnswerValue)) / 45) * 10;
                    var servicesValue = ((double)(services.Sum(a => a.AnswerValue)) / 32) * 10;
                    var ipValue = ((double)(ip.Sum(a => a.AnswerValue)) / 39) * 10;
                    var xAxis = ((double)(momentValue + markettingValue + salesValue)) / 3;
                    var yAxis = (focusValue + servicesValue + ipValue) / 3;
                    if (startIndex == 1)
                    {
                        foreach (var answer in grp.Answers)
                        {
                            var getaxis1 = new getAxis
                                           {
                                               ModuleName = answer.ModuleName,
                                               Answer = answer.Answer,
                                               AnswerValue =
                                                   (answer.QuestionId == 29 || answer.QuestionId == 30)
                                                       ? -1
                                                       : (int) answer.AnswerValue,
                                               Question = answer.Question,
                                               FullQuestion = answer.BriefQuestion,
                                               Title =
                                                   (answer.POEModuleId == 1 || answer.POEModuleId == 2 ||
                                                    answer.POEModuleId == 3)
                                                       ? "Customer Acquisition"
                                                       : "Industry Focus"
                                               //XAxis = xAxis,
                                               //YAxis = yAxis,
                                              // StartDate = String.Format("{0:MM/dd/yyyy}", answer.StartDate)


                                           };
                            getlistAxis.Add(getaxis1);
                        }
                    }
                    var getaxis = new getAxis();
                    getaxis.ActualPerformance = momentValue;
                    getaxis.PerformanceGap = 10 - (double)momentValue;
                    // getaxis.ReportId = reportId;
                    getaxis.SolutionName = "Core Momentum";
                    getaxis.StartDate = date;
                    getaxis.XAxis = xAxis;
                    getaxis.YAxis = yAxis;
                    //  getaxis.Title = "Customer Acquisition";
                    getlistAxis.Add(getaxis);


                    var getaxis2 = new getAxis();
                    getaxis2.ActualPerformance = markettingValue;
                    getaxis2.PerformanceGap = 10 - (double)markettingValue;
                    getaxis2.SolutionName = "Marketing";
                    getaxis2.StartDate = date;
                    getaxis2.XAxis = xAxis;
                    getaxis2.YAxis = yAxis;
                    // getaxis2.Title = "Customer Acquisition";
                    getlistAxis.Add(getaxis2);

                    var getaxis3 = new getAxis();
                    getaxis3.ActualPerformance = salesValue;
                    getaxis3.PerformanceGap = 10 - (double)salesValue;
                    getaxis3.SolutionName = "Sales";
                    getaxis3.StartDate = date;
                    getaxis3.XAxis = xAxis;
                    getaxis3.YAxis = yAxis;
                    // getaxis3.Title = "Customer Acquisition";
                    getlistAxis.Add(getaxis3);

                    var getaxis4 = new getAxis();
                    getaxis4.ActualPerformance = focusValue;
                    getaxis4.PerformanceGap = 10 - (double)focusValue;
                    getaxis4.SolutionName = "Focus";
                    getaxis4.StartDate = date;
                    getaxis4.XAxis = xAxis;
                    getaxis4.YAxis = yAxis;
                    //  getaxis4.Title = " Industry Focus";
                    getlistAxis.Add(getaxis4);

                    var getaxis5 = new getAxis();
                    getaxis5.ActualPerformance = servicesValue;
                    getaxis5.PerformanceGap = 10 - (double)servicesValue;
                    getaxis5.SolutionName = "Services";
                    getaxis5.StartDate = date;
                    getaxis5.XAxis = xAxis;
                    getaxis5.YAxis = yAxis;
                    //getaxis5.Title = " Industry Focus";
                    getlistAxis.Add(getaxis5);

                    var getaxis6 = new getAxis();
                    getaxis6.ActualPerformance = ipValue;
                    getaxis6.PerformanceGap = 10 - (double)ipValue;
                    getaxis6.SolutionName = "IP";
                    getaxis6.StartDate = date;
                    getaxis6.XAxis = xAxis;
                    getaxis6.YAxis = yAxis;
                    var partnername = context.GetMPLIDName(mplId).ToList();
                    var partnerNameByMPLID = mplId;
                    if (partnername.Count != 0)
                    {
                        var partner = partnername.FirstOrDefault();
                        partnerNameByMPLID = partner.PartnerName;

                    }

                    getaxis6.PartnerName = partnerNameByMPLID;
                    //   getaxis6.Title = " Industry Focus";
                    getlistAxis.Add(getaxis6);

                    //var getaxis9 = new getAxis();

                    //getaxis9.StartDate = date;
                    //getaxis9.XAxis = xAxis;
                    //getaxis9.YAxis = yAxis;
                    ////  getaxis4.Title = " Industry Focus";
                    //getlistAxis.Add(getaxis9);
                    startIndex++;
                }


                return getlistAxis;
            }
        }
        public List<PSMReports> OverAllReportsByArea(int areaId)
        {

            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var overallDetails = context.GetAllReportsByArea(areaId).ToList();

                var OverallReportlist = new List<PSMReports>();
                foreach (var report in overallDetails)
                {
                    var masnagerDetails = context.PSEManager(report.UserId).FirstOrDefault();
                    var aldetails = context.PSEAreaLead(report.UserId).FirstOrDefault();
                    var tmZone = context.PSETimeZoneLead(report.UserId).FirstOrDefault();
                    var pseRepot = new PSMReports();
                    pseRepot.FirstName = report.FirstName;
                    pseRepot.LastName = report.LastName;
                    pseRepot.EmailId = report.EmailID.Replace("@microsoft.com", "");
                    pseRepot.Country = report.Name;
                    pseRepot.Area = report.Area;
                    pseRepot.TimeZone = report.TimeZone;
                    pseRepot.ManagerFirstName = masnagerDetails.FirstName;
                    pseRepot.ManagerLastName = masnagerDetails.LastName;
                    pseRepot.ManagerAlias = masnagerDetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.AreaLeadFirstName = aldetails.FirstName;
                    pseRepot.AreaLeadLastName = aldetails.LastName;
                    pseRepot.AreaLeadAlias = aldetails.EmailId.Replace("@microsoft.com", "");
                    pseRepot.TimeZoneFirstName = tmZone.FirstName;
                    pseRepot.TimeZoneLastName = tmZone.LastName;
                    pseRepot.TimeZoneAlias = tmZone.EmailId.Replace("@microsoft.com", "");
                    pseRepot.Mplid = report.MPLID;
                    var partnername = context.GetMPLIDName(report.MPLID).ToList();
                    if (partnername.Count != 0)
                    {
                        var partner = partnername.FirstOrDefault();
                        pseRepot.PartnerName = partner.PartnerName;
                        pseRepot.DET = partner.DET;
                    }
                    pseRepot.PartnerResults = GetPartnerResults(report.UserId, report.PartnerId);
                    OverallReportlist.Add(pseRepot);
                }

                return OverallReportlist;
            }
        }

        public CompleteStatus GetCompleteStatus(int userId, int deisgnationId)
        {
            var status = new CompleteStatus();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var com = context.GetOverAllDETByDesignation(userId, deisgnationId).FirstOrDefault();
                status.AssesmentCompletedAM = (int)com.AssesmentCompletedAM;
                status.AssesmentCompletedRM = (int)com.AssesmentCompletedRM;
                status.AssesmentCompletedVM = (int)com.AssesmentCompletedVM;
                status.AssesmentCreatedAM = (int)com.AssesmentCreatedAM;
                status.AssesmentCreatedRM = (int)com.AssesmentCreatedRM;
                status.AssesmentCreatedVM = (int)com.AssesmentCreatedVM;
                status.PartnerAM = (int)com.PartnerAM;
                status.PartnerRM = (int)com.PartnerRM;
                status.PartnerVM = (int)com.PartnerVM;
            }
            return status;
        }
        public List<PSMReports> CompleteReports(int userId, int deisgnationId)
        {
            var statusList = new List<PSMReports>();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var com = context.GetOverAllPartnersByDesignation(userId, deisgnationId).ToList();
                statusList.AddRange(com.Select(partner => new PSMReports
                                                          {
                                                              DET = partner.DET,
                                                              TimeZone = partner.Timezone,
                                                              Area = partner.Area,
                                                              Country = partner.CountryName,
                                                              FirstName = partner.FirstName,
                                                              LastName = partner.LastName,
                                                              Role = partner.Role,
                                                              Mplid = partner.MPLID
                                                          }));
            }
            return statusList;
        }
        public CompleteStatus GetCompleteStatusByArea(int userId, int deisgnationId, int areaId)
        {
            var status = new CompleteStatus();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var com = context.GetOverAllDETByDesignationByArea(userId, deisgnationId, areaId).FirstOrDefault();
                status.AssesmentCompletedAM = (int)com.AssesmentCompletedAM;
                status.AssesmentCompletedRM = (int)com.AssesmentCompletedRM;
                status.AssesmentCompletedVM = (int)com.AssesmentCompletedVM;
                status.AssesmentCreatedAM = (int)com.AssesmentCreatedAM;
                status.AssesmentCreatedRM = (int)com.AssesmentCreatedRM;
                status.AssesmentCreatedVM = (int)com.AssesmentCreatedVM;
                status.PartnerAM = (int)com.PartnerAM;
                status.PartnerRM = (int)com.PartnerRM;
                status.PartnerVM = (int)com.PartnerVM;
            }
            return status;
        }
        public CompleteStatus GetCompleteStatusByCountry(int userId, int deisgnationId, int countryId)
        {
            var status = new CompleteStatus();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var com = context.GetOverAllDETByDesignationByCountry(userId, deisgnationId, countryId).FirstOrDefault();
                status.AssesmentCompletedAM = (int)com.AssesmentCompletedAM;
                status.AssesmentCompletedRM = (int)com.AssesmentCompletedRM;
                status.AssesmentCompletedVM = (int)com.AssesmentCompletedVM;
                status.AssesmentCreatedAM = (int)com.AssesmentCreatedAM;
                status.AssesmentCreatedRM = (int)com.AssesmentCreatedRM;
                status.AssesmentCreatedVM = (int)com.AssesmentCreatedVM;
                status.PartnerAM = (int)com.PartnerAM;
                status.PartnerRM = (int)com.PartnerRM;
                status.PartnerVM = (int)com.PartnerVM;
            }
            return status;
        }
        public CompleteStatus GetCompleteStatusByTimeZone(int userId, int deisgnationId, int timeZone)
        {
            var status = new CompleteStatus();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var com = context.GetOverAllDETByDesignationByTimeZone(userId, deisgnationId, timeZone).FirstOrDefault();
                status.AssesmentCompletedAM = (int)com.AssesmentCompletedAM;
                status.AssesmentCompletedRM = (int)com.AssesmentCompletedRM;
                status.AssesmentCompletedVM = (int)com.AssesmentCompletedVM;
                status.AssesmentCreatedAM = (int)com.AssesmentCreatedAM;
                status.AssesmentCreatedRM = (int)com.AssesmentCreatedRM;
                status.AssesmentCreatedVM = (int)com.AssesmentCreatedVM;
                status.PartnerAM = (int)com.PartnerAM;
                status.PartnerRM = (int)com.PartnerRM;
                status.PartnerVM = (int)com.PartnerVM;
            }
            return status;
        }
        public CompleteStatus GetOverAllPSEDet(int userId)
        {
            var status = new CompleteStatus();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var com = context.GetOverAllPSEDET(userId).FirstOrDefault();
                status.AssesmentCompletedAM = (int)com.AssesmentCompletedAM;
                status.AssesmentCompletedRM = (int)com.AssesmentCompletedRM;
                status.AssesmentCompletedVM = (int)com.AssesmentCompletedVM;
                status.AssesmentCreatedAM = (int)com.AssesmentCreatedAM;
                status.AssesmentCreatedRM = (int)com.AssesmentCreatedRM;
                status.AssesmentCreatedVM = (int)com.AssesmentCreatedVM;
                status.PartnerAM = (int)com.PartnerAM;
                status.PartnerRM = (int)com.PartnerRM;
                status.PartnerVM = (int)com.PartnerVM;
            }
            return status;
        }
        public PPAReports GetReports()
        {
            var status = new PPAReports();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var lstLogin = context.ReportLastLogin();
                var rptPartnerCreated = context.ReportPartnerCreated();
                var aasmntCompleted = context.ReportFeedbackCompleted();
                var lastLoginCont = lstLogin.Select(login => new ReportContent()
                                                             {
                                                                 FirstName = login.firstname,
                                                                 LastName = login.lastname,
                                                                 EmailId = login.emailid
                                                             }).ToList();

                var partnerCreatedCont = rptPartnerCreated.Select(login => new ReportContent()
                {
                    FirstName = login.firstname,
                    LastName = login.Lastname,
                    EmailId = login.EmailID,
                    MPLID = login.partnername
                }).ToList();
                var aasmntCompleteds = aasmntCompleted.Select(login => new ReportContent()
                {
                    FirstName = login.FirstName,
                    LastName = login.LastName,
                    EmailId = login.EmailID,
                    MPLID = login.PartnerName
                }).ToList();
                status.LastLogin = lastLoginCont;
                status.PartnersCreated = partnerCreatedCont;
                status.AssessmentCompleted = aasmntCompleteds;

            }
            return status;
        }
        public PPAReports GetAllPasswords()
        {
            var status = new PPAReports();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var psePassword = context.ReportUserCredentials(1);
                var psmPassword = context.ReportUserCredentials(2);
                var areaLeadPassword = context.ReportUserCredentials(3);
                var timezonePassword = context.ReportUserCredentials(4);
                var stakeHolderPassword = context.ReportUserCredentials(6);
                var psepasswords = psePassword.Select(login => new ReportContent()
                {
                    FirstName = login.firstname,
                    LastName = login.LastName,
                    EmailId = login.EmailID,
                    Password = login.InvitationId
                }).ToList();

                var psmpasswords = psmPassword.Select(login => new ReportContent()
                {
                    FirstName = login.firstname,
                    LastName = login.LastName,
                    EmailId = login.EmailID,
                    Password = login.InvitationId
                }).ToList();
                var areaLeadPasswords = areaLeadPassword.Select(login => new ReportContent()
                {
                    FirstName = login.firstname,
                    LastName = login.LastName,
                    EmailId = login.EmailID,
                    Password = login.InvitationId
                }).ToList();
                var timezonePasswords = timezonePassword.Select(login => new ReportContent()
                {
                    FirstName = login.firstname,
                    LastName = login.LastName,
                    EmailId = login.EmailID,
                    Password = login.InvitationId
                }).ToList();
                var stakeholderPasswords = stakeHolderPassword.Select(login => new ReportContent()
                {
                    FirstName = login.firstname,
                    LastName = login.LastName,
                    EmailId = login.EmailID,
                    Password = login.InvitationId
                }).ToList();
                status.PSEPassword = psepasswords;
                status.PSMPassword = psmpasswords;
                status.AreaLeadPassword = areaLeadPasswords;
                status.TimezonePassword = timezonePasswords;
                status.StakePassword = stakeholderPasswords;

            }
            return status;
        }

        public bool IsZoneExists(int userId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                if (context.IsExistUserZone(userId).FirstOrDefault().Numbers > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        public bool ToolRequestAccess(string firstname, string lastname, string alias, string manageralias, string role, string country)
        {
            var content = "<p>First Name: " + firstname + "</p><br/><p>Last Name: " + lastname +
                          "</p><br/><p>Microsoft Alias: " + alias + "</p><br/><p>Manager Alias: " + manageralias +
                          "</p><br/><p>Role: " + role + "</p><br/><p>Country: " + country + "</p><br/>";
            ToolRequestEmail(content);
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var insertData = context.InsertToolAccessReq(firstname, lastname, alias, role,
                   country, manageralias);
                if (insertData.FirstOrDefault().Exist == 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
        }
        public void ToolRequestEmail(string content)
        {
            // Log("WCF-SendEmail-IN");
            try
            {
                // var user = Common.GetUserDetailsByMappingId(userId);
                string _from = ConfigurationManager.AppSettings["fromEmail"];
                string emailServer = ConfigurationManager.AppSettings["mailServer"];
                string _userId = ConfigurationManager.AppSettings["emailUserId"];
                string _pwd = ConfigurationManager.AppSettings["emailPassword"];
                string _bcc = ConfigurationManager.AppSettings["bccEmail"];
               // string _to = ConfigurationManager.AppSettings["mailTo1"];

                //if (_to.Trim() == string.Empty)
                //{
                string _to = "admin@pipe9consulting.com";
                //}

                var emailContent = string.Format(Constant.EmailTemplateNew, content, _to);
                MailMessage objEmail = new MailMessage(_from, _to, "Tool Access Request", emailContent);

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
    }

    public class getAxis
    {
        public double XAxis { get; set; }
        public double YAxis { get; set; }
        public string IndustryF1 { get; set; }
        public string StartDate { get; set; }
        public string IndustryF2 { get; set; }
        public double ActualPerformance { get; set; }
        public double PerformanceGap { get; set; }
        public string SolutionName { get; set; }
        public string ModuleName { get; set; }
        public string Question { get; set; }
        public string FullQuestion { get; set; }
        public string Answer { get; set; }
        public int AnswerValue { get; set; }
        public int ReportId { get; set; }
        public string Title { get; set; }
        public string PartnerName { get; set; }
    }
}