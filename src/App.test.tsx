import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders Vite Logo link and image", () => {
  render(<App />);
  
  expect(screen.getByRole("link", { name: /Vite Logo/i })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /Vite Logo/i })).toBeInTheDocument();
});

test("renders React Logo link and image", () => {
  render(<App />);
  
  expect(screen.getByRole("link", { name: /React Logo/i })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /React Logo/i })).toBeInTheDocument();
});

test("renders Vite + React heading", () => {
  render(<App />);
  
  expect(screen.getByRole("heading", { level: 1, name: "Vite + React" })).toBeInTheDocument();
});

test("Counter increments on button click", async () => {
  const user = userEvent.setup();

  render(<App />);
  
  await user.click(screen.getByRole("button", { name: /count is 0/i }));

  expect(screen.getByRole("button", { name: /count is 1/i })).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /count is 1/i }));

  expect(screen.getByRole("button", { name: /count is 2/i })).toBeInTheDocument();
});
