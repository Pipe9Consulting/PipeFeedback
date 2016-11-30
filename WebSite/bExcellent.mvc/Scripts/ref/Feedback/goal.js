$(function () {
    $('.scroll1').slimScroll();
    $('.scroll2').slimScroll();
    $('.scroll6').slimScroll();
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $(".share").click(function () {
        $(this).toggleClass("selected");
    });
    $(".shareall").click(function () {
        $(this).addClass("selected");
    });
    $(".vs-context-menu li").live('click', function () {
        $('#' + ($('#selectedques').val())).data('assigned', $(this).data('value'));
        $(".vs-context-menu").hide();
        goal.validateSlideChange();
    });

    $(".close").click(function () {
        $(".popup, .poepopupbg").fadeOut("slow");
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
                    return false;
                });
                $(this).mousedown(function (e) {
                    $('#selectedques').val(e.target.parentElement.id);
                    var offsetX = e.pageX + options.offsetX;
                    var offsetY = e.pageY + options.offsetY;
                    if (e.button == "0") {
                        $(menu_item).show(options.speed);
                        $(menu_item).css('display', 'block');
                        $(menu_item).css('top', offsetY);
                        $(menu_item).css('left', offsetX);
                        $('.sharebtn').removeClass("selected");
                    } else {
                        $(menu_item).hide(options.speed);
                    }
                });
            });
        };
    })(jQuery);

    $(document).ready(function () {
        $('.sharebtn').vscontext({ menuBlock: 'vs-context-menu' });
        $('.indexrightclose').live('click', function () {
            $(".indexrightclose, .indexclose").hide();
            $(".indexrightarrow ,.indexrightclose1").show();
            $(".indexright").animate({ right: "0" }, 500);
        });
        $('.indexrightclose1').live('click', function () {
            $(this).hide();
            $(".indexrightclose").show();
            $(".indexright").animate({ right: "-24.5%" }, 500);
        });
        $(document).click(function (event) {
            if ($(event.target).parents().index($('.indexright')) == -1) {
                if ($('.indexright').is(":visible")) {
                    $(".indexright").animate({ right: "-24.5%" }, 500);
                    $(".indexrightclose").show();
                }
            }
        });
    });
    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
});