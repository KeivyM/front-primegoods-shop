import { Button } from "@mui/material";

function CustomButton({ disabled }) {
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      style={{ borderRadius: "25px", padding: "10px 20px", fontWeight: "bold" }}
      disabled={disabled}
    >
      ingresar
    </Button>
  );
}

export default CustomButton;
