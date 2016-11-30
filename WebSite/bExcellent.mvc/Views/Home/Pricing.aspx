<%@ Page Title="" Language="C#" MasterPageFile="../Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pricing
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../../Scripts/ref/Account/Login.js" type="text/javascript"></script>

        <img id="prevdv" class="prevbtn" src="../../Images/prev_arrow.png" onclick="Javascript:login.loadhomepage();" />
        <div id="tiles">
            <div class="breadcrumb">
                Home > Pricing</div>
            <div class="tileview">
                <h1>
                    Pricing</h1>
                <ul>
                    <li><a href="#" class="quickanddetailbig">
                        <h3>
                            <img src="../../Images/icons/price.png" alt="Pricing" /></h3>
                        Pricing</a> </li>
                    <p class="note">
                        <%-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dapibus turpis ut massa emper vel malesuada ipsum laoreet. --%>
                    </p>
                    <p class="note">
                        <%-- Lorem ipsum dolor sit amet, consectetur adipiscing elit--%></p>
                </ul>
            </div>
        </div>
        <div class="loginscreen">
            <h1>
                About bexcellence
            </h1>
            <div class="pricing">
                <div class="first">
                    <h1>
                        Features</h1>
                </div>
                <div class="second">
                    <h1>
                        Trial</h1>
                </div>
                <div class="second">
                    <h1>
                        Individual</h1>
                </div>
                <div class="second">
                    <h1>
                        Business</h1>
                </div>
                <div class="second">
                    <h1>
                        Enterprise</h1>
                </div>
            </div>
            <div class="pricing">
                <div class="first">
                    <%--  <ul>
            <li>Lorem ipsum dolor sit </li>
            <li>amet consectetur adipiscing </li>
            <li>elit Nullam dapibus </li>
            <li>turpis ut massa emper</li>
            <li>Lorem ipsum dolor sit </li>
            <li>amet consectetur adipiscing </li>
            <li>elit Nullam dapibus </li>
            <li>turpis ut massa emper</li>
            </ul>--%>
                </div>
                <div class="third">
                    <p>
                        Free Feedback with up to 5 users for 30 days</p>
                    <ul>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                    </ul>
                    <div class="button">
                        Sign UP</div>
                </div>
                <div class="third">
                    <p>
                        Paid feedback with up to 5 users $20 per user</p>
                    <ul>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                    </ul>
                    <div class="button" onclick="javascript:window.location='../../Home/CheckOut?itemname=individual&amount=20.00'">
                        Sign UP</div>
                </div>
                <div class="third">
                    <p>
                        Subscription based pricing for as low as $15 per user per month</p>
                    <ul>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                    </ul>
                    <div class="button" onclick="javascript:window.location='../../Home/CheckOut?itemname=business&amount=15.00'">
                        Sign UP</div>
                </div>
                <div class="third">
                    <p>
                        Subscription based pricing for as low as $10 per user per month</p>
                    <ul>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                        <li>
                            <div class="pricing_frame">
                                <input type="checkbox" value="None" />
                                <span class="tick"></span>
                            </div>
                        </li>
                    </ul>
                    <div class="button">
                        Contact Us</div>
                </div>
            </div>
        </div>

</asp:Content>