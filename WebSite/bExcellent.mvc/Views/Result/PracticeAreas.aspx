﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Results
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">


    <script src="../../Scripts/JqueryUI.js" type="text/javascript"></script>

    <link href="../../Styles/results/PracticeAreas.css" rel="stylesheet" type="text/css" />
    <%--<script src="../../Styles//jquery-ui.js"></script>--%>
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/ref/Results/praticeArea.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>    
    <script src="../../Scripts/jquery-sticklr-1.0.pack.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#example-2').sticklr({
                showOn: 'click',
                stickTo: 'right'

            });


        });
    </script>
  <%
        var showCompletedTile = 0;

        if (Session["CompletedFeedback"] != null)
        {
            showCompletedTile = int.Parse(Session["CompletedFeedback"].ToString());
        }

    %>

    <input type="hidden" id="hidCompletedTile" value="<%:showCompletedTile%>" />
    <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb"><a href="../Common/Index">Home </a> > <a href="../FeedbackResults/BigPicture">Results > </a>Practice Area</div>
    </div>

    <input type="hidden" id="selectedType" value="0" />
    <%
        var t = 0;

        if (Session["DashboardMappingId"] != null)
        {
            t = int.Parse(Session["DashboardMappingId"].ToString());
        }

    %>
    <input type="hidden" id="moreBigPicture" value="0" />

    <input type="hidden" id="dasboardMapping" value="<%:t %>" />



    <div class="pageholder">
        
        <div class="stand standlaning">
            <h1 style="padding: 0 !important;">Practice Area</h1>

            <div class="resultsTIle" style="overflow: hidden; width: auto; height: 25%;">
                <ul id="userList">
                    <li id="usrli0" tabindex="0">

                        <img class="syncu" src="../../Images/icons/BigpictureIcon0.png" width="61" height="61" alt="User">
                        <p>Results</p>
                    </li>
                    <li id="usrli1" tabindex="1">

                        <img class="syncu" src="../../Images/icons/BigpictureIcon1.png" width="61" height="61" alt="User">
                        <p>Progress</p>
                    </li>

                </ul>
            </div>
          <%--  <div class="resultsTIle pre_feedback" style="overflow: hidden; width: auto; height: 25%;display:none" id="completedTile">
                <ul id="Ul1">
                    <li id="completedFB" class="resultTab" tabindex="0">

                        <img class="syncu" src="../../Images/icons/feedback_cmd.png" width="61" height="61" alt="User">
                        <p>Go to Feedback Completed page</p>
                    </li>


                </ul>
            </div>--%>


        </div>



        <!-- Results ------------------------------------------------------------------------------------------------------------------------------------------------------->

        <div class="chartholdercontainer">
        <div class="chartholder"  id="resultBox">
            <div class="chartslide">

                <div class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder">
                            <h1 style="padding: 0 !important;">Results      </h1><a href="#" class="gotoBtn completedTile">Back</a>
                            <div id="totalChartResult">
                         <%--   <div class="chartdiv">

                                <div class="resultPa" id="resultPracticeAreaName">
                                    <ul>
                                        <li>Purposeful Planner</li>
                                        <li>smart startes</li>
                                        <li>knowledge builder</li>
                                        <li>Clarity Seeker</li>
                                        <li>Disciplined operator</li>
                                    </ul>

                                </div>

                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea" id="resultPracticeAreaBar">
                                             <ul>
                                                <li class="chartYelloResults" style="width: 20%;">
                                                    <p>25% </p>
                                                </li>
                                               <li class="chartYelloResults" id="resultBarPract" style="width: 40%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="chartYelloResults" style="width: 60%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="chartYelloResults" style="width: 80%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="chartYelloResults" style="width: 100%;">
                                                    <p>25% </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                    </div>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="clr"></div>
                                <div class="charttitle">
                                    Results(%)
                                </div>
                            </div>--%>
                                </div>
                        </div>
                    </div>
                    <!-- End Chart -->
                    <!--Chart-->
                </div>
            </div>
        </div>




        <!-- Progress ------------------------------------------------------------------------------------------------------------------------------------------------------->


        <div class="chartholder" style="display:none" id="progressBox">
            <div class="chartslide">

                <div class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder">
                            <h1 style="padding: 0 !important;">Progress      </h1><a href="#" class="gotoBtn completedTile">Back</a>
                             <div class='legendTenure'>
                                       <ul>
                                           <li class='legend1'>Current</li>
                                           <li class='legend2'>Previous</li>
                                       </ul>
                                   </div>
                            <div class="chartdiv" id="resultProgressPractName">

                                      <%-- <div class="legendTenure" style="display:none;">
                                    <ul>
                                        <li class="legend1">Current</li>
                                        <li class="legend2">Previous</li>                                       
                                    </ul>
                                </div>

                                <div class="resultPa">
                                 <ul>
                                        <li>Purposeful Planner</li>
                                        <li>smart startes</li>
                                        <li>knowledge builder</li>
                                        <li>Clarity Seeker</li>
                                        <li>Disciplined operator</li>
                                    </ul>

                                </div>

                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea" id="resultProgressBar">
                                            <%--<ul>
                                                <li class="chartYelloProgress" style="width: 20%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="chartGrayProgress" style="width: 40%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="chartYelloProgress" style="width: 60%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="chartGrayProgress" style="width: 80%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="chartYelloProgress" style="width: 100%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="chartGrayProgress" style="width: 80%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="chartYelloProgress" style="width: 100%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="chartGrayProgress" style="width: 80%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="chartYelloProgress" style="width: 100%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="chartGrayProgress" style="width: 80%;">
                                                    <p>25% </p>
                                                </li>



                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                    </div>
                                </div>
                                <div class="pointer">
                                </div>--%>
                                <div class="clr"></div>
                                <div class="charttitle">
                                    Progress(%)
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Chart -->
                    <!--Chart-->
                </div>
            </div>
        </div>

            <div class="slidebtn">
                <a href="#" class="prev" id="p1">Previous</a> <a href="#" class="prev" id="p2">Previous</a>
                <div class="pagination" id="pagetxt">
                    Page 1 of 2
                </div>
                <a href="#" class="nxt" id="bn1">Next</a> <a href="#" class="nxt" id="bn2">Next</a>
            </div>
    </div>


     
    </div>

    <!------ Sticky ------------------------------------------------------------------------------------------------------------------------------------------------------------>

    <%--<div id="sticky">



        <ul id="example-2" class="sticklr sticklr-right sticklr-js" style="top: 377.5px;">
            <li>
                <a href="#" class="standBPInfo" title="Result PA Info">
                    <p>Result PA Info</p>
                </a>


                <ul class="standInfo" style="margin-left: 50px; margin-right: 50px; opacity: 0; top: 0px; display: none;">
                    <li>
                        <div class="helpcontent">
                            <div class="descinfo">
                                <h1>Results Info</h1>
                                <div class="hlprow">
                                    Self Sync identifies the difference, or Gap, between your Self Feedback score and the Feedback you have received from members of your Feedback Network (e.g., Manager, Skip-Level Manager, Peers, etc.).
                                        <br>
                                    <br>
                                    Examine Self Sync by Practice Areas and Excellence Actions to break down your Big Picture Gap and isolate development priorities for coaching conversations with your Manager.
                                       
                                </div>

                            </div>

                        </div>
                    </li>
                </ul>



            </li>







        </ul>
    </div>--%>


</asp:Content>
