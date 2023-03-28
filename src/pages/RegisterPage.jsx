import { CssBaseline } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { RegisterForm } from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <RegisterForm />
      </Box>
    </Container>
  );
};

export default RegisterPage;
