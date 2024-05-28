import { useEffect, useState } from "react";
import { path } from "../../utils/Variables";
import axios from "axios";
import { RubricCard, RubricModal } from "../../components";


const Rubrics = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // const [filterData, setfilterData] = useState([]);
  const [filterData, setfilterData] = useState([]);
  // const [masterData, setmasterData] = useState([]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const fetchData = async () => {
    const result = await axios.get(`${path}rubrics`);
    setfilterData(result.data.data);
    // setmasterData(result.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="w-full flex flex-row items-center justify-between bg-white rounded-md shadow px-4 py-3">
          <h1 className="font-bold text-xl text-[#101828] ">Rubriques</h1>

          <button
            className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white  outline-none transition-all ease-in-out duration-150 "
            onClick={toggleModal}
          >
            <span className="relative px-3 py-1.5  bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 transition-all ease-in-out duration-300">
              Ajouter un Rubrique
            </span>
          </button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {filterData
            .slice(0)
            .reverse()
            .map(({ id, label }, idx) => {
              return (
                <RubricCard
                  key={idx}
                  data={{
                    id,
                    label,
                  }}
                  fetchData={fetchData}
                />
              );
            })}
        </div>
      </div>
      <RubricModal
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        fetchData={fetchData}
      />
    </>
  );
};

export default Rubrics;
