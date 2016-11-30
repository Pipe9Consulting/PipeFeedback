$(function () {
    $('.vs-context-menu').hide();
    $('.yammerpopupbg').fadeOut();
    $('#emailid').focus(function () {
        $(this).val('');
    });
    $('.vs-context-menu').mouseleave(function () {
        debugger;
        $(this).hide();
    });


    var sourceElement = null;
    (function ($) {
        jQuery.fn.vscontext = function (options) {
            var defaults = {
                menuBlock: null,
                offsetX: 8,
                offsetY: 8,
                speed: 'slow'
            };
            var options = $.extend(defaults, options);
            var menu_item = '.' + options.menuBlock;
            return this.each(function () {
                $(this).bind("contextmenu", function (e) {
                    $('#thelist1').find('.test3').each(function () {
                        //debugger;
                        var m = $(this).hasClass('commentsel');
                        if (m) {
                            $(this).removeClass('commentsel');
                        }
                    });
                    $(this).find('.test3').toggleClass("commentsel");
                    $(this).toggleClass("commentselval");
                    $('.postcmnt li span').removeClass("commentsel");
                    return false;
                });
                $(this).mousedown(function (e) {
                    var offsetX = e.pageX + options.offsetX;
                    var offsetY = e.pageY + options.offsetY;
                    if (e.button == "2") {
                        $(menu_item).show(options.speed);
                        $(menu_item).css('display', 'block');
                        $(menu_item).css('top', offsetY);
                        $(menu_item).css('left', offsetX);
                        $(this).find('.test3').removeClass("commentsel");
                        $(this).removeClass("commentselval");
                    } else if (e.button == "0") {
                        $(menu_item).hide(options.speed);
                        $(this).find('.test3').toggleClass("commentsel");
                        $(this).toggleClass("commentselval");
                    } else { $(menu_item).hide(options.speed); }
                });
            });
        };
    })(jQuery);

    $(document).ready(function () {
        $('.test2').vscontext({ menuBlock: 'vs-context-menu' });
    });
    //LI drag
    $(document).ready(function () {
        //set up width and height of draggable container according to view container and draggable size
        var dragContainerWidth = $("#viewContainer").innerWidth() + ($('#draggable').outerWidth() - $("#viewContainer").innerWidth()) * 2;
        var dragContainerHeight = $("#viewContainer").innerHeight() + ($('#draggable').outerHeight() - $("#viewContainer").innerHeight()) * 2;

        $("#draggableContainer").css("width", dragContainerWidth);
        $("#draggableContainer").css("height", dragContainerHeight);
    });
    ///End Right Click Menu////

    $('#postvmsgtile').click(function () {
    });
    $('#sa').click(function () {
    });
    $('#walltile').click(function () {
    });
    $('#startT').click(function () {
        $('#startT,#start').addClass('selected');
        $('#wallT,#wall,#networkT,#network,#poelibrary,#poeL,#feedbackT,#feedback,#standT,#stand,#syncT,#sync').removeClass('selected');
    });
    $('#wallT').click(function () {
        $('#wallT,#wall').addClass('selected');
        $('#startT,#start,#networkT,#network,#poelibrary,#poeL,#feedbackT,#feedback,#standT,#stand,#syncT,#sync').removeClass('selected');
    });
    $('#networkT').click(function () {
        $('#networkT,#network').addClass('selected');
        $('#startT,#start,#wallT,#wall,#poelibrary,#poeL,#feedbackT,#feedback,#standT,#stand,#syncT,#sync').removeClass('selected');
    });
    $('#poelibrary').click(function () {
        $('#poelibrary,#poeL').addClass('selected');
        $('#startT,#start,#wallT,#wall,#networkT,#network,#feedbackT,#feedback,#standT,#stand,#syncT,#sync').removeClass('selected');
    });
    $('#feedbackT').click(function () {
        $('#feedbackT,#feedback').addClass('selected');
        $('#startT,#start,#wallT,#wall,#networkT,#network,#poelibrary,#poeL,#standT,#stand,#syncT,#sync').removeClass('selected');
    });
    $('#standT').click(function () {
        $('#standT,#stand').addClass('selected');
        $('#startT,#start,#wallT,#wall,#networkT,#network,#poelibrary,#poeL,#feedbackT,#feedback,#syncT,#sync').removeClass('selected');
    });
    $('#syncT').click(function () {
        $('#syncT,#sync').addClass('selected');
        $('#startT,#start,#wallT,#wall,#networkT,#network,#poelibrary,#poeL,#feedbackT,#feedback,#standT,#stand').removeClass('selected');
    });

    $('#scroller li ul li').click(function () {
        $(this).toggleClass("commentsel");
    });
    $('.filter li').click(function () {
        $(this).addClass("selected");
        $(this).removeClass("commentsel");
    });

    $('.postcmnt li').click(function () {
        $(this).toggleClass("postsel");
    });
    if ($('.frame').size() > 1) {
        $('.slidebtn').show();
        $('.slidebtn .pagination').html("Page 1 of " + ($('.frame').size() == 0 ? 1 : $('.frame').size()));
    }
    else
        $('.slidebtn').hide();

    // previous button click event
    $('.slidebtn .prev').click(function () {
        var currentFrameIndex = parseInt($('#thelist1').attr('currentframeindex'));
        var currentFrame = $('.frame').eq(currentFrameIndex);
        var previousFrame = currentFrame.prev('.frame');
        if (previousFrame.size() > 0) {
            currentFrame.prev('.frame').animate({ 'margin-left': '0%' }, { duration: 1500 });
            $('#thelist1').attr('currentframeindex', currentFrameIndex - 1);
            $('.slidebtn .pagination').html("Page " + (parseInt(currentFrame.prev('.frame').index())) + " of " + ($('.frame').size() == 0 ? 1 : $('.frame').size()));
        }
    });
    $('.slidebtn .nxt').click(function () {
        var currentFrameIndex = parseInt($('#thelist1').attr('currentframeindex'));
        var currentFrame = $('.frame').eq(currentFrameIndex);
        if (currentFrame.next('.frame').size() > 0) {
            currentFrame.animate({ 'margin-left': currentFrame.width() * (currentFrameIndex + 1) * -1 }, { duration: 1500 });
            currentFrame.next('.frame').animate({ 'margin-left': '0%' }, { duration: 1500 });
            $('#thelist1').attr('currentframeindex', currentFrameIndex + 1);
            $('.slidebtn .pagination').html("Page " + (parseInt(currentFrame.next('.frame').index())) + " of " + ($('.frame').size() == 0 ? 1 : $('.frame').size()));
        }
    });

    $('.vs-context-menu li, .attach').click(function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        if (($(this).hasClass('rep'))) {
            $('.vs-context-menu').hide();
            //debugger;
            $('#replypopup,.poepopupbg').fadeIn("slow");
            sourceElement = $('.commentsel').parent();
            var form = $('#Formreply');
            $('#useridslist').val(sourceElement.attr('userid'));
            $('#usersubids').val(sourceElement.attr('subid'));
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
            //  form.find('input[name="batchid"]').val(sourceElement.attr('batchid'));
            $('#replypopup .poepopupcont').find('input[name="emailaddress"]').val(sourceElement.attr('email'));
            $('#replypopup .poepopupcont').find('.txtbx').attr('disabled', 'disabled');
        } else if (($(this).hasClass('repall'))) {
            $('.vs-context-menu').hide();
            $('#replypopup,.poepopupbg').fadeIn("slow");
            sourceElement = $('.commentsel').parent();
            var form = $('#Formreply');
            if (sourceElement.attr('batchid') != "") {
                $.ajax({
                    type: "GET",
                    url: "/wall/getuserlist?batchId=" + sourceElement.attr('batchid'),
                    success: function (data) {
                        var element = $('#replypopup .poepopupcont').find('input[name="emailaddress"]');

                        element.val('');
                        $('#useridslist').val('');
                        for (var index = 0; index < data.length; index++) {
                            element.val(element.val() + data[index].EmailID + ";");
                            $('#useridslist').val($('#useridslist').val() + data[index].For + ",");
                        }
                        $('#replypopup .poepopupcont').find('.txtbx').attr('disabled', 'disabled');
                        $("#status").fadeOut();
                        $("#preloader").delay(100).fadeOut("slow");
                        $('#usersubids').val(sourceElement.attr('subid'));
                    }
                });
            } else {
                $('#useridslist').val(sourceElement.attr('userid'));
                $('#usersubids').val(sourceElement.attr('subid'));
                //  form.find('input[name="batchid"]').val(sourceElement.attr('batchid'));
                $('#replypopup .poepopupcont').find('input[name="emailaddress"]').val(sourceElement.attr('email'));
                $('#replypopup .poepopupcont').find('.txtbx').attr('disabled', 'disabled');
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
            }
        }
        else if ($(this).hasClass('ymrpost')) {
            $('#syncYammerclick').val(0);
            // $('#syncYammerclick').val(1);
            LoadYammerGroupMemebers();
        } else if ($(this).hasClass('email')) {
            $('.vs-context-menu').hide();
            sourceElement = $('.commentsel').parent();
            var form = $('#Formreply');
            if (sourceElement.attr('batchid') != "") {
                $.ajax({
                    type: "GET",
                    url: "/wall/getuserlist?batchId=" + sourceElement.attr('batchid'),
                    success: function (data) {
                        for (var index = 0; index < data.length; index++) {
                            var mailto_link = "mailto:" + data[index].EmailID;
                            window.location.href = mailto_link;
                        }
                        $("#status").fadeOut();
                        $("#preloader").delay(100).fadeOut("slow");
                    }
                });
            } else {
                var mailto_link = "mailto:" + sourceElement.attr('email');

                window.location.href = mailto_link;
            }
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
        }
    });

    $('.close,.reply').click(function () {
        $('.poepopup,.poepopupbg,.cmntpopup,.wallgoal').fadeOut("slow");
    });
    $('#close,#Closeclick').click(function () {
        $('.poepopup,.poepopupbg,.popupW').fadeOut("slow");
        $('.yammerpopupbg').fadeOut();
        //   $f(0).close(); $f(0).unload();
        $('#scriptload').html("");
        $("#vidprev").html('');
    });
    $('#ShareGroupAndUser').live('click', function () {
        $('#groupsonly').val(0);
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        SaveYammerUser();
        //var clkevent = $('#syncYammerclick').val();
        //if (clkevent == 0) {
        //    yammerPost();
        //} else if (clkevent == 1) {
        //SyncyammerClick();
        //}
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
            SaveLoadGroupClick();
            //LoadGroupClick();
            //setTimeout(function () {
            //    LoadGroupClick();
            //}, 5000);
        } else {
            alert("Message Posted Successfully");
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
            //$('.yammerpopupbg').fadeOut();
        }
    });
    $('#ShareGroupOnly').live('click', function () {
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
            $('#groupsonly').val(1);
            //LoadGroupClick();
            SaveLoadGroupClick();
        } else {
            alert('Please select a group');
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
        }
    });
    $('#syncyammer').click(function () {
        // debugger;
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        $('#syncYammerclick').val(1);
        if ($('.commentsel').length == 0) {
            alert("Please select messages from Wall to Sync with Yammer");
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
        } else {
            LoadYammerGroupMemebers();
            //$('.yammerpopupbg').fadeIn("slow");
        }
    });

    $('.signupbtn').click(function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        var html = $('textarea').sceditor('instance').getBody()[0].innerHTML;
        var form = $('#Formreply');
        form.find('input[name="subject"]').val("Re:" + sourceElement.find('h2').html());
        form.find('input[name="comments"]').val(html.trim());
        var formData = new FormData(form[0]);
        $.ajax({
            type: "POST",
            url: form.attr('action'),
            enctype: 'multipart/form-data',
            data: formData,
            success: function (data) {
                $('#subject').val('');
                $('#useridslist').val('');
                $('#comments').val('');
                $('textarea').sceditor('instance').val('');
                $('#fileadded').html('');
                $('#replypopup .poepopupcont').find('input[name="emailaddress"]').val('');
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
                //alert('Message sent successfully');
            },
            cache: false,
            contentType: false,
            processData: false
        });
        return false;
    });

    $('.videosimg').live('click', function () {
        
        $('#scriptload').html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script>");
        $("#vidprev").html("<div class='player' href='" + $(this).data('href') + "'  style='display:block; width:480px; height:320px' ></div>");
        flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
            clip: {
                autoPlay: true,
                autoBuffering: true
            }
        });
        $('#videopopup,.poepopupbg').fadeIn("slow");
    });
    //    $('#syncyammer').live('click', function () {
    //        alert()
    //    });
});

function LoadYammerGroupMemebers() {
    Common.ajaxsync({
        url: '../Yammer/GetYammerGroupid',
        success: function (response) {
            debugger;
            //var html = "";
            //var html2 = "";
            //if (response != null && response.length <= 8) {
            //    for (var i = 0; i < response.length; i++) {
            //        html = html + " <li value=" + response[i].Groupid + "><span class=''> <img src='../../Images/yammer-select.png' /></span><div class='imgholder'> <img src='" + response[i].GroupImage + "' /> </div> <div class='conholder'> <h3> " + response[i].GroupName + "</h3> </div> </li>";
            //    }
            //    for (var i = response.length; i < 8; i++) {
            //        html = html + " <li class='noselectgroup'><span class=''> </span><div class='imgholder'> <img src='../../Images/icons/icon.png' /></div> <div class='conholder'> <h3> Yammer Group</h3> </div> </li>";
            //    }
            //} else
            //    if (response != null && response.length > 8) {
            //        for (var i = 0; i < response.length; i++) {
            //            html = html + " <li value=" + response[i].Groupid + "><span class=''> <img src='../../Images/yammer-select.png' /></span><div class='imgholder'> <img src='" + response[i].GroupImage + "' /> </div> <div class='conholder'> <h3> " + response[i].GroupName + "</h3> </div> </li>";
            //        }
            //        for (var j = 8; j < (response.length - 8) ; j++) {
            //            html2 = html2 + " <li value=" + response[i].Groupid + "><span class=''> <img src='../../Images/yammer-select.png' /></span><div class='imgholder'> <img src='" + response[i].GroupImage + "' /> </div> <div class='conholder'> <h3 " + response[i].GroupName + "</h3> </div> </li>";
            //        }
            //        $('.ynxt').click(function () {
            //            $(".yammerpopupcontholder .left").animate({ 'margin': '0 0 0 -107%' }, { duration: 1000 });
            //        });
            //        $('.yprev').click(function () {
            //            $(".yammerpopupcontholder .left").animate({ 'margin': '0' }, { duration: 1000 });
            //        });
            //    }

            //$('#yammerGrouplists1').html(html);
            //$('#yammerGrouplists2').html(html2);

            //New work
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
            alert("You can select only two groups at a time");
        }
    });
}

function LoadGroupClick() {
    var groupid = "";
    var groupname = "";

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
    //$('#yammerGrouplists1 li').each(function () {
    //    var selectedgroups = $(this)[0].className;
    //    if (selectedgroups == "selectgroupids") {
    //        groupid = $(this).val() + "%" + groupid;
    //        groupname = $(this).text() + "%" + groupname;
    //    }
    //});
    groupid = groupid.slice(0, -1);
    var syncClick = $('#syncYammerclick').val();
    if (syncClick != 1) {
        var imageurls = '';
        var dataelement = $('.commentselval')[0];
        var subject = $(dataelement).find('h2')[0].innerText;
        var text = $(dataelement).find('p')[0].innerText;
        var image = $(dataelement).find('.recieve').find('img').attr('src');
        var image1 = $(dataelement).find('.recieve').find('img').next('img').attr('src');
        if (image != undefined) {
            imageurls = image + '@';
            if (image1 != undefined)
                imageurls = imageurls + image1 + '@';
        }

        imageurls = imageurls.slice(0, -1);
        Common.ajax({
            url: '/Yammer/PostOnGroupWall',
            data: { 'text': text, 'subject': subject, 'imageurl': imageurls, 'groupid': groupid, 'groupName': groupname },
            success: function (response) {
                //$('.yammerpopupbg').fadeOut();
                alert("Message Posted Successfully");
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
                var k = $('#groupsonly').val();
                if (k == 1) {
                    //alert("Message Posted Successfully");
                    //$("#status").fadeOut();
                    //$("#preloader").delay(100).fadeOut("slow");
                }
                //alert("Message Posted Successfully");
            },
            error: function (err) {
                alert("Message Posted Successfully");
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
                //alert('Failed Updating Yammer');
            }
        });
    }
    else {
        var status = false;
        $('.commentselval').each(function () {
            var dataelement = $(this)[0];
            var find = $(this).parent()[0].innerHTML;
            var take = $(find).find('h2');
            var subject = $(dataelement).find('h2')[0].innerText;
            var text = $(dataelement).find('p')[0].innerText;
            var image = $(dataelement).find('.recieve').find('img').attr('src');
            var image1 = $(dataelement).find('.recieve').find('img').next('img').attr('src');
            if (image != undefined) {
                imageurls = image + '@';
                if (image1 != undefined)
                    imageurls = imageurls + image1;
            }
            //imageurls = imageurls.slice(0, -1);

            Common.ajax({
                url: '/Yammer/PostOnGroupWall',
                data: { 'text': text, 'subject': subject, 'imageurl': imageurls, 'groupid': groupid, 'groupName': groupname },
                success: function (response) {
                    //$('.yammerpopupbg').fadeOut();
                    alert("Message Posted Successfully");
                    //status = true;
                    $("#status").fadeOut();
                    $("#preloader").delay(100).fadeOut("slow");
                    var k = $('#groupsonly').val();
                    if (status == false && k == 1) {
                        //alert("Message Posted Successfully");
                        //status = true;
                        //$("#status").fadeOut();
                        //$("#preloader").delay(100).fadeOut("slow");
                    }
                },
                error: function (err) {
                    alert("Message Posted Successfully");
                    $("#status").fadeOut();
                    $("#preloader").delay(100).fadeOut("slow");
                    // alert('Failed Updating Yammer');
                }
            });
        });
        //if (sucess) {
        //    debugger;
        //alert("Message Posted Successfully");
        //}
    }
}

function yammerPost() {
    $('.vs-context-menu').hide();
    var imageurls = '';
    var dataelement = $('.commentselval')[0];
    var subject = $(dataelement).find('h2')[0].innerText;
    var text = $(dataelement).find('p')[0].innerText;
    var image = $(dataelement).find('.recieve').find('img').attr('src');
    var image1 = $(dataelement).find('.recieve').find('img').next('img').attr('src');
    if (image != undefined) {
        imageurls = image + '@';
        if (image1 != undefined)
            imageurls = imageurls + image1 + '@';
    }

    imageurls = imageurls.slice(0, -1);
    var s = { 'text': text, 'subject': subject, 'imageurl': imageurls };
    Common.ajaxPost({
        url: '/Yammer/PostOpenGraph',
        data: s,//{ 'text': text, 'subject': subject, 'imageurl': imageurls },
        success: function (response) {
            if (response == 'gettoken') {
                window.location = "/yammer/getyammer";
            } else {
                //alert("Message Posted Successfully");
            }
            //$("#status").fadeOut();
            //$("#preloader").delay(100).fadeOut("slow");
        },
        error: function (err) {
            // alert('Failed Updating Yammer');
        }
    });
}

function SyncyammerClick() {
    var count = 0;
    var imageurls = '';
    if ($('.commentsel').length == 0) {
        alert("Please select messages from Wall to Sync with Yammer");
    } else {
        $('#syncyammer').addClass('selected');
        $('#walltile').removeClass('selected');
    }
    var status = false;
    $('.commentselval').each(function () {
        count = count + 1;

        var dataelement = $(this)[0];
        var find = $(this).parent()[0].innerHTML;
        var take = $(find).find('h2');

        var subject = $(dataelement).find('h2')[0].innerText;
        var text = $(dataelement).find('p')[0].innerText;

        var image = $(dataelement).find('.recieve').find('img').attr('src');

        var image1 = $(dataelement).find('.recieve').find('img').next('img').attr('src');
        if (image != undefined) {
            imageurls = image + '@';
            if (image1 != undefined)
                imageurls = imageurls + image1 + '@';
        }
        imageurls = imageurls.slice(0, -1);

        Common.ajax({
            url: '/Yammer/PostOpenGraph',
            data: { 'text': text, 'subject': subject, 'imageurl': imageurls },
            success: function (response) {
                if (response == 'gettoken') {
                    window.location = "/yammer/getyammer";
                } else {
                    if (status == false) {
                        alert("Message Posted Successfully");
                        status = true;
                        //$("#status").fadeOut();
                        //$("#preloader").delay(100).fadeOut("slow");
                    }
                }
            },
            error: function (err) {
                //alert('Failed Updating Yammer');
            }
        });
    });
}
//Save Group Users
function SaveYammerUser() {
    var count = 0;
    var imageurls = '';
    if ($('.commentsel').length == 0) {
        alert("Please select messages from Wall to Sync with Yammer");
    } else {
        $('#syncyammer').addClass('selected');
        $('#walltile').removeClass('selected');
    }
    var status = false;
    $('.commentselval').each(function () {
        var dataelement = $(this)[0];
        var subject = $(dataelement).find('h2')[0].innerText;
        var text = $(dataelement).find('p')[0].innerText;
        var image = $(dataelement).find('.recieve').find('img').attr('src');
        var image1 = $(dataelement).find('.recieve').find('img').next('img').attr('src');
        if (image != undefined) {
            imageurls = image + '@';
            if (image1 != undefined)
                imageurls = imageurls + image1 + '@';
            imageurls = imageurls.slice(0, -1);
        } else {
            imageurls = null;
        }

        Common.ajax({
            url: '/Yammer/SaveYammerContent',
            data: { 'text': text, 'subject': subject, 'imageurl': imageurls },
            success: function (response) {
                if (status == false) {
                    //alert("Message Posted Successfully");
                    status = true;
                }
            },
            error: function (err) {
            }
        });
    });
}
function SaveLoadGroupClick() {
    var groupid = "";
    var groupname = "";
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
    //$('#yammerGrouplists1 li').each(function () {
    //    var selectedgroups = $(this)[0].className;
    //    if (selectedgroups == "selectgroupids") {
    //        groupid = $(this).val() + "%" + groupid;
    //        groupname = $(this).text() + "%" + groupname;
    //    }
    //});
    groupid = groupid.slice(0, -1);
    var syncClick = $('#syncYammerclick').val();
    if (syncClick != 1) {
        var imageurls = '';
        var dataelement = $('.commentselval')[0];
        var subject = $(dataelement).find('h2')[0].innerText;
        var text = $(dataelement).find('p')[0].innerText;
        var image = $(dataelement).find('.recieve').find('img').attr('src');
        var image1 = $(dataelement).find('.recieve').find('img').next('img').attr('src');
        if (image != undefined) {
            imageurls = image + '@';
            if (image1 != undefined)
                imageurls = imageurls + image1 + '@';
        }

        imageurls = imageurls.slice(0, -1);
        Common.ajax({
            url: '/Yammer/SaveYammerContentForGroup',
            data: { 'text': text, 'subject': subject, 'imageurl': imageurls, 'groupid': groupid, 'groupName': groupname },
            success: function (response) {
                //$('.yammerpopupbg').fadeOut();
                alert("Message Posted Successfully");
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
                var k = $('#groupsonly').val();
                if (k == 1) {
                    //alert("Message Posted Successfully");
                    //$("#status").fadeOut();
                    //$("#preloader").delay(100).fadeOut("slow");
                }
                //alert("Message Posted Successfully");
            },
            error: function (err) {
                alert("Message Posted Successfully");
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
                //alert('Failed Updating Yammer');
            }
        });
    }
    else {
        var status = false;
        $('.commentselval').each(function () {
            var dataelement = $(this)[0];
            var find = $(this).parent()[0].innerHTML;
            var take = $(find).find('h2');
            var subject = $(dataelement).find('h2')[0].innerText;
            var text = $(dataelement).find('p')[0].innerText;
            var image = $(dataelement).find('.recieve').find('img').attr('src');
            var image1 = $(dataelement).find('.recieve').find('img').next('img').attr('src');
            if (image != undefined) {
                imageurls = image + '@';
                if (image1 != undefined)
                    imageurls = imageurls + image1;
            } else {
                imageurls = null;
            }
            //imageurls = imageurls.slice(0, -1);

            Common.ajax({
                url: '/Yammer/SaveYammerContentForGroup',
                data: { 'text': text, 'subject': subject, 'imageurl': imageurls, 'groupid': groupid, 'groupName': groupname },
                success: function (response) {
                    //$('.yammerpopupbg').fadeOut();

                    var k = $('#groupsonly').val();
                    if (status == false && k == 1) {
                        //alert("Message Posted Successfully");
                        //status = true;
                        //$("#status").fadeOut();
                        //$("#preloader").delay(100).fadeOut("slow");
                    }
                },
                error: function (err) {
                    alert("Message Posted Successfully");
                    $("#status").fadeOut();
                    $("#preloader").delay(100).fadeOut("slow");
                    // alert('Failed Updating Yammer');
                }
            });
        });
        alert("Message Posted Successfully");
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
        //if (sucess) {
        //    debugger;
        //alert("Message Posted Successfully");
        //}
    }
}