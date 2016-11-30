$(function () {
    $('#emailid').focus(function () {
        $(this).val('');
    });
    $('#btnclkpage').click(function () {
        $('#firstpage').hide();
        $('#thirdpage').hide();
        $('#thirdpagea').hide();
        $('#secondpage').show();
    });
    $('.nav2').click(function () {
        $('#clickmodele1').show("slow");
    });
    $('.nav2, .nav2 img').hover(function () {
        $('.MI').show();
    });
    $('.nav2').mouseout(function () {
        $('.MI').hide();
    });

    $('.nav1').click(function () {
        $('#clickmodele1').hide();
        $('#module2').hide();
        $('#module3').hide();
        $('#clickmodele1hide').hide();
        $('#clickmodele2hide').hide();
    });
    $('.nav1, .nav1 img').hover(function () {
        $('.FI').show();
    });
    $('.nav1').mouseout(function () {
        $('.FI').hide();
    });
    $('.nav3').click(function () {
        $('#clickmodele1').hide();
        $('#module2').hide();
        $('#module3').hide();
        $('#clickmodele1hide').hide();
        $('#clickmodele2hide').hide();
    });
    $('.nav3, .nav3 img').hover(function () {
        $('.trait').show();
    });
    $('.nav3').mouseout(function () {
        $('.trait').hide();
    });

    $('.nav4').click(function () {
        $('#clickmodele1').hide();
        $('#module2').hide();
        $('#module3').hide();
        $('#clickmodele1hide').hide();
        $('#clickmodele2hide').hide();
    });
    $('.nav4, .nav4 img').hover(function () {
        $('.kact').show();
    });
    $('.nav4').mouseout(function () {
        $('.kact').hide();
    });
    $('.nav7').mouseout(function () {
        $('.donts').hide();
    });

    $('.nav2').click(function () {
        $('#clickmodele1').show();
    });
    $('#clickmodele1').click(function () {
        $('#module2').show("slow");
        $('#clickmodele1hide').show("slow");
        $('#clickmodele2').show("slow");
    });
    $('#clickmodele1hide').click(function () {
        $('#module2').hide();
        $('#module3').hide();
        $('#clickmodele1hide').hide();
        $('#clickmodele2hide').hide();
    });
    $('#clickmodele2hide').click(function () {
        $('#module3').hide();
        $('#clickmodele2hide').hide();
        $('#clickmodele2').show();
    });

    $('#clickmodele2').click(function () {
        $('#module3').show("slow");
        $('#clickmodele2hide').show();
    });
    $('#wrapper').mouseover(function () {
        $('#target').hide("fast");
    });
    $('#left').click(function () {
        $('#clickmodele1').hide();
    });
    $('#bn1').click(function () {
        $('#q1').hide("slow");
        $('#bn1,#bn3,#bn4,#bn5,#p1,#p3,#p4,#p5').hide();
        $('#p2,#bn2').show();
        $('#q2').animate({ 'left': '-700px' }, { duration: 1000 });
    });
    $('#bn2').click(function () {
        $('#q2').hide("slow");
        $('#bn1,#bn2,#bn4,#bn5,#p1,#p2,#p4,#p5').hide();
        $('#p3,#bn3').show();
        $('#q3').animate({ 'left': '-700px' }, { duration: 400 });
    });
    $('#bn3').click(function () {
        $('#q3').hide("slow");
        $('#bn1,#bn2,#bn3,#bn5,#p1,#p2,#p3,#p5').hide();
        $('#p4,#bn4').show();
        $('#q4').animate({ 'left': '-700px' }, { duration: 400 });
    });
    $('#bn4').click(function () {
        $('#q4').hide("slow");
        $('#bn1,#bn2,#bn3,#bn4,#bn5,#p1,#p2,#p3,#p4').hide();
        $('#p5,#bn5').show();
        $('#q5').animate({ 'left': '-700px' }, { duration: 400 });
    });
    $('#p2').click(function () {
        $('#bn2,#bn3,#bn4,#bn5,#p2,#p3,#p4,#p5').hide();
        $('#q1').show("slow");
        $('#p1,#bn1').show();
        $('#q1').animate({ 'left': '700px' }, { duration: 400 });
    });
    $('#p3').click(function () {
        $('#bn1,#bn3,#bn5,#bn4,#p1,#p3,#p4,#p5').hide();
        $('#q2').show("slow");
        $('#p2,#bn2').show();
        $('#q2').animate({ 'left': '700px' }, { duration: 400 });
    });
    $('#p4').click(function () {
        $('#bn1,#bn2,#bn5,#bn4,#p1,#p2,#p4,#p5').hide();
        $('#q3').show("slow");
        $('#p3,#bn3').show();
        $('#q4').animate({ 'left': '700px' }, { duration: 400 });
    });
    $('#p5').click(function () {
        $('#bn1,#bn2,#bn5,#bn4,#p1,#p2,#p4,#p3,#p5').hide();
        $('#q4').show("slow");
        $('#p4,#bn4').show();
        $('#q4').animate({ 'left': '700px' }, { duration: 400 });
    });

    $('#navigation li a').click(function () {
        $('.slideout').show({ 'left': '0px' });
        $('.slideout').animate({ 'left': '0px' }, { duration: 400 });
    });
});
$(document).ready(function () {
});

function hidingul() {
    $('#clickmodele1').hide();
    $('#clickmodele2').hide();
    $('#clickmodele1hide').hide();
    $('#clickmodele2hide').hide();
    $('#module2').hide();
    $('#module3').hide();
    $('#p3').hide();
    $('#p4').hide();
    $('#p5').hide();
    $('.kact').hide();
    $('.fqtooltip').hide();
    $('.trait').hide();
    $('.FI').hide();
    $('.MI').hide();
}