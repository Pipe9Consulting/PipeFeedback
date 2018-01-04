using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Linq;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Net.Mail;
using System.Text;
using bExcellent.Service.BusinessLogic.Authentiation;
using bExcellent.Service.BusinessLogic.Common;
using bExcellent.Service.BusinessLogic.Standing;
using bExcellent.Service.BusinessLogic.UserAdmin;
using bExcellent.Service.DataAccess;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Enumeration;
using bExcellent.Service.Util.Request;
using bExcellent.Service.Util.Response;
using bExcellent.Service.Util.Utils;
using Feedback = bExcellent.Service.Util.Domain.Feedback;

namespace bExcellent.Service.BusinessLogic.FeedbackBL
{
    public class FeedbackBLDataAccess
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

        /// <summary>
        /// Saves the result.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="userCount">The user count.</param>
        /// <param name="userIndex">Index of the user.</param>
        public void SaveResult(SavePOEResultRequest request, int userCount = 1, int userIndex = 0)
        {
            //Log("WCF-SaveResult");
            FeedbackStatus status = (FeedbackStatus)Enum.Parse(typeof(FeedbackStatus), request.FeedbackStatus.ToString());
            SaveResult(request.FeedbackId, request.QuestionId, request.Answer, request.Comment, request.AnswerType, status);
            SaveCapabilityResult(request.FeedbackId, request.QuestionId, request.CapabilityAnswer, request.Comment, request.AnswerType, status);

        }

        /// <summary>
        /// Saves the result.
        /// </summary>
        /// <param name="feedbackId">The feedback id.</param>
        /// <param name="questionId">The question id.</param>
        /// <param name="answer">The answer.</param>
        /// <param name="comment">The comment.</param>
        /// <param name="answerType">Type of the answer.</param>
        /// <param name="status">The status.</param>
        public void SaveResult(int feedbackId, int questionId, int answer, string comment, int answerType, FeedbackStatus status)
        {
            //Log("WCF-SaveResult FBID::" + feedbackId + "-IN");
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.iuPOEResults(feedbackId, questionId, answer, comment, answerType, (int)status);
                // Log("WCF-SaveResult FBID::" + feedbackId + "-OUT");
            }
        }
        /// <summary>
        /// Save Capability Result
        /// </summary>
        /// <param name="feedbackId"></param>
        /// <param name="questionId"></param>
        /// <param name="answer"></param>
        /// <param name="comment"></param>
        /// <param name="answerType"></param>
        /// <param name="status"></param>
        public void SaveCapabilityResult(int feedbackId, int questionId, int answer, string comment, int answerType, FeedbackStatus status)
        {
            //Log("WCF-SaveResult FBID::" + feedbackId + "-IN");
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.iuCapabilityResults(feedbackId, questionId, answer, comment, answerType, (int)status);
                // Log("WCF-SaveResult FBID::" + feedbackId + "-OUT");
            }
        }
        public void SaveSurveyResult(int feedbackId, int questionId, string answer, int poeid, int subQuestionId, int userid, bool isSubQuestion)
        {
            //Log("WCF-SaveResult FBID::" + feedbackId + "-IN");
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.IuUserSurvey(userid, questionId, answer, feedbackId, poeid, isSubQuestion, subQuestionId);
                // Log("WCF-SaveResult FBID::" + feedbackId + "-OUT");
            }
        }
        public void UpdateFeedbackStatus(int feedbackId, int status, string initials)
        {
            //Log("WCF-UpdateFeedbackStatus:FBID::" + feedbackId + "-IN");
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.updateFeedback(status, feedbackId, initials);
            }
            var feedbackresult = GetFeedbackById(feedbackId);
            CreateFbCompleteActivity(feedbackresult);
            // Log("WCF-UpdateFeedbackStatus:FBID::" + feedbackId + "-OUT");
        }

        public V3_GetFeedbackByIdResult GetFeedbackById(int feedbackid)
        {
            //Log("WCF-GetFeedbackById:FBID::" + feedbackid + "-IN");
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                // Log("WCF-GetFeedbackById:FBID::" + feedbackid + "-OUT");
                return context.GetFeedbackById(feedbackid).FirstOrDefault();
            }
        }

        /*  public V3_GetWCSIScoreResult GetWcsiScore(int fbid)
          {
              using (var context = DataContextFactory.GetIntelliSetDataContext())
              {
                  return context.GetWCSIScore(fbid).FirstOrDefault();
              }
          }
          */

        public double GetWcsiScore(int fbid)
        {
            //Log("WCF-GetWcsiScore:FBID::" + fbid + "-IN");
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var result = context.GetWCSIPerModuleByFbId(fbid.ToString()).ToList();
                // Log("WCF-GetWcsiScore:FBID::" + fbid + "-OUT");
                return Math.Round(result.Sum(a => Math.Round(a.WCSIPermod.GetValueOrDefault(0), MidpointRounding.AwayFromZero)), MidpointRounding.AwayFromZero);
            }
        }

        public int CheckAnswers(int feedBackId)
        {
            // Log("WCF-CheckAnswers:FBID::" + feedBackId + "-IN");
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.CheckCompletedAnswer(feedBackId).Count();
                // Log("WCF-CheckAnswers:FBID::" + feedBackId + "-OUT");
                return results;
            }
        }

        public void SendCompletionMail(V3_GetFeedbackByIdResult feedback)
        {
            Common.Common Common = new Common.Common();
            if (feedback.FeedbackType == 1)
            {
                var user = Common.GetUserDetailsByMappingId(feedback.For.GetValueOrDefault());
                var userName = user.User.FirstName;
                var rolename = user.POE.Name;
                var contentstring = Constant.SelfFeedbackCompletedNew;
                var subject = "Thank you for completing Self-Feedback";
                var to = user.User.EmailAddress;
                var emailContenttemp = string.Empty;
                var emailContent = string.Empty;
                emailContenttemp = string.Format(contentstring,
                                        userName,
                                        String.Format("{0:MM/dd/yyyy}", DateTime.Now).Replace("-", "/"),
                                        rolename
                                      );
                emailContent = string.Format(Constant.EmailTemplateNew, emailContenttemp, user.User.EmailAddress);
                SendEmailUpdated(subject, emailContent, to);

            }
            else
            {
                var user = Common.GetUserDetailsByMappingId(feedback.RequestedFrom.GetValueOrDefault());
                var userName = user.User.FirstName;
                var rolename = user.POE.Name;
                var contentstring = Constant.ManagerFeedbackCompleted;
                var subject = "Thank you for completing Team-Feedback";
                var to = user.User.EmailAddress;
                var emailContenttemp = string.Empty;
                var emailContent = string.Empty;
                emailContenttemp = string.Format(contentstring,
                                        userName,
                                         String.Format("{0:MM/dd/yyyy}", DateTime.Now).Replace("-", "/"),
                                        rolename
                                      );
                emailContent = string.Format(Constant.EmailTemplateNew, emailContenttemp, user.User.EmailAddress);
                SendEmailUpdated(subject, emailContent, to);
            }
        }

        public void CreateFbCompleteActivity(V3_GetFeedbackByIdResult feedback)
        {
            //Log("WCF-CreateFbCompleteActivity:FBID::" + feedback.POEFeedbackId + "-IN");
            Common.Common Common = new Common.Common();
            var wcsi = GetWcsiScore(feedback.POEFeedbackId);
            var wcsiscore = GetWcsiScore(feedback.POEFeedbackId);
            if (feedback.FeedbackType == 1)
            {
                var user = Common.GetUserDetailsByMappingId(feedback.For.GetValueOrDefault());

                var managers = Common.GetMyManager(user.User.UserId, user.POE.POEId, feedback.SubscriptionID);
                var comments = string.Empty;
                string text = string.Empty;
                var emailContenttemp = string.Empty;
                var emailContent = string.Empty;
                var contentstring = Constant.SelfFeedbackCompleted;
                var to = string.Empty;
                var url = string.Empty;
                var fromName = user.User.FirstName + " " + user.User.LastName;
                var userName = string.Empty;
                var subject = fromName + " Completed Feedback at pipe9coach.com";

                foreach (UserPOEMapping userPoeMapping in managers.Where(a => a.Designation.DesignationId != (int)NetworkUserFilterType.Customer))
                {
                    to = userPoeMapping.User.EmailAddress;
                    userName = userPoeMapping.User.FirstName + " " +
                             userPoeMapping.User.LastName;
                    url = Constant.HomeUrl;
                    comments = user.User.FirstName + " " + user.User.LastName + " has completed feedback on the Role Excellence Profile for " + user.POE.Name + ". Their standing is " + wcsiscore + ".";
                    text = " <div class='recieve' style='height:60px'></div><div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) +
                            " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>" + " Completed a Self Assessment" + "</h2>" + "<p class='wallcomment'>" + comments + "</p>";
                    Common.CreateActivity(user.User.UserId, userPoeMapping.User.UserId.ToString(), feedback.SubscriptionID, 2, text);
                    //for all managers
                    emailContenttemp = string.Format(contentstring,
                                         userName,
                                         fromName,
                                         user.POE.Name,
                                         DateTime.Now.ToShortDateString(),
                                         url
                                       );
                    emailContent = string.Format(Constant.EmailTemplate, emailContenttemp);
                    SendEmail(subject, emailContent, to);
                }
                comments = "Your standing from completion of feedback on the Role Excellence Profile for " + user.POE.Name + " is " + wcsiscore + ".<a class='morelink' href='/Sync/BigPicture?poeid=" + user.POE.POEId + "&fid=" + feedback.POEFeedbackId + "&ftype=1'>View…</a>";
                text = " <div class='recieve' style='height:60px'></div><div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) +
                        " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>" + "Feedback Completed" + "</h2>" + "<p class='wallcomment'>" + comments + "</p>";
                Common.CreateActivity(user.User.UserId, user.User.UserId.ToString(), feedback.SubscriptionID, 2, text);
            }
            else
            {
                var user = Common.GetUserDetailsByMappingId(feedback.RequestedFrom.GetValueOrDefault());

                var team = Common.GetUserDetailsByMappingId(feedback.For.GetValueOrDefault());

                var comments = string.Empty;
                string text = string.Empty;

                comments = user.User.FirstName + " " + user.User.LastName + "  has given you Feedback on the " + user.POE.Name + " Role Excellence Profile, resulting in a Standing score of " + wcsiscore + ".<a class='morelink'  href='/Sync/BigPicture?poeid=" + user.POE.POEId + "&fid=" + feedback.POEFeedbackId + "&ftype=1'>View…</a>";
                //comments = "<p>You Completed Feedback</p><p></p>Your Standing Score is " + wcsiscore + ".<p>Name:&nbsp" + user.User.FirstName + " " + user.User.LastName + "</p><p>Name of PoE: " + user.POE.Name + "</p><p>You can view the feedback results <a class='morelink'  href='/Sync/Sync?poeid=" + user.POE.POEId + "&fid=" + feedback.POEFeedbackId + "&ftype=1'>here</a></p>";
                text = " <div class='recieve' style='height:60px'></div><div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) +
                        " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>" + "Feedback Received" + "</h2>" + "<p class='wallcomment'>" + comments + "</p>";
                Common.CreateActivity(user.User.UserId, team.User.UserId.ToString(), feedback.SubscriptionID, 2, text);

                comments = "You have completed manager feedback for " + team.User.FirstName + " " + team.User.LastName + " on the Role Excellence Profile for " + user.POE.Name + ".<a class='morelink'  href='/Sync/BigPicture?poeid=" + user.POE.POEId + "&fid=" + feedback.POEFeedbackId + "&ftype=2'>View…</a>";
                //comments = "<p>Name: " + team.User.FirstName + " " + team.User.LastName + "</p><p>Name of PoE: " + user.POE.Name + "</p><p>Date:" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) +
                // " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</p><p>Title: Manager</p><p>You can view the feedback results <a class='morelink'  href='/Sync/Sync?poeid=" + user.POE.POEId + "&fid=" + feedback.POEFeedbackId + "&ftype=2'>here</a></p>";
                text = " <div class='recieve' style='height:60px'></div><div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) +
                        " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>" + "Feedback Completed" + "</h2>" + "<p class='wallcomment'>" + comments + "</p>";
                Common.CreateActivity(user.User.UserId, user.User.UserId.ToString(), feedback.SubscriptionID, 2, text);

                //send mail to for user
                var emailContenttemp = string.Empty;
                var emailContent = string.Empty;
                var contentstring = Constant.FeedbackReceived;
                var to = team.User.EmailAddress;
                var url = Constant.HomeUrl;
                var fromName = user.User.FirstName + " " + user.User.LastName;
                var userName = team.User.FirstName + " " +
                         team.User.LastName;
                var subject = "Feedback From " + fromName + " at kessaku.Com";
                emailContenttemp = string.Format(contentstring,
                                          userName,
                                          fromName,
                                          user.POE.Name,
                                          url
                                          );
                emailContent = string.Format(Constant.EmailTemplate, emailContenttemp);
                SendEmail(subject, emailContent, to);
            }
            SendCompletionMail(feedback);
            //Log("WCF-CreateFbCompleteActivity:FBID::" + feedback.POEFeedbackId + "-OUT");
            //UserPOEMapping memberdetails = Common.GetUserDetailsByMappingId(request.RequestedFrom);
        }

        /// <summary>
        /// Creates the feedback.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        public List<CreatedFeedback> CreateFeedback(NewFeedbackRequest request)
        {
            // Log("WCF-CreateFeedback:UsriD::" + request.UserId + "-IN");
            if (request.FeedbackType == 1)
            {
                if (request.IsGiveRequest)
                {
                    List<CreatedFeedback> feedbacks = new List<CreatedFeedback>();

                    for (var i = 0; i < request.Members.Count; i++)
                    {
                        var requestedBy = GetRequestedByMappingId(request.PoeId, request.FeedbackRole[0], request.UserId, request.Subscriptionid);

                        feedbacks.Add(CreateFeedbackForInviteTake(requestedBy, request.Members[i], request.FeedbackRole[0], request.Subscriptionid));
                        if (request.EmailMode)
                        {
                            SendRequestOrInviteEmail(feedbacks, requestedBy, request.PoeId);
                        }
                        CreateFbActivity(feedbacks, requestedBy, request.PoeId, request.Subscriptionid);
                    }
                    return feedbacks;
                }
                else
                {
                    List<CreatedFeedback> temp = new List<CreatedFeedback>();
                    try
                    {
                        for (var i = 0; i < request.FeedbackRole.Count; i++)
                        {

                            var requestedBy = GetRequestedByMappingId(request.PoeId, request.FeedbackRole[i], request.UserId,
                                                                      request.Subscriptionid);
                            temp.AddRange(CreateFeedbackForTake(requestedBy, request.FeedbackRole[i], request.Subscriptionid));

                        }
                    }
                    catch (Exception e)
                    {
                        new Common.CommonDataAccess().SendMailwithAttachment("", "Issue", e.Message, null);
                    }
                    return temp;
                }
            }
            else
            {
                if (request.IsGiveRequest)
                {
                    //var requestedForBy = GetRequestedByMappingId(request.PoeId, request.FeedbackRole, request.UserId, request.Subscriptionid);
                    Common.Common Common = new Common.Common();
                    List<CreatedFeedback> feedbacks = new List<CreatedFeedback>();

                    //    var userAdmin = new UserAdmin();

                    for (var k = 0; k < request.Members.Count; k++)
                    {
                        var requestedForBy = GetRequestedByMappingId(request.PoeId, request.FeedbackRole[0], request.UserId, request.Subscriptionid);
                        UserPOEMapping memberdetails = Common.GetUserDetailsByMappingId(request.Members[k]);
                        int feedbackId = CreateFeedback(new CreateFeedbackRequest
                        {
                            SubscriptionId = request.Subscriptionid,
                            FeedbackId = 0,
                            RequestedBy = requestedForBy,
                            RequestedFor = requestedForBy,
                            RequestedFrom = request.Members[k],
                            Status = FeedbackStatus.NotStarted,
                            FeedbackType = (FeedbackType)Enum.Parse(typeof(FeedbackType), request.FeedbackType.ToString()),
                        });
                        //int capabilityId = CreateCapabilityFeedback(new CreateFeedbackRequest
                        //{
                        //    SubscriptionId = request.Subscriptionid,
                        //    FeedbackId = 0,
                        //    RequestedBy = requestedForBy,
                        //    RequestedFor = requestedForBy,
                        //    RequestedFrom = request.Members[k],
                        //    Status = FeedbackStatus.NotStarted,
                        //    FeedbackType = (FeedbackType)Enum.Parse(typeof(FeedbackType), request.FeedbackType.ToString()),
                        //});
                        CreatedFeedback feedback = new CreatedFeedback();
                        feedback.FeedBackId = feedbackId;
                        //feedback.CapabilityId = capabilityId;
                        feedback.UserMappingId = request.Members[k];
                        feedback.RequestedUserMappingId = requestedForBy;
                        feedback.TeamUserMappingId = request.Members[k];
                        feedback.Teammember = memberdetails;
                        feedbacks.Add(feedback);
                        if (request.EmailMode)
                        {
                            SendRequestOrInviteEmail(feedbacks, requestedForBy, request.PoeId);
                        }
                        CreateFbActivity(feedbacks, requestedForBy, request.PoeId, request.Subscriptionid);
                    }

                    return feedbacks;
                }
                else
                {
                    //var requestedBy = GetRequestedByMappingId(request.PoeId, request.FeedbackRole, request.UserId, request.Subscriptionid);
                    string groupName = null;

                    if (request.Members.Count > 1)
                    {
                        groupName = Guid.NewGuid().ToString();
                    }

                    Common.Common Common = new Common.Common();
                    List<CreatedFeedback> feedbacks = new List<CreatedFeedback>();

                    //    var userAdmin = new UserAdmin();

                    for (var j = 0; j < request.Members.Count; j++)
                    {
                        var managerId = GetRequestedByMappingId(request.PoeId, request.FeedbackRole[j], request.UserId, request.Subscriptionid); ;
                        UserPOEMapping memberdetails = Common.GetUserDetailsByMappingId(request.Members[j]);

                        request.FeedbackFor = request.Members[j];
                        var requestedFrom = managerId;
                        managerId = 0;

                        int feedbackId = CreateFeedback(new CreateFeedbackRequest
                        {
                            SubscriptionId = request.Subscriptionid,
                            FeedbackId = 0,
                            RequestedBy = managerId,
                            RequestedFor = request.FeedbackFor,
                            RequestedFrom = requestedFrom,
                            Status = FeedbackStatus.NotStarted,
                            FeedbackType = (FeedbackType)Enum.Parse(typeof(FeedbackType), request.FeedbackType.ToString()),
                            GroupName = groupName
                        });
                        //int capabilityId = CreateCapabilityFeedback(new CreateFeedbackRequest
                        //{
                        //    SubscriptionId = request.Subscriptionid,
                        //    FeedbackId = 0,
                        //    RequestedBy = managerId,
                        //    RequestedFor = request.FeedbackFor,
                        //    RequestedFrom = requestedFrom,
                        //    Status = FeedbackStatus.NotStarted,
                        //    FeedbackType = (FeedbackType)Enum.Parse(typeof(FeedbackType), request.FeedbackType.ToString()),
                        //    GroupName = groupName
                        //});
                        CreatedFeedback feedback = new CreatedFeedback();
                        feedback.FeedBackId = feedbackId;
                        //feedback.CapabilityId = capabilityId;
                        feedback.UserMappingId = managerId;
                        feedback.TeamUserMappingId = request.Members[j];

                        feedback.Teammember = memberdetails;
                        feedbacks.Add(feedback);
                    }
                    //Log("WCF-CreateFeedback:UsriD::" + request.UserId + "-OUT");
                    return feedbacks;
                }
            }
            //Log("WCF-CreateFeedback:UsriD::" + request.UserId + "-OUT");
            return null;
        }

        //Create Feedback Email

        public void CreateFbActivity(List<CreatedFeedback> feedbacks, int requestedBy, int poeId, int subid)
        {
            Common.Common Common = new Common.Common();
            //Log("WCF-CreateFbActivity-IN");
            var requestedUser = Common.GetUserDetailsByMappingId(requestedBy);
            foreach (CreatedFeedback createdFeedback in feedbacks)
            {
                var comments = string.Empty;
                string text = string.Empty;
                if (createdFeedback.Teammember.Designation.DesignationId == (int)NetworkUserFilterType.Customer)
                {
                    comments = "From: " + requestedUser.User.FirstName + " " + requestedUser.User.LastName + "<br/>REP:&nbsp" + Common.GetPoeName(poeId) + "<br/>Please go to the <a href='/feedback/ResumeFeedbak?feedbackid=" + createdFeedback.FeedBackId + "&feedbacktype=2&feedbackfor=" + createdFeedback.RequestedUserMappingId + "&status=0&poeid=" + poeId + "'>Feedback page</a> to Give Feedback.";//"<a class='morelink' href='/Feedback/SetPoe?poeid=" + poeId + "'>more…</a>";
                    text = " <div class='recieve' style='height:60px'></div><div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) +
                        " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>" + "Request to Give Feedback" + "</h2>" + "<p class='wallcomment'>" + comments + "</p>";
                }
                else if (createdFeedback.Teammember.Designation.DesignationId == (int)NetworkUserFilterType.TeamMember)
                {
                    comments = "From: " + requestedUser.User.FirstName + " " + requestedUser.User.LastName + "<br/>Name of REP:&nbsp" + Common.GetPoeName(poeId) + "<br/>Please go to the <a href='/feedback/ResumeFeedbak?feedbackid=" + createdFeedback.FeedBackId + "&feedbacktype=1&feedbackfor=" + createdFeedback.UserMappingId + "&status=0&poeid=" + poeId + "'>Feedback page</a> to complete a Self Assessment.";
                    /* comments = "You have received an invitation from " + requestedUser.User.FirstName + " " +
                                 requestedUser.User.LastName + " inviting you to complete feedback on the Poe for " +
                                 Common.GetPoeName(poeId) + "<a class='morelink' href='/Feedback/SetPoe?poeid=" + poeId + "'>more…</a>";*/
                    text = " <div class='recieve' style='height:60px'></div><div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) +
                   " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>" + "You Received a Request to Take a Self Assessment" + "</h2>" + "<p class='wallcomment'>" + comments + "</p>";
                }
                else if (createdFeedback.Teammember.Designation.DesignationId == (int)NetworkUserFilterType.PeerTeam)
                {
                    comments = "From: " + requestedUser.User.FirstName + " " + requestedUser.User.LastName + "<br/>Name of REP:&nbsp" + Common.GetPoeName(poeId) + "<br/>Please go to the <a href='/feedback/ResumeFeedbak?feedbackid=" + createdFeedback.FeedBackId + "&feedbacktype=1&feedbackfor=" + createdFeedback.UserMappingId + "&status=0&poeid=" + poeId + "'>Feedback page</a>  to complete a Self Assessment.";
                    /*comments = "You have received an invitation from " + requestedUser.User.FirstName + " " +
                                requestedUser.User.LastName + " inviting you to complete feedback on the Poe for " +
                                Common.GetPoeName(poeId) + "<a class='morelink' href='/Feedback/SetPoe?poeid=" + poeId + "'>more…</a>";*/
                    text = " <div class='recieve' style='height:60px'></div><div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) +
                   " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>" + "You Received a Request to Take a Self Assessment" + "</h2>" + "<p class='wallcomment'>" + comments + "</p>";
                }
                else if (createdFeedback.Teammember.Designation.DesignationId == (int)NetworkUserFilterType.PeerManager)
                {
                    comments = "From: " + requestedUser.User.FirstName + " " + requestedUser.User.LastName + "<br/>REP:&nbsp" + Common.GetPoeName(poeId) + "<br/>Please go to the <a href='/feedback/ResumeFeedbak?feedbackid=" + createdFeedback.FeedBackId + "&feedbacktype=2&feedbackfor=" + createdFeedback.RequestedUserMappingId + "&status=0&poeid=" + poeId + "'>Feedback page</a> to Give Feedback.";
                    /* comments = "You have received an invitation from " + requestedUser.User.FirstName + " " +
                                 requestedUser.User.LastName + " inviting you to complete feedback on the Poe for " +
                                 Common.GetPoeName(poeId) + "<a class='morelink' href='/Feedback/SetPoe?poeid=" + poeId + "'>more…</a>";*/
                    text = " <div class='recieve' style='height:60px'></div><div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) +
                   " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>" + "Request to Give Feedback" + "</h2>" + "<p class='wallcomment'>" + comments + "</p>";
                }
                else if (createdFeedback.Teammember.Designation.DesignationId == (int)NetworkUserFilterType.SkipLevelManager)
                {
                    comments = "From: " + requestedUser.User.FirstName + " " + requestedUser.User.LastName + "<br/>REP:&nbsp" + Common.GetPoeName(poeId) + "<br/>Please go to the <a href='/feedback/ResumeFeedbak?feedbackid=" + createdFeedback.FeedBackId + "&feedbacktype=2&feedbackfor=" + createdFeedback.RequestedUserMappingId + "&status=0&poeid=" + poeId + "'>Feedback page</a> to Give Feedback.";
                    /*comments = "You have received an invitation from " + requestedUser.User.FirstName + " " +
                                requestedUser.User.LastName + " inviting you to complete feedback on the Poe for " +
                                Common.GetPoeName(poeId) + "<a class='morelink' href='/Feedback/SetPoe?poeid=" + poeId + "'>more…</a>";*/
                    text = " <div class='recieve' style='height:60px'></div><div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) +
                   " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>" + "Request to Give Feedback" + "</h2>" + "<p class='wallcomment'>" + comments + "</p>";
                }
                else if (createdFeedback.Teammember.Designation.DesignationId == (int)NetworkUserFilterType.Manager)
                {
                    comments = "From: " + requestedUser.User.FirstName + " " + requestedUser.User.LastName + "<br/>REP:&nbsp" + Common.GetPoeName(poeId) + "<br/>Please go to the <a href='/feedback/ResumeFeedbak?feedbackid=" + createdFeedback.FeedBackId + "&feedbacktype=2&feedbackfor=" + createdFeedback.RequestedUserMappingId + "&status=0&poeid=" + poeId + "'>Feedback page</a> to Give Feedback.";
                    /* comments = "You have received an invitation from " + requestedUser.User.FirstName + " " +
                                 requestedUser.User.LastName + " inviting you to complete feedback on the Poe for " +
                                 Common.GetPoeName(poeId) + "<a class='morelink' href='/Feedback/SetPoe?poeid=" + poeId + "'>more…</a>";*/
                    text = " <div class='recieve' style='height:60px'></div><div class='dt'>" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month) +
                   " " + DateTime.Now.Day + ", " + DateTime.Now.Year + "</div>" + "<h2>" + "Request to Give Feedback" + "</h2>" + "<p class='wallcomment'>" + comments + "</p>";
                }
                Common.CreateActivity(requestedUser.User.UserId, createdFeedback.Teammember.User.UserId.ToString(), subid, 2, text);
                //Log("WCF-CreateFbActivity-OUT");
            }

            //UserPOEMapping memberdetails = Common.GetUserDetailsByMappingId(request.RequestedFrom);
        }

        public void SendRequestOrInviteEmail(List<CreatedFeedback> feedbacks, int requestedBy, int poeId)
        {
            //Log("WCF-SendRequestOrInviteEmail-IN");
            Common.Common Common = new Common.Common();
            var requestedUser = Common.GetUserDetailsByMappingId(requestedBy);
            var emailContenttemp = string.Empty;
            var emailContent = string.Empty;
            var subject = string.Empty;
            var contentstring = string.Empty;
            var to = string.Empty;
            var url = string.Empty;
            var fromName = requestedUser.User.FirstName + " " + requestedUser.User.LastName;
            foreach (CreatedFeedback createdFeedback in feedbacks)
            {
                to = createdFeedback.Teammember.User.EmailAddress;
                url = string.Empty;
                var userName = createdFeedback.Teammember.User.FirstName + " " +
                               createdFeedback.Teammember.User.LastName;

                if (createdFeedback.Teammember.Designation.DesignationId == (int)NetworkUserFilterType.Customer)
                {
                    subject = "Give feedback to " + fromName + "  at kessaku.com";
                    contentstring = Constant.SendRequestCustomer;
                    url = "/Home/Login?guest=true&type=4&rfor=" + createdFeedback.RequestedUserMappingId + "&from=" + createdFeedback.TeamUserMappingId + "&fbid=" + createdFeedback.FeedBackId + "&poeid=" + poeId;
                    emailContenttemp = string.Format(contentstring,
                                       userName,
                                       fromName,
                                        url, to
                                       );
                }
                else if (createdFeedback.Teammember.Designation.DesignationId == (int)NetworkUserFilterType.TeamMember)
                {
                    subject = "Take Profile of Excellence feedback at kessaku.com";
                    contentstring = Constant.SendInvite;
                    url = Constant.HomeUrl;
                    emailContenttemp = string.Format(contentstring,
                                       userName,
                                       fromName,
                                        url
                                       );
                }
                else if (createdFeedback.Teammember.Designation.DesignationId == (int)NetworkUserFilterType.PeerTeam)
                {
                    subject = "Take Profile of Excellence feedback at kessaku.com";
                    contentstring = Constant.SendInvite;
                    url = Constant.HomeUrl;
                    emailContenttemp = string.Format(contentstring,
                                       userName,
                                       fromName,
                                        url
                                       );
                }
                else if (createdFeedback.Teammember.Designation.DesignationId == (int)NetworkUserFilterType.PeerManager)
                {
                    subject = "Give feedback to " + fromName + "  at kessaku.com";
                    contentstring = Constant.SendRequest;
                    url = Constant.HomeUrl;
                    emailContenttemp = string.Format(contentstring,
                                       userName,
                                       fromName,
                                        url
                                       );
                }
                else if (createdFeedback.Teammember.Designation.DesignationId == (int)NetworkUserFilterType.SkipLevelManager)
                {
                    subject = "Give feedback to " + fromName + "  at kessaku.com";
                    contentstring = Constant.SendRequest;
                    url = Constant.HomeUrl;
                    emailContenttemp = string.Format(contentstring,
                                       userName,
                                       fromName,
                                        url
                                       );
                }
                else if (createdFeedback.Teammember.Designation.DesignationId == (int)NetworkUserFilterType.Manager)
                {
                    subject = "Give feedback to " + fromName + "  at kessaku.com";
                    contentstring = Constant.SendRequest;
                    url = Constant.HomeUrl;
                    emailContenttemp = string.Format(contentstring,
                                       userName,
                                       fromName,
                                        url
                                       );
                }
                emailContent = string.Format(Constant.EmailTemplate, emailContenttemp);
                SendEmail(subject, emailContent, to);
            }
            //Log("WCF-SendRequestOrInviteEmail-OUT");
            //UserPOEMapping memberdetails = Common.GetUserDetailsByMappingId(request.RequestedFrom);
        }

        public void SendEmail(string subject, string content, string to)
        {
            // Log("WCF-SendEmail-IN");
            try
            {
                string _from = ConfigurationManager.AppSettings["fromEmail"];
                string emailServer = ConfigurationManager.AppSettings["mailServer"];
                string _userId = ConfigurationManager.AppSettings["emailUserId"];
                string _pwd = ConfigurationManager.AppSettings["emailPassword"];
                string _bcc = ConfigurationManager.AppSettings["bccEmail"];
                string _to = ConfigurationManager.AppSettings["mailTo"];
                string credentialText = string.Empty;
                string footerText = string.Empty;

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
            catch (Exception ex)
            {
            }
            //Log("WCF-SendEmail-OUT");
        }
        public void SendEmailUpdated(string subject, string content, string to)
        {
            // Log("WCF-SendEmail-IN");
            try
            {
                string _from = ConfigurationManager.AppSettings["fromEmail"];
                string emailServer = ConfigurationManager.AppSettings["mailServer"];
                string _userId = ConfigurationManager.AppSettings["emailUserId"];
                string _pwd = ConfigurationManager.AppSettings["emailPassword"];
                string _bcc = ConfigurationManager.AppSettings["bccEmail"];
                string _to = ConfigurationManager.AppSettings["mailTo1"];
                string credentialText = string.Empty;
                string footerText = string.Empty;

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
            catch (Exception ex)
            {
            }
            //Log("WCF-SendEmail-OUT");
        }
        /// <summary>
        /// Creates the feedback for take.
        /// </summary>
        /// <param name="requestedBy">The requested by.</param>
        /// <param name="feedbackRole">The feedback role.</param>
        /// <returns></returns>
        public List<CreatedFeedback> CreateFeedbackForTake(int requestedBy, int feedbackRole, int subscriptionid)
        {
            //Log("WCF-CreateFeedbackForTake-IN");
            int feedbackId = CreateFeedback(new CreateFeedbackRequest
            {
                SubscriptionId = subscriptionid,
                FeedbackId = 0,
                RequestedBy = 0,
                RequestedFor = requestedBy,
                RequestedFrom = requestedBy,
                Status = FeedbackStatus.NotStarted,
                FeedbackType = FeedbackType.Self
            });
            //    int capabilityId = CreateCapabilityFeedback(new CreateFeedbackRequest
            //{
            //    SubscriptionId = subscriptionid,
            //    FeedbackId = 0,
            //    RequestedBy = 0,
            //    RequestedFor = requestedBy,
            //    RequestedFrom = requestedBy,
            //    Status = FeedbackStatus.NotStarted,
            //    FeedbackType = FeedbackType.Self
            //});
            Common.Common Common = new Common.Common();
            UserPOEMapping memberdetails = Common.GetUserDetailsByMappingId(requestedBy);
            List<CreatedFeedback> feedbackIds = new List<CreatedFeedback>();
            CreatedFeedback feedback = new CreatedFeedback();
            feedback.FeedBackId = feedbackId;
            //feedback.CapabilityId = capabilityId;
            feedback.UserMappingId = requestedBy;
            feedback.Teammember = memberdetails;
            feedbackIds.Add(feedback);
            // Log("WCF-CreateFeedbackForTake-OUT");
            return feedbackIds;
        }

        /// <summary>
        /// Creates the feedback for invite take.
        /// </summary>
        /// <param name="requestedBy">The requested by.</param>
        /// <param name="requestedFor">The requested for.</param>
        /// <param name="feedbackRole">The feedback role.</param>
        /// <returns></returns>
        public CreatedFeedback CreateFeedbackForInviteTake(int requestedBy, int requestedFor, int feedbackRole, int subscriptionid)
        {
            //Log("WCF-CreateFeedbackForInviteTake-IN");
            int feedbackId = CreateFeedback(new CreateFeedbackRequest
            {
                SubscriptionId = subscriptionid,
                FeedbackId = 0,
                RequestedBy = requestedBy,
                RequestedFor = requestedFor,
                RequestedFrom = requestedFor,
                Status = FeedbackStatus.NotStarted,
                FeedbackType = FeedbackType.Self
            });
            //int capabilityId = CreateCapabilityFeedback(new CreateFeedbackRequest
            //{
            //    SubscriptionId = subscriptionid,
            //    FeedbackId = 0,
            //    RequestedBy = requestedBy,
            //    RequestedFor = requestedFor,
            //    RequestedFrom = requestedFor,
            //    Status = FeedbackStatus.NotStarted,
            //    FeedbackType = FeedbackType.Self
            //});
            CreatedFeedback feedback = new CreatedFeedback();
            feedback.FeedBackId = feedbackId;
            //feedback.CapabilityId = capabilityId;
            feedback.UserMappingId = requestedFor;
            feedback.RequestedUserMappingId = requestedBy;
            Common.Common Common = new Common.Common();
            UserPOEMapping memberdetails = Common.GetUserDetailsByMappingId(requestedFor);
            feedback.Teammember = memberdetails;
            // Log("WCF-CreateFeedbackForInviteTake-OUT");
            return feedback;
        }

        /// <summary>
        /// Gets the requested by mapping id.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <param name="requestedRole">The requested role.</param>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        public int GetRequestedByMappingId(int poeid, int requestedRole, int userId, int subscriptionid)
        {
            // Log("WCF-GetRequestedByMappingId-IN");
            string designationName = (requestedRole == 1) ? FeedbackType.Self.ToString() : FeedbackType.Manager.ToString();
            Common.Common userBO = new Common.Common();
            UserPOEMapping requestedBy = null;
            var userMappingDetails = userBO.GetUserMappingDetails(userId, subscriptionid).Where(a => a.POE.POEId == poeid).ToList();
            if (userMappingDetails.Count > 1)
            {
                requestedBy = userMappingDetails.FirstOrDefault(a => a.Designation.DesignationId == requestedRole);
            }

            if (requestedBy == null)
            {
                if (requestedRole == 1)
                {
                    requestedBy = userMappingDetails.FirstOrDefault(a => a.Designation.DesignationId == 4);
                    if (requestedBy == null)
                    {
                        requestedBy = userMappingDetails.FirstOrDefault(a => a.Designation.DesignationId == 1);
                    }
                }
                else
                {
                    requestedBy = userMappingDetails.FirstOrDefault();
                }
            }

            if (requestedBy != null)
            {
                //Log("WCF-GetRequestedByMappingId-OUT");
                return requestedBy.UserPOEMappingId;
            }
            // Log("WCF-GetRequestedByMappingId-OUT");
            return requestedBy.UserPOEMappingId;
        }

        /// <summary>
        /// Creates the feedback.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        public int CreateFeedback(CreateFeedbackRequest request)
        {
            // Log("WCF-CreateFeedback");
            return CreateFeedback(request.FeedbackId, request.SubscriptionId, request.RequestedBy, request.RequestedFrom,
                        request.RequestedFor, (int)request.FeedbackType, (int)request.Status, request.GroupName);
        }
        public int CreateCapabilityFeedback(CreateFeedbackRequest request)
        {
            // Log("WCF-CreateFeedback");
            return CreateCapabilityFeedback(request.FeedbackId, request.SubscriptionId, request.RequestedBy, request.RequestedFrom,
                        request.RequestedFor, (int)request.FeedbackType, (int)request.Status, request.GroupName);
        }
        /// <summary>
        /// Creates the feedback.
        /// </summary>
        /// <param name="requestedfeedbackId">The requestedfeedback id.</param>
        /// <param name="requestedBy">The requested by.</param>
        /// <param name="requestedFrom">The requested from.</param>
        /// <param name="requestedFor">The requested for.</param>
        /// <param name="feedbackType">Type of the feedback.</param>
        /// <param name="status">The status.</param>
        /// <param name="groupName">Name of the group.</param>
        /// <returns></returns>
        internal int CreateFeedback(int requestedfeedbackId, int subscriptionId, int requestedBy, int requestedFrom, int requestedFor, int feedbackType, int status, string groupName = null)
        {
            // Log("WCF-CreateFeedback-IN");
            int feedbackId = 0;
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var result = context.CreateFeedback(requestedfeedbackId, subscriptionId, requestedBy,
                                                requestedFrom, requestedFor, feedbackType, status, groupName).FirstOrDefault();
                if (result != null)
                {
                    feedbackId = result.FeedbackId.GetValueOrDefault();
                }
            }
            // Log("WCF-CreateFeedback-OUT");
            return feedbackId;
        }
        /// <summary>
        /// Creates the capability feedback.
        /// </summary>
        /// <param name="requestedfeedbackId">The requestedfeedback id.</param>
        /// <param name="requestedBy">The requested by.</param>
        /// <param name="requestedFrom">The requested from.</param>
        /// <param name="requestedFor">The requested for.</param>
        /// <param name="feedbackType">Type of the feedback.</param>
        /// <param name="status">The status.</param>
        /// <param name="groupName">Name of the group.</param>
        /// <returns></returns>
        internal int CreateCapabilityFeedback(int requestedfeedbackId, int subscriptionId, int requestedBy, int requestedFrom, int requestedFor, int feedbackType, int status, string groupName = null)
        {
            // Log("WCF-CreateFeedback-IN");
            int feedbackId = 0;
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var result = context.CreateCapabilityFeedback(requestedfeedbackId, subscriptionId, requestedBy,
                                                requestedFrom, requestedFor, feedbackType, status, groupName).FirstOrDefault();
                if (result != null)
                {
                    feedbackId = result.FeedbackId.GetValueOrDefault();
                }
            }
            // Log("WCF-CreateFeedback-OUT");
            return feedbackId;
        }
        /// <summary>
        /// Gets the feedbacks by group id.
        /// </summary>
        /// <param name="groupid">The groupid.</param>
        /// <returns></returns>
        public List<CreatedFeedback> GetFeedbacksByGroupId(string groupid)
        {
            // Log("WCF-GetFeedbacksByGroupId-IN");
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                var result = context.GetFeedbackByGroupid(groupid).ToList();
                if (result != null)
                {
                    List<CreatedFeedback> CreateFeedback = new List<CreatedFeedback>();

                    foreach (var feedbacks in result)
                    {
                        CreateFeedback.Add(
                            new CreatedFeedback()
                                {
                                    FeedBackId = feedbacks.POEFeedbackId,
                                    TeamUserMappingId = feedbacks.For.GetValueOrDefault(),
                                    Teammember = common.GetUserDetailsByMappingId(feedbacks.For.GetValueOrDefault())
                                });
                    }
                    // Log("WCF-GetFeedbacksByGroupId-OUT");
                    return CreateFeedback;
                }
                else
                {
                    return null;
                }
            }
        }

        /// <summary>
        /// Gets the users by feedback status.
        /// </summary>
        /// <param name="feedbackStatus">The feedback status.</param>
        /// <returns></returns>
        /*    internal IList<UserPOEMapping> GetUserFeedbacks(int userId, int subscriptionid)
            {
                Common.Common common = new Common.Common();
                using (var context = DataContextFactory.GetIntelliSetDataContext())
                {
                    var results = context.GetUserFeedbacks(userId, subscriptionid);
                    return results.SelectMany((a, b) => new List<UserPOEMapping>{
                         new UserPOEMapping{
                             UserPOEMappingId = a.MappingId.GetValueOrDefault(),
                             AreaId = a.ZoneId.GetValueOrDefault(),
                             User = new User{
                                 UserId = userId,
                                 FirstName = a.FirstName,
                                 LastName = a.LastName,
                                 EmailAddress = a.EmailID,

                                 Photo = a.Photo,
                                 Country = new  Country{
                                     Id = a.CountryId,
                                         Name = Helper.GetCountryName(a.CountryId)
                                 },
                                 Area=  new  Zone{
                                     Id = a.ZoneId.GetValueOrDefault(),
                                     Name = Helper.GetAreaById(a.ZoneId.GetValueOrDefault())
                                 }
                             },
                             POE = new Util.Domain.POE{
                                 POEId = a.POEId,
                                 Name = a.POEName,
                             },
                            Designation = new Designation{
                                    DesignationId = a.DesignationId.GetValueOrDefault(),
                                    Name = a.DesignationName,
                                    Level = a.LevelId.GetValueOrDefault()
                            },
                            FeedbackDetails = new Feedback{
                                        FeedbackId = a.FeedbackId.GetValueOrDefault(),
                                        RequestedBy = common.GetUserDetailsByMappingId(a.RequestedBy.GetValueOrDefault()),
                                        RequestedFor = common.GetUserDetailsByMappingId(a.RequestedFor.GetValueOrDefault()),
                                        RequestedFrom = common.GetUserDetailsByMappingId(a.RequestedFrom.GetValueOrDefault()),
                                        RequestedById = a.RequestedBy.GetValueOrDefault(),
                                        RequestedForId = a.RequestedFor.GetValueOrDefault(),
                                        RequestedFromId = a.RequestedFrom.GetValueOrDefault(),
                                        CreatedOnDtm = a.FeedbackCreatedOn.GetValueOrDefault(),
                                        UpdatedOnDtm = a.FeedbackUpdatedOn.GetValueOrDefault(),
                                        CreatedOn = a.FeedbackCreatedOn!=null?a.FeedbackCreatedOn.GetValueOrDefault().ToString("MMMM dd, yyyy"):"",
                                        UpdatedOn = a.FeedbackUpdatedOn!=null?a.FeedbackUpdatedOn.GetValueOrDefault().ToString("MMMM dd, yyyy"):"",
                                        FeedbackStatus = (FeedbackStatus)Enum.Parse(typeof(FeedbackStatus),a.FeedBackStatus.GetValueOrDefault().ToString()),
                                        FeedbackType = (FeedbackType)Enum.Parse(typeof(FeedbackType),a.FeedbackType.Value.ToString()),
                                        GroupName = a.GroupName
                            },

                            JobTitle = a.JobTitle
                         }
                    }).ToList();
                }
            }
    */

        /// <summary>
        /// Gets the feedback recevied.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        internal IList<UserPOEMapping> GetFeedbackRecevied(int userId, int subscriptionid)
        {
            //Log("WCF-GetFeedbackRecevied");
            Common.Common common = new Common.Common();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetFeedbackRecevied(userId, subscriptionid);
                return results.SelectMany((a, b) => new List<UserPOEMapping>{
                     new UserPOEMapping{
                         UserPOEMappingId = a.RequestedFrom.GetValueOrDefault(),
                         AreaId = a.ZoneId.GetValueOrDefault(),
                         User = new User{
                             UserId =a.UserId.GetValueOrDefault(),
                             FirstName = a.FirstName,
                             LastName = a.LastName,
                             EmailAddress = a.EmailID,
                          //   Photo = a.Photo,

                             Country = new Country{
                                 Id = a.CountryId.GetValueOrDefault(),
                                     Name = Helper.GetCountryName(a.CountryId.GetValueOrDefault())
                             },
                             Area=  new Zone{
                                 Id = a.ZoneId.GetValueOrDefault(),
                                 Name = Helper.GetAreaById(a.ZoneId.GetValueOrDefault())
                             }
                         },
                         POE = new Util.Domain.POE() {
                             POEId = a.POEId.GetValueOrDefault(),
                             Name = a.POEName,
                         },
                        Designation = new Designation{
                                DesignationId = a.DesignationId.GetValueOrDefault(),
                                Name = a.JobTitle,
                        },
                        FeedbackDetails = new  Feedback{
                                    FeedbackId = a.POEFeedbackId.GetValueOrDefault(),
                                    RequestedBy = common.GetUserDetailsByMappingId(a.RequestedBy.GetValueOrDefault()),
                                    RequestedFor = common.GetUserDetailsByMappingId(a.RequestedFor.GetValueOrDefault()),
                                    RequestedFrom = common.GetUserDetailsByMappingId(a.RequestedFrom.GetValueOrDefault()),
                                     RequestedById = a.RequestedBy.GetValueOrDefault(),
                                    RequestedForId = a.RequestedFor.GetValueOrDefault(),
                                    RequestedFromId = a.RequestedFrom.GetValueOrDefault(),
                                    CreatedOnDtm = a.CreatedOn.GetValueOrDefault(),
                                    UpdatedOnDtm = a.UpdatedOn.GetValueOrDefault(),
                                    CreatedOn = a.CreatedOn!=null?a.CreatedOn.GetValueOrDefault().ToString("MMMM dd, yyyy"):"",
                                    UpdatedOn = a.UpdatedOn!=null?a.UpdatedOn.GetValueOrDefault().ToString("MMMM dd, yyyy"):"",
                                    FeedbackStatus = (FeedbackStatus)Enum.Parse(typeof(FeedbackStatus),a.FeedbackStatus.GetValueOrDefault().ToString()),
                                    FeedbackType = (FeedbackType)Enum.Parse(typeof(FeedbackType),a.FeedbackType.Value.ToString()),
                                    GroupName = a.GroupName
                        },

                        JobTitle = a.JobTitle
                     }
                }).ToList();
            }
        }

        internal IList<UserPOEMapping> GetFeedbackGivenFull(int userId, int subscriptionid)
        {
            //Log("WCF-GetFeedbackGivenFull");
            Common.Common common = new Common.Common();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetFeedbackGiven(userId, subscriptionid);
                return results.SelectMany((a, b) => new List<UserPOEMapping>{
                     new UserPOEMapping{
                         UserPOEMappingId = a.RequestedFrom.GetValueOrDefault(),
                         AreaId = a.ZoneId.GetValueOrDefault(),
                         User = new User{
                             UserId = a.UserId.GetValueOrDefault(),
                             FirstName = a.FirstName,
                             LastName = a.LastName,
                             EmailAddress = a.EmailID,
                          //   Photo = a.Photo,

                             Country = new Country{
                                 Id = a.CountryId.GetValueOrDefault(),
                                     Name = Helper.GetCountryName(a.CountryId.GetValueOrDefault())
                             },
                             Area=  new Zone{
                                 Id = a.ZoneId.GetValueOrDefault(),
                                 Name = Helper.GetAreaById(a.ZoneId.GetValueOrDefault())
                             }
                         },
                         POE = new Util.Domain.POE() {
                             POEId = a.POEId.GetValueOrDefault(),
                             Name = a.POEName,
                         },
                        Designation = new Designation{
                                DesignationId = a.DesignationId.GetValueOrDefault(),
                                Name = a.JobTitle,
                        },
                        FeedbackDetails = new  Feedback{
                                    FeedbackId = a.POEFeedbackId.GetValueOrDefault(),
                                    RequestedBy = common.GetUserDetailsByMappingId(a.RequestedBy.GetValueOrDefault()),
                                    RequestedFor = common.GetUserDetailsByMappingId(a.RequestedFor.GetValueOrDefault()),
                                    RequestedFrom = common.GetUserDetailsByMappingId(a.RequestedFrom.GetValueOrDefault()),
                                     RequestedById = a.RequestedBy.GetValueOrDefault(),
                                    RequestedForId = a.RequestedFor.GetValueOrDefault(),
                                    RequestedFromId = a.RequestedFrom.GetValueOrDefault(),
                                    CreatedOnDtm = a.CreatedOn.GetValueOrDefault(),
                                    UpdatedOnDtm = a.UpdatedOn.GetValueOrDefault(),
                                    CreatedOn = a.CreatedOn!=null?a.CreatedOn.GetValueOrDefault().ToString("MMMM dd, yyyy"):"",
                                    UpdatedOn = a.UpdatedOn!=null?a.UpdatedOn.GetValueOrDefault().ToString("MMMM dd, yyyy"):"",
                                    FeedbackStatus = (FeedbackStatus)Enum.Parse(typeof(FeedbackStatus),a.FeedbackStatus.GetValueOrDefault().ToString()),
                                    FeedbackType = (FeedbackType)Enum.Parse(typeof(FeedbackType),a.FeedbackType.Value.ToString()),
                                    GroupName = a.GroupName
                        },

                        JobTitle = a.JobTitle
                     }
                }).ToList();
            }
        }

        /// <summary>
        /// Gets the feedback given.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>

        internal IList<UserPOEMapping> GetFeedbackGiven(int userId, int subscriptionid)
        {
            //Log("WCF-GetFeedbackGiven-IN");
            var common = new Common.Common();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetFeedbackGiven(userId, subscriptionid);
                var outPut = new List<UserPOEMapping>();
                foreach (var b in results.GroupBy(item => item.GroupName).ToList())
                {
                    foreach (var a in b)
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

                            if (userPoeMapping.FeedbackDetails.GroupName != null)
                            {
                                userPoeMapping.Nooffbs = b.Count();
                                break;
                            }
                        }
                    }
                }
                // Log("WCF-GetFeedbackGiven-OUT");
                return outPut;
            }
        }

        /// <summary>
        /// Gets the feedback outstanding.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        internal IList<UserPOEMapping> GetFeedbackOutstanding(int userId, int subscriptionid)
        {
            // Log("WCF-GetFeedbackOutstanding-IN");
            var common = new Common.Common();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetFeedbackOutstanding(userId, subscriptionid);
                var outPut = new List<UserPOEMapping>();
                foreach (var b in results.GroupBy(item => item.GroupName).ToList())
                {
                    foreach (V3_GetFeedbackOutstandingResult a in b)
                    {
                        if (a.FeedbackType != null)
                        {
                            var userPoeMapping = new UserPOEMapping
                                {
                                    UserPOEMappingId = a.RequestedFrom.GetValueOrDefault(),
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

                            if (userPoeMapping.FeedbackDetails.GroupName != null)
                            {
                                userPoeMapping.Nooffbs = b.Count();
                                break;
                            }
                        }
                    }
                }

                //var returnData=results.SelectMany((a, b) => new List<UserPOEMapping>{
                //     new UserPOEMapping{
                //         UserPOEMappingId = a.RequestedFrom.GetValueOrDefault(),
                //         AreaId = a.ZoneId.GetValueOrDefault(),
                //         User = new User{
                //             UserId = userId,
                //             FirstName = a.FirstName,
                //             LastName = a.LastName,
                //             EmailAddress = a.EmailID,
                //             Photo = a.Photo,

                //             Country = new Country{
                //                 Id = a.CountryId.GetValueOrDefault(),
                //                     Name = Helper.GetCountryName(a.CountryId.GetValueOrDefault())
                //             },
                //             Area=  new Zone{
                //                 Id = a.ZoneId.GetValueOrDefault(),
                //                 Name = Helper.GetAreaById(a.ZoneId.GetValueOrDefault())
                //             }
                //         },
                //         POE = new Util.Domain.POE() {
                //             POEId = a.POEId.GetValueOrDefault(),
                //             Name = a.POEName,
                //         },
                //        Designation = new Designation{
                //                DesignationId = a.DesignationId.GetValueOrDefault(),
                //                Name = a.JobTitle,
                //        },
                //        FeedbackDetails = new  Feedback{
                //                    FeedbackId = a.GroupName!=null ? 0 :a.POEFeedbackId.GetValueOrDefault(),
                //                    RequestedBy = common.GetUserDetailsByMappingId(a.RequestedBy.GetValueOrDefault()),
                //                    RequestedFor = common.GetUserDetailsByMappingId(a.RequestedFor.GetValueOrDefault()),
                //                    RequestedFrom = common.GetUserDetailsByMappingId(a.RequestedFrom.GetValueOrDefault()),
                //                    RequestedById = a.RequestedBy.GetValueOrDefault(),
                //                    RequestedForId = a.RequestedFor.GetValueOrDefault(),
                //                    RequestedFromId = a.RequestedFrom.GetValueOrDefault(),
                //                    CreatedOnDtm = a.CreatedOn.GetValueOrDefault(),
                //                    UpdatedOnDtm = a.UpdatedOn.GetValueOrDefault(),
                //                    CreatedOn = a.CreatedOn!=null?a.CreatedOn.GetValueOrDefault().ToString("MMMM dd, yyyy"):"",
                //                    UpdatedOn = a.UpdatedOn!=null?a.UpdatedOn.GetValueOrDefault().ToString("MMMM dd, yyyy"):"",
                //                    FeedbackStatus = (FeedbackStatus)Enum.Parse(typeof(FeedbackStatus),a.FeedbackStatus.GetValueOrDefault().ToString()),
                //                    FeedbackType = (FeedbackType)Enum.Parse(typeof(FeedbackType),a.FeedbackType.Value.ToString()),
                //                    GroupName = a.GroupName
                //        },

                //        JobTitle = a.JobTitle
                //     }
                //}).ToList();

                //return returnData;
                // Log("WCF-GetFeedbackOutstanding-OUT");
                return outPut;
            }
        }

        /// <summary>
        /// Gets the feedback history.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        internal IList<UserPOEMapping> GetFeedbackHistory(int userId, int subscriptionid)
        {
            // Log("WCF-GetFeedbackHistory");
            Common.Common common = new Common.Common();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetFeedbackHistory(userId, subscriptionid);
                return results.SelectMany((a, b) => new List<UserPOEMapping>{
                     new UserPOEMapping{
                         UserPOEMappingId =(a.DesignationId==1||a.DesignationId==4)?a.RequestedFor.GetValueOrDefault(): a.RequestedFrom.GetValueOrDefault(),
                         AreaId = a.ZoneId.GetValueOrDefault(),
                         User = new User{
                             UserId =  a.UserId.GetValueOrDefault(),
                             FirstName = DecryptString(a.FirstName),//a.FirstName,
                             LastName = DecryptString(a.LastName),
                             EmailAddress = DecryptString(a.EmailID),
                            // Photo = a.Photo,

                             Country = new Country{
                                 Id = a.CountryId.GetValueOrDefault(),
                                     Name = Helper.GetCountryName(a.CountryId.GetValueOrDefault())
                             },
                             Area=  new Zone{
                                 Id = a.ZoneId.GetValueOrDefault(),
                                 Name = Helper.GetAreaById(a.ZoneId.GetValueOrDefault())
                             }
                         },
                         POE = new Util.Domain.POE() {
                             POEId = a.POEId.GetValueOrDefault(),
                             Name = a.POEName,
                         },
                        Designation = new Designation{
                                DesignationId = a.DesignationId.GetValueOrDefault(),
                                Name = a.JobTitle,
                        },
                        FeedbackDetails = new  Feedback{
                                    FeedbackId = a.POEFeedbackId.GetValueOrDefault(),
                                    RequestedBy = common.GetUserDetailsByMappingId(a.RequestedBy.GetValueOrDefault()),
                                    RequestedFor = common.GetUserDetailsByMappingId(a.RequestedFor.GetValueOrDefault()),
                                    RequestedFrom = common.GetUserDetailsByMappingId(a.RequestedFrom.GetValueOrDefault()),
                                    RequestedById = a.RequestedBy.GetValueOrDefault(),
                                    RequestedForId = a.RequestedFor.GetValueOrDefault(),
                                    RequestedFromId = a.RequestedFrom.GetValueOrDefault(),
                                    CreatedOnDtm = a.CreatedOn.GetValueOrDefault(),
                                    UpdatedOnDtm = a.UpdatedOn.GetValueOrDefault(),
                                    CreatedOn = a.CreatedOn!=null?a.CreatedOn.GetValueOrDefault().ToString("MMMM dd, yyyy"):"",
                                    UpdatedOn = a.UpdatedOn!=null?a.UpdatedOn.GetValueOrDefault().ToString("MMMM dd, yyyy"):"",
                                    FeedbackStatus = (FeedbackStatus)Enum.Parse(typeof(FeedbackStatus),a.FeedbackStatus.GetValueOrDefault().ToString()),
                                    FeedbackType = (FeedbackType)Enum.Parse(typeof(FeedbackType),a.FeedbackType.Value.ToString()),
                                    GroupName = a.GroupName
                        },
                        UserId = userId,
                        JobTitle = a.JobTitle
                     }
                }).ToList();
            }
        }
        public string DecryptString(string encrString)
        {
            byte[] b;
            string decrypted;
            try
            {
                b = Convert.FromBase64String(encrString);
                decrypted = System.Text.ASCIIEncoding.ASCII.GetString(b);
            }
            catch (FormatException fe)
            {
                decrypted = "";
            }
            return decrypted;
        }  
        /// <summary>
        /// Gets the users feedbacks by status.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="feedbackStatus">The feedback status.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        /*    public List<UserPOEMapping> GetUsersFeedbacksByStatus(int userId, int poeId, FeedbackStatus feedbackStatus, int subscriptionid)
            {
                var users = GetUserFeedbacks(userId, subscriptionid);
                if (poeId != 0)
                {
                    return users.Where(a => a.FeedbackDetails.FeedbackStatus == feedbackStatus && a.POE.POEId == poeId).ToList();
                }
                return users.Where(a => a.FeedbackDetails.FeedbackStatus == feedbackStatus).ToList();
            }
            */

        /// <summary>
        /// Gets the completed feedbacks.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        /*    public List<UserPOEMapping> GetCompletedFeedbacks(int userId, int subscriptionid)
            {
                List<UserPOEMapping> CompletedProgressFeedback;
                CompletedProgressFeedback = GetUsersFeedbacksByStatus(userId, 0, FeedbackStatus.Complete, subscriptionid);
                var groupedFeedback = new List<UserPOEMapping>();
                foreach (var feedback in CompletedProgressFeedback)
                {
                    var hasFeedback = groupedFeedback
                        .FirstOrDefault(a => a.FeedbackDetails.GroupName == feedback.FeedbackDetails.GroupName
                                               && !string.IsNullOrEmpty(a.FeedbackDetails.GroupName));
                    if (hasFeedback == null)
                    {
                        groupedFeedback.Add(feedback);
                    }
                }

                return groupedFeedback.OrderByDescending(a => a.FeedbackDetails.UpdatedOnDtm).ToList();
            }
            */

        /// <summary>
        /// Gets the feedback recevied.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <param name="poeId">The poe id.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetFeedbackRecevied(int userId, int subscriptionid, int poeId)
        {
            //Log("WCF-GetFeedbackRecevied-IN");
            Common.Common common = new Common.Common();
            var completedFbs = GetFeedbackRecevied(userId, subscriptionid);
            // Log("WCF-GetFeedbackRecevied-OUT");
            return completedFbs.Where(a => a.POE.POEId == poeId).ToList();
        }

        /// <summary>
        /// Gets the feedback outstanding.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <param name="poeId">The poe id.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetFeedbackOutstanding(int userId, int subscriptionid, int poeId)
        {
            //  Log("WCF-GetFeedbackOutstanding-IN");
            Common.Common common = new Common.Common();
            var outstandings = GetFeedbackOutstanding(userId, subscriptionid);
            //  Log("WCF-GetFeedbackOutstanding-OUT");
            return outstandings.Where(a => a.POE.POEId == poeId).ToList();
        }

        /// <summary>
        /// Gets the feedback given.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <param name="poeId">The poe id.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetFeedbackGiven(int userId, int subscriptionid, int poeId)
        {
            //Log("WCF-GetFeedbackGiven-IN");
            Common.Common common = new Common.Common();
            var completedFbs = GetFeedbackGiven(userId, subscriptionid);
            //  Log("WCF-GetFeedbackGiven-OUT");
            return completedFbs.Where(a => a.POE.POEId == poeId).ToList();
        }

        public List<UserPOEMapping> GetFeedbackGivenFull(int userId, int subscriptionid, int poeId)
        {
            // Log("WCF-GetFeedbackGivenFull-IN");
            Common.Common common = new Common.Common();
            var completedFbs = GetFeedbackGivenFull(userId, subscriptionid);
            //  Log("WCF-GetFeedbackGivenFull-OUT");
            return completedFbs.Where(a => a.POE.POEId == poeId).ToList();
        }

        /// <summary>
        /// Gets the feedback history.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <param name="poeId">The poe id.</param>
        /// <returns></returns>
        public List<UserPOEMapping> GetFeedbackHistory(int userId, int subscriptionid, int poeId)
        {
            // Log("WCF-GetFeedbackHistory-IN");
            Common.Common common = new Common.Common();
            var completedFbs = GetFeedbackHistory(userId, subscriptionid);
            // Log("WCF-GetFeedbackHistory-OUT");
            return completedFbs.Where(a => a.POE.POEId == poeId).ToList();
        }

        /// <summary>
        /// Gets the completed manager feedbacks.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        /*   public List<UserPOEMapping> GetCompletedManagerFeedbacks(int userId, int subscriptionid)
           {
               return GetCompletedFeedbacks(userId, subscriptionid).Where(a => a.FeedbackDetails.FeedbackType == FeedbackType.Manager).ToList();
           }
           */

        public int GetGivenAnswer(int feedbackId, int questionId)
        {
            // Log("WCF-GetGivenAnswer:FBID:" + feedbackId + "IN");
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var result = context.GetGivenAnswer(feedbackId, questionId).FirstOrDefault();
                if (result != null)
                {
                    feedbackId = result.Answer.GetValueOrDefault();
                }
            }
            //Log("WCF-GetGivenAnswer:FBID:" + feedbackId + "OUT");
            return feedbackId;
        }

        /// <summary>
        /// Gets the last saved question.
        /// </summary>
        /// <param name="feedbackId">The feedback id.</param>
        /// <returns></returns>
        public SavedQuestion GetLastSavedQuestion(int feedbackId)
        {
            // Log("WCF-GetLastSavedQuestion:FBID:" + feedbackId + "IN");
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var returnValue = context.GetLastSavedQuestion(feedbackId).FirstOrDefault();

                if (returnValue == null)
                {
                    // Log("WCF-GetLastSavedQuestion:FBID:" + feedbackId + "-OUT");
                    return new SavedQuestion
                    {
                        FeedBackId = feedbackId,
                        FeedBackStatus = 0,
                        ModuleId = 0,
                        QuestionId = 0,
                        ModuleOrder = 0,
                        QuestionOrder = 0
                    };
                }
                else
                {
                    //  Log("WCF-GetLastSavedQuestion:FBID:" + feedbackId + "-OUT");
                    return new SavedQuestion
                        {
                            FeedBackId = feedbackId,
                            FeedBackStatus = 1,
                            ModuleId = returnValue.POEModuleId,
                            QuestionId = returnValue.QuestionId,
                            ModuleOrder = returnValue.ModuleOrder,
                            QuestionOrder = returnValue.QuestionOrder
                        };
                }
            }
        }

        /// <summary>
        /// Gets the feedback results.
        /// </summary>
        /// <param name="feedbackId">The feedback id.</param>
        /// <returns></returns>
        public List<SavePOEResultRequest> GetFeedbackResults(int feedbackId)
        {
            // Log("WCF-GetFeedbackResults:FBID:" + feedbackId + "-IN");
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetPOEResults(feedbackId);
                // Log("WCF-GetFeedbackResults:FBID:" + feedbackId + "-OUT");
                return results.SelectMany((a, b) => new List<SavePOEResultRequest>
                                                        {
                                                            new SavePOEResultRequest
                                                                {
                                                                    QuestionId = a.QuestionId,
                                                                    Answer = a.Answer.GetValueOrDefault(),
                                                                    AnswerType = a.AnswerType.GetValueOrDefault(),
                                                                    FeedbackId=feedbackId,
                                                                    UserRating = a.Rating.GetValueOrDefault(),
                                                                    Notes = a.Notes,
                                                                    CapabilityAnswer=a.CapabilityAnswer.GetValueOrDefault(),
                                                                    ModuleNumber=a.POEModuleId
                                                                }
                                                        }).ToList();
            }
        }

        public List<V3_GetTopMembersListResult> GetTopMembersList(string domain, int poeid, int moduleid, int quesionid)
        {
            // Log("WCF-GetTopMembersList-IN");
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                // Log("WCF-GetTopMembersList-OUT");
                return context.GetTopMembersList(poeid, moduleid, quesionid, domain).ToList();
            }
        }

        public string GetSherpasListIds(string domain, int poeid, string userid)
        {
            // Log("WCF-GetTopMembersList-IN");
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                // Log("WCF-GetTopMembersList-OUT");
                Standing.StandingDataAccess standing = new StandingDataAccess();
                return standing.GetSherpasForIdString(poeid, userid, 1, domain);
            }
        }

        public List<UserPOEMapping> GetTopMembers(string domain, int poeid, string userid)
        {
            //Log("WCF-GetTopMembers-IN");
            var list = GetSherpasListIds(domain, poeid, userid).Split(',');
            List<UserPOEMapping> topMembers = list.Select(user => new Common.Common().GetUserDetailsByMappingId(int.Parse(user))).ToList();
            // Log("WCF-GetTopMembers-OUT");
            if (topMembers[0] != null)
            {
                return topMembers.GroupBy(x => x.User.EmailAddress).Select(y => y.First()).ToList();
            }
            else
            {
                return null;
            }
        }

        //public List<UserPOEMapping> GetTopMembers(string domain, int poeid, int moduleid, int quesionid)
        //{
        //    //Log("WCF-GetTopMembers-IN");
        //    var list = GetTopMembersList(domain, poeid, moduleid, quesionid);
        //    List<UserPOEMapping> topMembers = new List<UserPOEMapping>();
        //    foreach (V3_GetTopMembersListResult user in list)
        //    {
        //        var member = new Common.Common().GetUserDetailsByMappingId(user.forid.GetValueOrDefault());
        //        topMembers.Add(member);
        //    }
        //    // Log("WCF-GetTopMembers-OUT");
        //    return topMembers.GroupBy(x => x.User.EmailAddress).Select(y => y.First()).ToList();
        //}

        internal List<FeedbackDetail> GetAllFeedbackDetails(int feedbacktype, int poeid)
        {
            int forid = 0;
            UserAdminDataAccess userAdminDataAccess = new UserAdminDataAccess();
            // Log("WCF-GetAllFeedbackDetails-IN");
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetAllFeedbacks(feedbacktype, poeid);
                // Log("WCF-GetAllFeedbackDetails-OUT");
                return
                     results.SelectMany(
                         (a, b) =>
                         new List<FeedbackDetail>
                            {
                                new FeedbackDetail()
                                    {
                                        FBFromOrByUser =
                                            userAdminDataAccess.GetUserDetailsByMappingId(userAdminDataAccess.GetMappingIdByEmailForReport(a.EMAILID,poeid)).User,
                                        FBTouser = (a.FEEDFOR == null && a.REQUESTEDBY == null) ? null: userAdminDataAccess.GetUserDetailsByMappingId( (a.FEEDFOR.Value == 0) ? a.REQUESTEDBY.Value: a.FEEDFOR.Value).User,
                                        FBLastUpdatedon = (a.LASTUPDATED == null) ?string.Empty: a.LASTUPDATED.Value.ToShortDateString(),
                                        Status = (a.STATUS == 2) ?"Yes": "No",
                                        FeedbackType = "Self",
                                        PoeId = poeid
                                    }
                            }).ToList();
            }
        }

        //For reports
        public List<ManagerFeedback> GetManagerReportDumb(int feedbacktype, int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetDataDumb(poeid, 2).Where(a => a.POEFeedbackId != null);
                return results.SelectMany(
                    (a, b) => new List<ManagerFeedback>
                                  {
                                      new ManagerFeedback()
                                          {
                                              MangagerPoeId = a.Parent_POEMappingId,
                                              TeammenberPoeId = a.Child_POEMappingId,
                                              FeedbackId = a.POEFeedbackId
                                          }
                                  }
                    ).ToList();
            }
        }

        public List<UserFeedback> GetTeamMberDumb(int feedbacktype, int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetDataDumb(poeid, 1).Where(a => a.POEFeedbackId != null);
                return results.SelectMany(
                    (a, b) => new List<UserFeedback>
                                  {
                                      new UserFeedback()
                                          {
                                             UserId = a.Child_POEMappingId.Value,
                                             FeedbackId=a.POEFeedbackId
                                          }
                                  }
                    ).ToList();
            }
        }

        //public DataDumbScore GetModuleScores(string feedbackid, int poeid)
        //{
        //    var standingScore = new DataDumbScore();
        //    using (var context = DataContextFactory.GetIntelliSetDataContext())
        //    {
        //        var result = context.GetWCSIPerModule(feedbackid, poeid.ToString(CultureInfo.InvariantCulture)).ToList();
        //        standingScore.WcsiScore = Math.Round(result.Sum(a => Math.Round(a.WCSIPermod.GetValueOrDefault(0), MidpointRounding.AwayFromZero)), MidpointRounding.AwayFromZero);
        //        standingScore.ModuleScores = result.SelectMany((a, b) => a.Maxscore != null ? new List<DataDumbModuleScore>
        //        {
        //            new DataDumbModuleScore()
        //            {
        //                ModuleName = a.ModuleName,
        //                Moduleid = a.ModuleId,
        //                TotalModuleScore =(a.WCSIPermod!=null ?(int)(((float) a.WCSIPermod/(float) a.Maxscore)*100):0),
        //                WeightageScore = a.Maxscore,
        //                Modulescore =  Math.Round((a.WCSIPermod ?? 0), MidpointRounding.AwayFromZero),
        //                QuestionScores =GetStandingResultByQuestions(feedbackid, a.ModuleId.ToString(CultureInfo.InvariantCulture))

        //             //   ModuleScoreAvg = a.AvgAnswer.GetValueOrDefault(0),
        //               // ModuleScorePercentage = a.Percentage.GetValueOrDefault(0),
        //            }
        //        } : null).ToList();

        //        return standingScore;
        //    }
        //}
        public DataDumbScore GetModuleScores(string feedbackid, int poeid)
        {
            var standingScore = new DataDumbScore();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var result = context.GetWCSIPerModuleTest(feedbackid, poeid.ToString(CultureInfo.InvariantCulture)).ToList();
                standingScore.WcsiScore = result.Sum(a => a.WCSIPermod.GetValueOrDefault(0));
                standingScore.ModuleScores = result.SelectMany((a, b) => a.Maxscore != null ? new List<DataDumbModuleScore>
                {
                    new DataDumbModuleScore()
                    {
                        ModuleName = a.ModuleName,
                        Moduleid = a.ModuleId,
                        TotalModuleScore =(a.WCSIPermod!=null ?(int)(((float) a.WCSIPermod/(float) a.Maxscore)*100):0),
                        WeightageScore = a.Maxscore,
                        Modulescore =  a.WCSIPermod ,
                        QuestionScores =GetStandingResultByQuestions(feedbackid, a.ModuleId.ToString(CultureInfo.InvariantCulture))

                     //   ModuleScoreAvg = a.AvgAnswer.GetValueOrDefault(0),
                       // ModuleScorePercentage = a.Percentage.GetValueOrDefault(0),
                    }
                } : null).ToList();

                return standingScore;
            }
        }
        public DataDumbScore GetCapabilityModuleScores(string feedbackid, int poeid)
        {
            var standingScore = new DataDumbScore();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var result = context.GetCapabilityWCSIPerModule(feedbackid, poeid.ToString(CultureInfo.InvariantCulture)).ToList();
                standingScore.WcsiScore = result.Sum(a => a.WCSIPermod.GetValueOrDefault(0));
                standingScore.ModuleScores = result.SelectMany((a, b) => a.Maxscore != null ? new List<DataDumbModuleScore>
                {
                    new DataDumbModuleScore()
                    {
                        ModuleName = a.ModuleName,
                        Moduleid = a.ModuleId,
                        TotalModuleScore =(a.WCSIPermod!=null ?(int)(((float) a.WCSIPermod/(float) a.Maxscore)*100):0),
                        WeightageScore = a.Maxscore,
                        Modulescore =  a.WCSIPermod ,
                        QuestionScores =GetStandingCapabilityByQuestions(feedbackid, a.ModuleId.ToString(CultureInfo.InvariantCulture))

                     //   ModuleScoreAvg = a.AvgAnswer.GetValueOrDefault(0),
                       // ModuleScorePercentage = a.Percentage.GetValueOrDefault(0),
                    }
                } : null).ToList();

                return standingScore;
            }
        }
        public List<DataDumbQuestionScore> GetStandingResultByQuestions(string fbid, string moduleid, int userid = 0)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetAvgFeedbackResult(fbid, moduleid, userid).ToList().SelectMany(
                        (a, b) => new List<DataDumbQuestionScore>
                            {
                                new DataDumbQuestionScore()
                                    {
                                        ShortQuetionText = a.ShortQuestion,
                                        QuestionText =a.SideBarText,
                                        Questionid = a.QuestionId.GetValueOrDefault(),
                                        Score = a.Answer.GetValueOrDefault(0),
                                        ScorePercentage = a.Percentage.GetValueOrDefault(0),
                                        ReportQuestion=a.ReportQuestion
                                    }
                            }).ToList();
            }
        }
        public List<DataDumbQuestionScore> GetStandingCapabilityByQuestions(string fbid, string moduleid, int userid = 0)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetAvgCapabilityResult(fbid, moduleid, userid).ToList().SelectMany(
                        (a, b) => new List<DataDumbQuestionScore>
                            {
                                new DataDumbQuestionScore()
                                    {
                                        ShortQuetionText = a.ShortQuestion,
                                        QuestionText =a.Question,
                                        Questionid = a.QuestionId.GetValueOrDefault(),
                                        Score = a.Answer.GetValueOrDefault(0),
                                        ScorePercentage = a.Percentage.GetValueOrDefault(0),
                                    }
                            }).ToList();
            }
        }
        public static void Log(string methodname)
        {
            Trace.Write(Environment.NewLine + Environment.NewLine + "Date :" + DateTime.Now.ToString() + " " + methodname);
        }

        public void InsertUpdateUSerRating(int Userid, int Questionid, int Userrating, int feedbackid, int poeId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.IuUserRating(Userid, Questionid, Userrating, feedbackid, poeId);
            }
        }
        public void InsertUpdateUserDemographic(int Userid, int Questionid, string answer, int feedbackid, int poeId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.IuUserDemographic(Userid, Questionid, answer, feedbackid, poeId);
            }
        }
        public int GetUserRatingByPoeId(int? Userid, int? Poeid, int questionid, int feedbackid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return Convert.ToInt32(context.GetUserRatingByPoeId(questionid, Userid, feedbackid, Poeid).Select(i => i.RatingCount).FirstOrDefault());
            }
        }
        public int GetUserRatingByPoeIdUpdated(int? Userid, int Poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return Convert.ToInt32(context.GetUserRatingByPoeIdUpdated(Userid, Poeid).Select(i => i.RatingCount).FirstOrDefault());
            }
        }
        public void UpdateFeedbackNotes(int Feedbackid, string subject, string notes, int Questionid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.UpdateFeedbackNotes(Feedbackid, subject, notes, Questionid);
            }
        }
        public List<Question> GetFbExperienceQuestions()
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var result = context.GetFbExperinceQuestions();
                return result.SelectMany(a => new List<Question>{
                    new Question{
                        QuestionId = a.Id,
                        QuetionText = a.Question
                    }
                }).ToList();
            }
        }
        public void InsertFbExperience(int Userid, int Feedbackid, int Questionid, int Answer)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.InsertFbExperience(Userid, Questionid, Answer, Feedbackid);
            }
        }
        public List<UserSurvey> GetUserSurvey(int userId, int poeId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var result = context.GetSurveyAnswers(userId, poeId);
                return result.SelectMany(a => new List<UserSurvey>{
                    new UserSurvey{
                        QuestionId = (int) a.QuestionId,
                        Answer = a.Answer,
                        SubQuestionId=(int) a.SubQuestionId,
                        IsSubQuestion=(bool) a.IsSubQuestion
                    }
                }).ToList();
            }
        }
    }
}