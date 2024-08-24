import { PrintLabelInput } from "@/constants";
import { useEffect, useState } from "react";

export default function ProductLabel({ getLabel }) {
  const [label, setLabel] = useState({
    name: "Name",
    code: "Code",
    unit_price: "Unit Price",
    quantity: "Quantity",
    vat: "Vat",
    expired_date: "Ex. Date",
    delete: "Action",
  });

  useEffect(() => {
    getLabel(label);
  }, [label]);

  const updateLabel = (key, value) => {
    const newLabel = { ...label };
    newLabel[key] = value;
    setLabel(newLabel);
  };

  return (
    <form>
      <div className="form-row d-flex bg-dark mt-4 border rounded mb-1">
        {PrintLabelInput.map((item, index) => (
          <div key={index} className={`form-group ${item.classes}`}>
            <input
              value={label[item.label]}
              type="text"
              onChange={(event) => {
                updateLabel(item.label, event.target.value);
              }}
              className={`invoice-input form-control bg-dark text-white ${
                index === 6 ? "text-center" : "text-start"
              }`}
            />
          </div>
        ))}
      </div>
    </form>
  );
}
