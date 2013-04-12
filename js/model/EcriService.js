/*global window,OpenLayers,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

//ECRI Service - Environmental Crossroads Initiative Service
CUR.EcriService = function(){

    var baseUrl = 'http://asrc.cuny.edu/crossroads/rgis/';
    //baseUrl = 'proxy.ashx?http://asrc.cuny.edu/crossroads/rgis/';
    
    var baseUrlNiger = baseUrl + 'Africa/Niger/';
    
    //TODO: THIS IS JUST A HACK TO TRANSLATE BETWEEN TIMEPERIODS AND WHAT IS EXPECTED BY WEB SERVICE
    //TIMEPERIODS NEED TO BE MANAGED BETTER
    var timePeriods = {
        'annual': '_Annual_2000',
        'january': '-01',
        'february': '-02',
        'march': '-03',
        'april': '-04',
        'may': '-05',
        'june': '-06',
        'july': '-07',
        'august': '-08',
        'september': '-09',
        'october': '-10',
        'november': '-11',
        'december': '-12'
    };
    
    var callService = function(url, callback){
        $.getJSON(
            url,
            callback  
        );
    };
    
    var concatenateDatasetAndTimePeriod = function(dataset, timePeriod){
//        if( parseInt(timePeriod, 10) ){
//            return dataset + '-' + timePeriods[timeperiod];
//        } else {
//            return dataset + '_' + timePeriods[timePeriod];
//        }
        return dataset + timePeriods[timePeriod];
    
    };
    
    
//    Runoff_Annual_2000
//    Runoff25_Annual_2000
//    Runoff50_Annual_2000
//    Runoff-07
//    Runoff25-07
//    Runoff50-07


    return {
        getUpstreamSegments: function(cell, lat, lon, order, callback){
            callService(baseUrlNiger + 'Upstream/Order/' + lat + '/' + lon + '/' + cell + '/' + order, callback);
        },
////        getUpstreamSubBasin: function(cell, order, callback){
////            callService(baseUrlNiger + 'Subbasin/' + cell + '/' + order, callback);
////        },
        getElevation: function(lat,lon, callback){
            callService(baseUrl + 'Africa/Elevation/15sec/' + lat + '/' + lon, callback);
        },
        getUpstreamPopulation: function(cell, callback){
            callService(baseUrlNiger + 'Upstream/Population/' + cell, callback);
        },
//        getHistogramData: function(cell, order, field, callback){
//            callService(baseUrlNiger + 'Hist/' + cell + '/' + order + '/' + field + '/10', callback);
//        }
        getHistogramData: function(cell, order, dataset, timePeriod, callback){
            var datasetTimePeriod = concatenateDatasetAndTimePeriod(dataset, timePeriod);
            callService(baseUrlNiger + 'Hist/' + cell + '/' + order + '/' + datasetTimePeriod + '/10', callback);
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
