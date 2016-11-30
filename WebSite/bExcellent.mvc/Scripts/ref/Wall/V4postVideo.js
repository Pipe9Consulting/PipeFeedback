var postappreciation = {
    loadmember: function () {
        Common.ajaxsync({
            url: '/Wall/GetMyUsers',
            success: function (response) {
                var html = '';
                if (response != null) {
                    for (var i = 0; i < response.length; i++) {
                        html = html + "<li class='profileDetails' id='member" + response[i].User.UserId + "' value=" + response[i].User.UserId + ">" +
                            "<div class='profileimage'><img  class='youimg'  src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' /></div>" +
                            "<div class='profileContent'><h3> " + response[i].User.FirstName + " " + response[i].User.LastName + "</h3>" +
                            "<p> " + response[i].User.EmailAddress + "<p></div>" +
                            "</li>";

                    }
                }
                $('#memberlist').html(html);
            },
            error: function (err) {
            }
        });
    },
    
    validateSelection: function () {
      
        var ext = $('#vidupload').val().split('.').pop().toLowerCase();
        var size = ((($("#vidupload")[0].files[0].size / 1024) / 1024) * 100) / 100;
        //if ($.inArray(ext, ['flv', 'mov', 'mp4', 'avi', '3gp', 'mgp', 'wmv']) == -1) {
        //    alert('Please select the files with following extensions: flv,mov,mp4,avi,3gp,wmv ');
        //}
        if ($.inArray(ext, ['flv']) == -1) {
            $('#masterMsgCont').text("Please select the files with flv extensions");
            $('#overallCont').show();
            //alert('Please select the files with flv extensions');
        }
        else if (size >= 40) {
            $('#masterMsgCont').text("Your file size exceeds the limit. Maximum allowed limit is 40 MB");
            $('#overallCont').show();
            //alert(" Your file size exceeds the limit. Maximum allowed limit is 40 MB");
        } else {
            $('.poepopupbg,.load').fadeIn();
            var form = $('#PostVideo');
            var formData = new FormData(form[0]);
            $('#fileadded').html('File attached');
            $.ajax({
                type: "POST",
                url: form.attr('action'),
                enctype: 'multipart/form-data',
                data: formData,
                success: function (data) {
                    $("#vidprev").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script><div class='player' width='120' height='100' href='/Uploads/Video/" + data + "'></div>");
                    $("#vidlink").val("'/Uploads/Video/" + data + "'");
                    flowplayer("div.player", "/Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
                        clip: {
                            autoPlay: false,
                            autoBuffering: true
                        }
                    });
                    $('.poepopupbg,.load').fadeOut();
                  
                },
                error: function (er) {
                },
                cache: false,
                contentType: false,
                processData: false
            });
        }
    },
    loadContentmenu: function () {
        var html = "<li><a href='/wall/index'><span> <img src='../../Images/Icons/wall-small.png' /></span><p>Wall</p></a></li>" +
            "<li><a href='/wall/PostAppreciation'><span><img src='../../Images/Icons/send-app-small.png' /></span><p>Send Appreciation</p></a></li>" +
            "<li><a href='/wall/PostVideos'><span><img src='../../Images/Icons/post-video-small.png' /></span><p>Post a Video</p></a></li>" +
            "<li><a href='/wall/index'><span><img src='../../Images/Icons/yammer-small.png' /></span><p>Sync with Yammer</p></a></li>";
        $('#target ul').html(html);
    }
};
$(document).ready(function () {
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/start-wall_h.png');
    $('.scroll1').slimScroll();
    $('iframe body').slimScroll();
    postappreciation.loadmember();
    postappreciation.loadContentmenu();
    var sourceElement = null;
    var loadCSS = function (callback) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = "/Scripts/ref/editor/themes/square.min.css";
        link.id = 'theme-style';

        document.getElementsByTagName('head')[0].appendChild(link);

        var img = document.createElement('img');
        img.onerror = function () {
            if (callback) callback(link);
        };
        img.src = "/Scripts/ref/editor/themes/square.min.css";
    };
    var initEditor = function () {
        $("textarea").sceditor({
            plugins: 'xhtml',
            resizeEnabled: false,
            toolbar: "bold,italic,underline,left,center,right,justify,bulletlist,orderedlist",
            style: "/Scripts/ref/editor/jquery.sceditor.default.min.css"
        });
    };
    initEditor();
    loadCSS(initEditor);

    $('iframe').height('112px');

    $('.sendProfileList li').live('click', function () {
        
        $(this).toggleClass("selectProfile");
        var html = '';
        if ($('#selectedmembersdiv').val().indexOf($(this).find('p').html()) == -1) {
            html = $('#selectedmembersdiv').val() + $(this).find('p').html() + ';';
        } else {
            html = $('#selectedmembersdiv').val().replace($(this).find('p').html() + ';', '');
        }
        $('#selectedmembersdiv').val(html);

        var value = '';
        if ($('#selectedmembershdn').val().indexOf($(this).val()) == -1) {
            value = $('#selectedmembershdn').val() + $(this).val() + ',';
        } else {
            value = $('#selectedmembershdn').val().replace($(this).val() + ',', '');
        }
        $('#selectedmembershdn').val(value);
    });
    $('#deletevid').live('click', function () {
       
        var link = $("#vidlink").val();
        if (link != "") {
            if (confirm("Are you sure to delete the video message")) {
                $("#vidprev").html("");
                var control = $("#vidupload");
                control.replaceWith(control = control.clone(true));
                $("#vidlink").val("");
                $('#fileadded').html('');
                
            }
        }
    });
    $('#sendbtn').live('click', function () {
       
     
        var selectedids = $('#selectedmembershdn').val().split(',');
        if (selectedids.length <= 1) {
            $('#masterMsgCont').text("Please select at least one User");
            $('#overallCont').show();
            //alert('Please select at least one User');
        } else {
            if ($('#vidlink').val().trim() == "") {
                $('#masterMsgCont').text("select video");
                $('#overallCont').show();
                //alert('select video');
            } else {
                var html = $('textarea').sceditor('instance').getBody()[0].innerHTML;
                var subject = 'Video';
                if (html.trim() != "") {
                    subject = (subject == "") ? "Comments" : subject + " & Comments";
                }
                $('#subject').val("You have received a Video message ");//$('#subject').val(subject);
                $('#comments').val(html.trim());

                var form = $('#sendevent');
                var formData = new FormData(form[0]);
                $.ajax({
                    type: "POST",
                    url: form.attr('action'),
                    enctype: 'multipart/form-data',
                    data: formData,
                    success: function (data) {
                  
                        $('#subject').val('');
                        $('#comments').val('');
                        $('#vidlink').val('');
                        $('#selectedmembershdn').val('');
                        $('#selectedmembersdiv').val('');
                        $('textarea').sceditor('instance').val('');
                        $('.sendProfileList li').removeClass('selectProfile');
                        //$f(0).close();
                        $("#vidprev").html('');
                        $('#fileadded').html('');
                        $('#masterMsgCont').text("Message sent successfully");
                        $('#overallCont').show();
                        //alert('Message sent successfully');
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                });
                return false;
            }
        }
    });
    $('#postvmsg').show();
    $('.wall3').show();

    $('#wall,#postcmnt,.wall1,.wall2').hide();
    $('div.wallleftMenu li.postVideo').addClass('selectPost');
    $('div.wallleftMenu li.walltile').removeClass('selectWall');
    $('div.wallleftMenu li.syncYammer').removeClass('selectYammer');
    $('div.wallleftMenu li.sendAppreciation').removeClass('selectSend');
    $("#status").delay(1000).fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
    //$('#sm, #sa, #walltile,.badgetile, .badgetile1').removeClass('selected');
    
})