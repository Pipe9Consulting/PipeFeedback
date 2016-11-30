$(document).click(function (event) {
    //if ($(event.target).parents().index($('.row')) == -1) {
    if ($(event.target).parents('.row').index() == -1) {
        if ($('.firstid, .secondid, .thirdid, .forthid').is(":visible")) {
            $(".firstid, .secondid, .thirdid, .forthid").hide();
        }
    }
});
$(document).ready(function () {
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $('#errmsg').html('');
    goal.loadAssignees();
    goal.loadPoeName();
    goal.loadpoemodules();
    $('#poemodule li').live('click', function () {
        //$("#status").fadeIn();
        var ctrl = $(this);
        var excellenceIndicatorCount = $('#modquestionlist').find('.eilist').length;
        $("#status,#preloader").delay(100).fadeIn("slow", function () {
            if (goal.validateslidechange(excellenceIndicatorCount)) {
                $('#popupcontent').html('You have not assigned/Saved the goal yet');
                $(".popup, .poepopupbg").fadeIn("slow");
            } else {
                ctrl.addClass("selected");
                ctrl.siblings().removeClass("selected");

                goal.loadModuleQuestions(ctrl.val());
            }
        });
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    });
    $('#target ul li').live('click', function () {
        var targetLi = $(this).val();
        var ctrl = $(this);
        var excellenceIndicatorCount = $('#modquestionlist').find('.eilist').length;
        $("#status,#preloader").delay(100).fadeIn("slow", function () {
            if (goal.validateslidechange(excellenceIndicatorCount)) {
                $('#popupcontent').html('You have not assigned/Saved the goal yet');
                $(".popup, .poepopupbg").fadeIn("slow");
            } else {
                $('#li' + targetLi).addClass("selected");
                $('#li' + targetLi).siblings().removeClass("selected");
                goal.loadModuleQuestions(ctrl.val());
            }
        });
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    });

    $(".shareall").live('click', function () {
        var excellenceIndicatorCount = $('#modquestionlist').find('.eilist').length;
        if (goal.validateslidechange(excellenceIndicatorCount)) {
            goal.savegoal(excellenceIndicatorCount);
        }
    });
    $(".pageholder").click(
                function (e) {
                    if ((e.target || e.srcElement).className !== "goalslideholder") {
                    }
                    if ((e.target || e.srcElement).className !== "sharebtn") {
                        $(".vs-context-menu").hide();
                    }
                }
            );
    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
    $('.row,.firstid,.secondid,.thirdid,.forthid').live('click', function (event) {
        //debugger;
        var targetIdValue = parseInt(event.target.id.toString().replace('Qno', ''));
        var id = (targetIdValue == "NaN" ? 0 : targetIdValue);
        var heightValue = $('.scroll2').prop('scrollHeight') + "px";
        if (id > 5) {
            $('.scroll2').slimscroll({ scrollTo: heightValue });
        } else {
            $('.scroll2').slimscroll({ scrollTo: '0px' });
        }
    });
    $('#modquestionlist li').live('click', function (event) {
        //debugger;
        var targetIdValue = parseInt($(this).attr('id').replace('EI', ''));
        var id = (targetIdValue == "NaN" ? 0 : targetIdValue);
        var heightValue = $('.scroll3').prop('scrollHeight') + "px";
        var heightValue1 = $('.scroll2').prop('scrollHeight') + "px";
        if (id > 5) {
            $('.scroll3').slimscroll({ scrollTo: heightValue });
            $('.scroll2').slimscroll({ scrollTo: heightValue1 });
        } else {
            $('.scroll3').slimscroll({ scrollTo: '0px' });
            $('.scroll2').slimscroll({ scrollTo: '0px' });
        }
    });
    $('.scroll1').slimScroll();
    $('.scroll2').slimScroll();
    $('.scroll3').slimScroll();
});
var goal = {
    loadpoemodules: function () {
        Common.ajax({
            url: '../../Feedback/GetPracticeArea',
            success: function (response) {
                var module = "";
                var contextmenu = "<li id='redirectsync'><span><img src='../../Images/icons/sync-small.png'  class='img' /></span><p>Sync</p></li>";
                for (var i = 0; i < response.length; i++) {
                    if (response[i].ModuleOrderNumber > 0) {
                        var img = $('#selectedpoe').val() + response[i].ModuleOrderNumber;
                        module = module + "<li id ='li" + response[i].ModuleId + "' Value=" + response[i].ModuleId + "  data-name=" + response[i].ModuleName + "   class='takesf " + ((response[i].ModuleOrderNumber == 1) ? 'selected' : '') + "'><p>" + response[i].ModuleName + "</p><img src='../../Images/icons/" + img + ".png' width='64' height='50'  class='img' />" + "</li>";
                        contextmenu = contextmenu + "<li id ='contextli" + response[i].ModuleId + "' Value=" + response[i].ModuleId + "  data-name=" + response[i].ModuleName + "  ><span><img src='../../Images/icons/" + img + "-small.png'  class='img' /></span><p>" + response[i].ModuleName + "</p></li>";
                    }
                }
                $('#poemodule').html(module);
                if (response.length - 1 <= 5) {
                    $('#poemodule').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                }
                $('#target ul').html(contextmenu);
                $('#redirectsync').live('click', function () {
                    window.location.href = "/sync/sync";
                });
                var t = $('#poemodule li').first();
                t.addClass('selected');
                goal.loadModuleQuestions(t.val());
            },
            error: function (err) {
            }
        });
    },
    loadModuleQuestions: function (moduleid) {
        $('#selectedmodule').val(moduleid);
        Common.ajax({
            url: '../../Feedback/GetQuestions?moduleId=' + moduleid,
            success: function (response) {
                var ques = (response.length > 5 ? "<div class='scroll2'><ul id='modquestionlist' class='modquestionlist'>" : "<ul id='modquestionlist'>");
                for (var i = 0; i < response.length; i++) {
                    ques = ques + "<li id='EI" + (i + 1) + "' class='eilist' Value=" + response[i].QuestionId + "> <div class='number'> " + (i + 1) + "</div> <p> " + response[i].ShortQuetionText + "</p> </li>";
                    //$('#Qno' + (i + 1)).data("question", response[i].QuestionId);
                }
                ques = (response.length > 5 ? "</ul></div>" : "</ul>") + ques;
                // need to enabled
                $('#excell').find('div').remove();
                $('#excell').find('ul').remove();
                $('#excell').append(ques);
                //if (response.length <= 5) {
                //    $('#modquestionlist').parent('div').removeClass('scroll2');
                //    $('#modquestionlist').parents('.slimScrollDiv').find('.slimScrollBar').remove();
                //    $('#modquestionlist').parents('.slimScrollDiv').find('.slimScrollRail').remove();
                //} else {
                //   $('.scroll2').slimScroll({ height: '425px' });
                //}
                if (response.length > 5) {
                    $('.scroll2').slimScroll();
                    $('#modquestionlist').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                }

                goal.loadsliders(response);
            },
            error: function (err) {
            }
        });
    },
    loadPoeName: function () {
        Common.ajaxsync({
            url: "../../Common/GetPoeName",
            success: function (response) {
                $('#selectedpoe').val(response);
            },
            error: function (err) {
            }
        });
    },
    loadSavedGoals: function (questionid) {
        $('#selectedgoal').val(0);
        Common.ajaxsync({
            url: "/Feedback/GetGoal?moduleid=" + parseInt($('#selectedmodule').val()) + '&quesionid=' + questionid,
            success: function (response) {
                $('#selectedgoal').val(response > 4 ? 0 : response);
            },
            error: function (err) {
            }
        });
        return parseInt($('#selectedgoal').val());
    },
    loadAssignees: function () {
        Common.ajax({
            url: '../../Common/GetMyReceiveFbTeam',
            success: function (response) {
                var html = "";
                for (var i = 0; i < response.length; i++) {
                    html = html + "<li data-value= " + response[i].User.UserId + ">" + response[i].User.FirstName + " " + response[i].User.LastName + "</li>";
                }
                $('#assignees').append(html);
            },
            error: function (err) {
            }
        });
    },
    loadsliders: function (response) {
        var excellenceIndicatorsCount = response.length;
        var sliderContent = (excellenceIndicatorsCount > 5 ? "<div class='scroll3'><div id='quickFeed3'>" : "");
        for (var i = 1; i <= excellenceIndicatorsCount; i++) {
            sliderContent = sliderContent + "<div class='row'><div class='slider'><div id='Qno" + i + "' class='slidebar'><div class='firstid'></div><div id='share1' class='sharebtn'></div>" +
                "<div class='secondid'></div><div id='share2' class='sharebtn'></div><div class='thirdid'></div><div id='share3' class='sharebtn'></div><div class='forthid'></div>" +
                "<div id='share4' class='sharebtn'></div><img src='../Images/slider-bg.png' /></div></div></div>";
        }
        sliderContent = sliderContent + (excellenceIndicatorsCount > 5 ? "</div></div>" : "") + "<div class='row lastrow'><div class='errormsg' id='errmsg'></div><div class='shareall'><p>Set</p></div></div>";
        if (excellenceIndicatorsCount <= 5) {
            //$('.goalmain').find('.row').remove();
            $('.goalmain').contents(':not(".vs-context-menu")').remove();
            $('.goalmain').append(sliderContent);
            $('.sharebtn').vscontext({ menuBlock: 'vs-context-menu' });
        } else {
            //$('.goalmain').find('.row').remove();
            //$('.goalmain').find('.slimScrollDiv').remove();
            //$('.goalmain').find('.lastrow').remove();
            $('.goalmain').contents(':not(".vs-context-menu")').remove();
            $('.goalmain').find('.vs-context-menu').after(sliderContent);
            $('.sharebtn').vscontext({ menuBlock: 'vs-context-menu' });
            $('.scroll3').slimScroll();
            $('#quickFeed3').parents('.slimScrollDiv').find('.slimScrollBar').hide();
        }
        for (var j = 1; j <= excellenceIndicatorsCount; j++) {
            $('#Qno' + j).data("question", response[j - 1].QuestionId);
            $('#Qno' + j).data('assigned', '0');
            $("#Qno" + j).slider({
                min: 0,
                max: 4,
                range: "min",
                value: goal.loadSavedGoals(parseInt($('#EI' + j).val())),
                slide: function (event, ui) {
                    var currentId = parseInt(event.target.id.toString().replace('Qno', ''));
                    $(this).data('changed', true);
                    $(this).data("goal", ui.value);
                    if (ui.value == 0) {
                        $('#EI' + currentId).addClass("select");
                        for (var k = 1; k <= excellenceIndicatorsCount; k++) {
                            if (k != currentId)
                                $('#EI' + k).removeClass("select");

                            $('#Qno' + k + ' .firstid,#Qno' + k + ' .secondid,#Qno' + k + ' .thirdid,#Qno' + k + ' .forthid').hide();
                        }
                    }
                    else if (ui.value == 1) {
                        $('#' + event.target.id + ' .firstid').text("Congratulations on achieving your goal");
                        $('#' + event.target.id + ' .firstid, #' + event.target.id + ' #share1').show();
                        $('#EI' + currentId).addClass("select");
                        for (var l = 1; l <= excellenceIndicatorsCount; l++) {
                            if (l != currentId)
                                $('#EI' + l).removeClass("select");
                            if (l == currentId) {
                                $('#' + event.target.id + ' #share2,#' + event.target.id + ' #share3,#' + event.target.id + ' #share4').hide();
                                $('#' + event.target.id + ' .secondid,#' + event.target.id + ' .thirdid,#' + event.target.id + ' .forthid').hide();
                            } else
                                $('#Qno' + l + ' .firstid,#Qno' + l + ' .secondid,#Qno' + l + ' .thirdid,#Qno' + l + ' .forthid').hide();
                        }
                    }
                    else if (ui.value == 2) {
                        $('#' + event.target.id + ' .secondid').text("You have set to achieve your goal in 6 months");
                        $('#' + event.target.id + ' .secondid,#' + event.target.id + ' #share2').show();
                        $('#EI' + currentId).addClass("select");
                        for (var m = 1; m <= excellenceIndicatorsCount; m++) {
                            if (m != currentId)
                                $('#EI' + m).removeClass("select");
                            if (m == currentId) {
                                $('#' + event.target.id + ' #share1,#' + event.target.id + ' #share3,#' + event.target.id + ' #share4').hide();
                                $('#' + event.target.id + ' .firstid,#' + event.target.id + ' .thirdid,#' + event.target.id + ' .forthid').hide();
                            } else
                                $('#Qno' + m + ' .firstid,#Qno' + m + ' .secondid,#Qno' + m + ' .thirdid,#Qno' + m + ' .forthid').hide();
                        }
                    }
                    else if (ui.value == 3) {
                        $('#' + event.target.id + ' .thirdid').text("You have set to achieve your goal in 12 months");
                        $('#' + event.target.id + ' .thirdid,#' + event.target.id + ' #share3').show();
                        $('#EI' + currentId).addClass("select");
                        for (var n = 1; n <= excellenceIndicatorsCount; n++) {
                            if (n != currentId)
                                $('#EI' + n).removeClass("select");
                            if (n == currentId) {
                                $('#' + event.target.id + ' #share1,#' + event.target.id + ' #share2,#' + event.target.id + ' #share4').hide();
                                $('#' + event.target.id + ' .firstid,#' + event.target.id + ' .secondid,#' + event.target.id + ' .forthid').hide();
                            } else
                                $('#Qno' + n + ' .firstid,#Qno' + n + ' .secondid,#Qno' + n + ' .thirdid,#Qno' + n + ' .forthid').hide();
                        }
                    }
                    else if (ui.value == 4) {
                        $('#' + event.target.id + ' .forthid').text("You have set to achieve your goal in 24 months");
                        $('#' + event.target.id + ' .forthid, #' + event.target.id + ' #share4').show();
                        $('#EI' + currentId).addClass("select");
                        for (var p = 1; p <= excellenceIndicatorsCount; p++) {
                            if (p != currentId)
                                $('#EI' + p).removeClass("select");
                            if (p == currentId) {
                                $('#' + event.target.id + ' #share1,#' + event.target.id + ' #share2,#' + event.target.id + ' #share3').hide();
                                $('#' + event.target.id + ' .firstid,#' + event.target.id + ' .secondid,#' + event.target.id + ' .thirdid').hide();
                            } else
                                $('#Qno' + p + ' .firstid,#Qno' + p + ' .secondid,#Qno' + p + ' .thirdid,#Qno' + p + ' .forthid').hide();
                        }
                    }
                    goal.validateSlideChange(excellenceIndicatorsCount);
                }
            });
        }
        /*
        $("#Qno1").slider({
            min: 0,
            max: 4,
            range: "min",
            value: goal.loadSavedGoals(parseInt($('#EI1').val())),
            slide: function (event, ui) {
                $(this).data('changed', true);
                $(this).data("goal", ui.value);
                if (ui.value == 0) {
                    $('#EI1').addClass("select");
                    $('#EI2,#EI3,#EI4,#EI5').removeClass("select");
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                else if (ui.value == 1) {
                    $('#Qno1 .firstid').text("Congratulations on achieving your goal");
                    $('#Qno1 .firstid, #Qno1 #share1').show();
                    $('#EI1').addClass("select");
                    $('#EI2,#EI3,#EI4,#EI5').removeClass("select");
                    $('#Qno1 #share2,#Qno1 #share3,#Qno1 #share4,#Qno1 #share5').hide();
                    $('#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                else if (ui.value == 2) {
                    $('#Qno1 .secondid').text("You have set to achieve your goal in 6 months");
                    $('#Qno1 .secondid,#Qno1 #share2').show();
                    $('#EI1').addClass("select");
                    $('#EI2,#EI3,#EI4,#EI5').removeClass("select");
                    $('#Qno1 #share1,#Qno1 #share3,#Qno1 #share4,#Qno1 #share5').hide();
                    $('#Qno1 .firstid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                else if (ui.value == 3) {
                    $('#Qno1 .thirdid').text("You have set to achieve your goal in 12 months");
                    $('#Qno1 .thirdid,#Qno1 #share3').show();
                    $('#EI1').addClass("select");
                    $('#EI2,#EI3,#EI4,#EI5').removeClass("select");
                    $('#Qno1 #share1,#Qno1 #share2,#Qno1 #share4,#Qno1 #share5').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                else if (ui.value == 4) {
                    $('#Qno1 .forthid').text("You have set to achieve your goal in 24 months");
                    $('#Qno1 .forthid, #Qno1 #share4').show();
                    $('#EI1').addClass("select");
                    $('#EI2,#EI3,#EI4,#EI5').removeClass("select");
                    $('#Qno1 #share1,#Qno1 #share2,#Qno1 #share3,#Qno1 #share5').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                goal.validateSlideChange(excellenceIndicatorsCount);
            }
        });
        $("#Qno2").slider({
            min: 0,
            max: 4,
            range: "min",
            value: goal.loadSavedGoals(parseInt($('#EI2').val())),
            slide: function (event, ui) {
                $(this).data('changed', true);
                $(this).data("goal", ui.value);
                if (ui.value == 0) {
                    $('#EI2').addClass("select");
                    $('#EI1,#EI3,#EI4,#EI5').removeClass("select");
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                else if (ui.value == 1) {
                    $('#Qno2 .firstid').text("Congratulations on achieving your goal");
                    $('#Qno2 .firstid, #Qno2 #share1').show();
                    $('#EI2').addClass("select");
                    $('#EI1,#EI3,#EI4,#EI5').removeClass("select");
                    $('#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno2 #share2,#Qno2 #share3,#Qno2 #share4').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                else if (ui.value == 2) {
                    $('#Qno2 .secondid').text("You have set to achieve your goal in 6 months");
                    $('#Qno2 .secondid, #Qno2 #share2').show();
                    $('#Qno2 .firstid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno2 #share1,#Qno2 #share3,#Qno2 #share4').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                else if (ui.value == 3) {
                    $('#Qno2 .thirdid').text("You have set to achieve your goal in 12 months");
                    $('#Qno2 .thirdid,#Qno2 #share3').show();
                    $('#EI2').addClass("select");
                    $('#EI1,#EI3,#EI4,#EI5').removeClass("select");
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .forthid').hide();
                    $('#Qno2 #share1,#Qno2 #share2,#Qno2 #share4').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                else if (ui.value == 4) {
                    $('#Qno2 .forthid').text("You have set to achieve your goal in 24 months");
                    $('#Qno2 .forthid,#Qno2 #share4').show();
                    $('#EI2').addClass("select");
                    $('#EI1,#EI3,#EI4,#EI5').removeClass("select");
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid').hide();
                    $('#Qno2 #share1,#Qno2 #share2,#Qno2 #share3').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                goal.validateSlideChange(excellenceIndicatorsCount);
            }
        });
        $("#Qno3").slider({
            min: 0,
            max: 4,
            range: "min",
            value: goal.loadSavedGoals(parseInt($('#EI3').val())),
            slide: function (event, ui) {
                $(this).data('changed', true);
                $(this).data("goal", ui.value);
                if (ui.value == 0) {
                    $('#EI3').addClass("select");
                    $('#EI1,#EI2,#EI4,#EI5').removeClass("select");
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                } else if (ui.value == 1) {
                    $('#Qno3 .firstid').text("Congratulations on achieving your goal");
                    $('#Qno3 .firstid, #Qno3 #share1').show();
                    $('#EI3').addClass("select");
                    $('#EI1,#EI2,#EI4,#EI5').removeClass("select");
                    $('#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno3 #share2,#Qno3 #share3,#Qno3 #share4').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                else if (ui.value == 2) {
                    $('#Qno3 .secondid').text("You have set to achieve your goal in 6 months");
                    $('#Qno3 .secondid,#Qno3 #share2').show();
                    $('#EI3').addClass("select");
                    $('#EI1,#EI2,#EI4,#EI5').removeClass("select");
                    $('#Qno3 .firstid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno3 #share1,#Qno3 #share3,#Qno3 #share4').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                else if (ui.value == 3) {
                    $('#Qno3 .thirdid').text("You have set to achieve your goal in 12 months");
                    $('#Qno3 .thirdid,#Qno3 #share3').show();
                    $('#EI3').addClass("select");
                    $('#EI1,#EI2,#EI4,#EI5').removeClass("select");
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .forthid').hide();
                    $('#Qno3 #share1,#Qno3 #share2,#Qno3 #share4').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                else if (ui.value == 4) {
                    $('#Qno3 .forthid').text("You have set to achieve your goal in 24 months");
                    $('#Qno3 .forthid,#Qno3 #share4').show();
                    $('#EI3').addClass("select");
                    $('#EI1,#EI2,#EI4,#EI5').removeClass("select");
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid').hide();
                    $('#Qno3 #share1,#Qno3 #share2,#Qno3 #share3').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                goal.validateSlideChange(excellenceIndicatorsCount);
            }
        });
        $("#Qno4").slider({
            min: 0,
            max: 4,
            range: "min",
            value: goal.loadSavedGoals(parseInt($('#EI4').val())),
            slide: function (event, ui) {
                $(this).data('changed', true);
                $(this).data("goal", ui.value);
                if (ui.value == 0) {
                    $('#EI4').addClass("select");
                    $('#EI1,#EI2,#EI3,#EI5').removeClass("select");
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                } else if (ui.value == 1) {
                    $('#Qno4 .firstid').text("Congratulations on achieving your goal");
                    $('#Qno4 .firstid, #Qno4 #share1').show();
                    $('#EI4').addClass("select");
                    $('#EI1,#EI2,#EI3,#EI5').removeClass("select");
                    $('#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno4 #share2,#Qno4 #share3,#Qno4 #share4').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                else if (ui.value == 2) {
                    $('#Qno4 .secondid').text("You have set to achieve your goal in 6 months");
                    $('#Qno4 .secondid,#Qno4 #share2').show();
                    $('#EI4').addClass("select");
                    $('#EI1,#EI2,#EI3,#EI5').removeClass("select");
                    $('#Qno4 .firstid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno4 #share1,#Qno4 #share3,#Qno4 #share4').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                else if (ui.value == 3) {
                    $('#Qno4 .thirdid').text("You have set to achieve your goal in 12 months");
                    $('#Qno4 .thirdid,#Qno4 #share3').show();
                    $('#EI4').addClass("select");
                    $('#EI1,#EI2,#EI3,#EI5').removeClass("select");
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .forthid').hide();
                    $('#Qno4 #share1,#Qno4 #share2,#Qno4 #share4').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                else if (ui.value == 4) {
                    $('#Qno4 .forthid').text("You have set to achieve your goal in 24 months");
                    $('#Qno4 .forthid,#Qno4 #share4').show();
                    $('#EI4').addClass("select");
                    $('#EI1,#EI2,#EI3,#EI5').removeClass("select");
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid').hide();
                    $('#Qno4 #share1,#Qno4 #share2,#Qno4 #share3').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                goal.validateSlideChange(excellenceIndicatorsCount);
            }
        });
        $("#Qno5").slider({
            min: 0,
            max: 4,
            range: "min",
            value: goal.loadSavedGoals(parseInt($('#EI5').val())),
            slide: function (event, ui) {
                $(this).data('changed', true);
                $(this).data("goal", ui.value);
                if (ui.value == 0) {
                    $('#EI5').addClass("select");
                    $('#EI1,#EI2,#EI3,#EI4').removeClass("select");
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                } else if (ui.value == 1) {
                    $('#Qno5 .firstid').text("Congratulations on achieving your goal");
                    $('#Qno5 .firstid,#Qno5 #share1').show();
                    $('#EI5').addClass("select");
                    $('#EI1,#EI2,#EI3,#EI4').removeClass("select");
                    $('#Qno5 .secondid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno5 #share2,#Qno5 #share3,#Qno5 #share4').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                else if (ui.value == 2) {
                    $('#Qno5 .secondid').text("You have set to achieve your goal in 6 months");
                    $('#Qno5 .secondid,#Qno5 #share2').show();
                    $('#EI5').addClass("select");
                    $('#EI1,#EI2,#EI3,#EI4').removeClass("select");
                    $('#Qno5 .firstid,#Qno5 .thirdid,#Qno5 .forthid').hide();
                    $('#Qno5 #share1,#Qno5 #share3,#Qno5 #share4').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                else if (ui.value == 3) {
                    $('#Qno5 .thirdid').text("You have set to achieve your goal in 12 months");
                    $('#Qno5 .thirdid,#Qno5 #share3').show();
                    $('#EI5').addClass("select");
                    $('#EI1,#EI2,#EI3,#EI4').removeClass("select");
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .forthid').hide();
                    $('#Qno5 #share1,#Qno5 #share2,#Qno5 #share4').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                else if (ui.value == 4) {
                    $('#Qno5 .forthid').text("You have set to achieve your goal in 24 months");
                    $('#Qno5 .forthid,#Qno5 #share4').show();
                    $('#EI5').addClass("select");
                    $('#EI1,#EI2,#EI3,#EI4').removeClass("select");
                    $('#Qno5 .firstid,#Qno5 .secondid,#Qno5 .thirdid').hide();
                    $('#Qno5 #share1,#Qno5 #share2,#Qno5 #share3').hide();
                    $('#Qno1 .firstid,#Qno1 .secondid,#Qno1 .thirdid,#Qno1 .forthid').hide();
                    $('#Qno2 .firstid,#Qno2 .secondid,#Qno2 .thirdid,#Qno2 .forthid').hide();
                    $('#Qno3 .firstid,#Qno3 .secondid,#Qno3 .thirdid,#Qno3 .forthid').hide();
                    $('#Qno4 .firstid,#Qno4 .secondid,#Qno4 .thirdid,#Qno4 .forthid').hide();
                    $('#Qno6 .firstid,#Qno6 .secondid,#Qno6 .thirdid,#Qno6 .forthid').hide();
                }
                goal.validateSlideChange(excellenceIndicatorsCount);
            }
        });
        */
    },
    validateassigneechange: function (excellenceIndicatorsCount) {
        var count1 = 0;
        for (var i = 1; i <= excellenceIndicatorsCount; i++) {
            if ($('#Qno' + i).data('changed') != undefined) {
                if ($('#Qno' + i).data('assigned') == undefined) {
                    count1++;
                }
            }
        }
        /*
        if ($('#Qno1').data('changed') != undefined) {
            if ($('#Qno1').data('assigned') == undefined) {
                count1++;
            }
        }
        if ($('#Qno2').data('changed') != undefined) {
            if ($('#Qno2').data('assigned') == undefined) {
                count1++;
            }
        }
        if ($('#Qno3').data('changed') != undefined) {
            if ($('#Qno3').data('assigned') == undefined) {
                count1++;
            }
        }
        if ($('#Qno4').data('changed') != undefined) {
            if ($('#Qno4').data('assigned') == undefined) {
                count1++;
            }
        }
        if ($('#Qno5').data('changed') != undefined) {
            if ($('#Qno5').data('assigned') == undefined) {
                count1++;
            }
        }
        */
        if (count1 != 0) {
            var tempcount = count1;
            var errormsg = '';
            for (var j = 1; j <= excellenceIndicatorsCount; j++) {
                if ($('#Qno' + j).data('changed') != undefined) {
                    if ($('#Qno' + j).data('assigned') == undefined) {
                        errormsg = errormsg + j.toString();
                        tempcount--;
                        if (tempcount == 1) {
                            errormsg = errormsg + " & ";
                        }
                        else if (tempcount > 1) {
                            errormsg = errormsg + ", ";
                        }
                    }
                }
            }
            /*
            if ($('#Qno1').data('changed') != undefined) {
                if ($('#Qno1').data('assigned') == undefined) {
                    errormsg = errormsg + "1";
                    tempcount--;
                    if (tempcount == 1) {
                        errormsg = errormsg + " & ";
                    }
                    else if (tempcount > 1) {
                        errormsg = errormsg + ", ";
                    }
                }
            }
            if ($('#Qno2').data('changed') != undefined) {
                if ($('#Qno2').data('assigned') == undefined) {
                    errormsg = errormsg + "2";
                    tempcount--;
                    if (tempcount == 1) {
                        errormsg = errormsg + " & ";
                    }
                    else if (tempcount > 1) {
                        errormsg = errormsg + ", ";
                    }
                }
            }
            if ($('#Qno3').data('changed') != undefined) {
                if ($('#Qno3').data('assigned') == undefined) {
                    errormsg = errormsg + "3";
                    tempcount--;
                    if (tempcount == 1) {
                        errormsg = errormsg + " & ";
                    }
                    else if (tempcount > 1) {
                        errormsg = errormsg + ", ";
                    }
                }
            }
            if ($('#Qno4').data('changed') != undefined) {
                if ($('#Qno4').data('assigned') == undefined) {
                    errormsg = errormsg + "4";
                    tempcount--;
                    if (tempcount == 1) {
                        errormsg = errormsg + " & ";
                    }
                    else if (tempcount > 1) {
                        errormsg = errormsg + ", ";
                    }
                }
            }
            if ($('#Qno5').data('changed') != undefined) {
                if ($('#Qno5').data('assigned') == undefined) {
                    errormsg = errormsg + "5";
                    tempcount--;
                    if (tempcount == 1) {
                        errormsg = errormsg + " & ";
                    }
                    else if (tempcount > 1) {
                        errormsg = errormsg + ", ";
                    }
                }
            }
            */
            $('#errmsg').html('You have not shared your goal(s) for Excellence Action ' + errormsg + '. Please share your goal with someone by clicking on <img src="../../Images/icons/share-gray.png" />. If you do not wish to share your goal with anyone, please choose "None".');
            $('#popupcontent').html('  <div class="popupcontentinner"><div class="popupcontentinnertxt">You have not shared your goal(s) for Excellence Action ' + errormsg + '. Please share your goal with someone by clicking on <img src="../../Images/icons/share-gray.png" />. If you do not wish to share your goal with anyone, please choose "None".</div></div>');
            //$('#popupcontent').html('You have not assigned goal for&nbsp' + count1 + ' excellence indicators ');
            $(".popup, .poepopupbg").fadeIn("slow");
            return false;
        } else {
            return true;
        }
    },
    validateslidechange: function (excellenceIndicatorsCount) {
        var count = 0;
        for (var i = 1; i <= excellenceIndicatorsCount; i++) {
            if ($('#Qno' + i).data('changed') != undefined) {
                count++;
            }
        }
        /*
        if ($('#Qno1').data('changed') != undefined) {
            count++;
        }
        if ($('#Qno2').data('changed') != undefined) {
            count++;
        }
        if ($('#Qno3').data('changed') != undefined) {
            count++;
        }
        if ($('#Qno4').data('changed') != undefined) {
            count++;
        }
        if ($('#Qno5').data('changed') != undefined) {
            count++;
        }
        */
        if (count != 0) {
            return true;
        } else {
            return false;
        }
    },
    validateSlideChange: function (excellenceIndicatorsCount) {
        var count1 = 0;
        for (var i = 1; i <= excellenceIndicatorsCount; i++) {
            if ($('#Qno' + i).data('changed') != undefined) {
                if ($('#Qno' + i).data('assigned') == undefined) {
                    count1++;
                }
            }
        }
        /*
        if ($('#Qno1').data('changed') != undefined) {
            if ($('#Qno1').data('assigned') == undefined) {
                count1++;
            }
        }
        if ($('#Qno2').data('changed') != undefined) {
            if ($('#Qno2').data('assigned') == undefined) {
                count1++;
            }
        }
        if ($('#Qno3').data('changed') != undefined) {
            if ($('#Qno3').data('assigned') == undefined) {
                count1++;
            }
        }
        if ($('#Qno4').data('changed') != undefined) {
            if ($('#Qno4').data('assigned') == undefined) {
                count1++;
            }
        }
        if ($('#Qno5').data('changed') != undefined) {
            if ($('#Qno5').data('assigned') == undefined) {
                count1++;
            }
        }
        */
        if (count1 != 0) {
            var tempcount = count1;
            var errormsg = '';
            for (var j = 1; j <= excellenceIndicatorsCount; j++) {
                if ($('#Qno' + j).data('changed') != undefined) {
                    if ($('#Qno' + j).data('assigned') == undefined) {
                        errormsg = errormsg + j.toString();
                        tempcount--;
                        if (tempcount == 1) {
                            errormsg = errormsg + " & ";
                        } else if (tempcount > 1) {
                            errormsg = errormsg + ", ";
                        }
                    }
                }
            }
            /*
            if ($('#Qno1').data('changed') != undefined) {
                if ($('#Qno1').data('assigned') == undefined) {
                    errormsg = errormsg + "1";
                    tempcount--;
                    if (tempcount == 1) {
                        errormsg = errormsg + " & ";
                    } else if (tempcount > 1) {
                        errormsg = errormsg + ", ";
                    }
                }
            }
            if ($('#Qno2').data('changed') != undefined) {
                if ($('#Qno2').data('assigned') == undefined) {
                    errormsg = errormsg + "2";
                    tempcount--;
                    if (tempcount == 1) {
                        errormsg = errormsg + " & ";
                    } else if (tempcount > 1) {
                        errormsg = errormsg + ", ";
                    }
                }
            }
            if ($('#Qno3').data('changed') != undefined) {
                if ($('#Qno3').data('assigned') == undefined) {
                    errormsg = errormsg + "3";
                    tempcount--;
                    if (tempcount == 1) {
                        errormsg = errormsg + " & ";
                    } else if (tempcount > 1) {
                        errormsg = errormsg + ", ";
                    }
                }
            }
            if ($('#Qno4').data('changed') != undefined) {
                if ($('#Qno4').data('assigned') == undefined) {
                    errormsg = errormsg + "4";
                    tempcount--;
                    if (tempcount == 1) {
                        errormsg = errormsg + " & ";
                    } else if (tempcount > 1) {
                        errormsg = errormsg + ", ";
                    }
                }
            }
            if ($('#Qno5').data('changed') != undefined) {
                if ($('#Qno5').data('assigned') == undefined) {
                    errormsg = errormsg + "5";
                    tempcount--;
                    if (tempcount == 1) {
                        errormsg = errormsg + " & ";
                    } else if (tempcount > 1) {
                        errormsg = errormsg + ", ";
                    }
                }
            }
            */
            $('#errmsg').html('You have not shared your goal(s) for Excellence Action ' + errormsg + '. Please share your goal with someone by clicking on <img src="../../Images/icons/share-gray.png" />. If you do not wish to share your goal with anyone, please choose "None".');
        } else {
            $('#errmsg').html('');
        }
    },
    savegoal: function (excellenceIndicatorCount) {
        if (goal.validateassigneechange(excellenceIndicatorCount)) {
            var goalRequests = [];
            var goalRequest = new Requests.GoalShare();
            $('#errmsg').html('');
            for (var j = 0; j <= excellenceIndicatorCount; j++) {
                if ($('#Qno' + j).data('changed') != undefined) {
                    goalRequest = new Requests.GoalShare();
                    goalRequest.QuestionId = parseInt(($('#Qno' + j).data('question')));
                    goalRequest.SelectedValue = parseInt(($('#Qno' + j).data('goal')));
                    goalRequest.SharedWithId = parseInt(($('#Qno' + j).data('assigned')));
                    goalRequests.push(goalRequest);
                }
            }
           
            $('#popupcontent').html('Your goals have been shared with everyone you have assigned');
            $(".popup, .poepopupbg").fadeIn("slow");
            Common.ajaxPost({
                url: '/Feedback/SaveGoal',
                data: goalRequests,
                success: function (response) {
                    for (var i = 1; i <= excellenceIndicatorCount; i++) {
                        //if ($('#Qno' + i).data('changed') != undefined)
                        //    $('#Qno' + i).removeData('assigned');
                        $('#Qno' + i).removeData('changed');
                        //  $('#Qno' + i).removeData('goal');
                    }
                },
                error: function (err) {
                }
            });
        }
    }
}