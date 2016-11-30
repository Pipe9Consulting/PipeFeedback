$(function () {
    //$('.dbContentArea').hide();
    $('.startToggle').hide();
    $('.dbpoeList').hide();
    $('.pane').find('input[type=radio]:checked').removeAttr('checked');
    $("#n" + $(this).context.title).attr('checked', 'checked');
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/dashboard/dashboard_icon_h.png');
    $('.bukatutup').hide();

    
    $(document).click(function (event) {
       
        if ($(event.target).parents().index($('.walldropdown')) == -1) {
            //var X = $('.walldropdown').attr('id');
            //var X = $('.dropdown .dropdown-menu li.selected').attr('value');
            //if (X >= 1) {
                $('.dropdown-menu').toggleClass('hide');
                //$('.walldropdown').attr('id', '0');
                //$('.walldropdown p').removeClass("legendwn");
                $('.dropdown-menu').removeClass('show');
            //}
        }
    });
    //debugger;
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");


    dashboard.LoadPoeList();
   

   
    $('#poeListItems>li').live('click', function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        $('#poeListItems>li').removeClass('selected');
        $(this).addClass('selected');
        $('.dropdown-menu').toggleClass('hide');
        $('.dropdown a span:first').html($(this).find('span').html());
        $('.dropdown a img:first').attr('src', $(this).find('img').attr('src'));
        $('.poeimg').html($(this).find('.icon').html());
        //$(".dropdown>ul").slideUp();
        //$('.dbpoeList').attr('id', '0');
        //$('.dbpoeList p').removeClass("legendwn");
        $('#poeId').val($(this).attr('value'));
        $('.icon-arrow').removeClass('open'); $('.icon-arrow').addClass('close');
        $('.dropdown-menu').removeClass('show');
     
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

    //$('#yourPathfinders').live('click', function () {
    //    dashboard.LoadYourPathfinderByPagination(1, 0); //here 1 is for your pathfinders and 0 is page
    //});

    //$('#pathfindersForYou').live('click', function () {
    //    dashboard.LoadYourPathfinderByPagination(2, 0); //here 2 is for your pathfinders and 0 is page
    //});


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

    $('.recognitionOthers').live('mouseover', function () {
        var imgHover = $(this).find('.tileIcon img').attr('class');
        $(this).find('.tileIcon img').attr('src', '../../Images/icons/' + imgHover + 'h.png')

    });


    $('.recognitionOthers').live('mouseout', function () {
        var imgHover = $(this).find('.tileIcon img').attr('class');
        $(this).find('.tileIcon img').attr('src', '../../Images/icons/' + imgHover + '.png')
     

    });

    //$('#Ul8>li').live('click', function () {
    //    if (!$(this).find('img').hasClass('emptyUserTile')) {
    //        options = { url: '../../Dashboard/GetRecognitionCount', data: { 'sharedid': $(this).attr('sharedId'), 'type': 2 } };
    //        $(this).parents('ul').find('span').removeClass('slidecontentselect');
    //        $(this).find('img').before('<span class="slidecontentselect"></span>');
    //        dashboard.GetRecognitionCount(options);
    //    }
    //});

    //$('#pathFindersForYou').live('click', function () {
    //    //$('.content:last').addClass('active');
    //    //$(this).removeClass('active');
     

    //});



});

var dashboard = {
    LoadPoeList: function () {
        Common.ajax({
            url: '../../Common/GetNetworkSubscribedPoes',
            success: function (response) {
                var html = "<ul> <li class='dropdown' ><a  href='#' data-toggle='dropdown'><img   class='img' src='../../Images/" + response[0].POEName.replace("&", "") + "_Intro.png' alt='" + response[0].POEName + "' ><span class='selectedpoename'>" + response[0].POEName + "</span><i class='icon-arrow'></i></a><ul  class='dropdown-menu' id='poeListItems'>";
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
                    html = html + " <li id ='poeli" + response[i].POEId + "' class='" + selectedClass + "' value=" + response[i].POEId + " ><a href='#'><img src='../../Images/" + response[i].POEName.replace("&", "") + "_Intro.png' alt='" + response[i].POEName + "' class='img' /> <span>" + response[i].POEName + "</span></a></li>";
                    //poeids = poeids + response[i].POEId + '%';
              
                }
                $('.walldropdown').html(html + '</ul>');           
            
                    dashboard.loaddropdown();
           
                if (selectedPoE != 0) {
                    $('.dbpoeList li').siblings().removeClass("selected");
                    $('#poeli' + selectedPoE).addClass("selected");
                    $('.selectedpoename').text($('#poeli' + selectedPoE).find('span').text());
                    var imgPoe = $('#poeli' + selectedPoE).find('img').attr('src');

                    $('.dropdown a:first').find('img').attr('src', '' + $('#poeli' + selectedPoE).find('img').attr('src') + '')
                //       var poeSrc = $('.dropdown li.selected').find('img').attr('src');
                //$('.dropdown a:first').find('img').attr('src', ''+poeSrc+'');
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
                $('.dbgoals').find('.goalsshared .dbInnerLeft h2').html(response);
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
                $('.dbstanding').find('.dbBoxtop .yourStanding .dbInnerLeft h2').html(response);
                $('.dbstanding').find('.dbBoxtop .yourStanding .dbInnerLeft h2').html(response - parseInt($('#latestSelfScore').val()));
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
                    $('.dbrecognition').find('.recognizedYou .dbInnerLeft h2').html(response);
                } else {
                    $('.dbrecognition').find('.recognitionOtherz .dbInnerLeft h2').html(response);
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
                $('.dbfeedback').find('.dbBoxtop .recived .dbInnerLeft h2').html(response);
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
                $('.dbfeedback').find('.dbBoxtop .given .dbInnerLeft h2').html(response);

            },
            error: function (err) {
                //$('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },
    LoadDashBoard: function (options) {
        //debugger;
        Common.ajax({
            url: options.url,
            data: options.data,
            success: function (response) {
                //debugger;
                // Load goals
                dashboard.loadPoeName();
                if (response.DashboardGoal != null) {
                    var goalHtml = '<div class="dbBoxtop"><div class="dbInnerBox goalscompleted"><div class="dbInnerLeft"><h2>' + response.DashboardGoal.GoalsCompleted + '</h2><p>Goals Completed</p></div></div>' +
                        ' <div class="dbInnerBox goalsshared">' +
                        '<div class="slider"><ul id="Ul6" class="first-and-second-carousel jcarousel-skin-tango">';
                    var goalUsersHtml = '';
                    for (var i = 0; i < response.DashboardGoal.GoalUsers.length > 0; i++) {
                        goalUsersHtml = goalUsersHtml + '<li templateId="1" sharedId=' + response.DashboardGoal.GoalUsers[i].UserId + '><a class="showtooltip" title="' + response.DashboardGoal.GoalUsers[i].Name + '"><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardGoal.GoalUsers[i].UserId + '&rnd=' + Math.random() + '" width="75" height="75" alt="" /></a></li>';
                    }
                    switch (response.DashboardGoal.GoalUsers.length) {
                        case 0:
                            goalUsersHtml = goalUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" /></li>';
                            break;
                        case 1:
                            goalUsersHtml = goalUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li>';
                            break;
                        case 2:
                            goalUsersHtml = goalUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li>';
                            break;
                        default:
                            goalUsersHtml = goalUsersHtml;
                            break;
                    }
                    goalHtml = goalHtml + goalUsersHtml + '</ul></div>' + '<div class="dbInnerLeft"><h2>' + response.DashboardGoal.GoalsShared + '' +
                        '</h2><p>Goals Shared</p></div></div><div class="dbInnerBox goalsdelayed">   <div class="dbInnerLeft">' ;
                       
                    goalHtml = goalHtml + '<h2>' + response.DashboardGoal.GoalsDelayed + '</h2><p>Goals Delayed</p></div></div>' +
                        '<div class="dbInnerBox goalsset"><div class="dbInnerLeft">' +
                        '<h2>' + response.DashboardGoal.GoalsSet + '</h2><p>Goals Set</p></div></div></div><div class="dbBoxBottom"> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text.</p><h1>Development Priorities <span class="storiesIcon"> <img src="../../Images/images/dbgoalsIcon.png" alt="Goals" border="0" /></span></h1></div><div class="dbarrow"></div>';

                    $('.dbgoals').html(goalHtml);
                    $('.first-and-second-carousel').jcarousel();
                } else {
                    var goalHtml = '<div class="dbBoxtop"><div class="dbInnerBox goalscompleted"><div class="dbInnerLeft"><h2>' + 0 + '</h2><p>Goals Completed</p></div></div>' +
                        '<div class="dbInnerBox goalsshared"><div class="slider"><ul id="Ul8" class="first-and-second-carousel jcarousel-skin-tango">';
                    
                    var goalUsersHtml = '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" /></li>';
                    //for (var i = 0; i < response.DashboardGoal.GoalUsers.length > 0; i++) {
                    //    usersHtml = usersHtml + '<li><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardGoal.GoalUsers[i].UserId + '&rnd=' + Math.random() + '" /></li>';
                    //}
                    goalHtml = goalHtml + goalUsersHtml + '</ul></div>' + '<div class="dbInnerLeft"><h2>' + 0 + '' +
                        '</h2><p>Goals Shared</p></div></div><div class="dbInnerBox goalsdelayed">   <div class="dbInnerLeft">';

                    goalHtml = goalHtml + '<h2>' + 0 + '</h2><p>Goals Set</p></div></div></div><div class="dbBoxBottom"> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text.</p><h1>Goals <span class="storiesIcon"> <img src="../../Images/images/dbgoalsIcon.png" alt="Goals" border="0" /></span></h1></div><div class="dbarrow"></div>';
                        

                    $('.dbgoals').html(goalHtml);
                    //jQuery('.first-and-second-carousel').jcarousel();
                    $('.first-and-second-carousel').jcarousel();
                }
                //debugger;
                //Load Standing
                if (response.DashboardStanding != null) {
                    //debugger;
                    $('#latestSelfScore').val(response.DashboardStanding.ManagerSync);
                    var managerSyncValue = response.DashboardStanding.YourStanding - response.DashboardStanding.ManagerSync;
                    var standingHtml = '<div class="dbBoxtop"><div class="dbInnerBox yourStanding"><div class="dbInnerLeft"'
                        ;
                    var standingUsersHtml = '';
                    var selectedclass = "";
                    var managerid = 0;
                    var mappingids = 0;
                 

                    var yourCommunity = response.DashboardStanding.YourComunity;
                    var yourTeam = response.DashboardStanding.YourTeam;
                    standingHtml = standingHtml + 'onclick="redirectSync()"><h2>' + response.DashboardStanding.YourStanding + '</h2><p>Your Sync</p></div></div>' +
                        '  <div class="dbInnerBox community">  <div class="dbInnerLeft" onclick="redirectStanding(1)"><h2>' + (yourCommunity >= 0 ? '+' + yourCommunity : yourCommunity) + '</h2><p>Community Sync</p></div></div>' +
                        '   <div class="dbInnerBox team">  <div class="dbInnerLeft" onclick="redirectStanding(2)"><h2>' + (yourTeam >= 0 ? '+' + yourTeam : yourTeam) + '</h2><p>Team Sync</p></div></div>  <div class="dbInnerBox managersync">  <div class="slider">  ' +
                        '<ul id="Ul3" class="first-and-second-carousel jcarousel-skin-tango">';
                      
                    
                    for (var s = 0; s < response.DashboardStanding.StandingUsers.length > 0; s++) {
                        managerid = response.DashboardStanding.StandingUsers[0].UserId;
                        mappingids = response.DashboardStanding.StandingUsers[0].MappingId;

                        standingUsersHtml = standingUsersHtml + '<li templateId="2" sharedId=' + response.DashboardStanding.StandingUsers[s].UserId + ' mappingid=' + response.DashboardStanding.StandingUsers[s].MappingId + '><a class="showtooltip" title="' + response.DashboardStanding.StandingUsers[s].Name + '"><span class=' + (s == 0 ? 'slidecontentselect' : '') + '></span><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardStanding.StandingUsers[s].UserId + '&rnd=' + Math.random() + '" /></a></li>';
                    }
                    switch (response.DashboardStanding.StandingUsers.length) {
                        case 0:
                            standingUsersHtml = standingUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" width="75" height="75" alt="" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" width="75" height="75" alt=""/></li><li><img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" width="75" height="75" alt=""/></li>';
                            break;
                        case 1:
                            standingUsersHtml = standingUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" width="75" height="75" alt=""/></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" width="75" height="75" alt=""/></li>';
                            break;
                        case 2:
                            standingUsersHtml = standingUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" width="75" height="75" alt=""/></li>';
                            break;
                        default:
                            standingUsersHtml = standingUsersHtml;
                            break;
                    }
                    standingHtml = standingHtml  +  standingUsersHtml  + '   </ul>  </div> <div class="dbInnerLeft" onclick="redirectSync()"><h2>' + ((managerSyncValue) >= 0 ? '+' + managerSyncValue : managerSyncValue) + '</h2><p>Manager Sync</p> </div> </div> </div><div class="dbBoxBottom"> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text.</p>  <h1>Sync <span class="storiesIcon"> <img src="../../Images/images/dbstandingIcon.png" alt="Stories Icon" border="0" /></span></h1></div>	<div class="dbarrow"></div>  </div>';
                        //'<div class="tileIcon"><img src="../../Images/dashboard/sCommunitiy.png" /></div></div><div class="standingtile3 yourteam" onclick="redirectStanding(2)"><div class="tileContent">' +
                        //'<h2>' + (yourTeam >= 0 ? '+' + yourTeam : yourTeam) + '</h2><p>Team Sync</p></div><div class="tileIcon"><img src="../../Images/dashboard/sTeam.png" /></div></div></div>';

                    $('.dbstanding').html(standingHtml);
                    //jQuery('.first-and-second-carousel').jcarousel();
                    $('.first-and-second-carousel').jcarousel();
                }  
                // else {
                //    var standingHtml = '<div class="SMFrist"><div class="standingtile1"><div class="tileContent"><h2>+0</h2><p>Your Tenure</p>' +
                //        '</div><div class="tileIcon"><img src="../../Images/dashboard/stenure.png" /></div></div><div class="standingtile2">' +
                //        '<div class="tileslider"><div class="slider"><ul id="Ul3" class="first-and-second-carousel jcarousel-skin-tango">';
                //    var standingUsersHtml = '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li><li><img src=""  class="emptyUserTile" /></li>';

                //    standingHtml = standingHtml + standingUsersHtml + '</ul></div></div><div class="tileContent"><h2>0</h2><p>Your Standing</p></div><div class="tileIcon">' +
                //        '<img src="../../Images/dashboard/sStanding.png" /></div></div></div><div class="SMCenter"><img src="../../Images/dashboard/StandingLine.png" /></div>';

                //    standingHtml = standingHtml + '<div class="SMLast"><div class="standingtile1"><div class="tileContent"><h2>+0</h2><p>Community Sync</p></div>' +
                //        '<div class="tileIcon"><img src="../../Images/dashboard/sCommunitiy.png" /></div></div><div class="standingtile3"><div class="tileContent">' +
                //        '<h2>+0</h2><p>Team Sync</p></div><div class="tileIcon"><img src="../../Images/dashboard/sTeam.png" /></div></div></div>';

                //    $('.StandingModel').html(standingHtml);
                //    //jQuery('.first-and-second-carousel').jcarousel();
                    //}
                else {
                    var standingHtml = '<div class="dbBoxtop"><div class="dbInnerBox yourStanding"><div class="dbInnerLeft"><h2>+0</h2><p>Your Sync</p>' +
                        '</div></div>' 
                        ;
                  //  var standingUsersHtml = '<li><img src="" class="emptyUserTile" /></li><li><img src="" class="emptyUserTile" /></li><li><img src=""  class="emptyUserTile" /></li>';

                    standingHtml = standingHtml + '<div class="dbInnerBox community"><div class="dbInnerLeft"><h2>0</h2><p>Community Sync</p></div></div> <div class="dbInnerBox team">' +
                        '<div class="dbInnerLeft"><h2>0</h2><p>Team Sync</p>    </div>  </div>';

                    standingHtml = standingHtml + '<div class="dbInnerBox managersync">   <div class="slider">  <ul id="Ul3" class="first-and-second-carousel jcarousel-skin-tango">     </ul>' +
                        '      </div>    <div class="dbInnerLeft"><h2>+0</h2><p>Manager Sync</p></div></div></div><div class="dbBoxBottom"> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text.</p>  <h1>Sync <span class="storiesIcon"> <img src="../../Images/images/dbstandingIcon.png" alt="Stories Icon" border="0" /></span></h1></div>	<div class="dbarrow"></div>  </div>';

                    $('.dbstanding').html(standingHtml);
                    $('.first-and-second-carousel').jcarousel();
                }
                //debugger;
                //Load Dashboard Recognition
                if (response.DashboardRecognition != null) {
                    var recognitionHtml = '<div class="dbBoxtop"><div class="dbInnerBox recognitionOtherz"><div class="slider"><ul id="Ul7" class="first-and-second-carousel jcarousel-skin-tango">';
                    //RecognitionOthersUser
                    var recognitionUsersHtml = '';

                    for (var r = 0; r < response.DashboardRecognition.RecognitionOthersUser.length > 0; r++) {
                        recognitionUsersHtml = recognitionUsersHtml + '<li templateId="3" type="1" sharedId=' + response.DashboardRecognition.RecognitionOthersUser[r].UserId + '><a class="showtooltip" title="' + response.DashboardRecognition.RecognitionOthersUser[r].Name + '"><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardRecognition.RecognitionOthersUser[r].UserId + '&rnd=' + Math.random() + '"  width="75" height="75" alt=""/></a></li>';
                    }

                    switch (response.DashboardRecognition.RecognitionOthersUser.length) {
                        case 0:
                            recognitionUsersHtml = recognitionUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" /></li>';
                            break;
                        case 1:
                            recognitionUsersHtml = recognitionUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li>';
                            break;
                        case 2:
                            recognitionUsersHtml = recognitionUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li>';
                            break;
                        default:
                            recognitionUsersHtml = recognitionUsersHtml;
                            break;
                    }

                    recognitionHtml = recognitionHtml + recognitionUsersHtml + '</ul></div><div class="dbInnerLeft" onclick="redirectWall()"><h2>' + response.DashboardRecognition.RecognitionOthers + '</h2><p>Recognition from Others</p></div></div><div class="dbInnerBox recognizedYou">';
                       

                    recognitionHtml = recognitionHtml + '<div class="slider">' +
                        '<ul id="Ul8" class="first-and-second-carousel jcarousel-skin-tango">';
                    //RecognitionYouUsers
                    recognitionUsersHtml = '';

                    for (var r1 = 0; r1 < response.DashboardRecognition.RecognitionYouUsers.length > 0; r1++) {
                        recognitionUsersHtml = recognitionUsersHtml + '<li templateId="4" type="2" sharedId=' + response.DashboardRecognition.RecognitionYouUsers[r1].UserId + '><a class="showtooltip" title="' + response.DashboardRecognition.RecognitionYouUsers[r1].Name + '"><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardRecognition.RecognitionYouUsers[r1].UserId + '&rnd=' + Math.random() + '" width="75" height="75" alt="" /></a></li>';
                    }

                    switch (response.DashboardRecognition.RecognitionYouUsers.length) {
                        case 0:
                            recognitionUsersHtml = recognitionUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" /></li>';
                            break;
                        case 1:
                            recognitionUsersHtml = recognitionUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li>';
                            break;
                        case 2:
                            recognitionUsersHtml = recognitionUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li>';
                            break;
                        default:
                            recognitionUsersHtml = recognitionUsersHtml;
                            break;
                    }

                    recognitionHtml = recognitionHtml + recognitionUsersHtml + '</ul></div><div class="dbInnerLeft"><h2>' + response.DashboardRecognition.RecognitionYou + '</h2><p>Recognized by You</p></div></div></div> <div class="dbBoxBottom">     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text.</p>' +
                        '  <h1>Recognition <span class="storiesIcon"><img src="../../Images/images/dbrecognitionIcon.png" alt="Recognition" border="0" /></span></h1></div><div class="dbarrow"></div><div class="storiesHide"></div>';

                    $('.dbrecognition').html(recognitionHtml);
                    $('.first-and-second-carousel').jcarousel(); 
                    var stories = '<div class="dbBoxtop">  <div class="dbInnerBox read"><div class="dbInnerLeft"><h2>0</h2>  <p>Read by You</p> </div> </div> <div class="dbInnerBox shared">  <div class="dbInnerLeft"> <h2>0</h2>' +
 '  <p>Shared By You</p> </div> </div>  <div class="dbInnerBox post"> <div class="slider">  <ul id="first-carousel" class="first-and-second-carousel jcarousel-skin-tango"> <li> <img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" width="75" height="75" alt="" /></li>' +
 ' <li> <img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" width="75" height="75" alt="" /></li>  <li> <img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" width="75" height="75" alt="" /></li> <li>  <img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" width="75" height="75" alt="" /></li>' +
 '   <li><img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" width="75" height="75" alt="" /></li>  <li> <img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" width="75" height="75" alt="" /></li>  <li> <img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" width="75" height="75" alt="" /></li>' +
 '  </ul> </div>  <div class="dbInnerLeft"><h2>0</h2><p>Posted By Others</p> </div> </div></div>  <div class="dbBoxBottom"> <p>Coming Soon</p> <h1>Stories <span class="storiesIcon"> <img src="../../Images/images/dbstoriesIcon.png" alt="Stories Icon" border="0" /></span></h1> </div>  <div class="dbarrow"></div><div class="storeiesHide"></div>';

                    $('.dbstories').html(stories);
                    $('.first-and-second-carousel').jcarousel();
                    $('.dbstories').show();
                    $('.dbfeedback').show();
                    $('.dbstanding').show();
                    $('.dbmentors').show();
                    $('.dbgoals').show();
                    $('.walldropdown').show();
                    $('.dbrecognition').show();


                    $('.dbline').show();

                 
                
                    //jQuery('.first-and-second-carousel').jcarousel();
                } else {
                    var recognitionHtml = '<div class="dbBoxtop"><div class="dbInnerBox recognitionOtherz"><div class="slider"><ul id="Ul7" class="first-and-second-carousel jcarousel-skin-tango">';
                    //RecognitionOthersUser
                    var recognitionUsersHtml = '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" /></li>';

                    recognitionHtml = recognitionHtml + recognitionUsersHtml + '</ul></div><div class="dbInnerLeft"><h2>0</h2><p>Recognition from Others</p></div></div> <div class="dbInnerBox recognizedYou">';

                    recognitionHtml = recognitionHtml + '<ul id="Ul10" class="first-and-second-carousel jcarousel-skin-tango">';
                    
                    //RecognitionYouUsers
                    recognitionUsersHtml = '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" /></li>';

                    recognitionHtml = recognitionHtml + recognitionUsersHtml + '</ul></div><div class="dbInnerLeft"><h2>0</h2><p>Recognized by You</p></div></div></div><div class="dbBoxBottom"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text.</p>' +
                        '  <h1>Recognition <span class="storiesIcon"><img src="../../Images/images/dbrecognitionIcon.png" alt="Recognition" border="0" /></span></h1>  </div><div class="dbarrow"></div>';

                    $('.dbrecognition').html(recognitionHtml);
                    $('.first-and-second-carousel').jcarousel();

                    var stories = '<div class="dbBoxtop">  <div class="dbInnerBox read"><div class="dbInnerLeft"><h2>0</h2>  <p>Read by You</p> </div> </div> <div class="dbInnerBox shared">  <div class="dbInnerLeft"> <h2>0</h2>' +
  '  <p>Shared By You</p> </div> </div>  <div class="dbInnerBox post"> <div class="slider">  <ul id="first-carousel" class="first-and-second-carousel jcarousel-skin-tango"> <li> <img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" width="75" height="75" alt="" /></li>' +
  ' <li> <img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" width="75" height="75" alt="" /></li>  <li> <img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" width="75" height="75" alt="" /></li> <li>  <img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" width="75" height="75" alt="" /></li>' +
  '   <li><img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" width="75" height="75" alt="" /></li>  <li> <img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" width="75" height="75" alt="" /></li>  <li> <img src=""  class="emptyUserTile" width="75" height="75" alt="" /></li>' +
  '  </ul> </div>  <div class="dbInnerLeft"><h2>0</h2><p>Posted By Others</p> </div> </div></div>  <div class="dbBoxBottom"> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text.</p> <h1>Stories <span class="storiesIcon"> <img src="../../Images/images/dbstoriesIcon.png" alt="Stories Icon" border="0" /></span></h1> </div>  <div class="dbarrow"></div>';

                    $('.dbstories').html(stories);
                    $('.first-and-second-carousel').jcarousel();
                    $('.dbstories').show();
                    $('.dbfeedback').show();
                    $('.dbstanding').show();
                    $('.dbmentors').show();
                    $('.dbgoals').show();
                    $('.walldropdown').show();
                    $('.dbrecognition').show();
                    $('.dbline').show();
                    
                    //jQuery('.first-and-second-carousel').jcarousel();
                }

                //Your Pathfinders
                //dashboard.LoadYourPathfinders(response, 0, 2);
                //Load Feedback

                dashboard.LoadFeedback(response);
                if (managerid != 0) {
                    var options = { url: '../../Dashboard/GetIndividualStandingScore', data: { 'managerId': managerid, 'mappingid': mappingids } };
                    dashboard.GetManagerScore(options);
                }
                //$(".showtooltipn").tooltip({
                //    show: {
                //        effect: "explode",
                //        delay: 250
                //    }
                //});
                //jQuery('.first-and-second-carousel').jcarousel();
                // $('.first-and-second-carousel').jcarousel();
                var pathfinders_final_html = dashboard.LoadYourPathfinders(response, 0, 1);// here 1 is youe path finders
                pathfinders_final_html = pathfinders_final_html + dashboard.LoadYourPathfinderByPagination(2, 0);
                //pathfinders_final_html = pathfinders_final_html + dashboard.LoadYourPathfinderByPagination(2, 0);
                $('.dbmentors').html(pathfinders_final_html);
                $('.first-and-second-carousel').jcarousel();
                //$('.ui.accordion').accordion();
                //alert($('#yourPathfinders').length);
                $('#yourPathfinders').next().find('.pagination a').click(function () {
                    //alert('2');
                    //alert($(this).attr('selectedpage'));
                    //dashboard.LoadYourPathfinderByPagination(parseInt($(this).attr('type')), parseInt($(this).attr('selectedpage'))); //here 1 is for your pathfinders
                    $('#yourPathfinders').next().find('.recognitionOthers').hide();
                    $('#yourPathfinders').next().find('.practiceareaset' + $(this).text()).show();
                    $('#yourPathfinders').next().find('.pagination a').removeClass('selected');
                    $(this).addClass('selected');
                });
                
                $('#pathFindersForYou').next().find('.pagination a').click(function () {
                    //alert($(this).attr('selectedpage'));
                    //dashboard.LoadYourPathfinderByPagination(parseInt($(this).attr('type')), parseInt($(this).attr('selectedpage'))); //here 1 is for your pathfinders
                    $('#pathFindersForYou').next().find('.recognitionOthers').hide();
                    $('#pathFindersForYou').next().find('.practiceareaset' + $(this).text()).show();
                    $('#pathFindersForYou').next().find('.pagination a').removeClass('selected');
                    $(this).addClass('selected');
                });
                $('#yourPathfinders,#pathFindersForYou').next().find('.recognitionOthers').hide();
                $('.practiceareaset1').show();
                $('#yourPathfinders').next().find('.pagination a:first').addClass('selected');
                $('#pathFindersForYou').next().find('.pagination a:first').addClass('selected');
                
                $('#pathFindersForYou').click();
                $('div#pathFindersForYou div.dbInnerarrow').hide();

                $('#pathFindersForYou').click(function () {
                    //if ($('#pathFindersForYou').hasClass('activeyellow') == true) {
                    //    $('#yourPathfinders').click();
                    //}
                    
                    if (!$(this).next('div').hasClass('opened')) {
                        $(this).next('div').slideToggle('slow', function() {
                            $(this).toggleClass('opened');
                            $(this).css('overflow', 'visible');
                        });
                        $('#yourPathfinders').next('div').slideToggle();
                       // $('#yourPathfinders').next('div').css('overflow','visible');
                        $('#yourPathfinders').next('div').removeClass('opened');
                        $('#yourPathfinders').next('div').removeClass('opened');
                        $('div#yourPathfinders div.dbInnerarrow').hide();
                        $('div#pathFindersForYou div.dbInnerarrow').show();
                        $('.dbInnerarrow').addClass('dbInnerarrow');
                        $('#yourPathfinders').removeClass('activeyellow');
                        $(this).addClass('activeyellow');
                    }

                });
                $('#pathFindersForYou').next('div').hide();
                $('#yourPathfinders').next('div').addClass('opened');

                $('#yourPathfinders').click(function () {
                    //if ($('#yourPathfinders').hasClass('activeyellow') == true)
                    //{
                    //    $('#pathFindersForYou').click();                        

                    //}
                    // alert($(this).next('div').length);
                    //alert($(this).next('div').hasClass('opened'));
                    if (!$(this).next('div').hasClass('opened')) {
                        $(this).next('div').slideToggle('slow', function() {
                            $(this).toggleClass('opened');
                            $(this).css('overflow', 'visible');
                        });
                        $('#pathFindersForYou').next('div').slideToggle();
                        $('#pathFindersForYou').next('div').removeClass('opened');
                        $('div#pathFindersForYou div.dbInnerarrow').hide();
                        $('div#yourPathfinders div.dbInnerarrow').show();
                        $('#pathFindersForYou').removeClass('activeyellow');
                        $(this).addClass('activeyellow');
                    }
                });
               
               

            },
            error: function (err) {
                //$('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },
    LoadEmptyUsers: function (length, pathFindersUsersHtml) {
        switch (length) {
            case 0:
                pathFindersUsersHtml = pathFindersUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" /></li>';
                break;
            case 1:
                pathFindersUsersHtml = pathFindersUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li>';
                break;
            case 2:
                pathFindersUsersHtml = pathFindersUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li>';
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
                pathFindersUsersHtml = pathFindersUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" /></li>';
                break;
            case 1:
                pathFindersUsersHtml = pathFindersUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li>';
                break;
            case 2:
                pathFindersUsersHtml = pathFindersUsersHtml + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li>';
                break;
            default:
                pathFindersUsersHtml = pathFindersUsersHtml;
                break;
        }
        return pathFindersUsersHtml;
    },
    loadControls: function () {

        $('.first-and-second-carousel').jcarousel();
    },
    LoadYourPathfinders: function (response, page, type) {

        //Load Dashboard PathFinders
        //debugger;
        if (response.DashboardPathFinders.YourPathfinders.length > 0) {
        
            //RecognitionOthersUser
            var pathFindersHtml = '';
            if (type == 2) {
                pathFindersHtml = pathFindersHtml + '<div id="pathFindersForYou" class="title"><div class="dbInnerBox yourmentors"> <div class="dbInnerLeft"><h2>' + response.DashboardPathFinders.PathfindersForYouCount + '</h2><p>Your Mentees</p></div><div class="dbInnerarrow"></div> </div> </div> ';
            }
            else{
                pathFindersHtml = pathFindersHtml + '<div class="dbBoxtop"><div class="ui styled"><div id="yourPathfinders" class="active title activeyellow"><div class="dbInnerBox yourmentors"><div class="dbInnerLeft"><h2>' + response.DashboardPathFinders.YourPathfindersCount + '</h2><p>Your Mentors</p></div><div class="dbInnerarrow"></div>   </div>   </div>';
            }

            var p = page;
            var totalModules = response.DashboardPathFinders.ModulesCount;
            var pathfindersPA = response.DashboardPathFinders.YourPathfinders.length;
            var pagination = Math.ceil(totalModules / 2);
            var noofOccurences = (2 * pagination);
            for (; p < noofOccurences > 0; p++) {
                //debugger;

                if (pathfindersPA > p) {
               
                    pathFindersHtml = pathFindersHtml + '<div class="active content">';
                    var struser1 = '';
                    if (response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers[0].UserId != 0) {
                        for (var j = 0; j < noofOccurences / 2; j++) {
                            for (var i = 0; i < 2; i++) {
                                var img = $('#selectedpoe').val() + (p + 1);
                                pathFindersHtml = pathFindersHtml + '<div class="dbInnerBox recognitionOthers practiceareaset' + (j + 1) + '">' +
                                    '<div class="slider">' +
                                    '<ul id="Ul4" class="first-and-second-carousel jcarousel-skin-tango">';
                                for (var sub = 0; sub < response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers.length; sub++) {
                                    struser1 = struser1 + '<li type="' + type + '" id="' + p + '" moduleId="' + response.DashboardPathFinders.YourPathfinders[p].ModuleId + '" userId="' + response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers[sub].UserId + '"><a class="showtooltip" title="' + response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers[sub].Name + '"><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers[sub].UserId + '&rnd=' + Math.random() + '" width="75" height="75" alt="" /></a></li>';
                                }
                                struser1 = dashboard.LoadEmptyPathfindersUsers(response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers.length, struser1);
                                pathFindersHtml = pathFindersHtml + struser1 + '</ul></div><div class="dbInnerLeft"><h2 id="pathfinderUserCount' + p + '">' + response.DashboardPathFinders.YourPathfinders[p].PracticeAreaCount + '</h2><div class="tileIcon"><img class=' + img + ' src="../../Images/icons/' + img + '.png" /></div><div style="clear:both"></div><p>' + response.DashboardPathFinders.YourPathfinders[p].PracticeAreaName + '</p></div></div>';
                                p = p + 1;
                                struser1 = "";
                           
                            }
                        }
                    } else {
                        //struser1 = dashboard.LoadEmptyPathfindersUsers(0, struser1);
                      

                        for (var e = 0; e < noofOccurences / 2; e++) {
                            for (var s = 0; s < 2; s++) {
                                var img = $('#selectedpoe').val() + (p + 1);
                                if (response.DashboardPathFinders.YourPathfinders[p] != undefined)
                                {
                                pathFindersHtml = pathFindersHtml + '<div class="dbInnerBox recognitionOthers practiceareaset' + (e + 1) + '">' +
                                    '<div class="slider">' +
                                    '<ul id="Ul4" class="first-and-second-carousel jcarousel-skin-tango">';
                                struser1 = struser1 + '<li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg" class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" /></li><li><img src="../../Images/dashboard/noimgBg.jpg"  class="emptyUserTile" /></li>';
                                //struser1 = dashboard.LoadEmptyPathfindersUsers(response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers.length, struser1);
                                pathFindersHtml = pathFindersHtml + struser1 + '</ul></div><div class="dbInnerLeft"><h2 id="pathfinderUserCount' + p + '">  0  </h2><div class="tileIcon"><img class=' + img + ' src="../../Images/icons/' + img + '.png" /></div><div style="clear:both"></div><p>' + response.DashboardPathFinders.YourPathfinders[p].PracticeAreaName + '</p></div></div>';
                                p = p + 1;
                                struser1 = "";         
                                }
                        }
                        }
                    }
                    //$('.first-and-second-carousel').jcarousel();
                    //debugger;
                } else {
                    var img = $('#selectedpoe').val() + (p + 1);
                    pathFindersHtml = pathFindersHtml + '  <div class="dbInnerBox recognitionOthers">  <div class="slider">' +
                        '<ul id="Ul5" class="first-and-second-carousel jcarousel-skin-tango">';
                    var struser1 = dashboard.LoadEmptyPathfindersUsers(0, '');
                    pathFindersHtml = pathFindersHtml + struser1 + '</ul></div>   <div class="dbInnerLeft">' + (response.DashboardPathFinders.Modules[p + 1] != undefined ? '<h2>0</h2><p>' + response.DashboardPathFinders.Modules[p + 1].ModuleName + '</p>' : '<h2>&nbsp;</h2><p>&nbsp;</p>') + '</p></div>  </div>';
                    p = p + 1;

                    var paginationHtml = '	<div class="pagination">';
                    for (pg = 0; pg < pagination; pg++) {
                        paginationHtml = paginationHtml + '<li type="' + type + '" selectedPage=' + (pg == 0 ? pg : Math.pow(2, pg)) + ' ><a class=' + (pg == (page / 2) ? 'selected' : '') + ' href="#">' + (pg + 1) + '</a></li>';
                    }
                    paginationHtml = paginationHtml + '</ul></div></div>';
                }
                var paginationHtml = '<div class="pagination">';
                for (pg = 0; pg < pagination; pg++) {
                  
                    paginationHtml = paginationHtml + '<a>' + (pg + 1) + '</a>';
                }

                //if (type == 2) {
                //    if (pathfindersPA > p) {
                //        var img = $('#selectedpoe').val() + (p + 1);
                //        pathFindersHtml = pathFindersHtml + '<div class="title"><div class="dbInnerBox yourmentors"> <div class="dbInnerLeft"><h2>' + response.DashboardPathFinders.PathfindersForYouCount + '</h2><p>Mentors for You</p></div> </div> </div>  <div class="content"> <div class="dbInnerBox recognitionOthers"><div class="slider">  <ul id="Ul6" class="first-and-second-carousel jcarousel-skin-tango">';
                //        var strUser2 = '';
                //        if (response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers[0].UserId != 0) {
                //            for (var sub1 = 0; sub1 < response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers.length; sub1++) {
                //                strUser2 = strUser2 + '<li type="' + type + '" id="' + p + '" moduleId="' + response.DashboardPathFinders.YourPathfinders[p].ModuleId + '" userId="' + response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers[sub1].UserId + '"><a class="showtooltip" title="' + response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers[sub1].Name + '"><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers[sub1].UserId + '&rnd=' + Math.random() + '" /></a></li>';
                //            }
                //            strUser2 = dashboard.LoadEmptyPathfindersUsers(response.DashboardPathFinders.YourPathfinders[p].PathfinderUsers.length, strUser2);
                //        } else {
                //            strUser2 = dashboard.LoadEmptyPathfindersUsers(0, strUser2);
                //        }
                //        pathFindersHtml = pathFindersHtml + strUser2 + '</ul></div>     <div class="dbInnerLeft"><h2 id="pathfinderUserCount' + p + '">' + response.DashboardPathFinders.YourPathfinders[p].PracticeAreaCount + '</h2><p>' + response.DashboardPathFinders.YourPathfinders[p].PracticeAreaName + '</p></div>      </div>';

                //    } else {
                //        var img = $('#selectedpoe').val() + (p + 1);
                //        var strUser2 = ' <div class="dbInnerBox recognitionOthers"><div class="slider">   <ul id="Ul7" class="first-and-second-carousel jcarousel-skin-tango">';
                //        strUser2 = strUser2 + dashboard.LoadEmptyPathfindersUsers(0, '');
                //        pathFindersHtml = pathFindersHtml + strUser2 + '</ul></div>  <div class="dbInnerLeft">' + (response.DashboardPathFinders.Modules[p + 1] != undefined ? '<h2>0</h2><p>' + response.DashboardPathFinders.Modules[p + 1].ModuleName + '</p>' : '<h2>&nbsp;</h2><p>&nbsp;</p>') + '</div> </div>' +
                //            '';
                //    }
                //}
                pathFindersHtml = pathFindersHtml + paginationHtml + '</div></div>';
                break;
            }
            if(type==2) {
                //$('.dbmentors').append(pathFindersHtml + '</div> </div>');
                //$('.dbmentors').append('<div class="dbBoxBottom">  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text.</p>   <h1>Mentors <span class="storiesIcon"><img src="../../Images/images/dbmentorsIcon.png" alt="Mentors" border="0" /></span></h1><div class="dbarrow"></div></div>');
                return pathFindersHtml + '</div> </div><div class="dbBoxBottom">  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text.</p>   <h1>Mentors <span class="storiesIcon"><img src="../../Images/images/dbmentorsIcon.png" alt="Mentors" border="0" /></span></h1><div class="dbarrow"></div></div>';
                
            }
            else{
                //$('.dbmentors').html(pathFindersHtml);
                return pathFindersHtml;
                
            }
            
            //jQuery('.first-and-second-carousel').jcarousel();
        } else {
   
            var pathFindersHtml = '<div class="PFTop"><div id="yourPathfinders" class="PFtiles2 ' + (type == 1 ? 'selected' : '') + '"><div class="tileContent"><h2>0</h2><p>Your Pathfinders</p></div>' +
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
            $('.dbmentors').html(pathFindersHtml);
            $('.practiceareaset1').show();
            $('.first-and-second-carousel').jcarousel();
            //$('.ui.accordion').accordion();
      
            //jQuery('.first-and-second-carousel').jcarousel();
        }
        $('.practiceareaset1').show();
    },
    LoadYourPathfinderByPagination: function (type, page) {
        Common.ajaxsync({
            url: '../../Dashboard/GetPathfinders',
            data: { "type": type },
            success: function (response) {
                resp = dashboard.LoadYourPathfinders(response, page, type);
                $('.practiceareaset1').show();
  //              if (response.DashboardStanding != null) {
              
  //                  var stories = '<div class="dbBoxtop">  <div class="dbInnerBox read"><div class="dbInnerLeft"><h2>0</h2>  <p>Read by You</p> </div> </div> <div class="dbInnerBox shared">  <div class="dbInnerLeft"> <h2>0</h2>' +
  //'  <p>Shared By You</p> </div> </div>  <div class="dbInnerBox post"> <div class="slider">  <ul id="first-carousel" class="first-and-second-carousel jcarousel-skin-tango"> <li> <img src=""  class="emptyUserTile" width="75" height="75" alt="" /></li>' +
  //' <li> <img src=""  class="emptyUserTile" width="75" height="75" alt="" /></li>  <li> <img src=""  class="emptyUserTile" width="75" height="75" alt="" /></li> <li>  <img src=""  class="emptyUserTile" width="75" height="75" alt="" /></li>' +
  //'   <li><img src=""  class="emptyUserTile" width="75" height="75" alt="" /></li>  <li> <img src=""  class="emptyUserTile" width="75" height="75" alt="" /></li>  <li> <img src=""  class="emptyUserTile" width="75" height="75" alt="" /></li>' +
  //'  </ul> </div>  <div class="dbInnerLeft"><h2>0</h2><p>Posted By Others</p> </div> </div></div>  <div class="dbBoxBottom"> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text.</p> <h1>Stories <span class="storiesIcon"> <img src="../../Images/images/dbstoriesIcon.png" alt="Stories Icon" border="0" /></span></h1> </div>  <div class="dbarrow"></div>';

  //                  $('.dbstories').html(stories);
  //                  $('.first-and-second-carousel').jcarousel();
  //                  $('.dbline').show();
  //              } else {
                   
  //                  var stories = '<div class="dbBoxtop">  <div class="dbInnerBox read"><div class="dbInnerLeft"><h2>0</h2>  <p>Read by You</p> </div> </div> <div class="dbInnerBox shared">  <div class="dbInnerLeft"> <h2>0</h2>' +
  //'  <p>Shared By You</p> </div> </div>  <div class="dbInnerBox post"> <div class="slider">  <ul id="first-carousel" class="first-and-second-carousel jcarousel-skin-tango"> <li> <img src=""  class="emptyUserTile" width="75" height="75" alt="" /></li>' +
  //' <li> <img src=""  class="emptyUserTile" width="75" height="75" alt="" /></li>  <li> <img src=""  class="emptyUserTile" width="75" height="75" alt="" /></li> <li>  <img src=""  class="emptyUserTile" width="75" height="75" alt="" /></li>' +
  //'   <li><img src=""  class="emptyUserTile" width="75" height="75" alt="" /></li>  <li> <img src=""  class="emptyUserTile" width="75" height="75" alt="" /></li>  <li> <img src=""  class="emptyUserTile" width="75" height="75" alt="" /></li>' +
  //'  </ul> </div>  <div class="dbInnerLeft"><h2>0</h2><p>Posted By Others</p> </div> </div></div>  <div class="dbBoxBottom"> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text.</p> <h1>Stories <span class="storiesIcon"> <img src="../../Images/images/dbstoriesIcon.png" alt="Stories Icon" border="0" /></span></h1> </div>  <div class="dbarrow"></div>';

  //                  $('.dbstories').html(stories);
  //                  $('.first-and-second-carousel').jcarousel();
  //                  $('.dbline').show();
  //              }

               
                $("#status").delay(600).fadeOut();
                $("#preloader").delay(600).fadeOut("slow");
             
              
                //jQuery('.first-and-second-carousel').jcarousel();
            },
            error: function (err) {
                //$('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
        return resp;
    },
    LoadFeedback: function (response) {
        //debugger;
        if (response.DashboardFeedback != null) {
            var feedbackHtml = '<div class="dbBoxtop"> <div class="dbInnerBox taken"> <div class="dbInnerLeft" onclick="redirectSyncPages(1)"><h2>' + response.DashboardFeedback.FeedbackTaken + '</h2><p>Taken by You</p></div></div>' +
                             ' <div class="dbInnerBox recived"> <div class="slider"><ul id="Ul1" class="first-and-second-carousel jcarousel-skin-tango">';
            var feedbackReceiveForYou = '';
            //debugger;
            for (var i = 0; i < response.DashboardFeedback.FeedbackReceivedUsers.length; i++) {
                feedbackReceiveForYou = feedbackReceiveForYou + '<li templateId="5" sharedId=' + response.DashboardFeedback.FeedbackReceivedUsers[i].User.UserId + ' mappingid=' + response.DashboardFeedback.FeedbackReceivedUsers[i].UserPOEMappingId + '><a class="showtooltip" title="' + response.DashboardFeedback.FeedbackReceivedUsers[i].User.FirstName + " " + response.DashboardFeedback.FeedbackReceivedUsers[i].User.LastName + '"><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardFeedback.FeedbackReceivedUsers[i].User.UserId + '&rnd=' + Math.random() + '" width="75" height="75" alt=""  /></a></li>';
            }

            feedbackReceiveForYou = dashboard.LoadEmptyUsers(response.DashboardFeedback.FeedbackReceivedUsers.length, feedbackReceiveForYou);

            feedbackHtml = feedbackHtml + feedbackReceiveForYou + '</ul></div>  <div class="dbInnerLeft" onclick="redirectSyncPagesNew(1)"><h2>' + response.DashboardFeedback.FeedbackReceived + '</h2><p>Received for You</p></div></div>' +
                '  <div class="dbInnerBox given">'+
                '<div class="slider"><ul id="Ul2" class="first-and-second-carousel jcarousel-skin-tango">';
            var feedbackGivenForYou = '';

            for (var j = 0; j < response.DashboardFeedback.FeedbackGivenUsers.length; j++) {
                feedbackGivenForYou = feedbackGivenForYou + '<li templateId="6" sharedId=' + response.DashboardFeedback.FeedbackGivenUsers[j].User.UserId + ' mappingid=' + response.DashboardFeedback.FeedbackGivenUsers[j].UserPOEMappingId + '><a class="showtooltip" title="' + response.DashboardFeedback.FeedbackGivenUsers[j].User.FirstName + " " + response.DashboardFeedback.FeedbackGivenUsers[j].User.LastName + '"><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.DashboardFeedback.FeedbackGivenUsers[j].User.UserId + '&rnd=' + Math.random() + '"  width="75" height="75" alt=""  /></a></li>';
            }
            feedbackGivenForYou = dashboard.LoadEmptyUsers(response.DashboardFeedback.FeedbackGivenUsers.length, feedbackGivenForYou);
            feedbackHtml = feedbackHtml + feedbackGivenForYou + '</ul></div>   <div class="dbInnerLeft" onclick="redirectSyncPagesNew(2)"><h2>' + response.DashboardFeedback.FeedbackGiven + '</h2><p>Given by You</p></div></div></div>' +
                '<div class="dbBoxBottom">  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text.</p>' +
                '    <h1>feedback <span class="storiesIcon"> <img src="../../Images/images/dbfeedbackIcon.png" alt="Stories Icon" border="0" /></span></h1>  </div>	<div class="dbarrow"></div>  </div>';
            $('.dbfeedback').html(feedbackHtml);
            $('.first-and-second-carousel').jcarousel();
         
        } else {
            var feedbackHtml = '<div class="dbBoxtop"> <div class="dbInnerBox taken"> <div class="dbInnerLeft"><h2>' + response.DashboardFeedback.FeedbackTaken + '</h2><p>Taken by You</p></div></div>' +
                             ' <div class="dbInnerBox recived"> <div class="slider"><ul id="Ul1" class="first-and-second-carousel jcarousel-skin-tango">';
            var feedbackReceiveForYou = '';

            feedbackReceiveForYou = dashboard.LoadEmptyUsers(response.DashboardFeedback.FeedbackReceivedUsers.length, feedbackReceiveForYou);

            feedbackHtml = feedbackHtml + feedbackReceiveForYou + '</ul></div>  <div class="dbInnerLeft"><h2>' + response.DashboardFeedback.FeedbackReceived + '</h2><p>Received for You</p></div></div>' +
                 '  <div class="dbInnerBox given">' +
                '<div class="slider"><ul id="Ul2" class="first-and-second-carousel jcarousel-skin-tango">';
            var feedbackGivenForYou = '';

            feedbackGivenForYou = dashboard.LoadEmptyUsers(response.DashboardFeedback.FeedbackGivenUsers.length, feedbackGivenForYou);
            feedbackHtml = feedbackHtml + feedbackGivenForYou + '</ul></div> <div class="dbInnerLeft" ><h2>' + response.DashboardFeedback.FeedbackGiven + '</h2><p>Given by You</p></div></div></div>' +
                   '<div class="dbBoxBottom">  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text.</p>' +
                '    <h1>feedback <span class="storiesIcon"> <img src="../../Images/images/dbfeedbackIcon.png" alt="Stories Icon" border="0" /></span></h1>  </div>	<div class="dbarrow"></div>  </div>';
            $('.dbfeedback').html(feedbackHtml);
          //  $('.first-and-second-carousel').jcarousel();
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
    },
    loaddropdown:function(){
        var dropdown = document.querySelectorAll('.dropdown');
        var dropdownArray = Array.prototype.slice.call(dropdown, 0);
        dropdownArray.forEach(function(el) {
            var button = el.querySelector('a[data-toggle="dropdown"]'),
                menu = el.querySelector('.dropdown-menu'),
                arrow = button.querySelector('i.icon-arrow');
            button.onclick = function(event) {
                if (!menu.hasClass('show')) {
                    menu.classList.add('show');
                    menu.classList.remove('hide');
                    arrow.classList.add('open');
                    arrow.classList.remove('close');
                    event.preventDefault();
                } else {
                    menu.classList.remove('show');
                    menu.classList.add('hide');
                    arrow.classList.remove('open');
                    arrow.classList.add('close');
                    event.preventDefault();
                }
            };
        });
        Element.prototype.hasClass = function (className) {
            return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
        };
 

}
};

$(function () {
    
    //var stories = '<div class="dbBoxtop">  <div class="dbInnerBox read"><div class="dbInnerLeft"><h2>0</h2>  <p>Read by You</p> </div> </div> <div class="dbInnerBox shared">  <div class="dbInnerLeft"> <h2>0</h2>' +
    //    '  <p>Shared By You</p> </div> </div>  <div class="dbInnerBox post"> <div class="slider">  <ul id="first-carousel" class="first-and-second-carousel jcarousel-skin-tango"> <li> <img src="http://static.flickr.com/66/199481236_dc98b5abb3_s.jpg" width="75" height="75" alt="" /></li>' +
    //    ' <li> <img src="http://static.flickr.com/75/199481072_b4a0d09597_s.jpg" width="75" height="75" alt="" /></li>  <li> <img src="http://static.flickr.com/57/199481087_33ae73a8de_s.jpg" width="75" height="75" alt="" /></li> <li>  <img src="http://static.flickr.com/77/199481108_4359e6b971_s.jpg" width="75" height="75" alt="" /></li>' +
    //    '   <li><img src="http://static.flickr.com/58/199481143_3c148d9dd3_s.jpg" width="75" height="75" alt="" /></li>  <li> <img src="http://static.flickr.com/72/199481203_ad4cdcf109_s.jpg" width="75" height="75" alt="" /></li>  <li> <img src="http://static.flickr.com/58/199481218_264ce20da0_s.jpg" width="75" height="75" alt="" /></li>' +
    //    '  </ul> </div>  <div class="dbInnerLeft"><h2>0</h2><p>Posted By Others</p> </div> </div></div>  <div class="dbBoxBottom"> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text.</p> <h1>Stories <span class="storiesIcon"> <img src="../../Images/images/dbstoriesIcon.png" alt="Stories Icon" border="0" /></span></h1> </div>  <div class="dbarrow"></div>';
    
    //$('.dbstories').html(stories);
    //$('.first-and-second-carousel').jcarousel();
});

$(function () {
    //StartTilesClick();
    //$('.practiceareaset2').hide();
    //$('.practiceareaset3').hide();
});
function redirectStanding(page) {
    window.location = "/communitysync/BigPicture?type=2&mode=" + page;
}
function redirectFeedback(mode) {
    window.location = "/Feedback/Feedback?mode=" + mode;
}
function redirectWall() {
    window.location = "/wall/index/1";
}

function redirectSync() {
    window.location = "/managersync/BigPicture";
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

