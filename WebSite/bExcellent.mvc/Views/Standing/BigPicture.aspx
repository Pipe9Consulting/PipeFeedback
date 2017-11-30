<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Community Sync
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <%--<script src="../../Scripts/jquery-1.4.3.min.js" type="text/javascript"></script>--%>
    <link href="../../Styles/Standing/standing-big-pic.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Standing/bigpicture.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/jquery.sceditor.min.js"></script>
    <script src="../../Scripts/jquery-sticklr-1.0.pack.js" type="text/javascript"></script>

   

    <script type="text/javascript">
        $(document).ready(function () {
            $('#example-2').sticklr({
                showOn: 'click',
                stickTo: 'right'
            });
        });
    </script>
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
      <%
        var isTspProfile = "";

        if (Session["SelectedPoe"] != null && int.Parse(Session["SelectedPoe"].ToString())==34)
        {
            isTspProfile = "tspProfileProgress";
        }

    %>
    <input type="hidden" id="clickModes" value="<%:t%>" />
    <input type="hidden" id="userTenure" value="<%:usertenure%>" />

    <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb">
            Home > Community Sync > The Big Picture
        </div> 
    </div>

    <div class="pageholder">

        <div class="stand">
            <h1>The Big Picture</h1>

            <!--<ul>
                <li class="selected" id="topperform">
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
            </ul>-->
            <div class="standBigpicture">
                <ul>
                    <li id="topperform" class="communitytile">
                        <p>
                            Community
                        </p>
                    </li>
                    
                   <%-- <li id="comm" class="pathfinderstile">

                        <p>Mentors                   </p>
                    </li>--%>
                    <li id="tenureTile" class="tenuretile">
                        <p>
                            Tenure Group
                        </p>
                        
                       
                    </li>
                    <%--hideboxtile--%>
                    <li id="nextinline" class="areaTeamtile">
                        <p>
                            Area Team
                        </p>
                         <span></span>
                    </li>
                    <%--<li id="prev" class="previoustile">
                        <p>Previous                    </p>
                    </li>--%>
                    <%--hideboxtileAll--%>
                    <li id="alltile" class="alltile">
                        <p>
                            All
                        </p>
                        <span></span>
                    </li>
                </ul>

            </div>
        </div>
        <div class="chartholder <%:isTspProfile %>" id="top">
            <div class="chartslide">
                <!--Top Performer-->
                <div class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder">
                            <h1>Community -                                <span id="selfCont">Your Self Feedback score compared with the average Self Feedback score of your role community</span>
                            </h1>
                            
                            <div class="chartdiv">
                                <div class="legendTenure">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Community</li>
                                        <li class="legend10">Goal</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <!--<div id="goalChartArea">
                                        <div class="chartGoalleft">&nbsp;</div>
                                        <div class="chartGoalright">&nbsp;</div>
                                    </div>-->
                                    <div class="goalChart">
                                        <div class="goalChartArea">
                                            <ul>
                                                <li class="chartGoalleft">&nbsp;</li>
                                                <li class="chartGoalright">&nbsp;</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="topallpro1">
                                             
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="topallpro2">
                                                   
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="marker3" style="width: 0%" id="topallmar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="topallmar1">
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
                                <div class="status" id="topall">
                                </div>
                                <div class="charttitle">
                                 Level of Excellence  <%-- Community Sync (%)--%>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Chart -->
                    <!--Chart-->
                </div>
            </div>
        </div>
        <div class="chartholder <%:isTspProfile %>" id="nxtline">
            <div class="chartslide">
                <!--Top Performer-->
                <div class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder">
                            <h1>Area Team -
                                <span id="areaCont">Your Self Feedback score compared with the average Self Feedback score of your team.</span>
                            </h1>
                            
                            <div class="chartdiv">
                                <div class="legendTenure">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Area Team</li>
                                        <li class="legend10">Goal</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="goalChart">
                                        <div class="goalChartArea">
                                            <ul>
                                                <li class="chartGoalleft">&nbsp;</li>
                                                <li class="chartGoalright">&nbsp;</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="nxtallpro1">
                                                  
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="nxtallpro2">
                                                   
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="marker3" style="width: 0%" id="nxtallmar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="nxtallmar1">
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
                                <div class="status" id="nxtall">
                                </div>
                                <div class="charttitle">
                                  Level of Excellence <%-- Community Sync (%)--%>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Chart -->
                    <!--Chart-->
                    <div class="coltwo">
                    </div>
                </div>
            </div>
        </div>
        <div class="chartholder <%:isTspProfile %>" id="community">
            <div class="chartslide">
                <!--Top Performer-->
                <div class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder">
                            <h1>Mentors -
                                <span id="mentorCont">Your Self Feedback score compared with the average Self Feedback score of others in your role community who stand within 20% of the goal.</span>
                            </h1>
                            
                            <div class="chartdiv">
                                <div class="legendTenure">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Mentors</li>
                                        <li class="legend10">Goal</li>
                                    </ul>
                                </div>
                                <%-- <div class="legend">
                                    <p>Tenure</p>
                                    <ul class="drplegends">
                                        <li data-value="1" class="legend3">Tenure12</li>
                                        <li data-value="2" class="legend3">TenureBelow36</li>
                                        <li data-value="3" class="legend2">TenureAbove36</li>
                                    </ul>
                                </div>--%>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="goalChart">
                                        <div class="goalChartArea">
                                            <ul>
                                                <li class="chartGoalleft">&nbsp;</li>
                                                <li class="chartGoalright">&nbsp;</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="rstallpro1">
                                                 
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="rstallpro2">
                                                 
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="marker3" style="width: 0%" id="rstallmar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="rstallmar1">
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
                                <div class="status" id="rstall">
                                </div>
                                <div class="charttitle">
                                  Level of Excellence  <%--Community Sync (%)--%>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Chart -->
                    <!--Chart-->
                    <div class="coltwo">
                        <!-- End Chart -->
                        <!--Chart-->
                    </div>
                </div>
            </div>
        </div>
        <div class="chartholder <%:isTspProfile %>" id="tenure">
            <div class="chartslide">
                <!--Top Performer-->
                <div class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder">
                             <h1>Tenure Group -
                                 <span id="tenureCont">Your Self Feedback score compared with the average Self Feedback score of various tenure groups in your role community.</span>
                            </h1>
                            
                            <div class="chartdiv">
                                <div class="legendTenure tenurelegend">
                                    <ul class="">
                                        <li class="legend1">You</li>
                                        <li class="legend2">Tenure Group</li>
                                        <li class="legend10">Goal</li>
                                    </ul>
                                </div>
                                <div class="legend legenddropdown">
                                    <p id="tenuretext">0 - 12 Months</p>
                                    <ul class="drplegends" id="tenureLegendClick">
                                        <li data-value="1">0 - 12 Months</li>
                                        <li data-value="2">13 - 24 Months</li>
                                        <li data-value="3">25+ Months</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="goalChart">
                                        <div class="goalChartArea">
                                            <ul>
                                                <li class="chartGoalleft">&nbsp;</li>
                                                <li class="chartGoalright">&nbsp;</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!--<div id="Div2">
                                        <div class="chartGoalleft">&nbsp;</div>
                                        <div class="chartGoalright">&nbsp;</div>
                                    </div>-->
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="tenurespro1">
                                                   
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="tenurespro2">
                                                   
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="marker3" style="width: 0%" id="tenuresmar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="tenuresmar1">
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
                                <div class="status" id="tenures">
                                </div>
                                <div class="charttitle">
                                  Level of Excellence <%-- Community Sync (%)--%>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Chart -->
                    <!--Chart-->
                    <div class="coltwo">
                        <!-- End Chart -->
                        <!--Chart-->
                    </div>
                </div>
            </div>
        </div>
        <div class="chartholder <%:isTspProfile %>" id="previous">
            <div class="chartslide">
                <!--Top Performer-->
                <div class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder">
                            <h1>Previous -
                                <span id="prevCont">Your Self Feedback score compared with your previous Self Feedback score.</span>
                            </h1>
                            
                            <div class="chartdiv">
                                <div class="legendTenure">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend2">Previous</li>
                                        <li class="legend10">Goal</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="goalChart">
                                        <div class="goalChartArea">
                                            <ul>
                                                <li class="chartGoalleft">&nbsp;</li>
                                                <li class="chartGoalright">&nbsp;</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="prvallpro1">
                                                   
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="prvallpro2">
                                                   
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="prvallmar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="prvallmar1">
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
                                <div class="status" id="prvall">
                                </div>
                                <div class="charttitle">
                                  Level of Excellence <%-- Community Sync (%)--%>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Chart -->
                    <!--Chart-->
                    <div class="coltwo">
                        <!-- End Chart -->
                        <!--Chart-->
                    </div>
                </div>
            </div>
        </div>
        <div class="chartholder <%:isTspProfile %>" id="all">
            <div class="chartslide">
                <div id="q1" class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder">
                             <h1>All -
                                 <span id="allCont">A comprehensive view of your Self Feedback score compared with Community and Team.</span>
                            </h1>
                            
                            <div class="chartdiv">
                                <div class="legendTenure">
                                    <ul>
                                        <li class="legend1">You</li>
                                        <li class="legend4">Community</li>
                                        <li class="legend3">Area Team</li>
                                       <%-- <li class="legend5">Mentors</li>
                                        <li class="legend6">Previous</li>--%>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartallbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="allallpro1">
                                                  
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="allallpro2">
                                                  
                                                </li>
                                                <li class="progressbar3" style="width: 0%" id="allallpro3">
                                                
                                                </li>
                                               <%-- <li class="progressbar4" style="width: 0%" id="allallpro4">
                                                  
                                                </li>
                                                <li class="progressbar5" style="width: 0%" id="allallpro5">
                                                 
                                                </li>--%>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markeramper" style="width: 0%" id="allallmar1">
                                                    <p>
                                                        20
                                                    </p>
                                                </li>
                                                <li class="marker3" style="width: 0%" id="allallmar2">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                                <li class="markergray" style="width: 0%" id="allallmar3">
                                                    <p>
                                                        40
                                                    </p>
                                                </li>
                                               <%-- <li class="marker4" style="width: 0%" id="allallmar4">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="marker5" style="width: 0%" id="allallmar5">
                                                    <p>
                                                        60
                                                    </p>
                                                </li>--%>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="charttitle">
                                  Level of Excellence  <%--Community Sync (%)--%>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!---->
            <!-- End Chart -->
        </div>
    </div>



   <%-- <div id="sticky">



        <ul id="example-2" class="sticklr">
            <li>
                <a id="bpinfo" href="#" class="standBPInfo" title="Standing BP Info">
                    <p>Standing BP Info</p>
                </a>

                <ul class="standTable">
                    <li>

                        <div class="patable">
                            <h1 id="PAname">A&amp;O Product Specialist</h1>
                               
                          <table id="bigpicPoeContent1">
                                
                     
                               
                                <tr>
                                    <th>Practice Area</th>
                                    <th>Priority</th>
                                    <th>Points</th>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        
                                            <div class='scroll2'>
                                                <table id="bigpicPoeContent1Scroll">


                                                    <tbody>
                                                        
                                                
                                                       
                                                        <tr>
                                                            <td>Product Guru</td>
                                                            <td>High</td>
                                                            <td>38</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Connected Communicator</td>
                                                            <td>Medium</td>
                                                            <td>25</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Product Innovator</td>
                                                            <td>Medium</td>
                                                            <td>25</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Relationship Builder</td>
                                                            <td>Low</td>
                                                            <td>12</td>
                                                        </tr>
                                                        

                                                    </tbody>
                                                </table>
                                           
                                          
                                           </div> 
                                      
                                    </td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <th></th>
                                    <th>100</th>
                                </tr>
                            </table>
              
                        </div>

                    </li>
                </ul>

                <ul class="standInfo">
                    <li>
                        <div class="helpcontent">
                            <div class="descinfo">
                                <h1>Self Feedback Standing</h1>
                                <div class="hlprow">
                                    <div class="hlpheading">Community</div>
                                    <div class="hlpcont">Your Self Feedback score compared with the average Self Feedback score of your role community</div>
                                </div>
                                <div class="hlprow">
                                    <div class="hlpheading">Area Team</div>
                                    <div class="hlpcont">Your Self Feedback score compared with the average Self Feedback score of your team</div>
                                </div>
                                <div class="hlprow">
                                    <div class="hlpheading">Mentors</div>
                                    <div class="hlpcont">Your Self Feedback score compared with the average Self Feedback score of others in your role community who stand within 20% of the goal</div>
                                </div>
                                <div class="hlprow">
                                    <div class="hlpheading">Tenure</div>
                                    <div class="hlpcont">Your Self Feedback score compared with the average Self Feedback score of various tenure groups in your role community</div>
                                </div>
                                <div class="hlprow">
                                    <div class="hlpheading">Previous</div>
                                    <div class="hlpcont">Your Self Feedback score compared with your previous Self Feedback score</div>
                                </div>
                                <div class="hlprow">
                                    <div class="hlpheading">All</div>
                                    <div class="hlpcont">A comprehensive view of your Self Feedback score compared with Community, Team, Mentors and Previous</div>
                                </div>
                            </div>

                        </div>
                    </li>
                </ul>

                

            </li>







        </ul>
    </div>--%>


</asp:Content>
