/* eslint-disable react/prop-types */
import { BsTrash } from "react-icons/bs";
import { LuPen } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BudgetModal from "../modals/BudgetModal";
import axios from "axios";
import { path } from "../../utils/Variables";
import swal from "sweetalert";

const BudgetsTabless = ({ data, fetchData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [filterData, setfilterData] = useState([]);
  // const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState("");

  const toggleModal = (data) => {
    if (!data) {
      setDataToUpdate(null);
    }
    setDataToUpdate(data);
    setModalOpen(!modalOpen);
  };

  const searchFilter = (text) => {
    // text from the search input
    // use filterdata to display data at all times
    if (text) {
      // masterdata have alla the data in our table that we gonna serch in
      const newData = data.filter((item) => {
        // conctinate each object to be 1 big uppercase string::
        const itemData = Object.values(item).join(" ").toUpperCase();
        // the text from the search input become uppercase
        const textData = text.toUpperCase();
        // check if the text from the search input exist in the string of the object it means we search in ll the object :
        return itemData.indexOf(textData) > -1;
      });
      // filterdata have the filter result
      setfilterData(newData);
      setSearch(text);
    } else {
      // if text is empty we display all the data in filter
      setfilterData(data);
      setSearch(text);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setfilterData(data);
  }, [data]);

  const deleteData = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this Budget?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      const result = await axios.delete(`${path}budgets/${id}`);

      if (result.data.success) {
        swal("Success!", result.data.message, "success");
        fetchData();
      } else {
        return swal("Error!", result.adta.message, "error");
      }
    }
  };

  return (
    <>
      <div className="relative">
        <div className="flex flex-row items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-t-md shadow">
          <div className="">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-3 h-3 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                value={search}
                onChange={(e) => searchFilter(e.target.value)}
                className="block p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                placeholder="Chercher Budget..."
              />
            </div>
          </div>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-b-md ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Rebrique
              </th>
              <th scope="col" className="px-6 py-3">
                Année
              </th>
              <th scope="col" className="px-6 py-3">
                Montant Prevue
              </th>
              <th scope="col" className="px-6 py-3">
                Montant Depose
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filterData
              .slice(0)
              .reverse()
              .map(
                (
                  {
                    id,
                    rubric,
                    id_rubric,
                    annee,
                    montant_prevue,
                    montant_depose,
                  },
                  index
                ) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-[#5CC0D0] whitespace-nowrap dark:text-white flex flex-row items-center  "
                      >
                        <Link to={`/patient/id`}>{rubric.label}</Link>
                      </th>
                      <td className="px-6 py-4 flex-row justify-center">
                        {annee}
                      </td>
                      <td className="px-6 py-4 flex-row justify-center">
                        {montant_prevue} DT
                      </td>
                      <td className="px-6 py-4 flex-row justify-center">
                        {montant_depose} DT
                      </td>
                      <td className="px-6 py-4 flex flex-row items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            toggleModal({
                              id,
                              id_rubric,
                              rubric,
                              annee,
                              montant_prevue,
                              montant_depose,
                            });
                          }}
                          className="font-medium border p-1.5 bg-gray-200 text-gray-500 rounded-md hover:text-white hover:bg-[#25ABC0] transition-all ease-in-out duration-300"
                        >
                          <LuPen size={20} />
                        </button>
                        <div
                          onClick={() => deleteData(id)}
                          className="font-medium border p-1.5 bg-gray-200 text-gray-500 rounded-md hover:text-white hover:bg-[#C70039] transition-all ease-in-out duration-300 cursor-pointer"
                        >
                          <BsTrash size={20} />
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>
      <BudgetModal
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        fetchData={fetchData}
        data={dataToUpdate}
      />
    </>
  );
};

export default BudgetsTabless;
