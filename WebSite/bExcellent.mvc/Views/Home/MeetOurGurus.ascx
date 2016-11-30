<script src="../../Scripts/ref/Home.js" type="text/javascript"></script>
<script src="../../Scripts/ref/LoadStaticContent.js"></script>
<%--<script src="../../Scripts/ref/scroller.js" type="text/javascript"></script>--%>
<script src="../../Scripts/ref/Account/twitter.js" type="text/javascript"></script>
<%--<script src="../../Scripts/prettify.js" type="text/javascript"></script>--%>
<script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        $('.scroll3').slimScroll();
        $('.scroll4').slimScroll();
        $('.scroll5').slimScroll();
        $('.scroll6').slimScroll();
        $('.scroll7').slimScroll();
        $('.scroll8').slimScroll();
    });
    Common.ajaxtxt({
        url: "/StaticContents/LatestNewsContents.txt",
        data: null,
        success: function (response) {
            var html = '';
            var jsondata = $.parseJSON(response);

            for (i = 0; i < jsondata.length; i++) {
                html = html + " <li><div class='paragraph newsparagraph'><p> <div class='hd'>" + jsondata[i].name + "</div> <div class='dateNews'>" + jsondata[i].date + " </div></p> <p><div class='img'> <img src='" + jsondata[i].image + "' /></div>" + jsondata[i].text + "<a href=" + jsondata[i].link + ">More</a></p> </div> </li>";
            }
            $('#latestNewsData').html(html);
        },
        error: function (err) {
        }
    });
</script>
<div class="pageholder">
    <div id="customertiles">
        <div class="breadcrumb">
            Home > Meet our Gurus
        </div>
        <div class="customertiles stars last">
            <h1>
                Meet Alan Dowzall</h1>
            <ul>
                <li><a>
                    <div class="guruimg">
                        <img src="../../Images/guru-pic.png" width="129" height="128" />
                    </div>
                    <div class="caption">
                        <p>
                            Alan Dowzall
                        </p>
                    </div>
                </a></li>
                <li class="gblog"><a>
                    <div class="icon">
                        <img src="../../Images/icons/blog-icon.png" alt="Customers" />
                    </div>
                    <p>
                        Alan’s Blog
                    </p>
                </a></li>
                <li class="gbfavlog"><a>
                    <div class="icon">
                        <img src="../../Images/icons/fav-blog.png" alt="Customers" />
                    </div>
                    <p>
                        Alan’s Favorite Blogs
                    </p>
                </a></li>
                <li class="rectangle2 gcrpg"><a>
                    <div class="icn">
                        <img src="../../Images/icons/reference.png" alt="Customers" /></div>
                    <p>
                        Customer References
                    </p>
                </a></li>
                <%--<li class="rectangle gcrpg"><a>
                                            <div>
                                                <div id="flipbox1" class="flipdiv flip-front ha">
                                                    <p>
                                                        Hello! I'm a flip-box! :)</p>
                                                </div>
                                            </div>
                                        </a>
                                            <%--  <div class="live-tile" data-mode="flip">
                                                <div id="flip1" class="flipdiv">
                                                    <p>
                                                        Phasellus eget nulla felis, id semper</p>
                                                </div>
                                                <div id="flip2" class="flipdiv">
                                                    <p>
                                                        Phasellus eget nulla felis, id semper</p>
                                                </div>
                                            </div>--%>
                <%--<div id="flipdiv2" class="flipbox flipbox-forward" data-color="#e0b001" data-direction="rl"
                                                data-current="0">
                                                <a>
                                                    <p id="fliponload2">
                                                        before</p>
                                                </a>
                                            </div>
                                        </li>--%>
                <!--<li class="rectangle"><div class="live-tile" data-mode="flip">
        <div style="background-color:#808080;">Phasellus eget nulla felis, id semper eros. Quisque vel sollicitudin orci. Praesent nibh odio</div>
        <div style="background-color:#deae02;">Phasellus eget nulla felis, id semper eros. Quisque vel sollicitudin orci. Praesent nibh odio</div>
    </div></li>-->
                <li class="gworkshop"><a>
                    <div class="icon">
                        <img src="../../Images/icons/workshop.png" alt="Customers" />
                    </div>
                    <p>
                        Role Excellence Profile Events
                    </p>
                </a></li>
                <li class="gnews"><a>
                    <div class="icon">
                        <img src="../../Images/icons/news.png" alt="Customers" />
                    </div>
                    <p>
                        Latest News on Alan Dowzall
                    </p>
                </a></li>
                <li class="glink"><a target="_blank" href="https://linkedin.com/pub/alan-dowzall/1a/777/a62">
                    <div class="icon">
                        <img src="../../Images/icons/linkedin.png" alt="Customers" />
                    </div>
                    <p>
                        Linked-in with Alan
                    </p>
                </a></li>
                <li class="gtweet"><a id="latestTwitter">
                    <div class="icon">
                        <img src="../../Images/icons/twitter.png" alt="Customers" />
                    </div>
                    <br />
                    <p>
                        Read Alan’s Latest Tweets
                    </p>
                </a></li>
            </ul>
        </div>
        <div class="customertiles gurus">
            <div class="blog blogpg">
                <div class="header">
                    <a href="http://alandowzall.com/" target="_blank">
                        <h1>
                            Alan's Blog</h1>
                    </a>
                </div>
                <div class="blogback">
                    <img src="../../Images/faq-bg.png" />
                    <div class="gurucont">
                        <%-- <div class="scrollbar1">
                    <div class="scrollbar">
                        <div class="track">
                            <div class="thumb">
                                <div class="end">
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="viewport">
                    <div class="overview">--%>
                    <div class="scroll7">
                        <ul id="blogData">
                            <%--<li>
                                                <div class="subhead">
                                                    <div class="img">
                                                        <img src="../../Images/icons/blog-gray.png" /></div>
                                                </div>
                                                <div class="paragraph">
                                                    <p>
                                                        <div class="date">
                                                            3/12/2013 -</div>
                                                        <div class="hd">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                                                    </p>
                                                    <p>
                                                        Blog content blog content blog content, blog content, blog content, blog content,
                                                        blog content, blog content, blog content, blog content, blog content, blog content,
                                                        blog content, latest Blog, Latest Blog, Latest Blog.</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="subhead">
                                                    <div class="img">
                                                        <img src="../../Images/icons/blog-gray.png" /></div>
                                                </div>
                                                <div class="paragraph">
                                                    <p>
                                                        <div class="date">
                                                            3/12/2013 -</div>
                                                        <div class="hd">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                                                    </p>
                                                    <p>
                                                        Blog content blog content blog content, blog content, blog content, blog content,
                                                        blog content, blog content, blog content, blog content, blog content, blog content,
                                                        blog content, latest Blog, Latest Blog, Latest Blog.</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="subhead">
                                                    <div class="img">
                                                        <img src="../../Images/icons/blog-gray.png" /></div>
                                                </div>
                                                <div class="paragraph">
                                                    <p>
                                                        <div class="date">
                                                            3/12/2013 -</div>
                                                        <div class="hd">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                                                    </p>
                                                    <p>
                                                        Blog content blog content blog content, blog content, blog content, blog content,
                                                        blog content, blog content, blog content, blog content, blog content, blog content,
                                                        blog content, latest Blog, Latest Blog, Latest Blog.</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="subhead">
                                                    <div class="img">
                                                        <img src="../../Images/icons/blog-gray.png" /></div>
                                                </div>
                                                <div class="paragraph">
                                                    <p>
                                                        <div class="date">
                                                            3/12/2013 -</div>
                                                        <div class="hd">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                                                    </p>
                                                    <p>
                                                        Blog content blog content blog content, blog content, blog content, blog content,
                                                        blog content, blog content, blog content, blog content, blog content, blog content,
                                                        blog content, latest Blog, Latest Blog, Latest Blog.</p>
                                                </div>
                                            </li>
                                            <li></li>--%>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%--  </div>--%>
    </div>
    <!--Blog End-->
    <div class="customertiles gurus">
        <div class="blog favblogpg">
            <div class="header">
                <h1>
                    Alan’s Favorite Blogs</h1>
                <div class="hdright">
                    Read all Blogs
                </div>
            </div>
            <div class="blogback">
                <img src="../../Images/faq-bg.png" />
                <div class="gurucont">
                    <div class="scroll8">
                    <ul id="favBlogdata">
                        <%--<li>
                                                <div class="subhead">
                                                    <div class="img">
                                                        <img src="../../Images/icons/fav-blog-gray.png" /></div>
                                                </div>
                                                <div class="paragraph">
                                                    <p>
                                                        <div class="date">
                                                            3/12/2013 -</div>
                                                        <div class="hd">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                                                    </p>
                                                    <p>
                                                        Blog content blog content blog content, blog content, blog content, blog content,
                                                        blog content, blog content, blog content, blog content, blog content, blog content,
                                                        blog content, latest Blog, Latest Blog, Latest Blog.</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="subhead">
                                                    <div class="img">
                                                        <img src="../../Images/icons/fav-blog-gray.png" /></div>
                                                </div>
                                                <div class="paragraph">
                                                    <p>
                                                        <div class="date">
                                                            3/12/2013 -</div>
                                                        <div class="hd">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                                                    </p>
                                                    <p>
                                                        Blog content blog content blog content, blog content, blog content, blog content,
                                                        blog content, blog content, blog content, blog content, blog content, blog content,
                                                        blog content, latest Blog, Latest Blog, Latest Blog.</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="subhead">
                                                    <div class="img">
                                                        <img src="../../Images/icons/fav-blog-gray.png" /></div>
                                                </div>
                                                <div class="paragraph">
                                                    <p>
                                                        <div class="date">
                                                            3/12/2013 -</div>
                                                        <div class="hd">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                                                    </p>
                                                    <p>
                                                        Blog content blog content blog content, blog content, blog content, blog content,
                                                        blog content, blog content, blog content, blog content, blog content, blog content,
                                                        blog content, latest Blog, Latest Blog, Latest Blog.</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="subhead">
                                                    <div class="img">
                                                        <img src="../../Images/icons/fav-blog-gray.png" /></div>
                                                </div>
                                                <div class="paragraph">
                                                    <p>
                                                        <div class="date">
                                                            3/12/2013 -</div>
                                                        <div class="hd">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                                                    </p>
                                                    <p>
                                                        Blog content blog content blog content, blog content, blog content, blog content,
                                                        blog content, blog content, blog content, blog content, blog content, blog content,
                                                        blog content, latest Blog, Latest Blog, Latest Blog.</p>
                                                </div>
                                            </li>
                                            <li></li>--%>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <%-- </div>--%>
    <!--Favourite Blog End-->
    <div class="customertiles gurus">
        <div class="blog crpg">
            <div class="header">
                <h1>
                    Customer References</h1>
            </div>
            <div class="blogback">
                <img src="../../Images/faq-bg.png" />
                <div class="gurucont">
                    <div class="scroll3">
                        <ul id="latestCustomerData">
                            <li>
                                <div class="subhead">
                                    <div class="img">
                                        <img src="../../Images/icons/workshop-gray.png" />
                                    </div>
                                </div>
                                <div class="paragraph">
                                    <p>
                                        <div class="dt">
                                            26-Sep-13
                                        </div>
                                        <div class="venue">
                                            Venue
                                        </div>
                                    </p>
                                    <p>
                                        Blog content blog content blog content, blog content, blog content, blog content,
                                        blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                    </p>
                                    <div class="register">
                                        Click here to register
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="subhead">
                                    <div class="img">
                                        <img src="../../Images/icons/workshop-gray.png" />
                                    </div>
                                </div>
                                <div class="paragraph">
                                    <p>
                                        <div class="dt">
                                            26-Sep-13
                                        </div>
                                        <div class="venue">
                                            Venue
                                        </div>
                                    </p>
                                    <p>
                                        Blog content blog content blog content, blog content, blog content, blog content,
                                        blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                    </p>
                                    <div class="register">
                                        Click here to register
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="subhead">
                                    <div class="img">
                                        <img src="../../Images/icons/workshop-gray.png" />
                                    </div>
                                </div>
                                <div class="paragraph">
                                    <p>
                                        <div class="dt">
                                            26-Sep-13
                                        </div>
                                        <div class="venue">
                                            Venue
                                        </div>
                                    </p>
                                    <p>
                                        Blog content blog content blog content, blog content, blog content, blog content,
                                        blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                    </p>
                                    <div class="register">
                                        Click here to register
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="subhead">
                                    <div class="img">
                                        <img src="../../Images/icons/workshop-gray.png" />
                                    </div>
                                </div>
                                <div class="paragraph">
                                    <p>
                                        <div class="dt">
                                            26-Sep-13
                                        </div>
                                        <div class="venue">
                                            Venue
                                        </div>
                                    </p>
                                    <p>
                                        Blog content blog content blog content, blog content, blog content, blog content,
                                        blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                    </p>
                                    <div class="register">
                                        Click here to register
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="subhead">
                                    <div class="img">
                                        <img src="../../Images/icons/workshop-gray.png" />
                                    </div>
                                </div>
                                <div class="paragraph">
                                    <p>
                                        <div class="dt">
                                            26-Sep-13
                                        </div>
                                        <div class="venue">
                                            Venue
                                        </div>
                                    </p>
                                    <p>
                                        Blog content blog content blog content, blog content, blog content, blog content,
                                        blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                    </p>
                                    <div class="register">
                                        Click here to register
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="subhead">
                                    <div class="img">
                                        <img src="../../Images/icons/workshop-gray.png" />
                                    </div>
                                </div>
                                <div class="paragraph">
                                    <p>
                                        <div class="dt">
                                            26-Sep-13
                                        </div>
                                        <div class="venue">
                                            Venue
                                        </div>
                                    </p>
                                    <p>
                                        Blog content blog content blog content, blog content, blog content, blog content,
                                        blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                    </p>
                                    <div class="register">
                                        Click here to register
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="subhead">
                                    <div class="img">
                                        <img src="../../Images/icons/workshop-gray.png" />
                                    </div>
                                </div>
                                <div class="paragraph">
                                    <p>
                                        <div class="dt">
                                            26-Sep-13
                                        </div>
                                        <div class="venue">
                                            Venue
                                        </div>
                                    </p>
                                    <p>
                                        Blog content blog content blog content, blog content, blog content, blog content,
                                        blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                    </p>
                                    <div class="register">
                                        Click here to register
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="subhead">
                                    <div class="img">
                                        <img src="../../Images/icons/workshop-gray.png" />
                                    </div>
                                </div>
                                <div class="paragraph">
                                    <p>
                                        <div class="dt">
                                            26-Sep-13
                                        </div>
                                        <div class="venue">
                                            Venue
                                        </div>
                                    </p>
                                    <p>
                                        Blog content blog content blog content, blog content, blog content, blog content,
                                        blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                    </p>
                                    <div class="register">
                                        Click here to register
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="subhead">
                                    <div class="img">
                                        <img src="../../Images/icons/workshop-gray.png" />
                                    </div>
                                </div>
                                <div class="paragraph">
                                    <p>
                                        <div class="dt">
                                            Date: 3/12/2013
                                        </div>
                                        <div class="venue">
                                            Venue
                                        </div>
                                    </p>
                                    <p>
                                        Blog content blog content blog content, blog content, blog content, blog content,
                                        blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                    </p>
                                    <div class="register">
                                        Click here to register
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="subhead">
                                    <div class="img">
                                        <img src="../../Images/icons/workshop-gray.png" />
                                    </div>
                                </div>
                                <div class="paragraph">
                                    <p>
                                        <div class="dt">
                                            Date: 3/12/2013
                                        </div>
                                        <div class="venue">
                                            Venue
                                        </div>
                                    </p>
                                    <p>
                                        Blog content blog content blog content, blog content, blog content, blog content,
                                        blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                    </p>
                                    <div class="register">
                                        Click here to register
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="subhead">
                                    <div class="img">
                                        <img src="../../Images/icons/workshop-gray.png" />
                                    </div>
                                </div>
                                <div class="paragraph">
                                    <p>
                                        <div class="dt">
                                            Date: 3/12/2013
                                        </div>
                                        <div class="venue">
                                            Venue
                                        </div>
                                    </p>
                                    <p>
                                        Blog content blog content blog content, blog content, blog content, blog content,
                                        blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                    </p>
                                    <div class="register">
                                        Click here to register
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="subhead">
                                    <div class="img">
                                        <img src="../../Images/icons/workshop-gray.png" />
                                    </div>
                                </div>
                                <div class="paragraph">
                                    <p>
                                        <div class="dt">
                                            Date: 3/12/2013
                                        </div>
                                        <div class="venue">
                                            Venue
                                        </div>
                                    </p>
                                    <p>
                                        Blog content blog content blog content, blog content, blog content, blog content,
                                        blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                    </p>
                                    <div class="register">
                                        Click here to register
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="subhead">
                                    <div class="img">
                                        <img src="../../Images/icons/workshop-gray.png" />
                                    </div>
                                </div>
                                <div class="paragraph">
                                    <p>
                                        <div class="dt">
                                            Date: 3/12/2013
                                        </div>
                                        <div class="venue">
                                            Venue
                                        </div>
                                    </p>
                                    <p>
                                        Blog content blog content blog content, blog content, blog content, blog content,
                                        blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                    </p>
                                    <div class="register">
                                        Click here to register
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="subhead">
                                    <div class="img">
                                        <img src="../../Images/icons/workshop-gray.png" />
                                    </div>
                                </div>
                                <div class="paragraph">
                                    <p>
                                        <div class="dt">
                                            Date: 3/12/2013
                                        </div>
                                        <div class="venue">
                                            Venue
                                        </div>
                                    </p>
                                    <p>
                                        Blog content blog content blog content, blog content, blog content, blog content,
                                        blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                    </p>
                                    <div class="register">
                                        Click here to register
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Customer Reference End-->
    <div class="customertiles gurus">
        <div class="blog workshoppg">
            <div class="header">
                <h1>
                    Role Excellence Profile Events</h1>
                <div class="hdright">
                    <a href="https://www.eventbrite.com/org/4545862841" target="_blank">
                        <img src="../../Images/eventlogo.png" /></a>
                </div>
            </div>
            <div class="blogback">
                <img src="../../Images/faq-bg.png" />
                <div class="gurucont">
                    <%--<div class="scrollbar1" id="scrollbars2">
                        <div class="scrollbar">
                            <div class="track">
                                <div class="thumb">
                                    <div class="end">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="viewport">
                            <div class="overview">--%>
                    <div class="scroll3">
                        <ul id="latestWorkshopData">
                            <div class="scroll4">
                                <li>
                                    <div class="subhead">
                                        <div class="img">
                                            <img src="../../Images/icons/workshop-gray.png" />
                                        </div>
                                    </div>
                                    <div class="paragraph">
                                        <p>
                                            <div class="dt">
                                                26-Sep-13
                                            </div>
                                            <div class="venue">
                                                Venue
                                            </div>
                                        </p>
                                        <p>
                                            Blog content blog content blog content, blog content, blog content, blog content,
                                            blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                        </p>
                                        <div class="register">
                                            Click here to register
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="subhead">
                                        <div class="img">
                                            <img src="../../Images/icons/workshop-gray.png" />
                                        </div>
                                    </div>
                                    <div class="paragraph">
                                        <p>
                                            <div class="dt">
                                                26-Sep-13
                                            </div>
                                            <div class="venue">
                                                Venue
                                            </div>
                                        </p>
                                        <p>
                                            Blog content blog content blog content, blog content, blog content, blog content,
                                            blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                        </p>
                                        <div class="register">
                                            Click here to register
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="subhead">
                                        <div class="img">
                                            <img src="../../Images/icons/workshop-gray.png" />
                                        </div>
                                    </div>
                                    <div class="paragraph">
                                        <p>
                                            <div class="dt">
                                                26-Sep-13
                                            </div>
                                            <div class="venue">
                                                Venue
                                            </div>
                                        </p>
                                        <p>
                                            Blog content blog content blog content, blog content, blog content, blog content,
                                            blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                        </p>
                                        <div class="register">
                                            Click here to register
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="subhead">
                                        <div class="img">
                                            <img src="../../Images/icons/workshop-gray.png" />
                                        </div>
                                    </div>
                                    <div class="paragraph">
                                        <p>
                                            <div class="dt">
                                                26-Sep-13
                                            </div>
                                            <div class="venue">
                                                Venue
                                            </div>
                                        </p>
                                        <p>
                                            Blog content blog content blog content, blog content, blog content, blog content,
                                            blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                        </p>
                                        <div class="register">
                                            Click here to register
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="subhead">
                                        <div class="img">
                                            <img src="../../Images/icons/workshop-gray.png" />
                                        </div>
                                    </div>
                                    <div class="paragraph">
                                        <p>
                                            <div class="dt">
                                                26-Sep-13
                                            </div>
                                            <div class="venue">
                                                Venue
                                            </div>
                                        </p>
                                        <p>
                                            Blog content blog content blog content, blog content, blog content, blog content,
                                            blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                        </p>
                                        <div class="register">
                                            Click here to register
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="subhead">
                                        <div class="img">
                                            <img src="../../Images/icons/workshop-gray.png" />
                                        </div>
                                    </div>
                                    <div class="paragraph">
                                        <p>
                                            <div class="dt">
                                                26-Sep-13
                                            </div>
                                            <div class="venue">
                                                Venue
                                            </div>
                                        </p>
                                        <p>
                                            Blog content blog content blog content, blog content, blog content, blog content,
                                            blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                        </p>
                                        <div class="register">
                                            Click here to register
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="subhead">
                                        <div class="img">
                                            <img src="../../Images/icons/workshop-gray.png" />
                                        </div>
                                    </div>
                                    <div class="paragraph">
                                        <p>
                                            <div class="dt">
                                                26-Sep-13
                                            </div>
                                            <div class="venue">
                                                Venue
                                            </div>
                                        </p>
                                        <p>
                                            Blog content blog content blog content, blog content, blog content, blog content,
                                            blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                        </p>
                                        <div class="register">
                                            Click here to register
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="subhead">
                                        <div class="img">
                                            <img src="../../Images/icons/workshop-gray.png" />
                                        </div>
                                    </div>
                                    <div class="paragraph">
                                        <p>
                                            <div class="dt">
                                                26-Sep-13
                                            </div>
                                            <div class="venue">
                                                Venue
                                            </div>
                                        </p>
                                        <p>
                                            Blog content blog content blog content, blog content, blog content, blog content,
                                            blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                        </p>
                                        <div class="register">
                                            Click here to register
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="subhead">
                                        <div class="img">
                                            <img src="../../Images/icons/workshop-gray.png" />
                                        </div>
                                    </div>
                                    <div class="paragraph">
                                        <p>
                                            <div class="dt">
                                                26-Sep-13
                                            </div>
                                            <div class="venue">
                                                Venue
                                            </div>
                                        </p>
                                        <p>
                                            Blog content blog content blog content, blog content, blog content, blog content,
                                            blog content, blog content, blog content, blog content, latest Blog, Latest Blog.
                                        </p>
                                        <div class="register">
                                            Click here to register
                                        </div>
                                    </div>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Workshop End-->
    <div class="customertiles gurus">
        <div class="blog newspg">
            <div class="header">
                <h1>
                    Latest News on Alan Dowzall</h1>
            </div>
            <div class="blogback">
                <img src="../../Images/faq-bg.png" />
                <div class="gurucont">
                    <div class="scroll6">
                        <ul class="beNews" id="latestNewsData">
                            <li>
                                <div class="newspic">
                                    <img src="../../Images/news1.png" />
                                </div>
                                <div class="newsCont">
                                    <div class="newsdate">
                                        20-08-2013
                                    </div>
                                    <div class="newsHead">
                                        Alan Dowzall Presents his revamped business navigation guide for how to do Cloud
                                        Business at the Acumatica Partner Summit
                                    </div>
                                    <p>
                                        Alan Dowzall presented his counter intuitive guide to building a winning Cloud Business
                                        at the 2013 Acumatica Partner Conference. Entrepreneurs and seasoned business owners
                                        heard Dowzall share his unique look into the new world of doing business in the
                                        Cloud. Partners are flocking to establish new Cloud businesses but are quickly finding
                                        that their well trodden path of doing business doesn't work particularly well in
                                        the Cloud. "What we have found is that building successful businesses in the Cloud
                                        requires a different approach, one that is almost diametrically opposite to the
                                        traditional way of doing business" says Dowzall. Doing Cloud business requires a
                                        revamped business navigation guide. Dowzall presented his Cloud Business Profile
                                        of Excellence a roadmap for how to build and manage an excellent Cloud Business.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Latest News End-->
    <div class="customertiles gurus">
        <%-- <div class="blog newspg">
                                        <div class="header">
                                            Latest Tweets</div>
                                        <div class="hdright">
                                            <a href="https://twitter.com/dowzall" target="_blank">All Tweets | Follow Alan</a>
                                        </div>--%>
        <div class="blog tweetpg">
            <div class="header">
                <h1>
                    Latest Tweets</h1>
                <div class="hdright">
                    <a href="https://twitter.com/dowzall" target="_blank">All Tweets | Follow Alan</a>
                </div>
            </div>
            <div class="blogback">
                <img src="../../Images/faq-bg.png" />
                <div class="gurucont">
                    <%--<script type="text/javascript">

                                            new TWTR.Widget({
                                                version: 2,
                                                type: 'profile',
                                                rpp: 5,
                                                interval: 6000,
                                                width: 500,
                                                height: 300,
                                                theme: {
                                                    shell: {
                                                        background: '#e5e5e5',
                                                        color: '#000000'
                                                    },
                                                    tweets: {
                                                        background: '#e5e5e5',
                                                        border: '0',
                                                        color: '#808080',
                                                        links: '#000'
                                                    }
                                                },
                                                features: {
                                                    scrollbar: false,
                                                    loop: true,
                                                    live: false,
                                                    hashtags: true,
                                                    timestamp: true,
                                                    avatars: true

                                                }
                                            }).render().setUser('Dowzall').start();
                                        </script>--%>
                    <%--   <div class="header">
                                            Latest Tweets</div>
                                        <div class="hdright">
                                            <a href="https://twitter.com/dowzall" target="_blank">All Tweets | Follow Alan</a>
                                        </div>--%>
                    <%--  <div style="background-color: #e5e5e5">
                                            <a class="twitter-timeline" href="https://twitter.com/twitterapi" data-widget-id="331673035260170241"
                                                data-link-color="#000" data-related="twitterapi,twitter" data-aria-polite="assertive"
                                                width="500" height="500" lang="EN" data-tweet-limit="4" data-chrome="nofooter transparent"
                                                data-border-color="#acacac"  data-border-style="dotted"></a>
                                        </div>--%>
                    <input type="hidden" id="hideVal" value="0" />
                    <div id="example1" style="display: none">
                    </div>
                    <div class="scrollbar1">
                        <div class="scrollbar">
                            <div class="track">
                                <div class="thumb">
                                    <div class="end">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="viewport">
                            <div class="overview">
                                <ul id="latesttweetsul">
                                    <li>
                                        <div class="paragraph newsparagraph">
                                            <p>
                                                <div class="date">
                                                    3/12/2013 -
                                                </div>
                                                <div class="hd">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                                </div>
                                            </p>
                                            <p>
                                                Blog content blog content blog content, blog content, blog content, blog content,
                                                blog content, blog content, blog content, blog content, blog content, blog content,
                                                blog content, latest Blog, Latest Blog, Latest Blog.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="paragraph newsparagraph">
                                            <p>
                                                <div class="date">
                                                    3/12/2013 -
                                                </div>
                                                <div class="hd">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                                </div>
                                            </p>
                                            <p>
                                                Blog content blog content blog content, blog content, blog content, blog content,
                                                blog content, blog content, blog content, blog content, blog content, blog content,
                                                blog content, latest Blog, Latest Blog, Latest Blog.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="paragraph newsparagraph">
                                            <p>
                                                <div class="date">
                                                    3/12/2013 -
                                                </div>
                                                <div class="hd">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                                </div>
                                            </p>
                                            <p>
                                                Blog content blog content blog content, blog content, blog content, blog content,
                                                blog content, blog content, blog content, blog content, blog content, blog content,
                                                blog content, latest Blog, Latest Blog, Latest Blog.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="paragraph newsparagraph">
                                            <p>
                                                <div class="date">
                                                    3/12/2013 -
                                                </div>
                                                <div class="hd">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                                </div>
                                            </p>
                                            <p>
                                                Blog content blog content blog content, blog content, blog content, blog content,
                                                blog content, blog content, blog content, blog content, blog content, blog content,
                                                blog content, latest Blog, Latest Blog, Latest Blog.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Tweets End-->
</div>
