using System;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using bExcellent.Service.DataAccess;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Response;

namespace bExcellent.Service.BusinessLogic.Authentiation
{
    public class AuthentiationBODataAccess
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
        /// Authenticates the user.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <returns></returns>
        public Password AuthenticateUser(string userName)
        {
            Password password = default(Password);
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var result = context.GetUserDetails(userName).FirstOrDefault();
                if (result != null)
                {
                    password = new Password
                    {
                        user = new User()
                        {
                            FirstName = DecryptString(result.FirstName),
                            LastLogin = result.LastLogin,
                            LastName = DecryptString(result.LastName),
                            UserId = result.Id,
                            EmailAddress = DecryptString(result.EmailID),
                            Subscriptionid = result.SubscriptionID,
                            userName = DecryptString(result.FirstName) + " " + DecryptString(result.LastName),
                            StratPageMode = (result.StartPageMode == null ? 0 : (int)result.StartPageMode)
                        },

                        EncryptedPassword = result.Password,
                        Salt = result.Salt,
                        PasswordText = result.InvitationId,
                    };
                }
            }
            return password;
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
        /// Checks the email id.
        /// </summary>
        /// <param name="EmailId">The email id.</param>
        /// <returns></returns>
        public bool CheckEmailId(string EmailId)
        {
            try
            {
                using (var context = DataContextFactory.GetIntelliSetDataContext())
                {
                    var result = context.CheckEmailId(EmailId).FirstOrDefault();
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

        public void UpdateUserLastLogin(int id)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                context.UpdateUserLastLogin(id);
            }
        }

        /// <summary>
        /// Authenticates the user.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <param name="passwordText">The password text.</param>
        /// <returns></returns>
        public AuthenticationResult AuthenticateUser(string userName, string passwordText)
        {
            AuthenticationResult authenticationResult;
            Password password = default(Password);
            try
            {
                //Get the password entity with encrypted password and salt
                password = AuthenticateUser(userName);
                if (password == null)
                {
                    //Set and return the user name invalid error message
                    authenticationResult = new AuthenticationResult
                    {
                        IsAuthenticated = false,
                        Message = "User not exist"
                    };

                    //  Log.LogWarning(string.Format("Invalid user name {0}", userName));
                    return authenticationResult;
                }
            }
            catch (SqlException exp)
            {
                //Set and return the user name invalid error message
                authenticationResult = new AuthenticationResult
                {
                    IsAuthenticated = false,
                    Message = exp.Message
                };

                // Log.LogWarning(string.Format("Invalid user name {0}", userName));
                return authenticationResult;
            }

            //Match the entered password with the stored password
            authenticationResult = MatchPassword(
                                            passwordText,
                                            password.EncryptedPassword,
                                            password.Salt,
                                            password.user

                                           );
            return authenticationResult;
        }

        /// <summary>
        /// Updates the password.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <param name="password">The password.</param>
        /// <returns></returns>
        public bool UpdatePassword(string userName, string password)
        {
            var salt = CreateSalt();
            var encryptedPassword = CreatePasswordHash(password + salt);
            return UpdateUserPassword(userName, encryptedPassword, password, salt);
        }

        /// <summary>
        /// Updates the user password.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <param name="encryptedPassword">The encrypted password.</param>
        /// <param name="plainTextPassword">The plain text password.</param>
        /// <param name="salt">The salt.</param>
        /// <returns></returns>
        public bool UpdateUserPassword(string userName, string encryptedPassword, string plainTextPassword, string salt)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var result = context.UpdatePassword(encryptedPassword, salt, plainTextPassword, userName);
                if (result != 0)
                {
                    return true;
                }
            }
            return true;
        }

        /// <summary>
        /// Creates the password hash.
        /// </summary>
        /// <param name="password">The password.</param>
        /// <param name="salt">The salt.</param>
        /// <returns></returns>
        public string CreatePasswordHash(string password)
        {
            byte[] sourceStringToBytes = (new UnicodeEncoding()).GetBytes(password);

            byte[] hashedBytes = new MD5CryptoServiceProvider().ComputeHash(sourceStringToBytes);

            string hashedpassword = BitConverter.ToString(hashedBytes);
            return hashedpassword;
        }

        /// <summary>
        /// Matches the entered password with the encrypted password.
        /// </summary>
        /// <param name="password">Plain text password.</param>
        /// <param name="encryptedPassword">Encrypted password.</param>
        /// <param name="salt">Salt for encryption.</param>
        /// <returns>AuthenticationResult entity object.</returns>
        public AuthenticationResult MatchPassword(string password, string encryptedPassword, string salt, User user)
        {
            AuthenticationResult authenticationResult = null;
            bool status = false;
            if (encryptedPassword != null && password != null && salt != null)
            {
                status = encryptedPassword.Equals(CreatePasswordHash(password + salt));
            }

            if (status)
            {
                authenticationResult = new AuthenticationResult
                {
                    IsAuthenticated = status,
                    currentUser = user
                };
            }
            else
            {
                authenticationResult = new AuthenticationResult
                {
                    IsAuthenticated = status,
                    Message = "Invalid Password"
                };
            }
            return authenticationResult;
        }

        /// <summary>
        /// Creates the salt.
        /// </summary>
        /// <param name="size">The size.</param>
        /// <returns></returns>
        public static string CreateSalt()
        {
            // Generate a cryptographic random number using the Cryptographic service provider
            var rng = new RNGCryptoServiceProvider();
            var buff = new byte[5];
            rng.GetBytes(buff);

            // Return Base64 representation of Random Number
            return Convert.ToBase64String(buff);
        }
    }
}