using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Linq;
using System.Linq;
using System.Net.Mail;
using System.Text;
using bExcellent.Service.BusinessLogic.Authentiation;
using bExcellent.Service.BusinessLogic.Common;
using bExcellent.Service.DataAccess;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Enumeration;
using bExcellent.Service.Util.Utils;

namespace bExcellent.Service.BusinessLogic.UserAdmin
{
    public class UserAdminDataAccess
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
        /// Gets the user feedbacks.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        /*     internal IList<UserPOEMapping> GetUserFeedbacks(int userId, int subscriptionid)
             {
                 using (var context = DataContextFactory.GetIntelliSetDataContext())
                 {
                     var results = context.GetUserFeedbacks(userId, subscriptionid);
                     return results.SelectMany((a, b) => new List<UserPOEMapping>{
                          new UserPOEMapping{
                              UserPOEMappingId = a.MappingId.GetValueOrDefault(),
                              AreaId = a.ZoneId.GetValueOrDefault(),

                              //Designation = a.DesignationId.GetValueOrDefault(),
                              User = new User{
                                  UserId = userId,
                                  FirstName = a.FirstName,
                                  LastName = a.LastName,
                                  EmailAddress = a.EmailID,
                                  Photo = a.Photo,

                                  Country = new Country{
                                      Id = a.CountryId,
                                          Name = Helper.GetCountryName(a.CountryId)
                                  },
                                  Area=  new Zone{
                                      Id = a.ZoneId.GetValueOrDefault(),
                                      Name = Helper.GetAreaById(a.ZoneId.GetValueOrDefault())
                                  }
                              },
                              POE = new Util.Domain.POE() {
                                  POEId = a.POEId,
                                  Name = a.POEName,
                              },
                             Designation = new Designation{
                                     DesignationId = a.DesignationId.GetValueOrDefault(),
                                     Name = a.DesignationName,
                                     Level = a.LevelId.GetValueOrDefault()
                             },
                             FeedbackDetails = new  Feedback{
                                         FeedbackId = a.FeedbackId.GetValueOrDefault(),
                                         RequestedBy = GetUserDetailsByMappingId(a.RequestedBy.GetValueOrDefault()),
                                         RequestedFor = GetUserDetailsByMappingId(a.RequestedFor.GetValueOrDefault()),
                                         RequestedFrom = GetUserDetailsByMappingId(a.RequestedFrom.GetValueOrDefault()),
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
        /// Gets the received feedback.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        /*    internal List<GetReceivedFeedbacksResult> GetReceivedFeedback(int userId, int subscriptionid)
            {
                using (var context = DataContextFactory.GetIntelliSetDataContext())
                {
                    return context.GetReceivedFeedbacks(userId, subscriptionid).ToList();
                }
            }*/

        /// <summary>
        /// Gets the user details by mapping id.
        /// </summary>
        /// <param name="userMappingId">The user mapping id.</param>
        /// <returns></returns>
        internal UserPOEMapping GetUserDetailsByMappingId(int userMappingId)
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
                            FirstName = result.FirstName,
                            LastName = result.LastName,
                            EmailAddress = result.EmailID,
                            Subscriptionid = result.SubscriptionID,
                            Country = new Country
                            {
                                Id = result.CountryId,
                                Name = Helper.GetCountryName(result.CountryId)
                            },
                            Area = new Zone
                            {
                                Id = result.ZoneId.GetValueOrDefault(),
                                Name = Helper.GetAreaById(result.ZoneId.GetValueOrDefault())
                            }
                        },
                        AreaId = result.ZoneId.GetValueOrDefault(),
                        POE = new Util.Domain.POE()
                        {
                            POEId = result.RoleId,
                            Name = result.RoleTitle
                        },

                        //Role = new Role
                        //{
                        //    RoleId = result.RoleId,
                        //    Title = result.RoleTitle,
                        Designation = new Designation
                        {
                            DesignationId = result.DesignationId,
                            Level = result.LevelId,
                            Name = result.DesignationName,
                        },

                        JobTitle = result.JobTitle

                        //}
                    };
                }
                return userDetails;
            }
        }

        /// <summary>
        /// Gets the countries.
        /// </summary>
        /// <returns></returns>
        internal List<Country> GetCountries()
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetAllCountries();
                return results.SelectMany((a, b) => new List<Country>
                                                        {
                                                            new Country
                                                                {
                                                                    Id = a.Id,
                                                                    Code = a.Code,
                                                                    Name = a.Name
                                                                }
                                                        }).ToList();
            }
        }

        /// <summary>
        /// Gets the zones.
        /// </summary>
        /// <returns></returns>
        internal List<Zone> GetZones()
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var results = context.GetAllZones();
                return results.SelectMany((a, b) => new List<Zone>
                                                        {
                                                            new Zone()
                                                                {
                                                                    Id = a.Id,
                                                                    //CountryId = a.CountryId,
                                                                    Name = a.Name
                                                                }
                                                        }).ToList();
            }
        }

        /// <summary>
        /// GetMappingIdByEmailForReport
        /// </summary>
        /// <param name="EmailId"></param>
        /// <param name="POEId"></param>
        /// <returns></returns>
        public int GetMappingIdByEmailForReport(string EmailId, int POEId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetMappingIdByEmail(EmailId, POEId).Select(a => a.Id).FirstOrDefault();
            }
        }

        /// <summary>
        /// Updates the user photo.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="photo">The photo.</param>
        public void UpdateUserPhoto(int userId, byte[] photo)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.UpdateUserPhoto(userId, photo);
            }
        }

        /// <summary>
        /// Gets the user photo.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <returns></returns>
        public User GetUserPhoto(int userId)
        {
            Binary returnvalue = new Binary(new byte[] { 0 });
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var PhotoResult = context.GetUserPhoto(userId).FirstOrDefault();
                if (PhotoResult.Picture != null)
                {
                    returnvalue = PhotoResult.Picture;
                }

                return new User() { Photo = returnvalue.ToArray() };
            }
        }

        /// <summary>
        /// Updates the user details.
        /// </summary>
        /// <param name="firstName">The first name.</param>
        /// <param name="lastName">The last name.</param>
        /// <param name="countryId">The country id.</param>
        /// <param name="userId">The user id.</param>
        public void UpdateUserDetails(string firstName, string lastName, string companyName, string jobTitle, int countryId, int userId, int areaId)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.Updateuserdetails(firstName, lastName, companyName, jobTitle, countryId, userId, areaId);
            }
        }

        /// <summary>
        /// Gets the password.
        /// </summary>
        /// <param name="emailAddress">The email address.</param>
        /// <returns></returns>
        public string GetPassword(string emailAddress)
        {
            var authentication = new AuthentiationBO();
            var password = authentication.GetPassword(emailAddress);
            if (password == null || string.IsNullOrEmpty(password.PasswordText))
            {
                return "Invalid email address.";
            }
            else
            {
                Email email = new Email();
                var emailContenttemp = string.Format(Constant.ForgetPassword,
                                                    password.user.FirstName,
                                                    emailAddress,
                                                    password.PasswordText
                                                   );
                var emailContent = string.Format(Constant.EmailTemplateNew, emailContenttemp, emailAddress);
                email.Mailfrom = ConfigurationManager.AppSettings["fromEmail"];
                email.Mailsubject = "Password";
                //email.Mailto = emailAddress;
                //email.Mailbody = emailContent;
                //email.SendMail();
                TempMailForgetPasswordUpdated(ConfigurationManager.AppSettings["fromEmail"], emailAddress, ConfigurationManager.AppSettings["fromEmail"],
                                       emailContent);
                return "Your password has been sent to your registered email address. Please check your inbox. If you do not find an email in your inbox, please check your junk/spam folders. Thank you!";
            }
        }

        private string emailServer = ConfigurationManager.AppSettings["mailServer"];
        private string _userId = ConfigurationManager.AppSettings["emailUserId"];
        private string _pwd = ConfigurationManager.AppSettings["emailPassword"];
        private string BccMailID = ConfigurationManager.AppSettings["bccEmail"];

        private void TempMailForgetPassword(string mailfrom, string mailto, string subject, string mailbody)
        {
            mailbody = "<p style='font-family:Calibri'>" + mailbody + "</p>";
            var objEmail = new MailMessage(mailfrom, mailto, subject, mailbody) { IsBodyHtml = true };

            var emailClient = new SmtpClient(emailServer);
            var basicAuthenticationInfo = new System.Net.NetworkCredential(_userId, _pwd);

            if (BccMailID != string.Empty)
            {
                string[] BCCMailID = BccMailID.Split(';');
                objEmail.Bcc.Add(new MailAddress(BCCMailID[0].ToString()));

                //objEmail.Bcc.Add(new MailAddress(BCCMailID[1].ToString()));
            }

            emailClient.Host = emailServer;
            emailClient.UseDefaultCredentials = false;
            emailClient.Credentials = basicAuthenticationInfo;
            emailClient.Send(objEmail);
        }
        private void TempMailForgetPasswordUpdated(string mailfrom, string mailto, string subject, string mailbody)
        {
           
           // var objEmail = new MailMessage(mailfrom, mailto, subject, mailbody) { IsBodyHtml = true };
            string _to = ConfigurationManager.AppSettings["mailTo1"];

            if (_to.Trim() == string.Empty)
            {
                _to = mailto;
            }
            //mailto = "pr@pipe9consulting.com";
            MailMessage mail = new MailMessage();
           // mail.To.Add(_to);
            
            var content = "";
            MailMessage objEmail = new MailMessage(mailfrom, _to, subject, mailbody);
            if (BccMailID != string.Empty)
            {
                string[] BCCMailID = BccMailID.Split(';');
             //   mail.Bcc.Add(new MailAddress(BCCMailID[0].ToString()));
                objEmail.Bcc.Add(BCCMailID[0]);
                //objEmail.Bcc.Add(new MailAddress(BCCMailID[1].ToString()));
            }
           

            objEmail.IsBodyHtml = true;

            SmtpClient emailClient = new SmtpClient(emailServer);
            System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(_userId, _pwd);

            emailClient.Host = emailServer;
            emailClient.UseDefaultCredentials = false;
            emailClient.Credentials = basicAuthenticationInfo;
            emailClient.Send(objEmail);
           //// mail.Bcc.Add(_bcc);
           //// mail.CC.Add("Pascal.Walschots@microsoft.com");
           // mail.From = new MailAddress(mailfrom);
           // mail.Subject = subject;//; txtSubject.Text;
           // string Body = mailbody;//ReadFile().Replace("{0}", toemail).Replace("{1}", password);
           // mail.Body = Body;
           // mail.IsBodyHtml = true;
           // SmtpClient smtp = new SmtpClient();
           // smtp.Host = "smtp.gmail.com";
           // smtp.Port = 587;
           // smtp.UseDefaultCredentials = false;
           // smtp.Credentials = new System.Net.NetworkCredential
           // ("tillidtest@gmail.com", "timepass@123");// Enter seders User name and password
           // smtp.EnableSsl = true;
           // smtp.Send(mail);
        }
    }
}