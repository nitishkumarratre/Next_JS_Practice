"use client";
import React from "react";
import dynamic from "next/dynamic";
import "bootstrap/dist/css/bootstrap.min.css";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Helper function to format hours as hh:mm
const formatTime = (hours: number) => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m.toString().padStart(2, "0")}m`;
};

const DashboardCharts: React.FC = () => {
  // ======== Top Projects (Double Radial Bar) ========
  const topProjectsSeries = [25.00, 50.00];
  const totalHours = topProjectsSeries.reduce((a, b) => a + b, 0);
  const totalFormatted = formatTime(totalHours);

  const topProjectsOptions = {
    chart: {
      type: "radialBar",
      height: 350,
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 5,
          size: "40%",
          background: "transparent",
        },
        dataLabels: {
          show: true,
          name: { show: true },
          value: {
            show: true,
            fontSize: "14px",
            formatter: (val: number) => formatTime(val),
          },
          total: {
            show: true,
            label: "Total",
            formatter: () => totalFormatted,
          },
        },
      },
    },
    colors: ["#007bff", "#dc3545"],
    labels: ["Default Project", "ABCD Project"],
    legend: {
      show: true,
      position: "left",
      fontSize: "13px",
      markers: {
        width: 3,
        height: 20,
        strokeWidth: 0,
        strokeColor: "#fff",
        radius: 0,
        offsetX: -5,
        offsetY: 2,
        customHTML: () =>
          '<span style="display:inline-block;width:6px;height:34px;background:currentColor;margin-right:8px;vertical-align:middle;border-radius:1px;"></span>',
      },
      formatter: function (seriesName: string, opts: any) {
        const value = formatTime(opts.w.globals.series[opts.seriesIndex]);
        return `${seriesName}<br/><span style="font-weight:500; color:#6c757d; font-size:12px;">${value}</span>`;
      },
    },
    tooltip: {
      enabled: true,
      y: { formatter: (val: number) => formatTime(val) },
    },
  };

  // ======== Members (Donut Chart) ========
  const membersSeries = [700, 30]; // Online, Offline
  const totalMembers = membersSeries.reduce((a, b) => a + b, 0);

  const membersOptions = {
    chart: { type: "donut" },
    labels: ["Online", "Offline"],
    colors: ["#00C853", "#E0E0E0"],
    dataLabels: { enabled: false },
    legend: {
      show: true,
      position: "left",
      fontSize: "13px",
      markers: {
        width: 10,
        height: 10,
        radius: 50,
        offsetX: -5,
        offsetY: 0,
      },
      formatter: function (seriesName: string, opts: any) {
        const value = opts.w.globals.series[opts.seriesIndex];
        return `${seriesName}<br/><span style="font-weight:500; color:#6c757d; font-size:12px;">${value}</span>`;
      },
    },
    tooltip: {
      enabled: true,
      y: { formatter: (val: number) => `${val} Members` },
    },
    plotOptions: {
      pie: {
        startAngle: 40,
        endAngle: 400,
        donut: {
          size: "55%",
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 10,
              color: "#9E9E9E",
              fontSize: "14px",
            },
            value: {
              show: true,
              fontSize: "22px",
              fontWeight: "bold",
              offsetY: -30,
              formatter: () => `${totalMembers}`,
            },
            total: {
              show: true,
              label: "Members",
              color: "#9E9E9E",
              fontSize: "14px",
              formatter: () => `${totalMembers}`,
            },
          },
        },
      },
    },
  };

  // ======== Task Status (Donut Chart) ========
  const taskSeries = [25, 25, 50]; // Completed, In Development (2), Remaining tasks
  const totalTasks = taskSeries.reduce((a, b) => a + b, 0);

  const taskOptions = {
    chart: { type: "donut" },
    labels: ["Completed", "In Development", "Remaining"],
    colors: ["#00BCD4", "#B0BEC5", "#CFD8DC"], // light cyan, gray tones
    dataLabels: { enabled: false },
    legend: {
      show: true,
      position: "left",
      fontSize: "13px",
      markers: {
        width: 10,
        height: 10,
        radius: 50,
        offsetX: -5,
        offsetY: 0,
      },
      formatter: function (seriesName: string, opts: any) {
        const value = opts.w.globals.series[opts.seriesIndex];
        return `${seriesName}<br/><span style="font-weight:500; color:#6c757d; font-size:12px;">${value}</span>`;
      },
    },
    tooltip: {
      enabled: true,
      y: { formatter: (val: number) => `${val} Tasks` },
    },
    plotOptions: {
      pie: {
        startAngle: -110,
        endAngle: 250,
        donut: {
          size: "55%",
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 15,
              color: "#9E9E9E",
              fontSize: "14px",
            },
            value: {
              show: true,
              fontSize: "22px",
              fontWeight: "bold",
              offsetY: -30,
              formatter: () => `${totalTasks}`,
            },
            total: {
              show: true,
              label: "Total Task",
              color: "#9E9E9E",
              fontSize: "14px",
              formatter: () => `${totalTasks}`,
            },
          },
        },
      },
    },
  };

  // ======== Render Section ========
  return (
    <div className="container my-4">
      <div className="row">
        {/* Top Projects */}
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h6 className="text-secondary mb-3 fw-bold">Top Projects</h6>
            <Chart
              options={topProjectsOptions}
              series={topProjectsSeries}
              type="radialBar"
              height={320}
            />
          </div>
        </div>

        {/* Members */}
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h6 className="text-secondary mb-3 fw-bold">Members</h6>
            <Chart
              options={membersOptions}
              series={membersSeries}
              type="donut"
              height={320}
            />
          </div>
        </div>

        {/* Task Status */}
        <div className="col-md-6 mt-4">
          <div className="card shadow-sm p-3">
            <h6 className="text-secondary mb-3 fw-bold">Task Status</h6>
            <Chart
              options={taskOptions}
              series={taskSeries}
              type="donut"
              height={320}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
