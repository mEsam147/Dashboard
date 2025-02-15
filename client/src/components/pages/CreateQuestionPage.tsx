import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { FormEvent, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useCreateQuestionMutation } from "../../store/features/questionApiSlice";
import { toast } from "sonner";
import { Question } from "../../types/question.type";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useTranslation } from "react-i18next";

type FormData = {
  questionText: string;
  options: string[];
  correctAnswer: string;
};
const QuizPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [optionInput, setOptionInput] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    questionText: "",
    options: [],
    correctAnswer: "",
  });
  const Navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOptions = () => {
    const trimmedOptionInput = optionInput.trim();

    if (trimmedOptionInput !== "") {
      if (formData.options.includes(trimmedOptionInput)) return;
      setFormData((prev) => ({
        ...prev,
        options: [...prev.options, trimmedOptionInput],
      }));
      setOptionInput("");
    }
  };
  const [createQuestion, { isLoading }] = useCreateQuestionMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.questionText ||
      !formData.options.length ||
      !formData.correctAnswer
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    createQuestion(formData as Question)
      .unwrap()
      .then(() => {
        toast.success("Question Created Successfully");
        setFormData({
          correctAnswer: "",
          options: [],
          questionText: "",
        });
        Navigate("/dashboard/questions");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.data.message);
      });
  };

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
          {t("createQuestionPage.back")}
        </Button>
      </Link>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography
            // variant="h5"
            sx={{
              textAlign: "center",
              color: theme.palette.grey[600],
              fontWeight: 600,
              mb: 2,
              typography: {
                sm: "h5",
                md: "h4",
              },
              [theme.breakpoints.down("sm")]: {
                fontSize: "1.3rem",
              },
              [theme.breakpoints.up("md")]: {
                fontSize: "2rem",
              },
            }}
          >
            {t("createQuestionPage.createQuestion")}{" "}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: "flex",
              justifyContent: "center",
              color: theme.palette.grey[500],
              textShadow: "0px 0px 5px rgba(0,0,0,0.05)",
              fontWeight: 400,
              marginBottom: 2,
            }}
          >
            {t("createQuestionPage.shareInfo")}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ maxWidth: "sm", margin: "auto" }}
          >
            <TextField
              fullWidth
              label={t("createQuestionPage.questionTextLabel")}
              name="questionText"
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
                label={t("createQuestionPage.optionsLabel")}
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
                {t("createQuestionPage.add")}
              </Button>
            </Box>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t("createQuestionPage.correctAnswerLabel")}{" "}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={t("createQuestionPage.correctAnswerLabel")}
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
              startIcon={
                <AddCircleOutlineIcon fontSize="medium" sx={{ mr: 1 }} />
              }
              sx={{
                mt: 2,
                bgcolor: theme.palette.grey[600],
                color: theme.palette.primary.light,
                py: 1,
              }}
              disabled={isLoading}
            >
              {t("createQuestionPage.createQuestionButton")}{" "}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default QuizPage;
