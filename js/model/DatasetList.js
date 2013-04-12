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
                name: 'Runoff',
                label: 'runoff at year 2000 irrigation levels'
            },{
                name: 'Runoff25',
                label: 'runoff at 25% over year 2000 irrigation levels'
            },{
                name: 'Runoff50',
                label: 'runoff at 50% over year 2000 irrigation levels'
            }
        ]);
        
        this.activeDataset = this.getDatasetByName('Runoff');

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
                dataset.get('name'),
                timePeriod,
                function(resp){
                    //segment.set({histogram: resp});
                    that.trigger('queryReceived:histogram', resp, dataset, timePeriod);
                }
            );    
        
        }
    
    }
});