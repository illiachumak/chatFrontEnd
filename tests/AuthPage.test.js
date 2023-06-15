import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AuthPage from "./AuthPage";

describe("AuthPage", () => {
  test("renders sign-in form by default", () => {
    render(<AuthPage />);
    
    // Check if the sign-in form is rendered
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("switches to sign-up form when 'Sign up' is clicked", () => {
    render(<AuthPage />);
    
    // Click on 'Sign up'
    fireEvent.click(screen.getByText("Do not have an account? Sign up."));

    // Check if the sign-up form is rendered
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Register" })).toBeInTheDocument();
  });

  test("submits sign-in form with correct values", () => {
    render(<AuthPage />);
    
    // Fill in the email and password fields
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    // Assert that the form is submitted correctly (replace with your own assertions)
    // ...
  });

  test("submits sign-up form with correct values", () => {
    render(<AuthPage />);
    
    // Switch to the sign-up form
    fireEvent.click(screen.getByText("Already have an account? Sign in."));

    // Fill in the email, username, and password fields
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    // Assert that the form is submitted correctly (replace with your own assertions)
    // ...
  });
});
