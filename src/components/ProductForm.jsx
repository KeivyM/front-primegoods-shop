import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { AxiosConfig } from "../utils/AxiosConfig";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaProduct } from "../utils/schemas";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export const ProductForm = () => {
  const { status } = useSelector((state) => state.auth);

  const isAuthenticared = useMemo(() => status === "checking", [status]);

  let formData = new FormData();
  let archivoDeImagen;

  function handleFileChange(event) {
    archivoDeImagen = event.target.files[0];
    formData.append("images", archivoDeImagen);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      images: "",
      category: "",
    },
    resolver: yupResolver(schemaProduct),
  });

  const onSubmit = async (productData) => {
    try {
      formData.append("title", productData.title);
      formData.append("category", productData.category);
      formData.append("price", productData.price);
      formData.append("description", productData.description);

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
        New Product
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
            {...register("price", { required: true, valueAsNumber: true })}
            variant="outlined"
            // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
          {errors.price?.message}

          {/* <input
            type="number"
            name="price"
            {...register("price", { required: true, valueAsNumber: true })}
          /> */}
        </FormControl>
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
          <input
            type="file"
            multiple
            name="images"
            onChange={handleFileChange}
          />
          {errors.images?.message}
        </FormControl>

        <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
          ["Electronics", "Home", "Fashion", "Sports "]
          <TextField
            id="outlined-basic"
            label="Category"
            type="text"
            name="category"
            color="secondary"
            disabled={isAuthenticared}
            {...register("category", { required: true })}
            variant="outlined"
          />
          {errors.category?.message}
        </FormControl>
      </Box>

      <Button type="submit" variant="contained" sx={{ margin: "0 auto" }}>
        Ingresar
      </Button>
    </Box>
  );
};
