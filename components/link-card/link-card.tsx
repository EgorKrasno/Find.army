'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CardType, LinkCardData } from '@/data/cards';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, GripHorizontalIcon } from 'lucide-react';
import { cloneElement, forwardRef, useEffect, useRef, useState } from 'react';
import { Kbd } from '../kbd/kbd';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Topography from './topography';

export type LinkCardProps = {
  cardData: LinkCardData;
  cardPosition?: number;
  isFiltering?: boolean;
  isDragging?: boolean;
  children?: React.ReactNode;
};

const animations = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.1 },
};

const LinkCard = forwardRef<HTMLDivElement, LinkCardProps>(function LinkCard(
  { cardData, isDragging, isFiltering, cardPosition }: LinkCardProps,
  ref,
) {
  const [copiedHref, setCopiedHref] = useState('');
  const localRef = useRef<HTMLDivElement>();
  const { attributes, listeners } = useSortable({
    id: cardData.id,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        localRef.current?.blur();
      }

      const isCmdOrCtrl = event.metaKey || event.ctrlKey;
      const isNumberKey = event.key >= '0' && event.key <= '9';

      if (isCmdOrCtrl && isNumberKey) {
        const numPressed = parseInt(event.key, 10);

        if (numPressed >= 1 && numPressed <= 9) {
          const index = numPressed - 1;
          if (cardPosition === index) {
            event.preventDefault();
            localRef.current?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [cardPosition, ref]);

  if (isDragging) {
    return (
      <Card className="relative flex h-full min-h-[150px] ring-2 ring-foreground/40 duration-150" />
    );
  }

  const openLink = () => {
    const win = window.open(cardData.href, '_blank');
    if (win != null) {
      win.focus();
    }
  };

  const copyToClipboard = (href: string) => {
    navigator.clipboard.writeText(href).then(r => {
      setCopiedHref(href);
      setTimeout(() => {
        setCopiedHref('');
      }, 3000);
    });
  };

  const Icon = () =>
    cloneElement(cardData.icon, {
      className: cn(
        'w-14 h-14 shrink-0',
        cardData.type === CardType.LINK ? 'text-accent' : 'text-destructive',
      ),
    });

  return (
    <Card
      ref={instance => {
        if (!instance) return;

        localRef.current = instance;

        if (typeof ref === 'function') {
          ref(instance);
        } else if (typeof ref === 'object') {
          if (!ref) return;
          ref.current = instance;
        }
      }}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          openLink();
        }
      }}
      tabIndex={cardPosition !== undefined ? 0 : undefined}
      onClick={openLink}
      className="group relative z-0 flex h-full min-h-fit cursor-pointer outline-none ring-2 ring-accent/0 ring-offset-0 ring-offset-background duration-150 hover:ring-accent hover:ring-offset-4 focus:ring-accent focus:ring-offset-4 sm:min-h-[250px]">
      <CardContent className="relative flex w-full flex-col justify-between overflow-hidden py-10">
        <Topography className="absolute -left-10 -top-5 -z-10 w-[calc(100%+calc(theme(spacing.10)*2))] text-accent opacity-20 transition-all duration-100 group-hover:opacity-80 dark:opacity-10 dark:group-hover:opacity-50" />
        <div className="absolute bottom-0 left-0 -z-10 h-full w-full bg-gradient-to-t from-card via-card/80 to-card/0" />
        <Icon />
        <div className="absolute right-7 top-3 flex items-center gap-4">
          <Button
            variant="outline"
            onClick={e => {
              e.stopPropagation();
              copyToClipboard(cardData.href);
            }}
            className="translate-x-4 opacity-0 transition-all duration-200 focus:translate-x-0 focus:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100">
            <AnimatePresence mode="wait">
              {copiedHref.length > 0 && copiedHref === cardData.href ? (
                <motion.span
                  key="copied"
                  {...animations}
                  className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4" />
                  Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  {...animations}
                  className="flex items-center gap-2">
                  Copy Link
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
          <Button
            aria-label="Drag to reorder"
            size="icon"
            variant="ghost"
            className="h-10 w-10 cursor-move"
            {...attributes}
            {...listeners}
            disabled={isFiltering}>
            <GripHorizontalIcon />
          </Button>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-semibold">{cardData.title}</span>
          <span className="text-base text-muted-foreground">
            {cardData.description}
          </span>
          <div className="flex gap-2 pt-2">
            {cardData.avd && (
              <Badge
                variant="destructive"
                className="font-mono text-[10px] uppercase">
                AVD
              </Badge>
            )}
            {cardData.cac && !cardData.avd && (
              <Badge
                variant="secondary"
                className="font-mono text-[10px] uppercase text-accent">
                CAC
              </Badge>
            )}
          </div>
        </div>
        {cardPosition !== undefined && cardPosition < 9 && (
          <div className="absolute bottom-3 right-7 flex items-center gap-4">
            <Kbd className="hidden sm:inline-block" modifier>
              {cardPosition + 1}
            </Kbd>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

export { LinkCard };
