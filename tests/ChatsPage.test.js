import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ChatsPage from "../src/ChatsPage";

// Mock the socket.io-client module
jest.mock("socket.io-client", () => {
  const emitMock = jest.fn();
  const onMock = jest.fn();
  const offMock = jest.fn();

  return jest.fn().mockReturnValue({
    emit: emitMock,
    on: onMock,
    off: offMock,
  });
});

describe("ChatsPage", () => {
  beforeEach(() => {
    // Clear the mock calls before each test
    jest.clearAllMocks();
  });

  test("renders the component", () => {
    render(<ChatsPage user="John" userId="123" roomId="456" photoURL="avatar.png" />);
    
    // Verify that the component renders without errors
    expect(screen.getByText("Users in Chat")).toBeInTheDocument();
  });

  test("sends a message when the form is submitted", () => {
    render(<ChatsPage user="John" userId="123" roomId="456" photoURL="avatar.png" />);
    
    const input = screen.getByPlaceholderText("Enter message...");
    const submitButton = screen.getByRole("button", { name: /send/i });

    // Type a message in the input field
    fireEvent.change(input, { target: { value: "Hello, world!" } });

    // Submit the form
    fireEvent.click(submitButton);

    // Verify that the message is sent
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    expect(input.value).toBe("");
    expect(screen.getByText("John")).toBeInTheDocument();

    // Verify that the socket event is emitted
    expect(io().emit).toHaveBeenCalledWith("MESSAGE:SEND", expect.any(Object));
  });

  test("handles speech recognition when the microphone button is clicked", () => {
    render(<ChatsPage user="John" userId="123" roomId="456" photoURL="avatar.png" />);
    
    const microphoneButton = screen.getByRole("button", { name: /microphone/i });

    // Click the microphone button to start speech recognition
    fireEvent.click(microphoneButton);

    // Verify that the speech recognition is activated
    expect(screen.getByRole("button", { name: /microphone/i })).toHaveClass("active");

    // Verify that the socket event is emitted
    expect(io().emit).toHaveBeenCalledWith("MESSAGE:SEND", expect.any(Object));
  });
});
