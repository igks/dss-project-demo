import React from "react";
import Category from "./pages/category/index";
import { Provider } from "react-redux";
import { store } from "./data/store";

function App() {
  return (
    <Provider store={store}>
      <Category />
    </Provider>
  );
}

export default App;
