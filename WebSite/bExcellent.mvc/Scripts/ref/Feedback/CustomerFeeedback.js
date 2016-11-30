var details_feedback = {
    loadModuleAndPoeContent: function (option) {
        Common.ajaxsync({
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
                if (response.ModuleOrderNumber == 0) {
                    $('#poeintroslidecount').html(response.ModuleIntroSlideCount);
                    $('#poeintro0').html(response.ModuleIntro);
                    $('#poeintro1').html(response.ModuleIntro1);
                    $('#poeintro2').html(response.ModuleIntro2);
                    $('#poeintro3').html(response.ModuleIntro3);
                    $('#poeintro4').html(response.ModuleIntro4);
                    $('#poeintro5').html(response.ModuleIntro5);

                    $('#traitsslidecount').html(response.KeyActionSlideCount);
                    $('#traits0').html(response.KeyAction);
                    $('#traits1').html(response.KeyAction1);
                    $('#traits2').html(response.KeyAction2);
                    $('#traits3').html(response.KeyAction3);
                    $('#traits4').html(response.KeyAction4);
                    $('#traits5').html(response.KeyAction5);
                }
                else {
                    $('#keyactionslidecount').html(response.KeyActionSlideCount);
                    $('#keyaction0').html(response.KeyAction);
                    $('#keyaction1').html(response.KeyAction1);
                    $('#keyaction2').html(response.KeyAction2);
                    $('#keyaction3').html(response.KeyAction3);
                    $('#keyaction4').html(response.KeyAction4);
                    $('#keyaction5').html(response.KeyAction5);

                    $('#moduleintroslidecount').html(response.ModuleIntroSlideCount);
                    $('#moduleintro0').html(response.ModuleIntro);
                    $('#moduleintro1').html(response.ModuleIntro1);
                    $('#moduleintro2').html(response.ModuleIntro2);
                    $('#moduleintro3').html(response.ModuleIntro3);
                    $('#moduleintro4').html(response.ModuleIntro4);
                    $('#moduleintro5').html(response.ModuleIntro5);
                }
            },
            error: function () {
            }
        });
    },
    loadLastSavedQuestion: function () {
        Common.ajaxsync({
            url: "../../Feedback/GetLastSavedQuestion",

            success: function (response) {
                $('#fbStatus').val(response.FeedBackStatus);
                $('#lastSavedQuestion').val(response.QuestionId);
                $('#lastSavedModuleId').val(response.ModuleId);
                $('#lastSavedModuleOrder').val(response.ModuleOrder);
                $('#lastSavedQuestionOrder').val(response.QuestionOrder);
            },
            error: function () {
            }
        });
        return parseInt($('#selectedanswer').val());
    },
    loadTeammembers: function (option) {
        var returnValue = null;
        Common.ajaxsync({
            url: option.url,
            data: (option.data) ? option.data : null,

            success: function (response) {
                returnValue = response;
            },
            error: function () {
            }
        });
        return returnValue;
    },
    //Load Questions
    loadDetailViewPAQuestions: function (option) {
        var userresponse = details_feedback.loadTeammembers({ url: '../../Feedback/GetCreateFeedbacks' });
        details_feedback.loadModuleAndPoeContent({ url: '../../Feedback/GetIntoContent', data: { 'moduleId': parseInt(option.data.moduleId) - 1 } });
        Common.ajaxsync({
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
                var html = "";
                var slidehtml = "";
                $('#totalQuestionsformodule').val(response.length);
                var modord = option.moduleorder - 2;
                var totque = response.length;
                for (var i = 0; i < response.length; i++) {
                    var quetionid = response[i].QuestionOrderNumber;
                    var questaken = (modord * totque) + quetionid;
                    var SideBarContent = response[i].SideBarTitle;
                    var questionhtml = " <li id='q" + response[i].QuestionOrderNumber + "' value=" + questaken + "> <div class='questiontaken' >Question " + questaken + "/" + $('#totalQuestions').val() +
                        "</div><div class='timetakencontainer'><div class='timetaken'>| Time taken :</div><div class='counterHour'>00</div><div class='collan'>:</div><div class='counterMin'>00</div><div class='collan'>:</div><div class='counterSec'>00</div></div>" +
                        " <div class='clr'></div><div class='qn'>" + response[i].QuestionOrderNumber + "</div>" +
                        "<div class='questionarea detailedarea'>" +
                        "<h2>" + response[i].QuetionText + "</h2>" +
                        "<p>" + SideBarContent.replace('<strong>', '').replace('</strong>', '').replace('<p>', '').replace('</p>', '').replace('In Detail:', '') + "</p>" +
                        "<div class='customercol'><div class='customername'> " + userresponse[0].Teammember.User.FirstName + " " + userresponse[0].Teammember.User.LastName + " </div>" +
                         "<img class='customerimg' src='/Uploadify/LoadImageHandler.ashx?id=" + userresponse[0].Teammember.User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                        "<div class='sliderimg customerslide'>" +
                        "<div id='Qno" + response[i].QuestionOrderNumber + "' data-question=" + response[i].QuestionId + " data-moduleid=" + option.data.moduleId + " style='width: 562px; height: 62px; cursor: pointer;' class='sliderdiv'>" +
                        "<img src='../../Images/img/slidebg1.png' />" +
                        "</div><div class='SI'>Slide the scale to represent your level of excellence</div></div></div></div>";

                    var stringhidden = "";

                    if (i != 0) {
                        slidehtml = slidehtml + "<a href='#' class='prevfb' id='p" + response[i].QuestionOrderNumber + "' onclick='details_feedback.prevclick(" + response[i].QuestionOrderNumber + "," + response[i - 1].QuestionOrderNumber + ")'>Previous</a> ";
                    }
                    if (i < response.length - 1) {
                        slidehtml = slidehtml + " <a href='#' class='nxtfb' id='bn" + response[i].QuestionOrderNumber + "' onclick='details_feedback.nextclick(" + response[i].QuestionOrderNumber + "," + response[i + 1].QuestionOrderNumber + ")'>Next</a>";
                    } else {
                        slidehtml = slidehtml + " <a href='#' class='nxtfb' id='bn" + response[i].QuestionOrderNumber + "' onclick='details_feedback.loadNextContent()'>Next</a>";
                        var totalmodules = $('#totalmodules').val();
                        var currentmoduleOrder = $('#currentmoduleOrder').val();
                        if (totalmodules != currentmoduleOrder) {
                            stringhidden = stringhidden + "<li><div class='customertiles'><div class='tsf'>Give Feedback</div><ul>" + $('#nextmodule').val() + "</ul></div></li>";
                        } else {
                            stringhidden = stringhidden + "<li><div class='customertiles'><div class='tsf'>Connect</div><ul>" + $('#nextmodule').val() + "</ul></div></li>";
                        }
                    }

                    stringhidden = stringhidden + " </li>";
                    html = html + questionhtml + stringhidden;
                }
                details_feedback.loadTopmmebers(response[0].QuestionId);
                $('#sliderbtn').html("<div id='slidefb'>" + slidehtml + "</div>");
                $('#pagetxt').html('Page ' + response[0].QuestionOrderNumber + ' of ' + $('#totalQuestionsformodule').val());
                $('.pageholder').hide().fadeIn('slow');
                $('#questions').hide().html(html).fadeIn('slow');
                $('.frequencydiv').hide().fadeIn('slow');

                for (var k = 0; k < response.length; k++) {
                    $('#p' + response[k].QuestionOrderNumber).hide();
                    $('#bn' + response[k].QuestionOrderNumber).hide();
                }
                $('#bn' + response[0].QuestionOrderNumber).show();
                var status = parseInt($('#fbStatus').val());

                $('#lihdn' + (parseInt(option.moduleorder) - 1)).removeClass('selected');
                $('#lihdn' + (parseInt(option.moduleorder))).addClass('selected');
                details_feedback.loaddetailslider(response);
                if (status == 1) {
                    var lastquestion = parseInt($('#lastSavedQuestionOrder').val());

                    if (lastquestion != 0) {
                        for (var j = 1; j < lastquestion; j++) {
                            details_feedback.nextclick(j, j + 1);
                        }
                    }
                    $('#lastSavedQuestionOrder').val(0);
                }
            },
            error: function () {
            }
        });
    },
    loadNextContent: function () {
        $('.pageholder').hide();
        details_feedback.saveModuleData();
        var totalmodules = $('#totalmodules').val();
        var currentmoduleOrder = $('#currentmoduleOrder').val();
        if (totalmodules != currentmoduleOrder) {
            var curmod = parseInt($('#currentmoduleOrder').val());
            var nextmod = curmod + 1;

            details_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': $('#modulehdn' + nextmod).val() }, moduleorder: nextmod });

            $('#li' + (parseInt(curmod) - 1)).removeClass('selected');

            $('#li' + (parseInt(nextmod) - 1)).addClass('selected');

            $('#currentmoduleOrder').val(nextmod);

            details_feedback.loadCompletedPracticeArea($('#modulehdn' + curmod).val(), (parseInt(curmod) - 1));
        } else {
            details_feedback.loadstopclock();
            $("#status").fadeIn();
            $("#preloader").delay(100).fadeIn("slow");
            setTimeout(function () {
                details_feedback.completefeedback();
                alert("You have completed Feedback");
                window.location = "../../Home/SignOut";
            }, 8000);
        }
    },
    // save the completed module data

    saveModuleData: function () {
        var savePOEResultRequests = [];
        for (var j = 0; j < parseInt($('#totalQuestionsformodule').val()) ; j++) {
            var savePOEResultRequest = new Requests.SavePOEResultRequest();
            savePOEResultRequest.Answer = parseInt($('#Qno' + (j + 1)).data("answer"));
            savePOEResultRequest.AnswerType = 1;
            savePOEResultRequest.ModuleNumber = $('#Qno' + (j + 1)).data("moduleid");

            savePOEResultRequest.QuestionId = $('#Qno' + (j + 1)).data("question");
            savePOEResultRequest.Comment = null;
            savePOEResultRequest.FeedbackStatus = 1;
            savePOEResultRequests.push(savePOEResultRequest);
        }

        saveFeedbackResults(savePOEResultRequests);
    },
    saveQuestionData: function (element) {
        var savePOEResultRequests = [];
        var savePOEResultRequest = new Requests.SavePOEResultRequest();

        savePOEResultRequest.Answer = parseInt($('#' + element).data("answer"));
        savePOEResultRequest.AnswerType = 1;
        savePOEResultRequest.ModuleNumber = $('#' + element).data("moduleid");
        savePOEResultRequest.QuestionId = $('#' + element).data("question");
        savePOEResultRequest.Comment = null;
        savePOEResultRequest.FeedbackStatus = 1;
        savePOEResultRequests.push(savePOEResultRequest);
        saveFeedbackResults(savePOEResultRequests);
    },
    //Complete feedback
    completefeedback: function () {
        completeFeedback();
    },

    loaddetailslider: function (response) {
        for (var i = 0; i < response.length; i++) {
            var element = 'Qno' + response[i].QuestionOrderNumber;
            $('#' + element).data("answer", details_feedback.loadSelectedAnswer({ data: { 'feedbackId': 0, 'questionId': response[i].QuestionId } }));

            $('#' + element).slider({
                min: 0,
                max: 4,
                range: "min",
                value: details_feedback.loadSelectedAnswer({ data: { 'feedbackId': 0, 'questionId': response[i].QuestionId } }),
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
    prevclick: function (current, previous) {
        $('.prevfb,.nxtfb').hide();
        $('#p' + current).hide();
        $('#bn' + current).hide();
        $('#p' + previous).show();
        $('#bn' + previous).show();
        $('#pagetxt').html('Page ' + previous + ' of ' + $('#totalQuestionsformodule').val());

        $('#q' + previous).show("slow");
        $('#q' + previous).animate({ 'left': '700px' }, { duration: 400 });
        details_feedback.loadTopmmebers($('#Qno' + previous).data("question"));
    },
    nextclick: function (current, next) {
        $('.prevfb,.nxtfb').hide();
        $('#p' + current).hide();
        $('#bn' + current).hide();
        $('#p' + next).show();
        $('#bn' + next).show();

        $('#pagetxt').html('Page ' + next + ' of ' + $('#totalQuestionsformodule').val());
        $('#q' + current).hide("slow");
        details_feedback.saveQuestionData('Qno' + current);
        details_feedback.loadTopmmebers($('#Qno' + next).data("question"));
        $('#q' + next).animate({ 'left': '-700px' }, { duration: 400 });
    },

    //Load the timer event
    loadclockevent: function () {
        $('.counterSec').fadeOut(500).html(0).fadeIn(500);
        $('.counterMin').fadeOut(500).html(0).fadeIn(500);
        setInterval("details_feedback.loadincreasecounter()", 1000);
    }, loadcommentline: function () {
        $('#connectmembrs .usersconnect').live('click', function () {
            $('#connectmembrs li a span').removeClass('slidecontentselect');
            $(this).find('span').toggleClass('slidecontentselect');
        });
        $('#submitbtn').click(function () {
            var txtareavalText = $('textarea').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
            if (txtareavalText == "") {
                alert('Please Enter the Text');
            } else {
                details_feedback.PostCommnet();
            }
        });
        var loadCss = function (callback) {
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = "/Scripts/ref/editor/themes/square.min.css";
            link.id = 'theme-style';

            document.getElementsByTagName('head')[0].appendChild(link);

            var img = document.createElement('img');
            img.onerror = function () {
                if (callback) callback(link);
            };
            img.src = "/Scripts/ref/editor/themes/square.min.css";
        };
        var initEditor = function () {
            $("textarea").sceditor({
                plugins: 'xhtml',
                resizeEnabled: false,
                toolbar: "bold,italic,underline,left,center,right,justify,bulletlist,orderedlist",
                style: "/Scripts/ref/editor/jquery.sceditor.default.min.css"
            });
        };
        initEditor();
        loadCss(initEditor);
    },

    //Load Previous content
    loadTopmmebers: function (quesionid) {
        $('.vs-context-menu').hide("slow");
        Common.ajaxsync({
            url: "/Feedback/GetConnectMembers?type=2&quesionid=" + quesionid,
            success: function (response) {
                var html = '';
                if (response.length != 0) {
                    var limit = (response.length < 9) ? response.length : 9;
                    for (var i = 0; i < limit; i++) {
                        html = html + "<li data-value=" + response[i].User.UserId + " class='usersconnect'><a href='#'>" +
                            "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='95' height='95' alt='User' />" +
                                "<span></span>" +
                            "<p class='spanname'>" + response[i].User.FirstName + " " + response[i].User.LastName + "</p>" +
                            "</a></li>";
                    }
                }
                if (response.length != 0 && response.length < 9) {
                    var balCount = 9 - response.length;
                    for (var j = 0; j < balCount; j++) {
                        html = html + "<li> <img src='../Images/you.png' width='95' height='95' alt='Connect'/> </li>";
                    }
                }
                if (response.length == 0) {
                    for (var k = 0; k < 9; k++) {
                        html = html + "<li> <img src='../Images/you.png' width='95' height='95' alt='Connect'/> </li>";
                    }
                }
                $('#connectmembrs').html(html);
            },
            error: function () {
            }
        });
    },
    PostCommnet: function () {
        var userid = $('#connectmembrs .slidecontentselect').parent().parent().data('value');
        var selectedmodule = $('#poemodule .selected')[0].innerText;
        var html = $('textarea').sceditor('instance').getBody()[0].innerHTML;
        $('#comments').val(html.trim());
        $('#subject').val("Comment regarding " + selectedmodule + " poe");
        $('#useridslist').val(userid);
        var form = $('#PostComments');
        var formData = new FormData(form[0]);
        $.ajax({
            type: "POST",
            url: form.attr('action'),
            enctype: 'multipart/form-data',
            data: formData,
            success: function () {
                $('#subject').val('');
                $('#comments').val('');
                $('#selectedmembershdn').val('');
                $('#selectedmembersdiv').html('');
                $('textarea').sceditor('instance').val('');
                $('#connectmembrs li a span').removeClass('slidecontentselect');
            },
            error: function () {
            },
            cache: false,
            contentType: false,
            processData: false
        });
        return false;
    },
    //Intialize the timer functionalities
    loadincreasecounter: function () {
        var secVal;
        var minVal;
        secVal = parseInt($('.counterSec').html(), 10);
        minVal = parseInt($('.counterMin').html(), 10);
        if (secVal != 59)
            $('.counterSec').html((secVal + 1));
        else {
            if (minVal != 59) {
                $('.counterMin').html((minVal + 1));
            }
            else {
                $('.counterHour').html((parseInt($('.counterHour').html(), 10) + 1));
                $('.counterMin').html(0);
            }
            $('.counterSec').html(0);
        }
    },
    //stop the timer event
    loadstopclock: function () {
        clearInterval(timer);
    },
    //Load the module
    loadModuleIds: function (option) {
        var moduleIds = new Array();
        Common.ajaxsync({
            url: option.url,
            success: function (response) {
                var module = "";
                var modulehdnstr = "";
                var modulehidden = "";
                for (var i = 0; i < response.length; i++) {
                    moduleIds[response[i].ModuleOrderNumber] = response[i].ModuleId;

                    modulehidden = modulehidden + "<input type='hidden' id='modulehdn" + (i + 1) + "' value=" + response[i].ModuleId + " />";

                    if (response[i].ModuleOrderNumber > 0) {
                        var img = $('#selectedpoe').val() + response[i].ModuleOrderNumber;
                        module = module + "<li id ='li" + response[i].ModuleOrderNumber + "' data-value=" + response[i].ModuleId + "  class='takesf " + ((response[i].ModuleOrderNumber == 1) ? 'selected' : '') + "'><p>" + response[i].ModuleName + "</p><img src='../../Images/icons/" + img + ".png' width='64' height='50'  class='img' />" + "</li>";
                    }
                    if (response[i].ModuleOrderNumber > 0) {
                        var img = $('#selectedpoe').val() + response[i].ModuleOrderNumber;
                        modulehdnstr = modulehdnstr + "<li id ='lihdn" + response[i].ModuleOrderNumber + "' class='takesf'><p>" + response[i].ModuleName + "</p><img src='../../Images/icons/" + img + ".png' width='64' height='50'  class='img' />" + "</li>";
                    }
                }

                $('#nextmodule').val(modulehdnstr);
                $('#modules').html(modulehidden);
                module = module + "";
                $('#poemodule').html(module);
                var status = parseInt($('#fbStatus').val());

                if (status == 1) {
                    details_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': $('#lastSavedModuleId').val() }, moduleorder: parseInt($('#lastSavedModuleOrder').val()) + 1 });
                    $('#poemodule li').removeClass('selected');
                    $('#li' + parseInt($('#lastSavedModuleOrder').val())).addClass('selected');
                    $('#currentmoduleOrder').val(parseInt($('#lastSavedModuleOrder').val()) + 1);
                } else {
                    details_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': $('#modulehdn2').val() }, moduleorder: 2 });
                    $('#currentmoduleOrder').val('2');
                }
                $('#totalmodules').val(response.length);
            },
            error: function (err) {
            }
        });
    },
    //load poe content
    loadPoeContent: function (option, element) {
        Common.ajaxsync({
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

    //Question count
    loadQuestioncount: function (option, element) {
        Common.ajaxsync({
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
        var img = $('#selectedpoe').val() + moduleorder;
        var loadedPA = $('#target ul').html();
        var newcompletedPA = '';
        $('#li' + moduleorder).attr('onclick', 'details_feedback.loadcompletedPAQuestion(' + moduleid + ',' + moduleorder + ')');

        if ($('#lit' + moduleorder).size() == 0) {
            newcompletedPA = "<li id=lit" + moduleorder + "><a href='javascript:details_feedback.loadcompletedPAQuestion(" + moduleid + "," + moduleorder + ")'><span><img src='../../Images/icons/" + img + "-small.png' /></span></a><p>" + $('#li' + moduleorder).text() + "</p></li>";
        }
        $('#target ul').html(loadedPA + newcompletedPA);
    },
    //Loading Completed Questions
    loadcompletedPAQuestion: function (moduleid, moduleorder) {
        var curmod = parseInt($('#currentmoduleOrder').val());
        $('#li' + (parseInt(curmod) - 1)).removeClass('selected');
        $('#li' + (parseInt(moduleorder))).addClass('selected');
        $('#currentmoduleOrder').val((parseInt(moduleorder) + 1));
        $('#currentQuestionorder').val(0);
        $('#currentQuestionno').val(1);
        details_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': moduleid }, moduleorder: (parseInt(moduleorder) + 1) });
    },
    //Load Previous content

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
    show: function () {
        $('.pageholder').animate({
            width: 730,
            marginLeft: 1,
            marginRight: -730,
            display: 'toggle'
        }, 'slow');
    }, hide: function () {
        $('.pageholder').animate({
            width: 0,
            marginLeft: 730,
            marginRight: 0,
            display: 'toggle'
        }, 'slow');
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
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
        },
        error: function (err) {
        }
    });
};
$(document).ready(function () {
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $('.pageholder').hide();
    $('#questions').hide();
    $('.frequencydiv').hide();
    details_feedback.loadLastSavedQuestion();
    details_feedback.loadPoeName();
    details_feedback.loadQuestioncount({ url: '../../Feedback/GetQuestionCount', data: { 'type': 1 } }, '#totalQuestions');
    details_feedback.loadclockevent();
    details_feedback.loadModuleIds({ url: '../../Feedback/GetPracticeArea' });
    details_feedback.loadModuleAndPoeContent({ url: '../../Feedback/GetIntoContent', data: { 'moduleId': 0 } });
    details_feedback.loadModuleAndPoeContent({ url: '../../Feedback/GetIntoContent', data: { 'moduleId': 1 } });
    $('.pane').find('input[type=radio]:checked').removeAttr('checked');
    $("#n" + $(this).context.title).attr('checked', 'checked');
    details_feedback.loadcommentline();
    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
   
});