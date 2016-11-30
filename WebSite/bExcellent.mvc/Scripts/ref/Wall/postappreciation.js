var postappreciation = {
    loadmember: function () {
        Common.ajaxsync({
            url: '/Wall/GetMyUsers',
            success: function (response) {
               /// debugger;
                var html = '';
                if (response != null) {
                    for (var i = 0; i < response.length; i++) {
                        html = html + "<li id='member" + response[i].UserId + "' value=" + response[i].User.UserId + ">" +
                            "<img  class='youimg'  src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                            "<h2> " + response[i].User.FirstName + " " + response[i].User.LastName + "</h2>" +
                            "<h4> " + response[i].User.EmailAddress + "</h4>" +
                            "</li>";
                    }
                }
                $('#memberlist').html(html);
            },
            error: function (err) {
            }
        });
    },
    fileadded: function () {
        $('#fileadded').html('File attached');
        
    },
    loadContentmenu: function () {
        var html = "<li><a href='/wall/index'><span> <img src='../../Images/Icons/wall-small.png' /></span><p>Wall</p></a></li>" +
            "<li><a href='/wall/PostAppreciation'><span><img src='../../Images/Icons/send-app-small.png' /></span><p>Send Appreciation</p></a></li>" +
            "<li><a href='/wall/PostVideos'><span><img src='../../Images/Icons/post-video-small.png' /></span><p>Post a Video</p></a></li>" +
            "<li><a href='/wall/SyncYammer'><span><img src='../../Images/Icons/yammer-small.png' /></span><p>Sync with Yammer</p></a></li>";

        $('#target ul').html(html);
    }
};
$(document).ready(function () {
    debugger;
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $.fn.drags = function (opt) {
        opt = $.extend({ handle: "", cursor: "move" }, opt);

        if (opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function (e) {
            if (opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function (e) {
                $('.draggable').offset({
                    top: e.pageY + pos_y - drg_h,
                    left: e.pageX + pos_x - drg_w
                }).on("mouseup", function () {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function () {
            if (opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });
    };
    $('#poeiddpoup').drags();
    $('.scroll1').slimScroll();
    $('.yammerpopupbg').hide();
    postappreciation.loadContentmenu();
    var sourceElement = null;
    var loadCSS = function (callback) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = "/Scripts/ref/editor/themes/square.min.css";
        link.id = 'theme-style';

        document.getElementsByTagName('head')[0].appendChild(link);

        var img = document.createElement('img');
        img.onerror = function () {
            if (callback) callback(link);
        };
        img.src = "/Scripts/ref/editor/themes/square.min.css";
    };
    var initEditor = function () {
        $("textarea").sceditor({
            plugins: 'xhtml',
            resizeEnabled: false,
            toolbar: "bold,italic,underline,left,center,right,justify,bulletlist,orderedlist",
            style: "/Scripts/ref/editor/jquery.sceditor.default.min.css",
            bbcodeTrim: true
        });
    };
    initEditor();
    $('textarea').sceditor('instance').rtl(false);
    $('textarea').sceditor('instance').unbind('focus');
    $('textarea').sceditor('instance').focus(function (e) {
        //initEditor();
        var txtareavalText = $('textarea').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
        if (txtareavalText == "") {
            var m = $('textarea').sceditor('instance').val("");
            var t = $('textarea').sceditor('instance').getBody()[0].innerHTML;
        }
        $('textarea').sceditor('instance').rtl(false);
    });
    //loadCSS(initEditor);

    $('iframe').height('112px');
    $('iframe').width('98%');
    postappreciation.loadmember();

    $('#badge li').live('click', function () {
        $(this).toggleClass('badgeselect');
        $('#badge li').not($(this)).removeClass('badgeselect');
    });
    $('#award li').live('click', function () {
        $(this).toggleClass('badgeselect');
        $('#award li').not($(this)).removeClass('badgeselect');
    });
    $('#Closeclick').live('click', function () {
        $('.yammerpopupbg').fadeOut();
        $('#subject').val('');
        $('#appreciation').val('');
        $('#comments').val('');
        $('#selectedmembershdn').val('');
        $('#selectedmembersemailids').val('');
        $('#selectedmembersdiv').html('');
        $('textarea').sceditor('instance').getBody()[0].innerHTML = '';
        $('#award li').removeClass('badgeselect');
        $('#badge li').removeClass('badgeselect');
        $('.postcmnt li').removeClass('postsel');
    });
    $('.postcmnt li').live('click', function () {
        $(this).toggleClass("postsel");
        var html = '';
        if ($('#selectedmembersdiv').html().indexOf($(this).find('h4').html()) == -1) {
            html = $('#selectedmembersdiv').html() + $(this).find('h4').html() + ';';
        } else {
            html = $('#selectedmembersdiv').html().replace($(this).find('h4').html() + ';', '');
        }
        $('#selectedmembersdiv').html(html);

        var emailids = '';
        if ($('#selectedmembersemailids').val().indexOf($(this).find('h4').html()) == -1) {
            emailids = $('#selectedmembersemailids').val() + $(this).find('h4').html() + ';';
        } else {
            emailids = $('#selectedmembersemailids').val().replace($(this).find('h4').html() + ';', '');
        }
        $('#selectedmembersemailids').val(emailids);

        var value = '';
        if ($('#selectedmembershdn').val().indexOf($(this).val()) == -1) {
            value = $('#selectedmembershdn').val() + $(this).val() + ',';
        } else {
            value = $('#selectedmembershdn').val().replace($(this).val() + ',', '');
        }
        $('#selectedmembershdn').val(value);
    });
    $('#sendbtn').live('click', function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        var txtareavalText = $('textarea').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
        if (txtareavalText == "") {
            $('#masterMsgCont').text("Please Enter the Text");
            $('#overallCont').show();
            //alert('Please Enter the Text');
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
        } else {
            var selectedids = $('#selectedmembershdn').val().split(',');
            if (selectedids.length <= 1) {
                $('#masterMsgCont').text("Please select at least one User");
                $('#overallCont').show();
                //alert('Please select at least one User');
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
            } else {
                var html = $('textarea').sceditor('instance').getBody()[0].innerHTML;
                var badge = $('#badge .badgeselect').val();
                var award = $('#award .badgeselect').val();
                var badgeText = '';
                var awardText = '';
                var subject = '';
                var appreciationtext = '';
                if (badge != undefined) {
                    switch (badge) {
                        case 1:
                            badgeText = "<img src='../../Images/thankyou-recieved.png' width='114' height='60' />";
                            subject = "Badge";
                            break;
                        case 2:
                            badgeText = "<img src='../../Images/idea-recieved.png' width='114' height='60' />";
                            subject = "Badge";
                            break;
                        case 3:
                            badgeText = "<img src='../../Images/key-contri-recieved.png' width='114' height='60' />";
                            subject = "Badge";
                            break;
                        default:
                            badgeText = "";
                            break;
                    }
                }
                if (award != undefined) {
                    switch (award) {
                        case 1:
                            awardText = "<img src='../../Images/gold-medal-recieved.png' width='114' height='60' />";
                            subject = "Medal";
                            break;
                        case 2:
                            awardText = "<img src='../../Images/silver-medal-recieved.png' width='114' height='60' />";
                            subject = "Medal";
                            break;
                        case 3:
                            awardText = "<img src='../../Images/bronze-medal-recieved.png' width='114' height='60' />";
                            subject = "Medal";
                            break;
                        default:
                            awardText = "";
                            break;
                    }
                }
                if (badge != undefined || award != undefined) {
                    appreciationtext = " <div class='recieve'>" + badgeText + awardText + "</div>";
                } else {
                    appreciationtext = " <div class='recieve' style='height:60px'></div>";
                }
                if (badge != undefined && award != undefined) {
                    subject = "Medal and Badge";
                } else if (badge == undefined && award == undefined) {
                    subject = "Appreciation from";
                }

                $('#subject').val(subject);

                $('#appreciation').val(appreciationtext);
                $('#comments').val(txtareavalText);

                var form = $('#PostComments');
                var formData = new FormData(form[0]);
                $.ajax({
                    type: "POST",
                    url: "/wall/SendAppreciation",
                    enctype: 'multipart/form-data',
                    data: formData,
                    success: function (data) {
                        $('#subject').val('');
                        $('#appreciation').val('');
                        $('#comments').val('');
                        $('#selectedmembershdn').val('');
                        $('#selectedmembersemailids').val('');
                        $('#selectedmembersdiv').html('');
                        $('textarea').sceditor('instance').getBody()[0].innerHTML = '';
                        $('#award li').removeClass('badgeselect');
                        $('#badge li').removeClass('badgeselect');
                        $('.postcmnt li').removeClass('postsel');
                        $('#fileadded').html('');
                        //alert("Message Posted Successfully");
                        $("#status").fadeOut();
                        $("#preloader").delay(100).fadeOut("slow");
                        $('.poepopupbg,.popup').show();
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                });
                return false;
            }
        }
    });

    $('#both').live('click', function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        $('#btnClickevent').val(1);
        var txtareavalText = $('textarea').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
        if (txtareavalText == "") {
            $('#masterMsgCont').text("Please Enter the Text");
            $('#overallCont').show();
            //alert('Please Enter the Text');
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
        } else {
            var selectedids = $('#selectedmembershdn').val().split(',');
            if (selectedids.length <= 1) {
                $('#masterMsgCont').text("Please select at least one User");
                $('#overallCont').show();
                //alert('Please select at least one User');
            } else {
                LoadYammerGroupMemebers();
                $('#yammerpopupbg').show();
            }
        }
    });

    $('#postYammer').live('click', function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        $('#btnClickevent').val(2);
        var txtareavalText = $('textarea').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
        if (txtareavalText == "") {
            $('#masterMsgCont').text("Please Enter the Text");
            $('#overallCont').show();
            //alert('Please Enter the Text');
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
        } else {
            var selectedids = $('#selectedmembershdn').val().split(',');
            if (selectedids.length <= 1) {
                $('#masterMsgCont').text("Please select at least one User");
                $('#overallCont').show();
                //alert('Please select at least one User');
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
            } else {
                LoadYammerGroupMemebers();
                $('#yammerpopupbg').show();
            }
        }
    });
    //Groups Share
    $('#SharePostGroupAll').live('click', function () {
        $('#sharePostClick').val(0);
        var btnclick = $('#btnClickevent').val();
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        if (btnclick == 1) {
            PostBothClickEvent();
        } else if (btnclick == 2) {
            PostYammerClickEvent();
        }
        var groupid = false;
        var t = $('#yammercontrols ul').length;
        for (var i = 0; i < t; i++) {
            var st = "#yammerGrouplists" + i + "  li";
            $(st).each(function () {
                var selectedgroups = $(this)[0].className;
                if (selectedgroups == "selectgroupids") {
                    groupid = true;
                }
            });
        }

        if (groupid) {
            GroupClickEvent();
        } else {
            $('#masterMsgCont').text("Message Posted Successfully");
            $('#overallCont').show();
            //alert("Message Posted Successfully");
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
        }
    });
    $('#SharePostGroup').live('click', function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        var groupid = false;

        var t = $('#yammercontrols ul').length;
        for (var i = 0; i < t; i++) {
            var st = "#yammerGrouplists" + i + "  li";
            $(st).each(function () {
                var selectedgroups = $(this)[0].className;
                if (selectedgroups == "selectgroupids") {
                    groupid = true;
                }
            });
        }
        if (groupid) {
            $('#sharePostClick').val(1);
            GroupClickEvent();
        } else {
            $('#masterMsgCont').text("Please select a group");
            $('#overallCont').show();
            //alert('Please select a group');
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
        }
    });
    //
    $('#postcmnt').show();
    $('#wall, #postvmsg,.wall1,.wall3').hide();
    $('#sa').addClass('selected');
    $('.wall2').show();
    $('#postvmsgtile, #walltile,.badgetile, .badgetile1').removeClass('selected');
    $("#status").fadeOut();
    $("#preloader").delay(100).fadeOut("slow");
});
//function LoadYammerGroupMemebers() {
//    Common.ajaxsync({
//        url: '../Yammer/GetYammerGroupid',
//        success: function (response) {
//            var html = "";
//            var html2 = "";
//            if (response != null && response.length <= 8) {
//                for (var i = 0; i < response.length; i++) {
//                    html = html + " <li value=" + response[i].Groupid + "><span class=''> <img src='../../Images/yammer-select.png' /></span><div class='imgholder'> <img src='" + response[i].GroupImage + "' /> </div> <div class='conholder'> <h3> " + response[i].GroupName + "</h3> </div> </li>";
//                }
//                for (var i = response.length; i < 8; i++) {
//                    html = html + " <li class='noselectgroup'><span class=''> </span><div class='imgholder'> <img src='../../Images/icons/icon.png' /></div> <div class='conholder'> <h3> Yammer Group</h3> </div> </li>";
//                }
//            } else
//                if (response != null && response.length > 8) {
//                    for (var j = 8; j < (response.length - 8) ; j++) {
//                        html2 = html2 + " <li value=" + response[i].Groupid + "><span class=''> <img src='../../Images/yammer-select.png' /></span><div class='imgholder'> <img src='" + response[i].GroupImage + "' /> </div> <div class='conholder'> <h3 " + response[i].GroupName + "</h3> </div> </li>";
//                    }
//                    $('.ynxt').click(function () {
//                        $(".yammerpopupcontholder .left").animate({ 'margin': '0 0 0 -107%' }, { duration: 1000 });
//                    });
//                    $('.yprev').click(function () {
//                        $(".yammerpopupcontholder .left").animate({ 'margin': '0' }, { duration: 1000 });
//                    });
//                }

//            $('#yammerGrouplists1').html(html);
//            $('#yammerGrouplists2').html(html2);
//            $("#status").fadeOut();
//            $("#preloader").delay(100).fadeOut("slow");
//            if (response != null) {
//                $('.yammerpopupbg').fadeIn("slow");
//            } else {
//                window.location = "../Yammer/getYammer";
//            }
//        },
//        error: function (err) {
//        }
//    });
//    $('.yammerpopupcontholder .left li').click(function () {
//        $(this).find('span img').toggle();
//        var check = $(this).hasClass('selectgroupids');
//        var checkfalseclass = $(this).hasClass('noselectgroup');
//        if (!checkfalseclass) {
//            if (check) {
//                $(this).removeClass("selectgroupids");
//            } else {
//                $(this).addClass("selectgroupids");
//            }
//        }
//    });
//}
function LoadYammerGroupMemebers() {
    Common.ajaxsync({
        url: '../Yammer/GetYammerGroupid',
        success: function (response) {
            if (response != null) {
                $('#yammercontrols').html("");
                var html = '';
                var slidehtml = '';
                var licount = 8;
                var count = response.length / licount;
                var count1 = Math.ceil(count);
                for (var k = 0; k < count1; k++) {
                    html = html + "<ul id='yammerGrouplists" + k + "'>";
                    for (var j = 0; j < licount / 2; j++) {
                        var i = ((k * licount) + j);
                        var o = ((k * licount) + j) + (licount / 2);
                        if (response[i] != null) {
                            html = html + " <li value=" + response[i].Groupid + "><span class=''> <img src='../../Images/yammer-select.png' /></span><div class='imgholder'> <img src='" + response[i].GroupImage + "' /> </div> <div class='conholder'> <h3> " + response[i].GroupName + "</h3> </div> </li>";
                        } else {
                            html = html + " <li class='noselectgroup'><span class=''> </span><div class='imgholder'> <img src='../../Images/icons/icon.png' /></div> <div class='conholder'> <h3> Yammer Group</h3> </div> </li>";
                        }
                        if (response[o] != null) {
                            html = html + " <li value=" + response[o].Groupid + "><span class=''> <img src='../../Images/yammer-select.png' /></span><div class='imgholder'> <img src='" + response[o].GroupImage + "' /> </div> <div class='conholder'> <h3> " + response[o].GroupName + "</h3> </div> </li>";
                        } else {
                            html = html + " <li class='noselectgroup'><span class=''> </span><div class='imgholder'> <img src='../../Images/icons/icon.png' /></div> <div class='conholder'> <h3> Yammer Group</h3> </div> </li>";
                        }
                    }
                    html = html + "</ul>";
                    if (k != count1 - 1) {
                        slidehtml = slidehtml + " <li id='yprev" + k + "'  data-value=" + k + "> <img src='../../Images/nav-prev.png' /></li> <li id='ynxt" + k + "' data-value=" + k + "> <img src='../../Images/nav-nxt.png' /></li>";
                    }
                }
                $('#yammercontrols').html(html);
                var width = 100 * count1;
                var ulcount = 100 / count1;
                $("#yammercontrols").css('left', '0');
                $('.yammerpopupcontholder .left').css('width', width + '%');
                $('.yammerpopupcontholder .left ul').css('width', ulcount + '%');
                $('#yammerNextPrevBtn').html(slidehtml);
                for (var l = 0; l < count1; l++) {
                    $('#yprev' + l).hide();
                    $('#ynxt' + l).hide();
                    // $('.slidebtn').show();
                }
                //$('#yprev0').show();
                if (count1 > 1) {
                    $('#ynxt0').show();
                }
                var percentage = 0;
                for (var l = 0; l < count1; l++) {
                    $('#ynxt' + l).click(function () {
                        var id = parseInt(this.id.replace('ynxt', ''));
                        var t = 1;
                        if (id != 0) {
                            t = id + 1;
                        }
                        percentage = ulcount * t;
                        $("#yammercontrols").animate({ 'left': '-' + ulcount * t + '%' }, { duration: 1000 });
                        //$('#fbgvn' + (id)).animate({ 'margin-left': '-100%' }, { duration: 400 });
                        $(this).hide();
                        $('#yprev' + (id - 1)).hide();
                        $('#yprev' + id).show();
                        $('#ynxt' + (id + 1)).show();
                        //$('#pagetxt').html('Page ' + (id + 2) + ' of ' + count1);
                        //$('#fbgvncurpage').val((id + 2));
                    });

                    $('#yprev' + l).click(function () {
                        percentage = percentage - ulcount;
                        var h = 1;
                        if (id != 0) {
                            h = id + 1;
                        }
                        var id = parseInt(this.id.replace('yprev', ''));
                        $("#yammercontrols").animate({ 'left': '-' + percentage + '%' }, { duration: 1000 });
                        //$('#fbgvn' + (id)).animate({ 'margin-left': '0%' }, { duration: 400 });
                        $(this).hide();
                        $('#ynxt' + (id + 1)).hide();
                        $('#yprev' + (id - 1)).show();
                        $('#ynxt' + id).show();
                        //$('#pagetxt').html('Page ' + (id + 1) + ' of ' + count1);
                        //$('#fbgvncurpage').val((id + 1));
                    });
                }
            }
            //

            if (response != null) {
                $('.yammerpopupbg').fadeIn("slow");
            } else {
                window.location = "../Yammer/getYammer";
            }
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
        },
        error: function (err) {
        }
    });
    var count = 0;
    $('.yammerpopupcontholder .left li').click(function () {
        var check1 = $(this).hasClass('selectgroupids');
        if (count < 5 || check1 == true) {
            $(this).find('span img').toggle();
            var check = $(this).hasClass('selectgroupids');
            var checkfalseclass = $(this).hasClass('noselectgroup');
            if (!checkfalseclass) {
                if (check) {
                    count = count - 1;
                    $(this).removeClass("selectgroupids");
                } else {
                    count = count + 1;
                    $(this).addClass("selectgroupids");
                }
            }
        } else {
            $('#masterMsgCont').text("You can select only two groups at a time");
            $('#overallCont').show();
           // alert("You can select only two groups at a time");
        }
    });
}

function GroupClickEvent() {
    var txtareavalText = $('textarea').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
    if (txtareavalText == "") {
        $('#masterMsgCont').text("Please Enter the Text");
        $('#overallCont').show();
        //alert('Please Enter the Text');
    } else {
        var selectedids = $('#selectedmembershdn').val().split(',');
        if (selectedids.length <= 1) {
            $('#masterMsgCont').text("Please select at least one User");
            $('#overallCont').show();
            //alert('Please select at least one User');
        } else {
            var html = $('textarea').sceditor('instance').getBody()[0].innerHTML;
            var badge = $('#badge .badgeselect').val();
            var award = $('#award .badgeselect').val();
            var badgeText = '';
            var awardText = '';
            var subject = '';
            var appreciationtext = '';
            if (badge != undefined) {
                switch (badge) {
                    case 1:
                        badgeText = "<img src='../../Images/thankyou-recieved.png' width='114' height='60' />";
                        subject = "Badge";
                        break;
                    case 2:
                        badgeText = "<img src='../../Images/idea-recieved.png' width='114' height='60' />";
                        subject = "Badge";
                        break;
                    case 3:
                        badgeText = "<img src='../../Images/key-contri-recieved.png' width='114' height='60' />";
                        subject = "Badge";
                        break;
                    default:
                        badgeText = "";
                        break;
                }
            }
            if (award != undefined) {
                switch (award) {
                    case 1:
                        awardText = "<img src='../../Images/gold-medal-recieved.png' width='114' height='60' />";
                        subject = "Medal";
                        break;
                    case 2:
                        awardText = "<img src='../../Images/silver-medal-recieved.png' width='114' height='60' />";
                        subject = "Medal";
                        break;
                    case 3:
                        awardText = "<img src='../../Images/bronze-medal-recieved.png' width='114' height='60' />";
                        subject = "Medal";
                        break;
                    default:
                        awardText = "";
                        break;
                }
            }
            if (badge != undefined || award != undefined) {
                appreciationtext = " <div class='recieve'>" + badgeText + awardText + "</div>";
            } else {
                appreciationtext = " <div class='recieve' style='height:60px'></div>";
            }

            if (badge != undefined && award != undefined) {
                subject = "Medal and Badge";
            } else if (badge == undefined && award == undefined) {
                subject = "Appreciation from";
            }
            $('#subject').val(subject);
            $('#appreciation').val(appreciationtext);
            $('#comments').val(txtareavalText);
            var groupid = "";
            var groupname = "";
            //$('#yammerGrouplists1 li').each(function () {
            //    var selectedgroups = $(this)[0].className;
            //    if (selectedgroups == "selectgroupids") {
            //        groupid = $(this).val() + "%" + groupid;
            //        groupname = $(this).text() + "%" + groupname;
            //    }
            //});
            var t = $('#yammercontrols ul').length;
            for (var i = 0; i < t; i++) {
                var st = "#yammerGrouplists" + i + "  li";
                $(st).each(function () {
                    var selectedgroups = $(this)[0].className;
                    if (selectedgroups == "selectgroupids") {
                        groupid = $(this).val() + "%" + groupid;
                        groupname = $(this).text() + "%" + groupname;
                    }
                });
            }

            groupid = groupid.slice(0, -1);
            groupname = groupname.slice(0, -1);
            $('#GroupIdPost').val(groupid);
            $('#GroupName').val(groupname);
            var form = $('#PostComments');
            var formData = new FormData(form[0]);
            $.ajax({
                type: "POST",
                url: "/wall/SendAppreciationtoYammerGroup",
                enctype: 'multipart/form-data',
                data: formData,
                success: function (data) {
                    $('#subject').val('');
                    $('#appreciation').val('');
                    $('#comments').val('');
                    $('#GroupIdPost').val('');
                    $('#selectedmembershdn').val('');
                    $('#selectedmembersemailids').val('');
                    $('#selectedmembersdiv').html('');
                    $('textarea').sceditor('instance').getBody()[0].innerHTML = '';
                    $('#award li').removeClass('badgeselect');
                    $('#badge li').removeClass('badgeselect');
                    $('.postcmnt li').removeClass('postsel');
                    $('#fileadded').html('');
                    $('.yammerpopupbg').hide();
                    $('#masterMsgCont').text("Message Posted Successfully");
                    $('#overallCont').show();
                    //alert("Message Posted Successfully");
                    $("#status").fadeOut();
                    $("#preloader").delay(100).fadeOut("slow");
                    var groupclick = $('#sharePostClick').val();
                    if (groupclick == 1) {
                        //alert("Message Posted Successfully");
                        //$("#status").fadeOut();
                        //$("#preloader").delay(100).fadeOut("slow");
                    }
                },
                cache: false,
                contentType: false,
                processData: false
            });
            return false;
        }
    }
}

function PostYammerClickEvent() {
    var txtareavalText = $('textarea').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
    if (txtareavalText == "") {
        $('#masterMsgCont').text("Please Enter the Text");
        $('#overallCont').show();
        //alert('Please Enter the Text');
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    } else {
        var selectedids = $('#selectedmembershdn').val().split(',');
        if (selectedids.length <= 1) {
            $('#masterMsgCont').text("Please select at least one User");
            $('#overallCont').show();
           // alert('Please select at least one User');
        } else {
            var html = $('textarea').sceditor('instance').getBody()[0].innerHTML;
            var badge = $('#badge .badgeselect').val();
            var award = $('#award .badgeselect').val();
            var badgeText = '';
            var awardText = '';
            var subject = '';
            var appreciationtext = '';
            if (badge != undefined) {
                switch (badge) {
                    case 1:
                        badgeText = "<img src='../../Images/thankyou-recieved.png' width='114' height='60' />";
                        subject = "Badge";
                        break;
                    case 2:
                        badgeText = "<img src='../../Images/idea-recieved.png' width='114' height='60' />";
                        subject = "Badge";
                        break;
                    case 3:
                        badgeText = "<img src='../../Images/key-contri-recieved.png' width='114' height='60' />";
                        subject = "Badge";
                        break;
                    default:
                        badgeText = "";
                        break;
                }
            }
            if (award != undefined) {
                switch (award) {
                    case 1:
                        awardText = "<img src='../../Images/gold-medal-recieved.png' width='114' height='60' />";
                        subject = "Medal";
                        break;
                    case 2:
                        awardText = "<img src='../../Images/silver-medal-recieved.png' width='114' height='60' />";
                        subject = "Medal";
                        break;
                    case 3:
                        awardText = "<img src='../../Images/bronze-medal-recieved.png' width='114' height='60' />";
                        subject = "Medal";
                        break;
                    default:
                        awardText = "";
                        break;
                }
            }
            if (badge != undefined || award != undefined) {
                //subject = 'Appreciation';
                appreciationtext = " <div class='recieve'>" + badgeText + awardText + "</div>";
            } else {
                appreciationtext = " <div class='recieve' style='height:60px'></div>";
            }

            if (badge != undefined && award != undefined) {
                subject = "Medal and Badge";
            } else if (badge == undefined && award == undefined) {
                subject = "Appreciation from";
            }
            $('#subject').val(subject);

            $('#appreciation').val(appreciationtext);
            $('#comments').val(txtareavalText);

            var form = $('#PostComments');
            var formData = new FormData(form[0]);
            $.ajax({
                type: "POST",
                url: "/wall/SendAppreciationtoYammer",
                enctype: 'multipart/form-data',
                data: formData,
                success: function (data) {
                    $('#fileadded').html('');
                    if (data == "gettoken")
                        window.location.href("/yammer/getYammer");
                    else {
                        //alert("Message Posted Successfully");
                        //$("#status").fadeOut();
                        //$("#preloader").delay(100).fadeOut("slow");
                    }
                },
                cache: false,
                contentType: false,
                processData: false
            });
            return false;
        }
    }
}

function PostBothClickEvent() {
    var txtareavalText = $('textarea').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
    if (txtareavalText == "") {
        $('#masterMsgCont').text("Please Enter the Text");
        $('#overallCont').show();
       // alert('Please Enter the Text');
    } else {
        var selectedids = $('#selectedmembershdn').val().split(',');
        if (selectedids.length <= 1) {
            $('#masterMsgCont').text("Please select at least one User");
            $('#overallCont').show();
            //alert('Please select at least one User');
        } else {
            var html = $('textarea').sceditor('instance').getBody()[0].innerHTML;
            var badge = $('#badge .badgeselect').val();
            var award = $('#award .badgeselect').val();
            var badgeText = '';
            var awardText = '';
            var subject = '';
            var appreciationtext = '';
            if (badge != undefined) {
                switch (badge) {
                    case 1:
                        badgeText = "<img src='../../Images/thankyou-recieved.png' width='114' height='60' />";
                        subject = "Badge";
                        break;
                    case 2:
                        badgeText = "<img src='../../Images/idea-recieved.png' width='114' height='60' />";
                        subject = "Badge";
                        break;
                    case 3:
                        badgeText = "<img src='../../Images/key-contri-recieved.png' width='114' height='60' />";
                        subject = "Badge";
                        break;
                    default:
                        badgeText = "";
                        subject = "Badge";
                        break;
                }
            }
            if (award != undefined) {
                switch (award) {
                    case 1:
                        awardText = "<img src='../../Images/gold-medal-recieved.png' width='114' height='60' />";
                        subject = "Medal";
                        break;
                    case 2:
                        awardText = "<img src='../../Images/silver-medal-recieved.png' width='114' height='60' />";
                        subject = "Medal";
                        break;
                    case 3:
                        awardText = "<img src='../../Images/bronze-medal-recieved.png' width='114' height='60' />";
                        subject = "Medal";
                        break;
                    default:
                        awardText = "";
                        subject = "Medal";
                        break;
                }
            }
            if (badge != undefined || award != undefined) {
                //subject = 'Appreciation';
                appreciationtext = " <div class='recieve'>" + badgeText + awardText + "</div>";
            } else {
                appreciationtext = " <div class='recieve' style='height:60px'></div>";
            }
            if (html.trim() != "") {
                subject = (subject == "") ? "Comments" : subject + " & Comments";
            }
            if (badge != undefined && award != undefined) {
                subject = "Medal and Badge";
            } else if (badge == undefined && award == undefined) {
                subject = "Appreciation from";
            }
            $('#subject').val(subject);

            $('#appreciation').val(appreciationtext);
            $('#comments').val(txtareavalText);

            var form = $('#PostComments');
            var formData = new FormData(form[0]);
            $.ajax({
                type: "POST",
                url: "/wall/SendAppreciationtoBoth",
                enctype: 'multipart/form-data',
                data: formData,
                success: function (data) {
                    if (data == "gettoken")
                        window.location.href("/yammer/getYammer");
                    else {
                        //$('.yammerpopupbg').hide();
                        //alert("Message Posted Successfully");
                        //$("#status").fadeOut();
                        //$("#preloader").delay(100).fadeOut("slow");
                    }
                },
                cache: false,
                contentType: false,
                processData: false
            });
            return false;
        }
    }
}