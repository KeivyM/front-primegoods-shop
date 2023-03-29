import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AxiosConfig } from "../utils/AxiosConfig";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaProduct } from "../utils/schemas";
import Swal from "sweetalert2";
import "../css/inputSelectImage.css";
import { SelectCategory } from "./SelectCategory";

export const ProductForm = () => {
  const { status } = useSelector((state) => state.auth);
  const [selectedValue, setSelectedValue] = useState("");

  // const
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

      return Swal.fire({
        title: data.msg,
        // text: "Intentalo luego",
        icon: "success",
      });
      // const user = { ...data.user, token: data.token };
      // dispatch(login(data.user));
      // const userStringify = JSON.stringify(user);
      // localStorage.setItem("userAuth", userStringify);

      // navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Check all fields!",
        text: error?.response?.data?.msg,
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
        p: 10,
        textAlign: "center",
        borderRadius: "15px",
        boxSizing: "border-box",
        width: { xs: "100%", md: "60%", lg: "50%" },
        margin: "0 auto",
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
          />
          {errors.price?.message}
        </FormControl>

        <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
          <input
            type="file"
            multiple
            name="images"
            onChange={handleFileChange}
          />
          {errors.images?.message}
        </FormControl>

        <SelectCategory
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />

        {/* <Box alignItems={"center"} display="flex">
          <Tooltip
            title={`*STRICT* allowed categories ["Electronics", "Home", "Fashion", "Sports"]`}
          >
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
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
        </Box> */}
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="common"
        sx={{ margin: "0 auto", color: "white" }}
      >
        Create
      </Button>
    </Box>
  );
};
