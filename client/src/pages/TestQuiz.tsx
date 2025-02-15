import {
  Box,
  Button,
  Container,
  Paper,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import {
  useGetSingleQuizQuery,
  useSubmitAnswerMutation,
} from "../store/features/quizApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";


const TestQuiz = () => {
  const { id } = useParams();
  const theme = useTheme();
  const {
    data: getSingleQuiz,
    isLoading,
    isError,
  } = useGetSingleQuizQuery(id as string);
  console.log(getSingleQuiz);
  const [submitAnswer, { isLoading: submitLoading }] =
    useSubmitAnswerMutation();

  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ my: 5 }}>
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6">Loading...</Typography>
        </Paper>
      </Container>
    );
  }

  if (isError || !getSingleQuiz) {
    return (
      <Container maxWidth="md" sx={{ my: 5 }}>
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6">
            Error occurred while fetching quiz data.
          </Typography>
        </Paper>
      </Container>
    );
  }

  const handleSelectAnswer = (questionId: string, selectedAnswer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedAnswer,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== getSingleQuiz.questions.length) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    const formattedAnswers = Object.entries(answers).map(
      ([questionId, answer]) => ({
        questionId,
        answer,
      })
    );

    try {
      const correctAnswers = getSingleQuiz.questions.map(
        (question) => question.questionId.correctAnswer
      );
      const isCorrect = Object.keys(answers).every(
        (questionId, index) => answers[questionId] === correctAnswers[index]
      );
      if (isCorrect) {
        await submitAnswer({
          id: id!,
          studentAnswers: formattedAnswers,
        }).unwrap();
        toast.success("Quiz submitted successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Incorrect answers, please try again.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Submission error:", error);

        toast.error("Failed to submit quiz.");
      }
    }
  };

  console.log(answers);

  return (
    <>
      <Link to={"/dashboard"}>
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
      <Container maxWidth="md" sx={{ my: 5 }}>
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: theme.palette.grey[600],
              textAlign: "center",
              pb: 2,
            }}
          >
            {getSingleQuiz.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
            {getSingleQuiz.topic}
          </Typography>

          {getSingleQuiz.questions.map((question, index: number) => (
            <Box key={question._id} sx={{ mb: 3 }}>
              <Typography variant="h6">
                {index + 1}. {question.questionId?.questionText}
              </Typography>

              <FormControl component="fieldset">
                <RadioGroup
                  value={answers[question._id] || ""}
                  onChange={(e) =>
                    handleSelectAnswer(question._id, e.target.value)
                  }
                >
                  {question.questionId?.options.map(
                    (option: string, i: number) => (
                      <FormControlLabel
                        key={i}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    )
                  )}
                </RadioGroup>
              </FormControl>
            </Box>
          ))}

          <Button
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: theme.palette.primary.main,
              color: "white",
              py: 1.5,
              width: "100%",
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
            onClick={handleSubmit}
            disabled={submitLoading}
          >
            {submitLoading ? "submitting..." : "Submit Quiz"}
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default TestQuiz;
