/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.DatasetList = Backbone.Collection.extend({
    
    model: CUR.Dataset,
    
    upstreamHistogramStrahlerOrder: 2,
    
    activeDataset: null,
    
    //TODO: TIMEPERIODS NEED TO BE MANAGED BETTER. 
    timePeriod: 'annual',
    
    initialize: function(){
        this.ecriService = CUR.EcriService();


        this.add([
            {
                name: 'Discharge',
                label: 'discharge at year 2000 irrigation levels',
                cartodb: 'niger_discharge_2000_06min',
                cartodbMonthly: 'discharge_2000_<%- month %>_6min',
                //histogram: {annual:'q_dist_1m', monthly:'Discharge'},
                histogram: {annual:'q_dist_1m_annual', monthly:'Discharge-<%- month %>'},
                legend: {annual:'Niger_Discharge_2000_06min_Legend.jpg', monthly:'Discharge_<%- month %>_2000_06min_Legend.jpg' }
            },{
                name: 'Discharge25',
                label: 'discharge at 25% over year 2000 irrigation levels',
                cartodb: 'niger_discharge25_2000_06min',
                cartodbMonthly: 'discharge25_2000_<%- month %>_6min',
                //histogram: {annual:'q_dist25_1m', monthly:'Discharge25'},
                histogram: {annual:'q_dist25_1m_annual', monthly:'Discharge25-<%- month %>'},
                legend: {annual:'Niger_Discharge25_1000_06min_Legend.jpg', monthly:'Discharge25_<%- month %>_2000_06min_Legend.jpg' }
            },{
                name: 'Discharge50',
                label: 'discharge at 50% over year 2000 irrigation levels',
                cartodb: 'niger_discharge50_2000_06min',
                cartodbMonthly: 'discharge50_2000_<%- month %>_6min',
                //histogram: {annual:'q_dist50_1m', monthly:'Discharge50'},
                histogram: {annual:'q_dist50_1m_annual', monthly:'Discharge50-<%- month %>'},
                legend: {annual:'Niger_Discharge50_2000_06min_Legend.jpg', monthly:'Discharge50_<%- month %>_2000_06min_Legend.jpg' }
            },{
                name: 'Runoff',
                label: 'runoff at year 2000 irrigation levels',
                cartodb: 'niger_runoff_2000_06min',
                cartodbMonthly: 'runoff_2000_<%- month %>_6min',
                //histogram: {annual:'Runoff', monthly:'Runoff'},
                histogram: {annual:'Runoff_Annual_2000', monthly:'Runoff-<%- month %>'},
                legend: {annual:null, monthly:'Runoff_<%- month %>_2000_06min_Legend.jpg' }
            },{
                name: 'Runoff25',
                label: 'runoff at 25% over year 2000 irrigation levels',
                cartodb: 'niger_runoff25_2000_06min',
                cartodbMonthly: 'runoff25_2000_<%- month %>_6min',
                //histogram: {annual:'Runoff25', monthly:'Runoff25'}
                histogram: {annual:'Runoff25_Annual_2000', monthly:'Runoff25-<%- month %>'}
            },{
                name: 'Runoff50',
                label: 'runoff at 50% over year 2000 irrigation levels',
                cartodb: 'niger_runoff50_2000_06min',
                cartodbMonthly: 'runoff50_2000_<%- month %>_6min',
                //histogram: {annual:'Runoff50', monthly:'Runoff50'},
                histogram: {annual:'Runoff50_Annual_2000', monthly:'Runoff50-<%- month %>'}
            },{
                name: 'AirTemperature',
                label: 'air temperature',
                cartodb: 'Global_AirTemperature_2000_30min',
                cartodbMonthly: 'AirTemp_2000_<%- month %>_30min',
                //histogram: {annual:'AirTemperature_2000', monthly:'AirTemperature_2000'},
                histogram: {annual:'AirTemperature_2000', monthly:'AirTemperature_2000-<%- month %>'},
                legend: {annual:'Global_AirTemperature_2000_30min_Legend.jpg', monthly:'AirTemp_<%- month %>_2000_30min_Legend.jpg' }
            },{
                name: 'Precipitation',
                label: 'precipitation',
                cartodb: 'Global_Precipitation_2000_30min',
                cartodbMonthly: 'Precip_2000_<%- month %>_30min',
                //histogram: {annual:'Precipitation_2000', monthly:'Precipitation_2000'},
                histogram: {annual:'Precipitation_2000', monthly:'Precipitation_2000-<%- month %>'},
                legend: {annual:'Global_Precipitation_2000_30min_Legend.jpg', monthly:'Precip_2000_<%- month %>_30min_Legend.jpg' }
            },{
                name: 'DischargeByPopulation',
                label: 'discharge by population',
                cartodb: 'discharge_by_population_dist_2000_01min',
                cartodbMonthly: null,
                //histogram: {annual:'Precipitation_2000', monthly:'Precipitation_2000'},
                histogram: {annual:'Discharge_by_Pop_Dist_2000', monthly:null},
                legend: {annual:'Discharge_By_Population_Dist_2000_01min_Legend.jpg', monthly:null }
            },{
                name: 'DischargeByPopulation',
                label: 'discharge by population',
                cartodb: 'discharge_by_population_dist_2000_01min',
                cartodbMonthly: null,
                //histogram: {annual:'Precipitation_2000', monthly:'Precipitation_2000'},
                histogram: {annual:'Discharge_by_Pop_Dist_2000', monthly:null},
                legend: {annual:'Discharge_By_Population_Dist_2000_01min_Legend.jpg', monthly:null }
            },{
                name: 'DischargeByPopulation25',
                label: 'discharge by population at 25% over year 2000 irrigation levels',
                cartodb: 'discharge_by_population_dist25_2000_01min',
                cartodbMonthly: null,
                //histogram: {annual:'Precipitation_2000', monthly:'Precipitation_2000'},
                histogram: {annual:'Discharge_by_Pop_Dist25_2000', monthly:null},
                legend: {annual:'Discharge_By_Population_Dist25_2000_01min_Legend.jpg', monthly:null }
            },{
                name: 'DischargeByPopulation50',
                label: 'discharge by population at 50% over year 2000 irrigation levels',
                cartodb: 'discharge_by_population_dist50_2000_01min',
                cartodbMonthly: null,
                //histogram: {annual:'Precipitation_2000', monthly:'Precipitation_2000'},
                histogram: {annual:'Discharge_by_Pop_Dist50_2000', monthly:null},
                legend: {annual:'Discharge_By_Population_Dist50_2000_01min_Legend.jpg', monthly:null }
            },{
                name: 'RunoffByPopulation',
                label: 'runoff by population',
                cartodb: 'runoff_by_population_dist_2000_01min',
                cartodbMonthly: null,
                //histogram: {annual:'Precipitation_2000', monthly:'Precipitation_2000'},
                histogram: {annual:'Runoff_by_Pop_Dist_2000', monthly:null}
            },{
                name: 'RunoffByPopulation25',
                label: 'runoff by population at 25% over year 2000 irrigation levels',
                cartodb: 'runoff_by_population_dist25_2000_01min',
                cartodbMonthly: null,
                //histogram: {annual:'Precipitation_2000', monthly:'Precipitation_2000'},
                histogram: {annual:'Runoff_by_Pop_Dist25_2000', monthly:null}
                
            },{
                name: 'RunoffByPopulation50',
                label: 'runoff by population at 50% over year 2000 irrigation levels',
                cartodb: 'runoff_by_population_dist50_2000_01min',
                cartodbMonthly: null,
                //histogram: {annual:'Precipitation_2000', monthly:'Precipitation_2000'},
                histogram: {annual:'Runoff_by_Pop_Dist50_2000', monthly:null}
            }
        ]);
        
        this.activeDataset = this.getDatasetByName('Discharge');

    },
    
    getDatasetByName: function(name){
        return this.find(function(dset){
            return dset.get('name') === name;
        });
    },
    
    setActiveDataset: function(name){

        var dataset = this.getDatasetByName(name);
        
        if(this.activeDataset === dataset){
            return;
        }
        
        this.activeDataset = dataset;
        
        this.trigger('change:active', this.activeDataset, this.timePeriod);
    },
    
    setTimePeriod: function(timePeriod){
        this.timePeriod = timePeriod;
        this.trigger('change:timePeriod', this.activeDataset, this.timePeriod);
    },
    
    
    
    getHistogramData: function(segment, dataset, timePeriod){
        if(segment && dataset && timePeriod){
            this.trigger('querySent:histogram', segment);
            var that = this;
            this.ecriService.getHistogramData(
                segment.id, 
                this.upstreamHistogramStrahlerOrder,
                //dataset.get('histogram'),
                dataset,
                timePeriod,
                function(resp){
                    //segment.set({histogram: resp});
                    that.trigger('queryReceived:histogram', resp, dataset, timePeriod);
                }
            );    
        
        }
    
    }
});