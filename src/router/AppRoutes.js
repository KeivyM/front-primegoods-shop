import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage, ProductCreatePage, LoginPage, ProductPage, RegisterPage } from "../pages";
import { Loader } from "../components";
import { logout, login } from "../store/auth/authSlice";
import { AxiosConfig } from "../utils/AxiosConfig";

export const AppRoutes = () => {
  const dispatch = useDispatch();
  const { status, role } = useSelector((state) => state.auth);

  useEffect(() => {
    const userAuth = localStorage.getItem("userAuth");

    if (!!userAuth) {
      const obj = JSON.parse(userAuth);

      const validarToken = async () => {
        AxiosConfig.defaults.headers.common["Authorization"] = `Bearer ${obj.token}` || "";

        const { data } = await AxiosConfig.get("/check-status");

        if (!data) {
          console.log("error de token");
        }
        dispatch(login({ ...data.data.user, token: data.data.token }));
      };
      validarToken();
    } else {
      dispatch(logout());
    }
  }, [status, dispatch]);

  if (status === "checking") {
    return <Loader />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <>
          <Route path="/*" element={<Navigate to={`/`} />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          {role === "admin" && <Route path="/product/create" element={<ProductCreatePage />} />}
        </>
      ) : (
        <>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};
