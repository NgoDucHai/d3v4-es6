"use strict";
export default class CoordinateAxis{
    constructor(){
        this.height = 0;
        this.width  = 0;
        this.margin = {};
        this.svg = null;
    }

    selectElement(size, domElement){
        let self = this;
        this.margin = {top: 20, right: 20, bottom: 60, left: 40};
        this.width = size.width - this.margin.left - this.margin.right;
        this.height = size.height - this.margin.top - this.margin.bottom;

        this.svg = d3.select("."+ domElement).append("svg")
            .attr("width", self.width + self.margin.left + self.margin.right)
            .attr("height", self.height + self.margin.top + self.margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + self.margin.left + "," + self.margin.top + ")");
    }

    drawXAxis(){
        let self = this;
        let x = d3.scaleLinear().range([0, self.width]);
        let xAxis = d3.axisBottom(x).ticks(10);
        self.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + self.height + ")")
            .call(xAxis)
            .append("text")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("mm (mm2)");
    }

    drawYAxis(){
        let self = this;
        let y = d3.scaleLinear().range([self.height, 0]);
        let yAxis = d3.axisLeft(y).ticks(10);
        self.svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("mm (mm2)");
    }
}