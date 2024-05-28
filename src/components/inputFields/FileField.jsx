/* eslint-disable react/prop-types */

import { FiUpload } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";

const FileField = ({ previewUrl, filePickerRef, pickedHandler, formValues }) => {
  return (
    <>
      {previewUrl ? (
        <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
          <img
            src={previewUrl}
            alt="product_pic"
            className="h-full w-full object-cover object-center rounded-md"
          />
          <label
            htmlFor="pictureID"
            className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
          >
            <BiEdit size={20} />
            <input
              type="file"
              name="picture"
              id="pictureID"
              className="hidden"
              accept=".jpg,.png,.jpeg"
              ref={filePickerRef}
              onChange={pickedHandler}
            />
          </label>
        </div>
      ) : formValues.avatar ? (
        <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
          <img
            src={`http://localhost:8000/images/${formValues.avatar}`}
            alt="product_pic"
            className="h-full w-full object-cover object-center rounded-md"
          />
          <label
            htmlFor="pictureID"
            className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
          >
            <BiEdit size={20} />
            <input
              type="file"
              name="picture"
              id="pictureID"
              className="hidden"
              accept=".jpg,.png,.jpeg"
              ref={filePickerRef}
              onChange={pickedHandler}
            />
          </label>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center pb-6 ">
          <label
            htmlFor="pictureID"
            className="mx-auto w-fit flex flex-col items-center justify-center rounded-lg border-2 border-gray-700 p-4 text-gray-700 cursor-pointer"
          >
            <FiUpload size={30} />
            <input
              type="file"
              name="picture"
              id="pictureID"
              className="hidden"
              accept=".jpg,.png,.jpeg"
              ref={filePickerRef}
              onChange={pickedHandler}
            />
            <span className="text-gray-700">Select a picture</span>
          </label>
        </div>
      )}
    </>
  );
};

export default FileField;
