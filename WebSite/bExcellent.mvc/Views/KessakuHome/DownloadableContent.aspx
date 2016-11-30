<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/KessakuHome.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content2" ContentPlaceHolderID="KessakuHomehead" runat="server">
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="KessakuHomeContent" runat="server">
    <link href="../../Styles/KessakuStyles/download.css" rel="stylesheet" />
    <script src="../../Scripts/KessakuScript/DownloaddableCont.js"></script>
    <div class="downloadbg">
        <div class="graydroplet">
            <div class="placeholder">
                <h1>Downloadable Content</h1>
                <div class="fourcolumn">
                    <ul>
                        <li>
                            <div class="top" style="cursor: auto !important;">
                                <img src="../../images/KessakuImage/germany-argentina.jpg" alt="No" title="No" />
                            </div>
                            <div class="middle">
                                <p>Is your team like Germany or Argentina</p>
                                <p>Type: White Paper</p>
                                <p>Published Date: 07/17/2014</p>
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom" data-poe="6">
                                <p>Download</p>
                                <div class="download" id="gerargDwnld"></div>
                            </div>
                        </li>
                        <li>
                            <div class="top" style="cursor: auto !important;">
                                <img src="../../images/KessakuImage/ASTD-webcast.jpg" alt="ASTD Webcast" title="ASTD Webcast" />
                            </div>
                            <div class="middle">
                                <p>ASTD 'Cloud as Coach' webcast by Alan Dowzall</p>
                                <p>Type: Presentation</p>
                                <p>Published Date: 6/26/2014</p>
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom" id="dwnldPPT">
                                <p>Download</p>
                                <div class="download"></div>
                            </div>
                        </li>

                        <li>
                            <div class="top" style="cursor: auto !important;">
                                <img src="../../images/KessakuImage/challenger-seller.jpg" alt="Challenger Seller" title="Challenger Seller" />
                            </div>
                            <div class="middle">
                                <p>Challenger Selling</p>
                                <p>Type: Role Excellence Profile</p>
                                <p>Published Date: 07/09/2014</p>
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom dwnldpoe" data-poe="3">
                                <p>Download</p>
                                <div class="download" id="Div1"></div>
                            </div>
                        </li>

                        <li style="margin-right: 0;">
                            <div class="top" style="cursor: auto !important;">
                                <img src="../../images/KessakuImage/leader.png" alt="Leaders Make the Future" title="Leaders Make the Future" />
                            </div>
                            <div class="middle">
                                <p>Leaders Make the Future</p>
                                <p>Type: Role Excellence Profile</p>
                                <p>Published Date: 6/26/2014</p>
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom dwnldpoe" data-poe="6">
                                <p>Download</p>
                                <div class="download" id="dwnldLMTF"></div>
                            </div>
                        </li>

                        <li>
                            <div class="top" style="cursor: auto !important;">
                                <img src="../../images/KessakuImage/human-selling.png" alt="Human Selling" title="Human Selling" />
                            </div>
                            <div class="middle">
                                <p>Human Selling</p>
                                <p>Type: Role Excellence Profile</p>
                                <p>Published Date: 6/26/2014</p>
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom dwnldpoe" data-poe="1">
                                <p>Download</p>
                                <div class="download" id="dwnldHumanSelling"></div>
                            </div>
                        </li>
                        <li>
                            <div class="top" style="cursor: auto !important;">
                                <img src="../../images/KessakuImage/cloud-business.png" alt="Cloud Business" title="Cloud Business" />
                            </div>
                            <div class="middle">
                                <p>Cloud Business</p>
                                <p>Type: Role Excellence Profile</p>
                                <p>Published Date: 6/26/2014</p>
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom dwnldpoe" data-poe="2">
                                <p>Download</p>
                                <div class="download" id="dwnldCloudBuisness"></div>
                            </div>
                        </li>

                        <li>
                            <div class="top" style="cursor: auto !important;">
                                <img src="../../images/KessakuImage/no-photo.jpg" alt="No" title="No" />
                            </div>
                            <div class="middle">
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom1" data-poe="6">
                                <p>Download</p>
                                <div class="download" id="Div3"></div>
                            </div>
                        </li>
                        <li>
                            <div class="top" style="cursor: auto !important;">
                                <img src="../../images/KessakuImage/no-photo.jpg" alt="No" title="No" />
                            </div>
                            <div class="middle">
                            </div>
                            <div class="seperate"><span></span></div>
                            <div class="bottom1" data-poe="6">
                                <p>Download</p>
                                <div class="download" id="Div4"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</asp:Content>