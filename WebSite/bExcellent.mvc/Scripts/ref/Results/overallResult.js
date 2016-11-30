
var standing = {
    
   
    getuserPoe: function () {
        //debugger;
        Common.ajaxsync({
            url: '/Common/GetNetworkSubscribedPoes',
            success: function (response) {
                //debugger;
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
                var selpoe = $('#selectedPoeValueStanding').val();
                //alert($('#poeli' + selpoe).length);
                if (selpoe == "0") {
                    selpoe = $('.poelistli:first').val();
                    //$('#poeli' + selpoe).addClass('selected selectArrow');
                    //standing.setSelectedPoe(selpoe);
                }
                if ($('#poelist1 li').length > 4) {
                    $('.scroll2').slimScroll({
                        start: $('#poeli' + selpoe)
                    });
                }
                poelist(poeids, html, response[0].POEId, response.length);
            },
            error: function (err) {
            }
        });
    },

    setSelectedPoe: function (poe) {
        // debugger;
        Common.ajaxsync({
            url: '/Standing/SetSelectedPoe?poe=' + poe,
            success: function (response) {
            },
            error: function (err) {
            }
        });
    },
   

    IsOwnSubscribtion: function () {
        $('#sliderbtn').html('');
        Common.ajaxsync({
            url: '../../Common/IsMyOwnSubscription',
            success: function (response) {
                if (response != false) {
                    $('#OwnSubStatus').val(1);
                }
            },
            error: function (err) {
            }
        });
    }
};


$(document).ready(function () {
    //debugger;


    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    //var selectedPoe = $('#selectedPoeValueStanding').val();
    //var tempVal = 0;
    //if (selectedPoe != 0) {
    //    standing.GetPoeSelectedValue(selectedPoe);
    //    tempVal = 1;
    //}
    //else {
    standing.getuserPoe();
    //
    var html = "<li id='cself' value='1'><span><img src='/Images/Icons/self-small.png'/></span><p>Self</p> </li> " +
        "<li id='cmgr' value='2'><span><img src='/Images/Icons/manager-small.png'/></span><p> Managers </p></li>" +
        "<li id='ctm' value='2'><span><img src='/Images/Icons/team-small.png'/></span><p> Team Members</p> </li>" +
        "<li id='cskp' value='3'><span><img src='/Images/Icons/skip-level-small.png'/></span><p> Skip Level Managers</p> </li>" +
        "<li id='ccust' value='6'><span><img src='/Images/Icons/customer-small.png'/></span><p>Customers & Partners</p> </li>" +
        "<li id='cprtm' value='4'><span><img src='/Images/Icons/peer-small.png'/></span><p>Peers (Feedback Given)</p> </li>" +
        "<li id='cprmgr' value='5'><span><img src='/Images/Icons/peer-small.png'/></span> <p> Peers (Feedback Taken)</p> </li>";

    $('#target ul').html(html);
    $('#cself,#cmgr,#ctm,#cskp,#ccust,#cprtm,#cprmgr').hide();
    standing.IsOwnSubscribtion();
    $('.pane').find('input[type=radio]:checked').removeAttr('checked');
    $("#n" + $(this).context.title).attr('checked', 'checked');
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/start-standing_h.png');
    //if (tempVal == 1) {
    //    //setTimeout(function () {
    //    standing.getuserRoles();

    //    //}, 3000);
    //} else {
    //    standing.getuserRoles();
    //}


   
   
    $('#target ul li').live('click', function () {
        //debugger
        var ctrl = $(this);
        standing.getuserPoeByRoles($('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).attr('value'), parseInt($('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).attr('data-value')));
        if ($('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().attr('id') == "selfSelect") {
            $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().addClass("selectSelf");
            $('#mgrSelect').removeClass("selectManager");
            $('#tmSelect').removeClass("selectTeam");
            $('#skpSelect').removeClass("selectSkip");
            $('#custSelect').removeClass("selectPartners");
            $('#prtmSelect').removeClass("selectPeers");
            $('#prmgrSelect').removeClass("selectPeers");
        }
        $("#status").fadeOut();
        if ($('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().attr('id') == "mgrSelect") {
            $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().addClass("selectManager");
            $('#tmSelect').removeClass("selectTeam");
            $('#skpSelect').removeClass("selectSkip");
            $('#custSelect').removeClass("selectPartners");
            $('#prtmSelect').removeClass("selectPeers");
            $('#prmgrSelect').removeClass("selectPeers");
            $('#selfSelect').removeClass("selectSelf");
        }
        $("#status").fadeOut();
        if ($('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().attr('id') == "tmSelect") {
            $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().addClass("selectTeam");
            $('#mgrSelect').removeClass("selectManager");
            $('#skpSelect').removeClass("selectSkip");
            $('#custSelect').removeClass("selectPartners");
            $('#prtmSelect').removeClass("selectPeers");
            $('#prmgrSelect').removeClass("selectPeers");
            $('#selfSelect').removeClass("selectSelf");
        }
        $("#status").fadeOut();
        if ($('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().attr('id') == "skpSelect") {
            $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().addClass("selectSkip");
            $('#mgrSelect').removeClass("selectManager");
            $('#tmSelect').removeClass("selectTeam");
            $('#custSelect').removeClass("selectPartners");
            $('#prtmSelect').removeClass("selectPeers");
            $('#prmgrSelect').removeClass("selectPeers");
            $('#selfSelect').removeClass("selectSelf");
        }
        $("#status").fadeOut();
        if ($('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().attr('id') == "custSelect") {
            $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().addClass("selectPartners");
            $('#mgrSelect').removeClass("selectManager");
            $('#tmSelect').removeClass("selectTeam");
            $('#skpSelect').removeClass("selectSkip");
            $('#prtmSelect').removeClass("selectPeers");
            $('#prmgrSelect').removeClass("selectPeers");
            $('#selfSelect').removeClass("selectSelf");
        }
        $("#status").fadeOut();
        if ($('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().attr('id') == "prtmSelect") {
            $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().addClass("selectPeers");
            $('#mgrSelect').removeClass("selectManager");
            $('#tmSelect').removeClass("selectTeam");
            $('#skpSelect').removeClass("selectSkip");
            $('#custSelect').removeClass("selectPartners");
            $('#prmgrSelect').removeClass("selectPeers");
            $('#selfSelect').removeClass("selectSelf");
        }
        $("#status").fadeOut();
        if ($('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().attr('id') == "prmgrSelect") {
            $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).children().children().addClass("selectPeers");
            $('#mgrSelect').removeClass("selectManager");
            $('#tmSelect').removeClass("selectTeam");
            $('#skpSelect').removeClass("selectSkip");
            $('#custSelect').removeClass("selectPartners");
            $('#prtmSelect').removeClass("selectPeers");
            $('#selfSelect').removeClass("selectSelf");

        }
        //$('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).addClass("selected");
        //$('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).siblings().removeClass("selected");
    });
    $('.poelistli').live('click', function () {
        //$("#status").fadeIn();
        //$("#preloader").delay(100).fadeIn("slow");
        var ctrl = $(this);
        var getValue = $(this).val();
        //$("#status,#preloader").delay(100).fadeIn("slow",
        //    function () {

        if (getValue != 0) {
            ctrl.addClass("selectArrow ");
            ctrl.siblings().removeClass("selectArrow ");
            standing.setSelectedPoe(ctrl.val());
            standing.getuserRoles();
            //standing.GetTileScore(ctrl.val());

        }
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
        //});
    });
    $('#bigpicclick').live('click', function () {
        window.location.href = "/communitysync/BigPicture";
    });
    $('#paclick').live('click', function () {
        window.location.href = "/communitysync/PracticeAreas";
    });
    $('#eaclick').live('click', function () {
        window.location.href = "/communitysync/ExcellenceIndicators";
    });
    $('.scroll1').slimScroll();
    //$('.scroll2').slimScroll();
    $("#status").fadeOut();
    $("#preloader").delay(100).fadeOut("slow");
    //$('#selfSelect').addClass("selectSelf");
    //$('div.takeFeedbackLeft div.selectedval').click();



});

function poelist(poeids, html, firstid, poelength) {
    //debugger;
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
            var ownsub = $('#OwnSubStatus').val();
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
            //        html2 = html2 + " <li id ='poeli" + jsondata[n].PoeOrder + "'  class='poelistli' onclick='" + clickevent + "' ><a> <div class='icon'> <img src='../../Images/" + jsondata[n].ImagePath + ".png' alt='' class='img' style='opacity:0.5;'/></div>" + comingsoon + " <p style='opacity:0.5;'> " + jsondata[n].PoeName + "</p> </a><span></span></li>";
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
            if ((poelength) <= 4) {
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
            //debugger;
            var t = $('.poelistli:visible').first();
            var selectedPoe = $('#selectedPoeValueStanding').val();
            //var tileclicked = $('#StandingTilesclick').val();
            var tileclicked = $('#tileclick').val();

            if (selectedPoe == 0 || $('#poeli' + selectedPoe).length == 0) {
                //debugger;
                t.addClass('selectArrow');
                standing.setSelectedPoe(t.attr('value'));
                hideTilesFuncRS();
                //standing.GetTileScore(t.attr('value'));
                

            } else {
                //debugger;
                $('#poeli' + selectedPoe).addClass('selectArrow');
                standing.setSelectedPoe(selectedPoe);
                hideTilesFuncRS();
               // standing.GetTileScore(selectedPoe);
                

            }
           
        },
        error: function (err) {
        }
    });

    return html2;

}
function CallPoelibrary(data) {
    // debugger;
    var poeid = parseInt((data).id.replace("poeli", ""));
    window.location = "/Signup/Poelibrary?location=Add&SelectedPoe=" + poeid;
}
function UnsubscribeLogin(data) {
    var poeid = parseInt((data).id.replace("poeli", ""));
    window.location = "/Signup/Poelibrary?location=newPoe&SelectedPoe=" + poeid;
}
function hideTilesFuncRS() {
   // alert("Am in");
    Common.ajaxsync({
        url: '/Common/GetPoeResultMode',
        success: function (response) {
           // alert(response.Status);
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