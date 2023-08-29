import { useState } from "react";
import type { CardWithEffects } from "../../types";
import { api } from "../../utils/api";
import CardCollection from "./CardCollection";
import SortableCardList from "../cardlist/SortableCardList";
import StatList from "./StatList";
import GadgetList from "./GadgetList";
import SecondaryEffectList from "./SecondaryEffectList";
import { useRouter } from "next/router";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import ViewDeckIcon from "../elements/ViewDeckIcon";
import AddCardIcon from "../elements/AddCardIcon";
import DeckForm from "./DeckForm";
import CheckmarkIcon from "../elements/CheckmarkIcon";

enum ViewState {
  Collection,
  CardList,
  Form,
}

const DeckBuilder: React.FC = () => {
  {
    /* HOOKS */
  }
  const router = useRouter();
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 1,
    },
  });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 1,
    },
  });

  const { data: cards } = api.card.getAll.useQuery();
  const saveDeck = api.deck.create.useMutation({
    onSuccess: async () => {
      await router.push(`/collection`);
    },
    onError: (error: { message: string }) => {
      setErrorMessage(error.message);
    },
  });

  const [cardList, setCardList] = useState([] as CardWithEffects[]);
  const [viewState, setViewState] = useState(ViewState.CardList);
  const [errorMessage, setErrorMessage] = useState("");

  {
    /* HANDLERS */
  }
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

  const handleSubmit = (name: string, description: string) => {
    saveDeck.mutate({
      name,
      description: description === "" ? undefined : description,
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

  {
    /* RENDER */
  }
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={useSensors(touchSensor, mouseSensor)}
    >
      <div className="flex flex-col items-center">
        <h1 className="pt-4 pb-8 text-3xl font-bold tracking-widest">
          DECK EDITOR
        </h1>

        {viewState === ViewState.CardList && (
          <div className="flex w-11/12 flex-col items-center">
            <SortableCardList
              cards={cardList}
              handleCardClick={removeCardFromList}
            />
            <StatList cards={cardList} />
            <SecondaryEffectList cards={cardList} />
            <GadgetList cards={cardList} />
          </div>
        )}

        {viewState === ViewState.Collection && cards && (
          <CardCollection
            cards={cards}
            handleCardClick={toggleCardInCollection}
            cardList={cardList}
          />
        )}

        {viewState === ViewState.Form && (
          <DeckForm submitForm={handleSubmit} errorMessage={errorMessage} />
        )}

        <div className="py-16"></div>

        {/* BOTTOM NAV */}
        <div className="fixed bottom-0 left-0 z-20 h-16 w-screen border-t-2 border-primary bg-primary">
          <div className="mx-auto flex h-full items-center justify-evenly">
            <div
              className={`flex h-full w-1/3 cursor-pointer items-center justify-center ${
                viewState === ViewState.CardList ? " bg-primary " : " bg-white "
              }`}
              onClick={() => setViewState(ViewState.CardList)}
            >
              <ViewDeckIcon
                color={viewState === ViewState.CardList ? "#fff" : "#ff0000"}
              />
            </div>

            <div
              className={`flex h-full w-1/3 cursor-pointer items-center justify-center ${
                viewState === ViewState.Collection
                  ? " bg-primary "
                  : " bg-white "
              }`}
              onClick={() => setViewState(ViewState.Collection)}
            >
              <AddCardIcon
                color={viewState === ViewState.Collection ? "#fff" : "#ff0000"}
              />
            </div>

            <div
              className={`flex h-full w-1/3 cursor-pointer items-center justify-center ${
                viewState === ViewState.Form ? " bg-primary " : " bg-white "
              }`}
              onClick={() => setViewState(ViewState.Form)}
            >
              <span
                className={`flex items-center justify-center text-3xl font-bold ${
                  viewState === ViewState.Form
                    ? " text-white "
                    : " text-primary "
                }`}
              >
                <CheckmarkIcon
                  color={viewState === ViewState.Form ? "#fff" : "#ff0000"}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default DeckBuilder;
