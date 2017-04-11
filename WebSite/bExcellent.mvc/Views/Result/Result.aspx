<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Results
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/jquery.Jcrop.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Results/resultLanding.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <%--<link href="//cdn.jsdelivr.net/jquery.gray/1.4.2/gray.min.css" rel="stylesheet" type="text/css"/>--%>

    <%--javascripts--%>
    <script src="../../Scripts/ref/Jquery_ui_min_latest.js"></script>
    <%--<script src="//cdn.jsdelivr.net/jquery.gray/1.4.2/jquery.gray.min.js" type="text/javascript"></script>--%>
    <script src="../../Uploadify/swfobject.js" type="text/javascript"></script>
    <script src="../../Uploadify/jquery.uploadify.v2.1.4.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.Jcrop.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.simplemodal.js" type="text/javascript"></script>
    <script src="../../Scripts/vscontext.jquery.js" type="text/javascript"></script>
    <%--<script src="../../Scripts/ref/common.js" type="text/javascript"></script>--%>
    <script src="../../Scripts/ref/Results/result.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Results/resultlanding1.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <%-- For Photo Upload--%>
   
   
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
        <div class="ui breadcrumb">
            <span class="net1"><a href="../Common/Index">Home </a>> <a href="../FeedbackResults/FeedbackResults">Feedback Results</a></span>
        </div>
    </div>

    <div id="indicator">

        <div id="wrapper">
            <div style="clear: both;"></div>
            <div id="scroller">
                <ul>
                    <li>
                        <div class="pageholder">

                            <div id="customertiles">


                                <div class="customertiles tile">
                                    <h1 class="lft_head">Feedback Results</h1>
                                    <div class="networkTile">
                                        <ul>
                                            <li class="videoimg nwTile stiles" value="1" id="self" data-value="1" data-class="select_nwTile" tabindex="0">
                                                <div id="selfSelect">
                                                    <%--<div class="numbertile">
                                                
                                            </div>--%>
                                                    <div class="tileIcon">

                                                        <img src="../../Images/images/Feedback/IconHover0.png" alt="You" id="Img1" width="61"
                                                            height="61" />
                                                    </div>
                                                    <div class="tileContents">
                                                        <p id="selfscore">
                                                        </p>
                                                        <p>
                                                            Self
                                                        </p>
                                                    </div>

                                                </div>
                                            </li>

                                            <li class="mngrTile stiles" value="2" data-value="2" id="mgr" tabindex="1" data-class="select_mngrTile">
                                                <div id="mgrSelect">
                                                    <%--<div class="numbertile">
                                                    </div>--%>
                                                    <div class="tileIcon">
                                                        <img src="../../Images/images/Feedback/IconHover1.png" alt="Blogs" />
                                                    </div>
                                                    <div class="tileContents">
                                                        <p id="managerScore">
                                                        </p>
                                                        <p>
                                                            Manager
                                                        </p>
                                                    </div>
                                                    <%--  <p>
                                                        Managers
                                                    </p>--%>
                                                </div>
                                            </li>
                                            <li class="teamTile stiles tmmenu" value="1" data-value="3" id="tm" tabindex="2" data-class="select_teamTile">
                                                <div id="tmSelect">
                                                    <%--<div class="numbertile">
                                                    </div>--%>
                                                    <div class="tileIconTeam">
                                                        <img src="../../Images/images/Feedback/IconHover2.png" alt="Blogs" />
                                                    </div>
                                                    <div class="tileContents">
                                                        <p id="teammemberscore">
                                                        </p>
                                                        <p>
                                                            Team Members
                                                        </p>
                                                    </div>
                                                    <%--<p>
                                                        Team Members
                                                    </p>--%>
                                                </div>
                                            </li>

                                            <li class="skipTile stiles" value="3" data-value="4" id="skp" tabindex="3" data-class="select_skipTile">
                                                <div id="skpSelect">
                                                    <%-- <div class="numbertile">
                                                    </div>--%>
                                                    <div class="tileIcon">
                                                        <img src="../../Images/images/Feedback/IconHover3.png" alt="Blogs" />
                                                    </div>
                                                    <div class="tileContents">
                                                        <p id="SkipMangerScore">
                                                        </p>
                                                        <p>
                                                            Skip-Level Manager  
                                                        </p>
                                                    </div>
                                                    <%--<p>
                                                        Skip Level Managers
                                                    </p>--%>
                                                </div>
                                            </li>

                                            <li class="custTile stiles" value="6" data-value="5" id="cust" tabindex="4" data-class="select_custTile">
                                                <div id="custSelect">
                                                    <%--<div class="numbertile">
                                                    </div>--%>
                                                    <div class="tileIcon">
                                                        <img src="../../Images/images/Feedback/IconHover4.png" alt="Blogs" />
                                                    </div>
                                                    <div class="tileContents">
                                                        <p id="customerscore">
                                                        </p>
                                                        <p>
                                                            Customers & Partners
                                                        </p>
                                                    </div>
                                                    <%-- <p>
                                                        Customers & Partners
                                                    </p>--%>
                                                </div>

                                            </li>

                                            <li class="peerTile stiles" value="4" data-value="6" id="prtm" tabindex="5" data-class="select_peerTile">
                                                <div id="prtmSelect">
                                                    <%-- <div class="numbertile">
                                                    </div>--%>
                                                    <div class="tileIcon">
                                                        <img src="../../Images/images/Feedback/IconHover5.png" alt="Blogs" />
                                                    </div>
                                                    <div class="tileContents">
                                                        <p id="peergivenScore">
                                                        </p>
                                                        <p>
                                                            Peers (feedback Given to Peers)
                                                        </p>
                                                    </div>
                                                    <%--<p>
                                                        Peers (feedback Given to Peers)
                                                    </p>--%>
                                                </div>
                                            </li>


                                            <li class="peerTile stiles" value="5" data-value="7" id="prmgr" tabindex="6" data-class="select_peerTile">
                                                <div id="prmgrSelect">
                                                    <%--<div class="numbertile">
                                                    </div>--%>
                                                    <div class="tileIcon">
                                                        <img src="../../Images/images/Feedback/IconHover6.png" alt="Blogs" />
                                                    </div>
                                                    <div class="tileContents">
                                                        <p id="peerTakenScore">
                                                        </p>
                                                        <p>
                                                            Peers (feedback Given By Peers)
                                                        </p>
                                                    </div>
                                                    <%-- <p>
                                                        Peers (feedback Given By Peers)
                                                    </p>--%>
                                                </div>
                                            </li>
                                            <li class="dummyTile" value="5" data-value="7" id="dummyTile" tabindex="6">
                                                <div id="Div1">
                                                    <div class="numbertile">
                                                    </div>

                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                <div class="customertiles tile">
                                    <h1 class="lft_head">Activate a Profile</h1>
                                    <div class="networkscroll">
                                        <div class="scroll2">
                                            <%--<ul id="network-poe-list">--%>
                                            <ul class="network-poe-list" id="poelist1">
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="customertiles stars last urntwrk">
                                    <h1 class="lft_head">Reports<span id="explanationText"></span></h1>



                                    <div class="givefbcontent">


                                        <div class="column fblfristBox">
                                            <div class="boxone" id="bigpic">
                                                <h2>The Big Picture</h2>
                                                <div class="boxTop">
                                                    <p>View Feedback results at the overall level.</p>
                                                    <a href="#">Click Here</a>

                                                </div>

                                            </div>
                                        </div>
                                        <div class="column fblsecondBox">

                                            <div class="boxone" id="digin">
                                                <h2>Practice Areas</h2>
                                                <div class="boxTop">
                                                    <p>View Feedback results at the Practice Area level.</p>
                                                    <a href="#">Click Here</a>

                                                </div>

                                            </div>

                                        </div>
                                        <div class="column fblthirdBox">

                                            <div class="boxone" id="digdeeper">
                                                <h2>Excellence Actions</h2>
                                                <div class="boxTop">
                                                    <p>View Feedback results at the Excellence Action level.</p>
                                                    <a href="#">Click Here</a>

                                                </div>

                                            </div>

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

    <div id="basic-modal-content" style="display: none">
        <div class="browseright">
            <div class="browserightcont">
                <p>
                    Supported file formats - (.jpg, .png)
                </p>
                <p>
                    Maximum supported file size - 500KB
                </p>
                <p>
                    Maximum supported width/height - 500px
                </p>
                <div class="imgselection">
                    <img src="../../Images/right-img.png" /><p>
                        <span>Good image selection</span>
                    </p>
                </div>
                <div class="imgselection">
                    <img src="../../Images/bad-img.png" /><p>
                        <span>Bad image selection</span>
                    </p>
                </div>
            </div>
        </div>
        <div style="float: left">
            <input type="text" id="textupload" />
        </div>
        <div style="position: relative; float: left;" id="pnlUpload">
            <input type="button" id="btnUpload" value="Browse" />
            <div style="position: absolute; top: 4px; left: 3px;">
                <input id="fuFileUploader" name="file_upload" type="file" />
            </div>
        </div>
        <div>
            <div id="pnlUploadedImage" style="display: none">
                <label id="lblMethodError" style="display: none">
                </label>
                <br />
                <img src="" id="imgUploadedImage" alt="Uploaded Image" />
            </div>
            <div id="pnlNewImage" style="display: none">
                <input type="button" id="btnsave" value="save" />
                <img src="" id="imgNewImage" alt="Image" />
            </div>
        </div>
        <div class="croptxt" style="display: none">
            <input type="button" id="btnCrop" onclick="cropImage();" value="Crop Image" />
            <div class="cropmsg">Click on the image and drag box to choose the area of your picture.</div>
        </div>
    </div>
</asp:Content>
