<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/SignUp.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    AddMember
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/signup/addmember.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/ref/Signup/thankyou.js"></script>
    <%-- <script src="../../Scripts/ref/Signup/signup.js"></script>--%>
    
    <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb">
            <a href="../Common/Index">Home </a>> Thank you
        </div>
    </div>

    <div class="pageholder">
        
        <h1>Thank you</h1>
        <div class="signuptile">
            <div class="img">
                <img src="../Images/icons/thankyou.png" alt="Thank you" />
            </div>
            <p>
                Thank you
            </p>
        </div>
        <%--<div class="contenthold">
            <form name="thankyou" action='' id="thankyou">
                <div class="checkoutcol">
                    <div id='toname'>
                    </div>
                    <br />
                    <p id="orderinfo">
                    </p>
                    <p>
                        Thank you for adding the following individuals to your Network:
                    </p>
                    <div class="row">
                        <div class="address">
                            Name :
                        </div>
                        <div id="name" class="address1">
                        </div>
                    </div>
                    <div class="clr">
                        <div class="row">
                            <div class="address">
                                Address:
                            </div>
                            <div class="address1" id="address">
                            </div>
                        </div>
                        <div class="print" id="print">
                            Print receipt
                        </div>
                        <div class="startbtn" id="start">
                            Start
                        </div>
                    </div>
                </div>
            </form>
        </div>--%>

        <div class="contenthold">
            <form name="thankyou" action='' id="thankyou">
                <div class="checkoutcol">
                    <div id='toname'>
                    </div>
                    <br />
                    <p id="orderinfo">
                    </p>
                    <p>
                        Thank you for adding the following individuals to your Network:
                    </p>
                    <div id="thankyouCont">
                        <div class="row clr">
                            <div class="address">Name, relationship </div>
                        </div>
                        <div class="row">
                            <div class="address">Ravi, Brother</div>
                        </div>
                    </div>
                    <div class="clr">

                        <div style="clear: both;"></div>
                        <div class="startbtn" id="start2" style="display: none">
                            Start
                        </div>

                        <div class="startbtn" id="start" style="padding: 1% 6% 1.5% 1% !important; background-size: 6% auto !important; width: 55% !important; background-position: 98% center !important;">
                            Return to your Network to see your new additions
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</asp:Content>