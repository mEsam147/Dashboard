import * as React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import AuthButton from "../../hooks/useAuthButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: alpha(theme.palette.secondary.light, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.dark, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header({
  toggleDrawer,
}: {
  toggleDrawer: (newOpen: boolean) => () => void;
}) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const { handleLogout } = AuthButton();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    handleMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleLanguageChange("en")}>{t("header.en")}</MenuItem>
      <MenuItem onClick={() => handleLanguageChange("ar")}>{t("header.ar")}</MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Button
          variant="outlined"
          onClick={handleLogout}
          sx={{
            bgcolor: theme.palette.error.dark,
            color: theme.palette.primary.light,
            textAlign: "left",
            boxShadow: "none",
          }}
        >
          {t("header.logout")}
        </Button>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => handleLanguageChange("en")}
        sx={{
          textAlign: "center",
          fontWeight: 600,
          fontSize: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {t("header.en")}
      </MenuItem>
      <MenuItem
        onClick={() => handleLanguageChange("ar")}
        sx={{
          textAlign: "center",
          fontWeight: 600,
          fontSize: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {t("header.ar")}
      </MenuItem>
      <MenuItem
        sx={{
          textAlign: "center",
          fontWeight: 600,
          fontSize: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{ bgcolor: theme.palette.error.main }}
          onClick={handleLogout}
        >
          {t("header.logout")}
        </Button>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: {
          sx: "100%",
          lg: `calc(100% - ${drawerWidth})`,
        },
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },

          backgroundColor: theme.palette.primary.light,
        }}
      >
        <Toolbar>
          <div>
            <IconButton
              aria-label="add to shopping cart"
              onClick={toggleDrawer(true)}
              sx={{
                mr: 1,
                color: theme.palette.grey[700],
                display: {
                  md: "none",
                  xs: "block",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: "bold",
              color: theme.palette.secondary.main,
              display: { xs: "none", sm: "block" },
            }}
          >
            {t("header.hello")}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: theme.palette.secondary.main }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              sx={{
                color: theme.palette.secondary.main,
              }}
            >
              <Badge badgeContent={4} color="info">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{
                color: theme.palette.secondary.main,
              }}
            >
              <Badge badgeContent={17} color="info">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{
                color: theme.palette.secondary.main,
              }}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
