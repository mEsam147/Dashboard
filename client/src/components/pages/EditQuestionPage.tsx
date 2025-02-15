import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  useGetSingleQuestionQuery,
  useUpdateQuestionMutation,
} from "../../store/features/questionApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useTranslation } from "react-i18next";

const EditQuestionPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const theme = useTheme();

  const { data, isLoading } = useGetSingleQuestionQuery(id as string);
  const [formData, setFormData] = useState({
    questionText: "",
    options: [] as string[],
    correctAnswer: "",
  });
  const [optionInput, setOptionInput] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setFormData({
        questionText: data.questionText,
        options: data.options || [],
        correctAnswer: data.correctAnswer,
      });
    }
  }, [data]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    if (name === "options") {
      setFormData((prevState) => ({
        ...prevState,
        options: [...prevState.options, value],
      }));
      e.target.value = "";
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleOptions = () => {
    const trimmedOptionInput = optionInput.trim();
    if (trimmedOptionInput !== "") {
      setFormData((prev) => ({
        ...prev,
        options: [...prev.options, trimmedOptionInput],
      }));
      setOptionInput("");
    }
  };

  const [updateQuestion, { isLoading: isUpdating }] =
    useUpdateQuestionMutation();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { questionText, options, correctAnswer } = formData;
    if (!questionText || !options.length || !correctAnswer) {
      toast.error(t("editQuestionPage.errorMissingFields"));
      return;
    }
    try {
      await updateQuestion({ id: id!, data: formData }).unwrap();
      toast.success("Question Updated Successfully");
      navigate("/dashboard/questions");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        toast.error(t("editQuestionPage.errorUpdating"));
      }
    }
  };

  if (isLoading || !data) {
    return (
      <>
        <Link to={"/dashboard/questions"}>
          <Button
            variant="outlined"
            sx={{
              borderColor: theme.palette.grey[300],
              color: theme.palette.secondary.dark,
            }}
            startIcon={<NavigateBeforeIcon />}
          >
            {t("editQuestionPage.back")}
          </Button>
        </Link>
        <Container maxWidth="md" sx={{ mt: 3 }}>
          <Skeleton variant="rounded" height={550} />;
        </Container>
      </>
    );
  }

  return (
    <>
      <Link to={"/dashboard/questions"}>
        <Button
          variant="outlined"
          sx={{
            borderColor: theme.palette.grey[300],
            color: theme.palette.secondary.dark,
          }}
          startIcon={<NavigateBeforeIcon />}
        >
          {t("editQuestionPage.back")}
        </Button>
      </Link>
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <Paper>
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.grey[600],
              display: "flex",
              justifyContent: "center",
              py: 3,
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          >
            {t("editQuestionPage.editQuestion")}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ maxWidth: "sm", margin: "auto" }}
          >
            <TextField
              fullWidth
              label={t("editQuestionPage.questionTextLabel")}
              name="questionText"
              value={formData.questionText}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Box sx={{ position: "relative" }}>
              {formData.options.map((item, index) => (
                <Chip
                  label={item}
                  key={index}
                  sx={{
                    borderRadius: "0",
                    mr: 1,
                    mb: 1,
                    fontSize: "3",
                    fontWeight: 600,
                    color: theme.palette.secondary.main,
                    position: "relative",
                  }}
                  onDelete={() => {
                    setFormData((prev) => ({
                      ...prev,
                      options: prev.options.filter((option) => option !== item),
                    }));
                  }}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                fullWidth
                label={t("editQuestionPage.optionsLabel")}
                name="options"
                value={optionInput}
                onChange={(e) => setOptionInput(e.target.value)}
                margin="normal"
                sx={{ flexGrow: 1 }}
                required
              />
              <Button
                variant="outlined"
                onClick={handleOptions}
                sx={{ p: 1.5, mt: 0.5, fontWeight: 600 }}
              >
                Add
              </Button>
            </Box>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-label">
                {t("editQuestionPage.correctAnswerLabel")}
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={t("editQuestionPage.correctAnswerLabel")}
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleChange}
              >
                {formData.options.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              sx={{
                my: 3,
                bgcolor: theme.palette.grey[600],
                color: theme.palette.primary.light,
                py: 1,
              }}
              disabled={isUpdating}
            >
              {isUpdating
                ? t("editQuestionPage.updatingButton")
                : t("editQuestionPage.updateButton")}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default EditQuestionPage;
