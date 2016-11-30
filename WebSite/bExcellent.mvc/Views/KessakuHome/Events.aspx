<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/KessakuHome.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content2" ContentPlaceHolderID="KessakuHomehead" runat="server">
    <link href="../../Styles/KessakuStyles/events.css" rel="stylesheet" />
    <script src="../../Scripts/KessakuScript/Resources.js"></script>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="KessakuHomeContent" runat="server">
    <div class="caccbg">
        <div class="graydroplet">
            <div class="placeholder">
                <h1>PIPE9 Events<img src="../../images/kessakuimage/eventbrite.png" alt="eventbrite" class="eventbrite" /></h1>
                <div class="events">
                    <ul>
                        <li>
                            <div class="day">
                                <p>
                                    <span>Every Friday - 1:00pm ET</span>
                                </p>
                            </div>
                            <div class="eventsdetails">
                                <h3>Introducing PIPE9: Get Started for Free</h3>
                                <p>Each week we put on a webinar to walk you through our PIPE9 Cloud Solutions. Learn about Role Excellence Profiles, Cloud as Coach Technology, Performance Reports, and Coaching Toolkits.</p>
                                <p class="type">
                                    Type: Webinar Location: Webinar</<br />
                                    <div class="register reg">Click here to register</div>
                            </div>
                        </li>
                        <li>
                            <div class="day">
                                <p>
                                    <span>Every Friday - 4:00pm ET</span>
                                </p>
                            </div>
                            <div class="eventsdetails">
                                <h3>Cloud as Coach: See Our Cloud Technology in Action!</h3>
                                <p>Our unique Cloud as Coach Technology decodes what best performers do differently to everyone else and delivers guidance and recommendations to help accelerate execution and win. See our cloud-based platform in action!</p>
                                <p class="type">
                                    Type: Webinar Location: Webinar</<br />
                                    <div class="register reg1">Click here to register</div>
                            </div>
                        </li>
                        <li class="last">
                            <div class="day">
                                <p>
                                    <span>Not currently running</span>
                                </p>
                            </div>
                            <div class="eventsdetails">
                                <h3>PIPE9 Performance Reports: From Data to Development</h3>
                                <p>Our Cloud as Coach Performance Reports provide a picture of performance gaps, delivering personalized development roadmaps for individuals and for managers, identifying priority people investments that can have the biggest impact. </p>
                                <p class="type">
                                    Type: Webinar Location: Webinar</<br />
                                    <div class="register reg2">Click here to register</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</asp:Content>