'use client';

import { LinkCardData, cards as originalCards } from '@/data/cards';
import { createContext, useContext, useEffect, useState } from 'react';

interface CardsContextValue {
  cards: LinkCardData[];
  setCards: React.Dispatch<React.SetStateAction<LinkCardData[]>>;
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
  const [cards, setCards] = useState<LinkCardData[]>([]);
  const resetCardsOrder = () => setCards(originalCards);

  useEffect(() => {
    const savedCards = localStorage.getItem('cards');
    if (savedCards) {
      const parsedCards: {
        [key: string]: number;
      } = JSON.parse(savedCards);
      const orderedCards = originalCards
        .slice(0)
        .sort((a, b) => parsedCards[a.id] - parsedCards[b.id]);
      setCards(orderedCards);
    } else {
      setCards(originalCards);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'cards',
      JSON.stringify(
        cards.reduce(
          (acc, card, index) => {
            acc[card.id] = index;
            return acc;
          },
          {} as { [key: string]: number },
        ),
      ),
    );
  }, [cards]);

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
