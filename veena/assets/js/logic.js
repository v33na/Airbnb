function getPlots(id) {
    //Read samples.json
    d3.csv("assets/data/All_airbnb_listings.csv").then(function(airbnbData){
            //console.log(airbnbData)
    // Step 4: Parse Data 
    //==============================
   // Create a function to parse date and time
    var parseTime = d3.timeParse ("%Y/-m/%-d");
   
    //   // Format the data
     airbnbData.forEach(function(data) {
       //console.log(data.date)
       //data.date = parseTime(data.date);
       //console.log(data.date)
       data.price = +data.price;
       console.log(data.date)
      //console.log(data.price)
     });
    // set the layout for the bubble plot
     var layout_2 = {
        xaxis:{title: "Dates"},
        height: 600,
        width: 1000
        };
    
    // creating data variable 
     var data1 = [trace1];
    
    // create the bubble plot
     Plotly.newPlot("bubble", data1, layout_2); 
    
     });
    }  
    // create the function to get the necessary data
     function getDemoInfo(id) {
    // read the json file to get data
     d3.json("samples.json").then((data)=> {
    // get the metadata info for the demographic panel
     var metadata = data.metadata;
        console.log(metadata)
    
          // filter meta data info by id
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          // select demographic panel to put data
           var demographicInfo = d3.select("#sample-metadata");
            
         // empty the demographic info panel each time before getting new id info
           demographicInfo.html("");
    
         // grab the necessary demographic data data for the id and append the info to the panel
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // create the function for the change event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    // create the function for the initial data rendering
    function init() {
        // select dropdown menu 
        var dropdown = d3.select("#selDataset");
    
        // read the data 
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            // get the id data to the dropdwown menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // call the functions to display the data and the plots to the page
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();