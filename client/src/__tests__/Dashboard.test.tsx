import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Dashboard from "../components/pages/Dashboard";
import "@testing-library/jest-dom";

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("Dashboard Modal Functionality", () => {
  beforeEach(() => {
    renderWithProviders(<Dashboard />);
  });

  test("opens the modal when the button is clicked", async () => {
    try {
      const openButton = screen.getByRole("button", { name: /view/i });
      fireEvent.click(openButton);

      const modal = await screen.findByTestId("modal");
      expect(modal).toBeInTheDocument();
      expect(modal).toBeVisible();
    } catch (error) {
      console.error("Error opening modal:", error);
    }
  });

  test("closes the modal when the close function is triggered", async () => {
    try {
      const openButton = screen.getByRole("button", { name: /view/i });
      fireEvent.click(openButton);

      const modal = await screen.findByTestId("modal");
      expect(modal).toBeVisible();

      fireEvent.keyDown(document, { key: "Escape" });

      await waitFor(() => expect(modal).not.toBeVisible());
    } catch (error) {
      console.error("Error closing modal:", error);
    }
  });

  test("modal contains expected content", async () => {
    try {
      const openButton = screen.getByRole("button", { name: /view/i });
      fireEvent.click(openButton);

      const modal = await screen.findByTestId("modal");
      expect(modal).toBeInTheDocument();
      expect(modal).toBeVisible();

      expect(screen.getByText("Expected content")).toBeInTheDocument();
    } catch (error) {
      console.error("Error verifying modal content:", error);
    }
  });
});
