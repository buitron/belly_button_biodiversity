function optionChanged(value){

    sampleMetaData(value);
    pieChart(value);
    bubbleChart(value);
    gaugeChart(value);

}

function sampleMetaData(value){
    // sample meta data
    url = "/metadata/";
    Plotly.d3.json(url + value, (error, data) => {
        if (error) return console.warn(error);

        $cardText = Plotly.d3.select('.card-text');
        // clear the current displayed data
        $cardText.html('');

        // populate table with selected data
        Object.keys(data).forEach((key) => {

            $cardText
                .append('text')
                    .html(key + ": " + data[key])
                .append('br')
                .append('br')
                .append('br')
                .append('br')
                .append('br')
                .append('br')
                .append('br')
                .append('br');
        });
    });
}

function pieChart(value){
    // pie chart data
    url = "/samples/";
    Plotly.d3.json(url + value, (error, data) => {
        if (error) return console.warn(error);

        var trace1 = {
          values: data.sample_values.slice(0,10),
          labels: data.otu_ids.slice(0,10),
          marker: {colors: ['rgba(10, 84, 0, .5)', 'rgba(12, 97, 0, .5)', 'rgba(13, 113, 0, .5)', 'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)', 'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)', 'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)', 'rgba(245, 240, 222, .5)']},
          hole: .4,
          type: 'pie'
        };

        var data = [trace1];

        var layout = {
          title: value + "'s Top 10 OTU Microbiomes",
          colorscale: 'Earth'
        };


        return Plotly.newPlot("pie", data, layout);
    });
}

function bubbleChart(value){
    // bubble chart data
    url = "/samples/";
    Plotly.d3.json(url + value, (error, data) => {
        if (error) return console.warn(error);

        var trace1 = {
            x: data.otu_ids,
            y: data.sample_values,
            mode: "markers",
            marker: {
                size: data.sample_values,
                color: data.otu_ids,
            }
        };

        var data = [trace1]

        var layout = {
            title: value  + "'s Operational Taxonimical Unit's (OTU) Volume and Spread",
            showLegend: false,
        }


        return Plotly.newPlot("bubble", data, layout)
    });
}

function gaugeChart(value){
    //gauge chart data
    url = "/wfreq/";
    Plotly.d3.json(url + value, (error, data) => {
        if(error) return console.warn(error);

        // Enter a speed between 0 and 180
        var level = data;

        // Trig to calc meter point
        var degrees = 9 - level,
             radius = .5;
        var radians = degrees * Math.PI / 9;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
             pathX = String(x),
             space = ' ',
             pathY = String(y),
             pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var data = [{ type: 'scatter',
           x: [0], y:[0],
            marker: {size: 28, color:'DB5F59'},
            showlegend: false,
            name: 'Washing Frequency',
            text: level,
            hoverinfo: 'text+name'},
          { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
          rotation: 90,
          text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
          textinfo: 'text',
          textposition:'inside',
          marker: {colors: ['rgba(10, 84, 0, .5)', 'rgba(12, 97, 0, .5)', 'rgba(13, 113, 0, .5)', 'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)', 'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)', 'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)', 'rgba(255, 255, 255, 0)']},
          labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
          hoverinfo: 'label',
          hole: .5,
          type: 'pie',
          showlegend: false
        }];

        var layout = {
          shapes:[{
              type: 'path',
              path: path,
              fillcolor: 'DB5F59',
              line: {
                color: 'DB5F59'
              }
            }],
          title: value + ' Belly Button Weekly Washing Frequency',
          xaxis: {zeroline:false, showticklabels:false,
                     showgrid: false, range: [-1, 1]},
          yaxis: {zeroline:false, showticklabels:false,
                     showgrid: false, range: [-1, 1]}
        };


        return Plotly.newPlot('gauge', data, layout);
    });
}
