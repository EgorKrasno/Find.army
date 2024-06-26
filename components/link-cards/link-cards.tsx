'use client';

import { LinkCardData } from '@/data/cards';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { AnimatePresence, motion } from 'framer-motion';
import Fuse from 'fuse.js';
import { GhostIcon } from 'lucide-react';
import { useState } from 'react';
import { Filters } from '../filters/filters';
import { useCards } from '../hooks/use-blocks';
import { DraggableLinkCard } from '../link-card/draggable-link-card';
import { LinkCard } from '../link-card/link-card';
import { FeedbackButton } from '../nav/feedback-button';

const appearAnimations = {
  initial: { opacity: 0, scale: 0.97 },
  exit: { opacity: 0, scale: 0.97 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
};

export function LinkCards() {
  const { cards, setCards } = useCards();
  const fuse = new Fuse(cards, {
    keys: ['title', 'tags', 'description'],
    threshold: 0.3,
  });

  const [text, setText] = useState('');
  const [activeCard, setActiveCard] = useState<LinkCardData>();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: any) => {
    setActiveCard(cards.find(item => item.id === event.active.id)!);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const activeIndex = cards.indexOf(
        cards.find(item => item.id === active.id)!,
      );
      const overIndex = cards.indexOf(cards.find(item => item.id === over.id)!);

      const reorderedCards = arrayMove(cards, activeIndex, overIndex);
      setCards(reorderedCards);
    }
  };

  const results = fuse.search(text);
  const searchFilteredData =
    text.length > 0 ? results.map(result => result.item) : cards;

  return (
    <div className="flex flex-col gap-14">
      <Filters text={text} setText={setText} />
      <div className="grid h-full w-full auto-rows-max grid-cols-1 gap-7 pb-10 sm:grid-cols-2 lg:grid-cols-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}>
          <AnimatePresence>
            <SortableContext items={cards} strategy={rectSortingStrategy}>
              {searchFilteredData.length > 0 ? (
                searchFilteredData.map((card, index) => (
                  <motion.div
                    key={index}
                    className="h-full"
                    {...appearAnimations}>
                    <DraggableLinkCard
                      cardPosition={index}
                      cardData={card}
                      isFiltering={text.length > 0}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  {...appearAnimations}
                  className="col-span-3 flex flex-col items-center gap-6 py-20">
                  <GhostIcon
                    className="h-32 w-32 text-foreground/70"
                    strokeWidth={0.7}
                  />
                  <span className="font-mono text-2xl tracking-tighter text-muted-foreground">
                    No results found
                  </span>
                  <FeedbackButton variant="ghost" className="text-accent">
                    Make a suggestion
                  </FeedbackButton>
                </motion.div>
              )}
            </SortableContext>
          </AnimatePresence>
          <DragOverlay>
            {activeCard ? <LinkCard cardData={activeCard} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
