import { type FormEvent } from "react";
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
import DeckComposition from "../cardlist/DeckComposition";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

const DeckBuilder: React.FC = () => {
  const router = useRouter();
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  });

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
      cards: cardList.map((card, i) => ({ ...card, position: i })),
    });
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const [i1, i2] = [
        cardList.findIndex((card) => card.id === active.id),
        cardList.findIndex((card) => card.id === over.id),
      ];

      setCardList((cards) => {
        const temp = cards.at(i1);

        if (temp !== undefined) {
          const result = cards.filter((card) => card.id !== temp.id);
          result.splice(i2, 0, temp);
          return [...result];
        }

        return [...cards];
      });
    }
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={useSensors(touchSensor, mouseSensor)}
    >
      <div className="flex flex-col items-center gap-10">
        <h1
          className={`text-center text-3xl font-semibold tracking-widest ${
            menuOpen ? "overflow-hidden" : ""
          }`}
        >
          DECK EDITOR
        </h1>
        {menuOpen && (
          <div
            className="fixed top-0 left-0 z-10 h-screen w-screen bg-black opacity-70 transition"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}

        <div
          className="fixed left-0 top-0 z-20 flex h-screen w-4 items-center justify-center bg-dark bg-opacity-20 text-xs font-bold text-dark transition hover:scale-150 hover:bg-opacity-40 dark:bg-light dark:bg-opacity-20 dark:text-light hover:dark:bg-opacity-40 md:w-12 md:text-base"
          onClick={() => setMenuOpen(true)}
        >
          {">"}
        </div>

        <div
          className={`fixed ${
            menuOpen ? "left-0" : "-left-96"
          } top-0 z-30 flex h-full w-96 flex-col overflow-auto border-r-2 border-primary bg-light px-8 py-4 transition-all dark:bg-dark`}
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
            <DeckComposition cards={cardList} />
            <SortableCardList
              cards={cardList}
              handleCardClick={removeCardFromList}
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
    </DndContext>
  );
};

export default DeckBuilder;
