<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/KessakuHome.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content2" ContentPlaceHolderID="KessakuHomehead" runat="server">
    <link href="../../Styles/KessakuStyles/video-pg.css" rel="stylesheet" />
    <script src="../../Scripts/KessakuScript/Resources.js"></script>
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="KessakuHomeContent" runat="server">
    <div class="subbg">
        <div class="placeholder">
             <h1>Videos</h1>
            <div class="videoarea">
                <div class="videotop"></div>
                <div class="videomid">
                    <div class="videoleft"></div>
                    <div class="videocenter" id="tabVideo">
                        <img id="videoclick" src="../../images/kessakuimage/video.jpg" />
                    </div>
                    <div class="videoright"></div>
                </div>
                <div class="videobottom"></div>
            </div>

            <div class="videothumnails">
                <ul>
                    <%--<li class="videoselected" onclick="videoPageClick(1)">
                        <img src="../../images/kessakuimage/video1.png" /><p><span>Kessaku Storyboard</span></p>
                        <div class="play"></div>
                    </li>--%>
                    <li onclick="videoPageClick(2)">
                        <img src="../../images/kessakuimage/video2.png" /><p><span>The Microsoft Role Excellence Profile Story by Dave Miller</span></p>
                        <div class="play"></div>
                    </li>
                    <li onclick="videoPageClick(3)">
                        <img src="../../images/kessakuimage/video3.png" /><p><span>The Microsoft Role Excellence Profile Story by Cecilia Flombum</span></p>
                        <div class="play"></div>
                    </li>
                    <li onclick="videoPageClick(4)">
                        <img src="../../images/kessakuimage/video4.png" /><p><span>The Microsoft Role Excellence Profile Story with Johneen Bufford</span></p>
                        <div class="play"></div>
                    </li>
                    <%-- <li>
                        <img src="../../images/kessakuimage/video8.png" /><p><span>Pixar Story Pitch</span></p>
                        <div class="play"></div>
                    </li>--%>
                    <%-- <li onclick="videoPageClick(6)">
                        <img src="../../images/kessakuimage/video6.png" /><p><span>The Kessaku Story</span></p>
                        <div class="play"></div>
                    </li>--%>
               <%--     <li onclick="videoPageClick(7)">
                        <img src="../../images/kessakuimage/video7.png" /><p><span>Nick Saban's - Quest for Perfection</span></p>
                        <div class="play"></div>
                    </li>--%>
                    <%--<li onclick="videoPageClick(8)">
                        <img src="../../images/kessakuimage/video5.png" /><p><span>ASTD 'Cloud as Coach' webcast by Alan Dowzall</span></p>
                        <div class="play"></div>
                    </li>--%>
                    <%--<li onclick="videoPageClick(5)">
                        <img src="../../images/kessakuimage/video5.png" /><p><span>The Profile of Excellence Story</span></p>
                        <div class="play"></div>
                    </li>--%>
                </ul>
            </div>
        </div>
    </div>
</asp:Content>