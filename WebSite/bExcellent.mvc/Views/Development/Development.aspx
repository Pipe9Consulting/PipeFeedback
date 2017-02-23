<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Development
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <link href="../../Styles/Devpriorities/bootstrap.min.css" rel="stylesheet" />
    <link href="../../Styles/Devpriorities/develop.css" rel="stylesheet" />
    <script src="../../Scripts/ref/DevPriorities/devLanding.js"></script>
            <div class="breadcrumb">
                <a href="../Common/Index">Home </a>
                <i>&nbsp>&nbsp</i>
                <a href="../Devlopment/Devlopment">Development</a>
            </div>

    <div class="container-fluid">
        <%
            var t = 0;

            if (Session["SelectedPoe"] != null)
            {
                t = int.Parse(Session["SelectedPoe"].ToString());
            }

        %>

        <input type="hidden" id="selectedPoe" value="<%:t%>" />
      
        <div class="row">

            <div class="col-sm-3">

                <div class="priorities_tiles">
                    <h2>Development</h2>
                    <ul>
                        <li>
                            <p>Development</p>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="col-sm-3">



                <div class="user_tiles">
                    <h2>Activate Your Profile</h2>
                    <ul id="poelist" class="scroll2">
                    </ul>
                </div>

            </div>



            <div class="col-sm-6 develop_option" id="normalView">

                <h2>Options</h2>


                <div class="option_part">

                    <div class="col-sm-6 priorities_div">

                        <img src="../../Images/DevPriorities/Landing/setgoalBg.jpg" />
                        <h2>Priorities</h2>
                        <div class="develop_content">
                            <p id="progressCont">View your Devlopment Priorities.</p>
                            <a href="../Development/Priorities">Click Here</a>
                        </div>



                    </div>
                    <div class="col-sm-6 progress_div" id="progressBoxes">

                        <img src="../../Images/DevPriorities/Landing/progressBg.jpg" />
                        <h2>Progress</h2>
                        <div class="develop_content">
                            <p id="prioritiesCont">Track your progress as you develop.</p>
                            <a href="#" id="clickProgress">Click Here</a>
                            <%--../Development/Progress--%>
                        </div>
                    </div>

                </div>




            </div>
            <div class="col-sm-6 develop_option" id="mixview" style="display: none">

                <h2>Options</h2>


                <div class="option_part">

                    <div class="col-sm-6 icView_div">

                        <img src="../../Images/DevPriorities/Landing/icview_img.jpg" />
                        <h2>IC View</h2>
                        <div class="develop_content">
                            <p>View your Development.</p>
                            <a id="goToIC">Click Here</a>
                        </div>


                    </div>
                    <div class="col-sm-6 managerView_div">

                        <img src="../../Images/DevPriorities/Landing/managerView_img.jpg" />
                        <h2>Manager View</h2>
                        <div class="develop_content">
                            <p>View your Team's Devlopment.</p>
                            <a id="goToManager">Click Here</a>
                        </div>
                    </div>

                </div>



            </div>

        </div>
    </div>


</asp:Content>
