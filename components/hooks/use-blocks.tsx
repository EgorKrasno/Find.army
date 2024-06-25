'use client';

import { LinkCardData, cards as originalCards } from '@/data/cards';
import { createContext, useContext, useEffect, useState } from 'react';

interface CardsContextValue {
  cards: LinkCardData[];
  setCards: (newCards: LinkCardData[]) => void;
  resetCardsOrder: () => void;
}

const CardsContext = createContext<CardsContextValue>({
  cards: [],
  setCards: () => {},
  resetCardsOrder: () => {},
});

export const CardsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cards, _setCards] = useState<LinkCardData[]>(originalCards);
  const resetCardsOrder = () => setCards(originalCards);

  const setCards = (newCards: LinkCardData[]) => {
    _setCards(newCards);

    localStorage.setItem(
      'cards',
      JSON.stringify(
        newCards.reduce(
          (acc, card, index) => {
            acc[card.id] = index;
            return acc;
          },
          {} as { [key: string]: number },
        ),
      ),
    );
  };

  useEffect(() => {
    const savedCardsOrder = localStorage.getItem('cards');

    if (savedCardsOrder) {
      const parsedCards: {
        [key: string]: number;
      } = JSON.parse(savedCardsOrder);
      const orderedCards = Array.from(originalCards).sort(
        (a, b) => parsedCards[a.id] - parsedCards[b.id],
      );
      _setCards(orderedCards);
      console.log('Set Ordered Cards', orderedCards);
    }
  }, []);

  useEffect(() => {}, [cards]);

  return (
    <CardsContext.Provider
      value={{
        cards,
        setCards,
        resetCardsOrder,
      }}>
      {children}
    </CardsContext.Provider>
  );
};

export function useCards() {
  return useContext(CardsContext);
}
