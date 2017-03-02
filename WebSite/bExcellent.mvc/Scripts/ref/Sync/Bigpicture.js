var bigpicture = {
    getMyNetworkUser: function () {
        Common.ajaxsync({
            url: '/sync/GetNetworkUsers',
            success: function (response) {
                var html = '';
                for (var i = 0; i < response.length; i++) {
                    var score = parseFloat(response[i].WcsiScoreDiff);
                    var scorestr = score > 0 ? "+" + score : score;
                    html = html + "  <li  id='usrli" + i + "' value=" + response[i].UserPOEMappingId + ">" +
                        "<div class='number' id='synavg" + response[i].UserPOEMappingId + "'>" +
                        (scorestr == "0" ? "" : scorestr) + "</div>" +
                         "<img class='syncu' src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                        "<p>" +
                        response[i].User.FirstName + " " + response[i].User.LastName +
                        "</p> " +
                        "</li>";
                }
                for (var j = i; j < 6; j++) {
                    html = html + '<li class="poelistlidummy" style="cursor:default"></li>';
                }

                $('#userList').html(html);
                if (response.length <= 6) {
                    $('#userList').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                } else {
                    $('#userList').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                }
                var t = $('#userList li').first();
                t.addClass('selected');
                if (parseInt($('#dasboardMapping').val()) != 0) {
                    $('#userList li').removeClass('selected');
                    $('#userList li').each(function () {
                        if (parseInt($('#dasboardMapping').val()) == $(this).val()) {
                            $(this).addClass('selected');
                        }
                    });
                    bigpicture.getSyncScore(parseInt($('#dasboardMapping').val()));
                } else {
                    bigpicture.getSyncScore(t.val());
                }
            },
            error: function (err) {
            }
        });
    },
    getSyncScore: function (userMappingId) {
        var pagemode = $('#moreBigPicture').val();
        var url = String.empty;
        if (pagemode == "1") {
            url = '/sync/GetSyncScoreByFbId?userMappingId=' + userMappingId;
        } else {
            url = '/sync/GetSyncScore?userMappingId=' + userMappingId;
        }
        Common.ajaxsync({
            url: url,//'/sync/GetSyncScore?userMappingId=' + userMappingId,
            success: function (response) {
                $('.childIndexName1').text(response.ChildIndexName1);
                $('.childIndexName2').text(response.ChildIndexName2);
                /*-----------------------------------------------------------------------------------------------*/
                /*Top all*/
                var type = $('#selectedType').val();
                if (type == 1) {
                    var topallChart = {
                        "values": [{
                            "name": "You",
                            "score": response.TScore.WcsiScore
                        },
                            {
                                "name": "Top",
                                "score": response.RScore.WcsiScore
                            }]
                    };
                    createchart.loadchartdata(topallChart, "all");
                    /*Top all end*/
                    /*Top exe*/
                    //var topexeChart = {
                    //    "values": [{
                    //        "name": "You",
                    //        "score": response.TScore.Childindex2Score
                    //    },
                    //        {
                    //            "name": "Top",
                    //            "score": response.RScore.Childindex2Score
                    //        }]
                    //};
                    //createchart.loadchartdata(topexeChart, "exe");
                    ///*Top exe end*/
                    ///*Top cap*/
                    //var topcapChart = {
                    //    "values": [{
                    //        "name": "You",
                    //        "score": response.TScore.Childindex1Score
                    //    },
                    //        {
                    //            "name": "Top",
                    //            "score": response.RScore.Childindex1Score
                    //        }]
                    //};
                    //createchart.loadchartdata(topcapChart, "cap");
                    ///*Top exe end*/
                    var d = $('.selected P').html();
                    $('.legend2').html(d);
                } else {
                    var topallChart = {
                        "values": [{
                            "name": "You",
                            "score": response.RScore.WcsiScore//
                        },
                            {
                                "name": "Top",
                                "score": response.TScore.WcsiScore
                            }]
                    };
                    createchart.loadchartdata(topallChart, "all");
                    /*Top all end*/
                    /*Top exe*/
                    //var topexeChart = {
                    //    "values": [{
                    //        "name": "You",
                    //        "score": response.RScore.Childindex2Score
                    //    },
                    //        {
                    //            "name": "Top",
                    //            "score": response.TScore.Childindex2Score
                    //        }]
                    //};
                    //createchart.loadchartdata(topexeChart, "exe");
                    ///*Top exe end*/
                    ///*Top cap*/
                    //var topcapChart = {
                    //    "values": [{
                    //        "name": "You",
                    //        "score": response.RScore.Childindex1Score
                    //    },
                    //        {
                    //            "name": "Top",
                    //            "score": response.TScore.Childindex1Score
                    //        }]
                    //};
                    //createchart.loadchartdata(topcapChart, "cap");
                    /*Top exe end*/
                    var d = $('.selected P').html();
                    $('.legend2').html(d);
                }
            },
            error: function (err) {
            }
        });
    }
};

var createchart = {
    loadchartdata: function (chart, element) {
        var x = chart.values.length;
        var marginBuffer = 11;
        for (var j = 0; j < x; j++) {
            if (x == 2) {
                //var calc = parseInt(chart.values[1].score) - parseInt(chart.values[0].score);
                var calc = 0;
                var mode = $('#selectedType').val();
                if (mode == 1) {
                    calc = parseInt(chart.values[1].score) - parseInt(chart.values[0].score);
                } else {
                    calc = parseInt(chart.values[0].score) - parseInt(chart.values[1].score);
                }
                var calcValue = (calc < 0) ? (calc * (-1)) : calc;
                $('#' + element + '').text(calcValue);
                //if ($('#' + element + '').hasClass('dwnstatus')) {
                //    var sclass = (calc < 0) ? "dwnstatus" : "status";
                //    $('#' + element + '').removeClass('dwnstatus');
                //    $('#' + element + '').addClass(sclass);
                //}
                //if ($('#' + element + '').hasClass('status')) {
                //    var sclass = (calc < 0) ? "dwnstatus" : "status";
                //    $('#' + element + '').removeClass('status');
                //    $('#' + element + '').addClass(sclass);
                //}
                if ($('#' + element + '').hasClass('dwnstatus')) {
                    var sclass = "midstatus";
                    if (calc != 0) {
                        sclass = (calc < 0) ? "dwnstatus" : "status";
                    }
                    $('#' + element + '').removeClass('dwnstatus');
                    $('#' + element + '').addClass(sclass);
                }
                if ($('#' + element + '').hasClass('status')) {
                    var sclass = "midstatus";
                    if (calc != 0) {
                        sclass = (calc < 0) ? "dwnstatus" : "status";
                    }
                    $('#' + element + '').removeClass('status');
                    $('#' + element + '').addClass(sclass);
                }
                if ($('#' + element + '').hasClass('midstatus')) {
                    var sclass = "midstatus";
                    if (calc != 0) {
                        sclass = (calc < 0) ? "dwnstatus" : "status";
                    }
                    $('#' + element + '').removeClass('midstatus');
                    $('#' + element + '').addClass(sclass);
                }
            }
            $("#" + element + 'mar' + (j + 1) + " P").text((chart.values[j].score == 0) ? "" : chart.values[j].score);
            $("#" + element + 'pro' + (j + 1)).css("width", (chart.values[j].score == 0) ? 24 : chart.values[j].score  + "%");
            $("#" + element + 'mar' + (j + 1)).css("width", chart.values[j].score + "%");
        }

        var values = new Array();

        // move all elements to array first
        for (var i = 0; i < chart.values.length; i++) {
            values.push(chart.values[i].score);
        }

        // set the unique values first
        for (i = 0; i < values.length; i++) {
            if (values[i] != 0) {
                marginBuffer = 4;
                for (var k = i + 1; k < values.length; k++) {
                    if (values[i] == values[k]) {
                        $("#" + element + 'mar' + (k + 1).toString()).css({
                            'margin-left': (marginBuffer).toString() + "%",
                            'margin-top': "-" + (-3 + marginBuffer) + "%",
                            'z-index': 1
                        });
                        marginBuffer += 3;
                        values[k] = 0;
                    }
                }
            }
        }
    },
    FindDuplicates: function (arrayName) {
        var newArray = new Array();
        label: for (var i = 0; i < arrayName.length; i++) {
            for (var j = 0; j < newArray.length; j++) {
                if (newArray[j].score == arrayName[i].score)
                    continue label;
            }
            newArray[newArray.length] = arrayName[i];
        }
        return newArray;
    }
    //LoadPoeDetailContent: function () {
    //    Common.ajaxsync({
    //        url: '/Standing/GetPoeContent',
    //        success: function (response) {
    //            var total = 0;
    //           // var html = " <tr> <td colspan='3' class='desctablepoe'><h1>" + response.Modules[0].PoeName + "</h1></td> </tr> <tr> <th>Practice Area</th> <th>Priority</th> <th>Points</th> </tr><tr><td colspan='3'><div class='scroll6'><table id='bigpicSyncPoeContentScroll'><tr><td>";
    //            $('#PAname').text(response.Modules[0].PoeName);

    //            var html = "<tr> <th>Practice Area</th> <th></th> <th>Points</th> </tr><tr>    <td colspan='3'><table id='bigpicPoeContent1Scroll'><tbody>";
    //            for (var i = 0; i < response.Modules.length; i++) {
    //                total = total + response.Modules[i].ModuleAverage;
    //                html = html + "<tr> <td>" + response.Modules[i].Modulename + "</td> <td></td> <td>" + response.Modules[i].ModuleAverage + "</td> </tr>";
    //            }
    //            html = html + "</tbody></table></td></tr>  <tr> <th>Total</th> <th></th> <th>100</th> </tr>";
    //            //html = html + "<li> <h3>Self Sync Explained</h3> <div class='spa_info'> <p> Self Sync identifies the difference, or Gap, between your Self Feedback score and the Feedback you have received from members of your Feedback Network (e.g., Manager, Skip-Level Manager, Peers, etc.). <br /><br /> Examine Self Sync by Practice Areas and Excellence Indicator(s) to break down your Big Picture Gap and isolate development priorities for coaching conversations with your Manager.</p>  </div></li>"

    //            $('#bigpicPoeContent1').html(html);

    //            $('.scroll6').slimScroll();
    //            if (response.Modules.length <= 5) {
    //                $('#bigpicSyncPoeContentScroll').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
    //            } else {
    //                $('#bigpicSyncPoeContentScroll').parents('.slimScrollDiv').find('.slimScrollBar').hide();
    //            }
    //        }
    //    });
    //}
};

$(document).ready(function () {
    //debugger;
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $('.clickdeeper').show();
    Common.setTopMenu(4);
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/start-sync_h.png');
    //$('.indexrightclose').live('click', function () {
    //    $(this).hide();
    //    $(".indexrightarrow .indexclose").show();
    //    $(".indexright").animate({ right: "-24.5%" }, 500);
    //});
    //$('.indexclose').live('click', function () {
    //    $(this).hide();
    //    $(".indexrightclose").show();
    //    $(".indexright").animate({ right: "0" }, 500);
    //});
    //$(document).click(function (event) {
    //    if ($(event.target).parents().index($('.indexright')) == -1) {
    //        if ($('.indexright').is(":visible")) {
    //            $(".indexright").animate({ right: "-24.5%" }, 500);
    //            $(".indexclose").show();
    //        }
    //    }
    //});

    $('.indexrightclose').live('click', function () {
        $(".indexrightclose, .indexclose").hide();
        $(".indexrightarrow ,.indexrightclose1").show();
        $(".modelcontent").animate({ left: "-100%" }, 500);
    });
    $('.indexclose').live('click', function () {
        $(this).hide();
        $(".indexrightclose").show();
        $(".indexrightclose1").hide();
        $(".indexright").animate({ right: "0" }, 500);
    });
    $('.indexrightclose1').live('click', function () {
        $(".indexrightclose, .indexrightclose1").hide();
        $(".indexclose").show();
        $(".indexright").animate({ right: "-33.5%" }, 500);
        $(".modelcontent").animate({ left: "0%" }, 500);
    });
    $(document).click(function (event) {
        $('.standBPInfo').removeClass('selectstandBPInfo');
        if ($(event.target).parents().index($('.indexright')) == -1) {
            if ($('.indexright').is(":visible")) {
                $(".indexright").animate({ right: "-33.5%" }, 500);
                $(".indexclose").show();
                $(".modelcontent").animate({ left: "0" }, 500);
            }
        }
    });
    $('.scroll1').slimScroll();
    $('.scroll2').slimScroll();
    $('.scroll6').slimScroll();
    GetBreadCrumbAndName();
    //createchart.LoadPoeDetailContent();
    GetMode();
    var html = "<li><a href='/managersync/managersync'><span><img src='../../Images/icons/sync-small.png' /></span><p>Manager Sync</p></a> </li>" +
        "<li><a href='/managersync/Bigpicture'><span><img src='../../Images/icons/big-pic-small.png' /></span><p>Big Picture</p></a> </li>" +
        "<li><a href='/managersync/PracticeAreas'><span><img src='../../Images/icons/digin-small.png' /></span><p>Practice Areas</p></a> </li>" +
        "<li><a href='/managersync/ExcellenceIndicators'><span><img src='../../Images/icons/dig-deeper-small.png' /></span><p>Excellence Actions</p></a> </li>";
    //"<li><a href='/Goal/SetGoals'><span><img src='../../Images/icons/goal-small.png' /></span><p>Set Goals</p></a> </li>" +
    //"<li><a href='/Goal/TrackGoals'><span><img src='../../Images/icons/track-goal-small.png' /></span><p>Track Goals</p></a> </li>";

    $('#target ul').html(html);
    bigpicture.getMyNetworkUser();
    $('#userList li').live('click', function () {
        if (!$(this).hasClass('poelistlidummy')) {
            //Solved the reloading issue
            var ctrl = $(this);
            // $("#status,#preloader").delay(100).fadeIn("slow", function () {
            ctrl.addClass("selected");
            ctrl.siblings().removeClass("selected");
            $('.markeramper').css('margin-left', '');
            $('.markeramper').css('margin-top', '');
            $('.markergray').css('margin-left', '');
            $('.markergray').css('margin-top', '');
            $('.progressbartrans1').addClass("progressbar1").removeClass("progressbartrans1");
            $('.progressbartrans2').addClass("progressbar2").removeClass("progressbartrans2");
            //
            bigpicture.getSyncScore(ctrl.val());
        }
        //});
        // $("#status").fadeOut();
        // $("#preloader").delay(100).fadeOut("slow");
    });
    if ($('#selectedType').val() == 1) {
        var rightArrowHtml = 'Self Sync identifies the difference, or Gap, between your Self Feedback score and the Feedback you have received from members of your Feedback Network (e.g., Manager, Skip-Level Manager, Peers, etc.).' +
            '<br /><br />' +
            'Examine Self Sync by Practice Areas and Excellence Actions to break down your Big Picture Gap and isolate development priorities for coaching conversations with your Manager.';
        $('.hlprow>span').empty();
        $('.descinfo h1').html('Self Sync Explained');
        $('.hlprow').html(rightArrowHtml);
        $('.model').addClass('managerModel');
        $('.model').removeClass('teamModel');
    }
    else {
        var rightArrowHtml1 = 'Team Sync identifies the difference, or Gap, between the Feedback score you have given to each of your team members and the Self Feedback scores your team members have given themselves.' +
            '<br /><br />' +
            'Examine Team Sync by Practice Areas and Excellence Actions to break down the Big Picture Gap and isolate development priorities for coaching conversations with your team members.';
        $('.hlprow>span').empty();
        $('.descinfo h1').html('Team Sync Explained');
        $('.hlprow').html(rightArrowHtml1);
        $('.model').removeClass('managerModel');
        $('.model').addClass('teamModel');
    }
    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
    $('.standBPInfo').click(function () {
        $(this).addClass('selectstandBPInfo');
    });
});
function GetBreadCrumbAndName() {
    Common.ajaxsync({
        url: '/Sync/GetClicked',
        success: function (response) {
            //debugger;
            $('#selectedType').val(response);
            var bvalue = '';
            switch (response) {
                case 1:
                    bvalue = 'Self';
                    $('.legend1').text("Self");
                    break;
                case 2:
                    bvalue = 'Team';
                    $('.legend1').text("Your Feedback");
                    break;
                default:
                    break;
            }
            var breadCrumb = '<a href="../Common/Index">Home</a> > <a href="../managersync/managersync">Manager Sync</a>  > ' + bvalue + ' > The Big Picture';
            $('.breadcrumb').html(breadCrumb);
        },
        error: function (err) {
        }
    });
}
function GetMode() {
    Common.ajaxsync({
        url: '/Sync/GetMode',
        success: function (response) {
            $('#moreBigPicture').val(response);
        },
        error: function (err) {
        }
    });
}