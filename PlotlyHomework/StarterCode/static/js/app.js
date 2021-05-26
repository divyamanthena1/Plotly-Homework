// Write a function that will build the metadata for a single sample. It should do the following:
// - loop over the samples.json file with d3.json().then()
// - extract the metadata from the json
// - filter the metadata for the sample id
// - update the metadata html elements
// - clear any existing metadata in the metadata html elements
// - append hew header tags for each key-value pair in the filtered metadata
function buildData(sample) {
    d3.json("static/js/samples.json").then((data) => {
        // console.log(data);
        var meta = data.metadata;
        var results = meta.filter(sampleObj => sampleObj.id == sample);
        var result = results[0];
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h5").text(`${key.toUpperCase()}: ${value}`);
        });
    })};


function Charts(sample) {
    d3.json("static/js/samples.json").then((data) => {
       var samples = data.samples;
    //    console.log(samples);
       var results = samples.filter(sampleObj => sampleObj.id == sample);
       var result = results[0];
       
       var otu_ids = result.otu_ids;
       var otu_labels = result.otu_labels;
       var sample_values = result.sample_values;
       var BubbleChart = {
        title: "Bacteria Samples",
        margin: {t: 0},
        hoverode: "closest",
        xazis: {title: "ID"},
        margin: {t: 20}
    };
    var BubbleData = [
        {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Bluered"
            }
        }
    ];
    
    Plotly.newPlot("bubble", BubbleData, BubbleChart);
       
       var y = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
       var BarData = [
        {
           y: y,
           x: sample_values.slice(0, 10).reverse(),
           text: otu_labels.slice(0, 10).reverse(),
           type: "bar",
           orientation: "h"
       }
    ];
       var BarChart = {
           title: "Top 10 OTUs",
           margin: { t: 20, 1: 140}
       };
       Plotly.newPlot("bar", BarData, BarChart);
    });
}

function init() {
    var select = d3.select("#selDataset");
    d3.json("static/js/samples.json").then((data) => {
        var SampleName = data.names;
        SampleName.forEach((sample) => {
            select
                .append("option")
                .text(sample)
                .property("value", sample);
        });
  var FirstSample = SampleName[0];
  Charts(FirstSample);
  buildData(FirstSample);
    });
}

function optionChanged(NewSample) {
    Charts(NewSample);
    buildData(NewSample);
}

init();

    

// Write a function that will build the charts for a single sample. It should do the following:
// - loop over the samples.json file with d3.json().then()
// - extract the samples from the json
// - filter the samples for the sample id
// - extract the ids, labels, and values from the filtered result
// - build a bubble chart and plot with Plotly.newPlot()
// - build a bar chart and plot with Plotly.newPlot()



// Write a function called init() that will populate the charts/metadata and elements on the page. It should do the following:
// - select the dropdown element in the page
// - loop over the samples.json data to append the .name attribute into the value of an option HTML tag (lookup HTML documentation on dropdown menus)
// - extract the first sample from the data
// - call your two functions to build the metadata and build the charts on the first sample, so that new visitors see some data/charts before they select something from the dropdown



// Write a function called optionChanged() that takes a new sample as an argument. It should do the following:
// - call your two functions to build the metadata and build the charts on the new sample
// Look at line 30 of index.html: that is the event listener that will call this function when someone selects something on the dropdown



// Initialize the dashboard by calling your init() function
