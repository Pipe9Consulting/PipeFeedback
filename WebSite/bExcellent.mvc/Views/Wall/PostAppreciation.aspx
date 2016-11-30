<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>"
    ValidateRequest="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Wall
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <%--  <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />--%>
    <%-- <link href="../../Styles/Wall/wall.css" rel="stylesheet" type="text/css" />--%>
    <link href="../../Styles/themes/default.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Wall/css/wall.css" rel="stylesheet" />
    <script src="../../Scripts/ref/editor/jquery.sceditor.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Wall/V4PostAppreciation.js" type="text/javascript"></script>

    <%-- yammer Popup--%>

    <div class="popup">
        <div class="close">
        </div>
        <p id="info">
            Message Posted Successfully
        </p>
        <br /><br /><br />
        <a href="#" class="yammerOk">Ok</a>
    </div>
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
                                <div class="btn" id="SharePostGroup">
                                    Post to Yammer groups only
                                </div>
                                <div class="btn" id="SharePostGroupAll">
                                    Post to all
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <%-- <div class="yammerpopupbg">
        <div class="yammerpopup" id="poeiddpoup">
            <div class="yammerpopup">
                <div class="yammerpopupcont">
                    <img src="../../Images/other-popup-bg.png" />
                    <div class="yammerpopupconthd">
                        <span id="Closeclick">
                            <img src="../../Images/close-sprite.png" /></span>
                    </div>
                    <div class="yammerpopupcontholder">
                        <h1>You can post this message to Yammer Groups</h1>
                        <p>
                            (Click on a tile to select)
                        </p>
                        <div class="left">
                            <!--First Ul-->
                            <ul id="yammerGrouplists1">
                            </ul>
                            <!--End First Ul-->
                            <!--2nd Ul-->
                            <ul id="yammerGrouplists2">
                            </ul>
                            <!--End 2nd Ul-->
                        </div>
                        <input type="hidden" id="syncYammerclick" value="0" />
                        <input type="hidden" id="sharePostClick" value="0" />
                        <div class="btm">
                            <div class="yammernavigation">
                                <ul>
                                    <li class="yprev">
                                        <img src="../../Images/nav-prev.png" /></li>
                                    <li class="ynxt">
                                        <img src="../../Images/nav-nxt.png" /></li>
                                </ul>
                            </div>
                            <div class="btnholder">
                                <div class="btn" id="SharePostGroup">
                                    Post to Yammer groups only
                                </div>
                                <div class="btn" id="SharePostGroupAll">
                                    Post to all
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>--%>
    <%-- yammer End-pop_up--%>
    <div class="poepopupbg">
    </div>
    <div class="poepopup">
        <div class="poepopuphd">
            <div class="close">
            </div>
        </div>
        <div class="poepopupcont" style="display: none">
            <div class="level">
                To
            </div>
            <div>
                <input name="" type="text" class="txtbx" />
                <div class="popupattach">
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
            <a href="../Wall/PostAppreciation" class="section">Give Appreciation</a>


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
        <!---------------------------------------------- Wall Part Start Here ------------------------------------------>




        <!---------------------------------------------- Send Part Start Here ------------------------------------------>
        <div class="thirteen wide column sendRight">
            <h1>&nbsp; </h1>
            <div class="clear"></div>
            <div class="SendAppreciationPart">
                <div class="sendProfileList">
                    <div class="scroll1">
                        <ul id="memberlist">
                            <%--<li class="profileDetails">
                            <div class="profileimage">
                                <img src="images/wallProfileImage.png" /></div>
                            <div class="profileContent">
                                <h3>Alan Pane</h3>
                                <p>aptest@microsoft.com</p>
                            </div>
                        </li>
                        <li class="profileDetails selectProfile">
                            <div class="profileimage">
                                <img src="images/wallProfileImage.png" /></div>
                            <div class="profileContent">
                                <h3>Alan Pane</h3>
                                <p>aptest@microsoft.com</p>
                            </div>
                        </li>
                        <li class="profileDetails">
                            <div class="profileimage">
                                <img src="images/wallProfileImage.png" /></div>
                            <div class="profileContent">
                                <h3>Alan Pane</h3>
                                <p>aptest@microsoft.com</p>
                            </div>
                        </li>
                        <li class="profileDetails">
                            <div class="profileimage">
                                <img src="images/wallProfileImage.png" /></div>
                            <div class="profileContent">
                                <h3>Alan Pane</h3>
                                <p>aptest@microsoft.com</p>
                            </div>
                        </li>
                        <li class="profileDetails">
                            <div class="profileimage">
                                <img src="images/wallProfileImage.png" /></div>
                            <div class="profileContent">
                                <h3>Alan Pane</h3>
                                <p>aptest@microsoft.com</p>
                            </div>
                        </li>
                        <li class="profileDetails">
                            <div class="profileimage">
                                <img src="images/wallProfileImage.png" /></div>
                            <div class="profileContent">
                                <h3>Alan Pane</h3>
                                <p>aptest@microsoft.com</p>
                            </div>
                        </li>
                        <li class="profileDetails">
                            <div class="profileimage">
                                <img src="images/wallProfileImage.png" /></div>
                            <div class="profileContent">
                                <h3>Alan Pane</h3>
                                <p>aptest@microsoft.com</p>
                            </div>
                        </li>
                        <li class="profileDetails">
                            <div class="profileimage">
                                <img src="images/wallProfileImage.png" /></div>
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
                        <p>
                            To
                        </p>
                        <input id="selectedmembersdiv" type="text" name="email" class="emailText txtarea" />
                        <div class="badge" id="badge">
                            <p>Select a Badge</p>
                            <ul>
                                <li class="selectbadge" value="1">
                                    <p>Thank You          </p>
                                    <img alt="Thankyou" src="../../Images/images/thankyouIcon.png" />
                                </li>
                                <li value="2">
                                    <p>Great Idea              </p>
                                    <img alt="Idea" src="../../Images/images/sendideaIcon.png" />
                                </li>
                                <li value="3">
                                    <p>Key Contributor   </p>
                                    <img alt="Key Contributor" src="../../Images/images/sendkeyIcon.png" />
                                </li>
                            </ul>
                        </div>
                        <div class="clear"></div>
                        <div class="badge award" id="award">
                            <p>Award a Medal</p>
                            <ul>
                                <li class="badgeselect" value="1"><span>
                                    <p>Gold Medal</p>
                                    <img alt="Thankyou" src="../../Images/images/goldmedalIcon.png" /></span>
                                </li>
                                <li value="2"><span>
                                    <p>Silver Medal</p>
                                    <img alt="Idea" src="../../Images/images/sliverMedal.png" /></span>
                                </li>
                                <li value="3"><span>
                                    <p>Bronze Medal</p>
                                    <img alt="Key Contributor" src="../../Images/images/bronzeMedalIcon.png" /></span>
                                </li>
                            </ul>
                        </div>
                        <p>Description</p>
                        <textarea class="contentWriter"></textarea>


                        <form id="PostComments">
                            <div class="mailattach">
                                <input name="replyFile" type="file" onchange="javascript:postappreciation.fileadded();" />
                                <img src="../../Images/mail_attachment.png" alt="Attach" />
                            </div>

                            <div class="sendapBut">
                                <label>Share via:</label>
                                <a id="sendbtn" href="#">Pipe9 Coach</a>
                                <a id="postYammer" href="#">Yammer</a>
                                <a id="both" href="#">Both</a>

                            </div>
                            <div class="filepath" id="fileadded">
                            </div>

                            <input type="hidden" id="btnClickevent" value="0" />
                            <input type="hidden" id="selectedmembershdn" name="userids" />
                            <input type="hidden" id="subject" name="subject" />
                            <input type="hidden" id="appreciation" name="appreciation" />
                            <input type="hidden" id="comments" name="comments" />
                            <input type="hidden" id="GroupIdPost" name="GroupIdPost" />
                            <input type="hidden" id="GroupName" name="GroupName" />
                            <input type="hidden" id="selectedmembersemailids" name="selectedmembersemailids" />
                        </form>
                    </div>
                </div>
            </div>


        </div>







        <%--<div class="post">
                <p>
                    To
                </p>
                <p>
                    <div id="selectedmembersdiv" class="txtarea">
                    </div>
                </p>
                <p>
                    Give a Badge
                </p>
                <div class="badge" id="badge">
                    <ul>
                        <li value="1">
                            <div>
                                <img src="../../Images/icons/thank-you.png" width="44" height="44" alt="Thankyou" />
                            </div>
                            <p>
                                Thank you
                            </p>
                        </li>
                        <li value="2">
                            <div>
                                <img src="../../Images/icons/idea.png" width="44" height="44" alt="Idea" />
                            </div>
                            <p>
                                Great Idea
                            </p>
                        </li>
                        <li value="3">
                            <div>
                                <img src="../../Images/icons/key-contri.png" width="44" height="44" alt="Key Contributor" />
                            </div>
                            <p>
                                Key Contributor
                            </p>
                        </li>
                    </ul>
                </div>
                <p>
                    Award a Medal
                </p>
                <div class="badge" id="award">
                    <ul>
                        <li value="1"><span>
                            <img src="../../Images/icons/gold-madel.png" width="41" height="59" alt="Thankyou" /></span><p>
                                Gold Medal
                            </p>
                        </li>
                        <li value="2"><span>
                            <img src="../../Images/icons/silver-madel.png" width="41" height="59" alt="Idea" /></span><p>
                                Silver Medal
                            </p>
                        </li>
                        <li value="3"><span>
                            <img src="../../Images/icons/bronze-madel.png" width="41" height="59" alt="Key Contributor" /></span><p>
                                Bronze Medal
                            </p>
                        </li>
                    </ul>
                </div>
                <p>
                    <textarea name="bbcode_field" style="height: 159px; width: 524px;" id="txtareas">
                        </textarea>
                </p>
                <p>
                    <form id="PostComments">
                        <div class="mailattach">
                            <input name="replyFile" type="file" onchange="javascript:postappreciation.fileadded();" />
                            <img src="../../Images/mail_attachment.png" alt="Attach" />
                        </div>
                        <div class="sendtbl">
                            <table>
                                <tr>
                                    <td style="width: 25%">
                                        <div class="filepath" id="fileadded">
                                        </div>
                                    </td>
                                    <td style="width: 15%">
                                        <p>
                                            Post To&nbsp;&nbsp;&nbsp;
                                        </p>
                                    </td>
                                    <td style="width: 20%">
                                        <div class="sign1" id="sendbtn">
                                            PIPE9
                                        </div>
                                    </td>
                                    <td style="width: 20%">
                                        <div class="sign1" id="postYammer">
                                            Yammer
                                        </div>
                                    </td>
                                    <td style="width: 20%">
                                        <div class="sign1" id="both">
                                            Both
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <input type="hidden" id="btnClickevent" value="0" />
                        <input type="hidden" id="selectedmembershdn" name="userids" />
                        <input type="hidden" id="subject" name="subject" />
                        <input type="hidden" id="appreciation" name="appreciation" />
                        <input type="hidden" id="comments" name="comments" />
                        <input type="hidden" id="GroupIdPost" name="GroupIdPost" />
                        <input type="hidden" id="GroupName" name="GroupName" />
                        <input type="hidden" id="selectedmembersemailids" name="selectedmembersemailids" />
                    </form>
                </p>
            </div>--%>

















































        <%-- <div class="pageholder">
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
        <!--Wall-->
        <!--Post Comment-->
        <div class="commentarea" id="postcmnt">
            <div class="vs-context-menu">
                <ul>
                    <li>Reply</li>
                    <li>Reply All</li>
                    <li>Share with Yammer</li>
                    <li>Email</li>
                    <li>Attach</li>
                </ul>
            </div>
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
                </p>
                <p>
                    Give a Badge
                </p>
                <div class="badge" id="badge">
                    <ul>
                        <li value="1">
                            <div>
                                <img src="../../Images/icons/thank-you.png" width="44" height="44" alt="Thankyou" />
                            </div>
                            <p>
                                Thank you
                            </p>
                        </li>
                        <li value="2">
                            <div>
                                <img src="../../Images/icons/idea.png" width="44" height="44" alt="Idea" />
                            </div>
                            <p>
                                Great Idea
                            </p>
                        </li>
                        <li value="3">
                            <div>
                                <img src="../../Images/icons/key-contri.png" width="44" height="44" alt="Key Contributor" />
                            </div>
                            <p>
                                Key Contributor
                            </p>
                        </li>
                    </ul>
                </div>
                <p>
                    Award a Medal
                </p>
                <div class="badge" id="award">
                    <ul>
                        <li value="1"><span>
                            <img src="../../Images/icons/gold-madel.png" width="41" height="59" alt="Thankyou" /></span><p>
                                Gold Medal
                            </p>
                        </li>
                        <li value="2"><span>
                            <img src="../../Images/icons/silver-madel.png" width="41" height="59" alt="Idea" /></span><p>
                                Silver Medal
                            </p>
                        </li>
                        <li value="3"><span>
                            <img src="../../Images/icons/bronze-madel.png" width="41" height="59" alt="Key Contributor" /></span><p>
                                Bronze Medal
                            </p>
                        </li>
                    </ul>
                </div>
                <p>
                    <textarea name="bbcode_field" style="height: 159px; width: 524px;" id="txtareas">
                    </textarea>
                </p>
                <p>
                    <form id="PostComments">
                        <div class="mailattach">
                            <input name="replyFile" type="file" onchange="javascript:postappreciation.fileadded();" />
                            <img src="../../Images/mail_attachment.png" alt="Attach" />
                        </div>
                        <div class="sendtbl">
                            <table>
                                <tr>
                                    <td style="width: 25%">
                                        <div class="filepath" id="fileadded">
                                        </div>
                                    </td>
                                    <td style="width: 15%">
                                        <p>
                                            Post To&nbsp;&nbsp;&nbsp;
                                        </p>
                                    </td>
                                    <td style="width: 20%">
                                        <div class="sign1" id="sendbtn">
                                            PIPE9
                                        </div>
                                    </td>
                                    <td style="width: 20%">
                                        <div class="sign1" id="postYammer">
                                            Yammer
                                        </div>
                                    </td>
                                    <td style="width: 20%">
                                        <div class="sign1" id="both">
                                            Both
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <input type="hidden" id="btnClickevent" value="0" />
                        <input type="hidden" id="selectedmembershdn" name="userids" />
                        <input type="hidden" id="subject" name="subject" />
                        <input type="hidden" id="appreciation" name="appreciation" />
                        <input type="hidden" id="comments" name="comments" />
                        <input type="hidden" id="GroupIdPost" name="GroupIdPost" />
                        <input type="hidden" id="GroupName" name="GroupName" />
                        <input type="hidden" id="selectedmembersemailids" name="selectedmembersemailids" />
                    </form>
                </p>
            </div>
        </div>
        <!--Post Video Message-->
    </div>--%>
    </div>
</asp:Content>
