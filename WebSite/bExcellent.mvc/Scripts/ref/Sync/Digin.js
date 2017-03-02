var digin = {
    getMyNetworkUser: function () {
        Common.ajaxsync({
            url: '/sync/GetNetworkUsers',
            success: function (response) {
                var html = '';
                for (var i = 0; i < response.length; i++) {
                    var score = parseFloat(response[i].WcsiScoreDiff);
                    var scorestr = score > 0 ? "+" + score : score;
                    html = html + "  <li  id='usrDiginli" + i + "' value=" + response[i].UserPOEMappingId + ">" +
                        "<div class='number' id='synavgDigin" + response[i].UserPOEMappingId + "'>" +
                         (scorestr == "0" ? "" : scorestr) + "</div>" +
                         "<img  class='syncu' src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                        "<p>" +
                        response[i].User.FirstName + " " + response[i].User.LastName +
                        "</p> " +
                        "</li>";
                }
                for (var pa = response.length; pa < 8; pa++) {
                    html = html + "  <li  id='0' class='nonselecteds-tiles'><div class='number' i'></div><p></p> </li>";
                }
                $('#UserlistDigin').html(html);
                if (response.length <= 7) {
                    $('#UserlistDigin').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                } else {
                    $('#UserlistDigin').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                }
                var t = $('#UserlistDigin li').first();
                t.addClass('selected');
                digin.getSyncScore(t.val());
            },
            error: function () {
            }
        });
    },
    getSyncScore: function (userMappingId) {
        var pagemode = $('#moreDigIn').val();
        var url = String.empty;
        if (pagemode == "1") {
            url = '/sync/GetSyncScoreByFbId?userMappingId=' + userMappingId;
        } else {
            url = '/sync/GetSyncScore?userMappingId=' + userMappingId;
        }
        Common.ajaxsync({
            url: url,//'/sync/GetSyncScore?userMappingId=' + userMappingId,
            success: function (response) {
                //debugger;
                /*-----------------------------------------------------------------------------------------------*/
                /*Top all*/
                //for (var i = 0; i < response.TScore.ModuleScores.length; i++) {
                //    $('.pa' + (i + 1) + ' h1').text(response.TScore.ModuleScores[i].ModuleName);
                //}
                var prevNavHtml = "";
                var nxtNavHtml = "";
                var htmlContent = "";
                var moduleScore = response.TScore.ModuleScores.length;
                var noofOccurences = Math.ceil(moduleScore / 4);
                var totalNoofPages = (noofOccurences > 1 ? "<div class='pagination' id='pagetxt'>Page 1 of " + noofOccurences + "</div>" : "");
                var i = 0;
                var m = 0;
                var balanceModuleScore = (4 * noofOccurences) - moduleScore;
                var newModuleScore = moduleScore + balanceModuleScore;
                var moduleIdz = newModuleScore - balanceModuleScore;
                var legendText = "Self";
                //for (var k = 0; k < noofOccurences; k++) {
                //    htmlContent = htmlContent;
                if ($('#hidselectedval').val() == 2) {
                    legendText = "Your Feedback";
                }
                var count = 0;
                for (; i < newModuleScore ; i++) {
                    
                        if (i == 0) {
                            m++;
                            htmlContent = htmlContent + "<div id='q" + m + "'' class='slide'>";
                            prevNavHtml = prevNavHtml + "<a href='#' class='prev' id='p" + m + "' onclick='createchart.PreviewPA(" + m + "," + noofOccurences + ")'>Previous</a>";
                            nxtNavHtml = nxtNavHtml + "<a href='#' class='nxt' id='bn" + m + "' onclick='createchart.NextPA(" + m + "," + noofOccurences + ")'>Next</a>";
                        }
                        else if ((i % 4) == 0) {
                            m++;
                            htmlContent = htmlContent + "<div class='charttitle'>Sync</div></div><div id='q" + m + "'' class='slide' >";
                            prevNavHtml = prevNavHtml + "<a href='#' class='prev' id='p" + m + "' onclick='createchart.PreviewPA(" + m + "," + noofOccurences + ")'>Previous</a>";
                            nxtNavHtml = nxtNavHtml + "<a href='#' class='nxt' id='bn" + m + "' onclick='createchart.NextPA(" + m + "," + noofOccurences + ")'>Next</a>";
                        }
                   // debugger;
                        if (i != 0 && ((i + 1) % 2) == 0) {
                            //for (var h = 0;h < response.TScore.ModuleScores.length;h++)
                            //{
                            if (moduleScore > i) {
                           
                                //removed selectFBtwocol near to chart div
                                htmlContent = htmlContent + "<div class='chartsmlplaceholder pa" + (i + 1) + "'><h1>" + response.TScore.ModuleScores[i].ModuleName + "</h1><div id='li" + count + "' class='chartdiv " + (i == 0 ? "" : "") + "' onclick='LoadPracticeArea(this," + (count + 1) + ")' data-value=" + response.TScore.ModuleScores[i].Moduleid + ">" +
                                    "<div class='legend'><p>Legend</p><ul><li class='legend1'>" + legendText + "</li><li class='legend2'>Manager</li> <li class='legendmp'>Excellence</li></ul></div><div class='chart'><div class='chartop'>" +
                                    "</div><div class='chartbg'><div class='chartarea'><ul><li class='progressbar1' style='width: 0%' id='Pa" + (i + 1) + "Pro1'><p></p></li>" +
                                    "<li class='progressbar2' style='width: 0%' id='Pa" + (i + 1) + "Pro2'><p></p></li></ul></div></div><div class='chartbtm'><div class='markerholder'>" +
                                    "<ul><li class='markergray' style='width: 0%' id='Pa" + (i + 1) + "Mar2'><p></p></li><li class='markeramper' style='width: 0%' id='Pa" + (i + 1) + "Mar1'><p></p>" +
                                    "</li><li class='markermp' style='width: 100%' id='Pa" + (i + 1) + "Mar3'><p></p></li></ul></div></div><ul class='scale paAr1' id='Toppa1Level'><li class='scale1' id='Toppa1Level1'>25%</li><li class='scale2' id='Toppa1Level2'>50%</li>" +
                                    "<li class='scale3' id='Toppa1Level3'>75%</li><li class='scale4' id='Toppa1Level4'>100%</li></ul></div><div class='pointer'></div><div class='status' id='Pa" + (i + 1) + "'>" +
                                    "</div><div class='charttile'>Level of Excellence</div></div></div></div>";
                                count++;
                            } else {
                                htmlContent = htmlContent + "<div class='chartsmlplaceholder pa" + (i + 1) + "'><h1>&nbsp;</h1><div class='chartdiv dummychartdiv'></div></div></div>";
                            }
                    
                    } else {
                        //if (i != response.Questions.length)
                        if (moduleScore > i) {
                            htmlContent = htmlContent + "<div class='coltwo'><div class='chartsmlplaceholder pa" + (i + 1) + "'><h1>" + response.TScore.ModuleScores[i].ModuleName + "</h1><div id='li" + count + "' class='chartdiv " + (i == 0 ? "" : "") + "' onclick='LoadPracticeArea(this," + (count + 1) + ")' data-value=" + response.TScore.ModuleScores[i].Moduleid + ">" +
                                "<div class='legend'><p>Legend</p><ul><li class='legend1'>" + legendText + "</li><li class='legend2'>Manager</li> <li class='legendmp'>Excellence</li></ul></div><div class='chart'><div class='chartop'>" +
                                "</div><div class='chartbg'><div class='chartarea'><ul><li class='progressbar1' style='width: 0%' id='Pa" + (i + 1) + "Pro1'><p></p></li>" +
                                "<li class='progressbar2' style='width: 0%' id='Pa" + (i + 1) + "Pro2'><p></p></li></ul></div></div><div class='chartbtm'><div class='markerholder'>" +
                                "<ul><li class='markergray' style='width: 0%' id='Pa" + (i + 1) + "Mar2'><p></p></li><li class='markeramper' style='width: 0%' id='Pa" + (i + 1) + "Mar1'><p></p>" +
                                "</li><li class='markermp' style='width: 100%' id='Pa" + (i + 1) + "Mar3'><p></p></li></ul></div></div><ul class='scale paAr1' id='Toppa1Level'><li class='scale1' id='Toppa1Level1'>25%</li><li class='scale2' id='Toppa1Level2'>50%</li>" +
                                "<li class='scale3' id='Toppa1Level3'>75%</li><li class='scale4' id='Toppa1Level4'>100%</li></ul></div><div class='pointer'></div><div class='status' id='Pa" + (i + 1) + "'>" +
                                "</div><div class='charttile'>Level of Excellence</div></div></div>";
                            count++;
                        }
                        else {
                            htmlContent = htmlContent + "<div class='coltwo'><div class='chartsmlplaceholder pa" + (i + 1) + "'><h1>&nbsp;</h1><div class='chartdiv dummychartdiv'></div></div>";
                        }
                   // }
                }
                }
                //}
                $('.chartslide').empty().html(htmlContent + "<div class='charttitle'>Sync</div></div>");
                if (moduleScore <= 4) {
                    $('.slidebtn').hide();
                } else {
                    $('.slidebtn').show();
                    $('.slidebtn').empty().html((prevNavHtml + totalNoofPages + nxtNavHtml));
                }
                for (var j = 0; j < response.TScore.ModuleScores.length; j++) {
                    var type = $('#hidselectedval').val();
                    var scalevalue = ((parseInt(response.RScore.ModuleScores[j].WeightageScore)) / 4);

                    if (type == 1) {
                        var practiceArea1 = {
                            "values": [{
                                "name": "You",
                                "score": (response.TScore.ModuleScores == null || response.TScore.ModuleScores[j] == undefined) ? 0 : response.TScore.ModuleScores[j].TotalModulescore,
                                "MarkerScore": (response.TScore.ModuleScores == null || response.TScore.ModuleScores[j] == undefined) ? 0 : response.TScore.ModuleScores[j].Modulescore
                            },
                            {
                                "name": "Top",
                                "score": (response.RScore.ModuleScores == null || response.RScore.ModuleScores[j] == undefined) ? 0 : response.RScore.ModuleScores[j].TotalModulescore,
                                "MarkerScore": (response.RScore.ModuleScores == null || response.RScore.ModuleScores[j] == undefined) ? 0 : response.RScore.ModuleScores[j].Modulescore
                            },
                            {
                                "name": "Maximum",
                                "score": (response.RScore.ModuleScores == null || response.RScore.ModuleScores[j] == undefined) ? 0 : 100,
                                "MarkerScore": (response.RScore.ModuleScores == null || response.RScore.ModuleScores[j] == undefined) ? 0 : parseFloat(response.RScore.ModuleScores[j].WeightageScore).toFixed()
                            }
                            ]
                        };
                        createchart.loadchartdata(practiceArea1, "Pa" + (j + 1), scalevalue);
                    } else {
                        var practiceArea1 = {
                            "values": [{
                                "name": "You",
                                "score": (response.RScore.ModuleScores == null || response.RScore.ModuleScores[j] == undefined) ? 0 : response.RScore.ModuleScores[j].TotalModulescore,
                                "MarkerScore": (response.RScore.ModuleScores == null || response.RScore.ModuleScores[j] == undefined) ? 0 : response.RScore.ModuleScores[j].Modulescore
                            },
                            {
                                "name": "Top",
                                "score": (response.TScore.ModuleScores == null || response.TScore.ModuleScores[j] == undefined) ? 0 : response.TScore.ModuleScores[j].TotalModulescore,
                                "MarkerScore": (response.TScore.ModuleScores == null || response.TScore.ModuleScores[j] == undefined) ? 0 : response.TScore.ModuleScores[j].Modulescore
                            },
                            {
                                "name": "Maximum",
                                "score": (response.TScore.ModuleScores == null || response.TScore.ModuleScores[j] == undefined) ? 0 : 100,
                                "MarkerScore": (response.TScore.ModuleScores == null || response.TScore.ModuleScores[j] == undefined) ? 0 : parseFloat(response.TScore.ModuleScores[j].WeightageScore).toFixed()
                            }
                            ]
                        };
                        createchart.loadchartdata(practiceArea1, "Pa" + (j + 1), scalevalue);
                    }

                    $("#Pa" + (j + 1) + 'level1').text(response.PoeScores.Modules[j].WeightageScores.Rarely);
                    $("#Pa" + (j + 1) + 'level2').text(response.PoeScores.Modules[j].WeightageScores.Inconsistenly);
                    $("#Pa" + (j + 1) + 'level3').text(response.PoeScores.Modules[j].WeightageScores.Frequently);
                    $("#Pa" + (j + 1) + 'level4').text(response.PoeScores.Modules[j].WeightageScores.Always);
                }
            },
            error: function (err) {
            }
        });
        var d = $('.selected P').html();
        $('.legend2').html(d);
        $('#p1,#bn1').show();
        
    }
};

var createchart = {
    loadchartdata: function (chart, element, scalevalue) {
       
        var x = chart.values.length;
        var marginBuffer = 11;
        for (var j = 0; j < x; j++) {
            var mode = $('#hidselectedval').val();
            if (x == 3) {
                var calc = 0;
                if (mode == 1) {
                    calc = chart.values[1].MarkerScore - chart.values[0].MarkerScore;
                } else {
                    calc = chart.values[0].MarkerScore - chart.values[1].MarkerScore;
                }
                //   var sclass = (calc < 0) ? "" : "";
                var calcValue = (calc < 0) ? (calc * (-1)) : calc;
                var arrowvalue = "";
                if (!calcValue == 0.0) {
                    arrowvalue = calcValue;
                } else {
                    arrowvalue = 0;
                }
                $('#' + element + '').text(arrowvalue);
                //if ($('#' + element + '').hasClass('dwnstatus')) {
                //    var sclass = "";
                //    if (calcValue == 0) {
                //        sclass = "digstatusEqual";
                //    } else {
                //        sclass = (calc < 0) ? "dwnstatus" : "status";
                //    }

                //    $('#' + element + '').removeClass('dwnstatus');
                //    $('#' + element + '').addClass(sclass);
                //}
                //if ($('#' + element + '').hasClass('status')) {
                //    var sclass = "";
                //    if (calcValue == 0) {
                //        sclass = "digstatusEqual";
                //    } else {
                //        sclass = (calc < 0) ? "dwnstatus" : "status";
                //    }
                //    $('#' + element + '').removeClass('status');
                //    $('#' + element + '').addClass(sclass);
                //}
                //if ($('#' + element + '').hasClass('digstatusEqual')) {
                //    var sclass = "";
                //    if (calcValue == 0) {
                //        sclass = "digstatusEqual";
                //    } else {
                //        sclass = (calc < 0) ? "dwnstatus" : "status";
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

            $("#" + element + 'Mar' + (j + 1) + " P").text((chart.values[j].MarkerScore == 0) ? "" : chart.values[j].MarkerScore);
            $("#" + element + 'Pro' + (j + 1)).css("width", (chart.values[j].score == 0) ? 8 : chart.values[j].score  + "%");
            $("#" + element + 'Mar' + (j + 1)).css("width", chart.values[j].score + "%");
        }
        var values = new Array();
        // move all elements to array first
        for (var i = 0; i < chart.values.length; i++) {
            values.push(chart.values[i].score);
        }

        // set the unique values first
        for (i = 0; i < values.length; i++) {
            if (values[i] != 0) {
                marginBuffer = 6;
                for (var k = i + 1; k < values.length; k++) {
                    if (values[i] == values[k]) {
                        $("#" + element + 'Mar' + (k).toString()).css({
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
    },
    LoadPoeDetailContent: function () {
        Common.ajaxsync({
            url: '/Standing/GetPoeContent',
            success: function (response) {
              
                //var totrarely = 0;
                //var totInconsistenly = 0;
                //var totFrequently = 0;
                //var totAlways = 0;
                var total = 0;
                //var html = " <tr> <td colspan='3' class='desctablepoe'><h1>" + response.Modules[0].PoeName + "</h1></td> </tr> <tr> <th>Practice Area</th> <th>Priority</th> <th>Points</th> </tr><tr><td colspan='3'><div class='scroll2'><table id='diginsyncPoeContentScroll'><tr><td>";
                var html = "<div id='accordion'> <h3>Standing by Practice Areas</h3> <div class='spa_info'> <p> Each Practice Area is weighted based on its priority level for achieving excellence as defined in the Role Excellence Profile. Priority determines the number of points out of 100 that are designated to each Practice Area. Practice Areas with a higher priority level represent a larger proportion of the maximum possible points for this REP. </p>  </div>"
                html = html + "<h3 id='PAname'>" + response.Modules[0].PoeName + "</h3> <table id='papoeContents'> <tr> <th>Practice Area</th><th></th> <th>Points</th> </tr><tr><td colspan='3'><table id='diginsyncPoeContentScroll'> <tbody><tr><td>";

                
                //for (var i = 0; i < response.Modules.length; i++) {
                //    totrarely = totrarely + response.Modules[i].WeightageScores.Rarely;
                //    totInconsistenly = totInconsistenly + response.Modules[i].WeightageScores.Inconsistenly;
                //    totFrequently = totFrequently + response.Modules[i].WeightageScores.Frequently;
                //    totAlways = totAlways + response.Modules[i].WeightageScores.Always;
                //    html = html + "<tr> <td>" + response.Modules[i].Modulename + "</td> <td>" + response.Modules[i].WeightageScores.Rarely + "</td> <td>" + response.Modules[i].WeightageScores.Inconsistenly + "</td><td>" + response.Modules[i].WeightageScores.Frequently + "</td><td>" + response.Modules[i].WeightageScores.Always + "</td> </tr>";
                //}
                for (var i = 0; i < response.Modules.length; i++) {
                    total = total + response.Modules[i].ModuleAverage;
                    html = html + "<tr> <td>" + response.Modules[i].Modulename + "</td><td></td> <td>" + response.Modules[i].ModuleAverage + "</td> </tr>";
                }

                //html = html + " <tr> <th> Total </th> <th>25</th> <th>50</th> <th>75 </th> <th>100</th> </tr>";
                html = html + "</tbody></table></td></tr><tr> <th>Total</th> <th></th> <th>100</th> </tr></table>";
                //html = html + "<h3>Self Feedback Standing</h3><div>    <div class='helpcontent'>  <div class='descinfo'> <div class='hlprow'>  <div class='hlpheading'>Community</div>  <div class='hlpcont'>Your Self Feedback score compared with the average Self Feedback score of your role community</div> </div>  <div class='hlprow'>  <div class='hlpheading'>Area Team</div>  <div class='hlpcont'>Your Self Feedback score compared with the average Self Feedback score of your team</div> </div>  <div class='hlprow'>  <div class='hlpheading'>Mentors</div>  <div class='hlpcont'>Your Self Feedback score compared with the average Self Feedback score of others in your role community who stand within 20% of the goal</div> </div>  <div class='hlprow'>  <div class='hlpheading'>Tenure</div>  <div class='hlpcont'>Your Self Feedback score compared with the average Self Feedback score of various tenure groups in your role community</div> </div>  <div class='hlprow'>  <div class='hlpheading'>Previous</div>  <div class='hlpcont'>Your Self Feedback score compared with your previous Self Feedback score</div> </div>  <div class='hlprow'>  <div class='hlpheading'>All</div>  <div class='hlpcont'>A comprehensive view of your Self Feedback score compared with Community, Team, Mentors and Previous</div> </div>  </div></div></div>";
                $('#diginsyncPoeContent').html(html);
                $("#accordion").accordion();
                $('.scroll2').slimScroll();
                if (response.Modules.length <= 5) {
                    $('#diginsyncPoeContentScroll').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                } else {
                    $('#diginsyncPoeContentScroll').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                }
            }
            
        });
    },
    onLoad: function (current, pages) {
        //debugger;
        if (current != 1) {
            var previousPage = (current - 1);
            $('.prev,.nxt').hide();
            $('#p' + previousPage + ',#bn' + previousPage).show();
            $("#q" + previousPage).show("slow");
            $('#q' + previousPage).animate({ 'margin-left': '4%' }, { duration: 0 });
            $('#q' + previousPage).css('opacity', '2');
            //$('#q' + pages).animate({ 'margin-left': '-3%' }, { duration: 1000 });

            $("#q" + pages).animate({ 'margin-left': '-5%' }, { duration: 0 });
            $("#q" + pages).show().css('opacity', '0.4');
            $('#pagetxt').html(' Page ' + previousPage + ' of ' + pages);
            //setTimeout(function () {
                //$("#q" + current).show();
            //}, 1000);
            if (current == 2) {
                $("#p1").hide();
            }
        }
    },

    PreviewPA: function (current, pages) {
        //debugger;
        if (current != 1) {
            var previousPage = (current - 1);
            $('.prev,.nxt').hide();
            $('#p' + previousPage + ',#bn' + previousPage).show();
            $("#q" + previousPage).show("slow");
            $('#q' + previousPage).animate({ 'margin-left': '4%' }, { duration: 1000 });
            $('#q' + previousPage).css('opacity', '2');
            $('#q' + current).animate({ 'margin-left': '-5%' }, { duration: 1000 });
            $('#q' + current).css('opacity', '0.4');
            $('#pagetxt').html(' Page ' + (current - 1) + ' of ' + pages);
            //setTimeout(function () {
                //$("#q" + current).hide();
            //}, 1000);
            if (current == 2) {
                $("#p1").hide();
            }
        }
    },
    NextPA: function (current, page) {
        //debugger;
        if (current < page) {
            var nextPage = (current + 1);
            $('.prev,.nxt').hide();
            $('#p' + nextPage + ',#bn' + nextPage).show();
            $("#q" + nextPage).show();
            $("#q" + current).animate({ 'margin-left': '-38%' }, { duration: 1000 });
            $("#q" + current).css('opacity','0.4');
            $("#q" + page).animate({ 'margin-left': '-5%' }, { duration: 1000 });
            $("#q" + page).css('opacity','2');
            $('#pagetxt').html(' Page ' + nextPage + ' of ' + page);
        }
        if (page == nextPage)
            $('#bn' + nextPage).hide();
    }
};

$(document).ready(function () {
    $("#status").fadeIn();
    $('#p1,#bn1').show();
    $('.clickdeeper').show();
    Common.setTopMenu(4);
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/start-sync_h.png');
    //$('.sendReq').click(function () {
    //    var txtareavalText = $('textarea').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
    //    var selectedids = "";
    //    $('.usersconnect').each(function () {
    //        if ($(this).find('span').hasClass('slidecontentselect')) {
    //            selectedids = selectedids + $(this).attr('data-value') + ",";
    //        }
    //    });
    //    selectedids = selectedids.slice(0, -1);
    //    if (selectedids != "") {
    //        ConnectMessages(selectedids);
    //    } else {
    //        $(".popupbg,.popup").show();
    //        //alert("Please Select the users");
    //    }
    //});

    //New Click Implementation

   

    $('.sendReqMentors').click(function () {
        var txtareavalTextMentors = $('#textAreaMentors').sceditor('instance').getBody().innerText.replace(/^\s+/, "");
        var selectedids = "";
        $('.usersConnectMentors').each(function () {
            if ($(this).find('span').hasClass('slidecontentselect')) {
                selectedids = selectedids + $(this).attr('data-value') + ",";
            }
        });
        selectedids = selectedids.slice(0, -1);
        if (selectedids != "") {
            ConnectMessagesMentors(selectedids);
        } else {
            $(".popupbg,.popup").show();
            //alert("Please Select the users");
        }
    });

    $('.sendReqPeers').click(function () {
        var txtareavalTextPeers = $('#textAreaPeers').sceditor('instance').getBody().innerText.replace(/^\s+/, "");
        var selectedids = "";
        $('.usersConnectPeers').each(function () {
            if ($(this).find('span').hasClass('slidecontentselect')) {
                selectedids = selectedids + $(this).attr('data-value') + ",";
            }
        });
        selectedids = selectedids.slice(0, -1);
        if (selectedids != "") {
            ConnectMessagesPeers(selectedids);
        } else {
            $(".popupbg,.popup").show();
            //alert("Please Select the users");
        }
    });

    $("#preloader").delay(100).fadeIn("slow");

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
        setTimeout(function () {
            if ($('#example-2 li ul.sticklr-active').html() == undefined) {
        $('.standPAIcon').removeClass('selectstandPAIcon');
        $('.repIcon').removeClass('selectrepIcon');
        $('.mentorIcon').removeClass('selectmentorIcon');
        $('.setGoalIcon').removeClass('selectsetGoalIcon');
        $('.readinessResoucesIcon').removeClass('selectreadinessResoucesIcon');
        $('.connectPeersIcon').removeClass('selectconnectPeersIcon');
            }
        }, 300);
        if ($(event.target).parents().index($('.indexright')) == -1) {
            if ($('.indexright').is(":visible")) {
                $(".indexright").animate({ right: "-33.5%" }, 500);
                $(".indexclose").show();
                $(".modelcontent").animate({ left: "0" }, 500);
            }
        }
        if (!$(event.target).parent().hasClass('legend')) {
            if ($('.legend').is(":visible") || $('.drplegends').is(":visible")) {
                $(".legend ul").slideUp();
                $(".legend ul").slideUp();
                $('.legend p').removeClass("legendwn");
                $('.legend p').removeClass("legendwn");
            }
        } else {
            var visible = $(event.target).parent().find('ul:visible').length;
            if (visible == 0) {
                $(".legend ul").slideUp();
                $('.legend p').removeClass("legendwn");
                $(event.target).parent().find('ul').slideDown();
                $(event.target).parent().find('p').addClass("legendwn");
            } else {
                $(".legend ul").slideUp();
            }

            //
        }
    });

    //$('.indexrightclose').live('click', function () {
    //    $(this).hide();
    //    $(".indexrightarrow .indexclose").show();
    //    $(".indexright").animate({ right: "-33.5%" }, 500);
    //});
    //$('.indexclose').live('click', function () {
    //    $(this).hide();
    //    $(".indexrightclose").show();
    //    $(".indexright").animate({ right: "0" }, 500);
    //});
    //$(document).click(function (event) {
    //    if ($(event.target).parents().index($('.indexright')) == -1) {
    //        if ($('.indexright').is(":visible")) {
    //            $(".indexright").animate({ right: "-33.5%" }, 500);
    //            $(".indexclose").show();
    //        }
    //    }
    //});
    $('.scroll1').slimScroll();
    $('.scroll2').slimScroll();
    $('.scroll3').slimScroll();


    var html = "<li><a href='/managersync/managersync'><span><img src='../../Images/icons/sync-small.png' /></span><p>Manager Sync</p></a> </li>" +
        "<li><a href='/managersync/Bigpicture'><span><img src='../../Images/icons/big-pic-small.png' /></span><p>Big Picture</p></a> </li>" +
        "<li><a href='/managersync/PracticeAreas'><span><img src='../../Images/icons/digin-small.png' /></span><p>Practice Areas</p></a> </li>" +
        "<li><a href='/managersync/ExcellenceIndicators'><span><img src='../../Images/icons/dig-deeper-small.png' /></span><p>Excellence Actions</p></a> </li>";
        // "<li><a href='/Goal/SetGoals'><span><img src='../../Images/icons/goal-small.png' /></span><p>Set Goals</p></a> </li>" +
        //"<li><a href='/Goal/TrackGoals'><span><img src='../../Images/icons/track-goal-small.png' /></span><p>Track Goals</p></a> </li>";

    $('#target ul').html(html);
    GetBreadCrumbAndName();
    GetMode();
    createchart.LoadPoeDetailContent();
    digin.getMyNetworkUser();

    $('.standPAIcon').click(function () {
        $(this).addClass('selectstandPAIcon');
        $('.repIcon').removeClass('selectrepIcon');
        $('.mentorIcon').removeClass('selectmentorIcon');
        $('.setGoalIcon').removeClass('selectsetGoalIcon');
        $('.readinessResoucesIcon').removeClass('selectreadinessResoucesIcon');
        $('.connectPeersIcon').removeClass('selectconnectPeersIcon');
    });

    $('.repIcon').click(function () {
        $(this).addClass('selectrepIcon');
        $('.mentorIcon').removeClass('selectmentorIcon');
        $('.setGoalIcon').removeClass('selectsetGoalIcon');
        $('.readinessResoucesIcon').removeClass('selectreadinessResoucesIcon');
        $('.connectPeersIcon').removeClass('selectconnectPeersIcon');
        $('.standPAIcon').removeClass('selectstandPAIcon');
    });

    $('.mentorIcon').click(function () {
        $(this).addClass('selectmentorIcon');
        $('.setGoalIcon').removeClass('selectsetGoalIcon');
        $('.readinessResoucesIcon').removeClass('selectreadinessResoucesIcon');
        $('.connectPeersIcon').removeClass('selectconnectPeersIcon');
        $('.standPAIcon').removeClass('selectstandPAIcon');
        $('.repIcon').removeClass('selectrepIcon');
    });

    $('.setGoalIcon').click(function () {
        $(this).addClass('selectsetGoalIcon');
        $('.readinessResoucesIcon').removeClass('selectreadinessResoucesIcon');
        $('.connectPeersIcon').removeClass('selectconnectPeersIcon');
        $('.standPAIcon').removeClass('selectstandPAIcon');
        $('.repIcon').removeClass('selectrepIcon');
        $('.mentorIcon').removeClass('selectmentorIcon');
    });

    $('.readinessResoucesIcon ').click(function () {
        $(this).addClass('selectreadinessResoucesIcon');
        $('.connectPeersIcon').removeClass('selectconnectPeersIcon');
        $('.standPAIcon').removeClass('selectstandPAIcon');
        $('.repIcon').removeClass('selectrepIcon');
        $('.mentorIcon').removeClass('selectmentorIcon');
        $('.setGoalIcon').removeClass('selectsetGoalIcon');
    });

    $('.connectPeersIcon').click(function () {
        $(this).addClass('selectconnectPeersIcon');
        $('.standPAIcon').removeClass('selectstandPAIcon');
        $('.repIcon').removeClass('selectrepIcon');
        $('.mentorIcon').removeClass('selectmentorIcon');
        $('.setGoalIcon').removeClass('selectsetGoalIcon');
        $('.readinessResoucesIcon').removeClass('selectreadinessResoucesIcon');
    });

    $('#UserlistDigin li').live('click', function () {
        //Solved the reloading

        var ctrl = $(this);
        if (ctrl.attr('id') != '0') {
         //   $("#status,#preloader").delay(100).fadeIn("slow", function () {
                $('.markeramper').css('margin-left', '');
                $('.markeramper').css('margin-top', '');
                $('.markergray').css('margin-left', '');
                $('.markergray').css('margin-top', '');
                $('.progressbartrans1').addClass("progressbar1").removeClass("progressbartrans1");
                $('.progressbartrans2').addClass("progressbar2").removeClass("progressbartrans2");
                //

                ctrl.addClass("selected");
                ctrl.siblings().removeClass("selected");
                digin.getSyncScore(ctrl.val());
                createchart.onLoad(2, 2);
            //});
           // $("#status").fadeOut();
           // $("#preloader").delay(100).fadeOut("slow");
        }
        LoadPracticeArea('.pa1', 1);
    });
    if ($('#hidselectedval').val() == 1) {
        var rightArrowHtml = '<h1>Self Sync by Practice Areas</h1><p class="hlpcont">' +
                             'Examine Self Sync at the Practice Area level. Select a Feedbacker and analyze the Gaps in each Practice Area between your Self ' +
            'Feedback score and the Feedback score that Feedbacker has given to you.</p>';
        $('.hlprow>span').empty();
        $('.hlprow>span').html(rightArrowHtml);
        $('.model').addClass('managerModel');
        $('.model').removeClass('teamModel');
    }
    else {
        var rightArrowHtml1 = '<h1>Team Sync by Practice Areas</h1><p class="hlpcont">' +
                              'Examine Team Sync at the Practice Area level. Select a team member and analyze the Gaps in each Practice Area between the ' +
            'Feedback score you have given him or her and the Self Feedback score that team member has given himself or herself.</p>';
        $('.hlprow>span').empty();
        $('.hlprow>span').html(rightArrowHtml1);
        $('.model').removeClass('managerModel');
        $('.model').addClass('teamModel');
    }
    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
    createchart.onLoad(2, 2);
});
function GetBreadCrumbAndName() {
    Common.ajaxsync({
        url: '/Sync/GetClicked',
        success: function (response) {
            var bvalue = '';
            var headervalue = '';
            $('#hidselectedval').val(response);
            switch (response) {
                case 1:
                    bvalue = 'Self';
                    headervalue = "Managers";
                    $('.legend1').text("Self");
                    break;
                case 2:
                    bvalue = 'Team';
                    headervalue = "Team Members";
                    $('.legend1').text("Your Feedback");
                    break;
                default:
                    break;
            }
            var breadCrumb = '<a href="../Common/Index">Home</a> > <a href="../managersync/managersync">Manager Sync</a> > ' + bvalue + ' > Practice Areas';
            $('.breadcrumb').html(breadCrumb);
            $('.lft_head').html(headervalue);
        },
        error: function (err) {
        }
    });
}
function GetMode() {
    Common.ajaxsync({
        url: '/Sync/GetMode',
        success: function (response) {
            $('#moreDigIn').val(response);
        },
        error: function (err) {
        }
    });
}
function ConnectMessages(selectedIds) {
    var poename = $('.selectFBtwocol').prev().find('h1').text();
    var txtareavalText = $('textarea').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
    var subject = "Comments for the REP-" + poename;
    var moduleid = $('#moduleid').val();
    Common.ajax({
        url: '../../Feedback/ConnectPostStanding',
        data: { 'useridslist': selectedIds, 'subject': subject, 'comments': txtareavalText, 'moduleid': moduleid },
        success: function (response) {
            //alert("Message sent successfully");
            $('#masterMsgCont').text("Message sent successfully");
            $('#overallCont').show();
            $('textarea').sceditor('instance').val('');
            $('#ReqFeedback li a span,#seekSherpas li a span').removeClass('slidecontentselect');
        },
        error: function (err) {
        }
    });
}