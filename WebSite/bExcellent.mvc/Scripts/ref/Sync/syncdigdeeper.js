var bigpicture = {
    getMyNetworkUser: function () {
        Common.ajaxsync({
            url: '/sync/GetNetworkUsersByFbid',
            success: function (response) {
                var html = '';
                for (var i = 0; i < response.length; i++) {
                    html = html + "  <li  id='usrli" + i + "' value=" + response[i].UserPOEMappingId + " class='digdeepertile'>" +
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
                    $("#myphtsync").attr("src", "/Uploadify/LoadImageHandler.ashx?id=" + response.User.UserId + "&rnd=" + Math.random());
                }
            },
            error: function (err) {
                // debugger;
            }
        });
    },
    loadUserData: function (mappingid) {
        Common.ajaxnocache({
            url: '/Sync/GetUserInfoByMappingId?userMappingId=' + mappingid,
            success: function (response) {
                if (response != null) {
                    $("#userphtsync").attr("src", "/Uploadify/LoadImageHandler.ashx?id=" + response.User.UserId + "&rnd=" + Math.random());
                }
            },
            error: function (err) {
                // debugger;
            }
        });
    },
    getSyncScore: function (userMappingId) {
        Common.ajaxsync({
            url: '/sync/GetSyncScoreByFbId?userMappingId=' + userMappingId,
            success: function (response) {
                var html = '';
                /*Content loading starts*/
                for (var i = 0; i < 6; i++) {
                    var img = $('#selectedpoe').val() + response.TScore.ModuleScores[i].ModuleOrderNumber;
                    html = html + "<div class='digrow'>";
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
                    for (var j = 0; j < 5; j++) {
                        maximumOfSelectedGoal = Math.max(recScore.QuestionScores[0].SelectedGoalValue, recScore.QuestionScores[1].SelectedGoalValue, recScore.QuestionScores[2].SelectedGoalValue, recScore.QuestionScores[3].SelectedGoalValue, recScore.QuestionScores[4].SelectedGoalValue);
                        avgSelfScore = (takeScore.QuestionScores[0].Score + takeScore.QuestionScores[1].Score + takeScore.QuestionScores[2].Score + takeScore.QuestionScores[3].Score + takeScore.QuestionScores[4].Score) / 5;
                        avgGoalCompletedMonthDetail = (recScore.QuestionScores[0].GoalCompletedMonth + recScore.QuestionScores[1].GoalCompletedMonth + recScore.QuestionScores[2].GoalCompletedMonth + recScore.QuestionScores[3].GoalCompletedMonth + recScore.QuestionScores[4].GoalCompletedMonth) / 5;
                        avgManagerScore = (recScore.QuestionScores[0].Score + recScore.QuestionScores[1].Score + recScore.QuestionScores[2].Score + recScore.QuestionScores[3].Score + recScore.QuestionScores[4].Score) / 5;
                        maxGoalGap = Math.max(recScore.QuestionScores[0].GoalGap, recScore.QuestionScores[1].GoalGap, recScore.QuestionScores[2].GoalGap, recScore.QuestionScores[3].GoalGap, recScore.QuestionScores[4].GoalGap);
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

                        var goalval = avgGoalCompletedMonthDetail.toFixed();
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

                        avgcompletedMonths = (recScore.QuestionScores[0].GoalCompletedMonth + recScore.QuestionScores[1].GoalCompletedMonth + recScore.QuestionScores[2].GoalCompletedMonth + recScore.QuestionScores[3].GoalCompletedMonth + recScore.QuestionScores[4].GoalCompletedMonth) / 5;
                        avggoalMonthDiff = parseInt(recScore.QuestionScores[j].GoalMonthDiff) * (-1);
                        var avggoalgapitem = Math.max(recScore.QuestionScores[0].GoalGap, recScore.QuestionScores[1].GoalGap, recScore.QuestionScores[2].GoalGap, recScore.QuestionScores[3].GoalGap, recScore.QuestionScores[4].GoalGap);
                        var fixedAvgmonths = avgcompletedMonths.toFixed();
                        {
                            if (maximumOfSelectedGoal > avgselectedvalue) {
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
                        scndcol = scndcol + "<li>" + recScore.QuestionScores[j].ShortQuetionText + "</li>";
                        trdcol = trdcol + "<li>" + recScore.QuestionScores[j].GoalSetedOnStr + "</li>";
                        frthcol = frthcol + "<li>4</li>";
                        ffthcol = ffthcol + "<li class='achieved" + recScore.QuestionScores[j].SelectedGoalValue + "'><ul class='goals'><li>0</li><li>6</li><li>12</li><li>24</li></ul></li>";
                        sixthcol = sixthcol + "<li><div class='gapfit'><div class='gap'>" + takeScore.QuestionScores[j].Score + "</div><div class='gap'>" + recScore.QuestionScores[j].Score + "</div></div></li>";
                        svnthcol = svnthcol + "<li>" + recScore.QuestionScores[j].GoalGap + "<span class='tick'><img src='../../Images/icons/" + img + ".png'/></span></li>";
                        egtcol = egtcol + "<li>" + timeLineGap + completedHtml + goallinehtml + "</li>";
                    }
                    //average
                    {
                        scndcol = scndcol + "<li class='averagecol'><span class='average'>Average </span></li>";
                        trdcol = trdcol + "<li class='averagecol'></li>";
                        frthcol = frthcol + "<li class='averagecol'>4</li>";
                        if (maximumOfSelectedGoal > 0) {
                            ffthcol = ffthcol + "<li class='averagecol achieved" + maximumOfSelectedGoal + "'><ul class='goals'><li>0</li><li>6</li><li>12</li><li>24</li></ul></li>";
                        } else {
                            ffthcol = ffthcol + "<li class='averagecol'><ul class='goals'><li>0</li><li>6</li><li>12</li><li>24</li></ul></li>";
                        }
                        sixthcol = sixthcol + "<li class='averagecol'><div class='gapfit  bdrtpnil'><div class='gap'>" + avgSelfScore.toFixed() + "</div><div class='gap'>" + avgManagerScore.toFixed() + "</div></div></li>";
                        svnthcol = svnthcol + "<li class='averagecol'>" + maxGoalGap + "<span class='tick'><img src='../../Images/icons/" + img + ".png'/></span></li>";
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
                    html = html + fstcol + scndcol + trdcol + frthcol + ffthcol + sixthcol + svnthcol + egtcol + "</div>";;
                }
                //Overall Average
                var valarr = new Array();
                var selfScoreArray = new Array();
                var mngrScore = new Array();
                var goalgap = new Array();
                var goalcompleted = new Array();
                for (var k = 0; k < 5; k++) {
                    var recScore1 = response.RScore.ModuleScores[k];
                    var takeScore1 = response.TScore.ModuleScores[k];
                    maximumOfSelectedGoal = Math.max(recScore1.QuestionScores[0].SelectedGoalValue, recScore1.QuestionScores[1].SelectedGoalValue, recScore1.QuestionScores[2].SelectedGoalValue, recScore1.QuestionScores[3].SelectedGoalValue, recScore1.QuestionScores[4].SelectedGoalValue);
                    valarr.push(maximumOfSelectedGoal);
                    var avgSelfscore = (takeScore1.QuestionScores[0].Score + takeScore1.QuestionScores[1].Score + takeScore1.QuestionScores[2].Score + takeScore1.QuestionScores[3].Score + takeScore1.QuestionScores[4].Score) / 5;
                    selfScoreArray.push(avgSelfscore);
                    var avgManagerScores = (recScore1.QuestionScores[0].Score + recScore1.QuestionScores[1].Score + recScore1.QuestionScores[2].Score + recScore1.QuestionScores[3].Score + recScore1.QuestionScores[4].Score) / 5;
                    mngrScore.push(avgManagerScores);
                    var maxGoalGaps = Math.max(recScore1.QuestionScores[0].GoalGap, recScore1.QuestionScores[1].GoalGap, recScore1.QuestionScores[2].GoalGap, recScore1.QuestionScores[3].GoalGap, recScore1.QuestionScores[4].GoalGap);
                    goalgap.push(maxGoalGaps);
                    var overAllGoalCompletedMonthDetail = (recScore1.QuestionScores[0].GoalCompletedMonth + recScore1.QuestionScores[1].GoalCompletedMonth + recScore1.QuestionScores[2].GoalCompletedMonth + recScore1.QuestionScores[3].GoalCompletedMonth + recScore1.QuestionScores[4].GoalCompletedMonth) / 5;
                    goalcompleted.push(overAllGoalCompletedMonthDetail);
                }

                var avgofmaximumSelectedGoal = Math.max(valarr[0], valarr[1], valarr[2], valarr[3], valarr[4]);
                var avgSelfscores = (selfScoreArray[0] + selfScoreArray[1] + selfScoreArray[2] + selfScoreArray[3] + selfScoreArray[4]) / 5;
                var avgMngrScore = (mngrScore[0] + mngrScore[1] + mngrScore[2] + mngrScore[3] + mngrScore[4]) / 5;
                var avgofGoalgap = Math.max(goalgap[0], goalgap[1], goalgap[2], goalgap[3], goalgap[4]);
                var avgOverallGoalcopleted = (goalcompleted[0] + goalcompleted[1] + goalcompleted[2] + goalcompleted[3] + goalcompleted[4]) / 5;
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

                var goalvals = avgOverallGoalcopleted.toFixed();
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
                    "</li> </div> <div class='digcol secondcol'> <ul> <li class='averagecol'><span class='average'>Overall average </span></li> " +
                    "</ul> </div> <div class='digcol thirdcol'> <ul> <li class='averagecol'></li> </ul> </div> <div class='digcol forthcol'> " +
                    "<ul> <li class='averagecol'><span class='average'>4</span></li> </ul> </div> <div class='digcol sixthcol'> <ul> <li class='averagecol achieved" + avgofmaximumSelectedGoal + "'>" +
                    " <ul class='goals'> <li>0</li> <li>6</li> <li>12</li> <li>24</li> </ul> </li> </ul> </div> " +
                    "<div class='digcol fifthcol'> <ul> <li class='averagecol'> " +
                    "<div class='gapfit bdrtpnil'> <div class='gap'>" + avgSelfscores.toFixed() + "</div> <div class='gap'>" + avgMngrScore.toFixed() + "</div> </div> </li> </ul> </div> <div class='digcol seventhcol'> " +
                    "<ul> <li class='averagecol'> <div class='average'>" + avgofGoalgap + "<span><img src='../../Images/icons/" + img + ".png' /></span></div> </li> </ul> </div> " +
                    "<div class='digcol sixthcol lastcol'><ul> <li class='averagecol'> " + avgtimeLineGap + avgcompletedHtml1 + avggoallinehtml + "</li> </ul> </li> </ul> </div> </div>";

                /*Content loanding ends*/
                html = html + overallAverage;
                $('#digdeepcontnet').html(html);
            },
            error: function (err) {
            }
        });
    }
};

$(document).ready(function () {
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    var html = "<li><a href='/Sync/Sync'><span><img src='../../Images/icons/sync-small.png' /></span>Sync</a> </li>" +
        "<li><a href='/Sync/Bigpicture'><span><img src='../../Images/icons/big-pic-small.png' /></span>Big Picture</a> </li>" +
        "<li><a href='/Sync/DigIn'><span><img src='../../Images/icons/digin-small.png' /></span>Practice Areas</a> </li>" +
        "<li><a href='/Sync/DigDeep'><span><img src='../../Images/icons/dig-deeper-small.png' /></span>Excellence Actions</a> </li>" +
         "<li><a href='/Goal/SetGoals'><span><img src='../../Images/icons/goal-small.png' /></span><p>Set Goals</p></a> </li>" +
        "<li><a href='/Sync/DigDeeper'><span><img src='../../Images/icons/track-goal-small.png' /></span>Track Goals</a> </li>";

    $('#target ul').html(html);
    GetBreadCrumbAndName();
    bigpicture.loadPoeName();
    bigpicture.getMyNetworkUser();
    bigpicture.loadMyData();
    $('#userList li').live('click', function () {
        var ctrl = $(this);
        $(this).addClass("selected");
        $(this).siblings().removeClass("selected");
        bigpicture.getSyncScore(ctrl.val());
        bigpicture.loadUserData(ctrl.val());
    });
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
                    bvalue = 'You';
                    break;
                case 2:
                    bvalue = 'Team';
                    break;
                default:
                    break;
            }
            var breadCrumb = '<a href="../Common/Index"> Home </a> >  <a href="../Sync/Sync"> Sync </a>  > ' + bvalue + ' > Track Goals';
            $('.breadcrumb').html(breadCrumb);
        },
        error: function (err) {
        }
    });
}