$(document).ready(function () {
    Accounts.LoadAccountList();

    $('.scroll1').slimScroll();

    $('#printPage').click(function () {
        window.print();
    });
});
var Accounts = {
    LoadAccountList: function () {
        var html = "<table><tr><th>&nbsp;</th><th>Name</th><th>Billing Cycle</th><th>Price</th></tr>";
        Common.ajaxsync({
            url: '/Common/AccountsData',
            success: function (response) {
                var startdate = '';
                var enddate = '';
                var months = new Array(12);
                var totalCost = 0;
                var usercost = 0;
                var amt = 0;
                months[0] = "Jan";
                months[1] = "Feb";
                months[2] = "Mar";
                months[3] = "Apr";
                months[4] = "May";
                months[5] = "Jun";
                months[6] = "Jul";
                months[7] = "Aug";
                months[8] = "Sep";
                months[9] = "Oct";
                months[10] = "Nov";
                months[11] = "Dec";
                for (var i = 0; i < response.length; i++) {
                    if (response[i].PlanId == 1 || response[i].PlanId == 3) {
                        startdate = FormatStartDate(response[i].SubscribedUserDate);
                        enddate = FormatEndDate(response[i].TrialDate, 14);
                        totalCost = totalCost + response[i].UserCost;
                    } else {
                        startdate = FormatStartDate(response[i].SubscribedUserDate);
                        enddate = FormatEndDate(response[i].SubscribedDate, 365);
                        usercost = UserCost_Bysub(response[i].SubscribedDate, response[i].SubscribedUserDate, response[i].UserCost);
                        totalCost = totalCost + parseFloat(usercost);
                    }
                    html = html + "<tr> <td> <img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].Userid + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' /> </td> <td> " + response[i].Firstname + " " + response[i].Lastname + " </td> <td> " + startdate + " to " + enddate + " </td> <td>$" + usercost + " </td> </tr>";
                }
                for (var j = 0; j < response[0].Poes.length; j++) {
                    if (response[0].PlanId == 1 || response[0].PlanId == 3) {
                        startdate = FormatStartDate(response[0].Poes[j].SubscribedPoeDate);
                        enddate = FormatEndDate(response[j].TrialDate, 14);
                        totalCost = totalCost + response[j].PoeCost;
                        if (response[0].PlanId == 3 && response[0].Poes[j].PoeFlag == 1) {
                            amt = Accounts.LoadPoeCost(2);
                            usercost = amt;
                        }
                        totalCost = totalCost + amt;
                    } else {
                        startdate = FormatStartDate(response[0].Poes[j].SubscribedPoeDate);
                        enddate = FormatEndDate(response[0].SubscribedDate, 365);
                        usercost = UserCost_Bysub(response[0].SubscribedDate, response[0].Poes[j].SubscribedPoeDate, response[0].PoeCost);
                        totalCost = totalCost + parseFloat(usercost);
                    }
                    html = html + "<tr> <td> <img src='../../Images/" + response[0].Poes[j].Name + "_Intro.png'  width='61px' height='61px'  /> </td> <td>" + response[0].Poes[j].Name + "</td> <td>" + startdate + " to " + enddate + "</td> <td>$" + usercost + "</td> </tr>";
                    amt = 0;
                    usercost = 0;
                }
                html = html + "</table>";
                $('#accountdata').html(html);
                $('#totalCost').html(" Total $" + totalCost.toFixed(2) + "");
            },
            error: function (err) {
            }
        });
    },
    LoadPoeCost: function (planid) {
        var amt = 0;
        Common.ajaxsync({
            url: '/SignUp/GetPoEcost?planid=' + planid,
            success: function (response) {
                amt = response.PoeCost;
            }
        });
        return amt;
    }
};

var months = new Array(12);
months[0] = "Jan";
months[1] = "Feb";
months[2] = "Mar";
months[3] = "Apr";
months[4] = "May";
months[5] = "Jun";
months[6] = "Jul";
months[7] = "Aug";
months[8] = "Sep";
months[9] = "Oct";
months[10] = "Nov";
months[11] = "Dec";
function FormatStartDate(dates) {
    var trialDate = new Date(dates);
    var curdate = trialDate.getDate();
    var curmonth = trialDate.getMonth();
    var curyear = trialDate.getFullYear();
    var startdate = curdate + " " + months[curmonth] + ", " + curyear;
    return startdate;
}
function FormatEndDate(dates, days) {
    var trialDate = new Date(dates);
    var addDays = trialDate.setDate(trialDate.getDate() + days);
    var finaldate = new Date(addDays);
    var date = finaldate.getDate();
    var month = finaldate.getMonth();
    var year = finaldate.getFullYear();
    var enddate = date + " " + months[month] + ", " + year;
    return enddate;
}
function UserCost_Bysub(subscribedDate, purchasedDate, userCost) {
    var finalcost = 0;
    var subscribedates = new Date(subscribedDate);
    var purchasedateFormat = purchasedDate.substring(0, purchasedDate.indexOf(' '));
    var addDays = subscribedates.setDate(subscribedates.getDate() + 365);
    var finaldate = new Date(addDays);
    var date = finaldate.getDate();
    var month = finaldate.getMonth();
    var year = finaldate.getFullYear();
    var subscribemonths = (month + 1) + "/" + date + "/" + year;
    var oneDay = 1000 * 60 * 60 * 24;
    var x = purchasedateFormat.split("/");
    var y = subscribemonths.split("/");
    var date1 = new Date(x[2], (x[0] - 1), x[1]);
    var date2 = new Date(y[2], (y[0] - 1), y[1]);
    var diff = Math.ceil((date2.getTime() - date1.getTime()) / (oneDay));
    if (diff != 365) {
        var perdayCost = userCost / 365;
        finalcost = diff * perdayCost;
    } else {
        finalcost = userCost;
    }
    return finalcost.toFixed(2);
}