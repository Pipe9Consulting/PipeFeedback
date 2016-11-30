var myScroll,
myScroll2,
myScroll3;
function loaded() {
    myScroll = new iScroll('wrapper', {
        snap: true,
        momentum: false,
        hScrollbar: false,
        onScrollEnd: function () {
            //document.querySelector('#indicator > li.current').className = '';
            //document.querySelector('#indicator > li:nth-child(' + (this.currPageX + 1) + ')').className = 'current';
        }
    });
}
document.addEventListener('DOMContentLoaded', loaded, false);
//FAQ Accordion//
$(function () {
    $('.faqaccord .text').hide();
    $('.faqaccord h3:first').addClass('active').next().slideDown('slow');
    $('.faqaccord h3').click(function () {
        if ($(this).next().is(':hidden')) {
            $('.faqaccord h3').removeClass('active').next().slideUp('slow');
            $(this).toggleClass('active').next().slideDown('slow');
        }
    });
});
// Page Carousel//
$(function () {
    hidingul();
    $(document).ready(function () {
        var Input = $('input[name=Signup]');
        var default_value = Input.val();

        $(Input).focus(function () {
            if ($(this).val() == default_value) {
                $(this).val("");
            }
        }).blur(function () {
            if ($(this).val().length == 0) /*Small update*/ {
                $(this).val(default_value);
            }
        });
    });
    $('#btnclkpage').click(function () {
        $('#firstpage, #sixthpage, #fifthpage').hide();
        $('#thirdpage').hide();
        $('#thirdpagea').hide();
        $('#forthpage').hide();
        $('.videoscreen').hide();
        $('#secondpage').show();
        $('.videoh').hide();
        $('.videobc').hide();
        $('.abh').show();
        $('.bebc').show();
    });
    $(".poepage").unbind("click");
    $('.poepage').click(function () {
        window.location = "/Signup/Poelibrary?location=newPoe";
    });
    $('#scroller .testimonial li a').click(function () {
        $(this).css('background-color', '#e5e5e5');
    });
    $('#bn1').click(function () {
        $('#bn1,#bn3,#bn4,#bn5,#p0,#p2,#p3,#p4,#p5,#p6,.pg1,.pg3,.pg4,.pg5,.pg6,.pg7').hide();
        $('#p1,#bn2,.pg2').show();
        $("#scroller").animate({ left: "-100%" }, 100);
    });
    ////
    $('.vle').click(function () {
        $(this).css('background-color', '#e5e5e5');
    });
    $('.last li').click(function () {
        $('#bn1,#bn2,#bn3,#bn4,#bn6,#p0,#p1,#p3,#p2,#p6,.pg1,.pg2,.pg3,.pg4,.pg6,.pg7').hide();
        $('#p4,.pg5, #bn5').show();
    });
    //    $('#alansblog').click(function () {
    //        $("#scroller").animate({ left: "-400%" }, 500);
    //    });
    //////
    $('.topmenu li').click(function () {
        $(this).css('background-color', 'transparent !important');
    });
    $('#bn2').click(function () {
        $('#bn1,#bn2,#bn4,#bn5,#bn6,#p0,#p1,#p3,#p4,#p5,#p6,.pg1,.pg2,.pg4,.pg5,.pg6,.pg7').hide();
        $('#p2,#bn3,.pg3').show();
        $("#scroller").animate({ left: "-200%" }, 100);
    });

    $('#bn3').click(function () {
        $('#bn1,#bn2,#bn3,#bn5,#bn6,#p0,#p1,#p2,#p4,#p5,#p6,.pg1,.pg2,.pg3,.pg5,.pg6,.pg7').hide();
        $('#p3,#bn4,.pg4').show();
        $("#scroller").animate({ left: "-300%" }, 100);
    });
    $('#bn4').click(function () {
        $('#bn1,#bn2,#bn3,#bn4,#bn6,#p0,#p1,#p2,#p3,#p3,#p6,.pg1,.pg2,.pg3,.pg4,.pg6,.pg7').hide();
        $('#p4,#bn5,.pg5').show();
        $("#scroller").animate({ left: "-400%" }, 100);
    });
    $('#bn5').click(function () {
        $('#bn1,#bn2,#bn3,#bn4,#bn5,#p0,#p1,#p2,#p3,#p4,#p6,.pg1,.pg2,.pg3,.pg4,.pg5,.pg7').hide();
        $('#p5,#bn6,.pg6').show();
        $("#scroller").animate({ left: "-500%" }, 100);
    });
    $('#bn6').click(function () {
        $('#bn1,#bn2,#bn3,#bn4,#bn5,#bn6,#p0,#p1,#p2,#p3,#p4,#p5,#p6,.pg1,.pg2,.pg3,.pg4,.pg5,.pg6').hide();
        $('#p6,.pg7').show();
        $("#scroller").animate({ left: "-600%" }, 100);
    });
    $('#p1').click(function () {
        $('#bn2,#bn3,#bn4,#bn5,#bn6,#p2,#p1,#p3,#p4,#p5,#p6,.pg2,.pg3,.pg4,.pg5,.pg6,.pg7').hide();
        $('#p0,#bn1,.pg1').show();
        $("#scroller").animate({ left: "0%" }, 100);
    });
    $('#p2').click(function () {
        $('#bn2,#bn3,#bn4,#bn5,#bn6,#p0,#p2,#p3,#p4,#p5,#p6,.pg2,.pg3,.pg4,.pg5,.pg6,.pg7').hide();
        $('#p1,#bn2,.pg2').show();
        $("#scroller").animate({ left: "-100%" }, 100);
    });
    $('#p3').click(function () {
        $('#bn1,#bn3,#bn5,#bn4,#bn6,#p0,#p1,#p3,#p4,#p5,#p6,.pg1,.pg2,.pg4,.pg5,.pg6,.pg7').hide();
        $('#p2,#bn3,.pg3').show();
        $("#scroller").animate({ left: "-200%" }, 100);
    });
    $('#p4').click(function () {
        $('#bn1,#bn2,#bn5,#bn4,#bn6,#p0,#p1,#p2,#p4,#p5,#p6.pg1,.pg2,.pg3,.pg5,.pg6,.pg7').hide();
        $('#p3,#bn4,.pg4').show();
        $("#scroller").animate({ left: "-300%" }, 100);
    });
    $('#events').click(function () {
        $('#bn1,#bn2,#bn5,#bn4,#bn6,#p0,#p1,#p2,#p3,#p5,.pg1,.pg2,.pg3,.pg4,.pg6,.pg7').hide();
        $('#p4,#bn5,.pg5').show();
    });
    $('#p5').click(function () {
        $('#bn1,#bn2,#bn5,#bn4,#bn6,#p0,#p1,#p2,#p3,#p5,#p6.pg1,.pg2,.pg3,.pg4,.pg6,.pg7').hide();
        $('#p4,#bn5,.pg5').show();
        $("#scroller").animate({ left: "-400%" }, 100);
    });
    $('#p6').click(function () {
        $('#bn1,#bn2,#bn5,#bn4,#bn5,#p0,#p1,#p2,#p3,#p4,#p6,.pg1,.pg2,.pg3,.pg4,.pg5,.pg7').hide();
        $('#p5,#bn6,.pg6').show();
        $("#scroller").animate({ left: "-500%" }, 100);
    });
    $('.pd').click(function () {
        $('#bn1,#bn2,#bn5,#bn4,#bn6,#p0,#p1,#p4,#p3,#p5,#p6,.pg1,.pg2,.pg5,.pg4,.pg6,.pg7').hide();
        $('#p2,#bn3,.pg3').show();
    });
    $('.moc').click(function () {
        $('#bn5,#bn1,#bn2,#bn4,#bn6,#p0,#p4,#p1,#p2,#p3,#p5,.pg1,.pg5,.pg2,.pg4,.pg6,#p6,.pg7').hide();
        $('#p2,#bn3,.pg3').show();
        $("#scroller").animate({ left: "-200%" }, 100);
    });
    $('.rad').click(function () {
        $('#subjectMode').val(2);
        $('#contactHeader').text("Request a Demo");
        $('#formpopup, #dragform').show();
        $('.player').hide();
        //$('#reqdemo, #reqdemoform').show();

        //$("#scroller").animate({ left: "-200%" }, 100);
    });
    $('.closebtn').click(function () {
        $('.player').show();
    });
    $('.mos').click(function () {
        $('#bn5,#bn1,#bn2,#bn4,#bn6,#p0,#p4,#p1,#p2,#p3,#p5,.pg1,.pg5,.pg2,.pg4,.pg6,#p6,.pg7').hide();
        $('#p2,#bn3,.pg3').show();
        $("#scroller").animate({ left: "-400%" }, 100);
    });
    $('.mog').click(function () {
        $('#bn1,#bn2,#bn4,#bn5,#bn6,#p0,#p4,#p1,#p3,#p4,#p5,#p6,#p7.pg1,.pg2,.pg4,.pg5,.pg6,.pg7').hide();
        $('#p2,#bn3,.pg3').show();
        $("#scroller").animate({ left: "-400%" }, 100);
    });
    $('.price').click(function () {
        $('#bn1,#bn2,#bn3,#bn4,#bn6,#p0,#p1,#p2,#p3,#p5,.pg1,.pg2,.pg3,.pg5,.pg6').hide();
        $('#p4,#bn5,.pg4').show();
        $("#scroller").animate({ left: "-300%" }, 100);
    });
    $('.FQ').click(function () {
        $('#bn5,#bn2,#bn3,#bn1,#bn4,#bn6,#p0,#p1,#p2,#p3,#p4,#p5,.pg1,.pg2,.pg3,.pg4,.pg5,.pg6').hide();
        $('#p6,.pg7').show();
        $("#scroller").animate({ left: "-600%" }, 100);
    });
    $('.lab').click(function () {
        $('#bn5,#bn2,#bn1,#bn4,#bn6,#p0,#p4,#p3,#p1,#p5,.pg1,.pg5,.pg4,.pg2,.pg6').hide();
        $('#p2,#bn3,.pg3').show();
    });

    $('.btnclkfirstpage').click(function () {
        $('#secondpage').hide();
        $('#thirdpage').hide();
        $('#thirdpagea').hide();
        $('#forthpage').hide();
        $('.videoscreen').hide();
        $('#firstpage').show();
        $('#sixthpage, #fifthpage').hide();
        $('.videoh').hide();
        $('.videobc').hide();
        $('.abh').show();
        $('.bebc').show();
        $("#scroller").animate({ left: "-100%" }, 100);
    });
    $('.whois').click(function () {
        $('#firstpage').hide();
        $('#secondpage').hide();
        $('#thirdpage').show();
        $('#thirdpagea').hide();
        $('.videoscreen').hide();
        $('#forthpage').hide();
        $('#sixthpage, #fifthpage').hide();
        $('.videoh').hide();
        $('.videobc').hide();
        $('.abh').show();
        $('.bebc').show();
    });
    $('.beind').click(function () {
        $('#firstpage').hide();
        $('#secondpage').hide();
        $('#thirdpage').hide();
        $('#thirdpagea').hide();
        $('.videoscreen').hide();
        $('#forthpage').show();
        $('#sixthpage, #fifthpage').hide();
        $('.videoh').hide();
        $('.videobc').hide();
        $('.abh').show();
        $('.bebc').show();
    });
    $('.vdo').click(function () {
        $('.videoscreen').show();
        $('#firstpage').hide();
        $('#secondpage').hide();
        $('#thirdpage').hide();
        $('#thirdpagea').hide();
        $('#sixthpage, #fifthpage').hide();
        $('#forthpage').hide();
        $('.abh, .benefitsbg').hide();
        $('.bebc').hide();
        $('.videoh').show();
        $('.videobc').show();
        $("#scroller").animate({ left: "-100%" }, 100);
        $('.lvideo').css('background', '#e0b001');
        $('#bn1,#bn3,#bn4,#bn5,#bn6,#p0,#p1,#p3,#p4,#p5,.pg1,.pg3,.pg4,.pg5,.pg6').hide();
        $('#p2,#bn2,.pg2').show();
    });
    $('.contactus').click(function () {
        $("#scroller").animate({ left: "-500%" }, 100);
    });

    //    $('.nxt').click(function () {
    //        $('#scroller li .slidepage').addClass("move").siblings().removeClass("move");
    //    });
    //    $('.prev').click(function () {
    //        $('#scroller li .slidepage').removeClass("move").siblings().addClass("move");
    //    });
    $('.pricei').click(function () {
        $('.priceorg').hide();
        $('#signupsales').live('click', function () {
            //debugger;
            window.location.href = 'mailto:sales@kessaku.com';
        });
        $('.priceind').show();
    });
    $('.priceo').click(function () {
        $('.priceorg').show();
        $('#signupsales').live('click', function () {
            //debugger;
            window.location.href = 'mailto:sales@kessaku.com';
        });
        $('.priceind').hide();
    });
    $('.faqnxt').click(function () {
        $('.faq2').show();
        $('.faq1').hide();
    });
    $('.faqprev').click(function () {
        $('.faq1').show();
        $('.faq2').hide();
    });
    $('.faqprev').click(function () {
        $('.faq1').show();
    });

    $('#leaders').click(function () {
        $('#sideleaders,#leaders').css('background-color', '#e0b001');
        $('#sideleaders').css('color', '#fff');
        $("#sidereadsprof,#sidehrprof,#sidemanager").css('background-color', 'transparent');
        $("#sidereadsprof,#sidehrprof,#sidemanager").css('color', '#808080');
        $('#readsprof,#hrprof,#manager,#individual,.lvideo,#productdemo,.poebenefits,.rectangle1').css('background-color', '#808080');
        $('#benefitsbg').fadeIn("slow");
        $('#benefitsbg').fadeIn("slow");
        $(".abtvideopopup, .abtvideo").fadeOut();
        document.getElementById("benefitsbg").innerHTML = "<img src='/images/be-org-bg5.jpg'/>";
    });
    $('#readsprof').click(function () {
        $('#sidereadsprof,#readsprof').css('background-color', '#e0b001');
        $('#sidereadsprof').css('color', '#fff');
        $("#sideleaders,#sidehrprof,#sidemanager").css('background-color', 'transparent');
        $("#sideleaders,#sidehrprof,#sidemanager").css('color', '#808080');
        $('#leaders,#hrprof,#manager,#individual,.lvideo,#productdemo,.poebenefits,.rectangle1').css('background-color', '#808080');
        $('#benefitsbg').fadeIn("slow");
        $(".abtvideopopup, .abtvideo").fadeOut();
        $('#fifthpage').show();
        $('.videobc').hide();
        $('.bebc').show();
        $('#firstpage, #thirdpage, #thirdpagea, #forthpage, .videoscreen, #secondpage, #sixthpage').hide();
        document.getElementById("benefitsbg").innerHTML = "<img src='/images/be-org-bg4.jpg'/>";
    });
    $('#hrprof').click(function () {
        $('#sidehrprof,#hrprof').css('background-color', '#e0b001');
        $('#sidehrprof').css('color', '#fff');
        $("#sideleaders,#sidereadsprof,#sidemanager").css('background-color', 'transparent');
        $("#sideleaders,#sidereadsprof,#sidemanager").css('color', '#808080');
        $('#readsprof,#leaders,#manager,#individual,.lvideo,#productdemo,.poebenefits,.rectangle1').css('background-color', '#808080');
        $('#benefitsbg').fadeIn("slow");
        $(".abtvideopopup, .abtvideo").fadeOut();
        $('#sixthpage').show();
        $('.videobc').hide();
        $('.bebc').show();
        $('#firstpage, #thirdpage, #thirdpagea, #forthpage, .videoscreen, #secondpage, #fifthpage').hide();
        document.getElementById("benefitsbg").innerHTML = "<img src='/images/be-org-bg3.jpg'/>";
    });
    $('#manager').click(function () {
        $('#sidemanager,#manager').css('background-color', '#e0b001');
        $('#sidemanager').css('color', '#fff');
        $("#sideleaders,#sidereadsprof,#sidehrprof").css('background-color', 'transparent');
        $("#sideleaders,#sidereadsprof,#sidehrprof").css('color', '#808080');
        $('#readsprof,#hrprof,#leaders,#individual,.lvideo,#productdemo,.poebenefits,.rectangle1').css('background-color', '#808080');
        $('#benefitsbg').fadeIn("slow");
        $(".abtvideopopup, .abtvideo").fadeOut();
        document.getElementById("benefitsbg").innerHTML = "<img src='/images/be-org-bg6.jpg'/>";
    });
    $('#individual').click(function () {
        $('#individual').css('background-color', '#e0b001');
        $('#readsprof,#hrprof,#manager,#leaders,.lvideo,#productdemo,.poebenefits,.rectangle1').css('background-color', '#808080');
        $('#benefitsbg').fadeIn("slow");
        $(".abtvideopopup, .abtvideo").fadeOut();
        document.getElementById("benefitsbg").innerHTML = "<img src='/images/be-org-bg1.jpg'/>";
    });
    $('.lvideo').click(function () {
        $('.lvideo').css('background-color', '#e0b001');
        $('#readsprof,#hrprof,#manager,#individual,#leaders,#productdemo,.poebenefits,.rectangle1').css('background-color', '#808080');
        $('#bn1,#bn3,#bn4,#bn5,#bn6,#p0,#p1,#p3,#p4,#p5,.pg1,.pg3,.pg4,.pg5,.pg6').hide();
        $('#p2,#bn2,.pg2, .player').show();
        $('#benefitsbg').fadeIn("slow");
        var browser = navigator.userAgent;
        if (browser.indexOf("Firefox") != -1) {
            $("#aboutVideo").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script><div class='player' href='../../Video/bexcellent Storyboard.flv'  style='display:block; width:480px; height:320px' ></div>");
            flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
                clip: {
                    autoPlay: false,
                    autoBuffering: true
                }
            });
            $('.videolist').css('margin-top', '12px');
            //$('#videoPopup').fadeIn("slow");
            $(".abtvideopopup, .abtvideo").fadeIn("slow");
        }
    });

    $('#productdemo').click(function () {
        $('#productdemo').css('background-color', '#e0b001');
        $('.player').show();
        $('#readsprof,#hrprof,#manager,#individual,.lvideo,#leaders,.poebenefits,.rectangle1').css('background-color', '#808080');
        //$(".abtvideopopup, .abtvideo").fadeOut();
        var browser = navigator.userAgent;
        if (browser.indexOf("Firefox") != -1) {
            $("#aboutVideo").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script><div class='player' href='../../Video/bexcellent Storyboard.flv'  style='display:block; width:480px; height:320px' ></div>");
            flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
                clip: {
                    autoPlay: false,
                    autoBuffering: true
                }
            });
            $('.videolist').css('margin-top', '12px');
            //$('#videoPopup').fadeIn("slow");
            $(".abtvideopopup, .abtvideo").fadeIn("slow");
        }
    });
    $('.btnclkfirstpage').click(function () {
        $('.rectangle1').css('background-color', '#e0b001');
        $('#readsprof,#hrprof,#manager,#individual,.lvideo,#productdemo,#leaders').css('background-color', '#808080');
        document.getElementById("benefitsbg").innerHTML = "<img src='/images/be-org-bg.jpg'/>";
        $(".abtvideopopup, .abtvideo").fadeOut();
    });
    $('.pricei').click(function () {
        $('.pricei').css('background-color', '#e0b001');
        $('.priceo').css('background-color', '#808080');
    });
    $('.priceo').click(function () {
        $('.priceo').css('background-color', '#e0b001');
        $('.pricei').css('background-color', '#808080');
    });

    $('.gblog').click(function () {
        $('.gblog').css('background-color', '#e0b001');
        $('.blogpg').show();
        $('.glink,.gbfavlog,.gcrpg,.gworkshop,.gnews,.gtweet,.flipbox,.flipdiv').css('background-color', '#808080');
        $('.favblogpg,.crpg,.workshoppg,.newspg,.tweetpg').hide();
    });
    $('.gbfavlog').click(function () {
        $('.gbfavlog').css('background-color', '#e0b001');
        $('.favblogpg').show();
        $('.gblog,.glink,.gcrpg,.gworkshop,.gnews,.gtweet,.flipbox,.flipdiv').css('background-color', '#808080');
        $('.blogpg,.crpg,.workshoppg,.newspg,.tweetpg').hide();
    });
    $('.gcrpg,.rectangle').click(function () {
        $('.gcrpg,.flipdiv').css('background-color', '#e0b001');
        $('.crpg').show();
        $('.gblog,.gbfavlog,.glink,.gworkshop,.gnews,.gtweet').css('background-color', '#808080');
        $('.blogpg,.favblogpg,.workshoppg,.newspg,.tweetpg').hide();
    });
    $('.gworkshop').click(function () {
        $('.gworkshop').css('background-color', '#e0b001');
        $('.workshoppg').show();
        $('.gblog,.gbfavlog,.gcrpg,.glink,.gnews,.gtweet,.flipbox,.flipdiv').css('background-color', '#808080');
        $('.blogpg,.favblogpg,.crpg,.newspg,.tweetpg').hide();
    });

    $('.gnews').click(function () {
        $('.gnews').css('background-color', '#e0b001');
        $('.newspg').show();
        $('.gblog,.gbfavlog,.gcrpg,.gworkshop,.glink,.gtweet,.flipbox,.flipdiv').css('background-color', '#808080');
        $('.blogpg,.favblogpg,.crpg,.workshoppg,.tweetpg').hide();
    });
    $('.gtweet').click(function () {
        $('.gtweet').css('background-color', '#e0b001');
        $('.tweetpg').show();
        $('.gblog,.gbfavlog,.gcrpg,.gworkshop,.gnews,.glink,.flipbox,.flipdiv').css('background-color', '#808080');
        $('.blogpg,.favblogpg,.crpg,.workshoppg,.newspg').hide();
    });

    var screenevent = $('#ScreenEvent').val();
    if (screenevent == 3) {
        $('.gworkshop').css('background-color', '#e0b001');
        $('.workshoppg').show();
        $('.gblog,.gbfavlog,.gcrpg,.glink,.gnews,.gtweet,.flipbox,.flipdiv').css('background-color', '#808080');
        $('.blogpg,.favblogpg,.crpg,.newspg,.tweetpg').hide();
        $('#bn1,#bn2,#bn3,#bn5,#bn4,#bn6,#p0,#p1,#p2,#p3,#p5,.pg1,.pg2,.pg3,.pg4,.pg6').hide();
        $('#p4,#bn5,.pg5').show();
    }
    else if (screenevent == 4) {
        $('.gblog').css('background-color', '#e0b001');
        $('.blogpg').show();
        $('.glink,.gbfavlog,.gcrpg,.gworkshop,.gnews,.gtweet,.flipbox,.flipdiv').css('background-color', '#808080');
        $('.favblogpg,.crpg,.workshoppg,.newspg,.tweetpg').hide();
        $('#bn1,#bn2,#bn3,#bn5,#bn4,#bn6,#p0,#p1,#p2,#p3,#p5,.pg1,.pg2,.pg3,.pg4,.pg6').hide();
        $('#p4,#bn5,.pg5').show();
    }
    else if (screenevent == 5) {
        $('.gbfavlog').css('background-color', '#e0b001');
        $('.favblogpg').show();
        $('.gblog,.glink,.gcrpg,.gworkshop,.gnews,.gtweet,.flipbox,.flipdiv').css('background-color', '#808080');
        $('.blogpg,.crpg,.workshoppg,.newspg,.tweetpg').hide();
        $('#bn1,#bn2,#bn3,#bn5,#bn4,#bn6,#p0,#p1,#p2,#p3,#p5,.pg1,.pg2,.pg3,.pg4,.pg6').hide();
        $('#p4,#bn5,.pg5').show();
    }
    else if (screenevent == 6) {
        $('.gnews').css('background-color', '#e0b001');
        $('.newspg').show();
        $('.gblog,.gbfavlog,.gcrpg,.gworkshop,.glink,.gtweet,.flipbox,.flipdiv').css('background-color', '#808080');
        $('.blogpg,.favblogpg,.crpg,.workshoppg,.tweetpg').hide();
        $('#bn1,#bn2,#bn3,#bn5,#bn4,#bn6,#p0,#p1,#p2,#p3,#p5,.pg1,.pg2,.pg3,.pg4,.pg6').hide();
        $('#p4,#bn5,.pg5').show();
    }
    else if (screenevent == 7) {
        $('.gtweet').css('background-color', '#e0b001');
        $('.tweetpg').show();
        $('.gblog,.gbfavlog,.gcrpg,.gworkshop,.gnews,.glink,.flipbox,.flipdiv').css('background-color', '#808080');
        $('.blogpg,.favblogpg,.crpg,.workshoppg,.newspg').hide();
        $('#bn1,#bn2,#bn3,#bn5,#bn4,#bn6,#p0,#p1,#p2,#p3,#p5,.pg1,.pg2,.pg3,.pg4,.pg6').hide();
        $('#p4,#bn5,.pg5').show();
    }

    else if (screenevent == 9) {
        $('#bn5,#bn2,#bn3,#bn1,#bn4,#bn6,#p0,#p4,#p2,#p1,#p4,.pg1,.pg5,.pg3,.pg2,.pg4').hide();
        $('#p5,.pg6').show();
    } else if (screenevent == 10) {
        $('#bn5,#bn2,#bn3,#bn1,#bn4,#bn6,#p0,#p1,#p2,#p3,#p4,#p5,.pg1,.pg5,.pg3,.pg2,.pg4,.pg7').hide();
        $('#p6,.pg7').show();
    }
    else if (screenevent == 11) {
        $('.rectangle1').css('background-color', '#e0b001');
        $('#readsprof,#hrprof,#manager,#individual,.lvideo,#productdemo,#leaders').css('background-color', '#808080');
        $('#bn1,#bn3,#bn4,#bn5,#bn6,#p0,#p2,#p3,#p4,#p5,#p6,.pg1,.pg3,.pg4,.pg5,.pg6,.pg7').hide();
        $('#p1,#bn2,.pg2').show();
    }
    else if (screenevent == 15) {
        $('#sidehrprof,#hrprof').css('background-color', '#e0b001');
        $('#sidehrprof').css('color', '#fff');
        $("#sideleaders,#sidereadsprof,#sidemanager").css('background-color', 'transparent');
        $("#sideleaders,#sidereadsprof,#sidemanager").css('color', '#808080');
        $('#readsprof,#leaders,#manager,#individual,.lvideo,#productdemo,.poebenefits,.rectangle1').css('background-color', '#808080');
        $('#benefitsbg').fadeIn("slow");
        $('#sixthpage').show();
        $('#firstpage, #thirdpage, #thirdpagea, #forthpage, .videoscreen, #secondpage, #fifthpage').hide();
        document.getElementById("benefitsbg").innerHTML = "<img src='/images/be-org-bg3.jpg'/>";
    } else if (screenevent == 14) {
        $('#secondpage').hide();
        $('#thirdpage').hide();
        $('#thirdpagea').hide();
        $('#forthpage').hide();
        $('.videoscreen').hide();
        $('#firstpage').show();
        $('#sixthpage, #fifthpage').hide();
        $('.videoh').hide();
        $('.videobc').hide();
        $('.abh').show();
        $('.bebc').show();
    }
    else if (screenevent == 16) {
        $('#bn1,#bn2,#bn3,#bn4,#bn5,#p0,#p1,#p2,#p3,#p4,#p6,.pg1,.pg2,.pg3,.pg4,.pg5,.pg7').hide();
        $('#p5,#bn6,.pg6').show();
    }
    else if (screenevent == 18) {
        $('.gcrpg,.flipdiv').css('background-color', '#e0b001');
        $('.crpg').show();
        $('.gblog,.gbfavlog,.glink,.gworkshop,.gnews,.gtweet').css('background-color', '#808080');
        $('.blogpg,.favblogpg,.workshoppg,.newspg,.tweetpg').hide();
    }
    else if (screenevent == 19) {
        $('.gcrpg').css('background-color', '#e0b001');
        $('.crpg').show();
        $('.gblog,.gbfavlog,.glink,.gworkshop,.gnews,.gtweet').css('background-color', '#808080');
        $('.blogpg,.favblogpg,.workshoppg,.newspg,.tweetpg').hide();
        $('#bn1,#bn2,#bn3,#bn5,#bn4,#bn6,#p0,#p1,#p2,#p3,#p5,.pg1,.pg2,.pg3,.pg4,.pg6').hide();
        $('#p4,#bn5,.pg5').show();
    }
    else {
        $('.gcrpg,.flipdiv').css('background-color', '#e0b001');
        $('.crpg').show();
        $('.blogpg,.favblogpg,.workshoppg,.newspg,.tweetpg').hide();
    }
    if (screenevent == 1) {
        $('.lvideo').css('background-color', '#e0b001');
        $('#readsprof,#hrprof,#manager,#individual,#leaders,#productdemo,.poebenefits,.rectangle1').css('background-color', '#808080');
        $('#benefitsbg').fadeIn("slow");
        $('.videoscreen').show();
        $('#firstpage, #sixthpage, #fifthpage').hide();
        $('#secondpage').hide();
        $('#thirdpage').hide();
        $('#thirdpagea').hide();
        $('#forthpage').hide();
        $('.abh, .benefitsbg').hide();
        $('.bebc').hide();
        $('.videoh').show();
        $('.videobc').show();
    }

    $('#imagelogoHome').show();
});

//Meet Alan Blog

function hidingul() {
    $('#secondpage').hide();
    $('#thirdpage').hide();
    $('#thirdpagea').hide();
    $('#forthpage').hide();
    $('.videoscreen').hide();
    $('.videoh').hide();
    $('.videobc').hide();
    $('.priceorg').hide();
    $('.faq2').hide();
    $('.pricei').css('background-color', '#e0b001');
    $('.rectangle1').css('background-color', '#e0b001');
    $('.favblogpg,.crpg,.workshoppg,.newspg,.tweetpg').hide();
}

function nextdata(current) {
    var text = '';
    var custresponse = $('#custreftextdata').val();
    var jsondata = $.parseJSON(custresponse);
    if (current < 4) {
        text = jsondata[current].text.substr(0, 75) + "...";
    } else {
        text = jsondata[0].text.substr(0, 75) + "...";
    }
    return text;
}
function nextdataid(current) {
    if (current < 4) {
        return current + 1;
    } else {
        return 0;
    }
}

$(document).ready(function () {
    $('#signupbtn').click(function () {
        var search = $('#emailid').val();
        var checkmail = IsEmail(search);
        if (search != "" && search != "enter your email address" && checkmail == true) {
            if (validatepubemail()) {
                Common.ajax({
                    url: '/Home/HomeSignUp?mailid=' + search,
                    success: function (response) {
                        if (response == false) {
                            window.location = "SignUp/Register";
                        } else {
                            alert("Please enter your valid email id");
                        }
                    },
                    error: function (err) {
                    }
                });
            } else {
                alert("Should be your company specific emailid");
            }
        } else {
            alert("Please enter your valid email id");
        }
    });
});
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function validatepubemail() {
    var mailid = $('#emailid').val();
    var pubemails = "gmail,yahoo,hotmail,live,outlook";
    var collections = pubemails.split(',');
    for (var k = 0; k < collections.length; k++) {
        if (mailid.toLowerCase().indexOf(collections[k]) >= 0) {
            return false;
        }
    }
    return true;
}