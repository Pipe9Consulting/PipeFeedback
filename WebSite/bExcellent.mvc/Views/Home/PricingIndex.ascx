<script src="../../Scripts/ref/Home.js" type="text/javascript"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $('.priceind').show();
        $('.signupbut').live('click', function () {
            window.location.href = '/signup/register';
        });
        $('#signbuisness').live('click', function () {
            var mailid = 'sales@kessaku.com';
            var mailto_link = "mailto:" + mailid;
            window.location.href = mailto_link;
        });

    });
</script>
<div class="pageholder">
    <div id="tiles">
        <div class="breadcrumb">
            Home > Pricing & Packages
        </div>
        <div class="customertiles pricetiles">
            <h1>Pricing & Packages</h1>
            <ul>
                <li class="pricei"><a>
                    <div class="icon">
                        <img src="../../Images/icons/individual.png" alt="Features & Pricing for Individuals" />
                    </div>
                    <p>
                        Features & Pricing for Individuals
                    </p>
                </a></li>
                <li class="priceo"><a>
                    <div class="icon">
                        <img src="../../Images/icons/org.png" alt="Features and Pricing for Organizations" />
                    </div>
                    <p>
                        Features and Pricing for Organizations
                    </p>
                </a></li>
            </ul>
        </div>
    </div>
    <%--<div class="customertiles priceind">
                        <h1>
                            bexcellent features &amp; pricing for Individuals
                        </h1>
                        <div class="pricingcontent">
                        <div class="pricingcontentbg">
                            <img src="../../Images/pricing-bg.png" /></div>
                            <div class="column">
                                <div class="heading">
                                    &nbsp;</div>
                                <div class="align">
                                    <img src="../../Images/align.png" alt="Align" class="gap" /><img src="../../Images/icons/sync.png"
                                        alt="Sync" width="32" height="34" /></div>
                                <div class="collaborate">
                                    <img src="../../Images/collaborate.png" alt="Align" class="gap" /><img src="../../Images/icons/collaboration.png"
                                        alt="Sync" width="32" height="33" class="collaborateimg" /></div>
                                <div class="recognize">
                                    <img src="../../Images/recognize.png" alt="recognize" class="gap" /><img src="../../Images/icons/build-reputation.png"
                                        alt="Sync" class="recog" /></div>
                                <div class="perform">
                                    <img src="../../Images/perform.png" alt="Perform" class="gap" /><img src="../../Images/icons/standing.png"
                                        alt="Sync" width="35" height="37" class="recog" /></div>
                            </div>
                            <div class="column1">
                                <div class="heading">
                                    Features</div>
                                <ul>
                                    <li>Access Industry standard Profiles of Excellence </li>
                                    <li class="sp">Build Feedback Network </li>
                                    <li>Share Messages of Success </li>
                                    <li>Send video messages </li>
                                    <li>Post Messages on Wall </li>
                                    <li>Connect & Learn from Star Performers </li>
                                    <li>Collaborate via Yammer </li>
                                    <li class="sp">Send & Receive Email notifications </li>
                                    <li>Deliver Real-time Recognition </li>
                                    <li>Award Badges & Medals </li>
                                    <li class="sp">Build Reputation History </li>
                                    <li>View & Compare Standing </li>
                                    <li>Create Goals </li>
                                    <li>Review progress against goals </li>
                                </ul>
                            </div>
                            <div class="column2">
                                <div class="heading">
                                    <p>
                                        Trial</p>
                                    <p>
                                        <span class="feedback">First Feedback</span></p>
                                    <p>
                                        <span class="price">$0</span></p>
                                    <p>
                                        /5 Users/14 days</p>
                                </div>
                                <ul>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceI">&nbsp;</li>
                                    <li class="priceI">&nbsp;</li>
                                </ul>
                                <div class="btnheight">
                                    <div class="sign signupbut" id="trial1">
                                        Signup</div>
                                </div>
                            </div>
                            <div class="column3">
                                <div class="heading">
                                    <p>
                                        Individual</p>
                                    <p>
                                        <span class="feedback">Subscription </span>
                                    </p>
                                    <p>
                                        <span class="price">$10</span>
                                    </p>
                                    <p>
                                        /User/Per Month
                                    </p>
                                </div>
                                <ul>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                    <li class="priceS">&nbsp;</li>
                                </ul>
                                <div class="btnheight">
                                    <div class="sign signupbut" id="paid2">
                                        Signup</div>
                                </div>
                            </div>
                        </div>
                    </div>--%>
    <div class="customertiles priceind">
        <img src="../../Images/pricing-bg.png" />
        <h1>Kessaku Features &amp; Pricing for Individuals
        </h1>
        <table cellpadding="0" cellspacing="0">
            <tr>
                <td>&nbsp;
                </td>
                <td>&nbsp;
                </td>
                <td rowspan="15">&nbsp;
                </td>
                <td class="priceheading column1">
                    <h2>Features</h2>
                </td>
                <td rowspan="15">&nbsp;
                </td>
                <td class="priceheading column2">
                    <h3>Trial</h3>
                    <h2>First Feedback</h2>
                    <h1>$0</h1>
                    <h4>/5 Users/14 days</h4>
                </td>
                <td rowspan="15">&nbsp;
                </td>
                <td class="priceheading column2">
                    <h3>Individual</h3>
                    <h2>Subscription</h2>
                    <h1>$10</h1>
                    <h4>/User/Per Month</h4>
                </td>
            </tr>
            <tr>
                <td rowspan="2">
                    <img src="../../Images/align.png" alt="align" class="firstimg" />
                </td>
                <td rowspan="2">
                    <img src="../../Images/icons/sync.png" alt="align" class="secondimg" />
                </td>
                <td class="whitebg column1">Access Industry standard Role Excellence Profiles
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Build Feedback Network
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td rowspan="6">
                    <img src="../../Images/collaborate.png" alt="collaborate" class="firstimg" />
                </td>
                <td rowspan="6">
                    <img src="../../Images/icons/collaboration.png" alt="collaborate" class="secondimg" />
                </td>
                <td class="whitebg column1">Share Messages of Success
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Send video messages
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Post Messages on Wall
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Connect & Learn from Star Performers
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Collaborate via Yammer
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Send & Receive Email notifications
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td rowspan="3">
                    <img src="../../Images/recognize.png" alt="recognize" class="firstimg" />
                </td>
                <td rowspan="3">
                    <img src="../../Images/icons/build-reputation.png" alt="recognize" class="secondimg" />
                </td>
                <td class="whitebg column1">Deliver Real-time Recognition
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Award Badges & Medals
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Build Reputation History
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td rowspan="3">
                    <img src="../../Images/perform.png" alt="perform" class="firstimg" />
                </td>
                <td rowspan="3">
                    <img src="../../Images/icons/standing.png" alt="perform" class="secondimg" />
                </td>
                <td class="whitebg column1">View & Compare Standing
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Create Goals
                </td>
                <td class="whitebg  column2"></td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Review progress against goals
                </td>
                <td class="whitebg  column2"></td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td>&nbsp;
                </td>
                <td>&nbsp;
                </td>
                <td>&nbsp;
                </td>
                <td class="whitebg column1">&nbsp;
                </td>
                <td>&nbsp;
                </td>
                <td class="whitebg  column2">
                    <div class="sign signupbut">
                        Signup
                    </div>
                </td>
                <td>&nbsp;
                </td>
                <td class="whitebg  column2">
                    <div class="sign signupbut">
                        Signup
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <%--<div class="customertiles priceorg">
                                <h1>
                                    kessaku features & pricing for Organizations
                                </h1>
                                <div class="pricingcontent">
                                    <div class="column">
                                        <div class="heading">
                                            &nbsp;</div>
                                        <div class="align">
                                            <img src="../../Images/align.png" alt="Align" class="gap" /><img src="../../Images/icons/sync.png"
                                                alt="Sync" width="32" height="34" /></div>
                                        <div class="collaborateorg">
                                            <img src="../../Images/collaborate.png" alt="Align" class="gap" /><img src="../../Images/icons/collaboration.png"
                                                alt="Sync" width="32" height="33" class="collaborateimg" /></div>
                                        <div class="recognizeorg">
                                            <img src="../../Images/recognize-1366.png" alt="recognize" class="gap rec1366" />
                                            <img src="../../Images/recognize.png" alt="recognize" class="gap rec1920" /><img
                                                src="../../Images/icons/build-reputation.png" alt="Sync" class="recog" /></div>
                                        <div class="performorg">
                                            <img src="../../Images/perform.png" alt="Perform" class="gap" /><img src="../../Images/icons/standing.png"
                                                alt="Sync" width="35" height="37" class="recog" /></div>
                                    </div>
                                    <div class="column1 org">
                                        <div class="heading">
                                            Features</div>
                                        <ul>
                                            <li>Build your own Profiles of Excellence </li>
                                            <li class="sp">Set-up organization wide feedback networks </li>
                                            <li>Compare Standing based on Individual and Manager feedback </li>
                                            <li>Enable managers to deliver fast & meaningful coaching </li>
                                            <li>Enable managers to recommend relevant readiness </li>
                                            <li class="sp">Feed Yammer with the Profile of Excellence conversation </li>
                                            <li>Deliver real-time recognition </li>
                                            <li class="sp">Award badges & medals </li>
                                            <li>Create goals </li>
                                            <li>Review progress against goals </li>
                                            <li>View excellence performance at all organization levels </li>
                                            <li>Identify Top Performers and connect with everyone </li>
                                            <li>Compliment feedback with data metrics from CRM systems </li>
                                            <li>Identify priority skill development requirements </li>
                                        </ul>
                                    </div>
                                    <div class="column2">
                                        <div class="heading">
                                            <p>
                                                Business Subscription
                                            </p>
                                            <p>
                                                <span class="feedback">From as little as</span></p>
                                            <p>
                                                <span class="price">$5</span></p>
                                            <p>
                                                /Users/Per Month</p>
                                        </div>
                                        <ul>
                                            <li class="priceS">&nbsp;</li>
                                            <li class="priceS">&nbsp;</li>
                                            <li class="priceS">&nbsp;</li>
                                            <li class="priceS">&nbsp;</li>
                                            <li class="priceS">&nbsp;</li>
                                            <li class="priceS">&nbsp;</li>
                                            <li class="priceS">&nbsp;</li>
                                            <li class="priceS">&nbsp;</li>
                                            <li class="priceS">&nbsp;</li>
                                            <li class="priceS">&nbsp;</li>
                                            <li class="priceS">&nbsp;</li>
                                            <li class="priceS">&nbsp;</li>
                                            <li class="priceS">&nbsp;</li>
                                            <li class="priceS">&nbsp;</li>
                                        </ul>
                                        <div class="btnheight">
                                            <div class="sign" id="signupsales">
                                                Signup</div>
                                        </div>
                                    </div>
                                </div>
                            </div>--%>
    <div class="customertiles priceorg">
        <img src="../../Images/pricing-bg1.png" />
        <h1>kessaku Features & Pricing for Organizations
        </h1>
        <table cellpadding="0" cellspacing="0">
            <tr>
                <td>&nbsp;
                </td>
                <td>&nbsp;
                </td>
                <td rowspan="15">&nbsp;
                </td>
                <td class="priceheading column1">
                    <h2>Features</h2>
                </td>
                <td rowspan="15">&nbsp;
                </td>
                <td class="priceheading column2">
                    <h3>Business Subscription
                    </h3>
                    <h2>From as little as</h2>
                    <h1>$5</h1>
                    <h4>/Users/Per Month</h4>
                </td>
            </tr>
            <tr>
                <td rowspan="2">
                    <img src="../../Images/align.png" alt="align" class="firstimg" />
                </td>
                <td rowspan="2">
                    <img src="../../Images/icons/sync.png" alt="align" class="secondimg" />
                </td>
                <td class="whitebg column1">Build your own Role Excellence Profiles
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Set-up organization wide feedback networks
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td rowspan="4">
                    <img src="../../Images/collaborate.png" alt="collaborate" class="firstimg" />
                </td>
                <td rowspan="4">
                    <img src="../../Images/icons/collaboration.png" alt="collaborate" class="secondimg" />
                </td>
                <td class="whitebg column1">Compare Standing based on Individual and Manager feedback
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Enable managers to deliver fast &amp; meaningful coaching
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Enable managers to recommend relevant readiness
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Feed Yammer with the Role Excellence Profile conversation
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td rowspan="2">
                    <img src="../../Images/recognize.png" alt="recognize" class="firstimg" />
                </td>
                <td rowspan="2">
                    <img src="../../Images/icons/build-reputation.png" alt="recognize" class="secondimg" />
                </td>
                <td class="whitebg column1">Deliver real-time recognition
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Award badges &amp; medals
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td rowspan="6">
                    <img src="../../Images/perform.png" alt="perform" class="firstimg" />
                </td>
                <td rowspan="6">
                    <img src="../../Images/icons/standing.png" alt="perform" class="secondimg" />
                </td>
                <td class="whitebg column1">Create goals
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Review progress against goals
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">View excellence performance at all organization levels
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Identify Top Performers and connect with everyone
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Compliment feedback with data metrics from CRM systems
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td class="whitebg column1">Identify priority skill development requirements
                </td>
                <td class="whitebg  column2">
                    <img src="../../Images/tick.png" />
                </td>
            </tr>
            <tr>
                <td>&nbsp;
                </td>
                <td>&nbsp;
                </td>
                <td>&nbsp;
                </td>
                <td class="whitebg column1">&nbsp;
                </td>
                <td>&nbsp;
                </td>
                <td class="whitebg  column2">
                    <div class="sign" id="signbuisness">
                        Signup
                    </div>
                </td>
            </tr>
        </table>
    </div>
</div>