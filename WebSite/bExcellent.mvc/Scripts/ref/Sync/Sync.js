$(function () {
    //default Text for chart view
    $('.addmember').text('Chart View');

    //
    $(".stand li").click(function () {
        $(this).addClass("selected");
        $(this).siblings().removeClass("selected");
    });
    $('.addmember').click(function () {
        $(this).toggleClass('addselect');
        $('.sendinv').toggle();
        $("#chartview").addClass("selected");
    });
    $('.sendinv li').click(function () {
        $('.sendinv li').addClass('send');
        $('.sendinv').hide();
        $('.addmember').removeClass('addselect');
    });
    $(function () {
        //$('#bn1').click(function () {
        //    $('.prev,.nxt').hide();
        //    $('#p2,#bn2').show();
        //    $('#q1').animate({ 'margin-left': '-100%' }, { duration: 1000 });
        //    $('#pagetxt').html(' Page 2 of 2');
        //});
        //$('#p2').click(function () {
        //    $('.prev,.nxt').hide();
        //    $('#q1').show("slow");
        //    $('#p1,#bn1').show();
        //    $('#q1').animate({ 'margin-left': '0px' }, { duration: 1000 });
        //    $('#pagetxt').html(' Page 1 of 2');
        //});

        $('#mngr1').click(function () {
            $('#manager1').show();
            $('#manager2, #slm1, #peer1, #peer2, #cust1').hide();
        });
        $('#mngr2').click(function () {
            $('#manager2').show();
            $('#manager1, #slm1, #peer1, #peer2, #cust1').hide();
        });
        $('#slmtile').click(function () {
            $('#slm1').show();
            $('#manager1, #manager2, #peer1, #peer2, #cust1').hide();
        });
        $('#peer1tile').click(function () {
            $('#peer1').show();
            $('#manager1, #manager2, #slm1, #peer2, #cust1').hide();
        });
        $('#peer2tile').click(function () {
            $('#peer2').show();
            $('#manager1, #manager2, #slm1, #peer1, #cust1').hide();
        });
        $('#custtile').click(function () {
            $('#cust1').show();
            $('#manager1, #manager2, #slm1, #peer1, #peer2').hide();
        });

    });
    $('#pagetwo').click(function() {
        $(".indexrightclose, .indexclose").hide();
        $(".indexrightarrow ,.indexrightclose1").show();
        $(".modelcontent").animate({ left: "-100%" }, 500);
    });
    $('#pageoneval').click(function() {
        //$(".indexclose").show();
        $(".indexrightclose").show();
        $(".indexrightclose1").hide();
        //$(".indexrightclose, .indexrightclose1").hide();
        //$(".indexright").animate({ right: "-33.5%" }, 500);
        $(".modelcontent").animate({ left: "0%" }, 500);
    });
});