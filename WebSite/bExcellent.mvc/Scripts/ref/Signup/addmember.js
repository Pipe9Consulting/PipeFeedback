$(document).ready(function () {
    //Inline Pages
 
    $('.accordion h3').hide();
    $(".assignpoe1").hide();
    $('.scroll2').slimScroll();
    $('#mgrroles').attr('disabled', 'disabled');
    $('#skproles').attr('disabled', 'disabled');
    $('#tmroles').attr('disabled', 'disabled');
    $('#prroles').attr('disabled', 'disabled');
    $('#custroles').attr('disabled', 'disabled');
    var thisval = '';
    //var t = "";
    $(".addselect").click(function () {
        var X = $(this).attr('data-value');
        var getid = $(this).attr('id');
        thisval = $(this);
        if (X == 1) {
            var siblings = $(this).siblings().find('.mypoes li');
            var l = 0;
            $(siblings).each(function () {
                var t = $(this).hasClass('assignpoe1select');
                if (t) {
                    l = 1;
                    $(thisval).text($(this).text());
                }
            });
            if (l == 0) {
                $(thisval).text("Select a REP");
            }
            //$(".assignpoe1").hide();
            if (getid == 0) {
                $(".assignpoe1").hide();
            } else {
                thisval.next().next().find('.mypoes').hide();
            }

            $(this).attr('data-value', '0');
            $(this).css('background', '');
        }
        else {
            //$(".assignpoe1").show();
            if (getid == 0) {
                $(".assignpoe1").show();
            } else {
                // $(".assignpoe1").show();
                thisval.next().next().find('.mypoes').show();
            }

            $(this).attr('data-value', '1');
            $(this).css('background-image', 'url(/Images/select-arrow-up-1920.png)');
        }
    });

    $(document).click(function (event) {
        if ($(event.target).hasClass('addselect') || $(event.target).hasClass('assignpoe1select') || $(event.target).hasClass('checkclick')) {
            // t = $(this);
            var getid1 = $(thisval).attr('data-value');//$(thisval).attr('id');///edited by sena
            if (getid1 != 0) {
                $(".assignpoe1").show();
            }
        } else if (thisval != "") {
            var getid = $(thisval).attr('id');
            if (getid == 0) {
                $(".assignpoe1").hide();
            } else {
                thisval.next().next().find('.mypoes').hide();
                thisval.next().next().find('.mypoes').parents('.assignpoe1').hide();
            }

            $(thisval).attr('data-value', '0');
            $(thisval).css('background', '');
        }
    });

    $(".assignpoe1 li").live('click', function () {
        $(this).toggleClass("assignpoe1select");
        var checkclass = $(this).hasClass('assignpoe1select');
        if (!checkclass) {
            $(this).addClass('checkclick');
        } else {
            $(this).removeClass('checkclick');
        }
    });
    $("h2").click(function () {
        $(".assignpoe1").hide();
    });
    $(".yourpoes li").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
    });

    $("body").click(
        function (e) {
            //if ((e.target || e.srcElement).className != "addselect" && (e.target || e.srcElement).className != "" && (e.target || e.srcElement).className != "assignpoe1select") {
            //    var m = $(this).find('.addselect');
            //    var t = 0;
            //    var k = "";
            //    $(m).each(function () {
            //        var l = $(this).attr('id');
            //        if (l == 1) {
            //            t = l;
            //            k = $(this);
            //        }
            //    });
            //    if (t == 1) {
            //        var siblings = $(k).siblings().find('.mypoes li');
            //        var l = 0;
            //        $(siblings).each(function () {
            //            var p = $(this).hasClass('assignpoe1select');
            //            if (p) {
            //                l = 1;
            //                $(k).text($(this).text());
            //            }
            //        });
            //        if (l == 0) {
            //            $(thisval).text("Choose a PoE from library");
            //        }
            //        $(".assignpoe1").hide();
            //        $(k).attr('id', '0');
            //        $(k).css('background', '');
            //    }
            //} else {
            //    $(this).attr('id', '1');
            //}
        }
    );
    //End Inline Pages

    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    GetOldContents();
    $('.errormsg').hide();
    register.loaduserInfo();
    register.loadCountrydata();
    register.loadYoudata();
    register.LoadYammerData();
    register.loadPlans();
    register.loadmode();
    var reqoptions = $.trim($('#HdnMode').val());
    if (reqoptions.toLowerCase() == 'new') {
        register.CheckMangerCount();
        $('#mandatory').show();
    }
    if (reqoptions.toLowerCase() == 'add') {
        var pagemode = $('#Pagesubmitmode').val();
        if (pagemode == 0) {
            register.loadOlddata();
        }
    }
    register.loaduserPhoto();
    register.loadmembers();
    register.loadcontrolevents();
    register.setSubscribedPoes();
    register.getSelectedPoes();
    register.loadNetworkCount();
    $('#tmmypoes').slimscroll();
    $('#purchasedPoe').slimScroll();
    $('#mgrmypoes').slimScroll();
    $('#skpmypoes').slimScroll();
    $('#prmypoes').slimScroll();
    $('#custmypoes').slimScroll();
    $("#status").fadeOut("slow");
    $("#preloader").delay(600).fadeOut("slow");
});
function submit() {
    register.loadNetworkCount();
    var validate = false;
    Common.ajaxsync({
        url: '/SignUp/Validate',
        success: function (response) {
            validate = response;
        },
        error: function (err) {
            validate = false;
        }
    });
    var selectedPoeCount = $('#GetSelectedPoe').val();
    var selectedUsercount = $('#GetNetworkCount').val();
    if ($('#myusers').find('li').html() != null) {
        if (selectedPoeCount > 0 && selectedUsercount > 0) {
            //if (parseInt($('#ManagerCount').val()) == 1) {
            var totalcost = parseInt($('.totalRight').html().replace("$", ""));
            $('#totalamt').val(totalcost);
            var frm = document.getElementById('addmember');
            frm.action = '../../SignUp/checkout?mode=' + $.trim($('#HdnMode').val());
            frm.method = 'post';
            frm.submit();
            //} else {
            //    $('#submiterr').html('Please add a manager to proceed further');
            //    $('#submiterr').show();
            //}
        } else {
            $('#masterMsgCont').text("Please add at least one member");
            $('#overallCont').show();
            //$('#submiterr').html('Please add at least one member');
            //$('#submiterr').show();
        }
    }
    else {
        //$('#submiterr').html('Please add at least one member');
        //$('#submiterr').show();
        $('#masterMsgCont').text("Please add at least one member");
        $('#overallCont').show();
    }
}

var html5 = "";
var register = {
    loadcontrolevents: function () {
        var preferpoeCountdb = $('#MaxPoeCount').val();
        var preferUsercountdb = $('#MaxUserCount').val();
        var selectedPoeCount = $('#GetSelectedPoe').val();
        var selectedUsercount = $('#GetNetworkCount').val();
        $('#mgradd').live('click', function () {
            $('#mgradd').attr("disabled", true);
            //Check whether the count of poe and user is morethan preffered.
            register.loadNetworkCount();
            register.setSubscribedPoes();
            preferpoeCountdb = $('#MaxPoeCount').val();
            preferUsercountdb = $('#MaxUserCount').val();
            selectedPoeCount = $('#GetSelectedPoe').val();
            selectedUsercount = parseInt($('#GetNetworkCount').val()) + 1;
            if (preferpoeCountdb == "0") {
                preferpoeCountdb = parseInt(selectedPoeCount) + 1;
            }
            if (preferUsercountdb == "0") {
                preferUsercountdb = parseInt(selectedUsercount) + 1;
            }
            if (preferUsercountdb == "5") {
                preferUsercountdb = parseInt(preferUsercountdb) - 1;
            }
            if (register.validate('mgr')) {
                if (register.validatedomain('mgr')) {
                    $('#mgrerr').hide();
                    $('.errormsg').html('');
                    if ($('#editableMode').val() != 2) {
                        if (parseInt(preferpoeCountdb) >= parseInt(selectedPoeCount) && parseInt(preferUsercountdb) >= parseInt(selectedUsercount)) {
                            register.addmember('mgr');
                        } else {
                            var r = confirm("Trial account user limit is 5 including you. If you add more users, your account becomes a paid account.");
                            if (r == true) {
                                Common.ajaxsync({
                                    url: '/SignUp/TrailTopaid',
                                    success: function (response) {
                                        $('#trailtopaid').val(1);
                                        register.loadcontrolevents();
                                        register.addmember('mgr');
                                        register.loadPlans();
                                        register.setSubscribedPoes();
                                        register.getSelectedPoes();
                                        register.loadmembers();
                                    },
                                    error: function () {
                                    }
                                });
                            } else {
                                $('#mgradd').attr("disabled", false);
                            }
                        }
                    } else {
                        register.EditUserInfo('mgr');
                    }
                }
            }
        });
        $('#skpadd').live('click', function () {
            $('#skpadd').attr("disabled", true);
            register.loadNetworkCount();
            register.setSubscribedPoes();
            preferpoeCountdb = $('#MaxPoeCount').val();
            preferUsercountdb = $('#MaxUserCount').val();
            selectedPoeCount = $('#GetSelectedPoe').val();
            selectedUsercount = parseInt($('#GetNetworkCount').val()) + 1;
            if (preferpoeCountdb == "0") {
                preferpoeCountdb = parseInt(selectedPoeCount) + 1;
            }
            if (preferUsercountdb == "0") {
                preferUsercountdb = parseInt(selectedUsercount) + 1;
            }
            if (preferUsercountdb == "5") {
                preferUsercountdb = parseInt(preferUsercountdb) - 1;
            }
            if (register.validate('skp')) {
                if (register.validatedomain('skp')) {
                    $('#skperr').hide();
                    $('.errormsg').html('');
                    if ($('#editableMode').val() != 3) {
                        if (parseInt(preferpoeCountdb) >= parseInt(selectedPoeCount) && parseInt(preferUsercountdb) >= parseInt(selectedUsercount)) {
                            register.addmember('skp');
                        } else {
                            var r = confirm("Trial account user limit is 5 including you. If you add more users, your account becomes a paid account.");
                            if (r == true) {
                                Common.ajaxsync({
                                    url: '/SignUp/TrailTopaid',
                                    success: function (response) {
                                        $('#trailtopaid').val(1);
                                        register.loadcontrolevents();
                                        register.addmember('skp');
                                        register.loadPlans();
                                        register.setSubscribedPoes();
                                        register.getSelectedPoes();
                                        register.loadmembers();
                                    },
                                    error: function (err) {
                                    }
                                });
                            } else {
                                $('#skpadd').attr("disabled", false);
                            }
                            //alert("You can have a maximum of 5 people in a trial network");
                        }
                    } else {
                        register.EditUserInfo('skp');
                    }
                }
            }
        });
        $('#tmadd').live('click', function () {
            $('#tmadd').attr("disabled", true);
            register.loadNetworkCount();
            register.setSubscribedPoes();
            preferpoeCountdb = $('#MaxPoeCount').val();
            preferUsercountdb = $('#MaxUserCount').val();
            selectedPoeCount = $('#GetSelectedPoe').val();
            selectedUsercount = parseInt($('#GetNetworkCount').val()) + 1;
            if (preferpoeCountdb == "0") {
                preferpoeCountdb = parseInt(selectedPoeCount) + 1;
            }
            if (preferUsercountdb == "0") {
                preferUsercountdb = parseInt(selectedUsercount) + 1;
            }
            if (preferUsercountdb == "5") {
                preferUsercountdb = parseInt(preferUsercountdb) - 1;
            }
            if (register.validate('tm')) {
                if (register.validatedomain('tm')) {
                    $('#tmerr').hide();
                    $('.errormsg').html('');
                    if ($('#editableMode').val() != 1) {
                        if (parseInt(preferpoeCountdb) >= parseInt(selectedPoeCount) && parseInt(preferUsercountdb) >= parseInt(selectedUsercount)) {
                            register.addmember('tm');
                        } else {
                            var r = confirm("Trial account user limit is 5 including you. If you add more users, your account becomes a paid account.");
                            if (r == true) {
                                Common.ajaxsync({
                                    url: '/SignUp/TrailTopaid',
                                    success: function (response) {
                                        $('#trailtopaid').val(1);
                                        register.loadcontrolevents();
                                        register.addmember('tm');
                                        register.loadPlans();
                                        register.setSubscribedPoes();
                                        register.getSelectedPoes();
                                        register.loadmembers();
                                    },
                                    error: function (err) {
                                    }
                                });
                            } else {
                                $('#tmadd').attr("disabled", false);
                            }
                        }
                    }
                    else {
                        register.EditUserInfo('tm');
                    }
                }
            }
        });
        $('#pradd').live('click', function () {
            $('#pradd').attr("disabled", true);
            register.loadNetworkCount();
            register.setSubscribedPoes();
            preferpoeCountdb = $('#MaxPoeCount').val();
            preferUsercountdb = $('#MaxUserCount').val();
            selectedPoeCount = $('#GetSelectedPoe').val();
            selectedUsercount = parseInt($('#GetNetworkCount').val()) + 1;
            if (preferpoeCountdb == "0") {
                preferpoeCountdb = parseInt(selectedPoeCount) + 1;
            }
            if (preferUsercountdb == "0") {
                preferUsercountdb = parseInt(selectedUsercount) + 1;
            }
            if (preferUsercountdb == "5") {
                preferUsercountdb = parseInt(preferUsercountdb) - 1;
            }
            if (register.validate('pr')) {
                if (register.validatedomain('pr')) {
                    $('#prerr').hide();
                    $('.errormsg').html('');
                    if ($('#editableMode').val() != 5) {
                        if (parseInt(preferpoeCountdb) >= parseInt(selectedPoeCount) && parseInt(preferUsercountdb) >= parseInt(selectedUsercount)) {
                            register.addmember('pr');
                        } else {
                            var r = confirm("Trial account user limit is 5 including you. If you add more users, your account becomes a paid account.");
                            if (r == true) {
                                Common.ajaxsync({
                                    url: '/SignUp/TrailTopaid',
                                    success: function (response) {
                                        $('#trailtopaid').val(1);
                                        register.loadcontrolevents();
                                        register.addmember('pr');
                                        register.loadPlans();
                                        register.setSubscribedPoes();
                                        register.getSelectedPoes();
                                        register.loadmembers();
                                    },
                                    error: function (err) {
                                    }
                                });
                            } else {
                                $('#pradd').attr("disabled", false);
                            }
                        }
                    } else {
                        register.EditUserInfo('pr');
                    }
                }
            }
        });
        $('#custadd').live('click', function () {
            $('#custadd').attr("disabled", true);
            register.loadNetworkCount();
            register.setSubscribedPoes();
            preferpoeCountdb = $('#MaxPoeCount').val();
            preferUsercountdb = $('#MaxUserCount').val();
            selectedPoeCount = $('#GetSelectedPoe').val();
            selectedUsercount = parseInt($('#GetNetworkCount').val()) + 1;
            if (preferpoeCountdb == "0") {
                preferpoeCountdb = parseInt(selectedPoeCount) + 1;
            }
            if (preferUsercountdb == "0") {
                preferUsercountdb = parseInt(selectedUsercount) + 1;
            }
            if (preferUsercountdb == "5") {
                preferUsercountdb = parseInt(preferUsercountdb) - 1;
            }
            if (register.validate('cust')) {
                $('#custerr').hide();
                $('.errormsg').html('');
                if ($('#editableMode').val() != 6) {
                    if (parseInt(preferpoeCountdb) >= parseInt(selectedPoeCount) && parseInt(preferUsercountdb) >= parseInt(selectedUsercount)) {
                        // if ($('#editableMode').val() != 6) {
                        register.addmember('cust');
                        //}
                    } else {
                        var r = confirm("Trial account user limit is 5 including you. If you add more users, your account becomes a paid account.");
                        if (r == true) {
                            Common.ajaxsync({
                                url: '/SignUp/TrailTopaid',
                                success: function (response) {
                                    $('#trailtopaid').val(1);
                                    register.loadcontrolevents();
                                    register.addmember('cust');
                                    register.loadPlans();
                                    register.setSubscribedPoes();
                                    register.getSelectedPoes();
                                    register.loadmembers();
                                },
                                error: function (err) {
                                }
                            });
                        } else {
                            $('#custadd').attr("disabled", false);
                        }
                    }
                }
                else {
                    register.EditUserInfo('cust');
                }
            }
            register.loadSlimScroll(1);
        });

        $('#purchoosePoeSelectd').click(function () {
            $('#purchoosePoe').toggle();
        });

        $('#mgrselectedpoe').click(function () {
            $('#mgrchoosepoe').toggle();
        });
        $('#skpselectedpoe').click(function () {
            $('#skpchoosepoe').toggle();
        });
        $('#tmselectedpoe').click(function () {
            $('#tmchoosepoe').toggle();
        });
        $('#prselectedpoe').click(function () {
            $('#prchoosepoe').toggle();
        });
        $('#custselectedpoe').click(function () {
            $('#custchoosepoe').toggle();
        });
        $('#mgrmypoes li').live('click', function () {
            $('#mgrselectedpoe').html($(this).html());
            $('#mgrselectepoeid').val($(this).val());

            var getval = $(this).val();
            if (getval == 0) {
                var fname = $('#mgrfname').val();
                var lname = $('#mgrlname').val();
                var mailid = $('#mgremail').val();
                var role = $('#mgrroles').val();
                var index = $('#mgrroleid').val();
                register.loadSessionData(fname, lname, mailid, role, index);
            }
        });
        $('#skpmypoes li').live('click', function () {
            var getval = $(this).val();
            $('#skpselectedpoe').html($(this).html());
            $('#skpselectepoeid').val($(this).val());

            if (getval == 0) {
                var fname = $('#skpfname').val();
                var lname = $('#skplname').val();
                var mailid = $('#skpemail').val();
                var index = $('#skproleid').val();
                var role = $('#skproles').val();
                register.loadSessionData(fname, lname, mailid, role, index);
            }
        });
        $('#tmmypoes li').live('click', function () {
            $('#tmselectedpoe').html($(this).html());
            $('#tmselectepoeid').val($(this).val());

            var getval = $(this).val();
            if (getval == 0) {
                var fname = $('#tmfname').val();
                var lname = $('#tmlname').val();
                var mailid = $('#tmemail').val();
                var index = $('#tmroleid').val();
                var role = $('#tmroles').val();
                register.loadSessionData(fname, lname, mailid, role, index);
            }
        });
        $('#prmypoes li').live('click', function () {
            $('#prselectedpoe').html($(this).html());
            $('#prselectepoeid').val($(this).val());

            var getval = $(this).val();
            if (getval == 0) {
                var fname = $('#prfname').val();
                var lname = $('#prlname').val();
                var mailid = $('#premail').val();
                var index = $('#prroleid').val();
                var role = $('#prroles').val();
                register.loadSessionData(fname, lname, mailid, role, index);
            }
        });
        $('#custmypoes li').live('click', function () {
            $('#custselectedpoe').html($(this).html());
            $('#custselectepoeid').val($(this).val());

            var getval = $(this).val();
            if (getval == 0) {
                var fname = $('#custfname').val();
                var lname = $('#custlname').val();
                var mailid = $('#custemail').val();
                var index = $('#custroleid').val();
                var role = $('#custroles').val();
                register.loadSessionData(fname, lname, mailid, role, index);
            }
        });
        $('#SaveUserData').live('click', function () {
            var networkName = $('#YouNetworkName').val();
            var firstName = $('#YouFirstname').val();
            var lastName = $('#YouLastName').val();
            var email = $('#YouEmailid').val();
            var company = $('#YouCompany').val();
            var country = $("#countrys option:selected").val();
            var returnbool = register.validateYouData();
            if (!returnbool) {
                Common.ajax({
                    url: '/SignUp/SaveUserdata',
                    data: { 'networkName': networkName, 'fname': firstName, 'lname': lastName, 'mailid': email, 'country': country, 'company': company },
                    success: function (response) {
                        register.loadmembers();
                    },
                    error: function (err) {
                    }
                });
            }
        });
    },

    validate: function (prefix) {
        var returnvalue = true;
        var fname = $('#' + prefix + 'fname').val();
        var lname = $('#' + prefix + 'lname').val();
        var emailId = $('#' + prefix + 'email').val();

        var poeselected = false;
        $('#' + prefix + 'mypoes li').each(function () {
            var check = $(this).hasClass('assignpoe1select');
            var getvalue = $(this).val();
            if (check == true && getvalue != 0)
                poeselected = true;
        });
        if (fname == "") {
            $('#' + prefix + 'fname').focus();
            $('#' + prefix + 'err').html("Please enter the First name");
            $('#' + prefix + 'err').show();
            $('#' + prefix + 'add').attr("disabled", false);
            return false;
        }
        if (lname == "") {
            $('#' + prefix + 'lname').focus();
            $('#' + prefix + 'err').html("Please enter the Last name");
            $('#' + prefix + 'err').show();
            $('#' + prefix + 'add').attr("disabled", false);
            return false;
        }
        if (emailId == "") {
            $('#' + prefix + 'email').focus();
            $('#' + prefix + 'err').html("Please enter the Email Id");
            $('#' + prefix + 'err').show();
            $('#' + prefix + 'add').attr("disabled", false);
            $('#' + prefix + 'add').attr("disabled", false);
            return false;
        } else if (!IsEmail(emailId)) {
            $('#' + prefix + 'err').html("Please enter the valid Email Id");
            $('#' + prefix + 'err').show();
            $('#' + prefix + 'add').attr("disabled", false);
            return false;
        }
        if (poeselected == false) {
            $('#' + prefix + 'err').html('Assign at least one REP');
            $('#' + prefix + 'err').show();
            $('#' + prefix + 'add').attr("disabled", false);
            return false;
        }

        return returnvalue;
    },
    validateYouData: function () {
        var returnvalue = false;
        var networkName = $('#YouNetworkName').val();
        var firstName = $('#YouFirstname').val();
        var lastName = $('#YouLastName').val();
        var email = $('#YouEmailid').val();
        var company = $('#YouCompany').val();
        var country = $("#countrys option:selected").val();
        $('#erryouData').hide();
        if (networkName == "") {
            returnvalue = true;
            $('#masterMsgCont').text("Please enter Network Name");
            $('#overallCont').show();
            //$('#erryouData').show();
            //$('#erryouData').text("Please enter Network Name");
        }
        if (firstName == "") {
            returnvalue = true;
            $('#masterMsgCont').text("Please enter First Name");
            $('#overallCont').show();
            //$('#erryouData').show();
            //$('#erryouData').text("Please enter First Name");
        }
        if (lastName == "") {
            returnvalue = true;
            $('#masterMsgCont').text("Please enter Last Name");
            $('#overallCont').show();
            //$('#erryouData').show();
            //$('#erryouData').text("Please enter Last Name");
        }
        if (email == "") {
            returnvalue = true;
            $('#masterMsgCont').text("Please enter Email Address");
            $('#overallCont').show();
           // $('#erryouData').show();
            //$('#erryouData').text("Please enter Email Address");
        }
        if (company == "") {
            returnvalue = true;
            $('#masterMsgCont').text("Please enter Company Name");
            $('#overallCont').show();
            //$('#erryouData').show();
            //$('#erryouData').text("Please enter Company Name");
        }
        if (country == 0) {
            returnvalue = true;
            $('#masterMsgCont').text("Please enter Country Name");
            $('#overallCont').show();
            //$('#erryouData').show();
            //$('#erryouData').text("Please enter Country Name");
        }
        return returnvalue;
    },
    validatedomain: function (prefix) {
        var emailId = $('#' + prefix + 'email').val();
        var returnvalue = true;
        Common.ajaxsync({
            url: '/SignUp/CheckDomain?emailid=' + emailId,
            success: function (response) {
                returnvalue = response;
            },
            error: function (err) {
                returnvalue = false;
            }
        });
        if (returnvalue != true) {
            $('#' + prefix + 'email').focus();
            $('#' + prefix + 'err').html("Should be your company specific Email address");
            $('#' + prefix + 'err').show();
            $('#' + prefix + 'add').attr("disabled", false);
        } else {
            $('#' + prefix + 'emailerr').html();
        }

        return returnvalue;
    },
    LoadCancelBtn: function () {
        register.loadmode();
        $('#CancelOrder').click(function () {
            window.location.href = "/common/Index";
        });
    },
    loadmode: function () {
        Common.ajaxsync({
            url: '/SignUp/GetMode',
            success: function (response) {
                if (response == 0) {
                    $('#HdnMode').val('new');
                } else if (response == 2) {
                    $('#HdnMode').val('old');
                } else {
                    $('#HdnMode').val('add');
                }
            },
            error: function (err) {
            }
        });
    },
    loadSessionData: function (firstname, lastname, mailadd, role, mode) {
        Common.ajaxsync({
            url: '/SignUp/GettingTxtValues?firstName=' + firstname + '&lastName=' + lastname + '&emailId=' + mailadd + '&role=' + role + '&mode=' + mode,
            success: function (response) {
                window.location = "/Signup/Poelibrary?location=" + $.trim($('#HdnMode').val());
            },
            error: function (err) {
            }
        });
    },
    loaduserInfo: function () {
        Common.ajax({
            url: '/SignUp/GetUserInfo',
            success: function (response) {
                $('#wcmsg').html('Hello ' + response.FirstName + ' ' + response.LastName);
                $('#userfname').val(response.FirstName);
                $('#userlname').val(response.LastName);
                $('#usrEmailid').val(response.EmailAddress);
            },
            error: function (err) {
            }
        });
    },
    CheckMangerCount: function () {
        Common.ajax({
            url: '/SignUp/IsManagerAdded',
            success: function (response) {
                $('#ManagerCount').val(response);
            },
            error: function (err) {
            }
        });
    },
    LoadYammerData: function () {
        Common.ajax({
            url: '/SignUp/CheckYammerSubscribtion',
            success: function (response) {
                if (response != null) {
                    $('#country').find('option[value=0]').attr("selected", "selected");
                    register.validateYouData();
                }
            },
            error: function (err) {
            }
        });
    },
    EditUserInfo: function (prefix) {
        var reqoption = $.trim($('#HdnMode').val());
        var fname = $('#' + prefix + 'fname').val();
        var lname = $('#' + prefix + 'lname').val();
        var emailId = $('#' + prefix + 'email').val();
        var poe = $('#' + prefix + 'selectepoeid').val();
        var des = parseInt($('#' + prefix + 'roleid').val());
        var destitle = $('#' + prefix + 'role').val();
        var poelist = "";
        $('#' + prefix + 'mypoes li').each(function () {
            var check = $(this).hasClass('assignpoe1select');
            if (check == true)
                poelist = poelist + $(this).val() + '%';
        });
        var poevalues = poelist.substring(0, poelist.length - 1);
        var prevMailid = $('#PrevMailid').attr('name');
        var usercosts = $('#amount').val();
        var poeCosts = $('#PoeCost').val();
        if (reqoption == 'add') {
            var subscribedate = $('#SubscribedUserDate').val();
            if (usercosts != 0 && subscribedate != "") {
                usercosts = UserCost_Bysub(subscribedate, usercosts);
            }
            if (poeCosts != 0 && subscribedate != "") {
                poeCosts = UserCost_Bysub(subscribedate, poeCosts);
            }
        }
        Common.ajax({
            url: '/SignUp/EditUserdata',
            data: { 'fname': fname, 'lname': lname, 'email': emailId, 'poe': poevalues, 'designationId': des, 'designationTitle': destitle, 'prevMail': prevMailid, 'userAmount': usercosts, 'poeCost': poeCosts },
            success: function (response) {
                register.loadmembers();
                $('#' + prefix + 'fname').val('');
                $('#' + prefix + 'lname').val('');
                $('#' + prefix + 'email').val('');
                $('#' + prefix + 'add').attr("disabled", false);
                $('#' + prefix + 'selectepoeid').val(0);
                $('#editableMode').val(0);
            },
            error: function (err) {
            }
        });
    },

    loadOlddata: function () {
        Common.ajax({
            url: '/SignUp/LoadOldMembers',
            success: function (responses) {
                html5 = "<ul><li value='" + ($('#usrEmailid').val()).toLowerCase() + "'></li>";
                for (var k = 0; k < responses.length; k++) {
                    html5 = html5 + "<li value='" + responses[k].User.EmailAddress + "'></li>";
                    $('#SubscribedUserDate').val(responses[k].SubscribtionDate);
                }
                html5 = html5 + "</ul>";
                $('#Pagesubmitmode').val(1);
            }
        });
    },
    GetselectedNetworkData: function () {
        Common.ajax({
            url: '/SignUp/GetSelectedNetworkData?designationId=2',
            success: function (responses) {
            }
        });
    },
    LoadEditBlock: function () {
        $('.edit').click(function () {
            var desigid = parseInt((this).id.replace("editDesg", ""));
            var userid = $(this).attr("name").replace("edituser", "");
            $('#editableMode').val(desigid);
            Common.ajax({
                url: '/SignUp/GetSelectedNetworkData?designationId=' + desigid + '&email=' + userid,
                success: function (responses) {
                    var prefix = '';
                    var position = 0;
                    switch (desigid) {
                        case 1:
                            prefix = 'tm';
                            position = 7;
                            break;
                        case 2:
                            prefix = 'mgr';
                            position = 3;
                            break;
                        case 3:
                            prefix = 'skp';
                            position = 5;
                            break;
                        case 4:
                            prefix = 'pr';
                            position = 9;
                            break;
                        case 5:
                            prefix = 'pr';
                            position = 9;
                            break;
                        case 6:
                            prefix = 'cust';
                            position = 11;
                            break;
                        default:
                            prefix = 'you';
                            position = 1;
                            break;
                    }
                    $('#' + prefix + 'fname').val(responses[0].User.FirstName);
                    $('#' + prefix + 'lname').val(responses[0].User.LastName);
                    $('#' + prefix + 'email').val(responses[0].User.EmailAddress);
                    $('#PrevMailid').attr('name', $('#' + prefix + 'email').val());
                    var length = responses.length;

                    $('#' + prefix + 'mypoes li').each(function () {
                        var val = $(this).val();
                        for (var i = 0; i < length; i++) {
                            if (val == responses[i].POE.POEId) {
                                $(this).addClass("assignpoe1select");
                            }
                        }
                    });

                    $('.addmngr h2').removeClass('active').next().slideUp('slow');
                    $('.addmngr h2:nth-child(' + position + ')').addClass('active').next().slideDown();
                }
            });
        });
    },
    DeleteMember: function () {
        $('.delete').click(function () {
            var desigid = parseInt((this).id.replace("DelDesg", ""));
            var userMailid = $(this).attr("name").replace("Deluser", "");
            Common.ajax({
                url: '/SignUp/DeleteMember?designationId=' + desigid + '&email=' + userMailid,
                success: function (responses) {
                    register.loadmembers();
                    register.loadCartList();
                    var mode = $('#HdnMode').val();
                    if (mode == "new") {
                        register.CheckMangerCount();
                    }
                }
            });
        });
    },
    DeletePoe: function () {
        $('.deletePoe').click(function () {
            var poeid = parseInt($(this).attr('id'));
            Common.ajax({
                url: '/SignUp/DeletePoe?poeid=' + poeid,
                success: function (responses) {
                    register.loadmembers();
                    register.loadCartList();
                    register.setSubscribedPoes();
                    register.getSelectedPoes();
                }
            });
        });
    },
    loaduserPhoto: function () {
        var reqoption = $.trim($('#HdnMode').val());
        if (reqoption.toLowerCase() == 'new') {
            Common.ajax({
                url: '/SignUp/GetUserPhoto',
                success: function (response) {
                    $("#userimg").attr("src", response);
                    $("#dynyouimg").attr("src", response);
                },
                error: function (err) {
                }
            });
        } else {
            Common.ajax({
                url: '/SignUp/GetUserId',
                success: function (response) {
                    $("#userimg").attr("src", "/Uploadify/LoadImageHandler.ashx?id=" + response + "&rnd=" + Math.random());
                },
                error: function (err) {
                }
            });
        }
    },
    loadmembers: function () {
        var reqoption = $.trim($('#HdnMode').val());
        if (reqoption.toLowerCase() == "add") {
            register.loadOlddata();
        }
        Common.ajax({
            url: '/SignUp/GetNetworkData',
            success: function (response) {
                var html = '';
                var usercost = $('#amount').val();
                if (reqoption.toLowerCase() == 'new' || reqoption.toLowerCase() == 'old' || (reqoption.toLowerCase() == 'add' && $('#plansClicked').val() == 1)) {
                    html = " <li  value=" + $('#usrEmailid').val() + "> <div class='title'> You</div> <div class='colone'> <img id='dynyouimg' src='../../Images/user.png'  width='34' height='34'/></div> <div class='detailsholder'><div class='details'><div class='coltwo'> " + $('#userfname').val() + " " + $('#userlname').val() + "</div> <div class='colthree'> $ " + usercost + "</div> </div></div></li>";
                } else if ($('#poemode').val() == 1) {
                    html = " <li  value=" + $('#usrEmailid').val() + "> <div class='title'> You</div> <div class='colone'> <img id='dynyouimg' src='../../Images/user.png'  width='34' height='34'/></div> <div class='detailsholder'><div class='details'><div class='coltwo'> " + $('#userfname').val() + " " + $('#userlname').val() + "</div> <div class='colthree'> $ " + usercost + "</div> </div></div></li>";
                }
                var frststcolTest = '';
                var className = '';
                var frstcoldes = 0;
                if (response != null) {
                    for (var i = 0; i < response.length; i++) {
                        if (response[i] != null) {
                            usercost = $('#amount').val();
                            if (response[i].Designation.Level != frstcoldes) {
                                frstcoldes = response[i].Designation.Level;
                                frststcolTest = " <div class='title'>" + response[i].Designation.Name + "</div>";
                                className = '';
                            } else {
                                frststcolTest = '';
                                className = ' combine';
                            }

                            var amount = html.indexOf(response[i].User.EmailAddress.toLowerCase()) >= 0 ? '0' : usercost;
                            if (reqoption == 'add') {
                                var subscribedate = $('#SubscribedUserDate').val();
                                if (usercost != 0 && subscribedate != "") {
                                    amount = UserCost_Bysub(subscribedate, $('#amount').val());
                                    usercost = amount;
                                }
                                if (amount != 0 && parseInt($('#plansClicked').val()) == 2 && $('#trailtopaid').val() != 1) {
                                    amount = html5.indexOf(response[i].User.EmailAddress.toLowerCase()) >= 0 ? '0' : usercost;
                                }
                            }
                            $('#tempstorage').html(html);
                            $('#myusers').html('');
                            $('#myusers').html(html);
                            var valid = false;
                            $('.searchlist').each(function () {
                                var desig = $(this).attr("value").toString();
                                var mail = $(this).attr("name");
                                if (mail.toLowerCase() == response[i].User.EmailAddress.toLowerCase() && parseInt(desig) == response[i].Designation.Level) {
                                    valid = true;
                                }
                            });
                            if (valid == false) {
                                html = html + "<li class='searchlist" + className + "' value='" + response[i].Designation.Level + "' name='" + response[i].User.EmailAddress + "'>" + frststcolTest + "<div class='colone'>" +
                                    "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='34' height='34' alt='User' /></div> <div class='detailsholder'> <div class='details'>" +
                                    "<div class='coltwo'>" + response[i].User.FirstName + " " + response[i].User.LastName + "</div>" +
                                    "<div class='colthree'>$ " + amount + "</div></div> <div class='details'> <div class='edit' id='editDesg" + response[i].Designation.Level + "' name='edituser" + response[i].User.EmailAddress + "'> <img src='../../Images/edit.png' /></div> <div class='delete' id='DelDesg" + response[i].Designation.Level + "' name='Deluser" + response[i].User.EmailAddress + "'> <img src='../../Images/delete.png' /></div> </div> </div></li>";
                            }
                            $('#tempstorage').html('');
                            usercost = 0;
                        }
                    }
                }

                $('#myusers').html(html);
                register.getSelectedPoes();
                register.loadPoetoRightside();
                register.loadCost();
                register.getSelectedPoes();
                register.loaduserPhoto();
                register.LoadEditBlock();
                register.DeleteMember();
                register.LoadCancelBtn();
                register.loadCartList();
                register.loadSlimScroll(0);
            },
            error: function (err) {
            }
        });
    },
    loadPoetoRightside: function () {
        register.GetPoECost();
        Common.ajaxsync({
            url: '/Common/GetNewlyAddedPoes',
            success: function (response) {
                var html = '';
                var ftext = "";
                var className = '';
                var poepaidcost = $('#PoEPaidCost').val();
                var plan = $('#plansClicked').val();
                if (response != null) {
                    for (var i = 0; i < response.length; i++) {
                        var poeCost = $('#PoeCost').val();
                        if (i == 0) {
                            ftext = "<div class='title'> Your REPs</div> ";
                            className = "";
                        } else {
                            ftext = "";
                            className = 'combine';
                        }
                        var subscribedate = $('#SubscribedUserDate').val();
                        if (poeCost != 0 && subscribedate != "" && subscribedate != 0) {
                            var amount = UserCost_Bysub(subscribedate, $('#PoeCost').val());
                            poeCost = amount;
                        }
                        //if (response[i].PoeFlag != 2 && plan == 3) {
                        //    poeCost = poepaidcost;
                        //}
                        var deleteoption = '';
                        if (response.length > 1 || plan == 3) {
                            deleteoption = "<div class='deletePoe' id='" + response[i].POEId + "'> <img src='../../Images/delete.png' /></div>";
                        }
                        html = html + "<li class='" + className + "'>" + ftext + "<div class='colone'> <img src='../../Images/user.png'  width='34' height='34'/></div> <div class='detailsholder'> <div class='details'> <div class='coltwo'> " + response[i].Name + "</div> <div class='colthree'> $ " + poeCost + "</div>  </div> <div class='details'> " + deleteoption + " </div> </div></li>";
                    }
                }
                var oldhtml = $('#myusers').html();
                $('#myusers').html(oldhtml + html);
                register.DeletePoe();
                register.loadCartList();
            },
            error: function () {
            }
        });
    },
    loadCost: function () {
        var cost = 0;
        $('.colthree').each(function () {
            cost = cost + parseFloat($(this).html().replace('$ ', ''));
        });
        $('.totalRight').html('$ ' + cost.toFixed(2));
    },
    loadCartList: function () {
        var html = '';
        Common.ajaxsync({
            url: '/SignUp/CartList',
            success: function (response) {
                if (response == null || $('#plansClicked').val() == 1) {
                    $('#cartOptions').html(html);
                } else {
                    html = "<li class='cart' id='signCartlists' style='display:block'> <img src='../../Images/icons/cart-small.png' /><p> Cart (" + response + ")</p></li>";
                    $('#cartOptions').html(html);
                }
            },
            error: function (err) {
            }
        });
    },
    addmember: function (prefix) {
        var reqoption = $.trim($('#HdnMode').val());
        var fname = $('#' + prefix + 'fname').val();
        var lname = $('#' + prefix + 'lname').val();
        var emailId = $('#' + prefix + 'email').val();
        var poe = $('#' + prefix + 'selectepoeid').val();
        var des = parseInt($('#' + prefix + 'roleid').val());
        var destitle = $('#' + prefix + 'role').val();
        var poelist = "";
        $('#' + prefix + 'mypoes li').each(function () {
            var check = $(this).hasClass('assignpoe1select');
            if (check == true)
                poelist = poelist + $(this).val() + '%';
        });
        var poevalues = poelist.substring(0, poelist.length - 1);
        //var amounts = 0;
        var usercosts = $('#amount').val();
        var poeCosts = $('#PoeCost').val();
        if (reqoption == 'add') {
            var subscribedate = $('#SubscribedUserDate').val();
            if (usercosts != 0 && subscribedate != "") {
                usercosts = UserCost_Bysub(subscribedate, usercosts);
            }
            if (poeCosts != 0 && subscribedate != "") {
                poeCosts = UserCost_Bysub(subscribedate, poeCosts);
            }
        }
        Common.ajax({
            url: '/SignUp/AddMemberToSession',
            data: { 'fname': fname, 'lname': lname, 'emailId': emailId, 'poe': poevalues, 'designationId': des, 'designationTitle': destitle, 'poeCost': poeCosts, 'userCost': usercosts },
            success: function (response) {
                var html = '';
                var usercost = usercosts;
                if (reqoption == 'new' || reqoption.toLowerCase() == 'old' || (reqoption.toLowerCase() == 'add' && $('#plansClicked').val() == 1)) {
                    html = " <li  value=" + $('#usrEmailid').val() + "> <div class='title'> You</div> <div class='colone'> <img id='dynyouimg' src='../../Images/user.png'  width='34' height='34'/></div> <div class='detailsholder'><div class='details'><div class='coltwo'> " + $('#userfname').val() + " " + $('#userlname').val() + "</div> <div class='colthree'> $ " + usercost + "</div> </div></div></li>";
                } else if ($('#poemode').val() == 1) {
                    html = " <li  value=" + $('#usrEmailid').val() + "> <div class='title'> You</div> <div class='colone'> <img id='dynyouimg' src='../../Images/user.png'  width='34' height='34'/></div> <div class='detailsholder'><div class='details'><div class='coltwo'> " + $('#userfname').val() + " " + $('#userlname').val() + "</div> <div class='colthree'> $ " + usercost + "</div> </div></div></li>";
                }
                var frststcolTest = '';
                var className = '';
                var frstcoldes = 0;
                if (response != null) {
                    for (var i = 0; i < response.length; i++) {
                        for (var j = 0; j < response[i].length; j++) {
                            if (response[i][j].Designation.Level != frstcoldes) {
                                frstcoldes = response[i][j].Designation.Level;
                                frststcolTest = " <div class='title'>" + response[i][j].Designation.Name + "</div>";
                                className = '';
                            } else {
                                frststcolTest = '';
                                className = ' combine';
                            }
                            var amount = html.indexOf(response[i][j].User.EmailAddress.toLowerCase()) >= 0 ? '0' : usercost;

                            if (reqoption == 'add') {
                                var subscribedate = $('#SubscribedUserDate').val();
                                if (usercost != 0 && subscribedate != "") {
                                    usercost = UserCost_Bysub(subscribedate, $('#amount').val());
                                }
                                if (amount != 0 && $('#trailtopaid').val() != 1) {
                                    amount = html5.indexOf(response[i][j].User.EmailAddress.toLowerCase()) >= 0 ? '0' : usercost;
                                }
                            }
                            $('#myusers').html(' ');
                            $('#myusers').html(html);
                            $('#tempstorage').html(html);
                            var valid = false;
                            $('.searchlist').each(function () {
                                var desig = $(this).attr("value").toString();
                                var mail = $(this).attr("name");
                                if (mail.toLowerCase() == response[i][j].User.EmailAddress.toLowerCase() && parseInt(desig) == response[i][j].Designation.Level) {
                                    valid = true;
                                }
                            });
                            if (valid == false) {
                                html = html + "<li class='searchlist" + className + "' value=" + response[i][j].Designation.Level + " name=" + response[i][j].User.EmailAddress + ">" + frststcolTest + "<div class='colone'>" +
                                    "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i][j].User.UserId + "&rnd=" + Math.random() + "' width='34' height='34' alt='User' /></div> <div class='detailsholder'> <div class='details'>" +
                                    "<div class='coltwo'>" + response[i][j].User.FirstName + " " + response[i][j].User.LastName + "</div>" +
                                    "<div class='colthree'>$ " + amount + "</div></div> <div class='details'> <div class='edit' id='editDesg" + response[i][j].Designation.Level + "' name='edituser" + response[i][j].User.EmailAddress + "'> <img src='../../Images/edit.png' /></div> <div class='delete' id='DelDesg" + response[i][j].Designation.Level + "' name='Deluser" + response[i][j].User.EmailAddress + "'> <img src='../../Images/delete.png' /></div> </div> </div></li>";
                            }
                            $('#tempstorage').html('');
                        }
                    }
                }

                $('#' + prefix + 'fname').val('');
                $('#' + prefix + 'lname').val('');
                $('#' + prefix + 'email').val('');
                $('#' + prefix + 'add').attr("disabled", false);
                $('#' + prefix + 'selectepoeid').val(0);
                $('#' + prefix + 'selectedpoe').html('Select a REP');
                $('#' + prefix + 'mypoes li').each(function () {
                    var check = $(this).hasClass('assignpoe1select');
                    var getvalue = $(this).val();
                    if (check == true && getvalue != 0)
                        $(this).removeClass('assignpoe1select');
                });
                $('#myusers').html(html);

                register.loadPoetoRightside();
                register.loadCost();
                register.loaduserPhoto();
                register.LoadEditBlock();
                register.DeleteMember();
                register.loadCartList();
                var mode = $('#HdnMode').val();
                if (mode == "new") {
                    register.CheckMangerCount();
                }
            },
            error: function (err) {
            }
        });
    },
    setSubscribedPoes: function () {
        Common.ajaxsync({
            url: '/Common/GetSelectedPoes',
            success: function (response) {
                $('#GetSelectedPoe').val(response.length);
            },
            error: function (err) {
            }
        });
    },
    loadNetworkCount: function () {
        Common.ajaxsync({
            url: '/SignUp/GetMyNetworkCount',
            success: function (response) {
                $('#GetNetworkCount').val(response);
            },
            error: function (err) {
            }
        });
    },
    loadYoudata: function () {
        Common.ajaxsync({
            url: '/SignUp/GetYouData',
            success: function (response) {
                $('#YouNetworkName').val(response.NetworkName);
                $('#YouFirstname').val(response.FirstName);
                $('#YouLastName').val(response.LastName);
                $('#YouCompany').val(response.CompanyName);
                $('#YouEmailid').val(response.Email);
                $('#YouEmailid').attr("disabled", "disabled");
                $('#countrys').find('option[value=' + response.Country + ']').attr("selected", "selected");
                $('#trailtopaid').val(response.TrialToPaidmode);
                $('#poemode').val(response.PoeMode);
                if (response.HeaderText != "" && response.HeaderText != null) {
                    $('#contentChange').text(response.HeaderText);
                }
                if (response.PoeMode == 1) {
                    $('#trailtopaid').val(response.PoeMode);
                }
                if ($('#HdnMode').val() == 'add' && response.TrialToPaidmode == 1) {
                    $('#poemode').val(1);
                }
            },
            error: function (err) {
            }
        });
    },
    loadCountrydata: function () {
        var countries = register.loadCountries();
        $('#countrys').html('');
        $('#countrys').append("<option value='0'>--Select--</option>");
        $(countries).each(function () {
            $('#countrys').append("<option value='" + $(this).attr("Id") + "'>" + $(this).attr("Name") + "</option>");
            $('#countrys').val(1);
        });
    },
    loadCountries: function () {
        var returnValue = null;
        Common.ajaxsync({
            url: '../../Common/GetAllCounties',
            success: function (response) {
                returnValue = response;
            },
            error: function (err) {
            }
        });
        return returnValue;
    },
    GetPoECost: function () {
        Common.ajaxsync({
            url: '/SignUp/GetPoEcost?planid=2',
            success: function (response) {
                $('#PoEPaidCost').val(response.PoeCost);
            },
            error: function (err) {
            }
        });
    },
    loadPlans: function () {
        Common.ajaxsync({
            url: '/SignUp/GetPlanById',
            success: function (response) {
                // below  context commented since payment section is removed.
                //if (response.PlanId == 1) {
                //    $('#trailorpaid').html('(The items below are valid until your trial period ends)');
                //} else {
                //    $('#trailorpaid').html('(The items below are valid for a subscription period of one year starting today)');
                //}
                $('#plansClicked').val(response.PlanId);
                $('#amount').val(response.UserCost);
                $('#PoeCost').val(response.PoeCost);
                $('#MaxPoeCount').val(response.MaxPoeCount);
                $('#MaxUserCount').val(response.MaxUsercount);
            },
            error: function (err) {
            }
        });
    },
    getSelectedPoes: function () {
        Common.ajaxsync({
            url: '/Common/GetSelectedDropDownPoe',
            success: function (response) {
                var html = '';

                if (response != null) {
                    for (var i = 0; i < response.length; i++) {
                        html = html + "<li  id='resPoe" + response[i].POEId + "'value=" + response[i].POEId + ">" + response[i].Name + "</li>";
                    }
                }
                var htm = html;
                html = html + "<li value='0' class='cpoe'>Assign a REP from the library</li>";
                $('.mypoes').html(html);
                $('#purchasedPoe').html(htm);
            },
            error: function () {
            }
        });
    },
    loadSlimScroll: function (count) {
        if (($('#myusers >li').length + count) <= 6) {
            $('#myusers').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
        } else {
            $('#myusers').parents('.slimScrollDiv').find('.slimScrollBar').removeClass('dummy-slimscrollbar-backgound');
        }
    }
};
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function GetOldContents() {
    Common.ajaxsync({
        url: '/SignUp/GetLoadData',
        success: function (response) {
            if (response.Mode != null) {
                var bvalue = '';
                var openSlide = '';
                switch (parseInt(response.Mode)) {
                    case 2:
                        bvalue = 'mgr';
                        openSlide = 3;
                        break;
                    case 3:
                        bvalue = 'skp';
                        openSlide = 5;
                        break;
                    case 1:
                        bvalue = 'tm';
                        openSlide = 7;
                        break;
                    case 5:
                        bvalue = 'pr';
                        openSlide = 9;
                        break;
                    case 6:
                        bvalue = 'cust';
                        openSlide = 11;
                        break;
                    default:
                        break;
                }
                $('#' + bvalue + 'fname').val(response.FirstName);
                $('#' + bvalue + 'lname').val(response.LastName);
                $('#' + bvalue + 'email').val(response.Email);
                $('#' + bvalue + 'roles').val(response.Role);
                $('.addmngr h2:nth-child(' + openSlide + ')').addClass('active').next().slideDown();
            }
        },
        error: function (err) {
        }
    });
}
function UserCost_Bysub(subscribedDate, userCost) {
    var finalcost = 0;
    var subscribedates = new Date(subscribedDate);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var purchasedDate = mm + "/" + dd + "/" + yyyy;
    var addDays = subscribedates.setDate(subscribedates.getDate() + 365);
    var finaldate = new Date(addDays);
    var date = finaldate.getDate();
    var month = finaldate.getMonth();
    var year = finaldate.getFullYear();
    var subscribemonths = (month + 1) + "/" + date + "/" + year;
    var oneDay = 1000 * 60 * 60 * 24;
    var x = purchasedDate.split("/");
    var y = subscribemonths.split("/");
    var date1 = new Date(x[2], (x[0] - 1), x[1]);
    var date2 = new Date(y[2], (y[0] - 1), y[1]);
    var diff = Math.ceil((date2.getTime() - date1.getTime()) / (oneDay));
    if (diff != 365) {
        var perdayCost = userCost / 365;
        finalcost = (diff * perdayCost).toFixed(2);
    } else {
        finalcost = userCost;
    }
    return finalcost;
}