$(document).ready(function () {
    // bind wcsi category menu
    $('#BtnNext').live('click', function () { PoeFeedback.saveFeedback(); });
});

var PoeFeedback = {
    saveFeedback: function () {
        // var dictionaryObject = Feedback.Common.getDictionaryValue();

        var selectedAnswer = 2;

        var savePOEResultRequests = [];
        var savePOEResultRequest = new Requests.SavePOEResultRequest();
        savePOEResultRequest.UserId = 167;
        savePOEResultRequest.Answer = parseInt(selectedAnswer);
        savePOEResultRequest.AnswerType = 1;
        savePOEResultRequest.ModuleNumber = 2;
        savePOEResultRequest.QuestionId = 1;
        savePOEResultRequest.Comment = null;
        savePOEResultRequest.FeedbackStatus = 1;
        savePOEResultRequest.FeedbackId = 5;
        savePOEResultRequests.push(savePOEResultRequest);

        saveFeedbackResults(savePOEResultRequests);
        return false;
    },
    createSelfFeedback: function () {
        var request = new Requests.NewFeedbackRequest();
        request.PoeId = 1;
        request.UserId = 168;
        request.FeedbackRole = 1; // $('#userroleforpoe').html();
        request.FeedbackFor = 168;
        //request.Members[0] = 168;
        request.FeedbackType = 1; //For Manager Assessment
        request.IsTakeRequest = true;
        createTakeFeedback(request);
        return true;
    }
};
var createTakeFeedback = function (request) {
    Common.ajaxPost({
        url: serviceUrl + 'Feedback.svc/CreateFeedback',
        data: request,
        /*data: 'provide your data in json format',*/
        success: function (response) {
            //debugger;
            $('#createdFeedbacks').html(response);

            //alert(response);
        },
        error: function (err) {
            //  alert(err);
        }
    });
};

var saveFeedbackResults = function (request) {
 //   debugger;
    Common.ajaxPost({
        url: serviceUrl + 'Feedback.svc/SavePOEResult',
        data: request,
        /*data: 'provide your data in json format',*/
        success: function (response) {
            //alert(response);
        },
        error: function (err) {
            //  alert(err);
        }
    });
};