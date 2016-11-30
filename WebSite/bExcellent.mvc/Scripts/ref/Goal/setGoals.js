$(document).ready(function () {

    var poe = $('#selectedPoeValuePotentialMentors').val();
   
    Common.setTopMenu(6);
    var excellenceIndicatorCount = $('.doneBtn a').parent().parent().find('li.dateSelected').length;
    var tempval = 0;
    if (poe != 0) {
        setTimeout(function () {
            tempval = 1;
            GetUsersPoesArrangement(poe);
        }, 50);
    }   
    
    (function ($) {
        jQuery.fn.vscontext = function (options) {
            var defaults = {
                menuBlock: null,
                offsetX: 5,
                offsetY: 5,
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




    goal.loadPoeName({ url: '../../Goal/GetPoeName' });
    goal.loadModuleIds({ url: '../../Goal/GetPracticeArea' });
    goal.loadTileClicks();
    goal.donePopupClick();
    goal.saveGoalClick();
    goal.allPopupCloseClick();

    $('#practiceAreas li:first').click();

    var html = "<li class='nwTile'><a href='../../Goal/SetGoals'><span><img src='../../Images/Icons/goal-small.png'/></span><p>Set Development Priorities</P></a></li>" +
            "<li class='peerTile'><a href='../../Goal/TrackGoals'><span><img src='../../Images/Icons/track-goal-small.png'/></span><p>Track Development Progress</P></a></li>";

    $('#target ul').html(html);
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/goals_icon_h.png');

    $('#sticky > ul > li > a').click(function () {
        $('#sticky > ul > li > a').each(function (index, item) {
            $(item).removeClass('select' + $(item).data('class'));
        });
        $(this).addClass('select' + $(this).data('class'));
    });
    $(document).click(function () {
        $('#sticky > ul > li > a').each(function (index, item) {
            $(item).removeClass('select' + $(item).data('class'));
        });
    });
    $('#practiceAreas li').hover(
   function () {
       removeAttrHover();
       $(this).find('img').attr("src", "../../Images/icons/" + $('#selectedpoeDigdeep').val() + (parseInt($(this).attr("data-moduleorder"))) + "h" + ".png");
       //$(this).addClass('moduleHove');
   }, function () {
       // alert('123') 
       removeAttrHover();
       $('#practiceAreas>li.selected').find('img').attr("src", "../../Images/icons/" + $('#selectedpoeDigdeep').val() + (parseInt($('#practiceAreas>li.selected').attr("data-moduleorder"))) + "h" + ".png");
       $('#practiceAreas>li.selected').addClass('moduleHove');
   });

});

var goal = {

    loadPoeName: function () {

        var poeid = $('#selectedPoeValuePotentialMentors').val();

        Common.ajaxsync({
            url: "../../Goal/GetPoeName",
            data: { 'poeid': poeid },
            success: function (response) {
                $('#selectedpoeDigdeep').val(response);

            },
            error: function () {
            }
        });
    },

    loadTileClicks: function () {


        $('#practiceAreas li:first').click(function () {

            //Validation Tile Popup //   if ($('.dateSelected').length == 0) {
            //$("#status").fadeIn();
            //$("#preloader").delay(100).fadeIn("slow");
            $(this).addClass("selected");
            $(this).siblings().removeClass("selected");
            goal.loadDevlopmentPriorities({ url: '../../Goal/GetDevPriorityQuestions' });

            goal.HighlightTile(this);

            $('.goalDateDB').click(function () {

                $(this).datepicker("show");

            });



            $(".datepicker").datepicker({
                buttonImage: '../../Images/1439929250_calendar.png',
                buttonImageOnly: true,
                buttonText: "Click For The Calendar",
                changeMonth: true,
                minDate: 0,
                changeYear: true,
                showOn: 'both',
                dateFormat: 'M d, yy',
                onSelect: function () {
                    $(this).parent().parent().find('#chooseText').text($(this).val());
                    $(this).parent().parent().find('#dateValue').text($(this).val());


                    $(this).parents('li#loadAllQuestions').addClass('dateSelected');

                    var dateChoosen = $(this).parents('li#loadAllQuestions').find('#dateValue').html();

                    var currentDate = new Date();

                    var start = Date.parse(currentDate);
                    var end = Date.parse(dateChoosen);

                    // end - start returns difference in milliseconds 
                    var diff = new Date(end - start);

                    // get days
                    var days = diff / 1000 / 60 / 60 / 24;

                    if (days <= 7) {

                        //alert('Setting Goal date less than 1 week will not make you to come and reset the goal date again.');
                        $('.popupbg, .goalNotSaved').fadeIn("slow");

                    }

                    var html = '<div class="sleftRatings"> <p>You have set your goal to</p><div><img src="../Images/new/answer4.png"></div><div class="bfrSetGoalDate">Goal Date: ' + $(this).val() + '</div></div>';

                    $(this).parent().parent().parent().find('.sleftRatings').html('');

                    $(this).parent().parent().parent().parent().find('.goalsShared').html('');
                    $(this).parent().parent().parent().parent().find('.goalsShared').hide();


                    $(this).parent().parent().parent().find('#dateSetContent').html(html);



                }
            });


            $('.goalsShared p').each(function () {

                var shareGoalContentCount = $(this).html().length;

                $(this).html($(this).html().substring(0, (shareGoalContentCount - 1)));

            });

            $('.goalEdit').click(function () {

                $(this).parent().removeClass('goalEditDeleteDevlopment');
                $(this).parent().html('');

            });

            $('.goalDelete').click(function () {

                $('.popupbg, .goalDeletePopup').fadeIn("slow");

                var goalDel = $(this);

                goal.deletYesFunction(goalDel);
            });


            $('.goalsSharedClick').click(function () {

                if ($(this).attr('data-value') != 0) {
                    $(this).parent().css('overflow', 'hidden');
                    $(this).parent().css('height', '25px');
                    $(this).css('bottom', '-5px');
                    $(this).attr('data-value', 0);
                    $(this).attr('title', 'View More');
                }
                else {
                    $(this).parent().css('overflow', 'none');
                    $(this).parent().css('height', 'auto');
                    $(this).css('bottom', '-30px');
                    $(this).attr('data-value', 1);
                    $(this).attr('title', 'View Less');
                }


            });






            //$("#status").fadeOut();
            //$("#preloader").fadeOut("slow");

            //Validation Tile Popup // }
            //else {
            //    $('.popupbg, .goalNotSaved').fadeIn("slow");
            //    //alert('You have not saved the goal yet');

            //}
        });


        $('.poemodule').live('click', function () {


            //Validation Tile Popup // if ($('.dateSelected').length == 0) {

            //$("#status").fadeIn();
            //$("#preloader").delay(100).fadeIn("slow");

            var image = $('#selectedpoeDigdeep').val();
            var moduleid = $(this).attr('data-value');
            var imagenumber = $(this).attr('data-moduleorder');
            var licount = $('.poemodule').length;
            $('#moduleid').val(moduleid);

            var ctrlPoeModule = $(this);
            var viewVal = ctrlPoeModule.attr('data-value');


            goal.HighlightTile(this);
            if (viewVal != 0) {
                ctrlPoeModule.addClass("selected");
                ctrlPoeModule.siblings().removeClass("selected");


                $('#selectedPoeValueYourMentors').val(ctrlPoeModule.val());

                goal.loadMdlIds({ url: '../../Goal/GetPracticeAreaList' });

                $('#practiceAreaQuestions >div').hide();


                $('#module' + $('#practiceAreas li.selected').data('value')).show();

                $('.goalDateDB').click(function () {

                    $(this).datepicker("show");

                });


                $(".datepicker").datepicker({
                    buttonImage: '../../Images/1439929250_calendar.png',
                    buttonImageOnly: true,
                    buttonText: "Click For The Calendar",
                    changeMonth: true,
                    minDate: 0,
                    changeYear: true,
                    showOn: 'both',
                    dateFormat: 'M d, yy',
                    onSelect: function () {
                        $(this).parent().parent().find('#chooseText').text($(this).val());
                        $(this).parent().parent().find('#dateValue').text($(this).val());


                        $(this).parents('li#loadAllQuestions').addClass('dateSelected');

                        var dateChoosen = $(this).parents('li#loadAllQuestions').find('#dateValue').html();

                        var currentDate = new Date();

                        var start = Date.parse(currentDate);
                        var end = Date.parse(dateChoosen);

                        // end - start returns difference in milliseconds 
                        var diff = new Date(end - start);

                        // get days
                        var days = diff / 1000 / 60 / 60 / 24;

                        if (days <= 7) {

                            //alert('Setting Goal date less than 1 week will not make you to come and reset the goal date again.');
                            $('.popupbg, .goalNotSaved').fadeIn("slow");

                        }


                        var html = '<div class="sleftRatings"> <p>You have set your goal to</p><div><img src="../Images/new/answer4.png"></div><div class="bfrSetGoalDate">Goal Date: ' + $(this).val() + '</div></div>';

                        $(this).parent().parent().parent().find('.sleftRatings').html('');

                        $(this).parent().parent().parent().parent().find('.goalsShared').html('');
                        $(this).parent().parent().parent().parent().find('.goalsShared').hide();


                        $(this).parent().parent().parent().find('#dateSetContent').html(html);


                    }
                });


                $('.goalsShared p').each(function () {

                    var shareGoalContentCount = $(this).html().length;

                    $(this).html($(this).html().substring(0, (shareGoalContentCount - 1)));

                });


            }

            $('.goalEdit').click(function () {

                $(this).parent().removeClass('goalEditDelete');
                $(this).parent().html('');

            });

            $('.goalDelete').click(function () {

                $('.popupbg, .goalDeletePopup').fadeIn("slow");

                var goalDel = $(this);

                goal.deletYesFunction(goalDel);
            });




            $('.goalsSharedClick').click(function () {

                if ($(this).attr('data-value') != 0) {
                    $(this).parent().css('overflow', 'hidden');
                    $(this).parent().css('height', '25px');
                    $(this).css('bottom', '-5px');
                    $(this).attr('data-value', 0);
                    $(this).attr('title', 'View More');
                }
                else {
                    $(this).parent().css('overflow', 'none');
                    $(this).parent().css('height', 'auto');
                    $(this).css('bottom', '-30px');
                    $(this).attr('data-value', 1);
                    $(this).attr('title', 'View Less');
                }



            });


            //$("#status").fadeOut();
            //$("#preloader").fadeOut("slow");

            //Validation Tile Popup //}
            //else {
            //    $('.popupbg, .goalNotSaved').fadeIn("slow");
            //    //alert('You have not saved the goal yet');

            //}


        });




    },

    donePopupClick: function () {

        $('.doneBtn a').click(function () {

            if ($('.doneBtn a').parent().parent().find('li.dateSelected').val() != undefined) {

                $('.cmntpopup,.popupbg, .wallgoal').fadeIn("slow");

                var goalDateSelectedHtml = $('.doneBtn a').parent().parent().find('li.dateSelected');

                var html = '';
                var i = 0;
                $('.dateSelected').each(function () {

                    i = i + 1;
                    var data = $(this);
                    if (data.find('.practiceArea p').text() != "") {

                        var paImg = data.find('.practiceArea img').attr('src').split('.').reverse().slice(1).reverse().join('.');
                        var extData = data.find('.practiceArea img').attr('src');
                        var ext = extData.substring(extData.lastIndexOf('.') + 1);
                    }


                    html = html + '<li id="goalSetDates' + i + '">  <div class="shareQn">' + data.find('.qn').text() + '</div><div class="shareContent">  ' + ((data.find('.practiceArea p').text() == "") ? "" : '<div class="sharePa"><img src="' + paImg + '_S.' + ext + '" alt="Product" /><p>' + data.find('.practiceArea p').text() + '</p></div>') +
                        '<div class="clr"></div><p class="goalShareQn">' + data.find('.goalAnswer').text() + '</p><p class="sharedGoalDate">Goal Date: ' + data.find('#dateValue').text() + '</p>' +
                        '<a class="goalshareBtn"> <img class="shareImg" src="../../Images/icons/network-black.png" /></a></div><div id="questionVal" type="hidden" data-value=' + data.find('div:last').data('value') + '></div><div id="goalSetDateVal" type="hidden" data-value="' + data.find('#dateValue').text() + '"></div><div class="selMgr" id="selMgr' + i + '" type="hidden" data-value="-1"></div></li>';
                });
                $('#goalDateSharedList').html(html);
                $('.scroll3').slimScroll();
                $('.goalshareBtn').click(function () {
                    $('#tempshareid').val($(this).parents().eq(1).find('.selMgr').attr('id'));
                    $('.vs-context-menu').show();
                    Common.ajax({
                        url: '../../Common/GetMyReceiveFbTeam',
                        success: function (response) {
                            var html = "";
                            html = html + '<li class="bold">Share this Goal with:</li><li data-value="-1">Everyone</li>';
                            for (var i = 0; i < response.length; i++) {
                                html = html + "<li data-value= " + response[i].User.UserId + ">" + response[i].User.FirstName + " " + response[i].User.LastName + "</li>";
                            }
                            $('#assignees').html(html);
                        },
                        error: function (err) {
                        }
                    });


                });

                $('.goalshareBtn').vscontext({ menuBlock: 'vs-context-menu' });

                $(".wallgoal").click(
                   function (e) {
                       if ((e.target || e.srcElement).className != "shareImg") {
                           $(".vs-context-menu").hide();
                       }
                   }
               );

                $(".vs-context-menu li").live('click', function () {
                    $('#' + $('#tempshareid').val()).attr('data-value', $(this).attr('data-value'));

                    $(".vs-context-menu").hide();

                });


            }

            else {

                //$('.popupbg, .goalNotSet').fadeIn("slow");
                alert('You have not set any goal date');

            }

        });



    },


    saveGoalClick: function () {

        $("#saveGoals").click(function () {
            var excellenceIndicatorCount = $('.doneBtn a').parent().parent().find('li.dateSelected').length;

            goal.savegoal(excellenceIndicatorCount);

        });


    },

    allPopupCloseClick: function () {

        $('.close,.reply').click(function () {
            $('.poepopup,.popupbg,.poepopupbg,.cmntpopup,.wallgoal,.goalNotSaved,.goalDeletePopup,.goalSavedPopup').fadeOut("slow");
        });

    },


    deletYesFunction: function (option) {

        var del = option;

        $('.delYes').click(function () {

            goal.deleteFunction(del);
            $('.poepopup,.popupbg,.poepopupbg,.cmntpopup,.wallgoal,.goalNotSaved,.goalDeletePopup,.goalSavedPopup').fadeOut("slow");

        });


        $('.delNo').click(function () {

            $('.poepopup,.popupbg,.poepopupbg,.cmntpopup,.wallgoal,.goalNotSaved,.goalDeletePopup').fadeOut("slow");

        });

    },


    deleteFunction: function (option) {


        var questionId = option.find('.quesNo').attr('data-value');
        option.parent().parent().find('.sleftRatings').html('');
        option.parent().parent().find('.goalsShared').css('height', 'auto');
        option.parent().parent().find('.goalsShared').css('overflow', 'hiiden');
        option.parent().parent().find('.goalsShared').html('');
        option.parent().removeClass('goalEditDelete');
        option.parent().removeClass('goalEditDeleteDevlopment');
        option.parent().html('');


        Common.ajaxsync({
            url: "../../Goal/DeleteGoalDate",
            data: { 'questionId': questionId },
            success: function (response) {

            },
            error: function () {
            }
        });

    },

    //loadDropFunctions: function(){

    //    $(".goalDateDB").click(function () {
    //        var X = $(this).attr('id');

    //        if (X == 1) {
    //            //$(this).find(".sendinv").hide();
    //            $(this).find(".sendinv").toggle();
    //            $(this).attr('id', '0');
    //            $(this).css('background', '');
    //        }
    //        else {
    //            $(this).find(".sendinv").toggle();
    //            $(this).attr('id', '1');
    //            $(this).css('background-image', 'url(../../../Images/images/uparrow.png)');
    //        }

    //    });


    //    //Mouseup textarea false
    //    $(".sendinv").mouseup(function () {
    //        return false;
    //    });
    //    $(".goalDateDB").mouseup(function () {
    //        return false;
    //    });

    //    //Textarea without editing.
    //    $(document).mouseup(function () {

    //        $(".sendinv").hide();
    //        $(".addmember").attr('id', '');

    //    });

    //},

    loadModuleIds: function (option) {
        var moduleIds = new Array();
        Common.ajaxsync({
            url: option.url,
            success: function (response) {
                goal.loadPracticeArea({ url: '../../Goal/GetQuestions', response: response });


                $('#totalmodules').val(response.length);
            },
            error: function (err) {
            }
        });
    },

    loadDevlopmentPriorities: function (option) {

        Common.ajaxsync({
            url: option.url,
            success: function (response) {

                goal.loadDevelopQuestionsCount({ response: response });

            },
            error: function (err) {
            }
        });

    },

    loadPracticeArea: function (option) {

        var moduleresponse = option.response;
        var html = "";
        var slidehtml = '';
        var completedhtml = '';
        var questionids = "";
        var hideorshowSlimScroll = (moduleresponse.length - 1) > 6;
        var excellenceIndicatorCount = [];
        for (var m = 0; m < moduleresponse.length; m++) {
            if (moduleresponse[m].ModuleOrderNumber > 0) {
                var moduleid = moduleresponse[m].ModuleId;
                var poemodules = "";

                var practiceArea1 = (moduleresponse.length < 7 ? (7 - moduleresponse.length) : 0);

                poemodules = poemodules + "<li id='li0'><p>Development Priorities</p></li><h2 class='practAerea'>Practice Areas</h2>";

                for (var mt = 0; mt < moduleresponse.length; mt++) {
                    if (moduleresponse[mt].ModuleOrderNumber > 0) {
                        var image = $('#selectedpoeDigdeep').val();
                        var img = $('#selectedpoe').val() + moduleresponse[mt].ModuleOrderNumber;

                        poemodules = poemodules + "<li class='poemodule' id ='li" + (moduleresponse[mt].ModuleOrderNumber + 1) + "' data-value='" + moduleresponse[mt].ModuleId + "' data-imgname='" + image + img + "' data-moduleorder='" + moduleresponse[mt].ModuleOrderNumber + "'>  <div class='icon " + img + "Tile" + ((moduleresponse[mt].ModuleOrderNumber == 1) ? 'select' + img : '') + " limod" + moduleresponse[mt].ModuleOrderNumber + "'> <img src='../../Images/icons/" + image + img + ".png' alt=''></div><p>" + moduleresponse[mt].ModuleName + "</p></li>";
                    }
                }

                if (moduleresponse.length % 2 == 0) {
                    poemodules = poemodules + "<li id ='li" + (moduleresponse.length + 1) + "' data-value=" + (moduleresponse.length + 1) + "' data-moduleorder=" + (moduleresponse.length + 1) + "</li> <div class='icon emptyTile '><p></p>" + "</div>";
                }

                //for (var pa1 = 0; pa1 < practiceArea1; pa1++) {


                //    poemodules = poemodules + "<li id ='li" + (moduleresponse.length + 1) + "' data-value=" + (moduleresponse.length + 1) + "' data-moduleorder=" + (moduleresponse.length + 1) + "</li> <div class='icon emptyTile '><p></p>" + "</div>";
                //}

                poemodules = poemodules + "</ul>" + (hideorshowSlimScroll ? '</div>' : '') + "</div></div>";
                $('#practiceAreas').html(poemodules);
                if (moduleresponse.length > 5) {
                    $('.scroll2').slimScroll();
                }
            }
        }
    },

    HighlightTile: function (obj) {
        var selimg = $(obj).data('imgname')
        $('.poemodule').not('.dummytile').each(function () {
            var imagename = $(this).data('imgname')
            $(this).find('img').attr('src', '../../images/icons/' + imagename + '.png')
        });
        $(obj).find('img').attr('src', '../../images/icons/' + selimg + 'h.png');
    },

    loadMdlIds: function (option) {
        var moduleIds = new Array();
        Common.ajaxsync({
            url: option.url,
            success: function (response) {
                goal.loadQuestionsCount({ url: '../../Goal/GetQuestions', response: response });

                return response;
            },
            error: function (err) {
            }
        });
    },

    savegoal: function (excellenceIndicatorCount) {

        var goalRequests = [];
        var goalRequest = new Requests.GoalShare();
        var QuestionNo = '';
        var SelectedGoalDate = '';


        for (var j = 1; j <= excellenceIndicatorCount; j++) {

            goalRequest = new Requests.GoalShare();
            goalRequest.QuestionId = parseInt($('#goalSetDates' + j + '').find('#questionVal').data('value'));
            goalRequest.SelectedValue = 0;
            goalRequest.SharedWithId = parseInt($('#goalSetDates' + j + '').find('.selMgr').data('value'));
            goalRequest.GoalDate = $('#goalSetDates' + j + '').find('#goalSetDateVal').data('value');
            goalRequests.push(goalRequest);

        }

        Common.ajaxPost({
            url: '/Feedback/SaveGoal',
            data: goalRequests,
            success: function (response) {
                $('.wallgoal').fadeOut("slow");
                $('.goalSavedPopup').fadeIn("slow");
                $('.goalDateSuccessYes').click(function () {
                    $('.poepopup,.popupbg,.poepopupbg,.cmntpopup,.wallgoal,.goalNotSaved,.goalDeletePopup,.goalSavedPopup').fadeOut("slow");
                    var index = $(this).parents().parents().parents().parents().find('#practiceAreas .selected').index();
                    $('#li' + index + '').click();
                    //window.location.href = "../../Goal/SetGoals";
                })
                //alert('Your goals have been shared with everyone you have assigned.');
                //window.location.href = "../../Goal/SetGoals";
            },
            error: function (err) {
            }
        });

    },

    loadDevelopQuestionsCount: function (option) {


        var moduleresponse = option.response;

        if (moduleresponse != 0) {

            var html = '';
            var count = 0;
            html = html + '<div class="scroll1"><ul>';
            for (var m = 0; m < moduleresponse.length; m++) {


                if (moduleresponse[m].ModuleOrderNumber > 0) {
                    var image = $('#selectedpoeDigdeep').val();
                    var img = $('#selectedpoe').val() + moduleresponse[m].ModuleOrderNumber;

                    for (k = 0; k < moduleresponse[m].question.length; k++) {
                        count++;
                        html = html + ' <li id="loadAllQuestions">   <div class="practiceArea"><img src="../../Images/icons/' + image + img + '.png" alt="Product" /><p>' + moduleresponse[m].ModuleName + '</p></div>' +
                        '<div class="clr"></div>  <div class="qn-answer">' +

                       ' <div class="qn">' + moduleresponse[m].question[k].QuestionOrderNumber + '</div><p class="goalAnswer">' + moduleresponse[m].question[k].QuetionText + '</p></div>' +
                        ' <div class="clr"></div>   <div class="managerRating">  <div class="managerPhoto"> <img src="/Uploadify/LoadImageHandler.ashx?id=' + ((moduleresponse[m].question[k].Manager.UserId != 0) ? moduleresponse[m].question[k].Manager.UserId : '0') + '&rnd=' + Math.random() + '" width="45" height="45" alt="User" /> </div>' +
                        '<p>' + ((moduleresponse[m].question[k].Manager.FirstName || moduleresponse[m].question[k].Manager.LastName != null) ? moduleresponse[m].question[k].Manager.FirstName + ' ' + moduleresponse[m].question[k].Manager.LastName + ' have rated you as' : 'Your managers have rated you as') + '</p>   <div class="managerScore"> <img src="../Images/new/answer' + moduleresponse[m].question[k].Answer + '.png" />  </div> ' +
                        '</div> <div class="clr"></div>  <div class="goalDate">' +
                        '<div class="goalDateDB"><div id="chooseText">Choose a Goal Date</div><div id="chooseGoalDate"><input class="datepicker" type="hidden"></div> <div id="dateValue"></div>' +
                        '</div>' +
                        '<div class="clr" id="dateSetContent"></div>' + ((moduleresponse[m].question[k].Goaldate != "") ? '<div class="sleftRatings"> <p>You have set your goal to</p><div><img src="../Images/new/answer4.png" /></div><div class="bfrSetGoalDate">Goal Date: ' + moduleresponse[m].question[k].Goaldate + '<div class="hdnDate" type="hidden" data-value="' + moduleresponse[m].question[k].Goaldate + '"></div></div></div>' : " ") + '</div><div class="clr"></div>';
                        if (moduleresponse[m].question[k].Goaldate != "") {
                            if (moduleresponse[m].question[k].Sharedwith[0] != null) {
                                html = html + '<div class="goalsShared"><p>You have shared this goal with';


                                for (j = 0; j < moduleresponse[m].question[k].Sharedwith.length; j++) {

                                    html = html + ' ' + moduleresponse[m].question[k].Sharedwith[j].FirstName + ' ' + moduleresponse[m].question[k].Sharedwith[j].LastName + ',';

                                }

                                html = html + '</p><span title="View More" data-value="0" class="goalsSharedClick">...</span></div>';
                            }
                            else {


                                html = html + '<div class="goalsShared"><p>&nbsp;</p></div>';


                            }
                        }


                        var start = Date.parse(moduleresponse[m].question[k].SetGoalDate);
                        var end = Date.parse(moduleresponse[m].question[k].Goaldate);

                        // end - start returns difference in milliseconds 
                        var diff = new Date(end - start);

                        // get days
                        var days = diff / 1000 / 60 / 60 / 24;


                        var currentDate = new Date();
                        var currentConvertDate = Date.parse(currentDate);

                        var goalDateReacehedDiff = new Date(end - currentConvertDate);

                        var goalDateReaceheddays = goalDateReacehedDiff / 1000 / 60 / 60 / 24;

                        // if (goalDateReaceheddays.toFixed() != -1) {

                        if (days.toFixed() != 0 && goalDateReaceheddays.toFixed() >= 0) {

                            if (days.toFixed() >= 8) {

                                html = html + ((moduleresponse[m].question[k].Goaldate != "") ? '<span> </span> <div class="goalEditDeleteDevlopment"><a href="#" title="Edit" class="goalEdit" ><img src="../Images/new/goaleditIco.png" /></a><a title="Delete" class="goalDelete" ><img src="../Images/new/goaldeletIco.png" /><div class="quesNo" type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></a></div>' : "") + '<div type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></li>';

                            }

                            else {

                                html = html + ((moduleresponse[m].question[k].Goaldate != "") ? '<span> </span> <div class="goalEditDeleteDevlopment"><div class="quesNo" type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></a></div>' : "") + '<div type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></li>';

                            }

                        }
                        else {

                            html = html + ((moduleresponse[m].question[k].Goaldate != "") ? '<span> </span> <div class="goalEditDeleteDevlopment"><a href="#" title="Edit" class="goalEdit" ><img src="../Images/new/goaleditIco.png" /></a><a title="Delete" class="goalDelete" ><img src="../Images/new/goaldeletIco.png" /><div class="quesNo" type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></a></div>' : "") + '<div type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></li>';

                        }
                        //  }
                        //else {

                        //    html = html + ((moduleresponse[m].question[k].Goaldate != "") ? '<span> </span> <div class="goalEditDeleteDevlopment"><a href="#" class="goalEdit" ><img src="../Images/new/goaleditIco.png" /></a><a class="goalDelete" ><img src="../Images/new/goaldeletIco.png" /><div class="quesNo" type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></a></div>' : "") + '<div type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></li>';

                        //}         

                        if (count % 3 == 0) {
                            html = html + '<div style="clear:both"> </div>';

                        }

                    }

                }


            }
            html = html + '</ul></div>';
            $('#practiceAreaQuestions').html(html);
            $('.scroll1').slimScroll();

            goal.loadDropFunctions();
        }
        else {

            $('.clickText,.doneBtn').hide();
          
            $('.dummy').show();
            
        }
    },


    loadQuestionsCount: function (option) {


        var moduleresponse = option.response;

        if (moduleresponse != 0) {

            var html = '';
            var goalShared = 0;

            for (var m = 0; m < moduleresponse.length; m++) {
                if (moduleresponse[m].ModuleOrderNumber > 0) {
                    var image = $('#selectedpoeDigdeep').val();
                    var img = $('#selectedpoe').val() + moduleresponse[m].ModuleOrderNumber;
                    html = html + '<div id=module' + moduleresponse[m].ModuleId + '><div class="scroll1"><ul>';
                    for (k = 0; k < moduleresponse[m].question.length; k++) {

                        html = html + ' <li id="loadAllQuestions">   <div class="practiceArea"></div>' +
                        '<div class="clr"></div>  <div class="qn-answer">' +

                       ' <div class="qn">' + moduleresponse[m].question[k].QuestionOrderNumber + '</div><p class="goalAnswer">' + moduleresponse[m].question[k].QuetionText + '</p></div>' +
                        ' <div class="clr"></div>   <div class="managerRating">  <div class="managerPhoto"> <img src="/Uploadify/LoadImageHandler.ashx?id=' + ((moduleresponse[m].question[k].Manager.UserId != 0) ? moduleresponse[m].question[k].Manager.UserId : '0') + '&rnd=' + Math.random() + '" width="45" height="45" alt="User" /> </div>' +
                        '<p>' + ((moduleresponse[m].question[k].Manager.FirstName || moduleresponse[m].question[k].Manager.LastName != null) ? moduleresponse[m].question[k].Manager.FirstName + ' ' + moduleresponse[m].question[k].Manager.LastName + ' have rated you as' : 'Your managers have rated you as') + '</p>   <div class="managerScore"> <img src="../Images/new/answer' + moduleresponse[m].question[k].Answer + '.png" />  </div> ' +
                        '  </div> <div class="clr"></div>  <div class="goalDate">' +
                           '<div class="goalDateDB"><div id="chooseText">Choose a Goal Date</div><div id="chooseGoalDate"><input class="datepicker" type="hidden"></div> <div id="dateValue"></div>' +
                            '</div>' +
                        '<div class="clr" id="dateSetContent"></div>' + ((moduleresponse[m].question[k].Goaldate != "") ? '<div class="sleftRatings"> <p>You have set your goal to</p><div><img src="../Images/new/answer4.png" /></div><div class="bfrSetGoalDate">Goal Date: ' + moduleresponse[m].question[k].Goaldate + '<div class="hdnDate" type="hidden" data-value="' + moduleresponse[m].question[k].Goaldate + '"></div></div></div>' : " ") + '</div><div class="clr"></div>';
                        if (moduleresponse[m].question[k].Goaldate != "") {
                            if (moduleresponse[m].question[k].Sharedwith[0] != null) {
                                html = html + '<div class="goalsShared"><p>You have shared this goal with';

                                for (j = 0; j < moduleresponse[m].question[k].Sharedwith.length; j++) {

                                    html = html + ' ' + moduleresponse[m].question[k].Sharedwith[j].FirstName + ' ' + moduleresponse[m].question[k].Sharedwith[j].LastName + ',';

                                }

                                html = html + '</p><span title="View More" data-value="0" class="goalsSharedClick">...</span></div>';

                            }
                            else {

                                html = html + '<div class="goalsShared"><p>&nbsp;</p></div>';
                            }

                        }


                        var start = Date.parse(moduleresponse[m].question[k].SetGoalDate);
                        var end = Date.parse(moduleresponse[m].question[k].Goaldate);

                        // end - start returns difference in milliseconds 
                        var diff = new Date(end - start);

                        // get days
                        var days = diff / 1000 / 60 / 60 / 24;

                        var currentDate = new Date();
                        var currentConvertDate = Date.parse(currentDate);

                        var goalDateReacehedDiff = new Date(end - currentConvertDate);

                        var goalDateReaceheddays = goalDateReacehedDiff / 1000 / 60 / 60 / 24;
                        //if (goalDateReaceheddays.toFixed() != -1) {

                        if (days.toFixed() != 0 && goalDateReaceheddays.toFixed() >= 0) {

                            if (days.toFixed() >= 8) {

                                html = html + ((moduleresponse[m].question[k].Goaldate != "") ? '<span> </span> <div class="goalEditDelete"><a href="#" title="Edit" class="goalEdit" ><img src="../Images/new/goaleditIco.png" /></a><a title="Delete" class="goalDelete" ><img src="../Images/new/goaldeletIco.png" /><div class="quesNo" type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></a></div>' : "") + '<div type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></li>';

                            }

                            else {

                                html = html + ((moduleresponse[m].question[k].Goaldate != "") ? '<span> </span> <div class="goalEditDelete"><div class="quesNo" type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></a></div>' : "") + '<div type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></li>';

                            }

                        }
                        else {

                            html = html + ((moduleresponse[m].question[k].Goaldate != "") ? '<span> </span> <div class="goalEditDelete"><a href="#" title="Edit" class="goalEdit" ><img src="../Images/new/goaleditIco.png" /></a><a title="Delete" class="goalDelete" ><img src="../Images/new/goaldeletIco.png" /><div class="quesNo" type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></a></div>' : "") + '<div type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></li>';

                        }
                        //}
                        //else {

                        //    html = html + ((moduleresponse[m].question[k].Goaldate != "") ? '<span> </span> <div class="goalEditDelete"><a href="#" class="goalEdit" ><img src="../Images/new/goaleditIco.png" /></a><a class="goalDelete" ><img src="../Images/new/goaldeletIco.png" /><div class="quesNo" type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></a></div>' : "") + '<div type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></li>';

                        //}


                        if (k == 2 || k == 5 || k == 8 || k == 11 || k == 14) {
                            html = html + '<div style="clear:both"> </div>';

                        }                     

                    }
                    html = html + '</ul></div></div>';
                }



            }

            $('#practiceAreaQuestions').html(html);


            $('.scroll1').slimScroll();

            goal.loadDropFunctions();
        }
        else {

            $('.clickText,.doneBtn').hide();
           
            $('.dummy').show();


        }

    },

}

function GetUsersPoesArrangement(poeid) {
    Common.ajaxsync({
        url: "/Goal/GetUsersPoesArrangement",
        data: { 'poeid': poeid },
        success: function (response) {
            if (response != null) {
                $('#potentialMentorsType').val(response);
            }
        },
        error: function () {
        }
    });
}
function removeAttrHover() {
    var count = 1;
    $('.poemodule').each(function () {
        if (!$(this).hasClass('selected')) {
            $(this).find('img').attr("src", "../../Images/icons/" + $('#selectedpoeDigdeep').val() + count + ".png");
            //$(this).removeClass("moduleHove");
        }
        count++;
    });
}
