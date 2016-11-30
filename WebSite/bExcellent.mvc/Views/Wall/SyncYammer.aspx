<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Wall
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/themes/default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/ref/editor/jquery.sceditor.min.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/wall.js" type="text/javascript"></script>
    <link href="../../Styles/wall.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/ref/Wall/yammersync.js" type="text/javascript"></script>
    <div class="poepopupbg">
    </div>
    <div class="poepopup">
        <div class="poepopuphd">
            <div class="close">
            </div>
        </div>
        <div class="poepopupcont">
            <div class="level">
                To</div>
            <div>
                <input name="" type="text" class="txtbx" /><div class="mailattach">
                    <input name="" type="file" /><img src="../../Images/mail_attachment.png" alt="Attach" /></div>
            </div>
            <div class="clr">
            </div>
            <img src="../../Images/txtbx.png" class="comntbx" />
            <input name="" type="button" value="Reply" class="signupbtn reply" />
        </div>
    </div>
    <div class="pageholder">
        <div class="breadcrumb">
            Home > Start > Wall</div>
        <div class="customertiles wall">
            <h1 class="wall1">
                Wall
            </h1>
            <h1 class="wall2">
                Send Appreciation
            </h1>
            <h1 class="wall3">
                Post a Video Message
            </h1>
            <h1 class="wall4">
                Sync with Yammer
            </h1>
            <ul>
                <li class="selected rectangle" id="walltile"><a class="firstp" href="/wall/index">
                    <img src="../../Images/icons/wall.png" />
                    <p>
                        Wall</p>
                </a></li>
                <li id="sa" class="rectangle"><a class="firstp" href="/wall/PostAppreciation">
                    <img src="../../Images/icons/send-app-cmnt.png" />
                    <p>
                        Send Appreciation / Post a Comment</p>
                </a></li>
                <li id="postvmsgtile"><a href="/wall/PostVideos">
                    <img src="../../Images/icons/post-video.png" />
                    <p>
                        Post a video message</p>
                </a></li>
                <li id="syncyammer"><a class="firstp" href="/wall/SyncYammer">
                    <img src="../../Images/icons/yammer-w.png" />
                    <p>
                        Sync with Yammer
                    </p>
                </a></li>
            </ul>
        </div>
        <div>
            .<div id="embedded-feed" style="width: 1000px; padding-top: 10px; margin-top: 35px;
                padding-left: 50px; float: left; height: 580px">
            </div>
        </div>
    </div>
</asp:Content>
