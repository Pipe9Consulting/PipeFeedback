$(document).ready(function () {
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $('.pane').find('input[type=radio]:checked').removeAttr('checked');
    $("#n" + $(this).context.title).attr('checked', 'checked');
    $('#goalclick').click(function () {
        $('#selectname').text('Goal');
    });

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
    var loadContentmenu = function () {
        var html = "<li><a href='/wall/index'><span> <img src='../../Images/Icons/wall-small.png' /></span><p>Wall</p></a></li>" +
            "<li><a href='/wall/PostAppreciation'><span><img src='../../Images/Icons/send-app-small.png' /></span><p>Send Appreciation</p></a></li>" +
            "<li><a href='/wall/PostVideos'><span><img src='../../Images/Icons/post-video-small.png' /></span><p>Post a Video</p></a></li>" +
            "<li><a href='/wall/SyncYammer'><span><img src='../../Images/Icons/yammer-small.png' /></span><p>Sync with Yammer</p></a></li>";
        $('#target ul').html(html);
    };
    initEditor();
    loadCSS(initEditor);
    $('.clickmore').live('click', function () {
        var control = $(this).parent();
        $('#wallactcontent').html(control[0].innerHTML);
        $('.cmntpopup,.poepopupbg, .wallgoal').fadeIn("slow");
        var find = $(this).parent().find('.recieve').attr('id');
        if (find == "goaldetail") {
            var Date = $(this).parent().find('.dt').text();
            var text = $(this).parent().find('.CommentlistsVal').text();
            var PoeName = $(this).parent().find('.poenames').text();
            var ModuleName = $(this).parent().find('.modulenameslist').text();
            var firsthtml = "<h1> Shared Goals</h1> <div class='goaldate'> " + Date + "</div> <div class='clr'> </div> <div class='goalshareimg'> " +
                "<img src='../../Images/you-b.png' /></div> <div class='goalsharecont'> <p> " + text + "</p>  <p> " + PoeName + "</p><p> " + ModuleName + "</p> </div>";
            var html3 = "<table class='wallgoalhd'> <tr> <td class='wallgoalhd'> <p>Excellence Action</p> </td> <td class='wallgoalhd'> Goal Timeline </td> </tr> </table> <div class='wallgoal2ndtbl'> <table>";
            $(this).parent().find('.GoalsMonths').each(function () {
                var GoalMonth = parseInt((this).id.replace("GoalsId", ""));
                var Question = $(this).text();
                html3 = html3 + "<tr> <td> <p> " + Question + "</p> <p> Shared with:  </p> </td> <td class='month" + GoalMonth + "'> <table> <tr> <td> 0 </td> <td> 6 </td> <td> 12 </td> <td> 24 </td> </table> </tr>";
            });
            html3 = firsthtml + html3 + "</table></div><div class='goaldate'> Track Goals</div> </div>";
            $('#wallactcontent').html(html3);
        }
    });

    $('#thelist1 ul .column li .wallcomment').each(function () {
        if ($(this).text().length > 50) {
            $(this).parent('li').append("<div  title='click to expand' class='clickmore'></div>");
        }
        var find = $(this).parent().find('.recieve').attr('id');
        if (find == "goaldetail") {
            $(this).parent('li').append("<div  title='click to expand' class='clickmore'></div>");
        }
    });
    loadContentmenu();
});
var postappreciation = {
    fileadded: function () {
        $('#fileadded').html('File attached');
    }
};

$(document).ready(function () {
    //Drag Content
    $.fn.drags = function (opt) {
        opt = $.extend({ handle: "", cursor: "move" }, opt);

        if (opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function (e) {
            if (opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function (e) {
                $('.draggable').offset({
                    top: e.pageY + pos_y - drg_h,
                    left: e.pageX + pos_x - drg_w
                }).on("mouseup", function () {
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function () {
            if (opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });
    };
    $('#yammerlistPopup').drags();
    $('#replypopup').drags();
    $('#videopopup').drags();
    $('.wallgoal').drags();

    $('.yammerpopupbg').hide();

    var framecount = $('#framecount').val();
    var pageframes = parseInt(framecount) / 9;
    alert(pageframes);
    if (pageframes != 0) {
        $('#thelist1').css('width', Math.ceil(pageframes) * 100 + '%');
    } else {
        $('#thelist1').css('width', '100%');
    }
    
    $('.frame').css('width', 100 / Math.ceil(pageframes) + '%');
    $('#thelist1').show();
    $('.scroll1').slimScroll();
    $(".filter div").click(function () {
        var X = $(this).attr('id');

        if (X == 1) {
            $(".filter ul").hide();
            $(this).attr('id', '0');
            $(this).css('background', '');
        }
        else {
            $(".filter ul").show();
            $(this).attr('id', '1');
            $(this).css('background-image', 'url(/Images/select-arrow-up.png)');
        }
    });
    $('.filter li').click(function () {
        $(".filter div").attr('id', '0');
        $(".filter ul").hide();
        $(".filter div").css('background-image', 'url(/Images/select-arrow.gif)');
    });
    var framecount = $('#framecount').val();
    if (framecount == 0) {
        FirstLoginTile();
    }
    $('#addText').html();
    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
});

function FirstLoginTile() {
    Common.ajaxsync({
        url: '/Wall/GetFirstLoginDetails',
        success: function (response) {
            if (response.Pagemode == "True") {
                var html = '<div class="frame"><div class="column" id="addText"><li class="test2"><span class="test3"></span><img src="/Uploadify/LoadImageHandler.ashx?id=' + response.Userid + '&rnd=' + Math.random() + ' width="61" height="61" class="youimg" /> <div class="recieve" style="height: 60px;"></div><div class="dt"></div><h2>Welcome to PIPE9</h2> <p class="wallcomment">bexcellent is Social Performance Management for you, your team or your entire company. pipe9consulting.com is the home of Role Excellence Profiles (REPs) that align people and let everyone take control of their own Performance.</p><div title="click to expand" class="clickmore"></div></li></li></div></div>';
                $('.test1').html(html);
                $('#thelist1').show();
                var pageframes = 1 / 9;
                if (pageframes != 0) {
                    $('#thelist1').css('width', Math.ceil(pageframes) * 100 + '%');
                } else {
                    $('#thelist1').css('width', '100%');
                }
                $('.frame').css('width', 100 / Math.ceil(pageframes) + '%');
            }
        },
        error: function (err) {
        }
    });
}