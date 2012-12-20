﻿/*global window,L,CUR*/
/*jslint plusplus: false */
CUR = window.CUR || {};

CUR.HistogramView = Backbone.View.extend({

    titleEl: null,
    chartEl: null,
    titleTemplate:null,
    
    plot: null,
    
    initialize:function (options) {
    
        this.titleEl = this.$('.title');
        this.chartEl = this.$('.chart');
        
        this.titleTemplate = options.titleTemplate;
        
        
        var buildTooltipContent = function(item){
            var x = item.datapoint[0].toFixed(10),
                y = item.datapoint[1].toFixed(10);
            
            return 'X: ' + x + '<br/>Y: ' + y;
        };
        
        var showTooltip = function(x, y, contents) {
            $('<div id="histoTooltip" class="tooltip top in"><div class="tooltip-arrow"></div><div class="tooltip-inner">' + contents + '</div></div>').css( {
                position: 'absolute',
                display: 'none',
                top: y - 55,
                left: x - 46,
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
                    showTooltip(item.pageX, 
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

    render:function (data) {
        
        this.updateTitle(data);
        this.updateChart(data);
    
        return this;
    },
    
    updateTitle: function(data){
        this.titleEl.html( this.titleTemplate( data ) );
    },
    
    updateChart: function(data){
        //var _chart = this.$('.chart');
        var d1 = [];
        for(var i=0, len=data.proportions.length; i<len; i++){
            d1.push({data: [[data.endpoints[i], data.proportions[i]]], highlightColor:'#00FF00'  });
        }
        var width = data.endpoints[1] - data.endpoints[0];
        
        this.plot = $.plot(
            this.chartEl, 
            d1,{
                bars: { show: true, barWidth: width, fill:true, lineWidth:0, fillColor: {colors:[ {opacity: 0.8}, {opacity: 0.8} ]} },
                //bars: { show: true, barWidth: width, lineWidth:1, fill:0.8},
                xaxis: { autoscaleMargin: 0.1 },
                yaxis: { min: 0 },
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