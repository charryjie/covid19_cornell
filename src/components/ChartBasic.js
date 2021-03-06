import React from "react";
import { Line, Bar } from "react-chartjs-2";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
  } from "reactstrap";

import { useDispatch } from 'react-redux';
import { updateIdx } from '../reducer'

export function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}


const chartConfigure = (onClick) => ({
    maintainAspectRatio: false,
    legend: {
        display: true,
    },
    tooltips: {
        bodySpacing: 4,
        mode: "index",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10,
        callbacks: {
            afterFooter: onClick
        }
    },
    responsive: 1,
    scales: {
        yAxes: [
        {
            gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false,
            },
            ticks: {
            maxTicksLimit: 7,
            },
        },
        ],
        xAxes: [
        {
            display: true,
            ticks: {
            display: true,
            padding: 10,
            fontColor: "rgba(0,0,0,0.4)",
            fontStyle: "bold",
            },
            gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false,
            },
        },
        ],
    },
    layout: {
        padding: { left: 0, right: 0, top: 5, bottom: 5 },
    }
})
  

export function LineChart(props) {
    const dispatch = useDispatch();
    return (
      <Card className="card-chart">
        <CardHeader>
          <CardTitle tag="h4">{props.title}</CardTitle>
        </CardHeader>
  
        <CardBody>
          <div className="chart-area" style={{height: props.height !== undefined ? props.height : "250px"}}>
            <Line
              data={props.data}
              options={chartConfigure((tooltip) => {
                dispatch(updateIdx(tooltip[0].index))
                return ""
            })}
              
            />
          </div>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    )
  }

  
export function BarChart(props) {
    const dispatch = useDispatch();
    return (
        <Card className="card-chart">
        <CardHeader>
            <CardTitle tag="h4">{props.title}</CardTitle>
        </CardHeader>

        <CardBody>
            <div className="chart-area" style={{height: props.height !== undefined ? props.height : "250px"}}>
            <Bar
                data={props.data}
                options={chartConfigure((tooltip) => {
                    dispatch(updateIdx(tooltip[0].index))
                    return ""
                })}
            />
            </div>
        </CardBody>
        <CardFooter></CardFooter>
        </Card>
    )
}