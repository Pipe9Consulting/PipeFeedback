<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Manager Sync
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Sync/excellenceIndicator.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Sync/digdeep.js" type="text/javascript"></script>
   <%-- <script src="../../Scripts/jquery-sticklr-1.0.pack.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#example-2').sticklr({
                showOn: 'click',
                stickTo: 'right'
            });
        });
    </script>
    --%>
        <input type="hidden" id="mappingid" value="0" />
        <input type="hidden" id="selectedTypedeep" value="0" />
        <% var t = 0;
           if (Session["ausermapid"] != null)
           {
               t = int.Parse(Session["ausermapid"].ToString());
           }
        %>
        <input type="hidden" id="selectedMappingid" value="<%:t%>" />
     <%
        var p = 0;

        if (Session["SelectedPoe"] != null)
        {
            p = int.Parse(Session["SelectedPoe"].ToString());
        }

    %>

    <input type="hidden" id="currentpoe" value="<%:p%>" />
    <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb">
            Home > Sync > Dig Deep
        </div>
    </div>
    <div class="pageholder">
        <input type="hidden" id="moreDigDeep" value="0" />
        <h1>Excellence Actions</h1>
        <div class="stand standlaning">
            <div class="syncEITile">
                <div class="scroll1">
                    <ul id="practiceAreaList">
                    <%--    <li class="AOAccountExecutive1Tile selectAOAccountExecutive1" id="li1" data-value="82">
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
                        </li>
                        <li class="dummytile">
                            <p>&nbsp;</p>
                        </li>
                        <li class="dummytile">
                            <p>&nbsp;</p>
                        </li>--%>
                    </ul>
                </div>
            </div>
        </div>
        <!--Manager-->
        <div class="syncEIDrop">
            <div class="excellencemenu">
                <div class="addmember" id="0">
                    <p id="membername">
                        --Select--
                    </p>
                    <div class="sendinv">
                        <ul id="networkusers">
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="chartholder diginpg" id="manager1">
            <div class="slidebtn">
                <a href="#" class="prev" id="p1">Previous</a> <a href="#" class="prev" id="p2">Previous</a>
                <div class="pagination" id="pagetxt">
                    Page 1 of 2
                </div>
                <a href="#" class="nxt" id="bn1">Next</a> <a href="#" class="nxt" id="bn2">Next</a>
            </div>
            <div class="chartslide">
                <!--Chart-->
                <div id="q1" class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder">
                            <div class="dig_cont">
                            <div class="digqn">
                                1
                            </div>
                            <div class="digdev" id="Qtext1">
                            </div>
                                </div>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Manager</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="PArea1Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="PArea1Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="PArea1Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="PArea1Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!--<ul class="scale paAr1" id="Toppa1Level">
                                        <li class="scale1 common1" id=""></li>
                                        <li class="scale2 common2" id=""></li>
                                        <li class="scale3 common3" id=""></li>
                                        <li class="scale4 common4" id="">
                                        <li>
                                    </ul> -->
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="DigstatusUp" id="PArea1">
                                    0.8
                                </div>
                            </div>
                        </div>
                        <div class="chartsmlplaceholder">
                            <div class="dig_cont"><div class="digqn">
                                2
                            </div>
                            <div class="digdev" id="Qtext2">
                            </div>
                                </div>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Manager</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="PArea2Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="PArea2Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="PArea2Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="PArea2Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!--<ul class="scale paAr1" id="Ul1">
                                        <li class="scale1 common1" id=""></li>
                                        <li class="scale2 common2" id="">
                                        <li>
                                        <li class="scale3 common3" id=""></li>
                                        <li class="scale4 common4" id="">
                                        <li>
                                    </ul>-->
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="DigstatusUp" id="PArea2">
                                    0.8
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Chart -->
                    <!--Chart-->
                    <div class="coltwo">
                        <div class="chartsmlplaceholder">
                            <div class="dig_cont"><div class="digqn">
                                3
                            </div>
                            <div class="digdev" id="Qtext3">
                            </div>
                                </div>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Manager</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="PArea3Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="PArea3Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="PArea3Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="PArea3Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <!--<ul class="scale paAr1" id="Ul2">
                                    <li class="scale1 common1" id=""></li>
                                    <li class="scale2 common2" id=""></li>
                                    <li class="scale3 common3" id=""></li>
                                    <li class="scale4 common4" id="">
                                    <li>
                                </ul> -->
                                <div class="pointer">
                                </div>
                                <div class="DigstatusUp" id="PArea3">
                                    0.8
                                </div>
                            </div>
                        </div>
                        <!-- End Chart -->
                        <!--Chart-->
                        <div class="chartsmlplaceholder">
                            <div class="dig_cont"><div class="digqn">
                                4
                            </div>
                            <div class="digdev" id="Qtext4">
                            </div>
                                </div>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Manager</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="PArea4Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="PArea4Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="PArea4Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="PArea4Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <%--<ul class="scale paAr1" id="Ul4">
                                        <li class="scale1 common1" id=""></li>
                                        <li class="scale2 common2" id=""></li>
                                        <li class="scale3 common3" id=""></li>
                                        <li class="scale4 common4" id="">
                                        <li>
                                    </ul>--%>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="DigstatusUp" id="PArea4">
                                    0.8
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="q2" class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder">
                            <div class="dig_cont"><div class="digqn">
                                5
                            </div>
                            <div class="digdev" id="Qtext5">
                            </div>
                                </div>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Manager</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="PArea5Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="PArea5Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="PArea5Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="PArea5Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <%--  <ul class="scale paAr1" id="Ul3">
                                        <li class="scale1 common1" id=""></li>
                                        <li class="scale2 common2" id=""></li>
                                        <li class="scale3 common3" id=""></li>
                                        <li class="scale4 common4" id="">
                                        <li>
                                    </ul>--%>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="DigstatusUp" id="PArea5">
                                    0.8
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Chart -->
            </div>
        </div>
    </div>
    



    <%--<div id="sticky">



        <ul id="example-2" class="sticklr">
            <li>
                <a href="#" class="standBPInfo" id="standBPInfo" title="Sync EA Info">
                    <p>Sync EA Info</p>
                </a>

                <ul class="standTable">
                    <li>

                        <div class="patable">
                            <h1 id="PAname">Self Sync by Excellence Actions</h1>

                            <p id="PaText">Examine Self Sync at the Excellence Action level. Navigate through each Practice Area and analyze the Gaps between your Self Feedback score and the Feedback scores received from members of your Feedback Network. Use the drop down menu at the top of the screen to select different Feedbackers within your Network.</p>
                            </div>
                    </li>
                </ul>





            </li>







        </ul>
    </div>--%>

</asp:Content>
