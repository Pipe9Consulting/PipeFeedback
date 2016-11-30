$(document).ready(function () {
    {
        Common.ajaxBlog({
            url: 'https://public-api.wordpress.com/rest/v1/sites/alandowzall.com/posts/?number=4&pretty=1', //'http://public-api.wordpress.com/rest/v1/sites/manikandankannan.wordpress.com/posts/?number=4&pretty=1',
            data: null,
            success: function (response) {
                var html = '';
                if (response.posts != undefined && response.posts != null && response.posts.length != 0) {
                    for (i = 0; i < response.posts.length; i++) {
                        var date_to_convert = new Date(response.posts[i].date);
                        var className = "paragraph";
                        var subhead = "<div class='subhead'>";
                        var image = $($(response.posts[i])[0].content).find('img').attr('src');
                        if (image == undefined) {
                            image = "";
                            className = "paragraph1";
                            subhead = "<div class='subhead' style='display:none'>";
                        }
                        var content = $(response.posts[i].content).html();
                        if ($($(response.posts[i].content).html()).find('img').length == 1) {
                            content = response.posts[i].excerpt.substr(0, 200);
                        }

                        var mydate = (parseInt(date_to_convert.getMonth()) + 1) + "/" + date_to_convert.getDate() + "/" + date_to_convert.getFullYear();

                        html = html + "<li> " + subhead + "<div class='img'><img src='" + image + "' /></div></div><div class='" + className + "'><p><div class='date'>" + mydate.replace(' UTC+0530', '') + "</div><div class='hdtwt'>" + response.posts[i].title + "</div></p><p>" + content + "<a href='" + response.posts[i].URL + "' target='_blank' class='newsM'>more..</a></p></div></li>";
                    }
                }
                $('#blogData').html(html);
            },
            error: function (err) {
            }
        });
    };

    //Meet Alan Favourite Blog

    {
        Common.ajaxBlog({
            url: 'https://public-api.wordpress.com/rest/v1/sites/alandowzall.com/posts/?number=4&pretty=1', //'https://public-api.wordpress.com/rest/v1/sites/manikandankannan.wordpress.com/posts/?number=4&pretty=1',
            data: null,
            success: function (response) {
                var html = '';
                if (response.posts != undefined && response.posts != null && response.posts.length != 0) {
                    for (i = 0; i < response.posts.length; i++) {
                        var date_to_convert = new Date(response.posts[i].date);
                        var className = "paragraph";
                        var subhead = "<div class='subhead'>";
                        var image = $($(response.posts[i])[0].content).find('img').attr('src');
                        if (image == undefined) {
                            image = "";
                            className = "paragraph1";
                            subhead = "<div class='subhead' style='display:none'>";
                        }
                        var content = $(response.posts[i].content).html();
                        if ($($(response.posts[i].content).html()).find('img').length == 1) {
                            content = response.posts[i].excerpt.substr(0, 200);
                        }

                        var mydate = (parseInt(date_to_convert.getMonth()) + 1) + "/" + date_to_convert.getDate() + "/" + date_to_convert.getFullYear();

                        html = html + "<li> " + subhead + "<div class='img'><img src='" + image + "' /></div></div><div class='" + className + "'><p><div class='date'>" + mydate.replace(' UTC+0530', '') + "</div><div class='hdtwt'>" + response.posts[i].title + "</div></p><p>" + content + "<a href='" + response.posts[i].URL + "' target='_blank' class='newsM'>more..</a></p></div></li>";
                    }
                }

                $('#favBlogdata').html(html);
            },
            error: function (err) {
            }
        });
    };
    //Meet Alan:LatestNews
    {
    };
    //Meet Alan:Workshop
    {
        Common.ajaxtxt({
            url: "/StaticContents/WorkshopContents.txt",
            data: null,
            success: function (response) {
                var html = '';
                var jsondata = $.parseJSON(response);
                for (i = 0; i < jsondata.length; i++) {
                    html = html + "<li> <div class='subhead'> <div class='img'> <img src='" + jsondata[i].image + "' /></div> </div> <div class='paragraph'> <p> <div class='dt'> Date: " + jsondata[i].date + "</div> <div class='venue'> " + jsondata[i].name + "</div> </p> <p>" + jsondata[i].text + "</p><div class='type'>" + jsondata[i].type + "</div><div class='location'>" + jsondata[i].location + "</div> <div class='register'><a href='" + jsondata[i].link + "' target='_blank'> Click here to register</a></div> </div> </li>";
                }
                $('#latestWorkshopData').html(html);
            },
            error: function (err) {
            }
        });
    };
    {
        Common.ajaxtxt({
            url: "/StaticContents/CustomerRefContents.txt",
            data: null,
            success: function (response) {
                var html = '';
                var jsondata = $.parseJSON(response);
                var v = 0;
                for (i = 0; i < jsondata.length; i++) {
                    var charlen = jsondata[i].text;
                    var wordlength = charlen.length; //charlen.replace(/[^\w ]/g, "").split(/\s+/).length;
                    if (wordlength <= 150) {
                        html = html + "<li id='custref" + v + "'>  <div><p class='dtail'>" + jsondata[i].text + "</p></div></li>";
                        v = v + 1;
                    }
                }
                $('#latestCustomerRefData').html(html);
            },
            error: function (err) {
            }
        });
    };

    {
        Common.ajaxtxt({
            url: "/StaticContents/CustomerRefContents.txt",
            data: null,
            success: function (response) {
                $('#custreftextdata').val(response);
                var html = '';

                var jsondata = $.parseJSON(response);
                /* $('#fliponload').html(jsondata[0].text.substr(0, 75) + "...");
                $('#flipdiv').data("data-title", jsondata[1].text.substr(0, 75) + "...");
                $('#fliponload2').html(jsondata[0].text.substr(0, 75) + "...");*/
                $('#flipbox1').html("<p>" + jsondata[0].text.substr(0, 75) + "..." + "</p>");
                $('#flipbox').html("<p>" + jsondata[0].text.substr(0, 75) + "..." + "</p>");

                var htmlflip = '';

                for (i = 0; i < jsondata.length; i++) {
                    html = html + " <li> <div class='subhead'> <div class='logo'> <img src='" + jsondata[i].image + "' /></div> </div> <div class='paragraph'> <p> <div class='date'>  " + jsondata[i].name + "</div> </p> <p> " + jsondata[i].text + "</p> </div> </li>";

                    htmlflip = htmlflip + " <li><p> " + jsondata[i].text.substr(0, 75) + "....</p></li>";
                }
                $('#tips').html(htmlflip);

                $('#latestCustomerData').html(html);
            },
            error: function (err) {
            }
        });
    };
});