import React from "react";

export const Inputs = ({ type, name, value, onChange, onBlur, options }) => {
  return type !== "select" ? (
    <input  className="w-full  h-10 rounded-lg" type={type} name={name} onChange={onChange} onBlur={onBlur} />
  ) : (
    <select   className="w-full h-10 rounded-lg "  name={name} onChange={onChange}>
      {options?.map((e) => (
        <option key={e.value} value={e.value}>
          {e.label}
        </option>
      ))}
    </select>
  );
};
