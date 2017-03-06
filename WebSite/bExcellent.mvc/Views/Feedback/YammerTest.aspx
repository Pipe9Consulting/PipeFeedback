<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - YammerTest
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="https://assets.yammer.com/assets/platform_js_sdk.js"></script>
<script type="text/javascript" src="https://assets.yammer.com/assets/platform_embed.js"></script>
<span id="yammer-login"></span>
     <div id="embedded-feed" style="height:400px;width:500px;"></div>
<script>
    
    $(document).ready(function () {
        yam.platform.setAuthToken('7cqeq4VBrZaH1A9bnM4qzQ');
        yam.platform.getLoginStatus(
               function (response) {
                   alert(response.status);
               });
        yam.connect.embedFeed({
            container: '#embedded-feed',
            network: 'tillidsoft.com'
        });
        function alertme() {
            alert('logged');
        }
        yam.on('/embed/feed/loadingCompleted', alertme, '');
        
    });
</script>
   <%-- <div>
        <%:Html.Raw(ViewBag.html) %>
    </div>--%>
    
</asp:Content>

