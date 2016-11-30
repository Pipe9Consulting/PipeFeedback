<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="kessakuHeaderSection.aspx.cs" Inherits="bExcellent.mvc.Views.KessakuHome.kessakuHeaderSection" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    
        <div class="header">
            <div class="placeholder">
                <div class="logo">
                    <a href="/">
                        <img src="../../Images/KessakuImage/logo.png" alt="Kessaku" /></a>
                </div>
                <div class="navigation">
                    <ul id="headerCont">
                        <li><a href="../Microsoft/Login" class="members">Login</a></li>
                        <li><a>Demo Request</a></li>
                        
                      <li class="res" id="ResourcesHdr"><a href="../Resources">Resources</a>
                            <ul>
                                <li><a>Demo Rquest</a></li>
                                <%--<li><a>REP Library</a></li>--%>
                                <%--<li><a>Webinars</a></li>--%>
                                <li><a>Videos</a></li>
                                <%--<li><a>Downloadable Content</a></li>--%>
                            </ul>
                        </li>
                        <li class="cs" id="cloudSolnHdr"><a href="../CloudSolutions">Pipe9 Solutions</a>
                            <ul>
                                <%-- <li><a>Kessaku Cloud</a></li>--%>
                                <li><a>Library of Profiles</a></li>
                                <li><a>PIPE9 Coach</a></li>
                                <li><a>Performance Reports</a></li>
                                <li><a>Coaching Toolkits</a></li>
                            </ul>
                        </li>
                        <li class="casc" id="cloudasHdr"><a href="../CloudAsCoach">Pipe9 Coach</a>
                            <ul>
                                <li><a>Library Profiles</a></li>
                                <li><a>Feedback</a></li>
                                <%--<li><a>Smart Connect</a></li>--%>
                                <li><a>Development Priorities</a></li>
                                <li><a>Recognition</a></li>
                                <li><a>Analytics</a></li>
                            </ul>
                        </li>
                        <li id="homeAct"><a class="active" href="/">Home</a></li>
                    </ul>
                </div>
            </div>
        </div>

</body>
</html>