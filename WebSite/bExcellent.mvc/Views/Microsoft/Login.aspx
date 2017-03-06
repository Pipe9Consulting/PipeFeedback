<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/SignUp.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Sign In
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../../Scripts/ref/Account/Login.js"></script>
    <link href="../../Styles/Home/login.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/basic.css" rel="stylesheet" />
    <link href="../../Styles/KessakuStyles/poe.css" rel="stylesheet" />
    <script type="text/javascript">
        //        popup window for changepassword and frogetpassword///
        $(document).ready(function () {
            document.cookie = "Showzoom=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            $('.afterlogin').hide();
            $('.checkt').hide();
            $('#beforeLogin').hide();
            var targetHtml = " <li data-value='homeAct'><a href='../#CloudAsCoach?slice=9'><span class='footermenu7'></span> <p>Home</p> " +
                "</a></li> <li data-value='cloudasHdr'><a href='../#CloudAsCoach?slice=1'><span class='footermenu1'></span>" +
                " <p>Cloud as Coach</p> </a></li> <li data-value='cloudSolnHdr'><a href='../#CloudAsCoach?slice=2'><span class='footermenu2'></span>" +
                " <p>Cloud Solutions</p> </a></li> <li data-value='ResourcesHdr'><a href='../#CloudAsCoach?slice=3'><span class='footermenu3'></span> " +
                "<p>Resources</p> </a></li> <li data-value='pricingHdr'><a href='../#CloudAsCoach?slice=7'><span class='footermenu4'></span>" +
                " <p>Pricing</p> </a></li> <li data-value='reqDemoHdr'><a href='../#CloudAsCoach?slice=8'><span class='footermenu5'></span> " +
                "<p>Request a Demo</p> </a></li> <li data-value=''><a href='../Home/Login'><span class='footermenu6'></span> <p>Members</p> </a></li>";
            $('#target').html(targetHtml);
            $('.bukatutup').hide();
            $('#emailid').focus();
            $('#yammerClick').click(function () {
                window.location = "/Yammer/getYammer";
            });
            $('#signUpUser').click(function () {
                window.location.href = "../SignUp/Register";
            });
        });
    </script>

    <style>
        .loginscreenleft {
            width: 37%;
            float: left;
            margin-right: 3%;
            margin-left: 31.4%;
            margin-top: 10.1%;
        }

        @media screen and (max-width: 2600px) and (min-width: 2201px) {
            .loginscreen h1 {
                font-size: 400%;
            }
        }


        @media screen and (max-width: 2000px) and (min-width: 1701px) {
            .loginscreenleft {
                margin-left: 31.3%;
                margin-top: 9%;
            }
        }


        @media screen and (max-width: 1700px) and (min-width: 1501px) {
            .loginscreenleft {
                margin-left: 31.3%;
                margin-top: 6.8%;
            }


            .loginscreen h1 {
                font-size: 300%;
            }
        }

        @media screen and (max-width: 1500px) and (min-width: 1201px) {
            .loginscreen h1 {
                font-size: 250%;
            }

            .loginscreenleft {
                margin-left: 31.2%;
                margin-top: 6%;
            }
        }
    </style>
    <body>
        <div class="popupbg">
            &nbsp; 
        </div>
        <%--  <div class="sixteen wide column breadMenu">
            <div class="ui breadcrumb">
                <a href="/">Home </a>> <a href="../Home/Login">Login</a>
            </div>
        </div>--%>
        <div class="log">
            <div class="pageholder">
                <!-- <img id="prevdv" class="prevbtn" src="../../Images/prev_arrow.png" onclick="Javascript:login.loadhomepage();" />-->
                <%--<div id="tiles">
                   
                    <div class="tileview">
                        
                        <ul>
                            <li><a href="#" class="quickanddetailbig">
                                <div class="loginico">
                                    <img src="../../Images/icons/login-w.png" alt="Login" />
                                </div>
                                <p>
                                    Login
                                </p>
                            </a></li>
                        </ul>
                    </div>
                </div>--%>
                <div class="loginscreen">
                    <%--  <h1>Login to discover your Role Excellence Profile standing and learn how to do excellent
                        work, fast
                    </h1>--%>
                    <div class="loginscreenleft">
                        <form method="POST" action="/Microsoft/Login">
                            <%: Html.AntiForgeryToken() %>
                            <h1>Sign In</h1>
                            <p>
                                Email
                            </p>
                            <p>
                                <% var t = "";
                                   var p = "";%>
                                <%if (ViewBag.username != null)
                                  {
                                      t = ViewBag.username;
                                      p = ViewBag.password;
                                  } %>
                                <input type="text" name="emailid" class="txtarea" id="emailid" value="<%:t%>" />
                            </p>
                            <p>
                                Password
                            </p>
                            <p>
                                <input type="password" name="password" value="<%:p%>" class="txtarea" id="password" />
                            </p>
                            <ul>
                                <li>
                                    <p id="forgetpassword">
                                        Forgot Password?
                                    </p>


                                    <div class="check" id="checkterms">
                                        <%if (ViewBag.show == 1)
                                          {%>
                                        <% Session["click"] = 1; %>
                                        <input type="checkbox" name="option" id="opt_a">
                                        <label for="opt_a">
                                            <a target="_blank" href="/Home/TermsCondition">
                                                <p>Please read and accept Program Definitions</p>
                                            </a>
                                        </label>
                                        <% } %>
                                        <p class="errormsg"><%:ViewBag.errormsg%></p>
                                    </div>
                                    <input type="submit" class="btn" value="Sign In" />
                                </li>
                                <%--<li><a href="/Yammer/getYammer">Yammer</a></li>--%>
                                <li>

                                    <%--<div class="newuser" style="padding: 2% 0 0; margin: 0">
                                        New User? <span class="mark"><a href="../../Signup/Register">Signup</a>
                                        </span>
                                    </div>--%>
                                </li>
                            </ul>
                        </form>
                    </div>
                    <div class="loginrightpanel" style="display: none;">
                        <%--<div class="yammerlogin" id="yammerClick">
                            <div class="yammerloginpic">
                                <img src="../../Images/yammer-tile-pic.png" />
                            </div>
                            <div class="yammersmallpic">
                                <img src="../../Images/icons/yammer-w.png" />
                            </div>
                            <p>
                                Login using Yammer
                            </p>
                        </div>
                        <div class="newuser">
                            New User? <span class="mark"><a href="/Yammer/getYammer">Signup using Yammer</a></span>
                        </div>
                    </div>--%>

                        <h1>SIGN UP</h1>
                        <p>
                            Signing up to <strong>Cloud as Coach </strong>enables you to access <strong>excellence profiles</strong>, build your <strong>network</strong>, and begin 
receiving <strong>feedback</strong>. Get started on your <strong>journey to excellence</strong>!
                        </p>

                        <div class="signUp">
                            <div class="individuals">

                                <h2>Cloud as Coach for Individuals</h2>
                                <ul>
                                    <li>Select from our library of excellence profiles</li>
                                    <li>Build your feedback network</li>
                                    <li>Complete self-feedback and receive feedback from your network</li>
                                    <li>Analyze your results to identify development priorities</li>
                                    <li>Set goals and track your progress</li>


                                </ul>
                            </div>
                            <div class="managers">
                                <h2>Cloud as Coach for Managers</h2>
                                <ul>
                                    <li>Select from our library of excellence profiles</li>
                                    <li>Invite your team members to join your network</li>
                                    <li>Give feedback to your team and request self-feedback</li>
                                    <li>Analyze results and identify development opportunities</li>
                                    <li>Set goals for your team members and track their progress</li>
                                    <li>Improve coaching and ramp up development</li>
                                </ul>

                            </div>

                        </div>
                        <div style="clear: both;"></div>

                        <div>

                            <input type="submit" class="btn" value="Sign Up" id="signUpUser" />

                            <p>OR</p>

                            <a href="#">Sign up using Yammer</a>
                        </div>

                    </div>

                    <%--Forgrt Password content--%>
                    <div id="basic-forgetPassword" style="display: none; position: absolute;">
                        <div class="close">
                        </div>
                        <h1>Forgot your password?</h1>
                        <p style="margin-top: 5px;">
                            Please enter the required information below and we will send you a password reminder email.
                        </p>
                        <p class="origin">
                            Enter your email
                        </p>
                        <input type="text" id="txtforgetmail" class="textspace" />
                        <label class="errormsg" id="findid">
                        </label>
                        <br />
                        <div style="margin: 20px 0 0 0;">
                            <input type="text" id="txtCaptcha" class="captcha_style" style="float: left;" />
                            <input type="button" id="btnrefresh" class="captcha_btn" onclick="DrawCaptcha();" />
                        </div>
                        <div style="clear: both"></div>
                        <p class="origin">
                            Enter the security code above
                        </p>
                        <input type="text" id="txtInput" class="textspace" />
                        <label class="errormsg" id="captchatext">
                        </label>
                        <br />
                        <input type="button" id="resetbtn" value="Send My Password" class="origin" />
                        <br />
                    </div>
                    <form id="updateform" action="/Home/updateuserdetails">
                        <div id="basic-changePassword" style="display: none;" class="simplemodal-data">
                            <div class="close">
                            </div>
                            <h1>Change Password</h1>
                            <p>
                                Please fill-in the details below
                            </p>
                            <p class="origin">
                                Email id
                            </p>
                            <input type="text" id="txtemailid" class="textspace" />
                            <br />
                            <p class="origin">
                                Current Password
                            </p>
                            <input type="password" id="curpassword" class="textspace" />
                            <br />
                            <p class="origin">
                                New Password
                            </p>
                            <input type="password" id="newpassword" class="textspace" />
                            <br />
                            <p class="origin">
                                Confirm New Password
                            </p>
                            <input type="password" id="Confirmpassword" class="textspace" />
                            <br />
                            <input type="button" id="ChangePassbtn" value="Submit" class="origin" />
                            <label class="errormsg" id="UpdatemailLbl">
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </body>
</asp:Content>
