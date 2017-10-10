<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Feedback
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/themes/default.min.css" rel="stylesheet" type="text/css" />
    <%--<script src="../../Scripts/jquery-1.4.3.min.js" type="text/javascript"></script>--%>
    <script src="../../Scripts/ref/editor/jquery.sceditor.min.js" type="text/javascript"></script>
    <%--  <script src="https://code.jquery.com/ui/1.10.0/jquery-ui.js" type="text/javascript"></script>--%>
    <script type="text/javascript" src="../../Scripts/ref/JqueryUIManagerFB.js"></script>
    <script type="text/javascript" src="../../Scripts/ref/Feedback.js"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Feedback/managerfeedback.js" type="text/javascript"></script>
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/feedback/managerfeedback.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery-sticklr-1.0.pack.js" type="text/javascript"></script>


    <%--<script src="../../Scripts/ref/jquery-ui.js"></script>--%>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#example-2').sticklr({
                showOn: 'click',
                stickTo: 'right'
            });

            function closeAccordionSection() {
                $('.accordion .accordion-section-title').removeClass('active');
                $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
            }

            $('.accordion-section-title').click(function (e) {
                //$('#accordion-4').slimScroll({
                //    destroy: true
                //});
                var currentAttrValue = $(this).attr('href');
                if ($(e.target).is('.active')) {
                    closeAccordionSection();
                    //if ($(this).hasClass('profilemenu')) {
                    //    $('#accordion-4').parents('.slimScrollDiv').hide("slow");
                    //    $('#accordion-4').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                    //}

                } else {
                    closeAccordionSection();
                    $(this).addClass('active');
                    $('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
                    //if ($(this).hasClass('profilemenu')) {
                    //    $('#accordion-4').parents('.slimScrollDiv').show();
                    //    $('#accordion-4').slimscroll();
                    //}
                    //else {
                    //    $('#accordion-4').parents('.slimScrollDiv').hide("slow");
                    //    $('#accordion-4').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                    //}
                }

                e.preventDefault();
            });

        });
        function Show_Div(optionMenu) {
            if (false == $(optionMenu).is(':visible')) {
                $(optionMenu).show(250);
            }
            else {
                $(optionMenu).hide(250);
                $('.accordion-section-content').hide();
            }
        }
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
        var resultmode = "";

        if (Session["PoEResultMode"] != null)
        {
            resultmode = Session["PoEResultMode"].ToString();
        }

    %>
    <input type="hidden" id="capabilityMode" value="<%:t %>" />
    <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb">
            <a href="../Common/Index">Home</a> <a>></a><a href="../Feedback/Feedback?Mode=1">Feedback</a> <a>></a><a> Team-Feedback</a>
        </div>
    </div>
    <div class="slidebtn" id="bigslide" style="display: none;">
        <a href="#" class="prevfb" id="p1x" style="display: none">Previous</a>
        <%--<div class="pagination" id="pagetxt">
            Page 1 of 2
        </div>--%>
        <a href="#" class="nxtfb" id="bn1x" style="display: none">Next</a>
    </div>
    <div id="hiddenValues">
        <input type="hidden" id="selectedpoe" />
        <input type="hidden" id="feedbackids" />
        <input type="hidden" id="allsliderids" />
        <input type="hidden" id="selectedanswer" />
        <input type="hidden" id="selectedNotes" />
        <input type="hidden" id="selectedrating" />
        <input type="hidden" id="selectedCapability" />
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
        <input type="hidden" id="firsttimeResume" value="0" />
        <input type="hidden" id="lastsavedHours" />
        <input type="hidden" id="lastsavedMinutes" />
        <input type="hidden" id="lastsavedSeconds" />
        <input type="hidden" id="prevMode" value="0" />
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


    <div class="pageholder" id="dv">

        <div id="aboutContent" class="customertiles">
            <h1>Give Feedback
            </h1>
            <div class="scroll2">
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
        <h1 id="poemoduleName">PA Header</h1>
        <input type="button" class="button_menu menus" onclick="Show_Div(option_menu)" />
        <div id="option_menu" class="optView" style="display: none; background-color: #ffffdd; width: 400px;">

            <div class="clearfix"></div>

            <div class="main_accordin">
                <div class="accordion">

                    <div class="accordion-section" id="impdefinition">
                        <a class="accordion-section-title trackerMenu" href="#accordion-1">Importance Definitions</a>
                        <div id="accordion-1" class="accordion-section-content">

                            <div>
                                <div class="frequency">
                                    <img alt="Rarely" src="../../Images/Feedback/Icon/importants1.png"><h4>Not Important</h4>
                                    <p>
                                        Not important for success in your market.
                               
                                    </p>
                                </div>
                                <div class="frequency">
                                    <img alt="inconsistently" src="../../Images/Feedback/Icon/importants2.png"><h4>Somewhat Important</h4>
                                    <p>
                                        Somewhat important for success in your market.
                               
                                    </p>
                                </div>
                                <div class="frequency">
                                    <img alt="frequently" src="../../Images/Feedback/Icon/importants3.png"><h4>Important</h4>
                                    <p>
                                        Important for success in your market.

                               
                                    </p>
                                </div>
                                <div class="frequency">
                                    <img alt="Always" src="../../Images/Feedback/Icon/importants4.png"><h4>Critical</h4>
                                    <p>
                                        Critical for success in your market.

                                    </p>
                                </div>
                            </div>

                        </div>
                        <!--end .accordion-section-content-->
                    </div>

                    <div class="accordion-section" id="coachDateCont">
                        <a class="accordion-section-title updateMenu" href="#accordion-2">Capability Definitions</a>
                        <div id="accordion-2" class="accordion-section-content">


                            <div>
                                <div class="frequency">
                                    <img alt="Rarely" src="../../Images/Feedback/Icon/capability2.png"><h4>Not Ready</h4>
                                    <p>
                                        This team member is not ready to demonstrate this Excellence Action.

                               
                                    </p>
                                </div>
                                <div class="frequency">
                                    <img alt="inconsistently" src="../../Images/Feedback/Icon/capability1.png"><h4>Somewhat Ready</h4>
                                    <p>
                                        This team member is somewhat ready to demonstrate this Excellence Action.

                               
                                    </p>
                                </div>
                                <div class="frequency">
                                    <img alt="frequently" src="../../Images/Feedback/Icon/capability3.png"><h4>Ready</h4>
                                    <p>
                                        This team member is ready to demonstrate this Excellence Action.

                               
                                    </p>
                                </div>
                                <div class="frequency">
                                    <img alt="Always" src="../../Images/Feedback/Icon/capability4.png"><h4>Very Ready</h4>
                                    <p>
                                        This team member is very ready to demonstrate this Excellence Action.

                               
                                    </p>
                                </div>
                            </div>

                        </div>
                        <!--end .accordion-section-content-->
                    </div>
                    <!--end .accordion-section-->

                    <div class="accordion-section FrequencyMenu">
                        <a class="accordion-section-title requestMenu" href="#accordion-3">Frequency Definitions</a>
                        <div id="accordion-3" class="accordion-section-content">


                            <div>
                                <div class="frequency">
                                    <img alt="Rarely" src="../../Images/Feedback/Icon/frequency1.png"><h4>Never</h4>
                                    <p>
                                        This team member never demonstrates this Excellence Action.

                               
                                    </p>
                                </div>
                                <div class="frequency">
                                    <img alt="inconsistently" src="../../Images/Feedback/Icon/frequency2.png"><h4>Sometimes</h4>
                                    <p>
                                        This team member sometimes demonstrates this Excellence Action.

                               
                                    </p>
                                </div>
                                <div class="frequency">
                                    <img alt="frequently" src="../../Images/Feedback/Icon/frequency3.png"><h4>Frequently</h4>
                                    <p>
                                        This team member frequently demonstrates this Excellence Action.
                               
                                    </p>
                                </div>
                                <div class="frequency">
                                    <img alt="Always" src="../../Images/Feedback/Icon/frequency4.png"><h4>Always</h4>
                                    <p>
                                        This team member always demonstrates this Excellence Action.
                               
                                    </p>
                                </div>
                            </div>


                        </div>
                        <!--end .accordion-section-content-->
                    </div>
                    <!--end .accordion-section-->

                    <div class="accordion-section">
                        <a class="accordion-section-title profilemenu" href="#accordion-4">Feedback Guidance</a>
                        <div id="accordion-4" class="accordion-section-content">



                            <div>
                                <div class="frequency">
                                    <h4>Dedication</h4>
                                    <div>
                                        <span class="tickfbimg">
                                            <img src="../../Images/tick.png" /></span>
                                        <span class="tickfbtext">
                                            <p>DO provide Feedback when you have dedicated enough time and can avoid distractions</p>
                                        </span>
                                        <div class="clr2"></div>
                                        <span class="tickfbimg">
                                            <img src="../../Images/tickworng.png" /></span>
                                        <span class="tickfbtext">
                                            <p>DON’T provide Feedback when rushed or distracted </p>
                                        </span>

                                    </div>
                                </div>
                                <div class="frequency">
                                    <h4>Thoughtfulness</h4>
                                    <div>
                                        <span class="tickfbimg">
                                            <img src="../../Images/tick.png" /></span><span class="tickfbtext"><p>DO provide thoughtful responses to each question</p>
                                            </span>
                                        <div class="clr2"></div>
                                        <span class="tickfbimg">
                                            <img src="../../Images/tickworng.png" /></span><span class="tickfbtext"><p>DON’T provide clusters of the same response without justification </p>
                                            </span>

                                    </div>
                                </div>
                                <div class="frequency">
                                    <h4>Accuracy</h4>
                                    <div>
                                        <span class="tickfbimg">
                                            <img src="../../Images/tick.png" /></span> <span class="tickfbtext">
                                                <p>DO provide feedback that is accurate, honest and meaningful</p>
                                            </span>
                                        <div class="clr2"></div>
                                        <span class="tickfbimg">
                                            <img src="../../Images/tickworng.png" /></span><span class="tickfbtext"><p>DON’T provide inflated or deflated feedback to reward, influence or motivate </p>
                                            </span>

                                    </div>
                                </div>
                                <div class="frequency bottomLine">
                                    <h4>Scope</h4>
                                    <div>
                                        <span class="tickfbimg">
                                            <img src="../../Images/tick.png" /></span><span class="tickfbtext"><p>DO provide feedback that represent long-term performance</p>
                                            </span>
                                        <div class="clr2"></div>
                                        <span class="tickfbimg">
                                            <img src="../../Images/tickworng.png" /></span><span class="tickfbtext"><p>DON’T provide feedback based only on recent successes or failures</p>
                                            </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <!--end .accordion-section-content-->
                    </div>
                    <!--end .accordion-section-->
                </div>
                <!--end .accordion-->
            </div>



        </div>

        <div class="contentholder">

            <div class="slidebtn" id="sliderbtn">
            </div>
            <div class="questions">
                <ul id="questions">
                </ul>
            </div>
        </div>
    </div>





    <!------------------Right Side Panel -------------->

    <div id="sticky">



        <ul id="example-2" class="sticklr">
            <%-- <li>
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
            <%--  <li>
                <a href="#" class="icon-feedbackIntro" id="feedbackIntro" title="Profile Summary">
                    <p>Profile Summary</p>
                </a>
                <ul class="feedbackIntro">
                    <div class="profileSummary" id="profileSummary">
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

                    <div class="practiceAreaTitle">
                        <h2>Product Guru </h2>
                        <img src="../Images/icons/AOProductSpecialist1.png" />
                    </div>
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
            <li id="capabilityDefinition">

                <a href="#" class="frequencyDefinitions" id="A2">
                    <p>Capability Definitions</p>
                </a>
                <ul class="frequencydefinitions">
                    <li>
                        <div>
                            <div class="frequency">
                                <img src="../../Images/Start/importance1.png" alt="Rarely"><h4>Not Important</h4>
                                <p>
                                    Unimportant for success in your market.

                                </p>
                            </div>
                            <div class="frequency">
                                <img src="../../Images/Start/importance2.png" alt="inconsistently"><h4>Somewhat Important</h4>
                                <p>
                                    Somewhat important for success in your market.

                                </p>
                            </div>
                            <div class="frequency">
                                <img src="../../Images/Start/importance3.png" alt="frequently"><h4>Important</h4>
                                <p>
                                    Important for success in your market.


                                </p>
                            </div>
                            <div class="frequency">
                                <img src="../../Images/Start/importance4.png" alt="Always">
                                <h4>Very Important</h4>
                                <p>
                                    Very important for success in your market.

                                </p>
                            </div>
                        </div>
                    </li>
                </ul>

            </li>
            <li id="importanceDefinition" style="display: none;">

                <a href="#" class="frequencyDefinitions" id="A1">
                    <p>Importance Definitions</p>
                </a>
                <ul class="frequencydefinitions">
                    <li>
                        <div>
                            <div class="frequency">
                                <img src="../../Images/Start/importance1.png" alt="Rarely"><h4>Not Important</h4>
                                <p>
                                    Unimportant for success in your market.

                                </p>
                            </div>
                            <div class="frequency">
                                <img src="../../Images/Start/importance2.png" alt="inconsistently"><h4>Somewhat Important</h4>
                                <p>
                                    Somewhat important for success in your market.

                                </p>
                            </div>
                            <div class="frequency">
                                <img src="../../Images/Start/importance3.png" alt="frequently"><h4>Important</h4>
                                <p>
                                    Important for success in your market.


                                </p>
                            </div>
                            <div class="frequency">
                                <img src="../../Images/Start/importance4.png" alt="Always">
                                <h4>Very Important</h4>
                                <p>
                                    Very important for success in your market.

                                </p>
                            </div>
                        </div>
                    </li>
                </ul>

            </li>

            <li>
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
            </li>

            <%--<li>
                <a href="#" class="icon-mentors" id="mentors" title="Team members">
                    <p>Team members</p>
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

                                <a href="#" id="submitbtn" class="send">Send</a>
                                    <input type="hidden" name="useridslist" id="useridslist" />
                                    <input type="hidden" name="subject" id="subject" />
                                    <input type="hidden" name="comments" id="comments" />
                                    <input type="hidden" name="moduleid" id="moduleid" />
                            </form>
                        </div>



                </ul>
            </li>--%>
            <%-- <li>
                <a href="#" class="icon-addnotes" id="addnotes" title="Coaching Notes">
                    <p>Coaching Notes</p>
                </a>
                 <ul class="addnotes">

                    <li>
                        <div class="coachingscroll">

                        <ul id="Usercoachingnotes">
                           
                        </ul>
                        </div>
                        <div class="clr">
                            <span>Message:</span><br />
                            <textarea name="bbcode_field" style="height: 100px; width: 150px; display: none;" id="Textarea1">                        </textarea>
                            <a href="#" id="savenotes" class="send">Save</a>
                        </div>

                </ul>
            </li>--%>

            <%--  <li id="rateQuestion" style="display:none">
                <a href="#" class="icon-whatisrate" id="whatisrate" title="What is Rate this Question">
                    <p>What is Rate this Question</p>
                </a>
                <ul class="whatIsRate">

                
                   <p>Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book. Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book.</p>





                </ul>
            </li>--%>
        </ul>
    </div>

</asp:Content>
