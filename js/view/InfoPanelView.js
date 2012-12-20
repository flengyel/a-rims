/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};
 
CUR.InfoPanelView = Backbone.View.extend({
    el: $('#infoPanel'),
    
    initialize:function (options) {

        var locationReportView = new CUR.LocationReportView({collection: options.riverSegments});
        var legendView = new CUR.LegendView({collection: options.layers});
        
        
        //NEEDED TO FIX BUG WITH FLOT NOT DISPLAYING CORRECTLY IN HIDDEN TAB
        $('#infoPanelTabs a[data-toggle="tab"]').on('shown', function (e) {
            var tab = $(e.target);
            if( tab.attr('href') === '#tabLocation'){
                locationReportView.refreshHistogram();
            }
            
        })
        
        this.render();

    },

    events:{
        'click .leftHandle':'leftHandleClick'
    },

    render:function () {
        //$(this.el).html(this.template());
        return this;
    },
    
    leftHandleClick:function(e){
        var right = parseInt( $(this.el).css('right'),10 ) ;
    
        if( right == 0 ){
            this.toggle(false);
        } else {
            this.toggle(true);
        }
    },
    
    toggle:function(show){
        var right;
        if(show){
            right = 0;
            
            var that = this;
            this.$el.animate(
                {right: right},
                function(e){
                    that.trigger('toggle:show', that.$el.outerWidth()); 
                    $('.leftHandle').removeClass('toggleLeft');
                    $('.leftHandle').addClass('toggleRight');
                }
            );
            
        } else {
            right = -this.$el.outerWidth();
            
            this.trigger('toggle:hide', 0);
            this.$el.animate(
                {right: right},
                function(e){
                    $('.leftHandle').removeClass('toggleRight');
                    $('.leftHandle').addClass('toggleLeft');
                }
            
            );
            
        }
    }

});