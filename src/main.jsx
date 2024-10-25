import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

import { store } from "./store/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="120764277175-k72vhgov1mabn0sr3073oh4ck9v43mgk.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    
  </Provider>
);
