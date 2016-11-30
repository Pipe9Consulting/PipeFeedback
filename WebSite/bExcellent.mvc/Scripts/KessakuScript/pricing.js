$(document).ready(function () {
    $('#headerCont li').each(function () {
        $('#headerCont li a').removeClass('active');
    });

    $('#pricingHdr a').addClass('active');
});