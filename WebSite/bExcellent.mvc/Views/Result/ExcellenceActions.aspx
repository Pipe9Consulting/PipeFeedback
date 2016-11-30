<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Results
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">


    <%-- <script src="../../Scripts/JqueryUI.js" type="text/javascript"></script>--%>

    <link href="../../Styles/results/excellenceAction.css" rel="stylesheet" type="text/css" />
    <%--<script src="../../Styles//jquery-ui.js"></script>--%>
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/ref/Results/ExcellenceActions.js" type="text/javascript"></script>
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
        <div class="ui breadcrumb"><a href="../Common/Index">Home</a> > <a href="../FeedbackResults/FeedbackResults">Feedback Results > </a>Excellence Actions</div>
    </div>

    <input type="hidden" id="selectedType" value="0" />
    <%
        var t = 0;

        if (Session["DashboardMappingId"] != null)
        {
            t = int.Parse(Session["DashboardMappingId"].ToString());
        }

        var p = 0;
        if (Session["SelectedPoe"] != null)
        {
            p = int.Parse(Session["SelectedPoe"].ToString());
        }

    %>
    <input type="hidden" id="moreBigPicture" value="0" />

    <input type="hidden" id="selectedPoeResults" value="<%:p %>" />

    <input type="hidden" id="selectedpoename" />

    <input type="hidden" id="dasboardMapping" value="<%:t %>" />

    <input type="hidden" id="controlclicked" value="0" />

    <input type="hidden" id="numberOfSlide" />



    <div class="pageholder">

        <div class="stand standlaning">
            <h1 style="padding: 0 !important;">Excellence Actions</h1>

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

            <div class="customertiles tile">
                <h1 style="padding: 0 !important;">Practice Area</h1>
                <div class="poeMainDiv">
                    <div class="scroll2" style="overflow: hidden; width: auto; height: 25%;">

                        <ul id="poemodule">

                            <%--<li class="mngrTile poemodule" id="li1" data-value="82">
                                <div class="icon tripleline">
                                    <img src="../../Images/manager-ico.png" alt="Blogs">
                                </div>
                                <p>
                                    Product Guru
                                </p>
                            </li>
                            <li class="teamTile poemodule">
                                <div class="icon doubleline">
                                    <img src="../../Images/team-ico.png" alt="Blogs">
                                </div>
                                <p>
                                    Connection Communicator
                                </p>
                            </li>
                            <li class="peerTile poemodule">
                                <div class="icon singleline">
                                    <img src="../../Images/peers-ico.png" alt="Blogs">
                                </div>
                                <p>
                                    Connection Communicator
                                </p>
                            </li>
                            <li class="custTile poemodule">
                                <div class="icon doubleline">
                                    <img src="../../Images/customer-ico.png" alt="Blogs">
                                </div>
                                <p>
                                    Connection Communicator
                                </p>
                            </li>--%>
                        </ul>
                    </div>
                </div>
            </div>

            <%--<div class="resultsTIle pre_feedback" style="overflow: hidden; width: auto; height: 25%;display:none" id="completedTile">
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

            <div class="chartholder" id="resultBox">
                <div class="chartslide">

                    <div class="slide">
                        <div class="coltwo">
                            <div class="chartsmlplaceholder">
                                <h1 id="charttitle_top" style="padding: 0 !important;">Results      </h1><a href="#" class="gotoBtn completedTile">Back</a>
                                
                                <div class='legendTenure'>
                                    <ul>
                                        <li class='legend1'>Current</li>
                                        <li class='legend2'>Previous</li>
                                    </ul>
                                </div>
                                <div id="totalChartResult">
                                    <div class="chartdiv" id="paLevel1">



                                        <%--                               <div class="chart">
                                        <div class="chartop">
                                        </div>
                                        <div class="chartbg">
                                            <div class="chartarea" >
                                                <ul>
                                                    <li class="resultsQn"><span>1</span>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</li>
                                                    <li class="chartYelloResults" style="width: 20%;">
                                                        <p>25% </p>
                                                    </li>
                                                    <li class="resultsQn"><span>1</span>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</li>
                                                    <li class="chartYelloResults" id="resultBarPract" style="width: 40%;">
                                                        <p>25% </p>
                                                    </li>
                                                    <li class="resultsQn"><span>1</span>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</li>
                                                    <li class="chartYelloResults" style="width: 60%;">
                                                        <p>25% </p>
                                                    </li>
                                                    <li class="resultsQn"><span>1</span>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</li>
                                                    <li class="chartYelloResults" style="width: 80%;">
                                                        <p>25% </p>
                                                    </li>
                                                    <li class="resultsQn"><span>1</span>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</li>
                                                    <li class="chartYelloResults" style="width: 100%;">
                                                        <p>25% </p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="chartbtm">
                                        </div>
                                    </div>--%>
                                        <div class="pointer">
                                        </div>
                                        <div class="clr"></div>
                                        <div class="charttitle">
                                            Results(%)
                                        </div>
                                    </div>


                                    <div class="chartdiv" id="paLevel2">
                                        <div class="pointer">
                                        </div>
                                        <div class="clr"></div>
                                        <div class="charttitle">
                                            Results(%)
                                        </div>
                                    </div>
                                    <div class="chartdiv" id="paLevel3">
                                        <div class="pointer">
                                        </div>
                                        <div class="clr"></div>
                                        <div class="charttitle">
                                            Results(%)
                                        </div>
                                    </div>
                                    <div class="chartdiv" id="paLevel4">
                                        <div class="pointer">
                                        </div>
                                        <div class="clr"></div>
                                        <div class="charttitle">
                                            Results(%)
                                        </div>
                                    </div>
                                    <div class="chartdiv" id="paLevel5">
                                        <div class="pointer">
                                        </div>
                                        <div class="clr"></div>
                                        <div class="charttitle">
                                            Results(%)
                                        </div>
                                    </div>
                                    <div class="chartdiv" id="paLevel6">
                                        <div class="pointer">
                                        </div>
                                        <div class="clr"></div>
                                        <div class="charttitle">
                                            Results(%)
                                        </div>
                                    </div>
                                    <div class="chartdiv" id="paLevel7">
                                        <div class="pointer">
                                        </div>
                                        <div class="clr"></div>
                                        <div class="charttitle">
                                            Results(%)
                                        </div>
                                    </div>
                                    <div class="chartdiv" id="paLevel8">
                                        <div class="pointer">
                                        </div>
                                        <div class="clr"></div>
                                        <div class="charttitle">
                                            Results(%)
                                        </div>
                                    </div>
                                    <div class="chartdiv" id="paLevel9">
                                        <div class="pointer">
                                        </div>
                                        <div class="clr"></div>
                                        <div class="charttitle">
                                            Results(%)
                                        </div>
                                    </div>
                                    <div class="chartdiv" id="paLevel10">
                                        <div class="pointer">
                                        </div>
                                        <div class="clr"></div>
                                        <div class="charttitle">
                                            Results(%)
                                        </div>
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

                    <div class="slide">
                        <div class="coltwo">
                            <div class="chartsmlplaceholder">
                                <h1 style="padding: 0 !important;">Progress      </h1>
                                <div class="chartdiv">

                                    <div class="legendTenure" style="display: none;">
                                        <ul>
                                            <li class="legend1">Current</li>
                                            <li class="legend2">Previous</li>
                                        </ul>
                                    </div>



                                    <%--                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea" id="resultProgressBar">
                                            <ul>
                                                <li class="resultsQn"><span>1</span>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</li>
                                                <li class="chartYelloProgress" style="width: 20%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="chartGrayProgress" style="width: 40%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="resultsQn"><span>1</span>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</li>
                                                <li class="chartYelloProgress" style="width: 60%;">
                                                    <p>25% </p>
                                                </li>
                                                
                                                <li class="chartGrayProgress" style="width: 80%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="resultsQn"><span>1</span>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</li>
                                                <li class="chartYelloProgress" style="width: 100%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="chartGrayProgress" style="width: 80%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="resultsQn"><span>1</span>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</li>
                                                <li class="chartYelloProgress" style="width: 100%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="chartGrayProgress" style="width: 80%;">
                                                    <p>25% </p>
                                                </li>
                                                <li class="resultsQn"><span>1</span>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</li>
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
                                </div>--%>
                                    <div class="pointer">
                                    </div>
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

    <%-- <div id="sticky">



        <ul id="example-2" class="sticklr sticklr-right sticklr-js" style="top: 377.5px;">
            <li>
                <a href="#" class="standBPInfo" title="Result EA Info">
                    <p>Result EA Info</p>
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
