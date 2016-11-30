<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Feedback1slide.aspx.cs"
    Inherits="bExcellent.Web.Client.Feedback1slide" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>jQuery UI Slider - Slider bound to select</title>
    <link rel="stylesheet" href="../Styles/Stylesheet1.css" />
    .
    <script type="text/javascript" src="../Scripts/ref/jquery-1.8.3.js"></script>
    <script type="text/javascript" src="../Scripts/ref/jquery-ui.js"></script>
    <script type="text/javascript" src="../Scripts/ref/test.js"></script>
    <script type="text/javascript">
        $(function () {
            var Nextbtn = 0;
            $("#slider").slider({
                min: 0,
                max: 4,
                range: "min",
                value: 1,
                slide: function (event, ui) {
                    if (ui.value == 0) {
                        event.preventDefault();
                        $('#selectedOption').html(1);
                    } else {
                        $('#selectedOption').html(ui.value);
                    }
                }
                // change: function (event, ui) { if (ui.value == 0) ui.value = 1; }
            });
            /*   $('#BtnNext').click(function () {
            alert($('#selectedOption').html());
            });*/

        });

        //        $("#slider").slider({
        //            change: function (event, ui) { debugger; }
        //        });
    </script>
    <style type="text/css">
        #slider .ui-slider-range
        {
            background-image: url(../images/img/bg.png);
        }
    </style>
</head>
<body>
    <div id="selectedOption" style="display: none">
    </div>
    <div id='slider' style="width: 562px; height: 62px">
        <img src="../images/img/bg-1.png" />
    </div>
    <input type="button" value="Next" id="BtnNext" />
</body>
</html>