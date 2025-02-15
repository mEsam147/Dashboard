import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography, useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CampaignIcon from "@mui/icons-material/Campaign";
import QuizIcon from "@mui/icons-material/Quiz";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import theme from "../../styles/theme";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const sideLinks = [
  {
    id: 1,
    text: "Dashboard",
    href: "/dashboard",
    icon: <HomeIcon fontSize="large" />,
  },
  {
    id: 2,
    text: "Questions",
    href: "/dashboard/questions",
    icon: <QuestionAnswerIcon fontSize="large" />,
  },
  {
    id: 3,
    text: "Quiz",
    href: "/dashboard/quiz",
    icon: <QuizIcon fontSize="large" />,
  },
  {
    id: 4,
    text: "Announcement",
    href: "/dashboard/announcement",
    icon: <CampaignIcon fontSize="large" />,
  },
];

const Sidebar = ({
  open,
  toggleDrawer,
}: {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
}) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      open={open}
      onClose={toggleDrawer(false)}
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      sx={{
        width: { md: drawerWidth },
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: theme.palette.primary.light,
          textTransform: "capitalize",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pb: 2,
          pt: 1,
          fontWeight: "bold",
          letterSpacing: 1,
        }}
      >
        {t("Coligo")}
      </Typography>
      <List sx={{ mt: 4 }}>
        {sideLinks.map((link) => (
          <Link
            to={link.href}
            key={link.id}
            style={{ textDecoration: "none", marginBottom: "10px" }}
          >
            <ListItem
              disablePadding
              sx={{
                pb: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: theme.palette.background.paper,
                  transition: "all 0.2s ease-in-out",
                  "& .MuiListItemIcon-root": {
                    color: theme.palette.secondary.main,
                  },
                  "& .MuiListItemText-root": {
                    color: theme.palette.secondary.main,
                  },
                },
                ...(pathname === link.href && {
                  backgroundColor: theme.palette.background.paper,
                  "& .MuiListItemIcon-root": {
                    color: theme.palette.secondary.main,
                  },
                  "& .MuiListItemText-root": {
                    color: theme.palette.secondary.main,
                  },
                }),
              }}
            >
              <ListItemButton sx={{ color: theme.palette.primary.light }}>
                <ListItemIcon sx={{ color: theme.palette.primary.light }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={t(link.text)} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
