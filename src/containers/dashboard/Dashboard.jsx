// import { useState } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  CulChart,
  DashboardCard,
  DonutChartComp,
  PieChartComp,
  RadialChart,
} from "../../components";
import { path } from "../../utils/Variables";

const Dashboard = () => {
  const [count, setCount] = useState({
    admin: 0,
    "chef de laboratoire": 0,
    enseignant: 0,
    etudiant: 0,
  });

  const fetchData = async () => {
    const result = await axios.get(`${path}users/count`);
    // console.log(result.data);
    setCount(result.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full grid grid-cols-3 gap-6">
        <DashboardCard label={"Admin"} data={count.admin} />
        <DashboardCard
          label={"Enseignants / Etudiants"}
          data={count.enseignant + count.etudiant}
        />
        <DashboardCard label={"Chef Laboratoires"} data={count["chef de laboratoire"]} />
      </div>
      <div className="h-fit w-full grid grid-cols-4 gap-6">
        <PieChartComp />
        <CulChart />
        <RadialChart />
        <DonutChartComp />
      </div>
    </div>
  );
};

export default Dashboard;
