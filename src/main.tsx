import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./components/ToastProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <ToastProvider>
    <App />
  </ToastProvider>
  </BrowserRouter>
);