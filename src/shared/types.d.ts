type Card = {
  stats: Statistic[]
  effects: Effect[]
  deck: Deck
}

type Deck = {
  creator: string
  cards: Card[]
}
