$(document).ready(function () {
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $('.pane').find('input[type=radio]:checked').removeAttr('checked');
    $("#n" + $(this).context.title).attr('checked', 'checked');
    $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/start-wall_h.png');
    var selectedPoe = $('#selectedPoeValueSync').val();
    $('#goalclick').click(function () {
        $('#selectname').text('Goal');
    });
    

    var find = $('.test2').find('.recieve').attr('id');
    if (find == "goaldetail")
    { 
    var goalSharedUser = $('#goaldetail').parent().find('.wallcomment').html().slice(0, -28);

    var goalSharedContent = $('#goaldetail').parent().find('.wallcomment').html(goalSharedUser + ' have shared goals');
    }



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
            "<li><a href='/wall/index'><span><img src='../../Images/Icons/yammer-small.png' /></span><p>Sync with Yammer</p></a></li>";
        $('#target ul').html(html);
    };
    initEditor();
    loadCSS(initEditor);

    $('.clickmore').live('click', function () {
        var control = $(this).parent();
       
        $('#wallactcontent').html(control[0].innerHTML);
        $('.cmntpopup,.poepopupbg, .wallgoal').fadeIn("slow");
        var find = $(this).parent().find('.recieve').attr('id');
        $('#wallactcontent').find('.test3').removeClass('commentsel');
        $('#wallactcontent').find('.clickmore').remove();
        if (find == "goaldetail") {
            var date = $(this).parent().find('.dt').text();
            var text = $(this).parent().find('.CommentlistsVal').text();
            var PoeName = $(this).parent().find('.poenames').text();
            var ModuleName = $(this).parent().find('.modulenameslist').text();
            var sharedImgId = $(this).parent().find('img.youimg').attr('src');
            var poeid = $(this).parent().data('poeid');
            //var firsthtml = "<h1> Shared Goals</h1> <div class='goaldate'> " + Date + "</div> <div class='clr'> </div> <div class='goalshareimg'> " +
            //    "<img src='../../Images/you-b.png' /></div> <div class='goalsharecont'> <p> " + text + "</p>  <p> " + PoeName + "</p><p> " + ModuleName + "</p> </div>";
            //var html3 = "<table class='wallgoalhd'> <tr> <td class='wallgoalhd'> <p>Excellence Indicator</p> </td> <td class='wallgoalhd'> Goal Timeline </td> </tr> </table> <div class='wallgoal2ndtbl'> <table>";
            //$(this).parent().find('.GoalsMonths').each(function () {
            //    var GoalMonth = parseInt((this).id.replace("GoalsId", ""));
            //    var Question = $(this).text();
            //    html3 = html3 + "<tr> <td> <p> " + Question + "</p> <p> Shared with:  </p> </td> <td class='month" + GoalMonth + "'> <table> <tr> <td> 0 </td> <td> 6 </td> <td> 12 </td> <td> 24 </td> </table> </tr>";
            //});
            //html3 = firsthtml + html3 + "</table></div><div class='goaldate'> Track Goals</div> </div>";
            var foruserid = $('.clickmore').parent().attr('userid');
             
            var html = '<div class="wal_head"><h3>Shared Goals</h3><span>' + date + '</span></div><span class="trk_limg"><img src=' + sharedImgId + ' /></span><div class="trk_tabl"><ul class="trk_thead"><li>Excellence Action</li><li>Goal Timeline</li></ul><div class="scroll2"><div>';
        
            Common.ajaxsync({
                url: '/Wall/GetGoalsShared',
                data: { 'foruserid': foruserid, 'poeid': poeid },
                success: function (response) {
                    for (var i = 0; i < response.length; i++) {

                        var ans = response[i].Answer;
                        var start = new Date(response[i].UpdatedOn);
                        var end = new Date(response[i].GoalDate);
                        var today = new Date().setHours(0, 0, 0, 0);
                        // end - start returns difference in milliseconds 

                        var diff = new Date(end - today);
                        var days = diff / 1000 / 60 / 60 / 24;

                        //var goalDateDif = new Date(end - start);
                        //var daysndiff = new Date(today - start);
                        //var goalDays = goalDateDif / 1000 / 60 / 60 / 24;
                        

                       
                        //var percentrem = Math.round(Date.parse(daysndiff) / Date.parse(goalDateDif)) * 100;
                      var percentrem = Math.round(((today - Date.parse(start)) / (Date.parse(end) - Date.parse(start))) * 100);
                   
                      if (today >= end) {
                          if (ans == 4) {
                              html = html + '<ul class="trk_tval"><li><span class="tr_mname">Module Name: ' + response[i].Name + '</span><span class="tr_qsts">' + response[i].ShortQuestion + '</span></li><li><span class="trk_dat">Goal Date: ' + response[i].GoalDate + '</span>' +
                              '<span class="goalAchieved"><p>Goal Achieved</p></span></li></ul>';
                          }
                          else {
                              html = html + '<ul class="trk_tval"><li><span class="tr_mname">Module Name: ' + response[i].Name + '</span><span class="tr_qsts">' + response[i].ShortQuestion + '</span></li><li><span class="trk_dat">Goal Date: ' + response[i].GoalDate + '</span>' +
                              '<span class="goalNotMet"><p>Goal Not Met</p></span></li></ul>';
                          }
                      }
                      else {
                          html = html + '<ul class="trk_tval"><li><span class="tr_mname">Module Name: ' + response[i].Name + '</span><span class="tr_qsts">' + response[i].ShortQuestion + '</span></li><li><span class="trk_dat">Goal Date: ' + response[i].GoalDate + '</span>' +
                              '<div class="goalTimeLine"><span class="trk_pnding">' + days.toFixed() + ' days Remaining</span><span class="wall_wdth" style="width:' + percentrem + '%;"></span></div></li></ul>';
                      }
                                         
                    }
                    html = html + '</div></div></div><h5 class="wal_trk">Track Goals</h5>';
                    $('#wallactcontent').html(html);
                    $('.scroll2').slimScroll();


                },
                error: function (err) {
                }
            });

         
            
         
            //$(this).parent().find('.GoalsMonths').each(function () {
            //    var Question = $(this).text();

              
            //});
            //'<ul class="trk_tval"><li>Develops sales plan for generating excitement in advertiser eco system.</li><li><span class="trk_dat">Goal Date: Sep 27, 2015</span><div class="goalTimeLine"><span class="trk_pnding">120 days Remaining</span><span class="wall_wdth" style="width:60.5%;"></span></div></li></ul><ul class="trk_tval"><li>Develops sales plan for generating excitement in advertiser eco system.</li><li><span class="trk_dat">Goal Date: Sep 27, 2015</span><div class="goalTimeLine"><span class="trk_pnding">120 days Remaining</span><span class="wall_wdth" style="width:10%;"></span></div></li></ul><ul class="trk_tval"><li>Develops sales plan for generating excitement in advertiser eco system.</li><li><span class="trk_dat">Goal Date: Sep 27, 2015</span><div class="goalTimeLine"><span class="trk_pnding">120 days Remaining</span><span class="wall_wdth" style="width:95%;"></span></div></li></ul><ul class="trk_tval"><li>Develops sales plan for generating excitement in advertiser eco system.</li><li><span class="trk_dat">Goal Date: Sep 27, 2015</span><div class="goalTimeLine"><span class="trk_pnding">120 days Remaining</span><span class="wall_wdth" style="width:30.5%;"></span></div></li></ul></div>';
          

           
        }
    });

    $('#thelist1 ul .column li .wallcomment').each(function () {
        if ($(this).text().length > 50) {
            $(this).parent('li').append("<div  title='Click To Expand' class='clickmore'></div>");
        }
        var find = $(this).parent().find('.recieve').attr('id');
        if (find == "goaldetail") {
            $(this).parent('li').append("<div  title='Click To Expand' class='clickmore'></div>");
        }
    });
    loadContentmenu();
});
var postappreciation = {
    fileadded: function () {
        $('#fileadded').html('File attached');
        $('#fileadded').append('<a onclick="javascript:postappreciation.removefile()" style="cursor: pointer;color: red;font-size: 16px;padding-left: 2% !important;">x</a>')
    },
    removefile: function () {
        $('input[name="replyFile"]').val('');
        $('#fileadded').html('');
    }
};

$(document).click(function () {

    if ((event.target).className != "dropHide" && (event.target).className != "icon-arrow open" && (event.target).className != "icon-arrow close")
    {
        $('.dropdown-menu').removeClass('show');
        $('.icon-arrow').removeClass('open');
        $('.icon-arrow').addClass('close');
    }

});


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
    if (pageframes != 0) {
        $('#thelist1').css('width', Math.ceil(pageframes) * 100 + '%');
        $('.frame').css('width', 100 / Math.ceil(pageframes) + '%');
    } else {
        $('#thelist1').css('width', '100%');
        $('.frame').css('width','100%');
    }
    
    if ($('.test1').parent().width().toFixed() > 10000) {
        $('.test1').css('padding', '0.2%');
    };
 
    $('#thelist1').show();
    //$('.scroll1').slimScroll();
    $(".walldropdown div").click(function () {
 
        var X = $(this).attr('id');

        if (X == 1) {
            $(".walldropdown ul").hide();
            $(this).attr('id', '0');
            $(this).css('background', '');
        }
        else {
            $(".walldropdown ul").show();
            $(this).attr('id', '1');
            $(this).css('background-image', 'url(/Images/select-arrow-up.png)');
        }
    });
    //$('.walldropdown li').click(function () {
     
    //    $(".walldropdown div").attr('id', '0');
    //    $(".walldropdown ul").hide();
    //    $(".walldropdown div").css('background-image', 'url(../../../Images/images/dropdownarrow.png)');
    //});
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
                $('#thelist1').css('width', Math.ceil(pageframes) * 100 + '%');
                $('.frame').css('width', 100 / Math.ceil(pageframes) + '%');
            }
        },
        error: function (err) {
        }
    });
}