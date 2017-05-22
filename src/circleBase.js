"use strict";
export default class CircleBase {
    constructor(data, domElement) {
        this.data = data;
        this.domElement = domElement;
    }

    $onInit() {

    }

    drawCircle() {
        this.svgContainer = d3.select("." + this.domElement)
            .append("svg")
            .attr("width", 500)
            .attr("height", 500);
        let self = this;
        let circles = self.svgContainer.selectAll('circle')
            .data(self.data)
            .enter()
            .append("circle");
        let circleAttributes = circles
            .attr("cx", d => d.x_axis)
            .attr("cy", d => d.y_axis)
            .attr("r", d => d.radius)
            .style("fill", d => d.color);
    }
}