//Step 1: Set up our chart
//set svg dimensions
var svgWidth = 960;
var svgHeight = 500;

//set borders in svg
var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

//calculate chart height and width
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper
//append an svg element to the chart with appropriate height and width
// =================================
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
// Append a div to the body to create tooltips, assign it a class
d3.select(".chartGroup").append("div").attr("class", "tooltip").style("opacity", 0);
// Step 3:
// Import data from the All_airbnb_listings.csv file
// =================================
d3.csv("assets/data/All_airbnb_listings.csv").then(function(airbnbData) {
    //console.log(airbnbData)
    // Step 4: Parse Data 
    //==============================
   // Create a function to parse date and time
  var parseTime = d3.timeParse ("%Y-%m-%d");
   
   //   // Format the data
  airbnbData.forEach(function(data) {
      //console.log(data.date)
      //data.date = parseTime(data.date);
      //console.log(data.date)
      data.price = +data.price;
    //console.log(data.date)
     //console.log(data.price)
    });
    // Step 5: Create Scales
  //==============================
  // define the x scale (horizontal)
     //var xLinearScale = d3.scaleLinear().range([0, width]);
   //var yLinearScale = d3.scaleLinear().range([height, 0]);
// create scales
  //  var xTimeScale = d3.scaleTime()
  //   .domain([0, width])
  //   .range(d3.extent(airbnbData, function(d) {
  //    return d3.timeParse(d.date);
  //   }));
    
     //.domain(d3.extent(airbnbData, d => d.date))
     //.range([0, width]);
   var xTimeScale = d3.scaleTime()
     .domain([new Date("2015-01-01"), new Date("2019-12-31")])
     .range([0, 1000]);
           
   var yLinearScale = d3.scaleLinear()
     .domain([0, d3.max(airbnbData, d => d.price)])
     .range([height, 0]);

// create axes
  var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%Y-%m-%d"));;
  var leftAxis = d3.axisLeft(yLinearScale);
   // append axes
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .attr("class","bottomAxis")
    .call(bottomAxis);
  chartGroup.append("g")
    .attr("class","leftAxis")
    .call(leftAxis);

 
// Date formatter to display dates nicely
   //var dateFormatter = d3.timeFormat("%m/%d/%Y");

  // Scale the domain
   //var xMin;
   //var xMax;
   //var yMin;
   //var yMax;
   //var minDate = d3.min(airbnbData, function(d) { return d.date; });
    //minDate.setDate(minDate.getDate() - 1);
   //var maxDate = d3.max(airbnbData, function(d) { return d.date; });
  //  var mindate = new Date(3,1,2015);
  //  var maxdate = new Date(11,9,2019);
  //  xMin = d3.min(airbnbData, function(data) {
  //    var xTimeScale = d3.scaleTime()
  //     .domain(d3.extent(airbnbData, d => d.date)) 
  //     .range([0, width]);
  //   //  console.log(xTimeScale);
  //    return data.date;
  //    });
    

  //  xMax = d3.max(airbnbData, function(data) {
  //    console.log(xMax);
  //   return data.date ;
  //   });

  //  yMin = d3.min(airbnbData, function(data) {
  //    return +data.price * 0.02;
  //    });

  //  yMax = d3.max(airbnbData, function(data) {
  //    return +data.price * 0.04;
  //    });

  //   //xLinearScale.domain([0, xMax]);
  //  var yLinearScale = d3.scaleLinear().range([height, 0]);
  //    yLinearScale.domain([yMin, yMax]);
   
    //  // Step 6: Create Axes
 //    // =============================================
  //  var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%-m/%-d/%Y"));;
  //  var leftAxis = d3.axisLeft(yLinearScale);

    // // Initialize tooltip 
   var toolTip = d3
    .tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
     return (`<strong>${d.date}<strong><hr>${d.price}
      Avg. Price`);
       });
    
  //  // Create tooltip
   chartGroup.call(toolTip);
   chartGroup.selectAll("circle")
     .data(airbnbData)
     .enter()
     .append("circle")
     .attr("cx", function(data, index) {
       return xTimeScale(data.date)
      })
     .attr("cy", function(data, index) {
       return yLinearScale(data.price)
      })
     .attr("r", "15")
     .attr("fill", "lightblue")
      // display tooltip on click
     .on("mouseenter", function(data) {
       toolTip.show(data);
      })
      // hide tooltip on mouseout
     .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

  // Appending a label to each data point
   chartGroup.append("text")
     .style("text-anchor", "middle")
     .style("font-size", "12px")
     .selectAll("tspan")
     .data(airbnbData)
     .enter()
     .append("tspan")
      .attr("x", function(data) {
         return xTimeScale(data.date - 0);
        })
      .attr("y", function(data) {
         return yLinearScale(data.price - 0.2);
        })
        
//   // Append an SVG group for the xaxis, then display x-axis 
//    chartGroup
//      .append("g")
//      //.attr('transform', `translate(0, ${height})`)
//      .call(bottomAxis);

// //  // Append a group for left-axis, then display it
//    chartGroup.append("g").call(leftAxis);
  // Append left-axis label
   chartGroup
     .append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - margin.left + 40)
     .attr("x", 0 - height/2)
     .attr("dy","1em")
     .attr("class", "axis-text")
     .text("Price")
  // // Append bottom-axis labels
   chartGroup
     .append("text")
     .attr(
        "transform",
        "translate(" + width / 2 + " ," + (height + margin.top + 30) + ")"
      )
     .attr("class", "axis-text")
     .text("Dates");
 });
