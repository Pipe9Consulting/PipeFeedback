$(document).ready(function () {
    //$('#nDashBoard').attr("checked", "checked");
    notifications();
    hideTilesFuncTS();
   
    $('.accordion h3').live('click', function () {
        $(this).toggleClass("down");
        $(".pane").slideToggle("slow");
    });
    $(document).click(function (event) {
        if ($(event.target).parents().index($('.accordion h3')) == -1) {
            //debugger;
            if ($(event.target).parents().index($('.accordion')) == -1) {
                if ($('.pane').is(":visible")) {
                    $('.pane').slideUp("slow");
                    $('.accordion h3').removeClass("down");
                }
            }
        }
    });

    $('#yourAcc').hide();
    $('#paidmember').hide();
    $('#cartlist').hide();
    $("#tiles .tile li").hover(function () {
        $(this).stop().animate({ marginTop: "-128px" }, 400);
    }, function () {
        $(this).stop().animate({ marginTop: "0px" }, 400);
    });
    $("#status").hide();
    $("#preloader").hide();
    $('.bukatutup img').live('click', function () {
        $('#target').toggle('slow');
    });
    //new
    $('#yourAcc').hide();
    $('#paidmember').hide();
    $('#cartlist').hide();
    Common.ajaxsync({
        url: '/Common/CheckSubscription',
        success: function (response) {
            if (response != null) {
                $('#planMode').val(response.SessionPlan);
                if (response.IsSub != 0 && response.Plan != 2 && response.Plan != 3) {
                    if (response.Mode == 1) {
                        $('#paidmember').hide();
                        $('#cartlist').show();
                    }
                    //else {
                    //    var htmls = "  <li class='becomePaidmember' id='paidmemberClick'> <p> Become a Paid Member</p> </li>";
                    //    $('#paidmember').html(htmls);
                    //    $('#paidmember').show();
                    //}

                    $('#yourAcc').show();
                } else {
                    $('#paidmember').hide();
                    $('#cartlist').hide();
                }
                if (response.IsSub != 0 && response.Plan != 3) {
                    $('#cartlist').show();
                    $('#yourAcc').show();
                }
            }
        },
        error: function (err) {
        }
    });

    //paidmemeberclick
    $('#paidmemberClick').live('click', function () {
        Common.ajaxsync({
            url: '/SignUp/LoadAllOldMembers?mode=1',
            success: function (response) {
                window.location.href = "/Signup/old/new";
            },
            error: function (err) {
            }
        });
    });
    //cartlist
    $('#cartlist').live('click', function () {
        Common.ajaxsync({
            url: '/SignUp/LoadAllOldMembers?mode=2',
            success: function (response) {
                window.location.href = "/Signup/old/new";
            },
            error: function (err) {
            }
        });
    });
    Common.ajaxsync({
        url: '/SignUp/CartList',
        success: function (response) {
            if (response == null) {
                $('#cartlist').hide();
                $('#cartlist').html('');
            } else if ($('#planMode').val() == 1) {
                $('#cartlist').hide();
                var htmls = "  <li class='becomePaidmember' id='paidmemberClick'> <p> Become a Paid Member</p> </li>";
                $('#paidmember').html(htmls);
                $('#paidmember').show();
            } else {
                var htmContent = "<li class='cart'> <img src='../../Images/icons/cart-small.png' /><p>Cart(" + response + ")</p></li>";
                $('#cartlist').html(htmContent);
            }
        },
        error: function (err) {
        }
    });
    var IsHSP = false;
    $('.close').click(function () {
        $('.yammererrorbg,.yammernetwork').fadeOut("slow");
    });
    $('#changingPassword').click(function () {
        $('#basic-changePassword').modal();
    });
    $('#redirectNetwork').click(function () {
        window.location.href = "../../Network/Network";
    });
    $('#redirectProfiles').click(function () {
        window.location.href = "/Signup/Poelibrary?location=Add";
    });
    $('#redirectWall').click(function () {
        window.location.href = "/Wall/Index";
    });
    
    $('#redirectAccount').click(function () {
        window.location.href = "../../Network/Network?pageMode=1";
    });
    $('#gotoTerms').click(function () {
        // window.location.href = "/SignUp/Terms";
        window.open("/SignUp/Terms", '_blank');
    });
    $('#gotoPrivacy').click(function () {
        //window.location.href = "/SignUp/Privacy";
        window.open("/SignUp/Privacy", '_blank');
    });
    
    $('#poelibraryHome').click(function () {
        $('#poelibrarys').addClass('selected');
        $('#startT,#wallT,#networkT,#feedbackT,#standT,#syncT,#goalT').removeClass('selected');
        Common.ajax({
            url: '../../Common/IsMyOwnSubscription',
            success: function (response) {
                if (response != false) {
                    window.location.href = "/Signup/Poelibrary?location=Add";
                } else {
                    window.location.href = "/Signup/Poelibrary?location=newPoe";
                }
            },
            error: function (err) {
            }
        });
    });
  
    function hideTilesFuncTS() {
        Common.ajaxsync({
            url: '../../Common/GetPoeResultMode',
            success: function (response) {
                //alert("1");
                //debugger;
                if (response.Status != false) {
                    $('.headermenus').addClass('headerMenuHide');
                    $('.result_start').addClass('resultMenuHide');
                    $('.managersync_start').addClass('managerMenuHide');
                    $('.communitysync_start').addClass('communityMenuHide');
                    $('.goals_start').addClass('goalsMenuHide');
                    $('.managerSync').addClass('startManagerNoOver');
                    $('.smalltilehide').addClass('startSmallTile');
                    $('.communitySync').addClass('startSyncNoOver');
                    $('.bigtilehides').addClass('hideColumn');
                    $('.sync').addClass('SelecDisable');
                    $('.goal').addClass('SelecDisable');
                    $('.standing').addClass('SelecDisable');
                    $('.viewResults').addClass('startArrowHide');
                    $('.plandevelopment').addClass('startArrowHide');
                }
                if (response.Role == 2 || response.Role == 12) {
                    $('.headermenus').removeClass('headerMenuHide');
                    $('.result_start').removeClass('resultMenuHide');
                    $('.managersync_start').removeClass('managerMenuHide');
                    $('.communitysync_start').removeClass('communityMenuHide');
                    $('.goals_start').removeClass('goalsMenuHide');
                    $('.managerSync').removeClass('startManagerNoOver');
                    $('.smalltilehide').removeClass('startSmallTile');
                    $('.communitySync').removeClass('startSyncNoOver');
                    $('.bigtilehides').removeClass('hideColumn');
                    $('.sync').removeClass('SelecDisable');
                    $('.goal').removeClass('SelecDisable');
                    $('.standing').removeClass('SelecDisable');
                    $('.viewResults').removeClass('startArrowHide');
                    $('.plandevelopment').removeClass('startArrowHide');
                }
               // alert(IsHSP);
                if (!IsHSP) {
                    $('.sync').addClass('SelecDisable');
                    $('.newNotify').addClass('hideColumn');
                } else {
                    $('.sync').removeClass('SelecDisable');
                    $('.newNotify').removeClass('hideColumn');
                    $('#redirectPostAppreciation').click(function () {
                        //alert(IsHSP);
                        //if (IsHSP) {
                        window.location.href = "/Wall/PostAppreciation";
                        //}
                    });
                }
                
            },
            error: function () {
            }
        });
    }

   
    function notifications() {
        Common.ajaxsync({
            url: '../../Common/GetNotifications',
            success: function (response) {
                //debugger;
                $('#menustar').hide();
                var notifyhtml = '';
                if (response.ManagerSync) {
                    $('#menustar').show();
                    notifyhtml = '<li><a href="/ManagerSync/ManagerSync"><span></span> Manager Sync Available</a></li>';
                    $('#managerSyncavail').html('<span class="Star_Icon"></span><p class="star_name">New Views <br />Available</p>');
                }
                if (response.DevelopmentPriorities) {
                    $('#menustar').show();
                    notifyhtml = notifyhtml + '<li><a href="/Development/Development"><span></span> Dev Priorities Available</a></li>';
                    $('#devPrioritiesAvail').html('<span class="Star_Icon"></span><p class="star_name">Development Priorities Available</p>');
                }
                if (response.IncompleteSelffeedback) {
                    $('#menustar').show();
                    notifyhtml = notifyhtml + '<li><a href="/Feedback/Feedback?Mode=2"><span></span> Incomplete Self-Feedback</a></li>';
                }
                if (response.IncompleteTeamfeedback) {
                    $('#menustar').show();
                    notifyhtml = notifyhtml + '<li><a href="/Feedback/Feedback?Mode=1"><span></span> Incomplete Team-Feedback</a></li>';
                }
                //alert(notifyhtml);
                if (response.IsHSP) {
                    notifyhtml = notifyhtml + '<li><a href="../Wall/Index"><span></span> View Notification History</a></li>';
                }
                IsHSP = response.IsHSP;
               // notifyhtml = notifyhtml + '<li><a href="../Wall/Index"><span></span> View Notification History</a></li>';
                $('#notifyCont').html(notifyhtml);
            },
            error: function (err) {
            }
        });
    }
});
