﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace bExcellent.Service.BusinessLogic.Common
{
    internal class Constant
    {
        public const string PasswordReset = "<p style='font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #353535;'>Hello {0},</p><p style='font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #353535;'>Your password is {1}. Please click <a href='{2}' target='_blank' style='color:#353535'>here</a> here to start the assessment.</p>";
        public static string HomeUrl = ConfigurationManager.AppSettings["homeUrl"];
        public const string EmailTemplate = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'> <html> <head> <title></title> </head> <body> <table width='100%' border='0' cellspacing='0' cellpadding='5'> <tr> <td bgcolor='#5e5e5e'> <table width='95%' border='0' align='center' cellpadding='0' cellspacing='0'> <tr> <td><a href='http://www.pipe9consulting.com' target='_blank'> <img src='https://www.pipe9coach.com/Images/pipe9coach-email-logo.png' alt='pipe9Consulting' border='0' style='outline: 0' /></a></td> </tr> </table> </td> </tr> <tr> <td bgcolor='#e5e5e5' style='font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #353535;'> <table width='95%' border='0' align='center' cellpadding='0' cellspacing='0'> <tr> <td style='font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #353535;'>&nbsp;</td> </tr> <tr> <td style='font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #353535;'>{0}<p> For support, contact <a href='mailto:support@pipe9consulting.com' style='color: #353535'>support@pipe9consulting.com</a> </p> <p> The Pipe9consulting team<br /> </p> </td> </tr> <tr> <td style='font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #353535;'>&nbsp;</td> </tr> </table> </td> </tr> <tr> <td style='background: #5e5e5e'> <table width='95%' border='0' align='center' cellpadding='0' cellspacing='0'> <tr> <td width='52%'> <div style='font-family: Arial; color: #fff; font-size: 12px;'> Copyright 2016, Pipe9consulting. All Rights Reserved </div> </td> <td width='48%'> <table width='1%' border='0' align='right' cellpadding='3' cellspacing='0'> <tr> <td width='1'><a href='http://twitter.com/dowzall' target='_blank'> <img src='https://www.pipe9coach.com/Images/twitter.png' alt='Twitter' border='0' style='outline: 0; width: 25px; height: 25px;' /></a></td> <td width='1'><a href='http://www.linkedin.com/pub/alan-dowzall/1a/777/a62' target='_blank'> <img src='https://www.pipe9coach.com/Images/linkedin.png' alt='Twitter' border='0' style='outline: 0; width: 25px; height: 25px' /></a></td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </body> </html>";
        public const string EmailTemplateNew = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'> <html> <head> <title></title> </head> <body> <table width='600' border='0' cellspacing='0' cellpadding='5' style='margin:0 auto;'> <tr> <td bgcolor='#fff' style='border-bottom:1px solid #23a1a7'> <table width='600' border='0' align='center' cellpadding='0' cellspacing='0'> <tr> <td> <a href='http://www.pipe9consulting.com' target='_blank'> <img src='https://www.pipe9coach.com/Images/P9_logo.png' alt='pipe9Consulting' border='0' style='outline: 0' /> </a> </td> </tr> </table> </td> </tr> <tr> <td bgcolor='#fff' style='font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #000;'> <table width='95%' border='0' align='center' cellpadding='0' cellspacing='0'> <tr><td style='font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #fff;'>&nbsp;</td></tr> <tr> <td style='font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #000;'> {0} <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> Regards, </p> <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> The Pipe9 Team </p> </td> </tr> <tr><td style='font-family:Arial, Helvetica, sans-serif; font-size: 14px; color: #fff;'>&nbsp;</td> </tr> <tr> <td style='font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #000;'> <p style='font-family:Arial, Helvetica, sans-serif; font-size:10px;'> This e-mail was sent to <span>{1}</span> and contains information directly related to your Pipe9 Feedback account. This is a one-time email. You received this email because of your participation on the Pipe9 Feedback tool. Please do not reply to this email. If you want to contact us, please contact  <a href='mailto:support@pipe9consulting.com' style='color: #0026ff'>support@pipe9consulting.com</a>. </p> </td> </tr> </table> </td> </tr> <tr> <td style='background: #fff; border-top:1px solid #23a1a7;'> <table width='100%' border='0' align='center' cellpadding='0' cellspacing='0'> <tr> <td width='52%'> <div style='font-family: Arial, Helvetica, sans-serif; color: #000; font-size: 11px;'> &copy; 2017, Pipe9consulting. All Rights Reserved </div> </td> <td width='48%'> <table width='1%' border='0' align='right' cellpadding='0' cellspacing='0'> <tr> <td width='1'><a href='http://twitter.com/dowzall' target='_blank'> <img src='https://www.pipe9coach.com/Images/twitter.png' alt='Twitter' border='0' style='outline: 0; width: 25px; height: 25px;' /></a></td> <td width='1'><a href='http://www.linkedin.com/pub/alan-dowzall/1a/777/a62' target='_blank'> <img src='https://www.pipe9coach.com/Images/linkedin.png' alt='LinkedIn' border='0' style='outline: 0; width: 25px; height: 25px' /></a></td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </body> </html>";
        public const string WelcomeMsg = "<P>Hello {0},</P><P>Thank you for registering with Pipe9consulting.com. Pipe9consulting is Social Performance Management for you, your team or your entire company. Pipe9consulting.com is the home of Role Excellence Profiles (REPs) that align people and let everyone take control of their own Performance. Click <a href='{1}' target='_blank' style='color:#353535'>here</a> to login and start to use Pipe9consulting.com.</P>";
        public const string SendAppreciation = "<P>Hello {0},</P><P>Congratulations you have received Appreciation/a Medal/a Badge from&nbsp;{1}. Please click <a href='{2}' target='_blank' style='color:#353535'>here</a> to view your Appreciation/Medal/Badge.</P>";
        public const string SendAppreciationWithAttachment = "<P>Hello {0},</P><P>Congratulations you have received Appreciation/a Medal/a Badge from&nbsp;{1}. Please click <a href='{2}' target='_blank' style='color:#353535'>here</a> to view your Appreciation/Medal/Badge.</P>";
        public const string PostVideo = "<P>Hello {0},</P><P>Congratulations you have received a new Video message from {1}. Please click <a href='{2}' target='_blank' style='color:#353535'>here</a> to view your Video Message.</P>";
        public const string ReplyMessage = "<P>Hello {0},</P><P>You have received a new message from {1}. Please click <a href='{2}' target='_blank' style='color:#353535'>here</a> and login to view your new message.</P>";
        public const string AddMemberSelf = "<P>Hello {0}</P><P>Congratulations you have added new people to your Pipe9consulting feedback network. <BR>Please click <a href='{1}' target='_blank' style='color:#353535'>here</a> and login to view more details.</P>";

        public const string AddMemberOther =
            "<P>Hello {0},</P><P>Congratulations! You have received an invitation to become a member of {1} Feedback Network.</P>Please click <A style='COLOR: #353535' href='{2}' target=_blank>HERE</A> to go to the Pipe9consulting login page.<BR><BR><STRONG>If you are a new user please enter the following login credentials:</STRONG><BR><BR> Email: <STRONG>{3}</STRONG><BR>Password: <STRONG>Pass@123</STRONG><BR><BR> <STRONG>If you are an existing user, please login using your existing Pipe9consulting login credentials.</STRONG>";

        public const string PoeAdded = "<P>Hello {0},</P><P>You have added a new Role Excellence Profile (REP) to your library. Please click <a href='{1}' target='_blank' style='color:#353535'>here</a> and login to acces your new REP ({2}). </P>";
        public const string SendRequest = "<P>Hello {0},</P><P>{1} has requested your help with their Professional Development. Based on your knowledge of the work they do they have requested for you to give them relevant, meaningful and honest feedback. The feedback is based on the Role Excellence Profile (REP) that has been defined for the role they perform. The feedback is used for the purpose of providing knowledge that will help them with their development and is not meant to be used for the purpose of performance evaluation. Please click <a href='{2}' target='_blank' style='color:#353535'>here</a> to access the REP tool to start the feedback process.<BR></P>";
        public const string SendRequestCustomer = "<P>Hello {0},</P><P>{1} has requested your help with their Professional Development. Based on your knowledge of them they have requested for you to give relevant, meaningful and honest feedback. The feedback is based on the Role Excellence Profile (REP) that has been defined for the role they perform. The feedback is used for the purpose of providing insights that will help them with their Professional development and is not meant to be used for the purpose of performance evaluation. Please click <a href='{2}' target='_blank' style='color:#353535'>here</a> to access the REP tool to start the feedback process.</P><P>Link:<STRONG> <A style='COLOR: #353535' href='{2}' target=_blank>www.Pipe9consulting.com</A></STRONG><BR>User Name:<STRONG> {3}<BR></STRONG>Password: <STRONG>Pass@123</STRONG> (This is a default password. If you have a different password, please use the one you have) </P>";
        public const string SendInvite = "<P>Hello {0},</P><P>{1} has sent a request for you to complete feedback at Pipe9consulting.Com. Please click <a href='{2}' target='_blank' style='color:#353535'>here</a> and login to start the feedback process.</P>";
        public const string DeleteMember = "<P>Hello {0},</P><P>You have been removed from {1} (s) {2} Role Excellence Profile (REP) feedback network at Pipe9consulting.com. However, you can continue to use Pipe9consulting.com if you are a member of other feedback network/s or build your own feedback network. You can start the sign-up process <a href='{3}' target='_blank' style='color:#353535'>here</a>.</P>";
        public const string FeedbackReceived = "<P>Hello {0},</P><P>You have received feedback from {1} for the {2} Role Excellence Profile. You can view the feedback results <a href='{3}' target='_blank' style='color:#353535'>here</a>.</P>";
        public const string SelfFeedbackCompleted = "<P>Hello {0}</P><P>{1}&nbsp; completed feedback on the Role Excellence Profile (REP) for {2}.</P><P>Date Completed:{3}<BR>You can view their feedback results <a href='{4}' target='_blank' style='color:#353535'>here</a>.</P>";
        public const string ConnectMessage = "<P>Hello {0} </P><P>You have received a request from {1} to connect with you regarding the {2} Role Excellence Profile (REP):<BR>You can view their connection request <a href='{3}' target='_blank' style='color:#353535'>here</a>.</P>";
        public const string GoalMessage = "<P>Hello {0}, </P><P>You have been assigned a shared Role Excellence Profile (REP) Goal from {1}:</P><P>{2}</P><P>You can view the Shared Goal <a href='{3}' target='_blank' style='color:#353535'>here</a></P><P>&nbsp;</P>";
        public const string PlanExpired = "<P>Hello {0}, </P><P>Your Pipe9consulting Trial Account will expire in {1}:</P><P>Name of Network:{2}<BR>Date Trial Started :{3}<BR>Date Trial Expires :{4}</P><P>You can continue using Pipe9consulting <a href='{5}' target='_blank' style='color:#353535'>here</a></P>";
        public const string ShareResource = "<P>Hi {0},</P><P>{1} has shared <a href='{2}' target='_blank' style='color:#353535'>{3}</a> resource material with you. Please click on the hyperlink to access the resource.  </P>";
        public const string SelfFeedbackCompletedNew = "<p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> Hello <span>{0},</span> </p> <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> You recently completed Self-Feedback for the MSA Marketing Capability Study. </p> <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> On {1}, you submitted Self-Feedback for the {2} role. Thank you for your participation. No further action is required from you at this time. </p>";
        public const string ManagerFeedbackCompleted = "<p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> Hello <span>{0},</span> </p> <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> You recently completed Team-Feedback for the MSA Marketing Capability Study. </p> <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> On {1}, you submitted Team-Feedback for your team members in the {2} role. Thank you for your participation. No further action is required from you at this time. </p>";
        public const string ForgetPassword = " <p style='font-family:'Arial, Helvetica, sans-serif'; font-size:14px;'> Hello <span>{0},</span> </p> <p style='font-family:'Arial, Helvetica, sans-serif'; font-size:14px;'> You recently requested a Pipe9 Feedback password reminder for the email address {1}. </p> <p style='font-family:'Arial, Helvetica, sans-serif'; font-size:14px;'> You password is <b style='color:#eb4830'>{2}</b> </p> <p style='font-family:'Arial, Helvetica, sans-serif'; font-size:14px;'> If you did not request a password reminder, don’t worry. Your account is safe. Password reminder requested through the Pipe9 Feedback tool are sent only to the contact email on the account. If you're worried that someone is trying to gain unauthorized access to your account, go ahead and reset your password from the tool menu, or contact us at <a href='mailto:support@pipe9consulting.com' style='color: #0026ff'>support@pipe9consulting.com</a> for assistance. </p> <p style='font-family:'Arial, Helvetica, sans-serif'; font-size:14px;'> Thank you for your participation. </p>";
        public const string ReportanIssue = " <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> Hello <span>{0},</span> </p> <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> You recently reported a Pipe9 Feedback issue. </p> <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> Subject: {1} </p> <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> We will address this issue right away and resolve it as quickly as possible. If this issue is preventing you from using the Pipe9 Feedback tool effectively or if it requires further assistance, we will contact you shortly. </p> <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> Please contact us at <a href='mailto:support@pipe9consulting.com' style='color: #0026ff'>support@pipe9consulting.com</a> if you have any questions or experience any other issues. </p> <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> Thank you for your participation. </p>";
        public const string CoachingDate = " <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> Hello <span>{0},</span> </p> <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> You recently set a coaching date on the Pipe9 Feedback tool. </p> <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> You’ve set an upcoming coaching date for {1}. One week prior to this date, Pipe9 will send you an automated email to remind you to provide updated Team-Feedback to the members of your team. This will enable you to track the progress each of your team members has made since that last time you provided Team-Feedback. </p> <p style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'> If you have any questions, please contact <a href='mailto:support@pipe9consulting.com' style='color: #0026ff'>support@pipe9consulting.com</a>. </p>";
    }
}