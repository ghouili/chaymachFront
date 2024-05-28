import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { path } from "../../utils/Variables";
import axios from "axios";

const DemandeSubMenu = () => {
  const location = useLocation();
  const [secondaryData, setSecondaryData] = useState([]);

  const fetchSecondaryData = async () => {
    const result = await axios.get(`${path}rubrics`);
    setSecondaryData(result.data.data);
  };

  useEffect(() => {
    fetchSecondaryData();
  }, []);

  return (
    <div className="my-6 w-full flex flex-row items-center justify-between p-4 rounded-md bg-white shadow overflow-auto">
      <div className="flex flex-row items-center gap-6">
        <Link
          to="/demandes"
          className={`text-lg font-semibold hover:text-[#25ABC0] ${
            location.pathname === "/demandes"
              ? "text-[#25ABC0]"
              : "text-[#A6A6A6]"
          }`}
        >
          Tout
        </Link>
        {secondaryData.map(({ id, label }, idx) => {
          return (
            <Link
              key={idx}
              to={`/demandes/${id}`}
              className={`text-lg font-semibold hover:text-[#25ABC0] ${
                location.pathname === `/demandes/${id}` ? "text-[#25ABC0]" : "text-[#A6A6A6]"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DemandeSubMenu;
