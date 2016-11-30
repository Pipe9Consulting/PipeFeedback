<%@ Page Title="" Language="C#" MasterPageFile="../Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<%@ Register TagPrefix="CP" TagName="TitleBar" Src="HomeIndex.ascx" %>
<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Home
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <%-- <script src="../../Scripts/ref/jquery-1.8.3.js" type="text/javascript"></script>--%>
    <script src="../../Scripts/responsive.js" type="text/javascript"></script>
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Home/HomeIndex.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Home/aboutbexcellent.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Home/customerstarsgurus.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Home/meetourgurus.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Home/pricing.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Home/Conatct.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Home/FAQ.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/ref/Flip.js" type="text/javascript"></script>
    <script src="../../Scripts/jscript.min.1.7.2.js" type="text/javascript"></script>
    <%-- <script src="http://code.jquery.com/ui/1.8.23/jquery-ui.min.js" type="text/javascript"></script>--%>
    <script src="../../Scripts/ref/Jquery_ui_min_latest.js"></script>
    <link href="../../Styles/flipstyle.css" rel="stylesheet" type="text/css" />
    <link href='https://fonts.googleapis.com/css?family=Arvo' rel='stylesheet' type='text/css'>
    <script src="../../Scripts/ref/Home.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/common.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/FlipDiv.js" type="text/javascript"></script>
    <%--<script src="../../Scripts/dragdiv.js"></script>
    <script src="../../Scripts/ref/mootools.js"></script>--%>
    <script>
        $(document).ready(function () {
            //var drag = new Drag('contactushome', { snap: 0 });
            $('.bukatutup').live('click', function () {
                $('#target').toggle('slow');
            });
            $('.contactsales').live('click', function () {
                $('.callus').toggle();
            });
            $("body").click(
                function (e) {
                    if ((e.target || e.srcElement).className !== "bukatutup") {
                        $('.callus').slideUp('slow');

                    }
                }
            );
            $('#p0,#poepages').click(function () {
                window.location = "/Signup/Poelibrary?location=newPoe";
            });
            $("#dragform").draggable();
            $("#reqdemoform").draggable();
        });
        function SignUpPage() {
            window.location = "/Signup/Register";
        }
        function CheckNumeric(e) {

            if (window.event) // IE
            {
                if ((e.keyCode < 48 || e.keyCode > 57) & e.keyCode != 8) {
                    event.returnValue = false;
                    return false;

                }
            }
            else { // Fire Fox
                if ((e.which < 48 || e.which > 57) & e.which != 8) {
                    e.preventDefault();
                    return false;

                }
            }
        }
    </script>
    <style>
        #dragform
        {
            cursor: move;
        }

        #reqdemoform
        {
            cursor: move;
        }
    </style>

    <input type="hidden" id="ScreenEvent" value="0" />
    <input type="hidden" id="custreftextdata" />
    <div class="popupbg" id="reqdemo">
        <div class="formpopup" id="reqdemoform">
            <div class="closebtn">
                <img src="../../Images/close-hover.png" style="float: right; padding: 0.5% 0; cursor: pointer;">
            </div>
            <img src="../../Images/contact-us.png" />
            <div class="formtransbg">

                <table>

                    <tr>
                        <td>
                            <h1>Request a Demo</h1>
                        </td>
                        <td>
                            <h2>Call: 1 855-923-5556</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>First Name</td>
                        <td class="lftbdr" rowspan="12">
                            <p>Message</p>
                            <div class="texfield">
                                <textarea name="ContactMessage1" id="Textarea1"></textarea>
                            </div>
                            <p class="errormsg" id="P7" style="clear: both; margin: 1.5% 3%;">All Fields Required</p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <textarea rows="1" id="demofirstname" class="contname"></textarea></td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                    </tr>

                    <tr>
                        <td>
                            <textarea rows="1" id="demolastname" class="contname"></textarea></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                    </tr>

                    <tr>
                        <td>
                            <textarea rows="1" id="demoemail" class="contname"></textarea></td>
                    </tr>
                    <tr>
                        <td>Company</td>
                    </tr>

                    <tr>
                        <td>
                            <textarea rows="1" id="demoCompany" class="contname"></textarea></td>
                    </tr>
                    <tr>
                        <td>Title</td>
                    </tr>

                    <tr>
                        <td>
                            <textarea rows="1" id="demotitle" class="contname"></textarea></td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                    </tr>

                    <tr>
                        <td>
                            <textarea rows="1" id="demophone" class="contname"></textarea></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>

                            <input type="button" value="Submit" class="contbtn" id="Button1" onclick="demoformSubmit()" style="background: #e0b001; color: #fff; border: 1px solid #353535; cursor: pointer; padding: 5px;" />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div class="popupbg videobg" id="videoPopup">
    </div>
    <div class="popupholder">
        <div class="popup">
            <div class="close">
            </div>

            <div id="vidprevh">
            </div>
        </div>
    </div>
    <div class="abtvideo">
        <div class="abtvideopopup">
            <%-- <div class="close">
            </div>
            --%>
            <div id="aboutVideo">
            </div>
        </div>
    </div>
    <input type="hidden" id="videolistsOrder" value="0" />
    <input type="hidden" id="subjectMode" value="0" />
    <div class="popupbg" id="formpopup" style="display: block">

        <div class="formpopup" id="dragform">
            <div class="closebtn">
                <img src="../../Images/close-hover.png" style="float: right; padding: 0.5% 0; cursor: pointer;">
            </div>
            <img src="../../Images/contact-us.png" />
            <div class="formtransbg">

                <table>

                    <tr>
                        <td>
                            <h1 id="contactHeader">Contact PIPE9</h1>
                        </td>
                        <td>
                            <h2>Call: 1 855-923-5556</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>First Name</td>
                        <td class="lftbdr" rowspan="12">
                            <p>Message for Sales</p>
                            <div class="texfield">
                                <textarea name="ContactMessage1" id="ContactMessage1"></textarea>
                            </div>
                            <p class="errormsg" id="ContactError1" style="clear: both; margin: 1.5% 3%;">All Fields Required</p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <textarea rows="1" id="contactFirstName1" class="contname"></textarea></td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                    </tr>

                    <tr>
                        <td>
                            <textarea rows="1" id="ContactLastName1" class="contname"></textarea></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                    </tr>

                    <tr>
                        <td>
                            <textarea rows="1" id="ContactEmail1" class="contname"></textarea></td>
                    </tr>
                    <tr>
                        <td>Company</td>
                    </tr>

                    <tr>
                        <td>
                            <textarea rows="1" id="ContactCompany1" class="contname"></textarea></td>
                    </tr>
                    <tr>
                        <td>Title</td>
                    </tr>

                    <tr>
                        <td>
                            <textarea rows="1" id="ContactTitle1" class="contname"></textarea></td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                    </tr>

                    <tr>
                        <td>
                            <textarea rows="1" id="ContactPhoneNumber1" class="contname"></textarea></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>

                            <input type="button" value="Submit" class="contbtn" id="ContactusSubmit1" onclick="contactformsubmit()" style="background: #e0b001; color: #fff; border: 1px solid #353535; cursor: pointer; padding: 5px;" />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div id="indicator">
        <div class="headr">
            <div class="main">
                <div class="accordion">
                    <a href="/" id="imagelogoHome">
                        <%--  <img src="../../Images/belogo-1920.png" alt="Bexcellent" align="left" />--%>
                        <img src="../../Images/kessaku-logo.png" alt="Bexcellent" align="left" />
                    </a>
                </div>
                <div class="topmenu">
                    <ul>
                        <li><a href="/Home/Login">Log In</a></li>
                        <li class="price"><a onclick="myScroll.scrollToPage(3,2)" href="#Pricing">Pricing</a></li>
                        <li><a class="contactsales" href="#Contact Sales ">Contact Sales</a><div class="callus">
                            <div class="skypenumber">
                                +1-855-923-5556
                            </div>
                            <div class="skypeid">
                                skype id : bexcellent.info
                            </div>
                            <div>
                                <a href="mailto:sales@kessaku.com" class="sales">sales@kessaku.com</a>
                            </div>
                        </div>
                        </li>
                        <li class=""><a onclick="SignUpPage()">Free Trial</a></li>
                        <li class="vdo pd"><a onclick="myScroll.scrollToPage(1,1)" href="#Testimonials">Testimonials</a></li>
                        <li class="btnclkfirstpage lab"><a onclick="myScroll.scrollToPage(1,11)" href="#Learn More">Learn More</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="homefooter">
        <div class="main">
            <div class="footermenu">
                <ul>
                    <li class="rad"><a href="#Home">Request a Demo</a></li>
                    <li class="mos"><a onclick="myScroll.scrollToPage(4,3)" href="#Meet our Stars">Attend a Webinar</a></li>
                    <li class="mog"><a onclick="myScroll.scrollToPage(4,4)" href="#Meet our Gurus">Read Latest Blog</a></li>
                    <li class="FQ" class="FAQ"><a onclick="myScroll.scrollToPage(6,2)" href="#Frequently Asked Questions">FAQ</a></li>
                </ul>
            </div>
            <div class="slidebtn">
                <a href="#" class="prev" id="p0">Previous</a> <a onclick="myScroll.scrollToPage(0)"
                    href="#Home" class="prev" id="p1">Previous</a> <a onclick="myScroll.scrollToPage(1)"
                        href="#About_Kessaku" class="prev" id="p2">Previous</a> <a onclick="myScroll.scrollToPage(2)"
                            href="#Customers-Stars-Gurus" class="prev" id="p3">Previous</a> <a onclick="myScroll.scrollToPage(3)"
                                href="#Pricing & Packages" class="prev" id="p4">Previous</a> <a onclick="myScroll.scrollToPage(4)"
                                    href="#Meet Our Gurus" class="prev" id="p5">Previous</a><a onclick="myScroll.scrollToPage(5)"
                                        href="#Contact Us" class="prev" id="p6">Previous</a>
                <div class="pagination pg1">
                    Home
                </div>
                <div class="pagination pg2">
                    About PIPE9
                </div>
                <div class="pagination pg3">
                    Customers / Stars / Gurus
                </div>
                <div class="pagination pg4">
                    Pricing & Packages
                </div>
                <div class="pagination pg5">
                    Meet our Gurus
                </div>
                <div class="pagination pg6">
                    Contact Us
                </div>
                <div class="pagination pg7">
                    Frequently Asked Questions
                </div>
                <a onclick="myScroll.scrollToPage(1)" href="#About_bexcellent" class="nxt" id="bn1">Next</a> <a onclick="myScroll.scrollToPage(2)" href="#Customers-Stars-Gurus" class="nxt"
                    id="bn2">Next</a> <a onclick="myScroll.scrollToPage(3)" href="#Pricing & Packages"
                        class="nxt" id="bn3">Next</a> <a onclick="myScroll.scrollToPage(4)" href="#Meet Our Gurus"
                            class="nxt" id="bn4">Next</a> <a onclick="myScroll.scrollToPage(5)" href="#Contact Us"
                                class="nxt" id="bn5">Next</a> <a onclick="myScroll.scrollToPage(6)" href="#Frequently Asked Questions"
                                    class="nxt" id="bn6">Next</a>
            </div>
            <div class="hmcopyright">
                <div class="copyright">
                    <span>© 2013 Kessaku.com</span> <span class="contactus"><a onclick="myScroll.scrollToPage(5,16)" href="#Contact-Us">Contact
                        Us</a></span>
                </div>
            </div>
            <div class="bukatutup">
                <span>
                    <img src="../../Images/footer-menu.png" /></span><p>
                        Menu
                    </p>
            </div>
            <div id="target">
                <ul>
                    <li><a href="/Home/Login"><span>
                        <img src="../../Images/icons/login-white.png" /></span><p>
                            Login to PIPE9
                        </p>
                    </a></li>
                    <li class="poebenefits btnclkfirstpage lab"><a onclick="myScroll.scrollToPage(1,11)">
                        <span>
                            <img src="../../Images/icons/learn-small.png" /></span><p>
                                Learn about PIPE9
                            </p>
                    </a></li>
                    <li id="poepages"><a><span>
                        <img src="../../Images/icons/library-white.png" /></span><p>
                            View our Role Excellence Profiles
                        </p>
                    </a></li>
                    <li class="moc"><a onclick="myScroll.scrollToPage(2,3)"><span>
                        <img src="../../Images/icons/customer-white.png" /></span><p>
                            Meet Our Customers/ Stars/ Gurus
                        </p>
                    </a></li>
                    <li class="lvideo vdo pd"><a onclick="myScroll.scrollToPage(4,1)"><span>
                        <img src="../../Images/icons/play-video-white.png" /></span><p>
                            Play our latest Video
                        </p>
                    </a></li>
                    <li class="price"><a onclick="myScroll.scrollToPage(3,21)"><span>
                        <img src="../../Images/icons/pricing-white.png" /></span><p>
                            Review Pricing & Packages
                        </p>
                    </a></li>
                    <li class="mog"><a onclick="myScroll.scrollToPage(4,4)"><span>
                        <img src="../../Images/icons/customer-white.png" /></span><p>
                            Read Latest Blog
                        </p>
                    </a></li>
                    <li class="mos"><a onclick="myScroll.scrollToPage(4,3)"><span>
                        <img src="../../Images/icons/guru-white.png" /></span><p>
                            Attend a meeting
                        </p>
                    </a></li>
                    <li class="contactus"><a onclick="myScroll.scrollToPage(5,16)"><span>
                        <img src="../../Images/icons/contact-white.png" /></span><p>
                            Contact Us
                        </p>
                    </a></li>
                    <li class="FQ"><a onclick="myScroll.scrollToPage(6,10)"><span>
                        <img src="../../Images/icons/faq-white.png" /></span><p>
                            FAQ
                        </p>
                    </a></li>
                </ul>
            </div>
        </div>
    </div>
    <div id="wrapper">
        <div id="scroller">
            <ul>
                <!--Page One-->
                <li id="homeIndex">
                    <CP:TitleBar ID="homeIndexes" runat="server"></CP:TitleBar>
                </li>
                <!--End of Page One-->
                <!--Page Two-->
                <li id="homeIndex1"></li>
                <!--End of Page Two-->
                <!--Page Three-->
                <li id="homeIndex2"></li>
                <!--End of Page Three-->
                <!--Page Four-->
                <!--End of Page Four-->
                <!--Page Five-->
                <li id="homeIndex3"></li>
                <li id="homeIndex4"></li>
                <!--End of Page Five-->
                <li id="homeIndex5"></li>
                <li id="homeIndex6" name="FAQ" class="FAQ"></li>
            </ul>
        </div>
    </div>
    
    <div class="clearfix">
        <div class="main">
            <ul id="tips">
                <li>
                    <p>
                    </p>
                </li>
                <li>
                    <p>
                    </p>
                </li>
                <li>
                    <p>
                    </p>
                </li>
                <li>
                    <p>
                    </p>
                </li>
                <li>
                    <p>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</asp:Content>