import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import ThemeManager from "./components/ThemeManager";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ThemeManager/>
        <App />
        
      </BrowserRouter>
    </Provider>
  </StrictMode>
);












