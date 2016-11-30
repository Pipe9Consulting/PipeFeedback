var sync = {
    getuserRoles: function () {
        var type = 0;
        Common.ajaxsync({
            url: '/Standing/GetUserRolesByProfile',
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
                var visibleTiles = $('.stiles:visible').length;
                if (visibleTiles != 2) {
                    if($('#you').is(':visible')) {
                        $("#you").addClass('oneTile');

                        $('.stiles').find('.selfStd').find('img').attr("src", "../Images/images/feedback/selfIconHover.png");
                    } else {
                        $('.stiles').find('.teamStd').find('img').attr("src", "../Images/images/feedback/teamMemberIconHover.png");
                        $("#team").addClass('oneTile');
                    }
                } else {
                    $("#team").removeClass('oneTile');
                    $("#you").removeClass('oneTile');
                    $('.stiles').find('.selfStd').find('img').attr("src", "../Images/images/feedback/selfIconHover.png");
                }
                if (type == 2) {
                    $('#teamSelect').addClass("selectTeam");
                }
                
                

                var typevalue = $('#Synctype').val();
                //alert(typevalue);
                var tileclicked = $('#stilesClick').val();
               // debugger;
                if (typevalue != 0) {
                    type = typevalue;
                    $('.stiles').each(function () {
                        var value = $(this).attr('value');            //Change First $(this).val()
                        if (value == typevalue) {
                            $(this).click();
                            $(this).addClass('selected');
                        }
                    });
                    sync.setSelectedType(parseInt(typevalue));
                } else {
                    var stile = $('.stiles:visible').first();
                    stile.click();
                    sync.setSelectedType(parseInt(stile.attr('value')));
                }
                //var t = $('.stiles:visible').first();
                //t.addClass('selected');
                //$(t).click();
                
               // alert($('.selected').is(':visible'));
               // sync.getuserPoeByType(type);
            },
            error: function () {
            }
        });
    },
    //getuserPoeByType: function (type) {
    //    Common.ajaxsync({
    //        url: '/sync/GetUsersPoeByRole?type=' + type,
    //        success: function (response) {
    //            var html = '';
    //            var poeids = '';
    //            for (var i = 0; i < response.length; i++) {
    //                html = html + " <li id ='poeli" + response[i].POEId + "' value=" + response[i].POEId + " class='poelistli'><a> <div class='icon'> <img src='../../Images/" + response[i].Name.replace("&", "") + "_Intro.png' alt='" + response[i].Name + "' class='img' /></div> <p> " + response[i].Name + "</p> </a><span></span></li>";
    //                poeids = poeids + response[i].POEId + '%';
    //            }
    //            if (response.length < 4) {
    //                for (var p = response.length; p < 4; p++) {
    //                    html = html + " <li class='poelistlidummy' style='cursor:default'></li>";
    //                }
    //            }


    //            if (response.length > 4) {
    //                if (response.length % 2 == 1) {
    //                    html = html + " <li class='poelistlidummy' style='cursor:default'></li>";
    //                }
    //            }


    //            $('#poelist1').html(html);
    //            var selpoe = $('#selectedPoeValueSync').val();
    //            if (selpoe == "0") {
    //                selpoe = $('.poelistli:first').val()
    //            }
    //            if ($('#poelist1 li').length > 4) {
    //                $('.scroll2').slimScroll({
    //                    start: $('#poeli' + selpoe)
    //                });
    //            }
    //            //$('.scroll2').slimScroll();
    //            poelist(poeids, html, response[0].POEId, response.length);
    //        },
    //        error: function () {
    //        }
    //    });
    //},
    getuserPoe: function () {
        Common.ajaxsync({
            url: '/Common/GetNetworkSubscribedPoes',
            success: function (response) {
                var html = '';
                var poeids = '';
                for (var i = 0; i < response.length; i++) {
                    html = html + " <li id ='poeli" + response[i].POEId + "' value=" + response[i].POEId + " class='poelistli'><a> <div class='icon'> <img src='../../Images/" + response[i].POEName.replace("&", "") + "_Intro.png' alt='" + response[i].POEName + "' class='img' /></div> <p> " + response[i].POEName + "</p> </a><span></span></li>";
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
                //$('.scroll2').slimScroll();
                poelist(poeids, html, response[0].POEId, response.length);
            },
            error: function () {
            }
        });
    },
    setSelectedPoe: function (poe) {
        //debugger;
        Common.ajaxsync({
            url: '/sync/SetSelectedPoe?poe=' + poe,
            success: function () {
                //sync.SetWcsiDiff();
            },
            error: function () {
            }
        });
    },
    setSelectedType: function (type) {
        //debugger;
        Common.ajaxsync({
            url: '/sync/SetSelectedType?type=' + type,
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
    GetClicked: function () {
        Common.ajaxsync({
            url: "/sync/GetClicked",
            success: function (response) {
                if (response != null) {
                    $('#Synctype').val(response);
                }
            },
            error: function () {
            }
        });
        //return output;
    },
};
$(document).ready(function () {
    changeLandingContent(1);
    var selectedPoe = $('#selectedPoeValueSync').val();
    var tempval = 0;
    Common.setTopMenu(4);
    if (selectedPoe != 0) {
        $('#Synctype').val(0);
        sync.GetClicked();
        setTimeout(function () {
            tempval = 1;
           
           
            if ($('#Synctype').val() == 0) {
                GetUsersPoesArrangement(selectedPoe);
            }
            
            
        }, 50);
    }
    sync.getuserPoe();
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    //$('.scroll1').slimScroll();

    sync.IsOwnSubscribtion();
    var html = "<li value='1' id='cyou'><span> <img src='../../Images/icons/self-small.png' /></span><p> Self</p> </li>" +
        " <li  value='2' id='cteam'><span> <img src='../../Images/icons/team-small.png' /></span><p> Team </p></li>";
    $('#target ul').html(html);
    $('#target ul li').live('click', function () {
        var ctrl = $(this);
        sync.getuserPoeByType(ctrl.val());
        if ($('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().attr('id') == "youSelect") {
            $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().addClass("selectSelf");
            $('#teamSelect').removeClass("selectTeam");
        }
        $("#status").fadeOut();
        if ($('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().attr('id') == "teamSelect") {
            $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().addClass("selectTeam");
            $('#youSelect').removeClass("selectSelf");
        }

        //$('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).addClass("selected");
        //$('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).siblings().removeClass("selected");
    });
    $('.pane').find('input[type=radio]:checked').removeAttr('checked');
    $("#n" + $(this).context.title).attr('checked', 'checked');
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/start-sync_h.png');
   
    $('.stiles').live('click', function () {
        $('#stilesClick').val(1);
        var ctrl = $(this);
        sync.setSelectedType(parseInt(ctrl.attr('value')));
        //debugger;
       // $("#status,#preloader").delay(100).fadeIn("slow", function () {
             //sync.getuserPoeByType(ctrl.attr('value'));                                   // Change Second ctrl.val()
             if ($(this).find('.selfStd').attr('id') == "youSelect") {
                 $(this).find('.selfStd').find('img').attr("src", "../Images/images/feedback/selfIconHover.png");
                 $('.stiles').find('.teamStd').find('img').attr("src", "../Images/images/feedback/teamMemberIcon.png");
                 $(this).find('.selfStd').addClass("selectSelf");
                 $('#teamSelect').removeClass("selectTeam");
                 $('#explanationText').html(" - Self-Feedback compared with the Feedback provided by your Manager");
             }
             $("#status").fadeOut();
             if ($(this).find('.teamStd').attr('id') == "teamSelect") {
                 $(this).find('.teamStd').find('img').attr("src", "../Images/images/feedback/teamMemberIconHover.png");
                 $('.stiles').find('.selfStd').find('img').attr("src", "../Images/images/feedback/selfIcon.png");
                 $(this).find('.teamStd').addClass("selectTeam");
                 $('#youSelect').removeClass("selectSelf");
                 $('#explanationText').html(" - Team-Feedback compared to the Self-Feedback completed by your Team Members");
             }
             $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
        //});
            changeLandingContent(parseInt(ctrl.attr('value')));
    });
    var t = $('.stiles').first();
    //t.addClass('selected');
    t.find('.selfStd').addClass('selectSelf');                                               // Change Third t.addClass('selected');

    //sync.getuserPoeByType(t.val());
    $('.poelistli').live('click', function () {
        //debugger;
        var ctrl = $(this);
        var viewVal = $(this).val();
       // $("#status,#preloader").delay(100).fadeIn("slow", function () {
            if (viewVal != 0) {
                ctrl.addClass("selectArrow");
                $('#Synctype').val(0);
                ctrl.siblings().removeClass("selectArrow");
                sync.setSelectedPoe(ctrl.val());
                sync.getuserRoles();
                $('#selectedPoeValueSync').val(ctrl.val());
            }
        //});
        hideTilesFuncSS();
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    });
    $('#bpSync').live('click', function () {
        window.location.href = "/managersync/BigPicture";
    });
    $('#paSync').live('click', function () {
        window.location.href = "/managersync/PracticeAreas";
    });
    $('#eaSync').live('click', function () {
        window.location.href = "/managersync/ExcellenceIndicators";
    });
    $('#digdeeper').live('click', function () {
        window.location.href = "/Goal/TrackGoals";
    });
    $('#Goal').live('click', function () {
        window.location.href = "/Goal/SetGoals";
    });
    //if (tempval == 1) {
    //    // setTimeout(function() {
    //    sync.getuserRoles();
    //    sync.getfbtype();
    //    sync.getfbPoe();
    //    // }, 3000);
    //} else {
    //    sync.getuserRoles();
    //    sync.getfbtype();
    //    sync.getfbPoe();
    //}
    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
    //setTimeout(function () {
    $('.scroll2').slimScroll();
    $('.scroll1').slimScroll();
    //$('#poeli13').click();
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
                //hideTilesFuncSS();
                $('#poeli' + selectedPoe).click();
            } else {
                $(s).addClass('selectArrow');
                sync.setSelectedPoe(s.val());
                $(s).click();
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
function GetTileClicked() {
    Common.ajaxsync({
        url: "/sync/GetClicked",
        success: function (response) {
            if (response != null) {
                $('#Synctype').val(response);
            }
        },
        error: function () {
        }
    });
}
function changeLandingContent(type) {
    //alert(type);
    if(type==1) {
        $('#bigPicCont').text("Compare Self-Feedback results with Team-Feedback results at the overall level.");
        $('#practiceAreaCont').text("Compare Self-Feedback results with Team-Feedback results at the Practice Area level");
        $('#excellenceIndicatorCont').text("Compare Self-Feedback results and Team-Feedback results at the Excellence Action level.");
    } else {
        $('#bigPicCont').text("View Self-Feedback results at the overall level compared to Manager Feedback.");
        $('#practiceAreaCont').text("View Self-Feedback results by Practice Area compared to Manager Feedback. Identify Sync gaps to discuss during coaching conversations.");
        $('#excellenceIndicatorCont').text("View Feedback results by Excellence Action compared to Manager Feedback. Identify Sync gaps to discuss during coaching conversations.");
    }
}
function hideTilesFuncSS() {
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
                $('.managerSync').addClass('startManagerNoOver');
                $('.smalltilehide').addClass('startSmallTile');
                $('.communitySync').addClass('startSyncNoOver');
                $('.bigtilehides').addClass('hideColumn');
                $('.sync').addClass('SelecDisable');
                $('.goal').addClass('SelecDisable');
                $('.standing').addClass('SelecDisable');
                $('.viewResults').addClass('startArrowHide');
                $('.plandevelopment').addClass('startArrowHide');
            } else {
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
        },
        error: function () {
        }
    });
}