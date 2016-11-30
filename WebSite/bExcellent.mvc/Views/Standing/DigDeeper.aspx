<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Standing
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Standing/excellenceIndicator.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Standing/digdeeper.js" type="text/javascript"></script>
    <input type="hidden" id="controlclicked" value="0" />
    <div class="indexright">
        <div class="indexrightarrow">
            <div class="indexclose">
                <span></span>
            </div>
        </div>
        <div class="indexrightclose">
            <span></span>
        </div>
        <table id="bigpicPoeContent">
            <tr>
                <td>
                    <img class="diginimg" src="../../Images/chart/tick.png" />
                </td>
                <td>Improvement
                </td>
            </tr>
            <tr>
                <td>
                    <img class="diginimg" src="../../Images/chart/exclamation.png" />
                </td>
                <td>No Change
                </td>
            </tr>
            <tr>
                <td>
                    <img class="diginimg" src="../../Images/chart/cross.png" />
                </td>
                <td>Decline
                </td>
            </tr>
        </table>
    </div>
    <div class="pageholder">
        <input type="hidden" id="selectedpoeDigdeep" />
        <div class="breadcrumb">
            <a href="../Common/Index">Home </a>> <a href="../Standing/Standing">Standing </a>
            > Excellence Actions
        </div>
        <div class="stand">
            <h1>Excellence Actions</h1>
            <div class="scroll1">
                <ul id="stndmenu">
                </ul>
            </div>
        </div>
        <div id="stndcontnetholder">
        </div>
    </div>
</asp:Content>