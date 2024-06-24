'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CardType, LinkCardData } from '@/data/cards';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, GripHorizontalIcon } from 'lucide-react';
import { Ref, cloneElement, forwardRef, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Topography from './topography';

type LinkCardProps = {
  cardData: LinkCardData;
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

const LinkCard = forwardRef(function LinkCard(
  { cardData, isDragging, isFiltering }: LinkCardProps,
  ref: Ref<HTMLDivElement> | undefined,
) {
  const [copiedHref, setCopiedHref] = useState('');
  const { attributes, listeners } = useSortable({
    id: cardData.id,
  });

  if (isDragging) {
    return (
      <Card className="relative flex h-full ring-2 ring-foreground/40 duration-150" />
    );
  }

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
      ref={ref}
      className="group relative z-0 flex h-full min-h-[250px] cursor-pointer ring-2 ring-accent/0 ring-offset-0 ring-offset-background duration-150 hover:ring-accent hover:ring-offset-4">
      <CardContent className="relative flex w-full flex-col justify-between overflow-hidden py-10">
        <Topography className="absolute -left-10 -top-5 -z-10 h-[calc(100%+theme(spacing.10))] w-[calc(100%+calc(theme(spacing.10)*2))] text-accent opacity-20 transition-all duration-100 group-hover:opacity-80 dark:opacity-10 dark:group-hover:opacity-50" />
        <div className="absolute bottom-0 left-0 -z-10 h-full w-full bg-gradient-to-t from-card via-card/80 to-card/0" />
        <Icon />
        <div className="absolute right-7 top-3 flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => copyToClipboard(cardData.href)}
            className="translate-x-4 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
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
            className={cn('h-10 w-10 cursor-move')}
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
      </CardContent>
    </Card>
  );
});

export { LinkCard };
