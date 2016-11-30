//Footer Menu Hide
$(document).click(function (event) {
    if ($(event.target).parents().index($('#footerMenu')) == -1) {
        if ($('#target').is(":visible")) {
            $("#target").hide("slow");
        }
    }
});
//Document Load for click functions
$(document).ready(function () {
    $("#status").fadeOut();
    $("#preloader").delay(100).fadeOut("slow");
    $('#ContactError').hide();
    //Page Redirect Video
    $('#EventsRedirect').click(function () {
    });
    $('#videoPage').click(function () {
        window.location.href = "../Videos";
    });
    //Video Popup display
    $('.learnmore').click(function () {
        window.location.href = "../Videos";
        //$('#popupvideo').html("<video id='videoplayPopup'  controls autoplay> <source src='Video/bexcellentStoryboard.mp4' type='video/mp4'> </video>");
        //$('#videopopup').delay(200).fadeIn();
    });
    $('.IsYourTeam').click(function () {
        window.location.href = "../IsYourteam";
    });
    $('#closevideoPopup').click(function () {
        $('#popupvideo').html("");
    });

    $('#headerCont li').each(function () {
        $(this).find('a').removeClass('active');
    });
    $(".fourcolumn li .top").mouseover(function () {
        //if (!$(this).hasClass('bottom')) {
        $('.fourcolumn li').each(function () {
            $(this).find('.top').removeClass("selected");
        });
        $(this).addClass("selected");
        //}
    });
    $("#target li").mouseover(function () {
        //if (!$(this).hasClass('bottom')) {
        //$('.target li').each(function () {
        //    $(this).find('.top').removeClass("selected");
        //});
        $(this).addClass("selected").siblings().removeClass('selected');
        //}
    });
    $(".fourcolumn li .top").mouseleave(function () {
        //if (!$(this).hasClass('bottom')) {
        $('.fourcolumn li').each(function () {
            $(this).find('.top').removeClass("selected");
        });
        $(this).removeClass("selected");
        //}
    });
    $(".fourcolumn li .bottom").mouseover(function () {
        //if (!$(this).hasClass('bottom')) {
        $('.fourcolumn li').each(function () {
            $(this).find('.bottom').removeClass("select");
        });
        $(this).addClass("select");
        //}
    });
    $(".fourcolumn li .bottom").mouseleave(function () {
        //if (!$(this).hasClass('bottom')) {
        $('.fourcolumn li').each(function () {
            $(this).find('.bottom').removeClass("select");
        });
        $(this).removeClass("select");
        //}
    });
    $(".fourcolumn li .Coachbottom").mouseover(function () {
        //if (!$(this).hasClass('bottom')) {
        $('.fourcolumn li').each(function () {
            $(this).find('.Coachbottom').removeClass("select");
        });
        $(this).addClass("select");
        //}
    });
    $(".fourcolumn li .Coachbottom").mouseleave(function () {
        //if (!$(this).hasClass('bottom')) {
        $('.fourcolumn li').each(function () {
            $(this).find('.Coachbottom').removeClass("select");
        });
        $(this).removeClass("select");
        //}
    });
    $(".fourcolumn li .bottom").mouseover(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
    });
    $(".clientthumnail li").click(function () {
        $(this).addClass("activeclient").siblings().removeClass("activeclient");
    });
    $('#footerMenu').click(function () {
        $('#target').toggle();
    });

    $("#target li").click(function (event) {
        if (event.target.innerHTML == "Members") {
            event.preventDefault();
            window.top.location = event.currentTarget.firstChild.href;
        }
    });

    //Click function for contactUs
    $('#submitContact').click(function () {
        debugger;
        $("#status").fadeIn();
        $("#preloader").delay(10).fadeIn("slow");
        // var validation = true;
        var validateAcc = validate();
        var fname = $('#contactFirstName').val();
        var lname = $('#ContactLastName').val();
        var title = $('#ContactTitle').val();
        var mailid = $('#ContactEmail').val();
        var company = $('#ContactCompany').val();
        var phone = $('#ContactPhoneNumber').val();
        var message = $('#ContactMessage').text();
        if (validateAcc) {
            var checkmailid = emailvalidate(mailid);
            if (checkmailid) {
                Common.ajax({
                    url: '../KessakuHome/SendContactMail',
                    data: { 'fname': fname, 'lname': lname, 'title': title, 'mailid': mailid, 'companyName': company, 'message': message, 'phone': phone },
                    success: function () {
                        $('#contactFirstName').val("");
                        $('#ContactLastName').val("");
                        $('#ContactTitle').val("");
                        $('#ContactEmail').val("");
                        $('#ContactCompany').val("");
                        $('#ContactPhoneNumber').val("");
                        $('#ContactMessage').text("");
                        $("#status").fadeOut();
                        $("#preloader").delay(10).fadeOut("slow");
                        $('#ContactEmail').css("color", "#333");
                        modal.show('example');
                        
                    },
                    error: function () {
                    }
                });
            } else {
                $("#status").fadeOut();
                $("#preloader").delay(10).fadeOut("slow");
                $('#ContactError').text("Please enter valid Email Id");
                $('#ContactError').show();
            }
        } else {
            $("#status").fadeOut();
            $("#preloader").delay(10).fadeOut("slow");
        }
    });

    //Signup Front Page
    $('#signupbtn').click(function () {
        $("#status").fadeIn();
        $("#preloader").delay(10).fadeIn("slow");
        var search = $('#emailid').val();
        var checkmail = IsEmail(search);
        if (search != "" && search != "enter your email address" && checkmail == true) {
            if (validatepubemail(search)) {
                Common.ajax({
                    url: '/Home/HomeSignUp?mailid=' + search,
                    success: function (response) {
                        if (response == false) {
                            //alert($('#homeurl').val());
                            //window.open($('#homeurl').val() + '/signup/register', '_blank');
                            window.open($('#homeurl').val() + '/signup/register', '_blank');
                            $("#status").fadeOut();
                            $("#preloader").delay(10).fadeOut("slow");
                        } else {
                            alert("This email id is already registered with PIPE9.");
                            $("#status").fadeOut();
                            $("#preloader").delay(10).fadeOut("slow");
                        }
                    },
                    error: function (err) {
                    }
                });
            } else {
                alert("Should be your company specific emailid");
                $("#status").fadeOut();
                $("#preloader").delay(10).fadeOut("slow");
            }
        } else {
            alert("Please enter your valid work email id");
            $("#status").fadeOut();
            $("#preloader").delay(10).fadeOut("slow");
        }
    });
    //End Signup Front Page
    //All Pop-up close
    $('.close').click(function () {
        $('.popup').hide();
    });
});

function validate() {
    var fname = $('#contactFirstName').val();
    var lname = $('#ContactLastName').val();
    var title = $('#ContactTitle').val();
    var mailid = $('#ContactEmail').val();
    var company = $('#ContactCompany').val();
    var phone = $('#ContactPhoneNumber').val();

    $('#ContactError').hide();
    var returnval = true;

    if (fname == "" && returnval == true) {
        $('#ContactError').text("Please enter First Name");
        $('#ContactError').show();

        returnval = false;
    }
    if (lname == "" && returnval == true) {
        $('#ContactError').text("Please enter Last Name");
        $('#ContactError').show();

        returnval = false;
    }
    if (mailid == "" && returnval == true) {
        $('#ContactError').text("Please enter Email Id");
        $('#ContactError').show();

        returnval = false;
    }

    if (company == "" && returnval == true) {
        $('#ContactError').text("Please enter Company Name");
        $('#ContactError').show();

        returnval = false;
    }
    if (title == "" && returnval == true) {
        $('#ContactError').text("Please enter Title");
        $('#ContactError').show();

        returnval = false;
    }
    if (phone == "" && returnval == true) {
        $('#ContactError').text("Please enter Contact Number");
        $('#ContactError').show();
        returnval = false;
    }

    return returnval;
}

//validate Email id
function emailvalidate(mailid) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var emailtested = regex.test(mailid);
    if (!emailtested) {
        $('#ContactEmail').css('color', 'Red');
        $('#PreviewContactErr').html("Please enter your valid Email Id");
        $('#PreviewContactErr').show();
    }
    return emailtested;
}

//Preview ContactUs
function PreviewContactUs() {
    $('#PrevVideoDemo').val(1);
    $('#messagePopup').find('h2').text("Please enter your details to request a demo");
    $('#PreviewContactErr').hide();
    $('#messagePopup').show();
}
//Get Current Mode for the request
function GetRequestedMode() {
    var getstatus = 0;
    Common.ajaxsync({
        url: '../KessakuHome/GetFormStatus',
        success: function (response) {
            if (response) {
                getstatus = 1;
            }
        },
        error: function (err) {
        }
    });
    return getstatus;
}

function validatePreviewDemo() {
    var name = $('#PreviewFirstname').val();
    var mailid = $('#PreviewMailid').val();
    var returnval = true;
    if (name == "") {
        $('#PreviewContactErr').html("Please enter your Name");
        $('#PreviewContactErr').show();
        returnval = false;
    } else if (mailid == "") {
        $('#PreviewContactErr').html("Please enter your Email Id");
        $('#PreviewContactErr').show();

        returnval = false;
    }
    return returnval;
}
//Submit the request demo contact us
function SubmitContactUs() {
    $('#contactSubmitBtn').prop("disabled", true);
    $("#status").delay(0).fadeIn();
    $("#preloader").delay(0).fadeIn("slow");
    var name = $('#PreviewFirstname').val();
    var mailid = $('#PreviewMailid').val();
    var company = $('#PreviewCompany').val();
    var phone = $('#PreviewPhone').val();
    var message = $('#PreviewMessage').text();
    var mode = 0;
    var filenumber = $('#Dwnfilenumber').val();
    if (filenumber != 0) {
        mode = 1;
    }
    var validateField = validatePreviewDemo();
    if (validateField) {
        var validateMailid = emailvalidate(mailid);
        if (validateMailid) {
            Common.ajax({
                url: '../KessakuHome/RequestDemo',
                data: { 'name': name, 'mailid': mailid, 'companyName': company, 'phone': phone, 'message': message, 'mode': mode },
                success: function () {
                    $('#contactSubmitBtn').prop("disabled", false);
                    $('#messagePopup').hide();
                    $('#PreviewFirstname').val("");
                    $('#PreviewMailid').val("");
                    $('#PreviewCompany').val("");
                    $('#PreviewPhone').val("");
                    $('#PreviewMessage').text("");
                    var prevVideo = $('#PrevVideoDemo').val();
                    if (prevVideo != 1 && filenumber != 0) {
                        if (filenumber == 1) {
                            var url = '../../SignUp/DownloadPdf?poeid=6';
                            window.open(url, '_blank');
                        }
                    } else {
                        $('#PrevVideoDemo').val(0);
                        $('#thankuPopup').show();
                    }
                    $("#status").fadeOut();
                    $("#preloader").delay(10).fadeOut("slow");
                },
                error: function (err) {
                }
            });
        } else {
            $('#contactSubmitBtn').prop("disabled", false);
            $("#status").fadeOut();
            $("#preloader").delay(10).fadeOut("slow");
        }
    } else {
        $('#contactSubmitBtn').prop("disabled", false);
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    }
}
function DownloadFiles(filenumber) {
    var requestedMode = GetRequestedMode();
    if (requestedMode == 0) {
        $('#messagePopup').find('h2').text("Please enter your details to download");
        $('#PreviewContactErr').hide();
        $('#messagePopup').show();
        $('#Dwnfilenumber').val(filenumber);
    } else {
        if (filenumber == 1) {
            var url = '../../SignUp/DownloadPdf?poeid=6';
            window.open(url, '_blank');
        }
        //download the file according to file number
    }
}

function RedirectPoeLibrary() {
    //alert("inside");
    window.open('/Home/Poelibrary?location=newPoe', '_parent');
    //window.location = "/Home/Poelibrary?location=newPoe";
}
function RegisterRedirect() {
    window.open($('#homeurl').val() + '/signup/register', '_blank');
    // window.location.href = '../signup/register';
    //window.location.target=
}
function validatepubemail(mailid) {
    var pubemails = "gmail,yahoo,hotmail,live,outlook";
    var collections = pubemails.split(',');
    for (var k = 0; k < collections.length; k++) {
        if (mailid.toLowerCase().indexOf(collections[k]) >= 0) {
            return false;
        }
    }
    return true;
}
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}