/* eslint-disable react/prop-types */

const TextAreaField = ({ label, name, value, onChange, placeholder }) => {
  return (
    <div className="w-full relative">
      <label
        htmlFor={name}
        className="absolute bg-white left-3 -top-2.5 px-0.5 text-xs font-medium text-gray-600 "
      >
        {label}
      </label>
      {/* <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-400 outline-none text-sm rounded-md px-2 py-1.5   "
      /> */}
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        rows="4"
        className="w-full border border-gray-400 outline-none text-sm rounded-md px-2 py-1.5   "
      ></textarea>
    </div>
  );
};

export default TextAreaField;
