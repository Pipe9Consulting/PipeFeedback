$(document).ready(function () {
    // header top menu hide/show
    $('#sign-out').bind('click', function () {
      //window.location.href = '/client/Login.aspx';
    });

    $('#menu-button').bind('click', function () {
        $('#profile-arrow').removeClass('up-arrow').addClass('down-arrow'); $('#profile-menu').slideUp();
        $('#menu').slideToggle('show', function () {
            if ($('#menu-button').hasClass('down-arrow')) {
                $('#overlay').show();
                $('#menu-button').removeClass('down-arrow').addClass('up-arrow');
            } else {
                $('#overlay').hide();
                $('#menu-button').removeClass('up-arrow').addClass('down-arrow');
            }
        });
    });

    // header profile menu hide/show
    $('#profile-name').bind('click', function () {
        $('#profile-menu').slideToggle('show', function () {
            if ($('#profile-arrow').hasClass('down-arrow')) {
                $('#profile-arrow').removeClass('down-arrow').addClass('up-arrow');
            } else {
                $('#profile-arrow').removeClass('up-arrow').addClass('down-arrow');
            }
        });
    });

    $('#menu, #menu-button').click(function(e){e.stopPropagation();});
    // esc key
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $('#overlay').hide(); $('#menu-button').removeClass('up-arrow').addClass('down-arrow'); $('#menu').slideUp();
            $('#profile-arrow').removeClass('up-arrow').addClass('down-arrow'); $('#profile-menu').slideUp();
        }
    });

    //body click hide top menu
    /*$(document).click(function(e) {
        $('#overlay').hide(); $('#menu-button').removeClass('up-arrow').addClass('down-arrow'); $('#menu').slideUp();
    });*/

    // header top menu hover
    $('#menu > div').mouseenter(function () {
        $(this).addClass('menu-button-hover-top');
    }).mouseleave(function () {
        $(this).removeClass('menu-button-hover-top');
    });

    $('#menu > div').mousedown(function () {
        $(this).addClass('menu-button-down-top');
    }).mouseup(function () {
        $(this).removeClass('menu-button-down-top');
    });
    // end

    // header top menu hover
    $('#left-menu > div > div > div').live('mouseenter', function(){
        $(this).addClass('menu-button-hover');
        $(this).find('div.tile-text').animate({
            fontSize: '16px',
        }, 500);
        showSubMenu(this);
    }).live('mouseleave', function(){
        $(this).removeClass('menu-button-hover');
        $(this).find('div.tile-text').animate({
            fontSize: '14px'
        }, 500);
    });

    function showSubMenu(obj){
        if($(obj).parent().parent().attr('id') == 'right-inner-menu'){
            return;
        }
        if($(obj).hasClass('menu-button-down')){
            return;
        }
        var id = obj.id;
        id = '#sub-' + id;

        $('#right-inner-menu > div').hide();
        $('#main-menu > div').removeClass('menu-button-down');
        $(obj).addClass('menu-button-down');

        $(id).css({'position': 'absolute', 'opacity' : '0', 'margin-left' : ''});
        $(id + ' > div').each(function(i, o) {
            $(o).css({'margin-left' : (100 * (i + 1)) + 'px', 'opacity' : '0'});
        });

        $(id).animate({ marginLeft : '-248px', opacity: '1' }, 0, 'linear');

        $(id + ' > div').each(function(i, o) {
            $(o).animate({'margin-left' : '0px', 'opacity' : '+=.6'}, 200 * (i+1), function(){
                $(this).css({'opacity' : '1'});
            });
        });

        $(id).show();
    }
});