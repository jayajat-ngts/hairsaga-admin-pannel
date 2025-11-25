// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./store/store";
// import Routeing from "./routes/Routeing";
// import { setupAuthInterceptor } from "./intercepter/authInterceptor";
// import AuthRehydrator from "./components/AuthRehydrator"; // ✅ import it

// setupAuthInterceptor();

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Provider store={store}>
//         <AuthRehydrator> 
//           <Routeing />
//         </AuthRehydrator>
//       </Provider>
//     </BrowserRouter>
//   </React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Routeing from "./routes/Routeing";
import { setupAuthInterceptor } from "./intercepter/authInterceptor";
import AuthRehydrator from "./components/AuthRehydrator";

// ⭐ Required for Material UI Date Picker
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

setupAuthInterceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>

        {/* ⭐ Wrap whole app with LocalizationProvider */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthRehydrator>
            <Routeing />
          </AuthRehydrator>
        </LocalizationProvider>

      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
