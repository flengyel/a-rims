/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.AboutWindowView = Backbone.View.extend({
    el: $('#aboutModal'),

    initialize:function () {
        this.tabs = $('#aboutTabs');
        this.tabs.bind('show', function(e) {
            //var tabs = $(this);
            var tab = $(e.target);
            var tabContent = $(tab.attr('href'));
            var url = tabContent.attr('data-html');

            $.ajax( {
                url: url,
                type: 'GET',
                cache: false,
                success: function(html) {
                    tabContent.html(html);
                    tab.tab();
                }
            });
        });
        this.render();
    },
    
    render:function () {
        return this;
    },
        
    showWin: function(tab){
        this.$el.modal('show');
        
        var t = this.tabs.find(tab);
        t.tab('show');
    }
});