import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import theme from "./assets/theme/theme";
import "./assets/styles/index.css";
import { store } from "./redux";
import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./pages/PageRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <PageRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
