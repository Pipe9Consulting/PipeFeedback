﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - FeedbackGuide
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <%--   <script type="text/javascript" src="../../Scripts/ref/JqueryUI.js"></script>--%>
    <script src="../../Scripts/ref/Feedback/feedbackGuideSlider.js"></script>
    <script src="../../Scripts/ref/Feedback/feedbackGuide.js"></script>
    <link href="../../Styles/feedback/feedbackGuide.css" rel="stylesheet" />
    <%--    <link href="../../Styles/feedback/detailedview.css" rel="stylesheet" type="text/css" />--%>
    <style>
        .sliderdiv .ui-slider-range {
            background-image: url(../../Images/img/slidebg2.png);
            cursor: pointer;
        }

        .sliderdiv1 {
            background-image: url(../../Images/img/slidebg2-1.png) !important;
        }

        .sliderdiv2 {
            background-image: url(../../Images/img/slidebg2-2.png) !important;
        }

        .sliderdiv3 {
            background-image: url(../../Images/img/slidebg2-3.png) !important;
        }

        .sliderdiv4 {
            background-image: url(../../Images/img/slidebg2-4.png) !important;
        }

        .sliderdivRateQuestion1 {
            background-image: url(../../Images/Feedback/selfImp_1.png) !important;
        }

        .sliderdivRateQuestion2 {
            background-image: url(../../Images/Feedback/selfImp_2.png) !important;
        }

        .sliderdivRateQuestion3 {
            background-image: url(../../Images/Feedback/selfImp_3.png) !important;
        }

        .sliderdivRateQuestion4 {
            background-image: url(../../Images/Feedback/selfImp_4.png) !important;
        }


        #managerFeedContent .sliderdivRateQuestion1 {
            background-image: url("../../Images/Feedback/selfImp_1.png") !important;
        }

        #managerFeedContent .sliderdivRateQuestion2 {
            background-image: url("../../Images/Feedback/selfImp_2.png") !important;
        }

        #managerFeedContent .sliderdivRateQuestion3 {
            background-image: url("../../Images/Feedback/selfImp_3.png") !important;
        }

        #managerFeedContent .sliderdivRateQuestion4 {
            background-image: url("../../Images/Feedback/selfImp_4.png") !important;
        }


        .sliderdivCapQuestion1 {
            background-image: url(../../Images/Feedback/cap2-1.png) !important;
        }

        .sliderdivCapQuestion2 {
            background-image: url(../../Images/Feedback/cap2-2.png) !important;
        }

        .sliderdivCapQuestion3 {
            background-image: url(../../Images/Feedback/cap2-3.png) !important;
        }

        .sliderdivCapQuestion4 {
            background-image: url(../../Images/Feedback/cap2-4.png) !important;
        }
    </style>
    <%
        var h = 0;

        if (Session["fbmode"] != null)
        {
            h = int.Parse(Session["fbmode"].ToString());
        }

    %>
    <%
        var uname = "";

        if (Session["Uname"] != null)
        {
            uname = Session["Uname"].ToString();
        }

    %>
    <%
        var t = 0;

        if (Session["SelectedCapability"] != null)
        {
            t = int.Parse(Session["SelectedCapability"].ToString());
        }

    %>
    <input type="hidden" id="selectedMode" value="<%:h%>" />
    <input type="hidden" id="capabilityMode" value="<%:t %>" />
    <div class="sixteen wide column breadMenu">
        <div class="breadcrumb">
            <a href="../Common/Index">Home </a>
            <i>&nbsp>&nbsp</i>
            <a href="../Feedback/Feedback">Feedback</a>
            <i>&nbsp>&nbsp</i>
            <a href="#">Feedback Guide</a>

        </div>
    </div>

    <div class="wrapper ratingscaleSelfRemoved ratingscaleTeamRemoved">
        <div class="guideArea" id="selfFeedCont" style="display: none;">
            <p class="welcomeName">
                Hi <b><%:uname %></b>, before you begin <b>Self-Feedback</b>, please take a moment to complete this brief tutorial. 
            </p>
            <div class="clearfix"></div>
            <div id="selfGuide">
                <p class="stepText"><span class="stepNo">Step 1:</span> <span class="stepContent">Carefully read the Excellence Action at the top of each page. </span></p>
                <p class="selfImp stepText"><span class="stepNo">Step 2:</span> <span class="stepContent">Select how Important that Action is in your particular market using the Importance Scale. Ask yourself, “Is this Action critical for achieving success in my market?” </span></p>
                <p class="stepText"><span class="stepChange1 stepNo">Step 3:</span> <span class="stepContent">Select how Ready you are to demonstrate this Action. Ask yourself, “Have I been trained or coached to perform this Action? Do I have the knowledge or experience to perform this Action? Am I ready to do this?”</span></p>
                <p class="stepText"><span class="stepChange2 stepNo">Step 4:</span> <span class="stepContent">Select how Frequently you perform this action in your role. Ask yourself, “How often do I demonstrate this Action? Is this something I am doing frequently or always, or do I do it only sometimes or not at all?” Remember, your responses are for development purposes only.</span></p>
                <p class="stepText"><span class="stepChange3 stepNo">Step 5:</span> <span class="stepContent">When you are satisfied with your responses, click the “Next” button to proceed to the next Excellence Action. For now, click the “Next” button to begin Self-Feedback.</span></p>
            </div>
            <div class="clearfix"></div>
            <div class="questionPart">
                <div class="questiontaken">Sample Action</div>
                <div class="clearfix"></div>
                <div class="qn">1</div>
                <div class="questionarea detailedarea">
                    <p>Responds to each Excellence Action as accurately and honestly as possible.</p>
                    <div class="rateThisQuestion">
                        <div class="SI3 rateQuestions" style="display: none"><span>Importance Scale: </span>Select how important this Excellence Action is in your market</div>
                        <div class="rateOverall" style="display: none">
                            <div class="rateImg">
                                <img src="../../Images/Feedback/imp_icon.png" width="61" height="61" alt="User">
                            </div>
                            <div class="sliderdiv rateSlider" style="width: 562px; height: 50px; cursor: pointer;">
                                <img src="../../Images/img/rate_slidebg.png"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div>
                                <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0" style="left: 0%;"></span>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="capabilityQuestion">
                            <div class="SI3 capabalititys"><span>Capability Scale: </span>Select how ready you are to demonstrate this Excellence Action</div>
                            <div class="capOverall">
                                <div class="capImg">
                                    <img src="../../Images/Feedback/cap_icon.png" width="61" height="61" alt="User">
                                </div>
                                <div class="sliderdiv capSlider" style="width: 562px; height: 50px; cursor: pointer;">
                                    <img src="../../Images/Feedback/cap2bg.png"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div>
                                    <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0" style="left: 0%;"></span>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="sliderimg">
                            <div class="SI3"><span>Frequency Scale: </span>Select how often you demonstrate this Excellence Action</div>
                            <div class="freqOverall">
                                <div class="freqImg">
                                    <img src="../../Images/Feedback/frq_icon.png" width="61" height="61" alt="User">
                                </div>
                                <div class="sliderdiv freqSlider" style="width: 562px; height: 50px; cursor: pointer;">
                                    <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div>
                                    <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0" style="left: 0%;"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="clearfix"></div>
            <a href="../../Feedback/Detailedview" class="beginBtn">NEXT</a>

        </div>



        <div class="guideArea" id="managerFeedContent" style="display: none">
            <p class="welcomeName">
                Hi <b><%:uname %>,</b> before you begin <b>Team-Feedback,</b> please take a moment to complete this brief tutorial.
            </p>
            <div class="clearfix"></div>
            <div id="teamguide">
                <p class="stepText"><span class="stepNo">Step 1:</span> <span class="stepContent">Carefully read the Excellence Action at the top of each page. </span></p>
                <p class="selfImp stepText" style="display: none"><span class="stepNo">Step 2:</span> <span class="stepContent">Select how Important that Action is in your particular market using the Importance Scale. Ask yourself, “Is this Action critical for achieving success in my market? How important is it that my team members demonstrate this in their role?” </span></p>
                <p class="stepText"><span class="stepChange1 stepNo">Step 2:</span> <span class="stepContent">Select how Ready your team member is to demonstrate this Action. Ask yourself, “Has he or she been trained or coached to perform this Action? Does he or she have the knowledge or experience to perform this Action? Is he or she ready to do this?”</span></p>
                <p class="stepText"><span class="stepChange2 stepNo">Step 3:</span> <span class="stepContent">Select how Frequently you team member performs this action in role. Ask yourself, “How often does he or she demonstrate this Action? Is this something he or she is doing frequently or always, or does he or she do it only sometimes or not at all?” Remember, your responses are for development purposes only.</span></p>
                <p class="stepText"><span class="stepChange3 stepNo">Step 4:</span> <span class="stepContent">When you are satisfied with your responses, click the “Next” button to proceed to the next Excellence Action. For now, click the “Next” button to begin Team-Feedback.</span></p>
            </div>

            <div class="clearfix"></div>
            <div class="questionPart">
                <div class="questiontaken">Sample Action</div>
                <div class="clearfix"></div>
                <div class="qn">1</div>
                <div class="questionarea detailedarea">
                    <p>Responds to each Excellence Action as accurately and honestly as possible.</p>
                    <div class="clearfix"></div>

                    <div class="OverallScale ratingRemoved">
                        <div class="importanceArea" style="display: none">
                            <div class="slidercontent">
                                <img src="../../Images/Feedback/Icon/importanceIcon.png"><h4>Importance Scale</h4>
                                <p>Select how important this Excellence Action is in your market</p>
                            </div>
                        </div>
                        <div class="capabilityArea">
                            <div class="slidercontent">
                                <img src="../../Images/Feedback/Icon/capabilityIcon.png"><h4>Capability Scale</h4>
                                <p>Select how ready your team member is to demonstrate this Excellence Action</p>
                            </div>
                        </div>
                        <div class="frequencyArea">
                            <div class="slidercontent">
                                <img src="../../Images/Feedback/Icon/frequencyIcon.png"><h4>Frequency Scale</h4>
                                <p>Select how often your team member demonstrates this Excellence Action</p>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="teamFeedback ratingscaleRemoved">
                        <div class="teamUser">
                            <img src="../../Images/teamguideImg.png" width="61" height="61" alt="User"><span>John Barnes</span>
                        </div>
                        <div class="rateThisQuestion">

                            <div class="rateOverall" style="display: none">
                                <div class="rateImg">
                                    <img src="../../Images/Feedback/imp_icon.png" width="61" height="61" alt="User">
                                </div>
                                <div class="sliderdiv rateSlider" style="width: 562px; height: 50px; cursor: pointer;">
                                    <img src="../../Images/img/rate_slidebg.png"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div>
                                    <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0" style="left: 0%;"></span>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="capabilityQuestion">

                                <div class="capOverall">
                                    <div class="capImg">
                                        <img src="../../Images/Feedback/cap_icon.png" width="61" height="61" alt="User">
                                    </div>
                                    <div class="sliderdiv capSlider" style="width: 562px; height: 50px; cursor: pointer;">
                                        <img src="../../Images/Feedback/cap2bg.png"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div>
                                        <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0" style="left: 0%;"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="sliderimg">

                                <div class="freqOverall">
                                    <div class="freqImg">
                                        <img src="../../Images/Feedback/frq_icon.png" width="61" height="61" alt="User">
                                    </div>
                                    <div class="sliderdiv freqSlider" style="width: 562px; height: 50px; cursor: pointer;">
                                        <img src="../../Images/img/slidebg1.png"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div>
                                        <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0" style="left: 0%;"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="clearfix"></div>
            <a href="../../Feedback/Managerfeedback" class="beginBtn">NEXT</a><%--<a href="#" class="beginBtn">Begin</a>--%>
        </div>


    </div>
</asp:Content>
