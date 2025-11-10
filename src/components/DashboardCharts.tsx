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



    // ======== Budget Status (Donut Chart) ========
    const budgetSeries = [65, 35]; // Used, Remaining
    const totalBudget = budgetSeries.reduce((a, b) => a + b, 0);

    const budgetOptions = {
        chart: { type: "donut" },
        labels: ["Used", "Remaining"],
        colors: ["#2196F3", "#E0E0E0"], // blue + gray
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
            y: { formatter: (val: number) => `${val}%` },
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270,
                donut: {
                    size: "70%",
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
                            formatter: () => `${totalBudget}`,
                        },
                        total: {
                            show: true,
                            label: "Total Budget",
                            color: "#9E9E9E",
                            fontSize: "14px",
                            formatter: () => `${totalBudget}`,
                        },
                    },
                },
            },
        },
    };

    // ======== Projects FY-25-155 (Bar Chart) ========
    const projectSeries = [
        {
            name: "No of projects",
            data: [30, 70, 25, 15], // Example project counts
        },
        {
            name: "Business Potential/ Annum (in cr)",
            data: [10, 100, 90, 5], // Example potential (crores)
        },
    ];

    const projectOptions = {
        chart: {
            type: "bar",
            height: 350,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "45%",
                borderRadius: 4,
            },
        },
        colors: ["#007BFF", "#E53935"], // blue + red
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ["transparent"] },
        xaxis: {
            categories: ["A", "B", "C", "D"],
            labels: {
                style: {
                    colors: "#6c757d",
                    fontSize: "12px",
                    fontWeight: 500,
                },
            },
        },
        yaxis: {
            title: { text: undefined },
            labels: {
                style: {
                    colors: "#6c757d",
                    fontSize: "12px",
                },
            },
        },
        legend: {
            show: true,
            position: "bottom",
            fontSize: "13px",
            markers: {
                width: 10,
                height: 10,
                radius: 50,
            },
            itemMargin: {
                horizontal: 10,
                vertical: 0,
            },
        },
        grid: {
            borderColor: "#f1f3f4",
            strokeDashArray: 4,
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
    };



    // ======== Project status green , yellow ========
    const projectSeriesForGraph = [
        {
            name: "Series 1",
            data: [35, 5, 2], // G,Y,R
        },
        {
            name: "Series 2",
            data: [55, 15, 2], // G,Y,R
        },
        {
            name: "Series 3",
            data: [15, 12, 0], // no data for R (0)
        },
        {
            name: "Series 4",
            data: [8, 4, 0], // no data for Y,R (0)
        },
    ];

    const projectOptionsForGraph = {
        chart: {
            type: "bar",
            height: 350,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "45%",
                borderRadius: 4,
            },
        },
        colors: ["#007BFF", "#E53935", "#2ECC71", "#1E2A47"], // blue, red, green, navy
        dataLabels: { enabled: false },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        xaxis: {
            categories: ["G", "Y", "R"],
            labels: {
                style: {
                    colors: "#6c757d",
                    fontSize: "12px",
                    fontWeight: 500,
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#6c757d",
                    fontSize: "12px",
                },
            },
        },
        grid: {
            borderColor: "#f1f3f4",
            strokeDashArray: 4,
        },
        legend: {
            show: false,
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
        annotations: {
            xaxis: [
                {
                    x: -0.5,
                    x2: 0.5,
                    fillColor: "rgba(0, 255, 0, 0.25)", // green highlight
                },
                {
                    x: 0.5,
                    x2: 1.5,
                    fillColor: "rgba(255, 255, 0, 0.25)", // yellow highlight
                },
                {
                    x: 1.5,
                    x2: 2.5,
                    fillColor: "rgba(255, 0, 0, 0.25)", // red highlight
                },
            ],
        },
    };



     // ======== Budget vs Actualisation A ========
    const budgetActualisationSeries = [10, 30, 10]; // Completed, In Development (2), Remaining tasks
    const totalbudgetActualisationSeries = budgetActualisationSeries.reduce((a, b) => a + b, 0);

    const budgetActualisationOptions = {
        chart: { type: "donut" },
        labels: ["Budgeted FY-25", "Actualisation", "Pending"],
        colors: ["#6c757d", "#00BCD4", "#dc3545"], // light cyan, gray tones
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
                startAngle: -90,
                endAngle: 90,
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
                            formatter: () => `${totalbudgetActualisationSeries}`,
                        },
                        total: {
                            show: true,
                            label: "Total Task",
                            color: "#9E9E9E",
                            fontSize: "14px",
                            formatter: () => `${totalbudgetActualisationSeries}`,
                        },
                    },
                },
            },
        },
    };

     // ======== Budget vs Actualisation B ========
    const budgetActualisationSeriesB = [25, 10, 15]; // Completed, In Development (2), Remaining tasks
    const totalbudgetActualisationSeriesB = budgetActualisationSeriesB.reduce((a, b) => a + b, 0);

    const budgetActualisationOptionsB = {
        chart: { type: "donut" },
        labels: ["Total Running Projects in FY-25", "Budgeted", "UnBudgeted"],
        colors: ["#00BCD4", "#dc3545", "#6c757d"], // light cyan, gray tones
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
                startAngle: -90,
                endAngle: 90,
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
                            formatter: () => `${totalbudgetActualisationSeriesB}`,
                        },
                        total: {
                            show: true,
                            label: "Total Task",
                            color: "#9E9E9E",
                            fontSize: "14px",
                            formatter: () => `${totalbudgetActualisationSeriesB}`,
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
                {/* Budget Status */}
                <div className="col-md-6 mt-4">
                    <div className="card shadow-sm p-3">
                        <h6 className="text-secondary mb-3 fw-bold">Budget Status</h6>
                        <Chart
                            options={budgetOptions}
                            series={budgetSeries}
                            type="donut"
                            height={320}
                        />
                    </div>
                </div>

                {/* Projects FY-25-155 */}
                <div className="col-md-6 mt-4">
                    <div className="card shadow-sm p-3">
                        <h6 className="text-secondary mb-2">Total No.of</h6>
                        <h5 className="fw-bold mb-3">Projects FY-25-155</h5>
                        <Chart
                            options={projectOptions}
                            series={projectSeries}
                            type="bar"
                            height={350}
                        />
                    </div>
                </div>

                {/* Project status green , yellow  */}

                <div className="col-md-6 mt-4">
                    <div className="card shadow-sm p-3">
                        <h6 className="text-secondary mb-2">Project</h6>
                        <h5 className="fw-bold mb-3">Green, Yellow, Red Status</h5>
                        <Chart
                            options={projectOptionsForGraph}
                            series={projectSeriesForGraph}
                            type="bar"
                            height={350}
                        />
                    </div>
                </div>

                  {/* Budget vs Actualisation A */}
                <div className="col-md-6 mt-4">
                    <div className="card shadow-sm p-3">
                        <h6 className="text-secondary mb-3 fw-bold">Budget vs Actualisation against</h6>
                        <h5 className="fw-bold mb-3">FY-25 Budget</h5>
                        <Chart
                            options={budgetActualisationOptions}
                            series={budgetActualisationSeries}
                            type="donut"
                            height={320}
                        />
                    </div>
                </div>

                {/* Budget vs Actualisation B */}
                <div className="col-md-6 mt-4">
                    <div className="card shadow-sm p-3">
                        <h6 className="text-secondary mb-3 fw-bold">Budget vs Actualisation against</h6>
                        <h5 className="fw-bold mb-3">FY-25 Budget</h5>
                        <Chart
                            options={budgetActualisationOptionsB}
                            series={budgetActualisationSeriesB}
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
