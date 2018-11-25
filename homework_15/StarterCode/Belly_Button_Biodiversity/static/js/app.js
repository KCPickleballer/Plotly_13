function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  
  d3.json(`/metadata/${sample}`).then(function(data) {

    console.log('metatest: ', data);
  
    // Use d3 to select the panel with id of `#sample-metadata`
  d3.select("#sample-metadata").html("")
  d3.select("#sample-metadata").append("tbody").html("")

    // Use `.html("") to clear any existing metadata

    for (const [key, value] of Object.entries(data)) {
     // console.log(`${key} ${value}`); 
     d3.select("tbody")
     .append("tr")
     .html(`<td>${key}:</td><td>${value}</td>`)
    }
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
  });
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}



function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  // d3.json(`/samples/${sample}`).then((data) => {
  //   console.log(data);
  //   });
  // const dataPromise = d3.json(`/samples/${sample}`).then(function(data){
  //   buildPie(data);

  // });  
  
  


  d3.json(`/samples/${sample}`).then(function(data) {

    console.log('test1: ', data);
    // try {
    // console.log('test otu_ids:', data[0].otu_ids);
    // console.log('test otu_labels:', data[0].otu_labels);
    // console.log('test sample_values:', data[0].sample_values);
    // }
    // catch (err) {
    //   console.log(err);
    // }

   



    var ids = data.otu_ids
    var sample_val = data.sample_values  
    var txtLables = data.otu_lables

    //var sortObj = data

    console.log('otu: ', ids[0]);
    console.log('samps: ', sample_val[0]);
    // var name = data.dataset.name;
    // var stock = data.dataset.dataset_cod
    // // var startDate = data.dataset.start_date;
    // var endDate = data.dataset.end_date;
    // var dates = unpack(data.dataset.data, 0);
    // var closingPrices = unpack(data.dataset.data, 1);

    var trace1 = {
      type: "scatter",
      mode: "markers",
      name: ids,
      x: ids,
      y: sample_val,
      text : txtLables,
      marker: {
        color: ids,
        size: sample_val
      }
    };

     var data1 = [trace1];

     var layout = {
      title: "Sample Data",
      xaxis: { title: "OTU ID" }
    };
     

    // var layout = {
    //   title: `${stock} closing prices`,
    //   xaxis: {
    //     range: [startDate, endDate],
    //     type: "date"
    //   },
    //   yaxis: {
    //     autorange: true,
    //     type: "linear"
    //   }

    Plotly.newPlot("bubble", data1, layout);

   // buildPie(data);

   // sortObj.sort((a, b) => Number(b.sample_values) - Number(a.sample_values));

   const idsSlice = data.otu_ids.slice(0, 10);
   const sampValSlice = data.sample_values.slice(0, 10);
   const lblsSlice =  data.otu_labels.slice(0, 10);
console.log('scliced: ', sampValSlice);

   

  var trace1 = {
   labels: idsSlice,
   values: sampValSlice,
   type: 'pie'
  // text: lblsSlice
 };

 var data2 = [trace1];

// var layout = {
//   title: "'Bar' Chart",
// };

 Plotly.newPlot("pie", data2);


    });


    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
   
   

    // const dataPromise = d3.json(`/samples/${sample}`);
    // console.log("Data Promise: ", dataPromise);
    // console.log("data: ", dataPromise.promiseValue.otu_ids)
   
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
   //selector.on("change", optionChanged );
  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  console.log(newSample);
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
