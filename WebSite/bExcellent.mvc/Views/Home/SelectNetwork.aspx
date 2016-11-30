<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    SelectNetwork
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script language="javascript" type="text/javascript" src="../../Scripts/ref/Account/SelectNetwork.js"></script>
    <link href="../../Styles/Feedback_landing.css" rel="stylesheet" type="text/css" />


    <div class="feedbackmain" id="maindiv">
        <div class="pageholder">
            <div class="breadcrumb">
                Home > Select Network</div>
                
            <div class="fbarea">
                <h1>
                    Select Network
                           </h1>
                <ul id="usersub" class="selectnt">
                   
                </ul>
                
            </div>
        </div>
    </div>
</asp:Content>
