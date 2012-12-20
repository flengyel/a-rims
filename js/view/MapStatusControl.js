/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};


CUR.MapStatusControl = L.Control.extend({
    $container:null,
    options: {
        position: 'topleft'
    },

    onAdd: function (map) {
        // create the control container with a particular class name
        var container = L.DomUtil.create('div', 'mapStatusControl');
        
        this.$container = $(container);
        this.$container.offset({top:-63, left:45});

        // ... initialize other DOM elements, add listeners, etc.

        return container;
    },
    
    show: function(){
        this.$container.show();
    },
    
    hide: function(){
        this.$container.hide();
    },
    
    setMessage: function(message){
        this.$container.text(message);
    }
    
});