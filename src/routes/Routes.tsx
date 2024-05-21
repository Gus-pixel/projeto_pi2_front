import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/LoginPage/LoginPage";

const isAutenticado = (): boolean => {
  return !!localStorage.getItem("token");
};

const PrivateRoute = ({
  path,
  element,
  ...rest
}: {
  path: string;
  element: JSX.Element;
}) => {
  return (
    <Route
      {...rest}
      path={path}
      element={isAutenticado() ? element : <Navigate to="/login" />}
    />
  );
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <PrivateRoute
          path="/"
          element={isAutenticado() ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
