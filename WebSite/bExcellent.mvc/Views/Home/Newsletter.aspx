<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html>

<html>
<head id="Head1" runat="server">

    <title>Newsletter</title>
    <script src="../../Scripts/ref/jquery-1.8.3.js"></script>
    <script src='../../Scripts/ref/FlowPlayer/flowplayer-3.2.6.min.js' type='text/javascript'></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#ContactError').hide();
            $('.video').hide();
            flowplayer("div.player", "../../Scripts/ref/Flowplayer/flowplayer-3.2.7.swf", {
                clip: {
                    autoPlay: false,
                    autoBuffering: true
                }
            });
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
                        $.ajax({
                            crossDomain: true,
                            method: 'GET',
                            url: 'http://demo.bexcellent.com/Home/SendNewsLetter',
                            data: { 'fname': fname, 'lname': lname, 'title': title, 'mailid': mailid, 'companyName': company, 'message': message, 'phone': phone },
                            success: function () {
                                $('#contactFirstName').val("");
                                $('#ContactLastName').val("");
                                $('#ContactTitle').val("");
                                $('#ContactEmail').val("");
                                $('#ContactCompany').val("");
                                $('#ContactPhoneNumber').val("");
                                $('#ContactMessage').text("");
                                $('.contactfrm').hide();
                                $('.video').show();
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
            // var size = $("#txtSize option:selected").text();
            $('#ContactError').hide();
            var returnval = true;

            if (fname == "" && returnval == true) {
                $('#ContactError').text("Please enter the First Name");
                $('#ContactError').show();

                returnval = false;
            }
            if (lname == "" && returnval == true) {
                $('#ContactError').text("Please enter the Last Name");
                $('#ContactError').show();

                returnval = false;
            }
            if (mailid == "" && returnval == true) {
                $('#ContactError').text("Please enter the Email Id");
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
    </script>
</head>
<body style="background: #efefef">
    <table class="formpopup" border="0" align="center" cellpadding="0" cellspacing="0"
        style="width: 100%; position: absolute; top: 27%; left: 0; z-index: 2">
        <tr>
            <td>
                <div class="contactcontright" style="width: 426px; margin: 0 auto; background: #e5e5e5; border: 1px solid #cacaca; padding: 10px;">
                    <table class="video">
                        <tr>
                            <td align="right"></td>
                            <td>
                        </tr>
                        <tr>
                            <td>
                                <div class='player' href='../../Video/Nicksaban.flv' style='display: block; width: 426px; height: 320px'></div>
                            </td>
                        </tr>
                    </table>
                    <table cellpadding="3" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; width: 100%; color: #353535;"
                        class="contactfrm">
                        <tr>
                            <td style="font-size: 20px; color: #353535; border-bottom: 1px solid #ccc;">Contact bexcellent</td>
                            <td style="font-size: 16px; color: #353535; border-bottom: 1px solid #ccc;">Call: 1 855-923-5556</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="font-size: 2px">&nbsp;</td>
                        </tr>
                        <tr>
                            <td width="50%" valign="top">
                                <table width="95%" border="0" cellspacing="3" cellpadding="0" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #353535">
                                    <tr class="contactfrm">
                                        <td width="104%" height="20">First Name </td>
                                    </tr>
                                    <tr class="contactfrm">
                                        <td>
                                            <input type="text" id="contactFirstName" style="border: 1px solid #ccc; padding: 3px; width: 100%" /></td>
                                    </tr>
                                    <tr class="contactfrm">
                                        <td height="20">Last Name </td>
                                    </tr>
                                    <tr class="contactfrm">
                                        <td>
                                            <input type="text" id="ContactLastName" style="border: 1px solid #ccc; padding: 3px; width: 100%" /></td>
                                    </tr>
                                    <tr class="contactfrm">
                                        <td height="20">Email </td>
                                    </tr>
                                    <tr class="contactfrm">
                                        <td>
                                            <input type="text" id="ContactEmail" style="border: 1px solid #ccc; padding: 3px; width: 100%" /></td>
                                    </tr>
                                    <tr class="contactfrm">
                                        <td height="20">Company </td>
                                    </tr>
                                    <tr class="contactfrm">
                                        <td>
                                            <input type="text" id="ContactCompany" style="border: 1px solid #ccc; padding: 3px; width: 100%" /></td>
                                    </tr>
                                    <tr class="contactfrm">
                                        <td height="20">Title </td>
                                    </tr>
                                    <tr class="contactfrm">
                                        <td height="20">
                                            <input type="text" id="ContactTitle" style="border: 1px solid #ccc; padding: 3px; width: 100%" /></td>
                                    </tr>
                                    <tr class="contactfrm">
                                        <td height="20">Phone</td>
                                    </tr>
                                    <tr class="contactfrm">
                                        <td height="20">
                                            <input type="text" id="ContactPhoneNumber" style="border: 1px solid #ccc; padding: 3px; width: 100%" /></td>
                                    </tr>
                                    <tr class="contactfrm">
                                        <td></td>
                                    </tr>
                                </table>
                            </td>
                            <td width="50%" align="left" valign="top" style="border-left: 1px solid #ccc">
                                <table width="95%" border="0" align="center"
                                    cellpadding="2" cellspacing="0" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #353535">
                                    <tr>
                                        <td>Message for Sales</td>
                                    </tr>
                                    <tr>
                                        <td valign="top">
                                            <textarea name="ContactMessage" id="ContactMessage" style="border: 1px solid #ccc; padding: 3px; width: 100%; height: 235px"></textarea></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="button" value="Submit" class="contbtn" id="ContactusSubmit" style="background: #e0b001; color: #fff; border: 1px solid #353535; cursor: pointer; padding: 5px;" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <p class="errormsg" id="ContactError" style="color: #933;">All Fields Required</p>
                            </td>
                        </tr>
                    </table>
                </div>
    </table>
</body>
</html>