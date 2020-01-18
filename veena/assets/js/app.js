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
   var parseTime = d3.timeParse("%B/%d/%Y");
//   // Format the data
    airbnbData.forEach(function(data) {
    data.date = parseTime(data.date);
    data.year = +data.date;
    data.price = +data.price;
    console.log(data.year)
     });
//    // Step 5: Create Scales
//  //==============================
//  // define the x scale (horizontal)
//  var mindate = new Date(03/01/2015),
//  maxdate = new Date(11/09/2019);
//  var xLinearScale = d3.scaleLinear().range([mindate, maxdate]);
//  var yLinearScale = d3.scaleLinear().range([height, 0]);

//  // Step 6: Create Axes
//    // =============================================
//   var bottomAxis = d3.axisBottom(xLinearScale).tickFormat(d3.timeFormat("%b/%d/%y"));;
//   var leftAxis = d3.axisLeft(yLinearScale);
   
//  // Scale the domain
//   var xMin;
//   var xMax;
//   var yMin;
//   var yMax;

//   // xMin = d3.min(airbnbData, function(data) {
//   //   return +airbnbData.date;
//   // });

//   // xMax = d3.max(airbnbData, function(data) {
//   //   return +data.date ;
//   // });

//   yMin = d3.min(airbnbData, function(data) {
//     return +data.price * 1.5;
//   });

//   yMax = d3.max(airbnbData, function(data) {
//     return +data.price *1.5;
//   });

//   xLinearScale.domain([xMin, xMax]);
//   yLinearScale.domain([yMin, yMax]);

//   // // Initialize tooltip 
//    var toolTip = d3
//      .tip()
//      .attr("class", "tooltip")
//      .offset([80, -60])
//      .html(function(data) {
//          var neighbourName = data.neighbourhood;
//          var year = +data.date;
//         var price = +data.price;
//          return (
//             neighbourName + '  Year: ' + year + '  Average price: ' + price +'%'
//          );
//       });
//   // Create tooltip
//   chartGroup.call(toolTip);

//   chartGroup.selectAll("circle")
//     .data(airbnbData)
//     .enter()
//     .append("circle")
//     .attr("cx", function(data, index) {
//        // return xLinearScale(data.date)
//     })
//     .attr("cy", function(data, index) {
//         return yLinearScale(data.price)
//     })
//     .attr("r", "15")
//     .attr("fill", "lightblue")
//     // display tooltip on click
//     .on("mouseenter", function(data) {
//         toolTip.show(data);
//     })
//     // hide tooltip on mouseout
//     .on("mouseout", function(data, index) {
//         toolTip.hide(data);
//     });

// // Appending a label to each data point
//   chartGroup.append("text")
//     .style("text-anchor", "middle")
//     .style("font-size", "12px")
//     .selectAll("tspan")
//     .data(airbnbData)
//     .enter()
//     .append("tspan")
//         .attr("x", function(data) {
//             return xLinearScale(data.date - 0);
//         })
//         .attr("y", function(data) {
//             return yLinearScale(data.price - 0.2);
//         })
        
// // Append an SVG group for the xaxis, then display x-axis 
//   chartGroup
//     .append("g")
//     .attr('transform', `translate(0, ${height})`)
//     .call(bottomAxis);

// // Append a group for y-axis, then display it
//   chartGroup.append("g").call(leftAxis);

// // Append y-axis label
//   chartGroup
//     .append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0-margin.left + 40)
//     .attr("x", 0 - height/2)
//     .attr("dy","1em")
//     .attr("class", "axis-text")
//     .text("Price")

// // // Append x-axis labels
//    chartGroup
//      .append("text")
//      .attr(
//          "transform",
//          "translate(" + width / 2 + " ," + (height + margin.top + 30) + ")"
//      )
//      .attr("class", "axis-text")
//      .text("Price in years");
 });
