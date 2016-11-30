$(document).ready(function () {
    Common.setTopMenu(2);;
    var selctedmode = $('#selectedMode').val();
    if(selctedmode=="1") {
        $('#selfIntroCont').show();
        $('#breadcrumbtxt').html("Self-Feedback");
    } else {
        $('#managerIntroCont').show();
        $('#breadcrumbtxt').html("Give Feedback");
    }
    var capMode = $('#selectedCap').val();
    if(capMode==0) {
        $('.capabilityremoves').hide();
    }
    //$('#beginFeedback').on('click', function () {
    //    alert(selctedmode);
    //    if (selctedmode == "1") {
    //        window.location.href = '../../Feedback/Detailedview';
    //    } else {
    //        window.location.href = '../../Feedback/ManagerFeedback';
    //    }
    //});
});