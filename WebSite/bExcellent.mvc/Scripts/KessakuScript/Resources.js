$(document).ready(function () {
    //$('#headerCont li a').each(function () {
    //    $(this).removeClass('active');
    //});

    //$('#ResourcesHdr a').addClass('active');
    $('#videoclick').click(function () {
        $('#tabVideo').html("<video id='videoplay' controls autoplay> <source src='Video/The Microsoft Profile of Excellence Story by Dave Miller.mp4' type='video/mp4'> </video>");
    });
    $('.reg').click(function () {
        //window.location.href = "http://www.eventbrite.com/e/kessaku-cloud-technology-tickets-9108013313";
        window.open('https://www.eventbrite.com/e/introduction-kessaku-get-started-for-free-tickets-10049926601', '_blank');
    });
    $('.reg1').click(function () {
        //window.location.href = "http://www.eventbrite.com/e/kessaku-cloud-technology-tickets-9108013313";
        window.open('https://www.eventbrite.com/e/cloud-as-coach-see-our-cloud-technology-in-action-tickets-12316780823', '_blank');
    });
    $('.reg2').click(function () {
        //window.location.href = "http://www.eventbrite.com/e/kessaku-cloud-technology-tickets-9108013313";
        //window.open('https://www.eventbrite.com/e/kessaku-performance-reports-from-data-to-development-tickets-12052700953', '_blank');
    });
    $('.eventbrite').click(function () {
        //window.location.href = "http://www.eventbrite.com/o/alan-dowzall-4545862841";
        window.open('https://www.eventbrite.com/org/4545862841', '_blank');
    });
    $('.videothumnails li').click(function () {
        $(this).addClass("videoselected").siblings().removeClass("videoselected");
    });
    $('#RedirectEvent').click(function () {
        window.location.href = "../Events";
    });
    $('#redirectVideo').click(function () {
        window.location.href = "../Videos";
    });
    $('#resourceDownload').click(function () {
        //window.location.href = "../PDF/Cloud as Coach_ASTD Webinar_Downloadable.pptx";
        //window.open('../PDF/Cloud as Coach_ASTD Webinar_Downloadable.pptx', '_blank');
        window.location.href = "../DownloadableContent";
    });
});

function videoPageClick(videoOrder) {
    $('#tabVideo').html("");
    var video = "";
    if (videoOrder == 1) {
        video = "Video/Kessaku_Story.mp4";
    } else if (videoOrder == 2) {
        video = "Video/The Microsoft Profile of Excellence Story by Dave Miller.mp4";
    }
    else if (videoOrder == 3) {
        video = "Video/The Microsoft Profile of Excellence Story by Cecilia Flombum.mp4";
    }
    else if (videoOrder == 4) {
        video = "Video/The Microsoft Profile of Excellence Story with Johneen Bufford.mp4";
    }
    else if (videoOrder == 5) {
        video = "Video/The Profile of Excellence Story.mp4";
    }
    else if (videoOrder == 6) {
        video = "Video/The bexcellent Story.mp4";
    }
    else if (videoOrder == 7) {
        video = "Video/Nicksaban.mp4";
    } else if (videoOrder == 8) {
        video = "Video/Cloud as Coach How Cloud Technology Can Reverse the Widening Talent Gap.mp4";
    }

    $('#tabVideo').html("<video id='videoplay' width='100%' height='100%' controls autoplay> <source src='" + video + "' type='video/mp4'> </video>");
}