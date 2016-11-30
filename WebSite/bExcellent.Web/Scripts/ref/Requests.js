Namespace("Requests");

Requests.SavePOEResultRequest = function () {
    this.UserId = 0;
    this.ModuleNumber = 0;
    this.QuestionId = 0;
    this.Answer = 0;
    this.Comment = '';
    this.AnswerType = 1;
    this.FeedbackId = 0;
    this.FeedbackStatus = 1;
    this.UserRating = 0;
};

Requests.NetworkUserRequest = function () {
    this.UserId = 0;
    this.LevelId = 0;
    this.POEId = 0;
};

Requests.GetSummaryRequest = function () {
    this.UserId = 0;
    this.LevelId = 0;
    this.POEId = 0;
};
Requests.GetUserDetails = function () {
    this.UserMappingId = 0;
};
Requests.FeedbackInvitationRequest = function () {
    this.InviteTo = 0;
    this.FeedbackType = 0;
    this.Role = 0;
    this.IsReceivedRequest = false;
    this.Designation = 0;
};
Requests.NewFeedbackRequest = function () {
    this.UserId = 0;
    this.PoeId = 0;
    this.Members = [];
    this.FeedbackRole = 0;
    this.FeedbackFor = 0;
    this.FeedbackType = 1;
    this.IsGiveRequest = false;
};

Requests.CheckAccessRequest = function () {
    this.FeedbackRoleId = 0;
};

Requests.GetNetworkUserHtmlRequest = function () {
    this.UserId = 0;
    this.FilterType = '';
    this.PoeId = 0;
};