import { useState, useEffect } from "react";
import { TrashIcon, PlusIcon } from "@heroicons/react/outline";

export default function ProductInput({ uploadData }) {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    !product.length && setInput();
  }, []);

  useEffect(() => {
    uploadData(product);
  }, [product]);

  const setInput = () => {
    setProduct([
      {
        name: "",
        code: "123456",
        quantity: 1,
        unit_price: 0,
        vat: 0,
        expired_date: "",
        amount: 0,
      },
    ]);
  };

  const submitButton = () => {};

  const calculateAmount = (index, event, field) => {
    let newValue = event.target.value;

    const updatedInputSet = [...product];
    const item = updatedInputSet[index];
    if (field === "quantity") {
      updatedInputSet[index].amount =
        Number(newValue) * (Number(item.unit_price) + Number(item.vat));
    } else if (field === "unit_price") {
      updatedInputSet[index].amount =
        Number(item.quantity) * (Number(newValue) + Number(item.vat));
    } else {
      updatedInputSet[index].amount =
        Number(item.quantity) * (Number(item.unit_price) + Number(newValue));
    }
    updatedInputSet[index][field] = newValue;
    setProduct(updatedInputSet);
  };

  // add product item
  const addRow = (event) => {
    let newItem = {
      name: "",
      code: "123456",
      quantity: 1,
      unit_price: 0,
      vat: 0,
      expired_date: "",
      amount: 0,
    };
    const allItem = [...product, newItem];
    setProduct(allItem);
  };

  // remove a product
  const removeItem = (index) => {
    let allItem = [...product];
    let removedItem = allItem.splice(index, 1);
    setProduct(allItem);
  };

  // store input value for products
  const handleInputValue = (index, targetValue, key) => {
    const formValue = [...product];
    formValue[index][key] = targetValue;
    setProduct(formValue);
  };

  return (
    <>
      {product.map((item, index) => {
        return (
          <div key={index} className="col">
            <form>
              <div className="form-row d-flex">
                <div className="form-group col-3 col-md-2">
                  <input
                    value={item.name}
                    type="text"
                    placeholder="Product name"
                    className="invoice-input col-12 bg-light p-2 border-1 border-gray-200 rounded"
                    onChange={(e) =>
                      handleInputValue(index, e.target.value, "name")
                    }
                  />
                </div>
                <div className="form-group col-3 col-md-2">
                  <input
                    value={item.code}
                    type="number"
                    className="invoice-input col-12 bg-light p-2 border-1 border-gray-200 rounded "
                    onChange={(event) => calculateAmount(index, event, "code")}
                  />
                </div>
                <div className="form-group col-3 col-md-2">
                  <input
                    value={item.unit_price}
                    type="number"
                    className="invoice-input col-12 bg-light p-2 border-1 border-gray-200 rounded "
                    onChange={(event) =>
                      calculateAmount(index, event, "unit_price")
                    }
                  />
                </div>
                <div className="form-group col-3 col-md-2">
                  <input
                    value={item.quantity}
                    type="number"
                    className="invoice-input col-12 bg-light p-2 border-1 border-gray-200 rounded "
                    onChange={(event) =>
                      calculateAmount(index, event, "quantity")
                    }
                  />
                </div>
                <div className="form-group col-2 col-md-1">
                  <input
                    value={item.vat}
                    type="number"
                    className="invoice-input form-control col-12 bg-light p-2 border-1 border-gray-200 rounded "
                    onChange={(event) => calculateAmount(index, event, "vat")}
                  />
                </div>

                <div className="form-group col-4 col-md-2">
                  <input
                    value={item.expired_date}
                    type="date"
                    className="date-input form-control p-2"
                    onChange={(e) =>
                      handleInputValue(index, e.target.value, "expired_date")
                    }
                  />
                </div>
                <div className="col-2 col-md-1 form-group text-center p-2">
                  <TrashIcon
                    style={{
                      height: "20px",
                      width: "20px",
                      color: "#ff1a1a",
                    }}
                    onClick={() => removeItem(index)}
                    className="bg-white "
                  />
                </div>
              </div>
            </form>
          </div>
        );
      })}
      <div className="text-start">
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
