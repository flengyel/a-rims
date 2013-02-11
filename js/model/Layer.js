/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.Layer = Backbone.Model.extend({
    // Default attributes for the todo item.
    defaults: function() {
        return {
            visible: true,
            opacity: 1
        };
    },
    
    

    initialize: function(options) {
        this.set({zIndex: this.get('order') + 10 });
//        var mapLayers = [];
//        for(var i=0, len=options.mapLayersConfig.length; i<len; i++){
//            //alert ( (options.mapLayersConfig[i].interactivity  ? options.mapLayersConfig[i].interactivity : ) );
//        
//            mapLayers.push({
//                ui_layer_name: options.name,
//                user_name:'asrc',
//                table_name: options.mapLayersConfig[i].table,
//                interactivity: ( options.mapLayersConfig[i].interactivity  ? options.mapLayersConfig[i].interactivity : null),
//                //query: "SELECT * FROM {{table_name}}",
//                opacity: this.get('opacity'),
//                zIndex: this.get('zIndex')
//            })
//           
//        }
//        this.set({'mapLayers': mapLayers});
        
        var mapLayers =[];
        for(var i=0, len=options.tables.length; i<len; i++){
            if(options.tables[i].interactivity && options.tables[i].interactivity.length > 0){
                mapLayers.push(
                    new CUR.MapLayerHover({
                        user_name:'asrc',
                        table_name: options.tables[i].name,
                        interactivity: options.tables[i].interactivity,
                        //query: "SELECT * FROM {{table_name}}",
                        opacity: this.get('opacity'),
                        zIndex: this.get('zIndex')
                    })
                )
            } else {
                mapLayers.push(
                    new CUR.MapLayer({
                        user_name:'asrc',
                        table_name: options.tables[i].name,
                        //interactivity: ( options.mapLayersConfig[i].interactivity  ? options.mapLayersConfig[i].interactivity : null),
                        query: "SELECT * FROM {{table_name}}",
                        opacity: this.get('opacity'),
                        zIndex: this.get('zIndex')
                    })
                )
            }
           
        }
        this.set({'mapLayers': mapLayers});
        
        this.on('change:visible', function(model, vis){
            var mapLayers = model.get('mapLayers');
            for(var i=0, len=mapLayers.length; i<len; i++){
                mapLayers[i].set('visible', vis);
            }
        })
        
    },

    // Toggle the visible state of this todo item.
    toggle: function() {
        //this.save({visible: !this.get('visible')});
        this.setVisibility(!this.get('visible'));
    },
    setVisibility: function(vis){
        this.set({'visible': vis });
    }
    
//        getMapLayers: function(map){
//            var mapLayers = this.get('mapLayers');
//            if( !mapLayers ){
//                mapLayers = [];
//                mapLayersConfig = this.get('mapLayersConfig')
//                for(var i=0, len=mapLayersConfig.length; i<len; i++){
//                    var layer =new L.CartoDBLayerWithZIndex({
//                        map: map,
//                        user_name:'asrc',
//                        table_name: mapLayersConfig[i].table,
//                        query: "SELECT * FROM {{table_name}}",
//                        opacity: this.get('opacity'),
//                        zIndex: this.get('zIndex') 
//                    })
//                    mapLayers.push(layer);

//                };
//                
//                
//                this.set({'mapLayers': mapLayers});
//            }
//            
//            return this.get('mapLayers');
//        
//        },
    



});
