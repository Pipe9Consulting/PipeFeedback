<%--<script src="../../Scripts/ref/Home.js" type="text/javascript"></script>--%>
<%--<script src="../../Scripts/ref/FlipDiv.js" type="text/javascript"></script>--%>
<%--<script src="../../Scripts/ref/Home.js" type="text/javascript"></script>--%>
<script src="../../Scripts/ref/HomePageVideo.js" type="text/javascript"></script>
<script type="text/javascript">
    //<![CDATA[
    $(window).load(function () {
        $("#status").fadeOut(); // will first fade out the loading animation
        $("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
        $('#vidh01').live('click', function () {
            var values = parseInt($(this).attr('name'));
            $('#videolistsOrder').val(values);
            //var t = $('#formpopup').html();
            //$('#formpopup').html(" ");
            //$('#formpopup').append(t);
            $('.formpopup,#formpopup').show();
        });
        $('#vidh02').live('click', function () {
            $('#subjectMode').val(1);
            $('#contactHeader').text("Contact Kessaku");
            /// <reference path="../../Video/The Profile of Excellence Story.flv" />
            var values = parseInt($(this).attr('name'));
            $('#videolistsOrder').val(values);
            //var t = $('#formpopup').html();
            //$('#formpopup').html(" ");
            //$('#formpopup').append(t);
            $('.formpopup,#formpopup').show();
        });
        $('#vidh03').live('click', function () {
            $('#subjectMode').val(1);
            $('#contactHeader').text("Contact Kessaku");
            /// <reference path="../../Video/The Kessaku Story.flv" />
            var values = parseInt($(this).attr('name'));
            $('#videolistsOrder').val(values);
            //var t = $('#formpopup').html();
            //$('#formpopup').html(" ");
            //$('#formpopup').append(t);
            $('.formpopup,#formpopup').show();
        });
    })
    //]]>
</script>
<div class="pageholderhome">
    <div class="spotlightdivholder">
        <div class="spotlightcont">
            <div class="spotlight">
                <div class="spotlightdiv">
                    <div class="bigtile">
                        <div class="live-tile bigtile white" data-direction="horizontal" data-mode="flip"
                            data-initdelay="5000" data-delay="15000">
                            <div class="bigtile" style="z-index: 1">
                                <img src="../../Images/home-bg1.png" />
                                <%--<div class="everyone bigtilev">
                                    <div>
                                        Define Your
                                    </div>
                                    <span></span>
                                </div>
                                <div class="bigtiletitle">
                                    Profile for Excellence at Work
                                </div>--%>
                            </div>
                            <div class="bigtile" style="z-index: 1">
                                <img src="../../Images/home-bg.png" />
                                <%--<div class="everyone  everyone1 bigtilev">
                                    <div>
                                        As used by
                                    </div>
                                    <span></span>
                                </div>
                                <div class="bigtiletitle">
                                    Microsoft
                                </div>--%>
                            </div>
                        </div>
                    </div>
                    <!--First tile-->
                    <div class="smalltile">
                        <div class="live-tile gray" data-direction="horizontal" data-mode="flip" data-initdelay="15000"
                            data-delay="15000">
                            <div class="smalltile">
                                <div class="everyone">
                                    <div>
                                        Everyone's
                                    </div>
                                    <span>
                                        <img src="../../Images/everyone.png" /></span>
                                </div>
                                <div class="fullimg">
                                    <img src="../../Images/icons/align-home.png" />
                                </div>
                                <div class="nonbgsmalltitle">
                                    Aligned
                                </div>
                            </div>
                            <%--<div class="smalltile">
                                <div class="everyone">
                                    <div>
                                        Recognize
                                    </div>
                                    <span></span>
                                </div>
                                <img src="../../Images/icons/recognize-white.png" class="you recognize" />
                                <div class="nonbgsmalltitle">
                                    Great Work
                                </div>
                            </div>--%>
                            <div class="smalltile">
                                <div class="everyone">
                                    <div>
                                        Recognize
                                    </div>
                                    <span>
                                        <img src="../../Images/everyone.png" /></span>
                                </div>
                                <img src="../../Images/icons/recognize-home.png" class="fullimg1" />
                                <div class="nonbgsmalltitle">
                                    Great Work
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--2nd Tile-->
                    <div class="smalltile white-tile" id="vidh01" name="1">
                        <div class="everyone">
                            <div>
                                Watch Our
                            </div>
                            <span>
                                <img src="../../Images/everyone.png" /></span>
                        </div>
                        <img src="../../Images/video.png" class="you recognize" />
                        <div class="nonbgsmalltitle">
                            <p>
                                Sketch Video
                            </p>
                        </div>
                    </div>
                    <!--3rd tile-->
                    <div class="smalltile">
                        <div class="live-tile gray" data-direction="horizontal" data-mode="flip" data-initdelay="15000"
                            data-delay="15000">
                            <div class="smalltile">
                                <div class="everyone">
                                    <div>
                                        Everyone's
                                    </div>
                                    <span>
                                        <img src="../../Images/everyone.png" /></span>
                                </div>

                                <img src="../../Images/icons/network-home.png" class="fullimg1" />

                                <div class="nonbgsmalltitle">
                                    in the Feedback Loop
                                </div>
                            </div>
                            <div class="smalltile">
                                <div class="everyone">
                                    <div>
                                        Identify
                                    </div>
                                    <span>
                                        <img src="../../Images/everyone.png" /></span>
                                </div>
                                <img src="../../Images/icons/identify-home.png" class="fullimg1" />
                                <div class="nonbgsmalltitle">
                                    Top Performers
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--4th tile-->
                    <div class="smalltile white-tile" id="vidh02" name="2">
                        <div class="everyone">
                            <div>
                                Watch Our
                            </div>
                            <span>
                                <img src="../../Images/everyone.png" /></span>
                        </div>
                        <img src="../../Images/microsoft.png" class="you recognize" />
                        <div class="nonbgsmalltitle">
                            <p>
                                Testimonial
                            </p>
                        </div>
                    </div>
                    <!--5th tile-->
                    <div class="smalltile">
                        <div class="live-tile gray" data-direction="horizontal" data-mode="flip" data-initdelay="10000"
                            data-delay="15000">
                            <div class="smalltile poepage" style="cursor: pointer">
                                <%--<div class="new">
                                    <img src="../../Images/new.png" width="68" height="67" />
                                </div>--%>
                                <img src="../../Images/CloudBusiness.jpg" class="pic" />
                                <div class="smalltiletitle">
                                    <p>Cloud Business</p>
                                </div>
                            </div>
                            <div class="smalltile poepage" style="cursor: pointer">
                                <div class="new">
                                    <img src="../../Images/new.png" width="68" height="67" />
                                </div>
                                <img src="../../Images/LeadersMaketheFuture_poe.png" class="pic" />
                                <div class="smalltiletitle">
                                    <p>
                                        Leaders Make<br />
                                        the Future
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--6th tile-->
                    <div class="smalltile">
                        <div class="live-tile gray" data-direction="horizontal" data-mode="flip" data-initdelay="10000"
                            data-delay="15000">
                            <div class="smalltile poepage" style="cursor: pointer">
                                <img src="../../Images/human-selling.jpg" class="pic" />
                                <div class="smalltiletitle ">
                                    <p>Human Selling</p>
                                </div>
                            </div>
                            <div class="smalltile poepage" style="cursor: pointer">

                                <img src="../../Images/challenger-sale.jpg" class="pic" />
                                <div class="smalltiletitle">
                                    <p>Challenger Selling</p>
                                </div>
                            </div>
                            <%--<div class="smalltile poepage" style="cursor: pointer">
                                <div class="new">
                                    <img src="../../Images/coming-soon.png" width="68" height="67" />
                                </div>
                                <img src="../../Images/sollution-seller.jpg" class="pic" />
                                <div class="smalltiletitle">
                                    <p>Solution Selling</p>
                                </div>
                            </div>--%>
                        </div>
                    </div>
                    <!--7th tile-->
                    <div class="smalltile">
                        <div class="live-tile gray" data-direction="horizontal" data-mode="flip" data-initdelay="10000"
                            data-delay="15000">
                            <div class="smalltile poepage" style="cursor: pointer">
                                <img src="../../Images/icons/home-library.png" class="pic" />
                                <div class="nonbgsmalltitle">
                                    Build Your Own REPs or Choose from Our Library
                                </div>
                            </div>
                            <div class="smalltile poepage" style="cursor: pointer">
                                <img src="../../Images/icons/home-library.png" class="pic" />
                                <div class="nonbgsmalltitle">
                                    Build Your Own REPs or Choose from Our Library
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--8th tile-->
                    <div class="smalltile">
                        <div class="live-tile gray" data-direction="horizontal" data-mode="flip" data-initdelay="15000"
                            data-delay="15000">
                            <div class="smalltile">
                                <div class="everyone">
                                    <div>
                                        Everyone
                                    </div>
                                    <span>
                                        <img src="../../Images/everyone.png" /></span>
                                </div>
                                <div class="fullimg">
                                    <img src="../../Images/icons/standing-home.png" />
                                </div>
                                <div class="nonbgsmalltitle">
                                    Knows Where They Stand
                                </div>
                            </div>
                            <div class="smalltile">
                                <div class="everyone">
                                    <div>
                                        Grow
                                    </div>
                                    <span>
                                        <img src="../../Images/everyone.png" /></span>
                                </div>
                                <img src="../../Images/icons/grow-home.png" class="fullimg1" />
                                <div class="nonbgsmalltitle">
                                    Pool of Top Performers
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--9th tile-->
                    <div class="smalltile black-tile" id="vidh03" name="3">
                        <div class="everyone">
                            <div>
                                Nick Saban's
                            </div>
                            <span>
                                <img src="../../Images/everyone.png" /></span>
                        </div>
                        <img src="../../Images/newsletter/NickSaban1.png" class="you recognize" />
                        <div class="nonbgsmalltitle">
                            <p class="nick">
                                Quest for Perfection
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mypoearea">
        <h2>Kessaku is the Coach in the Cloud for you, your team and your company.
        </h2>
        <h3>Role Excellence Profiles align people and let everyone take control of their own Performance.
            Choose from our library or build your own.
        </h3>
        <div class="homesignup">
            <h1>Learn more about the Kessaku Cloud!
            </h1>
            <div class="textareaholder">
                <span>
                    <input type="text" id="emailid" class="txtarea" value="enter your email address"
                        name="Signup"></span>
            </div>
            <div id="signupbtn" class="btn">
                <p>Sign up</p>
            </div>
            <div id="yammerLogin" class="btnYammer">
                <p>Sign up using Yammer</p>
            </div>
        </div>
        <%--<div class="homeleftbtm">
                                    <ul>
                                        <li id="login"><a href="#" onclick="myScroll.scrollToPage(0)">
                                            <img src="../../Images/icons/login.png"><span>Login to
                                                <br>
                                                Kessaku</span></a> </li>
                                        <li class="right"><a href="#">
                                            <img src="../../Images/icons/poe-library.png"><span>View our Profiles
                                                <br>
                                                of Excellence</span></a> </li>
                                        <li class="poebenefits btnclkfirstpage"><a href="#" onclick="myScroll.scrollToPage(2)">
                                            <img src="../../Images/icons/learn.png"><span>Learn about Kessaku</span> </a>
                                        </li>
                                        <li class="right"><a href="#" onclick="myScroll.scrollToPage(1)">
                                            <img src="../../Images/icons/meetguru.png"><span>Meet our
                                                <br>
                                                Gurus</span></a></li>
                                        <li class="lvideo vdo"><a href="#" onclick="myScroll.scrollToPage(2)">
                                            <img src="../../Images/icons/playdemo.png"><span>Play our
                                                <br>
                                                latest video</span></a></li>
                                        <li class="right"><a href="#" onclick="myScroll.scrollToPage(1)">
                                            <img src="../../Images/icons/customers.png"><span>Meet our<br>
                                                Customers </span></a></li>
                                        <li><a href="#">
                                            <img src="../../Images/icons/pricing.png"></a><a href="#" onclick="myScroll.scrollToPage(4)"><span>Review
                                                pricing
                                                <br>
                                                packages</span></a></li>
                                        <li class="right"><a href="#" onclick="myScroll.scrollToPage(1)">
                                            <img src="../../Images/icons/stars-gray.png"><span>Meet our
                                                <br>
                                                Stars</span> </a></li>
                                    </ul>
                                </div>--%>
        <%--<div class="testimonial">
            <ul>
                <li><a href="../SignUp/Register" class="gworkshop VLE" id="A1">Free Trial for ASTD members
                </a>
                    <br />
                    <a onclick="myScroll.scrollToPage(4,3)" class="gworkshop VLE" id="events">Free Webinar
                        for ASTD Members </a></li>
            </ul>
        </div>--%>
        <div class="MS">
            <ul>
                <li>
                    <img alt="Microsoft" src="../../Images/icons/ms.png"></li>
                <li>As used by Microsoft</li>
            </ul>
        </div>
    </div>
</div>