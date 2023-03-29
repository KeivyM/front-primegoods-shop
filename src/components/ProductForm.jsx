import { useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosConfig } from "../utils/AxiosConfig";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaProduct } from "../utils/schemas";
import Swal from "sweetalert2";
import "../css/inputSelectImage.css";
import { SelectCategory } from "./SelectCategory";
import { useNavigate } from "react-router-dom";
import CustomButton from "./Button";

export const ProductForm = () => {
  const navigate = useNavigate();
  const [valueCategory, setSelectedValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [valueImagen, setArchivoDeImagen] = useState(null);

  let formData = new FormData();

  function handleFileChange(event) {
    setArchivoDeImagen(event.target.files[0]);
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
    },
    resolver: yupResolver(schemaProduct),
  });

  const onSubmit = async (productData) => {
    try {
      setSaving(true);
      if (valueCategory.length === 0) {
        throw Object.assign(new Error("Empty Fields"), { code: 400 });
      }

      formData.append("title", productData.title);
      formData.append("images", valueImagen);
      formData.append("category", valueCategory);
      formData.append("price", productData.price);
      formData.append("description", productData.description);

      const { data } = await AxiosConfig.post("product/create", formData);
      setSaving(false);

      return Swal.fire({
        title: data.msg,
        icon: "success",
      });
    } catch (error) {
      setSaving(false);
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
      <Grid direction={"row"} container justifyContent={"center"} gap={3}>
        <IconButton onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h4">
          New Product
        </Typography>
      </Grid>
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
          valueCategory={valueCategory}
          setSelectedValue={setSelectedValue}
        />
      </Box>

      <CustomButton
        text="Create"
        color="common"
        disabled={saving}
        sx={{ margin: "0 auto", color: "white" }}
      />
    </Box>
  );
};
