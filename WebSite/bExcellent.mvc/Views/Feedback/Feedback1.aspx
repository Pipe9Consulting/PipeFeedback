<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    FB
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <form method="POST" action="/Feedback/ManagerFeedback">
    <input type="hidden" name="userIds" id="HdnuserIds" />
    </form>
    <div class="feedbackmain">
        <div id="tiles">
            <!--Page1-->
            <div class="active item">
                <div class="breadcrumb">
                    Home> Feedback</div>
                <div class="tileview">
                    <h1>
                        Feedback</h1>
                    <div class="tile">
                        <ul>
                            <li id="fbgiven"><a class="top">
                                <h2 id="feedback-given-count">
                                </h2>
                                Feedback Given</a><a>
                                    <h2 id="feedback-given-count1">
                                    </h2>
                                    Feedback Given</a></li>
                            <li id="fbrcvd"><a class="top">
                                <h2 id="feedback-recive-count">
                                </h2>
                                Feedback Received</a><a>
                                    <h2 id="feedback-recive-count1">
                                    </h2>
                                    Feedback Received</a></li>
                        </ul>
                    </div>
                    <div id="feedback-menu">
                        <%--<div class="tile">
                            <ul>
                                <li><a href="#" class="top">
                                    <h3>
                                        <img src="../../Images/take.png" width="49" height="48" alt="Take" class="singlelineicon" /></h3>
                                    Practice Area 1</a><a href="#"><h3>
                                        <img src="../../Images/take.png" width="49" height="48" alt="Take" class="singlelineicon" /></h3>
                                        Practice Area 1</a></li>
                                <li><a href="#" class="top">
                                    <h3>
                                        <img src="../../Images/recieve.png" width="35" height="35" alt="Receive" class="singlelineicon" /></h3>
                                    Practice Area 2</a><a href="#">
                                        <h3>
                                            <img src="../../Images/recieve.png" width="35" height="35" alt="Receive" class="singlelineicon" /></h3>
                                        Practice Area 2</a></li>
                            </ul>
                        </div>
                        <div class="tile">
                            <ul>
                                <li><a href="#" class="top">
                                    <h3>
                                        <img src="../../Images/take.png" width="49" height="48" alt="Take" class="singlelineicon" /></h3>
                                    Practice Area 1</a><a href="#"><h3>
                                        <img src="../../Images/take.png" width="49" height="48" alt="Take" class="singlelineicon" /></h3>
                                        Practice Area 1</a></li>
                                <li><a href="#" class="top">
                                    <h3>
                                        <img src="../../Images/recieve.png" width="35" height="35" alt="Receive" class="singlelineicon" /></h3>
                                    Practice Area 2</a><a href="#">
                                        <h3>
                                            <img src="../../Images/recieve.png" width="35" height="35" alt="Receive" class="singlelineicon" /></h3>
                                        Practice Area 2</a></li>
                            </ul>
                        </div>--%>
                    </div>
                    <div class="tile">
                        <ul>
                            <li><a href="#" class="top">
                                <h3>
                                    <img src="../../Images/history.png" width="34" height="43" alt="History" class="singlelineicon" /></h3>
                                History</a><a href="#"><h3>
                                    <img src="../../Images/history.png" width="34" height="43" alt="History" class="singlelineicon" /></h3>
                                    History</a></li>
                            <li><a href="#" class="top">
                                <h3>
                                    <img src="../../Images/status.png" width="32" height="32" alt="Status" class="singlelineicon" /></h3>
                                Status</a><a href="#"><h3>
                                    <img src="../../Images/status.png" width="32" height="32" alt="Status" class="singlelineicon" /></h3>
                                    Status</a></li>
                        </ul>
                    </div>
                </div>
                <div class="tileview tileviewmid" id="feedback-poe-list">
                    <h1>
                        Your Poe's</h1>
                    <ul>
                        <li>
                            <div class="tiles">
                                <div class="titles">
                                    <img src="../../Images/cam.png" alt="CAM Sales Manager Poe" class="doublelineicon" />CAM
                                    Sales Manager Poe1</div>
                                <div class="contents">
                                    <img src="../../Images/cam.png" alt="CAM Sales Manager Poe" class="doublelineicon" />CAM
                                    Sales Manager Poe1</div>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <div class="tiles">
                                <div class="titles">
                                    <img src="../../Images/cam.png" alt="CAM Sales Manager Poe" class="doublelineicon" />CAM
                                    Sales Manager Poe</div>
                                <div class="contents">
                                    <img src="../../Images/cam.png" alt="CAM Sales Manager Poe" class="doublelineicon" />CAM
                                    Sales Manager Poe</div>
                            </div>
                        </li>
                        <li>
                            <div class="tiles">
                                <div class="titles">
                                    <img src="../../Images/cam.png" alt="CAM Sales Manager Poe" class="doublelineicon" />CAM
                                    Sales Manager Poe</div>
                                <div class="contents">
                                    <img src="../../Images/cam.png" alt="CAM Sales Manager Poe" class="doublelineicon" />CAM
                                    Sales Manager Poe</div>
                            </div>
                        </li>
                        <li>
                            <div class="tiles">
                                <div class="titles">
                                    <img src="../../Images/cam.png" alt="CAM Sales Manager Poe" class="doublelineicon" />CAM
                                    Sales Manager Poe</div>
                                <div class="contents">
                                    <img src="../../Images/cam.png" alt="CAM Sales Manager Poe" class="doublelineicon" />CAM
                                    Sales Manager Poe</div>
                            </div>
                        </li>
                        <li>
                            <div class="tiles">
                                <div class="titles">
                                    <img src="../../Images/cam.png" alt="CAM Sales Manager Poe" class="doublelineicon" />CAM
                                    Sales Manager Poe</div>
                                <div class="contents">
                                    <img src="../../Images/cam.png" alt="CAM Sales Manager Poe" class="doublelineicon" />CAM
                                    Sales Manager Poe</div>
                            </div>
                        </li>
                        <li>
                            <div class="tiles">
                                <div class="titles">
                                    <img src="../../Images/cam.png" alt="CAM Sales Manager Poe" class="doublelineicon" />CAM
                                    Sales Manager Poe</div>
                                <div class="contents">
                                    <img src="../../Images/cam.png" alt="CAM Sales Manager Poe" class="doublelineicon" />CAM
                                    Sales Manager Poe</div>
                            </div>
                        </li>
                        <li>
                            <div class="tiles">
                                <div class="titles">
                                    <img src="../../Images/cam.png" alt="CAM Sales Manager Poe" class="doublelineicon" />CAM
                                    Sales Manager Poe</div>
                                <div class="contents">
                                    <img src="../../Images/cam.png" alt="CAM Sales Manager Poe" class="doublelineicon" />CAM
                                    Sales Manager Poe</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <%--<div style="height: 560px">
                        <ul>
                            <li><a href="#">
                                <img src="../../Images/ca.png" alt="CA Lead Poe" class="singlelineicon" />CA Lead
                                Poe</a> <a href="#">
                                    <img src="../../Images/cam.png" alt="CAM Sales Manager Poe" class="doublelineicon" />CAM
                                    Sales Manager Poe</a> <a href="#">
                                        <img src="../../Images/ctm.png" alt="CTM Sales Manager Poe" class="doublelineicon" />CTM
                                        Sales Manager Poe</a> <a href="#">
                                            <img src="../../Images/cam.png" alt="CAM Account Manager" class="doublelineicon" />CAM
                                            Account Manager</a> <a href="#">
                                                <img src="../../Images/ctm1.png" alt="CTM Sales Manager Poe" class="doublelineicon" />CTM
                                                Sales Manager Poe</a> </li>
                        </ul>
                    </div>--%>
            </div>
            <input type="hidden" id="usercheckbox" />
            <div class="tileview" id="fbsubmenu">
            </div>
            <%--<div class="tileview">
                <h1>
                    Give Feedback</h1>
                <div class="userlist">
                    <ul>
                        <li>
                            <input type="checkbox" id="user" class="check" />
                            <label>
                                <img src="../../Images/user.png" alt="User" />
                                Jon William</label>
                        </li>
                        <li>
                            <input type="checkbox" id="Checkbox1" class="check" />
                            <label>
                                <img src="../../Images/user.png" alt="User" />
                                Jon William</label>
                        </li>
                        <li>
                            <input type="checkbox" id="Checkbox2" class="check" />
                            <label>
                                <img src="../../Images/user.png" alt="User" />
                                Jon William</label>
                        </li>
                        <li>
                            <input type="checkbox" id="Checkbox3" class="check" />
                            <label>
                                <img src="../../Images/user.png" alt="User" />
                                Jon William</label>
                        </li>
                        <li>
                            <input type="checkbox" id="Checkbox4" class="check" />
                            <label>
                                <img src="../../Images/user.png" alt="User" />
                                Jon William</label>
                        </li>
                        <li>
                            <input type="checkbox" id="Checkbox5" class="check" />
                            <label>
                                <img src="../../Images/user.png" alt="User" />
                                Jon William</label>
                        </li>
                    </ul>
                    <input type="button" id="next" class="mngrnxt" />
                </div>
            </div>--%>
        </div>
    </div>
    <script language="javascript" type="text/javascript" src="../../Scripts/ref/Feedback/feedbacklanding.js"></script>
</asp:Content>