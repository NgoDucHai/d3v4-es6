    'use strict';
    import BarChart from './barChart';

    let data = [
        {"date":"2013-01","value":90},
        {"date":"2013-02","value":130},
        {"date":"2013-03","value":250},
        {"date":"2013-04","value":255},
        {"date":"2013-05","value":325},
        {"date":"2013-06","value":600},
        {"date":"2013-07","value":219},
        {"date":"2013-08","value":259},
        {"date":"2013-09","value":300},
        {"date":"2013-10","value":470},
        {"date":"2013-11","value":1350},
        {"date":"2013-12","value":200},
        ];
    let barChart = new BarChart(data, 'chart');

    barChart.draw();