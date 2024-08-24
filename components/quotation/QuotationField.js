import AlertService from "../../pages/api/AlertService";
import { sendMail } from "../common/SendMail";
import { MAX_FILE_SIZE, currency } from "../../helpers/config";
import InputGroup from "../common/InputGroup";
import CommonInput from "../common/CommonInput";
import {
  PlusCircleIcon,
  XCircleIcon,
  PlusIcon,
  SaveIcon,
  MailIcon,
} from "@heroicons/react/outline";

export default function QuotationField({
  quotationData,
  uploadData,
  selectedFile,
  setSelectedFile,
  saveDefaults,
  inputset,
  submitButton,
  mail,
  setMail,
}) {
  const route = "email-quotation-pdf";
  const removeImage = (event) => {
    event.preventDefault();
    setSelectedFile(null);
  };

  const uploadAttachment = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const selectedImageSize = image?.size / 1024 ?? "";
    if (selectedImageSize && !image.name.match(/\.(jpg|jpeg|png|svg|gif)$/)) {
      AlertService.warn("Please Select a Valid Image");
      return false;
    } else if (image && selectedImageSize > MAX_FILE_SIZE) {
      AlertService.warn("Image Must be Less than 5MB");
    } else {
      setSelectedFile(image);
    }
  };
  return (
    <div className="row">
      <div className="d-block d-md-none mb-2">
        <CommonInput
          value={quotationData.quotation_name}
          uploadData={uploadData}
          classes={"invoice-input col-12 border-1"}
          input={"quotation_name"}
        />
      </div>
      <div className="d-block d-md-none mb-2">
        <div className="input-group">
          <span className={`input-group-text border-1`}>#</span>

          <input
            type="number"
            min="0"
            disabled={false}
            value={quotationData.quotation_number}
            className={`invoice-input input-group-border bg-light form-control opacity-1 border-1`}
            placeholder="0"
            onChange={(e) => uploadData("quotation_number", e.target.value)}
          />
        </div>
      </div>
      <div className="col-md-5 col-12 col-sm-12 d-flex flex-column gap-3">
        <div>
          {selectedFile ? (
            <div className="position-relative d-inline-block">
              <button
                onClick={removeImage}
                className="opacity-1 position-absolute end-0.75 rounded bg-gray-100 border-0 w-8 h-8 col-2"
              >
                <XCircleIcon
                  className="text-red-600 cursor-pointer"
                  aria-hidden="true"
                />
              </button>

              <img
                className="img-responsive img-thumbnail object-fit h-48 bg-white border border-gray-200 rounded-lg shadow-md"
                style={{ width: 300, height: 200 }}
                src={(() => {
                  return (
                    selectedFile?.name && URL.createObjectURL(selectedFile)
                  );
                })()}
                alt={selectedFile?.name}
              />
            </div>
          ) : (
            <div className="input position-relative d-flex align-items-center justify-content-center">
              <div className="position-absolute">
                <div className="d-flex flex-column align-items-center">
                  <PlusCircleIcon
                    className="text-primary"
                    style={{
                      height: "50px",
                      width: "50px",
                      color: "#007bff",
                    }}
                  />
                  <span className="d-block font-weight-normal text-secondary">
                    <big>+</big> Add Your Logo
                  </span>
                  <span className="d-block font-weight-normal text-secondary">
                    Max File size: 5MB
                  </span>
                  <span className="d-block font-weight-normal text-secondary">
                    Allowed File: .jpeg, jpg, .png
                  </span>
                </div>
              </div>
              <input
                type="file"
                onInput={uploadAttachment}
                className="w-100 h-100 opacity-0 cursor-pointer"
              />
            </div>
          )}
        </div>

        <div className="d-flex flex-column">
          <input
            name="quotation_person"
            value={quotationData.quotation_person}
            onChange={(e) => uploadData("quotation_person", e.target.value)}
            className="invoice-input bg-light  border-1 border-gray-200 p-2 rounded outline-none focus:border-purple-500"
            placeholder="Who is this quotation from? (required)"
          />
        </div>

        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-1">
            <input
              name="shipFromLabel"
              value={quotationData.ship_from_label}
              onChange={(event) => {
                uploadData("ship_from_label", event.target.value);
              }}
              className="invoice-input border-0"
            />
            <input
              id="shipFrom"
              name="shipFrom"
              value={quotationData.ship_from}
              required
              rows="2"
              cols="10"
              className="invoice-input bg-light w-full border-1 border-gray-200 p-2 rounded outline-none focus:border-purple-500"
              onChange={(e) => uploadData("ship_from", e.target.value)}
              placeholder="Who is this quotation from? (required)"
            />
          </div>

          <div className="d-flex flex-column gap-1">
            <input
              value={quotationData.ship_to_label}
              name="shipToLabel"
              onChange={(event) => {
                uploadData("ship_to_label", event.target.value);
              }}
              className="invoice-input border-0"
            />

            <input
              id="shipTo"
              name="shipTo"
              rows="2"
              value={quotationData.ship_to}
              cols="10"
              className="invoice-input bg-light w-full col-lg-12 border-1 border-gray-200 p-2 rounded outline-none focus:border-purple-500"
              placeholder="(optional)"
              onChange={(e) => uploadData("ship_to", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="d-flex col-md-5 col-12 flex-column gap-3">
        <div className="d-none d-md-block ">
          <CommonInput
            value={quotationData.quotation_name}
            uploadData={uploadData}
            classes={"invoice-input col-12 border-1"}
            input={"quotation_name"}
          />
        </div>
        <div className="d-none d-md-block">
          <div className="input-group">
            <span className={`input-group-text border-1`}>#</span>

            <input
              type="number"
              min="0"
              disabled={false}
              value={quotationData.quotation_number}
              className={`invoice-input input-group-border bg-light form-control opacity-1 border-1`}
              placeholder="0"
              onChange={(e) => uploadData("quotation_number", e.target.value)}
            />
          </div>
        </div>

        <div>
          <input
            value={quotationData.date_label}
            type="text"
            onChange={(event) => {
              uploadData("date_label", event.target.value);
            }}
            className="invoice-input label-start border-0 mt-2 p-2 mb-1 my-md-0 col-12 col-md-6"
          />
          <input
            type="date"
            value={quotationData.data}
            onChange={(e) => uploadData("date", e.target.value)}
            className="invoice-input bg-light label-start float-end col-12 col-md-5 p-2 ms-md-1 ms-none border-1 border-gray-200 rounded outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <input
            value={quotationData.payment_terms_label}
            type="text"
            onChange={(event) => {
              uploadData("payment_terms_label", event.target.value);
            }}
            className="invoice-input col-12 label-start mb-1 my-md-0 border border-0 p-2 col-lg-6"
          />
          <input
            type="text"
            value={quotationData.payment_terms}
            className="invoice-input bg-light label-start float-end col-12 col-md-5 p-2 ms-md-1 ms-none border-1 border-gray-200 rounded outline-none focus:border-purple-500"
            onChange={(e) => uploadData("payment_terms", e.target.value)}
          />
        </div>

        <div>
          <input
            value={quotationData.due_date_label}
            type="text"
            onChange={(event) => {
              uploadData("due_date_label", event.target.value);
            }}
            className="invoice-input col-12 label-start mb-1 my-md-0 border border-0 p-2 col-lg-6"
          />
          <input
            type="date"
            value={quotationData.due_date}
            onChange={(e) => uploadData("due_date", e.target.value)}
            className="invoice-input bg-light label-start float-end col-12 col-md-5 ms-md-1 ms-none p-2 border-1 border-gray-200 rounded outline-none focus:border-purple-500"
          />
        </div>

        <div className="mb-2 mb-md-none">
          <input
            value={quotationData.po_number_label}
            type="text"
            onChange={(event) => {
              uploadData("po_number_label", event.target.value);
            }}
            className="invoice-input label-start mb-1 my-md-0 col-12 border border-0 p-2 col-lg-6"
          />
          <input
            type="text"
            value={quotationData.po_number}
            className="invoice-input label-start float-end col-12 col-md-5 ms-md-1 ms-none bg-light p-2 border-1 border-gray-200 rounded outline-none focus:border-purple-500"
            onChange={(e) => uploadData("po_number", e.target.value)}
          />
        </div>
      </div>

      <div className="d-flex col-12 col-md-2 flex-column gap-3">
        <button
          type="button"
          style={{ backgroundColor: "#0070ba" }}
          onClick={() => submitButton()}
          className="btn text-white d-none d-md-block p-2"
        >
          <span>
            <PlusIcon className="icon" />
            Create
          </span>
        </button>

        <button
          type="button"
          onClick={saveDefaults}
          className="invoice-input bg-blue text-white d-none d-md-block border-0 w-full p-2 rounded"
        >
          <span>
            <SaveIcon className="icon" />
            Save Details
          </span>
        </button>
        <div>
          <label htmlFor="email" className="mt-1 d-none d-md-block">
            Give Email Below
          </label>
          <textarea
            type="text"
            name="email"
            id="email"
            onChange={(ev) => setMail(ev.target.value)}
            className="invoice-input col-12 border-1 p-1 d-none d-md-block rounded"
            value={mail}
            placeholder="Separate mail by comma"
          />
        </div>
        <button
          onClick={() =>
            sendMail(route, quotationData, inputset, mail, selectedFile)
          }
          className="invoice-input bg-blue d-none d-md-block text-white border-0 w-full p-2 rounded"
        >
          <span>
            <MailIcon className="icon d-none d-md-inline" />
            Send PDF To Email
          </span>
        </button>

        <div>
          <label htmlFor="currency">
            Select Currency<span className="text-red">*</span>
          </label>
          <select
            onChange={(e) => uploadData("currency", e.target.value)}
            className="invoice-input col-12 bg-light p-2 border-1 border-gray-200 rounded "
          >
            {currency.map((option, index) => (
              <option key={index} value={option.symbol_native}>
                {option.code}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
