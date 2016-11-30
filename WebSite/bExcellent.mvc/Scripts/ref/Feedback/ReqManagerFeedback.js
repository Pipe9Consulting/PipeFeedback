var manager_feedback = {
    //Load Questions
    loadDetailViewPAQuestions: function (option) {
        Common.ajax({
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
                $('#prevdv').hide();
                $('#quesindetail').html("");
                var questionNo = parseInt(0);
                $('#nextdv').unbind('click');
                $('#nextdv').die('click');
                $('#modulequestions').val(JSON.stringify(response));
                $('#moduleid').val(option.data.moduleId);
                $('#nextdv').live('click', function () {
                    $('#prevdv').show();
                    questionNo = parseInt($('#currentQuestionorder').val()) + 1;
                    if (questionNo <= 5) {
                        manager_feedback.saveModuleData();
                    }
                    if (questionNo < 5) {
                        $('#question1').val(questionNo);
                        $('.Qno p').remove();
                        $('#Qtext').html(response[questionNo].QuetionText);
                        $('#currentQuestionorder').val(questionNo);
                        $('#currentQuestionno').val(questionNo + 1);

                        var SideBarContent = response[questionNo].SideBarTitle;

                        $('#quesindetail').html(SideBarContent.replace('<strong>', '').replace('</strong>', '').replace('<p>', '').replace('</p>', '').replace('In Detail:', ''));
                        $('.Qno').html((questionNo + 1));
                        $('#currentQuestionid').val(response[questionNo].QuestionId);
                        $('#currentmoduleid').val(option.data.moduleId);
                        manager_feedback.loadCompletedQuestionCount();

                        manager_feedback.loaddetailslider();
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

                            manager_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': $('#module' + nextmod).val() }, moduleorder: nextmod });
                            manager_feedback.loadPoeContent({ url: '../../Feedback/GetModuleIntoContent', data: { 'moduleId': (parseInt(nextmod) - 1)} }, '#moduleintro');
                            manager_feedback.loadPoeContent({ url: '../../Feedback/GetModuleKeyAction', data: { 'moduleId': (parseInt(nextmod) - 1)} }, '#modulekeyaction');
                            manager_feedback.loaddetailslider();
                            $('#currentmoduleOrder').val(nextmod);
                            $('#li' + (parseInt(curmod) - 1)).removeClass('act');
                            $('#li' + (parseInt(nextmod) - 1)).addClass('act');
                            manager_feedback.loadCompletedPracticeArea($('#module' + curmod).val(), (parseInt(curmod) - 1));
                        } else {
                            manager_feedback.loadstopclock();
                            manager_feedback.completefeedback();
                            alert("You have completed the Feedback");
                            window.location = "../../Feedback/Connect";
                        }
                    }
                });

                $('.Qno p').remove();
                $('#Qtext').html(response[questionNo].QuetionText);
                manager_feedback.loadCompletedQuestionCount();
                $('#currentQuestionid').val(response[questionNo].QuestionId);
                var SideBarContent = response[questionNo].SideBarTitle;

                $('#quesindetail').html(SideBarContent.replace('<strong>', '').replace('</strong>', '').replace('<p>', '').replace('</p>', '').replace('In Detail:', ''));
                $('.Qno').html((questionNo + 1));
                manager_feedback.loaddetailslider();
            },
            error: function (err) {
            }
        });
    },
    // save the completed module data
    saveModuleData: function () {
        var elemets = ($('#usercheckbox').val().slice(0, -1).split(","));
        var savePOEResultRequests = [];
        for (var i = 0; i < elemets.length; i++) {
            if (elemets[i] != undefined) {
                var element = 'tn' + elemets[i];
                var fbid = elemets[i];

                var savePOEResultRequest = new Requests.SavePOEResultRequest();

                savePOEResultRequest.Answer = parseInt($('#' + element).data("answer"));
                savePOEResultRequest.AnswerType = 1;
                savePOEResultRequest.ModuleNumber = parseInt($('#currentmoduleid').val());

                savePOEResultRequest.QuestionId = parseInt($('#currentQuestionid').val());
                savePOEResultRequest.Comment = null;
                savePOEResultRequest.FeedbackStatus = 1;
                savePOEResultRequest.FeedbackId = parseInt(fbid);

                savePOEResultRequests.push(savePOEResultRequest);
            }
        }

        saveFeedbackResults(savePOEResultRequests);
    },
    //Complete feedback
    completefeedback: function () {
        var elemets = ($('#usercheckbox').val().slice(0, -1).split(","));
        var savePOEResultRequests = [];
        for (var i = 0; i < elemets.length; i++) {
            if (elemets[i] != undefined) {
                var element = 'tn' + elemets[i];
                var fbid = elemets[i];

                var savePOEResultRequest = new Requests.SavePOEResultRequest();

                savePOEResultRequest.Answer = 0;
                savePOEResultRequest.AnswerType = 1;
                savePOEResultRequest.ModuleNumber = 0;

                savePOEResultRequest.QuestionId = 0;
                savePOEResultRequest.Comment = null;
                savePOEResultRequest.FeedbackStatus = 2;
                savePOEResultRequest.FeedbackId = parseInt(fbid);

                savePOEResultRequests.push(savePOEResultRequest);
            }
        }

        completeFeedback(savePOEResultRequests);
    },
    //Loading slider
    loaddetailslider: function () {
        var elemets = ($('#usercheckbox').val().slice(0, -1).split(","));
        for (var i = 0; i < elemets.length; i++) {
            var element = 'tn' + elemets[i];
            $('#' + element).data("answer", manager_feedback.loadSelectedAnswer({ data: { 'feedbackId': elemets[i], 'questionId': parseInt($('#currentQuestionid').val())} }));

            $('#' + element).slider({
                min: 0,
                max: 4,
                range: "min",
                value: manager_feedback.loadSelectedAnswer({ data: { 'feedbackId': elemets[i], 'questionId': parseInt($('#currentQuestionid').val())} }),
                slide: function (event, ui) {
                    if (ui.value == 0) {
                        event.preventDefault();
                        $('#' + event.target.id).data("answer", 1);
                    } else {
                        $('#' + event.target.id).data("answer", ui.value);
                    }
                }
            });
        }
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
                manager_feedback.loadQuestioncount({ url: '../../Feedback/GetQuestionCount', data: { 'type': 2} }, '#totalQuestions');
                manager_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': $('#module2').val() }, moduleorder: 2 });
                manager_feedback.loadPoeContent({ url: '../../Feedback/GetPoeIntoContent' }, '#poeintro');
                manager_feedback.loadPoeContent({ url: '../../Feedback/GetModuleIntoContent', data: { 'moduleId': 1} }, '#moduleintro');
                manager_feedback.loadPoeContent({ url: '../../Feedback/GetModuleKeyAction', data: { 'moduleId': 1} }, '#modulekeyaction');
                $('#totalmodules').val(response.length);
                $('#currentmoduleOrder').val('2');
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
            newcompletedPA = "<li id=liPA" + moduleorder + "><a href='javascript:manager_feedback.loadcompletedPAQuestion(" + moduleid + "," + moduleorder + ")'>" + $('#li' + moduleorder).text() + "</a></li>";
        }
        $('.dropdownlist').html(loadedPA + newcompletedPA);
    },
    //Loading Completed Quewstions
    loadcompletedPAQuestion: function (moduleid, moduleorder) {
        var curmod = parseInt($('#currentmoduleOrder').val());
        $('#li' + (parseInt(curmod) - 1)).removeClass('act');
        $('#li' + (parseInt(moduleorder))).addClass('act');
        $('#currentmoduleOrder').val((parseInt(moduleorder) + 1));
        $('#currentQuestionorder').val(0);
        $('#currentQuestionno').val(1);
        manager_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': moduleid }, moduleorder: moduleorder });
        $('#compltedPracticeArea').toggle('slow');
    },
    //Load Comment window
    loadcommentline: function () {
        $("textarea").sceditor({
            plugins: 'bbcode',
            style: "../minified/jquery.sceditor.default.min.css"
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
    //Load the timer event
    loadclockevent: function () {
        if ($('#nextdv').hasClass('nextbtn')) {
            $('#counterSec').fadeOut(500).html(0).fadeIn(500);
            $('#counterMin').fadeOut(500).html(0).fadeIn(500);
            timer = setInterval("manager_feedback.loadincreasecounter()", 1000);
            $('#nextdv').removeClass('start');
        }
        else {
            if (typeof timer != "undefined") {
                clearInterval(timer);
            }

            $('#nextdv').addClass('nextbtn')
        }
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
    //Load team members
    loadTeammembers: function (option) {
        Common.ajax({
            url: option.url,
            data: (option.data) ? option.data : null,

            success: function (response) {
                var _team = response;

                var source = "{{#each team}}<li> <div class='user'> {{Teammember.User.FirstName}} {{Teammember.User.LastName}}</div> <img src='../../Images/userb.png' alt='User' /> <div class='Slide'> <div id='tn{{FeedBackId}}' value={{FeedBackId}} class='sliderdiv'> <img src='../../Images/img/slidebg1.png' /> </div> </div> </li> {{/each}}";
                var template = Handlebars.compile(source);
                $('#userList').html(template({ 'team': _team }));

                var sourcetwo = "{{#each team}}" + "{{FeedBackId}},{{/each}}";
                var templatetwo = Handlebars.compile(sourcetwo);
                var checkbox = templatetwo({ 'team': _team });
                $('#usercheckbox').val(checkbox);

                manager_feedback.loaddetailslider();
                manager_feedback.loadModuleIds({ url: '../../Feedback/GetPracticeArea' });
            },
            error: function (err) {
            }
        });
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
            $('.Qno p').remove();
            $('#Qtext').html(response[previousQue].QuetionText);
            $('#currentQuestionorder').val(previousQue);
            $('#currentQuestionno').val(previousQue + 1);
            var SideBarContent = response[previousQue].SideBarTitle;

            $('#quesindetail').html(SideBarContent.replace('<strong>', '').replace('</strong>', '').replace('<p>', '').replace('</p>', '').replace('In Detail:', ''));

            $('.Qno').html((previousQue + 1));
            $('#Qno1').data("question", response[previousQue].QuestionId);
            $('#currentQuestionid').val(response[previousQue].QuestionId);
            $('#Qno1').data("moduleid", moduleid);
            manager_feedback.loaddetailslider();
            manager_feedback.loadCompletedQuestionCount();
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
            manager_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': moduleid }, moduleorder: moduleorder });
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
    }
};
//save feedback result
var saveFeedbackResults = function (request) {
    Common.ajaxPost({
        url: '../../Feedback/SaveManagerPOEResult',
        data: request,
        success: function (response) {
        },
        error: function (err) {
        }
    });
};
//completed feedback
var completeFeedback = function (request) {
    Common.ajaxPost({
        url: '../../Feedback/CompleteManagerFeedback',
        data: request,
        success: function (response) {
        },
        error: function (err) {
        }
    });
};
$(document).ready(function () {
    $('#prevdv').hide();
    $('.bukatutup').hide();
    manager_feedback.loadclockevent();
    manager_feedback.loadTeammembers({ url: '../../Feedback/GetCreateFeedbacks' });
    $('.pane').find('input[type=radio]:checked').removeAttr('checked');
    $("#n" + $(this).context.title).attr('checked', 'checked');
    manager_feedback.loadcommentline();
});