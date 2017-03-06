<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Community Sync
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <%-- Slider Remove--%>
    <%--<link type="text/css" href="../../Styles/Standing/slider-spa.css" rel="stylesheet" type="text/css" />--%>
    <%-- Slider Remove--%>
    <link href="../../Styles/Standing/practicearea.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/datepicker.css" rel="stylesheet" />
    <%--<script src="../../Styles//jquery-1.10.2.js"></script>
    <script src="../../Styles//jquery-ui.js"></script>--%>
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Standing/standingSetgoals.css" rel="stylesheet" />
    <%--<script src="../../Scripts/jquery-1.4.3.min.js" type="text/javascript"></script>--%>

    <script src="../../Scripts/JqueryUI.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/editor/jquery.sceditor.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Standing/digin.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Standing/StandingPA.js"></script>
    <script src="../../Scripts/jquery-sticklr-1.0.pack.js" type="text/javascript"></script>
    <%--  <script src="../../Scripts/ref/Standing/standSetGoals.js"></script>--%>








    <script type="text/javascript">
        $(document).ready(function () {
            $('#example-2').sticklr({
                showOn: 'click',
                stickTo: 'right'

            });

            $("#accordion").accordion();
        });
    </script>


    <%-- <script src="../../Scripts/ref/myscroll.js"></script>--%>
    <style>
        #Qnosww1 .ui-slider-range {
            background-image: url(../../Images/goal-slider.png);
            cursor: pointer;
            width: 360px;
        }

        .digqn-dummy {
            width: 5.5%;
            height: 0;
            padding: 0.2% 0 5%;
            color: #ffffff;
            background: url(../../Images/be-bg.jpg) no-repeat #e5e5e5;
            text-align: center;
            font-size: 113%;
            float: left;
            margin-right: 1%;
        }

        .indexrightclose2 {
            position: absolute;
            top: -3%;
            right: 16px;
            background: url(../../images/chart/standing/plus-bg.png) no-repeat center #e0b001;
            background-size: 70% 70%;
            width: 3.5%;
            height: 0;
            padding-bottom: 3.5%;
            border-radius: 50%;
            z-index: 9;
            cursor: pointer;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#Qnosww1").slider({
                min: 0,
                max: 4,
                range: "min",
                value: 3,
                slide: function (event, ui) {
                    if (ui.value == 0) {
                        event.preventDefault();
                        $('#Qnosww1').data("answer", 1);
                    } else {
                        $('#Qnosww1').data("answer", ui.value);
                    }
                }
            });

        });
    </script>

    <%
        var h = 0;

        if (Session["NetworkPage"] != null)
        {
            h = int.Parse(Session["NetworkPage"].ToString());
        }

    %>

    <input type="hidden" id="networkMode" value="<%:h%>" />
    <input type="hidden" id="selectedpoeDigdeep" />
    <input type="hidden" id="goalSharedWith" value="0" />

    <!--Yammer Popup-->
    <input type="hidden" id="hiddentThis" />


    <%
        var t = 0;
        if (Session["SelectedPoe"] != null)
        {
            t = int.Parse(Session["SelectedPoe"].ToString());
        }


        var p = 0;
        if (Session["subid"] != null)
        {
            p = int.Parse(Session["subid"].ToString());
        }
    %>

    <input type="hidden" id="Subid" value="<%:p%>" />
    <input type="hidden" id="selectedPoeValuePotentialMentors" value="<%:t%>" />
    <input type="hidden" id="potentialMentorsType" value="0" />
    <input type="hidden" id="selectedques" />
    <input type="hidden" id="tempshareid" />



    <input type="hidden" id="qusetionid" value="0" />
    <input type="hidden" id="Answers" value="0" />
    <input type="hidden" id="pagemodes" value="1" />
    <input type="hidden" id="PoeName" value="" />
    <input type="hidden" id="choosenTile" value="0" />
    <input type="hidden" id="currIndex" value="0" />
    <input type="hidden" id="sharedUrl" value="" />
    <input type="hidden" id="sharedTitle" value="" />
    <input type="hidden" name="moduleid" id="moduleid" />
    <input type="hidden" id="controlclicked" value="0" />

    <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb">
            Home > Standing > Practice Areas
        </div>
    </div>

    <div class="popupbg">
        &nbsp;
    </div>
    <div class="popup">
        <div class="close">
        </div>
        <p id="info">
            Please select a user
        </p>
    </div>

    <div class="requestpopup" id="newpopup">
        <div class="close">
        </div>

        <p id="P2">
            Your request has been sent successfully
        </p>
        <div style="clear: both;"></div>
        <div>


            <a href="#">Email</a>
            <a href="#">PIPE9</a>
            <a href="#">Yammer</a>
        </div>
    </div>

    <%--   <div class="goalNotSaved">

            <div class="close">
                <p>X</p>
            </div>

            <div class="goalNotSavedContent">

                <h3>Setting Goal date for less than one week will not make you to comeback and reset the goal date again.</h3>
            </div>

        </div>--%>

    <%--      <div class="goalDeletePopup">

            <div class="close">
                <p>X</p>
            </div>

            <div class="goalDeleteContent">

                <h3>Are you sure you want to delete this goal?</h3>
                <div class="goalsDeletBtn">
                    <a  class="delYes" >Yes</a>
                    <a  class="delNo">No</a>
                </div>
            </div>


        </div>
    --%>



    <div id="sliderload">
    </div>
    <input type="hidden" value="0" id="pagecount" />
    <input type="hidden" value="<%:int.Parse(Session["role"].ToString()) %>" id="tileclicked" />







    <div id="primarynav">
        <%-- Module Intro Count--%>
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

        <div id="setgoalsslidecount" style='display: none;'>
        </div>
        <div id="setgoals0" style='display: none'>
        </div>
        <div id="setgoals1" style='display: none'>
        </div>
        <div id="setgoals2" style='display: none'>
        </div>
        <div id="setgoals3" style='display: none'>
        </div>
        <div id="ProgramSlideCount" style='display: none;'>
        </div>
        <div id="Program0" style='display: none;'>
        </div>
        <div id="Program1" style='display: none;'>
        </div>
        <div id="Program2" style='display: none;'>
        </div>

        <div id="Coachingslidecount" style='display: none;'>
        </div>
        <div id="Coaching0" style='display: none;'>
        </div>
        <div id="Coaching1" style='display: none;'>
        </div>
        <div id="Coaching2" style='display: none;'>
        </div>

        <div id="ConnectslideCount" style='display: none;'>
        </div>
        <div id="Connect0" style='display: none;'>
            <div id="Connnect1" style='display: none;'>
            </div>
            <div id="Connnect2" style='display: none;'>
            </div>
        </div>


    </div>



    <div class="pageholder">

        <div class="stand">

            <h1 class="lft_head">Practice Area</h1>
            <div class="standpracticeArea">
                <ul>
                    <li id="topperform" class="communitytile">
                        <p>
                            Community
                        </p>
                    </li>
                    
                    <%--<li id="comm" class="pathfinderstile">

                        <p>Mentors                   </p>
                    </li>--%>
                    <li id="tenureTile" class="tenuretile">
                        <p>
                            Tenure Group
                        </p>

                    </li>
                    <li id="nextinline" class="areaTeamtile hideboxtile">
                        <p>
                            Area Team
                        </p>
                        <span></span>
                    </li>
                    <%--<li id="prev" class="previoustile">
                        <p>Previous                    </p>
                    </li>--%>
                    <li id="allclick" class="alltile hideboxtileAll">
                        <p>
                            All
                        </p>
                        <span></span>
                    </li>
                </ul>

            </div>
        </div>
        <div class="chartholdertop" id="top">
            <h1 class="lft_head">Community -  <span id='selfCont'></span></h1>

            <div class="chartholder">
                <div class="slidebtn" id="topslide">
                    <a href="#" class="prev p1">Previous</a> <a href="#" class="prev p2">Previous</a><a href="#" class="prev p3">Previous</a>
                    <div class="pagination">
                        Page 1 of 2
                    </div>
                    <a href="#" class="nxt bn1">Next</a> <a href="#" class="nxt bn2">Next</a><a href="#" class="nxt bn3">Next</a>
                </div>
            </div>
        </div>
        <div class="chartholdertop" id="nxtline">
            <h1 class="lft_head">Area Team - <span id="areaCont"></span>
            </h1>
            <div class="chartholder">
                <div class="slidebtn" id="nxtslide">
                    <a href="#" class="prev p1">P1revious</a> <a href="#" class="prev p2">Previous</a><a href="#" class="prev p3">Previous</a>
                    <div class="pagination">
                        Page 1 of 2
                    </div>
                    <a href="#" class="nxt bn1">Next</a> <a href="#" class="nxt bn2">Next</a><a href="#" class="nxt bn3">Next</a>
                </div>
            </div>
        </div>

        <div class="chartholdertop" id="community">
            <h1 class="lft_head">Mentors -
                                <span id="mentorCont">Your Self Feedback score compared with the average Self Feedback score of others in your role community who stand within 20% of the goal.</span>
            </h1>
            <div class="chartholder">
                <div class="slidebtn" id="rest">
                    <a href="#" class="prev p1">Previous</a> <a href="#" class="prev p2">Previous</a><a href="#" class="prev p3">Previous</a>
                    <div class="pagination">
                        Page 1 of 2
                    </div>
                    <a href="#" class="nxt bn1">Next</a> <a href="#" class="nxt bn2">Next</a><a href="#" class="nxt bn3">Next</a>
                </div>
            </div>
        </div>
        <div class="chartholdertop" id="tenure">
            <h1 class="lft_head">Tenure Group -
                                 <span id="tenureCont">Your Self Feedback score compared with the average Self Feedback score of various tenure groups in your role community.</span>
            </h1>
            <div class="chartholder">
                <div class="slidebtn" id="tenures">
                    <a href="#" class="prev p1">Previous</a> <a href="#" class="prev p2">Previous</a><a href="#" class="prev p3">Previous</a>
                    <a href="#" class="prev p4">Previous</a>
                    <div class="pagination">
                        Page 1 of 2
                    </div>
                    <a href="#" class="nxt bn1">Next</a> <a href="#" class="nxt bn2">Next</a> <a href="#"
                        class="nxt bn3">Next</a><a href="#" class="nxt bn4">Next</a>
                </div>
            </div>
        </div>
        <div class="chartholdertop" id="previous">
            <h1 class="lft_head">Previous -
                                <span id="prevCont">Your Self Feedback score compared with your previous Self Feedback score.</span>
            </h1>
            <div class="chartholder">
                <div class="slidebtn" id="prevfb">
                    <a href="#" class="prev p1">Previous</a> <a href="#" class="prev p2">Previous</a><a href="#" class="prev p3">Previous</a>
                    <div class="pagination">
                        Page 1 of 2
                    </div>
                    <a href="#" class="nxt bn1">Next</a> <a href="#" class="nxt bn2">Next</a><a href="#" class="nxt bn3">Next</a>
                </div>
            </div>
        </div>
        <div class="chartholdertop" id="all">
            <h1 class="lft_head">All -
                                 <span id="allCont">A comprehensive view of your Self Feedback score compared with Community, Team, Mentors and Previous.</span>
            </h1>
            <div class="chartholder">
                <div class="slidebtn" id="allpagination">
                    <a href="#" class="prev p1">Previous</a> <a href="#" class="prev p2">Previous</a><a href="#" class="prev p3">Previous</a>
                    <a href="#" class="prev p4">Previous</a>
                    <div class="pagination">
                        Page 1 of 2
                    </div>
                    <a href="#" class="nxt bn1">Next</a> <a href="#" class="nxt bn2">Next</a> <a href="#"
                        class="nxt bn3">Next</a><a href="#" class="nxt bn4">Next</a>
                </div>
            </div>
        </div>
    </div>





    <!------------------Right Side Panel -------------->

    <div id="sticky">



        <ul id="example-2" class="sticklr">
            <%-- <li>
                <a href="#" class="standPAIcon" title="Standing PA Info">
                    <p>Standing PA Info</p>
                </a>
                <ul class="content3" id="poetraits">
                    <li>

                        <div id="accordion">
                            <h3>Standing by Practice Areas</h3>
                            <div class="spa_info">
                                <p>
                                    Each Practice Area is weighted based on its priority level for achieving excellence as defined in the Role Excellence Profile. Priority determines the number of points out of 100 that are designated to each Practice Area. Practice Areas with a higher priority level represent a larger proportion of the maximum possible points for this REP.
                                </p>
                            </div>
                            <h3 id="PAname">A&O Product Specialist</h3>
                            <div>
                                <table id="papoeContents">

                                    <tr>
                                        <th>Practice Area</th>
                                        <th>Priority</th>
                                        <th>Points</th>
                                    </tr>
                                    <tr>
                                        <td colspan="3">


                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Product Guru</td>
                                                        <td>High</td>
                                                        <td>38</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Connected Communicator</td>
                                                        <td>Medium</td>
                                                        <td>25</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Product Innovator</td>
                                                        <td>Medium</td>
                                                        <td>25</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Relationship Builder</td>
                                                        <td>Low</td>
                                                        <td>12</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <th></th>
                                        <th>100</th>
                                    </tr>
                                </table>
                            </div>
                            <h3>Self Feedback Standing</h3>
                            <div>

                                <div class="helpcontent">
                                    <div class="descinfo">

                                        <div class="hlprow">
                                            <div class="hlpheading">Community</div>
                                            <div class="hlpcont">Your Self Feedback score compared with the average Self Feedback score of your role community</div>
                                        </div>
                                        <div class="hlprow">
                                            <div class="hlpheading">Area Team</div>
                                            <div class="hlpcont">Your Self Feedback score compared with the average Self Feedback score of your team</div>
                                        </div>
                                        <div class="hlprow">
                                            <div class="hlpheading">Mentors</div>
                                            <div class="hlpcont">Your Self Feedback score compared with the average Self Feedback score of others in your role community who stand within 20% of the goal</div>
                                        </div>
                                        <div class="hlprow">
                                            <div class="hlpheading">Tenure</div>
                                            <div class="hlpcont">Your Self Feedback score compared with the average Self Feedback score of various tenure groups in your role community</div>
                                        </div>
                                        <div class="hlprow">
                                            <div class="hlpheading">Previous</div>
                                            <div class="hlpcont">Your Self Feedback score compared with your previous Self Feedback score</div>
                                        </div>
                                        <div class="hlprow">
                                            <div class="hlpheading">All</div>
                                            <div class="hlpcont">A comprehensive view of your Self Feedback score compared with Community, Team, Mentors and Previous</div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>


                    </li>
                </ul>

            </li>--%>
            <%-- <li id="rep">
                <a href="#" class="repIcon" title="REP">
                    <p>REP</p>
                </a>




                <ul class="feedbackIntro nextData">

                   
                </ul>




                <ul class="feedbackIntro beforedata">

                   
                </ul>






                <ul class="feedbackIntro">

                    
                </ul>






                <ul class="feedbackIntro">
                   
                </ul>





            </li>--%>
            <%--  <li>
                <a href="#" class="mentorIcon" title="Connect with your Mentors">
                    <p>Connect with your Mentors</p>
                </a>
                <ul class="mentorsPanel">

                    <li>





                        <ul id="seekSherpas">

                            <h2>Connect with your Mentors </h2>


                            <p>Connect with Mentors to learn about the unique ways people across the community approach new opportunities, overcome challenges, and pursue excellence in role.</p>

                       
                                <div id="seekSherpasMentors">
                                  
                                </div>
                           
                        </ul>
                        <div class="clr">


                            <textarea name="bbcode_field" style="height: 100px; width: 150px; display: none;" id="textAreaMentors">                        </textarea>

                            <a href="#" id="Button4" type="button" class="send sendReqMentors">Send </a>
                        </div>



                </ul>
            </li>--%>
            <%--<li>
                <a href="#" class="setGoalIcon" title="Set & Track Goals">
                    <p>Set & Track Goals</p>
                </a>
                <ul class="keyActions" id="setTrackGoal">
                    <div class="vs-context-menu">

                        <ul id="assigneess">
                            <li class="bold" id="sharegoalChanges">Share this Goal with:</li>
                            <li data-value="-1">Everyone</li>
                        </ul>
                    </div>


                    <li>


                        <h2>SET AND TRACK GOALS</h2>
                        <p id="setContent">Set, share, and track development goals based on the knowledge you have acquired about the practices you can adopt to achieve excellence in your role.</p>
                        

                        <div id="practiceAreaQuestions">


                            
                        </div>

                        <div class="doneBtn" id="saveGoals"><a href="#">Done</a></div>
                        <div class="goalSavedPopContent" style="display: none;">


                            <h3>Your goals have been successfully set and shared with everyone you have assigned.</h3>
                            <div class="goalsSetSaveBtn">
                                <a class="goalDateSuccessYes">OK</a>
                            </div>
                        </div>
                        <div class="goalNotSavedPopContent" style="display: none;">


                            <h3>Goals have been set,but not saved..Save the goal date by clicking the done button.</h3>
                            <div class="goalsNotSaveBtn">
                                <a class="notSaved">OK</a>
                            </div>
                        </div>


                        <div class="dummyBg" style="display: none;">
                            <h3>Your manager has to give you a feedback before you can set goals.</h3>
                        </div>

                    </li>









                </ul>
            </li>--%>
            <%--  <li>

                <a href="#" class="readinessResoucesIcon standingNav3" title="Readiness Resources">
                    <p>Readiness Resources</p>
                </a>
                <ul class="readinessResources ">
                    <div class="vs-context-menu">

                        <ul id="assignees">
                            <li class="bold" id="sharegoalChange">Share this Goal with:</li>
                            <li data-value="-1">Everyone</li>
                        </ul>
                    </div>


                    <li id="readinessAccordion">

                    


                    </li>
                </ul>

            </li>--%>
            <%-- <li>
                <a href="#" class="connectPeersIcon" title="Connect with Peers">
                    <p>Connect with Peers</p>
                </a>
                <ul class="peersPanel">

                    <li>





                        <ul class="reqFeedback">

                            <h2>Connect with your Peers </h2>


                            <p>
                                There’s nothing more powerful than feedback from peers. Connect with your peers to request feedback or learn more about the feedback you have already received.
                            </p>
                            <div class="scroll4">
                                <div id="reqFeedbackPeers">
                                  
                                </div>
                            </div>
                        </ul>


                        <div class="clr">
                            <a href="#" id="ReqFeedbackSubmit" type="button" class="send ReqFeedbackSubmit">Request Feedback</a>

                            <textarea name="bbcode_field" style="height: 100px; width: 150px; display: none;" id="textAreaPeers">                        </textarea>

                            <a href="#" id="Button4" type="button" class="send sendReqPeers">Send</a>
                        </div>



                </ul>
            </li>--%>
        </ul>
    </div>



</asp:Content>
