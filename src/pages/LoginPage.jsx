import { Box, Container, CssBaseline } from "@mui/material";
import React from "react";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LoginForm />
      </Box>
    </Container>
  );
};
