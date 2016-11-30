var startPage = {
    UpdatePageStatus: function (status) {
        Common.ajax({
            url: '/Common/UpdatePageMode?status=' + status,
            success: function (response) {
            },
            error: function (err) {
            }
        });
    },
    LoadGraphScores: function () {
        Common.ajax({
            url: '/Common/UpdatePageMode',
            success: function (response) {
            },
            error: function (err) {
            }
        });
    },
    LoadGoals: function () {
        Common.ajax({
            url: '/Common/UpdatePageMode',
            success: function (response) {
            },
            error: function (err) {
            }
        });
    }
};

$(document).ready(function () {
    $('#btnTextPage').click(function () {
        startPage.UpdatePageStatus(1);
    });
    $('#btnDashBoard').click(function () {
        startPage.UpdatePageStatus(0);
    });
});