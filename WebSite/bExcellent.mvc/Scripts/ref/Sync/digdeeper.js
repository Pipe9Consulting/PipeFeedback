var bigpicture = {
    getMyNetworkUser: function () {
        Common.ajaxsync({
            url: '/sync/GetNetworkUsers',
            success: function (response) {
                var findtype = $('#Type').val();
                var html = "";
                if (findtype != "Team") {
                    html = "<li  id='usrli0' value='0' class='digdeepertile'><img src='../images/icons/network-white.png' width='61' height='61' alt='User' /><p>Your Network</p></li>";
                }
                for (var i = 0; i < response.length; i++) {
                    html = html + " <li  id='usrli" + i + "' value=" + response[i].UserPOEMappingId + " class='digdeepertile'>" +
                        "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                        "<p>" +
                        response[i].User.FirstName + " " + response[i].User.LastName +
                        "</p> " +
                        "</li>";
                }
                $('#userList').html(html);
                var t = $('#userList li').first();
                t.addClass('selected');
                bigpicture.getSyncScore(t.val());
                bigpicture.loadUserData(t.val());
            },
            error: function (err) {
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
            }
        });
    },
    loadMyData: function () {
        Common.ajaxnocache({
            url: '/Common/GetMyDetail',
            success: function (response) {
                if (response != null) {
                    var name = response.User.FirstName + ' ' + response.User.LastName;
                    var type = $('#Type').val();
                    if (type != "You") {
                        $('#Usernames').attr('title', name);
                        $("#userphtsync").attr("src", "/Uploadify/LoadImageHandler.ashx?id=" + response.User.UserId + "&rnd=" + Math.random());
                    } else {
                        $('#myusrname').attr('title', name);
                        $("#myphtsync").attr("src", "/Uploadify/LoadImageHandler.ashx?id=" + response.User.UserId + "&rnd=" + Math.random());
                    }
                }
            },
            error: function (err) {
                // debugger;
            }
        });
    },
    loadUserData: function (mappingid) {
        //debugger;
        Common.ajaxnocache({
            url: '/Sync/GetUserInfoByMappingId?userMappingId=' + mappingid,
            success: function (response) {
                //debugger;
                if (response != null) {
                    var name = response.User.FirstName + ' ' + response.User.LastName;
                    var type = $('#Type').val();
                    if (type != "You") {
                        $('#myusrname').attr('title', name);
                        $("#myphtsync").attr("src", "/Uploadify/LoadImageHandler.ashx?id=" + response.User.UserId + "&rnd=" + Math.random());
                    } else {
                        $('#Usernames').attr('title', name);
                        $("#userphtsync").attr("src", "/Uploadify/LoadImageHandler.ashx?id=" + response.User.UserId + "&rnd=" + Math.random());
                    }
                } else {
                    $('#myusrname').attr('title', 'Your Network');
                    $('#myphtsync').attr("src", "/images/icons/network-white.png");
                    //$('#Usernames').attr('title', 'Your Network');
                    //$("#userphtsync").attr("src", "/images/icons/network-white.png");
                }
            },
            error: function (err) {
                // debugger;
            }
        });
    },
    getSum: function (arr) {
        var r = 0;
        $.each(arr, function (i, v) {
            r += v;
        });
        return r;
    },
    getSyncScore: function (userMappingId) {
        var pagemode = $('#moreDigDeeper').val();
        var url = String.empty;
        if (pagemode == "1") {
            url = '/sync/GetSyncScoreByFbId?userMappingId=' + userMappingId;
        } else {
            url = '/sync/GetSyncScore?userMappingId=' + userMappingId;
        }
        if (userMappingId == 0) {
            url = '/sync/GetSyncScoreOverall?userMappingId=' + userMappingId;
        }
        Common.ajaxsync({
            url: url,//'/sync/GetSyncScore?userMappingId=' + userMappingId,
            success: function (response) {
                var html = '';
                /*Content loading starts*/
                //debugger;
                for (var i = 0; i < response.TScore.ModuleScores.length; i++) {
                    var img = $('#selectedpoe').val() + response.TScore.ModuleScores[i].ModuleOrderNumber;
                    html = html + "<div class='digrow " + bigpicture.getRowHeight(response.RScore.ModuleScores[i].QuestionScores.length) + "'>";
                    var fstcol = "<div class='digcol firstcol'><ul>";
                    var scndcol = "<div class='digcol secondcol'><ul>";
                    var trdcol = "<div class='digcol thirdcol'><ul>";
                    var frthcol = "<div class='digcol forthcol'><ul>";
                    var ffthcol = "<div class='digcol sixthcol'><ul>";
                    var sixthcol = "<div class='digcol fifthcol'><ul>";
                    var svnthcol = "<div class='digcol seventhcol'><ul>";
                    var egtcol = "<div class='digcol sixthcol lastcol'><ul>";
                    fstcol = fstcol + "<li><img src='../../Images/icons/" + img + "_S.png' width='45' height='46'  class='img' /><p>" + response.TScore.ModuleScores[i].ModuleName + "</p></li>";
                    var recScore = response.RScore.ModuleScores[i];
                    var takeScore = response.TScore.ModuleScores[i];
                    var maximumOfSelectedGoal = '';
                    var avgSelfScore = '';
                    var avgManagerScore = '';
                    var maxGoalGap = '';
                    var img = "";
                    var avggoallinehtml = "";
                    var avgtimeLineGap = "";
                    var avgprogressbar = "";
                    var avgyellowbar = "";
                    var avgcompletedHtml = '';
                    var avgcompletedMonths = '';
                    var avggoalMonthDiff = '';
                    var avgGoalCompletedMonthDetail = '';
                    for (var j = 0; j < recScore.QuestionScores.length; j++) {
                        //debugger;
                        //maximumOfSelectedGoal = recScore.QuestionScores.sort(function (a, b) { return b - a; });
                        // need to enable the following line
                        maximumOfSelectedGoal = recScore.QuestionScores.sort(function (a, b) { return (b.SelectedGoalValue - a.SelectedGoalValue); })[0].SelectedGoalValue; //Math.max(recScore.QuestionScores[0].SelectedGoalValue, recScore.QuestionScores[1].SelectedGoalValue, recScore.QuestionScores[2].SelectedGoalValue, recScore.QuestionScores[3].SelectedGoalValue, recScore.QuestionScores[4].SelectedGoalValue);
                        // need to disable the following line
                        //maximumOfSelectedGoal = Math.max(recScore.QuestionScores[0].SelectedGoalValue, recScore.QuestionScores[1].SelectedGoalValue, recScore.QuestionScores[2].SelectedGoalValue, recScore.QuestionScores[3].SelectedGoalValue, recScore.QuestionScores[4].SelectedGoalValue);
                        var selfScore = 0;
                        $.each(takeScore.QuestionScores, function (x, d) { selfScore = selfScore + d.Score; });
                        avgSelfScore = selfScore / takeScore.QuestionScores.length;//(takeScore.QuestionScores[0].Score + takeScore.QuestionScores[1].Score + takeScore.QuestionScores[2].Score + takeScore.QuestionScores[3].Score + takeScore.QuestionScores[4].Score) / 5;
                        var goalCompletedMonth = 0;
                        $.each(recScore.QuestionScores, function (y, d) { goalCompletedMonth = goalCompletedMonth + d.GoalCompletedMonth; });
                        avgGoalCompletedMonthDetail = goalCompletedMonth / recScore.QuestionScores.length;//(recScore.QuestionScores[0].GoalCompletedMonth + recScore.QuestionScores[1].GoalCompletedMonth + recScore.QuestionScores[2].GoalCompletedMonth + recScore.QuestionScores[3].GoalCompletedMonth + recScore.QuestionScores[4].GoalCompletedMonth) / 5;
                        var mangerScore = 0;
                        $.each(recScore.QuestionScores, function (z, d) { mangerScore = mangerScore + d.Score; });
                        avgManagerScore = mangerScore / recScore.QuestionScores.length;// (recScore.QuestionScores[0].Score + recScore.QuestionScores[1].Score + recScore.QuestionScores[2].Score + recScore.QuestionScores[3].Score + recScore.QuestionScores[4].Score) / 5;
                        maxGoalGap = recScore.QuestionScores.sort(function (a, b) { return (b.GoalGap - a.GoalGap); })[0].GoalGap;//Math.max(recScore.QuestionScores[0].GoalGap, recScore.QuestionScores[1].GoalGap, recScore.QuestionScores[2].GoalGap, recScore.QuestionScores[3].GoalGap, recScore.QuestionScores[4].GoalGap);
                        //debugger;
                        switch (recScore.QuestionScores[j].GoalGap) {
                            case 0:
                                img = "gapico-1";
                                break;
                            case 1:
                            case 2:
                                img = "gapico-2";

                                break;
                            case 3:
                            case 4:
                                img = "gapico-3";
                                break;
                            default:
                                img = "gapico-3";
                                break;
                        }

                        //For Average Screen

                        var goalval = Math.floor(avgGoalCompletedMonthDetail); // avgGoalCompletedMonthDetail.toFixed();
                        var avgselectedvalue = 0;
                        if (goalval > 0 && goalval < 6) {
                            avgselectedvalue = 1;
                        } else if (goalval >= 6 && goalval < 12) {
                            avgselectedvalue = 2;
                        } else if (goalval >= 12 && goalval < 24) {
                            avgselectedvalue = 3;
                        } else if (goalval >= 24) {
                            avgselectedvalue = 4;
                        }
                        if (maximumOfSelectedGoal < avgselectedvalue) {
                            switch (maximumOfSelectedGoal) {
                                case 0:
                                    avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 endbdr'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    avgprogressbar = "achieved1";
                                    avgyellowbar = "zeromonth";
                                    avgtimeLineGap = "<div class='exceed1mask'></div>";
                                    break;
                                case 1:
                                    avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 endbdr'>0</li>" +
                                    "<li class='bdrnil1 '>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    avgprogressbar = "achieved1";
                                    avgyellowbar = "zeromonth";
                                    avgtimeLineGap = "<div class='exceed1mask'></div>";
                                    break;
                                case 2:
                                    avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1 endbdr'>6</li>" +
                                    "<li class='bdrnil1 '>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    avgprogressbar = "achieved2";
                                    avgyellowbar = "sixmonth";
                                    avgtimeLineGap = "<div class='exceed2mask'></div>";
                                    break;
                                case 3:
                                    avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 '>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1 endbdr'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    avgprogressbar = "achieved3";
                                    avgyellowbar = "twelvemonth";
                                    avgtimeLineGap = "<div class='exceed3mask'></div>";
                                    break;
                                case 4:
                                    avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1 endbdr'>24</li>" +
                                    "</ul>";
                                    avgprogressbar = "achieved4";
                                    avgyellowbar = "twentyfourmonth";
                                    avgtimeLineGap = "<div class='exceed4mask'></div>";
                                    break;
                                default:
                                    avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    avgprogressbar = "achieved1";
                                    avgyellowbar = "zeromonth";
                                    avgtimeLineGap = "<div class='exceed1mask'></div>";
                                    break;
                            }
                        } else {
                            switch (maximumOfSelectedGoal) {
                                case 0:
                                    avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 endbdr'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    avgprogressbar = "achieved1";
                                    avgyellowbar = "zeromonth";
                                    avgtimeLineGap = "<div class='achieved1mask'></div>";
                                    break;
                                case 1:
                                    avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 endbdr'>0</li>" +
                                    "<li class='bdrnil1 '>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    avgprogressbar = "achieved1";
                                    avgyellowbar = "zeromonth";
                                    avgtimeLineGap = "<div class='achieved1mask'></div>";
                                    break;
                                case 2:
                                    avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1 endbdr'>6</li>" +
                                    "<li class='bdrnil1 '>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    avgprogressbar = "achieved2";
                                    avgyellowbar = "sixmonth";
                                    avgtimeLineGap = "<div class='achieved2mask'></div>";
                                    break;
                                case 3:
                                    avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 '>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1 endbdr'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    avgprogressbar = "achieved3";
                                    avgyellowbar = "twelvemonth";
                                    avgtimeLineGap = "<div class='achieved3mask'></div>";
                                    break;
                                case 4:
                                    avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1 endbdr'>24</li>" +
                                    "</ul>";
                                    avgprogressbar = "achieved4";
                                    avgyellowbar = "twentyfourmonth";
                                    avgtimeLineGap = "<div class='achieved4mask'></div>";
                                    break;
                                default:
                                    avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    avgprogressbar = "achieved1";
                                    avgyellowbar = "zeromonth";
                                    avgtimeLineGap = "<div class='achieved1mask'></div>";
                                    break;
                            }
                        }
                        var goalCompletedMonths = 0;
                        $.each(recScore.QuestionScores, function (y, d) { goalCompletedMonths = goalCompletedMonths + d.GoalCompletedMonth; });

                        avgcompletedMonths = goalCompletedMonths / recScore.QuestionScores.length;// (recScore.QuestionScores[0].GoalCompletedMonth + recScore.QuestionScores[1].GoalCompletedMonth + recScore.QuestionScores[2].GoalCompletedMonth + recScore.QuestionScores[3].GoalCompletedMonth + recScore.QuestionScores[4].GoalCompletedMonth) / 5;
                        avggoalMonthDiff = parseInt(recScore.QuestionScores[j].GoalMonthDiff) * (-1);
                        var avggoalgapitem = recScore.QuestionScores.sort(function (u, v) { return v.GoalGap - u.GoalGap; })[0].GoalGap; //Math.max(recScore.QuestionScores[0].GoalGap, recScore.QuestionScores[1].GoalGap, recScore.QuestionScores[2].GoalGap, recScore.QuestionScores[3].GoalGap, recScore.QuestionScores[4].GoalGap);
                        var fixedAvgmonths = Math.floor(avgcompletedMonths); //.toFixed();
                        {
                            if (maximumOfSelectedGoal >= avgselectedvalue) {
                                //ongoing
                                if (fixedAvgmonths >= 0 && fixedAvgmonths < 3) {
                                    avgcompletedHtml = "<div class='" + avgprogressbar + " zeromonth bdrnil'></div>";
                                }
                                else if (fixedAvgmonths >= 3 && fixedAvgmonths < 6) {
                                    avgcompletedHtml = "<div class='" + avgprogressbar + " threemonth bdrnil'></div>";
                                }
                                else if (fixedAvgmonths >= 6 && fixedAvgmonths < 9) {
                                    avgcompletedHtml = "<div class='" + avgprogressbar + " sixmonth bdrnil'></div>";
                                }
                                else if (fixedAvgmonths >= 9 && fixedAvgmonths < 12) {
                                    avgcompletedHtml = "<div class='" + avgprogressbar + " ninemonth bdrnil'></div>";
                                }
                                else if (fixedAvgmonths >= 12 && fixedAvgmonths < 18) {
                                    avgcompletedHtml = "<div class='" + avgprogressbar + " twelvemonth bdrnil'></div>";
                                }
                                else if (fixedAvgmonths >= 18 && fixedAvgmonths < 24) {
                                    avgcompletedHtml = "<div class='" + avgprogressbar + " eighteenmonth bdrnil'></div>";
                                }
                                else if (fixedAvgmonths >= 24) {
                                    avgcompletedHtml = "<div class='" + avgprogressbar + " twentyfourmonth bdrnil'></div>";
                                }
                            }
                            else {
                                if (avggoalgapitem != 0) {
                                    var avgtimeLineGapClass = '';
                                    //ex
                                    if (fixedAvgmonths >= 0 && fixedAvgmonths < 6) {
                                        //       completedHtml = "<div class='" + progressbar + " zeromonth bdrnil'></div>";
                                        avgtimeLineGapClass = 'exceed2mask';
                                        avgprogressbar = 'achieved2';
                                    }
                                    else if (fixedAvgmonths >= 6 && fixedAvgmonths < 12) {
                                        //completedHtml = "<div class='" + progressbar + " sixmonth bdrnil'></div>";
                                        avgtimeLineGapClass = 'exceed3mask';
                                        avgprogressbar = 'achieved3';
                                    }
                                    else if (fixedAvgmonths >= 12 && fixedAvgmonths < 24) {
                                        avgtimeLineGapClass = 'exceed4mask';
                                        avgprogressbar = 'achieved4';
                                        //completedHtml = "<div class='" + progressbar + " twelvemonth bdrnil'></div>";
                                    }
                                    else if (fixedAvgmonths >= 24) {
                                        avgtimeLineGapClass = 'exceed4mask';
                                        avgprogressbar = 'achieved4';
                                        //completedHtml = "<div class='" + progressbar + " twentyfourmonth bdrnil'></div>";
                                    }
                                    avgtimeLineGap = "<div class='" + avgtimeLineGapClass + "'></div>";
                                    avgcompletedHtml = "<div class='" + avgprogressbar + " " + avgyellowbar + " bdrnil'></div>";
                                } else {
                                    avgcompletedHtml = "<div class='" + avgprogressbar + " " + avgyellowbar + " bdrnil'></div>";
                                    //show goal..
                                }
                            }
                        }

                        //End of Average screen
                        var goallinehtml = "";
                        var timeLineGap = "";
                        var progressbar = "";
                        var yellowbar = "";
                        if (recScore.QuestionScores[j].GoalExpired) {
                            switch (recScore.QuestionScores[j].SelectedGoalValue) {
                                case 0:
                                    goallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 endbdr'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    progressbar = "achieved1";
                                    yellowbar = "zeromonth";
                                    timeLineGap = "<div class='exceed1mask'></div>";
                                    break;
                                case 1:
                                    goallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 endbdr'>0</li>" +
                                    "<li class='bdrnil1 '>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    progressbar = "achieved1";
                                    yellowbar = "zeromonth";
                                    timeLineGap = "<div class='exceed1mask'></div>";
                                    break;
                                case 2:
                                    goallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1 endbdr'>6</li>" +
                                    "<li class='bdrnil1 '>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    progressbar = "achieved2";
                                    yellowbar = "sixmonth";
                                    timeLineGap = "<div class='exceed2mask'></div>";
                                    break;
                                case 3:
                                    goallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 '>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1 endbdr'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    progressbar = "achieved3";
                                    yellowbar = "twelvemonth";
                                    timeLineGap = "<div class='exceed3mask'></div>";
                                    break;
                                case 4:
                                    goallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1 endbdr'>24</li>" +
                                    "</ul>";
                                    progressbar = "achieved4";
                                    yellowbar = "twentyfourmonth";
                                    timeLineGap = "<div class='exceed4mask'></div>";
                                    break;
                                default:
                                    goallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    progressbar = "achieved1";
                                    yellowbar = "zeromonth";
                                    timeLineGap = "<div class='exceed1mask'></div>";
                                    break;
                            }
                        } else {
                            switch (recScore.QuestionScores[j].SelectedGoalValue) {
                                case 0:
                                    goallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 endbdr'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    progressbar = "achieved1";
                                    yellowbar = "zeromonth";
                                    timeLineGap = "<div class='achieved1mask'></div>";
                                    break;
                                case 1:
                                    goallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 endbdr'>0</li>" +
                                    "<li class='bdrnil1 '>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    progressbar = "achieved1";
                                    yellowbar = "zeromonth";
                                    timeLineGap = "<div class='achieved1mask'></div>";
                                    break;
                                case 2:
                                    goallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1 endbdr'>6</li>" +
                                    "<li class='bdrnil1 '>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    progressbar = "achieved2";
                                    yellowbar = "sixmonth";
                                    timeLineGap = "<div class='achieved2mask'></div>";
                                    break;
                                case 3:
                                    goallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 '>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1 endbdr'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    progressbar = "achieved3";
                                    yellowbar = "twelvemonth";
                                    timeLineGap = "<div class='achieved3mask'></div>";
                                    break;
                                case 4:
                                    goallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1 endbdr'>24</li>" +
                                    "</ul>";
                                    progressbar = "achieved4";
                                    yellowbar = "twentyfourmonth";
                                    timeLineGap = "<div class='achieved4mask'></div>";
                                    break;
                                default:
                                    goallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                                    progressbar = "achieved1";
                                    yellowbar = "zeromonth";
                                    timeLineGap = "<div class='achieved1mask'></div>";
                                    break;
                            }
                        }

                        var completedHtml = '';
                        var completedMonths = recScore.QuestionScores[j].GoalCompletedMonth;
                        var goalMonthDiff = parseInt(recScore.QuestionScores[j].GoalMonthDiff) * (-1);

                        {
                            if (!recScore.QuestionScores[j].GoalExpired) {
                                //ongoing
                                if (completedMonths >= 0 && completedMonths < 3) {
                                    completedHtml = "<div class='" + progressbar + " zeromonth bdrnil'></div>";
                                }
                                else if (completedMonths >= 3 && completedMonths < 6) {
                                    completedHtml = "<div class='" + progressbar + " threemonth bdrnil'></div>";
                                }
                                else if (completedMonths >= 6 && completedMonths < 9) {
                                    completedHtml = "<div class='" + progressbar + " sixmonth bdrnil'></div>";
                                }
                                else if (completedMonths >= 9 && completedMonths < 12) {
                                    completedHtml = "<div class='" + progressbar + " ninemonth bdrnil'></div>";
                                }
                                else if (completedMonths >= 12 && completedMonths < 18) {
                                    completedHtml = "<div class='" + progressbar + " twelvemonth bdrnil'></div>";
                                }
                                else if (completedMonths >= 18 && completedMonths < 24) {
                                    completedHtml = "<div class='" + progressbar + " eighteenmonth bdrnil'></div>";
                                }
                                else if (completedMonths >= 24) {
                                    completedHtml = "<div class='" + progressbar + " twentyfourmonth bdrnil'></div>";
                                }
                            }
                            else {
                                if (recScore.QuestionScores[j].GoalGap != 0) {
                                    var timeLineGapClass = '';
                                    //ex
                                    if (completedMonths >= 0 && completedMonths < 6) {
                                        //       completedHtml = "<div class='" + progressbar + " zeromonth bdrnil'></div>";
                                        timeLineGapClass = 'exceed2mask';
                                        progressbar = 'achieved2';
                                    }
                                    else if (completedMonths >= 6 && completedMonths < 12) {
                                        //completedHtml = "<div class='" + progressbar + " sixmonth bdrnil'></div>";
                                        timeLineGapClass = 'exceed3mask';
                                        progressbar = 'achieved3';
                                    }
                                    else if (completedMonths >= 12 && completedMonths < 24) {
                                        timeLineGapClass = 'exceed4mask';
                                        progressbar = 'achieved4';
                                        //completedHtml = "<div class='" + progressbar + " twelvemonth bdrnil'></div>";
                                    }
                                    else if (completedMonths >= 24) {
                                        timeLineGapClass = 'exceed4mask';
                                        progressbar = 'achieved4';
                                        //completedHtml = "<div class='" + progressbar + " twentyfourmonth bdrnil'></div>";
                                    }
                                    timeLineGap = "<div class='" + timeLineGapClass + "'></div>";
                                    completedHtml = "<div class='" + progressbar + " " + yellowbar + " bdrnil'></div>";
                                } else {
                                    completedHtml = "<div class='" + progressbar + " " + yellowbar + " bdrnil'></div>";
                                    //show goal..
                                }
                            }
                        }
                        //debugger;
                        scndcol = scndcol + "<li><p>" + recScore.QuestionScores[j].ShortQuetionText + "  " + (recScore.QuestionScores[j].IsGoalShared ? '<div class="sharebtn" style="display: block;"> </div>' : '') + " </p></li>";
                        trdcol = trdcol + "<li><p>" + recScore.QuestionScores[j].GoalSetedOnStr + "</p></li>";
                        frthcol = frthcol + "<li><p>4</p></li>";
                        ffthcol = ffthcol + "<li class='achieved" + recScore.QuestionScores[j].SelectedGoalValue + "'><ul class='goals'><li>0</li><li>6</li><li>12</li><li>24</li></ul></li>";
                        sixthcol = sixthcol + "<li><div class='gapfit'><div class='gap'><p>" + recScore.QuestionScores[j].Score + "</p></div><div class='gap'><p>" + takeScore.QuestionScores[j].Score + "</p></div></div></li>";
                        svnthcol = svnthcol + "<li><p>" + recScore.QuestionScores[j].GoalGap + "<span class='tick'><img src='../../Images/icons/" + img + ".png'/></span></p></li>";
                        egtcol = egtcol + "<li>" + timeLineGap + completedHtml + goallinehtml + "</li>";
                    }
                    //average
                    //debugger;
                    {
                        // switch case added by sena
                        switch (maxGoalGap) {
                            case 0:
                                img = "gapico-1";
                                break;
                            case 1:
                            case 2:
                                img = "gapico-2";
                                break;
                            case 3:
                            case 4:
                                img = "gapico-3";
                                break;
                            default:
                                img = "gapico-3";
                                break;
                        }
                        scndcol = scndcol + "<li class='averagecol'><p class='average'>Average </p></li>";
                        trdcol = trdcol + "<li class='averagecol'>&nbsp;</li>";
                        frthcol = frthcol + "<li class='averagecol'><p>4</p></li>";
                        if (maximumOfSelectedGoal > 0) {
                            ffthcol = ffthcol + "<li class='averagecol achieved" + maximumOfSelectedGoal + "'><ul class='goals'><li>0</li><li>6</li><li>12</li><li>24</li></ul></li>";
                        } else {
                            ffthcol = ffthcol + "<li class='averagecol'><ul class='goals'><li>0</li><li>6</li><li>12</li><li>24</li></ul></li>";
                        }
                        sixthcol = sixthcol + "<li class='averagecol'><div class='gapfit bdrtpnil'><div class='gap'><p>" + Math.floor(avgSelfScore) + "</p></div><div class='gap'><p>" + Math.floor(avgManagerScore) + "</p></div></div></li>";
                        svnthcol = svnthcol + "<li class='averagecol'><p>" + maxGoalGap + "<span class='tick'><img src='../../Images/icons/" + img + ".png'/></span></p></li>";
                        egtcol = egtcol + "<li class='averagecol'>" + avgtimeLineGap + avgcompletedHtml + avggoallinehtml + "</li>";
                    }
                    fstcol = fstcol + "</ul></div>";
                    scndcol = scndcol + "</ul></div>";
                    trdcol = trdcol + "</ul></div>";
                    frthcol = frthcol + "</ul></div>";
                    ffthcol = ffthcol + "</ul></div>";
                    sixthcol = sixthcol + "</ul></div>";
                    svnthcol = svnthcol + "</ul></div>";
                    egtcol = egtcol + "</ul></div>";
                    html = html + fstcol + scndcol + trdcol + frthcol + ffthcol + sixthcol + svnthcol + egtcol + "</div>";
                }
                //Overall Average
                var valarr = new Array();
                var selfScoreArray = new Array();
                var mngrScore = new Array();
                var goalgap = new Array();
                var goalcompleted = new Array();
                for (var k = 0; k < response.RScore.ModuleScores.length; k++) {
                    var recScore1 = response.RScore.ModuleScores[k];
                    var takeScore1 = response.TScore.ModuleScores[k];
                    maximumOfSelectedGoal = recScore1.QuestionScores.sort(function (a, b) { return b.SelectedGoalValue - a.SelectedGoalValue; })[0].SelectedGoalValue;//Math.max(recScore1.QuestionScores[0].SelectedGoalValue, recScore1.QuestionScores[1].SelectedGoalValue, recScore1.QuestionScores[2].SelectedGoalValue, recScore1.QuestionScores[3].SelectedGoalValue, recScore1.QuestionScores[4].SelectedGoalValue);
                    valarr.push(maximumOfSelectedGoal);
                    var selfScrores = 0;
                    $.each(takeScore1.QuestionScores, function (x, y) { selfScrores = selfScrores + y.Score; });
                    var avgSelfscore = selfScrores / takeScore1.QuestionScores.length;//(takeScore1.QuestionScores[0].Score + takeScore1.QuestionScores[1].Score + takeScore1.QuestionScores[2].Score + takeScore1.QuestionScores[3].Score + takeScore1.QuestionScores[4].Score) / 5;
                    selfScoreArray.push(avgSelfscore);
                    var managerScores = 0;
                    $.each(recScore1.QuestionScores, function (x, y) { managerScores = managerScores + y.Score; });
                    var avgManagerScores = managerScores / recScore1.QuestionScores.length;//(recScore1.QuestionScores[0].Score + recScore1.QuestionScores[1].Score + recScore1.QuestionScores[2].Score + recScore1.QuestionScores[3].Score + recScore1.QuestionScores[4].Score) / 5;
                    mngrScore.push(avgManagerScores);
                    var maxGoalGaps = recScore1.QuestionScores.sort(function (a, b) { return b.GoalGap - a.GoalGap; })[0].GoalGap;//Math.max(recScore1.QuestionScores[0].GoalGap, recScore1.QuestionScores[1].GoalGap, recScore1.QuestionScores[2].GoalGap, recScore1.QuestionScores[3].GoalGap, recScore1.QuestionScores[4].GoalGap);
                    goalgap.push(maxGoalGaps);
                    var overAllGoalCompletedMonths = 0;
                    $.each(recScore1.QuestionScores, function (u, v) { overAllGoalCompletedMonths = overAllGoalCompletedMonths + v.GoalCompletedMonth; });
                    var overAllGoalCompletedMonthDetail = overAllGoalCompletedMonths / recScore1.QuestionScores.length;//(recScore1.QuestionScores[0].GoalCompletedMonth + recScore1.QuestionScores[1].GoalCompletedMonth + recScore1.QuestionScores[2].GoalCompletedMonth + recScore1.QuestionScores[3].GoalCompletedMonth + recScore1.QuestionScores[4].GoalCompletedMonth) / 5;
                    goalcompleted.push(overAllGoalCompletedMonthDetail);
                }
                var avgofmaximumSelectedGoal = valarr.sort(function (a, b) { return b - a; })[0];// Math.max(valarr[0], valarr[1], valarr[2], valarr[3], valarr[4]);
                var avgSelfscores = bigpicture.getSum(selfScoreArray) / selfScoreArray.length;//(selfScoreArray[0] + selfScoreArray[1] + selfScoreArray[2] + selfScoreArray[3] + selfScoreArray[4]) / 5;
                var avgMngrScore = bigpicture.getSum(mngrScore) / mngrScore.length;//(mngrScore[0] + mngrScore[1] + mngrScore[2] + mngrScore[3] + mngrScore[4]) / 5;
                var avgofGoalgap = goalgap.sort(function (a, b) { return b - a; })[0];//Math.max(goalgap[0], goalgap[1], goalgap[2], goalgap[3], goalgap[4]);
                var avgOverallGoalcopleted = bigpicture.getSum(goalcompleted) / goalcompleted.length;//(goalcompleted[0] + goalcompleted[1] + goalcompleted[2] + goalcompleted[3] + goalcompleted[4]) / 5;
                var avgcompletedHtml1 = '';
                switch (avgofGoalgap) {
                    case 0:
                        img = "gapico-1";
                        break;
                    case 1:
                    case 2:
                        img = "gapico-2";
                        break;
                    case 3:
                    case 4:
                        img = "gapico-3";
                        break;
                    default:
                        img = "gapico-3";
                        break;
                }

                //Overall average

                var goalvals = Math.floor(avgOverallGoalcopleted); //.toFixed();
                var avgselectedvalues = 0;
                if (goalvals > 0 && goalvals < 6) {
                    avgselectedvalues = 2;
                } else if (goalvals >= 6 && goalvals < 12) {
                    avgselectedvalues = 3;
                } else if (goalvals >= 12 && goalvals < 24) {
                    avgselectedvalues = 4;
                } else if (goalvals >= 24) {
                    avgselectedvalues = 4;
                }
                if (avgofmaximumSelectedGoal < avgselectedvalues) {
                    switch (avgofmaximumSelectedGoal) {
                        case 0:
                            avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 endbdr'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                            avgprogressbar = "achieved1";
                            avgyellowbar = "zeromonth";
                            avgtimeLineGap = "<div class='exceed1mask'></div>";
                            break;
                        case 1:
                            avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 endbdr'>0</li>" +
                                    "<li class='bdrnil1 '>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                            avgprogressbar = "achieved1";
                            avgyellowbar = "zeromonth";
                            avgtimeLineGap = "<div class='exceed1mask'></div>";
                            break;
                        case 2:
                            avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1 endbdr'>6</li>" +
                                    "<li class='bdrnil1 '>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                            avgprogressbar = "achieved2";
                            avgyellowbar = "sixmonth";
                            avgtimeLineGap = "<div class='exceed2mask'></div>";
                            break;
                        case 3:
                            avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 '>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1 endbdr'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                            avgprogressbar = "achieved3";
                            avgyellowbar = "twelvemonth";
                            avgtimeLineGap = "<div class='exceed3mask'></div>";
                            break;
                        case 4:
                            avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1 endbdr'>24</li>" +
                                    "</ul>";
                            avgprogressbar = "achieved4";
                            avgyellowbar = "twentyfourmonth";
                            avgtimeLineGap = "<div class='exceed4mask'></div>";
                            break;
                        default:
                            avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                            avgprogressbar = "achieved1";
                            avgyellowbar = "zeromonth";
                            avgtimeLineGap = "<div class='exceed1mask'></div>";
                            break;
                    }
                } else {
                    switch (avgofmaximumSelectedGoal) {
                        case 0:
                            avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 endbdr'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                            avgprogressbar = "achieved1";
                            avgyellowbar = "zeromonth";
                            avgtimeLineGap = "<div class='achieved1mask'></div>";
                            break;
                        case 1:
                            avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 endbdr'>0</li>" +
                                    "<li class='bdrnil1 '>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                            avgprogressbar = "achieved1";
                            avgyellowbar = "zeromonth";
                            avgtimeLineGap = "<div class='achieved1mask'></div>";
                            break;
                        case 2:
                            avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1 endbdr'>6</li>" +
                                    "<li class='bdrnil1 '>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                            avgprogressbar = "achieved2";
                            avgyellowbar = "sixmonth";
                            avgtimeLineGap = "<div class='achieved2mask'></div>";
                            break;
                        case 3:
                            avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1 '>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1 endbdr'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                            avgprogressbar = "achieved3";
                            avgyellowbar = "twelvemonth";
                            avgtimeLineGap = "<div class='achieved3mask'></div>";
                            break;
                        case 4:
                            avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1 endbdr'>24</li>" +
                                    "</ul>";
                            avgprogressbar = "achieved4";
                            avgyellowbar = "twentyfourmonth";
                            avgtimeLineGap = "<div class='achieved4mask'></div>";
                            break;
                        default:
                            avggoallinehtml = " <ul class='goals'>" +
                                    "<li class='bdrnil1'>0</li>" +
                                    "<li class='bdrnil1'>6</li>" +
                                    "<li class='bdrnil1'>12</li>" +
                                    "<li class='bdrnil1'>24</li>" +
                                    "</ul>";
                            avgprogressbar = "achieved1";
                            avgyellowbar = "zeromonth";
                            avgtimeLineGap = "<div class='achieved1mask'></div>";
                            break;
                    }
                }

                {
                    if (avgofmaximumSelectedGoal > avgselectedvalues) {
                        //ongoing
                        if (goalvals >= 0 && goalvals < 3) {
                            avgcompletedHtml1 = "<div class='" + avgprogressbar + " zeromonth bdrnil'></div>";
                        }
                        else if (goalvals >= 3 && goalvals < 6) {
                            avgcompletedHtml1 = "<div class='" + avgprogressbar + " threemonth bdrnil'></div>";
                        }
                        else if (goalvals >= 6 && goalvals < 9) {
                            avgcompletedHtml1 = "<div class='" + avgprogressbar + " sixmonth bdrnil'></div>";
                        }
                        else if (goalvals >= 9 && goalvals < 12) {
                            avgcompletedHtml1 = "<div class='" + avgprogressbar + " ninemonth bdrnil'></div>";
                        }
                        else if (goalvals >= 12 && goalvals < 18) {
                            avgcompletedHtml1 = "<div class='" + avgprogressbar + " twelvemonth bdrnil'></div>";
                        }
                        else if (goalvals >= 18 && goalvals < 24) {
                            avgcompletedHtml1 = "<div class='" + avgprogressbar + " eighteenmonth bdrnil'></div>";
                        }
                        else if (goalvals >= 24) {
                            avgcompletedHtml1 = "<div class='" + avgprogressbar + " twentyfourmonth bdrnil'></div>";
                        }
                    }
                    else {
                        if (avgofGoalgap != 0) {
                            var avgtimeLineGapClass1 = '';
                            //ex
                            if (goalvals >= 0 && goalvals < 6) {
                                //       completedHtml = "<div class='" + progressbar + " zeromonth bdrnil'></div>";
                                avgtimeLineGapClass1 = 'exceed2mask';
                                avgprogressbar = 'achieved2';
                            }
                            else if (goalvals >= 6 && goalvals < 12) {
                                //completedHtml = "<div class='" + progressbar + " sixmonth bdrnil'></div>";
                                avgtimeLineGapClass1 = 'exceed3mask';
                                avgprogressbar = 'achieved3';
                            }
                            else if (goalvals >= 12 && goalvals < 24) {
                                avgtimeLineGapClass1 = 'exceed4mask';
                                avgprogressbar = 'achieved4';
                                //completedHtml = "<div class='" + progressbar + " twelvemonth bdrnil'></div>";
                            }
                            else if (goalvals >= 24) {
                                avgtimeLineGapClass1 = 'exceed4mask';
                                avgprogressbar = 'achieved4';
                                //completedHtml = "<div class='" + progressbar + " twentyfourmonth bdrnil'></div>";
                            }
                            avgtimeLineGap = "<div class='" + avgtimeLineGapClass1 + "'></div>";
                            avgcompletedHtml1 = "<div class='" + avgprogressbar + " " + avgyellowbar + " bdrnil'></div>";
                        } else {
                            avgcompletedHtml1 = "<div class='" + avgprogressbar + " " + avgyellowbar + " bdrnil'></div>";
                            //show goal..
                        }
                    }
                }

                //over all average completed
                var overallAverage = "<div class='digrow' id='totalavrbg'> <div class='digcol firstcol'> <li class='totalavr'>" +
                    "</li> </div> <div class='digcol secondcol'> <ul> <li class='averagecol'><p class='average'>Overall average </p></li> " +
                    "</ul> </div> <div class='digcol thirdcol'> <ul> <li class='averagecol'></li> </ul> </div> <div class='digcol forthcol'> " +
                    "<ul> <li class='averagecol'><p class='average'>4</p></li> </ul> </div> <div class='digcol sixthcol'> <ul> <li class='averagecol achieved" + avgofmaximumSelectedGoal + "'>" +
                    " <ul class='goals'> <li>0</li> <li>6</li> <li>12</li> <li>24</li> </ul> </li> </ul> </div> " +
                    "<div class='digcol fifthcol'> <ul> <li class='averagecol'> " +
                    "<div class='gapfit bdrtpnil'> <div class='gap'><p>" + Math.floor(avgMngrScore) + "</p></div> <div class='gap'><p>" + Math.floor(avgSelfscores) + "</p></div> </div> </li> </ul> </div> <div class='digcol seventhcol'> " +
                    "<ul> <li class='averagecol'> <p class='average'>" + avgofGoalgap + "<span class='tick'><img src='../../Images/icons/" + img + ".png' /></span></p> </li> </ul> </div> " +
                    "<div class='digcol sixthcol lastcol'><ul> <li class='averagecol'> " + avgtimeLineGap + avgcompletedHtml1 + avggoallinehtml + "</li> </ul> </li> </ul> </div> </div>";

                /*Content loanding ends*/
                html = html + overallAverage;
                $('#digdeepcontnet').html(html);
                $('#digdeepcontnet').parents('.slimScrollDiv').find('.slimScrollBar').hide();
            },
            error: function (err) {
            }
        });
    },
    getRowHeight: function (rowHeight) {
        var strClass = '';
        switch (rowHeight) {
            case 3:
                strClass = 'row3bg';
                break;
            case 4:
                strClass = 'row4bg';
                break;
            case 5:
                strClass = 'row5bg';
                break;
            case 6:
                strClass = 'row6bg';
                break;
            case 7:
                strClass = 'row7bg';
                break;
            case 8:
                strClass = 'row8bg';
                break;
            case 9:
                strClass = 'row9bg';
                break;
            case 10:
                strClass = 'row10bg';
                break;
        }
        return strClass;
    }
};

$(document).ready(function () {
    GetBreadCrumbAndName();
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $('.scroll1').slimScroll();
    $('.scroll2').slimScroll();
    $('.indexrightclose').live('click', function () {
        $(".indexrightclose, .indexclose").hide();
        $(".indexrightarrow ,.indexrightclose1").show();
        $(".indexright").animate({ right: "0" }, 500);
    });
    $('.indexrightclose1').live('click', function () {
        $(this).hide();
        $(".indexrightclose").show();
        $(".indexright").animate({ right: "-33.5%" }, 500);
    });
    $(document).click(function (event) {
        if ($(event.target).parents().index($('.indexright')) == -1) {
            if ($('.indexright').is(":visible")) {
                $(".indexright").animate({ right: "-33.5%" }, 500);
                $(".indexrightclose").show();
            }
        }
    });
    var html = "<li><a href='/Sync/Sync'><span><img src='../../Images/icons/sync-small.png' /></span><p>Sync</p></a> </li>" +
        "<li><a href='/Sync/Bigpicture'><span><img src='../../Images/icons/big-pic-small.png' /></span><p>Big Picture</p></a> </li>" +
        "<li><a href='/Sync/PracticeAreas'><span><img src='../../Images/icons/digin-small.png' /></span><p>Practice Areas</p></a> </li>" +
        "<li><a href='/Sync/ExcellenceIndicators'><span><img src='../../Images/icons/dig-deeper-small.png' /></span><p>Excellence Actions</p></a> </li>" +
         "<li><a href='/Goal/SetGoals'><span><img src='../../Images/icons/goal-small.png' /></span><p>Set Goals</p></a> </li>" +
        "<li><a href='/Goal/TrackGoals'><span><img src='../../Images/icons/track-goal-small.png' /></span><p>Track Goals</p></a> </li>";

    $('#target ul').html(html);

    GetMode();
    bigpicture.loadPoeName();
    bigpicture.getMyNetworkUser();
    bigpicture.loadMyData();
    $('#userList li').live('click', function () {
        //debugger;
        var ctrl = $(this);
        $("#status,#preloader").delay(100).show();//.fadeIn("slow", function () {
        ctrl.addClass("selected");
        ctrl.siblings().removeClass("selected");
        bigpicture.getSyncScore(ctrl.val());
        bigpicture.loadUserData(ctrl.val());
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    });
    //});
    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
});
function GetBreadCrumbAndName() {
    Common.ajaxsync({
        url: '/Sync/GetClicked',
        success: function (response) {
            var bvalue = '';
            switch (response) {
                case 1:
                    bvalue = 'Self';
                    break;
                case 2:
                    bvalue = 'Team';
                    break;
                default:
                    break;
            }
            var breadCrumb = '<a href="../Common/Index"> Home </a> >  <a href="../Sync/Sync"> Sync </a>  > ' + bvalue + ' > Track Goals';
            $('.breadcrumb').html(breadCrumb);
            $('#Type').val(bvalue);
        },
        error: function (err) {
        }
    });
}
function GetMode() {
    Common.ajaxsync({
        url: '/Sync/GetMode',
        success: function (response) {
            $('#moreDigDeeper').val(response);
        },
        error: function (err) {
        }
    });
}