<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    DataDumb
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script type="text/javascript">
        $(".report").click(function () {
            $(this).addClass("selected").siblings().removeClass("selected");
        });
    </script>
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Microsoft/login.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/ref/common.js"></script>
    <script src="../../Scripts/ref/DataDumb/DataDumb.js"></script>
    <div class="reportbackground"></div>
    <div class="pageholder">
        <div class="breadcrumb">Home > Data Dump</div>
        <h1>Data Dump</h1>
        <select id="selectPoe">
            <option value="15">Channel Executive</option>
            <option value="16">PTS</option>
            <option value="17">IMDM</option>
              <option value="18">Account Executive(Standard)</option>
            <option value="19">Account Executive(EMEA)</option>
              <option value="20">Account Manager(MidMarket)</option>
              <option value="21">Account Manager(Strategic)</option>
              <option value="22">Inside Sales(Standard)</option>
             <option value="23">Inside Sales(US&CA)</option>
            <option value="24">Sales Insights Manager(Standard)</option>
            <option value="25">Sales Insights Manager(MidMarket)</option>
            <option value="26">Sales Manager</option>
            <%--<option value="11">A&O Account Executive</option>
            <option value="12">A&O AdSol Specialist</option>
            <option value="13">A&O Product Specialist</option>--%>
        </select>
        <form id="getteamsubmit" method="POST" action="../DataDumb/GetTeammemberCapabailityDump">
            <input type="hidden" id="poeidval" name="poeidval" value="0" />
            <div class="report" id="getTeamReport">
                <img src="../../Images/team-member-report.png" />
                <div class="icon">
                    <img src="../../Images/team-ico.png" />
                </div>
                <input type="submit" value="teammember" />
                <p>All up Team Member Data Dump</p>
            </div>
        </form>
        <form id="getsubmit" method="POST" action="../DataDumb/GetMSAReport">
            <input type="hidden" id="poeid" name="poeid" value="0" />
            <div class="report" id="getmanagerReport">
                <img src="../../Images/manager-report.png" />
                <div class="icon">
                    <img src="../../Images/manager-ico.png" />
                </div>
                <input type="submit" value="Manager" />
                <p>
                    All up Manager
Data Dump
                </p>
            </div>
        </form>
         <form id="getimpSubmit" method="POST" action="../DataDumb/GetMSAPrioritiesReport">
            <input type="hidden" id="poeidImp" name="poeid" value="0" />
            <div class="report" id="getimportanceReport">
                <img src="../../Images/manager-report.png" />
                <div class="icon">
                    <img src="../../Images/manager-ico.png" />
                </div>
                <input type="submit" value="Importance" />
                <p>
                    Importance Data Dump(Manager)
                </p>
            </div>
        </form>
        <form id="ImportancTeam" method="POST" action="../DataDumb/GetImportanceReportSelf">
            <input type="hidden" id="poeidImpTeam" name="poeid" value="0" />
            <div class="report" id="impTeam">
                <img src="../../Images/manager-report.png" />
                <div class="icon">
                    <img src="../../Images/manager-ico.png" />
                </div>
                <input type="submit" value="Importance" />
                <p>
                    Importance Data Dump(Team)
                </p>
            </div>
        </form>
         <form id="getdemoSubmit" method="POST" action="../DataDumb/GetDemographicSurveyReport">
            <input type="hidden" id="poedemo" name="poeid" value="0" />
            <div class="report" id="demographicReport">
                <img src="../../Images/manager-report.png" />
                <div class="icon">
                    <img src="../../Images/manager-ico.png" />
                </div>
                <input type="submit" value="Importance" />
                <p>
                    Demographic Survey Data Dump
                </p>
            </div>
        </form>
        <form id="productsurveysubmit" method="POST" action="../DataDumb/GetProductSurveyReport">
            <input type="hidden" id="poeidProduct" name="poeid" value="0" />
            <div class="report" id="productsurvey">
                <img src="../../Images/manager-report.png" />
                <div class="icon">
                    <img src="../../Images/manager-ico.png" />
                </div>
                <input type="submit" value="Importance" />
                <p>
                    Product Survey Data Dump
                </p>
            </div>
        </form>
        
       <%-- <%if (ViewBag.RetrievePassword != null)
          {
        %>--%>
        <div class="reportbtn">
            <a href="../Report/RetrievePassword" target="_blank">Retrieve Password</a>
        </div>
       <%-- <div class="reportbtn">
            <a href="../DataDumb/DataDumbReport">Get Report</a>
        </div>--%>
      <%--  <%}%>--%>
    </div>
</asp:Content>