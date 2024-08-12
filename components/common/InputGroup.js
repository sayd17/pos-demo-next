import React from "react";

export default function InputGroup({
  currency,
  value,
  isDisabled,
  border,
  field,
  uploadData,
}) {
  return (
    <>
      <div className="input-group">
        <span className="input-group-text border-0">{currency}</span>

        <input
          type="number"
          disabled={isDisabled}
          value={value}
          className={`invoice-input bg-light rounded form-control opacity-1 ${border}`}
          placeholder="0"
          onChange={(e) => uploadData(field, e.target.value)}
        />
      </div>
    </>
  );
}
