import {
  PlusIcon,
  SaveIcon,
  MailIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { useEffect } from "react";
import { sendMail } from "../common/SendMail";
import axiosApi from "../../pages/api/axios-common";
import AlertService from "../../pages/api/AlertService";
import InputGroup from "../common/InputGroup";
import { InvoiceData, NotesTerms, QuotationData, Summary } from "@/constants";
export default function QuotationSummary({
  quotationData,
  uploadData,
  inputset,
  submitButton,
  clientId,
  setSelectedFile,
  setInput,
  saveDefaults,
  mail,
  setMail,
  setQuotationData,
  route,
  selectedFile,
}) {
  useEffect(() => {
    const { discount, tax, sub_total, discount_label, tax_label } =
      quotationData;

    if (discount > sub_total || tax > sub_total) {
      AlertService.error(
        `${discount_label}, & ${tax_label} should not be more than Subtotal`
      );
      uploadData("discount", sub_total);
      uploadData("tax", sub_total);
    }
  }, [quotationData.discount, quotationData.tax, quotationData.sub_total]);

  useEffect(() => {
    const { shipping, shipping_label } = quotationData;

    let len = shipping.toString().length;
    if (len > 14) {
      AlertService.error(`${shipping} should not be more than 14 digits`);
      uploadData("shipping", shipping.substring(0, 14));
    }
  }, [quotationData.shipping]);

  useEffect(() => {
    const { amount_paid, amount_paid_label } = quotationData;

    let len = amount_paid.toString().length;
    if (len > 14) {
      AlertService.error(
        `${amount_paid_label} should not be more than 14 digits`
      );
      uploadData("amount_paid", amount_paid.substring(0, 14));
    }
  }, [quotationData.amount_paid]);

  // clear all data
  const clearButton = () => {
    let payload = { clientId: clientId };
    axiosApi
      .post("/clear-quotation-data", payload)
      .then((res) => {
        AlertService.success("Cleared data successfully");
        resetData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetData = () => {
    QuotationData["client_id"] = clientId;
    setInput();
    setSelectedFile(null);
    setQuotationData(QuotationData);
  };

  return (
    <div className="pb-4">
      <div className="row d-flex flex-wrap ">
        <div className="d-flex flex-wrap col-12 col-md-6 flex-column gap-3">
          {NotesTerms.map((item, index) => (
            <div key={index} className="d-flex flex-column gap-1">
              <input
                value={quotationData[item.label]}
                onChange={(event) => {
                  uploadData(item.label, event.target.value);
                }}
                className="col-12 invoice-input border col-12 border-0"
              />
              <textarea
                id="notes"
                name="notes"
                rows="2"
                cols="40"
                value={quotationData[item.value]}
                className="invoice-input bg-light w-full h-full opacity-10 cursor-pointer w-full col-12 p-1 rounded outline-none"
                placeholder="Notes - any relevant information not already covered"
                onChange={(e) => uploadData(item.value, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="d-flex col-12 col-md-6 flex-column gap-1">
          {Summary.map((item, index) => (
            <div key={index} className="row">
              <div className="col-md-5 p-md-0">
                <input
                  value={quotationData[item.label]}
                  onChange={(event) => {
                    uploadData(item.label, event.target.value);
                  }}
                  className="col-12 invoice-input my-1 label-start border border-0 p-2"
                />
              </div>

              <div className="col-md-7">
                <InputGroup
                  inputSymbol={quotationData.currency}
                  value={quotationData[item.value]}
                  uploadData={uploadData}
                  field={item.value}
                  isDisabled={item.isDisabled}
                  border={item.isDisabled ? "border-0" : "border-1"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mt-1 d-block d-md-none">
          Give Email Below
        </label>
        <textarea
          type="text"
          name="email"
          id="email"
          onChange={(ev) => setMail(ev.target.value)}
          className="invoice-input border-1 d-block col-12 mb-1 d-md-none w-full p-1 rounded"
          value={mail}
          placeholder="Separate mail by comma"
        />
        <div className="row d-flex flex-row-reverse m-1">
          <button
            type="button"
            onClick={() => clearButton()}
            className="btn col-12 bg-danger text-white col-md-1 my-2 d-block p-2"
          >
            <span>
              <XCircleIcon className="icon" />
              <span>Clear</span>
            </span>
          </button>
        </div>
        <button
          onClick={() =>
            sendMail(route, quotationData, inputset, mail, selectedFile)
          }
          className="invoice-input bg-blue d-block col-12 d-md-none text-white border-0 w-full p-2 rounded"
        >
          <span>
            <MailIcon className="icon" />
            Send quotation To Email
          </span>
        </button>
      </div>

      <div>
        <button
          type="button"
          onClick={saveDefaults}
          className="invoice-input col-12 bg-blue text-white d-block my-2 d-md-none border-0 w-full p-2 rounded"
        >
          <span>
            <SaveIcon className="icon" />
            Save Details
          </span>
        </button>
      </div>
      <div>
        <button
          type="button"
          style={{ backgroundColor: "#0070ba" }}
          onClick={() => submitButton()}
          className="btn col-12 text-white d-block my-2 d-md-none p-2"
        >
          <span>
            <PlusIcon className="icon" />
            Create
          </span>
        </button>
      </div>
    </div>
  );
}
