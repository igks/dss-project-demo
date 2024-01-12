import React from "react";
import Category from "./pages/category/index";
import { Provider } from "react-redux";
import { store } from "./data/store";
import Layout from "./layout/index";

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
