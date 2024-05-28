/* eslint-disable react/prop-types */

import axios from "axios";
import swal from "sweetalert";
import { path } from "../../utils/Variables";
import { useState } from "react";
import DemandeModal from "../modals/DemandeModal";
import Cookies from "universal-cookie";

const DemandeCard = ({ data, fetchData }) => {
  const cookies = new Cookies();
  let userId = cookies.get("userId");
  const { id, id_user, type, montant, annee, status, description, user } = data;

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const deleteUser = async () => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this Admin?",
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
    <div className="">
      <div className="relative w-full flex flex-col gap-6 bg-white p-7 shadow rounded-md ">
        <span
          className={`absolute top-8 right-6 ${
            status === "En cour"
              ? "bg-blue-100 text-blue-800"
              : status === "Accepter"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } text-sm font-medium me-2 px-2.5 py-0.5 rounded `}
        >
          {status}
        </span>

        <div className="flex flex-row items-center gap-8">
          <div className="">
            <h2 className="text-gray-800 text-xl">
              {user?.firstName} {user?.lastName}
            </h2>
            <span className="text-gray-500">{annee}</span>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-gray-800 text-lg">Type:</h2>
            <span className="text-gray-500 text-base font-medium">{type}</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-gray-800 text-lg">Montant:</h2>
            <span className="text-gray-500 text-base font-medium">
              {montant}
            </span>
          </div>
          <div className="mt-6 flex flex-row items-start justify-between overflow-auto h-44 border rounded-md p-3">
            {/* <h2 className="text-gray-800"></h2> */}
            <span className="text-gray-500 text-base font-medium">
              {description}
            </span>
          </div>
        </div>
        {userId?.role === "admin" ? (
          <div className="grid grid-cols-2 gap-4 w-full text-gray-700 items4center ">
            <button
              disabled={["Accepter"].includes(status)}
              onClick={toggleModal}
              className={`w-full py-1 rounded-md  border bg-blue-50 hover:bg-cyan-800 text-cyan-800 hover:text-white transition-all ease-in-out duration-500 ${
                status === "Accepter" ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Accepter
            </button>
            <button
              disabled={["Refuser"].includes(status)}
              onClick={deleteUser}
              // cursor-not-allowed
              className={`w-full py-1 rounded-md  border bg-red-50 text-red-800 hover:text-white hover:bg-rose-800 transition-all ease-in-out duration-500 ${
                status === "Refuser" ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Refuser
            </button>
          </div>
        ) : status !== "En cour" ? null : (
          <div className="grid grid-cols-2 gap-4 w-full text-gray-700 items4center ">
            <button
              disabled={status !== "En cour"}
              onClick={toggleModal}
              className={`w-full py-1 rounded-md  border bg-blue-50 hover:bg-cyan-800 text-cyan-800 hover:text-white transition-all ease-in-out duration-500 ${
                status !== "En cour" ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Modifier
            </button>
            <button
              disabled={status !== "En cour"}
              onClick={deleteUser}
              // cursor-not-allowed
              className={`w-full py-1 rounded-md  border bg-red-50 text-red-800 hover:text-white hover:bg-rose-800 transition-all ease-in-out duration-500 ${
                status !== "En cour" ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
      <DemandeModal
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        fetchData={fetchData}
        data={{ id, id_user, type, montant, annee, status, description }}
      />
    </div>
  );
};

export default DemandeCard;
