<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/KessakuHome.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content2" ContentPlaceHolderID="KessakuHomehead" runat="server">
    <%--    <link href="../../Styles/KessakuStyles/theme.css" rel="stylesheet" />--%>
    <link href="../../Styles/KessakuStyles/isyourTeam.css" rel="stylesheet" />
    <%-- <link href="../../Styles/KessakuStyles/icons.css" rel="stylesheet" />
    <script src="../../Scripts/KessakuScript/CloudAsCoach.js"></script>--%>
    <script type="text/javascript">
        //$(document).ready(function () {
        //    $('#pf').click(function () {
        //        $('#ProfileOfExcellence').css('padding-top', '100' +
        //            'px');
        //        $('#Feedback').css('margin-top', '-100px');

        //    });
        //});
    </script>
    <%--<h2>CloudAsCoach</h2>--%>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="kessakuHomeContent" runat="server">

    <div class="cloudascoachContainer" id="CloudAsCoachHome">
        <div class="teamhomebg">
            <div class="cloud_midbar">
                <div class="placeholder">
                    <div class="cloudcoachArea">
                        <div class="teamBG">
                            <h1>Is Your Team like Germany or Argentina? </h1>
                        </div>
                    </div>
                    <div class="teamText">
                        <p>Is your team like the German World Cup Champions? Does your team play with discipline, uber-efficiency, and tiki-taka-esque flair? Do they play like a team that has collectively reached the highest levels of performance? Or, instead, is your team like Argentina, relying on the artistry and talent of one or a few key players? The Germans raised the World Cup, while the Argentines went home empty handed. If your team has an unhealthy dependency on a few key players, you may end up losing too.</p>
                        <p>The goal scoring statistics for these two teams throughout the World Cup tournament, as well as in qualifying matches, reinforces the obvious difference between each side. One team scored a total of 43 goals, of which 35% were scored by their best scorer and 70% by the three top scorers. The other team scored a total of 55 goals in five less games. Of these goals scored, only 16% were scored by the top scorer and only 45% by the three top scorers. The first set of statistics represent Argentina, and the second represent Germany. For the Germans, 55% of the team's goals were scored by players other than their top three best scorers. What this means is that Germany do not rely on a few key players, they all perform at a high level. The obvious problem for Argentina is that if their top three players, who accounted for 70% of their goals, do not score, then their chance of winning is remote.</p>
                    </div>
                </div>
                <div class="teamDescription">
                    <h1>What does this tell us about building winning teams?</h1>
                    <p>If you are in the business of Talent Management, People Development or Improving Organizational Excellence with a focus on People, you face many challenges each day. Such challenges may include attracting the best talent, addressing talent shortages, improving the value of onboarding programs, addressing manager coaching inconsistencies, modernizing 360 assessments, addressing discontentment with performance reviews and talent retention.</p>
                    <p>All of these challenges are significant in their own right and demand the attention of People Managers. What we are finding is that dealing with these challenges singularly is masking a much bigger problem. What we have learned is that fewer and fewer people are reaching the very highest levels of excellence and the gap between the top scorers and everyone else is widening.</p>
                    <p>Our research tells us that more and more teams in the workplace are looking more like Argentina, rather than Germany.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Cloud as Coach Home End here -->
    <div class="divider2"></div>

    <!-- The Excellence Gap Start here-->
    <div class="caccbgNew " id="CloudasPoe">
        <div class="placeholder">
            <div class="cloudCol">
                <ul>
                    <li>
                        <div class="cloudHead">
                            <div class="icon excellence-Gap"></div>
                        </div>
                        <div class="teamLeft">
                            <div class="teamPercentArea">
                                <h1>8%</h1>
                                <p>Only 8% of Leaders were within range of the Excellence Goal</p>
                            </div>
                            <div class="teamPercentArea">
                                <h1>100%</h1>
                                <p>The majority of Leaders would have to improve to be Excellent in Role by a 100%</p>
                            </div>
                        </div>
                        <div class="teamLeft">
                            <div class="teamPercentAreaNew">
                                <h1>60%</h1>
                                <p>The majority of leaders would have to improve by 60% to reach the Excellence Goal</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="TeamCloudRight">
                            <div class="cont">
                                <h1>The Excellence Gap</h1>
                                <p>
                                    In a recent survey of 71 Global Business Leaders for a large multinational company, we conducted an analysis looking at the effectiveness of the group of Leaders against a Role Excellence Profile for the Leadership roles they performed. In other words, what proportion of the Leaders were achieving role excellence. What we found was eyebrow raising and troubling at best. None of the Leaders had reached the highest level of excellence as measured by achieving an excellence goal of 85%. Only 6 (8%) had reached levels of excellence within a range of 20% of the 85% goal and the average score was only 54%. Put another way, the Gap to Goal for the majority of Leaders, that is, the percentage by which these Leaders would have to improve to reach the goal of 85%, was 60%. However, if we set the Goal as being 100%, the Gap to Goal for the majority of Leaders was almost 100%! That was not the biggest bombshell that came out of the research. When we overlaid the data with tenure what we found was no significant difference in levels of excellence achieved by Leaders who had been in role for less than 12 months compared to those that had been in role greater than 36 months. The New in Role Leaders were at the same level of excellence as the Role Pros.
                                </p>
                                <p>
                                    Beyond the 6 key players, what we found was a sizeable gap between the majority of leaders and reaching the highest levels of excellence. A team perhaps more like Argentina than Germany?
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- The Excellence Gap End here -->

    <!-- Hours Mystery Start here-->
    <div class="hours-Mystery" id="Div1">
        <div class="placeholder">
            <div class="cloudCol">
                <ul>
                    <li>
                        <div class="cloudHead">
                            <div class="icon hour-Mystery"></div>
                        </div>
                    </li>
                    <li>
                        <div class="TeamCloudRight">
                            <div class="cont">
                                <h1>10,000 Hours to Mastery</h1>
                                <p>
                                    Malcolm Gladwell, in his book Outliers, quotes neurologist Daniel Levitin's popular paper 10,000 Hours to Mastery, which proposed the idea that it takes 10,000 hours of quality practice to achieve the level of mastery associated with being a world-class expert. Think of the significant gain in productivity for companies if it is possible to achieve mastery in less time and by more people. What's troubling is that not only are very few Leaders reaching the highest levels of mastery but there doesn't seem to be a discernible difference in the level of mastery between those that are New in Role compared to Role Pros who have been around for three or more years.
                                </p>

                                <p>The conclusion is that the "march to mastery" has, at best, faltered or, at worst, stopped for large groups within the workforce.</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Hours Mystery End here -->

    <!-- Pain Chain Start here-->
    <div class="pain-Chain" id="">
        <div class="placeholder">
            <div class="cloudCol">
                <ul>
                    <li>
                        <div class="cloudHead">
                            <div class="icon pain-Chain-icon"></div>
                        </div>
                    </li>
                    <li>
                        <div class="TeamCloudRight">
                            <div class="cont">
                                <h1>The Pain Chain</h1>
                                <p>
                                    The question is why. Why is the gap between the key players and everyone else so significant? Our answer is represented by what we refer to as the Pain Chain. It started with the global economic downturn, which led to a new business environment in which there was a huge reduction in spending and a big shift in risk tolerance. Consensus-based buying has emerged, meaning Business Leaders and sellers now have to work much harder to succeed. The impact for Sales Managers is that top deals must be closed. The need is so great that many Sales Managers have resorted to ensuring these deals close by getting much more deeply engaged. As a result, coaching sellers has fallen to the bottom of their priority list. The majority of sellers are falling behind because there is no one to coach them to win in this new environment.
                                </p>

                                <p>Joachim Low, coach of the German World Cup team, has succeeded because he has coached all his players to reach the highest levels of excellence, and in doing so, created the "Total Team".</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Pain Chain End here -->

    <!-- Coaching Start here-->
    <div class="team-coaching" id="Div2">
        <div class="placeholder">
            <div class="cloudCol">
                <ul>
                    <li>
                        <div class="cloudHead">
                            <div class="icon team-coaching-icon"></div>
                        </div>
                    </li>
                    <li>
                        <div class="TeamCloudRight">
                            <div class="cont">
                                <h1>Who's doing the Coaching?</h1>
                                <p>The place to start to answer this question is to understand how to impact the performance of the majority. One way to do this is to consider the factors that drive Core Performers to be successful. In his book Drive, Dan Pink defined the Four Intrinsic factors that drive people: Purpose, Autonomy, Mastery and Motivation. Purpose is derived from contributing to something meaningful. Autonomy is the desire to be self-directed. Mastery is the joy that comes from improving and Motivation is generated by the power of receiving recognition, especially from peers and people who matter the most. We believe that the drive for Purpose, Autonomy, Mastery and Motivation is a higher order view of what we consider to be the needs that drive excellence at work. These needs we refer to as Challenge, Feedback, Learning and Recognition.</p>
                                <p>But if coaching is falling to the bottom of the priority list, who is Challenging salespeople, who is offering consistent and meaningful Feedback, who is teaching them the skills that define excellence in role? Could the Cloud fill the void and help overburdened Managers be the coaches they need to be? The idea is that the Cloud takes on responsibilities for coaching, enabling Managers to maximize their focus on deals. The Cloud lays out the Challenge, delivers the Feedback, recommends development, makes smart mentoring connections and delivers the Recognition that individuals need to be motivated.</p>
                                <p>What this really means is that technology becomes the coach; the "Coach in the Cloud" that builds the Total Team.</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Coaching End here -->

    <!--Cloud as Coach Capabilities-->
    <div class="teamcapabilityBG " id="Capbiltiy">
        <div class="graydroplet">
            <div class="placeholder">

                <div class="cloudCoachHead">
                    <div class="cloudCoachIcon cloud-coaching-icon"></div>
                </div>

                <div class="cloudAsCoach">
                    <h1>Cloud as Coach</h1>
                    <p>New Cloud as Coach Technology delivers the capabilities that support what drives people at work.</p>
                    <p>
                        It all starts with Role Excellence Profiles (REPs), which define the Challenge. REPs represent the "North Star" for achieving the very highest levels of performance in role. REPs are tailored to the role people perform every day, defining the practices they follow and the actions they take towards reaching excellence. Unlike common performance benchmarks, like 360-Degree Feedback Assessments or Job Descriptions, REPs are developed based on decoding what best performers do differently each day to succeed.
                    </p>

                    <h1>Cloud as Coach &reg; Technologies</h1>
                    <p>Making all Your People as good as Your Best</p>

                    <div class="teamcapability"></div>
                    <div class="capselectarea">

                        <div class="poemask"></div>
                        <div class="fbmask"></div>
                        <div class="stndmask"></div>
                        <div class="connmask"></div>
                        <div class="goalmask"></div>
                        <div class="recmask"></div>
                    </div>
                    <p>The most successful Cloud as Coach adopting companies use REPs as the basis for Feedback. People set up and autonomously manage their own Feedback Networks, reaching out to peers, team members, managers and even partners and customers, delivering a stream of rich Feedback based on the REP. Cloud as Coach Technology then decodes priority areas for development and delivers a personalized road map and, even better, links the road map to the most beneficial readiness courses, programs, and actions, which enable people to reach the next level in performance.</p>

                    <p>Uniquely, the Cloud recognizes each individual's strengths and development priorities, meaning it can make smart choices about connecting people together. The Cloud connects people that are strong in certain practices with people who need development in the same practices. In other words, Cloud as Coach Technology uses data to make much smarter mentoring recommendations.</p>

                    <p>Identifying priority development areas becomes the fuel for setting Goals and tracking progress. Goals can easily be created, shared and tracked automatically based on Feedback streaming through from the Network. Managers and peers can deliver social Recognition, including badges, awards or special notices of achievement, upon the completion of Goals, or just for a job well done. This motivates people to continue to strive for excellence.</p>
                </div>
            </div>
        </div>
    </div>
    <!--End of Cloud as Coach Capabilities-->

    <!-- Microsoft Success Start here-->
    <div class="microsoft-Success" id="Div3">
        <div class="placeholder">
            <div class="cloudCol">
                <ul>

                    <li>
                        <div class="TeamCloudRight">
                            <div class="cont">
                                <h1>Microsoft's Success with Cloud as Coach Technology</h1>
                                <p>In order to help employees succeed Microsoft utilizes REPs to define excellence in role. REPs are critical to hiring, onboarding, readiness assessment, development, and engagement in many of the roles at Microsoft. Recognizing the importance of Cloud as Coach Technology, Microsoft's library of REPs has fast become a global beacon of performance excellence. Microsoft's Cloud as Coach platform let's Individuals create Feedback Networks including Managers, Skip-Level Managers, Peers, Partners, and even Customers. The result is a rich stream of Feedback flowing through delivering a clear picture of where each individual stands against the standard of performance excellence defined by the REP. Not only do individuals know where they stand, but they are also able to determine how in sync they are with their Manager's Feedback. Coaching conversations become more meaningful because Mangers can focus conversations on specific areas of strength and development priorities. In addition, Goals can be set and tracked automatically.</p>

                                <p>Cloud as Coach Technology is helping Microsoft build Total Teams that are connected and aligned by REPs, which drive role clarity and deliver challenging visions for excellence and create a development picture that enables continuous improvement and growth.</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Microsoft Success End here -->

    <!-- Building Team Start here-->
    <div class="building-Team" id="Div4">
        <div class="placeholder">
            <div class="cloudCol">
                <ul>

                    <li>
                        <div class="TeamCloudRight">
                            <div class="cont">
                                <h1>Building the Total Team with the Cloud</h1>
                                <p>In order to succeed in today's new business environment, companies must build teams that do not rely on a few key players to carry them to victory. A Total Team is required to win. Excellence must be defined and everyone must be aligned and coached to that standard of excellence. New Cloud technology enables managers to implement a world class coaching approach while at the same time enabling them to focus on doing what is most important in today's new environment, closing deals.</p>

                                <p>Build a team like the World Champion Germans, and build it using Cloud as Coach Technology.</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Building Team End here -->
</asp:Content>