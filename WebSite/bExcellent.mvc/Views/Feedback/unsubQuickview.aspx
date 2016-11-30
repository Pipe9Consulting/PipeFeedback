<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Feedback
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <style type="text/css">
        #Qn1 .ui-slider-range
        {
            background-image: url(../../images/img/slidebg2.png);
            cursor: pointer;
        }
        #Qn2 .ui-slider-range
        {
            background-image: url(../../images/img/slidebg2.png);
            cursor: pointer;
        }
        #Qn3 .ui-slider-range
        {
            background-image: url(../../images/img/slidebg2.png);
            cursor: pointer;
        }
        #Qn4 .ui-slider-range
        {
            background-image: url(../../images/img/slidebg2.png);
            cursor: pointer;
        }
        #Qn5 .ui-slider-range
        {
            background-image: url(../../images/img/slidebg2.png);
            cursor: pointer;
        }
        .feedback_question
        {
            width: 800px;
            max-height: 500px;
            overflow-y: scroll;
            overflow-x: hidden;
        }
        .feedback_question ul
        {
            list-style-type: none;
        }
    </style>
    <%--<script src="../../Scripts/ref/jquery-1.8.3.js" type="text/javascript"></script>--%>
    <script src="http://code.jquery.com/ui/1.10.0/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/common.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Scripts/ref/Feedback/takefeedbackqv.js"></script>
    <script type="text/javascript" src="../../Scripts/ref/Namespace.js"></script>
    <script type="text/javascript" src="../../Scripts/ref/Requests.js"></script>
    <script type="text/javascript" src="../../Scripts/jquery.jscrollpane.min.js"></script>
    <script type="text/javascript" src="../../Scripts/jquery.mousewheel.js"></script>
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
    </script>
    <%--<script type="text/javascript">
    $(function () {
         $("#Qno1").slider({
            min: 0,
            max: 4,
            range: "min",
            value: 1,
            slide: function (event, ui) {
                if (ui.value == 0) {
                    event.preventDefault();
                    $('#Qno1').data("answer", 1);
                } else {
                    $('#Qno1').data("answer", ui.value);
                }
            }
        });
        });
</script>--%>
    <style type="text/css">
        #Qno1 .ui-slider-range
        {
            background-image: url(../../Images/img/slidebg2.png);
            cursor: pointer;
        }
    </style>
    <div class="slideout">
        <div class="slidecontent">
            <div id="ajax-content">
            </div>
            <div id="content1">
                <h2>
                    Feedback Introduction</h2>
                <div class="content1" id="poeintro">
                    <ul>
                        <li>
                            <p>
                                Execution Practices that represent the core pillars of the CA Lead role. Key Actions
                                associated with each of the Execution Practices that represent specific activities
                                that that can be taken to drive excellence. Excellence Indicators (EI's) that represent
                                measureable results of successful completion of key actions within each of the practice
                                areas
                            </p>
                        </li>
                        <%--<li>Execution Practices that represent the core pillars of the CA Lead role.</li>
                        <li>Key Actions associated with each of the Execution Practices that represent specific
                            activities that that can be taken to drive excellence.</li>
                        <li>Excellence Indicators (EI's) that represent measureable results of successful completion
                            of key actions within each of the practice areas </li>--%>
                    </ul>
                    <div class="diagram">
                        Place holder for feedback intro diagram</div>
                </div>
            </div>
            <div id="content2">
                <h2>
                    Module intro</h2>
                <div class="content2" id="moduleintro">
                    <p>
                        Developing a Customer & Partner centric culture is key to success. The CA Lead ensures
                        that customers and partners are at the center of the business of Corporate Accounts.
                        The CA Lead becomes an advocate for the business needs of customers by making sure
                        that the voice of customers and partners is included in all core processes such
                        that these processes are not introspective and based on real world thinking .
                    </p>
                    <p>
                        <span class="strong">Customer & Partner centric culture actions include:</span>
                        <br />
                        Becoming an authority and advocate for the business needs and requirements of customers.
                        Ensures that customers and partners are at the center of important Corporate Account
                        processes. Ensures critical processes like Account & Territory planning are not
                        introspective and based on real world thinking.
                    </p>
                    <div class="diagram">
                        Place holder for feedback module intro diagram</div>
                </div>
            </div>
            <div id="content3">
                <h2>
                    Traits</h2>
                <div class="content3" id="poetraits">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque condimentum
                        varius venenatis. Proin sit amet suscipit diam. Duis sapien augue, consectetur non
                        condimentum in, consequat eu ante. Nullam euismod.</p>
                    <ul>
                        <li>
                            <h1>
                                1</h1>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
                        <li>
                            <h1>
                                2</h1>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
                        <li>
                            <h1>
                                3</h1>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
                        <li>
                            <h1>
                                4</h1>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
                        <li>
                            <h1>
                                5</h1>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
                        <li>
                            <h1>
                                6</h1>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
                    </ul>
                </div>
            </div>
            <div id="content4">
                <h2>
                    Key actions</h2>
                <div class="content4" id="modulekeyaction">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque condimentum
                        varius venenatis. Proin sit amet suscipit diam. Duis sapien augue, consectetur non
                        condimentum in, consequat eu ante. Nullam euismod.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque condimentum
                        varius venenatis. Proin sit amet suscipit diam. Duis sapien augue, consectetur non
                        condimentum in, consequat eu ante. Nullam euismod.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque condimentum
                        varius venenatis. Proin sit amet suscipit diam. Duis sapien augue, consectetur non
                        condimentum in, consequat eu ante. Nullam euismod.</p>
                </div>
            </div>
            <div id="primarynav">
                <ul id="navigation">
                    <li><a href="#" class="selected" rel="content1">
                        <img src="../../Images/navigation1.png" alt="Nav1" /></a></li>
                    <li><a href="#" rel="content2">
                        <img src="../../Images/navigation2.png" alt="Nav2" /></a></li>
                    <li><a href="#" rel="content3">
                        <img src="../../Images/navigation3.png" alt="Nav3" /></a></li>
                    <li><a href="#" rel="content4">
                        <img src="../../Images/navigation4.png" alt="Nav4" /></a></li>
                </ul>
            </div>
        </div>
        <div id="left">
        </div>
    </div>
    <div class="slideout1">
        <div class="slidecontent1">
            <h1>
                Introduction</h1>
            <ul>
                <li><a href="#">
                    <img src="../../Images/flower.jpg" width="95" height="95" alt="Intro" /></a></li>
                <li><a href="#">
                    <div class="up-down">
                        <div class="slide default">
                            <img src="../../Images/flower.jpg" width="95" height="95" alt="Intro" /></div>
                        <div class="slide onhover">
                            Jackson Robert</div>
                    </div>
                </a></li>
                <li><a href="#">
                    <img src="../../Images/flower.jpg" width="95" height="95" alt="Intro" /></a></li>
                <li><a href="#">
                    <img src="../../Images/flower.jpg" width="95" height="95" alt="Intro" /></a></li>
                <li><a href="#">
                    <img src="../../Images/flower.jpg" width="95" height="95" alt="Intro" /></a></li>
                <li><a href="#">
                    <img src="../../Images/flower.jpg" width="95" height="95" alt="Intro" /></a></li>
                <li><a href="#">
                    <img src="../../Images/flower.jpg" width="95" height="95" alt="Intro" /></a></li>
                <li><a href="#">
                    <img src="../../Images/flower.jpg" width="95" height="95" alt="Intro" /></a></li>
                <li><a href="#">
                    <img src="../../Images/flower.jpg" width="95" height="95" alt="Intro" /></a></li>
            </ul>
        </div>
        <div id="right">
        </div>
    </div>
    <div class="pageholder">
        <ul>
            <li>
                <div>
                    <!-- Carousel items -->
                    <div>
                        <div id="tiles">
                            <!--Page1-->
                            <div>
                                <div class="breadcrumb">
                                    Home > Feedback > Take Feedback</div>
                                <input type="hidden" id="Hidden2" />
                                <img id="prevdv" class="prevbtn" src="../../Images/prev_arrow.png" onclick="Javascript:self_feedback.loadPrevContent();" />
                                <h1>
                                    Take Self Feedback</h1>
                                <div class="quickview">
                                    <div id="poemodule">
                                        <ul>
                                            <li id="li1" class="quickview act">Customer and Partner<br />
                                                Centric Culture </li>
                                            <li id="li2" class="quickview">Business Planning</li>
                                            <li id="li3" class="quickview">Business Management</li>
                                            <li id="li4" class="quickview">Orchestration and
                                                <br />
                                                Collaboration</li>
                                            <li id="li5" class="quickview">Organizational<br />
                                                Development</li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <input type="hidden" id="totalmodules" />
                                    <input type="hidden" id="currentmoduleOrder" />
                                    <input type="hidden" id="module1" />
                                    <input type="hidden" id="module2" />
                                    <input type="hidden" id="module3" />
                                    <input type="hidden" id="module4" />
                                    <input type="hidden" id="module5" />
                                    <input type="hidden" id="module6" />
                                    <input type="hidden" id="module7" />
                                </div>
                                <div class="contentholder" style="margin-top: -16px">
                                    <div id="compquestionid">
                                    </div>
                                    <div style="margin-top: -30px">
                                        <div style="float: left;">
                                            Time taken :
                                        </div>
                                        <div id="counterHour">
                                            0</div>
                                        <div id="counterMin">
                                            0</div>
                                        <div style="float: left;">
                                            &nbsp; : &nbsp;</div>
                                        <div id="counterSec">
                                            00</div>
                                    </div>
                                    <div class="clr">
                                    </div>
                                    <div class="scroll-pane" style="height: 70%; margin-top: 0px; overflow-y: auto; overflow-x: hidden;">
                                        <div class="feedback_question">
                                            <ul>
                                                <li>
                                                    <div class="Qno">
                                                        1
                                                    </div>
                                                    <h5 id="Qtext1">
                                                    </h5>
                                                    <div class="progress">
                                                        <div id="selectedOption" style="display: none">
                                                        </div>
                                                        <div id="Qn1" style="width: 562px; height: 62px; cursor: pointer;">
                                                            <img src="../../images/img/slidebg1.png" />
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="Qno">
                                                        2</div>
                                                    <h5 id="Qtext2">
                                                    </h5>
                                                    <div class="progress">
                                                        <div id="Qn2" style="width: 562px; height: 62px; cursor: pointer;">
                                                            <img src="../../images/img/slidebg1.png" />
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="Qno">
                                                        3</div>
                                                    <h5 id="Qtext3">
                                                    </h5>
                                                    <div class="progress">
                                                        <div id="Qn3" style="width: 562px; height: 62px; cursor: pointer;">
                                                            <img src="../../images/img/slidebg1.png" />
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="Qno">
                                                        4</div>
                                                    <h5 id="Qtext4">
                                                    </h5>
                                                    <div class="progress">
                                                        <div id="Qn4" style="width: 562px; height: 62px; cursor: pointer;">
                                                            <img src="../../images/img/slidebg1.png" />
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="Qno">
                                                        5</div>
                                                    <h5 id="Qtext5">
                                                    </h5>
                                                    <div class="progress">
                                                        <div id="Qn5" style="width: 562px; height: 62px; cursor: pointer;">
                                                            <img src="../../images/img/slidebg1.png" />
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" id="question1" />
                            <input type="hidden" id="selectedanswer" value="1" />
                            <img id="nextdv" class="nextbtn" src="../images/next_arrow.png" />
                        </div>
                        <!--Page3-->
                    </div>
                </div>
                <!-- Carousel nav -->
                <%--       <a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
                    <a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>--%>
            </li>
        </ul>
        <div class="selectarea">
            <ul>
                <li id="selectedPracticearea"><a href="#" class="practisemenu">Practice Area</a>
                    <ul id="compltedPracticeArea">
                        <%-- <li><a href="javascript:alert1(); ">Practise Area</a></li>
                        <li><a href="javascript:alert1() ;">Practise Area</a></li>--%>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</asp:Content>