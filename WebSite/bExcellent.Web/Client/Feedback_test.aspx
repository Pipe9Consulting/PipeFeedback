<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Feedback_test.aspx.cs"
    Inherits="bExcellent.Web.Client.Feedback" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<script language="javascript" type="text/javascript" src="../Scripts/ref/scrollpane.js"></script>
<script language="javascript" type="text/javascript" src="../Scripts/ref/scroller.js"></script>
<script type="text/javascript" id="sourcecode">
    $(function () {
        var api = $('.scroll-pane').jScrollPane(
					{
					    showArrows: true,
					    maintainPosition: false
					}
				).data('jsp');

        $('#do-ajax').bind(
					'click',
					function () {
					    api.getContentPane().load(
							'ajax_content.html',
							function () {
							    api.reinitialise();
							}
						);
					    return false;
					}
				);
    });
</script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
<script type="text/javascript" src="../Scripts/ref/featuredcontentglider.js"></script>
<link href="../Styles/glidercontent.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">

    featuredcontentglider.init({
        gliderid: "canadaprovinces",
        contentclass: "glidecontent",
        togglerid: "p-select",
        remotecontent: "",
        selected: 2,
        persiststate: false,
        speed: 500,
        direction: "downup",
        autorotate: false,
        autorotateconfig: [3000, 2]
    })
</script>
<!--collapse frame-->
<script language="JavaScript">
    function setVisibility(id, visibility) {
        document.getElementById(id).style.display = visibility;
    }
</script>
<body>
    <form id="form1" runat="server">
    <div id="wcsi-inner-content">
        <div id="btn-wcsi-back" class="back-button" style="display: none">
        </div>
        <div id="sub-contents">
            <div id="sub-left-menu">
                <div id="wcsi-poe-menu">
                    <table>
                        <tr>
                            <td>
                                <div id="page-title" class="page-title">
                                    Feedback</div>
                            </td>
                            <td>
                                <div class="hd" style="width: 320px;">
                                    Your Poe's</div>
                            </td>
                            <td>
                                <div class="hd" style="width: 300px; margin-left: 35px">
                                    Take Feedback</div>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top">
                                <div id="p-select" class="glidecontenttsf">
                                    <a href="#" class="toc">
                                        <h2>
                                            12</h2>
                                        <p style="padding-top: 20px">
                                            Feedback Given</p>
                                    </a><a href="#" class="toc">
                                        <h2>
                                            100</h2>
                                        <p style="padding-top: 20px">
                                            Feedback Receive</p>
                                    </a><a href="#" class="toc">
                                        <div class="img">
                                            <img src="../images/img/take-icon.png" /></div>
                                        <p style="padding-top: 15px">
                                            Take</p>
                                    </a><a href="#" class="toc">
                                        <div class="img">
                                            <img src="../images/img/receive.png" /></div>
                                        <p style="padding-top: 15px">
                                            Receive</p>
                                    </a><a href="#" class="toc">
                                        <div class="img">
                                            <img src="../images/img/history.png" /></div>
                                        <p style="padding-top: 15px">
                                            Status</p>
                                    </a></a> <a href="#" class="toc">
                                        <div class="img">
                                            <img src="../images/img/status.png" /></div>
                                        <p style="padding-top: 15px">
                                            History</p>
                                    </a>
                                </div>
                </div>
                </td>
                <td valign="top">
                    <div class="scroll-pane" style="height: 420px; margin-top: 0; width: 310px">
                        <div class="tile-box-view">
                            <ul>
                                <li>
                                    <h2>
                                        &nbsp;</h2>
                                    <p>
                                        CA Lead Poe</p>
                                </li>
                                <li>
                                    <h2>
                                        &nbsp;</h2>
                                    <p>
                                        CAM Sales
                                        <br />
                                        Manager Poe</p>
                                </li>
                                <li>
                                    <h2>
                                        &nbsp;</h2>
                                    <p>
                                        CTM Sales
                                        <br />
                                        Manager Poe</p>
                                </li>
                                <li>
                                    <h2>
                                        &nbsp;</h2>
                                    <p>
                                        CAM Account Manager</p>
                                </li>
                                <li>
                                    <h2>
                                        &nbsp;</h2>
                                    <p>
                                        CTM Sales Manager Poe</p>
                                </li>
                                <li>
                                    <h2>
                                        &nbsp;</h2>
                                    <p>
                                        CAM Account Manager</p>
                                </li>
                                <li>
                                    <h2>
                                        &nbsp;</h2>
                                    <p>
                                        Opportunity Manager</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </td>
                <td>
                    <div id="canadaprovinces" class="glidecontentwrapper" style="width: 780px">
                        <div class="glidecontent">
                            <div class="rightcolfeedback">
                                <ul>
                                    <li class="quickview">
                                        <img src="../images/img/quickview.png" width="65" height="64" alt="Quick view" /><p>
                                            Quick View</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li class="detailview">
                                        <img src="../images/img/detailview.png" width="65" height="64" alt="Detailed View" /><p>
                                            Detailed View</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="glidecontent">
                            <div class="rightcolfeedback">
                                <ul>
                                    <li class="quickview">
                                        <img src="../images/img/quickview.png" width="65" height="64" alt="Quick view" /><p>
                                            Quick View</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li class="detailview">
                                        <img src="../images/img/detailview.png" width="65" height="64" alt="Detailed View" /><p>
                                            Detailed View</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="glidecontent">
                            <div class="rightcolfeedback">
                                <ul>
                                    <li class="quickview">
                                        <img src="../images/img/quickview.png" width="65" height="64" alt="Quick view" /><p>
                                            Quick View</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li class="detailview">
                                        <img src="../images/img/detailview.png" width="65" height="64" alt="Detailed View" /><p>
                                            Detailed View</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="glidecontent">
                            <div class="rightcolfeedback">
                                <ul>
                                    <li class="quickview">
                                        <img src="../images/img/quickview.png" width="65" height="64" alt="Quick view" /><p>
                                            Quick View</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li class="detailview">
                                        <img src="../images/img/detailview.png" width="65" height="64" alt="Detailed View" /><p>
                                            Detailed View</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="glidecontent">
                            <div class="rightcolfeedback">
                                <ul>
                                    <li class="quickview">
                                        <img src="../images/img/quickview.png" width="65" height="64" alt="Quick view" /><p>
                                            Quick View</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li class="detailview">
                                        <img src="../images/img/detailview.png" width="65" height="64" alt="Detailed View" /><p>
                                            Detailed View</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="glidecontent">
                            <div class="rightcolfeedback">
                                <ul>
                                    <li class="quickview">
                                        <img src="../images/img/quickview.png" width="65" height="64" alt="Quick view" /><p>
                                            Quick View</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li class="detailview">
                                        <img src="../images/img/detailview.png" width="65" height="64" alt="Detailed View" /><p>
                                            Detailed View</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </td>
                </tr> </table>
            </div>
        </div>
    </div>
    </form>
</body>
</html>