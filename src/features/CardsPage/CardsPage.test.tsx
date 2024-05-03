import { fireEvent, render, screen } from "@testing-library/react";
import CardsPage from "./CardsPage";
import { suits, values } from "../../utils";

describe("<CardsPage />", () => {
  test("renders <CardsPage />", () => {
    render(<CardsPage />);
    const title = screen.getByText(/Deck of cards/i);
    expect(title).toBeInTheDocument();
  });

  test("shuffle cards and on submit valid no of cards to draw", () => {
    render(<CardsPage />);
    const shuffle = screen.getByText(/Shuffle/i);
    fireEvent.click(shuffle);

    const form = screen.getByTestId("form");
    const input = screen.getByTestId("no-of-cards-to-draw");
    fireEvent.change(input, { target: { value: 4 } });
    fireEvent.submit(form);

    const items = screen.getByTestId("drawn-deck");
    expect(items.children.length).toBe(4);
  });

  test("on enter empty no of cards to draw", () => {
    render(<CardsPage />);
    const form = screen.getByTestId("form");
    const input = screen.getByTestId("no-of-cards-to-draw");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.submit(form);

    const items = screen.getByTestId("original-deck");
    const error = screen.getByText(
      `Please enter any number from 1 to ${items.children.length}`
    );
    expect(error).toBeInTheDocument();
  });

  test("check before and after reset card", () => {
    render(<CardsPage />);
    const form = screen.getByTestId("form");
    const input = screen.getByTestId("no-of-cards-to-draw");
    fireEvent.change(input, { target: { value: 10 } });
    fireEvent.submit(form);

    const originalDeckItems = screen.getByTestId("original-deck");
    const drawnDeckItems = screen.getByTestId("drawn-deck");

    expect(originalDeckItems.children.length).toBe(42);
    expect(drawnDeckItems.children.length).toBe(10);

    const Reset = screen.getByText(/Reset/i);
    fireEvent.click(Reset);

    expect(originalDeckItems.children.length).toBe(52);
    expect(drawnDeckItems.children.length).toBe(1);
  });

  test("on change no of cards to draw, check error if original deck length is zero", () => {
    render(<CardsPage />);
    const form = screen.getByTestId("form");
    const input = screen.getByTestId("no-of-cards-to-draw");
    fireEvent.change(input, { target: { value: 52 } });
    fireEvent.submit(form);

    fireEvent.change(input, { target: { value: 1 } });
    const error = screen.getByText(/No card available to draw/i);
    expect(error).toBeInTheDocument();
  });

  test("sort the drawn cards in ascending / descending order", () => {
    render(<CardsPage />);
    const shuffle = screen.getByText(/Shuffle/i);
    fireEvent.click(shuffle);

    const form = screen.getByTestId("form");
    const input = screen.getByTestId("no-of-cards-to-draw");
    fireEvent.change(input, { target: { value: 4 } });
    fireEvent.submit(form);

    const items = screen.getByTestId("drawn-deck");
    expect(items.children.length).toBe(4);

    const sort = screen.getByText(/Sort/i);
    fireEvent.click(sort);

    const firstSuitDesc = suits.indexOf(
      items.children[0].getAttribute("data-suit") || ""
    );
    const secondSuitDesc = suits.indexOf(
      items.children[1].getAttribute("data-suit") || ""
    );

    const isDesccending = firstSuitDesc <= secondSuitDesc;
    expect(isDesccending).toBe(true);

    fireEvent.click(sort);

    const firstSuitAsc = suits.indexOf(
      items.children[0].getAttribute("data-suit") || ""
    );
    const secondSuitAsc = suits.indexOf(
      items.children[1].getAttribute("data-suit") || ""
    );

    const isAscending = firstSuitAsc >= secondSuitAsc;
    expect(isAscending).toBe(true);
  });
});
