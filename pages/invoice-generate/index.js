import { useState, useEffect, useRef } from "react";
import axiosApi from "../api/axios-common";
import { useStateContext } from "../../context/ContextProvider";
import ProductLabel from "../../components/invoice/ProductLabel";
import InvoiceSummary from "../../components/invoice/InvoiceSummary";
import InvoiceField from "../../components/invoice/InvoiceField";
import AlertService from "../api/AlertService";
import Products from "../../components/invoice/Products";

export default function InvoiceGenerate() {
  const [inputset, setInputSet] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [mail, setMail] = useState(null);
  const { IP } = useStateContext();
  const route = "email-invoice-pdf";

  const [invoiceData, setInvoiceData] = useState({
    ship_to_label: "Ship To",
    ship_from_label: "Ship From",
    po_number_label: "PO Number",
    po_number: "",
    description_label: "Description",
    quantity_label: "Quantity",
    rate_label: "Rate",
    amount_label: "Amount",
    action_label: "Action",
    notes_label: "Notes",
    notes: "",
    terms_label: "Terms and Conditions",
    terms_and_conditions: "",
    sub_total_label: "Subtotal",
    sub_total: 0,
    total_label: "Total",
    discount_label: "Discount",
    tax_label: "Tax",
    shipping_label: "Shipping",
    amount_paid_label: "Amount Paid",
    amount_paid: 0,
    payment_terms_label: "Payment Terms",
    payment_terms: "",
    date_label: "Date",
    due_date_label: "Due Date",
    due_date: "",
    balance_due_label: "Balance Due",
    balance_due: 0,
    invoice_name: "Invoice Name",
    invoice_number: 1,
    invoice_person: "",
    ship_from: "",
    total: 0,
    tax: 0,
    discount: 0,
    shipping: 0,
    currency: "৳",
    client_id: "",
  });

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
      })
      .catch((err) => {
        console.log("get default api error", err);
      });
  };

  useEffect(() => {
    if (IP !== null) {
      getInvoiceData(IP);
    }
  }, [IP]);

  const saveDefaults = () => {
    let newInvoiceData = { ...invoiceData, client_id: IP, data: inputset };

    axiosApi
      .post(`/save-invoice`, newInvoiceData)
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
      newSubTotal += obj.amount;
    });
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
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // store input value for products
  const handleInputValue = (index, targetValue, key) => {
    const formValue = [...inputset];
    formValue[index][key] = targetValue;
    setInputSet(formValue);
  };

  useEffect(() => {
    let newBalanceDue =
      Number(invoiceData.total) - Number(invoiceData.amount_paid);
    uploadData("balance_due", newBalanceDue);
  }, [invoiceData.total, invoiceData.amount_paid]);

  const postFormData = () => {
    if (!invoiceData["ship_from"] || !invoiceData["invoice_name"]) {
      AlertService.warn("Please fill ship from, ship to and invoice name");
      return;
    }
    const formData = new FormData();
    Object.keys(invoiceData).forEach((key) =>
      formData.append(key, invoiceData[key])
    );

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
        handleInputValue={handleInputValue}
        setInputSet={setInputSet}
        setSelectedFile={setSelectedFile}
        setInput={setInput}
        saveDefaults={saveDefaults}
        clientId={invoiceData.client_id}
        route={route}
        mail={mail}
        setMail={setMail}
        selectedFile={selectedFile}
        submitButton={() => {
          postFormData();
        }}
      />
    </>
  );
}
