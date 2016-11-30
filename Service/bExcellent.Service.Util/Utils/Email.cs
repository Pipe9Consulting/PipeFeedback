using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;

namespace bExcellent.Service.Util.Utils
{
    public class Email
    {
        //  private string _mailto = "wg@cloudtorre.com";

        //Live
        private string _mailto;//= "";

        private string _mailfrom;// = ConfigurationManager.AppSettings["fromEmail"];
        private string _mailbody;
        private string _mailsubject;
        private string _Error;
        private string _cc;
        private string emailServer = ConfigurationManager.AppSettings["mailServer"];
        private string _userId = ConfigurationManager.AppSettings["emailUserId"];
        private string _pwd = ConfigurationManager.AppSettings["emailPassword"];
        private string BccMailID = ConfigurationManager.AppSettings["bccEmail"];

        /* Live   public string Mailto
           {
               get { return (string.IsNullOrEmpty(ConfigurationManager.AppSettings["mailTo"]) ? _mailto : ConfigurationManager.AppSettings["mailTo"]); }
               set { _mailto = value; }
           }
           */

        public string Mailto
        {
            get { return (string.IsNullOrEmpty(ConfigurationManager.AppSettings["mailTo"]) ? _mailto : ConfigurationManager.AppSettings["mailTo"]); }
            set { _mailto = value; }
        }

        public string Mailfrom
        {
            get { return _mailfrom; }
            set { _mailfrom = value; }
        }

        public string Mailbody
        {
            get { return _mailbody; }
            set { _mailbody = value; }
        }

        public string Mailsubject
        {
            get { return _mailsubject; }
            set { _mailsubject = value; }
        }

        public string Cc
        {
            get { return _cc; }
            set { _cc = value; }
        }

        public string Error
        {
            get { return _Error; }
            set { _Error = value; }
        }

        public bool SendMail()
        {
            try
            {
                ////changed by harish on 10/12/2010 overrides all the subject coming in, changes made on request by client task id 70

                //this.Mailsubject = "Poe Partner Lead Assessment";

                this.Mailbody = "<p style='font-family:Calibri'>" + this.Mailbody + "</p>";
                MailMessage objEmail = new MailMessage(this.Mailfrom, this.Mailto, Mailsubject, this.Mailbody);

                objEmail.IsBodyHtml = true;

                SmtpClient emailClient = new SmtpClient(emailServer);
                System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(_userId, _pwd);

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

                //return "Registration SuccessFull Please Check your Mail";
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool SendMail_ProfileUpdate()
        {
            try
            {
                this.Mailsubject = "Poe.. ";

                MailMessage objEmail = new MailMessage(this.Mailfrom, this.Mailto, Mailsubject, this.Mailbody);

                objEmail.IsBodyHtml = true;
                if (BccMailID != string.Empty)
                {
                    string[] BCCMailID = BccMailID.Split(';');
                    objEmail.Bcc.Add(new MailAddress(BCCMailID[0].ToString()));
                    objEmail.Bcc.Add(new MailAddress(BCCMailID[1].ToString()));
                }
                SmtpClient emailClient = new SmtpClient(emailServer);
                System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(_userId, _pwd);

                emailClient.Host = emailServer;
                emailClient.UseDefaultCredentials = false;
                emailClient.Credentials = basicAuthenticationInfo;
                emailClient.Send(objEmail);

                //return "Registration SuccessFull Please Check your Mail";
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool SendMail_withImage(int DesigID)
        {
            try
            {
                // string imgPath2 = System.Web.HttpContext.Current.Server.MapPath("~/Template/images/signature.jpg");

                this.Mailsubject = "Poe";
                MailMessage objEmail = new MailMessage(this.Mailfrom, this.Mailto, Mailsubject, this.Mailbody);

                AlternateView htmlView = AlternateView.CreateAlternateViewFromString(this.Mailbody, null, MediaTypeNames.Text.Html);

                objEmail.IsBodyHtml = true;
                if (BccMailID != string.Empty)
                {
                    string[] BCCMailID = BccMailID.Split(';');
                    objEmail.Bcc.Add(new MailAddress(BCCMailID[0].ToString()));
                    objEmail.Bcc.Add(new MailAddress(BCCMailID[1].ToString()));
                }

                //objEmail.Bcc.Add(new MailAddress("v-aland@synechron.com"));

                //Dynamics Lead...........................................................................................................
                if (DesigID == 1)
                {
                    Mailbody += @"<br><img src=""cid:YourPictureId""></img><br/>" +
                    "<b>Gabriel Indalecio|</b> MBS WW Field Operations Lead<b>|+1 425-706-6919 x66916|</b> <a href='mailto: gabrieli@microsoft.com' alt=''> gabrieli@microsoft.com</a>";
                    AlternateView altView = AlternateView.CreateAlternateViewFromString(Mailbody, null, MediaTypeNames.Text.Html);

                    //     LinkedResource yourPictureRes = new LinkedResource(imgPath2, MediaTypeNames.Image.Jpeg);
                    //    yourPictureRes.ContentId = "YourPictureId"; altView.LinkedResources.Add(yourPictureRes);

                    objEmail.AlternateViews.Add(altView);
                }

                try
                {
                    //For Server
                    SmtpClient emailClient = new SmtpClient(emailServer);
                    System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(_userId, _pwd);
                    emailClient.Host = emailServer;

                    //emailClient.Port = 2525;
                    emailClient.UseDefaultCredentials = false;
                    emailClient.Credentials = basicAuthenticationInfo;
                    emailClient.Send(objEmail);

                    //For Local
                    // SmtpClient emailClient = new SmtpClient("pioneer");
                    // System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(_userId, _pwd);
                    // basicAuthenticationInfo.UserName = "abhijit.n@brickworkindia.local";
                    // basicAuthenticationInfo.Password = "abhi18";
                    // emailClient.Host = "pioneer";
                    // emailClient.UseDefaultCredentials = false;
                    // emailClient.Credentials = basicAuthenticationInfo;
                    // emailClient.Send(objEmail);

                    return true;
                }
                catch
                {
                    return false;
                }
            }

            catch (Exception ex)
            {
                return false;
            }
        }
    }
}