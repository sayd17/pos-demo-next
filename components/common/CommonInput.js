import React from "react";

export default function CommonInput({
  value,
  uploadData,
  classes,
  input,
  inputType,
  placeholder,
}) {
  return (
    <>
      <input
        value={value}
        type={inputType ? inputType : "text"}
        onChange={(event) => {
          uploadData(input, event.target.value);
        }}
        placeholder={placeholder}
        className={`invoice-input p-2 ${classes}`}
      />
    </>
  );
}
