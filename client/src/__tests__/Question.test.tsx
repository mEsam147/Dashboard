import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // Provides matchers like toBeInTheDocument
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import QuestionPage from "../components/pages/QuestionPage";
import { vi } from "vitest";
import {
  useDeleteQuestionMutation,
  useGetAllQuestionQuery,
} from "../store/features/questionApiSlice";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("../store/features/questionApiSlice", async () => {
  const actual = await vi.importActual("../store/features/questionApiSlice");
  return {
    ...actual,
    useGetAllQuestionQuery: vi.fn(),
    useDeleteQuestionMutation: vi.fn(),
  };
});

const mockQuestions = [
  {
    _id: "1",
    questionText: "What is React?",
    options: ["Library", "Framework", "Language"],
    correctAnswer: "Library",
  },
  {
    _id: "2",
    questionText: "What is TypeScript?",
    options: ["Superset", "Framework", "Library"],
    correctAnswer: "Superset",
  },
];

const renderComponent = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <QuestionPage />
      </BrowserRouter>
    </Provider>
  );
};

describe("QuestionPage Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useGetAllQuestionQuery).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as never);
    vi.mocked(useDeleteQuestionMutation).mockReturnValue([
      () => ({ unwrap: () => Promise.resolve({}) }),
      { isLoading: false },
    ] as never);
  });

  it("renders loading skeleton when data is loading", () => {
    vi.mocked(useGetAllQuestionQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as never);

    renderComponent();
    expect(screen.getByTestId("question-skeleton")).toBeInTheDocument();
  });

  it("renders error message when fetching fails", () => {
    vi.mocked(useGetAllQuestionQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: "Failed to fetch" },
    } as never);

    renderComponent();
    expect(screen.getByText("questionPage.errorFetchingQuestions")).toBeInTheDocument();
  });

  it("renders the question list correctly", () => {
    vi.mocked(useGetAllQuestionQuery).mockReturnValue({
      data: mockQuestions,
      isLoading: false,
      error: null,
    } as never);

    renderComponent();
    expect(screen.getByText("What is React?")).toBeInTheDocument();
    expect(screen.getByText("What is TypeScript?")).toBeInTheDocument();
  });

  it("shows a message when no questions are found", () => {
    vi.mocked(useGetAllQuestionQuery).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as never);

    renderComponent();
    expect(screen.getByText("questionPage.noQuestionsFound")).toBeInTheDocument();
  });

  it("calls delete function when delete button is clicked", async () => {
    vi.mocked(useGetAllQuestionQuery).mockReturnValue({
      data: mockQuestions,
      isLoading: false,
      error: null,
    } as never);

    const mockDeleteMutation = vi.fn().mockReturnValue({
      unwrap: vi.fn().mockResolvedValue({}),
    });
    vi.mocked(useDeleteQuestionMutation).mockReturnValue([
      mockDeleteMutation,
      { isLoading: false },
    ] as never);

    renderComponent();

    // Get the first delete button (assumed to be for question _id "1")
    const deleteButton = screen.getAllByText("questionPage.delete")[0];
    window.confirm = vi.fn().mockReturnValue(true);
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteMutation).toHaveBeenCalledWith("1");
    });
  });

  it("does not call delete function if user cancels", async () => {
    vi.mocked(useGetAllQuestionQuery).mockReturnValue({
      data: mockQuestions,
      isLoading: false,
      error: null,
    } as never);

    const mockDeleteMutation = vi.fn();
    vi.mocked(useDeleteQuestionMutation).mockReturnValue([
      mockDeleteMutation,
      { isLoading: false },
    ] as never);

    renderComponent();

    const deleteButton = screen.getAllByText("questionPage.delete")[0];
    window.confirm = vi.fn().mockReturnValue(false);
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteMutation).not.toHaveBeenCalled();
    });
  });

  it("renders an edit button linking to the correct URL", () => {
    vi.mocked(useGetAllQuestionQuery).mockReturnValue({
      data: mockQuestions,
      isLoading: false,
      error: null,
    } as never);

    renderComponent();
    const editButtons = screen.getAllByTestId("edit-button");
    expect(editButtons[0].closest("a")).toHaveAttribute(
      "href",
      "/dashboard/edit-question/1"
    );
  });

  it("renders the add new question button", () => {
    vi.mocked(useGetAllQuestionQuery).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as never);
    renderComponent();
    expect(screen.getByTestId("add-question-button")).toBeInTheDocument();
  });
});
