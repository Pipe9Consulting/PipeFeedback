<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Goal
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <link href="../../Styles/Goals/TrackGoals.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery-sticklr-1.0.pack.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Goal/TrackGoals.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#example-2').sticklr({
                showOn: 'click',
                stickTo: 'right'

            });

        });
    </script>
   
    <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb"><a href="../Common/Index">Home</a> > <a href="../Goal/Index">Development Priorities</a> > Track Development Progress</div>
    </div>
        <div class="pageholder">
        


<input type="hidden" id="selectedpoe" />

        <div class="stand standlaning">
            <h1>Track Development Progress</h1>

            <div class="trackTiles">
                <div class="scroll1" style="overflow: hidden; width: auto; height: 25%;">
                    <ul id="userList">
                        <li data-userid="0" class="selected" data-type='1'>
                            <div id="networktile" class="number">6</div>
                            <img class="syncu" src="../../Images/images/network-gray_h.png" width="61" height="61" alt="User"><p>Your Network</p>
                        </li>
                        <li data-userid ="<%:Session["id"].ToString() %>">
                            <div id="Youtile" class="number"   data-type='0'>2</div>
                            <img class="syncu" src="/Uploadify/LoadImageHandler.ashx?id=<%:Session["id"].ToString() %>&amp;rnd=0.18301790487021208" width="61" height="61" alt="User"><p>You</p>
                        </li>
                       <%-- <li>
                            <div class="number">50</div>
                            <img class="syncu" src="/Uploadify/LoadImageHandler.ashx?id=5&amp;rnd=0.9228112462442368" width="61" height="61" alt="User"><p>Brent Kendrick</p>
                        </li>
                        <li>
                            <div class="number">0</div>
                            <img class="syncu" src="/Uploadify/LoadImageHandler.ashx?id=3&amp;rnd=0.23867656732909381" width="61" height="61" alt="User"><p>Adrian Johnston</p>
                        </li
                        <li></li>
                        <li></li>>--%>

                    </ul>
                </div>
            </div>

        </div>



        <div class="TrackGoalsArea">

            <ul id="poemodule" class="praticeAreaFC">
                <%--<li id="li1" data-value="82" class=" selected">
                    <img src="../../Images/icons/AOProductSpecialist1.png" alt="Blogs"><p>Product Guru</p>
                </li>
                <li id="li2" data-value="83" class="">
                    <img src="../../Images/icons/AOProductSpecialist2.png" alt="Blogs"><p>Connected Communicator</p>
                </li>
                <li id="li3" data-value="84" class="">
                    <img src="../../Images/icons/AOProductSpecialist3.png" alt="Blogs"><p>Product Innovator</p>
                </li>
                <li id="li4" data-value="85" class="">
                    <img src="../../Images/icons/AOProductSpecialist4.png" alt="Blogs"><p>Relationship Builder</p>
                </li>
                  <li id="li5" data-value="85" class="">
                    <img src="../../Images/icons/AOProductSpecialist4.png" alt="Blogs"><p>Show All</p>
                </li>--%>
            </ul>

            <div class="clr"></div>
            
            <div class="scroll2">
                <div class="contentTG">
                   <%-- <div class="ea_part">

                        <ul>
                            <li>Excellence Action</li>
                            <li>Evangelizes the Microsoft Value Proposition</li>
                            <li>Develops deep product knowledge</li>
                            <li>Educates the account team</li>
                            <li>Utilizes deep insights</li>
                            <li>Creates compelling data-driven proposals</li>
                            <li>Average</li>
                        </ul>

                    </div>
                    <div class="gd_part">

                        <ul>
                            <li>Goal Date</li>
                            <li>Goal Not Set</li>
                            <li>Feb 26, 2015</li>
                            <li>April 26, 2015</li>
                            <li>May 26, 2015</li>
                            <li>June 26, 2015</li>
                            <li>Sep 26, 2015</li>
                        </ul>


                    </div>
                    <div class="gt_part">

                        <ul>
                            <li>
                                <span>Goal Timeline</span>
                            </li>
                            <li>

                                <div>
                                    <img class="trackNetwork" src="../../Images/images/network-gray_h.png" width="30" height="30" alt="User" />
                                </div>
                                <div>
                                    <img src="/Uploadify/LoadImageHandler.ashx?id=4&amp;rnd=0.18301790487021208" width="30" height="30" alt="User" />
                                </div>

                            </li>
                            <li>
                                <p>Rarely</p>
                                <p>Inconsistently</p>

                            </li>
                            <li>
                                <p>Frequently</p>
                                <p>always</p>
                            </li>
                            <li>
                                <p>Rarely</p>
                                <p>Inconsistently</p>

                            </li>
                            <li>
                                <p>Frequently</p>
                                <p>always</p>
                            </li>
                            <li>
                                <p>Rarely</p>
                                <p>Inconsistently</p>

                            </li>
                            <li>
                                <p>Inconsistently</p>
                                <p>Inconsistently</p>
                            </li>

                        </ul>


                    </div>
                    <div class="gg_part">
                        <ul>
                            <li>Goal Gap
                            </li>
                            <li>
                                <img class="trackNetwork" src="../../Images/new/gapArrow.png" width="16" height="26" alt="User" />
                                <img class="trackNetwork" src="../../Images/new/gapArrow.png" width="16" height="26" alt="User" />
                                <img class="trackNetwork" src="../../Images/new/gapArrow.png" width="16" height="26" alt="User" />
                            </li>
                            <li>
                                <img class="trackNetwork" src="../../Images/new/trackLine.png" width="16" height="26" alt="User" /></li>
                            <li>
                                <img class="trackNetwork" src="../../Images/new/gapArrow.png" width="16" height="26" alt="User" />
                                <img class="trackNetwork" src="../../Images/new/gapArrow.png" width="16" height="26" alt="User" />

                            </li>
                            <li>
                                <img class="trackNetwork" src="../../Images/new/gapArrow.png" width="16" height="26" alt="User" />

                            </li>
                            <li>
                                <img class="trackNetwork" src="../../Images/new/trackTick.png" width="16" height="26" alt="User" />
                            </li>
                            <li>
                                <img class="trackNetwork" src="../../Images/new/gapArrow.png" width="16" height="26" alt="User" />
                                <img class="trackNetwork" src="../../Images/new/gapArrow.png" width="16" height="26" alt="User" />
                            </li>
                        </ul>


                    </div>
                    <div class="tg_part">

                        <ul>
                            <li>Timeline Gap</li>
                            <li><b>24 Days Remaining</b><span class="goalTimeLine">
                                <p><span style="width: 85%;"></span></p>
                            </span></li>
                            <li><b>Goal Not Set</b><span class="goalTimeLine">
                                <p><span style="width: 1%;"></span></p>
                            </span></li>
                            <li><span class="goalNotMet">
                                <p>Goal Not Met</p>
                            </span></li>
                            <li><span class="awaitingManagerFeedback">
                                <p>Awaiting Manager Feedback</p>
                            </span></li>
                            <li><span class="goalAchieved">
                                <p>Goal Achieved</p>
                            </span></li>
                            <li><span class="goalTimeLine">
                                <p><span style="width: 25%;"></span></p>
                            </span></li>

                        </ul>


                    </div>--%>
                </div>
            </div>




        </div>
    </div>






    <div id="sticky">



        <ul id="example-2" class="sticklr">
           <%-- <li>
                <a href="#" id="eainfo" data-class="standBPInfo" class="standBPInfo" title="Track Goals Info">
                    <p>Track Development Progress</p>
                </a>

                <ul class="standTable">
                    <li>

                        <div class="patable">
                            <h1 id="PAname">Track Development Progress</h1>

                            <p>Examine your Standing at the Excellence Action level. Navigate through each Practice Area and see how your Self Feedback for each Excellence Actions compares to other groups in your role community. Use the drop down menu at the top of the screen to changes views between Community, Team, Mentors, Tenure and Previous.</p>
                        </div>
                    </li>
                </ul>





            </li>--%>







        </ul>
    </div>

</asp:Content>
