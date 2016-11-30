var bigpicture = {
    loadbigpicture: function () {
        Common.ajaxsync({
            url: '/Standing/GetStandingScore',
            success: function (response) {
                $('.goalChartArea ul').css('left', response.PoeGoal + "%");
                //Community
                var topallChart = {
                    "values": [{
                        "name": "You",
                        "score": response.You.WcsiScore
                    },
                                {
                                    "name": "Top",
                                    "score": response.Community.WcsiScore
                                }]
                };
                createchart.loadchartdata(topallChart, "topall");
                //Team
                var nxtallChart = {
                    "values": [{
                        "name": "You",
                        "score": response.You.WcsiScore
                    },
                                {
                                    "name": "nxt",
                                    "score": response.Team.WcsiScore
                                }]
                };
                createchart.loadchartdata(nxtallChart, "nxtall");
                //Sherpas
                var rstallChart = {
                    "values": [{
                        "name": "You",
                        "score": response.You.WcsiScore
                    },
                                {
                                    "name": "rst",
                                    "score": response.Sherpas.WcsiScore
                                }]
                };
                createchart.loadchartdata(rstallChart, "rstall");
                //Previous
                var prvallChart = {
                    "values": [{
                        "name": "You",
                        "score": response.You.WcsiScore
                    },
                                {
                                    "name": "prv",
                                    "score": response.Previous.WcsiScore
                                }]
                };
                createchart.loadchartdata(prvallChart, "prvall");

                //Tenure
                var tenureChart = {
                    "values": [{
                        "name": "You",
                        "score": response.You.WcsiScore
                    },
                                {
                                    "name": "tenure",
                                    "score": response.Tenure.TenureBelow12.WcsiScore
                                }]
                };
                createchart.loadchartdata(tenureChart, "tenures");

                var allallChart = {
                    "values": [{
                        "name": "You",
                        "score": response.You.WcsiScore
                    },
                        {
                            "name": "comm",
                            "score": response.Community.WcsiScore
                        },
                                {
                                    "name": "Top",
                                    "score": response.Team.WcsiScore
                                },
                                {
                                    "name": "Last",
                                    "score": response.Sherpas.WcsiScore
                                },
                                {
                                    "name": "Rest",
                                    "score": response.Previous.WcsiScore
                                }]
                };
                createchart.loadchartdata(allallChart, "allall");
            },
            error: function () {
            }
        });
    }
};

var createchart = {
    loadchartdata: function (chart, element) {
        //debugger;
        var x = chart.values.length;
        var marginBuffer;
        var zindexBuffer;
        for (var j = 0; j < x; j++) {
            if (x == 2) {
                //var calc = parseInt(chart.values[0].score) - parseInt(chart.values[1].score);
                var calc = 0;
                if ($('#choosenTile').val() != 3 && $('#choosenTile').val() != 6 && $('#choosenTile').val() != 2) {
                    calc = parseInt(chart.values[1].score) - parseInt(chart.values[0].score);
                } else {
                    calc = parseInt(chart.values[0].score) - parseInt(chart.values[1].score);
                }
                var calcValue = (calc < 0) ? (calc * (-1)) : calc;
                $('#' + element + '').text(calcValue);
                //if ($('#' + element + '').hasClass('dwnstatus')) {
                //    var sclass = (calc < 0) ? "dwnstatus" : "status";
                //    $('#' + element + '').removeClass('status');
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

            if (chart.values[j].score != 0) {
                $("#" + element + 'mar' + (j + 1) + " P").text(chart.values[j].score);
                $("#" + element + 'mar' + (j + 1)).css("width", chart.values[j].score + "%");
                $("#" + element + 'pro' + (j + 1)).css("width", chart.values[j].score + "%");
            } else {
                $("#" + element + 'mar' + (j + 1)).css("width", "0%");
                $("#" + element + 'pro' + (j + 1)).css("width", "4%");
                $("#" + element + 'mar' + (j + 1) + " P").text("");
            }
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
                var margintopBuffer = 4;
                zindexBuffer = 1;
                for (var k = i + 1; k < values.length; k++) {
                    if (values[i] == values[k]) {
                        $("#" + element + 'mar' + (k + 1).toString()).css({
                            'margin-left': (marginBuffer).toString() + "%",
                            'margin-top': "-" + (-3 + margintopBuffer) + "%",
                            'z-index': 5 - zindexBuffer
                        });
                        marginBuffer += 3;
                        margintopBuffer += 2;
                        zindexBuffer += 1;
                        values[k] = 0;
                    }
                }
            }
        }
    },
    FindDuplicates: function (arrayName) {
        var newArray = arrayName;
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
    //            var total = 0;
    //            $('#PAname').text(response.Modules[0].PoeName);
    //            //var html = " <tr> <td colspan='3' class='desctablepoe'></td> </tr> <tr> <th>Practice Area</th> <th>Priority</th> <th>Points</th> </tr><tr><td colspan='3'><div class='scroll2'><table id='bigpicPoeContent1Scroll'><tr><td>";
               
    //            var html = "<tr> <th>Practice Area</th> <th></th> <th>Points</th> </tr><tr>    <td colspan='3'><table id='bigpicPoeContent1Scroll'><tbody>";
    //            for (var i = 0; i < response.Modules.length; i++) {
    //                total = total + response.Modules[i].ModuleAverage;
    //                html = html + "<tr> <td>" + response.Modules[i].Modulename + "</td> <td></td> <td>" + response.Modules[i].ModuleAverage + "</td> </tr>";
    //            }

    //            //html = html + "</td></tr></table></div></td></tr><tr> <th>Total</th> <th></th> <th>100</th> </tr>";

    //            html = html + "</tbody></table></td></tr>  <tr> <th>Total</th> <th></th> <th>100</th> </tr>";
    //            $('#bigpicPoeContent1').html(html);
    //            $('.scroll2').slimScroll();
    //            if (response.Modules.length <= 5) {
    //                $('#bigpicPoeContent1Scroll').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
    //            } else {
    //                $('#bigpicPoeContent1Scroll').parents('.slimScrollDiv').find('.slimScrollBar').hide();
    //            }
    //        }
    //    });
    //}
};

$(document).ready(function () {
    $('.clickdeeper').show();
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $('.scroll1').slimScroll();
    $('.scroll2').slimScroll();
    Common.setTopMenu(3);
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/start-standing_h.png');
    $('#pagetwo').click(function () {
        $(".indexrightclose, .indexclose").hide();
        $(".indexrightarrow ,.indexrightclose1").show();
        $(".modelcontent").animate({ left: "-100%" }, 500);
    });
    $('#tenureLegendClick li').click(function () {
        $('#tenuretext').text($(this).text());
        var ctrl = $(this);
        $("#status,#preloader").delay(100).fadeIn("slow", function () {
            LoadTenureGraph(parseInt(ctrl.attr("data-value")));
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
        });
    });
    $('.legendwn').live('click', function () {
        $(this).removeClass("legendwn");
        $(this).parent().removeClass("clickedDropdown");
        $(this).parent().find('ul').slideUp();
    });


  
    

    $(document).click(function (event) {
       
        $('#bpinfo').removeClass('selectStandBPInfo');
        if (!$(event.target).parent().hasClass('legend')) {
            if ($('.drplegends').is(":visible")) {
                // $("#all .legend ul").slideUp();
                $(".legend ul").slideUp();
                //$('#all .legend p').removeClass("legendwn");
                $('.legend p').removeClass("legendwn");
            }
        } else {
            var visible = $(event.target).parent().find('ul:visible').length;
            if (visible == 0) {
                $("#all .legend ul").slideUp();
                $('#all .legend p').removeClass("legendwn");
                $(event.target).parent().find('ul').slideDown();
                $(event.target).parent().find('p').addClass("legendwn");
            } else {
                $("#all .legend ul").slideUp();
            }

            //
        }
    });

    $('#pageoneval').click(function () {
        $(".indexrightclose").show();
        $(".indexrightclose1").hide();
        $(".modelcontent").animate({ left: "0%" }, 500);
    });
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
        if ($(event.target).parents().index($('.indexright')) == -1) {
            if ($('.indexright').is(":visible")) {
                $(".indexright").animate({ right: "-33.5%" }, 500);
                $(".indexclose").show();
                $(".modelcontent").animate({ left: "0" }, 500);
            }
        }
    });
    $('.help').hide();
    GetBreadCrumbAndName();
    var html = "<li><a href='/communitysync/communitysync'><span><img src='../../Images/icons/standing-small.png' /></span><p>Community Sync</p></a> </li>" +
        "<li><a href='/communitysync/BigPicture'><span><img src='../../Images/icons/big-pic-small.png' /></span><p>Big Picture</p></a> </li>" +
        "<li><a href='/communitysync/PracticeAreas'><span><img src='../../Images/icons/digin-small.png' /></span><p>Practice Areas</p></a> </li>" +
        "<li><a href='/communitysync/ExcellenceIndicators'><span><img src='../../Images/icons/dig-deeper-small.png' /></span><p>Excellence Actions</p></a> </li>";
    $('#target ul').html(html);
    $('#bigslide').hide();
    bigpicture.loadbigpicture();
    $('#nxtline, #community, #all,#tenure').hide();

    //createchart.LoadPoeDetailContent();
    $('#topperform').addClass("selectcommunity");
    $('#topperform').click(function () {
        $('#top').show();
        $('#topperform').addClass("selectcommunity");                                                      //Changes 
        $('#nextinline').removeClass("selectAreaTeam");
        $('#comm').removeClass("selectpathfinders");
        $('#tenureTile').removeClass("selectTenure");
        $('#prev').removeClass("selectPrevious");
        $('#alltile').removeClass("selectAll");
        $('#nxtline, #community, #previous, #all,#tenure').hide();
        $('#bigslide').hide();
        $('#bigslide .prev,#bigslide .nxt').hide();
    });
    $('#nextinline').click(function () {
        //$('#nxtline').show();
        //$('#nextinline').addClass("selectAreaTeam");
        //$('#topperform').removeClass("selectcommunity");
        //$('#comm').removeClass("selectpathfinders");
        //$('#tenureTile').removeClass("selectTenure");
        //$('#prev').removeClass("selectPrevious");
        //$('#alltile').removeClass("selectAll");
        //$('#top,#community, #previous, #all,#tenure').hide();
        //$('#bigslide').hide();
        //$('#bigslide .prev,#bigslide .nxt').hide();
    });
    $('#comm').click(function () {
        $('#community').show();
        $('#comm').addClass("selectpathfinders");
        $('#nextinline').removeClass("selectAreaTeam");
        $('#topperform').removeClass("selectcommunity");
        $('#tenureTile').removeClass("selectTenure");
        $('#prev').removeClass("selectPrevious");
        $('#alltile').removeClass("selectAll");
        $('#top, #nxtline,#previous, #all,#tenure').hide();
        $('#bigslide').hide();
        $('#bigslide .prev,#bigslide .nxt').hide();
    });
    $('#prev').click(function () {
        $('#previous').show();
        $('#prev').addClass("selectPrevious");
        $('#nextinline').removeClass("selectAreaTeam");
        $('#comm').removeClass("selectpathfinders");
        $('#tenureTile').removeClass("selectTenure");
        $('#topperform').removeClass("selectcommunity");
        $('#alltile').removeClass("selectAll");
        $('#top, #nxtline, #community, #all,#tenure').hide();
        $('#bigslide').hide();
        $('#bigslide .prev,#bigslide .nxt').hide();
    });
    $('#tenureTile').click(function () {
        $('#tenure').show();
        $('#tenureTile').addClass("selectTenure");
        $('#nextinline').removeClass("selectAreaTeam");
        $('#comm').removeClass("selectpathfinders");
        $('#topperform').removeClass("selectcommunity");
        $('#prev').removeClass("selectPrevious");
        $('#alltile').removeClass("selectAll");
        $('#top, #nxtline, #community, #previous,#all').hide();
        $('#bigslide').show();
        $('#bigslide #p1,#bigslide #bn1').show();
    });
    $('#alltile').click(function () {
        //$('#all').show();
        //$('#alltile').addClass("selectAll");
        //$('#nextinline').removeClass("selectAreaTeam");
        //$('#comm').removeClass("selectpathfinders");
        //$('#tenureTile').removeClass("selectTenure");
        //$('#prev').removeClass("selectPrevious");
        //$('#topperform').removeClass("selectcommunity");
        //$('#top, #nxtline, #community, #previous,#tenure').hide();
        //$('#bigslide').show();
        //$('#bigslide #p1,#bigslide #bn1').show();
    });
    $(".stand li").click(function () {
        $(this).addClass("selected");
        $(this).siblings().removeClass("selected");
    });
    $('#bn1').click(function () {
        //alert('fix');
        $('.prev,.nxt').hide();
        $('#p2,#bn2').show();
        $('#q1').animate({ 'margin-left': '-100%' }, { duration: 1000 });
        $('#pagetxt').html(' Page 2 of 2');
    });
    $('#p2').click(function () {
        $('.prev,.nxt').hide();
        $('#q1').show("slow");
        $('#p1,#bn1').show();
        $('#q1').animate({ 'margin-left': '0px' }, { duration: 1000 });
        $('#pagetxt').html(' Page 1 of 2');
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
                $('#allCont').html("A comprehensive view of the average Feedback score you have given your team compared with Community and Team");
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
                $('#areaCont').html("The average Feedback score you have given your team members compared with the average Manager Feedback score of your team's team????");
                $('#mentorCont').html("The average Feedback score you have given your team members compared with the average Manager Feedback score of others in their role community who stand within 20% of the goal");
                $('#tenureCont').html("The average Feedback score you have given your team members compared with the average Manager Feedback score of various tenure groups in their role community");
                $('#prevCont').html("The average Feedback score you have given your team compared with their previous average Feedback score");
                $('#allCont').html("A comprehensive view of the average Feedback score you have given your team compared with Community and Team");
                break;
            default:
                break;
        }
    }

    var clickDashboardMode = $('#clickModes').val();
    var userTenure = $('#userTenure').val();
    if (clickDashboardMode != "") {
        switch (parseInt(clickDashboardMode)) {
            case 1:
                //$('#community').show();
                //$('#top, #nxtline,#previous, #all,#tenure').hide();
                //$('#bigslide').hide();
                //$('#bigslide .prev,#bigslide .nxt').hide();
                break;
            case 2:
                $('#nxtline').show();
                $('#top,#community, #previous, #all,#tenure').hide();
                $('#bigslide').hide();
                $('#nextinline').addClass('selectAreaTeam').siblings().removeClass('selectcommunity');
                $('#bigslide .prev,#bigslide .nxt').hide();
                break;
            case 3:
                $('#tenure').show();
                $('#top, #nxtline, #community, #previous,#all').hide();
                $('#bigslide').show();
                $('#tenureTile').addClass('selected').siblings().removeClass('selected');
                $('#bigslide #p1,#bigslide #bn1').show();
                if (userTenure <= 12) {
                    LoadTenureGraph(1);
                    $('#tenuretext').text("0 - 12 Months");
                } else if (userTenure > 12 && userTenure <= 36) {
                    LoadTenureGraph(2);
                    $('#tenuretext').text("13 - 36 Months");
                } else if (userTenure > 36 && userTenure <= 300) {
                    LoadTenureGraph(3);
                    $('#tenuretext').text("36+ Months");
                }

            default:
        }
    }
    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
    $('#bpinfo').click(function () {
        var ctrl = $(this);
        $(this).addClass('selectStandBPInfo');
    });
   

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
                    lvalue = 'Your Peers';
                    break;
                case 7:
                    bvalue = 'Peers (Feedback given by peers)';
                    lvalue = 'Your Peers';
                    break;
                default:
                    break;
            }
            var breadCrumb = ' <a href="../Common/Index">Home</a> > <a href="../communitysync/communitysync">Community Sync</a> > ' + bvalue + ' > The Big Picture';
            $('.breadcrumb').html(breadCrumb);
            $('.legend1').text(lvalue);
            $('#choosenTile').val(response);
        },
        error: function (err) {
        }
    });
}

function LoadTenureGraph(mode) {
    Common.ajaxsync({
        url: '/Standing/GetStandingScore',
        success: function (response) {
            var modulescore = null;
            switch (mode) {
                case 1:
                    modulescore = response.Tenure.TenureBelow12;
                    break;
                case 2:
                    modulescore = response.Tenure.TenureBelow36;
                    break;
                case 3:
                    modulescore = response.Tenure.TenureAbove36;
                    break;
                default: }
            var tenureChart = {
                "values": [{
                    "name": "You",
                    "score": response.You.WcsiScore
                },
                            {
                                "name": "tenure",
                                "score": modulescore.WcsiScore
                            }]
            };
            createchart.loadchartdata(tenureChart, "tenures");
        }
    });
}

