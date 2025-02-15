import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import QuizPage from "../components/pages/QuizPage";
import { store } from "../store/store";
import { useGetAllQuizQuery, useDeleteQuizMutation } from "../store/features/quizApiSlice";

// Mock API slices
vi.mock("../store/features/quizApiSlice", () => ({
  useGetAllQuizQuery: vi.fn(),
  useDeleteQuizMutation: vi.fn(),
}));

describe("QuizPage Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("displays error message when API call fails", () => {
    (useGetAllQuizQuery as unknown as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: "Failed to fetch quizzes" },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <QuizPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("quizPage.error_fetching_quizzes")).toBeInTheDocument();
  });

  it("renders loading state when fetching quizzes", () => {
    (useGetAllQuizQuery as unknown as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <QuizPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument(); // Assuming a loader appears
  });

  it("displays quizzes when API call succeeds", () => {
    (useGetAllQuizQuery as unknown as jest.Mock).mockReturnValue({
      data: [
        { _id: "1", title: "React Quiz", topic: "React", course: "Frontend" },
      ],
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <QuizPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("React Quiz")).toBeInTheDocument();
  });

  it("calls delete function when clicking delete button", async () => {
    const deleteQuizMock = vi.fn().mockReturnValue({ unwrap: vi.fn() });

    (useGetAllQuizQuery as unknown as jest.Mock).mockReturnValue({
      data: [{ _id: "1", title: "React Quiz", topic: "React", course: "Frontend" }],
      isLoading: false,
      error: null,
    });

    (useDeleteQuizMutation as unknown as jest.Mock).mockReturnValue([
      deleteQuizMock,
      { isLoading: false },
    ]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <QuizPage />
        </MemoryRouter>
      </Provider>
    );

    const deleteButton = screen.getByText("quizPage.delete");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteQuizMock).toHaveBeenCalledWith("1");
    });
  });
});
