$(document).ready(function () {


     
    // top wcsi button binding
    $('#top-wcsi-index-view').bind('click', function () { Wcsi.landing(); });

    //bind home page WCSI tile
    $('#tile-wcsi-index-view').live('click', function () { Wcsi.landing(); });

    // bind wcsi menu
    $('#tile-map-view').live('click', function () { Wcsi.mapview(); });

    // bind wcsi individual menu
    $('#tile-individual-view').live('click', function () { Wcsi.individualview(); });

    // bind wcsi category menu
    $('#tile-categories-view').live('click', function () { Wcsi.categoryview(); });

    // bind wcsi category menu
    $('#tile-comparision-view').live('click', function () { Wcsi.comparisionview(); });
});

var Wcsi = {
    landing: function () {
        $('body').trigger('loadStarted');
        $('#contents').load('/client/wcsi/Default.aspx', function (response, status, xhr) {
            Common.animate('wcsi-inner-content', function () {
                Page.home();
            });
            // trigger load completed event
            $('body').trigger('loadCompleted');
        });
    },

    mapview: function () {
        $('body').trigger('loadStarted');
        $('#contents').load('../client/wcsi/mapview.aspx', function (response, status, xhr) {
            Common.animate('wcsi-inner-content', function () {
                Wcsi.landing();
            });
            $('#btn-all-menu').show();
            $('#btn-all-menu').unbind('click');
            $('#btn-all-menu').bind('click', function () {
                Wcsi.menu();
            });

            //            Poe.poeMenu('wcsi-poe-menu', 'mapview', function () {
            //                //Wcsi.loadIndividualviewData({ url: '/scripts/sample/individual.txt' });
            //                // trigger load completed event
            //                $('body').trigger('loadCompleted');
            //            },
            Poe.poeMenu('wcsi-poe-menu', 'mapview', function () {
                // Wcsi.loadMapviewData({ url: serviceUrl + 'wcsi.svc/GetMapView' });
                // Wcsi.loadMapviewData({ url: serviceUrl + '/wcsi.svc/GetMapViewByPoe', data: { 'poeid': $('#selectedpoe').html()} });
                Wcsi.mapTopSelectBox('mapview', $('#selectedpoe').html());
                // $('body').trigger('loadCompleted');
            },
            function (e) {
                Wcsi.poeAction(e);
            });
        });
    },

    individualview: function () {
        $('body').trigger('loadStarted');
        $('#contents').load('../client/wcsi/wcsiindividual.aspx', function (response, status, xhr) {
            Common.animate('wcsi-inner-content', function () {
                Wcsi.landing();
            });
            $('#btn-all-menu').show();
            $('#btn-all-menu').unbind('click');
            $('#btn-all-menu').bind('click', function () {
                Wcsi.menu();
            });

            //            Poe.poeMenu('wcsi-poe-menu', 'individualview', function () {
            //   Wcsi.loadIndividualviewData({ url: '/scripts/sample/individual.txt' });
            //            },
            Poe.poeMenu('wcsi-poe-menu', 'individualview', function () {
                //                Wcsi.loadIndividualviewData({ url: serviceUrl + 'wcsi.svc/GetIndividual' });
                //  Wcsi.loadIndividualviewData({ url: serviceUrl + 'wcsi.svc/GetIndividualByPoe', data: { 'poeid': '1'} });
                Wcsi.topSelectBox('individualview', $('#selectedpoe').html());
                // Wcsi.loadIndividualviewData({ url: '/scripts/sample/individual.txt' });
                $('body').trigger('loadCompleted');
            },
            function (e) {
                Wcsi.poeAction(e);
            });
        });
    },
    loadMapviewData: function (option) {
        // load sub contents

        Common.ajax({
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
                var map = new google.visualization.DataTable();
                /* var jsondata = $.parseJSON(response);*/
                var jsondata = response;
                map.addRows(jsondata.length);
                // length gives us the number of results in our returned data
                map.addColumn('number', 'latitude');
                map.addColumn('number', 'longitude');
                map.addColumn('string', 'CountryName');
                map.addColumn('number', 'WCSI');
                map.addColumn({
                    type: 'string',
                    role: 'tooltip',
                    pattern: ''
                });

                // now we need to build the map data, loop over each result
                $.each(jsondata, function (i, v) {
                    var s = v.AverageSalesExecutionPoint;
                    // set the values for both the name and the population
                    map.setValue(i, 0, v.latitude);
                    map.setValue(i, 1, v.longitude);
                    map.setValue(i, 2, v.CountryName);
                    map.setValue(i, 3, v.AverageWcsiScore);
                    map.setValue(i, 4, 'WCSI: ' + v.AverageWcsiScore + ' SE: ' + v.AverageSalesExecutionPoint + ' SC: ' + v.AverageStrategicCapabiltyPoint);

                    // map.setValue(i, 5, v.AverageSalesExecutionPoint.toString());
                });

                // Apply formatter to second column
                // var formatter = new google.visualization.DateFormat({ formatType: 'PatternFormat' }); // Reformat our
                //map.formatter.format(map, 1);
                var options = {
                    displayMode: 'markers',
                    colorAxis: { colors: ['white', 'brown'] },
                    //backgroundColor: '#E6E6E6',
                    backgroundColor: '#484344',

                    legend: { position: 'top', textStyle: { color: 'blue', fontSize: 16} },

                    //                legend: {textStyle: {color: 'blue', fontSize: 16}},
                    datalessRegionColor: '#FFBF00',
                    resolution: 'countries',
                    allowHtml: true
                };

                var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
                chart.draw(map, options);
                //                // finally, create the map!
                //                var geomap = new google.visualization.GeoMap(
                //                    document.getElementById('visualization'));
                //                geomap.draw(map, null);
                if (response != null && response.length != 0) {
                    $('#ErrorMsg').html("");
                } else {
                    $('#ErrorMsg').html("No data found");
                }
                $('body').trigger('loadCompleted');
            },
            error: function (err) {
                $('#chart_div').html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },
    ///

    /*
    loadIndividualviewData: function (option) {
    // load sub contents
    Common.ajax({
    url: option.url,
    data: (option.data) ? option.data : null,
    success: function (response) {
    var _views = $.parseJSON(response);
    var count = 0;
    var source = "<table class='view-table' cellpadding='0' cellspacing='0'>" +
    "{{#each views}}<tr class='{{classname}}'><td width='250'>{{name}}</td><td>{{wcsi}}</td><td>{{salesExec}}</td><td>{{stratigicCap}}</td></tr>{{/each}}" +
    "</table>";

    Handlebars.registerHelper('classname', function () {
    count++;
    return (count % 2 == 0) ? new Handlebars.SafeString("row-gray") : new Handlebars.SafeString("row-white");
    });

    var template = Handlebars.compile(source);
    $('.indv-view-list').html(template({ 'views': _views }));

    // trigger load completed event
    $('body').trigger('loadCompleted');
    },
    error: function (err) {
    $('.indv-view-list').html("<span class='error'>SORRY! Some error has occurred!</span>");
    }
    });
    },*/
    loadIndividualviewData: function (option) {
        // load sub contents
        Common.ajax({
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
                /* var _views = $.parseJSON(response);*/
                var _views = response.WcsiIndividuals;

                if (response != undefined && response != null && response.length != 0) {
                    if (response.WcsiIndividuals != null) {
                        //if (response.WcsiIndividuals != undefined && response.WcsiIndividuals != null) {
                        var count = 0;
                        //                var source = "<table class='view-table' cellpadding='0' cellspacing='0'>" +
                        //                                 "{{#each views}}<tr class='{{classname}}'><td width='250'>{{name}}</td><td>{{wcsi}}</td><td>{{salesExec}}</td><td>{{stratigicCap}}</td></tr>{{/each}}" +
                        //                                 "</table>";
                        var source = "<table class='view-table' cellpadding='0' cellspacing='0'>" +
                        "{{#each views}}<tr class='{{classname}}'><td width='200'>{{fullname this}}</td>{{{image this}}}<td>{{Wcsi}}</td><td>{{SalesExecutionPoint}}</td><td>{{StratigicCapabilityPoint}}</td></tr>{{/each}}" +
                        "</table>";
                        //                var source = "<table class='view-table' cellpadding='0' cellspacing='0'>" +
                        //                                 "{{#each views}}<tr class='{{classname}}'><td width='250'>{{name}}</td><td>{{wcsi}}</td><td>{{salesExec}}</td><td>{{stratigicCap}}</td></tr>{{/each}}" +
                        //                                 "</table>";
                        Handlebars.registerHelper('classname', function () {
                            count++;
                            return (count % 2 == 0) ? new Handlebars.SafeString("row-gray") : new Handlebars.SafeString("row-white");
                        });

                        Handlebars.registerHelper('fullname', function (obj1) {
                            return obj1.Member.FirstName + ' ' + obj1.Member.LastName;
                        });

                        Handlebars.registerHelper('image', function (obj1) {
                            if (obj1.Wcsi < 60) {
                                return '<td  width="50"><img src="../images/red.jpg" /></td>';
                            } else if (obj1.Wcsi >= 60 && obj1.Wcsi < 80) {
                                return '<td  width="50"><img src="../images/orange.jpg" /></td>';
                            } else if (obj1.Wcsi >= 80) {
                                return '<td  width="50"><img src="../images/green.jpg" /></td>';
                            } else {
                                return '<td  width="50"></td>';
                            }
                            //   return '<td><img src="../images/green.jpg" /></td>';
                        });
                        var headerContent = "<table class='view-table' cellpadding='0' cellspacing='0'>" +
                        "<tr><th width='250'>SSP ERP</th><th>WCSI Score</th><th>Sales Execution Score</th><th>Stratigic Capability Score</th></tr></table><div class='indv-view-list'>";
                        var footerContent = "</div>";
                        var template = Handlebars.compile(source);
                        $('.indv-view-wrapper').html(headerContent + template({ 'views': _views }) + footerContent);
                    } else {
                        $('.indv-view-wrapper').html("<div style='color:red'> No Data Found</div>");
                    }
                }

                // trigger load completed event
                $('body').trigger('loadCompleted');
            },
            error: function (err) {
                $('#ErrorMsg').html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },

    categoryview: function () {
        $('body').trigger('loadStarted');
        $('#contents').load('/client/wcsi/categories.aspx', function (response, status, xhr) {
            Common.animate('wcsi-inner-content', function () {
                Wcsi.landing();
            });

            $('#btn-all-menu').show();
            $('#btn-all-menu').unbind('click');
            $('#btn-all-menu').bind('click', function () {
                Wcsi.menu();
            });

            Poe.poeMenu('wcsi-poe-menu', 'categoryview', function () {
                //Wcsi.topSelectBox('categoryview');
                Wcsi.callCategoryview($('#selectedpoe').html(), 'categoryview');
                // Wcsi.loadCategoryviewData({ url: '/scripts/sample/category.txt' });
                // trigger load completed event
            },
            function (e) {
                Wcsi.poeAction(e);
            });
        });
    },
    callCategoryview: function (poeid, page) {
        $('.tile-small-view').removeClass('menu-button-selected');
        $('#' + poeid + "_" + page).addClass('menu-button-selected');
        if (poeid == 0) {
            Wcsi.loadCategoryviewData({ url: serviceUrl + 'wcsi.svc/GetCategoryViewByCategory', data: { 'category': 1 }, category: 1, element: '#top-categories' });
            Wcsi.loadCategoryviewData({ url: serviceUrl + 'wcsi.svc/GetCategoryViewByCategory', data: { 'category': 2 }, category: 2, element: '#mid-categories' });
            Wcsi.loadCategoryviewData({ url: serviceUrl + 'wcsi.svc/GetCategoryViewByCategory', data: { 'category': 3 }, category: 3, element: '#bottom-categories' });
        } else {
            Wcsi.loadCategoryviewData({ url: serviceUrl + 'wcsi.svc/GetCategoryViewByPoeCategory', data: { 'poeid': poeid, 'category': 1 }, category: 1, element: '#top-categories' });
            Wcsi.loadCategoryviewData({ url: serviceUrl + 'wcsi.svc/GetCategoryViewByPoeCategory', data: { 'poeid': poeid, 'category': 2 }, category: 2, element: '#mid-categories' });
            Wcsi.loadCategoryviewData({ url: serviceUrl + 'wcsi.svc/GetCategoryViewByPoeCategory', data: { 'poeid': poeid, 'category': 3 }, category: 3, element: '#bottom-categories' });
        }
    },
    loadCategoryviewData: function (option) {
        // load sub contents
        Common.ajax({
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
                if (response != undefined && response != null && response.length != 0) {
                    // var _views = $.parseJSON(response);
                    var _views = response;
                    var count = 0;
                    //                var source = "<table class='view-table' cellpadding='0' cellspacing='0'>" +
                    //                                 "{{#each views}}<tr class='{{classname}}'><td width='250'>{{name}}</td><td>{{wcsi}}</td><td>{{salesExec}}</td><td>{{stratigicCap}}</td></tr>{{/each}}" +
                    //                                 "</table>";
                    var source = " <table  cellpadding='0' cellspacing='0'><tr><td><table width='100%' cellpadding='5' cellspacing='10'  class='category-view-table'>" +
                    "{{#each views}}<tr><td><table cellpadding='0' cellspacing='0'><tr><td width='50%' valign='bottom' class='font-small'>{{{image}}}<br />{{CountryName}}</td>" +
                    "<td width='40%' class='score' valign='top'>{{AverageWcsiScore}}</td>" +
                    "<td width='10%' valign='top' class='green font-small semi-bold' align='right'><span>{{Difference}}</span> <span>{{Percentage}}%</span></td></tr>" +
                    "</table></td></tr>{{/each}}</table></td></tr></table>";
                    /*  var source = "<table class='view-table' cellpadding='0' cellspacing='0'>" +
                    "{{#each views}}<tr><td>{{AverageWcsiScore}}</td><td>{{CountryName}}</td></tr>{{/each}}" +
                    "</table>";*/

                    Handlebars.registerHelper('image', function (obj1) {
                        if (option.category == 1) {
                            return '<img src="../images/green.png"/>';
                        }
                        else if (option.category == 2) {
                            return '<img src="../images/orange.png"/>';
                        }
                        else if (option.category == 3) {
                            return '<img src="../images/red.png"/>';
                        }
                        else {
                            return ' ';
                        }
                        //   return '<td><img src="../images/green.jpg" /></td>';
                    });
                    Handlebars.registerHelper('classname', function () {
                        count++;
                        return (count % 2 == 0) ? new Handlebars.SafeString("row-gray") : new Handlebars.SafeString("row-white");
                    });

                    var template = Handlebars.compile(source);
                    $(option.element).html(template({ 'views': _views }));
                } else {
                    $(option.element).html("<div style='color:red'> No Data Found</div>");
                }
                // trigger load completed event
                $('body').trigger('loadCompleted');
            },
            error: function (err) {
                $('.indv-view-list').html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },

    comparisionview: function () {
        $('body').trigger('loadStarted');
        $('#contents').load('/client/wcsi/comparision.aspx', function (response, status, xhr) {
            Common.animate('wcsi-inner-content', function () {
                Wcsi.landing();
            });

            $('#btn-all-menu').show();
            $('#btn-all-menu').unbind('click');
            $('#btn-all-menu').bind('click', function () {
                Wcsi.menu();
            });

            Poe.poeMenu('wcsi-poe-menu', 'comparisionview', function () {
                Wcsi.topSelectBox('comparisionview', $('#selectedpoe').html());
                Wcsi.compSelectBox('comparisionview', $('#selectedpoe').html());
                $('body').trigger('loadCompleted');
                // Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonByAreaPoe', data: { 'poeid': '1', 'areaCode': 9 }, element: '#page-contents-yours' });
                //  Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonWorldwideBypoe', data: { 'poeid': '1' }, element: '#page-contents-yours' });
                //  var spoeid = $('#selectedpoe').html()

                // Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonByAreaPoe', data: { 'poeid': '1', 'areaCode': 9 }, element: '#page-contents-area' });
                //   Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonByCountryPoe', data: { 'poeid': '1', 'areaCode': 9, 'countryId': 41 }, element: '#page-contents-area' });
                //Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonByCountryPoe', data: { 'poeid': '1', 'areaCode': 9, 'countryId': 41 }, element: '#page-contents-country' });
                // Wcsi.loadComparisionviewData({ url: '/scripts/sample/comparison1.txt', category: 1, element: '#page-contents-yours' });
                // trigger load completed event
                // $('body').trigger('loadCompleted');
            },
            function (e) {
                Wcsi.poeAction(e);
            });
        });
    },

    loadComparisionviewData: function (option) {
        // load sub contents
        Common.ajax({
            url: option.url,
            data: (option.data) ? option.data : null,
            success: function (response) {
                // var _views = $.parseJSON(response);

                if (response != undefined && response != null && response.length != 0) {
                    var _views = response;
                    var count = 0;
                    var source = "<table width='90%' class='category-view-table' cellpadding='0' cellspacing='10'>" +
                        "{{#views}}<tr>" +

                    "<td width='33%' ><table width='100%' cellpadding='0' cellspacing='5'><tr>" +
                    " <td width='25%' valign='bottom' class='font-small'> {{{image this.AverageWcsiScore}}}<br /> <span>{{Name}}</span> </td>" +
                    " <td class='score' valign='top' width='40%' align='right'> {{AverageWcsiScore}} </td> " +
                    "<td width='10%' valign='top' class={{classname this.AverageWcsiScore}}> <span>{{WcsiDifference}}</span> <span>{{WcsiPercentage}}%</span> </td> </tr> </table> " +
                    "</td>" +
                    " <td width='33%'> <table width='100%' cellpadding='0' cellspacing='5'> <tr>" +
                    " <td width='25%' valign='bottom' class='font-small' > {{{image this.AverageSalesExecutionPoint}}}<br /> <span>{{Name}}</span> </td> " +
                    "<td class='score' valign='top' width='40%' align='right'> {{AverageSalesExecutionPoint}} </td> " +
                    "<td width='10%' valign='top' class={{classname this.AverageSalesExecutionPoint}}> <span>{{SalesExecutionDifference}}</span> <span>{{SalesExecutionPercentage}}%</span> </td> </tr> </table> " +
                    "</td> " +
                    "<td width='33%'> <table width='100%' cellpadding='0' cellspacing='5'> <tr>" +
                    " <td width='25%' valign='bottom' class='font-small'> {{{image this.AverageStrategicCapabiltyPoint}}}<br /> <span>{{Name}}</span> " +
                    "</td> <td class='score'  width='40%' valign='top' align='right'> {{AverageStrategicCapabiltyPoint}} </td>" +
                    " <td width='10%' valign='top' class={{classname this.AverageStrategicCapabiltyPoint}}> <span>{{StrategicCapabiltyDifference}}</span> <span>{{StrategicCapabiltyPercentage}}%</span> </td> </tr> </table> " +
                    "</td> </tr>{{/views}}" +
                    " </table>";

                    /*  "<td><table width='100%' cellpadding='0' cellspacing='5'><tr>" +
                    " <td width='25%' valign='bottom' class='font-small'> {{{image this.AverageWcsiScore}}}<br /> <span>{{Name}}</span> </td>" +
                    " <td class='score' valign='top' width='40%'> {{AverageWcsiScore}} </td> " +
                    "<td width='10%' valign='top' class={{classname this.AverageWcsiScore}}> <span>{{WcsiDifference}}</span> <span>{{WcsiPercentage}}%</span> </td> </tr> </table> " +
                    "</td> <td> <table width='100%' cellpadding='0' cellspacing='5'> <tr>" +
                    " <td width='25%' valign='bottom' class='font-small'> {{{image this.AverageSalesExecutionPoint}}}<br /> <span>{{Name}}</span> </td> " +
                    "<td class='score' valign='top' width='40%'> {{AverageSalesExecutionPoint}} </td> " +
                    "<td width='10%' valign='top' class={{classname this.AverageSalesExecutionPoint}}> <span>{{SalesExecutionDifference}}</span> <span>{{SalesExecutionPercentage}}%</span> </td> </tr> </table> " +
                    "</td> <td> <table width='100%' cellpadding='0' cellspacing='5'> <tr>" +
                    " <td width='25%' valign='bottom' class='font-small'> {{{image this.AverageStrategicCapabiltyPoint}}}<br /> <span>{{Name}}</span> " +
                    "</td> <td class='score'  width='40%' valign='top'> {{AverageStrategicCapabiltyPoint}} </td>" +
                    " <td width='10%' valign='top' class={{classname this.AverageStrategicCapabiltyPoint}}> <span>{{StrategicCapabiltyDifference}}</span> <span>{{StrategicCapabiltyPercentage}}%</span> </td> </tr> </table> " +
                    "</td> </tr>{{/views}}" +
                    " </table>";*/
                    /*   var source = " <table  cellpadding='0' cellspacing='0'><tr><td><table width='100%' cellpadding='5' cellspacing='10'  class='category-view-table'>" +
                    "{{#each views}}<tr><td><table cellpadding='0' cellspacing='0'><tr><td width='50%' valign='bottom' class='font-small'>{{{image}}}<br />{{CountryName}}</td>" +
                    "<td width='40%' class='score' valign='top'>{{AverageWcsiScore}}</td>" +
                    "<td width='10%' valign='top' class='green font-small semi-bold' align='right'><span>{{Difference}}</span> <span>{{Percentage}}%</span></td></tr>" +
                    "</table></td></tr>{{/each}}</table></td></tr></table>";
                    /*  var source = "<table class='view-table' cellpadding='0' cellspacing='0'>" +
                    "{{#each views}}<tr><td>{{AverageWcsiScore}}</td><td>{{CountryName}}</td></tr>{{/each}}" +
                    "</table>";*/
                    Handlebars.registerHelper('image', function (obj1) {
                        if (obj1 < 60) {
                            return '<img src="../images/red.png" />';
                        } else if (obj1 >= 60 && obj1 < 80) {
                            return '<img src="../images/orange.png" />';
                        } else if (obj1 >= 80) {
                            return '<img src="../images/green.png" />';
                        } else {
                            return ' ';
                        }
                        //   return '<td><img src="../images/green.jpg" /></td>';
                    });
                    Handlebars.registerHelper('classname', function (obj1) {
                        if (obj1 < 60) {
                            return 'red font-small semi-bold';
                        } else if (obj1 >= 60 && obj1 < 80) {
                            return 'orange font-small semi-bold';
                        } else if (obj1 >= 80) {
                            return 'green font-small semi-bold';
                        } else {
                            return ' ';
                        }
                        //   return '<td><img src="../images/green.jpg" /></td>';
                    });
                    //                Handlebars.registerHelper('classname', function () {
                    //                    count++;
                    //                    return (count % 2 == 0) ? new Handlebars.SafeString("row-gray") : new Handlebars.SafeString("row-white");
                    //                });

                    var template = Handlebars.compile(source);
                    $(option.element).html(template({ 'views': _views }));
                }
                else {
                    $(option.element).html("<div style='color:red'> No Data Found</div>");
                }

                // trigger load completed event
                $('body').trigger('loadCompleted');
            },
            error: function (err) {
                $('.indv-view-list').html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },
    menu: function () {
        // TODO: this might be dynamic
        var _menu = "<ul><li class='wcsi-map-button-image'><a id='tile-map-view'>Map View</a></li><li class='wcsi-individual-button-image'><a id='tile-individual-view'>Individual View</a></li><li class='wcsi-category-button-image'><a id='tile-categories-view'>Categories View</a></li><li class='wcsi-comparision-button-image'><a id='tile-comparision-view'>Comparision View</a></li></ul>";
        $('#bottom-menu').css({ 'height': '171px', 'margin': '-187px 0 0 0' });
        $('#bottom-menu').html(_menu);
        $('#bottom-menu').toggle(function () {
            $('#bottom-menu').animate({
                "height": "171px"
            }, 300);
        });
    },
    /*
    poeAction: function (e) {
    var _data = $(e).data('value');
    if (_data && _data.length) {
    _data = _data.split('_');
    var _id = _data[0];
    var _type = _data[1];
    var _page = _data[2];

    switch (_type) {
    case 'camsm':
    alert('You have clicked menu - KEY:' + _type + " Poe id: " + _id + " Page: " + _page);
    break;

    case 'ctmsm':
    alert('You have clicked menu - KEY:' + _type + "Poe id: " + _id + " Page: " + _page);
    break;

    case 'camam':
    alert('You have clicked menu - KEY:' + _type + "Poe id: " + _id + " Page: " + _page);
    break;

    case 'oppmgr':
    alert('You have clicked menu - KEY:' + _type + "Poe id: " + _id + " Page: " + _page);
    break;

    default:
    alert('Call default action');
    break;
    }
    }
    }*/

    topSelectBox: function (page, poeid) {
        var source = "<table cellpadding='2' cellspacing='2'>" +
                     "<tr>" +
                     "<td> <div id='" + page + "-area-filter-top'><select class='select-top'><option>-Area-</option></select></div></td>" +
                     "<td><div id='" + page + "-country-filter-top'><select class='select-top'><option>-Country-</option></select></div></td>" +
                     "<td><div id='" + page + "-manager-filter-top'><select class='select-top'><option>-Manager-</option></select></div></td>" +
                     "<td><div id='" + page + "-individual-filter-top'><select class='select-top'><option>-User-</option></select></div></td>" +
                     "</tr>" +
                     "</table>";
        //        var source1 = "<table cellpadding='2' cellspacing='2'>" +
        //                     "<tr>" +
        //                     "<td> <div id='" + page + "-area-filter-top'><select class='select-top1'><option>-select-</option></select></div></td>" +
        //                     "<td><div id='" + page + "-country-filter-top'><select class='select-top1'><option>-select-</option></select></div></td>" +

        //                     "</tr>" +
        //                     "</table>";
        $('#middle-bar').css({ 'margin-top': '-22px' });
        $('#middle-bar').html(source);
        $('.tile-small-view').removeClass('menu-button-selected');
        $('#' + poeid + "_" + page).addClass('menu-button-selected');

        //        $('#filter').html(source1);
        Wcsi.areaFilter(page + '-area-filter-top', page, page + '-country-filter-top', poeid);
    },
    ///

    ///
    areaFilter: function (id, page, nextcontrol, poeid) {
        // load sub contents
        Common.ajax({
            url: serviceUrl + 'base.svc/GetAreasForPoe',
            data: { 'poeid': poeid },
            success: function (response) {
                var _areas = response;
                //    var _poes = $.parseJSON(response);
                var source = "<select class='select' id=" + id + "-select ><option value=0>-Area-</option>" +
                    "{{#each areas}}<option value={{Id}}>{{Name}}</option>{{/each}}" +
                    "</select>";

                var template = Handlebars.compile(source);
                $('#' + id).html(template({ 'areas': _areas }));

                if (page == 'individualview') {
                    var clearMGRbox = "<select class='select-top'><option>-Manager-</option></select>";
                    var clearIndbox = "<select class='select-top'><option>-User-</option></select>";
                    $('#' + page + "-manager-filter-top").html(clearMGRbox);
                    $('#' + page + "-individual-filter-top").html(clearIndbox);
                    if (poeid == '0') {
                        Wcsi.loadIndividualviewData({ url: serviceUrl + 'wcsi.svc/GetIndividual' });
                    } else {
                        Wcsi.loadIndividualviewData({ url: serviceUrl + 'wcsi.svc/GetIndividualByPoe', data: { 'poeid': poeid} });
                    }
                    $('#' + id + '-select').change(function () {
                        var clearMGRbox = "<select class='select-top'><option>-Manager-</option></select>";
                        var clearIndbox = "<select class='select-top'><option>-User-</option></select>";
                        $('#' + page + "-manager-filter-top").html(clearMGRbox);
                        $('#' + page + "-individual-filter-top").html(clearIndbox);
                        if (poeid == '0') {
                            Wcsi.loadIndividualviewData({ url: serviceUrl + 'wcsi.svc/GetIndividualByArea', data: { 'areaCode': $(this).val()} });
                        } else {
                            Wcsi.loadIndividualviewData({ url: serviceUrl + 'wcsi.svc/GetIndividualPoeByArea', data: { 'poeid': poeid, 'areaCode': $(this).val() }, element: '#page-contents-yours' });
                        }
                        //Strength.loadStrengthviewData({ url: serviceUrl + 'Strength.svc/GetPOEModulesScoreByPoeArea', data: { 'poeid': '1', 'areaCode': $(this).val() }, salesExe: '.page-contents1', salesCap: '.page-contents2' }); //poeid=1&practiceArea=2
                        //  Improvement.loadImprovementviewData({ url: serviceUrl + 'Improvement.svc/GetImprovementsByArea', data: { 'poeid': '1', 'practiceArea': '2', 'areaCode': $(this).val() }, header: '#improvement-table-list-header', element: '#improvement-table-list' });
                        Wcsi.countryFilter(nextcontrol, page, { 'poeid': poeid, 'areaCode': $(this).val() }, $(this).val(), poeid);
                    });
                } else if (page == 'comparisionview') {
                    if (poeid == '0') {
                        Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonWorldwide', element: '#page-contents-yours' });
                    } else {
                        Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonWorldwideBypoe', data: { 'poeid': poeid }, element: '#page-contents-yours' });
                    }
                    $('#' + id + '-select').change(function () {
                        var clearMGRbox = "<select class='select-top'><option>-Manager-</option></select>";
                        var clearIndbox = "<select class='select-top'><option>-User-</option></select>";
                        $('#' + page + "-manager-filter-top").html(clearMGRbox);
                        $('#' + page + "-individual-filter-top").html(clearIndbox);

                        if (poeid == '0') {
                            Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonByArea', data: { 'areaCode': $(this).val() }, element: '#page-contents-yours' });
                        } else {
                            Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonByAreaPoe', data: { 'poeid': poeid, 'areaCode': $(this).val() }, element: '#page-contents-yours' });
                        }
                        //Improvement.loadImprovementviewData({ url: serviceUrl + 'Improvement.svc/GetImprovements', data: { 'poeid': '1', 'practiceArea': '2' }, header: '#improvement-table-list-header', element: '#improvement-table-list' }); //poeid=1&practiceArea=2
                        //Improvement.loadImprovementviewData({ url: serviceUrl + 'Improvement.svc/GetImprovementsByArea', data: { 'poeid': '1', 'practiceArea': '2', 'areaCode': $(this).val() }, header: '#improvement-table-list-one-header', element: '#improvement-table-list-one' });
                        Wcsi.countryFilter(nextcontrol, page, { 'poeid': poeid, 'areaCode': $(this).val() }, $(this).val(), poeid);
                    });
                }
            },
            error: function (err) {
                $('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },

    countryFilter: function (id, page, data, area, poeid) {
        // load sub contents
        Common.ajax({
            url: serviceUrl + 'base.svc/GetCountriesForpoe',
            data: data ? data : null,
            success: function (response) {
                var _country = response;
                //    var _poes = $.parseJSON(response);
                var source = "<select class='select' id=" + id + "-select ><option value=0>-Country-</option>" +
                    "{{#each country}}<option value={{Id}}>{{Name}}</option>{{/each}}" +
                    "</select>";

                var template = Handlebars.compile(source);
                $('#' + id).html(template({ 'country': _country }));

                if (page == 'individualview') {
                    $('#' + id + '-select').change(function () {
                        if (poeid == '0') {
                            Wcsi.loadIndividualviewData({ url: serviceUrl + 'wcsi.svc/GetIndividualByCountry', data: { 'areaCode': area, 'countryId': $(this).val()} });
                        } else {
                            Wcsi.loadIndividualviewData({ url: serviceUrl + 'wcsi.svc/GetIndividualPoeByCountry', data: { 'poeid': poeid, 'areaCode': area, 'countryId': $(this).val()} });
                        }
                        var clearSelectbox = "<select class='select-top'><option>-User-</option></select>";
                        $('#' + page + "-individual-filter-top").html(clearSelectbox);

                        // Strength.loadStrengthviewData({ url: serviceUrl + 'Strength.svc/GetPOEModulesScoreByPoeCountry', data: { 'poeid': '1', 'areaCode': area, 'countryId': $(this).val() }, salesExe: '.page-contents1', salesCap: '.page-contents2' }); //poeid=1&practiceArea=2
                        // Improvement.loadImprovementviewData({ url: serviceUrl + 'Improvement.svc/GetImprovementsByCountry', data: { 'poeid': '1', 'practiceArea': '2', 'areaCode': area, 'countryId': $(this).val() }, header: '#improvement-table-list-header', element: '#improvement-table-list' });
                        Wcsi.managerFilter(page + '-manager-filter-top', page, { 'poeid': poeid, 'areaCode': area, 'countryId': $(this).val() }, poeid);
                    });
                }
                else if (page == 'comparisionview') {
                    $('#' + id + '-select').change(function () {
                        var clearSelectbox = "<select class='select-top'><option>-User-</option></select>";

                        $('#' + page + "-individual-filter-top").html(clearSelectbox);

                        if (poeid == '0') {
                            Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonByCountry', data: { 'areaCode': area, 'countryId': $(this).val() }, element: '#page-contents-yours' });
                        } else {
                            Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonByCountryPoe', data: { 'poeid': poeid, 'areaCode': area, 'countryId': $(this).val() }, element: '#page-contents-yours' });
                        }
                        // Strength.loadStrengthviewData({ url: serviceUrl + 'Strength.svc/GetPOEModulesScoreByPoeCountry', data: { 'poeid': '1', 'areaCode': area, 'countryId': $(this).val() }, salesExe: '.page-contents01', salesCap: '.page-contents02' }); //poeid=1&practiceArea=2
                        //Improvement.loadImprovementviewData({ url: serviceUrl + 'Improvement.svc/GetImprovementsByCountry', data: { 'poeid': '1', 'practiceArea': '2', 'areaCode': area, 'countryId': $(this).val() }, header: '#improvement-table-list-one-header', element: '#improvement-table-list-one' });
                        Wcsi.managerFilter(page + '-manager-filter-top', page, { 'poeid': poeid, 'areaCode': area, 'countryId': $(this).val() }, poeid);
                    });
                }
            },
            error: function (err) {
                $('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },

    managerFilter: function (id, page, data, poeid) {
        // load sub contents
        Common.ajax({
            url: serviceUrl + 'base.svc/GetManagerByCountry',
            data: data ? data : null,
            success: function (response) {
                var _country = response;
                //    var _poes = $.parseJSON(response);
                var source = "<select class='select' id=" + id + "-select ><option value=0>-Manager-</option>" +
                    "{{#each country}}<option value={{UserId}}>{{FirstName}} {{LastName}}</option>{{/each}}" +
                    "</select>";

                var template = Handlebars.compile(source);
                $('#' + id).html(template({ 'country': _country }));

                if (page == 'individualview') {
                    $('#' + id + '-select').change(function () {
                        if (poeid == '0') {
                            Wcsi.loadIndividualviewData({ url: serviceUrl + 'wcsi.svc/GetIndividualByManager', data: { 'areaCode': data.areaCode, 'countryId': data.countryId, 'managerId': $(this).val()} });
                        } else {
                            Wcsi.loadIndividualviewData({ url: serviceUrl + 'wcsi.svc/GetIndividualPoeByManager', data: { 'poeid': poeid, 'areaCode': data.areaCode, 'countryId': data.countryId, 'managerId': $(this).val()} });
                        }
                        // Strength.loadStrengthviewData({ url: serviceUrl + 'Strength.svc/GetPOEModulesScoreByPoeManager', data: { 'poeid': '1', 'areaCode': data.areaCode, 'countryId': data.countryId, 'managerId': $(this).val() }, salesExe: '.page-contents1', salesCap: '.page-contents2' }); //poeid=1&practiceArea=2
                        //   Improvement.loadImprovementviewData({ url: serviceUrl + 'Improvement.svc/GetImprovementsByManager', data: { 'poeid': '1', 'practiceArea': '2', 'areaCode': data.areaCode, 'countryId': data.countryId, 'managerId': $(this).val() }, header: '#improvement-table-list-header', element: '#improvement-table-list' });
                        Wcsi.userFilter(page + '-individual-filter-top', page, { 'poeid': poeid, 'managerid': $(this).val() }, data, poeid);
                    });
                } else if (page == 'comparisionview') {
                    $('#' + id + '-select').change(function () {
                        Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonByManager', data: { 'poeid': poeid, 'areaCode': data.areaCode, 'countryId': data.countryId, 'managerId': $(this).val() }, element: '#page-contents-yours' });
                        // Strength.loadStrengthviewData({ url: serviceUrl + 'Strength.svc/GetPOEModulesScoreByPoeManager', data: { 'poeid': '1', 'areaCode': data.areaCode, 'countryId': data.countryId, 'managerId': $(this).val() }, salesExe: '.page-contents01', salesCap: '.page-contents02' }); //poeid=1&practiceArea=2
                        // Improvement.loadImprovementviewData({ url: serviceUrl + 'Improvement.svc/GetImprovementsByManager', data: { 'poeid': '1', 'practiceArea': '2', 'areaCode': data.areaCode, 'countryId': data.countryId, 'managerId': $(this).val() }, header: '#improvement-table-list-one-header', element: '#improvement-table-list-one' });
                        Wcsi.userFilter(page + '-individual-filter-top', page, { 'poeid': poeid, 'managerid': $(this).val() }, data, poeid);
                    });
                }
            },
            error: function (err) {
                $('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },
    userFilter: function (id, page, data, managerdata, poeid) {
        // load sub contents
        Common.ajax({
            url: serviceUrl + 'base.svc/GetTeamMembers',
            data: data ? data : null,
            success: function (response) {
                var _country = response;
                //    var _poes = $.parseJSON(response);
                var source = "<select class='select' id=" + id + "-select ><option value=0>-User-</option>" +
                    "{{#each country}}<option value={{UserId}}>{{FirstName}} {{LastName}}</option>{{/each}}" +
                    "</select>";

                var template = Handlebars.compile(source);
                $('#' + id).html(template({ 'country': _country }));

                if (page == 'individualview') {
                    $('#' + id + '-select').change(function () {
                        if (poeid == '0') {
                            Wcsi.loadIndividualviewData({ url: serviceUrl + 'wcsi.svc/GetIndividualForUser', data: { 'areaCode': managerdata.areaCode, 'countryId': managerdata.countryId, 'managerId': data.managerid, 'memberId': $(this).val()} });
                        } else {
                            Wcsi.loadIndividualviewData({ url: serviceUrl + 'wcsi.svc/GetIndividualPoeForUser', data: { 'poeid': poeid, 'areaCode': managerdata.areaCode, 'countryId': managerdata.countryId, 'managerId': data.managerid, 'memberId': $(this).val()} });
                        }
                        //  Strength.loadStrengthviewData({ url: serviceUrl + 'Strength.svc/GetPOEModulesScoreByPoeForUser', data: { 'poeid': '1', 'areaCode': managerdata.areaCode, 'countryId': managerdata.countryId, 'managerId': data.managerid, 'memberId': $(this).val() }, salesExe: '.page-contents1', salesCap: '.page-contents2' }); //poeid=1&practiceArea=2
                        //   Improvement.loadImprovementviewData({ url: serviceUrl + 'Improvement.svc/GetImprovementsForUser', data: { 'poeid': '1', 'practiceArea': '2', 'areaCode': managerdata.areaCode, 'countryId': managerdata.countryId, 'managerId': data.managerid, 'memberId': $(this).val() }, header: '#improvement-table-list-header', element: '#improvement-table-list' });
                        //      country.countryFilter(nextcontrol, page, { 'areaCode': $(this).val() });
                    });
                }
                else if (page == 'comparisionview') {
                    $('#' + id + '-select').change(function () {
                        Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonForIndividual', data: { 'poeid': poeid, 'areaCode': managerdata.areaCode, 'countryId': managerdata.countryId, 'managerId': data.managerid, 'userId': $(this).val() }, element: '#page-contents-yours' });
                        //   Strength.loadStrengthviewData({ url: serviceUrl + 'Strength.svc/GetPOEModulesScoreByPoeForUser', data: { 'poeid': '1', 'areaCode': managerdata.areaCode, 'countryId': managerdata.countryId, 'managerId': data.managerid, 'memberId': $(this).val() }, salesExe: '.page-contents01', salesCap: '.page-contents02' }); //poeid=1&practiceArea=2
                        // Improvement.loadImprovementviewData({ url: serviceUrl + 'Improvement.svc/GetImprovementsForUser', data: { 'poeid': '1', 'practiceArea': '2', 'areaCode': managerdata.areaCode, 'countryId': managerdata.countryId, 'managerId': data.managerid, 'memberId': $(this).val() }, header: '#improvement-table-list-one-header', element: '#improvement-table-list-one' });
                    });
                }
            },
            error: function (err) {
                $('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },

    //Comparision view
    compSelectBox: function (page, poeid) {
        var source = "<table cellpadding='2' cellspacing='2'>" +
                         "<tr>" +
                         "<td> <div id='" + page + "-area-filter-comp'><select class='select-top'><option>-Area-</option></select></div></td>" +
                         "<td><div id='" + page + "-country-filter-comp'><select class='select-top'><option>-Country-</option></select></div></td>" +

                         "</tr>" +
                         "</table>";
        //  $('#filter').css({ 'margin-top': '-22px' });
        $('#filter').html(source);
        Wcsi.compareaFilter(page + '-area-filter-comp', page, page + '-country-filter-comp', poeid);
    },
    compareaFilter: function (id, page, nextcontrol, poeid) {
        // load sub contents
        Common.ajax({
            url: serviceUrl + 'base.svc/GetAreasForPoe',
            data: { 'poeid': poeid },
            /*data: (option.data) ? option.data : null,*/
            success: function (response) {
                var _areas = response;
                //    var _poes = $.parseJSON(response);
                var source = "<select class='select' id=" + id + "-select ><option value=0>-Area-</option>" +
                    "{{#each areas}}<option value={{Id}}>{{Name}}</option>{{/each}}" +
                    "</select>";

                var template = Handlebars.compile(source);
                $('#' + id).html(template({ 'areas': _areas }));

                if (page == 'comparisionview') {
                    var clearMGRbox = "<select class='select-top'><option>-Manager-</option></select>";
                    var clearIndbox = "<select class='select-top'><option>-User-</option></select>";
                    $('#' + page + "-manager-filter-top").html(clearMGRbox);
                    $('#' + page + "-individual-filter-top").html(clearIndbox);

                    if (poeid == '0') {
                        Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonWorldwide', element: '#page-contents-worldwide' });
                    } else {
                        Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonWorldwideBypoe', data: { 'poeid': poeid }, element: '#page-contents-worldwide' });
                    }

                    $('#' + id + '-select').change(function () {
                        var clearMGRbox = "<select class='select-top'><option>-Manager-</option></select>";
                        var clearIndbox = "<select class='select-top'><option>-User-</option></select>";
                        $('#' + page + "-manager-filter-top").html(clearMGRbox);
                        $('#' + page + "-individual-filter-top").html(clearIndbox);

                        if (poeid == '0') {
                            Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonByArea', data: { 'areaCode': $(this).val() }, element: '#page-contents-area' });
                        } else {
                            Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonByAreaPoe', data: { 'poeid': poeid, 'areaCode': $(this).val() }, element: '#page-contents-area' });
                        }
                        //Improvement.loadImprovementviewData({ url: serviceUrl + 'Improvement.svc/GetImprovements', data: { 'poeid': '1', 'practiceArea': '2' }, header: '#improvement-table-list-header', element: '#improvement-table-list' }); //poeid=1&practiceArea=2
                        //Improvement.loadImprovementviewData({ url: serviceUrl + 'Improvement.svc/GetImprovementsByArea', data: { 'poeid': '1', 'practiceArea': '2', 'areaCode': $(this).val() }, header: '#improvement-table-list-one-header', element: '#improvement-table-list-one' });
                        Wcsi.compcountryFilter(nextcontrol, page, { 'poeid': poeid, 'areaCode': $(this).val() }, $(this).val(), poeid);
                    });
                }
            },
            error: function (err) {
                $('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },

    compcountryFilter: function (id, page, data, area, poeid) {
        // load sub contents
        Common.ajax({
            url: serviceUrl + 'base.svc/GetCountriesForpoe',
            data: data ? data : null,
            success: function (response) {
                var _country = response;
                //    var _poes = $.parseJSON(response);
                var source = "<select class='select' id=" + id + "-select ><option value=0>-Country-</option>" +
                    "{{#each country}}<option value={{Id}}>{{Name}}</option>{{/each}}" +
                    "</select>";

                var template = Handlebars.compile(source);
                $('#' + id).html(template({ 'country': _country }));
                if (page == 'comparisionview') {
                    $('#' + id + '-select').change(function () {
                        var clearSelectbox = "<select class='select-top'><option>-User-</option></select>";
                        $('#' + page + "-individual-filter-top").html(clearSelectbox);

                        if (poeid == '0') {
                            Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonByCountry', data: { 'areaCode': area, 'countryId': $(this).val() }, element: '#page-contents-country' });
                        } else {
                            Wcsi.loadComparisionviewData({ url: serviceUrl + 'wcsi.svc/GetComparisonByCountryPoe', data: { 'poeid': poeid, 'areaCode': area, 'countryId': $(this).val() }, element: '#page-contents-country' });
                        }
                        // Strength.loadStrengthviewData({ url: serviceUrl + 'Strength.svc/GetPOEModulesScoreByPoeCountry', data: { 'poeid': '1', 'areaCode': area, 'countryId': $(this).val() }, salesExe: '.page-contents01', salesCap: '.page-contents02' }); //poeid=1&practiceArea=2
                        //Improvement.loadImprovementviewData({ url: serviceUrl + 'Improvement.svc/GetImprovementsByCountry', data: { 'poeid': '1', 'practiceArea': '2', 'areaCode': area, 'countryId': $(this).val() }, header: '#improvement-table-list-one-header', element: '#improvement-table-list-one' });
                    });
                }
            },
            error: function (err) {
                $('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },

    ////

    mapTopSelectBox: function (page, poeid) {
        var source = "<table cellpadding='2' cellspacing='2'>" +
                     "<tr>" +
                     "<td> <div id='" + page + "-cat-filter-top'><select class='select-top'><option>-AllCategory-</option></select></div></td>" +
                     "</tr>" +
                     "</table>";
        $('#middle-bar').css({ 'margin-top': '-22px' });
        $('#middle-bar').html(source);
        $('.tile-small-view').removeClass('menu-button-selected');
        $('#' + poeid + "_" + page).addClass('menu-button-selected');
        Wcsi.categoryFilter(page + '-cat-filter-top', page, poeid);
    },
    categoryFilter: function (id, page, poeid) {
        // load sub contents
        Common.ajax({
            url: serviceUrl + 'base.svc/GetCategory',
            /*  data: data ? data : null,*/
            success: function (response) {
                var _country = $.parseJSON(response);
                //    var _poes = $.parseJSON(response);
                var source = "<select class='select' id=" + id + "-select ><option value=0>-AllCategory-</option>" +
                    "{{#each country}}<option value={{Id}}>{{Name}}</option>{{/each}}" +
                    "</select>";

                var template = Handlebars.compile(source);
                $('#' + id).html(template({ 'country': _country }));

                if (page == 'mapview') {
                    if (poeid == '0') {
                        Wcsi.loadMapviewData({ url: serviceUrl + '/wcsi.svc/GetMapView' });
                    } else {
                        Wcsi.loadMapviewData({ url: serviceUrl + '/wcsi.svc/GetMapViewByPoe', data: { 'poeid': poeid} });
                    }

                    $('#' + id + '-select').change(function () {
                        if (poeid == '0') {
                            Wcsi.loadMapviewData({ url: serviceUrl + 'wcsi.svc/GetMapViewByCategory', data: { 'category': $(this).val()} });
                        } else {
                            Wcsi.loadMapviewData({ url: serviceUrl + 'wcsi.svc/GetMapViewByPoeCategory', data: { 'poeid': poeid, 'category': $(this).val()} });
                        }
                        //  Strength.loadStrengthviewData({ url: serviceUrl + 'Strength.svc/GetPOEModulesScoreByPoeForUser', data: { 'poeid': '1', 'areaCode': managerdata.areaCode, 'countryId': managerdata.countryId, 'managerId': data.managerid, 'memberId': $(this).val() }, salesExe: '.page-contents1', salesCap: '.page-contents2' }); //poeid=1&practiceArea=2
                        //   Improvement.loadImprovementviewData({ url: serviceUrl + 'Improvement.svc/GetImprovementsForUser', data: { 'poeid': '1', 'practiceArea': '2', 'areaCode': managerdata.areaCode, 'countryId': managerdata.countryId, 'managerId': data.managerid, 'memberId': $(this).val() }, header: '#improvement-table-list-header', element: '#improvement-table-list' });
                        //      country.countryFilter(nextcontrol, page, { 'areaCode': $(this).val() });
                    });
                }
            },
            error: function (err) {
                $('#' + id).html("<span class='error'>SORRY! Some error has occurred!</span>");
            }
        });
    },
    poeAction: function (e) {
        var _data = $(e).data('value');
        if (_data && _data.length) {
            _data = _data.split('_');
            var _id = _data[0];
            //     var _type = _data[1];
            var _page = _data[1];
            $('body').trigger('loadStarted');

            switch (_page) {
                case 'mapview':
                    $('body').trigger('loadStarted');
                    Wcsi.mapTopSelectBox(_page, _id);
                    break;

                case 'individualview':
                    $('body').trigger('loadStarted');
                    Wcsi.topSelectBox(_page, _id);
                    break;
                case 'categoryview':
                    $('body').trigger('loadStarted');
                    Wcsi.callCategoryview(_id);
                    break;
                case 'comparisionview':
                    $('body').trigger('loadStarted');
                    Wcsi.topSelectBox(_page, _id);

                    break;
                default:
                    alert('Call default action');
                    break;
            }
        }
    }
};