import { useState, useEffect } from "react";
import axiosApi from "../api/axios-common";
import { useStateContext } from "../../context/ContextProvider";
import ProductLabel from "../../components/quotation/ProductLabel";
import QuotationSummary from "../../components/quotation/QuotationSummary";
import QuotationField from "../../components/quotation/QuotationField";
import { currency } from "../../helpers/config";
import AlertService from "../api/AlertService";
import Products from "../../components/quotation/Products";
import { MAX_LENGTH, QuotationData } from "@/constants";

export default function Quotations() {
  const [inputset, setInputSet] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [mail, setMail] = useState("");
  const { IP } = useStateContext();
  const route = "email-quotation-pdf";

  const [quotationData, setQuotationData] = useState(QuotationData);

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
          if (data) {
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
        }
      })
      .catch((err) => {
        console.log("get default api error", err);
      });
  };

  useEffect(() => {
    if (IP) {
      getQuotationData(IP);
    }
  }, [IP]);

  const saveDefaults = () => {
    if (!quotationData["ship_from"] || !quotationData["quotation_name"]) {
      AlertService.warn(
        `Please fill ${quotationData.ship_from_label}, quotation from and quotation name`
      );
      return;
    }

    let newQuotationData = {};

    Object.keys(quotationData).map((key) => {
      if (quotationData[key]) newQuotationData[key] = quotationData[key];
    });

    let allData = { ...newQuotationData, client_id: IP, data: inputset };

    axiosApi
      .post(`/save-quotation`, allData)
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
      let len = obj.quantity.toString().length;
      let len2 = obj.rate.toString().length;
      if (len > MAX_LENGTH || len2 > MAX_LENGTH) {
        AlertService.error(
          `${quotationData.quantity_label} & ${quotationData.rate_label} should not be more than ${MAX_LENGTH} digits`
        );
      }
      if (obj.quantity) newSubTotal += obj.amount;
    });
    if (newSubTotal.toString().length > MAX_LENGTH) {
      AlertService.error(
        `${quotationData.sub_total_label} should not be more ${MAX_LENGTH} digits`
      );
      return;
    }
    uploadData("sub_total", newSubTotal);
  }, [inputset]);

  useEffect(() => {
    const { sub_total, tax, discount, shipping } = quotationData;
    let newTotal =
      Number(sub_total) + Number(tax) - Number(discount) + Number(shipping);
    uploadData("total", newTotal);
  }, [
    quotationData.discount,
    quotationData.sub_total,
    quotationData.shipping,
    quotationData.tax,
  ]);

  const uploadData = (name, value) => {
    let len = value.toString().length;

    // maximum length for quotation number is MAX_LENGTH
    let maxLen = `${name === "quotation_number" ? MAX_LENGTH : 200}`;

    if (len > Number(maxLen)) {
      AlertService.error(`maximum input size exceeds for ${name}`);
      value = value.substr(0, maxLen);
    }

    setQuotationData((prevData) => ({
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
      Number(quotationData.total) - Number(quotationData.amount_paid);
    let changeAmount = newBalanceDue;
    if (changeAmount > 0) changeAmount = 0;
    uploadData("change_amount", -changeAmount);
    if (newBalanceDue < 0) newBalanceDue = 0;
    uploadData("balance_due", newBalanceDue);
  }, [
    quotationData.total,
    quotationData.amount_paid,
    quotationData.balance_due,
  ]);

  const postFormData = () => {
    if (!quotationData["ship_from"] || !quotationData["quotation_name"]) {
      AlertService.warn(
        `Please fill ${quotationData.ship_from_label}, quotation from and quotation name`
      );
      return;
    }
    const formData = new FormData();
    Object.keys(quotationData).forEach((key) => {
      if (quotationData[key]) formData.append(key, quotationData[key]);
    });

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
        setQuotationData={setQuotationData}
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
