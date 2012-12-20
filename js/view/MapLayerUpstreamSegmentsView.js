/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.MapLayerUpstreamSegmentsView = Backbone.View.extend({

    UPSTREAM_SEGMENTS_STYLE: { 
        color: '#0055AA',
        opacity: 0.9, 
        clickable: false,
        weight: 3
    },
    UPSTREAM_SEGMENTS_STYLE_ORDER_1: { 
        color: '#EE3333',
        opacity: 0.4, 
        clickable: false,
        weight: 2
    },
    map:null,
    prevMultis: [],
    
    initialize:function(options){
       this.map = options.map;
    },
    
    render:function(){
    
        return this;
    },
    addUpstreamSegments: function(data){

        //INITIALIZE SELECTED
        var selMulti = new L.MultiPolyline([], {clickable:false});
        this.map.addLayer(selMulti);
        this.prevMultis.push({layer:selMulti, hasBeenRemoved:false});
        
        //ADD TO UPSTREAM LAYERS
        var upstream = data.Upstream;         
        var lines = [];
                        
        if($.isEmptyObject(selMulti._layers)){
            //UNCOMMENT THIS
//              _ecriService.getUpstreamPopulation(data.id, function(response){
//                  _clickMarker._popup.setContent('<div><span style="color:#777777;">Accumulated upstream population: </span><span style="color:#000000;font-weight:bold;">' + CUR.addCommas( Math.round(response['Population'])) + ' </span><span style="color:#000000;">people</span</div>');
//              });

            var counter = 0;
            for(var i=0, len=upstream.length; i<len; i++){

                this.staggeredDisplay(
                    counter, 
                    [new L.LatLng(upstream[i].coords[0][1], upstream[i].coords[0][0]), 
                     new L.LatLng(upstream[i].coords[1][1], upstream[i].coords[1][0])],
                     selMulti,
                     i === len - 1,
                     upstream[i].id
                );
                counter += 1;               
            }
        }
        
        
    },
    

    staggeredDisplay: function(i, latlngs, multiLayer, lastOne, id){
        var that = this;
        setTimeout(function(){
        
            var style = that.UPSTREAM_SEGMENTS_STYLE;
//            var weight = (id < 9913) ? 4 : 3
//            if(id > 13301){
//                weight = 3;
//            };
//            if(id > 22377){
//                weight = 2;
//            };
            //if(id > 50377){
            if(id > 117776){
                //weight = 1;
                style = that.UPSTREAM_SEGMENTS_STYLE_ORDER_1;
            };
            
//            var layer = new L.Polyline(
//                latlngs,{
//                    color: that.UPSTREAM_SEGMENTS_STYLE.color, 
//                    opacity: that.UPSTREAM_SEGMENTS_STYLE.opacity, 
//                    clickable: that.UPSTREAM_SEGMENTS_STYLE.clickable,
//                    weight:weight
//                }
//            );

            var layer = new L.Polyline(
                latlngs,
                style
            );
            
            multiLayer.addLayer( layer );

            if(lastOne){
                that.trigger( 'addingSegments:complete', {} );
            };
            
        }, i);
                
    },
    
    removeUpstreamSegments: function(){
        var prevMultis = this.prevMultis;
        for (var i=0, len= prevMultis.length; i<len; i++){
            if(!prevMultis[i].hasBeenRemoved){
                var counter = 1;
                var multiLayer = prevMultis[i].layer;
                multiLayer.setStyle({stroke:false});
                            
                //$('.leaflet-overlay-pane #leaflet-zoom-hide').empty(); 
                multiLayer.eachLayer(function(layer){
                    this.staggeredRemove(multiLayer, layer, this.map, counter);
                    counter += 50;   
                },this);
                prevMultis[i].hasBeenRemoved = true;
            }
        }
    },
    staggeredRemove: function(multiLayer, layer, map, time){
        setTimeout(function(){
            multiLayer.removeLayer(layer);
            layer = null;
            
            if($.isEmptyObject(multiLayer._layers)){
                map.removeLayer(multiLayer);
                multiLayer = null;
            }
            
        }, time);
    }
    
});