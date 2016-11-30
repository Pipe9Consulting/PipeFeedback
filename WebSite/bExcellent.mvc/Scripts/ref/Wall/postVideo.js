var postappreciation = {
    loadmember: function () {
        Common.ajaxsync({
            url: '/Wall/GetMyUsers',
            success: function (response) {
                var html = '';
                if (response != null) {
                    for (var i = 0; i < response.length; i++) {
                        html = html + "<li id='member" + response[i].User.UserId + "' value=" + response[i].User.UserId + ">" +
                            "<img  class='youimg'  src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                            "<h2> " + response[i].User.FirstName + " " + response[i].User.LastName + "</h2>" +
                            "<h4> " + response[i].User.EmailAddress + "</h4>" +
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
        if ($.inArray(ext, ['flv', 'mov', 'mp4', 'avi', '3gp', 'mgp', 'wmv']) == -1) {
            alert('Please select the files with following extensions: flv,mov,mp4,avi,3gp,wmv ');
        } else if (size >= 40) {
            alert(" Your file size exceeds the limit. Maximum allowed limit is 40 MB");
        } else {
            $('.poepopupbg,.load').fadeIn();
            var form = $('#PostVideo');
            var formData = new FormData(form[0]);

            $.ajax({
                type: "POST",
                url: form.attr('action'),
                enctype: 'multipart/form-data',
                data: formData,
                success: function (data) {
                    $("#vidprev").html("<script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script><div class='player' width='320' height='200' href='/Uploads/Video/" + data + "'></div>");
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
            "<li><a href='/wall/SyncYammer'><span><img src='../../Images/Icons/yammer-small.png' /></span><p>Sync with Yammer</p></a></li>";
        $('#target ul').html(html);
    }
};
$(document).ready(function () {
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

    $('.postcmnt li').live('click', function () {
        $(this).toggleClass("postsel");
        var html = '';
        if ($('#selectedmembersdiv').html().indexOf($(this).find('h4').html()) == -1) {
            html = $('#selectedmembersdiv').html() + $(this).find('h4').html() + ';';
        } else {
            html = $('#selectedmembersdiv').html().replace($(this).find('h4').html() + ';', '');
        }
        $('#selectedmembersdiv').html(html);

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
            }
        }
    });
    $('#sendbtn').live('click', function () {
        var selectedids = $('#selectedmembershdn').val().split(',');
        if (selectedids.length <= 1) {
            alert('Please select at least one User');
        } else {
            if ($('#vidlink').val().trim() == "") {
                alert('select video');
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
                        $('#selectedmembersdiv').html('');
                        $('textarea').sceditor('instance').val('');
                        $('.postcmnt li').removeClass('postsel');
                        $f(0).close();
                        $("#vidprev").html('');
                        alert('Message sent successfully');
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
    $('#postvmsgtile').addClass('selected');
    $('#sm, #sa, #walltile,.badgetile, .badgetile1').removeClass('selected');
})