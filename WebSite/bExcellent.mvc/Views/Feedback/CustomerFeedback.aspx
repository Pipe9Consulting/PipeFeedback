<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/SignUp.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Feedback
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/themes/default.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/themes/default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/ref/editor/jquery.sceditor.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.1.10.0.UI.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Scripts/ref/Feedback.js"></script>
    <script src="../../Scripts/ref/Feedback/CustomerFeeedback.js" type="text/javascript"></script>
    <link href="../../Styles/Feedback.css" rel="stylesheet" type="text/css" />
    <style>
        .sliderdiv .ui-slider-range
        {
            background-image: url(../../Images/img/slidebg2.png);
            cursor: pointer;
        }

        .sliderdiv
        {
            cursor: pointer;
        }
    </style>
    <div class="slidebtn" id="bigslide">
        <a href="#" class="prevfb" id="p1x" style="display: none">Previous</a>
        <div class="pagination" id="pagetxt">
            Page 1 of 2
        </div>
        <a href="#" class="nxtfb" id="bn1x" style="display: none">Next</a>
    </div>
    <div class="slidebtn" id="sliderbtn">
    </div>
    <div id="hiddenValues">
        <input type="hidden" id="selectedpoe" />
        <input type="hidden" id="selectedanswer" />
        <input type="hidden" id="totalQuestions" />
        <input type="hidden" id="totalQuestionsformodule" />
        <input type="hidden" id="totalmodules" />
        <input type="hidden" id="currentmoduleOrder" />
        <input type="hidden" id="nextmodule" />
        <input type="hidden" id="fbStatus" value="0" />
        <input type="hidden" id="lastSavedQuestion" value="0" />
        <input type="hidden" id="lastSavedQuestionOrder" value="0" />
        <input type="hidden" id="lastSavedModuleId" value="0" />
        <input type="hidden" id="lastSavedModuleOrder" value="0" />
        <div style="visibility: hidden" id="modules">
        </div>
    </div>
    <div id="primarynav">
        <div id="poeintroslidecount" style='display: none;'>
        </div>
        <div id="poeintro0" style='display: none;'>
        </div>
        <div id="poeintro1" style='display: none;'>
        </div>
        <div id="poeintro2" style='display: none;'>
        </div>
        <div id="poeintro3" style='display: none;'>
        </div>
        <div id="poeintro4" style='display: none;'>
        </div>
        <div id="poeintro5" style='display: none;'>
        </div>
        <div id="moduleintroslidecount" style='display: none;'>
        </div>
        <div id="moduleintro0" style='display: none;'>
        </div>
        <div id="moduleintro1" style='display: none;'>
        </div>
        <div id="moduleintro2" style='display: none;'>
        </div>
        <div id="moduleintro3" style='display: none;'>
        </div>
        <div id="moduleintro4" style='display: none;'>
        </div>
        <div id="moduleintro5" style='display: none;'>
        </div>
        <div id="keyactionslidecount" style='display: none;'>
        </div>
        <div id="keyaction0" style='display: none;'>
        </div>
        <div id="keyaction1" style='display: none;'>
        </div>
        <div id="keyaction2" style='display: none;'>
        </div>
        <div id="keyaction3" style='display: none;'>
        </div>
        <div id="keyaction4" style='display: none;'>
        </div>
        <div id="keyaction5" style='display: none;'>
        </div>
        <div id="traitsslidecount" style='display: none;'>
        </div>
        <div id="traits0" style='display: none;'>
        </div>
        <div id="traits1" style='display: none;'>
        </div>
        <div id="traits2" style='display: none;'>
        </div>
        <div id="traits3" style='display: none;'>
        </div>
        <div id="traits4" style='display: none;'>
        </div>
        <div id="traits5" style='display: none;'>
        </div>
        <ul id="navigation">
            <li><a class="nav1 selected" href="#" rel="poeintrodiv">
                <div class="tooltip FI">
                    Feedback Intro
                </div>
                <img src="../../Images/navigation1.png" alt="Nav1" /></a></li>
            <li><a class="nav2" href="#" rel="poeintrodiv">
                <div class="tooltip MI">
                    Module Intro
                </div>
                <img src="../../Images/navigation2.png" alt="Nav2" /></a></li>
            <li><a class="nav3" href="#" rel="poeintrodiv">
                <div class="tooltip trait">
                    Traits
                </div>
                <img src="../../Images/navigation3.png" alt="Nav3" /></a></li>
            <li><a class="nav4" href="#" rel="poeintrodiv">
                <div class="tooltip kact">
                    Key Actions
                </div>
                <img src="../../Images/navigation4.png" alt="Nav4" /></a></li>
        </ul>
    </div>
    <div class="slideout">
        <div class="slidecontent">
            <div id="ajax-content">
            </div>
            <div id="poeintrodiv">
                <h2>Poe Intro</h2>
                <div class="content1" id="maincontent">
                </div>
            </div>
            <a id="clickmodele1" href="#"></a><a id="clickmodele1hide" href="#"></a>
            <div id="snap2">
            </div>
            <a id="clickmodele2" href="#"></a><a id="clickmodele2hide" href="#"></a>
            <div id="snap3">
            </div>
        </div>
        <div id="left">
        </div>
    </div>
    <div class="slideout1">
        <div class="slidecontent1">
            <h1>Connect</h1>
            <ul id="connectmembrs">
                <%-- <li><a href="#">
                    <img src="../../Images/intro-pic.png" width="95" height="95" alt="Intro" /></a>
                    <p>
                        john</p>
                </li>
                <li><a href="#">
                    <img src="../../Images/intro-pic.png" width="95" height="95" alt="Intro" /></a></li>
                <li><a href="#">
                    <img src="../../Images/intro-pic.png" width="95" height="95" alt="Intro" /></a></li>
                <li><a href="#">
                    <img src="../../Images/intro-pic.png" width="95" height="95" alt="Intro" /></a></li>
                <li><a href="#">
                    <img src="../../Images/intro-pic.png" width="95" height="95" alt="Intro" /></a></li>
                <li><a href="#">
                    <img src="../../Images/intro-pic.png" width="95" height="95" alt="Intro" /></a></li>
                <li><a href="#">
                    <img src="../../Images/intro-pic.png" width="95" height="95" alt="Intro" /></a></li>
                <li><a href="#">
                    <img src="../../Images/intro-pic.png" width="95" height="95" alt="Intro" /></a></li>
                <li><a href="#">
                    <img src="../../Images/intro-pic.png" width="95" height="95" alt="Intro" /></a></li>--%>
            </ul>
            <div class="clr">
            </div>
            <form action="/Feedback/ConnectPost" id="PostComments">
                <textarea name="bbcode_field" style="height: 150px; width: 317px;" id="txtareas">
                        </textarea>
                <input name="" type="button" value="Send" class="btn" id="submitbtn" />
                <input type="hidden" name="useridslist" id="useridslist" />
                <input type="hidden" name="subject" id="subject" />
                <input type="hidden" name="comments" id="comments" />
            </form>
        </div>
        <div id="right">
        </div>
    </div>
    <div class="pageholder" id="GF">
        <div class="breadcrumb">
            Home > Feedback > Give Feedback
        </div>
        <div id="aboutContent" class="customertiles">
            <h1>Give Feedback
            </h1>
            <ul id="poemodule">
                <%-- <li class="takesf selected">Customer and Partner
                    <br />
                    Centric Culture
                    <img src="../../Images/icons/capcc.png" width="64" height="50" alt="CPCC" class="img" /></li>
                <li class="takesf takesfsingle">Business Planning<img src="../../Images/icons/business-plan.png"
                    width="64" height="50" alt="CPCC" /></li>
                <li class="takesf takesfsingle">Business Management<img src="../../Images/icons/business-mng.png"
                    width="64" height="50" alt="CPCC" /></li>
                <li class="takesf">Orchestration and
                    <br />
                    Collaboration<img src="../../Images/icons/collaboration-white.png" width="64" height="50" /></li>
                <li class="takesf">Organizational
                    <br />
                    Development<img src="../../Images/icons/org-dev.png" width="64" height="50" alt="CPCC" /></li>
                <li class="takesf takesfsingle">Innovation<img src="../../Images/icons/innovate.png"
                    width="64" height="50" alt="CPCC" /></li>--%>
            </ul>
        </div>
        <div class="contentholder">
            <div class='timetakencontainer' style="visibility: hidden;">
                <div class='timetaken'>
                    | Time taken :
                </div>
                <div class='counterHour'>
                    00
                </div>
                <div class='collan'>
                    :
                </div>
                <div class='counterMin'>
                    00
                </div>
                <div class='collan'>
                    :
                </div>
                <div class='counterSec'>
                    00
                </div>
            </div>
            <div class="questions">
                <div class="clr">
                </div>
                <ul id="questions">
                </ul>
            </div>
            <div class="clr">
            </div>
            <div class="frequencydiv">
                <h3>Frequency Definitions</h3>
                <div class="frequency">
                    <img src="../../Images/rarely.png" alt="Rarely" /><h4>Rarely</h4>
                    <p>
                        The Excellence Action is seldom observed or produced as a measure of success
                        (Less than 20% of the time)
                    </p>
                </div>
                <div class="frequency">
                    <img src="../../Images/inconsistently.png" alt="inconsistently" /><h4>In-Consistently</h4>
                    <p>
                        The Excellence Action is only observed or produced some of the time (less than
                        60% of the time)
                    </p>
                </div>
                <div class="frequency">
                    <img src="../../Images/frequently.png" alt="frequently" /><h4>Frequently</h4>
                    <p>
                        The Excellence Action is consistently observed or produced (less than 90% of
                        the time)
                    </p>
                </div>
                <div class="frequency">
                    <img src="../../Images/always.png" alt="Always" />
                    <h4>Always</h4>
                    <p>
                        The Excellence Action is always observed or produced as a measure of success
                    </p>
                </div>
            </div>
        </div>
    </div>
</asp:Content>