/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.MapLayerHoverView = Backbone.View.extend({
    model: CUR.MapLayer,
    
    initialize:function(options){
        var that = this;
        this.leafletLayer = new L.CartoDBLayerWithZIndex({
            map: options.map,
            user_name: this.model.get('user_name'),
            table_name: this.model.get('table_name'),
            query: "SELECT * FROM {{table_name}}",
            opacity: this.model.get('opacity'),
            zIndex: this.model.get('zIndex'),
            interactivity: this.model.get('interactivity'),
            featureOver: function(e, latlng, pos, data) {
                document.body.style.cursor = 'pointer';               

                that.trigger('hover:over', pos, latlng);
                that.riverSegments.highlightSegment( new CUR.RiverSegment({id: data.id, cartodb_id: data.cartodb_id}) );
//                that.hideTooltip();
//                that.showTooltip(latlng, pos);
            },
            featureOut: function(e, latlng, pos, data) {
                document.body.style.cursor = 'default';
                
                that.trigger('hover:out', pos, latlng);
                that.riverSegments.highlightSegment( null );
                //that.hideTooltip();
            },
            featureClick: function(e, latlng, pos, data) {
                document.body.style.cursor = 'default';
                
                that.trigger('hover:click', pos, latlng);
                that.riverSegments.selectSegment( new CUR.RiverSegment({id: data.id, cartodb_id: data.cartodb_id}) );
            }
        });
        options.map.addLayer(this.leafletLayer);
        

        this.map = options.map;
        //this.tooltip = null;
        
        this.riverSegments = options.riverSegments;
//        this.riverSegments.on('change:selected', function(segment){
//            //alert( segment.get('cartodb_id') + ' ' + segment.get('selected'));
//        });
//        this.riverSegments.on('change:highlighted', function(segment){
//            //alert( segment.get('id') + ' ' + segment.get('selected'));
//            this.tooltip.innerHTML = segment.get('id');
//        }, this);
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