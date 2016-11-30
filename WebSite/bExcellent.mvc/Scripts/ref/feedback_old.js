//page loader//
$(document).ready(function () {
});
//function dropincontentbox(options) {
//    this.s = jQuery.extend({ fx: 'easeOutBounce', fxtime: 500, freq: 'always', showduration: 0, pos: ['center', 'center'], deferred: 0.5 }, options)
//    var thisbox = this
//    this.s.source = (!$.isArray(this.s.source)) ? [this.s.source] : this.s.source //convert source option to array
//    var loadbox = (this.s.deferred == "fullon") ? false : true //var to dictate whether to load drop in box
//    this.s.freqispersist = !isNaN(parseInt(this.s.freq))
//    if ((this.s.freq == "session" || this.s.freqispersist) && dropincontentbox.routines.getCookie(this.s.source[0])) { //stage 1 check to see if box should not be loaded
//        loadbox = false
//        if (dropincontentbox.routines.getCookie(this.s.source[0] + '_freq') != this.s.freq) { //reset cookie and load box if freq setting has been changed
//            dropincontentbox.routines.setCookie(this.s.source[0], '', -1) //delete cookie
//            loadbox = true
//        }
//    }
//    jQuery(function ($) { //on document.ready
//        thisbox.init($, thisbox.s, loadbox)
//    })
//}

//dropincontentbox.prototype = {
//    show: function (pos) {
//        var $ = jQuery, $contentbox = this.$contentbox.css({ display: 'block' }), s = this.s
//        if (typeof pos == "undefined")
//            var pos = s.pos
//        var winmeasure = { w: $(window).width(), h: $(window).height(), left: $(document).scrollLeft(), top: $(document).scrollTop()} //get various window measurements
//        var boxmeasure = { w: $contentbox.outerWidth(), h: $contentbox.outerHeight() }
//        var finalpos = []
//        $.each(pos, function (i, val) {
//            if (val < 0) { //if position value is negative, it means box should be offset from right edge of window
//                finalpos[i] = (i == 0) ? winmeasure.left + winmeasure.w - boxmeasure.w + val : winmeasure.top + winmeasure.h - boxmeasure.h + val
//            }
//            else if (val == "center") {
//                finalpos[i] = (i == 0) ? winmeasure.left + winmeasure.w / 2 - boxmeasure.w / 2 : winmeasure.top + winmeasure.h / 2 - boxmeasure.h / 2
//            }
//        })
//        $contentbox.css({ left: finalpos[0], top: winmeasure.top - boxmeasure.h - 10, visibility: 'visible' }).animate({ top: finalpos[1] }, s.fxduration, s.fx)
//    },

//    hide: function () {
//        this.$contentbox.hide()
//        this.$closebutton.hide()
//    },

//    init: function ($, s, loadcheck) {
//        var thisbox = this
//        this.$contentbox = (s.source.length == 1) ? $(s.source[0]).css({ position: 'absolute', visibility: 'hidden', top: 0 }).addClass(s.cssclass) : ""
//        function selectiveshow() {
//            if (loadcheck == false)
//                return
//            thisbox.$contentbox.append(thisbox.$closebutton).hover( //show close button when mouse hovers over box
//				function () {
//				    thisbox.$closebutton.stop(true, true).fadeIn()
//				},
//				function () {
//				    thisbox.$closebutton.stop(true, true).fadeOut()
//				}
//			) //end hover
//            function selectivesetcookie() {
//                if (s.freq == "session" || s.freqispersist) {
//                    dropincontentbox.routines.setCookie(s.source[0], 'yes', s.freq)
//                    dropincontentbox.routines.setCookie(s.source[0] + '_freq', s.freq, s.freq)
//                }
//            } //END selectivesavecookie
//            if (s.deferred > 0) //defer loading of box?
//                setTimeout(function () { thisbox.show(s.pos); selectivesetcookie() }, s.deferred * 1000)
//            else if (s.deferred == 0) {
//                thisbox.show(s.pos)
//                selectivesetcookie()
//            }
//            if (s.showduration > 0)
//                setTimeout(function () { thisbox.hide() }, s.deferred * 1000 + s.showduration * 1000)
//        } //END selectiveshow
//        if (s.source.length == 2) { //if content source is ajax
//            $.ajax({
//                url: s.source[1].replace(/^http:\/\/[^\/]+\//i, "http://" + window.location.hostname + "/"), //path to external content
//                dataType: 'html',
//                error: function (ajaxrequest) {
//                    alert('Error fetching Ajax content\nServer Response: ' + ajaxrequest.responseText)
//                },
//                success: function (content) {
//                    thisbox.$contentbox = $(content).addClass(s.cssclass).css({ position: 'absolute', visibility: 'hidden', top: 0 }).appendTo(document.body)
//                    selectiveshow()
//                }
//            })// end ajax
//        }
//        else {
//            selectiveshow()
//        }
//    }
//}

//dropincontentbox.routines = {
//    getCookie: function (Name) {
//        var re = new RegExp(Name + "=[^;]+", "i"); //construct RE to search for target name/value pair
//        if (document.cookie.match(re)) //if cookie found
//            return document.cookie.match(re)[0].split("=")[1] //return its value
//        return null
//    },

//    setCookie: function (name, value, duration) {
//        var expirestr = '', expiredate = new Date()
//        if (typeof duration != "undefined") { //if set persistent cookie
//            var offsetmin = parseInt(duration) * (/hr/i.test(duration) ? 60 : /day/i.test(duration) ? 60 * 24 : 1)
//            expiredate.setMinutes(expiredate.getMinutes() + offsetmin)
//            expirestr = "; expires=" + expiredate.toUTCString()
//        }
//        document.cookie = name + "=" + value + "; path=/" + expirestr
//    }
//}

var feedback = {
    poeMenu: function (userid) {
        // var userid = $('#userid').html();
        // var  = 167;
        // load sub contents
        Common.ajax({
            url: serviceUrl + 'Common.svc/GetPoEsByUserId',
            data: { 'userId': userid },
            success: function (response) {
                var _poes = response;

                $('#selectedpoe').html(response[0]['POEId']);
                //    var _poes = $.parseJSON(response);
                feedback.loadfeedbackMenu(userid, response[0]['POEId']);
                /*     if (page == 'improvementview' || page == 'impcompareview' || 'matrixview') {
                //  findAndRemove(_poes, 'POEId', '0');
                _poes.splice(0, 1);
                }*/
                var source = "{{#each poes}}<li id ={{POEId}} data-value={{POEId}}><a><h2>&nbsp;</h2><p>{{POEName}}</p></a></li>{{/each}}";

                /*Handlebars.registerHelper('classname', function () {
                count++;
                return (count % 2 == 0) ? new Handlebars.SafeString("row-gray") : new Handlebars.SafeString("row-white");
                });*/
                /*
                <ul><li><h2>&nbsp;</h2><p>Opportunity Manager</p></li></ul>
                */
                var template = Handlebars.compile(source);
                $('#feedback-poe-list').html('<ul class="poe-list-ul">' + template({ 'poes': _poes }) + '</ul>');

                $('ul.poe-list-ul li').click(function (e) {
                    //   debugger;
                    $('#selectedpoe').html(this.id);
                    feedback.loadfeedbackMenu(userid, this.id);
                    //alert(this.id);
                });
                /*
                $('#' + id + '> div').unbind('click');
                $('#' + id + '> div').bind('click', function () {
                if (callback && typeof callback == 'function') {
                callback(this);
                }
                });

                if (loadCallback && typeof loadCallback == 'function') {
                loadCallback();
                }*/
            },
            error: function (err) {
                $('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },
    loadfeedbackMenu: function (userid, poeid) {
        //  var userid = 167;
        Common.ajax({
            url: serviceUrl + 'Common.svc/GetUserRole',
            data: { 'userId': userid, 'poeId': poeid },
            /*data: 'provide your data in json format',*/
            success: function (response) {
                //        debugger;
                feedback.loadfbmenuHtml(userid, poeid, response);
                $('#userroleforpoe').html(response);

                //alert(response);
            },
            error: function (err) {
                //  alert(err);
            }
            //      var _views = $.parseJSON(response);
        });
    },
    loadfbmenuHtml: function (userid, poeid, role) {
        // alert(role);
        var htmlcontent = "";
        if (role == 1) {
            htmlcontent = " <ul> <li><a> <h2 id='feedback-given-count'> </h2> <p style='padding-top: 20px'> Feedback Given</p> </a></li> <li><a> <h2 id='feedback-recive-count'> </h2> <p style='padding-top: 20px'> Feedback Received</p> </a></li> <li><a href='javascript:dropinbox2.show()'> <div class='img'> <img src='../images/img/take-icon.png' /></div> <p style='padding-top: 15px'> Take</p> </a></li> <li><a href='#'> <div class='img'> <img src='../images/img/receive.png' /></div> <p style='padding-top: 15px'> Receive</p> </a></li> <li><a href='#'> <div class='img'> <img src='../images/img/history.png' /></div> <p style='padding-top: 15px'> History</p> </a></li> <li><a href='#'> <div class='img'> <img src='../images/img/status.png' /></div> <p style='padding-top: 15px'> Status</p> </a></li> </ul>";
            $('#feedback-menu').html(htmlcontent);
        }
        else if (role == 2) {
            htmlcontent = " <ul> <li><a> <h2 id='feedback-given-count'> </h2> <p style='padding-top: 20px'> Feedback Given</p> </a></li> <li><a> <h2 id='feedback-recive-count'> </h2> <p style='padding-top: 20px'> Feedback Received</p> </a></li> <li><a href='javascript:dropinbox2.show()'> <div class='img'> <img src='../images/img/take-icon.png' /></div> <p style='padding-top: 15px'> Give</p> </a></li> <li><a href='#'> <div class='img'> <img src='../images/img/receive.png' /></div> <p style='padding-top: 15px'> Invite</p> </a></li> <li><a href='#'> <div class='img'> <img src='../images/img/history.png' /></div> <p style='padding-top: 15px'> History</p> </a></li> <li><a href='#'> <div class='img'> <img src='../images/img/status.png' /></div> <p style='padding-top: 15px'> Status</p> </a></li> </ul>";
            $('#feedback-menu').html(htmlcontent);
        } else if (role == 12) {
            htmlcontent = " <ul> <li><a> <h2 id='feedback-given-count'> </h2> <p style='padding-top: 20px'> Feedback Given</p> </a></li> <li><a> <h2 id='feedback-recive-count'> </h2> <p style='padding-top: 20px'> Feedback Received</p> </a></li> <li><a href='javascript:dropinbox2.show()'> <div class='img'> <img src='../images/img/take-icon.png' /></div> <p style='padding-top: 15px'> Take</p> </a></li> <li><a href='#'> <div class='img'> <img src='../images/img/receive.png' /></div> <p style='padding-top: 15px'> Receive</p> </a></li>  <li><a href='javascript:dropinbox2.show()'> <div class='img'> <img src='../images/img/take-icon.png' /></div> <p style='padding-top: 15px'> Give</p> </a></li> <li><a href='#'> <div class='img'> <img src='../images/img/receive.png' /></div> <p style='padding-top: 15px'> Invite</p> </a></li><li><a href='#'> <div class='img'> <img src='../images/img/history.png' /></div> <p style='padding-top: 15px'> History</p> </a></li> <li><a href='#'> <div class='img'> <img src='../images/img/status.png' /></div> <p style='padding-top: 15px'> Status</p> </a></li> </ul>";
            $('#feedback-menu').html(htmlcontent);
        } else {
            htmlcontent = " <ul> <li><a> <h2 id='feedback-given-count'> </h2> <p style='padding-top: 20px'> Feedback Given</p> </a></li> <li><a> <h2 id='feedback-recive-count'> </h2> <p style='padding-top: 20px'> Feedback Received</p> </a></li></ul>";
            $('#feedback-menu').html(htmlcontent);
        }
        feedback.loadcount({ url: serviceUrl + 'feedback.svc/GetFeedbackGivenCount', data: { 'userId': userid, 'poeId': poeid} }, '#feedback-given-count');
        feedback.loadcount({ url: serviceUrl + 'feedback.svc/GetFeedbackReceivedCount', data: { 'userId': userid, 'poeId': poeid} }, '#feedback-recive-count');
    },
    loadcount: function (option, element) {
        Common.ajax({
            url: option.url,
            data: (option.data) ? option.data : null,
            /*data: 'provide your data in json format',*/
            success: function (response) {
                $(element).html(response);
                //alert(response);
            },
            error: function (err) {
                //  alert(err);
            }
            //      var _views = $.parseJSON(response);
        });
    },
    loadquickview: function () {
        $('#contents').load('/client/self_feedback.aspx', function (response, status, xhr) {
            // Common.animate('wcsi-inner-content', function () {
            var moduleIds = new Array();
            var poeid = 3;    
            self_feedback.loadModuleIds({ url: serviceUrl + 'feedback.svc/GetPracticeArea', data: {'poeid': poeid}, moduleIds:moduleIds } );
          
        
              //  Wcsi.landing();
            });
            
        

          
    },
    loaddetailview: function () {
        $('#contents').load('/client/detailedview_self_feedback.aspx');
    }
};
$(document).ready(function () {
    $('#feedback-quickview').live('click', function () { feedback.loadquickview(); });
    $('#feedback-detailsview').live('click', function () { feedback.loaddetailview(); });
});
feedback.poeMenu(167);
var self_feedback = {
    loadQuickViewPAQuestions: function (option) {
        // alert('load');
        Common.ajax({
            url: option.url,
            data: (option.data) ? option.data : null,
            /*data: 'provide your data in json format',*/
            success: function (response) {
                for (var i = 0; i < response.length; i++) {
                    if (option.moduleorder > 2) {
                        $('#Qn' + (i + 1)).prev('P').remove();
                    }
                    //debugger;
                    $('#Qn' + (i + 1)).before(response[i].QuetionText);
                    $('#Qn' + (i + 1)).data("question", response[i].QuestionId);
                    $('#Qn' + (i + 1)).data("moduleid", option.data.moduleId);

                    //alert(response);
                }



                // $('#li'+2).removeClass('act');//.addClass('quickview tsf'); 
                if (option.moduleorder == 2) {
                    $('#next').live('click', function () {

                        self_feedback.saveModuleData();

                    });
                }
            },
            error: function (err) {
                //  alert(err);
            }
            //      var _views = $.parseJSON(response);
        });
    },


    loadModuleIds: function (option) {
        Common.ajax({
            url: option.url,
            data: (option.data) ? option.data : null,
            /*data: 'provide your data in json format',*/
            success: function (response) {
                for (var i = 0; i < response.length; i++) {
                    option.moduleIds[response[i].ModuleOrderNumber] = response[i].ModuleId;
                    $('#module' + (i + 1)).val(response[i].ModuleId);
                }
                self_feedback.loadQuickViewPAQuestions({ url: serviceUrl + 'feedback.svc/GetQuestions', data: { 'moduleId': $('#module2').val() }, moduleorder: 2 });
                self_feedback.loadslider();
                $('#currentmoduleOrder').val('2');
            },
            error: function (err) {

            }

        });
    },

    saveModuleData: function () {
        var savePOEResultRequests = [];
        for (var j = 0; j < 5; j++) {

            var savePOEResultRequest = new Requests.SavePOEResultRequest();
            savePOEResultRequest.UserId = 167;
            savePOEResultRequest.Answer = parseInt($('#Qn' + (j + 1)).data("answer"));
            savePOEResultRequest.AnswerType = 1;
            savePOEResultRequest.ModuleNumber = $('#Qn' + (j + 1)).data("moduleid"); ;
            savePOEResultRequest.QuestionId = $('#Qn' + (j + 1)).data("question");
            savePOEResultRequest.Comment = null;
            savePOEResultRequest.FeedbackStatus = 1;
            savePOEResultRequest.FeedbackId = 5;

            savePOEResultRequests.push(savePOEResultRequest);

            // alert($('#Qn' + (j + 1)).data("question"));
            // alert($('#Qn' + (j + 1)).data("answer"));
        }
       
        
         saveFeedbackResults(savePOEResultRequests);
        //   alert($('#Qn2').data("answer"));

        /*inside save success*/
        var curmod = parseInt($('#currentmoduleOrder').val());
        var nextmod = curmod + 1;
        self_feedback.loadQuickViewPAQuestions({ url: serviceUrl + 'feedback.svc/GetQuestions', data: { 'moduleId': $('#module' + nextmod).val() }, moduleorder: nextmod });
        self_feedback.loadslider();
        $('#currentmoduleOrder').val(nextmod);
        $('#li' + curmod).removeClass('act');
        $('#li' + nextmod).addClass('act');
        /*inside save success*/
    },

    loadslider: function () {
        $('#Qn1').data("answer", 1)
        $('#Qn2').data("answer", 1)
        $('#Qn3').data("answer", 1)
        $('#Qn4').data("answer", 1)
        $('#Qn5').data("answer", 1)


        $("#Qn1").slider({
            min: 0,
            max: 4,
            range: "min",
            value: 1,
            slide: function (event, ui) {
                if (ui.value == 0) {
                    event.preventDefault();
                    $('#Qn1').data("answer", 1);
                } else {
                    $('#Qn1').data("answer", ui.value);
                }
            }
        });

        $("#Qn2").slider({
            min: 0,
            max: 4,
            range: "min",
            value: 1,
            slide: function (event, ui) {
                if (ui.value == 0) {
                    event.preventDefault();
                    $('#Qn2').data("answer", 1);
                } else {
                    $('#Qn2').data("answer", ui.value);
                }
            }
        });


        $("#Qn3").slider({
            min: 0,
            max: 4,
            range: "min",
            value: 1,
            slide: function (event, ui) {
                if (ui.value == 0) {
                    event.preventDefault();
                    $('#Qn3').data("answer", 1);
                } else {
                    $('#Qn3').data("answer", ui.value);
                }
            }
        });


        $("#Qn4").slider({
            min: 0,
            max: 4,
            range: "min",
            value: 1,
            slide: function (event, ui) {
                if (ui.value == 0) {
                    event.preventDefault();
                    $('#Qn4').data("answer", 1);
                } else {
                    $('#Qn4').data("answer", ui.value);
                }
            }
        });



        $("#Qn5").slider({
            min: 0,
            max: 4,
            range: "min",
            value: 1,
            slide: function (event, ui) {
                if (ui.value == 0) {
                    event.preventDefault();
                    $('#Qn5' + i).data("answer", 1);
                } else {
                    $('#Qn5' + i).data("answer", ui.value);
                }
            }
        });


        $("#Qn6").slider({
            min: 0,
            max: 4,
            range: "min",
            value: 1,
            slide: function (event, ui) {
                if (ui.value == 0) {
                    event.preventDefault();
                    $('#Qn6' + i).data("answer", 1);
                } else {
                    $('#Qn6' + i).data("answer", ui.value);
                }
            }
        });

    }

}

var saveFeedbackResults = function (request) {
    //debugger;
    Common.ajaxPost({
        url: serviceUrl + 'Feedback.svc/SavePOEResult',
        data: request,
        /*data: 'provide your data in json format',*/
        success: function (response) {
            //alert(response);
        },
        error: function (err) {
            //  alert(err);
        }
    });
};

 
    
