/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.MapLayerSubBasinPolyView = Backbone.View.extend({

    SUBBASIN_POLY_STYLE: { 
        weight: 3, 
        color: '#FFFFFF', 
        opacity: 1, 
        fillColor: '#FFFFFF', 
        fill: true, 
        fillOpacity: 0.3, 
        clickable: false
    },
    
    leafletPoly: null,
    
    map:null,
    
    initialize:function(options){
       this.map = options.map;
    },
    
    render:function(){
        return this;
    },
    
    addSubBasin: function(coords){
        var points = [];
        for(var i=0, len=coords.length; i<len; i++){
            points.push(new L.LatLng(coords[i][1], coords[i][0]));
        }
        

        this.leafletPoly = new L.Polyline(
            points,
            this.SUBBASIN_POLY_STYLE
        );
        

        this.map.addLayer(this.leafletPoly);
        this.leafletPoly.bringToBack();
    },
    
    removeSubBasin: function(){
        if(this.leafletPoly){
            this.map.removeLayer(this.leafletPoly);
            this.leafletPoly = null;
        }
    }
    
    
});