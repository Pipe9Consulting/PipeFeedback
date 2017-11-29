$(document).ready(function () {
    LoadScale();
    selffeedback.LoadSliders();
  


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

    //if (screen.width >= 2000) { document.write('<style>body{zoom:125%;}</style>'); }

    var jssor_1_options = {
        $AutoPlay: false,
        $SlideWidth: 800,
        $Loop: 0,
        $StartIndex: (parseInt($('#lastModuleOrder').val()) == 0) ? 0 : parseInt($('#lastModuleOrder').val()) - 1,
        $Cols: 2,
        $Align: 120,
        SlideSpacing: 0,
        $DragOrientation: 0,
        $ArrowNavigatorOptions: {
            $Class: $JssorArrowNavigator$,
            $Steps: 1
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
            refSize = Math.min(refSize, 2000);
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

    LoadTile(parseInt($('#lastModuleOrder').val()) - 2);
    if (parseInt(jssor_1_slider.$CurrentIndex()) == -1 && $('#lastModuleOrder').val() == 0) {
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
        $('#module' + (parseInt($('#lastModuleOrder').val())-1)).removeClass('currentPageJssor').removeClass('nextPageJssor').addClass('leftPageJssor');
    }
    if (parseInt(jssor_1_slider.$CurrentIndex()) == 4) {
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
                $('#module' + (index + 1)).removeClass('currentPageJssor').removeClass('leftPageJssor').addClass('nextPageJssor');
                $('#module' + (index)).removeClass('leftPageJssor').removeClass('nextPageJssor').addClass('currentPageJssor');
                $('#module' + (index - 1)).removeClass('currentPageJssor').removeClass('nextPageJssor').addClass('leftPageJssor');
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
            //if (parseInt(jssor_1_slider.$CurrentIndex()) == 0) {
            //    $(".modImg2").addClass('selected').siblings('li').removeClass('selected');
            //    $('.modImg1').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product1.png');
            //    $('.modImg2').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2h.png');
            //}
            //if (parseInt(jssor_1_slider.$CurrentIndex()) == 1) {
            //    $(".modImg3").addClass('selected').siblings('li').removeClass('selected');
            //    $('.modImg2').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product2.png');
            //    $('.modImg3').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3h.png');
            //}
            //if (parseInt(jssor_1_slider.$CurrentIndex()) == 2) {
            //    $(".modImg4").addClass('selected').siblings('li').removeClass('selected');
            //    $('.modImg3').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product3.png');
            //    $('.modImg4').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4h.png');
            //}
            //if (parseInt(jssor_1_slider.$CurrentIndex()) == 3) {
            //    $(".modImg5").addClass('selected').siblings('li').removeClass('selected');
            //    $('.modImg4').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product4.png');
            //    $('.modImg5').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5h.png');
            //}
            //if (parseInt(jssor_1_slider.$CurrentIndex()) == 4) {
            //    $(".modImg5").removeClass('selected');
            //    $('.modImg5').find('img').attr('src', '../Images/icons/AzureInfraTsp-Product5.png');
            //    $('.jssora13r').hide();
            //}
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


    $('.poemodule li').on('click', function () {
        var index = parseInt($(this).attr('data-order'));
        var lastModuleOrder = parseInt($('#lastModuleOrder').val());
        if (lastModuleOrder >= (index + 1)) {
            LoadTile(index - 1);
            jssor_1_slider.$GoTo((index));
            for (var i = 1; i <= 6; i++) {
                $('#module' + i).removeClass('currentPageJssor').removeClass('leftPageJssor').removeClass('nextPageJssor');
            }
            $('#module' + (index)).addClass('select_core' + (index));
            $('#module' + (index+2)).removeClass('currentPageJssor').removeClass('leftPageJssor').addClass('nextPageJssor');
            $('#module' + (index + 1)).removeClass('leftPageJssor').removeClass('nextPageJssor').addClass('currentPageJssor');
            $('#module' + (index)).removeClass('currentPageJssor').removeClass('nextPageJssor').addClass('leftPageJssor');
        }
        if (index == 0) {
            $('.jssora13l').hide();
        } else {
            $('.jssora13l').show();
        }
    });

    function LoadFooterMenu(CurrenPos) {        
        for (var i = 1; i <= CurrenPos; i++) {
            $('#lit' + i).show();
        }
    }
    function LoadTile(currPos) {
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


    $("#btnSubmitSign").on('click', function () {
        //debugger;
        if (validateIntial()) {
            //$("#completeModal").show();
            $("#completeModal").modal('show');
        }
    });
    $("#btnCompleteOk").on('click', function () {       
        //debugger;
        $("#completeModal").modal('hide');
        Common.ajaxsync({
            url: '../../TechnicalFeedback/CompleteTakeFeedback',
            data: { fbinitial: $('#fbinitial').val() },
            success: function (response) {
                // alert(response);
                //debugger;
                var result = $('#resultmode').val();               
                if (result == "True") {
                    window.location = "../../Home/Start";
                } else {
                    window.location = "../../Results/Results";
                }
            },
            error: function (err) {
            }
        });
       // completeFeedback();       
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


    function completeFeedback() {       
       
    }   

});



var selffeedback = {
    LoadSliders: function () {
        var questionCount = parseInt(43);
        for (var i = 0; i < questionCount; i++) {
            var freqency = selffeedback.loadSelectedAnswer({ data: { 'feedbackId': 0, 'questionId': parseInt($("#freqScale" + (i + 1)).attr('data-questionId')) } });
            $("#freqScale" + (i + 1)).attr("data-answer", freqency);

            if (freqency != 0) {
                $("#freqScale" + (i + 1)).find('.freqbtn' + freqency).click();
            }
        }
    },
    saveQuestionData: function (answer, importance, questionId) {
        var savePOEResultRequests = [];
        var savePOEResultRequest = new Requests.SavePOEResultRequest();
        savePOEResultRequest.Answer = parseInt(answer);
        savePOEResultRequest.AnswerType = 1;
        savePOEResultRequest.ModuleNumber = parseInt($('.selected').attr('data-moduleid'));
        savePOEResultRequest.QuestionId = parseInt(questionId);
        savePOEResultRequest.Comment = null;
        savePOEResultRequest.FeedbackStatus = 1;
        savePOEResultRequest.CapabilityAnswer = parseInt(0);
        savePOEResultRequest.UserRating = parseInt(importance);
        savePOEResultRequest.Notes = 0;
        savePOEResultRequest.Subject = '';

        savePOEResultRequests.push(savePOEResultRequest);
        selffeedback.saveResults(savePOEResultRequests);
    },
    saveResults: function (request) {
        Common.ajaxSyncPost({
            url: '/Feedback/SaveTakePOEResult',
            data: request,
            success: function (response) {
            },
            error: function (err) {
                //window.location = "../Home/ErrorMsg";
            }
        });
        
    },
    loadSelectedAnswer: function (option) {
        //debugger;
        $('#selectedanswer').val(0);
        Common.ajaxsync({
            url: "/Feedback/GetGivenAnswer",
            data: option.data,
            success: function (response) {
                //debugger;
                $('#selectedanswer').val(response.Answer > 4 || response == 0 ? 0 : response.Answer);
                //$('#selectedNotes').val(response.Notes);
            },
            error: function (err) {
            }
        });
        return parseInt($('#selectedanswer').val());
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
        selffeedback.saveQuestionData($(this).parents('.freqscale_bg').attr("data-answer"), $(this).parents('.freqscale_bg').attr("data-important"), $(this).parents('.freqscale_bg').attr("data-questionId"));
    });

    $('.freqbtn2').click(function () {
        $(this).parents('.freqscale_bg').attr("data-answer", 2);
        $(this).parents('.freqscale_bg').find(".freqadddiv").addClass("freqscaleover2");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").addClass("freqscale_handle2");
        $(this).parents('.freqscale_bg').find(".freqbtn2").addClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqbtn1, .freqbtn3, .freqbtn4").removeClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqadddiv").removeClass("freqscaleover1").removeClass("freqscaleover3").removeClass("freqscaleover4");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").removeClass("freqscale_handle1").removeClass("freqscale_handle3").removeClass("freqscale_handle4");
        selffeedback.saveQuestionData($(this).parents('.freqscale_bg').attr("data-answer"), $(this).parents('.freqscale_bg').attr("data-important"), $(this).parents('.freqscale_bg').attr("data-questionId"));
    });

    $('.freqbtn3').click(function () {
        $(this).parents('.freqscale_bg').attr("data-answer", 3);
        $(this).parents('.freqscale_bg').find(".freqadddiv").addClass("freqscaleover3");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").addClass("freqscale_handle3");
        $(this).parents('.freqscale_bg').find(".freqbtn3").addClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqbtn1, .freqbtn2, .freqbtn4").removeClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqadddiv").removeClass("freqscaleover1").removeClass("freqscaleover2").removeClass("freqscaleover4");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").removeClass("freqscale_handle1").removeClass("freqscale_handle2").removeClass("freqscale_handle4");
        selffeedback.saveQuestionData($(this).parents('.freqscale_bg').attr("data-answer"), $(this).parents('.freqscale_bg').attr("data-important"), $(this).parents('.freqscale_bg').attr("data-questionId"));
    });

    $('.freqbtn4').click(function () {
        $(this).parents('.freqscale_bg').attr("data-answer", 4);
        $(this).parents('.freqscale_bg').find(".freqadddiv").addClass("freqscaleover4");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").addClass("freqscale_handle4");
        $(this).parents('.freqscale_bg').find(".freqbtn4").addClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqbtn1, .freqbtn2, .freqbtn3").removeClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqadddiv").removeClass("freqscaleover1").removeClass("freqscaleover2").removeClass("freqscaleover3");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").removeClass("freqscale_handle1").removeClass("freqscale_handle2").removeClass("freqscale_handle3");
        selffeedback.saveQuestionData($(this).parents('.freqscale_bg').attr("data-answer"), $(this).parents('.freqscale_bg').attr("data-important"), $(this).parents('.freqscale_bg').attr("data-questionId"));
    });

}