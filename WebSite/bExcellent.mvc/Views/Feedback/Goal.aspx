<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Sync
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link type="text/css" href="../../Styles/feedback/slider.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Sync/setGoals.css" rel="stylesheet" type="text/css" />
    <script src="https://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Feedback/goalslider.js" type="text/javascript"></script>

    <script src="../../Scripts/ref/Feedback/goal.js" type="text/javascript"></script>
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
            <div class="hlprow">
                <%--<div class="hlpheading">Lorem ipsum dolor</div>--%><div class="hlpcont">Drag the scale to set your goal.</div>
            </div>
            <div class="hlprow">
                <div class="hlpcont">Click on the 'Assign' icon and choose a person to whom you want to assign a goal.</div>
            </div>

            <div class="hlprow">
                <div class="hlpcont">After you have set and assigned goals, click 'Share'.</div>
            </div>
            <div class="hlprow">
                <div class="hlpcont">You can track your goals from the 'Track Goals' page.</div>
            </div>
        </div>
    </div>
    <div class="pageholder">
        <div class="poepopupbg">
        </div>
        <div class="popup">
            <div class="poepopuphd">
                <div class="close">
                </div>
            </div>
            <div class="popupcontent" id="popupcontent">
                Your goals have been shared with everyone you have assigned
            </div>
        </div>
        <div class="breadcrumb">
            <a href="../Common/Index">Home </a>> <a href="../Feedback/Feedback">Feedback</a>  > Goals
        </div>
        <div class="goal">
            <input type="hidden" id="selectedmodule" />
            <input type="hidden" id="selectedgoal" />
            <input type="hidden" id="selectedques" />
            <h1>Goals</h1>
            <h2>Practice Areas</h2>
            <div class="scroll1">
                <ul id="poemodule">
                </ul>
            </div>
        </div>
        <div class="goal" id="excell">
            <h1>&nbsp;</h1>
            <h2>Excellence Actions</h2>
            <%--<div class="scroll2">

                <ul id="modquestionlist" class='modquestionlist'>
                    <li id="EI1" class="eilist select">
                        <div class="number">
                            1
                        </div>
                        <p>
                            CA Lead achieves YoU increases in customer and partner satisfaction.
                        </p>
                    </li>
                    <li id="EI2" class="eilist">
                        <div class="number">
                            2
                        </div>
                        <p>
                            CA Lead achieves YoU increases in customer and partner satisfaction.
                        </p>
                    </li>
                    <li id="EI3" class="eilist">
                        <div class="number">
                            3
                        </div>
                        <p>
                            CA Lead achieves YoU increases in customer and partner satisfaction.
                        </p>
                    </li>
                    <li id="EI4" class="eilist">
                        <div class="number">
                            4
                        </div>
                        <p>
                            CA Lead achieves YoU increases in customer and partner satisfaction.
                        </p>
                    </li>
                    <li id="EI5" class="eilist">
                        <div class="number">
                            5
                        </div>
                        <p>
                            CA Lead achieves YoU increases in customer and partner satisfaction.
                        </p>
                    </li>
                    <li id="EI6" class="eilist">
                        <div class="number">
                            5
                        </div>
                        <p>
                            CA Lead achieves YoU increases in customer and partner satisfaction.
                        </p>
                    </li>
                    <li id="EI7" class="eilist">
                        <div class="number">
                            5
                        </div>
                        <p>
                            CA Lead achieves YoU increases in customer and partner satisfaction.
                        </p>
                    </li>
                    <li id="EI8" class="eilist">
                        <div class="number">
                            5
                        </div>
                        <p>
                            CA Lead achieves YoU increases in customer and partner satisfaction.
                        </p>
                    </li>
                    <li id="EI9" class="eilist">
                        <div class="number">
                            5
                        </div>
                        <p>
                            CA Lead achieves YoU increases in customer and partner satisfaction.
                        </p>
                    </li>
                </ul>
            </div>--%>
        </div>

        <div class="goalslideholder">
            <h1>&nbsp;</h1>
            <h2 style="clear: both">&nbsp;</h2>
            <div class="goalmain">

                <div class="vs-context-menu">

                    <ul id="assignees">
                        <li class="bold">Share this Goal with:</li>
                        <li data-value="-1">Everyone</li>
                        <%--<li data-value="0">None</li>--%>
                    </ul>
                </div>
                <%--<div class="scroll3">
                    <div id="quickFeed3">
                        <div class="row">
                            <div class="slider">
                                <div id='Qno1' class="slidebar">
                                    <div class="firstid">
                                    </div>
                                    <div id="share1" class="sharebtn">
                                    </div>
                                    <div class="secondid">
                                    </div>
                                    <div id="share2" class="sharebtn">
                                    </div>
                                    <div class="thirdid">
                                    </div>
                                    <div id="share3" class="sharebtn">
                                    </div>
                                    <div class="forthid">
                                    </div>
                                    <div id="share4" class="sharebtn">
                                    </div>
                                    <img src="../Images/slider-bg.png" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="slider">
                                <div id='Qno2' class="slidebar">
                                    <div class="firstid">
                                    </div>
                                    <div id="share1" class="sharebtn">
                                    </div>
                                    <div class="secondid">
                                    </div>
                                    <div id="share2" class="sharebtn">
                                    </div>
                                    <div class="thirdid">
                                    </div>
                                    <div id="share3" class="sharebtn">
                                    </div>
                                    <div class="forthid">
                                    </div>
                                    <div id="share4" class="sharebtn">
                                    </div>
                                    <img src="../Images/slider-bg.png" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="slider">
                                <div id='Qno3' class="slidebar">
                                    <div class="firstid">
                                    </div>
                                    <div id="share1" class="sharebtn">
                                    </div>
                                    <div class="secondid">
                                    </div>
                                    <div id="share2" class="sharebtn">
                                    </div>
                                    <div class="thirdid">
                                    </div>
                                    <div id="share3" class="sharebtn">
                                    </div>
                                    <div class="forthid">
                                    </div>
                                    <div id="share4" class="sharebtn">
                                    </div>
                                    <img src="../Images/slider-bg.png" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="slider">
                                <div id='Qno4' class="slidebar">
                                    <div class="firstid">
                                    </div>
                                    <div id="share1" class="sharebtn">
                                    </div>
                                    <div class="secondid">
                                    </div>
                                    <div id="share2" class="sharebtn">
                                    </div>
                                    <div class="thirdid">
                                    </div>
                                    <div id="share3" class="sharebtn">
                                    </div>
                                    <div class="forthid">
                                    </div>
                                    <div id="share4" class="sharebtn">
                                    </div>
                                    <img src="../Images/slider-bg.png" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="slider">
                                <div id='Qno5' class="slidebar">
                                    <div class="firstid">
                                    </div>
                                    <div id="share1" class="sharebtn">
                                    </div>
                                    <div class="secondid">
                                    </div>
                                    <div id="share2" class="sharebtn">
                                    </div>
                                    <div class="thirdid">
                                    </div>
                                    <div id="share3" class="sharebtn">
                                    </div>
                                    <div class="forthid">
                                    </div>
                                    <div id="share4" class="sharebtn">
                                    </div>
                                    <img src="../Images/slider-bg.png" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="slider">
                                <div id='Qno6' class="slidebar">
                                    <div class="firstid">
                                    </div>
                                    <div id="Div2" class="sharebtn">
                                    </div>
                                    <div class="secondid">
                                    </div>
                                    <div id="Div3" class="sharebtn">
                                    </div>
                                    <div class="thirdid">
                                    </div>
                                    <div id="Div4" class="sharebtn">
                                    </div>
                                    <div class="forthid">
                                    </div>
                                    <div id="Div5" class="sharebtn">
                                    </div>
                                    <img src="../Images/slider-bg.png" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="slider">
                                <div id='Qno7' class="slidebar">
                                    <div class="firstid">
                                    </div>
                                    <div id="Div7" class="sharebtn">
                                    </div>
                                    <div class="secondid">
                                    </div>
                                    <div id="Div8" class="sharebtn">
                                    </div>
                                    <div class="thirdid">
                                    </div>
                                    <div id="Div9" class="sharebtn">
                                    </div>
                                    <div class="forthid">
                                    </div>
                                    <div id="Div10" class="sharebtn">
                                    </div>
                                    <img src="../Images/slider-bg.png" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="slider">
                                <div id='Qno8' class="slidebar">
                                    <div class="firstid">
                                    </div>
                                    <div id="Div12" class="sharebtn">
                                    </div>
                                    <div class="secondid">
                                    </div>
                                    <div id="Div13" class="sharebtn">
                                    </div>
                                    <div class="thirdid">
                                    </div>
                                    <div id="Div14" class="sharebtn">
                                    </div>
                                    <div class="forthid">
                                    </div>
                                    <div id="Div15" class="sharebtn">
                                    </div>
                                    <img src="../Images/slider-bg.png" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="slider">
                                <div id='Qno9' class="slidebar">
                                    <div class="firstid">
                                    </div>
                                    <div id="Div17" class="sharebtn">
                                    </div>
                                    <div class="secondid">
                                    </div>
                                    <div id="Div18" class="sharebtn">
                                    </div>
                                    <div class="thirdid">
                                    </div>
                                    <div id="Div19" class="sharebtn">
                                    </div>
                                    <div class="forthid">
                                    </div>
                                    <div id="Div20" class="sharebtn">
                                    </div>
                                    <img src="../Images/slider-bg.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row lastrow">
                    <div class="errormsg" id="errmsg">
                        You have not assigned goal for excellence indicator 4
                    </div>
                    <div class="shareall">
                        <p>
                            Share
                        </p>
                    </div>
                </div>--%>
            </div>
        </div>
    </div>
</asp:Content>