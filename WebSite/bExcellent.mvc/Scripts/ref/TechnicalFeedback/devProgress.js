$(document).ready(function () {
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    devProgress.GetPOEDetails();
    devProgress.getPageMode();
    $('.clickdeeper').html("View Priorities");
    $('.clickdeeper').show();
   
    if ($('#userMode').val() == 2) {
        //alert('sdfdfd');
        TextChange(2);
        devProgress.getNetworkUsers({ url: '/Development/GetNetworkUsers?type=2', data: { 'mode': 2 } });
    } else {
        TextChange(1);
        devProgress.getNetworkUsers({ url: '/Development/GetNetworkUsers?type=1', data: { 'mode': 1 } });
    }
    devProgress.loadModules();
    $('#poeModules li').on('click', function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        $(this).addClass('selectAP').siblings().removeClass('selectAP');
        removeImgAttrHover();
        if (parseInt($(this).attr('data-module')) != 0) {
            $(this).find('img').attr("src", "../../Images/icons/" + $('#selectPoe').val().replace("/", "") + $(this).attr('data-order') + "h.png");
        } else {
            $(this).find('img').attr("src", "../../Images/DevPriorities/Progress/develop_iconh.png");
        }
        if ($('#userMode').val() == 2) {
            devProgress.devPrioritiesTable({ url: '/Development/GetTeamDevProgress?tmid=' + parseInt($('.selectTiles').val()) + '&moduleid=' + parseInt($(this).attr('data-module')), data: { 'moduleid': parseInt($(this).attr('data-module')) } });
        } else {
            devProgress.devPrioritiesTable({ url: '/Development/GetManagerDevProgress?tmid=' + parseInt($('.selectTiles').val()) + '&moduleid=' + parseInt($(this).attr('data-module')), data: { 'moduleid': parseInt($(this).attr('data-module')) } });
        }
        $('#option_menu').hide(250);
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    });
    $(document).click(function (event) {
        //alert($(event.target).parents().hasClass("optView"));
        if (!$(event.target).hasClass("button_menu")) {
            if (!$(event.target).parents().hasClass("optView")) {
                $('#option_menu').hide(250);
            }
        }
    });
    $('#usrList li').on('click', function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        $(this).addClass('selectTiles').siblings().removeClass('selectTiles');
        if ($('#userMode').val() == 2) {
            devProgress.devPrioritiesTable({ url: '/Development/GetTeamDevProgress?tmid=' + parseInt($(this).val()) + '&moduleid=0', data: { 'moduleid': 0 } });
        } else {
            devProgress.devPrioritiesTable({ url: '/Development/GetManagerDevProgress?tmid=' + parseInt($(this).val()) + '&moduleid=0', data: { 'moduleid': 0 } });
        }
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    });
    var html = "<li><a href='/Development/Priorities'><span><img src='../../Images/icons/goal-small.png' /></span><p>Priorities</p></a> </li>" +
        "<li><a href='/Development/Progress'><span><img src='../../Images/icons/track-goal-small.png' /></span><p>Progress</p></a> </li>";
    $('#target ul').html(html);
    $('#poeModules li').hover(
      function () {
          removeImgAttrHover();
          if ($(this).attr("data-order") != 0) {
              $(this).find('img').attr("src", "../Images/icons/" + $('#selectPoe').val().replace("/","") + $(this).attr("data-order") + "h" + ".png");
          } else {
              $(this).find('img').attr("src", "../../Images/DevPriorities/Progress/develop_iconh.png");
          }
      }, function () {
          // alert('123')
          removeImgAttrHover();
          if ($(this).attr("data-order") != 0) {
              $('#poeModules>li.selected').find('img').attr("src", "../Images/icons/" + $('#selectPoe').val().replace("/", "") + $('#poeModules>li.selected').attr("data-order") + "h" + ".png");
          } else {
              $('#poeModules>li.selected').find('img').attr("src", "../../Images/DevPriorities/Progress/develop_iconh.png");
          }
      });
    $("#status").fadeOut();
    $("#preloader").delay(100).fadeOut("slow");
});
var devProgress = {
    getPageMode: function () {
        Common.ajaxsync({
            url: '/Development/GetUserMode',
            success: function (response) {
                $('#userMode').val(response);
            },
            error: function (err) {
            }
        });
    },
    getNetworkUsers: function (option) {
        Common.ajaxsync({
            url: option.url,
            success: function (response) {
                var html = "";
                if (response.length != 0) {
                    for (var i = 0; i < response.length; i++) {
                        var score = parseFloat(response[i].WcsiScoreDiff);
                        var scorestr = score > 0 ? "+" + score : score;
                        html = html + "<li id='usrli" + i + "' value=" + response[i].UserPOEMappingId + "> <img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                            " <div class='user_name'> <span>" + scorestr + "</span> <p>" +
                        response[i].User.FirstName + " " + response[i].User.LastName + "</p> </div> </li>";
                    }
                    for (var j = i; j < 4; j++) {
                        html = html + '<li class="poelistlidummy" style="cursor:default"></li>';
                    }
                }
                $('#usrList').html(html);
                if ($('#usrList li').length > 4) {
                    $('#usrList').slimscroll();
                }
                $('#usrList li:first').addClass("selectTiles").siblings().removeClass('selectTiles');
                //alert(option.data.mode);
                if (option.data.mode == 2) {
                    devProgress.devPrioritiesTable({ url: '/Development/GetTeamDevProgress?tmid=' + parseInt($('#usrList li:first').val()) + '&moduleid=0', data: { 'moduleid': 0 } });
                } else {
                    devProgress.devPrioritiesTable({ url: '/Development/GetManagerDevProgress?tmid=' + parseInt($('#usrList li:first').val()) + '&moduleid=0', data: { 'moduleid': 0 } });
                }
                // $('#teammberName').val($('#usrList li:first').find('.user_name').find('p').html().split(" ")[0]);
            },
            error: function (err) {
            }
        });
    },
    devPrioritiesTable: function (option) {
        Common.ajaxsync({
            url: option.url,
            success: function (response) {
                //debugger;
                var html = "";
                if (response != null) {
                    $('#devPrioritiesLength').val(response.length);
                    var count = 1;
                    for (var i = 0; i < response.length; i++) {
                        var selected1 = "";
                        var selected2 = "";
                        var selected3 = "";
                        var selected4 = "";
                        var selectedRole1 = "";
                        var selectedRole2 = "";
                        var selectedRole3 = "";
                        var selectedRole4 = "";
                        var goaldiff = 0;
                        
                        var capselected1 = "";
                        var capselected2 = "";
                        var capselected3 = "";
                        var capselected4 = "";
                        var capselectedRole1 = "";
                        var capselectedRole2 = "";
                        var capselectedRole3 = "";
                        var capselectedRole4 = "";

                        var impselected1 = "";
                        var impselected2 = "";
                        var impselected3 = "";
                        var impselected4 = "";
                        var impselectedRole1 = "";
                        var impselectedRole2 = "";
                        var impselectedRole3 = "";
                        var impselectedRole4 = "";
                        var moreText = response[i].Question; //135
                        //if (response[i].Question.length > 95) {
                        //    moreText = response[i].Question.substring(0, 95) + "<span class='actionMore'>more..</span>";
                        //}
                        var resolution = $(window).width();
                        // alert(resolution);
                        if (resolution <= 1366) {
                            if (response[i].Question.length > 120) {
                                moreText = response[i].Question.substring(0, 120) + "<span class='actionMore'>more..</span>";
                            }
                        }
                        if (resolution > 1366 && resolution <= 1950) {
                            if (response[i].Question.length > 130) {
                                moreText = response[i].Question.substring(0, 130) + "<span class='actionMore'>more..</span>";
                            }
                        }
                        if (resolution > 1950 && resolution <= 3000) {
                            if (response[i].Question.length > 160) {
                                moreText = response[i].Question.substring(0, 160) + "<span class='actionMore'>more..</span>";
                            }
                        }
                        var progressImage = "";
                        if (response[i].CurrrentResult == 1) {
                            selected1 = "selectManager";
                            selectedRole1 = "<span class='managerSpan'>Latest</span>";
                        } else if (response[i].CurrrentResult == 2) {
                            selected2 = "selectManager";
                            selectedRole2 = "<span class='managerSpan'>Latest</span>";
                        } else if (response[i].CurrrentResult == 3) {
                            selected3 = "selectManager";
                            selectedRole3 = "<span class='managerSpan'>Latest</span>";
                        } else if (response[i].CurrrentResult == 4) {
                            selected4 = "selectManager";
                            selectedRole4 = "<span class='managerSpan'>Latest</span>";
                        }

                        if (response[i].PreviousResult == 1) {
                            selected1 = "selectYou";
                            selectedRole1 = selectedRole1 + "<span class='youSpan'>PREVIOUS </span>";
                        } else if (response[i].PreviousResult == 2) {
                            selected2 = "selectYou";
                            selectedRole2 = selectedRole2 + "<span class='youSpan'>PREVIOUS </span>";
                        } else if (response[i].PreviousResult == 3) {
                            selected3 = "selectYou";
                            selectedRole3 = selectedRole3 + "<span class='youSpan'>PREVIOUS </span>";
                        } else if (response[i].PreviousResult == 4) {
                            selected4 = "selectYou";
                            selectedRole4 = selectedRole4 + "<span class='youSpan'>PREVIOUS </span>";
                        }

                        if (response[i].CurrrentCapability == 1) {
                            capselected1 = "selectManager";
                            capselectedRole1 = "<span class='managerSpan'>Latest</span>";
                        } else if (response[i].CurrrentCapability == 2) {
                            capselected2 = "selectManager";
                            capselectedRole2 = "<span class='managerSpan'>Latest</span>";
                        } else if (response[i].CurrrentCapability == 3) {
                            capselected3 = "selectManager";
                            capselectedRole3 = "<span class='managerSpan'>Latest</span>";
                        } else if (response[i].CurrrentCapability == 4) {
                            capselected4 = "selectManager";
                            capselectedRole4 = "<span class='managerSpan'>Latest</span>";
                        }

                        if (response[i].PreviousCapability == 1) {
                            capselected1 = "selectYou";
                            capselectedRole1 = capselectedRole1 + "<span class='youSpan'>PREVIOUS </span>";
                        } else if (response[i].PreviousCapability == 2) {
                            capselected2 = "selectYou";
                            capselectedRole2 = capselectedRole2 + "<span class='youSpan'>PREVIOUS </span>";
                        } else if (response[i].PreviousCapability == 3) {
                            capselected3 = "selectYou";
                            capselectedRole3 = capselectedRole3 + "<span class='youSpan'>PREVIOUS </span>";
                        } else if (response[i].PreviousCapability == 4) {
                            capselected4 = "selectYou";
                            capselectedRole4 = capselectedRole4 + "<span class='youSpan'>PREVIOUS </span>";
                        }

                        if (response[i].CurrrentImportance == 1) {
                            impselected1 = "selectManager";
                            impselectedRole1 = "<span class='managerSpan'>Latest</span>";
                        } else if (response[i].CurrrentImportance == 2) {
                            impselected2 = "selectManager";
                            impselectedRole2 = "<span class='managerSpan'>Latest</span>";
                        } else if (response[i].CurrrentImportance == 3) {
                            impselected3 = "selectManager";
                            impselectedRole3 = "<span class='managerSpan'>Latest</span>";
                        } else if (response[i].CurrrentImportance == 4) {
                            impselected4 = "selectManager";
                            impselectedRole4 = "<span class='managerSpan'>Latest</span>";
                        }

                        if (response[i].PreviousImportance == 1) {
                            impselected1 = "selectYou";
                            impselectedRole1 = impselectedRole1 + "<span class='youSpan'>PREVIOUS </span>";
                        } else if (response[i].PreviousImportance == 2) {
                            impselected2 = "selectYou";
                            impselectedRole2 = impselectedRole2 + "<span class='youSpan'>PREVIOUS </span>";
                        } else if (response[i].PreviousImportance == 3) {
                            impselected3 = "selectYou";
                            impselectedRole3 = impselectedRole3 + "<span class='youSpan'>PREVIOUS </span>";
                        } else if (response[i].PreviousImportance == 4) {
                            impselected4 = "selectYou";
                            impselectedRole4 = impselectedRole4 + "<span class='youSpan'>PREVIOUS </span>";
                        }
                        if (response[i].PreviousResult != 0) {
                            goaldiff = (response[i].CurrrentResult) - (response[i].PreviousResult);
                            switch (goaldiff) {
                                case 0:
                                    progressImage = "<img src='../../Images/DevPriorities/Progress/progress_nill.png' />";
                                    break;
                                case 1:
                                    progressImage = "<img src='../../Images/DevPriorities/Progress/progress_arrowY1.png' />";
                                    break;
                                case 2:
                                    progressImage = "<img src='../../Images/DevPriorities/Progress/progress_arrowY2.png' />";
                                    break;
                                case 3:
                                    progressImage = "<img src='../../Images/DevPriorities/Progress/progress_arrowY3.png' />";
                                    break;
                                case -1:
                                    progressImage = "<img src='../../Images/DevPriorities/Progress/progress_arrowR1.png' />";
                                    break;
                                case -2:
                                    progressImage = "<img src='../../Images/DevPriorities/Progress/progress_arrowR2.png' />";
                                    break;
                                case -3:
                                    progressImage = "<img src='../../Images/DevPriorities/Progress/progress_arrowR3.png' />";
                                    break;
                                default:
                            }
                        } else {
                            progressImage = "<img src='../../Images/DevPriorities/Progress/progress_nill.png' />";
                        }
                        if (response[i].IsDevelopmentPriorities || option.data.moduleid != 0) {
                            var select = "";
                            if (response[i].IsDevelopmentPriorities && option.data.moduleid != 0) {
                                select = "select_list";
                            }
                           
                            html = html + "<ul class=" + select + "><li class='dp_no' style='vertical-align: top;'>" + count + "</li><li class='dp_practicearea' style='vertical-align: top;'><span class='modNmaeview'>" + response[i].ModuleName + "</span></li> " +
                                "<li class='dp_qetions'><div>" + moreText + "<div class='hover_content' style='display:none'> " + response[i].Question + " <span> <img src='../../Images/start/hover_arrow.png' /></span> </div></div><div class='clr'></div></li><li>fasdf adsfa sfasdfafd adsf adsfa sdfas df asdf afda fs</li><li><div class='dp_fci'><div class='dp_freq'><ul class='frequency_scale'> <li class='" + selected1 + "'>Never " + selectedRole1 + "</li> <li class='" + selected2 + "'>Sometimes " + selectedRole2 + "</li> <li class='" + selected3 + "'>Frequently " + selectedRole3 + "</li> " +
                                "<li class='" + selected4 + "'>Always " + selectedRole4 + "</li> </ul> </div></div></li>" + "<li class='dp_frqprogress'>" + progressImage + "</li> </ul>";
                            count++;
                        }
                    }
                    //debugger;
                    $('#devprogress').html(html);
                    if (option.data.moduleid == 0) {
                        //alert('in');
                        $('#poeModules li:first').addClass('selectAP').siblings().removeClass('selectAP');
                        removeImgAttrHover();
                       // setTimeout(function () {
                             $("#poeModules li:first").find('img').attr("src", "../../Images/DevPriorities/Progress/develop_iconh.png");
                       // }, 1000);

                        //../../Images/DevPriorities/Progress/develop_iconh.png
                    }
                    $('#progressfreq').show();
                    $('#blankView').hide();
                } else {
                    $('#progressfreq').hide();
                    $('#blankView').show();

                }
                $('.actionMore').on('mouseover', function() {
                    $(this).parent().find('.hover_content').show();
                });
                $('.actionMore').on('mouseout', function () {
                    $(this).parents().find('.hover_content').hide();
                });
                if(response.length>=8) {
                    $('#devprogress').slimscroll();
                }
            },
            error: function (err) {
            }
        });
    },
    GetPOEDetails: function () {
        Common.ajaxsync({
            url: '/Development/GetSelectedPoe',
            success: function (response) {
                if (response != null) {
                    $('#selectPoe').val(response.Name.replace("&", "").replace(/\ /g, "").replace("/", ""));
                }
            },
            error: function (err) {
            }
        });
    },
    loadModules: function () {
        Common.ajaxsync({
            url: '/Development/GetPracticeArea',
            success: function (response) {
                var html = "<li class='selectAP' data-module='0' data-order='0'> <img src='../../Images/DevPriorities/Progress/develop_iconh.png' /> <p>Development Priorities </p> </li>";
                for (var i = 0; i < response.length; i++) {
                    if (response[i].ModuleOrderNumber != 0) {
                        html = html + "<li data-module=" + response[i].ModuleId + " data-order=" + response[i].ModuleOrderNumber + "><img src='../../Images/icons/" + $('#selectPoe').val().replace("/", "") + response[i].ModuleOrderNumber + ".png'><p>" + response[i].ModuleName + "</p></li>";
                        $('#poeModules').html(html);
                    }
                }
            },
            error: function (err) {
            }
        });
    },
};
function Show_Div(optionMenu) {
    if (false == $(optionMenu).is(':visible')) {
        $(optionMenu).show(250);
    }
    else {
        $(optionMenu).hide(250);
    }
}
function removeImgAttrHover() {
    var count = 1;
    if (!$('#poeModules li:first').hasClass('selectAP')) {
        $('#poeModules li:first').find('img').attr("src", "../../Images/DevPriorities/Progress/develop_icon.png");
    }
    $('#poeModules li').not(':first').each(function () {
        var img = $('#selectPoe').val().replace("/", "") + count;
        if (!$(this).hasClass('selectAP')) {
            $(this).find("img").attr("src", "../Images/icons/" + img + ".png");
        }
        count++;
    });
}
function removeAttrHover() {
    var count = 1;
    $('#poeModules li').each(function () {
        if (!$(this).hasClass('selected')) {
            $(this).find('img').attr("src", "../Images/icons/" + $('#selectPoe').val().replace("/", "") + count + ".png");
        }
        count++;
    });
}
function TextChange(mode) {
    if (mode == 1) {
        $('#reqFeedCont').html("Send request to Manager");
        $('#nofeedCont').html("Your manager has to give you feedback before you can set goals.");
        $('#tblHeader').html("Development Progress – <span>Progress made since your last Manager Feedback.</span>");
    } else {
        $('#reqFeedCont').html("Send request to self feedback");
        $('#nofeedCont').html("Manager feedback required");
        $('#tblHeader').html("Development Progress – <span>Compare your previous and latest Feedback for the selected Team Member.</span>");
    }
}