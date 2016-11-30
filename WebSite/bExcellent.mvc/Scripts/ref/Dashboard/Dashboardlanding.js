$(function () {
    //$('.dbContentArea').hide();
    $('.startToggle').hide();
    $('.dbpoeList').hide();
    $('#nDashBoard').attr("checked", "checked");
    $(document).click(function (event) {
        if ($(event.target).parents().index($('.dbpoeList')) == -1) {
            var X = $('.dbpoeList').attr('id');
            if (X == 1) {
                $(".dbpoeList>ul").slideUp();
                $('.dbpoeList').attr('id', '0');
                $('.dbpoeList p').removeClass("legendwn");
            }
        }
    });
    dashboard.LoadPoeList();
    $('#poeListItems>li').live('click', function () {
        $('#poeListItems>li').removeClass('selected');
        $(this).addClass('selected');
        $('.dbpoeList p').html($(this).find('span').html());
        $('.poeimg').html($(this).find('.icon').html());
        $(".dbpoeList>ul").slideUp();
        $('.dbpoeList').attr('id', '0');
        $('.dbpoeList p').removeClass("legendwn");
        $('#poeId').val($(this).attr('value'));
        dashboard.LoadDashBoard({ url: '../../Dashboard/GetDashBoard', data: { 'poeid': $('#poeId').val() } });
    });

    $('.dashboard_toggle').click(function () {
        //$('.dbContentArea').slideToggle('.startToggle');
        if ($(this).find('a').text() == 'DASHBOARD') {
            $('.dbContentArea').slideDown('slow');
            $(this).find('a').text("START");
            $('.breadcrumb').text('Home > Dashboard');
            $('.dbpoeList').show();
            $('.startToggle').hide();
        } else {
            $('.dbContentArea').hide();
            $('.startToggle').slideDown('slow');
            $(this).find('a').text("DASHBOARD");
            $('.breadcrumb').text('Home > Start');
            $('.dbpoeList').hide();
            //$('.startToggle').show();
        }
    });
    $('#dashboardclick').click(function () {
        $('.dbContentArea').slideToggle('.startToggle');
        $('.dashboard_toggle').find('a').text("START");
        $('.breadcrumb').text('Home > Dashboard');
        $('.dbpoeList').show();
        $('.startToggle').hide();
    });
    $('.GoalModel .standingtile1,.GoalModel .standingtile2 .tileContent,.GoalModel .standingtile3').live('click', function () {
        window.location = "/sync/TrackGoals?type=1";
    });

    //$('.StandingModel .standingtile1,.StandingModel .standingtile2 .tileContent,.StandingModel .standingtile3').live('click', function () {
    //    window.location = "/Standing/BigPicture?type=1&&mode=3";
    //});
    ////$('.first-and-second-carousel>li').live('click', function () {
    ////    var options = '';
    ////    switch (parseInt($(this).attr('templateId'))) {
    ////        case 1:
    ////            options = { url: '../../Dashboard/GetIndividualSharedGoalsCount', data: { 'sharedId': $(this).attr('sharedId') } };
    ////            dashboard.GetSharedGoals(options);
    ////            break;
    ////        case 2:
    ////            options = { url: '../../Dashboard/GetIndividualStandingScore', data: { 'managerId': $(this).attr('sharedId') } };
    ////            dashboard.GetManagerScore(options);
    ////            break;
    ////            case 3:
    ////                options = { url: '../../Dashboard/GetRecognitionCount', data: { 'sharedid': $(this).attr('sharedId'), 'type': 1 } };
    ////                dashboard.GetRecognitionCount(options);
    ////                break;
    ////            case 4:
    ////                options = { url: '../../Dashboard/GetRecognitionCount', data: { 'sharedid': $(this).attr('sharedId'), 'type': 2 } };
    ////                $(this).find('img').before('<span class="slidecontentselect"></span>');
    ////                dashboard.GetRecognitionCount(options);
    ////                break;
    ////        case 5:
    ////            options = { url: '../../Dashboard/GetFeedbackReceivedCount', data: { 'sharedid': $(this).attr('sharedId') } };
    ////            dashboard.GetFeedbackReceivedCount(options);
    ////            break;
    ////        case 6:
    ////            options = { url: '../../Dashboard/GetFeedbackGivenCount', data: { 'sharedid': $(this).attr('sharedId') } };
    ////            dashboard.GetFeedbackGivenCount(options);
    ////            break;
    ////        default:
    ////            break;
    ////    }
    ////});
    //$('.tenure').on('click',function () {
    //    window.location = "/Standing/BigPicture?type=1&mode=3";
    //});
    //$('.community').click(function () {
    //    window.location = "/Standing/BigPicture?type=1&mode=1";
    //});
    //$('.yourteam').click(function () {
    //    window.location = "/Standing/BigPicture?type=1&mode=2";
    //});
    $(".dbpoeList").click(function () {
        var X = $(this).attr('id');
        if (X == 1) {
            $(".dbpoeList>ul").slideUp();
            $(this).attr('id', '0');
            $('.dbpoeList p').removeClass("legendwn");
        }
        else {
            $(".dbpoeList>ul").slideDown();
            $(this).attr('id', '1');
            $('.dbpoeList p').addClass("legendwn");
        }
    });

    $('#yourPathfinders').live('click', function () {
        dashboard.LoadYourPathfinderByPagination(1, 0); //here 1 is for your pathfinders and 0 is page
    });

    $('#pathfindersForYou').live('click', function () {
        dashboard.LoadYourPathfinderByPagination(2, 0); //here 2 is for your pathfinders and 0 is page
    });

    $('#pathfindePagination>li').live('click', function () {
        //alert($(this).attr('selectedpage'));
        dashboard.LoadYourPathfinderByPagination(parseInt($(this).attr('type')), parseInt($(this).attr('selectedpage'))); //here 1 is for your pathfinders
    });

    $('#Ul4>li,#Ul5>li').live('click', function () {
        if (!$(this).find('img').hasClass('emptyUserTile')) {
            var options = { url: '../../Dashboard/GetIndividualPathfindersCount', data: { 'moduleId': $(this).attr('moduleId'), "type": $(this).attr('type'), "userId": $(this).attr('userId') } };
            $(this).parents('ul').find('span').removeClass('slidecontentselect');
            $(this).find('img').before('<span class="slidecontentselect"></span>');
            dashboard.LoadIndividualPathfindersCount(options, $(this).attr('id'));
        }
    });

    $('#Ul1>li,#Ul2>li').live('click', function () {
        if (!$(this).find('img').hasClass('emptyUserTile')) {
            $(this).parents('ul').find('span').removeClass('slidecontentselect');
            $(this).find('img').before('<span class="slidecontentselect"></span>');
            switch (parseInt($(this).attr('templateId'))) {
                case 5:
                    var options = { url: '../../Dashboard/GetFeedbackReceivedCount', data: { 'sharedid': $(this).attr('sharedId'), 'mappingId': $(this).attr('mappingid') } };
                    dashboard.GetFeedbackReceivedCount(options);
                    break;
                case 6:
                    var options = { url: '../../Dashboard/GetFeedbackGivenCount', data: { 'sharedid': $(this).attr('sharedId'), 'mappingId': $(this).attr('mappingid') } };
                    dashboard.GetFeedbackGivenCount(options);
                    break;
                default:
                    break;
            }
        }
    });

    $('#Ul3>li').live('click', function () {
        if (!$(this).find('img').hasClass('emptyUserTile')) {
            var options = { url: '../../Dashboard/GetIndividualStandingScore', data: { 'managerId': $(this).attr('sharedId'), 'mappingid': $(this).attr('mappingid') } };
            $(this).parents('ul').find('span').removeClass('slidecontentselect');
            $(this).find('img').before('<span class="slidecontentselect"></span>');
            dashboard.GetManagerScore(options);
        }
    });

    $('#Ul6>li').live('click', function () {
        if (!$(this).find('img').hasClass('emptyUserTile')) {
            var options = { url: '../../Dashboard/GetIndividualSharedGoalsCount', data: { 'sharedId': $(this).attr('sharedId') } };
            $(this).parents('ul').find('span').removeClass('slidecontentselect');
            $(this).find('img').before('<span class="slidecontentselect"></span>');
            dashboard.GetSharedGoals(options);
        }
    });

    $('#Ul7>li,#Ul8>li').live('click', function () {
        if (!$(this).find('img').hasClass('emptyUserTile')) {
            var options = { url: '../../Dashboard/GetRecognitionCount', data: { 'sharedid': $(this).attr('sharedId'), 'type': parseInt($(this).attr('type')) } };
            $(this).parents('ul').find('span').removeClass('slidecontentselect');
            $(this).find('img').before('<span class="slidecontentselect"></span>');
            dashboard.GetRecognitionCount(options);
        }
    });
    //$('#Ul8>li').live('click', function () {
    //    if (!$(this).find('img').hasClass('emptyUserTile')) {
    //        options = { url: '../../Dashboard/GetRecognitionCount', data: { 'sharedid': $(this).attr('sharedId'), 'type': 2 } };
    //        $(this).parents('ul').find('span').removeClass('slidecontentselect');
    //        $(this).find('img').before('<span class="slidecontentselect"></span>');
    //        dashboard.GetRecognitionCount(options);
    //    }
    //});
});

var dashboard = {
    LoadPoeList: function () {
        Common.ajax({
            url: '../../Common/GetNetworkSubscribedPoes',
            success: function (response) {
                var html = "<span class='poeimg'><img src='../../Images/" + response[0].POEName.replace("&", "") + "_Intro.png' alt='" + response[0].POEName + "' class='img' /></span><p class='selectedpoename'>" + response[0].POEName + "</p><ul id='poeListItems'>";
                //var poeids = '';
                var selectedPoE = $('#selectedPoelist').val();
                for (var i = 0; i < response.length; i++) {
                    var selectedClass = '';
                    if (i == 0) {
                        $('#poeId').val(response[i].POEId);
                        selectedClass = 'selected';

                        if (selectedPoE != 0) {
                            dashboard.LoadDashBoard({ url: '../../Dashboard/GetDashBoard', data: { 'poeid': selectedPoE } });
                        } else {
                            dashboard.LoadDashBoard({ url: '../../Dashboard/GetDashBoard', data: { 'poeid': response[i].POEId } });
                        }
                    }
                    html = html + " <li id ='poeli" + response[i].POEId + "' class='" + selectedClass + "' value=" + response[i].POEId + " ><a> <div class='icon'><img src='../../Images/" + response[i].POEName.replace("&", "") + "_Intro.png' alt='" + response[i].POEName + "' class='img' /></div> <span>" + response[i].POEName + "</span></a></li>";
                    //poeids = poeids + response[i].POEId + '%';
                }
                $('.dbpoeList').html(html + '</ul>');
                if (selectedPoE != 0) {
                    $('.dbpoeList li').siblings().removeClass("selected");
                    $('#poeli' + selectedPoE).addClass("selected");
                    $('.selectedpoename').text($('#poeli' + selectedPoE).find('span').text());
                    $('.poeimg').html($('#poeli' + selectedPoE).find('.icon').html());
                }
                //$('.dbContentArea').show();
                $('.startToggle').show();
                jQuery('.first-and-second-carousel').jcarousel();
            },
            error: function (err) {
                //$('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },
    GetSharedGoals: function (options) {
        Common.ajax({
            url: options.url,
            data: options.data,
            success: function (response) {
                $('.GoalModel').find('.SMFrist .standingtile2 .tileContent h2').html(response);
            },
            error: function (err) {
                //$('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },
    GetManagerScore: function (options) {
        Common.ajax({
            url: options.url,
            data: options.data,
            success: function (response) {
                // debugger;
                $('.StandingModel').find('.standingtile2 .tileContent h2').html(response);
                $('.StandingModel').find('.tenure .tileContent h2').html(response - parseInt($('#latestSelfScore').val()));
            },
            error: function (err) {
                //$('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },
    GetRecognitionCount: function (options) {
        Common.ajax({
            url: options.url,
            data: options.data,
            success: function (response) {
                if (options.data.type == 2) {
                    $('.RecognitionModel').find('.fbLast .Rtiles .tileContent h2').html(response);
                } else {
                    $('.RecognitionModel').find('.fbFrist .Rtiles .tileContent h2').html(response);
                }
            },
            error: function (err) {
                //$('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },
    GetFeedbackReceivedCount: function (options) {
        $('#mappingids').val(options.data.mappingId);
        Common.ajax({
            url: options.url,
            data: options.data,
            success: function (response) {
                $('.feekbackModel').find('.fbFrist .fbBox2 .tileContent h2').html(response);
            },
            error: function (err) {
                //$('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },
    GetFeedbackGivenCount: function (options) {
        //debugger;
        $('#mappingids').val(options.data.mappingId);
        Common.ajax({
            url: options.url,
            data: options.data,
            success: function (response) {
                $('.feekbackModel').find('.fbLast .storiesOthers .tileContent h2').html(response);
               
            },
            error: function (err) {
                //$('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },
    LoadDashBoard: function (options) {
        Common.ajax({
            url: options.url,
            data: options.data,
            success: function (response) {
                //debugger;
                //debugger;
                // Load goals
                dashboard.loadPoeName();
                if (response.DashboardGoal != null) {
                    var goalHtml = '<div class="SMFrist"><div class="standingtile1"><div class="tileContent"><h2>' + response.DashboardGoal.GoalsCompleted + '</h2><p>Goals Completed</p></div><div class="tileIcon">' +
                        '<img src="../../Images/dashboard/gCompleted.png" /></div></div><div class="standingtile2"><div class="tileslider">' +
                        '<div class="slider"><ul id="Ul6" class="first-and-second-carousel jcarousel-skin-tango">';
                    var goalUsersHtml = '';
                    for (var i = 0; i < response.DashboardGoal.GoalUsers.length > 0; i++) {
                        goalUsersHtml = goalUsersHtml + '<li templateId="1" sharedId=' + response.DashboardGoal.GoalUsers[i].UserId + '><a class="showtooltip" title="' + response.DashboardGoal.GoalUsers[i].Name + '"><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardGoal.GoalUsers[i].UserId + '&rnd=' + Math.random() + '" /></a></li>';
                    }
                    switch (response.DashboardGoal.GoalUsers.length) {
                        case 0:
                            goalUsersHtml = goalUsersHtml + '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li><li><img src=""  class="emptyUserTile" /></li>';
                            break;
                        case 1:
                            goalUsersHtml = goalUsersHtml + '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li>';
                            break;
                        case 2:
                            goalUsersHtml = goalUsersHtml + '<li><img src="" class="emptyUserTile" /></li>';
                            break;
                        default:
                            goalUsersHtml = goalUsersHtml;
                            break;
                    }
                    goalHtml = goalHtml + goalUsersHtml + '</ul></div></div>' + '<div class="tileContent"><h2>' + response.DashboardGoal.GoalsShared + '' +
                        '</h2><p>Goals Shared</p></div><div class="tileIcon"><img src="../../Images/dashboard/GShared.png" /></div></div></div></div>' +
                        '<div class="SMCenter"><img src="../../Images/dashboard/StandingLine.png" /></div>';
                    goalHtml = goalHtml + ' <div class="SMLast"><div class="standingtile1"><div class="tileContent"><h2>' + response.DashboardGoal.GoalsDelayed + '</h2><p>Goals Delayed</p></div>' +
                        '<div class="tileIcon"><img src="../../Images/dashboard/gDelay.png" /></div></div><div class="standingtile3">' +
                        '<div class="tileContent"><h2>' + response.DashboardGoal.GoalsSet + '</h2><p>Goals Set</p></div><div class="tileIcon"><img src="../../Images/dashboard/rSet.png" /></div></div></div>';

                    $('.GoalModel').html(goalHtml);
                    //jQuery('.first-and-second-carousel').jcarousel();
                } else {
                    var goalHtml = '<div class="SMFrist"><div class="standingtile1"><div class="tileContent"><h2>' + 0 + '</h2><p>Goals Completed</p></div><div class="tileIcon">' +
                        '<img src="../../Images/dashboard/gCompleted.png" /></div></div><div class="standingtile2"><div class="tileslider">' +
                        '<div class="slider"><ul id="Ul6" class="first-and-second-carousel jcarousel-skin-tango">';
                    var goalUsersHtml = '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li><li><img src=""  class="emptyUserTile" /></li>';
                    //for (var i = 0; i < response.DashboardGoal.GoalUsers.length > 0; i++) {
                    //    usersHtml = usersHtml + '<li><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardGoal.GoalUsers[i].UserId + '&rnd=' + Math.random() + '" /></li>';
                    //}
                    goalHtml = goalHtml + goalUsersHtml + '</ul></div></div>' + '<div class="tileContent"><h2>' + 0 + '' +
                        '</h2><p>Goals Shared</p></div><div class="tileIcon"><img src="../../Images/dashboard/GShared.png" /></div></div></div></div>' +
                        '<div class="SMCenter"><img src="../../Images/dashboard/StandingLine.png" /></div>';
                    goalHtml = goalHtml + ' <div class="SMLast"><div class="standingtile1"><div class="tileContent"><h2>' + 0 + '</h2><p>Goals Delayed</p></div>' +
                        '<div class="tileIcon"><img src="../../Images/dashboard/gDelay.png" /></div></div><div class="standingtile3">' +
                        '<div class="tileContent"><h2>' + 0 + '</h2><p>Goals Set</p></div><div class="tileIcon"><img src="../../Images/dashboard/rSet.png" /></div></div></div>';

                    $('.GoalModel').html(goalHtml);
                    //jQuery('.first-and-second-carousel').jcarousel();
                }
                //debugger;
                //Load Standing
                if (response.DashboardStanding != null) {
                    $('#latestSelfScore').val(response.DashboardStanding.ManagerSync);
                    var managerSyncValue = response.DashboardStanding.YourStanding - response.DashboardStanding.ManagerSync;
                    var standingHtml = ' <div class="SMFrist"><div class="standingtile2">' +
                        '<div class="tileslider" ><div class="slider"><ul id="Ul3" class="first-and-second-carousel jcarousel-skin-tango">';
                    var standingUsersHtml = '';
                    var selectedclass = "";
                    var managerid = 0;
                    var mappingids = 0;
                    for (var s = 0; s < response.DashboardStanding.StandingUsers.length > 0; s++) {
                        managerid = response.DashboardStanding.StandingUsers[0].UserId;
                        mappingids = response.DashboardStanding.StandingUsers[0].MappingId;

                        standingUsersHtml = standingUsersHtml + '<li templateId="2" sharedId=' + response.DashboardStanding.StandingUsers[s].UserId + ' mappingid=' + response.DashboardStanding.StandingUsers[s].MappingId + '><a class="showtooltip" title="' + response.DashboardStanding.StandingUsers[s].Name + '"><span class=' + (s == 0 ? 'slidecontentselect' : '') + '></span><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardStanding.StandingUsers[s].UserId + '&rnd=' + Math.random() + '" /></a></li>';
                    }
                    switch (response.DashboardStanding.StandingUsers.length) {
                        case 0:
                            standingUsersHtml = standingUsersHtml + '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li><li><img src=""  class="emptyUserTile" /></li>';
                            break;
                        case 1:
                            standingUsersHtml = standingUsersHtml + '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li>';
                            break;
                        case 2:
                            standingUsersHtml = standingUsersHtml + '<li><img src="" class="emptyUserTile" /></li>';
                            break;
                        default:
                            standingUsersHtml = standingUsersHtml;
                            break;
                    }
                    standingHtml = standingHtml + standingUsersHtml + '</ul></div></div><div class="tileContent" onclick="redirectSync()"><h2>' + response.DashboardStanding.YourStanding + '</h2><p>Your Standing</p></div><div class="tileIcon">' +
                        '<img src="../../Images/dashboard/sStanding.png" /></div></div><div class="standingtile1 tenure" onclick="redirectSync()"><div class="tileContent"><h2>' + ((managerSyncValue) >= 0 ? '+' + managerSyncValue : managerSyncValue) + '</h2><p>Manager Sync</p>' +
                        '</div><div class="tileIcon"><img src="../../Images/dashboard/stenure.png" /></div></div></div><div class="SMCenter"><img src="../../Images/dashboard/StandingLine.png" /></div>';

                    var yourCommunity = response.DashboardStanding.YourComunity;
                    var yourTeam = response.DashboardStanding.YourTeam;
                    standingHtml = standingHtml + '<div class="SMLast"><div class="standingtile1 community" onclick="redirectStanding(1)" ><div class="tileContent"><h2>' + (yourCommunity >= 0 ? '+' + yourCommunity : yourCommunity) + '</h2><p>Community Sync</p></div>' +
                        '<div class="tileIcon"><img src="../../Images/dashboard/sCommunitiy.png" /></div></div><div class="standingtile3 yourteam" onclick="redirectStanding(2)"><div class="tileContent">' +
                        '<h2>' + (yourTeam >= 0 ? '+' + yourTeam : yourTeam) + '</h2><p>Team Sync</p></div><div class="tileIcon"><img src="../../Images/dashboard/sTeam.png" /></div></div></div>';

                    $('.StandingModel').html(standingHtml);
                    //jQuery('.first-and-second-carousel').jcarousel();
                } else {
                    var standingHtml = ' <div class="SMFrist"><div class="standingtile1"><div class="tileContent"><h2>+0</h2><p>Your Tenure</p>' +
                        '</div><div class="tileIcon"><img src="../../Images/dashboard/stenure.png" /></div></div><div class="standingtile2">' +
                        '<div class="tileslider"><div class="slider"><ul id="Ul3" class="first-and-second-carousel jcarousel-skin-tango">';
                    var standingUsersHtml = '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li><li><img src=""  class="emptyUserTile" /></li>';

                    standingHtml = standingHtml + standingUsersHtml + '</ul></div></div><div class="tileContent"><h2>0</h2><p>Your Standing</p></div><div class="tileIcon">' +
                        '<img src="../../Images/dashboard/sStanding.png" /></div></div></div><div class="SMCenter"><img src="../../Images/dashboard/StandingLine.png" /></div>';

                    standingHtml = standingHtml + '<div class="SMLast"><div class="standingtile1"><div class="tileContent"><h2>+0</h2><p>Community Sync</p></div>' +
                        '<div class="tileIcon"><img src="../../Images/dashboard/sCommunitiy.png" /></div></div><div class="standingtile3"><div class="tileContent">' +
                        '<h2>+0</h2><p>Team Sync</p></div><div class="tileIcon"><img src="../../Images/dashboard/sTeam.png" /></div></div></div>';

                    $('.StandingModel').html(standingHtml);
                    //jQuery('.first-and-second-carousel').jcarousel();
                }
                //debugger;
                //Load Dashboard Recognition
                if (response.DashboardRecognition != null) {
                    var recognitionHtml = '<div class="fbFrist"><div class="Rtiles "><div class="slider"><ul id="Ul7" class="first-and-second-carousel jcarousel-skin-tango">';
                    //RecognitionOthersUser
                    var recognitionUsersHtml = '';

                    for (var r = 0; r < response.DashboardRecognition.RecognitionOthersUser.length > 0; r++) {
                        recognitionUsersHtml = recognitionUsersHtml + '<li templateId="3" type="1" sharedId=' + response.DashboardRecognition.RecognitionOthersUser[r].UserId + '><a class="showtooltip" title="' + response.DashboardRecognition.RecognitionOthersUser[r].Name + '"><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardRecognition.RecognitionOthersUser[r].UserId + '&rnd=' + Math.random() + '" /></a></li>';
                    }

                    switch (response.DashboardRecognition.RecognitionOthersUser.length) {
                        case 0:
                            recognitionUsersHtml = recognitionUsersHtml + '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li><li><img src=""  class="emptyUserTile" /></li>';
                            break;
                        case 1:
                            recognitionUsersHtml = recognitionUsersHtml + '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li>';
                            break;
                        case 2:
                            recognitionUsersHtml = recognitionUsersHtml + '<li><img src="" class="emptyUserTile" /></li>';
                            break;
                        default:
                            recognitionUsersHtml = recognitionUsersHtml;
                            break;
                    }

                    recognitionHtml = recognitionHtml + recognitionUsersHtml + '</ul></div><div class="tileContent" onclick="redirectWall()"><h2>' + response.DashboardRecognition.RecognitionOthers + '</h2><p>Recognition from Others</p></div><div class="tileIcon">' +
                        '<img src="../../Images/dashboard/rOthers.png" /></div></div></div><div class="fbCenter"><img src="../../Images/dashboard/recognitionLine.png" /></div>';

                    recognitionHtml = recognitionHtml + '<div class="fbLast"><div class="Rtiles"><div class="tileslider"><div class="tileslider"><div class="slider">' +
                        '<ul id="Ul8" class="first-and-second-carousel jcarousel-skin-tango">';
                    //RecognitionYouUsers
                    recognitionUsersHtml = '';

                    for (var r1 = 0; r1 < response.DashboardRecognition.RecognitionYouUsers.length > 0; r1++) {
                        recognitionUsersHtml = recognitionUsersHtml + '<li templateId="4" type="2" sharedId=' + response.DashboardRecognition.RecognitionYouUsers[r1].UserId + '><a class="showtooltip" title="' + response.DashboardRecognition.RecognitionYouUsers[r1].Name + '"><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardRecognition.RecognitionYouUsers[r1].UserId + '&rnd=' + Math.random() + '" /></a></li>';
                    }

                    switch (response.DashboardRecognition.RecognitionYouUsers.length) {
                        case 0:
                            recognitionUsersHtml = recognitionUsersHtml + '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li><li><img src=""  class="emptyUserTile" /></li>';
                            break;
                        case 1:
                            recognitionUsersHtml = recognitionUsersHtml + '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li>';
                            break;
                        case 2:
                            recognitionUsersHtml = recognitionUsersHtml + '<li><img src="" class="emptyUserTile" /></li>';
                            break;
                        default:
                            recognitionUsersHtml = recognitionUsersHtml;
                            break;
                    }

                    recognitionHtml = recognitionHtml + recognitionUsersHtml + '</ul></div></div></div><div class="tileContent"><h2>' + response.DashboardRecognition.RecognitionYou + '</h2><p>Recognized by You</p></div><div class="tileIcon"><img src="../../Images/dashboard/rYou.png" /></div></div></div>';

                    $('.RecognitionModel').html(recognitionHtml);
                    //jQuery('.first-and-second-carousel').jcarousel();
                } else {
                    var recognitionHtml = '<div class="fbFrist"><div class="Rtiles " ><div class="slider"><ul id="Ul7" class="first-and-second-carousel jcarousel-skin-tango">';
                    //RecognitionOthersUser
                    var recognitionUsersHtml = '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li><li><img src=""  class="emptyUserTile" /></li>';

                    recognitionHtml = recognitionHtml + recognitionUsersHtml + '</ul></div><div class="tileContent"><h2>0</h2><p>Recognition from Others</p></div><div class="tileIcon">' +
                        '<img src="../../Images/dashboard/rOthers.png" /></div></div></div><div class="fbCenter"><img src="../../Images/dashboard/recognitionLine.png" /></div>';

                    recognitionHtml = recognitionHtml + '<div class="fbLast"><div class="Rtiles"><div class="tileslider"><div class="tileslider"><div class="slider">' +
                        '<ul id="Ul8" class="first-and-second-carousel jcarousel-skin-tango">';
                    //RecognitionYouUsers
                    recognitionUsersHtml = '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li><li><img src=""  class="emptyUserTile" /></li>';

                    recognitionHtml = recognitionHtml + recognitionUsersHtml + '</ul></div></div></div><div class="tileContent"><h2>0</h2><p>Recognized by You</p></div><div class="tileIcon"><img src="../../Images/dashboard/rYou.png" /></div></div></div>';

                    $('.RecognitionModel').html(recognitionHtml);
                    //jQuery('.first-and-second-carousel').jcarousel();
                }

                //Your Pathfinders
                dashboard.LoadYourPathfinders(response, 0, 1);// here 1 is youe path finders
                //Load Feedback

                dashboard.LoadFeedback(response);
                if (managerid != 0) {
                    var options = { url: '../../Dashboard/GetIndividualStandingScore', data: { 'managerId': managerid, 'mappingid': mappingids } };
                    dashboard.GetManagerScore(options);
                }
                $(".showtooltipn").tooltip({
                    show: {
                        effect: "explode",
                        delay: 250
                    }
                });
                jQuery('.first-and-second-carousel').jcarousel();
            },
            error: function (err) {
                //$('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },
    LoadEmptyUsers: function (length, pathFindersUsersHtml) {
        switch (length) {
            case 0:
                pathFindersUsersHtml = pathFindersUsersHtml + '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li><li><img src=""  class="emptyUserTile" /></li>';
                break;
            case 1:
                pathFindersUsersHtml = pathFindersUsersHtml + '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li>';
                break;
            case 2:
                pathFindersUsersHtml = pathFindersUsersHtml + '<li><img src="" class="emptyUserTile" /></li>';
                break;
            default:
                pathFindersUsersHtml = pathFindersUsersHtml;
                break;
        }
        return pathFindersUsersHtml;
    },
    LoadEmptyPathfindersUsers: function (length, pathFindersUsersHtml) {
        switch (length) {
            case 0:
                pathFindersUsersHtml = pathFindersUsersHtml + '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li><li><img src=""  class="emptyUserTile" /></li>';
                break;
            case 1:
                pathFindersUsersHtml = pathFindersUsersHtml + '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li>';
                break;
            case 2:
                pathFindersUsersHtml = pathFindersUsersHtml + '<li><img src="" class="emptyUserTile" /></li>';
                break;
            default:
                pathFindersUsersHtml = pathFindersUsersHtml;
                break;
        }
        return pathFindersUsersHtml;
    },
    loadControls: function () {
    },
    LoadYourPathfinders: function (response, page, type) {
        //debugger;
        //Load Dashboard PathFinders
        if (response.DashboardPathFinders.YourPathfinders.length > 0) {
            //RecognitionOthersUser
            var pathFindersHtml = ' <div class="PFTop"><div id="yourPathfinders" class="PFtiles2 ' + (type == 1 ? 'selected' : '') + '"><div class="tileContent"><h2>' + response.DashboardPathFinders.YourPathfindersCount + '</h2><p>Your Pathfinders</p></div>' +
                '<div class="tileIcon2"><img src="../../Images/dashboard/pPathfinder.png" /></div></div><div class="PFCenter">' +
                '<img src="../../Images/dashboard/pathfinderline.png" /></div><div id="pathfindersForYou" class="PFtiles2 ' + (type == 2 ? 'selected' : '') + '"><div class="tileContent"><h2>' + response.DashboardPathFinders.PathfindersForYouCount + '</h2>' +
                '<p>Pathfinders for You</p></div><div class="tileIcon2"><img src="../../Images/dashboard/pYou.png" /></div></div></div><div class="clr"></div>';
            var p = page;
            var totalModules = response.DashboardPathFinders.ModulesCount;
            var pathfindersPA = response.DashboardPathFinders.YourPathfinders.length;
            var pagination = Math.ceil(totalModules / 2);
            var noofOccurences = (2 * pagination);
            for (; p < noofOccurences > 0; p++) {
                var paginationHtml = '<div class="slideNumber"><ul id="pathfindePagination">';
                for (pg = 0; pg < pagination; pg++) {
                    paginationHtml = paginationHtml + '<li type="' + type + '" selectedPage=' + (pg == 0 ? pg : Math.pow(2, pg)) + ' ><a class=' + (pg == (page / 2) ? 'selected' : '') + ' href="#">' + (pg + 1) + '</a></li>';
                }
                paginationHtml = paginationHtml + '</ul></div></div></div>';

                if (pathfindersPA > p) {
                    var img = $('#selectedpoe').val() + (p + 1);
                    pathFindersHtml = pathFindersHtml + '<div class="PFTileSelect" ><div class="' + (type == 1 ? 'PFTileLineRight' : 'PFTileLineLeft') + '"><img src="../../Images/dashboard/pftileline.png" /></div>' +
                        '<div class="PFbottom" ><div class="PFSlider ">' +
                        '<div class="tileslider"><div class="tileslider"><div class="slider">' +
                        '<ul id="Ul4" class="first-and-second-carousel jcarousel-skin-tango">';
                    var struser1 = '';
                    if (response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers[0].UserId != 0) {
                        for (var sub = 0; sub < response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers.length; sub++) {
                            struser1 = struser1 + '<li type="' + type + '" id="' + p + '" moduleId="' + response.DashboardPathFinders.YourPathfinders[p].ModuleId + '" userId="' + response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers[sub].UserId + '"><a class="showtooltip" title="' + response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers[sub].Name + '"><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers[sub].UserId + '&rnd=' + Math.random() + '" /></a></li>';
                        }
                        struser1 = dashboard.LoadEmptyPathfindersUsers(response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers.length, struser1);
                    }
                    else {
                        struser1 = dashboard.LoadEmptyPathfindersUsers(0, struser1);
                    }
                    pathFindersHtml = pathFindersHtml + struser1 + '</ul></div></div></div><div class="tileContent"><h2 id="pathfinderUserCount' + p + '">' + response.DashboardPathFinders.YourPathfinders[p].PracticeAreaCount + '</h2><p>' + response.DashboardPathFinders.YourPathfinders[p].PracticeAreaName + '</p></div><div class="tileIcon"><img src="../../Images/icons/' + img + '.png" /></div></div>';
                    p = p + 1;
                } else {
                    var img = $('#selectedpoe').val() + (p + 1);
                    pathFindersHtml = pathFindersHtml + '<div class="PFTileSelect" ><div class="' + (type == 1 ? 'PFTileLineRight' : 'PFTileLineLeft') + '"><img src="../../Images/dashboard/pftileline.png" /></div>' +
                        '<div class="PFbottom" ><div class="PFSlider "><div class="tileslider"><div class="tileslider"><div class="slider">' +
                        '<ul id="Ul4" class="first-and-second-carousel jcarousel-skin-tango">';
                    var struser1 = dashboard.LoadEmptyPathfindersUsers(0, '');
                    pathFindersHtml = pathFindersHtml + struser1 + '</ul></div></div></div><div class="tileContent">' + (response.DashboardPathFinders.Modules[p + 1] != undefined ? '<h2>0</h2><p>' + response.DashboardPathFinders.Modules[p + 1].ModuleName + '</p>' : '<h2>&nbsp;</h2><p>&nbsp;</p>') + '</p></div><div class="tileIcon"><img src="../../Images/icons/' + img + '.png" /></div></div>';
                    p = p + 1;
                }
                if (pathfindersPA > p) {
                    var img = $('#selectedpoe').val() + (p + 1);
                    pathFindersHtml = pathFindersHtml + '<div class="PFSlider sliderNext"><div class="tileslider"><div class="tileslider"><div class="slider"><ul id="Ul5" class="first-and-second-carousel jcarousel-skin-tango">';
                    var strUser2 = '';
                    if (response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers[0].UserId != 0) {
                        for (var sub1 = 0; sub1 < response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers.length; sub1++) {
                            strUser2 = strUser2 + '<li type="' + type + '" id="' + p + '" moduleId="' + response.DashboardPathFinders.YourPathfinders[p].ModuleId + '" userId="' + response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers[sub1].UserId + '"><a class="showtooltip" title="' + response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers[sub1].Name + '"><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers[sub1].UserId + '&rnd=' + Math.random() + '" /></a></li>';
                        }
                        strUser2 = dashboard.LoadEmptyPathfindersUsers(response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers.length, strUser2);
                    } else {
                        strUser2 = dashboard.LoadEmptyPathfindersUsers(0, strUser2);
                    }
                    pathFindersHtml = pathFindersHtml + strUser2 + '</ul></div></div></div><div class="tileContent"><h2 id="pathfinderUserCount' + p + '">' + response.DashboardPathFinders.YourPathfinders[p].PracticeAreaCount + '</h2><p>' + response.DashboardPathFinders.YourPathfinders[p].PracticeAreaName + '</p></div><div class="tileIcon">' +
                        '<img src="../../Images/icons/' + img + '.png" /></div></div><div class="clr"></div>';
                } else {
                    var img = $('#selectedpoe').val() + (p + 1);
                    var strUser2 = '<div class="PFSlider sliderNext"><div class="tileslider"><div class="tileslider"><div class="slider"><ul id="Ul5" class="first-and-second-carousel jcarousel-skin-tango">';
                    strUser2 = strUser2 + dashboard.LoadEmptyPathfindersUsers(0, '');
                    pathFindersHtml = pathFindersHtml + strUser2 + '</ul></div></div></div><div class="tileContent">' + (response.DashboardPathFinders.Modules[p + 1] != undefined ? '<h2>0</h2><p>' + response.DashboardPathFinders.Modules[p + 1].ModuleName + '</p>' : '<h2>&nbsp;</h2><p>&nbsp;</p>') + '</div><div class="tileIcon">' +
                       (response.DashboardPathFinders.Modules[p + 1] != undefined ? '<img src="../../Images/icons/' + img + '.png" />' : '') + '</div></div><div class="clr"></div>';
                }

                pathFindersHtml = pathFindersHtml + paginationHtml;
                break;
            }
            $('.PathfinderModel').html(pathFindersHtml);
            //jQuery('.first-and-second-carousel').jcarousel();
        } else {
            //debugger;
            var pathFindersHtml = ' <div class="PFTop"><div id="yourPathfinders" class="PFtiles2 ' + (type == 1 ? 'selected' : '') + '"><div class="tileContent"><h2>0</h2><p>Your Pathfinders</p></div>' +
                '<div class="tileIcon2"><img src="../../Images/dashboard/pPathfinder.png" /></div></div><div class="PFCenter">' +
                '<img src="../../Images/dashboard/pathfinderline.png" /></div><div id="pathfindersForYou" class="PFtiles2 ' + (type == 2 ? 'selected' : '') + '"><div class="tileContent"><h2>0</h2>' +
                '<p>Pathfinders for You</p></div><div class="tileIcon2"><img src="../../Images/dashboard/pYou.png" /></div></div></div><div class="clr"></div>';
            var p = page;
            var totalModules = response.DashboardPathFinders.ModulesCount;
            var pagination = Math.ceil(totalModules / 2);

            var paginationHtml = '<div class="slideNumber"><ul id="pathfindePagination">';
            for (pg = 0; pg < pagination; pg++) {
                paginationHtml = paginationHtml + '<li type="' + type + '" selectedPage=' + (pg == 0 ? pg : Math.pow(2, pg)) + ' ><a class=' + (pg == (page / 2) ? 'selected' : '') + ' href="#">' + (pg + 1) + '</a></li>';
            }
            paginationHtml = paginationHtml + '</ul></div></div></div>';

            var img = $('#selectedpoe').val() + (p + 1);
            pathFindersHtml = pathFindersHtml + '<div class="PFTileSelect" ><div class="' + (type == 1 ? 'PFTileLineRight' : 'PFTileLineLeft') + '"><img src="../../Images/dashboard/pftileline.png" /></div>' +
                '<div class="PFbottom" ><div class="PFSlider "><div class="tileslider"><div class="tileslider"><div class="slider">' +
                '<ul id="Ul4" class="first-and-second-carousel jcarousel-skin-tango">';
            var struser1 = dashboard.LoadEmptyPathfindersUsers(0, '');
            pathFindersHtml = pathFindersHtml + struser1 + '</ul></div></div></div><div class="tileContent">' + (response.DashboardPathFinders.Modules[p + 1] != undefined ? '<h2>0</h2><p>' + response.DashboardPathFinders.Modules[p + 1].ModuleName + '</p>' : '<h2>&nbsp;</h2><p>&nbsp;</p>') + '</div>' +
                '<div class="tileIcon">' + (response.DashboardPathFinders.Modules[p + 1] != undefined ? '<img src="../../Images/icons/' + img + '.png" />' : '') + '</div></div>';
            p = p + 1;

            var img = $('#selectedpoe').val() + (p + 1);
            var strUser2 = '<div class="PFSlider sliderNext"><div class="tileslider"><div class="tileslider"><div class="slider"><ul id="Ul5" class="first-and-second-carousel jcarousel-skin-tango">';
            strUser2 = strUser2 + dashboard.LoadEmptyPathfindersUsers(0, '');
            pathFindersHtml = pathFindersHtml + strUser2 + '</ul></div></div></div><div class="tileContent">' + (response.DashboardPathFinders.Modules[p + 1] != undefined ? '<h2>0</h2><p>' + response.DashboardPathFinders.Modules[p + 1].ModuleName + '</p>' : '<h2>&nbsp;</h2><p>&nbsp;</p>') + '</div><div class="tileIcon">' +
                                                            (response.DashboardPathFinders.Modules[p + 1] != undefined ? '<img src="../../Images/icons/' + img + '.png" />' : '') + '</div></div><div class="clr"></div>';

            pathFindersHtml = pathFindersHtml + paginationHtml;

            //var pathFindersHtml = '<div class="PFTop"><div id="yourPathfinders" class="PFtiles2 ' + (type == 1 ? 'selected' : '') + '" ><div class="tileContent"><h2>0</h2><p>Your Pathfinders</p></div>' +
            //'<div class="tileIcon2"><img src="../../Images/dashboard/pPathfinder.png" /></div></div><div class="PFCenter">' +
            //'<img src="../../Images/dashboard/pathfinderline.png" /></div><div id="pathfindersForYou" class="PFtiles2 ' + (type == 2 ? 'selected' : '') + '"><div class="tileContent"><h2>0</h2>' +
            //'<p>Pathfinders for You</p></div><div class="tileIcon2"><img src="../../Images/dashboard/pYou.png" /></div></div></div><div class="clr"></div>' +
            //'<div class="PFTileSelect" ><div class="' + (type == 1 ? 'PFTileLineRight' : 'PFTileLineLeft') + '"><img src="../../Images/dashboard/pftileline.png" /></div>' +
            //'<div class="PFbottom" ><div class="PFSlider "><div class="tileslider"><div class="tileslider"><div class="slider">' +
            //'<ul id="Ul4" class="first-and-second-carousel jcarousel-skin-tango">' +
            //'<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li><li><img src=""  class="emptyUserTile" /></li>' +
            //'</ul></div></div></div><div class="tileContent"><h2>0</h2><p>Read by You</p></div><div class="tileIcon"><img src="../../Images/icons/' + img + '1.png" /></div></div>' +
            //'<div class="PFSlider sliderNext"><div class="tileslider"><div class="tileslider"><div class="slider"><ul id="Ul5" class="first-and-second-carousel jcarousel-skin-tango">' +
            //'<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li><li><img src=""  class="emptyUserTile" /></li>' +
            //'</ul></div></div></div><div class="tileContent"><h2>0</h2><p>Read by You</p></div><div class="tileIcon">' +
            //'<img src="../../Images/icons/' + img + '2.png" /></div></div><div class="clr"></div><div class="slideNumber"><ul><li><a class="selected" href="#">1</a></li></ul></div></div></div>';
            $('.PathfinderModel').html(pathFindersHtml);
            //jQuery('.first-and-second-carousel').jcarousel();
        }
    },
    LoadYourPathfinderByPagination: function (type, page) {
        Common.ajax({
            url: '../../Dashboard/GetPathfinders',
            data: { "type": type },
            success: function (response) {
                dashboard.LoadYourPathfinders(response, page, type);
                //jQuery('.first-and-second-carousel').jcarousel();
            },
            error: function (err) {
                //$('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },
    LoadFeedback: function (response) {
        //debugger;
        if (response.DashboardFeedback != null) {
            var feedbackHtml = '<div class="fbFrist"><div class="fbBox1"><div class="tileContent" onclick="redirectSyncPages(1)"><h2>' + response.DashboardFeedback.FeedbackTaken + '</h2><p>Taken by You</p></div><div class="tileIcon">' +
                             '<img src="../../Images/dashboard/fbtaken.png" /></div></div><div class="fbBox2 "><div class="slider"><ul id="Ul1" class="first-and-second-carousel jcarousel-skin-tango">';
            var feedbackReceiveForYou = '';
            //debugger;
            for (var i = 0; i < response.DashboardFeedback.FeedbackReceivedUsers.length; i++) {
                feedbackReceiveForYou = feedbackReceiveForYou + '<li templateId="5" sharedId=' + response.DashboardFeedback.FeedbackReceivedUsers[i].User.UserId + ' mappingid=' + response.DashboardFeedback.FeedbackReceivedUsers[i].UserPOEMappingId + '><a class="showtooltip" title="' + response.DashboardFeedback.FeedbackReceivedUsers[i].User.FirstName + " " + response.DashboardFeedback.FeedbackReceivedUsers[i].User.LastName + '"><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardFeedback.FeedbackReceivedUsers[i].User.UserId + '&rnd=' + Math.random() + '" /></a></li>';
            }

            feedbackReceiveForYou = dashboard.LoadEmptyUsers(response.DashboardFeedback.FeedbackReceivedUsers.length, feedbackReceiveForYou);

            feedbackHtml = feedbackHtml + feedbackReceiveForYou + '</ul></div><div class="tileContent" onclick="redirectSyncPagesNew(1)"><h2>' + response.DashboardFeedback.FeedbackReceived + '</h2><p>Received for You</p></div>' +
                '<div class="tileIcon"><img src="../../Images/dashboard/fbReceived.png" />' +
                '</div></div></div><div class="fbCenter"><img src="../../Images/dashboard/fbline.png" /></div>' +
                '<div class="fbLast"><div class="storiesOthers"><div class="tileslider"><div class="tileslider">' +
                '<div class="slider"><ul id="Ul2" class="first-and-second-carousel jcarousel-skin-tango">';
            var feedbackGivenForYou = '';

            for (var j = 0; j < response.DashboardFeedback.FeedbackGivenUsers.length; j++) {
                feedbackGivenForYou = feedbackGivenForYou + '<li templateId="6" sharedId=' + response.DashboardFeedback.FeedbackGivenUsers[j].User.UserId + ' mappingid=' + response.DashboardFeedback.FeedbackGivenUsers[j].UserPOEMappingId + '><a class="showtooltip" title="' + response.DashboardFeedback.FeedbackGivenUsers[j].User.FirstName + " " + response.DashboardFeedback.FeedbackGivenUsers[j].User.LastName + '"><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardFeedback.FeedbackGivenUsers[j].User.UserId + '&rnd=' + Math.random() + '" /></a></li>';
            }
            feedbackGivenForYou = dashboard.LoadEmptyUsers(response.DashboardFeedback.FeedbackGivenUsers.length, feedbackGivenForYou);
            feedbackHtml = feedbackHtml + feedbackGivenForYou + '</ul></div></div></div><div class="tileContent" onclick="redirectSyncPagesNew(2)"><h2>' + response.DashboardFeedback.FeedbackGiven + '</h2><p>Given by You</p></div>' +
                '<div class="tileIcon"><img src="../../Images/dashboard/fbGiven.png" /></div></div></div>';
            $('.feekbackModel').html(feedbackHtml);
            //jQuery('.first-and-second-carousel').jcarousel();
        } else {
            var feedbackHtml = '<div class="fbFrist"><div class="fbBox1"><div class="tileContent"><h2>' + response.DashboardFeedback.FeedbackTaken + '</h2><p>Taken by You</p></div><div class="tileIcon">' +
                             '<img src="../../Images/dashboard/fbtaken.png" /></div></div><div class="fbBox2 "><div class="slider"><ul id="Ul1" class="first-and-second-carousel jcarousel-skin-tango">';
            var feedbackReceiveForYou = '';

            feedbackReceiveForYou = dashboard.LoadEmptyUsers(response.DashboardFeedback.FeedbackReceivedUsers.length, feedbackReceiveForYou);

            feedbackHtml = feedbackHtml + feedbackReceiveForYou + '</ul></div><div class="tileContent"><h2>' + response.DashboardFeedback.FeedbackReceived + '</h2><p>Received for You</p></div>' +
                '<div class="tileIcon"><img src="../../Images/dashboard/fbReceived.png" />' +
                '</div></div></div><div class="fbCenter"><img src="../../Images/dashboard/fbline.png" /></div>' +
                '<div class="fbLast"><div class="storiesOthers"><div class="tileslider"><div class="tileslider">' +
                '<div class="slider"><ul id="Ul2" class="first-and-second-carousel jcarousel-skin-tango">';
            var feedbackGivenForYou = '';

            feedbackGivenForYou = dashboard.LoadEmptyUsers(response.DashboardFeedback.FeedbackGivenUsers.length, feedbackGivenForYou);
            feedbackHtml = feedbackHtml + feedbackGivenForYou + '</ul></div></div></div><div class="tileContent"><h2>' + response.DashboardFeedback.FeedbackGiven + '</h2><p>Given by You</p></div>' +
                '<div class="tileIcon"><img src="../../Images/dashboard/fbGiven.png" /></div></div></div>';
            $('.feekbackModel').html(feedbackHtml);
            //jQuery('.first-and-second-carousel').jcarousel();
        }
    },
    LoadIndividualPathfindersCount: function (options, id) {
        Common.ajax({
            url: options.url,
            data: options.data,
            success: function (response) {
                $('#pathfinderUserCount' + id).html(response);
            },
            error: function (err) {
                //$('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },
    loadPoeName: function () {
        Common.ajaxsync({
            url: "../../Common/GetPoeName",
            // data: option.data,
            success: function (response) {
                $('#selectedpoe').val(response);
            },
            error: function (err) {
                // window.location = "../Home/ErrorMsg";
            }
        });
    }
};

function redirectStanding(page) {
    window.location = "/Standing/BigPicture?type=2&mode=" + page;
}
function redirectFeedback(mode) {
    window.location = "/Feedback/Feedback?mode=" + mode;
}
function redirectWall() {
    window.location = "/wall/index/1";
}

function redirectSync() {
    window.location = "/Sync/BigPicture";
}

function redirectSyncPages(mode) {
    Common.ajax({
        url: "../../Dashboard/RedirectTake",
        data: { 'mode': mode },
        success: function (response) {
            window.location = "/Sync/BigPicture";
        },
        error: function (err) {
        }
    });
    //window.location = "/Sync/BigPicture";
}
function redirectSyncPagesNew(mode) {
    var mappingid = parseInt($('#mappingids').val());
    Common.ajax({
        url: "../../Dashboard/RedirectTakeNew",
        data: { 'mode': mode, 'mappingid': mappingid },
        success: function (response) {
            window.location = "/Sync/BigPicture";
        },
        error: function (err) {
        }
    });
    //window.location = "/Sync/BigPicture";
}