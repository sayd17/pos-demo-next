import React, { useEffect } from "react";
import Select from "react-select";
import { useState } from "react";
import AlertService from "../../pages/api/AlertService";
import axiosApi from "../../pages/api/axios-common";

export default function PaperSize({ productData }) {
  const [currentPaperSize, setCurrentPaperSize] = useState(null);
  const [error, setError] = useState("");

  const paperSize = [
    { value: "EAN2", label: "EAN2" },
    { value: "C128", label: "C128" },
    { value: "EAN5", label: "EAN5" },
    { value: "EAN8", label: "EAN8" },
    { value: "EAN13", label: "EAN13" },
  ];

  useEffect(() => {
    if (currentPaperSize?.label == "EAN13")
      setError("Max code length for EAN13 is 12");
    else if (currentPaperSize?.label == "EAN8")
      setError("Max code length for EAN8 is 7");
  }, [currentPaperSize]);

  const onSubmitHandler = () => {
    if (!currentPaperSize) {
      setError("Please select barcode length");
      return;
    }

    Object.keys(productData).map((key) => {
      if (!productData[key].code) {
        AlertService.error("Please give product code");
      }
    });

    const formData = new FormData();

    formData.append("paperSize", JSON.stringify(currentPaperSize));
    formData.append("productData", JSON.stringify(productData));

    axiosApi
      .post(`/generate-barcode-pdf`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      })
      .then((res) => {
        const link = document.createElement("a");
        const blob = new Blob([res.data], {
          type: res.headers["Content-Type"],
        });
        link.href = window.URL.createObjectURL(blob);
        link.download = "Product-label-print.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-8 row">
      <div className="col-8 col-md-3">
        <form>
          <label className="block">
            Barcode Type <span className="text-red">*</span>
          </label>
          <div className="w-full mb-10">
            <Select
              placeholder="Select barcode type"
              options={paperSize}
              value={currentPaperSize}
              onChange={(option) => {
                setCurrentPaperSize(option);
                setError("");
              }}
            />
            <p className="text-red">{error}</p>
          </div>
          <div className="my-8">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onSubmitHandler()}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
