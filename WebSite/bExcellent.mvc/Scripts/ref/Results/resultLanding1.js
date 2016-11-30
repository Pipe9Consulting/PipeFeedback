
var standing = {
    getuserRoles: function () {
        Common.ajaxsync({
            url: '/Standing/GetUserRolesByProfile',
            success: function (response) {
                //debugger;
                $('.stiles').hide();
                for (var i = 0; i < response.length; i++) {
                    switch (response[i].RoleId) {
                        case 1:
                            // $('#self').show();
                            $('#tm').show();
                            $('#ctm').show();
                            break;
                        case 2:
                            $('#self').show();
                            $('#mgr').show();
                            $('#cself,#cmgr').show();
                            break;
                        case 3:
                            $('#self').show();
                            $('#skp').show();
                            $('#cself,#cskp').show();
                            break;
                        case 4:
                            $('#prtm').show();
                            $('#cprtm').show();
                            break;
                        case 5:
                            $('#self').show();
                            $('#prmgr').show();
                            $('#cself,#cprmgr').show();
                            break;
                        case 6:
                            $('#self').show();
                            $('#cust').show();
                            $('#cself,#ccust').show();
                            break;

                        default:
                            break;
                    }
                }
                var typevalue = $('#tileclick').val();
                //alert(typevalue);
                var role = 0;
                if (typevalue != 0) {
                    $('.stiles').each(function () {

                        //debugger;
                        var value = $(this).attr('data-value');
                        var hvrClass = $(this).attr('data-class');
                        if (value == typevalue) {
                            $(this).addClass('selectedStiles');
                            $(this).addClass(hvrClass);
                            //$('.stiles').each(function () {
                            //    $(this).find('img').attr("src", "../../../Images/images/Feedback/IconHover" + ($(this).index()) + ".png");
                            //});
                            //var image = "../../../Images/images/Feedback/IconHover" + ($(this).index()) + "_selected.png";
                            //$(this).find('img').attr("src", image);

                            role = $(this).attr('value');
                        } else {
                            $(this).removeClass('selectedStiles');
                            $(this).removeClass(hvrClass);
                        }
                        sideText(typevalue);
                    });
                    if (!$('.selectedStiles').is(':visible')) {
                        //alert("ss");
                        var t = $('.stiles:visible').first();
                        var hvrClass = $(t).attr('data-class');
                       // alert(hvrClass);
                        $(t).addClass('selectedStiles');
                        $(t).addClass(hvrClass);
                        standing.setSelectedTile(parseInt(t.data('value')));
                    } else {
                        standing.setSelectedTile(typevalue);
                    }
                    //if()
                    //var t = $('.stiles:visible').first();
                    //standing.getuserPoeByRoles(role, typevalue);

                } else {
                    //debugger;
                   // alert("kd");
                    var t = $('.stiles:visible').first();
                    var hvrClasss = $(t).attr('data-class');
                    $(t).addClass(hvrClasss);
                    //standing.getuserPoeByRoles(t.attr('value'), parseInt(t.data('value')));
                    standing.setSelectedTile(parseInt(t.data('value')));
                    sideText(t.data('value'));
                    $(t).addClass('selectedStiles');
                    $('.stiles').each(function () {
                        $(this).find('img').attr("src", "../../../Images/images/Feedback/IconHover" + ($(this).index()) + ".png");
                    });
                    var image = "../../../Images/images/Feedback/IconHover" + ($(t).index()) + "_selected.png";
                    $(t).find('img').attr("src", image);
                    role = $(this).attr('value');
                }

                var visibleLength = $('.stiles:visible').length;
                if ($('.tmmenu').is(':visible')) {
                    visibleLength = visibleLength + 1;
                }
                var showdummytile = (visibleLength % 2);
                if (showdummytile != 0) {
                    $('#dummyTile').show();
                } else {
                    $('#dummyTile').hide();
                }
            },
            error: function (err) {
            }
        });
    },
    getuserRolesByProfile: function () {
        Common.ajaxsync({
            url: '/Standing/GetUserRolesByProfile',
            success: function (response) {

                $('.stiles').hide();
                for (var i = 0; i < response.length; i++) {
                    switch (response[i].RoleId) {
                        case 1:
                            // $('#self').show();
                            $('#tm').show();
                            $('#ctm').show();
                            break;
                        case 2:
                            $('#self').show();
                            $('#mgr').show();
                            $('#cself,#cmgr').show();
                            break;
                        case 3:
                            $('#self').show();
                            $('#skp').show();
                            $('#cself,#cskp').show();
                            break;
                        case 4:
                            $('#prtm').show();
                            $('#cprtm').show();
                            break;
                        case 5:
                            $('#self').show();
                            $('#prmgr').show();
                            $('#cself,#cprmgr').show();
                            break;
                        case 6:
                            $('#self').show();
                            $('#cust').show();
                            $('#cself,#ccust').show();
                            break;

                        default:
                            break;
                    }
                }

                var visibleLength = $('.stiles:visible').length;
                if ($('.tmmenu').is(':visible')) {
                    visibleLength = visibleLength + 1;
                }
                var showdummytile = (visibleLength % 2);
                if (showdummytile != 0) {
                    $('#dummyTile').show();
                } else {
                    $('#dummyTile').hide();
                }
            },
            error: function (err) {
            }
        });
    },
    getuserPoeByRoles: function (role, tileclicked) {
        // debugger;
        Common.ajaxsync({
            url: '/Result/GetUsersPoeByRole?role=' + role + '&tileclicked=' + tileclicked,
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
                poelist(poeids, html, response[0].POEId, response.length);
            },
            error: function (err) {
            }
        });
    },
    setSelectedTile: function (tileclicked) {
        // debugger;
        Common.ajaxsync({
            url: '/Result/SetTileClicked?tileclicked=' + tileclicked,
            success: function (response) {
                $('#tileclick').val(tileclicked);
            },
            error: function (err) {
            }
        });
    },
    getuserPoe: function () {
        // debugger;
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
                var t = $('.poelistli:visible').first();
                var selectedPoe = $('#selectedPoeValueStanding').val();
                var tileclicked = $('#StandingTilesclick').val();
                //alert($('#poeli' + selectedPoe).length);
                if (selectedPoe == 0 || $('#poeli' + selectedPoe).length == 0) {
                    // debugger;
                    t.addClass('selected selectArrow');
                    standing.setSelectedPoe(t.attr('value'));
                    standing.GetTileScore(t.attr('value'));
                    standing.GetSelectedTile();


                } else {
                    //debugger;
                    $('#poeli' + selectedPoe).addClass('selected selectArrow');
                    standing.setSelectedPoe(selectedPoe);
                    standing.GetTileScore(selectedPoe);
                    standing.GetSelectedTile();
                    $('div.takeFeedbackLeft div.selectedval').click();

                }
                //poelist(poeids, html, response[0].POEId, response.length);
            },
            error: function (err) {
            }
        });
    },
    setSelectedPoe: function (poe) {
        // debugger;
        Common.ajaxsync({
            url: '/Result/SetSelectedPoe?poe=' + poe,
            success: function (response) {

            },
            error: function (err) {
            }
        });
    },


    GetTileScore: function (poe) {

        Common.ajaxsync({
            url: '/Result/LoadTileScore?poe=' + poe,
            success: function (response) {

                $('#selfscore').html(response.You.WcsiScore);
                $('#managerScore').html(response.Previous.WcsiScore);
                $('#teammemberscore').html(response.TeamMember.WcsiScore);
                $('#SkipMangerScore').html(response.SkipLevelmanager.WcsiScore);
                $('#customerscore').html(response.CustomerPartner.WcsiScore);
                $('#peergivenScore').html(response.PeerManager.WcsiScore);
                $('#peerTakenScore').html(response.PeerTeamMember.WcsiScore);
                $("#status").fadeOut();
                $("#preloader").delay(1000).fadeOut("slow");
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
    },
    GetPoeSelectedValue: function (poeid) {
        Common.ajaxsync({
            url: '../Result/GetUsersPoeByRoleAssignTile',
            data: { 'poeid': poeid },
            success: function (response) {
                if (response != null) {
                    $('#tileclick').val(response);
                }
            },
            error: function (err) {
            }
        });
    },
    GetSelectedTile: function () {
        Common.ajaxsync({
            url: '../Result/GetClicked',
            success: function (response) {
                if (response != null) {
                    // alert(response);
                    $('#tileclick').val(response);
                }
            },
            error: function (err) {
            }
        });
    }
};


$(document).ready(function () {



    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    Common.setTopMenu(5);

    var selectedPoe = $('#selectedPoeValueStanding').val();
    var tempVal = 0;

    if (selectedPoe != 0) {
        $('#tileclick').val(0);
        standing.GetSelectedTile();
        if ($('#tileclick') == 0) {
            standing.GetPoeSelectedValue(selectedPoe);
        }
        tempVal = 1;
    }
    standing.getuserPoe();
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
    $("#nResult").attr('checked', 'checked');
    $("#nResult").parent().find('img').attr('src', '../../Images/icons/result_Icon_h.png');
    //if (tempVal == 1) {
    //setTimeout(function () {
    standing.getuserRoles();
    //}, 1000);
    // } else {
    //standing.getuserRoles();
    //}






    $('.stiles').live('click', function () {
        //debugger;
        $(this).addClass('selectedStiles');
        $(this).siblings().removeClass('selectedStiles');

      
        $('.stiles').each(function () {
            var hvrclassIn = $(this).attr('data-class');
            $(this).removeClass(hvrclassIn);
            //$(this).find('img').attr("src", "../../../Images/images/Feedback/IconHover" + ($(this).index()) + ".png");
        });
        //var image = "../../../Images/images/Feedback/IconHover" + ($(this).index()) + "_selected.png";
        //$(this).find('img').attr("src", image);

        var hvrclass = $(this).attr('data-class');
        $(this).addClass(hvrclass);

        var ctrl = $(this);
        standing.setSelectedTile(parseInt(ctrl.data('value')));

        sideText(ctrl.data('value'));

        //$("#status,#preloader").delay(100).fadeIn("slow", function () {
        $('#StandingTilesclick').val(1);
        //standing.getuserPoeByRoles(ctrl.attr('value'), parseInt(ctrl.data('value')));


        //$("#status").fadeOut();
        //$("#preloader").delay(100).fadeOut("slow");
        //});
    });
    $('#target ul li').live('click', function () {
        //debugger
        var ctrl = $(this);
        standing.getuserPoeByRoles($('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).val(), parseInt($('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).data('value')));
        //$('.stiles').each(function () {
        $('.stiles').each(function () {
            $(this).find('img').attr("src", "../../../Images/images/Feedback/IconHover" + ($(this).index()) + ".png");
        });

        var valid = $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).attr('tabindex');

        if (valid == 0)
        { $('#self').find('img').attr('src', '../../../Images/images/Feedback/IconHover' + valid + '_selected.png'); }
        if (valid == 1)
        { $('#mgr').find('img').attr('src', '../../../Images/images/Feedback/IconHover' + valid + '_selected.png'); }
        if (valid == 2)
        { $('#tm').find('img').attr('src', '../../../Images/images/Feedback/IconHover' + valid + '_selected.png'); }
        if (valid == 3)
        { $('#skp').find('img').attr('src', '../../../Images/images/Feedback/IconHover' + valid + '_selected.png'); }
        if (valid == 4)
        { $('#cust').find('img').attr('src', '../../../Images/images/Feedback/IconHover' + valid + '_selected.png'); }
        if (valid == 5)
        { $('#prtm').find('img').attr('src', '../../../Images/images/Feedback/IconHover' + valid + '_selected.png'); }
        if (valid == 6)
        { $('#prmgr').find('img').attr('src', '../../../Images/images/Feedback/IconHover' + valid + '_selected.png'); }


        //switch (valid) {

        //    case 0:
        //        $('#self').find('img').attr('src', '../../../Images/images/Feedback/IconHover' + valid + '_selected.png');
        //        break;

        //    case 1:
        //        $('#mgr').find('img').attr('src', '../../../Images/images/Feedback/IconHover' + valid + '_selected.png');
        //        break;
        //    case 2:
        //        $('#tm').find('img').attr('src', '../../../Images/images/Feedback/IconHover' + valid + '_selected.png');
        //        break;
        //    case 3:
        //        $('#skp').find('img').attr('src', '../../../Images/images/Feedback/IconHover' + valid + '_selected.png');
        //        break;
        //    case 4:
        //        $('#cust').find('img').attr('src', '../../../Images/images/Feedback/IconHover' + valid + '_selected.png');
        //        break;
        //    case 5:
        //        $('#prtm').find('img').attr('src', '../../../Images/images/Feedback/IconHover' + valid + '_selected.png');
        //        break;
        //    case 6:
        //        $('#prmgr').find('img').attr('src', '../../../Images/images/Feedback/IconHover' + valid + '_selected.png');
        //        break;

        //    //default:
        //    //    break;
        //}





        //var image = "../../../Images/images/Feedback/IconHover" + id + "_selected.png";
        //$(this).find('img').attr("src", image);
        //});

        $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).addClass("selectedStiles");
        $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).siblings().removeClass("selectedStiles");
        //$(this).addClass('selectedStiles');
        //$(this).siblings().removeClass('selectedStiles');
        //$('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).find('img').attr('src')
    });
    $('.poelistli').live('click', function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        var ctrl = $(this);
        var getValue = $(this).val();
        $("#status,#preloader").delay(100).fadeIn("slow",
            function () {
                if (getValue != 0) {
                    ctrl.addClass("selected selectArrow");
                    ctrl.siblings().removeClass("selected selectArrow");
                    standing.setSelectedPoe(ctrl.val());
                    standing.getuserRoles();
                    standing.GetTileScore(ctrl.val());
                }
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
            });
    });
    $('.fblfristBox a').live('click', function () {
        window.location.href = "/FeedbackResults/BigPicture";
    });
    $('.fblsecondBox a').live('click', function () {
        window.location.href = "/FeedbackResults/PracticeAreas";
    });
    $('.fblthirdBox a').live('click', function () {
        window.location.href = "/FeedbackResults/ExcellenceActions";
    });
    $('.scroll1').slimScroll();
    var selpoe = $('#selectedPoeValueStanding').val();
    if (selpoe == "0") {
        selpoe = $('.poelistli:first').val()
    }
    if ($('#poelist1 li').length > 4) {
        $('.scroll2').slimScroll({
            start: $('#poeli' + selpoe)
        });
    }
    $("#status").fadeOut();
    $("#preloader").delay(100).fadeOut("slow");
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

            var t = $('.poelistli:visible').first();
            var selectedPoe = $('#selectedPoeValueStanding').val();
            var tileclicked = $('#StandingTilesclick').val();

            if (selectedPoe == 0 || $('#poeli' + selectedPoe).length == 0) {
                // debugger;
                t.addClass('selected selectArrow');
                standing.setSelectedPoe(t.attr('value'));
                standing.GetTileScore(t.attr('value'));
                standing.GetSelectedTile();


            } else {
                //debugger;
                $('#poeli' + selectedPoe).addClass('selected selectArrow');
                standing.setSelectedPoe(selectedPoe);
                standing.GetTileScore(selectedPoe);
                standing.GetSelectedTile();
                $('div.takeFeedbackLeft div.selectedval').click();

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

function sideText(value) {
    if (parseInt(value) == 1) {
        $('#explanationText').text(" – Based on Self-Feedback");
    } else
        if (parseInt(value) == 2) {
            $('#explanationText').text(" – Based on Feedback provided by your Manager");
        } else if (parseInt(value) == 3) {
            $('#explanationText').text(" – Based on Feedback provided to your Team Members");
        } else if (parseInt(value) == 4) {
            $('#explanationText').text(" – Based on Feedback provided by your Skip-Level Manager");
        } else {
            $('#explanationText').text(" ");
        }
   // return 0;
}