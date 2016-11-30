<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    PoELibrary
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/poelibrary.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jscript.min.1.7.2.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Jquery_ui_min_latest.js"></script>
    <script src="../../Scripts/ref/Signup/poelibrary.js" type="text/javascript"></script>
    <form id="dnloadPDF">
        <div class="alertboxholder" id="alertboxHolder">
            <div class="alertbox">
                <img src="../../Images/other-popup-bg.png" />
                <div class="close">
                </div>
                <p id="alertText">
                    You have already selected the REP. Do you want to become a paid member?
                </p>
                <div class="button"> 
                    <input type="button" id="cancelbtn" value="Cancel" />
                    <input type="button" id="okbtn" value="Ok" />
                </div>
            </div>
        </div>
        <!--Form-->
        <div class="formpopupbg" style="display: block">
            <div class="formpopupt" id="form">
                <img src="../../Images/contact-us.png" />
                <div class="close">
                    &nbsp;
                </div>
                <div class="formpopup">
                    <div class="formtransbg">
                        <div class="header">
                            <h1>Contact PIPE9</h1>
                            <h2>Call: 1 855-923-5556</h2>
                        </div>
                        <div class="left">
                            <ul>
                                <li>First Name</li>
                                <li>
                                    <textarea rows="1" id="PoeDwnldFirstname" class="contname"></textarea>
                                <li>Last Name</li>
                                <li>
                                    <textarea rows="1" id="PoeDwnldLastname" class="contname"></textarea>
                                </li>
                                <li>Email</li>
                                <li>
                                    <textarea rows="1" id="PoeDwnldmailid" class="contname"></textarea>
                                </li>
                                <li>Company</li>
                                <li>
                                    <textarea rows="1" id="PoeDwnldCompany" class="contname"></textarea>
                                </li>
                                <li>Title</li>
                                <li>
                                    <textarea rows="1" id="PoeDwnldTitle" class="contname"></textarea>
                                </li>
                                <li>Phone</li>
                                <li>
                                    <textarea rows="1" id="PoeDwnldPhone" class="contname"></textarea>
                                </li>
                            </ul>
                        </div>
                        <div class="right">
                            Message for Sales
                        <div class="texfield">
                            <textarea id="PoeDwnldMessage"></textarea>
                        </div>
                            <div class="sendbtn" id="downloadPDFs" onclick="sendcontact()">
                                Send
                            </div>
                            <div class="errormsg">
                                <div id="PoeDwnldErrorMsg">
                                    <img src="../../Images/error.png" width="22" height="22" alt="Error" />
                                </div>
                                <p id="PoeDwnldErrorMsgContent">
                                    Please enter your First Name
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--End Form-->
        <div class="poepopupbg">
        </div>
        <div class="pageholder">
            <input type="hidden" id="Plans" value="0" />
            <input type="hidden" id="selectedpoeNo" value="0" />
            <input type="hidden" id="subscribedPoeCount" value="0" />
            <input type="hidden" id="plansValue" value="0" />
            <input type="hidden" id="HdnMode" value="none" />
            <input type="hidden" id="poeListVal" value="" />
            <input type="hidden" id="pdfDownload" />
            <input type="hidden" id="yammeridShow" value="0" />
            <input type="hidden" id="modevalue" value="1" />
            <input type="hidden" id="PageMode" value="1" />
            <input type="hidden" id="GetSubId" value="0" />
            <input type="hidden" id="hdnRedirectTo" name="hdnRedirectTo" value="55" />
            <!--Challenger Sales-->
            <div class="poepopup" id="dowmloadedPDF">
                <div class="poepopuphd">
                    <div class="close">
                    </div>
                </div>
            </div>
            <div class="poepopup" id="poepopupshow" style="cursor: move">
                <div class="poepopuphd">
                    <div class="close">
                    </div>
                </div>
            </div>
            <%--Microsoft Poe Popup--%>
            <div class="poepopup" id="microsoftpublicpoepoup" style="cursor: move">
                <div class="poepopuphd">
                    <div class="close">
                    </div>
                </div>
                <div class="poepopupcontent">
                    <img src="../../Images/poe-anatomy-bg.png" id="microsoftpoeimg" />
                    <div class="popupwrapper">
                        <table border="0" cellspacing="0" cellpadding="5">
                            <tr>
                                <td width="50%" colspan="2"></td>
                                <td width="50%" colspan="2" class="popuptextbg1">
                                    <div id="Microsoftpoeintocontent">
                                    </div>
                                    <a id="A3" class="dwnldbtn dwnldpoeContactus">download</a>
                                </td>
                            </tr>
                            <tr>
                                <td>&nbsp;
                                </td>
                                <td>&nbsp;
                                </td>
                                <td>&nbsp;
                                </td>
                                <td>&nbsp;
                                </td>
                            </tr>
                        </table>
                        <ul id="Microsoftpoeselection">
                            <%--<input id="Hidden1" value="0" type="hidden" />--%>
                            <li id="microsoftpulicpoes">
                                <img src="../../Images/icons/add-user_ico.png" alt="Business subscription" />
                                <p>
                                    Click here to add this REP
                                </p>
                                <span></span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <%--end--%>
            <%--Microsoft  Poe Popup without last content--%>
            <div class="poepopup" id="microsoftownpoe" style="cursor: move">
                <div class="poepopuphd">
                    <div class="close">
                    </div>
                </div>
                <div class="poepopupcontent">
                    <img src="../../Images/poe-anatomy-bg.jpg" id="microsoftownpoeimg" />
                    <div class="popupwrapper">
                        <table border="0" cellspacing="0" cellpadding="5">
                            <tr>
                                <td width="50%" colspan="2"></td>
                                <td width="50%" colspan="2" class="popuptextbg2">
                                    <div id="microsoftownpoecontent">
                                    </div>
                                    <a id="A4" class="dwnldbtn dwnldpoeContactus">download</a>
                                </td>
                            </tr>
                           <%-- <tr>
                                <td>&nbsp;
                                </td>
                                <td>&nbsp;
                                </td>
                                <td>&nbsp;
                                </td>
                                <td>&nbsp;
                                </td>
                            </tr>--%>
                        </table>
                    </div>
                </div>
            </div>
            <%--end--%>
            <div class="poepopup" id="poepopupcont" style="cursor: move">
                <div class="poepopuphd">
                    <div class="close">
                    </div>
                </div>
                <div class="poepopupcontent">
                    <img src="../../Images/poe-anatomy-bg.jpg" id="poeimg" />
                    <div class="popupwrapper">
                        <table border="0" cellspacing="0" cellpadding="5">
                            <tr>
                                <td width="50%" colspan="2"></td>
                                <td width="50%" colspan="2" class="popuptextbg1">
                                    <div id="poeintocontent">
                                    </div>
                                    <a id="downloadLink" class="dwnldbtn dwnldpoeContactus">download</a>
                                </td>
                            </tr>
                            <%--<tr>
                                <td>&nbsp;
                                </td>
                                <td>&nbsp;
                                </td>
                                <td>&nbsp;
                                </td>
                                <td>&nbsp;
                                </td>
                            </tr>--%>
                        </table>
                        <ul id="poeselection">
                            <input id="selectedpoeid" value="0" type="hidden" />
                            <li id="businessSubcription">
                                <img src="../../Images/business-subscription.png" alt="Business subscription" />
                                <p>
                                    Business Subscription from as little as $5/month
                                </p>
                            </li>
                            <li id="paidSubscribtion" value="Paid">
                                <img src="../../Images/individual-subscription.png" alt="Individual subscription" />
                                <p>
                                    Individual Subscription starting from $10/month
                                </p>
                            </li>
                            <li id="addnowTrail" value="Trail">
                                <img src="../../Images/trial.png" alt="Trial" />
                                <h2>Trial</h2>
                                <span>14 Day Free Trial </span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--Anatomy-->
            <div class="byo">
                <div class="poepopup" id="anatomy" style="cursor: move">
                    <div class="poepopuphd">
                        <div class="close">
                        </div>
                    </div>
                    <div class="poepopupcontent">
                        <img src="../../Images/poe-anatomy-bg.png" />
                        <div class="popupwrapper">
                            <table border="0" cellspacing="0" cellpadding="5">
                                <tr>
                                    <td width="40%" colspan="2">
                                        <h1>Anatomy of a
                                        <br />
                                            <span>Role Excellence Profile</span></h1>
                                    </td>
                                    <td width="60%" colspan="2" class="popuptextbg aop">
                                        <p>
                                            Role Excellence Profiles (REP) define the standards for how to do excellent work.
                                        The REP becomes everyone's North Star for excelling in role. REPs are built from
                                        learning about what Top Performers do differently from everyone else. The REP delivers
                                        an excellence roadmap for Individuals and a hypothesis of excellence for Frontline
                                        Managers enabling them to become great coaches. REPs are made up of the following
                                        elements:
                                        </p>
                                        <p>
                                            <strong>Excellence Portrait:</strong> Provides a Portrait of the Skills and Behaviors
                                        that distinguish Top Performers.
                                        </p>
                                        <p>
                                            <strong>Excellence Practices:</strong> Defines the Practices and Methods adopted
                                        by Top Performers that make them successful.
                                        </p>
                                        <p>
                                            <strong>Excellence in Action:</strong> Describes the specific Actions that Top Performers
                                        take that set them apart.
                                        </p>
                                        <p>
                                            <strong>Excellence Standing:</strong> Based on feedback everyone receives a personalized
                                        rating of excellence. ‘Standing’ acts as a mile marker for the progress made towards
                                        adopting the Skills and Behaviors of Top Performers.
                                        </p>
                                        <a id="A1" class="dwnldbtn dwnldpoeContactus">download</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>&nbsp;
                                    </td>
                                    <td>&nbsp;
                                    </td>
                                    <td>&nbsp;
                                    </td>
                                    <td>&nbsp;
                                    </td>
                                </tr>
                                <tr>
                                    <td width="25%">
                                        <div class="trialcont">
                                            <img src="../../Images/Challenger Selling_Intro.png" />
                                        </div>
                                    </td>
                                    <td width="25%" class="trialtxt">
                                        <h2>Challenger Selling</h2>
                                        <p>
                                            The ‘Challenger Selling’ Role Excellence Profile is based on the pioneering work completed
                                        by the CEB...
                                        </p>
                                        <div class="freetrial chlselling">
                                            <p>
                                                Free Trial
                                            </p>
                                            <div class="freetrialimg">
                                                <img src="../../Images/free-trial.png" />
                                            </div>
                                        </div>
                                    </td>
                                    <td width="25%">
                                        <div class="trialcont">
                                            <img src="../../Images/Human Selling_Intro.png" />
                                        </div>
                                    </td>
                                    <td width="25%" class="trialtxt">
                                        <h2>Human Selling</h2>
                                        <p>
                                            The ‘Human Selling’ Role Excellence Profile is based on the New York Times bestselling
                                        book written by Daniel...
                                        </p>
                                        <div class="freetrial humanSelling">
                                            <p>
                                                Free Trial
                                            </p>
                                            <div class="freetrialimg">
                                                <img src="../../Images/free-trial.png" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="byo">
                <div class="poepopup" id="BuildOwn" style="cursor: move">
                    <div class="poepopuphd">
                        <div class="close">
                        </div>
                    </div>
                    <div class="poepopupcontent">
                        <img src="../../Images/poe-byo.png" />
                        <div class="popupwrapper">
                            <table border="0" cellspacing="0" cellpadding="5">
                                <tr>
                                    <td width="50%" colspan="2">
                                        <h1>Build Your Own
                                        <br />
                                            <span>Role Excellence Profiles</span></h1>
                                    </td>
                                    <td width="50%" colspan="2" class="popuptextbg buo">
                                        <h3>Amplify Top Performance:</h3>
                                        <p>
                                            The REP details the Practice Areas and Methods for Success that set the Top Performers
                                        apart and captures the specific Actions they take to Win more deals or devise marketing
                                        campaigns that have bigger impact.
                                        </p>
                                        <h3>The Role Excellence Profile Network:
                                        </h3>
                                        <p>
                                            With the Role Excellence Profile Network REPs can be shared so everyone stays focused
                                        on doing the right things and Top Performance gets amplified.
                                        </p>
                                        <h3>Our REP Strategists:</h3>
                                        <p>
                                            Contact our team of REP strategists to help build REPs to meet your needs. Leverage
                                        the knowledge of our experts gained from working with Top Performers across a broad
                                        range of Industries and Professions.
                                        </p>
                                        <a id="A2" class="dwnldbtn dwnldpoeContactus">Contact Us</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>&nbsp;
                                    </td>
                                    <td>&nbsp;
                                    </td>
                                    <td>&nbsp;
                                    </td>
                                    <td>&nbsp;
                                    </td>
                                </tr>
                                <tr>
                                    <td width="25%">
                                        <div class="trialcont">
                                            <img src="../../Images/Challenger Selling_Intro.png" />
                                        </div>
                                    </td>
                                    <td width="25%" class="trialtxt">
                                        <h2>Challenger Selling</h2>
                                        <p>
                                            The ‘Challenger Selling’ Role Excellence Profile is based on the pioneering work completed
                                        by the CEB...
                                        </p>
                                        <div class="freetrial chlselling">
                                            <p>
                                                Free Trial
                                            </p>
                                            <div class="freetrialimg">
                                                <img src="../../Images/free-trial.png" />
                                            </div>
                                        </div>
                                    </td>
                                    <td width="25%">
                                        <div class="trialcont">
                                            <img src="../../Images/Human Selling_Intro.png" />
                                        </div>
                                    </td>
                                    <td width="25%" class="trialtxt">
                                        <h2>Human Selling</h2>
                                        <p>
                                            The ‘Human Selling’ Role Excellence Profile is based on the New York Times bestselling
                                        book written by Daniel...
                                        </p>
                                        <div class="freetrial humanSelling">
                                            <p>
                                                Free Trial
                                            </p>
                                            <div class="freetrialimg">
                                                <img src="../../Images/free-trial.png" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="breadcrumb">
                <a href="../Common/Index">Home > </a>The Role Excellence Profile Library
            </div>
            <h1>The Role Excellence Profile Library</h1>
            <div class="column">
                <div class="hdcvr">
                    <div class="select">
                        <p id="selecttextValue">
                            Sales
                        </p>
             
                        <img src="../../Images/KessakuImage/poemenubg.png" width="23" height="23" class="down" /><img
                            src="../../Images/KessakuImage/poemenubg-up.png" width="23" height="23" class="up" />
                        <ul>
                            <li class="leadership">
                                <p>
                                    Leadership
                                </p>
                            </li>
                            <li class="sales">
                                <p>
                                    Sales
                                </p>
                            </li>
                            <li class="partner">
                                <p>
                                    Partner
                                </p>
                            </li>
                            <li class="marketing">
                                <p>
                                    Marketing
                                </p>
                            </li>
                            <li class="microsoft" style="display: none">
                                <p>
                                    Microsoft
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul id="microsoft">
                    <li class="bigtile" id="poe4">

                        <img src="../../images/Partner Sales Manager_Intro.png" width="600" height="600" />
                        <p>
                            <span>Partner Sales Manager</span>
                        </p>
                    </li>

                    <li id="poe5">
                        <img src="../../images/Dynamics Lead_Intro.png" width="600" height="600" />
                        <p>
                            <span>Dynamics Lead</span>
                        </p>
                    </li>
                    <li id="poe7">
                        <img src="../../images/SpecialistSalesManager_intro.png" width="600" height="600" />
                        <p>
                            <span>Specialist Sales Manager</span>
                        </p>
                    </li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <ul id="leadership">
                    <%--<li class="bigtile" id="poe5">
                        <img src="../../images/Dynamics Lead_Intro.png" width="600" height="600" />
                        <p>
                            <span>Dynamics Lead</span>
                        </p>
                    </li>--%>
                    <li class="bigtile" id="poe6">
                        <img src="../../images/LeadersMaketheFuture_poe.png" width="600" height="600" />
                        <p>
                            <span>Leaders Make the Future</span>
                        </p>
                    </li>
                    <li id="poe2">
                        <img src="../../images/CloudBusiness_poe.png" width="600" height="600" />
                        <p>
                            <span>Cloud Business</span>
                        </p>
                    </li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <ul id="partner">
                    <li class="bigtile"></li>
                    <%--<li class="bigtile" id="poe4">

                        <img src="../../images/Partner Sales Manager_Intro.png" width="600" height="600" />
                        <p>
                            <span>Partner Sales Manager</span>
                        </p>
                    </li>--%>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <ul id="sales">
                    <%--<li class="bigtile" id="poe7">
                        <img src="../../images/SpecialistSalesManager_intro.png" width="600" height="600" />
                        <p>
                            <span>Specialist Sales Manager</span>
                        </p>
                    </li>--%>
                    <li class="bigtile" id="poe1">
                        <img src="../../images/HumanSelling_poe.png" width="600" height="600" />
                        <p>
                            <span>Human Selling</span>
                        </p>
                    </li>
                    <li id="poe3">
                        <img src="../../images/ChallengerSelling_poe.png" width="600" height="600" />
                        <p>
                            <span>Challenger Selling</span>
                        </p>
                    </li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <ul id="marketing">
                    <li class="bigtile"></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div class="column">
                <div class="hdcvr">
                    <h1>Spotlight</h1>
                </div>
                <ul id="allpoes">
                    <li class="bigtile" id="poe3">
                        <div class="comingsoon">
                            <img src="../../Images/new.png" width="170" height="169" />
                        </div>
                        <img src="../../images/ChallengerSelling_poe.png" width="600" height="600" />
                        <p>
                            <span>Challenger Selling</span>
                        </p>
                    </li>
                    <li id="poe2">
                        <img src="../../images/CloudBusiness_poe.png" width="600" height="600" />
                        <p>
                            <span>Cloud Business</span>
                        </p>
                    </li>
                    <li id="poe1">
                        <img src="../../images/HumanSelling_poe.png" width="600" height="600" />
                        <p>
                            <span>Human Selling</span>
                        </p>
                    </li>
                    <li>
                        <div class="comingsoon">
                            <img src="../../images/comingsoon.png" width="170" height="169" />
                        </div>
                        <img src="../../images/partner-manager.png" width="600" height="600" />
                        <p>
                            <span>Social Selling</span>
                        </p>
                    </li>
                    <li class="buildyou">
                        <img src="../../Images/build-ur-own.png" width="600" height="600" />
                        <p>
                            <span>Build your Own</span>
                        </p>
                    </li>
                    <li class="anatomys">
                        <img src="../../Images/anatomy.png" width="600" height="600" />
                        <p>
                            <span>Anatomy of a REP </span>
                        </p>
                    </li>
                </ul>
            </div>
            <div class="column">
                <div class="hdcvr">
                    <h1>Your REPs</h1>
                </div>
                <div>
                    <ul id="selectedPoeslist">
                    </ul>
                </div>
                <div class="btnholder">
                    <input type="button" value="Next Step" class="buybtn" id="buynow" />
                    <input type="button" value="Back" class="buybtn" id="backlibrary" onclick="javascript: history.go(-1);" />
                </div>
            </div>
        </div>
        <div class="footerpoe">
            <div class="pagination">
                <div class="img" id="backlibrary" onclick="javascript: history.go(-1);">
                    <img src="../../images/nav-prev.png" width="43" height="43" alt="Previous" />
                </div>
                <div class="txt">
                    The Role Excellence Profile Library
                </div>
                <div class="img" onclick="javascript: history.go(-1);">
                    <img src="../../images/nav-nxt.png" width="43" height="43" alt="Previous" />
                </div>
            </div>
            <div class="menu">
                <div id="poecontextment">
                    <ul>
                        <li class="leadership"><span>
                            <img src="../../images/icons/leader.png" width="25" height="20" /></span>
                            <p>
                                Leadership
                            </p>
                        </li>
                        <li class="sales"><span>
                            <img src="../../images/icons/sales.png" width="25" height="20" /></span>
                            <p>
                                Sales
                            </p>
                        </li>
                        <li class="partner"><span>
                            <img src="../../images/icons/partner.png" width="25" height="20" alt="Partner" /></span>
                            <p>
                                Partner
                            </p>
                        </li>
                        <li class="marketing"><span>
                            <img src="../../images/icons/marketing.png" width="25" height="20" alt="Partner" />
                        </span>
                            <p>
                                Marketing
                            </p>
                        </li>
                        <li class="microsoft"><span>
                            <img src="../../images/icons/microsoft-small.jpg" width="25" height="20" alt="Partner" />
                        </span>
                            <p>
                                Microsoft
                            </p>
                        </li>
                    </ul>
                </div>
                <div>
                    <img src="../../images/footer-menu.png" width="29" height="27" alt="Menu" />
                </div>
                <div>
                    <p>
                        Menu
                    </p>
                </div>
            </div>
        </div>
    </form>
</asp:Content>