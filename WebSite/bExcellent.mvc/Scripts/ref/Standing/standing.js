$(function () {
    $('.addmember').text('Chart View');
    $(".stand li").click(function () {
        $(this).addClass("selected");
        $(this).siblings().removeClass("selected");
    });
    $('.addmember').click(function () {
        $(this).toggleClass('addselect');
        $('.sendinv').toggle();
    });
    $('.sendinv li, .addselect').click(function () {
        $('.sendinv li').addClass('send');
        $('.sendinv').hide();
        $('.addmember').removeClass('addselect');
    });
    $(function () {
        $('#bn1').click(function () {
            $('#bn1,#bn3,#bn4,#bn5,#p1,#p3,#p4,#p5').hide();
            $('#p2,#bn2').show();
            $('#q1').animate({ 'margin-left': '-100%' }, { duration: 1000 });
        });
        $('#bn2').click(function () {
            $('#bn1,#bn2,#bn4,#bn5,#p1,#p2,#p4,#p5').hide();
            $('#p3,#bn3').show();
            $('#q2').animate({ 'margin-left': '-100%' }, { duration: 1000 });
        });
        $('#bn3').click(function () {
            $('#bn1,#bn2,#bn3,#bn5,#p1,#p2,#p3,#p5').hide();
            $('#p4,#bn4').show();
            $('#q3').animate({ 'margin-left': '-100%' }, { duration: 1000 });
        });
        $('#bn4').click(function () {
            $('#bn1,#bn2,#bn3,#bn4,#bn5,#p1,#p2,#p3,#p4').hide();
            $('#p5,#bn5').show();
            $('#q4').animate({ 'margin-left': '-100%' }, { duration: 1000 });
        });
        $('#p2').click(function () {
            $('#bn2,#bn3,#bn4,#bn5,#p2,#p3,#p4,#p5').hide();
            $('#q1').show("slow");
            $('#p1,#bn1').show();
            $('#q1').animate({ 'margin-left': '0px' }, { duration: 1000 });
        });
        $('#p3').click(function () {
            $('#bn1,#bn3,#bn5,#bn4,#p1,#p3,#p4,#p5').hide();
            $('#q2').show("slow");
            $('#p2,#bn2').show();
            $('#q2').animate({ 'margin-left': '0px' }, { duration: 1000 });
        });
        $('#p4').click(function () {
            $('#bn1,#bn2,#bn5,#bn4,#p1,#p2,#p4,#p5').hide();
            $('#q3').show("slow");
            $('#p3,#bn3').show();
            $('#q3').animate({ 'margin-left': '0px' }, { duration: 1000 });
        });
        $('#p5').click(function () {
            $('#bn1,#bn2,#bn5,#bn4,#p1,#p2,#p4,#p3,#p5').hide();
            $('#q4').show("slow");
            $('#p4,#bn4').show();
            $('#q4').animate({ 'margin-left': '0px' }, { duration: 1000 });
        });
        $('#topperform').click(function () {
            $('#top').show();
            $('#nxtline, #community, #previous, #all').hide();
        });
        $('#nextinline').click(function () {
            $('#nxtline').show();
            $('#top,#community, #previous, #all').hide();
        });
        $('#comm').click(function () {
            $('#community').show();
            $('#top, #nxtline,#previous, #all').hide();
        });
        $('#prev').click(function () {
            $('#previous').show();
            $('#top, #nxtline, #community, #all').hide();
        });
        $('#alltile').click(function () {
            $('#all').show();
            $('#top, #nxtline, #community, #previous,').hide();
        });
    });
    $('#pagetwo').click(function () {
        $(".indexrightclose, .indexclose").hide();
        $(".indexrightarrow ,.indexrightclose1").show();
        $(".modelcontent").animate({ left: "-100%" }, 500);
    });
    $('#pageoneval').click(function () {
       $(".indexrightclose").show();
        $(".indexrightclose1").hide();
        $(".modelcontent").animate({ left: "0%" }, 500);
    });
});