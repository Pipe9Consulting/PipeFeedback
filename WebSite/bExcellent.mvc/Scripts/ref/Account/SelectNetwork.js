var selectNetwork = {
    loadNetwork: function (option) {
        var subid = selectNetwork.IsOwnSubscribtionS();
        var maPlan = $('#masterPlan').val();
        Common.ajax({
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
                var html = "<li><a href=Javascript:selectNetwork.selectNetwork('-1','" + window.location.href + "')>All Networks</a></li>";
                if (response != undefined && response != null && response.length != 0) {
                    for (var i = 0; i < response.length; i++) {
                        html = html + "<li><a href=Javascript:selectNetwork.selectNetwork(" + response[i].Subscriptionid + ",'" + window.location.href + "')>" + response[i].NetworkName + "</a></li>";
                    }

                    if (!subid) {
                        html = html + "<li id='chooseunsubscribeUser'><a>Create Your Network</a></li>";
                    }
                } else if ($('#masterPlan').val() != 0 && $('#masterPlan').val() == -1) {
                    html = html+"<li id='chooseunsubscribeUser'><a>Create Your Network</a></li>";
                }
                $('#networklist').html(html);
                $('#chooseunsubscribeUser').live('click', function () {
                    window.location.href = "/SignUp/Register";
                });
            },
            error: function () {
            }
        });
    },
    selectNetwork: function (id, url) {
        $('#Subscriptionid').val(id);
        if (selectNetwork.IsExpired(id)) {
            if (selectNetwork.IsMySubscription(id)) {
                window.location = "/Home/Account";
            } else {
                alert("Selected Network is inactive!");
            }
        } else {
            if (window.location.pathname.toLowerCase() == "/home/account") {
                window.location = "/Common/SetNetwork?id=" + id + "&curl=/Wall/Index";
            } else {
                window.location = "/Common/SetNetwork?id=" + id + "&curl=" + url;
            }
        }
    },
    setTextToNetworkdrpdwm: function (option) {
        Common.ajax({
            url: option.url,
            success: function (response) {
                if (response != null) {
                    $('#ChooseyourNetwork').text(response.NetworkName);
                    selectNetwork.LoadTopSlideDownEvent(response.Subscriptionid);
                } else {
                    $('#ChooseyourNetwork').text("All Networks");
                    selectNetwork.LoadTopSlideDownEvent(-1);
                }
            },
            error: function () {
            }
        });
    },
    IsExpired: function (id) {
        var returnvalue = false;
        Common.ajaxsync({
            url: '/Common/IsExpired?id=' + id,
            success: function (response) {
                if (response) {
                    returnvalue = true;
                } else {
                    returnvalue = false;
                }
            },
            error: function () {
            }
        });
        return returnvalue;
    },
    IsMySubscription: function (id) {
        var returnvalue = false;
        Common.ajaxsync({
            url: '/Common/IsMySubscription?id=' + id,
            success: function (response) {
                if (response) {
                    returnvalue = true;
                } else {
                    returnvalue = false;
                }
            },
            error: function () {
            }
        });
        return returnvalue;
    },
    IsOwnSubscribtionS: function () {
        var returnvalue1 = false;
        Common.ajaxsync({
            url: '../../Common/IsMyOwnSubscriptionCheck',
            success: function (response) {
                if (response) {
                    returnvalue1 = true;
                } else {
                    returnvalue1 = false;
                }
            },
            error: function () {
            }
        });
        return returnvalue1;
    },
    GetPlanAndSubid: function () {
        Common.ajaxsync({
            url: '../../Common/Getplandetails',
            success: function (response) {
                if (response != null) {
                    $('#masterPlan').val(response.Plan);
                } else {
                    $('#masterPlan').val(-1);
                }
            },
            error: function () {
            }
        });
    },
    LoadTopSlideDownEvent: function (subid) {
        var networkMapping = 0;
        var checkOwnSub = selectNetwork.IsMySubscription(parseInt(subid));
        Common.ajaxsync({
            url: '/Common/CheckNetworkMapping',
            success: function (response) {
                if (response != null) {
                    networkMapping = response;
                } else {
                    networkMapping = 0;
                }
            },
            error: function () {
            }
        });
        //$('#nStart').live('click', function () {
        //    if (checkOwnSub == true) {
        //        window.location.href = "/Signup/Poelibrary?location=Add";
        //    } else {
        //        window.location.href = "/Signup/Poelibrary?location=newPoe";
        //    }
        //});
        $('#nNetwork').live('click', function () {
            if (networkMapping != 0) {
                window.location = "../../Network/Network";
            }
            else if (networkMapping == 0 && checkOwnSub == true) {
                window.location = "../../Network/Network";
            }         
            //$(this).parent().parent().parent().find('li').find('input:checked').parent().find('img').attr('src', '../../Images/icons/start-network.png');


            //$('#indicator li').each(function () {
            //    var imgId = $('#indicator li input').attr('id');
            //    $('#indicator li').find('img').attr('src', '../../Images/icons/start-' + imgId + '.png');
            //});
            //$(this).parent().find('img', '../../Images/icons/start-' + $(this).attr('id') + '.png');

        });
        $('#nWall').live('click', function () {
            if (networkMapping != 0) {
                window.location = "../../wall/index";
            } else {
                window.location.href = '/Signup/Add/you';
            }           
            //$(this).parent().parent().parent().find('li').find('input:checked').parent().find('img').attr('src', '../../Images/icons/start-wall.png');
        });
        $('#nFeedback').live('click', function () {
            if (networkMapping != 0) {
                window.location = "../../Feedback/Feedback";
            }
            else {
                window.location.href = '/Signup/Add/you';
            }          
            //$(this).parent().parent().parent().find('li').find('input:checked').parent().find('img').attr('src', '../../Images/icons/start-feedback.png');
        });
        $('#nStanding').live('click', function () {
            if (networkMapping != 0) {
                window.location = "../../communitysync/communitysync";
            }
            else {
                window.location.href = '/Signup/Add/you';
            }       
            //$(this).parent().parent().parent().find('li').find('input:checked').parent().find('img').attr('src', '../../Images/icons/start-standing.png');
        });
        $('#nSync').live('click', function () {
            if (networkMapping != 0) {
                window.location = "../../managersync/managersync";
            }
            else {
                //$('.yammererrorbg,.yammernetwork').fadeIn("slow");
                window.location.href = '/Signup/Add/you';
            }          
            //$(this).parent().parent().parent().find('li').find('input:checked').parent().find('img').attr('src', '../../Images/icons/start-sync.png');
        });
        $('#nStart').live('click', function () {
            if (networkMapping != 0) {
                window.location = "../../Home/Start";
            }
            else {
                //$('.yammererrorbg,.yammernetwork').fadeIn("slow");
                window.location.href = '/Signup/Add/you';
            }            
            //$(this).parent().parent().parent().find('li').find('input:checked').parent().find('img').attr('src', '../../Images/icons/start_icon.png');
        });
        
        $('#nDashboard').click(function () {
            if (networkMapping != 0) {
                window.location = "../../Dashboard/Index";
            }
            else {
                //$('.yammererrorbg,.yammernetwork').fadeIn("slow");
                window.location.href = '/Signup/Add/you';
            }    
            //$(this).parent().parent().parent().find('li').find('input:checked').parent().find('img').attr('src', '../../Images/dashboard/dashboard_icon.png');
        });

        $('#nResult').click(function () {
            if (networkMapping != 0) {
                window.location = "../../FeedbackResults/FeedbackResults";
            }
            else {
                //$('.yammererrorbg,.yammernetwork').fadeIn("slow");
                window.location.href = '/Signup/Add/you';
            }            
            //$(this).parent().parent().parent().find('li').find('input:checked').parent().find('img').attr('src', '../../Images/icons/result_Icon.png');
        });

        $('#nGoal').click(function () {
            if (networkMapping != 0) {
                window.location = "../../Development/Development";
            }
            else {
                //$('.yammererrorbg,.yammernetwork').fadeIn("slow");
                window.location.href = '/Signup/Add/you';
            }            
            //$(this).parent().parent().parent().find('li').find('input:checked').parent().find('img').attr('src', '../../Images/icons/goals_icon.png');
        });

        $('#nMentor').click(function () {
            if (networkMapping != 0) {
                window.location = "../../Mentor/Mentor";
            }
            else {
                //$('.yammererrorbg,.yammernetwork').fadeIn("slow");
                window.location.href = '/Signup/Add/you';
            }            
            //$(this).parent().parent().parent().find('li').find('input:checked').parent().find('img').attr('src', '../../Images/icons/mentor_icon.png');
        });

    }
};

$(document).ready(function () {
    $('#closeOverall,#overllDismiss').on('click', function () {
        $('#overallCont').hide();
    });
    $("#redirectWall img").hover(
     function () {
         $(this).attr("src", "../../Images/start/wall_iconH.png");
     }, function () {
         $(this).attr("src", "../../Images/start/wall_icon.png");
     }
   );
    $("#redirectPostAppreciation img").hover(
     function () {
         $(this).attr("src", "../../Images/start/award_iconH.png");
     }, function () {
         $(this).attr("src", "../../Images/start/award_icon.png");
     }
   );
    
    selectNetwork.GetPlanAndSubid();
    selectNetwork.loadNetwork({ url: '../../Common/GetUserSubscriptions' });
    selectNetwork.setTextToNetworkdrpdwm({ url: '/Common/GetSelectedNetwork' });
});