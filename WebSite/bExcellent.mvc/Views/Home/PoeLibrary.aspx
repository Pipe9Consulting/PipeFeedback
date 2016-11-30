<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/jquery.custom-scrollbar.css" rel="stylesheet" />
    <link href="../../Styles/poelibrary.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/KessakuStyles/poe.css" rel="stylesheet" />

    <%--<script src="../../Scripts/jscript.min.1.7.2.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Jquery_ui_min_latest.js"></script>--%>
    <script src="../../Scripts/jquery.custom-scrollbar.js"></script>
    <script src="../../Scripts/ref/Signup/poelibrary.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#kesslogo').attr('src', '../../Images/KessakuImage/logo.png');
        });
    </script>
    <input type="hidden" id="homeurl" value="<%=ConfigurationManager.AppSettings["HostingPrefix"].ToString() %>" />
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
                            <h1>Contact bexcellent</h1>
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
                <img src="../../Images/poe-anatomy-bg.png" id="microsoftownpoeimg" />
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
                <img src="../../Images/poe-anatomy-bg.png" id="poeimg" />
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
                            <h2>Trial for Free</h2>
                        </li>
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
        <div class="poepopupbg">
        </div>
        <div class="poepage">
            <div class="placeholder">

                <div class="poecolumn poemargintop">
                    <div class="top">
                        <div class="breadcrumb">
                            <a href="../Common/Index">Home &gt; </a>The Role Excellence Profile Library
                        </div>
                        <h1>Role Excellence Profile Library </h1>
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
                        <li id="poe12">
                            <img src="../../Images/KessakuImage/AOAdSolSpecialist.png" width="600" height="600" />
                            <p>
                                A&O AdSol Specialist
                            </p>
                        </li>
                        <li id="poe13">
                            <img src="../../Images/KessakuImage/AOProductSpecialist.png" width="600" height="600" />
                            <p>
                                A&O Product Specialist
                            </p>
                        </li>
                        <li id="poe8">
                            <img src="../../Images/KessakuImage/AccountManager.png" width="600" height="600" />
                            <p>
                                A&O Account Manager
                            </p>
                        </li>
                        <li id="poe9">
                            <img src="../../Images/KessakuImage/SalesManager.png" width="600" height="600" />
                            <p>
                                A&O Sales Manager
                            </p>
                        </li>
                        <li id="poe10">
                            <img src="../../Images/KessakuImage/AMManager.png" width="600" height="600" />
                            <p>
                                A&O AM Manager
                            </p>
                        </li>
                        <li id="poe11">
                            <img src="../../Images/KessakuImage/AccountExecutive.png" width="600" height="600" />
                            <p>
                                A&O Account Executive
                            </p>
                        </li>
                        <li id="poe4">
                            <img src="../../Images/KessakuImage/PartnerSalesManager_poe.jpg" />
                            <p>
                                Partner Sales Manager
                            </p>
                        </li>

                        <li id="poe5">
                            <img src="../../Images/KessakuImage/DynamicsLead_poe.jpg" width="600" height="600" />
                            <p>
                                Dynamics Lead
                            </p>
                        </li>
                        <li id="poe7">
                            <img src="../../Images/KessakuImage/SpecialistSalesManager.jpg" width="600" height="600" />
                            <p>
                                Specialist Sales Manager
                            </p>
                        </li>

                        <%-- <li></li>--%>
                        <%--  <li></li>--%>
                        <%-- <li></li>
                        <li></li>--%>
                    </ul>
                    <ul id="leadership">

                        <li id="poe6">
                            <img src="../../Images/KessakuImage/LeadersMakeTheFuture_poe.jpg" width="600" height="600" />
                            <p>
                                Leaders Make the Future
                            </p>
                        </li>
                        <li id="poe2">
                            <img src="../../Images/KessakuImage/CloudBusiness_poe.jpg" width="600" height="600" />
                            <p>
                                Cloud Business
                            </p>
                        </li>
                        <li class="anatomys">
                            <img src="../../Images/KessakuImage/Anatomy.jpg" width="600" height="600" />
                            <p>
                                Anatomy of a REP
                            </p>
                        </li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul id="partner">
                        <li class="anatomys">
                            <img src="../../Images/KessakuImage/Anatomy.jpg" width="600" height="600" />
                            <p>
                                Anatomy of a REP
                            </p>
                        </li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul id="sales">

                        <li id="poe1">
                            <img src="../../images/KessakuImage/HumanSelling_poe.jpg" width="600" height="600" />
                            <p>
                                Human Selling
                            </p>
                        </li>
                        <li id="poe3">
                            <img src="../../images/KessakuImage/ChallengerSelling_poe.jpg" width="600" height="600" />
                            <p>
                                Challenger Selling
                            </p>
                        </li>
                        <li class="anatomys">
                            <img src="../../Images/KessakuImage/Anatomy.jpg" width="600" height="600" />
                            <p>
                                Anatomy of a REP
                            </p>
                        </li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul id="marketing">
                        <li class="anatomys">
                            <img src="../../Images/KessakuImage/Anatomy.jpg" width="600" height="600" />
                            <p>
                                Anatomy of a REP
                            </p>
                        </li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>

                <div class="midcolumn" id="poe-columnmarginfrist">
                    <div class="top">
                        <h1>Spotlight</h1>
                    </div>
                    <ul>
                        <li id="Li2">
                            <%-- <div class="new">New</div>--%>
                            <img src="../../Images/KessakuImage/PoE/ChallengerSelling_large.png" /><p>Challenger Selling</p>
                        </li>
                        <li id="Li3">
                            <%--<div class="new">New</div>--%>
                            <img src="../../Images/KessakuImage/PoE/CloudBusiness_large.png" /><p>Cloud Business</p>
                        </li>
                        <li id="Li4">
                            <img src="../../Images/KessakuImage/PoE/HumanSelling_large.png" /><p>Human Selling</p>
                        </li>
                    </ul>
                </div>
                <%--id="selectedPoEsLists"--%>

                <div class="poelastColumn">
                    <div class="top">
                        <h1>Your REPs</h1>
                    </div>
                    <div id="horizontal-scrollbar-demo" class="default-skin demo">
                        <%-- <div class="poE-verticalDiv1">
                        <div class="poe-midcolumn">

                            <ul id="Ul4">
                                <li id="Li16">

                                    <img src="../../Images/KessakuImage/PoE/challenger-selling-spotlight.png" /><p>Challenger Selling</p>
                                </li>
                                <li id="Li17">

                                    <img src="../../Images/KessakuImage/PoE/cloud-business-spotlight.png" /><p>Cloud Business</p>
                                </li>
                                <li id="Li18">
                                    <img src="../../Images/KessakuImage/PoE/human-selling-spotlight.png" /><p>Human Selling</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="poE-verticalDiv">
                        <div class="poelastcolumn">

                            <ul id="Ul5">
                                <li id="Li19">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/challenger-selling-spotlight.png" /><p>Challenger Selling</p>
                                </li>
                                <li id="Li20">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/cloud-business-spotlight.png" /><p>Cloud Business</p>
                                </li>
                                <li id="Li21">
                                    <img src="../../Images/KessakuImage/PoE/human-selling-spotlight.png" /><p>Human Selling</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="poE-verticalDiv">
                        <div class="poelastcolumn">

                            <ul id="Ul8">
                                <li id="Li1">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/challenger-selling-spotlight.png" /><p>Challenger Selling</p>
                                </li>
                                <li id="Li2">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/cloud-business-spotlight.png" /><p>Cloud Business</p>
                                </li>
                                <li id="Li3">
                                    <img src="../../Images/KessakuImage/PoE/human-selling-spotlight.png" /><p>Human Selling</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="poE-verticalDiv">
                        <div class="poelastcolumn">

                            <ul id="Ul1">
                                <li id="Li4">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/challenger-selling-spotlight.png" /><p>Challenger Selling</p>
                                </li>
                                <li id="Li5">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/cloud-business-spotlight.png" /><p>Cloud Business</p>
                                </li>
                                <li id="Li6">
                                    <img src="../../Images/KessakuImage/PoE/human-selling-spotlight.png" /><p>Human Selling</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="poE-verticalDiv">
                        <div class="poelastcolumn">

                            <ul id="Ul2">
                                <li id="Li7">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/challenger-selling-spotlight.png" /><p>Challenger Selling</p>
                                </li>
                                <li id="Li8">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/cloud-business-spotlight.png" /><p>Cloud Business</p>
                                </li>
                                <li id="Li9">
                                    <img src="../../Images/KessakuImage/PoE/human-selling-spotlight.png" /><p>Human Selling</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="poE-verticalDiv">
                        <div class="poelastcolumn">

                            <ul id="Ul3">
                                <li id="Li10">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/challenger-selling-spotlight.png" /><p>Challenger Selling</p>
                                </li>
                                <li id="Li11">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/cloud-business-spotlight.png" /><p>Cloud Business</p>
                                </li>
                                <li id="Li12">
                                    <img src="../../Images/KessakuImage/PoE/human-selling-spotlight.png" /><p>Human Selling</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="poE-verticalDiv">
                        <div class="poelastcolumn">

                            <ul id="Ul6">
                                <li id="Li13">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/challenger-selling-spotlight.png" /><p>Challenger Selling</p>
                                </li>
                                <li id="Li14">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/cloud-business-spotlight.png" /><p>Cloud Business</p>
                                </li>
                                <li id="Li15">
                                    <img src="../../Images/KessakuImage/PoE/human-selling-spotlight.png" /><p>Human Selling</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="poE-verticalDiv">
                        <div class="poelastcolumn">

                            <ul id="Ul7">
                                <li id="Li22">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/challenger-selling-spotlight.png" /><p>Challenger Selling</p>
                                </li>
                                <li id="Li23">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/cloud-business-spotlight.png" /><p>Cloud Business</p>
                                </li>
                                <li id="Li24">
                                    <img src="../../Images/KessakuImage/PoE/human-selling-spotlight.png" /><p>Human Selling</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>--%>
                    </div>
                    <%--<div class="poe-midcolumn" id="poe-columnmarginlast">
                            <div class="top">
                                <h1>Your PoE's</h1>
                            </div>
                            <ul id="selectedPoeslist">
                                <li id="Li1">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/challenger-selling-spotlight.png" /><p>Challenger Selling</p>
                                </li>
                                <li id="Li2">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/cloud-business-spotlight.png" /><p>Cloud Business</p>
                                </li>
                                <li id="Li3">
                                    <img src="../../Images/KessakuImage/PoE/human-selling-spotlight.png" /><p>Human Selling</p>
                                </li>
                            </ul>
                        </div>

                        <div class="poelastcolumn" id="poe-columnmarginlast">
                            <div class="top" style="visibility: hidden">
                                <h1>Your PoE's</h1>
                            </div>
                            <ul id="selectedPoeslist1">
                                <li id="Li1">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/challenger-selling-spotlight.png" /><p>Challenger Selling</p>
                                </li>
                                <li id="Li2">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/cloud-business-spotlight.png" /><p>Cloud Business</p>
                                </li>
                                <li id="Li3">
                                    <img src="../../Images/KessakuImage/PoE/human-selling-spotlight.png" /><p>Human Selling</p>
                                </li>
                            </ul>
                        </div>
                        <div class="poelastcolumn" id="poe-columnmarginlast">
                            <div class="top" style="visibility: hidden">
                                <h1>Your PoE's</h1>
                            </div>
                            <ul id="Ul1">
                                <li id="Li1">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/challenger-selling-spotlight.png" /><p>Challenger Selling</p>
                                </li>
                                <li id="Li2">
                                    <div class="new">New</div>
                                    <img src="../../Images/KessakuImage/PoE/cloud-business-spotlight.png" /><p>Cloud Business</p>
                                </li>
                                <li id="Li3">
                                    <img src="../../Images/KessakuImage/PoE/human-selling-spotlight.png" /><p>Human Selling</p>
                                </li>
                            </ul>
                        </div>                    --%>

                    <div class="btnplace">
                        <div class="next" id="buynow">Next</div>
                        <div class="prev" id="previousbtn">Previous</div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</asp:Content>