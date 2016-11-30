var details_feedback = {
    //Load Questions
    loadDetailViewPAQuestions: function (option) {
        Common.ajax({
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
                $('#prevdv').hide();
                $('#questionindetail').html("");
                var questionNo = parseInt(0);
                $('#nextdv').unbind('click');
                $('#nextdv').die('click');
                $('#modulequestions').val(JSON.stringify(response));
                $('#moduleid').val(option.data.moduleId);
                $('#nextdv').live('click', function () {
                    $('#prevdv').show();
                    questionNo = parseInt($('#currentQuestionorder').val()) + 1;
                    if (questionNo <= 5) {
                        details_feedback.saveModuleData();
                    }
                    if (questionNo < 5) {
                        $('#question1').val(questionNo);
                        $('#Qno1').prev('P').remove();
                        $('.TsfQno p').remove();
                        $('#Qtext').html(response[questionNo].QuetionText);
                        $('#currentQuestionorder').val(questionNo);
                        $('#currentQuestionno').val(questionNo + 1);
                        $('#questionindetail').html(response[questionNo].SideBarTitle);
                        $('.TsfQno').html((questionNo + 1));
                        $('#Qno1').data("question", response[questionNo].QuestionId);
                        $('#Qno1').data("moduleid", option.data.moduleId);
                        details_feedback.loadCompletedQuestionCount();

                        details_feedback.loaddetailslider();
                    } else {
                        //
                        var totalmodules = $('#totalmodules').val();
                        var currentmoduleOrder = $('#currentmoduleOrder').val();
                        if (totalmodules != currentmoduleOrder) {
                            questionNo = parseInt(0);
                            $('#currentQuestionno').val(1);
                            $('#currentQuestionorder').val(0);
                            var curmod = parseInt($('#currentmoduleOrder').val());
                            var nextmod = curmod + 1;

                            details_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': $('#module' + nextmod).val() }, moduleorder: nextmod });
                            details_feedback.loadPoeContent({ url: '../../Feedback/GetModuleIntoContent', data: { 'moduleId': (parseInt(nextmod) - 1)} }, '#moduleintro');
                            details_feedback.loadPoeContent({ url: '../../Feedback/GetModuleKeyAction', data: { 'moduleId': (parseInt(nextmod) - 1)} }, '#modulekeyaction');
                            details_feedback.loaddetailslider();
                            $('#currentmoduleOrder').val(nextmod);
                            $('#li' + (parseInt(curmod) - 1)).removeClass('act');
                            $('#li' + (parseInt(nextmod) - 1)).addClass('act');
                            details_feedback.loadCompletedPracticeArea($('#module' + curmod).val(), (parseInt(curmod) - 1));
                        } else {
                            details_feedback.loadstopclock();
                            details_feedback.completefeedback();
                            alert("You have completed self Feedback");
                            window.location = "../../Feedback/Connect";
                        }
                    }
                });

                $('#Qno1').prev('P').remove();
                $('.TsfQno p').remove();
                $('#Qtext').html(response[questionNo].QuetionText);
                details_feedback.loadCompletedQuestionCount();
                $('#questionindetail').html(response[questionNo].SideBarTitle);
                $('.TsfQno').html((questionNo + 1));
                $('#Qno1').data("question", response[questionNo].QuestionId);
                $('#Qno1').data("moduleid", option.data.moduleId);
                details_feedback.loaddetailslider();
            },
            error: function (err) {
            }
        });
    },
    //Load last save question in detailed view
    loadDetailViewLastSavedQuestions: function (option) {
        Common.ajax({
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
                $('#prevdv').hide();
                $('#questionindetail').html("");
                var questionNo = parseInt(0);
                $('#nextdv').unbind('click');
                $('#nextdv').die('click');
                $('#modulequestions').val(JSON.stringify(response));
                $('#moduleid').val(option.data.moduleId);
                $('#nextdv').live('click', function () {
                    $('#prevdv').show();
                    questionNo = parseInt($('#currentQuestionorder').val()) + 1;
                    if (questionNo <= 5) {
                        details_feedback.saveModuleData();
                    }
                    if (questionNo < 5) {

                        $('#question1').val(questionNo);

                        $('#Qno1').prev('P').remove();
                        $('.TsfQno p').remove();
                        $('#Qtext').html(response[questionNo].QuetionText);
                        $('#currentQuestionorder').val(questionNo);
                        $('#currentQuestionno').val(questionNo + 1);
                        $('#questionindetail').html(response[questionNo].SideBarTitle);
                        $('.TsfQno').html((questionNo + 1));
                        $('#Qno1').data("question", response[questionNo].QuestionId);
                        $('#Qno1').data("moduleid", option.data.moduleId);
                        details_feedback.loadCompletedQuestionCount();

                        details_feedback.loaddetailslider();
                    } else {
                        var totalmodules = $('#totalmodules').val();
                        var currentmoduleOrder = $('#currentmoduleOrder').val();
                        if (totalmodules != currentmoduleOrder) {
                            questionNo = parseInt(0);
                            $('#currentQuestionno').val(1);
                            $('#currentQuestionorder').val(0);
                            var curmod = parseInt($('#currentmoduleOrder').val());
                            var nextmod = curmod + 1;

                            details_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': $('#module' + nextmod).val() }, moduleorder: nextmod });
                            details_feedback.loadPoeContent({ url: '../../Feedback/GetModuleIntoContent', data: { 'moduleId': (parseInt(nextmod) - 1)} }, '#moduleintro');
                            details_feedback.loadPoeContent({ url: '../../Feedback/GetModuleKeyAction', data: { 'moduleId': (parseInt(nextmod) - 1)} }, '#modulekeyaction');


                            details_feedback.loaddetailslider();
                            $('#currentmoduleOrder').val(nextmod);
                            $('#li' + (parseInt(curmod) - 1)).removeClass('act');
                            $('#li' + (parseInt(nextmod) - 1)).addClass('act');
                            details_feedback.loadCompletedPracticeArea($('#module' + curmod).val(), (parseInt(curmod) - 1));
                        } else {
                            details_feedback.loadstopclock();
                            details_feedback.completefeedback();
                            alert("You have completed self Feedback");
                            window.location = "../../Feedback/Connect";
                        }
                    }
                });


                $('#Qno1').prev('P').remove();
                $('.TsfQno p').remove();
                $('#Qtext').html(response[parseInt($('#lastSavedQuestionOrder').val()) - 1].QuetionText);
                $('#questionindetail').html(response[parseInt($('#lastSavedQuestionOrder').val()) - 1].SideBarTitle);
                $('.TsfQno').html((parseInt($('#lastSavedQuestionOrder').val()) - 1 + 1));
                $('#Qno1').data("question", response[parseInt($('#lastSavedQuestionOrder').val()) - 1].QuestionId);
                $('#Qno1').data("moduleid", option.data.moduleId);
                $('#currentQuestionorder').val(parseInt($('#lastSavedQuestionOrder').val()) - 1);
                $('#currentQuestionno').val(parseInt($('#lastSavedQuestionOrder').val()));
                details_feedback.loadCompletedQuestionCount();
                details_feedback.loaddetailslider();
            },
            error: function (err) {
            }
        });
    },
    // save the completed module data
    saveModuleData: function () {
        var savePOEResultRequests = [];
        var savePOEResultRequest = new Requests.SavePOEResultRequest();
        savePOEResultRequest.UserId = 167;
        savePOEResultRequest.Answer = parseInt($('#Qno1').data("answer"));
        savePOEResultRequest.AnswerType = 1;
        savePOEResultRequest.ModuleNumber = $('#Qno1').data("moduleid");
        savePOEResultRequest.QuestionId = $('#Qno1').data("question");
        savePOEResultRequest.Comment = null;
        savePOEResultRequest.FeedbackStatus = 1;
        savePOEResultRequest.FeedbackId = 6;

        savePOEResultRequests.push(savePOEResultRequest);
        saveFeedbackResults(savePOEResultRequests);
    },
    //Complete feedback
    completefeedback: function () {
        completeFeedback();
    },
    //Loading slider
    loaddetailslider: function () {
        $('#Qno1').data("answer", details_feedback.loadSelectedAnswer({ data: { 'feedbackId': 0, 'questionId': parseInt($('#Qno1').data("question"))} }));

        $("#Qno1").slider({
            min: 0,
            max: 4,
            range: "min",
            value: details_feedback.loadSelectedAnswer({ data: { 'feedbackId': 0, 'questionId': parseInt($('#Qno1').data("question"))} }),
            slide: function (event, ui) {
                if (ui.value == 0) {
                    event.preventDefault();
                    $('#Qno1').data("answer", 1);
                } else {
                    $('#Qno1').data("answer", ui.value);
                }
            }
        });
    },
    //Load the timer event
    loadclockevent: function () {
        if ($('#nextdv').hasClass('nextbtn')) {
            $('#counterSec').fadeOut(500).html(0).fadeIn(500);
            $('#counterMin').fadeOut(500).html(0).fadeIn(500);
            timer = setInterval("details_feedback.loadincreasecounter()", 1000);
            $('#nextdv').removeClass('start');
        }
        else {
            if (typeof timer != "undefined") {
                clearInterval(timer);
            }

            $('#nextdv').addClass('nextbtn');
        }
    },
    //Load Comment window
    loadcommentline: function () {
        $("textarea").sceditor({
            plugins: 'bbcode',
            style: "../minified/jquery.sceditor.default.min.css"
        });
    },
    //Intialize the timer functionalities
    loadincreasecounter: function () {
        var secVal;
        var minVal;
        secVal = parseInt($('#counterSec').html(), 10);
        minVal = parseInt($('#counterMin').html(), 10);
        if (secVal != 59)
            $('#counterSec').html((secVal + 1));
        else {
            if (minVal != 59) {
                $('#counterMin').html((minVal + 1));
            }
            else {
                $('#counterHour').html((parseInt($('#counterHour').html(), 10) + 1));
                $('#counterMin').html(0);
            }
            $('#counterSec').html(0);
        }
    },
    //stop the timer event
    loadstopclock: function () {
        clearInterval(timer);
    },
    //Load the module
    loadModuleIds: function (option) {
        var moduleIds = new Array();
        Common.ajax({
            url: option.url,
            success: function (response) {

                var module = " <ul>";
                for (var i = 0; i < response.length; i++) {
                    moduleIds[response[i].ModuleOrderNumber] = response[i].ModuleId;
                    $('#module' + (i + 1)).val(response[i].ModuleId);
                    if (response[i].ModuleOrderNumber > 0) {
                        module = module + "<li id ='li" + response[i].ModuleOrderNumber + "' data-value=" + response[i].ModuleId + "  class='quickview " + ((response[i].ModuleOrderNumber == 1) ? 'act' : '') + "'>" + "<p>" + response[i].ModuleName + "</p>" + "</li>";
                    }
                }
                module = module + "</ul>";
                $('#poemodule').html(module);
                details_feedback.loadQuestioncount({ url: '../../Feedback/GetQuestionCount', data: { 'type': 1} }, '#totalQuestions');
                details_feedback.loadDetailViewLastSavedQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': $('#lastSavedModuleId').val() }, moduleorder: $('#lastSavedModuleOrder').val() });
                details_feedback.loadPoeContent({ url: '../../Feedback/GetPoeIntoContent' }, '#poeintro');
                details_feedback.loadPoeContent({ url: '../../Feedback/GetModuleIntoContent', data: { 'moduleId': $('#lastSavedModuleOrder').val()} }, '#moduleintro');
                details_feedback.loadPoeContent({ url: '../../Feedback/GetModuleKeyAction', data: { 'moduleId': $('#lastSavedModuleOrder').val()} }, '#modulekeyaction');

                for (var j = parseInt($('#lastSavedModuleOrder').val()) - 1; j > 0; j--) {

                    details_feedback.loadCompletedPracticeArea($('#li' + j).data().value, j);
                }


                $('#totalmodules').val(response.length);
                $('#currentmoduleOrder').val($('#lastSavedModuleOrder').val());
                var curmod = parseInt($('#currentmoduleOrder').val());
                var nextmod = curmod + 1;
                $('#poemodule li ').removeClass('act');

                $('#currentmoduleOrder').val(nextmod);
                $('#li' + (parseInt(curmod) - 1)).removeClass('act');
                $('#li' + (parseInt(nextmod) - 1)).addClass('act');
            },
            error: function (err) {
            }
        });
    },
    //load poe content
    loadPoeContent: function (option, element) {
        Common.ajax({
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
                $(element).html(response);
                $(element + 'hdn').val(response);
            },
            error: function (err) {
            }
        });
    },
    //Count the number of question completed
    loadCompletedQuestionCount: function () {
        var curmod = parseInt($('#currentmoduleOrder').val());
        var quetionid = parseInt($('#currentQuestionno').val());
        var totmod = parseInt($('#totalmodules').val()) - 1;
        var totque = parseInt($('#totalQuestions').val());
        var htm1 = "Question " + ((parseInt(curmod - 2) * (totque / totmod)) + quetionid) + "/" + $('#totalQuestions').val() + "";
        $('#compquestionid').html(htm1);
        $('#currentQuestionno').val(quetionid);
    },
    //Question count
    loadQuestioncount: function (option, element) {
        Common.ajax({
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
                $(element).val(response);
            },
            error: function (err) {
            }
        });
    },
    //Load completed practise area
    loadCompletedPracticeArea: function (moduleid, moduleorder) {
        var loadedPA = $('.dropdownlist').html();
        var newcompletedPA = '';
        if ($('#liPA' + moduleorder).size() == 0) {
            newcompletedPA = "<li id=liPA" + moduleorder + "><a href='javascript:details_feedback.loadcompletedPAQuestion(" + moduleid + "," + moduleorder + ")'>" + $('#li' + moduleorder).text() + "</a></li>";
        }
        $('.dropdownlist').html(loadedPA + newcompletedPA);
    },
    //Loading Completed Quewstions
    loadcompletedPAQuestion: function (moduleid, moduleorder) {
        // alert("Test..............");

        var curmod = parseInt($('#currentmoduleOrder').val());
        $('#li' + (parseInt(curmod) - 1)).removeClass('act');
        $('#li' + (parseInt(moduleorder))).addClass('act');
        $('#currentmoduleOrder').val((parseInt(moduleorder) + 1));
        $('#currentQuestionorder').val(0);
        $('#currentQuestionno').val(1);
        details_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': moduleid }, moduleorder: moduleorder });
        $('#compltedPracticeArea').toggle('slow');
    },
    //Load Previous content
    loadPrevContent: function () {
        var curques = parseInt($('#currentQuestionorder').val());
        var previousQue = curques - 1;

        var response = $.parseJSON($('#modulequestions').val());
        var moduleid = parseInt($('#moduleid').val());
        if (previousQue == 0) {
            $('.prevbtn').hide();
        }
        if (curques > 0) {
            $('#question1').val(previousQue);

            $('#Qno1').prev('P').remove();
            $('.TsfQno p').remove();
            $('#Qtext').html(response[previousQue].QuetionText);
            $('#currentQuestionorder').val(previousQue);
            $('#currentQuestionno').val(previousQue + 1);
            $('#questionindetail').html(response[previousQue].SideBarTitle);
            $('.TsfQno').html((previousQue + 1));
            $('#Qno1').data("question", response[previousQue].QuestionId);
            $('#Qno1').data("moduleid", moduleid);
            details_feedback.loaddetailslider();
            details_feedback.loadCompletedQuestionCount();
        }
    },
    //Load Previous content completed
    loadcompletedPrevContent: function (moduleid, moduleorder) {
        if (moduleorder == 1) {
            $('#prevdv').hide();
        }
        if (moduleorder > 0) {
            var curmod = parseInt($('#currentmoduleOrder').val());
            $('#li' + (parseInt(curmod) - 1)).removeClass('act');
            $('#li' + (parseInt(moduleorder))).addClass('act');
            $('#currentmoduleOrder').val((parseInt(moduleorder) + 1));
            details_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': moduleid }, moduleorder: moduleorder });
        }
    },
    //Load selected answer
    loadSelectedAnswer: function (option) {
        $('#selectedanswer').val(1);
        Common.ajaxsync({
            url: "../../Feedback/GetGivenAnswer",
            data: option.data,

            success: function (response) {

                $('#selectedanswer').val(response > 4 ? 1 : response);
            },
            error: function (err) {
            }
        });
        return parseInt($('#selectedanswer').val());
    },
    //Loadt last saved Question
    loadLastSavedQuestion: function () {

        Common.ajax({
            url: "../../Feedback/GetLastSavedQuestion",

            success: function (response) {
                $('#lastSavedQuestion').val(response.QuestionId);
                $('#lastSavedModuleId').val(response.ModuleId);
                $('#lastSavedModuleOrder').val(response.ModuleOrder);
                $('#lastSavedQuestionOrder').val(response.QuestionOrder);
            },
            error: function (err) {
            }
        });
        return parseInt($('#selectedanswer').val());
    }
};
//save feedback result
var saveFeedbackResults = function (request) {
    Common.ajaxPost({
        url: '../../Feedback/SaveTakePOEResult',
        data: request,
        success: function (response) {
        },
        error: function (err) {
        }
    });
};
//completed feedback
var completeFeedback = function () {
    Common.ajaxPost({
        url: '../../Feedback/CompleteTakeFeedback',
        success: function (response) {
        },
        error: function (err) {
        }
    });
};
$(document).ready(function () {
    $('#prevdv').hide();
    $('.bukatutup').hide();
    details_feedback.loadLastSavedQuestion();
    details_feedback.loadclockevent();
    details_feedback.loadModuleIds({ url: '../../Feedback/GetPracticeArea' });
    $('.pane').find('input[type=radio]:checked').removeAttr('checked');
    $("#n" + $(this).context.title).attr('checked', 'checked');

    details_feedback.loadcommentline();
});