import React, { useState } from "react";
import type { CardWithEffects } from "../types";

type Props = {
  cards: CardWithEffects[];
  handleCardClick: (card: CardWithEffects) => void;
  cardList: CardWithEffects[];
};

function cardImageFileName(cardName: string): string {
  switch (cardName) {
    case "AI Assistant Module":
      return "AIAssistModule";
    case "Experimental Stimulants":
      return "ExperimentalStims";
    case "Large Caliber Rounds":
      return "LargeCaliberAmmo";
    case "Magician's Apprentice":
      return "Magician";
    case "Suppressing Fire":
      return "SuppressiveFire";
    case "Wasteland Chef":
      return "ChefsKnife";
    case "Ugly Chachkies":
      return "QuickLearner";
    case "Stealthy Passage":
      return "Infiltrator";
    case "Soften Up":
      return "BatterUp";
    case "Ether Bomb":
      return "ShockAndAwe";
    case "Phosphorous Tipped":
      return "Overheat";
    case "Food Scavenger":
      return "LunchTime";
    case "Empowered Assault":
      return "ChainReaction";
    case "Sonic Disruptor":
      return "ConcussiveBlast";
    case "Defensive Maneuver":
      return "EvasiveAction";
    case "Belligerent":
      return "Flawless";
    case "Cleansing Fire":
      return "HotStuff";
    case "Drone Spotter":
      return "MotionSensor";
    default:
      return cardName
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .map((word) => {
          const result: string[] = [];

          for (const c of word) {
            if (
              (c >= "a" && c <= "z") ||
              (c >= "A" && c <= "Z") ||
              (c >= "0" && c <= "9")
            ) {
              result.push(c);
            }
          }

          return result.join("");
        })
        .join("");
  }
}

const CardCollection: React.FC<Props> = ({
  cards,
  handleCardClick,
  cardList,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!cards || cards.length === 0)
    return (
      <div className="mx-auto flex w-fit flex-col flex-wrap items-center justify-center text-black">
        <h2 className="text-3xl">Card Collection</h2>
        No cards to display
      </div>
    );

  return (
    <>
      <input
        className="mx-auto rounded-lg border-2 px-2 py-1 transition hover:bg-gray-200"
        type="text"
        placeholder="Search cards..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mx-auto flex w-fit select-none flex-wrap justify-center gap-4">
        {cards &&
          cards.filter(cardContainsTerm.bind(this, searchTerm)).map((card) => (
            <div
              key={card.id}
              className="box-content h-[calc(35px*4)] w-[calc(25px*4)] cursor-pointer rounded-lg bg-red-600 bg-cover p-2 text-center font-semibold text-white transition-all hover:bg-red-700"
              style={{
                backgroundImage: `url(/images/cards/${cardImageFileName(
                  card.name
                )}.png)`,
                border:
                  cardList.filter((c) => c.id === card.id).length !== 0
                    ? "3px solid red"
                    : "",
                scale:
                  cardList.filter((c) => c.id === card.id).length !== 0
                    ? "1.1"
                    : "1",
              }}
              onClick={() => handleCardClick(card)}
            >
              {card.name}
            </div>
          ))}
      </div>
    </>
  );
};

function cardContainsTerm(searchTerm: string, card: CardWithEffects) {
  if (
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.affinity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (card.ability &&
      card.ability.toLowerCase().includes(searchTerm.toLowerCase()))
  ) {
    return true;
  }

  for (const stat of card.stats) {
    if (stat.effect.toLowerCase().includes(searchTerm.toLowerCase()))
      return true;
  }

  for (const se of card.secondaryEffects) {
    if (se.effect.toLowerCase().includes(searchTerm.toLowerCase())) return true;
  }

  return false;
}

export default CardCollection;
