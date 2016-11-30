<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Goal
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">


    <link href="../../Styles/Goals/goallanding.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Goal/goallanding.js" type="text/javascript"></script>


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

        <div class="ui breadcrumb">
            <a href="../../common/index" class="section">Home</a>
            <i>&nbsp>&nbsp</i>
            <a href="../../common/index" class=" section">Development Priorities</a>


        </div>
    </div>


    <div class="ui grid takefeedback">

        <div class="sixteen wide column">

            <div class="takefbLeftPart">
                <h2>Development Priorities</h2>
                <div class="takeFeedbackLeft">
                    <div class="goalTile">
                        <div class="vertical-align-wrap builderTile">
                            <div class="teamStd vertical-align--bottom selectGoal">
                                <a href="#">Development Priorities</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <div class="profilePart">
                <h2>Select Your Profile</h2>
                <div class="profileCenter ">
                    <div class="scroll2">
                        <ul id="poelist1">
                            <%--            <li>
                            <a href="#">
                                <div>
                                    <img src="images/feedback/AO Product Specialist_Intro.png" />
                                </div>
                                <p>A&O Product Specialist</p>
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
                        </li>--%>
                        </ul>
                    </div>


                </div>
            </div>






            <!------------------------------------------- Give FB Part ------------------------------------------>

            <div class="takefbRightPart">
                <h2>Options</h2>
                <div class="givefbcontent">


                    <div class="column fblfristBox">
                        <div class="boxone">
                            <h2>Set Development <br />Priorities</h2>
                            <div class="boxTop">
                                <p>Based on your managers feedback, learn about which Excellence Actions you should prioritize for development.</p>

                                <h5><a href="#">Click Here</a></h5>

                            </div>

                        </div>
                    </div>
                    <div class="column fblsecondBox">

                        <div class="boxone">
                            <h2>Track Development <br />Progress</h2>
                            <div class="boxTop">
                                <p>For each Development Priority track progress by setting an improvement-goal which can be used to track your progess the next time your manger provides feedback.</p>
                                <h5><a href="#">Click Here</a></h5>

                            </div>

                        </div>

                    </div>


                </div>


            </div>































        </div>

    </div>
</asp:Content>
