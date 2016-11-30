$(document).ready(function () {
    $('#dwnldPPT').click(function () {
        window.open('../../SignUp/DownloadPdf?poeid=0', '_blank');
    });
    $('#gerargDwnld').click(function () {
        window.open('../../SignUp/DownloadPdf?poeid=-1', '_blank');
    });
    $('.dwnldpoe').click(function () {
        var poeid = $(this).attr("data-poe");
        var url = '../../SignUp/DownloadPdf?poeid=' + poeid;
        window.open(url, '_blank');
    });
});