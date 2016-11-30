<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Wall
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/themes/default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/ref/editor/jquery.sceditor.min.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/V4wall.js" type="text/javascript"></script>
    <%-- <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />--%>
    <link href="../../Styles/Wall/css/wall.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Wall/V4postVideo.js" type="text/javascript"></script>
    

    <div class="poepopupbg">
    </div>
    <div class="load">
        <img src="../../Images/loading3.gif" />
    </div>

    <div class="poepopup">
        <div class="poepopuphd">
            <div class="close">
            </div>
        </div>
        <div class="poepopupcont">
            <div class="level">
                To
            </div>
            <div>
                <input name="" type="text" class="txtbx" /><div class="mailattach">
                    <input name="" type="file" /><img src="../../Images/mail_attachment.png" alt="Attach" />
                </div>
            </div>
            <div class="clr">
            </div>
            <img src="../../Images/txtbx.png" class="comntbx" />
            <input name="" type="button" value="Reply" class="signupbtn reply" />
        </div>
    </div>



    <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb">
            <a href="../Common/Index" class="section">Home</a>
            <i>&nbsp>&nbsp</i>
            <a href="../Common/Index" class=" section">Start</a>
            <i>&nbsp>&nbsp</i>
            <a href="../Wall/PostVideos" class="section">Post a Video Message</a>
        </div>
    </div>



    <div class="sixteen wide column wallpart">
        <div class="three wide column wallleft">
            <h1 class="wall1">Wall
            </h1>
            <h1 class="wall2">Give Appreciation
            </h1>
            <h1 class="wall3">Post a Video Message
            </h1>
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
        <div class="thirteen wide column sendRight " id="postvmsg">
            <h1>&nbsp; </h1>
            <div class="clear"></div>
            <div class="SendAppreciationPart">
                <div class="sendProfileList">
                    <div class="scroll1">
                        <ul id="memberlist">
                            <%--<li class="profileDetails">
			<div class="profileimage"><img src="images/wallProfileImage.png" /></div>
			<div class="profileContent">
			<h3>Alan Pane</h3>
			<p>aptest@microsoft.com</p>
			</div>
		</li>
		<li class="profileDetails selectProfile">
			<div class="profileimage"><img src="images/wallProfileImage.png" /></div>
			<div class="profileContent">
			<h3>Alan Pane</h3>
			<p>aptest@microsoft.com</p>
			</div>
		</li>
		<li class="profileDetails">
			<div class="profileimage"><img src="images/wallProfileImage.png" /></div>
			<div class="profileContent">
			<h3>Alan Pane</h3>
			<p>aptest@microsoft.com</p>
			</div>
		</li>
		<li class="profileDetails">
			<div class="profileimage"><img src="images/wallProfileImage.png" /></div>
			<div class="profileContent">
			<h3>Alan Pane</h3>
			<p>aptest@microsoft.com</p>
			</div>
		</li>
		<li class="profileDetails">
			<div class="profileimage"><img src="images/wallProfileImage.png" /></div>
			<div class="profileContent">
			<h3>Alan Pane</h3>
			<p>aptest@microsoft.com</p>
			</div>
		</li>
		<li class="profileDetails">
			<div class="profileimage"><img src="images/wallProfileImage.png" /></div>
			<div class="profileContent">
			<h3>Alan Pane</h3>
			<p>aptest@microsoft.com</p>
			</div>
		</li>
		<li class="profileDetails">
			<div class="profileimage"><img src="images/wallProfileImage.png" /></div>
			<div class="profileContent">
			<h3>Alan Pane</h3>
			<p>aptest@microsoft.com</p>
			</div>
		</li>
		<li class="profileDetails">
			<div class="profileimage"><img src="images/wallProfileImage.png" /></div>
			<div class="profileContent">
			<h3>Alan Pane</h3>
			<p>aptest@microsoft.com</p>
			</div>
		</li>--%>
                        </ul>
                    </div>
                </div>
                <div class="sendDetails">
                    <div class="post">
                        <p>To </p>
                        <input id="selectedmembersdiv" type="text" name="email" class="emailText txtarea" />
                      <%--  <p>Title </p>
                        <input type="text" name="email" class="emailText" />--%>
                        <p>Add Video </p>
                        <div class="addvideoBtn">
                            <div class="btn_algn">
                            <form action="/wall/UploadVideo" id="PostVideo" enctype="multipart/form-data">
                                <a class="mailattach" href="#">
                                    <input class="addvideo" type="file" id="vidupload" name="vidfile" onchange="javascript:postappreciation.validateSelection();" />
                                    <img class="imgAddVideo" src="../../Images/images/addVideo.png" />
                                    <div class="filepath" id="fileadded"></div>
                                </a>
                            </form>
                        
                             <a class="del" id="deletevid" href="#"><span class="deletIcon"></span>Delete</a>
                            </div>
                      
                            <div class="descPostVideo">
                            <p>Description</p>
                            <textarea id="txtareas" class="contentWriter"></textarea>
                                </div>
                            
                                <%--<a href="#" class="playPreview"><span class="palyIcon"></span>Preview</a>--%>
                                <h5>Preview</h5>

                                <div id="vidprev" width="120" height="100" alt="Video" class="videpreview">
                                </div>
                               
                          

                            <form action="/wall/SendVideo" id="sendevent" enctype="multipart/form-data">
                                <div class="postBtn" id="sendbtn">
                                    <a href="#">Send</a>
                                </div>

                                <input type="hidden" id="selectedmembershdn" name="userids" />
                                <input type="hidden" id="subject" name="subject" />
                                <input type="hidden" id="comments" name="comments" />
                                <input type="hidden" id="vidlink" name="vidlink" />
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>



    <%--<div class="pageholder">
        <div class="breadcrumb">
            <a href="../Common/Index">Home </a>> <a href="../Common/Index">Start </a>> Wall
        </div>
        <div class="customertiles wall">
            <h1 class="wall1">Wall
            </h1>
            <h1 class="wall2">Send Appreciation
            </h1>
            <h1 class="wall3">Post a Video Message
            </h1>
            <ul>
                <li class="selected rectangle" id="walltile"><a class="firstp" href="/wall/index">
                    <img src="../../Images/icons/wall-ico.png" />
                    <p>
                        Wall
                    </p>
                </a></li>
                <li id="sa" class="rectangle"><a class="firstp" href="/wall/PostAppreciation">
                    <img src="../../Images/icons/send-app-ico.png" />
                    <p>
                        Send Appreciation / Post a Comment
                    </p>
                </a></li>
                <li id="postvmsgtile"><a href="/wall/PostVideos">
                    <img src="../../Images/icons/post-video-ico.png" />
                    <p>
                        Post a video message
                    </p>
                </a></li>
                <li id="syncyammer"><a href="#">
                    <img src="../../Images/icons/yammer-ico.png" />
                    <p>
                        Sync with Yammer
                    </p>
                </a></li>
            </ul>
        </div>
        <div class="commentarea" id="postvmsg">
            <h1>Users</h1>
            <div class="postcmnt">
                <div class="scroll1">
                    <ul id="memberlist">
                    </ul>
                </div>
            </div>
            <div class="post">
                <p>
                    To
                </p>
                <p>
                    <div id="selectedmembersdiv" class="txtarea">
                    </div>
                    <div class="icons">
                        <div class="del" id="deletevid">
                            <abbr title="Delete Video">
                                <img src="../../Images/icons/delete-video.png" width="20" height="24" alt="Delete Video" />
                            </abbr>
                        </div>
                        <div class="upld">
                            <abbr title="Upload Video">
                                <form action="/wall/UploadVideo" id="PostVideo" enctype="multipart/form-data">
                                    <input type="file" id="vidupload" name="vidfile" onchange="javascript:postappreciation.validateSelection();" />
                                </form>
                                <img src="../../Images/icons/upload-video.png" width="29" height="23" alt="Upload" />
                            </abbr>
                        </div>
                    </div>
                    <p>
                        <textarea name="bbcode_field" style="height: 159px; width: 524px;" id="txtareas">
                        </textarea>
                <p>
                    <h3>Preview</h3>
                </p>
                <div id="vidprev" width="320" height="200" alt="Video" class="videpreview">
                </div>
                <form action="/wall/SendVideo" id="sendevent" enctype="multipart/form-data">
                    <div class="sign" id="sendbtn">
                        Send
                    </div>
                    <input type="hidden" id="selectedmembershdn" name="userids" />
                    <input type="hidden" id="subject" name="subject" />
                    <input type="hidden" id="comments" name="comments" />
                    <input type="hidden" id="vidlink" name="vidlink" />
                </form>
            </div>
        </div>
    </div>--%>
                </div>
</asp:Content>
