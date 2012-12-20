     
     //BOTH OF THESE FUNCTIONS OVERRIDEN TO IMPLEMENT ZINDEX FUNCTIONALITY FOR LAYERS
     //NECESSARY FOR ADDING AND REMOVING LAYERS (NO SHOW HIDE IN LEAFLET, CAN ONLY REMOVE AND ADD.
     //ZINDEX MAINTAINS LAYER ORDER)
     
     
     
if (typeof(L.CartoDBLayerWithZIndex) === "undefined") {

L.CartoDBLayerWithZIndex = L.CartoDBLayer.extend({
     /**
     * Add simple cartodb tiles to the map
     */
    _addSimple: function () {

      // Then add the cartodb tiles
      var tile_style = (this.options.tile_style)? encodeURIComponent(this.options.tile_style.replace(/\{\{table_name\}\}/g,this.options.table_name)) : ''
        , query = encodeURIComponent(this.options.query.replace(/\{\{table_name\}\}/g,this.options.table_name));

      // Add the cartodb tiles
      var cartodb_url = this.generateUrl("tiler") + '/tiles/' + this.options.table_name + '/{z}/{x}/{y}.png?sql=' + query +'&style=' + tile_style;
      
      // extra_params? 
      for (_param in this.options.extra_params) {
         cartodb_url += "&"+_param+"="+this.options.extra_params[_param];
      }

      // zIndex ADDED BY DAVE BURGOON 9/18/2012
      this.layer = new L.TileLayer(cartodb_url,{attribution:'CartoDB', opacity: this.options.opacity, zIndex:this.options.zIndex});

      this.options.map.addLayer(this.layer,false);
    },
 
 
 
    _generateTileJson:  function () {
      //var core_url = this.generateUrl("tiler"); 
      var core_url = this._generateCoreUrl("tiler"); 
      var base_url = core_url + '/tiles/' + this.options.table_name + '/{z}/{x}/{y}';
      var tile_url = base_url + '.png';
      var grid_url = base_url + '.grid.json';
      
      // SQL?
      if (this.options.query) {
        var query = 'sql=' + encodeURIComponent(this.options.query.replace(/\{\{table_name\}\}/g,this.options.table_name));
        tile_url = this._addUrlData(tile_url, query);
        grid_url = this._addUrlData(grid_url, query);
      }
      
      // extra_params? 
      for (_param in this.options.extra_params) {
        tile_url = this._addUrlData(tile_url, _param+"="+this.options.extra_params[_param]);
        grid_url = this._addUrlData(grid_url, _param+"="+this.options.extra_params[_param]);
      }


      // STYLE?
      if (this.options.tile_style) {
        var style = 'style=' + encodeURIComponent(this.options.tile_style.replace(/\{\{table_name\}\}/g,this.options.table_name));
        tile_url = this._addUrlData(tile_url, style);
        grid_url = this._addUrlData(grid_url, style);
      }

      // INTERACTIVITY?
      if (this.options.interactivity) {
        var interactivity = 'interactivity=' + encodeURIComponent(this.options.interactivity.replace(/ /g,''));
        tile_url = this._addUrlData(tile_url, interactivity);
        grid_url = this._addUrlData(grid_url, interactivity);
      }
      
      // Build up the tileJSON
      return {
        blankImage: '../img/blank_tile.png', 
        tilejson: '1.0.0',
        scheme: 'xyz',
        tiles: [tile_url],
        grids: [grid_url],
        tiles_base: tile_url,
        grids_base: grid_url,
        opacity: this.options.opacity,
        
        //ADDED BY DAVE BURGOON 9/18/2012
        zIndex: this.options.zIndex,
        formatter: function(options, data) {
          return data
        }
      };
    },
    
    
    //THIS HAS NOTHING TO DO WITH ZINDEX, JUST REMOVES THE CARTODB LOGO
    _addWadus: function() {
//      if (!document.getElementById('cartodb_logo')) {
//        var cartodb_link = document.createElement("a");
//        cartodb_link.setAttribute('id','cartodb_logo');
//        cartodb_link.setAttribute('style',"position:absolute; bottom:8px; left:8px; display:block; z-index:10000;");
//        cartodb_link.setAttribute('href','http://www.cartodb.com');
//          cartodb_link.setAttribute('target','_blank');
//          cartodb_link.innerHTML = "<img src='http://cartodb.s3.amazonaws.com/static/new_logo.png' style='border:none; outline:none' alt='CartoDB' title='CartoDB' />";
//          this.options.map._container.appendChild(cartodb_link);
//      }
    }
})
}