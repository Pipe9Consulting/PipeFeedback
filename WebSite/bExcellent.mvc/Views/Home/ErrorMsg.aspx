<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/SignUp.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Error
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <style>
        .errorms
        {
            color: #808080;
            text-align: center;
            margin: 20% auto 0;
            width: 30%;
            background: #efefef;
            padding: 5%;
        }
    </style>
    <div class="errorms">
      <div>  <h1>An error has occurred</h1></div>
    <%= ViewBag.Error%>
    </div>
</asp:Content>