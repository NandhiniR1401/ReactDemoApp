import { useState } from "react";
import { generateDeckOfCards, suits, values } from "../../utils";
import DeckOfCards from "../../components/DeckOfCards/DeckOfCards";
import Button from "../../components/Button/Button";
import { CardType } from "../../types";
import "./CardsPage.scss";

const defaultDeckOfCards: CardType[] = generateDeckOfCards();
const defaultCardsCount = "";

const CardsPage = () => {
  const [deck, setDeck] = useState<CardType[]>(defaultDeckOfCards);
  const [drawnDeck, setDrawnDeck] = useState<CardType[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [noOfCardsToDraw, setNoOfCardsToDraw] = useState<number | "">(
    defaultCardsCount
  );

  //   shuffle the original deck of cards
  const shuffleDeck = () => {
    const shuffledDeck = [...deck].sort(() => 0.5 - Math.random());
    setDeck(shuffledDeck);
  };

  //   on draw cards from original deck
  const onDrawCards = (cardsCount: number) => {
    const cardsToDraw = [...deck];
    const cardsDrawn = cardsToDraw.slice(0, cardsCount);
    const cardsLeft = cardsToDraw.slice(cardsCount);
    setDrawnDeck([...drawnDeck, ...cardsDrawn]);
    setDeck(cardsLeft);
  };

  //   on submit the no of cards to draw input form
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (noOfCardsToDraw === "") {
      setIsError(true);
    } else {
      onDrawCards(noOfCardsToDraw);
      setNoOfCardsToDraw(defaultCardsCount);
      setIsAscending(true);
    }
  };

  const onChange = (e: any) => {
    setNoOfCardsToDraw(e.target.value);
    if (e.target.value > deck.length || e.target.value < 1) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  //   on sort drawn cards
  const sortDrawnDeck = () => {
    const sorted = [...drawnDeck].sort((a, b) => {
      const suitComparison = suits.indexOf(a.suit) - suits.indexOf(b.suit);
      if (suitComparison !== 0) {
        return suitComparison;
      }
      return values.indexOf(b.value) - values.indexOf(a.value);
    });
    setDrawnDeck(isAscending ? sorted : sorted.reverse());
    setIsAscending(!isAscending);
  };

  //   reset all the deck of cards
  const resetDeck = () => {
    setDeck(defaultDeckOfCards);
    setDrawnDeck([]);
    setIsError(false);
    setIsAscending(true);
    setNoOfCardsToDraw(defaultCardsCount);
  };

  return (
    <div className="cards-page">
      <div className="title">
        <h1>Deck of cards</h1>
        <Button outline onClick={resetDeck} name="Reset" />
      </div>
      <div className="cards">
        <DeckOfCards
          dataTestId="original-deck"
          deck={deck}
          title="Original Deck"
          action={
            deck.length > 0 && <Button onClick={shuffleDeck} name="Shuffle" />
          }
        />
        <form data-testid="form" className="form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              data-testid="no-of-cards-to-draw"
              className={`${isError ? "input-error" : ""}`}
              type="number"
              name="noOfCardsToDraw"
              placeholder="Enter no of cards to draw"
              onChange={onChange}
              value={noOfCardsToDraw}
            />
            {isError && (
              <p className="error">
                {deck.length > 0
                  ? `Please enter any number from 1 to ${deck.length}`
                  : "No card available to draw"}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isError} name="Draw" />
        </form>
        <DeckOfCards
          dataTestId="drawn-deck"
          deck={drawnDeck}
          title="Drawn Deck"
          action={
            drawnDeck.length > 0 && (
              <Button onClick={sortDrawnDeck} name="Sort" />
            )
          }
        />
      </div>
    </div>
  );
};

export default CardsPage;
