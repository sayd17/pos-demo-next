import React from "react";
import { TrashIcon, PlusIcon } from "@heroicons/react/outline";
import InputGroup from "../common/InputGroup";

export default function Products({
  quotationData,
  inputset,
  setInputSet,
  handleInputValue,
}) {
  // calculate amount for a product
  const calculateAmount = (index, event, field) => {
    let newValue = event.target.value;

    const updatedInputSet = [...inputset];
    const item = updatedInputSet[index];
    if (field === "quantity") {
      updatedInputSet[index].amount = item.rate * newValue;
    } else if (field === "rate") {
      updatedInputSet[index].amount = newValue * item.quantity;
    }
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
      <div className=" mt-1 ">
        {inputset.map((item, index) => {
          return (
            <form key={index}>
              <div className="form-row d-flex gx-1">
                <div className="col-5 col-md-3">
                  <input
                    value={item.description}
                    type="text"
                    placeholder="Description of item/service..."
                    className="invoice-input col-12 bg-light p-2 border-1 border-gray-200 rounded"
                    onChange={(e) =>
                      handleInputValue(index, e.target.value, "description")
                    }
                  />
                </div>
                <div className="col-4 col-md-2">
                  <input
                    value={item.quantity}
                    type="number"
                    className="invoice-input col-12 bg-light p-2 border-1 border-gray-200 rounded "
                    onChange={(event) =>
                      calculateAmount(index, event, "quantity")
                    }
                  />
                </div>
                <div className="col-5 col-md-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      {quotationData.currency}
                    </span>

                    <input
                      value={item.rate}
                      type="number"
                      className="invoice-input form-control bg-light border-gray-200 rounded "
                      onChange={(event) =>
                        calculateAmount(index, event, "rate")
                      }
                    />
                  </div>
                </div>
                <div className="col-7 col-md-3">
                  <div className="input-group">
                    <span className="input-group-text border-0">
                      {quotationData.currency}
                    </span>

                    <input
                      value={item.amount}
                      type="number"
                      className="invoice-input form-control border-0 bg-light border-gray-200 rounded "
                      disabled="true"
                      onChange={(event) =>
                        calculateAmount(index, event, "amount")
                      }
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
          className="btn m-2 border-1 text-white border-gray-200 rounded outline-none focus:border-purple-500"
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
