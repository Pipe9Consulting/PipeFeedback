$(function () {
    $('#nPoeLibrary').attr("checked", "checked");
    $("#nPoeLibrary").parent().find('img').attr('src', '../../Images/icons/square-library_h.png');

    var htmlFooter = "<li class='leadership'><span> <img src='../../images/icons/leader.png' width='25' height='20' /></span> <p> Leadership </p> </li> <li class='sales'><span> <img src='../../images/icons/sales.png' width='25' height='20' /></span> <p> Sales </p> </li> <li class='partner'><span> <img src='../../images/icons/partner.png' width='25' height='20' alt='Partner' /></span> <p> Partner </p> </li> <li class='marketing'><span> <img src='../../images/icons/marketing.png' width='25' height='20' alt='Partner' /> </span> <p> Marketing </p> </li> <li class='microsoft' style='display:none'><span> <img src='../../images/icons/microsoft-small.jpg' width='25' height='20' alt='Partner' /> </span> <p> Microsoft </p> </li>";
    $('#target ul').html(htmlFooter);
    $('.bukatutup').show();
    $('#beforeLogin li a').each(function () {
        if (!$(this).hasClass('members')) {
            $(this).removeClass('active').addClass('deActive');
        }
    });
    $('#ResourcesHdr a').removeClass('deActive').addClass('active');
    //window.location.hash = 'Resources';
    //Inline Data

    $('#hidDiv1').hide();
    $('#hidDiv2').hide();
    $('#hidDiv3').hide();
    $('#faqpage').hide();
    //$("#form").draggable();
    //$("#BuildOwn").draggable();
    //$("#anatomy").draggable();
    //$("#poepopupcont").draggable();
    //$("#poepopupshow").draggable();
    //$("#alertboxHolder").draggable();
    //$('#microsoftpublicpoepoup').draggable();
    //$('#microsoftownpoe').draggable();
    $('.formpopupbg').hide();
    $('#previousbtn').click(function () {
        window.history.back();
    });
    $(".close").click(function () {
        $(".alertboxholder").fadeOut();
    });
    $('.menu').click(function () {
        $('#poecontextment').toggle('slow');
    });
    $('.select').click(function () {
        var check = $('.up').is(':visible');
        if (!check) {
            $('.select ul').slideDown('slow');
            $('.up').show();
            $('.down').hide();
        } else {
            $('.select ul').slideUp('slow');
            $('.up').hide();
            $('.down').show();
        }
    });
    $("body").click(
        function (e) {
            if ((e.target || e.srcElement).id !== "selecttextValue" && (e.target || e.srcElement).className !== "down") {
                $('.select ul').slideUp('slow');
                $('.up').hide();
                $('.down').show();
            }
        }
    );
    $(document).click(function (event) {
        if ($(event.target).parents().index($('.menu')) == -1) {
            if ($('#poecontextment').is(":visible")) {
                $("#poecontextment").hide("slow");
            }
        }
    });
    //$('#poecontextment').mouseleave(function () {
    //    $('#poecontextment').hide('slow');
    //});
    //$('.up, .select li').click(function () {
    //    $('.select ul').slideUp('slow');
    //    $('.up').hide();
    //    $('.down').show();
    //});
    $('.microsoft').click(function () {
        $('#microsoft').show();
        var selectedText = $(this).find('p').text();
        $('#selecttextValue').text(selectedText);
        var eT = 0;
        $('#microsoft li').hide().each(function () {
            $(this).delay(eT).fadeIn('slow');
            eT += 350;
        });
        $('#leadership, #comingsoon1, #sales, #marketing, #partner').hide();
    });
    //$('.microsoft').click();
    $('.leadership').click(function () {
        $('#leadership').show();
        var selectedText = $(this).find('p').text();
        $('#selecttextValue').text(selectedText);
        var eT = 0;
        $('#leadership li').hide().each(function () {
            $(this).delay(eT).fadeIn('slow');
            eT += 350;
        });
        $('#comingsoon1, #sales,#microsoft, #marketing, #partner').hide();
    });
    $('.comingsoon1').click(function () {
        $('#sales').show();
        var selectedText = "Sales";
        $('#selecttextValue').text(selectedText);
        var eT = 0;
        $('#sales li').hide().each(function () {
            $(this).delay(eT).fadeIn('slow');
            eT += 350;
        }); $('#comingsoon1, #leadership,#microsoft, #marketing, #partner').hide();
    });
    $('.sales').click(function () {
        $('#sales').show();
        var selectedText = $(this).find('p').text();
        $('#selecttextValue').text(selectedText);
        var eT = 0;
        $('#sales li').hide().each(function () {
            $(this).delay(eT).fadeIn('slow');
            eT += 350;
        }); $('#comingsoon1, #leadership,#microsoft, #marketing, #partner').hide();
    });
    $('.partner').click(function () {
        $('#partner').show();
        var selectedText = $(this).find('p').text();
        $('#selecttextValue').text(selectedText);
        var eT = 0;
        $('#partner li').hide().each(function () {
            $(this).delay(eT).fadeIn('slow');
            eT += 350;
        }); $('#comingsoon1, #leadership,#microsoft,#sales, #marketing').hide();
    });
    $('.marketing').click(function () {
        $('#marketing').show();
        var selectedText = $(this).find('p').text();
        $('#selecttextValue').text(selectedText);
        var eT = 0;
        $('#marketing li').hide().each(function () {
            $(this).delay(eT).fadeIn('slow');
            eT += 350;
        }); $('#comingsoon1, #leadership,#microsoft,#sales, #partner').hide();
    });
    $('.antmy img').click(function () {
        $('.popupbg, #aop').fadeIn("slow");
        $('#form').fadeOut("slow");
    });
    $('.build img').click(function () {
        $('.popupbg, #byo').fadeIn("slow");
        $('#form').fadeOut("slow");
    });
    $('.close').click(function () {
        $('.popupbg, #aop, #byo').fadeOut("slow");
    });
    $('.btn').click(function () {
        $('#aop, #byo').hide();
        $('#form').show();
    });
    $('.sendbtn').click(function () {
        $('.errormsg').show();
    });
    $('#microsoft').slimscroll();
    $('.poepopupbg,#dowmloadedPDF').fadeOut();
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $('.anatomys').click(function () {
        $('#poeimg').attr("src", "<img src='../../../Images/anatomy.png");
        $('#selectedpoename').html("Anatomy of a Role Excellence Profile");
        $('#poeintocontent').html("<h2>Anatomy of a Role Excellence Profile</h2><P>Role Excellence Profiles (REP) define the standards for how to do excellent work. The REP becomes everyone's North Star vision for excelling in role. Role Excellence Profiles are built from learning about what top performers do differently from everyone else.  REPs incorporate role traits that define the characteristics and qualities that distinguish top performers. REPs include Practice Areas that describe the methods adopted by top performers that make them successful and the REP delivers a set of Excellence Actions which define the measures of success to ensure everyone stays on-track. Based on REP feedback everyone receives a standing score out of 100 points. Standing acts as an individuals personal marker for progress along the journey towards doing excellent work.</P>");
        $('#anatomy, .poepopupbg').fadeIn("slow");

        $('#selectedpoeid').val(0);
    });

    $('.buildyou').click(function () {
        $('#BuildOwn, .poepopupbg').fadeIn("slow");
        $('#selectedpoeid').val(-1);
    });

    var redirect = "";
    var url = window.location.href;
    redirect = url.split("?location=")[1];
    redirect = redirect.split("&")[0];
    $('.close').click(function () {
        $('.poepopupbg,.poepopup').fadeOut("slow");
        $('.formpopupbg, .formpopupt').fadeOut("slow");
        $('.selected').removeClass("selected");
    });


    poelibrary.SubscribedPoeList();
    $('#addnowTrail').click(function () {
        //alert("dd");
        //debugger;
        poelibrary.getPlans();
        var plan = $('#Plans').val();
        var selectedPoe = $('#selectedpoeNo').val();
        // condition commented to make REPs free of cost
        if ((plan == 0 && selectedPoe < 1) || (plan == 1)) {
            $('#plansValue').val(1);
            $('.poepopupbg,.poepopup').fadeOut("slow");
            $('.selected').removeClass("selected");
            poelibrary.loadmode();
            poelibrary.addSelectedPoe();
            poelibrary.getSelectedPoes();
            var sum = parseInt($('#selectedpoeNo').val()) + 1;
            $('#selectedpoeNo').val(sum);
        }
        else {
            $('.poepopupbg,.poepopup').fadeOut("slow");
            if ($('#HdnMode').val() != "new" && plan == 1) {
                $('#okbtn').show();
                $('#alertText').removeClass('alerterr');
                $('#alertText').text('You can add only one REP for a trial account. If you want to add this REP, your account automatically becomes a paid account');
            } else {
                $('#okbtn').hide();
                $('#alertText').removeClass('alerterr');
                $('#alertText').text('You cannot choose Trial option for 2 REPs');
            }

            $(".poepopupbg, .alertboxholder").fadeIn();
        }
    });
    $('.chlselling').click(function () {
        $('#anatomy, .poepopupbg').fadeOut("slow");
        $('#BuildOwn, .poepopupbg').fadeOut("slow");
        poelibrary.loadSelectedPoe(3);
    });
    $('.humanSelling').click(function () {
        $('#anatomy, .poepopupbg').fadeOut("slow");
        $('#BuildOwn, .poepopupbg').fadeOut("slow");
        poelibrary.loadSelectedPoe(1);
    });
    $('#paidSubscribtion,#microsoftpulicpoes').click(function () {
        poelibrary.getPlans();
        var plan = $('#Plans').val();
        var yammerid = $('#yammeridShow').val();
        var selectedPoe = $('#selectedpoeNo').val();
        var subscription = $('#GetSubId').val();
        if (subscription == -1) {
            $('#okbtn').hide();
            $('#cancelbtn').hide();
            $('#masterMsgCont').text("Please choose your own network from the network dropdown and avail this feature");
            $('#overallCont').show();
            //$('#alertText').text('Please choose your own network from the network dropdown and avail this feature');
            //$(".poepopupbg, .alertboxholder").fadeIn();
        } else {
            if (plan == 0 || plan == 2 || plan == 3) {
                if (parseInt(plan) == 0) {
                    $('#plansValue').val(2);
                } else {
                    $('#plansValue').val(parseInt(plan));
                }

                $('.poepopupbg,.poepopup').fadeOut("slow");
                $('.selected').removeClass("selected");
                poelibrary.addSelectedPoe();
                poelibrary.getSelectedPoes();
                var sum = parseInt($('#selectedpoeNo').val()) + 1;
                $('#selectedpoeNo').val(sum);
            } else {
                $('.poepopupbg,.poepopup').fadeOut("slow");
                if ($('#HdnMode').val() != "new") {
                    $('#okbtn').show();
                    if (selectedPoe == 0 && yammerid == 1) {
                        $('#alertText').removeClass('alerterr');

                        $('#alertText').text('You can add a REP using trial. If you want to add this REP, your account automatically becomes a paid account');
                    } else {
                        $('#alertText').removeClass('alerterr');
                        $('#alertText').text('You can add only one REP for a trial account. If you want to add this REP, your account automatically becomes a paid account');
                    }
                } else {
                    $('#alertText').removeClass('alerterr');
                    $('#alertText').text('You cannot choose Trial option for 2 REPs');
                }
                $(".poepopupbg, .alertboxholder").fadeIn();
            }
        }
    });
    $('#okbtn').click(function () {
        $('#plansValue').val(2);
        $('.poepopupbg,.poepopup').fadeOut("slow");
        $('.selected').removeClass("selected");
        poelibrary.addSelectedPoe();
        poelibrary.getPlans();
        poelibrary.getSelectedPoes("paid");
        var sum = parseInt($('#selectedpoeNo').val()) + 1;
        $('#selectedpoeNo').val(sum);

        $(".poepopupbg, .alertboxholder").fadeOut();
    });
    $('#cancelbtn').click(function () {
        $(".alertboxholder").fadeOut();
        $('#poepopupcont,.poepopupbg').fadeIn("slow");
        $('#microsoftpublicpoepoup,.poepopupbg').fadeOut("slow");
        $('#microsoftownpoe,.poepopupbg').fadeOut("slow");
    });
    $('#businessSubcription').click(function () {
        var mailid = 'sales@kessaku.com';
        var mailto_link = "mailto:" + mailid;
        window.location.href = mailto_link;
    });
    poelibrary.getPlans();
    poelibrary.setSelectedSubscribedPoes();
    poelibrary.setSubscribedPoes();
    poelibrary.loadAllpoes();
    poelibrary.getSelectedPoes();
    poelibrary.loadmode();
    poelibrary.loadPoeSelected();
    var plansChange = $('#Plans').val();

    $('#buynow').click(function () {
       // debugger;
        var subid = $('#GetSubId').val();
        poelibrary.setSubscribedPoes();
        poelibrary.loadmode();
        var subscribedPoeCount = $('#subscribedPoeCount').val();
        if (subscribedPoeCount < 1) {
            // alert("Please choose at least one REP");
            $('#masterMsgCont').text("Please choose at least one REP");
            $('#overallCont').show();
        } else if ($('#PageMode').val() == 5 || subid == -1) {
            Common.ajaxsync({
                url: '../../SignUp/GetUserDetail',
                success: function (response) {
                   // debugger;
                    var poelist = GetPoelistStr();
                    if (response == null) {
                        window.location.href = $("#homeurl").val() + "/Home/Login?poemode=" + $('#PageMode').val() + "&poeplan=" + $('#plansValue').val() + "&poeidstr=" + poelist;
                    } else {
                        window.location.href = "/SignUp/Register";
                    }
                },
                error: function (err) {
                }
            });
        } else {
            if (redirect == undefined) {
                redirect = "new";
            }
            window.location.href = "/Signup/" + redirect + "/Add";
        }
    });

    var poeids = $('#selectedpoeid').val();

    $('.dwnldpoeContactus').click(function () {
        var dwnld = $('#pdfDownload').val();
        if (dwnld == 5) {
            $('#poepopupcont,.poepopupbg').fadeOut("slow");
            $('.formpopupbg, .formpopupt').fadeIn("slow");
            $('#PoeDwnldErrorMsg').hide();
            $('#PoeDwnldErrorMsgContent').hide();
            $('.poepopupbg,.poepopup').fadeOut("slow");
        } else {
            var poeid = $('#selectedpoeid').val();
            if (poeid != -1) {
                var url = '../../SignUp/DownloadPdf?poeid=' + poeid;
                window.open(url, '_blank');
            }
        }
    });
    $(".demo").customScrollbar({ fixedThumbWidth: '200', vScroll: true });
    //$(".demo").mouseover(function() {
    //    $(".demo").show();
    //});
    //$(".demo").mouseout(function () {
    //    $(".demo").hide();
    //});
    $("#status").fadeOut();
    $("#preloader").delay(100).fadeOut("slow");
});
var poelibrary = {
    loadAllpoes: function () {
        Common.ajaxsync({
            url: '/Common/GetAllPoEs',
            success: function (response) {
                var html = '';
                var classtext = '';
                var newtext = '';
                for (var i = 0; i < response.length; i++) {
                    classtext = (i == 0) ? 'bigtile' : 'smalltile';
                    newtext = (i == 0) ? "<div class='new'><img src='../../Images/new.png' width='49' height='47' alt='New' /></div>" : "";
                    html = html + "<div class='" + classtext + "' id='poe" + response[i].POEId + "'><img src='../../Images/" + response[i].Name.replace("&", "").replace(/\ /g, "") + ".png' alt='" + response[i].Name + "' />" + newtext + "<div class='" + classtext + "title'><span>" + response[i].Name + "</span></div></div>";
                    $('#poe' + response[i].POEId).live('click', function () {
                       // alert('er');
                        var poeid = parseInt((this).id.replace("poe", ""));
                        $('#poeimg').attr('src', '');
                        $('#microsoftpoeimg').attr('src', '');
                        $('#microsoftownpoeimg').attr('src', '');
                        poelibrary.loadSelectedPoe(poeid);
                    });
                }

                if (response.length != 0 && response.length < 6) {
                    var balCount = 6 - response.length;
                    for (var j = 0; j < balCount; j++) {
                        html = html + "<li class='smalltile' ><div class='nonbgsmalltitle'></div></li>";
                    }
                }
            },
            error: function (err) {
            }
        });
    },
    loadSelectedPoe: function (poeid) {
        Common.ajaxsync({
            url: '/Common/GetSelectedPoe?poeid=' + poeid,
            success: function (response) {
                var plan = $('#Plans').val();
                if (plan != 3) {
                    $('#poeimg').attr("src", "../../../Images/" + response.Name.replace("&", "").replace(/\ /g, "") + ".png");
                    $('#selectedpoename').html(response.Name);
                    $('#poeintocontent').html("<div class='poetxtarea'><h1>" + response.Name + "</h1><P>" + response.IntroContent + "</P></div>");
                    $('#poepopupcont,.poepopupbg').fadeIn("slow");
                    $('#selectedpoeid').val(poeid);
                } else if (plan == 3 && response.PoeFlag != 2) {
                    $('#microsoftpoeimg').attr("src", "../../../Images/" + response.Name.replace("&", "").replace(/\ /g, "") + ".png");
                    $('#selectedpoename').html(response.Name);
                    $('#Microsoftpoeintocontent').html("<div class='poetxtarea'><h1>" + response.Name + "</h1><P>" + response.IntroContent + "</P></div>");
                    $('#microsoftpublicpoepoup,.poepopupbg').fadeIn("slow");
                    $('#selectedpoeid').val(poeid);
                } else {
                    $('#microsoftownpoeimg').attr("src", "../../../Images/" + response.Name.replace("&", "").replace(/\ /g, "") + ".png");
                    $('#selectedpoename').html(response.Name);
                    $('#microsoftownpoecontent').html("<div class='poetxtarea'><h1>" + response.Name + "</h1><P>" + response.IntroContent + "</P></div>");
                    $('#microsoftownpoe,.poepopupbg').fadeIn("slow");
                    $('#selectedpoeid').val(poeid);
                }
            },
            error: function (err) {
            }
        });
    },
    setSubscribedPoes: function () {
        Common.ajaxsync({
            url: '/Common/GetAddedPoeResult',
            success: function (response) {
                if (response != null) {
                    $('#subscribedPoeCount').val(response.length);
                }
            },
            error: function (err) {
            }
        });
    },
    becomePaidMember: function () {
        Common.ajaxsync({
            url: '/SignUp/ConvertPaidMember',
            success: function (response) {
            },
            error: function (err) {
            }
        });
    },
    loadmode: function () {
        Common.ajaxsync({
            url: '/SignUp/GetMode',
            success: function (response) {
                if (response != null) {
                    $('#HdnMode').val('old');
                    $('#PageMode').val(response);
                } else {
                    $('#HdnMode').val('new');
                }
                if (response != null && response != 5) {
                    $('.accordion h3,.login').show();
                    $('#networkdrpdown').hide();
                    //$('#accsettings').show();
                } else {
                    $('.accordion h3,.login').hide();
                    $('#beforeLogin').show();
                }
                $('#pdfDownload').val(response);
                $('#modevalue').val(response);
            },
            error: function (err) {
            }
        });
    },
    loadPoeSelected: function () {
        Common.ajaxsync({
            url: '/SignUp/GetSelectedPoe',
            success: function (response) {
                if (response != null) {
                    poelibrary.loadSelectedPoe(response);
                }
            },
            error: function (err) {
            }
        });
    },
    SubscribedPoeList: function () {
        Common.ajaxsync({
            url: '/SignUp/GetSubscribedPoe',
            success: function (response) {
                if (response != null) {
                    var poelist = '';
                    for (var i = 0; i < response.length; i++) {
                        poelist = poelist + response[i].POEId + '%';
                    }
                    poelist = poelist.slice(0, -1);
                    $('#poeListVal').val(poelist);
                }
            },
            error: function (err) {
            }
        });
    },
    setSelectedSubscribedPoes: function () {
        Common.ajaxsync({
            url: '/Common/GetSelectedPoes',
            success: function (response) {
                if (response != null) {
                    $('#selectedpoeNo').val(response.length);
                }
            },
            error: function (err) {
            }
        });
    },

    getPlans: function () {
        Common.ajaxsync({
            url: '/SignUp/GetPaidortrail',
            success: function (response) {
                if (response != null) {
                    $('#GetSubId').val(response.SubId);
                    $('#Plans').val(response.PlanId);
                    $('#yammeridShow').val(response.YammerId);
                    if (response.PlanId == 3) {
                        //$('#sales').html("");
                       // $('#leadership').html(" <li class='bigtile' id='poe5'> <img src='../../images/Dynamics Lead_Intro.png' width='600' height='600' /> <p> Dynamics Lead </p> </li> <li id='poe9'> <img src='../../images/Kessakuimage/LeadersMakeTheFuture_poe.jpg' width='600' height='600' /> <p> Leaders Make the Future </p> </li> <li id='poe2'> <img src='../../images/Kessakuimage/CloudBusiness_poe.jpg' width='600' height='600' /> <p> Cloud Business </p> </li> <li class='anatomys'> <img src='../../Images/KessakuImage/Anatomy.jpg' width='600' height='600' /> <p> Anatomy of a REP </p> </li> <li></li> <li></li><li></li> <li></li> <li></li>");
                       // $('#partner').html(" <li class='bigtile' id='poe4'> <img src='../../images/Kessakuimage/PartnerSalesManager_poe.jpg' width='600' height='600' /> <p> Partner Sales Manager </p> </li> <li class='anatomys'> <img src='../../Images/KessakuImage/Anatomy.jpg' width='600' height='600' /> <p> Anatomy of a REP </p> </li> <li></li> <li></li> <li></li> <li></li><li></li><li></li><li></li>");
                       // $('#sales').html("<li  id='poe7'> <img src='../../images/SpecialistSalesManager_intro.png' width='600' height='600' /> <p>Specialist Sales Manager </p> </li> <li id='poe1'> <img src='../../images/KessakuImage/HumanSelling_poe.jpg' width='600' height='600' /> <p> Human Selling </p> </li> <li id='poe3'> <img src='../../images/KessakuImage/ChallengerSelling_poe.jpg' width='600' height='600' /> <p> Challenger Selling </p> </li> <li class='anatomys'> <img src='../../Images/KessakuImage/Anatomy.jpg' width='600' height='600' /> <p> Anatomy of a REP </p> </li> <li></li> <li></li> <li></li> <li></li> <li></li> ");
                        $('.microsoft').show();
                        $('.anatomys').click(function () {
                            $('#poeimg').attr("src", "<img src='../../../Images/anatomy.png");
                            $('#selectedpoename').html("Anatomy of a Role Excellence Profile");
                            $('#poeintocontent').html("<h2>Anatomy of a Role Excellence Profile</h2><P>Role Excellence Profiles (REP) define the standards for how to do excellent work. The REP becomes everyone's North Star vision for excelling in role. Role Excellence Profiles are built from learning about what top performers do differently from everyone else.  REPs incorporate role traits that define the characteristics and qualities that distinguish top performers. REPs include Practice Areas that describe the methods adopted by top performers that make them successful and the REP delivers a set of Excellence Actions which define the measures of success to ensure everyone stays on-track. Based on REP feedback everyone receives a standing score out of 100 points. Standing acts as an individuals personal marker for progress along the journey towards doing excellent work.</P>");
                            $('#anatomy, .poepopupbg').fadeIn("slow");

                            $('#selectedpoeid').val(0);
                        });
                    }
                } else {
                    $('#Plans').val(0);
                }
            },
            error: function (err) {
            }
        });
    },
    getSelectedPoes: function () {
        Common.ajaxsync({
            url: '/Common/GetSelectedPoes',
            success: function (response) {
               // debugger;
                var html = '';
                var classtext = '';
                var newtext = '';
                var paidtext = '';
                var html1 = '';
                //debugger;
                if (response != null) {
                    //for (var i = 0; i < response.length; i++) {
                    //    //var getpaidopt = '';
                    //    //var plansvalue = $('#plansValue').val();
                    //    //var plans = $('#Plans').val();
                    //    //var mode = $('#modevalue').val();;
                    //    //if ((plansvalue == 1 || plans == 1) && mode != 0) {
                    //    //    getpaidopt = "<div class='paid' id='becomepaidmember'> <span>&nbsp;</span><p> Become a Paid Member</p> </div>";
                    //    //} else {
                    //    //    getpaidopt = '';
                    //    //}
                    //    //var Delbtn = "<div class='clos' id='mypoe" + response[i].POEId + "'> X";
                    //    //var count = 0;
                    //    //var poeListVal = $('#poeListVal').val();
                    //    //if (poeListVal != "") {
                    //    //    var lists = poeListVal.split('%');
                    //    //    for (var m = 0; m < lists.length; m++) {
                    //    //        if (lists[m] == response[i].POEId) {
                    //    //            count = count + 1;
                    //    //        }
                    //    //    }
                    //    //    if (count == 0) {
                    //    //        Delbtn = "<div class='clos' id='mypoe" + response[i].POEId + "'> X";
                    //    //    } else {
                    //    //        Delbtn = "<div>";
                    //    //    }
                    //    //}
                    //    //classtext = (i == 0) ? 'bigtile' : 'smalltile';
                    //    //newtext = (i == 0) ? "<div class='new'>New</div>" : "";
                    //    //paidtext = (i == 0) ? getpaidopt : "";
                    //    if (i < 3) {
                    //        html = html + "<li  id='SelectPoe" + response[i].POEId + "'><span > " + Delbtn + "</div><img src='../../Images/KessakuImage/poe/" + response[i].Name.replace("&", "").replace(/\ /g, "") + "_large.png' alt='" + response[i].Name + "' />" + newtext + "<p>" + response[i].Name + "</p>" + paidtext + "</span></li>";
                    //    } else {
                    //        html1 = html1 + "<li  id='SelectPoe" + response[i].POEId + "'><span > " + Delbtn + "</div><img src='../../Images/KessakuImage/" + response[i].Name.replace("&", "").replace(/\ /g, "") + "_poe.jpg' alt='" + response[i].Name + "' />" + newtext + "<p>" + response[i].Name + "</p>" + paidtext + "</span></li>";
                    //    }
                    //    if (plansvalue == "0") {
                    //        $('#selectedpoeid').val(response[i].POEId);
                    //    }
                    //    $('#mypoe' + response[i].POEId).live('click', function () {
                    //        var poeid = parseInt((this).id.replace("mypoe", ""));
                    //        poelibrary.RemoveSelectedPoe(poeid);
                    //    });
                    //}

                    html = " <div class='poE-verticalDiv1'> <div class='poe-midcolumn'> <ul>";
                    var totcount = 0;
                    var totlenght = Math.ceil(response.length / 3);
                    for (var f = 0; f < totlenght; f++) {
                        if (f != 0) {
                            html1 = html1 + " <div class='poE-verticalDiv'><div class='poelastcolumn'> <ul>";
                        }
                        for (var b = 0; b < 3; b++) {
                            if (totcount < response.length) {
                                var getpaidopt = '';
                                var plansvalue = $('#plansValue').val();
                                var plans = $('#Plans').val();
                                var mode = $('#modevalue').val();;
                                // condition commented to remove the paid member concept
                                //if ((plansvalue == 1 || plans == 1) && mode != 0) {
                                  //  getpaidopt = "<div class='paid' id='becomepaidmember'> <span>&nbsp;</span><p> Become a Paid Member</p> </div>";
                                //} else {
                                    getpaidopt = '';
                                //}
                                var Delbtn = "<div class='clos' id='mypoe" + response[totcount].POEId + "'> X";
                                var count = 0;
                                var poeListVal = $('#poeListVal').val();
                                if (poeListVal != "") {
                                    var lists = poeListVal.split('%');
                                    for (var m = 0; m < lists.length; m++) {
                                        if (lists[m] == response[totcount].POEId) {
                                            count = count + 1;
                                        }
                                    }
                                    if (count == 0) {
                                        Delbtn = "<div class='clos' id='mypoe" + response[totcount].POEId + "'> X";
                                    } else {
                                        Delbtn = "<div>";
                                    }
                                }
                                classtext = (totcount == 0) ? 'bigtile' : 'smalltile';
                                newtext = (totcount == 0) ? "" : "";
                                paidtext = (totcount == 0) ? getpaidopt : "";

                                if (totcount < 3) {
                                    html = html + "<li  id='SelectPoe" + response[totcount].POEId + "'><span > " + Delbtn + "</div><img src='../../Images/KessakuImage/poe/" + response[totcount].Name.replace("&", "").replace(/\ /g, "") + "_large.png' alt='" + response[totcount].Name + "' />" + newtext + "<p>" + response[totcount].Name + "</p>" + paidtext + "</span></li>";
                                } else {
                                    html1 = html1 + "<li  id='SelectPoe" + response[totcount].POEId + "'><span > " + Delbtn + "</div><img src='../../Images/KessakuImage/" + response[totcount].Name.replace("&", "").replace(/\ /g, "") + "_poe.jpg' alt='" + response[totcount].Name + "' />" + newtext + "<p>" + response[totcount].Name + "</p>" + paidtext + "</span></li>";
                                }
                            } else {
                                if (totcount < 3) {
                                    html = html + "<li class='bigtile' ></li>";
                                } else {
                                    html1 = html1 + "<li class='smalltile' ><div class='nonbgsmalltitle'></div></li>";
                                }
                            }
                            totcount++;
                        }
                        html1 = html1 + "</ul></div></div>";
                    }

                    html = html + "</ul></div></div>";
                    $('#horizontal-scrollbar-demo').html(html + html1);

                    if (plansvalue == "0") {
                        $('#selectedpoeid').val(response[0].POEId);
                    }

                    //if (response.length != 0 && response.length < 3) {
                    //    var balCount = 3 - response.length;
                    //    for (var j = 0; j < balCount; j++) {
                    //        html = html + "<li class='smalltile' ><div class='nonbgsmalltitle'></div></li>";
                    //    }
                    //}
                    //if (response.length > 3) {
                    //    var balCount = 6 - response.length;
                    //    for (var j = 0; j < balCount; j++) {
                    //        html1 = html1 + "<li class='smalltile' ><div class='nonbgsmalltitle'></div></li>";
                    //    }
                    //} else if (response.length < 4) {
                    //    for (var k = 0; k < 3; k++) {
                    //        html1 = html1 + "<li class='smalltile' ><div class='nonbgsmalltitle'></div></li>";
                    //    }
                    //}
                    if (response.length == 0) {
                        html = "<div class='poE-verticalDiv1'> <div class='poe-midcolumn'> <ul>";
                        html1 = "<div class='poE-verticalDiv'><div class='poelastcolumn'> <ul>";
                        for (var k = 0; k < 3; k++) {
                            html = html + "<li class='bigtile' ><div class='nonbgsmalltitle'></div></li>";
                            html1 = html1 + "<li class='smalltile' ><div class='nonbgsmalltitle'></div></li>";
                        }
                    }
                    if (totlenght < 2) {
                        html1 = "<div class='poE-verticalDiv'><div class='poelastcolumn'> <ul>";
                        // html1 = "";
                        for (var k = 0; k < 3; k++) {
                            html1 = html1 + "<li class='smalltile' ><div class='nonbgsmalltitle'></div></li>";
                        }
                        //html1 = html1 + "</ul></div></div>";
                    }
                }
                if (response == null) {
                    html = "<div class='poE-verticalDiv1'> <div class='poe-midcolumn'> <ul>";
                    html1 = "<div class='poE-verticalDiv'><div class='poelastcolumn'> <ul>";
                    for (var k = 0; k < 3; k++) {
                        html = html + "<li class='bigtile' ><div class='nonbgsmalltitle'></div></li>";
                        html1 = html1 + "<li class='smalltile' ><div class='nonbgsmalltitle'></div></li>";
                    }
                }
                html = html + "</ul></div></div>";
                html1 = html1 + "</ul></div></div>";
                $('#horizontal-scrollbar-demo').html(html + html1);
                // $('#selectedPoeslist1').html(html1);
                $('#becomepaidmember').click(function () {
                    $('#plansValue').val(2);
                    poelibrary.addSelectedPoe();
                    poelibrary.getPlans();
                    poelibrary.becomePaidMember();
                    poelibrary.getSelectedPoes("paid");
                    $('#masterMsgCont').text("Thank you. You have now become a Paid Member.");
                    $('#overallCont').show();
                   // alert("Thank you. You have now become a Paid Member.");
                });
                $('.clos').click(function () {
                    //debugger;
                    var poeid = parseInt((this).id.replace("mypoe", ""));
                    poelibrary.RemoveSelectedPoe(poeid);
                });
                $(".demo").customScrollbar({ fixedThumbWidth: 200, vScroll: true });
            },
            error: function (err) {
            }
        });
    },
    addSelectedPoe: function () {
        var poeid = parseInt($('#selectedpoeid').val());
        var plan = parseInt($('#plansValue').val());
        if (poeid != 0) {
            Common.ajaxsync({
                url: '/Common/AddSelectedPoe?poeId=' + poeid + '&plan=' + plan,
                success: function (response) {
                    //debugger;
                },
                error: function (err) {
                }
            });
        }
    },
    RemoveSelectedPoe: function (poeid) {
        if (poeid != 0) {
            Common.ajaxsync({
                url: '/Common/RemoveSelectedPOE?poeId=' + poeid,
                success: function (response) {
                    poelibrary.getSelectedPoes();
                },
                error: function (err) {
                }
            });
        }
    }
}

function validate() {
    var fname = $('#PoeDwnldFirstname').val();
    var lname = $('#PoeDwnldLastname').val();
    var title = $('#PoeDwnldTitle').val();
    var mailid = $('#PoeDwnldmailid').val();
    var company = $('#PoeDwnldCompany').val();
    var phone = $('#PoeDwnldPhone').val();
    $('#PoeDwnldErrorMsg').hide();
    $('#PoeDwnldErrorMsgContent').hide();
    var returnval = true;

    if (fname == "" && returnval == true) {
        $('#PoeDwnldErrorMsgContent').text("Please enter the First Name");
        $('#PoeDwnldErrorMsg').show();
        $('#PoeDwnldErrorMsgContent').show();

        returnval = false;
    }
    if (lname == "" && returnval == true) {
        $('#PoeDwnldErrorMsgContent').text("Please enter the Last Name");
        $('#PoeDwnldErrorMsg').show();
        $('#PoeDwnldErrorMsgContent').show();

        returnval = false;
    }
    if (mailid == "" && returnval == true) {
        $('#PoeDwnldErrorMsgContent').text("Please enter the Email Id");
        $('#PoeDwnldErrorMsg').show();
        $('#PoeDwnldErrorMsgContent').show();
        returnval = false;
    }

    if (company == "" && returnval == true) {
        $('#PoeDwnldErrorMsgContent').text("Please enter the Company Name");
        $('#PoeDwnldErrorMsg').show();
        $('#PoeDwnldErrorMsgContent').show();
        returnval = false;
    }
    if (title == "" && returnval == true) {
        $('#PoeDwnldErrorMsgContent').text("Please enter the Title");
        $('#PoeDwnldErrorMsg').show();
        $('#PoeDwnldErrorMsgContent').show();
        returnval = false;
    }
    if (phone == "" && returnval == true) {
        $('#PoeDwnldErrorMsgContent').text("Please enter the Contact Number");
        $('#PoeDwnldErrorMsg').show();
        $('#PoeDwnldErrorMsgContent').show();
        returnval = false;
    }

    return returnval;
}
function emailvalidate(mailid) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var emailtested = regex.test(mailid);
    if (!emailtested) {
        $('#PoeDwnldErrorMsgContent').text("Please enter a valid emailid");
        $('#PoeDwnldErrorMsg').show();
        $('#PoeDwnldErrorMsgContent').show();
    }
    return emailtested;
}

function sendcontact() {
    $("#status").fadeIn();
    $("#preloader").delay(10).fadeIn("slow");
    var fname = $('#PoeDwnldFirstname').val();
    var lname = $('#PoeDwnldLastname').val();
    var title = $('#PoeDwnldTitle').val();
    var mailid = $('#PoeDwnldmailid').val();
    var company = $('#PoeDwnldCompany').val();
    var phone = $('#PoeDwnldPhone').val();
    var message = $('#PoeDwnldMessage').val();
    var check = validate();
    if (check) {
        var checkmailid = emailvalidate(mailid);
        if (checkmailid) {
            $('#dowmloadedPDF,.poepopupbg').fadeOut("slow");
            Common.ajax({
                url: '../../SignUp/OpenPDF',
                data: { 'fname': fname, 'lname': lname, 'title': title, 'mailid': mailid, 'companyName': company, 'phone': phone, 'message': message },
                success: function () {
                    var poeid = $('#selectedpoeid').val();
                    if (poeid != -1) {
                        var url = '../../SignUp/DownloadPdf?poeid=' + poeid;
                        window.open(url, '_blank');
                    }
                    $('#PoeDwnldFirstname').val("");
                    $('#PoeDwnldLastname').val("");
                    $('#PoeDwnldTitle').val("");
                    $('#PoeDwnldmailid').val("");
                    $('#PoeDwnldCompany').val("");
                    $('#PoeDwnldPhone').val("");
                    $('.formpopupbg').fadeOut("slow");
                    $('#PoeDwnldMessage').text(" ");
                },
                error: function (err) {
                }
            });
        }
    }
}
function GetPoelistStr() {
    var poelist = "";
    Common.ajaxsync({
        url: '../../SignUp/GetSelectedPoesStr',
        success: function (data) {
            poelist = data;
        },
        error: function (err) {
        }
    });
    return poelist;
}