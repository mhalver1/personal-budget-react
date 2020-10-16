import React from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import * as d3 from 'd3';

function HomePage() {
  var dataSource = {
    datasets: [
        {
        data: [],
        backgroundColor: [
            'cyan',
            'brown',
            'purple',
            'blue',
            'red',
            'yellow',
            'green'
            
            ],
        }
    ],
    labels: []
};

function createChart() {
  //var ctx = document.getElementById("myChart").getContext("2d");
  var ctx = document.getElementById("myChart");
  var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: dataSource
  });
}

function getBudget() {
  axios.get('http://localhost:3000/budget')
  .then(function (res) {
      //console.log(res.data);
      for(var i = 0; i < res.data.myBudget.length; i++) {
          dataSource.datasets[0].data[i]=res.data.myBudget[i].budget;
          dataSource.labels[i]=res.data.myBudget[i].title

      }
      //console.log(typeof dataSource);
      var data = dataSource.datasets[0].data;
      var labels = dataSource.labels;
      //console.log(colors);
      //console.log(labels);
      //dataSource.data = res.data.myBudget;
      //createChart();
      //change(dataSource.datasets.data);
      function randomData (){
        return labels.map( function(label, i){
        return { label: label, value: data[i] }
    });
  }

      createChart();
      createSvg();
      //console.log(randomData ());
      createColors(randomData ());
      drawChart(randomData ());
  });
}
getBudget();

    var width = 500;
    var height = 350;
    //var margin = 50;
    var radius = Math.min(width, height) / 2;
    var svg;
    var colors;


    function createSvg() {
      svg = d3.select("figure#pie")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr(
        "transform",
        "translate(" + width / 2 + "," + height / 2 + ")"
      );
  }
  //var key = function(d){ return d.data.label; };

  function createColors(data){
    colors = d3.scaleOrdinal()
    .domain(data.map(d => d.budget))
    //.range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
    .range(dataSource.datasets[0].backgroundColor);
}



  function drawChart(data){
    // Compute the position of each group on the pie:
    //console.log(data);
    const pie = d3.pie().value((d) => Number(d.value));
    // Build the pie chart
    svg
    .selectAll('pieces')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', (d, i) => (colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(radius);

    svg
    .selectAll('pieces')
    .data(pie(data))
    .enter()
    .append('text')
    .text(d => d.data.label)
    .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
}
  return (
        
        <div className="container center">

        <div className="page-area">

            <div className="text-box">
                <h2>Stay on track</h2>

                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </div>
    
            <div className="text-box">
                <h2>Alerts</h2>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </div>
    
            <div className="text-box">
                <h2>Results</h2>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </div>
    
            <div className="text-box">
                <h2>Free</h2>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </div>
    
            <div className="text-box">
                <h2>Stay on track</h2>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </div>
    
            <div className="text-box">
                <h2>Alerts</h2>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </div>
    
            <div className="text-box">
                <h2>Results</h2>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </div>
    
            <div className="text-box">
                <h2>Chart</h2>
                <p>
                    <canvas id = "myChart" width="400" height="400"></canvas>
                </p>
            </div>
            <div className="text-box">
                <h2>Second Chart</h2>
                <p>
                    <canvas id = "myChart" width="400" height="0"></canvas>
                </p>
            </div>
        </div>
<div className="pie-chart"></div>
    <script src="https://d3js.org/d3.v3.min.js"></script>
    <script src="piechart1.js"></script>
    <figure id="pie"></figure>
    </div>

    
  );
}

export default HomePage;
