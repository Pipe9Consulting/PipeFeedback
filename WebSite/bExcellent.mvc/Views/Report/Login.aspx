<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/report.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    Login
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Microsoft/login.css" rel="stylesheet" type="text/css" />
    <style>
        .login
        {
            display: none;
        }
    </style>
    <div class="loginbackground"></div>
    <div class="pageholder">
       <%-- <img src="../../Images/Feedback/menuSelect_arrow.png" />--%>
        <div class="breadcrumb">Home > Reports Login</div>
        <div class="tileview">
            <h1>Reports Login</h1>
            <ul>
                <li><a href="#" class="quickanddetailbig">
                    <div class="loginico">
                        <img src="../../Images/icons/ms-login.png" alt="Login" />
                    </div>
                    <p>
                        Reports Login
                    </p>
                </a></li>
            </ul>
        </div>

        <form id="loggedAdmin" method="POST" action="/Report/ReportLogin">
            <div class="loginscreenleft">
                <p>
                    email
                </p>
                <p>
                    <input type="text" id="usrmailids" name="usrmailids" class="txtarea" />
                </p>
                <p>
                    password
                </p>
                <p>
                    <input type="password" id="usrpassword" name="usrpassword" class="txtarea" />
                </p>
                <ul>
                    <li style="visibility: hidden">
                         <p id="forgetpassword">
                            Forgot password?
                        </p>
                        <p id="changingPassword">
                            Change Password
                        </p>
                    </li>
                    <li>
                        <input type="submit" id="btnLogin" value="Submit" />
                    </li>
                </ul>
                <%if (ViewBag.errormsg != null)
                  { %>
                <div class="errormsg"><%: ViewBag.errormsg %></div>
                <% } %>
            </div>
        </form>
    </div>
</asp:Content>