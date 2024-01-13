import { Navigate, Route, Routes } from "react-router-dom";
import { PATH } from "../constants/path";
import Category from "../pages/admin/category";
import FormCategory from "../pages/admin/category/FormCategory";
import Product from "../pages/admin/product";
import FormProduct from "../pages/admin/product/FormProduct";
import LandingPage from "../pages/user/LandingPage";

const routes = [
  {
    path: PATH.landing,
    element: <LandingPage />,
  },
  {
    path: PATH.category,
    element: <Category />,
  },
  {
    path: PATH.form_category,
    element: <FormCategory />,
  },
  {
    path: PATH.product,
    element: <Product />,
  },
  {
    path: PATH.form_product,
    element: <FormProduct />,
  },
];

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />

      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}

      <Route path="*" element={<Navigate to={PATH.landing} replace={true} />} />
    </Routes>
  );
};

export default AppRouter;
