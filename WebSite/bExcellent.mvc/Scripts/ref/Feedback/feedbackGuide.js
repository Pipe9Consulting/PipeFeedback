$(document).ready(function () {
    //debugger;
    var getUserRating = feedbackGuide.GetUserRatingByPoeId();
    var capabilityMode = $('#capabilityMode').val();
    // alert(getUserRating);
    var selctedmode = $('#selectedMode').val();
    //alert(selctedmode);
    if (selctedmode == 1) {
        $('#selfFeedCont').show();
        $('#breadcrumbtxt').html("Self-Feedback");
    } else {
        $('#managerFeedContent').show();
        $('#breadcrumbtxt').html("Give Feedback");
    }
    //alert(capabilityMode + "-" + getUserRating);
    if (selctedmode == 1) {
        if (capabilityMode == 0 && getUserRating != 0) {
            var selfFeedGuide = '<p class="stepText">' +
                '<span class="stepNo">Step 1:</span> <span class="stepContent">Carefully read the Excellence Action at the top of each page. </span></p>' +
                ' <p class="stepText"><span class="stepChange2 stepNo">Step 2:</span> <span class="stepContent">Select how Frequently you perform this action in your role. Ask yourself, “How often do I demonstrate this Action? Is this something I am doing frequently or always, or do I do it only sometimes or not at all?” Remember, your responses are for development purposes only.</span></p> ' +
                ' <p class="stepText"><span class="stepChange3 stepNo">Step 3:</span> <span class="stepContent">When you are satisfied with your responses, click the “Next” button to proceed to the next Excellence Action. For now, click the “Next” button to begin Self-Feedback.</span></p>';
            $('#selfGuide').html(selfFeedGuide);
            $('.capabilityQuestion').hide();
            $('.wrapper').removeClass('ratingscaleSelfRemoved');
            $('.wrapper').removeClass('ratingscaleTeamRemoved');
            $('.wrapper').addClass('selfcapratingRemoved');
        } else if (capabilityMode == 0 && getUserRating == 0) {
            var selfFeedGuide1 = ' <p class="stepText">' +
                '<span class="stepNo">Step 1:</span> <span class="stepContent">Carefully read the Excellence Action at the top of each page. </span></p>' +
                ' <p class="selfImp stepText"><span class="stepNo">Step 2:</span> <span class="stepContent">Select how Important that Action is in your particular market using the Importance Scale. Ask yourself, “Is this Action critical for achieving success in my market?” </span></p>' +
                ' <p class="stepText"><span class="stepChange2 stepNo">Step 3:</span> <span class="stepContent">Select how Frequently you perform this action in your role. Ask yourself, “How often do I demonstrate this Action? Is this something I am doing frequently or always, or do I do it only sometimes or not at all?” Remember, your responses are for development purposes only.</span></p> ' +
                ' <p class="stepText"><span class="stepChange3 stepNo">Step 4:</span> <span class="stepContent">When you are satisfied with your responses, click the “Next” button to proceed to the next Excellence Action. For now, click the “Next” button to begin Self-Feedback.</span></p>';
            $('#selfGuide').html(selfFeedGuide1);
            $('.capabilityQuestion').hide();
            $('.rateQuestions,.rateOverall').show();
            $('.importanceArea,.rateOverall').show();
            $('.wrapper').removeClass('ratingscaleSelfRemoved');
            $('.wrapper').removeClass('ratingscaleTeamRemoved');
            $('.wrapper').addClass('selfcapRemoved');
        } else if (getUserRating == 0) {
            var selfFeedGuide2 = ' <p class="stepText">' +
                '<span class="stepNo">Step 1:</span> <span class="stepContent">Carefully read the Excellence Action at the top of each page. </span></p>' +
                ' <p class="selfImp stepText"><span class="stepNo">Step 2:</span> <span class="stepContent">Select how Important that Action is in your particular market using the Importance Scale. Ask yourself, “Is this Action critical for achieving success in my market?” </span></p>' +
                ' <p class="stepText"><span class="stepChange1 stepNo">Step 3:</span> <span class="stepContent">Select how Ready you are to demonstrate this Action. Ask yourself, “Have I been trained or coached to perform this Action? Do I have the knowledge or experience to perform this Action? Am I ready to do this?”</span></p>' +
                ' <p class="stepText"><span class="stepChange2 stepNo">Step 4:</span> <span class="stepContent">Select how Frequently you perform this action in your role. Ask yourself, “How often do I demonstrate this Action? Is this something I am doing frequently or always, or do I do it only sometimes or not at all?” Remember, your responses are for development purposes only.</span></p> ' +
                ' <p class="stepText"><span class="stepChange3 stepNo">Step 5:</span> <span class="stepContent">When you are satisfied with your responses, click the “Next” button to proceed to the next Excellence Action. For now, click the “Next” button to begin Self-Feedback.</span></p>';
            $('#selfGuide').html(selfFeedGuide2);
            $('.rateQuestions,.rateOverall').show();
            $('.importanceArea,.rateOverall').show();
            $('.OverallScale').removeClass('ratingRemoved');
            $('.wrapper').removeClass('ratingscaleSelfRemoved');
            $('.wrapper').removeClass('ratingscaleTeamRemoved');
        } else {
            var selfFeedGuide3 = ' <p class="stepText">' +
                '<span class="stepNo">Step 1:</span> <span class="stepContent">Carefully read the Excellence Action at the top of each page. </span></p>' +
                ' <p class="stepText"><span class="stepChange1 stepNo">Step 2:</span> <span class="stepContent">Select how Ready you are to demonstrate this Action. Ask yourself, “Have I been trained or coached to perform this Action? Do I have the knowledge or experience to perform this Action? Am I ready to do this?”</span></p>' +
                ' <p class="stepText"><span class="stepChange2 stepNo">Step 3:</span> <span class="stepContent">Select how Frequently you perform this action in your role. Ask yourself, “How often do I demonstrate this Action? Is this something I am doing frequently or always, or do I do it only sometimes or not at all?” Remember, your responses are for development purposes only.</span></p> ' +
                ' <p class="stepText"><span class="stepChange3 stepNo">Step 4:</span> <span class="stepContent">When you are satisfied with your responses, click the “Next” button to proceed to the next Excellence Action. For now, click the “Next” button to begin Self-Feedback.</span></p>';
            $('#selfGuide').html(selfFeedGuide3);
            $('.wrapper').removeClass('ratingscaleTeamRemoved');

        }
    } else {
        //alert(getUserRating);
        if (capabilityMode == 0 && getUserRating != 0) {
            var teamFeedGuide = '<p class="stepText"><span class="stepNo">Step 1:</span> <span class="stepContent">Carefully read the Excellence Action at the top of each page. </span></p>' +
               // ' <p class="selfImp stepText"><span class="stepNo">Step 2:</span> <span class="stepContent">Select how Important that Action is in your particular market using the Importance Scale. Ask yourself, “Is this Action critical for achieving success in my market? How important is it that my team members demonstrate this in their role?” </span></p>' +
               // ' <p class="stepText"><span class="stepChange1 stepNo">Step 2:</span> <span class="stepContent">Select how Ready your team member is to demonstrate this Action. Ask yourself, “Has he or she been trained or coached to perform this Action? Does he or she have the knowledge or experience to perform this Action? Is he or she ready to do this?”</span></p>' +
                ' <p class="stepText"><span class="stepChange2 stepNo">Step 2:</span> <span class="stepContent">Select how Frequently your team member performs this action in role. Ask yourself, “How often does he or she demonstrate this Action? Is this something he or she is doing frequently or always, or does he or she do it only sometimes or not at all?” Remember, your responses are for development purposes only.</span></p>' +
                ' <p class="stepText"><span class="stepChange3 stepNo">Step 3:</span> <span class="stepContent">When you are satisfied with your responses, click the “Next” button to proceed to the next Excellence Action. For now, click the “Next” button to begin Team-Feedback.</span></p>';
            $('#teamguide').html(teamFeedGuide);
            $('.capabilityQuestion').hide();
            $('.wrapper').removeClass('ratingscaleSelfRemoved');
            $('.wrapper').removeClass('ratingscaleTeamRemoved');
            $('.wrapper').addClass('teamcapratingRemoved');
            $('.capabilityArea').hide();
        } else if (capabilityMode == 0 && getUserRating == 0) {
            var teamFeedGuide1 = '<p class="stepText"><span class="stepNo">Step 1:</span> <span class="stepContent">Carefully read the Excellence Action at the top of each page. </span></p>' +
               ' <p class="selfImp stepText"><span class="stepNo">Step 2:</span> <span class="stepContent">Select how Important that Action is in your particular market using the Importance Scale. Ask yourself, “Is this Action critical for achieving success in my market? How important is it that my team members demonstrate this in their role?” </span></p>' +
               // ' <p class="stepText"><span class="stepChange1 stepNo">Step 2:</span> <span class="stepContent">Select how Ready your team member is to demonstrate this Action. Ask yourself, “Has he or she been trained or coached to perform this Action? Does he or she have the knowledge or experience to perform this Action? Is he or she ready to do this?”</span></p>' +
                ' <p class="stepText"><span class="stepChange2 stepNo">Step 3:</span> <span class="stepContent">Select how Frequently your team member performs this action in role. Ask yourself, “How often does he or she demonstrate this Action? Is this something he or she is doing frequently or always, or does he or she do it only sometimes or not at all?” Remember, your responses are for development purposes only.</span></p>' +
                ' <p class="stepText"><span class="stepChange3 stepNo">Step 4:</span> <span class="stepContent">When you are satisfied with your responses, click the “Next” button to proceed to the next Excellence Action. For now, click the “Next” button to begin Team-Feedback.</span></p>';
            $('#teamguide').html(teamFeedGuide1);
            $('.capabilityQuestion').hide();
            $('.rateQuestions,.rateOverall').show();
            $('.importanceArea,.rateOverall').show();
            $('.wrapper').removeClass('ratingscaleSelfRemoved');
            $('.wrapper').removeClass('ratingscaleTeamRemoved');
            $('.wrapper').addClass('teamcapRemoved');
            $('.capabilityArea').hide();
        } else if (getUserRating == 0) {
            var teamFeedGuide2 = '<p class="stepText"><span class="stepNo">Step 1:</span> <span class="stepContent">Carefully read the Excellence Action at the top of each page. </span></p>' +
              ' <p class="selfImp stepText"><span class="stepNo">Step 2:</span> <span class="stepContent">Select how Important that Action is in your particular market using the Importance Scale. Ask yourself, “Is this Action critical for achieving success in my market? How important is it that my team members demonstrate this in their role?” </span></p>' +
              ' <p class="stepText"><span class="stepChange1 stepNo">Step 3:</span> <span class="stepContent">Select how Ready your team member is to demonstrate this Action. Ask yourself, “Has he or she been trained or coached to perform this Action? Does he or she have the knowledge or experience to perform this Action? Is he or she ready to do this?”</span></p>' +
               ' <p class="stepText"><span class="stepChange2 stepNo">Step 4:</span> <span class="stepContent">Select how Frequently your team member performs this action in role. Ask yourself, “How often does he or she demonstrate this Action? Is this something he or she is doing frequently or always, or does he or she do it only sometimes or not at all?” Remember, your responses are for development purposes only.</span></p>' +
               ' <p class="stepText"><span class="stepChange3 stepNo">Step 5:</span> <span class="stepContent">When you are satisfied with your responses, click the “Next” button to proceed to the next Excellence Action. For now, click the “Next” button to begin Team-Feedback.</span></p>';
            $('#teamguide').html(teamFeedGuide2);
            $('.rateQuestions,.rateOverall').show();
            $('.importanceArea,.rateOverall').show();
            $('.OverallScale').removeClass('ratingRemoved');
            $('.wrapper').removeClass('ratingscaleSelfRemoved');
            $('.wrapper').removeClass('ratingscaleTeamRemoved');
        } else {
            var teamFeedGuide3 = '<p class="stepText"><span class="stepNo">Step 1:</span> <span class="stepContent">Carefully read the Excellence Action at the top of each page. </span></p>' +
             // ' <p class="selfImp stepText"><span class="stepNo">Step 2:</span> <span class="stepContent">Select how Important that Action is in your particular market using the Importance Scale. Ask yourself, “Is this Action critical for achieving success in my market? How important is it that my team members demonstrate this in their role?” </span></p>' +
              ' <p class="stepText"><span class="stepChange1 stepNo">Step 2:</span> <span class="stepContent">Select how Ready your team member is to demonstrate this Action. Ask yourself, “Has he or she been trained or coached to perform this Action? Does he or she have the knowledge or experience to perform this Action? Is he or she ready to do this?”</span></p>' +
               ' <p class="stepText"><span class="stepChange2 stepNo">Step 3:</span> <span class="stepContent">Select how Frequently your team member performs this action in role. Ask yourself, “How often does he or she demonstrate this Action? Is this something he or she is doing frequently or always, or does he or she do it only sometimes or not at all?” Remember, your responses are for development purposes only.</span></p>' +
               ' <p class="stepText"><span class="stepChange3 stepNo">Step 4:</span> <span class="stepContent">When you are satisfied with your responses, click the “Next” button to proceed to the next Excellence Action. For now, click the “Next” button to begin Team-Feedback.</span></p>';
            $('#teamguide').html(teamFeedGuide3);
            if (selctedmode == 1) {
                $('.wrapper').removeClass('ratingscaleTeamRemoved');
            } else {
                $('.wrapper').removeClass('ratingscaleSelfRemoved');
            }
        }
    }
    $('.rateSlider').slider({
        min: 0,
        max: 4,
        range: "min",
        value: 0,
        slide: function (event, ui) {
            if (ui.value != 0) {
                $(this).find('.ui-slider-range').removeClass('sliderdivRateQuestion1');
                $(this).find('.ui-slider-range').removeClass('sliderdivRateQuestion2');
                $(this).find('.ui-slider-range').removeClass('sliderdivRateQuestion3');
                $(this).find('.ui-slider-range').removeClass('sliderdivRateQuestion4');
            }
            if (ui.value == 1) {
                $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion1');
            } else if (ui.value == 2) {
                $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion2');
            } else if (ui.value == 3) {
                $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion3');
            } else if (ui.value == 4) {
                $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion4');
            }
            if (ui.value == 0) {
                event.preventDefault();
            }
        }
    });
    $('.capSlider').slider({
        min: 0,
        max: 4,
        range: "min",
        value: 0,
        slide: function (event, ui) {
            if (ui.value != 0) {
                $(this).find('.ui-slider-range').removeClass('sliderdivCapQuestion1');
                $(this).find('.ui-slider-range').removeClass('sliderdivCapQuestion2');
                $(this).find('.ui-slider-range').removeClass('sliderdivCapQuestion3');
                $(this).find('.ui-slider-range').removeClass('sliderdivCapQuestion4');
            }
            if (ui.value == 1) {
                $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion1');
            } else if (ui.value == 2) {
                $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion2');
            } else if (ui.value == 3) {
                $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion3');
            } else if (ui.value == 4) {
                $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion4');
            }
            if (ui.value == 0) {
                event.preventDefault();
            }
        }
    });
    $('.freqSlider').slider({
        min: 0,
        max: 4,
        range: "min",
        value: 0,
        slide: function (event, ui) {
            if (ui.value != 0) {
                $(this).find('.ui-slider-range').removeClass('sliderdiv1');
                $(this).find('.ui-slider-range').removeClass('sliderdiv2');
                $(this).find('.ui-slider-range').removeClass('sliderdiv3');
                $(this).find('.ui-slider-range').removeClass('sliderdiv4');
            }
            if (ui.value == 1) {
                $(this).find('.ui-slider-range').addClass('sliderdiv1');
            } else if (ui.value == 2) {
                $(this).find('.ui-slider-range').addClass('sliderdiv2');
            } else if (ui.value == 3) {
                $(this).find('.ui-slider-range').addClass('sliderdiv3');
            } else if (ui.value == 4) {
                $(this).find('.ui-slider-range').addClass('sliderdiv4');
            }
            if (ui.value == 0) {
                event.preventDefault();
            }
        }
    });
});

var feedbackGuide = {
    GetUserRatingByPoeId: function () {
        var resp;
        Common.ajaxsync({
            url: '../../Feedback/GetUserRating',
            success: function (response) {
                // alert('ggg');
                resp = response;
                //alert(resp);
            },
            error: function (err) {
                resp = response;
            }
        });
        return resp;
    },
};