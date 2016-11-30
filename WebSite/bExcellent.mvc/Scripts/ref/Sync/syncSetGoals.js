$(document).ready(function () {

    var poe = $('#selectedPoeValuePotentialMentors').val();


    //$('.headerRight .afterlogin:first').mouseover(function () {
    //    $('#sticky').hide();
    //});
    //$('.headerRight .afterlogin:first').mouseout(function () {
    //    $('#sticky').show();
    //});



    var tempval = 0;
    //if (poe != 0) {
    //    setTimeout(function () {
    //        tempval = 1;
    //        GetUsersPoesArrangement(poe);
    //    }, 50);
    //}

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
        
    
    goal.loadTileClicks();   
    goal.saveGoalClick();  
    
    setTimeout(function () { $('.selectFBtwocol').click(); }, 3000);   
        
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


        $('.chartdiv').live('click', function () {

            if ($('.dateSelected').length == 0) {

                var data = $(this).data('value');                

                goal.loadMdlIds({ url: '../../Goal/GetPracticeAreaList' });

                $('#practiceAreaQuestions >div').hide();

                $('#module' + data).show();

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

                            $(this).parent().parent().parent().parent().find('.goalNotSavedContent').css('display', 'block');

                        }

                        var html = '<div class="sleftRatings"> <p>You have set your goal to</p><div><img src="../Images/new/answer4.png"></div><div class="bfrSetGoalDate"><p>Goal Date: ' + $(this).val() + '</p><a class="goalshareBtn"> <img class="shareImg" src="../../Images/icons/network-black.png"></a></div></div>';

                        $(this).parent().parent().parent().find('.sleftRatings').html('');

                        $(this).parent().parent().parent().parent().find('.goalsShared').html('');
                        $(this).parent().parent().parent().parent().find('.goalsShared').hide();


                        $(this).parent().parent().parent().find('#dateSetContent').html(html);


                        $('.goalshareBtn').vscontext({ menuBlock: 'vs-context-menu' });
                        $('.goalshareBtn').click(function () {
                            $('#tempshareid').val($(this).parent().parent().parent().parent().find('.selMgr').attr('id'));

                            Common.ajax({
                                url: '../../Common/GetMyReceiveFbTeam',
                                success: function (response) {
                                    var html = "";
                                    html = html + '<li class="bold">Share this Goal with:</li><li data-value="-1">Everyone</li>';
                                    for (var i = 0; i < response.length; i++) {
                                        html = html + "<li data-value= " + response[i].User.UserId + ">" + response[i].User.FirstName + " " + response[i].User.LastName + "</li>";
                                    }
                                    $('#assigneess').html(html);
                                    $('.vs-context-menu').show();
                                },
                                error: function (err) {
                                }
                            });
                            

                             $("#practiceAreaQuestions").click(
                                function (e) {
                                    if ((e.target || e.srcElement).className != "shareImg") {
                                        $(".vs-context-menu").hide();
                                    }
                                }
                            );

                            $(".vs-context-menu li").live('click', function () {
                                if ($(this).parent().parent().parent().attr('id') == "setTrackGoal") {

                                    $('#' + $('#tempshareid').val()).attr('data-value', $(this).attr('data-value'));

                                    $(".vs-context-menu").hide();

                                }

                            });

                        });

                    }
                });


                $('.goalsShared p').each(function () {

                    var shareGoalContentCount = $(this).html().length;

                    $(this).html($(this).html().substring(0, (shareGoalContentCount - 1)));

                });

                $('.goalEdit').click(function () {

                    $(this).parent().removeClass('goalEditDelete');
                    $(this).parent().hide();

                });

                $('.goalDelete').click(function () {             

                    $(this).parent().find('.goalEdit').css('display', 'none');
                    $(this).css('display', 'none');

                    $(this).parent().find('.goalDeleteContent').css('display', 'block');                  

                    goal.deletYesFunction();
                });


                $('.goalNotSavedContent a').click(function () {

                    $(this).parent().css('display', 'none');

                });

                $('.goalsSharedClick').click(function () {

                    if ($(this).attr('data-value') != 0) {
                        $(this).parent().css('overflow', 'hidden');
                        $(this).parent().css('height', '22px');
                        $(this).css('bottom', '-5px');
                        $(this).attr('data-value', 0);
                        $(this).attr('title', 'View More');
                    }
                    else {
                        $(this).parent().css('overflow', 'none');
                        $(this).parent().css('height', 'auto');
                        $(this).css('bottom', '-26px');
                        $(this).attr('data-value', 1);
                        $(this).attr('title', 'View Less');
                    }
                    
                });
           
            }
            else {              
                $('.goalNotSavedPopContent').show();
                setTimeout(function () {
                    $('.setGoalIcon').click();
                }, 400);
                $('.notSaved').click(function () {

                    $(this).parent().parent().css('display', 'none');

                });              
            }

            });      
    },
    saveGoalClick: function () {

        $("#saveGoals").click(function () {
            if ($(this).parent().parent().find('li.dateSelected #dateValue').html() != undefined) {

                var excellenceIndicatorCount = $(this).parent().find('li.dateSelected').length;

                goal.savegoal(excellenceIndicatorCount);
            }
            else {

                alert('You have not set any goal date');
            }

        });

    },  

    deletYesFunction: function () {       

        $('.delYes').click(function () {

            var del = $(this);
            goal.deleteFunction(del);

        });

        $('.delNo').click(function () {       

            $(this).parent().parent().parent().find('.goalEdit').css('display', 'block');
            $(this).parent().parent().parent().find('.goalDelete').css('display', 'block');
            $(this).parent().parent().css('display', 'none');

        });

    },


    deleteFunction: function (option) {

        var questionId = option.parent().find('.quesNo').attr('data-value');
        option.parent().parent().parent().parent().find('.sleftRatings').hide();
        option.parent().parent().parent().parent().find('.goalsShared').css('height', 'auto');
        option.parent().parent().parent().parent().find('.goalsShared').css('overflow', 'hiiden');
        option.parent().parent().parent().parent().find('.goalsShared').hide();
        option.parent().parent().parent().removeClass('goalEditDelete');
        option.parent().parent().parent().hide();      

        Common.ajaxsync({
            url: "../../Goal/DeleteGoalDate",
            data: { 'questionId': questionId },
            success: function (response) {

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
                goal.loadPracticeArea({ url: '../../Goal/GetQuestions', response: response });

                $('#totalmodules').val(response.length);
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

                var practiceArea1 = (moduleresponse.length < 5 ? (5 - moduleresponse.length) : 0);

                poemodules = poemodules + "<li id='li0'><p>Development Priorities</p></li><h2 class='practAerea'>Practice Areas</h2>";

                for (var mt = 0; mt < moduleresponse.length; mt++) {
                    if (moduleresponse[mt].ModuleOrderNumber > 0) {
                        var image = $('#selectedpoeDigdeep').val();
                        var img = $('#selectedpoe').val() + moduleresponse[mt].ModuleOrderNumber;



                        poemodules = poemodules + "<li class='poemodule' id ='li" + (moduleresponse[mt].ModuleOrderNumber + 1) + "' data-value='" + moduleresponse[mt].ModuleId + "' data-imgname='" + image + img + "' data-moduleorder='" + moduleresponse[mt].ModuleOrderNumber + "'>  <div class='icon " + img + "Tile" + ((moduleresponse[mt].ModuleOrderNumber == 1) ? 'select' + img : '') + " limod" + moduleresponse[mt].ModuleOrderNumber + "'> <img src='../../Images/icons/" + image + img + ".png' alt=''></div><p>" + moduleresponse[mt].ModuleName + "</p></li>";
                    }
                }

                for (var pa1 = 0; pa1 < practiceArea1; pa1++) {


                    poemodules = poemodules + "<li id ='li" + (moduleresponse.length + 1) + "' data-value=" + (moduleresponse.length + 1) + "' data-moduleorder=" + (moduleresponse.length + 1) + "</li> <div class='icon emptyTile '><p></p>" + "</div>";
                }

                poemodules = poemodules + "</ul>" + (hideorshowSlimScroll ? '</div>' : '') + "</div></div>";
                $('#practiceAreas').html(poemodules);
                $('.scroll2').slimScroll();
            }
        }
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
            
        $('li.dateSelected').each(function () {
            goalRequest = new Requests.GoalShare();
            goalRequest.QuestionId = parseInt($(this).find('div:last').data('value'));
            goalRequest.SelectedValue = 0;
            goalRequest.SharedWithId = parseInt($(this).find('.selMgr').data('value'));
            goalRequest.GoalDate = $(this).find('#dateValue').html();
            goalRequests.push(goalRequest);
           
        });        

        Common.ajaxPost({
            url: '/Feedback/SaveGoal',
            data: goalRequests,
            success: function (response) {
                $('.standingSetGoal').removeClass('dateSelected');
                $('.goalSavedPopContent').css('display', 'block');
                $('.goalDateSuccessYes').click(function () {
                    $(this).parent().parent().css('display', 'none');
                    var chartDivId = $(this).parents().parents().parents('body').find('.selectFBtwocol').attr('id');
                    $('#' + chartDivId + '').click();
                    setTimeout(function () {
                        $('.setGoalIcon').click();
                    }, 2000);         
                });              
             
            },
            error: function (err) {
            }
        });

    },
    loadQuestionsCount: function (option) {

        var moduleresponse = option.response;

        if (moduleresponse != 0) {

            var html = '';
            var goalShared = 0;
            var i = 0;

            for (var m = 0; m < moduleresponse.length; m++) {
                if (moduleresponse[m].ModuleOrderNumber > 0) {
                    var image = $('#selectedpoeDigdeep').val();
                    var img = $('#selectedpoe').val() + moduleresponse[m].ModuleOrderNumber;
                    html = html + '<div id=module' + moduleresponse[m].ModuleId + '><div class="scroll2"><ul>';
                    for (k = 0; k < moduleresponse[m].question.length; k++) {
                        i++;
                        html = html + ' <li id="loadAllQuestions" class="standingSetGoal">   <div class="practiceArea"></div>' +
                        '<div class="clr"></div>  <div class="qn-answer">' +

                       ' <div class="qn">' + moduleresponse[m].question[k].QuestionOrderNumber + '</div><p class="goalAnswer">' + moduleresponse[m].question[k].QuetionText + '</p></div>' +
                        ' <div class="clr"></div>   <div class="managerRating">  <div class="managerPhoto"> <img src="/Uploadify/LoadImageHandler.ashx?id=' + ((moduleresponse[m].question[k].Manager.UserId != 0) ? moduleresponse[m].question[k].Manager.UserId : '0') + '&rnd=' + Math.random() + '" width="45" height="45" alt="User" /> </div>' +
                        '<p>' + ((moduleresponse[m].question[k].Manager.FirstName || moduleresponse[m].question[k].Manager.LastName != null) ? moduleresponse[m].question[k].Manager.FirstName + ' ' + moduleresponse[m].question[k].Manager.LastName + ' have rated you as' : 'Your managers have rated you as') + '</p>   <div class="managerScore"> <img src="../Images/new/answer' + moduleresponse[m].question[k].Answer + '.png" />  </div>' +
                        '  </div> <div class="clr"></div>  <div class="goalDate">' +
                           '<div class="goalDateDB"><div id="chooseText">Choose a Goal Date</div><div id="chooseGoalDate"><input class="datepicker" type="hidden"></div> <div id="dateValue"></div>' +
                            '</div><div class="selMgr" id="selMgr' + i + '" type="hidden" data-value="-1"></div>' +
                        '<div class="clr" id="dateSetContent"></div>' + ((moduleresponse[m].question[k].Goaldate != "") ? '<div class="sleftRatings"> <p>You have set your goal to</p><div><img src="../Images/new/answer4.png" /></div><div class="bfrSetGoalDate">Goal Date: ' + moduleresponse[m].question[k].Goaldate + '<div class="hdnDate" type="hidden" data-value="' + moduleresponse[m].question[k].Goaldate + '"></div></div></div>' : " ") + '</div><div class="clr"></div><div class="goalNotSavedContent" style="display:none"><h3>Setting Goal date for less than one week will not make you to comeback and reset the goal date again.</h3><a herf="#">OK</a></div>';
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

                        if (days.toFixed() != 0 && goalDateReaceheddays.toFixed() >= 0) {

                            if (days.toFixed() >= 8) {

                                html = html + ((moduleresponse[m].question[k].Goaldate != "") ? '<span> </span> <div class="goalEditDelete"><a href="#" title="Edit" class="goalEdit" ><img src="../Images/new/goaleditIco.png" /></a><a title="Delete" class="goalDelete" ><img src="../Images/new/goaldeletIco.png" /><div class="quesNo" type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></a><div class="goalDeleteContent" style="display:none"><h3>Are you sure you want to delete this goal?</h3> <div class="goalsDeletBtn"><a  class="delYes" >Yes</a> <a  class="delNo">No</a><div class="quesNo" type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></div></div>  </div>' : "") + '<div type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></li>';

                            }

                            else {

                                html = html + ((moduleresponse[m].question[k].Goaldate != "") ? '<span> </span>  <div class="goalEditDelete"><div class="quesNo" type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></a></div>' : "") + '<div type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></li>';

                            }

                        }
                        else {

                            html = html + ((moduleresponse[m].question[k].Goaldate != "") ? '<span> </span>  <div class="goalEditDelete"><a href="#" title="Edit" class="goalEdit" ><img src="../Images/new/goaleditIco.png" /></a><a title="Delete" class="goalDelete" ><img src="../Images/new/goaldeletIco.png" /><div class="quesNo" type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></a><div class="goalDeleteContent" style="display:none"><h3>Are you sure you want to delete this goal?</h3> <div class="goalsDeletBtn"><a  class="delYes" >Yes</a> <a  class="delNo">No</a><div class="quesNo" type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></div></div>   </div>' : "") + '<div type="hidden" data-value=' + moduleresponse[m].question[k].QuestionId + '></div></li>';

                        }                     

                        if (k % 2 == 1) {
                            html = html + '<div style="clear:both"> </div>';

                        }

                    

                    }
                    html = html + '</ul></div></div>';
                }



            }

            $('#sticky #practiceAreaQuestions').html(html);


            $('.scroll2').slimScroll();

            goal.loadDropFunctions();
        }
        else {
            $('.dummyBg').show();
            $('.clickText,.doneBtn').hide();
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
