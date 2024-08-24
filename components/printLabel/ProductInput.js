import { useState, useEffect } from "react";
import { TrashIcon, PlusIcon } from "@heroicons/react/outline";
import AlertService from "@/pages/api/AlertService";
import { PrintLabelInput } from "@/constants";

export default function ProductInput({ uploadData, label }) {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    !product.length && setInput();
  }, []);

  useEffect(() => {
    product.map((item, index) => {
      if (item.code < 0) {
        AlertService.error(`${label.code} should not be negative`);
        return;
      }
    });
    uploadData(product);
  }, [product]);

  const setInput = () => {
    setProduct([
      {
        name: "",
        code: "0",
        quantity: 1,
        unit_price: 0,
        vat: 0,
        expired_date: "",
        amount: 0,
      },
    ]);
  };

  const updateData = (index, event, field) => {
    let newValue = event.target.value;

    // remove leading zeroes
    newValue = newValue.replace(/^0+/, "");

    if (newValue < 0 || !newValue) {
      newValue = 0;
      AlertService.error(`${label[field]} can not be negative or empty`);
    }

    const updatedInputSet = [...product];
    const item = updatedInputSet[index];

    let MaxLen = `${field === "quantity" ? 3 : 16}`;

    if (newValue.toString().length > MaxLen) {
      AlertService.error(
        `${label[field]} should not be more than ${MaxLen} digits`
      );
      return;
    }
    updatedInputSet[index][field] = newValue;
    setProduct(updatedInputSet);
  };

  // add product item
  const addRow = (event) => {
    let newItem = {
      name: "",
      code: "0",
      quantity: 1,
      unit_price: 0,
      vat: 0,
      expired_date: "",
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
    let len = targetValue.toString().length;

    if ((key === "code" && len > 16) || !targetValue) {
      targetValue = targetValue.substr(0, 16);
      AlertService.error(
        `${label.code} should not be more than 16 digits or empty`
      );
    } else if (len > 200) {
      AlertService.error(`maximum input size exceeds`);
      targetValue = targetValue.substr(0, 200);
    }
    const formValue = [...product];
    formValue[index][key] = targetValue;
    setProduct(formValue);
  };

  return (
    <>
      {product.map((item, index) => {
        return (
          <div key={index}>
            <form>
              <div className="form-row d-flex">
                {PrintLabelInput.map((field, ind) => (
                  <div
                    key={ind}
                    className={`form-group ${field.classes} ${
                      ind === 6 ? "text-center" : "text-start"
                    }`}
                  >
                    {ind === 6 ? (
                      <TrashIcon
                        style={{
                          height: "20px",
                          width: "20px",
                          color: "#ff1a1a",
                        }}
                        onClick={() => removeItem(index)}
                        className="bg-white "
                      />
                    ) : (
                      <input
                        value={item[field.label]}
                        type={field.type}
                        placeholder={field.placeholder ? field.placeholder : ""}
                        className="invoice-input col-12 bg-light p-2 border-1 border-gray-200 rounded"
                        onChange={(event) => {
                          ind >= 2 && ind <= 4
                            ? updateData(index, event, field.label)
                            : handleInputValue(
                                index,
                                event.target.value,
                                field.label
                              );
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </form>
          </div>
        );
      })}
      <div className="text-start">
        <button
          type="button"
          style={{ backgroundColor: "#0070ba" }}
          className="btn m-2 border-1 text-white rounded outline-none"
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
