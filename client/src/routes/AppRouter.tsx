import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/pages/Dashboard";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/HomePage";
import RequireAuth from "../components/common/RequireAuth";
import QuizPage from "../components/pages/QuizPage";
import AnnouncementPage from "../components/pages/AnnouncementPage";
import CreateQuestionPage from "../components/pages/CreateQuestionPage";
import QuestionPage from "../components/pages/QuestionPage";
import EditQuestionPage from "../components/pages/EditQuestionPage";
import CreateQuizPage from "../components/pages/CreateQuizPage";
import UpdateQuizPage from "../components/pages/UpdateQuizPage";
import TestQuiz from "../pages/TestQuiz";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

<Route path="/test/:id" element={<TestQuiz/>}/>
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="create-quiz" element={<CreateQuizPage />} />
        <Route path="edit-quiz/:id" element={<UpdateQuizPage />} />

        <Route path="announcement" element={<AnnouncementPage />} />
        <Route path="questions" element={<QuestionPage />} />
        <Route path="create-question" element={<CreateQuestionPage />} />
        <Route path="edit-question/:id" element={<EditQuestionPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
