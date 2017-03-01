var digdeeper = {
    loaddigdeeper: function (selectedli) {
        Common.ajaxsync({
            url: '/Standing/GetStandingScore',
            success: function (response) {
                var img = "";
                var paHtml = "";
                for (var m = 0; m < response.PracticeAreaContent.length; m++) {
                    var overallScore = 0;
                    var perQuestionWeightage = 0;
                    //for (var l = 0; l < response.PracticeAreaContent[m].Questions.length; l++) {
                    //    var managerScore = 0;
                    //    var youScore = 0;
                    //    perQuestionWeightage = ((response.You.ModuleScores[m].WeightageScore / response.PracticeAreaContent[m].Questions.length) / 4).toFixed(1);
                    //    if (response.You.ModuleScores[m].QuestionScores.length != 0) {
                    //        youScore = ((response.You.ModuleScores[m].QuestionScores[l].ScorePercentage / 25) * perQuestionWeightage);
                    //    }
                    //    if (selectedli == 1) {
                    //        if (response.Community.ModuleScores[m].QuestionScores.length != 0) {
                    //            managerScore = ((response.Community.ModuleScores[m].QuestionScores[l].ScorePercentage / 25) * perQuestionWeightage);
                    //        }
                    //        overallScore = overallScore + (managerScore - youScore);
                    //    }
                    //    else if (selectedli == 2) {
                    //        if (response.Team.ModuleScores[m].QuestionScores.length != 0) {
                    //            managerScore = ((response.Team.ModuleScores[m].QuestionScores[l].ScorePercentage / 25) * perQuestionWeightage);
                    //        }
                    //        overallScore = overallScore + (managerScore - youScore);
                    //    }
                    //    else if (selectedli == 3) {
                    //        if (response.Sherpas.ModuleScores[m].QuestionScores.length != 0) {
                    //            managerScore = ((response.Sherpas.ModuleScores[m].QuestionScores[l].ScorePercentage / 25) * perQuestionWeightage);
                    //        }
                    //        overallScore = overallScore + (managerScore - youScore);
                    //    }
                    //    else if (selectedli == 4) {
                    //        if (response.Tenure.TenureBelow12.ModuleScores[m].QuestionScores.length != 0) {
                    //            managerScore = ((response.Tenure.TenureBelow12.ModuleScores[m].QuestionScores[l].ScorePercentage / 25) * perQuestionWeightage);
                    //        }
                    //        overallScore = overallScore + (managerScore - youScore);
                    //    }
                    //    else if (selectedli == 5) {
                    //        if (response.Previous.ModuleScores[m].QuestionScores.length != 0) {
                    //            managerScore = ((response.Previous.ModuleScores[m].QuestionScores[l].ScorePercentage / 25) * perQuestionWeightage);
                    //        }
                    //        overallScore = overallScore + (managerScore - youScore);
                    //    }
                    //    else if (selectedli == 6) {
                    //        if (response.Tenure.TenureBelow36.ModuleScores[m].QuestionScores.length != 0) {
                    //            managerScore = ((response.Tenure.TenureBelow36.ModuleScores[m].QuestionScores[l].ScorePercentage / 25) * perQuestionWeightage);
                    //        }
                    //        overallScore = overallScore + (managerScore - youScore);
                    //    }
                    //    else if (selectedli == 7) {
                    //        if (response.Tenure.TenureAbove36.ModuleScores[m].QuestionScores.length != 0) {
                    //            managerScore = ((response.Tenure.TenureAbove36.ModuleScores[m].QuestionScores[l].ScorePercentage / 25) * perQuestionWeightage);
                    //        }
                    //        overallScore = overallScore + (managerScore - youScore);
                    //    }
                    //}

                    //img = $('#selectedpoeDigdeep').val() + (m + 1);
                    //paHtml = paHtml + "<li id='pa" + (m + 1) + "' class='pa selectingArea' data-value=" + (m + 1) + "><div class='number syncnumber' id='PaVal" + (m + 1) + "'></div> <img src='../Images/icons/" + img + ".png'><p> " + response.PracticeAreaContent[m].ModuleName + " </p> </li>";

                    img = $('#selectedpoeDigdeep').val().replace("/", "") + (m + 1);
                    imagename = $('#selectedpoeDigdeep').val().replace("/", "");
                    //paHtml = paHtml + "<li id='pa" + (m + 1) + "' class='pa selectingArea " + img + "Tile' data-value=" + (m + 1) + "><div class='number syncnumber' id='PaVal" + (m + 1) + "'></div><p> " + response.PracticeAreaContent[m].ModuleName + " </p> </li>";
                    paHtml = paHtml + "<li id='pa" + (m + 1) + "' class='pa selectingArea' data-value=" + (m + 1) + "><img src='../Images/icons/" + img + ".png' /><p> " + response.PracticeAreaContent[m].ModuleName + " </p> </li>";
                    if (selectedli == 1) {

                        LoadHtml(response.You.ModuleScores[m].QuestionScores, response.Community.ModuleScores[m].QuestionScores, (m + 1), 1, response.PracticeAreaContent[m].Questions, response.You.ModuleScores[m].WeightageScore);
                    } else if (selectedli == 2) {

                        LoadHtml(response.You.ModuleScores[m].QuestionScores, response.Team.ModuleScores[m].QuestionScores, (m + 1), 2, response.PracticeAreaContent[m].Questions, response.You.ModuleScores[m].WeightageScore);
                    } else if (selectedli == 3) {
                        LoadHtml(response.You.ModuleScores[m].QuestionScores, response.Sherpas.ModuleScores[m].QuestionScores, (m + 1), 3, response.PracticeAreaContent[m].Questions, response.You.ModuleScores[m].WeightageScore);
                    } else if (selectedli == 4) {
                        if ($('#controlclicked').val() == "3") {
                            LoadHtml(response.TeamTenure.TenureBelow12.ModuleScores[m].QuestionScores, response.Tenure.TenureBelow12.ModuleScores[m].QuestionScores, (m + 1), 4, response.PracticeAreaContent[m].Questions, response.You.ModuleScores[m].WeightageScore);
                        } else {
                            LoadHtml(response.You.ModuleScores[m].QuestionScores, response.Tenure.TenureBelow12.ModuleScores[m].QuestionScores, (m + 1), 4, response.PracticeAreaContent[m].Questions, response.You.ModuleScores[m].WeightageScore);
                        }
                        
                    } else if (selectedli == 5) {
                        LoadHtml(response.You.ModuleScores[m].QuestionScores, response.Previous.ModuleScores[m].QuestionScores, (m + 1), 5, response.PracticeAreaContent[m].Questions, response.You.ModuleScores[m].WeightageScore);
                    } else if (selectedli == 6) {
                        if ($('#controlclicked').val() == "3") {
                            LoadHtml(response.TeamTenure.TenureBelow36.ModuleScores[m].QuestionScores, response.Tenure.TenureBelow36.ModuleScores[m].QuestionScores, (m + 1), 6, response.PracticeAreaContent[m].Questions, response.You.ModuleScores[m].WeightageScore);
                        } else {
                            LoadHtml(response.You.ModuleScores[m].QuestionScores, response.Tenure.TenureBelow36.ModuleScores[m].QuestionScores, (m + 1), 6, response.PracticeAreaContent[m].Questions, response.You.ModuleScores[m].WeightageScore);
                        }
                    } else if (selectedli == 7) {
                        if ($('#controlclicked').val() == "3") {
                            LoadHtml(response.TeamTenure.TenureAbove36.ModuleScores[m].QuestionScores, response.Tenure.TenureAbove36.ModuleScores[m].QuestionScores, (m + 1), 7, response.PracticeAreaContent[m].Questions, response.You.ModuleScores[m].WeightageScore);
                        } else {
                            LoadHtml(response.You.ModuleScores[m].QuestionScores, response.Tenure.TenureAbove36.ModuleScores[m].QuestionScores, (m + 1), 7, response.PracticeAreaContent[m].Questions, response.You.ModuleScores[m].WeightageScore);
                        }
                    }
                    loadRightArrowUpdated(parseInt($('#controlclicked').val()), selectedli);
                }

                if (response.PracticeAreaContent.length < 8) {
                    for (var i = response.PracticeAreaContent.length; i < 8; i++) {
                        paHtml = paHtml + "<li class='dummytile'> <p>&nbsp;</p></li>";
                    }
                }
                $('#stndmenu').html(paHtml);
                var sel = 'select' + imagename + '';

                var firstimagenumber = $('#stndmenu li').first().attr('data-value');
                $('#stndmenu li').first().addClass('selectedIndicator');
                //$('#stndmenu li').first().addClass(sel + firstimagenumber);
                var pagination = $('#paLevel1').find('.chartsmlplaceholder').attr("data-value");
                if (pagination != "1") {
                    $(".prev,.nxt").hide();
                    $(".bn1").show();
                    $('.pagination').html("Page 1 of " + pagination + "");
                    $('#pagemax').val(pagination);
                } else {
                    $(".prev,.nxt").hide();
                    $('.pagination').html(" ");
                }
                $('.scroll1').slimScroll();
                if ($('#stndmenu li').length <= 8) {
                    $('#stndmenu').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                } else {
                    $('#stndmenu').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                }
                //$('.q2').hide();
                //LoadHtml(response.You.ModuleScores[9].QuestionScores, response.Community.ModuleScores[9].QuestionScores);
                //$('.q2').hide();
                //$('.q3').hide();
                $('.chartholder').hide();
                $('#paLevel1').show();

                //Implemented Select Class for Modules
                $('.selectingArea').hover(
       function () {
           removeImgAttrHover();
           $(this).find('img').attr("src", "../Images/icons/" + $('#selectedpoeDigdeep').val().replace("/", "") + $(this).attr("data-value") + "h" + ".png");
       }, function () {
           //alert('123')
           removeImgAttrHover();
           $('.selectedIndicator').find('img').attr("src", "../Images/icons/" + $('#selectedpoeDigdeep').val().replace("/", "") + $('.selectedIndicator').attr("data-value") + "h" + ".png");
       });
                $('.selectingArea').click(function () {
                   // debugger;
                    $('.q3').hide();
                    $('.q2').show().css('opacity', '0.4');
                    imagenumber = $(this).attr('data-value');
                    licount = $('.selectingArea').length;
                    //for (i = 1; i <= licount; i++) {
                    //    $(this).siblings().removeClass(sel + i);
                    //}
                    //$(this).addClass(sel + imagenumber);
                   // alert();
                    removeImgAttr();
                    $(this).addClass('selectedIndicator');
                    img = $('#selectedpoeDigdeep').val().replace("/", "") + imagenumber + "h";
                    $(this).find("img").attr("src", "../Images/icons/" + img + ".png");

                    var pa = $(this).attr("data-value");
                    pagination = $('#paLevel' + pa + '').find('.chartsmlplaceholder').attr("data-value");
                    if (pagination != "1") {
                       // alert('enter');
                        $(".prev,.nxt").hide();
                        $(".bn1").show();
                        $('.q1').show().css('opacity', '2');
                        $('.chartholder .q1').animate({ 'margin-left': '3.5%' }, { duration: 0 });
                        $('.chartholder .q2').css( 'margin-left','-0.3%');
                        $('.pagination').html("Page 1 of " + pagination + "");
                        $('#pagemax').val(pagination);
                    } else {
                        $('.q1').show();
                        $('.chartholder .q1').animate({ 'margin-left': '3.5%' }, { duration: 0 });
                        $('.chartholder .q1').css('opacity', 2);
                        $(".prev,.nxt").hide();
                        //$(".p1,.bn1").show();
                        $('#paslide1 .nmodule').show();
                        $('.pagination').html(" ");
                    }
                    $('.chartholder').hide();
                    $('#paLevel' + pa + '').show();
                    if(imagenumber!=1) {
                        $('#paslide1 .pmodule').show();
                    }
                    if ($('.selectingArea').last().attr('data-value') == imagenumber) {
                        //alert("in");
                        $('#paslide1 .nmodule').hide();
                    }
                    $('.q3').hide();
                });
            }
        });
    },
    loadPoeName: function () {
        Common.ajaxsync({
            url: "../../Common/GetPoeName",
            success: function (response) {
                $('#selectedpoeDigdeep').val(response);
            },
            error: function () {
            }
        });
    }
};

$(document).ready(function () {
    $('.clickdeeper').show();
    Common.setTopMenu(3);
    //LoadHtml();
    //$('.indexrightclose').live('click', function () {
    //    $(".indexrightclose, .indexclose").hide();
    //    $(".indexrightarrow ,.indexrightclose1").show();
    //    $(".modelcontent").animate({ left: "-100%" }, 500);
    //});
    //$('.indexclose').live('click', function () {
    //    $(this).hide();
    //    //$(".indexrightclose").show();
    //    //$(".indexrightclose1").hide();
    //    $(".indexrightclose").hide();
    //    $(".indexrightclose1").show();
    //    $(".indexright").animate({ right: "0" }, 500);
    //});
    //$('.indexrightclose1').live('click', function () {
    //    $(".indexrightclose, .indexrightclose1").hide();
    //    $(".indexclose").show();
    //    $(".indexright").animate({ right: "-33.5%" }, 500);
    //    $(".modelcontent").animate({ left: "0%" }, 500);
    //});
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/start-standing_h.png');
    $(document).click(function (event) {
        $('#eainfo').removeClass('selectStandBPInfo');
        if ($(event.target).parents().index($('.indexright')) == -1) {
            if ($('.indexright').is(":visible")) {
                $(".indexright").animate({ right: "-33.5%" }, 500);
                $(".indexclose").show();
                $(".modelcontent").animate({ left: "0" }, 500);
            }
        }
    });
    //$('.q2').hide();
    //$('.q3').hide();

    $('#paslide1 .bn1').click(function () {
        var pagemax = $('#pagemax').val();
        $('.pagination').html("Page 2 of " + pagemax + "");
        setTimeout(function () {
            $('.q2').show().css('opacity', '2');


        }, 200);
        $('.prev,.nxt').hide();

        $('#paslide1 .p2').show();
        if ($('#pagemax').val() > 2) {
            $('#paslide1 .bn2').show();
        } else {
            $('#paslide1 .nmodule').show();
        }
        $('.chartholder .q1').animate({ 'margin-left': '-37%' }, { duration: 1000 }).css('opacity', '0.4');
        setTimeout(function () {
            $('.chartholder .q3').show().animate({ 'margin-left': '-1.3%' }, { duration: 500 }).css('opacity', '0.4');
        }, 900);
        //$('.chartholder .q3').animate({ 'margin-left': '-1.3%' }, { duration: 1000 });


    });
    $('#paslide1 .nmodule').click(function () {
        $('.selectedIndicator').next('li').click();
        //$('.chartholder .q3').animate({ 'margin-left': '-1.3%' }, { duration: 1000 });


    });
    $('#paslide1 .pmodule').click(function () {
        $('.selectedIndicator').prev('li').click();
        //alert();
        var level = $('.selectedIndicator').attr('data-value');
        var pageLoad = $('#paLevel' + level).find('.chartslide').find('.slide').length;
        if (pageLoad == 2) {
            var pagemax = $('#pagemax').val();
            $('.pagination').html("Page 2 of " + pagemax + "");
            setTimeout(function () {
                $('.q2').show().css('opacity', '2');


            }, 200);
            $('.prev,.nxt').hide();

            $('#paslide1 .p2').show();
            if ($('#pagemax').val() > 2) {
                $('#paslide1 .bn2').show();
            } else {
                $('#paslide1 .nmodule').show();
            }
            $('.chartholder .q1').animate({ 'margin-left': '-37%' }, { duration: 0 }).css('opacity', '0.4');
            $('.chartholder .q3').show().animate({ 'margin-left': '-1.3%' }, { duration: 0 }).css('opacity', '0.4');
        }
        if (pageLoad == 3) {
            var pagemax = $('#pagemax').val();
            $('.pagination').html("Page 3 of " + pagemax + "");
            setTimeout(function () {
                $('.q3').show().css('opacity', '2');


            }, 200);
            $('.prev,.nxt').hide();

            $('#paslide1 .p3').show();
            if ($('#pagemax').val() > 2) {
                $('#paslide1 .bn2').show();
            } else {
                $('#paslide1 .nmodule').show();
            }
            $('.chartholder .q1').hide();
            $('.chartholder .q2').animate({ 'margin-left': '-37%' }, { duration: 0 }).css('opacity', '0.4');
            //$('.chartholder .q1').hide();
        }
       // alert();
        //$('.chartholder .q3').animate({ 'margin-left': '-1.3%' }, { duration: 1000 });


    });
    $('#paslide1 .p2').click(function () {
        $('.prev,.nxt').hide();
        // $('.q3').hide();
        $('.q2').show();
        var pagemax = $('#pagemax').val();
        $('.pagination').html("Page 1 of " + pagemax + "");
        //var pagemax = $('#pagemax').val();
        //if (parseInt(pagemax) > 2) {
        $('#paslide1 .bn1').show();
        $('.chartholder .q1').show();
        $('.chartholder .q3').hide();
        //$('.chartholder .q2').show();
        $('.chartholder .q1').animate({ 'margin-left': '99px' }, { duration: 1000 }).css('opacity', '2');
        $('.chartholder .q2').animate({ 'margin-left': '-0.3%' }, { duration: 1000 }).css('opacity', '0.4');
        if ($('.selectedIndicator').attr('data-value') != 1) {
            $('#paslide1 .pmodule').show();
        }
        setTimeout(function () {
            $(".q2").show();
            $(".q3").hide();
        }, 800);
        //$(".q2").show();
        //$(".q3").show();
        //}
    });
    $('#paslide1 .bn2').click(function () {
        var pagemax = $('#pagemax').val();
        if (parseInt(pagemax) > 2) {
            $('.pagination').html("Page 3 of " + pagemax + "");
            setTimeout(function () {
                $(".q3").show();
            }, 200);
            $('.prev,.nxt').hide();
            $('#paslide1 .p3,#paslide1 .nmodule').show();
            $('.chartholder .q2').animate({ 'margin-left': '-37%' }, { duration: 1000 }).css('opacity', '0.4');
            $('.chartholder .q3').animate({ 'margin-left': '-0.3%' }, { duration: 1000 }).css('opacity', '2');
            $('.chartholder .q1').animate({ 'margin-left': '-72%' }, { duration: 1000 }).css('opacity', '0.4');
        } else {
            $('#paslide1 .nmodule').show();
        }
    });
    $('#paslide1 .p3').click(function () {
        var pagemax = $('#pagemax').val();
        $('.pagination').html("Page 2 of " + pagemax + "");
        $('.prev,.nxt').hide();
        $('#paslide1 .p2').show();
        if ($('#pagemax').val() > 2) {
            $('#paslide1 .bn2').show();
        }
        $('.chartholder .q2').show("slow");
        $('.chartholder .q2').animate({ 'margin-left': '99px' }, { duration: 1000 }).css('opacity', '2');
        $('.chartholder .q3').animate({ 'margin-left': '-0.3%' }, { duration: 1000 }).css('opacity', '0.4');
        $('.chartholder .q1').animate({ 'margin-left': '-37%' }, { duration: 1000 }).css('opacity', '0.4');

        setTimeout(function () {
            $(".q3").show();
        }, 800);
    });

    $('#tilehead').click(function () {
        $('#tilesub').slideDown();
        $("#tilehead p").css('background-image', 'url(/Images/select-arrow-up.png)');
        if (!$(this).hasClass('selectablecont')) {
            $(this).addClass("selectablecont");
        } else {
            $("#tilesub").slideUp("slow");
            $("#tilehead p").css('background-image', 'url(/Images/select-arrow.gif)');
            $("#tilehead").removeClass('selectablecont');
        }
    });
    $('.legendwn').live('click', function () {
        $(this).removeClass("legendwn");
        $(this).parent().removeClass("clickedDropdown");
        $(this).parent().find('ul').slideUp();
    });
    $(document).click(function (event) {
        if (!$(event.target).parent().hasClass('legend')) {
            if ($('.chartholder .legenders').is(":visible")) {
                $(".chartholder .legenders ul").slideUp();
                $('.chartholder .legenders p').removeClass("legendwn");
            }
        } else {
            var visible = $(event.target).parent().find('ul:visible').length;
            if (visible == 0) {
                $(".chartholder .legenders ul").slideUp();
                $('.chartholder .legenders p').removeClass("legendwn");
                $(event.target).parent().find('ul').slideDown();
                $(event.target).parent().find('p').addClass("legendwn");
            } else {
                $(".chartholder .legenders ul").slideUp();
            }

            //
        }
    });
    $('.drplegend li').live('click', function () {
        $('.legendText').text($(this).text());
        var ctrl = $(this);
        $("#status,#preloader").delay(100).fadeIn("slow", function () {
            digdeeper.loaddigdeeper(parseInt(ctrl.val()));
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
        });
    });
    $('#tilesub li').click(function () {

        var data = $(this).attr('data-value');
        var ctrl = $(this);

        // $("#status,#preloader").delay(100).fadeIn("slow", function () {
        digdeeper.loaddigdeeper(parseInt(data));
        $("#tilehead p").text(ctrl.text());

        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
        //});
        //$('.chartholder .q2').show("slow");
        //$('.chartholder .q2').animate({ 'margin-left': '-16px' }, { duration: 1000 }).css('opacity', '2');
        $('.chartholder .q2').css('opacity', '0.4');
        $('.chartholder .q1').animate({ 'margin-left': '3.5%' }, { duration: 1000 });
    });
    $(document).click(function (event) {
        if ($(event.target).parents().index($('.excellenceTiles')) == -1) {
            if ($('#tilesub').is(":visible")) {
                $("#tilesub").slideUp("slow");
                $("#tilehead p").css('background-image', 'url(/Images/select-arrow.gif)');
                $("#tilehead").removeClass('selectablecont');
            }
        }
    });
    //ExcellenceIndicatorCont();
    digdeeper.loadPoeName();
    $('.pagination').hide();
    //$('#paslide1 .p1').show();
    $('#paslide1 .bn1').show();
    $('#paslide1 .pagination').show();
    $(".indexclose").show();
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $('.indexrightclose').live('click', function () {
        $(".indexrightclose, .indexclose").hide();
        $(".indexrightarrow ,.indexrightclose1").show();
        $(".modelcontent").animate({ left: "-100%" }, 500);
    });
    $('#pagetwo').click(function () {
        $(".indexrightclose, .indexclose").hide();
        $(".indexrightarrow ,.indexrightclose1").show();
        $(".modelcontent").animate({ left: "-100%" }, 500);
    });
    $('#pageoneval').click(function () {
        $(".indexrightclose").show();
        $(".indexrightclose1").hide();
        $(".modelcontent").animate({ left: "0%" }, 500);
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
    digdeeper.loaddigdeeper(1);
    var html = "<li><a href='/communitysync/communitysync'><span><img src='../../Images/icons/standing-small.png' /></span><p>Community Sync</p></a> </li>" +
        "<li><a href='/communitysync/Bigpicture'><span><img src='../../Images/icons/big-pic-small.png' /></span><p>Big Picture</p></a> </li>" +
        "<li><a href='/communitysync/PracticeAreas'><span><img src='../../Images/icons/digin-small.png' /></span> <p>Practice Areas</p></a> </li>" +
        "<li><a href='/communitysync/ExcellenceIndicators'><span><img src='../../Images/icons/dig-deeper-small.png' /></span><p>Excellence Actions</p></a> </li>";

    $('#target ul').html(html);
    //loadRightArrow(parseInt($('#controlclicked').val()));
    //function loadRightArrow(type) {
    //    switch (type) {
    //        case 1:
    //            var html1 = "<span><h1>Standing by Excellence Action</h1><p class='hlpcont'>" +
    //                        "Examine your Standing at the Excellence Action level. Navigate through each Practice Area and see how your Self Feedback for each Excellence Actions compares to other groups in your role community. Use the drop down menu at the top of the screen to changes views between Community, Team, Mentors, Tenure and Previous." +
    //                        "</p></span>";
    //            $('.hlprow').empty().html(html1);
    //            break;
    //        case 2:
    //            var html2 = "<span><h1>Standing by Excellence Actions</h1><p class='hlpcont'>" +
    //                        "Examine your Standing at the Excellence Action level. Navigate through each Practice Area and see how your Manager Feedback score for each Excellence Action compares to other groups in your role community. Use the drop down menu at the top of the screen to changes views between Community, Team, Mentors, Tenure and Previous." +
    //                        "</p></span>";
    //            $('.hlprow').empty().html(html2);
    //            break;
    //        case 3:
    //            var html3 = "<span><h1>Team Standing by Excellence Actions</h1><p class='hlpcont'>" +
    //                        "Examine your team's Standing at the Excellence Action level. Navigate through each Practice Area and see the average Feedback score you have given your team members compares to other groups in their role community. Use the drop down menu at the top of the screen to changes views between Community, Team, Mentors, Tenure and Previous." +
    //                        "</p></span>";
    //            $('.hlprow').empty().html(html3);
    //            break;
    //        case 4:
    //            var html4 = "<span><h1>Standing by Excellence Actions</h1><p class='hlpcont'>" +
    //                        "Examine your Standing at the Excellence Action level. Navigate through each Practice Area and see how your Manager Feedback score for each Excellence Action compares to other groups in your role community. Use the drop down menu at the top of the screen to changes views between Community, Team, Mentors, Tenure and Previous." +
    //                        "</p></span>";
    //            $('.hlprow').empty().html(html4);
    //            break;
    //        case 5:
    //            var html5 = "<span><h1>Standing by Excellence Actions</h1><p class='hlpcont'>" +
    //                        "Examine your Standing at the Excellence Action level. Navigate through each Practice Area and see how your Manager Feedback score for each Excellence Action compares to other groups in your role community. Use the drop down menu at the top of the screen to changes views between Community, Team, Mentors, Tenure and Previous." +
    //                        "</p></span>";
    //            $('.hlprow').empty().html(html5);
    //            break;
    //        case 6:
    //            var html6 = "<span><h1>Standing by Excellence Actions</h1><p class='hlpcont'>" +
    //                        "Examine your Standing at the Excellence Action level. Navigate through each Practice Area and see how your Manager Feedback score for each Excellence Action compares to other groups in your role community. Use the drop down menu at the top of the screen to changes views between Community, Team, Mentors, Tenure and Previous." +
    //                        "</p></span>";
    //            $('.hlprow').empty().html(html6);
    //            break;
    //        case 7:
    //            var html7 = "<span><h1>Team Standing by Excellence Actions</h1><p class='hlpcont'>" +
    //                        "Examine your team's Standing at the Excellence Action level. Navigate through each Practice Area and see the average Feedback score you have given your team members compares to other groups in their role community. Use the drop down menu at the top of the screen to changes views between Community, Team, Mentors, Tenure and Previous." +
    //                        "</p></span>";
    //            $('.hlprow').empty().html(html7);
    //            break;
    //        default:
    //            break;
    //    }
    //}


    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
    $('#pa1').click();
    $('#example-2 a').click(function () {
        var ctrl = $(this);
        $(this).addClass('selectStandBPInfo');
    });

});
function LoadHtml(youscore, tilescore, palevel, mode, loadQuestion, maxweightage) {
   // debugger;
    var numberOfSlide = Math.ceil(loadQuestion.length / 4);
    var commhtml = " <div class='chartslide'>";
    var dummyhtml = "";
    var margins = "";
    var count = 0;
    var sclass = "";
    var yourscorePercentage = 0;
    var tilescorePercentage = 0;
    var yourscoreWeightingScore = 0;
    var tilescoreWeightingScore = 0;
    var perQuestionWeightage = 0;
    var legendText = "";
    switch (mode) {
        case 1:
            legendText = "Community";
            break;
        case 2:
            legendText = "Area Team";
            break;
        case 3:
            legendText = "Mentors";
            break;
        case 4:
            legendText = "Tenure";
            break;
        case 5:
            legendText = "Previous";
            break;
        case 6:
            legendText = "Tenure";
            break;
        case 7:
            legendText = "Tenure";
            break;
        default:
    }
    for (var k = 0; k < numberOfSlide; k++) {
        var slideClass = "<div class='slide q" + (k + 1) + "'>";
        commhtml = commhtml + slideClass;

        var twoClass = " <div class='coltwo'>";
        for (var j = k; j < (k + 2) ; j++) {
            commhtml = commhtml + twoClass;

            for (var i = j; i < (j + 2) ; i++) {
                perQuestionWeightage = ((maxweightage / loadQuestion.length) / 4).toFixed(1);
                if (count < loadQuestion.length) {
                    if (i == 0) {
                        count = i;
                    }
                    if (tilescore.length > 0) {
                       // debugger;
                        //yourscorePercentage = youscore[count].ScorePercentage;
                        tilescorePercentage = tilescore[count].ScorePercentage;
                        //yourscoreWeightingScore = (youscore[count].ScorePercentage / 25) * perQuestionWeightage;
                        tilescoreWeightingScore = (tilescore[count].ScorePercentage / 25) * perQuestionWeightage;
                    }
                    if (youscore.length > 0) {
                      //  debugger;
                        yourscorePercentage = youscore[count].ScorePercentage;
                        yourscoreWeightingScore = (youscore[count].ScorePercentage / 25) * perQuestionWeightage;
                    }
                    if (yourscorePercentage == tilescorePercentage) {
                        margins = "margin-left:6%;margin-top:-3%;z-index:4";
                    } else {
                        margins = "";
                    }
                    var calc = 0;
                    if ($('#controlclicked').val() != 3 && $('#controlclicked').val() != 6) {
                        calc = parseFloat(tilescoreWeightingScore) - parseFloat(yourscoreWeightingScore);
                    } else {
                        calc = parseFloat(yourscoreWeightingScore) - parseFloat(tilescoreWeightingScore);
                    }
                    if (calc < 0) {
                        sclass = "dwnstatus";
                        calc = (-1) * calc;
                    } else if (calc > 0) {
                        sclass = "status";
                    } else {
                        sclass = "midstatus";
                    }
                    if (parseFloat(tilescoreWeightingScore) == 0) {
                        tilescoreWeightingScore = "";
                    } else {
                        tilescoreWeightingScore = tilescoreWeightingScore.toFixed(1);
                    }
                    if (parseFloat(yourscoreWeightingScore) == 0) {
                        yourscoreWeightingScore = "";
                    } else {
                        yourscoreWeightingScore = yourscoreWeightingScore.toFixed(1);
                    }

                    //<ul class='scale paAr1' id='Toppa1Level'> <li class='scale1' id='Toppa1Level1'>25%</li> <li class='scale2' id='Toppa1Level2'>50%</li> <li class='scale3' id='Toppa1Level3'>75%</li>" +
                    // <li class='scale4' id='Toppa1Level4'>100%</li> <li></li> </ul>
                    if (mode != 4 && mode != 6 && mode != 7) {

                        commhtml = commhtml + "<div class='chartsmlplaceholder pa1' data-value=" + numberOfSlide + "><div class='eqscon'><div class='EiQno'>" + (count + 1) + "</div><div class='EiQtext'>" + loadQuestion[count].ShortQuetionText + "</div></div> <div class='chartdiv' id=''>" +
                            "  <div class='legend'> <ul> <li class='legend1'>You</li> <li class='legend2'>" + legendText + "</li> </ul> </div><div class='chart'> <div class='chartop'></div> <div class='chartbg'> <div class='chartarea'> <ul> <li class='progressbar1' style='width: " + yourscorePercentage + "%;' id='Toppa1Pro1'> " +
                            " </li> <li class='progressbar2' style='width: " + tilescorePercentage + "%;' id='Toppa1Pro2'>  </li> </ul> </div> </div> <div class='chartbtm'> <div class='markerholder'>" +
                            " <ul> <li class='markergray' style='display:none; width:" + tilescorePercentage + "%;" + margins + "' id='Toppa1Mar2'> <p></p> </li> <li class='markeramper' style='display:none; width: " + yourscorePercentage + "%;' id='Toppa1Mar1'> <p></p> </li> </ul> </div> " +
                            "</div> </div> <div class='pointer'></div> <div class='" + sclass + "' id='Toppa1'></div> </div> </div>";
                    } else {
                        commhtml = commhtml + "<div class='chartsmlplaceholder pa1' data-value=" + numberOfSlide + "> <div class='eqscon'><div class='EiQno'>" + (count + 1) + "</div><div class='EiQtext'>" + loadQuestion[count].ShortQuetionText + "</div></div> <div class='chartdiv' id=''>" +
                           " <div class='legend'> <ul> <li class='legend1'>You</li> <li class='legend2all'> <div id='legendAll'> <div class='legend legenders legenddropdown'> <p class='legendText'>0 - 12 Months</p> <ul class='drplegend'> <li value='4'>0 - 12 Months</li> <li  value='6'>13 - 24 Months</li> <li  value='7'>25+ Months</li>  </ul> </div> " +
                            "</div></li> </ul> </div><div class='chart'> <div class='chartop'></div> <div class='chartbg'> <div class='chartarea'> <ul> <li class='progressbar1' style='width: " + yourscorePercentage + "%;' id='Toppa1Pro1'> " +
                           " </li> <li class='progressbar2' style='width: " + tilescorePercentage + "%;' id='Toppa1Pro2'>  </li> </ul> </div> </div> <div class='chartbtm'> <div class='markerholder'>" +
                           " <ul> <li class='markergray' style='display:none; width:" + tilescorePercentage + "%;" + margins + "' id='Toppa1Mar2'> <p></p> </li> <li class='markeramper' style='display:none; width: " + yourscorePercentage + "%;' id='Toppa1Mar1'> <p></p> </li> </ul> </div> " +
                           "</div>  </div> <div class='pointer'></div> <div class='" + sclass + "' id='Toppa1'></div> </div> </div>";
                    }
                } else {
                    commhtml = commhtml + "<div class='chartsmlplaceholder'><div class='eqscon'><div class='EiQno elqnodummy'>&nbsp;</div><div class='EiQtext'>&nbsp;</div></div> " +
                        "<div class='chartdiv dummychartdiv'></div></div>";
                }
                count++;
                tilescoreWeightingScore = 0;
                yourscoreWeightingScore = 0;
            }
            commhtml = commhtml + "</div>";
        }
        commhtml = commhtml + "</div>";
    }
    debugger;
    margins = "";
    commhtml = commhtml + "</div>";
    $('#paLevel' + palevel + '').html("" + commhtml);

    if (palevel == "1") {
        $('#pagemax').val(numberOfSlide);
    }
    if (mode == 6) {
        $('.legendText').text("13 - 24 Months");
    }
    if (mode == 7) {
        $('.legendText').text("25+ Months");
    }
    GetBreadCrumbAndName();
}

function ExcellenceIndicatorCont() {
    Common.ajaxsync({
        url: '/Standing/GetPoeContent',
        success: function (response) {
            var totrarely = 0;
            var totInconsistenly = 0;
            var totFrequently = 0;
            var totAlways = 0;
            var total = 0;

            var html = "<tr> <td colspan='3' class='desctablepoe'> <h1> " + response.Modules[0].PoeName + "</h1> </td> </tr> <tr> <th> Practice Area </th> <th> Rarely </th> <th> In-Consistently </th> <th> Frequently </th> <th> Always </th> </tr><tr><td colspan='5'><div class='scroll2'><table id='diginstandingPoeContentScroll'><tr><td>";
            for (var i = 0; i < response.Modules.length; i++) {
                totrarely = totrarely + response.Modules[i].WeightageScores.Rarely;
                totInconsistenly = totInconsistenly + response.Modules[i].WeightageScores.Inconsistenly;
                totFrequently = totFrequently + response.Modules[i].WeightageScores.Frequently;
                totAlways = totAlways + response.Modules[i].WeightageScores.Always;
                html = html + "<tr> <td>" + response.Modules[i].Modulename + "</td> <td>" + response.Modules[i].WeightageScores.Rarely + "</td> <td>" + response.Modules[i].WeightageScores.Inconsistenly + "</td><td>" + response.Modules[i].WeightageScores.Frequently + "</td><td>" + response.Modules[i].WeightageScores.Always + "</td> </tr>";
            }
            html = html + "</td></tr></table></div></td></tr><tr> <th> Total </th> <th>25</th> <th>50</th> <th>75 </th> <th>100</th> </tr>";
            $('#diginstandingPoeContent').html(html);
            $('.scroll2').slimScroll();
            if (response.Modules.length <= 5) {
                $('#diginstandingPoeContentScroll').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
            } else {
                $('#diginstandingPoeContentScroll').parents('.slimScrollDiv').find('.slimScrollBar').hide();
            }
        }
    });
}
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
            var breadCrumb = '<a href="../Common/Index">Home</a> > <a href="../communitysync/communitysync">Community Sync</a> > ' + bvalue + ' > Excellence Actions';
            $('.breadcrumbEI').html(breadCrumb);
            $('.legend1').text(lvalue);
            $('#controlclicked').val(response);
        },
        error: function () {
        }
    });
}
function loadRightArrowUpdated(type, drpSelect) {
    switch (type) {
        case 1:
            if (drpSelect == 1) {
                $('#selfHeader').html("Community - <span>Your Self Feedback score compared with the average Self Feedback score of your role community</span>");
            } else if (drpSelect == 2) {
                $('#selfHeader').html("Area Team - <span>Your Self Feedback score compared with the average Self Feedback score of your team</span>");
            } else if (drpSelect == 3) {
                $('#selfHeader').html("Mentors - <span>Your Self Feedback score compared with the average Self Feedback score of others in your role community who stand within 20% of the goal</span>");
            } else if (drpSelect == 4) {
                $('#selfHeader').html("Tenure Group - <span>Your Self Feedback score compared with the average Self Feedback score of various tenure groups in your role community</span>");
            }
            else if (drpSelect == 5) {
                $('#selfHeader').html("Previous - <span>Your Self Feedback score compared with your previous Self Feedback score</span>");
            }
            break;
        case 2:
            if (drpSelect == 1) {
                $('#selfHeader').html("Community - <span>Your Manager Feedback score compared with the average Manager Feedback score of your role community</span>");
            } else if (drpSelect == 2) {
                $('#selfHeader').html("Area Team - <span>Your Manager Feedback score compared with the average Manager Feedback score of your team</span>");
            } else if (drpSelect == 3) {
                $('#selfHeader').html("Mentors - <span>Your score compared with the average score of others in the role community with scores within 20% of the goal</span>");
            } else if (drpSelect == 4) {
                $('#selfHeader').html("Tenure Group - <span>Your Manager Feedback score compared with the average Manager Feedback score of various tenure groups in your role community</span>");
            }
            else if (drpSelect == 5) {
                $('#selfHeader').html("Previous - <span>Your Manager Feedback score compared with your previous Manager Feedback score</span>");
            }
            break;
        case 3:
            if (drpSelect == 1) {
                $('#selfHeader').html("Community - <span>The average Feedback score you have given your team members compared with the average Manager Feedback score of your team's role community</span>");
            } else if (drpSelect == 2) {
                $('#selfHeader').html("Area Team - <span>The average Feedback score you have given your team members compared with the average Manager Feedback score of your team's team</span>");
            } else if (drpSelect == 3) {
                $('#selfHeader').html("Mentors - <span>The average Feedback score you have given your team members compared with the average Manager Feedback score of others in their role community who stand within 20% of the goal</span>");
            } else if (drpSelect == 4) {
                $('#selfHeader').html("Tenure Group - <span>The average Feedback score you have given your team members compared with the average Manager Feedback score of various tenure groups in their role community</span>");
            }
            else if (drpSelect == 5) {
                $('#selfHeader').html("Previous - <span>Your Manager Feedback score compared with the average Manager Feedback score of various tenure groups in your role community</span>");
            }
            break;
        case 4:
            if (drpSelect == 1) {
                $('#selfHeader').html("Community - <span>Your Manager Feedback score compared with the average Manager Feedback score of your role community</span>");
            } else if (drpSelect == 2) {
                $('#selfHeader').html("Area Team - <span>Your Manager Feedback score compared with the average Manager Feedback score of your team</span>");
            } else if (drpSelect == 3) {
                $('#selfHeader').html("Mentors - <span>Your score compared with the average score of others in the role community with scores within 20% of the goal</span>");
            } else if (drpSelect == 4) {
                $('#selfHeader').html("Tenure Group - <span>Your Manager Feedback score compared with the average Manager Feedback score of various tenure groups in your role community</span>");
            }
            else if (drpSelect == 5) {
                $('#selfHeader').html("Previous - <span>Your Manager Feedback score compared with your previous Manager Feedback score</span>");
            }
            break;
        case 5:
            if (drpSelect == 1) {
                $('#selfHeader').html("Community - <span>Your Manager Feedback score compared with the average Manager Feedback score of your role community</span>");
            } else if (drpSelect == 2) {
                $('#selfHeader').html("Area Team - <span>Your Manager Feedback score compared with the average Manager Feedback score of your team</span>");
            } else if (drpSelect == 3) {
                $('#selfHeader').html("Mentors - <span>Your score compared with the average score of others in the role community with scores within 20% of the goal</span>");
            } else if (drpSelect == 4) {
                $('#selfHeader').html("Tenure Group - <span>Your Manager Feedback score compared with the average Manager Feedback score of various tenure groups in your role community</span>");
            }
            else if (drpSelect == 5) {
                $('#selfHeader').html("Previous - <span>Your Manager Feedback score compared with your previous Manager Feedback score</span>");
            }
            break;
        case 6:
            if (drpSelect == 1) {
                $('#selfHeader').html("Community - <span>Your Manager Feedback score compared with the average Manager Feedback score of your role community</span>");
            } else if (drpSelect == 2) {
                $('#selfHeader').html("Area Team - <span>Your Manager Feedback score compared with the average Manager Feedback score of your team</span>");
            } else if (drpSelect == 3) {
                $('#selfHeader').html("Mentors - <span>Your score compared with the average score of others in the role community with scores within 20% of the goal</span>");
            } else if (drpSelect == 4) {
                $('#selfHeader').html("Tenure Group - <span>Your Manager Feedback score compared with the average Manager Feedback score of various tenure groups in your role community</span>");
            }
            else if (drpSelect == 5) {
                $('#selfHeader').html("Previous - <span>Your Manager Feedback score compared with your previous Manager Feedback score</span>");
            }
            break;
        case 7:
            if (drpSelect == 1) {
                $('#selfHeader').html("Community - <span>The average Feedback score you have given your team members compared with the average Manager Feedback score of your team's role community</span>");
            } else if (drpSelect == 2) {
                $('#selfHeader').html("Area Team - <span>The average Feedback score you have given your team members compared with the average Manager Feedback score of your team's team</span>");
            } else if (drpSelect == 3) {
                $('#selfHeader').html("Mentors - <span>The average Feedback score you have given your team members compared with the average Manager Feedback score of others in their role community who stand within 20% of the goal</span>");
            } else if (drpSelect == 4) {
                $('#selfHeader').html("Tenure Group - <span>The average Feedback score you have given your team members compared with the average Manager Feedback score of various tenure groups in their role community</span>");
            }
            else if (drpSelect == 5) {
                $('#selfHeader').html("Previous - <span>Your Manager Feedback score compared with the average Manager Feedback score of various tenure groups in your role community</span>");
            }
            break;
        default:
            break;
    }
}

function removeImgAttr() {
    var count = 1;
    $('#stndmenu li').each(function () {
        var img = $('#selectedpoeDigdeep').val().replace("/", "") + count;
        $(this).find("img").attr("src", "../Images/icons/" + img + ".png");
        $(this).removeClass('selectedIndicator');
        count++;
    });
   
}
function removeImgAttrHover() {
    var count = 1;
    $('#stndmenu li').each(function() {
        var img = $('#selectedpoeDigdeep').val().replace("/","") + count;
        if (!$(this).hasClass('selectedIndicator')) {
            $(this).find("img").attr("src", "../Images/icons/" + img + ".png");
        }
        //$(this).removeClass('selectedIndicator');
        count++;
    });
}
