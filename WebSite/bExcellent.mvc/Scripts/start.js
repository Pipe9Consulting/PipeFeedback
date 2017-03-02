$(document).ready(function () {
    //TileNotfication();
    //DashBoard();
    //ShowZoomError();
    //hideTilesFunc();
    $('.afterlogin').show();
    $('.checkt').show();
    $('#beforeLogin').hide();
    CheckOwnSubscriptionFortheUser();
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $('#poelibrarys').addClass('selected');

    FirstLoginChangePassword();

    $('.pane').find('input[type=radio]:checked').removeAttr('checked');
    $("#n" + $(this).context.title).attr('checked', 'checked');
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/start_icon_h.png');
    Common.setTopMenu(1);
});

$(function () {
    StartTilesClick();
    $("#status").fadeOut();
    $("#preloader").delay(100).fadeOut("slow");
    //$('.noticationIcon img').hover(function () {
    //    $(this).attr("src", "../../Images/start/info_icon_h.png");
    //});
    $(".noticationIcon img").hover(
      function () {
          $(this).attr("src", "../../Images/start/info_iconH.png");
      }, function () {
          $(this).attr("src", "../../Images/start/info_icon.png");
      }
    );
});

function FirstLoginChangePassword() {
    Common.ajax({
        url: '../../Common/FirstLogin',
        success: function (response) {
            if (response.Username != null) {
                $('#basic-changePassword').modal();
                $('#txtemailid').val(response.Username);
                $('#curpassword').val(response.Password);
                $('#txtemailid').prop('disabled', true);
                $('#curpassword').prop('disabled', true);
            }
            $('#subidStart').val(response.SubId);
        },
        error: function () {
        }
    });
}
function TileNotfication() {
    Common.ajax({
        url: '../../Common/GetFBStatus',
        success: function (response) {
            var selfHtml = "";
            var teamHtml = "";
            if (response.Self.length != 0) {
                $('#selfincomplete').html("<span class='Star_Icon'></span><p class='star_name' id='incSelfFB'>Incomplete Self-Feedback</p>");
                for(var i=0;i<response.Self.length;i++) {
                    selfHtml =selfHtml+response.Self[i].PoeName + "</br>";
                }
                $('#hover_content8').html(selfHtml + "<span> <img src='../../Images/start/hover_arrow_up.png' /></span>");
               // alert(selfHtml);
            }
            if (response.Team.length != 0) {
                // alert(response.Team.length);
                var totalcounts = 0;
                for (var j = 0; j < response.Team.length; j++) {
                    teamHtml = teamHtml + response.Team[j].PoeName + ": " + response.Team[j].FBRequired + "</br>";
                    totalcounts = totalcounts + response.Team[j].FBRequired;
                }
                $('#incompleteTeamFb').html("<span class='Star_Icon'></span><p class='star_name' id='tmincfeed'>Team-Feedback Required: " + totalcounts + "</p>");
                $('#hover_content9').html(teamHtml + "<span> <img src='../../Images/start/hover_arrow_up.png' /></span>");
            }

            $('#tmincfeed').mouseover(function () {
                $('#hover_content9').show();
            });
            $('#tmincfeed').mouseout(function () {
                $('#hover_content9').hide();
            }); 
            $('#incSelfFB').mouseover(function () {
                $('#hover_content8').show();
            });
            $('#incSelfFB').mouseout(function () {
                $('#hover_content8').hide();
            });
        },
        error: function () {
        }
    });
}
function CheckOwnSubscriptionFortheUser() {
    var subid = 0;
    Common.ajax({
        url: '../../Network/OwnNetworkUser',
        success: function (response) {
            if (response != null) {
                subid = 1;
                $('#subidStart').val(1);
            }
        },
        error: function () {
        }
    });
}

function StartTilesClick() {
    CheckOwnSubscriptionFortheUser();
    UserInRoles();
    var networkMapping = 0;
    Common.ajaxsync({
        url: '/Common/CheckNetworkMapping',
        success: function (response) {
            if (response != null) {
                networkMapping = response;
            } else if (response == null) {
                networkMapping = null;
            }
            else {
                networkMapping = 0;
            }
        },
        error: function () {
        }
    });
    $('#poelibrarys').click(function () {
        $('#poelibrarys').addClass('selected');
        $('#startT,#wallT,#networkT,#feedbackT,#standT,#syncT,#goalT').removeClass('selected');
        Common.ajax({
            url: '../../Common/IsMyOwnSubscription',
            success: function (response) {
                var subidc = $('#subidStart').val();
                if (response != false) {
                    window.location.href = "/Signup/Poelibrary?location=Add";
                } else if (subidc == 1) {
                    window.location.href = "/Signup/Poelibrary?location=Add";
                } else {
                    window.location.href = "/Signup/Poelibrary?location=newPoe";
                }
            },
            error: function () {
            }
        });
    });
    $('#startT').click(function () {
        $('#startT').addClass('selected');
        $('#wallT,#networkT,#poelibrarys,#feedbackT,#standT,#syncT').removeClass('selected');
        if (networkMapping != 0) {
            window.location.href = "../../home/QuickStart";
        } else if (networkMapping == null) {
            window.location.href = "../../home/SignOut";
        }
        else {
            window.location.href = '/Signup/Add/you';
        }
    });

    $('.profile').click(function () {
        $('.profile').addClass('selected');
        $('#startT,#wallT,#poelibrarys,#feedbackT,#standT,#syncT').removeClass('selected');
        window.location.href = "../../Network/Network?pageMode=1";
    });


    $('.result').click(function () {

        $('.result').addClass('selected');
        $('#startT,#wallT,#poelibrarys,#feedbackT,#standT,#syncT').removeClass('selected');
        window.location.href = "../../Results/Results";
    });

    $('.mentor').click(function () {
        $('.mentor').addClass('selected');
        $('#startT,#wallT,#poelibrarys,#feedbackT,#standT,#syncT').removeClass('selected');
        window.location.href = "../../Mentor/Mentor";
    });

    $('.network').click(function () {
        $('#networkT').addClass('selected');
        $('#startT,#wallT,#poelibrarys,#feedbackT,#standT,#syncT').removeClass('selected');
        window.location.href = "../../Feedback/Feedback?mode=1";
        // window.location.href = "../../Network/Network";
    });
    $('.wall').click(function () {

        $('.wall').addClass('selected');
        $('#startT,#networkT,#poelibrarys,#feedbackT,#standT,#syncT').removeClass('selected');
        if (networkMapping != 0) {
            window.location = "../../wall/index";
        } else if (networkMapping == null) {
            window.location.href = "../../home/SignOut";
        } else {
            window.location.href = '/Signup/Add/you';
        }
    });
    $('.feedback').click(function () {
        $('.feedback').addClass('selected');
        $('#startT,#wallT,#networkT,#poelibrarys,#standT,#syncT,#goalT').removeClass('selected');
        if (networkMapping != 0) {
            window.location = "../../Feedback/Feedback?mode=2";
        } else if (networkMapping == null) {
            window.location.href = "../../home/SignOut";
        }
        else {
            window.location.href = '/Signup/Add/you';
        }
    });
    $('.standing').click(function () {
        $('.standing').addClass('selected');
        $('#startT,#wallT,#networkT,#poelibrarys,#feedbackT,#syncT,#goalT').removeClass('selected');
        if (networkMapping != 0) {
            // window.location = "../../communitysync/communitysync";
            window.location = "../../results/results";
        } else if (networkMapping == null) {
            window.location.href = "../../home/SignOut";
        }
        else {
            window.location.href = '/Signup/Add/you';
        }
    });
    $('.communitySync').click(function () {
        $('.standing').addClass('selected');
        $('#startT,#wallT,#networkT,#poelibrarys,#feedbackT,#syncT,#goalT').removeClass('selected');
        if (!$(this).hasClass('startSyncNoOver')) {
            if (networkMapping != 0) {
                window.location = "../../communitysync/communitysync";
            } else if (networkMapping == null) {
                window.location.href = "../../home/SignOut";
            } else {
                window.location.href = '/Signup/Add/you';
            }
        }
    });
    $('.managerSync').click(function () {
        $('.sync').addClass('selected');
        $('#startT,#wallT,#networkT,#poelibrarys,#feedbackT,#standT,#goalT').removeClass('selected');
        if (!$(this).hasClass('startManagerNoOver')) {
            if (networkMapping != 0) {
                window.location = "../../managersync/managersync";
            } else if (networkMapping == null) {
                window.location.href = "../../home/SignOut";
            } else {
                window.location.href = '/Signup/Add/you';
            }
        }
    });
    $('.goal,.sync').click(function () {
        $('.goal').addClass('selected');
        $('#startT,#wallT,#networkT,#poelibrarys,#feedbackT,#standT,#syncT').removeClass('selected');
        if (networkMapping != 0) {
            window.location.href = "../../Development/Development";
        } else if (networkMapping == null) {
            window.location.href = "../../home/SignOut";
        }
        else {
            window.location.href = '/Signup/Add/you';
        }
    });
}

function DashBoard() {
    Common.ajaxsync({
        url: '/Home/DashBoard',
        success: function (response) {
        },
        error: function () {
        }
    });
}
function UserInRoles() {
    Common.ajaxsync({
        url: '/Common/GetCurrentUserRole',
        success: function (response) {
            //alert(response.length);
            //debugger;
            //alert($('.hideFooterMenu').length);
            //if (response.length <= 1) {
                // alert(response[0].RoleId);
                if (response == 1) {
                    $('#teamHide').addClass('hideColumn');
                    $('#teamfeed').addClass('SelecDisable');
                    hideTilesFunc('self');
                } else if (response == 2    ) {
                    $('#selffeed').addClass('SelecDisable');
                    $('#selfHide').addClass('hideColumn');
                    hideTilesFunc('team');
                } else {
                    hideTilesFunc('no');
                }
           // } else {
                
            //}

        },
        error: function (err) {
        }
    });
}

//function loadFooter(mode) {
//    var poelibrary = "";
//    Common.ajaxsync({
//        url: '../../Common/IsMyOwnSubscription',
//        success: function (response) {
//            var subid = $('#subidStart').val();
//            if (response != false) {
//                poelibrary = "/Signup/Poelibrary?location=Add";
//            } else {
//                poelibrary = "/Signup/Poelibrary?location=newPoe";
//                //poelibrary = "/Signup/Poelibrary?location=Add";
//            }
//            if (subid == 1) {
//                poelibrary = "/Signup/Poelibrary?location=Add";
//            }
//            // alert(mode);
//            var self = "";
//            var team = "";
//            if (mode == "self") {
//                team = "hideFooterMenu";
//            } else if (mode == "team") {
//                self = "hideFooterMenu";
//            }
//            var poeMode = $('#resultmode').val();
//            alert(poeMode);
//            var html = "";
//            if (poeMode == "True") {
//                html =
//       "<li class=" + self + "><a href='../../Feedback/Feedback?mode=2'><span><img src='../../Images/Start/self_feedback_small.png' /></span><p>Complete Self-Feedback</p></a></li>" +
//          "<li class=" + team + "><a href='../../Feedback/Feedback?mode=1'><span><img src='../../Images/Start/provideTFB.png' /></span><p>Provide Team-Feedback</p></a></li>" +
//           "<li class='hideFooterMenu resulthidermenu'><a><span><img src='../../Images/Start/feedbackresults_small.png' /></span><p>Feedback Results</p></a></li>" +
//           "<li class='hideFooterMenu managerhidermenu'><a><span><img src='../../Images/Start/managersync_small.png' /></span><p>Manager Sync</p></a></li>" +
//           "<li class='hideFooterMenu managerhidermenu'><a><span><img src='../../Images/Start/communitySync_small.png' /></span><p>Community Sync</p></a></li>" +
//                "<li class='hideFooterMenu'><a><span><img src='../../Images/Icons/goal-small.png' /></span><p>Development Priorities</p></a></li>" +
//                "<li class='hideFooterMenu'><a><span><img src='../../Images/Start/trackProgress.png' /></span><p>Track Development Progress</p></a></li>";
//            } else {
//                html =
//     "<li class=" + self + "><a href='../../Feedback/Feedback?mode=2'><span><img src='../../Images/Start/self_feedback_small.png' /></span><p>Complete Self-Feedback</p></a></li>" +
//        "<li class=" + team + "><a href='../../Feedback/Feedback?mode=1'><span><img src='../../Images/Start/provideTFB.png' /></span><p>Provide Team-Feedback</p></a></li>" +
//         "<li><a href='../../result/result'><span><img src='../../Images/Start/feedbackresults_small.png' /></span><p>Feedback Results</p></a></li>" +
//         "<li><a href='../../managersync/managersync'><span><img src='../../Images/Start/managersync_small.png' /></span><p>Manager Sync</p></a></li>" +
//         "<li><a href='../../communitysync/communitysync'><span><img src='../../Images/Start/communitySync_small.png' /></span><p>Community Sync</p></a></li>" +
//              "<li><a href='../../Goal/Index'><span><img src='../../Images/Icons/goal-small.png' /></span><p>Development Priorities</p></a></li>" +
//              "<li><a href='../../Goal/index'><span><img src='../../Images/Start/trackProgress.png' /></span><p>Track Development Progress</p></a></li>";
//            }

//            $('#target ul').html(html);
//        },
//        error: function () {
//        }
//    });
//}
function hideTilesFunc(mode) {
    Common.ajaxsync({
        url: '../../Common/GetPoeResultModeUpdated',
        success: function (response) {
            //alert(response.Status);
            var html = "";
            var self = "";
            var team = "";
            if (mode == "self") {
                team = "hideFooterMenu";
            } else if (mode == "team") {
                self = "hideFooterMenu";
            }
            if (response.Status) {
                html =
      "<li class=" + self + "><a href='../../Feedback/Feedback?mode=2'><span><img src='../../Images/Start/self_feedback_small.png' /></span><p>Complete Self-Feedback</p></a></li>" +
         "<li class=" + team + "><a><span><img src='../../Images/Start/provideTFB.png' /></span><p>Provide Team-Feedback</p></a></li>" +
          "<li class='hideFooterMenu resulthidermenu'><a><span><img src='../../Images/Start/feedbackresults_small.png' /></span><p>Feedback Results</p></a></li>" +
          "<li class='hideFooterMenu managerhidermenu'><a><span><img src='../../Images/Start/managersync_small.png' /></span><p>Manager Sync</p></a></li>" +
          "<li class='hideFooterMenu managerhidermenu'><a><span><img src='../../Images/Start/communitySync_small.png' /></span><p>Community Sync</p></a></li>" +
               "<li class='hideFooterMenu'><a><span><img src='../../Images/Icons/goal-small.png' /></span><p>Development Priorities</p></a></li>" +
               "<li class='hideFooterMenu'><a><span><img src='../../Images/Start/trackProgress.png' /></span><p>Track Development Progress</p></a></li>";
            } else {
                html =
     "<li class=" + self + "><a href='../../Feedback/Feedback?mode=2'><span><img src='../../Images/Start/self_feedback_small.png' /></span><p>Complete Self-Feedback</p></a></li>" +
        "<li class=" + team + "><a href='../../Feedback/Feedback?mode=1'><span><img src='../../Images/Start/provideTFB.png' /></span><p>Provide Team-Feedback</p></a></li>" +
         "<li><a href='../../result/result'><span><img src='../../Images/Start/feedbackresults_small.png' /></span><p>Feedback Results</p></a></li>" +
         "<li><a href='../../managersync/managersync'><span><img src='../../Images/Start/managersync_small.png' /></span><p>Manager Sync</p></a></li>" +
         "<li><a href='../../communitysync/communitysync'><span><img src='../../Images/Start/communitySync_small.png' /></span><p>Community Sync</p></a></li>" +
              "<li><a href='../../Development/Development'><span><img src='../../Images/Icons/goal-small.png' /></span><p>Development Priorities</p></a></li>" +
              "<li><a href='../../Development/Development'><span><img src='../../Images/Start/trackProgress.png' /></span><p>Track Development Progress</p></a></li>";
               }
            $('#target ul').html(html);
            
        },
        error: function () {
        }
    });
}
//function ShowZoomError() {
//    var cookieValue = document.cookie;
//   alert(cookieValue.split(';')[0]);
//    if (cookieValue.split(';')[0] != "Showzoom") {
//        document.cookie = "username=John Smith; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
//        $('#masterMsgCont').text("Please ensure your browser zoom is set to 100% for best view");
//        $('#overallCont').show();

//    }
//}