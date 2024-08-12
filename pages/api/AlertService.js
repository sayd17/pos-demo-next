// import { toast } from "react-hot-toast";
import { toast } from "react-hot-toast";

const success = (title = "Something went wrong!") => {
  toast.success(title, {
    duration: 3000,
    style: {
      background: "#ebf7ee",
      border: "1px solid #bee5c8",
      color: "#333c48",
    },
  });
};

const error = (title = "Something went wrong!") => {
  toast.error(title, {
    duration: 3000,
    style: {
      background: "#fcedea",
      border: "1px solid #f6cac1",
      color: "red",
    },
  });
};

const warn = (title = "Something went wrong!") => {
  toast(title, {
    duration: 3000,
    position: "top-center",

    // Styling
    style: {
      background: "#fef7ea",
      border: "1px solid #fadeaf",
      color: "#333c48",
    },
    className: "",
    // Custom Icon
    icon: "⚠️",
    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
};

const info = (title = "Something went wrong!") => {
  toast(title, {
    duration: 3000,
    position: "top-center",
    // Styling
    style: {
      background: "#ECF0F1",
      border: "1px solid black",
      color: "#333c48",
    },
    className: "",
    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
};

const AlertService = {
  success,
  error,
  warn,
  info,
};

export default AlertService;
