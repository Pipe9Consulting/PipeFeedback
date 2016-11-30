//load poe content
var signup_methods = {
    loadUserContent: function (option, element) {
        Common.ajax({
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
                $('#firstname').val(response.FirstName);
                $('#lastname').val(response.LastName);
            },
            error: function (err) {
            }
        });
    },
    loadStartButtonClick: function () {
        Common.ajaxsync({
            url: '/SignUp/GetMode',
            success: function (response) {
                var href = '';
                if (response == 0) {
                    href = '/Home/SignOut';
                } else {
                    href = '/Network/Network';
                }
                $('#start').live('click', function () {
                    window.location.href = href;
                });
            },
            error: function (err) {
            }
        });
    },
    loadThankYouContent: function (option, element) {
        Common.ajax({
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
               // debugger;
                $('#toname').html('Dear ' + response.FirstName + ' ' + response.LastName + ",<br/>");
                $('#name').html(response.FirstName + ' ' + response.LastName);
            },
            error: function (err) {
            }
        });
    },
    LoadYammerContent: function () {
        Common.ajax({
            url: '/SignUp/LoadYammerContent',
            success: function (response) {
                if (response != null) {
                    $('#regfname').val(response.FirstName);
                    $('#reglname').val(response.LastName);
                    $('#email').val(response.EmailId);
                    $('#email').attr('disabled', true);
                    $('#password1').hide();
                    $('#password2').hide();
                    $('#loadYammerMode').val(1);
                }
            },
            error: function (err) {
            }
        });
    },
    LoadUserData: function () {
        Common.ajax({
            url: '/SignUp/GetUserInfo',
            success: function (response) {
                if (response != null) {
                    $('#regfname').val(response.FirstName);
                    $('#reglname').val(response.LastName);
                    $('#email').val(response.EmailAddress);
                    $('#email').attr('disabled', true);
                    $('#password1').hide();
                    $('#password2').hide();
                    $('#loadYammerMode').val(1);
                }
            },
            error: function (err) {
            }
        });
    },
    loadThankYouPaymentContent: function (option, element) {
        Common.ajax({
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
                if (response != null) {
                    $('#orderinfo').html('Your order is number ' + response.ResponseId + ' has been successfully placed.');
                    $('#address').html('<p>' + response.Address1 + '</p><p>' + response.Address2 + '</p><p>' + response.City + '</p><p>' + response.State + ',' + response.Zip + '</p>');
                }
            },
            error: function (err) {
            }
        });
    },

    loadCountrydata: function () {
        var countries = signup_methods.loadCountries();
        $('#country').html('');
        $(countries).each(function () {
            $('#country').append("<option value='" + $(this).attr("Id") + "'>" + $(this).attr("Name") + "</option>");
            $('#country').val(1);
        });
        $('#country').find('option[value=236]').attr("selected", "selected");
    },
    loadCountries: function () {
        var returnValue = null;
        Common.ajaxsync({
            url: '../../Common/GetAllCounties',
            success: function (response) {
                returnValue = response;
            },
            error: function (err) {
            }
        });
        return returnValue;
    },
    loadMailId: function () {
        Common.ajaxsync({
            url: '/SignUp/GetMailid',
            success: function (response) {
                $('#email').val(response);
                $('#emailid').val('');
            },
            error: function (err) {
            }
        });
    },
    LoadStartMode: function () {
        Common.ajaxsync({
            url: '/SignUp/GetStartMode',
            success: function (response) {
                if (response != null)
                    $('#startupMode').val(response);
            },
            error: function (err) {
            }
        });
    },
    EmailValidation: function (handleEmailData) {
        Common.ajaxsync({
            url: '/SignUp/CheckEmailid?emailid=' + $('#email').val(),
            success: function (response) {
                if (response == true) {
                    $('#emailid').html('Sorry you have already registered');
                    handleEmailData(false);
                } else {
                    $('#emailid').html('');
                    handleEmailData(true);
                }
            },
            error: function (err) {
            }
        });
    }
};

function loaded() {
}
document.addEventListener('DOMContentLoaded', loaded, false);
$(function () {
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    signup_methods.loadCountrydata();
    signup_methods.LoadYammerContent();
    signup_methods.LoadUserData();
    $(".accordion div").hide();
    $(".accordion h3").click(function () {
        $(this).next(".pane").slideToggle("slow").siblings(".pane:visible").slideUp("slow");
        $(this).toggleClass("current");
        $(this).siblings("h3").removeClass("current");
    });
    if ($('#checkout').length == 1) {
        signup_methods.loadUserContent({ url: '../../signup/getUserInfo' });
    }
    if ($('#thankyou').length == 1) {
        signup_methods.loadThankYouContent({ url: '../../signup/getUserInfo' });
        signup_methods.loadThankYouPaymentContent({ url: '../../signup/GetPaymentData' });
        signup_methods.loadStartButtonClick();
    }
});
$(function () {
    signup_methods.LoadYammerContent();
    var url = window.location.pathname;
    var urls = url.split("/");
    var reqoption = $.trim($('#HdnTask').val());

    $('.addmngr .addform').hide();
    $('.addmngr h2:nth-child(1)').removeClass('active').next().slideUp('slow');
    if (reqoption == 'you') {
        $('.addmngr h2:nth-child(1)').addClass('active').next().slideDown();
    } else
        $('.addmngr h2').removeClass('active').next().slideUp('slow');
    if (reqoption == 'manager') {
        $('.addmngr h2:nth-child(3)').addClass('active').next().slideDown();
    } else if (reqoption == 'skipmanager') {
        $('.addmngr h2:nth-child(5)').addClass('active').next().slideDown();
    } else if (reqoption == 'team') {
        $('.addmngr h2:nth-child(7)').addClass('active').next().slideDown();
    } else if (reqoption == 'peer') {
        $('.addmngr h2:nth-child(9)').addClass('active').next().slideDown();
    } else if (reqoption == 'customer') {
        $('.addmngr h2:nth-child(11)').addClass('active').next().slideDown();
    }
    $('.addmngr h2').click(function () {
        if ($(this).next().is(':hidden')) {
            $('.addmngr h2').removeClass('active').next().slideUp('slow');
            $(this).toggleClass('active').next().slideDown('slow');
        }
    });

    $("#status").fadeOut();
    $("#preloader").delay(1000).fadeOut("slow");
});

//Drop Down//
$(window).load(function () {
    $.fn.dropDown = function (hiddenClass) {
        var that = this;
        $('html').click(function () {
            that.each(function () {
                $(this).find('ul').addClass(hiddenClass);
            });
        });
        return this.each(function () {
            var $this = $(this);
            $this.data('dropDownTrigger', true);
            $this.find('ul').addClass(hiddenClass);
            $this.click(function (e) {
                $(this).find('ul').toggleClass(hiddenClass);
                e.stopPropagation();
                if ($(e.target).parent().data('dropDownTrigger')) {
                    e.preventDefault();
                }
            });
        });
    };

    $('.dropdown').dropDown('hidden');
});

//Cheking the variable.

function ShowButton() {
    Common.ajax({
        url: "../../SignUp/GetSessionButton",
        success: function (response) {
            if (response != null) {
                if (response == 'paid2') {
                    $("#trialbtn").hide();
                } if (response == 'trial1') {
                    $("#paidbtn").hide();
                }
            }
        },
        error: function () {
        }
    });
}

//Form Validation//
function validateandsubmit(paidOrTrial) {
    var valid = true;
    var frm = document.getElementById('register');
    var network = $('#network').val();
    if (network == "") {
        $('#ntwork').text('Choose a name for your network');
        valid = false;
    }

    else {
        document.getElementById('ntwork').innerHTML = '';

        Common.ajax({
            url: '/SignUp/CheckNetworkName?networkName=' + $('#network').val(),
            success: function (response) {
                if (response == true) {
                    $('#ntwork').html('Sorry Network name is already exists');
                    valid = false;
                } else {
                    $('#ntwork').html('');
                }
            },
            error: function (err) {
            }
        });
    }

    if (frm.firstame.value == "") {
        frm.firstame.focus();
        document.getElementById('FName').innerHTML = 'Please enter a valid first name';
        valid = false;
    } else {
        document.getElementById('FName').innerHTML = '';
    }

    if (frm.lastname.value == "") {
        frm.lastname.focus();
        document.getElementById('LName').innerHTML = 'Please enter a valid last name';
        valid = false;
    } else {
        document.getElementById('LName').innerHTML = '';
    }

    if (frm.companyname.value == "") {
        frm.companyname.focus();
        document.getElementById('CName').innerHTML = 'Please enter a valid company name';
        valid = false;
    } else {
        document.getElementById('CName').innerHTML = '';
    }
    var mail = $('#email').val();
    var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var isValidEmail = emailReg.test(mail);
    if (mail == "") {
        $('#emailid').text('Should be your company specific email id');
        valid = false;
    }
    else if (!isValidEmail) {
        $('#emailid').text('Please enter a valid email id');
        valid = false;
    }
    else {
        if (validatepubemail()) {
            document.getElementById('emailid').innerHTML = '';
            signup_methods.EmailValidation(function (output) {
                valid = output;
            });
        } else {
            $('#emailid').html('Should be your company specific email id');
            valid = false;
        }
    }
    if (frm.country.value == "") {
        frm.country.focus();
        document.getElementById('contryName').innerHTML = 'Please enter your country name';
        valid = false;
    } else {
        document.getElementById('contryName').innerHTML = '';
    }
    if ($('#loadYammerMode').val() != 1) {
        if (frm.pass.value == "") {
            frm.pass.focus();
            document.getElementById('password').innerHTML = 'Please enter your password';
            valid = false;
        } else {
            document.getElementById('password').innerHTML = '';
        }

        if (frm.confpass.value == "") {
            frm.confpass.focus();
            document.getElementById('confpassword').innerHTML = 'Please enter confirm password';
            valid = false;
        } else {
            document.getElementById('confpassword').innerHTML = '';
        }

        if (frm.confpass.value != "" && frm.pass.value != "") {
            if (frm.confpass.value != frm.pass.value) {
                frm.confpass.focus();
                document.getElementById('confpassword').innerHTML = 'Password does not match';
                valid = false;
            } else {
                document.getElementById('confpassword').innerHTML = '';
            }
        }
    }

    if (frm.entCaptcha.value == "") {
        frm.entCaptcha.focus();
        document.getElementById('captcha').innerHTML = 'Please enter Captcha text';
        valid = false;
    } else {
        if (frm.entCaptcha.value != frm.txtCaptcha.value.replace(/\ /g, "")) {
            document.getElementById('captcha').innerHTML = 'Captcha text Doesnt match';
            valid = false;
        } else {
            document.getElementById('captcha').innerHTML = '';
        }
    }
    if (!$('#opt_a').is(':checked')) {
        valid = false;
        $('#checkerr').html('Please check the Terms of services/Privacy policy ');
    }
    if (!$('#opt_b').is(':checked')) {
        $('#checkerr').html('Please check the Terms of services/Privacy policy ');
        valid = false;
    }

    //valid = true;
    if (valid) {
        var frm = document.getElementById('register');
        frm.action = '../../SignUp/RegisterRequest?paidortrial=' + paidOrTrial;
        frm.method = 'post';
        frm.submit();
    }
}
function validatepubemail() {
    var mailid = $('#email').val();
    var pubemails = "gmail,yahoo,hotmail,live,outlook";
    var collections = pubemails.split(',');
    for (var k = 0; k < collections.length; k++) {
        if (mailid.toLowerCase().indexOf(collections[k]) >= 0) {
            return false;
        }
    }
    return true;
}
//Form Validation//
function checkoutvalidate() {
    var valid = true;
    var frm = document.getElementById('checkout');
    $('.errormsg').show();
    if (frm.firstname.value == "") {
        frm.firstname.focus();
        document.getElementById('firstnamemsg').innerHTML = 'Please enter a valid first name';

        valid = false;
    } else { document.getElementById('firstnamemsg').innerHTML = ''; }

    if (frm.lastname.value == "") {
        frm.lastname.focus();
        document.getElementById('lastnamemsg').innerHTML = 'Please enter a valid last name';
        valid = false;
    } else { document.getElementById('lastnamemsg').innerHTML = ''; }

    if (frm.address1.value == "") {
        frm.address1.focus();
        document.getElementById('address1msg').innerHTML = 'Please enter a valid address';
        valid = false;
    } else { document.getElementById('address1msg').innerHTML = ''; }

    if (frm.city.value == "") {
        frm.city.focus();
        document.getElementById('citymsg').innerHTML = 'Please enter a valid city';
        valid = false;
    } else { document.getElementById('citymsg').innerHTML = ''; }

    if (frm.state.value == "") {
        frm.state.focus();
        document.getElementById('statemsg').innerHTML = 'Please enter a valid state';
        valid = false;
    } else { document.getElementById('statemsg').innerHTML = ''; }

    if (frm.zip.value == "") {
        frm.zip.focus();
        document.getElementById('zipmsg').innerHTML = 'Please enter a valid zip code';
        valid = false;
    } else { document.getElementById('zipmsg').innerHTML = ''; }

    if (frm.country.value == "") {
        frm.country.focus();
        document.getElementById('countrymsg').innerHTML = 'Please enter a valid country';
        valid = false;
    } else { document.getElementById('countrymsg').innerHTML = ''; }

    if (frm.cardnumber.value == "") {
        frm.cardnumber.focus();
        document.getElementById('cardnumbermsg').innerHTML = 'Please enter a valid card number';
        valid = false;
    } else { document.getElementById('cardnumbermsg').innerHTML = ''; }

    if (frm.cvvcode.value == "") {
        frm.cvvcode.focus();
        document.getElementById('cvvcodemsg').innerHTML = 'Please enter a valid cvv code';
        valid = false;
    } else { document.getElementById('cvvcodemsg').innerHTML = ''; }

    if (frm.month.value == "") {
        frm.month.focus();
        document.getElementById('expirationdatemsg').innerHTML = 'Please enter a valid expiration date';
        valid = false;
    } else { document.getElementById('expirationdatemsg').innerHTML = ''; }

    if (valid) {
        var frm = document.getElementById('checkout');
        frm.action = '../../SignUp/checkoutconfirm';
        frm.method = 'post';
        frm.submit();
    }
}

function DrawCaptcha() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 5;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1) + ' ';
    }
    document.getElementById("txtCaptcha").value = randomstring;
}
$(document).ready(function () {
    $('#email').live('blur', function () {
        Common.ajax({
            url: '/SignUp/CheckEmailid?emailid=' + $('#email').val(),
            success: function (response) {
                if (response == true) {
                    $('#emailid').html('Sorry you have already registered');
                } else {
                    var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                    var isValidEmail = emailReg.test($('#email').val());
                    if (isValidEmail)
                        $('#emailid').html('');
                }
            },
            error: function (err) {
            }
        });
    });
    $('#network').live('blur', function () {
        Common.ajax({
            url: '/SignUp/CheckNetworkName?networkName=' + $('#network').val(),
            success: function (response) {
                if (response == true) {
                    $('#ntwork').html('Sorry Network name is already exists');
                } else {
                    $('#ntwork').html('');
                }
            },
            error: function (err) {
            }
        });
    });
});

$(document).ready(function () {
    signup_methods.loadMailId();
    signup_methods.LoadStartMode();
    $('#print').click(function () {
        window.print();
        return false;
    });
});