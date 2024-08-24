import React from "react";

export default function InputGroup({
  inputSymbol,
  value,
  isDisabled,
  border,
  field,
  uploadData,
}) {
  return (
    <>
      <div className="input-group">
        <span className={`input-group-text ${border}`}>{inputSymbol}</span>

        <input
          type="number"
          disabled={isDisabled}
          value={value ? value : 0}
          className={`invoice-input input-group-border bg-light form-control opacity-1 ${border}`}
          placeholder="0"
          onChange={(e) => {
            let newValue = e.target.value;
            if (newValue > 0) {
              newValue = newValue.replace(/^0+/, "");
            }
            uploadData(field, newValue);
          }}
        />
      </div>
    </>
  );
}
