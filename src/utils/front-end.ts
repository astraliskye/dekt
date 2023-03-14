import type { CardWithEffects } from "../types";

export function sortedCards(cards: CardWithEffects[]) {
  return [...cards].sort((a, b) => {
    if (a.affinity > b.affinity) return 1;
    else if (a.affinity < b.affinity) return -1;
    else if (a.name > b.name) return 1;
    else if (a.name < b.name) return -1;
    return 0;
  });
}

export function cardBorderColor(
  card: CardWithEffects,
  defaultColor = "transparent",
  useDefault = false
) {
  if (useDefault) return defaultColor;

  let color = defaultColor;

  switch (card.affinity) {
    case "Reflex":
      color = "border-reflex-dark dark:border-reflex";
      break;
    case "Discipline":
      color = "border-discipline";
      break;
    case "Brawn":
      color = "border-brawn-dark dark:border-brawn";
      break;
    case "Fortune":
      color = "border-fortune-dark dark:border-fortune";
      break;
  }

  return color;
}
