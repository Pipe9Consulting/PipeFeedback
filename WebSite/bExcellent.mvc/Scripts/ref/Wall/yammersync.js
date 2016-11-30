$(document).ready(function () {
    var html = "<li><a href='/wall/index'><span> <img src='../../Images/Icons/wall-small.png' /></span>Wall</a></li>" +
            "<li><a href='/wall/PostAppreciation'><span><img src='../../Images/Icons/send-app-small.png' /></span>Send Appreciation</a></li>" +
            "<li><a href='/wall/PostVideos'><span><img src='../../Images/Icons/post-video-small.png' /></span>Post a Video</a></li>" +
            "<li><a href='/wall/SyncYammer'><span><img src='../../Images/Icons/yammer-small.png' /></span>Sync with Yammer</a></li>";
    $('#target ul').html(html);
    $('#yammer-login').click();
    $('#wall, #postvmsg,.wall1,.wall3,.wall2').hide();
    $('#syncyammer').addClass('selected');
    $('.wall4').show();
    $('#postvmsgtile, #walltile,#sa,.badgetile, .badgetile1').removeClass('selected');
    yam.getLoginStatus(function (response) {
        if (response.authResponse) {
            yam.connect.embedFeed(
          {
              container: '#embedded-feed'
              // network: 'tillidsoft.com'
          });
        } else {
            yam.login(function (response) {
                if (response.authResponse) {
                    yam.connect.embedFeed(
                      {
                          container: '#embedded-feed'
                          //network: 'tillidsoft.com'
                      });
                }
            });
        }
    });
});