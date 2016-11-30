$(document).ready(function () {
    //$('#headerCont li a').each(function () {
    //    $(this).removeClass('active');
    //});

    //$('#homeAct a').addClass('active');
    $('#videoImg').click(function () {
        $('#homevideo').html("<video id='videoplay'  controls autoplay> <source src='../Video/Kessaku_Story.mp4' type='video/mp4'> </video>");
    });

    $('#RequestDemo').click(function () {
        $('#messagePopup').show();
    });
    $('#emailid').focus(function () {
        $(this).css('color', 'black');
    });
    $('#emailid').change(function () {
        var getval = $(this).val();
        if (getval == "") {
            $(this).css('color', '#ccc');
        }
    });
    $('.more').click(function () {
        window.location.href = "../CloudSolutions";
    });

    //Top Slider Cloud Coach
    $('#POECloudSoln').click(function () {
        window.location.href = "../CloudSolutions#ProfileOfExcellenceCont";
    });
    $('#CloudSoln').click(function () {
        window.location.href = "../CloudSolutions#cloudAsCoachCont";
    });
    $('#PerformCloudSoln').click(function () {
        window.location.href = "../CloudSolutions#PerformanceCont";
    });
    $('#CheckOutCloudSoln').click(function () {
        window.location.href = "../CloudSolutions#CoachingToolKitCont";
    });

    //Top Slider Cloud Solution
    $('#POEcloudCoach').click(function () {
        window.location.href = "../CloudAsCoach#CloudasPoe";
    });
    $('#feedbackCloudCoach').click(function () {
        window.location.href = "../CloudAsCoach#Feedback";
    });
    $('#StandingCloudCoach').click(function () {
        window.location.href = "../CloudAsCoach#standingPage";
    });
    $('#ConnectCloudCaoch').click(function () {
        window.location.href = "../CloudAsCoach#Smart-Connect";
    });
    $('#goalCloudcoach').click(function () {
        window.location.href = "../CloudAsCoach#Goals";
    });
    $('#recognitionCloudCoach').click(function () {
        window.location.href = "../CloudAsCoach#Recognition";
    });
});

//Code for sliding response in home page
$(window).load(function () {
    var triggers = $('ul.triggers li');
    var clientThumbnile = $('.clientthumnail li');
    var images = $('ul.images li');
    var lastElem = clientThumbnile.length;
    var target;

    triggers.first().addClass('active');
    images.hide().first().show();

    function sliderResponse(target) {
        target === lastElem ? target = 0 : target = target;
        images.fadeOut(300).eq(target).fadeIn(300);
        triggers.removeClass('active').eq(target).addClass('active');
        clientThumbnile.removeClass('activeclient').eq(target).addClass('activeclient');
    }

    triggers.click(function () {
        if (!$(this).hasClass('active')) {
            target = $(this).index();
            sliderResponse(target);
            resetTiming();
        }
    });

    $('.next').click(function () {
        target = $('ul.triggers li.active').index();
        target === lastElem ? target = 0 : target = target + 1;
        sliderResponse(target);
        resetTiming();
    });
    $('.prev').click(function () {
        target = $('ul.triggers li.active').index();
        lastElem = triggers.length - 1;
        target === 0 ? target = lastElem : target = target - 1;
        sliderResponse(target);
        resetTiming();
    });

    function sliderTiming() {
        target = $('ul.triggers li.active').index();
        target === lastElem ? target = 0 : target = target + 1;
        sliderResponse(target);
    }

    var timingRun = setInterval(function () { sliderTiming(); }, 8000);
    function resetTiming() {
        clearInterval(timingRun);
        timingRun = setInterval(function () { sliderTiming(); }, 8000);
    }
});