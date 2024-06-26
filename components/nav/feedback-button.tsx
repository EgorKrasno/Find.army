'use client';

import { useEffect, useState } from 'react';
import { Button, ButtonProps } from '../ui/button';

import { postFeedback } from '@/app/actions';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, LoaderCircleIcon } from 'lucide-react';
import { z } from 'zod';
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from '../ui/credenza';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

export enum Rating {
  One = '🤩',
  Two = '😃',
  Three = '😐',
  Four = '😡',
}

type FeedbackButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
} & ButtonProps;

export function FeedbackButton({
  children,
  onClick,
  ...buttonProps
}: FeedbackButtonProps) {
  const [email, setEmail] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [rating, setRating] = useState<Rating | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  function handleSubmit() {
    setLoading(true);

    postFeedback({
      email: email || undefined,
      feedback,
      rating,
    })
      .then(() => {
        setError(undefined);
        setSent(true);
        setTimeout(() => {
          setOpen(false);
          setEmail('');
          setFeedback('');
          setRating(undefined);
          setSent(false);
        }, 2000);
      })
      .catch(_err => {
        setError('Failed to submit feedback');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    const check = z
      .string()
      .email()
      .optional()
      .or(z.literal(''))
      .safeParse(email || '');

    if (!check.success) {
      setError(check.error.errors[0].message);
      setDisabled(true);
    } else {
      setError(undefined);
      setDisabled(false);
    }
  }, [email]);

  return (
    <Credenza
      open={open}
      onOpenChange={isOpen => {
        !isOpen && setError(undefined);
        setLoading(false);
        setOpen(isOpen);
      }}>
      <Button
        onClick={() => {
          onClick && onClick();
          setOpen(true);
        }}
        {...buttonProps}>
        {children ? children : 'Feedback'}
      </Button>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Feedback</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="flex flex-col gap-4">
          <Input
            value={email ?? ''}
            onChange={e => setEmail(e.target.value)}
            type="text"
            placeholder="Email (optional)"
          />
          <Textarea
            placeholder="Feedback"
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            rows={5}
          />
          <ToggleGroup
            variant="outline"
            type="single"
            onValueChange={value => setRating(value as unknown as Rating)}
            className="sm:mr-auto [&_[data-state=off]:hover]:bg-primary/70 [&_[data-state=on]]:bg-primary [&_button]:text-2xl">
            <ToggleGroupItem value={Rating.One} aria-label="">
              {Rating.One}
            </ToggleGroupItem>
            <ToggleGroupItem value={Rating.Two} aria-label="">
              {Rating.Two}
            </ToggleGroupItem>
            <ToggleGroupItem value={Rating.Three} aria-label="">
              {Rating.Three}
            </ToggleGroupItem>
            <ToggleGroupItem value={Rating.Four} aria-label="">
              {Rating.Four}
            </ToggleGroupItem>
          </ToggleGroup>
          <span className="block text-center text-destructive sm:text-left">
            {error}
          </span>
        </CredenzaBody>
        <CredenzaFooter>
          <Button
            className="relative flex items-center"
            disabled={
              !feedback || feedback.length < 1 || loading || sent || disabled
            }
            onClick={() => handleSubmit()}>
            <AnimatePresence>
              {loading && (
                <motion.span
                  transition={{ duration: 0.15 }}
                  initial={{ opacity: 0, width: 0, scale: 0.4 }}
                  animate={{ opacity: 100, width: 'auto', scale: 1 }}
                  exit={{ opacity: 0, width: 0, scale: 0.4 }}>
                  <LoaderCircleIcon className="mr-2 animate-spin" />
                </motion.span>
              )}
            </AnimatePresence>
            {sent ? (
              <>
                <CheckIcon className="mr-2" />
                Sent
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
