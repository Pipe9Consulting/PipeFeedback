<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Sync
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Sync/excellenceIndicator.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Sync/digdeep.js" type="text/javascript"></script>

    <div class="indexright">
        <div class="indexrightarrow">
            <div class="indexclose">
                <span>+</span>
            </div>
        </div>
        <input type="hidden" id="mappingid" value="0" />
        <input type="hidden" id="selectedTypedeep" value="0" />
        <% var t = 0;
           if (Session["ausermapid"] != null)
           {
               t = int.Parse(Session["ausermapid"].ToString());
           }
        %>
        <input type="hidden" id="selectedMappingid" value="<%:t%>" />
        <div class="indexrightclose">
            <span>-</span>
        </div>
        <table id="bigpicPoeContent">
            <tr>
                <td>
                    <img class="diginimg" src="../../Images/chart/tick.png" />
                </td>
                <td>In Sync
                </td>
            </tr>
            <tr>
                <td>
                    <img class="diginimg" src="../../Images/chart/exclamation.png" />
                </td>
                <td>Out of Sync
                </td>
            </tr>
            <%--<tr>
                <td>
                    <img class="diginimg" src="../../Images/chart/cross.png" />
                </td>
                <td>Decline
                </td>
            </tr>--%>
        </table>
    </div>
    <div class="pageholder">
        <input type="hidden" id="moreDigDeep" value="0" />
        <div class="breadcrumb">
            Home > Sync > Dig Deep
        </div>
        <div class="stand standlaning">
            <h1>Excellence Actions</h1>
            <div class="scroll1">
                <ul id="practiceAreaList">
                </ul>
            </div>
        </div>
        <!--Manager-->
        <div class="chartholder diginpg" id="manager1">
            <h1>&nbsp;
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
            </h1>
            <div class="chartslide">
                <!--Chart-->
                <div id="q1" class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder">
                            <div class="digqn">
                                1
                            </div>
                            <div class="digdev" id="Qtext1">
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
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="PArea1">
                                </div>
                            </div>
                        </div>
                        <div class="chartsmlplaceholder">
                            <div class="digqn">
                                2
                            </div>
                            <div class="digdev" id="Qtext2">
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
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="PArea2">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Chart -->
                    <!--Chart-->
                    <div class="coltwo">
                        <div class="chartsmlplaceholder">
                            <div class="digqn">
                                3
                            </div>
                            <div class="digdev" id="Qtext3">
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
                                <div class="pointer">
                                </div>
                                <div class="status" id="PArea3">
                                </div>
                            </div>
                        </div>
                        <!-- End Chart -->
                        <!--Chart-->
                        <div class="chartsmlplaceholder">
                            <div class="digqn">
                                4
                            </div>
                            <div class="digdev" id="Qtext4">
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
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="PArea4">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="q2" class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder">
                            <div class="digqn">
                                5
                            </div>
                            <div class="digdev" id="Qtext5">
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
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="PArea5">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Chart -->
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
</asp:Content>