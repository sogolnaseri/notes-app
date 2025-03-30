import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomeContent from "../components/HomeContent";
import "@testing-library/jest-dom";
import React from "react";
import { AuthContext } from "../context/AuthContext";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const mockUser = "testUser";

const renderWithAuth = (ui: React.ReactNode) => {
  return render(
    <AuthContext.Provider
      value={{
        isLoggedIn: true,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
        currentUser: mockUser,
      }}
    >
      {ui}
    </AuthContext.Provider>
  );
};

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("username", mockUser);
  const preloadedNote = {
    id: "123",
    title: "Note to delete",
    content: "bye!",
    createdTime: new Date().toISOString(),
  };
  localStorage.setItem(`notes-${mockUser}`, JSON.stringify([preloadedNote]));
});

describe("Notes App", () => {
  it("creates a new note and shows it on the homepage", async () => {
    renderWithAuth(<HomeContent />);

    fireEvent.click(screen.getByRole("button", { name: /\+ Add Note/i }));
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Note" },
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: "Test Content" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    const noteTitle = await screen.findByText(/Test Note/i);
    expect(noteTitle).toBeInTheDocument();
  });

  it("shows a preloaded note from localStorage", async () => {
    renderWithAuth(<HomeContent />);

    const preloadedNote = await screen.findByText("Note to delete");
    expect(preloadedNote).toBeInTheDocument();
  });
});
