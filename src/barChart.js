    "use strict";
    export default class BarChart {
        constructor(data, domElement){
            this.data = data;
            this.domElement =  domElement;
            this.margin = {top: 20, right: 20, bottom: 60, left: 40};
            this.width = 660 - this.margin.left - this.margin.right;
            this.height = 500 - this.margin.top - this.margin.bottom;
        }

        $oninit(){


         }

         axisX(){

         }
        draw(){
            let self = this;
            let data = this.data;
            let parseDate = d3.timeParse("%Y-%m");
            let x = d3.scaleBand().range([0, self.width]).round(0.05);
            let y = d3.scaleLinear().range([self.height, 0]);
            let xAxis = d3.axisBottom(x)
                .tickFormat(d3.timeFormat("%Y-%m"));

            let yAxis = d3.axisLeft(y)
                .ticks(10);

            let valueline = d3.line()
                .x(d => x(d.date))
                .y(d => y(d.value))
                .curve(d3.curveNatural);

            let svg = d3.select("."+self.domElement).append("svg")
                .attr("width", self.width + self.margin.left + self.margin.right)
                .attr("height", self.height + self.margin.top + self.margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + self.margin.left + "," + self.margin.top + ")");

            data.forEach(function(d) {
                d.date = parseDate(d.date);
                d.value = +d.value;
            });

            x.domain(data.map(d => d.date));
            y.domain([0, d3.max(data, (d => d.value))]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + self.height + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.55em")
                .attr("transform", "rotate(-90)" );

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("mm (mm2)");

            let bar = svg.selectAll("bar")
                .data(data)
                .enter();
            bar.append("rect")
                .style("fill", "steelblue")
                .attr("x", d => x(d.date))
                .attr("width", x.bandwidth())
                .attr("y", d => y(d.value))
                .attr("height", d => self.height - y(d.value))
                .on('mouseover', function (d) {
                    d3.select(this)
                        .style('fill', 'grey');
                })
                .on('mouseout', function (d) {
                    d3.select(this)
                        .style('fill', 'steelblue');
                });
            bar.append("text")
                .attr('x', d => x(d.date)+12)
                .attr('y', d => y(d.value)+10)
                .attr('dy', ".35em")
                .text(d => d.value)
                .attr("text-anchor","center")
                .style("fill", "white")
                .style("font","10px sans-serif");
            svg.append("path")
                .attr("class", "line")
                .attr("d", valueline(data))
                .attr('stroke-width',"1.5px")
                .style("stroke","red")
                .style("fill", "none");

        }
    }
