/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BarChart = function () {
    function BarChart(data, domElement) {
        _classCallCheck(this, BarChart);

        this.data = data;
        this.domElement = domElement;
        this.margin = { top: 20, right: 20, bottom: 60, left: 40 };
        this.width = 660 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
    }

    _createClass(BarChart, [{
        key: "$oninit",
        value: function $oninit() {}
    }, {
        key: "draw",
        value: function draw() {
            var self = this;
            var data = this.data;
            var parseDate = d3.timeParse("%Y-%m");
            var x = d3.scaleBand().range([0, self.width]).round(0.05);
            var y = d3.scaleLinear().range([self.height, 0]);
            var xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m"));

            var yAxis = d3.axisLeft(y).ticks(10);

            var valueline = d3.line().x(function (d) {
                return x(d.date);
            }).y(function (d) {
                return y(d.value);
            }).curve(d3.curveNatural);

            var svg = d3.select("." + self.domElement).append("svg").attr("width", self.width + self.margin.left + self.margin.right).attr("height", self.height + self.margin.top + self.margin.bottom).append("g").attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");

            data.forEach(function (d) {
                d.date = parseDate(d.date);
                d.value = +d.value;
            });

            x.domain(data.map(function (d) {
                return d.date;
            }));
            y.domain([0, d3.max(data, function (d) {
                return d.value;
            })]);

            svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + self.height + ")").call(xAxis).selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", "-.55em").attr("transform", "rotate(-90)");

            svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("mm (mm2)");

            var bar = svg.selectAll("bar").data(data).enter();
            bar.append("rect").style("fill", "steelblue").attr("x", function (d) {
                return x(d.date);
            }).attr("width", x.bandwidth()).attr("y", function (d) {
                return y(d.value);
            }).attr("height", function (d) {
                return self.height - y(d.value);
            }).on('mouseover', function (d) {
                d3.select(this).style('fill', 'grey');
            }).on('mouseout', function (d) {
                d3.select(this).style('fill', 'steelblue');
            });
            bar.append("text").attr('x', function (d) {
                return x(d.date) + 12;
            }).attr('y', function (d) {
                return y(d.value) + 10;
            }).attr('dy', ".35em").text(function (d) {
                return d.value;
            }).attr("text-anchor", "center").style("fill", "white").style("font", "10px sans-serif");
            svg.append("path").attr("class", "line").attr("d", valueline(data)).attr('stroke-width', "1.5px").style("stroke", "red").style("fill", "none");
        }
    }]);

    return BarChart;
}();

exports.default = BarChart;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CircleBase = function () {
    function CircleBase(svg, data) {
        _classCallCheck(this, CircleBase);

        this.svg = svg;
        this.data = data;
    }

    _createClass(CircleBase, [{
        key: "$onInit",
        value: function $onInit() {}
    }, {
        key: "drawCircle",
        value: function drawCircle() {
            var self = this;
            var circles = self.svg.selectAll('circle').data(self.data);

            circles.enter().append("circle").attr("cx", function (d) {
                return d.x_axis;
            }).attr("cy", function (d) {
                return d.y_axis;
            }).attr("r", function (d) {
                return d.radius;
            }).style("fill", function (d) {
                return d.color;
            });
        }
    }]);

    return CircleBase;
}();

exports.default = CircleBase;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CoordinateAxis = function () {
    function CoordinateAxis() {
        _classCallCheck(this, CoordinateAxis);

        this.height = 0;
        this.width = 0;
        this.margin = {};
        this.svg = null;
    }

    _createClass(CoordinateAxis, [{
        key: "selectElement",
        value: function selectElement(size, domElement) {
            var self = this;
            this.margin = { top: 20, right: 20, bottom: 60, left: 40 };
            this.width = size.width - this.margin.left - this.margin.right;
            this.height = size.height - this.margin.top - this.margin.bottom;

            this.svg = d3.select("." + domElement).append("svg").attr("width", self.width + self.margin.left + self.margin.right).attr("height", self.height + self.margin.top + self.margin.bottom).append("g").attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");
            return this.svg;
        }
    }, {
        key: "drawXAxis",
        value: function drawXAxis() {
            var self = this;
            var x = d3.scaleLinear().range([0, self.width]);
            var xAxis = d3.axisBottom(x).ticks(10);
            self.svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + self.height + ")").call(xAxis).append("text").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("mm (mm2)");
        }
    }, {
        key: "drawYAxis",
        value: function drawYAxis() {
            var self = this;
            var y = d3.scaleLinear().range([self.height, 0]);
            var yAxis = d3.axisLeft(y).ticks(10);
            self.svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("mm (mm2)");
        }
    }]);

    return CoordinateAxis;
}();

exports.default = CoordinateAxis;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _barChart = __webpack_require__(0);

var _barChart2 = _interopRequireDefault(_barChart);

var _circleBase = __webpack_require__(1);

var _circleBase2 = _interopRequireDefault(_circleBase);

var _coordinateAxis = __webpack_require__(2);

var _coordinateAxis2 = _interopRequireDefault(_coordinateAxis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = [{ "date": "2013-01", "value": 90 }, { "date": "2013-02", "value": 130 }, { "date": "2013-03", "value": 250 }, { "date": "2013-04", "value": 255 }, { "date": "2013-05", "value": 325 }, { "date": "2013-06", "value": 600 }, { "date": "2013-07", "value": 219 }, { "date": "2013-08", "value": 259 }, { "date": "2013-09", "value": 300 }, { "date": "2013-10", "value": 470 }, { "date": "2013-11", "value": 1350 }, { "date": "2013-12", "value": 200 }];

var jsonCircles = [{
    "x_axis": 30,
    "y_axis": 30,
    "radius": 20,
    "color": "green"
}, {
    "x_axis": 70,
    "y_axis": 70,
    "radius": 20,
    "color": "purple"
}, {
    "x_axis": 110,
    "y_axis": 100,
    "radius": 20,
    "color": "red"
}];

var coordinateAxis = new _coordinateAxis2.default();

var svg = coordinateAxis.selectElement({ width: 500, height: 600 }, 'chart');
coordinateAxis.drawXAxis();
coordinateAxis.drawYAxis();

var circleGreen = new _circleBase2.default(svg, [{
    "x_axis": 100,
    "y_axis": 230,
    "radius": 60,
    "color": "green"
}]);
circleGreen.drawCircle();

/***/ })
/******/ ]);