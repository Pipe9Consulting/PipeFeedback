<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/KessakuHome.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content2" ContentPlaceHolderID="KessakuHomehead" runat="server">
    <link href="../../Styles/KessakuStyles/request-demo.css" rel="stylesheet" />
    <script src="../../Scripts/KessakuScript/RequestDemo.js"></script>
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="KessakuHomeContent" runat="server">
     <script type="text/javascript">
         $(document).ready(function () {

             $(".modal").on("click", function (e) {
                 if ($(e.target).hasClass("modal")) {
                     modal.hide();
                 }
             });

         });

         var modal = {

             show: function (selector) {
                 $("#" + selector).show();
             },

             hide: function () {
                 $(".modal:visible").hide();
             }

         }
    </script>
    <div class="demoBG">
        <div class="demomidBar">
            <%--<div class="placeholder">--%>
                
                <div class="contactform">
                   <%-- <div class="placeholder">--%>
                        <h1>Request a Demo</h1>
                        <div class="txtbox">
                            <input type="text" placeholder="First Name" id="reqfname" />
                        </div>
                        <div class="txtbox right">
                            <input type="text" placeholder="Last Name" id="reqlname" />
                        </div>
                        <div class="txtbox">
                            <input type="text" placeholder="Email" id="reqEmail" />
                        </div>
                        <div class="txtbox right">
                            <input type="text" placeholder="Company" id="reqcompany" />
                        </div>
                        <div class="txtbox">
                            <input type="text" placeholder="Title" id="reqtitle" />
                        </div>
                        <div class="txtbox right">
                            <input type="text" placeholder="Phone" id="reqPhone" />
                        </div>
                        <div class="msgbx">
                            <textarea name="" cols="1" rows="5" placeholder="Message" id="reqMessage"></textarea>
                        </div>
                        <div class="submit">
                            <input id="submitReqContact" type="button" value="Submit" />
                        </div>
                        <div class="error ContError" id="reqContErr" style="display: none;">Please enter the FirstName</div>
                    <%--</div>--%>
                </div>
            <%--</div>--%>
        </div>
         <div id="example" class="modal">
                        <div class="modal__content">
                            <a class="modal__close" href="javascript: modal.hide()">X</a>

                            <p>Thanks!</p>

                            <p>We appreciate your interest in learning more about the transformational journey towards excellence!</p>

                            <p>We have received your submission and will have one of our project managers get in contact with you within 1-2 business days. </p>

                            <p>The team at Pipe9 Consulting </p>

                        </div>
                    </div>
    </div>
</asp:Content>