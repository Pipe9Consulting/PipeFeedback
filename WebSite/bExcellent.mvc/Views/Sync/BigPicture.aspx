<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Manager Sync
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">





    <script src="../../Scripts/JqueryUI.js" type="text/javascript"></script>

    <link href="../../Styles/sync/sync-big-pic.css" rel="stylesheet" type="text/css" />
    <%--<script src="../../Styles/jquery-ui.js"></script>--%>
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/ref/Sync/Sync.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Sync/Bigpicture.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery-sticklr-1.0.pack.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#example-2').sticklr({
                showOn: 'click',
                stickTo: 'right'

            });

          
        });
    </script>
    
    <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb">
            Home > Sync > The Big Picture
        </div>
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
            <h1>The Big Picture</h1>
            <div class="scroll1">
                <ul id="userList">
                </ul>
            </div>
        </div>
        <div class="chartholder" id="manager1">
            <div class="chartslide">
                <!--Top Performer-->
                <div class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder">
                            <h1>Overall
                            </h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">Self</li>
                                        <li class="legend2" id="allMng">Manager</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="allpro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="allpro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="allmar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="allmar1">
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
                                <div class="status" id="all">
                                </div>
                                <div class="charttitle">
                                  Level of Excellence <%-- Manager Sync (%)--%>
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






    <!------------------Right Side Panel -------------->

    <%--<div id="sticky">



        <ul id="example-2" class="sticklr">
            <li>
                <a href="#" class="standBPInfo"  title="Sync BP Info">
                    <p>Sync BP Info</p>
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
                                <h1>Self Sync Explained</h1>
                                <div class="hlprow">
                                    
                                    
                                        Self Sync identifies the difference, or Gap, between your Self Feedback score and the Feedback you have received from members of your Feedback Network (e.g., Manager, Skip-Level Manager, Peers, etc.).
                                        <br /><br />
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
