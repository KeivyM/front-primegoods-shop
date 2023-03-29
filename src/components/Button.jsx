import { Button } from "@mui/material";

function CustomButton({ color = "primary", disabled, text, ...data }) {
  return (
    <Button
      variant="contained"
      color={color}
      type="submit"
      style={{ borderRadius: "25px", padding: "10px 20px", fontWeight: "bold" }}
      disabled={disabled}
      {...data}
    >
      {text}
    </Button>
  );
}

export default CustomButton;
