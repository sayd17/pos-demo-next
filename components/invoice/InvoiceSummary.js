import {
  PlusIcon,
  SaveIcon,
  MailIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import axiosApi from "../../pages/api/axios-common";
import AlertService from "../../pages/api/AlertService";
import { sendMail } from "../common/SendMail";
import InputGroup from "../common/InputGroup";
import { useEffect } from "react";
import { InvoiceData, MAX_LENGTH, Summary } from "@/constants";
import { NotesTerms } from "@/constants";

export default function InvoiceSummary({
  invoiceData,
  setInvoiceData,
  uploadData,
  inputset,
  submitButton,
  clientId,
  setInput,
  saveDefaults,
  mail,
  setMail,
  selectedFile,
  setSelectedFile,
  route,
}) {
  useEffect(() => {
    const { discount, tax, sub_total, discount_label, tax_label } = invoiceData;
    if (discount > sub_total || tax > sub_total) {
      AlertService.error(
        `${discount_label}, & ${tax_label} should not be more than Subtotal`
      );
      uploadData("discount", sub_total);
      uploadData("tax", sub_total);
    }
  }, [invoiceData.discount, invoiceData.tax, invoiceData.sub_total]);

  useEffect(() => {
    const { shipping, shipping_label } = invoiceData;
    let len = shipping.toString().length;
    if (len > MAX_LENGTH) {
      AlertService.error(
        `${shipping_label} should not be more than ${MAX_LENGTH} digits`
      );
      uploadData("shipping", shipping.substring(0, MAX_LENGTH));
    }
  }, [invoiceData.shipping]);

  useEffect(() => {
    const { amount_paid, amount_paid_label } = invoiceData;
    let len = amount_paid.toString().length;
    if (len > MAX_LENGTH) {
      AlertService.error(
        `${amount_paid_label} should not be more than ${MAX_LENGTH} digits`
      );
      uploadData("amount_paid", amount_paid.substring(0, MAX_LENGTH));
    }
  }, [invoiceData.amount_paid]);

  const clearButton = () => {
    let payload = { clientId: clientId };
    axiosApi
      .post(`/clear-invoice-data`, payload)
      .then((res) => {
        resetData();
        AlertService.success("Cleared data successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetData = () => {
    InvoiceData["client_id"] = clientId;
    setInput();
    setSelectedFile(null);
    setInvoiceData(InvoiceData);
  };

  return (
    <div className="pb-4">
      <div className="row d-flex flex-wrap ">
        <div className="d-flex flex-wrap col-12 col-md-6 flex-column gap-3">
          {NotesTerms.map((item, index) => (
            <div key={index} className="d-flex flex-column gap-1">
              <input
                value={invoiceData[item.label]}
                onChange={(event) => {
                  uploadData(item.label, event.target.value);
                }}
                className="col-12 invoice-input border border-0"
              />
              <textarea
                rows="2"
                cols="40"
                value={invoiceData[item.value]}
                className="invoice-input bg-light w-full h-full opacity-10 cursor-pointer w-full col-12 p-1 rounded outline-none"
                placeholder={item.placeholder}
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
                  value={invoiceData[item.label]}
                  onChange={(event) => {
                    uploadData(item.label, event.target.value);
                  }}
                  className="col-12 invoice-input my-1 label-start border border-0 p-2"
                />
              </div>

              <div className="col-md-7">
                <InputGroup
                  inputSymbol={invoiceData.currency}
                  value={invoiceData[item.value]}
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
        <label htmlFor="give-mail" className="mt-1 d-block d-md-none">
          Give Email Below
        </label>
        <textarea
          type="text"
          name="give-mail"
          id="give-mail"
          onChange={(ev) => setMail(ev.target.value)}
          className="invoice-input border-1 col-12  d-block d-md-none w-full p-1 rounded"
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
          type="button"
          onClick={() =>
            sendMail(route, invoiceData, inputset, mail, selectedFile)
          }
          className="invoice-input bg-blue my-1 col-12 d-block d-md-none text-white border-0 w-full p-2 rounded"
        >
          <span>
            <MailIcon className="icon" />
            Send Invoice To Email
          </span>
        </button>
      </div>

      <div>
        <button
          type="button"
          onClick={saveDefaults}
          className="invoice-input col-12 bg-blue text-white border-0 w-full p-2 my-2 d-block d-md-none rounded"
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
