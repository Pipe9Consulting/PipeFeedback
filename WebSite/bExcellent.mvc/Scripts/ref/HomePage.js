this.randomtip = function () {
    var pause = 3000; // define the pause for each tip (in milliseconds)
    var length = $("#tips li").length;
    var temp = -1;

    this.getRan = function () {
        // get the random number
        var ran = Math.floor(Math.random() * length) + 1;
        return ran;
    };
    this.show = function () {
        var ran = getRan();
        // to avoid repeating
        while (ran == temp) {
            ran = getRan();
        };
        temp = ran;

        $("#flipbox").flip(
            {
                direction: 'lr',
                color: "#808080",
                content: $("#tips li:nth-child(" + ran + ")")
            })
        $("#flipbox1").flip(
            {
                direction: 'lr',
                color: "#808080",
                content: $("#tips li:nth-child(" + ran + ")")
            })
    };

    show(); setInterval(show, pause);
};

$(document).ready(function () {
    $('#vidh01').live('click', function () {
        $('#contactHeader').text("Contact PIPE9");
        var values = parseInt($(this).attr('name'));
        $('#videolistsOrder').val(values);
        $('.formpopup,#formpopup').show();
    });
    $('#vidh02').live('click', function () {
        $('#contactHeader').text("Contact PIPE9");
        var values = parseInt($(this).attr('name'));
        $('#videolistsOrder').val(values);
        $('.formpopup,#formpopup').show();
    });
    $('#vidh03').live('click', function () {
        $('#contactHeader').text("Contact PIPE9");
        var values = parseInt($(this).attr('name'));
        $('#videolistsOrder').val(values);
        $('.formpopup,#formpopup').show();
    });
    $(".live-tile, .flip-list").not(".exclude").liveTile();
    randomtip();

    $('#ContactError').hide();
    $('#ContactusSubmit').click(function () {
        $("#status").fadeIn();
        $("#preloader").delay(10).fadeIn("slow");
        // var validation = true;
        var validateAcc = validate();
        var fname = $('#contactFirstName').val();
        var lname = $('#ContactLastName').val();
        var title = $('#ContactTitle').val();
        var mailid = $('#ContactEmail').val();
        var company = $('#ContactCompany').val();
        var phone = $('#ContactPhoneNumber').val();
        var message = $('#ContactMessage').text();

        if (validateAcc) {
            var checkmailid = emailvalidate(mailid);
            if (checkmailid) {
                Common.ajax({
                    url: '../Home/SendContactMail',
                    data: { 'fname': fname, 'lname': lname, 'title': title, 'mailid': mailid, 'companyName': company, 'message': message, 'phone': phone },
                    success: function () {
                        $('#contactFirstName').val("");
                        $('#ContactLastName').val("");
                        $('#ContactTitle').val("");
                        $('#ContactEmail').val("");
                        $('#ContactCompany').val("");
                        $('#ContactPhoneNumber').val("");
                        $('#ContactMessage').text("");
                        $("#status").fadeOut();
                        $("#preloader").delay(1000).fadeOut("slow");
                    },
                    error: function (err) {
                    }
                });
            } else {
                $("#status").fadeOut();
                $("#preloader").delay(1000).fadeOut("slow");
            }
        } else {
            $("#status").fadeOut();
            $("#preloader").delay(1000).fadeOut("slow");
        }
    });
});
function validate() {
    var fname = $('#contactFirstName').val();
    var lname = $('#ContactLastName').val();
    var title = $('#ContactTitle').val();
    var mailid = $('#ContactEmail').val();
    var company = $('#ContactCompany').val();
    var phone = $('#ContactPhoneNumber').val();

    $('#ContactError').hide();
    var returnval = true;

    if (fname == "" && returnval == true) {
        $('#ContactError').text("Please enter the FirstName");
        $('#ContactError').show();

        returnval = false;
    }
    if (lname == "" && returnval == true) {
        $('#ContactError').text("Please enter the LastName");
        $('#ContactError').show();

        returnval = false;
    }
    if (mailid == "" && returnval == true) {
        $('#ContactError').text("Please enter the EmailId");
        $('#ContactError').show();

        returnval = false;
    }

    if (company == "" && returnval == true) {
        $('#ContactError').text("Please enter the Company Name");
        $('#ContactError').show();

        returnval = false;
    }
    if (title == "" && returnval == true) {
        $('#ContactError').text("Please enter the Title");
        $('#ContactError').show();

        returnval = false;
    }
    if (phone == "" && returnval == true) {
        $('#ContactError').text("Please enter the Contact Number");
        $('#ContactError').show();
        returnval = false;
    }

    return returnval;
}
function emailvalidate(mailid) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var emailtested = regex.test(mailid);
    if (!emailtested) {
        $('#ContactError').text("Please enter a valid emailid");
        $('#ContactError').show();
    }
    return emailtested;
}
function CheckNumeric(e) {
    if (window.event) // IE
    {
        if ((e.keyCode < 48 || e.keyCode > 57) & e.keyCode != 8) {
            event.returnValue = false;
            return false;
        }
    }
    else { // Fire Fox
        if ((e.which < 48 || e.which > 57) & e.which != 8) {
            e.preventDefault();
            return false;
        }
    }
}