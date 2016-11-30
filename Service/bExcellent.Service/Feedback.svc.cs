using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using bExcellent.Service.BusinessLogic.FeedbackBL;
using bExcellent.Service.BusinessLogic.POE;
using bExcellent.Service.BusinessLogic.UserAdmin;
using bExcellent.Service.Util.Domain;
using bExcellent.Service.Util.Request;
using bExcellent.Service.Util.Response;

namespace bExcellent.Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Feedback" in code, svc and config file together.
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class Feedback : IFeedback
    {
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetFeedbackGivenCount(int userId, int poeId)
        {
            try
            {
                UserAdmin userAdmin = new UserAdmin();
                return userAdmin.GetGivenFeedBackCount(userId, poeId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            } return 0;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public int GetFeedbackReceivedCount(int userId, int poeId)
        {
            try
            {
                UserAdmin userAdmin = new UserAdmin();
                return userAdmin.GetReceivedFeedback(userId, poeId);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            } return 0;
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public string GetPOEIntro(int poeid)
        {
            try
            {
                POEBL pobl = new POEBL();
                return pobl.GetPOEIntro(poeid);
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
        public string GetModuleIntro(int poeid, int moduleId)
        {
            try
            {
                POEBL pobl = new POEBL();
                return pobl.GetModuleIntro(poeid, moduleId);
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
        public string GetPOEKeyAction(int poeid)
        {
            try
            {
                POEBL pobl = new POEBL();
                return pobl.GetPOEKeyAction(poeid);
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
        public string GetModuleKeyAction(int poeid, int moduleId)
        {
            try
            {
                POEBL pobl = new POEBL();
                return pobl.GetModuleKeyAction(poeid, moduleId);
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
        public List<Module> GetPracticeArea(int poeid)
        {
            try
            {
                POEBL pobl = new POEBL();
                return pobl.GetPracticeArea(poeid);
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
        public List<Question> GetQuestions(int moduleId)
        {
            try
            {
                POEBL pobl = new POEBL();
                return pobl.GetQuestions(moduleId);
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

        //[WebGet(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        public bool SavePOEResult(List<SavePOEResultRequest> request)
        {
            // var loggedInUser = UserData.GetCurrentUser();

            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();

                int index = 0;
                foreach (var req in request)
                {
                    // req.LoggedInUserName = loggedInUser.UserName;
                    //req.LoggedInUserId = loggedInUser.UserId;
                    feedbackBl.SaveResult(req, request.Count, index);
                    index++;
                }
                return true;
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }
            return true;
        }

        [OperationContract]

        //   [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "/CreateFeedback")]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]

        //[WebGet(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        public List<CreatedFeedback> CreateFeedback(NewFeedbackRequest request)
        {
            try
            {
                FeedbackBL feedbackBl = new FeedbackBL();
                return feedbackBl.CreateFeedback(request);
            }
            catch (Exception e)
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.PreconditionFailed;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = e.Message;
            }

            return null;
        }
    }
}