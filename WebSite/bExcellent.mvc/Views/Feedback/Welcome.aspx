<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MaxiPoe.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Pipe9 Feedback - Welcome
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">


    <link href="../../Styles/feedback/welcomeFb.css" rel="stylesheet" />
    <script src="../../Scripts/ref/Feedback/Welcome.js"></script>
    <%
        var h = 0;

        if (Session["fbmode"] != null)
        {
            h = int.Parse(Session["fbmode"].ToString());
        }
        var cap = 0;

        if (Session["fbmode"] != null)
        {
            cap = int.Parse(Session["SelectedCapability"].ToString());
        }

    %>
    <input type="hidden" id="selectedMode" value="<%:h%>" />
     <input type="hidden" id="selectedCap" value="<%:cap%>" />
    <div class="sixteen wide column breadMenu">

        <div class="ui breadcrumb">
            <a class="section" href="../Common/Index">Home</a>
            <i>></i>
            <a class="section" href="../Feedback/Feedback">Feedback</a>
            <i>></i>
            <a class="section" id="breadcrumbtxt">Self-Feedback</a>
            <i>></i>
            <a class="section" id="A1">Welcome</a>
        </div>
    </div>

    <div class="Welcome_wrapper">

        <div class="welcomePhoto">
            <img src="../../Images/start/welcomePhoto.jpg" alt="welcome" />
            <span>Sponsor</span>
        </div>

         <div class="welcomeContent" id="selfIntroCont" style="display:none">

            <p>

             <b>Welcome!</b> YYou have been invited to complete Self-Feedback based on this Role Profile. Role Profiles defines the specific Skills that represent excellence in role. For each Skill in the Profile, you will be asked to specify how 
             <b>important</b> you think that Skill is for success in your market<span class="capabilityremoves">, how <b>proficient</b> you are at demonstrating that Skill,</span> and how <b>frequently</b> frequently you demonstrate that Skill.  



            </p>
            <h2>Benefits of Self-Feedback:</h2>
            <ul>

                <li>Identifies your personal development priorities relating to this Role Profile.</li>
                <li>Enables your Manager to provide more meaningful and targeted coaching.</li>
                <li>Helps establish role readiness investment priorities for your community.</li>
            </ul>
            <h2>Please Note:</h2>
            <ul>

                <li>Your personal data will not be used or shared with anyone other than your manager.</li>
                <li>Role Profiles are not a basis for performance reviews.</li>
                <li>Feedback is not a direct measure of performance, nor should the Skills described be tied directly to a specific review score.</li>
            </ul>
            <p>Once you have completed Self-Feedback, you will be asked to sign and approve your final submission. Please begin Self-Feedback and thank you for participating!</p>
            <a href="../../Feedback/Feedbackguide">Continue</a>
            
        </div>
        <div class="welcomeContent" id="managerIntroCont" style="display:none">

            <p>
              <b>Welcome!</b> You have been invited to complete Team-Feedback based on your team’s Role Profiles. Role Profiles define the specific Skills that represent excellence in role. For each Skill in the Profile, you will be asked to specify how
               <b>important</b> you think that Skill is for success in your market<span class="capabilityremoves">, 
                how <b>proficient</b> each of your team members is at demonstrate that Skill,</span> and how <b>frequently</b> each of your team members demonstrate that Skill.  

            </p>
            <h2>Benefits of Team-Feedback:</h2>
            <ul>

                <li>Identifies development priorities for your team members relating to their Role Profiles.</li>
                <li>Enables you to provide more meaningful and targeted coaching. </li>
                <li>Helps establish role readiness investment priorities for your community.</li>
            </ul>
            <h2>Please Note:</h2>
            <ul>

                <li>Community-wide Feedback results will only be shared with Role Owners and key stakeholders involved in Role Excellence and Readiness.</li>
                <li>Role Profiles are not a basis for performance reviews.</li>
                <li>Feedback is not a direct measure of performance, nor should the Skills described be tied directly to a specific review score. </li>
            </ul>
            <p>Once you have completed Team-Feedback, you will be asked to sign and approve your final submission. Please begin Team-Feedback and thank you for participating!</p>
            <a href="../../Feedback/Feedbackguide">Continue</a>
            
        </div>


       <%-- <div class="welcomeContent" id="selfIntroCont" style="display:none">

            <p>

             <b>Welcome!</b> You have been invited to complete Self-Feedback based on the Role Excellence Profile (REP) for the important role that you perform at Microsoft. 
                The REP defines the specific Actions that represent excellence in role. For each of these “Excellence Actions” in the REP, you will be asked to specify 
                how <b>important</b> you think that Action is for success in your market<span class="capabilityremoves">, how <b>ready</b> you are to demonstrate that Action,</span> and how <b>frequently</b> you demonstrate that Action.  



            </p>
            <h2>Benefits of Self-Feedback:</h2>
            <ul>

                <li>Identify your personal development priorities relating to your REP.</li>
                <li>Enable your Manager to provide more meaningful and relevant coaching. </li>
                <li>Help establish role readiness investment priorities for your community.</li>
            </ul>
            <h2>Please Note:</h2>
            <ul>

                <li>Your personal data will not be used or shared with anyone outside of your manager and key stakeholders involved in the involved in this Role Excellence assessment.</li>
                <li>The REP is not a substitute for setting priorities or plans, nor should it be used as the basis for performance reviews.</li>
                <li>The REP is not to be used as a direct measure of performance, nor should the Actions described be tied directly to a specific review score.</li>
            </ul>
            <p>Once you have completed Self-Feedback, you will be asked to sign and approve your final submission. Please begin Self-Feedback and thank you for participating!</p>
            <a href="../../Feedback/Feedbackguide">Continue</a>
            
        </div>
        <div class="welcomeContent" id="managerIntroCont" style="display:none">

            <p>
              <b>Welcome!</b> You have been invited to complete Team-Feedback based on your team’s Role Excellence Profile (REP). 
                The REP defines the specific Actions that represent excellence in role. For each of these “Excellence Actions” in 
                the REP, you will be asked to specify how <b>important</b> you think that Action is for success in your market<span class="capabilityremoves">, 
                how <b>ready</b> each of your team members is to demonstrate that Action,</span> and how <b>frequently</b> each of your team members 
                demonstrate that Action.  

            </p>
            <h2>Benefits of Team-Feedback:</h2>
            <ul>

                <li>Identify development priorities for your team members relating to their REP.</li>
                <li>Enables you to provide more meaningful and relevant coaching. </li>
                <li>Help establish role readiness investment priorities for your community.</li>
            </ul>
            <h2>Please Note:</h2>
            <ul>

                <li>The REP Feedback results will only be shared with key stakeholders involved in the involved in this Role Excellence assessment..</li>
                <li>The REP is not a substitute for setting priorities or plans, nor should it be used as the basis for performance reviews</li>
                <li>The REP is not to be used as a direct measure of performance, nor should the Actions described be tied directly to a specific review score. </li>
            </ul>
            <p>Once you have completed Team-Feedback, you will be asked to sign and approve your final submission. Please begin Team-Feedback and thank you for participating!</p>
            <a href="../../Feedback/Feedbackguide">Continue</a>
            
        </div>--%>

    </div>


</asp:Content>
