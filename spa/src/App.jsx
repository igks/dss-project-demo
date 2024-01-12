import { Provider } from "react-redux";
import { store } from "./data/store";
import Layout from "./layout/index";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
