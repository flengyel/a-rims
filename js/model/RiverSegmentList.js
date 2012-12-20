/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {}
 
CUR.RiverSegmentList = Backbone.Collection.extend({
    model: CUR.RiverSegment,
    
    maxLength: 10,
    
    selectedSegment: null,
    
    highlightedSegment: null,
    
    subBasinStrahlerOrder: 1,
    upstreamSegmentStrahlerOrder: 2,
    
    
    //selectedSegment: null,
    
    initialize: function(options){
        this.ecriService = CUR.EcriService();
        
        this.on('add', function(seg, col, params){
            if(this.length > this.maxLength){
                this.shift();
            }
            //alert(this.at(0).get('id'));
        });
    },
    
    selectSegment: function(segment){
    
//        var currentlySelected = this.getSelectedSegment();
//        if(currentlySelected){
//            currentlySelected.set({'selected' : false});
//        }
//        segment.set({'selected' : true})

        if( this.selectedSegment === segment){
            return;
        }
        
        this.add(segment);
        this.selectedSegment = segment;
        
        
        this.getHistogramData(segment);
        //this.getUpstreamSubBasin(segment);
        this.getUpstreamSegments(segment);
        
        
        this.trigger('change:selected', segment);
        
        
        
    },
    highlightSegment: function(segment){
        if( this.highlightedSegment === segment){
            return;
        }
        this.highlightedSegment = segment;
        this.trigger('change:highlighted', segment);
    },
//    getSelectedSegment: function(){
//        return this.where({selected:true})[0];
//    },

    // Layers are sorted by their display order.
    comparator: function(layer) {
        return layer.get('timestamp');
    },
    
    getHistogramData: function(segment){
        this.trigger('querySent:histogram', segment);
        var that = this;
        this.ecriService.getHistogramData(segment.id, this.upstreamSegmentStrahlerOrder,
            function(resp){
                segment.set({histogram: resp});
                that.trigger('queryReceived:histogram', segment, resp);
            
            }
        );
    },
    
    getUpstreamSubBasin: function(segment){
        this.trigger('querySent:subBasin', segment);
        var that = this;
        this.ecriService.getUpstreamSubBasin(segment.id, this.subBasinStrahlerOrder,
            function(resp){
                that.trigger('queryReceived:subBasin', resp);
            }
        );
    },
    
    getUpstreamSegments: function(segment){
        this.trigger('querySent:upstream', segment);
        var that = this;
        this.ecriService.getUpstreamSegments(segment.id, 0, 0, this.upstreamSegmentStrahlerOrder,
            function(resp){
//                var id = 0;
//                for(var i=0, len=resp.Upstream.length; i<len; i++){
//                    if(resp.Upstream[i].id > id){
//                        id = resp.Upstream[i].id;
//                    }
//                }
            
                that.trigger('queryReceived:upstream', resp);
            
            }
        );
    }
    
   
});