import ApexCharts from "apexcharts";
import { useState } from "react";

const DonutChartComp = () => {
  // const chartContainerRef = useRef(null);
  const [selectedDevices, setSelectedDevices] = useState([]); // State to track selected devices

  const getChartOptions = () => {
    return {
      series: [35.1, 23.5, 2.4, 5.4],
      colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
      chart: {
        height: 320,
        width: "100%",
        type: "donut",
      },
      stroke: {
        colors: ["transparent"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: 20,
              },
              total: {
                showAlways: true,
                show: true,
                label: "Unique visitors",
                fontFamily: "Inter, sans-serif",
                formatter: function (w) {
                  const sum = w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                  return "$" + sum + "k";
                },
              },
              value: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: -20,
                formatter: function (value) {
                  return value + "k";
                },
              },
            },
            size: "80%",
          },
        },
      },
      grid: {
        padding: {
          top: -2,
        },
      },
      labels: ["Direct", "Sponsor", "Affiliate", "Email marketing"],
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + "k";
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value + "k";
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
    document.getElementById("donut-chart") &&
    typeof ApexCharts !== "undefined"
  ) {
    const chart = new ApexCharts(
      document.getElementById("donut-chart"),
      getChartOptions()
    );
    chart.render();

    // Get all the checkboxes by their class name
    const checkboxes = document.querySelectorAll(
      '#devices input[type="checkbox"]'
    );

    // Function to handle the checkbox change event
    // function handleCheckboxChange(event, chart) {
    //     const checkbox = event.target;
    //     if (checkbox.checked) {
    //         switch(checkbox.value) {
    //           case 'desktop':
    //             chart.updateSeries([15.1, 22.5, 4.4, 8.4]);
    //             break;
    //           case 'tablet':
    //             chart.updateSeries([25.1, 26.5, 1.4, 3.4]);
    //             break;
    //           case 'mobile':
    //             chart.updateSeries([45.1, 27.5, 8.4, 2.4]);
    //             break;
    //           default:
    //             chart.updateSeries([55.1, 28.5, 1.4, 5.4]);
    //         }

    //     } else {
    //         chart.updateSeries([35.1, 23.5, 2.4, 5.4]);
    //     }
    // }

    // State to track selected devices

    const handleCheckboxChange = (event) => {
      const { checked, value } = event.target;

      // Update selectedDevices based on checkbox state
      setSelectedDevices((prevDevices) => {
        if (checked) {
          return [...prevDevices, value]; // Add value if checked
        } else {
          return prevDevices.filter((device) => device !== value); // Remove value if unchecked
        }
      });

      // Update chart based on selectedDevices (assuming chart.updateSeries exists)
      if (chart) {
        // Check if chart reference is available
        const seriesData = {
          desktop: [15.1, 22.5, 4.4, 8.4],
          tablet: [25.1, 26.5, 1.4, 3.4],
          mobile: [45.1, 27.5, 8.4, 2.4],
          default: [55.1, 28.5, 1.4, 5.4],
        };

        chart.updateSeries(
          selectedDevices.length === 0
            ? seriesData.default // Use default if nothing selected
            : selectedDevices.map((device) => seriesData[device])
        );
      }
    };

    // Attach the event listener to each checkbox
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (event) =>
        handleCheckboxChange(event, chart)
      );
    });
  }

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 h-fit">
      <div className="flex justify-between mb-3">
        <div className="flex justify-center items-center">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
            Website traffic
          </h5>
         
        </div>
       
      </div>

      <div>
        <div className="flex" id="devices">
          <div className="flex items-center me-4">
            <input
              id="desktop"
              type="checkbox"
              value="desktop"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="desktop"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Desktop
            </label>
          </div>
          <div className="flex items-center me-4">
            <input
              id="tablet"
              type="checkbox"
              value="tablet"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="tablet"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Tablet
            </label>
          </div>
          <div className="flex items-center me-4">
            <input
              id="mobile"
              type="checkbox"
              value="mobile"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="mobile"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Mobile
            </label>
          </div>
        </div>
      </div>

      {/* <!-- Donut Chart --> */}
      <div className="py-6" id="donut-chart"></div>


    </div>
  );
};

export default DonutChartComp;
