//var serviceUrl = 'http://tillid-pc13:109/';
$(document).ready(function () {
    
    $('.pane').find('input[type=radio]:checked').removeAttr('checked');
    
    $("#n" + $(this).context.title).attr('checked', 'checked');

    //$('ul#indicator li').mouseover(function () {
    //    var img = $(this).find('img').attr('src').split('.p')[0];
    //    if (img.indexOf('_h') > 0) {
    //        $(this).addClass('selectedli');
    //    }
    //    else {
    //        $(this).find('img').attr('src', img.replace('_h', '') + '_h.png');
    //    }
    //});

    //$('ul#indicator li').mouseout(function () {
    //    var img = $(this).find('img').attr('src').split('.p')[0];
    //    if (!$(this).hasClass('selectedli')) {
    //        $(this).find('img').attr('src', img.replace('_h', '') + '.png');
    //    }
    //});
    function setTopMenu(area) {
       
    }

    $('#target').bind('DOMNodeInserted', function (event) {
        $('#target li').unbind('mouseover'); $('#target li').unbind('mouseout');
        
        $('#target li').mouseover(function () {
            var img = $(this).find('img').attr('src').split('.p')[0];
            var loc = location.pathname.substring(1);
            if (loc.indexOf('Detailedview') != -1 || loc.indexOf('Managerfeedback') != -1 || loc.indexOf('Quickview') != -1) {
                $(this).find('img').attr('src', img.replace('-small','') + 'h.png');
            }
            else {
                if (!$(this).hasClass('hideFooterMenu')) {
                    $(this).find('img').attr('src', img + '_Selected.png');
                }
            }
        });

        $('#target li').mouseout(function () {
            var img = $(this).find('img').attr('src').split('.p')[0];
            var loc = location.pathname.substring(1);
            if (loc.indexOf('Detailedview') != -1 || loc.indexOf('Managerfeedback') != -1 || loc.indexOf('Quickview') != -1) {
                $(this).find('img').attr('src', img.slice(0,-1) + '-small.png');
            }
            else {
                if (!$(this).hasClass('hideFooterMenu')) {
                    $(this).find('img').attr('src', img.replace('_Selected', '') + '.png');
                }
            }
        });
    });

    

    $('#sub-right-col > div').on({
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

    $('#sub-left-menu > div > div').on({
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
    setTopMenu: function (area) {
        $('.start_start').removeClass('select_start');
        $('.result_start').removeClass('select_result');
        $('.feedback_start').removeClass('select_feedback');
        $('.managersync_start').removeClass('select_managersync');
        $('.communitysync_start').removeClass('select_communitysync');
        $('.goals_start').removeClass('select_goals');
        if (area == 1) {
            $('.start_start').addClass('select_start');
        } else if (area == 2) {
            $('.feedback_start').addClass('select_feedback');
        } else if (area == 3) {
            $('.communitysync_start').addClass('select_communitysync');
        } else if (area == 4) {
            $('.managersync_start').addClass('select_managersync');
        } else if (area == 5) {
            $('.result_start').addClass('select_result');
        } else if (area == 6) {
            $('.goals_start').addClass('select_goals');
        }
    },
    ajax: function (option) {
        try {
            // cross origin problem (basically IE)
            $.support.cors = true;

            // ajax request
            $.ajax({
                cache: false,
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
            //            alert('Not able to complete your request!');
        }
    },
    ajaxsync: function (option) {
        try {
            // cross origin problem (basically IE)
            $.support.cors = true;

            // ajax request
            $.ajax({
                cache: false,
                type: 'GET',
                async: false,
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
            //            alert('Not able to complete your request!');
        }
    },
    ajaxnocache: function (option) {
        try {
            // cross origin problem (basically IE)
            $.support.cors = true;

            // ajax request
            $.ajax({
                cache: false,
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
            //            alert('Not able to complete your request!');
        }
    },
    ajaxPost: function (option) {
        try {
            // cross origin problem (basically IE)
            $.support.cors = true;

            // ajax request
            $.ajax({
                type: 'POST',
                async: false,
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
            //            alert('Not able to complete your request!');
        }
    },
    ajaxSyncPost: function (option) {
        try {
            // cross origin problem (basically IE)
            $.support.cors = true;

            // ajax request
            $.ajax({
                type: 'POST',
                url: (option.url) ? option.url : '',
                data: JSON.stringify(option.data),
                dataType: "json",
                async: false,
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
            //            alert('Not able to complete your request!');
        }
    },
    ajaxBlog: function (option) {
        try {
            // cross origin problem (basically IE)
            $.support.cors = true;

            // ajax request
            $.ajax({
                type: 'GET',
                cache: false,
                url: (option.url) ? option.url : '',
                dataType: "jsonp",
                //contentType: "application/json; charset=utf-8",
                crossDomain: true,
                success: function (data) {
                    if (typeof option.success == 'function') {
                        option.success(data);
                    }
                },
                error: function (e) {
                    if (typeof option.error == 'function') {
                        option.error(e);
                    }
                }
            });
        } catch (e) {
            //            alert('Not able to complete your request!');
        }
    },
    ajaxtxt: function (option) {
        try {
            // cross origin problem (basically IE)
            $.support.cors = true;

            // ajax request
            $.ajax({
                cache: false,
                type: 'GET',
                url: (option.url) ? option.url : '',
                data: (option.data) ? option.data : null,
                //  dataType: "json",
                //contentType: "application/json; charset=utf-8",
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
            //            alert('Not able to complete your request!');
        }
    },
    GetUserId: function () {
        var userid = 0;
        Common.ajaxsync({
            url: '/Common/MyUserId',
            success: function (response) {
                userid = response;
            },
            error: function (err) {

            }
        });
        return userid;
    }
};