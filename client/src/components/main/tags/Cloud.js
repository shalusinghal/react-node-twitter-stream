import React, { Component } from 'react';
import d3Cloud from 'd3-cloud';
const d3 = require('d3');

class Cloud extends Component {
    componentDidMount() {
        // Instead of redrawing tagcloud, we gernerate it every 10 seconds
        setInterval(() => {
            wordCloud(this.props.wordFreq)
            this.props.trimTags();
        }, 10000);
    }

    render() {
        return(<div id='cloudCanvas'><p className="lead" id="cloudPlaceholder">Please wait for enough data...</p></div>);
    }
}

let layout;

const wordCloud = (words) => {
    layout = d3Cloud()
        .size([500, 300])
        .words(Object.keys(words).map((word) => {
            return {
                text: word,
                size: 10 + Math.sqrt(words[word].count)
            };
        }))
        .padding(3)
        .fontSize((word) => word.size)
        .on('end', draw);

    layout.start();
}

const draw = (words) => {
    d3.select('#cloud').remove();
    d3.select('#cloudPlaceholder').remove();

    setTimeout(() => {
        d3.select('#cloudCanvas').append('svg')
            .attr('id', 'cloud')
            .attr('width', layout.size()[0])
            .attr('height', layout.size()[1])
            .append('g')
            .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')')
            .selectAll('text')
            .data(words)
            .enter().append('text')
            .style('font-size', function(d) { return d.size + 'px'; })
            .attr('text-anchor', 'middle')
            .attr('transform', function(d) {
                return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
            })
            .text(function(d) { return d.text; });
    });
}

export default Cloud;