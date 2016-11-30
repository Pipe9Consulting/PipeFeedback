$(document).ready(function () {
    commonitem.loadmyphoto();
});
var commonitem = {
    loadmyphoto: function () {
        var userid = 0;
        Common.ajaxsync({
            url: '/Common/MyUserId',
            success: function (response) {
                userid = response;
                if (userid != 0) {
                    $("#myphoto").attr("src", "/Uploadify/LoadImageHandler.ashx?id=" + response+ "&rnd=" + Math.random());
                    
                }

            },
            error: function (err) {

            }
        });

    }
}