/* eslint-disable react/prop-types */

import axios from "axios";
import swal from "sweetalert";
import { path } from "../../utils/Variables";
import { useState } from "react";
import RubricModal from "../modals/RubricModal";

const RubricCard = ({ data, fetchData }) => {
  const { id, label } = data;

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const deleteData = async () => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this Rubrique?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      const result = await axios.delete(`${path}rubrics/${id}`);

      if (result.data.success) {
        swal("Success!", result.data.message, "success");
        fetchData();
      } else {
        return swal("Error!", result.adta.message, "error");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-6 bg-white p-3 shadow rounded-md ">
        <div className="flex flex-row items-center gap-8">
          <div className="w-full flex flex-row justify-center">
            <h2 className=" text-2xl text-[#3e5ebe] ">{label}</h2>
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
            onClick={deleteData}
            className="w-full py-1 rounded-md  border bg-red-50 text-red-800 hover:text-white hover:bg-rose-800 transition-all ease-in-out duration-500"
          >
            Supprimer
          </button>
        </div>
      </div>
      <RubricModal
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        fetchData={fetchData}
        data={{ id, label }}
      />
    </div>
  );
};

export default RubricCard;
