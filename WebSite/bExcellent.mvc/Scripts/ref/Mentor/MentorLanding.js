var mentor = {
    getuserRoles: function () {
        var type = 0;
        Common.ajaxsync({
            url: '/Mentor/GetUserRoles',
            success: function (response) {
                
                for (var i = 0; i < response.length; i++) {
                    switch (response[i].RoleId) {
                        case 1:
                            $('#team').show();
                            type = 2;
                            break;
                        case 2:
                            $('#you').show();
                            type = 1;

                            break;
                        case 3:
                            $('#you').show();
                            type = 1;

                            break;
                        case 4:

                            break;
                        case 5:
                            $('#you').show();
                            type = 1;

                            break;
                        case 6:
                            $('#you').show();
                            type = 1;

                            break;

                        default:
                            break;
                    }
                }

                var typevalue = $('#mentorType').val();
                var tileclicked = $('#stilesClick').val();
                
                // debugger;
                if (typevalue != 0) {
                    type = typevalue;
                    $('.stiles').each(function () {
                        var value = $(this).attr('value');            //Change First $(this).val()
                        if (value == typevalue) {
                            $(this).addClass('selected');
                        }
                    });
                }
                
                var t = $('.stiles:visible').first();
                t.addClass('selected');
                mentor.getuserPoeByType(type);
            },
            error: function () {
            }
        });
    },
    getuserPoeByType: function (type) {
        Common.ajaxsync({
            url: '/Mentor/GetUsersPoeByRole?type=' + type,
            success: function (response) {
                var html = '';
                var poeids = '';
                for (var i = 0; i < response.length; i++) {
                    html = html + " <li id ='poeli" + response[i].POEId + "' value=" + response[i].POEId + " class='poelistli'><a> <div class='icon'> <img src='../../Images/" + response[i].Name.replace("&", "") + "_Intro.png' alt='" + response[i].Name + "' class='img' /></div> <p> " + response[i].Name + "</p> </a><span></span></li>";
                    poeids = poeids + response[i].POEId + '%';
                }
                if (response.length < 4) {
                    for (var p = response.length; p < 4; p++) {
                        html = html + " <li class='poelistlidummy' style='cursor:default'></li>";
                    }
                }
                
                if (response.length > 4) {
                    if (response.length % 2 == 1) {
                        html = html + " <li class='poelistlidummy' style='cursor:default'></li>";
                    }
                }

                $('#poelist1').html(html);
                var selpoe = $('#selectedPoeValueSync').val();
                if (selpoe == "0") {
                    selpoe = $('.poelistli:first').val()
                }
                if ($('#poelist1 li').length > 4) {
                    $('.scroll2').slimScroll({
                        start: $('#poeli' + selpoe)
                    });
                }
                if ($('#selectedPoeValueSync').val() != 0) {
                    $('#poeli' + $('#selectedPoeValueSync').val()).addClass('selectArrow');
                }
                else {
                    $('.poelistli:first').addClass('selectArrow');
                    mentor.setSelectedPoe($('.poelistli:first').val());
                }
                //$('.scroll2').slimScroll();
                poelist(poeids, html, response[0].POEId, response.length);
            },
            error: function () {
            }
        });
    },


    setSelectedPoe: function (poe) {
        //debugger;
        Common.ajaxsync({
            url: '/Mentor/SetSelectedPoe?poe=' + poe,
            success: function () {
                //sync.SetWcsiDiff();
            },
            error: function () {
            }
        });
    }
}
$(document).ready(function () {

            var selectedPoe = $('#selectedPoeValueSync').val();
            var tempval = 0;
            if (selectedPoe != 0) {
                setTimeout(function () {
                    tempval = 1;
                }, 50);
            }

            $("#status").fadeIn();
            $("#preloader").fadeIn("slow");
           
            $('.pane').find('input[type=radio]:checked').removeAttr('checked');
            $("#nMentor").attr('checked', 'checked');
            $("#nMentor").parent().find('img').attr('src', '../../Images/icons/mentor_icon_h.png');
            $('#target ul li').live('click', function () {
                var ctrl = $(this);
                mentor.getuserPoeByType(ctrl.val());
                $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).addClass("selected");
                $('#' + ctrl[0].id.substring(1, ctrl[0].id.length)).siblings().removeClass("selected");
            });
            
            $('.poelistli').live('click', function () {
               // debugger;
                var ctrl = $(this);
                var viewVal = $(this).val();
                // $("#status,#preloader").delay(100).fadeIn("slow", function () {
                if (viewVal != 0) {
                    ctrl.addClass("selectArrow");
                    ctrl.siblings().removeClass("selectArrow");
                    mentor.setSelectedPoe(ctrl.val());
                    $('#selectedPoeValueSync').val(ctrl.val());
                }
                //});
                $("#status").fadeOut();
                $("#preloader").delay(100).fadeOut("slow");
            });
            $('#pmClick').live('click', function () {
                window.location.href = "/Mentor/PotentialMentors";
            });
            $('#mentorsClick').live('click', function () {
                window.location.href = "/Mentor/YourMentors";
            });
            $('#menteesClick').live('click', function () {
                window.location.href = "/Mentor/YourMentees";
            });
       
            if (tempval == 1) {
                //setTimeout(function() {
                mentor.getuserRoles();
            //    sync.getfbtype();
            //    sync.getfbPoe();
                // }, 3000);
            } else {
                mentor.getuserRoles();
            //    sync.getfbtype();
            //    sync.getfbPoe();
            }
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
            //setTimeout(function () {
            $('.scroll2').slimScroll();
            $('.scroll1').slimScroll();
            //$('#poeli13').click();
            //}, 2000);

            //var html = "<li id='Mentor' value='0'> <span><img src='/Images/Icons/peer-small.png'/> </span> <p> Mentors </p> </li>";
            var html = "<li><a href='/Mentor/PotentialMentors'><span> <img src='../../Images/icons/big-pic-small.png' /></span><p>Potential Mentors</p></a></li>" +
                        "<li><a href='/Mentor/YourMentors'><span><img src='../../Images/icons/digin-small.png' /></span><p>Your Mentors</p></a></li>" +
                        "<li><a href='/Mentor/YourMentees'><span><img src='../../Images/icons/dig-deeper-small.png' /></span><p>Your Mentees</p></a></li>";
            $('#target ul').html(html);
        });
    
