import { Typography, Button, Box, Modal, Card } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Announcement from "../dashboard/Announcement";
import Quiz from "../dashboard/Quiz";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "ar";

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        data-testid="dashboard-card"
        sx={{
          mb: 3,
          height: 250,
          display: "flex",
          textAlign: {
            xs: "center",
            md: "left",
          },
          justifyContent: {
            xs: "center",
            md: "space-between",
          },
          alignItems: {
            xs: "center",
          },
          flexDirection: isRTL ? "row-reverse" : "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { md: 1 },
            px: {
              xs: 4,
              sm: 2,
              md: 4,
            },
            py: 4,
            flexGrow: 1,
          }}
        >
          <Typography
            sx={{
              typography: { xs: "h6", sm: "h6", md: "h5", lg: "h4" },
              color: theme.palette.grey[500],
              textShadow: "0 0 1px rgba(0, 0, 0,0.8)",
              fontWeight: "bold",
              textTransform: "uppercase",
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {t("Exam.Time is Here")}
          </Typography>

          <Typography
            sx={{
              color: theme.palette.secondary.main,
              my: 1,
              textAlign: isRTL ? "right" : "left",
              typography: {
                xs: "caption",
                md: "body2",
              },
            }}
          >
            {t("Exam.Description")}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mb: 1,
              textShadow: "0 0 1px rgba(0, 0, 0, 0.4)",
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {t("Exam.Motivation")}
          </Typography>
          <Box
            sx={{
              textAlign: "right",
              width: "100%",
              display: "flex",
              justifyContent: !isRTL ? "start" : "end",
            }}
          >
            <Button
              onClick={handleOpen}
              variant="contained"
              sx={{
                bgcolor: theme.palette.grey[400],
                color: theme.palette.primary.light,
                fontSize: {
                  xs: 17,
                  sm: 14,
                },
                py: {
                  xs: 0,
                  sm: 1,
                  md: 1.5,
                },

                mt: {
                  sx: 2,
                  sm: 0,
                },
                width: { xs: "100%", sm: "60%", lg: "40%" },
                display: "flex",
                justifyContent: "center",
                // alignItems: "center",
                // textAlign: "center",
                "&:hover": {
                  bgcolor: theme.palette.grey[500],
                },
              }}
            >
              {t("Exam.Tips.View")}
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "80%",
              md: "50%",
              lg: "600px",
            },
            maxWidth: "400px",
            minWidth: "300px",
            display: { xs: "none", sm: "flex" },
            justifyContent: "center",
            mx: "auto",
            overflow: "hidden",
          }}
        >
          <img
            src="/dashboard.jpg"
            alt="Dashboard"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "8px",
              display: "block",
              overflow: "hidden",
            }}
            loading="lazy"
          />
        </Box>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        role="dialog"
        data-testid="modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500, md: 600 },
            maxHeight: "90vh",
            overflow: "auto",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: {
              xs: 1,
              md: 4,
            },
          }}
        >
          <Typography id="modal-title" variant="h6" sx={{ mb: 2 }}>
            View Exam Tips
          </Typography>
          <Typography id="modal-description">
            <strong>Exam Tips</strong>
            <ul>
              <li>
                <strong>{t("Exam.Tips.Make a Study Plan")}</strong>
                <ul>
                  <li>
                    {t(
                      "Exam.Tips.Organize subjects based on difficulty and priority."
                    )}
                  </li>
                  <li>
                    {t(
                      "Exam.Tips.Set daily study goals to avoid last-minute cramming."
                    )}
                  </li>
                </ul>
              </li>
              <li>
                <strong>{t("Exam.Tips.Use Active Learning Techniques")}</strong>
                <ul>
                  <li>
                    {t("Exam.Tips.Summarize key points in your own words.")}
                  </li>
                  <li>
                    {t("Exam.Tips.Create flashcards, mind maps, or mnemonics.")}
                  </li>
                  <li>
                    {t(
                      "Exam.Tips.Teach someone else or explain concepts out loud."
                    )}
                  </li>
                </ul>
              </li>
              <li>
                <strong>{t("Exam.Tips.Practice with Past Papers")}</strong>
                <ul>
                  <li>
                    {t("Exam.Tips.Solve previous years' question papers.")}
                  </li>
                  <li>
                    {t(
                      "Exam.Tips.Time yourself to improve speed and accuracy."
                    )}
                  </li>
                </ul>
              </li>
              <li>
                <strong>{t("Exam.Tips.Stay Organized & Healthy")}</strong>
                <ul>
                  <li>{t("Exam.Tips.Keep notes and books organized.")}</li>
                  <li>{t("Exam.Tips.Sleep 7-8 hours and take breaks.")}</li>
                </ul>
              </li>
            </ul>
          </Typography>
        </Box>
      </Modal>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          gap: { xs: 1, md: 2 },
        }}
      >
        <Box sx={{ flexGrow: 2, flexBasis: { xs: "100%", md: "70%" } }}>
          <Announcement />
        </Box>

        <Box sx={{ flexGrow: 1, flexBasis: { xs: "100%", md: "30%" } }}>
          <Quiz />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
