var digin = {
    loaddigin: function () {
        Common.ajaxsync({
            url: '/Standing/GetStandingScore',
            success: function (response) {
                LoadHtml(response.PracticeAreaContent);
                //debugger;
                for (var i = 0; i < response.PracticeAreaContent.length; i++) {
                    $('.pa' + (i + 1) + ' h1').text(response.PracticeAreaContent[i].ModuleName);
                }
                for (var j = 0; j < response.PracticeAreaContent.length; j++) {
                    var topallChart = {
                        "values": [{
                            "name": "You",
                            "score": (response.You.ModuleScores == null || response.You.ModuleScores[j] == undefined) ? 0 : response.You.ModuleScores[j].ModuleScorePercentage,
                            "DisplayScore": (response.You.ModuleScores == null || response.You.ModuleScores[j] == undefined) ? 0 : response.You.ModuleScores[j].Modulescore,
                        },
                            {
                                "name": "Top",
                                "score": (response.You.ModuleScores == null || response.Community.ModuleScores[j] == undefined) ? 0 : response.Community.ModuleScores[j].ModuleScorePercentage,
                                "DisplayScore": (response.Community.ModuleScores == null || response.Community.ModuleScores[j] == undefined) ? 0 : response.Community.ModuleScores[j].Modulescore
                            },
                            {
                                "name": "Maximum",
                                "score": (response.You.ModuleScores == null || response.Community.ModuleScores[j] == undefined) ? 0 : 100,
                                "DisplayScore": (response.Community.ModuleScores == null || response.Community.ModuleScores[j] == undefined) ? 0 : parseFloat(response.Community.ModuleScores[j].WeightageScore).toFixed()
                            }
                        ]
                    };
                    createchart.loadchartdata(topallChart, "Toppa" + (j + 1));
                    var nxtLine = {
                        "values": [{
                            "name": "You",
                            "score": (response.You.ModuleScores == null || response.You.ModuleScores[j] == undefined) ? 0 : response.You.ModuleScores[j].ModuleScorePercentage,
                            "DisplayScore": (response.You.ModuleScores == null || response.You.ModuleScores[j] == undefined) ? 0 : response.You.ModuleScores[j].Modulescore,
                        },
                            {
                                "name": "NextinLine",
                                // "score": (response.NextinLine.ModuleScores[j] == undefined) ? 0 : response.TopPerformer.ModuleScores[j].ModuleScorePercentage
                                "score": (response.Team.ModuleScores == null || response.Team.ModuleScores[j] == undefined) ? 0 : response.Team.ModuleScores[j].ModuleScorePercentage,
                                "DisplayScore": (response.Team.ModuleScores == null || response.Team.ModuleScores[j] == undefined) ? 0 : response.Team.ModuleScores[j].Modulescore
                            },
                            {
                                "name": "Maximum",
                                // "score": (response.NextinLine.ModuleScores[j] == undefined) ? 0 : response.TopPerformer.ModuleScores[j].ModuleScorePercentage
                                "score": (response.Team.ModuleScores == null || response.Team.ModuleScores[j] == undefined) ? 0 : 100,
                                "DisplayScore": (response.Team.ModuleScores == null || response.Team.ModuleScores[j] == undefined) ? 0 : parseFloat(response.Team.ModuleScores[j].WeightageScore).toFixed()
                            }
                        ]
                    };

                    createchart.loadchartdata(nxtLine, "Nxtpa" + (j + 1));

                    //var rstCommunity = {
                    //    "values": [{
                    //        "name": "You",
                    //        "score": (response.You.ModuleScores == null || response.You.ModuleScores[j] == undefined) ? 0 : response.You.ModuleScores[j].ModuleScorePercentage,
                    //        "DisplayScore": (response.You.ModuleScores == null || response.You.ModuleScores[j] == undefined) ? 0 : response.You.ModuleScores[j].Modulescore,
                    //    },
                    //        {
                    //            "name": "RestofCommunity",
                    //            "score": (response.Sherpas.ModuleScores == null || response.Sherpas.ModuleScores[j] == undefined) ? 0 : response.Sherpas.ModuleScores[j].ModuleScorePercentage,
                    //            "DisplayScore": (response.Sherpas.ModuleScores == null || response.Sherpas.ModuleScores[j] == undefined) ? 0 : response.Sherpas.ModuleScores[j].Modulescore
                    //        },
                    //        {
                    //            "name": "Maximum",
                    //            "score": (response.Sherpas.ModuleScores == null || response.Sherpas.ModuleScores[j] == undefined) ? 0 : 100,
                    //            "DisplayScore": (response.Sherpas.ModuleScores == null || response.Sherpas.ModuleScores[j] == undefined) ? 0 : parseFloat(response.Sherpas.ModuleScores[j].WeightageScore).toFixed()
                    //        }
                    //    ]
                    //};
                    //createchart.loadchartdata(rstCommunity, "Rstpa" + (j + 1));
                    if ($('#choosenTile').val() == "3") {
                        var tenurechart = {
                            "values": [
                                {
                                    "name": "You",
                                    "score": (response.TeamTenure.TenureBelow12.ModuleScores == null || response.TeamTenure.TenureBelow12.ModuleScores[j] == undefined) ? 0 : response.TeamTenure.TenureBelow12.ModuleScores[j].ModuleScorePercentage,
                                    "DisplayScore": (response.TeamTenure.TenureBelow12.ModuleScores == null || response.TeamTenure.TenureBelow12.ModuleScores[j] == undefined) ? 0 : response.TeamTenure.TenureBelow12.ModuleScores[j].Modulescore,
                                },
                                {
                                    "name": "RestofCommunity",
                                    "score": (response.Tenure.TenureBelow12.ModuleScores == null || response.Tenure.TenureBelow12.ModuleScores[j] == undefined) ? 0 : response.Tenure.TenureBelow12.ModuleScores[j].ModuleScorePercentage,
                                    "DisplayScore": (response.Tenure.TenureBelow12.ModuleScores == null || response.Tenure.TenureBelow12.ModuleScores[j] == undefined) ? 0 : response.Tenure.TenureBelow12.ModuleScores[j].Modulescore
                                },
                                {
                                    "name": "Maximum",
                                    "score": (response.Tenure.TenureBelow12.ModuleScores == null || response.Tenure.TenureBelow12.ModuleScores[j] == undefined) ? 0 : 100,
                                    "DisplayScore": (response.Tenure.TenureBelow12.ModuleScores == null || response.Tenure.TenureBelow12.ModuleScores[j] == undefined) ? 0 : parseFloat(response.Tenure.TenureBelow12.ModuleScores[j].WeightageScore).toFixed()
                                }
                            ]
                        };
                        createchart.loadchartdata(tenurechart, "tenpa" + (j + 1));
                    } else {
                        var tenurechart = {
                            "values": [
                                {
                                    "name": "You",
                                    "score": (response.You.ModuleScores == null || response.You.ModuleScores[j] == undefined) ? 0 : response.You.ModuleScores[j].ModuleScorePercentage,
                                    "DisplayScore": (response.You.ModuleScores == null || response.You.ModuleScores[j] == undefined) ? 0 : response.You.ModuleScores[j].Modulescore,
                                },
                                {
                                    "name": "RestofCommunity",
                                    "score": (response.Tenure.TenureBelow12.ModuleScores == null || response.Tenure.TenureBelow12.ModuleScores[j] == undefined) ? 0 : response.Tenure.TenureBelow12.ModuleScores[j].ModuleScorePercentage,
                                    "DisplayScore": (response.Tenure.TenureBelow12.ModuleScores == null || response.Tenure.TenureBelow12.ModuleScores[j] == undefined) ? 0 : response.Tenure.TenureBelow12.ModuleScores[j].Modulescore
                                },
                                {
                                    "name": "Maximum",
                                    "score": (response.Tenure.TenureBelow12.ModuleScores == null || response.Tenure.TenureBelow12.ModuleScores[j] == undefined) ? 0 : 100,
                                    "DisplayScore": (response.Tenure.TenureBelow12.ModuleScores == null || response.Tenure.TenureBelow12.ModuleScores[j] == undefined) ? 0 : parseFloat(response.Tenure.TenureBelow12.ModuleScores[j].WeightageScore).toFixed()
                                }
                            ]
                        };
                        createchart.loadchartdata(tenurechart, "tenpa" + (j + 1));
                    }

                    //var previous = {
                    //    "values": [{
                    //        "name": "You",
                    //        "score": (response.You.ModuleScores == null || response.You.ModuleScores[j] == undefined) ? 0 : response.You.ModuleScores[j].ModuleScorePercentage,
                    //        "DisplayScore": (response.You.ModuleScores == null || response.You.ModuleScores[j] == undefined) ? 0 : response.You.ModuleScores[j].Modulescore,
                    //    },
                    //        {
                    //            "name": "Prev",
                    //            //"score": (response.Previous.ModuleScores[j] == undefined) ? 0 : response.TopPerformer.ModuleScores[j].ModuleScorePercentage
                    //            "score": (response.Previous.ModuleScores == null || response.Previous.ModuleScores[j] == undefined) ? 0 : response.Previous.ModuleScores[j].ModuleScorePercentage,
                    //            "DisplayScore": (response.Previous.ModuleScores == null || response.Previous.ModuleScores[j] == undefined) ? 0 : response.Previous.ModuleScores[j].Modulescore
                    //        },
                    //        {
                    //            "name": "Maximum",
                    //            //"score": (response.Previous.ModuleScores[j] == undefined) ? 0 : response.TopPerformer.ModuleScores[j].ModuleScorePercentage
                    //            "score": (response.Previous.ModuleScores == null || response.Previous.ModuleScores[j] == undefined) ? 0 : 100,
                    //            "DisplayScore": (response.Previous.ModuleScores == null || response.Previous.ModuleScores[j] == undefined) ? 0 : parseFloat(response.Previous.ModuleScores[j].WeightageScore).toFixed()
                    //        }
                    //    ]
                    //};
                    //createchart.loadchartdata(previous, "Prevpa" + (j + 1));

                    var all = {
                        "values": [
                                {
                                    "name": "You",
                                    "score": (response.You.ModuleScores == null || response.You.ModuleScores[j] == undefined) ? 0 : response.You.ModuleScores[j].ModuleScorePercentage,
                                    "DisplayScore": (response.You.ModuleScores == null || response.You.ModuleScores[j] == undefined) ? 0 : response.You.ModuleScores[j].Modulescore,
                                },
                             {
                                 "name": "Top",
                                 "score": (response.Community.ModuleScores == null || response.Community.ModuleScores[j] == undefined) ? 0 : response.Community.ModuleScores[j].ModuleScorePercentage,
                                 "DisplayScore": (response.Community.ModuleScores == null || response.Community.ModuleScores[j] == undefined) ? 0 : response.Community.ModuleScores[j].Modulescore
                             },
                                {
                                    "name": "NextinLine",
                                    "score": (response.Team.ModuleScores == null || response.Team.ModuleScores[j] == undefined) ? 0 : response.Team.ModuleScores[j].ModuleScorePercentage,
                                    "DisplayScore": (response.Team.ModuleScores == null || response.Team.ModuleScores[j] == undefined) ? 0 : response.Team.ModuleScores[j].Modulescore
                                },
                                {
                                    "name": "RestofCommunity",
                                    "score": (response.Sherpas.ModuleScores == null || response.Sherpas.ModuleScores[j] == undefined) ? 0 : response.Sherpas.ModuleScores[j].ModuleScorePercentage,
                                    "DisplayScore": (response.Sherpas.ModuleScores == null || response.Sherpas.ModuleScores[j] == undefined) ? 0 : response.Sherpas.ModuleScores[j].Modulescore
                                },
                                {
                                    "name": "Prev",
                                    "score": (response.Previous.ModuleScores == null || response.Previous.ModuleScores[j] == undefined) ? 0 : response.Previous.ModuleScores[j].ModuleScorePercentage,
                                    "DisplayScore": (response.Previous.ModuleScores == null || response.Previous.ModuleScores[j] == undefined) ? 0 : response.Previous.ModuleScores[j].Modulescore
                                }]
                    };
                    createchart.loadchartdata(all, "Allpa" + (j + 1));
                }
            },
            error: function (err) {
            }
        });
    }
};
var createchart = {
    loadchartdata: function (chart, element) {
        //debugger;
        var x = chart.values.length;
        var marginBuffer = 11;
        var zindexBuffer = 1;
        for (var j = 0; j < x; j++) {
            if (x == 3) {
                //var calc = parseInt(chart.values[0].DisplayScore) - parseInt(chart.values[1].DisplayScore);
                var calc = 0;
                if ($('#choosenTile').val() != 3 && $('#choosenTile').val() != 6) {
                    calc = parseInt((chart.values[1].DisplayScore == 0 || chart.values[1].DisplayScore == null) ? 0 : chart.values[1].DisplayScore) - parseInt((chart.values[0].DisplayScore == 0 || chart.values[0].DisplayScore == null) ? 0 : chart.values[0].DisplayScore);
                } else {
                    calc = parseInt((chart.values[0].DisplayScore == 0 || chart.values[0].DisplayScore == null) ? 0 : chart.values[0].DisplayScore) - parseInt((chart.values[1].DisplayScore == 0 || chart.values[1].DisplayScore == null) ? 0 : chart.values[1].DisplayScore);
                }
                //   var sclass = (calc < 0) ? "" : "";
                var calcValue = (calc < 0) ? (calc * (-1)) : calc;
                $('#' + element + '').text(calcValue);
                //if ($('#' + element + '').hasClass('chart2status')) {
                //    var sclass = (calc < 0) ? "chart2dwnstatus" : "chart2status";
                //    $('#' + element + '').removeClass('chart2status');
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
            //debugger;
            $("#" + element + 'Mar' + (j + 1) + " P").text((chart.values[j].DisplayScore == 0 || chart.values[j].DisplayScore == null) ? "" : parseInt(chart.values[j].DisplayScore).toFixed());
            $("#" + element + 'Pro' + (j + 1)).css("width", (chart.values[j].score == 0) ? 8 : chart.values[j].score + "%");
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
                zindexBuffer = 1;
                for (var k = i + 1; k < values.length; k++) {
                    if (values[i] == values[k]) {
                        $("#" + element + 'Mar' + (k + 1).toString()).css({
                            'margin-left': (-2 + marginBuffer).toString() + "%",
                            'margin-top': "-" + (-3 + marginBuffer) + "%",
                            'z-index': 5 - zindexBuffer
                        });
                        marginBuffer += 3;
                        zindexBuffer += 1;
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
    //LoadPoeDetailContent: function () {
    //    Common.ajaxsync({
    //        url: '/Standing/GetPoeContent',
    //        success: function (response) {
    //            var totrarely = 0;
    //            var totInconsistenly = 0;
    //            var totFrequently = 0;
    //            var totAlways = 0;
    //            $('#PAname').text(response.Modules[0].PoeName);
    //            // var m = "<h1> " + response.Modules[0].PoeName + "</h1>";
    //            var html = "<tr> <th> Practice Area </th> <th> Rarely </th> <th> In-Consistently </th> <th> Frequently </th> <th> Always </th> </tr>";
    //            for (var i = 0; i < response.Modules.length; i++) {
    //                totrarely = totrarely + response.Modules[i].WeightageScores.Rarely;
    //                totInconsistenly = totInconsistenly + response.Modules[i].WeightageScores.Inconsistenly;
    //                totFrequently = totFrequently + response.Modules[i].WeightageScores.Frequently;
    //                totAlways = totAlways + response.Modules[i].WeightageScores.Always;
    //                html = html + "<tr> <td>" + response.Modules[i].Modulename + "</td> <td>" + response.Modules[i].WeightageScores.Rarely + "</td> <td>" + response.Modules[i].WeightageScores.Inconsistenly + "</td><td>" + response.Modules[i].WeightageScores.Frequently + "</td><td>" + response.Modules[i].WeightageScores.Always + "</td> </tr>";
    //            }

    //            html = html + " <tr> <th> Total </th> <th>25</th> <th>50</th> <th>75 </th> <th>100</th> </tr>";
    //            $('#practiceAreaPoeContent').html(html);
    //        }
    //    });
    //}
    //LoadSideContent: function (data) {
    //    debugger;
    //    Common.ajaxsync({
    //        url: '../../Feedback/GetIntoContentByModuleOrder',
    //        data:{'moduleId':data},
    //        success: function (response) {
    //            debugger;
    //            $('#moduleintro0').html();
    //        }
    //    });
    //}
};

$(document).ready(function () {
    // GetBreadCrumbAndName();

    //New Click Implementation
    $('.clickdeeper').show();
    Common.setTopMenu(3);
    $('.sendReqMentors').on('click', function () {
        //alert('d');
        //debugger;
        var txtareavalTextMentors = $('#textAreaMentors').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
        //alert(txtareavalTextMentors);
        if (txtareavalTextMentors != "") {
            var selectedids = "";
            $('.usersConnectMentors').each(function () {
                if ($(this).find('span').hasClass('slidecontentselect')) {
                    selectedids = selectedids + $(this).attr('data-value') + ",";
                }
            });
            selectedids = selectedids.slice(0, -1);
            if (selectedids != "") {
                ConnectMessagesMentors(selectedids);
                //  alert("Your message sent successfully");
            } else {
                $('#masterMsgCont').text("Please select a users");
                $('#overallCont').show();
                // $(".popupbg,.popup").show();
                //alert("Please Select the users");
            }
        } else {
            $('#masterMsgCont').text("Please enter the text");
            $('#overallCont').show();
            //alert("Please enter the text");
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
    // debugger;
    var loadCSS = function (callback) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = "/Scripts/ref/editor/themes/square.min.css";
        link.id = 'theme-style';

        document.getElementsByTagName('head')[0].appendChild(link);

        var img = document.createElement('img');
        img.onerror = function () {
            if (callback) callback(link);
        };
        img.src = "/Scripts/ref/editor/themes/square.min.css";
    };
    var initEditorMentors = function () {
        $("#textAreaMentors").sceditor({
            plugins: 'xhtml',
            resizeEnabled: false,
            toolbar: "bold,italic,underline,left,center,right,justify,bulletlist,orderedlist",
            style: "/Scripts/ref/editor/jquery.sceditor.default.min.css"
        });
    };

    initEditorMentors();
    loadCSS(initEditorMentors);

    var initEditorPeers = function () {
        $("#textAreaPeers").sceditor({
            plugins: 'xhtml',
            resizeEnabled: false,
            toolbar: "bold,italic,underline,left,center,right,justify,bulletlist,orderedlist",
            style: "/Scripts/ref/editor/jquery.sceditor.default.min.css"
        });
    };

    initEditorPeers();
    loadCSS(initEditorPeers);

    $('.sceditor-container').css('height', 'auto');
    (function ($) {
        jQuery.fn.vscontext = function (options) {
            var defaults = {
                menuBlock: null,
                offsetX: 8,
                offsetY: 8,
                speed: 'slow'
            };
            var options = $.extend(defaults, options);
            var menu_item = '.' + options.menuBlock;
            return this.each(function () {
                $(this).bind("contextmenu", function (e) {
                    return false;
                });
                $(this).mousedown(function (e) {
                    $('#selectedques').val(e.target.parentElement.id);
                    var offsetX = e.pageX + options.offsetX;
                    var offsetY = e.pageY + options.offsetY;
                    if (e.button == "0") {
                        $(menu_item).show(options.speed);
                        $(menu_item).css('display', 'block');
                        $(menu_item).css('top', offsetY);
                        $(menu_item).css('left', offsetX);
                        $('.sharebtn').removeClass("selected");
                    } else {
                        $(menu_item).hide(options.speed);
                    }
                });
            });
        };
    })(jQuery);
    //Inline data
    //LoadHtml(10);
    // LoadSideContent(1);
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    // $('.scroll2').slimScroll();
    $('.scroll5').slimScroll({ height: '400px !important' });
    $('.scroll6').slimScroll();
    if ($('#seekSherpasMentors li').length > 9) {
        $('.scroll4').slimScroll();
    }
    //$('.indexrightclose').live('click', function () {
    //    $(".indexrightclose, .indexclose").hide();
    //    $(".indexrightarrow ,.indexrightclose1").show();
    //    $(".modelcontent").animate({ left: "-100%" }, 500);
    //});
    //$('.indexclose').live('click', function () {
    //    $(this).hide();
    //    $(".indexrightclose").show();
    //    $(".indexrightclose1").hide();
    //    $(".indexright").animate({ right: "0" }, 500);
    //});
    //$('.indexrightclose1').live('click', function () {
    //    $(".indexrightclose, .indexrightclose1").hide();
    //    $(".indexclose").show();
    //    $(".indexright").animate({ right: "-33.5%" }, 500);
    //    $(".modelcontent").animate({ left: "0%" }, 500);
    //});
    //$(document).click(function (event) {
    //    if ($(event.target).parents().index($('.indexright')) == -1) {
    //        if ($('.indexright').is(":visible")) {
    //            $(".indexright").animate({ right: "-33.5%" }, 500);
    //            $(".indexclose").show();
    //            $(".modelcontent").animate({ left: "0" }, 500);
    //        }
    //    }
    //});
    $(document).click(function (event) {
        //$(event.target).parents().find('#example-2 li ul.sticklr-active').removeClass('sticklr-active');
        setTimeout(function () {
            if ($('#example-2 li ul.sticklr-active').html() == undefined) {
                $('.standPAIcon').removeClass('selectstandPAIcon');
                $('.repIcon').removeClass('selectrepIcon');
                $('.mentorIcon').removeClass('selectmentorIcon');
                $('.setGoalIcon').removeClass('selectsetGoalIcon');
                $('.readinessResoucesIcon').removeClass('selectreadinessResoucesIcon');
                $('.connectPeersIcon').removeClass('selectconnectPeersIcon');
                //$('#target').css('display', 'none')
            }
        }, 300);
        if ($(event.target).parents().index($('.vs-context-menu')) == -1) {
            if (!$(event.target).hasClass("managerShareResource") && !$(event.target).hasClass("shareImg")) {
                if ($('.vs-context-menu').is(":visible")) {
                    $('.vs-context-menu').hide();
                }
            }
        }
    });


    $(".vs-context-menu li").live('click', function () {
        if ($(this).parent().parent().parent().attr('id') != "setTrackGoal") {
            var selectedValue = $(this).attr('data-value');
            $('.vs-context-menu').hide();
            var currentindex = $('#currIndex').val();
            var goalRequests = [];
            var goalRequest = new Requests.GoalShare();
            goalRequest = new Requests.GoalShare();
            if (currentindex == 0) {
                if (event.value != 0) {
                    goalRequest.QuestionId = parseInt(($('#qusetionid').val()));
                    goalRequest.SelectedValue = parseInt($('#Answers').val());
                    goalRequest.SharedWithId = parseInt(selectedValue);
                    goalRequests.push(goalRequest);
                    Common.ajaxPost({
                        url: '/Feedback/SaveGoal',
                        data: goalRequests,
                        success: function (response) {
                        },
                        error: function (err) {
                        }
                    });
                }
            } else {
                goalRequest.QuestionId = 0;
                goalRequest.SelectedValue = 0;
                goalRequest.SharedWithId = parseInt(selectedValue);
                goalRequests.push(goalRequest);
                var url = $('#sharedUrl').val();
                var title = $('#sharedTitle').val();
                Common.ajaxSyncPost({
                    url: '/Common/SendResourceMail',
                    data: { 'userslist': goalRequests, 'url': url, 'resourceTitle': title },
                    success: function (response) {
                        $('#masterMsgCont').text("Shared successfully");
                        $('#overallCont').show();
                        //alert("Shared successfully");
                    },
                    error: function (err) {
                    }
                });
            }
        }
        //debugger;
    });

    $('.legendwn').live('click', function () {
        $(this).removeClass("legendwn");
        $(this).parent().removeClass("clickedDropdown");
        $(this).parent().find('ul').slideUp();
    });
    $(document).click(function (event) {
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
    $('#nxtline, #community, #previous, #tenure,#all').hide();
    loadManagersList();
    //GetBreadCrumbAndName();
    $('.slidebtn').hide();
    digin.loaddigin();
    //createchart.LoadPoeDetailContent();
    var pagecount = $('#pagecount').val();
    //$('.prev,.nxt').hide();
    $('#topslide, #topslide .bn1, #topslide .p1').show();
    $('#pagetwo').click(function () {
        $('.content1').html($('#moduleintro1').html());
    });
    $('#pageoneval').click(function () {
        $(".indexrightclose").show();
        $(".indexrightclose1").hide();
        $(".modelcontent").animate({ left: "0%" }, 500);
    });
    $('#topperform').click(function () {
        var ctrl = $(this);
        $(this).addClass('selectcommunity');
        $('#nextinline').removeClass('selectAreaTeam');
        $('#comm').removeClass('selectpathfinders');
        $('#tenureTile').removeClass('selectTenure');
        $('#prev').removeClass('selectPrevious');
        $('#allclick').removeClass('selectAll');
        LoadPracticeArea('.pa1', 1);
        $('.q3').hide();
        $('#top').show();
        $('#nxtline, #community, #previous, #all,#tenure').hide();
        $('.slidebtn').hide();
        if (pagecount != 1) {
            $('#topslide, #topslide .bn1,#topslide .p1 ').show();
            $('#topslide .pagination').text('Page 1 of ' + pagecount + '');
        }
        $('#topslide .p1,  #topslide .p2,#topslide .bn3, #topslide .p3 ').hide();

        $('#top .q1').show("slow");
        $('#top .q1').animate({ 'margin-left': '2%' }, { duration: 0 });
        $('#top .q1').css('opacity', '2');
        $('#top .q2').css("margin-left", "-6%");
        $('#top .q2').css('opacity', '0.4');
    });
    $('#nextinline').click(function () {
        var ctrl = $(this);
        $(this).addClass('selectAreaTeam');
        $('#comm').removeClass('selectpathfinders');
        $('#tenureTile').removeClass('selectTenure');
        $('#prev').removeClass('selectPrevious');
        $('#allclick').removeClass('selectAll');
        $('#topperform').removeClass('selectcommunity');
        LoadPracticeArea('.pa1', 1);
        //$('.pa1').find('.chartdiv').addClass('selectFBtwocol');
        $('.q3').hide();
        $('#nxtline').show();
        $('#top,#community, #previous, #all,#tenure').hide();
        $('.slidebtn').hide();
        if (pagecount != 1) {
            $('#nxtslide .pagination').text('Page 1 of ' + pagecount + '');
            $('#nxtslide, #nxtslide .bn1 ').show();
        }
        $('#nxtslide .p2 ,#nxtslide .bn3, #nxtslide .p3').hide();

        $('#nxtline .q1').show("slow");
        $('#nxtline .q1').animate({ 'margin-left': '2%' }, { duration: 0 });
        $('#nxtline .q1').css('opacity', '2');
        $('#nxtline .q2').css("margin-left", "-6%");
        $('#nxtline .q2').css('opacity', '0.4');
    });
    $('#comm').click(function () {
        var ctrl = $(this);
        $(this).addClass('selectpathfinders');
        $('#nextinline').removeClass('selectAreaTeam');
        $('#tenureTile').removeClass('selectTenure');
        $('#prev').removeClass('selectPrevious');
        $('#allclick').removeClass('selectAll');
        $('#topperform').removeClass('selectcommunity');
        LoadPracticeArea('.pa1', 1);
        $('.pa1').find('.chartdiv').addClass('selectFBtwocol');
        $('.q3').hide();
        $('#community').show();
        $('#top, #nxtline,#previous, #all,#tenure').hide();
        $('.slidebtn').hide();
        if (pagecount != 1) {
            $('#rest .pagination').text('Page 1 of ' + pagecount + '');
            $('#rest, #rest .bn1').show();
        }
        $('#rest .bn2, #rest .p2,#rest .bn3, #rest .p3').hide();

        $('#community .q1').show("slow");
        $('#community .q1').animate({ 'margin-left': '2%' }, { duration: 0 });
        $('#community .q1').css('opacity', '2');
        $('#community .q2').css("margin-left", "-6%");
        $('#community .q2').css('opacity', '0.4');
    });
    $('#prev').click(function () {
        var ctrl = $(this);
        $(this).addClass('selectPrevious');
        $('#nextinline').removeClass('selectAreaTeam');
        $('#comm').removeClass('selectpathfinders');
        $('#tenureTile').removeClass('selectTenure');
        $('#allclick').removeClass('selectAll');
        $('#topperform').removeClass('selectcommunity');
        LoadPracticeArea('.pa1', 1);

        $('.q3').hide();
        $('#previous').show();
        $('#top, #nxtline, #community, #all,#tenure').hide();
        $('.slidebtn').hide();

        $(' #prevfb .bn2, #prevfb .p2,#prevfb .bn3, #prevfb .p3').hide();
        if (pagecount != 1) {
            $('#prevfb, #prevfb .bn1').show();
            $('#prevfb .pagination').text('Page 1 of ' + pagecount + '');
        }
        $('#previous .q1').show("slow");
        $('#previous .q1').animate({ 'margin-left': '2%' }, { duration: 0 });
        $('#previous .q1').css('opacity', '2');
        $('#previous .q2').css("margin-left", "-6%");
        $('#previous .q2').css('opacity', '0.4');
    });
    $('#tenureTile').click(function () {
        var ctrl = $(this);
        $(this).addClass('selectTenure');
        $('#nextinline').removeClass('selectAreaTeam');
        $('#comm').removeClass('selectpathfinders');
        $('#prev').removeClass('selectPrevious');
        $('#allclick').removeClass('selectAll');
        $('#topperform').removeClass('selectcommunity');
        LoadPracticeArea('.pa1', 1);
        $('#tenure').show();
        $('#top, #nxtline, #community, #previous,#all').hide();
        $('.slidebtn').hide();
        if (pagecount != 1) {
            $('#tenures .pagination').text('Page 1 of ' + pagecount + '');

            $('#tenures, #tenures .bn1').show();
        }
        $('#tenures .bn2, #tenures .p2 ').hide();

        $('#tenure .q1').show("slow");
        $('#tenure .q1').animate({ 'margin-left': '2%' }, { duration: 0 });
        $('#tenure .q1').css('opacity', '2');
        $('#tenure .q2').css('margin-left', '-6%');
        $('#tenure .q2').css('opacity', '0.4');
    });
    $('#allclick').click(function () {
        var ctrl = $(this);
        $(this).addClass('selectAll');
        $('#nextinline').removeClass('selectAreaTeam');
        $('#comm').removeClass('selectpathfinders');
        $('#tenureTile').removeClass('selectTenure');
        $('#prev').removeClass('selectPrevious');
        $('#topperform').removeClass('selectcommunity');
        LoadPracticeArea('.pa1', 1);
        $('#all').show();
        $('#top, #nxtline, #community, #previous,#tenure').hide();
        $('.slidebtn').hide();
        if (pagecount != 1) {
            $('#allpagination .pagination').text('Page 1 of ' + pagecount + '');
            $('#allpagination, #allpagination .bn1').show();
        }
        $('#allpagination .bn2, #allpagination .p2 ').hide();
        //$('#allpagination .pagination').text('Page 1 of 2');
        $('#allpagination .q1').show("slow");
        $('#all .q1').animate({ 'margin-left': '2%' }, { duration: 0 });
        $('#all .q1').css('opacity', '2');
        $('#all .q2').css('margin-left', '-6%');
        $('#all .q2').css('opacity', '0.4');

    });

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


    $(".stand li").click(function () {
        //debugger;
        var id = this.id;
        $(this).addClass("slected");
        $(this).siblings().removeClass("selected");
    });
    $('#top .q1').animate({ 'margin-left': '2%' }, { duration: 1000 });
    $('#top .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
    $('.q3').hide();

    // $('.p1').hide();

    if (pagecount == 1) {
        $('.bn1').hide();
        $('.p1').hide();
        $('.pagination').hide();
    }

    // Start Top Slide
    $('#topslide .bn1').click(function () {
        $('.prev,.nxt').hide();
        if (pagecount == 2) {
            //$('#topslide .bn2').hide();
            $('#topslide .p2').show();
        } else {
            $('#topslide .p2').show();
        }

        $('#topslide .pagination').text('Page 2 of ' + pagecount + '');
        $('#top .q1').animate({ 'margin-left': '-40%' }, { duration: 1000 });
        $('#top .q1').css('opacity', '0.4');
        $('#top .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#top .q2').css('opacity', '2');
        $('#top .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#top .q3').css('opacity', '0.4');
    });
    $('#topslide .bn2').click(function () {
        if (pagecount != 2) {
            $('.prev,.nxt').hide();
            $('.q1').hide();
            $('.q3').show();
            $('#topslide .bn3, #topslide .p3').show();
            $('#topslide .pagination').text('Page 3 of ' + pagecount + '');
            $('#top .q2').animate({ 'margin-left': '-48%' }, { duration: 1000 });
            $('#top .q2').css('opacity', '0.4');
            $('#top .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
            $('#top .q3').css('opacity', '2');
        }
    });
    $('#topslide .p2').click(function () {
        $('.prev,.nxt').hide();
        $('.q3').hide();
        $('#topslide .bn1').show();
        $('#topslide .pagination').text('Page 1 of ' + pagecount + '');
        $('#top .q1').show("slow");
        $('#top .q1').animate({ 'margin-left': '2%' }, { duration: 1000 });
        $('#top .q1').css('opacity', '2');
        $('#top .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#top .q2').css('opacity', '0.4');
    });
    $('#topslide .p3').click(function () {
        $('.prev,.nxt').hide();
        $('#topslide .p2').show();
        $('#topslide .pagination').text('Page 2 of ' + pagecount + '');
        $('#top .q2').show("slow");
        $('#top .q1').animate({ 'margin-left': '-40%' }, { duration: 1000 });
        $('#top .q1').css('opacity', '0.4');
        $('#top .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#top .q2').css('opacity', '2');
        $('#top .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#top .q3').css('opacity', '0.4');
    });
    // End Top Slide

    // Start Next Slide
    $('#nxtslide .bn1').click(function () {
        $('.prev,.nxt').hide();
        if (pagecount == 2) {
            //$('#nxtslide .bn2').hide();
            $('#nxtslide .p2').show();
        } else {
            $('#nxtslide .p2').show();
        }

        $('#nxtslide .pagination').text('Page 2 of ' + pagecount + '');
        $('#nxtline .q1').animate({ 'margin-left': '-40%' }, { duration: 1000 });
        $('#nxtline .q1').css('opacity', '0.4');
        $('#nxtline .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#nxtline .q2').css('opacity', '2');
        $('#nxtline .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#nxtline .q3').css('opacity', '0.4');
    });
    $('#nxtslide .bn2').click(function () {
        if (pagecount != 2) {
            $('.q1').hide();
            $('.q3').show();
            $('.prev,.nxt').hide();
            $('#nxtslide .p3').show();
            $('#nxtslide .pagination').text('Page 2 of ' + pagecount + '');
            $('#nxtline .q2').animate({ 'margin-left': '-48%' }, { duration: 1000 });
            $('#nxtline .q2').css('opacity', '0.4');
            $('#nxtline .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
            $('#nxtline .q3').css('opacity', '2');
        }
    });
    $('#nxtslide .p2').click(function () {
        $('.q3').hide();
        $('.prev,.nxt').hide();
        $('#nxtslide .bn1').show();
        $('#nxtslide .pagination').text('Page 1 of ' + pagecount + '');
        $('#nxtline .q1').show("slow");
        $('#nxtline .q1').animate({ 'margin-left': '2%' }, { duration: 1000 });
        $('#nxtline .q1').css('opacity', '2');
        $('#nxtline .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#nxtline .q2').css('opacity', '0.4');
    });
    $('#nxtslide .p3').click(function () {
        $('.prev,.nxt').hide();
        $('#nxtslide .p2').show();
        $('#nxtslide .pagination').text('Page 2 of ' + pagecount + '');
        $('#nxtline .q2').show("slow");
        $('#nxtline .q1').animate({ 'margin-left': '-40%' }, { duration: 1000 });
        $('#nxtline .q1').css('opacity', '0.4');
        $('#nxtline .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#nxtline .q2').css('opacity', '2');
        $('#nxtline .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#nxtline .q3').css('opacity', '0.4');
    });

    // End Next Slide
    //Start Rest Slide
    $('#rest .bn1').click(function () {
        $('.prev,.nxt').hide();
        if (pagecount == 2) {
            //$('#rest .bn2, ').hide();
            $('#rest .p2').show();
        } else {
            $('#rest .p2').show();
        }
        $('#rest .pagination').text('Page 2 of ' + pagecount + '');
        $('#community .q1').animate({ 'margin-left': '-40%' }, { duration: 1000 });
        $('#community .q1').css('opacity', '0.4');
        $('#community .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#community .q2').css('opacity', '2');
        $('#community .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#community .q3').css('opacity', '0.4');

    });
    $('#rest .bn2').click(function () {
        if (pagecount != 2) {
            $('.q1').hide();
            $('.q3').show();
            $('.prev,.nxt').hide();
            $('#rest .p3').show();
            $('#rest .pagination').text('Page 3 of ' + pagecount + '');
            $('#community .q2').animate({ 'margin-left': '-48%' }, { duration: 1000 });
            $('#community .q2').css('opacity', '0.4');
            $('#community .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
            $('#community .q3').css('opacity', '2');
        }
    });
    $('#rest .p2').click(function () {
        $('.prev,.nxt').hide();
        $('.q3').hide();
        $('#rest .bn1').show();
        $('#rest .pagination').text('Page 1 of ' + pagecount + '');
        $('#community .q1').show("slow");
        $('#community .q1').animate({ 'margin-left': '2%' }, { duration: 1000 });
        $('#community .q1').css('opacity', '2');
        $('#community .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#community .q2').css('opacity', '0.4');
    });
    $('#rest .p3').click(function () {
        $('.prev,.nxt').hide();
        $('#rest .bn2, #rest .p2').show();
        $('#rest .pagination').text('Page 2 of ' + pagecount + '');
        $('#community .q2').show();
        $('#community .q1').animate({ 'margin-left': '-40%' }, { duration: 1000 });
        $('#community .q1').css('opacity', '0.4');
        $('#community .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#community .q2').css('opacity', '2');
        $('#community .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#community .q3').css('opacity', '0.4');
    });
    //End Rest Slide

    //Start Previous Slide
    $('#prevfb .bn1').click(function () {
        $('.prev,.nxt').hide();
        if (pagecount == 2) {
            // $('#prevfb .bn2, ').hide();
            $('#prevfb .p2').show();
        } else {
            $('#prevfb .p2').show();
        }
        $('#prevfb .pagination').text('Page 2 of ' + pagecount + '');
        $('#previous .q1').animate({ 'margin-left': '-40%' }, { duration: 1000 });
        $('#previous .q1').css('opacity', '0.4');
        $('#previous .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#previous .q2').css('opacity', '2');
        $('#previous .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#previous .q3').css('opacity', '0.4');
    });
    $('#prevfb .bn2').click(function () {
        if (pagecount != 2) {
            $('.q1').hide();
            $('.q3').show();
            $('.prev,.nxt').hide();
            $('#prevfb .p3').show();
            $('#prevfb .pagination').text('Page 3 of ' + pagecount + '');
            $('#previous .q2').animate({ 'margin-left': '-48%' }, { duration: 1000 });
            $('#previous .q2').css('opacity', '0.4');
            $('#previous .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
            $('#previous .q3').css('opacity', '2');
        }
    });
    $('#prevfb .p2').click(function () {
        $('.prev,.nxt').hide();
        $('.q3').hide();
        $('#prevfb .bn1').show();
        $('#prevfb .pagination').text('Page 1 of ' + pagecount + '');
        $('#previous .q1').show("slow");
        $('#previous .q1').animate({ 'margin-left': '2%' }, { duration: 1000 });
        $('#previous .q1').css('opacity', '2');
        $('#previous .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#previous .q2').css('opacity', '0.4');
    });
    $('#prevfb .p3').click(function () {
        $('.prev,.nxt').hide();
        $('#prevfb .p2').show();
        $('#prevfb .pagination').text('Page 2 of ' + pagecount + '');
        $('#previous .q2').show("slow");
        $('#previous .q1').animate({ 'margin-left': '-40%' }, { duration: 1000 });
        $('#previous .q1').css('opacity', '0.4');
        $('#previous .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#previous .q2').css('opacity', '2');
        $('#previous .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#previous .q3').css('opacity', '0.4');
    });

    //End Previous Slide
    //Start of Tenure
    $('#tenures .bn1').click(function () {
        $('.prev,.nxt').hide();
        if (pagecount == 2) {
            // $('#tenures .bn2, ').hide();
            $('#tenures .p2').show();
        } else {
            $('#tenures .p2').show();
        }
        $('#tenures .pagination').text('Page 2 of ' + pagecount + '');
        $('#tenure .q1').animate({ 'margin-left': '-40%' }, { duration: 1000 });
        $('#tenure .q1').css('opacity', '0.4');
        $('#tenure .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#tenure .q2').css('opacity', '2');
        $('#tenure .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#tenure .q3').css('opacity', '0.4');

    });
    $('#tenures .bn2').click(function () {
        if (pagecount != 2) {
            $('.q1').hide();
            $('.q3').show();
            $('.prev,.nxt').hide();
            $('#tenures .p3').show();
            $('#tenures .pagination').text('Page 3 of ' + pagecount + '');
            $('#tenure .q2').animate({ 'margin-left': '-48%' }, { duration: 1000 });
            $('#tenure .q2').css('opacity', '0.4');
            $('#tenure .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
            $('#tenure .q3').css('opacity', '2');
        }
    });
    $('#tenures .p2').click(function () {
        $('.prev,.nxt').hide();
        $('.q3').hide();
        $('#tenures .bn1').show();
        $('#tenures .pagination').text('Page 1 of ' + pagecount + '');
        $('#tenure .q1').show("slow");
        $('#tenure .q1').animate({ 'margin-left': '2%' }, { duration: 1000 });
        $('#tenure .q1').css('opacity', '2');
        $('#tenure .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#tenure .q2').css('opacity', '0.4');
    });
    $('#tenures .p3').click(function () {
        $('.prev,.nxt').hide();
        $('#tenures .p2').show();
        $('#tenures .pagination').text('Page 2 of ' + pagecount + '');
        $('#tenure .q2').show("slow");
        $('#tenure .q1').animate({ 'margin-left': '-40%' }, { duration: 1000 });
        $('#tenure .q1').css('opacity', '0.4');
        $('#tenure .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#tenure .q2').css('opacity', '2');
        $('#tenure .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#tenure .q3').css('opacity', '0.4');
    });
    //End of tenure
    /**/

    //Start of All
    $('#allpagination .bn1').click(function () {
        $('.prev,.nxt').hide();
        if (pagecount == 2) {
            // $('#allpagination .bn2, ').hide();
            $('#allpagination .p2').show();
        } else {
            $('#allpagination .p2').show();
        }
        $('#allpagination .pagination').text('Page 2 of ' + pagecount + '');
        $('#all .q1').animate({ 'margin-left': '-40%' }, { duration: 1000 });
        $('#all .q1').css('opacity', '0.4');
        $('#all .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#all .q2').css('opacity', '2');
        $('#all .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#all .q3').css('opacity', '0.4');
    });
    $('#allpagination .bn2').click(function () {
        if (pagecount != 2) {
            $('.q1').hide();
            $('.q3').show();
            $('.prev,.nxt').hide();
            $('#allpagination .p3').show();
            $('#allpagination .pagination').text('Page 3 of ' + pagecount + '');
            $('#all .q2').animate({ 'margin-left': '-48%' }, { duration: 1000 });
            $('#all .q2').css('opacity', '0.4');
            $('#all .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
            $('#all .q3').css('opacity', '2');
        }
    });
    $('#allpagination .p2').click(function () {
        $('.prev,.nxt').hide();
        $('.q3').hide();
        $('#allpagination .bn1').show();
        $('#allpagination .pagination').text('Page 1 of ' + pagecount + '');
        $('#all .q1').show("slow");
        $('#all .q1').animate({ 'margin-left': '2%' }, { duration: 1000 });
        $('#all .q1').css('opacity', '2');
        $('#all .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#all .q2').css('opacity', '0.4');
    });
    $('#allpagination .p3').click(function () {
        $('.prev,.nxt').hide();
        $('#allpagination .p2').show();
        $('#allpagination .pagination').text('Page 2 of ' + pagecount + '');
        $('#all .q2').show("slow");
        $('#all .q1').animate({ 'margin-left': '-40%' }, { duration: 1000 });
        $('#all .q1').css('opacity', '0.4');
        $('#all .q2').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#all .q2').css('opacity', '2');
        $('#all .q3').animate({ 'margin-left': '-6%' }, { duration: 1000 });
        $('#all .q3').css('opacity', '0.4');
    });
    //End of All

    var html = "<li><a href='/communitysync/communitysync'><span><img src='../../Images/icons/standing-small.png' /></span><P>Community Sync</p></a> </li>" +
        "<li><a href='/communitysync/BigPicture'><span><img src='../../Images/icons/big-pic-small.png' /></span><P>Big Picture</p></a> </li>" +
        "<li><a href='/communitysync/PracticeAreas'><span><img src='../../Images/icons/digin-small.png' /></span> <P>Practice Areas</p></a> </li>" +
        "<li><a href='/communitysync/ExcellenceIndicators'><span><img src='../../Images/icons/dig-deeper-small.png' /></span><P>Excellence Actions</p></a> </li>";

    $('#target ul').html(html);
    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
    //LoadPoEContent();

    $('.pa1').find('.chartdiv').addClass('selectFBtwocol');
    $('.drplegends li').click(function () {
        var loadData = $(this).attr("data-value");
        var ctrl = $(this);
        $("#status,#preloader").delay(100).fadeIn("slow", function () {
            $('.tenuretext').text(ctrl.text());
            LoadTenureChart(parseInt(loadData));
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
        });
    });

    $('#pageoneval').click(function () {
        $(".indexrightclose").show();
        $(".indexrightclose1,.indexrightclose2,.indexclose").hide();
        $(".modelcontent").animate({ left: "0%" }, 500);
    });
    $('.indexrightclose').live('click', function () {
        $(".indexrightclose, .indexclose,.indexrightclose1").hide();
        $(".indexrightarrow ,.indexrightclose2").show();
        $(".modelcontent").animate({ left: "-100%" }, 500);
    });
    $('.indexrightclose2').live('click', function () {
        $(".indexrightclose, .indexclose,.indexrightclose2").hide();
        $(".indexrightarrow ,.indexrightclose1").show();
        $(".modelcontent").animate({ left: "-200%" }, 500);
    });
    $('.indexclose').live('click', function () {
        $(this).hide();
        $(".indexrightclose").show();
        $(".indexrightclose1").hide();
        $(".indexrightclose2").hide();
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
                $('.indexrightclose,.indexrightclose1,.indexrightclose2').hide();
                $(".modelcontent").animate({ left: "0" }, 500);
            }
        }

    });
    $('#pagetwo').click(function () {
        $(".indexrightclose, .indexclose,.indexrightclose1").hide();
        $(".indexrightarrow ,.indexrightclose2").show();
        $(".modelcontent").animate({ left: "-100%" }, 500);
    });
    $('#pagetwoval').click(function () {
        $('#pagetwo').click();
    });
    $('#pageonevals').click(function () {
        $('#pageoneval').click();
    });
    $('#pagethrees').click(function () {
        $('#pagethree').click();
    });
    $('#pagethree').click(function () {
        $(".indexrightclose, .indexclose,.indexrightclose2").hide();
        $(".indexrightarrow ,.indexrightclose1").show();
        $(".modelcontent").animate({ left: "-200%" }, 500);
    });
    loadRightArrow(parseInt($('#choosenTile').val()));
    function loadRightArrow(type) {
        switch (type) {
            case 1:
                //    var html1 = '<h1>Self Feedback Standing</h1>' +
                //'<div class="hlprow"><div class="hlpheading">Community</div><div class="hlpcont">Your Self Feedback score compared with the average Self Feedback score of your role community</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Area Team</div><div class="hlpcont">Your Self Feedback score compared with the average Self Feedback score of your team</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Mentors</div><div class="hlpcont">Your Self Feedback score compared with the average Self Feedback score of others in your role community who stand within 20% of the goal</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Tenure</div><div class="hlpcont">Your Self Feedback score compared with the average Self Feedback score of various tenure groups in your role community</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Previous</div><div class="hlpcont">Your Self Feedback score compared with your previous Self Feedback score</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">All</div><div class="hlpcont">A comprehensive view of your Self Feedback score compared with Community, Team, Mentors and Previous</div></div>';
                //    $('.descinfo').empty().html(html1);
                //    $('.model').removeClass('managerModel');
                //    $('.model').removeClass('teamModel');
                //    $('.model').addClass('selfModel');

                $('#selfCont').html("Your Self Feedback score compared with the average Self Feedback score of your role community");
                $('#areaCont').html("Your Self Feedback score compared with the average Self Feedback score of your team");
                $('#mentorCont').html("Your Self Feedback score compared with the average Self Feedback score of others in your role community who stand within 20% of the goal");
                $('#tenureCont').html("Your Self Feedback score compared with the average Self Feedback score of various tenure groups in your role community");
                $('#prevCont').html("Your Self Feedback score compared with your previous Self Feedback score");
                $('#allCont').html("A comprehensive view of your Self Feedback score compared with Community and Team");

                break;
            case 2:
                //    var html2 = '<h1>Manager Feedback Standing</h1>' +
                //'<div class="hlprow"><div class="hlpheading">Community</div><div class="hlpcont">Your Manager Feedback score compared with the average Manager Feedback score of your role community</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Area Team</div><div class="hlpcont">Your Manager Feedback score compared with the average Manager Feedback score of your team</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Mentors</div><div class="hlpcont">Your score compared with the average score of others in the role community with scores within 20% of the goal</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Tenure</div><div class="hlpcont">Your Manager Feedback score compared with the average Manager Feedback score of various tenure groups in your role community</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Previous</div><div class="hlpcont">Your Manager Feedback score compared with your previous Manager Feedback score</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">All</div><div class="hlpcont">A comprehensive view of your Manager Feedback score compared with Community, Team, Mentors and Previous</div></div>';
                //    $('.descinfo').empty().html(html2);
                //    $('.model').addClass('managerModel');
                //    $('.model').removeClass('teamModel');
                //    $('.model').removeClass('selfModel');


                $('#selfCont').html("Your Manager Feedback score compared with the average Manager Feedback score of your role community");
                $('#areaCont').html("Your Manager Feedback score compared with the average Manager Feedback score of your team");
                $('#mentorCont').html("Your score compared with the average score of others in the role community with scores within 20% of the goal");
                $('#tenureCont').html("Your Manager Feedback score compared with the average Manager Feedback score of various tenure groups in your role community");
                $('#prevCont').html("Your Manager Feedback score compared with your previous Manager Feedback score");
                $('#allCont').html("A comprehensive view of your Manager Feedback score compared with Community and Team");
                break;
            case 3:
                //    var html3 = "<h1>Your Team's Feedback Standing</h1>" +
                //"<div class='hlprow'><div class='hlpheading'>Community</div><div class='hlpcont'>The average Feedback score you have given your team members compared with the average Manager Feedback score of your team's role community</div></div>" +
                //"<div class='hlprow'><div class='hlpheading'>Area Team</div><div class='hlpcont'>The average Feedback score you have given your team members compared with the average Manager Feedback score of your team's team????</div></div>" +
                //'<div class="hlprow"><div class="hlpheading">Mentors</div><div class="hlpcont">The average Feedback score you have given your team members compared with the average Manager Feedback score of others in their role community who stand within 20% of the goal</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Tenure</div><div class="hlpcont">The average Feedback score you have given your team members compared with the average Manager Feedback score of various tenure groups in their role community</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Previous</div><div class="hlpcont">The average Feedback score you have given your team compared with their previous average Feedback score</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">All</div><div class="hlpcont">A comprehensive view of the average Feedback score you have given your team compared with Community, Team, Mentors and Previous</div></div>';
                //    $('.descinfo').empty().html(html3);
                //    $('.model').removeClass('managerModel');
                //    $('.model').addClass('teamModel');
                //    $('.model').removeClass('selfModel');

                $('#selfCont').html("The average Feedback score you have given your team members compared with the average Manager Feedback score of your team's role community");
                $('#areaCont').html("The average Feedback score you have given your team members compared with the average Manager Feedback score of your Area");
                $('#mentorCont').html("The average Feedback score you have given your team members compared with the average Manager Feedback score of others in their role community who stand within 20% of the goal");
                $('#tenureCont').html("The average Feedback score you have given your team members compared with the average Manager Feedback score of various tenure groups in their role community");
                $('#prevCont').html("The average Feedback score you have given your team compared with their previous average Feedback score");
                $('#allCont').html("A comprehensive view of the average Feedback score you have given your team compared to your Community and Area");
                break;
            case 4:
                //    var html4 = '<h1>Manager Feedback Standing</h1>' +
                //'<div class="hlprow"><div class="hlpheading">Community</div><div class="hlpcont">Your Manager Feedback score compared with the average Manager Feedback score of your role community</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Area Team</div><div class="hlpcont">Your Manager Feedback score compared with the average Manager Feedback score of your team</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Mentors</div><div class="hlpcont">Your score compared with the average score of others in the role community with scores within 20% of the goal</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Tenure</div><div class="hlpcont">Your Manager Feedback score compared with the average Manager Feedback score of various tenure groups in your role community</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Previous</div><div class="hlpcont">Your Manager Feedback score compared with your previous Manager Feedback score</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">All</div><div class="hlpcont">A comprehensive view of your Manager Feedback score compared with Community, Team, Mentors and Previous</div></div>';
                //    $('.descinfo').empty().html(html4);
                //    $('.model').addClass('managerModel');
                //    $('.model').removeClass('teamModel');
                //    $('.model').removeClass('selfModel');
                $('#selfCont').html("Your Manager Feedback score compared with the average Manager Feedback score of your role community");
                $('#areaCont').html("Your Manager Feedback score compared with the average Manager Feedback score of your team");
                $('#mentorCont').html("Your score compared with the average score of others in the role community with scores within 20% of the goal");
                $('#tenureCont').html("Your Manager Feedback score compared with the average Manager Feedback score of various tenure groups in your role community");
                $('#prevCont').html("Your Manager Feedback score compared with your previous Manager Feedback score");
                $('#allCont').html("A comprehensive view of your Manager Feedback score compared with Community and Team");
                break;
            case 5:
                //    var html5 = '<h1>Manager Feedback Standing</h1>' +
                //'<div class="hlprow"><div class="hlpheading">Community</div><div class="hlpcont">Your Manager Feedback score compared with the average Manager Feedback score of your role community</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Area Team</div><div class="hlpcont">Your Manager Feedback score compared with the average Manager Feedback score of your team</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Mentors</div><div class="hlpcont">Your score compared with the average score of others in the role community with scores within 20% of the goal</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Tenure</div><div class="hlpcont">Your Manager Feedback score compared with the average Manager Feedback score of various tenure groups in your role community</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Previous</div><div class="hlpcont">Your Manager Feedback score compared with your previous Manager Feedback score</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">All</div><div class="hlpcont">A comprehensive view of your Manager Feedback score compared with Community, Team, Mentors and Previous</div></div>';
                //    $('.descinfo').empty().html(html5);
                //    $('.model').removeClass('managerModel');
                //    $('.model').addClass('teamModel');
                //    $('.model').removeClass('selfModel');
                $('#selfCont').html("Your Manager Feedback score compared with the average Manager Feedback score of your role community");
                $('#areaCont').html("Your Manager Feedback score compared with the average Manager Feedback score of your team");
                $('#mentorCont').html("Your score compared with the average score of others in the role community with scores within 20% of the goal");
                $('#tenureCont').html("Your Manager Feedback score compared with the average Manager Feedback score of various tenure groups in your role community");
                $('#prevCont').html("Your Manager Feedback score compared with your previous Manager Feedback score");
                $('#allCont').html("A comprehensive view of your Manager Feedback score compared with Community and Team");
                break;
            case 6:
                //    var html6 = '<h1>Manager Feedback Standing</h1>' +
                //'<div class="hlprow"><div class="hlpheading">Community</div><div class="hlpcont">Your Manager Feedback score compared with the average Manager Feedback score of your role community</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Area Team</div><div class="hlpcont">Your Manager Feedback score compared with the average Manager Feedback score of your team</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Mentors</div><div class="hlpcont">Your score compared with the average score of others in the role community with scores within 20% of the goal</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Tenure</div><div class="hlpcont">Your Manager Feedback score compared with the average Manager Feedback score of various tenure groups in your role community</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Previous</div><div class="hlpcont">Your Manager Feedback score compared with your previous Manager Feedback score</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">All</div><div class="hlpcont">A comprehensive view of your Manager Feedback score compared with Community, Team, Mentors and Previous</div></div>';
                //    $('.descinfo').empty().html(html6);
                //    $('.model').addClass('managerModel');
                //    $('.model').removeClass('teamModel');
                //    $('.model').removeClass('selfModel');
                $('#selfCont').html("Your Manager Feedback score compared with the average Manager Feedback score of your role community");
                $('#areaCont').html("Your Manager Feedback score compared with the average Manager Feedback score of your team");
                $('#mentorCont').html("Your score compared with the average score of others in the role community with scores within 20% of the goal");
                $('#tenureCont').html("Your Manager Feedback score compared with the average Manager Feedback score of various tenure groups in your role community");
                $('#prevCont').html("Your Manager Feedback score compared with your previous Manager Feedback score");
                $('#allCont').html("A comprehensive view of your Manager Feedback score compared with Community and Team");
                break;
            case 7:
                //    var html7 = "<h1>Your Team's Feedback Standing</h1>" +
                //"<div class='hlprow'><div class='hlpheading'>Community</div><div class='hlpcont'>The average Feedback score you have given your team members compared with the average Manager Feedback score of your team's role community</div></div>" +
                //"<div class='hlprow'><div class='hlpheading'>Area Team</div><div class='hlpcont'>The average Feedback score you have given your team members compared with the average Manager Feedback score of your team's team????</div></div>" +
                //'<div class="hlprow"><div class="hlpheading">Mentors</div><div class="hlpcont">The average Feedback score you have given your team members compared with the average Manager Feedback score of others in their role community who stand within 20% of the goal</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Tenure</div><div class="hlpcont">The average Feedback score you have given your team members compared with the average Manager Feedback score of various tenure groups in their role community</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">Previous</div><div class="hlpcont">The average Feedback score you have given your team compared with their previous average Feedback score</div></div>' +
                //'<div class="hlprow"><div class="hlpheading">All</div><div class="hlpcont">A comprehensive view of the average Feedback score you have given your team compared with Community, Team, Mentors and Previous</div></div>';
                //    $('.descinfo').empty().html(html7);
                //    $('.model').addClass('managerModel');
                //    $('.model').removeClass('teamModel');
                //    $('.model').removeClass('selfModel');
                $('#selfCont').html("The average Feedback score you have given your team members compared with the average Manager Feedback score of your team's role community");
                $('#areaCont').html("The average Feedback score you have given your team members compared with the average Manager Feedback score of your team's team");
                $('#mentorCont').html("The average Feedback score you have given your team members compared with the average Manager Feedback score of others in their role community who stand within 20% of the goal");
                $('#tenureCont').html("The average Feedback score you have given your team members compared with the average Manager Feedback score of various tenure groups in their role community");
                $('#prevCont').html("The average Feedback score you have given your team compared with their previous average Feedback score");
                $('#allCont').html("A comprehensive view of the average Feedback score you have given your team compared with Community and Team");
                break;
            default:
                break;
        }
    }
    $('#topperform').click();
    //$('#target').click(function () {
    //    $('#target').css('display', 'block');
    //});


});
function GetBreadCrumbAndName() {
    Common.ajaxsync({
        url: '/Standing/GetClicked',
        success: function (response) {
            var bvalue = '';
            var lvalue = '';
            switch (response) {
                case 1:
                    bvalue = 'Self';
                    lvalue = 'You';
                    break;
                case 2:
                    bvalue = 'Manager';
                    lvalue = 'Your Manager';
                    break;
                case 3:
                    bvalue = 'Team Members';
                    lvalue = 'Your Team Members';
                    break;
                case 4:
                    bvalue = 'Skip Level Manager';
                    lvalue = 'Your Skip Level Manager';
                    break;
                case 5:
                    bvalue = 'Customers & Partners';
                    lvalue = 'Your Customers & Partners';
                    break;
                case 6:
                    bvalue = 'Peers (Feedback given to peers)';
                    lvalue = 'Your Peers (Feedback given to peers)';
                    break;
                case 7:
                    bvalue = 'Peers (Feedback given by peers)';
                    lvalue = 'Your Peers (Feedback given by peers)';
                    break;
                default:
                    break;
            }
            var breadCrumb = '<a href="../Common/Index">Home</a> > <a href="../communitysync/communitysync">Community Sync</a> > ' + bvalue + ' > Practice Areas';
            $('.breadcrumb').html(breadCrumb);
            $('.legend1').text(lvalue);
            $('#choosenTile').val(response);

        },
        error: function () {
        }
    });
}

function LoadHtml(totalpa) {
    var numberOfSlide = Math.ceil(totalpa.length / 4);
    var commhtml = " <div class='chartslide'>";
    var teamhtml = " <div class='chartslide'>";
    var sherpashtml = " <div class='chartslide'>";
    var tenurehtml = " <div class='chartslide'>";
    var previoushtml = " <div class='chartslide'>";
    var allhtml = " <div class='chartslide'>";
    var dummyhtml = "";
    var dummyhtml1 = "";
    var count = 0;
    for (var k = 0; k < numberOfSlide; k++) {
        var slideClass = "<div class='slide q" + (k + 1) + "'>";
        commhtml = commhtml + slideClass;
        teamhtml = teamhtml + slideClass;
        sherpashtml = sherpashtml + slideClass;
        tenurehtml = tenurehtml + slideClass;
        previoushtml = previoushtml + slideClass;
        allhtml = allhtml + slideClass;
        var twoClass = " <div class='coltwo'>";
        for (var j = k; j < (k + 2) ; j++) {
            commhtml = commhtml + twoClass;
            teamhtml = teamhtml + twoClass;
            sherpashtml = sherpashtml + twoClass;
            tenurehtml = tenurehtml + twoClass;
            previoushtml = previoushtml + twoClass;
            allhtml = allhtml + twoClass;
            for (var i = j; i < (j + 2) ; i++) {
                if (count < totalpa.length) {
                    if (i == 0) {
                        count = i;
                    }
                    commhtml = commhtml + "<div class='chartsmlplaceholder pa" + (count + 1) + "'> <h1></h1> <div id='li" + count + "' class='chartdiv " + (i == 0 ? "selectFBtwocol" : "") + "'  onclick='LoadPracticeArea(this," + (count + 1) + ")' data-value=" + totalpa[count].ModuleId + "> <div class='legend'><p>Legend</p> <ul> <li class='legend1'>You</li> " +
                        "<li class='legend2'>Community</li> <li class='legendmp'>Excellence</li></ul> " +
                        "</div> <div class='chart'> <div class='chartop'> </div> <div class='chartbg'> <div class='chartarea'> <ul> " +
                        "<li class='progressbar1' style='width: 0%' id='Toppa" + (count + 1) + "Pro1'> </li> <li class='progressbar2' style='width: 0%' id='Toppa" + (count + 1) + "Pro2'>  </li>" +
                        " </ul> </div> " +
                        "</div> <div class='chartbtm'> <div class='markerholder'> <ul> <li class='markergray' style='width: 0%' id='Toppa" + (count + 1) + "Mar2'> <p>  </p> </li> " +
                        "<li class='markeramper' style='width: 0%' id='Toppa" + (count + 1) + "Mar1'> <p>  </p> </li> <li class='markermp' style='width: 100%' id='Toppa" + (count + 1) + "Mar3'> <p>  </p> </li></ul> </div> </div> <ul class='scale paAr" + (count + 1) + "' id='Toppa" + (count + 1) + "Level'>" +
                        " <li class='scale1' id='Toppa1Level1'>25%</li> <li class='scale2' id='Toppa1Level2'>50%</li> <li class='scale3' id='Toppa1Level3'>75%</li> " +
                        "<li class='scale4' id='Toppa1Level4'> 100%<li> </ul> </div> <div class='pointer'> </div> <div class='status' id='Toppa" + (count + 1) + "'> </div> <div class='charttile'>Level of Excellence</div></div> </div>";

                    teamhtml = teamhtml + "<div class='chartsmlplaceholder pa" + (count + 1) + "'> <h1></h1> <div id='li" + count + "' class='chartdiv " + (i == 0 ? "selectFBtwocol" : "") + "'  onclick='LoadPracticeArea(this," + (count + 1) + ")' data-value=" + totalpa[count].ModuleId + "> " +
                        "<div class='legend'><p>Legend</p> <ul> <li class='legend1'>You</li> <li class='legend2'>Area Team</li> <li class='legendmp'>Excellence</li>" +
                        " </ul> </div> <div class='chart'> <div class='chartop'> </div> <div class='chartbg'> " +
                        "<div class='chartarea'> <ul> <li class='progressbar1' style='width: 0%' id='Nxtpa" + (count + 1) + "Pro1'></li>" +
                        " <li class='progressbar2' style='width: 0%' id='Nxtpa" + (count + 1) + "Pro2'>  </li> </ul> </div> </div> <div class='chartbtm'> " +
                        "<div class='markerholder'> <ul> <li class='markergray' style='width: 0%' id='Nxtpa" + (count + 1) + "Mar2'> <p>  </p> </li>" +
                        " <li class='markeramper' style='width: 0%' id='Nxtpa" + (count + 1) + "Mar1'> <p>  </p> </li> <li class='markermp' style='width: 100%' id='Nxtpa" + (count + 1) + "Mar3'> <p>  </p> </li></ul> </div> </div> <ul class='scale paAr1' id='Nxtpa1Level'> " +
                        "<li class='scale1'>25%</li> <li class='scale2'>50%</li> <li class='scale3'>75%</li> <li class='scale4'>100%</li> </ul> </div> <div class='pointer'>" +
                        " </div> <div class='status' id='Nxtpa" + (count + 1) + "'> </div> <div class='charttile'>Level of Excellence</div></div> </div>";

                    sherpashtml = sherpashtml + "<div class='chartsmlplaceholder pa" + (count + 1) + "'> <h1></h1> <div id='li" + count + "' class='chartdiv " + (i == 0 ? "selectFBtwocol" : "") + "'  onclick='LoadPracticeArea(this," + (count + 1) + ")' data-value=" + totalpa[count].ModuleId + "> <div class='legend'><p>Legend</p> " +
                        "<ul> <li class='legend1'>You</li> <li class='legend2'>Mentors</li> <li class='legendmp'>Excellence</li></ul> </div> <div class='chart'> " +
                        "<div class='chartop'> </div> <div class='chartbg'> <div class='chartarea'> <ul> <li class='progressbar1' style='width: 0%' id='Rstpa" + (count + 1) + "Pro1'>  " +
                        "</li> <li class='progressbar2' style='width: 0%' id='Rstpa" + (count + 1) + "Pro2'> </li> </ul> </div> </div> <div class='chartbtm'>" +
                        " <div class='markerholder'> <ul> <li class='markergray' style='width: 0%' id='Rstpa" + (count + 1) + "Mar2'> <p>  </p> </li> " +
                        "<li class='markeramper' style='width: 0%' id='Rstpa" + (count + 1) + "Mar1'> <p>  </p> </li><li class='markermp' style='width: 100%' id='Rstpa" + (count + 1) + "Mar3'> <p>  </p> </li> </ul> </div> </div>" +
                        " <ul class='scale paAr1' id='Rstpa" + (count + 1) + "Level'> <li class='scale1'>25%</li> <li class='scale2'>50%</li> <li class='scale3'>75%</li> " +
                        "<li class='scale4'>100%</li> </ul> </div> <div class='pointer'> </div> <div class='status' id='Rstpa" + (count + 1) + "'> </div><div class='charttile'>Level of Excellence</div> </div> </div>";

                    tenurehtml = tenurehtml + "<div class='chartsmlplaceholder pa" + (count + 1) + "'> <h1></h1> <div id='li" + count + "' class='chartdiv " + (i == 0 ? "selectFBtwocol" : "") + "'  onclick='LoadPracticeArea(this," + (count + 1) + ")' data-value=" + totalpa[count].ModuleId + "> " +
                        "<div class='legend legendTenure'><p>Legend</p> <ul> <li class='legend1'>You</li> <li class='legend2'>Tenure</li> <li class='legendmp'>Excellence</li> </ul> </div> <div class='legend legenddropdown'> <p class='tenuretext'>0 - 12 Months</p> <ul class='drplegends'> <li data-value='1'>0 - 12 Months</li> <li data-value='2'>13 - 24 Months</li> " +
                        "<li  data-value='3'>25+ Months</li></ul> </div>" +
                        "<div class='chart'> <div class='chartop'></div> <div class='chartbg'> <div class='chartarea'> <ul> <li class='progressbar1' style='width: 0%' id='tenpa" + (count + 1) + "Pro1'>  </li> " +
                        "<li class='progressbar2' style='width: 0%' id='tenpa" + (count + 1) + "Pro2'>  </li> </ul> </div> </div> <div class='chartbtm'> <div class='markerholder'> <ul>" +
                        " <li class='markergray tenuregray' style='width: 0%' id='tenpa" + (count + 1) + "Mar2'> <p> </p> </li> <li class='markeramper tenureramper' style='width: 0%' id='tenpa" + (count + 1) + "Mar1'> <p> </p> </li> <li class='markermp tenuregray' style='width: 100%' id='tenpa" + (count + 1) + "Mar3'> <p> </p> </li> </ul> </div> " +
                        "</div> <ul class='scale paAr1' id='Nxtpa1Level'> <li class='scale1'>25%</li> <li class='scale2'>50%</li> <li class='scale3'>75%</li> " +
                        "<li class='scale4'>100%</li> </ul> </div> <div class='pointer'></div> <div class='status' id='tenpa" + (count + 1) + "'></div><div class='charttile'>Level of Excellence</div> </div></div>";

                    previoushtml = previoushtml + " <div class='chartsmlplaceholder pa" + (count + 1) + "'> <h1></h1> <div id='li" + count + "' class='chartdiv " + (i == 0 ? "selectFBtwocol" : "") + "'  onclick='LoadPracticeArea(this," + (count + 1) + ")' data-value=" + totalpa[count].ModuleId + "> <div class='legend'> <p>Legend</p>" +
                        "<ul> <li class='legend1'>You</li> <li class='legend2'>Previous</li> <li class='legendmp'>Excellence</li> </ul> </div> <div class='chart'>" +
                        " <div class='chartop'> </div> <div class='chartbg'> <div class='chartarea'> <ul> <li class='progressbar1' style='width: 0%' id='Prevpa" + (count + 1) + "Pro1'>" +
                        "  </li> <li class='progressbar2' style='width: 0%' id='Prevpa" + (count + 1) + "Pro2'>  </li> </ul> </div> </div> <div class='chartbtm'> " +
                        "<div class='markerholder'> <ul> <li class='markergray' style='width: 0%' id='Prevpa" + (count + 1) + "Mar2'> <p>  </p> </li>" +
                        " <li class='markeramper' style='width: 0%' id='Prevpa" + (count + 1) + "Mar1'> <p>  </p> </li><li class='markermp' style='width: 100%' id='Prevpa" + (count + 1) + "Mar3'> <p>  </p> </li> </ul> </div> </div> " +
                        "<ul class='scale paAr1' id='Prevpa1Level'> <li class='scale1'>25%</li> <li class='scale2'>50%</li> <li class='scale3'>75%</li>" +
                        " <li class='scale4'>100%</li> </ul> </div> <div class='pointer'> </div> <div class='status' id='Prevpa" + (count + 1) + "'> </div><div class='charttile'>Level of Excellence</div> </div> </div>";

                    //allhtml = allhtml + "<div class='chartsmlplaceholder pa" + (count + 1) + "'> <h1></h1> <div id='li" + count + "' class='chartdiv " + (i == 0 ? "selectFBtwocol" : "") + "'  onclick='LoadPracticeArea(this," + (count + 1) + ")' data-value=" + totalpa[count].ModuleId + "> <div class='legend'> <p>Legend</p> <ul> <li class='legend1'>You</li>" +
                    //    " <li class='legend3'>Community</li> <li class='legend2'>Area Team</li> <li class='legend4'>Mentors</li> " +
                    //    "<li class='legend5'>Previous</li> </ul> </div> <div class='chart'> <div class='chartop'> </div> <div class='chartbg'> <div class='chartarea'> <ul>" +
                    //    " <li class='progressbar1' style='width: 0%' id='Allpa" + (count + 1) + "Pro1'>  </li> <li class='progressbar2' style='width: 0%' id='Allpa" + (count + 1) + "Pro2'> " +
                    //    " </li> <li class='progressbar3' style='width: 0%' id='Allpa" + (count + 1) + "Pro3'> <p> </p> </li> " +
                    //    "<li class='progressbar4' style='width: 0%' id='Allpa" + (count + 1) + "Pro4'> </li> <li class='progressbar5' style='width: 0%' id='Allpa" + (count + 1) + "Pro5'> <p> </p>" +
                    //    " </li> </ul> </div> </div> <div class='chartbtm'> <div class='markerholder'> <ul> <li class='markeramper' style='width: 0%' id='Allpa" + (count + 1) + "Mar1'>" +
                    //    " <p> 20 </p> </li> <li class='marker3' style='width: 0%' id='Allpa" + (count + 1) + "Mar2'> <p> 30 </p> </li>" +
                    //    " <li class='markergray' style='width: 0%' id='Allpa" + (count + 1) + "Mar3'> <p>  </p> </li> <li class='marker4' style='width: 0%' id='Allpa" + (count + 1) + "Mar4'> <p>  </p> </li>" +
                    //    " <li class='marker5' style='width: 0%' id='Allpa" + (count + 1) + "Mar5'> <p>  </p> </li> </ul> </div> </div> <ul class='scale' id='Ul2'>" +
                    //    " <li class='scale1' id='Li6'>25%</li> <li class='scale2' id='Li7'>50%</li> <li class='scale3' id='Li8'>75%</li> " +
                    //    "<li class='scale4' id='Li9'>100%</li> </ul> </div> <div class='charttile'>Level of Excellence</div></div> </div>";
                    allhtml = allhtml + "<div class='chartsmlplaceholder pa" + (count + 1) + "'> <h1></h1> <div id='li" + count + "' class='chartdiv " + (i == 0 ? "selectFBtwocol" : "") + "'  onclick='LoadPracticeArea(this," + (count + 1) + ")' data-value=" + totalpa[count].ModuleId + "> <div class='legend'> <p>Legend</p> <ul> <li class='legend1'>You</li>" +
                     " <li class='legend2'>Community</li> <li class='legend3'>Area Team</li> " +
                     "</ul> </div> <div class='chart'> <div class='chartop'> </div> <div class='chartbg'> <div class='chartarea'> <ul>" +
                     " <li class='progressbar1' style='width: 0%' id='Allpa" + (count + 1) + "Pro1'>  </li> <li class='progressbar2' style='width: 0%' id='Allpa" + (count + 1) + "Pro2'> " +
                     " </li> <li class='progressbar3' style='width: 0%' id='Allpa" + (count + 1) + "Pro3'> <p> </p> </li> " +

                     " </ul> </div> </div> <div class='chartbtm'> <div class='markerholder'> <ul> <li class='markeramper' style='width: 0%' id='Allpa" + (count + 1) + "Mar1'>" +
                     " <p> 20 </p> </li> <li class='markergray' style='width: 0%' id='Allpa" + (count + 1) + "Mar2'> <p> 30 </p> </li>" +
                     " <li class='marker3' style='width: 0%' id='Allpa" + (count + 1) + "Mar3'> <p>  </p> </li> " +
                     "  </ul> </div> </div> <ul class='scale' id='Ul2'>" +
                     " <li class='scale1' id='Li6'>25%</li> <li class='scale2' id='Li7'>50%</li> <li class='scale3' id='Li8'>75%</li> " +
                     "<li class='scale4' id='Li9'>100%</li> </ul> </div> <div class='charttile'>Level of Excellence</div></div> </div>";
                } else {
                    dummyhtml1 = dummyhtml1 + "<div class='chartsmlplaceholder'><h1>&nbsp;</h1>" +
                        "<div class='chartdiv dummychartdiv'></div></div>";
                }
                count++;
            }
            allhtml = allhtml + dummyhtml + dummyhtml1 + "</div>";
            commhtml = commhtml + dummyhtml + dummyhtml1 + "</div>";
            teamhtml = teamhtml + dummyhtml + dummyhtml1 + "</div>";
            sherpashtml = sherpashtml + dummyhtml + dummyhtml1 + "</div>";
            tenurehtml = tenurehtml + dummyhtml + dummyhtml1 + "</div>";
            previoushtml = previoushtml + dummyhtml + dummyhtml1 + "</div>";
            dummyhtml1 = "";
        }
        allhtml = allhtml + "</div>";
        commhtml = commhtml + "</div>";
        teamhtml = teamhtml + "</div>";
        sherpashtml = sherpashtml + "</div>";
        tenurehtml = tenurehtml + "</div>";
        previoushtml = previoushtml + "</div>";
    }

    allhtml = allhtml + "</div>";
    commhtml = commhtml + "</div>";
    teamhtml = teamhtml + "</div>";
    sherpashtml = sherpashtml + "</div>";
    tenurehtml = tenurehtml + "</div>";
    previoushtml = previoushtml + "</div>";
    $('#top').append(commhtml);
    $('#nxtline').append(teamhtml);
    $('#community').append(sherpashtml);
    $('#tenure').append(tenurehtml);
    $('#previous').append(previoushtml);
    $('#all').append(allhtml);
    $('#pagecount').val(numberOfSlide);
    $('.pagination').html("Page 1 of " + numberOfSlide + "");
    GetBreadCrumbAndName();
}

//function LoadSideContent(data) {
//    Common.ajaxsync({
//        url: '../../Feedback/GetIntoContentByModuleOrder',
//        data: { 'moduleId': data },
//        success: function () {
//            // $('#moduleintro0').html(response.ModuleIntro);
//        }
//    });
//}

function showModuleIntro(page) {
    //debugger;
    $(".slideout").animate({ left: '0px' }, { queue: false, duration: 500 });
    $('#modulecontent').fadeOut(500);
    $('#moduleintro3').find('img').hide();
    setTimeout(function () {
        $('#modulecontent').html($('#moduleintro' + page + '').html());
    }, 500);
    $('#modulecontent').fadeIn();
    $('.sharebtn').vscontext({ menuBlock: 'vs-context-menu' });
}
function showCoachingIntro(page) {
    //debugger;
    $(".slideout").animate({ left: '0px' }, { queue: false, duration: 500 });
    //$('#maincontent #poeintroPane' + page).show();
    $("#maincontent #poeintroPane" + page).fadeIn(500);
    $('#maincontent .pageBtn-Part').find('#nonselecteds' + page).addClass('SelectPagebtn');
    for (var i = 0; i < $('#maincontent >.poeintroPaneDummy').length; i++) {
        if (page != i) {
            $('#maincontent #poeintroPane' + i).hide();
            $("#maincontent #poeintroPane" + i).fadeOut();
            $('#maincontent .pageBtn-Part').find('#nonselecteds' + i).removeClass('SelectPagebtn');
        }
    };
    //$('.programDef').fadeOut(500);
    //$('.programDef').html($('#Program' + page + '').html());
    //$('.programDef').fadeIn();
    $('.sharebtn').vscontext({ menuBlock: 'vs-context-menu' });
}
function showGoalIntro(page, htm) {
    //debugger;
    //$(".slideout").animate({ left: '0px' }, { queue: false, duration: 500 });
    $('#maincontent').fadeOut(500);
    setTimeout(function () {
        $('#maincontent').html($('#setgoals' + page + '').html());

        $('#maincontent').fadeIn();
        $('.errormsg').hide();
        $('.sharebtn').vscontext({ menuBlock: 'vs-context-menu' });
        for (var m = 1; m < 10; m++) {
            $(".qq" + m + "").slider({
                min: 0,
                max: 4,
                range: "min",
                value: LoadQuestions($(".qq" + m + "").attr("data-mod"), $(".qq" + m + "").attr("data-value")),
                slide: function (ui, event) {
                    if (event.value != 0) {
                        var goalRequests = [];
                        var goalRequest = new Requests.GoalShare();
                        goalRequest = new Requests.GoalShare();
                        goalRequest.QuestionId = parseInt(($(this).attr("data-value")));
                        goalRequest.SelectedValue = parseInt(event.value);
                        goalRequest.SharedWithId = 0;
                        goalRequests.push(goalRequest);

                        Common.ajaxPost({
                            url: '/Feedback/SaveGoal',
                            data: goalRequests,
                            success: function (response) {
                            },
                            error: function (err) {
                            }
                        });
                    }
                    if (event.value == 0) {
                        $(this).parent().find('.firstid').hide();
                        $(this).parent().find('.secondid').hide();
                        $(this).parent().find('.thirdid').hide();
                        $(this).parent().find('.forthid').hide();
                        $(this).parent().find('#share1').hide();
                        $(this).parent().find('#share2').hide();
                        $(this).parent().find('#share3').hide();
                        $(this).parent().find('#share4').hide();
                        $(this).parent().next('div').hide();
                        $(this).parent().find('.ui-slider-range-min').css('width', '0px');
                    }
                    if (event.value == 1) {
                        $(this).parent().find('.firstid').show();
                        $(this).parent().find('.secondid').hide();
                        $(this).parent().find('.thirdid').hide();
                        $(this).parent().find('.forthid').hide();
                        $(this).parent().find('#share1').show();
                        $(this).parent().find('#share2').hide();
                        $(this).parent().find('#share3').hide();
                        $(this).parent().find('#share4').hide();
                        $(this).parent().next('div').show();
                        $(this).parent().find('.ui-slider-range-min').css('width', '25%');
                    }
                    if (event.value == 2) {
                        $(this).parent().find('.firstid').hide();
                        $(this).parent().find('.secondid').show();
                        $(this).parent().find('.thirdid').hide();
                        $(this).parent().find('.forthid').hide();
                        $(this).parent().find('#share1').hide();
                        $(this).parent().find('#share2').show();
                        $(this).parent().find('#share3').hide();
                        $(this).parent().find('#share4').hide();
                        $(this).parent().next('div').show();
                        $(this).parent().find('.ui-slider-range-min').css('width', '50%');
                    }
                    if (event.value == 3) {
                        $(this).parent().find('.firstid').hide();
                        $(this).parent().find('.secondid').hide();
                        $(this).parent().find('.thirdid').show();
                        $(this).parent().find('.forthid').hide();
                        $(this).parent().find('#share1').hide();
                        $(this).parent().find('#share2').hide();
                        $(this).parent().find('#share3').show();
                        $(this).parent().find('#share4').hide();
                        $(this).parent().next('div').show();
                        $(this).parent().find('.ui-slider-range-min').css('width', '75%');
                    }
                    if (event.value == 4) {
                        $(this).parent().find('.firstid').hide();
                        $(this).parent().find('.secondid').hide();
                        $(this).parent().find('.thirdid').hide();
                        $(this).parent().find('.forthid').show();
                        $(this).parent().find('#share1').hide();
                        $(this).parent().find('#share2').hide();
                        $(this).parent().find('#share3').hide();
                        $(this).parent().find('#share4').show();
                        $(this).parent().next('div').show();
                        $(this).parent().find('.ui-slider-range-min').css('width', '100%');
                    }
                }
            });
        }
    }, 100);
    //$('.sharebtn').vscontext({ menuBlock: 'vs-context-menu' });
}

function LoadTenureChart(mode) {
    Common.ajaxsync({
        url: '/Standing/GetStandingScore',
        success: function (response) {
            var modulescore = null;
            var teamTenureModule = null;
            $('.tenuregray').removeAttr("style");
            $('.tenuregray').removeAttr("style");
            $('.tenureramper').removeAttr("style");
            $('.tenureramper').removeAttr("style");
            switch (mode) {
                case 1:
                    modulescore = response.Tenure.TenureBelow12;
                    if ($('#choosenTile').val() == "3") {
                        teamTenureModule = response.TeamTenure.TenureBelow12;
                    } else {
                        teamTenureModule = response.You;
                    }
                    break;
                case 2:
                    modulescore = response.Tenure.TenureBelow36;
                    if ($('#choosenTile').val() == "3") {
                        teamTenureModule = response.TeamTenure.TenureBelow36;
                    } else {
                        teamTenureModule = response.You;
                    }
                    break;
                case 3:
                    modulescore = response.Tenure.TenureAbove36;
                    if ($('#choosenTile').val() == "3") {
                        teamTenureModule = response.TeamTenure.TenureAbove36;
                    } else {
                        teamTenureModule = response.You;
                    }
                    break;
                default:
            }
            for (var j = 0; j < response.PracticeAreaContent.length; j++) {
                var tenurechart = {
                    "values": [{
                        "name": "You",
                        "score": (teamTenureModule.ModuleScores == null || teamTenureModule.ModuleScores[j] == undefined) ? 0 : teamTenureModule.ModuleScores[j].TotalModuleScore,
                        "DisplayScore": (teamTenureModule.ModuleScores == null || teamTenureModule.ModuleScores[j] == undefined) ? 0 : teamTenureModule.ModuleScores[j].Modulescore,
                    },
                    {
                        "name": "RestofCommunity",
                        "score": (modulescore.ModuleScores == null || modulescore.ModuleScores[j] == undefined) ? 0 : modulescore.ModuleScores[j].TotalModuleScore,
                        "DisplayScore": (modulescore.ModuleScores == null || modulescore.ModuleScores[j] == undefined) ? 0 : modulescore.ModuleScores[j].Modulescore
                    },
                    {
                        "name": "Maximum",
                        "score": (modulescore.ModuleScores == null || modulescore.ModuleScores[j] == undefined) ? 0 : 100,
                        "DisplayScore": (modulescore.ModuleScores == null || modulescore.ModuleScores[j] == undefined) ? 0 : parseFloat(modulescore.ModuleScores[j].WeightageScore).toFixed()
                    }
                    ]
                };
                createchart.loadchartdata(tenurechart, "tenpa" + (j + 1));
            }
        },
        error: function (err) {
        }
    });
}

function loadManagersList() {
    Common.ajax({
        url: '../../Common/GetMyReceiveFbTeam',
        success: function (response) {
            var html = "";
            for (var i = 0; i < response.length; i++) {
                html = html + "<li data-value= " + response[i].User.UserId + ">" + response[i].User.FirstName + " " + response[i].User.LastName + "</li>";
            }
            $('#assignees').append(html);
        },
        error: function (err) {
        }
    });
}

function LoadQuestions(moduleid, questionid) {
    var output = 0;
    Common.ajaxsync({
        url: "/Feedback/GetGoal?moduleid=" + moduleid + '&quesionid=' + questionid,
        success: function (response) {
            output = response;
        },
        error: function (err) {
        }
    });
    return parseInt(output);
}

//function LoadPoEContent() {
//    Common.ajaxsync({
//        url: '/Standing/GetPoeContent',
//        success: function (response) {
//            var total = 0;
//            $('#poenamestandingbigpic').text(response.Modules[0].PoeName);
//            var html = " <tr> <td colspan='3' class='desctablepoe'></td> </tr> <tr> <th>Practice Area</th> <th></th> <th>Points</th> </tr><tr><td colspan='3'><div class='scroll2'><table id='papoeContentsScroll'><tr><td>";
//            for (var i = 0; i < response.Modules.length; i++) {
//                total = total + response.Modules[i].ModuleAverage;
//                html = html + "<tr> <td>" + response.Modules[i].Modulename + "</td> <td></td> <td>" + response.Modules[i].ModuleAverage + "</td> </tr>";
//            }

//            html = html + "</td></tr></table></div></td></tr><tr> <th>Total</th> <th></th> <th>100</th> </tr>";
//            $('#papoeContents').html(html);
//           // $('.scroll2').slimScroll();
//            if (response.Modules.length <= 5) {
//                $('#papoeContentsScroll').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
//            } else {
//                $('#papoeContentsScroll').parents('.slimScrollDiv').find('.slimScrollBar').hide();
//            }
//        }
//    });
//}