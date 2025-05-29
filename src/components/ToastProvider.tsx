import { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const ToastContext = createContext<any>(null);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: any) => {
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  const showToast = (message: string, severity = "info") => {
    setToast({ open: true, message, severity });
  };

  const handleClose = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast.severity as any} onClose={handleClose} sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
