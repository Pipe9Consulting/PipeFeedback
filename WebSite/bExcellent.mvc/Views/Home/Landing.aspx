<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Landing
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/mystyle.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/grid.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/landing.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        $(document).ready(function () {
            $(".landingpage img").hide(0).delay(1000).fadeIn(1000)
        });
    </script>
    <div class="landingpage">
        <img src="../../Images/landing-bg.png" />
    </div>
    <div class="contenholder">
        <div class="txtbox">
        <div class="leftcolumn">
            <h1>
                Institutionalize Role Excellence
            </h1>
            <p>
                Based on work carried out with a number of early adopting companies including Microsoft
                we have developed an exciting new way to Institutionalize Sales, Marketing and Leadership
                Excellence with amazing results. Attend our forthcoming evening Roundtable series
                in Seattle and Bellevue to hear our story with a twist and network with other people
                in roles just like yours. Places are limited, Link to Registration here
            </p>
            <div class="register"><a href="http://www.eventbrite.com/org/4545862841" target="_blank">Click here to register</a></div>
            </div>
                    <div class="rightcolumn">
                        <div class="imgholder"><img src="../../Images/landing-img1.png" /></div>
                        <p>Hyatt Regency Hotel in Bellevue, Monday October 21st, 5pm – 7.30pm</p>

                        <div class="imgholder"><img src="../../Images/landing-img2.png" /></div>
                        <p>Pan Pacific Hotel in Seattle, Southlake, Tuesday
October 22nd, 5pm – 7.30pm</p>

                        </div>
        </div>
    </div>
</asp:Content>
