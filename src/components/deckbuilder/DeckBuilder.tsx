import type { FormEvent } from "react";
import { useState } from "react";
import type { CardWithEffects } from "../../types";
import { api } from "../../utils/api";
import CardCollection from "./CardCollection";
import SortableCardList from "../cardlist/SortableCardList";
import PrimaryButton from "../elements/PrimaryButton";
import SecondaryButton from "../elements/SecondaryButton";
import StatList from "./StatList";
import TextInput from "../elements/TextInput";
import GadgetList from "./GadgetList";
import SecondaryEffectList from "./SecondaryEffectList";
import { useRouter } from "next/router";
import Error from "../elements/Error";
import TextArea from "../elements/TextArea";

const DeckBuilder: React.FC = () => {
  const router = useRouter();

  const { data: cards } = api.card.getAll.useQuery();
  const saveDeck = api.deck.create.useMutation({
    onSuccess: async () => {
      await router.push(`/collection`);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const [cardList, setCardList] = useState([] as CardWithEffects[]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const removeCardFromList = (cardId: string) =>
    setCardList(cardList.filter((c) => c.id !== cardId));

  const toggleCardInCollection = (card: CardWithEffects) => {
    const filteredList = cardList.filter((c) => c.id !== card.id);

    if (filteredList.length === cardList.length) {
      if (cardList.length >= 15) {
        return;
      }

      setCardList((prev) => [...prev, card]);
    } else {
      setCardList(() => filteredList);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    saveDeck.mutate({
      name: deckTitle,
      description: deckDescription === "" ? undefined : deckDescription,
      cards: cardList,
    });
  };

  const moveCard = (i1: number, i2: number) => {
    setCardList((cards) => {
      const temp = cards.at(i1);

      if (temp !== undefined) {
        const result = cards.filter((card) => card.id !== temp.id);
        result.splice(i2, 0, temp);
        return [...result];
      }

      return [...cards];
    });
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <h1
        className={`text-center text-3xl font-semibold tracking-widest ${
          menuOpen ? "overflow-hidden" : ""
        }`}
      >
        DECK EDITOR
      </h1>
      <PrimaryButton onClick={() => setMenuOpen(true)}>Open Deck</PrimaryButton>

      <div
        className={`fixed ${
          menuOpen ? "left-0" : "-left-96"
        } top-0 z-10 flex h-full w-96 flex-col overflow-auto border-r-2 border-primary bg-light px-8 py-4 transition-all dark:bg-dark`}
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex w-full">
            <SecondaryButton onClick={() => setMenuOpen(false)}>
              Close
            </SecondaryButton>
            <PrimaryButton submit>Save Deck</PrimaryButton>
          </div>

          <Error message={errorMessage} />

          <TextInput
            value={deckTitle}
            onChange={(e) => setDeckTitle(e.target.value)}
            placeholder="Deck title..."
            required
          />
          <TextArea
            value={deckDescription}
            onChange={(e) => setDeckDescription(e.target.value)}
            placeholder="Deck description..."
          />
        </form>
        <div>
          <SortableCardList
            cards={cardList}
            handleCardClick={removeCardFromList}
            moveCard={moveCard}
          />
          <StatList cards={cardList} />
          <SecondaryEffectList cards={cardList} />
          <GadgetList cards={cardList} />
        </div>
      </div>

      {cards && (
        <CardCollection
          cards={cards}
          handleCardClick={toggleCardInCollection}
          cardList={cardList}
        />
      )}
    </div>
  );
};

export default DeckBuilder;
