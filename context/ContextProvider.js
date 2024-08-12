import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext({
  IP: null,
  setIP: () => {},
});

export const ContextProvider = ({ children }) => {
  const [IP, _setIP] = useState("");

  const setIP = (IP) => {
    _setIP(IP);
    localStorage.setItem("CLIENT_IP", IP);
  };

  // Get client ip address
  const ClientIP = () => {
    axios
      .get("https://api.ipify.org?format=json")
      .then((response) => {
        if (response?.data?.ip) setIP(response.data.ip);
      })
      .catch((error) => {
        console.log("Error fetching IP address:", error);
      });
  };

  useEffect(() => {
    ClientIP();
  }, []);

  return (
    <StateContext.Provider
      value={{
        IP,
        setIP,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
