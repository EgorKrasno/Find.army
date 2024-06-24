'use client';

import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '@/components/ui/credenza';
import { cn } from '@/lib/utils';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { ListRestartIcon, SearchIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { useCards } from '../hooks/use-blocks';
import { Button } from '../ui/button';
import { InputWithIcon } from '../ui/input-with-icon';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type FiltersProps = {
  text: string;
  setText: (text: string) => void;
};

export function Filters({ text, setText }: FiltersProps) {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', current => {
    // Check if current is not undefined and is a number
    if (typeof current === 'number') {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.02) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <>
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          'fixed inset-x-0 top-10 z-[5000] mx-auto flex w-full max-w-[500px] items-center justify-center space-x-4 rounded-lg border bg-background/20 px-2 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-xl',
        )}>
        <AnimatePresence>
          <FilterFields text={text} setText={setText} />
        </AnimatePresence>
      </motion.div>
      <FilterFields text={text} setText={setText} />
    </>
  );
}

const FilterFields = ({
  text,
  setText,
}: {
  text: string;
  setText: (text: string) => void;
}) => {
  const { resetCardsOrder } = useCards();
  return (
    <div className="mx-auto flex w-full max-w-[500px] items-center justify-between gap-4">
      <InputWithIcon
        type="text"
        placeholder="Search"
        onChange={e => {
          setText(e.target.value);
        }}
        className="grow border-none bg-muted outline-none ring-0"
        value={text}
        startIcon={<SearchIcon className="h-4" />}
        endIcon={
          <Button
            size="icon"
            variant="link"
            aria-label="Clear Search"
            onClick={() => setText('')}
            className={cn(
              'pointer-events-none opacity-0 transition-all duration-100',
              text.length > 0 && 'pointer-events-auto opacity-100',
            )}>
            <XIcon className="h-4" />
          </Button>
        }
      />
      <div className="flex shrink-0 items-center justify-between gap-2">
        <Tooltip>
          <Credenza>
            <CredenzaTrigger asChild>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  aria-label="Open Reset Order Dialog">
                  <ListRestartIcon />
                </Button>
              </TooltipTrigger>
            </CredenzaTrigger>
            <CredenzaContent>
              <CredenzaHeader>
                <CredenzaTitle>Reset List Order</CredenzaTitle>
                <CredenzaDescription>
                  Are you sure you wish to reset the order of your lists?
                </CredenzaDescription>
              </CredenzaHeader>
              <CredenzaBody>
                <span className="text-destructive">
                  This action can not be undone.
                </span>
              </CredenzaBody>
              <CredenzaFooter>
                <CredenzaClose asChild>
                  <Button variant="outline">Cancel</Button>
                </CredenzaClose>
                <CredenzaClose asChild>
                  <Button
                    onClick={() => {
                      resetCardsOrder();
                    }}
                    aria-label="Reset Order"
                    variant="destructive">
                    Reset Order
                  </Button>
                </CredenzaClose>
              </CredenzaFooter>
            </CredenzaContent>
          </Credenza>
          <TooltipContent>Reset Positions</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
