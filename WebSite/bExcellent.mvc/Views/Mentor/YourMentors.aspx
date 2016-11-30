<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Mentors
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <%--stylesheet--%>
    <link href="../../Styles/mentor/yourmentors.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <%--<link href="//cdn.jsdelivr.net/jquery.gray/1.4.2/gray.min.css" rel="stylesheet" type="text/css"/>--%>
    <%--javascripts--%>


    <%--<script src="//cdn.jsdelivr.net/jquery.gray/1.4.2/jquery.gray.min.js" type="text/javascript"></script>--%>
    <%--<script src="../../Scripts/ref/common.js" type="text/javascript"></script>--%>


    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Mentor/YourMentors.js" type="text/javascript"></script>
    <%-- For Photo Upload--%>




    <%
        var h = 0;

        if (Session["NetworkPage"] != null)
        {
            h = int.Parse(Session["NetworkPage"].ToString());
        }

    %>

    <input type="hidden" id="networkMode" value="<%:h%>" />
    <input type="hidden" id="selectedpoeDigdeep" />

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

        var u = 0;
        if (Session["id"] != null)
        {
            u = int.Parse(Session["id"].ToString());
        }
    %>
    <input type="hidden" id="UserId" value="<%:u%>" />
    <input type="hidden" id="Subid" value="<%:p%>" />
    <input type="hidden" id="selectedPoeValueYourMentors" value="<%:t%>" />
    <input type="hidden" id="yourMentorsType" value="0" />
    <input type="hidden" id="selectedidyourmentor" />
    <input type="hidden" id="moduleid" />
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
                            <h1>Select a Title</h1>
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
                            <h1>Select a REP</h1>
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
    <div class="slidebtn" id="bigslide">
        <a href="#" class="prevfb" id="p1" style="visibility: hidden">Previous</a>
        <div class="pagination" id="pagetxt">
        </div>
        <a href="#" class="nxtfb" id="bn1" style="visibility: hidden">Next</a>
    </div>
    <div class="slidebtn" id="sliderbtn">
    </div>
    <div class="popupbg">
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
    <div class="wallgoal">
        <div class="close">
        </div>

        <div id="wallactcontent" class="mentorMsgfeed">
            <div class="scroll2">
                <%--            <div class="profilePhoto">
                <img src="../Images/AO AdSol Specialist_Intro.png" />
            </div>
            <div class="msgContent">
                <div>
                    <h2>Will Hops</h2>
                    <p>June 1 at 5:19pm</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                    <a href="#">Reply...</a>
                </div>


                <div class="replyContent">

                    <div>
                        <div class="profilePhoto">
                            <img src="../Images/AO AdSol Specialist_Intro.png" />
                        </div>
                        <div class="msgContent">
                            <div>
                                <h3>Billy Graham replying to Will Hops</h3>
                                <p>June 1 at 5:19pm</p>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                <a href="#">Reply...</a>
                            </div>

                        </div>
                    </div>

                    <div class="msgEditor">
                        <div class="profilePhoto">
                            <img src="../Images/AO Sales Manager_intro.png" />
                        </div>

                        <div class="msgContent">
                            <h3>Billy Graham replying to Will Hops</h3>
                            <textarea></textarea>
                            <input type="button" value="Send" class="signupbtn sendMessageYourMentors" />

                        </div>

                    </div>



                </div>
            </div>--%>
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
            <input id="nwpagecount" type="hidden" value="2">
            <input id="yammerpagecount" type="hidden" value="1">
            <input id="mgrpagecount" type="hidden" value="1">
            <input id="tmpagecount" type="hidden" value="1">
            <input id="peerpagecount" type="hidden" value="1">
            <input id="custpagecount" type="hidden" value="1">
            <input id="nwcurpage" type="hidden" value="1">
            <input id="mgrcurpage" type="hidden" value="1">
            <input id="tmcurpage" type="hidden" value="1">
            <input id="peercurpage" type="hidden" value="1">
            <input id="yammercurpage" type="hidden" value="1">
            <input id="custcurpage" type="hidden" value="1">
            <input type="hidden" id="OwnSubStatusNetwork" value="1">
        </div>
        <div id="wrapper">
            <div style="clear: both;"></div>
            <div id="scroller">
                <ul>
                    <li>
                        <div class="pageholder">

                            <div id="customertiles">

                                <div class="breadcrumb">
                                    <span class="net1"><a href="../Common/Index">Home </a>&gt; <a href="../Mentor/Mentor">Mentors </a>&gt; Your Mentors</span> <span class="net2"><a href="../Common/Index">Home
                                    </a>&gt; <a href="../Network/Network">Network </a>&gt; You</span> <span class="net3"><a href="../Common/Index">Home </a>&gt; <a href="../Network/Network">Network </a>&gt; Your
                                            Managers</span> <span class="net4"><a href="../Common/Index">Home </a>&gt; <a href="../Network/Network">Network </a>&gt; Your Team Members</span> <span class="net5"><a href="../Common/Index">Home </a>&gt; <a href="../Network/Network">Network </a>&gt; Your Peers</span>
                                    <span class="net6"><a href="../Common/Index">Home </a>&gt; <a href="../Network/Network">Network </a>&gt; Your Customers &amp; Partners</span> <span class="net7"><a href="../Common/Index">Home </a>&gt; <a href="../Network/Network">Network </a>&gt; Yammer</span>
                                </div>

                                <div class="customertiles tile networkscroll">
                                    <h1 style="padding: 0 !important;">Select a Profile</h1>

                                    <div class="scroll2" style="overflow: hidden; width: auto; height: 25%;">

                                        <ul class="network-poe-list" id="poelist1">
                                            <%-- <li id="poeli13" value="13" class="poelistli selected"><a>
                                                    <div class="icon">
                                                        <img src="../../Images/AO Product Specialist_Intro.png" alt="A&amp;O Product Specialist" class="img"></div>
                                                    <p>A&amp;O Product Specialist</p>
                                                </a><span></span></li>
                                                <li id="poeli12" value="12" class="poelistli"><a>
                                                    <div class="icon">
                                                        <img src="../../Images/AO AdSol Specialist_Intro.png" alt="A&amp;O AdSol Specialist" class="img"></div>
                                                    <p>A&amp;O AdSol Specialist</p>
                                                </a><span></span></li>
                                                <li id="poeli11" value="11" class="poelistli"><a>
                                                    <div class="icon">
                                                        <img src="../../Images/AO Account Executive_Intro.png" alt="A&amp;O Account Executive" class="img"></div>
                                                    <p>A&amp;O Account Executive</p>
                                                </a><span></span></li>
                                                <li id="poeli10" value="10" class="poelistli"><a>
                                                    <div class="icon">
                                                        <img src="../../Images/AO AM Manager_Intro.png" alt="A&amp;O AM Manager" class="img"></div>
                                                    <p>A&amp;O AM Manager</p>
                                                </a><span></span></li>
                                                <li id="poeli9" value="9" class="poelistli"><a>
                                                    <div class="icon">
                                                        <img src="../../Images/AO Sales Manager_Intro.png" alt="A&amp;O Sales Manager" class="img"></div>
                                                    <p>A&amp;O Sales Manager</p>
                                                </a><span></span></li>
                                                <li id="poeli8" value="8" class="poelistli"><a>
                                                    <div class="icon">
                                                        <img src="../../Images/AO Account Manager_Intro.png" alt="A&amp;O Account Manager" class="img"></div>
                                                    <p>A&amp;O Account Manager</p>
                                                </a><span></span></li>--%>
                                        </ul>
                                    </div>


                                </div>

                                <div class="customertiles tile">
                                    <h1 style="padding: 0 !important;">Practice Area</h1>
                                    <div>
                                        <div class="scroll2" style="overflow: hidden; width: auto; height: 25%;">
                                            <ul id="poemodule">

                                                <%--         <li class="mngrTile poemodule" id="li1" data-value="82">
                                            <div class="icon tripleline">
                                                <img src="../../Images/manager-ico.png" alt="Blogs">
                                            </div>
                                            <p>
                                                Product Guru
                                            </p>
                                        </li>
                                        <li class="teamTile poemodule">
                                            <div class="icon doubleline">
                                                <img src="../../Images/team-ico.png" alt="Blogs">
                                            </div>
                                            <p>
                                                Connection Communicator
                                            </p>
                                        </li>
                                        <li class="peerTile poemodule">
                                            <div class="icon singleline">
                                                <img src="../../Images/peers-ico.png" alt="Blogs">
                                            </div>
                                            <p>
                                                Connection Communicator
                                            </p>
                                        </li>
                                        <li class="custTile poemodule">
                                            <div class="icon doubleline">
                                                <img src="../../Images/customer-ico.png" alt="Blogs">
                                            </div>
                                            <p>
                                                Connection Communicator
                                            </p>
                                        </li>--%>
                                            </ul>
                                        </div>
                                    </div>
                                </div>







                                <!--------------------------------------------------------------------  Your Mentor ---------------------------------------------->



                                <div class="customertiles stars last urntwrk">
                                    <h1 style="padding: 0 !important;">Your Mentors</h1>

                                    <div class="network">
                                        <div class="networkholder">
                                            <p class="mentorConnect">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>

                                            <div class="coltwo" id="yourmentorslist">
                                                <%-- <li class="netmgr" data-mgrid="552" data-email="alvarotest@microsoft.com">
                                                    <img src="/Uploadify/LoadImageHandler.ashx?id=2&amp;rnd=0.3250633522402495" width="61" height="61" alt="User">
                                                    <div class="ntwrktext">
                                                        <p>Alvaro A. Celis</p>
                                                        <p>alvarotest@microsoft.com</p>
                                                        <p>Manager</p>
                                                        <p>Country: Ghana</p>

                                                    </div>
                                                    <div class="connectEmail">
                                                        <a href="#">View Message</a>

                                                    </div>

                                                </li>

                                                <li class="netmgr" data-mgrid="552" data-email="alvarotest@microsoft.com">
                                                    <img src="/Uploadify/LoadImageHandler.ashx?id=2&amp;rnd=0.3250633522402495" width="61" height="61" alt="User">
                                                    <div class="ntwrktext">
                                                        <p>Alvaro A. Celis</p>
                                                        <p>alvarotest@microsoft.com</p>
                                                        <p>Manager</p>
                                                        <p>Country: Ghana</p>

                                                    </div>
                                                    <div class="connectEmail">
                                                        <a href="#">View Message</a>
                                                    </div>

                                                </li>

                                                <li class="netmgr" data-mgrid="552" data-email="alvarotest@microsoft.com">
                                                    <img src="/Uploadify/LoadImageHandler.ashx?id=2&amp;rnd=0.3250633522402495" width="61" height="61" alt="User">
                                                    <div class="ntwrktext">
                                                        <p>Alvaro A. Celis</p>
                                                        <p>alvarotest@microsoft.com</p>
                                                        <p>Manager</p>
                                                        <p>Country: Ghana</p>

                                                    </div>
                                                    <div class="connectEmail">
                                                        <a href="#">View Message</a>
                                                    </div>

                                                </li>

                                                <li class="netmgr" data-mgrid="552" data-email="alvarotest@microsoft.com">
                                                    <img src="/Uploadify/LoadImageHandler.ashx?id=2&amp;rnd=0.3250633522402495" width="61" height="61" alt="User">
                                                    <div class="ntwrktext">
                                                        <p>Alvaro A. Celis</p>
                                                        <p>alvarotest@microsoft.com</p>
                                                        <p>Manager</p>
                                                        <p>Country: Ghana</p>

                                                    </div>
                                                    <div class="connectEmail">
                                                        <a href="#">View Message</a>
                                                    </div>

                                                </li>

                                                <li class="netmgr" data-mgrid="552" data-email="alvarotest@microsoft.com">
                                                    <img src="/Uploadify/LoadImageHandler.ashx?id=2&amp;rnd=0.3250633522402495" width="61" height="61" alt="User">
                                                    <div class="ntwrktext">
                                                        <p>Alvaro A. Celis</p>
                                                        <p>alvarotest@microsoft.com</p>
                                                        <p>Manager</p>
                                                        <p>Country: Ghana</p>

                                                    </div>
                                                    <div class="connectEmail">
                                                        <a href="#">View Message</a>
                                                    </div>

                                                </li>

                                                <li class="netmgr" data-mgrid="552" data-email="alvarotest@microsoft.com">
                                                    <img src="/Uploadify/LoadImageHandler.ashx?id=2&amp;rnd=0.3250633522402495" width="61" height="61" alt="User">
                                                    <div class="ntwrktext">
                                                        <p>Alvaro A. Celis</p>
                                                        <p>alvarotest@microsoft.com</p>
                                                        <p>Manager</p>
                                                        <p>Country: Ghana</p>

                                                    </div>
                                                    <div class="connectEmail">
                                                        <a href="#">View Message</a>
                                                    </div>

                                                </li>

                                                <li class="netmgr" data-mgrid="552" data-email="alvarotest@microsoft.com">
                                                    <img src="/Uploadify/LoadImageHandler.ashx?id=2&amp;rnd=0.3250633522402495" width="61" height="61" alt="User">
                                                    <div class="ntwrktext">
                                                        <p>Alvaro A. Celis</p>
                                                        <p>alvarotest@microsoft.com</p>
                                                        <p>Manager</p>
                                                        <p>Country: Ghana</p>

                                                    </div>
                                                    <div class="connectEmail">
                                                        <a href="#">View Message</a>
                                                    </div>

                                                </li>

                                                <li class="netmgr" data-mgrid="552" data-email="alvarotest@microsoft.com">
                                                    <img src="/Uploadify/LoadImageHandler.ashx?id=2&amp;rnd=0.3250633522402495" width="61" height="61" alt="User">
                                                    <div class="ntwrktext">
                                                        <p>Alvaro A. Celis</p>
                                                        <p>alvarotest@microsoft.com</p>
                                                        <p>Manager</p>
                                                        <p>Country: Ghana</p>

                                                    </div>
                                                    <div class="connectEmail">
                                                        <a href="#">View Message</a>
                                                    </div>

                                                </li>--%>
                                            </div>
                                            <div id="pagingNetwork"></div>

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

















</asp:Content>
