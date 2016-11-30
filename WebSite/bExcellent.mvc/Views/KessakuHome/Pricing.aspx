<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/KessakuHome.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content2" ContentPlaceHolderID="KessakuHomehead" runat="server">
    <link href="../../Styles/KessakuStyles/pricing.css" rel="stylesheet" />
    <script src="../../Scripts/KessakuScript/pricing.js"></script>
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="KessakuHomeContent" runat="server">
    <div class="pricingBG">
        <div class="placeholder">
            <div class="pricingmidBar">
                <div class="priceind">
                    <table cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td class="topLeftCurve">&nbsp;
                                </td>

                                <td class="priceheading column1">
                                    <h2>Features</h2>
                                </td>
                                <td rowspan="15">&nbsp;
                                </td>
                                <td class="priceheading column2">
                                    <h2>Trial</h2>
                                    <h2>For Free</h2>
                                    <%--<h2>$0</h2>--%>
                                    <h2>$0/5 Users</h2>
                                </td>
                                <td rowspan="15">&nbsp;
                                </td>
                                <td class="priceheading column2">
                                    <h2>Individual</h2>
                                    <h2>Subscription</h2>
                                    <%--<h2>$10</h2>--%>
                                    <h2>$10/User/Per Month</h2>
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="3" align="center" class="selectBG">
                                    <img class="secondimg smhd" alt="align" src="../../images/KessakuImage/align.png">
                                </td>
                                <td class="whitebg column1 bdrTop lightBG"><p>Access Industry standard Role Excellence Profiles</p>
                                </td>
                                <td class="whitebg  column2 bdrTop lightBG">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                                <td class="whitebg  column2 bdrTop lightBG">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                            </tr>
                            <tr>
                                <td class="whitebg column1 lightBG"><p>Build Feedback Network</p>
                                </td>
                                <td class="whitebg  column2 lightBG">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                                <td class="whitebg  column2 lightBG">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                            </tr>
                            <tr>
                                <td class="whitebg column1 lightBG"><p>Share Messages of Success</p>
                                </td>
                                <td class="whitebg  column2 lightBG">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                                <td class="whitebg  column2 lightBG">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="5" align="center" class="unselectBG">
                                    <img class="secondimg" alt="collaborate" src="../../images/KessakuImage/collaborate.png">
                                </td>
                                <td class="whitebg column1 bdrTop"><p>Send video messages</p>
                                </td>
                                <td class="whitebg  column2 bdrTop">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                                <td class="whitebg  column2 bdrTop">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                            </tr>
                            <tr>
                                <td class="whitebg column1"><p>Post Messages on Wall</p>
                                </td>
                                <td class="whitebg  column2">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                                <td class="whitebg  column2">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                            </tr>
                            <tr>
                                <td class="whitebg column1"><p>Connect &amp; Learn from Star Performers</p>
                                </td>
                                <td class="whitebg  column2">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                                <td class="whitebg  column2">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                            </tr>
                            <tr>
                                <td class="whitebg column1"><p>Collaborate via Yammer</p>
                                </td>
                                <td class="whitebg  column2">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                                <td class="whitebg  column2">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                            </tr>
                            <tr>
                                <td class="whitebg column1"><p>Send &amp; Receive Email notifications</p>
                                </td>
                                <td class="whitebg  column2">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                                <td class="whitebg  column2">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="3" class="selectBG">
                                    <img class="secondimg smhd" alt="recognize" src="../../images/KessakuImage/recognize.png">
                                </td>
                                <td class="whitebg column1 bdrTop lightBG"><p>Deliver Real-time Recognition</p>
                                </td>
                                <td class="whitebg  column2 bdrTop lightBG">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                                <td class="whitebg  column2 bdrTop lightBG">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                            </tr>
                            <tr>
                                <td class="whitebg column1"><p>Award Badges &amp; Medals</p>
                                </td>
                                <td class="whitebg  column2 lightBG">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                                <td class="whitebg  column2 lightBG">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                            </tr>
                            <tr>
                                <td class="whitebg column1"><p>Build Reputation History</p>
                                </td>
                                <td class="whitebg  column2 lightBG">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                                <td class="whitebg  column2 lightBG">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="3" align="center" class="unselectBG">
                                    <img class="secondimg" alt="perform" src="../../images/KessakuImage/perform.png">
                                </td>
                                <td class="whitebg column1 bdrTop"><p>View &amp; Compare Standing</p>
                                </td>
                                <td class="whitebg  column2 bdrTop">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                                <td class="whitebg  column2 bdrTop">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                            </tr>
                            <tr>
                                <td class="whitebg column1"><p>Create Goals</p>
                                </td>
                                <td class="whitebg  column2"></td>
                                <td class="whitebg  column2">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                            </tr>
                            <tr>
                                <td class="whitebg column1"><p>Review progress against goals</p>
                                </td>
                                <td class="whitebg  column2"></td>
                                <td class="whitebg  column2">
                                    <img src="../../images/KessakuImage/tick.png">
                                </td>
                            </tr>
                            <tr>
                                <td class="bottomLeftCurve">&nbsp;
                                </td>
                                <td class="whitebg column1">&nbsp;
                                </td>
                                <td>&nbsp;
                                </td>
                                <td class="whitebg txtCenter" align="center">
                                    <div class="submit">
                                        <input type="button" id="submitContact" value="Sign Up" onclick="RegisterRedirect()">
                                    </div>
                                </td>
                                <td>&nbsp;
                                </td>
                                <td class="whitebg  txtCenter" align="center">
                                    <div class="submit">
                                        <input type="button" id="Button1" value="Sign Up" onclick="RegisterRedirect()">
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- Priccing Table end here -->
            </div>
        </div>
    </div>
</asp:Content>