import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosConfig } from "../utils/AxiosConfig";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userAuth, setUserAuth] = useState(() =>
    localStorage.getItem("userAuth")
  );

  let navigate = useNavigate();

  const refreshToken = useCallback(async () => {
    setLoading(true);
    try {
      AxiosConfig.defaults.headers.common["Authorization"] =
        `Bearer ${userAuth}` || "";

      const { data } = await AxiosConfig.get("auth/check-status");
      console.log(data);
      localStorage.setItem("userAuth", data.token);
      setUserAuth(data.token);
      setUsername(data.username);
      setPoints(data.points);
    } catch (error) {
      localStorage.removeItem("userAuth");
      navigate("/");
    }
  }, [navigate, userAuth]);

  const Logout = () => {
    setLoading(true);
    setPoints("");
    setUsername("");
    setUserAuth(false);
    localStorage.removeItem("userAuth");
    navigate("/home");
  };

  useEffect(() => {
    if (!!userAuth) {
      refreshToken();
    } else return;
  }, [refreshToken, userAuth]);

  return (
    <>
      <AuthContext.Provider
        value={{
          userAuth,
          username,
          points,
          loading,
          setUserAuth,
          setLoading,
          Logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
