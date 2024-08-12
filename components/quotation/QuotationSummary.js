import {
  PlusIcon,
  SaveIcon,
  MailIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { sendMail } from "../SendMail";
import axiosApi from "../../pages/api/axios-common";
import AlertService from "../../pages/api/AlertService";
import InputGroup from "../common/InputGroup";
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
  route,
  selectedFile,
}) {
  // clear all data
  const clearButton = () => {
    let payload = { clientId: clientId };
    axiosApi
      .post("/clear-quotation-data", payload)
      .then((res) => {
        AlertService.success("Cleared data successfully");
        setInput();
        Object.keys(quotationData).map((key) => {
          if (key === "notes") uploadData("notes", "");
          if (key === "terms_and_conditions")
            uploadData("terms_and_conditions", "");
          if (key === "ship_from") uploadData("ship_from", "");
          if (key === "ship_to") uploadData("ship_to", "");
          if (key === "currency") uploadData("currency", "Tk");
          if (key === "due_date") uploadData("due_date", "");
          if (key === "date") uploadData("date", "");
          if (key === "quotation_person") uploadData("quotation_person", "");
          if (key === "payment_terms") uploadData("payment_terms", "");
          if (key === "po_number") uploadData("po_number", "");
          if (key === "discount") uploadData("discount", 0);
          if (key === "tax") uploadData("tax", 0);
          if (key === "shipping") uploadData("shipping", 0);
          if (key === "amount_paid") uploadData("amount_paid", 0);
        });
        setSelectedFile(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="pb-4">
      <div className="row d-flex flex-wrap ">
        <div className="d-flex flex-wrap col-12 col-md-6 flex-column gap-3">
          <div className="d-flex flex-column gap-1">
            <input
              value={quotationData.notes_label}
              onChange={(event) => {
                uploadData("notes_label", event.target.value);
              }}
              className="col-12 invoice-input border col-12 col-lg-10 border-0"
            />
            <textarea
              // ref={shipFrom}
              id="notes"
              name="notes"
              rows="2"
              cols="40"
              value={quotationData.notes}
              className="invoice-input bg-light w-full h-full opacity-10 cursor-pointer w-full col-12 col-md-10 border-gray-200 p-1 rounded outline-none focus:border-purple-500"
              placeholder="Notes - any relevant information not already covered"
              onChange={(e) => uploadData("notes", e.target.value)}
            />
          </div>
          <div className="d-flex flex-column gap-1">
            <input
              value={quotationData.terms_label}
              onChange={(event) => {
                uploadData("terms_label", event.target.value);
              }}
              className="invoice-input border border-0 col-12 col-md-10"
            />
            <textarea
              // ref={shipFrom}
              id="terms_and_conditions"
              name="terms_and_conditions"
              rows="2"
              value={quotationData.terms_and_conditions}
              cols="40"
              className="invoice-input bg-light w-full h-full opacity-10 cursor-pointer w-full col-12 col-md-10 border-gray-200 p-1 rounded outline-none focus:border-purple-500"
              placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
              onChange={(e) =>
                uploadData("terms_and_conditions", e.target.value)
              }
            />
          </div>
        </div>
        <div className="d-flex col-12 col-md-4 col-xxl-4 flex-column gap-1">
          <div className="row d-flex flex-end">
            <div className="col-md-5">
              <input
                value={quotationData.sub_total_label}
                onChange={(event) => {
                  uploadData("sub_total_label", event.target.value);
                }}
                className="col-12 invoice-input my-1 label-start border border-0 p-2"
              />
            </div>
            <div className="col-md-7">
              <InputGroup
                currency={quotationData.currency}
                value={quotationData.sub_total}
                isDisabled={true}
                border={"border-0"}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <input
                value={quotationData.discount_amount_label}
                onChange={(event) => {
                  uploadData("discount_amount_label", event.target.value);
                }}
                className="col-12 invoice-input my-1  label-start border border-0 p-2"
              />
            </div>
            <div className="col-md-7">
              <InputGroup
                currency={quotationData.currency}
                value={quotationData.discount_amount}
                isDisabled={false}
                border={"border-1"}
                uploadData={uploadData}
                field={"discount_amount"}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <input
                type="text"
                value={quotationData.tax_label}
                onChange={(event) => {
                  uploadData("tax_label", event.target.value);
                }}
                className="col-12 invoice-input my-1 label-start border border-0 p-2"
              />
            </div>
            <div className="col-md-7">
              <InputGroup
                currency={quotationData.currency}
                value={quotationData.tax}
                isDisabled={false}
                border={"border-1"}
                uploadData={uploadData}
                field={"tax"}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <input
                value={quotationData.shipping_label}
                onChange={(event) => {
                  uploadData("shipping_label", event.target.value);
                }}
                className="col-12 invoice-input my-1 label-start border border-0 p-2"
              />
            </div>
            <div className="col-md-7">
              <InputGroup
                currency={quotationData.currency}
                value={quotationData.shipping}
                isDisabled={false}
                border={"border-1"}
                uploadData={uploadData}
                field={"shipping"}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <input
                value={quotationData.total_label}
                onChange={(event) => {
                  uploadData("total_label", event.target.value);
                }}
                className="col-12 invoice-input my-1 label-start border border-0 p-2"
              />
            </div>
            <div className="col-md-7">
              <InputGroup
                currency={quotationData.currency}
                value={quotationData.total}
                isDisabled={true}
                border={"border-0"}
                uploadData={uploadData}
                field={"total"}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <input
                value={quotationData.amount_paid_label}
                onChange={(event) => {
                  uploadData("amount_paid_label", event.target.value);
                }}
                className="col-12 invoice-input my-1 label-start border border-0 p-2"
              />
            </div>
            <div className="col-md-7">
              <InputGroup
                currency={quotationData.currency}
                value={quotationData.amount_paid}
                isDisabled={false}
                border={"border-1"}
                uploadData={uploadData}
                field={"amount_paid"}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <input
                value={quotationData.balance_due_label}
                onChange={(event) => {
                  uploadData("balance_due_label", event.target.value);
                }}
                className="col-12 invoice-input label-start border border-0 p-2"
              />
            </div>
            <div className="col-md-7">
              <InputGroup
                currency={quotationData.currency}
                value={quotationData.balance_due}
                isDisabled={true}
                border={"border-0"}
                uploadData={uploadData}
                field={"balance_due"}
              />
            </div>
          </div>
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
