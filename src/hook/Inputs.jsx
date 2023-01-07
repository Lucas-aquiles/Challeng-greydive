import React from "react";

export const Inputs = ({
  type,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
}) => {
  return type !== "select" ? (
    <>
      <input
        className="w-full  h-10 rounded-3xl pl-5 pr-5 "
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
    </>
  ) : (
    <select
      className="w-full h-10 rounded-3xl pl-5 "
      name={name}
      onChange={onChange}
    >
      {options?.map((e) => (
        <option key={e.value} value={e.value}>
          {e.label}
        </option>
      ))}
    </select>
  );
};
