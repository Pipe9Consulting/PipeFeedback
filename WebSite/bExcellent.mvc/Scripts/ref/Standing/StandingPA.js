var showfirstarrow = 0;
var showsecondarrow = 0;
var openorclose = 0;
var openorcloseSnap2 = 0;

$(function () {
    $('.clickModels').click(function () {
        $('#left').show();
        $(".slideout").animate({ left: '-19%' }, { queue: false, duration: 500 });
        $('#clickmodele2hide').hide();
        $('#clickmodele1hide').hide();
        $('#clickmodele3hide').hide();
        $('#clickmodele4hide').hide();
        $('#clickmodele2,#clickmodele1,#snap2,#snap3,#snap4').hide();
        openorclose = 0;
    });
    (function ($) {
        $.fn.autowidth = function () {
            return this.each(function () {
                $('.fbholder ul', this).css({ 'width': (100 / $('.', this).length) + '%' });
            });
        };
    })(jQuery);
    $('.fbholder > ul').autowidth();
    $(document).click(function (event) {
        if ($(event.target).parents().index($('.slideout')) == -1) {
            // debugger;
            //if ($('#tilesub').is(":visible")) {
            if ($(event.target).parents().index($('.vs-context-menu')) == -1) {
                if ($(event.target)[0].className != "nonselecteds") {
                    //debugger;
                    if ($(event.target).parents().index($('.snaps')) == -1) {
                        //$('.standingNav5').removeClass("selected");
                        //$('.standingNav4').removeClass("selected");
                        //$('.standingNav3').removeClass("selected");
                        //$('.standingNav2').removeClass("selected");
                        //$('.standingNav1').addClass("selected");
                        $('#left').show();
                        $(".slideout").animate({ left: '-19%' }, { queue: false, duration: 500 });
                        $('#clickmodele2hide').hide();
                        $('#clickmodele1hide').hide();
                        $('#clickmodele3hide').hide();
                        $('#clickmodele4hide').hide();
                        $('#clickmodele2,#clickmodele1,#snap2,#snap3,#snap4').hide();
                        openorclose = 0;
                    }
                }
            }
            //$('#clickmodele2,#clickmodele1,#snap2,#snap3').hide();
            //$(".slideout1").animate({ right: '-24%' }, { queue: false, duration: 500 });

            //}
        }
    });
    $(document).click(function (event) {
        if ($(event.target).parents().index($('.slideout1')) == -1) {
            if ($(event.target)[0].className != "nonselecteds") {
                //debugger;
                //$('.standingNav5').removeClass("selected");
                //$('.standingNav4').removeClass("selected");
                //$('.standingNav3').removeClass("selected");
                //$('.standingNav2').removeClass("selected");
                //$('.standingNav1').addClass("selected");
                if (!$(event.target).parents().hasClass('slideout') && !$(event.target).parents().hasClass('content2')) {
                    $('#left').show();
                    $('#clickmodele2hide').hide();
                    $('#clickmodele1hide').hide();
                    $('#clickmodele3hide').hide();
                    $('#clickmodele4hide').hide();
                    $('#clickmodele2,#clickmodele1,#snap2,#snap3,#snap4').hide();

                    $(".slideout1").animate({ right: '-24%' }, { queue: false, duration: 500 });
                    openorcloseSnap2 = 0;
                }
            }

            //}
        }
    });

    $("#right").click(function () {
        //$('#coaching').hide();
        if (openorcloseSnap2 == 0) {
            $('.slideout1').animate({ right: '0px' }, { queue: false, duration: 500 });

            openorcloseSnap2 = 1;
            $('.scroll5').slimScroll({ height: '400px !important' });
        } else {
            $('.slideout1').animate({ right: '-24%' }, { queue: false, duration: 500 });

            openorcloseSnap2 = 0;
        }
    });
    /*Snap View Toggle*/
    $('#left').click(function () {
        // alert(openorclose);
        if (openorclose == 1) {
            $(".slideout").animate({ left: '-19%' }, { queue: false, duration: 500 });

            $('#clickmodele2hide').hide();
            $('#clickmodele1hide').hide();
            $('#clickmodele2').hide();
            $('#clickmodele1').hide();
            openorclose = 0;
            return;
        }
        if (openorclose == 0) {
            $('.standingNav5').removeClass("selected");
            $('.standingNav4').removeClass("selected");
            $('.standingNav3').removeClass("selected");
            $('.standingNav2').removeClass("selected");
            $('.standingNav1').addClass("selected");

            $(".slideout").animate({ left: '0px' }, { queue: false, duration: 500 });

            $('#clickmodele1hide').hide();
            $('#clickmodele2hide').hide();
            $('#clickmodele3hide').hide();
            $('#clickmodele4hide').hide();

            var newContent1 = '<div class="content2" id="modulecontent">' + $('#moduleintro0').html() + '</div>';
            $('#clickmodele2,#clickmodele1,#snap2,#snap3,#snap4').hide();
            $('.standingNav5').removeClass("selected");
            $('.standingNav4').removeClass("selected");
            if ($('#moduleintroslidecount').html() > 0) {
                showfirstarrow = 1;
                $('#left').hide();
                $('#snap2').html($('#moduleintro1').html());
                $('#snap2').show("slow");
                $('#clickmodele2hide').show("slow");
            }
            if ($('#moduleintroslidecount').html() == 3) {
                showsecondarrow = 1;
                $('#snap3').html($('#moduleintro2').html());
                $('#snap3').show("slow");
                $('#clickmodele2hide').hide();
                $('#clickmodele3hide').show("slow");
            }
            // alert(newContent1);
            ////////////////
            var $ajaxcontent = $('#ajax-content'),
            animDur = 500, // animation duration
            isTransitionRunning = false;
            var contentWidth = $ajaxcontent.width(),
            $newItem = $(document.createElement('div')), // nested container for new content
            newItemHeight,
            newContentHeight,
            $oldItem = $ajaxcontent.children('.item-container');
            isTransitionRunning = true;

            $newItem.addClass('item-container');

            $('html, body').animate('slow');
            //  $navlinks.removeClass('selected');
            //$(this).addClass('selected');
            $ajaxcontent.height($ajaxcontent.height());
            $ajaxcontent.css('overflow', 'hidden');
            if ($oldItem.length) {
                $oldItem
                .width(contentWidth)
                .css('position', 'absolute')
                .animate({
                    left: -contentWidth // move new content at the right edge of container
                },
                animDur,
                function () {
                    $oldItem.remove();
                });
            }

            // append new content to container
            $newItem.html(newContent1);
            $ajaxcontent.append($newItem);
            // fix new content width
            $newItem.width(contentWidth);
            // determine height of new content when it's appended to DOM
            newItemHeight = $newItem.height();

            // set up new content
            $newItem
            // move it to the right
            .css('position', 'absolute')
            .css('left', $ajaxcontent.width() + 'px')
            // sliding animation
            .animate({
                left: 0
            },
            animDur,
            function () {
                // restore css
                $newItem.css('position', 'static');
                $newItem.css('width', 'auto');
            });

            // change ajax container height
            $ajaxcontent.animate({
                height: newItemHeight
            },
        animDur,
        function () {
            // now let ajax container naturally wrap around its content
            $ajaxcontent.css('height', 'auto');
            $ajaxcontent.css('overflow', 'auto');

            // unset the transition running flag
            isTransitionRunning = false;
        });
            ///////////////
            $('#poeintrodiv').html($(newContent1).html());

            if ($('#poeintroslidecount').html() > 0) {
                showfirstarrow = 1;
                $('#snap2').html($('#poeintro1').html());
            }

            if ($('#poeintroslidecount').html() > 1) {
                showsecondarrow = 1;
                $('#snap3').html($('#poeintro2').html());
            }
            //alert(showfirstarrow);
            if (showfirstarrow == 1)
                //$('#clickmodele1').show("slow");
                openorclose = 1;
            return;
        }
    });

    ///
    $('.standingNav1, .standingNav1 img').hover(function () {
        $('.trait').show();
    });
    $('.standingNav1').mouseout(function () {
        $('.trait').hide();
    });

    $('.standingNav2, .standingNav2 img').hover(function () {
        $('.FI').show();
    });
    $('.standingNav2').mouseout(function () {
        $('.FI').hide();
    });
    $('.standingNav3, .standingNav3 img').hover(function () {
        $('.MI').show();
    });
    $('.standingNav3').mouseout(function () {
        $('.MI').hide();
    });
    $('.standingNav4, .standingNav4 img').hover(function () {
        $('.kact').show();
    });
    $('.standingNav4').mouseout(function () {
        $('.kact').hide();
    });
    $('.standingNav5, .standingNav5 img').hover(function () {
        $('.det').show();
    });
    $('.standingNav5').mouseout(function () {
        $('.det').hide();
    });
    $('#wrapper').mouseover(function () {
        $('#target').hide("fast");
    });
});
function hidingul() {
    $('#clickmodele1,#fbh2,#fbh3,#fbh4,#fbh5,#fbh6,#fbh1,#fbh8').hide();
    $('#clickmodele2').hide();
    $('#clickmodele1hide').hide();
    $('#clickmodele2hide').hide();
    $('#module2').hide();
    $('#module3').hide();
    $('#p2').hide();
    $('#p3').hide();
    $('#p4').hide();
    $('#p5').hide();
    $('.kact').hide();
    $('.trait').hide();
    $('.FI').hide();
    $('.MI,#nxtf2,#nxtf3').hide();
    $('#fbh2,#fbh3,#fbh4,#fbh5,#fbh6,#fbh7,#fbh8').hide();
    $('#fbh1').show();
}

$(document).ready(function () {
    //$('.scroll5').slimScroll();
    //$(".popupbg,.popup").show();

    //$('.feedbackIntro:first').html(newContent2);

    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/start-standing_h.png');

    $(".standingNav4").click(function () {
        openorcloseSnap2 = 0;
        $('#clickmodele2,#clickmodele1,#snap2,#snap3,#snap4').hide();
        $("#navigation li a").removeClass('selected');
        $(this).addClass("selected");
        $('.standingNav5').removeClass("selected");
        $('#ReqFeedback').show();
        $('#seekSherpas').hide();
        $('.standingNav3 ').removeClass("selected");
        $('#ReqFeedbackSubmit').show();
        var tileClicks = $('#tileclicked').val();
        if (tileClicks == 2 || tileClicks == 4 || tileClicks == 5) {
            $('#Slideheader').text("Connect with your Team members");
            $('#coaching').hide();
        } else {
            $('#Slideheader').text("Connect with your Peers");
            $('#coaching').show();
        }
        $('#currIndex').val(0);
        $('#sherpas').hide();

        //$('.scroll5').slimScroll();
        $("#right").click();
    });
    $(".standingNav5").click(function () {
        openorcloseSnap2 = 0;
        $('#clickmodele2,#clickmodele1,#snap2,#snap3,#snap4').hide();
        $("#navigation li a").removeClass('selected');
        $(this).addClass("selected");
        $('.standingNav3').removeClass("selected");
        $('#Slideheader').text("Connect with Mentors");
        $('#ReqFeedback').hide();
        $('#seekSherpas').show();
        $('#ReqFeedbackSubmit').hide();
        $('#sherpas').show();
        $('#coaching').hide();
        $('#currIndex').val(0);
        $("#right").click();
        //$('.scroll5').slimScroll({ height: '400px !important' });
    });
    $('.close').click(function () {
        $(".popupbg,.popup").hide();
    });
    $('.usersConnectMentors').live('click', function () {
        if (!$(this).find('span').hasClass('slidecontentselect')) {
            $(this).find('span').addClass('slidecontentselect');
        } else {
            $(this).find('span').removeClass('slidecontentselect');
        }
    });
    $('.usersConnectPeers').live('click', function () {
        if (!$(this).find('span').hasClass('slidecontentselect')) {
            $(this).find('span').addClass('slidecontentselect');
        } else {
            $(this).find('span').removeClass('slidecontentselect');
        }
    });
    $('.ReqFeedbackSubmit').click(function () {
        var selectedids = "";
        $('.usersConnectPeers').each(function () {
           // debugger;
            var currData = $(this);
            if ($(this).find('span').hasClass('slidecontentselect')) {
                
                selectedids = selectedids + currData.attr("value") + ",";
           }
        });
        selectedids = selectedids.slice(0, -1);
      
        if (selectedids != "") {
            var tileClick = $('#tileclicked').val();
            if (tileClick != null && tileClick != 3) {
                RequestManagerFeedback(selectedids);
            } else {
                RequestSelfFeedback(selectedids);
            }
        } else {
            //$(".popupbg,.popup").show();
            $('#masterMsgCont').text("Please select a users");
            $('#overallCont').show();
            // alert("Please Select the users");
        }
    });

    LoadPracticeArea('.pa1', 1);
});

function LoadPracticeArea(selectedclass, module) {
    var tileClicks = $('#tileclicked').val();
    //if (tileClicks == 3) {
    //    $('#setgoalshide').hide();
    //    $('#navigation').addClass('navhidepa');
    //} else

    if (tileClicks == 3 || tileClicks == 2 || tileClicks == 4 || tileClicks == 5 || tileClicks == 6 || tileClicks == 7) {
        $('#navigation').addClass('navhidepa');
        $('#conektul').addClass('connecthidpa');
        $('#setgoalshide').hide();
        $('#pathfinders').hide();
    } else {
        $('#navigation').removeClass('navhidepa');
        $('#conektul').removeClass('connecthidpa');
        $('#setgoalshide').show();
        $('#pathfinders').show();
    }
    $('#moduleid').val($(selectedclass).attr('data-value'));
    var selectedBefore = $(selectedclass).hasClass('selectFBtwocol');
    if (!selectedBefore) {
        $('.chartdiv').each(function () {
            $(this).removeClass('selectFBtwocol');
        });
        if (selectedclass == ".pa1") {
            $(selectedclass).find('.chartdiv').addClass('selectFBtwocol');
            $('#moduleid').val($(selectedclass).find('.chartdiv').attr('data-value'));
        } else {
            $(selectedclass).addClass('selectFBtwocol');
        }
        var footerHtml = "";
        Common.ajaxsync({
            url: '/Standing/GetStandingPAContent',
            success: function (response) {
                if (response != null) {
                    $('#PoeName').val(response.PoeName);
                    //$('.trait').html(response.PoeName);
                    //var questionHtml = "  <div class='poeintroPane'><div class='poetitleArea'> <h1>" + response.PoeName + "</h1> <img src='../../Images/KessakuImage/" + response.PoeName.replace("&","").split(" ").join("") + "_pane.png'> <p>" + response.GetPracticeArea[0].ModuleIntro + "</p>" +
                    //    "</div></div>";

                    //var questionHtml1 = "  <div class='poeintroPane poepaneTwo'><div class='poetitleArea'><p>" + response.GetPracticeArea[0].ModuleIntro + "</p>" +
                     //   "</div></div>";

                    //var questionHtml2 = " <div class='poeintroPane poemoduleload'> <div class='poeheaderArea'> " +
                    //    "<h3>" + response.GetPracticeArea[module].ModuleName + "</h3> <span class='poeheaderIcon'> <img src='../Images/icons/" + response.PoeName.replace("&", "").split(" ").join("") + module + ".png'></span> </div>  <img src='../../Images/KessakuImage/" + response.PoeName.replace("&", "").split(" ").join("") + "_pane.png'><p>" + response.GetPracticeArea[module].ModuleIntro + "</p>";
                    //var questionHtml3 = " <div class='poeintroPane poemoduleload'>";
                    //var questionHtml4 = " <div class='poeintroPane poemoduleload'>";
                    //var totContentLength = (response.GetPracticeArea[module].ModuleIntro.length / 54) + 4 + 8;
                    ////var questiontitle = 4;
                    //$('#moduleintroslidecount').html("");
                    //for (var i = 0; i < response.GetPracticeArea[module].Questions.length; i++) {
                    //    var questionsLength = 0;
                    //    questionsLength = questionsLength + response.GetPracticeArea[module].Questions[i].SideBarTitle.length;
                    //    if (questionsLength > 42) {
                    //        totContentLength = totContentLength + Math.round(questionsLength / 42);
                    //    } else {
                    //        totContentLength = totContentLength + 1;
                    //    }
                    //    if (totContentLength < 20) {
                    //        questionHtml2 = questionHtml2 + "<div class='poeQuestionArea'> <div class='questionNo'>" + (i + 1) + "</div> <div class='poeQA'>" +
                    //            " <p><b>" + response.GetPracticeArea[module].Questions[i].SideBarTitle + "</b></p> <br> </div> </div>";
                    //    } else {
                    //        //debugger;
                    //        if (totContentLength < 52) {
                    //            $('#moduleintroslidecount').html("2");
                    //            questionHtml3 = questionHtml3 + "<div class='poeQuestionArea'> <div class='questionNo'>" + (i + 1) + "</div> <div class='poeQA'>" +
                    //                " <p><b>" + response.GetPracticeArea[module].Questions[i].SideBarTitle + "</b></p> <br> </div> </div>";
                    //        } else {
                    //            $('#moduleintroslidecount').html("3");
                    //            questionHtml4 = questionHtml4 + "<div class='poeQuestionArea'> <div class='questionNo'>" + (i + 1) + "</div> <div class='poeQA'>" +
                    //                " <p><b>" + response.GetPracticeArea[module].Questions[i].SideBarTitle + "</b></p> <br> </div> </div>";
                    //        }
                    //    }
                    //}
                   
                    //questionHtml2 = questionHtml2 + "</div>";
                    //questionHtml3 = questionHtml3 + "</div>";
                    //questionHtml4 = questionHtml4 + "</div>";
                    //// $('#moduleintro0').html(questionHtml);
                    ////$('#moduleintro1').html(questionHtml1);
                    //$('#moduleintro0').html(questionHtml2);
                    //$('#moduleintro1').html(questionHtml3);
                    //$('#moduleintro2').html(questionHtml4);
                    if (module == 1) {
                        var sherpaHtml = "";
                        //receive is team

                        var tileClick = $('#tileclicked').val();
                        var reqLength = response.ReceiveMembers.length;
                        var reqMembers = response.ReceiveMembers;
                        //if (tileClick != null && tileClick != 3) {
                        //    reqLength = response.RequestMembers.length;
                        //    reqMembers = response.RequestMembers;
                        //}
                        //var reqFeedback = "";
                        //for (var r = 0; r < reqLength; r++) {
                        //    reqFeedback = reqFeedback + " <li class='usersConnect usersConnectPeers' value='" + reqMembers[r].UserPOEMappingId + "' data-value='" + reqMembers[r].User.UserId + "'><a> " +
                        //        "<img width='95' height='95' alt='User' src='/Uploadify/LoadImageHandler.ashx?id=" + reqMembers[r].User.UserId + "'><span class=''></span>" +
                        //        "<p class='spanname'>" + reqMembers[r].User.FirstName + " " + reqMembers[r].User.LastName + "</p> </a></li>";
                        //}
                        //if (reqLength < 9) {
                        //    for (var m = reqLength; m < 9; m++) {
                        //        reqFeedback = reqFeedback + " <li> <img width='95' height='95' alt='Connect' src='../Images/you.png'> </li>";
                        //    }
                        //}

                        //$('#reqFeedbackPeers').html(reqFeedback);

                        // $('.slidecontent1').html("");

                        //$('.slidecontent1').html($('#Coaching0').html());
                        //$('#Coaching0').html()

                        if (response.Connect != null) {
                            for (var s = 0; s < response.Connect.length; s++) {
                                sherpaHtml = sherpaHtml + " <li class='usersConnect usersConnectMentors' value='" + response.Connect[s].UserPOEMappingId + "' data-value='" + response.Connect[s].User.UserId + "'><a> " +
                                    "<img width='95' height='95' alt='User' src='/Uploadify/LoadImageHandler.ashx?id=" + response.Connect[s].User.UserId + "'><span></span>" +
                                    "<p class='spanname'>" + response.Connect[s].User.FirstName + " " + response.Connect[s].User.LastName + "</p> </a></li>";
                            }
                            if (response.Connect.length < 9) {
                                for (var t = response.Connect.length; t < 9; t++) {
                                    sherpaHtml = sherpaHtml + " <li> <img width='95' height='95' alt='Connect' src='../Images/you.png'> </li>";
                                }
                            }
                        } else {
                            for (var p = 0; p < 9; p++) {
                                sherpaHtml = sherpaHtml + " <li> <img width='95' height='95' alt='Connect' src='../Images/you.png'> </li>";
                            }
                        }
                        $('#seekSherpasMentors').html(sherpaHtml);
                        $('#seekSherpasMentors').slimScroll();
                    }
                    // debugger;
                    // Goal Slider-->Starts
                    //var goalHtml1 = " <div id='quickviewli'><div class='setgoalContent'><h2>Set & Track Goals</h2><p> Set, share, and track development goals based on the knowledge you have acquired about the practices you can adopt to achieve excellence in your role.</p></div>";
                    //var goalHtml2 = "<div id='quickviewli' class='poepaneTwo'>";
                    //var goalHtml3 = "<div id='quickviewli'>";
                    //var goalbtnscript1 = "<div class='pageBtn-Part'>";
                    //var goalbtnscript2 = "";
                    //var goalbtnscript3 = "";
                    //var goalbtnscript4 = "";
                    //var goalCount = 0;
                    //var goalSliderLength = response.GetPracticeArea[module].Questions.length;
                    //if (goalSliderLength >= 3) {
                    //    goalSliderLength = 2;
                    //}
                    ////debugger;

                    //for (var g = 0; g < goalSliderLength; g++) {
                    //    var check = response.ManagerScore.ModuleScores[module - 1].QuestionScores.length;
                    //    if (check != 0) {
                    //        check = response.ManagerScore.ModuleScores[module - 1].QuestionScores[g].Score;
                    //    }
                    //    goalHtml1 = goalHtml1 + "<div class='questionarea quickview'> <div class='qn'>" + (g + 1) + "</div> <div class='setgoalsArea'>" +
                    //        " <h2>" + response.GetPracticeArea[module].Questions[g].QuetionText + "</h2> <div style='clear: both'></div>   " +
                    //        "<h3>Set Goal <span>(Move the slider)</span></h3> <div style='clear: both;'></div> <div class='slider'> <div  class='qq" + (g + 1) + "' style='width: 100%; height: auto; cursor: pointer;' data-value=" + response.GetPracticeArea[module].Questions[g].QuestionId + " data-mod=" + response.GetPracticeArea[module].ModuleId + "> " +
                    //        "<img src='../Images/spa-slider-bg.png' /> <div class='firstid' style='display: none;'>Congratulations on achieving your goal</div> <div id='share1' class='sharebtn' style='display: none;'>" +
                    //        " </div> <div class='secondid' style='display: none;'>You have set to achieve your goal in 6 months</div> <div id='share2' class='sharebtn' style='display: none;'> </div> " +
                    //        "<div class='thirdid' style='display: none;'>You have set to achieve your goal in 12 months</div> <div id='share3' class='sharebtn' style='display: none;'> </div> " +
                    //        "<div class='forthid' style='display: none;'>You have set to achieve your goal in 24 months</div> <div id='share4' class='sharebtn' style='display: none;'> </div> " +
                    //        "</div> </div> <div class='errormsg' id='err" + (g + 1) + "'> Take control of your development by clicking on <img src='../../Images/icons/share-gray.png'> and share  your goals. </div><div style='clear: both;'></div><div class='excellencemenu'> " +
                    //        "<label>" + response.ManagerName + "</label> </div> <div class='slider-img'> <img src='../../Images/spa-managerGoal" + (check + 1) + ".png'> </div> </div>" +
                    //        " <div style='border-bottom: 1px solid #ccc;'>&nbsp;&nbsp;&nbsp;</div> </div>";
                    //    goalCount++;
                    //}

                    //goalHtml1 = goalHtml1 + "</div></div>";
                    //$('#setgoals0').html(goalHtml1);

                    //if (response.GetPracticeArea[module].Questions.length >= 3) {
                    //    //debugger;
                    //    var bucketLength = Math.ceil(((response.GetPracticeArea[module].Questions.length) - 2) / 3);
                    //    goalSliderLength = goalSliderLength + 3;
                    //    for (var b = 0; b < bucketLength; b++) {
                    //        for (var h = 0; h < 3; h++) {
                    //            var check1 = response.ManagerScore.ModuleScores[module - 1].QuestionScores.length;
                    //            if (check1 > h) {
                    //                check1 = response.ManagerScore.ModuleScores[module - 1].QuestionScores[h].Score;
                    //            }
                    //            if (response.GetPracticeArea[module].Questions.length > goalCount) {
                    //                goalHtml2 = goalHtml2 + "<div class='questionarea quickview'> <div class='qn'>" + (goalCount + 1) + "</div> <div class='setgoalsArea'>" +
                    //                    " <h2>" + response.GetPracticeArea[module].Questions[goalCount].QuetionText + "</h2> <div style='clear: both'></div>   " +
                    //                    "<h3>Set Goal <span>(Move the slider)</span></h3> <div style='clear: both;'></div> <div class='slider'> <div  class='qq" + (goalCount + 1) + "' style='width: 100%; height: auto; cursor: pointer;'  data-value=" + response.GetPracticeArea[module].Questions[goalCount].QuestionId + " data-mod=" + response.GetPracticeArea[module].ModuleId + "> " +
                    //                    "<img src='../Images/spa-slider-bg.png' style='width:100%' /> <div class='firstid' style='display: none;'>Congratulations on achieving your goal</div> <div id='share1' class='sharebtn' style='display: none;'>" +
                    //                    " </div> <div class='secondid' style='display: none;'>You have set to achieve your goal in 6 months</div> <div id='share2' class='sharebtn' style='display: none;'> </div> " +
                    //                    "<div class='thirdid' style='display: none;'>You have set to achieve your goal in 12 months</div> <div id='share3' class='sharebtn' style='display: none;'> </div> " +
                    //                    "<div class='forthid' style='display: none;'>You have set to achieve your goal in 24 months</div> <div id='share4' class='sharebtn' style='display: none;'> </div> " +
                    //                    "</div> </div> <div class='errormsg' id='err" + (goalCount + 1) + "'> Take control of your development by clicking on <img src='../../Images/icons/share-gray.png'> and share  your goals. </div><div style='clear: both;'></div><div class='excellencemenu'> " +
                    //                    "<label>" + response.ManagerName + "</label> </div> <div class='slider-img'> <img src='../../Images/spa-managerGoal" + (check1 + 1) + ".png' style='width:100%'> </div> </div>" +
                    //                    " <div style='border-bottom: 1px solid #ccc;'>&nbsp;&nbsp;&nbsp;</div> </div>";
                    //                goalCount++;
                    //            }
                    //        }
                           

                    //        goalHtml2 = goalHtml2 + "</div>";
                    //        if (b == 0) {
                    //            $('#setgoalsslidecount').html("2");
                    //        } else if (b < 2) {
                    //            $('#setgoalsslidecount').html("3");
                    //        } else {
                    //            $('#setgoalsslidecount').html("4");
                    //        }
                    //        $('#setgoals' + (b + 1) + '').html(goalHtml2);
                    //        goalHtml2 = "<div id='quickviewli' class='poepaneTwo'>";
                    //    }
                    //}

                    //Goal Slider-->Ends

                    //Coaching-Slides-Start
                    //<img src='../../Images/KessakuImage/" + response.PoeName.split(" ").join("") + "_pane.jpg'>
                    var coachingHtml = "<div class='poeintroPane poeintroPaneDummy' id='poeintroPane0'> <div class='poeintroPanes'><h1>Readiness Resources</h1><p>Access courses and resources to build a readiness roadmap tailored to your own development priorities.</p></div><img src='../../Images/KessakuImage/" + response.PoeName.replace("&", "").split(" ").join("") + "_resources.png'>";
                    //var coachingHtml1 = "<div class='poeintroPane'>";
                    //var coursePaginationHtml = "";
                    //var coursecount = 0;
                    var courseDetailLength = response.GetPracticeArea[module].CourseDetail.length;
                    //if (courseDetailLength >= 4) {
                    //    courseDetailLength = 3;
                    //}
                    // debugger;
                    var charLength = 0;
                    var paginationCount = 0;
                    //var anchorTagCount = 0;
                    var courceTitle = 4;
                    var sHeight = window.innerHeight;
                    var noofLines = getNumberofLines(sHeight);
                    // var pagination = "<div class='pageBtn-Part'>";
                    //debugger;
                    for (var c = 0; c < courseDetailLength; c++) {
                        var courseDetail = "";
                        if (response.GetPracticeArea[module].CourseDetail[c].CourseContent != null) {
                            courseDetail = response.GetPracticeArea[module].CourseDetail[c].CourseContent;
                        }
                        var courceTitleLength = response.GetPracticeArea[module].CourseDetail[c].CourseTitle.length;
                        var courseCont = 0;
                        if (response.GetPracticeArea[module].CourseDetail[c].CourseContent != null) {
                            courseCont = response.GetPracticeArea[module].CourseDetail[c].CourseContent.length;
                        }
                        charLength = charLength + Math.ceil(courseCont / 54) + response.GetPracticeArea[module].CourseDetail[c].LinkCount + courceTitle;
                        //anchorTagCount = anchorTagCount + response.GetPracticeArea[module].CourseDetail[c].LinkCount + charLength;
                        var pageLength = (paginationCount == 0 ? noofLines[0] : noofLines[1]);
                        if (charLength <= pageLength) {
                            coachingHtml = coachingHtml + "<div class='resourcesPA' > <div class='poeheaderArea " + (courceTitleLength <= 36 ? '' : 'poeheaderAreatwoline') + "'> <h3>" + response.GetPracticeArea[module].CourseDetail[c].CourseTitle + "</h3> " +
                                "<span class='poeheaderIcon'> <img src='../../Images/KessakuImage/iconCI.png' /></span> </div> " +
                                "<p>" + courseDetail + " </p> " + response.GetPracticeArea[module].CourseDetail[c].CourseLink + " </div>";
                        } else {
                            charLength = Math.ceil(response.GetPracticeArea[module].CourseDetail[c].CourseContent.length / 54) + response.GetPracticeArea[module].CourseDetail[c].LinkCount + courceTitle;
                            //anchorTagCount = response.GetPracticeArea[module].CourseDetail[c].LinkCount + charLength;
                            if (charLength <= noofLines[1]) {
                                // pagination = pagination + "<a id='nonselecteds" + paginationCount + "' class='" + (paginationCount == 0 ? 'SelectPagebtn' : '') + " nonselecteds' onclick='showCoachingIntro(" + paginationCount + ")'>" + (paginationCount + 1) + "</a>";
                                coachingHtml = coachingHtml + "</div><div class='poeintroPane poeintroPaneDummy' id='poeintroPane" + (paginationCount + 1) + "' style=display:none><div class='resourcesPA' > <div class='poeheaderArea " + (courceTitleLength <= 36 ? '' : 'poeheaderAreatwoline') + "'> <h3>" + response.GetPracticeArea[module].CourseDetail[c].CourseTitle + "</h3> " +
                                    "<span class='poeheaderIcon'> <img src='../../Images/KessakuImage/iconCI.png' /></span> </div> " +
                                    "<p>" + courseDetail + " </p> " + response.GetPracticeArea[module].CourseDetail[c].CourseLink + " </div>";
                                paginationCount++;
                            }
                            //else {
                            //    coachingHtml = "</div><div class='poeintroPane' style=display:none>";
                            //}
                        }
                        $('#ProgramSlideCount').html(paginationCount);
                        if ((courseDetailLength - 1) == c) {
                            //pagination = pagination + "<a id='nonselecteds" + paginationCount + "' class='nonselecteds' onclick='showCoachingIntro(" + paginationCount + ")'>" + (paginationCount + 1) + "</a>";
                        }
                    }
                    //for (var c = 0; c < courseDetailLength; c++) {
                    //    coachingHtml = coachingHtml + "<div class='resourcesPA'> <div class='poeheaderArea'> <h3>" + response.GetPracticeArea[module].CourseDetail[c].CourseTitle + "</h3> " +
                    //        "<span class='poeheaderIcon'> <img src='../../Images/KessakuImage/iconCI.png' /></span> </div> " +
                    //        "<p>" + response.GetPracticeArea[module].CourseDetail[c].CourseContent + " </p> " + response.GetPracticeArea[module].CourseDetail[c].CourseLink + " </div>";
                    //    coursecount++;
                    //}
                    //for (var d = coursecount; d < response.GetPracticeArea[module].CourseDetail.length; d++) {
                    //    coachingHtml1 = coachingHtml1 + "<div class='resourcesPA'> <div class='poeheaderArea'> <h3>" + response.GetPracticeArea[module].CourseDetail[d].CourseTitle + "</h3> " +
                    //        "<span class='poeheaderIcon'> <img src='../../Images/KessakuImage/iconCI.png' /></span> </div> " +
                    //        "<p>" + response.GetPracticeArea[module].CourseDetail[d].CourseContent + " </p> " + response.GetPracticeArea[module].CourseDetail[d].CourseLink + " </div>";
                    //    coursecount++;
                    //}
                    //coachingHtml = coachingHtml + "</div>";
                    //if (response.GetPracticeArea[module].CourseDetail.length >= 4) {
                    //    coachingHtml1 = coachingHtml1 + "</div>";
                    //    coachingHtml = coachingHtml + "<div class='pageBtn-Part'><a class='SelectPagebtn nonselecteds' onclick='showCoachingIntro(0)'>1</a> " +
                    //        "<a id='goalModule2' class='nonselecteds' onclick='showCoachingIntro(1)'>2</a></div>";
                    //    coachingHtml1 = coachingHtml1 + "<div class='pageBtn-Part'><a class='nonselecteds' onclick='showCoachingIntro(0)'>1</a> " +
                    //        "<a id='goalModule2' class='SelectPagebtn nonselecteds' onclick='showCoachingIntro(1)'>2</a></div>";
                    //}
                    $('#Program0').html(coachingHtml + "</div>");
                    //$('.managerShareResource').vscontext({ menuBlock: 'vs-context-menu' });
                    //$('#Program1').html(coachingHtml1);
                }
                var newContent2 = '<div class="content2" id="modulecontent">' + $('#moduleintro0').html() + '</div>';
                if ($('#moduleintroslidecount').html() > 0) {
                    showfirstarrow = 1;
                    $('#left').hide();
                    $('#snap2').html($('#moduleintro1').html());
                    $('#snap2').show("slow");
                    $('#clickmodele2hide').show("slow");
                }
                if ($('#moduleintroslidecount').html() == 3) {
                    showsecondarrow = 1;
                    $('#snap3').html($('#moduleintro2').html());
                    $('#snap3').show("slow");
                    $('#clickmodele2hide').hide();
                    $('#clickmodele3hide').show("slow");
                }
                var test = $('#moduleintro1').html() + $('#moduleintro2').html();

                $('.feedbackIntro:last').html(newContent2);
               
                $('.beforedata').html($('#moduleintro1').html());
                $('.nextData').html($('#moduleintro2').html());
                $('#poeintroPane0').html($('#Program0').html());
               // $('#poeintroPane1').html($('#Program1').html());
                
                
            },
            error: function (err) {
            }
        });
    }
}
$(document).ready(function () {
    var $navlinks = $('#navigation li a'),
        $ajaxcontent = $('#ajax-content'),
        animDur = 500, // animation duration
        isTransitionRunning = false;
    $('.standingNav3').click(function (e) {
        $(".slideout").animate({ left: '0px' }, { queue: false, duration: 500 });
        $(".slideout1").animate({ right: '-24%' }, { queue: false, duration: 500 });
        newContent = '<div class="content2 programDef" id="maincontent">' + $('#Program0').html() + '</div>';

        $('#readinessAccordion').html(newContent);
        $('#readinessAccordion').slimScroll();
        //$('.standingNav5').removeClass("selected");
        //$('.standingNav4').removeClass("selected");
        //$('#clickmodele1hide').show();
        //$('#clickmodele2hide').hide();
        //$('#clickmodele3hide').hide();
        //$('#clickmodele4hide').hide();
        //$('#clickmodele2,#clickmodele1,#snap2,#snap3,#snap4').hide();
        //$('.standingNav5').removeClass("selected");
        //$('.standingNav4').removeClass("selected");
        //// debugger;
        if ($('#ProgramSlideCount').html() > 0) {
           $('#left').hide();
          showfirstarrow = 1;
           $('#snap2').html("<div class='poeintroPane poeintroPaneDummy PoeRecourceContents'>" + $('#poeintroPane1').html() + "</div>");
            $('#snap2').show("slow");
           $('#clickmodele1hide').hide();
            $('#clickmodele2hide').show("slow");
        }
        if ($('#ProgramSlideCount').html() > 1) {
            showsecondarrow = 1;
            $('#snap3').html("<div class='poeintroPane poeintroPaneDummy PoeRecourceContents'>" + $('#poeintroPane2').html() + "</div>");
            $('#snap3').show("slow");
            $('#clickmodele1hide').hide();
            $('#clickmodele2hide').hide();
            $('#clickmodele3hide').show("slow");
        }
        if ($('#ProgramSlideCount').html() > 2) {
            showsecondarrow = 1;
            $('#snap4').html("<div class='poeintroPane poeintroPaneDummy PoeRecourceContents'>" + $('#poeintroPane3').html() + "</div>");
            $('#snap4').show("slow");
            $('#clickmodele1hide').hide();
            $('#clickmodele2hide').hide();
            $('#clickmodele3hide').hide();
            $('#clickmodele4hide').show("slow");
        }
        //e.preventDefault(); // prevent default action
        //if (isTransitionRunning) {
        //    return false;
        //}
        //var contentWidth = $ajaxcontent.width(),
        //    $newItem = $(document.createElement('div')), // nested container for new content
        //    newItemHeight,
        //    newContentHeight,
        //    $oldItem = $ajaxcontent.children('.item-container');
        //isTransitionRunning = true;

        //$newItem.addClass('item-container');

        //$('html, body').animate('slow');
        //$navlinks.removeClass('selected');
        //$(this).addClass('selected');
        //$ajaxcontent.height($ajaxcontent.height());
        //$ajaxcontent.css('overflow', 'hidden');
        //if ($oldItem.length) {
        //    $oldItem
        //        .width(contentWidth)
        //        .css('position', 'absolute')
        //        .animate({
        //            left: -contentWidth // move new content at the right edge of container
        //        },
        //            animDur,
        //            function () {
        //                $oldItem.remove();
        //            });
        //}

        //// append new content to container
        //$newItem.html(newContent);
        //$ajaxcontent.append($newItem);
        //// fix new content width
        //$newItem.width(contentWidth);
        //// determine height of new content when it's appended to DOM
        //newItemHeight = $newItem.height();

        //// set up new content
        //$newItem
        //    // move it to the right
        //    .css('position', 'absolute')
        //    .css('left', $ajaxcontent.width() + '%')
        //    // sliding animation
        //    .animate({
        //        left: 0
        //    },
        //        animDur,
        //        function () {
        //            // restore css
        //            $newItem.css('position', 'static');
        //            $newItem.css('width', 'auto');
        //        });

        //// change ajax container height
        //$ajaxcontent.animate({
        //    height: newItemHeight
        //},
        //    animDur,
        //    function () {
        //        // now let ajax container naturally wrap around its content
        //        $ajaxcontent.css('height', 'auto');
        //        $ajaxcontent.css('overflow', 'auto');

        //        // unset the transition running flag
        //        isTransitionRunning = false;
        //    });
        $('.sharebtn').vscontext({ menuBlock: 'vs-context-menu' });
        $('#currIndex').val(1);
        $('.managerShareResource').click(function () {
            //debugger;
            $('#sharedUrl').val($(this).prev().attr('href'));
            $('#sharedTitle').val($(this).prev().text());
            $('#sharegoalChange').text("Share this Resource with:");
        });
        return false;
    });
    $navlinks.click(function (e) {
        if (!$(this).hasClass('standingNav4')) {
            $('#currIndex').val(1);
            $(".slideout").animate({ left: '0px' }, { queue: false, duration: 500 });
            openorclose = 1;
            showfirstarrow = 0;
            showsecondarrow = 0;
            $('#clickmodele1hide').hide();
            $('#clickmodele2hide').hide();
            $('#clickmodele3hide').hide();
            $('#clickmodele4hide').hide();
            $('#clickmodele1').hide();
            $('#clickmodele2').hide();
            $('.standingNav3').removeClass('selected');
            ///
            $(".slideout1").animate({ right: '-24%' }, { queue: false, duration: 500 });
            if ($(this).attr('class').indexOf('nav1') != -1) {
                // alert($('#poeintro0').html());
                newContent = '<h2>Feedback Introduction</h2><div class="content1" id="maincontent">' + $('#poeintro0').html() + '</div>';

                if ($('#poeintroslidecount').html() > 0) {
                    showfirstarrow = 1;
                    $('#snap2').html($('#poeintro1').html());
                }
                if ($('#poeintroslidecount').html() > 1) {
                    showsecondarrow = 1;
                    $('#snap3').html($('#poeintro2').html());
                }
            }
            if ($(this).attr('class').indexOf('nav2') != -1) {
                var moduleName = '';
                var imgSrc = '';
                if ($('#quickviewli >li').length > 0) {
                    $('#quickviewli >li').each(function () {
                        if ($(this).css('display') != 'none') {
                            moduleName = $(this).find('.customertiles>ul>li.selected').find('p').html();
                            imgSrc = $(this).find('.customertiles>ul>li.selected').find('img').attr('src');
                            return false;
                        }
                    });
                } else {
                    moduleName = $('#poemodule>li.selected').find('p').html();
                    imgSrc = $('#poemodule>li.selected').find('img').attr('src');
                }
                newContent = '<div class="poeheaderArea"><h2>' + moduleName + '</h2><span class="poeheaderIcon"> <img src="' + imgSrc + '"></span></div><div class="content2" id="maincontent">' + $('#moduleintro0').html() + '</div>';
                if ($('#moduleintroslidecount').html() > 0) {
                    showfirstarrow = 1;
                    $('#snap2').html($('#moduleintro1').html());
                }
                if ($('#moduleintroslidecount').html() > 1) {
                    showsecondarrow = 1;
                    $('#snap3').html($('#moduleintro2').html());
                }
            }
            if ($(this).attr('class').indexOf('nav3') != -1) {
                newContent = '<h2>Traits</h2><div class="content3" id="poetraits">' + $('#traits0').html() + '</div>';
                if ($('#traitsslidecount').html() > 0) {
                    showfirstarrow = 1;
                    $('#snap2').html($('#traits1').html());
                }
                if ($('#traitsslidecount').html() > 1) {
                    showsecondarrow = 1;
                    $('#snap3').html($('#traits2').html());
                }
            }
            if ($(this).attr('class').indexOf('nav4') != -1) {
                newContent = '<h2>Key Actions</h2><div class="content4" id="modulekeyaction">' + $('#keyaction0').html() + '</div>';
                if ($('#keyactionslidecount').html() > 0) {
                    showfirstarrow = 1;
                    $('#snap2').html($('#keyaction1').html());
                }
                if ($('#keyactionslidecount').html() > 1) {
                    showsecondarrow = 1;
                    $('#snap3').html($('#keyaction2').html());
                }
            }

            if ($(this).attr('class').indexOf('nav5') != -1) {
                newContent = '<h2>In Detail</h2><div class="content1" id="maincontent">' + $('#indetail0').html() + '</div>';
                // showfirstarrow = 1;
                // $('#snap2').html($('#indetail1').html());
                //  showsecondarrow = 0;
                //$('#snap3').html($('#indetail2').html());
                if ($('#indetail1').find('strong').size() > 0) {
                    showfirstarrow = 1;
                    $('#clickmodele1').show("slow");
                    $('#snap2').html($('#indetail1').html());
                }
                if ($('#indetail2').find('strong').size() > 0) {
                    showfirstarrow = 1;
                    $('#snap3').html($('#indetail2').html());
                }
            }
            if ($(this).attr('class').indexOf('nav6') != -1) {
                newContent = '<h2>Frequency Definitions</h2><div class="content1" id="maincontent">' + $('#frequencydef').html() + '</div>';
            }
            if ($(this).attr('class').indexOf('nav7') != -1) {
                newContent = '<h2>Do&#39;s & Don&#39;ts</h2><div class="content1" id="maincontent">' + $('#dos').html() + '</div>';
            }

            if ($(this).attr('class').indexOf('standingNav1') != -1) {
                newContent = '<div class="content2" id="modulecontent">' + $('#moduleintro0').html() + '</div>';
                $('#clickmodele2,#clickmodele1,#snap2,#snap3,#snap4').hide();
                $('.standingNav5').removeClass("selected");
                $('.standingNav4').removeClass("selected");
                if ($('#moduleintroslidecount').html() > 0) {
                    showfirstarrow = 1;
                    $('#left').hide();
                    $('#snap2').html($('#moduleintro1').html());
                    $('#snap2').show("slow");
                    $('#clickmodele2hide').show("slow");
                }
                if ($('#moduleintroslidecount').html() == 3) {
                    showsecondarrow = 1;
                    $('#snap3').html($('#moduleintro2').html());
                    $('#snap3').show("slow");
                    $('#clickmodele2hide').hide();
                    $('#clickmodele3hide').show("slow");
                }
            }
            if ($(this).attr('class').indexOf('standingNav2') != -1) {
                newContent = '<div class="content2" id="maincontent">' + $('#setgoals0').html() + '</div>';
                $('#clickmodele2,#clickmodele1,#snap2,#snap3,#snap4').hide();
                $('.standingNav5').removeClass("selected");
                $('.standingNav4').removeClass("selected");
                $('#clickmodele1hide').show("slow");
                if ($('#setgoalsslidecount').html() > 1) {
                    $('#left').hide();
                    showfirstarrow = 1;
                    $('#snap2').html($('#setgoals1').html());
                    $('#snap2').show("slow");
                    $('#clickmodele1hide').hide();
                    $('#clickmodele2hide').show("slow");
                }
                if ($('#setgoalsslidecount').html() > 2) {
                    showsecondarrow = 1;
                    $('#snap3').html($('#setgoals2').html());
                    $('#snap3').show("slow");
                    $('#clickmodele1hide').hide();
                    $('#clickmodele2hide').hide();
                    $('#clickmodele3hide').show("slow");
                }
                if ($('#setgoalsslidecount').html() > 3) {
                    showsecondarrow = 1;
                    $('#snap4').html($('#setgoals3').html());
                    $('#snap4').show("slow");
                    $('#clickmodele1hide').hide();
                    $('#clickmodele2hide').hide();
                    $('#clickmodele3hide').hide();
                    $('#clickmodele4hide').show("slow");
                }

                //$('#sliderload').load();
            }
            if ($(this).attr('class').indexOf('standingNav3') != -1) {
                newContent = '<div class="content2 programDef" id="maincontent">' + $('#Program0').html() + '</div>';
            }

            e.preventDefault(); // prevent default action
            if (isTransitionRunning) {
                return false;
            }
            var contentWidth = $ajaxcontent.width(),
                $newItem = $(document.createElement('div')), // nested container for new content
                newItemHeight,
                newContentHeight,
                $oldItem = $ajaxcontent.children('.item-container');
            isTransitionRunning = true;

            $newItem.addClass('item-container');

            $('html, body').animate('slow');
            $navlinks.removeClass('selected');
            $(this).addClass('selected');
            $ajaxcontent.height($ajaxcontent.height());
            $ajaxcontent.css('overflow', 'hidden');
            if ($oldItem.length) {
                $oldItem
                    .width(contentWidth)
                    .css('position', 'absolute')
                    .animate({
                        left: -contentWidth // move new content at the right edge of container
                    },
                        animDur,
                        function () {
                            $oldItem.remove();
                        });
            }

            // append new content to container
            $newItem.html(newContent);
            $ajaxcontent.append($newItem);
            // fix new content width
            $newItem.width(contentWidth);
            // determine height of new content when it's appended to DOM
            newItemHeight = $newItem.height();
            if ($(this).attr('class').indexOf('standingNav2') != -1) {
                if ($('#pagemodes').val() == "1") {
                    $('.errormsg').hide();
                    for (var m = 1; m < 10; m++) {
                        $(".qq" + m + "").slider({
                            min: 0,
                            max: 4,
                            range: "min",
                            value: LoadQuestions($(".qq" + m + "").attr("data-mod"), $(".qq" + m + "").attr("data-value")),
                            slide: function (ui, event) {
                                $('#qusetionid').val($(".qq" + m + "").attr("data-value"));
                                $('#Answers').val(event.value);
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
                                    $(this).parent().find('.firstid').hide();
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
                    $('.sharebtn').vscontext({ menuBlock: 'vs-context-menu' });
                    $('#sharegoalChange').text("Share this Goal with:");
                }
            }
            // set up new content
            $newItem
                // move it to the right
                .css('position', 'absolute')
                .css('left', $ajaxcontent.width() + '%')
                // sliding animation
                .animate({
                    left: 0
                },
                    animDur,
                    function () {
                        // restore css
                        $newItem.css('position', 'static');
                        $newItem.css('width', 'auto');
                    });

            // change ajax container height
            $ajaxcontent.animate({
                height: newItemHeight
            },
                animDur,
                function () {
                    // now let ajax container naturally wrap around its content
                    $ajaxcontent.css('height', 'auto');
                    $ajaxcontent.css('overflow', 'auto');

                    // unset the transition running flag
                    isTransitionRunning = false;
                });
            //$("#Qnosww1").slider({
            //    min: 0,
            //    max: 4,
            //    range: "min",
            //    value: 2,
            //    slide: function (event, ui) {
            //        debugger;
            //    }
            //});
            return false;
        }
    });
    //LoadSlider();
    //    $.ajax({ url: 'page1.html', success: function (html) {
    //        $ajaxcontent.empty().append(html);
    //    }
    //    });
});
function RequestManagerFeedback(selectedIds) {
    Common.ajax({
        url: '../../Feedback/SendRequest',
        data: { 'ids': selectedIds },
        success: function (response) {
           // alert("Feedback Requested");
            $('#masterMsgCont').text("Feedback Requested");
            $('#overallCont').show();
        },
        error: function (err) {
        }
    });
}
function RequestSelfFeedback(selectedIds) {
    Common.ajax({
        url: '../../Feedback/SendInviteToTeam',
        data: { 'ids': selectedIds },
        success: function (response) {
            /// alert("Feedback Requested");
            $('#masterMsgCont').text("Feedback Requested");
            $('#overallCont').show();
        },
        error: function (err) {
        }
    });
}

function ConnectMessagesMentors(selectedIds) {
    var poename = $('.selectFBtwocol').prev().find('h1').text();
    var txtareavalText = $('#textAreaMentors').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
   // alert(txtareavalText);
    var subject = "Comments for the REP-" + poename;
    var moduleid = $('#moduleid').val();
    Common.ajax({
        url: '../../Feedback/ConnectPostStanding',
        data: { 'useridslist': selectedIds, 'subject': subject, 'comments': txtareavalText, 'moduleid': moduleid },
        success: function(response) {
            //alert("Message sent successfully");
            $('#masterMsgCont').text("Message sent successfully");
            $('#overallCont').show();
           // $('#textAreaMentors').sceditor('instance').val('');
            $('#textAreaMentors').sceditor('instance').getBody()[0].innerHTML = '';
            $('#ReqFeedback  li a span,#seekSherpas li a span').removeClass('slidecontentselect');
        },
        error: function(err) {
        }
    });
}

function ConnectMessagesPeers(selectedIds) {
        var poename = $('.selectFBtwocol').prev().find('h1').text();
        var txtareavalText = $('#textAreaPeers').sceditor('instance').getBody().innerText.replace(/^\s+/, "");
        var subject = "Comments for the REP-" + poename;
        var moduleid = $('#moduleid').val();
        Common.ajax({
            url: '../../Feedback/ConnectPostStanding',
            data: { 'useridslist': selectedIds, 'subject': subject, 'comments': txtareavalText, 'moduleid': moduleid },
            success: function (response) {
               // alert("Message sent successfully");
                $('#masterMsgCont').text("Message sent successfully");
                $('#overallCont').show();
                $('#textAreaPeers').sceditor('instance').val('');
                $('#ReqFeedback  li a span,#seekSherpas li a span').removeClass('slidecontentselect');
            },
            error: function (err) {
            }
        });
}

function getNumberofLines(height) {
    var slideHeight = [0, 0];
    if (height > 1150) slideHeight = [45, 51];
    else if (height > 950) slideHeight = [36, 42];
    else if (height < 900) slideHeight = [26, 34];
    else slideHeight = [26, 34];
    //alert(slideHeight[0] + "  " + slideHeight[1]);
    return slideHeight;
}