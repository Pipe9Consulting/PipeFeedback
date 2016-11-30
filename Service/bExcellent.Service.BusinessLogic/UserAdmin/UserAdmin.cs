using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Enumeration;

namespace bExcellent.Service.BusinessLogic.UserAdmin
{
    public class UserAdmin
    {
        #region Private Memeber

        /// <summary>
        /// Gets the data access.
        /// </summary>
        private UserAdminDataAccess DataAccess
        {
            get
            {
                return new UserAdminDataAccess();
            }
        }

        #endregion Private Memeber

        /// <summary>
        /// Gets the users by feedback status.
        /// </summary>
        /// <param name="feedbackStatus">The feedback status.</param>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        /* public IList<UserPOEMapping> GetUsersByFeedbackStatus(FeedbackStatus feedbackStatus, int userId, int poeId, int subscriptionid)
         {
             FeedbackBL.FeedbackBL feedback = new FeedbackBL.FeedbackBL();

             var users = feedback.GetUserFeedbacks(userId, subscriptionid);
             if (poeId != 0)
             {
                 return users.Where(a => a.FeedbackDetails.FeedbackStatus == feedbackStatus && a.POE.POEId == poeId).ToList();
             }
             return users.Where(a => a.FeedbackDetails.FeedbackStatus == feedbackStatus).ToList();
         }*/

        /// <summary>
        /// Gets the received feedback.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        /*   public int GetReceivedFeedback(int userId, int poeId, int subscriptionid)
           {
               FeedbackBL.FeedbackBL feedback = new FeedbackBL.FeedbackBL();
               var feedbacks = DataAccess.GetReceivedFeedback(userId, subscriptionid);
               return feedbacks.Count(a => a.POEId == poeId);
           }*/

        /// <summary>
        /// Gets the given feed back count.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        /*   public int GetGivenFeedBackCount(int userId, int poeId, int subscriptionid)
           {
               return GetUsersByFeedbackStatus(FeedbackStatus.Complete, userId, poeId, subscriptionid).Count;
           }*/

        /// <summary>
        /// Updates the user photo.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="photo">The photo.</param>
        public void UpdateUserPhoto(int userId, byte[] photo)
        {
            DataAccess.UpdateUserPhoto(userId, photo);
        }

        /// <summary>
        /// Gets the user photo.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <returns></returns>
        public User GetUserPhoto(int userId)
        {
            return DataAccess.GetUserPhoto(userId);
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
            DataAccess.UpdateUserDetails(firstName, lastName, companyName, jobTitle, countryId, userId, areaId);
        }

        /// <summary>
        /// Gets the password.
        /// </summary>
        /// <param name="emailAddress">The email address.</param>
        /// <returns></returns>
        public string GetPassword(string emailAddress)
        {
            return DataAccess.GetPassword(emailAddress);
        }
    }
}