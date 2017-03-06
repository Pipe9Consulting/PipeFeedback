<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Standing
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/Standing/practicearea.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <%-- <script src="../../Scripts/ref/Standing/digin.js" type="text/javascript"></script>--%>
    <style type="text/css">
        .dummychartdiv
        {
            background: #ccc !important;
            padding-bottom: 49% !important;
        }

        .digqn-dummy
        {
            width: 5.5%;
            height: 0;
            padding: 0.2% 0 5%;
            color: #ffffff;
            background: url(../../Images/be-bg.jpg) no-repeat #e5e5e5;
            text-align: center;
            font-size: 113%;
            float: left;
            margin-right: 1%;
        }
    </style>
    <input type="hidden" id="choosenTile" value="0"/>
    <div class="slidebtn" id="topslide">
        <a href="#" class="prev p1">Previous</a> <a href="#" class="prev p2">Previous</a>
        <div class="pagination">
            Page 1 of 2
        </div>
        <a href="#" class="nxt bn1">Next</a> <a href="#" class="nxt bn2">Next</a>
    </div>
    <div class="slidebtn" id="nxtslide">
        <a href="#" class="prev p1">Previous</a> <a href="#" class="prev p2">Previous</a>
        <div class="pagination">
            Page 1 of 2
        </div>
        <a href="#" class="nxt bn1">Next</a> <a href="#" class="nxt bn2">Next</a>
    </div>
    <div class="slidebtn" id="rest">
        <a href="#" class="prev p1">Previous</a> <a href="#" class="prev p2">Previous</a>
        <div class="pagination">
            Page 1 of 2
        </div>
        <a href="#" class="nxt bn1">Next</a> <a href="#" class="nxt bn2">Next</a>
    </div>
    <div class="slidebtn" id="prevfb">
        <a href="#" class="prev p1">Previous</a> <a href="#" class="prev p2">Previous</a>
        <div class="pagination">
            Page 1 of 2
        </div>
        <a href="#" class="nxt bn1">Next</a> <a href="#" class="nxt bn2">Next</a>
    </div>
    <div class="slidebtn" id="allslide">
        <a href="#" class="prev p1">Previous</a> <a href="#" class="prev p2">Previous</a>
        <a href="#" class="prev p3">Previous</a>
        <div class="pagination">
            Page 1 of 2
        </div>
        <a href="#" class="nxt bn1">Next</a> <a href="#" class="nxt bn2">Next</a> <a href="#"
            class="nxt bn3">Next</a>
    </div>
    <div class="indexright">
        <div class="indexrightarrow">
            <div class="indexclose" id="0">
                <span></span>
            </div>
        </div>
        <div class="indexrightclose">
            <span></span>
        </div>
        <div class="indexrightclose1">
            <span></span>
        </div>
        <div class="model">
            <div class="modelcontent">
                <div class="patable">
                    <h1 id="PAname"></h1>
                    <div class="scroll2">
                        <table id="practiceAreaPoeContent">
                        </table>
                    </div>
                </div>
                <div class="helpcontent">
                    <h1>Definitions</h1>
                    <div class="hlprow">
                        <div class="hlpheading">Stars</div>
                        <div class="hlpcont">You compared with the top 20% of the community</div>
                    </div>
                    <div class="hlprow">
                        <div class="hlpheading">Primed for Growth</div>
                        <div class="hlpcont">You compared with the top 20% of the middle 60% of the community</div>
                    </div>
                    <div class="hlprow">
                        <div class="hlpheading">Rest of Community</div>
                        <div class="hlpcont">You compared with the average for the community</div>
                    </div>
                    <div class="hlprow">
                        <div class="hlpheading">Previous</div>
                        <div class="hlpcont">Your latest feedback compared with your previous feedback</div>
                    </div>
                    <div class="hlprow">
                        <div class="hlpheading">All</div>
                        <div class="hlpcont">You compared with all community comparisons</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="pageholder">
        <div class="breadcrumb">
            Home > Standing > Practice Areas
        </div>
        <div class="stand">
            <h1>Practice Areas</h1>
            <div class="scroll1">
                <ul>
                    <li id="topperform" class="selected">
                        <img src="../Images/icons/highest.png" /><p>
                            Stars
                        </p>
                    </li>
                    <li id="nextinline">
                        <img src="../Images/icons/lowest.png" /><p>
                            Primed for Growth
                        </p>
                    </li>
                    <li id="comm">
                        <img src="../Images/icons/community.png" /><p>
                            Rest of Community
                        </p>
                    </li>
                    <li id="prev">
                        <img src="../Images/icons/previous.png" /><p>
                            Previous
                        </p>
                    </li>
                    <li id="alltile" class="rectangle">
                        <img src="../Images/icons/all.png" /><p>
                            All
                        </p>
                    </li>
                    <%--<li id="Li1">
                        <img src="../Images/icons/tenure.png" /><p>
                            Tenure
                        </p>
                    </li>--%>
                </ul>
            </div>
        </div>
        <!--Top performer-->
        <div class="chartholder" id="top">
            <div class="chartslide">
                <!--Chart-->
                <div class="slide q1">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder pa1">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Stars</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Toppa1Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Toppa1Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Toppa1Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Toppa1Mar1">
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
                                        <li class="scale4" id="Toppa1Level4">
                                        100%<li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Toppa1">
                                </div>
                            </div>
                        </div>
                        <div class="chartsmlplaceholder pa2">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Stars</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Toppa2Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Toppa2Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Toppa2Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Toppa2Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr2" id="Toppa2Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Toppa2">
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
                                        <li class="legend2">Stars</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Toppa3Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Toppa3Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Toppa3Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Toppa3Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr3" id="Toppa3Level">
                                        <li class="scale1" id="Toppa3Level1">25%</li>
                                        <li class="scale2" id="Toppa3Level2">50%</li>
                                        <li class="scale3" id="Toppa3Level3">75%</li>
                                        <li class="scale4" id="Toppa3Level4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Toppa3">
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
                                        <li class="legend2">Stars</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Toppa4Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Toppa4Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Toppa4Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Toppa4Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr4" id="Toppa4Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Toppa4">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="charttitle">
                        Standing
                    </div>
                </div>
                <div class="slide q2">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder pa5">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Stars</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Toppa5Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Toppa5Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Toppa5Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Toppa5Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr5" id="Toppa5Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Toppa5">
                                </div>
                            </div>
                        </div>
                        <div class="chartsmlplaceholder pa6">
                            <h1>Practice Area 6
                            </h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Stars</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Toppa6Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Toppa6Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Toppa6Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Toppa6Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr6" id="Toppa6Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Toppa6">
                                </div>
                            </div>
                        </div>
                        <div class="charttitle1">
                            Standing
                        </div>
                    </div>
                </div>
                <!-- End Chart -->
            </div>
        </div>
        <!--End Top Performer-->
        <!--Next in Line-->
        <div class="chartholder" id="nxtline">
            <div class="chartslide">
                <!--Chart-->
                <div class="slide q1">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder pa1">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Primed for Growth</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Nxtpa1Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Nxtpa1Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Nxtpa1Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Nxtpa1Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr1" id="Nxtpa1Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Nxtpa1">
                                </div>
                            </div>
                        </div>
                        <div class="chartsmlplaceholder pa2">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Primed for Growth</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Nxtpa2Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Nxtpa2Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Nxtpa2Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Nxtpa2Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr2" id="Nxtpa2Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Nxtpa2">
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
                                        <li class="legend2">Primed for Growth</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Nxtpa3Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Nxtpa3Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Nxtpa3Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Nxtpa3Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr3" id="Nxtpa3Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Nxtpa3">
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
                                        <li class="legend2">Primed for Growth</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Nxtpa4Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Nxtpa4Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Nxtpa4Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Nxtpa4Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr4" id="Nxtpa4Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Nxtpa4">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="charttitle">
                        Standing
                    </div>
                </div>
                <div class="slide q2">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder pa5">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Primed for Growth</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Nxtpa5Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Nxtpa5Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Nxtpa5Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Nxtpa5Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr5" id="Nxtpa5Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Nxtpa5">
                                </div>
                            </div>
                        </div>
                        <div class="chartsmlplaceholder pa6">
                            <h1>Practice Area 6
                            </h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Rest of Community</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Nxtpa6Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Nxtpa6Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Nxtpa6Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Nxtpa6Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr6" id="Nxtpa6Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Nxtpa6">
                                </div>
                            </div>
                        </div>
                        <div class="charttitle1">
                            Standing
                        </div>
                    </div>
                </div>
                <!-- End Chart -->
            </div>
        </div>
        <!--End of Next in Line-->
        <!--Rest of Community-->
        <div class="chartholder" id="community">
            <div class="chartslide">
                <!--Chart-->
                <div class="slide q1">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder pa1">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Rest of Community</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Rstpa1Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Rstpa1Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Rstpa1Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Rstpa1Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr1" id="Rstpa1Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Rstpa1">
                                </div>
                            </div>
                        </div>
                        <div class="chartsmlplaceholder pa2">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Rest of Community</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Rstpa2Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Rstpa2Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Rstpa2Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Rstpa2Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr2" id="Rstpa2Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Rstpa2">
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
                                        <li class="legend2">Rest of Community</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Rstpa3Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Rstpa3Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Rstpa3Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Rstpa3Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr3" id="Rstpa3Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Rstpa3">
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
                                        <li class="legend2">Rest of Community</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Rstpa4Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Rstpa4Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Rstpa4Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Rstpa4Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr4" id="Rstpa4Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Rstpa4">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="charttitle">
                        Standing
                    </div>
                </div>
                <div class="slide q2">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder pa5">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Rest of Community</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Rstpa5Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Rstpa5Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Rstpa5Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Rstpa5Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr5" id="Rstpa5Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Rstpa5">
                                </div>
                            </div>
                        </div>
                        <div class="chartsmlplaceholder pa6">
                            <h1>Practice Area 6
                            </h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Rest of Community</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Rstpa6Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Rstpa6Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Rstpa6Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Rstpa6Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr6" id="Rstpa6Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Rstpa6">
                                </div>
                            </div>
                        </div>
                        <div class="charttitle1">
                            Standing
                        </div>
                    </div>
                </div>
                <!-- End Chart -->
            </div>
        </div>
        <!--End of Rest of Community-->
        <!--Previous-->
        <div class="chartholder" id="previous">
            <div class="chartslide">
                <!--Chart-->
                <div class="slide q1">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder pa1">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Previous</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Prevpa1Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Prevpa1Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Prevpa1Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Prevpa1Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr1" id="Prevpa1Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Prevpa1">
                                </div>
                            </div>
                        </div>
                        <div class="chartsmlplaceholder pa2">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Previous</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Prevpa2Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Prevpa2Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Prevpa2Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Prevpa2Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr2" id="Prevpa2Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Prevpa2">
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
                                        <li class="legend2">Previous</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Prevpa3Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Prevpa3Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Prevpa3Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Prevpa3Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr3" id="Prevpa3Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Prevpa3">
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
                                        <li class="legend2">Previous</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Prevpa4Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Prevpa4Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Prevpa4Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Prevpa4Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr4" id="Prevpa4Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Prevpa4">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="charttitle">
                        Standing
                    </div>
                </div>
                <div class="slide q2">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder pa5">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Previous</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Prevpa5Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Prevpa5Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Prevpa5Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Prevpa5Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr5" id="Prevpa5Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Prevpa5">
                                </div>
                            </div>
                        </div>
                        <div class="chartsmlplaceholder pa6">
                            <h1>Practice Area 6
                            </h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Previous</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Prevpa6Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Prevpa6Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Prevpa6Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Prevpa6Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr6" id="Prevpa6Level">
                                        <li class="scale1">25%</li>
                                        <li class="scale2">50%</li>
                                        <li class="scale3">75%</li>
                                        <li class="scale4">100%</li>
                                    </ul>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Prevpa6">
                                </div>
                            </div>
                        </div>
                        <div class="charttitle1">
                            Standing
                        </div>
                    </div>
                </div>
                <!-- End Chart -->
            </div>
        </div>
        <!--End of Previous-->
        <!--All-->
        <div class="chartholder" id="all">
            <div class="chartslide">
                <div class="slide q1">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder pa1">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <p>Legend</p>
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend3">Stars</li>
                                        <li class="legend2">Primed for Growth</li>
                                        <li class="legend4">Rest of Community</li>
                                        <li class="legend5">Previous</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Allpa1Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Allpa1Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar3" style="width: 0%" id="Allpa1Pro3">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar4" style="width: 0%" id="Allpa1Pro4">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar5" style="width: 0%" id="Allpa1Pro5">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markeramper" style="width: 0%" id="Allpa1Mar1">
                                                    <p>
                                                        20
                                                    </p>
                                                </li>
                                                <li class="marker3" style="width: 0%" id="Allpa1Mar2">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                                <li class="markergray" style="width: 0%" id="Allpa1Mar3">
                                                    <p>
                                                        40
                                                    </p>
                                                </li>
                                                <li class="marker4" style="width: 0%" id="Allpa1Mar4">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="marker5" style="width: 0%" id="Allpa1Mar5">
                                                    <p>
                                                        60
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale" id="Ul3">
                                        <li class="scale1" id="Li10">25%</li>
                                        <li class="scale2" id="Li11">50%</li>
                                        <li class="scale3" id="Li12">75%</li>
                                        <li class="scale4" id="Li13">100%</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <%-- </div>
                    <div class="coltwo">--%>
                        <div class="chartsmlplaceholder pa2">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <p>Legend</p>
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend3">Stars</li>
                                        <li class="legend2">Primed for Growth</li>
                                        <li class="legend4">Rest of Community</li>
                                        <li class="legend5">Previous</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Allpa2Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Allpa2Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar3" style="width: 0%" id="Allpa2Pro3">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar4" style="width: 0%" id="Allpa2Pro4">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar5" style="width: 0%" id="Allpa2Pro5">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markeramper" style="width: 0%" id="Allpa2Mar1">
                                                    <p>
                                                        20
                                                    </p>
                                                </li>
                                                <li class="marker3" style="width: 0%" id="Allpa2Mar2">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                                <li class="markergray" style="width: 0%" id="Allpa2Mar3">
                                                    <p>
                                                        40
                                                    </p>
                                                </li>
                                                <li class="marker4" style="width: 0%" id="Allpa2Mar4">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="marker5" style="width: 0%" id="Allpa2Mar5">
                                                    <p>
                                                        60
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale" id="Ul4">
                                        <li class="scale1" id="Li14">25%</li>
                                        <li class="scale2" id="Li15">50%</li>
                                        <li class="scale3" id="Li16">75%</li>
                                        <li class="scale4" id="Li17">100%</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="coltwo">
                        <div class="chartsmlplaceholder pa3">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <p>Legend</p>
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend3">Stars</li>
                                        <li class="legend2">Primed for Growth</li>
                                        <li class="legend4">Rest of Community</li>
                                        <li class="legend5">Previous</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Allpa3Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Allpa3Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar3" style="width: 0%" id="Allpa3Pro3">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar4" style="width: 0%" id="Allpa3Pro4">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar5" style="width: 0%" id="Allpa3Pro5">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markeramper" style="width: 0%" id="Allpa3Mar1">
                                                    <p>
                                                        20
                                                    </p>
                                                </li>
                                                <li class="marker3" style="width: 0%" id="Allpa3Mar2">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                                <li class="markergray" style="width: 0%" id="Allpa3Mar3">
                                                    <p>
                                                        40
                                                    </p>
                                                </li>
                                                <li class="marker4" style="width: 0%" id="Allpa3Mar4">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="marker5" style="width: 0%" id="Allpa3Mar5">
                                                    <p>
                                                        60
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr1" id="Ul5">
                                        <li class="scale1" id="Li18">25%</li>
                                        <li class="scale2" id="Li19">50%</li>
                                        <li class="scale3" id="Li20">75%</li>
                                        <li class="scale4" id="Li21">100%</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <%--   </div>
                    <div class="coltwo">--%>
                        <div class="chartsmlplaceholder pa4">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <p>Legend</p>
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend3">Stars</li>
                                        <li class="legend2">Primed for Growth</li>
                                        <li class="legend4">Rest of Community</li>
                                        <li class="legend5">Previous</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Allpa4Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Allpa4Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar3" style="width: 0%" id="Allpa4Pro3">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar4" style="width: 0%" id="Allpa4Pro4">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar5" style="width: 0%" id="Allpa4Pro5">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markeramper" style="width: 0%" id="Allpa4Mar1">
                                                    <p>
                                                        20
                                                    </p>
                                                </li>
                                                <li class="marker3" style="width: 0%" id="Allpa4Mar2">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                                <li class="markergray" style="width: 0%" id="Allpa4Mar3">
                                                    <p>
                                                        40
                                                    </p>
                                                </li>
                                                <li class="marker4" style="width: 0%" id="Allpa4Mar4">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="marker5" style="width: 0%" id="Allpa4Mar5">
                                                    <p>
                                                        60
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale paAr1" id="Ul6">
                                        <li class="scale1" id="Li22">25%</li>
                                        <li class="scale2" id="Li23">50%</li>
                                        <li class="scale3" id="Li24">75%</li>
                                        <li class="scale4" id="Li25">100%</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="charttitle">
                            Standing
                        </div>
                    </div>
                </div>
                <div class="slide q2">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder pa5">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <p>Legend</p>
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend3">Stars</li>
                                        <li class="legend2">Primed for Growth</li>
                                        <li class="legend4">Rest of Community</li>
                                        <li class="legend5">Previous</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Allpa5Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Allpa5Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar3" style="width: 0%" id="Allpa5Pro3">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar4" style="width: 0%" id="Allpa5Pro4">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar5" style="width: 0%" id="Allpa5Pro5">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markeramper" style="width: 0%" id="Allpa5Mar1">
                                                    <p>
                                                        20
                                                    </p>
                                                </li>
                                                <li class="marker3" style="width: 0%" id="Allpa5Mar2">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                                <li class="markergray" style="width: 0%" id="Allpa5Mar3">
                                                    <p>
                                                        40
                                                    </p>
                                                </li>
                                                <li class="marker4" style="width: 0%" id="Allpa5Mar4">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="marker5" style="width: 0%" id="Allpa5Mar5">
                                                    <p>
                                                        60
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale" id="Ul2">
                                        <li class="scale1" id="Li6">25%</li>
                                        <li class="scale2" id="Li7">50%</li>
                                        <li class="scale3" id="Li8">75%</li>
                                        <li class="scale4" id="Li9">100%</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="chartsmlplaceholder pa6">
                            <h1>Practice Area 6
                            </h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <p>Legend</p>
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend3">Stars</li>
                                        <li class="legend2">Primed for Growth</li>
                                        <li class="legend4">Rest of Community</li>
                                        <li class="legend5">Previous</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Allpa6Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Allpa6Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar3" style="width: 0%" id="Allpa6Pro3">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar4" style="width: 0%" id="Allpa6Pro4">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar5" style="width: 0%" id="Allpa6Pro5">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markeramper" style="width: 0%" id="Allpa6Mar1">
                                                    <p>
                                                        20
                                                    </p>
                                                </li>
                                                <li class="marker3" style="width: 0%" id="Allpa6Mar2">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                                <li class="markergray" style="width: 0%" id="Allpa6Mar3">
                                                    <p>
                                                        40
                                                    </p>
                                                </li>
                                                <li class="marker4" style="width: 0%" id="Allpa6Mar4">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="marker5" style="width: 0%" id="Allpa6Mar5">
                                                    <p>
                                                        60
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul class="scale" id="Ul1">
                                        <li class="scale1" id="Li2">25%</li>
                                        <li class="scale2" id="Li3">50%</li>
                                        <li class="scale3" id="Li4">75%</li>
                                        <li class="scale4" id="Li5">100%</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="charttitle1">
                            Standing
                        </div>
                    </div>
                </div>
            </div>
            <!---->
            <!-- End Chart -->
        </div>
        <!--End of All-->
    </div>
</asp:Content>