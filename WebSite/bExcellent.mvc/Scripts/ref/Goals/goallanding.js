var sync = {
    getuserRoles: function () {
        var type = 0;
        Common.ajaxsync({
            url: '/Standing/GetUserRoles',
            success: function (response) {
                $('.stiles').hide();
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
                $('#poelist1').html(html);
                $('.scroll2').slimScroll();
                poelist(poeids, html, response[0].POEId, response.length);
            },
            error: function () {
            }
        });
    },

    setSelectedPoe: function (poe) {
        debugger;
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
    var html = "<li value='1' id='cyou'><span> <img src='../../Images/icons/self-small.png' /></span><p> Self</p> </li>" +
        " <li  value='2' id='cteam'><span> <img src='../../Images/icons/team-small.png' /></span><p> Team </p></li>";
    $('#target ul').html(html);
    $('#target ul li').live('click', function () {
        var ctrl = $(this);
        sync.getuserPoeByType(ctrl.val());
        $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).addClass("selected");
        $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).siblings().removeClass("selected");
    });
    $('.pane').find('input[type=radio]:checked').removeAttr('checked');
    $("#n" + $(this).context.title).attr('checked', 'checked');
    $('.stiles').live('click', function () {
        $('#stilesClick').val(1);
        var ctrl = $(this);
        debugger;
       // $("#status,#preloader").delay(100).fadeIn("slow", function () {
             sync.getuserPoeByType(ctrl.attr('value'));                                   // Change Second ctrl.val()
             if ($(this).find('.selfStd').attr('id') == "youSelect") {
                 $(this).find('.selfStd').addClass("selectSelf");
                 $('#teamSelect').removeClass("selectTeam");
             }
             $("#status").fadeOut();
             if ($(this).find('.teamStd').attr('id') == "teamSelect") {
                 $(this).find('.teamStd').addClass("selectTeam");
                 $('#youSelect').removeClass("selectSelf");
             }
             $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
        //});
    });
    var t = $('.stiles').first();
    //t.addClass('selected');
    t.find('.selfStd').addClass('selectSelf');                                               // Change Third t.addClass('selected');

    //sync.getuserPoeByType(t.val());
    $('.poelistli').live('click', function () {
        debugger;
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
    $('#bigpic').live('click', function () {
        window.location.href = "/sync/BigPicture";
    });
    $('#digin').live('click', function () {
        window.location.href = "/sync/PracticeAreas";
    });
    $('#digdeep').live('click', function () {
        window.location.href = "/sync/ExcellenceIndicators";
    });
    $('#digdeeper').live('click', function () {
        window.location.href = "/sync/TrackGoals";
    });
    $('#Goal').live('click', function () {
        window.location.href = "/Feedback/Goal";
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
    $('.scroll2').slimScroll();
    $('.scroll1').slimScroll();
    //}, 2000);
});
function poelist(poeids, html, firstid, poeLength) {
    var html2 = "";

    Common.ajaxtxt({
        url: "/StaticContents/PoeLibrary.txt",
        data: null,
        success: function (responses) {
            var poe = false;
            var comingsoon = "";
            var clickevent = "";
            var jsondata = $.parseJSON(responses);
            var poelist = poeids.split('%');
            var ownsub = $('#OwnSubStatusSync').val();
            var poeCount = 0;
            //for (var n = 0; n < 8; n++) {
            //    poe = false;
            //    for (var t = 0; t < poelist.length; t++) {
            //        if (jsondata[n].PoeOrder == poelist[t]) {
            //            poe = true;
            //        }
            //    }
            //    if (poe == false) {
            //        poeCount++;
            //        poe = true;
            //        if (jsondata[n].PoeStatus == 'Add') {
            //            comingsoon = "<div class='comingsoon'> <img src='../../Images/add-poe.png' width='49' height='47' alt='coming soon' /></div>";
            //            if (ownsub != 0) {
            //                clickevent = "CallPoelibrary(this)";
            //            } else {
            //                clickevent = "UnsubscribeLogin(this)";
            //            }
            //        }
            //        else {
            //            comingsoon = "<div class='comingsoon'> <img src='../../Images/coming-soon.png' width='49' height='47' alt='coming soon' /></div>";
            //            clickevent = "";
            //        }
            //        //if (jsondata[n].PoeOrder == 8) {
            //        //    comingsoon = "";
            //        //}
            //        html2 = html2 + " <li id ='poeli" + jsondata[n].PoeOrder + "'  class='poelistli' style='opacity:0.5;' onclick='" + clickevent + "' ><a> <div class='icon'> <img src='../../Images/" + jsondata[n].ImagePath + ".png' alt='' class='img' /></div>" + comingsoon + " <p> " + jsondata[n].PoeName + "</p> </a><span></span></li>";
            //    }
            //}
            for (var n = 0; n < 4; n++) {
                poe = false;
                for (var t = 0; t < poelist.length; t++) {
                    if (jsondata[n].PoeOrder == poelist[t]) {
                        poe = true;
                    }
                }
                if (poe == false) {
                    poeCount++;
                    poe = true;
                    if (jsondata[n].PoeStatus == 'Add') {
                        comingsoon = "<div class='comingsoon'> <img src='../../Images/add-poe.png' width='49' height='47' alt='coming soon' /></div>";
                        if (ownsub != 0) {
                            clickevent = "CallPoelibrary(this)";
                        } else {
                            clickevent = "UnsubscribeLogin(this)";
                        }
                    }
                    else {
                        comingsoon = "<div class='comingsoon'> <img src='../../Images/coming-soon.png' width='49' height='47' alt='coming soon' /></div>";
                        clickevent = "";
                    }
                    //if (jsondata[n].PoeOrder == 8) {
                    //    comingsoon = "";
                    //}
                    html2 = html2 + " <li id ='poeli" + jsondata[n].PoeOrder + "'  class='poelistli' style='opacity:0.5;' onclick='" + clickevent + "' ><a> <div class='icon'> <img src='../../Images/" + jsondata[n].ImagePath + ".png' alt='' class='img' /></div>" + comingsoon + " <p> " + jsondata[n].PoeName + "</p> </a><span></span></li>";
                }
            }
            for (var n = 4; n < 9; n++) {
                poe = false;
                for (var t = 0; t < poelist.length; t++) {
                    if (jsondata[n].PoeOrder == poelist[t]) {
                        poe = false;
                    }
                }
                if (poe == false) {
                    poeCount++;
                    poe = true;
                    if (jsondata[n].PoeStatus == 'Add') {
                        comingsoon = "<div class='comingsoon'> <img src='../../Images/add-poe.png' width='49' height='47' alt='coming soon' /></div>";
                        if (ownsub != 0) {
                            clickevent = "CallPoelibrary(this)";
                        } else {
                            clickevent = "UnsubscribeLogin(this)";
                        }
                    }
                    else {
                        comingsoon = "<div class='comingsoon'> <img src='../../Images/coming-soon.png' width='49' height='47' alt='coming soon' /></div>";
                        clickevent = "";
                    }
                    //if (jsondata[n].PoeOrder == 8) {
                    //    comingsoon = "";
                    //}
                    html2 = html2 + " <li id ='poeli" + jsondata[n].PoeOrder + "'  class='poelistli' style='opacity:0.5;' onclick='" + clickevent + "' ><a> <div class='icon'> <img src='../../Images/" + jsondata[n].ImagePath + ".png' alt='' class='img' /></div>" + comingsoon + " <p> " + jsondata[n].PoeName + "</p> </a><span></span></li>";
                }
            }
            $('#poelist2').html(html2);
            $('.scroll1').slimScroll();
            if (poeLength <= 4) {
                $('#poelist1').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
            } else {
                $('#poelist1').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                $('#poelist1').parents('.slimScrollDiv').find('.slimScrollBar').removeClass('dummy-slimscrollbar-backgound');
            }
            if ((poeCount) <= 4) {
                $('#poelist2').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
            } else {
                $('#poelist2').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                $('#poelist2').parents('.slimScrollDiv').find('.slimScrollBar').removeClass('dummy-slimscrollbar-backgound');
            }
            s = $('.poelistli:visible').first();
            // debugger;
            var selectedPoe = $('#selectedPoeValueSync').val();
            //var tileclicked = $('#stilesClick').val();

            if ($('#poeli' + selectedPoe).hasClass("poelistli")) {
                $('#poeli' + selectedPoe).addClass('selectArrow');
                sync.setSelectedPoe(selectedPoe);
            } else {
                $(s).addClass('selected');
                sync.setSelectedPoe(s.val());
            }
            
            

            //if (selectedPoe == 0 || tileclicked == 1) {
            //    $(s).addClass('selected');
            //    sync.setSelectedPoe(s.val());
            //} else {
            //    $('#poeli' + selectedPoe).addClass('selected');
            //    sync.setSelectedPoe(selectedPoe);
            //}
            

        
       },
        

        error: function () {
        }
    });
    return html2;
}
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