import React from "react";
import { Provider } from "react-redux";
import { store } from "../data/store";
import { BrowserRouter } from "react-router-dom";

const TestWrapper = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{props.children}</BrowserRouter>
    </Provider>
  );
};

export default TestWrapper;
