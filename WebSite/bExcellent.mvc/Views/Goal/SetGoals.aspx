<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Goal
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">


    <link href="../../Styles/Goals/set.css" rel="stylesheet" />
    <link href="../../Styles/themes/default.min.css" rel="stylesheet" type="text/css" />
    <%--<link href="../../Styles/jquery-ui-1.8.21.css" rel="stylesheet" />--%>
    <link href="../../Styles/datepicker.css" rel="stylesheet" />
    <%--<link href="../../Styles/normalize.css" rel="stylesheet" />--%>
    <%--<script type="text/javascript" src="https://code.jquery.com/ui/1.11.0/jquery-ui.js"></script>--%>
    <script src="../../Scripts/ref/jquery-ui.js"></script>
    <script src="../../Scripts/jquery-sticklr-1.0.pack.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/editor/jquery.sceditor.min.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/jquery.expander.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>

    <script src="../../Scripts/ref/Goal/setGoals.js"></script>
    <script src="../../Scripts/jquery-sticklr-1.0.pack.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            $('#example-2').sticklr({
                showOn: 'click',
                stickTo: 'right'

            });

        });
    </script>
    <%
        var h = 0;

        if (Session["NetworkPage"] != null)
        {
            h = int.Parse(Session["NetworkPage"].ToString());
        }

    %>

    <input type="hidden" id="networkMode" value="<%:h%>" />
    <input type="hidden" id="selectedpoeDigdeep" />
    <input type="hidden" id="goalSharedWith" value="0" />

    <!--Yammer Popup-->
    <input type="hidden" id="hiddentThis" />


    <%
        var t = 0;
        if (Session["SelectedPoe"] != null)
        {
            t = int.Parse(Session["SelectedPoe"].ToString());
        }


        var p = 0;
        if (Session["subid"] != null)
        {
            p = int.Parse(Session["subid"].ToString());
        }
    %>

    <input type="hidden" id="Subid" value="<%:p%>" />
    <input type="hidden" id="selectedPoeValuePotentialMentors" value="<%:t%>" />
    <input type="hidden" id="potentialMentorsType" value="0" />
    <input type="hidden" id="selectedques" />
    <input type="hidden" id="tempshareid" />

    <div class="sixteen wide column breadMenu">
        <div class="breadcrumb">
            <a href="../Common/Index">Home </a>
            <i>&nbsp>&nbsp</i>
            <a href="../Goal/Index">Development Priorities</a>
            <i>&nbsp>&nbsp</i>
            <a href="../Goal/SetGoals">Set Development Priorities</a>

        </div>
    </div>

    <div id="indicator">

        <%--        <div id="sticky">



        <ul id="example-2" class="sticklr sticklr-right sticklr-js" style="top: 357.664px;">
            <li>
                <a href="#" id="eainfo" data-class="standBPInfo" class="standBPInfo" title="Site switcher">
                    <p>Track Goals Info</p>
                <span class="sticklr-arrow"></span></a>

                <ul class="standTable sticklr-active" style="margin-left: 20px; margin-right: 20px; opacity: 1; top: 0px; display: block;">
                    <li>

                        <div class="patable">
                            <h1 id="PAname">Track Goals</h1>

                            <p>Set, share, and track development goals based on the knowledge you have acquired about the practices you can adopt to achieve excellence in your role.</p>
                        </div>
                    </li>
                </ul>





            </li>







        </ul>
    </div>--%>






        <div class="popupbg">
            &nbsp;
        </div>

        <div class="wallgoal">
            <div class="close">
                <p>X</p>
            </div>
            <div class="goalDateShared" id="wallactcontent">
                <h3>You have set your goals successfully.
                    <br />
                    You have one week to reset your goals, after which you can reset only after the goal date.</h3>
                <h4>You can also share these goals with other members of your network by clicking on the share icon<span><img src="../../Images/icons/network-black.png" /></span></h4>
                <div class="vs-context-menu">

                    <ul id="assignees">
                        <%-- <li class="bold">Share this Goal with:</li>
                        <li data-value="-1">Everyone</li>--%>
                        <%--<li data-value="0">None</li>--%>
                    </ul>
                </div>
                <div class="scroll3">
                    <ul id="goalDateSharedList">
                        <%--     <li>
                       <div class="shareQn">1</div>
                       <div class="shareContent">
                           <div class="sharePa"><img src="../../Images/icons/AOProductSpecialist3.png" alt="Product" /><p>Product Guru</p></div>
                           <div class="clr"></div>
                           <p class="goalShareQn">Lorum ipsum is simply dummy text of the printing and typesetting industry dummy text of the printing.</p>
                           <p class="sharedGoalDate">Goal Date: June 21, 2015</p>
                           <a href="#" class="goalshareBtn" ><img src="../../Images/icons/network-black.png" /></a>

                       </div>
                   </li>--%>
                    </ul>
                </div>
                <div class="clr"></div>

                <div class="saveBtn" id="saveGoals"><a href="#">Done</a></div>

                <div id="goalContent"></div>
            </div>

        </div>

        <div class="goalNotSaved">

            <div class="close">
                <p>X</p>
            </div>

            <div class="goalNotSavedContent">

                <h3>Setting Goal date for less than one week will not make you to comeback and reset the goal date again.</h3>
            </div>

        </div>

        <div class="goalSavedPopup">

            <%--    <div class="close">
                <p>X</p>
            </div>--%>

            <div class="goalSavedPopContent">

                <h3>Your goals have been successfully shared with everyone you have assigned.</h3>
                <div class="goalsDeletBtn">
                    <a class="goalDateSuccessYes">OK</a>
                </div>
            </div>

        </div>


        <div class="goalDeletePopup">

            <div class="close">
                <p>X</p>
            </div>

            <div class="goalDeleteContent">

                <h3>Are you sure you want to delete this goal?</h3>
                <div class="goalsDeletBtn">
                    <a class="delYes">Yes</a>
                    <a class="delNo">No</a>
                </div>
            </div>


        </div>


        <div id="wrapper">
            <div style="clear: both;"></div>
            <div id="scroller">
                <ul>
                    <li>
                        <div class="pageholder">

                            <div id="customertiles">


                                <div class="customertiles tile">
                                    <h1>Set Development Priorities</h1>
                                    <div class="networkTile">
                                        <div class="scroll2">
                                            <ul id="practiceAreas">

                                                <%--  <li>
                                                <img src="../../Images/icons/AOProductSpecialist2.png" alt="Blogs" />

                                                <p>
                                                    Connected Communicator
                                                </p>
                                            </li>
                                            <li class="selected">

                                                <img src="../../Images/icons/AOProductSpecialist1.png" alt="Product" />

                                                <p>
                                                    Product Guru
                                                </p>
                                            </li>
                                                <img src="../../Images/icons/AOProductSpecialist4.png" alt="Blogs" />

                                                <p>
                                                    Relationship Builder
                                                </p>
                                            </li>--%>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="setGoalQA">
                                    <p class="clickText">Click on the calendar icon to set a goal date for each Development Priority</p>
                                    <div class="clr"></div>

                                    <div id="practiceAreaQuestions">
                                        <%-- <li>
                                            <div class="practiceArea">
                                                <img src="../../Images/icons/AOProductSpecialist1.png" alt="Product" />
                                                <p>Product Guru</p>

                                            </div>
                                            <div class="clr"></div>
                                            <div class="qn-answer">
                                                <div class="qn">1</div>
                                                <p class="goalAnswer">Lorem Ipsum is simply dummy text of the printing and typesetting industry dummy text of the printing</p>
                                            </div>
                                            <div class="clr"></div>
                                            <div class="managerRating">
                                                <div class="managerPhoto">
                                                    <img src="../Images/AO Account Executive_intro.png" />

                                                </div>
                                                <p>Alan Dowzall has rated you as</p>
                                                <div class="managerScore">
                                                    <img src="../Images/new/freSlider.png" />
                                                </div>


                                            </div>
                                            <div class="clr"></div>
                                            <div class="goalDate">



                                                <div class="goalDateDB">
                                                    Choose Goal Date
                                                <div class="sendinv" style="display: none;">
                                                    <ul>
                                                        <li>May 27,2015</li>
                                                        <li>May 15,2015</li>
                                                        <li>June 10,2015</li>
                                                    </ul>
                                                </div>
                                                </div>

                                                <div class="clr"></div>
                                                <div class="sleftRatings">
                                                    <p>You have set your goal to</p>
                                                    <div>
                                                        <img src="../Images/new/alwSlider.png" />
                                                    </div>

                                                </div>

                                            </div>
                                        </li>--%>
                                    </div>


                                    <div class="doneBtn"><a href="#">Done</a></div>


                                    <div class="dummy" style="display: none">

                                        <%--        <ul>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            
                                        </ul>--%>

                                        <div class="dummyBg">
                                            <h3>Your manager has to give you feedback before you can set goals.</h3>
                                        </div>
                                    </div>

                                </div>





                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>




    <div id="sticky">



        <ul id="example-2" class="sticklr">
          <%--  <li>
                <a href="#" id="eainfo" data-class="standBPInfo" class="standBPInfo">
                    <p>Development Prorities</p>
                </a>

                <ul class="standTable">
                    <li>

                        <div class="patable">
                            

                            <p>Examine your Standing at the Excellence Action level. Navigate through each Practice Area and see how your Self Feedback for each Excellence Actions compares to other groups in your role community. Use the drop down menu at the top of the screen to changes views between Community, Team, Mentors, Tenure and Previous.</p>
                        </div>
                    </li>
                </ul>





            </li>--%>







        </ul>
    </div>

</asp:Content>
