/* eslint-disable react/prop-types */

const SelectField = ({label, name, value, onChange, options}) => {
  return (
    <div className="w-full relative">
        <label
        htmlFor="nom"
        className="absolute bg-white left-3 -top-2.5 px-0.5 text-xs font-medium text-gray-600 "
      >
        {label}
      </label>
      <select
        
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className=" w-full p-2 bg-white border text-gray-500  text-sm rounded-md border-gray-400 outline-none  "
      >
        <option >
        {label}
        </option>
        {options.map(({label, value}, idx) => {
            return(

                <option key={idx} value={value}>{label}</option>
            )
        })}
      </select>
    </div>
  );
};

export default SelectField;
