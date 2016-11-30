<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>



<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Dashboard
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server"> 
     
       


    <meta name="viewport" content="width=device-width" />


<%--    <link href="../../Styles/Common/css/semantic.min.css" rel="stylesheet" />--%>
    <link href="../../Styles/Common/css/dashboard.css" rel="stylesheet" />
    <%--<link href="../../Styles/Common/css/InnerHeaderFooter.css" rel="stylesheet" />--%>
    <link href="../../Styles/Common/css/skin.css" rel="stylesheet" />
    <link href="../../Styles/Common/css/ie7/skin.css" rel="stylesheet" />
    <script src="../../Scripts/jquery-1.9.1.js"></script>
    <%--<script src="https://code.jquery.com/ui/1.10.0/jquery-ui.js" type="text/javascript"></script>--%>    
    <script src="../../Scripts/ref/Dashboard/dash-1.10.0-jquery-ui.js"></script>
    <script src="../../Scripts/ref/Dashboard/V4DashboardLanding.js"></script>
   <%-- <style type="text/css">
        .recognitionOthers {
            display: none;
        }
    </style>--%>


<%--      <div id="preloader">
        <div id="status">
            &nbsp;
        </div>
    </div>--%>
    <input type="hidden" id="subidStart" value="0" />
    <input type="hidden" id="poeId" value="0" />
    <input type="hidden" id="selectedpoe" />
    <input type="hidden" id="latestSelfScore" value="0" />
    <input type="hidden" id="mappingids" value="0" />
    <% var t = 0;
       if (Session["SelectedPoe"] != null)
       {
           t = int.Parse(Session["SelectedPoe"].ToString());
       }
    %>
    <input type="hidden" id="selectedPoelist" value="<%:t%>" />
    <div class="sixteen wide column breadMenu">
            <div class="ui breadcrumb">
                <a href="../../Common/Index" class="section">Home</a>
                <i>&nbsp>&nbsp</i>
                <a href="../../Common/Index" class="section">Start</a>
                <i>&nbsp>&nbsp</i>
                <a href="../../Dashboard/Index" class=" section">Dashboard</a>
            </div>
        </div>
    <div class="page-wrap">
     <%--   <div class="ui grid headerPart">
            <div class="row headerMenu">
                <div class="seven wide column">
                    <a href="#" class="cacIcon">
                        <img src="../../Images/images/menu_icon.png" /></a>
                    <a  href="/Common/Index"   class="cacLogo">
                        <img src="../../Images/images/CAC_logo.png" /></a>
                </div>
            </div>
        </div>--%>
        
        <div class="sixteen wide column">
            <div class="walldropdown">
                <%--<ul>
    <li class="dropdown" ><a class="poeimg" href="#" data-toggle="dropdown"> <span>A&amp;O Product Specialist</span> <i class="icon-arrow"></i></a>
      <ul class="dropdown-menu" id="poeListItems" style="display: none" >
        <li><a href="#"><img class="img" alt="A&amp;O Product Specialist" src="../../Images/images/AO Product Specialist_Intro.png" /><span>A&amp;O Product Specialist</span></a></li>
		<li><a href="#"><img class="img" alt="A&amp;O Product Specialist" src="../../Images/images/AO Product Specialist_Intro.png" /><span>A&amp;O Product Specialist</span></a></li>
		<li><a href="#"><img class="img" alt="A&amp;O Product Specialist" src="../../Images/images/AO Product Specialist_Intro.png" /><span>A&amp;O Product Specialist</span></a></li>
        
        
        
      </ul>
    </li>
</ul>--%>
            </div>





        </div>
        <div class="ui grid dbcontent">
            <div class="sixteen wide column dbarea">
                <div class="column dbBox dbstories">
                    <%--<div class="dbBoxtop">
                        <div class="dbInnerBox read">
                            <div class="dbInnerLeft">
                                <h2>5</h2>
                                <p>Read by You</p>
                            </div>
                        </div>
                        <div class="dbInnerBox shared">
                            <div class="dbInnerLeft">
                                <h2>5</h2>
                                <p>Shared By You</p>
                            </div>
                        </div>
                        <div class="dbInnerBox post">
                            <div class="slider">
                                <ul id="first-carousel" class="first-and-second-carousel jcarousel-skin-tango">
                                    <li>
                                        <img src="http://static.flickr.com/66/199481236_dc98b5abb3_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/75/199481072_b4a0d09597_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/57/199481087_33ae73a8de_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/77/199481108_4359e6b971_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/58/199481143_3c148d9dd3_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/72/199481203_ad4cdcf109_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/58/199481218_264ce20da0_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/69/199481255_fdfe885f87_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/60/199480111_87d4cb3e38_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/70/229228324_08223b70fa_s.jpg" width="75" height="75" alt="" /></li>
                                </ul>
                            </div>
                            <div class="dbInnerLeft">
                                <h2>5</h2>
                                <p>Posted By Others</p>
                            </div>
                        </div>
                    </div>
                    <div class="dbBoxBottom">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
                        <h1>Stories <span class="storiesIcon">
                            <img src="../../Images/images/dbstoriesIcon.png" alt="Stories Icon" border="0" /></span></h1>
                    </div>
                    <div class="dbarrow"></div>--%>
                </div>
















                <div class="column dbBox dbfeedback">
                    <%--<div class="dbBoxtop">
                        <div class="dbInnerBox taken">
                            <div class="dbInnerLeft">
                                <h2>5</h2>
                                <p>Taken by You</p>
                            </div>
                        </div>
                        <div class="dbInnerBox recived">
                            <div class="slider">
                                <ul id="Ul1" class="first-and-second-carousel jcarousel-skin-tango">
                                    <li>
                                        <img src="http://static.flickr.com/66/199481236_dc98b5abb3_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/75/199481072_b4a0d09597_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/57/199481087_33ae73a8de_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/77/199481108_4359e6b971_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/58/199481143_3c148d9dd3_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/72/199481203_ad4cdcf109_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/58/199481218_264ce20da0_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/69/199481255_fdfe885f87_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/60/199480111_87d4cb3e38_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/70/229228324_08223b70fa_s.jpg" width="75" height="75" alt="" /></li>
                                </ul>
                            </div>
                            <div class="dbInnerLeft">
                                <h2>5</h2>
                                <p>Received for You</p>
                            </div>
                        </div>
                        <div class="dbInnerBox given">
                            <div class="slider">
                                <ul id="Ul2" class="first-and-second-carousel jcarousel-skin-tango">
                                    <li>
                                        <img src="http://static.flickr.com/66/199481236_dc98b5abb3_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/75/199481072_b4a0d09597_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/57/199481087_33ae73a8de_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/77/199481108_4359e6b971_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/58/199481143_3c148d9dd3_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/72/199481203_ad4cdcf109_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/58/199481218_264ce20da0_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/69/199481255_fdfe885f87_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/60/199480111_87d4cb3e38_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/70/229228324_08223b70fa_s.jpg" width="75" height="75" alt="" /></li>
                                </ul>
                            </div>
                            <div class="dbInnerLeft">
                                <h2>5</h2>
                                <p>Given By You</p>
                            </div>
                        </div>
                    </div>--%>
                <%--    <div class="dbBoxBottom">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
                        <h1>feedback <span class="storiesIcon">
                            <img src="../../Images/images/dbfeedbackIcon.png" alt="Stories Icon" border="0" /></span></h1>
                    </div>
                    <div class="dbarrow"></div>--%>
                </div>
                <div class="column dbBox dbstanding">
                    <%--<div class="dbBoxtop">
                        <div class="dbInnerBox yourStanding">
                            <div class="dbInnerLeft">
                                <h2>5</h2>
                                <p>Your Standing</p>
                            </div>
                        </div>
                        <div class="dbInnerBox community">
                            <div class="dbInnerLeft">
                                <h2>5</h2>
                                <p>Community Sync</p>
                            </div>
                        </div>
                        <div class="dbInnerBox team">
                            <div class="dbInnerLeft">
                                <h2>5</h2>
                                <p>Team Sync</p>
                            </div>
                        </div>
                        <div class="dbInnerBox managersync">
                            <div class="slider">
                                <ul id="Ul3" class="first-and-second-carousel jcarousel-skin-tango">
                                       <li>
                                <img src="http://static.flickr.com/66/199481236_dc98b5abb3_s.jpg" width="75" height="75" alt="" /></li>
                            <li>
                                <img src="http://static.flickr.com/75/199481072_b4a0d09597_s.jpg" width="75" height="75" alt="" /></li>
                            <li>
                                <img src="http://static.flickr.com/57/199481087_33ae73a8de_s.jpg" width="75" height="75" alt="" /></li>
                            <li>
                                <img src="http://static.flickr.com/77/199481108_4359e6b971_s.jpg" width="75" height="75" alt="" /></li>
                            <li>
                                <img src="http://static.flickr.com/58/199481143_3c148d9dd3_s.jpg" width="75" height="75" alt="" /></li>
                            <li>
                                <img src="http://static.flickr.com/72/199481203_ad4cdcf109_s.jpg" width="75" height="75" alt="" /></li>
                            <li>
                                <img src="http://static.flickr.com/58/199481218_264ce20da0_s.jpg" width="75" height="75" alt="" /></li>
                            <li>
                                <img src="http://static.flickr.com/69/199481255_fdfe885f87_s.jpg" width="75" height="75" alt="" /></li>
                            <li>
                                <img src="http://static.flickr.com/60/199480111_87d4cb3e38_s.jpg" width="75" height="75" alt="" /></li>
                            <li>
                                <img src="http://static.flickr.com/70/229228324_08223b70fa_s.jpg" width="75" height="75" alt="" /></li>
                                </ul>
                            </div>
                            <div class="dbInnerLeft">
                                <h2>-25</h2>
                                <p>Manager Sync</p>
                            </div>
                        </div>
                    </div>--%>
             <%--       <div class="dbBoxBottom">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
                        <h1>Standing <span class="storiesIcon">
                            <img src="../../Images/images/dbstandingIcon.png" alt="Stories Icon" border="0" /></span></h1>
                    </div>
                    <div class="dbarrow"></div>--%>
                </div>
                <div class="column dbBox dbmentors">
                    <%--<div class="dbBoxtop">
                        <div class="ui styled accordion">
                            <div class="active title activeyellow">
                                <div class="dbInnerBox yourmentors">
                                    <div class="dbInnerLeft">
                                        <h2>5</h2>
                                        <p>Your Mentors</p>
                                    </div>
                                    <div class="dbInnerarrow"></div>
                                </div>
                            </div>
                            <div class="active content">
                                <div class="dbInnerBox recognitionOthers">
                                    <div class="slider">
                                        <ul id="Ul4" class="first-and-second-carousel jcarousel-skin-tango">
                                            <li>
                                                <img src="http://static.flickr.com/66/199481236_dc98b5abb3_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/75/199481072_b4a0d09597_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/57/199481087_33ae73a8de_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/77/199481108_4359e6b971_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/58/199481143_3c148d9dd3_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/72/199481203_ad4cdcf109_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/58/199481218_264ce20da0_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/69/199481255_fdfe885f87_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/60/199480111_87d4cb3e38_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/70/229228324_08223b70fa_s.jpg" width="75" height="75" alt="" /></li>
                                        </ul>
                                    </div>
                                    <div class="dbInnerLeft">
                                        <h2>5</h2>
                                        <p>Recognition from Others</p>
                                    </div>
                                </div>
                                <div class="dbInnerBox recognitionOthers">
                                    <div class="slider">
                                        <ul id="Ul5" class="first-and-second-carousel jcarousel-skin-tango">
                                            <li>
                                                <img src="http://static.flickr.com/66/199481236_dc98b5abb3_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/75/199481072_b4a0d09597_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/57/199481087_33ae73a8de_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/77/199481108_4359e6b971_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/58/199481143_3c148d9dd3_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/72/199481203_ad4cdcf109_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/58/199481218_264ce20da0_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/69/199481255_fdfe885f87_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/60/199480111_87d4cb3e38_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/70/229228324_08223b70fa_s.jpg" width="75" height="75" alt="" /></li>
                                        </ul>
                                    </div>
                                    <div class="dbInnerLeft">
                                        <h2>5</h2>
                                        <p>Recognition from Others</p>
                                    </div>
                                </div>
                                <div class="pagination">
                                    <a href="#">1</a>
                                    <a href="#">2</a>
                                    <a href="#">3</a>
                                </div>
                            </div>
                            <div class="title">
                                <div class="dbInnerBox yourmentors">
                                    <div class="dbInnerLeft">
                                        <h2>5</h2>
                                        <p>Mentors For You</p>
                                    </div>
                                </div>
                            </div>
                            <div class="content">
                                <div class="dbInnerBox recognitionOthers">
                                    <div class="slider">
                                        <ul id="Ul6" class="first-and-second-carousel jcarousel-skin-tango">
                                            <li>
                                                <img src="http://static.flickr.com/66/199481236_dc98b5abb3_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/75/199481072_b4a0d09597_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/57/199481087_33ae73a8de_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/77/199481108_4359e6b971_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/58/199481143_3c148d9dd3_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/72/199481203_ad4cdcf109_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/58/199481218_264ce20da0_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/69/199481255_fdfe885f87_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/60/199480111_87d4cb3e38_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/70/229228324_08223b70fa_s.jpg" width="75" height="75" alt="" /></li>
                                        </ul>
                                    </div>
                                    <div class="dbInnerLeft">
                                        <h2>5</h2>
                                        <p>Recognition from Others</p>
                                    </div>
                                </div>
                                <div class="dbInnerBox recognitionOthers">
                                    <div class="slider">
                                        <ul id="Ul7" class="first-and-second-carousel jcarousel-skin-tango">
                                            <li>
                                                <img src="http://static.flickr.com/66/199481236_dc98b5abb3_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/75/199481072_b4a0d09597_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/57/199481087_33ae73a8de_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/77/199481108_4359e6b971_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/58/199481143_3c148d9dd3_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/72/199481203_ad4cdcf109_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/58/199481218_264ce20da0_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/69/199481255_fdfe885f87_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/60/199480111_87d4cb3e38_s.jpg" width="75" height="75" alt="" /></li>
                                            <li>
                                                <img src="http://static.flickr.com/70/229228324_08223b70fa_s.jpg" width="75" height="75" alt="" /></li>
                                        </ul>
                                    </div>
                                    <div class="dbInnerLeft">
                                        <h2>5</h2>
                                        <p>Recognition from Others</p>
                                    </div>
                                </div>
                                <div class="pagination">
                                    <a href="#">1</a>
                                    <a href="#">2</a>
                                    <a href="#">3</a>
                                </div>
                            </div>
                        </div>
                    </div>--%>
                 <%--   <div class="dbBoxBottom">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
                        <h1>Mentors <span class="storiesIcon">
                            <img src="../../Images/images/dbmentorsIcon.png" alt="Mentors" border="0" /></span></h1>
                    </div>
                    <div class="dbarrow"></div>--%>
                </div>
                <div class="column dbBox dbgoals">
                    <%--<div class="dbBoxtop">
                        <div class="dbInnerBox goalscompleted">
                            <div class="dbInnerLeft">
                                <h2>5</h2>
                                <p>Goals Completed</p>
                            </div>
                        </div>
                        <div class="dbInnerBox goalsshared">
                            <div class="slider">
                                <ul id="Ul8" class="first-and-second-carousel jcarousel-skin-tango">
                                    <li>
                                        <img src="http://static.flickr.com/66/199481236_dc98b5abb3_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/75/199481072_b4a0d09597_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/57/199481087_33ae73a8de_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/77/199481108_4359e6b971_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/58/199481143_3c148d9dd3_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/72/199481203_ad4cdcf109_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/58/199481218_264ce20da0_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/69/199481255_fdfe885f87_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/60/199480111_87d4cb3e38_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/70/229228324_08223b70fa_s.jpg" width="75" height="75" alt="" /></li>
                                </ul>
                            </div>
                            <div class="dbInnerLeft">
                                <h2>5</h2>
                                <p>Goals Shared</p>
                            </div>
                        </div>
                        <div class="dbInnerBox goalsdelayed">
                            <div class="dbInnerLeft">
                                <h2>5</h2>
                                <p>Goals Delayed</p>
                            </div>
                        </div>
                        <div class="dbInnerBox goalsset">
                            <div class="dbInnerLeft">
                                <h2>5</h2>
                                <p>Goals Set</p>
                            </div>
                        </div>
                    </div>--%>
                    <%--<div class="dbBoxBottom">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
                        <h1>Goals <span class="storiesIcon">
                            <img src="../../Images/images/dbgoalsIcon.png" alt="Goals" border="0" /></span></h1>
                    </div>
                    <div class="dbarrow"></div>--%>
                </div>
                <div class="column dbBox dbrecognition">
                    <%--<div class="dbBoxtop">
                        <div class="dbInnerBox recognitionOthers">
                            <div class="slider">
                                <ul id="Ul9" class="first-and-second-carousel jcarousel-skin-tango">
                                    <li>
                                        <img src="http://static.flickr.com/66/199481236_dc98b5abb3_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/75/199481072_b4a0d09597_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/57/199481087_33ae73a8de_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/77/199481108_4359e6b971_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/58/199481143_3c148d9dd3_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/72/199481203_ad4cdcf109_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/58/199481218_264ce20da0_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/69/199481255_fdfe885f87_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/60/199480111_87d4cb3e38_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/70/229228324_08223b70fa_s.jpg" width="75" height="75" alt="" /></li>
                                </ul>
                            </div>
                            <div class="dbInnerLeft">
                                <h2>5</h2>
                                <p>Recognition from Others</p>
                            </div>
                        </div>
                        <div class="dbInnerBox recognizedYou">
                            <div class="slider">
                                <ul id="Ul10" class="first-and-second-carousel jcarousel-skin-tango">
                                    <li>
                                        <img src="http://static.flickr.com/66/199481236_dc98b5abb3_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/75/199481072_b4a0d09597_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/57/199481087_33ae73a8de_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/77/199481108_4359e6b971_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/58/199481143_3c148d9dd3_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/72/199481203_ad4cdcf109_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/58/199481218_264ce20da0_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/69/199481255_fdfe885f87_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/60/199480111_87d4cb3e38_s.jpg" width="75" height="75" alt="" /></li>
                                    <li>
                                        <img src="http://static.flickr.com/70/229228324_08223b70fa_s.jpg" width="75" height="75" alt="" /></li>
                                </ul>
                            </div>
                            <div class="dbInnerLeft">
                                <h2>5</h2>
                                <p>Recognized By You</p>
                            </div>
                        </div>
                    </div>--%>
                    <%--<div class="dbBoxBottom">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
                        <h1>Recognition <span class="storiesIcon">
                            <img src="../../Images/images/dbrecognitionIcon.png" alt="Recognition" border="0" /></span></h1>
                    </div>
                    <div class="dbarrow"></div>--%>
                </div>
            </div>
        </div>

        <div class="sixteen wide column dbline" style="display: none;">
            <img src="../../Images/images/bottomLine.png" /></div>
    </div>

<%--    <footer class="site-footer">
        <div class="sixteen wide column">
            <div class="ui inverted menu">
                <span class="item">© 2015 PIPE9 Consulting</span>
                <a class="item">Terms</a>
                <a class="item">Privacy</a>
                <a class="item">Support</a>
            </div>
        </div>
    </footer>--%>

    <%--<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>--%>

    <script src="../../Scripts/ref/Dashboard/dashjquery-1.7.2min.js"></script>
     <script src="../../Scripts/ref/Dashboard/js/jquery.jcarousel.min.js"></script>
    <%--<script src="../../Scripts/ref/Dashboard/js/semantic.min.js"></script>--%>
   
   
<%--    <script type="text/javascript">
        $(document).ready(function () {
            $('.first-and-second-carousel').jcarousel();
            var allPanels = $('.accordion > dd').hide();

        });
    </script>--%>
    <script type="text/javascript">
        $(document).ready(function () {
            // Dropdown Menu

        });
    </script>

</asp:Content>