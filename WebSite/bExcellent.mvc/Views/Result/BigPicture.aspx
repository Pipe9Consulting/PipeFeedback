<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Results
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">


    <script src="../../Scripts/JqueryUI.js" type="text/javascript"></script>

    <link href="../../Styles/results/big-pic.css" rel="stylesheet" type="text/css" />
    <%--<script src="../../Styles/jquery-ui.js"></script>--%>
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <%--<script src="../../Scripts/ref/Sync/Sync.js" type="text/javascript"></script>--%>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Results/resultBigPicture.js" type="text/javascript"></script>
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
        <div class="ui breadcrumb"><a href="../Common/Index">Home </a><a href="../FeedbackResults/BigPicture">Feedback Results </a> <a href="#">The Big Picture </a></div>
    </div>
    <input type="hidden" id="choosenTile" value="0" />
    <%
        var t = "";
        var usertenure = "";
        if (Session["tileclicking"] != null)
        {
            t = Session["tileclicking"].ToString();
        }
        if (Session["tenure"] != null)
        {
            usertenure = Session["tenure"].ToString();
        }
    %>
    <input type="hidden" id="clickModes" value="<%:t%>" />
    <input type="hidden" id="userTenure" value="<%:usertenure%>" />




    <input type="hidden" id="selectedType" value="0" />
    <%
        var d = 0;

        if (Session["DashboardMappingId"] != null)
        {
            d = int.Parse(Session["DashboardMappingId"].ToString());
        }

    %>
    <input type="hidden" id="moreBigPicture" value="0" />

    <input type="hidden" id="dasboardMapping" value="<%:d %>" />



    <div class="pageholder">

        <div class="stand standlaning">
            <h1 style="padding-bottom: 0 !important">The Big Picture</h1>

            <div class="resultsTIle" style="overflow: hidden; width: auto; height: 25%;">
                <ul id="userList">
                    <li id="usrli0" class="resultTab" tabindex="0">

                        <img class="syncu" src="../../Images/icons/BigpictureIcon0.png" width="61" height="61" alt="User">
                        <p>Results</p>
                    </li>
                    <li id="usrli1" class="preogressTab" tabindex="1">

                        <img class="syncu" src="../../Images/icons/BigpictureIcon1.png" width="61" height="61" alt="User">
                        <p>Progress</p>
                    </li>

                </ul>
            </div>

            <%--<div class="resultsTIle pre_feedback" style="overflow: hidden; width: auto; height: 25%; display: none" id="completedTile">
                <ul id="Ul1">
                    <li id="completedFB" class="resultTab" tabindex="0">

                        <img class="syncu" src="../../Images/icons/feedback_cmd.png" width="61" height="61" alt="User">
                        <p>Go to Feedback Completed page</p>
                    </li>


                </ul>
            </div>--%>

        </div>



        <!-- Results ------------------------------------------------------------------------------------------------------------------------------------------------------->


        <div class="chartholder" id="resultBox">
            <div class="chartslide">

                <div class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder" id="resultsTile">
                            <h1 style="padding-bottom: 0 !important">Results      </h1><a href="#" class="gotoBtn completedTile">Back</a>
                            <div class="chartdiv">

                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="chartYelloResults" style="width: 0%;" id="topallpro1">
                                                    <p></p>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                    </div>
                                </div>
                                <div class="pointer">
                                </div>

                                <div class="charttitle">
                                 Level of Excellence  <%-- Results(%)--%>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Chart -->
                    <!--Chart-->
                </div>
            </div>
        </div>




        <!-- Progress ------------------------------------------------------------------------------------------------------------------------------------------------------->


        <div class="chartholder" id="progressBox" style="display: none;">
            <div class="chartslide">
                <!--Top Performer-->
                <div class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder" id="progressTile">
                            <h1 style="padding-bottom: 0 !important">Progress      </h1><a href="#" class="gotoBtn completedTile">Back</a>
                            <div class="chartdiv">

                                <div class="legendTenure" style="display: none;">
                                    <ul>
                                        <li class="legend1">Current</li>
                                        <li class="legend2">Previous</li>
                                    </ul>
                                </div>

                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea progressChart">
                                            <ul>
                                                <li class="chartYelloProgress" style="width: 0%;" id="prvallpro1">
                                                    <p></p>
                                                </li>
                                                <li class="chartGrayProgress" style="width: 0%;" id="prvallpro2">
                                                    <p></p>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                    </div>
                                </div>
                                <div class="pointer">
                                </div>

                                <div class="charttitle">
                                  Level of Excellence    <%-- Progress(%)--%>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Chart -->
                    <!--Chart-->
                </div>
            </div>
        </div>


    </div>





    <!------ Sticky ------------------------------------------------------------------------------------------------------------------------------------------------------------>

    <%-- <div id="sticky">



        <ul id="example-2" class="sticklr sticklr-right sticklr-js" style="top: 377.5px;">
            <li>
                <a href="#" class="standBPInfo" title="Result BP Info">
                    <p>Result BP Info</p>
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
