/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.LocationReportView = Backbone.View.extend({
    el: $('#locationReport'),
    
    infoPromptEl: this.$('.infoPrompt'),
    infoPromptTemplate: _.template($('#infoprompt-template').html()),
    infoPromptNullTemplate: _.template($('#infopromptnull-template').html()),
    
    selAnalysisType: null,
    selTimePeriod: null,
    
    histogram: null,
//    histogram2: null,
//    histogram3: null,
//    histogram4: null,
    
    events: {
         'change #selAnalysisType': 'onAnalysisTypeChanged',
         'change #selIndicator': 'onIndicatorChanged',
         'change #selIrrigationLevel': 'onIrrigationLevelChanged',
         'change #selTimePeriod': 'onTimePeriodChanged',
         'keyup #selTimePeriod': 'onSelTimePeriodKeyPress'
    },
    
    initialize:function (options) {
        //this.histogram1 = $('#histogram1');
        
        this.selAnalysisType = this.$('#selAnalysisType');
        
        this.selIndicator = this.$('#selIndicator');
        this.selIrrigationLevel = this.$('#selIrrigationLevel ');
        this.selTimePeriod = this.$('#selTimePeriod');
        
    
        this.collection.on('change:highlighted', this.segmentHighlighted, this);

        //this.collection.on('querySent:histogram', this.segmentQuerySent, this);
        //this.collection.on('queryReceived:histogram', this.segmentQueryReceived, this);
        
        this.datasets = options.datasets;
        this.datasets.on('querySent:histogram', this.segmentQuerySent, this);
        this.datasets.on('queryReceived:histogram', this.segmentQueryReceived, this);
        
        this.datasets.on('change:active', this.onActiveDatasetChanged, this);
        // additional conditions
//        this.collection.on('querySent:histogram2', this.segmentQuerySent, this);
//        this.collection.on('queryReceived:histogram2', this.segmentQueryReceived, this);

//        this.collection.on('querySent:histogram3', this.segmentQuerySent, this);
//        this.collection.on('queryReceived:histogram3', this.segmentQueryReceived, this);
//        
//        // july runoff
//        this.collection.on('querySent:histogram4', this.segmentQuerySent, this);
//        this.collection.on('queryReceived:histogram4', this.segmentQueryReceived, this);
        
    
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
//        if(this.histogram2){
//            this.histogram2.refresh();
//        }
//        if(this.histogram3){
//            this.histogram3.refresh();
//        }
//        if(this.histogram4){
//            this.histogram4.refresh();
//        }
        
        
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
    segmentQueryReceived: function(histogram, dataset, timePeriod){
        this.$el.unmask();
        this.updateHistogram(histogram, dataset, timePeriod);
    },
    updateHistogram: function(histogram, dataset, timePeriod){
    
        if(!this.histogram){
            this.histogram = new CUR.HistogramView({
                el:'#histogram1', 
                titleTemplate: _.template( 
                    $('#histogramtitle-template').html() 
                ),
                subTitleTemplate: _.template( 
                    $('#histogramsubtitle-template').html() 
                ),
            });
        }
        this.histogram.render(histogram, dataset, timePeriod);
        
//        if(!this.histogram2){
//            this.histogram2 = new CUR.HistogramView({
//                el:'#histogram2', 
//                titleTemplate: _.template( 
//                    $('#histogram2title-template').html() 
//                ) 
//            });
//        }
//        this.histogram2.render(segment.get('histogram2'));
//        
//        if(!this.histogram3){
//            this.histogram3 = new CUR.HistogramView({
//                el:'#histogram3', 
//                titleTemplate: _.template( 
//                    $('#histogram3title-template').html() 
//                ) 
//            });
//        }
//        this.histogram3.render(segment.get('histogram3'));
//        
//        // not as parametrized as it should be!!
//        if(!this.histogram4){
//            this.histogram4 = new CUR.HistogramView({
//                el:'#histogram4', 
//                titleTemplate: _.template( 
//                    $('#histogram4title-template').html() 
//                ) 
//            });
//        }
//        this.histogram4.render(segment.get('histogram4'));
        
    },
    
    onAnalysisTypeChanged: function(e){
        this.datasets.setActiveDataset( this.selAnalysisType.val() );  
    },
    
    onTimePeriodChanged: function(e){
        this.datasets.setTimePeriod( this.selTimePeriod.val() );
    },
    
    onSelTimePeriodKeyPress: function(e){
        if( e.keyCode === 38 || e.keyCode === 40 ){
            this.datasets.setTimePeriod( this.selTimePeriod.val() );
        }
    },
    
    onActiveDatasetChanged: function(indicator, timePeriod){
        if(indicator){
             $('#histogramLegend').fadeIn();
        } else {
            $('#histogramLegend').fadeOut();
        }
    
        if( indicator && indicator.get('canChangeTimePeriod') ){
            this.$('#divTimePeriod').fadeIn();
        } else {
            this.$('#divTimePeriod').hide();
        }
        if( indicator && indicator.get('canChangeIrrigationLevel') ){
            this.$('#divIrrigationLevel').fadeIn();
        } else {
            this.$('#divIrrigationLevel').hide();
        }

    },
    
    onIndicatorChanged: function(e){
        var indicator = (this.selIndicator.val() === '') ? null : this.selIndicator.val();
        if(indicator !== ''){
            this.datasets.setActiveDataset( indicator );  
        } 
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
