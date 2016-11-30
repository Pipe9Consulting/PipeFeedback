<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Mentors
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    
  <%--  <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Sync/sync_landing.css" rel="stylesheet" type="text/css" />--%>
   
     <script src="../../Scripts/ref/Sync/Sync.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Mentor/MentorLanding.js" type="text/javascript"></script>
    
    
    
    <%--- New Design Implementation ---%>

    <link href="../../Styles/Mentor/V4Css/Mentor.css" rel="stylesheet" type="text/css" />

    <%--- New Design Css End ---%>
    

   <%-- <div class="pageholder">
        <div class="breadcrumb">
            Home > Sync
        </div>--%>
     
        
        
           <%
            var t = 0;

            if (Session["SelectedPoe"] != null)
            {
                t = int.Parse(Session["SelectedPoe"].ToString());
            }

        %>

        <input type="hidden" id="selectedPoeValueSync" value="<%:t%>" />
        <input type="hidden" id="mentorType" value="0" />
        <input type="hidden" id="stilesClick" value="0" />
        <input type="hidden" id="OwnSubStatusSync" value="0" />
       
    
    <div class="sixteen wide column breadMenu">
        <div class="breadcrumb">
            <a href="../Common/Index">Home </a>
            <i>&nbsp>&nbsp</i>
            <a href="../Mentor/Mentor">Mentors </a>
        </div>
    </div>
    
    
    
    
<%--     <div class="stand standlaning">
            <h1>Sync</h1>
            <div class="">
                <ul>
                    <li class="stiles" value="1" id="you">
                        <img src="../../Images/icons/self-ico.png" />
                        <%--<div class="number">
                        </div>
                        <p>
                            Self
                        </p>--%>
                   
    
  <%---------------------- Sync New Tile Implementation ------------------------%>
    
     <div class="ui grid takefeedback">


        <div class="sixteen wide column">


            <div class="takefbLeftPart">
                <h2>Mentors</h2>
                <div class="takeFeedbackLeft">



                    <div class="takeFeedbackMenu stiles"  value="1" id="you">
                        <div class="vertical-align-wrap productTile">
                            <div class="selfStd vertical-align--bottom" id="youSelect">
                                <p></p>

                                <a href="#">Mentors</a>
                            </div>
                        </div>
                    </div>

                    


               



          </div>
             </div>
        

            
       
        <%------------------------------------ REP (POE) Implementation -----------------------------------------%>
        
        
           <div class="profilePart">
                <h2>Select a Profile</h2>
                <div class="profileCenter">
                    <div class="scroll2">
                   <ul id="poelist1">
                        <%-- <li class="poelistli selected" id="poeli13" value="13"> 
                            <a href="#">
                                <div class="icon">
                                    <img class="img" src="../../Images/AO Product Specialist_Intro.png" />
                                </div>
                                <p>A&O Product Specialist</p>
                            </a>
                            <span></span>
                          </li>
                        

                        
                        <li class="poelistli"  id="poeli12" value="12">
                            <a href="#">
                                <div class="icon">
                                    <img class="img" src="../../Images/AO AdSol Specialist_Intro.png" />
                                </div>
                                <p>A&O AdSol Specialist</p>
                            </a>
                            <span></span>
                        </li>

                        <li class="poelistli" id="poeli11" value="11">
                            <a href="#">
                                <div class="icon">
                                    <img class="img" src="../../Images/AO Account Executive_Intro.png"/>
                                </div>
                                <p>A&O Account Executive </p>
                            </a>

                        </li>

                        <li class="selectArrow poelistli" id="poeli10" value="10">
                            <a href="#">
                                <div class="icon">
                                    <img class="img" src="../../Images/AO AM Manager_Intro.png" />
                                </div>
                                <p>A&O AM Manager</p>
                            </a>
                            <span></span>
                        </li>

                        
                        <li class="poelistli" id="poeli9" value="9">
                            <a href="#">
                                <div class="icon">
                                    <img class="img" src="../../Images/AO Sales Manager_Intro.png"/>
                                </div>
                                <p>A&O Sales Manager</p>
                            </a>
                            <span></span>
                        </li>

                        
                        <li class="poelistli" id="poeli8" value="8">
                            <a href="#">
                                <div class="icon">
                                    <img class="img"src="../../Images/AO Account Manager_Intro.png" />
                                </div>
                                <p>A&O Account Manager</p>
                            </a>
                            <span></span>
                        </li>

                        
                        <li class="poelistli" id="poeli6" style="opacity: 0.5;" onclick="CallPoelibrary(this)">
                            <a href="#">
                                <div class="icon">
                                    <img class="img" src="../../Images/LeadersMaketheFuture.png" />
                                </div>
                                 <div class="comingsoon">
                                      <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png">
                                     </div>
                                <p>Leaders Make the Future</p>
                            </a>
                            <span></span>
                        </li>
                        
                        
                        <li class="poelistli" id="poeli3" style="opacity: 0.5;" onclick="CallPoelibrary(this)">
                            <a href="#">
                                <div class="icon">
                                   <img class="img" src="../../Images/challenger-sale.png" />
                                </div>
                                <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png">
                                </div>
                                <p>Challenger Selling</p>
                            </a>
                            <span></span>
                        </li>
                        
                        
                        <li class="poelistli" id="poeli1" style="opacity: 0.5;" onclick="CallPoelibrary(this)">
                            <a href="#">
                                <div class="icon">
                                    <img class="img" alt="" src="../../Images/HumanSelling.png">
                            </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png">
                                </div>
                                <p>Human Selling</p>
                            </a>
                            <span></span>
                        </li>
                        
                        
                        <li class="poelistli" id="poeli2" style="opacity: 0.5;" onclick="CallPoelibrary(this)">>
                            <a href="#">
                                <div class="icon">
                                     <img class="img" alt="" src="../../Images/cloud-businss.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png">
                                </div>
                                <p>Cloud Business</p>
                            </a>
                            <span></span>
                        </li>
                        
                        
                        <li class="poelistli" id="poeli4" style="opacity: 0.5;" onclick="">
                            <a href="#">
                                <div class="icon">
                                      <img class="img" alt="" src="../../Images/social-selling.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/coming-soon.png">
                                </div>
                                <p>Social Selling</p>
                            </a>
                            <span></span>
                        </li>
                        
                        
                        <li class="poelistli" id="poeli5" style="opacity: 0.5;" onclick="">
                            <a href="#">
                                <div class="icon">
                                    <img class="img" alt="" src="../../Images/partner-manager.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/coming-soon.png">
                                </div>
                                <p>Partner Manager</p>
                            </a>
                            <span></span>
                        </li>
                        
                        
                        <li class="poelistli" id="poeli7" style="opacity: 0.5;" onclick="">
                            <a href="#">
                                <div class="icon">
                                    <img class="img" alt="" src="../../Images/inside-sales.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/coming-soon.png">
                                </div>
                                <p>Inside Sales</p>
                            </a>
                            <span></span>
                        </li>--%>

                    </ul>

                </div>
                </div>
              </div>
      
            
            
              <!------------------------------------------- Reports Part ------------------------------------------>

            <div class="takefbRightPart">
                <h2>Reports</h2>
                <div class="givefbcontent">


                    <div class="column fblfristBox">
                    <div class="boxone" id="potentialMentors">
                            <h2>Potential Mentors</h2>
                            <div class="boxTop">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                                <a id="pmClick" href="#">Click Here</a>

                            </div>

                        </div>
                    </div>
                    <div class="column fblsecondBox">

                       <div class="boxone" id="yourMentors">
                            <h2>Your Mentors </h2>
                            <div class="boxTop">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                                <a id="mentorsClick" href="#">Click Here</a>

                            </div>

                        </div>

                    </div>
                    <div class="column fblthirdBox">

                        <div class="boxone" id="yourMentees">
                            <h2>Your Mentees </h2>
                            <div class="boxTop">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                                <a id="menteesClick" href="#">Click Here</a>

                            </div>

                        </div>

                    </div>


                </div>


            </div>


        
           
        </div>

   </div>

    
    
    

            
         <%--   
              <div class="stand landingcol standlaning">
            <h1>Your REPs</h1>
            <div class="scroll2">
                <ul id="poelist">
                </ul>

                <ul id="poelist1">
                    <%-- <li class="poelistli selected" id="poeli13" value="13"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O Product Specialist" src="../../Images/AO Product Specialist_Intro.png">
                        </div>
                        <p>A&amp;O Product Specialist</p>
                    </a><span></span></li>
                    <li class="poelistli" id="poeli12" value="12"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O AdSol Specialist" src="../../Images/AO AdSol Specialist_Intro.png">
                        </div>
                        <p>A&amp;O AdSol Specialist</p>
                    </a><span></span></li>
                    <li class="poelistli" id="poeli11" value="11"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O Account Executive" src="../../Images/AO Account Executive_Intro.png">
                        </div>
                        <p>A&amp;O Account Executive</p>
                    </a><span></span></li>
                    <li class="poelistli" id="poeli10" value="10"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O AM Manager" src="../../Images/AO AM Manager_Intro.png">
                        </div>
                        <p>A&amp;O AM Manager</p>
                    </a><span></span></li>
                    <li class="poelistli" id="poeli9" value="9"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O Sales Manager" src="../../Images/AO Sales Manager_Intro.png">
                        </div>
                        <p>A&amp;O Sales Manager</p>
                    </a><span></span></li>
                    <li class="poelistli" id="poeli8" value="8"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O Account Manager" src="../../Images/AO Account Manager_Intro.png">
                        </div>
                        <p>A&amp;O Account Manager</p>
                    </a><span></span></li>
                    <li class="poelistli" id="poeli6" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/LeadersMaketheFuture.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png">
                        </div>
                        <p>Leaders Make the Future</p>
                    </a><span></span></li>
                    <li class="poelistli" id="poeli3" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/challenger-sale.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png">
                        </div>
                        <p>Challenger Selling</p>
                    </a><span></span></li>
                    <li class="poelistli" id="poeli1" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/HumanSelling.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png">
                        </div>
                        <p>Human Selling</p>
                    </a><span></span></li>
                    <li class="poelistli" id="poeli2" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/cloud-businss.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png">
                        </div>
                        <p>Cloud Business</p>
                    </a><span></span></li>
                    <li class="poelistli" id="poeli4" style="opacity: 0.5;" onclick=""><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/social-selling.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/coming-soon.png">
                        </div>
                        <p>Social Selling</p>
                    </a><span></span></li>
                    <li class="poelistli" id="poeli5" style="opacity: 0.5;" onclick=""><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/partner-manager.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/coming-soon.png">
                        </div>
                        <p>Partner Manager</p>
                    </a><span></span></li>
                    <li class="poelistli" id="poeli7" style="opacity: 0.5;" onclick=""><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/inside-sales.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/coming-soon.png">
                        </div>
                        <p>Inside Sales</p>
                    </a><span></span></li>
                </ul>
            </div>

            <h1> Available REPs</h1>
            <div class="scroll1">
                <ul id="poelist">
                </ul>

                <ul id="poelist2">
                    <li class="poelistli selected" id="Li1" value="13"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O Product Specialist" src="../../Images/AO Product Specialist_Intro.png">
                        </div>
                        <p>A&amp;O Product Specialist</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li2" value="12"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O AdSol Specialist" src="../../Images/AO AdSol Specialist_Intro.png">
                        </div>
                        <p>A&amp;O AdSol Specialist</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li3" value="11"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O Account Executive" src="../../Images/AO Account Executive_Intro.png">
                        </div>
                        <p>A&amp;O Account Executive</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li4" value="10"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O AM Manager" src="../../Images/AO AM Manager_Intro.png">
                        </div>
                        <p>A&amp;O AM Manager</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li5" value="9"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O Sales Manager" src="../../Images/AO Sales Manager_Intro.png">
                        </div>
                        <p>A&amp;O Sales Manager</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li6" value="8"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O Account Manager" src="../../Images/AO Account Manager_Intro.png">
                        </div>
                        <p>A&amp;O Account Manager</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li7" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/LeadersMaketheFuture.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png">
                        </div>
                        <p>Leaders Make the Future</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li8" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/challenger-sale.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png">
                        </div>
                        <p>Challenger Selling</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li9" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/HumanSelling.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png">
                        </div>
                        <p>Human Selling</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li10" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/cloud-businss.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png">
                        </div>
                        <p>Cloud Business</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li11" style="opacity: 0.5;" onclick=""><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/social-selling.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/coming-soon.png">
                        </div>
                        <p>Social Selling</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li12" style="opacity: 0.5;" onclick=""><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/partner-manager.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/coming-soon.png">
                        </div>
                        <p>Partner Manager</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li13" style="opacity: 0.5;" onclick=""><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/inside-sales.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/coming-soon.png">
                        </div>
                        <p>Inside Sales</p>
                    </a><span></span></li>
                </ul>
            </div>
        </div>
        <div class="stand landingcol synclandingtiles">
            <div class="synclandinghd">
                <h1>Reports</h1>
                <h1>Goals</h1>
            </div>
            <div class="clr">
            </div>
            <li class="rectangle" id="bigpic">
                <div class="syncimg">
                    <img src="../../Images/sync-big-pic.png" />
                </div>
                <img src="../Images/icons/big-pic.png" />
                <p>
                    The Big Picture
                </p>
            </li>
            <li class="rectangle" id="Goal">
                <div class="syncimg">
                    <img src="../../Images/track-goal.png" />
                </div>
                <img src="../Images/icons/rec-goal.png" /><p>
                    Set Goals
                </p>
            </li>
            <li class="rectangle" id="digin">
                <div class="syncimg">
                    <img src="../../Images/sync-practice-area.png" />
                </div>
                <img src="../Images/icons/practice-area.png" /><p>
                    Practice Areas
                </p>
            </li>
            <li class="rectangle" id="digdeeper">
                <div class="syncimg">
                    <img src="../../Images/sync-set-goal.png" />
                </div>
                <img src="../Images/icons/track-goal.png" /><p>
                    Track Goals
                </p>
            </li>
            <li class="rectangle" id="digdeep">
                <div class="syncimg">
                    <img src="../../Images/sync-excellence.png" />
                </div>
                <img src="../Images/icons/excellence-indicator.png" /><p>
                    Excellence Indicator(s)
                </p>
            </li>
        </div>
    </div>--%>

</asp:Content>