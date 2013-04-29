/*global window,OpenLayers,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

//ECRI Service - Environmental Crossroads Initiative Service
CUR.EcriService = function(){

    var baseUrl = 'http://asrc.cuny.edu/crossroads/rgis/';
    //var baseUrl = 'proxy.ashx?http://asrc.cuny.edu/crossroads/rgis/';
    
    var baseUrlNiger = baseUrl + 'Africa/Niger/';
    
    //TODO: THIS IS JUST A HACK TO TRANSLATE BETWEEN TIMEPERIODS AND WHAT IS EXPECTED BY WEB SERVICE
    //TIMEPERIODS NEED TO BE MANAGED BETTER
    var timePeriods = {
        'annual': '_Annual_2000',
        '01': '01',
        '02': '02',
        '03': '03',
        '04': '04',
        '05': '05',
        '06': '06',
        '07': '07',
        '08': '08',
        '09': '09',
        '10': '10',
        '11': '11',
        '12': '12'
    };
    
//    var histogramTemplates = {
//        'Discharge': { annual:_.template('<%- indicator %>_annual'), monthly:_.template('<%- indicator %>-<%- month %>') },
//        'Runoff': { annual:_.template('<%- indicator %>_Annual_2000'), monthly:_.template('<%- indicator %>-<%- month %>') },
//        'AirTemperature': { annual:_.template('<%- indicator %>'), monthly:_.template('<%- indicator %>-<%- month %>') },
//        'Precipitation': { annual:_.template('<%- indicator %>'), monthly:_.template('<%- indicator %>-<%- month %>') }
//    };
    
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
        
        
        
//        var timePeriodUrl = timePeriods[timePeriod];
//        if(dataset.substring(0,1) === 'q'){
//            timePeriodUrl = '_' + timePeriodUrl.split('_')[1].toLowerCase();
//        }
//        return dataset + timePeriodUrl;


        var output;
        
//        var histogramTemplate;
//        if(dataset.get('name').indexOf('Discharge')>-1){
//            histogramTemplate = histogramTemplates['Discharge'];
//        } else if (dataset.get('name').indexOf('Runoff')>-1){
//            histogramTemplate = histogramTemplates['Runoff']
//        } else if (dataset.get('name').indexOf('AirTemperature')>-1){
//            histogramTemplate = histogramTemplates['AirTemperature']
//        } else if (dataset.get('name').indexOf('Precipitation')>-1){
//            histogramTemplate = histogramTemplates['Precipitation']
//        }
        
        if(timePeriod !== 'annual' && dataset.get('histogram')['monthly']){
            //output = histogramTemplate['annual']({ indicator:dataset.get('histogram')['annual'] });
             
             output = _.template( dataset.get('histogram')['monthly'] )({month: timePeriod});
        } else {
            //output = histogramTemplate['monthly']({ indicator:dataset.get('histogram')['monthly'], month: timePeriods[timePeriod] });
            output = _.template( dataset.get('histogram')['annual'] )({});
        }
        



//        if(dataset.get('name').indexOf('Discharge')>-1){
//            if(timePeriod === 'annual'){
//                output = histogramTemplates['Discharge']['annual']({ indicator:dataset.get('histogram')['annual'] });
//            } else {
//                output = histogramTemplates['Discharge']['monthly']({ indicator:dataset.get('histogram')['monthly'], month: timePeriods[timePeriod] });
//            }
//        }
//        if(dataset.get('name').indexOf('Runoff')>-1){
//            if(timePeriod === 'annual'){
//                output = histogramTemplates['Runoff']['annual']({ indicator:dataset.get('histogram')['annual'] });
//            } else {
//                output = histogramTemplates['Runoff']['monthly']({ indicator:dataset.get('histogram')['monthly'], month: timePeriods[timePeriod] });
//            }
//        }

        
        return output;


    
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
