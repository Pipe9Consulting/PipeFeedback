<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Feedback
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <link href="../../Styles/themes/default.min.css" rel="stylesheet" type="text/css" />
    
    <script src="../../Scripts/ref/editor/jquery.sceditor.min.js" type="text/javascript"></script>
    <script src="https://code.jquery.com/ui/1.10.0/jquery-ui.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Scripts/ref/Feedback.js"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Scripts/ref/Feedback/takefeedbackqv.js"></script>
    <script src="../../Scripts/jquery-sticklr-1.0.pack.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#example-2').sticklr({
                showOn: 'click',
                stickTo: 'right'
            });
        });
    </script>
   
     <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb">
            <a href="../Common/Index">Home</a> > <a href="../Feedback/Feedback">Feedback</a> > <a>Self-Feedback</a>
        </div>
     </div>
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/feedback/quickview.css" rel="stylesheet" type="text/css" />
     <style type="text/css">
        .sliderdiv1 {
            background-image: url(../../Images/img/slidebg2-1.png) !important;
        }
        .sliderdiv2 {
            background-image: url(../../Images/img/slidebg2-2.png) !important;
        }
        .sliderdiv3 {
            background-image: url(../../Images/img/slidebg2-3.png) !important;
        }
        .sliderdiv4 {
            background-image: url(../../Images/img/slidebg2-4.png) !important;
        }
    </style>
    <div class="slidebtn" id="bigslide">
        <a href="#" class="prevfb" id="p1x" style="display: none">Previous</a>
        <div class="pagination" id="pagetxt">
            Page 1 of 2
        </div>
        <a href="#" class="nxtfb" id="bn1x" style="display: none">Next</a>
    </div>
    <div id="hiddenValues">
        <input type="hidden" id="selectedpoe" />
        <input type="hidden" id="selectedanswer" />
        <input type="hidden" id="selectedNotes" />
        <input type="hidden" id="questionids" />
        <input type="hidden" id="totalmodules" />
        <input type="hidden" id="currentmoduleOrder" />
        <input type="hidden" id="nextmodule" />
        <input type="hidden" id="selectedmodulename" />
        <div style="visibility: hidden" id="modules">
        </div>
    </div>
    <div class='timetakencontainer' style="visibility: hidden; display: none">
        <div class='timetaken'>
            Time taken :
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
        <div id="indetail0" style='display: none;'>
        </div>
        <div id="indetail1" style='display: none;'>
        </div>
        <div id="indetail2" style='display: none;'>
        </div>
        <div id="dos" style='display: none;'>
            <b>Motivate:</b>
            <p>Do not use REP as a way to Motivate Roles by giving a Frequently or Always rating</p>
            <br />
            <b>Clustering:</b>
            <p>Be careful that all feedback isn’t clustered into one end of the scale</p>
            <br />
            <b>Events:</b>
            <p>Be cautious not to focus too much on recent successes or failures</p>
            <br />
            <b>Steady Pace:</b>
            <p>Be thoughtful in the answers that you give and proceed through the survey at a steady pace</p>
            <br />
            <b>Clarity:</b>
            <p>Providing an honest view of yourself and your team brings clarity to Strengths and Opportunities for Development</p>
            <br />
            <b>Timing:</b>
            <p>Choose a time that will enable you to complete the survey, 30 minutes for self and 45-1hr for team</p>
            <br />
            <br />
        </div>
        <div id="frequencydef" style='display: none;'>
            <div class="frequencydiv">
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
                        The Excellence Action is only observed or produced some of the time as a measure
                        of success (less than 60% of the time)
                    </p>
                </div>
                <div class="frequency">
                    <img src="../../Images/frequently.png" alt="frequently" /><h4>Frequently</h4>
                    <p>
                        The Excellence Action is consistently observed or produced as a measure of success
                        (less than 90% of the time)
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


    <div class="pageholder" id="quickfeedPage" style="visibility: hidden">
        <h1 class="lft_head">Self-Feedback</h1> <h1 class="right_head" id="poemoduleName">PA Header</h1>

                <div id="aboutContent" class="customertiles">

            
            <div class="scroll1">
                <ul id="poemodule">


                   <%-- <li class="AOAccountExecutive1Tile selectAOAccountExecutive1" id="li1" data-value="82">
                        <p>Product Guru</p>
                    </li>

                    <li class="AOAccountExecutive2Tile selectAOAccountExecutive2" id="li2" data-value="83">
                        <p>Connected Communicator</p>
                    </li>
                    <li class="AOAccountExecutive3Tile selectAOAccountExecutive3" id="li3" data-value="84">
                        <p>Product Innovator</p>
                    </li>
                    <li class="AOAccountExecutive4Tile selectAOAccountExecutive4" id="li4" data-value="85">
                        <p>Relationship Builder</p>
                    </li>--%>

                </ul>
            </div>
        </div>
        
        <div class="contentholder">
            <div class="managerFeedbackArea">
    <div class="slidebtn" id="sliderbtn">
    </div>
        <div class="questions" id="quickviewli">

            <li id="m1" data-value="82" class="sectionModules">

                <div class="timetakencont">
                    <div class="timetaken">Time taken: </div>
                    <div class="counterHour">00</div>
                    <div class="collan">:</div>
                    <div class="counterMin">2</div>
                    <div class="collan">:</div>
                    <div class="counterSec">6</div>
                </div>
                <div class="contentholder">
                    <div class="questions quickviewfb">
                        <ul>
                            <li>
                                <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 25%;">
                                    <div class="scroll2 feedheight" style="overflow: hidden; width: auto; height: 25%;">
                                        <div class="questionarea quickview">
                                            <div class="qn">1</div>
                                            <h2>Evangelizes the Microsoft Value Proposition</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno417" data-question="417" data-moduleid="82" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">2</div>
                                            <h2>Develops deep product knowledge</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno418" data-question="418" data-moduleid="82" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">3</div>
                                            <h2>Educates the account team</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno419" data-question="419" data-moduleid="82" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">4</div>
                                            <h2>Utilizes deep insights</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno420" data-question="420" data-moduleid="82" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">5</div>
                                            <h2>Creates compelling data-driven proposals</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno421" data-question="421" data-moduleid="82" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="slimScrollBar dummy-slimscrollbar-backgound" style="width: 4px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 425.057471264368px; background: rgb(0, 0, 0);"></div>
                                    <div class="slimScrollRail" style="width: 4px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; opacity: 0.2; z-index: 90; right: 1px; background: rgb(51, 51, 51);"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <input type="hidden" id="mq1" value="417,418,419,420,421,"></li>
            <li id="m2" data-value="83" class="sectionModules">

                <div class="timetakencont">
                    <div class="timetaken">Time taken: </div>
                    <div class="counterHour">00</div>
                    <div class="collan">:</div>
                    <div class="counterMin">2</div>
                    <div class="collan">:</div>
                    <div class="counterSec">6</div>
                </div>
                <div class="questionLenghtExceed">Please scroll down to see all the questions for this Practice Area.</div>
                <div class="contentholder">
                    <div class="questions quickviewfb">
                        <ul>
                            <li>
                                <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 25%;">
                                    <div class="scroll2 feedheight" style="overflow: hidden; width: auto; height: 25%;">
                                        <div class="questionarea quickview">
                                            <div class="qn">1</div>
                                            <h2>Conducts proactive meetings</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno422" data-question="422" data-moduleid="83" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">2</div>
                                            <h2>Acts as voice of the customer</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno423" data-question="423" data-moduleid="83" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">3</div>
                                            <h2>Evangelizes the product strategy</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno424" data-question="424" data-moduleid="83" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">4</div>
                                            <h2>Consults on innovative solutions </h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno425" data-question="425" data-moduleid="83" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">5</div>
                                            <h2>Scales new solutions</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno426" data-question="426" data-moduleid="83" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">6</div>
                                            <h2>Communicates across account team</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno427" data-question="427" data-moduleid="83" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">7</div>
                                            <h2>Educates on product insights</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno428" data-question="428" data-moduleid="83" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">8</div>
                                            <h2>Identifies revenue blockers</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno429" data-question="429" data-moduleid="83" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="slimScrollBar" style="width: 4px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 348.911963882619px; background: rgb(0, 0, 0);"></div>
                                    <div class="slimScrollRail" style="width: 4px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; opacity: 0.2; z-index: 90; right: 1px; background: rgb(51, 51, 51);"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <input type="hidden" id="mq2" value="422,423,424,425,426,427,428,429,"></li>
            <li id="m3" data-value="84" class="sectionModules">

                <div class="timetakencont">
                    <div class="timetaken">Time taken: </div>
                    <div class="counterHour">00</div>
                    <div class="collan">:</div>
                    <div class="counterMin">2</div>
                    <div class="collan">:</div>
                    <div class="counterSec">6</div>
                </div>
                <div class="questionLenghtExceed">Please scroll down to see all the questions for this Practice Area.</div>
                <div class="contentholder">
                    <div class="questions quickviewfb">
                        <ul>
                            <li>
                                <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 25%;">
                                    <div class="scroll2 feedheight" style="overflow: hidden; width: auto; height: 25%;">
                                        <div class="questionarea quickview">
                                            <div class="qn">1</div>
                                            <h2>Maps client goals to Microsoft solutions</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno430" data-question="430" data-moduleid="84" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">2</div>
                                            <h2>Supports campaign management</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno431" data-question="431" data-moduleid="84" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">3</div>
                                            <h2>Contributes to strategic customer plan</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno432" data-question="432" data-moduleid="84" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">4</div>
                                            <h2>Contributes to regular account team meetings</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno433" data-question="433" data-moduleid="84" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">5</div>
                                            <h2>Negotiates contracts</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno434" data-question="434" data-moduleid="84" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">6</div>
                                            <h2>Manages product pipeline regularly</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno435" data-question="435" data-moduleid="84" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">7</div>
                                            <h2>Identifies product pipeline risks</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno436" data-question="436" data-moduleid="84" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="slimScrollBar" style="width: 4px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 398.885161290323px; background: rgb(0, 0, 0);"></div>
                                    <div class="slimScrollRail" style="width: 4px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; opacity: 0.2; z-index: 90; right: 1px; background: rgb(51, 51, 51);"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <input type="hidden" id="mq3" value="430,431,432,433,434,435,436,"></li>
            <li id="m4" data-value="85" class="sectionModules">

                <div class="timetakencont">
                    <div class="timetaken">Time taken: </div>
                    <div class="counterHour">00</div>
                    <div class="collan">:</div>
                    <div class="counterMin">2</div>
                    <div class="collan">:</div>
                    <div class="counterSec">6</div>
                </div>
                <div class="contentholder">
                    <div class="questions quickviewfb">
                        <ul>
                            <li>
                                <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 25%;">
                                    <div class="scroll2 feedheight" style="overflow: hidden; width: auto; height: 25%;">
                                        <div class="questionarea quickview">
                                            <div class="qn">1</div>
                                            <h2>Develops and nurture key relationships</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno437" data-question="437" data-moduleid="85" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">2</div>
                                            <h2>Drives integrated selling conversations</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno438" data-question="438" data-moduleid="85" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">3</div>
                                            <h2>Shares integrated product insights</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno439" data-question="439" data-moduleid="85" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">4</div>
                                            <h2>Collaborates across account team</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno440" data-question="440" data-moduleid="85" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="questionarea quickview">
                                            <div class="qn">5</div>
                                            <h2>Coaches the account team</h2>
                                            <div class="clr"></div>
                                            <div class="sliderimg">
                                                <div id="Qno441" data-question="441" data-moduleid="85" style="width: 562px; height: 62px; cursor: pointer;" class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                                    <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 25%;"></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="slimScrollBar dummy-slimscrollbar-backgound" style="width: 4px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 556px; background: rgb(0, 0, 0);"></div>
                                    <div class="slimScrollRail" style="width: 4px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; opacity: 0.2; z-index: 90; right: 1px; background: rgb(51, 51, 51);"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <input type="hidden" id="mq4" value="437,438,439,440,441,"></li>

        </div>

</div>
            </div>



        </div>


        <!------------------Right Side Panel -------------->

        <div id="sticky" style="visibility: hidden">



            <ul id="example-2" class="sticklr">
             <%--   <li>
                    <a href="#" class="icon-traits" id="traits" title="Primary Accomplishments">
                        <p>Primary Accomplishments</p>
                    </a>
                    <ul class="content3" id="poetraits">
                        <li>
                            <h1>1</h1>
                            <div class="traitp">
                                <p>Develops, maintains and shares domain-specific expertise </p>
                            </div>
                        </li>
                        <li>
                            <h1>2</h1>
                            <div class="traitp">
                                <p>Evangelizes the Microsoft value proposition</p>
                            </div>
                        </li>
                        <li>
                            <h1>3</h1>
                            <div class="traitp">
                                <p>Acts as "the voice" of Microsoft for specific areas of expertise</p>
                            </div>
                        </li>
                        <li>
                            <h1>4</h1>
                            <div class="traitp">
                                <p>Improves clients' business understanding and develops relationships</p>
                            </div>
                        </li>
                        <li>
                            <h1>5</h1>
                            <div class="traitp">
                                <p>Acts as a resource to Sales management and delivers insights</p>
                            </div>
                        </li>
                        <li>
                            <h1>6</h1>
                            <div class="traitp">
                                <p>Ensures targeted responses to clients' specific technology and business needs </p>
                            </div>
                        </li>
                        <li>
                            <h1>7</h1>
                            <div class="traitp">
                                <p>Creates solutions that align to the customer's overall campaign objectives</p>
                            </div>
                        </li>
                        <li>
                            <h1>8</h1>
                            <div class="traitp">
                                <p>Works with the account team to develop customer plans</p>
                            </div>
                        </li>
                        <li>
                            <h1>9</h1>
                            <div class="traitp">
                                <p>Builds collaborative relationships that drive integrated solutions</p>
                            </div>
                        </li>
                        <li>
                            <h1>10</h1>
                            <div class="traitp">
                                <p>Maintains knowledge of other products and the broader Microsoft story</p>
                            </div>
                        </li>
                    </ul>

                </li>--%>
                <%--<li>
                    <a href="#" class="icon-feedbackIntro" id="feedbackIntro" title="Profile Summary">
                        <p>Profile Summary</p>
                    </a>
                    <ul class="feedbackIntro">
                        <div id="profilesscroll">
                        <img src="../../Images/KessakuImage/AOProductSpecialist_pane.png" />
                        <p>The A&amp;O Product Specialist (PS) Profile of Excellence (PoE) focuses on what best performing Product Specialists do differently to demonstrate and enhance product/solution expertise (the voice), respond to client needs, and form collaborative relationships. This Profile of Excellence introduces four skills to drive success: Product Guru, Connected Communicator, Product Innovator, and Relationship Builder.</p>

                        <img src="/Images/AO_Product_Specialist_intro.png" alt="Feedback-intro" />

                            </div>



                    </ul>



                </li>--%>
                <%--<li>
                    <a href="#" class="icon-practiceAreasIntro" id="practiceAreasIntro" title="Practice Area Intro">
                        <p>Practice Area Intro</p>
                    </a>
                    <ul class="practiceAreaIntro">

                        <div class="practiceAreaTitle">
                            <h2>Product Guru </h2>
                            <img src="../Images/icons/AOProductSpecialist1.png" />
                        </div>
                        <p>Best performing PS's evangelize the Microsoft value proposition and tell the product story in context to marketers, agencies and industry. On an ongoing basis, the PS partners with and educates the account team, offering product expertise and solutions opportunities, while explaining the benefits of how products add value to the customer and fit within the Microsoft story. PS's also identify and leverage data on trends, the competitive landscape, and ongoing marketplace intelligence within solution focus area to develop a deep understand of the solution and audience. The best performing PS's develops, maintains and passionately shares domain-specific expertise internally within Microsoft, externally with agencies/advertisers, and with the market at large. </p>





                    </ul>
                </li>
                <li>
                    <a href="#" class="icon-keyAction" id="keyAction" title="Key Actions">
                        <p>Key Actions</p>
                    </a>
                    <ul class="keyActions">

                        <li>


                            <h2>Key Actions</h2>
                            <ul>
                                <li>Evangelize the Microsoft value proposition and tell the product story in context to marketers, agencies and industry.</li>
                                <li>Develop deep expertise in product focus area (in context to industry and competition) and offer deep expertise of the SSE’s product portfolio to local or multi-market agencies/advertisers.</li>
                                <li>Partner, evangelize and educate the account team on an ongoing basis (i.e., during customer planning discussions) offering product expertise, solutions opportunities and explaining the benefits of how products add value to the customer and fit within the overall Microsoft story. </li>
                                <li>Identify and/or leverage data on trends, competitive landscape, audience insights and ongoing marketplace intelligence within solution focus area to develop a deep understanding of the solution and audience(s) and then communicate insights internally and externally.</li>
                                <li>Build tailored proposals for the agencies/advertiser on product-specific capabilities that map to identified  customer  business needs.</li>
                            </ul>

                        </li>



                    </ul>
                </li>--%>
                <li>

                    <a href="#" class="frequencyDefinitions" id="frequencyDefinitions">
                        <p>Frequency Definitions</p>
                    </a>
                    <ul class="frequencydefinitions">
                        <li>
                            <div>
                                <div class="frequency">
                                    <img src="../../Images/rarely.png" alt="Rarely"><h4>Rarely</h4>
                                    <p>
                                        The Excellence Action is rarely demonstrated and significant improvement is required.
                                    </p>
                                </div>
                                <div class="frequency">
                                    <img src="../../Images/inconsistently.png" alt="inconsistently"><h4>Inconsistently</h4>
                                    <p>
                                       The Excellence Action is inconsistently demonstrated and improvement is required.
                                    </p>
                                </div>
                                <div class="frequency">
                                    <img src="../../Images/frequently.png" alt="frequently"><h4>Frequently</h4>
                                    <p>
                                       The Excellence Action is frequently demonstrated, but further improvement is possible.
                                    </p>
                                </div>
                                <div class="frequency">
                                    <img src="../../Images/always.png" alt="Always">
                                    <h4>Always</h4>
                                    <p>
                                        The Excellence Action is always demonstrated. Excellence has been achieved.
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>

                </li>
                <%--<li>
                    <a href="#" class="icon-do-dont" id="do-dont">
                        <p>Feedback Guidance</p>
                    </a>
                    <ul class="dosdonts">

                        <li>


                            <p>
                                <b>Dedication:</b>
                                <br />
                                DO provide Feedback when you have dedicated enough time and can avoid distractions<br />
                                DON’T provide Feedback when rushed or distracted
                            </p>


                            <p>
                                <b>Thoughtfulness:</b>
                                <br />
                                DO provide thoughtful responses to each question<br />
                                DON’T provide clusters of the same response without justification
                            </p>


                            <p>
                                <b>Accuracy:</b><br />
                                DO provide feedback that is accurate, honest and meaningful<br />
                                DON’T provide inflated or deflated feedback to reward, influence or motivate
                            </p>


                            <p>
                                <b>Scope:</b><br />
                                DO provide feedback that represent long-term performance<br />
                                DON’T provide feedback based only on recent successes or failures
                            </p>

                        </li>



                    </ul>
                </li>--%>

                <%--<li>
                    <a href="#" class="icon-mentors" id="mentors" title="Mentors">
                        <p>Mentors</p>
                    </a>
                    <ul class="mentorsPanel">

                        <li>




                            <div class="mentorscroll">
                            <ul id="connectmembrs">
                              
                            </ul>
                                </div>
                            <div class="clr">

                                <form action="/Feedback/ConnectPost" id="PostComments" enctype="multipart/form-data">
                                    <textarea name="bbcode_field" style="height: 100px; width: 150px; display: none;" id="txtareas">                        </textarea>
                                     <input type="hidden" name="useridslist" id="useridslist">
                                     <input type="hidden" name="subject" id="subject">
                                     <input type="hidden" name="comments" id="comments">
                                     <input type="hidden" name="moduleid" id="moduleid">
                                    <a href="#" id="submitbtn" class="send">Send</a>
                                </form>
                            </div>



                    </ul>
                </li>--%>
                <%--<li>
                    <a href="#" class="icon-addnotes" id="addnotes" title="Notes">
                        <p>Notes</p>
                    </a>
                    <ul class="questionAddnotes">

                        <li>

                            <h1>Excellence Actions</h1>



                            <ul class="questionAddnumber">
                               
                            </ul>
                            <div class="clr">


                                <textarea name="bbcode_field" style="height: 100px; width: 150px; display: none;" id="Textarea1">                        </textarea>

                                <a href="#" id="savenotes" class="send">Save</a>
                            </div>



                    </ul>
                </li>--%>
            </ul>
        </div>
</asp:Content>
