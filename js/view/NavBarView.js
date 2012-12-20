/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.NavBarView = Backbone.View.extend({
    el: $('#navbar'),

    events: {
      'click .aboutOpener'   : 'onAboutOpenerClick'
    },
    
    initialize:function (options) {
        this.aboutWin = options.aboutWin;
        this.render();
    },
    
    render:function () {
        return this;
    },
    
    onAboutOpenerClick: function(e){
        this.aboutWin.showWin( $(e.target).attr('href') );
        return false;
    }
});