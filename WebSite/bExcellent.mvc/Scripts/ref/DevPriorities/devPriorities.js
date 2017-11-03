$(document).ready(function () {
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $('#coachingDate').datepicker({
        dateFormat: "yy-mm-dd",
        minDate: 0
    });
    $('.clickdeeper').html("View Progress");
    $('.clickdeeper').show();

    devLanding.getPageMode();
    devLanding.GetPOEDetails();
    if ($('#selectedCapMode').val() == "0") {
        $('#capScale').hide();
    }
    if ($('#userMode').val() == 2) {

        devLanding.getTeamMember();
        $('#overallUserList').show();
        devLanding.devPrioritiesTable({ url: '/Development/GetManagerDevPriorities?tmMappingId=' + parseInt($('#usrList li:first').val()), data: { 'mappingId': parseInt($('#usrList li:first').val()) } });
        TextChange(2);
    } else {
        devLanding.LoadManagerName();
        devLanding.devPrioritiesTable({ url: '/Development/GetSelfDevPriorities', data: { 'mappingId': parseInt(0) } });
        $('#coachDateCont').hide();
        TextChange(1);
    }
    $('.profilemenu').on('click', function () {
        var poeid = $('#selectedPoeId').val();
        //alert(poeid);
        if (poeid == 27) {
            window.open("../ExcelTemplates/MSA_MCM_FY17_REP_9-30-16_FINAL.pdf", "_blank");
        }
        if (poeid == 28) {
            window.open("../ExcelTemplates/MSA_PCMM_FY17_REP_9-30-16_FINAL.pdf", "_blank");
        }
        if (poeid == 29) {
            window.open("../ExcelTemplates/MSA_PMM_FY17_REP_9-30-16_FINAL.pdf", "_blank");
        }
        if (poeid == 30) {
            window.open("../ExcelTemplates/MSA_AMM_FY17_REP_2-28-17_FINAL.pdf", "_blank");
        }
        if (poeid == 31) {
            window.open("../ExcelTemplates/Solution Sales Specialist.docx");
        }
        //openWord("../ExcelTemplates/MSA27.docx");
    });
    function openWord(spath) {
        var pause = 0;
        var wdDialogFileOpen = 80;
        var wdApp = new ActiveXObject("Word.Application");
        wdApp.Visible = 'True';
        var wdDoc = wdApp.Documents;
        wdDoc.Open(spath);
        document.form1.submit();
    }
    $('#usrList li').on('click', function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");

        $(this).addClass("selectTiles").siblings().removeClass('selectTiles');
        $('#teammberName').val($(this).find('.user_name').find('p').html().split(" ")[0]);
        $('#fullname').val($(this).find('.user_name').find('p').html());
        devLanding.devPrioritiesTable({ url: '/Development/GetManagerDevPriorities?tmMappingId=' + parseInt($(this).val()), data: { 'mappingId': parseInt($(this).val()) } });
        $('#prioritiesView li:first').click();
        if ($('#userMode').val() == 2) {
            TextChange(2);
        } else {
            TextChange(1);
        }
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    });
    $('#sendRequest').on('click', function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        if ($('#userMode').val() == 2) {
            devLanding.SendSelfFBRequest($('.selectTiles').val());
        } else {
            devLanding.SendManagerRequest();
        }
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    });
    var $demoSlow = $('#animation_demo input.slow');

    var demoTiming = 500;
    var demoChars = [' ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    $demoSlow.flapper({
        width: 1,
        chars: demoChars,
        timing: demoTiming,
    });
    $('#flipView').on('click', function () {
        if ($('#scaleView').is(':visible')) {
            $('#scaleView').hide();
            $('#boardView').show();
            $('#flipView').html('Scale View');
            $('#flipView').addClass('scaleViews');
        } else if ($('#boardView').is(':visible')) {
            $('#boardView').hide();
            $('#scaleView').show();
            $('#flipView').html('Board View');
            $('#flipView').removeClass('scaleViews');
        }
        $('#option_menu').hide(250);
    });
    $('#showscaleView').on('click', function () {
        $('#scaleView').show();
        $('#boardView').hide();
        $('#addClassforhide').removeClass('hidScaleTracker');
        $('#Overallviews').show();
        $('#showTracker').text('Hide Tracker');
        $('#option_menu').hide(250);
    });
    $('#showboardView').on('click', function () {
        $('#boardView').show();
        $('#scaleView').hide();
        $('#addClassforhide').removeClass('hidScaleTracker');
        $('#Overallviews').show();
        $('#showTracker').text('Hide Tracker');
        $('#option_menu').hide(250);
    });
    $('#capScale').on('click', function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        var currentMode = $('#scaleMode').val();
        if (currentMode == 0) {
            $('#scaleMode').val(1);
            $(this).addClass('alterScale');
            $(this).text('Frequency Scale');
            $('#feqScale').text('Capability');
        } else {
            $('#scaleMode').val(0);
            $(this).removeClass('alterScale');
            $(this).text('Capability Scale');
            $('#feqScale').text('Frequency');
        }
        $('#option_menu').hide(250);
        if ($('#userMode').val() == 2) {
            devLanding.devPrioritiesTable({ url: '/Development/GetManagerDevPriorities?tmMappingId=' + parseInt($('.selectTiles').val()), data: { 'mappingId': parseInt($('.selectTiles').val()) } });
        } else {
            devLanding.devPrioritiesTable({ url: '/Development/GetSelfDevPriorities', data: { 'mappingId': parseInt(0) } });
        }
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
        $('#prioritiesView li:first').click();
    });
    $('#prioritiesView li').on('click', function () {
        if ($(this).hasClass("listview")) {
            $(this).addClass('selectList');
            $(this).siblings().removeClass('slecetProfile');
            if ($('#devPrioritiesLength').val() != 0) {
                $('#profileView').hide();
                $('#listView').show();
                $('#blankView').hide();
                $('#coachDateCont,#flipView').show();
                $('#option_menu').removeClass('twoItemsHide');
                if ($('#userMode').val() == 1) {
                    $('#coachDateCont').hide();
                }
            } else {

                $('#Overallviews').hide();
                $('#listView').hide();
                $('#profileView').hide();
                $('#blankView').show();
                $('#coachDateCont,#flipView').hide();
                $('#option_menu').addClass('twoItemsHide');
            }
        } else {
            // alert('dddd');
            $(this).addClass('slecetProfile');
            $(this).siblings().removeClass('selectList');
            if ($('#devPrioritiesLength').val() != 0) {
                $('#listView').hide();
                $('#profileView').show();
                $('#blankView').hide();
                $('#coachDateCont,#flipView').show();
                $('#option_menu').removeClass('twoItemsHide');
                if ($('#userMode').val() == 1) {
                    $('#coachDateCont').hide();
                }
            } else {
                //alert('dddd');
                $('#Overallviews').hide();
                $('#listView').hide();
                $('#profileView').hide();
                $('#blankView').show();
                $('#coachDateCont,#flipView').hide();
                $('#option_menu').addClass('twoItemsHide');
            }
        }
    });
    $(document).click(function (event) {
        if (!$(event.target).hasClass("button_menu")) {
            if (!$(event.target).parents().hasClass("optView") && !$(event.target).parents().hasClass("ui-corner-all")) {
                $('#option_menu').hide(250);
                closeAccordionSection();
                $('#accordion-4').parents('.slimScrollDiv').hide("slow");
                $('#accordion-4').parents('.slimScrollDiv').find('.slimScrollBar').hide();
            }
        }
    });
    var selectedDate = null;
    $("#coachingDate").on("change", function () {
        selectedDate = $(this).val();
    });
    $('#btnDate').on('click', function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        if (selectedDate != null) {
            //alert(selectedDate);
            devLanding.UpdateGoalDate(parseInt($('.selectTiles').val()), selectedDate);
            devLanding.UpdateGoalScale({ url: '/Development/GetTMmemberGoalDate?tmMappingId=' + parseInt($('.selectTiles').val()) });
        } else {
            $('#masterMsgCont').text("Please select a date.");
            $('#overallCont').show();
            //alert("Please select the date");
        }
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    });
    $('#showTracker').on('click', function () {
        if ($('#addClassforhide').hasClass('hidScaleTracker')) {
            $('#addClassforhide').removeClass('hidScaleTracker');
            $(this).text('Hide Tracker');
            $(this).addClass('hideTrace');
            $('#Overallviews').show();
        } else {
            $('#addClassforhide').addClass('hidScaleTracker');
            $('#Overallviews').hide();
            $(this).text('Show Tracker');
            $(this).removeClass('hideTrace');
        }
        $('#option_menu').hide(250);
    });


    $('.accordion-section-title').click(function (e) {
        //$('#accordion-4').slimScroll({
        //    destroy: true
        //});
        var currentAttrValue = $(this).attr('href');
        if ($(e.target).is('.active')) {
            closeAccordionSection();
            if ($(this).hasClass('profilemenu')) {
                $('#accordion-4').parents('.slimScrollDiv').hide("slow");
                $('#accordion-4').parents('.slimScrollDiv').find('.slimScrollBar').hide();
            }

        } else {
            closeAccordionSection();
            $(this).addClass('active');
            $('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
            if ($(this).hasClass('profilemenu')) {
                $('#accordion-4').parents('.slimScrollDiv').show();
                $('#accordion-4').slimscroll();
            }
            else {
                $('#accordion-4').parents('.slimScrollDiv').hide("slow");
                $('#accordion-4').parents('.slimScrollDiv').find('.slimScrollBar').hide();
            }
        }

        e.preventDefault();
    });
    var html = "<li><a href='/Development/Priorities'><span><img src='../../Images/icons/goal-small.png' /></span><p>Priorities</p></a> </li>" +
        "<li><a href='/Development/Progress'><span><img src='../../Images/icons/track-goal-small.png' /></span><p>Progress</p></a> </li>";
    $('#target ul').html(html);
    $("#status").fadeOut();
    $("#preloader").delay(100).fadeOut("slow");
    var poeid = parseInt($('#selectedPoeId').val());
    if (poeid == 15 || poeid == 16 || poeid == 17) {
        $('#dropmenus').show();
    } else {
        $('#dropmenus').show();
    }

});
var devLanding = {
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
    getTeamMember: function () {
        Common.ajaxsync({
            url: '/Development/GetNetworkUsers?type=2',
            success: function (response) {
                // debugger;
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
                //alert($('#usrList li').length);
                if ($('#usrList li').length > 4) {
                    $('#usrList').slimscroll();
                }
                $('#usrList li:first').addClass("selectTiles").siblings().removeClass('selectTiles');
                $('#teammberName').val($('#usrList li:first').find('.user_name').find('p').html().split(" ")[0]);
                $('#fullname').val($('#usrList li:first').find('.user_name').find('p').html());
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
                    for (var i = 0; i < response.length; i++) {
                        var selected1 = "";
                        var selected2 = "";
                        var selected3 = "";
                        var selected4 = "";
                        var selectedRole1 = "";
                        var selectedRole2 = "";
                        var selectedRole3 = "";
                        var selectedRole4 = "";

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
                        var resolution = $(window).width();
                        // alert(resolution);
                        if (resolution <= 1366) {
                            if (response[i].Question.length > 125) {
                                moreText = response[i].Question.substring(0, 125) + "<span class='actionMore'>more..</span>";
                            }
                        }
                        if (resolution > 1366&&resolution <= 1950) {
                            if (response[i].Question.length > 145) {
                                moreText = response[i].Question.substring(0, 145) + "<span class='actionMore'>more..</span>";
                            }
                        }
                        if (resolution > 1950 && resolution <= 3000) {
                            if (response[i].Question.length > 150) {
                                moreText = response[i].Question.substring(0, 150) + "<span class='actionMore'>more..</span>";
                            }
                        }
                        //alert(moreText);
                        var designation = "Manager";
                        if ($('#userMode').val() == 2) {
                            designation = "You";
                        }
                        var name = "";
                        if ($('#teammberName').val() == "") {
                            name = "You";
                        } else {
                            name = $('#teammberName').val();
                        }
                        if ($('#scaleMode').val() == 0) {
                            if (response[i].ManagerResult == 1) {
                                selected1 = "selectManager";
                                selectedRole1 = "<span class='managerSpan'>" + designation + "</span>";
                            } else if (response[i].ManagerResult == 2) {
                                selected2 = "selectManager";
                                selectedRole2 = "<span class='managerSpan'>" + designation + "</span>";
                            } else if (response[i].ManagerResult == 3) {
                                selected3 = "selectManager";
                                selectedRole3 = "<span class='managerSpan'>" + designation + "</span>";
                            } else if (response[i].ManagerResult == 4) {
                                selected4 = "selectManager";
                                selectedRole4 = "<span class='managerSpan'>" + designation + "</span>";
                            }

                            if (response[i].SelfResult == 1) {
                                selected1 = "selectYou";
                                selectedRole1 = selectedRole1 + "<span class='youSpan'>" + name + "</span>";
                            } else if (response[i].SelfResult == 2) {
                                selected2 = "selectYou";
                                selectedRole2 = selectedRole2 + "<span class='youSpan'>" + name + "</span>";
                            } else if (response[i].SelfResult == 3) {
                                selected3 = "selectYou";
                                selectedRole3 = selectedRole3 + "<span class='youSpan'>" + name + "</span>";
                            } else if (response[i].SelfResult == 4) {
                                selected4 = "selectYou";
                                selectedRole4 = selectedRole4 + "<span class='youSpan'>" + name + "</span>";
                            }

                            if (response[i].ManagerCapability == 1) {
                                capselected1 = "selectManager";
                                capselectedRole1 = "<span class='managerSpan'>" + designation + "</span>";
                            } else if (response[i].ManagerCapability == 2) {
                                capselected2 = "selectManager";
                                capselectedRole2 = "<span class='managerSpan'>" + designation + "</span>";
                            } else if (response[i].ManagerCapability == 3) {
                                capselected3 = "selectManager";
                                capselectedRole3 = "<span class='managerSpan'>" + designation + "</span>";
                            } else if (response[i].ManagerCapability == 4) {
                                capselected4 = "selectManager";
                                capselectedRole4 = "<span class='managerSpan'>" + designation + "</span>";
                            }

                            if (response[i].SelfCapability == 1) {
                                capselected1 = "selectYou";
                                capselectedRole1 = capselectedRole1 + "<span class='youSpan'>" + name + "</span>";
                            } else if (response[i].SelfCapability == 2) {
                                capselected2 = "selectYou";
                                capselectedRole2 = capselectedRole2 + "<span class='youSpan'>" + name + "</span>";
                            } else if (response[i].SelfCapability == 3) {
                                capselected3 = "selectYou";
                                capselectedRole3 = capselectedRole3 + "<span class='youSpan'>" + name + "</span>";
                            } else if (response[i].SelfCapability == 4) {
                                capselected4 = "selectYou";
                                capselectedRole4 = capselectedRole4 + "<span class='youSpan'>" + name + "</span>";
                            }

                            //debugger;
                            if (response[i].Rating == 1) {
                                impselected1 = "selectManager";
                                impselectedRole1 = "<span class='managerSpan'>" + designation + "</span>";
                            } else if (response[i].Rating == 2) {
                                impselected2 = "selectManager";
                                impselectedRole2 = "<span class='managerSpan'>" + designation + "</span>";
                            } else if (response[i].Rating == 3) {
                                impselected3 = "selectManager";
                                impselectedRole3 = "<span class='managerSpan'>" + designation + "</span>";
                            } else if (response[i].Rating == 4) {
                                impselected4 = "selectManager";
                                impselectedRole4 = "<span class='managerSpan'>" + designation + "</span>";
                            }

                            if (response[i].SelfRating == 1) {
                                impselected1 = "selectYou";
                                impselectedRole1 = impselectedRole1 + "<span class='youSpan'>" + name + "</span>";
                            } else if (response[i].SelfRating == 2) {
                                impselected2 = "selectYou";
                                impselectedRole2 = impselectedRole2 + "<span class='youSpan'>" + name + "</span>";
                            } else if (response[i].SelfRating == 3) {
                                impselected3 = "selectYou";
                                impselectedRole3 = impselectedRole3 + "<span class='youSpan'>" + name + "</span>";
                            } else if (response[i].SelfRating == 4) {
                                impselected4 = "selectYou";
                                impselectedRole4 = impselectedRole4 + "<span class='youSpan'>" + name + "</span>";
                            }
                            html = html + "<ul><li class='qnumber' style='vertical-align: top;'>" + (i + 1) + "</li><li style='vertical-align: top;'><span class='modNmaeview'>" + response[i].ModuleName + "</span></li> " +
                                "<li><div class='qncontent'>" + moreText + "<div class='hover_content' style='display:none'> " + response[i].Question + " <span> <img src='../../Images/start/hover_arrow.png' /></span> </div></div><div class='clr'></div><div class='dp_fci'><div class='dp_freq'><ul class='frequency_scale'> <li class='" + selected1 + "'>Never " + selectedRole1 + "</li> <li class='" + selected2 + "'>Sometimes " + selectedRole2 + "</li> <li class='" + selected3 + "'>frequently " + selectedRole3 + "</li> " +
                                "<li class='" + selected4 + "'>Always " + selectedRole4 + "</li> </ul></div><div class='dp_capab'><ul class='capability_scale'> <li class='" + capselected1 + "'>Not Ready " + capselectedRole1 + "</li> <li class='" + capselected2 + "'>Somewhat Ready " + capselectedRole2 + "</li> <li class='" + capselected3 + "'>Ready " + capselectedRole3 + "</li> " +
                                "<li class='" + capselected4 + "'>Very Ready " + capselectedRole4 + "</li> </ul></div><div class='dp_importnt'><ul class='important_scale'> <li class='" + impselected1 + "'>Not important " + impselectedRole1 + "</li> <li class='" + impselected2 + "'>Somewhat Important " + impselectedRole2 + "</li> <li class='" + impselected3 + "'>Important " + impselectedRole3 + "</li> " +
                                "<li class='" + impselected4 + "'>Critical " + impselectedRole4 + "</li> </ul></div></div></li>" +
                                "</ul>";
                            //html = html + "<ul><li>" + (i + 1) + "</li><li><span class='modNmaeview'>" + response[i].ModuleName + "</span></li> " +
                            //    "<li><div class='hover_content' style='display:none'> " + response[i].Question + " <span> <img src='../../Images/start/hover_arrow.png' /></span> </div>" + moreText + "</li>" +
                            //    "<li> <ul class='frequency_scale'> <li class='" + selected1 + "'>Never " + selectedRole1 + "</li> <li class='" + selected2 + "'>Sometimes " + selectedRole2 + "</li> <li class='" + selected3 + "'>Frequently " + selectedRole3 + "</li> " +
                            //    "<li class='" + selected4 + "'>Always " + selectedRole4 + "</li> </ul> </li> </ul>";
                        } else {
                            if (response[i].ManagerCapability == 1) {
                                selected1 = "selectManager";
                                selectedRole1 = "<span class='managerSpan'>" + designation + "</span>";
                            } else if (response[i].ManagerCapability == 2) {
                                selected2 = "selectManager";
                                selectedRole2 = "<span class='managerSpan'>" + designation + "</span>";
                            } else if (response[i].ManagerCapability == 3) {
                                selected3 = "selectManager";
                                selectedRole3 = "<span class='managerSpan'>" + designation + "</span>";
                            } else if (response[i].ManagerCapability == 4) {
                                selected4 = "selectManager";
                                selectedRole4 = "<span class='managerSpan'>" + designation + "</span>";
                            }

                            if (response[i].SelfCapability == 1) {
                                selected1 = "selectYou";
                                selectedRole1 = selectedRole1 + "<span class='youSpan'>" + name + "</span>";
                            } else if (response[i].SelfCapability == 2) {
                                selected2 = "selectYou";
                                selectedRole2 = selectedRole2 + "<span class='youSpan'>" + name + "</span>";
                            } else if (response[i].SelfCapability == 3) {
                                selected3 = "selectYou";
                                selectedRole3 = selectedRole3 + "<span class='youSpan'>" + name + "</span>";
                            } else if (response[i].SelfCapability == 4) {
                                selected4 = "selectYou";
                                selectedRole4 = selectedRole4 + "<span class='youSpan'>" + name + "</span>";
                            }

                            html = html + "<ul><li class='qnumber' style='vertical-align: top;'>" + (i + 1) + "</li><li style='vertical-align: top;'><span class='modNmaeview'>" + response[i].ModuleName + "</span></li> " +
                                "<li><div class='qncontent'>" + moreText + "<div class='hover_content' style='display:none'> " + response[i].Question + " <span> <img src='../../Images/start/hover_arrow.png' /></span> </div></div><div class='clr'></div><div class='dp_fci'><div class='dp_freq'><ul class='frequency_scale'> <li class='" + selected1 + "'>Never " + selectedRole1 + "</li> <li class='" + selected2 + "'>Sometimes " + selectedRole2 + "</li> <li class='" + selected3 + "'>frequently " + selectedRole3 + "</li> " +
                                "<li class='" + selected4 + "'>Always " + selectedRole4 + "</li> </ul></div><div class='dp_capab'><ul class='capability_scale'> <li class='selectYou'>Not Ready <span class='youSpan'>Manager</span></li> <li class='selectManager'>Somewhat Ready <span class='managerSpan'>You</span></li> <li class=''>Ready</li> " +
                                "<li class=''>Very Ready</li> </ul></div><div class='dp_importnt'><ul class='important_scale'> <li class='selectYou'>Not important <span class='youSpan'>Manager</span></li> <li class='selectManager'>Somewhat Important <span class='managerSpan'>You</span></li> <li class=''>Important</li> " +
                                "<li class=''>Critical</li> </ul></div></div></li>" +
                                "</ul>";
                        }
                    }
                    $('#devPrioritiesCont').html(html);
                    if (option.data.mappingId != 0) {
                        devLanding.UpdateGoalScale({ url: '/Development/GetTMmemberGoalDate?tmMappingId=' + option.data.mappingId });
                    } else {
                        devLanding.UpdateGoalScale({ url: '/Development/GetSelfGoalDate' });
                    }
                    devLanding.profileviewTable();
                    // $('#Overallviews').show();
                    $('#coachDateCont,#flipView,#trackerArea').show();
                } else {
                    $('#devPrioritiesLength').val(0);
                    $('#Overallviews').hide();
                    $('#listView').hide();
                    $('#profileView').hide();
                    $('#blankView').show();
                    $('#option_menu').addClass('twoItemsHide');
                    $('#coachDateCont,#flipView').hide();
                    $('#trackerArea').hide();
                }
                $('.actionMore').on('mouseover', function () {
                    $(this).parent().find('.hover_content').show();
                });
                $('.actionMore').on('mouseout', function () {
                    $(this).parents().find('.hover_content').hide();
                });
            },
            error: function (err) {
            }
        });
    },
    profileviewTable: function () {
        Common.ajaxsync({
            url: '/Development/ProfileView',
            success: function (response) {
                // debugger;
                if (response != null) {
                    var html = "";
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].ModuleOrderNumber != 0) {
                            html = html + "<div class='content_part'> <div class='practiceArea'> " +
                                "<img src='../../Images/icons/" + $('#selectPoe').val() + response[i].ModuleOrderNumber + ".png'> <p>" + response[i].ModuleName + "</p> </div> <ul>";
                            for (var j = 0; j < response[i].Questions.length; j++) {
                                var select = "";
                                if (response[i].Questions[j].IsBarrierQuestion) {
                                    select = "select_list";
                                }
                                html = html + "<li class=" + select + ">" + response[i].Questions[j].SideBarTitle + "</li>";
                            }
                            html = html + "</ul></div>";
                        }
                    }
                    $('#profileListsView').html(html);
                }
            },
            error: function (err) {
            }
        });
    },
    UpdateGoalScale: function (option) {
        Common.ajaxsync({
            url: option.url,
            success: function (response) {
                //alert(response.StartDate);
           //     debugger;

                $('#tmStartDate').html("Start Date<br />" + response.StartDate);
                $('#tmEndDate').html("Next Coaching Date<br />" + response.EndDate);
                var date = response.EndDate.split('.')[2];
                var endingdate = response.EndDate;
                if (date == 001) {
                    endingdate = "01.07.2017";
                }

                $('#dayRemaining').html(response.RemainingDays + " Days Remaining");
                $('#completedDays').html(response.CompletedDays + " Days Completed");
                var percentage = (response.CompletedDays / response.OverallScore) * 100;
                if (percentage < 15) {
                    $('#completedDays').addClass('blow15');
                } else {
                    $('#completedDays').removeClass('blow15');
                }
                $('#completedScale').css('width', percentage + '%');
                //blow15

                //Load Board view
                //   setTimeout(function () {
                //$header_display.val('FLAPPER').change();
                //Start date
                var splitStartdate = response.StartDate.split('.');
                for (var i = 0; i < splitStartdate[0].length; i++) {
                    $('#date' + (i + 1)).val(splitStartdate[0][i]).change();
                }
                for (var j = 0; j < splitStartdate[1].length; j++) {
                    $('#month' + (j + 1)).val(splitStartdate[1][j]).change();
                }
                for (var k = 0; k < splitStartdate[2].length; k++) {
                    $('#year' + (k + 1)).val(splitStartdate[2][k]).change();
                }
                //End date
                var splitEnddate = endingdate.split('.');
                for (var l = 0; l < splitEnddate[0].length; l++) {
                    $('#coachDate' + (l + 1)).val(splitEnddate[0][l]).change();
                }
                for (var m = 0; m < splitEnddate[1].length; m++) {
                    $('#coachMonth' + (m + 1)).val(splitEnddate[1][m]).change();
                }
                for (var n = 0; n < splitEnddate[2].length; n++) {
                    $('#coachYear' + (n + 1)).val(splitEnddate[2][n]).change();
                }
                //completedDays
                var completedDays = response.CompletedDays.toString();
                if (completedDays.length == 1) {
                    $('#completeddays1').val(0).change();
                    $('#completeddays2').val(0).change();
                    $('#completeddays3').val(completedDays).change();
                } else if (completedDays.length == 2) {
                    $('#completeddays1').val(0).change();
                    var daycount = 2;
                    for (var p = 0; p < completedDays.length; p++) {
                        $('#completeddays' + daycount).val(completedDays[p]).change();
                        daycount++;
                    }
                }
                else if (completedDays.length == 3) {
                    for (var q = 0; q < completedDays.length; q++) {
                        $('#completeddays' + (q + 1)).val(completedDays[q]).change();
                    }
                }
                //Remaining days
                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                var d = new Date();
             //   debugger;
                //var firstDate = new Date(splitStartdate[2], splitStartdate[1], splitStartdate[0]);
                //var secondDate = new Date(splitEnddate[2], splitEnddate[1], splitEnddate[0]);
                var secondDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
                var firstDate = new Date(splitEnddate[2]+"-"+splitEnddate[1]+"-"+ splitEnddate[0]);
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
                //alert(diffDays);
                var remainingDays = diffDays.toString();// response.RemainingDays.toString();
                if (remainingDays.length == 1) {
                    $('#remainingDays1').val(0).change();
                    $('#remainingDays2').val(0).change();
                    $('#remainingDays3').val(remainingDays).change();
                } else if (remainingDays.length == 2) {
                    $('#remainingDays1').val(0).change();
                    var daycount1 = 2;
                    for (var r = 0; r < remainingDays.length; r++) {
                        $('#remainingDays' + daycount1).val(remainingDays[r]).change();
                        daycount1++;
                    }
                }
                else if (remainingDays.length == 3) {
                    for (var s = 0; s < remainingDays.length; s++) {
                        $('#remainingDays' + (s + 1)).val(remainingDays[s]).change();
                    }
                }

                $('#date3').val(0).change();
                $('#date4').val(8).change();
                $('#date5').val(0).change();
                $('#date6').val(1).change();
                $('#date7').val(0).change();
                $('#date8').val(0).change();

                var toggle = false;

                //}, 10);

            },
            error: function (err) {
            }
        });
    },
    UpdateGoalDate: function (tmid, date) {
        Common.ajaxsync({
            url: '/Development/UpdateCoachDate?tmid=' + tmid + '&date=' + date,
            success: function (response) {
                // alert('Date Updated SuccessFully');
                $('#masterMsgCont').text("Coaching date updated successfully");
                $('#overallCont').show();
                $('#option_menu').hide(250);
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
                    $('#selectPoe').val(response.Name.replace("&", "").replace(/\ /g, ""));
                    var html = "<h4>" + response.Name + "</h4><img src='../../Images/KessakuImage/" + response.Name.replace("&", "").replace(/\ /g, "").replace("/", "") + "_pane.png' /><p>" + response.IntroContent + "</p>";//<a  onclick='DownloadPDF()' class='sendRequest'>Download</a>
                    $('#accordion-4').html(html);
                }
            },
            error: function (err) {
            }
        });
    },
    SendSelfFBRequest: function (tmid) {
        Common.ajaxsync({
            url: '../../Feedback/SendInviteToTeam',
            data: { 'teamIds': tmid.toString() },
            success: function (response) {
                //alert('Request send successfully');
                $('#masterMsgCont').text("Request sent successfully to " + $('#fullname').val() + "");
                $('#overallCont').show();
                $('#option_menu').hide(250);
            },
            error: function (err) {
            }
        });
    },
    SendManagerRequest: function () {
        Common.ajaxsync({
            url: '/Development/SendManagerFBRequest',
            success: function (response) {
                // alert('Request send successfully to your manager');
                $('#masterMsgCont').text("Request sent successfully to " + $('#fullname').val() + "");
                $('#overallCont').show();
                $('#option_menu').hide(250);
            },
            error: function (err) {
            }
        });
    }, LoadManagerName: function () {
        Common.ajaxsync({
            url: '/Development/LoadManagerName',
            success: function (response) {
                // alert(response);
                $('#fullname').val(response);
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
        closeAccordionSection();
        $('#accordion-4').parents('.slimScrollDiv').hide("slow");
        $('#accordion-4').parents('.slimScrollDiv').find('.slimScrollBar').hide();
    }
}
function DownloadPDF() {
    var url = '../../SignUp/DownloadPdf?poeid=' + parseInt($('#selectedPoeId').val());
    window.open(url, '_blank');
}
function TextChange(mode) {
    if (mode == 1) {
        $('#reqFeedCont').html("Send request to " + $('#fullname').val() + "");
        $('#nofeedCont').html("Your manager has to give you feedback before you can set goals.");
        $('#listView h2').html("Development Priorities – <span>Based on your Manager’s Feedback.</span>");
    } else {
        $('#reqFeedCont').html("Send " + $('#fullname').val() + " request to Take Feedback");
        $('#nofeedCont').html("Manager feedback required");
        $('#listView h2').html("Development Priorities – <span>Based on your Feedback for the selected Team Member.</span>");
    }
}
function closeAccordionSection() {
    $('.accordion .accordion-section-title').removeClass('active');
    $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
}