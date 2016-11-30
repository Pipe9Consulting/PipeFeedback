<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    FeedbackTest
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <%--stylesheet--%>

    <link href="../../Styles/Network/reviewCoachingNotes.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />

    <%--javascripts--%>

    <script src="../../Scripts/jquery-sticklr-1.0.pack.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            $('#example-2').sticklr({
                showOn: 'click',
                stickTo: 'right'
            });
        });
    </script>




    <div id="indicator">

        <div id="wrapper">
            <div style="clear: both;"></div>

            <div class="pageholder" style="padding-top: 1% !important;">

                <div id="customertiles">

                    <div class="breadcrumb">
                        <span class="net1"><a href="../Common/Index">Home </a>> <a href="../Network/Network">Network </a>> Your Network</span> <span class="net2"><a href="../Common/Index">Home
                        </a>> <a href="../Network/Network">Network </a>> You</span> <span class="net3"><a
                            href="../Common/Index">Home </a>> <a href="../Network/Network">Network </a>> Your
                                            Managers</span> <span class="net4"><a href="../Common/Index">Home </a>> <a href="../Network/Network">Network </a>> Your Team Members</span> <span class="net5"><a href="../Common/Index">Home </a>> <a href="../Network/Network">Network </a>> Your Peers</span>
                        <span class="net6"><a href="../Common/Index">Home </a>> <a href="../Network/Network">Network </a>> Your Customers &amp; Partners</span> <span class="net7"><a href="../Common/Index">Home </a>> <a href="../Network/Network">Network </a>> Yammer</span>
                    </div>
                    <div class="customertiles tile">
                        <h1>Network</h1>
                        <div class="networkTile">
                            <ul>
                                <li class="videoimg selected nwTile">

                                    <div>
                                        <img src="../../Images/fc/reviewCoachingNotes.png" alt="You" class="you" id="Img1" width="61"
                                            height="61" />
                                    </div>
                                    <p>
                                        Review Coaching Notes
                                    </p>
                                </li>

                                <li class="mngrTile">
                                    <div class="icon tripleline">
                                        <img src="../../Images/fc/scheduleCoachingSession.png" alt="Blogs" />
                                    </div>
                                    <p>
                                        Schedule<br />
                                        coaching session 
                                    </p>
                                </li>

                                <li class="mngrTile">
                                    <div class="icon tripleline">
                                        <img src="../../Images/fc/yammerFeed.png" alt="Blogs" />
                                    </div>
                                    <p>
                                        yammer feed 
                                    </p>
                                </li>
                                <li class="teamTile">
                                    <div class="icon doubleline">
                                        <img src="../../Images/fc/viewReports.png" alt="Blogs" />
                                    </div>
                                    <p>
                                        View Reports
                                    </p>
                                </li>
                                <li class="peerTile">
                                    <div class="icon singleline">
                                        <img src="../../Images/fc/feedbackonYourExperience.png" alt="Blogs" />
                                    </div>
                                    <p>
                                        Feedback on your experience 
                                    </p>
                                </li>
                                <li class="custTile">
                                    <div class="icon doubleline">
                                        <img src="../../Images/fc/reportAnIssue.png" alt="Blogs" />
                                    </div>
                                    <p>
                                        Report an issue 
                                    </p>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="completeFBRight">
                        <h1>Review Coaching Notes</h1>

                        <div class="reviewCoaching">

                            <div class="rcnbackground">

                                <ul class="praticeAreaFC">
                                    <li>
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
                                    </li>
                                </ul>


                                <div class="rcnQestionArea">
                                    <div class="rcnQestion">
                                        <div class="qn">1</div>
                                        <h2>Evangelizes the Microsoft Value Proposition</h2>
                                        <p>
                                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronictypesetting, remaining essentially unchanged.
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
              <li>
                <a href="#" class="connectPeersIcon" title="Site switcher">
                    <p>Connect with Peers</p>
                </a>
                <ul class="peersPanel">

                    <li>





                        <ul id="Ul2">

                            <h2>Connect with your Mentors </h2>


                            <p>
                                There’s nothing more powerful than feedback from peers. Connect with your peers to request feedback or learn more about the feedback you have already received.
                            </p>

                            <li data-value="782" class="usersconnect"><a href="#">
                                <img src="#" width="95" height="95" alt="User"><span></span><p class="spanname">Mike Wilson</p>
                            </a></li>
                            <li data-value="776" class="usersconnect"><a href="#">
                                <img src="#" width="95" height="95" alt="User"><span></span><p class="spanname">Mike Wilson</p>
                            </a></li>
                            <li data-value="780" class="usersconnect"><a href="#">
                                <img src="#" width="95" height="95" alt="User"><span></span><p class="spanname">Mike Wilson</p>
                            </a></li>
                            <li data-value="812" class="usersconnect"><a href="#">
                                <img src="#" width="95" height="95" alt="User"><span></span><p class="spanname">Mike Wilson</p>
                            </a></li>
                            <li data-value="791" class="usersconnect"><a href="#">
                                <img src="#" width="95" height="95" alt="User"><span></span><p class="spanname">Mike Wilson</p>
                            </a></li>
                            <li data-value="815" class="usersconnect"><a href="#">
                                <img src="#" width="95" height="95" alt="User"><span></span><p class="spanname">Mike Wilson</p>
                            </a></li>
                            <li data-value="869" class="usersconnect"><a href="#">
                                <img src="#" width="95" height="95" alt="User"><span></span><p class="spanname">Mike Wilson</p>
                            </a></li>
                            <li data-value="773" class="usersconnect"><a href="#">
                                <img src="#" width="95" height="95" alt="User"><span></span><p class="spanname">Mike Wilson</p>
                            </a></li>
                            <li data-value="772" class="usersconnect"><a href="#">
                                <img src="#" width="95" height="95" alt="User"><span></span><p class="spanname">Jeff Dickstein</p>
                            </a></li>
                        </ul>


                        <div class="clr">
                            <a href="#" class="send">Request Feedback</a>

                            <textarea name="bbcode_field" style="height: 100px; width: 150px; display: none;" id="Textarea2">                        </textarea>

                            <a href="#" class="send">Send</a>
                        </div>



                </ul>
            </li>







        </ul>
    </div>

</asp:Content>
