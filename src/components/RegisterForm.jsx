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
import { schemaRegister } from "../utils/schemas";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { checkingAuthentication } from "../store/auth/thunks";
import { login } from "../store/auth/authSlice";
import CustomButton from "./Button";

export const RegisterForm = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const [values, setValues] = useState({
    showPassword: false,
    showPasswordRepeat: false,
  });

  const isAuthenticared = useMemo(() => status === "checking", [status]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lastName: "",
      name: "",
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
    resolver: yupResolver(schemaRegister),
  });

  const onSubmit = async (userData) => {
    dispatch(checkingAuthentication());
    try {
      const { data } = await AxiosConfig.post("register", userData);

      const user = { ...data.user, token: data.token };
      dispatch(login(data.user));
      const userStringify = JSON.stringify(user);
      localStorage.setItem("userAuth", userStringify);

      navigate("/");
    } catch (error) {
      throw Swal.fire({
        title: error?.response?.data?.msg,
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

  const handleClickShowPasswordRepeat = () => {
    setValues({
      ...values,
      showPasswordRepeat: !values.showPasswordRepeat,
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
        Register
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "7px",
        }}
      >
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <TextField
            id="outlined-basic-name"
            label="Name"
            type="text"
            name="name"
            color="secondary"
            {...register("name", { required: true })}
            variant="outlined"
          />
          {errors.name?.message}
        </FormControl>

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

        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <TextField
            id="outlined-basic-username"
            label="Username"
            type="text"
            name="username"
            color="secondary"
            {...register("username", { required: true })}
            variant="outlined"
          />
          {errors.username?.message}
        </FormControl>

        <FormControl
          sx={{ m: 1, width: "25ch" }}
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
            color="secondary"
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

        <FormControl
          sx={{ m: 1, width: "25ch" }}
          color="secondary"
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password-repeat">
            Confirm password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-repeat"
            type={values.showPasswordRepeat ? "text" : "password"}
            name="passwordRepeat"
            color="secondary"
            autoComplete="on"
            {...register("passwordRepeat", { required: true })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordRepeat}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPasswordRepeat ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm password"
          />
          {errors.passwordRepeat?.message}
        </FormControl>
      </Box>
      <CustomButton disabled={isAuthenticared} text={"Register"} />
      <Link to={"/login"}>Login</Link>
    </Box>
  );
};
