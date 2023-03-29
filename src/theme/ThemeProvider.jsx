import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#83C227",
    },
    secondary: {
      main: "#282e37",
    },
    common: {
      main: "#555a61",
    },
    text: {
      main: "#fff9",
    },
  },
  // typography: {
  //   fontFamily: "sans-serif",
  //   fontSize: 16,
  // },
});

export default theme;
