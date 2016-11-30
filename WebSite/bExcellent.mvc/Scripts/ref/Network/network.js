//Network Page

//End of Network page

$(function () {
    $('#yammerselectedlistspoe').draggable();
    $('#errpopup').draggable();
    $("#dragassignpoe").draggable();
    $('.scroll1').slimScroll();
    $('#emailid').focus(function () {
        $(this).val('');
    });
    $('.network li').click(function () {
        $(this).toggleClass('selectmngr');
    });
    $('.sendinv li').click(function () {
        $(".addmember").attr('id', '0');
        $(".sendinv").hide();
        $(".addmember").css('background-image', 'url(../../Images/select-arrow.gif)');
    });

    hidingul();
});

function hidingul() {
    $('#secondpage').hide();
}

$(document).ready(function () {
    $(".addmember").click(function () {
        var X = $(this).attr('id');

        if (X == 1) {
            $(".sendinv").hide();
            $(this).attr('id', '0');
            $(this).css('background', '');
        }
        else {
            $(".sendinv").show();
            $(this).attr('id', '1');
            $(this).css('background-image', 'url(/Images/select-arrow-up.png)');
        }
    });

    //Mouseup textarea false
    $(".sendinv").mouseup(function () {
        return false;
    });
    $(".addmember").mouseup(function () {
        return false;
    });

    //Textarea without editing.
    $(document).mouseup(function () {
        $(".sendinv").hide();
        $(".addmember").attr('id', '');
    });
});
$(document).ready(function () {
    $('.close').click(function () {
        $('#networkpopup,.poepopupbg,.vs-context-menu').fadeOut("slow");
    });

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
                    //$(this).addClass("selectmngr");
                    return false;
                });
                $(this).mousedown(function (e) {
                    var offsetX = e.pageX + options.offsetX;
                    var offsetY = e.pageY + options.offsetY;
                    if (e.button == "0") {
                        $(menu_item).show(options.speed);
                        $(menu_item).css('display', 'block');
                        $(menu_item).css('top', offsetY-70);
                        $(menu_item).css('left', offsetX);
                        $('.listwrapper li').removeClass("selectmngr");
                    } else {
                        $(menu_item).hide(options.speed);
                    }
                });
            });
        };
    })(jQuery);

    $(document).ready(function () {
        $('.listwrapper li').vscontext({ menuBlock: 'vs-context-menu' });
    });
    //LI drag
    $(document).ready(function () {
        //set up width and height of draggable container according to view container and draggable size
        var dragContainerWidth = $("#viewContainer").innerWidth() + ($('#draggable').outerWidth() - $("#viewContainer").innerWidth()) * 1;
        var dragContainerHeight = $("#viewContainer").innerHeight() + ($('#draggable').outerHeight() - $("#viewContainer").innerHeight()) * 1;

        $("#draggableContainer").css("width", dragContainerWidth);
        $("#draggableContainer").css("height", dragContainerHeight);
    });
});