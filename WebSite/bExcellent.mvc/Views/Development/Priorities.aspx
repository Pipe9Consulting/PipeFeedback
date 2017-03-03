<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Priorities
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/Devpriorities/bootstrap.min.css" rel="stylesheet" />
    <link href="../../Styles/Devpriorities/priorities.css" rel="stylesheet" />
    <link href="../../Styles/jquery-ui-1.8.21.css" rel="stylesheet" />
    <script src="../../Scripts/ref/jquery-ui.js"></script>
    <script src="../../Scripts/ref/DevPriorities/jshashtable.js"></script>
    <script src="../../Scripts/ref/DevPriorities/jquery.flapper.js"></script>
    <script src="../../Scripts/ref/DevPriorities/devPriorities.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#profileListsView').slimscroll();
            $('#devPrioritiesCont').slimscroll();
        });
    </script>



    <script>
        if ($('.hover_content').length != 0) {

            var offset = this.container.offset();
            this.dropdown.css({
                "top": (offset.top + dd_top) + "px",
                "left": offset.left + "px",
                "display": "block"
            });

        } else {

            this.dropdown.css({
                "top": dd_top + "px",
                "left": 0
            });

        }
    </script>
    <div class="breadcrumb">
        <a href="../Common/Index">Home </a>
        <i>&nbsp>&nbsp</i>
        <a href="../Development/Development">Development</a>
        <i>&nbsp>&nbsp</i>
        <a href="../Development/Priorities">Priorities</a>
    </div>

    <div class="container-fluid">
        <%
            var t = 0;

            if (Session["SelectedPoe"] != null)
            {
                t = int.Parse(Session["SelectedPoe"].ToString());
            }

        %>
        <%
            var cap = 0;

            if (Session["CapabilityMode"] != null)
            {
                cap = int.Parse(Session["CapabilityMode"].ToString());
            }

        %>
        <input type="hidden" id="selectedPoeId" value="<%:t%>" />
        <input type="hidden" id="selectedCapMode" value="<%:cap%>" />
        <input type="hidden" id="userMode" />
        <input type="hidden" id="teammberName" />
        <input type="hidden" id="fullname" />
        <input type="hidden" id="devPrioritiesLength" value="0" />
        <input type="hidden" id="selectPoe" value="0" />
        <input type="hidden" id="scaleMode" value="0" />
        <div class="row">

            <div class="col-sm-3">
                <div class="priorities_tiles">
                    <h2>PRIORITIES</h2>
                    <ul id="prioritiesView">
                        <li class="listview selectList">
                            <p>Priorities List</p>
                        </li>
                        <%--  <li class="profileview">
                            <p>Profile View</p>
                        </li>--%>
                    </ul>
                </div>
                <div class="user_tiles" id="overallUserList" style="display: none">
                    <h2>Team Members</h2>
                    <ul id="usrList">
                    </ul>
                </div>
            </div>
            <div class="col-sm-9 priorities_part2 hidScaleTracker" id="addClassforhide">
                <%--  <h1>lorum Ipsum <span>- Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</span></h1>--%>
                <input type="button" id="dropmenus" class="button_menu menus" onclick="Show_Div(option_menu)" />

                <div id="option_menu" class="optView" style="display: none; background-color: #ffffdd; width: 400px;">

                    <div class="clearfix"></div>
                    <a href="#" id="capScale" class="cap_scale">Capability Scale</a>
                    <div class="main">
                        <div class="accordion">

                            <div class="accordion-section" id="trackerArea">
                                <a class="accordion-section-title trackerMenu" href="#accordion-1">Time Tracker</a>
                                <div id="accordion-1" class="accordion-section-content">

                                    <a href="#" id="showscaleView" class="boardView scaleViews">Timeline View</a>
                                    <a href="#" id="showboardView" class="boardView">Countdown View</a>

                                    <a href="#" id="showTracker" class="tracker_show">Show Tracker</a>


                                </div>
                                <!--end .accordion-section-content-->
                            </div>

                            <div class="accordion-section" id="coachDateCont">
                                <a class="accordion-section-title updateMenu" href="#accordion-2">Update Coaching Date</a>
                                <div id="accordion-2" class="accordion-section-content">
                                    <div id="coachingDate"></div>
                                    <input type="button" id="btnDate" value="Update" />
                                    <div class="update_calendar">
                                    </div>
                                </div>
                                <!--end .accordion-section-content-->
                            </div>
                            <!--end .accordion-section-->

                            <div class="accordion-section">
                                <a class="accordion-section-title requestMenu" href="#accordion-3">Request feedback</a>
                                <div id="accordion-3" class="accordion-section-content">
                                    <p id="reqFeedCont">Mauris interdum fringilla augue vitae tincidunt. Curabitur vitae tortor id eros euismod ultrices. </p>

                                    <a class="sendRequest" id="sendRequest">Send Request</a>

                                </div>
                                <!--end .accordion-section-content-->
                            </div>
                            <!--end .accordion-section-->

                            <div class="accordion-section">
                                <a class="accordion-section-title profilemenu" href="#accordion-4">View profile</a>
                                <div id="accordion-4" class="accordion-section-content">
                                </div>
                                <!--end .accordion-section-content-->
                            </div>
                            <!--end .accordion-section-->
                        </div>
                        <!--end .accordion-->
                    </div>



                </div>
                <div class="col-sm-12 prioritiesScale" id="Overallviews" style="display: none">
                    <div class="scale_one" id="scaleView" style="display: none;">
                        <div class="scaleYellow" id="completedScale" style="width: 50%;">
                            <span class="daysCompleted blow15" id="completedDays">150 Days Completed</span>
                            <span class="yellowEndLine"></span>
                        </div>
                        <span class="startDate" id="tmStartDate">Start Date<br />
                            20.01.2016</span>
                        <span class="endDate" id="tmEndDate">Next Coaching Date<br />
                            20.01.2016</span>
                        <span class="daysRemaining" style="right: 2%;" id="dayRemaining">150 Days Remaining</span>
                    </div>


                    <div class="sliderboardView" id="boardView">
                        <div class="startgoalDate">

                            <h3>Start Date</h3>
                            <div class="clearfix"></div>
                            <div id="animation_demo" class="calendarText">
                                <div class="display slow">
                                   <input class="slow L" id='month1' /><input class="slow L" id='month2' /><div class="clearfix"></div>
                                    <label>Month</label>
                                </div>
                            </div>
                            <div id="animation_demo" class="calendarText">
                                <div class="display slow">
                                      <input class="slow L" id='date1' /><input class="slow L" id='date2' /><div class="clearfix"></div>
                                    <label>Day</label>
                                   
                                </div>
                            </div>
                            <div id="animation_demo" class="calendarText">
                                <div class="display slow">
                                    <input class="slow L" id='year1' /><input class="slow L" id='year2' /><input class="slow L" id='year3' /><input class="slow L" id='year4' /><div class="clearfix"></div>
                                    <label>Year</label>
                                </div>
                            </div>

                        </div>

                        <div class="completedDate">

                            <h3>Days Completed</h3>

                            <div class="clearfix"></div>

                            <div id="animation_demo" class="calendarText">
                                <div class="display slow">
                                    <input class="slow L" id='completeddays1' /><input class="slow L" id='completeddays2' /><input class="slow L" id='completeddays3' />
                                    <div class="clearfix"></div>
                                    <label>Days</label>
                                </div>
                            </div>

                        </div>

                        <div class="remainingDate">

                            <h3>Days Remaining</h3>

                            <div class="clearfix"></div>
                            <div id="animation_demo" class="calendarText">
                                <div class="display slow">
                                    <input class="slow L" id='remainingDays1' /><input class="slow L" id='remainingDays2' /><input class="slow L" id='remainingDays3' />
                                    <div class="clearfix"></div>
                                    <label>Days</label>
                                </div>
                            </div>

                        </div>

                        <div class="coachingDate">

                            <h3>Next Coaching Date</h3>

                            <div class="clearfix"></div>
                            <div id="animation_demo" class="calendarText">
                                <div class="display slow">
                                   <input class="slow L" id='coachMonth1' /><input class="slow L" id='coachMonth2' /><div class="clearfix"></div>
                                    <label>Month</label>
                                </div>
                            </div>
                            <div id="animation_demo" class="calendarText">
                                <div class="display slow">
                                      <input class="slow L" id='coachDate1' /><input class="slow L" id='coachDate2' />
                                    <div class="clearfix"></div>
                                    <label>Day</label>
                                   
                                </div>
                            </div>
                            <div id="animation_demo" class="calendarText">
                                <div class="display slow">
                                    <input class="slow L" id='coachYear1' /><input class="slow L" id='coachYear2' /><input class="slow L" id='coachYear3' /><input class="slow L" id='coachYear4' />
                                    <div class="clearfix"></div>
                                    <label>Year</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="listView">
                    <h2>lorum Ipsum <span>- Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</span></h2>
                    <div class="col-sm-12 prioitiesFrequency">

                        <ul class="frquencyHeader">
                            <li>#</li>
                            <li>Practice Area</li>
                            <li>Excellence Actions</li>
                            <li id="feqScale">Frequency</li>
                        </ul>
                        <div class="clearfix"></div>
                        <div class="frquencyContent" id="devPrioritiesCont">
                        </div>
                    </div>
                </div>
                <div id="profileView" style="display: none">

                    <%--<h2>lorum Ipsum <span>- Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</span></h2>--%>
                    <div class="col-sm-12 profileview_content">


                        <div class="profilelist" id="profileListsView">
                        </div>




                    </div>
                    <div class="clearfix"></div>
                    <p class="errorText"><span>*</span>lorum ipsum</p>
                </div>
            </div>



            <!--------------------------------------------------------------------  fullbox --------------------------------------------------------------------->


            <div class="col-sm-9 ddummyerror" id="blankView" style="display: none;">

                <div class="blankBox">


                    <p id="nofeedCont">Loram ipsum</p>

                </div>

            </div>


        </div>
    </div>

</asp:Content>
