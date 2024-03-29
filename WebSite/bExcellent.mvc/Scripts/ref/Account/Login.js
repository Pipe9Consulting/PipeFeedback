﻿var login = {
    loginRequest: function () {
        if ($('#emailid').val() == "") {
            alert("enter email id");
        } else {
            $('#emailid').parents('form').submit();
        }
    },
    //Redirecting to different pages
    loadLogindata: function () {
        $('#login').click(function () {
            window.location = "../../Home/Login";
        });
        $('#pricing').click(function () {
            window.location = "../../Home/Pricing";
        });
        $('#faq').click(function () {
            window.location = "../../Home/FAQ";
        });
        $('#video').click(function () {
            window.location = "../../Home/Video";
        });
        $('#signupbtn').click(function () {
            window.location = "../../Home/Pricing";
        });
    },
    //Loading and validating, update user data
    loadupdatedata: function () {
        $('#ChangePassbtn').click(function () {
            var val1 = $('#newpassword').val();
            var val2 = $('#Confirmpassword').val();
            var mail = $('#txtemailid').val();
            var atpos = mail.indexOf("@");
            var dotpos = mail.lastIndexOf(".");
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= mail.length) {
                //alert("Please enter your valid  emailid");
                return false;
            }
            else if ($('#curpassword').val().trim() == '') {
                //alert("Please enter your current password");
                $('#UpdatemailLbl').html("Please enter current password");
                $('#UpdatemailLbl').show();
                return false;
            }
            else if ($('#newpassword').val().trim() == '') {
                $('#UpdatemailLbl').html("Please enter new password");
                $('#UpdatemailLbl').show();
                return false;
            }
            else if ($('#Confirmpassword').val().trim() == '') {
                $('#UpdatemailLbl').html("Please confirm new password");
                $('#UpdatemailLbl').show();
                // $('#modalMailSuccess').modal();
                //alert("Please enter your new password");
                return false;
            }
                //else if ($('#Confirmpassword').val().trim() == '') {
                //    alert("Please enter your confirm new password");
                //}
            else if (val1 != val2) {
                $('#UpdatemailLbl').html("New password and confirm new password should be same ");
                //$('#modalMailSuccess').modal(); 
                $('#UpdatemailLbl').show();
                return false;
            } else {
                login.checkUpdateMailid({ url: '../../Home/Updateuserdetails', data: { 'emailId': $('#txtemailid').val(), 'password': $('#curpassword').val() } });
            }
        });
    },
    // Loading forget password data
    loadforgetdata: function () {
        $('#resetbtn').click(function () {
            var str1 = document.getElementById('txtCaptcha').value;
           // alert(str1);
            var captchatext = str1.replace(/ /g, '');
            var str2 = document.getElementById('txtInput').value;
            var x = $('#txtforgetmail').val();
            var atpos = x.indexOf("@");
            var dotpos = x.lastIndexOf(".");
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
               // $('#lbls').hide();
                $('#findid').text("Please enter your email");
                $('#findid').show();
                // alert("Please enter your emailid");
            } else if (captchatext != str2) {
                $('#findid').hide();
                $('#captchatext').text("Retry the Above Text");
                $('#captchatext').show();
                $('#txtInput').val('');
                //alert('Enter the above text Correctly');
            } else {
                $('#lbls').hide();
                $('#findid').hide();
                login.checkforgetMailid({ url: '../../Common/CheckEmailId', data: { 'emailaddress': $('#txtforgetmail').val() } });
            }
        });
    },
    // loading home page
    loadhomepage: function () {
        window.location = "../../Home/Home";
    },
    // update the user data
    updatepassword: function (option) {
        Common.ajax({
            url: option.url,
            data: option.data,
            success: function (response) {
            },
            error: function (err) {
            }
        });
    },
    // Sending forget password to user email id
    forgetpassword: function (option) {
        Common.ajax({
            url: option.url,
            data: option.data,
            success: function (response) {
               // alert(response);
                if (response) {
                    
                    //alert("Your password reminder email has been sent. Please check your Junk Folder.");
                    //$("#basic-forgetPassword").modal('hide');
                    //$('#generalPopup').modal("show");
                }
            },
            error: function (err) {
            }
        });
    },
    // check for the email id in forget password
    checkforgetMailid: function (option) {
        Common.ajax({
            url: option.url,
            data: option.data,
            success: function (response) {
                if (response == true) {
                    login.forgetpassword({ url: '../../Common/getpassword', data: { 'emailaddress': $('#txtforgetmail').val() } });
                    //$('#masterMsgCont').text("Your Password is sent to your email id sucessfully");
                    //$('#overallCont').show();
                    $("#basic-forgetPassword").hide();
                    $('.popupbg').hide();
                    $('#myModal').modal();
                    //alert("Your password reminder email has been sent. Please check your Junk Folder.");
                   
                    //$.modal.close();
                } else {
                    $('#txtInput').val('');
                    $('#findid').text("This email is not valid");
                    $('#findid').show();
                }
            },
            error: function (err) {
            }
        });
    },
    // check for the email id in update user detail
    checkUpdateMailid: function (option) {
        Common.ajax({
            url: option.url,
            data: option.data,
            success: function (response) {
                if (response == true) {
                    login.updatepassword({ url: '../../Common/updatePassword', data: { 'userName': $('#txtemailid').val(), 'password': $('#newpassword').val() } });
                    //alert("Your Password is Updated Sucessfully");
                    $('#masterMsgCont').html(" Your password has been updated successfully");
                    $('#overallCont').show();
                   // window.location = "../../Home/SignOut";
                    $.modal.close();
                } else {
                    $('#UpdatemailLbl').text("Please enter correct password");
                    $('#UpdatemailLbl').show();
                    return false;
                }
            },
            error: function (err) {
            }
        });
    },
};
$(document).ready(function () {
   
    $("#status").fadeOut();
    
    $("#preloader").delay(100).fadeOut("slow");
    $('#emailid').focus();
    $('#changePassword').on('click', function () {
        $('.popupbg').show();
        $('#basic-changePassword').show();

    });
    $('#forgetpassword').click(function () {
        DrawCaptcha();
        $('#basic-forgetPassword').show();
        $('.popupbg').show();
        $('#findid').hide();
        $('#captchatext').hide();
        $('#txtInput').val("");
        $('#txtforgetmail').val($('#emailid').val());

    });
    $('#yammerClick').click(function () {
        window.location = "/Yammer/getYammer";
    });
    $('#txtCaptcha').prop("disabled", true);
    $('#findid').hide();
    $('#captchatext').hide();
    $('#UpdatemailLbl').hide();
    login.loadLogindata();
    login.loadupdatedata();
    login.loadforgetdata();
    $('#imagelogoHome').show();
    $('.close').click(function () {
        $('#basic-forgetPassword,.popupbg,#basic-changePassword').hide();
    });
});
//Created / Generates the captcha function
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