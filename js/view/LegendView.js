/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.LegendView = Backbone.View.extend({
    el: $('#layerList'),
    initialize: function (options) {
        this.render();
    },
    render: function () {
        var that = this;
        _.each(this.collection.models, function (item) {
            if(item.get('isInLegend')){
                that.renderLayer(item);
            }
        }, this);
        return this;
    },
    renderLayer: function (item) {
 
        var legendItemView = new CUR.LegendItemView({
            model: item
        });
        this.$el.append(legendItemView.render().el);
    }
});