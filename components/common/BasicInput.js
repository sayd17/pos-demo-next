import React from "react";

export default function BasicInput({
  value,
  uploadData,
  classes,
  input,
  placeholder,
}) {
  return (
    <>
      <input
        value={value}
        onChange={(event) => {
          uploadData(input, event.target.value);
        }}
        placeholder={placeholder}
        className={`p-2 ${classes}`}
      />
    </>
  );
}
