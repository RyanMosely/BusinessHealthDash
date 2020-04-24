var gauge1 = loadLiquidFillGauge("fillgauge1", 50);
    var config1 = liquidFillGaugeDefaultSettings();
    config1.circleColor = "#FF7777";
    config1.textColor = "#FF4444";
    config1.waveTextColor = "#FFAAAA";
    config1.waveColor = "#FFDDDD";
    config1.circleThickness = 0.2;
    config1.textVertPosition = 0.2;
    config1.waveAnimateTime = 1000;


    
    function NewValue(){
        if(Math.random() > .5){
            return Math.round(Math.random()*100);
        } else {
            return (Math.random()*100).toFixed(1);
        }
    }
    



   var data = {
    labels: [
      'resilience', 'maintainability', 'accessibility',
      'uptime', 'functionality', 'impact'
    ],
    series: [
      {
        label: '2012',
        values: [4, 8, 15, 16, 23, 42]
      },
      {
        label: '2013',
        values: [12, 43, 22, 11, 73, 25]
      },
      {
        label: '2014',
        values: [31, 28, 14, 8, 15, 21]
      },]
  };
  
  var chartWidth       = 300,
      barHeight        = 20,
      groupHeight      = barHeight * data.series.length,
      gapBetweenGroups = 10,
      spaceForLabels   = 150,
      spaceForLegend   = 150;
  
  // Zip the series data together (first values, second values, etc.)
  var zippedData = [];
  for (var i=0; i<data.labels.length; i++) {
    for (var j=0; j<data.series.length; j++) {
      zippedData.push(data.series[j].values[i]);
    }
  }
  
  // Color scale
  var color = d3.scale.category20();
  var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;
  
  var x = d3.scale.linear()
      .domain([0, d3.max(zippedData)])
      .range([0, chartWidth]);
  
  var y = d3.scale.linear()
      .range([chartHeight + gapBetweenGroups, 0]);
  
  var yAxis = d3.svg.axis()
      .scale(y)
      .tickFormat('')
      .tickSize(0)
      .orient("left");
  
  // Specify the chart area and dimensions
  var chart = d3.select(".chart")
      .attr("width", spaceForLabels + chartWidth + spaceForLegend)
      .attr("height", chartHeight);
  
  // Create bars
  var bar = chart.selectAll("g")
      .data(zippedData)
      .enter().append("g")
      .attr("transform", function(d, i) {
        return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
      });
  
  // Create rectangles of the correct width
  bar.append("rect")
      .attr("fill", function(d,i) { return color(i % data.series.length); })
      .attr("class", "bar")
      .attr("width", x)
      .attr("height", barHeight - 1);
  
  // Add text label in bar
  bar.append("text")
      .attr("x", function(d) { return x(d) - 3; })
      .attr("y", barHeight / 2)
      .attr("fill", "red")
      .attr("dy", ".35em")
      .text(function(d) { return d; });
  
  // Draw labels
  bar.append("text")
      .attr("class", "label")
      .attr("x", function(d) { return - 10; })
      .attr("y", groupHeight / 2)
      .attr("dy", ".35em")
      .text(function(d,i) {
        if (i % data.series.length === 0)
          return data.labels[Math.floor(i/data.series.length)];
        else
          return ""});
  
  chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
        .call(yAxis);
  
  // Draw legend
  var legendRectSize = 18,
      legendSpacing  = 4;
  
  var legend = chart.selectAll('.legend')
      .data(data.series)
      .enter()
      .append('g')
      .attr('transform', function (d, i) {
          var height = legendRectSize + legendSpacing;
          var offset = -gapBetweenGroups/2;
          var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
          var vert = i * height - offset;
          return 'translate(' + horz + ',' + vert + ')';
      });
  
  legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', function (d, i) { return color(i); })
      .style('stroke', function (d, i) { return color(i); });
  
  legend.append('text')
      .attr('class', 'legend')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function (d) { return d.label; });




      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      /*

      var margin = {top: 5, right: 40, bottom: 20, left: 120},
      width = 960 - margin.left - margin.right,
      height = 50 - margin.top - margin.bottom;
  
  var chart = d3.bullet()
      .width(width)
      .height(height);
  
  d3.json("bullets.json", function(error, data) {
    if (error) {throw error};
  
    var svg = d3.select("body").selectAll("svg")
        .data(data)
      .enter().append("svg")
        .attr("class", "bullet")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(chart);
  
    var title = svg.append("g")
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + height / 2 + ")");
  
    title.append("text")
        .attr("class", "title")
        .text(function(d) { return d.title; });
  
    title.append("text")
        .attr("class", "subtitle")
        .attr("dy", "1em")
        .text(function(d) { return d.subtitle; });
  
    d3.selectAll("button").on("click", function() {
      svg.datum(randomize).call(chart.duration(1000)); // TODO automatic transition
    });
  });
  
  function randomize(d) {
    if (!d.randomizer) d.randomizer = randomizer(d);
    d.ranges = d.ranges.map(d.randomizer);
    d.markers = d.markers.map(d.randomizer);
    d.measures = d.measures.map(d.randomizer);
    return d;
  }
  
  function randomizer(d) {
    var k = d3.max(d.ranges) * .2;
    return function(d) {
      return Math.max(0, d + k * (Math.random() - .5));
    };
  }
  
*/


  //BOTTOMGRAPH     /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var currentLables=[];
var chartData=[];
for (var i=11;i>-1;i--){
  currentLables[i] = moment().subtract(i,'days').format("MMM Do");
  chartData[i]= (Math.random()*40)+20
  console.log(currentLables);
}
  const mainChart = document.getElementById("lineChart");

  console.log(mainChart);

  let lineChart = new Chart(mainChart, {
    type: 'line',
    data: {
      labels:currentLables,
      datasets: [
        {
          label: "CAD DOWNLOADS",
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.3)",
          borderColor: "rgba(75,192,192,0.3)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pontBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          //ADD DATA HERE
          data:chartData
        }
      ]
    }
  });