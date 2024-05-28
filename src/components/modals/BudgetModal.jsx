/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

import InputField from "../inputFields/InputField";
import SelectField from "../inputFields/SelectField";
import { path } from "../../utils/Variables";

const BudgetModal = ({ modalOpen, toggleModal, fetchData, data }) => {
  const [secondaryData, setSecondaryData] = useState([]);

  const [formValues, setFormValues] = useState({
    annee: "",
    id_rubric: "",
    montant_depose: "",
    montant_prevue: "",
  });

  const fetchSecondaryData = async () => {
    const result = await axios.get(`${path}rubrics`);
    setSecondaryData(result.data.data);
  };

  useEffect(() => {
    if (data) {
      setFormValues(data);
    }
  }, [data]);

  useEffect(() => {
    fetchSecondaryData();
  }, []);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const closeModal = () => {
    setFormValues({
      annee: "",
      id_rubric: "",
      montant_depose: "",
      montant_prevue: "",
    });
    toggleModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    // console.log(typeof formValues.annee);
    try {
      let url, result;
      if (data) {
        url = `${path}budgets/${formValues.id}`;
        result = await axios.put(url, formValues);
      } else {
        url = `${path}budgets`;
        result = await axios.post(url, formValues);
      }
      // console.log(result);
      if (result.data.success === true) {
        fetchData();
        closeModal();
        swal("Success!", result.data.message, "success");
      } else {
        return swal("Error!", result.data.message, "error");
      }
    } catch (error) {
      console.error(error);
      return swal(
        "Error!",
        "Something went wrong. Please try again later.",
        "error"
      );
    }
  };

  return (
    <div>
      {/* Main modal */}
      {modalOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-30 backdrop-filter backdrop-blur-sm "></div>
          {/* <div className="fixed inset-0 bg-black opacity-50"></div> */}
          <div className="relative p-4 w-full max-w-4xl max-h-full overflow-y-auto overflow-x-hidden">
            {/* Modal content */}
            <div className="relative bg-white border rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {formValues.id
                    ? "Mettre a jour Ce Budget"
                    : "Ajouter Nouveau Budget"}
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4">
                <div className="w-full grid grid-cols-2 gap-6 ">
                  {/* Email :: */}
                  <InputField
                    type="Text"
                    label="Annee"
                    name="annee"
                    placeholder="..."
                    value={formValues.annee}
                    onChange={handleInputChange}
                  />

                  {/* Rubrique :: */}
                  <SelectField
                    label="Rubrique"
                    name="id_rubric"
                    value={formValues.id_rubric}
                    onChange={handleInputChange}
                    options={secondaryData.map(({ id, label }) => ({
                      value: id,
                      label: label,
                    }))}
                  />

                  {/* lastname :: */}
                  <InputField
                    type="text"
                    label="Montant Depose"
                    name="montant_depose"
                    placeholder="..."
                    value={formValues.montant_depose}
                    onChange={handleInputChange}
                  />
                  {/* MTPrevue :: */}
                  <InputField
                    type="Text"
                    label="Montant Prevue"
                    name="montant_prevue"
                    placeholder="..."
                    value={formValues.montant_prevue}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {/* Modal footer */}
              <div className="w-full border flex items-center justify-end gap-6 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={closeModal}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetModal;
