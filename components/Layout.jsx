import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./BootstrapClient";
import { ContextProvider } from "@/context/ContextProvider";
import { Toaster, useToasterStore, toast } from "react-hot-toast";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 1;

  // Enforce Limit
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
  }, [toasts]);

  return (
    <>
      <Navbar />
      <main className="col-sm-12 col-md-9 col-lg-10 ms-sm-auto px-3">
        <ContextProvider>{children}</ContextProvider>
        <Toaster
          position="top-center"
          reverseOrder={true}
          gutter={8}
          containerClassName=""
          containerStyle={{ top: 140 }}
          toastOptions={{
            // Define default options
            className: "",
            duration: 3000,
            style: {
              width: "300px",
              fontWeight: "bold",
            },
          }}
        />
      </main>
      <BootstrapClient />
    </>
  );
}
