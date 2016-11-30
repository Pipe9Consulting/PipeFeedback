using System;
using System.Collections.Generic;
using System.Net;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using bExcellent.Service.BusinessLogic.SignUp;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Request;

namespace bExcellent.Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Signup" in code, svc and config file together.
    [ServiceContract(Name = "Signup")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class Signup
    {
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public bool SignUp(SignupRequest sr)
        {
            try
            {
                SignUp signup = new SignUp();
                signup.SignUpReqest(sr);
                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public bool UpdateUserPhoto(SignupRequest sr)
        {
            try
            {
                BusinessLogic.UserAdmin.UserAdmin userAdmin = new BusinessLogic.UserAdmin.UserAdmin();
                userAdmin.UpdateUserPhoto(sr.User.UserId, sr.User.Photo);
                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool CheckEmailId(string EmailId)
        {
            try
            {
                //SignUp userMail = new SignUp();
                BusinessLogic.SignUp.SignUp signUp = new BusinessLogic.SignUp.SignUp();
                return signUp.CheckEmailId(EmailId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="emailId"></param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void UpdateAcessToken(string emailid, string accestoken)
        {
            try
            {
                //SignUp userMail = new SignUp();
                BusinessLogic.SignUp.SignUp signUp = new BusinessLogic.SignUp.SignUp();
                signUp.UpdateAcessToken(emailid, accestoken);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }

        /// <summary>
        /// Gets my full network.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="poeId">The poe id.</param>
        /// <param name="subscriptionid">The subscriptionid.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetMyUsers(int userId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMyUsers(userId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<UserPOEMapping> GetMyAllUsers(int userId, int subscriptionid)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetMyAllUsers(userId, subscriptionid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets the user details by email id.
        /// </summary>
        /// <param name="emailId">The email id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public User GetUserById(int id)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetUserById(id);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        /// <summary>
        /// Gets the user details by email id.
        /// </summary>
        /// <param name="emailId">The email id.</param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public Network GetNetworkById(int networkId)
        {
            try
            {
                BusinessLogic.SignUp.SignUp signUp = new BusinessLogic.SignUp.SignUp();
                return signUp.GetNetworkById(networkId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool CheckNetwork(string networkName)
        {
            try
            {
                //SignUp userMail = new SignUp();
                BusinessLogic.SignUp.SignUp signUp = new BusinessLogic.SignUp.SignUp();
                return signUp.CheckNetwork(networkName);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Util.Domain.POE> GetAllPoEs()
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetAllPoEs();
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Util.Domain.POE> GetSubscribedPoes(int subId)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetSubscribedPoes(subId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public List<Util.Domain.POE> GetSubscribedPoesList(int userid, int subId)
        {
            try
            {
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                return common.GetSubscribedPoesList(userid, subId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return null;
        }

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public bool AssignPoeRecord(SignupRequest assignPoes)
        {
            try
            {
                SignUp signup = new SignUp();
                signup.AssignPoe(assignPoes);
                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return false;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void DeleteSubscribedUsers(string emailid, int subid)
        {
            try
            {
                SignUp signup = new SignUp();
                signup.DeleteSubscribedUser(emailid, subid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void DeleteSubscribedPoe(int Poeid, int subid)
        {
            try
            {
                SignUp signup = new SignUp();
                signup.DeleteSubscribedPoe(Poeid, subid);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
        }
    }
}