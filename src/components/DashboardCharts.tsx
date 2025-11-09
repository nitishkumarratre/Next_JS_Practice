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
  const topProjectsSeries = [5.75, 12.67]; // 5h45m, 12h40m
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
          name: {
            show: true,
          },
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
    colors: ["#007bff", "#dc3545"], // blue, red
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
  const membersSeries = [7, 3]; // online 7, offline 3
  const totalMembers = membersSeries.reduce((a, b) => a + b, 0);

  const membersOptions = {
    chart: { type: "donut" },
    labels: ["Online", "Offline"],
    colors: ["#17a2b8", "#6c757d"],
    dataLabels: { enabled: true },
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
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Members",
              formatter: () => `${totalMembers}`,
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
        {/* Left Chart */}
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

        {/* Right Chart */}
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
      </div>
    </div>
  );
};

export default DashboardCharts;
