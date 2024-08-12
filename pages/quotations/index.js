import { useState, useEffect } from "react";
import axiosApi from "../api/axios-common";
import { useStateContext } from "../../context/ContextProvider";
import ProductLabel from "../../components/quotation/ProductLabel";
import QuotationSummary from "../../components/quotation/QuotationSummary";
import QuotationField from "../../components/quotation/QuotationField";
import { MAX_FILE_SIZE, currency } from "../../helpers/config";
import AlertService from "../api/AlertService";
import Products from "../../components/quotation/Products";

export default function Quotations() {
  const [inputset, setInputSet] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [mail, setMail] = useState(null);
  const { IP } = useStateContext();
  const route = "email-quotation-pdf";

  const [quotationData, setQuotationData] = useState({
    ship_to_label: "Ship To",
    ship_from_label: "Ship From",
    po_number_label: "PO Number",
    po_number: "",
    description_label: "Description",
    quantity_label: "Quantity",
    rate_label: "Rate",
    discount_amount_label: "Discount",
    vat_label: "Vat",
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
    quotation_name: "Quotation Name",
    quotation_number: 1,
    quotation_person: "",
    ship_from: "",
    total: 0,
    tax: 0,
    discount_amount: 0,
    shipping: 0,
    currency: "৳",
    client_id: "",
  });

  useEffect(() => {
    let newQuotationData = { ...quotationData, client_id: IP };
    setQuotationData(newQuotationData);
  }, [IP]);

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const searchCurrency = (event) => {
    const { value } = event.target;
    const currencyCode = value.toLowerCase();
    const matchedCurrency = currency.find(
      (element) => element.code.toLowerCase() === currencyCode
    );

    if (matchedCurrency) {
      uploadData("currency", matchedCurrency.symbol);
    }
  };

  // get default data for a particular user
  const getQuotationData = (IP) => {
    let payload = { client_id: IP };

    axiosApi
      .post(`/get-quotation`, payload)
      .then((res) => {
        if (!isEmptyObject(res?.data?.data)) {
          let data = res.data.data[0];
          let keys = Object.keys(data);
          const quotationProducts = "quotation_products";
          keys.map((key) => {
            if (key !== quotationProducts && data[key]) {
              uploadData(key, data[key]);
            } else if (key == "quotation_products") {
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
      getQuotationData(IP);
    }
  }, [IP]);

  const saveDefaults = () => {
    let newQuotationData = { ...quotationData, client_id: IP, data: inputset };

    axiosApi
      .post(`/save-quotation`, newQuotationData)
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
        discount: 0,
        vat: 0,
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
    const { sub_total, tax, discount_amount, shipping } = quotationData;
    let newTotal =
      Number(sub_total) +
      Number(tax) -
      Number(discount_amount) +
      Number(shipping);
    uploadData("total", newTotal);
  }, [
    quotationData.discount_amount,
    quotationData.sub_total,
    quotationData.shipping,
    quotationData.tax,
  ]);

  const uploadData = (name, value) => {
    setQuotationData((prevData) => ({
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
      Number(quotationData.total) - Number(quotationData.amount_paid);
    uploadData("balance_due", newBalanceDue);
  }, [quotationData.total, quotationData.amount_paid]);

  const postFormData = () => {
    if (!quotationData["ship_from"] || !quotationData["quotation_name"]) {
      AlertService.warn("Please fill ship from, ship to and quotation name");
      return;
    }
    const formData = new FormData();
    Object.keys(quotationData).forEach((key) =>
      formData.append(key, quotationData[key])
    );

    if (selectedFile) formData.append("logo", selectedFile);

    formData.append("data", JSON.stringify(inputset));

    axiosApi
      .post(`/quotations`, formData, {
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
        link.download = "quotation.pdf";
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
        <p className="h5">Quotations</p>
      </div>
      <QuotationField
        searchCurrency={searchCurrency}
        quotationData={quotationData}
        uploadData={uploadData}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        saveDefaults={saveDefaults}
        inputset={inputset}
        mail={mail}
        setMail={setMail}
        submitButton={() => {
          postFormData();
        }}
      />
      <div className="horizontal-scrollable">
        <div className="row">
          <ProductLabel quotationData={quotationData} uploadData={uploadData} />
          <Products
            inputset={inputset}
            setInputSet={setInputSet}
            handleInputValue={handleInputValue}
            quotationData={quotationData}
          />
        </div>
      </div>
      <QuotationSummary
        quotationData={quotationData}
        uploadData={uploadData}
        inputset={inputset}
        handleInputValue={handleInputValue}
        setSelectedFile={setSelectedFile}
        setInput={setInput}
        clientId={quotationData.client_id}
        saveDefaults={saveDefaults}
        mail={mail}
        setMail={setMail}
        route={route}
        selectedFile={selectedFile}
        submitButton={() => {
          postFormData();
        }}
      />
    </>
  );
}
