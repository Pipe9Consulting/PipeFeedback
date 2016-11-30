$(document).ready(function () {
    $(function () {
        $('#clickevents').onePageNav({
            begin: function () {
                console.log('start')
            },
            end: function () {
                console.log('stop')
            }
        });
    });
    //$('#POETileClick').click(function() {
    //    window.location.href = "../CloudSolutions#ProfileOfExcellenceCont";
    //});

    //$('#headerCont li a').each(function () {
    //    $(this).removeClass('active');
    //});

    //$('#cloudSolnHdr a').addClass('active');
});