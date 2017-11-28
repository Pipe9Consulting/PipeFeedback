$(document).ready(function () {
    LoadScale();
    teamFeedbackFb.LoadSlider();

    $("#module-name").click(function () {
        $("#option_menu").fadeToggle();

    });

    $(window).on("load", function () {
        $(".content_progress").mCustomScrollbar();
    });

    $(document).click(function (event) {
        if (!$(event.target).hasClass("button_menu")) {
            if (!$(event.target).parents().hasClass("optView")) {
                $('#option_menu').hide(250);
            }
        }
    });


    $(".modImg1").mouseover(function () {
        $(this).addClass('selected');
        $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product1h.png');
    }).mouseout(function () {
        $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product1.png');
        $(this).removeClass('selected');
    });

    $(".modImg2").mouseover(function () {
        $(this).addClass('selected');
        $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2h.png');
    }).mouseout(function () {
        $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2.png');
        $(this).removeClass('selected');
    });

    $(".modImg3").mouseover(function () {
        $(this).addClass('selected');
        $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3h.png');
    }).mouseout(function () {
        $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3.png');
        $(this).removeClass('selected');
    });

    $(".modImg4").mouseover(function () {
        $(this).addClass('selected');
        $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4h.png');
    }).mouseout(function () {
        $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4.png');
        $(this).removeClass('selected');
    });

    $(".modImg5").mouseover(function () {
        $(this).addClass('selected');
        $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5h.png');
    }).mouseout(function () {
        $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5.png');
        $(this).removeClass('selected');
    });


    var jssor_1_options = {
        $AutoPlay: false,
        $Loop: 0,
        $StartIndex: 0,
        $FillMode: 3,
        $DragOrientation: 0,
        $SlideWidth: 1000,
        $SlideSpacing: 100,
        $Cols: 2,
        $Align: 50,
        $ArrowNavigatorOptions: {
            $Class: $JssorArrowNavigator$
        },
        $BulletNavigatorOptions: {
            $Class: $JssorBulletNavigator$
        }
    };

    var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

    //responsive code begin
    //you can remove responsive code if you don't want the slider scales while window resizing
    function ScaleSlider() {
        var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
        if (refSize) {
            refSize = Math.min(refSize, 1000);
            jssor_1_slider.$ScaleWidth(refSize);
        }
        else {
            window.setTimeout(ScaleSlider, 30);
        }
    }
    ScaleSlider();
    $Jssor$.$AddEvent(window, "load", ScaleSlider);
    $Jssor$.$AddEvent(window, "resize", ScaleSlider);
    $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
    var currentIndex = jssor_1_slider.$CurrentIndex();
    if (parseInt(jssor_1_slider.$CurrentIndex()) == -1) {
        $('.jssora13l').hide();
    }
    if (parseInt(jssor_1_slider.$CurrentIndex()) == 3) {

        $('.jssora13r').hide();
    }

    $('.jssora13r').on('click', function (e) {
        if (sliderValidation(parseInt(jssor_1_slider.$CurrentIndex()))) {

            if (parseInt(jssor_1_slider.$CurrentIndex()) == 0) {
                $(".modImg2").addClass('selected').siblings('li').removeClass('selected');
                $('.modImg1').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product1.png');
                $('.modImg2').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2h.png');
            }
            if (parseInt(jssor_1_slider.$CurrentIndex()) == 1) {
                $(".modImg3").addClass('selected').siblings('li').removeClass('selected');
                $('.modImg2').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2.png');
                $('.modImg3').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3h.png');
            }
            if (parseInt(jssor_1_slider.$CurrentIndex()) == 2) {
                $(".modImg4").addClass('selected').siblings('li').removeClass('selected');
                $('.modImg3').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3.png');
                $('.modImg4').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4h.png');
            }
            if (parseInt(jssor_1_slider.$CurrentIndex()) == 3) {
                $(".modImg5").addClass('selected').siblings('li').removeClass('selected');
                $('.modImg4').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4.png');
                $('.modImg5').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5h.png');
            }
            if (parseInt(jssor_1_slider.$CurrentIndex()) == 4) {
                $(".modImg5").removeClass('selected');
                $('.modImg5').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5.png');
                $('.jssora13r').hide();
            }
            $('.jssora13l').show();

            jssor_1_slider.$Next();
            nextJssor((jssor_1_slider.$CurrentIndex() + 1));
        } else {
            $('#errmsg_cont').text("Please finish responding before progressing.");
            $('#signsubmit').modal('show');
            //alert('Please finish responding before progressing.');
        }
    });

    $('.jssora13l').on('click', function (e) {
        if (parseInt(jssor_1_slider.$CurrentIndex()) == 1) {
            $(".modImg1").addClass('selected').siblings('li').removeClass('selected');
            $('.modImg1').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product1h.png');
            $('.modImg2').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2.png');
            $('.jssora13l').hide();
        }
        if (parseInt(jssor_1_slider.$CurrentIndex()) == 2) {
            $(".modImg2").addClass('selected').siblings('li').removeClass('selected');
            $('.modImg2').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2h.png');
            $('.modImg3').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3.png');
        }
        if (parseInt(jssor_1_slider.$CurrentIndex()) == 3) {
            $(".modImg3").addClass('selected').siblings('li').removeClass('selected');
            $('.modImg3').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3h.png');
            $('.modImg4').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4.png');
        }

        if (parseInt(jssor_1_slider.$CurrentIndex()) == 4) {
            $(".modImg4").addClass('selected').siblings('li').removeClass('selected');
            $('.modImg4').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4h.png');
            $('.modImg5').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5.png');
        }
        if (parseInt(jssor_1_slider.$CurrentIndex()) == 5) {
            $(".modImg5").addClass('selected').siblings('li').removeClass('selected');
            $('.modImg5').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5h.png');
        }
        $('.jssora13r').show();
        jssor_1_slider.$Prev();
        prevJssor((jssor_1_slider.$CurrentIndex() + 1));
    });



    function sliderValidation(current) {
        var validate = true;
        if (current == 0) {
            $("#module1").find('.freqscale_bg').each(function () {
                if ($(this).attr("data-answer") == 0) {
                    validate = false;
                }
            });

        }
        if (current == 1) {
            $("#module2").find('.freqscale_bg').each(function () {
                if ($(this).attr("data-answer") == 0) {
                    validate = false;
                }
            });

        }

        if (current == 2) {
            $("#module3").find('.freqscale_bg').each(function () {
                if ($(this).attr("data-answer") == 0) {
                    validate = false;
                }
            });

        }

        if (current == 3) {
            $("#module4").find('.freqscale_bg').each(function () {
                if ($(this).attr("data-answer") == 0) {
                    validate = false;
                }
            });

        }
        if (current == 4) {
            $("#module5").find('.freqscale_bg').each(function () {
                if ($(this).attr("data-answer") == 0) {
                    validate = false;
                }
            });

        }

        return validate;
    }


    $("#btnSubmitSign").on('click', function () {
        //debugger;
        if (validateIntial()) {
            //$("#completeModal").show();
            $("#completeModal").modal('show');
        }
    });

    $("#btnMgrCompleteOk").on('click', function () {
        //debugger;
        $("#completeModal").modal('hide');
        teamFeedbackFb.loadCompleteFeedback();
    });

    function validateIntial() {
        //debugger;
        var trimtext = $('#fbinitial').val().trim();
        if (trimtext != '') {
            var regex = new RegExp("^[a-zA-Z ]+$");
            if (regex.test(trimtext)) {
                return true;
            } else {
                $('#errmsg_cont').text("Special characters are not allowed in this field");
                $('#signsubmit').modal('show');
                return false;
            }
        } else {
            $('#errmsg_cont').text("Please enter your name");
            $('#signsubmit').modal('show');
            return false;
        }
    }

});


var teamFeedbackFb = {
    LoadSlider: function () {
        //debugger;
        var totalQuestionCount = parseInt(43);
        //var totaUsersCount = parseInt($('#hdnTmCount').val());
        for (var i = 0; i < totalQuestionCount; i++) {
            var freqAnswer = teamFeedbackFb.loadSelectedAnswer({ data: { 'feedbackId': parseInt($("#freqScale" + (i + 1)).attr('data-feedbackid')), 'questionId': parseInt($("#freqScale" + (i + 1)).attr('data-questionid')) } });

            $("#freqScale" + (i + 1)).attr("data-answer", freqAnswer);

            if (freqAnswer != 0) {
                $("#freqScale" + (i + 1)).find('.freqbtn' + freqAnswer).click();
            }

        }
    },
    saveQuestionData: function (answer, important, questionId, feedbackId, userId) {
        //debugger;
        var savePOEResultRequests = [];
        var savePOEResultRequest = new Requests.SavePOEResultRequest();
        savePOEResultRequest.Answer = parseInt(answer);
        savePOEResultRequest.AnswerType = 1;
        savePOEResultRequest.ModuleNumber = parseInt($('.selected').attr('data-moduleid'));
        savePOEResultRequest.CapabilityAnswer = parseInt(0);
        savePOEResultRequest.QuestionId = questionId;
        savePOEResultRequest.FeedbackId = feedbackId;
        savePOEResultRequest.UserRating = important;
        savePOEResultRequest.Notes = "";
        savePOEResultRequest.Comment = null;
        savePOEResultRequest.FeedbackStatus = 1;
        savePOEResultRequests.push(savePOEResultRequest);
        teamFeedbackFb.saveResults(savePOEResultRequests);
    },

    saveResults: function (request) {
        Common.ajaxSyncPost({
            url: '/Feedback/SaveManagerPOEResult',
            data: request,
            success: function (response) {
            },
            error: function (err) {

            }
        });
    },

    loadSelectedAnswer: function (option) {
        $('#selectedanswer').val(0);
        Common.ajaxsync({
            url: "/Feedback/GetGivenAnswer",
            data: option.data,
            success: function (response) {
                $('#selectedanswer').val(response.Answer > 4 || response == 0 ? 0 : response.Answer);
            },
            error: function (err) {
                //window.location = "../Home/ErrorMsg";
            }
        });
        return parseInt($('#selectedanswer').val());
    },
    loadCompleteFeedback: function () {
        var savePOEResultRequests = [];
        var savePOEResultRequest = new Requests.SavePOEResultRequest();
        var feedbackId = $('#freqScale1').attr('data-feedbackid');
        savePOEResultRequest.Answer = 0;
        savePOEResultRequest.AnswerType = 1;
        savePOEResultRequest.ModuleNumber = 0;
        savePOEResultRequest.QuestionId = 0;
        savePOEResultRequest.Comment = null;
        savePOEResultRequest.FeedbackStatus = 2;
        savePOEResultRequest.FeedbackId = parseInt(feedbackId);
        savePOEResultRequest.Initials = $('#fbinitial').val();
        savePOEResultRequests.push(savePOEResultRequest);

        Common.ajaxSyncPost({
            url: '/Feedback/CompleteManagerFeedback',
            data: savePOEResultRequests,
            success: function (response) {
                var result = $('#resultmode').val();
                // alert(result);
                if (result == "True") {
                    window.location = "../../Home/Start";
                } else {
                    window.location = "../../FeedbackResults/FeedbackResults";
                }
            },
            error: function (err) {
            }
        });
    },
};

var Requests = {
    SavePOEResultRequest: function () {
        this.UserId = 0;
        this.ModuleNumber = 0;
        this.QuestionId = 0;
        this.Answer = 0;
        this.Comment = '';
        this.AnswerType = 1;
        this.FeedbackId = 0;
        this.FeedbackStatus = 1;
        this.Notes = '';
        this.Subject = '';
        this.Initials = '';
    }
};



function LoadScale() {
    $('.freqbtn1').click(function () {
        $(this).parents('.freqscale_bg').attr("data-answer", 1);
        $(this).parents('.freqscale_bg').find(".freqadddiv").addClass("freqscaleover1");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").addClass("freqscale_handle1");
        $(this).parents('.freqscale_bg').find(".freqbtn1").addClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqbtn2, .freqbtn3, .freqbtn4").removeClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqadddiv").removeClass("freqscaleover2").removeClass("freqscaleover3").removeClass("freqscaleover4");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").removeClass("freqscale_handle2").removeClass("freqscale_handle3").removeClass("freqscale_handle4");
        teamFeedbackFb.saveQuestionData($(this).parents('.freqscale_bg').attr("data-answer"), $(this).parents('.freqscale_bg').attr("data-important"), $(this).parents('.freqscale_bg').attr("data-questionid"), $(this).parents('.freqscale_bg').attr("data-feedbackid"), $(this).parents('.freqscale_bg').attr("data-userId"));
    });

    $('.freqbtn2').click(function () {
        $(this).parents('.freqscale_bg').attr("data-answer", 2);
        $(this).parents('.freqscale_bg').find(".freqadddiv").addClass("freqscaleover2");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").addClass("freqscale_handle2");
        $(this).parents('.freqscale_bg').find(".freqbtn2").addClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqbtn1, .freqbtn3, .freqbtn4").removeClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqadddiv").removeClass("freqscaleover1").removeClass("freqscaleover3").removeClass("freqscaleover4");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").removeClass("freqscale_handle1").removeClass("freqscale_handle3").removeClass("freqscale_handle4");
        teamFeedbackFb.saveQuestionData($(this).parents('.freqscale_bg').attr("data-answer"), $(this).parents('.freqscale_bg').attr("data-important"), $(this).parents('.freqscale_bg').attr("data-questionid"), $(this).parents('.freqscale_bg').attr("data-feedbackid"), $(this).parents('.freqscale_bg').attr("data-userId"));
    });

    $('.freqbtn3').click(function () {
        $(this).parents('.freqscale_bg').attr("data-answer", 3);
        $(this).parents('.freqscale_bg').find(".freqadddiv").addClass("freqscaleover3");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").addClass("freqscale_handle3");
        $(this).parents('.freqscale_bg').find(".freqbtn3").addClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqbtn1, .freqbtn2, .freqbtn4").removeClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqadddiv").removeClass("freqscaleover1").removeClass("freqscaleover2").removeClass("freqscaleover4");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").removeClass("freqscale_handle1").removeClass("freqscale_handle2").removeClass("freqscale_handle4");
        teamFeedbackFb.saveQuestionData($(this).parents('.freqscale_bg').attr("data-answer"), $(this).parents('.freqscale_bg').attr("data-important"), $(this).parents('.freqscale_bg').attr("data-questionid"), $(this).parents('.freqscale_bg').attr("data-feedbackid"), $(this).parents('.freqscale_bg').attr("data-userId"));
    });

    $('.freqbtn4').click(function () {
        $(this).parents('.freqscale_bg').attr("data-answer", 4);
        $(this).parents('.freqscale_bg').find(".freqadddiv").addClass("freqscaleover4");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").addClass("freqscale_handle4");
        $(this).parents('.freqscale_bg').find(".freqbtn4").addClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqbtn1, .freqbtn2, .freqbtn3").removeClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqadddiv").removeClass("freqscaleover1").removeClass("freqscaleover2").removeClass("freqscaleover3");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").removeClass("freqscale_handle1").removeClass("freqscale_handle2").removeClass("freqscale_handle3");
        teamFeedbackFb.saveQuestionData($(this).parents('.freqscale_bg').attr("data-answer"), $(this).parents('.freqscale_bg').attr("data-important"), $(this).parents('.freqscale_bg').attr("data-questionid"), $(this).parents('.freqscale_bg').attr("data-feedbackid"), $(this).parents('.freqscale_bg').attr("data-userId"));
    });

}