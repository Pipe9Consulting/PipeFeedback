$(document).ready(function () {
    var poe = $('#selectedPoeValueYourMentors').val();
    $("#nMentor").attr('checked', 'checked');
    $("#nMentor").parent().find('img').attr('src', '../../Images/icons/mentor_icon_h.png');


    $("#status").fadeIn();
    $("#preloader").fadeIn("slow");


    var tempval = 0;
    if (poe != 0) {
        setTimeout(function () {
            tempval = 1;
            GetUsersPoesArrangement(poe);
        }, 50);
    }





    yourMentors.loadPoeName({ url: '../../Mentor/GetPoeName' });
    yourMentors.loadModuleIds({ url: '../../Mentor/GetPracticeArea' });
    yourMentors.getuserRoles({ url: '../../Mentor/GetUserRoles' });
    yourMentors.getYourMentors();

    // yourMentors.getuserPoeByType();
    //var image = $('#selectedpoeDigdeep').val();

    $('.poelistli').live('click', function () {
        //debugger;
        var ctrlPoeList = $(this);
        var viewVal = $(this).val();

        $("#status,#preloader").delay(10).fadeIn("slow", function () {
            if (viewVal != 0) {
                ctrlPoeList.addClass("selectArrow");
                ctrlPoeList.siblings().removeClass("selectArrow");
                yourMentors.setSelectedPoe(ctrlPoeList.val());
                $('#selectedpoeDigdeep').val($('.selectArrow p').text().replace('&', '').replace(/ /gi, ''));
                yourMentors.loadModuleIds({ url: '../../Mentor/GetPracticeArea' });
                yourMentors.getYourMentors();
                $('#li1').click();
                //$('#selectedPoeValueSync').val(ctrlPoeList.val());
                $('#selectedPoeValueYourMentors').val(ctrlPoeList.val());

            }
        });
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    });

    $('.poemodule').live('click', function () {
        //debugger;
        var image = $('#selectedpoeDigdeep').val();
        var moduleid = $(this).attr('data-value');
        $('#moduleid').val(moduleid);
        // var img = $('#selectedpoe').val() + moduleresponse[mt].ModuleOrderNumber;
        //var a = yourMentors.loadQuickViewPAQuestions.arguments.img;
        var ctrlPoeModule = $(this);
        var viewVal = ctrlPoeModule.attr('data-value');
        yourMentors.HighlightTile(this);
        // $('#' + viewVal).css('display', 'block');
        // $('#' + viewVal).siblings().css('display', 'none')
        if (viewVal != 0) {
            ctrlPoeModule.addClass("selected");
            ctrlPoeModule.siblings().removeClass("selected");
            //yourMentors.setSelectedPoe(ctrlPoeModule.val());
            //var i = yourMentors.loadMdlIds({ url: '../../Mentor/GetPracticeArea' });

            $('#selectedPoeValueYourMentors').val(ctrlPoeModule.val());
        }

    });

    $('#li1').click();
    $('.yourMenteesViewMessage').live('click', function () {
        $('.cmntpopup,.popupbg, .wallgoal').fadeIn("slow");
        var fromId = $(this).parents().eq(1).data('id');
        $('#selectedidyourmentor').val(fromId);
        if (fromId != 0) {
            yourMentors.getConnectHistory(fromId)
        }
    });



    $('.close,.reply').click(function () {
        $('.poepopup,.popupbg,.poepopupbg,.cmntpopup,.wallgoal').fadeOut("slow");

    });

    $('#wallactcontent #sndConnect').live('click', function () {

        $("#status").fadeIn("slow");
        $("#preloader").delay(1000).fadeIn("slow");

        var sendmessagetext = $('textarea').val();
        var selectedids = $('#selectedidyourmentor').val();
        if (selectedids != "" && sendmessagetext != "") {
            SendMessagesYourMentors(selectedids);

        } else {
            //$(".popupbg,.popup").show();
            alert("Message cannot be blank");
        }
        $("#status").fadeOut("slow");
        $("#preloader").delay(1000).fadeOut("slow");

    });

    var html = "<li><a href='/Mentor/Mentor'><span> <img src='../../Images/icons/peer-small.png' /></span><p>Mentors</p></a></li>" +
               "<li><a href='/Mentor/PotentialMentors'><span> <img src='../../Images/icons/big-pic-small.png' /></span><p>Potential Mentors</p></a></li>" +
               "<li><a href='/Mentor/YourMentors'><span><img src='../../Images/icons/digin-small.png' /></span><p>Your Mentors</p></a></li>" +
               "<li><a href='/Mentor/YourMentees'><span><img src='../../Images/icons/dig-deeper-small.png' /></span><p>Your Mentees</p></a></li>";
    $('#target ul').html(html);


    $("#status").fadeOut();
    $("#preloader").delay(100).fadeOut("slow");

});


var yourMentors = {


    loadModuleIds: function (option) {
        var moduleIds = new Array();

        var data = $('#selectedpoeDigdeep').val();
        Common.ajaxsync({
            url: option.url,
            success: function (response) {
                yourMentors.loadQuickViewPAQuestions({ url: '../../Mentor/GetQuestions', response: response });

                $('#totalmodules').val(response.length);
            },
            error: function (err) {
            }
        });
    },

    getPaginationhtml: function (count1, parentclassname) {
        var slidehtml = '';
        slidehtml += "<div class=\"paginationfb \" id=" + parentclassname + "><ul class='paginationBottom'><li><span class=\"fristpage\"></span></li><li><span class=\"prepage\"></span></li>";
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

    getuserRoles: function () {
        var type = 0;
        Common.ajaxsync({
            url: '/Mentor/GetUserRoles',
            success: function (response) {

                $('.stiles').hide();
                for (var i = 0; i < response.length; i++) {
                    switch (response[i].RoleId) {
                        case 1:
                            $('#team').show();
                            type = 2;
                            break;
                        case 2:
                            $('#you').show();
                            type = 1;

                            break;
                        case 3:
                            $('#you').show();
                            type = 1;

                            break;
                        case 4:

                            break;
                        case 5:
                            $('#you').show();
                            type = 1;

                            break;
                        case 6:
                            $('#you').show();
                            type = 1;

                            break;

                        default:
                            break;
                    }
                }
                yourMentors.getuserPoeByType(type);
                var typevalue = $('#yourMentorsType').val();
                //var tileclicked = $('#stilesClick').val();
                //// debugger;
                //if (typevalue != 0) {
                //    type = typevalue;
                //    $('.stiles').each(function () {
                //        var value = $(this).attr('value');            //Change First $(this).val()
                //        if (value == typevalue) {
                //            $(this).addClass('selected');
                //        }
                //    });
                //}
                var t = $('.stiles:visible').first();
                t.addClass('selected');


            },
            error: function () {
            }
        });
    },

    loadQuickViewPAQuestions: function (option) {
        //debugger;

        var moduleresponse = option.response;
        var html = "";
        var slidehtml = '';
        var questionids = "";
        var hideorshowSlimScroll = (moduleresponse.length - 1) > 6;
        var excellenceIndicatorCount = [];
        var image = $('#selectedpoeDigdeep').val();
        for (var m = 0; m < moduleresponse.length; m++) {
            if (moduleresponse[m].ModuleOrderNumber > 0) {
                var moduleid = moduleresponse[m].ModuleId;
                var poemodules = "";

                var practiceArea1 = (moduleresponse.length < 7 ? (7 - moduleresponse.length) : 0);
                for (var mt = 0; mt < moduleresponse.length; mt++) {
                    if (moduleresponse[mt].ModuleOrderNumber > 0) {

                        var img = $('#selectedpoe').val() + moduleresponse[mt].ModuleOrderNumber;

                        // poemodules = poemodules + "<li id ='li" + moduleresponse[mt].ModuleOrderNumber + "' data-value=" + moduleresponse[mt].ModuleId + "' data-moduleorder=" + moduleresponse[mt].ModuleOrderNumber + "  class='takesf " + img + "Tile" + ((moduleresponse[mt].ModuleOrderNumber == 1) ? ' selected select' + img : '') + " limod" + moduleresponse[mt].ModuleOrderNumber + "'><p>" + moduleresponse[mt].ModuleName + "</p></li>";

                        poemodules = poemodules + "<li class='poemodule' id ='li" + moduleresponse[mt].ModuleOrderNumber + "' data-value='" + moduleresponse[mt].ModuleId + "' data-imgname='" + image + img + "' data-moduleorder='" + moduleresponse[mt].ModuleOrderNumber + "'>  <div class='icon " + img + "Tile" + ((moduleresponse[mt].ModuleOrderNumber == 1) ? ' selected select' + img : '') + " limod" + moduleresponse[mt].ModuleOrderNumber + "'> '<img src='../../Images/icons/" + image + img + ".png' alt=''></div><p>" + moduleresponse[mt].ModuleName + "</p></li>";


                    }
                }

                for (var pa1 = 0; pa1 < practiceArea1; pa1++) {
                    //poemodules = poemodules + "<li id ='li" + (moduleresponse.length + 1) + "' data-value=" + (moduleresponse.length + 1) + "' data-moduleorder=" + (moduleresponse.length + 1) + "  class='takesf emptyTile '><p></p><img src='' width='64' height='50'  class='img' />" + "</li>";

                    poemodules = poemodules + "<li id ='li" + (moduleresponse.length + 1) + "' data-value=" + (moduleresponse.length + 1) + "' data-moduleorder=" + (moduleresponse.length + 1) + "</li> <div class='icon emptyTile '><p></p>" + "</div>";
                }

                poemodules = poemodules + "</ul>" + (hideorshowSlimScroll ? '</div>' : '') + "</div></div>";
                $('#poemodule').html(poemodules);
                $('.scroll2').slimScroll();
            }
        }
    },

    loadPoeName: function () {

        var poeid = $('#selectedPoeValueYourMentors').val();

        Common.ajaxsync({
            url: "../../Mentor/GetPoeName",
            data: { 'poeid': poeid },
            success: function (response) {
                $('#selectedpoeDigdeep').val(response);

            },
            error: function () {
            }
        });
    },

    loadMdlIds: function (option) {
        var moduleIds = new Array();
        Common.ajaxsync({
            url: option.url,
            success: function (response) {
                yourMentors.loadImageCount({ url: '../../Mentor/GetQuestions', response: response });

                return response;
            },
            error: function (err) {
            }
        });
    },

    loadImageCount: function (option) {
        //debugger;

        var moduleresponse = option.response;
        var excellenceIndicatorCount = [];
        for (var m = 0; m < moduleresponse.length; m++) {
            if (moduleresponse[m].ModuleOrderNumber > 0) {
                var moduleid = moduleresponse[m].ModuleId;
                var poemodules = "";

                var practiceArea1 = (moduleresponse.length < 7 ? (7 - moduleresponse.length) : 0);
                for (var mt = 0; mt < moduleresponse.length; mt++) {
                    if (moduleresponse[mt].ModuleOrderNumber > 0) {
                        var image = $('#selectedpoeDigdeep').val();
                        var img = $('#selectedpoe').val() + moduleresponse[mt].ModuleOrderNumber;

                        return img;




                    }
                }


            }
        }
    },

    getuserPoeByType: function (type) {
        Common.ajaxsync({
            url: '/Mentor/GetUsersPoeByRole?type=' + type,
            success: function (response) {
                var html = '';
                var poeids = '';
                for (var i = 0; i < response.length; i++) {
                    html = html + " <li id ='poeli" + response[i].POEId + "' value=" + response[i].POEId + " class='poelistli'><a> <div class='icon'> <img src='../../Images/" + response[i].Name.replace("&", "") + "_Intro.png' alt='" + response[i].Name + "' class='img' /></div> <p> " + response[i].Name + "</p> </a><span></span></li>";
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
                $('.scroll2').slimScroll();
                //poelist(poeids, html, response[0].POEId, response.length);
                var mentorPageSelectedVal = $('#selectedPoeValueYourMentors').val();
                if (mentorPageSelectedVal != 0) {
                    $('#poelist1').html(html).find('#poeli' + mentorPageSelectedVal).addClass("selectArrow");

                }

            },
            error: function () {
            }
        });
    },

    setSelectedPoe: function (poe) {
        //debugger;
        Common.ajaxsync({
            url: '/Mentor/SetSelectedPoe?poe=' + poe,
            success: function () {
                //sync.SetWcsiDiff();
            },
            error: function () {
            }
        });
    },


    getYourMentors: function () {
        Common.ajaxsync({
            url: '/Mentor/getYourMentors',
            success: function (response) {
                var html = '';
                if (response != null) {
                    var responseCount = response[0].user.length;
                    var licount = 8;
                    var numberOfSlides = Math.ceil(responseCount / licount);
                    var count1 = Math.ceil(numberOfSlides);
               

                    //for (var i = 0; i < response.length; i++) {
                    for (var i = 0; i < numberOfSlides; i++) {
                        //html += "<div id=" + response[i].ModuleId + " class='mentorslist'>";

                        html += "<div id= 'netAll" + i + "' " + ((i == 0) ? 'class=\'activeslide\'' : '') + ">";
                        //if (response[i].user != null && response[i].user[0] != null) {
                        //for (var j = 0; j < response[i].user.length; j++) {


                        for (var j = (8 * i) ; j < responseCount && j < ((i + 1) * 8) ; j++) {
                            //html += "<li class='netmgr' data-id='" + response[i].user[j].UserId + "' data-email='" + response[i].user[j].EmailAddress + "'>" +
                            //        "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].user[j].UserId + "' width='61' height='61' alt='User'>"
                            //        + "<div class='ntwrktext'>" +
                            //         "<p>" + response[i].user[j].FirstName + " " + response[i].user[j].LastName + "</p>" +
                            //        "<p>" + response[i].user[j].EmailAddress + "</p>" +
                            //        "<p>" + response[i].user[j].JobTitle + "</p>" +
                            //        "<p>Country: " + response[i].user[j].Country.Name + "</p>" +
                            //        "</div>" +
                            //        "<div class='connectEmail'>" +
                            //        "<a class='yourMenteesViewMessage' href='#'>View Message</a>" +
                            //        "</div>" +
                            //        "</li>";


                            html += "<li class='netmgr' data-id='" + response[0].user[j].UserId + "' data-email='" + response[0].user[j].EmailAddress + "'>" +
                                       "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[0].user[j].UserId + "' width='61' height='61' alt='User'>"
                                       + "<div class='ntwrktext'>" +
                                        "<p>" + response[0].user[j].FirstName + " " + response[0].user[j].LastName + "</p>" +
                                       "<p>" + response[0].user[j].EmailAddress + "</p>" +
                                       "<p>" + response[0].user[j].JobTitle + "</p>" +
                                       "<p>Country: " + response[0].user[j].Country.Name + "</p>" +
                                       "</div>" +
                                       "<div class='connectEmail'>" +
                                       "<a class='yourMenteesViewMessage' href='#'>View Message</a>" +
                                       "</div>" +
                                       "</li>";

                        }

                        if (response[0].user.length < 8) {
                            for (var p = 0; p < (8 - response[0].user.length) ; p++) {
                                html = html + " <li class='mentorlistlidummy' style='cursor:default'></li>";
                            }
                        }

             
                        if (response[0].user.length > 8 && i > 0) {
                            for (var p = 0; p < ((numberOfSlides * 8) - response[0].user.length) ; p++) {
                                html = html + " <li class='mentorlistlidummy' style='cursor:default'></li>";
                            }
                        }
                    

                        //if (response[0].user.length > 8) {
                        //    for (var p = response[0].user.length; p < 15; p++) {
                        //        html = html + " <li class='mentorlistlidummy' style='cursor:default'></li>";
                        //    }
                        //}
                  
                        html += "</div>";
                       
                    }
                    if (responseCount == 0) {
                        html = "<div id= 'netAll0' class='activeslide' style='width: 100%; float: left;'>";
                        for (var p = 0; p < 8; p++) {
                            html = html + " <li class='mentorlistlidummy' style='cursor:default'></li>";
                        }
                        html = html + "</div>";
                    }
               

                    $('#yourmentorslist').html(html);


                    $('#pagingNetwork').html((((responseCount / licount) > 1) ? yourMentors.getPaginationhtml((responseCount / licount), 'coltwo') : ""));
                    yourMentors.getpaginationcontrols();
                    if (count1 != 0) {
                        $('.coltwo').css('width', count1 * 120 + '%');
                        $('.coltwo > div').css('width', 100 / count1 + '%');
                        $('.coltwo > div').css('float', 'left');
                    } else {
                        $('.coltwo').css('width','120%');
                    }
                }
                else {

                    $('#yourmentorslist').html('');
                }
            }
        });

    },
    getConnectHistory: function (fromId) {
        Common.ajaxsync({
            url: '/Mentor/GetConnectHistory',
            data: { forId: $('#UserId').val(), fromId: fromId },
            success: function (response) {
                var html = '';
                for (var i = 0; i < response.length; i++) {
                    var fromusername = $('[data-id="' + fromId + '"]:first .ntwrktext p:first').text();
                    var forusername = $('#loggedinUser').text().trim();
                    if (i == 0) {
                        var date = new Date(eval(response[i].CreatedOn.replace(/[^0-9]+/g, "")))

                        //html += '<div class="profilePhoto"><img src="/Uploadify/LoadImageHandler.ashx?id=' + response[i].From + '"></div>' +
                        //    '<div class="msgContent"><div><h2>' + $('#loggedinUser').text().trim() + '</h2>' +
                        //    '<p>' + date.toLocaleString() + '</p><p>' + ((response[i].SourceID == 1) ? $($(response[i].Activity)[4]).text().replace('Message:','').trim() : $($(response[i].Activity)[3]).text().trim()) + '</p>' +
                        //   ' </div> <div class="replyContent"><div class="scroll2"> ';

                        html += '<div class="profilePhoto"><img src="/Uploadify/LoadImageHandler.ashx?id=' + response[i].From + '"></div>' +
                            '<div class="msgContent"><div><h2>' + $('#loggedinUser').text().trim() + '</h2>' +
                            '<p>' + date.toLocaleString() + '</p><p>' + ((response[i].SourceID == 1) ? $($(response[i].Activity)[4]).text().replace('Message:', '').trim() : $($(response[i].Activity)[3]).text().trim()) + '</p>' +
                           ' </div> <div class="replyContent"><div class="scroll2"> <div class="msgEditor">  <div class="profilePhoto"><img src="/Uploadify/LoadImageHandler.ashx?id=' + $('#UserId').val() + '"></div>' +
                        '<div class="msgContent">' +
                            '<h3>' + forusername + ' replying to ' + fromusername + '</h3>' +
                            '<textarea></textarea>' +
                            '<div id="sndConnect"><input type="button"  value="Send" class="signupbtn sendMessageYourMentors"/></div></div></div>';





                    }
                    else {
                        if (response[i].From == $('#UserId').val()) {
                            fromusername = $('#loggedinUser').text().trim();
                            forusername = $('[data-id="' + fromId + '"]:first .ntwrktext p:first').text();
                        }
                        else {
                            fromusername = $('[data-id="' + fromId + '"]:first .ntwrktext p:first').text();
                            forusername = $('#loggedinUser').text().trim();
                        }
                        var date = new Date(eval(response[i].CreatedOn.replace(/[^0-9]+/g, "")))
                        html += ' <div class="profilePhoto"><img src="/Uploadify/LoadImageHandler.ashx?id=' + response[i].From + '"></div>' +
                            '<div class="msgContent"><div><h3>' + fromusername + ' replying to ' + forusername + '</h3>' +
                            ' <p>' + date.toLocaleString() + '</p>' + ((response[i].SourceID == 1) ? $($(response[i].Activity)[4]).text().replace('Message:', '').trim() : $($(response[i].Activity)[3]).text().trim()) + '</p>' +
                            '</div></div>';
                    }
                }

                //html += '<div class="msgEditor">  <div class="profilePhoto"><img src="/Uploadify/LoadImageHandler.ashx?id=' + $('#UserId').val() + '"></div>' +
                //        '<div class="msgContent">'+
                //            '<h3>' + forusername + ' replying to ' + fromusername + '</h3>' +
                //            '<textarea></textarea>'+
                //            '<div id="sndConnect"><input type="button"  value="Send" class="signupbtn sendMessageYourMentors"/></div></div></div></div></div>';


                html += '</div></div>';







                $('#wallactcontent').html(html);
                $('.scroll2').slimScroll();
            }
        });
    },

    HighlightTile: function (obj) {
        var selimg = $(obj).data('imgname')
        $('.poemodule').not('.dummytile').each(function () {
            var imagename = $(this).data('imgname')
            $(this).find('img').attr('src', '../../images/icons/' + imagename + '.png')
        });
        $(obj).find('img').attr('src', '../../images/icons/' + selimg + 'h.png');
    },

    getpaginationcontrols: function () {
        $('.prepage').unbind('click');
        $('.nextpage').unbind('click');
        $('.fristpage').unbind('click');
        $('.lastpage').unbind('click');
        $('.pageno').unbind('click');

        $('.prepage').click(function () {
            var parentclass = $(this).parents().filter('.paginationfb').attr('id');
            var activeslide = $('.' + parentclass).find('.activeslide');
            var activeslideno = ($(activeslide).attr('id')).replace(/\D/g, '');
            activeslideno = parseInt(activeslideno) + 1;
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
            var parentclass = $(this).parents().filter('.paginationfb').attr('id');
            var activeslide = $('.' + parentclass).find('.activeslide');
            var activeslideno = ($(activeslide).attr('id')).replace(/\D/g, '');
            activeslideno = parseInt(activeslideno) + 1;
            var activeslideid = $(activeslide).attr('id');
            var siblingscount = $(activeslide).siblings().length;
            var test = $('#' + activeslideid).next().length;
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
            $(activeslide).removeClass('activeslide'); $('#' + activeslidename + '0').addClass('activeslide');
            $(this).parent().siblings().filter('.pageno').hide(); $(this).parent().siblings().filter('.pageno').slice(0, 3).show();
        });
        $('.lastpage').click(function () {
            var parentclass = $(this).parents().filter('.paginationfb').attr('id');
            var activeslide = $('.' + parentclass).find('.activeslide');
            var activeslideno = ($(activeslide).attr('id')).replace(/\D/g, '');
            var activeslidename = ($(activeslide).attr('id')).replace(new RegExp("[0-9]", "g"), "");
            var siblingscount = $(activeslide).siblings().length;
            for (var i = 1; i < (siblingscount + 1) ; i++) {
                $('#' + activeslidename + (i - 1)).animate({ 'margin-left': '-100%' }, { duration: 400 });
            }
            $(activeslide).removeClass('activeslide'); $('#' + activeslidename + siblingscount).addClass('activeslide');
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
            var siblingscount = parseInt($(activeslide).siblings().length);
            var pageno = parseInt($(this).find('a').text());
            for (var i = (pageno - 1) ; i > 0; i--) {
                $('#' + activeslidename + (i - 1)).animate({ 'margin-left': '-100%' }, { duration: 400 });
            }
            for (var i = pageno; i < (siblingscount + 1) ; i++) {
                $('#' + activeslidename + (i - 1)).animate({ 'margin-left': '0%' }, { duration: 400 });
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
            $(activeslide).removeClass('activeslide'); $('#' + activeslidename + (pageno - 1)).addClass('activeslide');
        });
    },
}

function GetUsersPoesArrangement(poeid) {
    Common.ajaxsync({
        url: "/Mentor/GetUsersPoesArrangement",
        data: { 'poeid': poeid },
        success: function (response) {
            if (response != null) {
                $('#yourMentorsType').val(response);
            }
        },
        error: function () {
        }
    });
}

function SendMessagesYourMentors(selectedIds) {
    var poename = $('#selectedpoeDigdeep').val();
    var sendmessagetext = $('textarea').val();
    var subject = "Comments for the REP-" + poename;
    var moduleid = $('#moduleid').val();
    Common.ajax({
        url: '../../Mentor/ConnectPostStanding',
        data: { 'useridslist': selectedIds, 'subject': subject, 'comments': sendmessagetext, 'moduleid': moduleid },
        success: function (response) {
            yourMentors.getConnectHistory($('#selectedidyourmentor').val());
            alert("Message sent successfully");
            $('textarea').val('');
            //$('#ReqFeedback  li a span,#seekSherpas li a span').removeClass('slidecontentselect');
        },
        error: function (err) {
        }
    });
}
