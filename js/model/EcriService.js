/*global window,OpenLayers,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

//ECRI Service - Environmental Crossroads Initiative Service
CUR.EcriService = function(){
    var baseUrl = 'proxy.ashx?http://lily.ccny.cuny.edu/rgis/';
    var baseUrlNiger = baseUrl + 'Africa/Niger/';
    
    var callService = function(url, callback){
        $.getJSON(
            url,
            callback  
        );
    };


    return {
        getUpstreamSegments: function(cell, lat, lon, order, callback){
            callService(baseUrlNiger + 'Upstream/Order/' + lat + '/' + lon + '/' + cell + '/' + order, callback);
        },
        getUpstreamSubBasin: function(cell, order, callback){
            callService(baseUrlNiger + 'Subbasin/' + cell + '/' + order, callback);
        },
        getElevation: function(lat,lon, callback){
            callService(baseUrl + 'Africa/Elevation/15sec/' + lat + '/' + lon, callback);
        },
        getUpstreamPopulation: function(cell, callback){
            callService(baseUrlNiger + 'Upstream/Population/' + cell, callback);
        },
        getHistogramData: function(cell, order, callback){
            callService(baseUrlNiger + 'Hist/' + cell + '/' + order + '/Runoff-01/10', callback);
        }
//        getUpstreamCropland: function(lat,lon, callback){
//            callService(baseUrl + 'Africa/Elevation/15sec/' + lat + '/' + lon, callback);
//        },
//        getAnnualDischarge: function(lat,lon, callback){
//            callService(baseUrl + 'Africa/Elevation/15sec/' + lat + '/' + lon, callback);
//        },
//        getAnnualDischargeUtilizing25Percent: function(lat,lon, callback){
//            callService(baseUrl + 'Africa/Elevation/15sec/' + lat + '/' + lon, callback);
//        },
//        getAnnualDischargeUtilizing50Percent: function(lat,lon, callback){
//            callService(baseUrl + 'Africa/Elevation/15sec/' + lat + '/' + lon, callback);
//        }
    };

};