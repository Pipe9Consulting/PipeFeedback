var digdeep = {
    getMyNetworkUser: function (mappingid) {
        Common.ajaxsync({
            url: '/sync/GetDigDeepSyncScore',
            data: { 'mappingid': mappingid },
            success: function (response) {
                //debugger;
                var htm = '';
                for (var i = 0; i < response.TScore.ModuleScores.length; i++) {
                    var img = $('#selectedpoe').val() + (i + 1);//$('#selectedpoe').val() + response.RScore.ModuleScores[i].ModuleOrderNumber;
                    var difference = 0;
                    var statusImg = "";
                    var maxscore = response.RScore.ModuleScores[i].WeightageScore;
                    var scoreperNob = (((maxscore) / (response.RScore.ModuleScores[i].QuestionScores.length)) / 4).toFixed(1);
                    if (response.RScore.ModuleScores != null && response.TScore.ModuleScores != null) {
                        img = $('#selectedpoe').val() + response.RScore.ModuleScores[i].ModuleOrderNumber;
                        for (var j = 0; j < response.RScore.ModuleScores[i].QuestionScores.length; j++) {
                            var type = $('#selectedTypedeep').val();
                            var youscore = 0;
                            var managerscore = 0;
                            if (type == 1) {
                                youscore = ((response.TScore.ModuleScores[i].QuestionScores[j].Score) * scoreperNob);
                                if (youscore == 0) {
                                    difference = 0;
                                } else {
                                    managerscore = ((response.RScore.ModuleScores[i].QuestionScores[j].Score) * scoreperNob);
                                    difference = difference + (managerscore - youscore);
                                }
                            } else {
                                youscore = (response.TScore.ModuleScores[i].QuestionScores[j].Score) * scoreperNob;
                                if (youscore == 0) {
                                    difference = 0;
                                } else {
                                    managerscore = (response.RScore.ModuleScores[i].QuestionScores[j].Score) * scoreperNob;
                                    difference = difference + (managerscore - youscore);
                                }
                            }
                        }
                    } else {
                        score = 0;
                    }

                    if (managerscore != 0 && youscore != 0) {
                        if (difference == 0) {
                            statusImg = "<img src='../../Images/icons/tick.png' class='diginimg' />";
                            //statusImg = "<img src='../../Images/icons/exclamation.png' class='diginimg' />"; //"exclamation";
                        } else if (difference < 0) {
                            statusImg = "<img src='../../Images/icons/exclamation.png' class='diginimg' />";
                            // statusImg = "<img src='../../Images/icons/cross.png' class='diginimg' />"; //"cross";
                        } else {
                            statusImg = "<img src='../../Images/icons/exclamation.png' class='diginimg' />";
                            //statusImg = "<img src='../../Images/icons/tick.png' class='diginimg' />"; //"tick";
                        }
                    }
                    htm = htm + " <li class='syncrepmodule' id='mngr" + i + "' data-imgname = " + img + " value=" + i + ">" +
                        //" <div class='number syncnumber' id='PaVal" + response.TScore.ModuleScores[i].Moduleid + "'>" + Math.round(difference) + "</div> " +
                        " <div class='number syncnumber' id='PaVal" + response.TScore.ModuleScores[i].Moduleid + "'></div> " +
                        "<img src='../../Images/icons/" + ((i == 0) ? img + 'h' : img) + ".png' class='diginimg' /><p>" + response.TScore.ModuleScores[i].ModuleName + " </p> " +
                        "</li>";
                }
                for (var ei = response.TScore.ModuleScores.length; ei < 8; ei++) {
                    htm = htm + " <li class='dummytile' id='0' ><div class='number syncnumber' id='PaVal'></div><p></p></li>";
                }
                $('#practiceAreaList').html(htm);
                if (response.TScore.ModuleScores.length <= 8) {
                    $('#practiceAreaList').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                } else {
                    $('#practiceAreaList').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                }
                var t = $('#practiceAreaList li').first();
                var n = $('#networkusers li').first().val();
                var selectedMappingid = $('#selectedMappingid').val();
                // var firstimagename = $('#practiceAreaList li').first().children().filter('img').attr('src').replace('../../Images/icons/', '').replace('.png', '');
                //$('#practiceAreaList li').first().children().filter('img').attr('src').replace(firstimagename, firstimagename + 'h');
                t.addClass('selected');
                var mappingid = $('#mappingid').val();
                if (mappingid == 0) {
                    if (selectedMappingid != 0) {
                        digdeep.getSyncScore(t.val(), selectedMappingid);
                        GetManagerName(selectedMappingid);
                        $('#mappingid').val(selectedMappingid);
                    } else {
                        digdeep.getSyncScore(t.val(), n);
                        GetManagerName(n);
                        $('#mappingid').val(n);
                    }
                } else {
                    digdeep.getSyncScore(t.val(), mappingid);
                    GetManagerName(mappingid);
                    $('#mappingid').val(mappingid);
                }
            },
            error: function () {
            }
        });
    },
    getMyNetworkUserDrpDown: function () {
        Common.ajaxsync({
            url: '/sync/GetNetworkUsers',
            success: function (response) {
                var html = '';
                for (var i = 0; i < response.length; i++) {
                    html = html + "  <li  id='usrdrpli" + i + "' value=" + response[i].UserPOEMappingId + ">" +
                        response[i].User.FirstName + " " + response[i].User.LastName +
                        "</li>";
                    $('#membername').text(response[0].User.FirstName + " " + response[0].User.LastName);
                }
                $('#networkusers').html(html);
            },
            error: function () {
            }
        });
    },
    getSyncScore: function (moduleid, mappingid) {
        var pagemode = $('#moreDigDeep').val();
        var url = String.empty;
        if (pagemode == "1") {
            url = '/sync/GetDigDeepSyncScoreByFbid';
        } else {
            url = '/sync/GetDigDeepSyncScore';
        }
        if (pagemode == "1" && mappingid != undefined) {
            url = '/sync/GetSyncScoreByFbId?userMappingId=' + mappingid;
        } else if (mappingid != undefined) {
            url = '/sync/GetSyncScore?userMappingId=' + mappingid;
        }

        Common.ajaxsync({
            url: url,//'/sync/GetDigDeepSyncScore',
            success: function (response) {
                ///*-----------------------------------------------------------------------------------------------*/
                var prevNavHtml = "<a href='#' class='prev pmodule' onclick='createchart.prevModule()'>Previous</a>";
                var nxtNavHtml = "<a href='#' class='nxt nmodule' onclick='createchart.nextModule()'>Previous</a>";
                var htmlContent = "";
                var questionScore = response.TScore.ModuleScores[moduleid].QuestionScores.length;
                var noofOccurences = Math.ceil(questionScore / 4);
                var totalNoofPages = (noofOccurences > 1 ? "<div class='pagination' id='pagetxt'>Page 1 of " + noofOccurences + "</div>" : "");
                var i = 0;
                var m = 0;
                //var balanceQuestionScore = (4 * noofOccurences) - questionScore;
                var newquestionScore = (4 * noofOccurences);//questionScore + balanceQuestionScore;
                //for (var k = 0; k < noofOccurences; k++) {
                //    htmlContent = htmlContent;
                for (; i < newquestionScore ; i++) {
                    var questionId = i + 1;
                    if (i == 0) {
                        m++;
                        htmlContent = htmlContent + "<div id='q" + m + "'' class='slide'>";
                        if (newquestionScore > 4) {
                            prevNavHtml = prevNavHtml + "<a href='#' class='prev' id='p" + m + "' onclick='createchart.PreviewEI(" + m + "," + noofOccurences + ")'>Previous</a>";
                            nxtNavHtml = nxtNavHtml + "<a href='#' class='nxt' id='bn" + m + "' onclick='createchart.NextEI(" + m + "," + noofOccurences + ")'>Next</a>";
                        }
                    }
                    else if ((i % 4) == 0) {
                        m++;
                        htmlContent = htmlContent + "</div><div id='q" + m + "'' class='slide'>";
                        if (newquestionScore > 4) {
                            prevNavHtml = prevNavHtml + "<a href='#' class='prev' id='p" + m + "' onclick='createchart.PreviewEI(" + m + "," + noofOccurences + ")'>Previous</a>";
                            nxtNavHtml = nxtNavHtml + "<a href='#' class='nxt' id='bn" + m + "' onclick='createchart.NextEI(" + m + "," + noofOccurences + ")'>Next</a>";
                        }
                    }
                    var legendText = "Self";

                    if ($('#selectedTypedeep').val() == 2) {
                        legendText = "Your Feedback";
                    }
                    if (i != 0 && ((i + 1) % 2) == 0) {
                        if (questionScore > i) {
                            htmlContent = htmlContent + "<div class='chartsmlplaceholder'><div class='digqn'>" + questionId + "</div><div class='digdev' id='Qtext" + questionId + "'>" + response.TScore.ModuleScores[moduleid].QuestionScores[i].ShortQuetionText + "</div>" +
                                "<div class='chartdiv'><div class='legend'><ul><li class='legend1'>" + legendText + "</li><li class='legend2'>Manager</li></ul></div><div class='chart'><div class='chartop'></div>" +
                                "<div class='chartbg'><div class='chartarea'><ul><li class='progressbar1' style='width: 0%' id='PArea" + questionId + "Pro1'><p></p></li><li class='progressbar2' style='width: 0%' id='PArea" + questionId + "Pro2'>" +
                                "<p></p></li></ul></div></div><div class='chartbtm'><div class='markerholder'><ul><li class='markergray' style='display:none; width: 0%' id='PArea" + questionId + "Mar2'>" +
                                "<p></p></li><li class='markeramper' style='display:none; width: 0%' id='PArea" + questionId + "Mar1'><p></p></li></ul></div></div></div><div class='pointer'></div>" +
                                "<div class='status' id='PArea" + questionId + "'></div></div></div></div>";
                        } else {
                            htmlContent = htmlContent + "<div class='chartsmlplaceholder'><div class='digqn digqn-dummy'>&nbsp;</div>" +
                                "<div class='digdev' id='Qtext" + (i + 1) + "'>&nbsp;</div><div class='chartdiv dummychartdiv'></div></div></div>";
                            //htmlContent = htmlContent + "<div class='chartsmlplaceholder'><div class='digqn'></div><div class='digdev' id='Qtext" + questionId + "'>&nbsp;</div>" +
                            //    "<div class='chartdiv'><div class='legend'><ul><li class='legend1'>You</li><li class='legend2'>Manager</li></ul></div><div class='chart'><div class='chartop'></div>" +
                            //    "<div class='chartbg'><div class='chartarea'><ul><li class='progressbar1' style='width: 0%' id='PArea" + questionId + "Pro1'><p></p></li><li class='progressbar2' style='width: 0%' id='PArea" + questionId + "Pro2'>" +
                            //    "<p></p></li></ul></div></div><div class='chartbtm'><div class='markerholder'><ul><li class='markergray' style='width: 0%' id='PArea" + questionId + "Mar2'>" +
                            //    "<p></p></li><li class='markeramper' style='width: 0%' id='PArea" + questionId + "Mar1'><p></p></li></ul></div></div></div><div class='pointer'></div>" +
                            //    "<div class='DigstatusUp' id='PArea" + questionId + "'></div></div></div></div>";
                        }
                    } else {
                        if (questionScore > i) {
                            htmlContent = htmlContent + "<div class='coltwo'><div class='chartsmlplaceholder'><div class='digqn'>" + questionId + "</div><div class='digdev' id='Qtext" + questionId + "'>" + response.TScore.ModuleScores[moduleid].QuestionScores[i].ShortQuetionText + "</div><div class='chartdiv'><div class='legend'>" +
                                "<ul><li class='legend1'>" + legendText + "</li><li class='legend2'>Manager</li></ul></div><div class='chart'><div class='chartop'></div><div class='chartbg'><div class='chartarea'>" +
                                "<ul><li class='progressbar1' style='width: 0%' id='PArea" + questionId + "Pro1'><p></p></li><li class='progressbar2' style='width: 0%' id='PArea" + questionId + "Pro2'><p></p></li></ul></div></div>" +
                                "<div class='chartbtm'><div class='markerholder'><ul><li class='markergray' style='display:none; width: 0%' id='PArea" + questionId + "Mar2'><p></p></li><li class='markeramper' style='display:none; width: 0%' id='PArea" + questionId + "Mar1'>" +
                                "<p></p></li></ul></div></div></div><div class='pointer'></div><div class='status' id='PArea" + questionId + "'></div></div></div>";
                        }
                        else {
                            htmlContent = htmlContent + "<div class='coltwo'><div class='chartsmlplaceholder'><div class='digqn digqn-dummy'>&nbsp;</div>" +
                                "<div class='digdev' id='Qtext" + (i + 1) + "'>&nbsp;</div><div class='chartdiv dummychartdiv'></div></div>";
                            //htmlContent = htmlContent + "<div class='coltwo'><div class='chartsmlplaceholder'><div class='digqn'></div><div class='digdev' id='Qtext" + questionId + "'>&nbsp;</div><div class='chartdiv'><div class='legend'>" +
                            //    "<ul><li class='legend1'>You</li><li class='legend2'>Manager</li></ul></div><div class='chart'><div class='chartop'></div><div class='chartbg'><div class='chartarea'>" +
                            //    "<ul><li class='progressbar1' style='width: 0%' id='PArea" + questionId + "Pro1'><p></p></li><li class='progressbar2' style='width: 0%' id='PArea" + questionId + "Pro2'><p></p></li></ul></div></div>" +
                            //    "<div class='chartbtm'><div class='markerholder'><ul><li class='markergray' style='width: 0%' id='PArea" + questionId + "Mar2'><p></p></li><li class='markeramper' style='width: 0%' id='PArea" + questionId + "Mar1'>" +
                            //    "<p></p></li></ul></div></div></div><div class='pointer'></div><div class='DigstatusUp' id='PArea" + questionId + "'></div></div></div>";
                        }
                    }
                }
                //}
                $('.chartslide').empty().html(htmlContent + "</div>");
                if (questionScore <= 4) {
                    //$('.slidebtn').hide();
                }
                else {
                    $('.slidebtn').show();
                    $('.slidebtn').empty().html((prevNavHtml + totalNoofPages + nxtNavHtml));
                }
                /*
                var htmlContent = "";
                var htmlPrev = "";
                var htmlNext = "";
                var questionScores = response.TScore.ModuleScores[moduleid].QuestionScores.length;
                var paginationCount = Math.ceil(questionScores / 4);
                var paginationText = "<div class='pagination' id='pagetxt'>Page 1 of " + paginationCount + "</div>";
                var newModuleScores = (4 * paginationCount);
                for (var y = 0; y < paginationCount; y++) {
                    htmlContent = htmlContent + '<div id="q' + (y + 1) + '" class="slide">';
                    for (var z = 0; z < newModuleScores; z++) {
                        if (z == 0) {
                            y++;
                            htmlPrev = htmlPrev + "<a href='#' class='prev' id='p" + y + "' onclick='createchart.PreviewEI(" + y + ", " + paginationCount + ");'>Previous</a>";
                            htmlNext = htmlNext + "<a href='#' class='nxt' id='bn" + y + "' onclick='createchart.NextEI(" + y + ", " + paginationCount + ");'>Next</a>";
                        }
                        else if (z % 4 == 0) {
                            y++;
                            htmlContent = htmlContent + '</div><div id="q' + y + '" class="slide">';
                            htmlPrev = htmlPrev + "<a href='#' class='prev' id='p" + y + "' onclick='createchart.PreviewEI(" + y + ", " + paginationCount + ");'>Previous</a>";
                            htmlNext = htmlNext + "<a href='#' class='nxt' id='bn" + y + "' onclick='createchart.NextEI(" + y + ", " + paginationCount + ");'>Next</a>";
                        }
                        if (z != 0 && (z + 1) % 2 == 0) {
                            if (questionScores > z) {
                                htmlContent = htmlContent + "<div class='chartsmlplaceholder'><div class='digqn'>" + (z + 1) + "</div>" +
                                    "<div class='digdev' id='Qtext" + (z + 1) + "'></div>" + response.TScore.ModuleScores[moduleid].QuestionScores[z].ShortQuetionText + "<div class='chartdiv'><div class='legend'>" +
                                    "<ul><li class='legend1'>You</li><li class='legend2'>Manager</li></ul></div><div class='chart'>" +
                                    "<div class='chartop'></div><div class='chartbg'><div class='chartarea'><ul>" +
                                    "<li class='progressbar1' style='width: 0%' id='PArea" + (z + 1) + "Pro1'><p></p></li>" +
                                    "<li class='progressbar2' style='width: 0%' id='PArea" + (z + 1) + "Pro2'><p></p></li></ul></div></div>" +
                                    "<div class='chartbtm'><div class='markerholder'><ul><li class='markergray' style='width: 0%' id='PArea" + (z + 1) + "Mar2'>" +
                                    "<p>50</p></li><li class='markeramper' style='width: 0%' id='PArea" + (z + 1) + "Mar1'><p>30</p></li></ul></div></div>" +
                                    "</div><div class='pointer'></div><div class='DigstatusUp' id='PArea" + (z + 1) + "'>0.8</div></div></div></div>";
                            } else {
                                //htmlContent = htmlContent + "<div class='chartsmlplaceholder'><div class='digqn digqn-dummy'>&nbsp;</div>" +
                                //    "<div class='digdev' id='Qtext" + (z + 1) + "'>&nbsp;</div><div class='chartdiv dummychartdiv'></div></div></div>";
                                htmlContent = htmlContent + "<div class='chartsmlplaceholder'><div class='digqn'>" + (z + 1) + "</div>" +
                                    "<div class='digdev' id='Qtext" + (z + 1) + "'></div><div class='chartdiv'><div class='legend'>" +
                                    "<ul><li class='legend1'>You</li><li class='legend2'>Manager</li></ul></div><div class='chart'>" +
                                    "<div class='chartop'></div><div class='chartbg'><div class='chartarea'><ul>" +
                                    "<li class='progressbar1' style='width: 0%' id='PArea" + (z + 1) + "Pro1'><p></p></li>" +
                                    "<li class='progressbar2' style='width: 0%' id='PArea" + (z + 1) + "Pro2'><p></p></li></ul></div></div>" +
                                    "<div class='chartbtm'><div class='markerholder'><ul><li class='markergray' style='width: 0%' id='PArea" + (z + 1) + "Mar2'>" +
                                    "<p>50</p></li><li class='markeramper' style='width: 0%' id='PArea" + (z + 1) + "Mar1'><p>30</p></li></ul></div></div>" +
                                    "</div><div class='pointer'></div><div class='DigstatusUp' id='PArea" + (z + 1) + "'>0.8</div></div></div></div>";
                            }
                        }
                        else {
                            if (questionScores > z) {
                                htmlContent = htmlContent + "<div class='coltwo'><div class='chartsmlplaceholder'><div class='digqn'>" + (z + 1) + "</div>" +
                                    "<div class='digdev' id='Qtext" + (z + 1) + "'>" + response.TScore.ModuleScores[moduleid].QuestionScores[z].ShortQuetionText + "</div><div class='chartdiv'><div class='legend'>" +
                                    "<ul><li class='legend1'>You</li><li class='legend2'>Manager</li></ul></div><div class='chart'><div class='chartop'></div>" +
                                    "<div class='chartbg'><div class='chartarea'><ul><li class='progressbar1' style='width: 0%' id='PArea" + (z + 1) + "Pro1'><p></p></li>" +
                                    "<li class='progressbar2' style='width: 0%' id='PArea" + (z + 1) + "Pro2'><p></p></li></ul></div></div><div class='chartbtm'>" +
                                    "<div class='markerholder'><ul><li class='markergray' style='width: 0%' id='PArea" + (z + 1) + "Mar2'><p>50</p></li>" +
                                    "<li class='markeramper' style='width: 0%' id='PArea" + (z + 1) + "Mar1'><p>30</p></li></ul></div></div></div><div class='pointer'></div>" +
                                    "<div class='DigstatusUp' id='PArea" + (z + 1) + "'>0.8</div></div></div>";
                            } else {
                                //htmlContent = htmlContent + "<div class='coltwo'><div class='chartsmlplaceholder'><div class='digqn digqn-dummy'>&nbsp;</div>" +
                                //    "<div class='digdev' id='Qtext" + (z + 1) + "'>&nbsp;</div><div class='chartdiv dummychartdiv'></div></div>";
                                htmlContent = htmlContent + "<div class='coltwo'><div class='chartsmlplaceholder'><div class='digqn'>" + (z + 1) + "</div>" +
                                    "<div class='digdev' id='Qtext" + (z + 1) + "'>&nbsp;</div><div class='chartdiv'><div class='legend'>" +
                                    "<ul><li class='legend1'>You</li><li class='legend2'>Manager</li></ul></div><div class='chart'><div class='chartop'></div>" +
                                    "<div class='chartbg'><div class='chartarea'><ul><li class='progressbar1' style='width: 0%' id='PArea" + (z + 1) + "Pro1'><p></p></li>" +
                                    "<li class='progressbar2' style='width: 0%' id='PArea" + (z + 1) + "Pro2'><p></p></li></ul></div></div><div class='chartbtm'>" +
                                    "<div class='markerholder'><ul><li class='markergray' style='width: 0%' id='PArea" + (z + 1) + "Mar2'><p>50</p></li>" +
                                    "<li class='markeramper' style='width: 0%' id='PArea" + (z + 1) + "Mar1'><p>30</p></li></ul></div></div></div><div class='pointer'></div>" +
                                    "<div class='DigstatusUp' id='PArea" + (z + 1) + "'>0.8</div></div></div>";
                            }
                        }
                    }
                }
                $('.chartslide').html(htmlContent + "</div>");
                $('.slidebtn').empty().html((paginationCount > 1 ? (htmlPrev + paginationText + htmlNext) : "&nbsp;"));
                */
                ///*-----------------------------------------------------------------------------------------------*/
                var maxscore = response.RScore.ModuleScores[moduleid].WeightageScore;
                var scoreperNob = ((maxscore) / (response.RScore.ModuleScores[moduleid].QuestionScores.length)) / 4;
                /*-----------------------------------------------------------------------------------------------*/
                for (var j = 0; j < response.TScore.ModuleScores[moduleid].QuestionScores.length; j++) {
                    var type = $('#selectedTypedeep').val();
                    if (type == 1) {
                        //$('#Qtext' + (j + 1)).text(response.TScore.ModuleScores[moduleid].QuestionScores[j].ShortQuetionText);
                        var questionText = {
                            "values": [{
                                "name": "You",
                                "score": (response.TScore.ModuleScores == null || response.TScore.ModuleScores[moduleid] == undefined) ? 0 : response.TScore.ModuleScores[moduleid].QuestionScores[j].ScorePercentage// (response.RScore.ModuleScores == null || response.RScore.ModuleScores[moduleid] == undefined) ? 0 : response.RScore.ModuleScores[moduleid].QuestionScores[j].ScorePercentage
                            },
                            {
                                "name": "Top",
                                "score": (response.RScore.ModuleScores == null || response.RScore.ModuleScores[moduleid] == undefined) ? 0 : response.RScore.ModuleScores[moduleid].QuestionScores[j].ScorePercentage//(response.TScore.ModuleScores == null || response.TScore.ModuleScores[moduleid] == undefined) ? 0 : response.TScore.ModuleScores[moduleid].QuestionScores[j].ScorePercentage
                            }]
                        };
                        createchart.loadchartdata(questionText, "PArea" + (j + 1), scoreperNob.toFixed(1));
                    } else {
                        //$('#Qtext' + (j + 1)).text(response.TScore.ModuleScores[moduleid].QuestionScores[j].ShortQuetionText);
                        var questionText = {
                            "values": [{
                                "name": "You",
                                "score": (response.RScore.ModuleScores == null || response.RScore.ModuleScores[moduleid] == undefined) ? 0 : response.RScore.ModuleScores[moduleid].QuestionScores[j].ScorePercentage//(response.TScore.ModuleScores == null || response.TScore.ModuleScores[moduleid] == undefined) ? 0 : response.TScore.ModuleScores[moduleid].QuestionScores[j].ScorePercentage
                            },
                            {
                                "name": "Top",
                                "score": (response.TScore.ModuleScores == null || response.TScore.ModuleScores[moduleid] == undefined) ? 0 : response.TScore.ModuleScores[moduleid].QuestionScores[j].ScorePercentage//(response.RScore.ModuleScores == null || response.RScore.ModuleScores[moduleid] == undefined) ? 0 : response.RScore.ModuleScores[moduleid].QuestionScores[j].ScorePercentage
                            }]
                        };
                        createchart.loadchartdata(questionText, "PArea" + (j + 1), scoreperNob.toFixed(1));
                    }
                }
                //GetManagerName();
            },
            error: function (err) {
            }
        });
        /*   var d = $('.selected P').html();
        $('.legend2').html(d);*/
    }, loadPoeName: function () {
        Common.ajaxsync({
            url: "../../Common/GetPoeName",
            //    data: option.data,

            success: function (response) {
                $('#selectedpoe').val(response);
            },
            error: function (err) {
            }
        });
    },
    HighlightTile: function (obj) {
        var selimg = $(obj).data('imgname')
        $('#practiceAreaList li').not('.dummytile').each(function () {
            var img = $(this).data('imgname')
            $(this).find('img').attr('src', '../../images/icons/' + img + '.png')
        });
        $(obj).find('img').attr('src', '../../images/icons/' + selimg + 'h.png');
    }
};

var createchart = {
    loadchartdata: function (chart, element, scoreperNob) {
        var x = chart.values.length;
        $('.common1').text(scoreperNob);
        $('.common2').text((scoreperNob * 2).toFixed(1));
        $('.common3').text((scoreperNob * 3).toFixed(1));
        $('.common4').text((scoreperNob * 4).toFixed(1));
        var marginBuffer = 11;
        for (var j = 0; j < x; j++) {
            if (x == 2) {
                var calc = 0;
                var type = $('#selectedTypedeep').val();
                if (type == 1) {
                    calc = (parseInt(chart.values[1].score / 25) * scoreperNob) - (parseInt(chart.values[0].score / 25) * scoreperNob);
                } else {
                    calc = (parseInt(chart.values[0].score / 25) * scoreperNob) - (parseInt(chart.values[1].score / 25) * scoreperNob);
                }
                // $('#' + element + '').text(calc.toFixed(2));

                var calcValue = (calc < 0) ? (calc * (-1)) : calc;
                calcValue = (calcValue == 0) ? "0" : calcValue.toFixed(1);
                //$('#' + element + '').text(calcValue);
                $('#' + element + '').text();
                //if ($('#' + element + '').hasClass('dwnstatus')) {
                //    var sclass = (calc < 0) ? "dwnstatus" : "status";
                //    if (calc == 0) {
                //        sclass = "digstatuszero";
                //    }
                //    $('#' + element + '').removeClass('dwnstatus');
                //    $('#' + element + '').addClass(sclass);
                //}
                //if ($('#' + element + '').hasClass('status')) {
                //    var sclass = (calc < 0) ? "dwnstatus" : "status";
                //    if (calc == 0) {
                //        sclass = "digstatuszero";
                //    }
                //    $('#' + element + '').removeClass('status');
                //    $('#' + element + '').addClass(sclass);
                //}
                //if ($('#' + element + '').hasClass('digstatuszero')) {
                //    var sclass = (calc < 0) ? "dwnstatus" : "status";
                //    if (calc == 0) {
                //        sclass = "digstatuszero";
                //    }
                //    $('#' + element + '').removeClass('digstatuszero');
                //    $('#' + element + '').addClass(sclass);
                //}

                //if ($('#' + element + '').hasClass('dwnstatusDown')) {
                //    var sclass = (calc < 0) ? "dwnstatusDown" : "DigstatusUp";
                //    if (calc == 0) {
                //        sclass = "digstatusEqual";
                //    }
                //    $('#' + element + '').removeClass('dwnstatusDown');
                //    $('#' + element + '').addClass(sclass);
                //}
                //if ($('#' + element + '').hasClass('DigstatusUp')) {
                //    var sclass = (calc < 0) ? "dwnstatusDown" : "DigstatusUp";
                //    if (calc == 0) {
                //        sclass = "digstatusEqual";
                //    }
                //    $('#' + element + '').removeClass('DigstatusUp');
                //    $('#' + element + '').addClass(sclass);
                //}
                //if ($('#' + element + '').hasClass('digstatusEqual')) {
                //    var sclass = (calc < 0) ? "dwnstatusDown" : "DigstatusUp";
                //    if (calc == 0) {
                //        sclass = "digstatusEqual";
                //    }
                //    $('#' + element + '').removeClass('digstatusEqual');
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

            //$("#" + element + 'Mar' + (j + 1) + " P").text((chart.values[j].score == 0) ? "" : (parseInt(chart.values[j].score / 25) * scoreperNob).toFixed(1));
            $("#" + element + 'Mar' + (j + 1) + " P").text();
            $("#" + element + 'Pro' + (j + 1)).css("width", parseInt(chart.values[j].score) + "%");
            $("#" + element + 'Mar' + (j + 1)).css("width", parseInt(chart.values[j].score) + "%");
        }
        var values = new Array();

        // move all elements to array first
        for (var i = 0; i < chart.values.length; i++) {
            values.push(chart.values[i].score);
        }

        // set the unique values first
        for (i = 0; i < values.length; i++) {
            if (values[i] != 0) {
                marginBuffer = 5;
                for (var k = i + 1; k < values.length; k++) {
                    if (values[i] == values[k]) {
                        $("#" + element + 'Mar' + (k).toString()).css({
                            'margin-left': (marginBuffer + 0.7).toString() + "%",
                            'margin-top': "-" + (-2 + marginBuffer) + "%",
                            'z-index': (-2 + marginBuffer).toString(),
                        });
                        marginBuffer += 15;
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
    },

    onLoad: function (current, pages) {
        //debugger;
        if (current != 1) {
            var previousPage = (current - 1);
            $('.prev,.nxt').hide();
            $('#p' + previousPage + ',#bn' + previousPage).show();
            $("#q" + previousPage).show("slow");
            $('#q' + previousPage).animate({ 'margin-left': '5%' }, { duration: 0 });
            $('#q' + previousPage).css('opacity', '2');
            //$('#q' + pages).animate({ 'margin-left': '-3%' }, { duration: 1000 });

            $("#q" + pages).animate({ 'margin-left': '-2%' }, { duration: 0 });
            $("#q" + pages).show().css('opacity', '0.4');
            $('#q3').hide();
            $('#pagetxt').html(' Page ' + previousPage + ' of ' + pages);
            //setTimeout(function () {
            //$("#q" + current).show();
            //}, 1000);
            if (current == 2) {
                $("#p1").hide();
            }
        }
    },
    nextModule: function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        $('.selected').next('li').click();
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    },
    prevModule: function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        $('.selected').prev('li').click();
        var length = $('.chartslide').find('.slide').length;
        if (length == 2) {
            createchart.LoadArrows(1, 2);
        }
        if (length == 3) {
            createchart.LoadArrows(2, 3);
        }
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    },
    PreviewEI: function (current, pages) {

        if (current == 3 && pages == 3) {
            var previousPage = (current - 1);
            $('.prev,.nxt').hide();
            $('#p' + previousPage + ',#bn' + previousPage).show();
            $('#q1').animate({ 'margin-left': '-35%' }, { duration: 1000 })
            //$('#q1').hide();
            $('#q1').css('opacity', '0.4');
            $('#q2').animate({ 'margin-left': '-3%' }, { duration: 1000 });
            $('#q2').css('opacity', '2');
            $('#q3').animate({ 'margin-left': '-2%' }, { duration: 1000 });
            $('#q3').css('opacity', '0.4');

        }
        else {
            var previousPage = (current - 1);
            $('.prev,.nxt').hide();
            $('#p' + previousPage + ',#bn' + previousPage).show();
            $("#q" + previousPage).show("slow");
            $('#q' + previousPage).animate({ 'margin-left': '5%' }, { duration: 1000 });
            $('#q' + previousPage).css('opacity', '2');
            $('#q' + current).animate({ 'margin-left': '-2%' }, { duration: 1000 });
            $('#q' + current).css('opacity', '0.4');
            $('#pagetxt').html(' Page ' + previousPage + ' of ' + pages);
            $('#q3').hide();
            //setTimeout(function () {
            $("#q" + current).show();
            //}, 1000);
            if (current == 2) {
                $("#p1").hide();
                
            }
            
        }
        //alert($('.selected').attr("value"));
        if ($('.selected').attr("value") != 0) {
            $(".pmodule").show();
        } else {
            $(".pmodule").hide();
        }
    },
    NextEI: function (current, page) {
        //debugger;
        if (current == 2 && page == 3) {
            var nextPage = (current + 1);
            $('.prev,.nxt').hide();
            $('#p' + nextPage + ',#bn' + nextPage).show();
            $('#q1').animate({ 'margin-left': '-84%' }, { duration: 1000 });
            //$('#q1').hide();
            $('#q1').css('opacity', '0.4');
            $('#q2').animate({ 'margin-left': '-35%' }, { duration: 1000 });
            $('#q2').css('opacity', '0.4');
            $('#q3').animate({ 'margin-left': '-3%' }, { duration: 1000 });
            $('#q3').css('opacity', '2');
            $("#bn3").hide();
        }
        else {
            //debugger;
            var nextPage = (current + 1);
            if (page == nextPage)
                $('#bn' + nextPage).hide();
            //var firstPage = (current - 1);
            //var secondPage = (page - current);
            $('.prev,.nxt').hide();
            $('#p' + nextPage).show();

            $("#q" + current).animate({ 'margin-left': '-35%' }, { duration: 1000 });
            $("#q" + current).css('opacity', '0.4');
            $("#q" + nextPage).animate({ 'margin-left': '-3%' }, { duration: 1000 });
            $("#q" + nextPage).css('opacity', '2');
            if (page == 3) {
                $("#q" + page).animate({ 'margin-left': '-2%' }, { duration: 500 });
                $("#q" + page).css('opacity', '0.4');
                $("#q" + page).show('10');
                $("#bn" + nextPage).show();
            }
            $('#pagetxt').html(' Page ' + nextPage + ' of ' + page);
            $("#q" + nextPage).show();
        }
        
        if((current+1)==page) {
            $('.nmodule').show();
        }
    },
    LoadArrows: function (current, page) {
        debugger;
        if (current == 2 && page == 3) {
            var nextPage = (current + 1);
            $('.prev,.nxt').hide();
            $('#p' + nextPage + ',#bn' + nextPage).show();
            $('#q1').animate({ 'margin-left': '-84%' }, { duration: 0 });
            $('#q3').show();
            $('#q1').css('opacity', '0.4');
            $('#q2').animate({ 'margin-left': '-35%' }, { duration: 0 });
            $('#q2').css('opacity', '0.4');
            $('#q3').animate({ 'margin-left': '-3%' }, { duration: 0 });
            $('#q3').css('opacity', '2');
            $("#bn3").hide();
        }
        else {
            //debugger;
            var nextPage = (current + 1);
            if (page == nextPage)
                $('#bn' + nextPage).hide();
            //var firstPage = (current - 1);
            //var secondPage = (page - current);
            $('.prev,.nxt').hide();
            $('#p' + nextPage).show();

            $("#q" + current).animate({ 'margin-left': '-35%' }, { duration: 0 });
            $("#q" + current).css('opacity', '0.4');
            $("#q" + nextPage).animate({ 'margin-left': '-3%' }, { duration: 0 });
            $("#q" + nextPage).css('opacity', '2');
            if (page == 3) {
                $("#q" + page).animate({ 'margin-left': '-2%' }, { duration: 0 });
                $("#q" + page).css('opacity', '0.4');
                $("#q" + page).show('10');
                $("#bn" + nextPage).show();
            }
            $('#pagetxt').html(' Page ' + nextPage + ' of ' + page);
            $("#q" + nextPage).show();
        }

        if ((current + 1) == page) {
            $('.nmodule').show();
        }
    },
    LoadPoeDetailContent: function () {
        Common.ajaxsync({
            url: '/Standing/GetPoeContent',
            success: function (response) {
                var totrarely = 0;
                var totInconsistenly = 0;
                var totFrequently = 0;
                var totAlways = 0;

                var html = "<tr> <td colspan='3' class='desctablepoe'> <h1> " + response.Modules[0].PoeName + "</h1> </td> </tr> <tr> <th> Practice Area </th> <th> Rarely </th> <th> In-Consistently </th> <th> Frequently </th> <th> Always </th> </tr><tr><td colspan='5'><div class='scroll2'><table id='diginsyncPoeContentScroll'><tr><td>";
                for (var i = 0; i < response.Modules.length; i++) {
                    totrarely = totrarely + response.Modules[i].WeightageScores.Rarely;
                    totInconsistenly = totInconsistenly + response.Modules[i].WeightageScores.Inconsistenly;
                    totFrequently = totFrequently + response.Modules[i].WeightageScores.Frequently;
                    totAlways = totAlways + response.Modules[i].WeightageScores.Always;
                    html = html + "<tr> <td>" + response.Modules[i].Modulename + "</td> <td>" + response.Modules[i].WeightageScores.Rarely + "</td> <td>" + response.Modules[i].WeightageScores.Inconsistenly + "</td><td>" + response.Modules[i].WeightageScores.Frequently + "</td><td>" + response.Modules[i].WeightageScores.Always + "</td> </tr>";
                }
                html = html + "</td></tr></table></div></td></tr><tr> <th> Total </th> <th>25</th> <th>50</th> <th>75 </th> <th>100</th> </tr>";
                $('#diginsyncPoeContent').html(html);
                $('.scroll2').slimScroll();
                if (response.Modules.length <= 5) {
                    $('#diginsyncPoeContentScroll').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                } else {
                    $('#diginsyncPoeContentScroll').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                }
            }
        });
    }
};

$(document).ready(function () {
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $('.clickdeeper').show();
    Common.setTopMenu(4);
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/start-sync_h.png');
    $('.indexrightclose').live('click', function () {
        $(".indexrightclose, .indexclose").hide();
        $(".indexrightarrow ,.indexrightclose1").show();
        $(".modelcontent").animate({ left: "-100%" }, 500);
    });
    $('.indexclose').live('click', function () {
        $(this).hide();
        //$(".indexrightclose").show();
        //$(".indexrightclose1").hide();
        $(".indexrightclose").hide();
        $(".indexrightclose1").show();
        $(".indexright").animate({ right: "0" }, 500);
    });
    $('.indexrightclose1').live('click', function () {
        $(".indexrightclose, .indexrightclose1").hide();
        $(".indexclose").show();
        $(".indexright").animate({ right: "-33.5%" }, 500);
        $(".modelcontent").animate({ left: "0%" }, 500);
    });
    $(document).click(function (event) {
        if ($(event.target).parents().index($('.indexright')) == -1) {
            if ($('.indexright').is(":visible")) {
                $(".indexright").animate({ right: "-33.5%" }, 500);
                $(".indexclose").show();
                $(".modelcontent").animate({ left: "0" }, 500);
            }
        }
    });

    $('#pagetwo').click(function () {
        $(".indexrightclose, .indexclose").hide();
        $(".indexrightarrow ,.indexrightclose1").show();
        $(".modelcontent").animate({ left: "-100%" }, 500);
    });
    $('#pageoneval').click(function () {
        //$(".indexclose").show();
        $(".indexrightclose").show();
        $(".indexrightclose1").hide();
        //$(".indexrightclose, .indexrightclose1").hide();
        //$(".indexright").animate({ right: "-33.5%" }, 500);
        $(".modelcontent").animate({ left: "0%" }, 500);
    });

    //$('.indexrightclose').live('click', function () {
    //    $(this).hide();
    //    $(".indexrightarrow .indexclose").show();
    //    $(".indexright").animate({ right: "-12%" }, 500);
    //});
    //$('.indexclose').live('click', function () {
    //    $(this).hide();
    //    $(".indexrightclose").show();
    //    $(".indexright").animate({ right: "0" }, 500);
    //});

    //$(document).click(function (event) {
    //    if ($(event.target).parents().index($('.indexright')) == -1) {
    //        if ($('.indexright').is(":visible")) {
    //            $(".indexright").animate({ right: "-12%" }, 500);
    //            $(".indexclose").show();
    //        }
    //    }
    //});
    $(document).click(function (event) {
        if ($(event.target).parents().index($('.excellencemenu')) == -1) {
            if ($('.sendinv').is(":visible")) {
                $(".sendinv").slideUp("slow");
                $(".addmember").css('background-image', 'url(/Images/select-arrow.gif)');
            }
        }
    });
    $('.scroll1').slimScroll();
    $('.scroll2').slimScroll();
    $(".addmember").click(function () {
        var X = $(this).attr('id');

        if (X == 1) {
            $(".sendinv").hide();
            $(this).attr('id', '0');
            $(this).css('background', '');
        }
        else {
            $(".sendinv").show();
            $(this).attr('id', '1');
            $(this).css('background-image', 'url(/Images/select-arrow-up.png)');
        }
    });
    digdeep.loadPoeName();
    digdeep.getMyNetworkUserDrpDown();
    GetBreadCrumbAndName();
    GetMode();
    // createchart.LoadPoeDetailContent();
    var html = "<li><a href='/managersync/managersync'><span><img src='../../Images/icons/sync-small.png' /></span><p>Manager Sync</p></a> </li>" +
        "<li><a href='/managersync/Bigpicture'><span><img src='../../Images/icons/big-pic-small.png' /></span><p>Big Picture</p></a> </li>" +
        "<li><a href='/managersync/PracticeAreas'><span><img src='../../Images/icons/digin-small.png' /></span><p>Practice Areas</p></a> </li>" +
        "<li><a href='/managersync/ExcellenceIndicators'><span><img src='../../Images/icons/dig-deeper-small.png' /></span><p>Excellence Actions</p></a> </li>";
    // "<li><a href='/Goal/SetGoals'><span><img src='../../Images/icons/goal-small.png' /></span><p>Set Goals</p></a> </li>" +
    //"<li><a href='/Goal/TrackGoals'><span><img src='../../Images/icons/track-goal-small.png' /></span><p>Track Goals</p></a> </li>";

    $('#target ul').html(html);
    digdeep.getMyNetworkUser(0);
    $('.prev,.nxt').hide();
    $('#p1,#bn1').show();
    $('#practiceAreaList li').live('click', function () {
        digdeep.HighlightTile(this);
        //Solved the reloading issue
        var ctrl = $(this);
        //var imagename = $(this).children().filter('img').attr('src').replace('../../Images/icons/', '').replace('.png', '');
        //var licount = $('#practiceAreaList li').length;
        //for (i = 1; i < licount; i++){
        //    $(this).siblings().filter('img').attr('src', '../../Images/icons/' + imagename + i + '.png')
        //}

        //$(this).children().filter('img').attr('src', '../../Images/icons/' + imagename + 'h.png');
        if (ctrl.attr('id') != '0') {
            // $("#status,#preloader").delay(100).fadeIn("slow", function () {
            $('.markeramper').css('margin-left', '');
            $('.markeramper').css('margin-top', '');
            $('.markergray').css('margin-left', '');
            $('.markergray').css('margin-top', '');
            //
            ctrl.addClass("selected");
            ctrl.siblings().removeClass("selected");
            var selectedMappingid = $('#selectedMappingid').val();
            var mappingid = $('#mappingid').val();
            if (mappingid != 0) {
                digdeep.getSyncScore(ctrl.val(), mappingid);
            } else {
                digdeep.getSyncScore(ctrl.val(), selectedMappingid);
            }
            GetManagerName(ctrl.val());
            $('.prev,.nxt').hide();
            $('#q1').show("slow");
            $('#p1,#bn1').show();
            $('#q3').hide();
            createchart.onLoad(2, 2);
            // });
            //$('#q1').animate({ 'margin-left': '0px' }, { duration: 1000 });
            //$('#pagetxt').html(' Page 1 of 2');
            //$("#status").fadeOut();
            //$("#preloader").delay(1000).fadeOut("slow");
        }
        //alert($('.chartslide').find('.slide').length);
        if ($('.chartslide').find('.slide').length == 1) {
            $('#bn1').hide();
            $('.nmodule').show();
        }
        //alert($('.syncrepmodule').last().attr('value'));
        if ($('.syncrepmodule').last().attr('value') == ctrl.attr('value')) {
            $('.nmodule').hide();
        }
        if (ctrl.attr('value') != 0) {
            $('.pmodule').show();
        }
        //alert(ctrl.attr('value'));
    });
    //$('#bn1').click(function () {
    //    $('.prev,.nxt').hide();
    //    $('#p2,#bn2').show();
    //    $('#q1').animate({ 'margin-left': '-100%' }, { duration: 1000 });
    //    $('#pagetxt').html(' Page 2 of 2');
    //});
    //$('#p2').click(function () {
    //    $('.prev,.nxt').hide();
    //    $('#q1').show("slow");
    //    $('#p1,#bn1').show();
    //    $('#q1').animate({ 'margin-left': '0px' }, { duration: 1000 });
    //    $('#pagetxt').html(' Page 1 of 2');
    //});
    $('#networkusers li').live('click', function () {
        var mappingid = $(this).val();
        //$("#status,#preloader").delay(100).fadeIn("slow", function () {
        //$('#membername').text($(this).text());
        $('#mappingid').val(mappingid);
        $(".addmember").attr('id', '0');
        $(".sendinv").slideUp("slow");
        $(".addmember").css('background', '');
        //digdeep.getSyncScore(0, mappingid);
        digdeep.getMyNetworkUser(mappingid);
        //GetManagerName(mappingid);
        $('.scroll1').slimScroll({ scrollTo: '0px' });
        $('#q2').css('opacity', '0.4');
        $('#q1').animate({ 'margin-left': '5%' });
        $('#q2').animate({ 'margin-left': '-2%' }, { duration: 1000 });

        $('#bn1').show();
        //$("#status").fadeOut();
        //$("#preloader").delay(100).fadeOut("slow");
        //});
    });
    if ($('#selectedTypedeep').val() == 1) {
        var rightArrowHtml = '<span><h1>Self Sync by Excellence Actions</h1><p class="hlpcont">' +
                              "Examine Self Sync at the Excellence Action level. Navigate through each Practice Area and analyze the Gaps between your Self Feedback score and the Feedback scores received from members of your Feedback Network. Use the drop down menu at the top of the screen to select different Feedbackers within your Network." +
                              '</p></span>';
        $('.hlprow').empty();
        $('.hlprow').html(rightArrowHtml);
    }
    else {
        var rightArrowHtml1 = '<span><h1>Team Sync by Excellence Actions</h1><p class="hlpcont">' +
                              "Examine Team Sync at the Excellence Action level. Select a Practice Area and analyze the Gaps in each Excellenc Indicator between the Feedback score you have given to each of your team members and the Self Feedback scores your team members have given themselves. Use the drop down menu at the top of the screen to select different team members. " +
                              '</p></span>';
        $('.hlprow').empty();
        $('.hlprow').html(rightArrowHtml1);
    }

    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
    createchart.onLoad(2, 2);
    $('#sticky > ul > li > a').click(function () {
        $('#sticky > ul > li > a').each(function (index, item) {
            $(item).removeClass('select' + $(item).attr('id'));
        });
        $(this).addClass('select' + $(this).attr('id'));
    });
    $(document).click(function () {
        $('#sticky > ul > li > a').each(function (index, item) {
            $(item).removeClass('select' + $(item).attr('id'));
        });
    });
    $('#practiceAreaList li').hover(
     function () {
         removeAttrHover();
         $(this).find('img').attr("src", "../../Images/icons/" + $('#selectedpoe').val() + (parseInt($(this).attr("value")) + 1) + "h" + ".png");
         $(this).addClass('moduleHove');
     }, function () {
         // alert('123')
         removeAttrHover();
         $('#practiceAreaList>li.selected').find('img').attr("src", "../../Images/icons/" + $('#selectedpoe').val() + (parseInt($('#practiceAreaList>li.selected').attr("value")) + 1) + "h" + ".png");
         $('#practiceAreaList>li.selected').addClass('moduleHove');
     });
});
function GetManagerName(mappingid) {
    Common.ajaxsync({
        url: '/Sync/GetDigDeepUserInfo',
        data: { 'mappingids': mappingid },
        success: function (response) {
            if (response != null) {
                var managerName = response.User.FirstName + ' ' + response.User.LastName;
                $('.legend2').text(managerName);
                $('#membername').text(managerName);
                $("#status").fadeOut();
            } else {
                $('.legend2').text("");
                $('#membername').text("");
            }
            //$("#preloader").delay(100).fadeOut("slow");
        },
        error: function (err) {
        }
    });
}
function GetBreadCrumbAndName() {
    Common.ajaxsync({
        url: '/Sync/GetClicked',
        success: function (response) {
            $('#selectedTypedeep').val(response);
            var bvalue = '';
            switch (response) {
                case 1:
                    bvalue = 'Self';
                    $('.legend1').text("Self");

                    break;
                case 2:
                    bvalue = 'Team';
                    $('.legend1').text("Your Feedback");
                    $('#PaText').html('Examine Team Sync at the Excellence Action level. Select a Practice Area and analyze the Gaps in each Excellence Action between the Feedback score you have given to each of your team members and the Self Feedback scores your team members have given themselves. Use the drop down menu at the top of the screen to select different team members. ')
                    break;
            }
            var breadCrumb = '<a href="../Common/Index">Home</a> > <a href="../managersync/managersync">Manager Sync</a>  > ' + bvalue + ' > Excellence Actions';
            $('#PAname').html(bvalue + ' Sync by Excellence Actions');

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
            $('#moreDigDeep').val(response);
        },
        error: function (err) {
        }
    });
}
function removeAttrHover() {
    var count = 1;
    $('#practiceAreaList li').each(function () {
        if (!$(this).hasClass('selected')) {
            $(this).find('img').attr("src", "../../Images/icons/" + $('#selectedpoe').val() + count + ".png");
            $(this).removeClass("moduleHove");
        }
        count++;
    });
}