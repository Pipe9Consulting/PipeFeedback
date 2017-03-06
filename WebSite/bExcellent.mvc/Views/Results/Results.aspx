<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Results
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Results/overallResult.js"></script>
    <link href="../../Styles/Results/OverallResult.css" rel="stylesheet" />

    <%
        var t = 0;

        if (Session["SelectedPoe"] != null)
        {
            t = int.Parse(Session["SelectedPoe"].ToString());
        }

    %>

    <input type="hidden" id="selectedPoeValueStanding" value="<%:t%>" />
    <input type="hidden" id="selectedType" value="<%:t%>" />
    <div class="sixteen wide column breadMenu">
        <div class="breadcrumb">
            <a href="../Common/Index">Home</a>
            <i>> </i>
            <a href="../../results/results">Results</a>
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
                <h2>Results</h2>
                <div class="takeFeedbackLeft">
                    <div class="incompletefbMenu stiles tmmenu" data-type="Team" value="1" data-value="3" id="tm">
                        <div class="vertical-align-wrap builderTile">
                            <div class="teamStd vertical-align--bottom">

                                <a href="#">Results</a>
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
                <h2>Feedback Results Options</h2>
                <div class="givefbcontent">


                    <div class="column fblfristBox">
                        <div class="boxone" id="bigpic">
                            <h2><span>1</span>Feedback Results</h2>
                            <div class="boxTop">
                                <p>View your Feedback results at the Big Picture, Practice Area, and Excellence Action level.
</p>
                                <a id="" href="../FeedbackResults/FeedbackResults">Click Here</a>

                            </div>

                        </div>
                    </div>
                    <div class="column fblsecondBox">

                        <div class="boxone" id="digin">
                            <h2><span>2</span>Manager Sync</h2>
                            <div class="boxTop">
                                <p>For Managers, compare your Team-Feedback with your Team’s Self-Feedback. For ICs, compare your Self-Feedback to the Feedback provided by your Manager.</p>
                                <a href="../managersync/managersync">Click Here</a>

                            </div>

                        </div>

                    </div>
                    <div class="column fblthirdBox">

                        <div class="boxone" id="digdeeper">
                            <h2><span>3</span>Community Sync</h2>
                            <div class="boxTop">
                                <p>Compare Feedback results with the Role Community average, as well as the averages for your Area and Tenure group.
</p>
                                <a href="../communitysync/communitysync">Click Here</a>

                            </div>

                        </div>

                    </div>


                </div>


            </div>




        </div>

    </div>


</asp:Content>
