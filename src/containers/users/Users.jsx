import { useEffect, useState } from "react";
import axios from "axios";

import { AddUserModal, UserCard } from "../../components";
import { path } from "../../utils/Variables";

const Users = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterData, setfilterData] = useState([]);
  // const [masterData, setmasterData] = useState([]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const fetchData = async () => {
    const result = await axios.get(`${path}users`);
    setfilterData(result.data.data);
    // setmasterData(result.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full flex flex-row items-center justify-between bg-white rounded-md shadow px-4 py-3">
        <h1 className="font-bold text-xl text-[#101828] ">Utilisateurs</h1>

        <button
          className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white  outline-none transition-all ease-in-out duration-150 "
          onClick={toggleModal}
        >
          <span className="relative px-3 py-1.5  bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 transition-all ease-in-out duration-300">
            Ajouter un utilisateur
          </span>
        </button>
      </div>

      <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
        {filterData
          .slice(0)
          .reverse()
          .map(({ id, firstName, lastName, cin, email, role, avatar }, idx) => {
            return (
              <UserCard
                key={idx}
                data={{
                  id,
                  avatar,
                  firstName,
                  lastName,
                  role,
                  email,
                  cin,
                }}
                fetchData={fetchData}
              />
            );
          })}
      </div>
      <AddUserModal
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        fetchData={fetchData}
        data={null}
      />
    </>
  );
};

export default Users;
