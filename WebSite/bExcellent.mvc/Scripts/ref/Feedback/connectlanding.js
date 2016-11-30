$(document).ready(function () {
    $('.scroll4').slimScroll();
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $('.scroll1').slimScroll();
    connect.loadConnectText();
    connect.loadPoeName();
    connect.loadpoemodules();
    $('#RedirectToSync').click(function () {
        window.location = "../Standing/Standing";
        //Common.ajax({
        //    url: '/Feedback/GetConnectFbtyperesult',
        //    success: function (response) {
        //        if (response.group) {
        //            window.location = "../Standing/Standing";
        //            //window.location = "/Sync/Sync?poeid=" + response.PoeId + "&grpid=" + response.Grpid + "&ftype=" + response.fbtype + "";
        //        } else {
        //            window.location = "../Standing/Standing";
        //            //window.location = "/Sync/Sync?poeid=" + response.PoeId + "&fid=" + response.fbid + "&ftype=" + response.fbtype + "";
        //        }
        //    },
        //    error: function () {
        //    }
        //});
    });
    $('#poemodule li').live('click', function () {
        var control = $(this);
        connect.loadTopmmebers(parseInt(control.data("value")));
        $('#poemodule li').removeClass('selected');
        $(this).addClass('selected');
    });
    $('#target li').live('click', function () {
        var control = $(this);
        if (parseInt(control.attr('paPosition')) > 6) {
            var scrollToInt = $('.scroll4').sort(function (a, b) { return b.scrollHeight - a.scrollHeight; })[0].scrollHeight + 'px';
            $('.scroll4').slimscroll({ scrollTo: scrollToInt });
        } else {
            $('.scroll4').slimscroll({ scrollTo: '0px' });
        }
        connect.loadTopmmebers(parseInt(control.data("value")));
        $('#poemodule li').removeClass('selected');
        $('#li' + parseInt(control.data("value"))).addClass('selected');
    });
    $('.connect li').live('click', function () {
        if ($(this).find('.cnticon').length != 0) {
            $('.connect li').removeClass('selectmngr');
            $(this).addClass('selectmngr');
        }
    });
    $('#submitbtn').click(function () {
        var txtareavalText = $('textarea').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
        if (txtareavalText == "") {
            alert('Please Enter the Text');
            $('.vs-context-menu').show();
        } else {
            $('.vs-context-menu').hide("slow");
            connect.PostCommnet();
        }
    });
    var loadCss = function (callback) {
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
            style: "/Scripts/ref/editor/jquery.sceditor.default.min.css"
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
    loadCss(initEditor);
    $('.cnticonb').live('click', function () {
        var mailtoLink = "mailto:" + $(this).parent().parent().data('email');

        window.location.href = mailtoLink;
    });
    $("body").click(
              function (e) {
                  if ((e.target || e.srcElement).className !== "cnticon") {
                      $('.vs-context-menu').hide("slow");
                  }
              }
             );
});
var connect = {
    loadConnectText: function () {
        Common.ajax({
            url: '/Feedback/GetConnectText',
            success: function (response) {
                $('#connecttext').html(response);
                if (response != "Pathfinders")
                    $('#connectDescriptionText').empty().html('Send a Message to Team Members');
            },
            error: function () {
            }
        });
    },
    loadpoemodules: function () {
        Common.ajaxsync({
            url: '../../Feedback/GetPracticeArea',
            success: function (response) {
                var moduleResponseLength = response.length;
                var module = "";
                var connectPA = '';
                for (var i = 0; i < response.length; i++) {
                    if (response[i].ModuleOrderNumber > 0) {
                        var img = $('#selectedpoe').val() + response[i].ModuleOrderNumber;
                        module = module + "<li id ='li" + response[i].ModuleId + "' data-value=" + response[i].ModuleId + "  data-name=" + response[i].ModuleName + "   class='takesf " + ((response[i].ModuleOrderNumber == 1) ? 'selected' : '') + "'><p>" + response[i].ModuleName + "</p><img src='../../Images/icons/" + img + ".png' width='64' height='50'  class='img' />" + "</li>";

                        connectPA = connectPA + "<li id=lit" + response[i].ModuleOrderNumber + " data-value=" + response[i].ModuleId + " class='submenu' paPosition=" + i + "><a href='#'><span><img src='../../Images/icons/" + img + "-small.png' /></span><p>" + response[i].ModuleName + "</p></a></li>";
                    }
                }
                connect.loadTopmmebers(response[1].ModuleId);
                var practiceArea1 = (response.length < 7 ? (7 - response.length) : 0);
                if ((response.length - 1) <= 6) {
                    //$('#poemodule').parent('div').removeClass('scroll4');
                    $('#poemodule').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                    //$('#poemodule').parents('.slimScrollDiv').find('.slimScrollRail').remove();
                } else
                    $('.scroll4').slimScroll();
                for (var pa1 = 0; pa1 < practiceArea1; pa1++) {
                    module = module + "<li id ='li" + (moduleResponseLength + pa1) + "' data-value=''  data-name=''   class='takesf emptyTile'><p></p><img src='' width='64' height='50'  class='img' />" + "</li>";
                }

                $('#poemodule').html(module);
                $('#target ul').html(connectPA);
                setTimeout(function () {
                    alert("Congratulations, your Feedback has been completed successfully.");
                }, 2000);
            },
            error: function () {
            }
        });
    },
    loadPoeName: function () {
        Common.ajaxsync({
            url: "../../Common/GetPoeName",
            //  data: option.data,
            success: function (response) {
                $('#selectedpoe').val(response);
            },
            error: function () {
            }
        });
    },
    loadTopmmebers: function (moduleid) {
        $('.vs-context-menu').hide("slow");
        Common.ajaxsync({
            url: "/Feedback/FbCompletionConnect?moduleid=" + moduleid,
            success: function (response) {
                var html = '';
                if (response != null) {
                    var limit = (response.length < 8) ? response.length : 8;
                    for (var i = 0; i < limit; i++) {
                        html = html + "<li data-value=" + response[i].User.UserId + " data-email=" + response[i].User.EmailAddress + ">" +
                            "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' class='conimg' />" +
                            "<div class='connectdesc'>" +
                            "<p class='title'>" + response[i].User.FirstName + " " + response[i].User.LastName + "</p>" +
                            "<p class='usremailid'> " + response[i].User.EmailAddress + "</p>" +
                            "<p> " + response[i].JobTitle + "</p>" +
                            "<p> Country: " + response[i].User.Country.Name + "</p>" +
                            "</div>" +
                            "<div class='connectbtn'>" +
                            "<div class='cnticon'><img src='../Images/connect-icon.png' alt='Connect' />&nbsp;Connect</div>" +
                            "<div class='cnticonb'><img src='../Images/email-icon.png' alt='Email' />&nbsp;Email</div>" +
                            "</div>" +
                            "</li>";
                    }
                }
                if (response != null && (response.length != 0 && response.length < 8)) {
                    var balCount = 8 - response.length;
                    for (var j = 0; j < balCount; j++) {
                        html = html + "<li> <img src='../Images/you.png' width='61' height='61' alt='Connect' class='conimg' /> </li>";
                    }
                }
                if (response == null || response.length == 0) {
                    for (var k = 0; k < 8; k++) {
                        html = html + "<li> <img src='../Images/you.png' width='61' height='61' alt='Connect' class='conimg' /> </li>";
                    }
                }
                $('#userslist').html(html);
                //if (response.length <= 8) {
                if (response != null) {
                    $('#userslist').parents('.scroll1').removeClass('scroll1');
                    $('#userslist').parents('.slimScrollDiv').find('.slimScrollBar').remove();
                    $('#userslist').parents('.slimScrollDiv').find('.slimScrollRail').remove();
                }
                $('.cnticon').vscontext({ menuBlock: 'vs-context-menu' });
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
            },
            error: function () {
            }
        });
    },
    PostCommnet: function () {
        var selectedpoe = $('#poemodule .selected')[0].innerText;
        var userid = $('#userslist .selectmngr').data('value');
        var html = $('textarea').sceditor('instance').getBody()[0].innerHTML;
        $('#comments').val(html.trim());
        $('#subject').val("Comment regarding " + selectedpoe + " poe");
        $('#useridslist').val(userid);
        var form = $('#PostComments');
        var formData = new FormData(form[0]);
        $.ajax({
            type: "POST",
            url: form.attr('action'),
            enctype: 'multipart/form-data',
            data: formData,
            success: function () {
                alert("Message sent successfully");
                $('#subject').val('');
                $('#comments').val('');
                $('#selectedmembershdn').val('');
                $('#selectedmembersdiv').html('');
                $('textarea').sceditor('instance').val('');
            },
            error: function () {
            },
            cache: false,
            contentType: false,
            processData: false
        });
        return false;
    }
};

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
            $(this).bind("contextmenu", function () {
                return false;
            });
            $(this).mousedown(function (e) {
                var offsetX = e.pageX + options.offsetX;
                var offsetY = e.pageY + options.offsetY;
                if (e.button == "0") {
                    $(menu_item).show(options.speed);
                    $(menu_item).css('display', 'block');
                    $(menu_item).css('top', offsetY);
                    $(menu_item).css('left', offsetX);
                    $('.connect li').removeClass("selectmngr");
                } else {
                    $(menu_item).hide(options.speed);
                }
            });
        });
    };
})(jQuery);