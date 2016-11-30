$(document).ready(function () {
    var screenevent = $('#ScreenEvent').val();
    var browser = navigator.userAgent;
    $("#VideoPlayer").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script><div class='player' href='../../Video/BexcellentStoryBoard.flv''  style='display:block; width:480px; height:320px' ></div>");
    flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
        clip: {
            autoPlay: false,
            autoBuffering: true
        }
    });
    if (screenevent == 1 && browser.indexOf("Firefox") != -1) {
        $("#aboutVideo").html("");
        $("#aboutVideo").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script><div class='player' href='../../Video/BexcellentStoryBoard.flv''  style='display:block; width:480px; height:320px' ></div>");
        flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
            clip: {
                autoPlay: false,
                autoBuffering: true
            }
        });
        //$('.videolist').css('margin-top', '12px');
        //('#videoPopup').fadeIn("slow");
        $(".abtvideopopup, .abtvideo").fadeIn("slow");
    }

    $('#vid01').live('click', function () {
        $('#subjectMode').val(1);
        $('#contactHeader').text("Contact PIPE9");
        /// <reference path="../../Video/Kessaku Storyboard.flv" />
        $('#VideoPlayer').css('visibility', 'hidden');
        $('.formpopup,#formpopup').show();
        $('#videolistsOrder').val($(this).val());
        $('#vidLists').val(1);
        //$("#VideoPlayer").html(str + "<div class='player' href='../../Video/Kessaku Storyboard.flv'  style='display:block; width:480px; height:320px' ></div>");
        //flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
        //    clip: {
        //        autoPlay: false,
        //        autoBuffering: true
        //    }
        //});
    });
    $('#vid02').live('click', function () {
        $('#subjectMode').val(1);
        $('#contactHeader').text("Contact PIPE9");
        $('#VideoPlayer').css('visibility', 'hidden');
        $('.formpopup,#formpopup').show();
        $('#videolistsOrder').val($(this).val());
        $('#vidLists').val(1);
        /// <reference path="../../Video/The Profile of Excellence Story.flv" />

        //$("#VideoPlayer").html(str + "<div class='player' href='../../Video/The Profile of Excellence Story.flv'  style='display:block; width:480px; height:320px' ></div>");
        //flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
        //    clip: {
        //        autoPlay: false,
        //        autoBuffering: true
        //    }
        //});
    });
    $('#vid03').live('click', function () {
        $('#subjectMode').val(1);
        $('#contactHeader').text("Contact PIPE9");
        $('#VideoPlayer').css('visibility', 'hidden');
        $('.formpopup,#formpopup').show();
        $('#videolistsOrder').val($(this).val());
        $('#vidLists').val(1);
        /// <reference path="../../Video/The Kessaku Story.flv" />

        //$("#VideoPlayer").html(str + "<div class='player' href='../../Video/The Kessaku Story.flv'  style='display:block; width:480px; height:320px' ></div>");
        //flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
        //    clip: {
        //        autoPlay: false,
        //        autoBuffering: true
        //    }
        //});
    });
    $('#vid04').live('click', function () {
        $('#subjectMode').val(1);
        $('#contactHeader').text("Contact PIPE9");
        $('#VideoPlayer').css('visibility', 'hidden');
        $('.formpopup,#formpopup').show();
        $('#videolistsOrder').val($(this).val());
        $('#vidLists').val(1);
        /// <reference path="../../Video/The Microsoft Profile of Excellence Story by Cecilia Flombum.flv" />

        //$("#VideoPlayer").html(str + "<div class='player' href='../../Video/The Microsoft Profile of Excellence Story by Cecilia Flombum.flv'  style='display:block; width:480px; height:320px' ></div>");
        //flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
        //    clip: {
        //        autoPlay: false,
        //        autoBuffering: true
        //    }
        //});
    });
    $('#vid05').live('click', function () {
        $('#subjectMode').val(1);
        $('#contactHeader').text("Contact PIPE9");
        $('#VideoPlayer').css('visibility', 'hidden');
        $('.formpopup,#formpopup').show();
        $('#videolistsOrder').val($(this).val());
        $('#vidLists').val(1);
        /// <reference path="../../Video/The Microsoft Profile of Excellence Story with Johneen Bufford for standard definition.flv" />            /// <reference path="../../Video/The Microsoft Profile of Excellence Story by Cecilia Flombum.flv" />

        //$("#VideoPlayer").html(str + "<div class='player' href='../../Video/The Microsoft Profile of Excellence Story with Johneen Bufford.flv'  style='display:block; width:480px; height:320px' ></div>");
        //flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
        //    clip: {
        //        autoPlay: false,
        //        autoBuffering: true
        //    }
        //});
    });
    $('#vid06').live('click', function () {
        $('#subjectMode').val(1);
        $('#contactHeader').text("Contact PIPE9");
        $('#VideoPlayer').css('visibility', 'hidden');
        $('.formpopup,#formpopup').show();
        $('#videolistsOrder').val($(this).val());
        $('#vidLists').val(1);
        /// <reference path="../../Video/The Microsoft Profile of Excellence Story with Johneen Bufford for standard definition.flv" />            /// <reference path="../../Video/The Microsoft Profile of Excellence Story by Cecilia Flombum.flv" />

        //$("#VideoPlayer").html(str + "<div class='player' href='../../Video/The Microsoft Profile of Excellence Story by Dave Miller.flv'  style='display:block; width:480px; height:320px' ></div>");
        //flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
        //    clip: {
        //        autoPlay: false,
        //        autoBuffering: true
        //    }
        //});
    });

    $('#vid07').live('click', function () {
        $('#subjectMode').val(1);
        $('#contactHeader').text("Contact PIPE9");
        $('#VideoPlayer').css('visibility', 'hidden');
        $('.formpopup,#formpopup').show();
        $('#videolistsOrder').val($(this).val());
        $('#vidLists').val(1);
        /// <reference path="../../Video/The Microsoft Profile of Excellence Story with Johneen Bufford for standard definition.flv" />            /// <reference path="../../Video/The Microsoft Profile of Excellence Story by Cecilia Flombum.flv" />

        //$("#VideoPlayer").html(str + "<div class='player' href='../../Video/Nicksaban.flv'  style='display:block; width:480px; height:320px' ></div>");
        //flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
        //    clip: {
        //        autoPlay: false,
        //        autoBuffering: true
        //    }
        //});
    });

    $('#vid08').live('click', function () {
        $('#subjectMode').val(1);
        $('#contactHeader').text("Contact PIPE9");
        $('#VideoPlayer').css('visibility', 'hidden');
        $('.formpopup,#formpopup').show();
        $('#videolistsOrder').val($(this).val());
        $('#vidLists').val(1);
        /// <reference path="../../Video/The Microsoft Profile of Excellence Story with Johneen Bufford for standard definition.flv" />            /// <reference path="../../Video/The Microsoft Profile of Excellence Story by Cecilia Flombum.flv" />

        //$("#VideoPlayer").html(str + "<div class='player' href='../../Video/The Kessaku Story.flv'  style='display:block; width:480px; height:320px' ></div>");
        //flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
        //    clip: {
        //        autoPlay: false,
        //        autoBuffering: true
        //    }
        //});
    });
    $('.close').live('click', function () {
        $(".popup, .popupholder, .popupbg").fadeOut("slow");
        $("#VideoPlayer").html('');
    });

    //$('.bukatutup').click(function () {
    //    $('#target').toggle('slow');
    //});
});