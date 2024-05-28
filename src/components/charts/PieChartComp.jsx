/* eslint-disable react/prop-types */
// import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import axios from "axios";
import { useEffect, useState } from "react";
import { path } from "../../utils/Variables";

const PieChartComp = () => {
  const [etudiantCount, setEtudiantCount] = useState(0);
  const [teachCount, setTeachCount] = useState(0);
  const [labCount, setLabCount] = useState(0);
  // const [totatleCount, setTotatleCount] = useState(0);
  // const [users, setUsers] = useState([
  //   `${data.filter((item) => item.role === "etudiant")[0].user_count}`,
  //   `${data.filter((item) => item.role === "enseignant")[0].user_count}`,
  //   `${
  //     data.filter((item) => item.role === "chef de laboratoire")[0].user_count
  //   }`,
  // ]);

  // const [UsersCounts, setUsersCounts] = useState([]);

  const fetchData = async () => {
    const result = await axios.get(`${path}users/stats`);
    // setUsersCounts(result.data.data);
    // // console.log(result.data.data);
    // // console.log(
    //   result.data.data.filter((item) => item.role === "etudiant")[0].user_count
    // );
    // // console.log(percentages);
    setEtudiantCount(
      result.data.data
        ? result.data.data.filter((item) => item.role === "etudiant")[0]
        : 0
    );

    setTeachCount(
      result.data.data
        ? result.data.data.filter((item) => item.role === "enseignant")[0]
        : 0
    );

    setLabCount(
      result.data.data
        ? result.data.data.filter(
            (item) => item.role === "chef de laboratoire"
          )[0]
        : 0
    );
  };

  useEffect(() => {
    fetchData();

    // // console.log(data)
    // // console.log([
    //   `${data.filter((item) => item.role === "etudiant")[0]}`,
    //   `${data.filter((item) => item.role === "enseignant")[0]}`,
    //   `${
    //     data.filter((item) => item.role === "chef de laboratoire")[0]
    //   }`,
    // ]);
    // setUsers([
    //   `${data.filter((item) => item.role === "etudiant")[0].user_count}`,
    //   `${data.filter((item) => item.role === "enseignant")[0].user_count}`,
    //   `${
    //     data.filter((item) => item.role === "chef de laboratoire")[0].user_count
    //   }`,
    // ]);
  }, []);

  const getChartOptions = () => {
    return {
      // series: [52.8, 26.8, 20.4],
      series: [
        Number(etudiantCount.percentage),
        Number(teachCount.percentage),
        Number(labCount.percentage),
      ],
      // series: users?.user_count,
      colors: ["#1C64F2", "#16BDCA", "#9061F9"],
      chart: {
        height: 420,
        width: "100%",
        type: "pie",
      },
      stroke: {
        colors: ["white"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: "100%",
          dataLabels: {
            offset: -25,
          },
        },
      },
      labels: [etudiantCount.role, teachCount.role, labCount.role],
      // labels: ["Enseignants / Etudiants", "Chef Laboratoires", "Admins"],
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + "%";
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value + "%";
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    };
  };

  if (
    document.getElementById("pie-chart") &&
    typeof ApexCharts !== "undefined"
  ) {
    const chart = new ApexCharts(
      document.getElementById("pie-chart"),
      getChartOptions()
    );
    chart.render();
  }

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 h-fit">
      <div className="flex justify-between items-start w-full">
        <div className="flex-col items-center">
          <div className="flex items-center mb-1">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">
              Utilisateurs
            </h5>
          </div>
          <button
            id="dateRangeButton"
            data-dropdown-toggle="dateRangeDropdown"
            // data-dropdown-ignore-click-outside-className="datepicker"
            type="button"
            className="inline-flex items-center text-blue-700 dark:text-blue-600 font-medium hover:underline"
          >
            2024
          </button>
        </div>
      </div>

      {/* <!-- Line Chart --> */}
      <div className="py-6 " id="pie-chart"></div>
    </div>
  );
};

export default PieChartComp;
