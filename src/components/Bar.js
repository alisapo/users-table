import React, { Component } from "react";
import Chart from "react-apexcharts";

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          type: 'bar',
          stacked: true,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '20%',
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "ч";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        yaxis: {
          labels: {
            show: false,
          }
        },
        xaxis: {
          categories: [this.props.time],
          labels: {
            show: false,
          }
        }
      },
      series: [{
        name: "отоработанное время",
        data: [Number(this.props.time)]
      }]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="300"
              height="70"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Bar;
