/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.LocationReportView = Backbone.View.extend({
    el: $('#locationReport'),
    
    infoPromptEl: this.$('.infoPrompt'),
    infoPromptTemplate: _.template($('#infoprompt-template').html()),
    infoPromptNullTemplate: _.template($('#infopromptnull-template').html()),
    
    histogram: null,
    
    
    initialize:function () {
        //this.histogram1 = $('#histogram1');
    
        this.collection.on('change:highlighted', this.segmentHighlighted, this);
        this.collection.on('querySent:histogram', this.segmentQuerySent, this);
        this.collection.on('queryReceived:histogram', this.segmentQueryReceived, this);
        
    
        //this.$el.mask('loading...');
    
        this.render();
    },

    render:function () {
        return this;
    },
    refreshHistogram: function(){
        if(this.histogram){
            this.histogram.refresh();
        }
        
    },
    segmentHighlighted: function(segment){
        if(segment){
            this.infoPromptEl.html( this.infoPromptTemplate(segment.toJSON()) );
        } else {
            this.infoPromptEl.html( this.infoPromptNullTemplate('') );
        }
    },
    segmentQuerySent: function(segment){
        this.$el.mask('loading...');
    },
    segmentQueryReceived: function(segment){
        this.$el.unmask();
        this.updateHistogram(segment);
    },
    updateHistogram: function(segment){
    
        if(!this.histogram){
            this.histogram = new CUR.HistogramView({
                el:'#histogram1', 
                titleTemplate: _.template( 
                    $('#histogram1title-template').html() 
                ) 
            });
        }
        this.histogram.render(segment.get('histogram'));
        
        //this.updateChart(segment.get('histogram'));
        
    }
//    ,
//    updateChart: function(data, status){
//        var _chart = $('.chart', '#histogram1');
//        var d1 = [];
//        for(var i=0, len=data.proportions.length; i<len; i++){
//            d1.push({data: [[data.endpoints[i], data.proportions[i]]], highlightColor:'#00FF00'  });
//        }
//        var width = data.endpoints[1] - data.endpoints[0];
//        var plot = $.plot(
//            _chart, 
//            d1,{
//                bars: { show: true, barWidth: width, fill:true, lineWidth:0, fillColor: {colors:[ {opacity: 0.8}, {opacity: 0.8} ]} },
//                //bars: { show: true, barWidth: width, lineWidth:1, fill:0.8},
//                xaxis: { autoscaleMargin: 0.1 },
//                yaxis: { min: 0 },
//                grid: { hoverable: true, clickable: false, borderColor: '#CCCCCC', borderWidth:1 }//,
//                //colors: ['#0099EE', '#EE9900']
//                //highlightColor: '#FF0000'
//            }
//        );  
//    }
});