<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/KessakuHome.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content2" ContentPlaceHolderID="KessakuHomehead" runat="server">
    <link href="../../Styles/KessakuStyles/resource.css" rel="stylesheet" />
    <script src="../../Scripts/KessakuScript/Resources.js"></script>
    <style>
        .fivecolumn li {
            width: 25% !important;
        }

            .fivecolumn li:first-child {
                margin-left: 24% !important;
            }
    </style>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="KessakuHomeContent" runat="server">
    <div class="resourceContainer">
        <div class="resourcehomebg">
            <div class="cloud_midbar">
                <div class="placeholder">
                    <div class="resourceArea">
                        <!-- <div class="resourceIcon">
                            <img src="../../images/KessakuImage/icons/resources-Icon.png" alt="cloud-as-coach-home-icon" title="cloud-as-coach-home-icon" />
                        </div>
                        <div class="resourcecoach">PIPE9 Resources</div>
                        <div class="resourcecoachsub">Explore, learn and see for yourself! </div>-->
                        <h1>PIPE9 Coach Resources</h1>
                        <h2>Explore, learn and see for yourself!</h2>
                    </div>

                    <!-- Four Column Start here -->
                    <div class="fourcolumn fivecolumn">
                        <ul>
                            <%--<li class="">
                                <div class="top" onclick="RedirectPoeLibrary()">
                                    <div class="icon resource-POE"></div>
                                    <p>
                                        Role Excellence Library 
                                    </p>
                                </div>
                                <div class="resourcemiddle">
                                    <p>Browse our Role Excellence Profile Library. Here you will find our downloadable public profiles. Pick and REP and begin your free trial today!</p>
                                </div>
                                <div class="seperate"><span></span></div>
                                <div class="bottom">
                                    <p>Explore the Role Excellence Profile</p>
                                    <div class="demo"></div>
                                </div>
                            </li>
                            <li id="RedirectEvent">
                                <div class="top">
                                    <div class="icon resource-events"></div>
                                    <p>Events</p>
                                </div>
                                <div class="resourcemiddle">
                                    <p>Begin your journey to excellence by registering for one of our weekly Webinars.</p>
                                </div>
                                <div class="seperate"><span></span></div>
                                <div class="bottom">
                                    <p>Register for a Webinar</p>
                                    <div class="download"></div>
                                </div>
                            </li>--%>
                            <li id="redirectVideo">
                                <div class="top">
                                    <div class="icon resource-videos"></div>
                                    <p>Videos</p>
                                </div>
                                <div class="resourcemiddle">
                                    <p>Here you can find a variety of videos, including our PIPE9 Storyboard, interviews with clients and thought leaders, as more.</p>
                                </div>
                                <div class="seperate"><span></span></div>
                                <div class="bottom">
                                    <p>Watch our videos</p>
                                    <div class="demo"></div>
                                </div>
                            </li>
                            <%--           <li id="resourceDownload">
                                <div class="top">
                                    <div class="icon resource-download"></div>
                                    <p>Downloads</p>
                                </div>
                                <div class="resourcemiddle">
                                    <p>Download a variety of content, including sample Performance Reports, White Papers, Toolkit examples, and more.</p>
                                </div>
                                <div class="seperate"><span></span></div>
                                <div class="bottom">
                                    <p>Checkout Our Downloadable Content</p>
                                    <div class="download"></div>
                                </div>
                            </li>--%>
                            <li>
                                <div class="top">
                                    <a href="http://alandowzall.com/" target="_blank">
                                        <div class="icon blog"></div>
                                        <p>Blog</p>
                                    </a>
                                </div>
                                <div class="resourcemiddle">
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore</p>
                                </div>
                                <div class="seperate"><span></span></div>
                                <div class="bottom">
                                    <a href="http://alandowzall.com/" target="_blank">
                                        <p>Checkout Our Blog</p>
                                        <div class="more"></div>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
