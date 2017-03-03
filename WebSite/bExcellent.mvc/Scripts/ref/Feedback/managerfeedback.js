var manager_feedback = {
    userratingcount: 0,
    getNumberofLines: function (height) {
        var slideHeight = 0;

        if (height > 1150) slideHeight = 54;
        else if (height > 950) slideHeight = 41;
        else if (height < 900) slideHeight = 35;
        else slideHeight = 35;

        return slideHeight;
    },
    loadModuleAndPoeContent: function (option) {
        Common.ajaxsync({
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
                //debugger;
                var html = "";
                if (response != null) {
                    if (response.ModuleOrderNumber == 0) {
                        var htmlDiv = "<img src='../../Images/KessakuImage/" + $('#selectedpoe').val().replace("/", "") + "_pane.png'>";
                        $('#poeintroslidecount').html(response.ModuleIntroSlideCount);
                        $('#poeintro0').html(htmlDiv + response.ModuleIntro);
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
                        $('#profileSummary').html($('#poeintro0').html());
                        $('#profileSummary').slimScroll();
                        //$('.feedbackIntro').html($('#poeintro0').html());
                        //$('.practiceAreaIntro').html($('#moduleintro0').html());
                        //$('.keyActions').html($('#keyaction0').html());
                    }
                    else {
                        var sHeight = window.innerHeight;
                        var noofLines = manager_feedback.getNumberofLines(sHeight);
                        $('#keyaction0').html('<li><h2>Key Actions</h2><ul>' + response.KeyAction + '</ul></li>');
                        //var keyActionHtml = $('#keyaction0').find('li');
                        //var m = 0, n = 0;
                        //var keyLength = 0;
                        //var keyhtml = "";
                        //for (; m < keyActionHtml.length;) {
                        //    keyLength = keyLength + (Math.ceil(keyActionHtml[m].innerText.length / 45) + 1);
                        //    if (keyLength <= noofLines) {
                        //        keyhtml = keyhtml + "<li>" + keyActionHtml[m].innerText + "</li>";
                        //        m++;
                        //    } else {
                        //        $('#keyaction' + n).empty().html(keyhtml);
                        //        keyhtml = "";
                        //        keyLength = 0;
                        //        n++;
                        //    }
                        //}
                        //$('#keyaction' + n).html(keyhtml);
                        //for (var i = 0; i < n ; i++) {
                        //    $('#snap' + (2 + i)).addClass('content4').addClass('contentSnap');
                        //}
                        //$('#keyactionslidecount').html(n);

                        //$('#keyactionslidecount').html(response.KeyActionSlideCount);
                        //$('#keyaction0').html(response.KeyAction);
                        //$('#keyaction1').html(response.KeyAction1);
                        //$('#keyaction2').html(response.KeyAction2);
                        //$('#keyaction3').html(response.KeyAction3);
                        //$('#keyaction4').html(response.KeyAction4);
                        //$('#keyaction5').html(response.KeyAction5);

                        moduleName = $('#poemodule>li.selected').find('p').html();
                        imgSrc = $('#selectedpoe').val().replace("/", "") + response.ModuleOrderNumber;

                        $('#moduleintroslidecount').html(response.ModuleIntroSlideCount);
                        $('#moduleintro0').html('<div class="practiceAreaTitle"><h2>' + moduleName + '</h2><img src="../Images/icons/' + imgSrc + '.png" /></div>' + response.ModuleIntro);
                        $('#moduleintro1').html(response.ModuleIntro1);
                        $('#moduleintro2').html(response.ModuleIntro2);
                        $('#moduleintro3').html(response.ModuleIntro3);
                        $('#moduleintro4').html(response.ModuleIntro4);
                        $('#moduleintro5').html(response.ModuleIntro5);
                        $('#profileSummary').html($('#poeintro0').html());
                        $('#profileSummary').slimScroll();
                        // $('.feedbackIntro').html($('#poeintro0').html());
                        // $('.practiceAreaIntro').html($('#moduleintro0').html());
                        //$('.keyActions').html($('#keyaction0').html());
                    }
                }
            },
            error: function (err) {
                window.location = "../Home/ErrorMsg";
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
            error: function (err) {
                window.location = "../Home/ErrorMsg";
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
            error: function (err) {
                window.location = "../Home/ErrorMsg";
            }
        });
        return returnValue;
    },
    //Load Questions
    loadDetailViewPAQuestions: function (option) {
        //debugger;
        var userresponse = manager_feedback.loadTeammembers({ url: '../../Feedback/GetCreateFeedbacks' });

        var feedbackids = '';
        for (var j = 0; j < userresponse.length; j++) {
            feedbackids = feedbackids + userresponse[j].FeedBackId + ",";
        }
        $('#feedbackids').val(feedbackids);
        //manager_feedback.loadModuleAndPoeContent({ url: '../../Feedback/GetIntoContent', data: { 'moduleId': parseInt(option.data.moduleId) } });
        $('#moduleid').val(option.data.moduleId);
        Common.ajaxsync({
            url: option.url,
            data: (option.data) ? option.data : null,
            //beforeSend: function () {
            //    $("#status").fadeIn();
            //    $("#preloader").delay(100).fadeIn("slow");
            //},
            success: function (response) {
                //debugger;
                //$("#status").fadeIn();
                //$("#preloader").delay(100).fadeIn("slow");
                var completedhtml = '<li class="feedbackcomplete"><h1>Feedback Completed</h1>' +
                    '<p>Congratulations! You have successfully completed Team-Feedback. Team-Feedback is only used for development purposes, so please confirm, by typing your name into the signature box, that your responses are as honest and objective as possible. If you need to go back to review or revise any of your responses, you may do so now. Once you are satisfied, proceed by clicking “Submit.” Thank you for your participation!</p>' +
                    '<p><b>' + $('#loggedinUser').html().trim() + '</b></p><input type="text" id="fbinitial" name="textbox"/><p><span></span></p><a onclick="manager_feedback.submitfeedback();">Submit</a></li>';
                var html = "";
                var allSliderids = '';
                var slidehtml = "";
                var modord = option.moduleorder - 2;
                var totalCompletedQuestions = 0;
                if (modord > 0)
                    Common.ajaxsync({
                        //url: option.url,
                        //data: { moduleId: (modord == 0 ? option.data.moduleId : (parseInt(option.data.moduleId) - (y + 1))) },
                        url: '../../Feedback/GetPracticeArea',
                        success: function (response) {
                            for (var y = 1; y <= modord; y++) {
                                totalCompletedQuestions = totalCompletedQuestions + response[y].Questions.length;
                            }
                        },
                        error: function (err) {
                        }
                    });
                var totque = response.length;
                var moduleid = $('#lastSavedModuleId').val();
                var moduleorder = $('#lastSavedModuleOrder').val();
                var firstLogin = $('#firsttimeResume').val();
                $('#currentmoduleOrder').val(option.moduleorder);
                if (moduleorder != 0 && firstLogin == 0) {
                    var loadedPa2 = $('#target ul').html();
                    var newcompletedPa2 = '';
                    if (moduleorder != 0) {
                        var t = parseInt(moduleorder);
                        var l = parseInt(moduleid);
                        for (var m = moduleorder; m >= 1; m--) {
                            var img = $('#selectedpoe').val().replace("/", "") + m;
                            //$('#li' + moduleorder).attr('onclick', 'manager_feedback.loadcompletedPAQuestion(' + moduleid + ',' + moduleorder + ')');
                            $('#li' + t).attr('onclick', 'manager_feedback.loadcompletedPAQuestion(' + l + ',' + t + ')');
                            newcompletedPa2 = "<li id=lit" + m + "><a href='javascript:manager_feedback.loadcompletedPAQuestion(" + l + "," + t + ")'><span><img src='../../Images/icons/" + img + "-small.png' /></span><p>" + $('#li' + m).text() + "</p></a></li>" + newcompletedPa2;
                            t = t - 1;
                            l = l - 1;
                        }
                    }
                    $('#firsttimeResume').val(1);
                    $('#target ul').html(loadedPa2 + newcompletedPa2);
                }
                $('#totalQuestionsformodule').val(response.length);
                manager_feedback.userratingcount = manager_feedback.GetUserRatingByPoeId(response[0].QuestionId);
                for (var i = 0; i < response.length; i++) {
                    var quetionid = response[i].QuestionOrderNumber;
                    //var totmod = parseInt($('#totalmodules').val()) - 1;
                    //var questaken = (modord * totque) + quetionid;
                    var questaken = totalCompletedQuestions + quetionid;
                    var sliderids = "";
                    var capids = "";
                    var sideBarContent = response[i].SideBarTitle;
                    var ratinghtml = "<div class='clr'></div><div class='rate_question'><div class='user'><img src='../../Images/Feedback/Icon/importanceIcon.png'></div><div class='rateThisQuestion'>" +
                            "<div id='Rno" + response[i].QuestionOrderNumber + "' data-question=" + response[i].QuestionId + " data-moduleid=" + option.data.moduleId + " style='width: 562px; height: 50px; cursor: pointer;  margin: 2%;' class='sliderdiv'>" +
                            "<img src='../../Images/img/rate_slidebg.png'></div></div></div>";

                    var questionhtml = " <li id='q" + response[i].QuestionOrderNumber + "' class= '" + ((manager_feedback.userratingcount == 1) ? "questionContainer" : "questionratingContainer") + "' value=" + questaken + " " + (i < 5 ? "" : "style='display:none'") + "> <div class='questiontaken' >Action " + questaken + "/" + $('#totalQuestions').val() +
                        "</div>" +
                        //"<div class='timetakencontainer'><div class='timetaken'>| Time taken:</div><div class='counterHour'>" + (($('#lastsavedHours').val() != "") ? $('#lastsavedHours').val() : "00") + "</div><div class='collan'>:</div><div class='counterMin'>" + (($('#lastsavedMinutes').val() != "") ? $('#lastsavedMinutes').val() : "00") + "</div><div class='collan'>:</div><div class='counterSec'>" + (($('#lastsavedSeconds').val() != "") ? $('#lastsavedSeconds').val() : "00") + "</div></div>" +
                        " <div class='clr'></div><div class='qn'>" + response[i].QuestionOrderNumber + "</div>" +
                        "<div class='questionarea'>" +
                        //"<h2>" + response[i].QuetionText + "</h2>" +
                        "<p>" + sideBarContent.replace('<strong>', '').replace('</strong>', '').replace('<p>', '').replace('</p>', '').replace('In Detail:', '') + "</p></div><div class='clr'></div><div class='OverallScale'> <div class='importanceArea'><div class='slidercontent'><img src='../../Images/Feedback/Icon/importanceIcon.png'><h4>Importance Scale</h4><p>Select how important this Excellence Action is in your market</p></div></div>   <div class='capabilityArea'><div class='slidercontent'><img src='../../Images/Feedback/Icon/capabilityIcon.png'><h4>Capability Scale</h4><p>Select how ready your team member is to demonstrate this Excellence Action</p></div></div> <div class='frequencyArea'><div class='slidercontent'><img src='../../Images/Feedback/Icon/frequencyIcon.png'><h4>Frequency Scale</h4><p>Select how often your team member demonstrates this Excellence Action</p></div></div></div>";
                    if (manager_feedback.userratingcount == 0) {
                        questionhtml += ratinghtml;
                        $('#rateQuestion').show();
                        $('#importanceDefinition').show();
                        $('.dosdonts').addClass('importanceShowing');
                    }
                    questionhtml += "<div class='clr'></div><div class='mngrfb " + (userresponse.length == 1 ? 'mngrfbGoal1 ' : userresponse.length == 2 ? 'mngrfbGoal2 ' : userresponse.length == 3 ? 'mngrfbGoal3' : 'mngrfbGoals') + "'>";
                    for (var j = 0; j < userresponse.length; j++) {
                        sliderids = sliderids + "Qno" + response[i].QuestionOrderNumber + "fno" + userresponse[j].FeedBackId + ",";
                        capids = capids + "capability" + response[i].QuestionOrderNumber + "fno" + userresponse[j].FeedBackId + ",";
                        questionhtml = questionhtml + " <div class='Capabailityfreq'><div class='userIconArea'><img src='/Uploadify/LoadImageHandler.ashx?id=" + userresponse[j].Teammember.User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' /><span>" + userresponse[j].Teammember.User.FirstName + " " + userresponse[j].Teammember.User.LastName + "</span></div> " +
                            "<div class='overallScalesSlider'><div class='capbabiltyScaleArea'><div class='user'>" +
                           "<img src='../../Images/Feedback/Icon/capabilityIcon.png'>" +
                           "</div>" +
                            "<div class='sliderimg'>" +
                            "<div id='capability" + response[i].QuestionOrderNumber + "fno" + userresponse[j].FeedBackId + "' data-feedback=" + userresponse[j].FeedBackId + " data-question=" + response[i].QuestionId + " data-user=" + userresponse[j].Teammember.User.UserId + " data-moduleid=" + option.data.moduleId + " style='width: 562px; height: 62px; cursor: pointer;' class='sliderdiv'>" +
                            "<img src='../../Images/Feedback/cap2bg.png' /></div></div></div><div class='clr'></div><div class='frequencyScaleArea'><div class='user'>" +
                           "<img src='../../Images/Feedback/Icon/frequencyIcon.png'>" +
                           "</div>" +
                            "<div class='sliderimg'>" +
                            "<div id='Qno" + response[i].QuestionOrderNumber + "fno" + userresponse[j].FeedBackId + "' data-feedback=" + userresponse[j].FeedBackId + " data-question=" + response[i].QuestionId + " data-user=" + userresponse[j].Teammember.User.UserId + " data-moduleid=" + option.data.moduleId + " style='width: 562px; height: 62px; cursor: pointer;' class='sliderdiv'>" +
                            "<img src='../../Images/img/slidebg1.png' /></div></div></div></div></div>";
                    }

                    questionhtml = questionhtml + "</div> <input type='hidden' id='curq" + response[i].QuestionOrderNumber + "' value=" + sliderids + " /><input type='hidden' id='curCap" + response[i].QuestionOrderNumber + "' value=" + capids + " />";
                    allSliderids = allSliderids + sliderids;
                    var stringhidden = "";

                    if (i != 0) {
                        slidehtml = slidehtml + "<a href='#' class='prevfb' id='p" + response[i].QuestionOrderNumber + "' onclick='manager_feedback.prevclick(" + response[i].QuestionOrderNumber + "," + response[i - 1].QuestionOrderNumber + ")'>Previous</a> ";
                    } else {
                        slidehtml = slidehtml + "<a href='#' class='prevfb' id='p" + response[i].QuestionOrderNumber + "' onclick='manager_feedback.prevclick(0," + response[i].QuestionOrderNumber + ")'>Previous</a> ";
                    }
                    if (i < response.length - 1) {
                        slidehtml = slidehtml + " <a href='#' class='nxtfb' id='bn" + response[i].QuestionOrderNumber + "' onclick='manager_feedback.nextclick(" + response[i].QuestionOrderNumber + "," + response[i + 1].QuestionOrderNumber + ")'>Next</a>";
                    } else {
                        slidehtml = slidehtml + "<a href='#' class='nxtfb' id='bn" + response[i].QuestionOrderNumber + "' onclick='manager_feedback.loadNextContent()'>Next</a>";

                        var totalmodules = $('#totalmodules').val();
                        var currentmoduleOrder = $('#currentmoduleOrder').val();
                        if (totalmodules != currentmoduleOrder) {
                            stringhidden = stringhidden + "<li style='display:none'><div class='customertiles'><div id='feedbackMFB'><div class='tsf'>Give Feedback</div>" + (parseInt(totalmodules) > 7 ? '<div class="scroll4"><ul id="poemodule2">' : '<ul>') + $('#nextmodule').val() + "</ul></div></div></div></li>";
                        } else {
                            stringhidden = stringhidden + "<li style='display:none'><div class='customertiles'><div id='connectMFB'><div class='tsf'>Connect</div>" + (parseInt(totalmodules) > 7 ? '<div class="scroll3"><ul id="poemodule3">' : '<ul>') + $('#nextmodule').val() + "</ul></div></div></div></li>";
                            slidehtml = slidehtml + "<a href='#' class='prevfb' id='plast' onclick='manager_feedback.loadlastansweredquestion(" + response[i].QuestionOrderNumber + ")'>Previous</a> ";
                            questionhtml += completedhtml;
                        }
                    }

                    stringhidden = stringhidden + " </li>";
                    html = html + questionhtml + stringhidden;
                }
                // alert($('#capabilityMode').val());
                $('#sliderbtn').html("<div id='slidefb'>" + slidehtml + "</div>");
                $('#pagetxt').html('Page ' + response[0].QuestionOrderNumber + ' of ' + $('#totalQuestionsformodule').val());
                $('#allsliderids').val(allSliderids);
                $('.pageholder').hide().fadeIn('slow');
                $('#questions').hide().html(html).fadeIn('slow');
                $('.frequencydiv').hide().fadeIn('slow');
                if ($('#capabilityMode').val() == 0) {
                    $('.capbabiltyScaleArea').hide();
                    $('.mngrfb').addClass('capabilityRemoved');
                    $('.rate_question').addClass('rateThisquestionmove');
                }
                if ($('#capabilityMode').val() == 0 && manager_feedback.userratingcount != 0) {
                    $('.importanceArea').hide();
                    $('.capabilityArea').hide();
                    $('.OverallScale').addClass('hidingtwoarea');
                    $('#impdefinition').hide();
                    $('#coachDateCont').hide();
                } else
                    if (manager_feedback.userratingcount != 0) {
                        $('.importanceArea').hide();
                        $('.OverallScale').addClass('hidingImportance');
                        $('#impdefinition').hide();
                    } else if ($('#capabilityMode').val() == 0) {
                        $('.capabilityArea').hide();
                        $('#coachDateCont').hide();
                        $('.OverallScale').addClass('capabilityAreaRemoved');
                    }
                $('#lihdn' + (parseInt(option.moduleorder) - 1)).removeClass('selected');
                if (!$('#lihdn' + (parseInt(option.moduleorder))).hasClass('emptyTile'))
                    $('#lihdn' + (parseInt(option.moduleorder))).addClass('selected');
                manager_feedback.loaddetailslider(response, userresponse);

                //manager_feedback.loadTopmmebers(response[0].QuestionId);

                $('.prev').each(function () {
                    $(this).hide();
                });
                for (var k = 0; k < response.length; k++) {
                    $('#p' + response[k].QuestionOrderNumber).hide();
                    $('#bn' + response[k].QuestionOrderNumber).hide();
                }
                $('#bn' + response[0].QuestionOrderNumber).show();

                // manager_feedback.loadCoachingUsers(userresponse);

                var status = parseInt($('#fbStatus').val());
                if (option.moduleorder != 2) {
                    $('#p1').show();
                } else {
                    //alert(option.moduleorder);
                    $('#p1').hide();
                }
                //if (status == 1) {
                //    var lastquestion = parseInt($('#lastSavedQuestionOrder').val());

                //    if (lastquestion != 0) {
                //        for (var j = 1; j < lastquestion; j++) {
                //            //manager_feedback.nextclick(j, j + 1);
                //        }
                //    }
                //    $('#lastSavedQuestionOrder').val(0);
                //}


                $('.mngrfb').slimScroll({
                    // railVisible: true,
                    height: "auto",
                    color: "#FFF",
                    width: "auto",
                    size: "10px",
                    alwaysVisible: true,
                    wheelStep: 30,
                    railVisible: true,
                    railColor: 'red',
                    railOpacity: 0.3,
                });
                $('.scroll2').slimScroll();
                $('.scroll3').slimScroll();
                $('.scroll4').slimScroll();
                //if (userresponse.length <= 4 && manager_feedback.userratingcount == 1) {
                //    $('.mngrfb').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                //}
                //else if (userresponse.length <= 3 && manager_feedback.userratingcount == 0) {
                //    $('.mngrfb').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                //}
                //else {
                //    $('.mngrfb').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                //}
               
                if (userresponse.length <= 3 && $('#capabilityMode').val() == 0) {

                    $('.mngrfb').parents('.slimScrollDiv').addClass('dummy-slimscrollbar-backgound');
                    $('.mngrfb').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                } else
                    if (userresponse.length <= 2) {
                        $('.mngrfb').parents('.slimScrollDiv').addClass('dummy-slimscrollbar-backgound');
                        $('.mngrfb').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                    }
                    else {
                        // $('.mngrfb').slimScroll();
                        $('.mngrfb').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                    }
                if (manager_feedback.userratingcount != 0) {
                    $('.mngrfb').parents('.slimScrollDiv').addClass('noImportance');
                    if (userresponse.length <= 3) {
                        $('.mngrfb').parents('.slimScrollDiv').addClass('lessthanScale');
                    }
                }

            },
            error: function (err) {
                window.location = "../Home/ErrorMsg";
            }
        });
        if (parseInt($('#totalmodules').val()) > 7) {
            var scrollToInt = $('.scroll2')[0].scrollHeight + 'px';
            manager_feedback.loadSlimScroll(scrollToInt, (option.moduleorder - 1));
            //if ((option.moduleorder - 1) >= 5) {
            //    $('.scroll2').slimScroll({ scrollTo: scrollToInt });
            //}
        }
    },
    loadNextContent: function () {
        //debugger;
        // alert($('#curq' + $('#totalQuestionsformodule').val()).val() + " kkkkk" + $('#totalQuestionsformodule').val());
        $("#status,#preloader").show();//.promise().done( function () {
        //setTimeout(function () {
        var current = $('.nxtfb:visible').attr('id').replace('bn', '');
        if (($('#Rno' + current).data('rating') == 0 || $('#Rno' + current).data('rating') == undefined) && $('#Rno' + current).length != 0) {
            $('#masterMsgCont').text("Please finish responding before progressing.");
            $('#overallCont').show();
            $("#status,#preloader").hide();
            //alert('Please rate this Excellence Action');
        }
        else if (!manager_feedback.CheckQuestionanswered(current)) {
            $('#masterMsgCont').text("Please finish responding before progressing.");
            $('#overallCont').show();
            $("#status,#preloader").hide();
            // alert('Please indicate a frequency that represents how often the Excellence Actions are demonstrated');
        }
        else {
            var scrollToInt = 0 + 'px';
            if (parseInt($('#totalmodules').val()) > 7) {
                scrollToInt = $('.scroll2')[0].scrollHeight + 'px';
            }
            //$('.pageholder').hide();
            // manager_feedback.saveModuleData();
            $("#status,#preloader").fadeIn();
            manager_feedback.saveQuestionData($('#curq' + $('#totalQuestionsformodule').val()).val(), $('#totalQuestionsformodule').val());
            $("#status,#preloader").fadeIn();
            var totalmodules = $('#totalmodules').val();
            var currentmoduleOrder = $('#currentmoduleOrder').val();
            Common.ajax({
                url: "/Feedback/CheckTheCompletedFeedback",
                data: { 'currentmoduleOrder': currentmoduleOrder },
                success: function (response) {
                    //debugger;
                    $("#status").fadeIn();
                    $("#preloader").delay(100).fadeIn("slow");
                    if (response == "True") {
                        if (totalmodules != currentmoduleOrder) {
                            var curmod = parseInt($('#currentmoduleOrder').val());
                            var nextmod = curmod + 1;

                            // saving the time taken in previous modules in temp hidden variables.
                            $('#lastsavedHours').val($('.counterHour:first').html());
                            $('#lastsavedMinutes').val($('.counterMin:first').html());
                            $('#lastsavedSeconds').val($('.counterSec:first').html());

                            //$('#li' + (parseInt(curmod) - 1)).removeClass('select' + $('#selectedpoe').val() + (parseInt(curmod) - 1)).removeClass('selected');

                            // $('#li' + (parseInt(nextmod) - 1)).addClass('select' + $('#selectedpoe').val() + (parseInt(nextmod) - 1)).addClass('selected');
                            $('#li' + (parseInt(curmod) - 1)).removeClass('selected');
                            $('#li' + (parseInt(curmod) - 1)).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + (parseInt(curmod) - 1) + ".png");
                            $('#li' + (parseInt(nextmod) - 1)).addClass('selected');
                            $('#li' + (parseInt(nextmod) - 1)).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + (parseInt(nextmod) - 1) + "h.png");

                            $('#poemoduleName').text($('#li' + (parseInt(nextmod) - 1)).find('p').text());
                            manager_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': $('#modulehdn' + nextmod).val() }, moduleorder: nextmod });

                            $('#currentmoduleOrder').val(nextmod);

                            manager_feedback.loadCompletedPracticeArea($('#modulehdn' + curmod).val(), (parseInt(curmod) - 1));
                            //PR added
                            manager_feedback.loadCompletedPracticeArea($('#modulehdn' + (curmod + 1)).val(), parseInt(curmod));
                        } else {
                            // manager_feedback.loadstopclock();
                            //$("#status").fadeIn();
                            //$("#preloader").delay(100).fadeIn("slow");
                            $('.feedbackcomplete').show();
                            currentqn = $('.nxtfb:visible').attr('id').replace('bn', '');
                            $('#q' + (currentqn - 1)).hide('slow');
                            $('#q' + currentqn).css({ 'opacity': '0.1', 'left': '-8.5%' });
                            $('.feedbackcomplete').css({ 'position': 'relative', 'left': '-10%', 'margin-left': '0', 'opacity': '2' });
                            $('.nxtfb:visible').hide();
                            $('.prevfb:visible').hide(); $('#plast').show();
                            //setTimeout(function () {
                            //    manager_feedback.completefeedback();
                            //    window.location = "../../Feedback/Connect";
                            //}, 1500);
                        }
                    } else {
                        window.location = "../../Feedback/Feedback";
                    }
                    $('#q1').css({ 'position': 'relative', 'left': '-1%' });
                    $('#q2').css({ 'position': 'relative', 'left': '-6%', 'opacity': '.1' });
                    $('.mngrfb').slimScroll();
                    $("#status,#preloader").hide();
                    $("#status").fadeOut();
                    $("#preloader").delay(100).fadeOut("slow");
                },
                error: function (err) {
                    window.location = "../Home/ErrorMsg";
                }
            });
            manager_feedback.loadSlimScroll(scrollToInt, currentmoduleOrder);

            $("#status").fadeOut();
            $("#preloader").delay(300).fadeOut("slow");
            //},5000);

            //if (parseInt(currentmoduleOrder) >= 5) {
            //    $('.scroll2').slimScroll({ scrollTo: scrollToInt });
            //}
        }
    },
    // save the completed module data

    saveQuestionData: function (questionids, current) {
        //alert(questionids + "," + current);
        //debugger;

        var response = questionids.slice(0, -1).split(",");
        //var capability = questionids.slice(0, -1).split(",")[0].replace('Qno', 'capability');
        // alert(capability);
        var savePOEResultRequests = [];
        for (var i = 0; i < response.length; i++) {
            var savePOEResultRequest = new Requests.SavePOEResultRequest();
            savePOEResultRequest.Answer = parseInt($('#' + response[i]).data("answer"));
            savePOEResultRequest.AnswerType = 1;
            savePOEResultRequest.ModuleNumber = $('#' + response[i]).data("moduleid");
            savePOEResultRequest.CapabilityAnswer = parseInt($('#' + response[i].replace('Qno', 'capability')).data("answer"));
            savePOEResultRequest.QuestionId = $('#' + response[i]).data("question");
            savePOEResultRequest.FeedbackId = $('#' + response[i]).data("feedback");
            savePOEResultRequest.UserRating = ($('#Rno' + current).length > 0 && i == 0) ? $('#Rno' + current).data("rating") : 0;
            savePOEResultRequest.Notes = $('#' + response[i]).data("Notes");
            savePOEResultRequest.Comment = null;
            savePOEResultRequest.FeedbackStatus = 1;
            savePOEResultRequests.push(savePOEResultRequest);
        }

        saveFeedbackResults(savePOEResultRequests);
    },
    saveModuleData: function () {
        // debugger;
        var userscount = ($('#allsliderids').val().split(',').length - 1) / $('#totalQuestionsformodule').val();
        var response = $('#allsliderids').val().slice(0, -1).split(",");
        var savePOEResultRequests = [];
        var j = 1;
        for (var i = 0; i < response.length; i++) {
            var savePOEResultRequest = new Requests.SavePOEResultRequest();
            savePOEResultRequest.Answer = parseInt($('#' + response[i]).data("answer"));
            savePOEResultRequest.AnswerType = 1;
            savePOEResultRequest.ModuleNumber = $('#' + response[i]).data("moduleid");
            savePOEResultRequest.CapabilityAnswer = parseInt($('#' + response[i].replace('Qno', 'capability')).data("answer"));
            savePOEResultRequest.QuestionId = $('#' + response[i]).data("question");
            savePOEResultRequest.FeedbackId = $('#' + response[i]).data("feedback");
            savePOEResultRequest.UserRating = ($('#Rno' + j).length > 0 && i % userscount == 0) ? $('#Rno' + j).data("rating") : 0;
            savePOEResultRequest.Notes = $('#' + response[i]).data("Notes");
            savePOEResultRequest.Comment = null;
            savePOEResultRequest.FeedbackStatus = 1;
            savePOEResultRequests.push(savePOEResultRequest);
            if (i % userscount == 0) {
                j++;
            }
        }

        saveFeedbackResults(savePOEResultRequests);
    },
    //Complete feedback
    completefeedback: function () {
        var elemets = ($('#feedbackids').val().slice(0, -1).split(","));
        //alert(elemets.length);
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
                savePOEResultRequest.Initials = $('#fbinitial').val();
                savePOEResultRequests.push(savePOEResultRequest);
            }
        }

        completeFeedback(savePOEResultRequests);
    },

    loaddetailslider: function (response, userresponse) {
        for (var i = 0; i < response.length; i++) {
            for (var j = 0; j < userresponse.length; j++) {
                var element = 'Qno' + response[i].QuestionOrderNumber + 'fno' + userresponse[j].FeedBackId;
                var rateelement = 'Rno' + response[i].QuestionOrderNumber;
                var capabilityelement = 'capability' + response[i].QuestionOrderNumber + 'fno' + userresponse[j].FeedBackId;
                $('#' + element).data("answer", manager_feedback.loadSelectedAnswer({ data: { 'feedbackId': userresponse[j].FeedBackId, 'questionId': response[i].QuestionId } }));
                $('#' + capabilityelement).data("answer", manager_feedback.loadSelectedCapability({ data: { 'feedbackId': userresponse[j].FeedBackId, 'questionId': response[i].QuestionId } }));
                $('#' + element).data("Notes", manager_feedback.loadSelectedNotes({ data: { 'feedbackId': userresponse[j].FeedBackId, 'questionId': response[i].QuestionId } }));
                if (j == 0) {
                    var rates = manager_feedback.loadSelectedRating({ data: { 'feedbackId': userresponse[j].FeedBackId, 'questionId': response[i].QuestionId } });
                    $('#' + rateelement).data("rating", manager_feedback.loadSelectedRating({ data: { 'feedbackId': userresponse[j].FeedBackId, 'questionId': response[i].QuestionId } }));

                    $('#' + rateelement).slider({
                        min: 0,
                        max: 4,
                        range: "min",
                        value: manager_feedback.loadSelectedRating({ data: { 'feedbackId': userresponse[j].FeedBackId, 'questionId': response[i].QuestionId } }),
                        slide: function (event, ui) {
                            if (ui.value != 0) {
                                $(this).find('.ui-slider-range').removeClass('sliderdivRateQuestion1');
                                $(this).find('.ui-slider-range').removeClass('sliderdivRateQuestion2');
                                $(this).find('.ui-slider-range').removeClass('sliderdivRateQuestion3');
                                $(this).find('.ui-slider-range').removeClass('sliderdivRateQuestion4');
                            }

                            if (ui.value == 1) {
                                $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion1');
                            } else if (ui.value == 2) {
                                $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion2');
                            } else if (ui.value == 3) {
                                $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion3');
                            } else if (ui.value == 4) {
                                $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion4');
                            }
                            if (ui.value == 0) {
                                event.preventDefault();
                                $('#' + event.target.id).data("rating", 1);
                            } else {
                                $('#' + event.target.id).data("rating", ui.value);
                            }
                        },
                        create: function (event, ui) {
                            if (rates == 1) {
                                // alert('first');
                                $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion1');
                            } else if (rates == 2) {
                                $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion2');
                            } else if (rates == 3) {
                                $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion3');
                            } else if (rates == 4) {
                                $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion4');
                            }
                        }
                    });
                }
                var cap = manager_feedback.loadSelectedCapability({ data: { 'feedbackId': userresponse[j].FeedBackId, 'questionId': response[i].QuestionId } });
                $('#' + capabilityelement).slider({
                    min: 0,
                    max: 4,
                    range: "min",
                    value: cap,
                    slide: function (event, ui) {
                        if (ui.value != 0) {
                            $(this).find('.ui-slider-range').removeClass('sliderdivCapQuestion1');
                            $(this).find('.ui-slider-range').removeClass('sliderdivCapQuestion2');
                            $(this).find('.ui-slider-range').removeClass('sliderdivCapQuestion3');
                            $(this).find('.ui-slider-range').removeClass('sliderdivCapQuestion4');
                        }
                        //if (ui.value == 0) {
                        //    $(this).find('.ui-slider-range').addClass('sliderdiv1');
                        //} else
                        if (ui.value == 1) {
                            $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion1');
                        } else if (ui.value == 2) {
                            $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion2');
                        } else if (ui.value == 3) {
                            $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion3');
                        } else if (ui.value == 4) {
                            $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion4');
                        }

                        if (ui.value == 0) {
                            event.preventDefault();
                            $('#' + event.target.id).data("answer", 1);
                        } else {
                            $('#' + event.target.id).data("answer", ui.value);
                        }
                    },
                    create: function (event, ui) {
                        if (cap == 1) {
                            // alert('first');
                            $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion1');
                        } else if (cap == 2) {
                            $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion2');
                        } else if (cap == 3) {
                            $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion3');
                        } else if (cap == 4) {
                            $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion4');
                        }
                    }
                });
                var ans = manager_feedback.loadSelectedAnswer({ data: { 'feedbackId': userresponse[j].FeedBackId, 'questionId': response[i].QuestionId } });

                $('#' + element).slider({
                    min: 0,
                    max: 4,
                    range: "min",
                    value: ans,
                    slide: function (event, ui) {
                        if (ui.value != 0) {
                            $(this).find('.ui-slider-range').removeClass('sliderdiv1');
                            $(this).find('.ui-slider-range').removeClass('sliderdiv2');
                            $(this).find('.ui-slider-range').removeClass('sliderdiv3');
                            $(this).find('.ui-slider-range').removeClass('sliderdiv4');
                        }
                        //if (ui.value == 0) {
                        //    $(this).find('.ui-slider-range').addClass('sliderdiv1');
                        //} else
                        if (ui.value == 1) {
                            $(this).find('.ui-slider-range').addClass('sliderdiv1');
                        } else if (ui.value == 2) {
                            $(this).find('.ui-slider-range').addClass('sliderdiv2');
                        } else if (ui.value == 3) {
                            $(this).find('.ui-slider-range').addClass('sliderdiv3');
                        } else if (ui.value == 4) {
                            $(this).find('.ui-slider-range').addClass('sliderdiv4');
                        }

                        if (ui.value == 0) {
                            event.preventDefault();
                            $('#' + event.target.id).data("answer", 1);
                        } else {
                            $('#' + event.target.id).data("answer", ui.value);
                        }
                    },
                    create: function (event, ui) {
                        if (ans == 1) {
                            // alert('first');
                            $(this).find('.ui-slider-range').addClass('sliderdiv1');
                        } else if (ans == 2) {
                            $(this).find('.ui-slider-range').addClass('sliderdiv2');
                        } else if (ans == 3) {
                            $(this).find('.ui-slider-range').addClass('sliderdiv3');
                        } else if (ans == 4) {
                            $(this).find('.ui-slider-range').addClass('sliderdiv4');
                        }
                    }
                });
            }
        }
    },
    prevclick: function (current, previous) {
        //debugger;

        if (current != 0) {
            $('.prevfb,.nxtfb').hide();
            $('#p' + current).hide();
            $('#bn' + current).hide();
            $('#p' + previous).show();
            $('#bn' + previous).show();
            $('#pagetxt').html('Page ' + previous + ' of ' + $('#totalQuestionsformodule').val());

            if (current != 2) {
                $('#q' + (current - 2)).show('slow');
                $('#q' + previous).css('opacity', '1').animate({ 'left': '-11%' }, { duration: 400 });
                $('#q' + (previous + 1)).css('opacity', '0.1').animate({ 'left': '-13%' }, { duration: 400 });
            } else {
                $('#q' + previous).css('opacity', '1').animate({ 'left': '0%' }, { duration: 400 }).css('margin-left', '1.5%');
                $('#q' + (previous + 1)).css('opacity', '0.1').animate({ 'left': '-2%' }, { duration: 400 });
                for (var i = (current + 1) ; i < $('#totalQuestionsformodule').val() ; i++) {
                    $('#q' + i).css('position', 'static');
                }
            }
            if (previous == 4) {
                $('.customertiles').parent('li').hide();
            }


            var noofOccurences = parseInt($('#totalQuestionsformodule').val()) / 5;
            var questionDisplay = current % 5;
            var count = 0;
            for (var n = 1; n <= noofOccurences; n++) {
                if (questionDisplay == 0) {
                    if ((n * 4) + n == current) {
                        for (var i = current; i < parseInt($('#totalQuestionsformodule').val()) ; i++) {
                            if (count <= 4) {
                                $('#q' + (i + 1)).hide();
                            }
                            count++;
                        }
                    }
                }
            }
            // manager_feedback.loadTopmmebers($('#Qno' + previous).data("question"));
            /// manager_feedback.LoadSelectedUserNote();
        } else {
            //debugger;
            manager_feedback.loadcompletedPAQuestion((parseInt($('#poemodule>li.selected').attr("data-value")) - 1), (parseInt($('#poemodule>li.selected').attr("id").replace("li", "")) - 1))
            var currentslide = parseInt($('#totalQuestionsformodule').val()) - 1;
            $("#status").fadeIn();
            $("#preloader").delay(100).fadeIn("slow");
            $('#q' + parseInt($('#totalQuestionsformodule').val())).show();
            for (var k = 0; k < (parseInt($('#totalQuestionsformodule').val()) - 3) ; k++) {
                //debugger;
                $('#q' + (k + 1)).hide();
                $('#q' + (k + 1)).css("left", "-9%").css("position", "relative").css("margin-left", "0px").css("opacity", "0.1");
            }
            $('.feedbackcomplete,.hidfeedback').hide();
            $('#prevMode').val(1);
            manager_feedback.nextclick(currentslide, parseInt($('#totalQuestionsformodule').val()));
            $('#q' + (parseInt($('#totalQuestionsformodule').val()) - 1)).css("left", "-9%").css("margin-left", "0px").css("opacity", "0.1").css("position", "relative");
            setTimeout(function () {
                $('#q' + (parseInt($('#totalQuestionsformodule').val()) - 1)).css("left", "-9%").css("margin-left", "0px").css("opacity", "0.1").css("position", "relative");
                $('#q' + (parseInt($('#totalQuestionsformodule').val()) - 2)).css("left", "-9%").css("margin-left", "0px").css("opacity", "0.1").css("position", "relative");
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
            }, 1000);
        }
        if ($('#currentmoduleOrder').val() == 2) {
            $('#p1').hide();
        }
    },
    nextclick: function (current, next) {
        if (($('#Rno' + current).data('rating') == 0 || $('#Rno' + current).data('rating') == undefined) && $('#Rno' + current).length != 0) {
            $('#masterMsgCont').text("Please finish responding before progressing.");
            $('#overallCont').show();
            // alert('Please rate this Excellence Action');
        }
        else if (!manager_feedback.CheckQuestionanswered(current)) {
            $('#masterMsgCont').text("Please finish responding before progressing.");
            $('#overallCont').show();
            //alert('Please indicate a frequency that represents how often the Excellence Actions are demonstrated');
        }
        else if (!manager_feedback.CheckCapabilityanswered(current) && $('#capabilityMode').val() != 0) {
            $('#masterMsgCont').text("Please finish responding before progressing.");
            $('#overallCont').show();
            //alert('Please indicate a frequency that represents how often the Excellence Actions are demonstrated');
        }
        else {
            var currentmoduleOrder = $('#currentmoduleOrder').val();
            $('.prevfb,.nxtfb').hide();
            $('#p' + current).hide();
            $('#bn' + current).hide();
            $('#p' + next).show();
            $('#bn' + next).show();

            $('#pagetxt').html('Page ' + next + ' of ' + $('#totalQuestionsformodule').val());
            if (current != 1) {
                $('#q' + (current - 1)).hide('slow');
            }
            if ($('#prevMode').val() != 1) {
                $('#q' + current).css('position', 'relative').css('opacity', '0.1').css('margin-left', '0').animate({ 'left': '-9%' }, { duration: 400 });
            } else {
                $('#prevMode').val(0);
                $('#q' + (current)).show("slow");
                $('#q' + next).css('position', 'relative').css('opacity', '0.1').css('margin-left', '0').animate({ 'left': '-9%' }, { duration: 400 });
                $('#q' + (current)).css('opacity', '0.1');
                $('#q' + (current)).css('margin-left', '0px');
                $('#q' + (current)).css('left', '-9.7%');
            }
            var noofOccurences = parseInt($('#totalQuestionsformodule').val()) / 5;
            var questionDisplay = next % 5;
            var count = 0;
            if (current == (parseInt($('#totalQuestionsformodule').val()) - 1)) {
                $('.customertiles').parent('li').show();
            }
            for (var n = 1; n <= noofOccurences; n++) {
                if (questionDisplay == 0) {
                    if ((n * 4) + n == next) {
                        for (var i = next; i < (parseInt($('#totalQuestionsformodule').val())) ; i++) {
                            if (count <= 4) {
                                $('#q' + (i + 1)).show();
                            }
                            count++;
                        }
                    }
                }
            }
            $('#q' + next).css('position', 'relative').animate({ 'left': '-11%' }, { duration: 400 }).css('margin-left', '0').css('opacity', '1');
            $('#q' + (next + 1)).css('position', 'relative').css('opacity', '.1').animate({ 'left': '-13%' }, { duration: 400 }).css('margin-left', '0');
            // alert($('#curq' + current).val() + " kkkkk" + current);
            manager_feedback.saveQuestionData($('#curq' + current).val(), current);
            //manager_feedback.loadTopmmebers($('#Qno' + next).data("question"));
            if (parseInt($('#totalmodules').val()) > 7 && (parseInt($('#totalmodules').val()) - 1) >= currentmoduleOrder) {
                var scrollToInt1 = $('.scroll4')[0].scrollHeight + 'px';
                if ((parseInt(currentmoduleOrder) - 1) >= 5) {
                    $('.scroll4').slimScroll({ scrollTo: scrollToInt1 });
                }
            }
            // manager_feedback.LoadSelectedUserNote();
        }
    },
    //Load the timer event
    //loadclockevent: function () {
    //    $('.counterSec').fadeOut(500).html(0).fadeIn(500);
    //    $('.counterMin').fadeOut(500).html(0).fadeIn(500);
    //    timer = setInterval("manager_feedback.loadincreasecounter()", 1000);
    //},
    //Load Comment window
    //loadcommentline: function () {
    //    $('#connectmembrs .usersconnect').live('click', function () {
    //        $(this).find('span').toggleClass('slidecontentselect');
    //    });
    //    $('#submitbtn').click(function () {
    //        var txtareavalText = $('textarea').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
    //        if (txtareavalText == "") {
    //            alert('Please Enter the Text');
    //        } else {
    //            manager_feedback.PostCommnet();
    //        }
    //    });
    //    var loadCSS = function (callback) {
    //        var link = document.createElement('link');
    //        link.type = 'text/css';
    //        link.rel = 'stylesheet';
    //        link.href = "/Scripts/ref/editor/themes/square.min.css";
    //        link.id = 'theme-style';

    //        document.getElementsByTagName('head')[0].appendChild(link);

    //        var img = document.createElement('img');
    //        img.onerror = function () {
    //            if (callback) callback(link);
    //        };
    //        img.src = "/Scripts/ref/editor/themes/square.min.css";
    //    };
    //    var initEditor = function () {
    //        $("textarea").sceditor({
    //            plugins: 'xhtml',
    //            resizeEnabled: false,
    //            toolbar: "bold,italic,underline,left,center,right,justify,bulletlist,orderedlist",
    //            style: "/Scripts/ref/editor/jquery.sceditor.default.min.css"
    //        });
    //    };
    //    initEditor();
    //    loadCSS(initEditor);
    //},

    //Load Previous content
    //loadTopmmebers: function (quesionid) {
    //    $('.vs-context-menu').hide("slow");
    //    Common.ajaxsync({
    //        url: "/Feedback/GetConnectMembers?type=2&quesionid=" + quesionid,
    //        success: function (response) {
    //            $("#status").fadeOut();
    //            $("#preloader").delay(100).fadeOut("slow");
    //            var html = '';
    //            if (response.length != 0) {
    //                var limit = (response.length < 9) ? response.length : 9;
    //                for (var i = 0; i < limit; i++) {
    //                    html = html + "<li data-value=" + response[i].User.UserId + " class='usersconnect'><a href='#'>" +
    //                        "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='95' height='95' alt='User' />" +
    //                        "<span></span>" +
    //                        "<p class='spanname'>" + response[i].User.FirstName + " " + response[i].User.LastName + "</p>" +
    //                        "</a></li>";
    //                }
    //            }
    //            if (response.length != 0 && response.length < 9) {
    //                var balCount = 9 - response.length;
    //                for (var j = 0; j < balCount; j++) {
    //                    html = html + "<li> <img src='../Images/you.png' width='95' height='95' alt='Connect'/> </li>";
    //                }
    //            }
    //            if (response.length == 0) {
    //                for (var k = 0; k < 9; k++) {
    //                    html = html + "<li> <img src='../Images/you.png' width='95' height='95' alt='Connect'/> </li>";
    //                }
    //            }

    //            $('#connectmembrs').html(html);
    //            if (response.length > 9) {
    //                $('.mentorscroll').slimscroll();
    //            }
    //        },
    //        error: function (err) {
    //            window.location = "../Home/ErrorMsg";
    //        }
    //    });
    //},
    //PostCommnet: function () {
    //    var userid = new Array();
    //    $('#connectmembrs .slidecontentselect').each(function () {
    //        userid.push($(this).parent().parent().data('value'));
    //    });

    //    var selectedmodule = $('#poemodule .selected')[0].innerText;
    //    // var html = $('textarea').sceditor('instance').getBody()[0].innerHTML;
    //    var html = $('textarea').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
    //    $('#comments').val(html.trim());
    //    $('#subject').val("Comment regarding " + selectedmodule + " poe");
    //    $('#useridslist').val(userid);
    //    var form = $('#PostComments');
    //    var formData = new FormData(form[0]);
    //    $.ajax({
    //        type: "POST",
    //        url: form.attr('action'),
    //        enctype: 'multipart/form-data',
    //        data: formData,
    //        success: function (data) {
    //            alert("Message sent successfully");
    //            $('#subject').val('');
    //            $('#comments').val('');
    //            $('#selectedmembershdn').val('');
    //            $('#selectedmembersdiv').html('');
    //            $('textarea').sceditor('instance').val('');
    //            $('#connectmembrs li a span').removeClass('slidecontentselect');
    //        },
    //        error: function (e) {
    //        },
    //        cache: false,
    //        contentType: false,
    //        processData: false
    //    });
    //    return false;
    //},
    //Intialize the timer functionalities
    //loadincreasecounter: function () {
    //    var secVal;
    //    var minVal;
    //    secVal = parseInt($('.counterSec').html(), 10);
    //    minVal = parseInt($('.counterMin').html(), 10);
    //    if (secVal != 59)
    //        $('.counterSec').html((secVal + 1));
    //    else {
    //        if (minVal != 59) {
    //            $('.counterMin').html((minVal + 1));
    //        }
    //        else {
    //            $('.counterHour').html((parseInt($('.counterHour').html(), 10) + 1));
    //            $('.counterMin').html(0);
    //        }
    //        $('.counterSec').html(0);
    //    }
    //},
    //stop the timer event
    //loadstopclock: function () {
    //    clearInterval(timer);
    //},
    //Load the module
    loadModuleIds: function (option) {
        var moduleIds = new Array();
        Common.ajaxsync({
            url: option.url,
            success: function (response) {
                var moduleResponseLength = response.length;
                var module = "";
                var modulehdnstr = "";
                var modulehidden = "";
                for (var i = 0; i < response.length; i++) {
                    moduleIds[response[i].ModuleOrderNumber] = response[i].ModuleId;

                    modulehidden = modulehidden + "<input type='hidden' id='modulehdn" + (i + 1) + "' value=" + response[i].ModuleId + " />";

                    if (response[i].ModuleOrderNumber > 0) {
                        var img = $('#selectedpoe').val().replace("/", "") + response[i].ModuleOrderNumber;
                        //module = module + "<li id ='li" + response[i].ModuleOrderNumber + "' data-value=" + response[i].ModuleId + "  class='" + img + "Tile" + ((response[i].ModuleOrderNumber == 1) ? ' select' + img + ' selected' : '') + "'><p>" + response[i].ModuleName + "</p></li>";
                        module = module + "<li id ='li" + response[i].ModuleOrderNumber + "' data-value=" + response[i].ModuleId + "  class='" + ((response[i].ModuleOrderNumber == 1) ? 'selected' : '') + "'><img src='../Images/icons/" + img + ".png' /><p>" + response[i].ModuleName + "</p></li>";
                    }
                    if (response[i].ModuleOrderNumber > 0) {
                        var img = $('#selectedpoe').val().replace("/", "") + response[i].ModuleOrderNumber;
                        modulehdnstr = modulehdnstr + "<li id ='lihdn" + response[i].ModuleOrderNumber + "' class='" + img + "Tile'><p>" + response[i].ModuleName + "</p></li>";
                    }
                }
                var practiceArea1 = (response.length < 7 ? (7 - response.length) : 0);
                if ((response.length - 1) <= 6) {
                    //$('#poemodule').parent('div').removeClass('scroll2');
                    $('#poemodule').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                    //$('#poemodule').parents('.slimScrollDiv').find('.slimScrollRail').remove();
                }
                else {
                    $('#poemodule').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                }
                //for (var pa1 = 0; pa1 < practiceArea1; pa1++) {
                //    module = module + "<li id ='li" + (moduleResponseLength + pa1) + "' data-value=''  class='takesf emptyTile'><p></p><img src='' width='64' height='50'  class='img' />" + "</li>";
                //    modulehdnstr = modulehdnstr + "<li id ='lihdn" + (moduleResponseLength + pa1) + "' class='takesf emptyTile'><p></p><img src='' width='64' height='50'  class='img' />" + "</li>";
                //}
                if (response.length % 2 == 0) {
                    module = module + "<li id ='li" + (response.length + 1) + "' data-value=" + (response.length + 1) + "' data-moduleorder=" + (response.length + 1) + "  class='takesf poelistlidummy' >" + "</li>";
                }
                $('#nextmodule').val(modulehdnstr);
                $('#modules').html(modulehidden);
                module = module + "";

                $('#poemodule').html(module);

                $('#poemodule li').first().find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + 1 + "h" + ".png");
                $('#poemoduleName').text($('#poemodule li').first().find('p').text());
                var status = parseInt($('#fbStatus').val());
                $('#totalmodules').val(response.length);
                if (status == 1) {
                    manager_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': $('#lastSavedModuleId').val() }, moduleorder: parseInt($('#lastSavedModuleOrder').val()) + 1 });
                    $('#poemodule li').each(function (index, item) {
                        $(this).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + (index + 1) + ".png");
                        $(this).removeClass('selected');
                    });
                    $('#li' + parseInt($('#lastSavedModuleOrder').val())).addClass('selected');
                    $('#li' + parseInt($('#lastSavedModuleOrder').val())).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + $('#lastSavedModuleOrder').val() + "h" + ".png");
                    $('#poemoduleName').text($('#li' + parseInt($('#lastSavedModuleOrder').val())).find('p').text());
                    //$('#poemodule li').each(function (index, item) { $(this).removeClass('select' + $('#selectedpoe').val() + (index + 1)) });
                    // $('#li' + parseInt($('#lastSavedModuleOrder').val())).addClass('selected').addClass('select' + $('#selectedpoe').val() + $('#lastSavedModuleOrder').val());
                    $('#currentmoduleOrder').val(parseInt($('#lastSavedModuleOrder').val()) + 1);
                } else {
                    manager_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': $('#modulehdn2').val() }, moduleorder: 2 });
                    $('#currentmoduleOrder').val('2');
                }

                //$('.mngrfb').slimScroll();
            },
            error: function (err) {
                window.location = "../Home/ErrorMsg";
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
                window.location = "../Home/ErrorMsg";
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
                window.location = "../Home/ErrorMsg";
            }
        });
    },
    //Load completed practise area
    loadCompletedPracticeArea: function (moduleid, moduleorder) {
        var img = $('#selectedpoe').val().replace("/", "") + moduleorder;
        var loadedPA = $('#target ul').html();
        var newcompletedPA = '';
        $('#li' + moduleorder).attr('onclick', 'manager_feedback.loadcompletedPAQuestion(' + moduleid + ',' + moduleorder + ')');

        if ($('#lit' + moduleorder).size() == 0) {
            newcompletedPA = "<li id=lit" + moduleorder + "><a href='javascript:manager_feedback.loadcompletedPAQuestion(" + moduleid + "," + moduleorder + ")'><span><img src='../../Images/icons/" + img + "-small.png' /></span><p>" + $('#li' + moduleorder).text() + "</p></a></li>";
        }
        $('#target ul').html(loadedPA + newcompletedPA);
        //$("#status").fadeOut();
        //$("#preloader").delay(100).fadeOut("slow");
    },
    //Loading Completed Questions
    loadcompletedPAQuestion: function (moduleid, moduleorder) {

        // saving the time taken in previous modules in temp hidden variables.
        $('#lastsavedHours').val($('.counterHour:first').html());
        $('#lastsavedMinutes').val($('.counterMin:first').html());
        $('#lastsavedSeconds').val($('.counterSec:first').html());

        $("#status,#preloader").show();//.delay(100).fadeIn("slow", function () {
        var scrollToInt = '0px';
        if (parseInt($('#totalmodules').val()) > 7) {
            scrollToInt = $('.scroll2')[0].scrollHeight + 'px';
        }
        var curmod = parseInt($('#currentmoduleOrder').val());

        //$('#li' + (parseInt(curmod) - 1)).removeClass('select' + $('#selectedpoe').val() + (parseInt(curmod) - 1)).removeClass('selected');
        // $('#li' + (parseInt(moduleorder))).addClass('select' + $('#selectedpoe').val() + (parseInt(moduleorder))).addClass('selected');
        $('#li' + (parseInt(curmod) - 1)).removeClass('selected');
        $('#li' + (parseInt(curmod) - 1)).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + (parseInt(curmod) - 1) + ".png");
        $('#li' + (parseInt(moduleorder))).addClass('selected');
        $('#li' + (parseInt(moduleorder))).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + (parseInt(moduleorder)) + "h.png");
        $('#poemoduleName').text($('#li' + (parseInt(moduleorder))).find('p').text());
        $('#currentmoduleOrder').val((parseInt(moduleorder) + 1));
        $('#currentQuestionorder').val(0);
        $('#currentQuestionno').val(1);
        manager_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': moduleid }, moduleorder: (parseInt(moduleorder) + 1) });
        manager_feedback.loadSlimScroll(scrollToInt, moduleorder);
        //});
        $("#status,#preloader").hide();//.delay(200).fadeOut("slow");
        //if (moduleorder >= 5) {
        //    $('.scroll2').slimScroll({ scrollTo: scrollToInt });
        //}


        $('.mngrfb').slimScroll();
        $('#q1').css({ 'position': 'relative', 'left': '-1%' });
        $('#q2').css({ 'position': 'relative', 'left': '-6%', 'opacity': '.1' });
    },
    //Load Previous content

    //Load selected answer
    loadSelectedAnswer: function (option) {
        $('#selectedanswer').val(1);
        Common.ajaxsync({
            url: "../../Feedback/GetGivenAnswer",
            data: option.data,

            success: function (response) {
                $('#selectedanswer').val(response.Answer > 4 || response == 0 ? 0 : response.Answer);
                $('#selectedrating').val(response.UserRating > 4 || response == 0 ? 0 : response.UserRating);
                $('#selectedNotes').val(response.Notes);
                $('#selectedCapability').val(response.CapabilityAnswer > 4 || response == 0 ? 0 : response.CapabilityAnswer);
            },
            error: function (err) {
                window.location = "../Home/ErrorMsg";
            }
        });
        return parseInt($('#selectedanswer').val());
    },
    loadPoeName: function () {
        Common.ajaxsync({
            url: "../../Common/GetPoeName",
            //  data: option.data,

            success: function (response) {
                $('#selectedpoe').val(response);
            },
            error: function (err) {
                window.location = "../Home/ErrorMsg";
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
    },
    loadSlimScroll: function (scrollToInt, currentmoduleOrder) {
        if (parseInt(currentmoduleOrder) >= 5) {
            $('.scroll2').slimScroll({ scrollTo: scrollToInt });
        }
    },
    GetUserRatingByPoeId: function (quetionid) {
        var resp;
        Common.ajaxSyncPost({
            url: '../../Feedback/GetUserRatingByPoeId',
            data: { questionid: quetionid },
            success: function (response) {
                resp = response;
            },
            error: function (err) {
                resp = response;
            }
        });
        return resp;
    },
    CheckQuestionanswered: function (current) {
        var result = true;
        var items = $('#curq' + current).val().split(',');
        $(items).each(function (index, item) {
            if (item != '') {
                if ($('#' + item).data('answer') == 0) {
                    result = false;
                }
            }
        });
        return result;
    },
    CheckCapabilityanswered: function (current) {
        var result = true;
        var items = $('#curCap' + current).val().split(',');
        $(items).each(function (index, item) {
            // alert(item);
            if (item != '') {
                // alert($('#' + item).data('answer'));
                if ($('#' + item).data('answer') == 0) {
                    result = false;
                }
            }
        });
        return result;
    },
    loadSelectedRating: function (option) {
        //$('#selectedrating').val(0);
        //Common.ajaxsync({
        //    url: "../../Feedback/GetGivenRating",
        //    data: option.data,
        //    beforeSend: function () {
        //        $("#status").fadeIn();
        //        $("#preloader").delay(100).fadeIn("slow");
        //    },
        //    success: function (response) {
        //        $("#status").fadeOut();
        //        $("#preloader").delay(100).fadeOut("slow");
        //        $('#selectedanswer').val(response.Answer > 4 || response == 0 ? 0 : response.Answer);
        //        $('#selectedrating').val(response.UserRating > 4 || response == 0 ? 0 : response.UserRating);
        //        $('#selectedNotes').val(response.Notes);
        //    },
        //    error: function (err) {
        //        //window.location = "../Home/ErrorMsg";
        //    }
        //});
        return parseInt($('#selectedrating').val());
    },
    loadSelectedCapability: function (option) {
        //$('#selectedrating').val(0);
        //Common.ajaxsync({
        //    url: "../../Feedback/GetGivenRating",
        //    data: option.data,
        //    beforeSend: function () {
        //        $("#status").fadeIn();
        //        $("#preloader").delay(100).fadeIn("slow");
        //    },
        //    success: function (response) {
        //        $("#status").fadeOut();
        //        $("#preloader").delay(100).fadeOut("slow");
        //        $('#selectedanswer').val(response.Answer > 4 || response == 0 ? 0 : response.Answer);
        //        $('#selectedrating').val(response.UserRating > 4 || response == 0 ? 0 : response.UserRating);
        //        $('#selectedNotes').val(response.Notes);
        //    },
        //    error: function (err) {
        //        //window.location = "../Home/ErrorMsg";
        //    }
        //});
        return parseInt($('#selectedCapability').val());
    },
    //loadCoachingUsers: function (response) {
    //    var html = '';
    //    for (var i = 0; i < response.length; i++) {
    //        html += "<li data-value='" + response[i].Teammember.User.UserId + "' data-coachingfeedback='" + response[i].FeedBackId + "' class='coachingusers" + ((i == 0) ? " msgsmallselectArrow" : "") + "'>" + "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].Teammember.User.UserId + "'&rnd=" + Math.random() + " width='61' height='61' alt='User' />" +
    //            "<p class='spanname'>" + response[i].Teammember.User.FirstName + " " + response[i].Teammember.User.LastName + "</p></li>";
    //    }
    //    if (response.length != 0 && response.length < 9) {
    //        var balCount = 9 - response.length;
    //        for (var j = 0; j < balCount; j++) {
    //            html = html + "<li> <img src='../Images/you.png' width='95' height='95' alt='Connect'/> </li>";
    //        }
    //    }
    //    if (response.length == 0) {
    //        for (var k = 0; k < 9; k++) {
    //            html = html + "<li> <img src='../Images/you.png' width='95' height='95' alt='Connect'/> </li>";
    //        }
    //    }
    //    if (response.length > 9) {
    //        $('.coachingscroll').slimscroll();
    //    }

    //    $('#Usercoachingnotes').html(html);
    //    $('.coachingusers').click(function () {
    //        if (!$(this).hasClass('msgsmallselectArrow')) {
    //            manager_feedback.UpdateFeedbackNotes();
    //            $(this).toggleClass('msgsmallselectArrow');
    //            $('.coachingusers').not($(this)).removeClass('msgsmallselectArrow');
    //            manager_feedback.LoadSelectedUserNote();
    //        }
    //    });
    //    $('#savenotes').click(function () {
    //        manager_feedback.UpdateFeedbackNotes();
    //        $('.addnotes').hide(); $(document).click();
    //    });
    //    if ($('textarea').sceditor('instance')[0] != undefined) {
    //        manager_feedback.LoadSelectedUserNote();
    //    }
    //},
    //LoadSelectedUserNote: function () {
    //    var Feedbackid = $('.msgsmallselectArrow').data('coachingfeedback');
    //    var note = $('div[data-feedback="' + Feedbackid + '"]').eq(parseInt($('.nxtfb:visible').attr('id').replace('bn', '')) - 1).data('Notes');
    //    $('textarea').sceditor('instance').getBody()[1].innerText = note;
    //},
    //UpdateFeedbackNotes: function () {
    //    var textval = $('textarea').sceditor('instance').getBody()[1].innerText.replace(/^\s+/, "");
    //    var Feedbackid = $('.msgsmallselectArrow').data('coachingfeedback');
    //    var questionid = $('div[data-feedback="' + Feedbackid + '"]').eq(parseInt($('.nxtfb:visible').attr('id').replace('bn', '')) - 1).data('question');
    //    $('div[data-feedback="' + Feedbackid + '"]').eq(parseInt($('.nxtfb:visible').attr('id').replace('bn', '')) - 1).data('Notes', textval);
    //    if (textval != '') {
    //        Common.ajaxSyncPost({
    //            url: '../../Feedback/UpdateFeedbackNotes',
    //            data: { FeedbackId: Feedbackid, questionid: questionid, Notes: textval },
    //            success: function (response) {
    //                //alert('Note Saved');
    //            },
    //            error: function (err) {
    //                //alert('Error occured while updating');
    //            }
    //        });
    //    }
    //},
    loadSelectedNotes: function (option) {
        //$('#selectedNotes').val('');
        //Common.ajaxsync({
        //    url: "../../Feedback/GetGivenNotes",
        //    data: option.data,
        //    beforeSend: function () {
        //        $("#status").fadeIn();
        //        $("#preloader").delay(100).fadeIn("slow");
        //    },
        //    success: function (response) {
        //        $("#status").fadeOut();
        //        $("#preloader").delay(100).fadeOut("slow");
        //        $('#selectedNotes').val(response);
        //    },
        //    error: function (err) {
        //        //window.location = "../Home/ErrorMsg";
        //    }
        //});
        return $('#selectedNotes').val();
    },
    loadlastansweredquestion: function (current) {
        $('#q' + ((current + 1) - 2)).show('slow');
        $('.questionContainer').css('left', '-9%');
        $('#q' + current).css('opacity', '1').animate({ 'left': '-11%' }, { duration: 400 });
        $('.feedbackcomplete').hide();
        $('.feedbackcomplete').css('opacity', '0.1').animate({ 'left': '-13%' }, { duration: 400 });


        var lastid = $('.feedbackcomplete').prev().attr('id').replace('q', '');
        // $('.feedbackcomplete').prev().prev().show();
        // $('.feedbackcomplete').prev().css('opacity', '1');
        // $('.feedbackcomplete').css({ 'margin-left': '1.5%', 'left': '-8.5%' });
        $('#plast').hide();
        $('#p' + lastid).show(); $('#bn' + lastid).show();
    },
    submitfeedback: function () {
        //if ($('#fbinitial').val() == '') {
        //    alert('Enter the initials');
        //}
        $("#status").fadeOut();
        $("#preloader").fadeOut();

        //else {
        if (validateIntial()) {
            //$('#masterMsgCont').text("Your Feedback has been completed successfully.");
            $('#overallFeedback').show();
            //  alert('Your Feedback has been completed successfully.');


        }
        else {
            $("#status,#preloader").hide();
        }
        //}
    }
};
//save feedback result
var saveFeedbackResults = function (request) {
    //debugger;
    Common.ajaxSyncPost({
        url: '../../Feedback/SaveManagerPOEResult',
        data: request,
        success: function (response) {
            // debugger;
        },
        error: function (err) {
            //debugger;
            window.location = "../Home/ErrorMsg";
        }
    });
};
//Complete Feedback
var completeFeedback = function (request) {
    Common.ajaxSyncPost({
        url: '../../Feedback/CompleteManagerFeedback',
        data: request,
        success: function (response) {
            //$("#status").fadeOut();
            //$("#preloader").delay(100).fadeOut("slow");
        },
        error: function (err) {
            window.location = "../Home/ErrorMsg";
        }
    });
};
$(document).ready(function () {
    $('.mngrfb').slimScroll();
    $('.scroll2').slimScroll();
    $('.scroll3').slimScroll();
    $('.scroll4').slimScroll();
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    Common.setTopMenu(2);
    $('.pageholder').hide();
    $('#questions').hide();
    $('.frequencydiv').hide();
    $('#redirectNextPage,#feedbackClose').on('click', function () {
        $('#overallFeedback').hide();
        $("#status").fadeIn();
        $("#preloader").fadeIn();
        setTimeout(function () {
            manager_feedback.completefeedback();

            var result = $('#resultmode').val();
            if (result == "True") {
                window.location = "../../Home/Start";
            } else {
                window.location = "../../Results/Results";
            }
        }, 1000);
    });
    $(document).click(function (event) {
        if (!$(event.target).hasClass("button_menu")) {
            if (!$(event.target).parents().hasClass("optView") && !$(event.target).parents().hasClass("ui-corner-all")) {
                $('#option_menu').hide(250);
                closeAccordionSection();
                //$('#accordion-4').parents('.slimScrollDiv').hide("slow");
                //$('#accordion-4').parents('.slimScrollDiv').find('.slimScrollBar').hide();
            }
        }
    });
    manager_feedback.loadLastSavedQuestion();
    manager_feedback.loadPoeName();
    manager_feedback.loadQuestioncount({ url: '../../Feedback/GetQuestionCount', data: { 'type': 1 } }, '#totalQuestions');
    //manager_feedback.loadclockevent();
    //manager_feedback.loadModuleAndPoeContent({ url: '../../Feedback/GetIntoContentByModuleOrder', data: { 'moduleId': 0 } });
    //manager_feedback.loadModuleAndPoeContent({ url: '../../Feedback/GetIntoContentByModuleOrder', data: { 'moduleId': 1 } });
    manager_feedback.loadModuleIds({ url: '../../Feedback/GetPracticeArea' });
    $('.pane').find('input[type=radio]:checked').removeAttr('checked');
    $("#n" + $(this).context.title).attr('checked', 'checked');
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/start-feedback_h.png');
    //manager_feedback.loadcommentline();
    $('#q1').css({ 'position': 'relative', 'left': '-1%' });
    $('#q2').css({ 'position': 'relative', 'left': '-6%', 'opacity': '.1' });
    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
    var status = parseInt($('#fbStatus').val());

    if (status == 1) {
        var lastquestion = parseInt($('#lastSavedQuestionOrder').val());

        if (lastquestion != 0) {
            for (var j = 1; j < lastquestion; j++) {
                manager_feedback.nextclick(j, j + 1);
            }
        }
        $('#lastSavedQuestionOrder').val(0);
    }
    //$('.mngrfb').slimScroll();
    $('#sticky > ul > li > a').click(function () {
        $('#sticky > ul > li > a').each(function (index, item) {
            $(item).removeClass('select' + $(item).attr('id'));
        });
        $(this).addClass('select' + $(this).attr('id'));
    });
    $(document).click(function () {
        $('#sticky > ul > li > a').each(function (index, item) {
            $(item).removeClass('select' + $(item).attr('id'));
        });
    });
    $('#poemodule li').hover(
      function () {
          removeAttrHover();
          $(this).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + $(this).attr("id").replace("li", "") + "h" + ".png");
      }, function () {
          // alert('123')
          removeAttrHover();
          $('#poemodule>li.selected').find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + $('#poemodule>li.selected').attr("id").replace("li", "") + "h" + ".png");
      });
});

function validateIntial() {
    //var validateErr = true;
    var trimtext = $('#fbinitial').val().trim();
    if (trimtext != '') {
        // alert(trimtext);
        var regex = new RegExp("^[a-zA-Z ]+$");
        if (regex.test(trimtext)) {

            return true;
        } else {
            $('#masterMsgCont').text("Special characters are not allowed in this field");
            $('#overallCont').show();
            // alert("Special characters are not allowed in this field");
            return false;
        }
    } else {
        $('#masterMsgCont').text("Please enter your name");
        $('#overallCont').show();
        //alert('Enter the initials');
        return false;
    }


}
function removeAttrHover() {
    var count = 1;
    $('#poemodule li').each(function () {
        if (!$(this).hasClass('selected')) {
            $(this).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + count + ".png");
        }
        count++;
    });
}