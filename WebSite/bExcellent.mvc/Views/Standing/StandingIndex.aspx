<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Feedback
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">


    <%--<link href="../../Styles/Feedback_landing.css" rel="stylesheet" type="text/css" />--%>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <link href="../../Styles/standing/V4Css/standing2.css" rel="stylesheet" type="text/css" />







    <div class="sixteen wide column breadMenu">

        <div class="ui breadcrumb">
            <a class="section">Home</a>
            <i>&nbsp>&nbsp</i>
            <a class=" section">Standing</a>
            

        </div>
    </div>


    <div class="ui grid takefeedback">

        <div class="sixteen wide column">

           
             <div class="takefbLeftPart">
                <h2>Standing</h2>
               <div class="takeFeedbackLeft">
                    
                   
                  
                    <div class="takeFeedbackMenu">
                        <div class="vertical-align-wrap productTile">
                            <div class="selfStd vertical-align--bottom selectSelf">
                                <p>  </p>
                                <a href="#">Self</a></div>
                        </div>
                    </div>



                   
                    <div class="takeFeedbackMenu">
                        <div class="vertical-align-wrap connectedTile">
                            <div class="managerStd vertical-align--bottom selectManager">
                                <p>55</p>
                                <a href="#">Manager</a></div>
                        </div>
                    </div>
                    
                   
                   
                 
                     <div class="incompletefbMenu">
                        <div class="vertical-align-wrap builderTile">
                            <div class="teamStd vertical-align--bottom selectTeam">
                                <p>55</p>
                                <a href="#">Team Members</a></div>
                        </div>
                    </div>
                   
                   
                   
                    <div class="takeFeedbackMenu">
                        <div class="vertical-align-wrap innovatorTile">
                            <div class="skipStd vertical-align--bottom selectSkip">
                                <p>55</p>
                                <a href="#">skip level manager</a></div>
                        </div>
                    </div>
                    
                   
                   
                   <div class="takeFeedbackMenu">
                        <div class="vertical-align-wrap builderTile">
                            <div class="partnersStd vertical-align--bottom selectPartners">
                                <p>55</p>
                                <a href="#">Partners of Customers</a>
                            </div>
                        </div>
                    </div>
                     
                   
                   
                   <div class="takeFeedbackMenu">
                        <div class="vertical-align-wrap builderTile">
                            <div class="peersStd vertical-align--bottom selectPeers">
                                <p>55</p>
                                <a href="#">peers (feedback Given to peers)</a>
                            </div>
                        </div>
                    </div>
                    
                   
                   
                    <div class="takeFeedbackMenu">
                        <div class="vertical-align-wrap builderTile">
                            <div class="peersStd vertical-align--bottom selectPeers">
                                <p>55</p>
                                <a href="#">Peers (feedback Given By Peers)</a>
                            </div>
                        </div>
                    </div>
                    
                   
                    
                </div>
            </div>


            
            
            
            
            <div class="profilePart">
                <h2>Select a Profile</h2>
                <div class="profileCenter ">
                    <ul>
                        <li>
                            <a href="#">
                                <div>
                                    <img src="images/feedback/AO Product Specialist_Intro.png" />
                                </div>
                                <p>A&O Product Specialist</p>
                            </a>

                        </li>

                        <li>
                            <a href="#">
                                <div>
                                    <img src="images/feedback/AO Product Specialist_Intro.png" />
                                </div>
                                <p>A&O AdSol Specialist</p>
                            </a>

                        </li>

                        <li>
                            <a href="#">
                                <div>
                                    <img src="images/feedback/AO Product Specialist_Intro.png" />
                                </div>
                                <p>A&O Account Executive </p>
                            </a>

                        </li>

                        <li class="selectArrow">
                            <a href="#">
                                <div>
                                    <img src="images/feedback/AO Product Specialist_Intro.png" />
                                </div>
                                <p>A&O AM Manager</p>
                            </a>
                            <span></span>
                        </li>

                    </ul>



                </div>
            </div>



            


            <!------------------------------------------- Give FB Part ------------------------------------------>

            <div class="takefbRightPart">
                <h2>Reports</h2>
                <div class="givefbcontent">


                    <div class="column fblfristBox">
                    <div class="boxone">
                            <h2>The Big Picture</h2>
                            <div class="boxTop">
                                <p>Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book. Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book. Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book.</p>
                                <a href="#">Click Here</a>

                            </div>

                        </div>
                    </div>
                    <div class="column fblsecondBox">

                       <div class="boxone">
                            <h2>Practice Areas</h2>
                            <div class="boxTop">
                                <p>Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book. Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book. Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book.</p>
                                <a href="#">Click Here</a>

                            </div>

                        </div>

                    </div>
                    <div class="column fblthirdBox">

                        <div class="boxone">
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
</asp:Content>
