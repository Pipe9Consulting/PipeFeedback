<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Feedback.aspx.cs" Inherits="bExcellent.Web.Client.Feedback" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>
<script language="javascript" type="text/javascript" src="../Scripts/ref/feedback.js"></script>
<script language="javascript" type="text/javascript" src="../Scripts/ref/pageloader.js"></script>
<%--<script type="text/javascript">
    var dropinbox2 = new dropincontentbox({
        source: '#reminder',
        cssclass: 'dropinbox dropinboxaltstyle drop-shadow lifted'
    })
</script>--%>
<%--<script language="javascript" type="text/javascript" src="../Scripts/ref/scrollpane.js"></script>
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
</script>--%>
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
                                <div class="hd" style="width: 300px">
                                    Your Poe's</div>
                            </td>
                            <td style="width: 300px">
                                <div class="hd" style="margin-left: 35px">
                                    Take Feedback</div>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top">
                                <div class="tile-box-view" id="feedback-menu">
                                    <ul>
                                        <li><a>
                                            <h2 id="feedback-given-count">
                                            </h2>
                                            <p style="padding-top: 20px">
                                                Feedback Given</p>
                                        </a></li>
                                        <li><a>
                                            <h2 id="feedback-recive-count">
                                            </h2>
                                            <p style="padding-top: 20px">
                                                Feedback Received</p>
                                        </a></li>
                                        <li><a href="javascript:dropinbox2.show()">
                                            <div class="img">
                                                <img src="../images/img/take-icon.png" /></div>
                                            <p style="padding-top: 15px">
                                                Take</p>
                                        </a></li>
                                        <li><a href="#">
                                            <div class="img">
                                                <img src="../images/img/receive.png" /></div>
                                            <p style="padding-top: 15px">
                                                Receive</p>
                                        </a></li>
                                        <li><a href="#">
                                            <div class="img">
                                                <img src="../images/img/history.png" /></div>
                                            <p style="padding-top: 15px">
                                                History</p>
                                        </a></li>
                                        <li><a href="#">
                                            <div class="img">
                                                <img src="../images/img/status.png" /></div>
                                            <p style="padding-top: 15px">
                                                Status</p>
                                        </a></li>
                                    </ul>
                                </div>
                            </td>
                            <td valign="top">
                                <div class="scroll-pane" style="height: 420px; margin-top: 0; width: 310px">
                                    <div class="scroll-pane" style="height: 420px; margin-top: 0">
                                        <div class="tile-box-view" id="feedback-poe-list">
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td valign="top">
                                <div class="rightcolfeedback" id="reminder">
                                    <a id="feedback-quickview">
                                        <ul>
                                            <li class="quickview">
                                                <img src="../images/img/quickview.png" width="65" height="64" alt="Quick view" /><p>
                                                    Quick View</p>
                                            </li>
                                        </ul>
                                    </a><a id="feedback-detailsview">
                                        <ul>
                                            <li class="detailview">
                                                <img src="../images/img/detailview.png" width="65" height="64" alt="Detailed View" /><p>
                                                    Detailed View</p>
                                            </li>
                                        </ul>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
