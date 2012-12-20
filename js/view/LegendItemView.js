/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.LegendItemView = Backbone.View.extend({

    //... is a list tag.
    tagName:  'div',

    className: 'accordion-group',

    // Cache the template function for a single item. 
    template: _.template($('#legenditem-template').html()),

    // The DOM events specific to an item.
    events: {
      'click .toggle'   : 'toggleVisibility'
    },

//    // The TodoView listens for changes to its model, re-rendering. Since there's
//    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
//    // app, we set a direct reference on the model for convenience.
//    initialize: function() {
//      //this.model.bind('change', this.render, this);
//      //this.model.bind('destroy', this.remove, this);
//      this.render();
//    },

    // Re-render the titles of the todo item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      //this.$el.toggleClass('done', this.model.get('done'));
      //this.input = this.$('.edit');
      return this;
    },

    toggleVisibility: function(e) {
        this.model.setVisibility($(e.currentTarget).is(':checked'));
    }

//    // Switch this view into `"editing"` mode, displaying the input field.
//    edit: function() {
//      this.$el.addClass("editing");
//      this.input.focus();
//    },

//    // Close the `"editing"` mode, saving changes to the todo.
//    close: function() {
//      var value = this.input.val();
//      if (!value) this.clear();
//      this.model.save({title: value});
//      this.$el.removeClass("editing");
//    },

//    // If you hit `enter`, we're through editing the item.
//    updateOnEnter: function(e) {
//      if (e.keyCode == 13) this.close();
//    },

//    // Remove the item, destroy the model.
//    clear: function() {
//      this.model.clear();
//    }

});
