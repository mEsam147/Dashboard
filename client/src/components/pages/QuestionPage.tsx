import { useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useDeleteQuestionMutation,
  useGetAllQuestionQuery,
} from "../../store/features/questionApiSlice";
import {
  Box,
  Button,
  Container,
  NativeSelect,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useTranslation } from "react-i18next";

const QuestionPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { data, isLoading, error } = useGetAllQuestionQuery();
  const [deleteQuestion, { isLoading: isDeleting, status }] =
    useDeleteQuestionMutation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDelete = (id: string) => {
    if (window.confirm(t("questionPage.deleteConfirmation"))) {
      deleteQuestion(id).unwrap();
    }
  };

  const memoizedTableRows = useMemo(() => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={5}>
            <Skeleton variant="rectangular" width="100%" height={150} />
          </TableCell>
        </TableRow>
      );
    }

    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={5}>
            <Typography variant="h6" color="error">
              {t("questionPage.errorFetchingQuestions")}
            </Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (!data || data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5}>
            <Typography
              variant="h5"
              color="textSecondary"
              sx={{ display: "flex", justifyContent: "center", py: 2 }}
            >
              {t("questionPage.noQuestionsFound")}
            </Typography>
          </TableCell>
        </TableRow>
      );
    }

    return data.map((item) => (
      <TableRow
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        key={item._id}
      >
        <TableCell
          component="th"
          scope="row"
          sx={{ color: theme.palette.grey[500] }}
        >
          {item.questionText}
        </TableCell>
        <TableCell align="right" sx={{ color: theme.palette.grey[500] }}>
          <NativeSelect sx={{ color: theme.palette.grey[500] }}>
            {item.options.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </NativeSelect>
        </TableCell>
        <TableCell align="center" sx={{ color: theme.palette.grey[500] }}>
          {item.correctAnswer}
        </TableCell>
        <TableCell
          align="right"
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          <Button
            variant="contained"
            sx={{ bgcolor: theme.palette.error.main }}
            onClick={() => handleDelete(item._id)}
            disabled={isDeleting}
          >
            {isDeleting && status === "pending"
              ? t("questionPage.deleting")
              : t("questionPage.delete")}
          </Button>
          <Link to={`/dashboard/edit-question/${item._id}`}>
            <Button variant="contained">Edit</Button>
          </Link>
        </TableCell>
      </TableRow>
    ));
  }, [
    data,
    error,
    handleDelete,
    isDeleting,
    isLoading,
    status,
    theme.palette.error.main,
    theme.palette.grey,
    t,
  ]);

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
        {t("questionPage.allQuestions")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
          my: 2,
        }}
      >
        <Link to={"/dashboard/create-question"}>
          <Button
            variant="contained"
            sx={{
              bgcolor: theme.palette.grey[700],
              color: theme.palette.primary.light,
            }}
            startIcon={<ControlPointIcon />}
          >
            {t("questionPage.addNewQuestion")}
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
                {t("questionPage.questionText")}
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
                align="center"
              >
                {t("questionPage.options")}
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
                align="center"
              >
                {t("questionPage.correctAnswer")}
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
                align="right"
              >
                {t("questionPage.actions")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{memoizedTableRows}</TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default QuestionPage;
