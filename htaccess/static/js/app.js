var default_url = "/names";

var $select = Plotly.d3.select('#selDataset');

Plotly.d3.json(default_url, (error, data) => {
    if (error) return console.warn(error);

    data.forEach((value, index) => {
        $select
            .append('option')
                .attr('value', value)
                    .html(value);
    });

    sampleMetaData(data[0]);
    pieChart(data[0]);
    bubbleChart(data[0]);
    gaugeChart(data[0]);

});
