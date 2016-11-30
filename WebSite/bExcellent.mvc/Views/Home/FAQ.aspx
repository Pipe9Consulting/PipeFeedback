<%@ Page Title="" Language="C#" MasterPageFile="../Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    FAQ
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../../Scripts/ref/Account/Login.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>

    <div class="pageholder">
        <img id="prevdv" class="prevbtn" src="../../Images/prev_arrow.png" onclick="Javascript:login.loadhomepage();" />
        <div id="tiles">
            <div class="breadcrumb">
                Home > FAQ</div>
            <div class="tileview">
                <div class="faqhd">
                    <h1>
                        Frequently Asked Questions</h1>
                </div>
                <ul>
                    <li><a href="#" class="quickanddetailbig">
                        <h3>
                            <img src="../../Images/faq.png" alt="Login" /></h3>
                        FAQ</a> </li>
                    <p class="note">
                        <%-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies semper
                        pulvinar.--%>
                    </p>
                    <p class="note">
                        <%-- Lorem ipsum dolor sit amet, consectetur adipiscing elit--%></p>
                </ul>
            </div>
        </div>
        <div class="loginscreen">
            <div id="accordion">
               
            </div>
        </div>
    </div>
</asp:Content>
