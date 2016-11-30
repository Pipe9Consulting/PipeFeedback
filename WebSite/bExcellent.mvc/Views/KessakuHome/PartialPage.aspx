<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <meta name="viewport" content="width=device-width" />
    <link href="../../Styles/KessakuStyles/home.css" rel="stylesheet" />
    <link href="../../Styles/KessakuStyles/icons.css" rel="stylesheet" />
    <link href="../../Styles/KessakuStyles/reset.css" rel="stylesheet" />
    <link rel="shortcut icon" href="../../Images/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="../../Images/favicon.ico" type="image/x-icon" />

    <style>
        body
        {
            position: fixed;
            height: 100%;
            width: 100%;
        }
    </style>
    <script src="../../Scripts/jquery-1.9.1.js"></script>
    <script src="../../Scripts/KessakuScript/partialPage.js"></script>
    <script src="../../Scripts/KessakuScript/kessakuHomeCommon.js"></script>



    <!-------------------------- POPUP -------------------------->



   



    <!---------------------------------------------------------------->


</head>
<body>
    <input type="hidden" id="homeurl" value="<%=ConfigurationManager.AppSettings["HostingPrefix"].ToString() %>" />
    <div class="headerbdr"></div>
    <div class="header">
        <div class="placeholder">
            <div class="logo">
                <a href="/">
                    <img id="kesslogo" src="../../Images/KessakuImage/logo.png" alt="Kessaku" /></a>
            </div>
            <div class="navigation">
                <ul id="headerCont">
                    <li><a href="<%=ConfigurationManager.AppSettings["HostingPrefix"].ToString() %>/Microsoft/login" target="_blank" class="members">Login</a></li>
                    <li id="reqDemoHdr"><a href="../RequestDemo" target="demo_iframe">Demo Request</a></li>
                  <%--  <li id="pricingHdr"><a href="../Pricing" target="demo_iframe">Pricing</a></li>--%>
                    <li class="res" id="ResourcesHdr"><a href="../Resources" target="demo_iframe">Resources</a>
                        <ul>

                            <%--<li onclick="RedirectPoeLibrary()"><a>Role Excellence Library</a></li>--%>
                            <%--<li id=""><a href="../Events" target="demo_iframe">Events</a></li>--%>
                            <li id=""><a href="../Videos" target="demo_iframe">Videos</a></li>
                         <%--   <li><a href="../DownloadableContent" target="demo_iframe">Downloadable Content</a></li>--%>
                            <li><a href="http://alandowzall.com/" target="_blank">Blog</a></li>
                        </ul>
                    </li>
                    <li class="cs" id="cloudSolnHdr"><a href="../CloudSolutions#Cloud Solutions" target="demo_iframe">PIPE9 Solutions</a>
                        <ul id="tempSolnRedirect">

                            <li><a href="../CloudSolutions#ProfileOfExcellenceCont" target="demo_iframe" class="poetile">Profiles of Excellence</a></li>
                            <li><a href="../CloudSolutions#cloudAsCoachCont" target="demo_iframe" class="coctile">PIPE9 Coach</a></li>
                            <li><a href="../CloudSolutions#PerformanceCont" target="demo_iframe" class="prtile">Action Reports </a></li>
                            <li><a href="../CloudSolutions#CoachingToolKitCont" target="demo_iframe" class="cttile">Coaching Toolbox</a></li>
                        </ul>
                    </li>
                    <li class="casc" id="cloudasHdr"><a href="../CloudAsCoach" target="demo_iframe">PIPE9 Coach</a>
                        <ul id="tempRedirect">
                            <li><a href="../CloudAsCoach#CloudasPoe" target="demo_iframe" name="blabla">Profiles of Excellence</a></li>
                            <li><a href="../CloudAsCoach#Feedback" target="demo_iframe">Feedback</a></li>
                            <li><a href="../CloudAsCoach#standingPage" target="demo_iframe">Sync</a></li>
                            <%--<li><a href="../CloudAsCoach#Smart-Connect" target="demo_iframe">Connect</a></li>--%>
                            <li><a href="../CloudAsCoach#Goals" target="demo_iframe">Development Priorities</a></li>
                            <li><a href="../CloudAsCoach#Recognition" target="demo_iframe">Recognition</a></li>
                        </ul>
                    </li>
                    <li id="homeAct"><a class="active" href="../Home" target="demo_iframe">Home</a></li>
                </ul>
            </div>
        </div>
    </div>

    <iframe id='demo_iframe' onload="" frameborder="0" scrolling="auto" name="demo_iframe" class="" src="../Home" width="100%"></iframe>
</body>
</html>