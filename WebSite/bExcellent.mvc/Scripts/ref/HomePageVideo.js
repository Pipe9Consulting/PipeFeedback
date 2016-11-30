$(document).ready(function () {
    $(window).unbind("resize", contactformsubmit);
    $('#ContactError1').hide();
    $('.formpopup,#formpopup').hide();
    $('#scriptloadh').html("");
    $("#vidprevh").html('');
    $(".live-tile, .flip-list").not(".exclude").liveTile();
    $('#yammerLogin').click(function () {
        window.location = "/Yammer/getYammer";
    });
    //$('.bukatutup').click(function () {
    //    $('#target').toggle('slow');
    //});

    $('.close,.closebtn').live('click', function () {
        $(".popup, .popupholder, .popupbg,.formpopup").fadeOut("slow");
        $('#scriptloadh').html("");
        $("#vidprevh").html('');
    });

    $('.video').hide();
});

function contactformsubmit() {
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    //var validateAcc = validate();
    var fname = $('#contactFirstName1').val();
    var lname = $('#ContactLastName1').val();
    var title = $('#ContactTitle1').val();
    var mailid = $('#ContactEmail1').val();
    var company = $('#ContactCompany1').val();
    var phone = $('#ContactPhoneNumber1').val();
    var message = $('#ContactMessage1').val();
    var subjectVal = $('#subjectMode').val();
    var subject = "";
    if (subjectVal == 2) {
        subject = "Request for demo";
    } else {
        subject = "Mail from Contact us";
    }
    //Nov-25
    var returnval = true;

    if (fname == "" && returnval == true) {
        $('#ContactError1').text("Please enter the First Name");
        $('#ContactError1').show();
        returnval = false;
    }
    if (lname == "" && returnval == true) {
        $('#ContactError1').text("Please enter the Last Name");
        $('#ContactError1').show();
        returnval = false;
    }
    if (mailid == "" && returnval == true) {
        $('#ContactError1').text("Please enter the Email Id");
        $('#ContactError1').show();
        returnval = false;
    }

    if (company == "" && returnval == true) {
        $('#ContactError1').text("Please enter the Company Name");
        $('#ContactError1').show();
        returnval = false;
    }
    if (title == "" && returnval == true) {
        $('#ContactError1').text("Please enter the Title");
        $('#ContactError1').show();
        returnval = false;
    }
    if (phone == "" && returnval == true) {
        $('#ContactError1').text("Please enter the Contact Number");
        $('#ContactError1').show();
        returnval = false;
    }
    if (message == "") {
        message = '@';
    }
    //End
    if (returnval) {
        var checkmailid = emailvalidate(mailid);
        if (checkmailid) {
            Common.ajax({
                url: '../Home/SendVideosMail',
                data: { 'fname': fname, 'lname': lname, 'title': title, 'mailid': mailid, 'companyName': company, 'message': message, 'phone': phone, 'subject': subject },
                success: function () {
                    $('#contactFirstName1').val("");
                    $('#ContactLastName1').val("");
                    $('#ContactTitle1').val("");
                    $('#ContactEmail1').val("");
                    $('#ContactCompany1').val("");
                    $('#ContactPhoneNumber1').val("");
                    $('#ContactMessage1').val("");
                    $('.formpopup,#formpopup').hide();
                    //$("#status").fadeOut();
                    //$("#preloader").delay(10).fadeOut("slow");
                    var videoOrder = parseInt($('#videolistsOrder').val());
                    switch (videoOrder) {
                        case 0:
                            break;
                        case 1:
                            $('#scriptloadh').html("");
                            $("#vidprevh").html('');
                            $("#vidprevh").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript' /><div class='player' href='../../Video/BexcellentStoryBoard.flv'  style='display:block; width:480px; height:320px' ></div>");
                            flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
                                clip: {
                                    autoPlay: true,
                                    autoBuffering: true
                                }
                            });
                            break;
                        case 2:
                            $('#scriptloadh').html("");
                            $("#vidprevh").html('');
                            $("#vidprevh").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript' /><div class='player' href='../../Video/The Microsoft Profile of Excellence Story by Dave Miller.flv'  style='display:block; width:480px; height:320px' ></div>");
                            flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
                                clip: {
                                    autoPlay: true,
                                    autoBuffering: true
                                }
                            });
                            break;
                        case 3:
                            $('#scriptloadh').html("");
                            $("#vidprevh").html('');
                            $("#vidprevh").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript' /><div class='player' href='../../Video/Nicksaban.flv'  style='display:block; width:480px; height:320px' ></div>");
                            flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
                                clip: {
                                    autoPlay: true,
                                    autoBuffering: true
                                }
                            });
                            break;
                        case 4:

                            $("#aboutVideo").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script><div class='player' href='../../Video/BexcellentStoryBoard.flv''  style='display:block; width:480px; height:320px' ></div>");
                            flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
                                clip: {
                                    autoPlay: true,
                                    autoBuffering: true
                                }
                            });

                            $(".abtvideopopup, .abtvideo").fadeIn("slow");
                            break;
                        case 5:
                            //$('#scriptfuncVideo').html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script>");
                            //$('#scriptload').html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script>");
                            $("#aboutVideo").html("");
                            $("#aboutVideo").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script><div class='player' href='../../Video/The Profile of Excellence Story.flv'  style='display:block; width:480px; height:320px' ></div>");
                            flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
                                clip: {
                                    autoPlay: true,
                                    autoBuffering: true
                                }
                            });
                            //$('.videolist').css('margin-top', '12px');
                            // $('#videoPopup').fadeIn("slow");
                            $(".abtvideopopup, .abtvideo").fadeIn("slow");
                            break;
                        case 6:
                            // $('#scriptfuncVideo').html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script>");
                            //$('#scriptload').html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script>");
                            $("#aboutVideo").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script><div class='player' href='../../Video/The bexcellent Story.flv'  style='display:block; width:480px; height:320px' ></div>");
                            flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
                                clip: {
                                    autoPlay: false,
                                    autoBuffering: true
                                }
                            });
                            //$('.videolist').css('margin-top', '12px');
                            //$('#videoPopup').fadeIn("slow");
                            $(".abtvideopopup, .abtvideo").fadeIn("slow");

                            break;
                        case 7:
                            //$('#scriptfuncVideo').html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script>");
                            // $('#scriptload').html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script>");
                            $("#aboutVideo").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script><div class='player' href='../../Video/The Microsoft Profile of Excellence Story by Cecilia Flombum.flv'  style='display:block; width:480px; height:320px' ></div>");
                            flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
                                clip: {
                                    autoPlay: false,
                                    autoBuffering: true
                                }
                            });
                            $('.videolist').css('margin-top', '12px');
                            //$('#videoPopup').fadeIn("slow");
                            $(".abtvideopopup, .abtvideo").fadeIn("slow");
                            break;
                        case 8:
                            // $('#scriptfuncVideo').html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script>");
                            //$('#scriptload').html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script>");
                            $("#aboutVideo").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script><div class='player' href='../../Video/The Microsoft Profile of Excellence Story with Johneen Bufford.flv'  style='display:block; width:480px; height:320px' ></div>");
                            flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
                                clip: {
                                    autoPlay: false,
                                    autoBuffering: true
                                }
                            });
                            //$('.videolist').css('margin-top', '12px');
                            //$('#videoPopup').fadeIn("slow");
                            $(".abtvideopopup, .abtvideo").fadeIn("slow");
                            break;
                        case 9:
                            //$('#scriptfuncVideo').html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script>");
                            // $('#scriptload').html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script>");
                            $("#aboutVideo").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script><div class='player' href='../../Video/The Microsoft Profile of Excellence Story by Dave Miller.flv'  style='display:block; width:480px; height:320px' ></div>");
                            flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
                                clip: {
                                    autoPlay: false,
                                    autoBuffering: true
                                }
                            });
                            //$('.videolist').css('margin-top', '12px');
                            // $('#videoPopup').fadeIn("slow");
                            $(".abtvideopopup, .abtvideo").fadeIn("slow");
                            break;
                        case 10:
                            $("#aboutVideo").html("");
                            $("#aboutVideo").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script><div class='player' href='../../Video/Nicksaban.flv'  style='display:block; width:480px; height:320px' ></div>");
                            //$("#VideoPlayer").html("<div class='player' href='../../Video/Nicksaban.flv'  style='display:block; width:480px; height:320px' ></div>");
                            flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
                                clip: {
                                    autoPlay: true,
                                    autoBuffering: true
                                }
                            });
                            //$('.videolist').css('margin-top', '12px');
                            //$('#videoPopup').fadeIn("slow");
                            $(".abtvideopopup, .abtvideo").fadeIn("slow");
                            break;
                        case 11:
                            // $('#scriptfuncVideo').html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script>");
                            //$('#scriptload').html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script>");
                            $("#aboutVideo").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script><div class='player' href='../../Video/The bexcellent Story.flv'  style='display:block; width:480px; height:320px' ></div>");
                            flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
                                clip: {
                                    autoPlay: false,
                                    autoBuffering: true
                                }
                            });
                            //$('.videolist').css('margin-top', '12px');
                            //$('#videoPopup').fadeIn("slow");
                            $(".abtvideopopup, .abtvideo").fadeIn("slow");
                            break;

                        default:
                            $('#scriptloadh').html("");
                            $("#vidprevh").html('');
                            $("#vidprevh").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript' /><div class='player' href='../../Video/bexcellent Storyboard.flv'  style='display:block; width:480px; height:320px' ></div>");
                            flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
                                clip: {
                                    autoPlay: true,
                                    autoBuffering: true
                                }
                            });
                            break;
                    }
                    var videolist = $('#vidLists').val();
                    if (videolist != 1) {
                        //temperory
                        if (videoOrder != 0) {
                            $('#videoPopup').fadeIn("slow");
                            $(".popup, .popupholder").fadeIn("slow");
                        }
                    }
                    else {
                        $('#VideoPlayer').css('visibility', 'visible');
                        //$('#ContactError1').show();
                    }
                    $('#videolistsOrder').val(0);
                    $("#status").fadeOut();
                    $("#preloader").delay(100).fadeOut("slow");
                },
                error: function (ex) {
                }
            });
        }
        else {
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
            $('#ContactError1').show();
        }
    } else {
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
        $('#ContactError1').show();
    }
    $(window).unbind("resize", contactformsubmit);
    //$(window).unbind("resize", validate);
    // $(window).unbind("resize", emailvalidate);
}

//function validate() {
//    var fname = $('#contactFirstName1').val();
//    var lname = $('#ContactLastName1').val();
//    var title = $('#ContactTitle1').val();
//    var mailid = $('#ContactEmail1').val();
//    var company = $('#ContactCompany1').val();
//    var phone = $('#ContactPhoneNumber1').val();
//    // var size = $("#txtSize option:selected").text();

//    var returnval = true;

//    if (fname == "" && returnval == true) {
//        $('#ContactError1').text("Please enter the First Name");
//        $('#ContactError1').show();

//        returnval = false;
//    }
//    if (lname == "" && returnval == true) {
//        $('#ContactError1').text("Please enter the Last Name");
//        $('#ContactError1').show();

//        returnval = false;
//    }
//    if (mailid == "" && returnval == true) {
//        $('#ContactError1').text("Please enter the Email Id");
//        $('#ContactError1').show();

//        returnval = false;
//    }

//    if (company == "" && returnval == true) {
//        $('#ContactError1').text("Please enter the Company Name");
//        $('#ContactError1').show();

//        returnval = false;
//    }
//    if (title == "" && returnval == true) {
//        $('#ContactError1').text("Please enter the Title");
//        $('#ContactError1').show();

//        returnval = false;
//    }
//    if (phone == "" && returnval == true) {
//        $('#ContactError1').text("Please enter the Contact Number");
//        $('#ContactError1').show();
//        returnval = false;
//    }

//    return returnval;
//}
function emailvalidate(mailid) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var emailtested = regex.test(mailid);
    if (!emailtested) {
        $('#ContactError1').text("Please enter a valid emailid");
        $('#ContactError1').show();
    }
    return emailtested;
}