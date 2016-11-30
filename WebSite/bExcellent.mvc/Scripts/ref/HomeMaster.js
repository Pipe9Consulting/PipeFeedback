$(document).ready(function () {
   // $('#homeIndex4').load('Home/MeetOurGurus');
//    $('#homeIndex').load('home/HomeIndex');
//    $('#homeIndex1').load('home/CustomerStarsGuru');
//    $('#homeIndex2').load('home/AboutBexcellent');
//    $('#homeIndex3').load('home/PricingIndex');
//    $('#homeIndex4').load('Home/MeetOurGurus');
//    $('#homeIndex5').load('Home/ContactUs');
//    $('#homeIndex6').load('Home/FAQIndex');
    $('#imagelogoHome').hide();
    $("#tiles .tile li").hover(function () {
        $(this).stop().animate({ marginTop: "-128px" }, 400);
    }, function () {
        $(this).stop().animate({ marginTop: "0px" }, 400);
    });
    //    $("body").click(
    //        function (e) {
    //            if ((e.target || e.srcElement).className !== "bukatutup") {
    //                $('#target').hide('slow');
    //            }
    //        }
    //    );

});


(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g;
    m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-45437347-1', 'bexcellent.com');
ga('send', 'pageview');