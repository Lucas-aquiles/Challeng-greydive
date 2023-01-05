import React from "react";

export const Inputs = ({ type, name, value, onChange, onBlur, options }) => {
    console.log(options)
  return type !== "select" ? (
    <input type={type} name={name} onChange={onChange} onBlur={onBlur} />
  ) : (
    <select name={name} onChange={onChange}>
        {options?.map(e=>
                     <option value={e.value}>{e.label}</option>

            
            )}
         

    </select>
  );
};
