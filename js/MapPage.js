/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.MapPage = (function() {



    return {
        init: function(config){
            var layersConfig = [{
                    name: 'africaMask',
                    tables: [{name:'africa_mask'}],
                    label:'Africa Mask',
                    visible: true,
                    isInLegend: false,
                    order:5,
                    mapLayersConfig:[{
                        table: 'africa_mask'
                    }]
                },{
                    name: 'nigerRiverNetwork',
                    tables: [{name:'niger_river_network', interactivity:'cartodb_id, id'}, {name:'nigerriverorderlt5'}],
                    label:'Niger River Network',
                    visible: true,
                    isInLegend: true,
                    legendImage: 'img/legend/activerivernetwork.png',
                    metadataUrl: 'http://tulip.ccny.cuny.edu/~balazs/2010-01%20Papers%20for%20Babak/FeketeCmpRunoff2002.pdf',
                    //interactivity: {tableName: 'niger_river_network', fields:'cartodb_id, id'},
                    order:4,
                    mapLayersConfig:[{
                        table: 'niger_river_network',
                        interactivity: 'cartodb_id, id'
                    },{
                        table: 'nigerriverorderlt5'
                    }]
                },{
                    name: 'lakesAndWetlands',
                    tables: [{name:'glwd_polygon_africa'}],
                    label:'Global Lakes and Wetlands Database',
                    visible: true,
                    isInLegend: true,
                    legendImage: 'img/legend/glwd.png',
                    metadataUrl: 'http://worldwildlife.org/publications/global-lakes-and-wetlands-database-lakes-and-wetlands-grid-level-3',
                    order:3,
                    mapLayersConfig:[{
                        table: 'glwd_polygon_africa'
                    }]
                },{
                    name: 'urbanAreas',
                    tables: [{name:'nigerurbanareas15sec'}],
                    label:'Urban areas in the Niger River basin',
                    visible: true,
                    isInLegend: true,
                    legendImage: 'img/legend/urbanareas.png',
                    metadataUrl: 'http://www.iussp.org/Activities/wgc-urb/balk.pdf',
                    //interactivity: {tableName: 'nigerurbanareas15sec', fields:'cartodb_id,name'},
                    order:2,
                    mapLayersConfig:[{
                        table: 'nigerurbanareas15sec'
                    }]
                },{
                    name: 'nigerRiverBasin',
                    tables: [{name:'nigerbasin15sec'}],
                    label:'Niger River basin',
                    visible: true,
                    isInLegend: true,
                    legendImage: 'img/legend/riverbasinextent.png',
                    metadataUrl: 'http://tulip.ccny.cuny.edu/~balazs/2010-01%20Papers%20for%20Babak/FeketeCmpRunoff2002.pdf',
                    order:1,
                    mapLayersConfig:[{
                        table: 'nigerbasin15sec'
                    }]
                },{
                    name: 'cropland',
                    tables: [{name:'crop_africa'}],
                    label:'Cropland',
                    visible: false,
                    isInLegend: true,
                    legendImage: 'img/legend/cropland.png',
                    metadataUrl: 'http://sage.wisc.edu/pubs/articles/M-Z/Monfreda/MonfredaGBC2008.pdf',
                    opacity:1,
                    order:0,
                    mapLayersConfig:[{
                        table: 'crop_africa'
                    }]
                }
            ];     
    
            // Our overall **AppView** is the top-level piece of UI.
            var AppView = Backbone.View.extend({

                // Instead of generating a new element, bind to the existing skeleton of
                // the App already present in the HTML.
                el: $('body'),

    

                // At initialization we bind to the relevant events on the `Todos`
                // collection, when items are added or changed. Kick things off by
                // loading any preexisting todos that might be saved in *localStorage*.
                initialize: function() {

                    //HACK TO MAKE SURE ANALYSIS TYPE SELECT CLEARS ITSELF. CHANGE/MOVE THIS!!!!!!!!!!
                    //$('#selAnalysisType').val( 'Runoff' ).attr('selected',true);
                    
                    $('#selIndicator').val( '' ).attr('selected',true);
                    $('#selTimePeriod').val( 'annual' ).attr('selected',true);
                    
                    
                
                    var onActiveDatasetChanged = function(dataset, timePeriod){
                        datasets.getHistogramData(
                            riverSegments.selectedSegment, 
                            datasets.activeDataset, 
                            datasets.timePeriod
                        );
                        
                        //TODO: REMOVE THIS HACK
                        CUR.MapPage.setIndicatorOnMap(datasets.activeDataset, datasets.timePeriod);
                    };
                    var onSelectedSegmentChanged = function(segment){
                        datasets.getHistogramData(
                            riverSegments.selectedSegment, 
                            datasets.activeDataset, 
                            datasets.timePeriod
                        );
                        
                        //TODO: REMOVE THIS HACK
                        //CUR.MapPage.setIndicatorOnMap(datasets.activeDataset.get('cartodb'), datasets.timePeriod);
                    };
                    
                    
                  
                
                
                    var layers = new CUR.LayerList(layersConfig);
                    var riverSegments = new CUR.RiverSegmentList();
                    riverSegments.on('change:selected', onSelectedSegmentChanged);
                    
                    var datasets = new CUR.DatasetList();
                    datasets.on('change:active', onActiveDatasetChanged);
                    datasets.on('change:timePeriod', onActiveDatasetChanged);
                
                    var aboutWinView = new CUR.AboutWindowView();
                    var navBarView = new CUR.NavBarView({aboutWin: aboutWinView});
                    var mapView = new CUR.MapView({layers:layers, riverSegments:riverSegments});
                    var infoPanelView = new CUR.InfoPanelView({
                        layers: layers, 
                        riverSegments:riverSegments,
                        datasets: datasets
                    });
                    
                    infoPanelView.on('toggle:show', mapView.resize, mapView);
                    infoPanelView.on('toggle:hide', mapView.resize, mapView);
                    
                    
                    //TODO: REMOVE THIS HACK
                    CUR.MapPage.map = mapView.map;
                    
                    CUR.MapPage.setIndicatorOnMap(datasets.activeDataset, datasets.timePeriod);
                    
                  
                    
                },

                // Re-rendering the App just means refreshing the statistics -- the rest
                // of the app doesn't change.
                render: function() {
                    return this;
                }
                

                
                
            });

            // Finally, we kick things off by creating the **App**.
            var App = new AppView();
            $('a[rel=tooltip]').tooltip({ delay:{show:500, hide:0}}); 
                       
        },
        
        //TODO: REMOVE THESE HACKs
        map: null,
        indicatorMapLayers: {},
        setIndicatorOnMap: function(indicator, timePeriod){
        
            for (var key in this.indicatorMapLayers) {
                this.map.removeLayer( this.indicatorMapLayers[key] );
            }
            
            if(indicator){
                var cartoTable = indicator.get('cartodb');
                if(timePeriod !== 'annual' && indicator.get('cartodbMonthly')){
                    cartoTable = _.template( indicator.get('cartodbMonthly') )({ month:timePeriod });
                
                }
                if( !this.indicatorMapLayers[cartoTable] ){
                    this.indicatorMapLayers[cartoTable] = new L.CartoDBLayerWithZIndex({
                        map: this.map,
                        user_name: 'asrc',
                        table_name: cartoTable,
                        query: "SELECT * FROM {{table_name}}",
                        opacity: 1,
                        zIndex: 2
                    });
                
                }
                this.map.addLayer( this.indicatorMapLayers[cartoTable] );
            }
            
           
            
        }
    };
    
    
    
    
})();








