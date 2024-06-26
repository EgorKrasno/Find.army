'use client';

import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { PartyPopperIcon } from 'lucide-react';

export function Announcement() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.97,
        y: 4,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.2,
        },
      }}
      exit={{
        opacity: 0,
        scale: 0.97,
        y: 4,
        transition: {
          duration: 0.2,
        },
      }}
      className="hidden w-full items-center justify-center gap-2 pt-10 text-muted-foreground sm:flex">
      <Badge
        variant="default"
        className="pointer-events-none flex cursor-default select-none items-center gap-2 font-mono text-xs uppercase">
        <PartyPopperIcon className="w-4" /> New
      </Badge>
      Keyboard shortcuts are available for the first 9 items
    </motion.div>
  );
}
