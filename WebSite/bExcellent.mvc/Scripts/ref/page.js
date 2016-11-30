$(document).ready(function () {
    // load binding
//    alert('1');
    $('body').live('loadStarted', function () {
        $('#btn-all-menu').hide();
        $('#bottom-menu').hide();
        $('#middle-bar').css({ 'margin-top': '0px' });
        $('#middle-bar').empty();
        $('#ajax-loaded').show();
        $('#overlay').show();
        $('#menu-button').removeClass('up-arrow').addClass('down-arrow'); $('#menu').slideUp();
        $('#profile-arrow').removeClass('up-arrow').addClass('down-arrow'); $('#profile-menu').slideUp();
    });

    // load finished
    $('body').live('loadCompleted', function () {
        $('#ajax-loaded').hide();
        $('#overlay').hide();
    });

    $('#logo').unbind('click');
    $('#logo').bind('click', function () {
        Page.home();
    });

    // bind home page on load
    Page.home();
});

var Page = {
    home: function () {
        $('body').trigger('loadStarted');
       // alert('1');
        $('#contents').load('/Feedback/Feedback');
        $('body').trigger('loadCompleted');

        //    feedback.loadrecivedcount();
        //feedback.loadpoe();
        //        $('#contents').load('/client/home.aspx', function (response, status, xhr) {
        //            $('#home-inner-content').css({ 'opacity': '0', 'margin-left': '300px' });
        //            $('#home-inner-content').animate({ marginLeft: '0px', opacity: '1' }, 800, 'linear')
        //                                    .animate({ marginLeft: '50px', opacity: '1' }, 500, 'linear')
        //                                    .animate({ marginLeft: '0px', opacity: '1' }, 700, 'linear', function () {
        //                                        $('body').trigger('loadCompleted');
        //                                    });
        //        });
    }
};