export default function ProductLabel({ invoiceData, uploadData }) {
  return (
    <form>
      <div className="form-row d-flex bg-dark mt-4 border rounded">
        <div className="form-group col-5 col-md-3">
          <input
            value={invoiceData.description_label}
            type="text"
            onChange={(event) => {
              uploadData("description_label", event.target.value);
            }}
            className="invoice-input form-control bg-dark text-white text-start"
          />
        </div>
        <div className="form-group col-4 col-md-2">
          <input
            value={invoiceData.quantity_label}
            type="text"
            onChange={(event) => {
              uploadData("quantity_label", event.target.value);
            }}
            className="invoice-input form-control text-start bg-dark text-white"
          />
        </div>
        <div className="form-group col-5 col-md-3">
          <input
            value={invoiceData.rate_label}
            type="text"
            onChange={(event) => {
              uploadData("rate_label", event.target.value);
            }}
            className="invoice-input form-control text-start bg-dark text-white"
          />
        </div>
        <div className="form-group col-7 col-md-3">
          <input
            value={invoiceData.amount_label}
            type="text"
            onChange={(event) => {
              uploadData("amount_label", event.target.value);
            }}
            className="invoice-input form-control text-start bg-dark text-white"
          />
        </div>
        <div className="form-group col-3 col-md-1">
          <input
            value={invoiceData.action_label}
            type="text"
            onChange={(event) => {
              uploadData("action_label", event.target.value);
            }}
            className="invoice-input form-control text-center bg-dark text-white"
          />
        </div>
      </div>
    </form>
  );
}
