/*var myScroll,
myScroll2,
myScroll3;
function loaded() {
    myScroll = new iScroll('wrapper', {
        snap: true,
        momentum: false,
        hScrollbar: false,
        onScrollEnd: function () {
            document.querySelector('#indicator > li.current').className = '';
            document.querySelector('#indicator > li:nth-child(' + (this.currPageX + 1) + ')').className = 'current';
        }
    });
}
document.addEventListener('DOMContentLoaded', loaded, false);*/
// Page Carousel//
var showfirstarrow = 0;
var showsecondarrow = 0;
var openorclose = 0;
var openorcloseSnap2 = 0;

$(function () {
    (function ($) {
        $.fn.autowidth = function () {
            return this.each(function () {
                $('.fbholder ul', this).css({ 'width': (100 / $('.', this).length) + '%' });
            });
        };
    })(jQuery);
    $('.fbholder > ul').autowidth();
    $("body").click
    (
      function (e) {
          if ((e.target || e.srcElement).id !== "slideout"
          && (e.target || e.srcElement).id !== "poeintrodiv"
          && (e.target || e.srcElement).id !== "maincontent"
          && (e.target || e.srcElement).id !== "clickmodele1"
          && (e.target || e.srcElement).id !== "clickmodele2"
          && (e.target || e.srcElement).id !== "clickmodele1hide"
          && (e.target || e.srcElement).id !== "clickmodele2hide"
          && (e.target || e.srcElement).id !== "snap2"
          && (e.target || e.srcElement).id !== "snap3"
          && (e.target || e.srcElement).id !== "left"
          && (e.target || e.srcElement).id !== "right"
          && (e.target || e.srcElement).localName !== "img"
           && (e.target || e.srcElement).id !== "submitbtn"
           && (e.target || e.srcElement).className !== "slidecontentselect"
          && (e.target || e.srcElement).className !== "spanname"
          && (e.target || e.srcElement).className !== "slidecontent1"
           && (e.target || e.srcElement).className !== "sceditor-group") {
              if ($('#navigation>li>a.selected').length > 0) {
                  $('#navigation>li>a.selected').removeClass('selected');
                  $('#navigation>li>a').first().addClass('selected');
              }

              if (openorclose == 1) {
                  $(".slideout").animate({ left: '-18.8%' }, { queue: false, duration: 500 });
                  $(".slideout2").animate({ left: '-18.8%' }, { queue: false, duration: 500 });
                  //$(".slideout1").animate({ right: '-18.6%' }, { queue: false, duration: 500 });
                  $('#clickmodele2hide').hide();
                  $('#clickmodele1hide').hide();
                  $('#clickmodele2,#clickmodele1,#snap2,#snap3').hide();

                  openorclose = 0;
                  return;
              } else if (openorcloseSnap2 == 1) {
                  $(".slideout1").animate({ right: '-18.8%' }, { queue: false, duration: 500 });
                  $(".slideout3").animate({ left: '-18.8%' }, { queue: false, duration: 500 });
                  openorcloseSnap2 = 0;
              }
          }
      }
    );
    hidingul();
    $('#emailid').focus(function () {
        $(this).val('');
    });
    $('#btnclkpage').click(function () {
        $('#firstpage').hide();
        $('#thirdpage').hide();
        $('#thirdpagea').hide();
        $('#secondpage').show();
    });
    $("#navigation li a").click(function () {
        $(".nav8").removeClass('selected');
    });
    ///
    /*Poe Intro*/
    $('.nav1').click(function () {
        if (showfirstarrow == 1)
            $('#clickmodele1').show("slow");
        $('#snap2').hide();
        $('#snap3').hide();
        $('#clickmodele1hide').hide();
        $('#clickmodele2hide').hide();
    });
    $('.nav1, .nav1 img').hover(function () {
        $('.FI').show();
    });
    $('.nav1').mouseout(function () {
        $('.FI').hide();
    });

    /*Module  Intro*/
    $('.nav2').click(function () {
        if (showfirstarrow == 1)
            $('#clickmodele1').show("slow");
        $('#snap2').hide();
        $('#snap3').hide();
        $('#clickmodele1hide').hide();
        $('#clickmodele2hide').hide();
    });
    $('.nav2, .nav2 img').hover(function () {
        $('.MI').show();
    });
    $('.nav2').mouseout(function () {
        $('.MI').hide();
    });

    /*Traits  Intro*/
    $('.nav3').click(function () {
        if (showfirstarrow == 1)
            $('#clickmodele1').show("slow");
        $('#snap2').hide();
        $('#snap3').hide();
        $('#clickmodele1hide').hide();
        $('#clickmodele2hide').hide();
    });
    $('.nav3, .nav3 img').hover(function () {
        $('.trait').show();
    });
    $('.nav3').mouseout(function () {
        $('.trait').hide();
    });

    /*KeyAction  Intro*/
    $('.nav4').click(function () {
        if (showfirstarrow == 1)
            $('#clickmodele1').show("slow");
        $('#snap2').hide();
        $('#snap3').hide();
        $('#clickmodele1hide').hide();
        $('#clickmodele2hide').hide();
    });
    $('.nav4, .nav4 img').hover(function () {
        $('.kact').show();
    });
    $('.nav7, .nav7 img').hover(function () {
        $('.donts').show();
    });
    $('.nav7').mouseout(function () {
        $('.donts').hide();
    });
    $('.nav4').mouseout(function () {
        $('.kact').hide();
    });
    $('.nav6, .nav6 img').hover(function () {
        $('.fqtooltip').show();
    });
    $('.nav6').mouseout(function () {
        $('.fqtooltip').hide();
    });
    $('.nav8, .nav8 img').hover(function () {
        $('.connekt').show();
    });
    $('.nav8').mouseout(function () {
        $('.connekt').hide();
    });
    $(".nav8").click(function () {
        $("#navigation li a").removeClass('selected');
        $(this).addClass("selected");
        $("#right").click();
        //        $(".slideout1").animate({ right: '0' }, { queue: false, duration: 500 });
        //        $(".slideout").animate({ left: '-18.8%' }, { queue: false, duration: 500 });
        //        $(".slideout").css('left', '-18.8% !important');
    });

    /*KeyAction  Intro*/
    $('.nav5').click(function () {
        if (showfirstarrow == 1)
            $('#clickmodele1').show("slow");
        $('#snap2').hide();
        $('#snap3').hide();
        $('#clickmodele1hide').hide();
        $('#clickmodele2hide').hide();
    });
    $('.nav5, .nav5 img').hover(function () {
        $('.det').show();
    });
    $('.nav5').mouseout(function () {
        $('.det').hide();
    });
    $('.nav6').click(function () {
        if (showfirstarrow == 1)
            $('#clickmodele1').show("slow");
        $('#snap2').hide();
        $('#snap3').hide();
        $('#clickmodele1hide').hide();
        $('#clickmodele2hide').hide();
    });
    $('.nav6, .nav6 img').hover(function () {
        $('.fqtooltip').show();
    });
    $('.nav6').mouseout(function () {
        $('.fqtooltip').hide();
    });

    $('.nav7').click(function () {
        if (showfirstarrow == 1)
            $('#clickmodele1').show("slow");
        $('#snap2').hide();
        $('#snap3').hide();
        $('#clickmodele1hide').hide();
        $('#clickmodele2hide').hide();
    });
    /*First Arrow Open Click*/
    $('#clickmodele1').click(function () {
        $('#snap2').show("slow");
        //  debugger;
        $('#clickmodele1hide').show("slow");
        if (showsecondarrow == 1) {
            $('#clickmodele2').show("slow");
        }
    });
    /*First Arrow Close Click*/
    $('#clickmodele1hide').click(function () {
        $('#snap2').hide();
        $('#snap3').hide();
        $('#clickmodele1hide').hide();
        $('#clickmodele2hide').hide();
        $('#clickmodele2').hide();
    });

    /*Second Arrow Close Click*/
    $('#clickmodele2hide').click(function () {
        $('#snap3').hide();
        $('#clickmodele2hide').hide();
        $('#clickmodele2').show();
    });
    /*Second Arrow Open Click*/
    $('#clickmodele2').click(function () {
        $('#snap3').show("slow");
        $('#clickmodele2hide').show();
    });
    $("#right").click(function () {
        if (openorcloseSnap2 == 0) {
            $(this).parent().animate({ right: '0px' }, { queue: false, duration: 500 });
            openorcloseSnap2 = 1;
        } else {
            $(this).parent().animate({ right: '-18.8%' }, { queue: false, duration: 500 });
            openorcloseSnap2 = 0;
        }
    });
    /*Snap View Toggle*/
    $('#left').click(function () {
        // alert(openorclose);
        if (openorclose == 1) {
            $(".slideout").animate({ left: '-18.8%' }, { queue: false, duration: 500 });
            $(".slideout2").animate({ left: '-24%' }, { queue: false, duration: 500 });
            $('#clickmodele2hide').hide();
            $('#clickmodele1hide').hide();
            $('#clickmodele2').hide();
            $('#clickmodele1').hide();
            openorclose = 0;
            return;
        }
        if (openorclose == 0) {
            $(".nav1").removeClass('selected');
            $(".nav2").removeClass('selected');
            $(".nav3").addClass('selected');
            $(".nav4").removeClass('selected');
            $(".nav5").removeClass('selected');

            $(".slideout").animate({ left: '0px' }, { queue: false, duration: 500 });
            $(".slideout2").animate({ left: '0px' }, { queue: false, duration: 500 });
            $('#clickmodele2hide').hide();
            $('#clickmodele1hide').hide();

            var newContent1 = '<h2>Traits</h2><div class="content3" id="poetraits">' + $('#traits0').html() + '</div>';
            // alert(newContent1);
            ////////////////
            var $ajaxcontent = $('#ajax-content'),
        animDur = 500, // animation duration
        isTransitionRunning = false;
            var contentWidth = $ajaxcontent.width(),
            $newItem = $(document.createElement('div')), // nested container for new content
            newItemHeight,
            newContentHeight,
            $oldItem = $ajaxcontent.children('.item-container');
            isTransitionRunning = true;

            $newItem.addClass('item-container');

            $('html, body').animate('slow');
            //  $navlinks.removeClass('selected');
            //$(this).addClass('selected');
            $ajaxcontent.height($ajaxcontent.height());
            $ajaxcontent.css('overflow', 'hidden');
            if ($oldItem.length) {
                $oldItem
                .width(contentWidth)
                .css('position', 'absolute')
                .animate({
                    left: -contentWidth // move new content at the right edge of container
                },
                animDur,
                function () {
                    $oldItem.remove();
                });
            }

            // append new content to container
            $newItem.html(newContent1);
            $ajaxcontent.append($newItem);
            // fix new content width
            $newItem.width(contentWidth);
            // determine height of new content when it's appended to DOM
            newItemHeight = $newItem.height();

            // set up new content
            $newItem
            // move it to the right
            .css('position', 'absolute')
            .css('left', $ajaxcontent.width() + 'px')
            // sliding animation
            .animate({
                left: 0
            },
            animDur,
            function () {
                // restore css
                $newItem.css('position', 'static');
                $newItem.css('width', 'auto');
            });

            // change ajax container height
            $ajaxcontent.animate({
                height: newItemHeight
            },
        animDur,
        function () {
            // now let ajax container naturally wrap around its content
            $ajaxcontent.css('height', 'auto');
            $ajaxcontent.css('overflow', 'auto');

            // unset the transition running flag
            isTransitionRunning = false;
        });
            ///////////////
            $('#poeintrodiv').html($(newContent1).html());

            if ($('#poeintroslidecount').html() > 0) {
                showfirstarrow = 1;
                $('#snap2').html($('#poeintro1').html());
            }

            if ($('#poeintroslidecount').html() > 1) {
                showsecondarrow = 1;
                $('#snap3').html($('#poeintro2').html());
            }
            //alert(showfirstarrow);
            if (showfirstarrow == 1)
                //$('#clickmodele1').show("slow");
                openorclose = 1;
            return;
        }
    });

    ///

    $('#wrapper').mouseover(function () {
        $('#target').hide("fast");
    });
    $('#bn1').click(function () {
        $('#q1').hide("slow");
        $('#p2').show();
        $('#q2').animate({ 'left': '-14%' }, { duration: 1000 });
    });
    $('#bn2').click(function () {
        $('#q2').hide("slow");
        $('#p3').show();
        $('#q3').animate({ 'left': '-14%' }, { duration: 400 });
    });
    $('#bn3').click(function () {
        $('#q3').hide("slow");
        $('#p4').show();
        $('#q4').animate({ 'left': '-14%' }, { duration: 400 });
    });
    $('#bn4').click(function () {
        $('#q4').hide("slow");
        $('#p5').show();
        $('#q5').animate({ 'left': '-14%' }, { duration: 400 });
    });
    $('#bn3').click(function () {
        $('#q3').hide("slow");
        $('#q4').animate({ 'left': '-14%' }, { duration: 400 });
    });
    $('#bn4').click(function () {
        $('#q4').hide("slow");
        $('#q5').animate({ 'left': '-14%' }, { duration: 400 });
    });
    $('#p2').click(function () {
        $('#p2').hide();
        $('#q1').show("slow");
        $('#q1').animate({ 'left': '14%' }, { duration: 400 });
    });
    $('#p3').click(function () {
        $('#p3').hide();
        $('#q2').show("slow");
        $('#q2').animate({ 'left': '14%' }, { duration: 400 });
    });
    $('#p4').click(function () {
        $('#p4').hide();
        $('#q3').show("slow");
        $('#q4').animate({ 'left': '14%' }, { duration: 400 });
    });
    $('#p5').click(function () {
        $('#p5').hide();
        $('#q4').show("slow");
        $('#q4').animate({ 'left': '14%' }, { duration: 400 });
    });

    $('#takeTile').click(function () {
        $(this).css('background', '#e0b001');
        $('#takeFB').show();
        $('#receiveFB').hide();
        $('#receiveTile').css('background', '#808080');
    });
    $('#receiveTile').click(function () {
        $(this).css('background', '#e0b001');
        $('#receiveFB').show();
        $('#takeFB').hide();
        $('#takeTile').css('background', '#808080');
    });
    /* $('#navigation li a').click(function () {
    openorclose = 1;
    $('.slideout').show({ 'left': '0px' });
    $('.slideout').animate({ 'left': '0px' }, { duration: 400 });
    });*/
    //Feedback Landing Pages//
    /*
    $('#nxtf1').click(function () {
    $('#fbcont1').animate({ 'margin-left': '-100%' }, { duration: 400 });
    $("#nxtf1,#nxtf3,#prevf2,#prevf3").hide();
    $('#prevf1,#nxtf2').show();
    });
    $('#nxtf2').click(function () {
    $('#fbcont2').animate({ 'margin-left': '-100%' }, { duration: 400 });
    $("#nxtf1,#nxtf2,#prevf1,#prevf3").hide();
    $('#prevf2,#nxtf3').show();
    });
    $('#prevf1').click(function () {
    $('#fbcont1').animate({ 'margin-left': '0%' }, { duration: 400 });
    $("#nxtf2,#nxtf3,#prevf2,#prevf3,#prevf1").hide();
    $('#nxtf1').show();
    });
    $('#prevf2').click(function () {
    $('#fbcont2').animate({ 'margin-left': '0%' }, { duration: 400 });
    $("#nxtf1,#nxtf3,#prevf2,#prevf3").hide();
    $('#prevf1,#nxtf2').show();
    });
    */
});
function hidingul() {
    $('#clickmodele1,#fbh2,#fbh3,#fbh4,#fbh5,#fbh6,#fbh1,#fbh8').hide();
    $('#clickmodele2').hide();
    $('#clickmodele1hide').hide();
    $('#clickmodele2hide').hide();
    $('#module2').hide();
    $('#module3').hide();
    $('#p2').hide();
    $('#p3').hide();
    $('#p4').hide();
    $('#p5').hide();
    $('.kact').hide();
    $('.trait').hide();
    $('.FI').hide();
    $('.MI,#nxtf2,#nxtf3').hide();
    $('#fbh2,#fbh3,#fbh4,#fbh5,#fbh6,#fbh7,#fbh8').hide();
    $('#fbh1').show();
}

//Highlight Tiles//
//$(document).ready(function () {
//    $('#wrapper .customertiles ul li').click(function () {
//        $('#wrapper .customertiles ul li').css('background-color', '');
//        $('#thirdpage ul li').css('color', '#808080');
//        $('#thirdpagea ul li').css('color', '#808080');
//        $(this).css('background-color', '#e0b001');
//        $(this).data("bgColor", "#e0b001");
//        $('#side' + $(this).attr("id")).css('background-color', '#e0b001');
//        $('#side' + $(this).attr("id")).css('color', '#fff');
//        return false;
//    });
//});

//Flip Div//
//$(document).on("mouseover", ".flipbox-forward", function (e) {
//    e.preventDefault();
//    var $this = $(this);
//    $this.flip({
//        direction: $this.data("direction"),
//        color: $this.data("color"),
//        content: $this.data("title"),
//        onBefore: function () {
//            $this.removeClass('flipbox-forward');
//            $this.addClass('flipbox-revert');
//        }
//    })
//});

$(document).on("mouseover", ".flipbox-revert", function (e) {
    e.preventDefault();
    var $this = $(this);
    $this.revertFlip();
    $this.removeClass('flipbox-revert');
    $this.addClass('flipbox-forward');
});

(function ($) {
    function int_prop(fx) {
        fx.elem.style[fx.prop] = parseInt(fx.now, 10) + fx.unit;
    }

    var throwError = function (message) {
        throw ({ name: "jquery.flip.js plugin error", message: message });
    };

    var isIE6orOlder = function () {
        return (/*@cc_on!@*/false && (typeof document.body.style.maxHeight === "undefined"));
    };
    var colors = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    };

    var acceptHexColor = function (color) {
        if (color && color.indexOf("#") == -1 && color.indexOf("(") == -1) {
            return "rgb(" + colors[color].toString() + ")";
        } else {
            return color;
        }
    };

    $.extend($.fx.step, {
        borderTopWidth: int_prop,
        borderBottomWidth: int_prop,
        borderLeftWidth: int_prop,
        borderRightWidth: int_prop
    });

    $.fn.revertFlip = function () {
        return this.each(function () {
            var $this = $(this);
            $this.flip($this.data('flipRevertedSettings'));
        });
    };

    $.fn.flip = function (settings) {
        return this.each(function () {
            var $this = $(this), flipObj, $clone, dirOption, dirOptions, newContent, ie6 = isIE6orOlder();

            if ($this.data('flipLock')) {
                return false;
            }

            var revertedSettings = {
                direction: (function (direction) {
                    switch (direction) {
                        case "tb":
                            return "bt";
                        case "bt":
                            return "tb";
                        case "lr":
                            return "rl";
                        case "rl":
                            return "lr";
                        default:
                            return "bt";
                    }
                })(settings.direction),
                bgColor: acceptHexColor(settings.color) || "#999",
                color: acceptHexColor(settings.bgColor) || $this.css("background-color"),
                content: $this.html(),
                speed: settings.speed || 500,
                onBefore: settings.onBefore || function () { },
                onEnd: settings.onEnd || function () { },
                onAnimation: settings.onAnimation || function () { }
            };

            $this
			.data('flipRevertedSettings', revertedSettings)
			.data('flipLock', 1)
			.data('flipSettings', revertedSettings);

            flipObj = {
                width: $this.width(),
                height: $this.height(),
                bgColor: acceptHexColor(settings.bgColor) || $this.css("background-color"),
                fontSize: $this.css("font-size") || "12px",
                direction: settings.direction || "tb",
                toColor: acceptHexColor(settings.color) || "#999",
                speed: settings.speed || 500,
                top: $this.offset().top,
                left: $this.offset().left,
                target: settings.content || null,
                transparent: "transparent",
                dontChangeColor: settings.dontChangeColor || false,
                onBefore: settings.onBefore || function () { },
                onEnd: settings.onEnd || function () { },
                onAnimation: settings.onAnimation || function () { }
            };

            // This is the first part of a trick to support
            // transparent borders using chroma filter for IE6
            // The color below is arbitrary, lets just hope it is not used in the animation
            ie6 && (flipObj.transparent = "#123456");

            $clone = $this.css("visibility", "hidden")
            .clone(true)
			.data('flipLock', 1)
            .appendTo("body")
            .html("")
            .css({ visibility: "visible", position: "absolute", left: flipObj.left, top: flipObj.top, margin: 0, zIndex: 9999, "-webkit-box-shadow": "0px 0px 0px #000", "-moz-box-shadow": "0px 0px 0px #000" });

            var defaultStart = function () {
                return {
                    backgroundColor: flipObj.transparent,
                    fontSize: 0,
                    lineHeight: 0,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderBottomWidth: 0,
                    borderTopColor: flipObj.transparent,
                    borderBottomColor: flipObj.transparent,
                    borderLeftColor: flipObj.transparent,
                    borderRightColor: flipObj.transparent,
                    background: "none",
                    borderStyle: 'solid',
                    height: 0,
                    width: 0
                };
            };
            var defaultHorizontal = function () {
                var waist = (flipObj.height / 100) * 25;
                var start = defaultStart();
                start.width = flipObj.width;
                return {
                    "start": start,
                    "first": {
                        borderTopWidth: 0,
                        borderLeftWidth: waist,
                        borderRightWidth: waist,
                        borderBottomWidth: 0,
                        borderTopColor: '#999',
                        borderBottomColor: '#999',
                        top: (flipObj.top + (flipObj.height / 2)),
                        left: (flipObj.left - waist)
                    },
                    "second": {
                        borderBottomWidth: 0,
                        borderTopWidth: 0,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        borderTopColor: flipObj.transparent,
                        borderBottomColor: flipObj.transparent,
                        top: flipObj.top,
                        left: flipObj.left
                    }
                };
            };
            var defaultVertical = function () {
                var waist = (flipObj.height / 100) * 25;
                var start = defaultStart();
                start.height = flipObj.height;
                return {
                    "start": start,
                    "first": {
                        borderTopWidth: waist,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        borderBottomWidth: waist,
                        borderLeftColor: '#999',
                        borderRightColor: '#999',
                        top: flipObj.top - waist,
                        left: flipObj.left + (flipObj.width / 2)
                    },
                    "second": {
                        borderTopWidth: 0,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        borderBottomWidth: 0,
                        borderLeftColor: flipObj.transparent,
                        borderRightColor: flipObj.transparent,
                        top: flipObj.top,
                        left: flipObj.left
                    }
                };
            };

            dirOptions = {
                "tb": function () {
                    var d = defaultHorizontal();
                    d.start.borderTopWidth = flipObj.height;
                    d.start.borderTopColor = flipObj.bgColor;
                    d.second.borderBottomWidth = flipObj.height;
                    d.second.borderBottomColor = flipObj.toColor;
                    return d;
                },
                "bt": function () {
                    var d = defaultHorizontal();
                    d.start.borderBottomWidth = flipObj.height;
                    d.start.borderBottomColor = flipObj.bgColor;
                    d.second.borderTopWidth = flipObj.height;
                    d.second.borderTopColor = flipObj.toColor;
                    return d;
                },
                "lr": function () {
                    var d = defaultVertical();
                    d.start.borderLeftWidth = flipObj.width;
                    d.start.borderLeftColor = flipObj.bgColor;
                    d.second.borderRightWidth = flipObj.width;
                    d.second.borderRightColor = flipObj.toColor;
                    return d;
                },
                "rl": function () {
                    var d = defaultVertical();
                    d.start.borderRightWidth = flipObj.width;
                    d.start.borderRightColor = flipObj.bgColor;
                    d.second.borderLeftWidth = flipObj.width;
                    d.second.borderLeftColor = flipObj.toColor;
                    return d;
                }
            };

            dirOption = dirOptions[flipObj.direction]();

            // Second part of IE6 transparency trick.
            ie6 && (dirOption.start.filter = "chroma(color=" + flipObj.transparent + ")");

            newContent = function () {
                var target = flipObj.target;
                return target && target.jquery ? target.html() : target;
            };

            $clone.queue(function () {
                flipObj.onBefore($clone, $this);
                $clone.html('').css(dirOption.start);
                $clone.dequeue();
            });

            $clone.animate(dirOption.first, flipObj.speed);

            $clone.queue(function () {
                flipObj.onAnimation($clone, $this);
                $clone.dequeue();
            });
            $clone.animate(dirOption.second, flipObj.speed);

            $clone.queue(function () {
                if (!flipObj.dontChangeColor) {
                    $this.css({ backgroundColor: flipObj.toColor });
                }
                $this.css({ visibility: "visible" });

                var nC = newContent();
                if (nC) { $this.html(nC); }
                $clone.remove();
                flipObj.onEnd($clone, $this);
                $this.removeData('flipLock');
                $clone.dequeue();
            });
        });
    };
})(jQuery);

$(document).ready(function () {
    var $navlinks = $('#navigation li a'),
        $ajaxcontent = $('#ajax-content'),
        animDur = 500, // animation duration
        isTransitionRunning = false;
        

    $navlinks.click(function (e) {

        if (!$(this).hasClass('standingNav4')) {
            $(".slideout").animate({ left: '0px' }, { queue: false, duration: 500 });
            openorclose = 1;
            showfirstarrow = 0;
            showsecondarrow = 0;
            $('#clickmodele1hide').hide();
            $('#clickmodele2hide').hide();
            $('#clickmodele1').hide();
            $('#clickmodele2').hide();
            $('.standingNav3').removeClass('selected');
            ///
            $(".slideout1").animate({ right: '-24%' }, { queue: false, duration: 500 });
            if ($(this).attr('class').indexOf('nav1') != -1) {
                // alert($('#poeintro0').html());
                newContent = '<h2>Feedback Introduction</h2><div class="content1" id="maincontent">' + $('#poeintro0').html() + '</div>';

                if ($('#poeintroslidecount').html() > 0) {
                    showfirstarrow = 1;
                    $('#snap2').html($('#poeintro1').html());
                }
                if ($('#poeintroslidecount').html() > 1) {
                    showsecondarrow = 1;
                    $('#snap3').html($('#poeintro2').html());
                }
            }
            
            if ($(this).attr('class').indexOf('nav2') != -1) {
                var moduleName = '';
                var imgSrc = '';
                if ($('#quickviewli >li').length > 0) {
                    $('#quickviewli >li').each(function () {
                        if ($(this).css('display') != 'none') {
                            moduleName = $(this).find('.customertiles>ul>li.selected').find('p').html();
                            imgSrc = $(this).find('.customertiles>ul>li.selected').find('img').attr('src');
                            return false;
                        }
                    });
                } else {
                    moduleName = $('#poemodule>li.selected').find('p').html();
                    imgSrc = $('#poemodule>li.selected').find('img').attr('src');
                }
                newContent = '<div class="poeheaderArea"><h2>' + moduleName + '</h2><span class="poeheaderIcon"> <img src="' + imgSrc + '"></span></div><div class="content2" id="maincontent">' + $('#moduleintro0').html() + '</div>';
                if ($('#moduleintroslidecount').html() > 0) {
                    showfirstarrow = 1;
                    $('#snap2').html($('#moduleintro1').html());
                }
                if ($('#moduleintroslidecount').html() > 1) {
                    showsecondarrow = 1;
                    $('#snap3').html($('#moduleintro2').html());
                }
            }
            if ($(this).attr('class').indexOf('nav3') != -1) {
                newContent = '<h2>Traits</h2><div class="content3" id="poetraits">' + $('#traits0').html() + '</div>';
                if ($('#traitsslidecount').html() > 0) {
                    showfirstarrow = 1;
                    $('#snap2').html($('#traits1').html());
                }
                if ($('#traitsslidecount').html() > 1) {
                    showsecondarrow = 1;
                    $('#snap3').html($('#traits2').html());
                }
            }
            if ($(this).attr('class').indexOf('nav4') != -1) {
                newContent = '<h2>Key Actions</h2><div class="content4" id="modulekeyaction">' + $('#keyaction0').html() + '</div>';
                if ($('#keyactionslidecount').html() > 0) {
                    showfirstarrow = 1;
                    $('#snap2').html($('#keyaction1').html());
                }
                if ($('#keyactionslidecount').html() > 1) {
                    showsecondarrow = 1;
                    $('#snap3').html($('#keyaction2').html());
                }
            }

            if ($(this).attr('class').indexOf('nav5') != -1) {
                newContent = '<h2>In Detail</h2><div class="content1" id="maincontent">' + $('#indetail0').html() + '</div>';
                // showfirstarrow = 1;
                // $('#snap2').html($('#indetail1').html());
                //  showsecondarrow = 0;
                //$('#snap3').html($('#indetail2').html());
                if ($('#indetail1').find('strong').size() > 0) {
                    showfirstarrow = 1;
                    $('#clickmodele1').show("slow");
                    $('#snap2').html($('#indetail1').html());
                }
                if ($('#indetail2').find('strong').size() > 0) {
                    showfirstarrow = 1;
                    $('#snap3').html($('#indetail2').html());
                }
            }
            if ($(this).attr('class').indexOf('nav6') != -1) {
                newContent = '<h2>Frequency Definitions</h2><div class="content1" id="maincontent">' + $('#frequencydef').html() + '</div>';
            }
            if ($(this).attr('class').indexOf('nav7') != -1) {
                newContent = '<h2>Do&#39;s & Don&#39;ts</h2><div class="content1" id="maincontent">' + $('#dos').html() + '</div>';
            }

            e.preventDefault(); // prevent default action
            if (isTransitionRunning) {
                return false;
            }
            var contentWidth = $ajaxcontent.width(),
                $newItem = $(document.createElement('div')), // nested container for new content
                newItemHeight,
                newContentHeight,
                $oldItem = $ajaxcontent.children('.item-container');
            isTransitionRunning = true;

            $newItem.addClass('item-container');

            $('html, body').animate('slow');
            $navlinks.removeClass('selected');
            $(this).addClass('selected');
            $ajaxcontent.height($ajaxcontent.height());
            $ajaxcontent.css('overflow', 'hidden');
            if ($oldItem.length) {
                $oldItem
                    .width(contentWidth)
                    .css('position', 'absolute')
                    .animate({
                        left: -contentWidth // move new content at the right edge of container
                    },
                        animDur,
                        function () {
                            $oldItem.remove();
                        });
            }

            // append new content to container
            $newItem.html(newContent);
            $ajaxcontent.append($newItem);
            // fix new content width
            $newItem.width(contentWidth);
            // determine height of new content when it's appended to DOM
            newItemHeight = $newItem.height();

            // set up new content
            $newItem
                // move it to the right
                .css('position', 'absolute')
                .css('left', $ajaxcontent.width() + '%')
                // sliding animation
                .animate({
                    left: 0
                },
                    animDur,
                    function () {
                        // restore css
                        $newItem.css('position', 'static');
                        $newItem.css('width', 'auto');
                    });

            // change ajax container height
            $ajaxcontent.animate({
                height: newItemHeight
            },
                animDur,
                function () {
                    // now let ajax container naturally wrap around its content
                    $ajaxcontent.css('height', 'auto');
                    $ajaxcontent.css('overflow', 'auto');

                    // unset the transition running flag
                    isTransitionRunning = false;
                });
            //$("#Qnosww1").slider({
            //    min: 0,
            //    max: 4,
            //    range: "min",
            //    value: 2,
            //    slide: function (event, ui) {
            //        debugger;
            //    }
            //});
            return false;
        }
    });
    //LoadSlider();
    //    $.ajax({ url: 'page1.html', success: function (html) {
    //        $ajaxcontent.empty().append(html);
    //    }
    //    });
});