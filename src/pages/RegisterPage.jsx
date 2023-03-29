import { Box, Container } from "@mui/system";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => {
  return (
    <Container component="main" maxWidth="xs">
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
