<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Feedback
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/feedback/connect.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/themes/default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/ref/editor/jquery.sceditor.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Feedback/connectlanding.js" type="text/javascript"></script>
    <div class="pageholder">
        <div class="vs-context-menu">
            <div class="connectpopup">
                <form action="/Feedback/ConnectPost" id="PostComments" enctype="multipart/form-data">
                    <textarea name="bbcode_field" style="height: 100px; width: 270px;" id="txtareas">
                        </textarea>
                    <input name="" type="button" value="Send" class="btn" id="submitbtn" />
                    <input type="hidden" name="useridslist" id="useridslist" />
                    <input type="hidden" name="subject" id="subject" />
                    <input type="hidden" name="comments" id="comments" />
                    <input type="hidden" name="moduleid" id="moduleid" value="0" />
                </form>
            </div>
        </div>
        <div class="breadcrumb">
            <a href="../Common/Index">Home </a>>  <a href="../Feedback/Feedback">Feedback</a>  > Connect
        </div>
        <div id="aboutContent" class="customertiles">
            <h1>Connect
            </h1>
            <div id="hiddenValues">
                <input type="hidden" id="selectedpoe" />
            </div>
            <div class="scroll4">
            <ul id="poemodule">
            </ul>
                </div>
        </div>
        <div class="contentholder">
            <div class="connect">
                <h1 id="connecttext"></h1>
                <p id="connectDescriptionText">
                    The following people have been recognized for their high performance in this practice
                    area and have indicated they are open to connecting into a conversation to share
                    knowledge and best practices
                </p>
                <div class="scroll1">
                    <ul id="userslist">
                    </ul>
                </div>
                <div class="connectbutton" id="RedirectToSync">Review Results</div>
            </div>
        </div>
    </div>
</asp:Content>