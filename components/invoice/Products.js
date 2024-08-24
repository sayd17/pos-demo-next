import React from "react";
import { TrashIcon, PlusIcon } from "@heroicons/react/outline";
import AlertService from "@/pages/api/AlertService";
import { MAX_PRODUCT_LENGTH } from "@/constants";

export default function Products({
  invoiceData,
  inputset,
  setInputSet,
  handleInputValue,
}) {
  // calculate amount for a product
  const calculateAmount = (index, event, field) => {
    let newValue = event.target.value;

    // remove leading zeroes
    if (newValue > 0) {
      newValue = newValue.replace(/^0+/, "");
    }

    const updatedInputSet = [...inputset];
    const item = updatedInputSet[index];

    if (newValue < 0 || !newValue) {
      newValue = 0;
      let inputLabel = `${field}_label`;
      AlertService.error(
        `${invoiceData[inputLabel]} can not be negative or empty`
      );
    }

    // two fields rate and quantity
    let oppositeField = `${field == "rate" ? "quantity" : "rate"}`;
    let amount = item[oppositeField] * newValue;

    if (amount.toString().length > MAX_PRODUCT_LENGTH) {
      AlertService.error(
        `${invoiceData.amount_label} should not be more than ${MAX_PRODUCT_LENGTH} digits`
      );
      return;
    }
    updatedInputSet[index].amount = amount;

    updatedInputSet[index][field] = newValue;
    setInputSet(updatedInputSet);
  };

  // add product item
  const addRow = (event) => {
    let newItem = {
      description: "",
      quantity: 1,
      rate: 0,
      discount: 0,
      vat: 0,
      amount: 0,
    };
    const allItem = [...inputset, newItem];
    setInputSet(allItem);
  };

  // remove a product
  const removeItem = (index) => {
    let allItem = [...inputset];
    let removedItem = allItem.splice(index, 1);
    setInputSet(allItem);
  };
  return (
    <>
      <div className="mt-1">
        {inputset.map((item, index) => {
          return (
            <form key={index}>
              <div className="form-row d-flex gx-1">
                <div className="col-5 col-md-3">
                  <input
                    value={item.description}
                    type="text"
                    placeholder="Description of item/service..."
                    className="invoice-input col-12 bg-light p-2 border-1  rounded"
                    onChange={(e) =>
                      handleInputValue(index, e.target.value, "description")
                    }
                  />
                </div>
                <div className="col-4 col-md-2">
                  <input
                    value={item.quantity}
                    min="0"
                    type="number"
                    className="invoice-input col-12 bg-light p-2 border-1  rounded "
                    onChange={(event) =>
                      calculateAmount(index, event, "quantity")
                    }
                  />
                </div>
                <div className="col-5 col-md-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      {invoiceData.currency}
                    </span>

                    <input
                      value={item.rate}
                      type="number"
                      className="invoice-input form-control bg-light input-group-border"
                      onChange={(event) =>
                        calculateAmount(index, event, "rate")
                      }
                    />
                  </div>
                </div>
                <div className="col-7 col-md-3">
                  <div className="input-group">
                    <span className="input-group-text border-0">
                      {invoiceData.currency}
                    </span>

                    <input
                      value={item.amount}
                      type="number"
                      disabled={true}
                      className="form-control bg-light border-0  rounded"
                    />
                  </div>
                </div>

                <div className="col-3 col-md-1 text-center cancel-btn">
                  <TrashIcon
                    style={{
                      height: "20px",
                      width: "20px",
                      color: "#ff1a1a",
                    }}
                    onClick={() => removeItem(index)}
                    className="invoice-input border-0 bg-white"
                  />
                </div>
              </div>
            </form>
          );
        })}
      </div>
      <div className="text-start text-md-end">
        <button
          type="button"
          style={{ backgroundColor: "#0070ba" }}
          className="btn m-2 border-1 text-white  rounded outline-none focus:border-purple-500"
          onClick={addRow}
        >
          <span>
            <PlusIcon className="icon" />
            Add Item
          </span>
        </button>
      </div>
    </>
  );
}
