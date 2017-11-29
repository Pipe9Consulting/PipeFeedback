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
        if (!$(this).hasClass('selectedModule')) {
            $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product1.png');
            $(this).removeClass('selected');
        }
    });

    $(".modImg2").mouseover(function () {
        $(this).addClass('selected');
        $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2h.png');
    }).mouseout(function () {
        if (!$(this).hasClass('selectedModule')) {
            $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2.png');
            $(this).removeClass('selected');
        }
    });

    $(".modImg3").mouseover(function () {
        $(this).addClass('selected');
        $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3h.png');
    }).mouseout(function () {
        if (!$(this).hasClass('selectedModule')) {
            $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3.png');
            $(this).removeClass('selected');
        }
    });

    $(".modImg4").mouseover(function () {
        $(this).addClass('selected');
        $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4h.png');
    }).mouseout(function () {
        if (!$(this).hasClass('selectedModule')) {
            $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4.png');
            $(this).removeClass('selected');
        }
    });

    $(".modImg5").mouseover(function () {
        $(this).addClass('selected');
        $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5h.png');
    }).mouseout(function () {
        if (!$(this).hasClass('selectedModule')) {
            $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5.png');
            $(this).removeClass('selected');
        }
    });


    


    var jssor_1_options = {
        $AutoPlay: false,
        $Loop: 0,
        $StartIndex:(parseInt($('#lastModuleOrder').val()) == 0) ? 0 : parseInt($('#lastModuleOrder').val())-1,
        //$FillMode: 3,
        $DragOrientation: 0,
        $SlideWidth: 600,
        //$SlideSpacing: 100,
        $Cols: 2,
        $Align: 120,
        $ArrowNavigatorOptions: {
            $Class: $JssorArrowNavigator$,
            $Steps: 1,
            $ChanceToShow: 1
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
    //LoadFooterMenu(jssor_1_slider.$CurrentIndex()+1);
    LoadTile(parseInt($('#lastModuleOrder').val())-2);
    if (parseInt(jssor_1_slider.$CurrentIndex()) == -1 && $('#lastModuleOrder').val()==0) {
        $('.jssora13l').hide();
        $('#module1').addClass('currentPageJssor');
        $('#module2').addClass('nextPageJssor');
    } else {
        for (var i = 1; i <= 6; i++) {
            $('#module' + i).removeClass('currentPageJssor').removeClass('leftPageJssor').removeClass('nextPageJssor');
        }
        $('#module' + (parseInt($('#lastModuleOrder').val()))).addClass('select_core' + (parseInt($('#lastModuleOrder').val())));
        $('#module' + (parseInt($('#lastModuleOrder').val()) + 1)).removeClass('currentPageJssor').removeClass('leftPageJssor').addClass('nextPageJssor');
        $('#module' + (parseInt($('#lastModuleOrder').val()))).removeClass('leftPageJssor').removeClass('nextPageJssor').addClass('currentPageJssor');
        $('#module' + (parseInt($('#lastModuleOrder').val()) - 1)).removeClass('currentPageJssor').removeClass('nextPageJssor').addClass('leftPageJssor');
    }
    if (parseInt(jssor_1_slider.$CurrentIndex()) == 3) {

        $('.jssora13r').hide();
    }

    $('.bukatutup').on('click', function () {
        $("#target").toggle();
        var htmlText = "<li id='lit1' style='display:none' data-order='0'><a href='#'><span><img src='../../Images/icons/AzureInfraTsp-Product1-small.png' /></span><p>Microsoft Azure</p></a></li>" + "<li id='lit2' style='display:none' data-order='1'><a href='#'><span><img src='../../Images/icons/AzureInfraTsp-Product2-small.png' /></span><p>Security</p></a></li>" + "<li id='lit3' style='display:none' data-order='2'><a href='#'><span><img src='../../Images/icons/AzureInfraTsp-Product3-small.png' /></span><p>Operations & Management</p></a></li>" + "<li id='lit4' style='display:none' data-order='3'><a href='#'><span><img src='../../Images/icons/AzureInfraTsp-Product4-small.png' /></span><p>Developer Tools</p></a></li>" + "<li id='lit5' style='display:none' data-order='4'><a href='#'><span><img src='../../Images/icons/AzureInfraTsp-Product5-small.png' /></span><p>Debugging & Performance</p></a></li>";
        $('#target ul').html(htmlText);
        LoadFooterMenu(parseInt(jssor_1_slider.$CurrentIndex()) + 1);
        $("#lit1").mouseover(function () {            
            $(this).find('img').attr('src', '../../Images/icons/AzureInfraTsp-Product1-small_selected.png');
        }).mouseout(function () {
            $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product1-small.png');           
        });

        $("#lit2").mouseover(function () {          
            $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2-small_selected.png');
        }).mouseout(function () {
            $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2-small.png');           
        });

        $("#lit3").mouseover(function () {           
            $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3-small_selected.png');
        }).mouseout(function () {
            $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3-small.png');          
        });

        $("#lit4").mouseover(function () {           
            $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4-small_selected.png');
        }).mouseout(function () {
            $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4-small.png');          
        });

        $("#lit5").mouseover(function () {           
            $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5-small_selected.png');
        }).mouseout(function () {
            $(this).find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5-small.png');          
        });

        $("#target ul li").on('click', function () {
            var index = parseInt($(this).attr('data-order'));
            var lastModuleOrder = parseInt($('#lastModuleOrder').val());
            if (lastModuleOrder >= (index + 1)) {
                LoadTile(index - 1);
                jssor_1_slider.$GoTo((index));
                $('#module' + (index)).addClass('select_core' + (index));
                $('#moduleSet' + (index + 1)).removeClass('currentPageJssor').removeClass('leftPageJssor').addClass('nextPageJssor');
                $('#moduleSet' + (index)).removeClass('leftPageJssor').removeClass('nextPageJssor').addClass('currentPageJssor');
                $('#moduleSet' + (index - 1)).removeClass('currentPageJssor').removeClass('nextPageJssor').addClass('leftPageJssor');
            }
            if (index == 0) {
                $('.jssora13l').hide();
            } else {
                $('.jssora13l').show();
            }
        });
    });




    $('.jssora13r').on('click', function (e) {
        if (sliderValidation(parseInt(jssor_1_slider.$CurrentIndex()))) {
            LoadTile(parseInt(jssor_1_slider.$CurrentIndex()));
            $('.jssora13l').show();

            jssor_1_slider.$Next();
            nextJssor((jssor_1_slider.$CurrentIndex() + 1));
        } else {
            //alert("Please finish responding before progressing.");
           // debugger;
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

    $('.poemodule li').on('click', function() {
        var index = parseInt($(this).attr('data-order'));
        var lastModuleOrder = parseInt($('#lastModuleOrder').val());
        if (lastModuleOrder >= (index + 1)) {
            LoadTile(index-1);
            jssor_1_slider.$GoTo((index));
            for (var i = 1; i <= 6; i++) {
                $('#module' + i).removeClass('currentPageJssor').removeClass('leftPageJssor').removeClass('nextPageJssor');
            }
            $('#module' + (index)).addClass('select_core' + (index));
            $('#module' + (index + 2)).removeClass('currentPageJssor').removeClass('leftPageJssor').addClass('nextPageJssor');
            $('#module' + (index + 1)).removeClass('leftPageJssor').removeClass('nextPageJssor').addClass('currentPageJssor');
            $('#module' + (index)).removeClass('currentPageJssor').removeClass('nextPageJssor').addClass('leftPageJssor');
        }
        if (index == 0) {
            $('.jssora13l').hide();
        } else {
            $('.jssora13l').show();
        }
    });
    function nextJssor(currentPos) {
        var order = currentPos + 1;
        var lastModuleOrder = parseInt($('#lastModuleOrder').val());
        if (lastModuleOrder < order) {
            $('#lastModuleOrder').val(order);
            LoadFooterMenu(order);
        }
        $('#module' + (currentPos - 1)).removeClass('leftPageJssor');
        $('#module' + currentPos).removeClass('currentPageJssor').removeClass('currentPageJssor').addClass('leftPageJssor');
        $('#module' + (currentPos + 1)).removeClass('nextPageJssor').removeClass('leftPageJssor').addClass('currentPageJssor');
        $('#module' + (currentPos + 2)).removeClass('currentPageJssor').removeClass('leftPageJssor').addClass('nextPageJssor');
    }
    function prevJssor(currentPos) {
        $('#module' + currentPos).removeClass('currentPageJssor').removeClass('leftPageJssor').addClass('nextPageJssor');
        $('#module' + (currentPos - 1)).removeClass('leftPageJssor').removeClass('nextPageJssor').addClass('currentPageJssor');
        $('#module' + (currentPos - 2)).removeClass('currentPageJssor').removeClass('nextPageJssor').addClass('leftPageJssor');
    }
    function LoadFooterMenu(CurrenPos)
    {
        //debugger;
        for (var i = 1; i <= CurrenPos; i++)
        {
            $('#lit' + i).show();            
        }
    }

    function LoadTile(currPos)
    {
        
        $('#moduleOrder' + (currPos + 1)).addClass('selectedModule').siblings().removeClass('selectedModule');       
        if (currPos == -1) {
            $(".modImg1").addClass('selected').siblings('li').removeClass('selected');
            $('.modImg1').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product1h.png');
            $('.modImg2').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2.png');
            $('.modImg3').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3.png');
            $('.modImg4').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4.png');
            $('.modImg5').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5.png');
            
        }
        if (currPos == 0) {
            $(".modImg2").addClass('selected').siblings('li').removeClass('selected');
            $('.modImg2').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2h.png');
            $('.modImg1').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product1.png');
            $('.modImg3').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3.png');
            $('.modImg4').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4.png');
            $('.modImg5').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5.png');
        }
        if (currPos == 1) {
            $(".modImg3").addClass('selected').siblings('li').removeClass('selected');
            $('.modImg3').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3h.png');
            $('.modImg1').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product1.png');
            $('.modImg2').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2.png');
            $('.modImg4').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4.png');
            $('.modImg5').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5.png');
        }
        if (currPos == 2) {
            $(".modImg4").addClass('selected').siblings('li').removeClass('selected');
            $('.modImg4').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4h.png');
            $('.modImg1').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product1.png');
            $('.modImg2').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2.png');
            $('.modImg3').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3.png');
            $('.modImg5').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5.png');
        }
        if (currPos == 3) {
            $(".modImg5").addClass('selected').siblings('li').removeClass('selected');
            $('.modImg5').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5h.png');
            $('.modImg1').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product1.png');
            $('.modImg2').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2.png');
            $('.modImg3').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3.png');
            $('.modImg4').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4.png');
            
        }
        if (currPos == 4) {
            $(".modImg5").removeClass('selected');
            $('.modImg1').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product1.png');
            $('.modImg2').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2.png');
            $('.modImg3').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3.png');
            $('.modImg4').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4.png');
            $('.modImg5').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5.png');
            $('.jssora13r').hide();
        }
    }

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


    $("#btnSubmitManSign").on('click', function () {
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
        //debugger;
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
            url: '/TechnicalFeedback/CompleteManagerFeedback',
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