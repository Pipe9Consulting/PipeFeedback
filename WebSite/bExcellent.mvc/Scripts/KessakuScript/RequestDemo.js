$(document).ready(function () {
    $('#hidDiv1').hide();
    $('#hidDiv2').hide();
    $('#hidDiv3').hide();
    //$('#hidDiv1').hide();
    //$('#headerCont li').each(function () {
    //    $('#headerCont li a').removeClass('active');
    //});
    //$('.footer').show();

    //$('#reqDemoHdr a').addClass('active');
    $('#submitReqContact').click(function () {
        $("#status").fadeIn();
        $("#preloader").delay(10).fadeIn("slow");
        // var validation = true;
        var validateAcc = validateReq();
        var fname = $('#reqfname').val();
        var lname = $('#reqlname').val();
        var title = $('#reqtitle').val();
        var mailid = $('#reqEmail').val();
        var company = $('#reqcompany').val();
        var phone = $('#reqPhone').val();
        var message = $('#reqMessage').text();
        if (validateAcc) {
            var checkmailid = Reqemailvalidate(mailid);
            if (checkmailid) {
                Common.ajax({
                    url: '../KessakuHome/SendContactMail',
                    data: { 'fname': fname, 'lname': lname, 'title': title, 'mailid': mailid, 'companyName': company, 'message': message, 'phone': phone },
                    success: function () {
                        $('#reqfname').val("");
                        $('#reqlname').val("");
                        $('#reqtitle').val("");
                        $('#reqEmail').val("");
                        $('#reqcompany').val("");
                        $('#reqPhone').val("");
                        $('#reqMessage').text("");
                        modal.show('example');
                        $("#status").fadeOut();
                        $("#preloader").delay(10).fadeOut("slow");
                    },
                    error: function () {
                    }
                });
            } else {
                $("#status").fadeOut();
                $("#preloader").delay(10).fadeOut("slow");
            }
        } else {
            $("#status").fadeOut();
            $("#preloader").delay(10).fadeOut("slow");
        }
    });
});
function validateReq() {
    var fname = $('#reqfname').val();
    var lname = $('#reqlname').val();
    var title = $('#reqtitle').val();
    var mailid = $('#reqEmail').val();
    var company = $('#reqcompany').val();
    var phone = $('#reqPhone').val();

    $('#reqContErr').hide();
    var returnval = true;

    if (fname == "" && returnval == true) {
        $('#reqContErr').text("Please enter the First Name");
        $('#reqContErr').show();

        returnval = false;
    }
    if (lname == "" && returnval == true) {
        $('#reqContErr').text("Please enter the Last Name");
        $('#reqContErr').show();

        returnval = false;
    }
    if (mailid == "" && returnval == true) {
        $('#reqContErr').text("Please enter the Email Id");
        $('#reqContErr').show();

        returnval = false;
    }

    if (company == "" && returnval == true) {
        $('#reqContErr').text("Please enter the Company Name");
        $('#reqContErr').show();

        returnval = false;
    }
    if (title == "" && returnval == true) {
        $('#reqContErr').text("Please enter the Title");
        $('#reqContErr').show();

        returnval = false;
    }
    if (phone == "" && returnval == true) {
        $('#reqContErr').text("Please enter the Contact Number");
        $('#reqContErr').show();
        returnval = false;
    }

    return returnval;
}
function Reqemailvalidate(mailid) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var emailtested = regex.test(mailid);
    if (!emailtested) {
        $('#reqEmail').css('color', 'Red');
        $('#reqContErr').html("Please enter your valid Email Id");
        $('#reqContErr').show();
    }
    return emailtested;
}