<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Feedback
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/themes/default.min.css" rel="stylesheet" type="text/css" />
    <%--<script src="../../Scripts/jquery-1.4.3.min.js" type="text/javascript"></script>--%>
    <script src="../../Scripts/ref/editor/jquery.sceditor.min.js" type="text/javascript"></script>
    <%-- <script src="https://code.jquery.com/ui/1.10.0/jquery-ui.js" type="text/javascript"></script>--%>
    <script type="text/javascript" src="../../Scripts/ref/JqueryUI.js"></script>
    <script type="text/javascript" src="../../Scripts/ref/Feedback.js"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery-sticklr-1.0.pack.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Feedback/takefeedbackdv.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Feedback/jquery.mCustomScrollbar.concat.min.js"></script>
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/feedback/detailedview.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/feedback/jquery.mCustomScrollbar.css" rel="stylesheet" />
    <link href="../../Styles/feedback/surveyFb.css" rel="stylesheet" />
    <script type="text/javascript">
        $(document).ready(function () {
            $('#example-2').sticklr({
                showOn: 'click',
                stickTo: 'right'
            });
        });
    </script>
    <style>
        .sliderdiv .ui-slider-range {
            background-image: url(../../Images/img/slidebg2.png);
            cursor: pointer;
        }

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

        .sliderdivRateQuestion1 {
            background-image: url(../../Images/Feedback/selfImp_1.png) !important;
        }

        .sliderdivRateQuestion2 {
            background-image: url(../../Images/Feedback/selfImp_2.png) !important;
        }

        .sliderdivRateQuestion3 {
            background-image: url(../../Images/Feedback/selfImp_3.png) !important;
        }

        .sliderdivRateQuestion4 {
            background-image: url(../../Images/Feedback/selfImp_4.png) !important;
        }

        .sliderdivCapQuestion1 {
            background-image: url(../../Images/Feedback/cap2-1.png) !important;
        }

        .sliderdivCapQuestion2 {
            background-image: url(../../Images/Feedback/cap2-2.png) !important;
        }

        .sliderdivCapQuestion3 {
            background-image: url(../../Images/Feedback/cap2-3.png) !important;
        }

        .sliderdivCapQuestion4 {
            background-image: url(../../Images/Feedback/cap2-4.png) !important;
        }

        .sliderdivSurveyQuestion1 {
            background-image: url(../../Images/img/survey_1.png) !important;
        }

        .sliderdivSurveyQuestion2 {
            background-image: url(../../Images/img/survey_2.png) !important;
        }

        .sliderdivSurveyQuestion3 {
            background-image: url(../../Images/img/survey_3.png) !important;
        }

        .sliderdivSurveyQuestion4 {
            background-image: url(../../Images/img/survey_4.png) !important;
        }

        .sliderdivSurveyQuestion5 {
            background-image: url(../../Images/img/survey_5.png) !important;
        }

        .sliderdiv {
            cursor: pointer;
        }

        
    </style>
    <%
        var t = 0;

        if (Session["SelectedCapability"] != null)
        {
            t = int.Parse(Session["SelectedCapability"].ToString());
        }
        var survey = 0;

        if (Session["SelectedSurvey"] != null)
        {
            survey = int.Parse(Session["SelectedSurvey"].ToString());
        }
        var poe = 0;

        if (Session["SelectedPoe"] != null)
        {
            poe = int.Parse(Session["SelectedPoe"].ToString());
        }
        var resultmode = "";

        if (Session["PoEResultMode"] != null)
        {
            resultmode = Session["PoEResultMode"].ToString();
        }

    %>

    <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb">
            <a href="../Common/Index">Home </a>><a href="../Feedback/Feedback?Mode=2"> Feedback </a>><a> Self-Feedback </a>
        </div>
    </div>

    <div class="slidebtn" id="bigslide">
        <a href="#" class="prevfb" id="p1x" style="display: none">Previous</a>

        <a href="#" class="nxtfb" id="bn1x" style="display: none">Next</a>
    </div>
    <div id="hiddenValues">
        <input type="hidden" id="selectedpoe" />
        <input type="hidden" id="capabilityMode" value="<%:t %>" />
        <input type="hidden" id="surveyMode" value="<%:survey %>" />
        <input type="hidden" id="selectPoe" value="<%:poe %>" />
        <input type="hidden" id="selectedanswer" />
        <input type="hidden" id="selectedrating" />
        <input type="hidden" id="selectedCapability" />
        <input type="hidden" id="selectedNotes" />
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
        <input type="hidden" id="currentquestions" value="1" />
        <input type="hidden" id="firstTime" value="1" />
        <input type="hidden" id="currentquestionid" />
        <input type="hidden" id="lastsavedHours" />
        <input type="hidden" id="lastsavedMinutes" />
        <input type="hidden" id="lastsavedSeconds" />
        <input type="hidden" id="prevMode" value="0" />
        <input type="hidden" id="totalsurveQuestions" />
        <input type="hidden" id="userratingcount" />
        <input type="hidden" id="totalsurveSubQuestions" />
        <input type="hidden" id="resultmode" value="<%:resultmode %>" />
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

        <ul id="conektul" style="display: none;">
            <li><a class="nav8" href="#">
                <div class="tooltip connekt">
                    Connect
                </div>
                <img src="../../Images/icons/connect.png" alt="Nav8" /></a></li>
        </ul>
    </div>
    <%-- <div class="slideout">
        <div class="slidecontent">
            <div id="ajax-content">
            </div>
            <div id="poeintrodiv">
                <h2>REP Intro</h2>
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
    </div>--%>
    <%--<div class="slideout1">
        <div class="slidecontent1">
            <h1>Connect</h1>
            <ul id="connectmembrs">
            </ul>
            <div class="clr">
            </div>
            <form action="/Feedback/ConnectPost" id="PostComments" enctype="multipart/form-data">
                <textarea name="bbcode_field" style="height: 150px; width: 317px;" id="txtareas">
                        </textarea>
                <input name="" type="button" value="Send" class="btn" id="submitbtn" />
                <input type="hidden" name="useridslist" id="useridslist" />
                <input type="hidden" name="subject" id="subject" />
                <input type="hidden" name="comments" id="comments" />
                <input type="hidden" name="moduleid" id="moduleid" />
            </form>
        </div>
        <div id="right">
        </div>
    </div>--%>
    <div class="pageholder" id="dv" style="visibility: hidden">

        <div id="aboutContent" class="customertiles">

            <h1>Self-Feedback         </h1>
            <div class="scroll1">
                <ul id="poemodule">


                    <%--<li class="AOAccountExecutive1Tile selectAOAccountExecutive1" id="li1" data-value="82">
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
            <h1 class="contenttake" id="poemoduleName">Take Self Feedback         </h1>
            <div class="managerFeedbackArea">
                <div class="slidebtn" id="sliderbtn">
                </div>
                <div class="questions">
                    <ul id="questions" style="display: block;">
                        <%-- <li id="q1" style="overflow: hidden; display: none;" value="6">
                        <div class="questiontaken">Question 6/25</div>
                        <div class="timetakencontainer">
                            <div class="timetaken">| Time taken: </div>
                            <div class="counterHour">00</div>
                            <div class="collan">:</div>
                            <div class="counterMin">00</div>
                            <div class="collan">:</div>
                            <div class="counterSec">15</div>
                        </div>
                        <div class="clr"></div>
                        <div class="qn">1</div>
                        <div class="questionarea detailedarea">
                            <h2>Conducts proactive meetings</h2>
                            <p>Best performing PS's conduct proactive business meetings with clients to improve business understanding, develop relationships and build a network of contacts within the account.</p>
                            <div class="sliderimg">
                                <div class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" id="Qno1" aria-disabled="false" style="width: 562px; height: 62px; cursor: pointer;" data-moduleid="83" data-question="422">
                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                    <a class="ui-slider-handle ui-state-default ui-corner-all" style="left: 25%;" href="#"></a>
                                </div>
                                <div class="SI2">Slide the scale to the frequency that represents how often this Excellence Indicator is demonstrated</div>
                            </div>
                        </div>
                    </li>

                    <li id="q8" value="13">
                        <div class="questiontaken">Question 13/25</div>
                        <div class="timetakencontainer">
                            <div class="timetaken">| Time taken: </div>
                            <div class="counterHour">00</div>
                            <div class="collan">:</div>
                            <div class="counterMin">00</div>
                            <div class="collan">:</div>
                            <div class="counterSec">15</div>
                        </div>
                        <div class="clr"></div>
                        <div class="qn">8</div>
                        <div class="questionarea detailedarea">
                            <h2>Identifies revenue blockers</h2>
                            <p>Best performing PS's communicate win/loss feedback on closed opportunities to the broader team/management so they can understand the impact of blockers to revenue (what’s making a difference).</p>

                            <div class="rateThisQuestion">
                                <div class="SI">Rate This Question</div>

                                <div class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" id="Div1" aria-disabled="false" style="width: 562px; height: 62px; cursor: pointer;" data-moduleid="83" data-question="429">
                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                    <a class="ui-slider-handle ui-state-default ui-corner-all" style="left: 25%;" href="#"></a>
                                </div>

                            </div>

                            <div class="sliderimg">
                                <div class="sliderdiv ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" id="Qno8" aria-disabled="false" style="width: 562px; height: 62px; cursor: pointer;" data-moduleid="83" data-question="429">
                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 25%;"></div>
                                    <a class="ui-slider-handle ui-state-default ui-corner-all" style="left: 25%;" href="#"></a>
                                </div>
                                <div class="SI">Slide the scale to the frequency that represents how often this Excellence Indicator is demonstrated</div>
                            </div>
                        </div>
                    </li>--%>
                    </ul>
                    <%--<div class="frequencydiv">
                    <h2>What is rate this question?</h2>
                    <p>Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book. Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book.</p>


                    <h2>Frequency Definitions</h2>
                    <div class="frequency">
                        <img src="../../Images/rarely.png" alt="Rarely" /><h3>Rarely</h3>
                        <p>
                            The Excellence Indicator is seldom observed or produced as a measure of success
                        (Less than 20% of the time)
                        </p>
                    </div>
                    <div class="frequency">
                        <img src="../../Images/inconsistently.png" alt="inconsistently" /><h3>In-Consistently</h3>
                        <p>
                            The Excellence Indicator is only observed or produced some of the time as a measure
                        of success (less than 60% of the time)
                        </p>
                    </div>
                    <div class="frequency">
                        <img src="../../Images/frequently.png" alt="frequently" /><h3>Frequently</h3>
                        <p>
                            The Excellence Indicator is consistently observed or produced as a measure of success
                        (less than 90% of the time)
                        </p>
                    </div>
                    <div class="frequency">
                        <img src="../../Images/always.png" alt="Always" />
                        <h3>Always</h3>
                        <p>
                            The Excellence Indicator is always observed or produced as a measure of success
                        </p>
                    </div>
                </div>--%>
                </div>
            </div>


            <!--------------------------Sticky SideBar------------------------------>




            <div id="sticky">

                <input type="hidden" name="useridslist" id="Hidden1" />
                <input type="hidden" name="subject" id="Hidden2" />
                <input type="hidden" name="comments" id="Hidden3" />
                <input type="hidden" name="moduleid" id="Hidden4" />

                <ul id="example-2" class="sticklr">
                    <%--<li>
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
                    <%-- <li>
                            <a href="#" class="icon-practiceAreasIntro" id="practiceAreasIntro" title="Practice Area Intro">
                                <p>Practice Area Intro</p>
                            </a>
                            <ul class="practiceAreaIntro">

                               <div class="practiceAreaTitle"> <h2>Product Guru </h2><img src="../Images/icons/AOProductSpecialist1.png" /></div>
                                <p>Best performing PS's evangelize the Microsoft value proposition and tell the product story in context to marketers, agencies and industry. On an ongoing basis, the PS partners with and educates the account team, offering product expertise and solutions opportunities, while explaining the benefits of how products add value to the customer and fit within the Microsoft story. PS's also identify and leverage data on trends, the competitive landscape, and ongoing marketplace intelligence within solution focus area to develop a deep understand of the solution and audience. The best performing PS's develops, maintains and passionately shares domain-specific expertise internally within Microsoft, externally with agencies/advertisers, and with the market at large. </p>





                            </ul>
                        </li>--%>
                    <%--<li>
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

                    <%--  <li>
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
                                             <input type="hidden" name="useridslist" id="useridslist" />
                                             <input type="hidden" name="subject" id="subject" />
                                             <input type="hidden" name="comments" id="comments" />
                                             <input type="hidden" name="moduleid" id="moduleid" />
                                            <a href="#" id="submitbtn" class="send">Send</a>
                                        </form>
                                    </div>



                            </ul>
                        </li>
                        <li>
                            <a href="#" class="icon-addnotes" id="addnotes" title="Add Notes">
                                <p>Add Notes</p>
                            </a>
                            <ul class="addnotes">
                                
                                 <textarea name="bbcode_field" style="height: 100px; width: 150px; display: none;" id="usernotes">                        </textarea>

                                            <a href="javascript:;" id="savenotes" class="send">Save</a>
                            </ul>
                        </li>--%>
                </ul>
            </div>

        </div>
    </div>
</asp:Content>
