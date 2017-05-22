"use strict";
export default class CircleBase {
    constructor(svg, data) {
        this.svg = svg;
        this.data = data;
    }

    $onInit() {

    }

    drawCircle() {
        let self = this;
        let circles = self.svg.selectAll('circle')
            .data(self.data);

        circles.enter()
            .append("circle")
            .attr("cx", d => d.x_axis)
            .attr("cy", d => d.y_axis)
            .attr("r", d => d.radius)
            .style("fill", d => d.color)
    }
}