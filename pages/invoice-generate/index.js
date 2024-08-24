import { useState, useEffect, useRef } from "react";
import axiosApi from "../api/axios-common";
import { useStateContext } from "../../context/ContextProvider";
import ProductLabel from "../../components/invoice/ProductLabel";
import InvoiceSummary from "../../components/invoice/InvoiceSummary";
import InvoiceField from "../../components/invoice/InvoiceField";
import AlertService from "../api/AlertService";
import Products from "../../components/invoice/Products";
import { InvoiceData, MAX_LENGTH } from "@/constants";

export default function InvoiceGenerate() {
  const [inputset, setInputSet] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [mail, setMail] = useState("");
  const { IP } = useStateContext();
  const route = "email-invoice-pdf";

  const [invoiceData, setInvoiceData] = useState(InvoiceData);

  useEffect(() => {
    let newInvoiceData = { ...invoiceData, client_id: IP };
    setInvoiceData(newInvoiceData);
  }, [IP]);

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  // get default data for a particular user
  const getInvoiceData = (IP) => {
    let payload = { client_id: IP };

    axiosApi
      .post(`/get-invoice`, payload)
      .then((res) => {
        if (!isEmptyObject(res?.data?.data)) {
          let data = res.data.data[0];
          if (data) {
            let keys = Object.keys(data);
            const invoiceProducts = "invoice_products";
            keys.map((key) => {
              if (key !== invoiceProducts && data[key]) {
                uploadData(key, data[key]);
              } else if (key == "invoice_products") {
                setInputSet(data[key]);
              }
            });
          }
        }
      })
      .catch((err) => {
        console.log("get default api error", err);
      });
  };

  useEffect(() => {
    if (IP) {
      getInvoiceData(IP);
    }
  }, [IP]);

  const saveDefaults = () => {
    if (!invoiceData["ship_from"] || !invoiceData["invoice_name"]) {
      AlertService.warn(
        `Please fill ${invoiceData.ship_from_label}, invoice from and invoice name`
      );
      return;
    }

    let newInvoiceData = {};
    Object.keys(invoiceData).map((key) => {
      if (invoiceData[key]) newInvoiceData[key] = invoiceData[key];
    });

    let allData = { ...newInvoiceData, client_id: IP, data: inputset };

    axiosApi
      .post(`/save-invoice`, allData)
      .then((response) => {
        AlertService.success("Saved Successfully");
      })
      .catch((error) => {
        console.log("save default api", error);
      });
  };

  useEffect(() => {
    !inputset.length && setInput();
  }, []);

  const setInput = () => {
    setInputSet([
      {
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ]);
  };

  useEffect(() => {
    let newSubTotal = 0;
    inputset.map((obj, index) => {
      let len = obj.quantity.toString().length;
      let len2 = obj.rate.toString().length;
      if (len > MAX_LENGTH || len2 > MAX_LENGTH) {
        AlertService.error(
          `${invoiceData.quantity_label} & ${invoiceData.rate_label} should not be more than ${MAX_LENGTH} digits`
        );
      }
      if (obj.quantity) newSubTotal += obj.amount;
    });
    if (newSubTotal.toString().length > MAX_LENGTH) {
      AlertService.error(
        `${invoiceData.sub_total_label} should not be more ${MAX_LENGTH} digits`
      );
      return;
    }
    uploadData("sub_total", newSubTotal);
  }, [inputset]);

  useEffect(() => {
    const { sub_total, tax, discount, shipping } = invoiceData;
    let newTotal =
      Number(sub_total) + Number(tax) - Number(discount) + Number(shipping);
    uploadData("total", newTotal);
  }, [
    invoiceData.discount,
    invoiceData.sub_total,
    invoiceData.shipping,
    invoiceData.tax,
  ]);

  const uploadData = (name, value) => {
    let len = value.toString().length;

    // maximum length for invoice number is MAX_LENGTH
    let maxLen = `${name === "invoice_number" ? MAX_LENGTH : 200}`;

    if (len > maxLen) {
      AlertService.error(`maximum input size exceeds for ${name}`);

      value = value.substr(0, maxLen);
    }

    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // store input value for products
  const handleInputValue = (index, targetValue, key) => {
    let len = targetValue.toString().length;
    if (len > 200) {
      AlertService.error(`maximum input size exceeds`);
      targetValue = targetValue.substr(0, 200);
    }

    const formValue = [...inputset];
    formValue[index][key] = targetValue;
    setInputSet(formValue);
  };

  useEffect(() => {
    let newBalanceDue =
      Number(invoiceData.total) - Number(invoiceData.amount_paid);
    let changeAmount = newBalanceDue;
    if (changeAmount > 0) changeAmount = 0;
    uploadData("change_amount", -changeAmount);
    if (newBalanceDue < 0) newBalanceDue = 0;
    uploadData("balance_due", newBalanceDue);
  }, [invoiceData.total, invoiceData.amount_paid, invoiceData.balance_due]);

  const postFormData = () => {
    if (
      !invoiceData["ship_from"] ||
      !invoiceData["invoice_name"] ||
      !invoiceData["invoice_person"]
    ) {
      AlertService.warn(
        `Please fill ${invoiceData.ship_from_label}, invoice from and invoice name`
      );
      return;
    }
    const formData = new FormData();
    Object.keys(invoiceData).forEach((key) => {
      if (invoiceData[key]) formData.append(key, invoiceData[key]);
    });

    if (selectedFile) formData.append("logo", selectedFile);

    formData.append("data", JSON.stringify(inputset));

    axiosApi
      .post(`/invoices`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      })
      .then(function (response) {
        const link = document.createElement("a");
        const blob = new Blob([response.data], {
          type: response.headers["Content-Type"],
        });

        link.href = window.URL.createObjectURL(blob);
        link.download = "invoice.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const test = (recevedData) => {
    uploadData("currency", recevedData);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <p className="h5">Invoice</p>
      </div>
      <InvoiceField
        invoiceData={invoiceData}
        uploadData={uploadData}
        inputset={inputset}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        saveDefaults={saveDefaults}
        mail={mail}
        setMail={setMail}
        submitButton={() => {
          postFormData();
        }}
      />

      <div className="horizontal-scrollable">
        <div className="row">
          <ProductLabel invoiceData={invoiceData} uploadData={uploadData} />

          <Products
            inputset={inputset}
            setInputSet={setInputSet}
            handleInputValue={handleInputValue}
            invoiceData={invoiceData}
          />
        </div>
      </div>

      <InvoiceSummary
        invoiceData={invoiceData}
        uploadData={uploadData}
        inputset={inputset}
        setInvoiceData={setInvoiceData}
        setInput={setInput}
        saveDefaults={saveDefaults}
        clientId={invoiceData.client_id}
        route={route}
        mail={mail}
        setMail={setMail}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        submitButton={() => {
          postFormData();
        }}
      />
    </>
  );
}
