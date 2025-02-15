import {
  Box,
  Button,
  Container,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  MenuItem,
  CircularProgress,
  Grid,
} from "@mui/material";
import { FormEvent, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useCreateQuizMutation } from "../../store/features/quizApiSlice";
import { useGetAllQuestionQuery } from "../../store/features/questionApiSlice";
import { CreateQuizPayload, Quiz } from "../../types/quiz.type";
import { useTranslation } from "react-i18next";

type FormData = {
  title: string;
  topic: string;
  course: string;
  questions: string[];
};

const CreateQuizPage = () => {
  const { t } = useTranslation();

  const theme = useTheme();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    topic: "",
    course: "",
    questions: [],
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { data: questionData, isLoading: isLoadingQuestions } =
    useGetAllQuestionQuery();

  const [createQuiz, { isLoading }] = useCreateQuizMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, questions, topic, course } = formData;

    if (!title || questions.length === 0 || !topic || !course) {
      toast.error("Please fill in all fields.");
      return;
    }

    const payload: CreateQuizPayload = {
      title,
      topic,
      course,
      questions: questions.map((questionId) => ({ questionId })),
    };

    createQuiz(payload as unknown as Quiz)
      .unwrap()
      .then(() => {
        toast.success("Quiz Created Successfully");
        setFormData({ title: "", topic: "", course: "", questions: [] });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.data?.message || "Error creating quiz");
      });
  };

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="start" mb={2}>
        <Link to="/dashboard/questions">
          <Button
            variant="outlined"
            sx={{
              borderColor: theme.palette.grey[300],
              color: theme.palette.secondary.dark,
            }}
            startIcon={<NavigateBeforeIcon />}
          >
            {t("createQuizPage.back")}
          </Button>
        </Link>
      </Box>

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, mt: 2, borderRadius: 2 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: theme.palette.grey[600],
            fontWeight: 600,
            mb: 2,
          }}
        >
          {t("createQuizPage.title")}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            color: theme.palette.grey[500],
            mb: 3,
          }}
        >
          {t("createQuizPage.caption")}
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t("createQuizPage.quizTitle")}
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t("createQuizPage.quizTopic")}
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t("createQuizPage.quizCourse")}
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="select-question-label">
                  {t("createQuizPage.selectQuestions")}
                </InputLabel>
                <Select
                  labelId="select-question-label"
                  multiple
                  value={formData.questions}
                  onChange={(e) => {
                    const { value } = e.target;
                    setFormData((prev) => ({
                      ...prev,
                      questions:
                        typeof value === "string" ? value.split(",") : value,
                    }));
                  }}
                  disabled={isLoadingQuestions}
                >
                  {isLoadingQuestions ? (
                    <MenuItem disabled>
                      {t("createQuizPage.loadingQuestions")}
                    </MenuItem>
                  ) : (
                    questionData?.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.questionText}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              type="submit"
              variant="contained"
              startIcon={
                isLoading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  <AddCircleOutlineIcon fontSize="medium" sx={{ mr: 1 }} />
                )
              }
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "white",
                py: 1.5,
                width: { xs: "100%", sm: "auto" },
                "&:hover": { bgcolor: theme.palette.primary.dark },
              }}
              disabled={isLoading}
            >
              {isLoading
                ? t("createQuizPage.creatingQuiz")
                : t("createQuizPage.createQuiz")}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateQuizPage;
