$(document).ready(function () {
});
/*
var Poe = {
poeMenu: function (id, page, loadCallback, callback) {
// load sub contents
Common.ajax({
url: '/scripts/sample/poe.txt',

success: function (response) {
var _poes = $.parseJSON(response);
var source = "{{#each poes}}<div class='tile-small-view' data-value='{{id}}_{{key}}_" + page + "'><div class='small-tile-text'>{{name}}</div></div>{{/each}}";

Handlebars.registerHelper('classname', function () {
count++;
return (count % 2 == 0) ? new Handlebars.SafeString("row-gray") : new Handlebars.SafeString("row-white");
});

var template = Handlebars.compile(source);
$('#' + id).html(template({ 'poes': _poes }));

$('#' + id + '> div').unbind('click');
$('#' + id + '> div').bind('click', function () {
if (callback && typeof callback == 'function') {
callback(this);
}
});

if (loadCallback && typeof loadCallback == 'function') {
loadCallback();
}
},
error: function (err) {
$('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
}
});
}
};*/

var Poe = {
    poeMenu: function () {
        // var userid = $('#userid').html();
        var userid = 168;
        // load sub contents
        Common.ajax({
            url: serviceUrl + 'Common.svc/GetPoEsByUserId',
            data: { 'userId': userid },
            success: function (response) {
                var _poes = response;

                //   $('#selectedpoe').html(response[0]['POEId']);
                //    var _poes = $.parseJSON(response);

                /*     if (page == 'improvementview' || page == 'impcompareview' || 'matrixview') {
                //  findAndRemove(_poes, 'POEId', '0');
                _poes.splice(0, 1);
                }*/
                var source = "{{#each poes}}<div id ='{{POEId}}_" + page + "' class='tile-small-view' data-value='{{POEId}}_" + page + "'><div class='small-tile-text'>{{POEName}}</div></div>{{/each}}";

                /*Handlebars.registerHelper('classname', function () {
                count++;
                return (count % 2 == 0) ? new Handlebars.SafeString("row-gray") : new Handlebars.SafeString("row-white");
                });*/
                /*
                <ul><li><h2>&nbsp;</h2><p>Opportunity Manager</p></li></ul>
                */
                /*   var template = Handlebars.compile(source);
                $('#' + id).html(template({ 'poes': _poes }));

                $('#' + id + '> div').unbind('click');
                $('#' + id + '> div').bind('click', function () {
                if (callback && typeof callback == 'function') {
                callback(this);
                }
                });

                if (loadCallback && typeof loadCallback == 'function') {
                loadCallback();
                }*/
            },
            error: function (err) {
                $('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    }
};