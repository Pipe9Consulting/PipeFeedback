<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <meta name="viewport" content="width=device-width" />
    <title>TakeFeedbackDV</title>
</head>
<body>
    <link rel="stylesheet" href="../../Styles/Stylesheet1.css" />
    <%-- <script type="text/javascript" src="../../Scripts/ref/jquery-1.8.3.js"></script>--%>
    <script type="text/javascript" src="../../Scripts/ref/jquery-ui.js"></script>
    <script type="text/javascript" src="../../Scripts/ref/jquery-ui.js"></script>
    <script type="text/javascript" src="../../Scripts/ref/Feedback/takefeedbackdv.js"></script>
    <style type="text/css">
        #Qno1 .ui-slider-range
        {
            background-image: url(../../images/img/bg.png);
        }
    </style>
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
                            <img src="../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
                        <li>
                            <img src="../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
                        <li>
                            <img src="../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
                        <li>
                            <img src="../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
                        <li>
                            <img src="../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
                        <li>
                            <img src="../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
                        <li>
                            <img src="../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
                        <li>
                            <img src="../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
                        <li>
                            <img src="../images/img/intro-pic.png" width="95" height="95" alt="Intro" /></li>
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
                                        <li id="li1" class="quickview tsf act">
                                            <h2>
                                                Customer and Partner Centric Culture
                                            </h2>
                                        </li>
                                        <li id="li2" class="quickview  tsf">
                                            <h2>
                                                Business Planning</h2>
                                        </li>
                                        <li id="li3" class="quickview  tsf">
                                            <h2>
                                                Business Management</h2>
                                        </li>
                                        <li id="li4" class="quickview  tsf">
                                            <h2>
                                                Orchestration and Collaboration</h2>
                                        </li>
                                        <li id="li5" class="quickview  tsf">
                                            <h2>
                                                Organizational Development</h2>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            <td valign="top">
                                <div>
                                    <input type="hidden" id="currentmoduleOrder" />
                                    <input type="hidden" id="module1" />
                                    <input type="hidden" id="module2" />
                                    <input type="hidden" id="module3" />
                                    <input type="hidden" id="module4" />
                                    <input type="hidden" id="module5" />
                                    <input type="hidden" id="module6" />
                                    <input type="hidden" id="module7" />
                                </div>
                                <div class="feedback" style="width: 750px">
                                    <h1>
                                        Questions</h1>
                                    <ul>
                                        <li>
                                            <div class="Qno">
                                                <p>
                                                    1</p>
                                            </div>
                                            <div class="progress">
                                                <%-- <div class="fontblue" id="slider_current_val_2">
                                                </div>
                                                <div class="slide_container" style="width: 620px">
                                                    <div class="slider" id="slider_C">
                                                        <div class="slider_gutter_l slider_gutter_item">
                                                        </div>
                                                        <div id="slider_gutter_C" class="slider_gutter_C slider_gutter_item">
                                                            <img src="../images/img/bg.png" width="562" height="62" id="slider_bkg_img_C" />
                                                            <div id="slider_knob_C" class="knob">
                                                            </div>
                                                        </div>
                                                        <div class="slider_gutter_r slider_gutter_item">
                                                        </div>
                                                    </div>
                                                    <div class="clearfix">
                                                    </div>
                                                </div>--%>
                                                <div id="selectedOption" style="display: none">
                                                </div>
                                                <div id='Qno1' style="width: 562px; height: 62px">
                                                    <img src="../images/img/bg-1.png" />
                                                </div>
                                                <p>
                                                </p>
                                            </div>
                                            <input type="hidden" id="question1" />
                                        </li>
                                    </ul>
                                    <div class="feedbackleft">
                                        <h4>
                                            Frequency Definitions</h4>
                                        <h6>
                                            Rarely</h6>
                                        <p>
                                            The Excellence Indicator is seldom observed or produced as a measure of success
                                            (Less than 20% of the time)</p>
                                        <h6>
                                            In-Consistently</h6>
                                        The Excellence Indicator is only observed or produced some of the time (less than
                                        60% of the time)
                                        <h6>
                                            Frequently</h6>
                                        The Excellence Indicator is consistently observed or produced (less than 90% of
                                        the time)
                                        <h6>
                                            Always</h6>
                                        The Excellence Indicator is always observed or produced as a measure of success
                                    </div>
                                    <div class="feedbackright" id="questionindetail">
                                        <%-- <h4>
                                            In Detail</h4>
                                        Actions taken by best performing CA Leads focused on building a Customer and Partner
                                        centric culture result in YoY increases in customer and partner satisfaction as
                                        measured by NSAT scores.--%>
                                    </div>
                                </div>
                                <div>
                                    <img id="nextdv" src="../images/next_arrow.png" />
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