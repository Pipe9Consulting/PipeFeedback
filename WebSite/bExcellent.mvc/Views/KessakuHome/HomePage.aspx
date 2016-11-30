<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <meta name="viewport" content="width=device-width" />
    <title>HomePage</title>
    <link href="../../Styles/KessakuStyles/client-carousel.css" rel="stylesheet" />
    <link href="../../Styles/KessakuStyles/DummyReset.css" rel="stylesheet" />
    <link href="../../Styles/KessakuStyles/dummyHome.css" rel="stylesheet" />
    <link href="../../Styles/KessakuStyles/dummyicons.css" rel="stylesheet" />
    <%--<link href="../../Styles/KessakuStyles/pop-up.css" rel="stylesheet" />
    <link href="../../Styles/KessakuStyles/home.css" rel="stylesheet" />--%>
    <%--<link href="../../Styles/KessakuStyles/icons.css" rel="stylesheet" />--%>
    <%--<link href="../../Styles/KessakuStyles/reset.css" rel="stylesheet" />--%>
    <%--<link rel="shortcut icon" href="../../Images/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="../../Images/favicon.ico" type="image/x-icon" />--%>
    <script src="../../Scripts/jquery-1.9.1.js"></script>
    <script src="../../Scripts/KessakuScript/partialPage.js"></script>
    <script src="../../Scripts/KessakuScript/kessakuHomeCommon.js"></script>
    <script src="../../Scripts/KessakuScript/Home.js"></script>
</head>
<body>
    <div class="headerbdr"></div>
    <div class="header">
        <div class="placeholder">
            <div class="logo">
                <a href="/">
                    <img src="../../Images/KessakuImage/dummy/logo.png" alt="Kessaku" /></a>
            </div>
            <div class="navigation">
                <ul id="headerCont">
                    <li><a href="../Microsoft/Login" class="members">Members</a></li>
                    <li id="reqDemoHdr"><a href="../RequestDemo" target="demo_iframe">Request a Demo</a></li>
                    <li id="pricingHdr"><a href="../Pricing" target="demo_iframe">Pricing</a></li>
                    <li class="res" id="ResourcesHdr"><a href="../Resources" target="demo_iframe">Resources</a>
                        <ul>

                            <li onclick="RedirectPoeLibrary()"><a>REP Library</a></li>
                            <li id=""><a href="../Events" target="demo_iframe">Events</a></li>
                            <li id="Li1"><a href="../Videos" target="demo_iframe">Videos</a></li>
                            <li><a href="../DownloadableContent" target="demo_iframe">Downloadable Content</a></li>
                            <li><a href="http://alandowzall.com/" target="_blank">Blog</a></li>
                        </ul>
                    </li>
                    <li class="cs" id="cloudSolnHdr"><a href="../CloudSolutions#Cloud Solutions" target="demo_iframe">Cloud Solutions</a>
                        <ul id="tempSolnRedirect">

                            <li><a href="../CloudSolutions#ProfileOfExcellenceCont" target="demo_iframe" class="poetile">Role Excellence Profiles</a></li>
                            <li><a href="../CloudSolutions#cloudAsCoachCont" target="demo_iframe" class="coctile">Cloud as Coach</a></li>
                            <li><a href="../CloudSolutions#PerformanceCont" target="demo_iframe" class="prtile">Performance Reports</a></li>
                            <li><a href="../CloudSolutions#CoachingToolKitCont" target="demo_iframe" class="cttile">Coaching Toolbox</a></li>
                        </ul>
                    </li>
                    <li class="casc" id="cloudasHdr"><a href="../CloudAsCoach" target="demo_iframe">Cloud as Coach</a>
                        <ul id="tempRedirect">
                            <li><a href="../CloudAsCoach#CloudasPoe" target="demo_iframe" name="blabla">Role Excellence Profiles</a></li>
                            <li><a href="../CloudAsCoach#Feedback" target="demo_iframe">Feedback</a></li>
                            <li><a href="../CloudAsCoach#standingPage" target="demo_iframe">Standing</a></li>
                            <li><a href="../CloudAsCoach#Smart-Connect" target="demo_iframe">Connect</a></li>
                            <li><a href="../CloudAsCoach#Goals" target="demo_iframe">Goals</a></li>
                            <li><a href="../CloudAsCoach#Recognition" target="demo_iframe">Recognition</a></li>
                        </ul>
                    </li>
                    <li id="homeAct"><a class="active" href="../Home" target="demo_iframe">Home</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="homebg">
        <div class="midbar">
            <div class="placeholder">
                <p>With our new Cloud technology we help companies decode and profile what best performers do differently to accelerate execution and win </p>
            </div>
            <div class="signupholder">
                <div class="signupcontent">
                    <p>PIPE9 is the <span>Coach in the Cloud</span> for you, your team and your company</p>
                    <div class="txtbx">
                        <input type="text" placeholder="enter your email address" id="emailid" />
                    </div>
                    <div class="signup">
                        <input type="button" value="Trial for Free" id="signupbtn" />
                    </div>
                    <!--<div class="yammersignup">
            <input type="button" value="Sign Up" />
            <p>using Yammer</p>
          </div>-->
                    <div class="microsoft">
                        <p>As used by</p>
                        <img src="../../Images/KessakuImage/MSFT_logo_png.png" alt="Microsoft" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="placeholder">
        <div class="homecontent">
            <p>
                <img src="../../Images/KessakuImage/kessaku.jpg" alt="Kessaku" />
            </p>
            <p class="kessaku">PIPE9</p>
            <p>Decoding Excellence</p>
        </div>
    </div>
    <div class="divider"></div>
    <!--Kessaku Cloud Solutions-->
    <div class="kcsbg">
        <div class="whitedroplet">
            <div class="placeholder">
                <h1>PIPE9 Cloud Solutions</h1>
                <h2>PIPE9 Cloud Solutions offer everything your business needs to identify, hire, develop, and retain top talent. </h2>
                <div class="fourcolumn">
                    <ul>
                        <li>
                            <div class="top" id="POECloudSoln">
                                <div class="icon poe"></div>
                                <p>Role Excellence Profiles</p>
                            </div>
                            <div class="middle">
                                <p>
                                    Our Cloud as Coach technology provides a way for companies to develop Role Excellence Profiles that capture patterns of past success and an understanding of what the best performers do differently and, through the Cloud, share this knowledge with everyone.
                                </p>
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="DownloadFiles(1)">
                                <p>
                                    Download
                  Role Excellence Profile
                                </p>
                                <div class="download"></div>
                            </div>
                        </li>
                        <li>
                            <div class="top" id="CloudSoln">
                                <div class="icon cac"></div>
                                <p>Cloud as Coach&reg; </p>
                            </div>
                            <div class="middle">
                                <p>
                                    Our unique Cloud as Coach technology, built on Role Excellence Profiles, enables a network of feedbackers to deliver meaningful guidance and recommendations on priority areas for talent development, turning managers into coaches to improve performance and win.
                                </p>
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="PreviewContactUs()">
                                <p>Request Demo</p>
                                <div class="demo"></div>
                            </div>
                        </li>
                        <li>
                            <div class="top" id="PerformCloudSoln">
                                <div class="icon pr"></div>
                                <p>Performance Reports </p>
                            </div>
                            <div class="middle">
                                <p>
                                    Our Cloud as Coach Performance Reports provide a picture of performance gaps, delivering personalized development roadmaps for individuals and for managers while identifying priority people investments that can have the biggest impact.
                                </p>
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="Redirectpages()">
                                <p>
                                    Download
                  Performance Report
                                </p>
                                <div class="download"></div>
                            </div>
                        </li>
                        <li>
                            <div class="top" id="CheckOutCloudSoln">
                                <div class="icon ct"></div>
                                <p>Coaching Toolbox </p>
                            </div>
                            <div class="middle">
                                <p>
                                    Our Cloud as Coach technology infuses the knowledge of what the best performers do differently into manager coaching guides, role handbooks, sales playbooks, hiring guides and onboarding kits. Accelerate execution and the time-to-value for new talent.
                                </p>
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="RedirectTempPages(2)">
                                <p>
                                    Check Out
                  Our Toolbox
                                </p>
                                <div class="demo"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!--End of CAC-->
    <!--Video-->
    <div class="videobg">
        <div class="whitedroplet">
            <div class="placeholder">
                <h1>Your Coach in the Cloud Storyboard </h1>
                <h2>PIPE9 is the Coach in the Cloud for you, your team and your entire company! </h2>
                <div class="videoscreen">
                    <div class="video" id="homevideo">
                        <%--<video controls autoplay poster='../images/loading3.gif'>
                            <source src="Video/bexcellentStoryboard.mp4" type="video/mp4">
                        </video>--%>
                        <img id="videoImg" src="../../Images/KessakuImage/video.jpg" alt="Video" />
                    </div>
                </div>
                <!--<div><p style="text-align: center; font-size:100%; padding: 10px 0; ">bexcellent.com is now Kessaku.com</p></div>-->
            </div>
        </div>
    </div>
    <!--End of Video-->
    <!--Cloud as Coach Capabilities-->
    <div class="caccbg">
        <div class="graydroplet">
            <div class="placeholder">
                <h1>Cloud as Coach&reg; Technologies </h1>
                <h2>Our unique Cloud as Coach Technology decodes what best performers do differently to everyone else and delivers guidance and recommendations to help accelerate execution and win.
                </h2>
                <div class="fourcolumn sixcolumn">
                    <ul>
                        <li class="">
                            <div class="top" id="POEcloudCoach">
                                <div class="icon poe"></div>
                                <p>Role Excellence Profiles</p>
                            </div>
                            <div class="middle">
                                <p>Our Cloud as Coach technology provides a way for companies to decode what best performers do differently, capturing the insight in Role Excellence Profiles that can be shared with everyone.</p>
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="RegisterRedirect()">
                                <p>
                                    <%--Download
                  Profiles of Excellence--%>
                                    Trial for Free
                                </p>
                                <div class="download"></div>
                            </div>
                        </li>
                        <li>
                            <div class="top" id="feedbackCloudCoach">
                                <div class="icon feedback"></div>
                                <p>Feedback</p>
                            </div>
                            <div class="middle">
                                <p>
                                    Our Cloud as Coach technology enables a network of feedbackers to deliver feedback of the kind that guides individuals to adopt behaviors that can have the biggest impact on their performance.
                                </p>
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="RegisterRedirect()">
                                <p>Trial for Free</p>
                                <div class="demo"></div>
                            </div>
                        </li>
                        <li>
                            <div class="top" id="StandingCloudCoach">
                                <div class="icon standingico"></div>
                                <p>Standing</p>
                            </div>
                            <div class="middle">
                                <p>
                                    With our Cloud as Coach technology everyone knows where they stand compared to the highest levels of performance. Managers receive guidance about ways to build the standing of individuals and the rest of the team.
                                </p>
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="RegisterRedirect()">
                                <p>
                                    Trial for Free
                                </p>
                                <div class="demo"></div>
                            </div>
                        </li>
                        <li>
                            <div class="top" id="ConnectCloudCaoch">
                                <div class="icon connect"></div>
                                <p>Connect</p>
                            </div>
                            <div class="middle">
                                <p>
                                    Our unique Cloud as Coach Connect capability identifies the best performers and enables individuals to establish mentoring relationships with the people that can help them achieve their best performance.
                                </p>
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom">
                                <p>
                                    Trial for Free
                                </p>
                                <div class="download" onclick="DownloadFiles(2)"></div>
                            </div>
                        </li>
                        <li>
                            <div class="top" id="goalCloudcoach">
                                <div class="icon goal"></div>
                                <p>Goals</p>
                            </div>
                            <div class="middle">
                                <p>
                                    Our Cloud as Coach technology brings everything together, enabling Goals to be set based on identified improvement areas and tracked automatically based on feedback from the network.
                                </p>
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="RegisterRedirect()">
                                <p>
                                    Trial for Free
                                </p>
                                <div class="demo"></div>
                            </div>
                        </li>
                        <li>
                            <div class="top" id="recognitionCloudCoach">
                                <div class="icon recognition"></div>
                                <p>Recognition</p>
                            </div>
                            <div class="middle">
                                <p>
                                    Our Cloud as Coach technology enables outstanding work to be recognized through the awarding of badges and recognition from peers, which motivates and builds the social profile of everyone.
                                </p>
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="RegisterRedirect()">
                                <p>
                                    Trial for Free
                                </p>
                                <div class="demo"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!--End of Cloud as Coach Capabilities-->
    <!--Client Success-->
    <div class="client">
        <div class="placeholder">
            <h1>Client Success</h1>
            <h2>For companies like Microsoft, PIPE9 Cloud Solutions closes their widening talent gap</h2>
        </div>
        <div class="mask">
            <ul class="images">
                <li>
                    <img src="../../Images/KessakuImage/clients/ms-office.jpg" alt="Microsoft office" />
                    <div class="text">
                        <h1>The work delivered an arsenal of insights that have taken us to the next level</h1>
                        <p>Pattie Grimm, Field Readiness Lead</p>
                    </div>
                </li>
                <li>
                    <img src="../../Images/KessakuImage/clients/western-computer.jpg" alt="Western Computer office" />
                    <div class="text">
                        <h1>The work was a great success, the comments from our CEO was nothing short of total excitement</h1>
                        <p>Linda Collins, VP Operations</p>
                    </div>
                </li>
                <li>
                    <img src="../../Images/KessakuImage/clients/axxon.jpg" alt="Axxon office" />
                    <div class="text">
                        <h1>The work exceeded our expectations helping us to shape a world-class Cloud business</h1>
                        <p>Francisco Nelson, Director</p>
                    </div>
                </li>
                <li>
                    <img src="../../Images/KessakuImage/clients/rock-solid.jpg" alt="Rock Solid office" />
                    <div class="text">
                        <h1>You made us think about the business. You helped us evaluate the work we need to do to improve</h1>
                        <p>Angel Prez, Vice President</p>
                    </div>
                </li>
                <li>
                    <img src="../../Images/KessakuImage/clients/ms-office.jpg" alt="Microsoft office" />
                    <div class="text">
                        <h1>The work delivered an arsenal of insights that have taken us to the next level</h1>
                        <p>Pattie Grimm, Field Readiness Lead</p>
                    </div>
                </li>
                <li>
                    <img src="../../Images/KessakuImage/clients/western-computer.jpg" alt="Western Computer office" />
                    <div class="text">
                        <h1>The work was a great success, the comments from our CEO was nothing short of total excitement</h1>
                        <p>Linda Collins, VP Operations</p>
                    </div>
                </li>
                <li>
                    <img src="../../Images/KessakuImage/clients/axxon.jpg" alt="Axxon office" />
                    <div class="text">
                        <h1>The work exceeded our expectations helping us to shape a world-class Cloud business</h1>
                        <p>Francisco Nelson, Director</p>
                    </div>
                </li>
                <li>
                    <img src="../../Images/KessakuImage/clients/rock-solid.jpg" alt="Rock Solid office" />
                    <div class="text">
                        <h1>You made us think about the business. You helped us evaluate the work we need to do to improve</h1>
                        <p>Angel Prez, Vice President</p>
                    </div>
                </li>
            </ul>
            <ul class="triggers">
                <li class="active">
                    <img src="../../Images/KessakuImage/clients/microsoft.png" alt="Microsoft" /></li>
                <li>
                    <img src="../../Images/KessakuImage/clients/western-computer.png" alt="Western Computer" /></li>
                <li>
                    <img src="../../Images/KessakuImage/clients/axxon.png" alt="AXXON" /></li>
                <li>
                    <img src="../../Images/KessakuImage/clients/rock-solid.png" alt="Rock Solid" /></li>
                <div class="clientthumnail">
                    <li class="activeclient"></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </div>
            </ul>
            <span class="control prev">Prev</span>
            <span class="control next">Next</span>
        </div>
    </div>
    <!--End of Client Success-->
    <!--Coaching toolkits-->
    <div class="toolkit">
        <div class="placeholder">
            <h1>Coaching Toolbox</h1>
            <h2>Our Coaching toolbox infuses the knowledge of what best performers do differently into artifacts that prime people for growth and accelerate the time to value for new talent.
            </h2>
        </div>

        <div class="placeholder">

            <div class="fourcolumn fivecolumn">
                <ul>
                    <li class="">
                        <div class="top">
                            <div class="icon rolex"></div>
                            <p>Hiring Guides</p>
                        </div>
                        <div class="middle">
                            <p>
                                Our Hiring Guides provide recruitment consultants and hiring managers with guidance to ensure the right candidates are targeted, the right questions are asked and a hiring process is adopted that ensures the very best talent is hired.
                            </p>
                        </div>
                        <div class="seperate"><span></span></div>
                        <div class="bottom">
                            <div class="more"></div>
                        </div>
                    </li>
                    <li>
                        <div class="top">
                            <div class="icon guides"></div>
                            <p>
                                On-Boarding Kits
                            </p>
                        </div>
                        <div class="middle">
                            <p>
                                Our Onboarding Kits provide new hires with an understanding of past patterns of success and the knowledge of what the best performers in role do differently to ensure the right behaviors are adopted to accelerate the time-to-value.
                            </p>
                        </div>
                        <div class="seperate"><span></span></div>
                        <div class="bottom">
                            <div class="more"></div>
                        </div>
                    </li>
                    <li>
                        <div class="top">
                            <div class="icon handbook"></div>
                            <p>
                                Role Handbooks
                            </p>
                        </div>
                        <div class="middle">
                            <p>
                                Our Role Handbooks deliver the guidance necessary to perform at the very highest levels of excellence. Our unique Road to Victory storyboards, Lessons from the Real World case studies and Profiles of Champions accelerates execution to win.
                            </p>
                        </div>
                        <div class="seperate"><span></span></div>
                        <div class="bottom">
                            <div class="more"></div>
                        </div>
                    </li>
                    <li>
                        <div class="top">
                            <div class="icon coachingguide"></div>
                            <p>
                                Coaching Guides
                            </p>
                        </div>
                        <div class="middle">
                            <p>
                                Our Coaching Guides deliver a method for ensuring coaching is consistent, helping managers focus on coaching and providing them with recommendations that have the biggest impact on improving performance.
                            </p>
                        </div>
                        <div class="seperate"><span></span></div>
                        <div class="bottom">
                            <div class="more"></div>
                        </div>
                    </li>
                    <li>
                        <div class="top">
                            <div class="icon playbook"></div>
                            <p>
                                Sales Playbooks
                            </p>
                        </div>
                        <div class="middle">
                            <p>
                                Our Sales Playbooks focus exclusively on delivering guidance to sales reps and sales managers. We decode the behaviors of the very best sales reps to understand what they do differently, leading to higher win rates and quota obtainment.
                            </p>
                        </div>
                        <div class="seperate"><span></span></div>
                        <div class="bottom">
                            <div class="more"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="contact" id="contactuspage">
        <div class="placeholder" id="hidDiv1">
            <h1>Contact Us</h1>
        </div>
        <div class="addressbar" id="hidDiv2">
            <div class="placeholder">
                <ul>
                    <li>
                        <h5>Address</h5>
                        <p>Pipe9 Consulting Inc.</p>
                        <p>19329 Skyridge Circle,</p>
                        <p>Boca Raton, Florida</p>
                        <p>33498</p>
                    </li>
                    <li>
                        <h5>Customer Service</h5>
                        <p>Phone:	+1-855-923-5556</p>
                        <p>Email: support@pipe9consulting.com</p>
                    </li>
                    <li>
                        <h5>Sales</h5>
                        <p>Phone:	+1-855-923-5556</p>
                        <p>Email: sales@pipe9consulting.com</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="contactform" id="hidDiv3">
            <div class="placeholder">
                <div class="txtbox">
                    <input type="text" placeholder="First Name" id="contactFirstName" />
                </div>
                <div class="txtbox right">
                    <input type="text" placeholder="Last Name" id="ContactLastName" />
                </div>
                <div class="txtbox">
                    <input type="text" placeholder="Email" id="ContactEmail" />
                </div>
                <div class="txtbox right">
                    <input type="text" placeholder="Company" id="ContactCompany" />
                </div>
                <div class="txtbox">
                    <input type="text" placeholder="Title" id="ContactTitle" />
                </div>
                <div class="txtbox right">
                    <input type="text" placeholder="Phone" id="ContactPhoneNumber" />
                </div>
                <div class="msgbx">
                    <textarea name="" cols="1" rows="5" placeholder="Message" id="ContactMessage"></textarea>
                </div>

                <div class="submit v-center">
                    <input type="button" id="submitContact" class="button" value="Submit" />
                </div>

                <div id="popup1" class="overlay">
                    <div class="popup">
                        <h2>Info box</h2>
                        <a class="close" href="#">&times;</a>
                        <div class="content">
                            <p>This is done totally without JavaScript. Just HTML and CSS.</p>
                        </div>
                    </div>
                </div>

                <div class="error ContError" id="ContactError">
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="placeholder">
                <ul class="left">
                    <li><a href="../SignUp/terms" target="_blank">Terms</a></li>
                    <li><a href="../SignUp/privacy" target="_blank">Privacy</a></li>
                    <li><a>FAQ</a></li>
                    <li><a>Support</a></li>
                </ul>
                <ul class="right">
                    <li id="footerMenu"><a>
                        <img src="../../Images/KessakuImage/menu.png" alt="Menu" /></a>
                        <ul id="target">
                            <li data-value="homeAct"><a href="../Home"><span class="footermenu7"></span>
                                <p>Home</p>
                            </a></li>
                            <li data-value="cloudasHdr"><a href="../CloudAsCoach"><span class="footermenu1"></span>
                                <p>Cloud as Coach</p>
                            </a></li>
                            <li data-value="cloudSolnHdr"><a href="../CloudSolutions"><span class="footermenu2"></span>
                                <p>Cloud Solutions</p>
                            </a></li>
                            <li data-value="ResourcesHdr"><a href="../Resources"><span class="footermenu3"></span>
                                <p>Resources</p>
                            </a></li>
                            <li data-value="pricingHdr"><a href="../Pricing"><span class="footermenu4"></span>
                                <p>Pricing</p>
                            </a></li>
                            <li data-value="reqDemoHdr"><a href="../RequestDemo"><span class="footermenu5"></span>
                                <p>Request a Demo</p>
                            </a></li>
                            <li data-value=""><a href="../Home/Login"><span class="footermenu6"></span>
                                <p>Members</p>
                            </a></li>
                        </ul>
                    </li>
                    <li>© 2014 PIPE9</li>
                    <li><a>Contact us</a></li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>
