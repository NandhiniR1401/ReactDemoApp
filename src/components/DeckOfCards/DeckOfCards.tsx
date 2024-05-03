import { ReactNode } from "react";
import { CardType } from "../../types";
import Card from "../Card/Card";
import "./DeckOfCards.scss";

type DeckOfCardsProps = {
  deck: CardType[];
  title: string;
  action?: ReactNode;
  dataTestId: string;
  isCardFlipped?: boolean;
};

const DeckOfCards = ({
  deck,
  title,
  action,
  dataTestId,
  isCardFlipped,
}: DeckOfCardsProps) => {
  return (
    <div className="deck">
      <div className="title-section">
        <h2 className="deck-title">{title}</h2>
        {action && <div className="deck-action">{action}</div>}
      </div>
      <div className="deck-container" data-testid={dataTestId}>
        {deck.length > 0 ? (
          deck.map((card: CardType) => (
            <div
              key={`${card.value}_of_${card.suit}`}
              data-value={card.value}
              data-suit={card.suit}
              className="card-container"
            >
              <Card card={card} isCardFlipped={isCardFlipped} />
            </div>
          ))
        ) : (
          <p className="no-card">No card available</p>
        )}
      </div>
    </div>
  );
};

export default DeckOfCards;
