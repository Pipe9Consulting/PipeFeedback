var sync = {
    getuserRoles: function () {
        var type = 0;
        Common.ajaxsync({
            url: '/Standing/GetUserRoles',
            success: function (response) {
                //$('.stiles').hide();
                for (var i = 0; i < response.length; i++) {
                    switch (response[i].RoleId) {
                        case 1:
                            $('#team').show();
                            type = 2;
                            break;
                        case 2:
                            $('#you').show();
                            type = 1;

                            break;
                        case 3:
                            $('#you').show();
                            type = 1;

                            break;
                        case 4:

                            break;
                        case 5:
                            $('#you').show();
                            type = 1;

                            break;
                        case 6:
                            $('#you').show();
                            type = 1;

                            break;

                        default:
                            break;
                    }
                }

                var typevalue = $('#Synctype').val();
                var tileclicked = $('#stilesClick').val();
               // debugger;
                if (typevalue != 0) {
                    type = typevalue;
                    $('.stiles').each(function () {
                        var value = $(this).attr('value');            //Change First $(this).val()
                        if (value == typevalue) {
                            $(this).addClass('selected');
                        }
                    });
                }
                var t = $('.stiles:visible').first();
                t.addClass('selected');
                sync.getuserPoeByType(type);
            },
            error: function () {
            }
        });
    },
    getuserPoeByType: function (type) {
        Common.ajaxsync({
            url: '/sync/GetUsersPoeByRole?type=' + type,
            success: function (response) {
                var html = '';
                var poeids = '';
                for (var i = 0; i < response.length; i++) {
                    html = html + " <li id ='poeli" + response[i].POEId + "' value=" + response[i].POEId + " class='poelistli'><a> <div class='icon'> <img src='../../Images/" + response[i].Name.replace("&", "") + "_Intro.png' alt='" + response[i].Name + "' class='img' /></div> <p> " + response[i].Name + "</p> </a><span></span></li>";
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

                $('#poelist1').html(html);
                var selpoe = $('#selectedPoeValueSync').val();
                if (selpoe == "0") {
                    selpoe = $('.poelistli:first').val()
                }
                if ($('#poelist1 li').length > 4) {
                    $('.scroll2').slimScroll({
                        start: $('#poeli' + selpoe)
                    });
                }
                var t = $('.poelistli:visible').first();
                var selectedPoe = $('#selectedPoeValueSync').val();
                //var tileclicked = $('#StandingTilesclick').val();
                var tileclicked = $('#tileclick').val();

                //if (selectedPoe == 0) {
                //    //debugger;
                //    t.addClass('selectArrow');
                //    sync.setSelectedPoe(t.attr('value'));
                //    //standing.GetTileScore(t.attr('value'));


                //} else {
                //    //debugger;
                //    if ($('#poeli' + selectedPoe).length != 0) {
                //        $('#poeli' + selectedPoe).addClass('selectArrow');
                //        sync.setSelectedPoe(parseInt(selectedPoe));
                //    } else {
                //        t.addClass('selectArrow');
                //        sync.setSelectedPoe(t.attr('value'));
                //    }
                    
                //   // standing.GetTileScore(selectedPoe);


                //}
                //poelist(poeids, html, response[0].POEId, response.length);
            },
            error: function () {
            }
        });
    },

    setSelectedPoe: function (poe) {
      
        Common.ajaxsync({
            url: '/sync/SetSelectedPoe?poe=' + poe,
            success: function () {
                //sync.SetWcsiDiff();
            },
            error: function () {
            }
        });
    },
    getfbPoe: function () {
        Common.ajaxsync({
            url: '/sync/GetfbPoe',
            success: function (response) {
                var ctrl = $('#poeli' + response);
                ctrl.addClass("selected");
                ctrl.siblings().removeClass("selected");
            },
            error: function () {
            }
        });
    },
    getfbtype: function () {
        Common.ajaxsync({
            url: '/sync/Getfbtype',
            success: function (response) {
                sync.getuserPoeByType(parseInt(response));
                var ctrl = null;
                var ctrl2 = null;
                if (response == 1) {
                    ctrl = $('#cyou');
                    ctrl2 = $('#you');
                } else {
                    ctrl = $('#cteam');
                    ctrl2 = $('#team');
                }

                ctrl.addClass("selected");
                ctrl.siblings().removeClass("selected");
                ctrl2.addClass("selected");
                ctrl2.siblings().removeClass("selected");
            },
            error: function () {
            }
        });
    },
    SetWcsiDiff: function () {
        Common.ajaxsync({
            url: '/sync/GetSyncWcsiDiff',
            success: function (response) {
                var yscore = parseFloat(response.Youtile);
                var yscorestr = yscore > 0 ? "+" + yscore : yscore;
                var tscore = parseFloat(response.Teamtile);
                var tscorestr = tscore > 0 ? "+" + tscore : tscore;
                $('#you .number').text(yscorestr);
                $('#team .number').text(tscorestr);
            },
            error: function () {
            }
        });
    },
    IsOwnSubscribtion: function () {
        $('#sliderbtn').html('');
        Common.ajaxsync({
            url: '../../Common/IsMyOwnSubscription',
            success: function (response) {
                if (response != false) {
                    $('#OwnSubStatusSync').val(1);
                }
            },
            error: function () {
            }
        });
        //return output;
    },
};
$(document).ready(function () {
    var selectedPoe = $('#selectedPoeValueSync').val();
    Common.setTopMenu(6);
    var tempval = 0;
    if (selectedPoe != 0) {
        setTimeout(function () {
            tempval = 1;
            GetUsersPoesArrangement(selectedPoe);
        }, 50);
    }
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    //$('.scroll1').slimScroll();

    $('.fblfristBox a').click(function () {

        window.location.href = "../../Goal/SetGoals";

    });

    sync.IsOwnSubscribtion();
    var html = "<li class='nwTile'><a href='../../Goal/SetGoals'><span><img src='../../Images/Icons/goal-small.png'/></span><p>Set Development Priorities</P></a></li>" +
             "<li class='peerTile'><a href='../../Goal/TrackGoals'><span><img src='../../Images/Icons/track-goal-small.png'/></span><p>Track Development Progress</P></a></li>";
    $('#target ul').html(html);
    $('#target ul li').live('click', function () {
        var ctrl = $(this);
        sync.getuserPoeByType(ctrl.val());
        $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).addClass("selected");
        $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).siblings().removeClass("selected");
    });
    $('.pane').find('input[type=radio]:checked').removeAttr('checked');
    $("#n" + $(this).context.title).attr('checked', 'checked');
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/goals_icon_h.png');
                  

    //sync.getuserPoeByType(t.val());
    $('.poelistli').live('click', function () {
      //  debugger;
        var ctrl = $(this);
        var viewVal = $(this).val();
       // $("#status,#preloader").delay(100).fadeIn("slow", function () {
            if (viewVal != 0) {
                ctrl.addClass("selectArrow");
                ctrl.siblings().removeClass("selectArrow");
                sync.setSelectedPoe(ctrl.val());
                $('#selectedPoeValueSync').val(ctrl.val());
            }
        //});
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    });

    $('.fblsecondBox a').click(function () {

        window.location.href = "../../Goal/TrackGoals";
    });

    if (tempval == 1) {
        // setTimeout(function() {
       sync.getuserRoles();
        sync.getfbtype();
        sync.getfbPoe();
        // }, 3000);
    } else {
       sync.getuserRoles();
       sync.getfbtype();
        sync.getfbPoe();
    }
    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
    //setTimeout(function () {
    if ($('#poelist1 li').length > 4) {
        $('.scroll2').slimScroll();
    }
    $('.scroll1').slimScroll();
    //$('#poeli13').click();

    var t = $('.poelistli:visible').first();
    //var selectedPoe = $('#selectedPoeValueSync').val();   

    if (selectedPoe == 0) {
       
        t.addClass('selectArrow');
        sync.setSelectedPoe(t.attr('value'));
       

    } else {
       
        if ($('#poeli' + selectedPoe).length != 0) {
            $('#poeli' + selectedPoe).addClass('selectArrow');
            sync.setSelectedPoe(selectedPoe);
        } else {
          //  alert($('#poeli' + selectedPoe).length);
            t.addClass('selectArrow');
            sync.setSelectedPoe(t.attr('value'));
        }

    }

    //}, 2000);
});
function CallPoelibrary(data) {
    var poeid = parseInt((data).id.replace("poeli", ""));
    window.location = "/Signup/Poelibrary?location=Add&SelectedPoe=" + poeid;
}
function UnsubscribeLogin(data) {
    var poeid = parseInt((data).id.replace("poeli", ""));
    window.location = "/Signup/Poelibrary?location=newPoe&SelectedPoe=" + poeid;
}
function GetUsersPoesArrangement(poeid) {
    Common.ajaxsync({
        url: "/sync/GetUsersPoesArrangement",
        data: { 'poeid': poeid },
        success: function (response) {
            if (response != null) {
                $('#Synctype').val(response);
            }
        },
        error: function () {
        }
    });
}