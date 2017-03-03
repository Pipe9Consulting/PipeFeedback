<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/SignUp.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Program Definitions
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/signup/addmember.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            $('.scroll1').slimScroll();
        });
    </script>
    <div class="breadcrumb" style="margin: 0% 0 3% 0; width: 100%">
        <a href="../Common/Index">Home </a><a>> </a><a>Program Definitions</a>
    </div>
    <div class="pageholder">

        <div class="termsandpolicy">
            <h1>Program Definitions</h1>
            <div class="signuptile">
                <div class="img">
                    <img src="../../Images/terms.png" alt="Terms" />
                </div>
                <p>
                    Program Definitions
                </p>
            </div>
        </div>


        <div class="signuptxt terms proDef">

            <div>

                <%-- <h1>Microsoft HSP</h1>--%>
                <%--    <div class="scroll1">--%>
                <p>
                    The <span>Role Excellence Profile</span> is a business tool that aligns the work of teams to a definition, 
                    or standard, of excellence for the role they perform. <span>Role Excellence Profile</span> Feedback is intended to promote the definition, creation, and adoption of strategies, tools, processes, readiness and best practices that aid and accelerate development and the achievement of excellence in role. 

                </p>

                <h5>Role Excellence Profile (REP) Feedback Agreement:</h5>
                <ul>
                    <li>
                        <span></span>
                        <div>REP Feedback results are not to be used as a direct measure of performance, nor should they be aligned to a specific performance rating. </div>
                    </li>

                    <li><span></span>
                        <div>Neither the REP itself, nor REP Feedback results, are a substitute for role priorities or the development of individual career plans.</div>
                    </li>

                    <li><span></span>
                        <div>REP Feedback results should not be used for any other purpose or process other than in support of role readiness and development.</div>
                    </li>
                </ul>


                <h5>Feedback results can only be shared with:<strong></strong></h5>
                <ul>
                    <li><span></span>
                        <div>Those in the employee’s direct management chain.</div>
                    </li>

                    <li><span></span>
                        <div>Those directly engaged in Role Excellence Profile Feedback process (stakeholders reviewed and agreed with LCA/HR).</div>
                    </li>

                    <li><span></span>
                        <div>
                            Access to individual information and results cannot be provided to business managers, sales managers, or others who work on behalf of the employee’s direct management chain or outside of the Role Excellence Profile Feedback process. 
                        </div>
                    </li>
                </ul>

            </div>


            <div style="clear: both; margin-top: 5%"></div>



            <%-- <h1>Microsoft MBS</h1>
          
            <p>
                The <strong>Role Excellence Profile</strong> is a business tool that aligns the work of teams to definitions of excellence for the role they perform. The <strong>World Class Selling project</strong> is a business initiative that promotes the definition and adoption of World Class Selling strategies, tools, processes, readiness and practices.
            </p>

            <h5>Role Excellence Profile (REP) Agreement</h5>
            <ul>
                <li>
                    <span></span>
                    <div>The REP is not to be used as a direct measure of performance, nor should the deliverable and task descriptions be directly tied to a specific performance rating. </div>
                </li>

                <li><span></span>
                    <div>The REP is not a substitute for commitments or the development of individual career plans.</div>
                </li>

                <li><span></span>
                    <div>The REP results should not be used for any other purpose or process other than in support of the Role Excellence Profile (REP) and World Class Selling (WCS) projects.</div>
                </li>
            </ul>


            <h5>Information can only be shared with<strong>:</strong></h5>
            <ul>
                <li><span></span>
                    <div>People in the employees direct management chain. </div>
                </li>

                <li><span></span>
                    <div>People directly engaged in the REP or WCS projects (stakeholders reviewed and agreed with LCA/HR). </div>
                </li>

                <li><span></span>
                    <div>
                        Access to individual information cannot be provided to business managers, sales managers or others who work on behalf of the employees direct management chain or outside of the REP & WCS Projects.
                    </div>
                </li>
            </ul>--%>
        </div>
    </div>
</asp:Content>
