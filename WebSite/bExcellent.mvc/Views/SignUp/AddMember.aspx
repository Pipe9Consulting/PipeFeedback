<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/SignUp.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    AddMember
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../../Scripts/jquery.slimscroll.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Signup/signup.js" type="text/javascript"></script>
    <script src="../../Scripts/ref/Signup/addmember.js" type="text/javascript"></script>
    <link href="../../Styles/signup/addmember.css" rel="stylesheet" type="text/css" />
    
    <div class="sixteen wide column breadMenu">
        <div class="ui breadcrumb">
                <a href="../Common/Index">Home </a>> Add Users
        </div>
    </div>

      <div id="preloader">
        <div id="status">
            &nbsp;
        </div>
    </div>
    <div class="pageholder">
        <input type="hidden" id="PoEPaidCost" value="0" />
        <input type="hidden" id="tempstorage" />
        <input type="hidden" id="editableMode" />
        <input type="hidden" id="PrevMailid" />
        <input type="hidden" id="plansClicked" value="0" />
        
        
        <div class="signuptile">
            <div class="img">
                <img src="../../Images/signup-ico.png" width="64" height="62" alt="Sign up" />
            </div>
            <p>
                Add Users
            </p>
        </div>
        <div class="contenthold">
            <form id="addmember" name="addmember" action="javascript:submit();">
                <input type="hidden" id="amount" value="0" />
                <input type="hidden" id="PoeCost" value="0" />
                <input type="hidden" id="MaxPoeCount" value="0" />
                <input type="hidden" id="MaxUserCount" value="0" />
                <input type="hidden" id="GetSelectedPoe" value="0" />
                <input type="hidden" id="GetNetworkCount" value="0" /><input type="hidden" id="addmemberVal"
                    value="0" />
                <input type="hidden" id="addMemberCount" value="0" />
                <input type="hidden" id="SubscribedUserDate" value="0" />
                <input type="hidden" id="trailtopaid" value="0" />
                <input type="hidden" id="Pagesubmitmode" value="0" />
                <input type="hidden" id="poemode" value="0" />
                <input type="hidden" id="PoEPaidCost" value="0" />
                <input type="hidden" value="<%: ViewBag.Task %>" id="HdnTask" />
                <input type="hidden" value="<%: ViewBag.Mode %>" id="HdnMode" />
                <input type="hidden" id="totalamt" name="totalamt" value="0;" />
                <input type="hidden" id="ManagerCount" value="1" />
                <div class="midcol">
                    <%--id changed "contentChange"--%>
                    <p id="">
                        <%--The items below are valid until your trial period ends--%>
                    </p>
                    <div class="addmngr">
                        <h2>You</h2>
                        <div class="addform">
                            <form>
                                <div class="row">
                                    <div class="col level">
                                        Network name
                                    </div>
                                    <div class="col">
                                        <input name="firstame" type="text" class="txtcol" id="YouNetworkName" value="" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="Div1">
                                        </div>
                                    </div> 
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        First name
                                    </div>
                                    <div class="col">
                                        <input name="firstame" type="text" class="txtcol" id="YouFirstname" value="" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="Div8">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Last name
                                    </div>
                                    <div class="col">
                                        <input name="lastname" type="text" class="txtcol" id="YouLastName" value="" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="Div2">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Your REPs
                                    </div>
                                    <div class="col">
                                        <div class="addselect" id="purchoosePoeSelectd">
                                            Your REPs
                                        </div>
                                        <input type="hidden" class="txtcol" id="Text1" value="" />
                                        <div class="assignpoe1" id="purchoosePoe">
                                            <ul class="yourpoes mypoes" id="purchasedPoe">
                                            </ul>
                                        </div>
                                        <div class="col">
                                            <div class="errormsg" id="Div5">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Company name
                                    </div>
                                    <div class="col">
                                        <input name="lastname" type="text" class="txtcol" id="YouCompany" value="" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="Div3">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Email id
                                    </div>
                                    <div class="col">
                                        <input name="email" type="text" class="txtcol" id="YouEmailid" value="" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Country name
                                    </div>
                                    <div class="col">
                                        <select class="countryselect" id="countrys">
                                        </select>
                                    </div>
                                </div>
                                <div class="frnbtm">
                                    <div class="errormsg" id="erryouData">
                                    </div>
                                    <input type="button" value="Save" class="signupbtn" id="SaveUserData" />
                                </div>
                            </form>
                        </div>
                        <h2>Add a Manager <%--<span id="mandatory" style="display: none"></span>--%>
                            - <i style="font-style:italic; font-size:80%; color:#777;">Managers are able to give you Feedback based on your REP.</i>
                        </h2>
                        <div class="addform">
                            <div class="mendatory">
                                * All fields are mandatory
                            </div>
                            <form>
                                <div class="row">
                                    <div class="col level">
                                        First name
                                    </div>
                                    <div class="col">
                                        <input name="firstame" type="text" class="txtcol" id="mgrfname" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="mgrfnameerr">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Last name
                                    </div>
                                    <div class="col">
                                        <input name="lastname" type="text" class="txtcol" id="mgrlname" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="mgrlnameerr">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Email address
                                    </div>
                                    <div class="col">
                                        <input name="email" type="text" class="txtcol" id="mgremail" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="mgremailerr">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Function
                                    </div>
                                    <div class="col">
                                        <input name="job" type="text" class="txtcol" value="Manager" id="mgrroles" />
                                        <input id="mgrrole" type="hidden" value="Manager" />
                                        <input id="mgrroleid" type="hidden" value="2" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Assign a REP
                                    </div>
                                    <div class="col">
                                        <div class="addselect" id="mgrselectedpoe">
                                            Select a REP
                                        </div>
                                        <input id="mgrselectepoeid" type="hidden" value="0" />
                                        <div class="assignpoe1" id="mgrchoosepoe">
                                            <ul id="mgrmypoes" class="mypoes">
                                                <li>Human Selling</li>
                                                <li>Cloud Business</li>
                                                <li class="cpoe">Select a REP</li>
                                            </ul>
                                        </div>

                                        <div class="col">
                                            <div class="errormsg" id="mgrpoeserr">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="frnbtm">
                                    <div class="errormsg" id="mgrerr">
                                        Should be your company specific Email address
                                    </div>
                                    <input type="button" value="Add" class="signupbtn" id="mgradd" />
                                </div>
                            </form>
                        </div>
                        <h2>Add a Skip Level Manager - <i style="font-style:italic; font-size:80%; color:#777;">Skip-Level Managers are able to give you Feedback based on your REP.</i></h2>
                        <div class="addform">
                            <div class="mendatory">
                                * All fields are mandatory
                            </div>
                            <form>
                                <div class="row">
                                    <div class="col level">
                                        First name
                                    </div>
                                    <div class="col">
                                        <input name="firstame" type="text" class="txtcol" id="skpfname" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="skpfnameerr">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Last name
                                    </div>
                                    <div class="col">
                                        <input name="lastname" type="text" class="txtcol" id="skplname" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="skplnameerr">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Email address
                                    </div>
                                    <div class="col">
                                        <input name="email" type="text" class="txtcol" id="skpemail" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="skpemailerr">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Function
                                    </div>
                                    <div class="col">
                                        <input name="job" type="text" class="txtcol" value="Skip Level Manager" id="skproles" />
                                        <input id="skprole" type="hidden" value="Skip Level Manager" />
                                        <input id="skproleid" type="hidden" value="3" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Assign a REP
                                    </div>
                                    <div class="col">
                                        <div class="addselect" id="skpselectedpoe">
                                            Select a REP
                                        </div>
                                        <input id="skpselectepoeid" type="hidden" value="0" />
                                        <div class="assignpoe1" id="skpchoosepoe">
                                            <ul id="skpmypoes" class="mypoes">
                                                <li>Challenger Sales REP</li>
                                                <li>Choose a REP from library</li>
                                            </ul>
                                        </div>
                                        <div class="col">
                                            <div class="errormsg" id="skppoeserr">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="frnbtm">
                                    <div class="errormsg" id="skperr">
                                        Should be your company specific Email address
                                    </div>
                                    <input type="button" value="Add" class="signupbtn" id="skpadd" />
                                </div>
                            </form>
                        </div>
                        <h2>Add a Team Member - <i style="font-style:italic; font-size:78%; color:#777;">Team Members can receive Feedback from you, but cannot give you Feedback in return.</i></h2>
                        <div class="addform">
                            <div class="mendatory">
                                * All fields are mandatory
                            </div>
                            <form>
                                <div class="row">
                                    <div class="col level">
                                        First name
                                    </div>
                                    <div class="col">
                                        <input name="firstame" type="text" class="txtcol" id="tmfname" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="tmfnameerr">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Last name
                                    </div>
                                    <div class="col">
                                        <input name="lastname" type="text" class="txtcol" id="tmlname" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="tmlnameerr">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Email address
                                    </div>
                                    <div class="col">
                                        <input name="email" type="text" class="txtcol" id="tmemail" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="tmemailerr">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Function
                                    </div>
                                    <div class="col">
                                        <input name="job" type="text" class="txtcol" value="Team Member" id="tmroles" />
                                        <input id="tmrole" type="hidden" value="Team Member" />
                                        <input id="tmroleid" type="hidden" value="1" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Assign a REP
                                    </div>
                                    <div class="col">
                                        <div class="addselect" id="tmselectedpoe">
                                            Select a REP
                                        </div>
                                        <input id="tmselectepoeid" type="hidden" value="0" />
                                        <div class="assignpoe1" id="tmchoosepoe">
                                            <ul id="tmmypoes" class="mypoes">
                                            </ul>
                                        </div>
                                        <div class="col">
                                            <div class="errormsg" id="tmpoeserr">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="frnbtm">
                                    <div class="errormsg" id="tmerr">
                                        Should be your company specific Email address
                                    </div>
                                    <input type="button" value="Add" class="signupbtn" id="tmadd" />
                                </div>
                            </form>
                        </div>
                        <h2>Add a Peer - <i style="font-style:italic; font-size:80%; color:#777;">Peers are able to give you Feedback based on your REP.</i></h2>
                        <div class="addform">
                            <div class="mendatory">
                                * All fields are mandatory
                            </div>
                            <form>
                                <div class="row">
                                    <div class="col level">
                                        First name
                                    </div>
                                    <div class="col">
                                        <input name="firstame" type="text" class="txtcol" id="prfname" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="prfnameerr">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Last name
                                    </div>
                                    <div class="col">
                                        <input name="lastname" type="text" class="txtcol" id="prlname" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="prlnameerr">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Email address
                                    </div>
                                    <div class="col">
                                        <input name="email" type="text" class="txtcol" id="premail" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="premailerr">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Function
                                    </div>
                                    <div class="col">
                                        <input name="job" type="text" class="txtcol" value="Peers" id="prroles" />
                                        <input id="prrole" type="hidden" value="Peer" />
                                        <input id="prroleid" type="hidden" value="5" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Assign a REP
                                    </div>
                                    <div class="col">
                                        <div class="addselect" id="prselectedpoe">
                                           Select a REP
                                        </div>
                                        <input id="prselectepoeid" type="hidden" value="0" />
                                        <div class="assignpoe1" id="prchoosepoe">
                                            <ul id="prmypoes" class="mypoes">
                                                <li>Challenger Sales REP</li>
                                                <li>Choose a REP from library</li>
                                            </ul>
                                        </div>
                                        <div class="col">
                                            <div class="errormsg" id="prpoeserrv">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="frnbtm">
                                    <div class="errormsg" id="prerr">
                                        Should be your company specific Email address
                                    </div>
                                    <input type="button" value="Add" class="signupbtn" id="pradd" />
                                </div>
                            </form>
                        </div>
                        <h2>Add a Customer or Partner - <i style="font-style:italic; font-size:80%; color:#777; ">Customers and Partners are able to give you Feedback based on your REP.</i></h2>
                        <div class="addform">
                            <div class="mendatory">
                                * All fields are mandatory
                            </div>
                            <form>
                                <div class="row">
                                    <div class="col level">
                                        First name
                                    </div>
                                    <div class="col">
                                        <input name="firstame" type="text" class="txtcol" id="custfname" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="custfnameerr">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Last name
                                    </div>
                                    <div class="col">
                                        <input name="lastname" type="text" class="txtcol" id="custlname" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="custlnameerr">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Email address
                                    </div>
                                    <div class="col">
                                        <input name="email" type="text" class="txtcol" id="custemail" />
                                    </div>
                                    <div class="col">
                                        <div class="errormsg" id="custemailerr">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Function
                                    </div>
                                    <div class="col">
                                        <input name="job" type="text" class="txtcol" value="Customer" id="custroles" />
                                        <input id="custrole" type="hidden" value="Customer" />
                                        <input id="custroleid" type="hidden" value="6" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col level">
                                        Assign a REP
                                    </div>
                                    <div class="col">
                                        <div class="addselect" id="custselectedpoe">
                                           Select a REP
                                        </div>
                                        <input id="custselectepoeid" type="hidden" value="0" />
                                        <div class="assignpoe1" id="custchoosepoe">
                                            <ul id="custmypoes" class="mypoes">
                                            </ul>
                                        </div>
                                        <div class="col">
                                            <div class="errormsg" id="custpoeserr">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="frnbtm">
                                    <div class="errormsg" id="custerr">
                                        Should be your company specific Email address
                                    </div>
                                    <input type="button" value="Add" class="signupbtn" id="custadd" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="rightcol">
                    <div class="welcomenote">
                        <img src="../../Images/you.png" width="42" height="42" id="userimg" /><p id="wcmsg">
                        </p>
                        <p>
                        </p>
                        <input type="hidden" id="userlname" />
                        <input type="hidden" id="userfname" />
                        <input type="hidden" id="usrEmailid" />
                    </div>
                    <div class="urntwrk">
                        <h2>Add List</h2>
                        <div class="valid" id="trailorpaid">
                        </div>
                        <div class="scroll2">
                            <ul id="myusers">
                            </ul>
                        </div>
                    </div>
                    <div class="btm">
                        <div class="total">
                            <div class="totalLeft">
                                Total
                            </div>
                            <div class="totalRight">
                            </div>
                        </div>
                        <input type="submit" id="btnsave" value="Done" class="signupbtn" onclick="javascript: submit();" />
                        <input type="submit" id="CancelOrder" value="Cancel" class="signupbtn cancel" />
                    </div>
                    <div class="totalerror">
                        <div class="errormsg" id="submiterr">
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</asp:Content>