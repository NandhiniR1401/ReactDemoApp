import { CardType } from "../../types";
import { cardEntities } from "../../cardEntities";
import "./Card.scss";

type CardProps = {
  card: CardType;
  isCardFlipped?: boolean;
};

const Card = ({ card, isCardFlipped }: CardProps) => {
  const cardName: string = `${card.value}_of_${card.suit}`;
  const cardImage = cardEntities[cardName];
  return (
    <div className={`card-outer ${isCardFlipped ? "flipped" : ""}`}>
      <div className="card-inner">
        <div
          className={`card front ${
            card.suit === "Hearts" || card.suit === "Diamonds" ? "card-red" : ""
          }`}
          dangerouslySetInnerHTML={{ __html: cardImage }}
        />
        <div
          className="card back"
          dangerouslySetInnerHTML={{ __html: cardEntities["card_back"] }}
        />
      </div>
    </div>
  );
};

export default Card;
