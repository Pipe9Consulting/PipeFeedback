<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Start
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <script src="../../Scripts/start.js" type="text/javascript"></script>
    <input type="hidden" id="subidStart" value="0" />
    <input type="hidden" id="poeId" value="0" />
    <input type="hidden" id="selectedpoe" />
    <input type="hidden" id="latestSelfScore" value="0" />
    <input type="hidden" id="mappingids" value="0" />
    <% var t = 0;
       if (Session["SelectedPoe"] != null)
       {
           t = int.Parse(Session["SelectedPoe"].ToString());
       }
       var resultmode = "";

       if (Session["PoEResultMode"] != null)
       {
           resultmode = Session["PoEResultMode"].ToString();
       }
    %>
    <input type="hidden" id="selectedPoelist" value="<%:t%>" />
    <input type="hidden" id="resultmode" value="<%:resultmode %>" />
    <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb">
            <a class="section" href="../Common/Index">Home</a>
            <i>></i>
            <a class=" section" href="../Common/Index">Start</a>


        </div>
    </div>




    <div class="sixteen wide column StartTitle">
        <h1>Start</h1>
    </div>




    <div class="ui grid centerPart">
        <div class="ui grid startPart">
            <div class="doubling four column row startColumn">

                <div class="column" style="display: none;">
                    <h1>YOU</h1>
                </div>
                <div class="column">
                    <h1><span>1</span>Get Started</h1>
                </div>
                <div class="column">
                    <h1 class="viewResults"><span>2</span>View Results</h1>
                </div>
                <div class="column">
                    <h1 class="plandevelopment"><span>3</span>Plan Development</h1>
                </div>


            </div>

            <div class="doubling four column row startColumn">

                <div class="column " style="display: none;">
                    <div class="startBox profile">


                        <div class="startTextArea">
                            <h3>Your Profile</h3>
                            <p>Manage your profile</p>
                        </div>

                        <% if (ViewBag.userImage.Length <= 1) %>
                        <%{ %>
                        <div class="noticationIcon">

                            <img src="../../Images/start/info_icon.png" title="You Haven't Set Your Profile Picture Yet In Your Network Page" alt="Notification" />

                        </div>
                        <%} %>
                    </div>
                </div>

                <div class="column " id="selfFbStart">




                    <%-- <%if (ViewBag.notificationResult.Feedback)
                          {%>
                        <div class="noticationIcon">

                            <img src="../../Images/images/notificationIcon.png" title="You Got New Notifications Pending In Your Feedback Page" alt="Notification" />

                        </div>

                        <%}%>--%>
                    <div class="startBox feedback" id="selffeed">
                        <div class="star_content">

                            <div class="noticationIcon" id="selfincomplete">
                                <%--<span class="Star_Icon">*</span><p class="star_name" onmouseover='$("#hover_content8").show();' onmouseout='$("#hover_content8").hide();'>Incomplete Self-Feedback</p>--%>
                            </div>
                            <div id="hover_content8">
                                Complete Self-feedback based on the Excellence Profile for the role you perform
                            <span>
                                <img src="../../Images/start/hover_arrow_up.png" /></span>
                            </div>

                        </div>
                        <div class="startTextArea">
                            <h3>Complete
                                <br />
                                Self-Feedback</h3>
                        </div>
                        <div class="noticationIcon">

                            <img src="../../Images/start/info_icon.png" onmouseover='$("#hover_content1").show();' onmouseout='$("#hover_content1").hide();' alt="Notification" />


                        </div>
                        <div id="hover_content1">
                            Complete Self-feedback based on the Excellence Profile for the role you perform
                            <span>
                                <img src="../../Images/start/hover_arrow.png" /></span>
                        </div>

                    </div>
                    <div class="" id="selfHide"></div>
                </div>

                <div class="column ">
                    <div class="startBox standing">
                        <div class="star_content">
                            <div class="noticationIcon">
                                <%--<span class="Star_Icon">*</span><p class="star_name">New Views Available</p>--%>
                            </div>
                        </div>

                        <div class="startTextArea">
                            <h3>Results</h3>
                            <%--<p>Compare results with the Community </p>--%>
                        </div>
                        <%--<%if (ViewBag.notificationResult.Standing)
                          {%>
                        <div class="noticationIcon">
                            <img src="../../Images/images/notificationIcon.png" title="You Got New Notifications Pending In Your Standing Page" alt="Notification" />
                        </div>
                        <%}%>--%>

                        <div class="noticationIcon">

                            <img src="../../Images/start/info_icon.png" onmouseover='$("#hover_content2").show();' onmouseout='$("#hover_content2").hide();' alt="Notification" />


                        </div>
                        <div id="hover_content2">
                            After completing Self-Feedback or providing Team-Feedback, use Results to get a better understanding of the view options that are available to you.
                            <span>
                                <img src="../../Images/start/hover_arrow.png" /></span>
                        </div>



                    </div>
                    <div class="bigtilehides"></div>
                </div>

                <div class="column ">
                    <div class="startBox goal">

                        <div class="star_content">
                            <div class="noticationIcon" id="devPrioritiesAvail">
                               <%-- <span class="Star_Icon">*</span><p class="star_name">New Views Available</p>--%>
                            </div>
                        </div>
                        <div class="startTextArea">
                            <h3>Development Priorities</h3>
                            <%-- <p>View Development Priorities and set Goals</p>--%>
                        </div>
                        <%--  <%if (ViewBag.notificationResult.Goals)
                          {%>
                        <div class="noticationIcon">
                            <img src="../../Images/images/notificationIcon.png" title="View Development Priorities and Set Goals" alt="Notification" />
                        </div>
                        <%}%>--%>

                        <div class="noticationIcon">

                            <img src="../../Images/start/info_icon.png" onmouseover='$("#hover_content3").show();' onmouseout='$("#hover_content3").hide();' alt="Notification" />


                        </div>
                        <div id="hover_content3">
                            View the Development Priorities that have been identified for you or the members of your team.
                            <span>
                                <img src="../../Images/start/hover_arrow.png" /></span>
                        </div>



                    </div>
                    <div class="bigtilehides"></div>
                </div>

            </div>

            <div class="doubling four column row startColumn2">

                <div class="column">
                    <div class="startBox network networks" id="teamfeed">
                        <div class="star_content">

                            <div class="noticationIcon" id="incompleteTeamFb">
                                <%--<span class="Star_Icon">*</span><p class="star_name" onmouseover='$("#hover_content9").show();' onmouseout='$("#hover_content9").hide();'>Team-Feedback Required:8</p>--%>
                            </div>
                            <div id="hover_content9">
                                Complete Self-feedback based on the Excellence Profile for the role you perform
                            <span>
                                <img src="../../Images/start/hover_arrow_up.png" /></span>
                            </div>

                        </div>

                        <div class="startTextArea">
                            <h3>Provide
                                <br />
                                Team-Feedback</h3>

                        </div>

                        <div class="noticationIcon">

                            <img src="../../Images/start/info_icon.png" onmouseover='$("#hover_content4").show();' onmouseout='$("#hover_content4").hide();' alt="Notification" />


                        </div>
                        <div id="hover_content4">
                            Provide Team-Feedback for each member of your team based on the Excellence Profile for the role they perform.
                            <span>
                                <img src="../../Images/start/hover_arrow.png" /></span>
                        </div>

                    </div>
                    <div class="" id="teamHide"></div>
                </div>

                <div class="column ">
                    <div class="startBox managerSync">
                            <div class="star_content star_sync">
                            <div class="noticationIcon" id="managerSyncavail">
                               <%-- <span class="Star_Icon">*</span><p class="star_name">New Views <br />Available</p>--%>
                            </div>
                        </div>

                        <div class="startTextArea">
                            <h3>Manager
                                <br />
                                Sync</h3>
                            <%-- <p>View your assessment results</p>--%>
                        </div>


                        <div class="noticationIcon">

                            <img src="../../Images/start/info_icon.png" onmouseover='$("#hover_content5").show();' onmouseout='$("#hover_content5").hide();' alt="Notification" />


                        </div>
                        <div id="hover_content5">
                            Manager Sync is a view option that enables you  to identify perception gaps. For Managers, it provides a comparison of the Self-Feedback of your Team Members and the Team-Feedback you have provided to them.
                            <span>
                                <img src="../../Images/start/hover_arrow.png" /></span>
                        </div>


                        <span class="smalltilehide"></span>

                    </div>


                    <div class="startBox communitySync">

                            <div class="star_content star_sync">
                            <div class="noticationIcon">
                                <%--<span class="Star_Icon">*</span><p class="star_name">New Views <br />Available</p>--%>
                            </div>
                        </div>
                        <div class="startTextArea">
                            <h3>Community
                                <br />
                                Sync</h3>
                            <%-- <p>View your assessment results</p>--%>
                        </div>


                        <div class="noticationIcon">

                            <img src="../../Images/start/info_icon.png" onmouseover='$("#hover_content6").show();' onmouseout='$("#hover_content6").hide();' alt="Notification" />


                        </div>
                        <div id="hover_content6">
                            Community Sync is a view option that enables you to compare Feedback results with the Role Community average, as well as the averages for your Area and Tenure group.
                            <span>
                                <img src="../../Images/start/hover_arrow.png" /></span>
                        </div>

                        <span class="smalltilehide"></span>


                    </div>

                </div>


                <div class="column ">
                    <div class="startBox sync">
                            <div class="star_content">
                            <div class="noticationIcon">
                              <%--  <span class="Star_Icon">*</span><p class="star_name">New Views Available</p>--%>
                            </div>
                        </div>

                        <div class="startTextArea">
                            <h3>Track Development Progress</h3>
                            <%-- <p>Compare Self Assessment and Manager Feedback results</p>--%>
                        </div>

                        <div class="noticationIcon">

                            <img src="../../Images/start/info_icon.png" onmouseover='$("#hover_content7").show();' onmouseout='$("#hover_content7").hide();' alt="Notification" />


                        </div>
                        <div id="hover_content7">
                            Track the progress of your development or the development of your team members.
                            <span>
                                <img src="../../Images/start/hover_arrow.png" /></span>
                        </div>



                        <%-- <%if (ViewBag.notificationResult.Sync) %>
                        <% { %>
                        <div class="noticationIcon">
                            <img src="../../Images/images/notificationIcon.png" title="You Got New Notifications Pending In Your Sync Page" alt="Notification" />
                        </div>
                        <% } %>--%>
                    </div>
                    <div class="bigtilehides newNotify"></div>
                </div>
                <%if (Session["domain"] != null && Session["domain"].ToString() != "microsoft.com")
                  {%>





                <%--<div class="column ">
                    <div class="startBox mentor">


                        <div class="startTextArea">
                            <h3>Mentors</h3>
                            <p>Connect with your Manager or Potential Mentors in your Community</p>
                        </div>
                        <% if (ViewBag.notificationResult.Mentor)
                           {%>
                        <div class="noticationIcon">
                            <img src="../../Images/start/info_icon.png" title="You Got New Notifications Pending In Your Sync Page" alt="Notification" />
                        </div>

                        <% } %>
                    </div>
                </div>--%>
                <% } %>
            </div>

            <div class="doubling four column row startColumn3" style="display: none;">

                <div class="column">
                    <div class="startBox wall">


                        <div class="startTextArea">
                            <h3>Your Wall</h3>
                            <%-- <p>View the activity happening in your Network</p>--%>
                        </div>
                        <%-- <%if (ViewBag.notificationResult.Wall)%>
                        <% { %>
                        <div class="noticationIcon">
                            <img src="../../Images/images/notificationIcon.png" title="You Got New Notifications Pending In Your Wall Page" alt="Notification" />
                        </div>
                        <%  } %>--%>
                        <div class="noticationIcon">

                            <img src="../../Images/start/info_icon.png" title="You Got New Notifications Pending In Your Feedback Page" alt="Notification" />

                        </div>
                    </div>
                </div>


            </div>


        </div>
    </div>


</asp:Content>
