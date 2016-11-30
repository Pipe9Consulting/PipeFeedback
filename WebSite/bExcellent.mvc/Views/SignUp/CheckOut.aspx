<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/SignUp.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    AddMember
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../../Scripts/ref/Signup/signup.js" type="text/javascript"></script>
    <script type="text/javascript">       </script>
    <link href="../../Styles/signup/addmember.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/ref/Signup/Checkout.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $(".securityHelp img").hover(function () {
                $(".securityHelpinfo").toggle();
            });
        });
    </script>
    <script type="text/javascript">
        $(function () {
            $('.scroll1').slimScroll();
        });
    </script>
    <input type="hidden" id="PoEPaidCost" value="0" />
    <input type="hidden" id="plansClicked" value="0" />
    <input type="hidden" id="HdnMode" />
    <input type="hidden" id="amount" value="0" />
    <input type="hidden" id="PoeCost" value="0" />
    <input type="hidden" id="MaxPoeCount" value="0" />
    <input type="hidden" id="MaxUserCount" value="0" />
    <input type="hidden" id="GetSelectedPoe" value="0" />
    <input type="hidden" id="GetNetworkCount" value="0" />
    <input type="hidden" id="userlname" />
    <input type="hidden" id="userfname" />
    <input type="hidden" id="trailtopaid" value="0" />
    <input type="hidden" id="SubscribedUserDate" value="0" />
    <input type="hidden" id="PaidMode" value="0" />
    <input type="hidden" id="PoEPaidCost" value="0" />
    <input type="hidden" id="plansClicked" value="0" />
    
    <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb">
                <a href="../Common/Index">Home </a>> Checkout
        </div>
    </div>

    <div class="pageholder">
        
        <% if (ViewBag.Status != null)
           { %>
        <%= ViewBag.Status %>
        <% } %>
        <h1>
            Checkout</h1>
        <div class="signuptile">
            <div class="img">
                <img src="../Images/icons/checkout-icon.png" width="64" height="62" alt="Checkout" /></div>
            <p>
                Checkout
            </p>
        </div>
        <form name="checkout" id="checkout" action="javascript:checkoutvalidate();" method="post">
        <div class="contenthold">
            <div class="checkoutcol">
                <h1>
                    Credit or Debit Card Information</h1>
                <div class="clr">
                </div>
                <div class="row">
                    <div class="col level">
                        First name
                    </div>
                    <div class="col">
                        <input type="text" class="txtcol" id="firstname" value="" />
                    </div>
                    <div class="col">
                        <div class="errormsg" id="firstnamemsg">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col level">
                        Last name
                    </div>
                    <div class="col">
                        <input name="lastname" id="lastname" type="text" class="txtcol" value="" />
                    </div>
                    <div class="col">
                        <div class="errormsg" id="lastnamemsg">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col level">
                        Card number
                    </div>
                    <div class="col">
                        <input name="cardnumber" id="cardnumber" value="370000000000002" type="text" class="txtcol card" />
                    </div>
                    <div class="col">
                        <div class="errormsg" id="cardnumbermsg">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col level">
                        Expiration code
                    </div>
                    <div class="col">
                        <select name="month" id="month" class="dateyear exp">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>04</option>
                            <option>05</option>
                            <option>06</option>
                            <option>07</option>
                            <option>08</option>
                            <option>09</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                        </select>
                        <select name="year" id="year" class="dateyear exp">
                            <option>2013</option>
                            <option>2014</option>
                            <option>2015</option>
                            <option>2016</option>
                            <option>2017</option>
                            <option>2018</option>
                            <option>2019</option>
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                            <option>2026</option>
                            <option>2027</option>
                            <option>2028</option>
                            <option>2029</option>
                            <option>2030</option>
                        </select>
                    </div>
                    <div class="col">
                        <div class="errormsg" id="expirationdatemsg">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col level">
                        Security code
                    </div>
                    <div class="col">
                        <input name="cvvcode" id="cvvcode" type="text" class="txtcol security" />
                    </div>
                    <div class="col">
                        <div class="securityHelp">
                            <img src="../../Images/security-help.png" />
                            <div class="securityHelpinfo">
                                <span></span>
                                <p>
                                    3-digit Security Code imprinted on the back of Visa, MasterCard, and DiscoverCard.
                                    For American Express it is a 4-digit code found on the front of the card.
                                </p>
                            </div>
                        </div>
                        <div class="errormsg" id="cvvcodemsg">
                        </div>
                    </div>
                </div>
                <h1>
                    Billing Information</h1>
                <div class="row">
                    <div class="col level">
                        Country
                    </div>
                    <div class="col">
                        <select name="country" id="country" class="selectcol">
                            <option>Country Name</option>
                        </select>
                    </div>
                    <div class="col">
                        <div class="errormsg" id="countrymsg">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col level">
                        Company name
                    </div>
                    <div class="col">
                        <input name="firstname" id="Text6" type="text" class="txtcol" value="" />
                    </div>
                    <div class="col">
                        <div class="errormsg" id="Div6">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col level">
                        Billing address
                    </div>
                    <div class="col">
                        <input name="address1" id="address1" type="text" class="txtcol" value="" />
                        <div class="space">
                            &nbsp;
                        </div>
                        <input name="address2" id="Text3" type="text" class="txtcol" value="" />
                    </div>
                    <div class="col">
                        <div class="errormsg" id="address1msg">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col level">
                        City
                    </div>
                    <div class="col">
                        <input name="city" id="city" type="text" class="txtcol" value="" />
                    </div>
                    <div class="col">
                        <div class="errormsg" id="citymsg">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col level">
                        State
                    </div>
                    <div class="col">
                        <input name="state" id="state" type="text" class="txtcol" value="" />
                    </div>
                    <div class="col">
                        <div class="errormsg" id="statemsg">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col level">
                        Postal code
                    </div>
                    <div class="col">
                        <input name="zip" id="zip" type="text" class="txtcol smalltxtbx" value="" />
                    </div>
                    <div class="col">
                        <div class="errormsg" id="zipmsg">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col level">
                        Phone
                    </div>
                    <div class="col">
                        <input name="firstname" id="Text11" type="text" class="txtcol smalltxtbx" value="" />
                    </div>
                    <div class="col">
                        <div class="errormsg" id="Div11">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="stamp">
                        <div class="AuthorizeNetSeal" style="width: 112px">
                            <script type="text/javascript" language="javascript">                                var ANS_customer_id = "dc65eba9-ba41-409e-b42b-6765e6c8199c";</script>
                            <script type="text/javascript" language="javascript" src="//verify.authorize.net/anetseal/seal.js"></script>
                            <div style="font-size: 10px; width: 112px; clear: both;">
                                <a href="http://www.authorize.net/" id="AuthorizeNetText" target="_blank" style="text-align: center">
                                    Online Payment Service</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rightcol" id="confirm">
                <div class="welcomenote">
                    <img src="../../Images/you.png" width="42" height="42" id="userimg" /><p id="wcmsgCheckOut">
                    </p>
                    <p>
                    </p>
                    <input type="hidden" id="UserFnamecheckout" />
                    <input type="hidden" id="UserLnameCheckout" />
                    <input type="hidden" id="UsrMailid" />
                </div>
                <div class="urntwrk">
                    <h2>
                        Your network</h2>
                    <div class="scroll1">
                        <ul id="CheckOutUsers">
                        </ul>
                    </div>
                </div>
                <div class="btm">
                    <div class="total">
                        <div class="totalLeft">
                            Total
                        </div>
                        <div class="totalRight">
                        </div>
                    </div>
                    <input type="submit" value="Check Out" class="signupbtn" />
                    <input type="button" id="cancelCheckout" value="Cancel" class="signupbtn cancel" />
                </div>
            </div>
        </div>
        </form>
    </div>
</asp:Content>
