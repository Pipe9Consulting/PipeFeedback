<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Network
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <%--stylesheet--%>
    <link href="../../Styles/jquery.Jcrop.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Network/network.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <%--<link href="//cdn.jsdelivr.net/jquery.gray/1.4.2/gray.min.css" rel="stylesheet" type="text/css"/>--%>
    <script src="../../Scripts/ref/Jquery_ui_min_latest.js"></script>
    <%--javascripts--%>


    <%--<script src="//cdn.jsdelivr.net/jquery.gray/1.4.2/jquery.gray.min.js" type="text/javascript"></script>--%>
    <script src="../../Uploadify/swfobject.js" type="text/javascript"></script>
    <script src="../../Uploadify/jquery.uploadify.v2.1.4.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.Jcrop.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.simplemodal.js" type="text/javascript"></script>
    <script src="../../Scripts/vscontext.jquery.js" type="text/javascript"></script>
    <%--<script src="../../Scripts/ref/common.js" type="text/javascript"></script>--%>
    <script src="../../Scripts/ref/Network/network.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Network/networklanding.js" type="text/javascript"></script>
    <%--    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>--%>
    <%-- For Photo Upload--%>
    <script type="text/javascript">
        var x = 0, y = 0, w = 0, h = 0;
        var imageHandler = "../../Uploadify/ImageHandler.ashx?id=";

        $(function () {
            $('#btnloading ').click(function (e) {
                $('#basic-modal-content').modal();
                var UploadifyAuthCookie = '<% = Request.Cookies[FormsAuthentication.FormsCookieName] == null ? string.Empty : Request.Cookies[FormsAuthentication.FormsCookieName].Value %>';
                var UploadifySessionId = '<%= Session.SessionID %>';

                $("#fuFileUploader").uploadify({
                    'hideButton': true,
                    'wmode': 'transparent',
                    'uploader': '<%= Url.Content("~/Uploadify/uploadify.swf") %>',
                    'cancelImg': '<%= Url.Content("~/Uploadify/cancel.png") %>',
                    'buttonText': 'Upload File',
                    'script': '<%= Url.Action("FileUpload", "Media") %>',
                    'multi': true,
                    'auto': true,
                    'fileExt': '*.jpg;*.gif;*.png;*.jpeg',
                    'fileDesc': 'Image Files',
                    'scriptData': { RequireUploadifySessionSync: true, SecurityToken: UploadifyAuthCookie, SessionId: UploadifySessionId },
                    'onComplete': function (event, ID, fileObj, response, data) {
                        response = $.parseJSON(response);
                        if (response.Status == 'OK') {
                            $("#pnlUpload").hide();
                            $("#pnlUploadedImage").show();
                            $('.croptxt').show();
                            $("#textupload").hide();
                            $("#btnUpload").hide();
                            $("#imgUploadedImage").attr("src", imageHandler + response.Id);
                            $('#imgUploadedImage').Jcrop({
                                onChange: setCoords,
                                onSelect: setCoords,
                                minSize: [175, 175],
                                maxSize: [175, 175]
                            });
                        }
                    }
                });
            });

            function setCoords(c) {
                x = c.x;
                y = c.y;
                w = c.w;
                h = c.h;
            };
        });
        function cropImage() {
            $.ajax({
                url: "/Media/CropImage",
                type: "POST",
                data: { x: x, y: y, w: w, h: h, Module: 2, rWidth: parseInt($('#imgUploadedImage').width()), rHeight: parseInt($('#imgUploadedImage').height()) },
                success: function (data) {
                    savePhoto(data);
                },
                error: function (xhr, status, error) {
                    $('#lblMethodError').text(xhr.responseText);
                    $('#lblMethodError').show();
                }
            });
        }
        function savePhoto(imgId) {
            Common.ajaxsync({
                url: '/Network/SavePhoto?imgId=' + imgId,
                success: function (response) {
                    $('#lblMethodError').hide();
                    network.loadMyData();
                    $.modal.close();
                },
                error: function (err) {
                }
            });
        }
    </script>
    <style>
        #simplemodal-container {
            background: none repeat scroll 0 0 #E5E5E5;
            padding-bottom: 29% !important;
            width: 42% !important;
            left: 29% !important;
        }
    </style>


    <%
        var h = 0;

        if (Session["NetworkPage"] != null)
        {
            h = int.Parse(Session["NetworkPage"].ToString());
        }

    %>

    <input type="hidden" id="networkMode" value="<%:h%>" />

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
    <input type="hidden" id="selectedPoeValueNetwork" value="<%:t%>" />
    <input type="hidden" id="assignedPOE"/>
     <input type="hidden" id="assignedUser"/>
     <input type="hidden" id="assignedVal"/>
    <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb">
            <span class="net1"><a href="../Common/Index">Home </a>> <a href="../Network/Network">Network</a> > Your Network</span><span class="net2"><a href="../Common/Index">Home
            </a>> <a href="../Network/Network">Network </a>> You</span> <span class="net3"><a href="../Common/Index">Home </a>> <a href="../Network/Network">Network</a> > Your
                    Managers </span><span class="net4"><a href="../Common/Index">Home </a>> <a href="../Network/Network">Network </a>> Your Team Members</span><span class="net5"><a href="../Common/Index">Home </a>> <a href="../Network/Network">Network </a>> Your Peers</span>
            <span class="net6"><a href="../Common/Index">Home </a>> <a href="../Network/Network">Network </a>> Your Customers &amp; Partners</span><span class="net7"><a href="../Common/Index">Home </a>> <a href="../Network/Network">Network</a> > Yammer</span>
        </div>
    </div>
    <div class="yammerpopupbg">
        <div class="yammernetwork">
            <div class="close">
            </div>
            <img src="../../Images/other-popup-bg.png" />
            <div class="yammernetworkholder">
                <p>
                    Please add a REP
                    <br />
                    to be able to add<br />
                    members from your
                    <br />
                    Yammer network
                </p>
                <div class="erbtn">
                    <input type="button" id="poelibrayYammer" value="REP Library" />
                    <input type="button" id="cancelyammerpopup" value="Cancel" />
                </div>
            </div>
        </div>
        <div class="yammerpopup">
            <div class="yammerpopup">
                <div class="yammerpopupcont" id="yammerselectedlistspoe">
                    <img src="../../Images/other-popup-bg.png" />
                    <div class="yammerpopupconthd">
                        <span>
                            <img src="../../Images/close-sprite.png" /></span>
                    </div>
                    <div class="yammerpopupcontholder">
                        <div class="left">
                            <h1 style="padding: 0 !important;">Select a Title</h1>
                            <ul class="selectedPostion">
                                <li value="2"><span>
                                    <img src="../../Images/unchecked.png" class="unchecked" /><img src="../../Images/check.png"
                                        class="checked" /></span><p>
                                            Manager
                                        </p>
                                </li>
                                <li value="3"><span>
                                    <img src="../../Images/unchecked.png" class="unchecked" /><img src="../../Images/check.png"
                                        class="checked" /></span><p>
                                            Skip Level Manager
                                        </p>
                                </li>
                                <li value="4"><span>
                                    <img src="../../Images/unchecked.png" class="unchecked" /><img src="../../Images/check.png"
                                        class="checked" /></span><p>
                                            Peer
                                        </p>
                                </li>
                                <li value="1"><span>
                                    <img src="../../Images/unchecked.png" class="unchecked" /><img src="../../Images/check.png"
                                        class="checked" /></span><p>
                                            Team Member
                                        </p>
                                </li>
                                <li value="6"><span>
                                    <img src="../../Images/unchecked.png" class="unchecked" /><img src="../../Images/check.png"
                                        class="checked" /></span><p>
                                            Partners or Customers
                                        </p>
                                </li>
                            </ul>
                        </div>
                        <div class="right">
                            <h1>Activate a Profile</h1>
                            <ul id="NetworkPoes">
                            </ul>
                        </div>
                        <div class="btm">
                            <div class="btn" id="yammercancelbtn">
                                Cancel
                            </div>
                            <div class="btn" id="yammerUserSelect">
                                Ok
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--End Yammer Popup-->
    <%-- <div class="slidebtn" id="bigslide">
        <a href="#" class="prevfb" id="p1" style="visibility: hidden">Previous</a>
        <div class="pagination" id="pagetxt">
        </div>
        <a href="#" class="nxtfb" id="bn1" style="visibility: hidden">Next</a>
    </div>
    <div class="slidebtn" id="sliderbtn">
    </div>--%>
    <div class="popupbgassign">
        &nbsp;
    </div>
    <div class="popup" id="errpopup">
        <div class="close">
        </div>
        <div class="popupconthldr">
            <div class="popupconttbl">
                <div class="popupcontcell" id="infos">
                    Your request has been sent successfully
                </div>
            </div>
        </div>
    </div>
    <div class="cyn" id="ChooseNetwork">
        <div class="close">
        </div>
        <p>
            Please choose your<br />
            own network from the network<br />
            dropdown and avail this feature
        </p>
        <div class="btn" id="closeNetworkErr">
            Ok
        </div>
    </div>
    <div class="delPopupbg">
        &nbsp;
    </div>
    <div class="alertboxholder">
        <div class="alertbox">
            <div class="close">
            </div>
            <div class="popupconthldr">
                <div class="popupconttbl">
                    <div class="popupcontcell" id="info">
                        Your request has been sent successfully
                    </div>
                </div>
            </div>
            <div class="button">
                <input type="button" id="cancelbtn" value="Cancel" />
                <input type="button" id="deleteusrbtn" value="Ok" />
            </div>
        </div>
    </div>
    <div id="indicator">
        <div id="hiddenids">
            <input id="nwpagecount" type="hidden" value="1" />
            <input id="yammerpagecount" type="hidden" value="1" />
            <input id="mgrpagecount" type="hidden" value="1" />
            <input id="tmpagecount" type="hidden" value="1" />
            <input id="peerpagecount" type="hidden" value="1" />
            <input id="custpagecount" type="hidden" value="1" />
            <input id="nwcurpage" type="hidden" value="1" />
            <input id="mgrcurpage" type="hidden" value="1" />
            <input id="tmcurpage" type="hidden" value="1" />
            <input id="peercurpage" type="hidden" value="1" />
            <input id="yammercurpage" type="hidden" value="1" />
            <input id="custcurpage" type="hidden" value="1" />
            <input type="hidden" id="OwnSubStatusNetwork" value="0" />
        </div>
        <div id="wrapper">
            <div style="clear: both;"></div>
            <div id="scroller">
                <ul>
                    <li>
                        <div class="pageholder">

                            <div id="customertiles" style="visibility:hidden">


                                <div class="customertiles tile">
                                    <h1 style="padding: 0 !important;">Network</h1>
                                    <div class="networkTile">
                                        <ul>
                                            <li class="videoimg selected nwTile" tabindex="0">
                                                <div class="numbertile" id="noOfMembers">
                                                </div>
                                                <div>
                                                    <img src="../../Images/networkIcon0.png" alt="You" class="you" id="Img1" width="61"
                                                        height="61" />
                                                </div>
                                                <p>
                                                    Your Network
                                                </p>
                                            </li>
                                            <li class="videoimg uTile">
                                                <div>
                                                    <img src="../../Images/you.png" alt="You" class="you" id="yousmallimg" width="61"
                                                        height="61" />
                                                </div>
                                                <p>
                                                    You
                                                </p>
                                            </li>
                                            <li class="mngrTile" tabindex="2">
                                                <div class="icon tripleline">
                                                    <img src="../../Images/networkIcon2.png" alt="Blogs" />
                                                </div>
                                                <p>
                                                    Your Managers &
                                                    <br />
                                                    Skip Level Managers
                                                </p>
                                            </li>
                                            <li class="teamTile" tabindex="3">
                                                <div class="icon doubleline">
                                                    <img src="../../Images/networkIcon3.png" alt="Blogs" />
                                                </div>
                                                <p>
                                                    Your Team
                                                <br />
                                                    Members<br />
                                                </p>
                                            </li>
                                            <%--<li class="peerTile" tabindex="4">
                                                <div class="icon singleline">
                                                    <img src="../../Images/networkIcon4.png" alt="Blogs" />
                                                </div>
                                                <p>
                                                    Your Peers
                                                </p>
                                            </li>--%>
                                          <%--  <li class="custTile" tabindex="5">
                                                <div class="icon doubleline">
                                                    <img src="../../Images/networkIcon5.png" alt="Blogs" />
                                                </div>
                                                <p>
                                                    Your Customers<br />
                                                    & Partners<br />
                                                </p>
                                            </li>--%>
                                           <%-- <li class="yammerTile" tabindex="6">
                                                <img src="../../Images/networkIcon6.png" /><p>
                                                    Add Members from Yammer
                                                </p>
                                            </li>--%>
                                        </ul>
                                    </div>
                                </div>
                                <div class="customertiles tile">
                                    <h1 style="padding: 0 !important;">Activate a Profile</h1>
                                    <div class="networkscroll">
                                        <div class="scroll2">
                                            <%--<ul id="network-poe-list">--%>
                                            <ul class="network-poe-list" id="poelist1">
                                                <%--<li class="poelistli" id="poeli9" value="9"><a>
                                                <div class="icon">
                                                    <img class="img" alt="A&amp;O Sales Manager" src="../../Images/AO Sales Manager_Intro.png"></div>
                                                <p>A&amp;O Sales Manager</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="poeli12" value="12"><a>
                                                <div class="icon">
                                                    <img class="img" alt="A&amp;O AdSol Specialist" src="../../Images/AO AdSol Specialist_Intro.png"></div>
                                                <p>A&amp;O AdSol Specialist</p>
                                            </a><span></span></li>
                                            <li class="poelistli selected" id="poeli13" value="13"><a>
                                                <div class="icon">
                                                    <img class="img" alt="A&amp;O Product Specialist" src="../../Images/AO Product Specialist_Intro.png"></div>
                                                <p>A&amp;O Product Specialist</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="poeli10" value="10"><a>
                                                <div class="icon">
                                                    <img class="img" alt="A&amp;O AM Manager" src="../../Images/AO AM Manager_Intro.png"></div>
                                                <p>A&amp;O AM Manager</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="poeli11" value="11"><a>
                                                <div class="icon">
                                                    <img class="img" alt="A&amp;O Account Executive" src="../../Images/AO Account Executive_Intro.png"></div>
                                                <p>A&amp;O Account Executive</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="poeli8" value="8"><a>
                                                <div class="icon">
                                                    <img class="img" alt="A&amp;O Account Manager" src="../../Images/AO Account Manager_Intro.png"></div>
                                                <p>A&amp;O Account Manager</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="poeli6" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                                                <div class="icon">
                                                    <img class="img" alt="" src="../../Images/LeadersMaketheFuture.png"></div>
                                                <div class="comingsoon">
                                                    <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png"></div>
                                                <p>Leaders Make the Future</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="poeli3" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                                                <div class="icon">
                                                    <img class="img" alt="" src="../../Images/challenger-sale.png"></div>
                                                <div class="comingsoon">
                                                    <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png"></div>
                                                <p>Challenger Selling</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="poeli1" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                                                <div class="icon">
                                                    <img class="img" alt="" src="../../Images/HumanSelling.png"></div>
                                                <div class="comingsoon">
                                                    <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png"></div>
                                                <p>Human Selling</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="poeli2" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                                                <div class="icon">
                                                    <img class="img" alt="" src="../../Images/cloud-businss.png"></div>
                                                <div class="comingsoon">
                                                    <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png"></div>
                                                <p>Cloud Business</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="poeli4" style="opacity: 0.5;" onclick=""><a>
                                                <div class="icon">
                                                    <img class="img" alt="" src="../../Images/social-selling.png"></div>
                                                <div class="comingsoon">
                                                    <img width="49" height="47" alt="coming soon" src="../../Images/coming-soon.png"></div>
                                                <p>Social Selling</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="poeli5" style="opacity: 0.5;" onclick=""><a>
                                                <div class="icon">
                                                    <img class="img" alt="" src="../../Images/partner-manager.png"></div>
                                                <div class="comingsoon">
                                                    <img width="49" height="47" alt="coming soon" src="../../Images/coming-soon.png"></div>
                                                <p>Partner Manager</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="poeli7" style="opacity: 0.5;" onclick=""><a>
                                                <div class="icon">
                                                    <img class="img" alt="" src="../../Images/inside-sales.png"></div>
                                                <div class="comingsoon">
                                                    <img width="49" height="47" alt="coming soon" src="../../Images/coming-soon.png"></div>
                                                <p>Inside Sales</p>
                                            </a><span></span></li>--%>
                                            </ul>
                                        </div>
                                    </div>
                                    <%-- <h1> Available REPs</h1>
                                    <div class="scroll1">
                                        <ul class="network-poe-list" id="poelist2">
                                              <li class="poelistli" id="Li1" value="9"><a>
                                                <div class="icon">
                                                    <img class="img" alt="A&amp;O Sales Manager" src="../../Images/AO Sales Manager_Intro.png"></div>
                                                <p>A&amp;O Sales Manager</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="Li2" value="12"><a>
                                                <div class="icon">
                                                    <img class="img" alt="A&amp;O AdSol Specialist" src="../../Images/AO AdSol Specialist_Intro.png"></div>
                                                <p>A&amp;O AdSol Specialist</p>
                                            </a><span></span></li>
                                            <li class="poelistli selected" id="Li3" value="13"><a>
                                                <div class="icon">
                                                    <img class="img" alt="A&amp;O Product Specialist" src="../../Images/AO Product Specialist_Intro.png"></div>
                                                <p>A&amp;O Product Specialist</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="Li4" value="10"><a>
                                                <div class="icon">
                                                    <img class="img" alt="A&amp;O AM Manager" src="../../Images/AO AM Manager_Intro.png"></div>
                                                <p>A&amp;O AM Manager</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="Li5" value="11"><a>
                                                <div class="icon">
                                                    <img class="img" alt="A&amp;O Account Executive" src="../../Images/AO Account Executive_Intro.png"></div>
                                                <p>A&amp;O Account Executive</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="Li6" value="8"><a>
                                                <div class="icon">
                                                    <img class="img" alt="A&amp;O Account Manager" src="../../Images/AO Account Manager_Intro.png"></div>
                                                <p>A&amp;O Account Manager</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="Li7" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                                                <div class="icon">
                                                    <img class="img" alt="" src="../../Images/LeadersMaketheFuture.png"></div>
                                                <div class="comingsoon">
                                                    <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png"></div>
                                                <p>Leaders Make the Future</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="Li8" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                                                <div class="icon">
                                                    <img class="img" alt="" src="../../Images/challenger-sale.png"></div>
                                                <div class="comingsoon">
                                                    <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png"></div>
                                                <p>Challenger Selling</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="Li9" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                                                <div class="icon">
                                                    <img class="img" alt="" src="../../Images/HumanSelling.png"></div>
                                                <div class="comingsoon">
                                                    <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png"></div>
                                                <p>Human Selling</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="Li10" style="opacity: 0.5;" onclick="CallPoelibrary(this)"><a>
                                                <div class="icon">
                                                    <img class="img" alt="" src="../../Images/cloud-businss.png"></div>
                                                <div class="comingsoon">
                                                    <img width="49" height="47" alt="coming soon" src="../../Images/add-poe.png"></div>
                                                <p>Cloud Business</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="Li11" style="opacity: 0.5;" onclick=""><a>
                                                <div class="icon">
                                                    <img class="img" alt="" src="../../Images/social-selling.png"></div>
                                                <div class="comingsoon">
                                                    <img width="49" height="47" alt="coming soon" src="../../Images/coming-soon.png"></div>
                                                <p>Social Selling</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="Li12" style="opacity: 0.5;" onclick=""><a>
                                                <div class="icon">
                                                    <img class="img" alt="" src="../../Images/partner-manager.png"></div>
                                                <div class="comingsoon">
                                                    <img width="49" height="47" alt="coming soon" src="../../Images/coming-soon.png"></div>
                                                <p>Partner Manager</p>
                                            </a><span></span></li>
                                            <li class="poelistli" id="Li13" style="opacity: 0.5;" onclick=""><a>
                                                <div class="icon">
                                                    <img class="img" alt="" src="../../Images/inside-sales.png"></div>
                                                <div class="comingsoon">
                                                    <img width="49" height="47" alt="coming soon" src="../../Images/coming-soon.png"></div>
                                                <p>Inside Sales</p>
                                            </a><span></span></li>
                                        </ul>
                                    </div>--%>
                                </div>

                                <div class="customertiles stars last urntwrk">
                                    <h1 style="padding: 0 !important;">Your Network</h1>
                                    <div class="addmember" style="display: none">
                                        Send Request (Take)
                                        <div class="sendinv">
                                            <ul>
                                                <li id="allinviteli">Send Request (Take)</li>
                                                <li id="allrequestli">Send Request (Give)</li>
                                                <li id="emailall">Send Email</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="network">
                                        <div class="networkholder your_network" id="yourNetworkContent">
                                        </div>
                                        <div id="pagingNetwork"></div>
                                    </div>
                                </div>
                                <!--End of Your Network-->
                                <!--You-->
                                <div class="customertiles stars last youcont">
                                    <h1 style="padding: 0 !important;">You</h1>
                                    <div class="memberplace">
                                        <div class="browseimg">
                                            <img id="userimg" src="../../Images/you-b.png" width="160" height="160" />
                                        </div>
                                        <div class="browsetxt">
                                            <%--<div class="editbtn" id="btnProfUpdate">
                                                Edit Profile
                                            </div>--%>
                                            <%--<h5>Browse your profile photo</h5>
                                            <input type="text" class="field" />--%>
                                            <input type="button" id="btnloading" class="browsebtn" value="Click here to upload photo" />
                                            <div class="clr">
                                            </div>
                                            Supported file format (.jpg, .png).
                                            <br />
                                            Maximum supported file size 500KB
                                            <br />
                                            Maximum supported width/height 500px
                                            <br />
                                        </div>
                                        <div class="browserdetails">
                                            <input type="hidden" id="edited" value="False" />
                                            <input type="hidden" id="userid" />
                                            <ul>
                                                <li>
                                                    <div class="left">
                                                        First name
                                                    </div>
                                                    <input type="text" id="fname" /></li>
                                                <li>
                                                    <div class="left">
                                                        Last name
                                                    </div>
                                                    <input type="text" id="lname" /></li>
                                                <li>
                                                    <div class="left">
                                                        Email address
                                                    </div>
                                                    <input type="text" id="mailid" /></li>
                                                <li>
                                                    <div class="left">
                                                        Company name
                                                    </div>
                                                    <input type="text" id="companyname" /></li>
                                                <li>
                                                    <div class="left">
                                                        Function
                                                    </div>
                                                    <input type="text" id="jobtitle" /></li>
                                                <li id="areamode" style="display: none">
                                                    <div class="left">
                                                        Area
                                                    </div>
                                                    <select id="areaselect" class="countryselect">
                                                        <option value="0">--Select--</option>
                                                    </select></li>
                                                <li>
                                                    <div class="left">
                                                        Country/Location
                                                    </div>
                                                    <select id="location" class="countryselect">
                                                    </select>
                                                </li>
                                                <li class="editbtnli">
                                                    <div class="editbtn" id="btnProfUpdate">
                                                        Edit Profile
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <!--End of You-->
                                <!--Your Manager-->
                                <div class="customertiles stars last ntwrk urmngr">
                                    <h1 style="padding: 0 !important;">Your Managers</h1>
                                    <div class="addmember" style="display:none">
                                        Send Request (Give)
                                        <div class="sendinv">
                                            <ul>
                                                <li id="managerRequest">Send Request (Give)</li>
                                                <li id="addmgr" class="subfunc">Add Manager </li>
                                                <li id="addskpmgr" class="subfunc">Add Skip Level Manager</li>
                                                <li id="deletemgr" class="subfunc">Delete Manager</li>
                                                <li id="assignManagers" class="subfunc assignhide">Assign REP</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="network">
                                        <div class="clr">
                                        </div>
                                        <div class="networkholder your_manager" id="yourManagerContent">
                                        </div>
                                        <div id="pagingManager"></div>
                                    </div>
                                </div>
                                <!--End of Your Manager-->
                                <!--Team Member-->
                                <div class="customertiles stars last teammembr">
                                    <h1 style="padding: 0 !important;">Your Team Members</h1>
                                    <div class="addmember" style="display:none">
                                        Send Request (Take)
                                        <div class="sendinv">
                                            <ul>
                                                <li id="teaminvite">Send Request (Take)</li>
                                                <li id="addteam" class="subfunc">Add Team Members </li>
                                                <li id="deletetm" class="subfunc">Delete Team Members</li>
                                                <li id="AssignTeammember" class="subfunc assignhide">Assign REP</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="network">
                                        <div class="clr">
                                        </div>
                                        <div class="networkholder your_team" id="yourTeamContent">
                                        </div>
                                        <div id="pagingTeam"></div>

                                    </div>
                                </div>
                                <!--End of Team Member-->
                                <!--Your Peers-->
                                <div class="customertiles stars last urpeer">
                                    <h1 style="padding: 0 !important;">Your Peers</h1>
                                    <div class="addmember" style="display:none">
                                        Send Request (Take)
                                        <div class="sendinv">
                                            <ul>
                                                <li id="peerInvite">Send Request (Take)</li>
                                                <li id="peerRequest">Send Request (Give)</li>
                                                <li id="addpeer" class="subfunc">Add Peers </li>
                                                <li id="deletepeer" class="subfunc">Delete Peers</li>
                                                <li id="AssignPeersVal" class="subfunc assignhide">Assign REP</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="network">
                                        <div class="clr">
                                        </div>
                                        <div class="networkholder your_peers" id="yourPeerContent">
                                        </div>
                                        <div id="pagingPeer"></div>
                                    </div>
                                </div>
                                <!--End of Peers-->
                                <!--Add Yammer-->
                                <div id="addyammeruser" class="customertiles stars last yammmerusr">
                                    <h1>Add Members from Yammer</h1>
                                    <div class="addmember" style="display:none">
                                        <span id="drpdownTxtvalues">Choose a Yammer Group</span>
                                        <div class="sendinv">
                                            <ul id="yammerGroups">
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="network">
                                        <div class="clr">
                                        </div>
                                    </div>
                                    <div class="network">
                                        <div class="clr">
                                        </div>
                                        <div class="networkholder your_yammer" id="youryammercontent">
                                            <div id="pagingYammer"></div>
                                        </div>
                                        <input type="button" value="Next Step" id="adduserNxtStep" class="nextstep" style="cursor: pointer" />
                                    </div>
                                </div>
                                <!--End Yammer-->
                                <!--Your Customers-->
                                <div class="customertiles stars last custpart">
                                    <h1 style="padding: 0 !important;">Your Customers & Partners</h1>
                                    <div class="addmember" style="display:none">
                                        Send Request (Give)
                                        <div class="sendinv">
                                            <ul>
                                                <li id="custRequest">Send Request (Give)</li>
                                                <li id="addcust" class="subfunc">Add Customers & Partners </li>
                                                <li id="deletecust" class="subfunc">Delete Customers & Partners</li>
                                                <li id="AssignCustomer" class="subfunc assignhide">Assign REP</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="network">
                                        <div class="clr">
                                        </div>
                                        <div class="networkholder your_customer" id="yourCustomerContent">
                                        </div>
                                        <div id="pagingCustomer"></div>
                                    </div>
                                </div>
                                <!--End of Customers-->
                                <!--Assign a PoE-->
                                <div class="customertiles stars last" id="assignpoePopup">
                                    <div class="network">
                                        <div class="clr">
                                        </div>
                                         <div class="vs-context-menu">
                                                            <ul>
                                                                <li class="nselect"><b>Choose a Title:</b></li>
                                                                <li value="2">Manager</li>
                                                                <li value="3">Skip Level Manager</li>
                                                                <li value="5">Peers</li>
                                                                <li value="1">Team Members</li>
                                                                <li value="6">Customers &amp; Partners</li>
                                                                <li value="0">None</li>
                                                            </ul>
                                                        </div>
                                        <div style="left: 0px; top: 0px; width: 98%; float: left; position: fixed; padding-top: 50%"
                                            id="dragassignpoe">
                                            <div class="popupbg">
                                                &nbsp;
                                            </div>
                                            <div class="customertiles stars last" id="networkpopup">
                                                <div class="poepopuphd">
                                                    <div class="close">
                                                    </div>
                                                </div>
                                                <div class="network">
                                                    <div class="listwrapper">
                                                        
                                                        <div class="scroll1">
                                                           <ul id="allnetworkContent">
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="assignbtn" id="assignPoe">
                                                    Assign REP
                                                </div>
                                            </div>
                                            <!--End Assign a PoE-->
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
                <input id="fuFileUploader" style="opacity: 0;" name="file_upload" type="file" />
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
