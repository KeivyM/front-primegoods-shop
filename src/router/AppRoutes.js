import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProductCreatePage from "../pages/ProductCreatePage";
import ProductPage from "../pages/ProductPage";
import RegisterPage from "../pages/RegisterPage";
import { logout, login } from "../store/auth/authSlice";
import { AxiosConfig } from "../utils/AxiosConfig";

export const AppRoutes = () => {
  // const { userAuth } = useContext(AuthContext);
  const dispatch = useDispatch();
  // const [userAuth, setUserAuth] = useState(() =>
  //   localStorage.getItem("userAuth")
  // );
  const { status, role } = useSelector((state) => state.auth);
  // const isAuthenticared = useMemo(() => status === "checking", [status]);

  useEffect(() => {
    const userAuth = localStorage.getItem("userAuth");
    // console.log(!!userAuth);

    // console.log(userAuth);
    if (!!userAuth) {
      const obj = JSON.parse(userAuth);
      // console.log(obj);
      const validarToken = async () => {
        AxiosConfig.defaults.headers.common["Authorization"] =
          `Bearer ${obj.token}` || "";

        const { data } = await AxiosConfig.get("/check-status");
        // console.log(data);
        if (!data) {
          console.log("error de token");
        }
        dispatch(login({ ...data.data.user, token: data.data.token }));
      };
      validarToken();

      // console.log(d);
      //peticion validando el token
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
          {role === "admin" && (
            <Route path="/product/create" element={<ProductCreatePage />} />
          )}
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
