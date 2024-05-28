import ApexCharts from "apexcharts";
import axios from "axios";
import { PiFilesLight } from "react-icons/pi";
import { path } from "../../utils/Variables";
import { useEffect, useState } from "react";

const CulChart = () => {
  const [dataCount, setDataCount] = useState([{
        name: "Accepter",
        color: "#1A56DB",
        data: []
      },
        {
          name: "Refuser",
          color: "#FDBA8C",
          data: [
          ],
        },
      ])
      const [count, setCount] = useState(0)
  const options = {
    colors: ["#1A56DB", "#FDBA8C"],
    series: dataCount,  
    // series: [
    //   {
    //     name: "Etudiants",
    //     color: "#1A56DB",
    //     data: [
    //       { x: "2018", y: 231 },
    //       { x: "2019", y: 122 },
    //       { x: "2020", y: 63 },
    //       // { x: "2021", y: 421 },
    //       // { x: "2022", y: 122 },
    //       // { x: "2023", y: 323 },
    //       // { x: "2024", y: 111 },
    //     ],
    //   },
    //   {
    //     name: "Enseignats",
    //     color: "#FDBA8C",
    //     data: [
    //       { x: "2018", y: 232 },
    //       { x: "2019", y: 113 },
    //       { x: "2020", y: 341 },
          
    //     //   { x: "2021", y: 224 },
    //     //   { x: "2022", y: 522 },
    //     //   { x: "2023", y: 411 },
    //     //   { x: "2024", y: 243 },
    //     ],
    //   },
    // ],
    chart: {
      type: "bar",
      height: "320px",
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadiusApplication: "end",
        borderRadius: 8,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 1,
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ["transparent"],
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -14,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      floating: false,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
  };

  if (
    document.getElementById("column-chart") &&
    typeof ApexCharts !== "undefined"
  ) {
    const chart = new ApexCharts(
      document.getElementById("column-chart"),
      options
    );
    chart.render();
  }

  const fetchData = async () => {
    const result = await axios.get(`${path}demandes/stats/years`);
    // setDemandeStats(result.data.datap);
    setDataCount(result.data.data);
    setCount(result.data.total);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 h-fit">
      <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
            <PiFilesLight size={24} />
          </div>
          <div>
            <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
             {count}
            </h5>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              demandes totale
            </p>
          </div>
        </div>
        {/* <div>
          <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
            <svg
              className="w-2.5 h-2.5 me-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13V1m0 0L1 5m4-4 4 4"
              />
            </svg>
            42.5%
          </span>
        </div> */}
      </div>

      <div id="column-chart"></div>
    </div>
  );
};

export default CulChart;
