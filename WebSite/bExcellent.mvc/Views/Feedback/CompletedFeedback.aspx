<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Complete Feedback
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <%--stylesheet--%>

    <link href="../../Styles/Network/reviewCoachingNotes.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />

    <%--javascripts--%>
    <script src="../../Scripts/ref/Feedback/completedfeedback.js"></script>
   <%-- <script src="https://code.jquery.com/ui/1.10.0/jquery-ui.js" type="text/javascript"></script>--%>
    <script src="../../Scripts/ref/JqueryUIFBExperience.js"></script>
    <script src="../../Scripts/plugin/jquery/jquery.form.js"></script>
    <script src="../../Scripts/ref/editor/jquery.sceditor.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery-sticklr-1.0.pack.js" type="text/javascript"></script>
    <%--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>--%>
   <%-- <script type="text/javascript" src="https://assets.yammer.com/assets/platform_js_sdk.js"></script>
    <script type="text/javascript" src="https://assets.yammer.com/assets/platform_embed.js"></script>--%>

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
        .expQuestions11 {
            background-image: url(../../Images/img/feedbackEX_slider1Hover1.png) !important;
        }

        .expQuestions12 {
            background-image: url(../../Images/img/feedbackEX_slider1Hover2.png) !important;
        }

        .expQuestions13 {
            background-image: url(../../Images/img/feedbackEX_slider1Hover3.png) !important;
        }

        .expQuestions14 {
            background-image: url(../../Images/img/feedbackEX_slider1Hover4.png) !important;
        }


        .expQuestions21 {
            background-image: url(../../Images/img/feedbackEX_slider2Hover1.png) !important;
        }

        .expQuestions22 {
            background-image: url(../../Images/img/feedbackEX_slider2Hover2.png) !important;
        }

        .expQuestions23 {
            background-image: url(../../Images/img/feedbackEX_slider2Hover3.png) !important;
        }

        .expQuestions24 {
            background-image: url(../../Images/img/feedbackEX_slider2Hover4.png) !important;
        }


         .expQuestions31 {
            background-image: url(../../Images/img/feedbackEX_slider3Hover1.png) !important;
        }

        .expQuestions32 {
            background-image: url(../../Images/img/feedbackEX_slider3Hover2.png) !important;
        }

        .expQuestions33 {
            background-image: url(../../Images/img/feedbackEX_slider3Hover3.png) !important;
        }

        .expQuestions34 {
            background-image: url(../../Images/img/feedbackEX_slider3Hover4.png) !important;
        }

        
         .expQuestions41 {
            background-image: url(../../Images/img/feedbackEX_slider4Hover1.png) !important;
        }

        .expQuestions42 {
            background-image: url(../../Images/img/feedbackEX_slider4Hover2.png) !important;
        }

        .expQuestions43 {
            background-image: url(../../Images/img/feedbackEX_slider4Hover3.png) !important;
        }

        .expQuestions44 {
            background-image: url(../../Images/img/feedbackEX_slider4Hover4.png) !important;
        }

        .expQuestions51 {
            background-image: url(../../Images/img/feedbackEX_slider5Hover1.png) !important;
        }

        .expQuestions52 {
            background-image: url(../../Images/img/feedbackEX_slider5Hover2.png) !important;
        }

        .expQuestions53 {
            background-image: url(../../Images/img/feedbackEX_slider5Hover3.png) !important;
        }

        .expQuestions54 {
            background-image: url(../../Images/img/feedbackEX_slider5Hover4.png) !important;
        }
        .sliderdiv {
            cursor: pointer;
        }
    </style>


  <%--  <input type="hidden" id="selectedpoe" />
    <input type="hidden" id="feedbackid" value="<%:ViewBag.feedbackid%>" />--%>
    <input type="hidden" id="pagemode" value="<%:ViewBag.mode%>" />
    
     <div class="sixteen wide column breadMenu">
          <div class="ui breadcrumb" id="breadcrumb">
                <a href="../Common/Index">Home</a> > <a href="../Feedback/Feedback">Feedback</a> > <a id="seletedtilevalue">Feedback on your experience</a>
          </div>
     </div>


    <div id="indicator">

        <div id="wrapper">
            <div style="clear: both;"></div>

            <div class="pageholder">

                <div id="customertiles">
                   
                    <div class="customertiles tile">
                        <h1>Feedback</h1>
                        <div class="networkTile">
                            <ul>
                                <%--<li class="videoimg selected nwTile" id="reviewCoachingNotes">

                                    <div>
                                        <img src="../../Images/fc/reviewCoachingNotesSelect.png" alt="You" class="you" id="Img1" width="61"
                                            height="61" />
                                    </div>
                                    <p id="reviewtitle">
                                        Review Coaching Notes
                                    </p>
                                </li>

                                <li class="mngrTile" id="scheduleCoachingSession">
                                    <div class="icon tripleline">
                                        <img src="../../Images/fc/scheduleCoachingSession.png" alt="Blogs" />
                                    </div>
                                    <p>
                                        Schedule<br />
                                        coaching session 
                                    </p>
                                </li>

                                <li class="mngrTile" id="yammerFeed">
                                    <div class="icon tripleline">
                                        <img src="../../Images/fc/yammerFeed.png" alt="Blogs" />
                                    </div>
                                    <p>
                                        yammer feed 
                                    </p>
                                </li>--%>
                                <li class="peerTile selected" id="feedbackonYourExperience">
                                    <div class="icon singleline">
                                        <img src="../../Images/fc/feedbackonYourExperienceSelect.png" alt="Blogs" />
                                    </div>
                                    <p>
                                        Feedback on your experience 
                                    </p>
                                </li>
                                <li class="custTile" id="reportAnIssue">
                                    <div class="icon doubleline">
                                        <img src="../../Images/fc/reportAnIssue.png" alt="Blogs" />
                                    </div>
                                    <p>
                                        Report an issue 
                                    </p>
                                </li>
                               <%-- <li class="teamTile" id="viewReports">
                                    <div class="icon doubleline">
                                        <img src="../../Images/fc/viewReports.png" alt="Blogs" />
                                    </div>
                                    <p>
                                        View Results
                                    </p>
                                </li>--%>
                                
                                <%-- <li class="mngrTile" id="returnStart">
                                    <div class="icon doubleline">
                                        
                                    </div>
                                    <p>
                                       
                                    </p>
                                </li>--%>
                            </ul>
                        </div>
                    </div>
                    <div class="completeFBRight" id="reviewCoachingNotescontainer" style="display:none">
                        <h1>Review Coaching Notes</h1>

                        <div class="reviewCoaching">

                            <div class="rcnbackground rcnPart" >

                                <ul id="poemodule" class="praticeAreaFC">
                                    <%--<li>
                                        <img src="../../Images/icons/AOProductSpecialist1_S.png" alt="Blogs" />
                                        <p>Product Guru</p>
                                    </li>

                                    <li>
                                        <img src="../../Images/icons/AOProductSpecialist1_S.png" alt="Blogs" />
                                        <p>Connected Communicator</p>
                                    </li>

                                    <li>
                                        <img src="../../Images/icons/AOProductSpecialist1_S.png" alt="Blogs" />
                                        <p>Product Guru</p>
                                    </li>

                                    <li>
                                        <img src="../../Images/icons/AOProductSpecialist1_S.png" alt="Blogs" />
                                        <p>Product Guru</p>
                                    </li>--%>
                                </ul>

                                <%--     <div class="rcnQestionArea">
                                    <div class="rcnQestion">
                                        <div class="qn">1</div>
                                        <h2>Evangelizes the Microsoft Value Proposition</h2>
                                        <p>
                                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
It has survived not only five centuries, but also the leap into electronictypesetting, remaining essentially unchanged.
                                        </p>
                                    </div>
                                    <div class="editDelet">
                                        <a href="#" class="editBtn"></a>
                                        <a href="#" class="deletBtn"></a>

                                    </div>

                                </div>

                                   <div class="rcnQestionArea">
                                    <div class="rcnQestion">
                                        <div class="qn">1</div>
                                        <h2>Evangelizes the Microsoft Value Proposition</h2>
                                        <textarea class="notesInput" placeholder="Enter your Notes..." ></textarea>

                                    </div>
                                    <div class="editDelet">
                                        <a href="#" class="saveBtn">Save</a>
                                        

                                    </div>

                                </div>


                                        <div class="rcnQestionArea">
                                    <div class="rcnQestion">
                                        <div class="qn">1</div>
                                        <h2>Evangelizes the Microsoft Value Proposition</h2>
                                        <a href="#" class="addNotesBtn">Add Notes</a>

                                    </div>
                                    <div class="editDelet">
                                        
                                        

                                    </div>

                                </div>
                                 <a href="#" class="saveOneNoteBtn">Save in OneNote</a>
                            </div>--%>
                            </div>


                        </div>
                    </div>

                    <!-------------------- Schedule Coaching Session ---------------------->

                    <div class="completeFBRight" id="scheduleCoachingSessioncontainer" style="display: none;">
                        <h1>Schedule Coaching session</h1>

                        <div class="reviewCoaching">

                            <div class="rcnbackground">

                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>

                                <div class="scheduleBtn">


                                    <a href="#">Schedule in Outlook</a>
                                    <a href="#">Lorum Ipsum</a>
                                </div>
                            </div>


                        </div>
                    </div>

                    <div class="completeFBRight" id="yammerFeedcontainer" style="display: none;">
                        <h1>Yammer Feed</h1>
                        <div class="rcnbackground" id="feedcontainer">

                        </div>
                    </div>


                    <!-------------------- View Reports ---------------------->

                    <div class="completeFBRight" id="viewReportscontainer" style="display:none">
                        <h1>View Results</h1>

                        <div class="reviewCoaching">

                            <div class="rcnbackground">

                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>

                                <div class="scheduleBtn">


                                    <a href="#" id="ViewReports">Click to View</a>

                                </div>
                            </div>


                        </div>
                    </div>



                    <!-------------------- Feedback on Your Experience ---------------------->

                    <div class="completeFBRight" id="feedbackonYourExperiencecontainer">
                        <h1>Feedback on Your Experience</h1>

                        <div class="reviewCoaching" >

                            <div class="rcnbackground experienceFB">


                                <ul class="fbexperienceQn">
                                    <%--<li>
                                        <span>1</span>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                        <div class="clr"></div>


                                    </li>

                                    <li>
                                        <span>1</span>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                        <div class="clr"></div>


                                    </li>


                                    <li>
                                        <span>1</span>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                        <div class="clr"></div>


                                    </li>--%>

                                </ul>
                                <div class="clr"></div>
                                <div class="scheduleBtn">


                                    <a href="#" id="sendfbexp">Save</a>

                                </div>
                            </div>


                        </div>
                    </div>



                    <!-------------------- Report an Issue ---------------------->

                    <div class="completeFBRight" id="reportAnIssuecontainer" style="display: none;">
                        <h1>Report an Issue</h1>

                        <div class="reviewCoaching">

                            <div class="rcnbackground reponissue">
                                <form id="report_form" enctype="multipart/form-data" action="../Feedback/ReportIssue" method="POST">
                                    <div class="reportanIssue">
                                        <input type="text" name="subject" id="subject_report" placeholder="Subject" />
                                        <textarea row="10" name="content"  id="content_report" placeholder="Enter Your message here..." ></textarea>
                                        <div>
                                            <input type="text" placeholder="Attach a file..." id="report_file" disabled="disabled" />
                                            <div class="report_input">
                                                <input type="file" name="file1" id="report_file_hid" title="browse" />
                                            </div>
                                        </div>
                                        <div class="clr"></div>
                                        <div class="scheduleBtn">
                                            <a href="javascript:;" id="sendReport">Send</a>
                                        </div>
                                    </div>

                                </form>

                                
                            </div>


                        </div>
                    </div>




                </div>

            </div>
        </div>
    </div>
        <!------------------------------------------------------------------------------>


        <div id="sticky">



            <ul id="example-2" class="sticklr">
                <%--<li>
                    <a href="#" class="connectPeersIcon" id="connectPeersIcon" title="Feedback given to">
                        <p>Feedback given to</p>
                    </a>
                    <ul class="peersPanel">

                        <li>

                            <ul id="teammembers">

                               
                            </ul>

                    </ul>
                </li>--%>
            </ul>
        </div>
</asp:Content>
