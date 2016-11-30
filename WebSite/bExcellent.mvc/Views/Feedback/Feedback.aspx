<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Feedback
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <script language="javascript" type="text/javascript" src="../../Scripts/ref/Feedback/feedbacklanding.js"></script>
    <script src="../../Scripts/ref/Feedback.js" type="text/javascript"></script>
    <%--<link href="../../Styles/Feedback_landing.css" rel="stylesheet" type="text/css" />--%>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <link href="../../Styles/feedback/feedbacklanding.css" rel="stylesheet" type="text/css" />
    <%-- <form method="POST" action="/Feedback/Managerfeedback">
        <input type="hidden" name="userIds" id="HdnuserIds" />
    </form>--%>
    <form method="POST" action="/Feedback/RedirectWelcome">
        <input type="hidden" name="userIds" id="HdnuserIds" />
    </form>
    <div class="popupbg">
        &nbsp; 
    </div>
    <div class="popup">
        <div class="close">
        </div>
        <p id="info">
            Your request has been sent successfully
        </p>
    </div>
    <div class="reviewCoaching">

        <div class="rcnbackground rcnPart" style="display: none;">
            <div class="close">
            </div>
            <ul id="poemodule" class="praticeAreaFC">
            </ul>
        </div>
    </div>

    <div class="requestpopup" id="newpopup">
        <div class="close">
        </div>
        <p id="P2">
            Send Request through
        </p>
        <div style="clear: both;"></div>
        <div>
            <a id="requestEmail">Email</a>
            <a id="requestTool">PIPE9</a>
            <a id="requestYammer">Yammer</a>
        </div>
    </div>
    <div id="hiddenids" style="display: none;">
        <input id="fbgvnpagecount" type="hidden" value="1" />
        <input id="fbrcvdpagecount" type="hidden" value="1" />
        <input id="fbrcvmbrpagecount" type="hidden" value="1" />
        <input id="fbgvmbrpagecount" type="hidden" value="1" />
        <input id="fbinvmbrpagecount" type="hidden" value="1" />
        <input id="fbstspagecount" type="hidden" value="1" />
        <input id="fbhispagecount" type="hidden" value="1" />
        <input id="fbgvncurpage" type="hidden" value="1" />
        <input id="fbrcvdcurpage" type="hidden" value="1" />
        <input id="fbrcvmbrcurpage" type="hidden" value="1" />
        <input id="fbgvcurpage" type="hidden" value="1" />
        <input id="fbinvcurpage" type="hidden" value="1" />
        <input id="fbstscurpage" type="hidden" value="1" />
        <input id="fbhiscurpage" type="hidden" value="1" />
        <input type="hidden" id="OwnSubStatusFeedback" value="0" />
        <input type="hidden" id="historyCount" value="0" />
        <input type="hidden" id="hdnEmailMode" value="true" />
        <input type="hidden" id="fromstart" value="<%:TempData["fromstart"].ToString()%>" />
        <input type="hidden" id="tilemode" value="" />
        <input type="hidden" id="fbid" />
         <input type="hidden" id="isResumefeedback" value="0" />
         <input type="hidden" id="isSelfResume" value="0" />
        <input type="hidden" id="userratingcount" value="0" />
        <%
            var t = 0;

            if (Session["SelectedPoe"] != null)
            {
                t = int.Parse(Session["SelectedPoe"].ToString());
            }

        %>
        <%
            var h = 0;

            if (Session["FeedbackPage"] != null)
            {
                h = int.Parse(Session["FeedbackPage"].ToString());
            }
            var resultmode = "";

            if (Session["PoEResultMode"] != null)
            {
                resultmode = Session["PoEResultMode"].ToString();
            }

        %>
        <input type="hidden" id="selectedPoeValueFeedback" value="<%:t%>" />
        <input type="hidden" id="feedbackMode" value="<%:h%>" />
         <input type="hidden" id="resultmode" value="<%:resultmode %>" />
    </div>
    <div style="clear: both;"></div>

    <div class="sixteen wide column breadMenu">

        <div class="ui breadcrumb">
            <a class="section" href="../Common/Index">Home</a>
            <i>></i>
            <a class="section" href="../Feedback/Feedback">Feedback</a>
            <i>></i>
            <a class="section" id="breadcrumbtxt">Self-Feedback</a>
        </div>
    </div>


    <div class="ui grid takefeedback" id="overallLayer" style="visibility: hidden">

        <div class="sixteen wide column">

            <div class="takefbLeftPart">
                <h2>Feedback</h2>
                <div class="takeFeedbackLeft">
                    <div class="feedbackTileBg">
                        <div id="Take" class="takeFeedbackMenu takeFBtile">
                            <div class="vertical-align-wrap productTile">
                                <div class="takefbIcon vertical-align--bottom selectTake"><a href="#">Self-Feedback</a></div>
                            </div>
                        </div>
                        <div id="Give" class="takeFeedbackMenu giveFBtile">
                            <div class="vertical-align-wrap connectedTile">
                                <div class="givefbIcon vertical-align--bottom"><a href="#">Team-Feedback</a></div>
                            </div>
                        </div>
                        <div id="Request" class="takeFeedbackMenu invitetile">
                            <div class="vertical-align-wrap innovatorTile">
                                <div class="requestfbIcon vertical-align--bottom"><a href="#">Request Feedback</a></div>
                            </div>
                        </div>
                        <%--<div id="incomplete" class="takeFeedbackMenu statustile" style="display: none">
		<div class="vertical-align-wrap builderTile">
                                <div class="incompletefb vertical-align--bottom">
                                    <p id="incompleteFbCount"></p>
                                    <a href="#">Incomplete Feedback</a></div>
		</div>
		</div>--%>
                        <div id="history" class="historySmall historytile" style="display: none">
                            <div class="vertical-align-wrap builderTile">
                                <div class="historyfbIcon vertical-align--bottom"><a href="#">Completion History</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="profilePart">
                <h2>Activate a Profile</h2>
                <div class="profileCenter ">
                    <div class="scroll2" style="overflow: hidden; width: auto; height: 25%;">
                        <ul id="poelist1" class="profilesbigscroll">
                            <%--<li>
		            <a href="#"><div><img src="images/feedback/AO Product Specialist_Intro.png" /></div>
		            <p>Take Feedback</p>
		            </a>
		            </li>
		
		            <li>
		            <a href="#"><div><img src="images/feedback/AO Product Specialist_Intro.png" /></div>
		            <p>Take Feedback</p>
		            </a>
		
		            </li>
		
		            <li>
		            <a href="#"><div><img src="images/feedback/AO Product Specialist_Intro.png" /></div>
		            <p>Take Feedback</p>
		            </a>
		
		            </li>
		
		            <li class="selectArrow">
		            <a href="#"><div><img src="images/feedback/AO Product Specialist_Intro.png" /></div>
		            <p>Take Feedback</p>
		            </a>
		            <span></span>
		            </li>--%>
                        </ul>
                    </div>
                </div>
                <h2 id="reqfbh2" style="display: none;">Request Feedback</h2>
                <div class="innerrequestfbcontent" id="innerFbReq" style="display: none;">


                    <div class="column sendRequest" id="sendreqInside">
                        <div class="boxone">
                            <h2>MANAGER FEEDBACK
                                <br />
                                REQUEST
                            </h2>
                            <div>

                                <p>
                                    Ask your Manager to give you Feedback
                                </p>

                            </div>

                        </div>
                        <span id="receiveFbspan"></span>
                    </div>
                    <div class="column askRequest" id="askreqInside">

                        <div class="boxone">
                            <h2>SELF-FEEDBACK
                                <br />
                                REQUEST</h2>
                            <div>

                                <p>Ask a member of your team to complete Self-Feedback </p>

                            </div>

                        </div>
                        <span id="recFbspan"></span>
                    </div>



                </div>
            </div>

            <div class="takefbRightPart takeFb" id="takeFb">
                <h2>Self-feedback</h2>
                <div class="takefbcontent">

                    <div class="column generalFb">
                        <div class="boxone">
                            <h2>Self-Feedback</h2>
                            <div class="fbboxbtn">

                                <p>Complete Self-Feedback based on your Role Excellence Profile. The Feedback you provide is only for development purposes and will help you identify your development priorities and achieve excellence in role.</p>
                                <a id="feedback-detailsview" href="#">Start</a>

                            </div>

                        </div>
                    </div>
                    <div class="column quickFb" style="display: none">

                        <div class="boxone">
                            <h2>Quick Self-Feedback</h2>
                            <div class="fbboxbtn">

                                <p>A simplified feedback process for those who have completed Self-Feedback before and are familiar with their Role Excellence Profile.</p>
                                <a id="feedback-quickview" href="#">Start</a>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div class="takefbRightPart" id="takefbResume" style="display: none">
                <h2>Self-feedback</h2>
                <div class="takefbcontent">

                    <div class="column generalFb">
                        <div class="boxone">
                            <h2>Self-Feedback</h2>
                            <div class="fbboxbtn2">
                                <h3>Resume</h3>
                                <p>Continue where you left off</p>
                                <a class="" id="resumeSelf" data-value="" href="">Resume</a>

                            </div>
                            <div style="clear: both;"></div>
                            <div class="fbboxbtn2">
                                <h3>Start Over</h3>
                                <p>Start Feedback from the beginning</p>
                                <a href="javascript:;" id="startNormal" class="">Start</a>

                            </div>

                        </div>
                    </div>
                    <div class="column quickFb" style="display: none">

                        <div class="boxone">
                            <h2>Quick Self-Feedback</h2>
                            <div class="fbboxbtn">

                                <p>A simplified feedback process for those who have completed Self-Feedback before and are familiar with their Role Excellence Profile.</p>
                                <a id="A2" href="#">Start</a>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div class="takefbRightPart giveFb" style="display: none;" id="giveFb">
                <h2>Team feedback</h2>
                <div class="givefbcontent" id="giveFbArea">
                    <div class="column fblfristBox">
                        <div class="boxone">
                            <h2>Team Members</h2>
                            <div class="fbboxbtn2">
                                <h3>Resume</h3>
                                <p>Continue where you left off</p>
                                <a class="allteammemfb" id="resumeTeamfb" data-value="givefbTeam" href="">Resume</a>

                            </div>
                            <div style="clear: both;"></div>
                            <div class="fbboxbtn2">
                                <h3>Start Over</h3>
                                <p>Start Feedback from the beginning.</p>
                                <a href="javascript:;" id="Teammembers" class="chooseindividuals">Start</a>

                            </div>
                        </div>
                    </div>
                    <%--<div class="column fblsecondBox">
                        <div class="boxone">
                            <h2>Peers</h2>
                            <div class="fbboxbtn3">
                               
                                <p>Give Feedback to your Peers.</p>
                                <a href="#" id="Peersmembers" class="chooseindividuals">Start</a>

                            </div>

                        </div>

                    </div>--%>
                    <div class="column fblthirdBox">
                        <div class="boxone">
                            <h2>Your Network</h2>
                            <%--<div>
						<h3>Team</h3>
						<p>Lorem Ipsum has been the industry's standard dummy took a type scrambled it to make a type book. </p>
						<a class="allteammemfb" data-value="givefbOtherTeam" href="javascript:;">Click Here</a>
								
					</div>--%>
                            <%--<div style="clear:both;"></div>--%>
                            <div class="fbboxbtn3">
                                <%--	<h3>Choose Individuals</h3>--%>
                                <p>Give Feedback to other individuals in your Network </p>
                                <a href="javascript:;" id="OtherTeammembers" class="chooseindividuals">Start</a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="takefbRightPart requestFb " id="receiveFb" style="display: none;">
                <h2>Request feedback</h2>
                <div class="requestfbcontent" id="reqCnt">


                    <div class="column sendRequest" id="feedSendReq">
                        <div class="boxone">
                            <h2>MANAGER FEEDBACK<br />
                                REQUEST         </h2>
                            <div class="fbboxbtn">

                                <p>
                                    Ask your Manager to give you Feedback.
                                </p>
                                <a href="javascript:;" data-fbtype="receiveFb" class="chooseindividuals">Click Here</a>

                            </div>

                        </div>
                    </div>
                    <div class="column askRequest" id="feedAskReq">

                        <div class="boxone">
                            <h2>SELF-FEEDBACK
                                <br />
                                REQUEST   </h2>
                            <div class="fbboxbtn">

                                <p>
                                    Ask a member of your team to complete Self-Feedback. 
                                </p>
                                <a href="javascript:;" data-fbtype="recFb" class="chooseindividuals">Click Here</a>

                            </div>

                        </div>

                    </div>



                </div>
            </div>

            <div class="takefbRightPart giveInnerPart giveFbInnerPart" id="giveFb" style="display: none;">
                <h2>Team-Feedback <span>- Choose Individuals</span></h2>
                <div><input type="button" id="selectallTeam" value="Select All"/></div>
                <%--<div class="givefbInnermenu">
                    <ul>
                        <li id="Team" class="teamGfbIcon selectTeam"><a href="#">Team Members</a></li>
                        <li id="OtherTeam" class="otherteamGfbIcon selectOtherTeam"><a href="#">Other Team Members</a></li>
                        <li id="Peers" class="peersGfbIcon selectPeers"><a href="#">Peers</a></li>
                    </ul>
                </div>--%>

                <div class="givefbContent">
                    <div id="givefbTeam" class="givefbT">
                    </div>
                    <div id="givefbTeampaging">
                    </div>
                    <div id="givefbOtherTeam" class="givefbTM" style="display: none;">
                    </div>
                    <div id="givefbOtherTeampaging" style="display: none;">
                    </div>
                    <div id="givefbPeers" class="givefbP" style="display: none;">
                    </div>
                    <div id="givefbPeerspaging" style="display: none;">
                    </div>
                </div>
                <%-- <div class="givefbContent">

                        
                       <div class="column givefbmessage givefbTeam">
                            <img src="../images/feedback/ProfileImage.png" />
                            <div class="givefbmessagedetails">
                                <p>Name : <span>Mike Moore</span></p>
                                <p>Alias : <span>mmetest@Microsoft.com</span></p>
                                <p>Title : <span>Manager</span></p>
                                <p>Country : <span>APAC</span></p>

                            </div>
                        </div>
                        <div class="column givefbmessage givefbTeam">
                            <img src="../images/feedback/ProfileImage.png" />
                            <div class="givefbmessagedetails">
                                <p>Name : <span>Mike Moore</span></p>
                                <p>Alias : <span>mmetest@Microsoft.com</span></p>
                                <p>Title : <span>Manager</span></p>
                                <p>Country : <span>APAC</span></p>

                            </div>
                        </div>
                        <div class="column givefbmessage givefbOtherTeam">
                            <img src="../images/feedback/ProfileImage.png" />
                            <div class="givefbmessagedetails">
                                <p>Name : <span>Mike Moore</span></p>
                                <p>Alias : <span>mmetest@Microsoft.com</span></p>
                                <p>Title : <span>Manager</span></p>
                                <p>Country : <span>APAC</span></p>

                            </div>
                        </div>
                        <div class="column givefbmessage givefbPeers">
                            <img src="../images/feedback/ProfileImage.png" />
                            <div class="givefbmessagedetails">
                                <p>Name : <span>Mike Moore</span></p>
                                <p>Alias : <span>mmetest@Microsoft.com</span></p>
                                <p>Title : <span>Manager</span></p>
                                <p>Country : <span>APAC</span></p>

                            </div>
                        </div>
                         <div class="column givefbmessage givefbPeers">
                            <img src="../images/feedback/ProfileImage.png" />
                            <div class="givefbmessagedetails">
                                <p>Name : <span>Mike Moore</span></p>
                                <p>Alias : <span>mmetest@Microsoft.com</span></p>
                                <p>Title : <span>Manager</span></p>
                                <p>Country : <span>APAC</span></p>

                            </div>
                        </div>
                        <div class="column givefbmessageDummy">
                        
                        </div>

                

                        <div class="givefbBtn"><a href="#">Give Feedback</a></div>
                        <div class="clearfix"></div>
                        <div class="paginationfb">

                            <ul>
                                <li><span class="fristpage"></span></li>
                                <li><span class="prepage"></span></li>
                                <li><a href="#" class="activeArrow">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><span class="nextpage"></span></li>
                                <li><span class="lastpage"></span></li>
                            </ul>

                        </div>


                    </div>--%>
            </div>

            <div class="takefbRightPart giveInnerPart receiveFbInnerPart RequestfbInnerPart" id="Requestfb" style="display: none;">
                <h2>Request Feedback <span>- Choose Individuals</span></h2>
                <div class="givefbInnermenu">
                    <ul>
                        <li id="skip" class="skipLevelRfb selectskip"><a href="#">Skip Level Managers</a></li>
                        <li id="manager" class="managerRfb"><a href="#">Managers</a></li>
                        <%--selectmanager--%>
                        <li id="Peers" class="peersGfbIcon"><a href="#">Peers</a></li>
                        <%--selectPeers--%>
                        <li id="customer" class="customerRFb"><a href="#">customers & Partners</a></li>
                        <%--selectcustomer--%>
                    </ul>
                </div>
                <div class="givefbContent">
                    <%--<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>--%>
                    <div id="requestfbskip" class="Requestskipfb"></div>
                    <div id="requestfbskippaging"></div>
                    <div id="requestfbmanager" class="Requestmanagerfb"></div>
                    <div id="requestfbmanagerpaging"></div>
                    <div id="requestfbPeers" class="RequestPeersfb"></div>
                    <div id="requestfbPeerspaging"></div>
                    <div id="requestfbcustomer" class="Requestcustomerfb"></div>
                    <div id="requestfbcustomerpaging"></div>
                    <%-- <div class="column givefbmessage">
                    <img src="../images/feedback/ProfileImage.png" />
                    <div class="givefbmessagedetails">
                        <p>Name : <span>Mike Moore</span></p>
                        <p>Alias : <span>mmetest@Microsoft.com</span></p>
                        <p>Title : <span>Manager</span></p>
                        <p>Country : <span>APAC</span></p>

                    </div>
                </div>
                <div class="column givefbmessage">
                    <img src="../images/feedback/ProfileImage.png" />
                    <div class="givefbmessagedetails">
                        <p>Name : <span>Mike Moore</span></p>
                        <p>Alias : <span>mmetest@Microsoft.com</span></p>
                        <p>Title : <span>Manager</span></p>
                        <p>Country : <span>APAC</span></p>

                    </div>
                </div>
                <div class="column givefbmessage">
                    <img src="../images/feedback/ProfileImage.png" />
                    <div class="givefbmessagedetails">
                        <p>Name : <span>Mike Moore</span></p>
                        <p>Alias : <span>mmetest@Microsoft.com</span></p>
                        <p>Title : <span>Manager</span></p>
                        <p>Country : <span>APAC</span></p>

                    </div>
                </div>
                <div class="column givefbmessage">
                    <img src="../images/feedback/ProfileImage.png" />
                    <div class="givefbmessagedetails">
                        <p>Name : <span>Mike Moore</span></p>
                        <p>Alias : <span>mmetest@Microsoft.com</span></p>
                        <p>Title : <span>Manager</span></p>
                        <p>Country : <span>APAC</span></p>

                    </div>
                </div>
                <div class="column givefbmessage">
                    <img src="../images/feedback/ProfileImage.png" />
                    <div class="givefbmessagedetails">
                        <p>Name : <span>Mike Moore</span></p>
                        <p>Alias : <span>mmetest@Microsoft.com</span></p>
                        <p>Title : <span>Manager</span></p>
                        <p>Country : <span>APAC</span></p>

                    </div>
                </div>
                <div class="column givefbmessageDummy">
                </div>
                <div class="column givefbmessageDummy">
                </div>
                <div class="column givefbmessageDummy">
                </div>

                <div class="givefbBtn"><a href="#">Send Request</a></div>
                <div class="clearfix"></div>
                <div class="paginationfb">

                    <ul>
                        <li><span class="fristpage"></span></li>
                        <li><span class="prepage"></span></li>
                        <li><a href="#" class="activeArrow">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><span class="nextpage"></span></li>
                        <li><span class="lastpage"></span></li>
                    </ul>
                </div>--%>
                </div>
            </div>

            <div class="takefbRightPart giveInnerPart recFbInnerPart" id="recFb" style="display: none">
                <h2>Ask Team Members to take FeedBack </h2>
                <div class="givefbInnermenu">
                    <ul>
                        <li id="Team" class="teamGfbIcon selectTeam"><a href="#">Team Members</a></li>
                        <li id="OtherTeam" class="otherteamGfbIcon"><a href="#">Other Team Members</a></li>
                        <li id="Peers" class="peersGfbIcon"><a href="#">Peers</a></li>
                    </ul>
                </div>
                <div class="givefbContent">
                    <div id="recfbTeam" class="recfbT"></div>
                    <div id="recfbTeampaging"></div>
                    <div id="recfbOtherTeam" class="recfbTM" style="display: none;"></div>
                    <div id="recfbOtherTeampaging" style="display: none;"></div>
                    <div id="recfbPeers" class="recfbP" style="display: none;"></div>
                    <div id="recfbPeerspaging" style="display: none;"></div>
                    <%--<div class="column givefbmessage">
                <img src="../images/feedback/ProfileImage.png" />
                <div class="givefbmessagedetails">
                    <p>Name : <span>Mike Moore</span></p>
                    <p>Alias : <span>mmetest@Microsoft.com</span></p>
                    <p>Title : <span>Manager</span></p>
                    <p>Country : <span>APAC</span></p>

                </div>
            </div>
            <div class="column givefbmessage">
                <img src="../images/feedback/ProfileImage.png" />
                <div class="givefbmessagedetails">
                    <p>Name : <span>Mike Moore</span></p>
                    <p>Alias : <span>mmetest@Microsoft.com</span></p>
                    <p>Title : <span>Manager</span></p>
                    <p>Country : <span>APAC</span></p>

                </div>
            </div>
            <div class="column givefbmessage">
                <img src="../images/feedback/ProfileImage.png" />
                <div class="givefbmessagedetails">
                    <p>Name : <span>Mike Moore</span></p>
                    <p>Alias : <span>mmetest@Microsoft.com</span></p>
                    <p>Title : <span>Manager</span></p>
                    <p>Country : <span>APAC</span></p>

                </div>
            </div>
            <div class="column givefbmessage">
                <img src="../images/feedback/ProfileImage.png" />
                <div class="givefbmessagedetails">
                    <p>Name : <span>Mike Moore</span></p>
                    <p>Alias : <span>mmetest@Microsoft.com</span></p>
                    <p>Title : <span>Manager</span></p>
                    <p>Country : <span>APAC</span></p>

                </div>
            </div>
            <div class="column givefbmessage">
                <img src="../images/feedback/ProfileImage.png" />
                <div class="givefbmessagedetails">
                    <p>Name : <span>Mike Moore</span></p>
                    <p>Alias : <span>mmetest@Microsoft.com</span></p>
                    <p>Title : <span>Manager</span></p>
                    <p>Country : <span>APAC</span></p>

                </div>
            </div>
            <div class="column givefbmessageDummy">
            </div>
            <div class="column givefbmessageDummy">
            </div>
            <div class="column givefbmessageDummy">
            </div>
            <div class="givefbBtn"><a href="#">Send Request</a></div>
            <div class="clearfix"></div>
            <div class="paginationfb">
                <ul>
                    <li><span class="fristpage"></span></li>
                    <li><span class="prepage"></span></li>
                    <li><a href="#" class="activeArrow">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><span class="nextpage"></span></li>
                    <li><span class="lastpage"></span></li>
                </ul>
            </div>
        </div>--%>
                </div>
            </div>

            <div class="takefbRightPart giveInnerPart incompletefbhistory" style="display: none;">
                <h2>Incomplete</h2>
                <div class="givefbContent histroyArea">
                    <div class="clearIncomplete">

                        <a href="#">Clear Incomplete History</a>
                    </div>
                    <%-- <div class="column givefbmessage">
                    <h3>Incomplete Profile Feedback</h3>
                    <img src="../images/feedback/ProfileImage.png" />
                    <div class="givefbmessagedetails">
                        <p>Name : <span>Mike Moore</span></p>
                        <p>Alias : <span>mmetest@Microsoft.com</span></p>
                        <p>Title : <span>Manager</span></p>
                        <p>Country : <span>APAC</span></p>

                    </div>
                    <div class="clear"></div>
                    <div class="incompleteBtn">
                        <p>Requested on: May 20, 2015</p>
                        <a href="#">Resume Feedback</a>
                    </div>
                </div>
                <div class="column givefbmessage">
                    <h3>Incomplete Profile Feedback</h3>
                    <img src="../images/feedback/ProfileImage.png" />
                    <div class="givefbmessagedetails">
                        <p>Name : <span>Mike Moore</span></p>
                        <p>Alias : <span>mmetest@Microsoft.com</span></p>
                        <p>Title : <span>Manager</span></p>
                        <p>Country : <span>APAC</span></p>

                    </div>
                    <div class="clear"></div>
                    <div class="incompleteBtn">
                        <p>Requested on: May 20, 2015</p>

                        <a href="#">Resume Feedback</a>
                    </div>
                </div>
                <div class="column givefbmessage">
                    <h3>Incomplete Profile Feedback</h3>
                    <img src="../images/feedback/ProfileImage.png" />
                    <div class="givefbmessagedetails">
                        <p>Name : <span>Mike Moore</span></p>
                        <p>Alias : <span>mmetest@Microsoft.com</span></p>
                        <p>Title : <span>Manager</span></p>
                        <p>Country : <span>APAC</span></p>

                    </div>
                    <div class="clear"></div>
                    <div class="incompleteBtn">
                        <p>Requested on: May 20, 2015</p>

                        <a href="#">Resume Feedback</a>
                    </div>
                </div>
                <div class="column givefbmessage">
                    <h3>Incomplete Profile Feedback</h3>
                    <img src="../images/feedback/ProfileImage.png" />
                    <div class="givefbmessagedetails">
                        <p>Name : <span>Mike Moore</span></p>
                        <p>Alias : <span>mmetest@Microsoft.com</span></p>
                        <p>Title : <span>Manager</span></p>
                        <p>Country : <span>APAC</span></p>

                    </div>

                    <div class="clear"></div>
                    <div class="incompleteBtn">
                        <p>Requested on: May 20, 2015</p>

                        <a href="#">Resume Feedback</a>
                    </div>
                </div>
                <div class="column givefbmessage">
                    <h3>Incomplete Profile Feedback</h3>
                    <img src="../images/feedback/ProfileImage.png" />
                    <div class="givefbmessagedetails">
                        <p>Name : <span>Mike Moore</span></p>
                        <p>Alias : <span>mmetest@Microsoft.com</span></p>
                        <p>Title : <span>Manager</span></p>
                        <p>Country : <span>APAC</span></p>

                    </div>
                    <div class="clear"></div>
                    <div class="incompleteBtn">
                        <p>Requested on: May 20, 2015</p>

                        <a href="#">Resume Feedback</a>
                    </div>
                </div>
                <div class="column givefbmessageDummy">
                </div>--%>

                    <div class="clearfix"></div>
                    <div class="paginationfb">

                        <ul>
                            <li><span class="fristpage"></span></li>
                            <li><span class="prepage"></span></li>
                            <li><a href="#" class="activeArrow">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><span class="nextpage"></span></li>
                            <li><span class="lastpage"></span></li>
                        </ul>

                    </div>
                </div>
            </div>
            <div class="takefbRightPart giveInnerPart histroyfb historyInnerPart" id="history" style="display: none;">
                <h2>Completion History</h2>
                <div class="givefbInnermenu">
                    <ul>
                       <%-- <li id="skip" class="skipLevelRfb selectskip"><a href="#">Self-Feedback</a></li>
                        <li id="manager" class="managerRfb "><a href="#">Feedback Received</a></li>
                        <li id="Peers" class="peersGfbIcon "><a href="#">Feedback Given</a></li>--%>
                       
                        
                        <li id="customer" class="customerRFb selectcustomer"><a href="#">Feedback Completed</a></li>
                        <li id="incompleteItem" class="incompleteFB ">
                            <span id="incompleteFbCount">55</span>
                            <a href="#">Incomplete Feedback</a></li>
                       
                    </ul>
                </div>
                <div class="givefbContent">
                    <p id="historyComment">History of completed Self-Feedback.</p>
                    <div class="clearIncomplete clearfb">

                        <a href="#">Clear Incomplete History</a>
                    </div>
                    <div id="historyskip" class="HistoryTaken"></div>
                    <div id="historyskippaging"></div>
                    <div id="historymanager" class="HistoryReceived"></div>
                    <div id="historymanagerpaging"></div>
                    <div id="historyPeers" class="HistoryGiven"></div>
                    <div id="historyPeerspaging"></div>
                    <div id="historyincompleteItem" class="IncompleteAll"></div>
                    <div id="historyincompleteItempaging"></div>
                    <div id="historycustomer" class="HistoryAll"></div>
                    <div id="historycustomerpaging"></div>
                    <%-- <div class="column givefbmessage">
                    <h3>Incomplete Profile Feedback</h3>
                    <img src="../images/feedback/ProfileImage.png" />
                    <div class="givefbmessagedetails">
                        <p>Name : <span>Mike Moore</span></p>
                        <p>Alias : <span>mmetest@Microsoft.com</span></p>
                        <p>Title : <span>Manager</span></p>
                        <p>Country : <span>APAC</span></p>

                    </div>
                    <div class="clear"></div>
                    <div class="incompleteBtn">
                        <p>Completed on: May 18, 2015</p>
                        <a href="#">Save in OneNote</a>
                        <a href="#">View Notes</a>
                        <a href="#">More</a>
                    </div>
                </div>
                <div class="column givefbmessage">
                    <h3>Incomplete Profile Feedback</h3>
                    <img src="../images/feedback/ProfileImage.png" />
                    <div class="givefbmessagedetails">
                        <p>Name : <span>Mike Moore</span></p>
                        <p>Alias : <span>mmetest@Microsoft.com</span></p>
                        <p>Title : <span>Manager</span></p>
                        <p>Country : <span>APAC</span></p>

                    </div>
                    <div class="clear"></div>
                    <div class="incompleteBtn">
                        <p>Completed on: May 18, 2015</p>
                        <a href="#">Save in OneNote</a>
                        <a href="#">View Notes</a>
                        <a href="#">More</a>
                    </div>
                </div>
                <div class="column givefbmessage">
                    <h3>Incomplete Profile Feedback</h3>
                    <img src="../images/feedback/ProfileImage.png" />
                    <div class="givefbmessagedetails">
                        <p>Name : <span>Mike Moore</span></p>
                        <p>Alias : <span>mmetest@Microsoft.com</span></p>
                        <p>Title : <span>Manager</span></p>
                        <p>Country : <span>APAC</span></p>

                    </div>
                    <div class="clear"></div>
                    <div class="incompleteBtn">
                        <p>Completed on: May 18, 2015</p>
                        <a href="#">Save in OneNote</a>
                        <a href="#">View Notes</a>
                        <a href="#">More</a>
                    </div>
                </div>
                <div class="column givefbmessage">
                    <h3>Incomplete Profile Feedback</h3>
                    <img src="../images/feedback/ProfileImage.png" />
                    <div class="givefbmessagedetails">
                        <p>Name : <span>Mike Moore</span></p>
                        <p>Alias : <span>mmetest@Microsoft.com</span></p>
                        <p>Title : <span>Manager</span></p>
                        <p>Country : <span>APAC</span></p>

                    </div>

                    <div class="clear"></div>
                    <div class="incompleteBtn">
                        <p>Completed on: May 18, 2015</p>
                        <a href="#">Save in OneNote</a>
                        <a href="#">View Notes</a>
                        <a href="#">More</a>
                    </div>
                </div>
                <div class="column givefbmessage">
                    <h3>Incomplete Profile Feedback</h3>
                    <img src="../images/feedback/ProfileImage.png" />
                    <div class="givefbmessagedetails">
                        <p>Name : <span>Mike Moore</span></p>
                        <p>Alias : <span>mmetest@Microsoft.com</span></p>
                        <p>Title : <span>Manager</span></p>
                        <p>Country : <span>APAC</span></p>

                    </div>
                    <div class="clear"></div>
                    <div class="incompleteBtn">
                        <p>Completed on: May 18, 2015</p>
                        <a href="#">Save in OneNote</a>
                        <a href="#">View Notes</a>
                        <a href="#">More</a>
                    </div>
                </div>
                <div class="column givefbmessageDummy">
                </div>
                    
                <div class="clearfix"></div>
                <div class="paginationfb">

                    <ul>
                        <li><span class="fristpage"></span></li>
                        <li><span class="prepage"></span></li>
                        <li><a href="#" class="activeArrow">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><span class="nextpage"></span></li>
                        <li><span class="lastpage"></span></li>
                    </ul>

                </div>--%>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
