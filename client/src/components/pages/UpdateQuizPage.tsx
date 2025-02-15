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
  Skeleton,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { toast } from "sonner";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import {
  useGetSingleQuizQuery,
  useUpdateQuizMutation,
} from "../../store/features/quizApiSlice";
import { Quiz } from "../../types/quiz.type";
import { useGetAllQuestionQuery } from "../../store/features/questionApiSlice";
import { useTranslation } from "react-i18next";

type FormData = {
  title: string;
  topic: string;
  course: string;
  questions: string[];
};

const UpdateQuizPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    topic: "",
    course: "",
    questions: [],
  });

  const Navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { data, isLoading } = useGetSingleQuizQuery(id as string);
  const { data: questionData, isLoading: isLoadingQuestions } =
    useGetAllQuestionQuery();

  const [updateQuiz, { isLoading: updateLoading }] = useUpdateQuizMutation();

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title,
        topic: data.topic,
        course: data.course,
        questions: data.questions.map((question) => question._id),
      });
    }
  }, [data]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, questions, topic, course } = formData;

    // Validate form
    if (!title || questions.length === 0 || !topic || !course) {
      toast.error("Please fill in all fields.");
      return;
    }

    const payload: Quiz = {
      _id: id as string,
      title,
      topic,
      course,
      questions: questions.map((questionId) => ({
        _id: questionId,
        questionId: {
          _id: questionId,
          questionText: "",
          options: [],
          correctAnswer: "",
          createdAt: "",
          updatedAt: "",
        },
      })),
      studentAnswers: [],
      createdAt: "",
      updatedAt: "",
      completed: false,
      __v: 0,
    };

    updateQuiz({
      id: id as string,
      data: payload,
    })
      .unwrap()
      .then(() => {
        toast.success("Quiz Updated Successfully");
        setFormData({ title: "", topic: "", course: "", questions: [] });
        Navigate("/dashboard/quiz");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.data?.message || "Error updating quiz");
      });
  };

  if (isLoading || !data) {
    return (
      <>
        <Link to="/dashboard/quiz">
          <Button
            variant="outlined"
            sx={{
              borderColor: theme.palette.grey[300],
              color: theme.palette.secondary.dark,
              my: 2,
            }}
            startIcon={<NavigateBeforeIcon />}
          >
            Back
          </Button>
        </Link>
        <Container maxWidth="md" sx={{ mt: 1 }}>
          <Skeleton variant="rounded" height={550} />
        </Container>
      </>
    );
  }

  return (
    <>
      <Link to="/dashboard/quiz">
        <Button
          variant="outlined"
          sx={{
            borderColor: theme.palette.grey[300],
            color: theme.palette.secondary.dark,
            my: 2,
          }}
          startIcon={<NavigateBeforeIcon />}
        >
          {t("updateQuizPage.back")}
        </Button>
      </Link>

      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              color: theme.palette.grey[600],
              fontWeight: 600,
              marginBottom: 2,
            }}
          >
            {t("updateQuizPage.title")}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              textAlign: "center",
              color: theme.palette.grey[500],
              marginBottom: 3,
            }}
          >
            {t("updateQuizPage.caption")}
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={t("updateQuizPage.quizTitle")}
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
              autoFocus
            />
            <TextField
              fullWidth
              label={t("updateQuizPage.quizTopic")}
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label={t("updateQuizPage.quizCourse")}
              name="course"
              value={formData.course}
              onChange={handleChange}
              margin="normal"
              required
            />

            <FormControl fullWidth sx={{ my: 1 }} required>
              <InputLabel id="select-question-label">
                {t("updateQuizPage.selectQuestions")}
              </InputLabel>
              <Select
                labelId="select-question-label"
                id="select-question"
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
                required
              >
                {isLoadingQuestions ? (
                  <MenuItem disabled>
                    {t("updateQuizPage.loadingQuestions")}
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

            <Button
              type="submit"
              variant="contained"
              startIcon={
                updateLoading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  <AddCircleOutlineIcon fontSize="medium" sx={{ mr: 1 }} />
                )
              }
              sx={{
                mt: 3,
                bgcolor: theme.palette.primary.main,
                color: "white",
                py: 1.5,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
              disabled={updateLoading}
            >
              {updateLoading
                ? t("updateQuizPage.updatingQuiz")
                : t("updateQuizPage.updateQuiz")}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default UpdateQuizPage;
