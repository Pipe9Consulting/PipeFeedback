<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Community Sync
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <%--<script src="../../Scripts/jquery-1.4.3.min.js" type="text/javascript"></script>--%>
    <link href="../../Styles/Standing/excellenceIndicator.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Standing/digdeeper.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery-sticklr-1.0.pack.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#example-2').sticklr({
                showOn: 'click',
                stickTo: 'right'
            });
        });
    </script>
    <style type="text/css">
        .digqn-dummy {
            width: 5.5%;
            height: 0;
            padding: 0.2% 0 5%;
            color: #ffffff;
            background: url(../../Images/be-bg.jpg) no-repeat #e5e5e5;
            text-align: center;
            font-size: 113%;
            float: left;
            margin-right: 1%;
        }

        .nonselecteds {
            cursor: auto !important;
            background: #ccc !important;
        }
    </style>

    <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb">
            <a href="../Common/Index">Home </a>> <a href="../communitysync/communitysync">Community Sync </a>
            > Excellence Actions
        </div>
    </div>

    <input type="hidden" id="controlclicked" value="0" />
    <input type="hidden" id="pagemax" value="0" />
    <%--<div class="indexright">
        <div class="indexrightarrow">
            <div class="indexclose">
                <span></span>
            </div>
        </div>
        <div class="indexrightclose">
            <span></span>
        </div>
        <table id="bigpicPoeContent">
            <tr>
                <td>
                    <img class="diginimg" src="../../Images/chart/tick.png" />
                </td>
                <td>Improvement
                </td>
            </tr>
            <tr>
                <td>
                    <img class="diginimg" src="../../Images/chart/exclamation.png" />
                </td>
                <td>No Change
                </td>
            </tr>
            <tr>
                <td>
                    <img class="diginimg" src="../../Images/chart/cross.png" />
                </td>
                <td>Decline
                </td>
            </tr>
        </table>
    </div>--%>

    <%--<div class="indexright">

        <input type="hidden" id="mappingid" value="125">
        <input type="hidden" id="selectedTypedeep" value="1">

        <input type="hidden" id="selectedMappingid" value="0">

        <div class="indexrightarrow">
            <div class="indexclose" id="0" style="display: none;">
                <span></span>
            </div>
        </div>
        <div class="indexrightclose" style="display: none;">
            <span></span>
        </div>
        <div class="indexrightclose1">
            <span></span>
        </div>
        <div class="model" style="left: 2%;">
            <div class="modelcontent">
                <div class="helpcontent">
                    <div class="cententMiddle">

                        <div class="hlprow">
                            <span>
                                <h1>Definition</h1>
                                <p class="hlpcont">
                                    Examine Standing at the Excellence Indicator level. Navigate through each Practice Area and see how your Feedback for each Excellence Indicator(s) compares to other groups in the role community. Use the drop down menu at the top of the screen to changes views between Community, Team, Mentors, Tenure, and Previous.
                                </p>
                            </span>
                        </div>

                        <div class="pageBtn-Part margindown" style="display: none;">
                            <a id="pageone" class="SelectPagebtn" href="#">1</a>
                            <a id="pagetwo" href="#">2</a>
                        </div>
                    </div>
                </div>

                <div class="patable">

                    <table id="diginstandingPoeContent">
                    </table>

                    <div class="pageBtn-Part" style="margin-top: 5px;">
                        <a id="pageoneval" href="#">1</a>
                        <a id="pagetwoval" class="SelectPagebtn" href="#">2</a>
                    </div>
                </div>
            </div>
        </div>
    </div>--%>

    <div class="pageholder">
        <input type="hidden" id="selectedpoeDigdeep" />

        <div class="excellenceTiles" id="tilehead">
            <p>Community</p>
            <ul id="tilesub">
                <li data-value="1">Community</li>
                <li data-value="2">Area Team</li>
                <%--<li data-value="3">Mentors</li>--%>
                <li data-value="4">Tenure Group</li>
                <%--<li data-value="5">Previous</li>--%>
            </ul>
        </div>
        <div style="clear: both"></div>
        <div class="stand">
            <h1>Excellence Actions</h1>
            <div class="scroll1">
                <%--<ul id="stndmenu">
                    Standing by Excellence Action
                    <li class="AOAccountExecutive1Tile selectAOAccountExecutive1" id="li1" data-value="82">
                        <p>Product Guru</p>
                    </li>

                    <li class="AOAccountExecutive2Tile selectAOAccountExecutive2" id="li2" data-value="83">
                        <p>Connected Communicator</p>
                    </li>
                    <li class="AOAccountExecutive3Tile selectAOAccountExecutive3" id="li3" data-value="84">
                        <p>Product Innovator</p>
                    </li>
                    <li class="AOAccountExecutive4Tile selectAOAccountExecutive4" id="li4" data-value="85">
                        <p>Relationship Builder</p>
                    </li>
                    <li class="dummytile">
                        <p>&nbsp;</p>
                    </li>
                    <li class="dummytile">
                        <p>&nbsp;</p>
                    </li>



                </ul>--%>


                <ul id="stndmenu">

                    <li class="selectStand">
                        <img src="../Images/icons/AOAccountExecutive2.png" />
                        <p>Product Guru</p>
                    </li>

                    <li>
                        <img src="../Images/icons/AOAccountExecutive2.png" />
                        <p>Connected Communicator</p>
                    </li>
                    <li>
                        <img src="../Images/icons/AOAccountExecutive2.png" />
                        <p>Product Innovator</p>
                    </li>
                    <li>
                        <img src="../Images/icons/AOAccountExecutive2.png" />
                        <p>Relationship Builder</p>
                    </li>
                    <li class="dummytile">
                        <p>&nbsp;</p>
                    </li>
                    <li class="dummytile">
                        <p>&nbsp;</p>
                    </li>



                </ul>
            </div>
        </div>
        <div>
            <h1 class='lft_head' id="selfHeader">Community -  <span id='selfCont'>Your Self Feedback score compared with the average Self Feedback score of your role community</span></h1>
            <div class="chartholdercontainer">

                <div class="slidebtn" id="paslide1">
                    <a href="#" class="prev pmodule">Previous</a><a href="#" class="prev p1">Previous</a> <a href="#" class="prev p2">Previous</a><a href="#" class="prev p3">Previous</a>
                    <div class="pagination">
                    </div>
                    <a href="#" class="nxt nmodule">Next</a><a href="#" class="nxt bn1">Next</a> <a href="#" class="nxt bn2">Next</a><a href="#" class="nxt bn3">Next</a>
                </div>
                <div class="chartholder" id="paLevel1">
                </div>
                <div class="chartholder" id="paLevel2">
                </div>
                <div class="chartholder" id="paLevel3">
                </div>
                <div class="chartholder" id="paLevel4">
                </div>
                <div class="chartholder" id="paLevel5">
                </div>
                <div class="chartholder" id="paLevel6">
                </div>
                <div class="chartholder" id="paLevel7">
                </div>
                <div class="chartholder" id="paLevel8">
                </div>
                <div class="chartholder" id="paLevel9">
                </div>
                <div class="chartholder" id="paLevel10">
                </div>
            </div>
        </div>
        <div id="stndcontnetholder">
        </div>
    </div>




    <%-- <div id="sticky">



        <ul id="example-2" class="sticklr">
            <li>
                <a href="#" id="eainfo" class="standBPInfo" title="Standing EI Info">
                    <p>Standing EA Info</p>
                </a>

                <ul class="standTable">
                    <li>

                        <div class="patable">
                            <h1 id="PAname">Standing by Excellence Action</h1>

                            <p>Examine your Standing at the Excellence Action level. Navigate through each Practice Area and see how your Self Feedback for each Excellence Actions compares to other groups in your role community. Use the drop down menu at the top of the screen to changes views between Community, Team, Mentors, Tenure and Previous.</p>
                        </div>
                    </li>
                </ul>





            </li>







        </ul>
    </div>--%>
</asp:Content>
