import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store";
import { Provider } from "react-redux";
import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
