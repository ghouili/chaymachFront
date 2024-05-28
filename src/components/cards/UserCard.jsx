/* eslint-disable react/prop-types */

import axios from "axios";
import swal from "sweetalert";
import { path } from "../../utils/Variables";
import AddUserModal from "../modals/AddUserModal";
import { useState } from "react";

const UserCard = ({ data, fetchData }) => {
  const { id, avatar, firstName, lastName, role, email, cin } = data;

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const deleteUser = async () => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this user?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      const result = await axios.delete(`${path}users/${id}`);

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
      <div className="w-full flex flex-col gap-6 bg-white p-7 shadow rounded-md ">
        <div className="flex flex-row items-center gap-8">
          {avatar ? (
            <img
              className="w-16 h-16 rounded-lg"
              src={`http://localhost:8000/images/${avatar}`}
              alt="avatar"
            />
          ) : (
            <div className="w-14 h-14 rounded-md bg-gray-100 flex justify-center items-center text-gray-800 font-semibold text-xl">
              <span>
                {!avatar ? `${firstName.charAt(0)}${lastName.charAt(0)}` : ""}
              </span>
            </div>
          )}
          <div className="">
            <h2 className="text-gray-800">
              {firstName} {lastName}
            </h2>
            <span className="text-gray-500">{role}</span>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-gray-800">CIN:</h2>
            <span className="text-gray-500">{cin}</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-gray-800">Email:</h2>
            <span className="text-gray-500">{email}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full text-gray-700 items4center ">
          <button
            onClick={toggleModal}
            className="w-full py-1 rounded-md  border bg-blue-50 hover:bg-cyan-800 text-cyan-800 hover:text-white transition-all ease-in-out duration-500 "
          >
            Modifier
          </button>
          <button
            onClick={deleteUser}
            className="w-full py-1 rounded-md  border bg-red-50 text-red-800 hover:text-white hover:bg-rose-800 transition-all ease-in-out duration-500"
          >
            Supprimer
          </button>
        </div>
      </div>
      <AddUserModal
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        fetchData={fetchData}
        data={{ id, avatar, firstName, lastName, role, email, cin }}
      />
    </>
  );
};

export default UserCard;
