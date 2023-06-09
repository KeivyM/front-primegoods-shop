import { Box, Container } from "@mui/material";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <Container component="main" maxWidth="xs">
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
