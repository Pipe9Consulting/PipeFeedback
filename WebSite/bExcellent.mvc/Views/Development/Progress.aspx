<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Progress
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/Devpriorities/bootstrap.min.css" rel="stylesheet" />
    <link href="../../Styles/Devpriorities/progress.css" rel="stylesheet" />
    <script src="../../Scripts/ref/DevPriorities/devProgress.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            //$('#devprogress').slimscroll();
            // $('#usrList').slimscroll();
        });
    </script>

    <div class="breadcrumb">
        <a href="../Common/Index">Home </a>
        <i>&nbsp>&nbsp</i>
        <a href="../Development/Development">Development</a>
        <i>&nbsp>&nbsp</i>
        <a href="../Development/Progress">Progress</a>
    </div>
    <div class="container-fluid">
        <%
            var t = 0;

            if (Session["SelectedPoe"] != null)
            {
                t = int.Parse(Session["SelectedPoe"].ToString());
            }

        %>

        <input type="hidden" id="selectedPoeId" value="<%:t%>" />
        <input type="hidden" id="userMode" />
        <input type="hidden" id="selectPoe" />
        <div class="row">



            <div class="col-sm-3">
                <div class="user_tiles">
                    <h2>Progress</h2>
                    <ul id="usrList">
                    </ul>
                </div>
            </div>
            <div class="col-sm-9 priorities_part2">
                <h2 id="tblHeader">lorum Ipsum <span>- Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</span></h2>
                <input type="button" class="button_menu" onclick="Show_Div(option_menu)" />

                <div id="option_menu" class="optView" style="display: none; width: auto;">
                    <ul class="progress_practiceArea" id="poeModules">
                    </ul>




                </div>




                <!----------------------------------------------------------------------------- List View ---------------------------------------------->

                <div>

                    <div class="col-sm-12 prioitiesFrequency" id="progressfreq">

                        <ul class="frquencyHeader">
                            <li>#</li>
                            <li>Practice Area</li>
                            <li>Excellence Actions</li>
                            <li>Frequency</li>
                            <li>Progress</li>

                        </ul>
                        <div class="clearfix"></div>
                        <div class="frquencyContent" id="devprogress">
                        </div>
                    </div>
                </div>
                <div class="col-sm-9 ddummyerror" id="blankView" style="display: none;">

                    <div class="blankBox">


                        <p id="nofeedCont">Loram ipsum</p>

                    </div>

                </div>

            </div>

        </div>
    </div>

</asp:Content>
