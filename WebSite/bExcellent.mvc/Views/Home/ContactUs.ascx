<script type="text/javascript" src="../../Scripts/ref/Home.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
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
        // var size = $("#txtSize option:selected").text();
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
        //if (mailid != "") {
        //    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        //    var emailtested = regex.test(mailid);
        //    if (!emailtested) {
        //        $('#ContactError').text("Please enter a valid emailid");
        //        $('#ContactError').show();
        //    }
        //    returnval = emailtested;
        //}

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
</script>
<div class="contactplaceholder">

    <div class="pageholdercontact">
        <div class="pageholder">

            <div id="tiles">
                <div class="breadcrumb">
                    Home > Contact Us
                </div>
                <div class="tileview">
                    <div class="contakt">
                        <h1>Contact Us</h1>
                        <ul>
                            <li><a href="#" class="quickanddetailbig">
                                <h3>
                                    <img src="../../Images/icons/contact-us.png" alt="Login" /></h3>
                                <p>
                                    Contact Us
                                </p>
                            </a></li>
                        </ul>
                    </div>
                </div>
                <div class="contactfield">
                    <div class="contactbg">
                        <div class="contactcontleft">
                            <table>
                                <tr>
                                    <td colspan="2">
                                        <h6>Address</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <p>Pipe9 Consulting Inc.</p>
                                        <p>19329 Skyridge Circle</p>
                                        <p>Boca Raton</p>
                                        <p>Florida</p>
                                        <p>33498</p>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <h6>Customer Service</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>+1-855-923-5556</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td><a href="mailto:support@pipe9consulting.com">support@pipe9consulting.com</a> </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <h6>Sales</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>+1-855-923-5556</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td><a href="mailto:sales@pipe9consulting.com">sales@pipe9consulting.com</a> </td>
                                </tr>
                            </table>
                        </div>
                        <div class="contactcontright">
                            <table>
                                <tr>
                                    <td>First Name</td>
                                    <td>
                                        <input type="text" id="contactFirstName" /></td>
                                </tr>

                                <tr>
                                    <td>Last Name</td>
                                    <td>
                                        <input type="text" id="ContactLastName" /></td>
                                </tr>

                                <tr>
                                    <td>Email</td>
                                    <td>
                                        <input type="text" id="ContactEmail" /></td>
                                </tr>

                                <tr>
                                    <td>Company</td>
                                    <td>
                                        <input type="text" id="ContactCompany" /></td>
                                </tr>

                                <tr>
                                    <td>Title</td>
                                    <td>
                                        <input type="text" id="ContactTitle" /></td>
                                </tr>

                                <tr>
                                    <td>Phone</td>
                                    <td>
                                        <input type="text" id="ContactPhoneNumber" maxlength="15" onkeypress="CheckNumeric(event)" /></td>
                                </tr>

                                <tr>
                                    <td>Message</td>
                                    <td>
                                        <div class="textareabk">
                                            <textarea id="ContactMessage"></textarea>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td>
                                        <input type="button" value="Submit" class="contbtn" id="ContactusSubmit" /></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <p class="errormsg" id="ContactError">All Fields Required</p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>