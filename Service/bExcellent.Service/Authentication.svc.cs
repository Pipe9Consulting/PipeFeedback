using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using bExcellent.Service.BusinessLogic.Authentiation;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Response;

namespace bExcellent.Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Authentication" in code, svc and config file together.
    /// <summary>
    /// Authenticate User
    /// </summary>
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class Authentication : IAuthentication
    {
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public AuthenticationResult AuthenticateUser(string userName, string passwordText)
        {
            try
            {
                BusinessLogic.Authentiation.AuthentiationBO authentiation = new AuthentiationBO();
                return authentiation.AuthenticateUser(userName, passwordText);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "AuthenticateUser", e.Message, 0);
            }
            return null;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="passwordText"></param>
        /// <returns></returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public Password AuthenticateUserWithUserName(string userName)
        {
            try
            {
                BusinessLogic.Authentiation.AuthentiationBO authentiation = new AuthentiationBO();
                return authentiation.AuthenticateUser(userName);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "AuthenticateUserWithUserName", e.Message, 0);
            }
            return null;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public void UpdateUserLastLogin(int id)
        {
            try
            {
                BusinessLogic.Authentiation.AuthentiationBO authentiation = new AuthentiationBO();
                authentiation.UpdateUserLastLogin(id);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
                BusinessLogic.Common.Common common = new BusinessLogic.Common.Common();
                common.CreateErrorLog(0, "UpdateUserLastLogin", e.Message, 0);
            }
        }
    }
}