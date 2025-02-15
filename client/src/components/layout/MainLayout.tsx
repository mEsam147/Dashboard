import React from "react";
import Header from "./Header";
import {
  Box,
  Container,
  CssBaseline,
  Toolbar,

} from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom"; 

const drawerWidth = 240;

const MainLayout: React.FC = () => {
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Header toggleDrawer={toggleDrawer} />
      <Sidebar open={open} toggleDrawer={toggleDrawer} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: open ? `${drawerWidth}px` : 0 }, 
          transition: "margin 0.3s ease",
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
