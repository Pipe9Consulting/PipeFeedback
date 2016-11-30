$(function () {
    $('#emailid').focus(function () {
        $(this).val('');
    });
    $('.addmember').click(function () {
       // debugger;
        $('#yourNetworkOption').show();
        $(this).addClass('addselect');
        $('.sendinv').toggle();
    });
    $('.addmember').mouseDown(function() {
        $(this).removeClass('addselect');
    });
    $('.sendinv li').click(function () {
        $('.sendinv li').addClass('send');
        $('.sendinv').hide();
        $('.addmember').removeClass('addselect');
    });
    $('.network li').click(function () {
        $(this).toggleClass('selectmngr');
    });
    /*  $('.nt').click(function () {
    $('.nt ul').toggle();
    $('.lgn ul').hide();
    });
    $('.nxtfb').click(function () {
    $('.networkholder').animate({ 'left': '-100%' }, { duration: 400 });
    $('.nxtfb').hide();
    $('.prevfb').show();
    });
    $('.prevfb').click(function () {
    $('.networkholder').animate({ 'left': '0%' }, { duration: 400 });
    $('.prevfb').hide();
    $('.nxtfb').show();
    });
  
    $('.lgn').click(function () {
    $('.lgn ul').toggle();
    $('.nt ul').hide();
    });*/
    hidingul();

});

function hidingul() {
    $('#secondpage').hide();
}

