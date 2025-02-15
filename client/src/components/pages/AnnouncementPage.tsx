import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { FormEvent, useState } from "react";
import { useCreateAnnouncementMutation } from "../../store/features/announcementApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const Courses = () => {
  const { t } = useTranslation(); // Use translation hook

  const theme = useTheme();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    author: "",
  });
  const navigate = useNavigate();

  const [createAnnouncement, { isLoading }] = useCreateAnnouncementMutation();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    validateField(e.target.name, e.target.value);
  };

  const validateField = (fieldName: string, value: string) => {
    let error = "";
    if (fieldName === "title" && value.length < 3) {
      error = t("AnnouncementPage.Title must be at least 3 characters long");
    }
    if (fieldName === "description" && value.length < 10) {
      error = t("AnnouncementPage.Description must be at least 10 characters long");
    }
    if (fieldName === "author" && value.length < 3) {
      error = t("AnnouncementPage.Author must be at least 3 characters long");
    }
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAnnouncement(formData)
      .unwrap()
      .then(() => {
        toast.success("Announcement created successfully");
        setFormData({ title: "", description: "", author: "" });
        setErrors({ title: "", description: "", author: "" });
        navigate("/dashboard");
      })
      .catch(() => {
        toast.error("Error creating announcement");
      });
  };

  return (
    <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 2 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: theme.palette.grey[600],
            textShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            fontWeight: 600,
            fontSize: { xs: "1.5rem", sm: "2rem" }, // Responsive font size
          }}
        >
          {t("AnnouncementPage.Add Announcement")}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            textAlign: "center",
            display: "block",
            color: theme.palette.grey[500],
            textShadow: "0px 0px 5px rgba(0,0,0,0.05)",
            fontWeight: 400,
            mb: 2,
          }}
        >
          {t("AnnouncementPage.Create a new announcement to share important updates.")}
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label={t("AnnouncementPage.Title")}
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={Boolean(errors.title)}
            helperText={errors.title}
          />
          <TextField
            fullWidth
            label={t("AnnouncementPage.Description")}
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={Boolean(errors.description)}
            helperText={errors.description}
            multiline
            rows={3} // Makes it easier to input longer text
          />
          <TextField
            fullWidth
            label={t("AnnouncementPage.Author")}
            name="author"
            value={formData.author}
            onChange={handleChange}
            error={Boolean(errors.author)}
            helperText={errors.author}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: theme.palette.grey[600],
              color: theme.palette.primary.light,
              fontSize: { xs: 14, sm: 16 }, // Responsive button text
              py: { xs: 1, sm: 1.5 }, // More padding on larger screens
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress
                size={24}
                sx={{ color: theme.palette.primary.light }}
              />
            ) : (
              <>
                <AddCircleOutlineIcon fontSize="medium" sx={{ mr: 1 }} />
                {t("AnnouncementPage.Create Announcement")}
              </>
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Courses;
