<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Sync
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/Sync/digdeeper.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/ref/Sync/Sync.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Sync/digdeeper.js" type="text/javascript"></script>

    <input type="hidden" id="Type" />
    <input type="hidden" id="moreDigDeeper" value="0" />
    <input type="hidden" id="types" value="0" />
    <div class="indexright">
        <div class="indexrightarrow">
            <div class="indexclose">
                <span></span>
            </div>
        </div>
        <div class="indexrightclose">
            <span></span>
        </div>
        <div class="indexrightclose1">
            <span></span>
        </div>
        <div class="helpcontent">
            <h1>Definitions</h1>
            <div class="hlprow">
                <div class="hlpheading">Date</div>
                <div class="hlpcont">The origination date for the goal</div>
            </div>
            <div class="hlprow">
                <div class="hlpheading">Goal</div>
                <div class="hlpcont">Automatically generated as a “4”. Indicating the required skills are “Always” applied</div>
            </div>
            <div class="hlprow">
                <div class="hlpheading">Goal Timeline</div>
                <div class="hlpcont">The timeline set to achieve the goal; 0, 6, 12 or 24 months</div>
            </div>
            <div class="hlprow">
                <div class="hlpheading">Goal Progress</div>
                <div class="hlpcont">Progress made towards achieving a goal as indicated by feedback from the network</div>
            </div>
            <div class="hlprow">
                <div class="hlpheading">Goal Gap</div>
                <div class="hlpcont">The rating gap between the goal and goal progress</div>
            </div>
            <div class="hlprow">
                <div class="hlpheading">Timeline Gap</div>
                <div class="hlpcont">Light arrows illuminate time left to achieve a goal. Dark arrows illuminate goals that are overdue</div>
            </div>
        </div>
    </div>
    <div class="pageholder">
        <div class="breadcrumb">
            Home > Sync
        </div>
        <h1>Track Goals</h1>
        <div class="stand standlaning">
            <div class="scroll1">
                <ul id="userList">
                </ul>
            </div>
        </div>
        <div class="digdeeper">
            <div class="digrow">
                <div class="digcol firstcol digrowhd">
                    Practice Areas
                </div>
                <div class="digcol secondcol digrowhd">
                    Excellence Actions
                </div>
                <div class="digcol thirdcol digrowhd">
                    Goal Date
                </div>
                <div class="digcol forthcol digrowhd">
                    Goal
                </div>
                <div class="digcol sixthcol fisrtsixthcol digrowhd">
                    Goal Timeline
                </div>
                <div class="digcol fifthcol digrowhd">
                    Goal Progress
                    <div class="picholder">
                        <abbr id="myusrname">
                            <img src="../../Images/user.png" id="myphtsync" width="34" height="34" /></abbr>
                    </div>
                    <div class="picholder1">
                        <abbr id="Usernames">
                            <img src="../../Images/user.png" id="userphtsync" width="34" height="34" /></abbr>
                    </div>
                </div>
                <div class="digcol seventhcol digrowhd">
                    Goal Gap
                </div>
                <div class="digcol sixthcol digrowhd">
                    Timeline Gap
                </div>
            </div>
            <div class="scroll2">
                <div class="deepertable" id="digdeepcontnet">
                    <!--Scroller-->
                </div>
            </div>
        </div>
    </div>
</asp:Content>