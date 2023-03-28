import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { Alert } from "@mui/lab";
// import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  //   padding: theme.spacing(2),
  // },
  // paper: {
  //   padding: theme.spacing(2),
  // },
  imagePreview: {
    maxWidth: "100%",
    maxHeight: "300px",
  },
}));

const ShopPage = () => {
  const classes = useStyles();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const handleProductImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  // console.log(id);

  const handleAddProduct = () => {
    // TODO: Add product to store
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <TextField
              label="Product Name"
              value={productName}
              onChange={handleProductNameChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Product Description"
              value={productDescription}
              onChange={handleProductDescriptionChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Product Price"
              value={productPrice}
              onChange={handleProductPriceChange}
              fullWidth
              margin="normal"
            />
            <input
              accept="image/*"
              id="product-image-input"
              type="file"
              onChange={handleProductImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="product-image-input">
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Product Preview"
              className={classes.imagePreview}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShopPage;
