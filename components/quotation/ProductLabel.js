import { LabelInput } from "@/constants";

export default function ProductLabel({ quotationData, uploadData }) {
  return (
    <form>
      <div className="form-row d-flex bg-dark mt-4 border rounded">
        {LabelInput.map((item, index) => (
          <div key={index} className={`form-group ${item.classes}`}>
            <input
              value={quotationData[item.label] || ""}
              type="text"
              onChange={(event) => {
                uploadData(item.label, event.target.value);
              }}
              className={`invoice-input form-control bg-dark text-white ${
                index === 4 ? "text-center" : "text-start"
              }`}
            />
          </div>
        ))}
      </div>
    </form>
  );
}
