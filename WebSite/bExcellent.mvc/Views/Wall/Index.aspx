<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<%@ Import Namespace="bExcellent.mvc.CommonWCF" %>
<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Wall
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <%--<link href="../../Styles/themes/default.min.css" rel="stylesheet" type="text/css" />--%>


    <%--    <script src="../../Scripts/ref/editor/jquery.sceditor.min.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/jquery.expander.js" type="text/javascript"></script>--%>


    <%--<link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />--%>
    <%--<link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />--%>


    <%--   <link href="../../Styles/Wall/wall.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/wall.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Wall/wall.js" type="text/javascript"></script>--%>

    <%--PR checked IN--%>

    <%-- New Wall Design CSS And JS Start --%>
    <link href="../../Styles/themes/default.min.css" rel="stylesheet" type="text/css" />

    <script src="../../Scripts/ref/editor/jquery.sceditor.min.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/jquery.expander.js" type="text/javascript"></script>
    <link href="../../Styles/Wall/css/wall.css" rel="stylesheet" />
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/wall.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Wall/V4Wall.js" type="text/javascript"></script>

    <%-- New Wall Design CSS And JS End --%>
    <%--   <div id="preloader">
        <div id="status">
            &nbsp;
        </div>
    </div>--%>



    <%
        var t = 0;

        if (Session["SelectedPoe"] != null)
        {
            t = int.Parse(Session["SelectedPoe"].ToString());
        }

    %>

    <input type="hidden" id="selectedPoeValueSync" value="<%:t%>" />


    <div class="yammerpopupbg">
        <div class="yammerpopup" id="yammerlistPopup">
            <div class="yammerpopup">
                <div class="yammerpopupcont">
                    <%--<img src="../../Images/other-popup-bg.png" />--%>
                    <div class="yammerpopupconthd">
                        <span id="Closeclick">
                            <%--<img src="../../Images/close-sprite.png" />--%> X</span>
                    </div>
                    <div class="yammerpopupcontholder">
                        <h1>You can post this message to Yammer Groups</h1>
                        <p>
                            (Click on a tile to select)
                        </p>
                        <div class="left">
                            <div class="holder" id="yammercontrols">
                            </div>
                        </div>
                        <input type="hidden" id="syncYammerclick" value="0" />
                        <div class="btm">
                            <div class="yammernavigation">
                                <ul id="yammerNextPrevBtn">
                                </ul>
                            </div>
                            <div class="btnholder">
                                <div class="btn" id="ShareGroupOnly">
                                    Post to Yammer groups only
                                </div>
                                <div class="btn" id="ShareGroupAndUser">
                                    Post to all
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <input type="hidden" id="groupsonly" value="0" />
    <!--End Yammer Popup-->
    <div class="poepopupbg">
    </div>
    <div id="videopopupcontainer" style="display: none;">
        <div class="close">
        </div>
        <div id="vidprev" id="videocontainer">
        </div>

    </div>
    <div class="poepopup" id="replypopup">
        <div class="poepopuphd">
            <div class="close">
                <p>X</p>
            </div>
        </div>
        <div class="poepopupcont">
            <form action="/wall/reply" id="Formreply" enctype="multipart/form-data">
                <div class="level">
                    To
                </div>
                <div class="textboxpopub">
                    <input name="emailaddress" type="text" class="txtbx" />
                    <div class="popupattach">
                        <input name="replyFile" type="file" onchange="javascript:postappreciation.fileadded();" />
                        <img src="../../Images/mail_attachment.png" alt="Attach" />
                    </div>
                </div>
                <div class="clr">
                </div>
                <textarea name="bbcode_field" style="height: 145px; width: 524px;" id="txtareas">
                        </textarea>
                <div class="filespath" id="fileadded">
                </div>
                <input type="button" value="Reply" class="signupbtn reply" />
                <input type="hidden" name="useridslist" id="useridslist" />
                <input type="hidden" name="subject" />
                <input type="hidden" name="comments" />
                <input type="hidden" name="emailid" />
                <input type="hidden" id="usersubids" name="usersubids" />
            </form>
        </div>
    </div>
    <div class="popupW" id="videopopup">
        <div class="popuphd">
            <div class="close" id="close">
                X
            </div>
        </div>
        <div class="popupcont">
            <%-- <div id="scriptload">
            </div>--%>
        </div>
    </div>
    <div class="wallgoal">
        <div class="close">
            <p>X</p>
        </div>
        <div id="wallactcontent">
            test
        </div>
    </div>





    <%-- New Design Html For Wall Page --%>

    <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb">
            <a class="section" href="../Common/Index">Home</a>
            <i>></i>
            <a class="section" href="../Common/Index">Start</a>
            <i>></i>
            <a class=" section">Notifications</a>
        </div>
    </div>
    <div class="sixteen wide column wallpart">
        <div class="three wide column wallleft">
            <h1>Notifications</h1>
            <div class="wallleftMenu">
                <ul>
                    <li class="walltile selectWall"><a href="/wall/index">
                        <p>Notifications</p>
                    </a></li>
                    <li class="sendAppreciation"><a href="/wall/PostAppreciation">
                        <p>Give Appreciation / Post a Comment</p>
                    </a></li>
                    <li class="postVideo"><a href="/wall/PostVideos">
                        <p>Post a Video Message</p>
                    </a></li>
                    <li id="syncyammer" class="syncYammer"><a href="#">
                        <p>Sync with Yammer</p>
                    </a></li>
                </ul>
            </div>

        </div>
        <!---------------------------------------------- Wall Part Start Here ------------------------------------------>
        <div class="thirteen wide column wallRight">

            <h1>Recent Comments <span>- Right click on comments to reply.<span></span></span></h1>
            <div class="walldropdown">
                <% int val = ViewBag.SourceId; %>
                <ul>
                    <li class="dropdown"><a class="dropHide" href="#" data-toggle="dropdown">
                        <%if (val == 5)
                          {
                        %>Goals<%
                          }
                          else if (val == 1)
                          {
                        %>Appreciation<%
                          }
                          else if (val == 2)
                          {
                        %>Feedbacks<%
                          }
                          else if (val == 3)
                          {
                        %>Videos<%
                          }
                          else
                          {
                        %>Show All<%
                          }
                        %>
                        <i class="icon-arrow"></i>
                    </a>
                        <ul class="dropdown-menu">
                            <li id="feedbackMessages" class="empty"><a href="/wall/index/2">Feedback</a></li>
                            <li id="goalclick" class="empty"><a href="/wall/index/5">Goals</a></li>
                            <li id="videomessage" class="empty"><a href="/wall/index/3">Videos</a></li>
                            <li id="appreciationMessage" class="empty"><a href="/wall/index/1">Appreciation</a></li>
                            <li><a href="/wall/index/0" class="empty">Show All</a></></li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div id="wall">

                <div class="commentarea">
                    <div class="prevarrow">
                    </div>

                    <!-- wrapper one -->
                    <div class="wallCenterTiles">
                        <div class="slidebtn">
                            <a href="#" class="prev">Previous</a>

                            <a href="#" class="nxt">Next</a>
                        </div>
                        <div class="vs-context-menu">
                            <ul>
                                <li class="rep">Reply</li>
                                <li class="repall">Reply All</li>
                                <li class="ymrpost">Share with Yammer</li>
                                <li class="email">Email</li>
                            </ul>
                        </div>
                        <div id="thelist1" currentframeindex="0" style="display: none">
                            <ul class="test1">
                                <% V3_GetMyActivitiesResult[] myActivitiesResults = (V3_GetMyActivitiesResult[])ViewBag.MyActivities;
                                   int index;
                                   int activityCount = myActivitiesResults.Count();
                                   if (activityCount <= 9)
                                   {
                                       activityCount = 9;
                                   }
                                %>
                                <input type="hidden" id="framecount" value="<%=myActivitiesResults.Count() %>" />

                                <% for (index = 0; index < activityCount; index++)
                                   {

                                       if (index % 9 == 0)
                                       {
                                %>
                                <div class="frame">
                                    <% } %>
                                    <%
                                       if (index % 3 == 0)
                                       {
                                    %>
                                    <div class="column" id="addText">
                                        <% } %>

                                        <%if (index < myActivitiesResults.Count())
                                          {%>
                                        <li class="test2" userid="<%= myActivitiesResults[index].Id %>" data-poeid="<%= myActivitiesResults[index].poeid %>" email="<%= myActivitiesResults[index].EmailID %>"
                                            subid="<%= myActivitiesResults[index].SubID %>" batchid="<%= myActivitiesResults[index].batchId %>">
                                            <span class="test3"></span>
                                            <img src="/Uploadify/LoadImageHandler.ashx?id=<%= myActivitiesResults[index].From %>&rnd=Math.random()"
                                                width='61' height='61' class='youimg' />
                                            <%= myActivitiesResults[index].Activity %>
                                        </li>
                                        <% }
                                          else
                                          {%>
                                        <li class="walldummy"><span class=""></span></li>
                                        <%}%>
                                        <%
                                       if (index % 3 == 2)
                                       {
                                        %>
                                    </div>
                                    <% }
                               if (index % 9 == 8)
                               {
                                    %>
                                </div>
                                <% }
                                   } %>
                                <% if (index % 3 < 2)
                                   { %>
                            </ul>
                        </div>
                    </div>

                    <% } %>
                    <% else if (index % 9 < 8)
                                   { %>
                </div>
                <%}%>
            </div>
            <%-- New Design For Wall End --%>
            <div class="nxtitem">
            </div>
        </div>
    </div>
    <!--  jCarousel library -->
    <%--<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>--%>
    <%--     <script src="../../Scripts/ref/semantic.min.js"></script>--%>
    <script type="text/javascript">
        $(document).ready(function () {
            // Dropdown Menu
            var dropdown = document.querySelectorAll('.dropdown');
            var dropdownArray = Array.prototype.slice.call(dropdown, 0);
            dropdownArray.forEach(function (el) {
                var button = el.querySelector('a[data-toggle="dropdown"]'),
	                menu = el.querySelector('.dropdown-menu'),
	                arrow = button.querySelector('i.icon-arrow');
                button.onclick = function (event) {
                    if (!menu.hasClass('show')) {
                        menu.classList.add('show');
                        menu.classList.remove('hide');
                        arrow.classList.add('open');
                        arrow.classList.remove('close');
                        event.preventDefault();
                    } else {
                        menu.classList.remove('show');
                        menu.classList.add('hide');
                        arrow.classList.remove('open');
                        arrow.classList.add('close');
                        event.preventDefault();
                    }
                };
            });
            Element.prototype.hasClass = function (className) {
                return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
            };
        });
    </script>
</asp:Content>
