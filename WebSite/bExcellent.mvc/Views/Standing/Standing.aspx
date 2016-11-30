<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Community Sync
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Standing/standinglanding.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Standing/standing.js" type="text/javascript"></script>

    <%--<link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />--%>
    <%-- <link href="../../Styles/Standing/standing-landing.css" rel="stylesheet" type="text/css" />--%>

    <%--- New Design Implementation ---%>

    <link href="../../Styles/standing/V4Css/standing2.css" rel="stylesheet" type="text/css" />

    <%--- New Design Css End ---%>


    <input type="hidden" id="OwnSubStatus" value="0" />

    <%
        var t = 0;

        if (Session["SelectedPoe"] != null)
        {
            t = int.Parse(Session["SelectedPoe"].ToString());
        }

    %>

    <input type="hidden" id="selectedPoeValueStanding" value="<%:t%>" />
    <input type="hidden" id="tileclick" value="0" />
    <input type="hidden" id="StandingTilesclick" value="0" />

    <div class="sixteen wide column breadMenu">
        <div class="breadcrumb">
            <a href="../Common/Index">Home</a>
            <i>> </i>
            <a href="../../communitysync/communitysync">Community Sync</a>
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
                <h2>Community Sync</h2>
                <div class="takeFeedbackLeft">



                    <div class="takeFeedbackMenu stiles" data-type="Self" value="1" id="self" data-value="1">
                        <div class="vertical-align-wrap productTile">
                            <div class="selfStd vertical-align--bottom selectedval" id="selfSelect">
                                <p></p>

                                <a href="#">Self</a>
                            </div>
                        </div>
                    </div>



                    <div class="takeFeedbackMenu stiles" data-type="Manager" value="2" data-value="2" id="mgr">
                        <div class="vertical-align-wrap connectedTile ">
                            <div class="managerStd vertical-align--bottom" id="mgrSelect">
                                <p></p>
                                <a href="#">Manager</a>
                            </div>
                        </div>
                    </div>



                    <div class="incompletefbMenu stiles tmmenu" data-type="Team" value="1" data-value="3" id="tm">
                        <div class="vertical-align-wrap builderTile">
                            <div class="teamStd vertical-align--bottom" id="tmSelect">
                                <p></p>
                                <a href="#">Team Members</a>
                            </div>
                        </div>
                    </div>







                    <div class="takeFeedbackMenu stiles" data-type="Skip" value="3" data-value="4" id="skp">
                        <div class="vertical-align-wrap innovatorTile">
                            <div class="skipStd vertical-align--bottom" id="skpSelect">
                                <p></p>
                                <a href="#">Skip-Level Manager</a>
                            </div>
                        </div>
                    </div>



                    <div class="takeFeedbackMenu stiles" data-type="Partners" value="6" data-value="5" id="cust">
                        <div class="vertical-align-wrap builderTile">
                            <div class="partnersStd vertical-align--bottom" id="custSelect">
                                <p></p>
                                <a href="#">Partners & Customers</a>
                            </div>
                        </div>
                    </div>



                    <div class="takeFeedbackMenu stiles" data-type="Peers" value="4" data-value="6" id="prtm">
                        <div class="vertical-align-wrap builderTile">
                            <div class="peersStd vertical-align--bottom" id="prtmSelect">
                                <p></p>
                                <a href="#">peers (feedback Given to peers)</a>
                            </div>
                        </div>
                    </div>



                    <div class="takeFeedbackMenu stiles" value="5" data-value="7" id="prmgr">
                        <div class="vertical-align-wrap builderTile">
                            <div class="peersStd vertical-align--bottom peersBy" id="prmgrSelect">
                                <p></p>
                                <a href="#">Peers (feedback Given By Peers)</a>
                            </div>
                        </div>
                    </div>
                     <div class="takeFeedbackMenu" value="5" data-value="7" id="dummyTile" style="display:none;cursor:none">
                        <div class="vertical-align-wrap">
                            <div class="dummytile vertical-align--bottom" id="Div2">
                                
                               
                            </div>
                        </div>
                    </div>


                </div>
            </div>



            <%------------------------------------ REP (POE) Implementation -----------------------------------------%>


            <div class="profilePart">
                <h2>Activate a Profile</h2>
                <div class="profileCenter">
                    <div class="scroll2">
                        <ul id="poelist1">
                          
                        </ul>
                    </div>

                </div>
            </div>







            <!------------------------------------------- Reports Part ------------------------------------------>

            <div class="takefbRightPart">
                <h2>Reports<span id="explanationText"></span></h2>
                <div class="givefbcontent">


                    <div class="column fblfristBox">
                        <div class="boxone" id="bigpic">
                            <h2>The Big Picture</h2>
                            <div class="boxTop">
                                <p>Compare Feedback results with the Role Community  at the overall level.</p>
                                <a id="bigpicclick" href="#">Click Here</a>

                            </div>

                        </div>
                    </div>
                    <div class="column fblsecondBox">

                        <div class="boxone" id="digin">
                            <h2>Practice Areas</h2>
                            <div class="boxTop">
                                <p>Compare Feedback results at the Practice Area level.</p>
                                <a id="paclick" href="#">Click Here</a>

                            </div>

                        </div>

                    </div>
                    <div class="column fblthirdBox">

                        <div class="boxone" id="digdeeper">
                            <h2>Excellence Actions</h2>
                            <div class="boxTop">
                                <p>Compare Feedback results at the Excellence Action level.</p>
                                <a id="eaclick" href="#">Click Here</a>

                            </div>

                        </div>

                    </div>


                </div>


            </div>




        </div>

    </div>









    
</asp:Content>
