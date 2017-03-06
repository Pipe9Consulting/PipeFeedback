<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Sync
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Sync/practicearea.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/ref/Sync/Sync.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Sync/Digin.js" type="text/javascript"></script>

    <div class="indexright">
        <div class="indexrightarrow">
            <div class="indexclose">
                <span></span>
            </div>
        </div>
        <div class="indexrightclose">
            <span></span>
        </div>
        <table id="diginsyncPoeContent">
        </table>
    </div>
    <input type="hidden" id="hidselectedval" value="0" />
    <input type="hidden" id="moreDigIn" value="0" />
    <div class="pageholder">
        <div class="breadcrumb">
        </div>
        <div class="stand standlaning">
            <h1>Practice Areas</h1>
            <div class="scroll1">
                <ul id="UserlistDigin">
                </ul>
            </div>
        </div>
        <!--Manager-->
        <div class="chartholder" id="manager1">
            <div class="chartslide">
                <!--Chart-->
                <div id="q1" class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder pa1">
                            <h1></h1>
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
                                                <li class="progressbar1" style="width: 0%" id="Pa1Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Pa1Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Pa1Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Pa1Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr1" id="Toppa1Level">
                                        <li class="scale1" id="Toppa1Level1">25%</li>
                                        <li class="scale2" id="Toppa1Level2">50%</li>
                                        <li class="scale3" id="Toppa1Level3">75%</li>
                                        <li class="scale4" id="Toppa1Level4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Pa1">
                                </div>
                            </div>
                        </div>
                        <div class="chartsmlplaceholder pa2">
                            <h1></h1>
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
                                                <li class="progressbar1" style="width: 0%" id="Pa2Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Pa2Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Pa2Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Pa2Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr1" id="Ul1">
                                        <li class="scale1" id="Li1">25%</li>
                                        <li class="scale2" id="Li2">50%</li>
                                        <li class="scale3" id="Li3">75%</li>
                                        <li class="scale4" id="Li4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Pa2">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Chart -->
                    <!--Chart-->
                    <div class="coltwo">
                        <div class="chartsmlplaceholder pa3">
                            <h1></h1>
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
                                                <li class="progressbar1" style="width: 0%" id="Pa3Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Pa3Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Pa3Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Pa3Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr1" id="Ul2">
                                        <li class="scale1" id="Li5">25%</li>
                                        <li class="scale2" id="Li6">50%</li>
                                        <li class="scale3" id="Li7">75%</li>
                                        <li class="scale4" id="Li8">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Pa3">
                                </div>
                            </div>
                        </div>
                        <!-- End Chart -->
                        <!--Chart-->
                        <div class="chartsmlplaceholder pa4">
                            <h1></h1>
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
                                                <li class="progressbar1" style="width: 0%" id="Pa4Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Pa4Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Pa4Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Pa4Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr1" id="Ul3">
                                        <li class="scale1" id="Li9">25%</li>
                                        <li class="scale2" id="Li10">50%</li>
                                        <li class="scale3" id="Li11">75%</li>
                                        <li class="scale4" id="Li12">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Pa4">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="charttitle">
                        Sync
                    </div>
                </div>
                <div id="q2" class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder pa5">
                            <h1></h1>
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
                                                <li class="progressbar1" style="width: 0%" id="Pa5Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Pa5Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Pa5Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Pa5Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr1" id="Ul4">
                                        <li class="scale1" id="Li13">25%</li>
                                        <li class="scale2" id="Li14">50%</li>
                                        <li class="scale3" id="Li15">75%</li>
                                        <li class="scale4" id="Li16">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Pa5">
                                </div>
                            </div>
                        </div>
                        <div class="chartsmlplaceholder pa6">
                            <h1></h1>
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
                                                <li class="progressbar1" style="width: 0%" id="Pa6Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Pa6Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Pa6Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Pa6Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr1" id="Ul5">
                                        <li class="scale1" id="Li17">25%</li>
                                        <li class="scale2" id="Li18">50%</li>
                                        <li class="scale3" id="Li19">75%</li>
                                        <li class="scale4" id="Li20">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Pa6">
                                </div>
                            </div>
                        </div>
                        <div class="charttitle1">
                            Sync
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