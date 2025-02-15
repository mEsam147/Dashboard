import { Card, CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import theme from "../../styles/theme";
import {
  useDeleteAnnouncementMutation,
  useGetAnnouncementQuery,
} from "../../store/features/announcementApiSlice";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "sonner";
import AnnouncementSkeleton from "../skeletons/AnnouncementSkeleton";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Announcement = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const isRTL = i18next.language === "ar";

  const { data, isLoading: getLoading } = useGetAnnouncementQuery();

  const [deleteAnnouncement, { isLoading: deleteLoading }] =
    useDeleteAnnouncementMutation();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const { data, isLoading } = useGetAnnouncementQuery();

  const handleDeleteAnnouncement = (id: string) => {
    if (window.confirm(t("AnnouncementComponent.DeleteConfirmation"))) {
      deleteAnnouncement(id)
        .unwrap()
        .then(() => {
          toast.success(t("AnnouncementComponent.DeleteSuccess"));
        })
        .catch((error) => {
          console.error("Error deleting announcement:", error);
        });
    }
  };

  useEffect(() => {
    if (!data || data.length === 0) {
      setOpen(false);
    }
  }, [data]);

  if (getLoading) return <AnnouncementSkeleton />;

  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: theme.palette.grey[700] }}
          >
            {t("AnnouncementComponent.Title")}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: theme.palette.grey[400], fontWeight: "600" }}
          >
            {t("AnnouncementComponent.Description")}
          </Typography>
        </Box>
        {data && data?.length > 0 && (
          <Button
            variant="text"
            sx={{ color: theme.palette.grey[500], fontWeight: 600 }}
            onClick={handleOpen}
          >
            {t("AnnouncementComponent.ViewAll")}
          </Button>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              borderRadius: 3,
              boxShadow: 24,
              p: 3,
            }}
          >
            <Typography
              id="modal-title"
              variant="h5"
              sx={{
                mb: 2,
                display: "flex",
                justifyContent: "start",
                fontWeight: 600,
                color: theme.palette.grey[600],
              }}
            >
              {t("AnnouncementComponent.Title")}
            </Typography>
            {data?.map((item) => (
              <Box
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 3,
                  mt: 3,
                  px: 4,
                  position: "relative",
                }}
                key={item._id}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <img
                    src="/empty.jpg"
                    alt={item.author}
                    style={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: theme.palette.primary.dark,

                        textShadow: "0px 0px 5px rgba(0,0,0,0.4)",
                      }}
                    >
                      {item?.author}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: theme.palette.grey[500],

                        textShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                      }}
                    >
                      {t("AnnouncementComponent.Date")}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    borderLeft: "1px solid",
                    borderColor: theme.palette.grey[300],
                    px: 1,
                    color: theme.palette.grey[500],

                    maxWidth: { xs: "100%", sm: "320px" },
                    overflowWrap: "break-word",
                    textShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                  }}
                >
                  {item.description}
                </Typography>
                <Button
                  onClick={() => handleDeleteAnnouncement(item?._id as string)}
                  variant="text"
                  sx={{
                    position: "absolute",
                    top: -15,
                    right: -25,
                    color: theme.palette.error.main,

                    cursor: "pointer",
                    "&:hover": {
                      color: theme.palette.error.main,
                    },
                  }}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <CloseIcon sx={{ fontSize: 18 }} />
                  )}
                </Button>
              </Box>
            ))}
          </Box>
        </Modal>
      </Box>

      {data?.length === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: theme.palette.grey[500], my: 5 }}
          >
            {t("AnnouncementComponent.NoAnnouncements")}
          </Typography>
        </Box>
      )}
      {data?.slice(0, 3).map((item) => (
        <Box
          sx={{
            display: "flex",
            gap: 3,
            my: 3,
            px: 4,
            flexDirection: isRTL ? "row-reverse" : "row",
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <img
              src="/empty.jpg"
              loading="lazy"
              alt={item.author}
              style={{
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.primary.dark,

                  textShadow: "0px 0px 5px rgba(0,0,0,0.4)",
                }}
              >
                {item.author}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.grey[500],

                  textShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                }}
              >
                {t("AnnouncementComponent.Date")}
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              borderColor: theme.palette.grey[300],
              px: 1,
              color: theme.palette.grey[500],
              maxWidth: "600px",
              overflowWrap: "break-word",
              textShadow: "0px 0px 5px rgba(0,0,0,0.2)",
              borderLeft: isRTL ? "none" : "1px solid",
              borderRight: isRTL ? "1px solid" : "none",
              textAlign: isRTL ? "right" : "left",
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            {item.description}
          </Typography>
        </Box>
      ))}
    </Card>
  );
};

export default Announcement;
