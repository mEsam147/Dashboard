import { Box, Paper, Typography } from "@mui/material";
import theme from "../../styles/theme";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import Button from "@mui/material/Button";

import { useGetRandomQuizQuery } from "../../store/features/quizApiSlice";
import { Link } from "react-router-dom";
import QuizSkeleton from "../skeletons/QuizSkeleton";
import { useTranslation } from "react-i18next";

const Quiz = () => {
  const { t } = useTranslation();

  const { data: randomQuiz, isLoading: randomLoading } =
    useGetRandomQuizQuery();

  const filteredRandomQuiz =
    randomQuiz?.filter((item) => !item.completed) || [];

  if (randomLoading) {
    return <QuizSkeleton />;
  }
  return (
    <Paper sx={{ px: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 0.8,
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, color: theme.palette.grey[600] }}
        >
          {t("QuizComponent.What's due")}
        </Typography>
        {filteredRandomQuiz?.length !== 0 && (
          <Link to={"/dashboard/quiz"}>
            <Button
              variant="text"
              sx={{ color: theme.palette.grey[500], fontWeight: 600 }}
            >
              {t("QuizComponent.All")}
            </Button>
          </Link>
        )}
      </Box>
      <Typography variant="caption" sx={{ color: theme.palette.grey[500] }}>
        {t("QuizComponent.No upcoming deadlines")}
      </Typography>

      {randomQuiz?.length === 0 ? (
        <Typography
          variant="caption"
          sx={{ color: theme.palette.grey[500], py: 3 }}
        >
          {t("QuizComponent.No quizzes available")}
        </Typography>
      ) : (
        randomQuiz?.map(
          (item) =>
            !item.completed && (
              <Box
                key={item._id}
                sx={{
                  mb: 1,
                  py: 1,
                  borderBottom: "1px solid",
                  borderColor: theme.palette.grey[300],
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0,
                    color: theme.palette.grey[500],
                    textShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                  }}
                >
                  <HourglassDisabledIcon fontSize="large" />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: theme.palette.grey[400],
                    textShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                  }}
                >
                  <Typography sx={{ fontSize: 18 }}>
                    {t("QuizComponent.Course")}:
                  </Typography>
                  <Typography sx={{ fontSize: 15 }}>{item.course}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: theme.palette.grey[400],
                    textShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                  }}
                >
                  <Typography sx={{ fontSize: 18 }}>
                    {t("QuizComponent.Topic")}:
                  </Typography>
                  <Typography sx={{ fontSize: 15 }}>{item.topic}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: theme.palette.grey[400],
                    textShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                  }}
                >
                  <Typography sx={{ fontSize: 18 }}>
                    {t("QuizComponent.Due to")}:
                  </Typography>
                  <Typography sx={{ fontSize: 15 }}>
                    {item.createdAt}
                  </Typography>
                </Box>
                <Link
                  to={`/test/${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      display: "block",
                      width: "100%",
                      fontWeight: 600,
                      border: "2px solid",
                      borderColor: theme.palette.grey[500],
                      color: theme.palette.primary.main,
                      my: 2,
                    }}
                  >
                    {t("QuizComponent.Start Quiz")}
                  </Button>
                </Link>
              </Box>
            )
        )
      )}
      {filteredRandomQuiz.length === 0 && (
        <Typography
          sx={{
            fontSize: 20,
            color: theme.palette.grey[500],
            py: 5.2,
            textAlign: "center",
          }}
        >
          {t("QuizComponent.No quizzes available")}
        </Typography>
      )}

      {randomQuiz?.map(
        (item) =>
          !item.completed && (
            <Box
              key={item._id}
              sx={{
                mb: 1,
                py: 1,
                borderBottom: "1px solid",
                borderColor: theme.palette.grey[300],
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0,
                  color: theme.palette.grey[500],
                  textShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                }}
              >
                <HourglassDisabledIcon fontSize="large" />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: theme.palette.grey[400],
                  textShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                }}
              >
                <Typography sx={{ fontSize: 18 }}>Course:</Typography>
                <Typography sx={{ fontSize: 15 }}>{item.course}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: theme.palette.grey[400],
                  textShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                }}
              >
                <Typography sx={{ fontSize: 18 }}>Topic:</Typography>
                <Typography sx={{ fontSize: 15 }}>{item.topic}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: theme.palette.grey[400],
                  textShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                }}
              >
                <Typography sx={{ fontSize: 18 }}>Due to :</Typography>
                <Typography sx={{ fontSize: 15 }}>{item.createdAt}</Typography>
              </Box>
              <Link to={`/test/${item._id}`} style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  sx={{
                    display: "block",
                    width: "100%",
                    fontWeight: 600,
                    border: "2px solid",
                    borderColor: theme.palette.grey[500],
                    color: theme.palette.primary.main,
                    my: 2,
                  }}
                >
                  Start Quiz
                </Button>
              </Link>
            </Box>
          )
      )}
    </Paper>
  );
};

export default Quiz;
