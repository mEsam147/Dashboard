import { vi } from "vitest";

import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import QuizPage from "../components/pages/QuizPage";
import {
  useGetAllQuizQuery,
  useDeleteQuizMutation,
} from "../store/features/quizApiSlice";
import "@testing-library/jest-dom";

// Mock the translation hook
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

// Partially mock the RTK Query hooks
vi.mock("../store/features/quizApiSlice", () => ({
  useGetAllQuizQuery: vi.fn(),
  useDeleteQuizMutation: vi.fn(),
}));

const mockQuizData = [
  {
    _id: "1",
    title: "Test Quiz",
    topic: "Test Topic",
    course: "Test Course",
    questions: [
      { _id: "q1", questionId: { questionText: "Question 1" } },
      { _id: "q2", questionId: { questionText: "Question 2" } },
    ],
  },
];

describe("QuizPage Component", () => {
  const mockDeleteQuiz = vi
    .fn()
    .mockReturnValue({ unwrap: vi.fn().mockResolvedValue({}) });

  beforeEach(() => {
    (useDeleteQuizMutation as vi.Mock).mockReturnValue([
      mockDeleteQuiz,
      { isLoading: false },
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("displays loading skeleton when data is loading", () => {
    (useGetAllQuizQuery as vi.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });

    render(
      <BrowserRouter>
        <QuizPage />
      </BrowserRouter>
    );

    // Check for the presence of skeletons
    const skeletons = document.querySelectorAll(".MuiSkeleton-root");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test("shows error message on fetch failure", () => {
    (useGetAllQuizQuery as vi.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: "Error" },
    });

    render(
      <BrowserRouter>
        <QuizPage />
      </BrowserRouter>
    );

    // Expect the text to be "quizPage.error_fetching_quizzes" if the t function is called correctly.
    expect(
      screen.getByText("quizPage.error_fetching_quizzes")
    ).toBeInTheDocument();
  });

  test("displays empty state when no quizzes exist", () => {
    (useGetAllQuizQuery as vi.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: undefined,
    });

    render(
      <BrowserRouter>
        <QuizPage />
      </BrowserRouter>
    );

    expect(
      screen.getByText("quizPage.no_quizzes_available")
    ).toBeInTheDocument();
  });

  test("renders quiz data correctly", () => {
    (useGetAllQuizQuery as vi.Mock).mockReturnValue({
      data: mockQuizData,
      isLoading: false,
      error: undefined,
    });

    render(
      <BrowserRouter>
        <QuizPage />
      </BrowserRouter>
    );

    expect(screen.getByText("Test Quiz")).toBeInTheDocument();
    expect(screen.getByText("Test Topic")).toBeInTheDocument();
    expect(screen.getByText("Test Course")).toBeInTheDocument();
    expect(screen.getByLabelText("All Questions")).toBeInTheDocument();
  });

  test("deletes quiz after confirmation", () => {
    (useGetAllQuizQuery as vi.Mock).mockReturnValue({
      data: mockQuizData,
      isLoading: false,
      error: undefined,
    } as never);

    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(
      <BrowserRouter>
        <QuizPage />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("quizPage.delete"));
    expect(window.confirm).toHaveBeenCalledWith(
      "quizPage.delete_quiz_confirmation"
    );
    expect(mockDeleteQuiz).toHaveBeenCalledWith("1");
  });

  test("navigates to edit and create pages correctly", () => {
    (useGetAllQuizQuery as vi.Mock).mockReturnValue({
      data: mockQuizData,
      isLoading: false,
      error: undefined,
    } as never);

    render(
      <BrowserRouter>
        <QuizPage />
      </BrowserRouter>
    );

    const editLink = screen.getByText("quizPage.edit").closest("a");
    expect(editLink).toHaveAttribute("href", "/dashboard/edit-quiz/1");

    const createLink = screen.getByText("quizPage.add_new_quiz").closest("a");
    expect(createLink).toHaveAttribute("href", "/dashboard/create-quiz");
  });
});
