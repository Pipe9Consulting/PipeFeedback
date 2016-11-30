<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/KessakuHome.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="KessakuHomehead" runat="server">
    <link rel="shortcut icon" href="../../Images/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="../../Images/favicon.ico" type="image/x-icon" />
    <script type="text/javascript">
        $(document).ready(function () {
            //$('#videoImg').click(function () {
            //    $('#homevideo').html("<video id='videoplay' controls autoplay> <source src='Video/bexcellentStoryboard.mp4' type='video/mp4'> </video>");
            //});

        });

        function Redirectpages() {
            window.location.href = "../Resources";
        }
        function RedirectTempPages() {
            window.location.href = "../CloudSolutions";
        }
    </script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="kessakuHomeContent" runat="server">
    <%--<div class="headerbdr"></div>--%>
    <div class="homebg">
        <div class="midbar">
            <div class="placeholder">
                <p>
                    Transforming all your people to be as<br />
                    good as your best
                </p>
            </div>
            <div class="signupholder">
                <div class="signupcontent">
                    <p><span>PIPE9 Coach</span> accelerates execution by amplifying what high performers do differently</p>
                    <%--      <div class="txtbx">
                        <input type="text" placeholder="enter your email address" id="emailid" />
                    </div>
                    <div class="signup">
                        <input type="button" value="Trial for Free" id="signupbtn" />
                    </div>--%>
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
                <img src="../../Images/KessakuImage/pipe9_logo.png" alt="Kessaku" />
            </p>
            <p class="kessaku">Decode Amplify Act </p>
        </div>
    </div>
    <div class="divider"></div>
    <!--Kessaku Cloud Solutions-->
    <div class="kcsbg">
        <div class="whitedroplet">
            <div class="placeholder">
                <h1>PIPE9 Solutions</h1>
                <%--<h2>Kessaku Cloud Solutions offer everything your business needs to identify, hire, develop, and retain top talent. </h2>--%>
                <div class="fourcolumn">
                    <ul>
                        <li>
                            <div class="top" id="POECloudSoln">
                                <div class="icon poe"></div>
                                <p>Profiles of Excellence</p>
                            </div>
                            <div class="middle">
                                <p>
                                    Profiles of Excellence is the standard for role excellence. By decoding what high performers do differently, the key practices, actions, and indicators that exemplify excellence in role can be defined and amplified across your company.
                                </p>
                            </div>
                            <%--   <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="DownloadFiles(1)">
                                <p>Download Role Excellence Profiles</p>
                                <div class="download"></div>
                            </div>--%>
                        </li>
                        <li>
                            <div class="top" id="CloudSoln">
                                <div class="icon cac"></div>
                                <p>PIPE9 Coach </p>
                            </div>
                            <div class="middle">
                                <p>
                                    PIPE9 Coach Technology brings Role Excellence Profiles to life in the Cloud. Align individuals, teams or your entire company to a standard of excellence to ensure role clarity, accelerates development, and enhances execution.
                                </p>
                            </div>
                            <%--         <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="PreviewContactUs()">
                                <p>Request a Demo</p>
                                <div class="demo"></div>
                            </div>--%>
                        </li>
                        <li>
                            <div class="top" id="PerformCloudSoln">
                                <div class="icon pr"></div>
                                <p>Action Reports</p>
                            </div>
                            <div class="middle">
                                <p>
                                    PIPE9 Coach Action Reports deliver personalized development roadmaps, identifying development priorities, opportunities, and trends, while providing the insights needed to make smart people investments with the biggest impact.
                                </p>
                            </div>
                            <%--        <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="Redirectpages()">
                                <p>Learn More</p>
                                <div class="more"></div>
                            </div>--%>
                        </li>
                        <li>
                            <div class="top" id="CheckOutCloudSoln">
                                <div class="icon ct"></div>
                                <p>Coaching Toolbox</p>
                            </div>
                            <div class="middle">
                                <p>
                                    Accelerate development and time-to-value for new talent with the Coaching Toolbox. Hiring guides, onboarding kits, role handbooks, sales playbooks, coaching guides…all infused with the knowledge and insights discovered by decoding what high performers do differently.
                                </p>
                            </div>
                            <%--            <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="RedirectTempPages(2)">
                                <p>Learn More</p>
                                <div class="more"></div>
                            </div>--%>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!--End of CAC-->
    <!--Video-->
    <%--<div class="videobg">
        <div class="whitedroplet">
            <div class="placeholder">
                <h1>Your Coach in the Cloud Storyboard </h1>
                <h2>Cloud as Coach is the Coach in the Cloud for you, your team and your entire company! </h2>
                <div class="videoscreen">
                    <div class="video" id="homevideo">
                        <%--<video controls autoplay poster='../images/loading3.gif'>
                            <source src="Video/bexcellentStoryboard.mp4" type="video/mp4">
                        </video>--%>
    <%--<img id="videoImg" src="../../Images/KessakuImage/video.jpg" alt="Video" />
                    </div>
                </div>--%>
    <!--<div><p style="text-align: center; font-size:100%; padding: 10px 0; ">bexcellent.com is now Kessaku.com</p></div>-->
    <%-- </div>
        </div>
    </div>--%>
    <!--End of Video-->
    <!--Cloud as Coach Capabilities-->
    <div class="caccbg">
        <div class="graydroplet">
            <div class="placeholder">
                <h1>PIPE9 Coach&reg;</h1>
                <h2>Our unique PIPE9 Coach Technology aligns individuals, teams, and entire companies with a standard of role excellence and delivers guidance and recommendations to accelerate development.</h2>
                <div class="fourcolumn sixcolumn">
                    <ul>
                        <li class="">
                            <div class="top" id="POEcloudCoach">
                                <div class="icon poe"></div>
                                <p>Profiles of Excellence</p>
                            </div>
                            <div class="middle">
                                <p>PIPE9 Coach brings Profiles of Excellence to life in the Cloud. Profiles of Excellence is the foundations for our unique PIPE9 Coach capabilities. </p>
                            </div>
                            <%-- <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="RegisterRedirect()">
                                <p>
                                    <%--Download
                  Profiles of Excellence
                                    Trial for Free--%>
                            <%-- </p>
                                <div class="download"></div>
                            </div>--%>
                        </li>
                        <li>
                            <div class="top" id="feedbackCloudCoach">
                                <div class="icon feedback"></div>
                                <p>Feedback</p>
                            </div>
                            <div class="middle">
                                <p>PIPE9 Coach enables networks of feedbackers to deliver feedback that guides individuals to adopt behaviors that can have the biggest impact on their performance.</p>
                            </div>
                            <%--   <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="RegisterRedirect()">
                                <p>Trial for Free</p>
                                <div class="demo"></div>
                            </div>--%>
                        </li>
                        <li>
                            <div class="top" id="StandingCloudCoach">
                                <div class="icon standingico"></div>
                                <p>Sync</p>
                            </div>
                            <div class="middle">
                                <p>PIPE9 Coach helps individuals plan their development path by giving them a clear view of where their development priorities lie, while giving managers the view of their team they need to make smart coaching decisions.</p>
                            </div>
                            <%--    <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="RegisterRedirect()">
                                <p>
                                    Trial for Free
                                </p>
                                <div class="demo"></div>
                            </div>--%>
                        </li>
                        <%--<li>
                            <div class="top" id="ConnectCloudCaoch">
                                <div class="icon connect"></div>
                                <p>Connect</p>
                            </div>
                            <div class="middle">
                                <p>PIPE9 Coach makes forming mentoring relationships easier than ever by connecting people together based on the development priorities identified through feedback from their network.                          </p>
                            </div>--%>
                        <%--     <div class="seperate"><span></span></div>
                            <div class="bottom">
                                <p>
                                    Trial for Free
                                </p>
                                <div class="download" onclick="DownloadFiles(2)"></div>
                            </div>
                        </li>--%>
                        <li>
                            <div class="top" id="goalCloudcoach">
                                <div class="icon goal"></div>
                                <p>Development Priorities</p>
                            </div>
                            <div class="middle">
                                <p>
                                    PIPE9 Coach allows individual and managers set and track development goals that focus on their unique development priorities and opportunities.
                                </p>
                            </div>
                            <%--        <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="RegisterRedirect()">
                                <p>
                                    Trial for Free
                                </p>
                                <div class="demo"></div>
                            </div>--%>
                        </li>
                        <li>
                            <div class="top" id="recognitionCloudCoach">
                                <div class="icon recognition"></div>
                                <p>Recognition</p>
                            </div>
                            <div class="middle">
                                <p>
                                    PIPE9 Coach enables the sharing of medals and badges that creates a motivating and engaging development environment and reinforces the actions and behaviors that exemplify excellence in role.
                                </p>
                            </div>
                            <%--       <div class="seperate"><span></span></div>
                            <div class="bottom" onclick="RegisterRedirect()">
                                <p>
                                    Trial for Free
                                </p>
                                <div class="demo"></div>
                            </div>--%>
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
            <h2>For companies like Microsoft, PIPE9 Coach Cloud Solutions closes their widening talent gap</h2>
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
            <h2>Our Coaching toolbox infuses the knowledge and insights gathered by decoding what top performers do differently into artifacts that prime people for growth and accelerate the time-to-value for new talent.
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
                                Our Hiring Guides provide recruitment consultants and hiring managers with guidance to ensure the right candidates are targeted, the right questions are asked, and a hiring process is adopted that ensures the very best talent is hired.
                            </p>
                        </div>
                        <%-- <div class="seperate"><span></span></div>
                        <div class="bottom">
                            <div class="more"></div>
                        </div>--%>
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
                                Our Onboarding Kits provide new hires with an understanding of past patterns of success and the knowledge of what high performers in role do differently to ensure the right behaviors are adopted to accelerate time-to-value.
                            </p>
                        </div>
                        <%--  <div class="seperate"><span></span></div>
                        <div class="bottom">
                            <div class="more"></div>
                        </div>--%>
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
                                Our Role Handbooks deliver the guidance necessary for teams to perform at the very highest levels of excellence. Our unique Storyboards, Lessons from the Real World case studies, and Profiles of Champions accelerate execution to win.
                            </p>
                        </div>
                        <%--  <div class="seperate"><span></span></div>
                        <div class="bottom">
                            <div class="more"></div>
                        </div>--%>
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
                                Our Coaching Guides deliver a hypothesis of role excellence, helping managers focus on coaching the behaviors that can have the biggest impact on improving performance.
                            </p>
                        </div>
                        <%--   <div class="seperate"><span></span></div>
                        <div class="bottom">
                            <div class="more"></div>
                        </div>--%>
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
                                Our Sales Playbooks focus exclusively on delivering the necessary sales execution guidance to help sellers adopt the selling practices and behaviors that have the biggest impact on their ability to retire sales quota.
                            </p>
                        </div>
                        <%--  <div class="seperate"><span></span></div>
                        <div class="bottom">
                            <div class="more"></div>
                        </div>--%>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!--End of Coaching toolkits-->
    <!--Contact Us-->
    <%-- <div class="contact">
        <div class="placeholder">
            <h1>Contact Us</h1>
        </div>
        <div class="addressbar">
            <div class="placeholder">
                <ul>
                    <li>
                        <h5>Address</h5>
                        <p>Kessaku</p>
                        <p>56695 Insagittis </p>
                        <p>metus eget </p>
                        <p>vulputate, 453696</p>
                    </li>
                    <li>
                        <h5>Customer Service</h5>
                        <p>Phone:	+1-359-153-6685</p>
                        <p>Email: support@kessaku.com</p>
                    </li>
                    <li>
                        <h5>Sales</h5>
                        <p>Phone:	+1-456-752-1235</p>
                        <p>Email: sales@kessaku.com</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="contactform">
            <div class="placeholder">
                <div class="txtbox">
                    <input type="" placeholder="First Name" />
                </div>
                <div class="txtbox right">
                    <input type="" placeholder="Last Name" />
                </div>
                <div class="txtbox">
                    <input type="" placeholder="Email" />
                </div>
                <div class="txtbox right">
                    <input type="" placeholder="Company" />
                </div>
                <div class="txtbox">
                    <input type="" placeholder="Title" />
                </div>
                <div class="txtbox right">
                    <input type="" placeholder="Phone" />
                </div>
                <div class="msgbx">
                    <textarea name="" cols="1" rows="5" placeholder="Message"></textarea>
                </div>
                <div class="submit">Submit</div>
            </div>
        </div>
    </div>--%>
    <%--  <script src="../../Scripts/KessakuScript/jquery.jplayer.js"></script>--%>
    <script src="../../Scripts/KessakuScript/Home.js"></script>
</asp:Content>
