import React from "react";
import App from "./App";

const mockRenderFn = jest.fn();

jest.mock("react-dom/client", () => ({
  createRoot: () => ({
    render: mockRenderFn,
  }),
}));

describe("Application root", () => {
  test("should render without crashing", () => {
    require("./index.tsx");
    expect(mockRenderFn).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
});
