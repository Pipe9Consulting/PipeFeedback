var serviceUrl = 'http://tillid-pc13:109/';
$(document).ready(function () {
    $('#sub-right-col > div').live({
        mouseenter: function () {
            $(this).addClass('menu-button-hover');
            $(this).find('div.tile-text').animate({
                fontSize: '16px'
            }, 200);
        },
        mouseleave: function () {
            $(this).removeClass('menu-button-hover');
            $(this).find('div.tile-text').animate({
                fontSize: '14px'
            }, 200);
        }
    });

    $('#sub-left-menu > div > div').live({
        mouseenter: function () {
            $(this).addClass('menu-button-hover');
            $(this).find('div.small-tile-text').animate({
                fontSize: '16px'
            }, 200);
        },
        mouseleave: function () {
            $(this).removeClass('menu-button-hover');
            $(this).find('div.small-tile-text').animate({
                fontSize: '14px'
            }, 200);
        }
    });
});

var Common = {
    animate: function (id, callback) {
        $('#' + id).css({ 'opacity': '0', 'margin-left': '300px' });
        $('#' + id).animate({ marginLeft: '0px', opacity: '1' }, 800, 'linear')
                                .animate({ marginLeft: '50px', opacity: '1' }, 500, 'linear')
                                .animate({ marginLeft: '0px', opacity: '1' }, 700, 'linear', function () { });
        // trigger load completed event
        //$('body').trigger('loadCompleted');
        // bind back button
        $('#btn-wcsi-back').show();
        $('#btn-wcsi-back').unbind('click');
        // bind action with back button
        $('#btn-wcsi-back').bind('click', function () {
            callback();
        });
    },

    ajax: function (option) {
        try {
            // cross origin problem (basically IE)
            $.support.cors = true;

            // ajax request
            $.ajax({
                type: 'GET',
                url: (option.url) ? option.url : '',
                data: (option.data) ? option.data : null,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (typeof option.success == 'function') {
                        option.success(data);
                    }
                },
                error: function (err) {
                    if (typeof option.error == 'function') {
                        option.error(err);
                    }
                }
            });
        } catch (e) {
            alert('Not able to complete your request!');
        }
    },
    ajaxPost: function (option) {
        try {
            // cross origin problem (basically IE)
            $.support.cors = true;

            // ajax request
            $.ajax({
                type: 'POST',
                url: (option.url) ? option.url : '',
                data: JSON.stringify(option.data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (typeof option.success == 'function') {
                        option.success(data);
                    }
                },
                error: function (err) {
                    if (typeof option.error == 'function') {
                        option.error(err);
                    }
                }
            });
        } catch (e) {
            alert('Not able to complete your request!');
        }
    }
};