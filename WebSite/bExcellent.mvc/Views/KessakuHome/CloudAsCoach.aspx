<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/KessakuHome.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content2" ContentPlaceHolderID="KessakuHomehead" runat="server">
    <link href="../../Styles/KessakuStyles/cloudasCoach.css" rel="stylesheet" />
    <link href="../../Styles/KessakuStyles/icons.css" rel="stylesheet" />
    <script src="../../Scripts/KessakuScript/CloudAsCoach.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#pf').click(function () {
                $('#ProfileOfExcellence').css('padding-top', '100' +
                    'px');
                $('#Feedback').css('margin-top', '-100px');

            });
        });
    </script>
    <%--<h2>CloudAsCoach</h2>--%>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="kessakuHomeContent" runat="server">
    <%-- <div class="headerbdr"></div>--%>
    <!-- Cloud as Coach Home Start here -->
    <div class="cloudascoachContainer" id="CloudAsCoachHome">
        <div class="cloudascoachhomebg">
            <div class="cloud_midbar">
                <div class="placeholder">
                    <div class="cloudcoachArea">
                        <!--<div class="cloudIcon">
                            <img src="../../images/KessakuImage/icons/cloud-as-coach-home-icon.png" alt="cloud-as-coach-home-icon" title="cloud-as-coach-home-icon" />
                        </div>
                        <div class="cloudcoach">Your Coach in the Cloud</div>-->
                        <div class="cloudandCoachbg">
                            <h1>Your Coach in the Cloud</h1>
                        </div>
                        <div class="coachTiles">
                            <ul>
                                <li class="coach-First">
                                    <div class="top">
                                        <div class="icon incComplexity"></div>
                                        <p>Increased Buyer Complexity</p>
                                    </div>
                                </li>
                                <li class="coach-Second">
                                    <div class="top">
                                        <div class="icon growingTalentGaps"></div>
                                        <p>
                                            Manager
Deal Focus
                                        </p>
                                    </div>
                                </li>
                                <li class="coach-Third">
                                    <div class="top">
                                        <div class="icon coaching"></div>
                                        <p>Widening Talent Gap</p>
                                    </div>
                                </li>
                                <li class="coach-Fourth">
                                    <div class="top">
                                        <div class="icon dataTools"></div>
                                        <p>
                                            Who’s Coaching?
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="cloudAsCoachText">
                        <h1>Who is doing the Coaching?</h1>
                        <p>
                            To succeed in an increasingly complex and consensus-driven buying environment, managers must focus on identifying, managing, and closing deals. Because of this shift in focus, individual coaching is dropping to the bottom of the priority list, leaving individuals feeling uncertain, isolated, or even ignored. The result is a growing talent gap between high performers and those in need of coaching and development. Cloud as Coach closes the gap by aligning individuals, teams and entire companies with a standard of role excellence, identifying key development priorities, and empowering individuals to take control of the development journey. 
                        </p>

                        <%--<p>
                            It’s the Coach in the Cloud!  
                        </p>--%>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Cloud as Coach Home End here -->
    <div class="divider2"></div>
    <!--Cloud as Coach Capabilities-->
    <div class="capability" id="Capbiltiy">
        <div class="graydroplet">
            <div class="placeholder">
                <h1>PIPE9 Coach&reg;</h1>
                <h2>Making all Your People as good as Your Best
                </h2>
                <div class="capselectarea">

                    <div class="poemask"></div>
                    <div class="fbmask"></div>
                    <div class="stndmask"></div>
                    <div class="connmask"></div>
                    <div class="goalmask"></div>
                    <div class="recmask"></div>

                </div>
                <%--<div class="fourcolumn sixcolumn">
                    <ul>
                        <li class="" id="pf">
                            <a href="#ProfileOfExcellence">
                                <div class="toped">
                                    <div class="icon poe"></div>
                                    <p>Profiles of Excellence</p>
                                </div>
                            </a>

                            <div class="coachTilesBox">

                                <div class="Coachbottom">
                                      <div class="seperate"><span></span></div>
                                    <p>
                                        Download
								  Profiles of Excellence
                                    </p>
                                    <div class="download" onclick="DownloadFiles(1)"></div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <a href="#Feedback">
                                <div class="top">
                                    <div class="icon feedback"></div>
                                    <p>Feedback</p>
                                </div>
                            </a>
                            <div class="coachTilesBox">
                                <div class="Coachbottom">
                                     <div class="seperate"><span></span></div>
                                    <p>Request Demo</p>
                                    <div class="download" onclick="PreviewContactUs()"></div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div class="top">
                                <div class="icon connect"></div>
                                <p>Smart Connect</p>
                            </div>
                            <div class="coachTilesBox">
                                <div class="Coachbottom">
                                     <div class="seperate"><span></span></div>
                                    <p>Request Demo</p>
                                    <div class="demo" onclick="PreviewContactUs()"></div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="top">
                                <div class="icon goal"></div>
                                <p>Goals</p>
                            </div>
                            <div class="coachTilesBox">
                                <div class="Coachbottom">
                                     <div class="seperate"><span></span></div>
                                    <p>Request Demo</p>
                                    <div class="demo" onclick="PreviewContactUs()"></div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="top">
                                <div class="icon recognition"></div>
                                <p>Recognition</p>
                            </div>
                            <div class="coachTilesBox">
                                <div class="Coachbottom">
                                     <div class="seperate"><span></span></div>
                                    <p>Request Demo</p>
                                    <div class="demo" onclick="PreviewContactUs()"></div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="top">
                                <div class="icon analytics"></div>
                                <p>Analytics</p>
                            </div>

                            <div class="coachTilesBox">
                                <div class="Coachbottom">
                                     <div class="seperate"><span></span></div>
                                    <p>Download Analytics Report</p>
                                    <div class="download" onclick="DownloadFiles(3)"></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>--%>
            </div>
        </div>
    </div>
    <!--End of Cloud as Coach Capabilities-->
    <!-- Cloud - Profile of Excellence -->
    <div class="cloud-POE " id="CloudasPoe">
        <div class="placeholder">
            <div class="cloudCol">
                <ul>
                    <li>
                        <div class="cloudHead">
                            <div class="icon cloud-poe"></div>
                        </div>
                        <div class="name">Profiles of Excellence</div>
                        <div class="subname">
                            The standard for what it is to be excellent
                        </div>
                        <div class="learnmore"><a>Learn More</a></div>
                    </li>
                    <li>
                        <div class="CloudRight">
                            <div class="cont">
                                <h1>Decoding What High Performers Do Differently</h1>
                                <p>
                                    Profiles of Excellence are built based on a single hypothesis: If the outcomes and actions of high performers are decoded, then a standard for role excellence
                                    can be defined that will enable others to become high performers too. Profiles of Excellence define the standard for role excellence. By decoding what 
                                    high performers do differently to achieve success in role, the key practices, actions, and indicators that exemplify excellence can be defined and amplified.
                                    The profile provides individuals with a clear picture of what “excellent” looks like and enables managers to make smart coaching decisions by focusing on the 
                                    development of specific actions that have been proven to drive success.
                                </p>

                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Cloud - Profile of Excellence -->

    <!-- Feedbacks Start here -->
    <div class="caccbgNew" id="Feedback">

        <div class="placeholder">
            <div class="cloudCol">
                <ul>
                    <li>
                        <div class="cloudHead">
                            <div class="icon cloud-feedback"></div>
                        </div>
                        <div class="grayname">Feedback</div>
                        <div class="graysubname">
                            Unlock the power of a network of feedbackers
                        </div>
                        <div class="learnmore"><a>Learn More</a></div>
                    </li>
                    <li>
                        <div class="CloudRight">
                            <div class="cont">
                                <h1>The Power of Feedback
                                </h1>
                                <p>
                                    Feedback brings Library of Profiles to life. The driving force behind achieving excellence is the feedback you receive from the people you work with everyday.
                                    Managers, peers and even customers can be added to your network and provide feedback. But not just any feedback. PIPE9 Coach provides a unique and simple way 
                                    to receive feedback from your network based the specific actions defined by the Library of Profile. Your network delivers the consistent, meaningful feedback
                                    you need to begin your development journey and continue on the path to excellence. 

                                </p>

                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Feedbacks End here -->
    <!-- Cloud - Analytics start here -->
    <div class="cloud-Recognition" id="standingPage">

        <div class="placeholder">
            <div class="cloudCol">
                <ul>
                    <li>
                        <div class="cloudHead selected">
                            <div class="icon standingico analyticsRight"></div>
                        </div>
                        <div class="grayname">Sync</div>
                        <div class="graysubname">
                            Plan the path to excellence 

                        </div>
                        <div class="learnmore"><a>Learn More</a></div>
                    </li>
                    <li>
                        <div class="CloudRight">
                            <div class="cont">
                                <h1>The Beginning of the Journey
                                </h1>
                                <p>
                                    PIPE9 Coach identifies your unique development priorities and opportunities by analyzing the feedback received from your network. This give individuals the information
                                    they need to map out their path to achieving excellence in role. Meanwhile, managers get a clear view of their team landscape, enabling them to have more focused,
                                    meaningful, and impactful coaching conversations and make smarter people investment.

                                </p>
                                <h1>PIPE9 Coach at Microsoft
                                </h1>
                                <p class="lastPara">
                                    Microsoft uses PIPE9 Coach to align their role communities with a standard of excellence, ensure role clarity, and help get their people and teams to the next level.
                                </p>
                                <p class="italicTxt">
                                    “The work delivered an arsenal of insights that have taken us to the next level"
                                </p>
                                <p>&ndash;Pattie Grimm, Field Readiness Lead, Microsoft</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Cloud - Analytics end here -->
    <!-- Cloud - Smart Connect -->
    <%--    <div class="caccbgNew" id="Smart-Connect">
        <div class="placeholder">
            <div class="cloudCol">
                <ul>
                    <li>
                        <div class="cloudHead">
                            <div class="icon cloud-connect"></div>
                        </div>
                        <div class="grayname">Connect</div>
                        <div class="graysubname">
                            Shift performance by connecting people with high performers

                        </div>
                        <div class="learnmore"><a>Learn More</a></div>
                    </li>
                    <li>
                        <div class="CloudRight">

                            <div class="cont">
                                <h1>Making the Right Connection</h1>
                                <p class="lastPara">
                                    Cloud as Coach identifies high performers and connects them with others based on specific development needs. This enables individuals to learn new ways of achieving success in role. With Cloud as Coach, mentoring relationships can form that otherwise may have never begun, and these connections are made automatically. Connect provides another way for high performance to be amplified to everyone.

                                </p>

                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>--%>
    <!-- Cloud - Smart Connect -->

    <!-- Cloud Goals Start here -->
    <div class="cloud-SmartConnect" id="Goals">

        <div class="placeholder">
            <div class="cloudCol">
                <ul>
                    <li>
                        <div class="cloudHead">
                            <div class="icon cloud-goal"></div>
                        </div>
                        <div class="grayname">
                            Development Priorities
                        </div>
                        <div class="graysubname">
                            Set goals and let PIPE9 Coach track progress
                        </div>
                        <div class="learnmore"><a>Learn More</a></div>
                    </li>
                    <li>
                        <div class="CloudRight">

                            <div class="cont">
                                <h1>Set Dynamic Goals
                                </h1>
                                <p class="lastPara">
                                    Set goals based areas for development identified from feedback. Once set, PIPE9 Coach tracks progress automatically. Continuous feedback delivers the insights necessary
                                    to track which goals are on track and which goals require focus. Sharing goals with others in your network to encourage a collaborative development environment and enables
                                    managers to stay in touch with progress and coach on ways to improve.

                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Cloud Goals Start here -->

    <!-- Cloud - Recognition -->
    <div class="caccbgNew" id="Recognition">
        <div class="placeholder">
            <div class="cloudCol">
                <ul>
                    <li>
                        <div class="cloudHead">
                            <div class="icon cloud-recognition iconRight"></div>
                        </div>
                        <div class="grayname">Recognition</div>
                        <div class="graysubname">
                            “High-five” teammates and peers located anywhere

                        </div>
                        <div class="learnmore"><a>Learn More</a></div>
                    </li>
                    <li>
                        <div class="CloudRight">
                            <div class="cont">
                                <h1>Recognize to Motivate
                                </h1>
                                <p class="lastPara">
                                    Recognize a job well done with a “high-five” in the Cloud. Managers and peers can recognize accomplishments, successes, or the attainment of goals with a medal or badge 
                                    and a message of congratulations that can be shared with the whole team. Don’t let geography prevent excellence from being appreciated and reinforced. 

                                </p>

                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Cloud - Recognition -->

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
                    <input type="" value="First Name" />
                </div>
                <div class="txtbox right">
                    <input type="" value="Last Name" />
                </div>
                <div class="txtbox">
                    <input type="" value="Email" />
                </div>
                <div class="txtbox right">
                    <input type="" value="Company" />
                </div>
                <div class="txtbox">
                    <input type="" value="Title" />
                </div>
                <div class="txtbox right">
                    <input type="" value="Phone" />
                </div>
                <div class="msgbx">
                    <textarea name="" cols="1" rows="5">Message</textarea>
                </div>
                <div class="submit">Submit</div>
            </div>
        </div>
    </div>--%>
</asp:Content>
