/* eslint-disable react/prop-types */

import { HiMiniArrowTrendingUp  } from "react-icons/hi2";

const DashboardCard = ( {label, data} ) => {

    // const { title, value, } = data;
    return (
        <div className="w-full rounded-md shadow flex flex-col bg-blue-200">
            <div className="w-full p-4">
                <div className="flex flex-col justify-center font-semibold text-gray-950 gap-4">
                    <span className="text-xl">
                        {label}
                    </span>
                    <span className="text-2xl">
                        {data}
                    </span>
                    {/* <div className="h-6" /> */}
                </div>
            </div>
            {/* <div className="w-2" /> */}
            <div className="w-full p-2 flex flex-row gap-0.5 items-center justify-end text-2xs">
                {/* <FaMinus /> */}
                {/* <span>11.01 %</span> */}
                <HiMiniArrowTrendingUp />
            </div>

        </div>
    )
}


export default DashboardCard