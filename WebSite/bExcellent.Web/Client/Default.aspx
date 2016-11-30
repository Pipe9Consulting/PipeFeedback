<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="bExcellent.Web.Client.Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Home page</title>
    <link rel="Stylesheet" type="text/css" href="../Styles/fonts/fonts.css" />
    <link rel="Stylesheet" type="text/css" href="../Styles/themes/default/client.css" />
    <link rel="Stylesheet" type="text/css" href="../Styles/common.css" />
</head>
<body>
    <form id="form1" runat="server">
    <div id="overlay" style="display: none">
        <%--<div id="ajax-spinner"></div>--%></div>
    <div id="wrapper">
        <div id="header">
            <div id="ajax-loaded" style="display: none">
            </div>
            <div id="logo">
                <span class="yellow">maxi</span><span class="white">poe.com</span></div>
            <div id="logo-seperator">
                <img src="../images/headder_logo_seperator.png" alt="" /></div>
            <div id="menu-button" class="down-arrow">
            </div>
            <div id="middle-bar">
                <%--<table cellpadding="2" cellspacing="2">
                    <tr>
                        <td><select class="select-top"><option>Territory</option></select></td>
                        <td><select class="select-top"><option>Latam</option></select></td>
                        <td><select class="select-top"><option>France</option></select></td>
                        <td><select class="select-top"><option>West</option></select></td>
                        <td><select class="select-top"><option>Manager2</option></select></td>
                    </tr>
                </table>--%>
            </div>
            <div id="profile">
                <div id="profile-image">
                    <img src="../images/profile_photo.png" alt="" /></div>
                <div id="profile-name">
                    <div class="normal white">
                        <asp:Label ID="fullname" runat="server"></asp:Label></div>
                    <div id="profile-arrow" class="down-arrow">
                    </div>
                </div>
            </div>
        </div>
        <div id="menu" style="display: none">
            <div id="top-wcsi-index-view" class="wcsi-button">
                <div class="menu-button-small-image wcsi-button-image">
                </div>
                <div class="menu-button-text">
                    WCSI View</div>
            </div>
            <div id="top-strengths-view" class="strength-button">
                <div class="menu-button-small-image strength-button-image">
                </div>
                <div class="menu-button-text">
                    Strengths View</div>
            </div>
            <div id="top-improvements-view" class="improvement-button">
                <div class="menu-button-small-image improvement-button-image">
                </div>
                <div class="menu-button-text">
                    Improvements View</div>
            </div>
            <div id="top-matrix-view" class="matrix-button">
                <div class="menu-button-small-image matrix-button-image">
                </div>
                <div class="menu-button-text">
                    Matrix View</div>
            </div>
        </div>
        <div id="profile-menu" style="display: none">
            <ul>
                <li class='my-account-button-image'><a id='my-account'>My Account</a> </li>
                <li class='signout-button-image'><a id='sign-out'>Sign out</a> </li>
            </ul>
        </div>
        <div id="contents">
        </div>
        <div id="bottom-menu" style="display: none">
        </div>
        <div id="footer">
            <div id="copyright">
                &copy 2012 maxipoe.com</div>
            <div id="btn-all-menu" style="display: none">
                <img src="../images/icons/shortcut.png" alt="All Menu" width="29" height="27" style="vertical-align: middle" />&nbsp;MENU</div>
        </div>
        <div id="hiddenValues" style="visibility: hidden">
            <div id="userid" runat="server" style="visibility: hidden">
            </div>
            <div id="selectedpoe" runat="server" style="visibility: hidden">
            </div>
            <div id="createdFeedbacks" runat="server" style="visibility: hidden">
            </div>
        </div>
    </div>
    </form>
    <%-- <script type="text/javascript" src="../Scripts/ref/mootools12_all_p.js"></script>
    <script type="text/javascript" src="../Scripts/ref/slider.js"></script>--%>
    <script language="javascript" type="text/javascript" src="../Scripts/ref/jquery-1.8.3.js"></script>
    <script language="javascript" type="text/javascript" src="../Scripts/plugin/jquery/jquery-1.8.2.min.js"></script>
    <script language="javascript" type="text/javascript" src="../Scripts/plugin/underscore/underscore-min.js"></script>
    <script language="javascript" type="text/javascript" src="../Scripts/plugin/handlebars/handlebars-1.0.js"></script>
    <script language="javascript" type="text/javascript" src="../Scripts/ref/common.js"></script>
    <script language="javascript" type="text/javascript" src="../Scripts/ref/menu.js"></script>
    <script language="javascript" type="text/javascript" src="../Scripts/ref/poe.js"></script>
    <script language="javascript" type="text/javascript" src="../Scripts/ref/wcsi.js"></script>
    <script language="javascript" type="text/javascript" src="../Scripts/ref/page.js"></script>
    <script language="javascript" type="text/javascript" src="../Scripts/ref/Namespace.js"></script>
    <script language="javascript" type="text/javascript" src="../Scripts/ref/Requests.js"></script>
    <%--<script language="javascript" type="text/javascript" src="../Scripts/ref/feedback.js"></script>--%>
    <script src="../Scripts/plugin/jquery/jquery-1.8.2.min.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript" src="../Scripts/jquery-1.5.1.min.js"></script>
    <script language="javascript" type="text/javascript" src="../Scripts/jquery.jqChart.min.js"></script>
    <script language="javascript" type="text/javascript" src="../Scripts/jquery.jqRangeSlider.min.js"></script>
    <script language="javascript" type="text/javascript" src="../Scripts/ref/jquery-ui.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>
</body>
</html>
