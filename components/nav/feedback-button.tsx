'use client';

import { useState } from 'react';
import { Button, ButtonProps } from '../ui/button';

import { postFeedback } from '@/app/actions';
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
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
} & ButtonProps;

export function FeedbackButton({
  children,
  ...buttonProps
}: FeedbackButtonProps) {
  const [email, setEmail] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [rating, setRating] = useState<Rating | undefined>();
  const [error, _setError] = useState<string | undefined>();

  async function handleSubmit() {
    setEmail('');
    setFeedback('');
    setRating(undefined);

    await postFeedback({
      email: email || undefined,
      feedback,
      rating,
    });
  }

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button {...buttonProps}>{children ? children : 'Feedback'}</Button>
      </CredenzaTrigger>
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
          <span className="text-destructive">{error}</span>
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button
              disabled={!feedback || feedback.length < 1}
              onClick={() => handleSubmit()}>
              Submit
            </Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
