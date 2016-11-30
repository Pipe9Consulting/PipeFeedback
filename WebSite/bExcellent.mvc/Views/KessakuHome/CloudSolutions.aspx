<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/KessakuHome.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content2" ContentPlaceHolderID="KessakuHomehead" runat="server">
    <link href="../../Styles/KessakuStyles/cloud-solution.css" rel="stylesheet" />
    <script src="../../Scripts/KessakuScript/CloudSolutions.js"></script>
    <script src="../../Scripts/jquery-1.7.1.min.js"></script>
    <script src="../../Scripts/KessakuScript/jquery.scrollTo.js"></script>
    <script src="../../Scripts/KessakuScript/jquery.nav.min.js"></script>

    <script type="text/javascript">
        $(function () {
            $('#clickevents').onePageNav({

                begin: function () {
                    console.log('start');
                },
                end: function () {
                    console.log('stop');
                }
            });
        });
        //$(document).ready(function () {
        //    $('#POETileClick').click(function () {
        //        //$('#ProfileOfExcellenceCont').css('padding-top', '2%');
        //        //$('#cloudAsCoachCont').css('margin-top', '-2%');
        //        var h = screen.height;
        //        var scrol = (h - 80) + 'em';
        //        $('html, body').animate({
        //            scrollTop: '820em'//$(window).scrollTop() + 820
        //        });

        //    });
        //    $('#cloudasCoachClick').click(function() {
        //        var h = screen.height;
        //        var scrol = (h + 580) + 'em';
        //        $('html, body').animate({
        //            scrollTop: scrol//$(window).scrollTop() + 820
        //        });
        //    });
        //});
    </script>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="KessakuHomeContent" runat="server">
    <div class="cloudascoachContainer">
        <div class="cloudsolutionbg">
            <div class="placeholder">
                <h1>PIPE9 Solutions</h1>
                <h2>PIPE9 Solutions offer everything your business needs to identify, hire, develop, and retain top talent. </h2>
                <div class="fourcolumn">
                    <ul id="clickevents">
                        <li class="">
                            <a href="#ProfileOfExcellenceCont">
                                <div class="top">
                                    <div class="icon poe"></div>
                                    <p>
                                        Libray of Profiles
                                    </p>
                                </div>
                            </a>
                            <%--<div class="bottom" onclick="DownloadFiles(1)">
                                <p>
                                    Download
                  Role Excellence Profile
                                </p>
                                <div class="download"></div>
                            </div>--%>
                        </li>
                        <li class="" id="cloudasCoachClick">
                            <a href="#cloudAsCoachCont">
                                <div class="top">
                                    <div class="icon cac"></div>
                                    <p>PIPE9 Coach </p>
                                </div>
                            </a>
                            <%--<div class="bottom" onclick="PreviewContactUs()">
                                <p>Request Demo</p>
                                <div class="demo"></div>
                            </div>--%>
                            <%-- </a>--%>
                        </li>
                        <li class="">
                            <a href="#PerformanceCont">
                                <div class="top">
                                    <div class="icon pr"></div>
                                    <p>
                                        Action Reports
                                    </p>
                                </div>
                            </a>
                            <%--<div class="bottom" onclick="DownloadFiles(2)">
                                <p>
                                    Download
                  Performance Report
                                </p>
                                <div class="download"></div>
                            </div>--%>
                        </li>
                        <li class="">
                            <a href="#CoachingToolKitCont">
                                <div class="top">
                                    <div class="icon ct"></div>
                                    <p>Coaching Toolbox </p>
                                </div>
                            </a>
                            <%--<div class="bottom" id="ProfileOfExcellence">
                                <p>
                                    Check Out
                  Our Toolbox
                                </p>
                                <div class="demo"></div>
                            </div>--%>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Cloud solution Home End here -->
    <!--Cloud Solution PoE-->
    <div class="cloud-POE " id="ProfileOfExcellenceCont">
        <div class="placeholder">
            <div class="cloudCol">
                <li>
                    <div class="cloudHead">
                        <div class="icon cloud-poe"></div>
                    </div>
                    <div class="name">
                        Profiles of Excellence
                    </div>
                    <div class="subname">
                        Decode what high performers do differently
                    </div>
                    <div class="learnmore"><a>Learn More</a></div>
                </li>
                <li>
                    <div class="CloudRight">
                        <div class="cont">
                            <h1>The Foundation for Development
                            </h1>
                            <p>
                                Profiles of Excellence are built based on a single hypothesis: If the outcomes and actions of high performers are decoded, then a standard for role excellence can be defined 
                                that will enable others to become high performers too. Profiles of Excellence define the standard for role excellence. By decoding what high performers do differently to 
                                achieve success in role, the key practices, actions, and indicators that exemplify excellence can be defined and amplified. The profile provides individuals with a clear 
                                picture of what “excellent” looks like and enables managers to make smart coaching decisions by focusing on the development of specific actions that have been proven to 
                                drive success.
                            </p>
                            <p>
                                “When it comes to delivering quality coaching, the key lesson we’ve learned is that managers can’t coach effectively unless they have something to coach to. You can’t 
                                just say, “Go forth and coach.” You have to make it concrete for your managers. They need to have something to coach to: a clear understanding of what “good” looks
                                like in your organization.”

                            </p>
                            <p class="italicTxt">
                                “Give Managers Something to Coach To.”
                            </p>
                            <p>
                                &ndash;Matthew Dixon and Brent Adamson, authors of The Challenger Sale.
                            </p>
                        </div>
                    </div>
                </li>
            </div>
        </div>
    </div>
    <!--End of Cloud Solution PoE-->

    <!--Cloud Solution Cloud as Coach-->
    <div class="subbg" id="cloudAsCoachCont">
        <div class="placeholder">
            <div class="cloudCol">
                <li>
                    <div class="cloudHead selected">
                        <div class="icon cac"></div>
                    </div>
                    <div class="name">PIPE9 Coach</div>
                    <div class="subname">
                        Align individuals, teams, and entire companies with a standard of role excellence

                    </div>
                    <div class="learnmore IsYourTeam"><a>Learn More</a></div>
                </li>
                <li>
                    <div class="CloudRight">

                        <div class="cont">
                            <h1>Cloud Technology for the Modern World
                            </h1>

                            <p>
                                It’s your Coach in the Cloud!
                            </p>
                            <p class="italicTxt">
                                <b>10,000 Hours to Mastery
                                </b>
                            </p>

                            <p class="italicTxt">
                                “The emerging picture...is that ten thousand hours of practice is required to achieve the level of mastery associated with being a world-class expert---in anything.
                                 Think of the significant gain in productivity for companies if they can reduce the 10,000 hours and increase the % of people that make it.”
                            </p>
                            <p>
                                &ndash;Malcolm Gladwell author of Outliers, quoting neurologist Daniel Levitin“10,000 hours to Mastery.”
                            </p>


                        </div>
                    </div>
                </li>
            </div>
        </div>
    </div>
    <!--End of Cloud Solution Cloud as Coach-->

    <!--Cloud Solution  Performance Report-->
    <div class="cloud-pr " id="PerformanceCont">
        <div class="placeholder">
            <div class="cloudCol">
                <li>
                    <div class="cloudHead selected">
                        <div class="icon pr"></div>
                    </div>
                    <div class="name">
                        Action Reports
                    </div>
                    <div class="subname">
                        Know your people and know how they can improve
                    </div>
                    <div class="learnmore"><a>Learn More</a></div>
                </li>
                <li>
                    <div class="CloudRight">
                        <div class="cont">
                            <h1>Know Your People, Improve Performance
                            </h1>
                            <p>
                                At the click of a button each manager can see what the development priorities are based on the Library of Profile. Identify development opportunities for individuals, teams, 
                                or your entire company. Performance Reports offer valuable insights as to where performance is high and where performance needs attention. These insights can be used to not 
                                only tailor development plans that will have the biggest impact, but also identify successful practices that are already in place, such as onboarding and recruitment. 
                                Managers who have detailed information about performance are better equipped to coach, develop, and prepare their teams to achieve excellence.

                            </p>
                            <p class="italicTxt">“If you don’t know your people, you don’t know your company.”</p>
                            <p>
                                &ndash;Jason Fried, cofounder and CEO 37signals
                            </p>
                        </div>
                    </div>
                </li>
            </div>
        </div>
    </div>
    <!--End of Cloud Solution Performance Report-->
    <!--Cloud Solution Coaching Toolkit-->
    <div class="subbg" id="CoachingToolKitCont">
        <div class="placeholder">
            <div class="cloudCol">
                <li>
                    <div class="cloudHead selected">
                        <div class="icon ct"></div>
                    </div>
                    <div class="name">Coaching Toolbox</div>
                    <div class="subname">
                        Good coaching represents a huge performance improvement opportunity
                    </div>
                    <div class="learnmore"><a>Learn More</a></div>
                </li>
                <li>
                    <div class="CloudRight">
                        <div class="cont">
                            <h1>The Toolbox for the Modern Manager
                            </h1>
                            <p>
                                Our PIPE9 Coach technology decodes what the best performers do differently and incorporates that knowledge into a Coaching Toolbox. The Toolbox includes hiring guides 
                                that ensure hiring managers ask the right questions and hire the best candidates, onboarding programs based on past patterns of success and coaching guides that turn
                                managers into quality coaches, tooling them with a clear understanding of what “excellence” looks like in your organization. Our Coaching Toolbox accelerates the 
                                time-to-value for new talent, improves the performance of talent primed to grow and ensures the best talent is retained and motivated.
                            </p>
                            <p class="italicTxt">“Perfection is not attainable, but if we chase perfection we can catch excellence.”</p>
                            <p>&ndash;Vince Lombardi</p>
                        </div>
                    </div>
                </li>
            </div>
        </div>
    </div>
    <!--End of Cloud Solution Coaching Toolkit-->
</asp:Content>
