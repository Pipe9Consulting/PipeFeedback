<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Sync
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <script src="../../Scripts/ref/Sync/Sync.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Sync/synclanding.js" type="text/javascript"></script>

    <%--<link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />--%>
    <%-- <link href="../../Styles/Standing/standing-landing.css" rel="stylesheet" type="text/css" />--%>

    <%--- New Design Implementation ---%>

    <link href="../../Styles/Sync/V4Css/sync2.css" rel="stylesheet" type="text/css" />

    <%--- New Design Css End ---%>
    
    
         <%
            var t = 0;

            if (Session["SelectedPoe"] != null)
            {
                t = int.Parse(Session["SelectedPoe"].ToString());
            }

        %>



        <input type="hidden" id="selectedPoeValueSync" value="<%:t%>" />
        <input type="hidden" id="Synctype" value="0" />
        <input type="hidden" id="stilesClick" value="0" />
        <input type="hidden" id="OwnSubStatusSync" value="0" />




    <div class="sixteen wide column breadMenu">
        <div class="breadcrumb">
            <a href="../Common/Index">Home </a>
            <i>&nbsp>&nbsp</i>
            <a href="../Sync/SyncIndex">Sync </a>
        </div>
    </div>


    <%--    
         <div class="stand standlaning">
            <h1>Standing</h1>
            <li id="self" value="1" class="stiles" data-value="1">
                <img src="../Images/icons/self-ico.png" />
                <div class="number" id="selfScore">
                   
                </div>
                  <p>
                    Self
                </p>  --%>


    <div class="ui grid takefeedback">


        <div class="sixteen wide column">


            <div class="takefbLeftPart">
                <h2>Sync</h2>
                <div class="takeFeedbackLeft">



                    <div class="takeFeedbackMenu stiles"  value="1" id="you">
                        <div class="vertical-align-wrap productTile">
                            <div class="selfStd vertical-align--bottom" id="youSelect">
                                <p></p>

                                <a href="#">Self</a>
                            </div>
                        </div>
                    </div>

                    


                    <div class="takeFeedbackMenu stiles"  value="2" id="team">
                        <div class="vertical-align-wrap builderTile">
                            <div class="teamStd vertical-align--bottom" id="teamSelect">
                                <p></p>
                                <a href="#">Team</a>
                            </div>
                        </div>
                    </div>



          </div>
             </div>
        
        

        
        <%------------------------------------ REP (POE) Implementation -----------------------------------------%>
        
        
           <div class="profilePart">
                <h2>Select an REP</h2>
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
                    <div class="boxone" id="bigpic">
                            <h2>The Big Picture</h2>
                            <div class="boxTop">
                                <p>Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book. Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book. Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book.</p>
                                <a href="#">Click Here</a>

                            </div>

                        </div>
                    </div>
                    <div class="column fblsecondBox">

                       <div class="boxone" id="digin">
                            <h2>Practice Areas</h2>
                            <div class="boxTop">
                                <p>Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book. Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book. Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book.</p>
                                <a href="#">Click Here</a>

                            </div>

                        </div>

                    </div>
                    <div class="column fblthirdBox">

                        <div class="boxone" id="digdeep">
                            <h2>Excellece Actions</h2>
                            <div class="boxTop">
                                <p>Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book. Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book. Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book.</p>
                                <a href="#">Click Here</a>

                            </div>

                        </div>

                    </div>


                </div>


            </div>


        
           
        </div>

   </div>

     
        
        
        




        <%--
               
               </li>
            <li id="mgr" value="2" class="stiles" data-value="2">
                <img src="../Images/icons/manager-ico.png" />
                <div class="number" id="managerScore">
                
                </div>
                <p>
                    Manager
                </p>
           
                
                
                 </li>
            <li class="rectangle stiles" id="tm" value="1" data-value="3">
                <img src="../Images/team-ico.png" />
                <div class="number" id="teamscore">
                  
                </div>
                <p>
                    Team Members
                </p>
           
                
                
                 </li>
            <li id="skp" value="3" class="stiles" data-value="4">
                <img src="../Images/icons/skip-level.png" />
                <div class="number" id="skpmanagerScore">
                  
                </div>
                <p>
                    Skip Level Manager
                </p>
            
            
            
            </li>
            <li id="cust" value="6" class="stiles" data-value="5">
                <img src="../Images/customer-ico.png" />
                <div class="number" id="customerpartner">
                
                </div>
                <p>
                    Partners or Customers
                </p>
           
                
                
                 </li>
            <li id="prtm" value="4" class="stiles" data-value="6">
                <img src="../Images/peers-ico.png" />
                <div class="number" id="peerManager">
                 
                </div>
                <p>
                    Peers (Feedback given to peers)
                </p>
           
                
                
                 </li>
            <li id="prmgr" value="5" class="stiles" data-value="7">
                <img src="../Images/peers-ico.png" />
                <div class="number" id="peerTeamMember">
                  
                </div>
                <p>
                    Peers (Feedback given by peers)
                </p>
                        
                
        --%>



        <%--   </div>
        <div class="stand landingcol standlaning">
            <h1>Your REPs</h1>
            <div class="scroll2">
                <%--<ul id="poelist"></ul>--%>

        <%-- <li class="poelistli selected" id="Li1" value="13"><a>
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

            <h1> Available REPs</h1>
            <div class="scroll1">
                <ul id="poelist2">
                    <%--<li class="poelistli selected" id="Li14" value="13"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O Product Specialist" src="../../Images/AO Product Specialist_Intro.png">
                        </div>
                        <p>A&amp;O Product Specialist</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li15" value="12"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O AdSol Specialist" src="../../Images/AO AdSol Specialist_Intro.png">
                        </div>
                        <p>A&amp;O AdSol Specialist</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li16" value="11"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O Account Executive" src="../../Images/AO Account Executive_Intro.png">
                        </div>
                        <p>A&amp;O Account Executive</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li17" value="10"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O AM Manager" src="../../Images/AO AM Manager_Intro.png">
                        </div>
                        <p>A&amp;O AM Manager</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li18" value="9"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O Sales Manager" src="../../Images/AO Sales Manager_Intro.png">
                        </div>
                        <p>A&amp;O Sales Manager</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li19" value="8"><a>
                        <div class="icon">
                            <img class="img" alt="A&amp;O Account Manager" src="../../Images/AO Account Manager_Intro.png">
                        </div>
                        <p>A&amp;O Account Manager</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li20" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/LeadersMaketheFuture.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png">
                        </div>
                        <p>Leaders Make the Future</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li21" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/challenger-sale.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png">
                        </div>
                        <p>Challenger Selling</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li22" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/HumanSelling.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png">
                        </div>
                        <p>Human Selling</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li23" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/cloud-businss.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png">
                        </div>
                        <p>Cloud Business</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li24" style="opacity: 0.5;" onclick=""><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/social-selling.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/coming-soon.png">
                        </div>
                        <p>Social Selling</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li25" style="opacity: 0.5;" onclick=""><a>
                        <div class="icon">
                            <img class="img" alt="" src="../../Images/partner-manager.png">
                        </div>
                        <div class="comingsoon">
                            <img width="49" height="47" alt="coming soon" src="../../Images/coming-soon.png">
                        </div>
                        <p>Partner Manager</p>
                    </a><span></span></li>
                    <li class="poelistli" id="Li26" style="opacity: 0.5;" onclick=""><a>
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
    </div>
    <div class="stand landingcol standlandingtiles">
        <div class="clr">
        </div>
        <h1>Reports</h1>
        <ul id="optionlist">
            <li class="rectangle" id="bigpic">
                <div class="standcimg">
                    <img src="../../Images/standing-big-pic.png" />
                </div>
                <img src="../Images/icons/big-pic.png" />
                <p>
                    The Big Picture
                </p>
            </li>
            <li class="rectangle" id="digin">
                <div class="standcimg">
                    <img src="../../Images/stand-practice-area.png" />
                </div>
                <img src="../Images/icons/practice-area.png" /><p>
                    Practice Areas
                </p>
            </li>
            <li class="rectangle" id="digdeeper">
                <div class="standcimg">
                    <img src="../../Images/stand-excellence.png" />
                </div>
                <img src="../Images/icons/excellence-indicator.png" /><p>
                    <%--Excellence Indicators--%>
   
</asp:Content>
