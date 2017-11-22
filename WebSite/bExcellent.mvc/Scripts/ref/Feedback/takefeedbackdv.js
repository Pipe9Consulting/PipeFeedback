var details_feedback = {
    getNumberofLines: function (height) {
        var slideHeight = 0;

        if (height > 1150) slideHeight = 54;
        else if (height > 950) slideHeight = 41;
        else if (height < 900) slideHeight = 35;
        else slideHeight = 35;

        return slideHeight;
    },
    loadModuleAndPoeContent: function (option) {
        Common.ajaxsync({
            url: option.url,
            data: (option.data) ? option.data : null,
            //beforeSend: function () {
            //    $("#status").fadeIn();
            //    $("#preloader").delay(100).fadeIn("slow");
            //},
            success: function (response) {
                var html = "";
                //$("#status").fadeOut();
                //$("#preloader").delay(100).fadeOut("slow");
                if (response.ModuleOrderNumber == 0) {
                    var htmlDiv = "<img src='../../Images/KessakuImage/" + $('#selectedpoe').val().replace("/", "") + "_pane.png'>";
                    $('#poeintroslidecount').html(response.ModuleIntroSlideCount);
                    $('#poeintro0').html(htmlDiv + response.ModuleIntro);
                    $('#poeintro1').html(response.ModuleIntro1);
                    $('#poeintro2').html(response.ModuleIntro2);
                    $('#poeintro3').html(response.ModuleIntro3);
                    $('#poeintro4').html(response.ModuleIntro4);
                    $('#poeintro5').html(response.ModuleIntro5);

                    $('#traitsslidecount').html(response.KeyActionSlideCount);
                    $('#traits0').html(response.KeyAction);
                    $('#traits1').html(response.KeyAction1);
                    $('#traits2').html(response.KeyAction2);
                    $('#traits3').html(response.KeyAction3);
                    $('#traits4').html(response.KeyAction4);
                    $('#traits5').html(response.KeyAction5);
                    $('#profilesscroll').html($('#poeintro0').html());
                    $('#profilesscroll').slimScroll();
                    //$('.practiceAreaIntro').html($('#moduleintro0').html());
                    //$('.keyActions').html($('#keyaction0').html());
                }
                else {
                    var sHeight = window.innerHeight;
                    var noofLines = details_feedback.getNumberofLines(sHeight);
                    $('#keyaction0').html('<li><h2>Key Actions</h2><ul>' + response.KeyAction + '</ul></li>');
                    $('#dv').css("visibility", "visible");
                    //var keyActionHtml = $('#keyaction0').find('li');
                    //var m = 0, n = 0;
                    //var keyLength = 0;
                    //var keyhtml = "";
                    //for (; m < keyActionHtml.length;) {
                    //    keyLength = keyLength + (Math.ceil(keyActionHtml[m].innerText.length / 45) + 1);
                    //    if (keyLength <= noofLines) {
                    //        keyhtml = keyhtml + "<li>" + keyActionHtml[m].innerText + "</li>";
                    //        m++;
                    //    } else {
                    //        $('#keyaction' + n).empty().html(keyhtml);
                    //        keyhtml = "";
                    //        keyLength = 0;
                    //        n++;
                    //    }
                    //}
                    //$('#keyaction' + n).html(keyhtml);
                    //for (var i = 0; i < n ; i++) {
                    //    $('#snap' + (2 + i)).addClass('content4').addClass('contentSnap');
                    //}
                    //$('#keyactionslidecount').html(n);

                    //$('#keyactionslidecount').html(response.KeyActionSlideCount);
                    //$('#keyaction0').html(response.KeyAction);
                    //$('#keyaction1').html(response.KeyAction1);
                    //$('#keyaction2').html(response.KeyAction2);
                    //$('#keyaction3').html(response.KeyAction3);
                    //$('#keyaction4').html(response.KeyAction4);
                    //$('#keyaction5').html(response.KeyAction5);
                    moduleName = $('#poemodule>li.selected').find('p').html();
                    imgSrc = $('#selectedpoe').val().replace("/", "") + response.ModuleOrderNumber;

                    $('#moduleintroslidecount').html(response.ModuleIntroSlideCount);
                    $('#moduleintro0').html('<div class="practiceAreaTitle"><h2>' + moduleName + '</h2><img src="../Images/icons/' + imgSrc + '.png" /></div>' + response.ModuleIntro);
                    $('#moduleintro1').html(response.ModuleIntro1);
                    $('#moduleintro2').html(response.ModuleIntro2);
                    $('#moduleintro3').html(response.ModuleIntro3);
                    $('#moduleintro4').html(response.ModuleIntro4);
                    $('#moduleintro5').html(response.ModuleIntro5);
                    $('#profilesscroll').html($('#poeintro0').html());
                    $('#profilesscroll').slimScroll();
                    //$('.practiceAreaIntro').html($('#moduleintro0').html());
                    //$('.keyActions').html($('#keyaction0').html());
                }
            },
            error: function (err) {
                var errCode = err.status;
                var errText = err.statusText;
                // window.location = "../Home/ErrorMsg";
            }
        });
    },
    loadLastSavedQuestion: function () {
        Common.ajaxsync({
            url: "../../Feedback/GetLastSavedQuestion",
            //beforeSend: function () {
            //    $("#status").fadeIn();
            //    $("#preloader").delay(100).fadeIn("slow");
            //},
            success: function (response) {
                //$("#status").fadeOut();
                //$("#preloader").delay(100).fadeOut("slow");
                $('#fbStatus').val(response.FeedBackStatus);
                $('#lastSavedQuestion').val(response.QuestionId);
                $('#lastSavedModuleId').val(response.ModuleId);
                $('#lastSavedModuleOrder').val(response.ModuleOrder);
                $('#lastSavedQuestionOrder').val(response.QuestionOrder);
            },
            error: function (err) {
                //window.location = "../Home/ErrorMsg";
            }
        });
        return parseInt($('#selectedanswer').val());
    },


    //Load Questions
    loadDetailViewPAQuestions: function (option) {
        debugger;
        //alert('am in');
        // details_feedback.loadModuleAndPoeContent({ url: '../../Feedback/GetIntoContent', data: { 'moduleId': parseInt(option.data.moduleId) } });
        $('#moduleid').val(option.data.moduleId);
        Common.ajaxsync({
            url: option.url,
            data: (option.data) ? option.data : null,
            //beforeSend: function () {
            //    $("#status").fadeIn();
            //    $("#preloader").delay(100).fadeIn("slow");
            //},
            success: function (response) {
                //debugger;
                //$("#status").fadeIn();
                //$("#preloader").delay(100).fadeIn("slow");
                var freqhtml = "<div class='scaleDefPart'> <div class='scaleDefMenu'> <ul id='definitions' class='definitionView'> <li class='impt_menu select_impt_menu'><span><img src='../../Images/Feedback/menuSelect_arrow.png' /></span></li>" +
                    " <li class='cpty_menu'></li> <li class='frqt_menu'></li> </ul> </div> <div class='importanceDef' id='importanceDef'>" +
                    " <h2>Importance Definitions</h2> <div class='scale_dfn'> <div class='scale_img'> <img alt='Rarely' src='../../Images/Feedback/Icon/importants1.png'> </div>" +
                    " <div class='scale_cnt'> <h3>Not Important</h3> <p>Not important for success in your market.</p> </div> </div> <div class='scale_dfn'> <div class='scale_img'> <img alt='inconsistently' src='../../Images/Feedback/Icon/importants2.png'> </div>" +
                    " <div class='scale_cnt'> <h3>Somewhat Important</h3> <p>Somewhat important for success in your market.</p> </div> </div> <div class='scale_dfn'> <div class='scale_img'> <img alt='frequently' src='../../Images/Feedback/Icon/importants3.png'> </div> " +
                    "<div class='scale_cnt'> <h3>Important</h3> <p>Important for success in your market.</p> </div> </div> <div class='scale_dfn'> <div class='scale_img'> <img alt='Always' src='../../Images/Feedback/Icon/importants4.png'> </div> " +
                    "<div class='scale_cnt'> <h3>Critical</h3> <p>Critical for success in your market.</p> </div> </div> </div> <div class='capabilityDef' id='capabilityDef'> <h2>Capability Definitions</h2> <div class='scale_dfn'> <div class='scale_img'> <img alt='Rarely' src='../../Images/Feedback/Icon/capability2.png'> </div> " +
                    "<div class='scale_cnt'> <h3>Not Ready</h3> <p>I am not ready to demonstrate this Excellence Action.</p> </div> </div> " +
                    "<div class='scale_dfn'> <div class='scale_img'> <img alt='inconsistently' src='../../Images/Feedback/Icon/capability1.png'> </div>" +
                    " <div class='scale_cnt'> <h3>Somewhat Ready</h3> <p>I am somewhat ready to demonstrate this Excellence Action.</p> </div> </div> " +
                    "<div class='scale_dfn'> <div class='scale_img'> <img alt='frequently' src='../../Images/Feedback/Icon/capability3.png'> </div>" +
                    " <div class='scale_cnt'> <h3>Ready</h3> <p>I am ready to demonstrate this Excellence Action.</p> </div> </div> <div class='scale_dfn'> " +
                    "<div class='scale_img'> <img alt='Always' src='../../Images/Feedback/Icon/capability4.png'> </div> " +
                    "<div class='scale_cnt'> <h3>Very Ready</h3> <p>I am very ready to demonstrate this Excellence Action.</p> </div> </div> </div>" +
                    " <div class='freqDef' id='freqDef'> <h2>Frequency Definitions</h2> <div class='scale_dfn'> " +
                    "<div class='scale_img'> <img alt='Rarely' src='../../Images/Feedback/Icon/frequency1.png'> </div> <div class='scale_cnt'> <h3>Never</h3> <p>I never demonstrate this Excellence Action.</p> </div> </div>" +
                    " <div class='scale_dfn'> <div class='scale_img'> <img alt='inconsistently' src='../../Images/Feedback/Icon/frequency2.png'> </div> " +
                    "<div class='scale_cnt'> <h3>Sometimes</h3> <p>I sometimes demonstrate this Excellence Action.</p> </div> </div> " +
                    "<div class='scale_dfn'> <div class='scale_img'> <img alt='frequently' src='../../Images/Feedback/Icon/frequency3.png'> </div> <div class='scale_cnt'> <h3>Frequently</h3> <p>I frequently demonstrate this Excellence Action.</p> </div> </div>" +
                    " <div class='scale_dfn'> <div class='scale_img'> <img alt='Always' src='../../Images/Feedback/Icon/frequency4.png'> </div> <div class='scale_cnt'> <h3>Always</h3> <p>I always demonstrate this Excellence Action.</p> </div> </div> </div> </div>";
                //var freqhtml = '<div class="frequencydiv">' +
                //    '<div class="importanceDefArea" style="display:none"><h2>Importance Definitions</h2><div class="frequency">' +
                //    '<div class="frq_dfn"><div class="frq_img"><img src="../../Images/Start/importance1.png" alt="Rarely" /></div><div class="frq_cnt"><h3>Not Important</h3><p>Unimportant for success in your market.</p></div></div></div>' +
                //    '<div class="frequency"><div class="frq_dfn"><div class="frq_img"><img src="../../Images/Start/importance2.png" alt="inconsistently" /></div><div class="frq_cnt"><h3>Somewhat Important</h3><p>Somewhat important for success in your market.</p></div></div></div>' +
                //    '<div class="frequency"><div class="frq_dfn"><div class="frq_img"><img src="../../Images/Start/importance3.png" alt="frequently" /></div><div class="frq_cnt"><h3>Important</h3><p>Important for success in your market.</p></div></div></div>' +
                //    '<div class="frequency"><div class="frq_dfn"><div class="frq_img"><img src="../../Images/Start/importance4.png" alt="Always" /></div><div class="frq_cnt"><h3>Very Important</h3><p>Very important for success in your market.</p></div></div></div>' +
                //    '</div>' +
                //    '<div class="frequencyDefArea showOnlyfrequecy"><h2>Frequency Definitions</h2><div class="frequency">' +
                //    '<div class="frq_dfn"><div class="frq_img"><img src="../../Images/rarely.png" alt="Rarely" /></div><div class="frq_cnt"><h3>Rarely</h3><p>The Excellence Action is rarely demonstrated and significant improvement is required.</p></div></div></div>' +
                //    '<div class="frequency"><div class="frq_dfn"><div class="frq_img"><img src="../../Images/inconsistently.png" alt="inconsistently" /></div><div class="frq_cnt"><h3>Inconsistently</h3><p>The Excellence Action is inconsistently demonstrated and improvement is required.</p></div></div></div>' +
                //    '<div class="frequency"><div class="frq_dfn"><div class="frq_img"><img src="../../Images/frequently.png" alt="frequently" /></div><div class="frq_cnt"><h3>Frequently</h3><p>The Excellence Action is frequently demonstrated, but further improvement is possible.</p></div></div></div>' +
                //    '<div class="frequency"><div class="frq_dfn"><div class="frq_img"><img src="../../Images/always.png" alt="Always" /></div><div class="frq_cnt"><h3>Always</h3><p>The Excellence Action is always demonstrated. Excellence has been achieved.</p></div></div></div>' +
                //    '</div> ';
                var userratingcount = 0;
                //var userratingcount = details_feedback.GetUserRatingByPoeId(response[0].QuestionId);
                $('#userratingcount').val(userratingcount);
                var selectPoe = parseInt($('#selectPoe').val());
                var surveyHtml = "";
                var completedhtml = '<li class="feedbackcomplete"><div class="OverallLastSurvey">' +
                       '<div class="feedbackIntial"><h1>Feedback Completed</h1>' +
                        '<p>Congratulations! You have successfully completed Self-Feedback. Self-Feedback is only used for development purposes, so please confirm, by typing your name into the signature box, that your responses are as honest and objective as possible. If you need to go back to review or revise any of your responses, you may do so now. Once you are satisfied, proceed by clicking “Submit.” Thank you for your participation!</p>' +
                        '<p><b>' + $('#loggedinUser').html().trim() + '</b></p><input type="text" id="fbinitial" name="textbox"/><p><span></span></p><a onclick="details_feedback.submitfeedback();">Submit</a></div></div></li>';
                if (selectPoe == 26 && userratingcount == 0) {
                    completedhtml = '<li class="feedbackcomplete"><div class="OverallLastSurvey"><div class="Lastsurveysrea"><h3>For demographic purposes, we’d like to gather some additional information that will help us to understand the experience and background of our Sales teams as a whole. Please select the best response for each question.</h3>' +
                        '<div class="LastSurveyQuestions"><p>1.	How many years of Sales experience do you have?</p><select id="survQuestion1" onchange="SaveAnswer($(this))" data-question="1"> <option value="0">Select</option><option value="Less than 1">Less than 1</option> <option value="1">1</option> <option value="2">2</option> <option value="3-5">3-5</option> <option value="More than 5">More than 5</option> </select></div>' +
                        '<div class="LastSurveyQuestions"><p>2.	How many years of Search Advertising experience do you have?</p><select id="survQuestion2" onchange="SaveAnswer($(this))" data-question="2"><option value="0">Select</option> <option value="Less than 1">Less than 1</option> <option value="1">1</option> <option value="2">2</option> <option value="3-5">3-5</option> <option value="More than 5">More than 5</option> </select></div>' +
                        '<div class="LastSurveyQuestions"><p>3.	Prior to taking your current role, which of the following best describes your most recent employer?</p><select id="survQuestion3" onchange="SaveAnswer($(this))" data-question="3"><option value="0">Select</option> <option value="Advertising Agency">Advertising Agency</option> <option value="Direct Advertiser">Direct Advertiser</option> <option value="Competitor">Competitor</option> <option value="Other role at Microsoft">Other role at Microsoft</option> <option value="Other">Other</option> </select></div></div>' +
                        '<div class="LastSurveyQuestions"><p>4.	How many years of People Management experience do you have?</p><select id="survQuestion4" onchange="SaveAnswer($(this))" data-question="4"> <option value="0">Select</option><option value="Less than 1">Less than 1</option> <option value="1">1</option> <option value="2">2</option> <option value="3-5">3-5</option> <option value="More than 5">More than 5</option> </select></div></div>' +
                        '<div class="feedbackIntial"><h1>Feedback Completed</h1>' +
                        '<p>Congratulations! You have successfully completed Self-Feedback. Self-Feedback is only used for development purposes, so please confirm, by typing your name into the signature box, that your responses are as honest and objective as possible. If you need to go back to review or revise any of your responses, you may do so now. Once you are satisfied, proceed by clicking “Submit.” Thank you for your participation!</p>' +
                        '<p><b>' + $('#loggedinUser').html().trim() + '</b></p><input type="text" id="fbinitial" name="textbox"/><p><span></span></p><a onclick="details_feedback.submitfeedback();">Submit</a></div></div></li>';
                } else if (selectPoe >= 18 && selectPoe <= 25 && userratingcount == 0) {
                    completedhtml = '<li class="feedbackcomplete"><div class="OverallLastSurvey"><div class="Lastsurveysrea"><h3>For demographic purposes, we’d like to gather some additional information that will help us to understand the experience and background of our Sales teams as a whole. Please select the best response for each question.</h3>' +
                       '<div class="LastSurveyQuestions"><p>1.	How many years of Sales experience do you have?</p><select id="survQuestion1" onchange="SaveAnswer($(this))" data-question="1"><option value="0">Select</option> <option value="Less than 1">Less than 1</option> <option value="1">1</option> <option value="2">2</option> <option value="3-5">3-5</option> <option value="More than 5">More than 5</option> </select></div>' +
                       '<div class="LastSurveyQuestions"><p>2.	How many years of Search Advertising experience do you have?</p><select id="survQuestion2" onchange="SaveAnswer($(this))" data-question="2"><option value="0">Select</option> <option value="Less than 1">Less than 1</option> <option value="1">1</option> <option value="2">2</option> <option value="3-5">3-5</option> <option value="More than 5">More than 5</option> </select></div>' +
                       '<div class="LastSurveyQuestions"><p>3.	Prior to taking your current role, which of the following best describes your most recent employer?</p><select id="survQuestion3" onchange="SaveAnswer($(this))" data-question="3"><option value="0">Select</option> <option value="Advertising Agency">Advertising Agency</option> <option value="Direct Advertiser">Direct Advertiser</option> <option value="Competitor">Competitor</option> <option value="Other role at Microsoft">Other role at Microsoft</option> <option value="Other">Other</option> </select></div></div>' +
                       '<div class="feedbackIntial"><h1>Feedback Completed</h1>' +
                       '<p>Congratulations! You have successfully completed Self-Feedback. Self-Feedback is only used for development purposes, so please confirm, by typing your name into the signature box, that your responses are as honest and objective as possible. If you need to go back to review or revise any of your responses, you may do so now. Once you are satisfied, proceed by clicking “Submit.” Thank you for your participation!</p>' +
                       '<p><b>' + $('#loggedinUser').html().trim() + '</b></p><input type="text" id="fbinitial" name="textbox"/><p><span></span></p><a onclick="details_feedback.submitfeedback();">Submit</a></div></div></li>';

                    surveyHtml = '<li class="surveyAreas"><h2>Product Knowledge Survey</h2>' +
                        '<p>Thank you for completing the “Capability Inventory” portion of Self-Feedback. To complete Self-Feedback, we’ll transition quickly to the “Product Knowledge” portion. As mentioned in the kickoff sessions, your responses WILL NOT be shared with your manager. We will only review your responses in aggregate so that we can help to enable you to service your customers as effectively as possible. All questions are directly tied to Opportunities that are surfaced via UCM scoring and are highly relevant to the types of products, pitches, and execution that you encounter today.</p>' +
                        '<p>Instructions are at the top of the next page – please use the scroll bar to complete all questions. </p>' +
                   '<p>Thanks for your efforts in completing the process fully to enable us to provide the most relevant outcomes in support of your teams.</p></li>' +
                   '<li class="surveyQuestions" id="surveyQues"></li>';
                }


                var html = "";
                var slidehtml = "";
                var modord = option.moduleorder - 2;
                var totalCompletedQuestions = 0;
                if (modord > 0)
                    Common.ajaxsync({
                        //url: option.url,
                        //data: { moduleId: (modord == 0 ? option.data.moduleId : (parseInt(option.data.moduleId) - (y + 1))) },
                        url: '../../Feedback/GetPracticeArea',
                        success: function (response) {
                            for (var y = 1; y <= modord; y++) {
                                totalCompletedQuestions = totalCompletedQuestions + response[y].Questions.length;
                            }
                        },
                        error: function (err) {
                        }
                    });

                var totque = response.length;
                $('#totalQuestionsformodule').val(response.length);
                var moduleorder = $('#lastSavedModuleOrder').val();
                var moduleids = $('#lastSavedModuleId').val();
                var currentPosition = $('#firstTime').val();
                $('#currentmoduleOrder').val(option.moduleorder);
                $('#currentquestionid').val(response[0].QuestionId);
                //debugger;
                if (currentPosition == 1) {
                    var loadedPa2 = $('#target ul').html();
                    var newcompletedPa2 = '';
                    if (moduleorder != 0) {
                        var t = parseInt(moduleorder);
                        var l = parseInt(moduleids);
                        for (var m = moduleorder; m >= 1; m--) {
                            var img = $('#selectedpoe').val().replace("/", "") + m;
                            $('#li' + t).attr('onclick', 'details_feedback.loadcompletedPAQuestion(' + l + ',' + t + ')');
                            newcompletedPa2 = "<li id=lit" + t + "><a href='javascript:details_feedback.loadcompletedPAQuestion(" + l + "," + t + ")'><span><img src='../../Images/icons/" + img + "-small.png' /></span><p>" + $('#li' + m).text() + "</p></a></li>" + newcompletedPa2;
                            t = t - 1;
                            l = l - 1;
                        }
                    }
                    $('#target ul').html(loadedPa2 + newcompletedPa2);
                    $('#firstTime').val(0);
                }

                //var userratingcount = details_feedback.GetUserRatingByPoeId(response[0].QuestionId);
                for (var i = 0; i < response.length; i++) {
                    var quetionid = response[i].QuestionOrderNumber;
                    //var questaken = (modord * totque) + quetionid;
                    var questaken = totalCompletedQuestions + quetionid;
                    var ratinghtml = "<div class='rateThisQuestion'><div class='SI3 rateQuestions'><span>Importance Scale: </span>Select how important this Excellence Action is in your market</div>" +
                            "<div class='rateOverall'><div class='rateImg'><img src='../../Images/Feedback/imp_icon.png' width='61' height='61' alt='User'></div> <div class='impscale_bg' id='Rno" + response[i].QuestionOrderNumber + "' data-question=" + response[i].QuestionId + " data-moduleid=" + option.data.moduleId + " data-rating='0'> <div class='impscale_over'> <button class='impbtn1' data-order='1'>Not Important</button> <button class='impbtn2' data-order='2'>Somewhat Important</button> <button class='impbtn3' data-order='3'>Important</button> <button class='impbtn4' data-order='4'>Critical</button> </div> <div class='impscale_handle'></div> <div class='impadddiv'></div> </div>" +
                       "</div><div class='clearfix'></div>";

                    var SideBarContent = response[i].SideBarTitle;
                    var questionhtml = " <li id='q" + response[i].QuestionOrderNumber + "' value=" + questaken + " " + (i < 5 ? "" : "style='display:none'") + "><div class='questionPart'> <div class='questiontaken' >Action " + questaken + "/" + $('#totalQuestions').val() +
                            "</div>" +
                        //"<div class='timetakencontainer'><div class='timetaken'>| Time taken: </div><div class='counterHour'>" + (($('#lastsavedHours').val() != "") ? $('#lastsavedHours').val() : "00") + "</div><div class='collan'>:</div><div class='counterMin'>" + (($('#lastsavedMinutes').val() != "") ? $('#lastsavedMinutes').val() : "00") + "</div><div class='collan'>:</div><div class='counterSec'>" + (($('#lastsavedSeconds').val() != "") ? $('#lastsavedSeconds').val() : "00") + "</div></div>" +
                            " <div class='clr'></div><div class='qn'>" + response[i].QuestionOrderNumber + "</div>" +
                            "<div class='questionarea detailedarea'>" +
                            //"<h2>" + response[i].QuetionText + "</h2>" +
                            "<p>" + SideBarContent.replace('<strong>', '').replace('</strong>', '').replace('<p>', '').replace('</p>', '').replace('In Detail:', '') + "</p>"
                    if (userratingcount == 0) {
                        questionhtml += ratinghtml;
                    } else {
                        questionhtml += "<div class='rateThisQuestion'>";
                    }
                    questionhtml += "<div class='capabilityQuestion'><div class='SI3 capabalititys'><span>Capability Scale: </span>Select how ready you are to demonstrate this Excellence Action</div>" +
                            "<div class='capOverall'><div class='capImg'><img src='../../Images/Feedback/cap_icon.png' width='61' height='61' alt='User'></div><div class='capscale_bg' id='capability" + response[i].QuestionOrderNumber + "' data-question=" + response[i].QuestionId + " data-moduleid=" + option.data.moduleId + " data-answer='0'> <div class='capscale_over'> <button class='capbtn1'>NOT Ready</button> <button class='capbtn2'>Somewhat Ready</button> <button class='capbtn3'>Ready</button> <button class='capbtn4'>Very Ready</button> </div> <div class='capscale_handle'></div> <div class='capadddiv'></div> </div>" +
                            "</div></div><div class='clearfix'></div><div class='sliderimg'><div class='SI3'><span>Frequency Scale: </span>Select how consistently you demonstrate this Excellence Action</div>" +
                    "<div class='freqOverall'><div class='freqImg'><img src='../../Images/Feedback/frq_icon.png' width='61' height='61' alt='User' ></div>" +
                        "<div class='freqscale_bg' id='Qno" + response[i].QuestionOrderNumber + "' data-question=" + response[i].QuestionId + " data-moduleid=" + option.data.moduleId + " data-answer='0'> <div class='freqscale_over'> <button class='freqbtn1'>Never</button> <button class='freqbtn2'>SOMEtimes</button> <button class='freqbtn3'>Frequently</button> <button class='freqbtn4'>Always</button> </div> <div class='freqscale_handle'></div> <div class='freqadddiv'></div> </div>" +

                    "</div></div></div></div><div class='clearfix'></div>" + freqhtml;

                    var stringhidden = "";
                    //debugger;
                    if (i != 0) {
                        slidehtml = slidehtml + "<a href='#' class='prevfb' id='p" + response[i].QuestionOrderNumber + "' onclick='details_feedback.prevclick(" + response[i].QuestionOrderNumber + "," + response[i - 1].QuestionOrderNumber + ")'>Previous</a> ";
                    }
                    else {
                        slidehtml = slidehtml + "<a href='#' class='prevfb' id='p" + response[i].QuestionOrderNumber + "' onclick='details_feedback.prevclick(0," + response[i].QuestionOrderNumber + ")'>Previous</a> ";
                    }
                    if (i < response.length - 1) {
                        slidehtml = slidehtml + " <a href='#' class='nxtfb' id='bn" + response[i].QuestionOrderNumber + "' onclick='details_feedback.nextclick(" + response[i].QuestionOrderNumber + "," + response[i + 1].QuestionOrderNumber + ")'>Next</a>";
                    } else {
                        // alert(parseInt($('#currentmoduleOrder').val()));
                        // if (parseInt($('#currentmoduleOrder').val()) == parseInt($('#aboutContent li').length) + 1) {

                        //}
                        slidehtml = slidehtml + " <a href='#' class='nxtfb' id='bn" + response[i].QuestionOrderNumber + "' onclick='details_feedback.loadNextContent()'>Next</a>";
                        if ($('#surveyMode').val() == 1) {
                            slidehtml = slidehtml + "<a href='#' class='prevfb' id='prevWelcome' onclick='details_feedback.loadlastansweredquestion()'>Previous</a><a href='#' class='nxtfb' id='nextWelcome' onclick='details_feedback.LoadSurveyContent()'>Next</a>" +
                                "<a href='#' class='prevfb' id='prevSurvey' onclick='details_feedback.LoadPrevWelcome()'>Previous</a><a href='#' class='nxtfb' id='nextSurvey' onclick='details_feedback.LoadIntial()'>Next</a><a href='#' class='prevfb' id='prevIntial' onclick='details_feedback.LoadPreIntial()'>Previous</a>";
                        }
                        // else
                        if (parseInt($('#currentmoduleOrder').val()) != 2) {
                            slidehtml = slidehtml + "<a href='#' class='prevfb' id='plast' onclick='details_feedback.loadlastansweredquestion()'>Previous</a> ";
                        }
                        var totalmodules = $('#totalmodules').val();
                        var currentmoduleOrder = $('#currentmoduleOrder').val();
                        if (totalmodules != currentmoduleOrder) {
                            stringhidden = stringhidden + "<li style='display:none'><div class='customertiles'><div class='tsf'>Take Self Feedback</div>" + (parseInt(totalmodules) > 7 ? '<div class="scroll3"><ul class="poemodule2">' : '<ul>') + "" + $('#nextmodule').val() + "</ul></div></div></li>";
                        } else {
                            stringhidden = stringhidden + "<li style='display:none' class='hidfeedback'><div class='customertiles'><div class='feedbackDV'><div class='tsf'>Connect</div>" + (parseInt(totalmodules) > 7 ? '<div class="scroll2"><ul class="poemodule3">' : '<ul>') + "" + $('#nextmodule').val() + "</ul></div></div></div></li>";
                        }
                    }

                    stringhidden = stringhidden + " </li>";
                    html = html + questionhtml;
                }
                html += surveyHtml + completedhtml + stringhidden;
                //details_feedback.loadTopmmebers(response[0].QuestionId);
                $('#sliderbtn').html("<div id='slidefb'>" + slidehtml + "</div>");
                $('#pagetxt').html('Page ' + response[0].QuestionOrderNumber + ' of ' + $('#totalQuestionsformodule').val());
                $('.pageholder').hide().fadeIn('slow');
                $('#questions').hide().html(html).fadeIn('slow');
                if ($('#capabilityMode').val() == 0) {
                    $('.capabilityQuestion').hide();
                    $('.cpty_menu').hide();
                    $('.definitionView').addClass('definitionsHide');

                }
                if ($('#capabilityMode').val() == 0 && userratingcount != 0) {
                    $('.definitionView').addClass('definitionsHideOne');
                    $('.impt_menu,.cpty_menu').hide();
                    $('#importanceDef,#capabilityDef').hide();
                    $('#freqDef').show();
                    $('.cpty_menu').removeClass("select_cpty_menu");
                    $('.frqt_menu').html("<span><img src='../../Images/Feedback/menuSelect_arrow.png' /></span>");
                    $('.impt_menu').removeClass("select_impt_menu");
                    $('.frqt_menu').addClass("select_frqt_menu");
                } else
                    if (userratingcount == 0) {
                        $('.frequencyDefArea').removeClass("showOnlyfrequecy");
                        $('.importanceDefArea').show();
                    } else {
                        $('.definitionView').addClass('definitionsHide');
                        $('.impt_menu').hide();
                        $('#importanceDef,#freqDef').hide();
                        $('#capabilityDef').show();
                        $('.cpty_menu').addClass("select_cpty_menu");
                        $('.cpty_menu').html("<span><img src='../../Images/Feedback/menuSelect_arrow.png' /></span>");
                        $('.impt_menu').removeClass("select_impt_menu");
                        $('.frqt_menu').removeClass("select_frqt_menu");
                    }
                $('.frequencydiv').hide().fadeIn('slow');
                for (var k = 0; k < response.length; k++) {
                    $('#p' + response[k].QuestionOrderNumber).hide();
                    $('#bn' + response[k].QuestionOrderNumber).hide();
                }
                $('#bn' + response[0].QuestionOrderNumber).show();
                var status = parseInt($('#fbStatus').val());

                if (option.moduleorder != 2) {
                    $('#p1').show();
                } else {
                    //alert(option.moduleorder);
                    $('#p1').hide();
                }
                LoadSliderEvent();
                $('#lihdn' + (parseInt(option.moduleorder) - 1)).removeClass('selected');
                if (!$('#lihdn' + (parseInt(option.moduleorder))).hasClass('emptyTile'))
                    $('#lihdn' + (parseInt(option.moduleorder))).addClass('selected');
                details_feedback.loaddetailslider(response);

                //if (status == 1) {
                //    var lastquestion = parseInt($('#lastSavedQuestionOrder').val());
                //    if (lastquestion != 0) {
                //        for (var j = 1; j < lastquestion; j++) {
                //          // details_feedback.nextclick(j, j + 1);
                //        }
                //    }
                //    $('#lastSavedQuestionOrder').val(0);
                //}
                $('.scroll2').slimScroll();
                $('.scroll3').slimScroll();
                $('#definitions li').on('click', function () {

                    if ($(this).hasClass('impt_menu')) {
                        //alert();
                        // alert('sdsdsd');
                        $('#capabilityDef,#freqDef').hide();
                        $('.importanceDef').show();
                        $('.impt_menu').addClass("select_impt_menu");
                        $('.cpty_menu,.frqt_menu').html("");
                        $('.impt_menu').html("<span><img src='../../Images/Feedback/menuSelect_arrow.png' /></span>");
                        $('.cpty_menu').removeClass("select_cpty_menu");
                        $('.frqt_menu').removeClass("select_frqt_menu");

                    }
                    if ($(this).hasClass('cpty_menu')) {
                        $('#importanceDef,#freqDef').hide();
                        // alert($('#capabilityDef').length);

                        $('.cpty_menu').addClass("select_cpty_menu");
                        $('.impt_menu,.frqt_menu').html("");
                        $('.cpty_menu').html("<span><img src='../../Images/Feedback/menuSelect_arrow.png' /></span>");
                        $('.impt_menu').removeClass("select_impt_menu");
                        $('.frqt_menu').removeClass("select_frqt_menu");
                        $('.capabilityDef').show();

                    }
                    if ($(this).hasClass('frqt_menu')) {
                        $('#importanceDef,#capabilityDef').hide();
                        $('.freqDef').show();
                        $('.frqt_menu').addClass("select_frqt_menu");
                        $('.impt_menu,.cpty_menu').html("");
                        $('.frqt_menu').html("<span><img src='../../Images/Feedback/menuSelect_arrow.png' /></span>");
                        $('.impt_menu').removeClass("select_impt_menu");
                        $('.cpty_menu').removeClass("select_cpty_menu");

                    }
                });
            },
            error: function (err) {
                //window.location = "../Home/ErrorMsg";
            }
        });
        if (parseInt($('#totalmodules').val()) > 7) {
            var scrollToInt = $('.scroll1')[0].scrollHeight + 'px';
            details_feedback.loadSlimScroll(scrollToInt, (option.moduleorder - 1));
            //if ((option.moduleorder - 1) >= 5) {
            //    $('.scroll1').slimScroll({ scrollTo: scrollToInt });
            //}
        }
    },
    SaveSurveyAnswers: function (answer, questionid, subquestionid) {
        Common.ajaxsync({
            url: "../../Feedback/SaveSurveyAnswer",
            data: { 'answer': answer, 'questionId': questionid, 'subQuestionId': subquestionid },
            success: function (response) {

            },
            error: function (err) {
                //window.location = "../Home/ErrorMsg";
            }
        });

    },
    LoadSurveyContent: function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");

        var surveyHtml = "<div class='surveyArea'><div id='content-rd' class='content light'> ";
        Common.ajax({
            url: "../../Feedback/GetSurveyQuestions",
            success: function (response) {
                // debugger;
                $('#poemoduleName').html("Product Knowledge Survey<span class='productSurvey'> - Review each topic below, then indicate the degree of confidence you feel you could execute (or explain) each task.</span>");
                $('.questions').removeClass('overallProductSurvey');
                currentqn = $('.nxtfb:visible').attr('id').replace('bn', '');
                $('#q6').hide('slow');
                $('.surveyAreas').css({ 'opacity': '0.2', 'left': '-10%', 'margin-left': '0' });
                $('.surveyQuestions').css({ 'position': 'relative', 'left': '-11%', 'opacity': '4' });
                $('.nxtfb:visible').hide();
                $('.prevfb:visible').hide();
                $('#prevSurvey').show();
                $('#nextSurvey').show();
                $("#status").fadeIn();
                $("#preloader").delay(100).fadeIn("slow");
                var count = 1;
                //var overallcount = 1;
                var subQuescount = 1;
                for (var i = 0; i < response.length; i++) {
                    surveyHtml = surveyHtml + "" +
                        "<div class='surveyAction'><h2><img src='../../Images/icons/" + response[i].ModuleName.replace(" ", "") + ".png' />" + response[i].ModuleName + "</h2></div>" +
                        "<div class='clr'></div>";
                    var questioncount = 1;
                    for (var j = 0; j < response[i].Questions.length; j++) {
                        surveyHtml = surveyHtml + "<div class='surveyMain' id='surveymain" + count + "'> <div class='surveyQNo'>" + questioncount + "</div> " +
                            "<div class='surveyquestionarea'> <p>" + response[i].Questions[j].QuetionText + "</p> </div> <div class='clr'></div> ";
                        if (response[i].Questions[j].SubQuestion.length == 0) {
                            surveyHtml = surveyHtml + "<div class='surveySliderArea' style='width: auto; height: 25%; overflow: hidden;'> " +
                        "<div class='SurveySlide'> <div class='sliderdiv' id='survey" + count + "' style='width: 562px; height: 62px; cursor: pointer;' data-questionId=" + response[i].Questions[j].QuestionId + " data-subquestionId='0'>" +
                        "<img src='../../Images/img/survey_bg.png' /> </div> </div> </div> </div>";
                        } else {
                            var subcount = 1;
                            for (var k = 0; k < response[i].Questions[j].SubQuestion.length; k++) {

                                surveyHtml = surveyHtml + "<div class='surveyMain subquestions' id='surveysub" + subcount + "'> <div class='surveyQNo'>" + questioncount + "." + subcount + "</div> " +
                                    "<div class='surveyquestionarea'> <p>" + response[i].Questions[j].SubQuestion[k].QuetionText + "</p> </div> <div class='clr'></div> " +
                                    "<div class='surveySliderArea' style='width: auto; height: 25%; overflow: hidden;'> " +
                                    "<div class='SurveySlide'> <div class='sliderdiv' id='subQues" + subQuescount + "' style='width: 562px; height: 62px; cursor: pointer;' data-questionId=" + response[i].Questions[j].QuestionId + " data-subquestionId=" + response[i].Questions[j].SubQuestion[k].SubQuestionId + ">" +
                                    "<img src='../../Images/img/survey_bg.png' /> </div> </div> </div> </div>";
                                subcount++;
                                subQuescount++;
                                //overallcount++;
                            }
                            surveyHtml = surveyHtml + "</div>";
                        }

                        count++;
                        questioncount++;
                        //overallcount++;
                    }
                    //surveyHtml = surveyHtml + "</div>";

                }
                var overallhtml = surveyHtml + "</div></div>";
                $('#surveyQues').html(overallhtml);
                $.mCustomScrollbar.defaults.scrollButtons.enable = true; //enable scrolling buttons by default
                $.mCustomScrollbar.defaults.axis = "yx"; //enable 2 axis scrollbars by default
                $("#content-rd").mCustomScrollbar({ theme: "rounded-dark" });
                $(".all-themes-switch a").click(function (e) {
                    e.preventDefault();
                    var $this = $(this),
						rel = $this.attr("rel"),
						el = $(".content");
                    switch (rel) {
                        case "toggle-content":
                            el.toggleClass("expanded-content");
                            break;
                    }
                });
                details_feedback.LoadSurveySlider(count);
                details_feedback.LoadSubQuestionSurveySlider(subQuescount);
                $('#totalsurveQuestions').val(count);
                $('#totalsurveSubQuestions').val(subQuescount);
            },
            error: function (err) {

            }
        });
    },
    LoadSurveySlider: function (count) {
        for (var i = 0; i < count; i++) {
            var questionId = parseInt($('#survey' + (i + 1)).attr('data-questionId'));
            //if (i == 0) {
            //    alert(questionId);
            //}
            var answer = parseInt(details_feedback.LoadSurveyAnswers(questionId, 0));
            //debugger;
            $('#survey' + (i + 1)).data("Survey", answer);
            $('#survey' + (i + 1)).slider({
                min: 0,
                max: 5,
                range: "min",
                value: answer,
                slide: function (event, ui) {
                    if (ui.value != 0) {
                        $(this).find('.ui-slider-range').removeClass('sliderdivSurveyQuestion1');
                        $(this).find('.ui-slider-range').removeClass('sliderdivSurveyQuestion2');
                        $(this).find('.ui-slider-range').removeClass('sliderdivSurveyQuestion3');
                        $(this).find('.ui-slider-range').removeClass('sliderdivSurveyQuestion4');
                        $(this).find('.ui-slider-range').removeClass('sliderdivSurveyQuestion5');
                    }

                    if (ui.value == 1) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion1');
                    } else if (ui.value == 2) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion2');
                    } else if (ui.value == 3) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion3');
                    } else if (ui.value == 4) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion4');
                    }
                    else if (ui.value == 5) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion5');
                    }
                    if (ui.value == 0) {

                        event.preventDefault();
                        $('#' + event.target.id).data("Survey", 0);
                    } else {

                        $('#' + event.target.id).data("Survey", ui.value);
                    }
                    details_feedback.SaveSurveyAnswers(parseInt(ui.value), parseInt($(this).attr('data-questionId')), 0);
                    //alert($(this).attr('data-questionId'));
                },
                create: function (event, ui) {
                    if (answer == 1) {
                        // alert('first');
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion1');
                    } else if (answer == 2) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion2');
                    } else if (answer == 3) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion3');
                    } else if (answer == 4) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion4');
                    } else if (answer == 5) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion5');
                    }
                }
            });
        }

    },
    LoadSubQuestionSurveySlider: function (count) {
        for (var i = 0; i < count; i++) {
            var questionId = parseInt($('#subQues' + (i + 1)).attr('data-questionId'));
            var subquestionId = parseInt($('#subQues' + (i + 1)).attr('data-subquestionId'));
            var answer = parseInt(details_feedback.LoadSurveyAnswers(questionId, subquestionId));
            $('#subQues' + (i + 1)).data("Survey", answer);
            $('#subQues' + (i + 1)).slider({
                min: 0,
                max: 5,
                range: "min",
                value: answer,
                slide: function (event, ui) {
                    if (ui.value != 0) {
                        $(this).find('.ui-slider-range').removeClass('sliderdivSurveyQuestion1');
                        $(this).find('.ui-slider-range').removeClass('sliderdivSurveyQuestion2');
                        $(this).find('.ui-slider-range').removeClass('sliderdivSurveyQuestion3');
                        $(this).find('.ui-slider-range').removeClass('sliderdivSurveyQuestion4');
                        $(this).find('.ui-slider-range').removeClass('sliderdivSurveyQuestion5');
                    }

                    if (ui.value == 1) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion1');
                    } else if (ui.value == 2) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion2');
                    } else if (ui.value == 3) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion3');
                    } else if (ui.value == 4) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion4');
                    }
                    else if (ui.value == 5) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion5');
                    }
                    if (ui.value == 0) {

                        event.preventDefault();
                        $('#' + event.target.id).data("Survey", 0);
                    } else {

                        $('#' + event.target.id).data("Survey", ui.value);
                    }
                    details_feedback.SaveSurveyAnswers(parseInt(ui.value), parseInt($(this).attr('data-questionId')), parseInt($(this).attr('data-subquestionId')));
                },
                create: function (event, ui) {
                    if (answer == 1) {
                        // alert('first');
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion1');
                    } else if (answer == 2) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion2');
                    } else if (answer == 3) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion3');
                    } else if (answer == 4) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion4');
                    } else if (answer == 5) {
                        $(this).find('.ui-slider-range').addClass('sliderdivSurveyQuestion5');
                    }
                }
            });
        }
        $("#status").fadeOut();
        $("#preloader").delay(100).fadeOut("slow");
    },
    LoadSurveyAnswers: function (questionid, subquestionid) {
        var returnvalue = 0;
        Common.ajaxsync({
            url: "../../Feedback/GetSurveyAnswerByQuestionId",
            data: { 'questionid': questionid, 'subQuestionId': subquestionid },
            success: function (response) {
                returnvalue = response;
            },
            error: function (err) {
                //window.location = "../Home/ErrorMsg";
            }
        });
        return returnvalue;
    },
    LoadIntial: function () {
        // alert('in');
        //debugger;
        var count = $('#totalsurveQuestions').val();
        var pass = true;
        for (var i = 0; i < count; i++) {

            // alert($('#survey' + (i + 1)).data('Survey'));
            if ($('#survey' + (i + 1)).data('Survey') == 0) {
                // alert('in');
                $('#masterMsgCont').text("Please finish responding before progressing.");
                $('#overallCont').show();
                $("#content-rd").mCustomScrollbar("scrollTo", $('#surveymain' + (i + 1) + ''));
                pass = false;
                break;

            }

        }

        for (var i = 0; i < 2; i++) {

            // alert($('#survey' + (i + 1)).data('Survey'));
            if ($('#subQues' + (i + 1)).data('Survey') == 0) {
                //alert(i+1);
                $('#masterMsgCont').text("Please finish responding before progressing.");
                $('#overallCont').show();
                $("#content-rd").mCustomScrollbar("scrollTo", $('#surveysub' + (i + 1) + ''));
                pass = false;
                break;

            }

        }
        if (pass) {
            //currentqn = $('.nxtfb:visible').attr('id').replace('bn', '');
            $('.surveyAreas').hide('slow');
            $('.surveyQuestions').css({ 'opacity': '0.5', 'left': '-12%' });
            $('.feedbackcomplete').animate({ 'position': 'relative', 'left': '-11%', 'margin-left': '0', 'opacity': '2' });
            $('.nxtfb:visible').hide();
            $('.prevfb:visible').hide();
            $('#prevIntial').show();
            LoadDrpDownChange();
            $('#poemoduleName').html("SUBMIT YOUR FEEDBACK");
        }

    },
    LoadPrevWelcome: function () {
        $('.surveyAreas').css('opacity', '1').animate({ 'left': '0%' }, { duration: 400 }).css('margin-left', '2.5%');
        $('.surveyQuestions').css('opacity', '0.2').animate({ 'left': '1%' }, { duration: 400 });
        $('.nxtfb:visible').hide();
        $('.prevfb:visible').hide();
        $('#prevWelcome').show();
        $('#nextWelcome').show();
        $('.questions').addClass('overallProductSurvey');
        $('#poemoduleName').html("Product Knowledge Survey");
    },
    LoadPreIntial: function () {
        $('.surveyAreas').show('slow');
        $('.surveyAreas').css('opacity', '0.2');
        $('.surveyQuestions').css('opacity', '1').animate({ 'left': '-12%' }, { duration: 400 }).css('margin-left', '2.5%');
        $('.feedbackcomplete').css('opacity', '0.2').animate({ 'left': '1%' }, { duration: 400 });
        //$('.surveyAreas').show().css('opacity', '0.2');
        $('.nxtfb:visible').hide();
        $('.prevfb:visible').hide();
        $('#prevSurvey').show();
        $('#nextSurvey').show();
        $('#poemoduleName').html("Product Knowledge Survey<span class='productSurvey'> - Review each topic below, then indicate the degree of confidence you feel you could execute (or explain) each task.</span>");
    },
    loadNextContent: function () {
        // debugger;

        var current = parseInt($('.nxtfb:visible').attr('id').replace('bn', ''));
        //alert($('#capability' + current).data('answer'));
        //alert($('#Qno' + current).data('answer'));
        if (($('#Rno' + current).data('rating') == 0 || $('#Rno' + current).data('rating') == undefined) && $('#Rno' + current).length != 0) {
            $('#masterMsgCont').text("Please finish responding before progressing.");
            $('#overallCont').show();
            //alert('Please rate this Excellence Action');
        }
        else if ($('#capability' + current).data('answer') == 0 && $('#capabilityMode').val() != 0) {
            $('#masterMsgCont').text("Please finish responding before progressing.");
            $('#overallCont').show();
            //alert('Please indicate a frequency that represents how often this Excellence Action is demonstrated');
        }
        else if ($('#Qno' + current).data('answer') == 0) {
            $('#masterMsgCont').text("Please finish responding before progressing.");
            $('#overallCont').show();
            //alert('Please indicate a frequency that represents how often this Excellence Action is demonstrated');
        }
        else {
            $('.feedbackcomplete,.surveyQuestions,.surveyAreas').show();
            var scrollToInt = 0 + 'px';
            if (parseInt($('#totalmodules').val()) > 7) {
                scrollToInt = $('.scroll1')[0].scrollHeight + 'px';
            }
            $("#status,#preloader").show();//.promise().done(function() {
            //setTimeout(function (){
            details_feedback.saveModuleData();
            var totalmodules = $('#totalmodules').val();
            var currentmoduleOrder = $('#currentmoduleOrder').val();
            Common.ajax({
                url: "/Feedback/CheckTheCompletedFeedback",
                data: { 'currentmoduleOrder': currentmoduleOrder },
                success: function (response) {
                    //debugger;
                    if (response == "True") {
                        if (totalmodules != currentmoduleOrder) {
                            var curmod = parseInt($('#currentmoduleOrder').val());
                            var nextmod = curmod + 1;

                            // saving the time taken in previous modules in temp hidden variables.
                            //$('#lastsavedHours').val($('.counterHour:first').html());
                            //$('#lastsavedMinutes').val($('.counterMin:first').html());
                            //$('#lastsavedSeconds').val($('.counterSec:first').html());
                            //debugger;
                            //$('#li' + (parseInt(curmod) - 1)).removeClass('select' + $('#selectedpoe').val() + (parseInt(curmod) - 1)).removeClass('selected');

                            //$('#li' + (parseInt(nextmod) - 1)).addClass('select' + $('#selectedpoe').val() + (parseInt(nextmod) - 1)).addClass('selected');

                            $('#li' + (parseInt(curmod) - 1)).removeClass('selected');
                            $('#li' + (parseInt(curmod) - 1)).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + (parseInt(curmod) - 1) + ".png");
                            $('#li' + (parseInt(nextmod) - 1)).addClass('selected');
                            $('#li' + (parseInt(nextmod) - 1)).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + (parseInt(nextmod) - 1) + "h.png");
                            $('#poemoduleName').text($('#li' + (parseInt(nextmod) - 1)).find('p').text());
                            details_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': $('#modulehdn' + nextmod).val() }, moduleorder: nextmod });

                            $('#currentmoduleOrder').val(nextmod);

                            details_feedback.loadCompletedPracticeArea($('#modulehdn' + curmod).val(), (parseInt(curmod) - 1));
                            //PR added
                            details_feedback.loadCompletedPracticeArea($('#modulehdn' + nextmod).val(), (parseInt(curmod)));
                            $('#nextSurvey').hide();
                            $('#prevSurvey').hide();
                            $('#nextWelcome').hide();
                            $('#prevWelcome').hide();
                        } else {
                            //details_feedback.loadstopclock();
                            //$("#status").fadeIn();
                            //$("#preloader").delay(100).fadeIn("slow");

                            //setTimeout(function () {
                            //    details_feedback.completefeedback();
                            //    window.location = "../../Feedback/Connect";
                            //}, 1000);

                            var firstTime = parseInt($('#userratingcount').val());
                            // alert(firstTime);
                            //alert($('#surveyMode').val());
                            if ($('#surveyMode').val() != 1 || firstTime != 0) {
                                // alert('tt');
                                currentqn = $('.nxtfb:visible').attr('id').replace('bn', '');
                                $('#q' + (currentqn - 1)).hide('slow');
                                $('#q' + currentqn).css({ 'opacity': '0.2', 'left': '-10.7%' });
                                $('.feedbackcomplete').css({ 'position': 'relative', 'left': '-9.6%', 'margin-left': '0' });
                                $('.nxtfb:visible').hide();
                                $('.prevfb:visible').hide();
                                $('#plast').show();
                                $('#poemoduleName').html("SUBMIT YOUR FEEDBACK");
                                LoadDrpDownChange();
                            } else {
                                //debugger;
                                $('#poemoduleName').html("Product Knowledge Survey");
                                currentqn = $('.nxtfb:visible').attr('id').replace('bn', '');
                                $('#q' + (currentqn - 1)).hide('slow');
                                $('#q' + currentqn).css({ 'opacity': '0.5', 'left': '-12%' });
                                $('.surveyAreas').css({ 'position': 'relative', 'left': '-10%', 'margin-left': '0' });
                                $('.nxtfb:visible').hide();
                                $('.prevfb:visible').hide();
                                $('#prevWelcome').show();
                                $('#nextWelcome').show();
                                $('.questions').addClass('overallProductSurvey');
                                var counts = 1;
                                $('#poemodule li').each(function () {
                                    $(this).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + counts + ".png");
                                    $(this).removeClass('selected');
                                    counts++;
                                });
                                $('.surveymodule').find('img').attr('src', '../Images/icons/survey_iconH.png');
                                $('.surveymodule').addClass('selected');
                                //$('#plast').show();
                            }
                        }
                    } else {
                        window.location = "../../Feedback/Feedback";
                    }
                    $("#status,#preloader").delay(100).fadeOut("slow");
                    $('#q2').css('opacity', '.2');
                },
                error: function (err) {
                    //window.location = "../Home/ErrorMsg";
                }
            });

            details_feedback.loadSlimScroll(scrollToInt, currentmoduleOrder);
            //$("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
            //},5000);

            //if (parseInt(currentmoduleOrder) >= 5) {
            //    $('.scroll1').slimScroll({ scrollTo: scrollToInt });
            //}
        }
        // $('#p1').show();
    },
    // save the completed module data

    saveModuleData: function () {
        var savePOEResultRequests = [];
        for (var j = 0; j < parseInt($('#totalQuestionsformodule').val()) ; j++) {
            var savePOEResultRequest = new Requests.SavePOEResultRequest();
            savePOEResultRequest.Answer = parseInt($('#Qno' + (j + 1)).attr("data-answer"));
            savePOEResultRequest.AnswerType = 1;
            savePOEResultRequest.ModuleNumber = $('#Qno' + (j + 1)).attr("data-moduleid");
            savePOEResultRequest.CapabilityAnswer = parseInt($('#capability' + (j + 1)).attr("data-answer"));
            savePOEResultRequest.QuestionId = $('#Qno' + (j + 1)).attr("data-question");
            savePOEResultRequest.Comment = null;
            savePOEResultRequest.FeedbackStatus = 1;
            savePOEResultRequest.UserRating = ($('#Rno' + (j + 1)).length > 0) ? $('#Rno' + (j + 1)).attr("data-rating") : 0;
            savePOEResultRequest.Notes = "";
            savePOEResultRequest.Subject = '';
            savePOEResultRequests.push(savePOEResultRequest);
        }

        saveFeedbackResults(savePOEResultRequests);
    },
    saveQuestionData: function (element) {
        var savePOEResultRequests = [];
        var savePOEResultRequest = new Requests.SavePOEResultRequest();
        var currentno = element.replace(/[^0-9\.]+/g, '');
        savePOEResultRequest.Answer = parseInt($('#' + element).attr("data-answer"));
        savePOEResultRequest.AnswerType = 1;
        savePOEResultRequest.ModuleNumber = $('#' + element).attr("data-moduleid");
        savePOEResultRequest.QuestionId = $('#' + element).attr("data-question");
        savePOEResultRequest.Comment = null;
        savePOEResultRequest.FeedbackStatus = 1;
        savePOEResultRequest.CapabilityAnswer = parseInt($('#capability' + currentno).attr("data-answer"));
        savePOEResultRequest.UserRating = ($('#Rno' + currentno).length > 0) ? $('#Rno' + currentno).attr("data-rating") : 0;
        savePOEResultRequest.Notes = '';
        savePOEResultRequest.Subject = '';
        savePOEResultRequests.push(savePOEResultRequest);
        saveFeedbackResults(savePOEResultRequests);
    },
    //Complete feedback
    completefeedback: function () {
        $("#status").fadeOut();
        $("#preloader").fadeOut("slow");
        //if ($('#fbinitial').val() == '') {
        //    alert('Enter the initials');
        //    $("#status,#preloader").hide();
        //}
        //else {
        if (validateIntial()) {
            //$('#masterMsgCont').text("Your Feedback has been completed successfully.");
            var poeid = $('#selectPoe').val();
            if (poeid >= 18 && poeid <= 26) {
                //save functionality
            }
            $('#overallFeedback').show();
            //alert('Your Feedback has been completed successfully.');
            //completeFeedback();
        } else {
            $("#status,#preloader").hide();
        }
        // }
    },

    loaddetailslider: function (response) {
        for (var i = 0; i < response.length; i++) {
            var element = 'Qno' + response[i].QuestionOrderNumber;
            var rateelement = 'Rno' + response[i].QuestionOrderNumber;
            var capbalitityelement = 'capability' + response[i].QuestionOrderNumber;
            var ans = details_feedback.loadSelectedAnswer({ data: { 'feedbackId': 0, 'questionId': response[i].QuestionId } });
            var rating = details_feedback.loadSelectedRating({ data: { 'feedbackId': 0, 'questionId': response[i].QuestionId } });
            var capability = details_feedback.loadSelectedCapability({ data: { 'feedbackId': 0, 'questionId': response[i].QuestionId } });
            //$('#' + element).data("answer", ans);
            //$('#' + capbalitityelement).data("answer", capability);
            // $('#' + rateelement).data("rating", rating);
            $('#' + rateelement).attr("data-rating", rating);
            $('#' + element).attr("data-answer", ans);
            $('#' + capbalitityelement).attr("data-answer", capability);
            if (rating != 0) {
                $('#' + rateelement).find('.impbtn' + rating).click();
            }
            if (capability != 0) {
                $('#' + capbalitityelement).find('.capbtn' + capability).click();
            }
            if (ans != 0) {
                $('#' + element).find('.freqbtn' + ans).click();
            }
            // $('#' + element).data("Notes", details_feedback.loadSelectedNotes({ data: { 'feedbackId': 0, 'questionId': response[i].QuestionId } }));
            //$('#' + rateelement).slider({
            //    min: 0,
            //    max: 4,
            //    range: "min",
            //    value: rating,
            //    slide: function (event, ui) {
            //        if (ui.value != 0) {
            //            $(this).find('.ui-slider-range').removeClass('sliderdivRateQuestion1');
            //            $(this).find('.ui-slider-range').removeClass('sliderdivRateQuestion2');
            //            $(this).find('.ui-slider-range').removeClass('sliderdivRateQuestion3');
            //            $(this).find('.ui-slider-range').removeClass('sliderdivRateQuestion4');
            //        }

            //        if (ui.value == 1) {
            //            $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion1');
            //        } else if (ui.value == 2) {
            //            $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion2');
            //        } else if (ui.value == 3) {
            //            $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion3');
            //        } else if (ui.value == 4) {
            //            $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion4');
            //        }
            //        if (ui.value == 0) {

            //            event.preventDefault();
            //            $('#' + event.target.id).data("rating", 0);
            //        } else {

            //            $('#' + event.target.id).data("rating", ui.value);
            //        }
            //    },
            //    create: function (event, ui) {
            //        if (rating == 1) {
            //            // alert('first');
            //            $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion1');
            //        } else if (rating == 2) {
            //            $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion2');
            //        } else if (rating == 3) {
            //            $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion3');
            //        } else if (rating == 4) {
            //            $(this).find('.ui-slider-range').addClass('sliderdivRateQuestion4');
            //        }
            //    }
            //});
            //$('#' + capbalitityelement).slider({
            //    min: 0,
            //    max: 4,
            //    range: "min",
            //    value: capability,
            //    slide: function (event, ui) {
            //        if (ui.value != 0) {
            //            $(this).find('.ui-slider-range').removeClass('sliderdivCapQuestion1');
            //            $(this).find('.ui-slider-range').removeClass('sliderdivCapQuestion2');
            //            $(this).find('.ui-slider-range').removeClass('sliderdivCapQuestion3');
            //            $(this).find('.ui-slider-range').removeClass('sliderdivCapQuestion4');
            //        }

            //        if (ui.value == 1) {
            //            $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion1');
            //        } else if (ui.value == 2) {
            //            $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion2');
            //        } else if (ui.value == 3) {
            //            $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion3');
            //        } else if (ui.value == 4) {
            //            $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion4');
            //        }
            //        if (ui.value == 0) {

            //            event.preventDefault();
            //            $('#' + event.target.id).data("answer", 0);
            //        } else {

            //            $('#' + event.target.id).data("answer", ui.value);
            //        }
            //    },
            //    create: function (event, ui) {
            //        if (capability == 1) {
            //            // alert('first');
            //            $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion1');
            //        } else if (capability == 2) {
            //            $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion2');
            //        } else if (capability == 3) {
            //            $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion3');
            //        } else if (capability == 4) {
            //            $(this).find('.ui-slider-range').addClass('sliderdivCapQuestion4');
            //        }
            //    }
            //});

            //$('#' + element).slider({
            //    min: 0,
            //    max: 4,
            //    range: "min",
            //    value: ans,
            //    slide: function (event, ui) {
            //        if (ui.value != 0) {
            //            $(this).find('.ui-slider-range').removeClass('sliderdiv1');
            //            $(this).find('.ui-slider-range').removeClass('sliderdiv2');
            //            $(this).find('.ui-slider-range').removeClass('sliderdiv3');
            //            $(this).find('.ui-slider-range').removeClass('sliderdiv4');
            //        }
            //        //if (ui.value == 0) {
            //        //    $(this).find('.ui-slider-range').addClass('sliderdiv1');
            //        //} else
            //        if (ui.value == 1) {
            //            $(this).find('.ui-slider-range').addClass('sliderdiv1');
            //        } else if (ui.value == 2) {
            //            $(this).find('.ui-slider-range').addClass('sliderdiv2');
            //        } else if (ui.value == 3) {
            //            $(this).find('.ui-slider-range').addClass('sliderdiv3');
            //        } else if (ui.value == 4) {
            //            $(this).find('.ui-slider-range').addClass('sliderdiv4');
            //        }


            //        //(this).find('.ui-slider-range').css("background", "url(../../Images/img/slidebg2-2.png)  no-repeat");
            //        if (ui.value == 0) {

            //            event.preventDefault();
            //            $('#' + event.target.id).data("answer", 0);
            //        } else {
            //            $('#' + event.target.id).data("answer", ui.value);
            //        }
            //    },
            //    create: function (event, ui) {
            //        if (ans == 1) {
            //            // alert('first');
            //            $(this).find('.ui-slider-range').addClass('sliderdiv1');
            //        } else if (ans == 2) {
            //            $(this).find('.ui-slider-range').addClass('sliderdiv2');
            //        } else if (ans == 3) {
            //            $(this).find('.ui-slider-range').addClass('sliderdiv3');
            //        } else if (ans == 4) {
            //            $(this).find('.ui-slider-range').addClass('sliderdiv4');
            //        }
            //    }
            //});
        }
    },
    prevclick: function (current, previous) {
        //if (current == 5)
        // alert($('#currentmoduleOrder').val())
        //    debugger;

        if (current != 0) {


            $('.prevfb,.nxtfb').hide();
            $('#p' + current).hide();
            $('#bn' + current).hide();
            $('#p' + previous).show();
            $('#bn' + previous).show();
            // alert($('#q' + previous).val());
            $('#pagetxt').html('Page ' + previous + ' of ' + $('#totalQuestionsformodule').val());
            if (current != 2) {
                $('#q' + (current - 2)).show('slow');
                $('#q' + previous).css('opacity', '1').animate({ 'left': '-9.6%' }, { duration: 400 });
                $('#q' + (previous + 1)).css('opacity', '0.2').animate({ 'left': '-8.7%' }, { duration: 400 });
                $('#q' + (previous - 1)).css('opacity', '0.2');
                $('#q' + (previous - 1)).css('margin-left', '0px');
            } else {
                $('#q' + previous).css('opacity', '1').animate({ 'left': '0%' }, { duration: 400 }).css('margin-left', '2.5%');
                $('#q' + (previous + 1)).css('opacity', '0.2').animate({ 'left': '1%' }, { duration: 400 });
            }
            if (previous == 4) {
                $('.customertiles').parent('li').hide();
            }

            var noofOccurences = parseInt($('#totalQuestionsformodule').val()) / 5;
            var questionDisplay = current % 5;
            var count = 0;
            for (var n = 1; n <= noofOccurences; n++) {
                if (questionDisplay == 0) {
                    if ((n * 4) + n == current) {
                        for (var i = current; i < parseInt($('#totalQuestionsformodule').val()) ; i++) {
                            if (count <= 4) {
                                $('#q' + (i + 1)).hide();
                            }
                            count++;
                        }
                    }
                }
            }
            //if (current == 5 && parseInt($('#totalQuestionsformodule').val()) > current) {
            //    for (var i = 6; i < parseInt($('#totalQuestionsformodule').val()) ; i++) {
            //        $('#q' + (i + 1)).hide();
            //    }
            //}
            //if (previous == 1 && parseInt($('#totalQuestionsformodule').val()) > 5) {
            //    $('#q' + 6).hide();
            //}
            $('#currentquestionid').val($('#Qno' + previous).data("question"));
        } else {
            $("#status").fadeIn();
            $("#preloader").delay(100).fadeIn("slow");
            details_feedback.loadcompletedPAQuestion((parseInt($('#poemodule>li.selected').attr("data-value")) - 1), (parseInt($('#poemodule>li.selected').attr("id").replace("li", "")) - 1))
            var currentslide = parseInt($('#totalQuestionsformodule').val()) - 1;
            $("#status").fadeIn();
            $("#preloader").delay(100).fadeIn("slow");
            $('#q' + parseInt($('#totalQuestionsformodule').val())).show();
            for (var k = 0; k < (parseInt($('#totalQuestionsformodule').val()) - 3) ; k++) {
                //debugger;
                $('#q' + (k + 1)).hide();
                $('#q' + (k + 1)).css("left", "-10.7%").css("position", "relative").css("margin-left", "0px").css("opacity", "0.2");
            }
            $('.feedbackcomplete,.hidfeedback').hide();
            $('#prevMode').val(1);
            details_feedback.nextclick(currentslide, parseInt($('#totalQuestionsformodule').val()));
            $('#q' + (parseInt($('#totalQuestionsformodule').val()) - 1)).css("left", "-10.7%").css("margin-left", "0px").css("opacity", "0.2").css("position", "relative");
            setTimeout(function () {
                $('#q' + (parseInt($('#totalQuestionsformodule').val()) - 1)).css("left", "-10.7%").css("margin-left", "0px").css("opacity", "0.2").css("position", "relative");
                $('#q' + (parseInt($('#totalQuestionsformodule').val()) - 2)).css("left", "-10.7%").css("margin-left", "0px").css("opacity", "0.2").css("position", "relative");
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
            }, 2000);

            // $('#q3').css('opacity', '0.2 !important');

        }
        if ($('#currentmoduleOrder').val() == 2) {
            $('#p1').hide();
        }
        //$('textarea').sceditor('instance').getBody()[1].innerText = $('#Qno' + previous).data('Notes');

        //details_feedback.loadTopmmebers($('#Qno' + previous).data("question"));
    },
    nextclick: function (current, next) {
        //debugger;
        if (($('#Rno' + current).attr('data-rating') == 0 || $('#Rno' + current).attr('data-rating') == undefined) && $('#Rno' + current).length != 0) {
            $('#masterMsgCont').text("Please finish responding before progressing.");
            $('#overallCont').show();
        }
        else if ($('#capability' + current).attr('data-answer') == 0 && $('#capabilityMode').val() != 0) {
            $('#masterMsgCont').text("Please finish responding before progressing.");
            $('#overallCont').show();

        }
        else if ($('#Qno' + current).attr('data-answer') == 0) {
            $('#masterMsgCont').text("Please finish responding before progressing.");
            $('#overallCont').show();

        }
        else {
            //details_feedback.UpdateFeedbackNotes();
            var currentmoduleOrder = $('#currentmoduleOrder').val();
            $('.feedbackcomplete,.surveyQuestions,.surveyAreas').hide();
            $('.prevfb,.nxtfb').hide();
            $('#p' + current).hide();
            $('#bn' + current).hide();
            $('#p' + next).show();
            $('#bn' + next).show();

            $('#pagetxt').html('Page ' + next + ' of ' + $('#totalQuestionsformodule').val());
            if (current != 1) {
                $('#q' + (current - 1)).hide('slow');
            }
            if ($('#prevMode').val() != 1) {
                $('#q' + current).css('position', 'relative').css('opacity', '.2').css('margin-left', '0').animate({ 'left': '-10.7%' }, { duration: 400 });
            } else {
                $('#prevMode').val(0);
                $('#q' + (current)).show("slow");
                $('#q' + next).css('position', 'relative').css('opacity', '.2').css('margin-left', '0').animate({ 'left': '-10.7%' }, { duration: 400 });
                $('#q' + (current)).css('opacity', '0.2');
                $('#q' + (current)).css('margin-left', '0px');
                $('#q' + (current)).css('left', '-10.7%');
            }

            //$('#Qno' + current).data("Notes", $('textarea').sceditor('instance').getBody()[1].innerText.replace(/^\s+/, ""));
            details_feedback.saveQuestionData('Qno' + current);
            // details_feedback.loadTopmmebers($('#Qno' + next).data("question"));
            var noofOccurences = parseInt($('#totalQuestionsformodule').val()) / 5;
            var questionDisplay = next % 5;
            var count = 0;
            if (current == (parseInt($('#totalQuestionsformodule').val()) - 1)) {
                $('.customertiles').parent('li').show();
            }
            for (var n = 1; n <= noofOccurences; n++) {
                if (questionDisplay == 0) {
                    if ((n * 4) + n == next) {
                        for (var i = next; i < (parseInt($('#totalQuestionsformodule').val())) ; i++) {
                            if (count <= 4) {
                                $('#q' + (i + 1)).show();
                            }
                            count++;
                        }
                    }
                }
            }

            //if (next == 5 && parseInt($('#totalQuestionsformodule').val()) > next) {
            //    for (var i = 5; i < (parseInt($('#totalQuestionsformodule').val())) ; i++) {
            //        $('#q' + (i + 1)).show();
            //    }
            //}
            $('#currentquestionid').val($('#Qno' + next).data("question"));
            // $('textarea').sceditor('instance').getBody()[1].innerText = $('#Qno' + next).data('Notes');
            if ($('#Rno' + current).length != 0) {
                $('#definitions li:first').click();
            } else if ($('#Rno' + current).length == 0 && $('#capabilityMode').val() == 0) {
                $('#definitions li:nth-child(3)').click();
            } else {
                $('#definitions li:nth-child(2)').click();
            }
            $('#q' + next).css('position', 'relative').animate({ 'left': '-9.6%' }, { duration: 400 }).css('margin-left', '0').css('opacity', '1');
            $('#q' + (next + 1)).css('position', 'relative').css('opacity', '.2').animate({ 'left': '-8.7%' }, { duration: 400 }).css('margin-left', '0');
            if (parseInt($('#totalmodules').val()) > 7 && (parseInt($('#totalmodules').val()) - 1) >= currentmoduleOrder) {
                var scrollToInt1 = $('.scroll3')[0].scrollHeight + 'px';
                if ((parseInt(currentmoduleOrder) - 1) >= 5) {
                    $('.scroll3').slimScroll({ scrollTo: scrollToInt1 });
                }
            }

        }
        //$('#q' + (current)).css('opacity', '0.2');
        // $('#q' + (current)).css('margin-left', '0px');
        // $('#q' + (current)).css('left', '-10.7%');
    },
    //Load the timer event
    //loadclockevent: function () {
    //    $('.counterSec').fadeOut(500).html(0).fadeIn(500);
    //    $('.counterMin').fadeOut(500).html(0).fadeIn(500);
    //    timer = setInterval("details_feedback.loadincreasecounter()", 1000);
    //    // $('#nextdv').removeClass('start');
    //},
    //Load Comment window
    //loadcommentline: function () {
    //    $('#connectmembrs .usersconnect').live('click', function () {
    //        $('#connectmembrs li a span').removeClass('slidecontentselect');
    //        $(this).find('span').toggleClass('slidecontentselect');
    //    });
    //    $('#submitbtn').click(function () {
    //        var txtareavalText = $('textarea').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
    //        if (txtareavalText == "") {
    //            alert('Please Enter the Text');
    //        } else {
    //            details_feedback.PostCommnet();
    //        }
    //    });
    //    var loadCSS = function (callback) {
    //        var link = document.createElement('link');
    //        link.type = 'text/css';
    //        link.rel = 'stylesheet';
    //        link.href = "/Scripts/ref/editor/themes/square.min.css";
    //        link.id = 'theme-style';

    //        document.getElementsByTagName('head')[0].appendChild(link);

    //        var img = document.createElement('img');
    //        img.onerror = function () {
    //            if (callback) callback(link);
    //        };
    //        img.src = "/Scripts/ref/editor/themes/square.min.css";
    //    };
    //    var initEditor = function () {
    //        $("textarea").sceditor({
    //            plugins: 'xhtml',
    //            resizeEnabled: false,
    //            toolbar: "bold,italic,underline,left,center,right,justify,bulletlist,orderedlist",
    //            style: "/Scripts/ref/editor/jquery.sceditor.default.min.css"
    //        });
    //    };
    //    initEditor();
    //    loadCSS(initEditor);
    //},

    //Load Previous content
    //loadTopmmebers: function (quesionid) {
    //    $('.vs-context-menu').hide("slow");
    //    Common.ajaxsync({
    //        url: "/Feedback/GetConnectMembers?type=1&quesionid=" + quesionid,
    //        beforeSend: function () {
    //            $("#status").fadeIn();
    //            $("#preloader").delay(100).fadeIn("slow");
    //        },
    //        success: function (response) {
    //            //$("#status").fadeOut();
    //            //$("#preloader").delay(100).fadeOut("slow");
    //            var html = '';
    //            if (response != null && response.length != 0) {
    //                var limit = (response.length < 9) ? response.length : 9;
    //                for (var i = 0; i < limit; i++) {
    //                    html = html + "<li data-value=" + response[i].User.UserId + " class='usersconnect'><a href='#'>" +
    //                        "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='95' height='95' alt='User' />" +
    //                          "<span></span>" +
    //                        "<p class='spanname'>" + response[i].User.FirstName + " " + response[i].User.LastName + "</p>" +
    //                        "</a></li>";
    //                }
    //            }
    //            if (response != null && (response.length != 0 && response.length < 9)) {
    //                var balCount = 9 - response.length;
    //                for (var j = 0; j < balCount; j++) {
    //                    html = html + "<li> <img src='../Images/you.png' width='95' height='95' alt='Connect'/> </li>";
    //                }
    //            }
    //            if (response == null) {
    //                for (var j = 0; j < 9; j++) {
    //                    html = html + "<li> <img src='../Images/you.png' width='95' height='95' alt='Connect'/> </li>";
    //                }
    //            }
    //            else if (response.length == 0) {
    //                for (var j = 0; j < 9; j++) {
    //                    html = html + "<li> <img src='../Images/you.png' width='95' height='95' alt='Connect'/> </li>";
    //                }
    //            }
    //            $('#connectmembrs').html(html);
    //            if (response.length > 9) {
    //                $('.mentorscroll').slimscroll();
    //            }
    //        },
    //        error: function (err) {
    //            //window.location = "../Home/ErrorMsg";
    //        }
    //    });
    //},
    //PostCommnet: function () {
    //    var userid = $('#connectmembrs .slidecontentselect').parent().parent().data('value');

    //    var selectedmodule = $('#poemodule .selected')[0].innerText;
    //    //var html = $('textarea').sceditor('instance').getBody()[0].innerHTML;
    //    var html = $('textarea').sceditor('instance').getBody()[0].innerText.replace(/^\s+/, "");
    //    $('#comments').val(html.trim());
    //    $('#subject').val("Comment regarding " + selectedmodule + " poe");
    //    $('#useridslist').val(userid);
    //    var form = $('#PostComments');
    //    var formData = new FormData(form[0]);
    //    $.ajax({
    //        type: "POST",
    //        url: form.attr('action'),
    //        enctype: 'multipart/form-data',
    //        data: formData,
    //        success: function (data) {
    //            alert("Message sent successfully");
    //            $('#subject').val('');
    //            $('#comments').val('');
    //            $('#selectedmembershdn').val('');
    //            $('#selectedmembersdiv').html('');
    //            $('textarea').sceditor('instance')[0].val('');
    //            $('#connectmembrs li a span').removeClass('slidecontentselect');
    //        },
    //        error: function (e) {
    //        },
    //        cache: false,
    //        contentType: false,
    //        processData: false
    //    });
    //    return false;
    //},
    //Intialize the timer functionalities
    //loadincreasecounter: function () {
    //    var secVal;
    //    var minVal;
    //    secVal = parseInt($('.counterSec').html(), 10);
    //    minVal = parseInt($('.counterMin').html(), 10);
    //    if (secVal != 59)
    //        $('.counterSec').html((secVal + 1));
    //    else {
    //        if (minVal != 59) {
    //            $('.counterMin').html((minVal + 1));
    //        }
    //        else {
    //            $('.counterHour').html((parseInt($('.counterHour').html(), 10) + 1));
    //            $('.counterMin').html(0);
    //        }
    //        $('.counterSec').html(0);
    //    }
    //},
    //stop the timer event
    //loadstopclock: function () {
    //    clearInterval(timer);
    //},
    GetUserRating: function () {
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
    //Load the module
    loadModuleIds: function (option) {
        var moduleIds = new Array();
        var survey = $('#surveyMode').val();
        // alert(survey);
        Common.ajaxsync({
            url: option.url,
            beforeSend: function () {
                $("#status").fadeIn();
                $("#preloader").delay(100).fadeIn("slow");
            },
            success: function (response) {
                //debugger;
                var moduleResponseLength = response.length;
                var rating = details_feedback.GetUserRating();
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
                var module = "";
                var modulehdnstr = "";
                var modulehidden = "";
                for (var i = 0; i < response.length; i++) {
                    moduleIds[response[i].ModuleOrderNumber] = response[i].ModuleId;
                    modulehidden = modulehidden + "<input type='hidden' id='modulehdn" + (i + 1) + "' value=" + response[i].ModuleId + " />";

                    if (response[i].ModuleOrderNumber > 0) {
                        var img = $('#selectedpoe').val().replace("/", "") + response[i].ModuleOrderNumber;
                        //module = module + "<li id ='li" + response[i].ModuleOrderNumber + "' data-value=" + response[i].ModuleId + "  class='" + img + "Tile" + ((response[i].ModuleOrderNumber == 1) ? ' select' + img + ' selected' : '') + "'><p>" + response[i].ModuleName + "</p></li>";
                        module = module + "<li id ='li" + response[i].ModuleOrderNumber + "' data-value=" + response[i].ModuleId + "  class='" + ((response[i].ModuleOrderNumber == 1) ? 'selected' : '') + "'><img src='../Images/icons/" + img + ".png' /><p>" + response[i].ModuleName + "</p></li>";
                    }
                    if (response[i].ModuleOrderNumber > 0) {
                        var img = $('#selectedpoe').val().replace("/", "") + response[i].ModuleOrderNumber;
                        modulehdnstr = modulehdnstr + "<li id ='lihdn" + response[i].ModuleOrderNumber + " class='" + img + "Tile'><p>" + response[i].ModuleName + "</p></li>";
                    }
                }
                var practiceArea1 = (response.length < 7 ? (7 - response.length) : 0);
                if ((response.length - 1) <= 6) {
                    //$('#poemodule').parent('div').removeClass('scroll1');
                    $('#poemodule').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
                    //$('#poemodule').parents('.slimScrollDiv').find('.slimScrollRail').remove();
                } else {
                    $('#poemodule').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                }
                if (survey == 1 && rating == 0) {

                    module = module + "<li id ='li" + (response.length + 1) + "' data-value=" + (response.length + 1) + "' data-moduleorder=" + (response.length + 1) + " data-surveys='0'  class='takesf surveymodule' ><img src='../Images/icons/survey_icon.png' /><p>Product Knowledge Survey</p></li>";
                    if ((response.length + 1) % 2 == 0) {
                        module = module + "<li id ='li" + (response.length + 1) + "' data-value=" + (response.length + 1) + "' data-moduleorder=" + (response.length + 1) + "  class='takesf poelistlidummy' >" + "</li>";
                    }
                } else
                    if (response.length % 2 == 0) {
                        module = module + "<li id ='li" + (response.length + 1) + "' data-value=" + (response.length + 1) + "' data-moduleorder=" + (response.length + 1) + "  class='takesf poelistlidummy' >" + "</li>";
                    }

                //for (var pa1 = 0; pa1 < practiceArea1; pa1++) {
                //    module = module + "<li id ='li" + (moduleResponseLength + pa1) + "' data-value=''  class='takesf emptyTile'><p></p><img src='' width='64' height='50'  class='img' />" + "</li>";
                //    modulehdnstr = modulehdnstr + "<li id ='lihdn" + (moduleResponseLength + pa1) + "' class='takesf emptyTile'><p></p><img src='' width='64' height='50'  class='img' />" + "</li>";
                //}

                $('#nextmodule').val(modulehdnstr);
                $('#modules').html(modulehidden);

                module = module + "";
                $('#poemodule').html(module);
                $('#poemodule li').first().find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + 1 + "h" + ".png");
                $('#poemoduleName').text($('#poemodule li').first().find('p').text());
                $('#totalmodules').val(response.length);
                var status = parseInt($('#fbStatus').val());
                if (status == 1) {
                    details_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': $('#lastSavedModuleId').val() }, moduleorder: parseInt($('#lastSavedModuleOrder').val()) + 1 });
                    //$('#poemodule li').each(function (index, item) { $(this).removeClass('select' + $('#selectedpoe').val() + (index + 1)) });
                    $('#poemodule li').each(function (index, item) {
                        var datasurvey = $(this).attr('data-surveys');
                        if (datasurvey != 0) {
                            $(this).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + (index + 1) + ".png");
                        }
                        $(this).removeClass('selected');
                    });
                    $('#li' + parseInt($('#lastSavedModuleOrder').val())).addClass('selected');
                    $('#li' + parseInt($('#lastSavedModuleOrder').val())).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + $('#lastSavedModuleOrder').val() + "h" + ".png");
                    //$('#li' + parseInt($('#lastSavedModuleOrder').val())).addClass('selected').addClass('select' + $('#selectedpoe').val() + $('#lastSavedModuleOrder').val());
                    $('#poemoduleName').text($('#li' + parseInt($('#lastSavedModuleOrder').val())).find('p').text());
                    $('#currentmoduleOrder').val(parseInt($('#lastSavedModuleOrder').val()) + 1);
                } else {
                    details_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': $('#modulehdn2').val() }, moduleorder: 2 });
                    $('#currentmoduleOrder').val('2');
                }
            },
            error: function (err) {
                //window.location = "../Home/ErrorMsg";
            }
        });
    },
    //load poe content
    loadPoeContent: function (option, element) {
        Common.ajaxsync({
            url: option.url,
            data: (option.data) ? option.data : null,
            beforeSend: function () {
                $("#status").fadeIn();
                $("#preloader").delay(100).fadeIn("slow");
            },
            success: function (response) {
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
                $(element).html(response);
                $(element + 'hdn').val(response);
            },
            error: function (err) {
            }
        });
    },

    //Question count
    loadQuestioncount: function (option, element) {
        Common.ajaxsync({
            url: option.url,
            data: (option.data) ? option.data : null,
            beforeSend: function () {
                $("#status").fadeIn();
                $("#preloader").delay(100).fadeIn("slow");
            },
            success: function (response) {
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
                $(element).val(response);
            },
            error: function (err) {
            }
        });
    },
    //Load completed practise area
    loadCompletedPracticeArea: function (moduleid, moduleorder) {
        var img = $('#selectedpoe').val().replace("/", "") + moduleorder;
        var loadedPA = $('#target ul').html();
        var newcompletedPA = '';
        $('#li' + moduleorder).attr('onclick', 'details_feedback.loadcompletedPAQuestion(' + moduleid + ',' + moduleorder + ')');

        if ($('#lit' + moduleorder).size() == 0) {
            newcompletedPA = "<li id=lit" + moduleorder + "><a href='javascript:details_feedback.loadcompletedPAQuestion(" + moduleid + "," + moduleorder + ")'><span><img src='../../Images/icons/" + img + "-small.png' /></span><p>" + $('#li' + moduleorder).text() + "</p></a></li>";
        }
        $('#target ul').html(loadedPA + newcompletedPA);
    },
    //Loading Completed Questions
    loadcompletedPAQuestion: function (moduleid, moduleorder) {
        //debugger;

        // saving the time taken in previous modules in temp hidden variables.
        $('#lastsavedHours').val($('.counterHour:first').html());
        $('#lastsavedMinutes').val($('.counterMin:first').html());
        $('#lastsavedSeconds').val($('.counterSec:first').html());

        $("#status,#preloader").show();//.delay(100).fadeIn("slow", function () {
        var scrollToInt = '0px';
        if (parseInt($('#totalmodules').val()) > 7) {
            scrollToInt = $('.scroll1')[0].scrollHeight + 'px';
        }
        var curmod = parseInt($('#currentmoduleOrder').val());

        // $('#li' + (parseInt(curmod) - 1)).removeClass('select' + $('#selectedpoe').val() + (parseInt(curmod) - 1));
        //$('#li' + (parseInt(moduleorder))).addClass('select' + $('#selectedpoe').val() + (parseInt(moduleorder)));

        $('#li' + (parseInt(curmod) - 1)).removeClass('selected');
        $('#li' + (parseInt(curmod) - 1)).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + (parseInt(curmod) - 1) + ".png");
        $('#li' + (parseInt(moduleorder))).addClass('selected');
        $('#li' + (parseInt(moduleorder))).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + (parseInt(moduleorder)) + "h.png");
        $('#poemoduleName').text($('#li' + (parseInt(moduleorder))).find('p').text());

        $('#currentmoduleOrder').val((parseInt(moduleorder) + 1));
        $('#currentQuestionorder').val(0);
        $('#currentQuestionno').val(1);

        details_feedback.loadDetailViewPAQuestions({ url: '../../Feedback/GetQuestions', data: { 'moduleId': moduleid }, moduleorder: (parseInt(moduleorder) + 1) });

        details_feedback.loadSlimScroll(scrollToInt, moduleorder);
        //});
        //$('textarea').sceditor('instance').getBody()[1].innerText = $('#Qno1').data('Notes');
        $("#preloader").delay(100).fadeOut("slow");//.delay(200).fadeOut("slow");
        //if (moduleorder >= 5) {
        //    $('.scroll1').slimScroll({ scrollTo: scrollToInt });
        //}
        $('#q2').css('opacity', '.2');
        $('#nextSurvey').hide();
        $('#prevSurvey').hide();
        $('#nextWelcome').hide();
        $('#prevWelcome').hide();

    },
    //Load selected answer
    loadSelectedAnswer: function (option) {
        $('#selectedanswer').val(0);
        Common.ajaxsync({
            url: "../../Feedback/GetGivenAnswer",
            data: option.data,
            beforeSend: function () {
                //$("#status").fadeIn();
                //$("#preloader").delay(100).fadeIn("slow");
            },
            success: function (response) {
                debugger;
                //$("#status").fadeOut();
                //$("#preloader").delay(100).fadeOut("slow");
                $('#selectedanswer').val(response.Answer > 4 || response == 0 ? 0 : response.Answer);
                $('#selectedrating').val(response.UserRating > 4 || response == 0 ? 0 : response.UserRating);
                $('#selectedCapability').val(response.CapabilityAnswer > 4 || response == 0 ? 0 : response.CapabilityAnswer);
                $('#selectedNotes').val(response.Notes);
            },
            error: function (err) {
                //window.location = "../Home/ErrorMsg";
            }
        });
        return parseInt($('#selectedanswer').val());
    },
    loadSelectedRating: function (option) {
        //$('#selectedrating').val(0);
        //Common.ajaxsync({
        //    url: "../../Feedback/GetGivenRating",
        //    data: option.data,
        //    beforeSend: function () {
        //        //$("#status").fadeIn();
        //        //$("#preloader").delay(100).fadeIn("slow");
        //    },
        //    success: function (response) {
        //        //$("#status").fadeOut();
        //        //$("#preloader").delay(100).fadeOut("slow");
        //        $('#selectedrating').val(response > 4 ? 0 : response);
        //    },
        //    error: function (err) {
        //        //window.location = "../Home/ErrorMsg";
        //    }
        //});
        return parseInt($('#selectedrating').val());
    },
    loadSelectedCapability: function (option) {
        return parseInt($('#selectedCapability').val());
    },
    loadSelectedNotes: function (option) {
        // $('#selectedNotes').val('');
        //Common.ajaxsync({
        //    url: "../../Feedback/GetGivenNotes",
        //    data: option.data,
        //    beforeSend: function () {
        //        //$("#status").fadeIn();
        //        //$("#preloader").delay(100).fadeIn("slow");
        //    },
        //    success: function (response) {
        //        //$("#status").fadeOut();
        //        //$("#preloader").delay(100).fadeOut("slow");
        //        $('#selectedNotes').val(response);
        //    },
        //    error: function (err) {
        //        //window.location = "../Home/ErrorMsg";
        //    }
        //});
        return $('#selectedNotes').val();
    },
    loadPoeName: function () {
        Common.ajaxsync({
            url: "../../Common/GetPoeName",
            // data: option.data,
            beforeSend: function () {
                $("#status").fadeIn();
                $("#preloader").delay(100).fadeIn("slow");
            },
            success: function (response) {
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
                $('#selectedpoe').val(response);
            },
            error: function (err) {
                // window.location = "../Home/ErrorMsg";
            }
        });
    },
    show: function () {
        $('.pageholder').animate({
            width: 730,
            marginLeft: 1,
            marginRight: -730,
            display: 'toggle'
        }, 'slow');
    }, hide: function () {
        $('.pageholder').animate({
            width: 0,
            marginLeft: 730,
            marginRight: 0,
            display: 'toggle'
        }, 'slow');
    },
    loadSlimScroll: function (scrollToInt, currentmoduleOrder) {
        if (parseInt(currentmoduleOrder) >= 5) {
            $('.scroll1').slimScroll({ scrollTo: scrollToInt });
        }
    },
    GetUserRatingByPoeId: function (quetionid) {
        var resp;
        Common.ajaxSyncPost({
            url: '../../Feedback/GetUserRatingByPoeId',
            data: { questionid: quetionid },
            success: function (response) {
                resp = response;
            },
            error: function (err) {
                resp = response;
            }
        });
        return resp;
    },
    //UpdateFeedbackNotes: function () {
    //    var textval = $('textarea').sceditor('instance').getBody()[1].innerText.replace(/^\s+/, "");
    //    $('#Qno' + $('.nxtfb:visible').attr('id').replace('bn', '')).data('Notes', textval);
    //    Common.ajaxSyncPost({
    //        url: '../../Feedback/UpdateFeedbackNotes',
    //        data: { questionid: $('#currentquestionid').val(), Notes: textval },
    //        success: function (response) {
    //            // alert('Note Saved');
    //        },
    //        error: function (err) {
    //            alert('Error occured while updating');
    //        }
    //    });
    //},
    loadlastansweredquestion: function () {
        var firstTime = parseInt($('#userratingcount').val());
        $('.feedbackcomplete,.surveyQuestions,.surveyAreas').hide();
        $('.questions').removeClass('overallProductSurvey');
        if ($('#surveyMode').val() != 1 || firstTime != 0) {
            var lastid = $('.feedbackcomplete').prev().attr('id').replace('q', '');
            $('.feedbackcomplete').prev().prev().show();
            $('.feedbackcomplete').prev().css('opacity', '1');
            $('.feedbackcomplete').css({ 'margin-left': '1.5%', 'left': '-8%' });
            $('#plast').hide();
            //alert(lastid);
            $('#p' + lastid).show();
            $('#bn' + lastid).show();
            //alert();
            $('#poemoduleName').html($('#poemodule').find('.selected').find('p').html());
        } else {

            var lastid = $('.surveyAreas').prev().attr('id').replace('q', '');
            //alert(lastid);
            $('.surveyAreas').prev().prev().show();
            $('#q' + lastid).show();
            $('#q' + lastid).css('left', '-9.6%');
            $('.surveyAreas').prev().css('opacity', '1');
            $('.surveyAreas').css({ 'margin-left': '1.5%', 'left': '-8%' });
            $('#plast').hide();
            //alert(lastid);
            $('.prevfb,.nxtfb').hide();
            $('#p' + lastid).show();
            $('#bn' + lastid).show();
            $('.surveymodule').removeClass('selected');
            $('.surveymodule').find('img').attr('src', '../Images/icons/survey_icon.png');
            $('.surveymodule').prev('li').addClass('selected');
            var id = $('.surveymodule').prev('li').attr('id').replace('li', '');
            $('.surveymodule').prev('li').find('img').attr('src', '../Images/icons/' + $('#selectedpoe').val().replace("/", "") + id + 'h.png');
            $('#poemoduleName').html($('#poemodule').find('.selected').find('p').html());
        }

    },
    submitfeedback: function () {

        $("#status").fadeIn();
        $("#preloader").fadeIn();
        setTimeout(function () {
            details_feedback.completefeedback();

        }, 1000);
    }
};
//save feedback result
var saveFeedbackResults = function (request) {
    Common.ajaxSyncPost({
        url: '../../Feedback/SaveTakePOEResult',
        data: request,
        //beforeSend: function () {
        //    $("#status").fadeIn();
        //    $("#preloader").delay(100).fadeIn("slow");
        //},
        success: function (response) {
        },
        error: function (err) {
            //window.location = "../Home/ErrorMsg";
        }
    });
};
//save demographic result
var saveDemographicResult = function (questionid, answer) {
    Common.ajaxSyncPost({
        url: '../../Feedback/SaveDemographicResult',
        data: { 'questionId': questionid, 'answer': answer },
        //beforeSend: function () {
        //    $("#status").fadeIn();
        //    $("#preloader").delay(100).fadeIn("slow");
        //},
        success: function (response) {
        },
        error: function (err) {
            //window.location = "../Home/ErrorMsg";
        }
    });
};
//completed feedback
var completeFeedback = function () {
    $("#status").fadeIn();
    $("#preloader").fadeIn();
    Common.ajaxSyncPost({
        url: '../../Feedback/CompleteTakeFeedback',
        data: { fbinitial: $('#fbinitial').val() },
        //beforeSend: function () {
        //    $("#status").fadeIn();
        //    $("#preloader").delay(100).fadeIn("slow");
        //},
        success: function (response) {
            var result = $('#resultmode').val();
            if (result == "True") {
                window.location = "../../Home/Start";
            } else {
                window.location = "../../Results/Results";
            }

            //$("#status").fadeOut();
            //$("#preloader").delay(100).fadeOut("slow");
        },
        error: function (err) {
            //window.location = "../Home/ErrorMsg";
        }
    });
};
$(document).ready(function () {
    //debugger;
    //alert($('#resultmode').val())
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $('.scroll1').slimScroll();
    $('.scroll2').slimScroll();
    $('.scroll3').slimScroll();
    $('.pageholder').hide();
    $('#questions').hide();
    $('.frequencydiv').hide();
    $('#redirectNextPage,#feedbackClose').on('click', function () {
        $('#overallFeedback').hide();
        $("#status").fadeIn();
        $("#preloader").fadeIn();
        completeFeedback();
    });

    Common.setTopMenu(2);
    //$('#savenotes').click(function () { details_feedback.UpdateFeedbackNotes(); $(document).click(); });
    details_feedback.loadLastSavedQuestion();
    details_feedback.loadPoeName();
    details_feedback.loadQuestioncount({ url: '../../Feedback/GetQuestionCount', data: { 'type': 1 } }, '#totalQuestions');
    // details_feedback.loadclockevent();
    details_feedback.loadModuleIds({ url: '../../Feedback/GetPracticeArea' });
    //details_feedback.loadModuleAndPoeContent({ url: '../../Feedback/GetIntoContentByModuleOrder', data: { 'moduleId': 0 } });
    //details_feedback.loadModuleAndPoeContent({ url: '../../Feedback/GetIntoContentByModuleOrder', data: { 'moduleId': 1 } });
    $('.pane').find('input[type=radio]:checked').removeAttr('checked');
    $("#n" + $(this).context.title).attr('checked', 'checked');
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/start-feedback_h.png');
    //  details_feedback.loadcommentline();
    $('#q2').css('opacity', '.2');
    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
    var status = parseInt($('#fbStatus').val());
    if (status == 1) {
        var lastquestion = parseInt($('#lastSavedQuestionOrder').val());
        if (lastquestion != 0) {
            for (var j = 1; j < lastquestion; j++) {
                details_feedback.nextclick(j, j + 1);
            }
        }
        $('#lastSavedQuestionOrder').val(0);
    }
    $('#sticky > ul > li > a').click(function () {
        $('#sticky > ul > li > a').each(function (index, item) {
            $(item).removeClass('select' + $(item).attr('id'));
        });
        $(this).addClass('select' + $(this).attr('id'));
    });
    $(document).click(function () {
        $('#sticky > ul > li > a').each(function (index, item) {
            $(item).removeClass('select' + $(item).attr('id'));
        });
    });

    $('#poemodule li').hover(
       function () {
           removeAttrHover();
           if (!$(this).hasClass('surveymodule')) {
               $(this).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + $(this).attr("id").replace("li", "") + "h" + ".png");
           } else {
               $(this).find('img').attr("src", "../Images/icons/survey_iconH.png");
           }

       }, function () {
           // alert('123')
           removeAttrHover();
           if (!$('#poemodule>li.selected').hasClass('surveymodule')) {
               $('#poemodule>li.selected').find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + $('#poemodule>li.selected').attr("id").replace("li", "") + "h" + ".png");
           } else {
               $('.surveymodule').find('img').attr('src', '../Images/icons/survey_iconH.png');
           }
       });

    $('#dv').css("visibility", "visible");
    LoadDrpDownChange();
    $('#nextSurvey,#nextWelcome,#prevIntial,#prevSurvey,#prevWelcome').hide();
});
function validateIntial() {
    //var validateErr = true;
    // debugger;
    var trimtext = $('#fbinitial').val().trim();
    var poeid = $('#selectPoe').val();
    var answer1 = $('#survQuestion1 :selected').val();
    var answer2 = $('#survQuestion2 :selected').val();
    var answer3 = $('#survQuestion3 :selected').val();
    var answer4 = $('#survQuestion4 :selected').val();
    var firstTime = parseInt($('#userratingcount').val());
    if (poeid == 26 && firstTime == 0) {
        if (answer1 == 0 || answer2 == 0 || answer3 == 0 || answer4 == 0) {
            $('#masterMsgCont').text("Please select a response for the demographic survey question");
            $('#overallCont').show();
            //alert("Special characters are not allowed in this field");
            return false;
        }
    } else if (poeid >= 18 && poeid <= 25 && firstTime == 0) {
        if (answer1 == 0 || answer2 == 0 || answer3 == 0) {
            $('#masterMsgCont').text("Please select a response for the demographic survey question");
            $('#overallCont').show();
            //alert("Special characters are not allowed in this field");
            return false;
        }
    }
    if (trimtext != '') {
        // alert(trimtext);
        var regex = new RegExp("^[a-zA-Z ]+$");
        if (regex.test(trimtext)) {

            return true;
        } else {
            $('#masterMsgCont').text("Special characters are not allowed in this field");
            $('#overallCont').show();
            //alert("Special characters are not allowed in this field");
            return false;
        }
    } else {
        $('#masterMsgCont').text("Please enter your name");
        $('#overallCont').show();
        //alert('Enter the initials');
        return false;
    }


}

function LoadDrpDownChange() {
    //debugger;
    //$('#survQuestion1').on('change', function () {
    //    var answer = $('#survQuestion1 :selected').val();
    //    if (answer != 0) {
    //        saveDemographicResult(1, answer);
    //    }
    //});
    //$('#survQuestion2').on('change', function () {
    //    var answer = $('#survQuestion2 :selected').val();
    //    if (answer != 0) {
    //        saveDemographicResult(2, answer);
    //    }
    //});
    //$('#survQuestion3').on('change', function () {
    //    var answer = $('#survQuestion3 :selected').val();
    //    if (answer != 0) {
    //        saveDemographicResult(3, answer);
    //    }
    //});
    //$('#survQuestion4').on('change', function () {
    //    var answer = $('#survQuestion4 :selected').val();
    //    if (answer != 0) {
    //        saveDemographicResult(4, answer);
    //    }
    //});
}
function removeAttrHover() {
    var count = 1;
    $('#poemodule li').each(function () {
        if (!$(this).hasClass('selected')) {
            if (!$(this).hasClass('surveymodule')) {
                $(this).find('img').attr("src", "../Images/icons/" + $('#selectedpoe').val().replace("/", "") + count + ".png");
            } else {
                $(this).find('img').attr("src", "../Images/icons/survey_icon.png");
            }
        }
        count++;
    });
}

function SaveAnswer(data) {
    //alert("sdsd");
    var answer = $(data).find('option:selected').val();
    var questionid = parseInt($(data).attr('data-question'));
    //alert(questionid);
    if (answer != 0) {
        saveDemographicResult(questionid, answer);
    }
}
function LoadSliderEvent() {
    $('.impbtn1').click(function () {
        $(this).parents('.impscale_bg').attr("data-rating", 1);
        $(this).parents('.impscale_bg').find(".impadddiv").addClass("impscaleover1");
        $(this).parents('.impscale_bg').find(".impscale_handle").addClass("impscale_handle1");
        $(this).parents('.impscale_bg').find(".impbtn1").addClass("addcolor");
        $(this).parents('.impscale_bg').find(".impbtn2").removeClass("addcolor");
        $(this).parents('.impscale_bg').find(".impbtn3").removeClass("addcolor");
        $(this).parents('.impscale_bg').find(".impbtn4").removeClass("addcolor");
        $(this).parents('.impscale_bg').find(".impadddiv").removeClass("impscaleover2").removeClass("impscaleover3").removeClass("impscaleover4");
        $(this).parents('.impscale_bg').find(".impscale_handle").removeClass("impscale_handle2").removeClass("impscale_handle3").removeClass("impscale_handle4");
    });
    $('.impbtn2').click(function () {
        $(this).parents('.impscale_bg').attr("data-rating", 2);
        $(this).parents('.impscale_bg').find(".impadddiv").addClass("impscaleover2");
        $(this).parents('.impscale_bg').find(".impscale_handle").addClass("impscale_handle2");
        $(this).parents('.impscale_bg').find(".impbtn2").addClass("addcolor");
        $(this).parents('.impscale_bg').find(".impbtn1, .impbtn3, .impbtn4").removeClass("addcolor");
        $(this).parents('.impscale_bg').find(".impadddiv").removeClass("impscaleover1").removeClass("impscaleover3").removeClass("impscaleover4");
        $(this).parents('.impscale_bg').find(".impscale_handle").removeClass("impscale_handle1").removeClass("impscale_handle3").removeClass("impscale_handle4");
    });
    $('.impbtn3').click(function () {
        $(this).parents('.impscale_bg').attr("data-rating", 3);
        $(this).parents('.impscale_bg').find(".impadddiv").addClass("impscaleover3");
        $(this).parents('.impscale_bg').find(".impscale_handle").addClass("impscale_handle3");
        $(this).parents('.impscale_bg').find(".impbtn3").addClass("addcolor");
        $(this).parents('.impscale_bg').find(".impbtn1, .impbtn2, .impbtn4").removeClass("addcolor");
        $(this).parents('.impscale_bg').find(".impadddiv").removeClass("impscaleover1").removeClass("impscaleover2").removeClass("impscaleover4");
        $(this).parents('.impscale_bg').find(".impscale_handle").removeClass("impscale_handle1").removeClass("impscale_handle2").removeClass("impscale_handle4");
    });
    $('.impbtn4').click(function () {
        $(this).parents('.impscale_bg').attr("data-rating", 4);
        $(this).parents('.impscale_bg').find(".impadddiv").addClass("impscaleover4");
        $(this).parents('.impscale_bg').find(".impscale_handle").addClass("impscale_handle4");
        $(this).parents('.impscale_bg').find(".impbtn4").addClass("addcolor");
        $(this).parents('.impscale_bg').find(".impbtn1, .impbtn2, .impbtn3").removeClass("addcolor");
        $(this).parents('.impscale_bg').find(".impadddiv").removeClass("impscaleover1").removeClass("impscaleover2").removeClass("impscaleover3");
        $(this).parents('.impscale_bg').find(".impscale_handle").removeClass("impscale_handle1").removeClass("impscale_handle2").removeClass("impscale_handle3");
    });

    //Capability
    $('.capbtn1').click(function () {
        $(this).parents('.capscale_bg').attr("data-answer", 1);
        $(this).parents('.capscale_bg').find(".capadddiv").addClass("capscaleover1");
        $(this).parents('.capscale_bg').find(".capscale_handle").addClass("capscale_handle1");
        $(this).parents('.capscale_bg').find(".capbtn1").addClass("addcolor");
        $(this).parents('.capscale_bg').find(".capbtn2, .capbtn3, .capbtn4").removeClass("addcolor");
        $(this).parents('.capscale_bg').find(".capadddiv").removeClass("capscaleover2").removeClass("capscaleover3").removeClass("capscaleover4");
        $(this).parents('.capscale_bg').find(".capscale_handle").removeClass("capscale_handle2").removeClass("capscale_handle3").removeClass("capscale_handle4");
    });

    $('.capbtn2').click(function () {
        $(this).parents('.capscale_bg').attr("data-answer", 2);
        $(this).parents('.capscale_bg').find(".capadddiv").addClass("capscaleover2");
        $(this).parents('.capscale_bg').find(".capscale_handle").addClass("capscale_handle2");
        $(this).parents('.capscale_bg').find(".capbtn2").addClass("addcolor");
        $(this).parents('.capscale_bg').find(".capbtn1, .capbtn3, .capbtn4").removeClass("addcolor");
        $(this).parents('.capscale_bg').find(".capadddiv").removeClass("capscaleover1").removeClass("capscaleover3").removeClass("capscaleover4");
        $(this).parents('.capscale_bg').find(".capscale_handle").removeClass("capscale_handle1").removeClass("capscale_handle3").removeClass("capscale_handle4");
    });

    $('.capbtn3').click(function () {
        $(this).parents('.capscale_bg').attr("data-answer", 3);
        $(this).parents('.capscale_bg').find(".capadddiv").addClass("capscaleover3");
        $(this).parents('.capscale_bg').find(".capscale_handle").addClass("capscale_handle3");
        $(this).parents('.capscale_bg').find(".capbtn3").addClass("addcolor");
        $(this).parents('.capscale_bg').find(".capbtn1, .capbtn2, .capbtn4").removeClass("addcolor");
        $(this).parents('.capscale_bg').find(".capadddiv").removeClass("capscaleover1").removeClass("capscaleover2").removeClass("capscaleover4");
        $(this).parents('.capscale_bg').find(".capscale_handle").removeClass("capscale_handle1").removeClass("capscale_handle2").removeClass("capscale_handle4");
    });

    $('.capbtn4').click(function () {
        $(this).parents('.capscale_bg').attr("data-answer", 4);
        $(this).parents('.capscale_bg').find(".capadddiv").addClass("capscaleover4");
        $(this).parents('.capscale_bg').find(".capscale_handle").addClass("capscale_handle4");
        $(this).parents('.capscale_bg').find(".capbtn4").addClass("addcolor");
        $(this).parents('.capscale_bg').find(".capbtn1, .capbtn2, .capbtn3").removeClass("addcolor");
        $(this).parents('.capscale_bg').find(".capadddiv").removeClass("capscaleover1").removeClass("capscaleover2").removeClass("capscaleover3");
        $(this).parents('.capscale_bg').find(".capscale_handle").removeClass("capscale_handle1").removeClass("capscale_handle2").removeClass("capscale_handle3");
    });
    $('.freqbtn1').click(function () {
        $(this).parents('.freqscale_bg').attr("data-answer", 1);
        $(this).parents('.freqscale_bg').find(".freqadddiv").addClass("freqscaleover1");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").addClass("freqscale_handle1");
        $(this).parents('.freqscale_bg').find(".freqbtn1").addClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqbtn2, .freqbtn3, .freqbtn4").removeClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqadddiv").removeClass("freqscaleover2").removeClass("freqscaleover3").removeClass("freqscaleover4");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").removeClass("freqscale_handle2").removeClass("freqscale_handle3").removeClass("freqscale_handle4");
    });

    $('.freqbtn2').click(function () {
        $(this).parents('.freqscale_bg').attr("data-answer", 2);
        $(this).parents('.freqscale_bg').find(".freqadddiv").addClass("freqscaleover2");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").addClass("freqscale_handle2");
        $(this).parents('.freqscale_bg').find(".freqbtn2").addClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqbtn1, .freqbtn3, .freqbtn4").removeClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqadddiv").removeClass("freqscaleover1").removeClass("freqscaleover3").removeClass("freqscaleover4");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").removeClass("freqscale_handle1").removeClass("freqscale_handle3").removeClass("freqscale_handle4");
    });

    $('.freqbtn3').click(function () {
        $(this).parents('.freqscale_bg').attr("data-answer", 3);
        $(this).parents('.freqscale_bg').find(".freqadddiv").addClass("freqscaleover3");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").addClass("freqscale_handle3");
        $(this).parents('.freqscale_bg').find(".freqbtn3").addClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqbtn1, .freqbtn2, .freqbtn4").removeClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqadddiv").removeClass("freqscaleover1").removeClass("freqscaleover2").removeClass("freqscaleover4");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").removeClass("freqscale_handle1").removeClass("freqscale_handle2").removeClass("freqscale_handle4");
    });

    $('.freqbtn4').click(function () {
        $(this).parents('.freqscale_bg').attr("data-answer", 4);
        $(this).parents('.freqscale_bg').find(".freqadddiv").addClass("freqscaleover4");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").addClass("freqscale_handle4");
        $(this).parents('.freqscale_bg').find(".freqbtn4").addClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqbtn1, .freqbtn2, .freqbtn3").removeClass("addcolor");
        $(this).parents('.freqscale_bg').find(".freqadddiv").removeClass("freqscaleover1").removeClass("freqscaleover2").removeClass("freqscaleover3");
        $(this).parents('.freqscale_bg').find(".freqscale_handle").removeClass("freqscale_handle1").removeClass("freqscale_handle2").removeClass("freqscale_handle3");
    });
}