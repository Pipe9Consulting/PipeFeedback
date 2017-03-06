<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Manager Sync
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Sync/practicearea.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/datepicker.css" rel="stylesheet" />
     <link href="../../Styles/Sync/syncSetgoals.css" rel="stylesheet" />
    <%-- Slider Remove--%>
    <%--<link type="text/css" href="../../Styles/Standing/slider-spa.css" rel="stylesheet" type="text/css" />--%>
    <%-- Slider Remove--%>

    <script src="../../Scripts/JqueryUI.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/editor/jquery.sceditor.min.js" type="text/javascript"></script>
    <script src="../../Scripts/JqueryUI.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Sync/Sync.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Sync/Digin.js" type="text/javascript"></script>
   <%-- <script src="../../Scripts/ref/Standing/StandingPA.js"></script>--%>
    <script src="../../Scripts/jquery-sticklr-1.0.pack.js" type="text/javascript"></script>
<%--    <script src="../../Scripts/ref/Sync/syncSetGoals.js" type="text/javascript"></script>--%>

    <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb">
        </div>
    </div>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#example-2').sticklr({
                showOn: 'click',
                stickTo: 'right'

            });

       
        });
    </script>

    <%-- <script type="text/javascript">
    </script>--%>
    <style>
        #Qnosww1 .ui-slider-range {
            background-image: url(../../Images/goal-slider.png);
            cursor: pointer;
            width: 360px;
        }

        .digqn-dummy {
            width: 5.5%;
            height: 0;
            padding: 0.2% 0 5%;
            color: #ffffff;
            background: url(../../Images/be-bg.jpg) no-repeat #e5e5e5;
            text-align: center;
            font-size: 113%;
            float: left;
            margin-right: 1%;
        }

        .indexrightclose2 {
            position: absolute;
            top: -3%;
            right: 16px;
            background: url(../../images/chart/standing/plus-bg.png) no-repeat center #e0b001;
            background-size: 70% 70%;
            width: 3.5%;
            height: 0;
            padding-bottom: 3.5%;
            border-radius: 50%;
            z-index: 9;
            cursor: pointer;
        }
    </style>
    <script type="text/javascript">
        //$(document).ready(function () {
        //    $("#Qnosww1").slider({
        //        min: 0,
        //        max: 4,
        //        range: "min",
        //        value: 3,
        //        slide: function (event, ui) {
        //            if (ui.value == 0) {
        //                event.preventDefault();
        //                $('#Qnosww1').data("answer", 1);
        //            } else {
        //                $('#Qnosww1').data("answer", ui.value);
        //            }
        //        }
        //    });
        //});
        //function loadManagersList() {
        //    Common.ajax({
        //        url: '../../Common/GetMyReceiveFbTeam',
        //        success: function (response) {
        //            var html = "";
        //            for (var i = 0; i < response.length; i++) {
        //                html = html + "<li data-value= " + response[i].User.UserId + ">" + response[i].User.FirstName + " " + response[i].User.LastName + "</li>";
        //            }
        //            $('#assignees').append(html);
        //        },
        //        error: function (err) {
        //        }
        //    });
        //}

        //function LoadQuestions(moduleid, questionid) {
        //    var output = 0;
        //    Common.ajaxsync({
        //        url: "/Feedback/GetGoal?moduleid=" + moduleid + '&quesionid=' + questionid,
        //        success: function (response) {
        //            output = response;
        //        },
        //        error: function (err) {
        //        }
        //    });
        //    return parseInt(output);
        //}
        //var loadCSS = function (callback) {
        //    var link = document.createElement('link');
        //    link.type = 'text/css';
        //    link.rel = 'stylesheet';
        //    link.href = "/Scripts/ref/editor/themes/square.min.css";
        //    link.id = 'theme-style';

        //    document.getElementsByTagName('head')[0].appendChild(link);

        //    var img = document.createElement('img');
        //    img.onerror = function () {
        //        if (callback) callback(link);
        //    };
        //    img.src = "/Scripts/ref/editor/themes/square.min.css";
        //};
        //var initEditor = function () {
        //    $("textarea").sceditor({
        //        plugins: 'bbcode',
        //        resizeEnabled: false,
        //        runWithoutWysiwygSupport :true,
        //       // toolbar: "bold,italic,underline,left,center,right,justify,bulletlist,orderedlist",
        //        style: "/Scripts/ref/editor/jquery.sceditor.default.min.css"
        //    });
        //};
        //initEditor();
        //loadCSS(initEditor);

        //$('.sceditor-container').css('height', 'auto');
        //(function ($) {
        //    jQuery.fn.vscontext = function (options) {
        //        var defaults = {
        //            menuBlock: null,
        //            offsetX: 8,
        //            offsetY: 8,
        //            speed: 'slow'
        //        };
        //        var options = $.extend(defaults, options);
        //        var menu_item = '.' + options.menuBlock;
        //        return this.each(function () {
        //            $(this).bind("contextmenu", function (e) {
        //                return false;
        //            });
        //            $(this).mousedown(function (e) {
        //                $('#selectedques').val(e.target.parentElement.id);
        //                var offsetX = e.pageX + options.offsetX;
        //                var offsetY = e.pageY + options.offsetY;
        //                if (e.button == "0") {
        //                    $(menu_item).show(options.speed);
        //                    $(menu_item).css('display', 'block');
        //                    $(menu_item).css('top', offsetY);
        //                    $(menu_item).css('left', offsetX);
        //                    $('.sharebtn').removeClass("selected");
        //                } else {
        //                    $(menu_item).hide(options.speed);
        //                }
        //            });
        //        });
        //    };
        //})(jQuery);
        //$(document).click(function (event) {
        //    if ($(event.target).parents().index($('.vs-context-menu')) == -1) {
        //        if (!$(event.target).hasClass("managerShareResource") && !$(event.target).hasClass("shareImg")) {
        //            if ($('.vs-context-menu').is(":visible")) {
        //                $('.vs-context-menu').hide();
        //            }
        //        }
        //    }
        //});
        //$(".vs-context-menu li").live('click', function () {
        //    if ($(this).parent().parent().parent().attr('id') != "setTrackGoal") {
        //        var selectedValue = $(this).attr('data-value');
        //        $('.vs-context-menu').hide();
        //        var currentindex = $('#currIndex').val();
        //        var goalRequests = [];
        //        var goalRequest = new Requests.GoalShare();
        //        goalRequest = new Requests.GoalShare();
        //        if (currentindex == 0) {
        //            if (event.value != 0) {
        //                goalRequest.QuestionId = parseInt(($('#qusetionid').val()));
        //                goalRequest.SelectedValue = parseInt($('#Answers').val());
        //                goalRequest.SharedWithId = parseInt(selectedValue);
        //                goalRequests.push(goalRequest);
        //                Common.ajaxPost({
        //                    url: '/Feedback/SaveGoal',
        //                    data: goalRequests,
        //                    success: function (response) {
        //                    },
        //                    error: function (err) {
        //                    }
        //                });
        //            }
        //        } else {
        //            //var goalRequests = [];
        //            //var goalRequest = new Requests.GoalShare();
        //            //goalRequest = new Requests.GoalShare();
        //            goalRequest.QuestionId = 0;
        //            goalRequest.SelectedValue = 0;
        //            goalRequest.SharedWithId = parseInt(selectedValue);
        //            goalRequests.push(goalRequest);
        //            var url = $('#sharedUrl').val();
        //            var title = $('#sharedTitle').val();
        //            Common.ajaxSyncPost({
        //                url: '/Common/SendResourceMail',
        //                data: { 'userslist': goalRequests, 'url': url, 'resourceTitle': title },
        //                success: function (response) {
        //                    alert("Shared successfully");
        //                },
        //                error: function (err) {
        //                }
        //            });
        //        }
        //        //debugger;
        //    }
        //});
        $(document).ready(function () {
           // $('.vs-context-menu').hide();
            //loadManagersList();
            //$('.sharebtn').vscontext({ menuBlock: 'vs-context-menu' });
        });
        //function loadManagersList() {
        //    Common.ajaxsync({
        //        url: '../../Common/GetMyReceiveFbTeam',
        //        success: function (response) {
        //            var html = "";
        //            for (var i = 0; i < response.length; i++) {
        //                html = html + "<li data-value= " + response[i].User.UserId + ">" + response[i].User.FirstName + " " + response[i].User.LastName + "</li>";
        //            }
        //            $('#assignees').append(html);
        //        },
        //        error: function (err) {
        //        }
        //    });
        //}
    </script>



      <%
        var h = 0;

        if (Session["NetworkPage"] != null)
        {
            h = int.Parse(Session["NetworkPage"].ToString());
        }

    %>

    <input type="hidden" id="networkMode" value="<%:h%>" />
    <input type="hidden" id="selectedpoeDigdeep" />
    <input type="hidden" id="goalSharedWith" value="0" />

    <!--Yammer Popup-->
    <input type="hidden" id="hiddentThis" />


    <%
        var t = 0;
        if (Session["SelectedPoe"] != null)
        {
            t = int.Parse(Session["SelectedPoe"].ToString());
        }


        var p = 0;
        if (Session["subid"] != null)
        {
            p = int.Parse(Session["subid"].ToString());
        }
    %>

    <input type="hidden" id="Subid" value="<%:p%>" />
    <input type="hidden" id="selectedPoeValuePotentialMentors" value="<%:t%>" />
    <input type="hidden" id="potentialMentorsType" value="0" />
    <input type="hidden" id="selectedques" />
    <input type="hidden" id="tempshareid" />


    



    <input type="hidden" id="qusetionid" value="0" />
    <input type="hidden" id="Answers" value="0" />
    <input type="hidden" id="pagemodes" value="1" />
    <input type="hidden" id="PoeName" value="" />
    <input type="hidden" id="choosenTile" value="0" />
    <input type="hidden" id="currIndex" value="0" />
    <input type="hidden" id="sharedUrl" value="" />
    <input type="hidden" id="sharedTitle" value="" />
    <input type="hidden" name="moduleid" id="moduleid" />













    <div class="popupbg">
        &nbsp;
    </div>
    <div class="popup">
        <div class="close">
        </div>
        <p id="info">
            Please select a user
        </p>
    </div>

    <div class="requestpopup" id="newpopup">
        <div class="close">
        </div>
        <p id="P3">
            Your request has been sent successfully
        </p>
        <div style="clear: both;"></div>
        <div>
            <a href="#">Email</a>
            <a href="#">PIPE9</a>
            <a href="#">Yammer</a>
        </div>
    </div>

    <%--    <div class="vs-context-menu">

        <ul id="assignees">
            <li class="bold" id="sharegoalChange">Share this Goal with:</li>
            <li data-value="-1">Everyone</li>
        </ul>
    </div>--%>

    <% var dataField = 3;
       if (Session["type"] != null)
       {
           if (int.Parse(Session["type"].ToString()) != 2)
           {
               dataField = 1;
           }
       } %>
    <input type="hidden" value="<%:dataField %>" id="tileclicked" />
    <input type="hidden" id="hidselectedval" value="0" />
    <input type="hidden" id="moreDigIn" value="0" />
    <div class="pageholder">
        <h1 class="lft_head">Practice Areas</h1>
        <div class="stand standlaning">
            
            <div class="scroll1">
                <ul id="UserlistDigin">
                </ul>
            </div>
        </div>
        <!--Manager-->
        <div class="chartholder" id="manager1">
                <div class="slidebtn">
                    <a href="#" class="prev" id="p1">Previous</a> <a href="#" class="prev" id="p2">Previous</a>
                    <div class="pagination" id="pagetxt">
                        Page 1 of 2
                    </div>
                    <a href="#" class="nxt" id="bn1">Next</a> <a href="#" class="nxt" id="bn2">Next</a>
                </div>
            <div class="chartslide">
                <!--Chart-->
                <div id="q1" class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder pa1">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">Self</li>
                                        <li class="legend2">Manager</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop"></div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Pa1Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Pa1Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Pa1Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Pa1Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!--<ul class="scale paAr1" id="Toppa1Level">
                                        <li class="scale1" id="Pa1level1">1.6</li>
                                        <li class="scale2" id="Pa1level2">4.3</li>
                                        <li class="scale3" id="Pa1level3">12.1</li>
                                        <li class="scale4" id="Pa1level4">16.3</li>
                                    </ul> --->
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Pa1">
                                </div>
                            </div>
                        </div>
                        <div class="chartsmlplaceholder pa2">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">Self</li>
                                        <li class="legend2">Manager</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Pa2Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Pa2Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Pa2Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Pa2Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!--<ul class="scale paAr1" id="Ul1">
                                        <li class="scale1" id="Pa2level1">25%</li>
                                        <li class="scale2" id="Pa2level2">50%</li>
                                        <li class="scale3" id="Pa2level3">75%</li>
                                        <li class="scale4" id="Pa2level4">100%</li>
                                    </ul> -->
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Pa2">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Chart -->
                    <!--Chart-->
                    <div class="coltwo">
                        <div class="chartsmlplaceholder pa3">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">Self</li>
                                        <li class="legend2">Manager</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Pa3Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Pa3Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Pa3Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Pa3Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!--<ul class="scale paAr1" id="Ul2">
                                        <li class="scale1" id="Pa3level1">25%</li>
                                        <li class="scale2" id="Pa3level2">50%</li>
                                        <li class="scale3" id="Pa3level3">75%</li>
                                        <li class="scale4" id="Pa3level4">100%</li>
                                    </ul> -->
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="digstatusEqual" id="Pa3">
                                </div>
                            </div>
                        </div>
                        <!-- End Chart -->
                        <!--Chart-->
                        <div class="chartsmlplaceholder pa4">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">Self</li>
                                        <li class="legend2">Manager</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <%--<li class="progressbar1" style="width: 0%" id="Pa4Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Pa4Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Pa4Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Pa4Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>--%>
                                            </ul>
                                        </div>
                                    </div>
                                    <!--<ul class="scale paAr1" id="Ul3">
                                        <li class="scale1" id="Pa4level1">25%</li>
                                        <li class="scale2" id="Pa4level2">50%</li>
                                        <li class="scale3" id="Pa4level3">75%</li>
                                        <li class="scale4" id="Pa4level4">100%</li>
                                    </ul>-->
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Pa4">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="charttitle">
                        Sync
                    </div>
                </div>
                <div id="q2" class="slide">
                    <div class="coltwo">
                        <div class="chartsmlplaceholder pa5">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">Self</li>
                                        <li class="legend2">Manager</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Pa5Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Pa5Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Pa5Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Pa5Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!--<ul class="scale paAr1" id="Ul4">
                                        <li class="scale1" id="Pa5level1">25%</li>
                                        <li class="scale2" id="Pa5level2">50%</li>
                                        <li class="scale3" id="Pa5level3">75%</li>
                                        <li class="scale4" id="Pa5level4">100%</li>
                                    </ul>-->
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Pa5">
                                </div>
                            </div>
                        </div>
                        <div class="chartsmlplaceholder pa6">
                            <h1></h1>
                            <div class="chartdiv">
                                <div class="legend">
                                    <ul>
                                        <li class="legend1">Self</li>
                                        <li class="legend2">Manager</li>
                                    </ul>
                                </div>
                                <div class="chart">
                                    <div class="chartop">
                                    </div>
                                    <div class="chartbg">
                                        <div class="chartarea">
                                            <ul>
                                                <li class="progressbar1" style="width: 0%" id="Pa6Pro1">
                                                    <p>
                                                    </p>
                                                </li>
                                                <li class="progressbar2" style="width: 0%" id="Pa6Pro2">
                                                    <p>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="chartbtm">
                                        <div class="markerholder">
                                            <ul>
                                                <li class="markergray" style="width: 0%" id="Pa6Mar2">
                                                    <p>
                                                        50
                                                    </p>
                                                </li>
                                                <li class="markeramper" style="width: 0%" id="Pa6Mar1">
                                                    <p>
                                                        30
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <%--<ul class="scale paAr1" id="Ul5">
                                        <li class="scale1" id="Pa6level1">25%</li>
                                        <li class="scale2" id="Pa6level2">50%</li>
                                        <li class="scale3" id="Pa6level3">75%</li>
                                        <li class="scale4" id="Pa6level4">100%</li>
                                    </ul>--%>
                                </div>
                                <div class="pointer">
                                </div>
                                <div class="status" id="Pa6">
                                </div>
                            </div>
                        </div>
                        <div class="charttitle1">
                            Sync
                        </div>
                    </div>
                </div>
                <!-- End Chart -->
            </div>
        </div>
        <div id="sticky">



        <ul id="example-2" class="sticklr">
            <%--<li>
                <a href="#" class="standPAIcon" title="Standing PA Info">
                    <p>Sync PA Info</p>
                </a>
                <ul class="content3" id="poetraits">
                    <li id="diginsyncPoeContent">
                                <table id="papoeContents">

                                    <tr>
                                        <th>Practice Area</th>
                                        <th>Priority</th>
                                        <th>Points</th>
                                    </tr>
                                 
                                </table>

                           
                        <h3>Self Feedback Standing</h3>
                        <div>

                            <div class="helpcontent">
                                <div class="descinfo">

                                    <div class="hlprow">
                                        <div class="hlpheading">Community</div>
                                        <div class="hlpcont">Your Self Feedback score compared with the average Self Feedback score of your role community</div>
                                    </div>
                                    <div class="hlprow">
                                        <div class="hlpheading">Area Team</div>
                                        <div class="hlpcont">Your Self Feedback score compared with the average Self Feedback score of your team</div>
                                    </div>
                                    <div class="hlprow">
                                        <div class="hlpheading">Mentors</div>
                                        <div class="hlpcont">Your Self Feedback score compared with the average Self Feedback score of others in your role community who stand within 20% of the goal</div>
                                    </div>
                                    <div class="hlprow">
                                        <div class="hlpheading">Tenure</div>
                                        <div class="hlpcont">Your Self Feedback score compared with the average Self Feedback score of various tenure groups in your role community</div>
                                    </div>
                                    <div class="hlprow">
                                        <div class="hlpheading">Previous</div>
                                        <div class="hlpcont">Your Self Feedback score compared with your previous Self Feedback score</div>
                                    </div>
                                    <div class="hlprow">
                                        <div class="hlpheading">All</div>
                                        <div class="hlpcont">A comprehensive view of your Self Feedback score compared with Community, Team, Mentors and Previous</div>
                                    </div>
                                </div>

                            </div>

                        </div>

                      


                    </li>
                </ul>

            </li>--%>
           <%-- <li id="rep">
                <a href="#" class="repIcon" title="REP">
                    <p>REP</p>
                </a>




                <ul class="feedbackIntro nextData">

                    
                </ul>




                <ul class="feedbackIntro beforedata">

                    
                </ul>






                <ul class="feedbackIntro">

                  
                </ul>






                <ul class="feedbackIntro">
                   
                </ul>





            </li>--%>
            <%--<li>
                <a href="#" class="mentorIcon" title="Connect with your Mentors">
                    <p>Connect with your Mentors</p>
                </a>
                <ul class="mentorsPanel">

                    <li>





                        <ul id="seekSherpas">

                            <h2>Connect with your Mentors </h2>


                            <p>Connect with Mentors to learn about the unique ways people across the community approach new opportunities, overcome challenges, and pursue excellence in role.</p>
                         
                            <div id="seekSherpasMentors">
                             
                            </div>
                              
                        </ul>
                        <div class="clr">


                            <textarea name="bbcode_field" style="height: 100px; width: 150px; display: none;" id="textAreaMentors">                        </textarea>

                            <a href="#" id="Button4" type="button" class="send sendReqMentors">Send </a>
                        </div>



                </ul>
            </li>--%>
           <%-- <li>
                <a href="#" class="setGoalIcon" title="Set & Track Goals">
                    <p>Set & Track Goals</p>
                </a>
               

                 <ul class="keyActions" id="setTrackGoal">
                    <div class="vs-context-menu">

                        <ul id="assigneess">
                            <li class="bold" id="sharegoalChanges">Share this Goal with:</li>
                            <li data-value="-1">Everyone</li>
                        </ul>
                    </div>--%>


                   <%-- <li>


                        <h2>Set and Track Goals</h2>
                        <p>Set, share, and track development goals based on the knowledge you have acquired about the practices you can adopt to achieve excellence in your role.</p>
                        

                        <div id="practiceAreaQuestions">
                           
                        </div>

                        <div class="doneBtn" id="saveGoals"><a href="#">Done</a></div>
                        <div class="goalSavedPopContent" style="display: none;">


                            <h3>Your goals have been successfully set and shared with everyone you have assigned.</h3>
                            <div class="goalsSetSaveBtn">
                                <a class="goalDateSuccessYes">OK</a>
                            </div>
                        </div>
                        <div class="goalNotSavedPopContent" style="display: none;">


                            <h3>Goals have been set,but not saved..Save the goal date by clicking the done button.</h3>
                            <div class="goalsNotSaveBtn">
                                <a class="notSaved">OK</a>
                            </div>
                        </div>

                        
                                        <div class="dummyBg" style="display:none;"> 
                                            <h3>Your manager has to give you a feedback before you can set goals.</h3>
                                        </div>
                    </li>

                </ul>
                
            </li>--%>
            <%--<li>

                <a href="#" class="readinessResoucesIcon standingNav3" title="Readiness Resources">
                    <p>Readiness Resources</p>
                </a>
                <ul class="readinessResources ">
                    <div class="vs-context-menu">

                        <ul id="Ul1">
                            <li class="bold" id="Li1">Share this Goal with:</li>
                            <li data-value="-1">Everyone</li>
                        </ul>
                    </div>

                    <li id="readinessAccordion">

                       

                    </li>
                </ul>

            </li>--%>
           <%-- <li>
                <a href="#" class="connectPeersIcon" title="Connect with Peers">
                    <p>Connect with Peers</p>
                </a>
                <ul class="peersPanel">

                    <li>





                        <ul class="reqFeedback">

                            <h2>Connect with your Peers </h2>


                            <p>
                                There’s nothing more powerful than feedback from peers. Connect with your peers to request feedback or learn more about the feedback you have already received.
                            </p>
                            <div class="scroll3">
                            <div id="reqFeedbackPeers">
                                                          </div>
                                </div>
                        </ul>


                        <div class="clr">
                            <a href="#" id="ReqFeedbackSubmit" type="button" class="send ReqFeedbackSubmit">Request Feedback</a>

                            <textarea name="bbcode_field" style="height: 100px; width: 150px; display: none;" id="textAreaPeers">                        </textarea>

                            <a href="#" id="A1" type="button" class="send sendReqPeers">Send</a>
                        </div>



                </ul>
            </li>--%>





        </ul>
    </div>
    </div>
    <div id="primarynav">
        <%-- Module Intro Count--%>
        <div id="moduleintroslidecount" style='display: none;'>
        </div>

        <div id="moduleintro0" style='display: none;'>
        </div>
        <div id="moduleintro1" style='display: none;'>
        </div>
        <div id="moduleintro2" style='display: none;'>
        </div>
        <div id="moduleintro3" style='display: none;'>
        </div>

        <div id="setgoalsslidecount" style='display: none;'>
        </div>
        <div id="setgoals0" style='display: none'>
        </div>
        <div id="setgoals1" style='display: none'>
        </div>
        <div id="setgoals2" style='display: none'>
        </div>
        <div id="setgoals3" style='display: none'>
        </div>
        <div id="ProgramSlideCount" style='display: none;'>
        </div>
        <div id="Program0" style='display: none;'>
        </div>
        <div id="Program1" style='display: none;'>
        </div>
        <div id="Program2" style='display: none;'>
        </div>

        <div id="Coachingslidecount" style='display: none;'>
        </div>
        <div id="Coaching0" style='display: none;'>
        </div>
        <div id="Coaching1" style='display: none;'>
        </div>
        <div id="Coaching2" style='display: none;'>
        </div>

        <div id="ConnectslideCount" style='display: none;'>
        </div>
        <div id="Connect0" style='display: none;'>
            <div id="Connnect1" style='display: none;'>
            </div>
            <div id="Connnect2" style='display: none;'>
            </div>
        </div>


    </div>


    <%--<div class="indexright" style="right: -33.5%;">
        <div class="indexrightarrow">
            <div class="indexclose" id="Div2" style="display: block;">
                <span></span>
            </div>
        </div>
        <div class="indexrightclose" style="display: block;">
            <span></span>
        </div>
        <div class="indexrightclose1" style="display: none;">
            <span></span>
        </div>
        <div class="indexrightclose2" style="display: none;">
            <span></span>
        </div>
        <div class="model">
            <div class="modelcontent" style="left: 0px;">
                <div class="helpcontent">

                    <div class="spaRight-des">
                        <span>
                            <h1>Definition</h1>
                            <p class="hlpcont">
                                Each of the Practice Areas is weighted based on the priority level of each Practice Area for achieving excellence as defined in the Profile of Excellence. Priority determines the number of points out of 100 that are designated to each Practice Area. Practice Areas with a higher priority level represent a larger proportion of the maximum possible points for this PoE.
                            </p>
                        </span>
                    </div>
                    <div class="pageBtn-Part margindown">
                        <a id="A1" class="SelectPagebtn" href="#">1</a>
                        <a id="A2" href="#">2</a>
                        <a id="pagethree" href="#">3</a>
                    </div>
                </div>

                <div class="helpcontent">
                    <div class="patable">
                        <h1 id="PAname">Human Selling</h1>

                        <table id="papoeContents">
                        </table>
                        <div class="pageBtn-Part margindown">
                            <a id="pageonevals" href="#">1</a>
                            <a id="A5" class="SelectPagebtn" href="#">2</a>
                            <a id="pagethrees" href="#">3</a>
                        </div>
                    </div>
                </div>
                <div class="helpcontent">
                    <div class="descinfo">
                        <h1>Definitions</h1>
                        <div class="hlprow">
                            <div class="hlpheading">Community</div>
                            <div class="hlpcont">Your score compared with the average score of the role community</div>
                        </div>
                        <div class="hlprow">
                            <div class="hlpheading">Area Team</div>
                            <div class="hlpcont">Your score compared with the average Feedback score of the team </div>
                        </div>
                        <div class="hlprow">
                            <div class="hlpheading">Pathfinders</div>
                            <div class="hlpcont">Your score compared with the average score of others in the role community with scores within 20% of the goal</div>
                        </div>
                        <div class="hlprow">
                            <div class="hlpheading">Tenure</div>
                            <div class="hlpcont">Your score compared with other tenure groups in the role community</div>
                        </div>
                        <div class="hlprow">
                            <div class="hlpheading">Previous</div>
                            <div class="hlpcont">Your score compared with your previous score</div>
                        </div>
                        <div class="hlprow">
                            <div class="hlpheading">All</div>
                            <div class="hlpcont">A comprehensive view of your score compared with Community, Team, Pathfinders and Previous</div>
                        </div>
                    </div>
                    <div class="pageBtn-Part" style="margin-top: 10px;">
                        <a id="A3" href="#">1</a>
                        <a id="A4" href="#">2</a>
                        <a id="A7" class="SelectPagebtn" href="#">3</a>
                    </div>
                </div>
            </div>
        </div>
    </div>--%>





    <!------------------Right Side Panel -------------->

    
</asp:Content>
