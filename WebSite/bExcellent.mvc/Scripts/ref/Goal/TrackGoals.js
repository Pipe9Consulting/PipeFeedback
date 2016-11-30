var trackGoals = {
    Scoretext: ['Rarely', 'Inconsistently', 'Frequently', 'Always'],
    Months : [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ],
    Managers :[],
    getMyNetworkUser: function () {
        Common.ajaxsync({
            url: '/Goal/GetNetworkUsers',
            success: function (response) {
                var html = '';
                var overallMangerScore = 0;
                var overallMangerScoreCount = 0;
                for (var i = 0; i < response.length; i++) {
                   // debugger;
                    if (response[i].JobTitle == "Manager") {
                        trackGoals.Managers.push(response[i].User.UserId);
                    }
                    var score = parseFloat(response[i].WcsiScoreDiff);
                    overallMangerScore = overallMangerScore + score;
                    if (score != 0) {
                        overallMangerScoreCount = overallMangerScoreCount + 1;
                    }
                    var scorestr = Math.abs(score);
                    html = html + "<li data-userid ='" + response[i].User.UserId + "' id='usrli" + i + "' value=" + response[i].UserPOEMappingId + " data-type='1'>" +
                        "<div class='number' id='synavg" + response[i].UserPOEMappingId + "'>" +
                         scorestr + "</div>" +
                         "<img class='syncu' src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                        "<p>" +
                        response[i].User.FirstName + " " + response[i].User.LastName +
                        "</p> " +
                        "</li>";
                }
               var avgMangerscore = 0;
                if (overallMangerScore != 0) {
                     avgMangerscore = (Math.abs(overallMangerScore) / overallMangerScoreCount);
                }
                
                //alert(avgMangerscore + "," + Math.abs(avgMangerscore));
                $('#networktile').html(Math.ceil(avgMangerscore));
                if (response.length < 4) {
                    for (var p = response.length; p < 4; p++) {
                        html = html + " <li class='poelistlidummy' style='cursor:default'></li>";
                    }
                }

                if (response.length > 4) {
                    if (response.length % 2 == 1) {
                        html = html + " <li class='poelistlidummy' style='cursor:default'></li>";
                    }
                }



                $('#userList').append(html);
                if (response.length > 6) {
                    $('.scroll1').slimscroll();
                }
            },
            error: function (err) {
            }
        });
    },
    fillMgrImage: function () {
        var html = '';
        for(var i=0;i< trackGoals.Managers.length;i++){ 
            html += '<img src="/Uploadify/LoadImageHandler.ashx?id=' + trackGoals.Managers[i] + '&amp;rnd=0.18301790487021208" width="30" height="30" alt="User">'
        }
        $('.Mgrimages').html(html);
    },
    LoadTileScore: function () {
        Common.ajaxsync({
            url: '/Goal/GetTrackGoalTileScore',
            success: function (response) {
                $('#networktile').html(Math.abs(response[1]));
                $('#Youtile').html(response[0]);
                trackGoals.getMyNetworkUser();
            }
        });
    },
    loadControls: function () {
        $('#userList li').not('.poelistlidummy').click(function () {
            $('#userList li').removeClass('selected');
            $(this).addClass('selected');
            trackGoals.loadModuleData($(this).val(), $(this).data('type'));
            if ($(this).attr('data-userid') == 0) {
                $('#userimage').attr('src', '../../Images/images/network-gray.png')
                $(this).find('img').attr('src', '../../Images/images/network-gray_h.png')
            }
            else {
                $('#userimage').attr('src', '/Uploadify/LoadImageHandler.ashx?id=' + $(this).attr('data-userid') + '&amp;rnd=0.18301790487021208')
                $('#userList li:first img').attr('src', '../../Images/images/network-gray.png');
            }
        });
        
    },
    loadModuleData: function (usermapping,type) {
        Common.ajaxsync({
            url: '/Goal/TrackModuleQuestions',
            data: { usermapping: usermapping, type: type },
            beforeSend: function () {
                $("#status").fadeIn();
                $("#preloader").delay(100).fadeIn("slow");
            },
            success: function (response) {
                //alert('came');
                //debugger;
                var module = '';
                var questions = '', questionstitle ='';
                var Goaldate = '', Goaldatetitle='';
                var goaltimeline = '', goaltimelinetitle='';
                var goalgap = '', goalgaptitle='';
                var timelinegap = '', timelinegaptitle ='';
                var allquestions = '';
                var allGoaldate = '';
                var allgoaltimeline = '';
                var allgoalgap = '';
                var alltimelinegap = '';
                for (var i = 0; i < response.Netdata.ModuleScores.length; i++) {
                     if (response.Netdata.ModuleScores[i].Moduleorder > 0) {
                         var img = $('#selectedpoe').val() + response.Netdata.ModuleScores[i].Moduleorder + ((response.Netdata.ModuleScores[i].Moduleorder == 1) ? 'h' : '');
                         module = module + "<li data-moduleorder ='" + response.Netdata.ModuleScores[i].Moduleorder + "' id ='li" + response.Netdata.ModuleScores[i].Moduleorder + "'  class='" + ((response.Netdata.ModuleScores[i].Moduleorder == 1) ? ' selected' : '') + "'><img src=\"../../Images/icons/" + img + ".png\" alt=\"Blogs\"/><p>" + response.Netdata.ModuleScores[i].ModuleName + "</p></li>";
                    }
                }
                $('#poemodule').html(module);//+'<li id="li"'+(i+1)+' class=""><img src="../../Images/icons/AOProductSpecialist4.png" alt="Blogs"><p>Show All</p></li>'
                $('#poemodule li').click(function () {
                    var obj = $(this);
                    var selmoduleorder = $(this).data('moduleorder');
                    $('#poemodule li').each(function (index, item) {
                        $(this).removeClass('selected');
                        var moduleorder = $(item).data('moduleorder');
                        $(item).find('img').attr('src', '../../Images/icons/' + $('#selectedpoe').val() + moduleorder + '.png');
                    });
                    $(obj).find('img').attr('src', '../../Images/icons/' + $('#selectedpoe').val() + selmoduleorder + 'h.png');
                    $(obj).addClass('selected');
                    $('.ea_part,.gd_part,.gt_part,.gg_part,.tg_part').hide();
                    $('.ea_part').eq(selmoduleorder - 1).show(); $('.gd_part').eq(selmoduleorder - 1).show(); $('.gt_part').eq(selmoduleorder - 1).show(); $('.gg_part').eq(selmoduleorder - 1).show(); $('.tg_part').eq(selmoduleorder - 1).show();
                    if ($('.ea_part:visible li').length > 10) {
                        $('.scroll2').slimscroll().height('475px');
                        $('.contentTG').css('margin-top', '0%');
                        $(".slimScrollDiv").css("cssText", "");
                        $('.slimScrollDiv').css('margin-top', '1%');
                        } 
                    //else {
                    //    $('.scroll2,.slimScrollDiv').height('auto');
                    //    $('.slimScrollDiv').css('margin-top', '0%');
                    //    $('.contentTG').css('margin-top', '1%');
                    //    $(".slimScrollDiv").css("cssText", "height: auto !important;");
                    //}
                    $('.scroll2').slimscroll();
                });
               
                for (var j = 0; j < response.Netdata.ModuleScores.length; j++) {
                    var totalNetdata = 0; var totalYoudata = 0; var totaldateval = 0; var totvalidvalues = 0; var maxdayrem = 0; var maxpercentrem = 0;
                    var gnotset = 0; var gnotmet = 0; var amgrfb = 0; var gachieved = 0;
                    $.each(response.Netdata.ModuleScores[j].QuestionScores, function (x, d) { totalNetdata = totalNetdata + d.Score; });
                    $.each(response.Youdata.ModuleScores[j].QuestionScores, function (x, d) { totalYoudata = totalYoudata + d.Score; });
                    $.each(response.Netdata.ModuleScores[j].QuestionScores, function (x, d) {
                        var date1 = new Date(d.GoalDate.valueOf());
                        if (!isNaN(date1.valueOf()) && date1.valueOf() != undefined) {
                            totaldateval = totaldateval + date1.valueOf();
                            totvalidvalues += 1;
                        }
                    });
                    questionstitle += '<div class="ea_part "><ul><li>Excellence Action</li>'; Goaldatetitle += '<div class="gd_part "><ul><li>Goal Date</li>';
                    goaltimelinetitle += '<div class="gt_part "><ul><li><span>Goal Timeline</span></li><li><div>' +
                              '<img id="userimage" class="trackNetwork" src="../../Images/images/network-gray.png" width="30" height="30" alt="User" />' +
                          '</div><div class="Mgrimages">' +
                              '<img src="/Uploadify/LoadImageHandler.ashx?id=4&amp;rnd=0.18301790487021208" width="30" height="30" alt="User" />' +
                          '</div></li>';
                        goalgaptitle += '<div class="gg_part"><ul><li>Goal Gap</li>';
                        timelinegaptitle += '<div class="tg_part"><ul><li>Timeline Gap</li>';
                        for (var i = 0; i < response.Youdata.ModuleScores[j].QuestionScores.length; i++) {
                            questions += questionstitle + '<li>' + response.Youdata.ModuleScores[j].QuestionScores[i].ShortQuetionText + '</li>';
                            allquestions += '<li>' + response.Youdata.ModuleScores[j].QuestionScores[i].ShortQuetionText + '</li>';

                            // check whether atleast onefeedback data available

                            if (response.Netdata.ModuleScores[j].QuestionScores.length > 0) {
                                var Goaldateval = response.Netdata.ModuleScores[j].QuestionScores[i].GoalDate;
                                var YouScore = response.Youdata.ModuleScores[j].QuestionScores[i].Score; // Score of the tile selected on left side.
                                var NetScore = response.Netdata.ModuleScores[j].QuestionScores[i].Score; // Score of the tile selected on left side.
                                Goaldate += Goaldatetitle + '<li>' + ((Goaldateval != undefined && Goaldateval != '') ? Goaldateval : 'Goal Not Set') + '</li>';
                                allGoaldate += '<li>' + ((Goaldateval != undefined && Goaldateval != '') ? Goaldateval : 'Goal Not Set') + '</li>';
                                goaltimeline += goaltimelinetitle + '<li><p>' + ((trackGoals.Scoretext[parseInt(YouScore) - 1] != undefined) ? trackGoals.Scoretext[parseInt(YouScore) - 1] : '---') + '</p><p>' + ((trackGoals.Scoretext[parseInt(NetScore) - 1] != undefined) ? trackGoals.Scoretext[parseInt(NetScore) - 1] : '---') + '</p></li>';
                                allgoaltimeline += '<li><p>' + ((trackGoals.Scoretext[parseInt(YouScore) - 1] != undefined) ? trackGoals.Scoretext[parseInt(YouScore) - 1] : '') + '</p><p>' + ((trackGoals.Scoretext[parseInt(NetScore) - 1] != undefined) ? trackGoals.Scoretext[parseInt(NetScore) - 1] : '') + '</p></li>';
                                goalgap += goalgaptitle + '<li>' + trackGoals.fillGoalGap(parseInt(YouScore)) + '</li>';
                                allgoalgap += '<li>' + trackGoals.fillGoalGap(parseInt(YouScore)) + '</li>';

                                var temp = '<li>'
                                if (Goaldateval != undefined && Goaldateval != '') {
                                    if (parseInt(NetScore) == 4) {
                                        gachieved += 1;
                                        temp += '<span class="goalAchieved"><p>Goal Achieved</p></span>';
                                    }
                                    else {
                                        var goaldate = new Date(Goaldateval);
                                        var goalsetdate = new Date(response.Netdata.ModuleScores[j].QuestionScores[i].GoalsetDate);
                                        var today = new Date();
                                        var fbdate = new Date(response.Netdata.ModuleScores[j].QuestionScores[i].FBDate);
                                        if ((goaldate < today) && (fbdate < goalsetdate)) {
                                            amgrfb += 1;
                                            temp += '<span class="awaitingManagerFeedback"><p>Awaiting Manager Feedback</p></span>';
                                        }
                                        else if (goaldate < today) {
                                            gnotmet += 1;
                                            temp += '<span class="goalNotMet"><p>Goal Not Met</p></span>';
                                        }
                                        else {
                                            var daydiff = (goaldate - goalsetdate) / 86400000;
                                            var dayrem = (goaldate - today) / 86400000;
                                            var percentrem = (dayrem / daydiff) * 100;
                                            if (maxdayrem < dayrem) { maxdayrem = dayrem; maxpercentrem = percentrem; }
                                            temp += '<b>' + Math.ceil(dayrem) + ' Days Remaining</b><span class="goalTimeLine"><p><span style="width: ' + percentrem + '%;"></span></p></span>'
                                        }
                                    }
                                }
                                else {
                                    gnotset += 1;
                                    temp += '<b>Goal Not Set</b><span class="goalTimeLine"><p><span style="width: 1%;"></span></p></span>';
                                }
                                temp += '</li>';
                                timelinegap += timelinegaptitle + temp;
                                alltimelinegap += temp;
                            }

                           // if no feedback data available - show empty 

                            else {
                                Goaldate += Goaldatetitle + '<li>---</li>';
                                goaltimeline += goaltimelinetitle + '<li><p>---</p><p>---</p></li>';
                                goalgap += goalgaptitle + '<li><img class="trackNetwork" src="../../Images/new/trackLine.png" width="16" height="26" alt="User" /></li>';
                                timelinegap += timelinegaptitle + '<li><b>Goal Not Set</b><span class="goalTimeLine"><p><span style="width: 1%;"></span></p></span></li>';
                            }
                            questionstitle = ''; Goaldatetitle = ''; goaltimelinetitle = ''; goalgaptitle = ''; timelinegaptitle = '';
                        }
                       
                        questions += '<li>Average</li></ul></div>';
                        if (totaldateval != 0) {
                            var Avgdate = new Date(totaldateval / totvalidvalues);
                            Goaldate += '<li>' + Avgdate.getDate() + ' ' + trackGoals.Months[Avgdate.getMonth()] + ' ' + Avgdate.getFullYear() + '</li></ul></div>';
                        }
                        else {
                            Goaldate += '<li>Goal Not Set</li></ul></div>';
                        }
                        
                        goaltimeline += '<li><p>' + ((totalYoudata != 0) ? trackGoals.Scoretext[parseInt(totalYoudata / response.Youdata.ModuleScores[j].QuestionScores.length) - 1] : '---') +
                            '</p><p>' +  ((totalNetdata != 0) ? trackGoals.Scoretext[parseInt(totalNetdata / response.Netdata.ModuleScores[j].QuestionScores.length) - 1] : '---') + '</p></li></ul></div>';
                        goalgap += '<li>' + trackGoals.fillGoalGap(parseInt(totalYoudata / response.Youdata.ModuleScores[j].QuestionScores.length)) + '</li></ul></div>';
                        if (maxdayrem != 0) {
                            timelinegap += '<li>' + '<b>' + Math.ceil(maxdayrem) + ' Days Remaining</b><span class="goalTimeLine"><p><span style="width: ' + maxpercentrem + '%;"></span></p></span>' + '</li></ul></div>';
                        }
                        else if (gnotset > 0) {
                            timelinegap += '<li><b>Goal Not Set</b><span class="goalTimeLine"><p><span style="width: 1%;"></span></p></span></li></ul></div>';
                        }
                        else if (gnotmet > 0) {
                            timelinegap += '<li><span class="goalNotMet"><p>Goal Not Met</p></span></li></ul></div>';
                        }
                        else if (amgrfb > 0) {
                            timelinegap += '<li><span class="awaitingManagerFeedback"><p>Awaiting Manager Feedback</p></span></li></ul></div>';
                        }
                        else if (gachieved > 0) {
                            timelinegap += '<li><span class="goalAchieved"><p>Goal Achieved</p></span></li></ul></div>';
                        }
                        else {
                            timelinegap += '<li><b>Goal Not Set</b><span class="goalTimeLine"><p><span style="width: 1%;"></span></p></span></li></ul></div>';
                        }
                }
                //debugger
                    $('.contentTG').html(questions + Goaldate + goaltimeline + goalgap + timelinegap);
                    $('.ea_part,.gd_part,.gt_part,.gg_part,.tg_part').hide(); $('.ea_part:first,.gd_part:first,.gt_part:first,.gg_part:first,.tg_part:first').show();
                  //// show all /////////////
                    //$('.contentTG').after('<div class="contentTGall"><div class="ea_part"><ul><li>Excellence Action</li>' + allquestions + '</ul></div>' +
                    //    '<div class="gd_part"><ul><li>Goal Date</li>' + allGoaldate + '</ul></div>' + '<div class="gt_part"><ul><li><span>Goal Timeline</span></li><li><div>' +
                    //          '<img class="trackNetwork" src="../../Images/images/network-gray.png" width="30" height="30" alt="User" />' +
                    //      '</div><div>' +
                    //          '<img src="/Uploadify/LoadImageHandler.ashx?id=4&amp;rnd=0.18301790487021208" width="30" height="30" alt="User" />' +
                    //      '</div></li>' + allgoaltimeline + '</ul></div>' + '<div class="gg_part"><ul><li>Goal Gap</li>' + allgoalgap + '</ul></div>' +
                    //      '<div class="tg_part"><ul><li>Timeline Gap</li>' + alltimelinegap + '</ul></div></div>')
                //$('.contentTGall').hide();
                ///////////////
                    trackGoals.fillMgrImage();
                    if ($('.ea_part:visible li').length >10) {
                        $('.scroll2').slimscroll().height('475px');
                        $('.contentTG').css('margin-top', '0%');
                        $(".slimScrollDiv").css("cssText", "");
                        $('.slimScrollDiv').css('margin-top', '1%');
                    }
                $('.scroll2').slimscroll();
                    $("#status").fadeOut();
                    $("#preloader").delay(100).fadeOut("slow");
                    
            }

        });
    },
    loadPoeName: function () {
        Common.ajaxsync({
            url: "../../Common/GetPoeName",
            // data: option.data,
            beforeSend: function () {
                $("#status").fadeIn();
                $("#preloader").delay(100).fadeIn("slow");
            },
            success: function (response) {
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
                $('#selectedpoe').val(response);
            },
            error: function (err) {
                // window.location = "../Home/ErrorMsg";
            }
        });
    },
    fillGoalGap: function (score) {
        var html = '';
        if (score != 0) {
            for (var i = 0; i < (4 - score) ; i++) {
                html += '<img class="trackNetwork" src="../../Images/new/gapArrow.png" width="16" height="26" alt="User" />';
            }
            if (html == '') {
                html = '<img class="trackNetwork" src="../../Images/new/trackTick.png" width="16" height="26" alt="User" />'
            }
        }
        else {
            html = '<img class="trackNetwork" src="../../Images/new/trackLine.png" width="16" height="26" alt="User" />';
        }
        return html;
    }
}
$(document).ready(function () {
    trackGoals.loadPoeName();
    trackGoals.LoadTileScore();
    trackGoals.loadControls();
    trackGoals.loadModuleData(0, 1);
    Common.setTopMenu(6);
    $('#sticky > ul > li > a').click(function () {
        $('#sticky > ul > li > a').each(function (index, item) {
            $(item).removeClass($(item).attr('data-class'));
        });
        $(this).addClass('select' + $(this).attr('data-class'));
    });
    $(document).click(function () {
        $('#sticky > ul > li > a').each(function (index, item) {
            $(item).removeClass('select' + $(item).attr('data-class'));
            $(item).addClass($(item).attr('data-class'));
        });
    });


    var html = "<li class='nwTile'><a href='../../Goal/SetGoals'><span><img src='../../Images/Icons/goal-small.png'/></span><p>Set Development Priorities</P></a></li>" +
            "<li class='peerTile'><a href='../../Goal/TrackGoals'><span><img src='../../Images/Icons/track-goal-small.png'/></span><p>Track Development Progress</P></a></li>";

    $('#target ul').html(html);

    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/goals_icon_h.png');
    $('#poemodule li').hover(
    function () {
        removeAttrHover();
        $(this).find('img').attr("src", "../../Images/icons/" + $('#selectedpoe').val() + (parseInt($(this).attr("data-moduleorder"))) + "h" + ".png");
        $(this).addClass('moduleHove');
    }, function () {
        // alert('123') 
        removeAttrHover();
        $('#poemodule>li.selected').find('img').attr("src", "../../Images/icons/" + $('#selectedpoe').val() + (parseInt($('#poemodule>li.selected').attr("data-moduleorder"))) + "h" + ".png");
        $('#poemodule>li.selected').addClass('moduleHove');
    });
    function removeAttrHover() {
        var count = 1;
        $('#poemodule li').each(function () {
            if (!$(this).hasClass('selected')) {
                $(this).find('img').attr("src", "../../Images/icons/" + $('#selectedpoe').val() + count + ".png");
                $(this).removeClass("moduleHove");
            }
            count++;
        });
    }
});