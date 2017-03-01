$(document).ready(function () {
    var html = "<li class='singleView'><a href='/Development/Priorities'><span><img src='../../Images/icons/goal-small.png' /></span><p>Priorities</p></a> </li>" +
        "<li class='singleView'><a href='/Development/Progress'><span><img src='../../Images/icons/track-goal-small.png' /></span><p>Progress</p></a> </li>" +
        "<li class='mixedview mixedIC'><a href='#'><span><img src='../../Images/icons/ic-small.png' /></span><p>IC view</p></a> </li>" +
        "<li class='mixedview mixedManager'><a href='#'><span><img src='../../Images/icons/manager-small.png' /></span><p>Manager View</p></a> </li>";
    $('#target ul').html(html);
    devLanding.getuserPoe();
    $('.poelistli').on('click', function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        var ctrl = $(this);
        var getValue = $(this).val();
        if (getValue != 0) {
            $('#tileclick').val(0);
            ctrl.addClass("selectArrow ");
            ctrl.siblings().removeClass("selectArrow ");
            devLanding.setSelectedPoe(ctrl.val(), parseInt(ctrl.attr('data-cap')));
            devLanding.loadUserRole(parseInt(ctrl.val()));
        }
        hideTilesFuncSST();
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
        //});
    });
    $('#goToManager,.mixedManager').on('click', function () {
        devLanding.setUserMode(2);
        ChangeContent(2);
        $('#mixview').hide();
        $('#normalView').show();
    });
    $('#goToIC,.mixedIC').on('click', function () {
        devLanding.setUserMode(1);
        ChangeContent(1);
        $('#mixview').hide();
        $('#normalView').show();
    });
    

});
var devLanding = {
    getuserPoe: function () {
        //debugger;
        Common.ajaxsync({
            url: '/Common/GetNetworkSubscribedPoes',
            success: function (response) {
                //debugger;
                // alert();
                var html = '';
                var poeids = '';
                for (var i = 0; i < response.length; i++) {
                    html = html + " <li id ='poeli" + response[i].POEId + "' value=" + response[i].POEId + " class='poelistli' data-cap=" + response[i].IsCapability + "><img src='../../Images/" + response[i].POEName.replace("&", "").replace("/", "") + "_Intro.png' alt='" + response[i].POEName + "'' /> <p> " + response[i].POEName + "</p><span></span></li>";
                    poeids = poeids + response[i].POEId + '%';
                }
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

                // debugger;
                $('#poelist').html(html);
                var selpoe = $('#selectedPoe').val();
                if ($('#poelist li').length > 4) {
                    $('.scroll2').slimScroll();
                }
                //debugger;
                var t = $('.poelistli:visible').first();
                if (selpoe == 0 || $('#poeli' + selpoe).length == 0) {
                    t.addClass('selectArrow');
                    devLanding.setSelectedPoe(t.attr('value'), parseInt(t.attr('data-cap')));
                    //hideTilesFuncSST();
                    if (t.attr('value') >= 18 && t.attr('value') <= 26) {
                        $('#progressBoxes').addClass('disableProgress');
                    }
                    devLanding.loadUserRole(parseInt(t.attr('value')));
                } else {
                    if (selpoe >= 18 && selpoe <= 26) {
                        $('#progressBoxes').addClass('disableProgress');
                    }
                    $('#poeli' + selpoe).addClass('selectArrow');
                    devLanding.setSelectedPoe(selpoe, parseInt($('#poeli' + selpoe).attr('data-cap')));
                    //hideTilesFuncSST();
                    devLanding.loadUserRole(parseInt(selpoe));
                }
                setTimeout(function () {
                    hideTilesFuncSST();
                }, 2000);
            },
            error: function (err) {
            }
        });
    },
    loadUserRole: function (poeid) {
        //debugger;
        if (poeid != 0) {
            $('#selectedpoe').html(poeid);
            $("#status").show();
            $("#preloader").show();
            Common.ajaxsync({
                url: '../../Common/GetUserRole',
                data: { 'poeId': poeid },
                success: function (response) {
                    if (response == 1) {
                        $('#mixview').hide();
                        $('#normalView').show();
                        $('.singleView').show();
                        $('.mixedview').hide();
                        devLanding.setUserMode(response);
                        ChangeContent(response);
                    } else if (response == 2) {
                        $('#mixview').hide();
                        $('#normalView').show();
                        $('.singleView').show();
                        $('.mixedview').hide();
                        devLanding.setUserMode(response);
                        ChangeContent(response);
                    } else if (response == 12) {
                        $('#normalView').hide();
                        $('#mixview').show();
                        $('.singleView').hide();
                        $('.mixedview').show();
                    }
                    $("#status").hide();
                    $("#preloader").hide();

                },
                error: function (err) {
                }
            });
        }
    },
    setSelectedPoe: function (poe, capability) {
        // debugger;
        Common.ajaxsync({
            url: '/Development/SetSelectedPoe?poe=' + poe + '&capability=' + capability,
            success: function (response) {
                $('#clickProgress').on('click', function () {
                    var selectedPoe = parseInt($('#selectedPoe').val());
                    if (poe == 15 || poe == 16 || poe == 17) {
                        window.location = "../Development/Progress";
                    }
                });
            },
            error: function (err) {
            }
        });
    },
    setUserMode: function (mode) {
        // debugger;
        Common.ajaxsync({
            url: '/Development/SetUserMode?mode=' + mode,
            success: function (response) {
            },
            error: function (err) {
            }
        });
    },
}

function ChangeContent(mode) {
    if (mode == 1) {
        $('#progressCont').html("View your Devlopment Priorities.");
        $('#prioritiesCont').html("Track your progress as you develop.");
    } else {
        $('#progressCont').html("View the Development Priorities for your Team Members.");
        $('#prioritiesCont').html(" Track the progress of your Team Members.");
    }
}
function hideTilesFuncSST() {
    //alert("Am in");
    Common.ajaxsync({
        url: '/Common/GetPoeResultMode',
        success: function (response) {
            //alert(response.Status);
            if (response.Status != false) {
                $('.headermenus').addClass('headerMenuHide');
                $('.result_start').addClass('resultMenuHide');
                $('.managersync_start').addClass('managerMenuHide');
                $('.communitysync_start').addClass('communityMenuHide');
                $('.goals_start').addClass('goalsMenuHide');

            } else {
                // alert('inside');
                $('.headermenus').removeClass('headerMenuHide');
                $('.result_start').removeClass('resultMenuHide');
                $('.managersync_start').removeClass('managerMenuHide');
                $('.communitysync_start').removeClass('communityMenuHide');
                $('.goals_start').removeClass('goalsMenuHide');

            }
        },
        error: function () {
        }
    });
}