import React, { Component } from 'react';
import ReactHighmaps from 'react-highcharts/ReactHighmaps';
import Highcharts from 'highcharts';
import WorldMap from './WorldMap';

class HeatMap extends Component {
    constructor () {
        super();

        this.config = {
            title: null,
            subtitle: null,
            mapNavigation: {
                enabled: true,
            },
            exporting: {
                enabled: false,
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'bottom'
            },
            plotOptions: {
                map: {
                    mapData: WorldMap
                }
            },
            colorAxis: {
                min: 0,
                stops: [
                    [0, '#EFEFFF'],
                    [0.5, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
                ]
            },
            series: [{
                data: [],
                name: 'HeatMap',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: false,
                }
            }]
        };
    }
    componentDidMount() {
        // Instead of redrawing highmaps on everytweet, we redraw every 10 seconds to reduce load
        setInterval(() => {
            let chart = this.refs.map.getChart();
            let data = Object.keys(this.props.heatMap).map((key) => {
                return [key.toLowerCase(), this.props.heatMap[key]];
            });

            // Move this to next event loop becasue there is too much work on 10th second already
            setTimeout(() => chart.series[0].setData(data));
        }, 10000);
    }

    render() {
        return(<ReactHighmaps config={this.config} ref="map"></ReactHighmaps>);
    }
}

export default HeatMap;