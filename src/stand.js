import React from "react";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

// storeConfig = {isLogger: false}

const TimeLine = ({storeConfig, ...props}) => {
  return (
    <Provider store={store(storeConfig)}>
      <App {...props}/>
    </Provider>
  )
}

export default TimeLine