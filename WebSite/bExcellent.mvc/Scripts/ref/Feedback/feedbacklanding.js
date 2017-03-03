$(document).ready(function () {
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    //$('.takefbRightPart ').hide();
    feedback.loadlastmenu();
    Common.setTopMenu(2);
    $('.takefeedback').hide();
    $('.breadcrumb').hide();
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $('#fbh2,#fbh3,#fbh4,#fbh5,#fbh6,#fbh1,#fbh8').hide();
    feedback.poeMenu();
    $.ajax({
        beforeSend: function () {
            $("#status").fadeIn();
            $("#preloader").delay(100).fadeIn("slow");
        },
        success: function () {
            feedback.loadControls();
           
            feedback.IsOwnSubscribtion();
        },
        complete: function () {
        },
    });

    $('.takeFBtile').hide();
    $('.receiveFBtile').hide();
    $('.giveFBtile').hide();
    $('.invitetile').hide();
    $('.pane').find('input[type=radio]:checked').removeAttr('checked');
    $("#n" + $(this).context.title).attr('checked', 'checked');
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/start-feedback_h.png');
    $('#feedback-quickview').live('click', function () {
        feedback.loadquickview();
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("fast");
    });
    $('#feedback-detailsview,#startNormal').live('click', function () {
        feedback.loaddetailview();
    });
    //feedback.poeMenu();

    if ($('#fromstart').val() == '1') {
        feedback.functionTakefeedback();
    } else {
        $('.FBgiventile').css('background', '#e0b001');
    }

    $('.slidebtn').show();
    $('.clearYesbtn').live('click', function () {
        if ($(this).attr('clearIncomplete') == '1') {
            Common.ajax({
                url: '../Feedback/DeleteIncompleteFeedback',
                success: function (response) {
                    feedback.loadCommonContent();
                    $('.clearfb').hide();
                },
                error: function (err) {
                }
            });
            $(".popupbg,.popup").hide();
            $('.clearfb').removeClass('selected');
        } else {
            $(".popupbg,.popup").hide();
            $('.clearfb').removeClass('selected');
        }
    });
    var feedbackid = "";
    var fbMode = 1;
    $('.deleteIncomplete').live('click', function () {
        var html = "<div class='cleartextMsg'>Are you sure you want to clear the feedback?</div><div><a href='#' clearIncomplete='1' class='clearSingleYesbtn'>Yes</a><a href='#' clearIncomplete='0' class='clearSingleYesbtn'>No</a></div>";
        $('#info').html(html);
        $(".popupbg,.popup").show();
        var pagemode = parseInt($(this).parents().attr('data-fbs'));
        if(pagemode!=0) {
            fbMode = 0;
            feedbackid = $(this).parents().attr('data-groupId');
           // alert(feedbackid);
            } else {
            feedbackid = $(this).parents().attr('data-feedbackid');
        }
    });
    $('.clearSingleYesbtn').live('click', function () {
        //alert(feedbackid);
        //alert(fbMode);
        if ($(this).attr('clearIncomplete') == '1') {
            Common.ajax({
                url: '../Feedback/DeleteIncompleteFB?feedbackId=' + feedbackid + '&deleteMode=' + parseInt(fbMode),
                success: function (response) {
                    feedback.loadCommonContent();
                    $('.clearfb').hide();
                },
                error: function (err) {
                }
            });
            $(".popupbg,.popup").hide();
            $('.clearfb').removeClass('selected');
        } else {
            $(".popupbg,.popup").hide();
            $('.clearfb').removeClass('selected');
        }
    });


});

var feedback = {
    functionTakefeedback: function () {
        $('.breadcrumb').show();
        $('.sliderdiv').hide();
        $('.takeFB,#fbh3').show();
        $('.receiveFB,.giveFB,.invite,.status,.history,.FBreceived,.FBgiven,#fbh2,#fbh1,#fbh4,#fbh5,#fbh6,#fbh7,#fbh8').hide();
        $('.fbholder').animate({ 'left': '0%' });
    },
    functionReceivedfeedback: function () {
        $('.breadcrumb').show();
        var givenCount = $('#fbrcvdpagecount').val();
        if (givenCount > 1) {
            $('#pagetxt').html('Page ' + $('#fbrcvdcurpage').val() + ' of ' + $('#fbrcvdpagecount').val());
        } else {
            $('#pagetxt').html('');
        }

        $('.sliderdiv').hide();
        $('#slidercvd').show();
        $('.FBreceivedtile').css('background', '#e0b001');
        $('.FBreceived,#fbh2').show();
        $('.receiveFB,.giveFB,.invite,.status,.history,.takeFB,.FBgiven,#fbh1,#fbh3,#fbh4,#fbh5,#fbh6,#fbh7,#fbh8').hide();
        // $('.receiveFBtile,.giveFBtile,.invitetile,.statustile,.takeFBtile,.FBgiventile,.historytile').css('background', '#808080');
        $('.fbholder').animate({ 'left': '0%' });
    },
    functionGivenfeedback: function () {

        $('.breadcrumb').show();
        var givenCount = $('#fbgvnpagecount').val();
        if (givenCount > 1) {
            $('#pagetxt').html('Page ' + $('#fbgvncurpage').val() + ' of ' + $('#fbgvnpagecount').val());
        } else {
            $('#pagetxt').html('');
        }

        $('.sliderdiv').hide();
        $('#slidegvn').show();
        $('.FBgiventile').css('background', '#e0b001');
        $('.FBgiven,#fbh1').show();
        $('.receiveFB,.giveFB,.invite,.status,.history,.takeFB,.FBreceived,#fbh2,#fbh3,#fbh4,#fbh5,#fbh6,#fbh7,#fbh8').hide();
        $('.fbholder').animate({ 'left': '0%' }, { duration: 400 });
        $('#fbgivencontent ul').width((100 / $('#fbgivencontent ul').length) + '%');
    },
    loadControls: function () {

        $('.takeFeedbackMenu,.incompletefbMenu').live('click', function () {
            feedback.hightlightCurrentTile($(this).attr('id'));
        });

        $('.chooseindividuals').live('click', function () {
            debugger;
            var appendtext = $(this).parents().eq(4).attr('id');
            $('#receiveFbspan,#recFbspan').removeClass('selectArrow');
            if (appendtext == 'receiveFb') {
                appendtext = $(this).attr('data-fbtype');
            }
            $('.takefbRightPart:visible').hide();
            $('.' + appendtext + 'InnerPart').show();
            if ($(this).attr('id') != undefined) {
                feedback.highlightgivefbmenu($(this).attr('id').replace('members', ''), appendtext);
            }
            $('.' + appendtext + 'InnerPart .givefbContent>div').hide();
            if (appendtext == 'receiveFb') {
                //alert($('.requestfbcontent').hasClass('requestSmall'));

                $('.RequestfbInnerPart #skip').click();

                if ($('.requestfbcontent').hasClass('requestSmall')) {
                    $('.innerrequestfbcontent,#reqfbh2').hide();
                } else {
                    $('.innerrequestfbcontent,#reqfbh2').show();
                    $('#poelist1').removeClass('profilesbigscroll'); $('#poelist1').addClass('profilessmallscroll');
                    $('#poelist1').parent().removeClass('scroll2'); $('#poelist1').parent().addClass('scroll5');
                    $('.profileCenter').addClass('requestscroll');
                }

                $('#receiveFbspan').addClass('selectArrow');
            }
            else if (appendtext == 'recFb') {
                $('.recFbInnerPart #Team').click();
                if ($('.requestfbcontent').hasClass('requestSmall')) {
                    $('.innerrequestfbcontent,#reqfbh2').hide();
                } else {
                    $('#recFbspan').addClass('selectArrow');
                    $('.innerrequestfbcontent,#reqfbh2').show();
                    $('.profileCenter').addClass('requestscroll');
                    $('#poelist1').parent().removeClass('scroll2'); $('#poelist1').parent().addClass('scroll5');
                    $('#poelist1').removeClass('profilesbigscroll'); $('#poelist1').addClass('profilessmallscroll');
                }

            }
            if ($(this).attr('id') != undefined) {
                $('#' + appendtext.toLowerCase() + $(this).attr('id').replace('members', '')).show();
                $('#' + appendtext.toLowerCase() + $(this).attr('id').replace('members', '') + 'paging').show();
            }
        });

        $('.innerrequestfbcontent .column').click(function () {
            $('.innerrequestfbcontent .column span').removeClass('selectArrow');
            $(this).find('span').addClass('selectArrow');
            var id = $(this).find('span').attr('id');
            $('a[data-fbtype="' + id.replace('span', '') + '"').click();
        });

        $('.givefbInnermenu ul li').live('click', function () {

            var appendtext = $(this).parents().eq(2).attr('id');
            //alert(appendtext);
            if ($(this).attr('id') == "customer") {
                $('#historyComment').text("History of all Feedback.");
            } else if ($(this).attr('id') == "skip") {
                $('#historyComment').text("History of completed Self-Feedback.");
            } else if ($(this).attr('id') == "manager") {
                $('#historyComment').text("History of Feedback received from others in your Network.");
            } else if ($(this).attr('id') == "Peers") {
                $('#historyComment').text("History of Feedback given by you.");
            }
            else if ($(this).attr('id') == "incompleteItem") {
                $('#historyComment').text("History of incomplete Feedback.");

                //$('#historyComment').next().html('<div class="clearIncomplete"><a href="#">Clear Incomplete History</a></div>');
            }
            feedback.highlightgivefbmenu($(this).attr('id'), appendtext);
            $('.' + appendtext + 'InnerPart .givefbContent>div').hide();
            $('#' + appendtext.toLowerCase() + $(this).attr('id')).show();
            $('#' + appendtext.toLowerCase() + $(this).attr('id') + 'paging').show();
            var slidecnt = $('#' + appendtext.toLowerCase() + $(this).attr('id')).find('.historyfbslide').length;
            $('#' + appendtext.toLowerCase() + $(this).attr('id')).find('.historyfbslide').width(100 / slidecnt + '%');
            if ($(this).attr('id') == "incompleteItem") {
                $('.clearIncomplete').show();
            } else {
                $('.clearIncomplete').hide();
            }
        });

        $('.FBgiventile').live('click', function () {
            $('.breadcrumb').show();
            var givenCount = $('#fbgvnpagecount').val();
            if (givenCount > 1) {
                $('#pagetxt').html('Page ' + $('#fbgvncurpage').val() + ' of ' + $('#fbgvnpagecount').val());
            } else {
                $('#pagetxt').html('');
            }

            $('.sliderdiv').hide();
            $('#slidegvn').show();
            $('.FBgiven,#fbh1').show();
            $('.receiveFB,.giveFB,.invite,.status,.history,.takeFB,.FBreceived,#fbh2,#fbh3,#fbh4,#fbh5,#fbh6,#fbh7,#fbh8').hide();
            $('.fbholder').animate({ 'left': '0%' }, { duration: 400 });
            $('#fbgivencontent ul').width((100 / $('#fbgivencontent ul').length) + '%');
        });
        $('#selectallTeam').live('click', function () {
            $('.givefbTeam').each(function () {
                $(this).addClass('msgmidselectArrow');
            });
        });
        $('.FBreceivedtile').live('click', function () {
            $('.breadcrumb').show();
            var givenCount = $('#fbrcvdpagecount').val();
            if (givenCount > 1) {
                $('#pagetxt').html('Page ' + $('#fbrcvdcurpage').val() + ' of ' + $('#fbrcvdpagecount').val());
            } else {
                $('#pagetxt').html('');
            }

            $('.sliderdiv').hide();
            $('#slidercvd').show();
            $('.FBreceived,#fbh2').show();
            $('.receiveFB,.giveFB,.invite,.status,.history,.takeFB,.FBgiven,#fbh1,#fbh3,#fbh4,#fbh5,#fbh6,#fbh7,#fbh8').hide();
            $('.fbholder').animate({ 'left': '0%' });
        });

        $('.takeFBtile').live('click', function () {
            $('#pagetxt').html('');
            $('#breadcrumbtxt').text('Self-Feedback');
            $('.takefbRightPart').hide();

            var isResumeFbMode = $('#isSelfResume').val();
            // alert(isResumeFbMode);
            if (isResumeFbMode != 0) {
                $('.takeFb').hide();
                $('#takefbResume').show();

            } else {
                $('#takefbResume').hide();
                $('.takeFb').show();

            }
            feedback.hightlightCurrentTile('Take');
            $('#poelist1').addClass('profilesbigscroll'); $('#poelist1').removeClass('profilessmallscroll');
            $('#poelist1').parent().removeClass('scroll5'); $('#poelist1').parent().addClass('scroll2');
            $('.profileCenter').removeClass('requestscroll');
            $('.innerrequestfbcontent,#reqfbh2').hide();
        });
        $('.quickview').live('click', function () {
            $(this).addClass('selected').siblings();
        });
        $('.receiveFBtile').live('click', function () {
            $('.breadcrumb').show();
            var givenCount = $('#fbrcvmbrpagecount').val();
            if (givenCount > 1) {
                $('#pagetxt').html('Page ' + $('#fbrcvmbrcurpage').val() + ' of ' + $('#fbrcvmbrpagecount').val());
            } else {
                $('#pagetxt').html('');
            }

            $('.sliderdiv').hide();
            $('#slidercvmbr').show();
            $('.receiveFB,#fbh4').show();
            $('.takeFB,.giveFB,.invite,.status,.history,.FBreceived,.FBgiven,#fbh2,#fbh3,#fbh1,#fbh5,#fbh6,#fbh7,#fbh8').hide();
            $('.fbholder').animate({ 'left': '0%' });
        });
        $('.giveFBtile').live('click', function () {
            // alert('s');
            $('.takefbRightPart').hide();
            $('#breadcrumbtxt').text('Team-Feedback');
            //$('.giveFb').show();
            var isResumeFbMode = $('#isResumefeedback').val();
            //alert(isResumeFbMode);
            if (isResumeFbMode != 0) {
                $('#giveFb').show();
            } else {
                $('.giveFbInnerPart').show();
            }
            $('.breadcrumb').show();
            feedback.GetManagerType();
            feedback.hightlightCurrentTile('Give');
            $('#breadcrumbtxt').text('Team-Feedback');
            $('#poelist1').addClass('profilesbigscroll'); $('#poelist1').removeClass('profilessmallscroll');
            $('#poelist1').parent().removeClass('scroll5'); $('#poelist1').parent().addClass('scroll2');
            $('.profileCenter').removeClass('requestscroll');
            var givenCount = $('#fbgvmbrpagecount').val();
            if (givenCount > 1) {
                $('#pagetxt').html('Page ' + $('#fbgvcurpage').val() + ' of ' + $('#fbgvmbrpagecount').val());
            } else {
                $('#pagetxt').html('');
            }

            $('.sliderdiv').hide();
            $('#slidegvmbr').show();
            $('.innerrequestfbcontent,#reqfbh2').hide();
            $('.giveFB,#fbh5').show();
            $('.takeFB,.receiveFB,.invite,.status,.history,.FBreceived,.FBgiven,#fbh2,#fbh3,#fbh4,#fbh1,#fbh6,#fbh7,#fbh8').hide();
            // $('.takeFBtile,.receiveFBtile,.invitetile,.statustile,.historytile,.FBreceivedtile,.FBgiventile').css('background', '#808080');
            $('.fbholder').animate({ 'left': '0%' });
            // $('#nxtfbgive0').show();
        });
        $('.invitetile').live('click', function () {
            $('.breadcrumb').show();
            $('.takefbRightPart').hide();
            $('.requestFb').show();
            $('#breadcrumbtxt').text('Request Feedback');
            feedback.hightlightCurrentTile('Request');
            $('#poelist1').addClass('profilesbigscroll'); $('#poelist1').removeClass('profilessmallscroll');
            $('#poelist1').parent().removeClass('scroll5'); $('#poelist1').parent().addClass('scroll2');
            $('.profileCenter').removeClass('requestscroll');
            var givenCount = $('#fbinvmbrpagecount').val();
            if (givenCount > 1) {
                $('#pagetxt').html('Page ' + $('#fbinvcurpage').val() + ' of ' + $('#fbinvmbrpagecount').val());
            } else {
                $('#pagetxt').html('');
            }

            $('.sliderdiv').hide();
            $('#slideinvmbr').show();
            $('.invite,#fbh6').show();
            $('.innerrequestfbcontent,#reqfbh2').hide();
            $('.takeFB,.receiveFB,.giveFB,.status,.history,.FBreceived,.FBgiven,#fbh2,#fbh3,#fbh4,#fbh5,#fbh1,#fbh7,#fbh8').hide();
            $('.fbholder').animate({ 'left': '0%' });
        });
        $('.statustile').live('click', function () {
            $('.takefbRightPart').hide();
            $('.incompletefbhistory').show();
            feedback.hightlightCurrentTile('incomplete');
            $('#breadcrumbtxt').text('Incomplete Feedback');
            if (parseInt($(this).find('#incompleteFbCount').text()) == 0)
                $('.clearfb').hide();
            else
                $('.clearfb').show();
            $('.breadcrumb').show();
            var givenCount = $('#fbstspagecount').val();
            if (givenCount > 1) {
                $('#pagetxt').html('Page ' + $('#fbstscurpage').val() + ' of ' + $('#fbstspagecount').val());
            } else {
                $('#pagetxt').html('');
            }
            $('#poelist1').addClass('profilesbigscroll'); $('#poelist1').removeClass('profilessmallscroll');
            $('#poelist1').parent().removeClass('scroll5'); $('#poelist1').parent().addClass('scroll2');
            $('.profileCenter').removeClass('requestscroll');
            $('.sliderdiv').hide();
            $('#slidestsmbr').show();
            $('.status,#fbh7').show();
            $('.innerrequestfbcontent,#reqfbh2').hide();
            $('.takeFB,.receiveFB,.giveFB,.invite,.history,.FBreceived,.FBgiven,#fbh2,#fbh3,#fbh4,#fbh5,#fbh6,#fbh1,#fbh8').hide();
            $('.fbholder').animate({ 'left': '0%' });
        });
        $('.historytile').live('click', function () {
            $('.breadcrumb').show();
            $('.takefbRightPart').hide();
            $('.histroyfb').show();
            feedback.hightlightCurrentTile('history');
            $('#breadcrumbtxt').text('Completion History');
            var givenCount = $('#fbhispagecount').val();
            if (givenCount > 1) {
                $('#pagetxt').html('Page ' + $('#fbhiscurpage').val() + ' of ' + $('#fbhispagecount').val());
            } else {
                $('#pagetxt').html('');
            }

            $('.sliderdiv').hide();
            $('#slidehismbr').show();
            $('.history,#fbh8').show();
            $('.innerrequestfbcontent,#reqfbh2').hide();
            $('#poelist1').addClass('profilesbigscroll'); $('#poelist1').removeClass('profilessmallscroll');
            $('#poelist1').parent().removeClass('scroll5'); $('#poelist1').parent().addClass('scroll2');
            $('.profileCenter').removeClass('requestscroll');
            $('.takeFB,.receiveFB,.giveFB,.invite,.status,.FBreceived,.FBgiven,#fbh2,#fbh3,#fbh4,#fbh5,#fbh6,#fbh7,#fbh1').hide();
            $('.fbholder').animate({ 'left': '0%' });
            $('.historyInnerPart #skip').click();
        });

        $('.givebtn').live('click', function () {
            $("#status").fadeIn();
            $("#preloader").delay(100).fadeIn("slow");
            $('.givebtn').removeClass('selected');
            feedback.loadmanagerfb();
            $(this).addClass('selected');
        });
        $('.invitebtn').live('click', function () {
            $("#status").fadeIn();
            $("#preloader").delay(100).fadeIn("slow");
            $('.invitebtn').removeClass('selected');
            feedback.inviteTeam();
            $(this).addClass('selected');
        });
        var selectedManager = "";
        $('.sendbtn').live('click', function () {
            $('.sendbtn').removeClass('selected');
            $('.sendbtn').parent().removeClass('selectFBtwocol');
            $(this).addClass('selected');
            $(this).parent().addClass('selectFBtwocol');
            $('.requestpopup,.popupbg').show();
            selectedManager = $(this);
            //Request Email
        });
        $('#requestEmail').on('click', function () {
            $('#hdnEmailMode').val('false');
            var email = selectedManager.parent().find('.reqemailid').text().replace("Alias : ", "").trim();
            var subject = 'Feedback Request';
            var emailBody = "Hi " + selectedManager.parent().find('.reqname').text().replace("Name : ", "").trim() + ",I requested u to take feedback";
            window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + emailBody;
            feedback.RequestFB(selectedManager);
            $('.requestpopup,.popupbg').hide();
        });
        //Request Tool
        $('#requestTool').on('click', function () {
            $('#hdnEmailMode').val('true');
            feedback.RequestFB(selectedManager);
            $('.requestpopup,.popupbg').hide();
        });
        //Request Yammer
        $('#requestYammer').on('click', function () {
            $('#hdnEmailMode').val('false');
            var email = selectedManager.prev().find('.reqemailid').text().replace("Alias:", "").trim();
            feedback.RequestYammer(email, 1);
            feedback.RequestFB(selectedManager);
            $('.requestpopup,.popupbg').hide();
        });
        $('.startfb').live('click', function () {
            $('.startfb').removeClass('selected');
            $(this).addClass('selected');
        });
        $('.give').live('click', function () {
            $(this).toggleClass('msgmidselectArrow');
        });
        $('.clearfb').live('click', function () {
            $("#status").fadeIn();
            $('.clearfb').removeClass('selected');
            var html = "<div class='cleartextMsg'>Are you sure you want to clear your Incomplete History?</div><div><a href='#' clearIncomplete='1' class='clearYesbtn'>Yes</a><a href='#' clearIncomplete='0' class='clearYesbtn'>No</a></div>";
            $('#info').html(html);
            $(".popupbg,.popup").show();

            $(this).addClass('selected');
        });

        $('.close').live('click', function () {
            $(".popupbg,.popup").hide();
            $('.requestpopup').hide();
            $('.sendbtn').removeClass('selected');
            $('.sendbtn').parent().removeClass('selectFBtwocol');
            $('.selectFBtwocol').removeClass('selectFBtwocol');
            $('.rcnbackground').hide();
        });
        $('.allteammemfb').live('click', function () {
            feedback.givefballteammembers($(this).data('value'));
        });
        $('.viewnotes').live('click', function () {
            $('#fbid').val($(this).data('fbid'));
            feedback.loadPoeName();
            feedback.loadModuleIds({ url: '../../Feedback/GetPracticeArea' });
            $(".rcnbackground,.popupbg,.reviewCoaching").show();
            feedback.loadviewnotesControls();
        });
    },
    loadviewnotesControls: function () {
        $('#poemodule li').click(function () {
            $('#poemodule li').removeClass('selected');
            $('#poemodule li').each(function (index, item) {
                $(item).find('img').attr('src', '../../Images/icons/' + $('#selectedpoe').val() + $(this).data('moduleno') + '.png');
            });
            $(this).find('img').attr('src', '../../Images/icons/' + $('#selectedpoe').val() + $(this).data('moduleno') + 'h.png');
            $(this).addClass('selected');
            $('.questioncontainer').hide();
            $('#m' + $(this).data('value')).show();
        });
    },

    //Loading footer menu
    loadlastmenu: function () {
        $('.breadcrumb').show();
        var html = "<li class='takeFBtile'><a><span><img src='../../Images/Icons/take-small.png'/></span><p> Self-Feedback  </p></a></li> <li class='giveFBtile'><a><span><img src='../../Images/Icons/give-small.png'/></span> <p> Team Feedack </p></a></li> <li class='historytile'><a><span><img src='../../Images/Icons/history-small.png'/></span><p> Completion History </p></a></li>";
        $('#target ul').html(html);
    },
    //Redirect to Quickview page
    loadquickview: function () {
        window.location.href = '../../Feedback/Quickview';
    },
    //Redirect to detailview page
    loaddetailview: function () {
        // RedirectWelcome
        window.location.href = '../../Feedback/RedirectWelcome?mode=1';
    },
    //    poe menu
    poeMenu: function () {
        $('#sliderbtn').html('');
        //$('.nxtfb,.prevfb').hide();
        Common.ajax({
            url: '../../Common/GetNetworkSubscribedPoesOld',
            success: function (response) {
                // debugger;
                var html = "";//"<li class='first'> </li>";
                var poeids = '';
                for (var i = 0; i < response.length; i++) {
                    html = html + " <li id ='poeli" + response[i].POEId + "' value=" + response[i].POEId + " data-cap='" + response[i].IsCapability + "' data-survey='" + response[i].IsSurvey + "' class='poelistli'><a> <div class='icon'> <img src='../../Images/" + response[i].POEName.replace("&", "").replace("/", "") + "_Intro.png' alt='" + response[i].POEName + "' class='img' /></div> <p> " + response[i].POEName + "</p> </a><span></span></li>";
                    poeids = poeids + response[i].POEId + '%';
                }
                if (response.length < 4) {
                    for (var p = response.length; p < 4; p++) {
                        html = html + " <li class='poelistlidummy' style='cursor:default'></li>";
                    }
                }

                if (response.length > 4) {
                    if (response.length % 2 == 1) {
                        html = html + " <li class='poelistlidummy' style='cursor:default'></li>";
                    }
                }

                $('#poelist1').html(html);

                $('.poelistli').click(function (e) {
                    //debugger;
                    //hideTilesFunc
                    $("#status").fadeIn();
                    $("#preloader").delay(100).fadeIn("slow");
                    var poeListValue = $(this).val();
                    $('#sliderbtn').html('');
                    feedback.loadfeedbackMenu(poeListValue);
                });

                var selectedPoe = $('#selectedPoeValueFeedback').val();

                if (selectedPoe == 0) {
                    feedback.loadfeedbackMenu(response[0].POEId);
                } else {
                    feedback.loadfeedbackMenu(selectedPoe);
                }
                $('.takefeedback').show();
                if (selectedPoe == "0") {
                    selectedPoe = $('.poelistli:first').val();
                }
                if ($('#poelist1 li').length > 2) {
                    $('.scroll2').slimScroll({
                        start: $('#poeli' + selectedPoe)
                    });
                }
            },
            error: function (err) {
                $('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },
    //    set feedback menu
    loadfeedbackMenu: function (poeid) {
        //debugger;
        if (poeid != 0) {
            $('.poelistli').removeClass('selectArrow');
            $('#poeli' + poeid).addClass('selectArrow');
            $('#selectedpoe').html(poeid);
            $("#status").show();
            $("#preloader").show();
            var cap = parseInt($('.selectArrow').attr('data-cap'));
            var survey = parseInt($('.selectArrow').attr('data-survey'));
            Common.ajaxsync({
                url: '../../Common/GetFeedbackUserRole',
                data: { 'poeId': poeid, 'capability': cap, 'survey': survey },
                success: function (response) {
                    feedback.loadfbmenuHtml(poeid, response);
                    $("#status").hide();
                    $("#preloader").hide();
                    hideTilesFuncFS();
                },
                error: function (err) {
                }
            });
        }
    },
    //    Html content of the feedback menu
    loadfbmenuHtml: function (poeid, role) {
        feedback.loadCommonContent();
        // debugger;
       // alert(role);
        if (role == 1) {
            //alert("1");
            $('.takeFBtile').show();
            $('.receiveFBtile').show();
            $('.giveFBtile').hide();
            $('.invitetile').hide();
            $('.historytile').show();
            $('.statustile').show();
            $('.invitetile').hide();
            $('.takeFBtile').click();
            $('.historytile').removeClass('incompletefbMenu').addClass('historySmall');
            $('#feedSendReq').show();
            $('#reqCnt').addClass('requestSmall');
            $('#feedAskReq').hide();
            $('#sendreqInside').show();
            $('#askreqInside').hide();
            $('#innerFbReq').addClass('innerfbCnt');

            //$('.innerrequestfbcontent').hide();
            feedback.loadTeammemberContent();
        }
        else if (role == 2) {
            //alert("2");
            $('.historytile').show();
            $('.statustile').show();
            $('.takeFBtile').hide();
            $('.receiveFBtile').hide();
            $('.giveFBtile').show();
            $('.invitetile').hide();
            $('.takefbRightPart').hide();
            $('#takefbResume').hide();
            var isResumeFbMode = $('#isResumefeedback').val();
            // alert(isResumeFbMode);
            if (isResumeFbMode != 0) {
                $('#giveFb').show();
            } else {
                $('.giveFbInnerPart').show();
            }
            // $('#giveFb').show();

            $('.historytile').removeClass('incompletefbMenu').addClass('historySmall');
            $('#feedSendReq').hide();
            $('#reqCnt').addClass('requestSmall');
            $('#feedAskReq').show();
            $('#sendreqInside').hide();
            $('#askreqInside').show();
            $('#innerFbReq').addClass('innerfbCnt');
            feedback.hightlightCurrentTile('Give');
            feedback.loadmanagerContent();
        } else if (role == 12) {
            //alert("3");
            //alert($('#isResumefeedback').val());
            $('.historytile').show();
            $('.statustile').show();
            $('.takeFBtile').show();
            $('.receiveFBtile').show();
            $('.giveFBtile').show();
            $('.invitetile').hide();
            $('#feedSendReq').show();
            $('#feedAskReq').show();
            $('#takefbResume').hide();
            $('#reqCnt').removeClass('requestSmall');
            $('.historytile').removeClass('historySmall').addClass('incompletefbMenu');
            var isResumeFbMode = $('#isResumefeedback').val();
            // alert(isResumeFbMode);
            if ($('.givefbIcon ').hasClass('selectGive')) {
                if (isResumeFbMode != 0) {
                    $('.giveFbInnerPart').hide();
                    $('#giveFb').show();
                } else {
                    $('#giveFb').hide();
                    $('.giveFbInnerPart').show();
                }
            }
            var isResumeFbMode1 = $('#isSelfResume').val();
            //alert(isResumeFbMode1);
            if ($('.takefbIcon').hasClass('selectTake')) {
                if (isResumeFbMode1 != 0) {
                    $('#takeFb').hide();
                    $('#takefbResume').show();

                } else {
                    $('#takefbResume').hide();
                    $('#takeFb').show();

                }
            }
            $('#sendreqInside').show();
            $('#askreqInside').show();
            $('#innerFbReq').removeClass('innerfbCnt');
            feedback.loadTeammemberContent();
            feedback.loadmanagerContent();
        } else {
            $('.historytile').show();
            $('.statustile').show();
            $('.takeFBtile').hide();
            $('.receiveFBtile').hide();
            $('.giveFBtile').hide();
            $('.invitetile').hide();
        }

        var pagemode = $('#feedbackMode').val();
        if (pagemode == "2") {
            feedback.functionReceivedfeedback();
        }
        else if (pagemode == "1" && role != 1) {
            // alert(pagemode);
            $('.giveFBtile').click();
            feedback.functionGivenfeedback();
        }
        else {
            $('#slidegvn').show();
            $('.FBgiventile').css('background', '#e0b001');
            $('.FBgiven,#fbh1').show();
            $('.receiveFB,.giveFB,.invite,.status,.history,.takeFB,.FBreceived,#fbh2,#fbh3,#fbh4,#fbh5,#fbh6,#fbh7,#fbh8').hide();
            $('.fbholder').animate({ 'left': '0%' }, { duration: 400 });
            $('#fbgivencontent ul').width((100 / $('#fbgivencontent ul').length) + '%');
        }
        $('#overallLayer').css('visibility', 'visible');

        feedback.getpaginationcontrols();
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    },
    //    Loading feedback received and given count
    loadcount: function (option, element) {
        Common.ajaxsync({
            cache: false,
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
                var htm1 = '';
                if (response < 10 && response >= 1) {
                    htm1 = "0" + response;
                } else {
                    htm1 = response;
                }
                $(element).html(htm1);
            },
            error: function (err) {
            }
        });
    },

    /*****************************/
    loadCommonContent: function () {
        // feedback.loadfbincompletecontent();

        /*Feedback History*/
        feedback.loadfbHistorycontent();
        //alert($('.historyfbslide:last').find('.givefbmessageDummy').length);
        historyCount = $('#historyCount').val();
        if (historyCount != 0) {

            feedback.functionTakefeedback();
        }
        else {
            $('#feedback-quickview').hide();
        }
    },
    loadTeammemberContent: function () {
        /*Feedback Receive*/
        feedback.loadreceivefbmembers();
    },
    loadmanagerContent: function () {
        /*Feedback Give*/
        feedback.loadgivefbmembers();
        /*Feedback Invite*/

    },

    /*****************************/

    //Load Feedback Given content
    loadfbgivencontent: function () {
        Common.ajaxsync({
            url: '../../Feedback/GetFeedbackGiven',
            success: function (response) {

                //debugger;
                var html = '';
                var slidehtml = '';
                var licount = 6;
                var count = response.length / licount;
                var count1 = Math.ceil(count);
                $('#fbgvnpagecount').val(count1);
                for (var k = 0; k < count1; k++) {
                    html = html + "<ul id='fbgvn" + k + "'>";
                    for (var j = 0; j < licount / 2; j++) {
                        var i = ((k * licount) + j);
                        var o = ((k * licount) + j) + (licount / 2);
                        if (response[i] != null) {
                            if (response[i].Nooffbs != 0) {
                                html = html + " <li class='b4select stat'>" +
                                    " <div class='poename'> " +
                                    "<p style='font-weight: bold;'> Congratulations, you have completed feedback for " + response[i].Nooffbs + " person/s.</p>" +
                                "<br/>" +
                                    "</div>" +
                                    " <img src='../../Images/group-icon.png' width='61' height='61' alt='User' />" +
                                    "<div class='FBtxt'> " +

                              "<p> Team Members</p>" +
                                     "<p>Name of REP:&nbsp " + response[i].POE.Name + "</p> " +
                                    "</div> " +
                                    "<div class='poename'>" +
                                    " " + response[i].FeedbackDetails.UpdatedOn + "  |" +
                                   //"<a href='/Sync/BigPicture?poeid=" + response[i].POE.POEId + "&grpid=" + response[i].FeedbackDetails.GroupName + "&ftype=" + response[i].FeedbackDetails.FeedbackType + "'>More...</a>" +
                                    "<a href='/Sync/BigPicture?poeid=" + response[i].POE.POEId + "&ftype=" + response[i].FeedbackDetails.FeedbackType + "&mapping=" + response[i].UserPOEMappingId + "'>More...</a>" +
                                   // "<a href='/Standing/Standing'>More...</a>" +
                                    "</div>" +
                                    "</li>";
                            } else {
                                html = html + " <li class='b4select stat'>" +
                                    " <div class='poename'> " +
                                    "<p style='font-weight:bold'> Completed REP Feedback for " + response[i].User.FirstName + " " + response[i].User.LastName + " </p>" + //response[i].User.FirstName + " " + response[i].User.LastName + "</p>" +
                                "<br/>" +
                                    "</div>" +
                                     "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                                    "<div class='FBtxt'> " +
                                    "<p>Name of REP:&nbsp" + response[i].POE.Name + "</p> " +
                                    "<p>Name:&nbsp" + response[i].User.FirstName + " " + response[i].User.LastName + "</p>" +
                                    "<p>Alias:&nbsp" + response[i].User.EmailAddress + "</p>" +
                                    "<p>Title:&nbsp " + response[i].JobTitle + "</p>" +

                                    "</div> " +
                                    "<div class='poename'>" +
                                    " " + response[i].FeedbackDetails.UpdatedOn + "&nbsp;&nbsp;&nbsp;&nbsp;|" +
                                    //"<a href='/Sync/BigPicture?poeid=" + response[i].POE.POEId + "&fid=" + response[i].FeedbackDetails.FeedbackId + "&ftype=" + response[i].FeedbackDetails.FeedbackType + "'>More...</a>" +
                                     "<a href='/Sync/BigPicture?poeid=" + response[i].POE.POEId + "&ftype=" + response[i].FeedbackDetails.FeedbackType + "&mapping=" + response[i].UserPOEMappingId + "'>More...</a>" +
                                     // "<a href='/Standing/Standing'>More...</a>" +
                                    "</div>" +
                                    "</li>";
                            }
                        }
                        else {
                            html = html + " <li class='nonselect stat'></li>";
                        }
                        if (response[o] != null) {
                            if (response[o].Nooffbs != 0) {
                                html = html + " <li class='b4select stat'>" +
                                    " <div class='poename'> " +
                                    "<p> Congratulations, you have completed feedback for " + response[o].Nooffbs + " person/s.</p>" +
                                "<br/>" +
                                    "</div>" +
                                    " <img src='../../Images/group-icon.png' width='61' height='61' alt='User' />" +
                                    "<div class='FBtxt'> " +
                               "<p> Team Members</p>" +
                                    "<p> REP Name: " + response[o].POE.Name + "</p> " +
                                    "</div> " +
                                    "<div class='poename'>" +
                                    " " + response[o].FeedbackDetails.UpdatedOn + "&nbsp;&nbsp;&nbsp;&nbsp;|" +
                                    "<a href='/Sync/BigPicture?poeid=" + response[o].POE.POEId + "&grpid=" + response[o].FeedbackDetails.GroupName + "&ftype=" + response[o].FeedbackDetails.FeedbackType + "'>Dig-in</a>" +
                                     // "<a href='/Standing/Standing'>More...</a>" +
                                    "</div>" +
                                    "</li>";
                            } else {
                                html = html + " <li class='b4select stat'>" +
                                    " <div class='poename'> " +
                                    "<p style='font-weight:bold'> Completed REP Feedback for " + response[o].User.FirstName + " " + response[o].User.LastName + " </p>" +
                              "<br/>" +
                                    "</div>" +
                                    "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[o].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                                    "<div class='FBtxt'> " +
                                     "<p>Name of REP:&nbsp" + response[o].POE.Name + "</p> " +
                                    "<p>Name:&nbsp" + response[o].User.FirstName + " " + response[o].User.LastName + "</p>" +
                                    "<p>Alias:&nbsp" + response[o].User.EmailAddress + "</p>" +
                                    "<p>Title:&nbsp" + response[o].JobTitle + "</p>" +

                                    "</div> " +
                                    "<div class='poename'>" +
                                    " " + response[o].FeedbackDetails.UpdatedOn + "&nbsp;&nbsp;&nbsp;&nbsp;|" +
                                   "<a href='/Sync/BigPicture?poeid=" + response[o].POE.POEId + "&fid=" + response[o].FeedbackDetails.FeedbackId + "&ftype=" + response[o].FeedbackDetails.FeedbackType + "'>Dig-in</a>" +
                                     // "<a href='/Standing/Standing'>More...</a>" +
                                    "</div>" +
                                    "</li>";
                            }
                        }
                        else {
                            html = html + " <li class='nonselect stat'></li>";
                        }
                    }
                    html = html + "</ul>";
                    if (k != count1 - 1) {
                        slidehtml = slidehtml + "<div class='nxtfb' id='nxtfbgvn" + k + "' data-value=" + k + "></div><div class='prevfb' id='prvfbgvn" + k + "' data-value=" + k + "></div>";
                    }
                }

                $('#sliderbtn').append("<div id='slidegvn' class='sliderdiv'>" + slidehtml + "</div>");
                if (response == null || response == "" || response == []) {
                    for (var l = 0; l < 6; l++) {
                        html = html + " <li class='nonselect stat'></li>";
                    }
                    count1 = 1;
                }
                $('#fbgivencontent').html(html);
                $('#fbgivencontent').css('width', count1 * 100 + '%');
                $('#fbgivencontent ul').width((100 / $('#fbgivencontent ul').length) + '%');

                for (var l = 0; l < count1; l++) {
                    $('#nxtfbgvn' + l).hide();
                    $('#prvfbgvn' + l).hide();
                    $('.slidebtn').show();
                }
                $('#nxtfbgvn0').show();
                for (var l = 0; l < count1; l++) {
                    $('#nxtfbgvn' + l).click(function () {
                        var id = parseInt(this.id.replace('nxtfbgvn', ''));
                        $('#fbgvn' + (id)).animate({ 'margin-left': '-100%' }, { duration: 400 });
                        $(this).hide();
                        $('#prvfbgvn' + (id - 1)).hide();
                        $('#prvfbgvn' + id).show();
                        $('#nxtfbgvn' + (id + 1)).show();
                        $('#pagetxt').html('Page ' + (id + 2) + ' of ' + count1);
                        $('#fbgvncurpage').val((id + 2));
                    });

                    $('#prvfbgvn' + l).click(function () {
                        var id = parseInt(this.id.replace('prvfbgvn', ''));
                        $('#fbgvn' + (id)).animate({ 'margin-left': '0%' }, { duration: 400 });
                        $(this).hide();
                        $('#nxtfbgvn' + (id + 1)).hide();
                        $('#prvfbgvn' + (id - 1)).show();
                        $('#nxtfbgvn' + id).show();
                        $('#pagetxt').html('Page ' + (id + 1) + ' of ' + count1);
                        $('#fbgvncurpage').val((id + 1));
                    });
                }

                ///Load footer page view
                var givencount = $('#fbgvnpagecount').val();
                if (givencount > 1) {
                    $('#pagetxt').html('Page 1 of ' + (parseInt($('#fbgvnpagecount').val())) + '');
                }
                else {
                    $('#pagetxt').html('');
                }
            },
            error: function (err) {
            }
        });
    },

    //Load feeedback Received content
    loadfbreceviedcontent: function () {
        Common.ajaxsync({
            url: '../../Feedback/GetFeedbackRecevied',
            success: function (response) {
                //debugger;
                var html = '';
                var slidehtml = '';
                var licount = 6;
                var count = response.length / licount;
                var count1 = Math.ceil(count);
                $('#fbrcvdpagecount').val(count1);
                for (var k = 0; k < count1; k++) {
                    html = html + "<ul id='fbrcv" + k + "'>";
                    for (var j = 0; j < licount / 2; j++) {
                        var i = ((k * licount) + j);
                        var o = ((k * licount) + j) + (licount / 2);
                        if (response[i] != null) {
                            html = html + " <li class='b4select stat'>" +
                              " <div class='poename'> " +
                              "<p style='font-weight:bold'>You have REP feedback from " + response[i].User.FirstName + " " + response[i].User.LastName + "</p>" +                           //   "<p> Congratulations your " + response[i].JobTitle + " has completed feedback for you</p>" +
                              "<br/>" +
                              "</div>" +
                                 "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                              "<div class='FBtxt'> " +
                                 "<p>Name of REP:&nbsp" + response[i].POE.Name + "</p> " +
                              "<p>Name:&nbsp" + response[i].User.FirstName + " " + response[i].User.LastName + "</p>" +
                              "<p>Alias:&nbsp" + response[i].User.EmailAddress + "</p>" +
                              "<p>Title:&nbsp" + response[i].JobTitle + "</p>" +
                              "</div> " +
                              "<div class='poename'>" +
                              " " + response[i].FeedbackDetails.UpdatedOn + "&nbsp;&nbsp;&nbsp;&nbsp;|" +
                              //"<a href='/Sync/BigPicture?poeid=" + response[i].POE.POEId + "&fid=" + response[i].FeedbackDetails.FeedbackId + "&ftype=" + response[i].FeedbackDetails.FeedbackType + "'>More...</a>" +
                                "<a href='/Sync/BigPicture?poeid=" + response[i].POE.POEId + "&ftype=1&mapping=" + response[i].UserPOEMappingId + "'>More...</a>" +
                                 // "<a href='/Standing/Standing'>More...</a>" +
                              "</div>" +
                              "</li>";
                        }
                        else {
                            html = html + " <li class='nonselect stat'></li>";
                        }
                        if (response[o] != null) {
                            html = html + " <li class='b4select stat'>" +
                              " <div class='poename'> " +
                              "<p style='font-weight:bold'>Congratulations, you have received a feedback for</p>" + //"<p> Congratulations your " + response[o].JobTitle + " has completed feedback for you</p>" +
                              "<br/>" +
                              "</div>" +
                              "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[o].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                              "<div class='FBtxt'> " +
                                "<p>Name of REP:&nbsp" + response[o].POE.Name + "</p> " +
                              "<p>Name:&nbsp" + response[o].User.FirstName + " " + response[o].User.LastName + "</p>" +
                              "<p>Alias:&nbsp" + response[o].User.EmailAddress + "</p>" +
                              "<p>Title:&nbsp" + response[o].JobTitle + "</p>" +
                              "</div> " +
                              "<div class='poename'>" +
                              " " + response[o].FeedbackDetails.UpdatedOn + "&nbsp;&nbsp;&nbsp;&nbsp;|" +
                              //"<a href='/Sync/BigPicture?poeid=" + response[o].POE.POEId + "&fid=" + response[o].FeedbackDetails.FeedbackId + "&ftype=" + response[o].FeedbackDetails.FeedbackType + "'>More...</a>" +
                                 "<a href='/Sync/BigPicture?poeid=" + response[o].POE.POEId + "&ftype=1&mapping=" + response[o].UserPOEMappingId + "'>More...</a>" +
                                  //"<a href='/Standing/Standing'>More...</a>" +
                              "</div>" +
                              "</li>";
                        }
                        else {
                            html = html + " <li class='nonselect stat'></li>";
                        }
                    }
                    html = html + "</ul>";
                    if (k != count1 - 1) {
                        slidehtml = slidehtml + "<div class='nxtfb' id='nxtfbrcv" + k + "' data-value=" + k + "></div><div class='prevfb' id='prvfbrcv" + k + "' data-value=" + k + "></div></ul>";
                    }
                }
                $('#sliderbtn').append("<div id='slidercvd' class='sliderdiv'>" + slidehtml + "</div>");
                $('#slidercvd').hide();
                if (response == null || response == "" || response == []) {
                    for (var l = 0; l < 6; l++) {
                        html = html + " <li class='nonselect stat'></li>";
                    }
                    count1 = 1;
                }
                $('#fbreceivedcontent').html(html);
                $('#fbreceivedcontent').css('width', count1 * 100 + '%');
                $('#fbreceivedcontent ul').width((100 / $('#fbreceivedcontent ul').length) + '%');

                for (var l = 0; l < count1; l++) {
                    $('#nxtfbrcv' + l).hide();
                    $('#prvfbrcv' + l).hide();
                }
                $('#nxtfbrcv0').show();

                for (var l = 0; l < count1; l++) {
                    $('#nxtfbrcv' + l).click(function () {
                        var id = parseInt(this.id.replace('nxtfbrcv', ''));
                        $('#fbrcv' + (id)).animate({ 'margin-left': '-100%' }, { duration: 400 });
                        $(this).hide();
                        $('#prvfbrcv' + (id - 1)).hide();
                        $('#prvfbrcv' + id).show();
                        $('#nxtfbrcv' + (id + 1)).show();
                        $('#pagetxt').html('Page ' + (id + 2) + ' of ' + count1);
                        $('#fbrcvdcurpage').val((id + 2));
                    });

                    $('#prvfbrcv' + l).click(function () {
                        var id = parseInt(this.id.replace('prvfbrcv', ''));
                        $('#fbrcv' + (id)).animate({ 'margin-left': '0%' }, { duration: 400 });
                        $(this).hide();
                        $('#nxtfbrcv' + (id + 1)).hide();
                        $('#prvfbrcv' + (id - 1)).show();
                        $('#nxtfbrcv' + id).show();
                        $('#pagetxt').html('Page ' + (id + 1) + ' of ' + count1);
                        $('#fbrcvdcurpage').val((id + 1));
                    });
                }
            },
            error: function (err) {
            }
        });
    },

    //Load feedback incomplete content
    //comment for new development
    //loadfbincompletecontent: function () {
    //    Common.ajaxsync({
    //        url: '../../Feedback/GetOutstandingFeedbacks',
    //        success: function (response) {
    //            var html = '<div class="clearIncomplete">' +
    //                //'<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
    //                '<a class="clearfb" href="#">Clear Incomplete History</a></div><div class=\'incompslidercontainer\'>';
    //            var slidehtml = '';
    //            var licount = 6;
    //            var count = response.length / licount;
    //            var count1 = Math.ceil(count);
    //            var slidercnt = 1;
    //            $('#fbstspagecount').val(count1);
    //            for (var k = 0; k < response.length; k++) {
    //                var data = response[k];
    //                var headertext = '';
    //                if (data != null) {
    //                    if (data.FeedbackDetails.FeedbackType == 2) {
    //                        headertext = 'Request to Give Profile feedback';
    //                    } else {
    //                        headertext = 'Incomplete Profile Feedback';
    //                    }
    //                    var statusText = data.FeedbackDetails.FeedbackStatus == 1 ? "Resume Feedback" : "Start Feedback";
    //                    if (k % 6 == 0) {
    //                        html = html + "<div id='slide" + slidercnt + "' class = 'incompfbslide " + ((k == 0) ? "activeslide" : "") + "'>";
    //                        slidercnt++;
    //                    }
    //                    if (data.Nooffbs != 0) {
    //                        html = html + "  <div class=\"column givefbmessage\">" +
    //                              "<h3>You have not completed feedback for " + data.Nooffbs + " person/s.</h3> " +
    //                              "<img src='../../Images/group-icon.png' width='61' height='61' alt='User' /> " +
    //                              "<div class=\"givefbmessagedetails\"> " +
    //                              "<p> Team Members</p>" +
    //                              "</div> " +
    //                              " <div class=\"clear\"></div><div class=\"incompleteBtn\">" +
    //                              " <p> Requested on: " + data.FeedbackDetails.UpdatedOn + "</p> " +
    //                              "<a href='/feedback/ResumeManagerGrpFeedback?groupid=" + data.FeedbackDetails.GroupName + "&status=" + data.FeedbackDetails.FeedbackStatus + "'>" + statusText + "</a></div>" +
    //                              "</div>";
    //                    } else {
    //                        html = html + " <div class=\"column givefbmessage\">" +
    //                              "<h3>" + headertext + "</h3> " +
    //                              "<img src='/Uploadify/LoadImageHandler.ashx?id=" + data.User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
    //                              "<div class='givefbmessagedetails'> " +
    //                              "<p>Name:&nbsp<span>" + data.User.FirstName + " " + data.User.LastName + "</span></p> " +
    //                              "<p>Alias:&nbsp<span>" + data.User.EmailAddress + "</span></p> " +
    //                              "<p>Name of REP: <span>" + response[k].POE.Name + "</span></p> " +
    //                              "</div> " +
    //                              " <div class=\"clear\"></div><div class=\"incompleteBtn\">" +
    //                              " <p> Requested on: " + data.FeedbackDetails.UpdatedOn + "</p> " +
    //                              "<a href='/feedback/ResumeFeedbak?feedbackid=" + data.FeedbackDetails.FeedbackId + "&feedbacktype=" + data.FeedbackDetails.FeedbackType + "&feedbackfor=" + data.FeedbackDetails.RequestedForId + "&status=" + data.FeedbackDetails.FeedbackStatus + "&poeid=" + data.POE.POEId + "'>" + statusText + "</a></div>" +
    //                              "</div>";
    //                    }
    //                    if ((k + 1) % 2 == 0) {
    //                        html = html + "<br style='clear:both'>";
    //                    }
    //                    if (k % 6 == 5) {
    //                        html = html + "</div>";
    //                    }
    //                }
    //                else {
    //                    html = html + " <li class='nonselect stat'></li>";
    //                }
    //            }
    //            if ((response.length % licount) != 0 || response.length == 0) {
    //                for (var i = 0; i < licount - (response.length % licount) ; i++) {
    //                    if ((response.length + i) % 2 == 0 && i != 0) {
    //                        html += '<br style="clear:both">';
    //                    }
    //                    html += "<div class=\"column givefbmessageDummy3\"></div>";
    //                }
    //            }
    //            if (response.length == 0) { slidercnt = 2; }
    //            html += '</div></div>'
    //            if (count > 1) {
    //                html += feedback.getPaginationhtml(count1, 'incompslidercontainer');
    //            }
    //            $('.histroyArea').html(html);
    //            $('.incompslidercontainer').width((slidercnt - 1) * 100 + '%');
    //            $('.incompfbslide').width(100 / (slidercnt - 1) + '%');
    //            var incompleteCount = "";
    //            if (response.length < 10 && response.length >= 1) {
    //                incompleteCount = "0" + response.length;
    //            } else {
    //                incompleteCount = response.length;
    //            }
    //            $('#incompleteFbCount').html(incompleteCount);
    //        },
    //        error: function (err) {
    //        }
    //    });
    //},
    //loadfbincompletecontent: function (response) {
    //    //Common.ajaxsync({
    //    //    url: '../../Feedback/GetOutstandingFeedbacks',
    //    //    success: function (response) {
    //    //debugger;
    //    var incompleteCount = 0;
    //    if (response.length < 10 && response.length >= 1) {
    //        incompleteCount = "0" + response.length;
    //    } else {
    //        incompleteCount = response.length;
    //    }
    //    $('#incompleteFbCount').html(incompleteCount);
    //    var html = "";
    //    var overallcnt = 0;
    //    var overallhtml = "";
    //    var licount = 6;
    //    for (var k = 0; k < response.length; k++) {
    //        var data = response[k];
    //        var headertext = '';
    //        if (data != null) {
    //            if (data.FeedbackDetails.FeedbackType == 2) {
    //                headertext = 'Request to Give Profile feedback';
    //            } else {
    //                headertext = 'Incomplete Profile Feedback';
    //            }
    //            var statusText = data.FeedbackDetails.FeedbackStatus == 1 ? "Resume Feedback" : "Start Feedback";
    //            if (data.Nooffbs != 0) {
    //                html = "<div class=\"column givefbmessage\">" +
    //                    "<h3> You have not completed feedback for " + data.Nooffbs + " person/s.</h3> " +
    //                    "<img src='../../Images/group-icon.png' width='61' height='61' alt='User' />" +
    //                    "<div class=\"givefbmessagedetails\"> " +
    //                      "<p class='repGroup'>Name of REP: <span>" + data.POE.Name + "</span></p> " +
    //                    "</div> " +
    //                    " <div class=\"clear\"></div> <div class=\"incompleteBtn\">" +
    //                    " <p class='completedMsg'>Requested on: " + data.FeedbackDetails.UpdatedOn + "</p>" +

    //                    "  <div class='historyBtn'>" +

    //                    //"<a href=\"#\" style='display:none'>Save in OneNote</a>" +
    //                    //"<a href=\"#\"  class='viewnotes' data-fbid= '" + response[k].FeedbackDetails.FeedbackId + "' >View Notes</a>" +
    //                    "<a href='/feedback/ResumeManagerGrpFeedback?groupid=" + data.FeedbackDetails.GroupName + "&status=" + data.FeedbackDetails.FeedbackStatus + "'>" + statusText + "</a></div>" +
    //                    "</div></div> ";
    //            } else {
    //                html = "<div class=\"column givefbmessage\">" +
    //                   "<h3>" + headertext + "</h3> " +
    //                   "<img src='/Uploadify/LoadImageHandler.ashx?id=" + data.User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
    //                   "<div class=\"givefbmessagedetails\"> " +
    //                  "<p>Name:&nbsp<span>" + data.User.FirstName + " " + data.User.LastName + "</span></p> " +
    //                     "<p>Alias:&nbsp<span>" + data.User.EmailAddress + "</span></p> " +
    //                     "<p>Name of REP: <span>" + response[k].POE.Name + "</span></p> " +
    //                   "</div> " +
    //                   " <div class=\"clear\"></div> <div class=\"incompleteBtn\">" +
    //                   " <p class='completedMsg'>Requested on: " + data.FeedbackDetails.UpdatedOn + "</p>" + "  <div class='historyBtn'>" +
    //                   //"<a href=\"#\" style='display:none'>Save in OneNote</a>" +
    //                   //"<a href=\"#\"  class='viewnotes' data-fbid= '" + response[k].FeedbackDetails.FeedbackId + "' >View Notes</a>" +
    //                   "<a href='/feedback/ResumeFeedbak?feedbackid=" + data.FeedbackDetails.FeedbackId + "&feedbacktype=" + data.FeedbackDetails.FeedbackType + "&feedbackfor=" + data.FeedbackDetails.RequestedForId + "&status=" + data.FeedbackDetails.FeedbackStatus + "&poeid=" + data.POE.POEId + "'>" + statusText + "</a></div>" +
    //                   "</div></div> ";
    //            }

    //            if (overallcnt % 6 == 0 && overallcnt / 6 == 1 && overallcnt != 0) {
    //                overallhtml = "<div id=\"fbincompleteall" + (overallcnt / 6) + "\" class= \"historyfbslide activeslide\">" + overallhtml + "</div><div id=\"fbincompleteall" + ((overallcnt / 6) + 1) + "\" class= \"historyfbslide\">";
    //            }
    //            else if (overallcnt % 6 == 0 && overallcnt != 0) {
    //                overallhtml += "</div><div id=\"fbincompleteall" + ((overallcnt / 6) + 1) + "\" class= \"historyfbslide\">";
    //            }
    //            overallhtml += html; overallcnt++;
    //            if (overallcnt % 2 == 0) {
    //                overallhtml += '<br style="clear:both"/>';
    //            }
    //        }
    //    }
    //    html = html + "</div>";
    //    if ((overallcnt % licount) != 0 || overallcnt == 0) {
    //        for (var i = 0; i < licount - (overallcnt % licount) ; i++) {
    //            if ((overallcnt + i) % 2 == 0 && i != 0) {
    //                overallhtml += '<br style="clear:both"/>';
    //            }
    //            overallhtml += "<div class=\"column givefbmessageDummy\"></div>";
    //        }
    //        overallcnt += i;
    //    }

    //    $('#historyincompleteItem').html(overallhtml);
    //    $('#historyincompleteItempaging').html((((overallcnt / licount) > 1) ? feedback.getPaginationhtml((overallcnt / licount), 'IncompleteAll') : ""));
    //    $('#historyincompleteItem').width((overallcnt / licount) * 100 + '%');
    //    //    },
    //    //    error: function (err) {
    //    //    }
    //    //});
    //},
    loadfbincompletecontent: function (response) {
        // debugger;

        
       
        var html = "";
        var overallcnt = 0;
        var overallhtml = "";
        var licount = 6;
        for (var k = 0; k < response.length; k++) {
            var data = response[k];
            var headertext = '';
            if (data != null) {
                if (data.FeedbackDetails.FeedbackStatus != 0) {
                    if (data.FeedbackDetails.FeedbackType == 2) {
                        headertext = 'Request to Give Profile feedback';
                    } else {
                        headertext = 'Incomplete Profile Feedback';
                    }
                    var statusText = data.FeedbackDetails.FeedbackStatus == 1 ? "Resume Feedback" : "Start Feedback";
                    if (data.Nooffbs != 0) {
                        html = "<div class=\"column givefbmessage\" data-groupId=" + data.FeedbackDetails.GroupName + " data-fbs=" + data.Nooffbs + ">" +
                            "<h3 class='grpFbbaseTile'> You have not completed feedback for " + data.Nooffbs + " person/s</h3><span class='deleteIncomplete'><img src='../../Images/deletefb-icon.png' alt=''/></span> " +
                            "<img src='../../Images/group-icon.png' width='61' height='61' alt='User' />" +
                            "<div class=\"givefbmessagedetails\"> " +
                            "<p class='repGroup'>Name of REP: <span>" + data.POE.Name + "</span></p> " +
                            "</div> " +
                            " <div class=\"clear\"></div> <div class=\"incompleteBtn\">" +
                            " <p class='completedMsg'>Requested on: " + data.FeedbackDetails.UpdatedOn + "</p>" +
                            "  <div class='historyBtn'>" +
                            //"<a href=\"#\" style='display:none'>Save in OneNote</a>" +
                            //"<a href=\"#\"  class='viewnotes' data-fbid= '" + response[k].FeedbackDetails.FeedbackId + "' >View Notes</a>" +
                            "<a href='/feedback/ResumeManagerGrpFeedback?groupid=" + data.FeedbackDetails.GroupName + "&status=" + data.FeedbackDetails.FeedbackStatus + "'>" + statusText + "</a></div>" +
                            "</div></div> ";
                    } else {
                        html = "<div class=\"column givefbmessage\" data-feedbackid=" + data.FeedbackDetails.FeedbackId + " data-fbs=" + data.Nooffbs + ">" +
                            "<h3>" + headertext + "</h3><span class='deleteIncomplete'><img src='../../Images/deletefb-icon.png' alt=''/></span> " +
                            "<img src='/Uploadify/LoadImageHandler.ashx?id=" + data.User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                            "<div class=\"givefbmessagedetails\"> " +
                            "<p>Name:&nbsp<span>" + data.User.FirstName + " " + data.User.LastName + "</span></p> " +
                            "<p>Alias:&nbsp<span>" + data.User.EmailAddress + "</span></p> " +
                            "<p>Name of REP: <span>" + response[k].POE.Name + "</span></p> " +
                            "</div> " +
                            " <div class=\"clear\"></div> <div class=\"incompleteBtn\">" +
                            " <p class='completedMsg'>Requested on: " + data.FeedbackDetails.UpdatedOn + "</p>" + "  <div class='historyBtn'>" +
                            //"<a href=\"#\" style='display:none'>Save in OneNote</a>" +
                           //"<a href=\"#\"  class='viewnotes' data-fbid= '" + response[k].FeedbackDetails.FeedbackId + "' >View Notes</a>" +
                            "<a href='/feedback/ResumeFeedbak?feedbackid=" + data.FeedbackDetails.FeedbackId + "&feedbacktype=" + data.FeedbackDetails.FeedbackType + "&feedbackfor=" + data.FeedbackDetails.RequestedForId + "&status=" + data.FeedbackDetails.FeedbackStatus + "&poeid=" + data.POE.POEId + "'>" + statusText + "</a></div>" +
                            "</div></div> ";
                    }

                    if (overallcnt % 6 == 0 && overallcnt / 6 == 1 && overallcnt != 0) {
                        overallhtml = "<div id=\"fbincompleteall" + (overallcnt / 6) + "\" class= \"historyfbslide activeslide\">" + overallhtml + "</div><div id=\"fbincompleteall" + ((overallcnt / 6) + 1) + "\" class= \"historyfbslide\">";
                    } else if (overallcnt % 6 == 0 && overallcnt != 0) {
                        overallhtml += "</div><div id=\"fbincompleteall" + ((overallcnt / 6) + 1) + "\" class= \"historyfbslide\">";
                    }
                    overallhtml += html;
                    overallcnt++;
                    if (overallcnt % 2 == 0) {
                        overallhtml += '<br style="clear:both"/>';
                    }
                }
            }
        }
        html = html + "</div>";
        var incompleteCount = 0;
        if (overallcnt < 10 && overallcnt >= 1) {
            incompleteCount = "0" + overallcnt;
        } else {
            incompleteCount = overallcnt;
        }
        $('#incompleteFbCount').html(incompleteCount);
        if ((overallcnt % licount) != 0 || overallcnt == 0) {
            for (var i = 0; i < licount - (overallcnt % licount) ; i++) {
                if ((overallcnt + i) % 2 == 0 && i != 0) {
                    overallhtml += '<br style="clear:both"/>';
                }
                overallhtml += "<div class=\"column givefbmessageDummy\"></div>";
            }
            overallcnt += i;
        }

        $('#historyincompleteItem').html(overallhtml);
        $('#historyincompleteItempaging').html((((overallcnt / licount) > 1) ? feedback.getPaginationhtml((overallcnt / licount), 'IncompleteAll') : ""));
        $('#historyincompleteItem').width((overallcnt / licount) * 100 + '%');

        if (response.length != 0) {

            for (var k = 0; k < response.length; k++) {
                var data = response[k];
                // alert(response.length);

                if (data.FeedbackDetails.FeedbackType == 2) {
                    if (data.Nooffbs != 0) {
                        // alert('grp');
                        if (data.FeedbackDetails.FeedbackStatus == 1) {
                            var hrefgrp = "/feedback/ResumeManagerGrpFeedback?groupid=" + data.FeedbackDetails.GroupName + "&status=" + data.FeedbackDetails.FeedbackStatus + "";
                            $('#isResumefeedback').val(1);
                            $('#resumeTeamfb').attr("href", hrefgrp);
                        } else {
                            $('#isResumefeedback').val(0);
                            $('#resumeTeamfb').attr("href", "");
                        }
                        break;
                    } else {
                        //alert('single');
                        if (data.FeedbackDetails.FeedbackStatus == 1) {
                            var hrefSingle = "/feedback/ResumeFeedbak?feedbackid=" + data.FeedbackDetails.FeedbackId + "&feedbacktype=" + data.FeedbackDetails.FeedbackType + "&feedbackfor=" + data.FeedbackDetails.RequestedForId + "&status=" + data.FeedbackDetails.FeedbackStatus + "&poeid=" + data.POE.POEId + "";
                            $('#isResumefeedback').val(1);
                            $('#resumeTeamfb').attr("href", hrefSingle);
                        } else {
                            $('#isResumefeedback').val(0);
                            $('#resumeTeamfb').attr("href", "");
                        }
                        break;
                    }
                } else {
                    $('#isResumefeedback').val(0);
                    $('#resumeTeamfb').attr("href", "");
                }



            }
            for (var j = 0; j < response.length; j++) {
                var data = response[j];
                if (data.FeedbackDetails.FeedbackType == 1) {
                    if (data.FeedbackDetails.FeedbackStatus == 1) {
                        var hrefSingle1 = "/feedback/ResumeFeedbak?feedbackid=" + data.FeedbackDetails.FeedbackId + "&feedbacktype=" + data.FeedbackDetails.FeedbackType + "&feedbackfor=" + data.FeedbackDetails.RequestedForId + "&status=" + data.FeedbackDetails.FeedbackStatus + "&poeid=" + data.POE.POEId + "";
                        $('#isSelfResume').val(1);
                        $('#takefbResume').show();
                        $('#takeFb').hide();
                        $('#resumeSelf').attr("href", hrefSingle1);
                    } else {
                        $('#isSelfResume').val(0);
                        $('#takefbResume').hide();
                        $('#takeFb').show();
                        $('#resumeSelf').attr("href", "");
                    }
                    break;
                } else {
                    $('#isSelfResume').val(0);
                    $('#resumeSelf').attr("href", "");
                }
            }
        } else {
            $('#isResumefeedback').val(0);
            $('#resumeTeamfb').attr("href", "");
            $('#isSelfResume').val(0);
            $('#resumeSelf').attr("href", "");
        }

        //    },
        //    error: function (err) {
        //    }
        //});
    },
    //Load feedback history content
    loadfbHistorycontent: function () {
        Common.ajaxsync({
            url: '../../Feedback/GetFeedbackHistorys',
            success: function (response) {
                // debugger;
                var t = response.OverallFeedback + response.IncompletFeedback;
                var type = 1;
                var html = '';
                var takenhtml = '';
                var takencnt = 0;
                var receivedhtml = '';
                var receivedcnt = 0;
                var givenhtml = '';
                var givencnt = 0;
                var slidehtml = '';
                var overallhtml = '';
                var overallcnt = 0;
                var licount = 6;
                var count = response.OverallFeedback.length / licount;
                var totalcount = 0;
                // debugger;
                var count1 = Math.ceil(count);
                $('#fbhispagecount').val(count1);
                var userid = Common.GetUserId();
                for (var k = 0; k < response.OverallFeedback.length; k++) {
                    if (response.OverallFeedback[k] != null) {
                        if ((response.OverallFeedback[k].Designation.DesignationId == 2 || response.OverallFeedback[k].Designation.DesignationId == 3 || response.OverallFeedback[k].Designation.DesignationId == 5 || response.OverallFeedback[k].Designation.DesignationId == 6) || response.OverallFeedback[k].FeedbackDetails.RequestedFromId == response.OverallFeedback[k].FeedbackDetails.RequestedForId) {// final condition added to check for self feedback
                            type = 1;
                        } else {
                            type = 2;
                        }
                        if (response.OverallFeedback[k].FeedbackDetails.FeedbackStatus == 2) {
                            totalcount++;
                            if (response.OverallFeedback[k].UserId == response.OverallFeedback[k].FeedbackDetails.RequestedFrom.User.UserId) {
                                html = html + "<div class=\"column givefbmessage\">" +
                                    "<h3> Completed by: " + response.OverallFeedback[k].FeedbackDetails.RequestedFrom.User.FirstName + " " + response.OverallFeedback[k].FeedbackDetails.RequestedFrom.User.LastName + "</h3> " +
                                    "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response.OverallFeedback[k].FeedbackDetails.RequestedFor.User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                                    "<div class=\"givefbmessagedetails\"> " +
                                    "<p>Name:&nbsp<span>" + response.OverallFeedback[k].FeedbackDetails.RequestedFor.User.FirstName + " " + response.OverallFeedback[k].FeedbackDetails.RequestedFor.User.LastName + "</span></p> " +
                                    "<p>Alias: <span>" + response.OverallFeedback[k].FeedbackDetails.RequestedFor.User.EmailAddress + "</span></p> " +
                                    "<p>Function: <span>" + response.OverallFeedback[k].JobTitle + "</span></p> " +
                                    "<p>Name of REP: <span>" + response.OverallFeedback[k].POE.Name + "</span></p> " +
                                    "</div> " +
                                    " <div class=\"clear\"></div> <div class=\"incompleteBtn\">" +
                                    " <p class='completedMsg'>Completed on: " + response.OverallFeedback[k].FeedbackDetails.UpdatedOn + "</p>" + "  <div class='historyBtn'>";
                                //"<a href=\"#\" style='display:none'>Save in OneNote</a>" +
                                //"<a href=\"#\"  class='viewnotes' data-fbid= '" + response[k].FeedbackDetails.FeedbackId + "' >View Notes</a>" +
                                var resultmode = $('#resultmode').val();
                                if (resultmode != "True") {
                                    html = html + "<a href='/managersync/BigPicture?ftype=" + type + "&poeid=" + response.OverallFeedback[k].POE.POEId + "&mapping=" + response.OverallFeedback[k].UserPOEMappingId + "'>View Results</a>";
                                }

                                html = html + "</div>" +
                                "</div></div> ";
                            } else {
                                html = html + "<div class=\"column givefbmessage\">";
                                if (response.OverallFeedback[k].FeedbackDetails.RequestedFrom.User.UserId == userid) {
                                    html = html + "<h3> " + response.OverallFeedback[k].FeedbackDetails.RequestedFrom.User.FirstName + " " + response.OverallFeedback[k].FeedbackDetails.RequestedFrom.User.LastName + "  has given you Feedback</h3> ";
                                } else {
                                    html = html + "<h3>You have received a Feedback from " + response.OverallFeedback[k].FeedbackDetails.RequestedFrom.User.FirstName + " " + response.OverallFeedback[k].FeedbackDetails.RequestedFrom.User.LastName + "</h3> ";
                                }
                                html = html + "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response.OverallFeedback[k].FeedbackDetails.RequestedFrom.User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                                    "<div class=\"givefbmessagedetails\"> " +
                                    "<p>REP: <span>" + response.OverallFeedback[k].POE.Name + "</span></p> " +
                                    "<p>Name:&nbsp<span>" + response.OverallFeedback[k].FeedbackDetails.RequestedFrom.User.FirstName + " " + response.OverallFeedback[k].FeedbackDetails.RequestedFrom.User.LastName + "</span></p> " +
                                    "<p>Title: <span>" + response.OverallFeedback[k].JobTitle + "</span></p> " +
                                    "<p>Alias: <span>" + response.OverallFeedback[k].FeedbackDetails.RequestedFrom.User.EmailAddress + "</span></p> " +
                                    "</div> " +
                                    " <div class=\"clear\"></div> <div class=\"incompleteBtn\">" +
                                    "<p class='completedMsg'>Completed on: " + response.OverallFeedback[k].FeedbackDetails.UpdatedOn + "</p>" + "  <div class='historyBtn'>";
                                //"<a href=\"#\" style='display:none'>Save in OneNote</a>" +
                                //"<a href=\"#\">View Notes</a>" +
                                var resultmodes = $('#resultmode').val();
                                if (resultmodes != "True") {
                                    html = html + "<a href='/managersync/BigPicture?ftype=" + type + "&poeid=" + response.OverallFeedback[k].POE.POEId + "&mapping=" + response.OverallFeedback[k].UserPOEMappingId + "'>View Results</a>";
                                }
                                html = html + "</div>" +
                                    "</div></div> ";
                            }
                        }

                        //else {
                        //    var headertext = "";

                        //    if (response.OverallFeedback[k].FeedbackDetails.FeedbackType == 2) {
                        //        headertext = 'Request to Give Profile feedback';
                        //    } else {
                        //        headertext = 'Incomplete Profile Feedback';
                        //    }
                        //    var statusText = response.OverallFeedback[k].FeedbackDetails.FeedbackStatus == 1 ? "Resume Feedback" : "Start Feedback";
                        //    if (response.OverallFeedback[k].Nooffbs != 0) {
                        //        //debugger;
                        //        html = "<div class=\"column givefbmessage\">" +
                        //            "<h3> You have not completed feedback for " + response.OverallFeedback[k].Nooffbs + " person/s.</h3> " +
                        //            "<img src='../../Images/group-icon.png' width='61' height='61' alt='User' />" +
                        //            "<div class=\"givefbmessagedetails\"> " +
                        //             "<p class='repGroup'>Name of REP: <span>" + response.OverallFeedback[k].POE.Name + "</span></p> " +
                        //            "</div> " +
                        //            " <div class=\"clear\"></div> <div class=\"incompleteBtn\">" +
                        //            " <p class='completedMsg'>Requested on: " + response.OverallFeedback[k].FeedbackDetails.UpdatedOn + "</p>" +


                        //            "  <div class='historyBtn'>" +

                        //            //"<a href=\"#\" style='display:none'>Save in OneNote</a>" +
                        //            //"<a href=\"#\"  class='viewnotes' data-fbid= '" + response[k].FeedbackDetails.FeedbackId + "' >View Notes</a>" +
                        //            "<a href='/feedback/ResumeManagerGrpFeedback?groupid=" + response.OverallFeedback[k].FeedbackDetails.GroupName + "&status=" + response.OverallFeedback[k].FeedbackDetails.FeedbackStatus + "'>" + statusText + "</a></div>" +
                        //            "</div></div> ";
                        //    } else {
                        //        html = "<div class=\"column givefbmessage\">" +
                        //           "<h3>" + headertext + "</h3> " +
                        //           "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response.OverallFeedback[k].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                        //           "<div class=\"givefbmessagedetails\"> " +
                        //          "<p>Name:&nbsp<span>" + response.OverallFeedback[k].User.FirstName + " " + response.OverallFeedback[k].User.LastName + "</span></p> " +
                        //             "<p>Alias:&nbsp<span>" + response.OverallFeedback[k].User.EmailAddress + "</span></p> " +
                        //             "<p>Name of REP: <span>" + response.OverallFeedback[k].POE.Name + "</span></p> " +
                        //           "</div> " +
                        //           " <div class=\"clear\"></div> <div class=\"incompleteBtn\">" +
                        //           " <p class='completedMsg'>Requested on: " + response.OverallFeedback[k].FeedbackDetails.UpdatedOn + "</p>" + "  <div class='historyBtn'>" +
                        //           //"<a href=\"#\" style='display:none'>Save in OneNote</a>" +
                        //           //"<a href=\"#\"  class='viewnotes' data-fbid= '" + response[k].FeedbackDetails.FeedbackId + "' >View Notes</a>" +
                        //           "<a href='/feedback/ResumeFeedbak?feedbackid=" + response.OverallFeedback[k].FeedbackDetails.FeedbackId + "&feedbacktype=" + response.OverallFeedback[k].FeedbackDetails.FeedbackType + "&feedbackfor=" + response.OverallFeedback[k].FeedbackDetails.RequestedForId + "&status=" + response.OverallFeedback[k].FeedbackDetails.FeedbackStatus + "&poeid=" + response.OverallFeedback[k].POE.POEId + "'>" + statusText + "</a></div>" +
                        //           "</div></div> ";
                        //    }


                        //}
                    }
                    else {
                        html = html + "<li class='nonselect stat'></li>";
                    }
                    if (response.OverallFeedback[k].FeedbackDetails.FeedbackStatus == 2) {
                        if (overallcnt % 6 == 0 && overallcnt / 6 == 1 && overallcnt != 0) {
                            overallhtml = "<div id=\"fbhistoryall" + (overallcnt / 6) + "\" class= \"historyfbslide activeslide\">" + overallhtml + "</div><div id=\"fbhistoryall" + ((overallcnt / 6) + 1) + "\" class= \"historyfbslide\">";
                        } else if (overallcnt % 6 == 0 && overallcnt != 0) {
                            overallhtml += "</div><div id=\"fbhistoryall" + ((overallcnt / 6) + 1) + "\" class= \"historyfbslide\">";
                        }
                        overallhtml += html;
                        overallcnt++;
                        if (overallcnt % 2 == 0) {
                            overallhtml += '<br style="clear:both"/>';
                        }
                    }
                    if ((response.OverallFeedback[k].FeedbackDetails.RequestedFromId == response.OverallFeedback[k].FeedbackDetails.RequestedForId) && response.OverallFeedback[k].FeedbackDetails.FeedbackStatus == 2) {
                        if (takencnt % 6 == 0 && takencnt / 6 == 1 && takencnt != 0) {
                            takenhtml = "<div id=\"fbhistorytaken" + (takencnt / 6) + "\" class= \"historyfbslide activeslide\">" + takenhtml + "</div><div id=\"fbhistorytaken" + ((takencnt / 6) + 1) + "\" class= \"historyfbslide\">";
                        }
                        else if (takencnt % 6 == 0 && takencnt != 0) {
                            takenhtml += "</div><div id=\"fbhistorytaken" + ((takencnt / 6) + 1) + "\" class= \"historyfbslide\">";
                        }
                        takenhtml += html;
                        takencnt++;
                        if (takencnt % 2 == 0) {
                            takenhtml += '<br style="clear:both"/>';
                        }
                    }

                    else if ((response.OverallFeedback[k].FeedbackDetails.RequestedFrom.User.UserId == userid) && response.OverallFeedback[k].FeedbackDetails.FeedbackStatus == 2) {
                        if (receivedcnt % 6 == 0 && receivedcnt / 6 == 1 && receivedcnt != 0) {
                            receivedhtml = "<div id=\"fbhistoryreceived" + (receivedcnt / 6) + "\" class= \"historyfbslide activeslide\">" + receivedhtml + "</div><div id=\"fbhistoryreceived" + ((receivedcnt / 6) + 1) + "\" class= \"historyfbslide\">";
                        }
                        else if (receivedcnt % 6 == 0 && receivedcnt != 0) {
                            receivedhtml += "</div><div id=\"fbhistoryreceived" + ((receivedcnt / 6) + 1) + "\" class= \"historyfbslide\">";
                        }
                        receivedhtml += html;
                        receivedcnt++;
                        if (receivedcnt % 2 == 0) {
                            receivedhtml += '<br style="clear:both"/>';
                        }
                    }
                    else if ((response.OverallFeedback[k].FeedbackDetails.RequestedFor.User.UserId == userid) && response.OverallFeedback[k].FeedbackDetails.FeedbackStatus == 2) {
                        if (givencnt % 6 == 0 && givencnt / 6 == 1 && givencnt != 0) {
                            givenhtml = "<div id=\"fbhistorygiven" + (givencnt / 6) + "\" class= \"historyfbslide activeslide\">" + givenhtml + "</div><div id=\"fbhistorygiven" + ((givencnt / 6) + 1) + "\" class= \"historyfbslide\">";
                        }
                        else if (givencnt % 6 == 0 && givencnt != 0) {
                            givenhtml += "</div><div id=\"fbhistorygiven" + ((givencnt / 6) + 1) + "\" class= \"historyfbslide\">";
                        }
                        givenhtml += html;
                        givencnt++;
                        if (givencnt % 2 == 0) {
                            givenhtml += '<br style="clear:both"/>';
                        }
                    }
                    html = '';
                }
                html = html + "</div>";
                $('#historyCount').val(takencnt);
                if ((takencnt % licount) != 0 || takencnt == 0) {
                    for (var i = 0; i < licount - (takencnt % licount) ; i++) {
                        if ((takencnt + i) % 2 == 0 && i != 0) {
                            takenhtml += '<br style="clear:both"/>';
                        }
                        takenhtml += "<div class=\"column givefbmessageDummy\"></div>";
                    }
                    takencnt += i;
                }
                if ((overallcnt % licount) != 0 || overallcnt == 0) {
                    for (var i = 0; i < licount - (overallcnt % licount) ; i++) {
                        if ((overallcnt + i) % 2 == 0 && i != 0) {
                            overallhtml += '<br style="clear:both"/>';
                        }
                        overallhtml += "<div class=\"column givefbmessageDummy\"></div>";
                    }
                    overallcnt += i;
                }
                if ((givencnt % licount) != 0 || givencnt == 0) {
                    for (var i = 0; i < licount - (givencnt % licount) ; i++) {
                        if ((givencnt + i) % 2 == 0 && i != 0) {
                            givenhtml += '<br style="clear:both"/>';
                        }
                        givenhtml += "<div class=\"column givefbmessageDummy\"></div>";
                    }
                    givencnt += i;
                }
                if ((receivedcnt % licount) != 0 || receivedcnt == 0) {
                    for (var i = 0; i < licount - (receivedcnt % licount) ; i++) {
                        if ((receivedcnt + i) % 2 == 0 && i != 0) {
                            receivedhtml += '<br style="clear:both"/>';
                        }
                        receivedhtml += "<div class=\"column givefbmessageDummy\"></div>";
                    }
                    receivedcnt += i;
                }
                $('#historycustomer').html(overallhtml);
                $('#historycustomerpaging').html((((overallcnt / licount) > 1) ? feedback.getPaginationhtml((overallcnt / licount), 'HistoryAll') : ""));
                $('#historyskip').html(takenhtml);
                $('#historyskippaging').html((((takencnt / licount) > 1) ? feedback.getPaginationhtml((takencnt / licount), 'HistoryTaken') : ""));
                $('#historymanager').html(givenhtml);
                $('#historymanagerpaging').html((((givencnt / licount) > 1) ? feedback.getPaginationhtml((givencnt / licount), 'HistoryReceived') : ""));
                $('#historyPeers').html(receivedhtml);
                $('#historyPeerspaging').html((((receivedcnt / licount) > 1) ? feedback.getPaginationhtml((receivedcnt / licount), 'HistoryGiven') : ""));
                $('#historyskip').width((takencnt / licount) * 100 + '%');
                $('#historymanager').width((givencnt / licount) * 100 + '%');
                $('#historyPeers').width((receivedcnt / licount) * 100 + '%');
                $('#historycustomer').width((overallcnt / licount) * 100 + '%');
                $('.historyInnerPart .givefbContent>div').hide();
                feedback.highlightgivefbmenu('customer', 'history');
                $('.selecthistory').click();
                $('#historycustomer,#historycustomerpaging').show();
                $('#historyComment').text("History of all Feedback.");
                feedback.loadfbincompletecontent(response.IncompletFeedback);
            },
            error: function (err) {
            }
        });
    },
    //comment for latest dev history content
    //loadfbHistorycontent: function () {
    //    Common.ajaxsync({
    //        url: '../../Feedback/GetFeedbackHistory',
    //        success: function (response) {
    //            //debugger;
    //            var type = 1;
    //            var html = '';
    //            var takenhtml = '';
    //            var takencnt = 0;
    //            var receivedhtml = '';
    //            var receivedcnt = 0;
    //            var givenhtml = '';
    //            var givencnt = 0;
    //            var slidehtml = '';
    //            var overallhtml = '';
    //            var overallcnt = 0;
    //            var licount = 6;
    //            var count = response.length / licount;
    //            // debugger;
    //            var count1 = Math.ceil(count);
    //            $('#fbhispagecount').val(count1);
    //            var userid = Common.GetUserId();
    //            for (var k = 0; k < response.length; k++) {
    //                if (response[k] != null) {
    //                    if ((response[k].Designation.DesignationId == 2 || response[k].Designation.DesignationId == 3 || response[k].Designation.DesignationId == 5 || response[k].Designation.DesignationId == 6) || response[k].FeedbackDetails.RequestedFromId == response[k].FeedbackDetails.RequestedForId) {// final condition added to check for self feedback
    //                        type = 1;
    //                    } else {
    //                        type = 2;
    //                    }
    //                    if (response[k].UserId == response[k].FeedbackDetails.RequestedFrom.User.UserId) {
    //                        html = html + "<div class=\"column givefbmessage\">" +
    //                        "<h3> Completed by: " + response[k].FeedbackDetails.RequestedFrom.User.FirstName + " " + response[k].FeedbackDetails.RequestedFrom.User.LastName + "</h3> " +
    //                        "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[k].FeedbackDetails.RequestedFor.User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
    //                        "<div class=\"givefbmessagedetails\"> " +
    //                        "<p>Name:&nbsp<span>" + response[k].FeedbackDetails.RequestedFor.User.FirstName + " " + response[k].FeedbackDetails.RequestedFor.User.LastName + "</span></p> " +
    //                        "<p>Alias: <span>" + response[k].FeedbackDetails.RequestedFor.User.EmailAddress + "</span></p> " +
    //                        "<p>Function: <span>" + response[k].JobTitle + "</span></p> " +
    //                        "<p>Name of REP: <span>" + response[k].POE.Name + "</span></p> " +
    //                        "</div> " +
    //                        " <div class=\"clear\"></div> <div class=\"incompleteBtn\">" +
    //                        " <p class='completedMsg'>Completed on: " + response[k].FeedbackDetails.UpdatedOn + "</p>" + "  <div class='historyBtn'>" +
    //                            //"<a href=\"#\" style='display:none'>Save in OneNote</a>" +
    //                            //"<a href=\"#\"  class='viewnotes' data-fbid= '" + response[k].FeedbackDetails.FeedbackId + "' >View Notes</a>" +
    //                            "<a href='/managersync/BigPicture?ftype=" + type + "&poeid=" + response[k].POE.POEId + "&mapping=" + response[k].UserPOEMappingId + "'>View Results</a></div>" +
    //                        "</div></div> ";
    //                    } else {
    //                        html = html + "<div class=\"column givefbmessage\">";
    //                        if (response[k].FeedbackDetails.RequestedFrom.User.UserId == userid) {
    //                            html = html + "<h3> " + response[k].FeedbackDetails.RequestedFrom.User.FirstName + " " + response[k].FeedbackDetails.RequestedFrom.User.LastName + "  has given you Feedback</h3> ";
    //                        }
    //                        else {
    //                            html = html + "<h3>You completed Feedback for " + response[k].FeedbackDetails.RequestedFrom.User.FirstName + " " + response[k].FeedbackDetails.RequestedFrom.User.LastName + "</h3> ";
    //                        }
    //                        html = html + "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[k].FeedbackDetails.RequestedFrom.User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
    //                        "<div class=\"givefbmessagedetails\"> " +
    //                        "<p>REP: <span>" + response[k].POE.Name + "</span></p> " +
    //                        "<p>Name:&nbsp<span>" + response[k].FeedbackDetails.RequestedFrom.User.FirstName + " " + response[k].FeedbackDetails.RequestedFrom.User.LastName + "</span></p> " +
    //                        "<p>Title: <span>" + response[k].JobTitle + "</span></p> " +
    //                        "<p>Alias: <span>" + response[k].FeedbackDetails.RequestedFrom.User.EmailAddress + "</span></p> " +
    //                        "</div> " +
    //                        " <div class=\"clear\"></div> <div class=\"incompleteBtn\">" +
    //                        "<p class='completedMsg'>Completed on: " + response[k].FeedbackDetails.UpdatedOn + "</p>" + "  <div class='historyBtn'>" +
    //                            //"<a href=\"#\" style='display:none'>Save in OneNote</a>" +
    //                            //"<a href=\"#\">View Notes</a>" +
    //                            "<a href='/managersync/BigPicture?ftype=" + type + "&poeid=" + response[k].POE.POEId + "&mapping=" + response[k].UserPOEMappingId + "'>View Results</a></div>" +
    //                        "</div></div> ";
    //                    }
    //                }
    //                else {
    //                    html = html + "<li class='nonselect stat'></li>";
    //                }

    //                if (overallcnt % 6 == 0 && overallcnt / 6 == 1 && overallcnt != 0) {
    //                    overallhtml = "<div id=\"fbhistoryall" + (overallcnt / 6) + "\" class= \"historyfbslide activeslide\">" + overallhtml + "</div><div id=\"fbhistoryall" + ((overallcnt / 6) + 1) + "\" class= \"historyfbslide\">";
    //                }
    //                else if (overallcnt % 6 == 0 && overallcnt != 0) {
    //                    overallhtml += "</div><div id=\"fbhistoryall" + ((overallcnt / 6) + 1) + "\" class= \"historyfbslide\">";
    //                }
    //                overallhtml += html; overallcnt++;
    //                if (overallcnt % 2 == 0) {
    //                    overallhtml += '<br style="clear:both"/>';
    //                }
    //                if (response[k].FeedbackDetails.RequestedFromId == response[k].FeedbackDetails.RequestedForId) {
    //                    if (takencnt % 6 == 0 && takencnt / 6 == 1 && takencnt != 0) {
    //                        takenhtml = "<div id=\"fbhistorytaken" + (takencnt / 6) + "\" class= \"historyfbslide activeslide\">" + takenhtml + "</div><div id=\"fbhistorytaken" + ((takencnt / 6) + 1) + "\" class= \"historyfbslide\">";
    //                    }
    //                    else if (takencnt % 6 == 0 && takencnt != 0) {
    //                        takenhtml += "</div><div id=\"fbhistorytaken" + ((takencnt / 6) + 1) + "\" class= \"historyfbslide\">";
    //                    }
    //                    takenhtml += html;
    //                    takencnt++;
    //                    if (takencnt % 2 == 0) {
    //                        takenhtml += '<br style="clear:both"/>';
    //                    }
    //                }

    //                else if (response[k].FeedbackDetails.RequestedFrom.User.UserId == userid) {
    //                    if (receivedcnt % 6 == 0 && receivedcnt / 6 == 1 && receivedcnt != 0) {
    //                        receivedhtml = "<div id=\"fbhistoryreceived" + (receivedcnt / 6) + "\" class= \"historyfbslide activeslide\">" + receivedhtml + "</div><div id=\"fbhistoryreceived" + ((receivedcnt / 6) + 1) + "\" class= \"historyfbslide\">";
    //                    }
    //                    else if (receivedcnt % 6 == 0 && receivedcnt != 0) {
    //                        receivedhtml += "</div><div id=\"fbhistoryreceived" + ((receivedcnt / 6) + 1) + "\" class= \"historyfbslide\">";
    //                    }
    //                    receivedhtml += html;
    //                    receivedcnt++;
    //                    if (receivedcnt % 2 == 0) {
    //                        receivedhtml += '<br style="clear:both"/>';
    //                    }
    //                }
    //                else if (response[k].FeedbackDetails.RequestedFor.User.UserId == userid) {
    //                    if (givencnt % 6 == 0 && givencnt / 6 == 1 && givencnt != 0) {
    //                        givenhtml = "<div id=\"fbhistorygiven" + (givencnt / 6) + "\" class= \"historyfbslide activeslide\">" + givenhtml + "</div><div id=\"fbhistorygiven" + ((givencnt / 6) + 1) + "\" class= \"historyfbslide\">";
    //                    }
    //                    else if (givencnt % 6 == 0 && givencnt != 0) {
    //                        givenhtml += "</div><div id=\"fbhistorygiven" + ((givencnt / 6) + 1) + "\" class= \"historyfbslide\">";
    //                    }
    //                    givenhtml += html;
    //                    givencnt++;
    //                    if (givencnt % 2 == 0) {
    //                        givenhtml += '<br style="clear:both"/>';
    //                    }
    //                }
    //                html = '';
    //            }
    //            html = html + "</div>";
    //            $('#historyCount').val(takencnt);
    //            if ((takencnt % licount) != 0 || takencnt == 0) {
    //                for (var i = 0; i < licount - (takencnt % licount) ; i++) {
    //                    if ((takencnt + i) % 2 == 0 && i != 0) {
    //                        takenhtml += '<br style="clear:both"/>';
    //                    }
    //                    takenhtml += "<div class=\"column givefbmessageDummy\"></div>";
    //                }
    //                takencnt += i;
    //            }
    //            if ((overallcnt % licount) != 0 || overallcnt == 0) {
    //                for (var i = 0; i < licount - (overallcnt % licount) ; i++) {
    //                    if ((overallcnt + i) % 2 == 0 && i != 0) {
    //                        overallhtml += '<br style="clear:both"/>';
    //                    }
    //                    overallhtml += "<div class=\"column givefbmessageDummy\"></div>";
    //                }
    //                overallcnt += i;
    //            }
    //            if ((givencnt % licount) != 0 || givencnt == 0) {
    //                for (var i = 0; i < licount - (givencnt % licount) ; i++) {
    //                    if ((givencnt + i) % 2 == 0 && i != 0) {
    //                        givenhtml += '<br style="clear:both"/>';
    //                    }
    //                    givenhtml += "<div class=\"column givefbmessageDummy\"></div>";
    //                }
    //                givencnt += i;
    //            }
    //            if ((receivedcnt % licount) != 0 || receivedcnt == 0) {
    //                for (var i = 0; i < licount - (receivedcnt % licount) ; i++) {
    //                    if ((receivedcnt + i) % 2 == 0 && i != 0) {
    //                        receivedhtml += '<br style="clear:both"/>';
    //                    }
    //                    receivedhtml += "<div class=\"column givefbmessageDummy\"></div>";
    //                }
    //                receivedcnt += i;
    //            }
    //            $('#historycustomer').html(overallhtml);
    //            $('#historycustomerpaging').html((((overallcnt / licount) > 1) ? feedback.getPaginationhtml((overallcnt / licount), 'HistoryAll') : ""));
    //            $('#historyskip').html(takenhtml);
    //            $('#historyskippaging').html((((takencnt / licount) > 1) ? feedback.getPaginationhtml((takencnt / licount), 'HistoryTaken') : ""));
    //            $('#historymanager').html(givenhtml);
    //            $('#historymanagerpaging').html((((givencnt / licount) > 1) ? feedback.getPaginationhtml((givencnt / licount), 'HistoryReceived') : ""));
    //            $('#historyPeers').html(receivedhtml);
    //            $('#historyPeerspaging').html((((receivedcnt / licount) > 1) ? feedback.getPaginationhtml((receivedcnt / licount), 'HistoryGiven') : ""));
    //            $('#historyskip').width((takencnt / licount) * 100 + '%');
    //            $('#historymanager').width((givencnt / licount) * 100 + '%');
    //            $('#historyPeers').width((receivedcnt / licount) * 100 + '%');
    //            $('#historycustomer').width((overallcnt / licount) * 100 + '%');
    //            $('.historyInnerPart .givefbContent>div').hide();
    //            feedback.highlightgivefbmenu('Team', 'history');
    //            $('.selecthistory').click();
    //            $('#historyskip,historyskippaging').show();
    //        },
    //        error: function (err) {
    //        }
    //    });
    //},
    //Loading fb give member contents
    loadgivefbmembers: function () {
        Common.ajaxsync({
            url: '../../Common/GetMyGiveFbTeam',
            success: function (response) {
                var fhtml = '';
                var shtml = '';
                var licount = 8.0;
                var givefbTeamhtml = '';
                var givefbTeamcnt = 0;
                var givefbOtherTeamhtml = '';
                var givefbOtherTeamcnt = 0;
                var givefbPeers = '';
                var givefbPeerscnt = 0;
                var slidehtml = '';
                //$('#fbgvmbrpagecount').val(count1);
                for (var k = 0; k < response.length ; k++) {
                    shtml = shtml + "<div class='column givefbmessage givefbTeam give' value=" + response[k].UserPOEMappingId + " data-role=" + response[k].Role + "> <img src='/Uploadify/LoadImageHandler.ashx?id=" + response[k].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' /><div class=\"givefbmessagedetails\"><p> " + response[k].User.FirstName + " " + response[k].User.LastName + "</p>" +
                                "<p> " + response[k].User.EmailAddress + "</p>" +
                                "<p class='selectclassval'> " + response[k].JobTitle + "</p>" +
                                "<p> Country: " + response[k].User.Country.Name + "</p></div>" + ((response[k].IsFbCompleted) ? " <div class='feedbackStar'><h4>Complete</h4></div>  " : "") + "</div>";

                    if (response[k].Role == 2) {
                        if (givefbTeamcnt == 0) {
                            //givefbTeamhtml += "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>";
                        }
                        else if (givefbTeamcnt % licount == 0 && givefbTeamcnt / licount == 1) {
                            givefbTeamhtml = "<div id=\"givefbTeam" + (givefbTeamcnt / licount) + "\" class= \"givefbslide activeslide\">" + givefbTeamhtml + "</div><div id=\"givefbTeam" + ((givefbTeamcnt / licount) + 1) + "\" class= \"givefbslide\">";
                        }
                        else if (givefbTeamcnt % licount == 0) {
                            givefbTeamhtml += "</div><div id=\"givefbTeam" + ((givefbTeamcnt / licount) + 1) + "\" class= \"givefbslide\">";
                        }
                        givefbTeamhtml += shtml;
                        givefbTeamcnt++;
                    }
                    else if (response[k].Role == 3) {
                        if (givefbOtherTeamcnt == 0) {
                            // givefbOtherTeamhtml += "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>";
                        }
                        else if (givefbOtherTeamcnt % licount == 0 && givefbOtherTeamcnt / licount == 1) {
                            givefbOtherTeamhtml = "<div id=\"givefbOtherTeam" + (givefbOtherTeamcnt / licount) + "\" class= \"givefbslide activeslide\">" + givefbOtherTeamhtml + "</div><div id=\"givefbTeam" + ((givefbOtherTeamcnt / licount) + 1) + "\" class= \"givefbslide\">";
                        }
                        else if (givefbOtherTeamcnt % licount == 0) {
                            givefbOtherTeamhtml += "</div><div id=\"givefbOtherTeam" + ((givefbOtherTeamcnt / licount) + 1) + "\" class= \"givefbslide\">";
                        }
                        givefbOtherTeamhtml += shtml;
                        givefbOtherTeamcnt++;
                    }
                    else if (response[k].Role == 5) {
                        if (givefbPeerscnt == 0) {
                            //givefbPeers += "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>";
                        }
                        else if (givefbPeerscnt % licount == 0 && givefbPeerscnt / licount == 1) {
                            givefbPeers = "<div id=\"givefbPeers" + (givefbPeerscnt / licount) + "\" class= \"givefbslide activeslide\">" + givefbPeers + "</div><div id=\"givefbPeers" + ((givefbPeerscnt / licount) + 1) + "\" class= \"givefbslide\">";
                        }
                        else if (givefbPeerscnt % licount == 0) {
                            givefbPeers += "</div><div id=\"givefbPeers" + ((givefbPeerscnt / licount) + 1) + "\" class= \"givefbslide\">";
                        }
                        givefbPeers += shtml;
                        givefbPeerscnt++;
                    }
                    shtml = '';
                }

                if (givefbTeamcnt % licount != 0 || givefbTeamcnt == 0) {
                    for (var i = 0; i < licount - (givefbTeamcnt % licount) ; i++) {
                        if ((givefbTeamcnt + i) % 2 == 0 && i != 0) {
                            givefbTeamhtml += '<br style="clear:both"/>';
                        }
                        givefbTeamhtml += " <div class=\"column givefbmessageDummy2\"></div>";
                    }
                    givefbTeamcnt += i;
                }
                if ((givefbOtherTeamcnt % licount) != 0 || givefbOtherTeamcnt == 0) {
                    for (var i = 0; i < licount - (givefbOtherTeamcnt % licount) ; i++) {
                        if ((givefbOtherTeamcnt + i) % 2 == 0 && i != 0) {
                            givefbOtherTeamhtml += '<br style="clear:both"/>';
                        }
                        givefbOtherTeamhtml += " <div class=\"column givefbmessageDummy2\"></div>";
                    }
                    givefbOtherTeamcnt += i;
                }
                if ((givefbPeerscnt % licount) != 0 || givefbPeerscnt == 0) {
                    for (var i = 0; i < licount - (givefbPeerscnt % licount) ; i++) {
                        if ((givefbPeerscnt + i) % 2 == 0 && i != 0) {
                            givefbPeers += '<br style="clear:both"/>';
                        }
                        givefbPeers += " <div class=\"column givefbmessageDummy2\"></div>";
                    }
                    givefbPeerscnt += i;
                }
                slidehtml = "<div class=\"givefbBtn\"><a class=\"givebtn\" href=\"#\">Begin</a></div><div class=\"clearfix\"></div>";

                $('#givefbTeam').html(givefbTeamhtml + "</div>");
                $('#givefbTeampaging').html(slidehtml + (((givefbTeamcnt / licount) > 1) ? feedback.getPaginationhtml((givefbTeamcnt / licount), 'givefbT') : ""));
                $('#givefbOtherTeam').html(givefbOtherTeamhtml + "</div>");
                $('#givefbOtherTeampaging').html(slidehtml + (((givefbOtherTeamcnt / licount) > 1) ? feedback.getPaginationhtml((givefbOtherTeamcnt / licount), 'givefbTM') : ""));
                $('#givefbPeers').html(givefbPeers + "</div>");
                $('#givefbPeerspaging').html(slidehtml + (((givefbPeerscnt / licount) > 1) ? feedback.getPaginationhtml((givefbPeerscnt / licount), 'givefbP') : ""));
                $('#givefbTeam').width((givefbTeamcnt / licount) * 100 + '%');
                $('#givefbOtherTeam').width((givefbOtherTeamcnt / licount) * 100 + '%');
                $('#givefbPeers').width((givefbPeers / licount) * 100 + '%');
                feedback.highlightgivefbmenu('Team', 'giveFb');
                $('.giveFbInnerPart .givefbContent>div').hide();
                $('#givefbTeam,#givefbTeampaging').show();
                feedback.loadinvitefbmembers(response);
                // feedback.getpaginationcontrols();
            }
        });
    },
    //Loading fb invite contents
    loadinvitefbmembers: function (response) {

        var fhtml = '';
        var shtml = '';
        var licount = 6.0;
        var givefbTeamhtml = '';
        var givefbTeamcnt = 0;
        var givefbOtherTeamhtml = '';
        var givefbOtherTeamcnt = 0;
        var givefbPeers = '';
        var givefbPeerscnt = 0;
        var slidehtml = '';
        for (var k = 0; k < response.length ; k++) {
            shtml = shtml + "<div class='column givefbmessage givefbTeam give'  value=" + response[k].UserPOEMappingId + " data-role=" + response[k].Role + "> <img src='/Uploadify/LoadImageHandler.ashx?id=" + response[k].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' /><div class=\"givefbmessagedetails\"><p> " + response[k].User.FirstName + " " + response[k].User.LastName + "</p>" +
                        "<p> " + response[k].User.EmailAddress + "</p>" +
                        "<p class='selectclassval'> " + response[k].JobTitle + "</p>" +
                        "<p> Country: " + response[k].User.Country.Name + "</p></div></div>";
            if (response[k].Role == 2) {
                if (givefbTeamcnt == 0) {
                    //givefbTeamhtml += "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>";
                }
                else if (givefbTeamcnt % 6 == 0 && givefbTeamcnt / 6 == 1) {
                    givefbTeamhtml = "<div id=\"recfbTeam" + (givefbTeamcnt / 6) + "\" class= \"givefbslide activeslide\">" + givefbTeamhtml + "</div><div id=\"recfbTeam" + ((givefbTeamcnt / 6) + 1) + "\" class= \"givefbslide\">";
                }
                else if (givefbTeamcnt % 6 == 0) {
                    givefbTeamhtml += "</div><div id=\"recfbTeam" + ((givefbTeamcnt / 6) + 1) + "\" class= \"givefbslide\">";
                }
                givefbTeamhtml += shtml;
                givefbTeamcnt++;
            }
            else if (response[k].Role == 3) {
                if (givefbOtherTeamcnt == 0) {
                    //givefbOtherTeamhtml += "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>";
                }
                else if (givefbOtherTeamcnt % 6 == 0 && givefbOtherTeamcnt / 6 == 1) {
                    givefbOtherTeamhtml = "<div id=\"recfbOtherTeam" + (givefbOtherTeamcnt / 6) + "\" class= \"givefbslide activeslide\">" + givefbOtherTeamhtml + "</div><div id=\"recfbOtherTeam" + ((givefbOtherTeamcnt / 6) + 1) + "\" class= \"givefbslide\">";
                }
                else if (givefbOtherTeamcnt % 6 == 0) {
                    givefbOtherTeamhtml += "</div><div id=\"recfbOtherTeam" + ((givefbOtherTeamcnt / 6) + 1) + "\" class= \"givefbslide\">";
                }
                givefbOtherTeamhtml += shtml;
                givefbOtherTeamcnt++;
            }
            else if (response[k].Role == 5) {
                if (givefbPeerscnt == 0) {
                    // givefbPeers += "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>";
                }
                else if (givefbPeerscnt % 6 == 0 && givefbPeerscnt / 6 == 1) {
                    givefbPeers = "<div id=\"recfbPeers" + (givefbPeerscnt / 6) + "\" class= \"givefbslide activeslide\">" + givefbPeers + "</div><div id=\"recfbPeers" + ((givefbPeerscnt / 6) + 1) + "\" class= \"givefbslide\">";
                }
                else if (givefbPeerscnt % 6 == 0) {
                    givefbPeers += "</div><div id=\"recfbPeers" + ((givefbPeerscnt / 6) + 1) + "\" class= \"givefbslide\">";
                }
                givefbPeers += shtml;
                givefbPeerscnt++;
            }
            shtml = '';
        }

        if (givefbTeamcnt % licount != 0 || givefbTeamcnt == 0) {
            for (var i = 0; i < licount - (givefbTeamcnt % licount) ; i++) {
                if ((givefbTeamcnt + i) % 2 == 0 && i != 0) {
                    givefbTeamhtml += '<br style="clear:both"/>';
                }
                givefbTeamhtml += " <div class=\"column givefbmessageDummy\"></div>";
            }
            givefbTeamcnt += i;
        }
        if ((givefbOtherTeamcnt % licount) != 0 || givefbOtherTeamcnt == 0) {
            for (var i = 0; i < licount - (givefbOtherTeamcnt % licount) ; i++) {
                if ((givefbOtherTeamcnt + i) % 2 == 0 && i != 0) {
                    givefbOtherTeamhtml += '<br style="clear:both"/>';
                }
                givefbOtherTeamhtml += " <div class=\"column givefbmessageDummy\"></div>";
            }
            givefbOtherTeamcnt += i;
        }
        if ((givefbPeerscnt % licount) != 0 || givefbPeerscnt == 0) {
            for (var i = 0; i < licount - (givefbPeerscnt % licount) ; i++) {
                if ((givefbPeerscnt + i) % 2 == 0 && i != 0) {
                    givefbPeers += '<br style="clear:both"/>';
                }
                givefbPeers += " <div class=\"column givefbmessageDummy\"></div>";
            }
            givefbPeerscnt += i;
        }
        slidehtml = "<div class=\"givefbBtn\"><a class=\"invitebtn\" href=\"#\">Send Request</a></div><div class=\"clearfix\"></div>";

        $('#recfbTeam').html(givefbTeamhtml + "</div>");
        $('#recfbTeampaging').html(slidehtml + (((givefbTeamcnt / licount) > 1) ? feedback.getPaginationhtml((givefbTeamcnt / licount), 'recfbT') : ""));
        $('#recfbOtherTeam').html(givefbOtherTeamhtml + "</div>");
        $('#recfbOtherTeampaging').html(slidehtml + (((givefbOtherTeamcnt / licount) > 1) ? feedback.getPaginationhtml((givefbOtherTeamcnt / licount), 'recfbTM') : ""));
        $('#recfbPeers').html(givefbPeers + "</div>");
        $('#recfbPeerspaging').html(slidehtml + (((givefbPeerscnt / licount) > 1) ? feedback.getPaginationhtml((givefbPeerscnt / licount), 'recfbP') : ""));
        $('#recfbTeam').width((givefbTeamcnt / licount) * 100 + '%');
        $('#recfbOtherTeam').width((givefbOtherTeamcnt / licount) * 100 + '%');
        $('#recfbPeers').width((givefbPeers / licount) * 100 + '%');
        feedback.highlightgivefbmenu('Team', 'recFb');
        $('.recFbInnerPart .givefbContent>div').hide();
        $('#recfbTeam,#recfbTeampaging').show();
        //}
        //    error: function (err) {
        //    }
        //});
    },
    IsOwnSubscribtion: function () {
        $('#sliderbtn').html('');
        //$('.nxtfb,.prevfb').hide();
        Common.ajaxsync({
            url: '../../Common/IsMyOwnSubscription',
            success: function (response) {
                if (response != false) {
                    $('#OwnSubStatusFeedback').val(1);
                }
            },
            error: function (err) {
            }
        });
    },
    //Loading fb receive contents
    loadreceivefbmembers: function () {
        Common.ajaxsync({
            url: '../../Common/GetMyReceiveFbTeam',
            success: function (response) {
                var html = '';
                var skiphtml = '';
                var skipcnt = 0;
                var managerhtml = '';
                var managercnt = 0;
                var Peershtml = '';
                var Peerscnt = 0;
                var slidehtml = '';
                var customerhtml = '';
                var customercnt = 0;
                var licount = 8;
                var count = response.length / licount;
                var count1 = Math.ceil(count);
                $('#fbinvmbrpagecount').val(count1);
                for (var k = 0; k < response.length; k++) {
                    if (response[k] != null) {
                        html = html + "<div class=\"column givefbmessage\" value='" + response[k].User.UserId + "'>" +
                                 "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[k].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                                  "<div class=\"givefbmessagedetails\">" +
                                  "<p class=\"reqname\">Name : " + response[k].User.FirstName + " " + response[k].User.LastName + "</p>" +
                                  "<p class='reqemailid'>Alias : " + response[k].User.EmailAddress + "</p>" +
                                  "<p>Title : " + response[k].JobTitle + "</p>" +
                                  "<p>Country: " + response[k].User.Country.Name + "</p>" +
                                  "</div><br style='clear:both' /><div class=\"sendreqbtn sendbtn\"><a href=\"#\">Send Request</a></div></div> ";
                    }
                    else {
                        if (j == 0) {
                            html = html + "<li class='memberhd'></li>";
                        }
                        html = html + "<li class='nonselect'></li>";
                    }

                    if (response[k].Designation.Level == 2) {
                        if (managercnt % licount == 0 && managercnt / licount == 1 && managercnt != 0) {
                            managerhtml = "<div id=\"requestfbmanager" + (managercnt / licount) + "\" class= \"historyfbslide activeslide\">" + managerhtml + "</div><div id=\"requestfbmanager" + ((managercnt / licount) + 1) + "\" class= \"historyfbslide\">";
                        }
                        else if (managercnt % licount == 0 && managercnt != 0) {
                            managerhtml += "</div><div id=\"requestfbmanager" + ((managercnt / licount) + 1) + "\" class= \"historyfbslide\">";
                        }
                        managerhtml += html; managercnt++;
                    }
                    if (response[k].Designation.Level == 3) {
                        if (skipcnt % licount == 0 && skipcnt / licount == 1 && skipcnt != 0) {
                            skiphtml = "<div id=\"requestfbskip" + (skipcnt / licount) + "\" class= \"historyfbslide activeslide\">" + skiphtml + "</div><div id=\"requestfbskip" + ((skipcnt / licount) + 1) + "\" class= \"historyfbslide\">";
                        }
                        else if (skipcnt % licount == 0 && skipcnt != 0) {
                            skiphtml += "</div><div id=\"requestfbskip" + ((skipcnt / licount) + 1) + "\" class= \"historyfbslide\">";
                        }
                        skiphtml += html;
                        skipcnt++;
                    }
                    else if (response[k].Designation.Level == 5) {
                        if (Peerscnt % licount == 0 && Peerscnt / licount == 1 && Peerscnt != 0) {
                            Peershtml = "<div id=\"requestfbPeers" + (Peerscnt / licount) + "\" class= \"historyfbslide activeslide\">" + Peershtml + "</div><div id=\"requestfbPeers" + ((Peerscnt / licount) + 1) + "\" class= \"historyfbslide\">";
                        }
                        else if (Peerscnt % licount == 0 && Peerscnt != 0) {
                            Peershtml += "</div><div id=\"requestfbPeers" + ((Peerscnt / licount) + 1) + "\" class= \"historyfbslide\">";
                        }
                        Peershtml += html;
                        Peerscnt++;
                    }
                    else if (response[k].Designation.Level == 6) {
                        if (customercnt % licount == 0 && customercnt / licount == 1 && customercnt != 0) {
                            customerhtml = "<div id=\"requestfbcustomer" + (customercnt / licount) + "\" class= \"historyfbslide activeslide\">" + customerhtml + "</div><div id=\"requestfbcustomer" + ((customercnt / licount) + 1) + "\" class= \"historyfbslide\">";
                        }
                        else if (customercnt % licount == 0 && customercnt != 0) {
                            customerhtml += "</div><div id=\"requestfbcustomer" + ((customercnt / licount) + 1) + "\" class= \"historyfbslide\">";
                        }
                        customerhtml += html;
                        customercnt++;
                    }
                    html = '';
                }
                if ((skipcnt % licount) != 0 || skipcnt == 0) {
                    for (var i = 0; i < licount - (skipcnt % licount) ; i++) {
                        if ((skipcnt + i) % 2 == 0 && i != 0) {
                            skiphtml += '<br style="clear:both"/>';
                        }
                        skiphtml += "<div class=\"column givefbmessageDummy\"></div>";
                    }
                    skipcnt += i;
                }
                if ((Peerscnt % licount) != 0 || Peerscnt == 0) {
                    for (var i = 0; i < licount - (Peerscnt % licount) ; i++) {
                        if ((Peerscnt + i) % 2 == 0 && i != 0) {
                            Peershtml += '<br style="clear:both"/>';
                        }
                        Peershtml += "<div class=\"column givefbmessageDummy\"></div>";
                    }
                    Peerscnt += i;
                }
                if ((customercnt % licount) != 0 || customercnt == 0) {
                    for (var i = 0; i < licount - (customercnt % licount) ; i++) {
                        if ((customercnt + i) % 2 == 0 && i != 0) {
                            customerhtml += '<br style="clear:both"/>';
                        }
                        customerhtml += "<div class=\"column givefbmessageDummy\"></div>";
                    }
                    customercnt += i;
                }
                if ((managercnt % licount) != 0 || managercnt == 0) {
                    for (var i = 0; i < licount - (managercnt % licount) ; i++) {
                        if ((managercnt + i) % 2 == 0 && i != 0) {
                            managerhtml += '<br style="clear:both"/>';
                        }
                        managerhtml += "<div class=\"column givefbmessageDummy\"></div>";
                    }
                    managercnt += i;
                }
                $('#requestfbskip').html(skiphtml);
                $('#requestfbskippaging').html((((skipcnt / licount) > 1) ? feedback.getPaginationhtml((skipcnt / licount), 'Requestskipfb') : ""));
                $('#requestfbskip').width((skipcnt / licount) * 100 + '%');

                $('#requestfbmanager').html(managerhtml);
                $('#requestfbmanagerpaging').html((((managercnt / licount) > 1) ? feedback.getPaginationhtml((managercnt / licount), 'Requestmanagerfb') : ""));
                $('#requestfbmanager').width((managercnt / licount) * 100 + '%');
                $('#requestfbPeers').html(Peershtml);
                $('#requestfbPeerspaging').html((((Peerscnt / licount) > 1) ? feedback.getPaginationhtml((Peerscnt / licount), 'RequestPeersfb') : ""));
                $('#requestfbPeers').width((Peerscnt / licount) * 100 + '%');
                $('#requestfbcustomer').html(customerhtml);
                $('#requestfbcustomerpaging').html((((customercnt / licount) > 1) ? feedback.getPaginationhtml((customercnt / licount), 'Requestcustomerfb') : ""));
                $('#requestfbcustomer').width((customercnt / licount) * 100 + '%');
                $('.RequestfbInnerPart .givefbContent>div').hide();
                feedback.highlightgivefbmenu('skip', 'Requestfb');
                $('#requestfbskip,#requestfbskippaging').show();
            },
            error: function (err) {
            }
        });
    },
    //Set manager Feedback
    loadmanagerfb: function () {
        var selectedids = new Array();
        $('#givefbTeam').find('.msgmidselectArrow').each(function () {
            //debugger;
            var role = $(this).attr('data-role');
            //alert($(this).attr('value'));
            selectedids.push($(this).attr('value') + '_' + role);
        });

        if (selectedids.length != 0) {
            $('#HdnuserIds').val(selectedids);
            $('#HdnuserIds').parent('form').submit();
        }
        else {
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
            $('#masterMsgCont').text("Please select Team Members");
            $('#overallCont').show();
            //$('#info').html('Please select Team Members');
            //$(".popupbg,.popup").show();
        }
    },

    inviteTeam: function () {
        var selectedids = new Array();
        $('.recFbInnerPart').find('.msgmidselectArrow').each(function () {
            selectedids.push($(this).attr('value'));
        });

        if (selectedids.length != 0) {
            feedback.sendInvite(selectedids);
            $('#masterMsgCont').text("Your Feedback Invite has been sent successfully");
            $('#overallCont').show();
            //$('#info').html('Your Feedback Invite has been sent successfully');
            //$(".popupbg,.popup").show();
        }
        else {
            $('#masterMsgCont').text("Please select Team Members");
            $('#overallCont').show();
            //$('#info').html('Please select Team Members');
            //$(".popupbg,.popup").show();
        }
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    },

    RequestFB: function (control) {
        var selectedids = new Array();
        selectedids.push(control.parent().attr('value'));
        if (selectedids.length != 0) {
            feedback.sendFBRequest(selectedids);
            $('#masterMsgCont').text("Your Feedback Request has been sent successfully");
            $('#overallCont').show();
            //$('#info').html('Your Feedback Request has been sent successfully');
            // $(".popupbg,.popup").show();
        }
        else {
            $('#masterMsgCont').text("Please select Team Members");
            $('#overallCont').show();
            //$('#info').html('Please select Team Members');
            // $(".popupbg,.popup").show();
        }
    },
    RequestYammer: function (mailids, mode) {
        Common.ajax({
            url: '../../Yammer/SaveOpenGraphForFeedback',
            data: { 'userEmailIds': mailids, 'mode': mode },
            success: function (data) {
                if (data == "gettoken")
                    window.location.href("/yammer/getYammer");
            },
            error: function (err) {
            }
        });
    },
    LoadPosition: function (vals) {
        Common.ajax({
            url: '../../Feedback/LoadPosition?member=' + vals,
            success: function (response) {
            },
            error: function (err) {
            }
        });
    },

    sendInvite: function (selectedid) {
        feedback.sendRequest({ url: '../../Feedback/SendInviteToTeam', data: { 'teamIds': selectedid.toString() } });
    },
    sendFBRequest: function (selectedid) {
        feedback.sendRequest({ url: '../../Feedback/SendRequestEmailMode', data: { 'ids': selectedid.toString(), 'email': $('#hdnEmailMode').val() } });
    },
    sendRequest: function (option) {
        Common.ajax({
            url: option.url,
            //     url: '../../Common/GetTeammembers',
            data: option.data,

            success: function (response) {
            },
            error: function (err) {
                //  alert(err);
            }
        });
    },
    hightlightCurrentTile: function (highlightid) {
        $('.takeFeedbackMenu,.incompletefbMenu').each(function (index, item) {
            var appendtext = $(item).attr('id');
            $('#' + $(this).attr('id') + ' div').eq(1).removeClass('select' + appendtext);
        });
        $('.historyfbIcon').removeClass("selecthistory");
        $('#' + highlightid + ' div').eq(1).addClass('select' + highlightid);
        if (highlightid == 'Give') {
            feedback.GetManagerType();
        }
    },
    highlightgivefbmenu: function (highlightid, appendtext) {
        // alert(highlightid);
        $('#' + appendtext + ' .givefbInnermenu ul li').each(function (index, item) {
            var appendtext = $(item).attr('id');
            $(this).removeClass('select' + appendtext);
        });

        $('.' + appendtext + 'InnerPart ' + '#' + highlightid).addClass('select' + highlightid);
        if (highlightid == 'Give') {
            feedback.GetManagerType();
        }
    },
    getPaginationhtml: function (count1, parentclassname) {
        var slidehtml = '';
        slidehtml += "<div class=\"paginationfb \" id=" + parentclassname + "><ul><li><span class=\"fristpage\"></span></li><li><span class=\"prepage\"></span></li>";
        for (var i = 0; i < count1; i++) {
            slidehtml += "<li class=\"pageno\"";
            if (i > 2) { slidehtml += "style='display:none;'"; }
            slidehtml += "><a href=\"#\"";
            if (i == 0) { slidehtml += "class=\"activeArrow\""; }

            slidehtml += ">" + (i + 1) + "</a></li>";
        }
        slidehtml += "<li><span class=\"nextpage\"></span></li><li><span class=\"lastpage\"></span></li></ul>";
        return slidehtml;
    },
    getpaginationcontrols: function () {
        $('.prepage').click(function () {

            var parentclass = $(this).parents().filter('.paginationfb').attr('id');
            var activeslide = $('.' + parentclass).find('.activeslide');
            var activeslideno = ($(activeslide).attr('id')).replace(/\D/g, '');
            var activeslideid = $(activeslide).attr('id');
            if ($('#' + activeslideid).prev().length > 0) {
                $('#' + activeslideid).prev().animate({ 'margin-left': '0%' }, { duration: 400 });
                $(activeslide).removeClass('activeslide'); $(activeslide).prev().addClass('activeslide');
                $(this).parent().siblings().filter('.pageno').hide();
                $(this).parent().siblings().filter('.pageno').find('a').removeClass('activeArrow');
                $(this).parent().siblings().filter('.pageno').find('a').eq(parseInt(activeslideno) - 2).addClass('activeArrow');
                $(this).parent().siblings().filter('.pageno').slice(((parseInt(activeslideno) - 3) != -1) ? (parseInt(activeslideno) - 3) : (parseInt(activeslideno) - 2), (((parseInt(activeslideno) - 3) != -1) ? (parseInt(activeslideno) - 3) : (parseInt(activeslideno) - 2)) + 3).show();
            }
        });
        $('.nextpage').click(function () {
            /// alert("next");
            var parentclass = $(this).parents().filter('.paginationfb').attr('id');
            var activeslide = $('.' + parentclass).find('.activeslide');
            var activeslideno = ($(activeslide).attr('id')).replace(/\D/g, '');
            var activeslideid = $(activeslide).attr('id');
            var siblingscount = $(activeslide).siblings().length;
            if ($('#' + activeslideid).next().length > 0) {
                $('#' + activeslideid).animate({ 'margin-left': '-100%' }, { duration: 400 });
                $(this).parent().siblings().filter('.pageno').hide();
                $(this).parent().siblings().filter('.pageno').find('a').removeClass('activeArrow');
                $(this).parent().siblings().filter('.pageno').find('a').eq(activeslideno).addClass('activeArrow');
                $(this).parent().siblings().filter('.pageno').slice((activeslideno == siblingscount && (activeslideno - 2) != -1) ? (activeslideno - 2) : (activeslideno - 1), ((activeslideno == siblingscount && (activeslideno - 2) != -1) ? (activeslideno - 2) : parseInt(activeslideno - 1)) + 3).show();
                $(activeslide).removeClass('activeslide'); $(activeslide).next().addClass('activeslide');
            }
        });
        $('.fristpage').click(function () {
            var parentclass = $(this).parents().filter('.paginationfb').attr('id');
            var activeslide = $('.' + parentclass).find('.activeslide');
            var activeslideno = ($(activeslide).attr('id')).replace(/\D/g, '');
            var activeslidename = ($(activeslide).attr('id')).replace(new RegExp("[0-9]", "g"), "")
            $(activeslide).animate({ 'margin-left': '0%' }, { duration: 400 });
            $(activeslide).siblings().animate({ 'margin-left': '0%' }, { duration: 400 });
            $(this).parent().siblings().filter('.pageno').find('a').removeClass('activeArrow');
            $(this).parent().siblings().filter('.pageno').find('a').eq(0).addClass('activeArrow');
            $(activeslide).removeClass('activeslide'); $('#' + activeslidename + '1').addClass('activeslide');
            $(this).parent().siblings().filter('.pageno').hide(); $(this).parent().siblings().filter('.pageno').slice(0, 3).show();
        });
        $('.lastpage').click(function () {
            var parentclass = $(this).parents().filter('.paginationfb').attr('id');
            var activeslide = $('.' + parentclass).find('.activeslide');
            var activeslideno = ($(activeslide).attr('id')).replace(/\D/g, '');
            var activeslidename = ($(activeslide).attr('id')).replace(new RegExp("[0-9]", "g"), "");
            var siblingscount = $(activeslide).siblings().length;
            for (var i = 1; i < (siblingscount + 1) ; i++) {
                $('#' + activeslidename + i).animate({ 'margin-left': '-100%' }, { duration: 400 });
            }
            $(activeslide).removeClass('activeslide'); $('#' + activeslidename + (siblingscount + 1)).addClass('activeslide');
            $(this).parent().siblings().filter('.pageno').hide();
            $(this).parent().siblings().filter('.pageno').find('a').removeClass('activeArrow');
            $(this).parent().siblings().filter('.pageno').find('a').eq(parseInt(siblingscount)).addClass('activeArrow');
            $(this).parent().siblings().filter('.pageno').slice(((parseInt(siblingscount) - 2) != -1) ? (parseInt(siblingscount) - 2) : (parseInt(siblingscount) - 1), (parseInt(siblingscount) - 2) + 3).show();
        });
        $('.pageno').click(function () {
            var parentclass = $(this).parents().filter('.paginationfb').attr('id');
            var activeslide = $('.' + parentclass).find('.activeslide');
            var activeslideno = ($(activeslide).attr('id')).replace(/\D/g, '');
            var activeslidename = ($(activeslide).attr('id')).replace(new RegExp("[0-9]", "g"), "");
            var siblingscount = $(activeslide).siblings().length;
            var pageno = parseInt($(this).find('a').text());
            for (var i = (pageno - 1) ; i > 0; i--) {
                $('#' + activeslidename + i).animate({ 'margin-left': '-100%' }, { duration: 400 });
            }
            for (var i = pageno; i < (siblingscount + 1) ; i++) {
                $('#' + activeslidename + i).animate({ 'margin-left': '0%' }, { duration: 400 });
            }
            $(this).siblings().filter('.pageno').hide();
            $(this).siblings().filter('.pageno').find('a').removeClass('activeArrow');
            $(this).find('a').addClass('activeArrow');
            if (pageno == 1) {
                $(this).siblings().andSelf().filter('.pageno').slice(0, 3).show();
            }
            else if (pageno == (siblingscount + 1)) {
                $(this).siblings().andSelf().filter('.pageno').slice((((pageno - 3) != -1) ? (pageno - 3) : (pageno - 2)), (pageno + 1)).show();
            }
            else {
                $(this).siblings().andSelf().filter('.pageno').slice((pageno - 2), (pageno + 1)).show();
            }
            $(activeslide).removeClass('activeslide'); $('#' + activeslidename + $(this).find('a').text()).addClass('activeslide');
        });
    },
    givefballteammembers: function (id) {
        var selectedids = new Array();
        $('#' + id + ' .give').each(function () {
            var role = $(this).attr('data-role');
            selectedids.push($(this).attr('value') + '_' + role);
        });

        if (selectedids.length != 0) {
            $('#HdnuserIds').val(selectedids);
            $('#HdnuserIds').parent('form').submit();
        }
        else {
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
            $('#info').html('There is no Team Members');
            $(".popupbg,.popup").show();
        }
    },
    loadCompletedFeedbackResults: function () {
        var poeresult = '';
        Common.ajaxsync({
            url: '../../Feedback/GetCompletedFeedbackResults?feedbackId=' + $('#fbid').val(),
            success: function (resp) {
                poeresult = resp;
            }
        });
        return poeresult;
    },
    loadQuickViewPAQuestions: function (option) {
        //debugger;
        var poeresult = feedback.loadCompletedFeedbackResults();
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
                    success: function (response) {
                        excellenceIndicatorCount.push(response.length);
                        for (var i = 0; i < response.length; i++) {
                            questionids = questionids + response[i].QuestionId + ",";
                            note = ((poeresult[response[i].QuestionId] != undefined && poeresult[response[i].QuestionId].Notes != null) ? poeresult[response[i].QuestionId].Notes : '');
                            questionidspermodule = questionidspermodule + response[i].QuestionId + ",";
                            modulehtml = modulehtml + "<div class='rcnQestionArea'><div class='rcnQestion'><div class='rcnNote'><div class='qn'>" + response[i].QuestionOrderNumber + "</div>" +
                                "<h2>" + response[i].ShortQuetionText + "</h2><p id = 'pnote" + response[i].QuestionId + "'" + ((note == '') ? "style='display:none'" : '') + ">" + note + "</p>" +
                                "<textarea id = 'tnote" + response[i].QuestionId + "'" + ((note != '') ? "style='display:none'" : '') + " class='notesInput' placeholder='Enter your Notes...' >" + note + "</textarea></div><div class='editDelet'>" +
                                        "<a id ='savenote" + response[i].QuestionId + "'" + ((note != '') ? "style='display:none'" : '') + " href='javascript:;' class='saveBtn' onclick=feedback.SaveNote('" + response[i].QuestionId + "')>Save</a></div>" +
                                "<div id ='editnote" + response[i].QuestionId + "'" + ((note == '') ? "style='display:none'" : '') + " class='editDelet'> <a onclick=feedback.EditNote('" + response[i].QuestionId + "') href='javascript:;' class='editBtn'></a>" +
                                "<a onclick=feedback.DeleteNote('" + response[i].QuestionId + "') href='javascript:;' class='deletBtn'></a></div>" +
                                "</div></div>";
                        }
                    },
                    error: function (err) {
                    }
                });

                modulehtml = modulehtml + "</div> <input type='hidden' id='mq" + moduleresponse[m].ModuleOrderNumber + "' value=" + questionidspermodule + " />";
                html = html + modulehtml;
            }
        }

        var practiceArea = (moduleresponse.length < 7 ? (7 - moduleresponse.length) : 0);

        $('.pageholder').hide().fadeIn('slow');
        $('#poemodule').nextAll('div').remove();
        $('#poemodule').after('<div style="clear:both"></div><div class="scroll3">' + html + '<div></div>').fadeIn('slow');
        $('.scroll3').slimscroll();

        $('#moduleid').val(moduleresponse[1].ModuleId);
        $('#selectedmodulename').val(moduleresponse[1].ModuleName);


    },
    loadModuleIds: function (option) {
        var moduleIds = new Array();
        Common.ajaxsync({
            url: option.url,
            beforeSend: function () {
                $("#status").fadeIn();
                $("#preloader").delay(100).fadeIn("slow");
            },
            success: function (response) {
                var moduleResponseLength = response.length;
                // $("#status").fadeOut();
                //$("#preloader").delay(100).fadeOut("slow");
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
                $('#poemodule').html(module);
                $('#totalmodules').val(response.length);
                feedback.loadQuickViewPAQuestions({ url: '../../Feedback/GetQuestions', response: response });
            },
            error: function (err) {
            }
        });
    },
    loadPoeName: function () {
        Common.ajaxsync({
            url: "../../Common/GetPoeName",
            beforeSend: function () {
                $("#status").fadeIn();
                $("#preloader").delay(100).fadeIn("slow");
            },
            success: function (response) {
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
                $('#selectedpoe').val(response);
            },
            error: function (err) {
                // window.location = "../Home/ErrorMsg";
            }
        });
    },
    GetManagerType: function () {
        Common.ajaxsync({
            url: "../../Common/GetManagerType",
            beforeSend: function () {
                $("#status").fadeIn();
                $("#preloader").delay(100).fadeIn("slow");
            },
            success: function (response) {
                if (response == 2) {
                    $('.fblthirdBox').hide();
                    $('.fblfristBox').show();
                    $('#giveFbArea').addClass('giveSingletile');
                } else if (response == 3) {
                    $('.fblfristBox').hide();
                    $('.fblthirdBox').show();
                    $('#giveFbArea').addClass('giveSingletile');
                } else {
                    $('.fblfristBox').show();
                    $('.fblthirdBox').show();
                    $('#giveFbArea').removeClass('giveSingletile');
                }
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");

            },
            error: function (err) {
                // window.location = "../Home/ErrorMsg";
            }
        });
    },
    EditNote: function (QuestionId) {
        $('#pnote' + QuestionId + ',#editnote' + QuestionId).hide();
        $('#tnote' + QuestionId + ',#savenote' + QuestionId).show();
    },
    DeleteNote: function (QuestionId) {
        if (confirm('Are You sure want to delete this note')) {
            feedback.UpdateFeedbackNotes(QuestionId, '');
            $('#pnote' + QuestionId + ',#editnote' + QuestionId).hide();
            $('#tnote' + QuestionId + ',#savenote' + QuestionId).show();
            $('#tnote' + QuestionId).val(''); $('#pnote' + QuestionId).html('');
        }
    },
    SaveNote: function (QuestionId) {
        feedback.UpdateFeedbackNotes(QuestionId, $('#tnote' + QuestionId).val());
        $('#pnote' + QuestionId + ',#editnote' + QuestionId).show();
        $('#tnote' + QuestionId + ',#savenote' + QuestionId).hide();
        $('#pnote' + QuestionId).html($('#tnote' + QuestionId).val());
    },
    UpdateFeedbackNotes: function (QuestionId, Notes) {
        Common.ajaxSyncPost({
            url: '../../Feedback/UpdateFeedbackNotes',
            data: { questionid: QuestionId, Notes: Notes, FeedbackId: $('#fbid').val() },
            success: function (response) {
                // alert('Note Saved');
            },
            error: function (err) {
                alert('Error occured while updating');
            }
        });
    },
};
function poelist(poeids, html, firstid, poeLength) {
    var html2 = "<li class='first'> </li>";

    Common.ajaxtxt({
        url: "/StaticContents/PoeLibrary.txt",
        data: null,
        success: function (responses) {
            var poe = false;
            var comingsoon = "";
            var clickevent = "";
            var jsondata = $.parseJSON(responses);
            var poelist = poeids.split('%');
            var ownsub = $('#OwnSubStatusFeedback').val();
            var poeCount = 0;
            for (var n = 0; n < 4; n++) {
                poe = false;
                for (var t = 0; t < poelist.length; t++) {
                    if (jsondata[n].PoeOrder == poelist[t]) {
                        poe = true;
                    }
                }
                if (poe == false) {
                    poeCount++;
                    poe = true;
                    if (jsondata[n].PoeStatus == 'Add') {
                        comingsoon = "<div class='comingsoon'> <img src='../../Images/add-poe.png' width='49' height='47' alt='coming soon' /></div>";
                        if (ownsub != 0) {
                            clickevent = "CallPoelibrary(this)";
                        } else {
                            clickevent = "UnsubscribeLogin(this)";
                        }
                    }
                    else {
                        comingsoon = "<div class='comingsoon'> <img src='../../Images/coming-soon.png' width='49' height='47' alt='coming soon' /></div>";
                        clickevent = "";
                    }
                    //if (jsondata[n].PoeOrder == 8) {
                    //    comingsoon = "";
                    //}
                    html2 = html2 + " <li id ='poeli" + jsondata[n].PoeOrder + "'  class='poelistli' style='opacity:0.5;' onclick='" + clickevent + "' ><a> <div class='icon'> <img src='../../Images/" + jsondata[n].ImagePath + ".png' alt='' class='img' /></div>" + comingsoon + " <p> " + jsondata[n].PoeName + "</p> </a><span></span></li>";
                }
            }
            for (var n = 4; n < 9; n++) {
                poe = false;
                for (var t = 0; t < poelist.length; t++) {
                    if (jsondata[n].PoeOrder == poelist[t]) {
                        poe = false;
                    }
                }
                if (poe == false) {
                    poeCount++;
                    poe = true;
                    if (jsondata[n].PoeStatus == 'Add') {
                        comingsoon = "<div class='comingsoon'> <img src='../../Images/add-poe.png' width='49' height='47' alt='coming soon' /></div>";
                        if (ownsub != 0) {
                            clickevent = "CallPoelibrary(this)";
                        } else {
                            clickevent = "UnsubscribeLogin(this)";
                        }
                    }
                    else {
                        comingsoon = "<div class='comingsoon'> <img src='../../Images/coming-soon.png' width='49' height='47' alt='coming soon' /></div>";
                        clickevent = "";
                    }
                    //if (jsondata[n].PoeOrder == 8) {
                    //    comingsoon = "";
                    //}
                    html2 = html2 + " <li id ='poeli" + jsondata[n].PoeOrder + "'  class='poelistli' style='opacity:0.5;' onclick='" + clickevent + "' ><a> <div class='icon'> <img src='../../Images/" + jsondata[n].ImagePath + ".png' alt='' class='img' /></div>" + comingsoon + " <p> " + jsondata[n].PoeName + "</p> </a><span></span></li>";
                }
            }
            // debugger;
            $('#poelist2').html(html2);
            $('.scroll1').slimScroll();
            //if (poeLength <= 4) {
            //    $('#poelist1').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
            //} else {
            //    $('#poelist1').parents('.slimScrollDiv').find('.slimScrollBar').hide();
            //    $('#poelist1').parents('.slimScrollDiv').find('.slimScrollBar').removeClass('dummy-slimscrollbar-backgound');
            //}

            s = $('.poelistli:visible').first();
            // debugger;
            $('.poelistli').click(function (e) {
                var poeListValue = $(this).val();
                //$("#status,#preloader").delay(100).fadeIn("slow", function () {
                $('#sliderbtn').html('');
                feedback.loadfeedbackMenu(poeListValue);
                //});
            });
            var selectedPoe = $('#selectedPoeValueFeedback').val();
            if (selectedPoe == 0) {
                feedback.loadfeedbackMenu(firstid);
            } else {
                feedback.loadfeedbackMenu(selectedPoe);
            }
        },
        error: function () {
        }
    });
    return html2;
}
function CallPoelibrary(data) {
    var poeid = parseInt((data).id.replace("poeli", ""));
    window.location = "/Signup/Poelibrary?location=Add&SelectedPoe=" + poeid;
}
function UnsubscribeLogin(data) {
    var poeid = parseInt((data).id.replace("poeli", ""));
    window.location = "/Signup/Poelibrary?location=newPoe&SelectedPoe=" + poeid;
}
function hideTilesFuncFS() {
    Common.ajax({
        url: '../../Common/GetPoeResultMode',
        success: function (response) {
            //alert(response.Status);
            if (response.Status != false) {
                $('.headermenus').addClass('headerMenuHide');
                $('.result_start').addClass('resultMenuHide');
                $('.managersync_start').addClass('managerMenuHide');
                $('.communitysync_start').addClass('communityMenuHide');
                $('.goals_start').addClass('goalsMenuHide');
                $('.managerSync').addClass('startManagerNoOver');
                $('.smalltilehide').addClass('startSmallTile');
                $('.communitySync').addClass('startSyncNoOver');
                $('.bigtilehides').addClass('hideColumn');
                $('.sync').addClass('SelecDisable');
                $('.goal').addClass('SelecDisable');
                $('.standing').addClass('SelecDisable');
                $('.viewResults').addClass('startArrowHide');
                $('.plandevelopment').addClass('startArrowHide');
            } else {
                $('.headermenus').removeClass('headerMenuHide');
                $('.result_start').removeClass('resultMenuHide');
                $('.managersync_start').removeClass('managerMenuHide');
                $('.communitysync_start').removeClass('communityMenuHide');
                $('.goals_start').removeClass('goalsMenuHide');
                $('.managerSync').removeClass('startManagerNoOver');
                $('.smalltilehide').removeClass('startSmallTile');
                $('.communitySync').removeClass('startSyncNoOver');
                $('.bigtilehides').removeClass('hideColumn');
                $('.sync').removeClass('SelecDisable');
                $('.goal').removeClass('SelecDisable');
                $('.standing').removeClass('SelecDisable');
                $('.viewResults').removeClass('startArrowHide');
                $('.plandevelopment').removeClass('startArrowHide');
            }
            if (response.Role == 2 || response.Role == 12) {
                $('.headermenus').removeClass('headerMenuHide');
                $('.result_start').removeClass('resultMenuHide');
                $('.managersync_start').removeClass('managerMenuHide');
                $('.communitysync_start').removeClass('communityMenuHide');
                $('.goals_start').removeClass('goalsMenuHide');
                $('.managerSync').removeClass('startManagerNoOver');
                $('.smalltilehide').removeClass('startSmallTile');
                $('.communitySync').removeClass('startSyncNoOver');
                $('.bigtilehides').removeClass('hideColumn');
                $('.sync').removeClass('SelecDisable');
                $('.goal').removeClass('SelecDisable');
                $('.standing').removeClass('SelecDisable');
                $('.viewResults').removeClass('startArrowHide');
                $('.plandevelopment').removeClass('startArrowHide');
            }
        },
        error: function () {
        }
    });
}
