import React, { useState } from "react";
import Chart from "react-apexcharts";
import Dashboard from "../dashboard/Dashboard";

const ChartApex = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  return (
    <>
      <div
        className=""
        style={{
          width: "100%",
        }}
      >
        <Dashboard />
        <p style={{ padding: "15px" }}>Welcome to Home Page!</p>
        <div className="mt-3">
          <div style={{ display: "grid", justifyContent: "center" }}>
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              width="370"
              height="400"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartApex;
