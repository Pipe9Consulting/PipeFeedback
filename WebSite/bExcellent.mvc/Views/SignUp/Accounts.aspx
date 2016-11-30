<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Accounts
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/signup/accounts.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>

    <style type="text/css">
        .accordion h3, .bukatutup, .login
        {
            display: block;
        }
    </style>
    <script src="../../Scripts/ref/Account/accounts.js" type="text/javascript"></script>
    <div class="pageholder">
        <div class="breadcrumb">
            <a href="../Common/Index">Home </a>> Account
        </div>
        <h1>Account</h1>
        <div class="signuptile">
            <div class="img">
                <img src="../../Images/signup-ico.png" width="64" height="62" alt="Sign up" />
            </div>
            <p>
                Account
            </p>
        </div>
        <div class="contenthold accounts">
            <div class="clr">
            </div>
            <div class="scroll1">
                <div class="urAccounts" id="accountdata">
                </div>
            </div>
            <div class="clr">
            </div>
            <div class="accounthd1">
                <table>
                    <tr>
                        <td>&nbsp;
                        </td>
                        <td>&nbsp;
                        </td>
                        <td>&nbsp;
                        </td>
                        <td class="totl" id="totalCost">Total $720.00
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" class="printtd" id="printPage">
                            <img src="../../Images/icons/print.png" /><div>
                                Print
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</asp:Content>