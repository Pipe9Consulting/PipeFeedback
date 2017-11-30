$(document).ready(function () {
    $('.clickdeeper').show();
    Common.setTopMenu(5);
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/result_Icon_h.png');
    excellenceactions.loadPoeName({ url: '../../Result/GetPoeName' });
    excellenceactions.loadModuleIds({ url: '../../Result/GetPracticeArea' });
    excellenceactions.loadearesult(0);
    var showCompletedtTile = $('#hidCompletedTile').val();
    if (showCompletedtTile != 0) {
        $('.completedTile').show();
    } else {
        $('.completedTile').hide();
    }
    $('.completedTile').click(function () {
        window.location = "/Feedback/completedFeedback";
        //winswindow.location.redire
    });
    $('#userList li').hover(
      function () {
          removeAttrHovers();
          $(this).find('img').attr("src", "../Images/icons/BigpictureIcon" + $(this).attr("id").replace("usrli", "") + "Selected" + ".png");
          $(this).addClass('moduleHove');
      }, function () {
          // alert('123')
          removeAttrHovers();
          $('#userList>li.selected').find('img').attr("src", "../Images/icons/BigpictureIcon" + $('#userList>li.selected').attr("id").replace("usrli", "") + "Selected" + ".png");
          $(this).removeClass('moduleHove');
      });
    $('#userList li').click(function () {
        var ctrl = $(this);

        var selectedMethod = $(this).index();
        excellenceactions.loadearesult(selectedMethod);
        ctrl.addClass('selected');
        ctrl.siblings().removeClass('selected');
        $('#userList li').each(function () {
            $(this).find('img').attr('src', '../../Images/icons/BigpictureIcon' + $(this).index() + '.png');
        });
        ctrl.find('img').attr('src', '../../Images/icons/BigpictureIcon' + $(this).index() + 'Selected.png');

        //$('.poemodule').each(function () {
        //    var imgname = $(this).attr('data-imgname');
        //    $(this).find('img').attr('src', '../../Images/icons/' + imgname + '.png');
        //});


        //var paImg = $('#poemodule .selected').find('img').attr('src');

        //$('.poemodule:first').find('img').attr('src', '' + paImg + '');
        //$('.poemodule').removeClass('selected');
        //$('.poemodule:first').addClass('selected');




        $('.slidebtn').show();
        $('.prev,.nxt').hide();
        $('#p1,#bn1').show();

        var tabValue = $('.poemodule.selected').data('moduleorder');


        var totalSlides = $('#paLevel' + tabValue + '').find('.chart').length;
        if (totalSlides != 1) {
            excellenceactions.onLoad(2, totalSlides, tabValue);
        }
        else {
            $('#p1,#bn1').hide();
        }

    });

    $('.poemodule').click(function () {
      //debugger;
        $('#charttitle_top').html($(this).find('p').html());
        selectedModule = $(this).attr('data-moduleorder');
       
        $('.chartdiv').hide();
        $('#paLevel' + selectedModule).show();
        $('.slidebtn').show();
        $('.prev,.nxt').hide();
        $('#p1,#bn1').show();

        var totalSlides = $('#paLevel' + selectedModule).find('.chart').length;
        if (totalSlides != 1) {
            excellenceactions.onLoad(2, totalSlides, selectedModule);
        }
        else {
            $('#p1,#bn1').hide();
        }
        //alert(totalSlides);
        SliderLoad(totalSlides);
        //debugger;
        var ctrl = $(this);
        var selectedimgname = $(this).attr('data-imgname');
        ctrl.addClass('selected');
        ctrl.siblings().removeClass('selected');
        $('.poemodule').each(function () {
            var imgname = $(this).attr('data-imgname');
          //  alert($(this).find('p').length);
            $(this).find('p').css('color', '#ffffff');
            $(this).find('img').attr('src', '../../Images/icons/' + imgname + '.png');
        });
        removeAttrHovers();
        //alert(totalSlides);
        ctrl.find('img').attr('src', '../../Images/icons/' + selectedimgname + 'h.png');
        if (totalSlides == 2 || totalSlides == 3 ||  totalSlides==7) {
            $('#nextModule').hide();
            $('#prevModule').show();
            $('#p2').hide();
            $('#p3').hide();
            $('#p1').hide();
            $('#p4').hide();
            $('#p5').hide();
            $('#p6').hide();
            $('#p7').hide();
            $('#bn2').hide();
            $('#bn3').hide();
            $('#bn1').show();
            $('#bn4').hide();
            $('#bn5').hide();
            $('#bn6').hide();
            $('#bn7').hide();
        } else {
            $('#nextModule').show();
        }
        if (selectedModule == 1) {
          //  alert(selectedModule);
            $('#prevModule').hide();
        }
       // alert($('#poemodule').not('.emptyTiles').find('li:last-child').attr('data-moduleorder'));
       // alert($('#poemodule').find('li:last-child').not('.emptyTiles').attr('data-moduleorder'));
        if (selectedModule == $('#poemodule').find('li:last-child').attr('data-moduleorder')) {
            $('#nextModule').hide();
        }
       // alert();

    });

    $('.standBPInfo').click(function () {
        var ctrl = $(this);
        ctrl.addClass('selectstandBPInfo');
    });

    $('#usrli0').click();
    $('#li1').click();
    $('.slidebtn').show();
    $('.prev,.nxt').hide();
    $('#p1,#bn1').show();

    var totalSlides = $('#paLevel1').find('.chart').length;
    if (totalSlides != 1) {
        excellenceactions.onLoad(2, totalSlides, 1);
       
    }
    else {
        $('#nextModule').show();
        $('#p1,#bn1').hide();
    }


    var html = "<li><a href='/FeedbackResults/FeedbackResults'><span><img src='../../Images/Start/feedbackresults_small.png' /></span><p>Feedback Results</p></a> </li>" +
        "<li><a href='/FeedbackResults/BigPicture'><span><img src='../../Images/icons/big-pic-small.png' /></span><p>Big Picture</p></a> </li>" +
        "<li><a href='/FeedbackResults/PracticeAreas'><span><img src='../../Images/icons/digin-small.png' /></span><p>Practice Areas</p></a> </li>" +
        "<li><a href='/FeedbackResults/ExcellenceActions'><span><img src='../../Images/icons/dig-deeper-small.png' /></span><p>Excellence Actions</p></a> </li>";


    $('#target ul').html(html);

});

$(document).click(function (event) {
    $('.standBPInfo').removeClass('selectstandBPInfo');
});

var excellenceactions = {
    loadPoeName: function () {

        var poeid = $('#selectedPoeResults').val();

        Common.ajaxsync({
            url: "../../Result/GetPoeName",
            data: { 'poeid': poeid },
            success: function (response) {
                $('#selectedpoename').val(response);

            },
            error: function () {
            }
        });
    },

    loadModuleIds: function (option) {
        var moduleIds = new Array();
        Common.ajaxsync({
            url: option.url,
            success: function (response) {
                excellenceactions.loadQuickViewPAQuestions({ url: '../../Result/GetQuestions', response: response });

                $('#totalmodules').val(response.length);
            },
            error: function (err) {
            }
        });
    },

    loadQuickViewPAQuestions: function (option) {
        //debugger;

        var moduleresponse = option.response;
        var html = "";
        var slidehtml = '';
        var completedhtml = '<li class="feedbackcomplete"><h1>Feedback Completed</h1><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p><p><b>Billy Graham</b></p><input type="text" name="textbox"/><p><span>*Lorem Ipsum is simply dummy text</span></p><a onclick="self_feedback.submitfeedback();">Submit</a></li>';
        var questionids = "";
        var hideorshowSlimScroll = (moduleresponse.length - 1) > 6;
        var excellenceIndicatorCount = [];
        for (var m = 0; m < moduleresponse.length; m++) {
            if (moduleresponse[m].ModuleOrderNumber > 0) {
                var moduleid = moduleresponse[m].ModuleId;
                var poemodules = "";

                var practiceArea1 = (moduleresponse.length < 7 ? (7 - moduleresponse.length) : 0);
                for (var mt = 0; mt < moduleresponse.length; mt++) {
                    if (moduleresponse[mt].ModuleOrderNumber > 0) {
                        var image = $('#selectedpoename').val().replace("/", "");
                        var img = $('#selectedpoe').val().replace("/","") + moduleresponse[mt].ModuleOrderNumber;

                        // poemodules = poemodules + "<li id ='li" + moduleresponse[mt].ModuleOrderNumber + "' data-value=" + moduleresponse[mt].ModuleId + "' data-moduleorder=" + moduleresponse[mt].ModuleOrderNumber + "  class='takesf " + img + "Tile" + ((moduleresponse[mt].ModuleOrderNumber == 1) ? ' selected select' + img : '') + " limod" + moduleresponse[mt].ModuleOrderNumber + "'><p>" + moduleresponse[mt].ModuleName + "</p></li>";

                        poemodules = poemodules + "<li class='poemodule' id ='li" + moduleresponse[mt].ModuleOrderNumber + "' data-value='" + moduleresponse[mt].ModuleId + "' data-imgname='" + image + img + "' data-moduleorder='" + moduleresponse[mt].ModuleOrderNumber + "'>  <div class='icon " + img + "Tile" + ((moduleresponse[mt].ModuleOrderNumber == 1) ? ' select' + img : '') + " limod" + moduleresponse[mt].ModuleOrderNumber + "'><img src='../../Images/icons/" + image + img + ".png' alt=''></div><p>" + moduleresponse[mt].ModuleName + "</p></li>";
                    }
                }

                for (var pa1 = 0; pa1 < practiceArea1; pa1++) {
                    //poemodules = poemodules + "<li id ='li" + (moduleresponse.length + 1) + "' data-value=" + (moduleresponse.length + 1) + "' data-moduleorder=" + (moduleresponse.length + 1) + "  class='takesf emptyTile '><p></p> </li>";

                    poemodules = poemodules + "<li class='emptyTiles' id ='li" + (moduleresponse.length + 1) + "' data-value=" + (moduleresponse.length + 1) + "' data-moduleorder='" + (moduleresponse.length - 1) + "'><div class='icon emptyTile '><p></p> </div></li>";
                }

                poemodules = poemodules + "</ul>" + (hideorshowSlimScroll ? '</div>' : '') + "</div></div>";
                $('#poemodule').html(poemodules);

            }

        }

        if ((moduleresponse.length) <= 4) {
            $('#poemodule').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
        } else {
            $('#poemodule').parents('.slimScrollDiv').find('.slimScrollBar').hide();
            $('#poemodule').parents('.slimScrollDiv').find('.slimScrollBar').removeClass('dummy-slimscrollbar-backgound');
        }

        $('.scroll2').slimScroll();
    },

    loadearesult: function (selectedli) {
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

                    //img = $('#selectedpoeDigdeep').val() + (m + 1);
                    //imagename = $('#selectedpoeDigdeep').val();
                    //paHtml = paHtml + "<li id='pa" + (m + 1) + "' class='pa selectingArea " + img + "Tile' data-value=" + (m + 1) + "><div class='number syncnumber' id='PaVal" + (m + 1) + "'></div><p> " + response.PracticeAreaContent[m].ModuleName + " </p> </li>";
                    if (selectedli == 0) {
                        $('#charttitle_top').html('Results');
                        LoadHtml(response.You.ModuleScores[m].QuestionScores, response.Community.ModuleScores[m].QuestionScores, (m + 1), 0, response.PracticeAreaContent[m].Questions, response.You.ModuleScores[m].WeightageScore);
                        $('.chartdiv').hide();
                        var resultTab = $('.poemodule.selected').data('moduleorder');
                        $('#paLevel' + resultTab + '').show();
                    } else if (selectedli == 1) {
                        $('#charttitle_top').html('Progress');
                        LoadHtml(response.You.ModuleScores[m].QuestionScores, response.Previous.ModuleScores[m].QuestionScores, (m + 1), 1, response.PracticeAreaContent[m].Questions, response.You.ModuleScores[m].WeightageScore);
                        $('.chartdiv').hide();
                        var progressTab = $('.poemodule.selected').data('moduleorder');
                        $('#paLevel' + progressTab + '').show();
                    }
                }
                //debugger;
                //if (response.PracticeAreaContent.length < 8) {
                //    for (var i = response.PracticeAreaContent.length; i < 8; i++) {
                //        paHtml = paHtml + "<li class='dummytile'> <p>&nbsp;</p></li>";
                //    }
                //}
                //$('#stndmenu').html(paHtml);
                //var sel = 'select' + imagename + '';
                //debugger;
                //var firstimagenumber = $('#stndmenu li').first().attr('data-value');
                //$('#stndmenu li').first().addClass(sel + firstimagenumber);


                //$('.chartdiv').hide();
                //var progressTab = $('.poemodule.selected').data('moduleorder');
                //$('#paLevel' + progressTab + '').show();
                //var pagination = $('#paLevel1').find('.chartsmlplaceholder').attr("data-value");
                //if (pagination != "1") {
                //    $(".prev,.nxt").hide();
                //    $(".p1,.bn1").show();
                //    $('.pagination').html("Page 1 of " + pagination + "");
                //    $('#pagemax').val(pagination);
                //} else {
                //    $(".prev,.nxt").hide();
                //    $('.pagination').html(" ");
                //}
                //$('.scroll1').slimScroll();
                //if ($('#stndmenu li').length <= 8) {
                //    $('#stndmenu').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                //} else {
                //    $('#stndmenu').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                //}


                //$('.q2').hide();
                //LoadHtml(response.You.ModuleScores[9].QuestionScores, response.Community.ModuleScores[9].QuestionScores);
                //$('.q2').hide();
                //$('.q3').hide();
                //$('.chartholder').hide();


                //Implemented Select Class for Modules
                //$('.selectingArea').click(function () {
                //    debugger;
                //    $('.q3').hide();
                //    $('.q2').show().css('opacity', '0.4');
                //    imagenumber = $(this).attr('data-value');
                //    licount = $('.selectingArea').length;
                //    for (i = 1; i <= licount; i++) {
                //        $(this).siblings().removeClass(sel + i);
                //    }
                //    $(this).addClass(sel + imagenumber);

                //    var pa = $(this).attr("data-value");
                //    pagination = $('#paLevel' + pa + '').find('.chartsmlplaceholder').attr("data-value");
                //    if (pagination != "1") {
                //        $(".prev,.nxt").hide();
                //        $(".p1,.bn1").show();
                //        $('.q1').show().css('opacity', '2');
                //        $('.chartholder .q1').animate({ 'margin-left': '3.5%' }, { duration: 1000 });
                //        $('.pagination').html("Page 1 of " + pagination + "");
                //        $('#pagemax').val(pagination);
                //    } else {
                //        $('.q1').show();
                //        $('.chartholder .q1').animate({ 'margin-left': '3.5%' }, { duration: 1000 });
                //        $(".prev,.nxt").hide();
                //        //$(".p1,.bn1").show();
                //        $('.pagination').html(" ");
                //    }
                //    //$('.chartholder').hide();
                //    $('#paLevel' + pa + '').show();
                //});
            }
        });
    },

    onLoad: function (current, pages, selectedLevel) {
        //debugger;
        if (current != 1) {
           // alert(pages);
            var previousPage = (current - 1);
            $('.prev,.nxt').hide();
            $('#p' + previousPage + ',#bn' + previousPage).show();
            $('#paLevel' + selectedLevel).find("#q" + previousPage).show("slow");
            $('#paLevel' + selectedLevel).find('#q' + previousPage).animate({ 'margin-left': '13%' }, { duration: 0 });
            $('#paLevel' + selectedLevel).find('#q' + previousPage).css('opacity', '2');
           
            //$('#q' + pages).animate({ 'margin-left': '-3%' }, { duration: 1000 });
            if (previousPage == 1 && pages==3) {
                $('#paLevel' + selectedLevel).find("#q" + (pages-1)).animate({ 'margin-left': '82%' }, { duration: 0 });
                $('#paLevel' + selectedLevel).find("#q" + (pages - 1)).show().css('position', 'absolute');
                $('#paLevel' + selectedLevel).find("#q" + (pages - 1)).show().css('width', '63%');
                $('#paLevel' + selectedLevel).find("#q" + (pages - 1)).show().css('opacity', '0.4');
                $('#pagetxt').html(' Page ' + previousPage + ' of ' + pages);
            } else {
                if (pages == 7) {
                    $('#paLevel' + selectedLevel).find("#q2").animate({ 'margin-left': '82%' }, { duration: 0 });
                    $('#paLevel' + selectedLevel).find("#q2").show().css('position', 'absolute');
                    $('#paLevel' + selectedLevel).find("#q2").show().css('width', '63%');
                    $('#paLevel' + selectedLevel).find("#q2").show().css('opacity', '0.4');
                    $('#pagetxt').html(' Page ' + previousPage + ' of ' + pages);
                } else {
                    $('#paLevel' + selectedLevel).find("#q" + pages).animate({ 'margin-left': '82%' }, { duration: 0 });
                    $('#paLevel' + selectedLevel).find("#q" + pages).show().css('position', 'absolute');
                    $('#paLevel' + selectedLevel).find("#q" + pages).show().css('width', '63%');
                    $('#paLevel' + selectedLevel).find("#q" + pages).show().css('opacity', '0.4');
                    $('#pagetxt').html(' Page ' + previousPage + ' of ' + pages);
                }
               
            }

            $('#paLevel' + selectedLevel).find("#q3,#q4,#q5,#q6,#q7,#q8").hide();
            setTimeout(function () {
                $('#paLevel' + selectedLevel).find("#q" + current).show();
               
            }, 1000);
            if (current == 2) {
                $("#p1").hide();
            }
        }
    },

    PreviewEI: function (current, pages) {
        //debugger;
        selectedSlide = $('.chartdiv').filter(function () {
            return $(this).css('display') == 'block';
        });
        selectedLevel = selectedSlide.attr('id');

        if (current != 1) {
            var previousPage = (current - 1);
            $('.prev,.nxt').hide();
            $('#p' + previousPage + ',#bn' + previousPage).show();
            $('#' + selectedLevel).find("#q" + previousPage).show();
            $('#' + selectedLevel).find('#q' + previousPage).animate({ 'margin-left': '13%' }, { duration: 1000 });
            $('#' + selectedLevel).find('#q' + previousPage).css('opacity', '2');
            //$('#q' + pages).animate({ 'margin-left': '-3%' }, { duration: 1000 });
            if (current == 2 && pages == 3) {
                $('#' + selectedLevel).find("#q" + pages).hide()
                $('#' + selectedLevel).find("#q" + current).animate({ 'margin-left': '82%' }, { duration: 1000 });
                $('#' + selectedLevel).find("#q" + current).show().css('position', 'absolute');
                $('#' + selectedLevel).find("#q" + current).show().css('width', '63%');
                $('#' + selectedLevel).find("#q" + current).show().css('opacity', '0.4');
            } else if (pages == 7) {
                $('#' + selectedLevel).find("#q" + pages).hide()
                $('#' + selectedLevel).find("#q" + current).animate({ 'margin-left': '82%' }, { duration: 1000 });
                $('#' + selectedLevel).find("#q" + current).show().css('position', 'absolute');
                $('#' + selectedLevel).find("#q" + current).show().css('width', '63%');
                $('#' + selectedLevel).find("#q" + current).show().css('opacity', '0.4');
                
                setTimeout(function () {
                    $('#' + selectedLevel).find("#q" + (current +1)).hide();
                }, 800);
            } else {
                $('#' + selectedLevel).find("#q" + pages).animate({ 'margin-left': '82%' }, { duration: 1000 });
                $('#' + selectedLevel).find("#q" + pages).show().css('position', 'absolute');
                $('#' + selectedLevel).find("#q" + pages).show().css('width', '63%');
                $('#' + selectedLevel).find("#q" + pages).show().css('opacity', '0.4');
            }
            
            $('#pagetxt').html(' Page ' + previousPage + ' of ' + pages);
            setTimeout(function () {
                $('#' + selectedLevel).find("#q" + current).show();
            }, 1000);
            if (current == 2) {
                $("#p1").hide();
            }
        }
        // alert($('.poemodule.selected').attr('data-moduleorder'));
        if ($('.poemodule.selected').attr('data-moduleorder') != 1) {
            $('#prevModule').show();
        } else {
            $('#prevModule').hide();
        }
        
    },
    NextEI: function (current, page) {
        //debugger;
        selectedSlide = $('.chartdiv').filter(function () {
            return $(this).css('display') == 'block';
        });
        selectedLevel = selectedSlide.attr('id');

        if (current < page) {
            var nextPage = (current + 1);
            var firstPage = (current - 1);
            var secondPage = (page - current);
            $('.prev,.nxt').hide();
            $('#p' + nextPage + ',#bn' + nextPage).show();
            $('#' + selectedLevel).find("#q3").hide();
            $('#' + selectedLevel).find("#q" + nextPage).show();
            $('#' + selectedLevel).find("#q" + current).animate({ 'margin-left': '-59%' }, { duration: 1000 });
            $('#' + selectedLevel).find("#q" + current).show().css('opacity', '0.4');
            $('#' + selectedLevel).find("#q" + nextPage).animate({ 'margin-left': '15%' }, { duration: 1000 });
            $('#' + selectedLevel).find("#q" + nextPage).show().css('opacity', '2');
            if (current == 1) {
                setTimeout(function () {
                    $('#' + selectedLevel).find("#q3").show().css('opacity', '0.4');
                    $('#' + selectedLevel).find("#q3").show().css('position', 'absolute');
                    $('#' + selectedLevel).find("#q3").show().css('width', '63%');
                    $('#' + selectedLevel).find("#q3").css({ 'margin-left': '85%' });

                }, 1000);
                
            }
            if (current == 2) {
                setTimeout(function () {
                    $('#' + selectedLevel).find("#q4").show().css('opacity', '0.4');
                    $('#' + selectedLevel).find("#q4").show().css('position', 'absolute');
                    $('#' + selectedLevel).find("#q4").show().css('width', '63%');
                    $('#' + selectedLevel).find("#q4").css({ 'margin-left': '85%' });

                }, 1000);

            }
            if (current == 3) {
                setTimeout(function () {
                    $('#' + selectedLevel).find("#q5").show().css('opacity', '0.4');
                    $('#' + selectedLevel).find("#q5").show().css('position', 'absolute');
                    $('#' + selectedLevel).find("#q5").show().css('width', '63%');
                    $('#' + selectedLevel).find("#q5").css({ 'margin-left': '85%' });

                }, 1000);

            }
            if (current == 4) {
                setTimeout(function () {
                    $('#' + selectedLevel).find("#q6").show().css('opacity', '0.4');
                    $('#' + selectedLevel).find("#q6").show().css('position', 'absolute');
                    $('#' + selectedLevel).find("#q6").show().css('width', '63%');
                    $('#' + selectedLevel).find("#q6").css({ 'margin-left': '85%' });

                }, 1000);

            }
            if (current == 5) {
                setTimeout(function () {
                    $('#' + selectedLevel).find("#q7").show().css('opacity', '0.4');
                    $('#' + selectedLevel).find("#q7").show().css('position', 'absolute');
                    $('#' + selectedLevel).find("#q7").show().css('width', '63%');
                    $('#' + selectedLevel).find("#q7").css({ 'margin-left': '85%' });

                }, 1000);

            }
            if (current == 6) {
                setTimeout(function () {
                    $('#' + selectedLevel).find("#q8").show().css('opacity', '0.4');
                    $('#' + selectedLevel).find("#q8").show().css('position', 'absolute');
                    $('#' + selectedLevel).find("#q8").show().css('width', '63%');
                    $('#' + selectedLevel).find("#q8").css({ 'margin-left': '85%' });

                }, 1000);

            }
            if (firstPage != 0)
                $('#' + selectedLevel).find("#q" + firstPage).animate({ 'margin-left': '-73%' }, { duration: 1000 });

            $('#pagetxt').html(' Page ' + nextPage + ' of ' + page);
        }
        if (current == 1 && page==2) {
            $('#nextModule').show();
        }
        if (current == 1 && page == 3) {
            $('#nextModule').hide();
            $('#bn2').show();
        }
        if (current == 2 && page == 3) {
            $('#nextModule').show();
            //$('#bn2').show();
        }
        if (current == 6 && page == 7) {
            $('#nextModule').show();
            //$('#bn2').show();
        }
        if ($('#poemodule').find('li:last-child').attr('data-moduleorder') == $('#poemodule').find('.selected').attr('data-moduleorder')) {
            $('#nextModule').hide();
        }
        
        if (page == nextPage)
            $('#bn' + nextPage).hide();
    },
    NextModule: function () {
        $('.poemodule').each(function (event) {
            $(this).removeClass('moduleHove');
            if ($(this).hasClass('selected')) {
                $(this).next('li').click();
                event.stopPropagation();
            }
        });

        //find("").next('li').click();
        //debugger;

    },
    PrevModule: function () {
        $('.poemodule').each(function (event) {
            $(this).removeClass('moduleHove');
            if ($(this).hasClass('selected')) {
                $(this).prev('li').click();
                event.stopPropagation();
            }
        });
        $('#p3').hide();
        //find("").next('li').click();
        //debugger;

    },
    LoadSliderbtn: function (numberOfSlide) {
        //alert(numberOfSlide);
        var prevNavHtml = "";
        var nxtNavHtml = "";
        var o = 0;
        var m = 0;
        var newquestionScore = (4 * numberOfSlide);
        var totalNoofPages = (numberOfSlide > 1 ? "<div class='pagination' id='pagetxt'>Page 1 of " + numberOfSlide + "</div>" : "");

        for (; o < newquestionScore ; o++) {
            var questionId = o + 1;
            if (o == 0) {
                m++;

                if (newquestionScore > 5) {
                    prevNavHtml = prevNavHtml + "<a href='#' class='prev' id='p" + m + "' onclick='excellenceactions.PreviewEI(" + m + "," + numberOfSlide + ")'>Previous</a>";
                    nxtNavHtml = nxtNavHtml + "<a href='#' class='nxt' id='bn" + m + "' onclick='excellenceactions.NextEI(" + m + "," + numberOfSlide + ")'>Next</a>";
                }
            }
            else if ((o % 5) == 0) {
                m++;

                if (newquestionScore > 5) {
                    prevNavHtml = prevNavHtml + "<a href='#' class='prev' id='p" + m + "' onclick='excellenceactions.PreviewEI(" + m + "," + numberOfSlide + ")'>Previous</a>";
                    nxtNavHtml = nxtNavHtml + "<a href='#' class='nxt' id='bn" + m + "' onclick='excellenceactions.NextEI(" + m + "," + numberOfSlide + ")'>Next</a>";
                }
            }
        }
        var prevmoduleHTML = "<a href='#' class='prev' id='prevModule' onclick='excellenceactions.PrevModule()'>Previous</a>";
        var nextmoduleHtml = "<a href='#' class='nxt' id='nextModule' onclick='excellenceactions.NextModule()'>Next</a>";
        //debugger;
        if (newquestionScore <= 5) {
            //$('.slidebtn').html(prevmoduleHTML + nextHtml);
            $('.slidebtn').hide();
            $('.slidebtn').empty().html((prevmoduleHTML + totalNoofPages + nextmoduleHtml));
        }
        else {
            $('.slidebtn').show();
            $('.slidebtn').empty().html((prevmoduleHTML + prevNavHtml + totalNoofPages + nxtNavHtml + nextmoduleHtml));
        }

    }
};

function LoadHtml(youscore, tilescore, palevel, mode, loadQuestion, maxweightage) {
    //debugger;
    var numberOfSlide = Math.ceil(loadQuestion.length / 5);
    var commhtml = "<div class='chartslide'>";
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
    var firstcount = 0;
    //$('#numberOfSlide').val(numberOfSlide);





    //switch (mode) {
    //    case 1:
    //        legendText = "Community";
    //        break;
    //    case 2:
    //        legendText = "Area Team";
    //        break;
    //    case 3:
    //        legendText = "Pathfinders";
    //        break;
    //    case 4:
    //        legendText = "Tenure";
    //        break;
    //    case 5:
    //        legendText = "Previous";
    //        break;
    //    case 6:
    //        legendText = "Tenure";
    //        break;
    //    case 7:
    //        legendText = "Tenure";
    //        break;
    //    default:
    //}
    //for (var k = 0; k < numberOfSlide  ; k++) {
    //    var slideClass = "<div class='slide q" + (k + 1) + "'>";
    //    commhtml = commhtml + slideClass;
    
    var twoClass = "<div class='chart' id=slide>" +
                                    "<div class='chartop'>" +
                                    "</div>" +
                                    "<div class='chartbg'>" +
                                        "<div class='chartarea'>" +
                                            "<ul>";
    if (loadQuestion.length == 9 || loadQuestion.length == 10 || loadQuestion.length == 32 || loadQuestion.length == 11 || loadQuestion.length == 12 || loadQuestion.length == 5 || loadQuestion.length == 4 || loadQuestion.length == 3 || loadQuestion.length == 2 || loadQuestion.length == 1) {
       
        for (var j = 0; j < numberOfSlide ; j++) {
            //commhtml = commhtml + twoClass;
           

            commhtml = commhtml + "<div class='chart' id='q" + (j + 1) + "'>" +
                                        "<div class='chartop'>" +
                                        "</div>" +
                                        "<div class='chartbg'>" +
                                            "<div class='chartarea'>" +
                                                "<ul>";


            for (var i = j; i < (j + 5) ; i++) {
                perQuestionWeightage = ((maxweightage / loadQuestion.length) / 4).toFixed(1);
                if (count < loadQuestion.length) {


                    if (i == 0) {
                        count = i;
                    }
                    var questionCont = loadQuestion[count].ShortQuetionText;
                    var currentPoe = parseInt($('#currentpoe').val());
                    if (currentPoe == 34) {
                        var splitQuestion = loadQuestion[count].ShortQuetionText.split(',');
                        //alert(response.TScore.ModuleScores[moduleid].QuestionScores[i].ShortQuetionText);
                        var feature = splitQuestion[0].replace('Feature:', '');
                        var component = splitQuestion[1].replace('Component:', '');
                        questionCont = "<span class='qntitle'>" + feature + ":</span><span class='qnsubtitle'>" + component + "</span>";
                    }
                    if (tilescore.length > 0) {
                        //yourscorePercentage = youscore[count].ScorePercentage;
                        tilescorePercentage = tilescore[count].ScorePercentage;
                        //yourscoreWeightingScore = (youscore[count].ScorePercentage / 25) * perQuestionWeightage;
                        tilescoreWeightingScore = (tilescore[count].ScorePercentage / 25) * perQuestionWeightage;
                    }
                    if (youscore.length > 0) {
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
                    if (mode != 1) {

                        //commhtml = commhtml + "<div class='chartsmlplaceholder pa1' data-value=" + numberOfSlide + "><div class='EiQno'>" + (count + 1) + "</div><div class='EiQtext'>" + loadQuestion[count].ShortQuetionText + "</div> <div class='chartdiv' id=''>" +
                        //    "  <div class='legend'> <ul> <li class='legend1'>You</li> <li class='legend2'>" + legendText + "</li> </ul> </div><div class='chart'> <div class='chartop'></div> <div class='chartbg'> <div class='chartarea'> <ul> <li class='progressbar1' style='width: " + yourscorePercentage + "%;' id='Toppa1Pro1'> " +
                        //    " </li> <li class='progressbar2' style='width: " + tilescorePercentage + "%;' id='Toppa1Pro2'>  </li> </ul> </div> </div> <div class='chartbtm'> <div class='markerholder'>" +
                        //    " <ul> <li class='markergray' style='display:none; width:" + tilescorePercentage + "%;" + margins + "' id='Toppa1Mar2'> <p></p> </li> <li class='markeramper' style='display:none; width: " + yourscorePercentage + "%;' id='Toppa1Mar1'> <p></p> </li> </ul> </div> " +
                        //    "</div> </div> <div class='pointer'></div> <div class='" + sclass + "' id='Toppa1'></div> </div> </div>";



                        commhtml = commhtml + "<li class='resultsQn'>  <span> " + (count + 1) + " </span> " + questionCont + " </li>" +
                                                    "<li class='chartYelloResults' style='width:" + yourscorePercentage + "%;'>" +
                                                        "<p> " + yourscorePercentage + "% </p>" +
                                                    "</li>";
                    } else {
                        //commhtml = commhtml + "<div class='chartsmlplaceholder pa1' data-value=" + numberOfSlide + "> <div class='EiQno'>" + (count + 1) + "</div><div class='EiQtext'>" + loadQuestion[count].ShortQuetionText + "</div> <div class='chartdiv' id=''>" +
                        //   " <div class='legend'> <ul> <li class='legend1'>You</li> <li class='legend2all'> <div id='legendAll'> <div class='legend legenders legenddropdown'> <p class='legendText'>0 - 12 Months</p> <ul class='drplegend'> <li value='4'>0 - 12 Months</li> <li  value='6'>13 - 36 Months</li> <li  value='7'>36+ Months</li>  </ul> </div> " +
                        //    "</div></li> </ul> </div><div class='chart'> <div class='chartop'></div> <div class='chartbg'> <div class='chartarea'> <ul> <li class='progressbar1' style='width: " + yourscorePercentage + "%;' id='Toppa1Pro1'> " +
                        //   " </li> <li class='progressbar2' style='width:"+tilescorePercentage+"%;' id='Toppa1Pro2'>  </li> </ul> </div> </div> <div class='chartbtm'> <div class='markerholder'>" +
                        //   " <ul> <li class='markergray' style='display:none; width:" + tilescorePercentage + "%;" + margins + "' id='Toppa1Mar2'> <p></p> </li> <li class='markeramper' style='display:none; width: " + yourscorePercentage + "%;' id='Toppa1Mar1'> <p></p> </li> </ul> </div> " +
                        //   "</div>  </div> <div class='pointer'></div> <div class='" + sclass + "' id='Toppa1'></div> </div> </div>";




                        commhtml = commhtml + "<li class='resultsQn'><span> " + (count + 1) + " </span> " + questionCont + " </li>" +
                                                "<li class='chartYelloProgress' style='width:" + yourscorePercentage + "%;'> " +
                                                    "<p class='smallFont'> " + yourscorePercentage + "% </p>" +
                                                "</li>" +
                                                "<li class='chartGrayProgress' style='width:" + tilescorePercentage + "%;'>" +
                                                    "<p class='smallFont'> " + tilescorePercentage + "% </p>" +
                                                "</li>"
                    }
                    //} else {
                    //    commhtml = commhtml + "<div class='chartsmlplaceholder'><div class='EiQno elqnodummy'>&nbsp;</div><div class='EiQtext'>&nbsp;</div> " +
                    //        "<div class='chartdiv dummychartdiv'></div></div>";
                    //}
                    count++;
                    tilescoreWeightingScore = 0;
                    yourscoreWeightingScore = 0;
                }
                commhtml = commhtml;
            }
            commhtml = commhtml + "</ul>" +
                                    "</div>" +
                                        "</div>" +
                                        "<div class='chartbtm'>" +
                                        "</div><div class='charttitle' id='chartLoc'></div>" +
                                    "</div>";
        }
        //debugger;



    }



    if (loadQuestion.length == 6 || loadQuestion.length == 7 || loadQuestion.length == 8) {
        for (var j = 0; j < numberOfSlide ; j++) {
            //commhtml = commhtml + twoClass;


            commhtml = commhtml + "<div class='chart' id='q" + (j + 1) + "'>" +
                                        "<div class='chartop'>" +
                                        "</div>" +
                                        "<div class='chartbg'>" +
                                            "<div class='chartarea'>" +
                                                "<ul>";


            for (var i = j; i < (j + 4) ; i++) {

                perQuestionWeightage = ((maxweightage / loadQuestion.length) / 4).toFixed(1);
                if (count < loadQuestion.length) {
                    if (i == 0) {
                        count = i;
                    }
                    if (tilescore.length > 0) {
                        //yourscorePercentage = youscore[count].ScorePercentage;
                        tilescorePercentage = tilescore[count].ScorePercentage;
                        //yourscoreWeightingScore = (youscore[count].ScorePercentage / 25) * perQuestionWeightage;
                        tilescoreWeightingScore = (tilescore[count].ScorePercentage / 25) * perQuestionWeightage;
                    }
                    if (youscore.length > 0) {
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
                    if (mode != 1) {

                        //commhtml = commhtml + "<div class='chartsmlplaceholder pa1' data-value=" + numberOfSlide + "><div class='EiQno'>" + (count + 1) + "</div><div class='EiQtext'>" + loadQuestion[count].ShortQuetionText + "</div> <div class='chartdiv' id=''>" +
                        //    "  <div class='legend'> <ul> <li class='legend1'>You</li> <li class='legend2'>" + legendText + "</li> </ul> </div><div class='chart'> <div class='chartop'></div> <div class='chartbg'> <div class='chartarea'> <ul> <li class='progressbar1' style='width: " + yourscorePercentage + "%;' id='Toppa1Pro1'> " +
                        //    " </li> <li class='progressbar2' style='width: " + tilescorePercentage + "%;' id='Toppa1Pro2'>  </li> </ul> </div> </div> <div class='chartbtm'> <div class='markerholder'>" +
                        //    " <ul> <li class='markergray' style='display:none; width:" + tilescorePercentage + "%;" + margins + "' id='Toppa1Mar2'> <p></p> </li> <li class='markeramper' style='display:none; width: " + yourscorePercentage + "%;' id='Toppa1Mar1'> <p></p> </li> </ul> </div> " +
                        //    "</div> </div> <div class='pointer'></div> <div class='" + sclass + "' id='Toppa1'></div> </div> </div>";



                        commhtml = commhtml + "<li class='resultsQn'>  <span> " + (count + 1) + " </span> " + questionCont + " </li>" +
                                                    "<li class='chartYelloResults' style='width:" + yourscorePercentage + "%;'>" +
                                                        "<p> " + yourscorePercentage + "% </p>" +
                                                    "</li>";
                    } else {
                        //commhtml = commhtml + "<div class='chartsmlplaceholder pa1' data-value=" + numberOfSlide + "> <div class='EiQno'>" + (count + 1) + "</div><div class='EiQtext'>" + loadQuestion[count].ShortQuetionText + "</div> <div class='chartdiv' id=''>" +
                        //   " <div class='legend'> <ul> <li class='legend1'>You</li> <li class='legend2all'> <div id='legendAll'> <div class='legend legenders legenddropdown'> <p class='legendText'>0 - 12 Months</p> <ul class='drplegend'> <li value='4'>0 - 12 Months</li> <li  value='6'>13 - 36 Months</li> <li  value='7'>36+ Months</li>  </ul> </div> " +
                        //    "</div></li> </ul> </div><div class='chart'> <div class='chartop'></div> <div class='chartbg'> <div class='chartarea'> <ul> <li class='progressbar1' style='width: " + yourscorePercentage + "%;' id='Toppa1Pro1'> " +
                        //   " </li> <li class='progressbar2' style='width:"+tilescorePercentage+"%;' id='Toppa1Pro2'>  </li> </ul> </div> </div> <div class='chartbtm'> <div class='markerholder'>" +
                        //   " <ul> <li class='markergray' style='display:none; width:" + tilescorePercentage + "%;" + margins + "' id='Toppa1Mar2'> <p></p> </li> <li class='markeramper' style='display:none; width: " + yourscorePercentage + "%;' id='Toppa1Mar1'> <p></p> </li> </ul> </div> " +
                        //   "</div>  </div> <div class='pointer'></div> <div class='" + sclass + "' id='Toppa1'></div> </div> </div>";




                        commhtml = commhtml + "<li class='resultsQn'><span> " + (count + 1) + " </span> " + questionCont + " </li>" +
                                                "<li class='chartYelloProgress' style='width:" + yourscorePercentage + "%;'> " +
                                                    "<p class='smallFont'> " + yourscorePercentage + "% </p>" +
                                                "</li>" +
                                                "<li class='chartGrayProgress' style='width:" + tilescorePercentage + "%;'>" +
                                                    "<p class='smallFont'> " + tilescorePercentage + "% </p>" +
                                                "</li>"
                    }
                    //} else {
                    //    commhtml = commhtml + "<div class='chartsmlplaceholder'><div class='EiQno elqnodummy'>&nbsp;</div><div class='EiQtext'>&nbsp;</div> " +
                    //        "<div class='chartdiv dummychartdiv'></div></div>";
                    //}
                    count++;
                    tilescoreWeightingScore = 0;
                    yourscoreWeightingScore = 0;
                }
                commhtml = commhtml;
            }
            commhtml = commhtml + "</ul>" +
                                    "</div>" +
                                        "</div>" +
                                        "<div class='chartbtm'>" +
                                        "</div><div class='charttitle' id='chartLoc'></div>" +
                                    "</div>";
        }
        //debugger;



    }








    margins = "";
    commhtml = commhtml;
    $('#paLevel' + palevel + '').html(commhtml);


    $('.chartdiv').each(function () {
        var id = $(this).attr('id');

        //var length = $('#' + id + ' li').length;

        var innerId = $('#' + id + '> div > div').attr('id');

        var innerLiLength = $('#' + id + '> div > div#' + innerId + ' li').length;
        //alert(innerLiLength);
        var q2length = $('#' + id + '> div > div#q2 li').length;

        //alert(innerLiLength);

        if (innerLiLength == 8) {

            //$('#' + id + '> div > div#' + innerId + ' ul').css('padding-top', '5%');
            $('#' + id + '> div > div#q1 ul').css('padding-top', '5%');
            $('#' + id + '> div > div#q2 ul').css('padding-top', '12%');

        }
       
        if (innerLiLength == 12) {

            //$('#' + id + '> div > div#' + innerId + ' ul').css('padding-top', '5%');
            $('#' + id + '> div > div#q1 ul').css('padding-top', '5%');
            $('#' + id + '> div > div#q2 ul').css('padding-top', '12%');

        }



        //if (innerLiLength == 10) {
        //    $('#' + id + '> div > div#q2 ul').css('padding-top', '5%');

        //}

        if (q2length == 8) {

            $('#' + id + '> div > div#q2 ul').css('padding-top', '5%');

        }
      //  alert(q2length);
        if (q2length == 12) {
           

            $('#' + id + '> div > div#q2 ul').css('padding-top', '5%');

        }
        
        if (q2length == 6) {

            $('#' + id + '> div > div#q2 ul').css('padding-top', '16%');

        }
        if (innerLiLength == 6) {

            //$('#' + id + '> div > div#' + innerId + ' ul').css('padding-top', '5%');
            $('#' + id + '> div > div#q1 ul').css('padding-top', '12%');
           // $('#' + id + '> div > div#q2 ul').css('padding-top', '12%');
            // $('#' + id + '> div > div#q2 ul').css('padding-top', '12%');

        }
        if (innerLiLength == 9) {

            $('#' + id + '> div > div#q1 ul').css('padding-top', '12%');

        }

    });
    // alert(count);
    //debugger;
    //if (firstcount == 0) {
    //    SliderLoad(numberOfSlide);
    //    firstcount++;
    //}
    //if (loadQuestion.length == 8) {

    //    $('#paLevel1 #q1 ul').css('padding-top', '5%');
    //    $('#paLevel1 #q2 ul').css('padding-top', '5%');
    //}

    //if (loadQuestion.length == 6) {

    //    $('#paLevel1 #q1 ul').css('padding-top', '5%');
    //    $('#paLevel1 #q2 ul').css('padding-top', '5%');
    //}




    var questionCount = loadQuestion.length;
    var prevNavHtml = "";
    var nxtNavHtml = "";

    //var o = 0;
    //var m = 0;
    //var newquestionScore = (4 * numberOfSlide)
    //var totalNoofPages = (numberOfSlide > 1 ? "<div class='pagination' id='pagetxt'>Page 1 of " + numberOfSlide + "</div>" : "");

    //for (; o < newquestionScore ; o++) {
    //    var questionId = o + 1;
    //    if (o == 0) {
    //        m++;

    //        if (newquestionScore > 5) {
    //            prevNavHtml = prevNavHtml + "<a href='#' class='prev' id='p" + m + "' onclick='excellenceactions.PreviewEI(" + m + "," + numberOfSlide + ")'>Previous</a>";
    //            nxtNavHtml = nxtNavHtml + "<a href='#' class='nxt' id='bn" + m + "' onclick='excellenceactions.NextEI(" + m + "," + numberOfSlide + ")'>Next</a>";
    //        }
    //    }
    //    else if ((o % 5) == 0) {
    //        m++;

    //        if (newquestionScore > 5) {
    //            prevNavHtml = prevNavHtml + "<a href='#' class='prev' id='p" + m + "' onclick='excellenceactions.PreviewEI(" + m + "," + numberOfSlide + ")'>Previous</a>";
    //            nxtNavHtml = nxtNavHtml + "<a href='#' class='nxt' id='bn" + m + "' onclick='excellenceactions.NextEI(" + m + "," + numberOfSlide + ")'>Next</a>";
    //        }
    //    }
    //}
    //var prevmoduleHTML = "<a href='#' class='prev' id='prevModule' onclick='excellenceactions.NextModule()'>Previous</a>";
    //var nextmoduleHtml = "<a href='#' class='nxt' id='nextModule' onclick='excellenceactions.NextModule()'>Next</a>";
    //debugger;
    //if (newquestionScore <= 5) {
    //    //$('.slidebtn').html(prevmoduleHTML + nextHtml);
    //    $('.slidebtn').hide();
    //    $('.slidebtn').empty().html((prevmoduleHTML + totalNoofPages + nextmoduleHtml));
    //}
    //else {
    //    $('.slidebtn').show();
    //    $('.slidebtn').empty().html((prevmoduleHTML + prevNavHtml + totalNoofPages + nxtNavHtml + nextmoduleHtml));
    //}
    //if (newquestionScore <= 5) {
    //    $('.slidebtn').hide();
    //}
    //else {
    //    $('.slidebtn').show();
    //    $('.slidebtn').empty().html((prevNavHtml + totalNoofPages + nxtNavHtml));
    //}




    //$('#paLevel1').html(commhtml);

    //if (palevel == "1") {
    //    $('#pagemax').val(numberOfSlide);
    //}
    //if (mode == 6) {
    //    $('.legendText').text("13 - 36 Months");
    //}
    //if (mode == 7) {
    //    $('.legendText').text("36+ Months");
    //}
    GetBreadCrumbAndName();
    //}
    $('#poemodule li').hover(
     function () {
         removeAttrHover();
         $(this).find('img').attr("src", "../../Images/icons/" + $('#selectedpoename').val().replace("/","") + (parseInt($(this).attr("data-moduleorder"))) + "h" + ".png");
         $(this).addClass('moduleHove');
     }, function () {
         // alert('123')
         removeAttrHover();
         $('#poemodule>li.selected').find('img').attr("src", "../../Images/icons/" + $('#selectedpoename').val().replace("/", "") + (parseInt($('#poemodule>li.selected').attr("data-moduleorder"))) + "h" + ".png");
         $('#poemodule>li.selected').addClass('moduleHove');
     });
    $('#userList li').click(function () {
        var ctrl = $(this);
        $('.poemodule.selected').click();
        if (ctrl.attr('id') == 'usrli0') {
            // alert(ctrl.attr('id'))
            $('.legendTenure').hide();
            $('.charttitle').html("");
        } else {
            $('.legendTenure').show();
            $('.charttitle').html("");
        }
    });
}

function SliderLoad(numberOfSlide) {
   // debugger;
    var prevNavHtml = "";
    var nxtNavHtml = "";
    var o = 0;
    var m = 0;
    var newquestionScore = (4 * numberOfSlide);
    var totalNoofPages = (numberOfSlide > 1 ? "<div class='pagination' id='pagetxt'>Page 1 of " + numberOfSlide + "</div>" : "");
   // alert(numberOfSlide);
    for (; o < newquestionScore ; o++) {
        var questionId = o + 1;
        if (o == 0) {
            m++;

            if (newquestionScore > 5) {
                prevNavHtml = prevNavHtml + "<a href='#' class='prev' id='p" + m + "' onclick='excellenceactions.PreviewEI(" + m + "," + numberOfSlide + ")'>Previous</a>";
                nxtNavHtml = nxtNavHtml + "<a href='#' class='nxt' id='bn" + m + "' onclick='excellenceactions.NextEI(" + m + "," + numberOfSlide + ")'>Next</a>";
            }
        }
        else if ((o % 5) == 0) {
            m++;

            if (newquestionScore > 5) {
                prevNavHtml = prevNavHtml + "<a href='#' class='prev' id='p" + m + "' onclick='excellenceactions.PreviewEI(" + m + "," + numberOfSlide + ")'>Previous</a>";
                nxtNavHtml = nxtNavHtml + "<a href='#' class='nxt' id='bn" + m + "' onclick='excellenceactions.NextEI(" + m + "," + numberOfSlide + ")'>Next</a>";
            }
        }
    }
    var prevmoduleHTML = "<a href='#' class='prev' id='prevModule' onclick='excellenceactions.PrevModule()'>Previous</a>";
    var nextmoduleHtml = "<a href='#' class='nxt' id='nextModule' onclick='excellenceactions.NextModule()'>Next</a>";
    //debugger;
    //alert(newquestionScore);
    if (numberOfSlide == 7) {
        prevNavHtml = prevNavHtml + "<a href='#' class='prev' id='p7' onclick='excellenceactions.PreviewEI(7,7)'>Previous</a>";
    }
    if (newquestionScore <= 5) {
        //$('.slidebtn').html(prevmoduleHTML + nextHtml);
       // $('.slidebtn').hide();
        $('.slidebtn').empty().html((prevmoduleHTML + totalNoofPages + nextmoduleHtml));
    }
    else {
        $('.slidebtn').show();
        $('.slidebtn').empty().html((prevmoduleHTML + prevNavHtml + totalNoofPages + nxtNavHtml + nextmoduleHtml));
    }
}

function GetBreadCrumbAndName() {
    Common.ajaxsync({
        url: '/Result/GetClicked',
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
            var breadCrumb = '<a href="../Common/Index"> Home </a> >  <a href="../FeedbackResults/FeedbackResults"> Feedback Results </a> > ' + bvalue + ' > Excellence Actions';
            $('.breadcrumbEI').html(breadCrumb);
            // $('.legend1').text(lvalue);
            $('#controlclicked').val(response);
        },
        error: function () {
        }
    });
}
function removeAttrHover() {
    var count = 1;
    $('#poemodule li').each(function () {
        if (!$(this).hasClass('selected')) {
            $(this).find('img').attr("src", "../../Images/icons/" + $('#selectedpoename').val().replace("/", "") + count + ".png");
            $(this).removeClass("moduleHove");
        }
        count++;
    });
}
function removeAttrHovers() {
    var count = 0;
    $('#userList li').each(function () {
        if (!$(this).hasClass('selected')) {
            $(this).find('img').attr("src", "../Images/icons/BigpictureIcon" + count + ".png");
            $(this).find('p').css('color', '#ffffff');
            $(this).removeClass('moduleHove');
        }
        count++;
    });
}