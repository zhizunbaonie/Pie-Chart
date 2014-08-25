(function( $ ) {'use strict';

  $.fn.pieChart = function( options ) {

    var defaults = {
      width: 500, //width of svg element
      height: 500, //height of svg element
      radius: 110,//radius of a circle
      innerRadius: 40,//inner radius of the circle
      data: false,//data in json format [{"title": "title 1", "value": 20, "color":#3333,"description":"description 1"},...]
      lightBox: '#pieLightBox',//light box id or class
      title: '.title', //title box inside of light box
      desc: '.desc',//description box inside of light box
      labelColor: '#2b79ec', //color of labels
      labelActive: '#333333'
    };

    var opt = $.extend( {}, defaults, options );

    var textOffset = 30,
        width = opt.width,
        height = opt.height,
        radius = opt.radius,
        innreRadius = opt.innerRadius,
        id = $(this).attr('id');

    //Adding svg to the box
    var pieChart = d3.select('#'+id)
      .append('svg')
      .attr('id', id+'Svg')
      .attr('width', width)
      .attr('height', height);

    //Creatin group to pie Chart
    var group = pieChart.append('g')
      .attr('transform', 'translate('+width/2+', '+height/2+')')
      .attr('class', 'group');

    //Creating sector of a circle
    var arc = d3.svg.arc()
      .startAngle(function(d){ return d.startAngle; })
      .endAngle(function(d){ return d.endAngle; })
      .innerRadius(innreRadius)
      .outerRadius(radius);

    //Creating a pie from d3 layout pie
    var pie = d3.layout.pie()
      .value(function(d){ return d.value});

    var path, labels;

    //Method render
    this.render = function(data){

      if(data.length < 1 || !data || typeof data !='object'){ return false;}
      //removing old sectors
      group.selectAll(".arc").remove();

      //Selecting all sectors in svg
      var arcs = group.selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class','arc');

      //Adding Path to the Svg and click event on the sector
      path = arcs.append('path')
        .attr('d', arc)
        .attr('class', 'path')
        .attr('fill',function(d){ return d.data.color; })
        .on('click', function(d,i){
          showDesc(d,this,i);
        });

      //Adding Title text to the sectors
      labels = arcs.append('svg:text')
        .attr("class", "title")
        .attr("transform", function(d) {
          return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (radius+textOffset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (radius+textOffset) + ")";
        })
        .attr("dy", function(d){
          if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
            return 5;
          } else {
            return -7;
          }
        })
        .attr("text-anchor", function(d){
          if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
            return "beginning";
          } else {
            return "end";
          }
        })
        .attr("fill", opt.labelColor)
        .each(function(d){
          var txt = d.data.value + " % " + d.data.title;//title text
          var arr = txt.split(' ');//array of words
          var lengthPerRow = 20;//approximately size of text chars in one row
          var rows = Math.ceil(txt.length/lengthPerRow);//approximately rows
          var iterations = Math.ceil(arr.length/rows);//how many elements from array join to one row
          for(var i = 0; i<=arr.length; i++){
            var text = arr.splice(0,iterations).join(' ');
            if (text != '') {
              d3.select(this).append("svg:tspan")
                .attr("x", 0)
                .attr("dy", "1em")
                .text(text);
            }//if
          }//for
        });


      //Adding lines to the sectors
      arcs.append("line")
        .attr('class', 'line')
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", -(radius /1.6 + innreRadius/2))
        .attr("y2", -radius-20)
        .attr("stroke", "#dddddd")
        .attr("transform", function(d) {
          return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
        });
    }//render method

    function showDesc(d,el,i){
      var box = $(opt.lightBox);
      //Adding active class to current clicked sector and remove it from other
      var pathClass = $(el).attr('class');
      $(path[0]).attr('class', pathClass);
      $(el).attr('class', pathClass + ' active');
      //Adding Active class to label
      var labelCalss = 'title';
      $(labels[0]).attr({'class':labelCalss, 'fill': opt.labelColor});
      $(labels[0]).eq(i).attr({'class':labelCalss + ' active', 'fill':opt.labelActive});
      //append content to light box and show it
      box.find(opt.desc).text(d.data.description);
      box.find(opt.title).text(d.data.title);
      box.css({left:d3.event.pageX+'px',top:d3.event.pageY+'px'}).show();
    }//showDesc

    //Hiding Ligth Box when click out of the sector
    $(document).on('click.pie-light-box.hide', function(e){
      e.stopPropagation();
      var targetClass = $(e.target).attr('class');
      targetClass = typeof targetClass != 'undefined'? targetClass : '';
      if(targetClass.indexOf('path')!= 0 ){
        $(opt.lightBox).hide();
        $(labels[0]).attr({'class':'title', 'fill': opt.labelColor});
        $(path[0]).attr('class', 'path');
      }//if
    });

    //Executing rendor method
    this.render(opt.data);
    return this;

  };

})( jQuery );
