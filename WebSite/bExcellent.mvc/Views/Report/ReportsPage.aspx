<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/SignUp.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    ReportsPage
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script type="text/javascript">
        $(".report").click(function () {
            $(this).addClass("selected").siblings().removeClass("selected");
        });
    </script>
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Microsoft/login.css" rel="stylesheet" type="text/css" />
    <div class=""></div>
    <div class="pageholder">
        <div class="breadcrumb">Home > Reports</div>
        <h1>Reports</h1>
        <form method="POST" action="../Report/GetReportsForTeamMember">
            <div class="report">
                <img src="../../Images/team-member-report.png" />
                <div class="icon">
                    <img src="../../Images/team-ico.png" />
                </div>
                <input type="submit" value="teammember" />
                <p>All up Team Member Completion Report</p>
            </div>
        </form>
        <form method="POST" action="../Report/GetReportsForManager">
            <div class="report">
                <img src="../../Images/manager-report.png" />
                <div class="icon">
                    <img src="../../Images/manager-ico.png" />
                </div>
                <input type="submit" value="Manager" />
                <p>
                    All up Manager Completion Report
                </p>
            </div>
        </form>
        <%-- <form method="POST" action="../Report/GetReportsForTeamMemberHSP">
            <div class="report">
                <img src="../../Images/team-member-report.png" />
                <div class="icon">
                    <img src="../../Images/team-ico.png" />
                </div>
                <input type="submit" value="teammember" />
                <p>All up Team Member Completion Report(HSP)</p>
            </div>
        </form>
         <form method="POST" action="../Report/GetReportsForManagerHSP">
            <div class="report">
                <img src="../../Images/manager-report.png" />
                <div class="icon">
                    <img src="../../Images/manager-ico.png" />
                </div>
                <input type="submit" value="Manager" />
                <p>
                    All up Manager Completion Report(HSP)
                </p>
            </div>
        </form>--%>
        <%if (ViewBag.RetrievePassword != null)
          {
        %>
        <div class="reportbtn">
            <a href="../Report/RetrievePassword" target="_blank">Retrieve Password</a>
        </div>
        <%--<div class="reportbtn">
            <a href="../DataDumb/DataDumbReport" target="_blank">Get Report</a>
        </div>--%>
       <%-- <form method="POST" action="../Report/GetUpdatedPasswordLists">
            <div class="reportbtn">
             
                <input type="submit" value="Password Details" />
            </div>
        </form>--%>
        <%}%>
    </div>
</asp:Content>