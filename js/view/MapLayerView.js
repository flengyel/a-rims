/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.MapLayerView = Backbone.View.extend({
    model: CUR.MapLayer,
    
    initialize:function(options){
        this.leafletLayer = new L.CartoDBLayerWithZIndex({
            map: options.map,
            user_name: this.model.get('user_name'),
            table_name: this.model.get('table_name'),
            query: "SELECT * FROM {{table_name}}",
            opacity: this.model.get('opacity'),
            zIndex: this.model.get('zIndex') 
        });
        options.map.addLayer(this.leafletLayer);
        

        this.map = options.map;
        this.model.on('change:visible', function(model, vis) {
            if(vis){
                this.map.addLayer(this.leafletLayer);
            } else {
                this.map.removeLayer(this.leafletLayer);
            }

        }, this);
    },
    render:function(){
    
        return this;
    }
});