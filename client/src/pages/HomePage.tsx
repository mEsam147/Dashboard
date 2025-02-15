import { Box, Button, Typography, useTheme } from "@mui/material";
import AuthButton from "../hooks/useAuthButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { handleLogin } = AuthButton();
  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <Typography variant="h4" sx={{ mt: 8, textAlign: "center" , fontWeight:"600" , color:theme.palette.secondary.main }}>
        Home Page
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </>
  );
};

export default HomePage;
