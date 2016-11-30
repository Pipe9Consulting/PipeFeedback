<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/SignUp.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">

   Retrieve Password
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script type="text/javascript" src="../../Scripts/ref/common.js"></script>
    <link href="../../Styles/Common/master.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Microsoft/login.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        $(document).ready(function () {
            $('#getpassword').on('click', function () {
                var emailid = $('#retrieveMailid').val();
                Common.ajax({
                    url: '/Home/GetPassword',
                    data: { 'mailid': emailid },
                    success: function (response) {
                        var text = "";
                        if (response != null) {
                            text = 'Your Password is <strong>' + response + "</strong> ";

                        } else {
                            text = 'Emailid not found';
                        }
                        $('#retrievedPassword').html(text);
                    }
                });

            });
        });
    </script>
    <div class="pageholder">
        <h1>Retrieve Password</h1>
        <div style="width: 20%;">
            <div style="float: left; width: 20%; padding: 3% 0">Email Id:</div>
            <input type="text" id="retrieveMailid" class="txtarea" style="float: left; width: 70%" />

            <div style="clear: both; margin-left: 20%; margin-bottom: 3%;">
                <input type="button" value="Get Password" id="getpassword" style="background: #e0b001; border: 2px solid #353535; color: #fff; padding: 1%;" />
            </div>
            <div>
                <div id="retrievedPassword" style="margin-left: 20%;">
                   <%-- Your Password is <strong>Pass@123</strong>--%>
                </div>
            </div>
        </div>
    </div>
</asp:Content>