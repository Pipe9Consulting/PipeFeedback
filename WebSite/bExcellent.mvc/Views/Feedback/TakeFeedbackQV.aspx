<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <meta name="viewport" content="width=device-width" />
    <title>TakeFeedbackQV</title>
</head>
<head>
    <link rel="stylesheet" href="../../Styles/Stylesheet1.css" />
    <%-- <script type="text/javascript" src="../../Scripts/ref/jquery-1.8.3.js"></script>--%>
    <script type="text/javascript" src="../../Scripts/ref/jquery-ui.js"></script>
    <script type="text/javascript" src="../../Scripts/ref/jquery-ui.js"></script>
    <script type="text/javascript" src="../../Scripts/ref/Feedback/takefeedbackqv.js"></script>
    <style type="text/css">
        #Qn1 .ui-slider-range
        {
            background-image: url(../../images/img/bg.png);
        }
        #Qn2 .ui-slider-range
        {
            background-image: url(../../images/img/bg.png);
        }
        #Qn3 .ui-slider-range
        {
            background-image: url(../../images/img/bg.png);
        }
        #Qn4 .ui-slider-range
        {
            background-image: url(../../images/img/bg.png);
        }
        #Qn5 .ui-slider-range
        {
            background-image: url(../../images/img/bg.png);
        }
        .feedback_question
        {
            width: 800px;
            height: 600px;
            overflow: auto;
        }
        .feedback_question ul
        {
            list-style-type: none;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div id="apDiv1">
        <div class="leftpanel">
            <div class="expand">
                <a href="#" onclick="setVisibility('sub1', 'inline');">&nbsp;</a>
            </div>
            <span id="sub1">
                <div class="content">
                    <h1>
                        Introduction</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis velit ligula. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit. Ut quis velit ligula.
                    </p>
                    <h1>
                        Actions</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis velit ligula. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit. Ut quis velit ligula.
                    </p>
                    <h1>
                        Definitions</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis velit ligula. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit. Ut quis velit ligula.
                    </p>
                </div>
                <div class="collapse">
                    <a href="#" onclick="setVisibility('sub1', 'none');">&nbsp;</a>
                </div>
            </span>
        </div>
    </div>
    <div id="apDiv2">
        <div class="rightpanel">
            <div class="expand">
                <a href="#" onclick="setVisibility('sub2', 'inline');">&nbsp;</a>
            </div>
            <span id="sub2">
                <div class="content">
                    <h1>
                        Introduction</h1>
                    <ul>
                        <li>
                            <img src="../../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
                        <li>
                            <img src="../../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
                        <li>
                            <img src="../../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
                        <li>
                            <img src="../../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
                        <li>
                            <img src="../../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
                        <li>
                            <img src="../../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
                        <li>
                            <img src="../../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
                        <li>
                            <img src="../../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
                        <li>
                            <img src="../../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
                    </ul>
                </div>
                <div class="collapse">
                    <a href="#" onclick="setVisibility('sub2', 'none');">&nbsp;</a>
                </div>
            </span>
        </div>
    </div>
    <div id="wcsi-inner-content">
        <div id="btn-wcsi-back" class="back-button" style="display: none">
        </div>
        <div id="sub-contents">
            <div id="sub-left-menu">
                <div id="wcsi-poe-menu">
                    <table>
                        <tr>
                            <td>
                                <div style="width: 50px">
                                    &nbsp;</div>
                            </td>
                            <td>
                                <div id="page-title" class="page-title">
                                    Take Self Feedback</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style="width: 50px">
                                    &nbsp;</div>
                            </td>
                            <td valign="top">
                                <div class="rightcolfeedback" style="width: 380px" id="poemodule">
                                    <ul>
                                        <li id="li2" class="quickview tsf act">
                                            <h2>
                                                Customer and Partner Centric Culture
                                            </h2>
                                        </li>
                                        <li id="li3" class="quickview  tsf">
                                            <h2>
                                                Business Planning</h2>
                                        </li>
                                        <li id="li4" class="quickview  tsf">
                                            <h2>
                                                Business Management</h2>
                                        </li>
                                        <li id="li5" class="quickview  tsf">
                                            <h2>
                                                Orchestration and Collaboration</h2>
                                        </li>
                                        <li id="li6" class="quickview  tsf">
                                            <h2>
                                                Organizational Development</h2>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            <td valign="top" style="width: 50%">
                                <input type="hidden" id="currentmoduleOrder" />
                                <input type="hidden" id="module1" />
                                <input type="hidden" id="module2" />
                                <input type="hidden" id="module3" />
                                <input type="hidden" id="module4" />
                                <input type="hidden" id="module5" />
                                <input type="hidden" id="module6" />
                                <input type="hidden" id="module7" />
                                <div class="scroll-pane" style="height: 500px; margin-top: 0;">
                                    <div class="feedback_question">
                                        <ul>
                                            <li>
                                                <div class="Qno">
                                                    1
                                                </div>
                                                <div class="progress">
                                                    <div id="selectedOption" style="display: none">
                                                    </div>
                                                    <div id="Qn1" style="width: 562px; height: 62px" datavalue>
                                                        <img src="../../images/img/bg-1.png" />
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="Qno">
                                                    2</div>
                                                <div class="progress">
                                                    <div id="Qn2" style="width: 562px; height: 62px">
                                                        <img src="../../images/img/bg-1.png" />
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="Qno">
                                                    3</div>
                                                <div class="progress">
                                                    <div id="Qn3" style="width: 562px; height: 62px">
                                                        <img src="../../images/img/bg-1.png" />
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="Qno">
                                                    4</div>
                                                <div class="progress">
                                                    <div id="Qn4" style="width: 562px; height: 62px">
                                                        <img src="../../images/img/bg-1.png" />
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="Qno">
                                                    5</div>
                                                <div class="progress">
                                                    <div id="Qn5" style="width: 562px; height: 62px">
                                                        <img src="../../images/img/bg-1.png" />
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <img id="next" src="../../images/next_arrow.png" />
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </form>
</body>
</html>