var self_feedback = {
    //Load Questions
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
    getNumberofLines: function (height) {
        var slideHeight = 0;

        if (height > 1150) slideHeight = 54;
        else if (height > 950) slideHeight = 45;
        else if (height < 900) slideHeight = 41;
        else slideHeight = 41;
        return slideHeight;
    },
    loadModuleAndPoeContent: function (option) {
        Common.ajaxsync({
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
                debugger;
                var html = "";
                if (response.ModuleOrderNumber == 0) {
                    var htmlDiv = "<img src='../../Images/KessakuImage/" + $('#selectedpoe').val() + "_pane.png'>";
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
                }
                else {
                    //$('#keyactionslidecount').html(response.KeyActionSlideCount);
                    var sHeight = window.innerHeight;
                    var noofLines = self_feedback.getNumberofLines(sHeight);
                    $('#keyaction0').html(response.KeyAction);
                    var keyActionHtml = $('#keyaction0').find('li');
                    var m = 0, n = 0;
                    var keyLength = 0;
                    var keyhtml = "";
                    for (; m < keyActionHtml.length;) {
                        keyLength = keyLength + (Math.ceil(keyActionHtml[m].innerText.length / 45) + 2);
                        if (keyLength <= noofLines) {
                            keyhtml = keyhtml + "<li>" + keyActionHtml[m].innerText + "</li>";
                            m++;
                        } else {
                            $('#keyaction' + n).empty().html(keyhtml);
                            keyhtml = "";
                            keyLength = 0;
                            n++;
                        }
                    }
                    $('#keyaction' + n).html(keyhtml);
                    for (var z = 0; z < n ; z++) {
                        $('#snap' + (2 + z)).addClass('content4').addClass('contentSnap');
                    }
                    $('#keyactionslidecount').html(n);
                    //$('#keyaction1').html(response.KeyAction1);
                    //$('#keyaction2').html(response.KeyAction2);
                    //$('#keyaction3').html(response.KeyAction3);
                    //$('#keyaction4').html(response.KeyAction4);
                    //$('#keyaction5').html(response.KeyAction5);

                    $('#moduleintroslidecount').html(response.ModuleIntroSlideCount);
                    $('#moduleintro0').html(response.ModuleIntro);
                    $('#moduleintro1').html(response.ModuleIntro1);
                    $('#moduleintro2').html(response.ModuleIntro2);
                    $('#moduleintro3').html(response.ModuleIntro3);
                    $('#moduleintro4').html(response.ModuleIntro4);
                    $('#moduleintro5').html(response.ModuleIntro5);
                    var count = response.Questions.length / 3;
                    var i = 0;
                    var charLength = 0;
                    var courceTitle = 4;
                    for (var k = 0; k < 3; k++) {
                        $('#indetail' + k).empty();
                    }
                    for (var j = 0; j < count; j++) {
                        html = "";
                        charLength = 0;
                        for (; i < response.Questions.length ;) {
                            charLength = charLength + (Math.ceil(response.Questions[i].SideBarTitle.length / 54) + courceTitle);
                            if (charLength <= noofLines) {
                                html = html + "<strong>Action " + (i + 1) + "</strong><p>" + response.Questions[i].SideBarTitle + "</p><br/>";
                                i++;
                            } else {
                                break;
                            }
                            //if (((i + 1) % 5) == 0) {
                            //    html = html + "<strong>Question " + (i + 1) + "</strong><p>" + response.Questions[i].SideBarTitle + "</p><br/>";
                            //    i = i + 1;
                            //    break;
                            //} else {
                            //    if (i != response.Questions.length)
                            //        html = html + "<strong>Question " + (i + 1) + "</strong><p>" + response.Questions[i].SideBarTitle + "</p><br/>";
                            //}
                        }
                        $('#indetail' + j).html(html);
                    }
                    $('#quickfeedPage').css("visibility", "visible");
                    $('#sticky').css("visibility", "visible");
                    //$('#indetail0').html("<strong>Question 1</strong><p>" + response.Questions[0].SideBarTitle + "</p><br/>" + "<strong>Question 2</strong><p>" + response.Questions[1].SideBarTitle + "</p><br/>" + "<strong>Question 3</strong><p>" + response.Questions[2].SideBarTitle + "</p><br/><strong>Question 4</strong><p>" + response.Questions[3].SideBarTitle + "</p><br/>" + "<strong>Question 5</strong><p>" + response.Questions[4].SideBarTitle + "</p><br/>");
                }
                var moduleName = $('#poemodule>li.selected').find('p').html();
                var imgSrc = $('#selectedpoe').val() + response.ModuleOrderNumber;
                //$('.feedbackIntro').html('<div class="content1" id="maincontent">' + $('#poeintro0').html() + '</div>');
                $('#profilesscroll').html('<div class="content1" id="maincontent">' + $('#poeintro0').html() + '</div>');
                $('#profilesscroll').slimScroll();
                // $('.practiceAreaIntro').html('<div class="practiceAreaTitle"><h2>' + moduleName + '</h2><img src="../Images/icons/' + imgSrc + '.png"></div><p>' + $('#moduleintro0').html() + '</p>');
                // $('.keyActions ').html('<div class="content4" id="modulekeyaction"><ul>' + $('#keyaction0').html() + '</ul></div>');
            },
            error: function (err) {
            }
        });
    },
    loadQuickViewPAQuestions: function (option) {
        //debugger;
        var moduleresponse = option.response;
        var html = "";
        var slidehtml = '';
        var completedhtml = '<li class="feedbackcomplete"><h1>Feedback Completed</h1>' +
            '<p>You have successfully completed Feedback. You may review your responses and make adjustments if necessary. Please type your name in the box below and click "Submit". Thank you for your participation!</p>' +
            '<p><b>' + $('#loggedinUser').html().trim() + '</b></p><input type="text" id="fbinitial" name="textbox"/><p><span></span></p><a onclick="self_feedback.submitfeedback();">Submit</a></li>';
        var questionids = "";
        var hideorshowSlimScroll = (moduleresponse.length - 1) > 6;
        var excellenceIndicatorCount = [];
        for (var m = 0; m < moduleresponse.length; m++) {
            if (moduleresponse[m].ModuleOrderNumber > 0) {
                var moduleid = moduleresponse[m].ModuleId;
                var poemodules = "";

                var practiceArea1 = (moduleresponse.length < 7 ? (7 - moduleresponse.length) : 0);
                for (var mt = 0; mt < moduleresponse.length; mt++) {
                    if (moduleresponse[mt].ModuleOrderNumber > 0) {
                        var img = $('#selectedpoe').val() + moduleresponse[mt].ModuleOrderNumber;
                        //poemodules = poemodules + "<li id ='li" + moduleresponse[mt].ModuleOrderNumber + "' data-value=" + moduleresponse[mt].ModuleId + "' data-moduleorder=" + moduleresponse[mt].ModuleOrderNumber + "  class='takesf limod" + moduleresponse[mt].ModuleOrderNumber + " " + img + "Tile" + ((moduleresponse[mt].ModuleOrderNumber == 1) ? ' selected select' + img : '') + "'><p>" + moduleresponse[mt].ModuleName + "</p></li>";
                        poemodules = poemodules + "<li id ='li" + moduleresponse[mt].ModuleOrderNumber + "' data-value=" + moduleresponse[mt].ModuleId + "' data-moduleorder=" + moduleresponse[mt].ModuleOrderNumber + "  class='takesf limod" + moduleresponse[mt].ModuleOrderNumber + " " + ((moduleresponse[mt].ModuleOrderNumber == 1) ? 'selected' : '') + "'><img src='../Images/icons/" + img + ((moduleresponse[mt].ModuleOrderNumber == 1) ? "h" : "") + ".png' /><p>" + moduleresponse[mt].ModuleName + "</p></li>";
                    }
                }

                if (moduleresponse.length % 2 == 0) {
                    poemodules = poemodules + "<li id ='li" + (moduleresponse.length + 1) + "' data-value=" + (moduleresponse.length + 1) + "' data-moduleorder=" + (moduleresponse.length + 1) + "  class='takesf poelistlidummy' >" + "</li>";
                }

                //for (var pa1 = 0; pa1 < practiceArea1; pa1++) {
                //    poemodules = poemodules + "<li id ='li" + (moduleresponse.length + 1) + "' data-value=" + (moduleresponse.length + 1) + "' data-moduleorder=" + (moduleresponse.length + 1) + "  class='takesf emptyTile' ><p></p><img src='' width='64' height='50'  class='img' />" + "</li>";
                //}

                poemodules = poemodules + "</ul>" + (hideorshowSlimScroll ? '</div>' : '') + "</div></div>";
                $('#poemodule').html(poemodules);
                $('#poemoduleName').text($('#poemodule li').first().find('p').text());
            }
        }
        for (var m = 0; m < moduleresponse.length; m++) {
            var questionidspermodule = "";
            if (moduleresponse[m].ModuleOrderNumber > 0) {
                var moduleid = moduleresponse[m].ModuleId;
                var modulehtml = "<li id='m" + moduleresponse[m].ModuleOrderNumber + "'" + "data-value=" + moduleresponse[m].ModuleId + " class='sectionModules' >";

                var practiceArea1 = (moduleresponse.length < 7 ? (7 - moduleresponse.length) : 0);

                //modulehtml += "<div class='timetakencont' ><div class='timetaken'>Time taken: </div><div class='counterHour'>00</div><div class='collan'>:</div><div class='counterMin'>00</div><div class='collan'>:</div><div class='counterSec'>00</div></div>" +
                modulehtml += "<div class='contentholder'> <div class='questions quickviewfb'><ul>  <li><div class='scroll2 feedheight'>";
                Common.ajaxsync({
                    url: option.url,
                    data: { 'moduleId': moduleid },
                    success: function (response) {
                        excellenceIndicatorCount.push(response.length);
                        for (var i = 0; i < response.length; i++) {
                            questionids = questionids + response[i].QuestionId + ",";
                            questionidspermodule = questionidspermodule + response[i].QuestionId + ",";
                            modulehtml = modulehtml + "<div class='questionarea quickview'><div class='qn'>" + response[i].QuestionOrderNumber + "</div>" +
                                "<h2>" + response[i].ShortQuetionText + "</h2><div class='clr'></div>" +
                                "<div class='sliderimg'>" +
                                "<div id='Qno" + response[i].QuestionId + "' data-question=" + response[i].QuestionId + " data-moduleid=" + moduleid + " class='sliderdiv'>" +
                                "<img src='../../Images/img/slidebg1.png' />" +
                                "</div></div></div>";
                        }
                    },
                    error: function (err) {
                    }
                });

                modulehtml = modulehtml + "</div></li></ul> </div></div> <input type='hidden' id='mq" + moduleresponse[m].ModuleOrderNumber + "' value=" + questionidspermodule + " />";
                if (m > 1) {
                    slidehtml = slidehtml + "<a href='#' class='prevfb' id='p" + moduleresponse[m].ModuleOrderNumber + "' onclick='self_feedback.prevclick(" + moduleresponse[m].ModuleOrderNumber + "," + moduleresponse[m - 1].ModuleOrderNumber + ")'>Previous</a> ";
                }
                if (m < moduleresponse.length - 1) {
                    slidehtml = slidehtml + " <a href='#' class='nxtfb' id='bn" + moduleresponse[m].ModuleOrderNumber + "' onclick='self_feedback.nextclick(" + moduleresponse[m].ModuleOrderNumber + "," + moduleresponse[m + 1].ModuleOrderNumber + ")'>Next</a>";
                    slidehtml = slidehtml + " <a href='#' class='prevfb' id='plast' onclick='self_feedback.loadlastansweredquestion();'>Previous</a>";
                } else {
                    slidehtml = slidehtml + " <a href='#' class='nxtfb' id='bn" + moduleresponse[m].ModuleOrderNumber + "' onclick='self_feedback.completeFB(" + moduleresponse[m].ModuleOrderNumber + ")'>Next</a>";
                }

                html = html + modulehtml + '</ul></div></li>';

                var loadedPA = $('#target ul').html();
                var newcompletedPA = '';

                var img = $('#selectedpoe').val() + moduleresponse[m].ModuleOrderNumber;
                if ($('#lit' + moduleresponse[m].ModuleOrderNumber).size() == 0) {
                    newcompletedPA = "<li id=lit" + moduleresponse[m].ModuleOrderNumber + " class='submenu'><a href='javascript:self_feedback.loadCompleted(" + moduleresponse[m].ModuleOrderNumber + ")'><span><img src='../../Images/icons/" + img + "-small.png' /></span><p>" + moduleresponse[m].ModuleName + "</p></a></li>";
                }
                $('#target ul').html(loadedPA + newcompletedPA);
            }
        }

        var connecthtml = "<li><div class='customertiles qvlist'><h1 class='connectheader'>Connect</h1><div class='connectfeed'>" + (hideorshowSlimScroll ? '<div class="scroll3"><ul id="questionFeed">' : '<ul>') + "";
        var practiceArea = (moduleresponse.length < 7 ? (7 - moduleresponse.length) : 0);
        for (var ct = 0; ct < moduleresponse.length; ct++) {
            if (moduleresponse[ct].ModuleOrderNumber > 0) {
                var img = $('#selectedpoe').val() + moduleresponse[ct].ModuleOrderNumber;
                connecthtml = connecthtml + "<li id ='li" + moduleresponse[ct].ModuleOrderNumber + "' data-value=" + moduleresponse[ct].ModuleId + "' data-moduleorder=" + moduleresponse[ct].ModuleOrderNumber + "  class='takesf '><p>" + moduleresponse[ct].ModuleName + "</p><img src='../../Images/icons/" + img + ".png' width='64' height='50'  class='img' />" + "</li>";
            }
        }
        for (var pa = 0; pa < practiceArea; pa++) {
            connecthtml = connecthtml + "<li id ='li" + (moduleresponse.length + 1) + "' data-value=" + (moduleresponse.length + 1) + "' data-moduleorder=" + (moduleresponse.length + 1) + "  class='takesf emptyTile'><p></p><img src='' width='64' height='50'  class='img' />" + "</li>";
        }

        connecthtml = connecthtml + "</ul>" + (hideorshowSlimScroll ? '</div>' : '') + "</div></div>";

        $('#sliderbtn').append("<div id='slidefb'>" + slidehtml + "</div>");
        $('.pageholder').hide().fadeIn('slow');
        $('#quickviewli').html(html + completedhtml).fadeIn('slow');

        $('#moduleid').val(moduleresponse[1].ModuleId);
        //self_feedback.loadTopmmebers(moduleresponse[1].ModuleId);
        $('#selectedmodulename').val(moduleresponse[1].ModuleName);

        for (var k = 0; k < moduleresponse.length; k++) {
            //debugger;
            $('#p' + moduleresponse[k].ModuleOrderNumber).hide();
            $('#bn' + moduleresponse[k].ModuleOrderNumber).hide();
            var questionLength = $('#m' + (k + 1)).find('.scroll2 >div.questionarea').length;
            if (questionLength > 5)
                $('#m' + (k + 1)).find('.timetakencont').after('<div class="questionLenghtExceed">Please scroll down to see all the questions for this Practice Area.</div>');
        }

        $('#bn' + moduleresponse[1].ModuleOrderNumber).show();
        $('#pagetxt').html('Page 1 of ' + (moduleresponse.length - 1));
        $('.submenu').hide();
        $('#questionids').val(questionids);
        self_feedback.loaddetailslider(questionids);

        questionfeddback();
        /* ---------------------Hiding slim scroll fro excellence indicator---------------------*/
        for (var x = 0; x < moduleresponse.length - 1; x++) {
            if (excellenceIndicatorCount[x] <= 5) {
                //$('#m' + (x + 1)).find('.contentholder').find('.feedheight').removeClass('scroll2');
                $('#m' + (x + 1)).find('.contentholder').find('.feedheight').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                //$('#m' + (x + 1)).find('.contentholder').find('.feedheight').parents('.slimScrollDiv').find('.slimScrollRail').remove();
            } else {
                $('.feedheight').parents('.slimScrollDiv').find('.slimScrollBar').hide();
            }
        }
        if (hideorshowSlimScroll) {
            $('#quickFeed').parents('.slimScrollDiv').find('.slimScrollBar').hide();
        }
        /*-------------------------------------------------*/
    },
    loadCompleted: function (current) {
        $("#status,#preloader").delay(100).fadeIn("slow", function () {
            $('#moduleid').val($('#m' + current).attr('data-value'));
            //var totmod = (parseInt($('#totalmodules').val()));
            //for (var j = current - 1; j > 0; j--) {
            //    $('#p' + j).hide();
            //    $('#bn' + j).hide();
            //    $('#m' + j).hide("slow");
            //}
            //for (var i = current; i < totmod; i++) {
            //    $('#p' + i).show();
            //    $('#bn' + i).show();
            //    $('#m' + i).show("slow");
            //}
            $('#pagetxt').html('Page ' + current + ' of ' + (parseInt($('#totalmodules').val()) - 1));

            var selmoduleorder = $('.takesf.selected').data('moduleorder');

            if (current < selmoduleorder) {
                for (var i = current ; i < selmoduleorder ; i++) {
                    $('.prevfb:visible').click();
                }
            }
            else if (current > selmoduleorder) {
                for (var i = selmoduleorder ; i < current ; i++) {
                    $('.nxtfb:visible').click();
                }
            }

            //  $('#p' + current).hide();
            $('.prevfb,.nxtfb').hide();
            $('#p' + current).show();
            $('#bn' + current).show();
            $('#m' + current).show();
            // self_feedback.loadTopmmebers($('#m' + current).data('value'));
            $('#selectedmodulename').val($('#poemodule li.selected').find('p').text());
            self_feedback.reloadSlimScroll((current + 1));

        });
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    },
    prevclick: function (current, previous) {
        //debugger;
        //self_feedback.UpdateFeedbackNotes();
        $('#moduleid').val($('#m' + previous).attr('data-value'));
        $('#pagetxt').html('Page ' + previous + ' of ' + (parseInt($('#totalmodules').val()) - 1));
        $('.prevfb,.nxtfb').hide();
        $('#p' + current).hide();
        $('#bn' + current).hide();
        $('#p' + previous).show();
        $('#bn' + previous).show();
        if (current != 2) {
            $('#m' + (current - 2)).show();
            $('#m' + previous).css('opacity', '1').animate({ 'left': '-12%' }, { duration: 400 });
            $('#m' + (previous + 1)).css('opacity', '0.2').animate({ 'left': '-15.5%' }, { duration: 400 });
            $('#m' + (current - 2)).css('overflow', 'display').delay(500);
        }
        else {
            $('#m' + previous).css('opacity', '1').animate({ 'left': '2%' }, { duration: 400 });
            $('#m' + (previous + 1)).css('opacity', '0.2').animate({ 'left': '-2%' }, { duration: 400 });
            for (var i = (current + 1) ; i < $('#totalmodules').val() ; i++) {
                $('#m' + i).css('position', 'static');
            }
        }
        //$('#m' + previous).show("slow");
        //$('#m' + previous).animate({ 'left': '14%' }, { duration: 400 });

        // $('#li' + current).removeClass('selected').removeClass('select' + $('#selectedpoe').val() + current);
        //$('#li' + previous).addClass('selected').addClass('select' + $('#selectedpoe').val() + previous);
        var currentimg = $('#selectedpoe').val() + current;
        var previmg = $('#selectedpoe').val() + previous + "h";
        $('#li' + current).removeClass('selected');
        $('#li' + previous).addClass('selected');
        $('#li' + current).find('img').attr("src", "../Images/icons/" + currentimg + ".png");
        $('#li' + previous).find('img').attr("src", "../Images/icons/" + previmg + ".png");
        $('#poemoduleName').text($('#li' + previous).find('p').text());
        self_feedback.reloadSlimScroll(current);
        //self_feedback.loadNotesQuestionnos(previous);
        self_feedback.loadModuleAndPoeContent({ url: '../../Feedback/GetIntoContentByModuleOrder', data: { 'moduleId': current - 1 } });
        //self_feedback.loadTopmmebers($('#m' + previous).data('value'));
        $('#selectedmodulename').val($('#poemodule li.selected').find('p').text());

        //setTimeout(self_feedback.loadSlimScroll(current), 1000);
    },
    nextclick: function (current, next) {
        //debugger;
        if (self_feedback.checkquestionsanswered(current)) {
            $('#moduleid').val($('#m' + next).attr('data-value'));
            //var quickView = $('#m' + current).find('.quickviewfb > ul > li > .slimScrollDiv > .scroll2 >.quickview');
            //var count = 0;
            //quickView.find('.sliderdiv').each(function (i, d) {
            //    if (i < 5) {
            //        if (parseInt($('#' + d.id).data("answer")) == 1) {
            //            count++;
            //        }
            //    }
            //});
            //var isVerified = true;
            //if (quickView.length > 5 && count == 5) {
            //    if (confirm("Still some questions are hidden. Do you want to continue?")) {
            //    } else {
            //        isVerified = false;
            //    }
            //}
            //if (isVerified) {
            // self_feedback.UpdateFeedbackNotes();
            if (current != 1) {
                $('#m' + (current - 1)).hide('slow');
            }
            // $('#li' + current).removeClass('selected').removeClass('select' + $('#selectedpoe').val() + current);
            //$('#li' + next).addClass('selected').addClass('select' + $('#selectedpoe').val() + next);
            var currentimg = $('#selectedpoe').val() + current;
            var nextimg = $('#selectedpoe').val() + next + "h";
            $('#li' + current).removeClass('selected');
            $('#li' + next).addClass('selected');
            $('#li' + current).find('img').attr("src", "../Images/icons/" + currentimg + ".png");
            $('#li' + next).find('img').attr("src", "../Images/icons/" + nextimg + ".png");
            $('#poemoduleName').text($('#li' + next).find('p').text());
            //$("#status,#preloader").delay(100).fadeIn("slow");//, function () {
            if (parseInt($('#totalmodules').val()) > 7) {
                var scrollToInt = $('.scroll1').sort(function (a, b) { return b.scrollHeight - a.scrollHeight; })[0].scrollHeight + 'px'; //$('.scroll1')[(current - 1)].scrollHeight + 'px';
                if (current >= 5) {
                    $('.scroll1').slimScroll({ scrollTo: scrollToInt });
                }
            }
            // self_feedback.loadNotesQuestionnos(next);
            self_feedback.saveModuleData($('#mq' + current).val());
            $('#m' + current).css('position', 'relative').css('opacity', '.3').css('margin-left', '0').animate({ 'left': '-8%' }, { duration: 400 });
            $('#m' + next).css('position', 'relative').animate({ 'left': '-12%' }, { duration: 400 }).css('margin-left', '0').css('opacity', '1');
            $('#m' + (next + 1)).css('position', 'relative').css('opacity', '.3').animate({ 'left': '-15.5%' }, { duration: 400 }).css('margin-left', '0');
            Common.ajaxsync({
                url: "/Feedback/CheckTheCompletedFeedback",
                data: { 'currentmoduleOrder': next },
                success: function (response) {
                    //debugger;
                    if (response == "True") {
                        $('#pagetxt').html('Page ' + next + ' of ' + (parseInt($('#totalmodules').val()) - 1));
                        $('.prevfb,.nxtfb').hide();
                        $('#p' + current).hide();
                        $('#bn' + current).hide();
                        $('#p' + next).show();
                        $('#bn' + next).show();
                        self_feedback.loadModuleAndPoeContent({ url: '../../Feedback/GetIntoContentByModuleOrder', data: { 'moduleId': current + 1 } });
                        $('#lit' + current).show();
                        //$('#m' + current).hide("slow");
                        //self_feedback.loadTopmmebers($('#m' + next).data('value'));
                        $('#selectedmodulename').val($('#poemodule li.selected').find('p').text());

                        //$('#m' + next).animate({ 'left': '-14%' }, { duration: 400 });

                        $('.limod' + current).unbind('click');
                        $('.limod' + current).click(function () {
                            //debugger;
                            var obj = $(this);
                            var selmoduleorder = $('.takesf.selected').data('moduleorder');
                            $("#status,#preloader").delay(100).fadeIn();
                            self_feedback.loadModuleAndPoeContent({ url: '../../Feedback/GetIntoContentByModuleOrder', data: { 'moduleId': current } });
                            //self_feedback.loadCompleted(current);
                            if (current < selmoduleorder) {
                                for (var i = $(obj).data('moduleorder') ; i < selmoduleorder ; i++) {
                                    $('.prevfb:visible').click();
                                }
                            }
                            else if (current > selmoduleorder) {
                                for (var i = selmoduleorder ; i < $(obj).data('moduleorder') ; i++) {
                                    $('.nxtfb:visible').click();
                                }
                            }
                            // });
                            $("#status").fadeOut();
                            $("#preloader").delay(200).fadeOut("slow");
                        });

                        $("#status").fadeOut();
                        $("#preloader").delay(200).fadeOut("slow");

                        //        alert(current);
                        //});
                    } else {
                        window.location = "../../Feedback/Feedback";
                    }
                    $("#status,#preloader").delay(100).fadeOut("slow");
                },
                error: function (err) {
                }
            });
        }
        else {
            $('#masterMsgCont').text("Answer all the questions");
            $('#overallCont').show();
            // alert('Answer all the questions');
        }
        //});
        //}
        //$("#status").fadeOut();
        //$("#preloader").delay(200).fadeOut("slow");
    },

    completeFB: function (current, next) {
        if (self_feedback.checkquestionsanswered(current)) {
            self_feedback.saveFBData();
            self_feedback.loadstopclock();
            Common.ajaxsync({
                url: "/Feedback/CheckTheCompletedFeedback",
                data: { 'currentmoduleOrder': current },
                success: function (response) {
                    if (response == "True") {
                        //$("#status").fadeIn();
                        //$("#preloader").delay(100).fadeIn("slow");
                        //setTimeout(function () {
                        //    self_feedback.completefeedback();
                        //    window.location = "../../Feedback/Connect";
                        //}, 3000);
                        currentqn = $('.nxtfb:visible').attr('id').replace('bn', '');
                        $('#m' + (currentqn - 1)).hide('slow');
                        $('#m' + currentqn).css({ 'opacity': '0.5', 'left': '-8%' });
                        $('.feedbackcomplete').css({ 'position': 'relative', 'left': '-11.5%', 'margin-left': '0' });
                        $('.nxtfb:visible').hide();
                        $('.prevfb:visible').hide(); $('#plast').show();
                    } else {
                        window.location = "../../Feedback/Feedback";
                    }
                },
                error: function (err) {
                }
            });
        }
        else {
            $('#masterMsgCont').text("Answer all the questions");
            $('#overallCont').show();
            // alert('Answer all the questions');
        }
    },
    loaddetailslider: function (questionids) {
        var response = questionids.slice(0, -1).split(",");
        for (var i = 0; i < response.length; i++) {
            var element = 'Qno' + response[i];
            var ans = self_feedback.loadSelectedAnswer({ data: { 'feedbackId': 0, 'questionId': response[i] } });
            $('#' + element).data("answer", ans);

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
                        $('#' + event.target.id).data("answer", 0);
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
    },
    saveFBData: function () {
        var response = ($('#questionids').val().slice(0, -1).split(","));
        var savePOEResultRequests = [];
        for (var i = 0; i < response.length; i++) {
            var savePOEResultRequest = new Requests.SavePOEResultRequest();
            savePOEResultRequest.Answer = parseInt($('#Qno' + response[i]).data("answer"));
            savePOEResultRequest.AnswerType = 1;
            savePOEResultRequest.ModuleNumber = $('#Qno' + response[i]).data("moduleid");

            savePOEResultRequest.QuestionId = $('#Qno' + response[i]).data("question");
            savePOEResultRequest.Comment = null;
            savePOEResultRequest.FeedbackStatus = 1;
            savePOEResultRequests.push(savePOEResultRequest);
        }

        saveFeedbackResults(savePOEResultRequests);
    },
    saveModuleData: function (questionids) {
        var response = questionids.slice(0, -1).split(",");
        var savePOEResultRequests = [];
        for (var i = 0; i < response.length; i++) {
            var savePOEResultRequest = new Requests.SavePOEResultRequest();
            savePOEResultRequest.Answer = parseInt($('#Qno' + response[i]).data("answer"));
            savePOEResultRequest.AnswerType = 1;
            savePOEResultRequest.ModuleNumber = $('#Qno' + response[i]).data("moduleid");

            savePOEResultRequest.QuestionId = $('#Qno' + response[i]).data("question");
            savePOEResultRequest.Notes = $('#Qno' + response[i]).data("Notes");
            savePOEResultRequest.Comment = null;
            savePOEResultRequest.FeedbackStatus = 1;
            savePOEResultRequests.push(savePOEResultRequest);
        }

        saveFeedbackResults(savePOEResultRequests);
    },
    //Load the module
    loadModuleIds: function (option) {
        var moduleIds = new Array();
        Common.ajaxsync({
            url: option.url,
            success: function (response) {
                self_feedback.loadQuickViewPAQuestions({ url: '../../Feedback/GetQuestions', response: response });

                $('#totalmodules').val(response.length);
            },
            error: function (err) {
            }
        });
    },

    //Complete feedback
    completefeedback: function () {
        $("#status").fadeOut();
        $("#preloader").fadeOut();
        //if (validateIntial()) {
        //    alert('Enter the initials');
        //    $("#status,#preloader").hide();
        //}
        //else {
        if (validateIntial()) {
           // $('#masterMsgCont').text("Your Feedback has been completed successfully.");
            $('#overallFeedback').show();
            //alert('Your Feedback has been completed successfully.');
            //$("#status,#preloader").hide();
           
           
        } else {
            $("#status,#preloader").hide();
        }
        //}
    },
    //Load completed practise area
    loadCompletedPracticeArea: function (moduleid, moduleorder) {
        var loadedPA = $('.dropdownlist').html();
        var newcompletedPA = '';
        if ($('#liPA' + moduleorder).size() == 0) {
            newcompletedPA = "<li id=liPA" + moduleorder + "><a href='javascript:self_feedback.loadcompletedPAQuestion(" + moduleid + "," + moduleorder + ")'>" + $('#li' + moduleorder).text() + "</a></li>";
        }
        $('.dropdownlist').html(loadedPA + newcompletedPA);
    },
    //Loading Completed Quewstions
    loadcompletedPAQuestion: function (moduleid, moduleorder) {

        // saving the time taken in previous modules in temp hidden variables.
        $('#lastsavedHours').val($('.counterHour:first').html());
        $('#lastsavedMinutes').val($('.counterMin:first').html());
        $('#lastsavedSeconds').val($('.counterSec:first').html());

        var curmod = parseInt($('#currentmoduleOrder').val());
        $('#li' + (parseInt(curmod) - 1)).removeClass('act');
        $('#li' + (parseInt(moduleorder))).addClass('act');
        $('#currentmoduleOrder').val((parseInt(moduleorder) + 1));
        self_feedback.loadQuickViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': moduleid }, moduleorder: moduleorder });
        $('#compltedPracticeArea').toggle('slow');
    },
    //Load completed previous question
    loadcompletedPrevContent: function (moduleid, moduleorder) {
        if (moduleorder == 1) {
            $('#prevdv').hide();
        }
        if (moduleorder > 0) {
            var curmod = parseInt($('#currentmoduleOrder').val());
            $('#li' + (parseInt(curmod) - 1)).removeClass('act');
            $('#li' + (parseInt(moduleorder))).addClass('act');
            $('#currentmoduleOrder').val((parseInt(moduleorder) + 1));
            self_feedback.loadQuickViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': moduleid }, moduleorder: moduleorder });
        }
    },
    //Load the timer event
    loadclockevent: function () {
        $('.counterSec').fadeOut(500).html(0).fadeIn(500);
        $('.counterMin').fadeOut(500).html(0).fadeIn(500);
        timer = setInterval("self_feedback.loadincreasecounter()", 1000);
        // $('#nextdv').removeClass('start');
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
    //Load Comment window
    //loadcommentline: function () {
    //    $('#connectmembrs .usersconnect').live('click', function () {
    //        $('#connectmembrs li a span').removeClass('slidecontentselect');
    //        $(this).find('span').toggleClass('slidecontentselect');
    //    });
    //    $('#submitbtn').click(function () {
    //        var txtareavalText = $('textarea').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
    //        if (txtareavalText == "") {
    //            alert('Please Enter the Text');
    //        } else {
    //            self_feedback.PostCommnet();
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
    //loadTopmmebers: function (moduleid) {
    //    $('.vs-context-menu').hide("slow");
    //    Common.ajaxsync({
    //        url: "/Feedback/GetConnectMembers?type=1&moduleid=" + moduleid,
    //        success: function (response) {
    //            var html = '';
    //            if (response.length != 0) {
    //                var limit = (response.length < 9) ? response.length : 9;
    //                for (var i = 0; i < limit; i++) {
    //                    html = html + "<li data-value=" + response[i].User.UserId + " class='usersconnect'><a href='#'>" +
    //                        "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='95' height='95' alt='User' />" +
    //                         "<span></span>" +
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
    //        }
    //    });
    //},
    //PostCommnet: function () {
    //    var userid = $('#connectmembrs .slidecontentselect').parent().parent().data('value');

    //    var selectedmodule = $('#selectedmodulename').val();
    //    //var html = $('textarea').sceditor('instance').getBody()[0].innerHTML;
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
    //Loading slider
    loadslider: function () {
        $('#Qn1').data("answer", self_feedback.loadSelectedAnswer({ data: { 'feedbackId': 0, 'questionId': parseInt($('#Qn1').data("question")) } }));
        $('#Qn2').data("answer", self_feedback.loadSelectedAnswer({ data: { 'feedbackId': 0, 'questionId': parseInt($('#Qn2').data("question")) } }));
        $('#Qn3').data("answer", self_feedback.loadSelectedAnswer({ data: { 'feedbackId': 0, 'questionId': parseInt($('#Qn3').data("question")) } }));
        $('#Qn4').data("answer", self_feedback.loadSelectedAnswer({ data: { 'feedbackId': 0, 'questionId': parseInt($('#Qn4').data("question")) } }));
        $('#Qn5').data("answer", self_feedback.loadSelectedAnswer({ data: { 'feedbackId': 0, 'questionId': parseInt($('#Qn5').data("question")) } }));
        $("#Qn1").slider({
            min: 0,
            max: 4,
            range: "min",
            value: self_feedback.loadSelectedAnswer({ data: { 'feedbackId': 0, 'questionId': parseInt($('#Qn1').data("question")) } }),
            slide: function (event, ui) {
                if (ui.value == 0) {
                    event.preventDefault();
                    $('#Qn1').data("answer", 1);
                } else {
                    $('#Qn1').data("answer", ui.value);
                }
            }
        });

        $("#Qn2").slider({
            min: 0,
            max: 4,
            range: "min",
            value: self_feedback.loadSelectedAnswer({ data: { 'feedbackId': 0, 'questionId': parseInt($('#Qn2').data("question")) } }),
            slide: function (event, ui) {
                if (ui.value == 0) {
                    event.preventDefault();
                    $('#Qn2').data("answer", 1);
                } else {
                    $('#Qn2').data("answer", ui.value);
                }
            }
        });

        $("#Qn3").slider({
            min: 0,
            max: 4,
            range: "min",
            value: self_feedback.loadSelectedAnswer({ data: { 'feedbackId': 0, 'questionId': parseInt($('#Qn3').data("question")) } }),
            slide: function (event, ui) {
                if (ui.value == 0) {
                    event.preventDefault();
                    $('#Qn3').data("answer", 1);
                } else {
                    $('#Qn3').data("answer", ui.value);
                }
            }
        });

        $("#Qn4").slider({
            min: 0,
            max: 4,
            range: "min",
            value: self_feedback.loadSelectedAnswer({ data: { 'feedbackId': 0, 'questionId': parseInt($('#Qn4').data("question")) } }),
            slide: function (event, ui) {
                if (ui.value == 0) {
                    event.preventDefault();
                    $('#Qn4').data("answer", 1);
                } else {
                    $('#Qn4').data("answer", ui.value);
                }
            }
        });

        $("#Qn5").slider({
            min: 0,
            max: 4,
            range: "min",
            value: self_feedback.loadSelectedAnswer({ data: { 'feedbackId': 0, 'questionId': parseInt($('#Qn5').data("question")) } }),
            slide: function (event, ui) {
                if (ui.value == 0) {
                    event.preventDefault();
                    $('#Qn5').data("answer", 1);
                } else {
                    $('#Qn5').data("answer", ui.value);
                }
            }
        });

        $("#Qn6").slider({
            min: 0,
            max: 4,
            range: "min",
            value: 1,
            slide: function (event, ui) {
                if (ui.value == 0) {
                    event.preventDefault();
                    $('#Qn6').data("answer", 1);
                } else {
                    $('#Qn6').data("answer", ui.value);
                }
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
    //Load previous content
    loadPrevContent: function () {
        var curmod = parseInt($('#currentmoduleOrder').val());

        self_feedback.loadcompletedPrevContent($('#module' + (parseInt(curmod) - 1)).val(), (parseInt(curmod) - 2));
    },
    //Load selected answer
    loadSelectedAnswer: function (option) {
        $('#selectedanswer').val(1);
        Common.ajaxsync({
            url: "../../Feedback/GetGivenAnswer",
            data: option.data,

            success: function (response) {
                $('#selectedanswer').val(response.Answer > 4 || response == 0 ? 0 : response.Answer);
            },
            error: function (err) {
            }
        });
        return parseInt($('#selectedanswer').val());
    },
    loadSlimScroll: function (current) {
        var scrollToInt = $('.scroll1')[(current - 1)].scrollHeight + 'px';
        if (current >= 5) {
            $('.scroll1').slimScroll({ scrollTo: scrollToInt });
        }
    },
    reloadSlimScroll: function (current) {
        if (parseInt($('#totalmodules').val()) > 7) {
            var scrollToInt = $('.scroll1').sort(function (a, b) { return b.scrollHeight - a.scrollHeight; })[0].scrollHeight + 'px';
            //var scrollToInt = $('.scroll1')[previous].scrollHeight + 'px';
            if (current > 6) {
                $('.scroll1').slimScroll({ scrollTo: scrollToInt });
                setTimeout(function () {
                    $('.scroll1').slimScroll({ scrollTo: scrollToInt });
                }, 500);
            } else {
                setTimeout(function () {
                    $('.scroll1').slimScroll({ scrollTo: '0px' });
                }, 450);
            }
        }
    },
    //UpdateFeedbackNotes: function () {
    //    var textval = $('textarea').sceditor('instance').getBody()[1].innerText.replace(/^\s+/, "");
    //    var questionid = $('.selectquestionAddnotes').data('question')
    //    $('#Qno' + questionid).data('Notes', textval);
    //    Common.ajaxSyncPost({
    //        url: '../../Feedback/UpdateFeedbackNotes',
    //        data: { questionid: questionid, Notes: textval },
    //        success: function (response) {
    //            // alert('Note Saved');
    //        },
    //        error: function (err) {
    //            alert('Error occured while updating');
    //        }
    //    });
    //},
    //loadNotesQuestionnos: function (current) {
    //    var questhtml = '';
    //    $('#m' + current + ' .sliderimg>div').each(function (index, item) {
    //        questhtml += '<li><a ' + ((index == 0) ? 'class="selectquestionAddnotes"' : '') + 'data-question = ' + $(item).data('question') + ' href="#">' + (index + 1) + '</a></li>'
    //    });
    //    $('.questionAddnumber').html(questhtml);
    //    self_feedback.loadQnoClick();
    //    var questionid = $('.selectquestionAddnotes').data('question');
    //    if ($('#Qno' + questionid).data('Notes') != undefined) {
    //        $('textarea').sceditor('instance').getBody()[1].innerText = $('#Qno' + questionid).data('Notes');
    //    }
    //    else {
    //        $('textarea').sceditor('instance').getBody()[1].innerText = '';
    //    }
    //},
    //loadSelectedNotes: function (option) {
    //    $('#selectedNotes').val('');
    //    Common.ajaxsync({
    //        url: "../../Feedback/GetGivenNotes",
    //        data: option.data,
    //        beforeSend: function () {
    //            $("#status").fadeIn();
    //            $("#preloader").delay(100).fadeIn("slow");
    //        },
    //        success: function (response) {
    //            $("#status").fadeOut();
    //            $("#preloader").delay(100).fadeOut("slow");
    //            $('#selectedNotes').val(response);
    //        },
    //        error: function (err) {
    //            //window.location = "../Home/ErrorMsg";
    //        }
    //    });
    //    return $('#selectedNotes').val();
    //},
    //loadQnoClick: function () {
    //    $('.questionAddnumber li a').click(function () {
    //        self_feedback.UpdateFeedbackNotes();
    //        $('.questionAddnumber li a').removeClass('selectquestionAddnotes');
    //        $(this).addClass('selectquestionAddnotes');
    //        var questionid = $('.selectquestionAddnotes').data('question');
    //        if ($('#Qno' + questionid).data('Notes') != undefined) {
    //            $('textarea').sceditor('instance').getBody()[1].innerText = $('#Qno' + questionid).data('Notes');
    //        }
    //        else {
    //            $('textarea').sceditor('instance').getBody()[1].innerText = '';
    //        }
    //    });
    //},
    checkquestionsanswered: function (current) {
        var result = true;
        $('#m' + current + ' .sliderimg>div').each(function (index, item) {
            if ($(item).data('answer') == 0) {
                result = false;
            }
        });
        return result;
    },
    loadlastansweredquestion: function () {
        var lastid = $('.feedbackcomplete').prev().attr('id').replace('m', '');
        $('.feedbackcomplete').prev().prev().show();
        $('.feedbackcomplete').prev().css('opacity', '1').animate({ 'left': '-12%' }, { duration: 400 });
        $('.feedbackcomplete').animate({ 'margin-left': '1.5%', 'left': '-15.5%' }, { duration: 400 });
        $('#plast').hide();
        $('#p' + lastid).show();
        $('#bn' + lastid).show();
    },
    submitfeedback: function () {
        $("#status").fadeIn();
        $("#preloader").fadeIn();
        setTimeout(function () {
            self_feedback.completefeedback();

        }, 1000);
    }
};
//save feedback result
var saveFeedbackResults = function (request) {
    Common.ajaxSyncPost({
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
    Common.ajaxSyncPost({
        url: '../../Feedback/CompleteTakeFeedback',
        data: { fbinitial: $('#fbinitial').val() },
        success: function (response) {
            window.location = "../../Results/Results";
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
        },
        error: function (err) {
        }
    });
};

$(document).ready(function () {
    questionfeddback();
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $('.pageholder').hide();
    $('#redirectNextPage,#feedbackClose').on('click', function () {
        $('#overallFeedback').hide();
        $("#status").fadeIn();
        $("#preloader").fadeIn();
        completeFeedback();
    });
    self_feedback.loadPoeName();
    self_feedback.loadclockevent();

    self_feedback.loadModuleIds({ url: '../../Feedback/GetPracticeArea' });
    self_feedback.loadModuleAndPoeContent({ url: '../../Feedback/GetIntoContentByModuleOrder', data: { 'moduleId': 0 } });
    self_feedback.loadModuleAndPoeContent({ url: '../../Feedback/GetIntoContentByModuleOrder', data: { 'moduleId': 1 } });
    $('.pane').find('input[type=radio]:checked').removeAttr('checked');
    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
    $("#n" + $(this).context.title).attr('checked', 'checked');
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/start-feedback_h.png');
    //self_feedback.loadcommentline();
    //$('#savenotes').click(function () { self_feedback.UpdateFeedbackNotes(); $(document).click(); });

    $('.givebtn').live('click', function () {
        $("#status").fadeIn();
        $('.givebtn').removeClass('selected');

        $('#info').html('Please select Team Members');
        $(".popupbg,.popup").show();

        $(this).addClass('selected');
    });

    $('.close').live('click', function () {
        $(".popupbg,.popup").hide();
        $('.sendbtn').removeClass('selected');
        $('.sendbtn').parent().removeClass('selectFBtwocol');
        $('.selectFBtwocol').removeClass('selectFBtwocol');
    });

    //self_feedback.loadQnoClick();

    // self_feedback.loadNotesQuestionnos(1);
    $('#m1').css({ 'position': 'relative', 'left': '2%' });
    $('#m2').css('opacity', '0.3').css('position', 'relative').css('left', '-1.5%');
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
            $(this).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val() + $(this).attr("data-moduleorder") + "h" + ".png");
        }, function () {
            // alert('123')
            removeAttrHover();
            $('#poemodule>li.selected').find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val() + $('#poemodule>li.selected').attr("data-moduleorder") + "h" + ".png");
        });
    //function () {


});
function hide() {
    $('#q1').hide("slow");
    $('#q5').animate({ 'left': '-700px' }, { duration: 400 });
}

function questionfeddback() {
    //$('.scroll1').slimScroll();
    $('.scroll2').slimScroll();
    $('.scroll3').slimScroll({ 'padding-bottom': '170%' });
}
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
        $('#masterMsgCont').text("Enter the initials");
        $('#overallCont').show();
        //alert('Enter the initials');
        return false;
    }


}

function removeAttrHover() {
    var count = 1;
    $('#poemodule li').each(function () {
        if (!$(this).hasClass('selected')) {
            $(this).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val() + count + ".png");
        }
        count++;
    });
}