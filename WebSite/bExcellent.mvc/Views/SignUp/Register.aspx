<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/SignUp.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Register
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/basic.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/signup/signUpNewMaster.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/signup/register.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/jquery.Jcrop.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/ref/Signup/signup.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.simplemodal.js" type="text/javascript"></script>
    <script src="../../Uploadify/swfobject.js" type="text/javascript"></script>
    <script src="../../Uploadify/jquery.uploadify.v2.1.4.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.Jcrop.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var x = 0, y = 0, w = 0, h = 0;
        var imageHandler = "../../Uploadify/ImageHandler.ashx?id=";
        $('#cartOptions').hide();
        $(function () {
            ShowButton();
            $('#btnuploadingimage ').click(function (e) {

                $('#modalpopupUpload').modal();

                var UploadifyAuthCookie = '<% = Request.Cookies[FormsAuthentication.FormsCookieName] == null ? string.Empty : Request.Cookies[FormsAuthentication.FormsCookieName].Value %>';
                var UploadifySessionId = '<%= Session.SessionID %>';

                $("#signUpload").uploadify({
                    'hideButton': true,       // We use a trick below to overlay a fake html upload button with this hidden flash button
                    'wmode': 'transparent',
                    'uploader': '<%= Url.Content("~/Uploadify/uploadify.swf") %>',
                    'cancelImg': '<%= Url.Content("~/Uploadify/cancel.png") %>',
                    'buttonText': 'Upload File',
                    'script': '<%= Url.Action("FileUpload", "Media") %>',
                    'multi': true,
                    'auto': true,
                    'fileExt': '*.jpg;*.gif;*.png;*.jpeg',
                    'fileDesc': 'Image Files',
                    'scriptData': { RequireUploadifySessionSync: true, SecurityToken: UploadifyAuthCookie, SessionId: UploadifySessionId },
                    'onComplete': function (event, ID, fileObj, response, data) {
                        response = $.parseJSON(response);
                        if (response.Status == 'OK') {
                            $("#pnlUpload").hide();
                            $("#pnlUploadedImage").show();
                            $("#textupload").hide();
                            $("#btnUpload").hide();
                            $('.croptxt').show();
                            $("#imgUploadedImage").attr("src", imageHandler + response.Id);
                            $('#imgUploadedImage').Jcrop({
                                onChange: setCoords,
                                onSelect: setCoords,
                                minSize: [175, 175],
                                maxSize: [175, 175]
                            });
                        }
                    }
                });
            });

            function setCoords(c) {
                x = c.x;
                y = c.y;
                w = c.w;
                h = c.h;
            };
        });
        function cropImage() {
            $.ajax({
                url: "/Media/CropImage",
                type: "POST",
                data: { x: x, y: y, w: w, h: h, Module: 1, rWidth: parseInt($('#imgUploadedImage').width()), rHeight: parseInt($('#imgUploadedImage').height()) },
                success: function (data) {
                    $('#lblMethodError').hide();
                    $.modal.close();
                    $("#youimg").attr("src", "../../Uploadify/ImageHandler.ashx?id=" + data + "&rnd=" + Math.random());
                    $('#imgurl').val($('#youimg').attr("src"));
                    $('#imgid').val(data);
                },
                error: function (xhr, status, error) {
                    $('#lblMethodError').text(xhr.responseText);
                    $('#lblMethodError').show();
                }
            });

        }
    </script>
    <script src="../../Scripts/ref/Signup/signup.js" type="text/javascript"></script>
    <input type="hidden" id="loadYammerMode" value="0" />
    
    <div class="sixteen wide column breadMenu">
         <div class="ui breadcrumb">
                <a href="../Common/Index">Home </a>> <a href="../SignUp/Register">Register</a>
         </div>
    </div>

    <div class="pageholder">
       
        <%--<h1>Sign up</h1>--%>
        <div class="signuptile">
            <div class="img">
                <img src="../../Images/signup-ico.png" width="64" height="62" alt="Sign up" />
            </div>
            <p>
                Sign up
            </p>
        </div>
        <input type="hidden" id="startupMode" value="0" />
        <div class="contenthold">
            <h1>Registration</h1>
            <h2>* All fields are mandatory</h2>
            <form name="register" id="register" action="" method="post">
                <div class="row">
                    <div class="col level">
                        Network name
                    </div>
                    <div class="col">
                        <input id="network" name="network" type="text" class="txtcol" />
                    </div>
                    <input name="imgurl" type="hidden" id="imgurl" value="../../Images/you-b.png" />
                    <input name="imgid" type="hidden" id="imgid" />
                    <div class="col">
                        <div class="errormsg" id="ntwork">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col level">
                            First name
                        </div>
                        <div class="col">
                            <input name="firstame" type="text" class="txtcol" id="regfname" />
                        </div>
                        <div class="col">
                            <div class="errormsg" id="FName">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col level">
                            Last name
                        </div>
                        <div class="col">
                            <input name="lastname" type="text" class="txtcol" id="reglname" />
                        </div>
                        <div class="col">
                            <div class="errormsg" id="LName">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col level">
                            Company name
                        </div>
                        <div class="col">
                            <input name="companyname" type="text" class="txtcol" />
                        </div>
                        <div class="col">
                            <div class="errormsg" id="CName">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col level">
                        Email address
                    </div>
                    <div class="col">
                        <input name="email" type="text" class="txtcol" id="email" />
                    </div>
                    <div class="col">
                        <div class="errormsg" id="emailid">
                            Should be your company specific Email address
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col level">
                        Country
                    </div>
                    <div class="col">
                        <select name="country" class="selectcol" id="country">
                        </select>
                    </div>
                    <div class="col">
                        <div class="errormsg" id="contryName">
                        </div>
                    </div>
                </div>
                <div class="row" id="password1">
                    <div class="col level">
                        Enter password
                    </div>
                    <div class="col">
                        <input name="pass" type="password" class="txtcol" />
                    </div>
                    <div class="col">
                        <div class="errormsg" id="password">
                        </div>
                    </div>
                </div>
                <div class="row" id="password2">
                    <div class="col level">
                        Confirm password
                    </div>
                    <div class="col">
                        <input name="confpass" type="password" class="txtcol" />
                    </div>
                    <div class="col">
                        <div class="errormsg" id="confpassword">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col level">
                        Authentication
                    </div>
                    <div class="col">
                        <div>
                            <input type="text" id="txtCaptcha" class="captcha_style" disabled="disabled" />
                            <input type="button" id="btnrefresh" class="captcha_btn" onclick="DrawCaptcha();" />
                        </div>
                    </div>
                    <div class="clr">
                    </div>
                </div>
                <div class="row">
                    <div class="col level">
                        &nbsp;
                    </div>
                    <div class="col">
                        <input name="" type="text" id="entCaptcha" class="txtcol" />
                    </div>
                    <div class="col">
                        <div class="errormsg" id="captcha">
                            Please enter text as seen in the image
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col level">
                        Upload your picture
                    </div>
                    <div class="col1 col">
                        <p>
                            <input type="button" value="Browse.." class="browse" id="btnuploadingimage" />
                        </p>
                        <p style="visibility: hidden">
                            Size limit : 2 MB
                        </p>
                    </div>
                    <div class="col">
                        <div class="photo">
                            <img src="../../Images/new/you-b.png" id="youimg" width="126" height="126" />
                        </div>
                    </div>
                </div>
                <div class="clr">
                </div>
                <div class="row">
                    <div class="col2 check">
                        <input id="opt_a" name="option" type="checkbox" value="opt_a">
                        <label for="opt_a">
                            <a href="/Signup/Terms" target="_blank">Terms of Services</a></label><br />
                        <input id="opt_b" name="option" type="checkbox" value="opt_b">
                        <label for="opt_b">
                            <a href="/Signup/Privacy" target="_blank">Privacy policy</a></label>
                    </div>
                    <div class="col">
                        <div class="errormsg" id="checkerr">
                        </div>
                    </div>
                    <div class="signupcol">
                        <input type="button" id="trialbtn" value="Next Step" class="signupbtn" onclick="javascript: validateandsubmit('trial');" />
                    </div>
                </div>
            </form>
        </div>
    </div>

    <%-- 
        
        


        
         --%>
    <div id="modalpopupUpload" style="display: none">
        <div class="browseright">
            <div class="browserightcont">
                <p>
                    Supported file formats - (.jpg, .png)
                </p>
                <p>
                    Maximum supported file size - 500KB
                </p>
                <p>
                    Maximum supported width/height - 500px
                </p>
                <div class="imgselection">
                    <img src="../../Images/right-img.png" /><p>
                        <span>Good image selection</span>
                    </p>
                </div>
                <div class="imgselection">
                    <img src="../../Images/bad-img.png" /><p>
                        <span>Bad image selection</span>
                    </p>
                </div>
            </div>
        </div>
        <div style="float: left">
            <input type="text" id="textupload" />
        </div>
        <div style="position: relative; float: left;" id="pnlUpload">
            <input type="button" id="btnUpload" value="Browse" />
            <div style="position: absolute; top: 4px; left: 3px;">
                <input id="signUpload" name="file_upload" type="file" />
            </div>
        </div>
        <div>
            <div id="pnlUploadedImage" style="display: none">
                <label id="lblMethodError" style="display: none">
                </label>
                <br />
                <img src="" id="imgUploadedImage" alt="Uploaded Image" />
                <%--<input type="button" id="btnCrop" onclick="cropImage();" value="Crop Image" />--%>
            </div>
            <div id="pnlNewImage" style="display: none">
                <input type="button" id="btnsave" value="save" />
                <img src="" id="imgNewImage" alt="Image" />
            </div>
            <div class="croptxt" style="display: none">
                <input type="button" id="btnCrop" onclick="cropImage();" value="Crop Image" />
                <div class="cropmsg">Click on the image and drag box to choose the area of your picture.</div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        DrawCaptcha();
    </script>
</asp:Content>