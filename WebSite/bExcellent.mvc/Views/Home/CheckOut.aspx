<%@ Page Title="" Language="C#" MasterPageFile="../Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Home
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script type="text/javascript">

        $(function () {
            $('#emailid').focus(function () {
                $(this).val('');
            });
        });
    </script>
    <script src="../../Scripts/ref/Account/Login.js" type="text/javascript"></script>
    <div class="pageholder">
        <div class="homeleft">
        </div>
        <div class="homesignup">
            <h1>
                Checkout
            </h1>
            //
            <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick">
            <input type="hidden" name="hosted_button_id" value="DZ9T572VXXD5S">
            <input type="hidden" id="amount" value="0" />
             <input type="hidden" id="plansClicked" value="0" />
            <input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_subscribeCC_LG.gif"
                border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
            <img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif"
                width="1" height="1">
            </form>
            //
            <%-- <form action="/Home/PayAmount" method="post">
            <label>
                Selected Product is
                <%=Request.QueryString["itemname"]??"" %>, Amount is $<%=Request.QueryString["amount"]??"0.00" %>
                <input type="hidden" name="item_name" value="<%=Request.QueryString["itemname"]??"" %>" />
                <input type="hidden" name="amount" value="<%=Request.QueryString["amount"]??"0.00" %>" />
            </label>
            <br />
            <br />
            <input type="submit" class="btn" value="Buy!" />
            </form>--%>
        </div>
        <div class="clr">
        </div>
        <div class="homerightbtm">
            <%-- <h1>
                Lorem ipsum dolor sit amet</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies semper
                pulvinar. Sed odio massa, luctus at pretium feugiat, adipiscing sit amet massa.
                Cras eleifend lectus in lacus dignissim ac dapibus dolor rutrum.
            </p>
            <p>
                Sed dictum molestie velit, a dignissim augue varius vitae. Donec turpis magna, ornare
                venenatis porta eu, lobortis a felis. Donec et mi sem, vel dignissim magna. Ornare
                venenatis porta eu, Duis porta, neque a fermentum pretium, orci felis mattis libero,
                non imperdiet ante ipsum accumsan est.</p>--%>
            <p>
                <div class="testimonial">
                    <ul>
                        <li>
                            <img src="../../Images/icons/testimonial.png" alt="Testimonial" /></li>
                        <li>Testimonial Video</li>
                    </ul>
                </div>
                <div class="MS">
                    <ul>
                        <li>
                            <img src="../../Images/icons/ms.png" alt="Microsoft" /></li>
                        <li>As used by Microsoft</li>
                    </ul>
                </div>
            </p>
        </div>
    </div>
</asp:Content>