/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.HistogramView = Backbone.View.extend({

    titleEl: null,
    chartEl: null,
    titleTemplate:null,
    subTitleTemplate:null,
    
    plot: null,
    
    legendDirectory: 'http://rose.ccny.cuny.edu/~florian/WB/LEGEND/',
    
    initialize:function (options) {
    
        this.titleEl = this.$('.title');
        this.chartEl = this.$('.chart');
        this.subTitleEl = this.$('.subtitle');
        this.legendEl = this.$('.legend');
        
        this.titleTemplate = options.titleTemplate;
        this.subTitleTemplate = options.subTitleTemplate;
        
        
        var buildTooltipContent = function(item){
            var x = item.datapoint[0].toFixed(10),
                y = item.datapoint[1].toFixed(10);
            
            return 'value: ' + x + '<br/>proportion: ' + y;
        };
        
        var showTooltip = function(x, y, contents) {
            $('<div id="histoTooltip" class="tooltip top in"><div class="tooltip-arrow"></div><div class="tooltip-inner">' + contents + '</div></div>').css( {
                position: 'absolute',
                //position: 'relative',
                display: 'none',
                top: y - 95,
                left: x - 48,
                width:'100px'
            }).appendTo('body').fadeIn(200);
        };
        
        var hideTooltip = function(){
            $('#histoTooltip').remove();
        };
        
        
        var _previousPoint = null;         
        this.chartEl.bind("plothover", function (event, pos, item) {
            if (item) {
               
                if (_previousPoint != item.seriesIndex) {
                    
                    _previousPoint = item.seriesIndex;
                    
                    hideTooltip();
                    showTooltip(
                        item.pageX, 
                        item.pageY,
                        buildTooltipContent(item)
                    ); 
                } 
            } else {
            
                hideTooltip();
                _previousPoint = null;   
                          
            }
        });
        
        
        
        //this.render();
    },

    render:function (histData, dataset, timePeriod) {
        
        this.updateTitle(histData, dataset, timePeriod);
        this.updateChart(histData);
        this.updateLegend(dataset, timePeriod);
    
        return this;
    },
    
    timePeriods: {
        'annual': 'annual',
        '01': 'january',
        '02': 'february',
        '03': 'march',
        '04': 'april',
        '05': 'may',
        '06': 'june',
        '07': 'july',
        '08': 'august',
        '09': 'september',
        '10': 'october',
        '11': 'november',
        '12': 'december'
    },
    
    updateTitle: function(histData, dataset, timePeriod){
        this.titleEl.html( 
            this.titleTemplate({
                id: histData.id,
                label: dataset.get('label'),
                timePeriod: this.timePeriods[timePeriod]
            }) 
        );
        this.subTitleEl.html( 
            this.subTitleTemplate({
                avg: histData.avg,
                min: histData.min,
                max: histData.max
            }) 
        );
         
    },
    
    updateLegend: function(dataset, timePeriod){
        
        if( dataset.get('legend') ){
            if(timePeriod === 'annual'){
                this.legendEl.attr('src', this.legendDirectory + dataset.get('legend')['annual'] );
            } else {
                if(dataset.get('legend')['monthly']){
                    this.legendEl.attr('src', this.legendDirectory + _.template( dataset.get('legend')['monthly'] )({month: timePeriod})  );
                }
            }
            this.legendEl.css('display', 'block');
        } else {
            this.legendEl.css('display', 'none');
        }

    },
    
    updateChart: function(data){
        //var _chart = this.$('.chart');
        var d1 = [];
        for(var i=0, len=data.proportions.length; i<len; i++){
            //d1.push({data: [[data.endpoints[i], data.proportions[i]]], highlightColor:'#00FF00'  });
            d1.push({data: [[data.midpoints[i], data.proportions[i]]], color: '#000000'  }); // specify monochromatic bar color
        }
        var width = data.endpoints[1] - data.endpoints[0];
        
        this.plot = $.plot(
            this.chartEl, 
            d1,{
                bars: { show: true, barWidth: width, fill:true, lineWidth:0, fillColor: {colors:[ {opacity: 0.8}, {opacity: 0.8} ]} },
                //bars: { show: true, barWidth: width, lineWidth:1, fill:0.8},
                xaxis: { autoscaleMargin: 0.1 },
                yaxis: { min: 0 /* , max: 1 */ },
                grid: { hoverable: true, clickable: false, borderColor: '#CCCCCC', borderWidth:1 }//,
                //colors: ['#0099EE', '#EE9900']
                //highlightColor: '#FF0000'
            }
        );  
    },
    
    refresh: function(){
        this.plot.setupGrid();
        this.plot.draw();
    }
    



});
