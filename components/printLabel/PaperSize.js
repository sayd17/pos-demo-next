import React, { useEffect } from "react";
import Select from "react-select";
import { useState } from "react";
import AlertService from "../../pages/api/AlertService";
import axiosApi from "../../pages/api/axios-common";
import { BarcodeType } from "@/constants";

export default function PaperSize({ productData, label }) {
  const [currentPaperSize, setCurrentPaperSize] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentPaperSize?.label === "EAN13")
      setError("Max code length for EAN13 is 12");
    else if (currentPaperSize?.label === "EAN8")
      setError("Max code length for EAN8 is 7");
    else if (currentPaperSize?.label === "UPCA")
      setError("Max code length for UPCA is 11");
  }, [currentPaperSize]);

  const onSubmitHandler = () => {
    if (!currentPaperSize) {
      setError("Please select barcode length");
      return;
    }

    let flag = false;

    Object.keys(productData).map((key) => {
      if (!productData[key].code || !productData[key].quantity) {
        AlertService.error(`${label.code} and ${label.quantity} is required`);
        flag = true;
        return;
      }
    });

    if (flag) {
      return;
    }

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
              options={BarcodeType}
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
