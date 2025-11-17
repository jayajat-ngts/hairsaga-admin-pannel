import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Routeing from "./routes/Routeing";
import { setupAuthInterceptor } from "./intercepter/authInterceptor";
import AuthRehydrator from "./components/AuthRehydrator"; // ✅ import it

setupAuthInterceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthRehydrator> 
          <Routeing />
        </AuthRehydrator>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
