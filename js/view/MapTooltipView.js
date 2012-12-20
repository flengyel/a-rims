/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.MapTooltipView = Backbone.View.extend({
    //tagName:'div',
    //className: 'wax-tooltip wax-tooltip-0',
    template: _.template($('#maptooltip-template').html()),
    
    initialize:function (options) {
        this.latlngEl = document.createElement('div');
        this.latlngEl.className = 'latlng';
        this.$el.append(this.latlngEl);
        
        this.collection.on('change:highlighted', function(segment){
            //alert( segment.get('id') + ' ' + segment.get('selected'));
        }, this);
    
    
        this.render();
    }, 
    
    render:function(data){
        //this.el.innerHTML = data;
        return this;
    },
    updateLatLng:function(latlng){
        //this.latlngEl.innerHTML = latlng.lat;
        this.$el.html(
            this.template( 
                {
                    lat:latlng.lat.toFixed(4), 
                    lng:latlng.lng.toFixed(4)
                } 
            )
        );
    },
    show: function(pos, latlng){
        var offset = $(this.el.parentNode).offset();
        var el = this.el;
        el.style.display = 'block';
        el.style.left = (pos.x - offset.left + 10) + 'px';// - xOffset + 18 + 'px';
        el.style.top = (pos.y - offset.top - 50) + 'px';// - (yOffset + 4) + 'px';
    },
    hide: function(){
        var el = this.el;
        el.style.display = 'none';
    }
});