import { Navigate, Route, Routes } from "react-router-dom";
import { PATH } from "../constants/path";
import Category from "../pages/category";

const routes = [
  {
    path: PATH.category,
    element: <Category />,
  },
  {
    path: PATH.product,
    element: <Category />,
  },
];

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Category />} />

      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}

      <Route
        path="*"
        element={<Navigate to={PATH.category} replace={true} />}
      />
    </Routes>
  );
};

export default AppRouter;
