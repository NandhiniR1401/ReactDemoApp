import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  test("renders <App />", () => {
    render(<App />);
    const linkElement = screen.getByText(/Deck of cards/i);
    expect(linkElement).toBeInTheDocument();
  });
});
