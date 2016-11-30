$(function () {
    $('#demo_iframe').load(function () {
        //window.location.hash = 'Home';
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1);
        var spp = hashes.split("=");
        if (spp.length == 2) {
            if (spp[1] == 1) {
                $('#demo_iframe').attr("src", "../KessakuHome/CloudAsCoach");
                window.location.hash = 'Pipe9 Coach';
                CloudAsCoachCont();
            } else if (spp[1] == "CloudasPoe") {
                $('#demo_iframe').attr("src", "../KessakuHome/CloudAsCoach#CloudasPoe");
                window.location.hash = 'Pipe9 Coach';
                CloudAsCoachCont();
            } else if (spp[1] == "Feedback") {
                $('#demo_iframe').attr("src", "../KessakuHome/CloudAsCoach#Feedback");
                window.location.hash = 'Pipe9 Coach';
                CloudAsCoachCont();
            } else if (spp[1] == "Standing") {
                $('#demo_iframe').attr("src", "../KessakuHome/CloudAsCoach#standingPage");
                window.location.hash = 'Pipe9 Coach';
                CloudAsCoachCont();
            } else if (spp[1] == "Connect") {
                $('#demo_iframe').attr("src", "../KessakuHome/CloudAsCoach#Smart-Connect");
                window.location.hash = 'Pipe9 Coach';
                CloudAsCoachCont();
            } else if (spp[1] == "Goals") {
                $('#demo_iframe').attr("src", "../KessakuHome/CloudAsCoach#Goals");
                window.location.hash = 'Pipe9 Coach';
                CloudAsCoachCont();
            }
            else if (spp[1] == "Recognition") {
                $('#demo_iframe').attr("src", "../KessakuHome/CloudAsCoach#Recognition");
                window.location.hash = 'Pipe9 Coach';
                CloudAsCoachCont();
            }
            else if (spp[1] == "ProfileOfExcellenceCont") {
                $('#demo_iframe').attr("src", "../KessakuHome/CloudSolutions#ProfileOfExcellenceCont");
                window.location.hash = 'Pipe9 Solutions';
                CloudSolutionCont();
            }
            else if (spp[1] == "cloudAsCoachCont") {
                $('#demo_iframe').attr("src", "../KessakuHome/CloudSolutions#cloudAsCoachCont");
                window.location.hash = 'Pipe9 Solutions';
                CloudSolutionCont();
            }
            else if (spp[1] == "PerformanceCont") {
                $('#demo_iframe').attr("src", "../KessakuHome/CloudSolutions#PerformanceCont");
                window.location.hash = 'Pipe9 Solutions';
                CloudSolutionCont();
            }
            else if (spp[1] == "CoachingToolKitCont") {
                $('#demo_iframe').attr("src", "../KessakuHome/CloudSolutions#CoachingToolKitCont");
                window.location.hash = 'Pipe9 Solutions';
                CloudSolutionCont();
            }
            else if (spp[1] == 2) {
                $('#demo_iframe').attr("src", "../KessakuHome/CloudSolutions");
                window.location.hash = 'Pipe9 Solutions';
                CloudSolutionCont();
            }
            else if (spp[1] == 3) {
                $('#demo_iframe').attr("src", "../KessakuHome/Resources");
                window.location.hash = 'Resources';
                ResourceHdrCont();
            }
            else if (spp[1] == 4) {
                $('#demo_iframe').attr("src", "../KessakuHome/Events");
                window.location.hash = 'Resources';
                ResourceHdrCont();
            }
            else if (spp[1] == 5) {
                $('#demo_iframe').attr("src", "../KessakuHome/Videos");
                window.location.hash = 'Resources';
                ResourceHdrCont();
            }
            else if (spp[1] == 6) {
                $('#demo_iframe').attr("src", "../KessakuHome/DownloadableContent");
                window.location.hash = 'Resources';
                ResourceHdrCont();
            }

            else if (spp[1] == 7) {
                $('#demo_iframe').attr("src", "../KessakuHome/Pricing");
                window.location.hash = 'Pricing';
                PricingHdrCont();
            } else if (spp[1] == 8) {
                $('#demo_iframe').attr("src", "../RequestDemo");
                window.location.hash = 'RequestDemo';
                RequestDemoHdrCont();
            }
            else if (spp[1] == 9) {
                $('#demo_iframe').attr("src", "../Home");
                window.location.hash = 'Home';
                HomeDemoHdrCont();
            }
        } else {
            var t = document.getElementById("demo_iframe").contentWindow.location.href;
            var h = document.getElementById("demo_iframe").contentWindow.location.pathname;
            var splitUrl = t.split('#');
            if (splitUrl.length == 2 || h == "/CloudSolutions") {
                if (splitUrl[1] == "ProfileOfExcellenceCont" || splitUrl[1] == "cloudAsCoachCont" || splitUrl[1] == "PerformanceCont" || splitUrl[1] == "CoachingToolKitCont" || h == "/CloudSolutions") {
                    $('#headerCont li a').each(function () {
                        if (!$(this).hasClass('members')) {
                            $(this).removeClass('active').addClass('deActive');
                        }
                    });
                    $('#cloudSolnHdr a').removeClass('deActive').addClass('active');
                    window.location.hash = 'Pipe9 Solutions';
                } else {
                    $('#headerCont li a').each(function () {
                        if (!$(this).hasClass('members')) {
                            $(this).removeClass('active').addClass('deActive');
                        }
                    });
                    $('#cloudasHdr a').removeClass('deActive').addClass('active');
                    window.location.hash = 'Pipe9 Coach';
                }
            } if (h == "/CloudAsCoach") {
                CloudAsCoachCont();
            } else if (h == "/Resources") {
                ResourceHdrCont();
            } else if (h == "/Pricing") {
                PricingHdrCont();
            } else if (h == "/RequestDemo") {
                RequestDemoHdrCont();
            }
            else if (splitUrl.length == 1 && h == "/KessakuHome/Home") {
                HomeDemoHdrCont();
            }

            //if (h == "/Videos" || h == "/Events" || h=="/DownloadableContent") {
            //    ResourceHdrCont();
            //}
        }
    });
    var t = $('#demo_iframe').attr('src');
    var body_height = $(document).height();
    var topbar_height = $("#demo_topbar").outerHeight();
    $("#demo_iframe").attr("height", (body_height - topbar_height) + "px");

    //$('#headerCont li a').each(function () {
    //    $(this).removeClass('active');
    //});

    //$('#homeAct a').addClass('active');
    $('#headerCont li a').click(function () {
        $('#headerCont li a').each(function () {
            if (!$(this).hasClass('members')) {
                $(this).removeClass('active').addClass('deActive');
            }
        });
        $(this).removeClass('deActive').addClass('active');
        //$(this).removeClass('active');
    });
    $(window).load(function () {
        //$('#headerCont li').each(function () {
        //    if (!$(this).find('a').hasClass('members')) {
        //        $(this).find('a').removeClass('active').addClass('deActive');
        //    }
        //});
        //$('#homeAct a').removeClass('deActive').addClass('active');
        //window.location.hash = 'Home';
    });

    $('#tempRedirect li').click(function () {
        $('#headerCont li a').each(function () {
            if (!$(this).hasClass('members')) {
                $(this).removeClass('active').addClass('deActive');
            }
        });
        $('#cloudasHdr a').removeClass('deActive').addClass('active');
    });
    $('#tempSolnRedirect li').click(function () {
        $('#headerCont li a').each(function () {
            if (!$(this).hasClass('members')) {
                $(this).removeClass('active').addClass('deActive');
            }
        });
        $('#cloudSolnHdr a').removeClass('deActive').addClass('active');
    });
    //url redirection//
    $('#homeAct a').click(function () {
        window.location.hash = 'Home';
    });
    $('#cloudasHdr a, #cloudasHdr li a').click(function () {
        window.location.hash = 'Pipe9 Coach';
    });
    $('#cloudSolnHdr a, #cloudSolnHdr li a').click(function () {
        window.location.hash = 'Pipe9 Solutions';
    });
    $('#ResourcesHdr a, #ResourcesHdr li a').click(function () {
        ResourceHdrCont();
        window.location.hash = 'Resources';
    });
    $('#pricingHdr a').click(function () {
        // RequestDemoHdrCont();
        window.location.hash = 'Pricing';
    });
    $('#reqDemoHdr a').click(function () {
        //RequestDemoHdrCont();
        window.location.hash = 'Request a Demo';
    });
    $('#dwnldCont').click(function () {
        window.open('../../SignUp/DownloadPdf?poeid=0', '_blank');
    });
});

function CloudAsCoachCont() {
    $('#headerCont li a').each(function () {
        if (!$(this).hasClass('members')) {
            $(this).removeClass('active').addClass('deActive');
        }
    });
    $('#cloudasHdr a').removeClass('deActive').addClass('active');
    window.location.hash = 'Pipe9 Coach';
}

function CloudSolutionCont() {
    $('#headerCont li a').each(function () {
        if (!$(this).hasClass('members')) {
            $(this).removeClass('active').addClass('deActive');
        }
    });
    $('#cloudSolnHdr a').removeClass('deActive').addClass('active');
    window.location.hash = 'Pipe9 Solutions';
}
function ResourceHdrCont() {
    $('#headerCont li a').each(function () {
        if (!$(this).hasClass('members')) {
            $(this).removeClass('active').addClass('deActive');
        }
    });
    $('#ResourcesHdr a').removeClass('deActive').addClass('active');
    window.location.hash = 'Resources';
}
function PricingHdrCont() {
    $('#headerCont li a').each(function () {
        if (!$(this).hasClass('members')) {
            $(this).removeClass('active').addClass('deActive');
        }
    });
    $('#pricingHdr a').removeClass('deActive').addClass('active');
    window.location.hash = 'Pricing';
}
function RequestDemoHdrCont() {
    $('#headerCont li a').each(function () {
        if (!$(this).hasClass('members')) {
            $(this).removeClass('active').addClass('deActive');
        }
    });
    $('#reqDemoHdr a').removeClass('deActive').addClass('active');
    window.location.hash = 'RequestDemo';
}

function HomeDemoHdrCont() {
    $('#headerCont li a').each(function () {
        if (!$(this).hasClass('members')) {
            $(this).removeClass('active').addClass('deActive');
        }
    });
    $('#homeAct a').removeClass('deActive').addClass('active');
    window.location.hash = 'Home';
}