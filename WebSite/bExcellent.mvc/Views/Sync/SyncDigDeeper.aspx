<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Sync
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/Sync.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/ref/Sync/Sync.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Sync/syncdigdeeper.js" type="text/javascript"></script>
    <div class="pageholder">
        <div class="breadcrumb">
            Home > Sync
        </div>
        <div class="stand standlaning">
            <h1>Track Goals</h1>
            <ul id="userList">
            </ul>
        </div>
        <div class="digdeeper">
            <div class="digrow">
                <div class="digcol firstcol digrowhd">
                    <p>
                        Practice Area
                    </p>
                </div>
                <div class="digcol secondcol digrowhd">
                    <p>
                        Excellence Action
                    </p>
                </div>
                <div class="digcol thirdcol digrowhd">
                    <p>
                        Goal Date
                    </p>
                </div>
                <div class="digcol forthcol digrowhd">
                    <p>
                        Goal
                    </p>
                </div>
                <div class="digcol sixthcol fisrtsixthcol digrowhd">
                    <p>
                        Goal Timeline
                    </p>
                </div>
                <div class="digcol fifthcol digrowhd">
                    <p>
                        Goal Progress
                    </p>
                    <div class="picholder">
                        <img src="../../Images/user.png" id="myphtsync" width="34" height="34" />
                    </div>
                    <div class="picholder1">
                        <img src="../../Images/user.png" id="userphtsync" width="34" height="34" />
                    </div>
                </div>
                <div class="digcol seventhcol digrowhd">
                    <p>
                        Goal Gap
                    </p>
                </div>
                <div class="digcol sixthcol digrowhd">
                    <p>
                        Timeline Gap
                    </p>
                </div>
            </div>
            <div class="deepertable" id="digdeepcontnet">
            </div>
        </div>
    </div>
</asp:Content>