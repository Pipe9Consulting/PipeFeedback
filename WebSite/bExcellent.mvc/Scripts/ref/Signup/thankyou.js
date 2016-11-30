$(document).ready(function () {
    StartClick();
    Common.ajax({
        url: '/SignUp/SetThankYouContent',
        success: function (response) {
            var html = "";
            for (var k = 0; k < response.length; k++) {
                if (response[k].Mode == "MicrosoftCorprate") {
                    $('#start2').hide();
                    $('#start').show();
                } else {
                    //changed in order to remove the credit card payment
                    $('#start').show();
                    $('#start2').hide();
                    //$('#start').hide();
                    //$('#start2').show();
                }
                html = html + "<div class='row clr'> <div class='address' style='width:auto !important'>" + response[k].FirstName + " " + response[k].LastName + " - " + response[k].PoeName + " </div> </div>";
            }
            $("#thankyouCont").html(html);
            //MicrosoftCorprate
        },
        error: function (err) {
        }
    });
});

function StartClick() {
    Common.ajaxsync({
        url: '/SignUp/GetMode',
        success: function (response) {
            var href = '';
            if (response == 0) {
                href = '/Home/SignOut';
            } else {
                href = '/Network/Network';
            }
            $('#start').live('click', function () {
                window.location.href = href;
            });
        },
        error: function (err) {
        }
    });
}