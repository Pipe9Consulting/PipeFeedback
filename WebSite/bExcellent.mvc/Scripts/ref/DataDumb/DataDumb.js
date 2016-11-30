$(document).ready(function () {
    var poeid = $('#selectPoe option:selected').val();
    $('#poeidval').val(poeid);
    $('#getmanagerReport').click(function () {
        var poeid = $('#selectPoe option:selected').val();
        $('#poeid').val(poeid);
        $('#getsubmit').submit();
        //Common.ajaxsync({
        //    url: '/DataDumb/GetManagerReport',
        //    data: { 'poeid': poeid },
        //    success: function () {
        //    },
        //    error: function (err) {
        //    }
        //});
    });
    $('#getTeamReport').click(function () {
        var poeid = $('#selectPoe option:selected').val();
        $('#poeidval').val(poeid);
        //alert($('#poeidval').val(poeid));
        $('#getteamsubmit').submit();
        //Common.ajaxsync({
        //    url: '/DataDumb/GetManagerReport',
        //    data: { 'poeid': poeid },
        //    success: function () {
        //    },
        //    error: function (err) {
        //    }
        //});
    });
    $('#getimportanceReport').click(function () {
        var poeid = $('#selectPoe option:selected').val();
        $('#poeidImp').val(poeid);
        //alert($('#poeidval').val(poeid));
        $('#getimpSubmit').submit();
        //Common.ajaxsync({
        //    url: '/DataDumb/GetManagerReport',
        //    data: { 'poeid': poeid },
        //    success: function () {
        //    },
        //    error: function (err) {
        //    }
        //});
    });
    $('#demographicReport').click(function () {
        var poeid = $('#selectPoe option:selected').val();
        $('#poedemo').val(poeid);
        //alert($('#poeidval').val(poeid));
        $('#getdemoSubmit').submit();
        //Common.ajaxsync({
        //    url: '/DataDumb/GetManagerReport',
        //    data: { 'poeid': poeid },
        //    success: function () {
        //    },
        //    error: function (err) {
        //    }
        //});
    });
    $('#productsurvey').click(function () {
        var poeid = $('#selectPoe option:selected').val();
        $('#poeidProduct').val(poeid);
        //alert($('#poeidval').val(poeid));
        $('#productsurveysubmit').submit();
        //Common.ajaxsync({
        //    url: '/DataDumb/GetManagerReport',
        //    data: { 'poeid': poeid },
        //    success: function () {
        //    },
        //    error: function (err) {
        //    }
        //});
    });
    $('#impTeam').click(function () {
        var poeid = $('#selectPoe option:selected').val();
        $('#poeidImpTeam').val(poeid);
        //alert($('#poeidval').val(poeid));
        $('#ImportancTeam').submit();
        //Common.ajaxsync({
        //    url: '/DataDumb/GetManagerReport',
        //    data: { 'poeid': poeid },
        //    success: function () {
        //    },
        //    error: function (err) {
        //    }
        //});
    });
});