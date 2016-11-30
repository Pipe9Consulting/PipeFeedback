using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web.Security;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Request;
using bExcellent.Service.Util.Response;

namespace bExcellent.Service.BusinessLogic.Authentiation
{
    public class AuthentiationBO
    {
        #region Private Memeber

        /// <summary>
        /// Gets the data access.
        /// </summary>
        private AuthentiationBODataAccess DataAccess
        {
            get
            {
                return new AuthentiationBODataAccess();
            }
        }

        #endregion Private Memeber

        /// <summary>
        /// Authenticates the user.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        public AuthenticationResult AuthenticateUser(AuthenticationRequest request)
        {
            string userName = request.UserName.Trim();

            //Authenticate username and password
            return DataAccess.AuthenticateUser(userName, request.Password);
        }

        /// <summary>
        /// Authenticates the user.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <param name="passwordText">The password text.</param>
        /// <returns></returns>
        public AuthenticationResult AuthenticateUser(string userName, string passwordText)
        {
            return DataAccess.AuthenticateUser(userName, passwordText);
        }

        /// <summary>
        /// Checks the email id.
        /// </summary>
        /// <param name="EmailId">The email id.</param>
        /// <returns></returns>
        public bool CheckEmailId(string EmailId)
        {
            return DataAccess.CheckEmailId(EmailId);
        }

        /// <summary>
        /// Updates the password.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <param name="password">The password.</param>
        /// <returns></returns>
        public bool UpdatePassword(string userName, string password)
        {
            return DataAccess.UpdatePassword(userName, password);
        }

        /// <summary>
        /// Gets the password.
        /// </summary>
        /// <param name="emailAddress">The email address.</param>
        /// <returns></returns>
        public Password GetPassword(string emailAddress)
        {
            string userName = emailAddress.Trim();

            //Authenticate username and password
            return DataAccess.AuthenticateUser(userName);
        }

        /// <summary>
        /// Authenticates the user.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <param name="passwordText">The password text.</param>
        /// <returns></returns>
        public Password AuthenticateUser(string userName)
        {
            return DataAccess.AuthenticateUser(userName);
        }

        public void UpdateUserLastLogin(int id)
        {
            DataAccess.UpdateUserLastLogin(id);
        }
    }
}