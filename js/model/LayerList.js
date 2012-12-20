/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.LayerList = Backbone.Collection.extend({
    model: CUR.Layer,
    
    // Layers are sorted by their display order.
    comparator: function(layer) {
        return layer.get('order');
    }    
});