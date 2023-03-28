import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AxiosConfig } from "../utils/AxiosConfig";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaProduct } from "../utils/schemas";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { checkingAuthentication } from "../store/auth/thunks";
import { login } from "../store/auth/authSlice";
import CustomButton from "./Button";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export const ProductForm = () => {
  let fromDta = new FormData();
  // const [value, setValue] = useState("");

  const handleChange = (event) => {
    console.log(event);
    // setValue(event.target.value);
  };

  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const onFileDrop = (e) => {
    console.log(e.target.files);
    const [file] = e.target.files;
    // setFileUpload(file?.name);
    // fromDta.append("images", [file]);
    // setValue("images", [file]);
    console.log(file);
    setValue(
      "images",
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    console.log(file);
  };
  let formData = new FormData()
  let archivoDeImagen;
  function handleFileChange(event) {
     archivoDeImagen = event.target.files[0];
    console.log(archivoDeImagen)
    formData.append('images', archivoDeImagen)
  // Agregar el archivo a un FormData o realizar otra acción
  }
  

  // const dispatch = useDispatch();
  // let navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  // const [values, setValues] = useState({
  //   showPassword: false,
  // });
  // console.log(status);
  const isAuthenticared = useMemo(() => status === "checking", [status]);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      images: "",
      category: "",
      color: "",
    },
    resolver: yupResolver(schemaProduct),
  });

  const onSubmit = async (productData) => {
    // const formData = new FormData();
          formData.append('title', productData.title);
          formData.append('category', productData.category);
          formData.append('price', productData.price);
          // formData.append('images', archivoDeImagen);
          formData.append('description', productData.description);
          // formData.append('imagen2', archivoDeImagen2);
    /////////////////////////////////////////////////////////
    // const handleFileUpload = (event) => {
    //   const file = event.target.files[0];
    //   const formData = new FormData();
    //   formData.append("image", file);

    //   fetch("/api/uploadImage", {
    //     method: "POST",
    //     body: formData,
    //   })
    //     .then((response) => {
    //       // Manejar la respuesta del servidor
    //     })
    //     .catch((error) => {
    //       // Manejar errores de solicitud
    //     });
    // };
    ///////////////////////////////////////////////////////////
    try {
      const { data } = await AxiosConfig.post("product/create", formData);
      console.log(data);

      // const user = { ...data.user, token: data.token };
      // dispatch(login(data.user));
      // const userStringify = JSON.stringify(user);
      // localStorage.setItem("userAuth", userStringify);

      // navigate("/");
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
        Crear producto
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
            label="Title"
            type="text"
            name="title"
            color="secondary"
            {...register("title", { required: true })}
            variant="outlined"
          />
          {errors.title?.message}
        </FormControl>

        <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Description"
            type="text"
            name="description"
            color="secondary"
            {...register("description", { required: true })}
            variant="outlined"
          />
          {errors.description?.message}
        </FormControl>

        <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Price"
            type="number"
            name="price"
            color="secondary"
            {...register("price", { required: true })}
            variant="outlined"
          />
          {errors.price?.message}
        </FormControl>

        <TextField
          label="Ingrese su nombre"
          value={name}
          onChange={handleInputChange}
        />

        <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
          {/* <TextField onChange={onFileDrop} {...register("images", { required: true })}
            id="outlined-basic"
            label="Images"
            inputProps={{
              multiple: true,
            }}
            type="file"
            name="images"
            color="secondary"
            variant="outlined"
          /> */}


          {/* 
          <Input
            // ref={fileInputRef}
            {...register("images", { required: true })}
            type="file"
            inputProps={{ multiple: true }}
            onChange={onFileDrop}
            // multiple
            name="images"
          /> */}
          <input type='file' multiple name='images'  onChange={handleFileChange} />
          {errors.images?.message}
        </FormControl>

        <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
          [ 'tech']
          <TextField
            id="outlined-basic"
            label="Category"
            type="text"
            name="category"
            color="secondary"
            {...register("category", { required: true })}
            variant="outlined"
          />
          {errors.category?.message}
        </FormControl>

        <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Color"
            type="text"
            name="color"
            color="secondary"
            {...register("color", { required: false })}
            variant="outlined"
          />
          {errors.color?.message}
        </FormControl>
      </Box>

      <Button
        disabled={isAuthenticared}
        type="submit"
        variant="contained"
        sx={{ margin: "0 auto" }}
      >
        Ingresar
      </Button>
    </Box>
  );
};
