<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/EmptyPage.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="EmptyPages" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="../../Scripts/ref/jquery-1.8.3.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var hash = window.location.hash.slice(1);
            var accestoken = hash.split('=');
            window.location.href = "../Yammer/GetYammerVal?access_token=" + accestoken[1];
        });
    </script>
</asp:Content>