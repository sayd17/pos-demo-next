import axiosApi from "../pages/api/axios-common";
import AlertService from "../pages/api/AlertService";

export const sendMail = (route, allData, inputset, mail, selectedFile) => {
  if (!mail) {
    AlertService.warn("Please give email address");
    return;
  }

  let flag = mail.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (!flag) {
    AlertService.error("Please give valid email address");
    return;
  }

  const formData = new FormData();
  Object.keys(allData).forEach((key) => formData.append(key, allData[key]));

  if (selectedFile) formData.append("logo", selectedFile);

  formData.append("data", JSON.stringify(inputset));

  formData.append("mail", mail);

  axiosApi
    .post(`/${route}`, formData)
    .then(function (response) {
      AlertService.success("Email sent Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
