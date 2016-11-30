var html5 = "";
var checkout = {
    loadmembersList: function () {
        var reqoption = $.trim($('#HdnMode').val());
        Common.ajax({
            url: '/SignUp/GetNetworkData',
            success: function (response) {
                var html = '';
                usercost = $('#amount').val();
                if (reqoption.toLowerCase() == 'add' && $('#trailtopaid').val() != 1) {
                    var subDate = $('#SubscribedUserDate').val();
                    if (subDate != 0 && subDate != "")
                        var usercost = UserCost_Bysub(subDate, usercost);
                }
                else {
                    usercost = $('#amount').val();
                }
                if (reqoption.toLowerCase() == 'new' || reqoption.toLowerCase() == 'old' || (reqoption.toLowerCase() == 'add' && $('#plansClicked').val() == 1)) {
                    html = " <li  value=" + $('#UsrMailid').val() + "> <div class='title'> You</div> <div class='colone'> <img id='dynyouimg' src='../../Images/user.png'  width='34' height='34'/></div> <div class='detailsholder'><div class='details'><div class='coltwo'> " + $('#UserFnamecheckout').val() + " " + $('#UserLnameCheckout').val() + "</div> <div class='colthree'> $ " + usercost + "</div></div></div> </li>";
                } else if ($('#PaidMode').val() == 1) {
                    html = " <li  value=" + $('#UsrMailid').val() + "> <div class='title'> You</div> <div class='colone'> <img id='dynyouimg' src='../../Images/user.png'  width='34' height='34'/></div> <div class='detailsholder'><div class='details'><div class='coltwo'> " + $('#UserFnamecheckout').val() + " " + $('#UserLnameCheckout').val() + "</div> <div class='colthree'> $ " + usercost + "</div></div></div> </li>";
                }
                var frststcolTest = '';
                var className = '';
                var frstcoldes = 0;
                if (response != null) {
                    for (var i = 0; i < response.length; i++) {
                        if (response[i] != null) {
                            if (response[i].Designation.Level != frstcoldes) {
                                frstcoldes = response[i].Designation.Level;
                                frststcolTest = " <div class='title'>" + response[i].Designation.Name + "</div>";
                                className = '';
                            } else {
                                frststcolTest = '';
                                className = 'combine';
                            }

                            var amount = html.indexOf(response[i].User.EmailAddress.toLowerCase()) >= 0 ? '0' : usercost;
                            if (reqoption == 'add') {
                                if (amount != 0 && $('#trailtopaid').val() != 1) {
                                    amount = html5.indexOf(response[i].User.EmailAddress.toLowerCase()) >= 0 ? '0' : usercost;
                                }
                            }
                            $('#CheckOutUsers').html('');
                            $('#CheckOutUsers').html(html);
                            var valid = false;
                            $('.searchlist').each(function () {
                                var desig = $(this).attr("value").toString();
                                var mail = $(this).attr("name");
                                if (mail.toLowerCase() == response[i].User.EmailAddress.toLowerCase() && parseInt(desig) == response[i].Designation.Level) {
                                    valid = true;
                                }
                            });
                            var deleteOption = '';
                            if (response.length > 1) {
                                deleteOption = "<div class='delete' id='DelDesignation" + response[i].Designation.Level + "' name='Delusers" + response[i].User.EmailAddress + "'> <img src='../../Images/delete.png' /></div>";
                            }
                            if (valid == false) {
                                html = html + "<li class='searchlist" + className + "' value='" + response[i].Designation.Level + "' name='" + response[i].User.EmailAddress + "'>" + frststcolTest + "<div class='colone'>" +
                                    "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='34' height='34' alt='User' /></div> <div class='detailsholder'> <div class='details'>" +
                                    "<div class='coltwo'>" + response[i].User.FirstName + " " + response[i].User.LastName + "</div>" +
                                    "<div class='colthree'>$ " + amount + "</div></div> <div class='details'> " + deleteOption + "  </div> </div></li>";
                            }
                        }
                    }
                }
                $('#CheckOutUsers').html(html);
                checkout.loadPoetoRightside();
                checkout.loadCost();
                checkout.DeleteMember();
                //checkout.loaduserPhoto();
            },
            error: function (err) {
            }
        });
    },
    GetPoECost: function () {
        Common.ajaxsync({
            url: '/SignUp/GetPoEcost?planid=2',
            success: function (response) {
                $('#PoEPaidCost').val(response.PoeCost);
            },
            error: function (err) {
            }
        });
    },
    loadPoetoRightside: function () {
        checkout.GetPoECost();
        var reqoption = $.trim($('#HdnMode').val());
        Common.ajaxsync({
            url: '/Common/GetNewlyAddedPoes',
            success: function (response) {
                var html = '';
                var ftext = "";
                var className = '';
                var deleteoption = '';
                var poepaidcost = $('#PoEPaidCost').val();
                var plan = $('#plansClicked').val();
                if (response != null) {
                    for (var i = 0; i < response.length; i++) {
                        var poeCost = $('#PoeCost').val();
                        if (i == 0) {
                            ftext = "<div class='title'> Your REPs</div> ";
                            className = "";
                        } else {
                            ftext = "";
                            className = 'combine';
                        }
                        if (reqoption.toLowerCase() == 'add' && $('#trailtopaid').val() != 1) {
                            var subDate = $('#SubscribedUserDate').val();
                            if (subDate != 0 && subDate != "")
                                poeCost = UserCost_Bysub(subDate, poeCost);
                        }
                        if (response[i].PoeFlag != 2 && plan == 3) {
                            poeCost = poepaidcost;
                        }
                        if (response.length > 1) {
                            deleteoption = "<div class='deletePoe' id='" + response[i].POEId + "'> <img src='../../Images/delete.png' /></div>";
                        }
                        html = html + "<li class='" + className + "' >" + ftext + "<div class='colone'> <img src='../../Images/user.png'  width='34' height='34'/></div> <div class='detailsholder'> <div class='details'> <div class='coltwo'> " + response[i].Name + "</div> <div class='colthree'> $ " + poeCost + "</div>  </div> <div class='details'>" + deleteoption + " </div> </div></li>";
                    }
                }
                var oldhtml = $('#CheckOutUsers').html();
                $('#CheckOutUsers').html(oldhtml + html);
                checkout.DeletePoe();
            },
            error: function (err) {
            }
        });
    },

    loadOlddata: function () {
        Common.ajax({
            url: '/SignUp/LoadOldMembers',
            success: function (responses) {
                html5 = "<ul><li value='" + ($('#UsrMailid').val()).toLowerCase() + "'></li>";
                for (var k = 0; k < responses.length; k++) {
                    html5 = html5 + "<li value='" + responses[k].User.EmailAddress + "'></li>";
                    $('#SubscribedUserDate').val(responses[k].SubscribtionDate);
                }
                html5 = html5 + "</ul>";
                $('#Pagesubmitmode').val(1);
            }
        });
    },
    loadYoudata: function () {
        Common.ajaxsync({
            url: '/SignUp/GetYouData',
            success: function (response) {
                $('#trailtopaid').val(response.TrialToPaidmode);
                $('#PaidMode').val(response.PoeMode);
                if (response.PoeMode == 1) {
                    $('#trailtopaid').val(response.PoeMode);
                }
                if ($('#HdnMode').val() == 'add' && response.TrialToPaidmode == 1) {
                    $('#PaidMode').val(1);
                }
            },
            error: function (err) {
            }
        });
    },
    loadCost: function () {
        var cost = 0;
        $('.colthree').each(function () {
            cost = cost + parseFloat($(this).html().replace('$ ', ''));
        });
        $('.totalRight').html('$ ' + cost.toFixed(2));
    },
    loadmode: function () {
        Common.ajaxsync({
            url: '/SignUp/GetMode',
            success: function (response) {
                if (response == 0) {
                    $('#HdnMode').val('new');
                } else if (response == 2) {
                    $('#HdnMode').val('old');
                } else {
                    $('#HdnMode').val('add');
                }
            },
            error: function (err) {
            }
        });
    },

    loaduserInfo: function () {
        Common.ajax({
            url: '/SignUp/GetUserInfo',
            success: function (response) {
                $('#wcmsgCheckOut').html('Hello ' + response.FirstName + ' ' + response.LastName);
                $('#UserFnamecheckout').val(response.FirstName);
                $('#UserLnameCheckout').val(response.LastName);
                $('#UsrMailid').val(response.EmailAddress);
            },
            error: function (err) {
            }
        });
    },
    DeleteMember: function () {
        $('.delete').click(function () {
            var desigid = parseInt((this).id.replace("DelDesignation", ""));
            var userMailid = $(this).attr("name").replace("Delusers", "");
            Common.ajax({
                url: '/SignUp/DeleteMember?designationId=' + desigid + '&email=' + userMailid,
                success: function (responses) {
                    checkout.loadmembersList();
                    checkout.loadCartList();
                }
            });
        });
    },
    loadCartList: function () {
        var html = '';
        Common.ajaxsync({
            url: '/SignUp/CartList',
            success: function (response) {
                if (response == null) {
                    $('#cartOptions').html(html);
                } else {
                    //var htmContent = "<img src='../../Images/icons/cart-small.png' />Cart(" + response + ")";
                    html = "<li class='cart' id='signCartlists' style='display:block'> <img src='../../Images/icons/cart-small.png' /> Cart (" + response + ")</li>";
                    $('#cartOptions').html(html);
                }
            },
            error: function (err) {
            }
        });
    },
    loadPlans: function () {
        Common.ajaxsync({
            url: '/SignUp/GetPlanById',
            success: function (response) {
                // below  context commented since payment section is removed.
                //if (response.PlanId == 1) {
                //    $('#trailorpaid').html('(The items below are valid untill your trial period ends)');
                //} else {
                //    $('#trailorpaid').html('(The items below are valid for a subscription period of one year starting today)');
                //}
                $('#plansClicked').val(response.PlanId);
                $('#amount').val(response.UserCost);
                $('#PoeCost').val(response.PoeCost);
                //$('#MaxPoeCount').val(response.MaxPoeCount);
                //$('#MaxUserCount').val(response.MaxUsercount);
            },
            error: function (err) {
            }
        });
    },
    DeletePoe: function () {
        $('.deletePoe').click(function () {
            var poeid = parseInt($(this).attr('id'));
            //var userMailid= $(this).attr("name").replace("Deluser", "");
            Common.ajax({
                url: '/SignUp/DeletePoe?poeid=' + poeid,
                success: function (responses) {
                    checkout.loadmembers();
                    addmember.loadCartList();
                }
            });
        });
    }
};
$(document).ready(function () {
    $('.accordion h3').hide();
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    $('#cancelCheckout').click(function () {
        window.location.href = "/common/Index";
    });
    checkout.loadmode();
    checkout.loadPlans();
    checkout.loaduserInfo();
    checkout.loadYoudata();
    var reqoption = $.trim($('#HdnMode').val());
    if (reqoption == 'add') {
        checkout.loadOlddata();
    }
    checkout.loadmembersList();
    checkout.DeleteMember();
    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
});
function UserCost_Bysub(subscribedDate, userCost) {
    var finalcost = 0;
    var subscribedates = new Date(subscribedDate);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var purchasedDate = mm + "/" + dd + "/" + yyyy;
    var addDays = subscribedates.setDate(subscribedates.getDate() + 365);
    var finaldate = new Date(addDays);
    var date = finaldate.getDate();
    var month = finaldate.getMonth();
    var year = finaldate.getFullYear();
    var subscribemonths = (month + 1) + "/" + date + "/" + year;
    var oneDay = 1000 * 60 * 60 * 24;
    var x = purchasedDate.split("/");
    var y = subscribemonths.split("/");
    var date1 = new Date(x[2], (x[0] - 1), x[1]);
    var date2 = new Date(y[2], (y[0] - 1), y[1]);
    var diff = Math.ceil((date2.getTime() - date1.getTime()) / (oneDay));
    if (diff != 365) {
        var perdayCost = userCost / 365;
        finalcost = (diff * perdayCost).toFixed(2);
    } else {
        finalcost = userCost;
    }
    return finalcost;
}