using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Web.Security;
using System.Xml.Schema;
using bExcellent.Service.BusinessLogic.Common;
using bExcellent.Service.BusinessLogic.UserAdmin;
using bExcellent.Service.DataAccess;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Enumeration;
using bExcellent.Service.Util.Request;

namespace bExcellent.Service.BusinessLogic.SignUp
{
    public class SignUpDataAccess
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
        /// Gets the modules.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <returns></returns>
        public void SignUp(SignupRequest sr)
        {
            //New user
            int userid = 0;
            var user = sr.User;
            string salt = CreateSalt();
            string encPassword = CreatePasswordHash(user.Password + salt);

            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                if (sr.Mode == 0)
                {
                    var resultuser =
                        context.RegisterUser(user.FirstName + " " + user.LastName, user.Password, encPassword, salt, user.FirstName,
                                             user.LastName, user.EmailAddress, user.CompanyName,
                                             Convert.ToInt32(user.Country.Id), user.Photo, user.YammerToken).FirstOrDefault();
                    if (resultuser != null)
                    {
                        userid = resultuser.UserId.GetValueOrDefault();
                    }

                    sr.User.UserId = userid;
                    SendWelcomeEmail(user.FirstName + " " + user.LastName, user.EmailAddress);
                }
                int subscriptionId = 0;

                var resultsub = context.CreateSubscription(user.EmailAddress, sr.Netwrok.NetworkName, 1, 1, sr.Netwrok.Plan).ToList();
                if (resultsub.Count > 0)
                {
                    subscriptionId = resultsub[0].SubscriptionID.GetValueOrDefault(0);
                }
                if (userid != 0)
                {
                    //subscriptionId = (from c in resultsub let subscriptionID = c.SubscriptionID where subscriptionID != null select subscriptionID.Value).FirstOrDefault();

                    context.UserSubscribtions(subscriptionId, userid, DateTime.Now, 1, 10, 120);
                }

                sr.Netwrok.Subscriptionid = subscriptionId;

                int salesOrderId = 0;
                if (sr.Payment != null)
                {
                    var resultPayment = context.InsertPayment(subscriptionId, sr.Payment.Amount, sr.Payment.Response,
                                                              sr.Payment.ResponseId);
                    if (resultPayment != null)
                    {
                        salesOrderId = resultPayment.FirstOrDefault().SalesOrderId.GetValueOrDefault();
                    }
                }
                //Insert SubscribedPoes
                var common = new Common.Common();
                var subscriptedPoes = common.GetSubscribedPoes(subscriptionId);
                List<Util.Domain.POE> newlyAddedPoes = sr.Poes;

                if (sr.Poes != null)
                {
                    foreach (var poe in subscriptedPoes)
                    {
                        newlyAddedPoes.RemoveAll(a => a.POEId == poe.POEId);
                    }

                    foreach (Util.Domain.POE poe in sr.Poes)
                    {
                        if (sr.Payment != null)
                        {
                            context.InsertSalesOrderItem(salesOrderId, 1, poe.POEId, poe.Name, 20.00m);
                        }
                        float poecost = 0;
                        if (sr.Members != null)
                        {
                            poecost = sr.Members[0].PoeAmount;
                        }
                        context.InsertSubscribedPoes(poe.POEId, subscriptionId, poecost);
                    }
                }
                if (newlyAddedPoes != null)
                {
                    foreach (var poe in newlyAddedPoes)
                    {
                        SendAddPoeNotificationEmail(user.FirstName + " " + user.LastName, user.EmailAddress, poe.Name);
                    }
                }

                if (sr.Members != null)
                {
                    foreach (UserPOEMapping member in sr.Members)
                    {
                        int parentMappingid = 0;
                        int childMappingId = 0;
                        int peerParentMappingid = 0;
                        int peerchildMappingId = 0;
                        int memberid = 0;
                        string salttemp = CreateSalt();
                        string encPasswordtemp = CreatePasswordHash("Pass@123" + salttemp);
                        var resultmembers =
                            context.RegisterUser(member.User.FirstName + " " + member.User.LastName, "Pass@123",
                                                 encPasswordtemp, salttemp, member.User.FirstName,
                                                 member.User.LastName, member.User.EmailAddress, user.CompanyName,
                                                 Convert.ToInt32(user.Country.Id), null, member.User.YammerToken).FirstOrDefault();
                        if (member.Designation.Level != (int)NetworkUserFilterType.Customer)
                        {
                            SendInviteEmail(
                                sr.User.FirstName + " " + sr.User.LastName, member.User.FirstName + " " + member.User.LastName, sr.User.EmailAddress, member.User.EmailAddress, subscriptionId);
                        }
                        if (resultmembers != null)
                        {
                            memberid = resultmembers.UserId.GetValueOrDefault();
                            context.UserSubscribtions(subscriptionId, memberid, DateTime.Now, 1, member.Designation.Level, member.UserAmount);
                        }
                        member.User.UserId = memberid;
                        if (member.POE.POEId != 0)
                        {
                            switch (member.Designation.Level)
                            {
                                case (int)NetworkUserFilterType.TeamMember:
                                    parentMappingid = InsertPoeMapping(user.UserId, member.POE.POEId, 2, "Manager",
                                                                       sr.Netwrok.Subscriptionid);
                                    childMappingId = InsertPoeMapping(member.User.UserId, member.POE.POEId,
                                                                      member.Designation.Level, member.Designation.Name,
                                                                      sr.Netwrok.Subscriptionid);
                                    break;

                                case (int)NetworkUserFilterType.Manager:
                                    parentMappingid = InsertPoeMapping(member.User.UserId, member.POE.POEId,
                                                                       member.Designation.Level, member.Designation.Name,
                                                                       sr.Netwrok.Subscriptionid);
                                    childMappingId = InsertPoeMapping(user.UserId, member.POE.POEId, 1, "Team Member",
                                                                      sr.Netwrok.Subscriptionid);
                                    break;

                                case (int)NetworkUserFilterType.SkipLevelManager:
                                    parentMappingid = InsertPoeMapping(member.User.UserId, member.POE.POEId,
                                                                       member.Designation.Level, member.Designation.Name,
                                                                       sr.Netwrok.Subscriptionid);
                                    childMappingId = InsertPoeMapping(user.UserId, member.POE.POEId, 1, "Team Member",
                                                                      sr.Netwrok.Subscriptionid);
                                    break;

                                case (int)NetworkUserFilterType.Customer:
                                    parentMappingid = InsertPoeMapping(member.User.UserId, member.POE.POEId,
                                                                       member.Designation.Level, member.Designation.Name,
                                                                       sr.Netwrok.Subscriptionid);
                                    childMappingId = InsertPoeMapping(user.UserId, member.POE.POEId, 1, "Team Member",
                                                                      sr.Netwrok.Subscriptionid);
                                    break;

                                case (int)NetworkUserFilterType.PeerManager:
                                    parentMappingid = InsertPoeMapping(member.User.UserId, member.POE.POEId,
                                                                       (int)NetworkUserFilterType.PeerManager,
                                                                       member.Designation.Name,
                                                                       sr.Netwrok.Subscriptionid);
                                    childMappingId = InsertPoeMapping(user.UserId, member.POE.POEId,
                                                                      (int)NetworkUserFilterType.PeerTeam, "Peer Team Member",
                                                                      sr.Netwrok.Subscriptionid);
                                    peerParentMappingid = InsertPoeMapping(user.UserId, member.POE.POEId,
                                                                           (int)NetworkUserFilterType.PeerManager, "Peer Manager",
                                                                           sr.Netwrok.Subscriptionid);
                                    peerchildMappingId = InsertPoeMapping(member.User.UserId, member.POE.POEId,
                                                                          (int)NetworkUserFilterType.PeerTeam,
                                                                          member.Designation.Name,
                                                                          sr.Netwrok.Subscriptionid);
                                    break;
                            }
                        }
                        if (parentMappingid != 0 && childMappingId != 0)
                        {
                            InsertNetworkUsers(parentMappingid, childMappingId, sr.Netwrok.NetworkName, sr.Netwrok.Subscriptionid);
                        }
                        if (peerParentMappingid != 0 && peerchildMappingId != 0)
                        {
                            InsertNetworkUsers(peerParentMappingid, peerchildMappingId, sr.Netwrok.NetworkName, sr.Netwrok.Subscriptionid);
                        }
                        member.ParentMappingId = parentMappingid;
                        member.ChildMappingId = childMappingId;
                        member.PeerParentMappingId = peerParentMappingid;
                        member.PeerChildMappingId = peerchildMappingId;

                        //insert sales order
                        if (sr.Payment != null)
                        {
                            context.InsertSalesOrderItem(salesOrderId, 2, memberid, member.User.EmailAddress, 5.00m);
                        }
                    }
                }
            }
        }

        //Save the Module
        public void AssignPoe(SignupRequest sr)
        {
            //New user

            var user = sr.User;

            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                if (sr.Members != null)
                {
                    foreach (UserPOEMapping member in sr.Members)
                    {
                        int parentMappingid = 0;
                        int childMappingId = 0;
                        int peerParentMappingid = 0;
                        int peerchildMappingId = 0;
                        //int memberid = 0;
                        //string salttemp = CreateSalt();
                        //string encPasswordtemp = CreatePasswordHash("Pass@123" + salttemp);
                        //var resultmembers = context.RegisterUser(member.User.FirstName + " " + member.User.LastName, "Pass@123", encPasswordtemp, salttemp, member.User.FirstName,
                        //                     member.User.LastName, member.User.EmailAddress, user.CompanyName, Convert.ToInt32(user.Country.Id), null).FirstOrDefault();
                        //if (resultmembers != null)
                        //{
                        //    memberid = resultmembers.UserId.GetValueOrDefault();
                        //}
                        //SendInviteEmail(member.User.FirstName + " " + member.User.LastName, sr.User.FirstName + " " + sr.User.LastName, member.User.EmailAddress, " You have an invite to join " + sr.Netwrok.NetworkName + " network");
                        //member.User.UserId = memberid;
                        switch (member.Designation.Level)
                        {
                            case (int)NetworkUserFilterType.TeamMember:
                                parentMappingid = InsertPoeMapping(user.UserId, member.POE.POEId, 2, " ", sr.Netwrok.Subscriptionid);
                                childMappingId = InsertPoeMapping(member.User.UserId, member.POE.POEId, member.Designation.Level, member.Designation.Name, sr.Netwrok.Subscriptionid);
                                break;

                            case (int)NetworkUserFilterType.Manager:
                                parentMappingid = InsertPoeMapping(member.User.UserId, member.POE.POEId, member.Designation.Level, member.Designation.Name, sr.Netwrok.Subscriptionid);
                                childMappingId = InsertPoeMapping(user.UserId, member.POE.POEId, 1, " ", sr.Netwrok.Subscriptionid);
                                break;

                            case (int)NetworkUserFilterType.SkipLevelManager:
                                parentMappingid = InsertPoeMapping(member.User.UserId, member.POE.POEId, member.Designation.Level, member.Designation.Name, sr.Netwrok.Subscriptionid);
                                childMappingId = InsertPoeMapping(user.UserId, member.POE.POEId, 1, " ", sr.Netwrok.Subscriptionid);
                                break;

                            case (int)NetworkUserFilterType.Customer:
                                parentMappingid = InsertPoeMapping(member.User.UserId, member.POE.POEId, member.Designation.Level, member.Designation.Name, sr.Netwrok.Subscriptionid);
                                childMappingId = InsertPoeMapping(user.UserId, member.POE.POEId, 1, " ", sr.Netwrok.Subscriptionid);
                                break;

                            case (int)NetworkUserFilterType.PeerManager:
                                parentMappingid = InsertPoeMapping(member.User.UserId, member.POE.POEId, (int)NetworkUserFilterType.PeerManager, member.Designation.Name, sr.Netwrok.Subscriptionid);
                                childMappingId = InsertPoeMapping(user.UserId, member.POE.POEId, (int)NetworkUserFilterType.PeerTeam, " ", sr.Netwrok.Subscriptionid);
                                peerParentMappingid = InsertPoeMapping(user.UserId, member.POE.POEId, (int)NetworkUserFilterType.PeerManager, " ", sr.Netwrok.Subscriptionid);
                                peerchildMappingId = InsertPoeMapping(member.User.UserId, member.POE.POEId, (int)NetworkUserFilterType.PeerTeam, member.Designation.Name, sr.Netwrok.Subscriptionid);
                                break;
                        }
                        if (parentMappingid != 0 && childMappingId != 0)
                        {
                            InsertNetworkUsers(parentMappingid, childMappingId, sr.Netwrok.NetworkName, sr.Netwrok.Subscriptionid);
                        }
                        if (peerParentMappingid != 0 && peerchildMappingId != 0)
                        {
                            InsertNetworkUsers(peerParentMappingid, peerchildMappingId, sr.Netwrok.NetworkName, sr.Netwrok.Subscriptionid);
                        }
                        member.ParentMappingId = parentMappingid;
                        member.ChildMappingId = childMappingId;
                        member.PeerParentMappingId = peerParentMappingid;
                        member.PeerChildMappingId = peerchildMappingId;
                    }
                }
            }
        }

        //

        public int InsertPoeMapping(int userId, int poeId, int desigId, string jobTitle, int subscriptionId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                //int? poes = null;
                //poes = Equals(poeId, 0) ? (int?)null : poeId;
                var result = context.InsertPOEMappingData(userId, poeId, desigId, jobTitle, subscriptionId).FirstOrDefault();

                if (result != null)
                    return result.MappingId.GetValueOrDefault();
            }

            return 0;
        }

        public void InsertNetworkUsers(int parentMappingId, int childMappingId, string networkName, int subscriptionId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.InsertNetworkUsers(parentMappingId, childMappingId, networkName, subscriptionId);
            }
        }

        private static string CreateSalt()
        {
            // Generate a cryptographic random number using the Cryptographic service provider
            var rng = new RNGCryptoServiceProvider();
            var buff = new byte[5];
            rng.GetBytes(buff);

            // Return Base64 representation of Random Number
            return Convert.ToBase64String(buff);
        }

        private string CreatePasswordHash(string password)
        {
            byte[] sourceStringToBytes = (new UnicodeEncoding()).GetBytes(password);

            byte[] hashedBytes = new MD5CryptoServiceProvider().ComputeHash(sourceStringToBytes);

            string hashedpassword = BitConverter.ToString(hashedBytes);
            return hashedpassword;
        }

        public void DeleteSubscribedUser(string emailid, int subid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.DeleteSubscribedUsers(emailid, subid);
            }
        }

        public void DeleteSubscribedPoe(int Poeid, int subid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.DeleteSubscribedPoe(Poeid, subid);
            }
        }

        public void UpdateAcessToken(string emailid, string accestoken)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var result = context.UpdateAcessToken(emailid, accestoken);
            }
        }

        public Network GetNetworkById(int networkId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var result = context.GetSubscriptionById(networkId).FirstOrDefault();
                if (result != null)
                    return new Network()
                    {
                        EmailId = result.EmailID,
                        NetworkName = result.NetworkName,
                        Subscriptionid = networkId,
                        CreatedOn = result.CreatedOn,
                        Plan = result.PlanId.GetValueOrDefault(0)
                    };
                else
                    return null;
            }
        }

        public void SendAddPoeNotificationEmail(string name, string to, string poeName)
        {
            string _from = ConfigurationManager.AppSettings["fromEmail"];
            string emailServer = ConfigurationManager.AppSettings["mailServer"];
            string _userId = ConfigurationManager.AppSettings["emailUserId"];
            string _pwd = ConfigurationManager.AppSettings["emailPassword"];
            string _bcc = ConfigurationManager.AppSettings["bccEmail"];
            string _to = ConfigurationManager.AppSettings["mailTo"];

            var emailContenttemp = string.Format(Constant.PoeAdded,
                                              name,
                                               Constant.HomeUrl,
                                               poeName
                                              );
            var emailContent = string.Format(Constant.EmailTemplate, emailContenttemp);

            if (_to.Trim() == string.Empty)
            {
                _to = to;
            }
            string Mailbody = emailContent;
            MailMessage objEmail = new MailMessage(_from, _to, "You are Registered at kessaku.com", Mailbody);

            objEmail.Bcc.Add(_bcc);

            objEmail.IsBodyHtml = true;

            SmtpClient emailClient = new SmtpClient(emailServer);
            System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(_userId, _pwd);

            emailClient.Host = emailServer;
            emailClient.UseDefaultCredentials = false;
            emailClient.Credentials = basicAuthenticationInfo;
            emailClient.Send(objEmail);
        }

        /*
         using (var context = DataContextFactory.GetIntelliSetDataContext())
             {
                 var res=context.Signup(sr.User.FirstName, sr.User.LastName, sr.User.EmailAddress,sr.Netwrok.NetworkName,sr.User.CompanyName,sr.User.Country.Id,sr.Payment.Response,sr.Payment.SubscriptionId,sr.Payment.Amount);
             }
         */

        public void SendWelcomeEmail(string name, string to)
        {
            string _from = ConfigurationManager.AppSettings["fromEmail"];
            string emailServer = ConfigurationManager.AppSettings["mailServer"];
            string _userId = ConfigurationManager.AppSettings["emailUserId"];
            string _pwd = ConfigurationManager.AppSettings["emailPassword"];
            string _bcc = ConfigurationManager.AppSettings["bccEmail"];
            string _to = ConfigurationManager.AppSettings["mailTo"];

            var emailContenttemp = string.Format(Constant.WelcomeMsg,
                                              name,
                                               Constant.HomeUrl
                                              );
            var emailContent = string.Format(Constant.EmailTemplate, emailContenttemp);

            if (_to.Trim() == string.Empty)
            {
                _to = to;
            }
            string Mailbody = emailContent;
            MailMessage objEmail = new MailMessage(_from, _to, "You are Registered at kessaku.com", Mailbody);

            objEmail.Bcc.Add(_bcc);

            objEmail.IsBodyHtml = true;

            SmtpClient emailClient = new SmtpClient(emailServer);
            System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(_userId, _pwd);

            emailClient.Host = emailServer;
            emailClient.UseDefaultCredentials = false;
            emailClient.Credentials = basicAuthenticationInfo;
            emailClient.Send(objEmail);
        }

        public void SendInviteEmail(string fromName, string toName, string from, string to, int subid)
        {
            try
            {
                var checkmailid = CheckEmailIdForMails(to, subid);
                if (!checkmailid)
                {
                    string _from = ConfigurationManager.AppSettings["fromEmail"];
                    string emailServer = ConfigurationManager.AppSettings["mailServer"];
                    string _userId = ConfigurationManager.AppSettings["emailUserId"];
                    string _pwd = ConfigurationManager.AppSettings["emailPassword"];
                    string _bcc = ConfigurationManager.AppSettings["bccEmail"];
                    string _to = ConfigurationManager.AppSettings["mailTo"];

                    string subjectSelf = "New People added to Your kessaku Network";
                    string subjectOther = "Join " + fromName + " (s) Feedback Network at kessaku.com";

                    var emailContenttempSelf = string.Format(Constant.AddMemberSelf,
                                                             fromName,
                                                             Constant.HomeUrl
                        );
                    var emailContentSelf = string.Format(Constant.EmailTemplate, emailContenttempSelf);

                    var emailContenttempOther = string.Format(Constant.AddMemberOther,
                                                              toName,
                                                              fromName + "'s",
                                                              Constant.HomeUrl,
                                                              to
                        );
                    var emailContentOther = string.Format(Constant.EmailTemplate, emailContenttempOther);

                    if (_to.Trim() == string.Empty)
                    {
                        string Mailbody = emailContentSelf;
                        MailMessage objEmail = new MailMessage(_from, from, subjectSelf, Mailbody);

                        objEmail.Bcc.Add(_bcc);

                        objEmail.IsBodyHtml = true;

                        SmtpClient emailClient = new SmtpClient(emailServer);
                        System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(_userId,
                                                                                                                _pwd);

                        emailClient.Host = emailServer;
                        emailClient.UseDefaultCredentials = false;
                        emailClient.Credentials = basicAuthenticationInfo;
                        emailClient.Send(objEmail);

                        string Mailbodyother = emailContentOther;
                        MailMessage objEmailOther = new MailMessage(_from, to, subjectOther, Mailbodyother);
                        objEmailOther.Bcc.Add(_bcc);
                        objEmailOther.IsBodyHtml = true;
                        emailClient.Send(objEmailOther);
                    }
                    else
                    {
                        string Mailbody = emailContentSelf;
                        MailMessage objEmail = new MailMessage(_from, _to, subjectSelf, Mailbody);

                        objEmail.Bcc.Add(_bcc);

                        objEmail.IsBodyHtml = true;

                        SmtpClient emailClient = new SmtpClient(emailServer);
                        System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(_userId,
                                                                                                                _pwd);

                        emailClient.Host = emailServer;
                        emailClient.UseDefaultCredentials = false;
                        emailClient.Credentials = basicAuthenticationInfo;
                        emailClient.Send(objEmail);

                        string Mailbodyother = emailContentOther;
                        MailMessage objEmailOther = new MailMessage(_from, _to, subjectOther, Mailbodyother);
                        objEmailOther.Bcc.Add(_bcc);
                        objEmailOther.IsBodyHtml = true;
                        emailClient.Send(objEmailOther);
                    }
                }
            }
            catch (Exception ex)
            {
            }
        }

        /*
        public void SendInviteEmail(string name, string fromName, string to, string subject, int subid)
        {
            var checkmailid = CheckEmailIdForMails(to, subid);
            if (!checkmailid)
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
                text = "Hello " + name + "<br/><br/>" + subject +
                       ". Please use the below details to access bexcellent site:<br/><br/>";

                credentialText = "<p style='font-family:Calibri'>Link: www.bexcellent.com<br/>User Name: " + to +
                                 "<br/>Password: Pass@123 (This is a default password. If you have a different password, please use the one you have.) </p>";
                if (_to.Trim() == string.Empty)
                {
                    _to = to;
                }
                footerText =
                    "<p style='font-family:Calibri'>For support, contact support@kessaku.com <br/><br/>bexcellent support</p>";

                string Mailbody = "<p style='font-family:Calibri'>" + text + credentialText + footerText + "</p>";
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

        public bool CheckEmailId(string EmailId)
        {
            try
            {
                using (var context = DataContextFactory.GetIntelliSetDataContext())
                {
                    var result = context.SubCheckEmailId(EmailId).FirstOrDefault();
                    if (result != null)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool CheckEmailIdForMails(string emailId, int subid)
        {
            try
            {
                using (var context = DataContextFactory.GetIntelliSetDataContext())
                {
                    var result = context.CheckEmailIdSendMail(emailId, subid).FirstOrDefault();
                    if (result != null)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

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

        public bool CheckNetwork(string networkName)
        {
            try
            {
                using (var context = DataContextFactory.GetIntelliSetDataContext())
                {
                    var result = context.CheckNetwork(networkName).FirstOrDefault();
                    if (result != null)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}