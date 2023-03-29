import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AxiosConfig } from "../utils/AxiosConfig";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "../utils/schemas";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { checkingAuthentication } from "../store/auth/thunks";
import { login } from "../store/auth/authSlice";
import CustomButton from "./Button";

export const LoginForm = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const [values, setValues] = useState({
    showPassword: false,
  });

  const isAuthenticared = useMemo(() => status === "checking", [status]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schemaLogin),
  });

  const onSubmit = async (userData) => {
    dispatch(checkingAuthentication());
    try {
      const { data } = await AxiosConfig.post("login", userData);

      const user = { ...data.user, token: data.token };

      dispatch(login(data.user));

      const userStringify = JSON.stringify(user);

      localStorage.setItem("userAuth", userStringify);

      navigate("/");
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        return Swal.fire({
          title: "Problemas con el servidor!",
          text: "Intentalo luego",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }

      if (error.code === "ERR_BAD_REQUEST") {
        return Swal.fire({
          title: "Tus datos no son correctos.!",
          text: "Verificalos",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      }
      Swal.fire({
        title: "Verifica tus datos!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "23px",
        bgcolor: "#eee9",
        p: 10,
        textAlign: "center",
        borderRadius: "15px",
      }}
    >
      <Typography variant="h4" component="h4">
        Welcome back
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "7px",
        }}
      >
        <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            name="email"
            color="secondary"
            {...register("email", { required: true })}
            variant="outlined"
          />
          {errors.email?.message}
        </FormControl>

        <FormControl
          sx={{ m: 1, width: "30ch" }}
          color="secondary"
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            name="password"
            autoComplete="on"
            {...register("password", { required: true })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {errors.password?.message}
        </FormControl>
      </Box>

      <CustomButton disabled={isAuthenticared} text={"login"} />
      <Link to={"/register"}>Create account</Link>
    </Box>
  );
};
