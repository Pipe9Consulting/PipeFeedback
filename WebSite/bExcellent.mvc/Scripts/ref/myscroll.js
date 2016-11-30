//var myScroll,
//myScroll2,
//myScroll3;
function loaded() {
    //var t = document.querySelector('#indicator > li.current');
    //myScroll = new iScroll('wrapper', {
    //    snap: true,
    //    momentum: false,
    //    hScrollbar: false,
    //    onScrollEnd: function () {
    //        document.querySelector('#indicator > li.current').className = '';
    //        document.querySelector('#indicator > li:nth-child(' + (this.currPageX + 1) + ')').className = 'current';
    //    }
    //});
}
document.addEventListener('DOMContentLoaded', loaded, false);
//Accordion//
//$(function () {
//    //  Accordion Panels
//    $(".accordion div").hide();
//    //setTimeout("$('.accordion div').slideToggle('slow');", 1000);
//    var thevalue = "";
//    $(".accordion h3").click(function () {
//        thevalue = $(this);
//        $(this).next(".pane").slideToggle("slow").siblings(".pane:visible").slideUp("slow");
//        $(this).toggleClass("current");
//        $(this).siblings("h3").removeClass("current");
//        var isHidden = $('.pane').is(':hidden');
//        var checkClass = $('.checkt').hasClass('current');
//        if (!checkClass) {
//            $('.checkt').html("");
//            $('.checkt').html("<img src='../../Images/down-arrow.png' class='checkimg' />");
//        } else {
//            $('.checkt').html("");
//            $('.checkt').html("<img src='../../Images/up-arrow.png' class='checkimg' />");
//        }
//    });
//    $("body").click(
//                function (e) {
//                    if ((e.target || e.srcElement).className !== "accordion" && (e.target || e.srcElement).className !== "checkimg") {
//                        var isHidden = $('.pane').is(':hidden');
//                        if (!isHidden) {
//                            $('.pane').hide('slow');
//                            // $(this).siblings("h3").html(" <img src='../../Images/up-arrow.png' class='checkimg' />");
//                            // var findVal = thevalue;
//                            if (thevalue != "") {
//                                // $(this).siblings("h3").html(" <img src='../../Images/down-arrow.png' class='checkimg' />");
//                                thevalue.toggleClass("current");
//                            }
//                            var checkClass = $('.checkt').hasClass('current');
//                            if (!checkClass) {
//                                $('.checkt').html("");
//                                $('.checkt').html("<img src='../../Images/down-arrow.png' class='checkimg' />");
//                            } else {
//                                $('.checkt').html("");
//                                $('.checkt').html("<img src='../../Images/up-arrow.png' class='checkimg' />");
//                            }
//                        }
//                    }
//                }
//            );
//});

//Carousel//

$(window).load(function () {
    // invoke the carousel
    //$('#myCarousel').carousel({
    //    interval: false
    //});

    /* SLIDE ON CLICK */

    $('.carousel-linked-nav > li > a').click(function () {
        // grab href, remove pound sign, convert to number
        var item = Number($(this).attr('href').substring(1));

        // slide to number -1 (account for zero indexing)
        $('#myCarousel').carousel(item - 1);

        // remove current active class
        $('.carousel-linked-nav .active').removeClass('active');

        // add active class to just clicked on item
        $(this).parent().addClass('active');

        // don't follow the link
        return false;
    });

    /* AUTOPLAY NAV HIGHLIGHT */

    // bind 'slid' function
    $('#myCarousel').bind('slid', function () {
        // remove active class
        $('.carousel-linked-nav .active').removeClass('active');

        // get index of currently active item
        var idx = $('#myCarousel .item.active').index();

        // select currently active item and add active class
        $('.carousel-linked-nav li:eq(' + idx + ')').addClass('active');
    });
});

//Collapse Panel//
//$(function () {
//    $('.slide-out-div').tabSlideOut({
//        tabHandle: '.handle',                     //class of the element that will become your tab
//        tabLocation: 'right',                      //side of screen where tab lives, top, right, bottom, or left
//        speed: 300,                               //speed of animation
//        action: 'click',                          //options: 'click' or 'hover', action to trigger animation
//        topPos: '0px',                          //position from the top/ use if tabLocation is left or right
//        leftPos: '40px',                          //position from left/ use if tabLocation is bottom or top
//        fixedPosition: true                      //options: true makes it stick(fixed position) on scroll
//    });
//});

//Drop Down//
//$(window).load(function () {
//    $.fn.dropDown = function (hiddenClass) {
//        var that = this;
//        $('html').click(function () {
//            that.each(function () {
//                $(this).find('ul').addClass(hiddenClass);
//            });
//        });
//        return this.each(function () {
//            var $this = $(this);
//            $this.data('dropDownTrigger', true);
//            $this.find('ul').addClass(hiddenClass);
//            $this.click(function (e) {
//                $(this).find('ul').toggleClass(hiddenClass);
//                e.stopPropagation();
//                if ($(e.target).parent().data('dropDownTrigger')) {
//                    e.preventDefault();
//                }
//            });
//        });
//    }

//    $('.dropdown').dropDown('hidden');
//});
//Send Invite Dropdown//
$(window).load(function () {
    $.fn.dropDown = function (hiddenClass) {
        var that = this;
        $('html').click(function () {
            that.each(function () {
                $(this).find('ul').addClass(hiddenClass);
            });
        });
        return this.each(function () {
            var $this = $(this);
            $this.data('dropDownTrigger', true);
            $this.find('ul').addClass(hiddenClass);
            $this.click(function (e) {
                $(this).find('ul').toggleClass(hiddenClass);
                e.stopPropagation();
                if ($(e.target).parent().data('dropDownTrigger')) {
                    e.preventDefault();
                }
            });
        });
    }

    $('.DDmenulist').dropDown('hidden');
});
//Modal flip//
$(document).delegate('#page1', 'pageinit', function () {
    $(this).find('a').bind('click', function () {
        if ($(this).attr('data-rel') !== 'dialog') {
            $('#page2').attr('data-role', 'page').removeClass('ui-dialog').find('.ui-header').removeClass('ui-corner-top').end().find('.ui-footer').removeClass('ui-corner-bottom').end().find('.ui-dialog-contain').children().unwrap();
        } else {
            $('#page2').attr('data-role', 'dialog').addClass('ui-dialog').find('.ui-header').addClass('ui-corner-top').end().find('.ui-footer').addClass('ui-corner-bottom').end().children().wrapAll('<div role="dialog" class="ui-dialog-contain ui-corner-all ui-overlay-shadow" />');
        }
    });
});
$(document).click(function (event) {
    if ($(event.target).parents().index($('.bukatutup')) == -1) {
        if ($('#target').is(":visible")) {
            $("#target").hide("slow");
        }
    }
});
//Toggle Footer//
$(function () {
    //$('.bukatutup').click(function () {
    //    $('#target').toggle('slow');
    //});
});
$(function () {
    $('.nxtslide').click(function () {
        $('#slidediv').toggle('slow');
    });
    $('.nxtslide1').click(function () {
        $('#slidediv2').toggle('slow');
    });
});
//Collapse Pannel//
$(function () {
    $(function () {
        //$("#right").toggle(function () {
        //    $(this).parent().animate({ right: '0px' }, { queue: false, duration: 500 });
        //}, function () {
        //    $(this).parent().animate({ right: '-18.8%' }, { queue: false, duration: 500 });
        //});
    });
});
//Tab Content//

//User Slide//
$(document).ready(function () {
    $('.up-down').mouseover(function () {
        $('.default').stop().animate({
            height: 75
        }, 95);
    }).mouseout(function () {
        $('.default').stop().animate({
            height: 95
        }, 95);
    });
    $(".titles").hide();
    $(".tiles, .wideTiles, .longTiles").hover(function () {
        $(this).find("div[class=titles]").slideUp("fast");
    }, function () {
        $(this).find("div[class=titles]").slideDown("fast");
    });

    $(".tableRow").hover(function (event) {
        event.preventDefault();
        return false;
    }, function (event) {
        event.preventDefault();
        return false;
    });
    $('.DDmenulist li a').click(function () {
        //alert($(this).html());
        $("#div1").text($(this).text());
    });

    //    $('.videolist li').click(function () {
    //        //alert($(this).html());
    //        var img = $("#Video").append("<img id='v4' />");
    //        var src1 = $('.videolist li img').value; alert(src1);
    //        $("#v4").attr('src', src1);
    //    });
});
//Practise Area//
//$(function () {
//    $('.practisemenu').click(function () {
//        $('#compltedPracticeArea').toggle('fast');
//    });
//});
//FAQ accordion//
$(function () {
    $('#accordion .content').hide();
    $('#accordion h2:first').addClass('active').next().slideDown('slow');
    $('#accordion h2').click(function () {
        if ($(this).next().is(':hidden')) {
            $('#accordion h2').removeClass('active').next().slideUp('slow');
            $(this).toggleClass('active').next().slideDown('slow');
        }
    });
});
//Accordion//
$(function () {
    //  Accordion Panels
    $(".accord div").hide();
    //setTimeout("$('.accordion div').slideToggle('slow');", 1000);
    $(".accord h3").click(function () {
        $(this).next(".panel").slideToggle("slow").siblings(".panel:visible").slideUp("slow");
        $(this).toggleClass("current");
        $(this).siblings("h3").removeClass("current");
    });
});
$(document).ready(function () {
    $(".accordion img").fadeIn("3000");
});

function LoadSlider() {
}