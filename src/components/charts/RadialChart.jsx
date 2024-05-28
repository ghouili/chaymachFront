import { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { path } from "../../utils/Variables";
import axios from "axios";

const RadialChart = () => {
  const [demandeStats, setDemandeStats] = useState({});
  const [demandeCount, setDemandeCount] = useState({});
  const chartRef = useRef(null);

  const getChartOptions = () => {
    return {
      // series: [90, 85, 70],
      series: [
        demandeStats["En cour"],
        demandeStats.Refuser,
        demandeStats.Refuser,
      ],
      colors: ["#1C64F2", "#16BDCA", "#FDBA8C"],
      chart: {
        height: "380px",
        width: "100%",
        type: "radialBar",
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          track: {
            background: "#E5E7EB",
          },
          dataLabels: {
            show: false,
          },
          hollow: {
            margin: 0,
            size: "32%",
          },
        },
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -23,
          bottom: -20,
        },
      },
      labels: ["D. En cour", "D. Accepter", "D. Refuser"],
      legend: {
        show: true,
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        labels: {
          formatter: function (value) {
            return value + "%";
          },
        },
      },
    };
  };

  useEffect(() => {
    const element = chartRef.current;
    if (element && typeof ApexCharts !== "undefined") {
      const chart = new ApexCharts(element, getChartOptions());
      chart.render();
    }
  }, [chartRef, getChartOptions]);

  const fetchData = async () => {
    const result = await axios.get(`${path}demandes/stats`);
    setDemandeStats(result.data.datap);
    setDemandeCount(result.data.datac);
    // // console.log(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 h-fit">
      <div className="flex justify-between mb-3">
        <div className="flex items-center">
          <div className="flex justify-center items-center">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
              Demandes Effectuer
            </h5>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
        <div className="grid grid-cols-3 gap-3 mb-2">
          <dl className="bg-orange-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
            <dt className="w-8 h-8 rounded-full bg-orange-100 dark:bg-gray-500 text-orange-600 dark:text-orange-300 text-sm font-medium flex items-center justify-center mb-1">
              {demandeCount.Refuser}
            </dt>
            <dd className="text-orange-600 dark:text-orange-300 text-sm font-medium">
              D. Refuser
            </dd>
          </dl>
          <dl className="bg-teal-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
            <dt className="w-8 h-8 rounded-full bg-teal-100 dark:bg-gray-500 text-teal-600 dark:text-teal-300 text-sm font-medium flex items-center justify-center mb-1">
              {demandeCount.Accepter}
            </dt>
            <dd className="text-teal-600 dark:text-teal-300 text-sm font-medium">
              D. Accepter
            </dd>
          </dl>
          <dl className="bg-blue-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
            <dt className="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-500 text-blue-600 dark:text-blue-300 text-sm font-medium flex items-center justify-center mb-1">
              {demandeCount["En cour"]}
            </dt>
            <dd className="text-blue-600 dark:text-blue-300 text-sm font-medium">
              D. En cour
            </dd>
          </dl>
        </div>

        <div
          id="more-details"
          className="border-gray-200 border-t dark:border-gray-600 pt-3 mt-3 space-y-2 hidden"
        >
          <dl className="flex items-center justify-between">
            <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal">
              Average task completion rate:
            </dt>
            <dd className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
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
              </svg>{" "}
              57%
            </dd>
          </dl>
          <dl className="flex items-center justify-between">
            <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal">
              Days until sprint ends:
            </dt>
            <dd className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-gray-600 dark:text-gray-300">
              13 days
            </dd>
          </dl>
          <dl className="flex items-center justify-between">
            <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal">
              Next meeting:
            </dt>
            <dd className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-gray-600 dark:text-gray-300">
              Thursday
            </dd>
          </dl>
        </div>
      </div>

      {/* <!-- Radial Chart --> */}
      <div className="py-6" id="radial-chart" ref={chartRef}></div>
    </div>
  );
};

export default RadialChart;
