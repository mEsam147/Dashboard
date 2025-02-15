import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {
  useDeleteQuizMutation,
  useGetAllQuizQuery,
} from "../../store/features/quizApiSlice";
import { useTranslation } from "react-i18next";

const QuizPage = () => {
  const { t } = useTranslation();

  const theme = useTheme();
  const {
    data: quizData,
    isLoading: quizLoading,
    error,
  } = useGetAllQuizQuery();
  const [deleteQuiz, { isLoading: isDeleting }] = useDeleteQuizMutation();

  const handleDeleteQuiz = (id: string) => {
    if (window.confirm(t("quizPage.delete_quiz_confirmation"))) {
      deleteQuiz(id).unwrap();
    }
  };

  // Error handling
  if (error) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h6" color="error" align="center" sx={{ my: 2 }}>
          {t("quizPage.error_fetching_quizzes")}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          my: 2,
          fontWeight: 600,
          color: theme.palette.grey[600],
        }}
      >
        {t("quizPage.all_quizzes")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          my: 2,
        }}
      >
        <Link to="/dashboard/create-quiz">
          <Button
            variant="contained"
            sx={{
              bgcolor: theme.palette.grey[700],
              color: theme.palette.primary.light,
            }}
            startIcon={<ControlPointIcon />}
          >
            {t("quizPage.add_new_quiz")}
          </Button>
        </Link>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          overflowX: "auto",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
                {t("quizPage.quiz_title")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
                {t("quizPage.quiz_topic")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
                {t("quizPage.quiz_course")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
                {t("quizPage.question")}
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
                {t("quizPage.actions")}
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {quizData?.length === 0 && (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={5} align="center">
                  <Typography variant="h6" color="text.secondary">
                    {t("quizPage.no_quizzes_available")}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {quizLoading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Skeleton variant="rectangular" width="100%" height={150} />
                </TableCell>
              </TableRow>
            ) : (
              quizData?.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: theme.palette.grey[100] },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      color: theme.palette.text.secondary,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "120px",
                      "@media (min-width: 600px)": { maxWidth: "none" },
                    }}
                  >
                    {item.title}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: theme.palette.text.secondary,

                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "120px",
                      "@media (min-width: 600px)": { maxWidth: "none" },
                    }}
                  >
                    {item.topic}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {item.course}
                  </TableCell>
                  <TableCell align="center" width={200}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        All Questions
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Question"
                        sx={{
                          py: 0,
                          backgroundColor: theme.palette.grey[100],
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "4px",
                          },
                        }}
                      >
                        {item.questions?.map((quest, index) => (
                          <MenuItem
                            key={index}
                            value={quest._id}
                            sx={{
                              borderBottom: `1px solid ${theme.palette.divider}`,
                              "&:hover": {
                                backgroundColor: theme.palette.grey[200],
                              },
                            }}
                          >
                            {quest?.questionId?.questionText}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: theme.palette.error.main,
                        color: "white",
                        "&:hover": { bgcolor: theme.palette.error.dark },
                      }}
                      onClick={() => handleDeleteQuiz(item?._id as string)}
                      disabled={isDeleting}
                    >
                      {isDeleting
                        ? t("quizPage.isDeleting")
                        : t("quizPage.delete")}
                    </Button>
                    <Link to={`/dashboard/edit-quiz/${item._id}`}>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          color: "white",
                          "&:hover": { bgcolor: theme.palette.primary.dark },
                        }}
                      >
                        {t("quizPage.edit")}
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default QuizPage;
