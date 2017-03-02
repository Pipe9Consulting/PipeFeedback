$(document).ready(function () {
    //For YourProfile Start
    var youSelectVal = $('#networkMode').val();
    if (youSelectVal == 1) {
        $('.sliderdiv').hide();
      
        $('.uTile').addClass('selected');
        $('.networkTile .nwTile').find('img').attr('src', '../../Images/networkIcon0.png');
        $('.net2,.youcont').show();
        $('.urntwrk,.urmngr,.teammembr,.urpeer,.custpart,.slidebtn,.net1,.net3,.net4,.net5,.net6,.net7,.yammmerusr').hide();
        $('.nwTile,.mngrTile,.teamTile,.peerTile,.custTile,.yammerTile').removeClass('selected');
        $('.networkholder').animate({ 'left': '0%' }, { duration: 400 });
    }
    //YourProfile End
    
    
   
    $('#adduserNxtStep').hide();
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    network.IsOwnSubscribtion();
    $('#networkpopup').hide();
    var html = "<li class='nwTilebtm'><span id='nwcount'></span><p>Your Network</P></li>" +
            "<li class='uTilebtm'><span><img src='../../Images/Icons/self-small.png' id='cyouid'  width='18px' height='18px' /></span><p>You</P></li>" +
            "<li class='mngrTilebtm'><span><img src='../../Images/Icons/manager-small.png'/></span><p>Your Managers</P></li>" +
            "<li class='teamTilebtm'><span><img src='../../Images/Icons/team-small.png'/></span><p>Your Team Members</P></li>" +
            "<li class='peerTilebtm'><span><img src='../../Images/Icons/peer-small.png'/></span><p>Your Peers</P></li>" +
            "<li class='custTilebtm'><span><img src='../../Images/Icons/customer-small.png'/></span><p>Your Customers & Partners</P></li>";
    $('#target ul').html(html);

    
        $('.pane').find('input[type=radio]:checked').removeAttr('checked');
        $("#n" + $(this).context.title).attr('checked', 'checked');
        $("#n" + $(this).context.title).parent().find('img').attr('src', '../../Images/icons/start-network_h.png');

 

    
    $('#feedback-quickview').live('click', function () { feedback.loadquickview(); });
    $('#feedback-detailsview').live('click', function () { feedback.loaddetailview(); });
    network.poeMenu();
    network.loadControlEvents();
    network.loadmenuevents();
    $("body").click(
              function (e) {
                  if ((e.target || e.srcElement).className !== "addmember" && (e.target || e.srcElement).className !== "selectmngr" && (e.target || e.srcElement).className !== "" && (e.target || e.srcElement).className !== "positionTm" && (e.target || e.srcElement).className !== "vs-context-menu" && (e.target || e.srcElement).className !== "assignmemberslist selectmngr") {
                      
                      $('.sendinv').hide();
                  // debugger;
                      $('.addmember').css('background', '');
                      $('.addmember').attr('id', '0');
                      $('.vs-context-menu').hide();
                  }
              });

    ///Newly added for network

    var previousele = "";
    var thevalue = "";

    $('.scroll1 li').on('click', function () {
        //debugger;
        //alert("dd");
        previousele = $(this).find('.positionTm');
        thevalue = $(this); 
    });
    //var assignPoe = [];
    //$('.vs-context-menu li').on("click", function () {
    //    alert($('.selectmngr').val());
    //    thevalue = $('.selectmngr');
    //    previousele = $('.selectmngr').find('.positionTm');
    //    var assignPoes = new Requests.AssignPoe();
    //    var text = $(this).text();
    //    var userid = thevalue.attr("data-value");
    //    var poename = thevalue.attr("name");
    //    var poeselected = $('#selectedpoe').text();
    //    var jobtitle = "";
    //    switch ($(this).val()) {
    //        case 1:
    //            jobtitle = "Team Member";
    //            break;
    //        case 2:
    //            jobtitle = "Manager";
    //            break;
    //        case 3:
    //            jobtitle = "Skiplevel Manager";
    //            break;
    //        case 5:
    //            jobtitle = "Peer";
    //            break;
    //        case 6:
    //            jobtitle = "Customers & Partner";
    //            break;
    //        default:
    //            jobtitle = "Manager";
    //            break;
    //    }
    //    debugger;
    //    assignPoe = removeValue(assignPoe, userid);
    //    if ($(this).val() != 0) {
    //        if (thevalue.val() != $(this).val()) {
    //            previousele.text(text);
    //            assignPoes.UserId = userid;
    //            assignPoes.designationId = $(this).val();
    //            assignPoes.Jobtitle = jobtitle;
    //            assignPoes.EmailId = thevalue.attr("data-mail");
    //            assignPoe.push(assignPoes);
    //        } else if (poename != poeselected) {
    //            previousele.text(text);
    //            assignPoes.UserId = userid;
    //            assignPoes.designationId = $(this).val();
    //            assignPoes.Jobtitle = jobtitle;
    //            assignPoe.push(assignPoes);
    //        } else {
    //            alert("This member is already add as an " + text);
    //        }
    //    }
    //    else {
    //        previousele.text('');
    //    }

    //    $('.vs-context-menu').hide();
    //});
    //$('#assignPoe').live('click', function () {
    //   // alert(assignPoe.length);
    //    if (assignPoe.length != 0) {
    //        Common.ajaxPost({
    //            url: '/Feedback/Assignpoe',
    //            data: assignPoe,
    //            success: function () {
    //                $(this).addClass('selecpoe');
    //                $('#networkpopup,.poepopupbg,#dragassignpoe').fadeOut("slow");
    //                $(".popupbg,.popup, #dragassignpoe").hide();
    //                assignPoe.length = 0;
    //                $('#infos').html('Selected Users assign successfully');
    //                $(".popupbg,.popup").show();
    //                network.loadData();
    //            },
    //            error: function () {
    //            }
    //        });
    //    } else {
    //        alert("Select users for \nassign");
    //    }
    //});






        //$('.networkTile li').not('.uTile').each(function () {

        //    $(this).find('img').attr('src', '../../Images/networkIcon' + $(this).index() + '.png');

    //});

    if (youSelectVal != 1) {
        var image = "../../Images/networkIcon0Selected.png";
        $('.networkTile li.nwTile').find('img').attr("src", image);
    }


    $("#status").fadeOut();
    $("#preloader").delay(100).fadeOut("slow");
    //$('.scroll2').slimScroll();
    $('.scroll1').slimScroll();
});

var network = {
    loadcnt : 0,
    loadControlEvents: function () {
        $('#addmgr').live('click', function () {
            var subid = $('#Subid').val();
            //if (subid != -1) {
                window.location.href = '/Signup/Add/Manager';
            //} else {
            //    loadOwnNetwork("Manager", 1);
            //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
            //}
        });
        $('#addskpmgr').live('click', function () {
            var subid = $('#Subid').val();
            //if (subid != -1) {
                window.location.href = '/Signup/Add/SkipManager';
            //} else {
            //    loadOwnNetwork("SkipManager", 1);
            //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
            //}
        });
        $('#addteam').live('click', function () {
            var subid = $('#Subid').val();
           // if (subid != -1) {
                window.location.href = '/Signup/Add/Team';
            //} else {
            //    loadOwnNetwork("Team", 1);
            //    // $('#ChooseNetwork,.popupbg').fadeIn("slow");
            //}
        });
        $('#addpeer').live('click', function () {
            //var subid = $('#Subid').val();
            //if (subid != -1) {
                window.location.href = '/Signup/Add/Peer';
            //} else {
            //    loadOwnNetwork("Peer", 1);
            //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
            //}
        });
        $('#addcust').live('click', function () {
            //var subid = $('#Subid').val();
            //if (subid != -1) {
                window.location.href = '/Signup/Add/Customer';
            //} else {
            //    loadOwnNetwork("Customer", 1);
            //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
            //}
        });

        $('#allinviteli').live('click', function () {
            network.inviteAll($('#yourNetworkContent'));
        });
        $('#allrequestli').live('click', function () {
            network.requestAll($('#yourNetworkContent'));
        });
        $('#teaminvite').live('click', function () {
            network.inviteIndividual($('#yourTeamContent'));
        });
        $('#managerRequest').live('click', function () {
            network.requestIndividual($('#yourManagerContent'));
        });
        $('#peerInvite').live('click', function () {
            network.peerinviteIndividual($('#yourPeerContent'));
        });
        $('#peerRequest').live('click', function () {
            network.peerRequestIndividual($('#yourPeerContent'));
        });
        $('#custRequest').live('click', function () {
            network.requestIndividual($('#yourCustomerContent'));
        });
        $('#btnProfUpdate').live('click', function () {
            network.loadEditBtnClick();
        });
        $('#assignManagers').live('click', function () {
            //var subid = $('#Subid').val();
            //if (subid != -1) {
                $('#assignpoePopup, #dragassignpoe').show();
                $('.popupbg').show();
                //$(this).addClass('selecpoe');
                $('#networkpopup,.poepopupbg').fadeIn("slow");
                network.LoadPopupdata();
            //} else {
            //    loadOwnNetwork("null", 2);
            //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
            //}
        });
        $('#assignSkpManager').live('click', function () {
            //var subid = $('#Subid').val();
            //if (subid != -1) {
               // $(this).addClass('selecpoe');
                $('#assignpoePopup, #dragassignpoe').show();
                $('.popupbg').show();
                //$(this).addClass('selecpoe');
                $('#networkpopup,.poepopupbg').fadeIn("slow");
                network.LoadPopupdata();
            //} else {
            //    loadOwnNetwork("null", 2);
            //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
            //}
        });
        $('#AssignTeammember').live('click', function () {
            //var subid = $('#Subid').val();
            //if (subid != -1) {
                //$(this).addClass('selecpoe');
                $('#assignpoePopup, #dragassignpoe').show();
                $('.popupbg').show();
                //$(this).addClass('selecpoe');
                $('#networkpopup,.poepopupbg').fadeIn("slow");
                network.LoadPopupdata();
            //} else {
            //    loadOwnNetwork("null", 2);
            //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
            //}
        });
        $('#AssignPeersVal').live('click', function () {
            //var subid = $('#Subid').val();
            //if (subid != -1) {
               // $(this).addClass('selecpoe');
                $('#assignpoePopup, #dragassignpoe').show();
                $('.popupbg').show();
               // $(this).addClass('selecpoe');
                $('#networkpopup,.poepopupbg').fadeIn("slow");
                network.LoadPopupdata();
            //} else {
            //    loadOwnNetwork("null", 2);
            //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
            //}
        });
        $('#AssignCustomer').live('click', function () {
            //var subid = $('#Subid').val();
            //if (subid != -1) {
                $(this).addClass('selecpoe');
                $('#assignpoePopup, #dragassignpoe').show();
                $('.popupbg').show();
               // $(this).addClass('selecpoe');
                $('#networkpopup,.poepopupbg').fadeIn("slow");
                network.LoadPopupdata();
            //} else {
            //    loadOwnNetwork("AssignCustomer", 2);
            //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
            //}
        });
        $('#cancelbtn').live('click', function () {
            $(".poepopupbg,.delPopupbg, .alertboxholder").fadeOut();
        });
        $('#poelibrayYammer').click(function () {
            window.location.href = "/Signup/Poelibrary?location=Add";
        });
        $('#poelibrayYammer').click(function () {
            window.location.href = "/Signup/Poelibrary?location=Add";
        });
        $('#cancelyammerpopup').click(function () {
            $(".yammerpopupbg, .yammernetwork").fadeOut();
        });
        //Delete
        var selectedids = new Array();
        var selectedmids = new Array();
        var selectedprids = new Array();
        var selectedtmids = new Array();
        var deletePeer = 0;
        $('#deletemgr').live('click', function () {
            //var subid = $('#Subid').val();
            //if (subid != -1) {
                $('#yourManagerContent').find('.selectmngr').each(function () {
                    selectedids.push($(this).val());
                });
                if (selectedids.length != 0) {
                    $('#info').html('Are you sure you want to delete this user');
                    $(".popupbg,.delPopupbg,.alertboxholder").show();
                } else {
                    $('#masterMsgCont').text("You have to select at least one Manager or Skip Level Manager to delete");
                    $('#overallCont').show();
                    //$('#infos').html('You have to select at least one Manager or Skip Level Manager to delete');
                    //$(".popupbg,.delPopupbg,.popup").show();
                }
            //} else {
            //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
            //    loadOwnNetwork("null", 2);
            //}
        });
        $('#deletetm').live('click', function () {
            //var subid = $('#Subid').val();
            //if (subid != -1) {
                $('#yourTeamContent').find('.selectmngr').each(function () {
                    selectedtmids.push($(this).val());
                });
                if (selectedtmids.length != 0) {
                    $('#info').html('Are you sure you want<br/> to delete this user');
                    $(".popupbg,.delPopupbg,.alertboxholder").show();
                } else {
                    $('#masterMsgCont').text("You have to select at least one Team Member to delete");
                    $('#overallCont').show();
                    //$('#infos').html('You have to select at least one Team Member to delete');
                    //$(".popupbg,.delPopupbg,.popup").show();
                }
            //} else {
            //    // $('#ChooseNetwork,.popupbg').fadeIn("slow");
            //    loadOwnNetwork("null", 2);
            //}
        });
        //Peer Old
        $('#deletepeer').live('click', function () {
            //var subid = $('#Subid').val();
            //if (subid != -1) {
                deletePeer = 1;
                if ($('#yourPeerContent').find('.selectmngr').length == 0) {
                    $('#masterMsgCont').text("You have to select at least one Peer to delete");
                    $('#overallCont').show();
                    //$('#infos').html('You have to select at least one Peer to delete');
                    //$(".popupbg,.delPopupbg,.popup").show();
                } else {
                    $('#yourPeerContent').find('.selectmngr').each(function () {
                        selectedprids.push($(this).val());
                        selectedmids.push($(this).data("mgrid"));
                    });
                    $('#info').html('Are you sure you want to delete this user');
                    $(".popupbg,.delPopupbg,.alertboxholder").show();
                }
            //} else {
            //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
            //    loadOwnNetwork("null", 2);
            //}
        });

        $('#deletecust').live('click', function () {
            //var subid = $('#Subid').val();
            //if (subid != -1) {
                $('#yourCustomerContent').find('.selectmngr').each(function () {
                    selectedids.push($(this).val());
                });
                if (selectedids.length != 0) {
                    $('#info').html('Are you sure you want to delete this user');
                    $(".popupbg,.delPopupbg,.alertboxholder").show();
                }
                else {
                    $('#masterMsgCont').text("You have to select at least one Customer to delete");
                    $('#overallCont').show();
                    //$('#infos').html('You have to select at least one Customer to delete');
                    //$(".popupbg,.delPopupbg,.popup").show();
                }
            //} else {
            //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
            //    loadOwnNetwork("null", 2);
            //}
        });
        $('#deleteusrbtn').on('click', function () {
            if (selectedids.length != 0) {
                for (var i = 0; i < selectedids.length; i++) {
                    var level = 2;
                    var deletedid = selectedids[i];
                    network.DeleteUSer({ data: { 'level': level, 'deleteId': deletedid, 'deletePeer': deletePeer } });
                }
                network.loadCustomerData();
                //network.loadTeamMemberData();
                network.loadAllMembersData();
                network.loadManagerData();
                $(".popupbg,.delPopupbg,.alertboxholder").hide();
                $('#masterMsgCont').text("Selected users have been deleted successfully");
                $('#overallCont').show();
                //$('#infos').html('Selected users have been deleted successfully');
                //$(".popupbg,.delPopupbg,.popup").show();
            }

            if (selectedtmids.length != 0) {
                for (var k = 0; k < selectedtmids.length; k++) {
                    var level = 1;
                    var deletedid = selectedtmids[k];
                    network.DeleteUSer({ data: { 'level': level, 'deleteId': deletedid, 'deletePeer': deletePeer } });
                }
                network.loadTeamMemberData();
                network.loadAllMembersData();
                $(".popupbg,.delPopupbg,.alertboxholder").hide();
                $('#masterMsgCont').text("Selected users have been deleted successfully");
                $('#overallCont').show();
                //$('#infos').html('Selected users have been deleted successfully');
                //$(".popupbg,.delPopupbg,.popup").show();
            }
            if (selectedprids.length != 0) {
                for (var l = 0; l < selectedprids.length; l++) {
                    var level = 2;
                    var deletedid = selectedprids[l];
                    network.DeleteUSer({ data: { 'level': level, 'deleteId': deletedid, 'deletePeer': deletePeer } });
                }
            }
            if (selectedmids.length != 0) {
                for (var m = 0; m < selectedmids.length; m++) {
                    var level = 1;
                    var deletedid = selectedmids[m];
                    network.DeleteUSer({ data: { 'level': level, 'deleteId': deletedid, 'deletePeer': deletePeer } });
                    $(".popupbg,.delPopupbg,.alertboxholder").hide();
                    $('#masterMsgCont').text("Selected users have been deleted successfully");
                    $('#overallCont').show();
                    //$('#infos').html('Selected users have been deleted successfully');
                    //$(".popupbg,.delPopupbg,.popup").show();
                }
            }

            network.loadAllMembersData();
            network.loadPeerData();
        });
        //

        //Send email
        $('#emailall').live('click', function () {
            network.sendmail($('#yourNetworkContent'));
        });

        //
        $('.netmgr').live('click', function () {
            $(this).toggleClass('selectmngr');
        });
        $('.netteam').live('click', function () {
            $(this).toggleClass('selectmngr');
        });
        $('.netcust').live('click', function () {
            $(this).toggleClass('selectmngr');
        });
        $('.netpeer').live('click', function () {
            $(this).toggleClass('selectmngr');
        });
        $('.nwTile').live('click', function () {
            //var count1 = $('#nwpagecount').val();
            //if (count1 > 1) {
            //    $('#pagetxt').html('Page ' + $('#nwcurpage').val() + ' of ' + $('#nwpagecount').val());
            //} else {
            //    $('#pagetxt').html('');
            //}
            //if (count1 != 0) {
            //    $('.network ul').css('width', 100 / count1 + '%');
            //} else {
            //    $('.network ul').css('width', '100%');
            //}

            $('.networkTile li').not('.uTile').each(function () {

                $(this).find('img').attr('src', '../../Images/networkIcon' + $(this).index() + '.png');

            });
            var image = "../../Images/networkIcon" + ($(this).index()) + "Selected.png";
            $(this).not('.uTile').find('img').attr("src", image);



            $('.nwTile').addClass('selected');            
            $('.sliderdiv').hide();
            $('#slideall').show();
            $('.net1,.slidebtn,.urntwrk').show();
            $('.youcont,.urmngr,.teammembr,.urpeer,.custpart,.net2,.net3,.net4,.net5,.net6,.net7,.yammmerusr').hide();
            $('.uTile,.mngrTile,.teamTile,.peerTile,.custTile,.yammerTile').removeClass('selected');
            $('.networkholder').animate({ 'left': '0%' }, { duration: 400 });
        });
        $('.uTile').live('click', function () {
            $('.networkTile li').not('.uTile').each(function () {

                $(this).find('img').attr('src', '../../Images/networkIcon' + $(this).index() + '.png');

            });
            var image = "../../Images/networkIcon" + ($(this).index()) + "Selected.png";
            $(this).not('.uTile').find('img').attr("src", image);



            $('.sliderdiv').hide();
            $('.uTile').addClass('selected');
            $('.net2,.youcont').show();
            $('.urntwrk,.urmngr,.teammembr,.urpeer,.custpart,.slidebtn,.net1,.net3,.net4,.net5,.net6,.net7,.yammmerusr').hide();
            $('.nwTile,.mngrTile,.teamTile,.peerTile,.custTile,.yammerTile').removeClass('selected');
            $('.networkholder').animate({ 'left': '0%' }, { duration: 400 });
        });
        $('.mngrTile').live('click', function () {
            //var count1 = $('#mgrpagecount').val();
            //if (count1 > 1) {
            //    $('#pagetxt').html('Page ' + $('#mgrcurpage').val() + ' of ' + $('#mgrpagecount').val());
            //} else {
            //    $('#pagetxt').html('');
            //}
            //if (count1 != 0) {
            //    $('.network ul').css('width', 100 / count1 + '%');
            //} else {
            //    $('.network ul').css('width', '100%');
            //}

            $('.networkTile li').not('.uTile').each(function () {

                $(this).find('img').attr('src', '../../Images/networkIcon' + $(this).index() + '.png');

            });
            var image = "../../Images/networkIcon" + ($(this).index()) + "Selected.png";
            $(this).not('.uTile').find('img').attr("src", image);

            $('.sliderdiv').hide();
            $('#slidemgr').show();
            $('.mngrTile').addClass('selected');
            $('.net3,.urmngr,.slidebtn').show();
            $('.urntwrk,.youcont,.teammembr,.urpeer,.custpart,.net2,.net1,.net4,.net5,.net6,.net7,.yammmerusr').hide();
            $('.nwTile,.uTile,.teamTile,.peerTile,.custTile,.yammerTile').removeClass('selected');
            $('.networkholder').animate({ 'left': '0%' }, { duration: 400 });
        });
        $('.teamTile').live('click', function () {
            var count1 = $('#tmpagecount').val();
            //if (count1 > 1) {
            //    $('#pagetxt').html('Page ' + $('#tmcurpage').val() + ' of ' + $('#tmpagecount').val());
            //} else {
            //    $('#pagetxt').html('');
            //}
            //if (count1 != 0) {
            //    $('.network ul').css('width', 100 / count1 + '%');
            //} else {
            //    $('.network ul').css('width', '100%');
            //}

            //$('#pagingTeam').html((((response.length / licount) > 1) ? network.getPaginationhtml((response.length / licount), 'your_team') : ""));
            $('.networkTile li').not('.uTile').each(function () {

                $(this).find('img').attr('src', '../../Images/networkIcon' + $(this).index() + '.png');

            });
            var image = "../../Images/networkIcon" + ($(this).index()) + "Selected.png";
            $(this).not('.uTile').find('img').attr("src", image);

            $('.sliderdiv').hide();
            $('#slideteam').show();
            $('.teamTile').addClass('selected');
            $('.net4,.teammembr,.slidebtn').show();
            $('.urntwrk,.youcont,.urmngr,.urpeer,.custpart,.net2,.net3,.net1,.net5,.net6,.net7,.yammmerusr').hide();
           
            //$('#pagingTeam').html(((count1 > 1) ? network.getPaginationhtml((count1), 'your_team') : ""));
          

           
            $('.nwTile,.uTile,.mngrTile,.peerTile,.custTile,.yammerTile').removeClass('selected');

            $('.networkholder').animate({ 'left': '0%' }, { duration: 400 });
        });
        $('.peerTile').live('click', function () {
            //var count1 = $('#peerpagecount').val();
            //if (count1 > 1) {
            //    $('#pagetxt').html('Page ' + $('#peercurpage').val() + ' of ' + $('#peerpagecount').val());
            //} else {
            //    $('#pagetxt').html('');
            //}
            //if (count1 != 0) {
            //    $('.network ul').css('width', 100 / count1 + '%');
            //} else {
            //    $('.network ul').css('width', '100%');
            //}
            $('.networkTile li').not('.uTile').each(function () {

                $(this).find('img').attr('src', '../../Images/networkIcon' + $(this).index() + '.png');

            });
            var image = "../../Images/networkIcon" + ($(this).index()) + "Selected.png";
            $(this).not('.uTile').find('img').attr("src", image);

            $('.sliderdiv').hide();
            $('#slidepeer').show();
            $('.peerTile').addClass('selected');
            $('.net5,.urpeer,.slidebtn').show();
            $('.urntwrk,.youcont,.urmngr,.teammembr,.custpart,.net2,.net3,.net4,.net1,.net6,.net7,.yammmerusr').hide();
            $('.nwTile,.uTile,.mngrTile,.teamTile,.custTile,.yammerTile').removeClass('selected');
            $('.networkholder').animate({ 'left': '0%' }, { duration: 400 });
        });
        $('.custTile').live('click', function () {
            //var count1 = $('#custpagecount').val();
            //if (count1 > 1) {
            //    $('#pagetxt').html('Page ' + $('#custcurpage').val() + ' of ' + $('#custpagecount').val());
            //} else {
            //    $('#pagetxt').html('');
            //}
            //if (count1 != 0) {
            //    $('.network ul').css('width', 100 / count1 + '%');
            //} else {
            //    $('.network ul').css('width', '100%');
            //}
            $('.networkTile li').not('.uTile').each(function () {

                $(this).find('img').attr('src', '../../Images/networkIcon' + $(this).index() + '.png');

            });
            var image = "../../Images/networkIcon" + ($(this).index()) + "Selected.png";
            $(this).not('.uTile').find('img').attr("src", image);
            $('.sliderdiv').hide();
            $('#slidecust').show();
            $('.custTile').addClass('selected');
            $('.net6,.custpart,.slidebtn').show();
            $('.urntwrk,.youcont,.urmngr,.teammembr,.urpeer,.net2,.net3,.net4,.net5,.net1,.net7,.yammmerusr').hide();
            $('.nwTile,.uTile,.mngrTile,.teamTile,.peerTile,.yammerTile').removeClass('selected');
            $('.networkholder').animate({ 'left': '0%' }, { duration: 400 });
        });
        $('.yammerTile').live('click', function () {
            $('.networkTile li').not('.uTile').each(function () {

                $(this).find('img').attr('src', '../../Images/networkIcon' + $(this).index() + '.png');

            });
            var image = "../../Images/networkIcon" + ($(this).index()) + "Selected.png";
            $(this).not('.uTile').find('img').attr("src", image);
            var totalcount = parseInt($('#yammerpagecount').val());
            var size = 100 / totalcount;
            $('.network ul').width();
            $('#youryammercontent').html('');
            $('.sliderdiv').hide();
            $('#slidecust').show();
            $('.yammerTile').addClass('selected');
            $('.net7,.yammmerusr,.slidebtn').show();
            $('.urntwrk,.youcont,.urmngr,.teammembr,.urpeer,.net2,.net3,.net4,.net5,.net1,.net6,.custpart').hide();
            $('.nwTile,.uTile,.mngrTile,.teamTile,.peerTile,.custTile').removeClass('selected');
            $('.networkholder').animate({ 'left': '0%' }, { duration: 400 });
            network.loadYammerdata();
        });
        $('.close,#closeNetworkErr').live('click', function () {
            $(".popupbgassign,.delPopupbg,.popupbg,.popup, #dragassignpoe,.cyn").hide();
            $(".popupbgassign,.delPopupbg,.popupbg,.alertboxholder,#assignpoePopup").hide();
            $(".yammerpopupbg, .yammernetwork").fadeOut();

            $('.selectmngr').removeClass('selectmngr');
            selectedids = [];
            selectedmids = [];
            selectedtmids = [];
        });


        $('.nwTilebtm').live('click', function () {

            $('.networkTile li').not('.uTile').each(function () {

                $(this).find('img').attr('src', '../../Images/networkIcon' + $(this).index() + '.png');

            });
            var image = "../../Images/networkIcon" + ($(this).index()) + "Selected.png";
            $('.nwTile').not('.uTile').find('img').attr("src", image);



            $('.nwTile').addClass('selected');
            $('.sliderdiv').hide();
            $('#slideall').show();
            $('.net1,.slidebtn,.urntwrk').show();
            $('.youcont,.urmngr,.teammembr,.urpeer,.custpart,.net2,.net3,.net4,.net5,.net6,.net7,.yammmerusr').hide();
            $('.uTile,.mngrTile,.teamTile,.peerTile,.custTile,.yammerTile').removeClass('selected');
            $('.networkholder').animate({ 'left': '0%' }, { duration: 400 });
        });
        $('.uTilebtm').live('click', function () {
            $('.networkTile li').not('.uTile').each(function () {

                $(this).find('img').attr('src', '../../Images/networkIcon' + $(this).index() + '.png');

            });
            var image = "../../Images/networkIcon" + ($(this).index()) + "Selected.png";
            $('.uTile').not('.uTile').find('img').attr("src", image);



            $('.sliderdiv').hide();
            $('.uTile').addClass('selected');
            $('.net2,.youcont').show();
            $('.urntwrk,.urmngr,.teammembr,.urpeer,.custpart,.slidebtn,.net1,.net3,.net4,.net5,.net6,.net7,.yammmerusr').hide();
            $('.nwTile,.mngrTile,.teamTile,.peerTile,.custTile,.yammerTile').removeClass('selected');
            $('.networkholder').animate({ 'left': '0%' }, { duration: 400 });
        });
        $('.mngrTilebtm').live('click', function () {
            //var count1 = $('#mgrpagecount').val();
            //if (count1 > 1) {
            //    $('#pagetxt').html('Page ' + $('#mgrcurpage').val() + ' of ' + $('#mgrpagecount').val());
            //} else {
            //    $('#pagetxt').html('');
            //}
            //if (count1 != 0) {
            //    $('.network ul').css('width', 100 / count1 + '%');
            //} else {
            //    $('.network ul').css('width', '100%');
            //}

            $('.networkTile li').not('.uTile').each(function () {

                $(this).find('img').attr('src', '../../Images/networkIcon' + $(this).index() + '.png');

            });
            var image = "../../Images/networkIcon" + ($(this).index()) + "Selected.png";
            $('.mngrTile').not('.uTile').find('img').attr("src", image);

            $('.sliderdiv').hide();
            $('#slidemgr').show();
            $('.mngrTile').addClass('selected');
            $('.net3,.urmngr,.slidebtn').show();
            $('.urntwrk,.youcont,.teammembr,.urpeer,.custpart,.net2,.net1,.net4,.net5,.net6,.net7,.yammmerusr').hide();
            $('.nwTile,.uTile,.teamTile,.peerTile,.custTile,.yammerTile').removeClass('selected');
            $('.networkholder').animate({ 'left': '0%' }, { duration: 400 });
        });
        $('.teamTilebtm').live('click', function () {
            var count1 = $('#tmpagecount').val();
            //if (count1 > 1) {
            //    $('#pagetxt').html('Page ' + $('#tmcurpage').val() + ' of ' + $('#tmpagecount').val());
            //} else {
            //    $('#pagetxt').html('');
            //}
            //if (count1 != 0) {
            //    $('.network ul').css('width', 100 / count1 + '%');
            //} else {
            //    $('.network ul').css('width', '100%');
            //}

            //$('#pagingTeam').html((((response.length / licount) > 1) ? network.getPaginationhtml((response.length / licount), 'your_team') : ""));
            $('.networkTile li').not('.uTile').each(function () {

                $(this).find('img').attr('src', '../../Images/networkIcon' + $(this).index() + '.png');

            });
            var image = "../../Images/networkIcon" + ($(this).index()) + "Selected.png";
            $('.teamTile').not('.uTile').find('img').attr("src", image);

            $('.sliderdiv').hide();
            $('#slideteam').show();
            $('.teamTile').addClass('selected');
            $('.net4,.teammembr,.slidebtn').show();
            $('.urntwrk,.youcont,.urmngr,.urpeer,.custpart,.net2,.net3,.net1,.net5,.net6,.net7,.yammmerusr').hide();

            //$('#pagingTeam').html(((count1 > 1) ? network.getPaginationhtml((count1), 'your_team') : ""));



            $('.nwTile,.uTile,.mngrTile,.peerTile,.custTile,.yammerTile').removeClass('selected');

            $('.networkholder').animate({ 'left': '0%' }, { duration: 400 });
        });
        $('.peerTilebtm').live('click', function () {
            //var count1 = $('#peerpagecount').val();
            //if (count1 > 1) {
            //    $('#pagetxt').html('Page ' + $('#peercurpage').val() + ' of ' + $('#peerpagecount').val());
            //} else {
            //    $('#pagetxt').html('');
            //}
            //if (count1 != 0) {
            //    $('.network ul').css('width', 100 / count1 + '%');
            //} else {
            //    $('.network ul').css('width', '100%');
            //}
            $('.networkTile li').not('.uTile').each(function () {

                $(this).find('img').attr('src', '../../Images/networkIcon' + $(this).index() + '.png');

            });
            var image = "../../Images/networkIcon" + ($(this).index()) + "Selected.png";
            $('.peerTile').not('.uTile').find('img').attr("src", image);

            $('.sliderdiv').hide();
            $('#slidepeer').show();
            $('.peerTile').addClass('selected');
            $('.net5,.urpeer,.slidebtn').show();
            $('.urntwrk,.youcont,.urmngr,.teammembr,.custpart,.net2,.net3,.net4,.net1,.net6,.net7,.yammmerusr').hide();
            $('.nwTile,.uTile,.mngrTile,.teamTile,.custTile,.yammerTile').removeClass('selected');
            $('.networkholder').animate({ 'left': '0%' }, { duration: 400 });
        });
        $('.custTilebtm').live('click', function () {
            //var count1 = $('#custpagecount').val();
            //if (count1 > 1) {
            //    $('#pagetxt').html('Page ' + $('#custcurpage').val() + ' of ' + $('#custpagecount').val());
            //} else {
            //    $('#pagetxt').html('');
            //}
            //if (count1 != 0) {
            //    $('.network ul').css('width', 100 / count1 + '%');
            //} else {
            //    $('.network ul').css('width', '100%');
            //}
            $('.networkTile li').not('.uTile').each(function () {

                $(this).find('img').attr('src', '../../Images/networkIcon' + $(this).index() + '.png');

            });
            var image = "../../Images/networkIcon" + ($(this).index()) + "Selected.png";
            $('.custTile').not('.uTile').find('img').attr("src", image);
            $('.sliderdiv').hide();
            $('#slidecust').show();
            $('.custTile').addClass('selected');
            $('.net6,.custpart,.slidebtn').show();
            $('.urntwrk,.youcont,.urmngr,.teammembr,.urpeer,.net2,.net3,.net4,.net5,.net1,.net7,.yammmerusr').hide();
            $('.nwTile,.uTile,.mngrTile,.teamTile,.peerTile,.yammerTile').removeClass('selected');
            $('.networkholder').animate({ 'left': '0%' }, { duration: 400 });
        });
 







        $('#cancelbtn').on('click', function () {
            $("popupbgassign,.popupbg,.alertboxholder").hide();
            $('.selectmngr').removeClass('selectmngr');
        });
    },

    loadmenuevents: function () {
        Common.ajaxsync({
            url: '/Common/IsMyOwnSubscription',
            success: function (response) {
                if (!response) {
                    $('.subfunc').hide();
                    $('.assingees').hide();
                }
            },
            error: function (err) {
            }
        });
    },
    //    poe menu
    poeMenu: function () {
        $('#sliderbtn').html('');
        Common.ajax({
            url: '/Common/GetNetworkSubscribedPoesOld',//'/Common/GetNetworkSubscribedPoes',//'/Common/GetMyNetworkSubscribedPoes',
            success: function (response) {
                var html = "";
                var poeids = "";
                if (response != null) {
                    for (var i = 0; i < response.length; i++) {
                        html = html + " <li id ='poeli" + response[i].POEId + "' value=" + response[i].POEId + " class='poelistli'><a> <div class='icon'> <img src='../../Images/" + response[i].POEName.replace("&", "").replace('/', "") + "_Intro.png' alt='" + response[i].POEName + "' class='img grayscale' /></div> <p> " + response[i].POEName + "</p> </a><span></span></li>";
                        poeids = poeids + response[i].POEId + '%';
                    }
                    if (response.length < 4) {
                        for (var p = response.length; p < 4; p++) {
                            html = html + " <li class='poelistlidummy' style='cursor:default'></li>";
                        }
                    }

                    if (response.length > 4) {
                        if (response.length % 2 == 1) {
                            html = html + " <li class='poelistlidummy' style='cursor:default'></li>";
                        }
                    }


                    $('#poelist1').html(html);
                    var selpoe = $('#selectedPoeValueNetwork').val();
                    if (selpoe == "0") {
                        selpoe = $('.poelistli:first').val()
                    }
                    if ($('#poelist1 li').length > 4) {
                        $('.scroll2').slimScroll({
                            start: $('#poeli' + selpoe)
                        });
                    }
                    //Add New Poes
                    var getlist = poelist(poeids, html, response[0].POEId, response.length);
                } else {
                    poelist("", "", 0, 0);
                }
            },
            error: function (err) {
                $('#' + id).html("<span class='error'>SORRY! Some error<br/> has occurred!</span>");
            }
        });
    },
    LoadFullPoeList: function (length) {
    },
    setSelectedPoe: function (poeId) {
        $('.poelistli').removeClass('selected');
        $('#poeli' + poeId).addClass('selected');
        $('#selectedpoe').html(poeId);
        Common.ajaxsync({
            url: '../../Common/SetSelectedPoe',
            data: { 'poeId': poeId },
            success: function (response) {
            },
            error: function (err) {
            }
        });
    },
    loadData: function () {
        //Load All members and Count
        network.loadAllMembersData();
        //Load Managers
        network.loadManagerData();
        //Load Team members
        network.loadTeamMemberData();
        //Load Peers
        network.loadPeerData();
        //Load Customers
        network.loadCustomerData();
        //Load My Data
        network.loadMyData();
        //Hide All Sliders
        //Load yammer data
        //network.loadYammerdata();
        $('.customertiles').css("visibility", "visible");
    },

    //Load Popup Content
    LoadPopupdata: function () {
        Common.ajax({
            url: '/Wall/GetMyUserLists',
            success: function (response) {
                var list = "";
                for (var i = 0; i < response.length; i++) {
                    list = list + "<li class='assignmemberslist' value=" + response[i].Designation.Level + " name=" + response[i].POE.POEId + " data-value=" + response[i].User.UserId + " data-mail=" + response[i].User.EmailAddress + "> <img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' /> <div class='ntwrktext'> <p> " + response[i].User.FirstName + " " + response[i].User.LastName + "</p> <p> " + response[i].User.EmailAddress + "</p><p>Country: " + response[i].User.Country.Name + "</p> <p class=positionTm></p>  </div> </li>";
                }
                for (var j = response.length; j < 12; j++) {
                    list = list + "<li value='0'> <img src='/Uploadify/LoadImageHandler.ashx?id=0&rnd=" + Math.random() + "' width='61' height='61' alt='User' /> <div class='ntwrktext'> <p></p> <p> </p><p></p> <p class=positionTm></p>  </div> </li>";
                }
                $('#allnetworkContent').html(list);

                var previousele = "";
                var thevalue = "";
                $('.assignmemberslist').on("click", function () {
                    $(this).toggleClass('selectmngr');
                    thevalue = $(this);
                    previousele = $(this).find('.positionTm');
                });





                $('.assignmemberslist').vscontext({ menuBlock: 'vs-context-menu' });
                if (response.length <= 12) {
                    //$('#allnetworkContent').parent('.scroll1').removeClass('scroll1');
                    $('#allnetworkContent').parents('.slimScrollDiv').find('.slimScrollBar').remove();
                    $('#allnetworkContent').parents('.slimScrollDiv').find('.slimScrollRail').remove();
                }
                


                /////
                
                var assignPoe = [];
                $('.vs-context-menu li').on("click", function () {
                    //alert($('.selectmngr').val());
                  //  thevalue = $('.selectmngr');
                    //previousele = $('.selectmngr').find('.positionTm');
                    var assignPoes = new Requests.AssignPoe();
                    var text = $(this).text();
                    var userid = thevalue.attr("data-value");
                    var poename = thevalue.attr("name");
                    var poeselected = $('#selectedpoe').text();
                    var jobtitle = "";
                    switch ($(this).val()) {
                        case 1:
                            jobtitle = "Team Member";
                            break;
                        case 2:
                            jobtitle = "Manager";
                            break;
                        case 3:
                            jobtitle = "Skiplevel Manager";
                            break;
                        case 5:
                            jobtitle = "Peer";
                            break;
                        case 6:
                            jobtitle = "Customers & Partner";
                            break;
                        default:
                            jobtitle = "Manager";
                            break;
                    }
                   // debugger;
                    assignPoe = removeValue(assignPoe, userid);
                    if ($(this).val() != 0) {
                        if (thevalue.val() != $(this).val()) {
                            previousele.text(text);
                            assignPoes.UserId = userid;
                            assignPoes.designationId = $(this).val();
                            assignPoes.Jobtitle = jobtitle;
                            assignPoes.EmailId = thevalue.attr("data-mail");
                            assignPoe.push(assignPoes);
                        } else if (poename != poeselected) {
                            previousele.text(text);
                            assignPoes.UserId = userid;
                            assignPoes.designationId = $(this).val();
                            assignPoes.Jobtitle = jobtitle;
                            assignPoe.push(assignPoes);
                        } else {
                            alert("This member is already add as an " + text);
                        }
                    }
                    else {
                        previousele.text('');
                    }

                    $('.vs-context-menu').hide();
                });
                $('#assignPoe').live('click', function () {
                    // alert(assignPoe.length);
                    if (assignPoe.length != 0) {
                        Common.ajaxPost({
                            url: '/Feedback/Assignpoe',
                            data: assignPoe,
                            success: function () {
                                $(this).addClass('selecpoe');
                                $('#networkpopup,.poepopupbg,#dragassignpoe').fadeOut("slow");
                                $(".popupbg,.popup, #dragassignpoe").hide();
                                assignPoe.length = 0;
                                $('#masterMsgCont').text("Selected Users assign successfully");
                                $('#overallCont').show();
                                //$('#infos').html('Selected Users assign successfully');
                                //$(".popupbg,.popup").show();
                                network.loadData();
                            },
                            error: function () {
                            }
                        });
                    } else {
                        $('#masterMsgCont').text("Select users for \nassign");
                        $('#overallCont').show();
                        //alert("Select users for \nassign");
                    }
                });

                /////

            }
        });
    },
    loadClickEvent: function () {
    },
    //Load All members and Count
    loadAllMembersData: function () {
        Common.ajax({
            url: '../../Common/GetMyFullNetwork',
            success: function (response) {
                var html = '';
                var slidehtml = '';
                var licount = 8;
                var count = response.length / licount;
                var count1 = Math.ceil(count);

                $('#nwpagecount').val(count1);
                for (var k = 0; k < count1; k++) {
                    html = html + "<ul id='netAll" + k + "'" + ((k==0) ? 'class=\'activeslide\'' : '')+">";
                    var frststcolTest = '';
                    var scndcolTest = '';
                    var frstcoldes = 0;
                    var scndcoldes = 0;
                    var fhtml = '';
                    var shtml = '';
                    for (var j = 0; j < licount / 2; j++) {
                        var i = ((k * licount) + j);
                        var o = ((k * licount) + j) + (licount / 2);
                        if (response[i] != null) {
                            if (response[i].Designation.Level != frstcoldes) {
                                frstcoldes = response[i].Designation.Level;
                                if (response[i].Designation.Level != 1) {
                                    frststcolTest = "<li class='spclnet'>" + response[i].Designation.Name+'s' + "</li>";
                                } else {
                                    frststcolTest = "<li class='spclnet'>Team Members</li>";
                                }
                            } else {
                                frststcolTest = '';
                            }
                            var classtxt = '';
                            var d = response[i].Designation.Level;
                            var datavalues = '';
                            switch (d) {
                                case 1:
                                    classtxt = 'netteam';
                                    datavalues = "data-tid=" + response[i].UserPOEMappingId;
                                    break;
                                case 2:
                                    classtxt = 'netmgr';
                                    datavalues = "data-mgrid=" + response[i].UserPOEMappingId;
                                    break;
                                case 3:
                                    classtxt = 'netmgr';
                                    datavalues = "data-mgrid=" + response[i].UserPOEMappingId;
                                    break;
                                case 4:
                                    classtxt = 'netpeer';
                                    datavalues = "data-tid=" + response[i].UserPOEMappingId + " data-mgrid=" + response[i].SecondaryUserPOEMappingId;

                                    break;
                                case 5:
                                    classtxt = 'netpeer';
                                    datavalues = "data-tid=" + response[i].UserPOEMappingId + " data-mgrid=" + response[i].SecondaryUserPOEMappingId;

                                    break;
                                case 6:
                                    classtxt = 'netcust';
                                    datavalues = "data-mgrid=" + response[i].UserPOEMappingId;
                                    break;
                                default:
                                    classtxt = '';
                                    datavalues = '';
                                    break;
                            }

                            fhtml = fhtml + frststcolTest + "<li class='" + classtxt + "' " + datavalues + " data-email=" + response[i].User.EmailAddress + ">" +
                                "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                                "<div class='ntwrktext'>" +
                                "<p> " + response[i].User.FirstName + " " + response[i].User.LastName + "</p>" +
                                "<p> " + response[i].User.EmailAddress + "</p>" +
                                "<p> " + response[i].JobTitle + "</p>" +
                                "<p> Country: " + response[i].User.Country.Name + "</p>" +
                                "</div> " +
                                "</li>";
                        } else {
                            if (j == 0) {
                                fhtml = fhtml + "<li class='spclnet'></li>";
                            }
                            fhtml = fhtml + "<li class='nonselect'></li>";
                        }
                        if (response[o] != null) {
                            if (response[o].Designation.Level != scndcoldes) {
                                scndcoldes = response[o].Designation.Level;
                                scndcolTest = "<li class='spclnet'>" + ((response[o].Designation.Name !="Team Member")? response[o].Designation.Name + 's' : "Team Members") + "</li>";
                            } else {
                                scndcolTest = '';
                            }
                            var classtxt = '';
                            var d = response[o].Designation.Level;
                            var datavalues = '';
                            switch (d) {
                                case 1:
                                    classtxt = 'netteam';
                                    datavalues = "data-tid=" + response[o].UserPOEMappingId;
                                    break;
                                case 2:
                                    classtxt = 'netmgr';
                                    datavalues = "data-mgrid=" + response[o].UserPOEMappingId;
                                    break;
                                case 3:
                                    classtxt = 'netmgr';
                                    datavalues = "data-mgrid=" + response[o].UserPOEMappingId;
                                    break;
                                case 4:
                                    classtxt = 'netpeer';
                                    datavalues = "data-tid=" + response[o].UserPOEMappingId + " data-mgrid=" + response[o].SecondaryUserPOEMappingId;

                                    break;
                                case 5:
                                    classtxt = 'netpeer';
                                    datavalues = "data-tid=" + response[o].UserPOEMappingId + " data-mgrid=" + response[o].SecondaryUserPOEMappingId;

                                    break;
                                case 6:
                                    classtxt = 'netcust';
                                    datavalues = "data-mgrid=" + response[o].UserPOEMappingId;
                                    break;
                                default:
                                    classtxt = '';
                                    datavalues = '';
                                    break;
                            }
                            shtml = shtml + scndcolTest + "<li class='" + classtxt + "' " + datavalues + " data-email=" + response[o].User.EmailAddress + ">" +
                              "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[o].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                                "<div class='ntwrktext'>" +
                                "<p> " + response[o].User.FirstName + " " + response[o].User.LastName + "</p>" +
                                "<p> " + response[o].User.EmailAddress + "</p>" +
                                "<p> " + response[o].JobTitle + "</p>" +
                                "<p> Country: " + response[o].User.Country.Name + "</p>" +
                                "</div> " +
                                "</li>";
                        } else {
                            if (j == 0) {
                                shtml = shtml + "<li class='spclnet'></li>";
                            }
                            shtml = shtml + "<li class='nonselect'></li>";
                        }
                    }
                    html = html + "<div class='coltwo'>" + fhtml + "</div>" + "<div class='coltwo'>" + shtml + "</div></ul>";
                    if (k != count1 - 1) {
                        slidehtml = slidehtml + "<div class='nxtfb' id='nxtnetAll" + k + "' data-value=" + k + "></div><div class='prevfb' id='prvnetAll" + k + "' data-value=" + k + "></div>";
                    }
                }

                if (response.length == 0) {
                    Common.ajaxsync({
                        url: '/Common/AssignPoeAndYammerBind',
                        success: function (responses) {
                            if (responses != null && responses.Yammer == true && responses.Mapping == false) {
                                html = "<div class='networkholder'><ul><li class='rect' id='assignPersonAllMngr'> <div class='img'> <img src='../../Images/icons/add-user_ico.png' /></div> <p> Add a new member to your network and assign a REP </p> </li> </ul> </div>";
                            } else if (responses != null && responses.IsSub == true || responses != null && responses.SubId == -1) {
                                html = "<div class='networkholder'><ul> <li class='rect' id='assignpoeAllNetwork'> <div class='img'> <img src='../../Images/icons/add-user_ico.png' /></div> <p> Assign this REP to a Member</p> </li> <li class='rect' id='assignPersonAllMngr'> <div class='img'> <img src='../../Images/icons/add-user_ico.png' /></div> <p> Add a new member to your network and assign this REP</p> </li> </ul> </div>";
                            }
                        },
                        error: function (err) {
                        }
                    });
                }
                $('#sliderbtn').append("<div id='slideall' class='sliderdiv'>" + slidehtml + "</div>");
                if (count1 > 1) {
                    $('#sliderbtn').show();
                    $('#pagetxt').html('Page 1 of ' + count1);
                } else {
                    $('#pagetxt').html('');
                    $('#sliderbtn').hide();
                }
                network.hideandShowSlideButton(count1, 'videoimg', 'slideall', count1);
                //html = html + "<div id='paging'></div>";
                $('#yourNetworkContent').html(html);
                $('#pagingNetwork').html((((response.length / licount) > 1) ? network.getPaginationhtml((response.length / licount), 'your_network') : ""));
                network.getpaginationcontrols();
                $('#noOfMembers').html(response.length);
                $('#nwcount').html(response.length);
                $('#yourNetworkContent').css('width', count1 * 120 + '%');
                $('#yourNetworkContent ul').css('width', 100 / count1 + '%');
                $('#assignpoeAllNetwork').click(function () {
                    //var subid = $('#Subid').val();
                    //if (subid != -1) {
                        $('#assignpoePopup, #dragassignpoe').show();
                        $('.popupbg').show();
                        $(this).addClass('selecpoe');
                        $('#assignpoePopup').show();
                        $('#networkpopup,.poepopupbg').fadeIn("slow");
                        network.LoadPopupdata();
                    //} else {
                    //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
                    //    loadOwnNetwork("assignPersonAllMngr", 2);
                    //}
                });
                $('#yourPeerContent li').click(function () {
                    $(this).toggleClass('selectmngr');
                });
                $('#assignPersonAllMngr').live('click', function () {
                    //var subid = $('#Subid').val();
                    //if (subid != -1) {
                        window.location.href = '/Signup/Add/Manager';
                    //} else {
                    //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
                    //    loadOwnNetwork("assignPersonAllMngr", 1);
                    //}
                });
                for (var l = 0; l < count1; l++) {
                    $('#nxtnetAll' + l).hide();
                    $('#prvnetAll' + l).hide();
                }

                $('#nxtnetAll0').show();
                for (var l = 0; l < count1; l++) {
                    $('#nxtnetAll' + l).click(function () {
                        var id = parseInt(this.id.replace('nxtnetAll', ''));
                        $('#netAll' + (id)).animate({ 'margin-left': '-100%' }, { duration: 400 });
                        $(this).hide();
                        $('#prvnetAll' + (id - 1)).hide();
                        $('#prvnetAll' + id).show();
                        $('#nxtnetAll' + (id + 1)).show();
                        $('#pagetxt').html('Page ' + (id + 2) + ' of ' + count1);
                        $('#nwcurpage').val((id + 2));
                    });

                    $('#prvnetAll' + l).click(function () {
                        var id = parseInt(this.id.replace('prvnetAll', ''));
                        $('#netAll' + (id)).animate({ 'margin-left': '0%' }, { duration: 400 });
                        $(this).hide();
                        $('#nxtnetAll' + (id + 1)).hide();
                        $('#prvnetAll' + (id - 1)).show();
                        $('#nxtnetAll' + id).show();
                        $('#pagetxt').html('Page ' + (id + 1) + ' of ' + count1);
                        $('#nwcurpage').val((id + 1));
                    });
                }
                network.loadcnt += 1;
                
                if (network.loadcnt == 5)
                {                 
                    network.getpaginationcontrols();
                }
            },
            error: function (err) {
            }
        });
    },
    //Load Managers
    loadManagerData: function () {
        Common.ajax({
            url: '../../Common/GetMyManager',
            success: function (response) {
                var html = '';
                var slidehtml = '';
                var licount = 8;
                var count = response.length / licount;
                var count1 = Math.ceil(count);
                $('#mgrpagecount').val(count1);
                for (var k = 0; k < count1; k++) {
                    html = html + "<ul id='netManager" + k + "' style='width:" + 100 / count1 + '%' +  "'" + ((k == 0) ? 'class=\'activeslide\'' : '') + "'>";
                    //"<ul id='netAll" + k + "'" + ((k == 0) ? 'class=\'activeslide\'' : '') + ">"
                    var frststcolTest = '';
                    var scndcolTest = '';
                    var frstcoldes = 0;
                    var scndcoldes = 0;
                    var fhtml = '';
                    var shtml = '';
                    for (var j = 0; j < licount / 2; j++) {
                        var i = ((k * licount) + j);
                        var o = ((k * licount) + j) + (licount / 2);
                        if (response[i] != null) {
                            if (response[i].Designation.Level != frstcoldes) {
                                frstcoldes = response[i].Designation.Level;
                                frststcolTest = "<li class='spclnet'>" + response[i].Designation.Name + "</li>";
                            } else {
                                frststcolTest = '';
                            }

                            fhtml = fhtml + frststcolTest + "<li class='netmgr'  value=" + response[i].UserPOEMappingId + " data-email=" + response[i].User.EmailAddress + ">" +
                                "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                                "<div class='ntwrktext'>" +
                                "<p> " + response[i].User.FirstName + " " + response[i].User.LastName + "</p>" +
                                "<p> " + response[i].User.EmailAddress + "</p>" +
                                "<p> " + response[i].JobTitle + "</p>" +
                                "<p> Country: " + response[i].User.Country.Name + "</p>" +
                                "</div> " +
                                "</li>";
                        } else {
                            if (j == 0) {
                                fhtml = fhtml + "<li class='spclnet'></li>";
                            }
                            fhtml = fhtml + "<li class='nonselect'></li>";
                        }
                        if (response[o] != null) {
                            if (response[o].Designation.Level != scndcoldes) {
                                scndcoldes = response[o].Designation.Level;
                                scndcolTest = "<li class='spclnet'>" + response[o].Designation.Name + "</li>";
                            } else {
                                scndcolTest = '';
                            }
                            shtml = shtml + scndcolTest + "<li class='netmgr'  value=" + response[o].UserPOEMappingId + " data-email=" + response[o].User.EmailAddress + ">" +
                                "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[o].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                                "<div class='ntwrktext'>" +
                                "<p> " + response[o].User.FirstName + " " + response[o].User.LastName + "</p>" +
                                "<p> " + response[o].User.EmailAddress + "</p>" +
                                "<p> " + response[o].JobTitle + "</p>" +
                                "<p> Country: " + response[o].User.Country.Name + "</p>" +
                                "</div> " +
                                "</li>";
                        } else {
                            if (j == 0) {
                                shtml = shtml + "<li class='spclnet'></li>";
                            }
                            shtml = shtml + "<li class='nonselect'></li>";
                        }
                    }
                    html = html + "<div class='coltwo'>" + fhtml + "</div>" + "<div class='coltwo'>" + shtml + "</div></ul>";
                    if (k != count1 - 1) {
                        slidehtml = slidehtml + "<div class='nxtfb' id='nxtnetManager" + k + "' data-value=" + k + "></div><div class='prevfb' id='prvnetManager" + k + "' data-value=" + k + "></div>";
                    }
                }

                if (response.length == 0) {
                    //Common.ajaxsync({
                    //    url: '/Common/AssignPoeAndYammerBind',
                    //    success: function (responses) {
                    //        if (responses != null && responses.Yammer == true && responses.Mapping == false) {
                    //            $('.assignhide').hide();
                    //            html = "<div class='networkholder'><ul><li class='rect' id='assignPersonMngr'> <div class='img'> <img src='../../Images/icons/add-user_ico.png' /></div> <p> Add a new member to your network and assign a REP </p> </li> </ul> </div>";
                    //        } else if (responses != null && responses.IsSub == true || responses != null && responses.SubId == -1) {
                    //            html = "<div class='networkholder'><ul> <li class='rect' id='assignpoeManager'> <div class='img'> <img src='../../Images/icons/add-user_ico.png' /></div> <p> Assign this REP to a Member</p> </li> <li class='rect' id='assignPersonMngr'> <div class='img'> <img src='../../Images/icons/add-user_ico.png' /></div> <p> Add a new member to your network and assign this REP</p> </li> </ul> </div>";
                    //        }
                    //    },
                    //    error: function (err) {
                    //    }
                    //});
                    //var emptyHtml = "";
                    html = '<div class="coltwo">';
                    for (var i = 0; i < 8; i++) {
                        
                        html = html + "<li class='nonselect'></li>";
                        if (i == 3) {
                            html = html + "</div><div class='coltwo'>";
                        }
                    }
                    html = html + "</div>";

                }
                $('#sliderbtn').append("<div id='slidemgr' class='sliderdiv'>" + slidehtml + "</div>");
                //$('#slidemgr').hide();
                network.hideandShowSlideButton(count1, 'mngrTile', 'slidemgr', count1);
                $('#yourManagerContent').html(html);
                $('#pagingManager').html((((response.length / licount) > 1) ? network.getPaginationhtml((response.length / licount), 'your_manager') : ""));
                network.getpaginationcontrols();
                $('#yourManagerContent').css('width', count1 * 120 + '%');
                $('#assignpoeManager').click(function () {
                    //var subid = $('#Subid').val();
                    //if (subid != -1) {
                        $('#assignpoePopup, #dragassignpoe').show();
                        $('.popupbg').show();
                        $(this).addClass('selecpoe');
                        $('#networkpopup,.poepopupbg').fadeIn("slow");
                        network.LoadPopupdata();
                    //} else {
                    //    loadOwnNetwork("assignPersonAllMngr", 2);
                    //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
                    //}
                });
                $('#assignPersonMngr').live('click', function () {
                    //var subid = $('#Subid').val();
                    //if (subid != -1) {
                        window.location.href = '/Signup/Add/Manager';
                    //} else {
                    //    loadOwnNetwork("Manager", 1);
                    //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
                    //}
                });

                for (var l = 0; l < count1; l++) {
                    $('#nxtnetManager' + l).hide();
                    $('#prvnetManager' + l).hide();
                }

                $('#nxtnetManager0').show();

                for (var l = 0; l < count1; l++) {
                    $('#nxtnetManager' + l).click(function () {
                        var id = parseInt(this.id.replace('nxtnetManager', ''));
                        $('#netManager' + (id)).animate({ 'margin-left': '-100%' }, { duration: 400 });
                        $(this).hide();
                        $('#prvnetManager' + (id - 1)).hide();
                        $('#prvnetManager' + id).show();
                        $('#nxtnetManager' + (id + 1)).show();
                        $('#pagetxt').html('Page ' + (id + 2) + ' of ' + count1);
                        $('#mgrcurpage').val((id + 2));
                    });

                    $('#prvnetManager' + l).click(function () {
                        var id = parseInt(this.id.replace('prvnetManager', ''));
                        $('#netManager' + (id)).animate({ 'margin-left': '0%' }, { duration: 400 });
                        $(this).hide();
                        $('#nxtnetManager' + (id + 1)).hide();
                        $('#prvnetManager' + (id - 1)).show();
                        $('#nxtnetManager' + id).show();
                        $('#pagetxt').html('Page ' + (id + 1) + ' of ' + count1);
                        $('#mgrcurpage').val((id + 1));
                    });
                }
                network.loadcnt += 1;
                
                if (network.loadcnt == 5) {
                    network.getpaginationcontrols();
                }
            },
            error: function (err) {
            }
        });
    },
    //Load Team members
    loadTeamMemberData: function () {
        Common.ajax({
            url: '../../Common/GetTeammembers',
            success: function (response) {
                var html = '';
                var slidehtml = '';
                var licount = 8;
                var count = response.length / licount;
                var count1 = Math.ceil(count);
                $('#tmpagecount').val(count1);
                for (var k = 0; k < count1; k++) {
                    html = html + "<ul id='netTeam" + k + "' style='width:" + 100 / count1 + '%' + "' " + ((k == 0) ? 'class=\'activeslide\'' : '') + " ' >";
                    var frststcolTest = '';
                    var scndcolTest = '';
                    var frstcoldes = 0;
                    var scndcoldes = 0;
                    var fhtml = '';
                    var shtml = '';
                    for (var j = 0; j < licount / 2; j++) {
                        var i = ((k * licount) + j);
                        var o = ((k * licount) + j) + (licount / 2);
                        if (response[i] != null) {
                            fhtml = fhtml + frststcolTest + "<li class='netteam'  value=" + response[i].UserPOEMappingId + " data-email=" + response[i].User.EmailAddress + ">" +
                                "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                                "<div class='ntwrktext'>" +
                                "<p> " + response[i].User.FirstName + " " + response[i].User.LastName + "</p>" +
                                "<p> " + response[i].User.EmailAddress + "</p>" +
                                "<p> " + response[i].JobTitle + "</p>" +
                                "<p> Country: " + response[i].User.Country.Name + "</p>" +
                                "</div> " +
                                "</li>";
                        } else {
                            fhtml = fhtml + "<li class='nonselect'></li>";
                        }
                        if (response[o] != null) {
                            shtml = shtml + scndcolTest + "<li class='netteam'  value=" + response[o].UserPOEMappingId + " data-email=" + response[o].User.EmailAddress + ">" +
                                "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[o].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                                "<div class='ntwrktext'>" +
                                "<p> " + response[o].User.FirstName + " " + response[o].User.LastName + "</p>" +
                                "<p> " + response[o].User.EmailAddress + "</p>" +
                                "<p> " + response[o].JobTitle + "</p>" +
                                "<p> Country: " + response[o].User.Country.Name + "</p>" +
                                "</div> " +
                                "</li>";
                        } else {
                            shtml = shtml + "<li class='nonselect'></li>";
                        }
                    }
                    html = html + "<div class='coltwo'>" + fhtml + "</div>" + "<div class='coltwo'>" + shtml + "</div></ul>";
                    if (k != count1 - 1) {
                        slidehtml = slidehtml + "<div class='nxtfb' id='nxtnetTeam" + k + "' data-value=" + k + "></div><div class='prevfb' id='prvnetTeam" + k + "' data-value=" + k + "></div>";
                    }
                }
                if (response.length == 0) {
                    //Common.ajaxsync({
                    //    url: '/Common/AssignPoeAndYammerBind',
                    //    success: function (responses) {
                    //        if (responses != null && responses.Yammer == true && responses.Mapping == false) {
                    //            $('.assignhide').hide();
                    //            html = "<div class='networkholder'><ul><li class='rect' id='assignPersonTm'> <div class='img'> <img src='../../Images/icons/add-user_ico.png' /></div> <p> Add a new member to your network and assign a REP </p> </li> </ul> </div>";
                    //        } else if (responses != null && responses.IsSub == true || responses != null && responses.SubId == -1) {
                    //            html = "<div class='networkholder'><ul> <li class='rect' id='assignpoeTeam'> <div class='img'> <img src='../../Images/icons/add-user_ico.png' /></div> <p> Assign this REP to a Member</p> </li> <li class='rect' id='assignPersonTm'> <div class='img'> <img src='../../Images/icons/add-user_ico.png' /></div> <p> Add a new member to your network and assign this REP</p> </li> </ul> </div>";
                    //        }
                    //    },
                    //    error: function (err) {
                    //    }
                    //});
                    html = '<div class="coltwo">';
                    for (var i = 0; i < 8; i++) {

                        html = html + "<li class='nonselect'></li>";
                        if (i == 3) {
                            html = html + "</div><div class='coltwo'>";
                        }
                    }
                    html = html + "</div>";

                }
                $('#sliderbtn').append("<div id='slideteam' class='sliderdiv'>" + slidehtml + "</div>");
                //$('#slideteam').hide();
                network.hideandShowSlideButton(count1, 'teamTile', 'slideteam', count1);

                //html = html + '<div id="pagingTeam"></div>';
                $('#yourTeamContent').html(html);
                $('#pagingTeam').html((((response.length / licount) > 1) ? network.getPaginationhtml((response.length / licount), 'your_team') : ""));
                network.getpaginationcontrols();
                $('#yourTeamContent').css('width', count1 * 120 + '%');
                network.loadmenuevents();
                $('#assignpoeTeam').click(function () {
                    //var subid = $('#Subid').val();
                    //if (subid != -1) {
                        $('.popupbg').show();
                        $('#assignpoePopup, #dragassignpoe').show();
                        $(this).addClass('selecpoe');
                        $('#networkpopup,.poepopupbg').fadeIn("slow");
                        network.LoadPopupdata();
                    //} else {
                    //    loadOwnNetwork("assignPersonMngr", 2);
                    //    // $('#ChooseNetwork,.popupbg').fadeIn("slow");
                    //}
                });
                $('#assignPersonTm').live('click', function () {
                    //var subid = $('#Subid').val();
                    //if (subid != -1) {
                        window.location.href = '/Signup/Add/Team';
                    //} else {
                    //    loadOwnNetwork("Team", 1);
                    //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
                    //}
                });
                for (var l = 0; l < count1; l++) {
                    $('#nxtnetTeam' + l).hide();
                    $('#prvnetTeam' + l).hide();
                }
                $('#nxtnetTeam0').show();

                for (var l = 0; l < count1; l++) {
                    $('#nxtnetTeam' + l).click(function () {
                        var id = parseInt(this.id.replace('nxtnetTeam', ''));
                        $('#netTeam' + (id)).animate({ 'margin-left': '-100%' }, { duration: 400 });
                        $(this).hide();
                        $('#prvnetTeam' + (id - 1)).hide();
                        $('#prvnetTeam' + id).show();
                        $('#nxtnetTeam' + (id + 1)).show();
                        $('#pagetxt').html('Page ' + (id + 2) + ' of ' + count1);
                        $('#tmcurpage').val((id + 2));
                    });

                    $('#prvnetTeam' + l).click(function () {
                        var id = parseInt(this.id.replace('prvnetTeam', ''));
                        $('#netTeam' + (id)).animate({ 'margin-left': '0%' }, { duration: 400 });
                        $(this).hide();
                        $('#nxtnetTeam' + (id + 1)).hide();
                        $('#prvnetTeam' + (id - 1)).show();
                        $('#nxtnetTeam' + id).show();
                        $('#pagetxt').html('Page ' + (id + 1) + ' of ' + count1);
                        $('#tmcurpage').val((id + 1));
                    });
                }
                network.loadcnt += 1;
                
                if (network.loadcnt == 5) {
                    network.getpaginationcontrols();
                }
            },
            error: function (err) {
            }
        });
    },
    //Load Peers
    loadPeerData: function () {
        Common.ajax({
            url: '../../Common/GetMyPeers',
            success: function (response) {
                var html = '';
                var slidehtml = '';
                var licount = 8;
                var count = response.length / licount;
                var count1 = Math.ceil(count);
                $('#peerpagecount').val(count1);
                for (var k = 0; k < count1; k++) {
                    html = html + "<ul id='netpeer" + k + "' style='width:" + 100 / count1 + '%' + "'>";
                    var frststcolTest = '';
                    var scndcolTest = '';
                    var frstcoldes = 0;
                    var scndcoldes = 0;
                    var fhtml = '';
                    var shtml = '';
                    for (var j = 0; j < licount / 2; j++) {
                        var i = ((k * licount) + j);
                        var o = ((k * licount) + j) + (licount / 2);
                        if (response[i] != null) {
                            fhtml = fhtml + frststcolTest + "<li class='netpeer'  value=" + response[i].UserPOEMappingId + " data-mgrid=" + response[i].SecondaryUserPOEMappingId + " data-email=" + response[i].User.EmailAddress + ">" +
                                "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                                "<div class='ntwrktext'>" +
                                "<p> " + response[i].User.FirstName + " " + response[i].User.LastName + "</p>" +
                                "<p> " + response[i].User.EmailAddress + "</p>" +
                                "<p> " + response[i].JobTitle + "</p>" +
                                "<p> Country: " + response[i].User.Country.Name + "</p>" +
                                "</div> " +
                                "</li>";
                        } else {
                            fhtml = fhtml + "<li class='nonselect'></li>";
                        }
                        if (response[o] != null) {
                            shtml = shtml + scndcolTest + "<li class='netpeer'  value=" + response[o].UserPOEMappingId + " data-mgrid=" + response[o].SecondaryUserPOEMappingId + " data-email=" + response[o].User.EmailAddress + ">" +
                                 "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[o].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                                "<div class='ntwrktext'>" +
                                "<p> " + response[o].User.FirstName + " " + response[o].User.LastName + "</p>" +
                                "<p> " + response[o].User.EmailAddress + "</p>" +
                                "<p> " + response[o].JobTitle + "</p>" +
                                "<p> Country: " + response[o].User.Country.Name + "</p>" +
                                "</div> " +
                                "</li>";
                        } else {
                            shtml = shtml + "<li class='nonselect'></li>";
                        }
                    }
                    html = html + "<div class='coltwo'>" + fhtml + "</div>" + "<div class='coltwo'>" + shtml + "</div></ul>";
                    if (k != count1 - 1) {
                        slidehtml = slidehtml + "<div class='nxtfb' id='nxtnetpeer" + k + "' data-value=" + k + "></div><div class='prevfb' id='prvnetpeer" + k + "' data-value=" + k + "></div>";
                    }
                }

                if (response.length == 0) {
                    Common.ajaxsync({
                        url: '/Common/AssignPoeAndYammerBind',
                        success: function (responses) {
                            if (responses != null && responses.Yammer == true && responses.Mapping == false) {
                                $('.assignhide').hide();
                                html = "<div class='networkholder'> <ul> <li class='rect' id='assignPersonPeer'> <div class='img'> <img src='../../Images/icons/add-user_ico.png' /></div> <p> Add a new member to your network and assign a REP </p> </li> </ul> </div>";
                            } else if (responses != null && responses.IsSub == true || responses != null && responses.SubId == -1) {
                                html = "<div class='networkholder'> <ul> <li class='rect' id='assignpoePeer'> <div class='img'> <img src='../../Images/icons/add-user_ico.png' /></div> <p> Assign this REP to a Member</p> </li> <li class='rect' id='assignPersonPeer'> <div class='img'> <img src='../../Images/icons/add-user_ico.png' /></div> <p> Add a new member to your network and assign this REP</p> </li> </ul> </div>";
                            }
                        },
                        error: function (err) {
                        }
                    });
                }

                $('#sliderbtn').append("<div id='slidepeer' class='sliderdiv'>" + slidehtml + "</div>");
                //$('#slidepeer').hide();
                network.hideandShowSlideButton(count1, 'peerTile', 'slidepeer', count1);
                $('#yourPeerContent').html(html);
                $('#pagingPeer').html((((response.length / licount) > 1) ? network.getPaginationhtml((response.length / licount), 'your_peers') : ""));
                network.getpaginationcontrols();
                $('#yourPeerContent').css('width', count1 * 120 + '%');
                network.loadmenuevents();
                $('#assignpoePeer').live('click', function () {
                    //debugger;
                    //var subid = $('#Subid').val();
                    //if (subid != -1) {
                        $('.popupbg').show();
                        $('#assignpoePopup, #dragassignpoe').show();
                        $(this).addClass('selecpoe');
                        $('#networkpopup,.poepopupbg').fadeIn("slow");
                        network.LoadPopupdata();
                    //} else {
                    //    loadOwnNetwork("assignPersonTm", 2);
                    //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
                    //}
                });
                $('#assignPersonPeer').live('click', function () {
                    //var subid = $('#Subid').val();
                    //if (subid != -1) {
                        window.location.href = '/Signup/Add/Peer';
                    //} else {
                    //    loadOwnNetwork("Peer", 1);
                    //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
                    //}
                });
                for (var l = 0; l < count1; l++) {
                    $('#nxtnetpeer' + l).hide();
                    $('#prvnetpeer' + l).hide();
                }
                $('#nxtnetpeer0').show();

                for (var l = 0; l < count1; l++) {
                    $('#nxtnetpeer' + l).click(function () {
                        var id = parseInt(this.id.replace('nxtnetpeer', ''));
                        $('#netpeer' + (id)).animate({ 'margin-left': '-100%' }, { duration: 400 });
                        $(this).hide();
                        $('#prvnetpeer' + (id - 1)).hide();
                        $('#prvnetpeer' + id).show();
                        $('#nxtnetpeer' + (id + 1)).show();
                        $('#pagetxt').html('Page ' + (id + 2) + ' of ' + count1);
                        $('#peercurpage').val((id + 2));
                    });

                    $('#prvnetpeer' + l).click(function () {
                        var id = parseInt(this.id.replace('prvnetpeer', ''));
                        $('#netpeer' + (id)).animate({ 'margin-left': '0%' }, { duration: 400 });
                        $(this).hide();
                        $('#nxtnetpeer' + (id + 1)).hide();
                        $('#prvnetpeer' + (id - 1)).show();
                        $('#nxtnetpeer' + id).show();
                        $('#pagetxt').html('Page ' + (id + 1) + ' of ' + count1);
                        $('#peercurpage').val((id + 1));
                    });
                }
                network.loadcnt += 1;
                
                if (network.loadcnt == 5) {
                    network.getpaginationcontrols();
                }
            },
            error: function (err) {
            }
        });
    },
    //LoadyammerData
    loadYammerdata: function () {
        $("#status").fadeIn();
        $("#preloader").delay(100).fadeIn("slow");
        var id = LoadYammerGroupMemebers();
        if (id != 0 && id != 1) {
            var url = '../../Yammer/GetYammerGroup?ids=' + id;
            loadyammerContent(url);
        } else if (id == 1) {
            var url = '../../Yammer/GetYammerUsersList';
            loadyammerContent(url);
        } else {
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
        }
    },
    //Load Customers
    loadCustomerData: function () {
        Common.ajax({
            url: '../../Common/GetMyCustomers',
            success: function (response) {
                var html = '';
                var slidehtml = '';
                var licount = 8;
                var count = response.length / licount;
                var count1 = Math.ceil(count);
                $('#custpagecount').val(count1);
                for (var k = 0; k < count1; k++) {
                    html = html + "<ul id='netcust" + k + "'  style='width:" + 100 / count1 + '%' + "'>";
                    var frststcolTest = '';
                    var scndcolTest = '';
                    var frstcoldes = 0;
                    var scndcoldes = 0;
                    var fhtml = '';
                    var shtml = '';
                    for (var j = 0; j < licount / 2; j++) {
                        var i = ((k * licount) + j);
                        var o = ((k * licount) + j) + (licount / 2);
                        if (response[i] != null) {
                            fhtml = fhtml + frststcolTest + "<li class='netcust'  value=" + response[i].UserPOEMappingId + " data-email=" + response[i].User.EmailAddress + ">" +
                                "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[i].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                                "<div class='ntwrktext'>" +
                                "<p> " + response[i].User.FirstName + " " + response[i].User.LastName + "</p>" +
                                "<p> " + response[i].User.EmailAddress + "</p>" +
                                "<p> " + response[i].JobTitle + "</p>" +
                                "<p> Country: " + response[i].User.Country.Name + "</p>" +
                                "</div> " +
                                "</li>";
                        } else {
                            fhtml = fhtml + "<li class='nonselect'></li>";
                        }
                        if (response[o] != null) {
                            shtml = shtml + scndcolTest + "<li class='netcust'  value=" + response[o].UserPOEMappingId + " data-email=" + response[o].User.EmailAddress + ">" +
                                "<img src='/Uploadify/LoadImageHandler.ashx?id=" + response[o].User.UserId + "&rnd=" + Math.random() + "' width='61' height='61' alt='User' />" +
                                "<div class='ntwrktext'>" +
                                "<p> " + response[o].User.FirstName + " " + response[o].User.LastName + "</p>" +
                                "<p> " + response[o].User.EmailAddress + "</p>" +
                                "<p> " + response[o].JobTitle + "</p>" +
                                "<p> Country: " + response[o].User.Country.Name + "</p>" +
                                "</div> " +
                                "</li>";
                        } else {
                            shtml = shtml + "<li class='nonselect'></li>";
                        }
                    }
                    html = html + "<div class='coltwo'>" + fhtml + "</div>" + "<div class='coltwo'>" + shtml + "</div></ul>";
                    if (k != count1 - 1) {
                        slidehtml = slidehtml + "<div class='nxtfb' id='nxtnetcust" + k + "' data-value=" + k + "></div><div class='prevfb' id='prvnetcust" + k + "' data-value=" + k + "></div>";
                    }
                }

                if (response.length == 0) {
                    Common.ajaxsync({
                        url: '/Common/AssignPoeAndYammerBind',
                        success: function (responses) {
                            if (responses != null && responses.Yammer == true && responses.Mapping == false) {
                                $('.assignhide').hide();
                                html = "<div class='networkholder'><ul><li class='rect' id='assignPersonCust'> <div class='img'> <img src='../../Images/icons/add-user_ico.png' /></div> <p>Add a new member to your network and assign a REP </p> </li> </ul> </div>";
                            } else if (responses != null && responses.IsSub == true || responses != null && responses.SubId == -1) {
                                html = "<div class='networkholder'><ul> <li class='rect' id='assignpoeCust'> <div class='img'> <img src='../../Images/icons/add-user_ico.png' /></div> <p> Assign this REP to a Member</p> </li> <li class='rect' id='assignPersonCust'> <div class='img'> <img src='../../Images/icons/add-user_ico.png' /></div> <p> Add a new member to your network and assign this REP</p> </li> </ul> </div>";
                            }
                        },
                        error: function (err) {
                        }
                    });
                }

                $('#sliderbtn').append("<div id='slidecust' class='sliderdiv'>" + slidehtml + "</div>");
                //$('#slidecust').hide();
                network.hideandShowSlideButton(count1, 'custTile', 'slidecust', count1);
                var percentage = 100 / count1;
                $('#yourCustomerContent').html(html);
                $('#pagingCustomer').html((((response.length / licount) > 1) ? network.getPaginationhtml((response.length / licount), 'your_customer') : ""));
                network.getpaginationcontrols();
                $('#yourCustomerContent').css('width', count1 * 120 + '%');
                $('#assignpoeCust').click(function () {
                    //var subid = $('#Subid').val();
                    //if (subid != -1) {
                        $('#assignpoePopup, #dragassignpoe').show();
                        $(this).addClass('selecpoe');
                        $('.popupbg').show();
                        $('#networkpopup').show();
                        network.LoadPopupdata();
                    //} else {
                    //    loadOwnNetwork("assignPersonTm", 2);
                    //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
                    //}
                });

                $('#assignPersonCust').live('click', function () {
                    //var subid = $('#Subid').val();
                    //if (subid != -1) {
                        window.location.href = '/Signup/Add/Customer';
                    //} else {
                    //    loadOwnNetwork("Customer", 1);
                    //    //$('#ChooseNetwork,.popupbg').fadeIn("slow");
                    //}
                });

                for (var l = 0; l < count1; l++) {
                    $('#nxtnetcust' + l).hide();
                    $('#prvnetcust' + l).hide();
                }
                $('#nxtnetcust0').show();

                for (var l = 0; l < count1; l++) {
                    $('#nxtnetcust' + l).click(function () {
                        var id = parseInt(this.id.replace('nxtnetcust', ''));
                        $('#netcust' + (id)).animate({ 'margin-left': '-100%' }, { duration: 400 });
                        $(this).hide();
                        $('#prvnetcust' + (id - 1)).hide();
                        $('#prvnetcust' + id).show();
                        $('#nxtnetcust' + (id + 1)).show();
                        $('#pagetxt').html('Page ' + (id + 2) + ' of ' + count1);
                        $('#custcurpage').val((id + 2));
                    });

                    $('#prvnetcust' + l).click(function () {
                        var id = parseInt(this.id.replace('prvnetcust', ''));
                        $('#netcust' + (id)).animate({ 'margin-left': '0%' }, { duration: 400 });
                        $(this).hide();
                        $('#nxtnetcust' + (id + 1)).hide();
                        $('#prvnetcust' + (id - 1)).show();
                        $('#nxtnetcust' + id).show();
                        $('#pagetxt').html('Page ' + (id + 1) + ' of ' + count1);
                        $('#custcurpage').val((id + 1));
                    });
                }
                network.loadcnt += 1;
                
                if (network.loadcnt == 5) {
                    network.getpaginationcontrols();
                }
            },
            error: function (err) {
            }
        });
    },
    //Load My Data
    loadMyData: function () {
        var countries = network.loadCountries();

        $(countries).each(function () {
            $('#location').append("<option value='" + $(this).attr("Id") + "'>" + $(this).attr("Name") + "</option>");
        });

        Common.ajaxnocache({
            url: '../../Common/GetMyDetail',
            success: function (response) {
                if (response != null) {
                    $('#fname').val(response.User.FirstName);
                    $('#lname').val(response.User.LastName);
                    $('#mailid').val(response.User.EmailAddress);
                    $('#jobtitle').val(response.JobTitle);
                    $('#companyname').val(response.User.CompanyName);
                    $("#userimg").attr("src", "/Uploadify/LoadImageHandler.ashx?id=" + response.User.UserId + "&rnd=" + Math.random());
                    $("#yousmallimg").attr("src", "/Uploadify/LoadImageHandler.ashx?id=" + response.User.UserId + "&rnd=" + Math.random());
                    $("#cyouid").attr("src", "/Uploadify/LoadImageHandler.ashx?id=" + response.User.UserId + "&rnd=" + Math.random());
                    $("#myphoto").attr("src", "/Uploadify/LoadImageHandler.ashx?id=" + response.User.UserId + "&rnd=" + Math.random());
                    $('#location').val(response.User.Country.Id);
                    if (response.User.Area != null && response.User.Area.Id != 0) {
                        network.loadAreas();
                        $('#areaselect').val(response.User.Area.Id);
                        $('#areamode').show();
                    }
                }
                //Disable option
                $('#fname').attr('disabled', true);
                $('#lname').attr('disabled', true);
                $('#mailid').attr('disabled', true);
                $('#jobtitle').attr('disabled', true);
                $('#companyname').attr('disabled', true);
                $('#location').attr('disabled', true);
                $('#areaselect').attr('disabled', true);
                $('#btnProfUpdate').html("Edit Profile");
                //$('#btnloading').attr('disabled', true);
                $('#edited').attr("value", "False");
                $("#status").hide();
                $("#preloader").hide();
            },
            error: function (err) {
                // debugger;
            }
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
    loadAreas: function () {
        var returnValue = null;
        Common.ajaxsync({
            url: '../../Common/GetAllAreas',
            success: function (response) {
                $('#areaselect').html('');
                var html = "<option>--Select--</option>";
                for (var i = 0; i < response.length; i++) {
                    html = html + "<option value='" + response[i].Id + "'>" + response[i].Name + "</option>";
                }
                $('#areaselect').html(html);
            },
            error: function (err) {
            }
        });
    },
    //UpdateData
    loadEditBtnClick: function () {
        //alert($('#edited').val());
        if ($('#edited').val() == 'False') {
            $('#fname').attr('disabled', false);
            $('#lname').attr('disabled', false);
            $('#jobtitle').attr('disabled', false);
            $('#location').attr('disabled', false);
            $('#companyname').attr('disabled', false);
            //$('#btnloading').attr('disabled', false);
            $('#areaselect').attr('disabled', false);
            $('#btnProfUpdate').html("Save Profile");
            $('#edited').attr("value", "True");
        } else {
            network.updateMyData({ url: '/Common/UpdateUserDetails', data: { 'firstName': $('#fname').val(), 'lastName': $('#lname').val(), 'companyName': $('#companyname').val(), 'jobTitle': $('#jobtitle').val(), 'countryId': parseInt($('#location').val()), 'AreaId': parseInt($('#areaselect').val()) } });
            $('#loggedinUser').text($('#fname').val() + ' ' + $('#lname').val());
        }
    },
    IsOwnSubscribtion: function () {
        $('#sliderbtn').html('');
        Common.ajax({
            url: '../../Common/IsMyOwnSubscription',
            success: function (response) {
                if (response != false) {
                    $('#OwnSubStatusNetwork').val(1);
                }
            },
            error: function (err) {
            }
        });
        //return output;
    },
    updateMyData: function (option) {
        Common.ajax({
            url: option.url,
            data: option.data,
            success: function (response) {
                $('#masterMsgCont').text("Your profile has been<br/> updated successfully");
                $('#overallCont').show();
                //$('#infos').html(' Your profile has been<br/> updated successfully');
                //$(".popupbg,.popup").show();
                $('#btnProfUpdate').html("Edit Profile");
                $('#edited').attr("value", "False");
                $('#fname').attr('disabled', true);
                $('#lname').attr('disabled', true);
                $('#mailid').attr('disabled', true);
                $('#jobtitle').attr('disabled', true);
                $('#companyname').attr('disabled', true);
                $('#location').attr('disabled', true);
                $('#btnloading').attr('disabled', true);
                network.loadMyData();
            },
            error: function (err) {
                // debugger;
            }
        });
    },
    getPaginationhtml: function (count1, parentclassname) {
        var slidehtml = '';
        slidehtml += "<div class=\"paginationfb \" id=" + parentclassname + "><ul><li><span class=\"fristpage\"></span></li><li><span class=\"prepage\"></span></li>";
        for (var i = 0; i < count1; i++) {
            slidehtml += "<li class=\"pageno\"";
            if (i > 2) { slidehtml += "style='display:none;'"; }
            slidehtml += "><a href=\"#\"";
            if (i == 0) { slidehtml += "class=\"activeArrow\""; }

            slidehtml += ">" + (i + 1) + "</a></li>";
        }
        slidehtml += "<li><span class=\"nextpage\"></span></li><li><span class=\"lastpage\"></span></li></ul>";
        return slidehtml;
    },

    
    getpaginationcontrols: function () {
        $('.prepage').unbind('click');
        $('.nextpage').unbind('click');
        $('.fristpage').unbind('click');
        $('.lastpage').unbind('click');
        $('.pageno').unbind('click');

        $('.prepage').click(function () {
            var parentclass = $(this).parents().filter('.paginationfb').attr('id');
            var activeslide = $('.' + parentclass).find('.activeslide');
            var activeslideno = ($(activeslide).attr('id')).replace(/\D/g, '');
            activeslideno = parseInt(activeslideno) + 1;
            var activeslideid = $(activeslide).attr('id');
            if ($('#' + activeslideid).prev().length > 0) {
                $('#' + activeslideid).prev().animate({ 'margin-left': '0%' }, { duration: 400 });
                $(activeslide).removeClass('activeslide'); $(activeslide).prev().addClass('activeslide');
                $(this).parent().siblings().filter('.pageno').hide();
                $(this).parent().siblings().filter('.pageno').find('a').removeClass('activeArrow');
                $(this).parent().siblings().filter('.pageno').find('a').eq(parseInt(activeslideno) - 2).addClass('activeArrow');
                $(this).parent().siblings().filter('.pageno').slice(((parseInt(activeslideno) - 3) != -1) ? (parseInt(activeslideno) - 3) : (parseInt(activeslideno) - 2), (((parseInt(activeslideno) - 3) != -1) ? (parseInt(activeslideno) - 3) : (parseInt(activeslideno) - 2)) + 3).show();
            }
        });
        $('.nextpage').click(function () {
            var parentclass = $(this).parents().filter('.paginationfb').attr('id');
            var activeslide = $('.' + parentclass).find('.activeslide');
            var activeslideno = ($(activeslide).attr('id')).replace(/\D/g, '');
            activeslideno = parseInt(activeslideno) + 1;
            var activeslideid = $(activeslide).attr('id');
            var siblingscount = $(activeslide).siblings().length;
            var test = $('#' + activeslideid).next().length;
            if ($('#' + activeslideid).next().length > 0) {
                $('#' + activeslideid).animate({ 'margin-left': '-100%' }, { duration: 400 });
                $(this).parent().siblings().filter('.pageno').hide();
                $(this).parent().siblings().filter('.pageno').find('a').removeClass('activeArrow');
                $(this).parent().siblings().filter('.pageno').find('a').eq(activeslideno).addClass('activeArrow');
                $(this).parent().siblings().filter('.pageno').slice((activeslideno == siblingscount && (activeslideno - 2) != -1) ? (activeslideno - 2) : (activeslideno - 1), ((activeslideno == siblingscount && (activeslideno - 2) != -1) ? (activeslideno - 2) : parseInt(activeslideno - 1)) + 3).show();
                $(activeslide).removeClass('activeslide'); $(activeslide).next().addClass('activeslide');
            }
        });
        $('.fristpage').click(function () {
            var parentclass = $(this).parents().filter('.paginationfb').attr('id');
            var activeslide = $('.' + parentclass).find('.activeslide');
            var activeslideno = ($(activeslide).attr('id')).replace(/\D/g, '');
            var activeslidename = ($(activeslide).attr('id')).replace(new RegExp("[0-9]", "g"), "")
            $(activeslide).animate({ 'margin-left': '0%' }, { duration: 400 });
            $(activeslide).siblings().animate({ 'margin-left': '0%' }, { duration: 400 });
            $(this).parent().siblings().filter('.pageno').find('a').removeClass('activeArrow');
            $(this).parent().siblings().filter('.pageno').find('a').eq(0).addClass('activeArrow');
            $(activeslide).removeClass('activeslide'); $('#' + activeslidename + '0').addClass('activeslide');
            $(this).parent().siblings().filter('.pageno').hide(); $(this).parent().siblings().filter('.pageno').slice(0, 3).show();
        });
        $('.lastpage').click(function () {
            var parentclass = $(this).parents().filter('.paginationfb').attr('id');
            var activeslide = $('.' + parentclass).find('.activeslide');
            var activeslideno = ($(activeslide).attr('id')).replace(/\D/g, '');
            var activeslidename = ($(activeslide).attr('id')).replace(new RegExp("[0-9]", "g"), "");
            var siblingscount = $(activeslide).siblings().length;
            for (var i = 1; i < (siblingscount + 1) ; i++) {
                $('#' + activeslidename + (i-1)).animate({ 'margin-left': '-100%' }, { duration: 400 });
            }
            $(activeslide).removeClass('activeslide'); $('#' + activeslidename + siblingscount).addClass('activeslide');
            $(this).parent().siblings().filter('.pageno').hide();
            $(this).parent().siblings().filter('.pageno').find('a').removeClass('activeArrow');
            $(this).parent().siblings().filter('.pageno').find('a').eq(parseInt(siblingscount)).addClass('activeArrow');
            $(this).parent().siblings().filter('.pageno').slice(((parseInt(siblingscount) - 2) != -1) ? (parseInt(siblingscount) - 2) : (parseInt(siblingscount) - 1), (parseInt(siblingscount) - 2) + 3).show();
        });
        $('.pageno').click(function () {
            var parentclass = $(this).parents().filter('.paginationfb').attr('id');
            var activeslide = $('.' + parentclass).find('.activeslide');
            var activeslideno = ($(activeslide).attr('id')).replace(/\D/g, '');
            var activeslidename = ($(activeslide).attr('id')).replace(new RegExp("[0-9]", "g"), "");
            var siblingscount = parseInt($(activeslide).siblings().length);
            var pageno = parseInt($(this).find('a').text());
            for (var i = (pageno - 1) ; i > 0; i--) {
                $('#' + activeslidename + (i-1)).animate({ 'margin-left': '-100%' }, { duration: 400 });
            }
            for (var i = pageno; i < (siblingscount + 1) ; i++) {
                $('#' + activeslidename + (i-1)).animate({ 'margin-left': '0%' }, { duration: 400 });
            }
            $(this).siblings().filter('.pageno').hide();
            $(this).siblings().filter('.pageno').find('a').removeClass('activeArrow');
            $(this).find('a').addClass('activeArrow');
            if (pageno == 1) {
                $(this).siblings().andSelf().filter('.pageno').slice(0, 3).show();
            }
            else if (pageno == (siblingscount + 1)) {
                $(this).siblings().andSelf().filter('.pageno').slice((((pageno - 3) != -1) ? (pageno - 3) : (pageno - 2)), (pageno + 1)).show();
            }
            else {
                $(this).siblings().andSelf().filter('.pageno').slice((pageno - 2), (pageno + 1)).show();
            }
            $(activeslide).removeClass('activeslide'); $('#' + activeslidename + (pageno - 1)).addClass('activeslide');
        });
    },
    inviteIndividual: function (control) {
        var selectedids = new Array();
        control.find('.selectmngr').each(function () {
            selectedids.push($(this).val());
        });

        if (selectedids.length != 0) {
            network.sendInvite(selectedids);
            $('#masterMsgCont').text("Your request for Feedback to be taken has been sent");
            $('#overallCont').show();
            //$('#infos').html('Your request for Feedback to be taken has been sent');
            //$(".popupbgassign,.popup").show();
        }
        else {
            $('#masterMsgCont').text("Please select at least one Team Member/Other Team Member/Peer to send a request to take a Self Assessment");
            $('#overallCont').show();
            //$('#infos').html('Please select at least one Team Member/Other Team Member/Peer to send a request to take a Self Assessment');
            //$(".popupbgassign,.popup").show();
        }
    },
    requestIndividual: function (control) {
        var selectedids = new Array();
        control.find('.selectmngr').each(function () {
            selectedids.push($(this).val());
        });

        if (selectedids.length != 0) {
            network.sendFBRequest(selectedids);
            $('#masterMsgCont').text("Your request to be given Feedback has been sent");
            $('#overallCont').show();
            //$('#infos').html('Your request to be given Feedback has been sent');
            //$(".popupbgassign,.popup").show();
        }
        else {
            $('#masterMsgCont').text("Please select at least one Manager/Skip Level Manager/Peer/Customer & Partner to send a request to give Feedback");
            $('#overallCont').show();
           // $('#infos').html('Please select at least one Manager/Skip Level Manager/Peer/Customer & Partner to send a request to give Feedback');
           // $(".popupbgassign,.popup").show();
        }
    },
    peerinviteIndividual: function (control) {
        var selectedids = new Array();
        control.find('.selectmngr').each(function () {
            selectedids.push($(this).val());
        });

        if (selectedids.length != 0) {
            network.sendInvite(selectedids);
            $('#masterMsgCont').text("Your request for Feedback to be taken has been sent");
            $('#overallCont').show();
            //$('#infos').html('Your request for Feedback to be taken has been sent');
            //$(".popupbgassign,.popup").show();
        }
        else {
            $('#masterMsgCont').text("Please select at least one Team Member/Other Team Member/Peer to send a request to take a Self Assessment");
            $('#overallCont').show();
            //$('#infos').html('Please select at least one Team Member/Other Team Member/Peer to send a request to take a Self Assessment');
            //$(".popupbgassign,.popup").show();
        }
    },
    peerRequestIndividual: function (control) {
        var selectedids = new Array();
        control.find('.selectmngr').each(function () {
            selectedids.push($(this).data("mgrid"));
        });

        if (selectedids.length != 0) {
            network.sendFBRequest(selectedids);
            $('#masterMsgCont').text("Your request to be given Feedback has been sent");
            $('#overallCont').show();
            //$('#infos').html('Your request to be given Feedback has been sent');
            //$(".popupbgassign,.popup").show();
        }
        else {
            $('#masterMsgCont').text("Please select at least one Manager/Skip Level Manager/Peer/Customer & Partner to send a request to give Feedback");
            $('#overallCont').show();
            //$('#infos').html('Please select at least one Manager/Skip Level Manager/Peer/Customer & Partner to send a request to give Feedback');
            //$(".popupbgassign,.popup").show();
        }
    },
    inviteAll: function (control) {
        var selectedids = new Array();
        control.find('.selectmngr').each(function () {
            var val = $(this).data("tid");
            if (val != undefined) {
                selectedids.push(val);
            }
        });

        if (selectedids.length != 0) {
            network.sendInvite(selectedids);
            $('#masterMsgCont').text("Your request for Feedback to be taken has been sent");
            $('#overallCont').show();
            //$('#infos').html('Your request for Feedback to be taken has been sent');
            //$(".popupbgassign,.popup").show();
        }
        else {
            $('#masterMsgCont').text("Please select at least one Team Member/Other Team Member/Peer to send a request to take a Self Assessment");
            $('#overallCont').show();
            //$('#infos').html('Please select at least one Team Member/Other Team Member/Peer to send a request to take a Self Assessment');
            //$(".popupbgassign,.popup").show();
        }
    },
    requestAll: function (control) {
        var selectedids = new Array();
        control.find('.selectmngr').each(function () {
            var val = $(this).data("mgrid");
            if (val != undefined) {
                selectedids.push(val);
            }
        });

        if (selectedids.length != 0) {
            network.sendFBRequest(selectedids);
            $('#masterMsgCont').text("Your request to be given Feedback has been sent");
            $('#overallCont').show();
            //$('#infos').html('Your request to be given Feedback has been sent');
            //$(".popupbgassign,.popup").show();
        }
        else {
            $('#masterMsgCont').text("Please select at least one Manager/Skip Level Manager/Peer/Customer & Partner to send a request to give Feedback");
            $('#overallCont').show();
            //$('#infos').html('Please select at least one Manager/Skip Level Manager/Peer/Customer & Partner to send a request to give Feedback');
            //$(".popupbgassign,.popup").show();
        }
    },
    sendmail: function (control) {
        var selectedids = new Array();
        control.find('.selectmngr').each(function () {
            var val = $(this).data("email");
            if (val != undefined) {
                selectedids.push(val);
            }
        });
        if (selectedids.length != 0) {
            network.sendemail(selectedids);
            $('.selectmngr').removeClass('selectmngr');
        }
        else {
            $('#masterMsgCont').text("Please select at least one Manager/Skip Level Manager/Team Member/Peer/Customer & Partner");
            $('#overallCont').show();
            //$('#infos').html('Please select at least one Manager/Skip Level Manager/Team Member/Peer/Customer & Partner');
            //$(".popupbgassign,.popup").show();
        }
    },

    //Send Invite
    sendInvite: function (selectedid) {
        network.sendRequest({ url: '/Feedback/SendInviteToTeam', data: { 'teamIds': selectedid.toString() } });
    },
    //Send Request
    sendFBRequest: function (selectedid) {
        network.sendRequest({ url: '/Feedback/SendRequest', data: { 'ids': selectedid.toString() } });
    },
    //Send invite/Request
    sendRequest: function (option) {
        Common.ajax({
            url: option.url,

            data: option.data,

            success: function (response) {
            },
            error: function (err) {
            }
        });
    },
    DeleteUSer: function (option) {
        Common.ajaxsync({
            url: '/Common/DeleteUser',

            data: option.data,

            success: function (response) {
            },
            error: function (err) {
            }
        });
    },
    sendemail: function (selectedid) {
        for (var i = 0; i < selectedid.length; i++) {
            var mailto_link = "mailto:" + selectedid;

            window.location.href = mailto_link;
        }
    },
    hideandShowSlideButton: function (count1, className, id, count) {
        //debugger;
        var isSelected = $('.customertiles>ul>li.' + className).hasClass('selected');
        if (isSelected) {
            (count > 1 ? $('#pagetxt').empty().html('Page 1 of ' + count) : $('#pagetxt').html(''));
        }
        $('.customertiles>ul>li').each(function (i, a) {
            //debugger;
            switch (a.className) {
                case 'videoimg nwTile selected':
                    $('#sliderbtn').find('.sliderdiv').not('#slideall').hide();
                    break;
                case 'videoimg selected nwTile':
                    $('#sliderbtn').find('.sliderdiv').not('#slideall').hide();
                    break;
                case 'mngrTile selected':
                    $('#sliderbtn').find('.sliderdiv').not('#slidemgr').hide();
                    break;
                case 'teamTile selected':
                    $('#sliderbtn').find('.sliderdiv').not('#slideteam').hide();
                    break;
                case 'peerTile selected':
                    $('#sliderbtn').find('.sliderdiv').not('#slidepeer').hide();
                    break;
                case 'custTile selected':
                    $('#sliderbtn').find('.sliderdiv').not('#slidecust').hide();
                    break;
                default: if (a.className == 'videoimg uTile selected' || a.className == 'videoimg slected uTile') {
                    $('#sliderbtn').find('.sliderdiv').hide();
                    $('#pagetxt').html('');
                }
            }
        });
    }
};

function removeValue(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].UserId === value) {
            arr.splice(i, 1);
            break;
        }
    }
    return arr;
}

function poelist(poeids, html, firstid, poelength) {
    var html2 = "";

    Common.ajaxtxt({
        url: "/StaticContents/PoeLibrary.txt",
        data: null,
        success: function (responses) {
            var poe = false;
            var comingsoon = "";
            var clickevent = "";
            var jsondata = $.parseJSON(responses);
            var poelist = poeids.split('%');
            var ownsub = $('#OwnSubStatusNetwork').val();
            var poeCount = 0;
            //for (var n = 0; n < 8; n++) {
            //    poe = false;
            //    for (var t = 0; t < poelist.length; t++) {
            //        if (jsondata[n].PoeOrder == poelist[t]) {
            //            poe = true;
            //        }
            //    }
            //    if (poe == false) {
            //        poeCount++;
            //        poe = true;
            //        if (jsondata[n].PoeStatus == 'Add') {
            //            comingsoon = "<div class='comingsoon'> <img src='../../Images/add-poe.png' width='49' height='47' alt='coming soon' /></div>";
            //            if (ownsub != 0) {
            //                clickevent = "CallPoelibrary(this)";
            //            } else {
            //                clickevent = "UnsubscribeLogin(this)";
            //            }
            //        }
            //        else {
            //            comingsoon = "<div class='comingsoon'> <img src='../../Images/coming-soon.png' width='49' height='47' alt='coming soon' /></div>";
            //            clickevent = "";
            //        }
            //        html2 = html2 + " <li id ='poeli" + jsondata[n].PoeOrder + "'  class='poelistli' style='opacity:0.5;' onclick='" + clickevent + "' ><a> <div class='icon'> <img src='../../Images/" + jsondata[n].ImagePath + ".png' alt='' class='img' /></div>" + comingsoon + " <p> " + jsondata[n].PoeName + "</p> </a><span></span></li>";
            //    }
            //}
            for (var n = 0; n < 4; n++) {
                poe = false;
                for (var t = 0; t < poelist.length; t++) {
                    if (jsondata[n].PoeOrder == poelist[t]) {
                        poe = true;
                    }
                }
                if (poe == false) {
                    poeCount++;
                    poe = true;
                    if (jsondata[n].PoeStatus == 'Add') {
                        comingsoon = "<div class='comingsoon'> <img src='../../Images/add-poe.png' width='49' height='47' alt='coming soon' /></div>";
                        if (ownsub != 0) {
                            clickevent = "CallPoelibrary(this)";
                        } else {
                            clickevent = "UnsubscribeLogin(this)";
                        }
                    }
                    else {
                        comingsoon = "<div class='comingsoon'> <img src='../../Images/coming-soon.png' width='49' height='47' alt='coming soon' /></div>";
                        clickevent = "";
                    }
                    //if (jsondata[n].PoeOrder == 8) {
                    //    comingsoon = "";
                    //}
                    html2 = html2 + " <li id ='poeli" + jsondata[n].PoeOrder + "'  class='poelistli' style='opacity:0.5;' onclick='" + clickevent + "' ><a> <div class='icon'> <img src='../../Images/" + jsondata[n].ImagePath + ".png' alt='' class='img' /></div>" + comingsoon + " <p> " + jsondata[n].PoeName + "</p> </a><span></span></li>";
                }
            }
            for (var n = 4; n < 9; n++) {
                poe = false;
                for (var t = 0; t < poelist.length; t++) {
                    if (jsondata[n].PoeOrder == poelist[t]) {
                        poe = false;
                    }
                }
                if (poe == false) {
                    poeCount++;
                    poe = true;
                    if (jsondata[n].PoeStatus == 'Add') {
                        comingsoon = "<div class='comingsoon'> <img src='../../Images/add-poe.png' width='49' height='47' alt='coming soon' /></div>";
                        if (ownsub != 0) {
                            clickevent = "CallPoelibrary(this)";
                        } else {
                            clickevent = "UnsubscribeLogin(this)";
                        }
                    }
                    else {
                        comingsoon = "<div class='comingsoon'> <img src='../../Images/coming-soon.png' width='49' height='47' alt='coming soon' /></div>";
                        clickevent = "";
                    }
                    //if (jsondata[n].PoeOrder == 8) {
                    //    comingsoon = "";
                    //}
                    html2 = html2 + " <li id ='poeli" + jsondata[n].PoeOrder + "'  class='poelistli' style='opacity:0.5;' onclick='" + clickevent + "' ><a> <div class='icon'> <img src='../../Images/" + jsondata[n].ImagePath + ".png' alt='' class='img' /></div>" + comingsoon + " <p> " + jsondata[n].PoeName + "</p> </a><span></span></li>";
                }
            }
            $('#poelist2').html(html2);
            if (poelength <= 4) {
                $('#poelist1').parents('.slimScrollDiv').find('.slimScrollBar').addClass('dummy-slimscrollbar-backgound');
            } else {
                $('#poelist1').parents('.slimScrollDiv').find('.slimScrollBar').hide();
                $('#poelist1').parents('.slimScrollDiv').find('.slimScrollBar').removeClass('dummy-slimscrollbar-backgound');
            }
           
            $('.poelistli').click(function (e) {
                var ctrl = $(this);
                $("#status,#preloader").show();//.delay(100).fadeIn("slow", function () {
                $('#sliderbtn').html('');
                network.setSelectedPoe(ctrl.val());
                network.loadData();
                network.getpaginationcontrols();
                hideTilesFuncSST();
                //});
            });
            var selectedPoe = $('#selectedPoeValueNetwork').val();
            if (selectedPoe == 0) {
                network.setSelectedPoe(firstid);
            } else {
                network.setSelectedPoe(selectedPoe);
            }
            network.loadData();
            hideTilesFuncSST();
        },
        error: function (err) {
        }
    });
    return html2;
}
function CallPoelibrary(data) {
    //var subid = $('#Subid').val();
    //if (subid != -1) {
    var poeid = parseInt((data).id.replace("poeli", ""));
    window.location = "/Signup/Poelibrary?location=Add&SelectedPoe=" + poeid;
    //} else {
    //    $('#ChooseNetwork,.popupbg').fadeIn("slow");
    //}
}
function UnsubscribeLogin(data) {
    var subid = $('#Subid').val();
    if (subid != -1) {
        var poeid = parseInt((data).id.replace("poeli", ""));
        window.location = "/Signup/Poelibrary?location=newPoe&SelectedPoe=" + poeid;
    } else {
        $('#ChooseNetwork,.popupbg').fadeIn("slow");
    }
}
function LoadYammerGroupMemebers() {
    var firstgroup = 0;
    Common.ajaxsync({
        url: '../Yammer/GetYammerGroupidNetwork',
        success: function (response) {
            var html = "<li value=0>Choose a Yammer Group</li>";
            if (response != null && response != "1") {
                for (var i = 0; i < response.length; i++) {
                    html = html + " <li value=" + response[i].Groupid + ">" + response[i].GroupName + "</li>";
                    firstgroup = 1;
                }
                html = html + "<li value='1'>All Company</li>";
                $('#yammerGroups').html(html);
                $('#yammerGroups li').live('click', function () {
                    var ids = $(this).val();
                    $('#drpdownTxtvalues').html($(this).text());
                    if (ids != 0 && ids != 1) {
                        var url = '../../Yammer/GetYammerGroup?ids=' + ids;
                        loadyammerContent(url);
                    } else if (ids == 1) {
                        var url = '../../Yammer/GetYammerUsersList';
                        loadyammerContent(url);
                    }
                });
            } else if (response == "1") {
                window.location = "../SignUp/Register";
            }
            else {
                window.location = "../Yammer/getYammer";
            }
        },
        error: function (err) {
        }
    });
    return firstgroup;
}

function loadyammerContent(id) {
    $("#status").fadeIn();
    $("#preloader").delay(100).fadeIn("slow");
    Common.ajax({
        url: id,
        success: function (response) {
            var html = '';
            var slidehtml = '';
            var licount = 8;
            var count = response.length / licount;
            var count1 = Math.ceil(count);
            $('#yammerpagecount').val(count1);
            for (var k = 0; k < count1; k++) {
                html = html + "<ul id='netyammer" + k + "'>";
                var frststcolTest = '';
                var scndcolTest = '';
                var frstcoldes = 0;
                var scndcoldes = 0;
                var fhtml = '';
                var shtml = '';
                for (var j = 0; j < licount / 2; j++) {
                    var i = ((k * licount) + j);
                    var o = ((k * licount) + j) + (licount / 2);
                    if (response[i] != null) {
                        fhtml = fhtml + frststcolTest + "<li class='netyammer'>" +
                            "<img src='" + response[i].ImageUrl + "' width='61' height='61' alt='User' />" +
                            "<div class='ntwrktext'>" +
                            "<p class='fnames' data-fname=" + response[i].FirstName + " data-lname=" + response[i].LastNAme + "> " + response[i].FirstName + " " + response[i].LastNAme + "</p>" +
                            "<p class='emailids'>" + response[i].EmailAddress + "</p>" +
                           "<p class='jobtitle' value=''> </p>" +
                             "<p class='Poechoosed' value=''> </p>" +
                            "</div> " +
                            "</li>";
                    } else {
                        fhtml = fhtml + "<li class='nonselect'></li>";
                    }
                    if (response[o] != null) {
                        shtml = shtml + scndcolTest + "<li class='netyammer'>" +
                            "<img src='" + response[o].ImageUrl + "' width='61' height='61' alt='User' />" +
                            "<div class='ntwrktext'>" +
                            "<p class='fnames' data-fname=" + response[o].FirstName + " data-lname=" + response[o].LastNAme + "> " + response[o].FirstName + " " + response[o].LastNAme + "</p>" +
                            "<p class='emailids'>" + response[o].EmailAddress + "</p>" +
                            "<p class='jobtitle'> </p>" +
                             "<p class='Poechoosed' value=''> </p>" +
                            "</div> " +
                            "</li>";
                    } else {
                        shtml = shtml + "<li class='nonselect'></li>";
                    }
                }
                html = html + "<div class='coltwo'>" + fhtml + "</div>" + "<div class='coltwo'>" + shtml + "</div></ul>";
                if (k != count1 - 1) {
                    slidehtml = slidehtml + "<div class='nxtfb' id='nxtnetyammer" + k + "' data-value=" + k + "></div><div class='prevfb' id='prvnetyammer" + k + "' data-value=" + k + "></div>";
                }
            }
            $('#sliderbtn').html("");
            $('#sliderbtn').append("<div id='slideyammer' class='sliderdiv'>" + slidehtml + "</div>");
            //$('#slideyammer').hide();
            $('#youryammercontent').html(html);
            $('#youryammercontent').css('width', count1 * 120 + '%');
            $('.network ul').css('width', 100 / count1 + '%');
            $('#adduserNxtStep').show();
            $('#adduserNxtStep').prop('disabled', true);
            $("#status").fadeOut();
            $("#preloader").delay(100).fadeOut("slow");
            network.loadmenuevents();
            //Yammer Load events

            $('.yammerpopupconthd span').click(function () {
                $(".yammerpopupbg, .yammerpopup").fadeOut('slow');
            });
            $('#adduserNxtStep').click(function () {
                window.location.href = '/Signup/Add/Manager';
            });
            $('#youryammercontent ul li').click(function () {
                $('#youryammercontent ul ').each(function () {
                    $(this).find('li').siblings().removeClass('selectmngr');
                });
                var element = $(this);
                $(this).toggleClass('selectmngr');
                YammerPoeList(element);
            });
            $('.yammerTile').click(function () {
                $(this).addClass('selected');
                $(".customertiles li").siblings().removeClass('selected');
            });

            for (var l = 0; l < count1; l++) {
                $('#nxtnetyammer' + l).hide();
                $('#prvnetyammer' + l).hide();
            }
            $('#nxtnetyammer0').hide();
            if (count1 > 1) {
                $('#nxtnetyammer0').show();
            }
            if (count1 > 1) {
                $('#pagetxt').html('Page ' + $('#yammercurpage').val() + ' of ' + $('#yammerpagecount').val());
            }

            for (var l = 0; l < count1; l++) {
                $('#nxtnetyammer' + l).click(function () {
                    var id = parseInt(this.id.replace('nxtnetyammer', ''));
                    $('#netyammer' + (id)).animate({ 'margin-left': '-100%' }, { duration: 400 });
                    $(this).hide();
                    $('#prvnetyammer' + (id - 1)).hide();
                    $('#prvnetyammer' + id).show();
                    $('#nxtnetyammer' + (id + 1)).show();
                    $('#pagetxt').html('Page ' + (id + 2) + ' of ' + count1);
                    $('#yammercurpage').val((id + 2));
                });

                $('#prvnetyammer' + l).click(function () {
                    var id = parseInt(this.id.replace('prvnetyammer', ''));
                    $('#netyammer' + (id)).animate({ 'margin-left': '0%' }, { duration: 400 });
                    $(this).hide();
                    $('#nxtnetyammer' + (id + 1)).hide();
                    $('#prvnetyammer' + (id - 1)).show();
                    $('#nxtnetyammer' + id).show();
                    $('#pagetxt').html('Page ' + (id + 1) + ' of ' + count1);
                    $('#yammercurpage').val((id + 1));
                });
            }
        },
        error: function (err) {
        }
    });
}

function YammerPoeList(element) {
    Common.ajax({
        url: '/Common/GetMyNetworkSubscribedPoes',
        success: function (response) {
            if (response != null) {
                var html = "";
                for (var i = 0; i < response.length; i++) {
                    html = html + "<li value=" + response[i].POEId + "><span> <img src='../../Images/unchecked.png' class='unchecked' /><img src='../../Images/check.png' class='checked' /></span><p>" + response[i].POEName + "</p></li>";
                }
                $('#NetworkPoes').html(html);
                var poeid = $(element).find('.Poechoosed').val();
                var designation = $(element).find('.jobtitle').val();
                var splitPoeId = poeid.split('%');
                for (var k = 0; k < splitPoeId.length; k++) {
                    $('.yammerpopupcontholder .right li').each(function () {
                        var t = $(this).val();
                        if (t == splitPoeId[k]) {
                            $(this).find(".checked").show();
                            $(this).find(".unchecked").hide();
                        }
                    });
                }
                $('.yammerpopupcontholder .left li').each(function () {
                    var t = $(this).val();
                    if (t == designation) {
                        $(this).find(".checked").show();
                        $(this).siblings().find(".checked").hide();
                    }
                });
                $(".yammerpopupbg, .yammerpopup").fadeIn('slow');
                $('.yammerpopupcontholder .right li').click(function () {
                    // $('.unchecked').hide();
                    if ($(this).find(".unchecked").is(":visible")) {
                        $(this).find(".unchecked").hide();
                        $(this).find(".checked").show();
                    } else {
                        $(this).find(".unchecked").show();
                        $(this).find(".checked").hide();
                    }
                });
                $('.yammerpopupcontholder .left li').click(function () {
                    // $('.unchecked').hide();
                    $('.yammerpopupcontholder .left li').each(function () {
                        $(this).find(".unchecked").show();
                        $(this).find(".checked").hide();
                    });
                    if ($(this).find(".unchecked").is(":visible")) {
                        $(this).find(".unchecked").hide();
                        $(this).find(".checked").show();
                    } else {
                        $(this).find(".unchecked").show();
                        $(this).find(".checked").hide();
                    }
                });
                Put_SessionData(element);
            } else {
                $(".yammerpopupbg, .yammernetwork").fadeIn();
            }
        },
        error: function (err) {
        }
    });
    $('hiddentThis').val(element);
}

function Put_SessionData(element) {
    $("#yammerUserSelect").unbind("click");
    $('#yammerUserSelect').click(function () {
        var subid = $('#Subid').val();
        if (subid != -1) {
            window.location.href = '/Signup/Add/Peer';

            var newd = element;
            Common.ajax({
                url: '/Network/LoadUserPlan',
                success: function (response) {
                    var emailid = $(element).find('.emailids').text();
                    var fname = $(element).find('.fnames').attr('data-fname');
                    var lname = $(element).find('.fnames').attr('data-lname');
                    var designation = "";
                    var desgtitle = "";
                    $('.yammerpopupcontholder .left li').each(function () {
                        var t = $(this).find(".checked").is(":visible");
                        if (t) {
                            designation = $(this).val();
                            desgtitle = $(this).find('p').text();
                        }
                    });
                    //Number of poes selected
                    var poeids = "";
                    var poenames = "";
                    $('.yammerpopupcontholder .right li').each(function () {
                        var t = $(this).find(".checked").is(":visible");
                        if (t) {
                            poeids = $(this).val() + '%' + poeids;
                            poenames = $(this).find('p').text() + ',' + poenames;
                        }
                    });
                    poeids = poeids.slice(0, -1);
                    poenames = poenames.slice(0, -1);
                    //Check the plan
                    if (designation == "") {
                        $('#masterMsgCont').text("Please select a title");
                        $('#overallCont').show();
                        //alert("Please select a title");
                    }
                    else
                        if (poeids == "") {
                            $('#masterMsgCont').text("Please assign a REP");
                            $('#overallCont').show();
                            //alert("Please assign a REP");
                        } else {
                            var totaluserCount = 0;
                            $(element).addClass('totUsers');
                            if (response.Planid == 1) {
                                totaluserCount = response.yammerUserCount + response.Usercount + 1;
                                if (totaluserCount > 4) {
                                    $(element).removeClass('totUsers');
                                    var r = confirm("Trial account user limit is 5 including you. If you add more users, your account becomes a paid account.");
                                    loadconfirmList(r, element, fname, lname, emailid, poeids, designation, desgtitle, poenames);
                                    //Need to show popup
                                } else {
                                    $(element).find('.jobtitle').text(desgtitle);
                                    $(element).find('.Poechoosed').text(poenames);
                                    $(element).find('.Poechoosed').val(poeids);
                                    $(element).find('.jobtitle').val(designation);
                                    AddMemberToSession(fname, lname, emailid, poeids, designation, desgtitle);
                                }
                            } else if (response.Planid == 2) {
                                $(element).find('.jobtitle').text(desgtitle);
                                $(element).find('.Poechoosed').text(poenames);
                                $(element).find('.Poechoosed').val(poeids);
                                $(element).find('.jobtitle').val(designation);
                                AddMemberToSession(fname, lname, emailid, poeids, designation, desgtitle);
                            }
                        }
                    //$("#yammerUserSelect").unbind("click", 'Put_SessionData(1)');
                },
                error: function (err) {
                }
            });
        } else {
            $('#ChooseNetwork,.popupbg').fadeIn("slow");
        }
    });

    //CancelBtnClick
    $("#yammercancelbtn").unbind("click");
    $('#yammercancelbtn').click(function () {
        var emailid = $(element).find('.emailids').text();
        Common.ajax({
            url: '/Network/CancelYammerUser?emailId=' + emailid, // url: '../../Common/GetPoEsByUserId',
            success: function (response) {
                $(element).removeClass('totUsers');
                $('#adduserNxtStep').prop('disabled', true);
                $(element).find('.jobtitle').text("");
                $(element).find('.Poechoosed').text("");
                $(".yammerpopupbg, .yammerpopup").fadeOut('slow');
                var valid = false;
                $('#youryammercontent ul li').each(function () {
                    var t = $(this).hasClass('totUsers');
                    if (t) {
                        valid = true;
                    }
                });
                if (valid) {
                    $('#adduserNxtStep').prop('disabled', false);
                }
            },
            error: function (err) {
            }
        });
    });
}

function AddMemberToSession(fname, lname, emailId, poe, designationId, designationTitle) {
    Common.ajax({
        url: '/Network/AddYammerMemberToSession',
        data: { 'fname': fname, 'lname': lname, 'emailId': emailId, 'poe': poe, 'designationId': designationId, 'designationTitle': designationTitle },
        success: function (response) {
            $(".yammerpopupbg, .yammerpopup").fadeOut('slow');
            $('#adduserNxtStep').prop('disabled', false);
        },
        error: function () {
        }
    });
}

function loadconfirmList(r, element, fname, lname, emailid, poeids, designation, desgtitle, poenames) {
    if (r == true) {
        Common.ajaxsync({
            url: '../SignUp/TrailTopaid',
            success: function (response) {
                $(element).addClass('totUsers');
                $(".yammerpopupbg, .yammerpopup").fadeOut('slow');
                $(element).find('.jobtitle').text(desgtitle);
                $(element).find('.Poechoosed').text(poenames);
                AddMemberToSession(fname, lname, emailid, poeids, designation, desgtitle);
            },
            error: function () {
            }
        });
    } else {
        $(element).removeClass('totUsers');
        $(".yammerpopupbg, .yammerpopup").fadeOut('slow');
    }
}

function loadOwnNetwork(prefix, mode) {
    Common.ajaxsync({
        url: '../Network/GetOwnNetwork',
        success: function (response) {
            //debugger;
            if (response != null) {
                if (mode == 1) {
                   
                    window.location.href = '/Signup/Add/' + prefix + '';
                } else {
                    $('#ChooseyourNetwork').text(response.NetworkName);
                    $('#Subid').val(response.Subscriptionid);
                    network.poeMenu();
                    $(this).addClass('selecpoe');
                    $('#assignpoePopup, #dragassignpoe').show();
                    $('.popupbg').show();
                    //$(this).addClass('selecpoe');
                    $('#networkpopup,.poepopupbg').fadeIn("slow");
                    network.LoadPopupdata();
                    //window.location.href = '/Network/Network';
                    //$(prefix).addClass('selecpoe');
                    //$('#assignpoePopup, #dragassignpoe').show();
                    //$('.popupbg').show();
                    ////$(prefix).addClass('selecpoe');
                    //$('#networkpopup,.poepopupbg').fadeIn("slow");
                    //network.LoadPopupdata();
                }
            }
        },
        error: function () {
        }
    });
}
function hideTilesFuncSST() {
    //alert("Am in");
    Common.ajaxsync({
        url: '/Common/GetPoeResultMode',
        success: function (response) {
            //alert(response.Status);
            if (response.Status != false) {
                $('.headermenus').addClass('headerMenuHide');
                $('.result_start').addClass('resultMenuHide');
                $('.managersync_start').addClass('managerMenuHide');
                $('.communitysync_start').addClass('communityMenuHide');
                $('.goals_start').addClass('goalsMenuHide');

            } else {
                // alert('inside');
                $('.headermenus').removeClass('headerMenuHide');
                $('.result_start').removeClass('resultMenuHide');
                $('.managersync_start').removeClass('managerMenuHide');
                $('.communitysync_start').removeClass('communityMenuHide');
                $('.goals_start').removeClass('goalsMenuHide');

            }
        },
        error: function () {
        }
    });
}