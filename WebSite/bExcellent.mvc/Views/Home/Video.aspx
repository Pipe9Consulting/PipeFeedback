<%@ Page Title="" Language="C#" MasterPageFile="../Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Video
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../../Scripts/ref/Account/Login.js" type="text/javascript"></script>
    <div class="pageholder">
        <img id="prevdv" class="prevbtn" src="../../Images/prev_arrow.png" onclick="Javascript:login.loadhomepage();" />
        <div id="tiles">
            <div class="breadcrumb">
                Home > Video
            </div>
            <div class="tileview">
                <div class="faqhd">
                    <h1>Video</h1>
                </div>
                <ul>
                    <li><a href="#" class="quickanddetailbig">
                        <h3>
                            <img src="../../Images/icons/video.png" alt="Login" /></h3>
                        Video</a> </li>
                    <p class="note">
                        Ensure you are doing excellent work by Inserting the Role Excellence Profile into the work you do everyday
                    </p>
                </ul>
            </div>
        </div>
        <div class="loginscreen videoscreen">
            <h1>Title of the Video</h1>
            <div id="Video">
                <img id="Img1" src="../../Images/video-big.png" alt="video" />
            </div>
            <div class="videolist">
                <ul>
                    <li>
                        <h2>Title of the Video goes here1</h2>
                        <img id="v1" src="../../Images/video-thumb.png" alt="video" /></li>
                    <li>
                        <h2>Title of the Video goes here2</h2>
                        <img id="v2" src="../../Images/video-thumb.png" alt="video" /></li>
                    <li>
                        <h2>Title of the Video goes here3</h2>
                        <img id="v3" src="../../Images/video-thumb.png" alt="video" /></li>
                </ul>
            </div>
        </div>
    </div>
</asp:Content>