var completed_feedback = {
    //loadPoeName: function () {
    //    Common.ajaxsync({
    //        url: "../../Common/GetPoeName",
    //        // data: option.data,
    //        beforeSend: function () {
    //            $("#status").fadeIn();
    //            $("#preloader").delay(100).fadeIn("slow");
    //        },
    //        success: function (response) {
    //            $("#status").fadeOut();
    //            $("#preloader").delay(100).fadeOut("slow");
    //            $('#selectedpoe').val(response);
    //        },
    //        error: function (err) {
    //            // window.location = "../Home/ErrorMsg";
    //        }
    //    });
    //},
    loadModuleIds: function(option) {
        var moduleIds = new Array();
        Common.ajaxsync({
            url: option.url,
            beforeSend: function() {
                $("#status").fadeIn();
                $("#preloader").delay(100).fadeIn("slow");
            },
            success: function(response) {
                var moduleResponseLength = response.length;
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
                var module = "";
                var modulehdnstr = "";
                var modulehidden = "";
                for (var i = 0; i < response.length; i++) {
                    moduleIds[response[i].ModuleOrderNumber] = response[i].ModuleId;
                    modulehidden = modulehidden + "<input type='hidden' id='modulehdn" + (i + 1) + "' value=" + response[i].ModuleId + " />";

                    if (response[i].ModuleOrderNumber > 0) {
                        var img = (response[i].ModuleOrderNumber == 1) ? $('#selectedpoe').val() + response[i].ModuleOrderNumber + 'h' : $('#selectedpoe').val() + response[i].ModuleOrderNumber;
                        module = module + "<li id ='li" + response[i].ModuleOrderNumber + "' data-moduleno = '" + response[i].ModuleOrderNumber + "' data-value=" + response[i].ModuleId + "  class='" + ((response[i].ModuleOrderNumber == 1) ? ' selected' : '') + "'><img src=\"../../Images/icons/" + img + ".png\" alt=\"Blogs\"/><p>" + response[i].ModuleName + "</p></li>";
                    }
                    if (response[i].ModuleOrderNumber > 0) {
                        var img = $('#selectedpoe').val() + response[i].ModuleOrderNumber;
                        modulehdnstr = modulehdnstr + "<li id ='lihdn" + response[i].ModuleOrderNumber + "><img src=\"../../Images/icons/" + img + ".png\" alt=\"Blogs\"/><p>" + response[i].ModuleName + "</p></li>";
                    }
                }
                var practiceArea1 = (response.length < 7 ? (7 - response.length) : 0);
                if ((response.length - 1) <= 6) {
                    //$('#poemodule').parent('div').removeClass('scroll1');
                    $('#poemodule').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                    //$('#poemodule').parents('.slimScrollDiv').find('.slimScrollRail').remove();
                } else {
                    $('#poemodule').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                }
                //for (var pa1 = 0; pa1 < practiceArea1; pa1++) {
                //    module = module + "<li id ='li" + (moduleResponseLength + pa1) + "' data-value=''  class='takesf emptyTile'><p></p><img src='' width='64' height='50'  class='img' />" + "</li>";
                //    modulehdnstr = modulehdnstr + "<li id ='lihdn" + (moduleResponseLength + pa1) + "' class='takesf emptyTile'><p></p><img src='' width='64' height='50'  class='img' />" + "</li>";
                //}

                $('#nextmodule').val(modulehdnstr);
                $('#modules').html(modulehidden);
                module = module + "";
                $('#poemodule').html(module);
                completed_feedback.loadcontrols();
                $('#totalmodules').val(response.length);
                completed_feedback.loadQuickViewPAQuestions({ url: '../../Feedback/GetQuestions', response: response });
            },
            error: function(err) {
                //window.location = "../Home/ErrorMsg";
            }
        });
    },
    loadcontrols: function() {
        $('#poemodule li').click(function() {
            $('#poemodule li').removeClass('selected');
            $('#poemodule li').each(function(index, item) {
                $(item).find('img').attr('src', '../../Images/icons/' + $('#selectedpoe').val() + $(this).data('moduleno') + '.png');
            });
            $(this).find('img').attr('src', '../../Images/icons/' + $('#selectedpoe').val() + $(this).data('moduleno') + 'h.png');
            $(this).addClass('selected');
            $('.questioncontainer').hide();
            $('#m' + $(this).data('value')).show();
        });
    },
    loadQuickViewPAQuestions: function(option) {
        //debugger;
        var poeresult = completed_feedback.loadCompletedFeedbackResults();
        var moduleresponse = option.response;
        var html = "";
        var questionids = "";
        var hideorshowSlimScroll = (moduleresponse.length - 1) > 6;
        var excellenceIndicatorCount = [];
        for (var m = 0; m < moduleresponse.length; m++) {
            var questionidspermodule = "";
            if (moduleresponse[m].ModuleOrderNumber > 0) {
                var moduleid = moduleresponse[m].ModuleId;
                var modulehtml = "<div id='m" + moduleid + "'" + ((m != 1) ? "style=display:none;" : "") + " class='questioncontainer'>";

                var practiceArea1 = (moduleresponse.length < 7 ? (7 - moduleresponse.length) : 0);

                Common.ajaxsync({
                    url: option.url,
                    data: { 'moduleId': moduleid },
                    success: function(response) {
                        excellenceIndicatorCount.push(response.length);
                        for (var i = 0; i < response.length; i++) {
                            questionids = questionids + response[i].QuestionId + ",";
                            note = ((poeresult[response[i].QuestionId] != undefined && poeresult[response[i].QuestionId].Notes != null) ? poeresult[response[i].QuestionId].Notes : '');
                            questionidspermodule = questionidspermodule + response[i].QuestionId + ",";
                            modulehtml = modulehtml + "<div class='rcnQestionArea'><div class='rcnQestion'><div class='rcnNote'><div class='qn'>" + response[i].QuestionOrderNumber + "</div>" +
                                "<h2>" + response[i].ShortQuetionText + "</h2><p id = 'pnote" + response[i].QuestionId + "'" + ((note == '') ? "style='display:none'" : '') + ">" + note + "</p>" +
                                "<textarea id = 'tnote" + response[i].QuestionId + "'" + ((note != '') ? "style='display:none'" : '') + " class='notesInput' placeholder='Enter your Notes...' >" + note + "</textarea></div><div class='editDelet'>" +
                                "<a id ='savenote" + response[i].QuestionId + "'" + ((note != '') ? "style='display:none'" : '') + " href='javascript:;' class='saveBtn' onclick=completed_feedback.SaveNote('" + response[i].QuestionId + "')>Save</a></div>" +
                                "<div id ='editnote" + response[i].QuestionId + "'" + ((note == '') ? "style='display:none'" : '') + " class='editDelet'> <a onclick=completed_feedback.EditNote('" + response[i].QuestionId + "') href='javascript:;' class='editBtn'></a>" +
                                "<a onclick=completed_feedback.DeleteNote('" + response[i].QuestionId + "') href='javascript:;' class='deletBtn'></a></div>" +
                                "</div></div>";
                        }
                    },
                    error: function(err) {
                    }
                });

                modulehtml = modulehtml + "</div> <input type='hidden' id='mq" + moduleresponse[m].ModuleOrderNumber + "' value=" + questionidspermodule + " />";
                html = html + modulehtml;

                var loadedPA = $('#target ul').html();
                var newcompletedPA = '';

                var img = $('#selectedpoe').val() + moduleresponse[m].ModuleOrderNumber;
                if ($('#lit' + moduleresponse[m].ModuleOrderNumber).size() == 0) {
                    newcompletedPA = "<li id=lit" + moduleresponse[m].ModuleOrderNumber + " class='submenu'><a href='javascript:self_feedback.loadCompleted(" + moduleresponse[m].ModuleOrderNumber + ")'><span><img src='../../Images/icons/" + img + "-small.png' /></span><p>" + moduleresponse[m].ModuleName + "</p></a></li>";
                }
                $('#target ul').html(loadedPA + newcompletedPA);
            }
        }

        var practiceArea = (moduleresponse.length < 7 ? (7 - moduleresponse.length) : 0);

        $('.pageholder').hide().fadeIn('slow');
        $('#poemodule').nextAll('div').remove();
        $('#poemodule').after('<div style="clear:both"></div><div class="scroll2">' + html + '<div></div>').fadeIn('slow');
        $('.scroll2').slimscroll();

        $('#moduleid').val(moduleresponse[1].ModuleId);
        //self_feedback.loadTopmmebers(moduleresponse[1].ModuleId);
        $('#selectedmodulename').val(moduleresponse[1].ModuleName);

        $('.submenu').hide();
        $('#questionids').val(questionids);
        //self_feedback.loaddetailslider(questionids);

        /* ---------------------Hiding slim scroll fro excellence indicator---------------------*/
        for (var x = 0; x < moduleresponse.length - 1; x++) {
            if (excellenceIndicatorCount[x] <= 5) {
                //$('#m' + (x + 1)).find('.contentholder').find('.feedheight').removeClass('scroll2');
                $('#m' + (x + 1)).find('.contentholder').find('.feedheight').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                //$('#m' + (x + 1)).find('.contentholder').find('.feedheight').parents('.slimScrollDiv').find('.slimScrollRail').remove();
            } else {
                $('.feedheight').parents('.slimScrollDiv').find('.slimScrollBar').hide();
            }
        }
        if (hideorshowSlimScroll) {
            $('#quickFeed').parents('.slimScrollDiv').find('.slimScrollBar').hide();
        }
        /*-------------------------------------------------*/
    },
    loadCompletedFeedbackResults: function() {
        var poeresult = '';
        Common.ajaxsync({
            url: '../../Feedback/GetCompletedFeedbackResults?feedbackId=' + $('#feedbackid').val(),
            success: function(resp) {
                poeresult = resp;
            }
        });
        return poeresult;
    },
    EditNote: function(QuestionId) {
        $('#pnote' + QuestionId + ',#editnote' + QuestionId).hide();
        $('#tnote' + QuestionId + ',#savenote' + QuestionId).show();
    },
    DeleteNote: function(QuestionId) {
        if (confirm('Are You sure want to delete this note')) {
            completed_feedback.UpdateFeedbackNotes(QuestionId, '');
            $('#pnote' + QuestionId + ',#editnote' + QuestionId).hide();
            $('#tnote' + QuestionId + ',#savenote' + QuestionId).show();
            $('#tnote' + QuestionId).val('');
            $('#pnote' + QuestionId).html('');
        }
    },
    SaveNote: function(QuestionId) {
        completed_feedback.UpdateFeedbackNotes(QuestionId, $('#tnote' + QuestionId).val());
        $('#pnote' + QuestionId + ',#editnote' + QuestionId).show();
        $('#tnote' + QuestionId + ',#savenote' + QuestionId).hide();
        $('#pnote' + QuestionId).html($('#tnote' + QuestionId).val());
    },
    UpdateFeedbackNotes: function(QuestionId, Notes) {
        Common.ajaxSyncPost({
            url: '../../Feedback/UpdateFeedbackNotes',
            data: { questionid: QuestionId, Notes: Notes, FeedbackId: $('#feedbackid').val() },
            success: function(response) {
                // alert('Note Saved');
            },
            error: function(err) {
                alert('Error occured while updating');
            }
        });
    },
    loadTeammembers: function() {
        Common.ajaxsync({
            url: '../../Feedback/LoadTeammembers',
            success: function(resp) {
                if (resp.length > 1) {
                    var html = '';
                    for (var i = 0; i < resp.length; i++) {
                        html += '<li data-value="' + resp[i].Teammember.User.UserId + '" class="userconnect ' + ((i == 0) ? "msgsmallselectArrow" : "") + '" data-feedbackid ="' + resp[i].FeedBackId + '" ><a href="javascript:;">' +
                            '<img src="/Uploadify/LoadImageHandler.ashx?id=' + resp[i].Teammember.User.UserId + '"/>' +
                            '<p class="spanname">' + resp[i].Teammember.User.FirstName + " " + resp[i].Teammember.User.LastName + '</p></a></li>'
                    }
                    $('#teammembers').html(html);
                } else {
                    $('#sticky').hide();
                }
            }
        });
    },
    loadControls: function() {
        $('.networkTile ul li').click(function() {
            if ($(this).attr('id') != "returnStart") {
                $('.networkTile ul li').each(function(index, item) {
                    var itemid = $(item).attr('id');
                    $(item).find('img').attr('src', '../../Images/fc/' + itemid.replace('Select', '') + '.png');
                });
                var id = $(this).attr('id');
                $('.networkTile ul li').removeClass('selected');
                $(this).addClass('selected');

                $(this).find('img').attr('src', '../../Images/fc/' + id + 'Select.png');
                $('.completeFBRight').hide();
                $('#' + id + 'container').show();
                $('#seletedtilevalue').text($('#' + id + 'container h1').text());
            }
        });
        $('#report_file_hid').change(function() {
            if ($('#report_file_hid').val().split('\\').length > 0) {
                $('#report_file').val($('#report_file_hid').val().split('\\').pop());
            }
        });
        $('#sendReport').click(function() {
            completed_feedback.ReportIssue();
        });
        $('#report_file').click(function() {

        });
        $('#sendfbexp').click(function() {
            completed_feedback.saveFbExperience();
        });
    },
    loadyammerFeed: function() {
        Common.ajaxtxt({
            url: '../../Feedback/YammerTest',

            success: function(resp) {
                var html = '';
                for (var t = 0; t < resp.messages.Count; t++) {
                    var message = resp.messages[t];
                    if (resp.messages[t].attachments.Count > 0) {
                        html += resp.messages[t].created_at + ' from' + resp.messages[t].client_type;
                        html += '<h1>' + resp.messages[t].created_at + '</h1>';
                        html += '<img src = "' + resp.messages[t].attachments[0].thumbnail_url + '">'
                    }
                }
                $('#feedcontainer').html(html);
            }
        });
    },
    ReportIssue: function() {
        if ($('#subject_report').val() == "") {
            $('#masterMsgCont').text("Please enter subject");
            $('#overallCont').show();
            //alert('Please enter subject');
        } else if ($('#content_report').val() == "") {
            $('#masterMsgCont').text("Please enter content");
            $('#overallCont').show();
            // alert('Please enter content');
        } else {
            $('#report_form').ajaxSubmit({
                beforeSubmit: function() {
                    $("#status").fadeIn();
                    $("#preloader").delay(100).fadeIn("slow");
                },
                success: function() {
                    $("#status").fadeOut();
                    $("#preloader").delay(100).fadeOut("slow");
                    //alert('Issue reported');
                    $('#masterMsgCont').text("Issue reported");
                    $('#overallCont').show();
                    document.getElementById("report_form").reset();
                },
                error: function() {
                    alert('Error occur while sending mail');
                }
            });
        }
    },
    GetFbExperienceQuestions: function() {
        Common.ajaxsync({
            url: '../../Feedback/GetFbExperienceQuestions',
            success: function(resp) {
                var html = '';
                for (var i = 0; i < resp.length; i++) {
                    html += '<li><span>' + (i + 1) + '</span> <p>' + resp[i].QuetionText + '</p><div class="clr"></div>' +
                        '<div id="Qno' + (i + 1) + '" data-question="' + resp[i].QuestionId + '" style=\'width: 562px; height: 50px; cursor: pointer;\' class=\'sliderdiv expQuestions'+(i+1)+'\'>' +
                        '<img src=\'../../Images/img/feedbackEX_slider' + (i + 1) + '.png\'></div>';
                }
                $('.fbexperienceQn').html(html);
                $('.sliderdiv').slider({
                    min: 0,
                    max: 4,
                    value: 0,
                    range: "min",
                    slide: function(event, ui) {
                        if (ui.value != 0) {
                            if ($(this).hasClass('expQuestions1'))
                            {
                                $(this).find('.ui-slider-range').removeClass('expQuestions11');
                                $(this).find('.ui-slider-range').removeClass('expQuestions12');
                                $(this).find('.ui-slider-range').removeClass('expQuestions13');
                                $(this).find('.ui-slider-range').removeClass('expQuestions14');
                            }
                            if ($(this).hasClass('expQuestions2')) {
                                $(this).find('.ui-slider-range').removeClass('expQuestions21');
                                $(this).find('.ui-slider-range').removeClass('expQuestions22');
                                $(this).find('.ui-slider-range').removeClass('expQuestions23');
                                $(this).find('.ui-slider-range').removeClass('expQuestions24');
                            }
                            if ($(this).hasClass('expQuestions3')) {
                                $(this).find('.ui-slider-range').removeClass('expQuestions31');
                                $(this).find('.ui-slider-range').removeClass('expQuestions32');
                                $(this).find('.ui-slider-range').removeClass('expQuestions33');
                                $(this).find('.ui-slider-range').removeClass('expQuestions34');
                            }
                            if ($(this).hasClass('expQuestions4')) {
                                $(this).find('.ui-slider-range').removeClass('expQuestions41');
                                $(this).find('.ui-slider-range').removeClass('expQuestions42');
                                $(this).find('.ui-slider-range').removeClass('expQuestions43');
                                $(this).find('.ui-slider-range').removeClass('expQuestions44');
                            }
                            if ($(this).hasClass('expQuestions5')) {
                                $(this).find('.ui-slider-range').removeClass('expQuestions51');
                                $(this).find('.ui-slider-range').removeClass('expQuestions52');
                                $(this).find('.ui-slider-range').removeClass('expQuestions53');
                                $(this).find('.ui-slider-range').removeClass('expQuestions54');
                            }
                        }
                        //if (ui.value == 0) {
                        //    $(this).find('.ui-slider-range').addClass('sliderdiv1');
                        //} else
                        //alert($(this).hasClass('expQuestions1'));
                        if ($(this).hasClass('expQuestions1')) {
                            if (ui.value == 1) {
                                $(this).find('.ui-slider-range').addClass('expQuestions11');
                            } else if (ui.value == 2) {
                                $(this).find('.ui-slider-range').addClass('expQuestions12');
                            } else if (ui.value == 3) {
                                $(this).find('.ui-slider-range').addClass('expQuestions13');
                            } else if (ui.value == 4) {
                                $(this).find('.ui-slider-range').addClass('expQuestions14');
                            }
                        }
                        if ($(this).hasClass('expQuestions2')) {
                            if (ui.value == 1) {
                                $(this).find('.ui-slider-range').addClass('expQuestions21');
                            } else if (ui.value == 2) {
                                $(this).find('.ui-slider-range').addClass('expQuestions22');
                            } else if (ui.value == 3) {
                                $(this).find('.ui-slider-range').addClass('expQuestions23');
                            } else if (ui.value == 4) {
                                $(this).find('.ui-slider-range').addClass('expQuestions24');
                            }
                        }
                        if ($(this).hasClass('expQuestions3')) {
                            if (ui.value == 1) {
                                $(this).find('.ui-slider-range').addClass('expQuestions31');
                            } else if (ui.value == 2) {
                                $(this).find('.ui-slider-range').addClass('expQuestions32');
                            } else if (ui.value == 3) {
                                $(this).find('.ui-slider-range').addClass('expQuestions33');
                            } else if (ui.value == 4) {
                                $(this).find('.ui-slider-range').addClass('expQuestions34');
                            }
                        }
                        if ($(this).hasClass('expQuestions4')) {
                            if (ui.value == 1) {
                                $(this).find('.ui-slider-range').addClass('expQuestions41');
                            } else if (ui.value == 2) {
                                $(this).find('.ui-slider-range').addClass('expQuestions42');
                            } else if (ui.value == 3) {
                                $(this).find('.ui-slider-range').addClass('expQuestions43');
                            } else if (ui.value == 4) {
                                $(this).find('.ui-slider-range').addClass('expQuestions44');
                            }
                        }
                        if ($(this).hasClass('expQuestions5')) {
                            if (ui.value == 1) {
                                $(this).find('.ui-slider-range').addClass('expQuestions51');
                            } else if (ui.value == 2) {
                                $(this).find('.ui-slider-range').addClass('expQuestions52');
                            } else if (ui.value == 3) {
                                $(this).find('.ui-slider-range').addClass('expQuestions53');
                            } else if (ui.value == 4) {
                                $(this).find('.ui-slider-range').addClass('expQuestions54');
                            }
                        }
                        $('#' + event.target.id).data("answer", ui.value);

                    },
                    create: function(event, ui) {

                    }
                });
            }
        });
    },
    saveFbExperience: function() {
        var savePOEResultRequests = [];
        for (var j = 0; j < parseInt($('.fbexperienceQn li').length); j++) {
            var savePOEResultRequest = new Requests.SavePOEResultRequest();
            savePOEResultRequest.Answer = parseInt($('#Qno' + (j + 1)).data("answer"));
            savePOEResultRequest.QuestionId = $('#Qno' + (j + 1)).data("question");
            savePOEResultRequest.FeedbackId = $('#feedbackid').val();
            savePOEResultRequests.push(savePOEResultRequest);
        }
        Common.ajaxSyncPost({
            url: '../../Feedback/InsertFbExperience',
            data: { request: savePOEResultRequests },
            beforeSend: function() {
                $("#status").fadeIn();
                $("#preloader").delay(100).fadeIn("slow");
            },
            success: function() {
                $('#masterMsgCont').text("Thank you for your feedback'");
                $('#overallCont').show();
                //alert('Thank you for your feedback');
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
            }
        });
    },
    //setSessionRole: function () {
    //    Common.ajaxsync({
    //        url: '../../Feedback/SetSessionRole',
    //        data:{ feedbackid : $('#feedbackid').val() },
    //        success: function (response) {
    //        }
    //    });
    //}
};
$(document).ready(function () {
   // alert($('#fbtype').val());
    //$('#feedbacktype').text((($('#fbtype').val() == "1") ? "Take Feedback" : "Give Feedback"));
    //$('#reviewtitle').text((($('#fbtype').val() == "1") ? "" : ""));
    if ($('#fbtype').val() == "1") { $('#reviewCoachingNotes p').text("Review Notes"); $('#seletedtilevalue').text("Feedback on your experience "); }
    
    
    //completed_feedback.loadPoeName();
    //completed_feedback.loadModuleIds({ url: '../../Feedback/GetPracticeArea' });
    //completed_feedback.loadTeammembers();
    completed_feedback.GetFbExperienceQuestions();
    //$('#returnStart').click(function () {
    //    $("#status").fadeIn();
    //    $("#preloader").delay(100).fadeIn("slow");
    //    window.location.href = "../Home/Start";
    //});
    //$('.userconnect').click(function () {
    //    $('.userconnect').removeClass('msgsmallselectArrow');
    //    $(this).addClass('msgsmallselectArrow');
    //    $("#status").fadeIn();
    //    $("#preloader").delay(100).fadeIn("slow");
    //    $('#feedbackid').val($(this).data('feedbackid')); completed_feedback.loadModuleIds({ url: '../../Feedback/GetPracticeArea' });
    //    $("#status").fadeOut();
    //    $("#preloader").delay(100).fadeOut("slow");
    //    completed_feedback.setSessionRole();
    //});
   // completed_feedback.setSessionRole();
    $('#ViewReports').click(function () {
        window.location.href = '../Result/Bigpicture';
    });
    completed_feedback.loadControls();
    $('#sticky > ul > li > a').click(function () {
        $('#sticky > ul > li > a').each(function (index, item) {
            $(item).removeClass('select' + $(item).attr('id'));
        });
        $(this).addClass('select' + $(this).attr('id'));
    });
    $(document).click(function () {
        $('#sticky > ul > li > a').each(function (index, item) {
            $(item).removeClass('select' + $(item).attr('id'));
        });
    });
    if ($('#pagemode').val() == "2") {
        //alert($('#pagemode').val());
        // $('#reportAnIssuecontainer').show();
        //$('#seletedtilevalue').html("Report an Issue");
        $('#reportAnIssue').click();
    }
    //  completed_feedback.loadyammerFeed();

    //yam.connect.embedFeed(
    //{
    //   container: '#feedcontainer',
    //   network: 'tillidsoft.com'  // network permalink (see below)
    //});
    //yam.on('/embed/feed/loadingCompleted', setyammerheight, '');
});
function setyammerheight() {
    $('#feedcontainer').css('height', '540px');
}