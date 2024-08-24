import ProductLabel from "../../components/printLabel/ProductLabel";
import ProductInput from "../../components/printLabel/ProductInput";
import { useState, useEffect } from "react";
import PaperSize from "../../components/printLabel/PaperSize";

export default function PrintLabel() {
  const [data, setData] = useState([]);
  const [label, setLabel] = useState(null);

  const uploadData = (data) => {
    setData(data);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <p className="h5">Print Label</p>
      </div>

      <div className="horizontal-scrollable">
        <div className="row">
          <ProductLabel getLabel={(label) => setLabel(label)} />
          <ProductInput uploadData={uploadData} label={label} />
        </div>
      </div>
      <PaperSize productData={data} label={label} />
    </>
  );
}
