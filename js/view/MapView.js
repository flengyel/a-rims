/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.MapView = Backbone.View.extend({
    el: $('#map'),
    
    clickMarker: null,
    myMarkerIcon: null,  // change default icon
    subBasinPolyView: null,
    upstreamSegmentsView:null,
    //statusEl: null,
    mapStatusControl:null,
 
    SUBBASIN_POLY_STYLE: { 
        weight: 3, 
        color: '#FFFFFF', 
        opacity: 1, 
        fillColor: '#FFFFFF', 
        fill: true, 
        fillOpacity: 0.3, 
        clickable: false
    },
    
    initialize:function (options) {
        
        this.riverSegments = options.riverSegments;
        this.layers = options.layers;
        //this.mapLayers = [];
        
        this.initializeMap();
        this.initializeBaseLayers();
        this.initializeMapLayers();
        this.initializeMapTooltip();

        this.initDefMark(); // change the default Leaflet marker
        
        //this.statusEl = $('#mapStatus');

        //ADD CONTROLS
        L.control.scale().addTo(this.map);
        this.mapStatusControl = new CUR.MapStatusControl();
        this.map.addControl(this.mapStatusControl);
        
        this.subBasinPolyView = new CUR.MapLayerSubBasinPolyView({map: this.map});
        this.upstreamSegmentsView = new CUR.MapLayerUpstreamSegmentsView({map: this.map});
        this.upstreamSegmentsView.on('addingSegments:complete', this.onAddingUpstreamSegmentsComplete, this);
        
        //this.riverSegments.on('querySent:subBasin', this.onUpstreamSent, this);
        this.riverSegments.on('queryReceived:subBasin', this.onSubBasinReceived, this);
        
        this.riverSegments.on('querySent:upstream', this.onUpstreamSent, this);
        this.riverSegments.on('queryReceived:upstream', this.onUpstreamReceived, this);

        this.render();
        
    },

    render:function () {
//        var that = this;
//        _.each(this.layers.models, function (item) {
//            that.renderLayer(item, this.map);
//        }, this);
//        return this;
    },
    
    initializeMap: function(){
    
        this.map = new L.Map('map',{
            minZoom:3, 
            maxZoom:15,
            //inertia:false,
            zoomAnimation:false
            //fadeAnimation:false,
            //markerAnimation:false
        });
        
        var pos1 = new L.LatLng(4.38749980926513, -11.587499618530301);
        var pos2 = new L.LatLng(23.9515647888184, 15.860528945922908);
        var bounds = new L.LatLngBounds(pos1,pos2);
        this.map.fitBounds(bounds);
        
    
    },
    
    initializeBaseLayers: function(){
        var streetUrl = 'http://{s}.tiles.mapbox.com/v3/mapbox.mapbox-light/{z}/{x}/{y}.png';
        var street = new L.TileLayer(streetUrl, {maxZoom: 18});

        var terrainUrl = 'http://{s}.tiles.mapbox.com/v3/cunycur.map-150fhhe6/{z}/{x}/{y}.png';
        var terrain = new L.TileLayer(terrainUrl, {maxZoom: 18});
        this.map.addLayer(terrain);
        
        L.control.layers({'Street': street, 'Terrain': terrain}, {}).addTo(this.map);
    
    },
    
    initializeMapLayers: function(){
        var that = this;
        _.each(this.layers.models, function (item) {
            that.renderLayer(item, this.map);
        }, this);
        return this;
    },
    
    initDefMark: function(){
      var myIcon = new L.Icon({
            iconUrl:'img/reddot.png',
            iconSize:[20, 20]
          });
      this.myMarkerIcon = myIcon;
    },
    
    renderLayer: function (item, map) {
        var mapLayers = item.get('mapLayers');
        for(var i=0, len=mapLayers.length; i<len; i++){
            //this.addMapLayer(mapLayers[i], map);
            var view;
            
            if(mapLayers[i].has('interactivity')){
                
                view = new CUR.MapLayerHoverView({
                    model: mapLayers[i],
                    map: map,
                    riverSegments: this.riverSegments
                });
                
                view.on('hover:over', this.showTooltip, this);
                view.on('hover:out', this.hideTooltip, this);
                view.on('hover:click', this.onLayerClick, this);
                
            } else {
            
                view = new CUR.MapLayerView({
                    model: mapLayers[i],
                    map: map
                });
                
            }
            
            
        }
    },
//    addMapLayer: function(mapLayer, map){
//        var view;
//        if(mapLayer.has('interactivity')){
//            view = new CUR.MapLayerHoverView({
//                model: mapLayer,
//                map: map,
//                riverSegments: this.riverSegments
//            });
//            view.on('hover:over', this.showTooltip, this);
//            view.on('hover:out', this.hideTooltip, this);
//            view.on('hover:click', this.onLayerClick, this);
//        } else {
//            view = new CUR.MapLayerView({
//                model: mapLayer,
//                map: map
//            });
//        }
//    },
    
    initializeMapTooltip: function(){
        var tooltipDiv = document.createElement('div');
        tooltipDiv.className = 'wax-tooltip wax-tooltip-0';
        $(this.map._container).append(tooltipDiv);
        this.tooltip = new CUR.MapTooltipView({el: tooltipDiv, collection: this.riverSegments});
    },
    
    resize:function(right){
        var map = this.map;
        var $mapEl = $(map.getContainer());
        
        $mapEl.css({right: right + 'px'});
        var x = $mapEl.outerWidth()/2;
        var y = $mapEl.outerHeight()/2;
        var ll = map.containerPointToLatLng(new L.Point(x, y));
        map.setView(
            ll,
            map.getZoom(), 
            true
        );
        this.map.invalidateSize(false);
    },
   
    showTooltip: function(pos, latlng){
        this.tooltip.show(pos, latlng)
        this.tooltip.updateLatLng(latlng);
    },
    hideTooltip: function(){
        this.tooltip.hide();
    },
    
    onAddingUpstreamSegmentsComplete: function(){
        this.mapStatusControl.hide();
    },
    
    setClickMarkerLatLng: function(latlng){
        if(!this.clickMarker){ 
          // default marker icon changed here
          this.clickMarker = L.marker( latlng, {icon: this.myMarkerIcon}  ).addTo(this.map);
        } else {
            this.clickMarker.setLatLng(latlng);
        }
    },
    
    onLayerClick: function(pos, latlng){
        this.setClickMarkerLatLng(latlng);
        
        this.subBasinPolyView.removeSubBasin();
    },
    
    onSubBasinReceived: function(data){
        this.subBasinPolyView.addSubBasin(data.polygon)
    },

    onUpstreamSent: function(data){
        this.mapStatusControl.setMessage('Querying River Network...');
        this.mapStatusControl.show();
        
        if(this.upstreamSegmentsView){
            this.upstreamSegmentsView.removeUpstreamSegments();
        }

        
//        var leafletLayer = new L.CartoDBLayerWithZIndex({
//            map: this.map,
//            user_name: 'asrc',
//            table_name: 'niger_runoff_2000_01min',
//            query: "SELECT * FROM {{table_name}}",
//            opacity: 1,
//            zIndex: 100
//        });
//        this.map.addLayer(leafletLayer);

        
        
    },
    
    onUpstreamReceived: function(data){
        this.mapStatusControl.setMessage('Loading River Network...');
        
    
        var upstream = data.Upstream;
        var firstPoint = upstream[0].coords[1];
        this.setClickMarkerLatLng( 
            new L.LatLng( firstPoint[1],firstPoint[0] ) 
        )
        
        this.upstreamSegmentsView.addUpstreamSegments(data);
        
        
    }
});
    
