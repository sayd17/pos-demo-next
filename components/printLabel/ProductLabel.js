import { useState } from "react";

export default function ProductLabel() {
  const [label, setLabel] = useState({
    name: "Name",
    code: "Code",
    unit_price: "Unit Price",
    quantity: "Quantity",
    vat: "Vat",
    expired_date: "Ex. Date",
    delete: "Action",
  });

  const updateLabel = (key, value) => {
    const newLabel = { ...label };
    newLabel[key] = value;
    setLabel(newLabel);
  };

  return (
    <div className="col">
      <form>
        <div className="form-row d-flex bg-dark mt-4 border rounded mb-1">
          <div className="form-group col-3 col-md-2">
            <input
              value={label.name}
              type="text"
              onChange={(event) => {
                updateLabel("name", event.target.value);
              }}
              className="invoice-input form-control bg-dark text-white text-start"
            />
          </div>
          <div className="form-group col-3 col-md-2">
            <input
              value={label.code}
              type="text"
              onChange={(event) => {
                updateLabel("code", event.target.value);
              }}
              className="invoice-input form-control text-start bg-dark text-white "
            />
          </div>
          <div className="form-group col-3 col-md-2">
            <input
              value={label.unit_price}
              type="text"
              onChange={(event) => {
                updateLabel("unit_price", event.target.value);
              }}
              className="invoice-input form-control text-start bg-dark text-white "
            />
          </div>
          <div className="form-group col-3 col-md-2">
            <input
              value={label.quantity}
              type="text"
              onChange={(event) => {
                updateLabel("quantity", event.target.value);
              }}
              className="invoice-input form-control text-start bg-dark text-white "
            />
          </div>
          <div className="form-group col-2 col-md-1">
            <input
              value={label.vat}
              type="text"
              onChange={(event) => {
                updateLabel("vat", event.target.value);
              }}
              className="invoice-input form-control text-start bg-dark text-white "
            />
          </div>
          <div className="form-group col-4 col-md-2">
            <input
              value={label.expired_date}
              type="text"
              onChange={(event) => {
                updateLabel("expired_date", event.target.value);
              }}
              className="invoice-input form-control text-start bg-dark text-white "
            />
          </div>
          <div className="form-group col-2 col-md-1">
            <input
              value={label.delete}
              type="text"
              onChange={(event) => {
                updateLabel("delete", event.target.value);
              }}
              className="invoice-input form-control text-center bg-dark text-white "
            />
          </div>
        </div>
      </form>
    </div>
  );
}
