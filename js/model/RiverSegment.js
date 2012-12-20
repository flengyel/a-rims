/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {}

CUR.RiverSegment = Backbone.Model.extend({
    // Default attributes for the todo item.
    defaults: function() {
        return {
            
        };
    },

    initialize: function() {
    
        this.set({ 'timestamp': new Date().toUTCString() });
        
    },


    // Remove this Todo from *localStorage* and delete its view.
    clear: function() {
        this.destroy();
    }
    
    

});