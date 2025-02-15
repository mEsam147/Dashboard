import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5", // Indigo
      light: "#fff", // Lighter Indigo
      dark: "#002984", // Darker Indigo
    },
    secondary: {
      main: "#345d6d", // Pink
      light: "#ff4081", // Lighter Pink
      dark: "#c51162", // Darker Pink
    },
    background: {
      default: "#f5f5f5", // Light Gray
      paper: "#ffffff", // White
    },
    text: {
      primary: "#000000", // Black
      secondary: "#757575", // Gray
      disabled: "#bdbdbd", // Light Gray
    },
    error: {
      main: "#f44336", // Red
    },
    success: {
      main: "#4caf50", // Green
    },
    warning: {
      main: "#ff9800", // Orange
    },
    info: {
      main: "#2196f3", // Blue
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          // backgroundColor: "#2E3A4D", // Change this to your desired color
          background: "linear-gradient(140deg, #345d6d 80%, #398c8c  100%)",
        },
      },
    },
  },
});

export default theme;
